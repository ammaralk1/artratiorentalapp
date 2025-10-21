import{n as h,d as ue,f as _o,t as o,b as ze,h as E,j as Et,o as rn,s as Na,A as Ks,z as $o,k as Pe,B as Qs,u as To}from"./auth.js";import{v as le,w as Ye,D as Je,x as Ba,y as qs,z as tn,A as Gs,B as jo,C as it,E as Da,F as ko,G as Co,H as Ws,q as Fa,f as Ra,h as Ma,I as Xs,J as Lo,s as on,c as Dn,K as Js,L as Po,M as Ys,N as Zs,n as Fn,a as er,g as bt,O as No,P as Bo,Q as ua,R as Do,u as Fo,S as Ro,T as Mo,b as Oo}from"./reservationsService.js";const aa="select.form-select:not([data-no-enhance]):not([multiple])",Ve=new WeakMap;let sa=null,Ss=!1,Qe=null;function tu(e=document){e&&(e.querySelectorAll(aa).forEach(t=>bn(t)),!sa&&e===document&&(sa=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(aa)&&bn(a),a.querySelectorAll?.(aa).forEach(s=>bn(s)))})}),sa.observe(document.body,{childList:!0,subtree:!0})),Ss||(Ss=!0,document.addEventListener("pointerdown",Vo,{capture:!0})))}function gn(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){bn(e);return}const t=e.closest(".enhanced-select");t&&(Oa(t),En(t),ma(t))}function bn(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){gn(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};Ve.set(t,r),a.addEventListener("click",()=>zo(t)),a.addEventListener("keydown",i=>Uo(i,t)),s.addEventListener("click",i=>Qo(i,t)),s.addEventListener("keydown",i=>Ko(i,t)),e.addEventListener("change",()=>{En(t),tr(t)}),r.observer=new MutationObserver(i=>{let c=!1,l=!1;for(const d of i)d.type==="attributes"&&d.attributeName==="disabled"&&(l=!0),d.type==="childList"&&(c=!0);l&&ma(t),c&&Ho(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),Oa(t),En(t),ma(t)}function Ho(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,Oa(t),En(t)})))}function Oa(e){const t=Ve.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),tr(e)}function En(e){const t=Ve.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function tr(e){const t=Ve.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function ma(e){const t=Ve.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function zo(e){Ve.get(e)&&(e.getAttribute("data-open")==="true"?Ft(e):nr(e))}function nr(e){const t=Ve.get(e);if(!t)return;Qe&&Qe!==e&&Ft(Qe,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),Qe=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function Ft(e,{focusTrigger:t=!0}={}){const n=Ve.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),Qe===e&&(Qe=null))}function Vo(e){if(!Qe)return;const t=e.target;t instanceof Node&&(Qe.contains(t)||Ft(Qe,{focusTrigger:!1}))}function Uo(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),nr(t)):n==="Escape"&&Ft(t)}function Ko(e,t){const n=e.key,a=Ve.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&ar(i,t)}else n==="Escape"&&(e.preventDefault(),Ft(t))}function Qo(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&ar(n,t)}function ar(e,t){const n=Ve.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),Ft(t)}const Rt=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let Ge=null;function Ha(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function sr(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function Go(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function Wo(e={}){const t=Go({...e,activatedAt:Date.now()});return Ge=t,sr(!0,t.mode||"create"),Ha(Rt.change,{active:!0,selection:{...t}}),t}function za(e="manual"){if(!Ge)return;const t=Ge;Ge=null,sr(!1),Ha(Rt.change,{active:!1,previous:t,reason:e})}function rr(){return!!Ge}function Xo(){return Ge?{...Ge}:null}function Jo(e){if(!Ge)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=h(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:r,description:i}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const l=c.map(u=>h(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!l.length)return!1;const d=Number.isInteger(s)&&s>0?s:l.length;t={barcodes:l,quantity:Math.min(d,l.length)},r&&(t.groupKey=r),i&&(t.description=i)}else return!1;return Ha(Rt.requestAdd,{...t,selection:{...Ge}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||za("tab-changed")});const Yo=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Zo=new Set(["maintenance","reserved","retired"]);function ec(e){const t=String(e??"").trim().toLowerCase();return t&&Yo.get(t)||"available"}function tc(e){return e?typeof e=="object"?e:Rn(e):null}function ot(e){const t=tc(e);return t?ec(t.status||t.state||t.statusLabel||t.status_label):"available"}function Va(e){return!Zo.has(ot(e))}function xt(e={}){return e.image||e.imageUrl||e.img||""}function nc(e){if(!e)return null;const t=le(e),{equipment:n=[]}=ue();return(n||[]).find(a=>le(a?.barcode)===t)||null}function Rn(e){const t=le(e);if(!t)return null;const{equipment:n=[]}=ue();return(n||[]).find(a=>le(a?.barcode)===t)||null}const ac=ue()||{};let nt=(ac.equipment||[]).map(ic),pa=!1,Jt="",ft=null,vt=null,qt=null,Mn=!1,Es=!1;function sc(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function rc(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function ic(e={}){return Ua({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function On(e={}){return Ua(e)}function Ua(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=cn(e.quantity??e.qty??0),i=Hn(e.unit_price??e.price??0),c=h(String(e.barcode??"").trim()),l=$e(e.status??e.state??e.status_label??e.statusLabel??"available"),d=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:oc(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:l,image:d,imageUrl:d,created_at:e.created_at??null,updated_at:e.updated_at??null}}function oc(e){return e!=null&&e!==""}function cn(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function Hn(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function cc(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function xs(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function lc(e,t){const n=xs(e),a=xs(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}else{if(r!==i)return r?-1:1;{const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}}const c=xn(e?.desc||e?.description||e?.name||""),l=xn(t?.desc||t?.description||t?.name||"");return c.localeCompare(l,"ar",{sensitivity:"base"})}function ve(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function $e(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function dc(e){return $e(e)}function ir(){if(!rr())return null;const e=Xo();return e?{...e}:null}function uc(e){const t=ir();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:r=null}=t,i=[],c=new Set;if(n.forEach(m=>{const f=le(m?.barcode);!f||c.has(f)||(c.add(f),i.push({variant:m,barcode:f}))}),!i.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};const l=i.filter(({variant:m})=>Va(m));if(!a||!s)return{active:!0,canSelect:!1,barcode:l[0]?.barcode||i[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const d=l.filter(({barcode:m})=>!Ye(m,a,s,r));if(d.length)return{active:!0,canSelect:!0,barcode:d[0].barcode,availableBarcodes:d.map(({barcode:m})=>m),maxQuantity:d.length};let u=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(l.length>0)u=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const m=new Set(i.map(({variant:f})=>$e(f?.status)));m.has("maintenance")?u=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):m.has("reserved")?u=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):m.has("retired")&&(u=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:l[0]?.barcode||i[0].barcode,reason:u,availableBarcodes:[],maxQuantity:0}}function mc(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function or(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return");if(!e)return;const n=ir();e.hidden=!n,n&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{za("return-button"),mc()}),t.dataset.listenerAttached="true")}function Ne(){return nt}function St(e){nt=Array.isArray(e)?e.map(Ua):[],Na({equipment:nt}),rc()}function xn(e){return String(e??"").trim().toLowerCase()}function st(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=xn(t);return n||(n=xn(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function zn(e){const t=st(e);return t?Ne().filter(n=>st(n)===t):[]}function Vn(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=Un(e);if(n){const a=ve(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${ve(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function Ka(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function wn(){const e=Ka();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function Qa(e={}){const t=Ka();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function Pt(e){Mn=e;const t=Ka(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function nu(e){if(!Et()){rn();return}if(!e)return;try{await fc()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let l=0;if(i.forEach(d=>{const u=d.القسم??d.category??"",m=d["القسم الثانوي"]??d.subcategory??"",f=d.الوصف??d.description??d.name??"",p=d.الكمية??d.quantity??0,y=d.السعر??d.price??0,b=d.الباركود??d.barcode??"",g=d.الحالة??d.status??"متاح",x=d.الصورة??d.image_url??d.image??"",v=h(String(b||"")).trim();if(!f||!v){l+=1;return}c.push(Ga({category:u,subcategory:m,description:f,quantity:p,unit_price:y,barcode:v,status:g,image_url:x}))}),!c.length){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const d=await ze("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(d?.data)?d.data.map(On):[];if(u.length){const p=[...Ne(),...u];St(p)}await Kn({showToastOnError:!1}),Te();const m=d?.meta?.count??u.length,f=[];m&&f.push(`${m} ✔️`),l&&f.push(`${l} ⚠️`),E(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(f.length?` (${f.join(" / ")})`:""))}catch(d){const u=Mt(d,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");E(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const pc="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let Kt=null;function fc(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):Kt||(Kt=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=pc,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),Kt=null,e}),Kt)}function Ga({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const l=h(String(r||"")).trim(),d=dc(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:cn(a),unit_price:Hn(s),barcode:l,status:d,image_url:c?.trim()||null}}async function yc(){if(!Et()){rn();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await ze("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await Kn({showToastOnError:!1}),E(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=Mt(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");E(t,"error")}}function Un(e){return e.image||e.imageUrl||e.img||""}function gc(e){const t=$e(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function In(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${ve(a)}</td></tr>`}n&&(n.textContent="0")}function cr(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=ft?.groupKey||st(e);if(!r){In();return}const i=Ne().filter(m=>st(m)===r).sort((m,f)=>{const p=String(m.barcode||"").trim(),y=String(f.barcode||"").trim();return!p&&!y?0:p?y?p.localeCompare(y,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){In();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),l=o("equipment.form.labels.quantity","الكمية"),d=Ne(),u=i.map(m=>{const f=m.id&&e.id?String(m.id)===String(e.id):String(m.barcode||"")===String(e.barcode||""),p=f?"equipment-variants-table__row--current":"",y=ve(String(m.barcode||"-")),b=f?`<span class="equipment-variants-current-badge">${ve(c)}</span>`:"",g=h(String(Number.isFinite(Number(m.qty))?Number(m.qty):0)),x=d.indexOf(m),v=ve(o("equipment.item.actions.delete","🗑️ حذف")),w=x>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${x}">${v}</button>
          </div>`:"";return`
        <tr class="${p}">
          <td>
            ${y}
            ${b}
          </td>
          <td>${gc(m.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${ve(l)}">${g}</span>
          </td>
          <td class="table-actions-cell">${w}</td>
        </tr>
      `}).join("");n.innerHTML=u}function bc({item:e,index:t}){const n=Un(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=Et(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},l=Number.isFinite(Number(e.qty))?Number(e.qty):0,d=Number.isFinite(Number(e.price))?Number(e.price):0,u=l.toLocaleString("en-US"),m=d.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),f=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,p=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,y=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(l-f-p,0),b=y.toLocaleString("en-US"),g=o("equipment.card.labels.availableOfTotal","من أصل"),x=$e(e.status);let v=`${ve(c.available)}: ${ve(b)} ${ve(g)} ${ve(u)}`,w="available";if(y===0){const O={reserved:{text:l===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},H=O[x]||O.default;v=ve(H.text),w=H.modifier}const k=`<span class="equipment-card__availability equipment-card__availability--${w}">${v}</span>`,z="",q=e.desc||e.name||"—",I=e.name&&e.name!==e.desc?e.name:"",P=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${m} ${r}`}].map(({label:O,value:H})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${O}</span>
              <span class="equipment-card__detail-value">${H}</span>
            </span>
          `).join("")}
    </div>`,R=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),C=R.length?`<div class="equipment-card__categories">${R.map(({label:O,value:H})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${O}</span>
              <span class="equipment-card__detail-value">${H}</span>
            </div>
          `).join("")}</div>`:"",$=I?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${I}</span>
      </div>`:"",V=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${q}</h3>
    </div>
  `}
      ${P}
    </div>
  `,L=[],A=uc(e),G=A?.availableBarcodes?.length?A.availableBarcodes.join(","):A?.barcode?A.barcode:"";let N="",j="";if(A.active){const O=`equipment-select-qty-${t}`,H=!!A.canSelect,ne=H?Math.max(1,Number(A.maxQuantity||A.availableBarcodes?.length||1)):1,Y=Math.max(1,Math.min(ne,99)),ae=[];for(let Z=1;Z<=Y;Z+=1){const de=h(String(Z));ae.push(`<option value="${Z}"${Z===1?" selected":""}>${de}</option>`)}const W=H?"":" disabled",re=o("reservations.create.equipment.selector.quantityLabel","الكمية"),be=H?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${h(String(ne))}`:A.reason?A.reason:"";N=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${O}">${re}</label>
        <select class="equipment-card__quantity-select" id="${O}" data-equipment-select-quantity${W}>
          ${ae.join("")}
        </select>
        ${be?`<span class="equipment-card__selection-hint">${ve(be)}</span>`:""}
      </div>
    `;const pe=o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),Se=H?"":" disabled",U=A.reason?` title="${ve(A.reason)}"`:"",X=['data-equipment-action="select-reservation"',`data-selection-max="${H?ne:0}"`];G&&X.push(`data-selection-barcodes="${ve(G)}"`),e.groupKey&&X.push(`data-selection-group="${ve(String(e.groupKey))}"`),j=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${X.join(" ")}${Se}${U}>${pe}</button>
    `}i&&L.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const M=L.length?L.join(`
`):"",F=ve(q);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${ve(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${F}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${z}
        ${k}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${V}
        </div>
      </div>
      <div class="equipment-card__body">
        ${C}
        ${$}
      </div>
      ${N||j||M?`<div class="equipment-card__actions equipment-card__actions--center">
            ${N}
            ${j}
            ${M}
          </div>`:""}
    </article>
  `}function hc(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,a.appendChild(l)}),t.includes(i)&&(a.value=i),gn(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,s.appendChild(l)}),n.includes(i)&&(s.value=i),gn(s)}const r=document.getElementById("filter-status");r&&gn(r)}function ln(){const e=ue();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return nt=t||[],nt;const s=new Date;let r=!1;const i=new Set((a||[]).filter(l=>l?.status==="open").map(l=>h(String(l?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(l=>{if(!l)return l;const d=$e(l.status),u=h(String(l.barcode??"")).trim().toLowerCase(),m=u&&i.has(u);let f=m?"maintenance":"available";if(!m&&u)for(const p of n||[]){if(!vc(p,s))continue;if(p.items?.some(b=>h(String(b?.barcode??"")).trim().toLowerCase()===u)){f="reserved";break}}return f!==d?(r=!0,{...l,status:f}):{...l,status:f}});return r?St(c):(nt=c,Na({equipment:nt})),nt}function vc(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function ra(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Te(){const e=document.getElementById("equipment-list");if(!e)return;or();const t=ln(),n=Array.isArray(t)?t:Ne(),a=new Map;n.forEach(b=>{if(!b)return;const g=st(b);g&&(a.has(g)||a.set(g,[]),a.get(g).push(b))});const s=Array.from(a.values()).map(b=>{const g=b[0],x=b.reduce((I,_)=>I+(Number.isFinite(Number(_.qty))?Number(_.qty):0),0),v=["maintenance","reserved","available","retired"],w=b.map(I=>$e(I.status)).sort((I,_)=>v.indexOf(I)-v.indexOf(_))[0]||"available",k=b.reduce((I,_)=>{const P=cn(_?.qty??0)||0,R=$e(_?.status);return R==="reserved"?I.reserved+=P:R==="maintenance"&&(I.maintenance+=P),I},{reserved:0,maintenance:0}),z=Math.max(x-k.reserved-k.maintenance,0);return{item:{...g,qty:x,status:w,variants:b,groupKey:st(g),reservedQty:k.reserved,maintenanceQty:k.maintenance,availableQty:z},index:n.indexOf(g)}});s.sort((b,g)=>lc(b.item,g.item));const r=document.getElementById("search-equipment")?.value||"",i=h(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",l=document.getElementById("filter-sub")?.value||"",d=document.getElementById("filter-status")?.value||"",u=d?$e(d):"";if(pa&&!n.length){e.innerHTML=ra(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(Jt&&!n.length){e.innerHTML=ra(Jt,{tone:"error",icon:"⚠️"});return}const m=s.filter(({item:b})=>{const g=h(String(b.barcode??"")).toLowerCase().trim(),x=Array.isArray(b.variants)?b.variants.map(q=>h(String(q.barcode??"")).toLowerCase().trim()).filter(Boolean):[],v=!i||b.name&&b.name.toLowerCase().includes(i)||b.desc&&b.desc.toLowerCase().includes(i)||g&&g.includes(i)||x.some(q=>q.includes(i))||b.category&&b.category.toLowerCase().includes(i)||b.sub&&b.sub.toLowerCase().includes(i),w=!c||b.category===c,k=!l||b.sub===l,z=!u||$e(b.status)===u;return v&&w&&k&&z}),f=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),p=m;e.innerHTML=p.length?p.map(bc).join(""):ra(f);const y=document.getElementById("equipment-list-count");if(y){const b=o("equipment.list.countSuffix","عنصر"),g=h(String(p.length)),x=p.length?`${g} ${b}`:`0 ${b}`;y.textContent=x}hc(n)}async function Kn({showToastOnError:e=!0}={}){pa=!0,Jt="",Te();try{const t=await ze("/equipment/?all=1"),n=Array.isArray(t?.data)?t.data.map(On):[];St(n)}catch(t){Jt=Mt(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&E(Jt,"error")}finally{pa=!1,Te()}}function Mt(e,t,n){if(e instanceof Ks){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function qc(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),r=Hn(t.querySelector("#new-equipment-price")?.value||"0"),i=cn(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",l=t.querySelector("#new-equipment-category")?.value?.trim()||"",d=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){E(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const m=Ga({category:l,subcategory:d,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const f=await ze("/equipment/",{method:"POST",body:m}),p=On(f?.data),y=[...Ne(),p];St(y),Te(),t.reset();const b=t.querySelector("#new-equipment-status");b&&(b.value="متاح"),E(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(f){const p=Mt(f,"equipment.toast.addFailed","تعذر إضافة المعدة");E(p,"error")}}async function lr(e){if(!Et()){rn();return}const t=Ne(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await ze(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),St(a),Te(),E(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=Mt(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");E(s,"error")}}async function Sc(e,t){const n=Ne(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},St(r),Te();return}const s=Ga({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await ze(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=On(r?.data),c=[...n];c[e]=i,St(c),Te(),E(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=Mt(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw E(i,"error"),r}}function pn(){Te()}function dr(e){const n=Ne()[e];if(!n)return;vt=e;const a=zn(n),s=a[0]||n,r=a.reduce((l,d)=>l+(Number.isFinite(Number(d.qty))?Number(d.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(l=>$e(l.status)).sort((l,d)=>i.indexOf(l)-i.indexOf(d))[0]||$e(s.status);document.getElementById("edit-equipment-index").value=e,Qa({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:Un(s)||"",barcode:s.barcode||"",status:s.status||c}),Pt(!1),qt=wn(),Vn(s),cr(s),ft={groupKey:st(s),barcode:String(s.barcode||""),id:s.id||null},sc(document.getElementById("editEquipmentModal"))?.show()}function Ec(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),r=s?.querySelector("[data-equipment-select-quantity]");let i=Number.parseInt(r?.value||"1",10);(!Number.isFinite(i)||i<=0)&&(i=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&i>c&&(i=c);const d=(t.dataset.selectionBarcodes||"").split(",").map(p=>p.trim()).filter(p=>p.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",m=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";Jo({barcodes:d,quantity:i,groupKey:m,description:u})||E(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||lr(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||dr(s)}}function xc(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||dr(n)}}function wc(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||lr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function ur(){if(!ft||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=Ne(),a=ft.id?n.find(l=>String(l.id)===String(ft.id)):null,s=ft.groupKey,r=s?n.find(l=>st(l)===s):null,i=a||r;if(!i){In();return}const c=n.findIndex(l=>l===i);if(c>=0){const l=document.getElementById("edit-equipment-index");l&&(l.value=String(c)),vt=c}if(cr(i),!Mn){const l=zn(i),d=l[0]||i,u=l.reduce((p,y)=>p+(Number.isFinite(Number(y.qty))?Number(y.qty):0),0),m=["maintenance","reserved","available","retired"],f=l.map(p=>$e(p.status)).sort((p,y)=>m.indexOf(p)-m.indexOf(y))[0]||$e(d.status);Qa({category:d.category||"",subcategory:d.sub||"",description:d.desc||d.description||"",quantity:String(u||d.qty||0),price:d.price!=null?String(d.price):"0",image:Un(d)||"",barcode:d.barcode||"",status:d.status||f}),qt=wn()}Vn(primary)}function Ic(){document.getElementById("search-equipment")?.addEventListener("input",pn),document.getElementById("filter-category")?.addEventListener("change",pn),document.getElementById("filter-sub")?.addEventListener("change",pn),document.getElementById("filter-status")?.addEventListener("change",pn),document.getElementById("add-equipment-form")?.addEventListener("submit",qc);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),yc().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",Ec),t.addEventListener("keydown",xc),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",wc),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);cc(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!Mn){qt=wn(),Pt(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){E(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:cn(document.getElementById("edit-equipment-quantity").value)||1,price:Hn(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await Sc(t,n),qt=wn(),Pt(!1),ur()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{Ic(),Te(),Kn();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(qt&&Qa(qt),vt!=null){const a=Ne()[vt];if(a){const r=zn(a)[0]||a;Vn(r)}}Pt(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Te(),Pt(Mn),vt!=null){const t=Ne()[vt];if(t){const a=zn(t)[0]||t;Vn(a)}}});document.addEventListener("equipment:refreshRequested",()=>{Kn({showToastOnError:!1})});document.addEventListener(_o.USER_UPDATED,()=>{Te()});document.addEventListener("equipment:changed",()=>{ur()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{ft=null,In(),vt=null,qt=null,Pt(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!Es&&(document.addEventListener(Rt.change,()=>{or(),Te()}),Es=!0);function Ie(e=""){return h(String(e)).trim().toLowerCase()}const Ac=2;function _c(e){const t=Number(e);return Number.isFinite(t)?t.toFixed(Ac):"0.00"}function ws(e={}){const t=Number(e?.qty);return Number.isFinite(t)&&t>0?t:1}function dn(e={}){const t=e?.desc||e?.description||e?.name||"",n=Ie(t),a=_c(e?.price??e?.unitPrice??e?.unit_price??0);return`${n}::${a}`}function wt(e=[]){const t=new Map;return e.forEach((n,a)=>{const s=dn(n);if(!s)return;if(!t.has(s)){const i=n?.desc||n?.description||n?.name||"",c=Ie(i),l=Is(n),d=n?.image||n?.imageUrl||n?.img||"";t.set(s,{key:s,description:i,normalizedDescription:c,unitPrice:l,image:d,items:[],itemIndices:[],barcodes:[]})}const r=t.get(s);r.items.push(n),r.itemIndices.push(a),n?.barcode&&r.barcodes.push(String(n.barcode))}),Array.from(t.values()).map(n=>({...n,quantity:n.items.reduce((a,s)=>a+ws(s),0)})).map(n=>{const a=n.quantity||0,s=n.items.reduce((i,c)=>{const l=Is(c),d=ws(c);return i+l*d},0),r=a>0?s/a:n.unitPrice;return{...n,quantity:a,count:a,totalPrice:s,unitPrice:r}})}function Ot(e={}){const t=[e?.id,e?.equipment_id,e?.equipmentId,e?.item_id,e?.itemId];for(const n of t)if(!(n==null||n===""))return String(n);return null}function Is(e={}){const t=e?.price??e?.unit_price??e?.unitPrice??0,n=Number(t);return Number.isFinite(n)?n:0}function Wa(e){if(!e?.end)return!1;const t=new Date(e.end);return Number.isNaN(t.getTime())?!1:t<new Date}function $c(e=""){switch(String(e??"").trim().toLowerCase()){case"confirmed":case"مؤكد":return"confirmed";case"in_progress":case"in-progress":case"قيد التنفيذ":case"جاري":return"in_progress";case"completed":case"مكتمل":return"completed";case"cancelled":case"ملغي":return"cancelled";case"pending":case"draft":case"قيد الانتظار":case"بانتظار التأكيد":case"معلق":default:return"pending"}}function ct(e={},t=null){const n=e?.confirmed===!0||e?.confirmed==="true",a=e?.projectId??e?.project_id??null,s=a!=null&&a!==""&&a!=="null",r=s?$c(t?.status??t?.status_label??t?.statusLabel??""):null,i=s&&(t?.confirmed===!0||["confirmed","in_progress","completed"].includes(r));return{reservationConfirmed:n,projectLinked:s,projectStatus:r,projectConfirmed:i,effectiveConfirmed:s?i:n}}const mr="projects:create:draft",pr="projects.html#projects-section";let fa=null,fr=[],ya=new Map,ga=new Map,An=new Map,ia=!1,hn=null,As=!1;function _n(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function $n(e){return h(String(e||"")).trim().toLowerCase()}function Tc(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function yr(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function gr(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function br(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function hr(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function Ht(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function Xa(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function It(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Ce(){const{input:e,hidden:t}=It();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function mt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function vr(e,t,{allowPartial:n=!1}={}){const a=Ie(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function ba(e,t={}){return vr(ya,e,t)}function ha(e,t={}){return vr(ga,e,t)}function Le(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function qr(e){fr=Array.isArray(e)?[...e]:[]}function Ja(){return fr}function Ya(e){return e&&Ja().find(t=>String(t.id)===String(e))||null}function _s(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function Nt(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??Je,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:Je}function Re(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??Je,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=Je),t.dataset.companyShare=String(s),t.checked=!0}function va(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(ia){oe();return}ia=!0;const a=()=>{ia=!1,oe()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(Je)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),Re()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Re():n.checked&&(n.checked=!1));a()}function jc(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function $s(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function Ts(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function We({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=Xa();if(!n||!a||!s)return;const r=Ba()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const l=new Set;ya=new Map;const d=r.filter(p=>p&&p.id!=null).map(p=>({id:String(p.id),label:Ts(p)||c})).filter(p=>{if(!p.label)return!1;const y=Ie(p.label);return!y||l.has(y)?!1:(l.add(y),ya.set(y,p),!0)}).sort((p,y)=>p.label.localeCompare(y.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(p=>`<option value="${_n(p.label)}"></option>`).join("");const u=t?"":n.value,m=e?String(e):a.value?String(a.value):"",f=m?r.find(p=>String(p.id)===m):null;if(f){const p=Ts(f)||c;a.value=String(f.id),n.value=p,n.dataset.selectedId=String(f.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function Bt({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=It();if(!a||!s||!r)return;const i=Array.isArray(t)?t:Ja()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const l=[...i].filter(b=>b&&b.id!=null).sort((b,g)=>String(g.createdAt||g.start||"").localeCompare(String(b.createdAt||b.start||""))),d=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),m=new Set;ga=new Map;const f=l.map(b=>{const g=_s(b)||u;return{id:String(b.id),label:g}}).filter(b=>{if(!b.label)return!1;const g=Ie(b.label);return!g||m.has(g)?!1:(m.add(g),ga.set(g,b),!0)});r.innerHTML=f.map(b=>`<option value="${_n(b.label)}"></option>`).join("");const p=e?String(e):s.value?String(s.value):"",y=p?l.find(b=>String(b.id)===p):null;if(y){const b=_s(y)||u;s.value=String(y.id),a.value=b,a.dataset.selectedId=String(y.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function Tn(e,t,n){const{date:a,time:s}=Gs(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function Sr(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||Bt({selectedValue:a});const r=(Ba()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";We(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=$s(e,"start"),l=$s(e,"end");c&&Tn("res-start","res-start-time",c),l&&Tn("res-end","res-end-time",l);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),oe(),rt()}function Er({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:ue(),s=Array.isArray(a)?a:[];qr(s);const r=t!=null?String(t):n.value?String(n.value):"";Bt({selectedValue:r,projectsList:s}),rt(),oe()}function rt(){const{input:e,hidden:t}=It(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),l=document.getElementById("res-discount-type"),d=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),m=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(mt(n,Ce),a&&mt(a,Ce)),s&&mt(s,Ce),r&&mt(r,Ce),i&&mt(i,Ce),c&&mt(c,Ce),l&&mt(l,Ce),m)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=d),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=d),s&&(s.value="unpaid",Le(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=d),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=d),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=d),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=d),l&&(l.value="percent",l.disabled=!0,l.classList.add("reservation-input-disabled"),l.title=d);else{if(n){const f=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",f&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.disabled=!1,l.classList.remove("reservation-input-disabled"),l.title="")}va("tax"),oe()}function Za(){const{input:e,hidden:t}=It();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?ha(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=Ya(r.id);i?Sr(i,{skipProjectSelectUpdate:!0}):(rt(),oe())}else t.value="",e.dataset.selectedId="",rt(),oe()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?ha(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function es(){const{input:e,hidden:t}=Xa();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?ba(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),oe()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?ba(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function kc(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){Yt({clearValue:!0});return}let n=null;try{const d=decodeURIComponent(t);n=JSON.parse(d)}catch(d){console.warn("⚠️ [reservations/createForm] Failed to decode project context",d)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),Yt({clearValue:!1}),!n)return;n.fromProjectForm&&(hn={draftStorageKey:n.draftStorageKey||mr,returnUrl:n.returnUrl||pr});const r=document.getElementById("res-project");if(n.projectId){r&&(Bt({selectedValue:String(n.projectId)}),rt());const d=Ya(n.projectId);d?Sr(d,{forceNotes:!!n.forceNotes}):oe(),Yt()}else{r&&Bt({selectedValue:""});const d=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");Vc(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),d)}n.start&&Tn("res-start","res-start-time",n.start),n.end&&Tn("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(Ba()||[]).find(m=>String(m.id)===String(n.customerId));u?.id!=null&&(We({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(We({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):We({selectedValue:""});const l=document.getElementById("res-notes");l&&n.description&&!l.value&&(l.value=n.description),oe()}function zt(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:tn(e,n),end:tn(t,a)}}function xr(e){const t=$n(e);if(t){const c=An.get(t);if(c)return c}const{description:n,barcode:a}=yr(e);if(a){const c=Rn(a);if(c)return c}const s=Ie(n||e);if(!s)return null;let r=Js();if(!r?.length){const c=ue();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&Zs(r)}const i=r.find(c=>Ie(c?.desc||c?.description||"")===s);return i||r.find(c=>Ie(c?.desc||c?.description||"").includes(s))||null}function wr(e,t="equipment-description-options"){const n=$n(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(l=>$n(l.value)===n)||An.has(n))return!0;const{description:s}=yr(e);if(!s)return!1;const r=Ie(s);return r?(Js()||[]).some(c=>Ie(c?.desc||c?.description||"")===r):!1}const Cc={available:0,reserved:1,maintenance:2,retired:3};function Lc(e){return Cc[e]??5}function js(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function Pc(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${js(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${js(n)})`}function Vt(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=ln(),a=ue(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];Zs(r);const i=new Map;r.forEach(d=>{const u=Tc(d),m=$n(u);if(!m||!u)return;const f=ot(d),p=Lc(f),y=i.get(m);if(!y){i.set(m,{normalized:m,value:u,bestItem:d,bestStatus:f,bestPriority:p,statuses:new Set([f])});return}y.statuses.add(f),p<y.bestPriority&&(y.bestItem=d,y.bestStatus=f,y.bestPriority=p,y.value=u)}),An=new Map;const l=Array.from(i.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{An.set(d.normalized,d.bestItem);const u=Pc(d),m=_n(d.value);if(u===d.value)return`<option value="${m}"></option>`;const f=_n(u);return`<option value="${m}" label="${f}"></option>`}).join("");e&&(e.innerHTML=l),t&&(t.innerHTML=l)}function Ir(e,t,n={}){const{silent:a=!1}=n,s=le(e);if(!s)return{success:!1,message:null};const{start:r,end:i}=zt();if(!r||!i){const f=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||E(f),{success:!1,message:f}}if(it().some(f=>le(f.barcode)===s)){const f=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||E(f),{success:!1,message:f}}if(Ye(s,r,i)){const f=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||E(f),{success:!1,message:f}}const l=Rn(s);if(!l){const f=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||E(f),{success:!1,message:f}}const d=ot(l);if(d==="maintenance"||d==="retired"){const f=Ht(d);return a||E(f),{success:!1,message:f}}const u=Ot(l);if(!u){const f=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||E(f),{success:!1,message:f}}Da({id:u,equipmentId:u,barcode:s,desc:l.desc,qty:1,price:l.price,image:xt(l)}),t&&(t.value=""),lt(),oe();const m=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||E(m),{success:!0,message:m,barcode:s}}function qa(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=xr(t);if(!n){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=nc(n.barcode),s=ot(a||n);if(s==="maintenance"||s==="retired"){E(Ht(s));return}const r=le(n.barcode);if(!r){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=Ot(n);if(!i){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:xt(n)},{start:l,end:d}=zt();if(!l||!d){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}if(it().some(f=>le(f.barcode)===r)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}if(Ye(r,l,d)){E(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}Da(c),lt(),oe(),E(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function Nc(){Vt();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),qa(e))});const t=()=>{wr(e.value,"equipment-description-options")&&qa(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function ks(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-equipment-select-button--active",n),n?(e.classList.add("btn-primary"),e.classList.remove("btn-outline-primary")):(e.classList.add("btn-outline-primary"),e.classList.remove("btn-primary"))}function Bc(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=zt();if(!t||!n){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}Wo({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):E(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(Rt.change,t=>{ks(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),ks(e,rr()))}function Dc(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=Array.isArray(t.barcodes)?t.barcodes:[],a=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,s=n.length?n:t.barcode?[t.barcode]:[];if(!s.length)return;let r=0,i=null;const c=[],l=new Set;s.forEach(u=>{const m=le(u);m&&!l.has(m)&&(l.add(m),c.push(m))});const d=Math.min(a,c.length);for(let u=0;u<d;u+=1){const m=c[u],f=Ir(m,null,{silent:!0});f.success&&(r+=1),f.message&&(i=f.message)}if(r>0){const m=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",h(String(r)));E(m)}else i&&E(i)}function Ar(){Bc(),!(As||typeof document>"u")&&(document.addEventListener(Rt.requestAdd,Dc),As=!0)}function lt(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=it(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),l=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=wt(n);t.innerHTML=d.map(u=>{const m=u.items[0]||{},f=xt(m)||u.image,p=f?`<img src="${f}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',y=h(String(u.count)),b=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,g=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):b*u.count,x=`${h(b.toFixed(2))} ${s}`,v=`${h(g.toFixed(2))} ${s}`,w=u.barcodes.map(z=>h(String(z||""))).filter(Boolean),k=w.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${w.map(z=>`<li>${z}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${p}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${k}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${c}">−</button>
              <span class="reservation-qty-value">${y}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${i}">+</button>
            </div>
          </td>
          <td>${x}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${l}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function Fc(e){const t=it(),a=wt(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(ko(s),lt(),oe())}function Rc(e){const t=it(),n=t.filter(a=>dn(a)!==e);n.length!==t.length&&(Ys(n),lt(),oe())}function Mc(e){const t=it(),a=wt(t).find(m=>m.key===e);if(!a)return;const{start:s,end:r}=zt();if(!s||!r){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(m=>le(m.barcode))),{equipment:c=[]}=ue(),l=(c||[]).find(m=>{const f=le(m?.barcode);return!f||i.has(f)||dn({desc:m?.desc||m?.description||m?.name||"",price:Number(m?.price)||0})!==e||!Va(m)?!1:!Ye(f,s,r)});if(!l){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=le(l.barcode),u=Ot(l);if(!u){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}Da({id:u,equipmentId:u,barcode:d,desc:l.desc||l.description||l.name||a.description||"",qty:1,price:Number.isFinite(Number(l.price))?Number(l.price):a.unitPrice,image:xt(l)}),lt(),oe()}function oe(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),l=c?.value||"unpaid",{start:d,end:u}=zt();i&&Re();const m=Nt(),f=document.getElementById("res-payment-progress-type"),p=document.getElementById("res-payment-progress-value"),y=gr(f),b=br(p);qs({selectedItems:it(),discount:n,discountType:s,applyTax:i,paidStatus:l,paymentProgressType:y,paymentProgressValue:b,start:d,end:u,companySharePercent:m,paymentHistory:[]});const g=qs.lastResult;g?(hr(p,g.paymentProgressValue),c&&(c.value=g.paymentStatus,Le(c,g.paymentStatus))):Le(c,l)}function Oc(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=h(c.target.value),oe()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",oe),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(Ce()){n.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}va("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(Ce()){a.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}va("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(Ce()){s.value="unpaid",Le(s,"unpaid"),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Le(s),oe()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(Ce()){r.value="percent",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",oe()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(Ce()){i.value="",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=h(c.target.value),oe()}),i.dataset.listenerAttached="true"),oe()}function Hc(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){oe();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),oe()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Cs(){const{input:e,hidden:t}=Xa(),{input:n,hidden:a}=It(),{customers:s}=ue();let r=t?.value?String(t.value):"";if(!r&&e?.value){const W=ba(e.value,{allowPartial:!0});W&&(r=String(W.id),t&&(t.value=r),e.value=W.label,e.dataset.selectedId=r)}const i=s.find(W=>String(W.id)===r);if(!i){E(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let l=a?.value?String(a.value):"";if(!l&&n?.value){const W=ha(n.value,{allowPartial:!0});W&&(l=String(W.id),a&&(a.value=l),n.value=W.label,n.dataset.selectedId=l)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,m=document.getElementById("res-start-time")?.value||"00:00",f=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const p=`${d}T${m}`,y=`${u}T${f}`,b=new Date(p),g=new Date(y);if(Number.isNaN(b.getTime())||Number.isNaN(g.getTime())||b>=g){E(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const x=Co(),v=it();if(v.length===0&&x.length===0){E(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const w=document.getElementById("res-notes")?.value||"",k=parseFloat(h(document.getElementById("res-discount")?.value))||0,z=document.getElementById("res-discount-type")?.value||"percent",q=document.getElementById("res-payment-status"),I=q?.value||"unpaid",_=document.getElementById("res-payment-progress-type"),P=document.getElementById("res-payment-progress-value"),R=gr(_),C=br(P),$=l?Ya(l):null,K=jc($);if(l&&!$){E(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const W of v){const re=ot(W.barcode);if(re==="maintenance"||re==="retired"){E(Ht(re));return}}for(const W of v){const re=le(W.barcode);if(Ye(re,p,y)){E(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const W of x)if(Ws(W,p,y)){E(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const V=document.getElementById("res-tax"),L=document.getElementById("res-company-share"),A=!!l;A?(V&&(V.checked=!1,V.disabled=!0,V.classList.add("disabled"),V.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),L&&(L.checked=!1,L.disabled=!0,L.classList.add("disabled"),L.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),q&&(q.value="unpaid",q.disabled=!0,Le(q,"unpaid"),q.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),_&&(_.disabled=!0,_.classList.add("disabled")),P&&(P.value="",P.disabled=!0,P.classList.add("disabled"))):(V&&(V.disabled=!1,V.classList.remove("disabled"),V.title=""),L&&(L.disabled=!1,L.classList.remove("disabled"),L.title=""),q&&(q.disabled=!1,q.title=""),_&&(_.disabled=!1,_.classList.remove("disabled")),P&&(P.disabled=!1,P.classList.remove("disabled")));const G=A?!1:V?.checked||!1,N=!!L?.checked;if(!A&&N!==G){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let j=N?Nt():null;N&&(!Number.isFinite(j)||j<=0)&&(Re(),j=Nt());const M=N&&G&&Number.isFinite(j)&&j>0;G&&Re();const F=Fa(v,k,z,G,x,{start:p,end:y,companySharePercent:M?j:0}),O=$o(),H=Ra({totalAmount:F,progressType:R,progressValue:C,history:[]});P&&hr(P,H.paymentProgressValue);const ne=[];H.paymentProgressValue!=null&&H.paymentProgressValue>0&&ne.push({type:H.paymentProgressType||R,value:H.paymentProgressValue,amount:H.paidAmount,percentage:H.paidPercent,recordedAt:new Date().toISOString()});const Y=Ma({manualStatus:I,paidAmount:H.paidAmount,paidPercent:H.paidPercent,totalAmount:F});q&&(q.value=Y,Le(q,Y));const ae=Xs({reservationCode:O,customerId:c,start:p,end:y,status:K?"confirmed":"pending",title:null,location:null,notes:w,projectId:l||null,totalAmount:F,discount:A?0:k,discountType:A?"percent":z,applyTax:G,paidStatus:A?"unpaid":Y,confirmed:K,items:v.map(W=>({...W,equipmentId:W.equipmentId??W.id})),technicians:x,companySharePercent:A||!M?null:j,companyShareEnabled:A?!1:M,paidAmount:A?0:H.paidAmount,paidPercentage:A?0:H.paidPercent,paymentProgressType:A?null:H.paymentProgressType,paymentProgressValue:A?null:H.paymentProgressValue,paymentHistory:A?[]:ne});try{const W=await Lo(ae);ln(),Vt(),on(),Uc(),E(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof fa=="function"&&fa({type:"created",reservation:W}),zc(W)}catch(W){console.error("❌ [reservations/createForm] Failed to create reservation",W);const re=Dn(W)?W.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");E(re,"error"),A&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),Yt({clearValue:!1}))}}function zc(e){if(!hn)return;const{draftStorageKey:t=mr,returnUrl:n=pr}=hn,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}hn=null,n&&(window.location.href=n)}function Yt({clearValue:e=!1}={}){const{input:t,hidden:n}=It();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,rt())}function Vc(e,t=""){const{input:n,hidden:a}=It();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),rt())}function Uc(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),We({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),Yt({clearValue:!1}),Bt({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",Le(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),Po(),Ys([]),za("form-reset"),lt(),rt(),oe()}function Kc(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){Fc(s);return}if(a==="increase-group"&&s){Mc(s);return}if(a==="remove-group"&&s){Rc(s);return}}),e.dataset.listenerAttached="true")}function Qc(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{const s=e.value;s?.trim()&&(clearTimeout(t),t=null,Ir(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim())return;const{start:r,end:i}=zt();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function Gc(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Cs()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Cs()}),t.dataset.listenerAttached="true")}function au({onAfterSubmit:e}={}){fa=typeof e=="function"?e:null;const{customers:t,projects:n}=ue();jo(t||[]),We(),es(),qr(n||[]),Er({projectsList:n}),Za(),Vt(),Nc(),Ar(),Hc(),Oc(),Kc(),Qc(),Gc(),kc(),oe(),lt()}function _r(){Vt(),Er(),We(),es(),Za(),Ar(),lt(),oe()}if(typeof document<"u"){const e=()=>{We(),Bt({projectsList:Ja()}),es(),Za(),oe()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e)}typeof window<"u"&&(window.getCompanySharePercent=Nt);function $r(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:pt(t),endDate:pt(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:pt(n),endDate:pt(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:pt(n),endDate:pt(a)}}return e==="upcoming"?{startDate:pt(t),endDate:""}:{startDate:"",endDate:""}}function Wc(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=h(t?.value||"").trim(),i=h(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),jn(t),jn(n),r="",i=""),!r&&!i&&c){const d=$r(c);r=d.startDate,i=d.endDate}return{searchTerm:Ie(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function su(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{Xc(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),jn(a),jn(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function Xc(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=$r(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function pt(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function jn(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function fn(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function Jc(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function Yc(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=Jc(n);if(a!==null)return a}return null}function Ls(e,t=0){const n=Yc(e);if(n!=null)return n;const a=fn(e.createdAt??e.created_at);if(a!=null)return a;const s=fn(e.updatedAt??e.updated_at);if(s!=null)return s;const r=fn(e.start);if(r!=null)return r;const i=fn(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function Zc({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((v,w)=>({reservation:v,index:w})),i=t.searchTerm||"",c=t.searchReservationId||"",l=t.searchCustomerName||"",d=t.searchProjectId||"",u=t.startDate||"",m=t.endDate||"",f=t.status||"",p=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,y=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,b=u?new Date(`${u}T00:00:00`):null,g=m?new Date(`${m}T23:59:59`):null,x=r.filter(({reservation:v})=>{const w=n.get(String(v.customerId)),k=s?.get?.(String(v.projectId)),z=v.start?new Date(v.start):null,q=Wa(v),{effectiveConfirmed:I}=ct(v,k);if(p!=null&&String(v.customerId)!==String(p)||y!=null&&!(Array.isArray(v.technicians)?v.technicians.map($=>String($)):[]).includes(String(y))||f==="confirmed"&&!I||f==="pending"&&I||f==="completed"&&!q||b&&z&&z<b||g&&z&&z>g)return!1;if(c){const C=[v.reservationId,v.id,v.reservation_id,v.reservationCode,v.reservation_code,v.code,v.reference,v.referenceNumber,v.reference_number],$=Ie(C.filter(V=>V!=null&&V!=="").map(String).join(" ")).replace(/\s+/g,""),K=c.replace(/\s+/g,"");if(!$.includes(K))return!1}if(l&&!Ie(w?.customerName||"").includes(l))return!1;if(d){const C=[v.projectId,v.project_id,v.projectID,k?.id,k?.projectCode,k?.project_code],$=Ie(C.filter(V=>V!=null&&V!=="").map(String).join(" ")).replace(/\s+/g,""),K=d.replace(/\s+/g,"");if(!$.includes(K))return!1}if(!i)return!0;const _=v.items?.map?.(C=>`${C.barcode} ${C.desc}`).join(" ")||"",P=(v.technicians||[]).map(C=>a.get(String(C))?.name).filter(Boolean).join(" ");return Ie([v.reservationId,w?.customerName,v.notes,_,P,k?.title].filter(Boolean).join(" ")).includes(i)});return x.sort((v,w)=>{const k=Ls(v.reservation,v.index),z=Ls(w.reservation,w.index);return k!==z?z-k:w.index-v.index}),x}function el({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),l=o("reservations.list.itemsCountShort","{count} عنصر"),d=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),m=o("reservations.list.status.pending","⏳ غير مؤكد"),f=o("reservations.list.payment.paid","💳 مدفوع"),p=o("reservations.list.payment.unpaid","💳 غير مدفوع"),y=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),b=o("reservations.list.actions.confirm","✔️ تأكيد"),g=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),x=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),v={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:w,index:k})=>{const z=t.get(String(w.customerId)),q=w.projectId?a?.get?.(String(w.projectId)):null,I=Wa(w),_=w.paidStatus??w.paid_status??(w.paid===!0||w.paid==="paid"?"paid":"unpaid"),P=_==="paid",R=_==="partial",{effectiveConfirmed:C,projectLinked:$}=ct(w,q),K=C?"status-confirmed":"status-pending",V=P?"status-paid":R?"status-partial":"status-unpaid";let L=`<span class="reservation-chip status-chip ${K}">${C?u:m}</span>`;const A=P?f:R?y:p;let G=`<span class="reservation-chip status-chip ${V}">${A}</span>`,N=P?" tile-paid":R?" tile-partial":" tile-unpaid";I&&(N+=" tile-completed");let j="";I&&(L=`<span class="reservation-chip status-chip status-completed">${u}</span>`,G=`<span class="reservation-chip status-chip status-completed">${A}</span>`,j=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const M=!$&&!C?`<button class="tile-confirm" data-reservation-index="${k}" data-action="confirm">${b}</button>`:"",F=M?`<div class="tile-actions">${M}</div>`:"",O=w.items?.length||0,H=(w.technicians||[]).map(de=>n.get(String(de))).filter(Boolean),ne=H.map(de=>de.name).join(d)||"—",Y=h(String(w.reservationId??"")),ae=w.start?h(Pe(w.start)):"-",W=w.end?h(Pe(w.end)):"-",re=h(String(w.cost??0)),be=h(String(O)),pe=w.notes?h(w.notes):c,Se=l.replace("{count}",be),U=w.applyTax?`<small>${r}</small>`:"";let X=g;return w.projectId&&(X=q?.title?h(q.title):x),`
      <div class="${M?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${N}"${j} data-reservation-index="${k}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${Y}</div>
          <div class="tile-badges">
            ${L}
            ${G}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${v.client}</span>
            <span class="tile-value">${z?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.project}</span>
            <span class="tile-value">${X}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.start}</span>
            <span class="tile-value tile-inline">${ae}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.end}</span>
            <span class="tile-value tile-inline">${W}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.cost}</span>
            <span class="tile-value">${re} ${s} ${U}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.equipment}</span>
            <span class="tile-value">${Se}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.crew}</span>
            <span class="tile-value">${H.length?ne:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${pe}</span>
          </div>
        </div>
        ${F}
      </div>
    `}).join("")}function De(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function tl(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=ct(e,s),c=e.paid===!0||e.paid==="paid",l=Wa(e),d=e.items||[],u=wt(d),{technicians:m=[]}=ue(),f=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(m)?m:[]),p=new Map;f.forEach(D=>{if(!D||D.id==null)return;const te=String(D.id),he=p.get(te)||{};p.set(te,{...he,...D})});const y=(e.technicians||[]).map(D=>p.get(String(D))).filter(Boolean),b=Et(),g=Fn(e.start,e.end),x=(D={})=>{const te=[D.dailyWage,D.daily_rate,D.dailyRate,D.wage,D.rate];for(const he of te){if(he==null)continue;const Be=parseFloat(h(String(he)));if(Number.isFinite(Be))return Be}return 0},v=(D={})=>{const te=[D.dailyTotal,D.daily_total,D.totalRate,D.total,D.total_wage];for(const he of te){if(he==null)continue;const Be=parseFloat(h(String(he)));if(Number.isFinite(Be))return Be}return x(D)},k=d.reduce((D,te)=>D+(te.qty||1)*(te.price||0),0)*g,z=y.reduce((D,te)=>D+x(te),0),q=y.reduce((D,te)=>D+v(te),0),I=z*g,_=q*g,P=k+_,R=parseFloat(e.discount)||0,C=e.discountType==="amount"?R:P*(R/100),$=Math.max(0,P-C),K=r?!1:e.applyTax,V=Number(e.cost),L=Number.isFinite(V),A=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,G=A!=null?parseFloat(h(String(A))):NaN;let M=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(G)&&G>0)&&Number.isFinite(G)?G:0;K&&M<=0&&(M=Je);let F=M>0?Math.max(0,$*(M/100)):0;const O=$+F,H=K?O*.15:0,ne=Number.isFinite(H)&&H>0?Number(H.toFixed(2)):0,Y=O+ne,ae=Number.isFinite(Y)?Number(Y.toFixed(2)):0,W=r?ae:L?V:ae;M>0&&(F=Number(Math.max(0,$*(M/100)).toFixed(2)));const re=h(String(e.reservationId??e.id??"")),be=e.start?h(Pe(e.start)):"-",pe=e.end?h(Pe(e.end)):"-",Se=h(String(y.length)),U=h(k.toFixed(2)),X=h(C.toFixed(2)),Z=h($.toFixed(2)),de=h(ne.toFixed(2)),ee=h((Number.isFinite(W)?W:0).toFixed(2)),ye=h(String(g)),me=o("reservations.create.summary.currency","SR"),Ze=o("reservations.details.labels.discount","الخصم"),B=o("reservations.details.labels.tax","الضريبة (15%)"),ie=o("reservations.details.labels.crewTotal","إجمالي الفريق"),we=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),ge=o("reservations.details.labels.duration","عدد الأيام"),ce=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),Ae=o("reservations.details.labels.netProfit","💵 صافي الربح"),ke=o("reservations.create.equipment.imageAlt","صورة"),Ee={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},et=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),jt=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),J=o("reservations.details.technicians.roleUnknown","غير محدد"),xe=o("reservations.details.technicians.phoneUnknown","غير متوفر"),dt=o("reservations.details.technicians.wage","{amount} {currency} / اليوم"),Ai=o("reservations.list.status.confirmed","✅ مؤكد"),_i=o("reservations.list.status.pending","⏳ غير مؤكد"),$i=o("reservations.list.payment.paid","💳 مدفوع"),Ti=o("reservations.list.payment.unpaid","💳 غير مدفوع"),ji=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),ki=o("reservations.list.status.completed","📁 منتهي"),Ci=o("reservations.details.labels.id","🆔 رقم الحجز"),Li=o("reservations.details.section.bookingInfo","بيانات الحجز"),Pi=o("reservations.details.section.paymentSummary","ملخص الدفع"),Ni=o("reservations.details.labels.finalTotal","المجموع النهائي"),Bi=o("reservations.details.section.crew","😎 الفريق الفني"),Di=o("reservations.details.crew.count","{count} عضو"),Fi=o("reservations.details.section.items","📦 المعدات المرتبطة"),Ri=o("reservations.details.items.count","{count} عنصر"),Mi=o("reservations.details.actions.edit","✏️ تعديل"),Oi=o("reservations.details.actions.delete","🗑️ حذف"),Hi=o("reservations.details.labels.customer","العميل"),zi=o("reservations.details.labels.contact","رقم التواصل"),Vi=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Ui=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Ki=o("reservations.details.actions.openProject","📁 فتح المشروع"),Qi=o("reservations.details.labels.start","بداية الحجز"),Gi=o("reservations.details.labels.end","نهاية الحجز"),Wi=o("reservations.details.labels.notes","ملاحظات"),Xi=o("reservations.list.noNotes","لا توجد ملاحظات"),Ji=o("reservations.details.labels.itemsCount","عدد المعدات"),Yi=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),Zi=o("reservations.paymentHistory.title","سجل الدفعات"),eo=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),to=o("reservations.list.unknownCustomer","غير معروف"),ea=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),ps=ea==="partial",no=ea==="paid"?$i:ps?ji:Ti,ao=u.reduce((D,te)=>D+(Number(te.quantity)||0),0),so=h(String(ao)),fs=Ri.replace("{count}",so),ro=Di.replace("{count}",Se),io=e.notes?h(e.notes):Xi,oo=h(_.toFixed(2)),co=h(String(M)),lo=h(F.toFixed(2)),uo=`${co}% (${lo} ${me})`,mo=Math.max(0,k+_-C),ys=Math.max(0,mo-I),po=h(ys.toFixed(2)),tt=[{icon:"💼",label:Yi,value:`${U} ${me}`}];tt.push({icon:"😎",label:ie,value:`${oo} ${me}`}),C>0&&tt.push({icon:"💸",label:Ze,value:`${X} ${me}`}),tt.push({icon:"📊",label:we,value:`${Z} ${me}`}),K&&ne>0&&tt.push({icon:"🧾",label:B,value:`${de} ${me}`}),M>0&&tt.push({icon:"🏦",label:ce,value:uo}),Math.abs(ys-(W??0))>.009&&tt.push({icon:"💵",label:Ae,value:`${po} ${me}`}),tt.push({icon:"💰",label:Ni,value:`${ee} ${me}`});const fo=tt.map(({icon:D,label:te,value:he})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${D} ${te}</span>
      <span class="summary-details-value">${he}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let Ut=[];Array.isArray(e.paymentHistory)?Ut=e.paymentHistory:Array.isArray(e.payment_history)&&(Ut=e.payment_history);const yo=Array.isArray(e.paymentLogs)?e.paymentLogs:[],gs=Array.isArray(Ut)&&Ut.length>0?Ut:yo,go=gs.length?`<ul class="reservation-payment-history-list">${gs.map(D=>{const te=D?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):D?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),he=Number.isFinite(Number(D?.amount))&&Number(D.amount)>0?`${h(Number(D.amount).toFixed(2))} ${me}`:"—",Be=Number.isFinite(Number(D?.percentage))&&Number(D.percentage)>0?`${h(Number(D.percentage).toFixed(2))}%`:"—",kt=D?.recordedAt?h(Pe(D.recordedAt)):"—",Ct=D?.note?`<div class="payment-history-note">${De(h(D.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${De(te)}</span>
              <span class="payment-history-entry__amount">${he}</span>
              <span class="payment-history-entry__percent">${Be}</span>
              <span class="payment-history-entry__date">${kt}</span>
            </div>
            ${Ct}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${De(eo)}</div>`,bs=[{text:i?Ai:_i,className:i?"status-confirmed":"status-pending"},{text:no,className:ea==="paid"?"status-paid":ps?"status-partial":"status-unpaid"}];l&&bs.push({text:ki,className:"status-completed"});const bo=bs.map(({text:D,className:te})=>`<span class="status-chip ${te}">${D}</span>`).join(""),ut=(D,te,he)=>`
    <div class="res-info-row">
      <span class="label">${D} ${te}</span>
      <span class="value">${he}</span>
    </div>
  `;let ta="";if(e.projectId){let D=De(Ui);if(s){const te=s.title||o("projects.fallback.untitled","مشروع بدون اسم");D=`${De(te)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${De(Ki)}</button>`}ta=`
      <div class="res-info-row">
        <span class="label">📁 ${Vi}</span>
        <span class="value">${D}</span>
      </div>
    `}const Ue=[];Ue.push(ut("👤",Hi,t?.customerName||to)),Ue.push(ut("📞",zi,t?.phone||"—")),Ue.push(ut("🗓️",Qi,be)),Ue.push(ut("🗓️",Gi,pe)),Ue.push(ut("📦",Ji,fs)),Ue.push(ut("⏱️",ge,ye)),Ue.push(ut("📝",Wi,io)),ta&&Ue.push(ta);const ho=Ue.join(""),vo=u.length?u.map(D=>{const te=D.items[0]||{},he=xt(te)||D.image,Be=he?`<img src="${he}" alt="${ke}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',kt=Number(D.quantity)||Number(D.count)||0,Ct=h(String(kt)),hs=Number.isFinite(Number(D.unitPrice))?Number(D.unitPrice):0,xo=Number.isFinite(Number(D.totalPrice))?Number(D.totalPrice):hs*kt,wo=`${h(hs.toFixed(2))} ${me}`,Io=`${h(xo.toFixed(2))} ${me}`,vs=D.barcodes.map(na=>h(String(na||""))).filter(Boolean),Ao=vs.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${vs.map(na=>`<li>${na}</li>`).join("")}
              </ul>
            </details>`:"";return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${Be}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${De(te.desc||te.description||te.name||D.description||"-")}</div>
                  ${Ao}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${De(Ee.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Ct}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${De(Ee.unitPrice)}">${wo}</td>
            <td class="reservation-modal-items-table__cell" data-label="${De(Ee.total)}">${Io}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${De(Ee.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${et}</td></tr>`,qo=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${Ee.item}</th>
            <th>${Ee.quantity}</th>
            <th>${Ee.unitPrice}</th>
            <th>${Ee.total}</th>
            <th>${Ee.actions}</th>
          </tr>
        </thead>
        <tbody>${vo}</tbody>
      </table>
    </div>
  `,So=y.map((D,te)=>{const he=h(String(te+1)),Be=D.role||J,kt=D.phone||xe,Ct=D.wage?dt.replace("{amount}",h(String(D.wage))).replace("{currency}",me):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${he}</span>
          <span class="technician-name">${D.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${Be}</div>
          <div>📞 ${kt}</div>
          ${Ct?`<div>💰 ${Ct}</div>`:""}
        </div>
      </div>
    `}).join(""),Eo=y.length?`<div class="reservation-technicians-grid">${So}</div>`:`<ul class="reservation-modal-technicians"><li>${jt}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${Ci}</span>
          <strong>${re}</strong>
        </div>
        <div class="status-chips">
          ${bo}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Li}</h6>
          ${ho}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${Pi}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${fo}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Zi}</h6>
              ${go}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Bi}</span>
          <span class="count">${ro}</span>
        </div>
        ${Eo}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Fi}</span>
          <span class="count">${fs}</span>
        </div>
        ${qo}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${Mi}</button>
        ${b?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Oi}</button>`:""}
      </div>
    </div>
  `}const ru="project",iu="editProject",ou=3600*1e3,Tr=.15,cu=6,lu="projectsTab",du="projectsSubTab",uu={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},mu={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},pu={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},nl=`@page {
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
`,jr="reservations.quote.sequence",Ps={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},kr="https://help.artratio.sa/guide/quote-preview",qe={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},al=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],je=[...al],sl=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function Sa(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...je]}function rl(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=Sa(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=Sa(t.value);if(a.length)return a}const n=je.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...je]}const il=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],Cr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>S(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>S(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>S(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>S(h(Number(e?.price||0).toFixed(2)))}],Lr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>S(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>S(e?.role||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>S(e?.phone||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Ea={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:Cr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:Lr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},Pr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>S(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>S(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>S(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Nr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>S(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>S(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>S(e?.note||"-")}],Br=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>S(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>S(h(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>S(h(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>S(e?.displayCost||"—")}],ol=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],cl={customerInfo:Ea.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:Ea.payment,projectExpenses:Nr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:Pr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:Br.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},oa=new Map;function Qn(e="reservation"){if(oa.has(e))return oa.get(e);const t=e==="project"?ol:il,n=e==="project"?cl:Ea,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(l=>l.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return oa.set(e,r),r}function Gn(e="reservation"){return Qn(e).sectionDefs}function Dr(e="reservation"){return Qn(e).fieldDefs}function Fr(e="reservation"){return Qn(e).sectionIdSet}function Rr(e="reservation"){return Qn(e).fieldIdMap}function Mr(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const ll="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",dl="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",ul="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",Or=nl.trim(),ml=/color\([^)]*\)/gi,kn=/(color\(|color-mix\()/i,pl=document.createElement("canvas"),yn=pl.getContext("2d"),Hr=/^data:image\/svg\+xml/i,fl=/\.svg($|[?#])/i,Xt=512,xa="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",zr=96,Vr=25.4,wa=210,vn=297,qn=Math.round(wa/Vr*zr),Sn=Math.round(vn/Vr*zr),yl=2,Ur=/safari/i,gl=/(iphone|ipad|ipod)/i,Ns=/(iphone|ipad|ipod)/i,bl=/(crios|fxios|edgios|opios)/i,Cn="[reservations/pdf]";let Q=null,T=null,Oe=1,Qt=null,Gt=null,at=null,Lt=null,Zt=!1;function ht(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!Q?.statusIndicator||!Q?.statusText)return;Q.statusKind=e;const r=t||Mr(e);Q.statusText.textContent=r,Q.statusSpinner&&(Q.statusSpinner.hidden=!s),Q.statusAction&&(Q.statusAction.hidden=!0,Q.statusAction.onclick=null,n&&typeof a=="function"&&(Q.statusAction.textContent=n,Q.statusAction.hidden=!1,Q.statusAction.onclick=i=>{i.preventDefault(),a()})),Q.statusIndicator.hidden=!1,requestAnimationFrame(()=>{Q.statusIndicator.classList.add("is-visible")})}function en(e){!Q?.statusIndicator||!Q?.statusText||(Q.statusKind=null,Q.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{Q?.statusIndicator&&(Q.statusIndicator.hidden=!0,Q.statusAction&&(Q.statusAction.hidden=!0,Q.statusAction.onclick=null),Q.statusSpinner&&(Q.statusSpinner.hidden=!1))},220))}function Ia(){return!!window?.bootstrap?.Modal}function hl(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),at||(at=document.createElement("div"),at.className="modal-backdrop fade show",at.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(at)),Lt||(Lt=t=>{t.key==="Escape"&&Aa(e)},document.addEventListener("keydown",Lt));try{e.focus({preventScroll:!0})}catch{}}}function Aa(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),at&&(at.remove(),at=null),Lt&&(document.removeEventListener("keydown",Lt),Lt=null))}function vl(e){if(e){if(Ia()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}hl(e)}}function ql(){if(Zt)return;Zt=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!Q?.modal?.classList.contains("show"),s=()=>{Q?.modal?.classList.contains("show")&&(ht("render"),Zt=!1,At())};Qs({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:kr}),a&&ht("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function Wn(e="reservation"){const t={},n=Dr(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function ts(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function Sl(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function ns(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function as(e="reservation"){return Object.fromEntries(Gn(e).map(({id:t})=>[t,!1]))}function ss(e,t){return e.sectionExpansions||(e.sectionExpansions=as(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function El(e,t){return ss(e,t)?.[t]!==!1}function rs(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function xl(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return gl.test(e)}function wl(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=Ur.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Kr(){return xl()&&wl()}function Xn(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=Ns.test(e)||Ns.test(t),s=/Macintosh/i.test(e)&&n>1;return Ur.test(e)&&!bl.test(e)&&(a||s)}function ca(e,...t){try{console.log(`${Cn} ${e}`,...t)}catch{}}function Xe(e,...t){try{console.warn(`${Cn} ${e}`,...t)}catch{}}function Il(e,t,...n){try{t?console.error(`${Cn} ${e}`,t,...n):console.error(`${Cn} ${e}`,...n)}catch{}}function fe(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Al(e,t="لا توجد بيانات للعرض."){const n=S(o(e,t));return fe(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Ln(e,t){return Array.isArray(e)&&e.length?e:[Al(t)]}function _a(e,t="#000"){if(!yn||!e)return t;try{return yn.fillStyle="#000",yn.fillStyle=e,yn.fillStyle||t}catch{return t}}function _l(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&n.trim().toLowerCase().startsWith("color(")){console.warn("[quote/pdf] html2canvas color fallback",n);const s=_a(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}const $l=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function Qr(e=""){return $l.test(e)}function Tl(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!Qr(r))return a.call(this,r,...i);let c,l=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),l=!0)}catch{}try{if(!l){const d=this.canvas;d&&d.style?.direction!=="rtl"&&(d.__artRatioOriginalDirection=d.style.direction,d.style.direction="rtl")}return a.call(this,r,...i)}finally{if(l&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!l){const d=this.canvas;d&&d.__artRatioOriginalDirection!==void 0&&(d.style.direction=d.__artRatioOriginalDirection,delete d.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function Gr(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(ml,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const jl=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"];function Wr(e,t=window){if(!e||!t||typeof t.getComputedStyle!="function")return;e.querySelectorAll("*").forEach(a=>{const s=t.getComputedStyle(a);if(!s)return;jl.forEach(i=>{const c=s[i];if(c&&kn.test(c)){const l=i.replace(/[A-Z]/g,m=>`-${m.toLowerCase()}`),d=i==="backgroundColor"?"#ffffff":s.color||"#000000",u=_a(c,d);a.style.setProperty(l,u,"important")}});const r=s.backgroundImage;if(r&&kn.test(r)){const i=_a(s.backgroundColor||"#ffffff","#ffffff");a.style.setProperty("background-image","none","important"),a.style.setProperty("background-color",i,"important")}})}function Xr(e,t=window){!e||!t||typeof t.getComputedStyle!="function"||e.querySelectorAll("*").forEach(n=>{const a=t.getComputedStyle(n);if(!a)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(r=>{const i=a[r];if(i&&kn.test(i)){const c=r.replace(/[A-Z]/g,d=>`-${d.toLowerCase()}`),l=r==="backgroundColor"?"#ffffff":"#000000";n.style.setProperty(c,l,"important")}});const s=a.backgroundImage;s&&kn.test(s)&&(n.style.setProperty("background-image","none","important"),n.style.setProperty("background-color","#ffffff","important"))})}function Bs(e,t=Xt){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function kl(e){if(!e)return{width:Xt,height:Xt};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?Bs(t,0):0,s=n?Bs(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,l]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(l)&&l>0?l:0)}}return{width:a||Xt,height:s||Xt}}function Jr(e=""){return typeof e!="string"?!1:Hr.test(e)||fl.test(e)}function Cl(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Ll(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function Yr(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await Ll(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),l=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=l;const d=i.getContext("2d");return d.clearRect(0,0,c,l),d.drawImage(r,0,0,c,l),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function Pl(e){if(!e)return null;if(Hr.test(e))return Cl(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Nl(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!Jr(t))return!1;const n=await Pl(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",xa),!1;const a=await Yr(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",xa),!1)}async function Bl(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=kl(e),s=await Yr(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||xa),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),l=e.getAttribute("height");return c&&i.setAttribute("width",c),l&&i.setAttribute("height",l),e.parentNode?.replaceChild(i,e),!!s}async function Zr(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{Jr(s.getAttribute?.("src"))&&a.push(Nl(s))}),n.forEach(s=>{a.push(Bl(s))}),a.length&&await Promise.allSettled(a)}function Dl(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(j,M=0)=>{const F=parseFloat(j);return Number.isFinite(F)?F:M},i=r(s.paddingTop),c=r(s.paddingBottom),l=r(s.paddingRight),d=r(s.paddingLeft),u=r(s.borderRadius),m=r(s.fontSize,14),f=(()=>{const j=s.lineHeight;if(!j||j==="normal")return m*1.6;const M=r(j,m*1.6);return M>0?M:m*1.6})(),p=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(p<=0)return null;const y=Math.max(1,p-d-l),b=e.textContent||"",g=b.split(/\r?\n/),x=n.createElement("canvas"),v=x.getContext("2d");if(!v)return null;const w=s.fontStyle||"normal",k=s.fontVariant||"normal",z=s.fontWeight||"400",q=s.fontFamily||"sans-serif",I=s.fontStretch||"normal",_=j=>j.join(" "),P=[],R=j=>v.measureText(j).width;v.font=`${w} ${k} ${z} ${I} ${m}px ${q}`,g.forEach(j=>{const M=j.trim();if(M.length===0){P.push("");return}const F=M.split(/\s+/);let O=[];F.forEach((H,ne)=>{const Y=H.trim();if(!Y)return;const ae=_(O.concat(Y));if(R(ae)<=y||O.length===0){O.push(Y);return}P.push(_(O)),O=[Y]}),O.length&&P.push(_(O))}),P.length||P.push("");const C=i+c+P.length*f,$=Math.ceil(Math.max(1,p)*t),K=Math.ceil(Math.max(1,C)*t);x.width=$,x.height=K,x.style.width=`${Math.max(1,p)}px`,x.style.height=`${Math.max(1,C)}px`,v.scale(t,t);const V=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){v.save(),v.beginPath();const j=Math.max(1,p),M=Math.max(1,C),F=Math.min(u,j/2,M/2);v.moveTo(F,0),v.lineTo(j-F,0),v.quadraticCurveTo(j,0,j,F),v.lineTo(j,M-F),v.quadraticCurveTo(j,M,j-F,M),v.lineTo(F,M),v.quadraticCurveTo(0,M,0,M-F),v.lineTo(0,F),v.quadraticCurveTo(0,0,F,0),v.closePath(),v.clip()}if(v.fillStyle=V,v.fillRect(0,0,Math.max(1,p),Math.max(1,C)),v.font=`${w} ${k} ${z} ${I} ${m}px ${q}`,v.fillStyle=s.color||"#000000",v.textBaseline="top",v.textAlign="right","direction"in v)try{v.direction="rtl"}catch{}const L=Math.max(0,p-l);let A=i;P.forEach(j=>{const M=j.length?j:" ";v.fillText(M,L,A,y),A+=f});const G=n.createElement("img");let N;try{N=x.toDataURL("image/png")}catch(j){return Xe("note canvas toDataURL failed",j),null}return G.src=N,G.alt=b,G.style.width=`${Math.max(1,p)}px`,G.style.height=`${Math.max(1,C)}px`,G.style.display="block",G.setAttribute("data-quote-note-image","true"),{image:G,canvas:x,totalHeight:C,width:p}}function Fl(e,{pixelRatio:t=1}={}){if(!e||!Xn())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!Qr(a.textContent||""))return;let s;try{s=Dl(a,{pixelRatio:t})}catch(r){Xe("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function $a(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){Il(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),l=o("reservations.quote.toast.retry","إعادة المحاولة"),d=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(ht("export"),ui()):(ht("render"),Zt=!1,At())};if(Qs({message:i,duration:9e3,actionLabel:d?l:void 0,onAction:d?u:void 0,linkLabel:c,linkHref:kr}),Q?.modal?.classList.contains("show")&&ht("error",{message:i,actionLabel:d?l:void 0,onAction:d?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function Ta({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){Xe("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){Xe("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function is(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function Ds(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function Fs(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function Rl(){const e=Fs();return e||(Gt||(Gt=is(dl).catch(t=>{throw Gt=null,t}).then(()=>{const t=Fs();if(!t)throw Gt=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Gt)}async function Ml(){const e=Ds();return e||(Qt||(Qt=is(ul).catch(t=>{throw Qt=null,t}).then(()=>{const t=Ds();if(!t)throw Qt=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),Qt)}async function Ol(){if(window.html2pdf||await is(ll),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}_l(),Tl()}function S(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Hl(e="reservation"){return e==="project"?"QP":"Q"}function zl(e,t="reservation"){const n=Number(e),a=Hl(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function Vl(){const e=window.localStorage?.getItem?.(jr),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function ei(e="reservation"){const n=Vl()+1;return{sequence:n,quoteNumber:zl(n,e)}}function Ul(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(jr,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function ti(e="reservation"){return Ps[e]||Ps.reservation}function Kl(e="reservation"){try{const t=ti(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function Ql(e,t="reservation"){try{const n=ti(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function Gl(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function Wl(e,t="reservation"){if(!e)return null;const n=Fr(t),a=Rr(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,l])=>{const d=i[c];if(d==null)return;const{ids:u,emptyExplicitly:m}=Gl(d);if(!u&&!m)return;const f=Array.isArray(u)?u.filter(p=>l.has(p)):[];(f.length>0||m)&&(r[c]=f)}),{version:1,sections:s,fields:r}}function ni(e){if(!e)return;const t=e.context||"reservation",n=Wl(e,t);n&&Ql(n,t)}function ai(e){if(!e)return;const t=e.context||"reservation",n=Kl(t);if(!n)return;const a=Fr(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=ts(e.fields||Wn(t)),i=Rr(t);Object.entries(n.fields).forEach(([c,l])=>{const d=i[c];if(!d)return;const u=Array.isArray(l)?l.filter(m=>d.has(m)):[];r[c]=new Set(u)}),e.fields=r}}function si(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function ri(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return 0}function Xl(e={}){const t=[e.dailyTotal,e.daily_total,e.totalRate,e.total,e.total_wage];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return ri(e)}function Jl(e){const t=on()||[],{technicians:n=[]}=ue(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const i=String(r.id),c=s.get(i)||{};s.set(i,{...c,...r})}),(e.technicians||[]).map(r=>s.get(String(r))).filter(Boolean)}function Yl(e,t,n){const{projectLinked:a}=ct(e,n),s=Fn(e.start,e.end),c=(Array.isArray(e.items)?e.items:[]).reduce((N,j)=>N+(Number(j?.qty)||1)*(Number(j?.price)||0),0)*s,l=t.reduce((N,j)=>N+ri(j),0),d=t.reduce((N,j)=>N+Xl(j),0),u=l*s,m=d*s,f=c+m,p=parseFloat(e.discount)||0,y=e.discountType==="amount"?p:f*(p/100),b=Math.max(0,f-y),g=a?!1:e.applyTax,x=Number(e.cost),v=Number.isFinite(x),w=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,k=w!=null?parseFloat(h(String(w).replace("%","").trim())):NaN,z=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let I=(z!=null?z===!0||z===1||z==="1"||String(z).toLowerCase()==="true":Number.isFinite(k)&&k>0)&&Number.isFinite(k)?Number(k):0;g&&I<=0&&(I=Je);let _=I>0?Math.max(0,b*(I/100)):0;_=Number(_.toFixed(2));const P=b+_;let R=g?P*.15:0;(!Number.isFinite(R)||R<0)&&(R=0),R=Number(R.toFixed(2));const C=P+R,$=Number.isFinite(C)?Number(C.toFixed(2)):0,K=a?$:v?x:$,V=Math.max(0,c+m-y),L=Math.max(0,V-u),A={equipmentTotal:c,crewTotal:m,crewCostTotal:u,discountAmount:y,subtotalAfterDiscount:b,taxableAmount:P,taxAmount:R,finalTotal:K,companySharePercent:I,companyShareAmount:_,netProfit:L},G={equipmentTotal:h(c.toFixed(2)),crewTotal:h(m.toFixed(2)),discountAmount:h(y.toFixed(2)),subtotalAfterDiscount:h(b.toFixed(2)),taxableAmount:h(P.toFixed(2)),taxAmount:h(R.toFixed(2)),finalTotal:h(K.toFixed(2)),companySharePercent:h(I.toFixed(2)),companyShareAmount:h(_.toFixed(2)),netProfit:h(L.toFixed(2))};return{totals:A,totalsDisplay:G,rentalDays:s}}function Dt(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function ii(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Zl(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=Dt(e.amount??(n==="amount"?e.value:null)),s=Dt(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=ii(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function ed(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(Zl).filter(Boolean);if(n.length>0)return n;const a=Dt(e.paidPercent??e.paid_percent),s=Dt(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=ii(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function td(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function nd(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function ad(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function sd(e){const t=Number(e?.equipmentEstimate)||0,n=ad(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const l=Math.max(0,a-c),d=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,m=d&&s&&u>0?u:0,f=m>0?Number((l*(m/100)).toFixed(2)):0,p=l+f;let y=s?p*Tr:0;(!Number.isFinite(y)||y<0)&&(y=0),y=Number(y.toFixed(2));let b=s?Number(e?.totalWithTax):p;return s?(!Number.isFinite(b)||b<=0)&&(b=Number((p+y).toFixed(2))):b=p,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:l,companyShareAmount:f,subtotal:p,applyTax:s,taxAmount:y,totalWithTax:b}}function rd(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.technicians)?e.technicians:[],i=Fa(t,a,s,!1,r,{start:e.start,end:e.end});if(Number.isFinite(i))return i;const c=Number(h(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function id(e,t){if(!e)return"—";const n=Pe(e);return t?`${n} - ${Pe(t)}`:n}function se(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${h(a.toFixed(s))} ${t}`}function Rs(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function od(e){if(!e?.start)return null;if(!e?.end)return 1;const t=Fn(e.start,e.end);return Number.isFinite(t)?t:1}function cd(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function ld(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=ue(),i=e?.id!=null?s.find(B=>String(B.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:se(0,t),expensesTotal:se(0,t),reservationsTotal:se(0,t),discountAmount:se(0,t),taxAmount:se(0,t),overallTotal:se(0,t),paidAmount:se(0,t),remainingAmount:se(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:se(0,t),remainingAmountDisplay:se(0,t),paidPercentDisplay:Rs(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const l=i.clientId??i.customerId??i.client_id??i.customer_id??null,d=l!=null&&n.find(B=>String(B.id)===String(l))||null,u=d?.customerName??d?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),m=(i.clientCompany||d?.companyName||d?.company||"").trim(),f=d?.phone??d?.customerPhone??i.clientPhone??i.customerPhone??"",p=f?h(String(f).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),y=d?.email??i.clientEmail??i.customerEmail??"",b=y?String(y).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),g=i.projectCode||`PRJ-${h(String(i.id??""))}`,x=h(String(g)),v=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),w=td(i.type),k=i.start?Pe(i.start):"—",z=i.end?Pe(i.end):"—",q=od(i),I=q!=null?cd(q):"غير محدد",_=nd(i),P={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},R=o(`projects.status.${_}`,P[_]||_),C=i.id!=null?String(i.id):null,$=C?a.filter(B=>String(B.projectId)===C):[],V=$.map(B=>{const ie=B.reservationId||B.id||"",we=B.status||B.state||"pending",ge=String(we).toLowerCase(),ce=o(`reservations.status.${ge}`,ge),Ae=rd(B),ke=B.start?new Date(B.start).getTime():0;return{reservationId:h(String(ie||"-")),status:ge,statusLabel:ce,total:Ae,totalLabel:se(Ae,t),dateRange:id(B.start,B.end),startTimestamp:Number.isNaN(ke)?0:ke}}).sort((B,ie)=>ie.startTimestamp-B.startTimestamp).map(({startTimestamp:B,...ie})=>ie).reduce((B,ie)=>B+(Number(ie.total)||0),0),L=new Map;$.forEach(B=>{const ie=Array.isArray(B.items)?B.items:[],we=Fn(B.start,B.end),ge=B.reservationId||B.id||"";ie.forEach((ce,Ae)=>{if(!ce)return;const ke=ce.barcode||ce.code||ce.id||ce.desc||ce.description||`item-${Ae}`,Ee=String(ke||`item-${Ae}`),et=L.get(Ee)||{description:ce.desc||ce.description||ce.name||ce.barcode||`#${h(String(Ae+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},jt=Number(ce.qty)||1,J=Number(ce.price)||0;et.totalQuantity+=jt,et.reservationIds.add(String(ge));const xe=J*jt*Math.max(1,we);Number.isFinite(xe)&&(et.totalCost+=xe),L.set(Ee,et)})});const A=Array.from(L.values()).map(B=>({description:B.description,totalQuantity:B.totalQuantity,reservationsCount:B.reservationIds.size,displayCost:se(B.totalCost,t)})),G=new Map((r||[]).filter(Boolean).map(B=>[String(B.id),B])),N=new Map,j=B=>{if(!B)return;let ie=null;typeof B=="object"?ie=B.id??B.technicianId??B.technician_id??B.userId??B.user_id??null:(typeof B=="string"||typeof B=="number")&&(ie=B);const we=ie!=null?String(ie):null,ge=we&&G.has(we)?G.get(we):typeof B=="object"?B:null,ce=ge?.name||ge?.full_name||ge?.fullName||ge?.displayName||(typeof B=="string"?B:null),Ae=ge?.role||ge?.title||null,ke=ge?.phone||ge?.mobile||ge?.contact||null;if(!ce&&!we)return;const Ee=we||ce;N.has(Ee)||N.set(Ee,{id:we,name:ce||"-",role:Ae||null,phone:ke||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(B=>j(B)),$.forEach(B=>{(Array.isArray(B.technicians)?B.technicians:[]).forEach(we=>j(we))});const M=Array.from(N.values()),F=Array.isArray(i.expenses)?i.expenses.map(B=>{const ie=Number(B?.amount)||0;return{label:B?.label||B?.name||"-",amount:ie,displayAmount:se(ie,t),note:B?.note||B?.description||""}}):[],O=sd(i),H=O.applyTax?Number(((O.subtotal+V)*Tr).toFixed(2)):0,ne=Number((O.subtotal+V+H).toFixed(2)),Y=ed(i),ae=Dt(i.paidAmount??i.paid_amount)||0,W=Dt(i.paidPercent??i.paid_percent)||0,re=Ra({totalAmount:ne,paidAmount:ae,paidPercent:W,history:Y}),be=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",pe=Ma({manualStatus:be,paidAmount:re.paidAmount,paidPercent:re.paidPercent,totalAmount:ne}),Se={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},U=o(`projects.paymentStatus.${pe}`,Se[pe]||pe),X=Number(re.paidAmount||0),Z=Number(re.paidPercent||0),de=Math.max(0,Number((ne-X).toFixed(2))),ee={projectSubtotal:se(O.subtotal,t),expensesTotal:se(O.expensesTotal,t),reservationsTotal:se(V,t),discountAmount:se(O.discountAmount,t),taxAmount:se(H,t),overallTotal:se(ne,t),paidAmount:se(X,t),remainingAmount:se(de,t)},ye={status:pe,statusLabel:U,paidAmount:X,paidPercent:Z,remainingAmount:de,paidAmountDisplay:se(X,t),remainingAmountDisplay:se(de,t),paidPercentDisplay:Rs(Z)},me=(i.description||"").trim();return{project:i,customer:d,clientInfo:{name:u,company:m||"—",phone:p,email:b},projectInfo:{title:v,code:x,typeLabel:w,startDisplay:k,endDisplay:z,durationLabel:I,statusLabel:R},expenses:F,equipment:A,crew:M,totals:O,totalsDisplay:ee,projectTotals:{combinedTaxAmount:H,overallTotal:ne,reservationsTotal:V,paidAmount:X,paidPercent:Z,remainingAmount:de,paymentStatus:pe},paymentSummary:ye,notes:me,currencyLabel:t,projectStatus:_,projectStatusLabel:R,projectDurationDays:q,projectDurationLabel:I,paymentHistory:Y}}function dd({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:l={},currencyLabel:d="SR",sections:u,fieldSelections:m={},quoteNumber:f,quoteDate:p,terms:y=je}){const b=ts(m),g=(U,X)=>ns(b,U,X),x=U=>u?.has?.(U),v=`<div class="quote-placeholder">${S(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,w=(U,X)=>`<div class="info-plain__item">
      <span class="info-plain__label">${S(U)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${S(X)}</span>
    </div>`,k=(U,X,{variant:Z="inline"}={})=>Z==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${S(U)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${S(X)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${S(U)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${S(X)}</span>
    </span>`,z=(U,X)=>`<div class="payment-row">
      <span class="payment-row__label">${S(U)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${S(X)}</span>
    </div>`,q=[];g("customerInfo","customerName")&&q.push(w(o("projects.details.client","العميل"),t.name||"-")),g("customerInfo","customerCompany")&&q.push(w(o("projects.details.company","شركة العميل"),t.company||"—")),g("customerInfo","customerPhone")&&q.push(w(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),g("customerInfo","customerEmail")&&q.push(w(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const I=x("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${S(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${q.length?`<div class="info-plain">${q.join("")}</div>`:v}
      </section>`:"",_=[];g("projectInfo","projectType")&&_.push(w(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),g("projectInfo","projectTitle")&&_.push(w(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),g("projectInfo","projectCode")&&_.push(w(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),g("projectInfo","projectStart")&&_.push(w(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),g("projectInfo","projectEnd")&&_.push(w(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),g("projectInfo","projectDuration")&&_.push(w(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),g("projectInfo","projectStatus")&&_.push(w(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const P=x("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${S(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${_.length?`<div class="info-plain">${_.join("")}</div>`:v}
      </section>`:"",R=Pr.filter(U=>g("projectCrew",U.id)),C=x("projectCrew")?R.length?`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${R.map(U=>`<th>${S(U.labelKey?o(U.labelKey,U.fallback):U.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((U,X)=>`<tr>${R.map(Z=>`<td>${Z.render(U,X)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(R.length,1)}" class="empty">${S(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${v}
          </section>`:"",$=[];g("financialSummary","projectSubtotal")&&$.push(k(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${se(0,d)}`)),g("financialSummary","expensesTotal")&&$.push(k(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||se(0,d))),g("financialSummary","reservationsTotal")&&$.push(k(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||se(0,d))),g("financialSummary","discountAmount")&&$.push(k(o("reservations.details.labels.discount","الخصم"),i.discountAmount||se(0,d))),g("financialSummary","taxAmount")&&$.push(k(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||se(0,d)));const K=[];g("financialSummary","overallTotal")&&K.push(k(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||se(0,d),{variant:"final"})),g("financialSummary","paidAmount")&&K.push(k(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||se(0,d),{variant:"final"})),g("financialSummary","remainingAmount")&&K.push(k(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||se(0,d),{variant:"final"}));const V=x("financialSummary")?!$.length&&!K.length?`<section class="quote-section quote-section--financial">${v}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${S(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${$.length?`<div class="totals-inline">${$.join("")}</div>`:""}
            ${K.length?`<div class="totals-final">${K.join("")}</div>`:""}
          </div>
        </section>`:"",L=Nr.filter(U=>g("projectExpenses",U.id)),A=x("projectExpenses")?L.length?`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${L.map(U=>`<th>${S(U.labelKey?o(U.labelKey,U.fallback):U.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((U,X)=>`<tr>${L.map(Z=>`<td>${Z.render(U,X)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(L.length,1)}" class="empty">${S(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${v}
          </section>`:"",G=Br.filter(U=>g("projectEquipment",U.id)),N=x("projectEquipment")?G.length?`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${G.map(U=>`<th>${S(U.labelKey?o(U.labelKey,U.fallback):U.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${r.length?r.map((U,X)=>`<tr>${G.map(Z=>`<td>${Z.render(U,X)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(G.length,1)}" class="empty">${S(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${v}
          </section>`:"",j=(e?.description||"").trim()||"",M=x("projectNotes")?`<section class="quote-section">
        <h3>${S(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${S(j||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",F=[];g("payment","beneficiary")&&F.push(z(o("reservations.quote.labels.beneficiary","اسم المستفيد"),qe.beneficiaryName)),g("payment","bank")&&F.push(z(o("reservations.quote.labels.bank","اسم البنك"),qe.bankName)),g("payment","account")&&F.push(z(o("reservations.quote.labels.account","رقم الحساب"),h(qe.accountNumber))),g("payment","iban")&&F.push(z(o("reservations.quote.labels.iban","رقم الآيبان"),h(qe.iban)));const O=`<section class="quote-section">
      <div class="payment-block">
        <h3>${S(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${F.length?F.join(""):v}</div>
      </div>
      <p class="quote-approval-note">${S(qe.approvalNote)}</p>
    </section>`,H=Array.isArray(y)&&y.length?y:je,ne=`<footer class="quote-footer">
        <h4>${S(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${H.map(U=>`<li>${S(U)}</li>`).join("")}</ul>
      </footer>`,Y=[],ae=[];if(P&&ae.push({key:"project",html:P}),I&&ae.push({key:"customer",html:I}),ae.length>1){const U=ae.find(de=>de.key==="project"),X=ae.find(de=>de.key==="customer"),Z=[];U?.html&&Z.push(U.html),X?.html&&Z.push(X.html),Y.push(fe(`<div class="quote-section-row quote-section-row--primary">${Z.join("")}</div>`,{blockType:"group"}))}else ae.length===1&&Y.push(fe(ae[0].html));const W=[];C&&W.push(fe(C,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),A&&W.push(fe(A,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),N&&W.push(fe(N,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const re=[];V&&re.push(fe(V,{blockType:"summary"})),M&&re.push(fe(M));const be=[fe(O,{blockType:"payment"}),fe(ne,{blockType:"footer"})],pe=[...Ln(Y,"projects.quote.placeholder.primary"),...W,...Ln(re,"projects.quote.placeholder.summary"),...be],Se=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${S(qe.logoUrl)}" alt="${S(qe.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${S(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${S(qe.companyName)}</p>
        <p class="quote-company-cr">${S(o("reservations.quote.labels.cr","السجل التجاري"))}: ${S(qe.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${S(o("reservations.details.labels.reservationId","رقم العرض"))}</span>
          <strong>${S(f)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${S(o("projects.quote.labels.date","التاريخ"))}</span>
          <strong>${S(p)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Or}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Se}
          ${pe.join("")}
        </div>
      </div>
    </div>
  `}function oi(e){if(e?.context==="project")return dd(e);const{reservation:t,customer:n,project:a,technicians:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:l,sections:d,fieldSelections:u={},quoteNumber:m,quoteDate:f,terms:p=je}=e,y=h(String(t?.reservationId??t?.id??"")),b=t.start?h(Pe(t.start)):"-",g=t.end?h(Pe(t.end)):"-",x=n?.customerName||n?.full_name||n?.name||"-",v=n?.phone||"-",w=n?.email||"-",k=n?.company||n?.company_name||"-",z=h(v),q=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),I=a?.code||a?.projectCode||"",_=h(String(c)),P=t?.notes||"",R=Array.isArray(p)&&p.length?p:je,C=ts(u),$=(J,xe)=>ns(C,J,xe),K=J=>d?.has?.(J),V=`<div class="quote-placeholder">${S(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,L=(J,xe)=>`<div class="info-plain__item">${S(J)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${S(xe)}</strong></div>`,A=(J,xe,{variant:dt="inline"}={})=>dt==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${S(J)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${S(xe)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${S(J)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${S(xe)}</span>
    </span>`,G=(J,xe)=>`<div class="payment-row">
      <span class="payment-row__label">${S(J)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${S(xe)}</span>
    </div>`,N=[];$("customerInfo","customerName")&&N.push(L(o("reservations.details.labels.customer","العميل"),x)),$("customerInfo","customerCompany")&&N.push(L(o("reservations.details.labels.company","الشركة"),k)),$("customerInfo","customerPhone")&&N.push(L(o("reservations.details.labels.phone","الهاتف"),z)),$("customerInfo","customerEmail")&&N.push(L(o("reservations.details.labels.email","البريد"),w));const j=K("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${S(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${N.length?`<div class="info-plain">${N.join("")}</div>`:V}
      </section>`:"",M=[];$("reservationInfo","reservationId")&&M.push(L(o("reservations.details.labels.reservationId","رقم الحجز"),y||"-")),$("reservationInfo","reservationStart")&&M.push(L(o("reservations.details.labels.start","بداية الحجز"),b)),$("reservationInfo","reservationEnd")&&M.push(L(o("reservations.details.labels.end","نهاية الحجز"),g)),$("reservationInfo","reservationDuration")&&M.push(L(o("reservations.details.labels.duration","عدد الأيام"),_));const F=K("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${S(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${M.length?`<div class="info-plain">${M.join("")}</div>`:V}
      </section>`:"",O=[];$("projectInfo","projectTitle")&&O.push(L(o("reservations.details.labels.project","المشروع"),q)),$("projectInfo","projectCode")&&O.push(L(o("reservations.details.labels.code","الرمز"),I||"-"));const H=K("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${S(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${O.length?`<div class="info-plain">${O.join("")}</div>`:V}
      </section>`:"",ne=[];$("financialSummary","equipmentTotal")&&ne.push(A(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${l}`)),$("financialSummary","crewTotal")&&ne.push(A(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${l}`)),$("financialSummary","discountAmount")&&ne.push(A(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${l}`)),$("financialSummary","taxAmount")&&ne.push(A(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${l}`));const Y=$("financialSummary","finalTotal"),ae=[];Y&&ae.push(A(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${l}`,{variant:"final"}));const W=ae.length?`<div class="totals-final">${ae.join("")}</div>`:"",re=K("financialSummary")?!ne.length&&!Y?`<section class="quote-section quote-section--financial">${V}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${S(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${ne.length?`<div class="totals-inline">${ne.join("")}</div>`:""}
            ${W}
          </div>
        </section>`:"",be=Cr.filter(J=>$("items",J.id)),pe=be.length>0,Se=pe?be.map(J=>`<th>${S(J.labelKey?o(J.labelKey,J.fallback):J.fallback)}</th>`).join(""):"",X=Array.isArray(t.items)&&t.items.length>0?t.items.map((J,xe)=>`<tr>${be.map(dt=>`<td>${dt.render(J,xe)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(be.length,1)}" class="empty">${S(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,Z=K("items")?pe?`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Se}</tr>
              </thead>
              <tbody>${X}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.items.title","المعدات"))}</h3>
            ${V}
          </section>`:"",de=Lr.filter(J=>$("crew",J.id)),ee=de.length>0,ye=ee?de.map(J=>`<th>${S(J.labelKey?o(J.labelKey,J.fallback):J.fallback)}</th>`).join(""):"",me=s.length?s.map((J,xe)=>`<tr>${de.map(dt=>`<td>${dt.render(J,xe)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(de.length,1)}" class="empty">${S(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,Ze=K("crew")?ee?`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${ye}</tr>
              </thead>
              <tbody>${me}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${V}
          </section>`:"",B=K("notes")?`<section class="quote-section">
        <h3>${S(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${S(P||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",ie=[];$("payment","beneficiary")&&ie.push(G(o("reservations.quote.labels.beneficiary","اسم المستفيد"),qe.beneficiaryName)),$("payment","bank")&&ie.push(G(o("reservations.quote.labels.bank","اسم البنك"),qe.bankName)),$("payment","account")&&ie.push(G(o("reservations.quote.labels.account","رقم الحساب"),h(qe.accountNumber))),$("payment","iban")&&ie.push(G(o("reservations.quote.labels.iban","رقم الآيبان"),h(qe.iban)));const we=`<section class="quote-section">
      <div class="payment-block">
        <h3>${S(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${ie.length?ie.join(""):V}</div>
      </div>
      <p class="quote-approval-note">${S(qe.approvalNote)}</p>
    </section>`,ge=`<footer class="quote-footer">
        <h4>${S(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${R.map(J=>`<li>${S(J)}</li>`).join("")}</ul>
      </footer>`,ce=[];j&&F?ce.push(fe(`<div class="quote-section-row">${j}${F}</div>`,{blockType:"group"})):(F&&ce.push(fe(F)),j&&ce.push(fe(j))),H&&ce.push(fe(H));const Ae=[];Z&&Ae.push(fe(Z,{blockType:"table",extraAttributes:'data-table-id="items"'})),Ze&&Ae.push(fe(Ze,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const ke=[];re&&ke.push(fe(re,{blockType:"summary"})),B&&ke.push(fe(B));const Ee=[fe(we,{blockType:"payment"}),fe(ge,{blockType:"footer"})],et=[...Ln(ce,"reservations.quote.placeholder.page1"),...Ae,...Ln(ke,"reservations.quote.placeholder.page2"),...Ee],jt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${S(qe.logoUrl)}" alt="${S(qe.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${S(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${S(qe.companyName)}</p>
        <p class="quote-company-cr">${S(o("reservations.quote.labels.cr","السجل التجاري"))}: ${S(qe.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${S(m)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${S(f)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Or}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${jt}
          ${et.join("")}
        </div>
      </div>
    </div>
  `}function ud(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function nn(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>ud(c)),i=[s,...r].map(c=>c.catch(l=>(Xe("asset load failed",l),ql(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function ci(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await Zr(r),await nn(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let l=null,d=null;const u=q=>{q.style.margin="0 auto",q.style.breakInside="avoid",q.style.pageBreakInside="avoid",q.style.pageBreakAfter="auto",q.style.breakAfter="auto"},m=()=>{const q=a.createElement("div"),I=s.childElementCount===0;if(q.className="quote-page",q.dataset.pageIndex=String(s.childElementCount),I){q.classList.add("quote-page--primary");const P=i.cloneNode(!0);P.removeAttribute("data-quote-header-template"),q.appendChild(P)}else q.classList.add("quote-page--continuation");const _=a.createElement("main");_.className="quote-body",q.appendChild(_),s.appendChild(q),u(q),l=q,d=_},f=()=>{(!l||!d||!d.isConnected)&&m()},p=()=>{if(!l||!d||d.childElementCount>0)return;const q=l;l=null,d=null,q.parentNode&&q.parentNode.removeChild(q)},y=()=>{l=null,d=null},b=()=>l?l.scrollHeight-l.clientHeight>yl:!1,g=(q,{allowOverflow:I=!1}={})=>(f(),d.appendChild(q),b()&&!I?(d.removeChild(q),p(),!1):!0),x=q=>{const I=q.cloneNode(!0);I.removeAttribute?.("data-quote-block"),I.removeAttribute?.("data-block-type"),I.removeAttribute?.("data-table-id"),!g(I)&&(y(),!g(I)&&g(I,{allowOverflow:!0}))},v=q=>{const I=q.querySelector("table");if(!I){x(q);return}const _=q.querySelector("h3"),P=I.querySelector("thead"),R=Array.from(I.querySelectorAll("tbody tr"));if(!R.length){x(q);return}let C=null,$=0;const K=(L=!1)=>{const A=q.cloneNode(!1);A.removeAttribute("data-quote-block"),A.removeAttribute("data-block-type"),A.removeAttribute("data-table-id"),A.classList.add("quote-section--table-fragment"),L&&A.classList.add("quote-section--table-fragment--continued");const G=_?_.cloneNode(!0):null;G&&A.appendChild(G);const N=I.cloneNode(!1);N.classList.add("quote-table--fragment"),P&&N.appendChild(P.cloneNode(!0));const j=a.createElement("tbody");return N.appendChild(j),A.appendChild(N),{section:A,body:j}},V=(L=!1)=>C||(C=K(L),g(C.section)||(y(),g(C.section)||g(C.section,{allowOverflow:!0})),C);R.forEach(L=>{V($>0);const A=L.cloneNode(!0);if(C.body.appendChild(A),b()&&(C.body.removeChild(A),C.body.childElementCount||(d.removeChild(C.section),C=null,p()),y(),C=null,V($>0),C.body.appendChild(A),b())){C.section.classList.add("quote-section--table-fragment--overflow"),$+=1;return}$+=1}),C=null};if(!c.length)return;c.forEach(q=>{q.getAttribute("data-block-type")==="table"?v(q):x(q)});const w=Array.from(s.children),k=[];if(w.forEach((q,I)=>{const _=q.querySelector(".quote-body");if(I!==0&&(!_||_.childElementCount===0)){q.remove();return}k.push(q)}),!n){const q=a.defaultView||window,I=Math.min(3,Math.max(1,q.devicePixelRatio||1)),_=Xn()?Math.min(2,I):I;k.forEach(P=>Fl(P,{pixelRatio:_}))}k.forEach((q,I)=>{const _=I===0;q.style.pageBreakAfter="auto",q.style.breakAfter="auto",q.style.pageBreakBefore=_?"auto":"always",q.style.breakBefore=_?"auto":"page",n?q.style.boxShadow="":q.style.boxShadow="none"});const z=k[k.length-1]||null;l=z,d=z?.querySelector(".quote-body")||null,await nn(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function os(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function md(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([Ml(),Rl()]),c=e.ownerDocument||document,l=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,l,c?.documentElement?.getAttribute?.("dir")].some(q=>typeof q=="string"&&q.toLowerCase().startsWith("rtl")),m=typeof window<"u"&&window.devicePixelRatio||1,f=rs(),p=Kr(),y=Xn();let b;y?b=1.5:p?b=Math.min(1.7,Math.max(1.2,m*1.1)):f?b=Math.min(1.8,Math.max(1.25,m*1.2)):b=Math.min(2,Math.max(1.6,m*1.4));const g=y||p?.9:f?.92:.95,x=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),v={scale:b,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let w=0;const k=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let q=0;q<s.length;q+=1){const I=s[q];await Zr(I),await nn(I);const _=I.ownerDocument||document,P=_.createElement("div");Object.assign(P.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const R=I.cloneNode(!0);R.style.width=`${qn}px`,R.style.maxWidth=`${qn}px`,R.style.minWidth=`${qn}px`,R.style.height=`${Sn}px`,R.style.maxHeight=`${Sn}px`,R.style.minHeight=`${Sn}px`,R.style.position="relative",R.style.background="#ffffff",os(R),P.appendChild(R),_.body.appendChild(P);let C;try{await nn(R),C=await i(R,{...v,scale:b,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(j){throw $a(j,"pageCapture",{toastMessage:k}),j}finally{P.parentNode?.removeChild(P)}if(!C)continue;const $=C.width||1,V=(C.height||1)/$;let L=wa,A=L*V,G=0;if(A>vn){const j=vn/A;A=vn,L=L*j,G=Math.max(0,(wa-L)/2)}const N=C.toDataURL("image/jpeg",g);w>0&&x.addPage(),x.addImage(N,"JPEG",G,0,L,A,`page-${w+1}`,"FAST"),w+=1,await new Promise(j=>window.requestAnimationFrame(j))}}catch(q){throw Ta({safariWindowRef:n,mobileWindowRef:a}),q}if(w===0)throw Ta({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(p||y){const q=x.output("blob");if(y){const I=URL.createObjectURL(q);en();try{window.location.assign(I)}catch(_){Xe("mobile safari blob navigation failed",_)}finally{setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{const I=URL.createObjectURL(q),_=()=>p&&n&&!n.closed?n:a&&!a.closed?a:null,P=(C,$)=>{if(en(),!C){window.location.assign($);return}try{C.location.replace($),C.focus?.()}catch(K){Xe("direct blob navigation failed",K);try{C.document.open(),C.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${S(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${$}" title="PDF preview"></iframe></body></html>`),C.document.close()}catch(V){Xe("iframe blob delivery failed",V),window.location.assign($)}}},R=_();P(R,I),setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{en();const q=x.output("bloburl"),I=document.createElement("a");I.href=q,I.download=t,I.rel="noopener",I.style.display="none",document.body.appendChild(I),I.click(),setTimeout(()=>{URL.revokeObjectURL(q),I.remove()},2e3)}}function At(){if(!T||!Q)return;const{previewFrame:e}=Q;if(!e)return;const t=T.context||"reservation",n=oi({context:t,reservation:T.reservation,customer:T.customer,project:T.project,technicians:T.technicians,totals:T.totals,totalsDisplay:T.totalsDisplay,rentalDays:T.rentalDays,currencyLabel:T.currencyLabel,sections:T.sections,fieldSelections:T.fields,quoteNumber:T.quoteNumber,quoteDate:T.quoteDateLabel,terms:T.terms,projectCrew:T.projectCrew,projectExpenses:T.projectExpenses,projectEquipment:T.projectEquipment,projectInfo:T.projectInfo,clientInfo:T.clientInfo,paymentSummary:T.paymentSummary,projectTotals:T.projectTotals});ht("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&(Gr(r),Wr(r,s),Xr(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await ci(i,{context:"preview"}),os(i))}catch(p){console.error("[reservations/pdf] failed to layout preview document",p)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),l=a?.querySelector(".quote-preview-pages"),d=qn;let u=18;if(l&&a?.defaultView){const p=a.defaultView.getComputedStyle(l),y=parseFloat(p.rowGap||p.gap||`${u}`);Number.isFinite(y)&&y>=0&&(u=y)}const m=Sn,f=c.length?c.length*m+Math.max(0,(c.length-1)*u):m;if(e.dataset.baseWidth=String(d),e.dataset.baseHeight=String(f),e.style.width=`${d}px`,e.style.minWidth=`${d}px`,e.style.height=`${f}px`,e.style.minHeight=`${f}px`,Q?.previewFrameWrapper&&!Q?.userAdjustedZoom){const p=Q.previewFrameWrapper.clientWidth-24;p>0&&p<d?Oe=Math.max(p/d,.3):Oe=1}di(Oe)}finally{en()}},{once:!0})}function pd(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?T.sections.add(n):T.sections.delete(n),ni(T),li(),At())}function fd(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=T.context||"reservation",r=T.fields||(T.fields=Wn(s)),i=Sl(r,n);t.checked?i.add(a):i.delete(a),ni(T),At()}function yd(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(ss(T,n),T.sectionExpansions[n]=t.open)}function li(){if(!Q?.toggles||!T)return;const{toggles:e}=Q,t=T.fields||{},n=T.context||"reservation";ss(T);const a=Gn(n),s=Dr(n),r=a.map(({id:i,labelKey:c,fallback:l})=>{const d=o(c,l),u=T.sections.has(i),m=s[i]||[],f=El(T,i),p=m.length?`<div class="quote-toggle-sublist">
          ${m.map(y=>{const b=ns(t,i,y.id),g=u?"":"disabled",x=y.labelKey?o(y.labelKey,y.fallback):y.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${y.id}" ${b?"checked":""} ${g}>
                <span>${S(x)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${i}" ${f?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${i}" ${u?"checked":""}>
            <span>${S(d)}</span>
          </label>
          ${m.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${p}
      </details>
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",pd)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",fd)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",yd)})}function gd(){if(Q?.modal)return Q;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
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
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),r=e.querySelector("[data-quote-terms-reset]"),i=e.querySelector("[data-quote-download]"),c=e.querySelector(".modal-header"),l=c?.querySelector(".btn-close"),d=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",c&&c.insertBefore(u,l||null);const m=document.createElement("iframe");m.className="quote-preview-frame",m.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),m.setAttribute("loading","lazy"),m.setAttribute("frameborder","0");const f=document.createElement("div");f.className="quote-preview-zoom-controls",f.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${S(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${S(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${S(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const p=document.createElement("div");p.className="quote-preview-frame-wrapper",p.appendChild(m),n.innerHTML="";const y=document.createElement("div");y.className="quote-preview-scroll",y.appendChild(p),n.appendChild(y);const b=document.createElement("div");b.className="quote-preview-status",b.setAttribute("role","status"),b.setAttribute("aria-live","polite"),b.hidden=!0,b.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${S(Mr("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(b),u.appendChild(f),i?.addEventListener("click",async()=>{if(T){i.disabled=!0;try{await ui()}finally{i.disabled=!1}}});const g=()=>{Ia()||Aa(e)};d.forEach(k=>{k?.addEventListener("click",g)}),l&&!d.includes(l)&&l.addEventListener("click",g),e.addEventListener("click",k=>{Ia()||k.target===e&&Aa(e)}),Q={modal:e,toggles:t,preview:n,previewScroll:y,previewFrameWrapper:p,zoomControls:f,zoomValue:f.querySelector("[data-zoom-value]"),previewFrame:m,meta:a,downloadBtn:i,statusIndicator:b,statusText:b.querySelector("[data-quote-status-text]"),statusSpinner:b.querySelector("[data-quote-status-spinner]"),statusAction:b.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const x=f.querySelector("[data-zoom-out]"),v=f.querySelector("[data-zoom-in]"),w=f.querySelector("[data-zoom-reset]");return x?.addEventListener("click",()=>Ms(-.1)),v?.addEventListener("click",()=>Ms(.1)),w?.addEventListener("click",()=>Pn(1,{markManual:!0})),s&&s.addEventListener("input",hd),r&&r.addEventListener("click",vd),Pn(Oe),Q}function Pn(e,{silent:t=!1,markManual:n=!1}={}){Oe=Math.min(Math.max(e,.25),2.2),n&&Q&&(Q.userAdjustedZoom=!0),di(Oe),!t&&Q?.zoomValue&&(Q.zoomValue.textContent=`${Math.round(Oe*100)}%`)}function Ms(e){Pn(Oe+e,{markManual:!0})}function di(e){if(!Q?.previewFrame||!Q.previewFrameWrapper)return;const t=Q.previewFrame,n=Q.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",rs()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function bd(){if(!Q?.meta||!T)return;const{meta:e}=Q;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${S(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${S(T.quoteNumber)}</strong></div>
      <div><span>${S(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${S(T.quoteDateLabel)}</strong></div>
    </div>
  `}function cs(){if(!Q?.termsInput)return;const e=(T?.terms&&T.terms.length?T.terms:je).join(`
`);Q.termsInput.value!==e&&(Q.termsInput.value=e)}function hd(e){if(!T)return;const t=Sa(e?.target?.value??"");if(t.length){T.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{T.terms=[...je],cs();const n=je.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}At()}function vd(e){if(e?.preventDefault?.(),!T)return;T.terms=[...je];const t=document.getElementById("reservation-terms");t&&(t.value=je.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=je.join(`
`)),cs(),At()}async function ui(){if(!T)return;ht("export");const t=!rs()&&Kr(),n=Xn(),a=null,s=!n&&t?window.open("","_blank"):null;(l=>{if(l)try{l.document.open(),l.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${S(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${S(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${S(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),l.document.close()}catch(d){Xe("failed to prime download window",d)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await Ol(),ca("html2pdf ensured");const l=T.context||"reservation",d=oi({context:l,reservation:T.reservation,customer:T.customer,project:T.project,technicians:T.technicians,totals:T.totals,totalsDisplay:T.totalsDisplay,rentalDays:T.rentalDays,currencyLabel:T.currencyLabel,sections:T.sections,fieldSelections:T.fields,quoteNumber:T.quoteNumber,quoteDate:T.quoteDateLabel,terms:T.terms,projectCrew:T.projectCrew,projectExpenses:T.projectExpenses,projectEquipment:T.projectEquipment,projectInfo:T.projectInfo,clientInfo:T.clientInfo,paymentSummary:T.paymentSummary,projectTotals:T.projectTotals});i=document.createElement("div"),i.innerHTML=d,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),Gr(i),Wr(i),Xr(i),ca("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await ci(u,{context:"export"}),await nn(u),os(u),ca("layout complete for export document")}catch(f){$a(f,"layoutQuoteDocument",{suppressToast:!0})}}const m=`quotation-${T.quoteNumber}.pdf`;await md(u,{filename:m,safariWindowRef:s,mobileWindowRef:a}),T.sequenceCommitted||(Ul(T.quoteSequence),T.sequenceCommitted=!0)}catch(l){Ta({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,$a(l,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),en()}}function mi(){const e=gd();e?.modal&&(Zt=!1,Oe=1,Q&&(Q.userAdjustedZoom=!1),Pn(Oe,{silent:!0}),li(),bd(),cs(),At(),vl(e.modal))}async function qd({reservation:e,customer:t,project:n}){if(!e){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=Jl(e),{totalsDisplay:s,totals:r,rentalDays:i}=Yl(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:l,quoteNumber:d}=ei("reservation"),u=new Date,m=rl();T={context:"reservation",reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(Gn("reservation").filter(f=>f.defaultSelected).map(f=>f.id)),sectionExpansions:as("reservation"),fields:Wn("reservation"),terms:m,quoteSequence:l,quoteNumber:d,quoteDate:u,quoteDateLabel:si(u),sequenceCommitted:!1},ai(T),mi()}async function fu({project:e}){if(!e){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=ld(e),{project:n}=t;if(!n){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=ei("project"),r=new Date,i=[...sl];T={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(Gn("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:as("project"),fields:Wn("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:si(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},ai(T),mi()}function Sd({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=on(),{reservations:r=[],customers:i=[],technicians:c=[],projects:l=[]}=ue(),d=Array.isArray(s)?s:c||[],u=new Map((l||[]).map(g=>[String(g.id),g])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){m.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const f=t||Wc(),p=new Map(i.map(g=>[String(g.id),g])),y=new Map(d.map(g=>[String(g.id),g])),b=Zc({reservations:r,filters:f,customersMap:p,techniciansMap:y,projectsMap:u});if(b.length===0){m.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${el({entries:b,customersMap:p,techniciansMap:y,projectsMap:u})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(g=>{const x=Number(g.dataset.reservationIndex);Number.isNaN(x)||g.addEventListener("click",()=>{typeof n=="function"&&n(x)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(g=>{const x=Number(g.dataset.reservationIndex);Number.isNaN(x)||g.addEventListener("click",v=>{v.stopPropagation(),typeof a=="function"&&a(x,v)})})}function Ed(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=ue(),c=s[e];if(!c)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const l=r.find(x=>String(x.id)===String(c.customerId)),d=c.projectId?i.find(x=>String(x.id)===String(c.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const x=on()||[];u.innerHTML=tl(c,l,x,e,d)}const m=document.getElementById("reservationDetailsModal"),f=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},p=document.getElementById("reservation-details-edit-btn");p&&(p.onclick=()=>{f(),typeof t=="function"&&t(e,{reservation:c,customer:l,getEditContext:a})});const y=document.getElementById("reservation-details-delete-btn");y&&(y.onclick=()=>{f(),typeof n=="function"&&n(e,{reservation:c,customer:l})});const b=u?.querySelector('[data-action="open-project"]');b&&d&&b.addEventListener("click",()=>{f();const x=d?.id!=null?String(d.id):"",v=x?`projects.html?project=${encodeURIComponent(x)}`:"projects.html";window.location.href=v});const g=document.getElementById("reservation-details-export-btn");return g&&(g.onclick=async x=>{x?.preventDefault?.(),x?.stopPropagation?.(),g.blur();try{await qd({reservation:c,customer:l,project:d})}catch(v){console.error("❌ [reservations] export to PDF failed",v),E(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}function pi(){const e=()=>{ln(),Te(),on()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let Os=!1,Hs=null;function xd(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function yu(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=xd(n);if(!a&&Os&&bt().length>0&&s===Hs)return bt();try{const r=await er(n||{});return Os=!0,Hs=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return bt()}}async function wd(e,{onAfterChange:t}={}){if(!Et())return rn(),!1;const a=bt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await No(s),pi(),t?.({type:"deleted",reservation:a}),E(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=Dn(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return E(i,"error"),!1}}async function Id(e,{onAfterChange:t}={}){const a=bt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=ct(a);if(r)return E(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await Bo(s);return pi(),t?.({type:"confirmed",reservation:i}),E(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=Dn(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return E(c,"error"),!1}}function un(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:tn(e,n),end:tn(t,a)}}function _t(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,Vs(t);return}const l=wt(e);t.innerHTML=l.map(d=>{const u=d.items[0]||{},m=xt(u)||d.image,f=m?`<img src="${m}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',p=h(String(d.count)),y=Number.isFinite(Number(d.unitPrice))?Number(d.unitPrice):0,b=Number.isFinite(Number(d.totalPrice))?Number(d.totalPrice):y*d.count,g=`${h(y.toFixed(2))} ${a}`,x=`${h(b.toFixed(2))} ${a}`,v=d.barcodes.map(k=>h(String(k||""))).filter(Boolean),w=v.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${v.map(k=>`<li>${k}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${d.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${d.description||"-"}</div>
                ${w}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${d.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${d.key}" aria-label="${i}">−</button>
              <span class="reservation-qty-value">${p}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${d.key}" aria-label="${r}">+</button>
            </div>
          </td>
          <td>${g}</td>
          <td>${x}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),Vs(t)}function Ad(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function Jn(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=Yn();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,zs();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${h(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${h(Number(s.percentage).toFixed(2))}%`:"—",l=s?.recordedAt?h(Pe(s.recordedAt)):"—",d=Ad(s?.type),u=s?.note?h(s.note):"";return`
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
  `,zs()}function _d(){if(an()){E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=gi(e);let a=bi(t);if(!Number.isFinite(a)||a<=0){E(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=ua.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,l=o("reservations.create.summary.currency","SR");let d=null,u=null;if(n==="percent"){const f=Math.max(0,100-i);if(f<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const p=Math.min(a,f);if(p!==a){const y=h(p.toFixed(2));E(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",y)),a=p}u=Number(a.toFixed(2)),r>0&&(d=a/100*r)}else{const f=Math.max(0,r-c);if(f<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const p=Math.min(a,f);if(p!==a){const y=`${h(p.toFixed(2))} ${l}`;E(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",y)),a=p}d=Number(a.toFixed(2)),r>0&&(u=d/r*100)}d!=null&&(d=Number(d.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const m={type:n,value:a,amount:d,percentage:u,recordedAt:new Date().toISOString()};Dd(m),ls(Yn()),Jn(),Me(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),E(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function zs(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(an()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}_d()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(an()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(Fd(s),ls(Yn()),Jn(),Me(),E(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function $d(e){const{index:t,items:n}=$t(),s=wt(n).find(c=>c.key===e);if(!s)return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,l)=>l!==r);Tt(t,i),_t(i),Me()}function Td(e){const{index:t,items:n}=$t(),a=n.filter(s=>dn(s)!==e);a.length!==n.length&&(Tt(t,a),_t(a),Me())}function jd(e){const{index:t,items:n}=$t(),s=wt(n).find(g=>g.key===e);if(!s)return;const{start:r,end:i}=un();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=ue(),l=t!=null&&c[t]||null,d=l?.id??l?.reservationId??null,u=new Set(n.map(g=>le(g.barcode))),{equipment:m=[]}=ue(),f=(m||[]).find(g=>{const x=le(g?.barcode);return!x||u.has(x)||dn({desc:g?.desc||g?.description||g?.name||"",price:Number(g?.price)||0})!==e||!Va(g)?!1:!Ye(x,r,i,d)});if(!f){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const p=le(f.barcode),y=Ot(f);if(!y){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const b=[...n,{id:y,equipmentId:y,barcode:p,desc:f.desc||f.description||f.name||s.description||"",qty:1,price:Number.isFinite(Number(f.price))?Number(f.price):s.unitPrice,image:xt(f)}];Tt(t,b),_t(b),Me()}function Vs(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){$d(s);return}if(a==="increase-edit-group"&&s){jd(s);return}if(a==="remove-edit-group"&&s){Td(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||Ld(i)}}),e.dataset.groupListenerAttached="true")}function an(){return!!document.getElementById("edit-res-project")?.value}function kd(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{an()&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function Cd(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),l=document.getElementById("edit-res-payment-history");[n,a,s,r,i,c,l].forEach(kd),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s&&(s.value="unpaid",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),l&&(l.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.dataset.linkedDisabled="false"))}function Me(){const e=document.getElementById("edit-res-summary");if(!e)return;Jn();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),Le(a),Me()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=an();Cd(c);const l=document.getElementById("edit-res-tax"),d=c?!1:l?.checked||!1,u=!c&&a?.dataset?.userSelected==="true",m=c?"unpaid":u&&a?.value||"unpaid";let f=null;!c&&d&&(Re("edit-res-company-share"),f=Nt("edit-res-company-share"),(!Number.isFinite(f)||f<=0)&&(Re("edit-res-company-share"),f=Nt("edit-res-company-share")));const{items:p=[],payments:y=[]}=$t(),{start:b,end:g}=un(),x=ua({items:p,discount:r,discountType:i,applyTax:d,paidStatus:m,start:b,end:g,companySharePercent:f,paymentHistory:y});e.innerHTML=x;const v=ua.lastResult;if(v&&a){const w=v.paymentStatus;u?Le(a,a.value):(a.value!==w&&(a.value=w),a.dataset&&delete a.dataset.userSelected,Le(a,w))}else a&&Le(a,a.value)}function Ld(e){if(e==null)return;const{index:t,items:n}=$t();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);Tt(t,a),_t(a),Me()}function Pd(e){const t=e?.value??"",n=le(t);if(!n)return;const a=Rn(n);if(!a){E(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=ot(a);if(s==="maintenance"||s==="retired"){E(Ht(s));return}const r=le(n),{index:i,items:c=[]}=$t();if(c.findIndex(g=>le(g.barcode)===r)>-1){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=un();if(!d||!u){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:m=[]}=ue(),f=i!=null&&m[i]||null,p=f?.id??f?.reservationId??null;if(Ye(r,d,u,p)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const y=Ot(a);if(!y){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const b=[...c,{id:y,equipmentId:y,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];Tt(i,b),e&&(e.value=""),_t(b),Me()}function Nn(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=xr(t),a=le(n?.barcode||t);if(!n||!a){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=ot(n);if(s==="maintenance"||s==="retired"){E(Ht(s));return}const{start:r,end:i}=un();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:l=[]}=$t();if(l.some(b=>le(b.barcode)===a)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=ue(),m=c!=null&&u[c]||null,f=m?.id??m?.reservationId??null;if(Ye(a,r,i,f)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const p=Ot(n);if(!p){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const y=[...l,{id:p,equipmentId:p,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];Tt(c,y),_t(y),Me(),e.value=""}function fi(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Nn(e))});const t=()=>{wr(e.value,"edit-res-equipment-description-options")&&Nn(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}typeof document<"u"&&document.addEventListener("language:changed",()=>{Me()});typeof window<"u"&&(window.getEditReservationDateRange=un,window.renderEditPaymentHistory=Jn);function Nd(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){qa(e);return}Nn(e)}}function gu(){Vt(),fi()}function Bd(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let sn=null,Ke=[],He=[],ja=null,_e={},la=!1;function ka(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function Ca(){return document.getElementById("edit-res-confirmed")?.value==="true"}function $t(){return{index:sn,items:Ke,payments:He}}function Tt(e,t,n=He){sn=typeof e=="number"?e:null,Ke=Array.isArray(t)?[...t]:[],He=Array.isArray(n)?[...n]:[]}function yi(){sn=null,Ke=[],Ro(),He=[]}function Yn(){return[...He]}function ls(e){He=Array.isArray(e)?[...e]:[]}function Dd(e){e&&(He=[...He,e])}function Fd(e){!Number.isInteger(e)||e<0||(He=He.filter((t,n)=>n!==e))}function Rd(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function gi(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function bi(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Md(e,t){if(e){e.value="";return}}function Wt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function hi(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),l=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,d=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:l,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:d}}function Od(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((l,d)=>String(d.createdAt||d.start||"").localeCompare(String(l.createdAt||l.start||""))):[],c=[`<option value="">${Wt(a)}</option>`];i.forEach(l=>{c.push(`<option value="${Wt(l.id)}">${Wt(l.title||a)}</option>`)}),r&&!i.some(l=>String(l.id)===r)&&c.push(`<option value="${Wt(r)}">${Wt(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function vi(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const l=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",l&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}La("tax");const c=_e?.updateEditReservationSummary;typeof c=="function"&&c()}function La(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=_e?.updateEditReservationSummary;typeof r=="function"&&r()};if(la){a();return}la=!0;const s=()=>{la=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(Je)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),Re("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Re("edit-res-company-share"):n.checked&&(n.checked=!1));s()}function Us(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:l}=ue(),u=bt()?.[e];if(!u){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}_e={..._e,reservation:u,projects:l||[]},t?.(),Od(l||[],u);const m=u.projectId&&l?.find?.(N=>String(N.id)===String(u.projectId))||null,{effectiveConfirmed:f,projectLinked:p}=ct(u,m),y=u.items?u.items.map(N=>({...N,equipmentId:N.equipmentId??N.equipment_id??N.id,barcode:le(N?.barcode)})):[],g=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(N=>hi(N)).filter(Boolean);Tt(e,y,g);const x=o("reservations.list.unknownCustomer","غير معروف"),v=c?.find?.(N=>String(N.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const w=document.getElementById("edit-res-id");w&&(w.value=u.reservationId||u.id);const k=document.getElementById("edit-res-customer");k&&(k.value=v?.customerName||x);const z=typeof a=="function"?a(u.start):{date:"",time:""},q=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",z.date),n?.("edit-res-start-time",z.time),n?.("edit-res-end",q.date),n?.("edit-res-end-time",q.time);const I=document.getElementById("edit-res-notes");I&&(I.value=u.notes||"");const _=document.getElementById("edit-res-discount");if(_){const N=p?0:u.discount??0;_.value=h(N)}const P=document.getElementById("edit-res-discount-type");P&&(P.value=p?"percent":u.discountType||"percent");const R=u.projectId?!1:!!u.applyTax,C=document.getElementById("edit-res-tax");C&&(C.checked=R);const $=document.getElementById("edit-res-company-share");if($){const N=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,j=N!=null?Number.parseFloat(h(String(N).replace("%","").trim())):NaN,M=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,F=M!=null?M===!0||M===1||M==="1"||String(M).toLowerCase()==="true":Number.isFinite(j)&&j>0,O=F&&Number.isFinite(j)&&j>0?j:Je,H=R||F;$.checked=H,$.dataset.companyShare=String(O)}ka(f,{disable:p});const K=document.getElementById("edit-res-paid"),V=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");K&&(K.value=V,K.dataset&&delete K.dataset.userSelected);const L=document.getElementById("edit-res-payment-progress-type"),A=document.getElementById("edit-res-payment-progress-value");if(L?.dataset?.userSelected&&delete L.dataset.userSelected,L&&(L.value="percent"),Md(A),Mo((u.technicians||[]).map(N=>String(N))),s?.(y),typeof window<"u"){const N=window?.renderEditPaymentHistory;typeof N=="function"&&N()}vi(),r?.();const G=document.getElementById("editReservationModal");ja=Rd(G,i),ja?.show?.()}async function Hd({combineDateTime:e,hasEquipmentConflict:t,hasTechnicianConflict:n,updateEditReservationSummary:a,renderReservations:s,populateEquipmentDescriptionLists:r,handleReservationsMutation:i}={}){if(sn===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const c=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",d=document.getElementById("edit-res-end")?.value?.trim(),u=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",m=document.getElementById("edit-res-notes")?.value||"",f=h(document.getElementById("edit-res-discount")?.value||"0");let p=parseFloat(f)||0,y=document.getElementById("edit-res-discount-type")?.value||"percent";const b=Ca(),g=document.getElementById("edit-res-paid"),x=g?.dataset?.userSelected==="true",v=x&&g?.value||"unpaid",w=document.getElementById("edit-res-payment-progress-type"),k=document.getElementById("edit-res-payment-progress-value"),z=gi(w),q=bi(k),I=document.getElementById("edit-res-project")?.value||"",_=Do(),P=document.getElementById("edit-res-company-share"),R=document.getElementById("edit-res-tax");if(!c||!d){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const C=typeof e=="function"?e:(ee,ye)=>`${ee}T${ye||"00:00"}`,$=C(c,l),K=C(d,u);if($&&K&&new Date($)>new Date(K)){E(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const L=bt()?.[sn];if(!L){E(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(Ke)||Ke.length===0&&_.length===0){E(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const A=typeof t=="function"?t:()=>!1,G=L.id??L.reservationId;for(const ee of Ke){const ye=ot(ee.barcode);if(ye==="reserved"){const me=le(ee.barcode);if(!A(me,$,K,G))continue}if(ye!=="available"){E(Ht(ye));return}}for(const ee of Ke){const ye=le(ee.barcode);if(A(ye,$,K,G)){E(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const N=typeof n=="function"?n:()=>!1;for(const ee of _)if(N(ee,$,K,G)){E(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const j=Array.isArray(_e.projects)&&_e.projects.length?_e.projects:ue().projects||[],M=I&&j.find(ee=>String(ee.id)===String(I))||null,F={...L,projectId:I?String(I):null,confirmed:b},{effectiveConfirmed:O,projectLinked:H,projectStatus:ne}=ct(F,M);let Y=!!P?.checked,ae=!!R?.checked;if(H&&(Y&&(P.checked=!1,Y=!1),ae=!1),!H&&Y!==ae){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}ae&&(Re("edit-res-company-share"),Y=!!P?.checked);let W=Y?getCompanySharePercent("edit-res-company-share"):null;Y&&(!Number.isFinite(W)||W<=0)&&(Re("edit-res-company-share"),W=getCompanySharePercent("edit-res-company-share"));const re=Y&&ae&&Number.isFinite(W)&&W>0,be=H?!1:ae;H&&(p=0,y="percent");const pe=Fa(Ke,p,y,be,_,{start:$,end:K,companySharePercent:re?W:0});let Se=Yn();if(Number.isFinite(q)&&q>0){const ee=pe;let ye=null,me=null;z==="amount"?(ye=q,ee>0&&(me=q/ee*100)):(me=q,ee>0&&(ye=q/100*ee));const Ze=hi({type:z,value:q,amount:ye,percentage:me,recordedAt:new Date().toISOString()});Ze&&(Se=[...Se,Ze],ls(Se)),k&&(k.value="")}const U=Ra({totalAmount:pe,history:Se}),X=Ma({manualStatus:v,paidAmount:U.paidAmount,paidPercent:U.paidPercent,totalAmount:pe});g&&!x&&(g.value=X,g.dataset&&delete g.dataset.userSelected);let Z=L.status??"pending";H?Z=M?.status??ne??Z:["completed","cancelled"].includes(String(Z).toLowerCase())||(Z=b?"confirmed":"pending");const de=Xs({reservationCode:L.reservationCode??L.reservationId??null,customerId:L.customerId,start:$,end:K,status:Z,title:L.title??null,location:L.location??null,notes:m,projectId:I?String(I):null,totalAmount:pe,discount:p,discountType:y,applyTax:be,paidStatus:X,confirmed:O,items:Ke.map(ee=>({...ee,equipmentId:ee.equipmentId??ee.id})),technicians:_,companySharePercent:re?W:null,companyShareEnabled:re,paidAmount:U.paidAmount,paidPercentage:U.paidPercent,paymentProgressType:U.paymentProgressType,paymentProgressValue:U.paymentProgressValue,paymentHistory:Se});try{const ee=await Fo(L.id||L.reservationId,de);await er(),ln(),Te(),E(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),a?.(),yi(),i?.({type:"updated",reservation:ee}),s?.(),r?.(),ja?.hide?.()}catch(ee){console.error("❌ [reservationsEdit] Failed to update reservation",ee);const ye=Dn(ee)?ee.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");E(ye,"error")}}function bu(e={}){_e={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=_e,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=h(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{La("tax")}),c.dataset.listenerAttached="true");const l=document.getElementById("edit-res-company-share");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{La("share")}),l.dataset.listenerAttached="true");const d=document.getElementById("edit-res-payment-progress-type");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{d.dataset.userSelected="true",t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const m=document.getElementById("edit-res-project");m&&!m.dataset.listenerAttached&&(m.addEventListener("change",()=>{vi();const g=Array.isArray(_e.projects)&&_e.projects.length?_e.projects:ue().projects||[],x=m.value&&g.find(q=>String(q.id)===String(m.value))||null,w={..._e?.reservation??{},projectId:m.value||null,confirmed:Ca()},{effectiveConfirmed:k,projectLinked:z}=ct(w,x);ka(k,{disable:z}),t?.()}),m.dataset.listenerAttached="true");const f=document.getElementById("edit-res-confirmed-btn");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{if(f.disabled)return;const g=!Ca();ka(g),t?.()}),f.dataset.listenerAttached="true");const p=document.getElementById("save-reservation-changes");p&&!p.dataset.listenerAttached&&(p.addEventListener("click",()=>{Hd(_e).catch(g=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",g)})}),p.dataset.listenerAttached="true");const y=document.getElementById("edit-res-equipment-barcode");if(y&&!y.dataset.listenerAttached){let g=null;const x=()=>{y.value?.trim()&&(clearTimeout(g),g=null,n?.(y))};y.addEventListener("keydown",w=>{w.key==="Enter"&&(w.preventDefault(),x())});const v=()=>{if(clearTimeout(g),!y.value?.trim())return;const{start:w,end:k}=getEditReservationDateRange();!w||!k||(g=setTimeout(()=>{x()},150))};y.addEventListener("input",v),y.addEventListener("change",x),y.dataset.listenerAttached="true"}fi?.();const b=document.getElementById("editReservationModal");b&&!b.dataset.cleanupAttached&&(b.addEventListener("hidden.bs.modal",()=>{yi(),t?.(),s?.([])}),b.dataset.cleanupAttached="true")}const zd=ue()||{};let Fe=(zd.projects||[]).map(Kd),mn=!1;function hu(){return Fe}function Zn(e){Fe=Array.isArray(e)?e.map(us):[],Na({projects:Fe});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return Fe}async function Vd(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,l])=>{l==null||l===""||t.set(c,String(l))});const n=t.toString(),s=(await ze(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(ds);return Zn(i),mn=!0,Fe}async function Ud({force:e=!1,params:t=null}={}){if(!e&&mn&&Fe.length>0)return Fe;try{return await Vd(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),Fe}}async function vu(e){const t=await ze("/projects/",{method:"POST",body:e}),n=ds(t?.data??{}),a=[...Fe,n];return Zn(a),mn=!0,n}async function qu(e,t){const n=await ze(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=ds(n?.data??{}),s=Fe.map(r=>String(r.id)===String(e)?a:r);return Zn(s),mn=!0,a}async function Su(e){await ze(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=Fe.filter(n=>String(n.id)!==String(e));Zn(t),mn=!0}function Eu({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:l,paymentStatus:d,equipmentEstimate:u=0,expenses:m=[],taxAmount:f=0,totalWithTax:p=0,discount:y=0,discountType:b="percent",companyShareEnabled:g=!1,companySharePercent:x=null,companyShareAmount:v=0,paidAmount:w=null,paidPercentage:k=null,paymentProgressType:z=null,paymentProgressValue:q=null,confirmed:I=!1,technicians:_=[],equipment:P=[],payments:R,paymentHistory:C}={}){const $=Array.isArray(_)?_.map(F=>Number.parseInt(String(F),10)).filter(F=>Number.isInteger(F)&&F>0):[],K=Array.isArray(P)?P.map(F=>{const O=Number.parseInt(String(F.equipmentId??F.equipment_id??F.id??0),10),H=Number.parseInt(String(F.qty??F.quantity??0),10);return!Number.isInteger(O)||O<=0?null:{equipment_id:O,quantity:Number.isInteger(H)&&H>0?H:1}}).filter(Boolean):[],V=Array.isArray(m)?m.map(F=>{const O=Number.parseFloat(F?.amount??F?.value??0)||0,H=(F?.label??F?.name??"").trim();return H?{label:H,amount:Math.round(O*100)/100}:null}).filter(Boolean):[],L=V.reduce((F,O)=>F+(O?.amount??0),0),A={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!l,payment_status:d??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(L*100)/100,tax_amount:Math.round((Number.parseFloat(f)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(p)||0)*100)/100,confirmed:!!I,technicians:$,equipment:K,expenses:V},G=Math.max(0,Number.parseFloat(y)||0);A.discount=G,A.discount_type=b==="amount"?"amount":"percent";const N=Number.parseFloat(x),j=!!g&&Number.isFinite(N)&&N>0;A.company_share_enabled=j,A.company_share_percent=j?N:0,A.company_share_amount=j?Math.max(0,Number.parseFloat(v)||0):0,Number.isFinite(Number(w))&&(A.paid_amount=Math.max(0,Number.parseFloat(w)||0)),Number.isFinite(Number(k))&&(A.paid_percentage=Math.max(0,Number.parseFloat(k)||0)),(z==="amount"||z==="percent")&&(A.payment_progress_type=z),q!=null&&q!==""&&(A.payment_progress_value=Number.parseFloat(q)||0),e&&(A.project_code=String(e).trim());const M=R!==void 0?R:C;if(M!==void 0){const F=qi(M)||[];A.payments=F.map(O=>({type:O.type,amount:O.amount!=null?O.amount:null,percentage:O.percentage!=null?O.percentage:null,value:O.value!=null?O.value:null,note:O.note??null,recorded_at:O.recordedAt??null}))}return A.end_datetime||delete A.end_datetime,A.client_company||(A.client_company=null),A}function ds(e={}){return us(e)}function Kd(e={}){return us(e)}function us(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(p=>{if(p==null)return null;if(typeof p=="object"){const y=p.id??p.technician_id??p.technicianId;return y!=null?String(y):null}return String(p)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(p=>{const y=p?.equipment_id??p?.equipmentId??p?.id??null,b=p?.quantity??p?.qty??0,g=p?.barcode??p?.code??"",x=p?.description??p?.name??"";return{equipmentId:y!=null?String(y):null,qty:Number.parseInt(String(b),10)||0,barcode:g,description:x}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((p,y)=>({id:p?.id??`expense-${t??"x"}-${y}`,label:p?.label??"",amount:Number.parseFloat(p?.amount??0)||0})),l=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,d=e.company_share_enabled??e.companyShareEnabled,u=d!=null?d===!0||d===1||String(d).toLowerCase()==="true":l>0,m=e.payment_history??e.paymentHistory??e.payments??null,f=qi(m);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?l:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(p=>typeof p=="object"?p:{id:p}),equipment:r,expenses:c,paymentHistory:f}}function xu(e){return e instanceof Ks}function da(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function Qd(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=da(e.value);let s=da(e.amount),r=da(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,l=e.recordedAt??e.recorded_at??e.date??null;let d=null;if(l){const m=new Date(l);Number.isNaN(m.getTime())||(d=m.toISOString())}d||(d=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:d}}function qi(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>Qd(t)).filter(Boolean):[]}const Bn="reservations-ui:ready",yt=typeof EventTarget<"u"?new EventTarget:null;let gt={};function Gd(e){return Object.freeze({...e})}function Wd(){if(!yt)return;const e=gt,t=typeof CustomEvent=="function"?new CustomEvent(Bn,{detail:e}):{type:Bn,detail:e};typeof yt.dispatchEvent=="function"&&yt.dispatchEvent(t)}function Xd(e={}){if(!e||typeof e!="object")return gt;const t={...gt};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),gt=Gd(t),Wd(),gt}function Jd(e){if(e)return gt?.[e]}function wu(e){const t=Jd(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const i=(s?.detail||gt)?.[e];typeof i=="function"&&(yt&&yt.removeEventListener(Bn,a),n(i))};yt&&yt.addEventListener(Bn,a)})}function Iu(){return Ud().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=ue()||{};Oo(e||[]),_r()})}function ms(e=null){_r(),Si(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Yd(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Pa(){return{populateEquipmentDescriptionLists:Vt,setFlatpickrValue:Bd,splitDateTime:Gs,renderEditItems:_t,updateEditReservationSummary:Me,addEquipmentByDescription:Nd,addEquipmentToEditingReservation:Pd,addEquipmentToEditingByDescription:Nn,combineDateTime:tn,hasEquipmentConflict:Ye,hasTechnicianConflict:Ws,renderReservations:Si,handleReservationsMutation:ms,ensureModal:Yd}}function Si(e="reservations-list",t=null){Sd({containerId:e,filters:t,onShowDetails:Ei,onConfirmReservation:wi})}function Ei(e){return Ed(e,{getEditContext:Pa,onEdit:(t,{reservation:n})=>{Ii(t,n)},onDelete:xi})}function xi(e){return Et()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?wd(e,{onAfterChange:ms}):!1:(rn(),!1)}function wi(e){return Id(e,{onAfterChange:ms})}function Ii(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}Us(e,Pa());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}Us(e,Pa());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}To({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Au(){Xd({showReservationDetails:Ei,deleteReservation:xi,confirmReservation:wi,openReservationEditor:Ii})}export{Ei as A,ds as B,Wa as C,du as D,uu as E,hu as F,xu as G,Tr as H,mu as I,fu as J,ru as K,iu as L,Vd as M,Ie as N,ou as O,lu as P,cu as Q,pu as R,Su as S,vu as T,Ud as a,Au as b,bu as c,gu as d,yu as e,_r as f,Pa as g,oe as h,au as i,ms as j,tl as k,Iu as l,ct as m,Kn as n,Te as o,tu as p,nu as q,Si as r,su as s,Jd as t,Me as u,$r as v,wu as w,Eu as x,qu as y,Xd as z};
