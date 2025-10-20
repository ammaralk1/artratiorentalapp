import{n as h,d as le,f as xo,t as o,b as ze,h as E,j as qt,o as an,s as Ca,A as Hs,z as Io,k as Pe,B as zs,u as Ao}from"./auth.js";import{o as Ye,p as de,D as Je,q as La,t as gs,v as Zt,w as Vs,x as _o,y as it,z as Pa,A as To,B as $o,C as Us,k as Na,e as Ba,f as Da,E as Ks,F as jo,s as sn,i as Pn,G as Qs,H as ko,I as Gs,J as Ws,j as Nn,a as Xs,g as yt,K as Co,L as Lo,M as ca,N as Po,O as No,u as Bo,P as Do,n as Fo}from"./reservationsService.js";const ea="select.form-select:not([data-no-enhance]):not([multiple])",Ve=new WeakMap;let ta=null,bs=!1,Qe=null;function Gd(e=document){e&&(e.querySelectorAll(ea).forEach(t=>yn(t)),!ta&&e===document&&(ta=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(ea)&&yn(a),a.querySelectorAll?.(ea).forEach(s=>yn(s)))})}),ta.observe(document.body,{childList:!0,subtree:!0})),bs||(bs=!0,document.addEventListener("pointerdown",Oo,{capture:!0})))}function fn(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){yn(e);return}const t=e.closest(".enhanced-select");t&&(Fa(t),qn(t),la(t))}function yn(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){fn(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};Ve.set(t,r),a.addEventListener("click",()=>Mo(t)),a.addEventListener("keydown",i=>Ho(i,t)),s.addEventListener("click",i=>Vo(i,t)),s.addEventListener("keydown",i=>zo(i,t)),e.addEventListener("change",()=>{qn(t),Js(t)}),r.observer=new MutationObserver(i=>{let c=!1,l=!1;for(const d of i)d.type==="attributes"&&d.attributeName==="disabled"&&(l=!0),d.type==="childList"&&(c=!0);l&&la(t),c&&Ro(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),Fa(t),qn(t),la(t)}function Ro(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,Fa(t),qn(t)})))}function Fa(e){const t=Ve.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),Js(e)}function qn(e){const t=Ve.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function Js(e){const t=Ve.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function la(e){const t=Ve.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function Mo(e){Ve.get(e)&&(e.getAttribute("data-open")==="true"?Bt(e):Ys(e))}function Ys(e){const t=Ve.get(e);if(!t)return;Qe&&Qe!==e&&Bt(Qe,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),Qe=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function Bt(e,{focusTrigger:t=!0}={}){const n=Ve.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),Qe===e&&(Qe=null))}function Oo(e){if(!Qe)return;const t=e.target;t instanceof Node&&(Qe.contains(t)||Bt(Qe,{focusTrigger:!1}))}function Ho(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),Ys(t)):n==="Escape"&&Bt(t)}function zo(e,t){const n=e.key,a=Ve.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&Zs(i,t)}else n==="Escape"&&(e.preventDefault(),Bt(t))}function Vo(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&Zs(n,t)}function Zs(e,t){const n=Ve.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),Bt(t)}const Dt=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let Ge=null;function Ra(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function er(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function Uo(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function Ko(e={}){const t=Uo({...e,activatedAt:Date.now()});return Ge=t,er(!0,t.mode||"create"),Ra(Dt.change,{active:!0,selection:{...t}}),t}function Ma(e="manual"){if(!Ge)return;const t=Ge;Ge=null,er(!1),Ra(Dt.change,{active:!1,previous:t,reason:e})}function tr(){return!!Ge}function Qo(){return Ge?{...Ge}:null}function Go(e){if(!Ge)return!1;const t=h(String(e??"").trim());return t?(Ra(Dt.requestAdd,{barcode:t,selection:{...Ge}}),!0):!1}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||Ma("tab-changed")});const Wo=le()||{};let nt=(Wo.equipment||[]).map(Yo),da=!1,Wt="",ft=null,bt=null,ht=null,Bn=!1,hs=!1;function Xo(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function Jo(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function Yo(e={}){return Oa({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function Dn(e={}){return Oa(e)}function Oa(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=rn(e.quantity??e.qty??0),i=Fn(e.unit_price??e.price??0),c=h(String(e.barcode??"").trim()),l=Te(e.status??e.state??e.status_label??e.statusLabel??"available"),d=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:Zo(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:l,image:d,imageUrl:d,created_at:e.created_at??null,updated_at:e.updated_at??null}}function Zo(e){return e!=null&&e!==""}function rn(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function Fn(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function ec(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function vs(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function tc(e,t){const n=vs(e),a=vs(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}else{if(r!==i)return r?-1:1;{const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}}const c=Sn(e?.desc||e?.description||e?.name||""),l=Sn(t?.desc||t?.description||t?.name||"");return c.localeCompare(l,"ar",{sensitivity:"base"})}function xe(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Te(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function nc(e){return Te(e)}function nr(){if(!tr())return null;const e=Qo();return e?{...e}:null}function ac(e){const t=nr();if(!t)return{active:!1};const n=h(String(e?.barcode??"").trim());if(!n)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};const{start:a,end:s,ignoreReservationId:r=null}=t;if(!a||!s)return{active:!0,canSelect:!1,barcode:n,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};const i=Te(e?.status);return i==="maintenance"?{active:!0,canSelect:!1,barcode:n,reason:o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً")}:i==="retired"?{active:!0,canSelect:!1,barcode:n,reason:o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً")}:Ye(n,a,s,r)?{active:!0,canSelect:!1,barcode:n,reason:o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية")}:{active:!0,canSelect:!0,barcode:n}}function sc(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function ar(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return");if(!e)return;const n=nr();e.hidden=!n,n&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{Ma("return-button"),sc()}),t.dataset.listenerAttached="true")}function Ne(){return nt}function vt(e){nt=Array.isArray(e)?e.map(Oa):[],Ca({equipment:nt}),Jo()}function Sn(e){return String(e??"").trim().toLowerCase()}function st(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=Sn(t);return n||(n=Sn(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function Rn(e){const t=st(e);return t?Ne().filter(n=>st(n)===t):[]}function Mn(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=On(e);if(n){const a=xe(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${xe(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function Ha(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function En(){const e=Ha();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function za(e={}){const t=Ha();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function Ct(e){Bn=e;const t=Ha(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function Wd(e){if(!qt()){an();return}if(!e)return;try{await ic()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let l=0;if(i.forEach(d=>{const u=d.القسم??d.category??"",p=d["القسم الثانوي"]??d.subcategory??"",g=d.الوصف??d.description??d.name??"",m=d.الكمية??d.quantity??0,f=d.السعر??d.price??0,b=d.الباركود??d.barcode??"",y=d.الحالة??d.status??"متاح",w=d.الصورة??d.image_url??d.image??"",v=h(String(b||"")).trim();if(!g||!v){l+=1;return}c.push(Va({category:u,subcategory:p,description:g,quantity:m,unit_price:f,barcode:v,status:y,image_url:w}))}),!c.length){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const d=await ze("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(d?.data)?d.data.map(Dn):[];if(u.length){const m=[...Ne(),...u];vt(m)}await Hn({showToastOnError:!1}),$e();const p=d?.meta?.count??u.length,g=[];p&&g.push(`${p} ✔️`),l&&g.push(`${l} ⚠️`),E(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(g.length?` (${g.join(" / ")})`:""))}catch(d){const u=Ft(d,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");E(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const rc="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let Vt=null;function ic(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):Vt||(Vt=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=rc,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),Vt=null,e}),Vt)}function Va({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const l=h(String(r||"")).trim(),d=nc(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:rn(a),unit_price:Fn(s),barcode:l,status:d,image_url:c?.trim()||null}}async function oc(){if(!qt()){an();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await ze("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await Hn({showToastOnError:!1}),E(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=Ft(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");E(t,"error")}}function On(e){return e.image||e.imageUrl||e.img||""}function cc(e){const t=Te(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function wn(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${xe(a)}</td></tr>`}n&&(n.textContent="0")}function sr(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=ft?.groupKey||st(e);if(!r){wn();return}const i=Ne().filter(p=>st(p)===r).sort((p,g)=>{const m=String(p.barcode||"").trim(),f=String(g.barcode||"").trim();return!m&&!f?0:m?f?m.localeCompare(f,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){wn();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),l=o("equipment.form.labels.quantity","الكمية"),d=Ne(),u=i.map(p=>{const g=p.id&&e.id?String(p.id)===String(e.id):String(p.barcode||"")===String(e.barcode||""),m=g?"equipment-variants-table__row--current":"",f=xe(String(p.barcode||"-")),b=g?`<span class="equipment-variants-current-badge">${xe(c)}</span>`:"",y=h(String(Number.isFinite(Number(p.qty))?Number(p.qty):0)),w=d.indexOf(p),v=xe(o("equipment.item.actions.delete","🗑️ حذف")),x=w>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${w}">${v}</button>
          </div>`:"";return`
        <tr class="${m}">
          <td>
            ${f}
            ${b}
          </td>
          <td>${cc(p.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${xe(l)}">${y}</span>
          </td>
          <td class="table-actions-cell">${x}</td>
        </tr>
      `}).join("");n.innerHTML=u}function lc({item:e,index:t}){const n=On(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=qt(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},l=Number.isFinite(Number(e.qty))?Number(e.qty):0,d=Number.isFinite(Number(e.price))?Number(e.price):0,u=l.toLocaleString("en-US"),p=d.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),g=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,m=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,f=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(l-g-m,0),b=f.toLocaleString("en-US"),y=o("equipment.card.labels.availableOfTotal","من أصل"),w=Te(e.status);let v=`${xe(c.available)}: ${xe(b)} ${xe(y)} ${xe(u)}`,x="available";if(f===0){const A={reserved:{text:l===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},B=A[w]||A.default;v=xe(B.text),x=B.modifier}const k=`<span class="equipment-card__availability equipment-card__availability--${x}">${v}</span>`,O="",q=e.desc||e.name||"—",I=e.name&&e.name!==e.desc?e.name:"",P=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${p} ${r}`}].map(({label:A,value:B})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${A}</span>
              <span class="equipment-card__detail-value">${B}</span>
            </span>
          `).join("")}
    </div>`,M=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),C=M.length?`<div class="equipment-card__categories">${M.map(({label:A,value:B})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${A}</span>
              <span class="equipment-card__detail-value">${B}</span>
            </div>
          `).join("")}</div>`:"",T=I?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${I}</span>
      </div>`:"",H=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${q}</h3>
    </div>
  `}
      ${P}
    </div>
  `,L=[],$=ac(e);if($.active){const A=o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),B=$.barcode?` data-equipment-barcode="${xe($.barcode)}"`:"",R=$.canSelect?"":" disabled",K=$.reason?` title="${xe($.reason)}"`:"";L.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" data-equipment-action="select-reservation"${B}${R}${K}>${A}</button>`)}i&&L.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const Q=L.length?`<div class="equipment-card__actions equipment-card__actions--center">${L.join(`
`)}</div>`:"",N=xe(q);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${N}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${O}
        ${k}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${H}
        </div>
      </div>
      <div class="equipment-card__body">
        ${C}
        ${T}
      </div>
      ${Q}
    </article>
  `}function dc(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,a.appendChild(l)}),t.includes(i)&&(a.value=i),fn(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,s.appendChild(l)}),n.includes(i)&&(s.value=i),fn(s)}const r=document.getElementById("filter-status");r&&fn(r)}function on(){const e=le();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return nt=t||[],nt;const s=new Date;let r=!1;const i=new Set((a||[]).filter(l=>l?.status==="open").map(l=>h(String(l?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(l=>{if(!l)return l;const d=Te(l.status),u=h(String(l.barcode??"")).trim().toLowerCase(),p=u&&i.has(u);let g=p?"maintenance":"available";if(!p&&u)for(const m of n||[]){if(!uc(m,s))continue;if(m.items?.some(b=>h(String(b?.barcode??"")).trim().toLowerCase()===u)){g="reserved";break}}return g!==d?(r=!0,{...l,status:g}):{...l,status:g}});return r?vt(c):(nt=c,Ca({equipment:nt})),nt}function uc(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function na(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function $e(){const e=document.getElementById("equipment-list");if(!e)return;ar();const t=on(),n=Array.isArray(t)?t:Ne(),a=new Map;n.forEach(b=>{if(!b)return;const y=st(b);y&&(a.has(y)||a.set(y,[]),a.get(y).push(b))});const s=Array.from(a.values()).map(b=>{const y=b[0],w=b.reduce((I,_)=>I+(Number.isFinite(Number(_.qty))?Number(_.qty):0),0),v=["maintenance","reserved","available","retired"],x=b.map(I=>Te(I.status)).sort((I,_)=>v.indexOf(I)-v.indexOf(_))[0]||"available",k=b.reduce((I,_)=>{const P=rn(_?.qty??0)||0,M=Te(_?.status);return M==="reserved"?I.reserved+=P:M==="maintenance"&&(I.maintenance+=P),I},{reserved:0,maintenance:0}),O=Math.max(w-k.reserved-k.maintenance,0);return{item:{...y,qty:w,status:x,variants:b,groupKey:st(y),reservedQty:k.reserved,maintenanceQty:k.maintenance,availableQty:O},index:n.indexOf(y)}});s.sort((b,y)=>tc(b.item,y.item));const r=document.getElementById("search-equipment")?.value||"",i=h(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",l=document.getElementById("filter-sub")?.value||"",d=document.getElementById("filter-status")?.value||"",u=d?Te(d):"";if(da&&!n.length){e.innerHTML=na(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(Wt&&!n.length){e.innerHTML=na(Wt,{tone:"error",icon:"⚠️"});return}const p=s.filter(({item:b})=>{const y=h(String(b.barcode??"")).toLowerCase().trim(),w=Array.isArray(b.variants)?b.variants.map(q=>h(String(q.barcode??"")).toLowerCase().trim()).filter(Boolean):[],v=!i||b.name&&b.name.toLowerCase().includes(i)||b.desc&&b.desc.toLowerCase().includes(i)||y&&y.includes(i)||w.some(q=>q.includes(i))||b.category&&b.category.toLowerCase().includes(i)||b.sub&&b.sub.toLowerCase().includes(i),x=!c||b.category===c,k=!l||b.sub===l,O=!u||Te(b.status)===u;return v&&x&&k&&O}),g=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),m=p;e.innerHTML=m.length?m.map(lc).join(""):na(g);const f=document.getElementById("equipment-list-count");if(f){const b=o("equipment.list.countSuffix","عنصر"),y=h(String(m.length)),w=m.length?`${y} ${b}`:`0 ${b}`;f.textContent=w}dc(n)}async function Hn({showToastOnError:e=!0}={}){da=!0,Wt="",$e();try{const t=await ze("/equipment/?all=1"),n=Array.isArray(t?.data)?t.data.map(Dn):[];vt(n)}catch(t){Wt=Ft(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&E(Wt,"error")}finally{da=!1,$e()}}function Ft(e,t,n){if(e instanceof Hs){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function mc(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),r=Fn(t.querySelector("#new-equipment-price")?.value||"0"),i=rn(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",l=t.querySelector("#new-equipment-category")?.value?.trim()||"",d=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){E(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const p=Va({category:l,subcategory:d,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const g=await ze("/equipment/",{method:"POST",body:p}),m=Dn(g?.data),f=[...Ne(),m];vt(f),$e(),t.reset();const b=t.querySelector("#new-equipment-status");b&&(b.value="متاح"),E(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(g){const m=Ft(g,"equipment.toast.addFailed","تعذر إضافة المعدة");E(m,"error")}}async function rr(e){if(!qt()){an();return}const t=Ne(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await ze(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),vt(a),$e(),E(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=Ft(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");E(s,"error")}}async function pc(e,t){const n=Ne(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},vt(r),$e();return}const s=Va({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await ze(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=Dn(r?.data),c=[...n];c[e]=i,vt(c),$e(),E(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=Ft(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw E(i,"error"),r}}function un(){$e()}function ir(e){const n=Ne()[e];if(!n)return;bt=e;const a=Rn(n),s=a[0]||n,r=a.reduce((l,d)=>l+(Number.isFinite(Number(d.qty))?Number(d.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(l=>Te(l.status)).sort((l,d)=>i.indexOf(l)-i.indexOf(d))[0]||Te(s.status);document.getElementById("edit-equipment-index").value=e,za({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:On(s)||"",barcode:s.barcode||"",status:s.status||c}),Ct(!1),ht=En(),Mn(s),sr(s),ft={groupKey:st(s),barcode:String(s.barcode||""),id:s.id||null},Xo(document.getElementById("editEquipmentModal"))?.show()}function fc(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.dataset.equipmentBarcode||"";Go(s)||E(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||rr(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||ir(s)}}function yc(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||ir(n)}}function gc(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||rr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function or(){if(!ft||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=Ne(),a=ft.id?n.find(l=>String(l.id)===String(ft.id)):null,s=ft.groupKey,r=s?n.find(l=>st(l)===s):null,i=a||r;if(!i){wn();return}const c=n.findIndex(l=>l===i);if(c>=0){const l=document.getElementById("edit-equipment-index");l&&(l.value=String(c)),bt=c}if(sr(i),!Bn){const l=Rn(i),d=l[0]||i,u=l.reduce((m,f)=>m+(Number.isFinite(Number(f.qty))?Number(f.qty):0),0),p=["maintenance","reserved","available","retired"],g=l.map(m=>Te(m.status)).sort((m,f)=>p.indexOf(m)-p.indexOf(f))[0]||Te(d.status);za({category:d.category||"",subcategory:d.sub||"",description:d.desc||d.description||"",quantity:String(u||d.qty||0),price:d.price!=null?String(d.price):"0",image:On(d)||"",barcode:d.barcode||"",status:d.status||g}),ht=En()}Mn(primary)}function bc(){document.getElementById("search-equipment")?.addEventListener("input",un),document.getElementById("filter-category")?.addEventListener("change",un),document.getElementById("filter-sub")?.addEventListener("change",un),document.getElementById("filter-status")?.addEventListener("change",un),document.getElementById("add-equipment-form")?.addEventListener("submit",mc);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),oc().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",fc),t.addEventListener("keydown",yc),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",gc),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);ec(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!Bn){ht=En(),Ct(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){E(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:rn(document.getElementById("edit-equipment-quantity").value)||1,price:Fn(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await pc(t,n),ht=En(),Ct(!1),or()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{bc(),$e(),Hn();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(ht&&za(ht),bt!=null){const a=Ne()[bt];if(a){const r=Rn(a)[0]||a;Mn(r)}}Ct(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if($e(),Ct(Bn),bt!=null){const t=Ne()[bt];if(t){const a=Rn(t)[0]||t;Mn(a)}}});document.addEventListener("equipment:refreshRequested",()=>{Hn({showToastOnError:!1})});document.addEventListener(xo.USER_UPDATED,()=>{$e()});document.addEventListener("equipment:changed",()=>{or()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{ft=null,wn(),bt=null,ht=null,Ct(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!hs&&(document.addEventListener(Dt.change,()=>{ar(),$e()}),hs=!0);const hc=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),vc=new Set(["maintenance","reserved","retired"]);function qc(e){const t=String(e??"").trim().toLowerCase();return t&&hc.get(t)||"available"}function Sc(e){return e?typeof e=="object"?e:zn(e):null}function ot(e){const t=Sc(e);return t?qc(t.status||t.state||t.statusLabel||t.status_label):"available"}function cr(e){return!vc.has(ot(e))}function St(e={}){return e.image||e.imageUrl||e.img||""}function Ec(e){if(!e)return null;const t=de(e),{equipment:n=[]}=le();return(n||[]).find(a=>de(a?.barcode)===t)||null}function zn(e){const t=de(e);if(!t)return null;const{equipment:n=[]}=le();return(n||[]).find(a=>de(a?.barcode)===t)||null}function Ie(e=""){return h(String(e)).trim().toLowerCase()}const wc=2;function xc(e){const t=Number(e);return Number.isFinite(t)?t.toFixed(wc):"0.00"}function qs(e={}){const t=Number(e?.qty);return Number.isFinite(t)&&t>0?t:1}function cn(e={}){const t=e?.desc||e?.description||e?.name||"",n=Ie(t),a=xc(e?.price??e?.unitPrice??e?.unit_price??0);return`${n}::${a}`}function Et(e=[]){const t=new Map;return e.forEach((n,a)=>{const s=cn(n);if(!s)return;if(!t.has(s)){const i=n?.desc||n?.description||n?.name||"",c=Ie(i),l=Ss(n),d=n?.image||n?.imageUrl||n?.img||"";t.set(s,{key:s,description:i,normalizedDescription:c,unitPrice:l,image:d,items:[],itemIndices:[],barcodes:[]})}const r=t.get(s);r.items.push(n),r.itemIndices.push(a),n?.barcode&&r.barcodes.push(String(n.barcode))}),Array.from(t.values()).map(n=>({...n,quantity:n.items.reduce((a,s)=>a+qs(s),0)})).map(n=>{const a=n.quantity||0,s=n.items.reduce((i,c)=>{const l=Ss(c),d=qs(c);return i+l*d},0),r=a>0?s/a:n.unitPrice;return{...n,quantity:a,count:a,totalPrice:s,unitPrice:r}})}function Rt(e={}){const t=[e?.id,e?.equipment_id,e?.equipmentId,e?.item_id,e?.itemId];for(const n of t)if(!(n==null||n===""))return String(n);return null}function Ss(e={}){const t=e?.price??e?.unit_price??e?.unitPrice??0,n=Number(t);return Number.isFinite(n)?n:0}function Ua(e){if(!e?.end)return!1;const t=new Date(e.end);return Number.isNaN(t.getTime())?!1:t<new Date}function Ic(e=""){switch(String(e??"").trim().toLowerCase()){case"confirmed":case"مؤكد":return"confirmed";case"in_progress":case"in-progress":case"قيد التنفيذ":case"جاري":return"in_progress";case"completed":case"مكتمل":return"completed";case"cancelled":case"ملغي":return"cancelled";case"pending":case"draft":case"قيد الانتظار":case"بانتظار التأكيد":case"معلق":default:return"pending"}}function ct(e={},t=null){const n=e?.confirmed===!0||e?.confirmed==="true",a=e?.projectId??e?.project_id??null,s=a!=null&&a!==""&&a!=="null",r=s?Ic(t?.status??t?.status_label??t?.statusLabel??""):null,i=s&&(t?.confirmed===!0||["confirmed","in_progress","completed"].includes(r));return{reservationConfirmed:n,projectLinked:s,projectStatus:r,projectConfirmed:i,effectiveConfirmed:s?i:n}}const lr="projects:create:draft",dr="projects.html#projects-section";let ua=null,ur=[],ma=new Map,pa=new Map,xn=new Map,aa=!1,gn=null,Es=!1;function In(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function An(e){return h(String(e||"")).trim().toLowerCase()}function Ac(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function mr(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function pr(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function fr(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function yr(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function Mt(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function Ka(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function wt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Ce(){const{input:e,hidden:t}=wt();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function mt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function gr(e,t,{allowPartial:n=!1}={}){const a=Ie(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function fa(e,t={}){return gr(ma,e,t)}function ya(e,t={}){return gr(pa,e,t)}function Le(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function br(e){ur=Array.isArray(e)?[...e]:[]}function Qa(){return ur}function Ga(e){return e&&Qa().find(t=>String(t.id)===String(e))||null}function ws(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function Lt(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??Je,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:Je}function Re(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??Je,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=Je),t.dataset.companyShare=String(s),t.checked=!0}function ga(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(aa){oe();return}aa=!0;const a=()=>{aa=!1,oe()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(Je)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),Re()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Re():n.checked&&(n.checked=!1));a()}function _c(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function xs(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function Is(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function We({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=Ka();if(!n||!a||!s)return;const r=La()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const l=new Set;ma=new Map;const d=r.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:Is(m)||c})).filter(m=>{if(!m.label)return!1;const f=Ie(m.label);return!f||l.has(f)?!1:(l.add(f),ma.set(f,m),!0)}).sort((m,f)=>m.label.localeCompare(f.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(m=>`<option value="${In(m.label)}"></option>`).join("");const u=t?"":n.value,p=e?String(e):a.value?String(a.value):"",g=p?r.find(m=>String(m.id)===p):null;if(g){const m=Is(g)||c;a.value=String(g.id),n.value=m,n.dataset.selectedId=String(g.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function Pt({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=wt();if(!a||!s||!r)return;const i=Array.isArray(t)?t:Qa()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const l=[...i].filter(b=>b&&b.id!=null).sort((b,y)=>String(y.createdAt||y.start||"").localeCompare(String(b.createdAt||b.start||""))),d=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),p=new Set;pa=new Map;const g=l.map(b=>{const y=ws(b)||u;return{id:String(b.id),label:y}}).filter(b=>{if(!b.label)return!1;const y=Ie(b.label);return!y||p.has(y)?!1:(p.add(y),pa.set(y,b),!0)});r.innerHTML=g.map(b=>`<option value="${In(b.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",f=m?l.find(b=>String(b.id)===m):null;if(f){const b=ws(f)||u;s.value=String(f.id),a.value=b,a.dataset.selectedId=String(f.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function _n(e,t,n){const{date:a,time:s}=Vs(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function hr(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||Pt({selectedValue:a});const r=(La()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";We(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=xs(e,"start"),l=xs(e,"end");c&&_n("res-start","res-start-time",c),l&&_n("res-end","res-end-time",l);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),oe(),rt()}function vr({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:le(),s=Array.isArray(a)?a:[];br(s);const r=t!=null?String(t):n.value?String(n.value):"";Pt({selectedValue:r,projectsList:s}),rt(),oe()}function rt(){const{input:e,hidden:t}=wt(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),l=document.getElementById("res-discount-type"),d=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),p=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(mt(n,Ce),a&&mt(a,Ce)),s&&mt(s,Ce),r&&mt(r,Ce),i&&mt(i,Ce),c&&mt(c,Ce),l&&mt(l,Ce),p)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=d),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=d),s&&(s.value="unpaid",Le(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=d),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=d),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=d),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=d),l&&(l.value="percent",l.disabled=!0,l.classList.add("reservation-input-disabled"),l.title=d);else{if(n){const g=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",g&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.disabled=!1,l.classList.remove("reservation-input-disabled"),l.title="")}ga("tax"),oe()}function Wa(){const{input:e,hidden:t}=wt();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?ya(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=Ga(r.id);i?hr(i,{skipProjectSelectUpdate:!0}):(rt(),oe())}else t.value="",e.dataset.selectedId="",rt(),oe()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?ya(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Xa(){const{input:e,hidden:t}=Ka();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?fa(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),oe()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?fa(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Tc(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){Xt({clearValue:!0});return}let n=null;try{const d=decodeURIComponent(t);n=JSON.parse(d)}catch(d){console.warn("⚠️ [reservations/createForm] Failed to decode project context",d)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),Xt({clearValue:!1}),!n)return;n.fromProjectForm&&(gn={draftStorageKey:n.draftStorageKey||lr,returnUrl:n.returnUrl||dr});const r=document.getElementById("res-project");if(n.projectId){r&&(Pt({selectedValue:String(n.projectId)}),rt());const d=Ga(n.projectId);d?hr(d,{forceNotes:!!n.forceNotes}):oe(),Xt()}else{r&&Pt({selectedValue:""});const d=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");Oc(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),d)}n.start&&_n("res-start","res-start-time",n.start),n.end&&_n("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(La()||[]).find(p=>String(p.id)===String(n.customerId));u?.id!=null&&(We({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(We({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):We({selectedValue:""});const l=document.getElementById("res-notes");l&&n.description&&!l.value&&(l.value=n.description),oe()}function Ot(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Zt(e,n),end:Zt(t,a)}}function qr(e){const t=An(e);if(t){const c=xn.get(t);if(c)return c}const{description:n,barcode:a}=mr(e);if(a){const c=zn(a);if(c)return c}const s=Ie(n||e);if(!s)return null;let r=Qs();if(!r?.length){const c=le();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&Ws(r)}const i=r.find(c=>Ie(c?.desc||c?.description||"")===s);return i||r.find(c=>Ie(c?.desc||c?.description||"").includes(s))||null}function Sr(e,t="equipment-description-options"){const n=An(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(l=>An(l.value)===n)||xn.has(n))return!0;const{description:s}=mr(e);if(!s)return!1;const r=Ie(s);return r?(Qs()||[]).some(c=>Ie(c?.desc||c?.description||"")===r):!1}const $c={available:0,reserved:1,maintenance:2,retired:3};function jc(e){return $c[e]??5}function As(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function kc(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${As(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${As(n)})`}function Ht(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=on(),a=le(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];Ws(r);const i=new Map;r.forEach(d=>{const u=Ac(d),p=An(u);if(!p||!u)return;const g=ot(d),m=jc(g),f=i.get(p);if(!f){i.set(p,{normalized:p,value:u,bestItem:d,bestStatus:g,bestPriority:m,statuses:new Set([g])});return}f.statuses.add(g),m<f.bestPriority&&(f.bestItem=d,f.bestStatus=g,f.bestPriority=m,f.value=u)}),xn=new Map;const l=Array.from(i.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{xn.set(d.normalized,d.bestItem);const u=kc(d),p=In(d.value);if(u===d.value)return`<option value="${p}"></option>`;const g=In(u);return`<option value="${p}" label="${g}"></option>`}).join("");e&&(e.innerHTML=l),t&&(t.innerHTML=l)}function Er(e,t){const n=de(e);if(!n)return!1;const{start:a,end:s}=Ot();if(!a||!s)return E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")),!1;if(it().some(d=>de(d.barcode)===n))return E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز")),!1;if(Ye(n,a,s))return E(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية")),!1;const i=zn(n);if(!i)return E(o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود")),!1;const c=ot(i);if(c==="maintenance"||c==="retired")return E(Mt(c)),!1;const l=Rt(i);return l?(Pa({id:l,equipmentId:l,barcode:n,desc:i.desc,qty:1,price:i.price,image:St(i)}),t&&(t.value=""),lt(),oe(),E(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),!0):(E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")),!1)}function ba(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=qr(t);if(!n){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=Ec(n.barcode),s=ot(a||n);if(s==="maintenance"||s==="retired"){E(Mt(s));return}const r=de(n.barcode);if(!r){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=Rt(n);if(!i){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:St(n)},{start:l,end:d}=Ot();if(!l||!d){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}if(it().some(g=>de(g.barcode)===r)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}if(Ye(r,l,d)){E(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}Pa(c),lt(),oe(),E(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function Cc(){Ht();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),ba(e))});const t=()=>{Sr(e.value,"equipment-description-options")&&ba(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function _s(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-equipment-select-button--active",n),n?(e.classList.add("btn-primary"),e.classList.remove("btn-outline-primary")):(e.classList.add("btn-outline-primary"),e.classList.remove("btn-primary"))}function Lc(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=Ot();if(!t||!n){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}Ko({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):E(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(Dt.change,t=>{_s(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),_s(e,tr()))}function Pc(e){if(!e||!e.detail)return;const{barcode:t}=e.detail;t&&document.getElementById("reservation-form")&&Er(t,null)}function wr(){Lc(),!(Es||typeof document>"u")&&(document.addEventListener(Dt.requestAdd,Pc),Es=!0)}function lt(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=it(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),l=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=Et(n);t.innerHTML=d.map(u=>{const p=u.items[0]||{},g=St(p)||u.image,m=g?`<img src="${g}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',f=h(String(u.count)),b=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,y=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):b*u.count,w=`${h(b.toFixed(2))} ${s}`,v=`${h(y.toFixed(2))} ${s}`,x=u.barcodes.map(O=>h(String(O||""))).filter(Boolean),k=x.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${x.map(O=>`<li>${O}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${m}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${k}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${c}">−</button>
              <span class="reservation-qty-value">${f}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${i}">+</button>
            </div>
          </td>
          <td>${w}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${l}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function Nc(e){const t=it(),a=Et(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(To(s),lt(),oe())}function Bc(e){const t=it(),n=t.filter(a=>cn(a)!==e);n.length!==t.length&&(Gs(n),lt(),oe())}function Dc(e){const t=it(),a=Et(t).find(p=>p.key===e);if(!a)return;const{start:s,end:r}=Ot();if(!s||!r){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(p=>de(p.barcode))),{equipment:c=[]}=le(),l=(c||[]).find(p=>{const g=de(p?.barcode);return!g||i.has(g)||cn({desc:p?.desc||p?.description||p?.name||"",price:Number(p?.price)||0})!==e||!cr(p)?!1:!Ye(g,s,r)});if(!l){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=de(l.barcode),u=Rt(l);if(!u){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}Pa({id:u,equipmentId:u,barcode:d,desc:l.desc||l.description||l.name||a.description||"",qty:1,price:Number.isFinite(Number(l.price))?Number(l.price):a.unitPrice,image:St(l)}),lt(),oe()}function oe(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),l=c?.value||"unpaid",{start:d,end:u}=Ot();i&&Re();const p=Lt(),g=document.getElementById("res-payment-progress-type"),m=document.getElementById("res-payment-progress-value"),f=pr(g),b=fr(m);gs({selectedItems:it(),discount:n,discountType:s,applyTax:i,paidStatus:l,paymentProgressType:f,paymentProgressValue:b,start:d,end:u,companySharePercent:p,paymentHistory:[]});const y=gs.lastResult;y?(yr(m,y.paymentProgressValue),c&&(c.value=y.paymentStatus,Le(c,y.paymentStatus))):Le(c,l)}function Fc(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=h(c.target.value),oe()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",oe),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(Ce()){n.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}ga("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(Ce()){a.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}ga("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(Ce()){s.value="unpaid",Le(s,"unpaid"),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Le(s),oe()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(Ce()){r.value="percent",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",oe()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(Ce()){i.value="",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=h(c.target.value),oe()}),i.dataset.listenerAttached="true"),oe()}function Rc(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){oe();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),oe()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Ts(){const{input:e,hidden:t}=Ka(),{input:n,hidden:a}=wt(),{customers:s}=le();let r=t?.value?String(t.value):"";if(!r&&e?.value){const G=fa(e.value,{allowPartial:!0});G&&(r=String(G.id),t&&(t.value=r),e.value=G.label,e.dataset.selectedId=r)}const i=s.find(G=>String(G.id)===r);if(!i){E(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let l=a?.value?String(a.value):"";if(!l&&n?.value){const G=ya(n.value,{allowPartial:!0});G&&(l=String(G.id),a&&(a.value=l),n.value=G.label,n.dataset.selectedId=l)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,p=document.getElementById("res-start-time")?.value||"00:00",g=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${d}T${p}`,f=`${u}T${g}`,b=new Date(m),y=new Date(f);if(Number.isNaN(b.getTime())||Number.isNaN(y.getTime())||b>=y){E(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const w=$o(),v=it();if(v.length===0&&w.length===0){E(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const x=document.getElementById("res-notes")?.value||"",k=parseFloat(h(document.getElementById("res-discount")?.value))||0,O=document.getElementById("res-discount-type")?.value||"percent",q=document.getElementById("res-payment-status"),I=q?.value||"unpaid",_=document.getElementById("res-payment-progress-type"),P=document.getElementById("res-payment-progress-value"),M=pr(_),C=fr(P),T=l?Ga(l):null,V=_c(T);if(l&&!T){E(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const G of v){const se=ot(G.barcode);if(se==="maintenance"||se==="retired"){E(Mt(se));return}}for(const G of v){const se=de(G.barcode);if(Ye(se,m,f)){E(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const G of w)if(Us(G,m,f)){E(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const H=document.getElementById("res-tax"),L=document.getElementById("res-company-share"),$=!!l;$?(H&&(H.checked=!1,H.disabled=!0,H.classList.add("disabled"),H.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),L&&(L.checked=!1,L.disabled=!0,L.classList.add("disabled"),L.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),q&&(q.value="unpaid",q.disabled=!0,Le(q,"unpaid"),q.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),_&&(_.disabled=!0,_.classList.add("disabled")),P&&(P.value="",P.disabled=!0,P.classList.add("disabled"))):(H&&(H.disabled=!1,H.classList.remove("disabled"),H.title=""),L&&(L.disabled=!1,L.classList.remove("disabled"),L.title=""),q&&(q.disabled=!1,q.title=""),_&&(_.disabled=!1,_.classList.remove("disabled")),P&&(P.disabled=!1,P.classList.remove("disabled")));const Q=$?!1:H?.checked||!1,N=!!L?.checked;if(!$&&N!==Q){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let A=N?Lt():null;N&&(!Number.isFinite(A)||A<=0)&&(Re(),A=Lt());const B=N&&Q&&Number.isFinite(A)&&A>0;Q&&Re();const R=Na(v,k,O,Q,w,{start:m,end:f,companySharePercent:B?A:0}),K=Io(),W=Ba({totalAmount:R,progressType:M,progressValue:C,history:[]});P&&yr(P,W.paymentProgressValue);const ae=[];W.paymentProgressValue!=null&&W.paymentProgressValue>0&&ae.push({type:W.paymentProgressType||M,value:W.paymentProgressValue,amount:W.paidAmount,percentage:W.paidPercent,recordedAt:new Date().toISOString()});const ee=Da({manualStatus:I,paidAmount:W.paidAmount,paidPercent:W.paidPercent,totalAmount:R});q&&(q.value=ee,Le(q,ee));const ne=Ks({reservationCode:K,customerId:c,start:m,end:f,status:V?"confirmed":"pending",title:null,location:null,notes:x,projectId:l||null,totalAmount:R,discount:$?0:k,discountType:$?"percent":O,applyTax:Q,paidStatus:$?"unpaid":ee,confirmed:V,items:v.map(G=>({...G,equipmentId:G.equipmentId??G.id})),technicians:w,companySharePercent:$||!B?null:A,companyShareEnabled:$?!1:B,paidAmount:$?0:W.paidAmount,paidPercentage:$?0:W.paidPercent,paymentProgressType:$?null:W.paymentProgressType,paymentProgressValue:$?null:W.paymentProgressValue,paymentHistory:$?[]:ae});try{const G=await jo(ne);on(),Ht(),sn(),Hc(),E(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof ua=="function"&&ua({type:"created",reservation:G}),Mc(G)}catch(G){console.error("❌ [reservations/createForm] Failed to create reservation",G);const se=Pn(G)?G.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");E(se,"error"),$&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),Xt({clearValue:!1}))}}function Mc(e){if(!gn)return;const{draftStorageKey:t=lr,returnUrl:n=dr}=gn,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}gn=null,n&&(window.location.href=n)}function Xt({clearValue:e=!1}={}){const{input:t,hidden:n}=wt();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,rt())}function Oc(e,t=""){const{input:n,hidden:a}=wt();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),rt())}function Hc(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),We({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),Xt({clearValue:!1}),Pt({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",Le(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),ko(),Gs([]),Ma("form-reset"),lt(),rt(),oe()}function zc(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){Nc(s);return}if(a==="increase-group"&&s){Dc(s);return}if(a==="remove-group"&&s){Bc(s);return}}),e.dataset.listenerAttached="true")}function Vc(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{const s=e.value;s?.trim()&&(clearTimeout(t),t=null,Er(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim())return;const{start:r,end:i}=Ot();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function Uc(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Ts()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Ts()}),t.dataset.listenerAttached="true")}function Xd({onAfterSubmit:e}={}){ua=typeof e=="function"?e:null;const{customers:t,projects:n}=le();_o(t||[]),We(),Xa(),br(n||[]),vr({projectsList:n}),Wa(),Ht(),Cc(),wr(),Rc(),Fc(),zc(),Vc(),Uc(),Tc(),oe(),lt()}function xr(){Ht(),vr(),We(),Xa(),Wa(),wr(),lt(),oe()}if(typeof document<"u"){const e=()=>{We(),Pt({projectsList:Qa()}),Xa(),Wa(),oe()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e)}typeof window<"u"&&(window.getCompanySharePercent=Lt);function Ir(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:pt(t),endDate:pt(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:pt(n),endDate:pt(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:pt(n),endDate:pt(a)}}return e==="upcoming"?{startDate:pt(t),endDate:""}:{startDate:"",endDate:""}}function Kc(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=h(t?.value||"").trim(),i=h(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),Tn(t),Tn(n),r="",i=""),!r&&!i&&c){const d=Ir(c);r=d.startDate,i=d.endDate}return{searchTerm:Ie(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function Jd(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{Qc(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),Tn(a),Tn(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function Qc(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=Ir(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function pt(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function Tn(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function mn(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function Gc(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function Wc(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=Gc(n);if(a!==null)return a}return null}function $s(e,t=0){const n=Wc(e);if(n!=null)return n;const a=mn(e.createdAt??e.created_at);if(a!=null)return a;const s=mn(e.updatedAt??e.updated_at);if(s!=null)return s;const r=mn(e.start);if(r!=null)return r;const i=mn(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function Xc({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((v,x)=>({reservation:v,index:x})),i=t.searchTerm||"",c=t.searchReservationId||"",l=t.searchCustomerName||"",d=t.searchProjectId||"",u=t.startDate||"",p=t.endDate||"",g=t.status||"",m=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,f=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,b=u?new Date(`${u}T00:00:00`):null,y=p?new Date(`${p}T23:59:59`):null,w=r.filter(({reservation:v})=>{const x=n.get(String(v.customerId)),k=s?.get?.(String(v.projectId)),O=v.start?new Date(v.start):null,q=Ua(v),{effectiveConfirmed:I}=ct(v,k);if(m!=null&&String(v.customerId)!==String(m)||f!=null&&!(Array.isArray(v.technicians)?v.technicians.map(T=>String(T)):[]).includes(String(f))||g==="confirmed"&&!I||g==="pending"&&I||g==="completed"&&!q||b&&O&&O<b||y&&O&&O>y)return!1;if(c){const C=[v.reservationId,v.id,v.reservation_id,v.reservationCode,v.reservation_code,v.code,v.reference,v.referenceNumber,v.reference_number],T=Ie(C.filter(H=>H!=null&&H!=="").map(String).join(" ")).replace(/\s+/g,""),V=c.replace(/\s+/g,"");if(!T.includes(V))return!1}if(l&&!Ie(x?.customerName||"").includes(l))return!1;if(d){const C=[v.projectId,v.project_id,v.projectID,k?.id,k?.projectCode,k?.project_code],T=Ie(C.filter(H=>H!=null&&H!=="").map(String).join(" ")).replace(/\s+/g,""),V=d.replace(/\s+/g,"");if(!T.includes(V))return!1}if(!i)return!0;const _=v.items?.map?.(C=>`${C.barcode} ${C.desc}`).join(" ")||"",P=(v.technicians||[]).map(C=>a.get(String(C))?.name).filter(Boolean).join(" ");return Ie([v.reservationId,x?.customerName,v.notes,_,P,k?.title].filter(Boolean).join(" ")).includes(i)});return w.sort((v,x)=>{const k=$s(v.reservation,v.index),O=$s(x.reservation,x.index);return k!==O?O-k:x.index-v.index}),w}function Jc({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),l=o("reservations.list.itemsCountShort","{count} عنصر"),d=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),p=o("reservations.list.status.pending","⏳ غير مؤكد"),g=o("reservations.list.payment.paid","💳 مدفوع"),m=o("reservations.list.payment.unpaid","💳 غير مدفوع"),f=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),b=o("reservations.list.actions.confirm","✔️ تأكيد"),y=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),w=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),v={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:x,index:k})=>{const O=t.get(String(x.customerId)),q=x.projectId?a?.get?.(String(x.projectId)):null,I=Ua(x),_=x.paidStatus??x.paid_status??(x.paid===!0||x.paid==="paid"?"paid":"unpaid"),P=_==="paid",M=_==="partial",{effectiveConfirmed:C,projectLinked:T}=ct(x,q),V=C?"status-confirmed":"status-pending",H=P?"status-paid":M?"status-partial":"status-unpaid";let L=`<span class="reservation-chip status-chip ${V}">${C?u:p}</span>`;const $=P?g:M?f:m;let Q=`<span class="reservation-chip status-chip ${H}">${$}</span>`,N=P?" tile-paid":M?" tile-partial":" tile-unpaid";I&&(N+=" tile-completed");let A="";I&&(L=`<span class="reservation-chip status-chip status-completed">${u}</span>`,Q=`<span class="reservation-chip status-chip status-completed">${$}</span>`,A=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const B=!T&&!C?`<button class="tile-confirm" data-reservation-index="${k}" data-action="confirm">${b}</button>`:"",R=B?`<div class="tile-actions">${B}</div>`:"",K=x.items?.length||0,W=(x.technicians||[]).map(ue=>n.get(String(ue))).filter(Boolean),ae=W.map(ue=>ue.name).join(d)||"—",ee=h(String(x.reservationId??"")),ne=x.start?h(Pe(x.start)):"-",G=x.end?h(Pe(x.end)):"-",se=h(String(x.cost??0)),Ee=h(String(K)),fe=x.notes?h(x.notes):c,we=l.replace("{count}",Ee),z=x.applyTax?`<small>${r}</small>`:"";let J=y;return x.projectId&&(J=q?.title?h(q.title):w),`
      <div class="${B?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${N}"${A} data-reservation-index="${k}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${ee}</div>
          <div class="tile-badges">
            ${L}
            ${Q}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${v.client}</span>
            <span class="tile-value">${O?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.project}</span>
            <span class="tile-value">${J}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.start}</span>
            <span class="tile-value tile-inline">${ne}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.end}</span>
            <span class="tile-value tile-inline">${G}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.cost}</span>
            <span class="tile-value">${se} ${s} ${z}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.equipment}</span>
            <span class="tile-value">${we}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.crew}</span>
            <span class="tile-value">${W.length?ae:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${fe}</span>
          </div>
        </div>
        ${R}
      </div>
    `}).join("")}function De(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Yc(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=ct(e,s),c=e.paid===!0||e.paid==="paid",l=Ua(e),d=e.items||[],u=Et(d),{technicians:p=[]}=le(),g=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(p)?p:[]),m=new Map;g.forEach(F=>{if(!F||F.id==null)return;const Z=String(F.id),be=m.get(Z)||{};m.set(Z,{...be,...F})});const f=(e.technicians||[]).map(F=>m.get(String(F))).filter(Boolean),b=qt(),y=Nn(e.start,e.end),w=(F={})=>{const Z=[F.dailyWage,F.daily_rate,F.dailyRate,F.wage,F.rate];for(const be of Z){if(be==null)continue;const Be=parseFloat(h(String(be)));if(Number.isFinite(Be))return Be}return 0},v=(F={})=>{const Z=[F.dailyTotal,F.daily_total,F.totalRate,F.total,F.total_wage];for(const be of Z){if(be==null)continue;const Be=parseFloat(h(String(be)));if(Number.isFinite(Be))return Be}return w(F)},k=d.reduce((F,Z)=>F+(Z.qty||1)*(Z.price||0),0)*y,O=f.reduce((F,Z)=>F+w(Z),0),q=f.reduce((F,Z)=>F+v(Z),0),I=O*y,_=q*y,P=k+_,M=parseFloat(e.discount)||0,C=e.discountType==="amount"?M:P*(M/100),T=Math.max(0,P-C),V=r?!1:e.applyTax,H=Number(e.cost),L=Number.isFinite(H),$=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,Q=$!=null?parseFloat(h(String($))):NaN;let B=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(Q)&&Q>0)&&Number.isFinite(Q)?Q:0;V&&B<=0&&(B=Je);let R=B>0?Math.max(0,T*(B/100)):0;const K=T+R,W=V?K*.15:0,ae=Number.isFinite(W)&&W>0?Number(W.toFixed(2)):0,ee=K+ae,ne=Number.isFinite(ee)?Number(ee.toFixed(2)):0,G=r?ne:L?H:ne;B>0&&(R=Number(Math.max(0,T*(B/100)).toFixed(2)));const se=h(String(e.reservationId??e.id??"")),Ee=e.start?h(Pe(e.start)):"-",fe=e.end?h(Pe(e.end)):"-",we=h(String(f.length)),z=h(k.toFixed(2)),J=h(C.toFixed(2)),re=h(T.toFixed(2)),ue=h(ae.toFixed(2)),Y=h((Number.isFinite(G)?G:0).toFixed(2)),ye=h(String(y)),me=o("reservations.create.summary.currency","SR"),Ze=o("reservations.details.labels.discount","الخصم"),D=o("reservations.details.labels.tax","الضريبة (15%)"),ie=o("reservations.details.labels.crewTotal","إجمالي الفريق"),Se=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),ge=o("reservations.details.labels.duration","عدد الأيام"),ce=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),Ae=o("reservations.details.labels.netProfit","💵 صافي الربح"),ke=o("reservations.create.equipment.imageAlt","صورة"),ve={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},et=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),Tt=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),X=o("reservations.details.technicians.roleUnknown","غير محدد"),qe=o("reservations.details.technicians.phoneUnknown","غير متوفر"),dt=o("reservations.details.technicians.wage","{amount} {currency} / اليوم"),wi=o("reservations.list.status.confirmed","✅ مؤكد"),xi=o("reservations.list.status.pending","⏳ غير مؤكد"),Ii=o("reservations.list.payment.paid","💳 مدفوع"),Ai=o("reservations.list.payment.unpaid","💳 غير مدفوع"),_i=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),Ti=o("reservations.list.status.completed","📁 منتهي"),$i=o("reservations.details.labels.id","🆔 رقم الحجز"),ji=o("reservations.details.section.bookingInfo","بيانات الحجز"),ki=o("reservations.details.section.paymentSummary","ملخص الدفع"),Ci=o("reservations.details.labels.finalTotal","المجموع النهائي"),Li=o("reservations.details.section.crew","😎 الفريق الفني"),Pi=o("reservations.details.crew.count","{count} عضو"),Ni=o("reservations.details.section.items","📦 المعدات المرتبطة"),Bi=o("reservations.details.items.count","{count} عنصر"),Di=o("reservations.details.actions.edit","✏️ تعديل"),Fi=o("reservations.details.actions.delete","🗑️ حذف"),Ri=o("reservations.details.labels.customer","العميل"),Mi=o("reservations.details.labels.contact","رقم التواصل"),Oi=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Hi=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),zi=o("reservations.details.actions.openProject","📁 فتح المشروع"),Vi=o("reservations.details.labels.start","بداية الحجز"),Ui=o("reservations.details.labels.end","نهاية الحجز"),Ki=o("reservations.details.labels.notes","ملاحظات"),Qi=o("reservations.list.noNotes","لا توجد ملاحظات"),Gi=o("reservations.details.labels.itemsCount","عدد المعدات"),Wi=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),Xi=o("reservations.paymentHistory.title","سجل الدفعات"),Ji=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Yi=o("reservations.list.unknownCustomer","غير معروف"),Jn=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),ls=Jn==="partial",Zi=Jn==="paid"?Ii:ls?_i:Ai,eo=u.reduce((F,Z)=>F+(Number(Z.quantity)||0),0),to=h(String(eo)),ds=Bi.replace("{count}",to),no=Pi.replace("{count}",we),ao=e.notes?h(e.notes):Qi,so=h(_.toFixed(2)),ro=h(String(B)),io=h(R.toFixed(2)),oo=`${ro}% (${io} ${me})`,co=Math.max(0,k+_-C),us=Math.max(0,co-I),lo=h(us.toFixed(2)),tt=[{icon:"💼",label:Wi,value:`${z} ${me}`}];tt.push({icon:"😎",label:ie,value:`${so} ${me}`}),C>0&&tt.push({icon:"💸",label:Ze,value:`${J} ${me}`}),tt.push({icon:"📊",label:Se,value:`${re} ${me}`}),V&&ae>0&&tt.push({icon:"🧾",label:D,value:`${ue} ${me}`}),B>0&&tt.push({icon:"🏦",label:ce,value:oo}),Math.abs(us-(G??0))>.009&&tt.push({icon:"💵",label:Ae,value:`${lo} ${me}`}),tt.push({icon:"💰",label:Ci,value:`${Y} ${me}`});const uo=tt.map(({icon:F,label:Z,value:be})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${F} ${Z}</span>
      <span class="summary-details-value">${be}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let zt=[];Array.isArray(e.paymentHistory)?zt=e.paymentHistory:Array.isArray(e.payment_history)&&(zt=e.payment_history);const mo=Array.isArray(e.paymentLogs)?e.paymentLogs:[],ms=Array.isArray(zt)&&zt.length>0?zt:mo,po=ms.length?`<ul class="reservation-payment-history-list">${ms.map(F=>{const Z=F?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):F?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),be=Number.isFinite(Number(F?.amount))&&Number(F.amount)>0?`${h(Number(F.amount).toFixed(2))} ${me}`:"—",Be=Number.isFinite(Number(F?.percentage))&&Number(F.percentage)>0?`${h(Number(F.percentage).toFixed(2))}%`:"—",$t=F?.recordedAt?h(Pe(F.recordedAt)):"—",jt=F?.note?`<div class="payment-history-note">${De(h(F.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${De(Z)}</span>
              <span class="payment-history-entry__amount">${be}</span>
              <span class="payment-history-entry__percent">${Be}</span>
              <span class="payment-history-entry__date">${$t}</span>
            </div>
            ${jt}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${De(Ji)}</div>`,ps=[{text:i?wi:xi,className:i?"status-confirmed":"status-pending"},{text:Zi,className:Jn==="paid"?"status-paid":ls?"status-partial":"status-unpaid"}];l&&ps.push({text:Ti,className:"status-completed"});const fo=ps.map(({text:F,className:Z})=>`<span class="status-chip ${Z}">${F}</span>`).join(""),ut=(F,Z,be)=>`
    <div class="res-info-row">
      <span class="label">${F} ${Z}</span>
      <span class="value">${be}</span>
    </div>
  `;let Yn="";if(e.projectId){let F=De(Hi);if(s){const Z=s.title||o("projects.fallback.untitled","مشروع بدون اسم");F=`${De(Z)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${De(zi)}</button>`}Yn=`
      <div class="res-info-row">
        <span class="label">📁 ${Oi}</span>
        <span class="value">${F}</span>
      </div>
    `}const Ue=[];Ue.push(ut("👤",Ri,t?.customerName||Yi)),Ue.push(ut("📞",Mi,t?.phone||"—")),Ue.push(ut("🗓️",Vi,Ee)),Ue.push(ut("🗓️",Ui,fe)),Ue.push(ut("📦",Gi,ds)),Ue.push(ut("⏱️",ge,ye)),Ue.push(ut("📝",Ki,ao)),Yn&&Ue.push(Yn);const yo=Ue.join(""),go=u.length?u.map(F=>{const Z=F.items[0]||{},be=St(Z)||F.image,Be=be?`<img src="${be}" alt="${ke}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',$t=Number(F.quantity)||Number(F.count)||0,jt=h(String($t)),fs=Number.isFinite(Number(F.unitPrice))?Number(F.unitPrice):0,qo=Number.isFinite(Number(F.totalPrice))?Number(F.totalPrice):fs*$t,So=`${h(fs.toFixed(2))} ${me}`,Eo=`${h(qo.toFixed(2))} ${me}`,ys=F.barcodes.map(Zn=>h(String(Zn||""))).filter(Boolean),wo=ys.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${ys.map(Zn=>`<li>${Zn}</li>`).join("")}
              </ul>
            </details>`:"";return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${Be}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${De(Z.desc||Z.description||Z.name||F.description||"-")}</div>
                  ${wo}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${De(ve.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${jt}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${De(ve.unitPrice)}">${So}</td>
            <td class="reservation-modal-items-table__cell" data-label="${De(ve.total)}">${Eo}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${De(ve.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${et}</td></tr>`,bo=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${ve.item}</th>
            <th>${ve.quantity}</th>
            <th>${ve.unitPrice}</th>
            <th>${ve.total}</th>
            <th>${ve.actions}</th>
          </tr>
        </thead>
        <tbody>${go}</tbody>
      </table>
    </div>
  `,ho=f.map((F,Z)=>{const be=h(String(Z+1)),Be=F.role||X,$t=F.phone||qe,jt=F.wage?dt.replace("{amount}",h(String(F.wage))).replace("{currency}",me):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${be}</span>
          <span class="technician-name">${F.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${Be}</div>
          <div>📞 ${$t}</div>
          ${jt?`<div>💰 ${jt}</div>`:""}
        </div>
      </div>
    `}).join(""),vo=f.length?`<div class="reservation-technicians-grid">${ho}</div>`:`<ul class="reservation-modal-technicians"><li>${Tt}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${$i}</span>
          <strong>${se}</strong>
        </div>
        <div class="status-chips">
          ${fo}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${ji}</h6>
          ${yo}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${ki}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${uo}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Xi}</h6>
              ${po}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Li}</span>
          <span class="count">${no}</span>
        </div>
        ${vo}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Ni}</span>
          <span class="count">${ds}</span>
        </div>
        ${bo}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${Di}</button>
        ${b?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Fi}</button>`:""}
      </div>
    </div>
  `}const Yd="project",Zd="editProject",eu=3600*1e3,Ar=.15,tu=6,nu="projectsTab",au="projectsSubTab",su={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},ru={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},iu={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},Zc=`@page {
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

.quote-company-license {
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

.quote-section-row--primary {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-start;
}

.quote-section--project,
.quote-section--customer {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  flex: 1 1 0;
}

.quote-section--project {
  text-align: right;
  align-items: flex-end;
}

.quote-section--customer {
  text-align: left;
  align-items: flex-start;
}

.quote-section--project .quote-section__title {
  text-align: right;
  width: 50%;
}

.quote-section--customer .quote-section__title {
  width: 100%;
}

.quote-section--project .info-plain,
.quote-section--project .info-plain__item {
  text-align: right;
  justify-content: flex-end;
}

.quote-section--customer .info-plain,
.quote-section--customer .info-plain__item {
  text-align: left;
  align-items: flex-start;
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

.info-plain__separator {
  color: #000000 !important;
  font-weight: 500;
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
`,_r="reservations.quote.sequence",js={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},Tr="https://help.artratio.sa/guide/quote-preview",he={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},el=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],je=[...el],tl=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function ha(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...je]}function nl(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=ha(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=ha(t.value);if(a.length)return a}const n=je.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...je]}const al=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],$r=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>S(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>S(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>S(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>S(h(Number(e?.price||0).toFixed(2)))}],jr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>S(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>S(e?.role||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>S(e?.phone||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],va={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:$r.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:jr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},kr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>S(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>S(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>S(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Cr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>S(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>S(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>S(e?.note||"-")}],Lr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>S(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>S(h(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>S(h(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>S(e?.displayCost||"—")}],sl=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],rl={customerInfo:va.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:va.payment,projectExpenses:Cr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:kr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:Lr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},sa=new Map;function Vn(e="reservation"){if(sa.has(e))return sa.get(e);const t=e==="project"?sl:al,n=e==="project"?rl:va,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(l=>l.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return sa.set(e,r),r}function Un(e="reservation"){return Vn(e).sectionDefs}function Pr(e="reservation"){return Vn(e).fieldDefs}function Nr(e="reservation"){return Vn(e).sectionIdSet}function Br(e="reservation"){return Vn(e).fieldIdMap}function Dr(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const il="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",ol="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",cl="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",Fr=Zc.trim(),ll=/color\([^)]*\)/gi,$n=/(color\(|color-mix\()/i,dl=document.createElement("canvas"),pn=dl.getContext("2d"),Rr=/^data:image\/svg\+xml/i,ul=/\.svg($|[?#])/i,Gt=512,qa="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",Mr=96,Or=25.4,Sa=210,bn=297,hn=Math.round(Sa/Or*Mr),vn=Math.round(bn/Or*Mr),ml=2,Hr=/safari/i,pl=/(iphone|ipad|ipod)/i,ks=/(iphone|ipad|ipod)/i,fl=/(crios|fxios|edgios|opios)/i,jn="[reservations/pdf]";let U=null,j=null,Oe=1,Ut=null,Kt=null,at=null,kt=null,Jt=!1;function gt(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!U?.statusIndicator||!U?.statusText)return;U.statusKind=e;const r=t||Dr(e);U.statusText.textContent=r,U.statusSpinner&&(U.statusSpinner.hidden=!s),U.statusAction&&(U.statusAction.hidden=!0,U.statusAction.onclick=null,n&&typeof a=="function"&&(U.statusAction.textContent=n,U.statusAction.hidden=!1,U.statusAction.onclick=i=>{i.preventDefault(),a()})),U.statusIndicator.hidden=!1,requestAnimationFrame(()=>{U.statusIndicator.classList.add("is-visible")})}function Yt(e){!U?.statusIndicator||!U?.statusText||(U.statusKind=null,U.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{U?.statusIndicator&&(U.statusIndicator.hidden=!0,U.statusAction&&(U.statusAction.hidden=!0,U.statusAction.onclick=null),U.statusSpinner&&(U.statusSpinner.hidden=!1))},220))}function Ea(){return!!window?.bootstrap?.Modal}function yl(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),at||(at=document.createElement("div"),at.className="modal-backdrop fade show",at.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(at)),kt||(kt=t=>{t.key==="Escape"&&wa(e)},document.addEventListener("keydown",kt));try{e.focus({preventScroll:!0})}catch{}}}function wa(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),at&&(at.remove(),at=null),kt&&(document.removeEventListener("keydown",kt),kt=null))}function gl(e){if(e){if(Ea()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}yl(e)}}function bl(){if(Jt)return;Jt=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!U?.modal?.classList.contains("show"),s=()=>{U?.modal?.classList.contains("show")&&(gt("render"),Jt=!1,xt())};zs({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:Tr}),a&&gt("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function Kn(e="reservation"){const t={},n=Pr(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function Ja(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function hl(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function Ya(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function Za(e="reservation"){return Object.fromEntries(Un(e).map(({id:t})=>[t,!1]))}function es(e,t){return e.sectionExpansions||(e.sectionExpansions=Za(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function vl(e,t){return es(e,t)?.[t]!==!1}function ts(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function ql(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return pl.test(e)}function Sl(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=Hr.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function zr(){return ql()&&Sl()}function Qn(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=ks.test(e)||ks.test(t),s=/Macintosh/i.test(e)&&n>1;return Hr.test(e)&&!fl.test(e)&&(a||s)}function ra(e,...t){try{console.log(`${jn} ${e}`,...t)}catch{}}function Xe(e,...t){try{console.warn(`${jn} ${e}`,...t)}catch{}}function El(e,t,...n){try{t?console.error(`${jn} ${e}`,t,...n):console.error(`${jn} ${e}`,...n)}catch{}}function pe(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function wl(e,t="لا توجد بيانات للعرض."){const n=S(o(e,t));return pe(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function kn(e,t){return Array.isArray(e)&&e.length?e:[wl(t)]}function xa(e,t="#000"){if(!pn||!e)return t;try{return pn.fillStyle="#000",pn.fillStyle=e,pn.fillStyle||t}catch{return t}}function xl(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&n.trim().toLowerCase().startsWith("color(")){console.warn("[quote/pdf] html2canvas color fallback",n);const s=xa(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}const Il=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function Vr(e=""){return Il.test(e)}function Al(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!Vr(r))return a.call(this,r,...i);let c,l=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),l=!0)}catch{}try{if(!l){const d=this.canvas;d&&d.style?.direction!=="rtl"&&(d.__artRatioOriginalDirection=d.style.direction,d.style.direction="rtl")}return a.call(this,r,...i)}finally{if(l&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!l){const d=this.canvas;d&&d.__artRatioOriginalDirection!==void 0&&(d.style.direction=d.__artRatioOriginalDirection,delete d.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function Ur(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(ll,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const _l=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"];function Kr(e,t=window){if(!e||!t||typeof t.getComputedStyle!="function")return;e.querySelectorAll("*").forEach(a=>{const s=t.getComputedStyle(a);if(!s)return;_l.forEach(i=>{const c=s[i];if(c&&$n.test(c)){const l=i.replace(/[A-Z]/g,p=>`-${p.toLowerCase()}`),d=i==="backgroundColor"?"#ffffff":s.color||"#000000",u=xa(c,d);a.style.setProperty(l,u,"important")}});const r=s.backgroundImage;if(r&&$n.test(r)){const i=xa(s.backgroundColor||"#ffffff","#ffffff");a.style.setProperty("background-image","none","important"),a.style.setProperty("background-color",i,"important")}})}function Qr(e,t=window){!e||!t||typeof t.getComputedStyle!="function"||e.querySelectorAll("*").forEach(n=>{const a=t.getComputedStyle(n);if(!a)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(r=>{const i=a[r];if(i&&$n.test(i)){const c=r.replace(/[A-Z]/g,d=>`-${d.toLowerCase()}`),l=r==="backgroundColor"?"#ffffff":"#000000";n.style.setProperty(c,l,"important")}});const s=a.backgroundImage;s&&$n.test(s)&&(n.style.setProperty("background-image","none","important"),n.style.setProperty("background-color","#ffffff","important"))})}function Cs(e,t=Gt){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Tl(e){if(!e)return{width:Gt,height:Gt};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?Cs(t,0):0,s=n?Cs(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,l]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(l)&&l>0?l:0)}}return{width:a||Gt,height:s||Gt}}function Gr(e=""){return typeof e!="string"?!1:Rr.test(e)||ul.test(e)}function $l(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function jl(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function Wr(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await jl(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),l=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=l;const d=i.getContext("2d");return d.clearRect(0,0,c,l),d.drawImage(r,0,0,c,l),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function kl(e){if(!e)return null;if(Rr.test(e))return $l(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Cl(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!Gr(t))return!1;const n=await kl(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",qa),!1;const a=await Wr(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",qa),!1)}async function Ll(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Tl(e),s=await Wr(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||qa),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),l=e.getAttribute("height");return c&&i.setAttribute("width",c),l&&i.setAttribute("height",l),e.parentNode?.replaceChild(i,e),!!s}async function Xr(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{Gr(s.getAttribute?.("src"))&&a.push(Cl(s))}),n.forEach(s=>{a.push(Ll(s))}),a.length&&await Promise.allSettled(a)}function Pl(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(A,B=0)=>{const R=parseFloat(A);return Number.isFinite(R)?R:B},i=r(s.paddingTop),c=r(s.paddingBottom),l=r(s.paddingRight),d=r(s.paddingLeft),u=r(s.borderRadius),p=r(s.fontSize,14),g=(()=>{const A=s.lineHeight;if(!A||A==="normal")return p*1.6;const B=r(A,p*1.6);return B>0?B:p*1.6})(),m=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(m<=0)return null;const f=Math.max(1,m-d-l),b=e.textContent||"",y=b.split(/\r?\n/),w=n.createElement("canvas"),v=w.getContext("2d");if(!v)return null;const x=s.fontStyle||"normal",k=s.fontVariant||"normal",O=s.fontWeight||"400",q=s.fontFamily||"sans-serif",I=s.fontStretch||"normal",_=A=>A.join(" "),P=[],M=A=>v.measureText(A).width;v.font=`${x} ${k} ${O} ${I} ${p}px ${q}`,y.forEach(A=>{const B=A.trim();if(B.length===0){P.push("");return}const R=B.split(/\s+/);let K=[];R.forEach((W,ae)=>{const ee=W.trim();if(!ee)return;const ne=_(K.concat(ee));if(M(ne)<=f||K.length===0){K.push(ee);return}P.push(_(K)),K=[ee]}),K.length&&P.push(_(K))}),P.length||P.push("");const C=i+c+P.length*g,T=Math.ceil(Math.max(1,m)*t),V=Math.ceil(Math.max(1,C)*t);w.width=T,w.height=V,w.style.width=`${Math.max(1,m)}px`,w.style.height=`${Math.max(1,C)}px`,v.scale(t,t);const H=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){v.save(),v.beginPath();const A=Math.max(1,m),B=Math.max(1,C),R=Math.min(u,A/2,B/2);v.moveTo(R,0),v.lineTo(A-R,0),v.quadraticCurveTo(A,0,A,R),v.lineTo(A,B-R),v.quadraticCurveTo(A,B,A-R,B),v.lineTo(R,B),v.quadraticCurveTo(0,B,0,B-R),v.lineTo(0,R),v.quadraticCurveTo(0,0,R,0),v.closePath(),v.clip()}if(v.fillStyle=H,v.fillRect(0,0,Math.max(1,m),Math.max(1,C)),v.font=`${x} ${k} ${O} ${I} ${p}px ${q}`,v.fillStyle=s.color||"#000000",v.textBaseline="top",v.textAlign="right","direction"in v)try{v.direction="rtl"}catch{}const L=Math.max(0,m-l);let $=i;P.forEach(A=>{const B=A.length?A:" ";v.fillText(B,L,$,f),$+=g});const Q=n.createElement("img");let N;try{N=w.toDataURL("image/png")}catch(A){return Xe("note canvas toDataURL failed",A),null}return Q.src=N,Q.alt=b,Q.style.width=`${Math.max(1,m)}px`,Q.style.height=`${Math.max(1,C)}px`,Q.style.display="block",Q.setAttribute("data-quote-note-image","true"),{image:Q,canvas:w,totalHeight:C,width:m}}function Nl(e,{pixelRatio:t=1}={}){if(!e||!Qn())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!Vr(a.textContent||""))return;let s;try{s=Pl(a,{pixelRatio:t})}catch(r){Xe("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function Ia(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){El(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),l=o("reservations.quote.toast.retry","إعادة المحاولة"),d=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(gt("export"),ci()):(gt("render"),Jt=!1,xt())};if(zs({message:i,duration:9e3,actionLabel:d?l:void 0,onAction:d?u:void 0,linkLabel:c,linkHref:Tr}),U?.modal?.classList.contains("show")&&gt("error",{message:i,actionLabel:d?l:void 0,onAction:d?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function Aa({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){Xe("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){Xe("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function ns(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function Ls(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function Ps(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function Bl(){const e=Ps();return e||(Kt||(Kt=ns(ol).catch(t=>{throw Kt=null,t}).then(()=>{const t=Ps();if(!t)throw Kt=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Kt)}async function Dl(){const e=Ls();return e||(Ut||(Ut=ns(cl).catch(t=>{throw Ut=null,t}).then(()=>{const t=Ls();if(!t)throw Ut=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),Ut)}async function Fl(){if(window.html2pdf||await ns(il),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}xl(),Al()}function S(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Rl(e="reservation"){return e==="project"?"QP":"Q"}function Ml(e,t="reservation"){const n=Number(e),a=Rl(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function Ol(){const e=window.localStorage?.getItem?.(_r),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function Jr(e="reservation"){const n=Ol()+1;return{sequence:n,quoteNumber:Ml(n,e)}}function Hl(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(_r,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function Yr(e="reservation"){return js[e]||js.reservation}function zl(e="reservation"){try{const t=Yr(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function Vl(e,t="reservation"){try{const n=Yr(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function Ul(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function Kl(e,t="reservation"){if(!e)return null;const n=Nr(t),a=Br(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,l])=>{const d=i[c];if(d==null)return;const{ids:u,emptyExplicitly:p}=Ul(d);if(!u&&!p)return;const g=Array.isArray(u)?u.filter(m=>l.has(m)):[];(g.length>0||p)&&(r[c]=g)}),{version:1,sections:s,fields:r}}function Zr(e){if(!e)return;const t=e.context||"reservation",n=Kl(e,t);n&&Vl(n,t)}function ei(e){if(!e)return;const t=e.context||"reservation",n=zl(t);if(!n)return;const a=Nr(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=Ja(e.fields||Kn(t)),i=Br(t);Object.entries(n.fields).forEach(([c,l])=>{const d=i[c];if(!d)return;const u=Array.isArray(l)?l.filter(p=>d.has(p)):[];r[c]=new Set(u)}),e.fields=r}}function ti(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function ni(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return 0}function Ql(e={}){const t=[e.dailyTotal,e.daily_total,e.totalRate,e.total,e.total_wage];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return ni(e)}function Gl(e){const t=sn()||[],{technicians:n=[]}=le(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const i=String(r.id),c=s.get(i)||{};s.set(i,{...c,...r})}),(e.technicians||[]).map(r=>s.get(String(r))).filter(Boolean)}function Wl(e,t,n){const{projectLinked:a}=ct(e,n),s=Nn(e.start,e.end),c=(Array.isArray(e.items)?e.items:[]).reduce((N,A)=>N+(Number(A?.qty)||1)*(Number(A?.price)||0),0)*s,l=t.reduce((N,A)=>N+ni(A),0),d=t.reduce((N,A)=>N+Ql(A),0),u=l*s,p=d*s,g=c+p,m=parseFloat(e.discount)||0,f=e.discountType==="amount"?m:g*(m/100),b=Math.max(0,g-f),y=a?!1:e.applyTax,w=Number(e.cost),v=Number.isFinite(w),x=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,k=x!=null?parseFloat(h(String(x).replace("%","").trim())):NaN,O=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let I=(O!=null?O===!0||O===1||O==="1"||String(O).toLowerCase()==="true":Number.isFinite(k)&&k>0)&&Number.isFinite(k)?Number(k):0;y&&I<=0&&(I=Je);let _=I>0?Math.max(0,b*(I/100)):0;_=Number(_.toFixed(2));const P=b+_;let M=y?P*.15:0;(!Number.isFinite(M)||M<0)&&(M=0),M=Number(M.toFixed(2));const C=P+M,T=Number.isFinite(C)?Number(C.toFixed(2)):0,V=a?T:v?w:T,H=Math.max(0,c+p-f),L=Math.max(0,H-u),$={equipmentTotal:c,crewTotal:p,crewCostTotal:u,discountAmount:f,subtotalAfterDiscount:b,taxableAmount:P,taxAmount:M,finalTotal:V,companySharePercent:I,companyShareAmount:_,netProfit:L},Q={equipmentTotal:h(c.toFixed(2)),crewTotal:h(p.toFixed(2)),discountAmount:h(f.toFixed(2)),subtotalAfterDiscount:h(b.toFixed(2)),taxableAmount:h(P.toFixed(2)),taxAmount:h(M.toFixed(2)),finalTotal:h(V.toFixed(2)),companySharePercent:h(I.toFixed(2)),companyShareAmount:h(_.toFixed(2)),netProfit:h(L.toFixed(2))};return{totals:$,totalsDisplay:Q,rentalDays:s}}function Nt(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function ai(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Xl(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=Nt(e.amount??(n==="amount"?e.value:null)),s=Nt(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=ai(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function Jl(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(Xl).filter(Boolean);if(n.length>0)return n;const a=Nt(e.paidPercent??e.paid_percent),s=Nt(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=ai(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function Yl(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function Zl(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function ed(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function td(e){const t=Number(e?.equipmentEstimate)||0,n=ed(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const l=Math.max(0,a-c),d=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,p=d&&s&&u>0?u:0,g=p>0?Number((l*(p/100)).toFixed(2)):0,m=l+g;let f=s?m*Ar:0;(!Number.isFinite(f)||f<0)&&(f=0),f=Number(f.toFixed(2));let b=s?Number(e?.totalWithTax):m;return s?(!Number.isFinite(b)||b<=0)&&(b=Number((m+f).toFixed(2))):b=m,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:l,companyShareAmount:g,subtotal:m,applyTax:s,taxAmount:f,totalWithTax:b}}function nd(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.technicians)?e.technicians:[],i=Na(t,a,s,!1,r,{start:e.start,end:e.end});if(Number.isFinite(i))return i;const c=Number(h(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function ad(e,t){if(!e)return"—";const n=Pe(e);return t?`${n} - ${Pe(t)}`:n}function te(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${h(a.toFixed(s))} ${t}`}function Ns(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function sd(e){if(!e?.start)return null;if(!e?.end)return 1;const t=Nn(e.start,e.end);return Number.isFinite(t)?t:1}function rd(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function id(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=le(),i=e?.id!=null?s.find(D=>String(D.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:te(0,t),expensesTotal:te(0,t),reservationsTotal:te(0,t),discountAmount:te(0,t),taxAmount:te(0,t),overallTotal:te(0,t),paidAmount:te(0,t),remainingAmount:te(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:te(0,t),remainingAmountDisplay:te(0,t),paidPercentDisplay:Ns(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const l=i.clientId??i.customerId??i.client_id??i.customer_id??null,d=l!=null&&n.find(D=>String(D.id)===String(l))||null,u=d?.customerName??d?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),p=(i.clientCompany||d?.companyName||d?.company||"").trim(),g=d?.phone??d?.customerPhone??i.clientPhone??i.customerPhone??"",m=g?h(String(g).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),f=d?.email??i.clientEmail??i.customerEmail??"",b=f?String(f).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),y=i.projectCode||`PRJ-${h(String(i.id??""))}`,w=h(String(y)),v=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),x=Yl(i.type),k=i.start?Pe(i.start):"—",O=i.end?Pe(i.end):"—",q=sd(i),I=q!=null?rd(q):"غير محدد",_=Zl(i),P={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},M=o(`projects.status.${_}`,P[_]||_),C=i.id!=null?String(i.id):null,T=C?a.filter(D=>String(D.projectId)===C):[],H=T.map(D=>{const ie=D.reservationId||D.id||"",Se=D.status||D.state||"pending",ge=String(Se).toLowerCase(),ce=o(`reservations.status.${ge}`,ge),Ae=nd(D),ke=D.start?new Date(D.start).getTime():0;return{reservationId:h(String(ie||"-")),status:ge,statusLabel:ce,total:Ae,totalLabel:te(Ae,t),dateRange:ad(D.start,D.end),startTimestamp:Number.isNaN(ke)?0:ke}}).sort((D,ie)=>ie.startTimestamp-D.startTimestamp).map(({startTimestamp:D,...ie})=>ie).reduce((D,ie)=>D+(Number(ie.total)||0),0),L=new Map;T.forEach(D=>{const ie=Array.isArray(D.items)?D.items:[],Se=Nn(D.start,D.end),ge=D.reservationId||D.id||"";ie.forEach((ce,Ae)=>{if(!ce)return;const ke=ce.barcode||ce.code||ce.id||ce.desc||ce.description||`item-${Ae}`,ve=String(ke||`item-${Ae}`),et=L.get(ve)||{description:ce.desc||ce.description||ce.name||ce.barcode||`#${h(String(Ae+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},Tt=Number(ce.qty)||1,X=Number(ce.price)||0;et.totalQuantity+=Tt,et.reservationIds.add(String(ge));const qe=X*Tt*Math.max(1,Se);Number.isFinite(qe)&&(et.totalCost+=qe),L.set(ve,et)})});const $=Array.from(L.values()).map(D=>({description:D.description,totalQuantity:D.totalQuantity,reservationsCount:D.reservationIds.size,displayCost:te(D.totalCost,t)})),Q=new Map((r||[]).filter(Boolean).map(D=>[String(D.id),D])),N=new Map,A=D=>{if(!D)return;let ie=null;typeof D=="object"?ie=D.id??D.technicianId??D.technician_id??D.userId??D.user_id??null:(typeof D=="string"||typeof D=="number")&&(ie=D);const Se=ie!=null?String(ie):null,ge=Se&&Q.has(Se)?Q.get(Se):typeof D=="object"?D:null,ce=ge?.name||ge?.full_name||ge?.fullName||ge?.displayName||(typeof D=="string"?D:null),Ae=ge?.role||ge?.title||null,ke=ge?.phone||ge?.mobile||ge?.contact||null;if(!ce&&!Se)return;const ve=Se||ce;N.has(ve)||N.set(ve,{id:Se,name:ce||"-",role:Ae||null,phone:ke||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(D=>A(D)),T.forEach(D=>{(Array.isArray(D.technicians)?D.technicians:[]).forEach(Se=>A(Se))});const B=Array.from(N.values()),R=Array.isArray(i.expenses)?i.expenses.map(D=>{const ie=Number(D?.amount)||0;return{label:D?.label||D?.name||"-",amount:ie,displayAmount:te(ie,t),note:D?.note||D?.description||""}}):[],K=td(i),W=K.applyTax?Number(((K.subtotal+H)*Ar).toFixed(2)):0,ae=Number((K.subtotal+H+W).toFixed(2)),ee=Jl(i),ne=Nt(i.paidAmount??i.paid_amount)||0,G=Nt(i.paidPercent??i.paid_percent)||0,se=Ba({totalAmount:ae,paidAmount:ne,paidPercent:G,history:ee}),Ee=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",fe=Da({manualStatus:Ee,paidAmount:se.paidAmount,paidPercent:se.paidPercent,totalAmount:ae}),we={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},z=o(`projects.paymentStatus.${fe}`,we[fe]||fe),J=Number(se.paidAmount||0),re=Number(se.paidPercent||0),ue=Math.max(0,Number((ae-J).toFixed(2))),Y={projectSubtotal:te(K.subtotal,t),expensesTotal:te(K.expensesTotal,t),reservationsTotal:te(H,t),discountAmount:te(K.discountAmount,t),taxAmount:te(W,t),overallTotal:te(ae,t),paidAmount:te(J,t),remainingAmount:te(ue,t)},ye={status:fe,statusLabel:z,paidAmount:J,paidPercent:re,remainingAmount:ue,paidAmountDisplay:te(J,t),remainingAmountDisplay:te(ue,t),paidPercentDisplay:Ns(re)},me=(i.description||"").trim();return{project:i,customer:d,clientInfo:{name:u,company:p||"—",phone:m,email:b},projectInfo:{title:v,code:w,typeLabel:x,startDisplay:k,endDisplay:O,durationLabel:I,statusLabel:M},expenses:R,equipment:$,crew:B,totals:K,totalsDisplay:Y,projectTotals:{combinedTaxAmount:W,overallTotal:ae,reservationsTotal:H,paidAmount:J,paidPercent:re,remainingAmount:ue,paymentStatus:fe},paymentSummary:ye,notes:me,currencyLabel:t,projectStatus:_,projectStatusLabel:M,projectDurationDays:q,projectDurationLabel:I,paymentHistory:ee}}function od({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:l={},currencyLabel:d="SR",sections:u,fieldSelections:p={},quoteNumber:g,quoteDate:m,terms:f=je}){const b=Ja(p),y=(z,J)=>Ya(b,z,J),w=z=>u?.has?.(z),v=`<div class="quote-placeholder">${S(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,x=(z,J)=>`<div class="info-plain__item">
      <span class="info-plain__label">${S(z)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${S(J)}</span>
    </div>`,k=(z,J,{variant:re="inline"}={})=>re==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${S(z)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${S(J)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${S(z)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${S(J)}</span>
    </span>`,O=(z,J)=>`<div class="payment-row">
      <span class="payment-row__label">${S(z)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${S(J)}</span>
    </div>`,q=[];y("customerInfo","customerName")&&q.push(x(o("projects.details.client","العميل"),t.name||"-")),y("customerInfo","customerCompany")&&q.push(x(o("projects.details.company","شركة العميل"),t.company||"—")),y("customerInfo","customerPhone")&&q.push(x(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),y("customerInfo","customerEmail")&&q.push(x(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const I=w("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${S(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${q.length?`<div class="info-plain">${q.join("")}</div>`:v}
      </section>`:"",_=[];y("projectInfo","projectType")&&_.push(x(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),y("projectInfo","projectTitle")&&_.push(x(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),y("projectInfo","projectCode")&&_.push(x(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),y("projectInfo","projectStart")&&_.push(x(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),y("projectInfo","projectEnd")&&_.push(x(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),y("projectInfo","projectDuration")&&_.push(x(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),y("projectInfo","projectStatus")&&_.push(x(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const P=w("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${S(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${_.length?`<div class="info-plain">${_.join("")}</div>`:v}
      </section>`:"",M=kr.filter(z=>y("projectCrew",z.id)),C=w("projectCrew")?M.length?`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${M.map(z=>`<th>${S(z.labelKey?o(z.labelKey,z.fallback):z.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((z,J)=>`<tr>${M.map(re=>`<td>${re.render(z,J)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(M.length,1)}" class="empty">${S(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${v}
          </section>`:"",T=[];y("financialSummary","projectSubtotal")&&T.push(k(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${te(0,d)}`)),y("financialSummary","expensesTotal")&&T.push(k(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||te(0,d))),y("financialSummary","reservationsTotal")&&T.push(k(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||te(0,d))),y("financialSummary","discountAmount")&&T.push(k(o("reservations.details.labels.discount","الخصم"),i.discountAmount||te(0,d))),y("financialSummary","taxAmount")&&T.push(k(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||te(0,d)));const V=[];y("financialSummary","overallTotal")&&V.push(k(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||te(0,d),{variant:"final"})),y("financialSummary","paidAmount")&&V.push(k(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||te(0,d),{variant:"final"})),y("financialSummary","remainingAmount")&&V.push(k(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||te(0,d),{variant:"final"}));const H=w("financialSummary")?!T.length&&!V.length?`<section class="quote-section quote-section--financial">${v}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${S(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${T.length?`<div class="totals-inline">${T.join("")}</div>`:""}
            ${V.length?`<div class="totals-final">${V.join("")}</div>`:""}
          </div>
        </section>`:"",L=Cr.filter(z=>y("projectExpenses",z.id)),$=w("projectExpenses")?L.length?`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${L.map(z=>`<th>${S(z.labelKey?o(z.labelKey,z.fallback):z.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((z,J)=>`<tr>${L.map(re=>`<td>${re.render(z,J)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(L.length,1)}" class="empty">${S(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${v}
          </section>`:"",Q=Lr.filter(z=>y("projectEquipment",z.id)),N=w("projectEquipment")?Q.length?`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Q.map(z=>`<th>${S(z.labelKey?o(z.labelKey,z.fallback):z.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${r.length?r.map((z,J)=>`<tr>${Q.map(re=>`<td>${re.render(z,J)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Q.length,1)}" class="empty">${S(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${v}
          </section>`:"",A=(e?.description||"").trim()||"",B=w("projectNotes")?`<section class="quote-section">
        <h3>${S(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${S(A||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",R=[];y("payment","beneficiary")&&R.push(O(o("reservations.quote.labels.beneficiary","اسم المستفيد"),he.beneficiaryName)),y("payment","bank")&&R.push(O(o("reservations.quote.labels.bank","اسم البنك"),he.bankName)),y("payment","account")&&R.push(O(o("reservations.quote.labels.account","رقم الحساب"),h(he.accountNumber))),y("payment","iban")&&R.push(O(o("reservations.quote.labels.iban","رقم الآيبان"),h(he.iban)));const K=`<section class="quote-section">
      <div class="payment-block">
        <h3>${S(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${R.length?R.join(""):v}</div>
      </div>
      <p class="quote-approval-note">${S(he.approvalNote)}</p>
    </section>`,W=Array.isArray(f)&&f.length?f:je,ae=`<footer class="quote-footer">
        <h4>${S(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${W.map(z=>`<li>${S(z)}</li>`).join("")}</ul>
      </footer>`,ee=[],ne=[];if(P&&ne.push({key:"project",html:P}),I&&ne.push({key:"customer",html:I}),ne.length>1){const z=ne.find(ue=>ue.key==="project"),J=ne.find(ue=>ue.key==="customer"),re=[];z?.html&&re.push(z.html),J?.html&&re.push(J.html),ee.push(pe(`<div class="quote-section-row quote-section-row--primary">${re.join("")}</div>`,{blockType:"group"}))}else ne.length===1&&ee.push(pe(ne[0].html));const G=[];C&&G.push(pe(C,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),$&&G.push(pe($,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),N&&G.push(pe(N,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const se=[];H&&se.push(pe(H,{blockType:"summary"})),B&&se.push(pe(B));const Ee=[pe(K,{blockType:"payment"}),pe(ae,{blockType:"footer"})],fe=[...kn(ee,"projects.quote.placeholder.primary"),...G,...kn(se,"projects.quote.placeholder.summary"),...Ee],we=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${S(he.logoUrl)}" alt="${S(he.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${S(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${S(he.companyName)}</p>
        <p class="quote-company-cr">${S(o("reservations.quote.labels.cr","السجل التجاري"))}: ${S(he.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${S(o("reservations.details.labels.reservationId","رقم العرض"))}</span>
          <strong>${S(g)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${S(o("projects.quote.labels.date","التاريخ"))}</span>
          <strong>${S(m)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Fr}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${we}
          ${fe.join("")}
        </div>
      </div>
    </div>
  `}function si(e){if(e?.context==="project")return od(e);const{reservation:t,customer:n,project:a,technicians:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:l,sections:d,fieldSelections:u={},quoteNumber:p,quoteDate:g,terms:m=je}=e,f=h(String(t?.reservationId??t?.id??"")),b=t.start?h(Pe(t.start)):"-",y=t.end?h(Pe(t.end)):"-",w=n?.customerName||n?.full_name||n?.name||"-",v=n?.phone||"-",x=n?.email||"-",k=n?.company||n?.company_name||"-",O=h(v),q=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),I=a?.code||a?.projectCode||"",_=h(String(c)),P=t?.notes||"",M=Array.isArray(m)&&m.length?m:je,C=Ja(u),T=(X,qe)=>Ya(C,X,qe),V=X=>d?.has?.(X),H=`<div class="quote-placeholder">${S(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,L=(X,qe)=>`<div class="info-plain__item">${S(X)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${S(qe)}</strong></div>`,$=(X,qe,{variant:dt="inline"}={})=>dt==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${S(X)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${S(qe)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${S(X)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${S(qe)}</span>
    </span>`,Q=(X,qe)=>`<div class="payment-row">
      <span class="payment-row__label">${S(X)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${S(qe)}</span>
    </div>`,N=[];T("customerInfo","customerName")&&N.push(L(o("reservations.details.labels.customer","العميل"),w)),T("customerInfo","customerCompany")&&N.push(L(o("reservations.details.labels.company","الشركة"),k)),T("customerInfo","customerPhone")&&N.push(L(o("reservations.details.labels.phone","الهاتف"),O)),T("customerInfo","customerEmail")&&N.push(L(o("reservations.details.labels.email","البريد"),x));const A=V("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${S(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${N.length?`<div class="info-plain">${N.join("")}</div>`:H}
      </section>`:"",B=[];T("reservationInfo","reservationId")&&B.push(L(o("reservations.details.labels.reservationId","رقم الحجز"),f||"-")),T("reservationInfo","reservationStart")&&B.push(L(o("reservations.details.labels.start","بداية الحجز"),b)),T("reservationInfo","reservationEnd")&&B.push(L(o("reservations.details.labels.end","نهاية الحجز"),y)),T("reservationInfo","reservationDuration")&&B.push(L(o("reservations.details.labels.duration","عدد الأيام"),_));const R=V("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${S(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${B.length?`<div class="info-plain">${B.join("")}</div>`:H}
      </section>`:"",K=[];T("projectInfo","projectTitle")&&K.push(L(o("reservations.details.labels.project","المشروع"),q)),T("projectInfo","projectCode")&&K.push(L(o("reservations.details.labels.code","الرمز"),I||"-"));const W=V("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${S(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${K.length?`<div class="info-plain">${K.join("")}</div>`:H}
      </section>`:"",ae=[];T("financialSummary","equipmentTotal")&&ae.push($(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${l}`)),T("financialSummary","crewTotal")&&ae.push($(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${l}`)),T("financialSummary","discountAmount")&&ae.push($(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${l}`)),T("financialSummary","taxAmount")&&ae.push($(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${l}`));const ee=T("financialSummary","finalTotal"),ne=[];ee&&ne.push($(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${l}`,{variant:"final"}));const G=ne.length?`<div class="totals-final">${ne.join("")}</div>`:"",se=V("financialSummary")?!ae.length&&!ee?`<section class="quote-section quote-section--financial">${H}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${S(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${ae.length?`<div class="totals-inline">${ae.join("")}</div>`:""}
            ${G}
          </div>
        </section>`:"",Ee=$r.filter(X=>T("items",X.id)),fe=Ee.length>0,we=fe?Ee.map(X=>`<th>${S(X.labelKey?o(X.labelKey,X.fallback):X.fallback)}</th>`).join(""):"",J=Array.isArray(t.items)&&t.items.length>0?t.items.map((X,qe)=>`<tr>${Ee.map(dt=>`<td>${dt.render(X,qe)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Ee.length,1)}" class="empty">${S(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,re=V("items")?fe?`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${we}</tr>
              </thead>
              <tbody>${J}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.items.title","المعدات"))}</h3>
            ${H}
          </section>`:"",ue=jr.filter(X=>T("crew",X.id)),Y=ue.length>0,ye=Y?ue.map(X=>`<th>${S(X.labelKey?o(X.labelKey,X.fallback):X.fallback)}</th>`).join(""):"",me=s.length?s.map((X,qe)=>`<tr>${ue.map(dt=>`<td>${dt.render(X,qe)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(ue.length,1)}" class="empty">${S(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,Ze=V("crew")?Y?`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${ye}</tr>
              </thead>
              <tbody>${me}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${H}
          </section>`:"",D=V("notes")?`<section class="quote-section">
        <h3>${S(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${S(P||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",ie=[];T("payment","beneficiary")&&ie.push(Q(o("reservations.quote.labels.beneficiary","اسم المستفيد"),he.beneficiaryName)),T("payment","bank")&&ie.push(Q(o("reservations.quote.labels.bank","اسم البنك"),he.bankName)),T("payment","account")&&ie.push(Q(o("reservations.quote.labels.account","رقم الحساب"),h(he.accountNumber))),T("payment","iban")&&ie.push(Q(o("reservations.quote.labels.iban","رقم الآيبان"),h(he.iban)));const Se=`<section class="quote-section">
      <div class="payment-block">
        <h3>${S(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${ie.length?ie.join(""):H}</div>
      </div>
      <p class="quote-approval-note">${S(he.approvalNote)}</p>
    </section>`,ge=`<footer class="quote-footer">
        <h4>${S(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${M.map(X=>`<li>${S(X)}</li>`).join("")}</ul>
      </footer>`,ce=[];A&&R?ce.push(pe(`<div class="quote-section-row">${A}${R}</div>`,{blockType:"group"})):(R&&ce.push(pe(R)),A&&ce.push(pe(A))),W&&ce.push(pe(W));const Ae=[];re&&Ae.push(pe(re,{blockType:"table",extraAttributes:'data-table-id="items"'})),Ze&&Ae.push(pe(Ze,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const ke=[];se&&ke.push(pe(se,{blockType:"summary"})),D&&ke.push(pe(D));const ve=[pe(Se,{blockType:"payment"}),pe(ge,{blockType:"footer"})],et=[...kn(ce,"reservations.quote.placeholder.page1"),...Ae,...kn(ke,"reservations.quote.placeholder.page2"),...ve],Tt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${S(he.logoUrl)}" alt="${S(he.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${S(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${S(he.companyName)}</p>
        <p class="quote-company-cr">${S(o("reservations.quote.labels.cr","السجل التجاري"))}: ${S(he.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${S(p)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${S(g)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Fr}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Tt}
          ${et.join("")}
        </div>
      </div>
    </div>
  `}function cd(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function en(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>cd(c)),i=[s,...r].map(c=>c.catch(l=>(Xe("asset load failed",l),bl(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function ri(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await Xr(r),await en(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let l=null,d=null;const u=q=>{q.style.margin="0 auto",q.style.breakInside="avoid",q.style.pageBreakInside="avoid",q.style.pageBreakAfter="auto",q.style.breakAfter="auto"},p=()=>{const q=a.createElement("div"),I=s.childElementCount===0;if(q.className="quote-page",q.dataset.pageIndex=String(s.childElementCount),I){q.classList.add("quote-page--primary");const P=i.cloneNode(!0);P.removeAttribute("data-quote-header-template"),q.appendChild(P)}else q.classList.add("quote-page--continuation");const _=a.createElement("main");_.className="quote-body",q.appendChild(_),s.appendChild(q),u(q),l=q,d=_},g=()=>{(!l||!d||!d.isConnected)&&p()},m=()=>{if(!l||!d||d.childElementCount>0)return;const q=l;l=null,d=null,q.parentNode&&q.parentNode.removeChild(q)},f=()=>{l=null,d=null},b=()=>l?l.scrollHeight-l.clientHeight>ml:!1,y=(q,{allowOverflow:I=!1}={})=>(g(),d.appendChild(q),b()&&!I?(d.removeChild(q),m(),!1):!0),w=q=>{const I=q.cloneNode(!0);I.removeAttribute?.("data-quote-block"),I.removeAttribute?.("data-block-type"),I.removeAttribute?.("data-table-id"),!y(I)&&(f(),!y(I)&&y(I,{allowOverflow:!0}))},v=q=>{const I=q.querySelector("table");if(!I){w(q);return}const _=q.querySelector("h3"),P=I.querySelector("thead"),M=Array.from(I.querySelectorAll("tbody tr"));if(!M.length){w(q);return}let C=null,T=0;const V=(L=!1)=>{const $=q.cloneNode(!1);$.removeAttribute("data-quote-block"),$.removeAttribute("data-block-type"),$.removeAttribute("data-table-id"),$.classList.add("quote-section--table-fragment"),L&&$.classList.add("quote-section--table-fragment--continued");const Q=_?_.cloneNode(!0):null;Q&&$.appendChild(Q);const N=I.cloneNode(!1);N.classList.add("quote-table--fragment"),P&&N.appendChild(P.cloneNode(!0));const A=a.createElement("tbody");return N.appendChild(A),$.appendChild(N),{section:$,body:A}},H=(L=!1)=>C||(C=V(L),y(C.section)||(f(),y(C.section)||y(C.section,{allowOverflow:!0})),C);M.forEach(L=>{H(T>0);const $=L.cloneNode(!0);if(C.body.appendChild($),b()&&(C.body.removeChild($),C.body.childElementCount||(d.removeChild(C.section),C=null,m()),f(),C=null,H(T>0),C.body.appendChild($),b())){C.section.classList.add("quote-section--table-fragment--overflow"),T+=1;return}T+=1}),C=null};if(!c.length)return;c.forEach(q=>{q.getAttribute("data-block-type")==="table"?v(q):w(q)});const x=Array.from(s.children),k=[];if(x.forEach((q,I)=>{const _=q.querySelector(".quote-body");if(I!==0&&(!_||_.childElementCount===0)){q.remove();return}k.push(q)}),!n){const q=a.defaultView||window,I=Math.min(3,Math.max(1,q.devicePixelRatio||1)),_=Qn()?Math.min(2,I):I;k.forEach(P=>Nl(P,{pixelRatio:_}))}k.forEach((q,I)=>{const _=I===0;q.style.pageBreakAfter="auto",q.style.breakAfter="auto",q.style.pageBreakBefore=_?"auto":"always",q.style.breakBefore=_?"auto":"page",n?q.style.boxShadow="":q.style.boxShadow="none"});const O=k[k.length-1]||null;l=O,d=O?.querySelector(".quote-body")||null,await en(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function as(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function ld(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([Dl(),Bl()]),c=e.ownerDocument||document,l=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,l,c?.documentElement?.getAttribute?.("dir")].some(q=>typeof q=="string"&&q.toLowerCase().startsWith("rtl")),p=typeof window<"u"&&window.devicePixelRatio||1,g=ts(),m=zr(),f=Qn();let b;f?b=1.5:m?b=Math.min(1.7,Math.max(1.2,p*1.1)):g?b=Math.min(1.8,Math.max(1.25,p*1.2)):b=Math.min(2,Math.max(1.6,p*1.4));const y=f||m?.9:g?.92:.95,w=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),v={scale:b,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let x=0;const k=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let q=0;q<s.length;q+=1){const I=s[q];await Xr(I),await en(I);const _=I.ownerDocument||document,P=_.createElement("div");Object.assign(P.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const M=I.cloneNode(!0);M.style.width=`${hn}px`,M.style.maxWidth=`${hn}px`,M.style.minWidth=`${hn}px`,M.style.height=`${vn}px`,M.style.maxHeight=`${vn}px`,M.style.minHeight=`${vn}px`,M.style.position="relative",M.style.background="#ffffff",as(M),P.appendChild(M),_.body.appendChild(P);let C;try{await en(M),C=await i(M,{...v,scale:b,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(A){throw Ia(A,"pageCapture",{toastMessage:k}),A}finally{P.parentNode?.removeChild(P)}if(!C)continue;const T=C.width||1,H=(C.height||1)/T;let L=Sa,$=L*H,Q=0;if($>bn){const A=bn/$;$=bn,L=L*A,Q=Math.max(0,(Sa-L)/2)}const N=C.toDataURL("image/jpeg",y);x>0&&w.addPage(),w.addImage(N,"JPEG",Q,0,L,$,`page-${x+1}`,"FAST"),x+=1,await new Promise(A=>window.requestAnimationFrame(A))}}catch(q){throw Aa({safariWindowRef:n,mobileWindowRef:a}),q}if(x===0)throw Aa({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(m||f){const q=w.output("blob");if(f){const I=URL.createObjectURL(q);Yt();try{window.location.assign(I)}catch(_){Xe("mobile safari blob navigation failed",_)}finally{setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{const I=URL.createObjectURL(q),_=()=>m&&n&&!n.closed?n:a&&!a.closed?a:null,P=(C,T)=>{if(Yt(),!C){window.location.assign(T);return}try{C.location.replace(T),C.focus?.()}catch(V){Xe("direct blob navigation failed",V);try{C.document.open(),C.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${S(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${T}" title="PDF preview"></iframe></body></html>`),C.document.close()}catch(H){Xe("iframe blob delivery failed",H),window.location.assign(T)}}},M=_();P(M,I),setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{Yt();const q=w.output("bloburl"),I=document.createElement("a");I.href=q,I.download=t,I.rel="noopener",I.style.display="none",document.body.appendChild(I),I.click(),setTimeout(()=>{URL.revokeObjectURL(q),I.remove()},2e3)}}function xt(){if(!j||!U)return;const{previewFrame:e}=U;if(!e)return;const t=j.context||"reservation",n=si({context:t,reservation:j.reservation,customer:j.customer,project:j.project,technicians:j.technicians,totals:j.totals,totalsDisplay:j.totalsDisplay,rentalDays:j.rentalDays,currencyLabel:j.currencyLabel,sections:j.sections,fieldSelections:j.fields,quoteNumber:j.quoteNumber,quoteDate:j.quoteDateLabel,terms:j.terms,projectCrew:j.projectCrew,projectExpenses:j.projectExpenses,projectEquipment:j.projectEquipment,projectInfo:j.projectInfo,clientInfo:j.clientInfo,paymentSummary:j.paymentSummary,projectTotals:j.projectTotals});gt("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&(Ur(r),Kr(r,s),Qr(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await ri(i,{context:"preview"}),as(i))}catch(m){console.error("[reservations/pdf] failed to layout preview document",m)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),l=a?.querySelector(".quote-preview-pages"),d=hn;let u=18;if(l&&a?.defaultView){const m=a.defaultView.getComputedStyle(l),f=parseFloat(m.rowGap||m.gap||`${u}`);Number.isFinite(f)&&f>=0&&(u=f)}const p=vn,g=c.length?c.length*p+Math.max(0,(c.length-1)*u):p;if(e.dataset.baseWidth=String(d),e.dataset.baseHeight=String(g),e.style.width=`${d}px`,e.style.minWidth=`${d}px`,e.style.height=`${g}px`,e.style.minHeight=`${g}px`,U?.previewFrameWrapper&&!U?.userAdjustedZoom){const m=U.previewFrameWrapper.clientWidth-24;m>0&&m<d?Oe=Math.max(m/d,.3):Oe=1}oi(Oe)}finally{Yt()}},{once:!0})}function dd(e){if(!j)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?j.sections.add(n):j.sections.delete(n),Zr(j),ii(),xt())}function ud(e){if(!j)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=j.context||"reservation",r=j.fields||(j.fields=Kn(s)),i=hl(r,n);t.checked?i.add(a):i.delete(a),Zr(j),xt()}function md(e){if(!j)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(es(j,n),j.sectionExpansions[n]=t.open)}function ii(){if(!U?.toggles||!j)return;const{toggles:e}=U,t=j.fields||{},n=j.context||"reservation";es(j);const a=Un(n),s=Pr(n),r=a.map(({id:i,labelKey:c,fallback:l})=>{const d=o(c,l),u=j.sections.has(i),p=s[i]||[],g=vl(j,i),m=p.length?`<div class="quote-toggle-sublist">
          ${p.map(f=>{const b=Ya(t,i,f.id),y=u?"":"disabled",w=f.labelKey?o(f.labelKey,f.fallback):f.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${f.id}" ${b?"checked":""} ${y}>
                <span>${S(w)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${i}" ${g?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${i}" ${u?"checked":""}>
            <span>${S(d)}</span>
          </label>
          ${p.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${m}
      </details>
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",dd)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",ud)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",md)})}function pd(){if(U?.modal)return U;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${S(o("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${S(o("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
              <div class="quote-terms-editor" data-quote-terms-editor>
                <label class="quote-terms-editor__label" for="quote-terms-input">${S(o("reservations.quote.termsEditor.title","الشروط العامة (قابلة للتعديل)"))}</label>
                <textarea id="quote-terms-input" class="quote-terms-editor__textarea" rows="6" data-quote-terms-input placeholder="${S(o("reservations.quote.termsEditor.placeholder","اكتب كل شرط في سطر مستقل"))}"></textarea>
                <button type="button" class="quote-terms-reset" data-quote-terms-reset>${S(o("reservations.quote.termsEditor.reset","استعادة الشروط الافتراضية"))}</button>
              </div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${S(o("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${S(o("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),r=e.querySelector("[data-quote-terms-reset]"),i=e.querySelector("[data-quote-download]"),c=e.querySelector(".modal-header"),l=c?.querySelector(".btn-close"),d=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",c&&c.insertBefore(u,l||null);const p=document.createElement("iframe");p.className="quote-preview-frame",p.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),p.setAttribute("loading","lazy"),p.setAttribute("frameborder","0");const g=document.createElement("div");g.className="quote-preview-zoom-controls",g.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${S(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${S(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${S(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(p),n.innerHTML="";const f=document.createElement("div");f.className="quote-preview-scroll",f.appendChild(m),n.appendChild(f);const b=document.createElement("div");b.className="quote-preview-status",b.setAttribute("role","status"),b.setAttribute("aria-live","polite"),b.hidden=!0,b.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${S(Dr("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(b),u.appendChild(g),i?.addEventListener("click",async()=>{if(j){i.disabled=!0;try{await ci()}finally{i.disabled=!1}}});const y=()=>{Ea()||wa(e)};d.forEach(k=>{k?.addEventListener("click",y)}),l&&!d.includes(l)&&l.addEventListener("click",y),e.addEventListener("click",k=>{Ea()||k.target===e&&wa(e)}),U={modal:e,toggles:t,preview:n,previewScroll:f,previewFrameWrapper:m,zoomControls:g,zoomValue:g.querySelector("[data-zoom-value]"),previewFrame:p,meta:a,downloadBtn:i,statusIndicator:b,statusText:b.querySelector("[data-quote-status-text]"),statusSpinner:b.querySelector("[data-quote-status-spinner]"),statusAction:b.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const w=g.querySelector("[data-zoom-out]"),v=g.querySelector("[data-zoom-in]"),x=g.querySelector("[data-zoom-reset]");return w?.addEventListener("click",()=>Bs(-.1)),v?.addEventListener("click",()=>Bs(.1)),x?.addEventListener("click",()=>Cn(1,{markManual:!0})),s&&s.addEventListener("input",yd),r&&r.addEventListener("click",gd),Cn(Oe),U}function Cn(e,{silent:t=!1,markManual:n=!1}={}){Oe=Math.min(Math.max(e,.25),2.2),n&&U&&(U.userAdjustedZoom=!0),oi(Oe),!t&&U?.zoomValue&&(U.zoomValue.textContent=`${Math.round(Oe*100)}%`)}function Bs(e){Cn(Oe+e,{markManual:!0})}function oi(e){if(!U?.previewFrame||!U.previewFrameWrapper)return;const t=U.previewFrame,n=U.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",ts()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function fd(){if(!U?.meta||!j)return;const{meta:e}=U;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${S(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${S(j.quoteNumber)}</strong></div>
      <div><span>${S(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${S(j.quoteDateLabel)}</strong></div>
    </div>
  `}function ss(){if(!U?.termsInput)return;const e=(j?.terms&&j.terms.length?j.terms:je).join(`
`);U.termsInput.value!==e&&(U.termsInput.value=e)}function yd(e){if(!j)return;const t=ha(e?.target?.value??"");if(t.length){j.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{j.terms=[...je],ss();const n=je.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}xt()}function gd(e){if(e?.preventDefault?.(),!j)return;j.terms=[...je];const t=document.getElementById("reservation-terms");t&&(t.value=je.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=je.join(`
`)),ss(),xt()}async function ci(){if(!j)return;gt("export");const t=!ts()&&zr(),n=Qn(),a=null,s=!n&&t?window.open("","_blank"):null;(l=>{if(l)try{l.document.open(),l.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${S(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${S(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${S(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),l.document.close()}catch(d){Xe("failed to prime download window",d)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await Fl(),ra("html2pdf ensured");const l=j.context||"reservation",d=si({context:l,reservation:j.reservation,customer:j.customer,project:j.project,technicians:j.technicians,totals:j.totals,totalsDisplay:j.totalsDisplay,rentalDays:j.rentalDays,currencyLabel:j.currencyLabel,sections:j.sections,fieldSelections:j.fields,quoteNumber:j.quoteNumber,quoteDate:j.quoteDateLabel,terms:j.terms,projectCrew:j.projectCrew,projectExpenses:j.projectExpenses,projectEquipment:j.projectEquipment,projectInfo:j.projectInfo,clientInfo:j.clientInfo,paymentSummary:j.paymentSummary,projectTotals:j.projectTotals});i=document.createElement("div"),i.innerHTML=d,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),Ur(i),Kr(i),Qr(i),ra("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await ri(u,{context:"export"}),await en(u),as(u),ra("layout complete for export document")}catch(g){Ia(g,"layoutQuoteDocument",{suppressToast:!0})}}const p=`quotation-${j.quoteNumber}.pdf`;await ld(u,{filename:p,safariWindowRef:s,mobileWindowRef:a}),j.sequenceCommitted||(Hl(j.quoteSequence),j.sequenceCommitted=!0)}catch(l){Aa({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,Ia(l,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),Yt()}}function li(){const e=pd();e?.modal&&(Jt=!1,Oe=1,U&&(U.userAdjustedZoom=!1),Cn(Oe,{silent:!0}),ii(),fd(),ss(),xt(),gl(e.modal))}async function bd({reservation:e,customer:t,project:n}){if(!e){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=Gl(e),{totalsDisplay:s,totals:r,rentalDays:i}=Wl(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:l,quoteNumber:d}=Jr("reservation"),u=new Date,p=nl();j={context:"reservation",reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(Un("reservation").filter(g=>g.defaultSelected).map(g=>g.id)),sectionExpansions:Za("reservation"),fields:Kn("reservation"),terms:p,quoteSequence:l,quoteNumber:d,quoteDate:u,quoteDateLabel:ti(u),sequenceCommitted:!1},ei(j),li()}async function ou({project:e}){if(!e){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=id(e),{project:n}=t;if(!n){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=Jr("project"),r=new Date,i=[...tl];j={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(Un("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:Za("project"),fields:Kn("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:ti(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},ei(j),li()}function hd({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=sn(),{reservations:r=[],customers:i=[],technicians:c=[],projects:l=[]}=le(),d=Array.isArray(s)?s:c||[],u=new Map((l||[]).map(y=>[String(y.id),y])),p=document.getElementById(e);if(!p){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){p.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const g=t||Kc(),m=new Map(i.map(y=>[String(y.id),y])),f=new Map(d.map(y=>[String(y.id),y])),b=Xc({reservations:r,filters:g,customersMap:m,techniciansMap:f,projectsMap:u});if(b.length===0){p.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}p.innerHTML=`<div class="reservations-grid">${Jc({entries:b,customersMap:m,techniciansMap:f,projectsMap:u})}</div>`,p.querySelectorAll('[data-action="details"]').forEach(y=>{const w=Number(y.dataset.reservationIndex);Number.isNaN(w)||y.addEventListener("click",()=>{typeof n=="function"&&n(w)})}),p.querySelectorAll('button[data-action="confirm"]').forEach(y=>{const w=Number(y.dataset.reservationIndex);Number.isNaN(w)||y.addEventListener("click",v=>{v.stopPropagation(),typeof a=="function"&&a(w,v)})})}function vd(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=le(),c=s[e];if(!c)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const l=r.find(w=>String(w.id)===String(c.customerId)),d=c.projectId?i.find(w=>String(w.id)===String(c.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const w=sn()||[];u.innerHTML=Yc(c,l,w,e,d)}const p=document.getElementById("reservationDetailsModal"),g=()=>{p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(p)?.hide()},m=document.getElementById("reservation-details-edit-btn");m&&(m.onclick=()=>{g(),typeof t=="function"&&t(e,{reservation:c,customer:l,getEditContext:a})});const f=document.getElementById("reservation-details-delete-btn");f&&(f.onclick=()=>{g(),typeof n=="function"&&n(e,{reservation:c,customer:l})});const b=u?.querySelector('[data-action="open-project"]');b&&d&&b.addEventListener("click",()=>{g();const w=d?.id!=null?String(d.id):"",v=w?`projects.html?project=${encodeURIComponent(w)}`:"projects.html";window.location.href=v});const y=document.getElementById("reservation-details-export-btn");return y&&(y.onclick=async w=>{w?.preventDefault?.(),w?.stopPropagation?.(),y.blur();try{await bd({reservation:c,customer:l,project:d})}catch(v){console.error("❌ [reservations] export to PDF failed",v),E(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(p).show(),!0}function di(){const e=()=>{on(),$e(),sn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let Ds=!1,Fs=null;function qd(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function cu(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=qd(n);if(!a&&Ds&&yt().length>0&&s===Fs)return yt();try{const r=await Xs(n||{});return Ds=!0,Fs=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return yt()}}async function Sd(e,{onAfterChange:t}={}){if(!qt())return an(),!1;const a=yt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await Co(s),di(),t?.({type:"deleted",reservation:a}),E(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=Pn(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return E(i,"error"),!1}}async function Ed(e,{onAfterChange:t}={}){const a=yt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=ct(a);if(r)return E(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await Lo(s);return di(),t?.({type:"confirmed",reservation:i}),E(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=Pn(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return E(c,"error"),!1}}function ln(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Zt(e,n),end:Zt(t,a)}}function It(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,Ms(t);return}const l=Et(e);t.innerHTML=l.map(d=>{const u=d.items[0]||{},p=St(u)||d.image,g=p?`<img src="${p}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=h(String(d.count)),f=Number.isFinite(Number(d.unitPrice))?Number(d.unitPrice):0,b=Number.isFinite(Number(d.totalPrice))?Number(d.totalPrice):f*d.count,y=`${h(f.toFixed(2))} ${a}`,w=`${h(b.toFixed(2))} ${a}`,v=d.barcodes.map(k=>h(String(k||""))).filter(Boolean),x=v.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${v.map(k=>`<li>${k}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${d.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${g}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${d.description||"-"}</div>
                ${x}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${d.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${d.key}" aria-label="${i}">−</button>
              <span class="reservation-qty-value">${m}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${d.key}" aria-label="${r}">+</button>
            </div>
          </td>
          <td>${y}</td>
          <td>${w}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),Ms(t)}function wd(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function Gn(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=Wn();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,Rs();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${h(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${h(Number(s.percentage).toFixed(2))}%`:"—",l=s?.recordedAt?h(Pe(s.recordedAt)):"—",d=wd(s?.type),u=s?.note?h(s.note):"";return`
      <tr>
        <td>${d}</td>
        <td>${i}</td>
        <td>${c}</td>
        <td>${l}</td>
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
  `,Rs()}function xd(){if(tn()){E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=pi(e);let a=fi(t);if(!Number.isFinite(a)||a<=0){E(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=ca.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,l=o("reservations.create.summary.currency","SR");let d=null,u=null;if(n==="percent"){const g=Math.max(0,100-i);if(g<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,g);if(m!==a){const f=h(m.toFixed(2));E(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",f)),a=m}u=Number(a.toFixed(2)),r>0&&(d=a/100*r)}else{const g=Math.max(0,r-c);if(g<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,g);if(m!==a){const f=`${h(m.toFixed(2))} ${l}`;E(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",f)),a=m}d=Number(a.toFixed(2)),r>0&&(u=d/r*100)}d!=null&&(d=Number(d.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const p={type:n,value:a,amount:d,percentage:u,recordedAt:new Date().toISOString()};Pd(p),rs(Wn()),Gn(),Me(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),E(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function Rs(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(tn()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}xd()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(tn()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(Nd(s),rs(Wn()),Gn(),Me(),E(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function Id(e){const{index:t,items:n}=At(),s=Et(n).find(c=>c.key===e);if(!s)return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,l)=>l!==r);_t(t,i),It(i),Me()}function Ad(e){const{index:t,items:n}=At(),a=n.filter(s=>cn(s)!==e);a.length!==n.length&&(_t(t,a),It(a),Me())}function _d(e){const{index:t,items:n}=At(),s=Et(n).find(y=>y.key===e);if(!s)return;const{start:r,end:i}=ln();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=le(),l=t!=null&&c[t]||null,d=l?.id??l?.reservationId??null,u=new Set(n.map(y=>de(y.barcode))),{equipment:p=[]}=le(),g=(p||[]).find(y=>{const w=de(y?.barcode);return!w||u.has(w)||cn({desc:y?.desc||y?.description||y?.name||"",price:Number(y?.price)||0})!==e||!cr(y)?!1:!Ye(w,r,i,d)});if(!g){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const m=de(g.barcode),f=Rt(g);if(!f){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const b=[...n,{id:f,equipmentId:f,barcode:m,desc:g.desc||g.description||g.name||s.description||"",qty:1,price:Number.isFinite(Number(g.price))?Number(g.price):s.unitPrice,image:St(g)}];_t(t,b),It(b),Me()}function Ms(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){Id(s);return}if(a==="increase-edit-group"&&s){_d(s);return}if(a==="remove-edit-group"&&s){Ad(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||jd(i)}}),e.dataset.groupListenerAttached="true")}function tn(){return!!document.getElementById("edit-res-project")?.value}function Td(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{tn()&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function $d(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),l=document.getElementById("edit-res-payment-history");[n,a,s,r,i,c,l].forEach(Td),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s&&(s.value="unpaid",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),l&&(l.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.dataset.linkedDisabled="false"))}function Me(){const e=document.getElementById("edit-res-summary");if(!e)return;Gn();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),Le(a),Me()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=tn();$d(c);const l=document.getElementById("edit-res-tax"),d=c?!1:l?.checked||!1,u=!c&&a?.dataset?.userSelected==="true",p=c?"unpaid":u&&a?.value||"unpaid";let g=null;!c&&d&&(Re("edit-res-company-share"),g=Lt("edit-res-company-share"),(!Number.isFinite(g)||g<=0)&&(Re("edit-res-company-share"),g=Lt("edit-res-company-share")));const{items:m=[],payments:f=[]}=At(),{start:b,end:y}=ln(),w=ca({items:m,discount:r,discountType:i,applyTax:d,paidStatus:p,start:b,end:y,companySharePercent:g,paymentHistory:f});e.innerHTML=w;const v=ca.lastResult;if(v&&a){const x=v.paymentStatus;u?Le(a,a.value):(a.value!==x&&(a.value=x),a.dataset&&delete a.dataset.userSelected,Le(a,x))}else a&&Le(a,a.value)}function jd(e){if(e==null)return;const{index:t,items:n}=At();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);_t(t,a),It(a),Me()}function kd(e){const t=e?.value??"",n=de(t);if(!n)return;const a=zn(n);if(!a){E(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=ot(a);if(s==="maintenance"||s==="retired"){E(Mt(s));return}const r=de(n),{index:i,items:c=[]}=At();if(c.findIndex(y=>de(y.barcode)===r)>-1){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=ln();if(!d||!u){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:p=[]}=le(),g=i!=null&&p[i]||null,m=g?.id??g?.reservationId??null;if(Ye(r,d,u,m)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const f=Rt(a);if(!f){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const b=[...c,{id:f,equipmentId:f,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];_t(i,b),e&&(e.value=""),It(b),Me()}function Ln(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=qr(t),a=de(n?.barcode||t);if(!n||!a){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=ot(n);if(s==="maintenance"||s==="retired"){E(Mt(s));return}const{start:r,end:i}=ln();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:l=[]}=At();if(l.some(b=>de(b.barcode)===a)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=le(),p=c!=null&&u[c]||null,g=p?.id??p?.reservationId??null;if(Ye(a,r,i,g)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=Rt(n);if(!m){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const f=[...l,{id:m,equipmentId:m,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];_t(c,f),It(f),Me(),e.value=""}function ui(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Ln(e))});const t=()=>{Sr(e.value,"edit-res-equipment-description-options")&&Ln(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}typeof document<"u"&&document.addEventListener("language:changed",()=>{Me()});typeof window<"u"&&(window.getEditReservationDateRange=ln,window.renderEditPaymentHistory=Gn);function Cd(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){ba(e);return}Ln(e)}}function lu(){Ht(),ui()}function Ld(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let nn=null,Ke=[],He=[],_a=null,_e={},ia=!1;function Ta(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function $a(){return document.getElementById("edit-res-confirmed")?.value==="true"}function At(){return{index:nn,items:Ke,payments:He}}function _t(e,t,n=He){nn=typeof e=="number"?e:null,Ke=Array.isArray(t)?[...t]:[],He=Array.isArray(n)?[...n]:[]}function mi(){nn=null,Ke=[],Do(),He=[]}function Wn(){return[...He]}function rs(e){He=Array.isArray(e)?[...e]:[]}function Pd(e){e&&(He=[...He,e])}function Nd(e){!Number.isInteger(e)||e<0||(He=He.filter((t,n)=>n!==e))}function Bd(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function pi(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function fi(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Dd(e,t){if(e){e.value="";return}}function Qt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function yi(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),l=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,d=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:l,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:d}}function Fd(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((l,d)=>String(d.createdAt||d.start||"").localeCompare(String(l.createdAt||l.start||""))):[],c=[`<option value="">${Qt(a)}</option>`];i.forEach(l=>{c.push(`<option value="${Qt(l.id)}">${Qt(l.title||a)}</option>`)}),r&&!i.some(l=>String(l.id)===r)&&c.push(`<option value="${Qt(r)}">${Qt(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function gi(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const l=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",l&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}ja("tax");const c=_e?.updateEditReservationSummary;typeof c=="function"&&c()}function ja(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=_e?.updateEditReservationSummary;typeof r=="function"&&r()};if(ia){a();return}ia=!0;const s=()=>{ia=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(Je)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),Re("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Re("edit-res-company-share"):n.checked&&(n.checked=!1));s()}function Os(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:l}=le(),u=yt()?.[e];if(!u){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}_e={..._e,reservation:u,projects:l||[]},t?.(),Fd(l||[],u);const p=u.projectId&&l?.find?.(N=>String(N.id)===String(u.projectId))||null,{effectiveConfirmed:g,projectLinked:m}=ct(u,p),f=u.items?u.items.map(N=>({...N,equipmentId:N.equipmentId??N.equipment_id??N.id,barcode:de(N?.barcode)})):[],y=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(N=>yi(N)).filter(Boolean);_t(e,f,y);const w=o("reservations.list.unknownCustomer","غير معروف"),v=c?.find?.(N=>String(N.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const x=document.getElementById("edit-res-id");x&&(x.value=u.reservationId||u.id);const k=document.getElementById("edit-res-customer");k&&(k.value=v?.customerName||w);const O=typeof a=="function"?a(u.start):{date:"",time:""},q=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",O.date),n?.("edit-res-start-time",O.time),n?.("edit-res-end",q.date),n?.("edit-res-end-time",q.time);const I=document.getElementById("edit-res-notes");I&&(I.value=u.notes||"");const _=document.getElementById("edit-res-discount");if(_){const N=m?0:u.discount??0;_.value=h(N)}const P=document.getElementById("edit-res-discount-type");P&&(P.value=m?"percent":u.discountType||"percent");const M=u.projectId?!1:!!u.applyTax,C=document.getElementById("edit-res-tax");C&&(C.checked=M);const T=document.getElementById("edit-res-company-share");if(T){const N=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,A=N!=null?Number.parseFloat(h(String(N).replace("%","").trim())):NaN,B=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,R=B!=null?B===!0||B===1||B==="1"||String(B).toLowerCase()==="true":Number.isFinite(A)&&A>0,K=R&&Number.isFinite(A)&&A>0?A:Je,W=M||R;T.checked=W,T.dataset.companyShare=String(K)}Ta(g,{disable:m});const V=document.getElementById("edit-res-paid"),H=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");V&&(V.value=H,V.dataset&&delete V.dataset.userSelected);const L=document.getElementById("edit-res-payment-progress-type"),$=document.getElementById("edit-res-payment-progress-value");if(L?.dataset?.userSelected&&delete L.dataset.userSelected,L&&(L.value="percent"),Dd($),Po((u.technicians||[]).map(N=>String(N))),s?.(f),typeof window<"u"){const N=window?.renderEditPaymentHistory;typeof N=="function"&&N()}gi(),r?.();const Q=document.getElementById("editReservationModal");_a=Bd(Q,i),_a?.show?.()}async function Rd({combineDateTime:e,hasEquipmentConflict:t,hasTechnicianConflict:n,updateEditReservationSummary:a,renderReservations:s,populateEquipmentDescriptionLists:r,handleReservationsMutation:i}={}){if(nn===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const c=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",d=document.getElementById("edit-res-end")?.value?.trim(),u=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",p=document.getElementById("edit-res-notes")?.value||"",g=h(document.getElementById("edit-res-discount")?.value||"0");let m=parseFloat(g)||0,f=document.getElementById("edit-res-discount-type")?.value||"percent";const b=$a(),y=document.getElementById("edit-res-paid"),w=y?.dataset?.userSelected==="true",v=w&&y?.value||"unpaid",x=document.getElementById("edit-res-payment-progress-type"),k=document.getElementById("edit-res-payment-progress-value"),O=pi(x),q=fi(k),I=document.getElementById("edit-res-project")?.value||"",_=No(),P=document.getElementById("edit-res-company-share"),M=document.getElementById("edit-res-tax");if(!c||!d){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const C=typeof e=="function"?e:(Y,ye)=>`${Y}T${ye||"00:00"}`,T=C(c,l),V=C(d,u);if(T&&V&&new Date(T)>new Date(V)){E(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const L=yt()?.[nn];if(!L){E(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(Ke)||Ke.length===0&&_.length===0){E(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const $=typeof t=="function"?t:()=>!1,Q=L.id??L.reservationId;for(const Y of Ke){const ye=ot(Y.barcode);if(ye==="reserved"){const me=de(Y.barcode);if(!$(me,T,V,Q))continue}if(ye!=="available"){E(Mt(ye));return}}for(const Y of Ke){const ye=de(Y.barcode);if($(ye,T,V,Q)){E(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const N=typeof n=="function"?n:()=>!1;for(const Y of _)if(N(Y,T,V,Q)){E(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const A=Array.isArray(_e.projects)&&_e.projects.length?_e.projects:le().projects||[],B=I&&A.find(Y=>String(Y.id)===String(I))||null,R={...L,projectId:I?String(I):null,confirmed:b},{effectiveConfirmed:K,projectLinked:W,projectStatus:ae}=ct(R,B);let ee=!!P?.checked,ne=!!M?.checked;if(W&&(ee&&(P.checked=!1,ee=!1),ne=!1),!W&&ee!==ne){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}ne&&(Re("edit-res-company-share"),ee=!!P?.checked);let G=ee?getCompanySharePercent("edit-res-company-share"):null;ee&&(!Number.isFinite(G)||G<=0)&&(Re("edit-res-company-share"),G=getCompanySharePercent("edit-res-company-share"));const se=ee&&ne&&Number.isFinite(G)&&G>0,Ee=W?!1:ne;W&&(m=0,f="percent");const fe=Na(Ke,m,f,Ee,_,{start:T,end:V,companySharePercent:se?G:0});let we=Wn();if(Number.isFinite(q)&&q>0){const Y=fe;let ye=null,me=null;O==="amount"?(ye=q,Y>0&&(me=q/Y*100)):(me=q,Y>0&&(ye=q/100*Y));const Ze=yi({type:O,value:q,amount:ye,percentage:me,recordedAt:new Date().toISOString()});Ze&&(we=[...we,Ze],rs(we)),k&&(k.value="")}const z=Ba({totalAmount:fe,history:we}),J=Da({manualStatus:v,paidAmount:z.paidAmount,paidPercent:z.paidPercent,totalAmount:fe});y&&!w&&(y.value=J,y.dataset&&delete y.dataset.userSelected);let re=L.status??"pending";W?re=B?.status??ae??re:["completed","cancelled"].includes(String(re).toLowerCase())||(re=b?"confirmed":"pending");const ue=Ks({reservationCode:L.reservationCode??L.reservationId??null,customerId:L.customerId,start:T,end:V,status:re,title:L.title??null,location:L.location??null,notes:p,projectId:I?String(I):null,totalAmount:fe,discount:m,discountType:f,applyTax:Ee,paidStatus:J,confirmed:K,items:Ke.map(Y=>({...Y,equipmentId:Y.equipmentId??Y.id})),technicians:_,companySharePercent:se?G:null,companyShareEnabled:se,paidAmount:z.paidAmount,paidPercentage:z.paidPercent,paymentProgressType:z.paymentProgressType,paymentProgressValue:z.paymentProgressValue,paymentHistory:we});try{const Y=await Bo(L.id||L.reservationId,ue);await Xs(),on(),$e(),E(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),a?.(),mi(),i?.({type:"updated",reservation:Y}),s?.(),r?.(),_a?.hide?.()}catch(Y){console.error("❌ [reservationsEdit] Failed to update reservation",Y);const ye=Pn(Y)?Y.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");E(ye,"error")}}function du(e={}){_e={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=_e,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=h(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{ja("tax")}),c.dataset.listenerAttached="true");const l=document.getElementById("edit-res-company-share");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{ja("share")}),l.dataset.listenerAttached="true");const d=document.getElementById("edit-res-payment-progress-type");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{d.dataset.userSelected="true",t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const p=document.getElementById("edit-res-project");p&&!p.dataset.listenerAttached&&(p.addEventListener("change",()=>{gi();const y=Array.isArray(_e.projects)&&_e.projects.length?_e.projects:le().projects||[],w=p.value&&y.find(q=>String(q.id)===String(p.value))||null,x={..._e?.reservation??{},projectId:p.value||null,confirmed:$a()},{effectiveConfirmed:k,projectLinked:O}=ct(x,w);Ta(k,{disable:O}),t?.()}),p.dataset.listenerAttached="true");const g=document.getElementById("edit-res-confirmed-btn");g&&!g.dataset.listenerAttached&&(g.addEventListener("click",()=>{if(g.disabled)return;const y=!$a();Ta(y),t?.()}),g.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{Rd(_e).catch(y=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",y)})}),m.dataset.listenerAttached="true");const f=document.getElementById("edit-res-equipment-barcode");if(f&&!f.dataset.listenerAttached){let y=null;const w=()=>{f.value?.trim()&&(clearTimeout(y),y=null,n?.(f))};f.addEventListener("keydown",x=>{x.key==="Enter"&&(x.preventDefault(),w())});const v=()=>{if(clearTimeout(y),!f.value?.trim())return;const{start:x,end:k}=getEditReservationDateRange();!x||!k||(y=setTimeout(()=>{w()},150))};f.addEventListener("input",v),f.addEventListener("change",w),f.dataset.listenerAttached="true"}ui?.();const b=document.getElementById("editReservationModal");b&&!b.dataset.cleanupAttached&&(b.addEventListener("hidden.bs.modal",()=>{mi(),t?.(),s?.([])}),b.dataset.cleanupAttached="true")}const Md=le()||{};let Fe=(Md.projects||[]).map(zd),dn=!1;function uu(){return Fe}function Xn(e){Fe=Array.isArray(e)?e.map(os):[],Ca({projects:Fe});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return Fe}async function Od(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,l])=>{l==null||l===""||t.set(c,String(l))});const n=t.toString(),s=(await ze(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(is);return Xn(i),dn=!0,Fe}async function Hd({force:e=!1,params:t=null}={}){if(!e&&dn&&Fe.length>0)return Fe;try{return await Od(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),Fe}}async function mu(e){const t=await ze("/projects/",{method:"POST",body:e}),n=is(t?.data??{}),a=[...Fe,n];return Xn(a),dn=!0,n}async function pu(e,t){const n=await ze(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=is(n?.data??{}),s=Fe.map(r=>String(r.id)===String(e)?a:r);return Xn(s),dn=!0,a}async function fu(e){await ze(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=Fe.filter(n=>String(n.id)!==String(e));Xn(t),dn=!0}function yu({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:l,paymentStatus:d,equipmentEstimate:u=0,expenses:p=[],taxAmount:g=0,totalWithTax:m=0,discount:f=0,discountType:b="percent",companyShareEnabled:y=!1,companySharePercent:w=null,companyShareAmount:v=0,paidAmount:x=null,paidPercentage:k=null,paymentProgressType:O=null,paymentProgressValue:q=null,confirmed:I=!1,technicians:_=[],equipment:P=[],payments:M,paymentHistory:C}={}){const T=Array.isArray(_)?_.map(R=>Number.parseInt(String(R),10)).filter(R=>Number.isInteger(R)&&R>0):[],V=Array.isArray(P)?P.map(R=>{const K=Number.parseInt(String(R.equipmentId??R.equipment_id??R.id??0),10),W=Number.parseInt(String(R.qty??R.quantity??0),10);return!Number.isInteger(K)||K<=0?null:{equipment_id:K,quantity:Number.isInteger(W)&&W>0?W:1}}).filter(Boolean):[],H=Array.isArray(p)?p.map(R=>{const K=Number.parseFloat(R?.amount??R?.value??0)||0,W=(R?.label??R?.name??"").trim();return W?{label:W,amount:Math.round(K*100)/100}:null}).filter(Boolean):[],L=H.reduce((R,K)=>R+(K?.amount??0),0),$={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!l,payment_status:d??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(L*100)/100,tax_amount:Math.round((Number.parseFloat(g)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(m)||0)*100)/100,confirmed:!!I,technicians:T,equipment:V,expenses:H},Q=Math.max(0,Number.parseFloat(f)||0);$.discount=Q,$.discount_type=b==="amount"?"amount":"percent";const N=Number.parseFloat(w),A=!!y&&Number.isFinite(N)&&N>0;$.company_share_enabled=A,$.company_share_percent=A?N:0,$.company_share_amount=A?Math.max(0,Number.parseFloat(v)||0):0,Number.isFinite(Number(x))&&($.paid_amount=Math.max(0,Number.parseFloat(x)||0)),Number.isFinite(Number(k))&&($.paid_percentage=Math.max(0,Number.parseFloat(k)||0)),(O==="amount"||O==="percent")&&($.payment_progress_type=O),q!=null&&q!==""&&($.payment_progress_value=Number.parseFloat(q)||0),e&&($.project_code=String(e).trim());const B=M!==void 0?M:C;if(B!==void 0){const R=bi(B)||[];$.payments=R.map(K=>({type:K.type,amount:K.amount!=null?K.amount:null,percentage:K.percentage!=null?K.percentage:null,value:K.value!=null?K.value:null,note:K.note??null,recorded_at:K.recordedAt??null}))}return $.end_datetime||delete $.end_datetime,$.client_company||($.client_company=null),$}function is(e={}){return os(e)}function zd(e={}){return os(e)}function os(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(m=>{if(m==null)return null;if(typeof m=="object"){const f=m.id??m.technician_id??m.technicianId;return f!=null?String(f):null}return String(m)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(m=>{const f=m?.equipment_id??m?.equipmentId??m?.id??null,b=m?.quantity??m?.qty??0,y=m?.barcode??m?.code??"",w=m?.description??m?.name??"";return{equipmentId:f!=null?String(f):null,qty:Number.parseInt(String(b),10)||0,barcode:y,description:w}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((m,f)=>({id:m?.id??`expense-${t??"x"}-${f}`,label:m?.label??"",amount:Number.parseFloat(m?.amount??0)||0})),l=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,d=e.company_share_enabled??e.companyShareEnabled,u=d!=null?d===!0||d===1||String(d).toLowerCase()==="true":l>0,p=e.payment_history??e.paymentHistory??e.payments??null,g=bi(p);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?l:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(m=>typeof m=="object"?m:{id:m}),equipment:r,expenses:c,paymentHistory:g}}function gu(e){return e instanceof Hs}function oa(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function Vd(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=oa(e.value);let s=oa(e.amount),r=oa(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,l=e.recordedAt??e.recorded_at??e.date??null;let d=null;if(l){const p=new Date(l);Number.isNaN(p.getTime())||(d=p.toISOString())}d||(d=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:d}}function bi(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>Vd(t)).filter(Boolean):[]}function bu(){return Hd().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=le()||{};Fo(e||[]),xr()})}function cs(e=null){xr(),hi(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Ud(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function ka(){return{populateEquipmentDescriptionLists:Ht,setFlatpickrValue:Ld,splitDateTime:Vs,renderEditItems:It,updateEditReservationSummary:Me,addEquipmentByDescription:Cd,addEquipmentToEditingReservation:kd,addEquipmentToEditingByDescription:Ln,combineDateTime:Zt,hasEquipmentConflict:Ye,hasTechnicianConflict:Us,renderReservations:hi,handleReservationsMutation:cs,ensureModal:Ud}}function hi(e="reservations-list",t=null){hd({containerId:e,filters:t,onShowDetails:vi,onConfirmReservation:Si})}function vi(e){return vd(e,{getEditContext:ka,onEdit:(t,{reservation:n})=>{Ei(t,n)},onDelete:qi})}function qi(e){return qt()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?Sd(e,{onAfterChange:cs}):!1:(an(),!1)}function Si(e){return Ed(e,{onAfterChange:cs})}function Ei(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}Os(e,ka());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}Os(e,ka());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}Ao({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function hu(){typeof window>"u"||(window.showReservationDetails=vi,window.deleteReservation=qi,window.confirmReservation=Si,window.editReservation=Ei)}export{cs as A,au as B,su as C,uu as D,gu as E,Ar as F,ru as G,ou as H,Yd as I,Zd as J,Od as K,iu as L,tu as M,fu as N,eu as O,nu as P,mu as Q,Hn as a,Yc as b,$e as c,hi as d,cu as e,Gd as f,Ir as g,yu as h,Ua as i,pu as j,Hd as k,bu as l,is as m,Ie as n,hu as o,Xd as p,Jd as q,ct as r,vi as s,du as t,Wd as u,lu as v,xr as w,Me as x,ka as y,oe as z};
