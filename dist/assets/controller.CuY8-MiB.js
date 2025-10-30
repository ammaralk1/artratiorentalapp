import{n as v,l as fe,A as Hc,t as o,a as qt,s as A,u as gn,c as ta,d as Ha,b as mr,z as Vc,f as ut,B as fr,o as Kc}from"./auth.D26aJb88.js";import{B as ce,C as _t,E as yr,F as Uc,D as un,G as Gs,n as it,H as br,I as Di,J as Jn,K as Yn,L as Va,M as Qc,N as Ws,O as It,P as Xs,Q as Tn,R as gr,S as Js,T as Gc,U as Wc,V as Xc,W as hr,X as hn,Y as Sa,Z as Jc,_ as Ka,$ as vr,a0 as qr,a as Ys,o as Zs,q as ei,a1 as Sr,a2 as Yc,s as pn,h as Ua,a3 as Zc,a4 as Er,a5 as el,i as ti,r as Xt,a6 as ni,a7 as Ht,a8 as Ea,m as Ae,p as ze,y as Qa,b as wr,a9 as Ar,l as ai,g as Lt,aa as ws,j as xr,z as tl,ab as nl,ac as As,ad as al,u as sl,ae as il,af as rl,ag as ol,ah as cl}from"./reservationsService.BnprjwAK.js";const fs="select.form-select:not([data-no-enhance]):not([multiple])",kt=new WeakMap;let ys=null,Ri=!1,Nt=null;function Lp(e=document){e&&(e.querySelectorAll(fs).forEach(t=>ya(t)),!ys&&e===document&&(ys=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(fs)&&ya(a),a.querySelectorAll?.(fs).forEach(s=>ya(s)))})}),ys.observe(document.body,{childList:!0,subtree:!0})),Ri||(Ri=!0,document.addEventListener("pointerdown",ul,{capture:!0})))}function fa(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){ya(e);return}const t=e.closest(".enhanced-select");t&&(si(t),wa(t),xs(t))}function ya(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){fa(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const i={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};kt.set(t,i),a.addEventListener("click",()=>dl(t)),a.addEventListener("keydown",r=>pl(r,t)),s.addEventListener("click",r=>fl(r,t)),s.addEventListener("keydown",r=>ml(r,t)),e.addEventListener("change",()=>{wa(t),_r(t)}),i.observer=new MutationObserver(r=>{let c=!1,l=!1;for(const d of r)d.type==="attributes"&&d.attributeName==="disabled"&&(l=!0),d.type==="childList"&&(c=!0);l&&xs(t),c&&ll(i,t)}),i.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),si(t),wa(t),xs(t)}function ll(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,si(t),wa(t)})))}function si(e){const t=kt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),i=document.createDocumentFragment();s.forEach(r=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=r.textContent??r.value??"",c.dataset.value=r.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),r.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),r.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),i.appendChild(c)}),a.innerHTML="",a.appendChild(i),_r(e)}function wa(e){const t=kt.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],i=s?.textContent?.trim()||s?.value||"";a.textContent=i}function _r(e){const t=kt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(r=>{const c=r.dataset.value===s;r.toggleAttribute("aria-selected",c),r.dataset.selected=c?"true":"",r.setAttribute("tabindex",c?"0":"-1")})}function xs(e){const t=kt.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function dl(e){kt.get(e)&&(e.getAttribute("data-open")==="true"?Bn(e):Ir(e))}function Ir(e){const t=kt.get(e);if(!t)return;Nt&&Nt!==e&&Bn(Nt,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),Nt=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function Bn(e,{focusTrigger:t=!0}={}){const n=kt.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),Nt===e&&(Nt=null))}function ul(e){if(!Nt)return;const t=e.target;t instanceof Node&&(Nt.contains(t)||Bn(Nt,{focusTrigger:!1}))}function pl(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),Ir(t)):n==="Escape"&&Bn(t)}function ml(e,t){const n=e.key,a=kt.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const i=s.findIndex(r=>r===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(i+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const r=document.activeElement;r&&r.classList.contains("enhanced-select__option")&&kr(r,t)}else n==="Escape"&&(e.preventDefault(),Bn(t))}function fl(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&kr(n,t)}function kr(e,t){const n=kt.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),Bn(t)}const Fn=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let jt=null;function ii(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function $r(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function yl(e={}){const t={...e};return t.barcode&&(t.barcode=v(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function bl(e={}){const t=yl({...e,activatedAt:Date.now()});return jt=t,$r(!0,t.mode||"create"),ii(Fn.change,{active:!0,selection:{...t}}),t}function Aa(e="manual"){if(!jt)return;const t=jt;jt=null,$r(!1),ii(Fn.change,{active:!1,previous:t,reason:e})}function Cr(){return!!jt}function gl(){return jt?{...jt}:null}function hl(e){if(!jt)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=v(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:i,description:r}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const l=c.map(u=>v(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!l.length)return!1;const d=Number.isInteger(s)&&s>0?s:l.length;t={barcodes:l,quantity:Math.min(d,l.length)},i&&(t.groupKey=i),r&&(t.description=r)}else return!1;return ii(Fn.requestAdd,{...t,selection:{...jt}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||Aa("tab-changed")});const vl=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),ql=new Set(["maintenance","reserved","retired"]);function Sl(e){const t=String(e??"").trim().toLowerCase();return t&&vl.get(t)||"available"}function El(e){return e?typeof e=="object"?e:Ga(e):null}function Ft(e){const t=El(e);return t?Sl(t.status||t.state||t.statusLabel||t.status_label):"available"}function Pr(e){return!ql.has(Ft(e))}function vn(e={}){return e.image||e.imageUrl||e.img||""}function wl(e){if(!e)return null;const t=ce(e),{equipment:n=[]}=fe();return(n||[]).find(a=>ce(a?.barcode)===t)||null}function Ga(e){const t=ce(e);if(!t)return null;const{equipment:n=[]}=fe();return(n||[]).find(a=>ce(a?.barcode)===t)||null}const Al=fe()||{};let Vt=(Al.equipment||[]).map(Il),_s=!1,_n="",on=null,mn=null,fn=null,Wa=!1,Mi=!1;function xl(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function _l(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function Il(e={}){return ri({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function Xa(e={}){return ri(e)}function ri(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",i=na(e.quantity??e.qty??0),r=Ja(e.unit_price??e.price??0),c=v(String(e.barcode??"").trim()),l=Ze(e.status??e.state??e.status_label??e.statusLabel??"available"),d=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:kl(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:i,price:r,barcode:c,status:l,image:d,imageUrl:d,created_at:e.created_at??null,updated_at:e.updated_at??null}}function kl(e){return e!=null&&e!==""}function na(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function Ja(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function $l(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=v(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const i=s.length-a.length,r=t+i,c=n+i;e.setSelectionRange(r,c)}}),e.dataset.englishDigitsAttached="true")}function zi(e){if(!e)return"";const t=v(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=v(String(n?.barcode??"")).trim();if(a)return a}return""}function Cl(e,t){const n=zi(e),a=zi(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,i=s.test(n),r=s.test(a);if(i&&r){if(n.length!==a.length)return n.length-a.length;const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}else{if(i!==r)return i?-1:1;{const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}}const c=_a(e?.desc||e?.description||e?.name||""),l=_a(t?.desc||t?.description||t?.name||"");return c.localeCompare(l,"ar",{sensitivity:"base"})}function Oe(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ze(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function Pl(e){return Ze(e)}function xa(){if(!Cr())return null;const e=gl();return e?{...e}:null}function Nl(e){const t=xa();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:i=null}=t,r=t?.mode||t?.source||"",c=[],l=new Set;if(n.forEach(f=>{const m=ce(f?.barcode);!m||l.has(m)||(l.add(m),c.push({variant:f,barcode:m}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(r==="package-manager"||r==="equipment-packages"){const f=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:m})=>m),maxQuantity:f,reason:""}}const d=c.filter(({variant:f})=>{const m=Ze(f?.status);return m!=="maintenance"&&m!=="retired"});if(!a||!s)return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=d.filter(({barcode:f})=>!_t(f,a,s,i));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:f})=>f),maxQuantity:u.length};let b=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(d.length>0)b=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const f=new Set(c.map(({variant:m})=>Ze(m?.status)));f.has("maintenance")?b=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):f.has("reserved")?b=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):f.has("retired")&&(b=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:b,availableBarcodes:[],maxQuantity:0}}function Ll(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function Nr(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=xa();e.hidden=!s;const i=s?.mode||s?.source||"";s?i==="package-manager"||i==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=xa(),l=c?.mode||c?.source||"";l==="package-manager"||l==="equipment-packages"?Aa("package-finish-button"):(Aa("return-button"),Ll())}),t.dataset.listenerAttached="true")}function pt(){return Vt}function yn(e){Vt=Array.isArray(e)?e.map(ri):[],Ha({equipment:Vt}),_l()}function _a(e){return String(e??"").trim().toLowerCase()}function Qt(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=_a(t);return n||(n=_a(e.category||"")),n||(n=v(String(e.barcode||"")).trim().toLowerCase()),n}function Ya(e){const t=Qt(e);return t?pt().filter(n=>Qt(n)===t):[]}function Za(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=es(e);if(n){const a=Oe(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${Oe(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function oi(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function Ia(){const e=oi();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function ci(e={}){const t=oi();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?v(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?v(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function Pn(e){Wa=e;const t=oi(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(r=>{r&&(e?r.removeAttribute("disabled"):r.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const r=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(r,c),a.dataset.mode=e?"save":"view"}if(e){const r=t.description||t.category||t.subcategory;r&&setTimeout(()=>{r.focus(),typeof r.select=="function"&&r.select()},0)}}async function jl(e){if(!gn()){ta();return}if(!e)return;try{await Bl()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),i=s.Sheets[s.SheetNames[0]],r=XLSX.utils.sheet_to_json(i,{defval:""});if(!Array.isArray(r)||r.length===0){A(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let l=0;if(r.forEach(d=>{const u=d.القسم??d.category??"",b=d["القسم الثانوي"]??d.subcategory??"",f=d.الوصف??d.description??d.name??"",m=d.الكمية??d.quantity??0,p=d.السعر??d.price??0,g=d.الباركود??d.barcode??"",q=d.الحالة??d.status??"متاح",I=d.الصورة??d.image_url??d.image??"",S=v(String(g||"")).trim();if(!f||!S){l+=1;return}c.push(li({category:u,subcategory:b,description:f,quantity:m,unit_price:p,barcode:S,status:q,image_url:I}))}),!c.length){A(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const d=await qt("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(d?.data)?d.data.map(Xa):[];if(u.length){const m=[...pt(),...u];yn(m)}await aa({showToastOnError:!1}),et();const b=d?.meta?.count??u.length,f=[];b&&f.push(`${b} ✔️`),l&&f.push(`${l} ⚠️`),A(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(f.length?` (${f.join(" / ")})`:""))}catch(d){const u=Rn(d,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");A(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),A(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),A(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const Tl="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let zn=null;function Bl(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):zn||(zn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",i,{once:!0});return}const a=document.createElement("script");a.src=Tl,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",i,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function i(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),zn=null,e}),zn)}function li({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:i="",status:r="متاح",image_url:c=""}){const l=v(String(i||"")).trim(),d=Pl(r);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:na(a),unit_price:Ja(s),barcode:l,status:d,image_url:c?.trim()||null}}async function Lr(){if(!gn()){ta();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await qt("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await aa({showToastOnError:!1}),A(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=Rn(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");A(t,"error")}}function es(e){return e.image||e.imageUrl||e.img||""}function Fl(e){const t=Ze(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function ka(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${Oe(a)}</td></tr>`}n&&(n.textContent="0")}function jr(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const i=on?.groupKey||Qt(e);if(!i){ka();return}const r=pt().filter(b=>Qt(b)===i).sort((b,f)=>{const m=String(b.barcode||"").trim(),p=String(f.barcode||"").trim();return!m&&!p?0:m?p?m.localeCompare(p,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!r.length){ka();return}t.hidden=!1,a&&(a.textContent=String(r.length));const c=o("equipment.modal.variants.current","الحالي"),l=o("equipment.form.labels.quantity","الكمية"),d=pt(),u=r.map(b=>{const f=b.id&&e.id?String(b.id)===String(e.id):String(b.barcode||"")===String(e.barcode||""),m=f?"equipment-variants-table__row--current":"",p=Oe(String(b.barcode||"-")),g=f?`<span class="equipment-variants-current-badge">${Oe(c)}</span>`:"",q=v(String(Number.isFinite(Number(b.qty))?Number(b.qty):0)),I=d.indexOf(b),S=Oe(o("equipment.item.actions.delete","🗑️ حذف")),N=I>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${I}">${S}</button>
          </div>`:"";return`
        <tr class="${m}">
          <td>
            ${p}
            ${g}
          </td>
          <td>${Fl(b.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${Oe(l)}">${q}</span>
          </td>
          <td class="table-actions-cell">${N}</td>
        </tr>
      `}).join("");n.innerHTML=u}function Dl({item:e,index:t}){const n=es(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),i=o("equipment.item.currency","SR"),r=gn(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},l=Number.isFinite(Number(e.qty))?Number(e.qty):0,d=Number.isFinite(Number(e.price))?Number(e.price):0,u=l.toLocaleString("en-US"),b=d.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),f=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,m=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,p=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(l-f-m,0),g=p.toLocaleString("en-US"),q=o("equipment.card.labels.availableOfTotal","من أصل"),I=Ze(e.status);let S=`${Oe(c.available)}: ${Oe(g)} ${Oe(q)} ${Oe(u)}`,N="available";if(p===0){const V={reserved:{text:l===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},H=V[I]||V.default;S=Oe(H.text),N=H.modifier}const x=`<span class="equipment-card__availability equipment-card__availability--${N}">${S}</span>`,O="",w=e.desc||e.name||"—",_=e.name&&e.name!==e.desc?e.name:"",T=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${b} ${i}`}].map(({label:V,value:H})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${V}</span>
              <span class="equipment-card__detail-value">${H}</span>
            </span>
          `).join("")}
    </div>`,X=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),C=X.length?`<div class="equipment-card__categories">${X.map(({label:V,value:H})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${V}</span>
              <span class="equipment-card__detail-value">${H}</span>
            </div>
          `).join("")}</div>`:"",D=_?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${_}</span>
      </div>`:"",B=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${w}</h3>
    </div>
  `}
      ${T}
    </div>
  `,F=[],L=Nl(e),Q=L?.availableBarcodes?.length?L.availableBarcodes.join(","):L?.barcode?L.barcode:"";let J="",R="";if(L.active){const V=`equipment-select-qty-${t}`,H=!!L.canSelect,te=H?Math.max(1,Number(L.maxQuantity||L.availableBarcodes?.length||1)):1,ue=Math.max(1,Math.min(te,99)),se=[];for(let we=1;we<=ue;we+=1){const ke=v(String(we));se.push(`<option value="${we}"${we===1?" selected":""}>${ke}</option>`)}const xe=H?"":" disabled",_e=o("reservations.create.equipment.selector.quantityLabel","الكمية"),Y=H?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${v(String(te))}`:L.reason?L.reason:"";J=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${V}">${_e}</label>
        <select class="equipment-card__quantity-select" id="${V}" data-equipment-select-quantity${xe}>
          ${se.join("")}
        </select>
        ${Y?`<span class="equipment-card__selection-hint">${Oe(Y)}</span>`:""}
      </div>
    `;const ie=xa(),Se=ie?.mode||ie?.source||"",Je=Se==="package-manager"||Se==="equipment-packages"?o("equipment.packages.selection.addToPackage","➕ أضف إلى الحزمة"):o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),Qe=H?"":" disabled",Ie=L.reason?` title="${Oe(L.reason)}"`:"",ye=['data-equipment-action="select-reservation"',`data-selection-max="${H?te:0}"`];Q&&ye.push(`data-selection-barcodes="${Oe(Q)}"`),e.groupKey&&ye.push(`data-selection-group="${Oe(String(e.groupKey))}"`),R=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${ye.join(" ")}${Qe}${Ie}>${Je}</button>
    `}r&&F.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const W=F.length?F.join(`
`):"",M=Oe(w);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${Oe(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${M}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${O}
        ${x}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${B}
        </div>
      </div>
      <div class="equipment-card__body">
        ${C}
        ${D}
      </div>
      ${J||R||W?`<div class="equipment-card__actions equipment-card__actions--center">
            ${J}
            ${R}
            ${W}
          </div>`:""}
    </article>
  `}function Rl(e){const t=[...new Set(e.map(r=>r.category).filter(Boolean))],n=[...new Set(e.map(r=>r.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const r=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,a.appendChild(l)}),t.includes(r)&&(a.value=r),fa(a)}if(s){const r=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,s.appendChild(l)}),n.includes(r)&&(s.value=r),fa(s)}const i=document.getElementById("filter-status");i&&fa(i)}function Dn(){const e=fe();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return Vt=t||[],Vt;const s=new Date;let i=!1;const r=new Set((a||[]).filter(l=>l?.status==="open").map(l=>v(String(l?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(l=>{if(!l)return l;const d=Ze(l.status),u=v(String(l.barcode??"")).trim().toLowerCase(),b=u&&r.has(u);let f=b?"maintenance":"available";if(!b&&u)for(const m of n||[]){if(!Ml(m,s))continue;if(m.items?.some(g=>v(String(g?.barcode??"")).trim().toLowerCase()===u)){f="reserved";break}}return f!==d?(i=!0,{...l,status:f}):{...l,status:f}});return i?yn(c):(Vt=c,Ha({equipment:Vt})),Vt}function Ml(e,t){if(!e?.start||!e?.end)return!1;const n=String(e?.status||e?.reservationStatus||"").toLowerCase();if(n==="cancelled"||n==="canceled")return!1;const a=new Date(e.start),s=new Date(e.end);return Number.isNaN(a.getTime())||Number.isNaN(s.getTime())?!1:a<=t&&t<s}function bs(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function et(){const e=document.getElementById("equipment-list");if(!e)return;Nr();const t=Dn(),n=Array.isArray(t)?t:pt(),a=new Map;n.forEach(g=>{if(!g)return;const q=Qt(g);q&&(a.has(q)||a.set(q,[]),a.get(q).push(g))});const s=Array.from(a.values()).map(g=>{const q=g[0],I=g.reduce((_,j)=>_+(Number.isFinite(Number(j.qty))?Number(j.qty):0),0),S=["maintenance","reserved","available","retired"],N=g.map(_=>Ze(_.status)).sort((_,j)=>S.indexOf(_)-S.indexOf(j))[0]||"available",x=g.reduce((_,j)=>{const T=na(j?.qty??0)||0,X=Ze(j?.status);return X==="reserved"?_.reserved+=T:X==="maintenance"&&(_.maintenance+=T),_},{reserved:0,maintenance:0}),O=Math.max(I-x.reserved-x.maintenance,0);return{item:{...q,qty:I,status:N,variants:g,groupKey:Qt(q),reservedQty:x.reserved,maintenanceQty:x.maintenance,availableQty:O},index:n.indexOf(q)}});s.sort((g,q)=>Cl(g.item,q.item));const i=document.getElementById("search-equipment")?.value||"",r=v(i).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",l=document.getElementById("filter-sub")?.value||"",d=document.getElementById("filter-status")?.value||"",u=d?Ze(d):"";if(_s&&!n.length){e.innerHTML=bs(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(_n&&!n.length){e.innerHTML=bs(_n,{tone:"error",icon:"⚠️"});return}const b=s.filter(({item:g})=>{const q=v(String(g.barcode??"")).toLowerCase().trim(),I=Array.isArray(g.variants)?g.variants.map(w=>v(String(w.barcode??"")).toLowerCase().trim()).filter(Boolean):[],S=!r||g.name&&g.name.toLowerCase().includes(r)||g.desc&&g.desc.toLowerCase().includes(r)||q&&q.includes(r)||I.some(w=>w.includes(r))||g.category&&g.category.toLowerCase().includes(r)||g.sub&&g.sub.toLowerCase().includes(r),N=!c||g.category===c,x=!l||g.sub===l,O=!u||Ze(g.status)===u;return S&&N&&x&&O}),f=r?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),m=b;e.innerHTML=m.length?m.map(Dl).join(""):bs(f);const p=document.getElementById("equipment-list-count");if(p){const g=o("equipment.list.countSuffix","عنصر"),q=v(String(m.length)),I=m.length?`${q} ${g}`:`0 ${g}`;p.textContent=I}Rl(n)}async function aa({showToastOnError:e=!0}={}){_s=!0,_n="",et();try{const t=await qt("/equipment/?all=1"),n=t?.data??t;let a=[];Array.isArray(n)?a=n:n&&typeof n=="object"&&(Array.isArray(n.items)?a=n.items:Array.isArray(n.results)?a=n.results:Array.isArray(n.data)?a=n.data:Array.isArray(n.records)&&(a=n.records));const s=a.map(Xa);yn(s)}catch(t){t&&typeof t=="object"&&Number(t.status)===401?_n="":(_n=Rn(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&A(_n,"error"))}finally{_s=!1,et()}}function Rn(e,t,n){if(e instanceof mr){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function zl(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=v(a).trim(),i=Ja(t.querySelector("#new-equipment-price")?.value||"0"),r=na(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",l=t.querySelector("#new-equipment-category")?.value?.trim()||"",d=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){A(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const b=li({category:l,subcategory:d,description:n,quantity:r,unit_price:i,barcode:s,status:u,image_url:c});try{const f=await qt("/equipment/",{method:"POST",body:b}),m=Xa(f?.data),p=[...pt(),m];yn(p),et(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),A(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(f){const m=Rn(f,"equipment.toast.addFailed","تعذر إضافة المعدة");A(m,"error")}}async function Tr(e){if(!gn()){ta();return}const t=pt(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await qt(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),yn(a),et(),A(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=Rn(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");A(s,"error")}}async function Ol(e,t){const n=pt(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const i=[...n];i[e]={...i[e],...t},yn(i),et();return}const s=li({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const i=await qt(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),r=Xa(i?.data),c=[...n];c[e]=r,yn(c),et(),A(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(i){const r=Rn(i,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw A(r,"error"),i}}function ua(){et()}function Br(e){const n=pt()[e];if(!n)return;mn=e;const a=Ya(n),s=a[0]||n,i=a.reduce((l,d)=>l+(Number.isFinite(Number(d.qty))?Number(d.qty):0),0),r=["maintenance","reserved","available","retired"],c=a.map(l=>Ze(l.status)).sort((l,d)=>r.indexOf(l)-r.indexOf(d))[0]||Ze(s.status);document.getElementById("edit-equipment-index").value=e,ci({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(i||s.qty||0),price:s.price!=null?String(s.price):"0",image:es(s)||"",barcode:s.barcode||"",status:s.status||c}),Pn(!1),fn=Ia(),Za(s),jr(s),on={groupKey:Qt(s),barcode:String(s.barcode||""),id:s.id||null},xl(document.getElementById("editEquipmentModal"))?.show()}function Hl(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),i=s?.querySelector("[data-equipment-select-quantity]");let r=Number.parseInt(i?.value||"1",10);(!Number.isFinite(r)||r<=0)&&(r=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&r>c&&(r=c);const d=(t.dataset.selectionBarcodes||"").split(",").map(m=>m.trim()).filter(m=>m.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",b=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";hl({barcodes:d,quantity:r,groupKey:b,description:u})||A(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||Tr(s).catch(i=>{console.error("❌ [equipment.js] deleteEquipment",i)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||Br(s)}}function Vl(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||Br(n)}}function Kl(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||Tr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function Fr(){if(!on||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=pt(),a=on.id?n.find(l=>String(l.id)===String(on.id)):null,s=on.groupKey,i=s?n.find(l=>Qt(l)===s):null,r=a||i;if(!r){ka();return}const c=n.findIndex(l=>l===r);if(c>=0){const l=document.getElementById("edit-equipment-index");l&&(l.value=String(c)),mn=c}if(jr(r),!Wa){const l=Ya(r),d=l[0]||r,u=l.reduce((m,p)=>m+(Number.isFinite(Number(p.qty))?Number(p.qty):0),0),b=["maintenance","reserved","available","retired"],f=l.map(m=>Ze(m.status)).sort((m,p)=>b.indexOf(m)-b.indexOf(p))[0]||Ze(d.status);ci({category:d.category||"",subcategory:d.sub||"",description:d.desc||d.description||"",quantity:String(u||d.qty||0),price:d.price!=null?String(d.price):"0",image:es(d)||"",barcode:d.barcode||"",status:d.status||f}),fn=Ia()}Za(primary)}function Ul(){document.getElementById("search-equipment")?.addEventListener("input",ua),document.getElementById("filter-category")?.addEventListener("change",ua),document.getElementById("filter-sub")?.addEventListener("change",ua),document.getElementById("filter-status")?.addEventListener("change",ua),document.getElementById("add-equipment-form")?.addEventListener("submit",zl);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),Lr().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",Hl),t.addEventListener("keydown",Vl),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",Kl),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);$l(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!Wa){fn=Ia(),Pn(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){A(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:na(document.getElementById("edit-equipment-quantity").value)||1,price:Ja(document.getElementById("edit-equipment-price").value)||0,barcode:v(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await Ol(t,n),fn=Ia(),Pn(!1),Fr()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{Ul(),et(),aa();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(fn&&ci(fn),mn!=null){const a=pt()[mn];if(a){const i=Ya(a)[0]||a;Za(i)}}Pn(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(et(),Pn(Wa),mn!=null){const t=pt()[mn];if(t){const a=Ya(t)[0]||t;Za(a)}}});document.addEventListener("equipment:refreshRequested",()=>{aa({showToastOnError:!1})});document.addEventListener(Hc.USER_UPDATED,()=>{et()});document.addEventListener("equipment:changed",()=>{Fr()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{on=null,ka(),mn=null,fn=null,Pn(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!Mi&&(document.addEventListener(Fn.change,()=>{Nr(),et()}),Mi=!0);const jp=Object.freeze(Object.defineProperty({__proto__:null,clearEquipment:Lr,refreshEquipmentFromApi:aa,renderEquipment:et,syncEquipmentStatuses:Dn,uploadEquipmentFromExcel:jl},Symbol.toStringTag,{value:"Module"})),Ql="__DEBUG_CREW__";function Gl(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(Ql);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function Oi(e,t){if(Gl())try{console.log(`🪵 [crew-debug:create] ${e}`,t)}catch{}}const Dr="projects:create:draft",Rr="projects.html#projects-section";let Is=null,Mr=[],ks=new Map,$s=new Map,$a=new Map,gs=!1,ba=null,Hi=!1,zr=[];function Wl(e){if(!e)return null;let t=zr.find(a=>a.id===e)||null;if(t)return t;const n=Js(e);return n?(t={id:e,name:Wc(n)||e,price:Gc(n),items:Ws(n),raw:n},t):null}function Ca(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Pa(e){return v(String(e||"")).trim().toLowerCase()}function Xl(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=v(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function Or(e){const t=v(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function Hr(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Vr(e){if(!e)return null;const t=v(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Kr(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=v(String(t))}}function bn(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function di(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function qn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function lt(){const{input:e,hidden:t}=qn();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function sn(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const i=document.querySelector(`label[for="${e.id}"]`);i&&n.add(i)}const s=i=>{t()&&A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(i=>{!i||i.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(r=>{i.addEventListener(r,s,{capture:!0})}),i.dataset.linkedGuardAttached="true")})}function Ur(e,t,{allowPartial:n=!1}={}){const a=it(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const i=[];return e.forEach((r,c)=>{c.includes(a)&&i.push(r)}),i.length===1?i[0]:null}function Cs(e,t={}){return Ur(ks,e,t)}function Ps(e,t={}){return Ur($s,e,t)}function dt(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function Qr(e){Mr=Array.isArray(e)?[...e]:[]}function ui(){return Mr}function pi(e){return e&&ui().find(t=>String(t.id)===String(e))||null}function Vi(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function Nn(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??un,a=v(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:un}function vt(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??un,a=v(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=un),t.dataset.companyShare=String(s),t.checked=!0}function Ns(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(gs){ve();return}gs=!0;const a=()=>{gs=!1,ve()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(un)),t.disabled){n.checked=!1,A(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),vt()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?vt():n.checked&&(n.checked=!1));a()}function Jl(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Ki(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function Ui(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function Tt({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=di();if(!n||!a||!s)return;const i=Gs()||[],r=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",r);const l=new Set;ks=new Map;const d=i.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:Ui(m)||c})).filter(m=>{if(!m.label)return!1;const p=it(m.label);return!p||l.has(p)?!1:(l.add(p),ks.set(p,m),!0)}).sort((m,p)=>m.label.localeCompare(p.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(m=>`<option value="${Ca(m.label)}"></option>`).join("");const u=t?"":n.value,b=e?String(e):a.value?String(a.value):"",f=b?i.find(m=>String(m.id)===b):null;if(f){const m=Ui(f)||c;a.value=String(f.id),n.value=m,n.dataset.selectedId=String(f.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function Ln({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:i}=qn();if(!a||!s||!i)return;const r=Array.isArray(t)?t:ui()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const l=[...r].filter(g=>g&&g.id!=null).sort((g,q)=>String(q.createdAt||q.start||"").localeCompare(String(g.createdAt||g.start||""))),d=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),b=new Set;$s=new Map;const f=l.map(g=>{const q=Vi(g)||u;return{id:String(g.id),label:q}}).filter(g=>{if(!g.label)return!1;const q=it(g.label);return!q||b.has(q)?!1:(b.add(q),$s.set(q,g),!0)});i.innerHTML=f.map(g=>`<option value="${Ca(g.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",p=m?l.find(g=>String(g.id)===m):null;if(p){const g=Vi(p)||u;s.value=String(p.id),a.value=g,a.dataset.selectedId=String(p.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function Na(e,t,n){const{date:a,time:s}=gr(n),i=document.getElementById(e),r=document.getElementById(t);if(i){if(a)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"Y-m-d";i._flatpickr.setDate(a,!1,c)}else i.value=a;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}if(r){if(s)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"H:i";r._flatpickr.setDate(s,!1,c)}else r.value=s;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}}function Gr(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||Ln({selectedValue:a});const i=(Gs()||[]).find(u=>String(u.id)===String(e.clientId)),r=i?.id!=null?String(i.id):"";Tt(r?{selectedValue:r}:{selectedValue:"",resetInput:!0});const c=Ki(e,"start"),l=Ki(e,"end");c&&Na("res-start","res-start-time",c),l&&Na("res-end","res-end-time",l);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),ve(),Gt()}function Wr({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:fe(),s=Array.isArray(a)?a:[];Qr(s);const i=t!=null?String(t):n.value?String(n.value):"";Ln({selectedValue:i,projectsList:s}),Gt(),ve()}function Gt(){const{input:e,hidden:t}=qn(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),i=document.getElementById("res-payment-progress-type"),r=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),l=document.getElementById("res-discount-type"),d=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),b=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(sn(n,lt),a&&sn(a,lt)),s&&sn(s,lt),i&&sn(i,lt),r&&sn(r,lt),c&&sn(c,lt),l&&sn(l,lt),b)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=d),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=d),s&&(s.value="unpaid",dt(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=d),i&&(i.value=i.value||"percent",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=d),r&&(r.value="",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=d),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=d),l&&(l.value="percent",l.disabled=!0,l.classList.add("reservation-input-disabled"),l.title=d);else{if(n){const f=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",f&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.disabled=!1,l.classList.remove("reservation-input-disabled"),l.title="")}Ns("tax"),ve()}function mi(){const{input:e,hidden:t}=qn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),i=s?Ps(s,{allowPartial:a}):null;if(i){t.value=String(i.id),e.value=i.label,e.dataset.selectedId=String(i.id);const r=pi(i.id);r?Gr(r,{skipProjectSelectUpdate:!0}):(Gt(),ve())}else t.value="",e.dataset.selectedId="",Gt(),ve()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Ps(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function fi(){const{input:e,hidden:t}=di();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),i=s?Cs(s,{allowPartial:a}):null;i?(t.value=String(i.id),e.value=i.label,e.dataset.selectedId=String(i.id)):(t.value="",e.dataset.selectedId=""),ve()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Cs(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Yl(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){Un({clearValue:!0});return}let n=null;try{const d=decodeURIComponent(t);n=JSON.parse(d)}catch(d){console.warn("⚠️ [reservations/createForm] Failed to decode project context",d)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),Un({clearValue:!1}),!n)return;n.fromProjectForm&&(ba={draftStorageKey:n.draftStorageKey||Dr,returnUrl:n.returnUrl||Rr});const i=document.getElementById("res-project");if(n.projectId){i&&(Ln({selectedValue:String(n.projectId)}),Gt());const d=pi(n.projectId);d?Gr(d,{forceNotes:!!n.forceNotes}):ve(),Un()}else{i&&Ln({selectedValue:""});const d=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");md(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),d)}n.start&&Na("res-start","res-start-time",n.start),n.end&&Na("res-end","res-end-time",n.end);const r=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(Gs()||[]).find(b=>String(b.id)===String(n.customerId));u?.id!=null&&(Tt({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),r&&(r.value=u.customerName||u.name||r.value))}else n.customerName&&r?(Tt({selectedValue:""}),r.value=n.customerName,r.dataset.selectedId="",c&&(c.value="")):Tt({selectedValue:""});const l=document.getElementById("res-notes");l&&n.description&&!l.value&&(l.value=n.description),ve()}function Sn(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Jn(e,n),end:Jn(t,a)}}function Xr(e){const t=Pa(e);if(t){const c=$a.get(t);if(c)return c}const{description:n,barcode:a}=Or(e);if(a){const c=Ga(a);if(c)return c}const s=it(n||e);if(!s)return null;let i=hr();if(!i?.length){const c=fe();i=Array.isArray(c?.equipment)?c.equipment:[],i.length&&Er(i)}const r=i.find(c=>it(c?.desc||c?.description||"")===s);return r||i.find(c=>it(c?.desc||c?.description||"").includes(s))||null}function Jr(e,t="equipment-description-options"){const n=Pa(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(l=>Pa(l.value)===n)||$a.has(n))return!0;const{description:s}=Or(e);if(!s)return!1;const i=it(s);return i?(hr()||[]).some(c=>it(c?.desc||c?.description||"")===i):!1}const Zl={available:0,reserved:1,maintenance:2,retired:3};function ed(e){return Zl[e]??5}function Qi(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function td(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${Qi(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${Qi(n)})`}function Wt(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=Dn(),a=fe(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],i=Array.isArray(s)?s:[];Er(i);const r=new Map;i.forEach(d=>{const u=Xl(d),b=Pa(u);if(!b||!u)return;const f=Ft(d),m=ed(f),p=r.get(b);if(!p){r.set(b,{normalized:b,value:u,bestItem:d,bestStatus:f,bestPriority:m,statuses:new Set([f])});return}p.statuses.add(f),m<p.bestPriority&&(p.bestItem=d,p.bestStatus=f,p.bestPriority=m,p.value=u)}),$a=new Map;const l=Array.from(r.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{$a.set(d.normalized,d.bestItem);const u=td(d),b=Ca(d.value);if(u===d.value)return`<option value="${b}"></option>`;const f=Ca(u);return`<option value="${b}" label="${f}"></option>`}).join("");e&&(e.innerHTML=l),t&&(t.innerHTML=l)}function Yr(e,t,n={}){const{silent:a=!1}=n,s=ce(e);if(!s)return{success:!1,message:null};const{start:i,end:r}=Sn();if(!i||!r){const p=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||A(p),{success:!1,message:p}}const c=It();if(yi(c).has(s)){const p=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||A(p),{success:!1,message:p}}const d=Xs(s,i,r);if(d.length){const p=d.map(q=>q.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${p}`);return a||A(g),{success:!1,message:g}}if(_t(s,i,r)){const p=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||A(p),{success:!1,message:p}}const u=Ga(s);if(!u){const p=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||A(p),{success:!1,message:p}}const b=Ft(u);if(b==="maintenance"||b==="retired"){const p=bn(b);return a||A(p),{success:!1,message:p}}const f=hn(u);if(!f){const p=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||A(p),{success:!1,message:p}}Va({id:f,equipmentId:f,barcode:s,desc:u.desc,qty:1,price:u.price,image:vn(u)}),t&&(t.value=""),Dt(),ve();const m=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||A(m),{success:!0,message:m,barcode:s}}function Ls(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Xr(t);if(!n){A(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=wl(n.barcode),s=Ft(a||n);if(s==="maintenance"||s==="retired"){A(bn(s));return}const i=ce(n.barcode);if(!i){A(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const r=hn(n);if(!r){A(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:r,equipmentId:r,barcode:i,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:vn(n)},{start:l,end:d}=Sn();if(!l||!d){A(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=It();if(yi(u).has(i)){A(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const f=Xs(i,l,d);if(f.length){const m=f.map(p=>p.name).join(", ");A(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`));return}if(_t(i,l,d)){A(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}Va(c),Dt(),ve(),A(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function nd(){Wt();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Ls(e))});const t=()=>{Jr(e.value,"equipment-description-options")&&Ls(e)};e.addEventListener("focus",()=>{if(Wt(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Gi(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function yi(e=It()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=ce(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const i=ce(s?.normalizedBarcode??s?.barcode);i&&t.add(i)})}),t}function ad(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=Sn();if(!t||!n){A(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}bl({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):A(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(Fn.change,t=>{Gi(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),Gi(e,Cr()))}function sd(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,i=a.length?a:t.barcode?[t.barcode]:[];if(!i.length)return;let r=0,c=null;const l=[],d=new Set;i.forEach(b=>{const f=ce(b);f&&!d.has(f)&&(d.add(f),l.push(f))});const u=Math.min(s,l.length);for(let b=0;b<u;b+=1){const f=l[b],m=Yr(f,null,{silent:!0});m.success&&(r+=1),m.message&&(c=m.message)}if(r>0){const f=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",v(String(r)));A(f)}else c&&A(c)}function Zr(){ad(),!(Hi||typeof document>"u")&&(document.addEventListener(Fn.requestAdd,sd),Hi=!0)}function sa(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),i=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:i}}function js(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=sa();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const i=document.getElementById("equipment-barcode"),r=document.getElementById("equipment-description"),c=t==="package";i&&(i.disabled=c),r&&(r.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),el(t),t==="package"&&ts()}function ts(){const{packageSelect:e,packageHint:t}=sa();if(!e)return;const n=yr();zr=n,Uc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,i=n.map(c=>{const l=Number.isFinite(Number(c.price))?Number(c.price):0,d=v(l.toFixed(2)),u=`${c.name} — ${d} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${i}`,e.selectedIndex=0;const r=n.length>0;e.disabled=!r,t&&(r?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),no()}function id(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:i,blockingPackages:r})=>{const c=i?.desc||v(String(i?.barcode??i?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(r)&&r.length){const l=r.map(d=>d.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${l})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function eo(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const i=Yn(e);if(!i)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const r=Wl(i);if(!r)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(m=>m?.type==="package"&&Yn(m.packageId)===i))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(Qc(i,n,a,s)){const m=r.name||i;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${m} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(r.items)&&r.items.length?r.items:Ws(r.raw??{}),l=yi(t),d=[],u=new Set;if(c.forEach(m=>{const p=ce(m?.normalizedBarcode??m?.barcode);if(p){if(u.has(p)){d.push({item:m,type:"internal"});return}u.add(p),l.has(p)&&d.push({item:m,type:"external"})}}),d.length){const m=d.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>v(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:d.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",m):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",m),duplicates:d}}const b=[];return c.forEach(m=>{const p=ce(m?.normalizedBarcode??m?.barcode);if(p&&_t(p,n,a,s)){const g=Xs(p,n,a,s);b.push({item:m,blockingPackages:g})}}),b.length?{success:!1,reason:"item_conflict",message:id(r,b),conflicts:b}:{success:!0,package:{id:`package::${i}`,packageId:i,type:"package",desc:r.name||`Package ${i}`,qty:1,price:Number.isFinite(Number(r.price))?Number(r.price):0,barcode:r.code||r.raw?.package_code||`pkg-${i}`,packageItems:c.map(m=>({equipmentId:m?.equipmentId??null,barcode:m?.barcode??m?.normalizedBarcode??"",normalizedBarcode:ce(m?.normalizedBarcode??m?.barcode),desc:m?.desc??"",qty:Number.isFinite(Number(m?.qty))?Number(m.qty):1,price:Number.isFinite(Number(m?.price))?Number(m.price):0})),image:c.find(m=>m?.image)?.image??null},packageInfo:r}}function to(e,{silent:t=!1}={}){const n=Yn(e);if(!n)return t||A(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=Sn(),i=It(),r=eo(n,{existingItems:i,start:a,end:s});if(!r.success){if(!t){const l={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[r.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");A(r.message||l)}return r}return Va(r.package),Dt(),ve(),t||A(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:r.package}}function no(){const{packageSelect:e}=sa();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;to(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function rd(){const{packageAddButton:e,packageSelect:t}=sa();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){A(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}to(n)}),e.dataset.listenerAttached="true")}function ao(){const{modeRadios:e}=sa();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&js(s.target.value)}),a.dataset.listenerAttached="true")}),rd(),no();const t=Sa(),n=e.find(a=>a.value===t);n&&(n.checked=!0),js(t)}function Dt(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=It(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),i=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),l=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=Tn(n);t.innerHTML=d.map(u=>{const b=u.items[0]||{},f=vn(b)||u.image,m=f?`<img src="${f}" alt="${i}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',p=v(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,q=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,I=`${v(g.toFixed(2))} ${s}`,S=`${v(q.toFixed(2))} ${s}`,N=u.items.some(_=>_?.type==="package"),x=u.barcodes.map(_=>v(String(_||""))).filter(Boolean),O=x.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${x.map(_=>`<li>${_}</li>`).join("")}
            </ul>
          </details>`:"";let w="";if(N){const _=new Map;if(u.items.forEach(j=>{Array.isArray(j?.packageItems)&&j.packageItems.forEach(T=>{if(!T)return;const X=ce(T.barcode||T.desc||Math.random()),C=_.get(X);if(C){C.qty+=Number.isFinite(Number(T.qty))?Number(T.qty):1;return}_.set(X,{desc:T.desc||T.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(T.qty))?Number(T.qty):1,barcode:T.barcode??T.normalizedBarcode??""})})}),_.size){const j=Array.from(_.values()).map(T=>{const X=v(String(T.qty)),C=T.desc||v(String(T.barcode||"")),D=T.barcode?` <span class="reservation-package-items__barcode">(${v(String(T.barcode))})</span>`:"";return`<li>${C}${D} × ${X}</li>`}).join("");w=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${j}
              </ul>
            </details>
          `}}return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${m}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${N?`${w||""}${O||""}`:O}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${c}" ${N?"disabled":""}>−</button>
              <span class="reservation-qty-value">${p}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${r}" ${N?"disabled":""}>+</button>
            </div>
          </td>
          <td>${I}</td>
          <td>${S}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${l}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function od(e){const t=It(),a=Tn(t).find(i=>i.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Jc(s),Dt(),ve())}function cd(e){const t=It(),n=t.filter(a=>Ka(a)!==e);n.length!==t.length&&(vr(n),Dt(),ve())}function ld(e){const t=It(),a=Tn(t).find(b=>b.key===e);if(!a)return;const{start:s,end:i}=Sn();if(!s||!i){A(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const r=new Set(t.map(b=>ce(b.barcode))),{equipment:c=[]}=fe(),l=(c||[]).find(b=>{const f=ce(b?.barcode);return!f||r.has(f)||Ka({desc:b?.desc||b?.description||b?.name||"",price:Number(b?.price)||0})!==e||!Pr(b)?!1:!_t(f,s,i)});if(!l){A(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=ce(l.barcode),u=hn(l);if(!u){A(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}Va({id:u,equipmentId:u,barcode:d,desc:l.desc||l.description||l.name||a.description||"",qty:1,price:Number.isFinite(Number(l.price))?Number(l.price):a.unitPrice,image:vn(l)}),Dt(),ve()}function ve(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(v(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,i=document.getElementById("res-tax"),r=e?!1:i?.checked||!1,c=document.getElementById("res-payment-status"),l=c?.value||"unpaid",{start:d,end:u}=Sn();r&&vt();const b=Nn(),f=document.getElementById("res-payment-progress-type"),m=document.getElementById("res-payment-progress-value"),p=Hr(f),g=Vr(m);br(),Di({selectedItems:It(),discount:n,discountType:s,applyTax:r,paidStatus:l,paymentProgressType:p,paymentProgressValue:g,start:d,end:u,companySharePercent:b,paymentHistory:[]});const q=Di.lastResult;q?(Kr(m,q.paymentProgressValue),c&&(c.value=q.paymentStatus,dt(c,q.paymentStatus))):dt(c,l)}function dd(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=v(c.target.value),ve()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",ve),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(lt()){n.checked=!1,A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ns("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(lt()){a.checked=!1,A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ns("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(lt()){s.value="unpaid",dt(s,"unpaid"),A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}dt(s),ve()}),s.dataset.listenerAttached="true");const i=document.getElementById("res-payment-progress-type");i&&!i.dataset.listenerAttached?(i.dataset.userSelected!=="true"&&(i.value="percent"),i.addEventListener("change",c=>{if(lt()){i.value="percent",A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}i.dataset.userSelected="true",ve()}),i.dataset.listenerAttached="true"):i&&i.dataset.userSelected!=="true"&&!i.value&&(i.value="percent");const r=document.getElementById("res-payment-progress-value");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",c=>{if(lt()){r.value="",A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=v(c.target.value),ve()}),r.dataset.listenerAttached="true"),ve()}function ud(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){ve();return}const i=t.dataset.syncedWithStart;(!t.value?.trim()||i!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),ve()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Wi(){const{input:e,hidden:t}=di(),{input:n,hidden:a}=qn(),{customers:s}=fe();let i=t?.value?String(t.value):"";if(!i&&e?.value){const Y=Cs(e.value,{allowPartial:!0});Y&&(i=String(Y.id),t&&(t.value=i),e.value=Y.label,e.dataset.selectedId=i)}const r=s.find(Y=>String(Y.id)===i);if(!r){A(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=r.id;let l=a?.value?String(a.value):"";if(!l&&n?.value){const Y=Ps(n.value,{allowPartial:!0});Y&&(l=String(Y.id),a&&(a.value=l),n.value=Y.label,n.dataset.selectedId=l)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,b=document.getElementById("res-start-time")?.value||"00:00",f=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){A(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${d}T${b}`,p=`${u}T${f}`,g=new Date(m),q=new Date(p);if(Number.isNaN(g.getTime())||Number.isNaN(q.getTime())||g>=q){A(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const I=br();I.map(Y=>Y.technicianId).filter(Boolean);const S=It();if(S.length===0&&I.length===0){A(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const N=document.getElementById("res-notes")?.value||"",x=parseFloat(v(document.getElementById("res-discount")?.value))||0,O=document.getElementById("res-discount-type")?.value||"percent",w=document.getElementById("res-payment-status"),_=w?.value||"unpaid",j=document.getElementById("res-payment-progress-type"),T=document.getElementById("res-payment-progress-value"),X=Hr(j),C=Vr(T),D=l?pi(l):null,G=Jl(D);if(l&&!D){A(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const Y of S){const ie=Ft(Y.barcode);if(ie==="maintenance"||ie==="retired"){A(bn(ie));return}}for(const Y of S){const ie=ce(Y.barcode);if(_t(ie,m,p)){A(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const Y of I)if(Y?.technicianId&&qr(Y.technicianId,m,p)){A(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const B=document.getElementById("res-tax"),F=document.getElementById("res-company-share"),L=!!l;L?(B&&(B.checked=!1,B.disabled=!0,B.classList.add("disabled"),B.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),F&&(F.checked=!1,F.disabled=!0,F.classList.add("disabled"),F.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),w&&(w.value="unpaid",w.disabled=!0,dt(w,"unpaid"),w.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),j&&(j.disabled=!0,j.classList.add("disabled")),T&&(T.value="",T.disabled=!0,T.classList.add("disabled"))):(B&&(B.disabled=!1,B.classList.remove("disabled"),B.title=""),F&&(F.disabled=!1,F.classList.remove("disabled"),F.title=""),w&&(w.disabled=!1,w.title=""),j&&(j.disabled=!1,j.classList.remove("disabled")),T&&(T.disabled=!1,T.classList.remove("disabled")));const Q=L?!1:B?.checked||!1,J=!!F?.checked;if(!L&&J!==Q){A(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let R=J?Nn():null;J&&(!Number.isFinite(R)||R<=0)&&(vt(),R=Nn());const W=J&&Q&&Number.isFinite(R)&&R>0;Q&&vt();const M=Ys(S,x,O,Q,I,{start:m,end:p,companySharePercent:W?R:0}),V=Vc(),H=Zs({totalAmount:M,progressType:X,progressValue:C,history:[]});T&&Kr(T,H.paymentProgressValue);const te=[];H.paymentProgressValue!=null&&H.paymentProgressValue>0&&te.push({type:H.paymentProgressType||X,value:H.paymentProgressValue,amount:H.paidAmount,percentage:H.paidPercent,recordedAt:new Date().toISOString()});const ue=ei({manualStatus:_,paidAmount:H.paidAmount,paidPercent:H.paidPercent,totalAmount:M});w&&(w.value=ue,dt(w,ue));const se=typeof D?.paymentStatus=="string"?D.paymentStatus.toLowerCase():null,xe=se&&["paid","partial","unpaid"].includes(se)?se:"unpaid",_e=Sr({reservationCode:V,customerId:c,start:m,end:p,status:G?"confirmed":"pending",title:null,location:null,notes:N,projectId:l||null,totalAmount:M,discount:L?0:x,discountType:L?"percent":O,applyTax:Q,paidStatus:L?xe:ue,confirmed:G,items:S.map(Y=>({...Y,equipmentId:Y.equipmentId??Y.id})),crewAssignments:I,companySharePercent:L||!W?null:R,companyShareEnabled:L?!1:W,paidAmount:L?0:H.paidAmount,paidPercentage:L?0:H.paidPercent,paymentProgressType:L?null:H.paymentProgressType,paymentProgressValue:L?null:H.paymentProgressValue,paymentHistory:L?[]:te});try{Oi("about to submit",{crewAssignments:I,techniciansPayload:_e?.technicians,payload:_e});const Y=await Yc(_e);Oi("server response",{reservation:Y?.id??Y?.reservationId??Y?.reservation_code,technicians:Y?.technicians,crewAssignments:Y?.crewAssignments,techniciansDetails:Y?.techniciansDetails}),Dn(),Wt(),pn(),fd(),A(o("reservations.toast.created","✅ تم إنشاء الحجز"));try{const ie=document.getElementById("sub-tab-trigger-my-reservations-tab");ie&&typeof ie.click=="function"&&setTimeout(()=>ie.click(),0)}catch{}typeof Is=="function"&&Is({type:"created",reservation:Y}),pd(Y)}catch(Y){console.error("❌ [reservations/createForm] Failed to create reservation",Y);const ie=Ua(Y)?Y.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");A(ie,"error"),L&&(A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),Un({clearValue:!1}))}}function pd(e){if(!ba)return;const{draftStorageKey:t=Dr,returnUrl:n=Rr}=ba,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),i=s?JSON.parse(s)||{}:{},r=Array.isArray(i.linkedReservationIds)?i.linkedReservationIds:[],c=String(a);r.includes(c)||r.push(c),i.linkedReservationIds=r,window.sessionStorage.setItem(t,JSON.stringify(i))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}ba=null,n&&(window.location.href=n)}function Un({clearValue:e=!1}={}){const{input:t,hidden:n}=qn();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,Gt())}function md(e,t=""){const{input:n,hidden:a}=qn();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),Gt())}function fd(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),Tt({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),Un({clearValue:!1}),Ln({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const i=document.getElementById("res-payment-status");i&&(i.value="unpaid",dt(i,"unpaid"));const r=document.getElementById("res-payment-progress-type");r&&(r.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),Zc(),vr([]),Aa("form-reset"),Dt(),Gt(),ve()}function yd(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){od(s);return}if(a==="increase-group"&&s){ld(s);return}if(a==="remove-group"&&s){cd(s);return}}),e.dataset.listenerAttached="true")}function bd(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(Sa()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,Yr(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||Sa()!=="single")return;const{start:i,end:r}=Sn();!i||!r||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function gd(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Wi()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Wi()}),t.dataset.listenerAttached="true")}function Tp({onAfterSubmit:e}={}){Is=typeof e=="function"?e:null;const{customers:t,projects:n}=fe();Xc(t||[]),Tt(),fi(),Qr(n||[]),Wr({projectsList:n}),mi(),Wt(),ts(),nd(),Zr(),ao(),ud(),dd(),yd(),bd(),gd(),Yl(),ve(),Dt()}function so(){Wt(),ts(),Wr(),Tt(),fi(),mi(),Zr(),ao(),Dt(),ve()}if(typeof document<"u"){const e=()=>{Tt(),Ln({projectsList:ui()}),fi(),mi(),ve()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{Wt()}),document.addEventListener("packages:changed",()=>{ts(),Sa()==="package"&&js("package")})}typeof window<"u"&&(window.getCompanySharePercent=Nn);function io(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:rn(t),endDate:rn(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const i=new Date(n);return i.setDate(n.getDate()+6),{startDate:rn(n),endDate:rn(i)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:rn(n),endDate:rn(a)}}return e==="upcoming"?{startDate:rn(t),endDate:""}:{startDate:"",endDate:""}}function hd(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let i=v(t?.value||"").trim(),r=v(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),La(t),La(n),i="",r=""),!i&&!r&&c){const d=io(c);i=d.startDate,r=d.endDate}return{searchTerm:it(e?.value||""),startDate:i,endDate:r,status:s?.value||"",quickRange:c}}function Bp(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=v(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),s.dataset.listenerAttached="true");const i=document.getElementById("reservation-date-range");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>{vd(i.value),t()}),i.dataset.listenerAttached="true");const r=document.getElementById("reservation-status-filter");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",t),r.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),La(a),La(s),i&&(i.value=""),r&&(r.value=""),t()}),c.dataset.listenerAttached="true")}function vd(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=io(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function rn(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function La(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function pa(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function qd(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function Sd(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=qd(n);if(a!==null)return a}return null}function Xi(e,t=0){const n=Sd(e);if(n!=null)return n;const a=pa(e.createdAt??e.created_at);if(a!=null)return a;const s=pa(e.updatedAt??e.updated_at);if(s!=null)return s;const i=pa(e.start);if(i!=null)return i;const r=pa(e.end);if(r!=null)return r;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function Ed({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const i=e.map((S,N)=>({reservation:S,index:N})),r=t.searchTerm||"",c=t.searchReservationId||"",l=t.searchCustomerName||"",d=t.searchProjectId||"",u=t.startDate||"",b=t.endDate||"",f=t.status||"",m=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,p=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,q=b?new Date(`${b}T23:59:59`):null,I=i.filter(({reservation:S})=>{const N=n.get(String(S.customerId)),x=s?.get?.(String(S.projectId)),O=S.start?new Date(S.start):null,w=ti(S),{effectiveConfirmed:_}=Xt(S,x);if(m!=null&&String(S.customerId)!==String(m)||p!=null&&!(Array.isArray(S.technicians)?S.technicians.map(D=>String(D)):[]).includes(String(p))||f==="confirmed"&&!_||f==="pending"&&_||f==="completed"&&!w)return!1;if(f==="cancelled"){const C=String(S?.status||S?.reservationStatus||"").toLowerCase();if(!["cancelled","canceled"].includes(C))return!1}if(g&&O&&O<g||q&&O&&O>q)return!1;if(c){const C=[S.reservationId,S.id,S.reservation_id,S.reservationCode,S.reservation_code,S.code,S.reference,S.referenceNumber,S.reference_number],D=it(C.filter(B=>B!=null&&B!=="").map(String).join(" ")).replace(/\s+/g,""),G=c.replace(/\s+/g,"");if(!D.includes(G))return!1}if(l&&!it(N?.customerName||"").includes(l))return!1;if(d){const C=[S.projectId,S.project_id,S.projectID,x?.id,x?.projectCode,x?.project_code],D=it(C.filter(B=>B!=null&&B!=="").map(String).join(" ")).replace(/\s+/g,""),G=d.replace(/\s+/g,"");if(!D.includes(G))return!1}if(!r)return!0;const j=S.items?.map?.(C=>`${C.barcode} ${C.desc}`).join(" ")||"",T=(S.technicians||[]).map(C=>a.get(String(C))?.name).filter(Boolean).join(" ");return it([S.reservationId,N?.customerName,S.notes,j,T,x?.title].filter(Boolean).join(" ")).includes(r)});return I.sort((S,N)=>{const x=Xi(S.reservation,S.index),O=Xi(N.reservation,N.index);return x!==O?O-x:N.index-S.index}),I}function wd({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),i=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),r=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),l=o("reservations.list.itemsCountShort","{count} عنصر"),d=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),b=o("reservations.list.status.pending","⏳ غير مؤكد"),f=o("reservations.list.status.completed","📁 منتهي"),m=o("reservations.list.payment.paid","💳 مدفوع"),p=o("reservations.list.payment.unpaid","💳 غير مدفوع"),g=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),q=o("reservations.list.actions.confirm","✔️ تأكيد"),I=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),S=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),N={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 الإجمالي النهائي"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:x,index:O})=>{const w=t.get(String(x.customerId)),_=x.projectId?a?.get?.(String(x.projectId)):null,j=ti(x),T=typeof _?.paymentStatus=="string"?_.paymentStatus.toLowerCase():null,X=x.paidStatus??x.paid_status??(x.paid===!0||x.paid==="paid"?"paid":"unpaid"),C=T&&["paid","partial","unpaid"].includes(T)?T:X,D=C==="paid",G=C==="partial",{effectiveConfirmed:B,projectLinked:F}=Xt(x,_),L=B?"status-confirmed":"status-pending",Q=D?"status-paid":G?"status-partial":"status-unpaid";let J=`<span class="reservation-chip status-chip ${L}">${B?u:b}</span>`;const R=D?m:G?g:p;let W=`<span class="reservation-chip status-chip ${Q}">${R}</span>`,M=D?" tile-paid":G?" tile-partial":" tile-unpaid";j&&(M+=" tile-completed");let V="";j&&(J=`<span class="reservation-chip status-chip status-completed">${f}</span>`,W=`<span class="reservation-chip status-chip status-completed">${R}</span>`,V=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);let H=!F&&!B?`<button class="tile-confirm" data-reservation-index="${O}" data-action="confirm">${q}</button>`:"";{const K=String(x?.status||x?.reservationStatus||"").toLowerCase();(K==="cancelled"||K==="canceled")&&(J=`<span class="reservation-chip status-chip status-cancelled">${o("reservations.list.status.cancelled","❌ ملغي")}</span>`,M=" tile-cancelled",V="",typeof H<"u"&&(H=""))}const te=H?`<div class="tile-actions">${H}</div>`:"",ue=x.items?.length||0,se=Array.isArray(x.crewAssignments)?x.crewAssignments:[],xe=(x.technicians||[]).map(K=>n.get(String(K))).filter(Boolean),_e=se.length?se.map(K=>{const me=K.positionLabel??K.position_name??K.role??o("reservations.crew.positionFallback","منصب بدون اسم"),h=K.technicianName??n.get(String(K.technicianId??""))?.name??null;return h?`${v(me)} (${v(h)})`:v(me)}):xe.map(K=>K.name),Y=_e.length?_e.join(d):"—",ie=v(String(x.reservationId??"")),Se=x.start?v(ut(x.start)):"-",Pe=x.end?v(ut(x.end)):"-",Je=v(String(x.cost??0)),Qe=v(String(ue)),Ie=x.notes?v(x.notes):c,ye=l.replace("{count}",Qe),we=x.applyTax?`<small>${i}</small>`:"";let ke=I;return x.projectId&&(ke=_?.title?v(_.title):S),`
      <div class="${H?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${M}"${V} data-reservation-index="${O}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${ie}</div>
          <div class="tile-badges">
            ${J}
            ${W}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${N.client}</span>
            <span class="tile-value">${w?.customerName||r}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${N.project}</span>
            <span class="tile-value">${ke}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${N.start}</span>
            <span class="tile-value tile-inline">${Se}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${N.end}</span>
            <span class="tile-value tile-inline">${Pe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${N.cost}</span>
            <span class="tile-value">${Je} ${s} ${we}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${N.equipment}</span>
            <span class="tile-value">${ye}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${N.crew}</span>
            <span class="tile-value">${_e.length?Y:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${Ie}</span>
          </div>
        </div>
        ${te}
      </div>
    `}).join("")}function Ue(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function hs(e){if(e==null)return"";const t=String(e).trim();return t?v(t):""}function Ji(e,t,n=[],a,s=null){const{projectLinked:i,effectiveConfirmed:r}=Xt(e,s),c=e.paid===!0||e.paid==="paid",l=ti(e),d=e.items||[];let{groups:u}=ni(e);const b=y=>!!(y&&typeof y=="object"&&(y.type==="package"||Array.isArray(y.packageItems)&&y.packageItems.length||Array.isArray(y.items)&&y.items.some(U=>U&&U.type==="package"))),f=y=>{const U=(y?.package_code??y?.packageDisplayCode??y?.barcode??y?.description??(Array.isArray(y?.items)&&y.items[0]?.barcode)??"").toString().trim().toLowerCase();return v(U)},m=(y,U)=>{const re=Ne=>{const De=Array.isArray(Ne?.items)?Ne.items[0]:null,Te=[De?.price,De?.unit_price,De?.unitPrice,Ne?.unitPrice,Ne?.totalPrice];for(const zt of Te){const Ke=ze(zt);if(Number.isFinite(Ke)&&Ke>0)return Ke}return 0},ge=re(y),qe=re(U);return ge&&qe?ge<=qe?y:U:ge?y:U},p=[],g=new Map;u.forEach(y=>{if(!b(y)){p.push(y);return}const U=f(y);if(!U){if(!g.has("__unknown__"))g.set("__unknown__",p.length),p.push(y);else{const re=g.get("__unknown__");p[re]=m(p[re],y)}return}if(!g.has(U))g.set(U,p.length),p.push(y);else{const re=g.get(U);p[re]=m(p[re],y)}}),u=p;const{technicians:q=[]}=fe(),I=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(q)?q:[]),S=new Map;I.forEach(y=>{if(!y||y.id==null)return;const U=String(y.id),re=S.get(U)||{};S.set(U,{...re,...y})});const x=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(y=>({technicianId:y}))).map((y,U)=>{const re=y?.technicianId!=null?S.get(String(y.technicianId)):null;let ge=y.positionLabel??y.position_name??y.position_label??y.role??y.position??"";(!ge||ge.trim()==="")&&(ge=y.positionLabelAr??y.position_label_ar??y.positionLabelEn??y.position_label_en??y.position_name_ar??y.position_name_en??"");const qe=y.positionLabelAlt??y.position_label_alt??y.positionLabelEn??y.position_label_en??y.positionLabelAr??y.position_label_ar??"";let Ne=ge,De=qe;if(!Ne||Ne.trim()==="")try{const Ke=Ht?Ht():[];let oe=null;if(y.positionId!=null&&(oe=Ke.find(Be=>String(Be.id)===String(y.positionId))||null),!oe){const Be=y.positionKey??y.position_key??y.positionName??y.position_name??y.position??"";if(Be&&(oe=typeof Ea=="function"?Ea(Be):null,!oe&&Ke.length)){const yt=String(Be).trim().toLowerCase();oe=Ke.find(bt=>[bt.name,bt.labelAr,bt.labelEn].filter(Boolean).map(Ot=>String(Ot).toLowerCase()).includes(yt))||null}}oe&&(Ne=oe.labelAr||oe.labelEn||oe.name||"",(!De||String(De).trim()==="")&&(oe.labelAr&&oe.labelEn?De=Ne===oe.labelAr?oe.labelEn:oe.labelAr:De=oe.labelAr||oe.labelEn||""))}catch{}const Te=Ae(ze(y.positionCost??y.position_cost??y.cost??y.daily_wage??y.dailyWage??re?.dailyWage??re?.wage??0)),zt=Ae(ze(y.positionClientPrice??y.position_client_price??y.client_price??y.clientPrice??y.daily_total??y.dailyTotal??y.total??re?.dailyTotal??re?.total??re?.total_wage??0));return{assignmentId:y.assignmentId??y.assignment_id??`crew-${U}`,positionId:y.positionId??y.position_id??null,positionKey:y.positionKey??y.position_key??y.positionName??y.position_name??y.position??null,positionLabel:Ne,positionLabelAlt:De,positionLabelAr:y.positionLabelAr??y.position_label_ar??null,positionLabelEn:y.positionLabelEn??y.position_label_en??null,positionCost:Te,positionClientPrice:zt,technicianId:y.technicianId!=null?String(y.technicianId):re?.id!=null?String(re.id):null,technicianName:y.technicianName??y.technician_name??re?.name??null,technicianRole:y.technicianRole??re?.role??null,technicianPhone:y.technicianPhone??re?.phone??null,notes:y.notes??null}}),O=gn(),w=Qa(e.start,e.end),_=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,j=ze(_),T=Number.isFinite(j)?j:0,X=e.discountType??e.discount_type??e.discountMode??"percent",C=String(X).toLowerCase()==="amount"?"amount":"percent",D=i?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),G=ze(e.cost??e.total??e.finalTotal),B=Number.isFinite(G),F=B?Ae(G):0,L=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,Q=L!=null?ze(L):Number.NaN,W=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(Q)&&Q>0)&&Number.isFinite(Q)?Q:0,M=wr({items:d,technicianIds:e.technicians||[],crewAssignments:x,discount:T,discountType:C,applyTax:D,start:e.start,end:e.end,companySharePercent:W}),V=Ae(M.equipmentTotal),H=Ae(M.crewTotal);Ae(M.crewCostTotal);const te=Ae(M.discountAmount),ue=Ae(M.subtotalAfterDiscount),se=Number.isFinite(M.companySharePercent)?M.companySharePercent:0;let xe=Ae(M.companyShareAmount);xe=se>0?Ae(Math.max(0,xe)):0;const _e=Ae(M.taxAmount),Y=Ae(M.finalTotal),ie=i?Y:B?F:Y,Se=Ae(M.netProfit),Pe=v(String(e.reservationId??e.id??"")),Je=e.start?v(ut(e.start)):"-",Qe=e.end?v(ut(e.end)):"-",Ie=v(String(x.length)),ye=v(V.toFixed(2)),we=v(te.toFixed(2)),ke=v(ue.toFixed(2)),Ye=v(_e.toFixed(2)),K=v((Number.isFinite(ie)?ie:0).toFixed(2)),me=v(String(w)),h=o("reservations.create.summary.currency","SR"),z=o("reservations.details.labels.discount","الخصم"),k=o("reservations.details.labels.tax","الضريبة (15%)"),ee=o("reservations.details.labels.crewTotal","إجمالي الفريق"),ae=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),Ee=o("reservations.details.labels.duration","عدد الأيام"),Ge=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),at=o("reservations.details.labels.netProfit","💵 صافي الربح"),$e=o("reservations.create.equipment.imageAlt","صورة"),Ve={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},Rt=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),ot=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");o("reservations.details.technicians.roleUnknown","غير محدد");const tn=o("reservations.details.technicians.phoneUnknown","غير متوفر");o("reservations.details.technicians.wage","{amount} {currency} / اليوم");const Ce=o("reservations.list.status.confirmed","✅ مؤكد"),We=o("reservations.list.status.pending","⏳ غير مؤكد"),$t=o("reservations.list.payment.paid","💳 مدفوع"),ft=o("reservations.list.payment.unpaid","💳 غير مدفوع"),$=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),le=o("reservations.list.status.completed","📁 منتهي"),ne=o("reservations.details.labels.id","🆔 رقم الحجز"),be=o("reservations.details.section.bookingInfo","بيانات الحجز"),Re=o("reservations.details.section.paymentSummary","ملخص الدفع"),st=o("reservations.details.labels.finalTotal","المجموع النهائي"),Xe=o("reservations.details.section.crew","😎 الفريق الفني"),En=o("reservations.details.crew.count","{count} عضو"),oa=o("reservations.details.section.items","📦 المعدات المرتبطة"),ls=o("reservations.details.items.count","{count} عنصر"),wn=o("reservations.details.actions.edit","✏️ تعديل"),Me=o("reservations.details.actions.delete","🗑️ حذف"),tt=o("reservations.details.labels.customer","العميل"),nn=o("reservations.details.labels.contact","رقم التواصل"),Ct=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const ca=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),uc=o("reservations.details.actions.openProject","📁 فتح المشروع"),pc=o("reservations.details.labels.start","بداية الحجز"),mc=o("reservations.details.labels.end","نهاية الحجز"),fc=o("reservations.details.labels.notes","ملاحظات"),yc=o("reservations.list.noNotes","لا توجد ملاحظات"),bc=o("reservations.details.labels.itemsCount","عدد المعدات"),gc=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),hc=o("reservations.paymentHistory.title","سجل الدفعات"),vc=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),qc=o("reservations.list.unknownCustomer","غير معروف"),ds=typeof s?.paymentStatus=="string"?s.paymentStatus.toLowerCase():null,la=i&&ds&&["paid","partial","unpaid"].includes(ds)?ds:e.paidStatus??e.paid_status??(c?"paid":"unpaid"),us=la==="partial",Pi=la==="paid"?$t:us?$:ft;function ps(y){if(y==null)return Number.NaN;if(typeof y=="number")return Number.isFinite(y)?y:Number.NaN;const U=String(y).replace(/[^0-9.+-]/g,""),re=Number(U);return Number.isFinite(re)?re:Number.NaN}const da=(y={})=>{const U=String(y.type??y.kind??y.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(U)||Array.isArray(y.packageItems)&&y.packageItems.length)},Sc=(y={})=>[y.packageId,y.package_id,y.packageCode,y.package_code,y.bundleId,y.bundle_id].some(U=>U!=null&&U!==""),Ec=(y={})=>!y||typeof y!="object"?!1:!da(y)&&Sc(y),wc=(y={})=>{const U=da(y),re=[{value:y.qty,key:"qty",limit:999},{value:y.quantity,key:"quantity",limit:999},{value:y.units,key:"units",limit:999},{value:y.count,key:"count",limit:50},{value:y.package_quantity,key:"package_quantity",limit:999},{value:y.packageQty,key:"packageQty",limit:999},{value:y.packageCount,key:"packageCount",limit:999}];let ge=NaN;for(const qe of re){if(qe.value==null||qe.value==="")continue;const Ne=typeof qe.value=="string"?qe.value.trim():String(qe.value??"");if(qe.key==="count"&&Ne.length>6)continue;const De=ps(qe.value);if(!Number.isFinite(De)||De<=0)continue;const Te=Math.round(De);if(!(Te>qe.limit)){ge=Math.max(1,Te);break}}return(!Number.isFinite(ge)||ge<=0)&&(ge=1),U?Math.max(1,Math.min(99,ge)):Math.max(1,Math.min(9999,ge))};let An=(Array.isArray(d)?d:[]).filter(y=>y&&typeof y=="object"&&!Ec(y)).reduce((y,U)=>y+wc(U),0);(!Number.isFinite(An)||An<=0)&&(An=Array.isArray(u)&&u.length?u.length:(Array.isArray(d)?d.length:0)||1),An=Math.max(1,Math.round(An));const Ac=v(String(An)),Ni=ls.replace("{count}",Ac),xc=En.replace("{count}",Ie),_c=e.notes?v(e.notes):yc,Ic=v(H.toFixed(2)),kc=v(String(se)),$c=v(xe.toFixed(2)),Cc=`${kc}% (${$c} ${h})`,Pc=Number.isFinite(Se)?Math.max(0,Se):0,Nc=v(Pc.toFixed(2)),Mt=[{icon:"💼",label:gc,value:`${ye} ${h}`}];Mt.push({icon:"😎",label:ee,value:`${Ic} ${h}`}),te>0&&Mt.push({icon:"💸",label:z,value:`${we} ${h}`}),Mt.push({icon:"📊",label:ae,value:`${ke} ${h}`}),D&&_e>0&&Mt.push({icon:"🧾",label:k,value:`${Ye} ${h}`}),se>0&&Mt.push({icon:"🏦",label:Ge,value:Cc}),Mt.push({icon:"💵",label:at,value:`${Nc} ${h}`}),Mt.push({icon:"💰",label:st,value:`${K} ${h}`});const Lc=Mt.map(({icon:y,label:U,value:re})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${y} ${U}</span>
      <span class="summary-details-value">${re}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let ct=[];i&&s&&(Array.isArray(s.paymentHistory)?ct=s.paymentHistory:Array.isArray(s.payment_history)?ct=s.payment_history:Array.isArray(s.payments)?ct=s.payments:Array.isArray(s.paymentLogs)&&(ct=s.paymentLogs)),(!Array.isArray(ct)||ct.length===0)&&(Array.isArray(e.paymentHistory)?ct=e.paymentHistory:Array.isArray(e.payment_history)?ct=e.payment_history:Array.isArray(e.paymentLogs)?ct=e.paymentLogs:ct=[]);const Li=Array.isArray(ct)?ct:[],jc=Li.length?`<ul class="reservation-payment-history-list">${Li.map(y=>{const U=y?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):y?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),re=Number.isFinite(Number(y?.amount))&&Number(y.amount)>0?`${v(Number(y.amount).toFixed(2))} ${h}`:"—",ge=Number.isFinite(Number(y?.percentage))&&Number(y.percentage)>0?`${v(Number(y.percentage).toFixed(2))}%`:"—",qe=y?.recordedAt?v(ut(y.recordedAt)):"—",Ne=y?.note?`<div class="payment-history-note">${Ue(v(y.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${Ue(U)}</span>
              <span class="payment-history-entry__amount">${re}</span>
              <span class="payment-history-entry__percent">${ge}</span>
              <span class="payment-history-entry__date">${qe}</span>
            </div>
            ${Ne}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${Ue(vc)}</div>`,ji=String(e?.status||e?.reservationStatus||"").toLowerCase(),Ti=ji==="cancelled"||ji==="canceled",Bi=Ti?[{text:o("reservations.list.status.cancelled","❌ ملغي"),className:"status-cancelled"},{text:Pi,className:la==="paid"?"status-paid":us?"status-partial":"status-unpaid"}]:[{text:r?Ce:We,className:r?"status-confirmed":"status-pending"},{text:Pi,className:la==="paid"?"status-paid":us?"status-partial":"status-unpaid"}];l&&!Ti&&Bi.push({text:le,className:"status-completed"});const Tc=Bi.map(({text:y,className:U})=>`<span class="status-chip ${U}">${y}</span>`).join(""),an=(y,U,re)=>`
    <div class="res-info-row">
      <span class="label">${y} ${U}</span>
      <span class="value">${re}</span>
    </div>
  `;let ms="";if(e.projectId){let y=Ue(ca);if(s){const U=s.title||o("projects.fallback.untitled","مشروع بدون اسم");y=`${Ue(U)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${Ue(uc)}</button>`}ms=`
      <div class="res-info-row">
        <span class="label">📁 ${Ct}</span>
        <span class="value">${y}</span>
      </div>
    `}const Pt=[];Pt.push(an("👤",tt,t?.customerName||qc)),Pt.push(an("📞",nn,t?.phone||"—")),Pt.push(an("🗓️",pc,Je)),Pt.push(an("🗓️",mc,Qe)),Pt.push(an("📦",bc,Ni)),Pt.push(an("⏱️",Ee,me)),Pt.push(an("📝",fc,_c)),ms&&Pt.push(ms);const Bc=Pt.join(""),Fc=u.length?u.map(y=>{const U=y.items[0]||{},re=vn(U)||y.image,ge=re?`<img src="${re}" alt="${$e}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let qe=[];if(Array.isArray(y.packageItems)&&y.packageItems.length)qe=[...y.packageItems];else{const he=[];y.items.forEach(Le=>{Array.isArray(Le?.packageItems)&&Le.packageItems.length&&he.push(...Le.packageItems)}),qe=he}if(Array.isArray(qe)&&qe.length>1){const he=new Set;qe=qe.filter(Le=>{const de=Le?.normalizedBarcode&&String(Le.normalizedBarcode).toLowerCase()||Le?.barcode&&String(Le.barcode).toLowerCase()||(Le?.equipmentId!=null?`id:${Le.equipmentId}`:null);return de?he.has(de)?!1:(he.add(de),!0):!0})}const Ne=da(y)||y.items.some(he=>da(he))||qe.length>0,De=(he,{fallback:Le=1,max:de=1e3}={})=>{const je=ps(he);return Number.isFinite(je)&&je>0?Math.min(de,je):Le};let Te;if(Ne){const he=De(U?.qty??U?.quantity??U?.count,{fallback:NaN,max:999});Number.isFinite(he)&&he>0?Te=he:Te=De(y.quantity??y.count??1,{fallback:1,max:999})}else Te=De(y.quantity??y.count??U?.qty??U?.quantity??U?.count??0,{fallback:1,max:9999});const zt=v(String(Te)),Ke=(he,{preferPositive:Le=!1}={})=>{let de=Number.NaN;for(const je of he){const Et=ze(je);if(Number.isFinite(Et)){if(Le&&Et>0)return Et;Number.isFinite(de)||(de=Et)}}return de};let oe,Be;if(Ne){const he=[U?.price,U?.unit_price,U?.unitPrice,y.unitPrice];if(oe=Ke(he,{preferPositive:!0}),!Number.isFinite(oe)||oe<0){const de=ze(y.totalPrice??U?.total??U?.total_price);Number.isFinite(de)&&Te>0&&(oe=de/Te)}Number.isFinite(oe)||(oe=0);const Le=[U?.total,U?.total_price,y.totalPrice];if(Be=Ke(Le),!Number.isFinite(Be))Be=oe*Te;else{const de=oe*Te;Number.isFinite(de)&&de>0&&Math.abs(Be-de)>de*.25&&(Be=de)}}else{const he=[U?.price,U?.unit_price,U?.unitPrice,y.unitPrice];if(oe=Ke(he,{preferPositive:!0}),!Number.isFinite(oe)||oe<0){const Le=ze(y.totalPrice??U?.total??U?.total_price);Number.isFinite(Le)&&Te>0&&(oe=Le/Te)}Number.isFinite(oe)||(oe=0),Be=ze(y.totalPrice??U?.total??U?.total_price),Number.isFinite(Be)||(Be=oe*Te)}oe=Ae(oe),Be=Ae(Be);const yt=`${v(oe.toFixed(2))} ${h}`,bt=`${v(Be.toFixed(2))} ${h}`,Ot=y.barcodes.map(he=>v(String(he||""))).filter(Boolean),gt=Ot.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${Ot.map(he=>`<li>${he}</li>`).join("")}
              </ul>
            </details>`:"";let St="";if(qe.length){const he=new Map,Le=de=>{const je=ps(de?.qtyPerPackage??de?.perPackageQty??de?.quantityPerPackage);return Number.isFinite(je)&&je>0&&je<=99?Math.round(je):1};if(qe.forEach(de=>{if(!de)return;const je=ce(de.barcode||de.normalizedBarcode||de.desc||Math.random());if(!je)return;const Et=he.get(je),xn=Le(de);if(Et){Et.qty=xn,Et.total=xn;return}he.set(je,{desc:de.desc||de.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(xn,99)),total:Math.max(1,Math.min(xn,99)),barcode:de.barcode??de.normalizedBarcode??""})}),he.size){const de=Array.from(he.values()).map(je=>{const Et=v(String(je.qty>0?Math.min(je.qty,99):1)),xn=Ue(je.desc||""),Oc=je.barcode?` <span class="reservation-package-items__barcode">(${Ue(v(String(je.barcode)))})</span>`:"";return`<li>${xn}${Oc} × ${Et}</li>`}).join("");St=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${de}
                </ul>
              </details>
            `}}const zc=Ne?`${St||""}${gt||""}`:gt;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${ge}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${Ue(U.desc||U.description||U.name||y.description||"-")}</div>
                  ${zc}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Ue(Ve.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${zt}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Ue(Ve.unitPrice)}">${yt}</td>
            <td class="reservation-modal-items-table__cell" data-label="${Ue(Ve.total)}">${bt}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${Ue(Ve.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${Rt}</td></tr>`,Dc=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${Ve.item}</th>
            <th>${Ve.quantity}</th>
            <th>${Ve.unitPrice}</th>
            <th>${Ve.total}</th>
            <th>${Ve.actions}</th>
          </tr>
        </thead>
        <tbody>${Fc}</tbody>
      </table>
    </div>
  `,Fi=x.map((y,U)=>{const re=v(String(U+1));let ge=y.positionLabel??y.position_name??y.position_label??y.position_title??y.role??y.position??null;if((!ge||ge.trim()==="")&&(ge=y.positionLabelAr??y.position_label_ar??y.position_title_ar??y.positionLabelEn??y.position_label_en??y.position_name_ar??y.position_title_en??y.position_name_en??null),!ge||ge.trim()==="")try{const yt=typeof Ht=="function"?Ht():[],bt=y.positionId?yt.find(St=>String(St.id)===String(y.positionId)):null,Ot=!bt&&y.positionKey?yt.find(St=>String(St.name).toLowerCase()===String(y.positionKey).toLowerCase()):null,gt=bt||Ot||null;gt&&(ge=gt.labelAr||gt.labelEn||gt.name||ge)}catch{}const qe=hs(ge)||o("reservations.crew.positionFallback","منصب بدون اسم"),Ne=hs(y.positionLabelAlt??y.position_label_alt??y.positionLabelEn??y.position_label_en??y.positionLabelAr??y.position_label_ar??y.position_name_en??y.position_name_ar??""),De=hs(y.technicianName)||o("technicians.picker.noTechnicianOption","— بدون تعيين —"),Te=y.technicianPhone||tn,zt=Ae(ze(y.positionCost??y.position_cost??y.cost??y.daily_wage??y.dailyWage??y.internal_cost??0));let Ke=Ae(ze(y.positionClientPrice??y.position_client_price??y.client_price??y.customer_price??y.position_price??y.clientPrice??y.daily_total??y.dailyTotal??y.total??0));if(!Number.isFinite(Ke)||Ke<=0)try{const yt=Ht?Ht():[],bt=y.positionId?yt.find(St=>String(St.id)===String(y.positionId)):null,Ot=!bt&&y.positionKey?yt.find(St=>String(St.name).toLowerCase()===String(y.positionKey).toLowerCase()):null,gt=bt||Ot||null;gt&&Number.isFinite(Number(gt.clientPrice))&&(Ke=Ae(Number(gt.clientPrice)))}catch{}const oe=`${v(Ke.toFixed(2))} ${h}`,Be=zt>0?`${v(zt.toFixed(2))} ${h}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${re}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${De}</span>
            <small class="text-muted">🏷️ ${qe}${Ne?` — ${Ne}`:""}</small>
            <small class="text-muted">💼 ${oe}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${Te}</div>
          ${Be?`<div>💵 ${o("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${Be}</div>`:""}
        </div>
      </div>
    `}).join(""),Rc=Array.isArray(x)&&x.length>4,Mc=x.length?Rc?`
          <div class="reservation-technicians-slider" data-tech-slider>
            <button type="button" class="slider-btn slider-btn--prev" data-slider-prev aria-label="${Ue(o("reservations.details.slider.prev","السابق"))}" title="${Ue(o("reservations.details.slider.prev","السابق"))}">‹</button>
            <div class="reservation-technicians-track" data-slider-track>
              ${Fi}
            </div>
            <button type="button" class="slider-btn slider-btn--next" data-slider-next aria-label="${Ue(o("reservations.details.slider.next","التالي"))}" title="${Ue(o("reservations.details.slider.next","التالي"))}">›</button>
          </div>
        `:`<div class="reservation-technicians-grid">${Fi}</div>`:`<ul class="reservation-modal-technicians"><li>${ot}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${ne}</span>
          <strong>${Pe}</strong>
        </div>
        <div class="status-chips">
          ${Tc}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${be}</h6>
          ${Bc}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${Re}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${Lc}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${hc}</h6>
              ${jc}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Xe}</span>
          <span class="count">${xc}</span>
        </div>
        ${Mc}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${oa}</span>
          <span class="count">${Ni}</span>
        </div>
        ${Dc}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${wn}</button>
        ${O?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Me}</button>`:""}
      </div>
    </div>
  `}const Fp="project",Dp="editProject",Rp=3600*1e3,ro=.15,Mp=6,zp="projectsTab",Op="projectsSubTab",Hp={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},Vp={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed",cancelled:"Cancelled",conflict:"Conflict"},Ad=`@page {
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

/* Subtotal row/box under each table */
.quote-table-subtotal {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 6px;
  font-size: 12px;
}
.quote-table-subtotal__label {
  font-weight: 700;
}
.quote-table-subtotal__value {
  font-weight: 700;
}

.quote-table .quote-item-code {
  display: inline-block;
  padding: 2px 4px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.08);
  margin-bottom: 2px;
}

.quote-table .quote-package-items {
  margin: 6px 0 0;
  padding-left: 16px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.75);
}

.quote-table .quote-package-items li {
  list-style: disc;
  margin-bottom: 2px;
}

.quote-table .quote-package-barcode {
  color: rgba(0, 0, 0, 0.6);
  font-size: 11px;
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
`,xd=/color\([^)]*\)/gi,_d=/color-mix\([^)]*\)/gi,Id=/oklab\([^)]*\)/gi,kd=/oklch\([^)]*\)/gi,Ut=/(color\(|color-mix\(|oklab|oklch)/i,$d=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke","boxShadow","textShadow","accentColor","caretColor","columnRuleColor"],Cd=typeof document<"u"?document.createElement("canvas"):null,ma=Cd?.getContext?.("2d")||null;function oo(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function Ts(e,t="#000"){if(!ma||!e)return t;try{return ma.fillStyle="#000",ma.fillStyle=e,ma.fillStyle||t}catch{return t}}function Pd(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&Ut.test(n)){const s=Ts(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function In(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function co(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const i=t.getComputedStyle(s);if(!i)return;$d.forEach(c=>{const l=i[c];if(l&&Ut.test(l)){const d=oo(c);if(In(n,s,d),c==="boxShadow"||c==="textShadow")s.style.setProperty(d,"none","important");else{const u=c==="backgroundColor"?"#ffffff":i.color||"#000000",b=Ts(l,u);s.style.setProperty(d,b,"important")}}});const r=i.backgroundImage;if(r&&Ut.test(r)){const c=Ts(i.backgroundColor||"#ffffff","#ffffff");In(n,s,"background-image"),In(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function lo(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const i=t.getComputedStyle(s);if(!i)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","boxShadow","textShadow","accentColor","caretColor","columnRuleColor"].forEach(c=>{const l=i[c];if(l&&Ut.test(l)){const d=oo(c);if(In(n,s,d),c==="boxShadow"||c==="textShadow")s.style.setProperty(d,"none","important");else{const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(d,u,"important")}}});const r=i.backgroundImage;r&&Ut.test(r)&&(In(n,s,"background-image"),In(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function uo(e){if(!e)return;const t=(n="")=>{if(typeof n!="string")return n;let a=n;return Ut.test(a)&&(a=a.replace(xd,"#000").replace(_d,"#000").replace(Id,"#000").replace(kd,"#000")),a};e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&Ut.test(a)&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&Ut.test(a)&&n.setAttribute("style",t(a))})}const po="reservations.quote.sequence",Yi={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},mo="https://help.artratio.sa/guide/quote-preview",He={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Nd=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],rt=[...Nd],Ld=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function Bs(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...rt]}function jd(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=Bs(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=Bs(t.value);if(a.length)return a}const n=rt.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...rt]}const Td=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],bi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(v(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>{if(e?.isPackage){const t=e?.packageCodeResolved||e?.barcode||"";return E(t||"-")}return E(e?.barcode||"-")}},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>E(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>E(v(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>E(v(Number(e?.price||0).toFixed(2)))}],gi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(v(String(t+1)))},{id:"position",labelKey:"reservations.details.crew.position",fallback:"المنصب",render:e=>E(v(e?.positionLabel??e?.position_name??e?.role??o("reservations.crew.positionFallback","منصب بدون اسم")))},{id:"price",labelKey:"reservations.details.crew.clientPrice",fallback:"سعر العميل",render:e=>{const t=Number.isFinite(Number(e?.positionClientPrice))?Number(e.positionClientPrice):0;return E(`${v(t.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}}],Fs={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:bi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:[...gi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),{id:"groupByPosition",labelKey:null,fallback:"تجميع حسب المنصب",default:!1}]},Bd=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(v(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>E(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>E(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>E(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],fo=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(v(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>E(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>E(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>E(e?.note||"-")}],Fd=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(v(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>E(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>E(v(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>E(v(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>E(e?.displayCost||"—")}],Dd=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"الخدمات الإنتاجية",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],Rd={customerInfo:Fs.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:Fs.payment,projectExpenses:fo.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:[...Bd.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),{id:"groupByPosition",labelKey:null,fallback:"تجميع حسب المنصب",default:!1}],projectEquipment:Fd.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},vs=new Map;function ns(e="reservation"){if(vs.has(e))return vs.get(e);const t=e==="project"?Dd:Td,n=e==="project"?Rd:Fs,a=new Set(t.map(({id:r})=>r)),s=Object.fromEntries(Object.entries(n).map(([r,c=[]])=>[r,new Set(c.map(l=>l.id))])),i={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return vs.set(e,i),i}function as(e="reservation"){return ns(e).sectionDefs}function yo(e="reservation"){return ns(e).fieldDefs}function bo(e="reservation"){return ns(e).sectionIdSet}function go(e="reservation"){return ns(e).fieldIdMap}function ho(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const Md="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",zd="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",Od="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",vo=Ad.trim(),qo=/^data:image\/svg\+xml/i,Hd=/\.svg($|[?#])/i,Kn=512,Ds="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",So=96,Eo=25.4,Rs=210,ga=297,ha=Math.round(Rs/Eo*So),va=Math.round(ga/Eo*So);let ja=!1,Ta=null;function wo(){ja||(Ta=async function(){try{if(!P||!Z?.modal?.classList.contains("show")||(P.context||"reservation")!=="reservation")return;const n=P.reservation;if(!n)return;const a=[n.id,n.reservationId,n.reservation_id,n.reservationCode,n.reservation_code].map(u=>u==null?"":String(u)).filter(u=>u.length>0);if(!a.length)return;const s=Lt(),i=(Array.isArray(s)?s:[]).find(u=>[u?.id,u?.reservationId,u?.reservation_id,u?.reservationCode,u?.reservation_code].map(f=>f==null?"":String(f)).filter(f=>f.length>0).some(f=>a.includes(f)));if(!i)return;const r=Ai(i),{totalsDisplay:c,totals:l,rentalDays:d}=Fo(i,r,P.project);P.reservation=i,P.crewAssignments=r,P.totals=l,P.totalsDisplay=c,P.rentalDays=d,Ko(),Jt()}catch(t){console.warn("[reservationPdf] live update failed",t)}},document.addEventListener("reservations:changed",Ta),ja=!0)}function Ao(){if(ja){try{document.removeEventListener("reservations:changed",Ta)}catch{}Ta=null,ja=!1}}const xo=2,_o=/safari/i,Vd=/(iphone|ipad|ipod)/i,Zi=/(iphone|ipad|ipod)/i,Kd=/(crios|fxios|edgios|opios)/i,Ba="[reservations/pdf]";let Z=null,P=null,At=1,On=null,Hn=null,Kt=null,kn=null,Qn=!1;function dn(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!Z?.statusIndicator||!Z?.statusText)return;Z.statusKind=e;const i=t||ho(e);Z.statusText.textContent=i,Z.statusSpinner&&(Z.statusSpinner.hidden=!s),Z.statusAction&&(Z.statusAction.hidden=!0,Z.statusAction.onclick=null,n&&typeof a=="function"&&(Z.statusAction.textContent=n,Z.statusAction.hidden=!1,Z.statusAction.onclick=r=>{r.preventDefault(),a()})),Z.statusIndicator.hidden=!1,requestAnimationFrame(()=>{Z.statusIndicator.classList.add("is-visible")})}function $n(e){try{return String(e||"").toLowerCase().normalize("NFKD").replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,"").replace(/\s+/g," ").trim()}catch{return String(e||"").trim().toLowerCase()}}function Gn(e){!Z?.statusIndicator||!Z?.statusText||(Z.statusKind=null,Z.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{Z?.statusIndicator&&(Z.statusIndicator.hidden=!0,Z.statusAction&&(Z.statusAction.hidden=!0,Z.statusAction.onclick=null),Z.statusSpinner&&(Z.statusSpinner.hidden=!1))},220))}function Ms(){return!!window?.bootstrap?.Modal}function Ud(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),Kt||(Kt=document.createElement("div"),Kt.className="modal-backdrop fade show",Kt.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(Kt)),kn||(kn=t=>{t.key==="Escape"&&zs(e)},document.addEventListener("keydown",kn));try{e.focus({preventScroll:!0})}catch{}}}function zs(e){if(!(!e||!e.classList.contains("show"))){e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),Kt&&(Kt.remove(),Kt=null),kn&&(document.removeEventListener("keydown",kn),kn=null);try{Ao()}catch{}}}function Qd(e){if(e){if(Ms()){const t=window.bootstrap.Modal.getOrCreateInstance(e);try{e.addEventListener("hidden.bs.modal",()=>{try{Ao()}catch{}},{once:!0})}catch{}t.show();return}Ud(e)}}function Gd(){if(Qn)return;Qn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!Z?.modal?.classList.contains("show"),s=()=>{Z?.modal?.classList.contains("show")&&(dn("render"),Qn=!1,Jt())};fr({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:mo}),a&&dn("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function ss(e="reservation"){const t={},n=yo(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(i=>i?.default!==!1).map(i=>i.id))}),t}function hi(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function Wd(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function vi(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function qi(e="reservation"){return Object.fromEntries(as(e).map(({id:t})=>[t,!1]))}function Si(e,t){return e.sectionExpansions||(e.sectionExpansions=qi(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Xd(e,t){return Si(e,t)?.[t]!==!1}function Ei(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function Jd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Vd.test(e)}function Yd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=_o.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Io(){return Jd()&&Yd()}function is(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=Zi.test(e)||Zi.test(t),s=/Macintosh/i.test(e)&&n>1;return _o.test(e)&&!Kd.test(e)&&(a||s)}function qs(e,...t){try{console.log(`${Ba} ${e}`,...t)}catch{}}function Bt(e,...t){try{console.warn(`${Ba} ${e}`,...t)}catch{}}function Zd(e,t,...n){try{t?console.error(`${Ba} ${e}`,t,...n):console.error(`${Ba} ${e}`,...n)}catch{}}function Fe(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function eu(e,t="لا توجد بيانات للعرض."){const n=E(o(e,t));return Fe(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Fa(e,t){return Array.isArray(e)&&e.length?e:[eu(t)]}const tu=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function ko(e=""){return tu.test(e)}function nu(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(i,...r){if(typeof i!="string"||!ko(i))return a.call(this,i,...r);let c,l=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),l=!0)}catch{}try{if(!l){const d=this.canvas;d&&d.style?.direction!=="rtl"&&(d.__artRatioOriginalDirection=d.style.direction,d.style.direction="rtl")}return a.call(this,i,...r)}finally{if(l&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!l){const d=this.canvas;d&&d.__artRatioOriginalDirection!==void 0&&(d.style.direction=d.__artRatioOriginalDirection,delete d.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function er(e,t=Kn){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function au(e){if(!e)return{width:Kn,height:Kn};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?er(t,0):0,s=n?er(n,0):0;if(a>0&&s>0)return{width:a,height:s};const i=e.getAttribute?.("viewBox");if(i){const r=i.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(r.length>=4){const[,,c,l]=r;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(l)&&l>0?l:0)}}return{width:a||Kn,height:s||Kn}}function $o(e=""){return typeof e!="string"?!1:qo.test(e)||Hd.test(e)}function su(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function iu(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=i=>{const r=i?.message||`Unable to load image from ${e}`;a(new Error(r))},s.src=e})}async function Co(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const i=await iu(s),r=n.createElement("canvas"),c=Math.max(t.width||i.naturalWidth||i.width||0,1),l=Math.max(t.height||i.naturalHeight||i.height||c,1);r.width=c,r.height=l;const d=r.getContext("2d");return d.clearRect(0,0,c,l),d.drawImage(i,0,0,c,l),r.toDataURL("image/png")}catch(i){return console.warn("[reservations/pdf] failed to rasterize SVG content",i),null}finally{URL.revokeObjectURL(s)}}async function ru(e){if(!e)return null;if(qo.test(e))return su(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function ou(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!$o(t))return!1;const n=await ru(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",Ds),!1;const a=await Co(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",Ds),!1)}async function cu(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=au(e),s=await Co(n,a),r=(e.ownerDocument||document).createElement("img");r.setAttribute("src",s||Ds),r.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),r.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&r.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&r.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),l=e.getAttribute("height");return c&&r.setAttribute("width",c),l&&r.setAttribute("height",l),e.parentNode?.replaceChild(r,e),!!s}async function Po(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{$o(s.getAttribute?.("src"))&&a.push(ou(s))}),n.forEach(s=>{a.push(cu(s))}),a.length&&await Promise.allSettled(a)}function lu(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const i=(R,W=0)=>{const M=parseFloat(R);return Number.isFinite(M)?M:W},r=i(s.paddingTop),c=i(s.paddingBottom),l=i(s.paddingRight),d=i(s.paddingLeft),u=i(s.borderRadius),b=i(s.fontSize,14),f=(()=>{const R=s.lineHeight;if(!R||R==="normal")return b*1.6;const W=i(R,b*1.6);return W>0?W:b*1.6})(),m=Math.max(e.clientWidth||0,e.scrollWidth||0,i(s.width,0));if(m<=0)return null;const p=Math.max(1,m-d-l),g=e.textContent||"",q=g.split(/\r?\n/),I=n.createElement("canvas"),S=I.getContext("2d");if(!S)return null;const N=s.fontStyle||"normal",x=s.fontVariant||"normal",O=s.fontWeight||"400",w=s.fontFamily||"sans-serif",_=s.fontStretch||"normal",j=R=>R.join(" "),T=[],X=R=>S.measureText(R).width;S.font=`${N} ${x} ${O} ${_} ${b}px ${w}`,q.forEach(R=>{const W=R.trim();if(W.length===0){T.push("");return}const M=W.split(/\s+/);let V=[];M.forEach((H,te)=>{const ue=H.trim();if(!ue)return;const se=j(V.concat(ue));if(X(se)<=p||V.length===0){V.push(ue);return}T.push(j(V)),V=[ue]}),V.length&&T.push(j(V))}),T.length||T.push("");const C=r+c+T.length*f,D=Math.ceil(Math.max(1,m)*t),G=Math.ceil(Math.max(1,C)*t);I.width=D,I.height=G,I.style.width=`${Math.max(1,m)}px`,I.style.height=`${Math.max(1,C)}px`,S.scale(t,t);const B=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){S.save(),S.beginPath();const R=Math.max(1,m),W=Math.max(1,C),M=Math.min(u,R/2,W/2);S.moveTo(M,0),S.lineTo(R-M,0),S.quadraticCurveTo(R,0,R,M),S.lineTo(R,W-M),S.quadraticCurveTo(R,W,R-M,W),S.lineTo(M,W),S.quadraticCurveTo(0,W,0,W-M),S.lineTo(0,M),S.quadraticCurveTo(0,0,M,0),S.closePath(),S.clip()}if(S.fillStyle=B,S.fillRect(0,0,Math.max(1,m),Math.max(1,C)),S.font=`${N} ${x} ${O} ${_} ${b}px ${w}`,S.fillStyle=s.color||"#000000",S.textBaseline="top",S.textAlign="right","direction"in S)try{S.direction="rtl"}catch{}const F=Math.max(0,m-l);let L=r;T.forEach(R=>{const W=R.length?R:" ";S.fillText(W,F,L,p),L+=f});const Q=n.createElement("img");let J;try{J=I.toDataURL("image/png")}catch(R){return Bt("note canvas toDataURL failed",R),null}return Q.src=J,Q.alt=g,Q.style.width=`${Math.max(1,m)}px`,Q.style.height=`${Math.max(1,C)}px`,Q.style.display="block",Q.setAttribute("data-quote-note-image","true"),{image:Q,canvas:I,totalHeight:C,width:m}}function du(e,{pixelRatio:t=1}={}){if(!e||!is())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!ko(a.textContent||""))return;let s;try{s=lu(a,{pixelRatio:t})}catch(i){Bt("failed to rasterize note content",i),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function Os(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){Zd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const i=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),r=n||i,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),l=o("reservations.quote.toast.retry","إعادة المحاولة"),d=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(dn("export"),Uo()):(dn("render"),Qn=!1,Jt())};if(fr({message:r,duration:9e3,actionLabel:d?l:void 0,onAction:d?u:void 0,linkLabel:c,linkHref:mo}),Z?.modal?.classList.contains("show")&&dn("error",{message:r,actionLabel:d?l:void 0,onAction:d?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function Hs({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){Bt("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){Bt("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function wi(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",i=>n(i)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=i=>n(i),document.head.appendChild(s)})}function tr(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function nr(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function uu(){const e=nr();return e||(Hn||(Hn=wi(zd).catch(t=>{throw Hn=null,t}).then(()=>{const t=nr();if(!t)throw Hn=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Hn)}async function pu(){const e=tr();return e||(On||(On=wi(Od).catch(t=>{throw On=null,t}).then(()=>{const t=tr();if(!t)throw On=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),On)}async function mu(){if(window.html2pdf||await wi(Md),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}Pd(),nu()}function E(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function fu(e="reservation"){return e==="project"?"QP":"Q"}function yu(e,t="reservation"){const n=Number(e),a=fu(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function bu(){const e=window.localStorage?.getItem?.(po),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function No(e="reservation"){const n=bu()+1;return{sequence:n,quoteNumber:yu(n,e)}}function gu(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(po,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function Lo(e="reservation"){return Yi[e]||Yi.reservation}function hu(e="reservation"){try{const t=Lo(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function vu(e,t="reservation"){try{const n=Lo(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function qu(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function Su(e,t="reservation"){if(!e)return null;const n=bo(t),a=go(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),i={},r=e.fields||{};return Object.entries(a).forEach(([c,l])=>{const d=r[c];if(d==null)return;const{ids:u,emptyExplicitly:b}=qu(d);if(!u&&!b)return;const f=Array.isArray(u)?u.filter(m=>l.has(m)):[];(f.length>0||b)&&(i[c]=f)}),{version:1,sections:s,fields:i}}function jo(e){if(!e)return;const t=e.context||"reservation",n=Su(e,t);n&&vu(n,t)}function To(e){if(!e)return;const t=e.context||"reservation",n=hu(t);if(!n)return;const a=bo(t),s=Array.isArray(n.sections)?n.sections.filter(i=>a.has(i)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const i=hi(e.fields||ss(t)),r=go(t);Object.entries(n.fields).forEach(([c,l])=>{const d=r[c];if(!d)return;const u=Array.isArray(l)?l.filter(b=>d.has(b)):[];i[c]=new Set(u)}),e.fields=i}}function Bo(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function Ai(e){const t=pn()||[],{technicians:n=[]}=fe(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const c=String(r.id),l=s.get(c)||{};s.set(c,{...l,...r})}),(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(r=>({technicianId:r}))).map((r,c)=>{const l=r?.technicianId!=null?s.get(String(r.technicianId)):null;let d=r.positionLabel??r.position_name??r.position_label??r.role??r.position??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم");(!d||d.trim()==="")&&(d=r.positionLabelAr??r.position_label_ar??r.positionLabelEn??r.position_label_en??r.position_name_ar??r.position_name_en??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم"));try{const f=typeof Ht=="function"?Ht()||[]:[];let m=null;if(r?.positionId!=null&&(m=f.find(p=>String(p?.id)===String(r.positionId))||null),!m){const p=r.positionKey??r.position_key??r.positionName??r.position_name??r.position??"";if(p&&(m=typeof Ea=="function"&&Ea(p)||null,!m&&f.length)){const g=String(p).trim().toLowerCase();m=f.find(q=>[q.name,q.labelAr,q.labelEn].filter(Boolean).map(I=>String(I).toLowerCase()).includes(g))||null}}if(m){const p=m.labelAr||m.labelEn||m.name||"";p&&p.trim()&&(d=p)}}catch{}const u=Ae(ze(r.positionCost??r.position_cost??r.cost??r.daily_wage??r.dailyWage??l?.dailyWage??l?.wage??0)),b=Ae(ze(r.positionClientPrice??r.position_client_price??r.client_price??r.clientPrice??r.daily_total??r.dailyTotal??r.total??l?.dailyTotal??l?.total??l?.total_wage??0));return{assignmentId:r.assignmentId??r.assignment_id??`crew-${c}`,positionId:r.positionId??r.position_id??null,positionLabel:d,positionLabelAlt:r.positionLabelAlt??r.position_label_alt??"",positionCost:u,positionClientPrice:b,technicianId:r.technicianId!=null?String(r.technicianId):l?.id!=null?String(l.id):null,technicianName:r.technicianName??r.technician_name??l?.name??null,technicianRole:r.technicianRole??l?.role??null}})}function Fo(e,t,n){const{projectLinked:a}=Xt(e,n);Qa(e.start,e.end);const s=e.discount??e.discountValue??0,i=Number(v(String(s)))||0,r=e.discountType??e.discount_type??"percent",c=String(r).toLowerCase()==="amount"?"amount":"percent",l=a?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),d=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,u=d!=null?ze(d):Number.NaN,f=(e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied)===!0&&Number.isFinite(u)&&u>0?u:null,m=Array.isArray(t)?t.map(x=>x?.technicianId).filter(Boolean):[],p=wr({items:Array.isArray(e.items)?e.items:[],technicianIds:m,crewAssignments:Array.isArray(t)?t:[],discount:i,discountType:c,applyTax:l,start:e.start,end:e.end,companySharePercent:f}),g=ze(e.cost??e.total??e.finalTotal),q=Number.isFinite(g),I=a?p.finalTotal:q?Ae(g):p.finalTotal,S={equipmentTotal:p.equipmentTotal,crewTotal:p.crewTotal,crewCostTotal:p.crewCostTotal,discountAmount:p.discountAmount,subtotalAfterDiscount:p.subtotalAfterDiscount,taxableAmount:p.taxableAmount,taxAmount:p.taxAmount,finalTotal:I,companySharePercent:p.companySharePercent,companyShareAmount:p.companyShareAmount,netProfit:p.netProfit},N={equipmentTotal:v(p.equipmentTotal.toFixed(2)),crewTotal:v(p.crewTotal.toFixed(2)),discountAmount:v(p.discountAmount.toFixed(2)),subtotalAfterDiscount:v(p.subtotalAfterDiscount.toFixed(2)),taxableAmount:v(p.taxableAmount.toFixed(2)),taxAmount:v(p.taxAmount.toFixed(2)),finalTotal:v(I.toFixed(2)),companySharePercent:v((Number.isFinite(p.companySharePercent)?p.companySharePercent:0).toFixed(2)),companyShareAmount:v(p.companyShareAmount.toFixed(2)),netProfit:v(p.netProfit.toFixed(2))};return{totals:S,totalsDisplay:N,rentalDays:p.rentalDays}}function jn(e){if(e==null||e==="")return null;const t=Number.parseFloat(v(String(e)));return Number.isFinite(t)?t:null}function Do(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Eu(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=jn(e.amount??(n==="amount"?e.value:null)),s=jn(e.percentage??(n==="percent"?e.value:null)),i=n==="percent"?s??null:a??null,r=e.note??e.memo??null,c=Do(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:i,note:r,recordedAt:c}}function wu(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(Eu).filter(Boolean);if(n.length>0)return n;const a=jn(e.paidPercent??e.paid_percent),s=jn(e.paidAmount??e.paid_amount),i=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,r=Do(i);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:r}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:r}]:[]}function Au(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function xu(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function _u(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function Iu(e){const t=Number(e?.equipmentEstimate)||0,n=_u(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",i=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?i:a*(i/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const l=Math.max(0,a-c),d=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,b=d&&s&&u>0?u:0,f=b>0?Number((l*(b/100)).toFixed(2)):0,m=l+f;let p=s?m*ro:0;(!Number.isFinite(p)||p<0)&&(p=0),p=Number(p.toFixed(2));let g=s?Number(e?.totalWithTax):m;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((m+p).toFixed(2))):g=m,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:l,companyShareAmount:f,subtotal:m,applyTax:s,taxAmount:p,totalWithTax:g}}function ku(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(v(String(n)))||0,s=e.discountType||"percent",i=Array.isArray(e.crewAssignments)?e.crewAssignments:[],r=i.length?i:Array.isArray(e.technicians)?e.technicians:[],c=Ys(t,a,s,!1,r,{start:e.start,end:e.end});if(Number.isFinite(c))return c;const l=Number(v(String(e.cost??0)));return Number.isFinite(l)?Math.round(l):0}function $u(e,t){if(!e)return"—";const n=ut(e);return t?`${n} - ${ut(t)}`:n}function pe(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${v(a.toFixed(s))} ${t}`}function ar(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${v(Number(e).toFixed(n))}%`}function Cu(e){if(!e?.start)return null;if(!e?.end)return 1;const t=Qa(e.start,e.end);return Number.isFinite(t)?t:1}function Pu(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${v(String(Math.round(e)))} أيام`:"غير محدد"}function sr(e){const t=o("reservations.create.summary.currency","SR"),n=fe()||{},a=Array.isArray(n.customers)?n.customers:[],s=Array.isArray(n.projects)?n.projects:[],i=Array.isArray(n.technicians)?n.technicians:[];let r=[];try{const h=Lt?.()||[];r=Array.isArray(h)&&h.length?h:n.reservations||[]}catch{r=n.reservations||[]}const c=e?.id!=null?s.find(h=>String(h.id)===String(e.id))||e:e||null,l={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!c)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:l.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:pe(0,t),expensesTotal:pe(0,t),reservationsTotal:pe(0,t),discountAmount:pe(0,t),taxAmount:pe(0,t),overallTotal:pe(0,t),paidAmount:pe(0,t),remainingAmount:pe(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:l.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:pe(0,t),remainingAmountDisplay:pe(0,t),paidPercentDisplay:ar(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:l.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const d=c.clientId??c.customerId??c.client_id??c.customer_id??null,u=d!=null&&a.find(h=>String(h.id)===String(d))||null,b=u?.customerName??u?.name??c.clientName??c.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),f=(c.clientCompany||u?.companyName||u?.company||"").trim(),m=u?.phone??u?.customerPhone??c.clientPhone??c.customerPhone??"",p=m?v(String(m).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),g=u?.email??c.clientEmail??c.customerEmail??"",q=g?String(g).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),I=c.projectCode||`PRJ-${v(String(c.id??""))}`,S=v(String(I)),N=(c.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),x=Au(c.type),O=c.start?ut(c.start):"—",w=c.end?ut(c.end):"—",_=Cu(c),j=_!=null?Pu(_):"غير محدد",T=xu(c),X={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},C=o(`projects.status.${T}`,X[T]||T),D=c.id!=null?String(c.id):null,G=D?r.filter(h=>{const z=h?.projectId??h?.project_id??null;return z!=null&&String(z)===D}):[],F=G.map(h=>{const z=h.reservationId||h.id||"",k=h.status||h.state||"pending",ee=String(k).toLowerCase(),ae=o(`reservations.status.${ee}`,ee),Ee=ku(h),Ge=h.start?new Date(h.start).getTime():0;return{reservationId:v(String(z||"-")),status:ee,statusLabel:ae,total:Ee,totalLabel:pe(Ee,t),dateRange:$u(h.start,h.end),startTimestamp:Number.isNaN(Ge)?0:Ge}}).sort((h,z)=>z.startTimestamp-h.startTimestamp).map(({startTimestamp:h,...z})=>z).reduce((h,z)=>h+(Number(z.total)||0),0),L=[];try{G.forEach(h=>{const{groups:z}=ni(h);z.forEach(k=>{const ee=Number(k?.count??k?.quantity??1)||1,ae=Number(k?.unitPrice);let Ee=Number.isFinite(ae)?ae:0;if(!Ee||Ee<=0){const Ce=Number(k?.totalPrice);Number.isFinite(Ce)&&ee>0&&(Ee=Number((Ce/ee).toFixed(2)))}Number.isFinite(Ee)||(Ee=0);const Ge=k?.type==="package"||Array.isArray(k?.items)&&k.items.some(Ce=>Ce?.type==="package"),at=Array.isArray(k?.barcodes)&&k.barcodes.length?k.barcodes[0]:Array.isArray(k?.items)&&k.items.length?k.items[0]?.barcode:null;let $e=k?.packageDisplayCode??k?.package_code??k?.code??k?.packageCode??(Array.isArray(k?.items)&&k.items.length?k.items[0]?.package_code??k.items[0]?.code??k.items[0]?.packageCode:null);const Ve=Ce=>{const We=(Ce==null?"":String(Ce)).trim();return!!(!We||/^pkg-/i.test(We)||/^\d+$/.test(We)&&We.length<=4)};if(!$e||Ve($e)){const Ce=k?.packageId??k?.package_id??(Array.isArray(k?.items)&&k.items.length?k.items[0]?.packageId??k.items[0]?.package_id:null);if(Ce)try{const We=Js(Ce);We&&We.package_code&&($e=We.package_code)}catch{}}if(!$e||Ve($e))try{const Ce=$n(k?.description||"");if(Ce){const We=Ar();let $t=We.find(ft=>$n(ft?.name||ft?.title||ft?.label||"")===Ce);$t||($t=We.find(ft=>{const $=$n(ft?.name||ft?.title||ft?.label||"");return $.includes(Ce)||Ce.includes($)})),$t&&$t.package_code&&($e=$t.package_code)}}catch{}const Rt=Ge?$e??at??"":k?.barcode??at??"",ot=Rt!=null?String(Rt):"",tn=Number.isFinite(Number(k?.totalPrice))?Number(k.totalPrice):Number((Ee*ee).toFixed(2));L.push({...k,isPackage:Ge,desc:k?.description,barcode:ot,packageCodeResolved:$e||"",qty:ee,price:Ee,totalPrice:Ae(tn),unitPriceValue:Ee})})})}catch{}const Q=new Map;G.forEach(h=>{const z=Array.isArray(h.items)?h.items:[],k=Qa(h.start,h.end),ee=h.reservationId||h.id||"";z.forEach((ae,Ee)=>{if(!ae)return;const Ge=ae.barcode||ae.code||ae.id||ae.desc||ae.description||`item-${Ee}`,at=String(Ge||`item-${Ee}`),$e=Q.get(at)||{description:ae.desc||ae.description||ae.name||ae.barcode||`#${v(String(Ee+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},Ve=Number(ae.qty)||1,Rt=Number(ae.price)||0;$e.totalQuantity+=Ve,$e.reservationIds.add(String(ee));const ot=Rt*Ve*Math.max(1,k);Number.isFinite(ot)&&($e.totalCost+=ot),Q.set(at,$e)})});const J=Array.from(Q.values()).map(h=>({description:h.description,totalQuantity:h.totalQuantity,reservationsCount:h.reservationIds.size,displayCost:pe(h.totalCost,t)})),R=new Map((i||[]).filter(Boolean).map(h=>[String(h.id),h])),W=new Map,M=h=>{if(!h)return;let z=null;typeof h=="object"?z=h.id??h.technicianId??h.technician_id??h.userId??h.user_id??null:(typeof h=="string"||typeof h=="number")&&(z=h);const k=z!=null?String(z):null,ee=k&&R.has(k)?R.get(k):typeof h=="object"?h:null,ae=ee?.name||ee?.full_name||ee?.fullName||ee?.displayName||(typeof h=="string"?h:null),Ee=ee?.role||ee?.title||null,Ge=ee?.phone||ee?.mobile||ee?.contact||null;if(!ae&&!k)return;const at=k||ae;W.has(at)||W.set(at,{id:k,name:ae||"-",role:Ee||null,phone:Ge||null})};Array.isArray(c?.technicians)&&c.technicians.forEach(h=>M(h)),G.forEach(h=>{(Array.isArray(h.crewAssignments)&&h.crewAssignments.length?h.crewAssignments:Array.isArray(h.technicians)?h.technicians.map(k=>({technicianId:k})):[]).forEach(k=>M(k))});const V=Array.from(W.values()),H=Array.isArray(c.expenses)?c.expenses.map(h=>{const z=Number(h?.amount)||0;return{label:h?.label||h?.name||"-",amount:z,displayAmount:pe(z,t),note:h?.note||h?.description||""}}):[],te=Iu(c),ue=te.applyTax?Number(((te.subtotal+F)*ro).toFixed(2)):0,se=Number((te.subtotal+F+ue).toFixed(2)),xe=wu(c),_e=jn(c.paidAmount??c.paid_amount)||0,Y=jn(c.paidPercent??c.paid_percent)||0,ie=Zs({totalAmount:se,paidAmount:_e,paidPercent:Y,history:xe}),Se=typeof c.paymentStatus=="string"?c.paymentStatus.toLowerCase():"",Pe=ei({manualStatus:Se,paidAmount:ie.paidAmount,paidPercent:ie.paidPercent,totalAmount:se}),Je={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},Qe=o(`projects.paymentStatus.${Pe}`,Je[Pe]||Pe),Ie=Number(ie.paidAmount||0),ye=Number(ie.paidPercent||0),we=Math.max(0,Number((se-Ie).toFixed(2))),ke={projectSubtotal:pe(te.subtotal,t),expensesTotal:pe(te.expensesTotal,t),reservationsTotal:pe(F,t),discountAmount:pe(te.discountAmount,t),taxAmount:pe(ue,t),overallTotal:pe(se,t),paidAmount:pe(Ie,t),remainingAmount:pe(we,t)},Ye={status:Pe,statusLabel:Qe,paidAmount:Ie,paidPercent:ye,remainingAmount:we,paidAmountDisplay:pe(Ie,t),remainingAmountDisplay:pe(we,t),paidPercentDisplay:ar(ye)},K=(c.description||"").trim();return{project:c,customer:u,clientInfo:{name:b,company:f||"—",phone:p,email:q},projectInfo:{title:N,code:S,typeLabel:x,startDisplay:O,endDisplay:w,durationLabel:j,statusLabel:C},expenses:H,equipment:J,crew:V,equipmentItems:L,crewAssignments:G.flatMap(h=>Ai(h)),totals:te,totalsDisplay:ke,projectTotals:{combinedTaxAmount:ue,overallTotal:se,reservationsTotal:F,paidAmount:Ie,paidPercent:ye,remainingAmount:we,paymentStatus:Pe},paymentSummary:Ye,notes:K,currencyLabel:t,projectStatus:T,projectStatusLabel:C,projectDurationDays:_,projectDurationLabel:j,paymentHistory:xe}}function Nu({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:i=[],totalsDisplay:r={},projectTotals:c={},paymentSummary:l={},currencyLabel:d="SR",sections:u,fieldSelections:b={},quoteNumber:f,quoteDate:m,terms:p=rt}){const g=hi(b),q=(h,z)=>vi(g,h,z),I=h=>u?.has?.(h),S=`<div class="quote-placeholder">${E(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,N=(h,z)=>`<div class="info-plain__item">
      <span class="info-plain__label">${E(h)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${E(z)}</span>
    </div>`,x=(h,z,{variant:k="inline"}={})=>k==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${E(h)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${E(z)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${E(h)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${E(z)}</span>
    </span>`,O=(h,z)=>`<div class="payment-row">
      <span class="payment-row__label">${E(h)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${E(z)}</span>
    </div>`,w=[];q("customerInfo","customerName")&&w.push(N(o("projects.details.client","العميل"),t.name||"-")),q("customerInfo","customerCompany")&&w.push(N(o("projects.details.company","شركة العميل"),t.company||"—")),q("customerInfo","customerPhone")&&w.push(N(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),q("customerInfo","customerEmail")&&w.push(N(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const _=I("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${E(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${w.length?`<div class="info-plain">${w.join("")}</div>`:S}
      </section>`:"",j=[];q("projectInfo","projectType")&&j.push(N(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),q("projectInfo","projectTitle")&&j.push(N(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),q("projectInfo","projectCode")&&j.push(N(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),q("projectInfo","projectStart")&&j.push(N(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),q("projectInfo","projectEnd")&&j.push(N(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),q("projectInfo","projectDuration")&&j.push(N(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),q("projectInfo","projectStatus")&&j.push(N(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const T=I("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${E(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${j.length?`<div class="info-plain">${j.join("")}</div>`:S}
      </section>`:"",X=gi.filter(h=>q("crew",h.id)),C=Array.isArray(P?.crewAssignments)?P.crewAssignments:[],D=q("projectCrew","groupByPosition"),G=h=>{const z=h&&h.positionId!=null?`id:${String(h.positionId)}`:(()=>{const ae=(h?.positionLabel||h?.position_name||h?.position||"").trim().toLowerCase();return ae?`label:${ae}`:""})(),k=Number.isFinite(Number(h?.positionClientPrice))?Number(h.positionClientPrice):0,ee=k>0?`|p:${k.toFixed(2)}`:"";return`${z}${ee}`},B=(()=>{const h=new Map;return C.forEach(z=>{const k=G(z);k&&h.set(k,(h.get(k)||0)+1)}),h})(),F=(()=>{const h=[];return X.forEach(z=>{z.id==="position"?(h.push({...z,render:k=>{const ee=k?.positionLabel??k?.position_name??k?.role??o("reservations.crew.positionFallback","منصب بدون اسم");if(D)return E(v(String(ee)));const ae=G(k),Ee=ae&&B.get(ae)||0,Ge=Ee>1?` × ${v(String(Ee))}`:"";return E(v(String(ee))+Ge)}}),D&&h.push({id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:k=>E(v(String(k?.__count||0)))})):z.id==="price"&&D?h.push({...z,render:k=>{const ee=Number.isFinite(Number(k?.positionClientPrice))?Number(k.positionClientPrice):0,ae=Math.max(1,Number(k?.__count||1)),Ee=ee*ae;return E(`${v(Ee.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}}):h.push(z)}),h})(),L=D?(()=>{const h=new Map;return C.forEach(z=>{const k=G(z);if(!k)return;const ee=h.get(k);ee?ee.__count+=1:h.set(k,{...z,__count:1})}),Array.from(h.values())})():C,Q=(()=>{try{const h=(L||[]).reduce((z,k)=>{const ee=Number.isFinite(Number(k?.positionClientPrice))?Number(k.positionClientPrice):0,ae=Math.max(1,Number(k?.__count||1));return z+ee*ae},0);return v(h.toFixed(2))}catch{return"0.00"}})(),J=I("projectCrew")?F.length?`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${F.map(h=>`<th>${E(h.labelKey?o(h.labelKey,h.fallback):h.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${L.length?L.map((h,z)=>`<tr>${F.map(k=>`<td>${k.render(h,z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(F.length,1)}" class="empty">${E(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
            <div class="quote-table-subtotal">
              <span class="quote-table-subtotal__label">${E(o("reservations.details.labels.crewTotal","إجمالي الفريق"))}</span>
              <span class="quote-table-subtotal__value">${E(`${Q} ${d}`)}</span>
            </div>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${S}
          </section>`:"",R=[];q("financialSummary","projectSubtotal")&&R.push(x(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),r.projectSubtotal||`${pe(0,d)}`)),q("financialSummary","expensesTotal")&&R.push(x(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),r.expensesTotal||pe(0,d))),q("financialSummary","reservationsTotal")&&R.push(x(o("projects.details.reservationsTotal","إجمالي الحجوزات"),r.reservationsTotal||pe(0,d))),q("financialSummary","discountAmount")&&R.push(x(o("reservations.details.labels.discount","الخصم"),r.discountAmount||pe(0,d))),q("financialSummary","taxAmount")&&R.push(x(o("projects.details.summary.combinedTax","إجمالي الضريبة"),r.taxAmount||pe(0,d)));const W=[];q("financialSummary","overallTotal")&&W.push(x(o("projects.details.summary.overallTotal","الإجمالي الكلي"),r.overallTotal||pe(0,d),{variant:"final"})),q("financialSummary","paidAmount")&&W.push(x(o("projects.details.summary.paidAmount","إجمالي المدفوع"),r.paidAmount||pe(0,d),{variant:"final"})),q("financialSummary","remainingAmount")&&W.push(x(o("projects.details.summary.remainingAmount","المتبقي للدفع"),r.remainingAmount||pe(0,d),{variant:"final"}));const M=I("financialSummary")?!R.length&&!W.length?`<section class="quote-section quote-section--financial">${S}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${E(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${R.length?`<div class="totals-inline">${R.join("")}</div>`:""}
            ${W.length?`<div class="totals-final">${W.join("")}</div>`:""}
          </div>
        </section>`:"",V=fo.filter(h=>q("projectExpenses",h.id)),H=I("projectExpenses")?V.length?`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.expenses","الخدمات الإنتاجية"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${V.map(h=>`<th>${E(h.labelKey?o(h.labelKey,h.fallback):h.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((h,z)=>`<tr>${V.map(k=>`<td>${k.render(h,z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(V.length,1)}" class="empty">${E(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
            <div class="quote-table-subtotal">
              <span class="quote-table-subtotal__label">${E(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"))}</span>
              <span class="quote-table-subtotal__value">${E(`${r.expensesTotal||"0.00"} ${d}`)}</span>
            </div>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.expenses","الخدمات الإنتاجية"))}</h3>
            ${S}
          </section>`:"",ue=bi.filter(h=>q("items",h.id)).map(h=>h.id==="price"?{...h,render:z=>{const k=Number.isFinite(Number(z?.unitPriceValue))?Number(z.unitPriceValue):0,ee=Number.isFinite(Number(z?.qty))?Math.max(1,Number(z.qty)):1,ae=k*ee;return E(v(ae.toFixed(2)))}}:h),se=Array.isArray(P?.equipmentItems)?P.equipmentItems:[],xe=(()=>{try{const h=(se||[]).reduce((z,k)=>{const ee=Number.isFinite(Number(k?.unitPriceValue))?Number(k.unitPriceValue):0,ae=Number.isFinite(Number(k?.qty))?Math.max(1,Number(k.qty)):1;return z+ee*ae},0);return v(h.toFixed(2))}catch{return"0.00"}})(),_e=I("projectEquipment")?ue.length?`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${ue.map(h=>`<th>${E(h.labelKey?o(h.labelKey,h.fallback):h.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${se.length?se.map((h,z)=>`<tr>${ue.map(k=>`<td>${k.render(h,z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(ue.length,1)}" class="empty">${E(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
            <div class="quote-table-subtotal">
              <span class="quote-table-subtotal__label">${E(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"))}</span>
              <span class="quote-table-subtotal__value">${E(`${xe} ${d}`)}</span>
            </div>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${S}
          </section>`:"",Y=(e?.description||"").trim()||"",ie=I("projectNotes")?`<section class="quote-section">
        <h3>${E(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${E(Y||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",Se=[];q("payment","beneficiary")&&Se.push(O(o("reservations.quote.labels.beneficiary","اسم المستفيد"),He.beneficiaryName)),q("payment","bank")&&Se.push(O(o("reservations.quote.labels.bank","اسم البنك"),He.bankName)),q("payment","account")&&Se.push(O(o("reservations.quote.labels.account","رقم الحساب"),v(He.accountNumber))),q("payment","iban")&&Se.push(O(o("reservations.quote.labels.iban","رقم الآيبان"),v(He.iban)));const Pe=`<section class="quote-section">
      <div class="payment-block">
        <h3>${E(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${Se.length?Se.join(""):S}</div>
      </div>
      <p class="quote-approval-note">${E(He.approvalNote)}</p>
    </section>`,Je=Array.isArray(p)&&p.length?p:rt,Qe=`<footer class="quote-footer">
        <h4>${E(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${Je.map(h=>`<li>${E(h)}</li>`).join("")}</ul>
      </footer>`,Ie=[],ye=[];if(T&&ye.push({key:"project",html:T}),_&&ye.push({key:"customer",html:_}),ye.length>1){const h=ye.find(ee=>ee.key==="project"),z=ye.find(ee=>ee.key==="customer"),k=[];h?.html&&k.push(h.html),z?.html&&k.push(z.html),Ie.push(Fe(`<div class="quote-section-row quote-section-row--primary">${k.join("")}</div>`,{blockType:"group"}))}else ye.length===1&&Ie.push(Fe(ye[0].html));const we=[];J&&we.push(Fe(J,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),H&&we.push(Fe(H,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),_e&&we.push(Fe(_e,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const ke=[];M&&ke.push(Fe(M,{blockType:"summary"})),ie&&ke.push(Fe(ie));const Ye=[Fe(Pe,{blockType:"payment"}),Fe(Qe,{blockType:"footer"})],K=[...Fa(Ie,"projects.quote.placeholder.primary"),...we,...Fa(ke,"projects.quote.placeholder.summary"),...Ye],me=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${E(He.logoUrl)}" alt="${E(He.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${E(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${E(He.companyName)}</p>
        <p class="quote-company-cr">${E(o("reservations.quote.labels.cr","السجل التجاري"))}: ${E(He.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${E(o("reservations.details.labels.reservationId","رقم العرض"))}</span>
          <strong>${E(f)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${E(o("projects.quote.labels.date","التاريخ"))}</span>
          <strong>${E(m)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${vo}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${me}
          ${K.join("")}
        </div>
      </div>
    </div>
  `}function Ro(e){if(e?.context==="project")return Nu(e);const{reservation:t,customer:n,project:a,crewAssignments:s,totals:i,totalsDisplay:r,rentalDays:c,currencyLabel:l,sections:d,fieldSelections:u={},quoteNumber:b,quoteDate:f,terms:m=rt}=e,p=v(String(t?.reservationId??t?.id??"")),g=t.start?v(ut(t.start)):"-",q=t.end?v(ut(t.end)):"-",I=n?.customerName||n?.full_name||n?.name||"-",S=n?.phone||"-",N=n?.email||"-",x=n?.company||n?.company_name||"-",O=v(S),w=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),_=a?.code||a?.projectCode||"",j=v(String(c)),T=t?.notes||"",X=Array.isArray(m)&&m.length?m:rt,C=hi(u),D=($,le)=>vi(C,$,le),G=$=>d?.has?.($),B=`<div class="quote-placeholder">${E(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,F=($,le)=>`<div class="info-plain__item">${E($)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${E(le)}</strong></div>`,L=($,le,{variant:ne="inline"}={})=>ne==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${E($)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${E(le)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${E($)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${E(le)}</span>
    </span>`,Q=($,le)=>`<div class="payment-row">
      <span class="payment-row__label">${E($)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${E(le)}</span>
    </div>`,J=[];D("customerInfo","customerName")&&J.push(F(o("reservations.details.labels.customer","العميل"),I)),D("customerInfo","customerCompany")&&J.push(F(o("reservations.details.labels.company","الشركة"),x)),D("customerInfo","customerPhone")&&J.push(F(o("reservations.details.labels.phone","الهاتف"),O)),D("customerInfo","customerEmail")&&J.push(F(o("reservations.details.labels.email","البريد"),N));const R=G("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${E(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${J.length?`<div class="info-plain">${J.join("")}</div>`:B}
      </section>`:"",W=[];D("reservationInfo","reservationId")&&W.push(F(o("reservations.details.labels.reservationId","رقم الحجز"),p||"-")),D("reservationInfo","reservationStart")&&W.push(F(o("reservations.details.labels.start","بداية الحجز"),g)),D("reservationInfo","reservationEnd")&&W.push(F(o("reservations.details.labels.end","نهاية الحجز"),q)),D("reservationInfo","reservationDuration")&&W.push(F(o("reservations.details.labels.duration","عدد الأيام"),j));const M=G("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${E(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${W.length?`<div class="info-plain">${W.join("")}</div>`:B}
      </section>`:"",V=[];D("projectInfo","projectTitle")&&V.push(F(o("reservations.details.labels.project","المشروع"),w)),D("projectInfo","projectCode")&&V.push(F(o("reservations.details.labels.code","الرمز"),_||"-"));const H=G("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${E(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${V.length?`<div class="info-plain">${V.join("")}</div>`:B}
      </section>`:"",te=[];(D("financialSummary","equipmentTotal")||D("financialSummary","crewTotal"))&&te.push(L(o("reservations.details.labels.subtotalBeforeTax","الإجمالي قبل الضريبة"),`${r.taxableAmount} ${l}`)),D("financialSummary","discountAmount")&&te.push(L(o("reservations.details.labels.discount","الخصم"),`${r.discountAmount} ${l}`)),D("financialSummary","taxAmount")&&te.push(L(o("reservations.details.labels.tax","الضريبة"),`${r.taxAmount} ${l}`));const ue=D("financialSummary","finalTotal"),se=[];ue&&se.push(L(o("reservations.details.labels.total","الإجمالي النهائي"),`${r.finalTotal} ${l}`,{variant:"final"}));const xe=se.length?`<div class="totals-final">${se.join("")}</div>`:"",_e=G("financialSummary")?!te.length&&!ue?`<section class="quote-section quote-section--financial">${B}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${E(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${te.length?`<div class="totals-inline">${te.join("")}</div>`:""}
            ${xe}
          </div>
        </section>`:"",{groups:Y}=ni(t),ie=Y.map($=>{const le=Number($?.count??$?.quantity??1)||1,ne=Number($?.unitPrice);let be=Number.isFinite(ne)?ne:0;if(!be||be<=0){const Me=Number($?.totalPrice);Number.isFinite(Me)&&le>0&&(be=Number((Me/le).toFixed(2)))}Number.isFinite(be)||(be=0);const Re=$?.type==="package"||Array.isArray($?.items)&&$.items.some(Me=>Me?.type==="package"),st=Array.isArray($?.barcodes)&&$.barcodes.length?$.barcodes[0]:Array.isArray($?.items)&&$.items.length?$.items[0]?.barcode:null;let Xe=$?.packageDisplayCode??$?.package_code??$?.code??$?.packageCode??(Array.isArray($?.items)&&$.items.length?$.items[0]?.package_code??$.items[0]?.code??$.items[0]?.packageCode:null);const En=Me=>{const tt=(Me==null?"":String(Me)).trim();return!!(!tt||/^pkg-/i.test(tt)||/^\d+$/.test(tt)&&tt.length<=4)};if(!Xe||En(Xe)){const Me=$?.packageId??$?.package_id??(Array.isArray($?.items)&&$.items.length?$.items[0]?.packageId??$.items[0]?.package_id:null);if(Me)try{const tt=Js(Me);tt&&tt.package_code&&(Xe=tt.package_code)}catch{}}if(!Xe||En(Xe))try{const Me=$n($?.description||"");if(Me){const tt=Ar();let nn=tt.find(Ct=>$n(Ct?.name||Ct?.title||Ct?.label||"")===Me);nn||(nn=tt.find(Ct=>{const ca=$n(Ct?.name||Ct?.title||Ct?.label||"");return ca.includes(Me)||Me.includes(ca)})),nn&&nn.package_code&&(Xe=nn.package_code)}}catch{}const oa=Re?Xe??st??"":$?.barcode??st??"",ls=oa!=null?String(oa):"";let wn=Number.isFinite(Number($?.totalPrice))?Number($.totalPrice):Number((be*le).toFixed(2));return wn=Ae(wn),{...$,isPackage:Re,desc:$?.description,barcode:ls,packageCodeResolved:Xe||"",qty:le,price:wn,totalPrice:wn,unitPriceValue:be}}),Se=bi.filter($=>D("items",$.id)),Pe=(()=>{const $=[];Se.forEach(ne=>{ne.id==="price"?$.push({...ne,render:be=>{const Re=Number.isFinite(Number(be?.unitPriceValue))?Number(be.unitPriceValue):0,st=Number.isFinite(Number(be?.qty))?Math.max(1,Number(be.qty)):1,Xe=Math.max(1,Number(P?.rentalDays||1)),En=Re*st*Xe;return E(v(Number(En).toFixed(2)))}}):$.push(ne)});const le=Math.max(1,Number(P?.rentalDays||1));if(le>1){const ne=$.findIndex(Re=>Re.id==="price"),be=Math.max(0,ne);$.splice(be,0,{id:"days",labelKey:null,fallback:"الأيام",render:()=>E(v(String(le)))})}return $})(),Je=Pe.length>0,Qe=Je?Pe.map($=>`<th>${E($.labelKey?o($.labelKey,$.fallback):$.fallback)}</th>`).join(""):"",ye=ie.length>0?ie.map(($,le)=>`<tr>${Pe.map(ne=>`<td>${ne.render($,le)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Pe.length,1)}" class="empty">${E(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,we=G("items")?Je?`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Qe}</tr>
              </thead>
              <tbody>${ye}</tbody>
            </table>
            <div class="quote-table-subtotal">
              <span class="quote-table-subtotal__label">${E(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"))}</span>
              <span class="quote-table-subtotal__value">${E(`${r.equipmentTotal} ${l}`)}</span>
            </div>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.items.title","المعدات"))}</h3>
            ${B}
          </section>`:"",ke=gi.filter($=>D("crew",$.id)),Ye=D("crew","groupByPosition"),K=ke.length>0,me=Array.isArray(s)?s:[],h=$=>{const le=$&&$.positionId!=null?`id:${String($.positionId)}`:(()=>{const Re=($?.positionLabel||$?.position_name||$?.position||"").trim().toLowerCase();return Re?`label:${Re}`:""})(),ne=Number.isFinite(Number($?.positionClientPrice))?Number($.positionClientPrice):0,be=ne>0?`|p:${ne.toFixed(2)}`:"";return`${le}${be}`},z=(()=>{const $=new Map;return me.forEach(le=>{const ne=h(le);ne&&$.set(ne,($.get(ne)||0)+1)}),$})(),k=(()=>{const $=[];return ke.forEach(le=>{le.id==="position"?($.push({...le,render:ne=>{const be=ne?.positionLabel??ne?.position_name??ne?.role??o("reservations.crew.positionFallback","منصب بدون اسم");if(Ye)return E(v(String(be)));const Re=h(ne),st=Re&&z.get(Re)||0,Xe=st>1?` × ${v(String(st))}`:"";return E(v(String(be))+Xe)}}),Ye&&$.push({id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:ne=>E(v(String(ne?.__count||0)))})):le.id==="price"?Ye?$.push({...le,render:ne=>{const be=Number.isFinite(Number(ne?.positionClientPrice))?Number(ne.positionClientPrice):0,Re=Math.max(1,Number(ne?.__count||1)),st=Math.max(1,Number(P?.rentalDays||1)),Xe=be*Re*st;return E(`${v(Xe.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}}):$.push({...le,render:ne=>{const be=Number.isFinite(Number(ne?.positionClientPrice))?Number(ne.positionClientPrice):0,Re=Math.max(1,Number(P?.rentalDays||1)),st=be*Re;return E(`${v(st.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}}):$.push(le)}),$})(),ee=K?k.map($=>`<th>${E($.labelKey?o($.labelKey,$.fallback):$.fallback)}</th>`).join(""):"",ae=Ye?(()=>{const $=new Map;return me.forEach(le=>{const ne=h(le);if(!ne)return;const be=$.get(ne);be?be.__count+=1:$.set(ne,{...le,__count:1})}),Array.from($.values())})():me,Ee=ae.length?ae.map(($,le)=>`<tr>${k.map(ne=>`<td>${ne.render($,le)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(k.length,1)}" class="empty">${E(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,Ge=G("crew")?K?`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${ee}</tr>
              </thead>
              <tbody>${Ee}</tbody>
            </table>
            <div class="quote-table-subtotal">
              <span class="quote-table-subtotal__label">${E(o("reservations.details.labels.crewTotal","إجمالي الفريق"))}</span>
              <span class="quote-table-subtotal__value">${E(`${r.crewTotal} ${l}`)}</span>
            </div>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${B}
          </section>`:"",at=G("notes")?`<section class="quote-section">
        <h3>${E(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${E(T||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",$e=[];D("payment","beneficiary")&&$e.push(Q(o("reservations.quote.labels.beneficiary","اسم المستفيد"),He.beneficiaryName)),D("payment","bank")&&$e.push(Q(o("reservations.quote.labels.bank","اسم البنك"),He.bankName)),D("payment","account")&&$e.push(Q(o("reservations.quote.labels.account","رقم الحساب"),v(He.accountNumber))),D("payment","iban")&&$e.push(Q(o("reservations.quote.labels.iban","رقم الآيبان"),v(He.iban)));const Ve=`<section class="quote-section">
      <div class="payment-block">
        <h3>${E(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${$e.length?$e.join(""):B}</div>
      </div>
      <p class="quote-approval-note">${E(He.approvalNote)}</p>
    </section>`,Rt=`<footer class="quote-footer">
        <h4>${E(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${X.map($=>`<li>${E($)}</li>`).join("")}</ul>
      </footer>`,ot=[];R&&M?ot.push(Fe(`<div class="quote-section-row">${R}${M}</div>`,{blockType:"group"})):(M&&ot.push(Fe(M)),R&&ot.push(Fe(R))),H&&ot.push(Fe(H));const tn=[];we&&tn.push(Fe(we,{blockType:"table",extraAttributes:'data-table-id="items"'})),Ge&&tn.push(Fe(Ge,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const Ce=[];_e&&Ce.push(Fe(_e,{blockType:"summary"})),at&&Ce.push(Fe(at));const We=[Fe(Ve,{blockType:"payment"}),Fe(Rt,{blockType:"footer"})],$t=[...Fa(ot,"reservations.quote.placeholder.page1"),...tn,...Fa(Ce,"reservations.quote.placeholder.page2"),...We],ft=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${E(He.logoUrl)}" alt="${E(He.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${E(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${E(He.companyName)}</p>
        <p class="quote-company-cr">${E(o("reservations.quote.labels.cr","السجل التجاري"))}: ${E(He.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${E(b)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${E(f)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${vo}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${ft}
          ${$t.join("")}
        </div>
      </div>
    </div>
  `}async function Mo(){try{const e=fe();if((Array.isArray(e?.packages)?e.packages:[]).length>0)return;const n=await qt("/packages/?all=1"),a=Array.isArray(n?.data)?n.data:Array.isArray(n)?n:[];a.length&&(Ha({packages:a}),document.dispatchEvent?.(new CustomEvent("packages:changed",{detail:{packages:a}})))}catch{}}function Lu(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{i(),t()},s=()=>{i(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},i=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function Zn(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),i=a.map(c=>Lu(c)),r=[s,...i].map(c=>c.catch(l=>(Bt("asset load failed",l),Gd(),null)));await Promise.all(r),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function Da(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),i=e.querySelector("[data-quote-source]"),r=i?.querySelector("[data-quote-header-template]");if(!s||!i||!r)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await Po(i),await Zn(i),s.innerHTML="";const c=Array.from(i.querySelectorAll(":scope > [data-quote-block]"));let l=null,d=null;const u=w=>{w.style.margin="0 auto",w.style.breakInside="avoid",w.style.pageBreakInside="avoid",w.style.pageBreakAfter="auto",w.style.breakAfter="auto"},b=()=>{const w=a.createElement("div"),_=s.childElementCount===0;if(w.className="quote-page",w.dataset.pageIndex=String(s.childElementCount),_){w.classList.add("quote-page--primary");const T=r.cloneNode(!0);T.removeAttribute("data-quote-header-template"),w.appendChild(T)}else w.classList.add("quote-page--continuation");const j=a.createElement("main");j.className="quote-body",w.appendChild(j),s.appendChild(w),u(w),l=w,d=j},f=()=>{(!l||!d||!d.isConnected)&&b()},m=()=>{if(!l||!d||d.childElementCount>0)return;const w=l;l=null,d=null,w.parentNode&&w.parentNode.removeChild(w)},p=()=>{l=null,d=null},g=()=>l?l.scrollHeight-l.clientHeight>xo:!1,q=(w,{allowOverflow:_=!1}={})=>(f(),d.appendChild(w),g()&&!_?(d.removeChild(w),m(),!1):!0),I=w=>{const _=w.cloneNode(!0);_.removeAttribute?.("data-quote-block"),_.removeAttribute?.("data-block-type"),_.removeAttribute?.("data-table-id"),!q(_)&&(p(),!q(_)&&q(_,{allowOverflow:!0}))},S=w=>{const _=w.querySelector("table");if(!_){I(w);return}const j=w.querySelector("h3"),T=_.querySelector("thead"),X=Array.from(_.querySelectorAll("tbody tr"));if(!X.length){I(w);return}let C=null,D=0;const G=(F=!1)=>{const L=w.cloneNode(!1);L.removeAttribute("data-quote-block"),L.removeAttribute("data-block-type"),L.removeAttribute("data-table-id"),L.classList.add("quote-section--table-fragment"),F&&L.classList.add("quote-section--table-fragment--continued");const Q=j?j.cloneNode(!0):null;Q&&L.appendChild(Q);const J=_.cloneNode(!1);J.classList.add("quote-table--fragment"),T&&J.appendChild(T.cloneNode(!0));const R=a.createElement("tbody");return J.appendChild(R),L.appendChild(J),{section:L,body:R}},B=(F=!1)=>C||(C=G(F),q(C.section)||(p(),q(C.section)||q(C.section,{allowOverflow:!0})),C);X.forEach(F=>{B(D>0);const L=F.cloneNode(!0);if(C.body.appendChild(L),g()&&(C.body.removeChild(L),C.body.childElementCount||(d.removeChild(C.section),C=null,m()),p(),C=null,B(D>0),C.body.appendChild(L),g())){C.section.classList.add("quote-section--table-fragment--overflow"),D+=1;return}D+=1}),C=null};if(!c.length)return;c.forEach(w=>{w.getAttribute("data-block-type")==="table"?S(w):I(w)});const N=Array.from(s.children),x=[];if(N.forEach((w,_)=>{const j=w.querySelector(".quote-body");if(_!==0&&(!j||j.childElementCount===0)){w.remove();return}x.push(w)}),!n){const w=a.defaultView||window,_=Math.min(3,Math.max(1,w.devicePixelRatio||1)),j=is()?Math.min(2,_):_;x.forEach(T=>du(T,{pixelRatio:j}))}x.forEach((w,_)=>{const j=_===0;w.style.pageBreakAfter="auto",w.style.breakAfter="auto",w.style.pageBreakBefore=j?"auto":"always",w.style.breakBefore=j?"auto":"page",n?w.style.boxShadow="":w.style.boxShadow="none"});const O=x[x.length-1]||null;l=O,d=O?.querySelector(".quote-body")||null,await Zn(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function zo(e=0){return e<=0?new Promise(t=>requestAnimationFrame(()=>t())):new Promise(t=>setTimeout(t,e))}function Oo(e){return e?Array.from(e.querySelectorAll(".quote-page")).some(n=>n.scrollHeight-n.clientHeight>xo):!1}function xi(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function ju(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[i,r]=await Promise.all([pu(),uu()]),c=e.ownerDocument||document,l=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,l,c?.documentElement?.getAttribute?.("dir")].some(w=>typeof w=="string"&&w.toLowerCase().startsWith("rtl")),b=typeof window<"u"&&window.devicePixelRatio||1,f=Ei(),m=Io(),p=is();let g;p?g=1.5:m?g=Math.min(1.7,Math.max(1.2,b*1.1)):f?g=Math.min(1.8,Math.max(1.25,b*1.2)):g=Math.min(2,Math.max(1.6,b*1.4));const q=p||m?.9:f?.92:.95,I=new i({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),S={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let N=0;const x=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let w=0;w<s.length;w+=1){const _=s[w];await Po(_),await Zn(_);const j=_.ownerDocument||document,T=j.createElement("div");Object.assign(T.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const X=_.cloneNode(!0);X.style.width=`${ha}px`,X.style.maxWidth=`${ha}px`,X.style.minWidth=`${ha}px`,X.style.height=`${va}px`,X.style.maxHeight=`${va}px`,X.style.minHeight=`${va}px`,X.style.position="relative",X.style.background="#ffffff",xi(X),T.appendChild(X),j.body.appendChild(T);let C;try{await Zn(X),C=await r(X,{...S,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(R){throw Os(R,"pageCapture",{toastMessage:x}),R}finally{T.parentNode?.removeChild(T)}if(!C)continue;const D=C.width||1,B=(C.height||1)/D;let F=Rs,L=F*B,Q=0;if(L>ga){const R=ga/L;L=ga,F=F*R,Q=Math.max(0,(Rs-F)/2)}const J=C.toDataURL("image/jpeg",q);N>0&&I.addPage(),I.addImage(J,"JPEG",Q,0,F,L,`page-${N+1}`,"FAST"),N+=1,await new Promise(R=>window.requestAnimationFrame(R))}}catch(w){throw Hs({safariWindowRef:n,mobileWindowRef:a}),w}if(N===0)throw Hs({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(m||p){const w=I.output("blob");if(p){const _=URL.createObjectURL(w);Gn();try{window.location.assign(_)}catch(j){Bt("mobile safari blob navigation failed",j)}finally{setTimeout(()=>URL.revokeObjectURL(_),6e4)}}else{const _=URL.createObjectURL(w),j=()=>m&&n&&!n.closed?n:a&&!a.closed?a:null,T=(C,D)=>{if(Gn(),!C){window.location.assign(D);return}try{C.location.replace(D),C.focus?.()}catch(G){Bt("direct blob navigation failed",G);try{C.document.open(),C.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${E(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${D}" title="PDF preview"></iframe></body></html>`),C.document.close()}catch(B){Bt("iframe blob delivery failed",B),window.location.assign(D)}}},X=j();T(X,_),setTimeout(()=>URL.revokeObjectURL(_),6e4)}}else{Gn();const w=I.output("bloburl"),_=document.createElement("a");_.href=w,_.download=t,_.rel="noopener",_.style.display="none",document.body.appendChild(_),_.click(),setTimeout(()=>{URL.revokeObjectURL(w),_.remove()},2e3)}}function Jt(){if(!P||!Z)return;const{previewFrame:e}=Z;if(!e)return;const t=P.context||"reservation",n=Ro({context:t,reservation:P.reservation,customer:P.customer,project:P.project,crewAssignments:P.crewAssignments,totals:P.totals,totalsDisplay:P.totalsDisplay,rentalDays:P.rentalDays,currencyLabel:P.currencyLabel,sections:P.sections,fieldSelections:P.fields,quoteNumber:P.quoteNumber,quoteDate:P.quoteDateLabel,terms:P.terms,projectCrew:P.projectCrew,projectExpenses:P.projectExpenses,projectEquipment:P.projectEquipment,projectInfo:P.projectInfo,clientInfo:P.clientInfo,paymentSummary:P.paymentSummary,projectTotals:P.projectTotals});dn("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,i=a?.documentElement||a;i&&(uo(i),co(i,s),lo(i,s));const r=a?.getElementById("quotation-pdf-root");try{r&&(await Da(r,{context:"preview"}),await zo(120),Oo(r)&&await Da(r,{context:"preview"}),xi(r))}catch(m){console.error("[reservations/pdf] failed to layout preview document",m)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),l=a?.querySelector(".quote-preview-pages"),d=ha;let u=18;if(l&&a?.defaultView){const m=a.defaultView.getComputedStyle(l),p=parseFloat(m.rowGap||m.gap||`${u}`);Number.isFinite(p)&&p>=0&&(u=p)}const b=va,f=c.length?c.length*b+Math.max(0,(c.length-1)*u):b;if(e.dataset.baseWidth=String(d),e.dataset.baseHeight=String(f),e.style.width=`${d}px`,e.style.minWidth=`${d}px`,e.style.height=`${f}px`,e.style.minHeight=`${f}px`,Z?.previewFrameWrapper&&!Z?.userAdjustedZoom){const m=Z.previewFrameWrapper.clientWidth-24;m>0&&m<d?At=Math.max(m/d,.3):At=1}Vo(At)}finally{Gn()}},{once:!0})}function Tu(e){if(!P)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?P.sections.add(n):P.sections.delete(n),jo(P),Ho(),Jt())}function Bu(e){if(!P)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=P.context||"reservation",i=P.fields||(P.fields=ss(s)),r=Wd(i,n);t.checked?r.add(a):r.delete(a),jo(P),Jt()}function Fu(e){if(!P)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(Si(P,n),P.sectionExpansions[n]=t.open)}function Ho(){if(!Z?.toggles||!P)return;const{toggles:e}=Z,t=P.fields||{},n=P.context||"reservation";Si(P);const a=as(n),s=yo(n),i=a.map(({id:r,labelKey:c,fallback:l})=>{const d=o(c,l),u=P.sections.has(r),b=s[r]||[],f=Xd(P,r),m=b.length?`<div class="quote-toggle-sublist">
          ${b.map(p=>{const g=vi(t,r,p.id),q=u?"":"disabled",I=p.labelKey?o(p.labelKey,p.fallback):p.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${r}" data-field-id="${p.id}" ${g?"checked":""} ${q}>
                <span>${E(I)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${r}" ${f?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${r}" ${u?"checked":""}>
            <span>${E(d)}</span>
          </label>
          ${b.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${m}
      </details>
    `}).join("");e.innerHTML=i,e.querySelectorAll("input[data-section-toggle]").forEach(r=>{r.addEventListener("change",Tu)}),e.querySelectorAll("input[data-field-toggle]").forEach(r=>{r.addEventListener("change",Bu)}),e.querySelectorAll("details[data-section-group]").forEach(r=>{r.addEventListener("toggle",Fu)})}function Du(){if(Z?.modal)return Z;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${E(o("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${E(o("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
              <div class="quote-terms-editor" data-quote-terms-editor>
                <label class="quote-terms-editor__label" for="quote-terms-input">${E(o("reservations.quote.termsEditor.title","الشروط العامة (قابلة للتعديل)"))}</label>
                <textarea id="quote-terms-input" class="quote-terms-editor__textarea" rows="6" data-quote-terms-input placeholder="${E(o("reservations.quote.termsEditor.placeholder","اكتب كل شرط في سطر مستقل"))}"></textarea>
                <button type="button" class="quote-terms-reset" data-quote-terms-reset>${E(o("reservations.quote.termsEditor.reset","استعادة الشروط الافتراضية"))}</button>
              </div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${E(o("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${E(o("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),i=e.querySelector("[data-quote-terms-reset]"),r=e.querySelector("[data-quote-download]"),c=e.querySelector(".modal-header"),l=c?.querySelector(".btn-close"),d=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",c&&c.insertBefore(u,l||null);const b=document.createElement("iframe");b.className="quote-preview-frame",b.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),b.setAttribute("loading","lazy"),b.setAttribute("frameborder","0");const f=document.createElement("div");f.className="quote-preview-zoom-controls",f.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${E(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${E(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${E(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(b),n.innerHTML="";const p=document.createElement("div");p.className="quote-preview-scroll",p.appendChild(m),n.appendChild(p);const g=document.createElement("div");g.className="quote-preview-status",g.setAttribute("role","status"),g.setAttribute("aria-live","polite"),g.hidden=!0,g.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${E(ho("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(f),r?.addEventListener("click",async()=>{if(P){r.disabled=!0;try{await Uo()}finally{r.disabled=!1}}});const q=()=>{Ms()||zs(e)};d.forEach(x=>{x?.addEventListener("click",q)}),l&&!d.includes(l)&&l.addEventListener("click",q),e.addEventListener("click",x=>{Ms()||x.target===e&&zs(e)}),Z={modal:e,toggles:t,preview:n,previewScroll:p,previewFrameWrapper:m,zoomControls:f,zoomValue:f.querySelector("[data-zoom-value]"),previewFrame:b,meta:a,downloadBtn:r,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:i,statusKind:null,userAdjustedZoom:!1};const I=f.querySelector("[data-zoom-out]"),S=f.querySelector("[data-zoom-in]"),N=f.querySelector("[data-zoom-reset]");return I?.addEventListener("click",()=>ir(-.1)),S?.addEventListener("click",()=>ir(.1)),N?.addEventListener("click",()=>Ra(1,{markManual:!0})),s&&s.addEventListener("input",Ru),i&&i.addEventListener("click",Mu),Ra(At),Z}function Ra(e,{silent:t=!1,markManual:n=!1}={}){At=Math.min(Math.max(e,.25),2.2),n&&Z&&(Z.userAdjustedZoom=!0),Vo(At),!t&&Z?.zoomValue&&(Z.zoomValue.textContent=`${Math.round(At*100)}%`)}function ir(e){Ra(At+e,{markManual:!0})}function Vo(e){if(!Z?.previewFrame||!Z.previewFrameWrapper)return;const t=Z.previewFrame,n=Z.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",Ei()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function Ko(){if(!Z?.meta||!P)return;const{meta:e}=Z;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${E(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${E(P.quoteNumber)}</strong></div>
      <div><span>${E(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${E(P.quoteDateLabel)}</strong></div>
    </div>
  `}function _i(){if(!Z?.termsInput)return;const e=(P?.terms&&P.terms.length?P.terms:rt).join(`
`);Z.termsInput.value!==e&&(Z.termsInput.value=e)}function Ru(e){if(!P)return;const t=Bs(e?.target?.value??"");if(t.length){P.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{P.terms=[...rt],_i();const n=rt.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}Jt()}function Mu(e){if(e?.preventDefault?.(),!P)return;P.terms=[...rt];const t=document.getElementById("reservation-terms");t&&(t.value=rt.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=rt.join(`
`)),_i(),Jt()}async function Uo(){if(!P)return;dn("export");const t=!Ei()&&Io(),n=is(),a=null,s=!n&&t?window.open("","_blank"):null;(l=>{if(l)try{l.document.open(),l.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${E(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${E(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${E(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),l.document.close()}catch(d){Bt("failed to prime download window",d)}})(s);let r=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await mu(),qs("html2pdf ensured");const l=P.context||"reservation",d=Ro({context:l,reservation:P.reservation,customer:P.customer,project:P.project,crewAssignments:P.crewAssignments,totals:P.totals,totalsDisplay:P.totalsDisplay,rentalDays:P.rentalDays,currencyLabel:P.currencyLabel,sections:P.sections,fieldSelections:P.fields,quoteNumber:P.quoteNumber,quoteDate:P.quoteDateLabel,terms:P.terms,projectCrew:P.projectCrew,projectExpenses:P.projectExpenses,projectEquipment:P.projectEquipment,projectInfo:P.projectInfo,clientInfo:P.clientInfo,paymentSummary:P.paymentSummary,projectTotals:P.projectTotals});r=document.createElement("div"),r.innerHTML=d,Object.assign(r.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(r),uo(r),co(r),lo(r),qs("export container prepared");const u=r.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await Da(u,{context:"export"}),await zo(120),Oo(u)&&await Da(u,{context:"export"}),await Zn(u),xi(u),qs("layout complete for export document")}catch(f){Os(f,"layoutQuoteDocument",{suppressToast:!0})}}const b=`quotation-${P.quoteNumber}.pdf`;await ju(u,{filename:b,safariWindowRef:s,mobileWindowRef:a}),P.sequenceCommitted||(gu(P.quoteSequence),P.sequenceCommitted=!0)}catch(l){Hs({container:r,safariWindowRef:s,mobileWindowRef:a}),r=null,Os(l,"exportQuoteAsPdf",{toastMessage:c})}finally{r&&r.parentNode&&r.parentNode.removeChild(r),Gn()}}function Qo(){const e=Du();e?.modal&&(Qn=!1,At=1,Z&&(Z.userAdjustedZoom=!1),Ra(At,{silent:!0}),Ho(),Ko(),_i(),Jt(),Qd(e.modal))}async function zu({reservation:e,customer:t,project:n}){if(!e){A(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}await Mo();const a=Ai(e),{totalsDisplay:s,totals:i,rentalDays:r}=Fo(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:l,quoteNumber:d}=No("reservation"),u=new Date,b=jd();P={context:"reservation",reservation:e,customer:t,project:n,crewAssignments:a,totals:i,totalsDisplay:s,rentalDays:r,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(as("reservation").filter(f=>f.defaultSelected).map(f=>f.id)),sectionExpansions:qi("reservation"),fields:ss("reservation"),terms:b,quoteSequence:l,quoteNumber:d,quoteDate:u,quoteDateLabel:Bo(u),sequenceCommitted:!1},To(P),Qo();try{wo()}catch{}}async function Kp({project:e}){if(!e){A(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}await Mo();let t=sr(e);const{project:n}=t;if(!n){A(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}try{(!Array.isArray(t.equipmentItems)||t.equipmentItems.length===0)&&n?.id!=null&&(await ai({project_id:n.id}),t=sr(n))}catch(c){console.warn("[reservationPdf] refreshReservationsForProject failed, proceeding with snapshot/state",c)}const{sequence:a,quoteNumber:s}=No("project"),i=new Date,r=[...Ld];P={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,equipmentItems:t.equipmentItems||[],crewAssignments:t.crewAssignments||[],totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(as("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:qi("project"),fields:ss("project"),terms:r,quoteSequence:a,quoteNumber:s,quoteDate:i,quoteDateLabel:Bo(i),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},To(P),Qo();try{wo()}catch{}}function Ou({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=pn(),{reservations:i=[],customers:r=[],technicians:c=[],projects:l=[]}=fe(),d=i.map(S=>{const N=ws(S);return{...N,id:S.id??N.id,reservationId:S.reservationId??S.reservation_id??N.reservationId,reservationCode:S.reservationCode??S.reservation_code??N.reservationCode}}),u=d,b=Array.isArray(s)?s:c||[],f=new Map((l||[]).map(S=>[String(S.id),S])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!u||u.length===0){m.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const p=t||hd(),g=new Map(r.map(S=>[String(S.id),S])),q=new Map(b.map(S=>[String(S.id),S])),I=Ed({reservations:d,filters:p,customersMap:g,techniciansMap:q,projectsMap:f});if(I.length===0){m.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${wd({entries:I,customersMap:g,techniciansMap:q,projectsMap:f})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(S=>{const N=Number(S.dataset.reservationIndex);Number.isNaN(N)||S.addEventListener("click",()=>{typeof n=="function"&&n(N)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(S=>{const N=Number(S.dataset.reservationIndex);Number.isNaN(N)||S.addEventListener("click",x=>{x.stopPropagation(),typeof a=="function"&&a(N,x)})})}function Hu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:i=[],projects:r=[]}=fe(),c=s.map(g=>{const q=ws(g);return{...q,id:g.id??q.id,reservationId:g.reservationId??g.reservation_id??q.reservationId,reservationCode:g.reservationCode??g.reservation_code??q.reservationCode}}),l=s[e];if(!l)return A(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=c[e]??ws(l),u=i.find(g=>String(g.id)===String(l.customerId)),b=l.projectId?r.find(g=>String(g.id)===String(l.projectId)):null,f=document.getElementById("reservation-details-body"),m=document.getElementById("reservationDetailsModal"),p=()=>{const g=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},q=document.getElementById("reservation-details-edit-btn");q&&(q.onclick=()=>{g(),typeof t=="function"&&t(e,{reservation:l,customer:u,getEditContext:a})});const I=document.getElementById("reservation-details-delete-btn");I&&(I.onclick=()=>{g(),typeof n=="function"&&n(e,{reservation:l,customer:u})});const S=f?.querySelector('[data-action="open-project"]');S&&b&&S.addEventListener("click",()=>{g();const x=b?.id!=null?String(b.id):"",O=x?`projects.html?project=${encodeURIComponent(x)}`:"projects.html";window.location.href=O});const N=document.getElementById("reservation-details-export-btn");N&&(N.onclick=async x=>{x?.preventDefault?.(),x?.stopPropagation?.(),N.blur();try{await zu({reservation:l,customer:u,project:b})}catch(O){console.error("❌ [reservations] export to PDF failed",O),A(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}});try{const x=f?.querySelector("[data-tech-slider]");if(x){const O=x.querySelector("[data-slider-track]"),w=x.querySelector("[data-slider-prev]"),_=x.querySelector("[data-slider-next]");if(O&&(w||_)){const j=document.documentElement.getAttribute("dir")==="rtl"||document.body.getAttribute("dir")==="rtl",T=()=>{const D=O.querySelector(".reservation-technician-card"),G=D&&D.getBoundingClientRect().width||220,B=12,F=Math.max(1,Math.floor(O.clientWidth/(G+B)));return Math.max(G+B,Math.floor(F*(G+B)*.9))},X=()=>{const D=Math.max(0,O.scrollWidth-O.clientWidth-2),G=O.scrollLeft<=1,B=O.scrollLeft>=D;w&&(w.disabled=G),_&&(_.disabled=B)},C=D=>{const G=T()*D,B=j?-G:G;O.scrollBy({left:B,behavior:"smooth"})};w?.addEventListener("click",()=>C(-1)),_?.addEventListener("click",()=>C(1)),O.addEventListener("scroll",X,{passive:!0}),window.addEventListener("resize",X,{passive:!0}),setTimeout(X,0)}}}catch{}};if(f){const g=pn()||[];f.innerHTML=Ji(d,u,g,e,b),p(),xr().then(()=>{const q=pn()||[];f.innerHTML=Ji(d,u,q,e,b),p()}).catch(()=>{})}return m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}function Go(){const e=()=>{Dn(),et(),pn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let rr=!1,or=null;function Vu(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function Up(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=Vu(n);if(!a&&rr&&Lt().length>0&&s===or)return Lt();try{const i=await ai(n||{});return rr=!0,or=s,i}catch(i){if(console.error("❌ [reservationsActions] Failed to load reservations from API",i),!t)throw i;return Lt()}}async function Ku(e,{onAfterChange:t}={}){if(!gn())return ta(),!1;const a=Lt()[e];if(!a)return A(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return A(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await tl(s),Go(),t?.({type:"deleted",reservation:a}),A(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(i){console.error("❌ [reservationsActions] deleteReservation failed",i);const r=Ua(i)?i.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return A(r,"error"),!1}}async function Uu(e,{onAfterChange:t}={}){const a=Lt()[e];if(!a)return A(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return A(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:i}=Xt(a);if(i)return A(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const r=await nl(s);return Go(),t?.({type:"confirmed",reservation:r}),A(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(r){console.error("❌ [reservationsActions] confirmReservation failed",r);const c=Ua(r)?r.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return A(c,"error"),!1}}function Mn(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Jn(e,n),end:Jn(t,a)}}function Ma(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ii(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function Wo(){const{container:e,select:t,hint:n,addButton:a}=Ii();if(!t)return;const s=t.value,i=yr(),r=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,l=i.map(u=>{const b=Number.isFinite(Number(u.price))?Number(u.price):0,f=v(b.toFixed(2)),m=`${u.name} — ${f} ${r}`;return`<option value="${Ma(u.id)}">${Ma(m)}</option>`}).join("");t.innerHTML=`${c}${l}`;const d=i.length>0;t.disabled=!d,a&&(a.disabled=!d),e&&(e.hidden=!d,e.setAttribute("aria-hidden",d?"false":"true")),n&&(d?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),d&&s&&i.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function Qu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||A(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=Zt(),{start:i,end:r}=Mn(),{reservations:c=[]}=fe(),l=a!=null&&c[a]||null,d=l?.id??l?.reservationId??null,u=eo(n,{existingItems:s,start:i,end:r,ignoreReservationId:d});if(!u.success)return t||A(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const b=[...s,u.package];return en(a,b),Yt(b),mt(),t||A(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function cr(){const{select:e}=Ii();if(!e)return;const t=e.value||"";Qu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function Gu(){const{addButton:e,select:t}=Ii();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{cr()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),cr())}),t.dataset.listenerAttached="true"),Wo()}function Yt(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),r=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,dr(t);return}const l=Tn(e);t.innerHTML=l.map(d=>{const u=d.items[0]||{},b=vn(u)||d.image,f=b?`<img src="${b}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=d.items.some(C=>C?.type==="package"),p=v(String(d.count)),g=ze(d.unitPrice),q=Number.isFinite(g)?Ae(g):0,I=ze(d.totalPrice),S=Number.isFinite(I)?I:q*(Number.isFinite(d.count)?d.count:1),N=Ae(S),x=`${v(q.toFixed(2))} ${a}`,O=`${v(N.toFixed(2))} ${a}`,w=d.barcodes.map(C=>v(String(C||""))).filter(Boolean),_=w.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${w.map(C=>`<li>${C}</li>`).join("")}
            </ul>
          </details>`:"";let j="";if(m){const C=new Map,D=B=>{const F=Number.parseFloat(v(String(B??"")).replace(/[^0-9.]/g,""));return!Number.isFinite(F)||F<=0||F>99?1:Math.round(F)},G=[];if(Array.isArray(d.packageItems)&&d.packageItems.length&&G.push(...d.packageItems),d.items.forEach(B=>{Array.isArray(B?.packageItems)&&G.push(...B.packageItems)}),G.forEach(B=>{if(!B)return;const F=ce(B.barcode||B.normalizedBarcode||B.desc||Math.random());if(!F)return;const L=C.get(F),Q=D(B.qtyPerPackage??B.perPackageQty??B.quantityPerPackage??B.qty??B.quantity??1),J=Math.max(1,Math.min(Q,99));if(L){L.qty=J;return}C.set(F,{desc:B.desc||B.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:J,barcode:B.barcode??B.normalizedBarcode??""})}),C.size){const B=Array.from(C.values()).map(F=>{const L=v(String(F.qty>0?Math.min(F.qty,99):1)),Q=Ma(F.desc||""),J=F.barcode?` <span class="reservation-package-items__barcode">(${Ma(v(String(F.barcode)))})</span>`:"";return`<li>${Q}${J} × ${L}</li>`}).join("");j=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${B}
              </ul>
            </details>
          `}}const T=m?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",X=m?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${d.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${d.description||"-"}</div>
                ${m?`${j||""}${_||""}`:_}
              </div>
            </div>
          </td>
          <td>
            <div class="${T}" data-group-key="${d.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${d.key}" aria-label="${r}"${X}>−</button>
              <span class="reservation-qty-value">${p}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${d.key}" aria-label="${i}"${X}>+</button>
            </div>
          </td>
          <td>${x}</td>
          <td>${O}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),dr(t)}function Wu(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function rs(){const e=document.getElementById("edit-res-payment-history");if(!e)return;let t=os();const n=document.getElementById("edit-res-project")?.value||"";if(n)try{const r=(fe()?.projects||[]).find(l=>String(l.id)===String(n)),c=Array.isArray(r?.paymentHistory)?r.paymentHistory:Array.isArray(r?.payment_history)?r.payment_history:Array.isArray(r?.payments)?r.payments:Array.isArray(r?.paymentLogs)?r.paymentLogs:[];Array.isArray(c)&&c.length&&(t=c)}catch{}if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة")}</div>`,lr();return}const a=o("reservations.create.summary.currency","SR"),s=t.map((i,r)=>{const c=Number.isFinite(Number(i?.amount))&&Number(i.amount)>0?`${v(Number(i.amount).toFixed(2))} ${a}`:"—",l=Number.isFinite(Number(i?.percentage))&&Number(i.percentage)>0?`${v(Number(i.percentage).toFixed(2))}%`:"—",d=i?.recordedAt?v(ut(i.recordedAt)):"—",u=Wu(i?.type),b=i?.note?v(i.note):"";return`
      <tr>
        <td>${u}</td>
        <td>${c}</td>
        <td>${l}</td>
        <td>${d}</td>
        <td>${b}</td>
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
        <tbody>${s}</tbody>
      </table>
    </div>
  `,lr()}function Xu(){if(ea()){A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=Yo(e);let a=Zo(t);if(!Number.isFinite(a)||a<=0){A(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=As.lastResult,i=Number(s?.total)||0,r=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,l=o("reservations.create.summary.currency","SR");let d=null,u=null;if(n==="percent"){const f=Math.max(0,100-r);if(f<=1e-4){A(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const p=v(m.toFixed(2));A(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",p)),a=m}u=Number(a.toFixed(2)),i>0&&(d=a/100*i)}else{const f=Math.max(0,i-c);if(f<=1e-4){A(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const p=`${v(m.toFixed(2))} ${l}`;A(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",p)),a=m}d=Number(a.toFixed(2)),i>0&&(u=d/i*100)}d!=null&&(d=Number(d.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const b={type:n,value:a,amount:d,percentage:u,recordedAt:new Date().toISOString()};cp(b),ki(os()),rs(),mt(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),A(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function lr(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(ea()){n.preventDefault(),A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Xu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(ea()){n.preventDefault(),A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(lp(s),ki(os()),rs(),mt(),A(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function Ju(e){const{index:t,items:n}=Zt(),s=Tn(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const i=s.itemIndices[s.itemIndices.length-1];if(i==null)return;const r=n.filter((c,l)=>l!==i);en(t,r),Yt(r),mt()}function Yu(e){const{index:t,items:n}=Zt(),a=n.filter(s=>Ka(s)!==e);a.length!==n.length&&(en(t,a),Yt(a),mt())}function Zu(e){const{index:t,items:n}=Zt(),s=Tn(n).find(q=>q.key===e);if(!s||s.items.some(q=>q?.type==="package"))return;const{start:i,end:r}=Mn();if(!i||!r){A(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=fe(),l=t!=null&&c[t]||null,d=l?.id??l?.reservationId??null,u=new Set(n.map(q=>ce(q.barcode))),{equipment:b=[]}=fe(),f=(b||[]).find(q=>{const I=ce(q?.barcode);return!I||u.has(I)||Ka({desc:q?.desc||q?.description||q?.name||"",price:Number(q?.price)||0})!==e||!Pr(q)?!1:!_t(I,i,r,d)});if(!f){A(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const m=ce(f.barcode),p=hn(f);if(!p){A(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:p,equipmentId:p,barcode:m,desc:f.desc||f.description||f.name||s.description||"",qty:1,price:Number.isFinite(Number(f.price))?Number(f.price):s.unitPrice,image:vn(f)}];en(t,g),Yt(g),mt()}function dr(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:i}=n.dataset;if(a==="decrease-edit-group"&&s){Ju(s);return}if(a==="increase-edit-group"&&s){Zu(s);return}if(a==="remove-edit-group"&&s){Yu(s);return}if(a==="remove-edit-item"){const r=Number(i);Number.isNaN(r)||np(r)}}),e.dataset.groupListenerAttached="true")}function ea(){return!!document.getElementById("edit-res-project")?.value}function ep(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{ea()&&(A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function tp(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),i=document.getElementById("edit-res-payment-progress-type"),r=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),l=document.getElementById("edit-res-payment-history");if([n,a,s,i,r,c,l].forEach(ep),e){if(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s){const d=document.getElementById("edit-res-project")?.value||"";let u="unpaid";if(d)try{const f=(fe()?.projects||[]).find(p=>String(p.id)===String(d)),m=typeof f?.paymentStatus=="string"?f.paymentStatus.toLowerCase():null;m&&["paid","partial","unpaid"].includes(m)&&(u=m)}catch{}s.value=u,s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected}i&&(i.value=i.value||"percent",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),r&&(r.value="",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),l&&(l.dataset.linkedDisabled="true")}else n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.dataset.linkedDisabled="false")}function mt(){const e=document.getElementById("edit-res-summary");if(!e)return;rs();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),dt(a),mt()}),a.dataset.listenerAttached="true");const s=v(t?.value||"0");t&&(t.value=s);const i=parseFloat(s)||0,r=n?.value||"percent",c=ea();tp(c);const l=document.getElementById("edit-res-tax"),d=c?!1:l?.checked||!1,u=!c&&a?.dataset?.userSelected==="true";let b="unpaid";if(c){const N=document.getElementById("edit-res-project")?.value||"";if(N)try{const O=(fe()?.projects||[]).find(_=>String(_.id)===String(N)),w=typeof O?.paymentStatus=="string"?O.paymentStatus.toLowerCase():null;w&&["paid","partial","unpaid"].includes(w)&&(b=w)}catch{}}else b=u&&a?.value||"unpaid";let f=null;!c&&d&&(vt("edit-res-company-share"),f=Nn("edit-res-company-share"),(!Number.isFinite(f)||f<=0)&&(vt("edit-res-company-share"),f=Nn("edit-res-company-share")));const{items:m=[],payments:p=[]}=Zt(),{start:g,end:q}=Mn(),I=As({items:m,discount:i,discountType:r,applyTax:d,paidStatus:b,start:g,end:q,companySharePercent:f,paymentHistory:p});e.innerHTML=I;const S=As.lastResult;if(S&&a){const N=S.paymentStatus;u?dt(a,a.value):(a.value!==N&&(a.value=N),a.dataset&&delete a.dataset.userSelected,dt(a,N))}else a&&dt(a,a.value)}function np(e){if(e==null)return;const{index:t,items:n}=Zt();if(!Array.isArray(n))return;const a=n.filter((s,i)=>i!==e);en(t,a),Yt(a),mt()}function ap(e){const t=e?.value??"",n=ce(t);if(!n)return;const a=Ga(n);if(!a){A(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=Ft(a);if(s==="maintenance"||s==="retired"){A(bn(s));return}const i=ce(n),{index:r,items:c=[]}=Zt();if(c.findIndex(q=>ce(q.barcode)===i)>-1){A(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=Mn();if(!d||!u){A(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:b=[]}=fe(),f=r!=null&&b[r]||null,m=f?.id??f?.reservationId??null;if(_t(i,d,u,m)){A(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const p=hn(a);if(!p){A(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:p,equipmentId:p,barcode:i,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];en(r,g),e&&(e.value=""),Yt(g),mt()}function za(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Xr(t),a=ce(n?.barcode||t);if(!n||!a){A(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=Ft(n);if(s==="maintenance"||s==="retired"){A(bn(s));return}const{start:i,end:r}=Mn();if(!i||!r){A(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:l=[]}=Zt();if(l.some(g=>ce(g.barcode)===a)){A(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=fe(),b=c!=null&&u[c]||null,f=b?.id??b?.reservationId??null;if(_t(a,i,r,f)){A(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=hn(n);if(!m){A(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const p=[...l,{id:m,equipmentId:m,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];en(c,p),Yt(p),mt(),e.value=""}function Xo(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),za(e))});const t=()=>{Jr(e.value,"edit-res-equipment-description-options")&&za(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{mt()});const e=()=>{Gu()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{Wo()})}typeof window<"u"&&(window.getEditReservationDateRange=Mn,window.renderEditPaymentHistory=rs);function sp(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){Ls(e);return}za(e)}}function Qp(){Wt(),Xo()}function ip(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let Cn=null,wt=[],xt=[],Vs=null,nt={},Ss=!1;const rp="__DEBUG_CREW__";function op(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(rp);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function ur(e,t){if(op())try{console.log(`🪵 [crew-debug:edit] ${e}`,t)}catch{}}function Wn(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),i=!!e;if(n&&(n.value=i?"true":"false"),a){const r=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=i?r:c,a.dataset.state=i?"confirmed":"pending",a.classList.toggle("btn-success",i&&!t),a.classList.toggle("btn-outline-secondary",!i||t),a.disabled=t,a.setAttribute("aria-pressed",i?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function qa(){return document.getElementById("edit-res-confirmed")?.value==="true"}function Zt(){return{index:Cn,items:wt,payments:xt}}function en(e,t,n=xt){Cn=typeof e=="number"?e:null,wt=Array.isArray(t)?[...t]:[],xt=Array.isArray(n)?[...n]:[]}function Jo(){Cn=null,wt=[],il(),xt=[]}function os(){return[...xt]}function ki(e){xt=Array.isArray(e)?[...e]:[]}function cp(e){e&&(xt=[...xt,e])}function lp(e){!Number.isInteger(e)||e<0||(xt=xt.filter((t,n)=>n!==e))}function Xn(e,t=1){const n=Number.parseFloat(v(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function Ks(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(v(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function dp(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?ce(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:Xn(e.qty??e.quantity??e.count??1),price:Ks(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function up(e,t=0){if(!e||typeof e!="object")return null;const n=Yn(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=Xn(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),i=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:Ws(e)).map(f=>dp(f)).filter(Boolean),r=e.total_price??e.totalPrice??e.total??null;let c=Ks(e.unit_price??e.unitPrice??e.price??null,0);if((!c||c===0)&&r!=null){const f=Ks(r,0);f>0&&a>0&&(c=Number((f/a).toFixed(2)))}const l=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,l,n].find(f=>f!=null&&String(f).trim()!=="")||`Package ${n}`,b=e.image??e.cover??e.thumbnail??i.find(f=>f?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:v(String(u)),name:v(String(u)),qty:a,price:c,barcode:l,packageItems:i,image:b}}function pp(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const i=s-n;e.set(a,i>0?i:0)})}function mp(e={},t=[]){const n=Array.isArray(t)?t.map(c=>({...c})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((c,l)=>up(c,l)).filter(Boolean);if(!s.length)return n;const i=new Map;s.forEach(c=>{const l=Xn(c.qty??c.quantity??1);if(c.barcode){const d=ce(c.barcode);if(d){const u=`package::${d}`;i.set(u,(i.get(u)??0)+l)}}(c.packageItems||[]).forEach(d=>{if(!d)return;const u=l*Xn(d.qty??d.quantity??1),b=d.equipmentId??null,f=d.normalizedBarcode||(d.barcode?ce(d.barcode):null);if(b!=null){const m=`equipment::${String(b)}`;i.set(m,(i.get(m)??0)+u)}if(f){const m=`barcode::${f}`;i.set(m,(i.get(m)??0)+u)}})});const r=[];return n.forEach(c=>{if(!c||typeof c!="object"){r.push(c);return}if(c.type==="package"){const q=Yn(c.packageId??c.package_id??c.id??"");s.some(S=>S.packageId===q)||r.push({...c});return}const l=Xn(c.qty??c.quantity??1),d=hn(c),u=c.barcode?ce(c.barcode):null,b=[];d!=null&&b.push(`equipment::${String(d)}`),u&&b.push(`barcode::${u}`);const f=b.map(q=>i.get(q)??0).filter(q=>q>0);if(!f.length){r.push({...c});return}const m=Math.min(...f);if(m<=0){r.push({...c});return}const p=Math.min(m,l);if(pp(i,b,p),p>=l)return;const g=l-p;r.push({...c,qty:g,quantity:g})}),[...r,...s.map(c=>({...c}))]}function fp(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Yo(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Zo(e){if(!e)return null;const t=v(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function yp(e,t){if(e){e.value="";return}}function Vn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ec(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(v(String(e.value??""))),a=Number.parseFloat(v(String(e.amount??""))),s=Number.parseFloat(v(String(e.percentage??""))),i=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,r=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(i)?"amount":Number.isFinite(r)?"percent":null),l=c==="amount"?i??null:c==="percent"?r??null:Number.isFinite(n)?n:null,d=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:l,amount:Number.isFinite(i)?i:null,percentage:Number.isFinite(r)?r:null,note:e.note??null,recordedAt:d}}function bp(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),i=t?.projectId?String(t.projectId):"",r=Array.isArray(e)?[...e].sort((l,d)=>String(d.createdAt||d.start||"").localeCompare(String(l.createdAt||l.start||""))):[],c=[`<option value="">${Vn(a)}</option>`];r.forEach(l=>{c.push(`<option value="${Vn(l.id)}">${Vn(l.title||a)}</option>`)}),i&&!r.some(l=>String(l.id)===i)&&c.push(`<option value="${Vn(i)}">${Vn(s)}</option>`),n.innerHTML=c.join(""),i?n.value=i:n.value=""}function tc(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),i=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=i),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=i),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=i),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=i);else{if(t){const l=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",l&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}Us("tax");const c=nt?.updateEditReservationSummary;typeof c=="function"&&c()}function Us(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const i=nt?.updateEditReservationSummary;typeof i=="function"&&i()};if(Ss){a();return}Ss=!0;const s=()=>{Ss=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(un)),t.disabled){n.checked=!1,A(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),vt("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?vt("edit-res-company-share"):n.checked&&(n.checked=!1));s()}async function pr(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:i,ensureModal:r}={}){const{customers:c,projects:l}=fe(),u=Lt()?.[e];if(!u){A(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}nt={...nt,reservation:u,projects:l||[]},t?.(),bp(l||[],u);const b=u.projectId&&l?.find?.(M=>String(M.id)===String(u.projectId))||null,{effectiveConfirmed:f,projectLinked:m}=Xt(u,b),p=u.items?u.items.map(M=>({...M,equipmentId:M.equipmentId??M.equipment_id??M.id,barcode:ce(M?.barcode)})):[],g=mp(u,p),I=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(M=>ec(M)).filter(Boolean);en(e,g,I);const S=o("reservations.list.unknownCustomer","غير معروف"),N=c?.find?.(M=>String(M.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const x=document.getElementById("edit-res-id");x&&(x.value=u.reservationId||u.id);const O=document.getElementById("edit-res-customer");O&&(O.value=N?.customerName||S);const w=typeof a=="function"?a(u.start):{date:"",time:""},_=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",w.date),n?.("edit-res-start-time",w.time),n?.("edit-res-end",_.date),n?.("edit-res-end-time",_.time);const j=document.getElementById("edit-res-notes");j&&(j.value=u.notes||"");const T=document.getElementById("edit-res-discount");if(T){const M=m?0:u.discount??0;T.value=v(M)}const X=document.getElementById("edit-res-discount-type");X&&(X.value=m?"percent":u.discountType||"percent");const C=u.projectId?!1:!!u.applyTax,D=document.getElementById("edit-res-tax");D&&(D.checked=C);const G=document.getElementById("edit-res-company-share");if(G){const M=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,V=M!=null?Number.parseFloat(v(String(M).replace("%","").trim())):NaN,H=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,te=H!=null?H===!0||H===1||H==="1"||String(H).toLowerCase()==="true":Number.isFinite(V)&&V>0,ue=te&&Number.isFinite(V)&&V>0?V:un,se=C||te;G.checked=se,G.dataset.companyShare=String(ue)}Wn(f,{disable:m});const B=document.getElementById("edit-res-paid"),F=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");B&&(B.value=F,B.dataset&&delete B.dataset.userSelected);const L=document.getElementById("edit-res-payment-progress-type"),Q=document.getElementById("edit-res-payment-progress-value");L?.dataset?.userSelected&&delete L.dataset.userSelected,L&&(L.value="percent"),yp(Q);const J=document.getElementById("edit-res-cancelled");if(J){const M=String(u?.status||u?.reservationStatus||"").toLowerCase();J.checked=["cancelled","canceled"].includes(M),J.checked&&Wn(f,{disable:!0})}let R=Array.isArray(u.crewAssignments)&&u.crewAssignments.length?u.crewAssignments:Array.isArray(u.techniciansDetails)&&u.techniciansDetails.length?u.techniciansDetails:(u.technicians||[]).map(M=>String(M));if(!Array.isArray(R)||R.length===0){const M=rl(u.id??u.reservationId??u.reservation_code??null);Array.isArray(M)&&M.length&&(R=M)}try{await xr()}catch(M){console.warn("[reservationsEdit] positions load failed (non-fatal)",M)}if(ol(R),s?.(g),typeof window<"u"){const M=window?.renderEditPaymentHistory;typeof M=="function"&&M()}tc(),i?.();const W=document.getElementById("editReservationModal");Vs=fp(W,r),Vs?.show?.()}async function gp({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:i,populateEquipmentDescriptionLists:r,handleReservationsMutation:c}={}){if(Cn===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const l=document.getElementById("edit-res-start")?.value?.trim(),d=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),b=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",f=document.getElementById("edit-res-notes")?.value||"",m=v(document.getElementById("edit-res-discount")?.value||"0");let p=parseFloat(m)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const q=qa(),I=document.getElementById("edit-res-paid"),S=I?.dataset?.userSelected==="true",N=S&&I?.value||"unpaid",x=document.getElementById("edit-res-payment-progress-type"),O=document.getElementById("edit-res-payment-progress-value"),w=Yo(x),_=Zo(O),j=document.getElementById("edit-res-project")?.value||"",X=document.getElementById("edit-res-cancelled")?.checked===!0,C=al();C.map(K=>K?.technicianId).filter(Boolean);const D=document.getElementById("edit-res-company-share"),G=document.getElementById("edit-res-tax");if(!l||!u){A(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const B=typeof e=="function"?e:(K,me)=>`${K}T${me||"00:00"}`,F=B(l,d),L=B(u,b);if(F&&L&&new Date(F)>new Date(L)){A(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const J=Lt()?.[Cn];if(!J){A(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(wt)||wt.length===0&&C.length===0){A(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const R=typeof t=="function"?t:()=>!1,W=J.id??J.reservationId;for(const K of wt){if(K?.type==="package"&&Array.isArray(K.packageItems)){for(const h of K.packageItems){const z=h?.barcode??h?.normalizedBarcode??"";if(!z)continue;const k=Ft(z);if(k==="reserved"){const ee=ce(z);if(!R(ee,F,L,W))continue}if(k!=="available"){A(bn(k));return}}continue}const me=Ft(K.barcode);if(me==="reserved"){const h=ce(K.barcode);if(!R(h,F,L,W))continue}if(me!=="available"){A(bn(me));return}}for(const K of wt){if(K?.type==="package"&&Array.isArray(K.packageItems)){for(const h of K.packageItems){const z=ce(h?.barcode??h?.normalizedBarcode??"");if(z&&R(z,F,L,W)){const k=h?.desc||h?.barcode||o("reservations.create.packages.unnamedItem","معدة بدون اسم"),ee=`${o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${v(String(k))})`;A(ee);return}}continue}const me=ce(K.barcode);if(R(me,F,L,W)){A(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const M=typeof n=="function"?n:()=>!1;for(const K of wt){if(K?.type!=="package")continue;const me=K.packageId??K.package_id??null;if(me&&M(me,F,L,W)){const h=K.desc||K.packageName||o("reservations.create.packages.genericName","الحزمة");A(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${v(String(h))} محجوزة بالفعل في الفترة المختارة`));return}}const V=typeof a=="function"?a:()=>!1;for(const K of C)if(K?.technicianId&&V(K.technicianId,F,L,W)){A(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const H=Array.isArray(nt.projects)&&nt.projects.length?nt.projects:fe().projects||[],te=j&&H.find(K=>String(K.id)===String(j))||null,ue={...J,projectId:j?String(j):null,confirmed:q},{effectiveConfirmed:se,projectLinked:xe,projectStatus:_e}=Xt(ue,te);let Y=!!D?.checked,ie=!!G?.checked;if(xe&&(Y&&(D.checked=!1,Y=!1),ie=!1),!xe&&Y!==ie){A(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}ie&&(vt("edit-res-company-share"),Y=!!D?.checked);let Se=Y?getCompanySharePercent("edit-res-company-share"):null;Y&&(!Number.isFinite(Se)||Se<=0)&&(vt("edit-res-company-share"),Se=getCompanySharePercent("edit-res-company-share"));const Pe=Y&&ie&&Number.isFinite(Se)&&Se>0,Je=xe?!1:ie;xe&&(p=0,g="percent");const Qe=Ys(wt,p,g,Je,C,{start:F,end:L,companySharePercent:Pe?Se:0});let Ie=os();if(Number.isFinite(_)&&_>0){const K=Qe;let me=null,h=null;w==="amount"?(me=_,K>0&&(h=_/K*100)):(h=_,K>0&&(me=_/100*K));const z=ec({type:w,value:_,amount:me,percentage:h,recordedAt:new Date().toISOString()});z&&(Ie=[...Ie,z],ki(Ie)),O&&(O.value="")}const ye=Zs({totalAmount:Qe,history:Ie}),we=ei({manualStatus:N,paidAmount:ye.paidAmount,paidPercent:ye.paidPercent,totalAmount:Qe});I&&!S&&(I.value=we,I.dataset&&delete I.dataset.userSelected);let ke=J.status??"pending";xe?ke=te?.status??_e??ke:X?ke="cancelled":["completed","cancelled"].includes(String(ke).toLowerCase())||(ke=q?"confirmed":"pending");const Ye=Sr({reservationCode:J.reservationCode??J.reservationId??null,customerId:J.customerId,start:F,end:L,status:ke,title:J.title??null,location:J.location??null,notes:f,projectId:j?String(j):null,totalAmount:Qe,discount:p,discountType:g,applyTax:Je,paidStatus:we,confirmed:se,items:wt.map(K=>({...K,equipmentId:K.equipmentId??K.id})),crewAssignments:C,companySharePercent:Pe?Se:null,companyShareEnabled:Pe,paidAmount:ye.paidAmount,paidPercentage:ye.paidPercent,paymentProgressType:ye.paymentProgressType,paymentProgressValue:ye.paymentProgressValue,paymentHistory:Ie});try{ur("about to submit",{editingIndex:Cn,crewAssignments:C,techniciansPayload:Ye?.technicians,payload:Ye});const K=await sl(J.id||J.reservationId,Ye);ur("server response",{reservation:K?.id??K?.reservationId??K?.reservation_code,technicians:K?.technicians,crewAssignments:K?.crewAssignments,techniciansDetails:K?.techniciansDetails}),await ai(),Dn(),pn(),et(),A(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),Jo(),c?.({type:"updated",reservation:K}),i?.(),r?.(),Vs?.hide?.()}catch(K){console.error("❌ [reservationsEdit] Failed to update reservation",K);const me=Ua(K)?K.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");A(me,"error")}}function Gp(e={}){nt={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=nt,i=document.getElementById("edit-res-discount");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",()=>{i.value=v(i.value),t?.()}),i.dataset.listenerAttached="true");const r=document.getElementById("edit-res-discount-type");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>t?.()),r.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{Us("tax")}),c.dataset.listenerAttached="true");const l=document.getElementById("edit-res-company-share");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{Us("share")}),l.dataset.listenerAttached="true");const d=document.getElementById("edit-res-payment-progress-type");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{d.dataset.userSelected="true",t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=v(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const b=document.getElementById("edit-res-project");b&&!b.dataset.listenerAttached&&(b.addEventListener("change",()=>{tc();const I=Array.isArray(nt.projects)&&nt.projects.length?nt.projects:fe().projects||[],S=b.value&&I.find(_=>String(_.id)===String(b.value))||null,x={...nt?.reservation??{},projectId:b.value||null,confirmed:qa()},{effectiveConfirmed:O,projectLinked:w}=Xt(x,S);Wn(O,{disable:w}),t?.()}),b.dataset.listenerAttached="true");const f=document.getElementById("edit-res-confirmed-btn");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{if(f.disabled)return;const I=!qa();Wn(I),t?.()}),f.dataset.listenerAttached="true");const m=document.getElementById("edit-res-cancelled");m&&!m.dataset.listenerAttached&&(m.addEventListener("change",()=>{document.getElementById("edit-res-confirmed-btn")&&Wn(qa(),{disable:m.checked}),t?.()}),m.dataset.listenerAttached="true");const p=document.getElementById("save-reservation-changes");p&&!p.dataset.listenerAttached&&(p.addEventListener("click",()=>{gp(nt).catch(I=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",I)})}),p.dataset.listenerAttached="true");const g=document.getElementById("edit-res-equipment-barcode");if(g&&!g.dataset.listenerAttached){let I=null;const S=()=>{g.value?.trim()&&(clearTimeout(I),I=null,n?.(g))};g.addEventListener("keydown",x=>{x.key==="Enter"&&(x.preventDefault(),S())});const N=()=>{if(clearTimeout(I),!g.value?.trim())return;const{start:x,end:O}=getEditReservationDateRange();!x||!O||(I=setTimeout(()=>{S()},150))};g.addEventListener("input",N),g.addEventListener("change",S),g.dataset.listenerAttached="true"}Xo?.();const q=document.getElementById("editReservationModal");q&&!q.dataset.cleanupAttached&&(q.addEventListener("hidden.bs.modal",()=>{Jo(),t?.(),s?.([])}),q.dataset.cleanupAttached="true")}const hp=fe()||{};let ht=(hp.projects||[]).map(sc),ia=!1;function vp(){return ht}function ra(e){ht=Array.isArray(e)?e.map($i):[],Ha({projects:ht});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return ht}async function nc(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,l])=>{l==null||l===""||t.set(c,String(l))});const n=t.toString(),s=(await qt(`/projects/${n?`?${n}`:""}`))?.data;let i=[];Array.isArray(s)?i=s:s&&typeof s=="object"&&(Array.isArray(s.items)?i=s.items:Array.isArray(s.results)?i=s.results:Array.isArray(s.data)?i=s.data:Array.isArray(s.records)&&(i=s.records));const r=i.map(cs);return ra(r),ia=!0,ht}async function ac({force:e=!1,params:t=null}={}){if(!e&&ia&&ht.length>0)return ht;try{return await nc(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),ht}}async function qp(e){const t=await qt("/projects/",{method:"POST",body:e}),n=cs(t?.data??{}),a=[...ht,n];return ra(a),ia=!0,n}async function Sp(e,t){const n=await qt(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=cs(n?.data??{}),s=ht.map(i=>String(i.id)===String(e)?a:i);return ra(s),ia=!0,a}async function Ep(e){await qt(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=ht.filter(n=>String(n.id)!==String(e));ra(t),ia=!0}function wp({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:i,start:r,end:c,applyTax:l,paymentStatus:d,equipmentEstimate:u=0,expenses:b=[],servicesClientPrice:f=0,taxAmount:m=0,totalWithTax:p=0,discount:g=0,discountType:q="percent",companyShareEnabled:I=!1,companySharePercent:S=null,companyShareAmount:N=0,paidAmount:x=null,paidPercentage:O=null,paymentProgressType:w=null,paymentProgressValue:_=null,confirmed:j=!1,technicians:T=[],equipment:X=[],payments:C,paymentHistory:D}={}){const G=Array.isArray(T)?T.map(V=>Number.parseInt(String(V),10)).filter(V=>Number.isInteger(V)&&V>0):[],B=Array.isArray(X)?X.map(V=>{const H=Number.parseInt(String(V.equipmentId??V.equipment_id??V.id??0),10),te=Number.parseInt(String(V.qty??V.quantity??0),10);return!Number.isInteger(H)||H<=0?null:{equipment_id:H,quantity:Number.isInteger(te)&&te>0?te:1}}).filter(Boolean):[],F=Array.isArray(b)?b.map(V=>{const H=Number.parseFloat(V?.amount??V?.value??0)||0,te=(V?.label??V?.name??"").trim();if(!te)return null;const ue=Number.parseFloat(V?.salePrice??V?.sale_price??0)||0,se=(V?.note??V?.notes??"").toString().trim();return{label:te,amount:Math.round(H*100)/100,sale_price:Math.max(0,Math.round(ue*100)/100),note:se||void 0,...se?{notes:se}:{}}}).filter(Boolean):[],L=F.reduce((V,H)=>V+(H?.amount??0),0),Q={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:i??null,start_datetime:r??null,end_datetime:c||null,apply_tax:!!l,payment_status:d??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(L*100)/100,services_client_price:Number.isFinite(Number(f))?Math.round(Number(f)*100)/100:0,tax_amount:Math.round((Number.parseFloat(m)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(p)||0)*100)/100,confirmed:!!j,technicians:G,equipment:B,expenses:F},J=Math.max(0,Number.parseFloat(g)||0);Q.discount=J,Q.discount_type=q==="amount"?"amount":"percent";const R=Number.parseFloat(S),W=!!I&&Number.isFinite(R)&&R>0;Q.company_share_enabled=W,Q.company_share_percent=W?R:0,Q.company_share_amount=W?Math.max(0,Number.parseFloat(N)||0):0,Number.isFinite(Number(x))&&(Q.paid_amount=Math.max(0,Number.parseFloat(x)||0)),Number.isFinite(Number(O))&&(Q.paid_percentage=Math.max(0,Number.parseFloat(O)||0)),(w==="amount"||w==="percent")&&(Q.payment_progress_type=w),_!=null&&_!==""&&(Q.payment_progress_value=Number.parseFloat(_)||0),e&&(Q.project_code=String(e).trim());const M=C!==void 0?C:D;if(M!==void 0){const V=ic(M)||[];Q.payments=V.map(H=>({type:H.type,amount:H.amount!=null?H.amount:null,percentage:H.percentage!=null?H.percentage:null,value:H.value!=null?H.value:null,note:H.note??null,recorded_at:H.recordedAt??null}))}return Q.end_datetime||delete Q.end_datetime,Q.client_company||(Q.client_company=null),Q}function cs(e={}){return $i(e)}function sc(e={}){return $i(e)}function $i(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(p=>{if(p==null)return null;if(typeof p=="object"){const g=p.id??p.technician_id??p.technicianId;return g!=null?String(g):null}return String(p)}).filter(Boolean),i=(Array.isArray(e.equipment)?e.equipment:[]).map(p=>{const g=p?.equipment_id??p?.equipmentId??p?.id??null,q=p?.quantity??p?.qty??0,I=p?.barcode??p?.code??"",S=p?.description??p?.name??"";return{equipmentId:g!=null?String(g):null,qty:Number.parseInt(String(q),10)||0,barcode:I,description:S}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((p,g)=>({id:p?.id??`expense-${t??"x"}-${g}`,label:p?.label??"",amount:Number.parseFloat(p?.amount??0)||0,salePrice:Number.parseFloat(p?.sale_price??p?.salePrice??0)||0,note:p?.note??p?.notes??""})),l=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,d=e.company_share_enabled??e.companyShareEnabled,u=d!=null?d===!0||d===1||String(d).toLowerCase()==="true":l>0,b=e.payment_history??e.paymentHistory??e.payments??null,f=ic(b),m=(()=>{const p=e.cancelled??e.canceled??e.is_cancelled??e.isCanceled;if(p===!0||p==="true"||p===1||p==="1")return!0;if(typeof p=="string"){const g=p.toLowerCase();return g==="yes"||g==="cancelled"||g==="canceled"}return!1})();return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,status:(()=>{const p=String(e.status??e.project_status??"").toLowerCase();if(m||p==="cancelled"||p==="canceled"||p==="ملغي"||p==="ملغى")return"cancelled";if(p==="completed"||p==="مكتمل")return"completed";if(p==="ongoing"||p==="in_progress"||p==="قيد التنفيذ")return"ongoing";if(p==="upcoming"||p==="قادم")return"upcoming"})(),cancelled:m,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,servicesClientPrice:Number.parseFloat(e.services_client_price??e.servicesClientPrice??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?l:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(p=>typeof p=="object"?p:{id:p}),equipment:i,expenses:c,paymentHistory:f}}function Ap(e){return e instanceof mr}function Es(e){if(e==null||e==="")return null;const t=v(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const i=Number.parseFloat(n);return Number.isFinite(i)?i:null}function xp(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=Es(e.value);let s=Es(e.amount),i=Es(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&i==null&&a!=null&&(i=a),!n)if(s!=null&&s>=0)n="amount";else if(i!=null&&i>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(i==null||!Number.isFinite(i)||i<0)return null;i=Math.min(100,Math.round(i*100)/100)}const r=e.note??e.memo??e.description??null,c=r!=null?String(r).trim():null,l=e.recordedAt??e.recorded_at??e.date??null;let d=null;if(l){const b=new Date(l);Number.isNaN(b.getTime())||(d=b.toISOString())}d||(d=new Date().toISOString());const u=n==="amount"?s:n==="percent"?i:a;return{type:n,amount:s??null,percentage:i??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:d}}function ic(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>xp(t)).filter(Boolean):[]}const Wp=Object.freeze(Object.defineProperty({__proto__:null,buildProjectPayload:wp,createProjectApi:qp,deleteProjectApi:Ep,ensureProjectsLoaded:ac,getProjectsState:vp,isApiError:Ap,mapLegacyProject:sc,mapProjectFromApi:cs,refreshProjectsFromApi:nc,setProjectsState:ra,updateProjectApi:Sp},Symbol.toStringTag,{value:"Module"})),Oa="reservations-ui:ready",cn=typeof EventTarget<"u"?new EventTarget:null;let ln={};function _p(e){return Object.freeze({...e})}function Ip(){if(!cn)return;const e=ln,t=typeof CustomEvent=="function"?new CustomEvent(Oa,{detail:e}):{type:Oa,detail:e};typeof cn.dispatchEvent=="function"&&cn.dispatchEvent(t)}function kp(e={}){if(!e||typeof e!="object")return ln;const t={...ln};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),ln=_p(t),Ip(),ln}function $p(e){if(e)return ln?.[e]}function Xp(e){const t=$p(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const r=(s?.detail||ln)?.[e];typeof r=="function"&&(cn&&cn.removeEventListener(Oa,a),n(r))};cn&&cn.addEventListener(Oa,a)})}function Jp(){return ac().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=fe()||{};cl(e||[]),so()})}function Ci(e=null){so(),rc(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Cp(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Qs(){return{populateEquipmentDescriptionLists:Wt,setFlatpickrValue:ip,splitDateTime:gr,renderEditItems:Yt,updateEditReservationSummary:mt,addEquipmentByDescription:sp,addEquipmentToEditingReservation:ap,addEquipmentToEditingByDescription:za,combineDateTime:Jn,hasEquipmentConflict:_t,hasTechnicianConflict:qr,renderReservations:rc,handleReservationsMutation:Ci,ensureModal:Cp}}function rc(e="reservations-list",t=null){Ou({containerId:e,filters:t,onShowDetails:oc,onConfirmReservation:lc})}function oc(e){return Hu(e,{getEditContext:Qs,onEdit:(t,{reservation:n})=>{dc(t,n)},onDelete:cc})}function cc(e){return gn()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?Ku(e,{onAfterChange:Ci}):!1:(ta(),!1)}function lc(e){return Uu(e,{onAfterChange:Ci})}function dc(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",i)}pr(e,Qs());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",i)}pr(e,Qs());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const i=t.id??t.reservationId;n.set("reservationEditId",String(i));try{localStorage.setItem("pendingReservationEditId",String(i)),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",r)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",i)}}Kc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(i=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",i)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Yp(){kp({showReservationDetails:oc,deleteReservation:cc,confirmReservation:lc,openReservationEditor:dc})}export{jp as $,nc as A,Yp as B,ac as C,Ep as D,qp as E,Bp as F,Gp as G,Jp as H,Qp as I,Tp as J,Ci as K,so as L,Mp as M,mt as N,Rp as O,zp as P,Qs as Q,ve as R,cc as S,lc as T,dc as U,ip as V,Fn as W,bl as X,Aa as Y,Lp as Z,jl as _,et as a,Wp as a0,Ji as b,co as c,lo as d,Up as e,rc as f,io as g,$p as h,wp as i,kp as j,oc as k,Op as l,cs as m,Hp as n,vp as o,Ap as p,Ad as q,aa as r,uo as s,ro as t,Sp as u,Vp as v,Xp as w,Kp as x,Fp as y,Dp as z};
