import{n as v,l as ge,A as Vc,t as o,a as xt,s as A,u as Sn,c as sa,d as Ka,b as fr,z as Kc,f as mt,B as yr,o as Uc}from"./auth.D26aJb88.js";import{B as le,C as Nt,E as br,F as Qc,D as yn,G as Ws,n as ct,H as gr,I as Ri,J as ea,K as ta,L as Ua,M as Gc,N as Xs,O as Lt,P as Js,Q as Dn,R as hr,S as Ys,T as Wc,U as Xc,V as Jc,W as vr,X as En,Y as wa,Z as Yc,_ as Qa,$ as qr,a0 as Sr,a as Zs,o as ei,q as ti,a1 as Er,a2 as Zc,s as bn,h as Ga,a3 as el,a4 as wr,a5 as tl,i as ni,r as nn,a6 as ai,a7 as Wt,a8 as Aa,m as $e,p as Qe,y as Wa,b as Ar,a9 as xr,l as si,g as Mt,aa as As,j as Ir,z as nl,ab as al,ac as xs,ad as sl,u as il,ae as rl,af as ol,ag as cl,ah as ll}from"./reservationsService.BnprjwAK.js";const ys="select.form-select:not([data-no-enhance]):not([multiple])",jt=new WeakMap;let bs=null,Mi=!1,Rt=null;function jp(e=document){e&&(e.querySelectorAll(ys).forEach(t=>ga(t)),!bs&&e===document&&(bs=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(ys)&&ga(a),a.querySelectorAll?.(ys).forEach(s=>ga(s)))})}),bs.observe(document.body,{childList:!0,subtree:!0})),Mi||(Mi=!0,document.addEventListener("pointerdown",pl,{capture:!0})))}function ba(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){ga(e);return}const t=e.closest(".enhanced-select");t&&(ii(t),xa(t),Is(t))}function ga(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){ba(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const i={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};jt.set(t,i),a.addEventListener("click",()=>ul(t)),a.addEventListener("keydown",r=>ml(r,t)),s.addEventListener("click",r=>yl(r,t)),s.addEventListener("keydown",r=>fl(r,t)),e.addEventListener("change",()=>{xa(t),_r(t)}),i.observer=new MutationObserver(r=>{let c=!1,l=!1;for(const d of r)d.type==="attributes"&&d.attributeName==="disabled"&&(l=!0),d.type==="childList"&&(c=!0);l&&Is(t),c&&dl(i,t)}),i.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),ii(t),xa(t),Is(t)}function dl(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,ii(t),xa(t)})))}function ii(e){const t=jt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),i=document.createDocumentFragment();s.forEach(r=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=r.textContent??r.value??"",c.dataset.value=r.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),r.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),r.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),i.appendChild(c)}),a.innerHTML="",a.appendChild(i),_r(e)}function xa(e){const t=jt.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],i=s?.textContent?.trim()||s?.value||"";a.textContent=i}function _r(e){const t=jt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(r=>{const c=r.dataset.value===s;r.toggleAttribute("aria-selected",c),r.dataset.selected=c?"true":"",r.setAttribute("tabindex",c?"0":"-1")})}function Is(e){const t=jt.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function ul(e){jt.get(e)&&(e.getAttribute("data-open")==="true"?Rn(e):kr(e))}function kr(e){const t=jt.get(e);if(!t)return;Rt&&Rt!==e&&Rn(Rt,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),Rt=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function Rn(e,{focusTrigger:t=!0}={}){const n=jt.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),Rt===e&&(Rt=null))}function pl(e){if(!Rt)return;const t=e.target;t instanceof Node&&(Rt.contains(t)||Rn(Rt,{focusTrigger:!1}))}function ml(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),kr(t)):n==="Escape"&&Rn(t)}function fl(e,t){const n=e.key,a=jt.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const i=s.findIndex(r=>r===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(i+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const r=document.activeElement;r&&r.classList.contains("enhanced-select__option")&&$r(r,t)}else n==="Escape"&&(e.preventDefault(),Rn(t))}function yl(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&$r(n,t)}function $r(e,t){const n=jt.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),Rn(t)}const Mn=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let zt=null;function ri(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function Pr(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function bl(e={}){const t={...e};return t.barcode&&(t.barcode=v(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function gl(e={}){const t=bl({...e,activatedAt:Date.now()});return zt=t,Pr(!0,t.mode||"create"),ri(Mn.change,{active:!0,selection:{...t}}),t}function Ia(e="manual"){if(!zt)return;const t=zt;zt=null,Pr(!1),ri(Mn.change,{active:!1,previous:t,reason:e})}function Cr(){return!!zt}function hl(){return zt?{...zt}:null}function vl(e){if(!zt)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=v(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:i,description:r}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const l=c.map(u=>v(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!l.length)return!1;const d=Number.isInteger(s)&&s>0?s:l.length;t={barcodes:l,quantity:Math.min(d,l.length)},i&&(t.groupKey=i),r&&(t.description=r)}else return!1;return ri(Mn.requestAdd,{...t,selection:{...zt}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||Ia("tab-changed")});const ql=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Sl=new Set(["maintenance","reserved","retired"]);function El(e){const t=String(e??"").trim().toLowerCase();return t&&ql.get(t)||"available"}function wl(e){return e?typeof e=="object"?e:Xa(e):null}function Vt(e){const t=wl(e);return t?El(t.status||t.state||t.statusLabel||t.status_label):"available"}function Nr(e){return!Sl.has(Vt(e))}function wn(e={}){return e.image||e.imageUrl||e.img||""}function Al(e){if(!e)return null;const t=le(e),{equipment:n=[]}=ge();return(n||[]).find(a=>le(a?.barcode)===t)||null}function Xa(e){const t=le(e);if(!t)return null;const{equipment:n=[]}=ge();return(n||[]).find(a=>le(a?.barcode)===t)||null}const xl=ge()||{};let Xt=(xl.equipment||[]).map(kl),_s=!1,kn="",un=null,gn=null,hn=null,Ja=!1,zi=!1;function Il(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function _l(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function kl(e={}){return oi({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function Ya(e={}){return oi(e)}function oi(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",i=ia(e.quantity??e.qty??0),r=Za(e.unit_price??e.price??0),c=v(String(e.barcode??"").trim()),l=at(e.status??e.state??e.status_label??e.statusLabel??"available"),d=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:$l(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:i,price:r,barcode:c,status:l,image:d,imageUrl:d,created_at:e.created_at??null,updated_at:e.updated_at??null}}function $l(e){return e!=null&&e!==""}function ia(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function Za(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function Pl(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=v(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const i=s.length-a.length,r=t+i,c=n+i;e.setSelectionRange(r,c)}}),e.dataset.englishDigitsAttached="true")}function Oi(e){if(!e)return"";const t=v(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=v(String(n?.barcode??"")).trim();if(a)return a}return""}function Cl(e,t){const n=Oi(e),a=Oi(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,i=s.test(n),r=s.test(a);if(i&&r){if(n.length!==a.length)return n.length-a.length;const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}else{if(i!==r)return i?-1:1;{const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}}const c=ka(e?.desc||e?.description||e?.name||""),l=ka(t?.desc||t?.description||t?.name||"");return c.localeCompare(l,"ar",{sensitivity:"base"})}function Ge(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function at(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function Nl(e){return at(e)}function _a(){if(!Cr())return null;const e=hl();return e?{...e}:null}function Ll(e){const t=_a();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:i=null}=t,r=t?.mode||t?.source||"",c=[],l=new Set;if(n.forEach(f=>{const m=le(f?.barcode);!m||l.has(m)||(l.add(m),c.push({variant:f,barcode:m}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(r==="package-manager"||r==="equipment-packages"){const f=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:m})=>m),maxQuantity:f,reason:""}}const d=c.filter(({variant:f})=>{const m=at(f?.status);return m!=="maintenance"&&m!=="retired"});if(!a||!s)return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=d.filter(({barcode:f})=>!Nt(f,a,s,i));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:f})=>f),maxQuantity:u.length};let b=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(d.length>0)b=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const f=new Set(c.map(({variant:m})=>at(m?.status)));f.has("maintenance")?b=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):f.has("reserved")?b=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):f.has("retired")&&(b=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:b,availableBarcodes:[],maxQuantity:0}}function jl(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function Lr(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=_a();e.hidden=!s;const i=s?.mode||s?.source||"";s?i==="package-manager"||i==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=_a(),l=c?.mode||c?.source||"";l==="package-manager"||l==="equipment-packages"?Ia("package-finish-button"):(Ia("return-button"),jl())}),t.dataset.listenerAttached="true")}function ft(){return Xt}function vn(e){Xt=Array.isArray(e)?e.map(oi):[],Ka({equipment:Xt}),_l()}function ka(e){return String(e??"").trim().toLowerCase()}function Zt(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=ka(t);return n||(n=ka(e.category||"")),n||(n=v(String(e.barcode||"")).trim().toLowerCase()),n}function es(e){const t=Zt(e);return t?ft().filter(n=>Zt(n)===t):[]}function ts(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=ns(e);if(n){const a=Ge(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${Ge(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function ci(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function $a(){const e=ci();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function li(e={}){const t=ci();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?v(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?v(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function jn(e){Ja=e;const t=ci(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(r=>{r&&(e?r.removeAttribute("disabled"):r.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const r=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(r,c),a.dataset.mode=e?"save":"view"}if(e){const r=t.description||t.category||t.subcategory;r&&setTimeout(()=>{r.focus(),typeof r.select=="function"&&r.select()},0)}}async function Tl(e){if(!Sn()){sa();return}if(!e)return;try{await Fl()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),i=s.Sheets[s.SheetNames[0]],r=XLSX.utils.sheet_to_json(i,{defval:""});if(!Array.isArray(r)||r.length===0){A(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let l=0;if(r.forEach(d=>{const u=d.القسم??d.category??"",b=d["القسم الثانوي"]??d.subcategory??"",f=d.الوصف??d.description??d.name??"",m=d.الكمية??d.quantity??0,p=d.السعر??d.price??0,g=d.الباركود??d.barcode??"",q=d.الحالة??d.status??"متاح",_=d.الصورة??d.image_url??d.image??"",S=v(String(g||"")).trim();if(!f||!S){l+=1;return}c.push(di({category:u,subcategory:b,description:f,quantity:m,unit_price:p,barcode:S,status:q,image_url:_}))}),!c.length){A(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const d=await xt("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(d?.data)?d.data.map(Ya):[];if(u.length){const m=[...ft(),...u];vn(m)}await ra({showToastOnError:!1}),st();const b=d?.meta?.count??u.length,f=[];b&&f.push(`${b} ✔️`),l&&f.push(`${l} ⚠️`),A(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(f.length?` (${f.join(" / ")})`:""))}catch(d){const u=On(d,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");A(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),A(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),A(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const Bl="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let Vn=null;function Fl(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):Vn||(Vn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",i,{once:!0});return}const a=document.createElement("script");a.src=Bl,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",i,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function i(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),Vn=null,e}),Vn)}function di({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:i="",status:r="متاح",image_url:c=""}){const l=v(String(i||"")).trim(),d=Nl(r);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:ia(a),unit_price:Za(s),barcode:l,status:d,image_url:c?.trim()||null}}async function jr(){if(!Sn()){sa();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await xt("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await ra({showToastOnError:!1}),A(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=On(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");A(t,"error")}}function ns(e){return e.image||e.imageUrl||e.img||""}function Dl(e){const t=at(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function Pa(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${Ge(a)}</td></tr>`}n&&(n.textContent="0")}function Tr(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const i=un?.groupKey||Zt(e);if(!i){Pa();return}const r=ft().filter(b=>Zt(b)===i).sort((b,f)=>{const m=String(b.barcode||"").trim(),p=String(f.barcode||"").trim();return!m&&!p?0:m?p?m.localeCompare(p,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!r.length){Pa();return}t.hidden=!1,a&&(a.textContent=String(r.length));const c=o("equipment.modal.variants.current","الحالي"),l=o("equipment.form.labels.quantity","الكمية"),d=ft(),u=r.map(b=>{const f=b.id&&e.id?String(b.id)===String(e.id):String(b.barcode||"")===String(e.barcode||""),m=f?"equipment-variants-table__row--current":"",p=Ge(String(b.barcode||"-")),g=f?`<span class="equipment-variants-current-badge">${Ge(c)}</span>`:"",q=v(String(Number.isFinite(Number(b.qty))?Number(b.qty):0)),_=d.indexOf(b),S=Ge(o("equipment.item.actions.delete","🗑️ حذف")),N=_>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${_}">${S}</button>
          </div>`:"";return`
        <tr class="${m}">
          <td>
            ${p}
            ${g}
          </td>
          <td>${Dl(b.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${Ge(l)}">${q}</span>
          </td>
          <td class="table-actions-cell">${N}</td>
        </tr>
      `}).join("");n.innerHTML=u}function Rl({item:e,index:t}){const n=ns(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),i=o("equipment.item.currency","SR"),r=Sn(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},l=Number.isFinite(Number(e.qty))?Number(e.qty):0,d=Number.isFinite(Number(e.price))?Number(e.price):0,u=l.toLocaleString("en-US"),b=d.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),f=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,m=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,p=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(l-f-m,0),g=p.toLocaleString("en-US"),q=o("equipment.card.labels.availableOfTotal","من أصل"),_=at(e.status);let S=`${Ge(c.available)}: ${Ge(g)} ${Ge(q)} ${Ge(u)}`,N="available";if(p===0){const V={reserved:{text:l===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},O=V[_]||V.default;S=Ge(O.text),N=O.modifier}const x=`<span class="equipment-card__availability equipment-card__availability--${N}">${S}</span>`,z="",w=e.desc||e.name||"—",I=e.name&&e.name!==e.desc?e.name:"",B=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${b} ${i}`}].map(({label:V,value:O})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${V}</span>
              <span class="equipment-card__detail-value">${O}</span>
            </span>
          `).join("")}
    </div>`,X=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),P=X.length?`<div class="equipment-card__categories">${X.map(({label:V,value:O})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${V}</span>
              <span class="equipment-card__detail-value">${O}</span>
            </div>
          `).join("")}</div>`:"",D=I?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${I}</span>
      </div>`:"",F=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${w}</h3>
    </div>
  `}
      ${B}
    </div>
  `,L=[],j=Ll(e),Q=j?.availableBarcodes?.length?j.availableBarcodes.join(","):j?.barcode?j.barcode:"";let J="",R="";if(j.active){const V=`equipment-select-qty-${t}`,O=!!j.canSelect,ne=O?Math.max(1,Number(j.maxQuantity||j.availableBarcodes?.length||1)):1,pe=Math.max(1,Math.min(ne,99)),ae=[];for(let Ie=1;Ie<=pe;Ie+=1){const Te=v(String(Ie));ae.push(`<option value="${Ie}"${Ie===1?" selected":""}>${Te}</option>`)}const Pe=O?"":" disabled",Le=o("reservations.create.equipment.selector.quantityLabel","الكمية"),Y=O?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${v(String(ne))}`:j.reason?j.reason:"";J=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${V}">${Le}</label>
        <select class="equipment-card__quantity-select" id="${V}" data-equipment-select-quantity${Pe}>
          ${ae.join("")}
        </select>
        ${Y?`<span class="equipment-card__selection-hint">${Ge(Y)}</span>`:""}
      </div>
    `;const se=_a(),Ae=se?.mode||se?.source||"",tt=Ae==="package-manager"||Ae==="equipment-packages"?o("equipment.packages.selection.addToPackage","➕ أضف إلى الحزمة"):o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),Ye=O?"":" disabled",je=j.reason?` title="${Ge(j.reason)}"`:"",he=['data-equipment-action="select-reservation"',`data-selection-max="${O?ne:0}"`];Q&&he.push(`data-selection-barcodes="${Ge(Q)}"`),e.groupKey&&he.push(`data-selection-group="${Ge(String(e.groupKey))}"`),R=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${he.join(" ")}${Ye}${je}>${tt}</button>
    `}r&&L.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const W=L.length?L.join(`
`):"",M=Ge(w);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${Ge(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${M}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${z}
        ${x}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${F}
        </div>
      </div>
      <div class="equipment-card__body">
        ${P}
        ${D}
      </div>
      ${J||R||W?`<div class="equipment-card__actions equipment-card__actions--center">
            ${J}
            ${R}
            ${W}
          </div>`:""}
    </article>
  `}function Ml(e){const t=[...new Set(e.map(r=>r.category).filter(Boolean))],n=[...new Set(e.map(r=>r.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const r=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,a.appendChild(l)}),t.includes(r)&&(a.value=r),ba(a)}if(s){const r=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,s.appendChild(l)}),n.includes(r)&&(s.value=r),ba(s)}const i=document.getElementById("filter-status");i&&ba(i)}function zn(){const e=ge();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return Xt=t||[],Xt;const s=new Date;let i=!1;const r=new Set((a||[]).filter(l=>l?.status==="open").map(l=>v(String(l?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(l=>{if(!l)return l;const d=at(l.status),u=v(String(l.barcode??"")).trim().toLowerCase(),b=u&&r.has(u);let f=b?"maintenance":"available";if(!b&&u)for(const m of n||[]){if(!zl(m,s))continue;if(m.items?.some(g=>v(String(g?.barcode??"")).trim().toLowerCase()===u)){f="reserved";break}}return f!==d?(i=!0,{...l,status:f}):{...l,status:f}});return i?vn(c):(Xt=c,Ka({equipment:Xt})),Xt}function zl(e,t){if(!e?.start||!e?.end)return!1;const n=String(e?.status||e?.reservationStatus||"").toLowerCase();if(n==="cancelled"||n==="canceled")return!1;const a=new Date(e.start),s=new Date(e.end);return Number.isNaN(a.getTime())||Number.isNaN(s.getTime())?!1:a<=t&&t<s}function gs(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function st(){const e=document.getElementById("equipment-list");if(!e)return;Lr();const t=zn(),n=Array.isArray(t)?t:ft(),a=new Map;n.forEach(g=>{if(!g)return;const q=Zt(g);q&&(a.has(q)||a.set(q,[]),a.get(q).push(g))});const s=Array.from(a.values()).map(g=>{const q=g[0],_=g.reduce((I,T)=>I+(Number.isFinite(Number(T.qty))?Number(T.qty):0),0),S=["maintenance","reserved","available","retired"],N=g.map(I=>at(I.status)).sort((I,T)=>S.indexOf(I)-S.indexOf(T))[0]||"available",x=g.reduce((I,T)=>{const B=ia(T?.qty??0)||0,X=at(T?.status);return X==="reserved"?I.reserved+=B:X==="maintenance"&&(I.maintenance+=B),I},{reserved:0,maintenance:0}),z=Math.max(_-x.reserved-x.maintenance,0);return{item:{...q,qty:_,status:N,variants:g,groupKey:Zt(q),reservedQty:x.reserved,maintenanceQty:x.maintenance,availableQty:z},index:n.indexOf(q)}});s.sort((g,q)=>Cl(g.item,q.item));const i=document.getElementById("search-equipment")?.value||"",r=v(i).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",l=document.getElementById("filter-sub")?.value||"",d=document.getElementById("filter-status")?.value||"",u=d?at(d):"";if(_s&&!n.length){e.innerHTML=gs(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(kn&&!n.length){e.innerHTML=gs(kn,{tone:"error",icon:"⚠️"});return}const b=s.filter(({item:g})=>{const q=v(String(g.barcode??"")).toLowerCase().trim(),_=Array.isArray(g.variants)?g.variants.map(w=>v(String(w.barcode??"")).toLowerCase().trim()).filter(Boolean):[],S=!r||g.name&&g.name.toLowerCase().includes(r)||g.desc&&g.desc.toLowerCase().includes(r)||q&&q.includes(r)||_.some(w=>w.includes(r))||g.category&&g.category.toLowerCase().includes(r)||g.sub&&g.sub.toLowerCase().includes(r),N=!c||g.category===c,x=!l||g.sub===l,z=!u||at(g.status)===u;return S&&N&&x&&z}),f=r?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),m=b;e.innerHTML=m.length?m.map(Rl).join(""):gs(f);const p=document.getElementById("equipment-list-count");if(p){const g=o("equipment.list.countSuffix","عنصر"),q=v(String(m.length)),_=m.length?`${q} ${g}`:`0 ${g}`;p.textContent=_}Ml(n)}async function ra({showToastOnError:e=!0}={}){_s=!0,kn="",st();try{const t=await xt("/equipment/?all=1"),n=t?.data??t;let a=[];Array.isArray(n)?a=n:n&&typeof n=="object"&&(Array.isArray(n.items)?a=n.items:Array.isArray(n.results)?a=n.results:Array.isArray(n.data)?a=n.data:Array.isArray(n.records)&&(a=n.records));const s=a.map(Ya);vn(s)}catch(t){t&&typeof t=="object"&&Number(t.status)===401?kn="":(kn=On(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&A(kn,"error"))}finally{_s=!1,st()}}function On(e,t,n){if(e instanceof fr){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function Ol(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=v(a).trim(),i=Za(t.querySelector("#new-equipment-price")?.value||"0"),r=ia(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",l=t.querySelector("#new-equipment-category")?.value?.trim()||"",d=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){A(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const b=di({category:l,subcategory:d,description:n,quantity:r,unit_price:i,barcode:s,status:u,image_url:c});try{const f=await xt("/equipment/",{method:"POST",body:b}),m=Ya(f?.data),p=[...ft(),m];vn(p),st(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),A(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(f){const m=On(f,"equipment.toast.addFailed","تعذر إضافة المعدة");A(m,"error")}}async function Br(e){if(!Sn()){sa();return}const t=ft(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await xt(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),vn(a),st(),A(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=On(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");A(s,"error")}}async function Hl(e,t){const n=ft(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const i=[...n];i[e]={...i[e],...t},vn(i),st();return}const s=di({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const i=await xt(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),r=Ya(i?.data),c=[...n];c[e]=r,vn(c),st(),A(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(i){const r=On(i,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw A(r,"error"),i}}function ma(){st()}function Fr(e){const n=ft()[e];if(!n)return;gn=e;const a=es(n),s=a[0]||n,i=a.reduce((l,d)=>l+(Number.isFinite(Number(d.qty))?Number(d.qty):0),0),r=["maintenance","reserved","available","retired"],c=a.map(l=>at(l.status)).sort((l,d)=>r.indexOf(l)-r.indexOf(d))[0]||at(s.status);document.getElementById("edit-equipment-index").value=e,li({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(i||s.qty||0),price:s.price!=null?String(s.price):"0",image:ns(s)||"",barcode:s.barcode||"",status:s.status||c}),jn(!1),hn=$a(),ts(s),Tr(s),un={groupKey:Zt(s),barcode:String(s.barcode||""),id:s.id||null},Il(document.getElementById("editEquipmentModal"))?.show()}function Vl(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),i=s?.querySelector("[data-equipment-select-quantity]");let r=Number.parseInt(i?.value||"1",10);(!Number.isFinite(r)||r<=0)&&(r=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&r>c&&(r=c);const d=(t.dataset.selectionBarcodes||"").split(",").map(m=>m.trim()).filter(m=>m.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",b=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";vl({barcodes:d,quantity:r,groupKey:b,description:u})||A(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||Br(s).catch(i=>{console.error("❌ [equipment.js] deleteEquipment",i)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||Fr(s)}}function Kl(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||Fr(n)}}function Ul(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||Br(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function Dr(){if(!un||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=ft(),a=un.id?n.find(l=>String(l.id)===String(un.id)):null,s=un.groupKey,i=s?n.find(l=>Zt(l)===s):null,r=a||i;if(!r){Pa();return}const c=n.findIndex(l=>l===r);if(c>=0){const l=document.getElementById("edit-equipment-index");l&&(l.value=String(c)),gn=c}if(Tr(r),!Ja){const l=es(r),d=l[0]||r,u=l.reduce((m,p)=>m+(Number.isFinite(Number(p.qty))?Number(p.qty):0),0),b=["maintenance","reserved","available","retired"],f=l.map(m=>at(m.status)).sort((m,p)=>b.indexOf(m)-b.indexOf(p))[0]||at(d.status);li({category:d.category||"",subcategory:d.sub||"",description:d.desc||d.description||"",quantity:String(u||d.qty||0),price:d.price!=null?String(d.price):"0",image:ns(d)||"",barcode:d.barcode||"",status:d.status||f}),hn=$a()}ts(primary)}function Ql(){document.getElementById("search-equipment")?.addEventListener("input",ma),document.getElementById("filter-category")?.addEventListener("change",ma),document.getElementById("filter-sub")?.addEventListener("change",ma),document.getElementById("filter-status")?.addEventListener("change",ma),document.getElementById("add-equipment-form")?.addEventListener("submit",Ol);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),jr().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",Vl),t.addEventListener("keydown",Kl),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",Ul),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);Pl(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!Ja){hn=$a(),jn(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){A(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:ia(document.getElementById("edit-equipment-quantity").value)||1,price:Za(document.getElementById("edit-equipment-price").value)||0,barcode:v(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await Hl(t,n),hn=$a(),jn(!1),Dr()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{Ql(),st(),ra();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(hn&&li(hn),gn!=null){const a=ft()[gn];if(a){const i=es(a)[0]||a;ts(i)}}jn(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(st(),jn(Ja),gn!=null){const t=ft()[gn];if(t){const a=es(t)[0]||t;ts(a)}}});document.addEventListener("equipment:refreshRequested",()=>{ra({showToastOnError:!1})});document.addEventListener(Vc.USER_UPDATED,()=>{st()});document.addEventListener("equipment:changed",()=>{Dr()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{un=null,Pa(),gn=null,hn=null,jn(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!zi&&(document.addEventListener(Mn.change,()=>{Lr(),st()}),zi=!0);const Tp=Object.freeze(Object.defineProperty({__proto__:null,clearEquipment:jr,refreshEquipmentFromApi:ra,renderEquipment:st,syncEquipmentStatuses:zn,uploadEquipmentFromExcel:Tl},Symbol.toStringTag,{value:"Module"})),Gl="__DEBUG_CREW__";function Wl(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(Gl);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function Hi(e,t){if(Wl())try{console.log(`🪵 [crew-debug:create] ${e}`,t)}catch{}}const Rr="projects:create:draft",Mr="projects.html#projects-section";let ks=null,zr=[],$s=new Map,Ps=new Map,Ca=new Map,hs=!1,ha=null,Vi=!1,Or=[];function Xl(e){if(!e)return null;let t=Or.find(a=>a.id===e)||null;if(t)return t;const n=Ys(e);return n?(t={id:e,name:Xc(n)||e,price:Wc(n),items:Xs(n),raw:n},t):null}function Na(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function La(e){return v(String(e||"")).trim().toLowerCase()}function Jl(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=v(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function Hr(e){const t=v(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function Vr(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Kr(e){if(!e)return null;const t=v(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Ur(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=v(String(t))}}function qn(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function ui(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function An(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function ut(){const{input:e,hidden:t}=An();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function ln(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const i=document.querySelector(`label[for="${e.id}"]`);i&&n.add(i)}const s=i=>{t()&&A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(i=>{!i||i.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(r=>{i.addEventListener(r,s,{capture:!0})}),i.dataset.linkedGuardAttached="true")})}function Qr(e,t,{allowPartial:n=!1}={}){const a=ct(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const i=[];return e.forEach((r,c)=>{c.includes(a)&&i.push(r)}),i.length===1?i[0]:null}function Cs(e,t={}){return Qr($s,e,t)}function Ns(e,t={}){return Qr(Ps,e,t)}function pt(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function Gr(e){zr=Array.isArray(e)?[...e]:[]}function pi(){return zr}function mi(e){return e&&pi().find(t=>String(t.id)===String(e))||null}function Ki(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function Tn(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??yn,a=v(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:yn}function At(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??yn,a=v(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=yn),t.dataset.companyShare=String(s),t.checked=!0}function Ls(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(hs){Se();return}hs=!0;const a=()=>{hs=!1,Se()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(yn)),t.disabled){n.checked=!1,A(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),At()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?At():n.checked&&(n.checked=!1));a()}function Yl(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Ui(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function Qi(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function Ot({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=ui();if(!n||!a||!s)return;const i=Ws()||[],r=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",r);const l=new Set;$s=new Map;const d=i.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:Qi(m)||c})).filter(m=>{if(!m.label)return!1;const p=ct(m.label);return!p||l.has(p)?!1:(l.add(p),$s.set(p,m),!0)}).sort((m,p)=>m.label.localeCompare(p.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(m=>`<option value="${Na(m.label)}"></option>`).join("");const u=t?"":n.value,b=e?String(e):a.value?String(a.value):"",f=b?i.find(m=>String(m.id)===b):null;if(f){const m=Qi(f)||c;a.value=String(f.id),n.value=m,n.dataset.selectedId=String(f.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function Bn({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:i}=An();if(!a||!s||!i)return;const r=Array.isArray(t)?t:pi()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const l=[...r].filter(g=>g&&g.id!=null).sort((g,q)=>String(q.createdAt||q.start||"").localeCompare(String(g.createdAt||g.start||""))),d=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),b=new Set;Ps=new Map;const f=l.map(g=>{const q=Ki(g)||u;return{id:String(g.id),label:q}}).filter(g=>{if(!g.label)return!1;const q=ct(g.label);return!q||b.has(q)?!1:(b.add(q),Ps.set(q,g),!0)});i.innerHTML=f.map(g=>`<option value="${Na(g.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",p=m?l.find(g=>String(g.id)===m):null;if(p){const g=Ki(p)||u;s.value=String(p.id),a.value=g,a.dataset.selectedId=String(p.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function ja(e,t,n){const{date:a,time:s}=hr(n),i=document.getElementById(e),r=document.getElementById(t);if(i){if(a)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"Y-m-d";i._flatpickr.setDate(a,!1,c)}else i.value=a;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}if(r){if(s)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"H:i";r._flatpickr.setDate(s,!1,c)}else r.value=s;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}}function Wr(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||Bn({selectedValue:a});const i=(Ws()||[]).find(u=>String(u.id)===String(e.clientId)),r=i?.id!=null?String(i.id):"";Ot(r?{selectedValue:r}:{selectedValue:"",resetInput:!0});const c=Ui(e,"start"),l=Ui(e,"end");c&&ja("res-start","res-start-time",c),l&&ja("res-end","res-end-time",l);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),Se(),en()}function Xr({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:ge(),s=Array.isArray(a)?a:[];Gr(s);const i=t!=null?String(t):n.value?String(n.value):"";Bn({selectedValue:i,projectsList:s}),en(),Se()}function en(){const{input:e,hidden:t}=An(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),i=document.getElementById("res-payment-progress-type"),r=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),l=document.getElementById("res-discount-type"),d=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),b=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(ln(n,ut),a&&ln(a,ut)),s&&ln(s,ut),i&&ln(i,ut),r&&ln(r,ut),c&&ln(c,ut),l&&ln(l,ut),b)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=d),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=d),s&&(s.value="unpaid",pt(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=d),i&&(i.value=i.value||"percent",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=d),r&&(r.value="",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=d),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=d),l&&(l.value="percent",l.disabled=!0,l.classList.add("reservation-input-disabled"),l.title=d);else{if(n){const f=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",f&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.disabled=!1,l.classList.remove("reservation-input-disabled"),l.title="")}Ls("tax"),Se()}function fi(){const{input:e,hidden:t}=An();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),i=s?Ns(s,{allowPartial:a}):null;if(i){t.value=String(i.id),e.value=i.label,e.dataset.selectedId=String(i.id);const r=mi(i.id);r?Wr(r,{skipProjectSelectUpdate:!0}):(en(),Se())}else t.value="",e.dataset.selectedId="",en(),Se()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Ns(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function yi(){const{input:e,hidden:t}=ui();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),i=s?Cs(s,{allowPartial:a}):null;i?(t.value=String(i.id),e.value=i.label,e.dataset.selectedId=String(i.id)):(t.value="",e.dataset.selectedId=""),Se()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Cs(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Zl(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){Wn({clearValue:!0});return}let n=null;try{const d=decodeURIComponent(t);n=JSON.parse(d)}catch(d){console.warn("⚠️ [reservations/createForm] Failed to decode project context",d)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),Wn({clearValue:!1}),!n)return;n.fromProjectForm&&(ha={draftStorageKey:n.draftStorageKey||Rr,returnUrl:n.returnUrl||Mr});const i=document.getElementById("res-project");if(n.projectId){i&&(Bn({selectedValue:String(n.projectId)}),en());const d=mi(n.projectId);d?Wr(d,{forceNotes:!!n.forceNotes}):Se(),Wn()}else{i&&Bn({selectedValue:""});const d=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");fd(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),d)}n.start&&ja("res-start","res-start-time",n.start),n.end&&ja("res-end","res-end-time",n.end);const r=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(Ws()||[]).find(b=>String(b.id)===String(n.customerId));u?.id!=null&&(Ot({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),r&&(r.value=u.customerName||u.name||r.value))}else n.customerName&&r?(Ot({selectedValue:""}),r.value=n.customerName,r.dataset.selectedId="",c&&(c.value="")):Ot({selectedValue:""});const l=document.getElementById("res-notes");l&&n.description&&!l.value&&(l.value=n.description),Se()}function xn(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:ea(e,n),end:ea(t,a)}}function Jr(e){const t=La(e);if(t){const c=Ca.get(t);if(c)return c}const{description:n,barcode:a}=Hr(e);if(a){const c=Xa(a);if(c)return c}const s=ct(n||e);if(!s)return null;let i=vr();if(!i?.length){const c=ge();i=Array.isArray(c?.equipment)?c.equipment:[],i.length&&wr(i)}const r=i.find(c=>ct(c?.desc||c?.description||"")===s);return r||i.find(c=>ct(c?.desc||c?.description||"").includes(s))||null}function Yr(e,t="equipment-description-options"){const n=La(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(l=>La(l.value)===n)||Ca.has(n))return!0;const{description:s}=Hr(e);if(!s)return!1;const i=ct(s);return i?(vr()||[]).some(c=>ct(c?.desc||c?.description||"")===i):!1}const ed={available:0,reserved:1,maintenance:2,retired:3};function td(e){return ed[e]??5}function Gi(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function nd(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${Gi(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${Gi(n)})`}function tn(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=zn(),a=ge(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],i=Array.isArray(s)?s:[];wr(i);const r=new Map;i.forEach(d=>{const u=Jl(d),b=La(u);if(!b||!u)return;const f=Vt(d),m=td(f),p=r.get(b);if(!p){r.set(b,{normalized:b,value:u,bestItem:d,bestStatus:f,bestPriority:m,statuses:new Set([f])});return}p.statuses.add(f),m<p.bestPriority&&(p.bestItem=d,p.bestStatus=f,p.bestPriority=m,p.value=u)}),Ca=new Map;const l=Array.from(r.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{Ca.set(d.normalized,d.bestItem);const u=nd(d),b=Na(d.value);if(u===d.value)return`<option value="${b}"></option>`;const f=Na(u);return`<option value="${b}" label="${f}"></option>`}).join("");e&&(e.innerHTML=l),t&&(t.innerHTML=l)}function Zr(e,t,n={}){const{silent:a=!1}=n,s=le(e);if(!s)return{success:!1,message:null};const{start:i,end:r}=xn();if(!i||!r){const p=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||A(p),{success:!1,message:p}}const c=Lt();if(bi(c).has(s)){const p=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||A(p),{success:!1,message:p}}const d=Js(s,i,r);if(d.length){const p=d.map(q=>q.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${p}`);return a||A(g),{success:!1,message:g}}if(Nt(s,i,r)){const p=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||A(p),{success:!1,message:p}}const u=Xa(s);if(!u){const p=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||A(p),{success:!1,message:p}}const b=Vt(u);if(b==="maintenance"||b==="retired"){const p=qn(b);return a||A(p),{success:!1,message:p}}const f=En(u);if(!f){const p=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||A(p),{success:!1,message:p}}Ua({id:f,equipmentId:f,barcode:s,desc:u.desc,qty:1,price:u.price,image:wn(u)}),t&&(t.value=""),Kt(),Se();const m=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||A(m),{success:!0,message:m,barcode:s}}function js(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Jr(t);if(!n){A(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=Al(n.barcode),s=Vt(a||n);if(s==="maintenance"||s==="retired"){A(qn(s));return}const i=le(n.barcode);if(!i){A(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const r=En(n);if(!r){A(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:r,equipmentId:r,barcode:i,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:wn(n)},{start:l,end:d}=xn();if(!l||!d){A(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=Lt();if(bi(u).has(i)){A(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const f=Js(i,l,d);if(f.length){const m=f.map(p=>p.name).join(", ");A(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`));return}if(Nt(i,l,d)){A(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}Ua(c),Kt(),Se(),A(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function ad(){tn();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),js(e))});const t=()=>{Yr(e.value,"equipment-description-options")&&js(e)};e.addEventListener("focus",()=>{if(tn(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Wi(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function bi(e=Lt()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=le(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const i=le(s?.normalizedBarcode??s?.barcode);i&&t.add(i)})}),t}function sd(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=xn();if(!t||!n){A(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}gl({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):A(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(Mn.change,t=>{Wi(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),Wi(e,Cr()))}function id(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,i=a.length?a:t.barcode?[t.barcode]:[];if(!i.length)return;let r=0,c=null;const l=[],d=new Set;i.forEach(b=>{const f=le(b);f&&!d.has(f)&&(d.add(f),l.push(f))});const u=Math.min(s,l.length);for(let b=0;b<u;b+=1){const f=l[b],m=Zr(f,null,{silent:!0});m.success&&(r+=1),m.message&&(c=m.message)}if(r>0){const f=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",v(String(r)));A(f)}else c&&A(c)}function eo(){sd(),!(Vi||typeof document>"u")&&(document.addEventListener(Mn.requestAdd,id),Vi=!0)}function oa(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),i=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:i}}function Ts(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=oa();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const i=document.getElementById("equipment-barcode"),r=document.getElementById("equipment-description"),c=t==="package";i&&(i.disabled=c),r&&(r.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),tl(t),t==="package"&&as()}function as(){const{packageSelect:e,packageHint:t}=oa();if(!e)return;const n=br();Or=n,Qc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,i=n.map(c=>{const l=Number.isFinite(Number(c.price))?Number(c.price):0,d=v(l.toFixed(2)),u=`${c.name} — ${d} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${i}`,e.selectedIndex=0;const r=n.length>0;e.disabled=!r,t&&(r?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),ao()}function rd(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:i,blockingPackages:r})=>{const c=i?.desc||v(String(i?.barcode??i?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(r)&&r.length){const l=r.map(d=>d.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${l})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function to(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const i=ta(e);if(!i)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const r=Xl(i);if(!r)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(m=>m?.type==="package"&&ta(m.packageId)===i))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(Gc(i,n,a,s)){const m=r.name||i;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${m} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(r.items)&&r.items.length?r.items:Xs(r.raw??{}),l=bi(t),d=[],u=new Set;if(c.forEach(m=>{const p=le(m?.normalizedBarcode??m?.barcode);if(p){if(u.has(p)){d.push({item:m,type:"internal"});return}u.add(p),l.has(p)&&d.push({item:m,type:"external"})}}),d.length){const m=d.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>v(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:d.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",m):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",m),duplicates:d}}const b=[];return c.forEach(m=>{const p=le(m?.normalizedBarcode??m?.barcode);if(p&&Nt(p,n,a,s)){const g=Js(p,n,a,s);b.push({item:m,blockingPackages:g})}}),b.length?{success:!1,reason:"item_conflict",message:rd(r,b),conflicts:b}:{success:!0,package:{id:`package::${i}`,packageId:i,type:"package",desc:r.name||`Package ${i}`,qty:1,price:Number.isFinite(Number(r.price))?Number(r.price):0,barcode:r.code||r.raw?.package_code||`pkg-${i}`,packageItems:c.map(m=>({equipmentId:m?.equipmentId??null,barcode:m?.barcode??m?.normalizedBarcode??"",normalizedBarcode:le(m?.normalizedBarcode??m?.barcode),desc:m?.desc??"",qty:Number.isFinite(Number(m?.qty))?Number(m.qty):1,price:Number.isFinite(Number(m?.price))?Number(m.price):0})),image:c.find(m=>m?.image)?.image??null},packageInfo:r}}function no(e,{silent:t=!1}={}){const n=ta(e);if(!n)return t||A(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=xn(),i=Lt(),r=to(n,{existingItems:i,start:a,end:s});if(!r.success){if(!t){const l={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[r.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");A(r.message||l)}return r}return Ua(r.package),Kt(),Se(),t||A(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:r.package}}function ao(){const{packageSelect:e}=oa();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;no(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function od(){const{packageAddButton:e,packageSelect:t}=oa();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){A(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}no(n)}),e.dataset.listenerAttached="true")}function so(){const{modeRadios:e}=oa();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&Ts(s.target.value)}),a.dataset.listenerAttached="true")}),od(),ao();const t=wa(),n=e.find(a=>a.value===t);n&&(n.checked=!0),Ts(t)}function Kt(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=Lt(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),i=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),l=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=Dn(n);t.innerHTML=d.map(u=>{const b=u.items[0]||{},f=wn(b)||u.image,m=f?`<img src="${f}" alt="${i}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',p=v(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,q=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,_=`${v(g.toFixed(2))} ${s}`,S=`${v(q.toFixed(2))} ${s}`,N=u.items.some(I=>I?.type==="package"),x=u.barcodes.map(I=>v(String(I||""))).filter(Boolean),z=x.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${x.map(I=>`<li>${I}</li>`).join("")}
            </ul>
          </details>`:"";let w="";if(N){const I=new Map;if(u.items.forEach(T=>{Array.isArray(T?.packageItems)&&T.packageItems.forEach(B=>{if(!B)return;const X=le(B.barcode||B.desc||Math.random()),P=I.get(X);if(P){P.qty+=Number.isFinite(Number(B.qty))?Number(B.qty):1;return}I.set(X,{desc:B.desc||B.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(B.qty))?Number(B.qty):1,barcode:B.barcode??B.normalizedBarcode??""})})}),I.size){const T=Array.from(I.values()).map(B=>{const X=v(String(B.qty)),P=B.desc||v(String(B.barcode||"")),D=B.barcode?` <span class="reservation-package-items__barcode">(${v(String(B.barcode))})</span>`:"";return`<li>${P}${D} × ${X}</li>`}).join("");w=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${T}
              </ul>
            </details>
          `}}return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${m}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${N?`${w||""}${z||""}`:z}
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
          <td>${_}</td>
          <td>${S}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${l}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function cd(e){const t=Lt(),a=Dn(t).find(i=>i.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Yc(s),Kt(),Se())}function ld(e){const t=Lt(),n=t.filter(a=>Qa(a)!==e);n.length!==t.length&&(qr(n),Kt(),Se())}function dd(e){const t=Lt(),a=Dn(t).find(b=>b.key===e);if(!a)return;const{start:s,end:i}=xn();if(!s||!i){A(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const r=new Set(t.map(b=>le(b.barcode))),{equipment:c=[]}=ge(),l=(c||[]).find(b=>{const f=le(b?.barcode);return!f||r.has(f)||Qa({desc:b?.desc||b?.description||b?.name||"",price:Number(b?.price)||0})!==e||!Nr(b)?!1:!Nt(f,s,i)});if(!l){A(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=le(l.barcode),u=En(l);if(!u){A(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}Ua({id:u,equipmentId:u,barcode:d,desc:l.desc||l.description||l.name||a.description||"",qty:1,price:Number.isFinite(Number(l.price))?Number(l.price):a.unitPrice,image:wn(l)}),Kt(),Se()}function Se(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(v(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,i=document.getElementById("res-tax"),r=e?!1:i?.checked||!1,c=document.getElementById("res-payment-status"),l=c?.value||"unpaid",{start:d,end:u}=xn();r&&At();const b=Tn(),f=document.getElementById("res-payment-progress-type"),m=document.getElementById("res-payment-progress-value"),p=Vr(f),g=Kr(m);gr(),Ri({selectedItems:Lt(),discount:n,discountType:s,applyTax:r,paidStatus:l,paymentProgressType:p,paymentProgressValue:g,start:d,end:u,companySharePercent:b,paymentHistory:[]});const q=Ri.lastResult;q?(Ur(m,q.paymentProgressValue),c&&(c.value=q.paymentStatus,pt(c,q.paymentStatus))):pt(c,l)}function ud(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=v(c.target.value),Se()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",Se),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(ut()){n.checked=!1,A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ls("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(ut()){a.checked=!1,A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ls("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(ut()){s.value="unpaid",pt(s,"unpaid"),A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}pt(s),Se()}),s.dataset.listenerAttached="true");const i=document.getElementById("res-payment-progress-type");i&&!i.dataset.listenerAttached?(i.dataset.userSelected!=="true"&&(i.value="percent"),i.addEventListener("change",c=>{if(ut()){i.value="percent",A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}i.dataset.userSelected="true",Se()}),i.dataset.listenerAttached="true"):i&&i.dataset.userSelected!=="true"&&!i.value&&(i.value="percent");const r=document.getElementById("res-payment-progress-value");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",c=>{if(ut()){r.value="",A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=v(c.target.value),Se()}),r.dataset.listenerAttached="true"),Se()}function pd(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){Se();return}const i=t.dataset.syncedWithStart;(!t.value?.trim()||i!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),Se()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Xi(){const{input:e,hidden:t}=ui(),{input:n,hidden:a}=An(),{customers:s}=ge();let i=t?.value?String(t.value):"";if(!i&&e?.value){const Y=Cs(e.value,{allowPartial:!0});Y&&(i=String(Y.id),t&&(t.value=i),e.value=Y.label,e.dataset.selectedId=i)}const r=s.find(Y=>String(Y.id)===i);if(!r){A(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=r.id;let l=a?.value?String(a.value):"";if(!l&&n?.value){const Y=Ns(n.value,{allowPartial:!0});Y&&(l=String(Y.id),a&&(a.value=l),n.value=Y.label,n.dataset.selectedId=l)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,b=document.getElementById("res-start-time")?.value||"00:00",f=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){A(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${d}T${b}`,p=`${u}T${f}`,g=new Date(m),q=new Date(p);if(Number.isNaN(g.getTime())||Number.isNaN(q.getTime())||g>=q){A(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const _=gr();_.map(Y=>Y.technicianId).filter(Boolean);const S=Lt();if(S.length===0&&_.length===0){A(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const N=document.getElementById("res-notes")?.value||"",x=parseFloat(v(document.getElementById("res-discount")?.value))||0,z=document.getElementById("res-discount-type")?.value||"percent",w=document.getElementById("res-payment-status"),I=w?.value||"unpaid",T=document.getElementById("res-payment-progress-type"),B=document.getElementById("res-payment-progress-value"),X=Vr(T),P=Kr(B),D=l?mi(l):null,G=Yl(D);if(l&&!D){A(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const Y of S){const se=Vt(Y.barcode);if(se==="maintenance"||se==="retired"){A(qn(se));return}}for(const Y of S){const se=le(Y.barcode);if(Nt(se,m,p)){A(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const Y of _)if(Y?.technicianId&&Sr(Y.technicianId,m,p)){A(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const F=document.getElementById("res-tax"),L=document.getElementById("res-company-share"),j=!!l;j?(F&&(F.checked=!1,F.disabled=!0,F.classList.add("disabled"),F.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),L&&(L.checked=!1,L.disabled=!0,L.classList.add("disabled"),L.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),w&&(w.value="unpaid",w.disabled=!0,pt(w,"unpaid"),w.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),T&&(T.disabled=!0,T.classList.add("disabled")),B&&(B.value="",B.disabled=!0,B.classList.add("disabled"))):(F&&(F.disabled=!1,F.classList.remove("disabled"),F.title=""),L&&(L.disabled=!1,L.classList.remove("disabled"),L.title=""),w&&(w.disabled=!1,w.title=""),T&&(T.disabled=!1,T.classList.remove("disabled")),B&&(B.disabled=!1,B.classList.remove("disabled")));const Q=j?!1:F?.checked||!1,J=!!L?.checked;if(!j&&J!==Q){A(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let R=J?Tn():null;J&&(!Number.isFinite(R)||R<=0)&&(At(),R=Tn());const W=J&&Q&&Number.isFinite(R)&&R>0;Q&&At();const M=Zs(S,x,z,Q,_,{start:m,end:p,companySharePercent:W?R:0}),V=Kc(),O=ei({totalAmount:M,progressType:X,progressValue:P,history:[]});B&&Ur(B,O.paymentProgressValue);const ne=[];O.paymentProgressValue!=null&&O.paymentProgressValue>0&&ne.push({type:O.paymentProgressType||X,value:O.paymentProgressValue,amount:O.paidAmount,percentage:O.paidPercent,recordedAt:new Date().toISOString()});const pe=ti({manualStatus:I,paidAmount:O.paidAmount,paidPercent:O.paidPercent,totalAmount:M});w&&(w.value=pe,pt(w,pe));const ae=typeof D?.paymentStatus=="string"?D.paymentStatus.toLowerCase():null,Pe=ae&&["paid","partial","unpaid"].includes(ae)?ae:"unpaid",Le=Er({reservationCode:V,customerId:c,start:m,end:p,status:G?"confirmed":"pending",title:null,location:null,notes:N,projectId:l||null,totalAmount:M,discount:j?0:x,discountType:j?"percent":z,applyTax:Q,paidStatus:j?Pe:pe,confirmed:G,items:S.map(Y=>({...Y,equipmentId:Y.equipmentId??Y.id})),crewAssignments:_,companySharePercent:j||!W?null:R,companyShareEnabled:j?!1:W,paidAmount:j?0:O.paidAmount,paidPercentage:j?0:O.paidPercent,paymentProgressType:j?null:O.paymentProgressType,paymentProgressValue:j?null:O.paymentProgressValue,paymentHistory:j?[]:ne});try{Hi("about to submit",{crewAssignments:_,techniciansPayload:Le?.technicians,payload:Le});const Y=await Zc(Le);Hi("server response",{reservation:Y?.id??Y?.reservationId??Y?.reservation_code,technicians:Y?.technicians,crewAssignments:Y?.crewAssignments,techniciansDetails:Y?.techniciansDetails}),zn(),tn(),bn(),yd(),A(o("reservations.toast.created","✅ تم إنشاء الحجز"));try{const se=document.getElementById("sub-tab-trigger-my-reservations-tab");se&&typeof se.click=="function"&&setTimeout(()=>se.click(),0)}catch{}typeof ks=="function"&&ks({type:"created",reservation:Y}),md(Y)}catch(Y){console.error("❌ [reservations/createForm] Failed to create reservation",Y);const se=Ga(Y)?Y.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");A(se,"error"),j&&(A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),Wn({clearValue:!1}))}}function md(e){if(!ha)return;const{draftStorageKey:t=Rr,returnUrl:n=Mr}=ha,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),i=s?JSON.parse(s)||{}:{},r=Array.isArray(i.linkedReservationIds)?i.linkedReservationIds:[],c=String(a);r.includes(c)||r.push(c),i.linkedReservationIds=r,window.sessionStorage.setItem(t,JSON.stringify(i))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}ha=null,n&&(window.location.href=n)}function Wn({clearValue:e=!1}={}){const{input:t,hidden:n}=An();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,en())}function fd(e,t=""){const{input:n,hidden:a}=An();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),en())}function yd(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),Ot({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),Wn({clearValue:!1}),Bn({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const i=document.getElementById("res-payment-status");i&&(i.value="unpaid",pt(i,"unpaid"));const r=document.getElementById("res-payment-progress-type");r&&(r.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),el(),qr([]),Ia("form-reset"),Kt(),en(),Se()}function bd(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){cd(s);return}if(a==="increase-group"&&s){dd(s);return}if(a==="remove-group"&&s){ld(s);return}}),e.dataset.listenerAttached="true")}function gd(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(wa()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,Zr(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||wa()!=="single")return;const{start:i,end:r}=xn();!i||!r||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function hd(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Xi()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Xi()}),t.dataset.listenerAttached="true")}function Bp({onAfterSubmit:e}={}){ks=typeof e=="function"?e:null;const{customers:t,projects:n}=ge();Jc(t||[]),Ot(),yi(),Gr(n||[]),Xr({projectsList:n}),fi(),tn(),as(),ad(),eo(),so(),pd(),ud(),bd(),gd(),hd(),Zl(),Se(),Kt()}function io(){tn(),as(),Xr(),Ot(),yi(),fi(),eo(),so(),Kt(),Se()}if(typeof document<"u"){const e=()=>{Ot(),Bn({projectsList:pi()}),yi(),fi(),Se()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{tn()}),document.addEventListener("packages:changed",()=>{as(),wa()==="package"&&Ts("package")})}typeof window<"u"&&(window.getCompanySharePercent=Tn);function ro(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:dn(t),endDate:dn(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const i=new Date(n);return i.setDate(n.getDate()+6),{startDate:dn(n),endDate:dn(i)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:dn(n),endDate:dn(a)}}return e==="upcoming"?{startDate:dn(t),endDate:""}:{startDate:"",endDate:""}}function vd(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let i=v(t?.value||"").trim(),r=v(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),Ta(t),Ta(n),i="",r=""),!i&&!r&&c){const d=ro(c);i=d.startDate,r=d.endDate}return{searchTerm:ct(e?.value||""),startDate:i,endDate:r,status:s?.value||"",quickRange:c}}function Fp(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=v(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),s.dataset.listenerAttached="true");const i=document.getElementById("reservation-date-range");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>{qd(i.value),t()}),i.dataset.listenerAttached="true");const r=document.getElementById("reservation-status-filter");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",t),r.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),Ta(a),Ta(s),i&&(i.value=""),r&&(r.value=""),t()}),c.dataset.listenerAttached="true")}function qd(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=ro(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function dn(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function Ta(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function fa(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function Sd(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function Ed(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=Sd(n);if(a!==null)return a}return null}function Ji(e,t=0){const n=Ed(e);if(n!=null)return n;const a=fa(e.createdAt??e.created_at);if(a!=null)return a;const s=fa(e.updatedAt??e.updated_at);if(s!=null)return s;const i=fa(e.start);if(i!=null)return i;const r=fa(e.end);if(r!=null)return r;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function wd({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const i=e.map((S,N)=>({reservation:S,index:N})),r=t.searchTerm||"",c=t.searchReservationId||"",l=t.searchCustomerName||"",d=t.searchProjectId||"",u=t.startDate||"",b=t.endDate||"",f=t.status||"",m=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,p=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,q=b?new Date(`${b}T23:59:59`):null,_=i.filter(({reservation:S})=>{const N=n.get(String(S.customerId)),x=s?.get?.(String(S.projectId)),z=S.start?new Date(S.start):null,w=ni(S),{effectiveConfirmed:I}=nn(S,x);if(m!=null&&String(S.customerId)!==String(m)||p!=null&&!(Array.isArray(S.technicians)?S.technicians.map(D=>String(D)):[]).includes(String(p))||f==="confirmed"&&!I||f==="pending"&&I||f==="completed"&&!w)return!1;if(f==="cancelled"){const P=String(S?.status||S?.reservationStatus||"").toLowerCase();if(!["cancelled","canceled"].includes(P))return!1}if(g&&z&&z<g||q&&z&&z>q)return!1;if(c){const P=[S.reservationId,S.id,S.reservation_id,S.reservationCode,S.reservation_code,S.code,S.reference,S.referenceNumber,S.reference_number],D=ct(P.filter(F=>F!=null&&F!=="").map(String).join(" ")).replace(/\s+/g,""),G=c.replace(/\s+/g,"");if(!D.includes(G))return!1}if(l&&!ct(N?.customerName||"").includes(l))return!1;if(d){const P=[S.projectId,S.project_id,S.projectID,x?.id,x?.projectCode,x?.project_code],D=ct(P.filter(F=>F!=null&&F!=="").map(String).join(" ")).replace(/\s+/g,""),G=d.replace(/\s+/g,"");if(!D.includes(G))return!1}if(!r)return!0;const T=S.items?.map?.(P=>`${P.barcode} ${P.desc}`).join(" ")||"",B=(S.technicians||[]).map(P=>a.get(String(P))?.name).filter(Boolean).join(" ");return ct([S.reservationId,N?.customerName,S.notes,T,B,x?.title].filter(Boolean).join(" ")).includes(r)});return _.sort((S,N)=>{const x=Ji(S.reservation,S.index),z=Ji(N.reservation,N.index);return x!==z?z-x:N.index-S.index}),_}function Ad({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),i=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),r=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),l=o("reservations.list.itemsCountShort","{count} عنصر"),d=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),b=o("reservations.list.status.pending","⏳ غير مؤكد"),f=o("reservations.list.status.completed","📁 منتهي"),m=o("reservations.list.payment.paid","💳 مدفوع"),p=o("reservations.list.payment.unpaid","💳 غير مدفوع"),g=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),q=o("reservations.list.actions.confirm","✔️ تأكيد"),_=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),S=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),N={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 الإجمالي النهائي"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:x,index:z})=>{const w=t.get(String(x.customerId)),I=x.projectId?a?.get?.(String(x.projectId)):null,T=ni(x),B=typeof I?.paymentStatus=="string"?I.paymentStatus.toLowerCase():null,X=x.paidStatus??x.paid_status??(x.paid===!0||x.paid==="paid"?"paid":"unpaid"),P=B&&["paid","partial","unpaid"].includes(B)?B:X,D=P==="paid",G=P==="partial",{effectiveConfirmed:F,projectLinked:L}=nn(x,I),j=F?"status-confirmed":"status-pending",Q=D?"status-paid":G?"status-partial":"status-unpaid";let J=`<span class="reservation-chip status-chip ${j}">${F?u:b}</span>`;const R=D?m:G?g:p;let W=`<span class="reservation-chip status-chip ${Q}">${R}</span>`,M=D?" tile-paid":G?" tile-partial":" tile-unpaid";T&&(M+=" tile-completed");let V="";T&&(J=`<span class="reservation-chip status-chip status-completed">${f}</span>`,W=`<span class="reservation-chip status-chip status-completed">${R}</span>`,V=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);let O=!L&&!F?`<button class="tile-confirm" data-reservation-index="${z}" data-action="confirm">${q}</button>`:"";{const K=String(x?.status||x?.reservationStatus||"").toLowerCase();(K==="cancelled"||K==="canceled")&&(J=`<span class="reservation-chip status-chip status-cancelled">${o("reservations.list.status.cancelled","❌ ملغي")}</span>`,M=" tile-cancelled",V="",typeof O<"u"&&(O=""))}const ne=O?`<div class="tile-actions">${O}</div>`:"",pe=x.items?.length||0,ae=Array.isArray(x.crewAssignments)?x.crewAssignments:[],Pe=(x.technicians||[]).map(K=>n.get(String(K))).filter(Boolean),Le=ae.length?ae.map(K=>{const ye=K.positionLabel??K.position_name??K.role??o("reservations.crew.positionFallback","منصب بدون اسم"),h=K.technicianName??n.get(String(K.technicianId??""))?.name??null;return h?`${v(ye)} (${v(h)})`:v(ye)}):Pe.map(K=>K.name),Y=Le.length?Le.join(d):"—",se=v(String(x.reservationId??"")),Ae=x.start?v(mt(x.start)):"-",De=x.end?v(mt(x.end)):"-",tt=v(String(x.cost??0)),Ye=v(String(pe)),je=x.notes?v(x.notes):c,he=l.replace("{count}",Ye),Ie=x.applyTax?`<small>${i}</small>`:"";let Te=_;return x.projectId&&(Te=I?.title?v(I.title):S),`
      <div class="${O?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${M}"${V} data-reservation-index="${z}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${se}</div>
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
            <span class="tile-value">${Te}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${N.start}</span>
            <span class="tile-value tile-inline">${Ae}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${N.end}</span>
            <span class="tile-value tile-inline">${De}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${N.cost}</span>
            <span class="tile-value">${tt} ${s} ${Ie}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${N.equipment}</span>
            <span class="tile-value">${he}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${N.crew}</span>
            <span class="tile-value">${Le.length?Y:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${je}</span>
          </div>
        </div>
        ${ne}
      </div>
    `}).join("")}function Je(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function vs(e){if(e==null)return"";const t=String(e).trim();return t?v(t):""}function Yi(e,t,n=[],a,s=null){const{projectLinked:i,effectiveConfirmed:r}=nn(e,s),c=e.paid===!0||e.paid==="paid",l=ni(e),d=e.items||[];let{groups:u}=ai(e);const b=y=>!!(y&&typeof y=="object"&&(y.type==="package"||Array.isArray(y.packageItems)&&y.packageItems.length||Array.isArray(y.items)&&y.items.some(U=>U&&U.type==="package"))),f=y=>{const U=(y?.package_code??y?.packageDisplayCode??y?.barcode??y?.description??(Array.isArray(y?.items)&&y.items[0]?.barcode)??"").toString().trim().toLowerCase();return v(U)},m=(y,U)=>{const oe=Re=>{const Ke=Array.isArray(Re?.items)?Re.items[0]:null,Oe=[Ke?.price,Ke?.unit_price,Ke?.unitPrice,Re?.unitPrice,Re?.totalPrice];for(const Qt of Oe){const Xe=Qe(Qt);if(Number.isFinite(Xe)&&Xe>0)return Xe}return 0},ve=oe(y),we=oe(U);return ve&&we?ve<=we?y:U:ve?y:U},p=[],g=new Map;u.forEach(y=>{if(!b(y)){p.push(y);return}const U=f(y);if(!U){if(!g.has("__unknown__"))g.set("__unknown__",p.length),p.push(y);else{const oe=g.get("__unknown__");p[oe]=m(p[oe],y)}return}if(!g.has(U))g.set(U,p.length),p.push(y);else{const oe=g.get(U);p[oe]=m(p[oe],y)}}),u=p;const{technicians:q=[]}=ge(),_=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(q)?q:[]),S=new Map;_.forEach(y=>{if(!y||y.id==null)return;const U=String(y.id),oe=S.get(U)||{};S.set(U,{...oe,...y})});const x=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(y=>({technicianId:y}))).map((y,U)=>{const oe=y?.technicianId!=null?S.get(String(y.technicianId)):null;let ve=y.positionLabel??y.position_name??y.position_label??y.role??y.position??"";(!ve||ve.trim()==="")&&(ve=y.positionLabelAr??y.position_label_ar??y.positionLabelEn??y.position_label_en??y.position_name_ar??y.position_name_en??"");const we=y.positionLabelAlt??y.position_label_alt??y.positionLabelEn??y.position_label_en??y.positionLabelAr??y.position_label_ar??"";let Re=ve,Ke=we;if(!Re||Re.trim()==="")try{const Xe=Wt?Wt():[];let ce=null;if(y.positionId!=null&&(ce=Xe.find(He=>String(He.id)===String(y.positionId))||null),!ce){const He=y.positionKey??y.position_key??y.positionName??y.position_name??y.position??"";if(He&&(ce=typeof Aa=="function"?Aa(He):null,!ce&&Xe.length)){const qt=String(He).trim().toLowerCase();ce=Xe.find(St=>[St.name,St.labelAr,St.labelEn].filter(Boolean).map(Gt=>String(Gt).toLowerCase()).includes(qt))||null}}ce&&(Re=ce.labelAr||ce.labelEn||ce.name||"",(!Ke||String(Ke).trim()==="")&&(ce.labelAr&&ce.labelEn?Ke=Re===ce.labelAr?ce.labelEn:ce.labelAr:Ke=ce.labelAr||ce.labelEn||""))}catch{}const Oe=$e(Qe(y.positionCost??y.position_cost??y.cost??y.daily_wage??y.dailyWage??oe?.dailyWage??oe?.wage??0)),Qt=$e(Qe(y.positionClientPrice??y.position_client_price??y.client_price??y.clientPrice??y.daily_total??y.dailyTotal??y.total??oe?.dailyTotal??oe?.total??oe?.total_wage??0));return{assignmentId:y.assignmentId??y.assignment_id??`crew-${U}`,positionId:y.positionId??y.position_id??null,positionKey:y.positionKey??y.position_key??y.positionName??y.position_name??y.position??null,positionLabel:Re,positionLabelAlt:Ke,positionLabelAr:y.positionLabelAr??y.position_label_ar??null,positionLabelEn:y.positionLabelEn??y.position_label_en??null,positionCost:Oe,positionClientPrice:Qt,technicianId:y.technicianId!=null?String(y.technicianId):oe?.id!=null?String(oe.id):null,technicianName:y.technicianName??y.technician_name??oe?.name??null,technicianRole:y.technicianRole??oe?.role??null,technicianPhone:y.technicianPhone??oe?.phone??null,notes:y.notes??null}}),z=Sn(),w=Wa(e.start,e.end),I=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,T=Qe(I),B=Number.isFinite(T)?T:0,X=e.discountType??e.discount_type??e.discountMode??"percent",P=String(X).toLowerCase()==="amount"?"amount":"percent",D=i?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),G=Qe(e.cost??e.total??e.finalTotal),F=Number.isFinite(G),L=F?$e(G):0,j=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,Q=j!=null?Qe(j):Number.NaN,W=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(Q)&&Q>0)&&Number.isFinite(Q)?Q:0,M=Ar({items:d,technicianIds:e.technicians||[],crewAssignments:x,discount:B,discountType:P,applyTax:D,start:e.start,end:e.end,companySharePercent:W}),V=$e(M.equipmentTotal),O=$e(M.crewTotal);$e(M.crewCostTotal);const ne=$e(M.discountAmount),pe=$e(M.subtotalAfterDiscount),ae=Number.isFinite(M.companySharePercent)?M.companySharePercent:0;let Pe=$e(M.companyShareAmount);Pe=ae>0?$e(Math.max(0,Pe)):0;const Le=$e(M.taxAmount),Y=$e(M.finalTotal),se=i?Y:F?L:Y,Ae=$e(M.netProfit),De=v(String(e.reservationId??e.id??"")),tt=e.start?v(mt(e.start)):"-",Ye=e.end?v(mt(e.end)):"-",je=v(String(x.length)),he=v(V.toFixed(2)),Ie=v(ne.toFixed(2)),Te=v(pe.toFixed(2)),it=v(Le.toFixed(2)),K=v((Number.isFinite(se)?se:0).toFixed(2)),ye=v(String(w)),h=o("reservations.create.summary.currency","SR"),H=o("reservations.details.labels.discount","الخصم"),C=o("reservations.details.labels.tax","الضريبة (15%)"),ee=o("reservations.details.labels.crewTotal","إجمالي الفريق"),te=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),ie=o("reservations.details.labels.duration","عدد الأيام"),Ce=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),de=o("reservations.details.labels.netProfit","💵 صافي الربح"),re=o("reservations.create.equipment.imageAlt","صورة"),_e={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},It=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),rt=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");o("reservations.details.technicians.roleUnknown","غير محدد");const Tt=o("reservations.details.technicians.phoneUnknown","غير متوفر");o("reservations.details.technicians.wage","{amount} {currency} / اليوم");const Be=o("reservations.list.status.confirmed","✅ مؤكد"),Ze=o("reservations.list.status.pending","⏳ غير مؤكد"),Bt=o("reservations.list.payment.paid","💳 مدفوع"),bt=o("reservations.list.payment.unpaid","💳 غير مدفوع"),k=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),be=o("reservations.list.status.completed","📁 منتهي"),ke=o("reservations.details.labels.id","🆔 رقم الحجز"),Ue=o("reservations.details.section.bookingInfo","بيانات الحجز"),gt=o("reservations.details.section.paymentSummary","ملخص الدفع"),ht=o("reservations.details.labels.finalTotal","المجموع النهائي"),et=o("reservations.details.section.crew","😎 الفريق الفني"),xe=o("reservations.details.crew.count","{count} عضو"),me=o("reservations.details.section.items","📦 المعدات المرتبطة"),Fe=o("reservations.details.items.count","{count} عنصر"),nt=o("reservations.details.actions.edit","✏️ تعديل"),Ee=o("reservations.details.actions.delete","🗑️ حذف"),Ne=o("reservations.details.labels.customer","العميل"),vt=o("reservations.details.labels.contact","رقم التواصل"),Ft=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const da=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),pc=o("reservations.details.actions.openProject","📁 فتح المشروع"),mc=o("reservations.details.labels.start","بداية الحجز"),fc=o("reservations.details.labels.end","نهاية الحجز"),yc=o("reservations.details.labels.notes","ملاحظات"),bc=o("reservations.list.noNotes","لا توجد ملاحظات"),gc=o("reservations.details.labels.itemsCount","عدد المعدات"),hc=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),vc=o("reservations.paymentHistory.title","سجل الدفعات"),qc=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Sc=o("reservations.list.unknownCustomer","غير معروف"),us=typeof s?.paymentStatus=="string"?s.paymentStatus.toLowerCase():null,ua=i&&us&&["paid","partial","unpaid"].includes(us)?us:e.paidStatus??e.paid_status??(c?"paid":"unpaid"),ps=ua==="partial",Ni=ua==="paid"?Bt:ps?k:bt;function ms(y){if(y==null)return Number.NaN;if(typeof y=="number")return Number.isFinite(y)?y:Number.NaN;const U=String(y).replace(/[^0-9.+-]/g,""),oe=Number(U);return Number.isFinite(oe)?oe:Number.NaN}const pa=(y={})=>{const U=String(y.type??y.kind??y.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(U)||Array.isArray(y.packageItems)&&y.packageItems.length)},Ec=(y={})=>[y.packageId,y.package_id,y.packageCode,y.package_code,y.bundleId,y.bundle_id].some(U=>U!=null&&U!==""),wc=(y={})=>!y||typeof y!="object"?!1:!pa(y)&&Ec(y),Ac=(y={})=>{const U=pa(y),oe=[{value:y.qty,key:"qty",limit:999},{value:y.quantity,key:"quantity",limit:999},{value:y.units,key:"units",limit:999},{value:y.count,key:"count",limit:50},{value:y.package_quantity,key:"package_quantity",limit:999},{value:y.packageQty,key:"packageQty",limit:999},{value:y.packageCount,key:"packageCount",limit:999}];let ve=NaN;for(const we of oe){if(we.value==null||we.value==="")continue;const Re=typeof we.value=="string"?we.value.trim():String(we.value??"");if(we.key==="count"&&Re.length>6)continue;const Ke=ms(we.value);if(!Number.isFinite(Ke)||Ke<=0)continue;const Oe=Math.round(Ke);if(!(Oe>we.limit)){ve=Math.max(1,Oe);break}}return(!Number.isFinite(ve)||ve<=0)&&(ve=1),U?Math.max(1,Math.min(99,ve)):Math.max(1,Math.min(9999,ve))};let In=(Array.isArray(d)?d:[]).filter(y=>y&&typeof y=="object"&&!wc(y)).reduce((y,U)=>y+Ac(U),0);(!Number.isFinite(In)||In<=0)&&(In=Array.isArray(u)&&u.length?u.length:(Array.isArray(d)?d.length:0)||1),In=Math.max(1,Math.round(In));const xc=v(String(In)),Li=Fe.replace("{count}",xc),Ic=xe.replace("{count}",je),_c=e.notes?v(e.notes):bc,kc=v(O.toFixed(2)),$c=v(String(ae)),Pc=v(Pe.toFixed(2)),Cc=`${$c}% (${Pc} ${h})`,Nc=Number.isFinite(Ae)?Math.max(0,Ae):0,Lc=v(Nc.toFixed(2)),Ut=[{icon:"💼",label:hc,value:`${he} ${h}`}];Ut.push({icon:"😎",label:ee,value:`${kc} ${h}`}),ne>0&&Ut.push({icon:"💸",label:H,value:`${Ie} ${h}`}),Ut.push({icon:"📊",label:te,value:`${Te} ${h}`}),D&&Le>0&&Ut.push({icon:"🧾",label:C,value:`${it} ${h}`}),ae>0&&Ut.push({icon:"🏦",label:Ce,value:Cc}),Ut.push({icon:"💵",label:de,value:`${Lc} ${h}`}),Ut.push({icon:"💰",label:ht,value:`${K} ${h}`});const jc=Ut.map(({icon:y,label:U,value:oe})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${y} ${U}</span>
      <span class="summary-details-value">${oe}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let dt=[];i&&s&&(Array.isArray(s.paymentHistory)?dt=s.paymentHistory:Array.isArray(s.payment_history)?dt=s.payment_history:Array.isArray(s.payments)?dt=s.payments:Array.isArray(s.paymentLogs)&&(dt=s.paymentLogs)),(!Array.isArray(dt)||dt.length===0)&&(Array.isArray(e.paymentHistory)?dt=e.paymentHistory:Array.isArray(e.payment_history)?dt=e.payment_history:Array.isArray(e.paymentLogs)?dt=e.paymentLogs:dt=[]);const ji=Array.isArray(dt)?dt:[],Tc=ji.length?`<ul class="reservation-payment-history-list">${ji.map(y=>{const U=y?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):y?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),oe=Number.isFinite(Number(y?.amount))&&Number(y.amount)>0?`${v(Number(y.amount).toFixed(2))} ${h}`:"—",ve=Number.isFinite(Number(y?.percentage))&&Number(y.percentage)>0?`${v(Number(y.percentage).toFixed(2))}%`:"—",we=y?.recordedAt?v(mt(y.recordedAt)):"—",Re=y?.note?`<div class="payment-history-note">${Je(v(y.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${Je(U)}</span>
              <span class="payment-history-entry__amount">${oe}</span>
              <span class="payment-history-entry__percent">${ve}</span>
              <span class="payment-history-entry__date">${we}</span>
            </div>
            ${Re}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${Je(qc)}</div>`,Ti=String(e?.status||e?.reservationStatus||"").toLowerCase(),Bi=Ti==="cancelled"||Ti==="canceled",Fi=Bi?[{text:o("reservations.list.status.cancelled","❌ ملغي"),className:"status-cancelled"},{text:Ni,className:ua==="paid"?"status-paid":ps?"status-partial":"status-unpaid"}]:[{text:r?Be:Ze,className:r?"status-confirmed":"status-pending"},{text:Ni,className:ua==="paid"?"status-paid":ps?"status-partial":"status-unpaid"}];l&&!Bi&&Fi.push({text:be,className:"status-completed"});const Bc=Fi.map(({text:y,className:U})=>`<span class="status-chip ${U}">${y}</span>`).join(""),cn=(y,U,oe)=>`
    <div class="res-info-row">
      <span class="label">${y} ${U}</span>
      <span class="value">${oe}</span>
    </div>
  `;let fs="";if(e.projectId){let y=Je(da);if(s){const U=s.title||o("projects.fallback.untitled","مشروع بدون اسم");y=`${Je(U)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${Je(pc)}</button>`}fs=`
      <div class="res-info-row">
        <span class="label">📁 ${Ft}</span>
        <span class="value">${y}</span>
      </div>
    `}const Dt=[];Dt.push(cn("👤",Ne,t?.customerName||Sc)),Dt.push(cn("📞",vt,t?.phone||"—")),Dt.push(cn("🗓️",mc,tt)),Dt.push(cn("🗓️",fc,Ye)),Dt.push(cn("📦",gc,Li)),Dt.push(cn("⏱️",ie,ye)),Dt.push(cn("📝",yc,_c)),fs&&Dt.push(fs);const Fc=Dt.join(""),Dc=u.length?u.map(y=>{const U=y.items[0]||{},oe=wn(U)||y.image,ve=oe?`<img src="${oe}" alt="${re}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let we=[];if(Array.isArray(y.packageItems)&&y.packageItems.length)we=[...y.packageItems];else{const qe=[];y.items.forEach(Me=>{Array.isArray(Me?.packageItems)&&Me.packageItems.length&&qe.push(...Me.packageItems)}),we=qe}if(Array.isArray(we)&&we.length>1){const qe=new Set;we=we.filter(Me=>{const ue=Me?.normalizedBarcode&&String(Me.normalizedBarcode).toLowerCase()||Me?.barcode&&String(Me.barcode).toLowerCase()||(Me?.equipmentId!=null?`id:${Me.equipmentId}`:null);return ue?qe.has(ue)?!1:(qe.add(ue),!0):!0})}const Re=pa(y)||y.items.some(qe=>pa(qe))||we.length>0,Ke=(qe,{fallback:Me=1,max:ue=1e3}={})=>{const ze=ms(qe);return Number.isFinite(ze)&&ze>0?Math.min(ue,ze):Me};let Oe;if(Re){const qe=Ke(U?.qty??U?.quantity??U?.count,{fallback:NaN,max:999});Number.isFinite(qe)&&qe>0?Oe=qe:Oe=Ke(y.quantity??y.count??1,{fallback:1,max:999})}else Oe=Ke(y.quantity??y.count??U?.qty??U?.quantity??U?.count??0,{fallback:1,max:9999});const Qt=v(String(Oe)),Xe=(qe,{preferPositive:Me=!1}={})=>{let ue=Number.NaN;for(const ze of qe){const kt=Qe(ze);if(Number.isFinite(kt)){if(Me&&kt>0)return kt;Number.isFinite(ue)||(ue=kt)}}return ue};let ce,He;if(Re){const qe=[U?.price,U?.unit_price,U?.unitPrice,y.unitPrice];if(ce=Xe(qe,{preferPositive:!0}),!Number.isFinite(ce)||ce<0){const ue=Qe(y.totalPrice??U?.total??U?.total_price);Number.isFinite(ue)&&Oe>0&&(ce=ue/Oe)}Number.isFinite(ce)||(ce=0);const Me=[U?.total,U?.total_price,y.totalPrice];if(He=Xe(Me),!Number.isFinite(He))He=ce*Oe;else{const ue=ce*Oe;Number.isFinite(ue)&&ue>0&&Math.abs(He-ue)>ue*.25&&(He=ue)}}else{const qe=[U?.price,U?.unit_price,U?.unitPrice,y.unitPrice];if(ce=Xe(qe,{preferPositive:!0}),!Number.isFinite(ce)||ce<0){const Me=Qe(y.totalPrice??U?.total??U?.total_price);Number.isFinite(Me)&&Oe>0&&(ce=Me/Oe)}Number.isFinite(ce)||(ce=0),He=Qe(y.totalPrice??U?.total??U?.total_price),Number.isFinite(He)||(He=ce*Oe)}ce=$e(ce),He=$e(He);const qt=`${v(ce.toFixed(2))} ${h}`,St=`${v(He.toFixed(2))} ${h}`,Gt=y.barcodes.map(qe=>v(String(qe||""))).filter(Boolean),Et=Gt.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${Gt.map(qe=>`<li>${qe}</li>`).join("")}
              </ul>
            </details>`:"";let _t="";if(we.length){const qe=new Map,Me=ue=>{const ze=ms(ue?.qtyPerPackage??ue?.perPackageQty??ue?.quantityPerPackage);return Number.isFinite(ze)&&ze>0&&ze<=99?Math.round(ze):1};if(we.forEach(ue=>{if(!ue)return;const ze=le(ue.barcode||ue.normalizedBarcode||ue.desc||Math.random());if(!ze)return;const kt=qe.get(ze),_n=Me(ue);if(kt){kt.qty=_n,kt.total=_n;return}qe.set(ze,{desc:ue.desc||ue.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(_n,99)),total:Math.max(1,Math.min(_n,99)),barcode:ue.barcode??ue.normalizedBarcode??""})}),qe.size){const ue=Array.from(qe.values()).map(ze=>{const kt=v(String(ze.qty>0?Math.min(ze.qty,99):1)),_n=Je(ze.desc||""),Hc=ze.barcode?` <span class="reservation-package-items__barcode">(${Je(v(String(ze.barcode)))})</span>`:"";return`<li>${_n}${Hc} × ${kt}</li>`}).join("");_t=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${ue}
                </ul>
              </details>
            `}}const Oc=Re?`${_t||""}${Et||""}`:Et;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${ve}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${Je(U.desc||U.description||U.name||y.description||"-")}</div>
                  ${Oc}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Je(_e.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Qt}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Je(_e.unitPrice)}">${qt}</td>
            <td class="reservation-modal-items-table__cell" data-label="${Je(_e.total)}">${St}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${Je(_e.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${It}</td></tr>`,Rc=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${_e.item}</th>
            <th>${_e.quantity}</th>
            <th>${_e.unitPrice}</th>
            <th>${_e.total}</th>
            <th>${_e.actions}</th>
          </tr>
        </thead>
        <tbody>${Dc}</tbody>
      </table>
    </div>
  `,Di=x.map((y,U)=>{const oe=v(String(U+1));let ve=y.positionLabel??y.position_name??y.position_label??y.position_title??y.role??y.position??null;if((!ve||ve.trim()==="")&&(ve=y.positionLabelAr??y.position_label_ar??y.position_title_ar??y.positionLabelEn??y.position_label_en??y.position_name_ar??y.position_title_en??y.position_name_en??null),!ve||ve.trim()==="")try{const qt=typeof Wt=="function"?Wt():[],St=y.positionId?qt.find(_t=>String(_t.id)===String(y.positionId)):null,Gt=!St&&y.positionKey?qt.find(_t=>String(_t.name).toLowerCase()===String(y.positionKey).toLowerCase()):null,Et=St||Gt||null;Et&&(ve=Et.labelAr||Et.labelEn||Et.name||ve)}catch{}const we=vs(ve)||o("reservations.crew.positionFallback","منصب بدون اسم"),Re=vs(y.positionLabelAlt??y.position_label_alt??y.positionLabelEn??y.position_label_en??y.positionLabelAr??y.position_label_ar??y.position_name_en??y.position_name_ar??""),Ke=vs(y.technicianName)||o("technicians.picker.noTechnicianOption","— بدون تعيين —"),Oe=y.technicianPhone||Tt,Qt=$e(Qe(y.positionCost??y.position_cost??y.cost??y.daily_wage??y.dailyWage??y.internal_cost??0));let Xe=$e(Qe(y.positionClientPrice??y.position_client_price??y.client_price??y.customer_price??y.position_price??y.clientPrice??y.daily_total??y.dailyTotal??y.total??0));if(!Number.isFinite(Xe)||Xe<=0)try{const qt=Wt?Wt():[],St=y.positionId?qt.find(_t=>String(_t.id)===String(y.positionId)):null,Gt=!St&&y.positionKey?qt.find(_t=>String(_t.name).toLowerCase()===String(y.positionKey).toLowerCase()):null,Et=St||Gt||null;Et&&Number.isFinite(Number(Et.clientPrice))&&(Xe=$e(Number(Et.clientPrice)))}catch{}const ce=`${v(Xe.toFixed(2))} ${h}`,He=Qt>0?`${v(Qt.toFixed(2))} ${h}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${oe}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${Ke}</span>
            <small class="text-muted">🏷️ ${we}${Re?` — ${Re}`:""}</small>
            <small class="text-muted">💼 ${ce}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${Oe}</div>
          ${He?`<div>💵 ${o("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${He}</div>`:""}
        </div>
      </div>
    `}).join(""),Mc=Array.isArray(x)&&x.length>4,zc=x.length?Mc?`
          <div class="reservation-technicians-slider" data-tech-slider>
            <button type="button" class="slider-btn slider-btn--prev" data-slider-prev aria-label="${Je(o("reservations.details.slider.prev","السابق"))}" title="${Je(o("reservations.details.slider.prev","السابق"))}">‹</button>
            <div class="reservation-technicians-track" data-slider-track>
              ${Di}
            </div>
            <button type="button" class="slider-btn slider-btn--next" data-slider-next aria-label="${Je(o("reservations.details.slider.next","التالي"))}" title="${Je(o("reservations.details.slider.next","التالي"))}">›</button>
          </div>
        `:`<div class="reservation-technicians-grid">${Di}</div>`:`<ul class="reservation-modal-technicians"><li>${rt}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${ke}</span>
          <strong>${De}</strong>
        </div>
        <div class="status-chips">
          ${Bc}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Ue}</h6>
          ${Fc}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${gt}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${jc}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${vc}</h6>
              ${Tc}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${et}</span>
          <span class="count">${Ic}</span>
        </div>
        ${zc}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${me}</span>
          <span class="count">${Li}</span>
        </div>
        ${Rc}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${nt}</button>
        ${z?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Ee}</button>`:""}
      </div>
    </div>
  `}const Dp="project",Rp="editProject",Mp=3600*1e3,oo=.15,zp=6,Op="projectsTab",Hp="projectsSubTab",Vp={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},Kp={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed",cancelled:"Cancelled",conflict:"Conflict"},xd=`@page {
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
  margin-top: 8px;
}
.quote-table-subtotal > span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f8fafc !important;
  color: #0f172a !important;
  border: 1px solid rgba(148, 163, 184, 0.55);
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
}
.quote-table-subtotal__label { font-weight: 700; }
.quote-table-subtotal__value { font-weight: 700; }

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
`,Id=/color\([^)]*\)/gi,_d=/color-mix\([^)]*\)/gi,kd=/oklab\([^)]*\)/gi,$d=/oklch\([^)]*\)/gi,Yt=/(color\(|color-mix\(|oklab|oklch)/i,Pd=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke","boxShadow","textShadow","accentColor","caretColor","columnRuleColor"],Cd=typeof document<"u"?document.createElement("canvas"):null,ya=Cd?.getContext?.("2d")||null;function co(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function Bs(e,t="#000"){if(!ya||!e)return t;try{return ya.fillStyle="#000",ya.fillStyle=e,ya.fillStyle||t}catch{return t}}function Nd(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&Yt.test(n)){const s=Bs(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function Pn(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function lo(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const i=t.getComputedStyle(s);if(!i)return;Pd.forEach(c=>{const l=i[c];if(l&&Yt.test(l)){const d=co(c);if(Pn(n,s,d),c==="boxShadow"||c==="textShadow")s.style.setProperty(d,"none","important");else{const u=c==="backgroundColor"?"#ffffff":i.color||"#000000",b=Bs(l,u);s.style.setProperty(d,b,"important")}}});const r=i.backgroundImage;if(r&&Yt.test(r)){const c=Bs(i.backgroundColor||"#ffffff","#ffffff");Pn(n,s,"background-image"),Pn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function uo(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const i=t.getComputedStyle(s);if(!i)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","boxShadow","textShadow","accentColor","caretColor","columnRuleColor"].forEach(c=>{const l=i[c];if(l&&Yt.test(l)){const d=co(c);if(Pn(n,s,d),c==="boxShadow"||c==="textShadow")s.style.setProperty(d,"none","important");else{const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(d,u,"important")}}});const r=i.backgroundImage;r&&Yt.test(r)&&(Pn(n,s,"background-image"),Pn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function po(e){if(!e)return;const t=(n="")=>{if(typeof n!="string")return n;let a=n;return Yt.test(a)&&(a=a.replace(Id,"#000").replace(_d,"#000").replace(kd,"#000").replace($d,"#000")),a};e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&Yt.test(a)&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&Yt.test(a)&&n.setAttribute("style",t(a))})}const mo="reservations.quote.sequence",Zi={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},fo="https://help.artratio.sa/guide/quote-preview",We={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Ld=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],lt=[...Ld],jd=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function Fs(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...lt]}function Td(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=Fs(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=Fs(t.value);if(a.length)return a}const n=lt.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...lt]}const Bd=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],gi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(v(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>{if(e?.isPackage){const t=e?.packageCodeResolved||e?.barcode||"";return E(t||"-")}return E(e?.barcode||"-")}},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>E(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>E(v(String(e?.qty||1)))},{id:"unitPrice",labelKey:null,fallback:"لكل يوم",render:e=>E(v(Number(e?.unitPriceValue||0).toFixed(2)))},{id:"price",labelKey:null,fallback:"المجموع",render:e=>E(v(Number(e?.price||0).toFixed(2)))}],hi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(v(String(t+1)))},{id:"position",labelKey:"reservations.details.crew.position",fallback:"المنصب",render:e=>E(v(e?.positionLabel??e?.position_name??e?.role??o("reservations.crew.positionFallback","منصب بدون اسم")))},{id:"unitPrice",labelKey:null,fallback:"لكل يوم",render:e=>{const t=Number.isFinite(Number(e?.positionClientPrice))?Number(e.positionClientPrice):0;return E(`${v(t.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}},{id:"price",labelKey:null,fallback:"المجموع",render:e=>{const t=Number.isFinite(Number(e?.positionClientPrice))?Number(e.positionClientPrice):0;return E(`${v(t.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}}],Ds={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:gi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:[...hi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),{id:"groupByPosition",labelKey:null,fallback:"تجميع حسب المنصب",default:!1}]},Fd=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(v(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>E(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>E(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>E(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],yo=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(v(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>E(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>E(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>E(e?.note||"-")}],Dd=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(v(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>E(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>E(v(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>E(v(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>E(e?.displayCost||"—")}],Rd=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"الخدمات الإنتاجية",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],Md={customerInfo:Ds.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:Ds.payment,projectExpenses:yo.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:[...Fd.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),{id:"groupByPosition",labelKey:null,fallback:"تجميع حسب المنصب",default:!1}],projectEquipment:Dd.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},qs=new Map;function ss(e="reservation"){if(qs.has(e))return qs.get(e);const t=e==="project"?Rd:Bd,n=e==="project"?Md:Ds,a=new Set(t.map(({id:r})=>r)),s=Object.fromEntries(Object.entries(n).map(([r,c=[]])=>[r,new Set(c.map(l=>l.id))])),i={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return qs.set(e,i),i}function is(e="reservation"){return ss(e).sectionDefs}function bo(e="reservation"){return ss(e).fieldDefs}function go(e="reservation"){return ss(e).sectionIdSet}function ho(e="reservation"){return ss(e).fieldIdMap}function vo(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const zd="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",Od="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",Hd="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",qo=xd.trim(),So=/^data:image\/svg\+xml/i,Vd=/\.svg($|[?#])/i,Gn=512,Rs="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",Eo=96,wo=25.4,Ms=210,va=297,qa=Math.round(Ms/wo*Eo),Sa=Math.round(va/wo*Eo);function $n(e){const t=Number(e),n=Number.isFinite(t)?t:0;try{return v(n.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}))}catch{return v(n.toFixed(2))}}let Ba=!1,Fa=null;function Ao(){Ba||(Fa=async function(){try{if(!$||!Z?.modal?.classList.contains("show")||($.context||"reservation")!=="reservation")return;const n=$.reservation;if(!n)return;const a=[n.id,n.reservationId,n.reservation_id,n.reservationCode,n.reservation_code].map(u=>u==null?"":String(u)).filter(u=>u.length>0);if(!a.length)return;const s=Mt(),i=(Array.isArray(s)?s:[]).find(u=>[u?.id,u?.reservationId,u?.reservation_id,u?.reservationCode,u?.reservation_code].map(f=>f==null?"":String(f)).filter(f=>f.length>0).some(f=>a.includes(f)));if(!i)return;const r=xi(i),{totalsDisplay:c,totals:l,rentalDays:d}=Do(i,r,$.project);$.reservation=i,$.crewAssignments=r,$.totals=l,$.totalsDisplay=c,$.rentalDays=d,Uo(),an()}catch(t){console.warn("[reservationPdf] live update failed",t)}},document.addEventListener("reservations:changed",Fa),Ba=!0)}function xo(){if(Ba){try{document.removeEventListener("reservations:changed",Fa)}catch{}Fa=null,Ba=!1}}const Io=2,_o=/safari/i,Kd=/(iphone|ipad|ipod)/i,er=/(iphone|ipad|ipod)/i,Ud=/(crios|fxios|edgios|opios)/i,Da="[reservations/pdf]";let Z=null,$=null,Pt=1,Kn=null,Un=null,Jt=null,Cn=null,Xn=!1;function fn(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!Z?.statusIndicator||!Z?.statusText)return;Z.statusKind=e;const i=t||vo(e);Z.statusText.textContent=i,Z.statusSpinner&&(Z.statusSpinner.hidden=!s),Z.statusAction&&(Z.statusAction.hidden=!0,Z.statusAction.onclick=null,n&&typeof a=="function"&&(Z.statusAction.textContent=n,Z.statusAction.hidden=!1,Z.statusAction.onclick=r=>{r.preventDefault(),a()})),Z.statusIndicator.hidden=!1,requestAnimationFrame(()=>{Z.statusIndicator.classList.add("is-visible")})}function Nn(e){try{return String(e||"").toLowerCase().normalize("NFKD").replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,"").replace(/\s+/g," ").trim()}catch{return String(e||"").trim().toLowerCase()}}function Jn(e){!Z?.statusIndicator||!Z?.statusText||(Z.statusKind=null,Z.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{Z?.statusIndicator&&(Z.statusIndicator.hidden=!0,Z.statusAction&&(Z.statusAction.hidden=!0,Z.statusAction.onclick=null),Z.statusSpinner&&(Z.statusSpinner.hidden=!1))},220))}function zs(){return!!window?.bootstrap?.Modal}function Qd(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),Jt||(Jt=document.createElement("div"),Jt.className="modal-backdrop fade show",Jt.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(Jt)),Cn||(Cn=t=>{t.key==="Escape"&&Os(e)},document.addEventListener("keydown",Cn));try{e.focus({preventScroll:!0})}catch{}}}function Os(e){if(!(!e||!e.classList.contains("show"))){e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),Jt&&(Jt.remove(),Jt=null),Cn&&(document.removeEventListener("keydown",Cn),Cn=null);try{xo()}catch{}}}function Gd(e){if(e){if(zs()){const t=window.bootstrap.Modal.getOrCreateInstance(e);try{e.addEventListener("hidden.bs.modal",()=>{try{xo()}catch{}},{once:!0})}catch{}t.show();return}Qd(e)}}function Wd(){if(Xn)return;Xn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!Z?.modal?.classList.contains("show"),s=()=>{Z?.modal?.classList.contains("show")&&(fn("render"),Xn=!1,an())};yr({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:fo}),a&&fn("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function rs(e="reservation"){const t={},n=bo(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(i=>i?.default!==!1).map(i=>i.id))}),t}function vi(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function Xd(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function qi(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function Si(e="reservation"){return Object.fromEntries(is(e).map(({id:t})=>[t,!1]))}function Ei(e,t){return e.sectionExpansions||(e.sectionExpansions=Si(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Jd(e,t){return Ei(e,t)?.[t]!==!1}function wi(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function Yd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Kd.test(e)}function Zd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=_o.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function ko(){return Yd()&&Zd()}function os(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=er.test(e)||er.test(t),s=/Macintosh/i.test(e)&&n>1;return _o.test(e)&&!Ud.test(e)&&(a||s)}function Ss(e,...t){try{console.log(`${Da} ${e}`,...t)}catch{}}function Ht(e,...t){try{console.warn(`${Da} ${e}`,...t)}catch{}}function eu(e,t,...n){try{t?console.error(`${Da} ${e}`,t,...n):console.error(`${Da} ${e}`,...n)}catch{}}function Ve(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function tu(e,t="لا توجد بيانات للعرض."){const n=E(o(e,t));return Ve(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Ra(e,t){return Array.isArray(e)&&e.length?e:[tu(t)]}const nu=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function $o(e=""){return nu.test(e)}function au(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(i,...r){if(typeof i!="string"||!$o(i))return a.call(this,i,...r);let c,l=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),l=!0)}catch{}try{if(!l){const d=this.canvas;d&&d.style?.direction!=="rtl"&&(d.__artRatioOriginalDirection=d.style.direction,d.style.direction="rtl")}return a.call(this,i,...r)}finally{if(l&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!l){const d=this.canvas;d&&d.__artRatioOriginalDirection!==void 0&&(d.style.direction=d.__artRatioOriginalDirection,delete d.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function tr(e,t=Gn){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function su(e){if(!e)return{width:Gn,height:Gn};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?tr(t,0):0,s=n?tr(n,0):0;if(a>0&&s>0)return{width:a,height:s};const i=e.getAttribute?.("viewBox");if(i){const r=i.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(r.length>=4){const[,,c,l]=r;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(l)&&l>0?l:0)}}return{width:a||Gn,height:s||Gn}}function Po(e=""){return typeof e!="string"?!1:So.test(e)||Vd.test(e)}function iu(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function ru(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=i=>{const r=i?.message||`Unable to load image from ${e}`;a(new Error(r))},s.src=e})}async function Co(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const i=await ru(s),r=n.createElement("canvas"),c=Math.max(t.width||i.naturalWidth||i.width||0,1),l=Math.max(t.height||i.naturalHeight||i.height||c,1);r.width=c,r.height=l;const d=r.getContext("2d");return d.clearRect(0,0,c,l),d.drawImage(i,0,0,c,l),r.toDataURL("image/png")}catch(i){return console.warn("[reservations/pdf] failed to rasterize SVG content",i),null}finally{URL.revokeObjectURL(s)}}async function ou(e){if(!e)return null;if(So.test(e))return iu(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function cu(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!Po(t))return!1;const n=await ou(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",Rs),!1;const a=await Co(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",Rs),!1)}async function lu(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=su(e),s=await Co(n,a),r=(e.ownerDocument||document).createElement("img");r.setAttribute("src",s||Rs),r.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),r.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&r.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&r.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),l=e.getAttribute("height");return c&&r.setAttribute("width",c),l&&r.setAttribute("height",l),e.parentNode?.replaceChild(r,e),!!s}async function No(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{Po(s.getAttribute?.("src"))&&a.push(cu(s))}),n.forEach(s=>{a.push(lu(s))}),a.length&&await Promise.allSettled(a)}function du(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const i=(R,W=0)=>{const M=parseFloat(R);return Number.isFinite(M)?M:W},r=i(s.paddingTop),c=i(s.paddingBottom),l=i(s.paddingRight),d=i(s.paddingLeft),u=i(s.borderRadius),b=i(s.fontSize,14),f=(()=>{const R=s.lineHeight;if(!R||R==="normal")return b*1.6;const W=i(R,b*1.6);return W>0?W:b*1.6})(),m=Math.max(e.clientWidth||0,e.scrollWidth||0,i(s.width,0));if(m<=0)return null;const p=Math.max(1,m-d-l),g=e.textContent||"",q=g.split(/\r?\n/),_=n.createElement("canvas"),S=_.getContext("2d");if(!S)return null;const N=s.fontStyle||"normal",x=s.fontVariant||"normal",z=s.fontWeight||"400",w=s.fontFamily||"sans-serif",I=s.fontStretch||"normal",T=R=>R.join(" "),B=[],X=R=>S.measureText(R).width;S.font=`${N} ${x} ${z} ${I} ${b}px ${w}`,q.forEach(R=>{const W=R.trim();if(W.length===0){B.push("");return}const M=W.split(/\s+/);let V=[];M.forEach((O,ne)=>{const pe=O.trim();if(!pe)return;const ae=T(V.concat(pe));if(X(ae)<=p||V.length===0){V.push(pe);return}B.push(T(V)),V=[pe]}),V.length&&B.push(T(V))}),B.length||B.push("");const P=r+c+B.length*f,D=Math.ceil(Math.max(1,m)*t),G=Math.ceil(Math.max(1,P)*t);_.width=D,_.height=G,_.style.width=`${Math.max(1,m)}px`,_.style.height=`${Math.max(1,P)}px`,S.scale(t,t);const F=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){S.save(),S.beginPath();const R=Math.max(1,m),W=Math.max(1,P),M=Math.min(u,R/2,W/2);S.moveTo(M,0),S.lineTo(R-M,0),S.quadraticCurveTo(R,0,R,M),S.lineTo(R,W-M),S.quadraticCurveTo(R,W,R-M,W),S.lineTo(M,W),S.quadraticCurveTo(0,W,0,W-M),S.lineTo(0,M),S.quadraticCurveTo(0,0,M,0),S.closePath(),S.clip()}if(S.fillStyle=F,S.fillRect(0,0,Math.max(1,m),Math.max(1,P)),S.font=`${N} ${x} ${z} ${I} ${b}px ${w}`,S.fillStyle=s.color||"#000000",S.textBaseline="top",S.textAlign="right","direction"in S)try{S.direction="rtl"}catch{}const L=Math.max(0,m-l);let j=r;B.forEach(R=>{const W=R.length?R:" ";S.fillText(W,L,j,p),j+=f});const Q=n.createElement("img");let J;try{J=_.toDataURL("image/png")}catch(R){return Ht("note canvas toDataURL failed",R),null}return Q.src=J,Q.alt=g,Q.style.width=`${Math.max(1,m)}px`,Q.style.height=`${Math.max(1,P)}px`,Q.style.display="block",Q.setAttribute("data-quote-note-image","true"),{image:Q,canvas:_,totalHeight:P,width:m}}function uu(e,{pixelRatio:t=1}={}){if(!e||!os())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!$o(a.textContent||""))return;let s;try{s=du(a,{pixelRatio:t})}catch(i){Ht("failed to rasterize note content",i),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function Hs(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){eu(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const i=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),r=n||i,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),l=o("reservations.quote.toast.retry","إعادة المحاولة"),d=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(fn("export"),Qo()):(fn("render"),Xn=!1,an())};if(yr({message:r,duration:9e3,actionLabel:d?l:void 0,onAction:d?u:void 0,linkLabel:c,linkHref:fo}),Z?.modal?.classList.contains("show")&&fn("error",{message:r,actionLabel:d?l:void 0,onAction:d?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function Vs({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){Ht("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){Ht("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function Ai(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",i=>n(i)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=i=>n(i),document.head.appendChild(s)})}function nr(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function ar(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function pu(){const e=ar();return e||(Un||(Un=Ai(Od).catch(t=>{throw Un=null,t}).then(()=>{const t=ar();if(!t)throw Un=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Un)}async function mu(){const e=nr();return e||(Kn||(Kn=Ai(Hd).catch(t=>{throw Kn=null,t}).then(()=>{const t=nr();if(!t)throw Kn=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),Kn)}async function fu(){if(window.html2pdf||await Ai(zd),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}Nd(),au()}function E(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function yu(e="reservation"){return e==="project"?"QP":"Q"}function bu(e,t="reservation"){const n=Number(e),a=yu(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function gu(){const e=window.localStorage?.getItem?.(mo),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function Lo(e="reservation"){const n=gu()+1;return{sequence:n,quoteNumber:bu(n,e)}}function hu(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(mo,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function jo(e="reservation"){return Zi[e]||Zi.reservation}function vu(e="reservation"){try{const t=jo(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function qu(e,t="reservation"){try{const n=jo(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function Su(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function Eu(e,t="reservation"){if(!e)return null;const n=go(t),a=ho(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),i={},r=e.fields||{};return Object.entries(a).forEach(([c,l])=>{const d=r[c];if(d==null)return;const{ids:u,emptyExplicitly:b}=Su(d);if(!u&&!b)return;const f=Array.isArray(u)?u.filter(m=>l.has(m)):[];(f.length>0||b)&&(i[c]=f)}),{version:1,sections:s,fields:i}}function To(e){if(!e)return;const t=e.context||"reservation",n=Eu(e,t);n&&qu(n,t)}function Bo(e){if(!e)return;const t=e.context||"reservation",n=vu(t);if(!n)return;const a=go(t),s=Array.isArray(n.sections)?n.sections.filter(i=>a.has(i)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const i=vi(e.fields||rs(t)),r=ho(t);Object.entries(n.fields).forEach(([c,l])=>{const d=r[c];if(!d)return;const u=Array.isArray(l)?l.filter(b=>d.has(b)):[];i[c]=new Set(u)}),e.fields=i}}function Fo(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function xi(e){const t=bn()||[],{technicians:n=[]}=ge(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const c=String(r.id),l=s.get(c)||{};s.set(c,{...l,...r})}),(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(r=>({technicianId:r}))).map((r,c)=>{const l=r?.technicianId!=null?s.get(String(r.technicianId)):null;let d=r.positionLabel??r.position_name??r.position_label??r.role??r.position??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم");(!d||d.trim()==="")&&(d=r.positionLabelAr??r.position_label_ar??r.positionLabelEn??r.position_label_en??r.position_name_ar??r.position_name_en??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم"));try{const f=typeof Wt=="function"?Wt()||[]:[];let m=null;if(r?.positionId!=null&&(m=f.find(p=>String(p?.id)===String(r.positionId))||null),!m){const p=r.positionKey??r.position_key??r.positionName??r.position_name??r.position??"";if(p&&(m=typeof Aa=="function"&&Aa(p)||null,!m&&f.length)){const g=String(p).trim().toLowerCase();m=f.find(q=>[q.name,q.labelAr,q.labelEn].filter(Boolean).map(_=>String(_).toLowerCase()).includes(g))||null}}if(m){const p=m.labelAr||m.labelEn||m.name||"";p&&p.trim()&&(d=p)}}catch{}const u=$e(Qe(r.positionCost??r.position_cost??r.cost??r.daily_wage??r.dailyWage??l?.dailyWage??l?.wage??0)),b=$e(Qe(r.positionClientPrice??r.position_client_price??r.client_price??r.clientPrice??r.daily_total??r.dailyTotal??r.total??l?.dailyTotal??l?.total??l?.total_wage??0));return{assignmentId:r.assignmentId??r.assignment_id??`crew-${c}`,positionId:r.positionId??r.position_id??null,positionLabel:d,positionLabelAlt:r.positionLabelAlt??r.position_label_alt??"",positionCost:u,positionClientPrice:b,technicianId:r.technicianId!=null?String(r.technicianId):l?.id!=null?String(l.id):null,technicianName:r.technicianName??r.technician_name??l?.name??null,technicianRole:r.technicianRole??l?.role??null}})}function Do(e,t,n){const{projectLinked:a}=nn(e,n);Wa(e.start,e.end);const s=e.discount??e.discountValue??0,i=Number(v(String(s)))||0,r=e.discountType??e.discount_type??"percent",c=String(r).toLowerCase()==="amount"?"amount":"percent",l=a?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),d=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,u=d!=null?Qe(d):Number.NaN,f=(e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied)===!0&&Number.isFinite(u)&&u>0?u:null,m=Array.isArray(t)?t.map(x=>x?.technicianId).filter(Boolean):[],p=Ar({items:Array.isArray(e.items)?e.items:[],technicianIds:m,crewAssignments:Array.isArray(t)?t:[],discount:i,discountType:c,applyTax:l,start:e.start,end:e.end,companySharePercent:f}),g=Qe(e.cost??e.total??e.finalTotal),q=Number.isFinite(g),_=a?p.finalTotal:q?$e(g):p.finalTotal,S={equipmentTotal:p.equipmentTotal,crewTotal:p.crewTotal,crewCostTotal:p.crewCostTotal,discountAmount:p.discountAmount,subtotalAfterDiscount:p.subtotalAfterDiscount,taxableAmount:p.taxableAmount,taxAmount:p.taxAmount,finalTotal:_,companySharePercent:p.companySharePercent,companyShareAmount:p.companyShareAmount,netProfit:p.netProfit},N={equipmentTotal:v(p.equipmentTotal.toFixed(2)),crewTotal:v(p.crewTotal.toFixed(2)),discountAmount:v(p.discountAmount.toFixed(2)),subtotalAfterDiscount:v(p.subtotalAfterDiscount.toFixed(2)),taxableAmount:v(p.taxableAmount.toFixed(2)),taxAmount:v(p.taxAmount.toFixed(2)),finalTotal:v(_.toFixed(2)),companySharePercent:v((Number.isFinite(p.companySharePercent)?p.companySharePercent:0).toFixed(2)),companyShareAmount:v(p.companyShareAmount.toFixed(2)),netProfit:v(p.netProfit.toFixed(2))};return{totals:S,totalsDisplay:N,rentalDays:p.rentalDays}}function Fn(e){if(e==null||e==="")return null;const t=Number.parseFloat(v(String(e)));return Number.isFinite(t)?t:null}function Ro(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function wu(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=Fn(e.amount??(n==="amount"?e.value:null)),s=Fn(e.percentage??(n==="percent"?e.value:null)),i=n==="percent"?s??null:a??null,r=e.note??e.memo??null,c=Ro(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:i,note:r,recordedAt:c}}function Au(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(wu).filter(Boolean);if(n.length>0)return n;const a=Fn(e.paidPercent??e.paid_percent),s=Fn(e.paidAmount??e.paid_amount),i=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,r=Ro(i);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:r}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:r}]:[]}function xu(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function Iu(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function _u(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function ku(e){const t=Number(e?.equipmentEstimate)||0,n=_u(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",i=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?i:a*(i/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const l=Math.max(0,a-c),d=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,b=d&&s&&u>0?u:0,f=b>0?Number((l*(b/100)).toFixed(2)):0,m=l+f;let p=s?m*oo:0;(!Number.isFinite(p)||p<0)&&(p=0),p=Number(p.toFixed(2));let g=s?Number(e?.totalWithTax):m;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((m+p).toFixed(2))):g=m,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:l,companyShareAmount:f,subtotal:m,applyTax:s,taxAmount:p,totalWithTax:g}}function $u(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(v(String(n)))||0,s=e.discountType||"percent",i=Array.isArray(e.crewAssignments)?e.crewAssignments:[],r=i.length?i:Array.isArray(e.technicians)?e.technicians:[],c=Zs(t,a,s,!1,r,{start:e.start,end:e.end});if(Number.isFinite(c))return c;const l=Number(v(String(e.cost??0)));return Number.isFinite(l)?Math.round(l):0}function Pu(e,t){if(!e)return"—";const n=mt(e);return t?`${n} - ${mt(t)}`:n}function fe(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${v(a.toFixed(s))} ${t}`}function sr(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${v(Number(e).toFixed(n))}%`}function Cu(e){if(!e?.start)return null;if(!e?.end)return 1;const t=Wa(e.start,e.end);return Number.isFinite(t)?t:1}function Nu(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${v(String(Math.round(e)))} أيام`:"غير محدد"}function ir(e){const t=o("reservations.create.summary.currency","SR"),n=ge()||{},a=Array.isArray(n.customers)?n.customers:[],s=Array.isArray(n.projects)?n.projects:[],i=Array.isArray(n.technicians)?n.technicians:[];let r=[];try{const h=Mt?.()||[];r=Array.isArray(h)&&h.length?h:n.reservations||[]}catch{r=n.reservations||[]}const c=e?.id!=null?s.find(h=>String(h.id)===String(e.id))||e:e||null,l={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!c)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:l.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:fe(0,t),expensesTotal:fe(0,t),reservationsTotal:fe(0,t),discountAmount:fe(0,t),taxAmount:fe(0,t),overallTotal:fe(0,t),paidAmount:fe(0,t),remainingAmount:fe(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:l.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:fe(0,t),remainingAmountDisplay:fe(0,t),paidPercentDisplay:sr(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:l.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const d=c.clientId??c.customerId??c.client_id??c.customer_id??null,u=d!=null&&a.find(h=>String(h.id)===String(d))||null,b=u?.customerName??u?.name??c.clientName??c.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),f=(c.clientCompany||u?.companyName||u?.company||"").trim(),m=u?.phone??u?.customerPhone??c.clientPhone??c.customerPhone??"",p=m?v(String(m).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),g=u?.email??c.clientEmail??c.customerEmail??"",q=g?String(g).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),_=c.projectCode||`PRJ-${v(String(c.id??""))}`,S=v(String(_)),N=(c.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),x=xu(c.type),z=c.start?mt(c.start):"—",w=c.end?mt(c.end):"—",I=Cu(c),T=I!=null?Nu(I):"غير محدد",B=Iu(c),X={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},P=o(`projects.status.${B}`,X[B]||B),D=c.id!=null?String(c.id):null,G=D?r.filter(h=>{const H=h?.projectId??h?.project_id??null;return H!=null&&String(H)===D}):[],L=G.map(h=>{const H=h.reservationId||h.id||"",C=h.status||h.state||"pending",ee=String(C).toLowerCase(),te=o(`reservations.status.${ee}`,ee),ie=$u(h),Ce=h.start?new Date(h.start).getTime():0;return{reservationId:v(String(H||"-")),status:ee,statusLabel:te,total:ie,totalLabel:fe(ie,t),dateRange:Pu(h.start,h.end),startTimestamp:Number.isNaN(Ce)?0:Ce}}).sort((h,H)=>H.startTimestamp-h.startTimestamp).map(({startTimestamp:h,...H})=>H).reduce((h,H)=>h+(Number(H.total)||0),0),j=[];try{G.forEach(h=>{const{groups:H}=ai(h);H.forEach(C=>{const ee=Number(C?.count??C?.quantity??1)||1,te=Number(C?.unitPrice);let ie=Number.isFinite(te)?te:0;if(!ie||ie<=0){const Be=Number(C?.totalPrice);Number.isFinite(Be)&&ee>0&&(ie=Number((Be/ee).toFixed(2)))}Number.isFinite(ie)||(ie=0);const Ce=C?.type==="package"||Array.isArray(C?.items)&&C.items.some(Be=>Be?.type==="package"),de=Array.isArray(C?.barcodes)&&C.barcodes.length?C.barcodes[0]:Array.isArray(C?.items)&&C.items.length?C.items[0]?.barcode:null;let re=C?.packageDisplayCode??C?.package_code??C?.code??C?.packageCode??(Array.isArray(C?.items)&&C.items.length?C.items[0]?.package_code??C.items[0]?.code??C.items[0]?.packageCode:null);const _e=Be=>{const Ze=(Be==null?"":String(Be)).trim();return!!(!Ze||/^pkg-/i.test(Ze)||/^\d+$/.test(Ze)&&Ze.length<=4)};if(!re||_e(re)){const Be=C?.packageId??C?.package_id??(Array.isArray(C?.items)&&C.items.length?C.items[0]?.packageId??C.items[0]?.package_id:null);if(Be)try{const Ze=Ys(Be);Ze&&Ze.package_code&&(re=Ze.package_code)}catch{}}if(!re||_e(re))try{const Be=Nn(C?.description||"");if(Be){const Ze=xr();let Bt=Ze.find(bt=>Nn(bt?.name||bt?.title||bt?.label||"")===Be);Bt||(Bt=Ze.find(bt=>{const k=Nn(bt?.name||bt?.title||bt?.label||"");return k.includes(Be)||Be.includes(k)})),Bt&&Bt.package_code&&(re=Bt.package_code)}}catch{}const It=Ce?re??de??"":C?.barcode??de??"",rt=It!=null?String(It):"",Tt=Number.isFinite(Number(C?.totalPrice))?Number(C.totalPrice):Number((ie*ee).toFixed(2));j.push({...C,isPackage:Ce,desc:C?.description,barcode:rt,packageCodeResolved:re||"",qty:ee,price:ie,totalPrice:$e(Tt),unitPriceValue:ie})})})}catch{}const Q=new Map;G.forEach(h=>{const H=Array.isArray(h.items)?h.items:[],C=Wa(h.start,h.end),ee=h.reservationId||h.id||"";H.forEach((te,ie)=>{if(!te)return;const Ce=te.barcode||te.code||te.id||te.desc||te.description||`item-${ie}`,de=String(Ce||`item-${ie}`),re=Q.get(de)||{description:te.desc||te.description||te.name||te.barcode||`#${v(String(ie+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},_e=Number(te.qty)||1,It=Number(te.price)||0;re.totalQuantity+=_e,re.reservationIds.add(String(ee));const rt=It*_e*Math.max(1,C);Number.isFinite(rt)&&(re.totalCost+=rt),Q.set(de,re)})});const J=Array.from(Q.values()).map(h=>({description:h.description,totalQuantity:h.totalQuantity,reservationsCount:h.reservationIds.size,displayCost:fe(h.totalCost,t)})),R=new Map((i||[]).filter(Boolean).map(h=>[String(h.id),h])),W=new Map,M=h=>{if(!h)return;let H=null;typeof h=="object"?H=h.id??h.technicianId??h.technician_id??h.userId??h.user_id??null:(typeof h=="string"||typeof h=="number")&&(H=h);const C=H!=null?String(H):null,ee=C&&R.has(C)?R.get(C):typeof h=="object"?h:null,te=ee?.name||ee?.full_name||ee?.fullName||ee?.displayName||(typeof h=="string"?h:null),ie=ee?.role||ee?.title||null,Ce=ee?.phone||ee?.mobile||ee?.contact||null;if(!te&&!C)return;const de=C||te;W.has(de)||W.set(de,{id:C,name:te||"-",role:ie||null,phone:Ce||null})};Array.isArray(c?.technicians)&&c.technicians.forEach(h=>M(h)),G.forEach(h=>{(Array.isArray(h.crewAssignments)&&h.crewAssignments.length?h.crewAssignments:Array.isArray(h.technicians)?h.technicians.map(C=>({technicianId:C})):[]).forEach(C=>M(C))});const V=Array.from(W.values()),O=Array.isArray(c.expenses)?c.expenses.map(h=>{const H=Number(h?.amount)||0;return{label:h?.label||h?.name||"-",amount:H,displayAmount:fe(H,t),note:h?.note||h?.description||""}}):[],ne=ku(c),pe=ne.applyTax?Number(((ne.subtotal+L)*oo).toFixed(2)):0,ae=Number((ne.subtotal+L+pe).toFixed(2)),Pe=Au(c),Le=Fn(c.paidAmount??c.paid_amount)||0,Y=Fn(c.paidPercent??c.paid_percent)||0,se=ei({totalAmount:ae,paidAmount:Le,paidPercent:Y,history:Pe}),Ae=typeof c.paymentStatus=="string"?c.paymentStatus.toLowerCase():"",De=ti({manualStatus:Ae,paidAmount:se.paidAmount,paidPercent:se.paidPercent,totalAmount:ae}),tt={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},Ye=o(`projects.paymentStatus.${De}`,tt[De]||De),je=Number(se.paidAmount||0),he=Number(se.paidPercent||0),Ie=Math.max(0,Number((ae-je).toFixed(2))),Te={projectSubtotal:fe(ne.subtotal,t),expensesTotal:fe(ne.expensesTotal,t),reservationsTotal:fe(L,t),discountAmount:fe(ne.discountAmount,t),taxAmount:fe(pe,t),overallTotal:fe(ae,t),paidAmount:fe(je,t),remainingAmount:fe(Ie,t)},it={status:De,statusLabel:Ye,paidAmount:je,paidPercent:he,remainingAmount:Ie,paidAmountDisplay:fe(je,t),remainingAmountDisplay:fe(Ie,t),paidPercentDisplay:sr(he)},K=(c.description||"").trim();return{project:c,customer:u,clientInfo:{name:b,company:f||"—",phone:p,email:q},projectInfo:{title:N,code:S,typeLabel:x,startDisplay:z,endDisplay:w,durationLabel:T,statusLabel:P},expenses:O,equipment:J,crew:V,equipmentItems:j,crewAssignments:G.flatMap(h=>xi(h)),totals:ne,totalsDisplay:Te,projectTotals:{combinedTaxAmount:pe,overallTotal:ae,reservationsTotal:L,paidAmount:je,paidPercent:he,remainingAmount:Ie,paymentStatus:De},paymentSummary:it,notes:K,currencyLabel:t,projectStatus:B,projectStatusLabel:P,projectDurationDays:I,projectDurationLabel:T,paymentHistory:Pe}}function Lu({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:i=[],totalsDisplay:r={},projectTotals:c={},paymentSummary:l={},currencyLabel:d="SR",sections:u,fieldSelections:b={},quoteNumber:f,quoteDate:m,terms:p=lt}){const g=vi(b),q=(h,H)=>qi(g,h,H),_=h=>u?.has?.(h),S=`<div class="quote-placeholder">${E(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,N=(h,H)=>`<div class="info-plain__item">
      <span class="info-plain__label">${E(h)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${E(H)}</span>
    </div>`,x=(h,H,{variant:C="inline"}={})=>C==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${E(h)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${E(H)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${E(h)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${E(H)}</span>
    </span>`,z=(h,H)=>`<div class="payment-row">
      <span class="payment-row__label">${E(h)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${E(H)}</span>
    </div>`,w=[];q("customerInfo","customerName")&&w.push(N(o("projects.details.client","العميل"),t.name||"-")),q("customerInfo","customerCompany")&&w.push(N(o("projects.details.company","شركة العميل"),t.company||"—")),q("customerInfo","customerPhone")&&w.push(N(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),q("customerInfo","customerEmail")&&w.push(N(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const I=_("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${E(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${w.length?`<div class="info-plain">${w.join("")}</div>`:S}
      </section>`:"",T=[];q("projectInfo","projectType")&&T.push(N(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),q("projectInfo","projectTitle")&&T.push(N(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),q("projectInfo","projectCode")&&T.push(N(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),q("projectInfo","projectStart")&&T.push(N(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),q("projectInfo","projectEnd")&&T.push(N(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),q("projectInfo","projectDuration")&&T.push(N(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),q("projectInfo","projectStatus")&&T.push(N(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const B=_("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${E(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${T.length?`<div class="info-plain">${T.join("")}</div>`:S}
      </section>`:"",X=hi.filter(h=>q("crew",h.id)),P=Array.isArray($?.crewAssignments)?$.crewAssignments:[],D=q("projectCrew","groupByPosition"),G=h=>{const H=h&&h.positionId!=null?`id:${String(h.positionId)}`:(()=>{const te=(h?.positionLabel||h?.position_name||h?.position||"").trim().toLowerCase();return te?`label:${te}`:""})(),C=Number.isFinite(Number(h?.positionClientPrice))?Number(h.positionClientPrice):0,ee=C>0?`|p:${C.toFixed(2)}`:"";return`${H}${ee}`},F=(()=>{const h=new Map;return P.forEach(H=>{const C=G(H);C&&h.set(C,(h.get(C)||0)+1)}),h})(),L=(()=>{const h=[];X.forEach(te=>{te.id==="position"?(h.push({...te,render:ie=>{const Ce=ie?.positionLabel??ie?.position_name??ie?.role??o("reservations.crew.positionFallback","منصب بدون اسم");if(D)return E(v(String(Ce)));const de=G(ie),re=de&&F.get(de)||0,_e=re>1?` × ${v(String(re))}`:"";return E(v(String(Ce))+_e)}}),h.push({id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:ie=>E(v(String(Math.max(1,Number(ie?.__count||1)))))})):te.id==="price"?D?h.push({...te,render:ie=>{const Ce=Number.isFinite(Number(ie?.positionClientPrice))?Number(ie.positionClientPrice):0,de=Math.max(1,Number(ie?.__count||1)),re=Math.max(1,Number($?.rentalDays||1)),_e=Ce*de*re;return E(`${$n(_e)} ${o("reservations.create.summary.currency","SR")}`)}}):h.push({...te,render:ie=>{const Ce=Number.isFinite(Number(ie?.positionClientPrice))?Number(ie.positionClientPrice):0,de=Math.max(1,Number($?.rentalDays||1)),re=Ce*de;return E(`${$n(re)} ${o("reservations.create.summary.currency","SR")}`)}}):h.push(te)});const H=Math.max(1,Number($?.rentalDays||1)),C=h.findIndex(te=>te.id==="price"),ee=Math.max(0,C);return h.splice(ee,0,{id:"days",labelKey:null,fallback:"الأيام",render:()=>E(v(String(H)))}),h})(),j=D?(()=>{const h=new Map;return P.forEach(H=>{const C=G(H);if(!C)return;const ee=h.get(C);ee?ee.__count+=1:h.set(C,{...H,__count:1})}),Array.from(h.values())})():P,Q=(()=>{try{const h=(j||[]).reduce((H,C)=>{const ee=Number.isFinite(Number(C?.positionClientPrice))?Number(C.positionClientPrice):0,te=Math.max(1,Number(C?.__count||1));return H+ee*te},0);return v(h.toFixed(2))}catch{return"0.00"}})(),J=_("projectCrew")?L.length?`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${L.map(h=>`<th>${E(h.labelKey?o(h.labelKey,h.fallback):h.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${j.length?j.map((h,H)=>`<tr>${L.map(C=>`<td>${C.render(h,H)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(L.length,1)}" class="empty">${E(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
            <div class="quote-table-subtotal">
              <span class="quote-table-subtotal__label">${E(o("reservations.details.labels.crewTotal","إجمالي الفريق"))}</span>
              <span class="quote-table-subtotal__value">${E(`${Q} ${d}`)}</span>
            </div>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${S}
          </section>`:"",R=[];q("financialSummary","projectSubtotal")&&R.push(x(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),r.projectSubtotal||`${fe(0,d)}`)),q("financialSummary","expensesTotal")&&R.push(x(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),r.expensesTotal||fe(0,d))),q("financialSummary","reservationsTotal")&&R.push(x(o("projects.details.reservationsTotal","إجمالي الحجوزات"),r.reservationsTotal||fe(0,d))),q("financialSummary","discountAmount")&&R.push(x(o("reservations.details.labels.discount","الخصم"),r.discountAmount||fe(0,d))),q("financialSummary","taxAmount")&&R.push(x(o("projects.details.summary.combinedTax","إجمالي الضريبة"),r.taxAmount||fe(0,d)));const W=[];q("financialSummary","overallTotal")&&W.push(x(o("projects.details.summary.overallTotal","الإجمالي الكلي"),r.overallTotal||fe(0,d),{variant:"final"})),q("financialSummary","paidAmount")&&W.push(x(o("projects.details.summary.paidAmount","إجمالي المدفوع"),r.paidAmount||fe(0,d),{variant:"final"})),q("financialSummary","remainingAmount")&&W.push(x(o("projects.details.summary.remainingAmount","المتبقي للدفع"),r.remainingAmount||fe(0,d),{variant:"final"}));const M=_("financialSummary")?!R.length&&!W.length?`<section class="quote-section quote-section--financial">${S}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${E(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${R.length?`<div class="totals-inline">${R.join("")}</div>`:""}
            ${W.length?`<div class="totals-final">${W.join("")}</div>`:""}
          </div>
        </section>`:"",V=yo.filter(h=>q("projectExpenses",h.id)),O=_("projectExpenses")?V.length?`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.expenses","الخدمات الإنتاجية"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${V.map(h=>`<th>${E(h.labelKey?o(h.labelKey,h.fallback):h.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((h,H)=>`<tr>${V.map(C=>`<td>${C.render(h,H)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(V.length,1)}" class="empty">${E(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
            <div class="quote-table-subtotal">
              <span class="quote-table-subtotal__label">${E(o("projects.details.expensesTotal","إجمالي الخدمات الإنتاجية"))}</span>
              <span class="quote-table-subtotal__value">${E(`${r.expensesTotal||"0.00"} ${d}`)}</span>
            </div>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.expenses","الخدمات الإنتاجية"))}</h3>
            ${S}
          </section>`:"",ne=gi.filter(h=>q("items",h.id)),pe=(()=>{let h=[];ne.forEach(de=>{de.id==="price"?h.push({...de,render:re=>{const _e=Number.isFinite(Number(re?.unitPriceValue))?Number(re.unitPriceValue):0,It=Number.isFinite(Number(re?.qty))?Math.max(1,Number(re.qty)):1,rt=Math.max(1,Number($?.rentalDays||1)),Tt=_e*It*rt;return E(`${v(Tt.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}}):de.id==="unitPrice"?h.push({...de,render:re=>{const _e=Number.isFinite(Number(re?.unitPriceValue))?Number(re.unitPriceValue):0;return E(`${v(_e.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}}):h.push(de)});const H=Math.max(1,Number($?.rentalDays||1)),C=h.findIndex(de=>de.id==="price"),ee=Math.max(0,C);h.splice(ee,0,{id:"days",labelKey:null,fallback:"الأيام",render:()=>E(v(String(H)))});const te=new Map(h.map(de=>[de.id,de])),ie=h.filter(de=>!["unitPrice","quantity","days","price"].includes(de.id)),Ce=["unitPrice","quantity","days","price"].map(de=>te.get(de)).filter(Boolean);return h=[...ie,...Ce],h})(),ae=Array.isArray($?.equipmentItems)?$.equipmentItems:[],Pe=(()=>{try{const h=(ae||[]).reduce((H,C)=>{const ee=Number.isFinite(Number(C?.unitPriceValue))?Number(C.unitPriceValue):0,te=Number.isFinite(Number(C?.qty))?Math.max(1,Number(C.qty)):1;return H+ee*te},0);return v(h.toFixed(2))}catch{return"0.00"}})(),Le=_("projectEquipment")?pe.length?`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${pe.map(h=>`<th>${E(h.labelKey?o(h.labelKey,h.fallback):h.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${ae.length?ae.map((h,H)=>`<tr>${pe.map(C=>`<td>${C.render(h,H)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(pe.length,1)}" class="empty">${E(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
            <div class="quote-table-subtotal">
              <span class="quote-table-subtotal__label">${E(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"))}</span>
              <span class="quote-table-subtotal__value">${E(`${Pe} ${d}`)}</span>
            </div>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${S}
          </section>`:"",Y=(e?.description||"").trim()||"",se=_("projectNotes")?`<section class="quote-section">
        <h3>${E(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${E(Y||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",Ae=[];q("payment","beneficiary")&&Ae.push(z(o("reservations.quote.labels.beneficiary","اسم المستفيد"),We.beneficiaryName)),q("payment","bank")&&Ae.push(z(o("reservations.quote.labels.bank","اسم البنك"),We.bankName)),q("payment","account")&&Ae.push(z(o("reservations.quote.labels.account","رقم الحساب"),v(We.accountNumber))),q("payment","iban")&&Ae.push(z(o("reservations.quote.labels.iban","رقم الآيبان"),v(We.iban)));const De=`<section class="quote-section">
      <div class="payment-block">
        <h3>${E(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${Ae.length?Ae.join(""):S}</div>
      </div>
      <p class="quote-approval-note">${E(We.approvalNote)}</p>
    </section>`,tt=Array.isArray(p)&&p.length?p:lt,Ye=`<footer class="quote-footer">
        <h4>${E(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${tt.map(h=>`<li>${E(h)}</li>`).join("")}</ul>
      </footer>`,je=[],he=[];if(B&&he.push({key:"project",html:B}),I&&he.push({key:"customer",html:I}),he.length>1){const h=he.find(ee=>ee.key==="project"),H=he.find(ee=>ee.key==="customer"),C=[];h?.html&&C.push(h.html),H?.html&&C.push(H.html),je.push(Ve(`<div class="quote-section-row quote-section-row--primary">${C.join("")}</div>`,{blockType:"group"}))}else he.length===1&&je.push(Ve(he[0].html));const Ie=[];J&&Ie.push(Ve(J,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),O&&Ie.push(Ve(O,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),Le&&Ie.push(Ve(Le,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const Te=[];M&&Te.push(Ve(M,{blockType:"summary"})),se&&Te.push(Ve(se));const it=[Ve(De,{blockType:"payment"}),Ve(Ye,{blockType:"footer"})],K=[...Ra(je,"projects.quote.placeholder.primary"),...Ie,...Ra(Te,"projects.quote.placeholder.summary"),...it],ye=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${E(We.logoUrl)}" alt="${E(We.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${E(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${E(We.companyName)}</p>
        <p class="quote-company-cr">${E(o("reservations.quote.labels.cr","السجل التجاري"))}: ${E(We.commercialRegistry)}</p>
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
      <style>${qo}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${ye}
          ${K.join("")}
        </div>
      </div>
    </div>
  `}function Mo(e){if(e?.context==="project")return Lu(e);const{reservation:t,customer:n,project:a,crewAssignments:s,totals:i,totalsDisplay:r,rentalDays:c,currencyLabel:l,sections:d,fieldSelections:u={},quoteNumber:b,quoteDate:f,terms:m=lt}=e,p=v(String(t?.reservationId??t?.id??"")),g=t.start?v(mt(t.start)):"-",q=t.end?v(mt(t.end)):"-",_=n?.customerName||n?.full_name||n?.name||"-",S=n?.phone||"-",N=n?.email||"-",x=n?.company||n?.company_name||"-",z=v(S),w=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),I=a?.code||a?.projectCode||"",T=v(String(c)),B=t?.notes||"",X=Array.isArray(m)&&m.length?m:lt,P=vi(u),D=(k,be)=>qi(P,k,be),G=k=>d?.has?.(k),F=`<div class="quote-placeholder">${E(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,L=(k,be)=>`<div class="info-plain__item">${E(k)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${E(be)}</strong></div>`,j=(k,be,{variant:ke="inline"}={})=>ke==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${E(k)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${E(be)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${E(k)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${E(be)}</span>
    </span>`,Q=(k,be)=>`<div class="payment-row">
      <span class="payment-row__label">${E(k)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${E(be)}</span>
    </div>`,J=[];D("customerInfo","customerName")&&J.push(L(o("reservations.details.labels.customer","العميل"),_)),D("customerInfo","customerCompany")&&J.push(L(o("reservations.details.labels.company","الشركة"),x)),D("customerInfo","customerPhone")&&J.push(L(o("reservations.details.labels.phone","الهاتف"),z)),D("customerInfo","customerEmail")&&J.push(L(o("reservations.details.labels.email","البريد"),N));const R=G("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${E(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${J.length?`<div class="info-plain">${J.join("")}</div>`:F}
      </section>`:"",W=[];D("reservationInfo","reservationId")&&W.push(L(o("reservations.details.labels.reservationId","رقم الحجز"),p||"-")),D("reservationInfo","reservationStart")&&W.push(L(o("reservations.details.labels.start","بداية الحجز"),g)),D("reservationInfo","reservationEnd")&&W.push(L(o("reservations.details.labels.end","نهاية الحجز"),q)),D("reservationInfo","reservationDuration")&&W.push(L(o("reservations.details.labels.duration","عدد الأيام"),T));const M=G("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${E(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${W.length?`<div class="info-plain">${W.join("")}</div>`:F}
      </section>`:"",V=[];D("projectInfo","projectTitle")&&V.push(L(o("reservations.details.labels.project","المشروع"),w)),D("projectInfo","projectCode")&&V.push(L(o("reservations.details.labels.code","الرمز"),I||"-"));const O=G("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${E(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${V.length?`<div class="info-plain">${V.join("")}</div>`:F}
      </section>`:"",ne=[];(D("financialSummary","equipmentTotal")||D("financialSummary","crewTotal"))&&ne.push(j(o("reservations.details.labels.subtotalBeforeTax","الإجمالي قبل الضريبة"),`${r.taxableAmount} ${l}`)),D("financialSummary","discountAmount")&&ne.push(j(o("reservations.details.labels.discount","الخصم"),`${r.discountAmount} ${l}`)),D("financialSummary","taxAmount")&&ne.push(j(o("reservations.details.labels.tax","الضريبة"),`${r.taxAmount} ${l}`));const pe=D("financialSummary","finalTotal"),ae=[];pe&&ae.push(j(o("reservations.details.labels.total","الإجمالي النهائي"),`${r.finalTotal} ${l}`,{variant:"final"}));const Pe=ae.length?`<div class="totals-final">${ae.join("")}</div>`:"",Le=G("financialSummary")?!ne.length&&!pe?`<section class="quote-section quote-section--financial">${F}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${E(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${ne.length?`<div class="totals-inline">${ne.join("")}</div>`:""}
            ${Pe}
          </div>
        </section>`:"",{groups:Y}=ai(t),se=Y.map(k=>{const be=Number(k?.count??k?.quantity??1)||1,ke=Number(k?.unitPrice);let Ue=Number.isFinite(ke)?ke:0;if(!Ue||Ue<=0){const Ee=Number(k?.totalPrice);Number.isFinite(Ee)&&be>0&&(Ue=Number((Ee/be).toFixed(2)))}Number.isFinite(Ue)||(Ue=0);const gt=k?.type==="package"||Array.isArray(k?.items)&&k.items.some(Ee=>Ee?.type==="package"),ht=Array.isArray(k?.barcodes)&&k.barcodes.length?k.barcodes[0]:Array.isArray(k?.items)&&k.items.length?k.items[0]?.barcode:null;let et=k?.packageDisplayCode??k?.package_code??k?.code??k?.packageCode??(Array.isArray(k?.items)&&k.items.length?k.items[0]?.package_code??k.items[0]?.code??k.items[0]?.packageCode:null);const xe=Ee=>{const Ne=(Ee==null?"":String(Ee)).trim();return!!(!Ne||/^pkg-/i.test(Ne)||/^\d+$/.test(Ne)&&Ne.length<=4)};if(!et||xe(et)){const Ee=k?.packageId??k?.package_id??(Array.isArray(k?.items)&&k.items.length?k.items[0]?.packageId??k.items[0]?.package_id:null);if(Ee)try{const Ne=Ys(Ee);Ne&&Ne.package_code&&(et=Ne.package_code)}catch{}}if(!et||xe(et))try{const Ee=Nn(k?.description||"");if(Ee){const Ne=xr();let vt=Ne.find(Ft=>Nn(Ft?.name||Ft?.title||Ft?.label||"")===Ee);vt||(vt=Ne.find(Ft=>{const da=Nn(Ft?.name||Ft?.title||Ft?.label||"");return da.includes(Ee)||Ee.includes(da)})),vt&&vt.package_code&&(et=vt.package_code)}}catch{}const me=gt?et??ht??"":k?.barcode??ht??"",Fe=me!=null?String(me):"";let nt=Number.isFinite(Number(k?.totalPrice))?Number(k.totalPrice):Number((Ue*be).toFixed(2));return nt=$e(nt),{...k,isPackage:gt,desc:k?.description,barcode:Fe,packageCodeResolved:et||"",qty:be,price:nt,totalPrice:nt,unitPriceValue:Ue}}),Ae=gi.filter(k=>D("items",k.id)),De=(()=>{let k=[];Ae.forEach(xe=>{xe.id==="price"?k.push({...xe,render:me=>{const Fe=Number.isFinite(Number(me?.unitPriceValue))?Number(me.unitPriceValue):0,nt=Number.isFinite(Number(me?.qty))?Math.max(1,Number(me.qty)):1,Ee=Math.max(1,Number($?.rentalDays||1)),Ne=Fe*nt*Ee;return E(`${$n(Ne)} ${o("reservations.create.summary.currency","SR")}`)}}):xe.id==="unitPrice"?k.push({...xe,render:me=>{const Fe=Number.isFinite(Number(me?.unitPriceValue))?Number(me.unitPriceValue):0;return E(`${$n(Fe)} ${o("reservations.create.summary.currency","SR")}`)}}):k.push(xe)});const be=Math.max(1,Number($?.rentalDays||1)),ke=k.findIndex(xe=>xe.id==="price"),Ue=Math.max(0,ke);k.splice(Ue,0,{id:"days",labelKey:null,fallback:"الأيام",render:()=>E(v(String(be)))});const gt=new Map(k.map(xe=>[xe.id,xe])),ht=k.filter(xe=>!["unitPrice","quantity","days","price"].includes(xe.id)),et=["unitPrice","quantity","days","price"].map(xe=>gt.get(xe)).filter(Boolean);return k=[...ht,...et],k})(),tt=De.length>0,Ye=tt?De.map(k=>`<th>${E(k.labelKey?o(k.labelKey,k.fallback):k.fallback)}</th>`).join(""):"",he=se.length>0?se.map((k,be)=>`<tr>${De.map(ke=>`<td>${ke.render(k,be)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(De.length,1)}" class="empty">${E(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,Ie=G("items")?tt?`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Ye}</tr>
              </thead>
              <tbody>${he}</tbody>
            </table>
            <div class="quote-table-subtotal">
              <span class="quote-table-subtotal__label">${E(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"))}</span>
              <span class="quote-table-subtotal__value">${E(`${r.equipmentTotal} ${l}`)}</span>
            </div>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.items.title","المعدات"))}</h3>
            ${F}
          </section>`:"",Te=hi.filter(k=>D("crew",k.id)),it=D("crew","groupByPosition"),K=Te.length>0,ye=Array.isArray(s)?s:[],h=k=>{const be=k&&k.positionId!=null?`id:${String(k.positionId)}`:(()=>{const gt=(k?.positionLabel||k?.position_name||k?.position||"").trim().toLowerCase();return gt?`label:${gt}`:""})(),ke=Number.isFinite(Number(k?.positionClientPrice))?Number(k.positionClientPrice):0,Ue=ke>0?`|p:${ke.toFixed(2)}`:"";return`${be}${Ue}`},H=(()=>{const k=new Map;return ye.forEach(be=>{const ke=h(be);ke&&k.set(ke,(k.get(ke)||0)+1)}),k})(),C=(()=>{let k=[];Te.forEach(me=>{me.id==="position"?k.push({...me,render:Fe=>{const nt=Fe?.positionLabel??Fe?.position_name??Fe?.role??o("reservations.crew.positionFallback","منصب بدون اسم");if(it)return E(v(String(nt)));const Ee=h(Fe),Ne=Ee&&H.get(Ee)||0,vt=Ne>1?` × ${v(String(Ne))}`:"";return E(v(String(nt))+vt)}}):me.id==="price"?it?k.push({...me,render:Fe=>{const nt=Number.isFinite(Number(Fe?.positionClientPrice))?Number(Fe.positionClientPrice):0,Ee=Math.max(1,Number(Fe?.__count||1)),Ne=Math.max(1,Number($?.rentalDays||1)),vt=nt*Ee*Ne;return E(`${$n(vt)} ${o("reservations.create.summary.currency","SR")}`)}}):k.push({...me,render:Fe=>{const nt=Number.isFinite(Number(Fe?.positionClientPrice))?Number(Fe.positionClientPrice):0,Ee=Math.max(1,Number($?.rentalDays||1)),Ne=nt*Ee;return E(`${$n(Ne)} ${o("reservations.create.summary.currency","SR")}`)}}):k.push(me)});const be=Math.max(1,Number($?.rentalDays||1)),ke=k.findIndex(me=>me.id==="price"),Ue=Math.max(0,ke);k.splice(Ue,0,{id:"days",labelKey:null,fallback:"الأيام",render:()=>E(v(String(be)))});const gt=new Map(k.map(me=>[me.id,me])),ht=new Set,et=[],xe=me=>{const Fe=gt.get(me);Fe&&!ht.has(me)&&(et.push(Fe),ht.add(me))};return xe("rowNumber"),xe("position"),xe("unitPrice"),xe("quantity"),xe("days"),xe("price"),k.forEach(me=>{ht.has(me.id)||(et.push(me),ht.add(me.id))}),k=et,k})(),ee=K?C.map(k=>`<th>${E(k.labelKey?o(k.labelKey,k.fallback):k.fallback)}</th>`).join(""):"",te=it?(()=>{const k=new Map;return ye.forEach(be=>{const ke=h(be);if(!ke)return;const Ue=k.get(ke);Ue?Ue.__count+=1:k.set(ke,{...be,__count:1})}),Array.from(k.values())})():ye,ie=te.length?te.map((k,be)=>`<tr>${C.map(ke=>`<td>${ke.render(k,be)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(C.length,1)}" class="empty">${E(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,Ce=G("crew")?K?`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${ee}</tr>
              </thead>
              <tbody>${ie}</tbody>
            </table>
            <div class="quote-table-subtotal">
              <span class="quote-table-subtotal__label">${E(o("reservations.details.labels.crewTotal","إجمالي الفريق"))}</span>
              <span class="quote-table-subtotal__value">${E(`${r.crewTotal} ${l}`)}</span>
            </div>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${F}
          </section>`:"",de=G("notes")?`<section class="quote-section">
        <h3>${E(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${E(B||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",re=[];D("payment","beneficiary")&&re.push(Q(o("reservations.quote.labels.beneficiary","اسم المستفيد"),We.beneficiaryName)),D("payment","bank")&&re.push(Q(o("reservations.quote.labels.bank","اسم البنك"),We.bankName)),D("payment","account")&&re.push(Q(o("reservations.quote.labels.account","رقم الحساب"),v(We.accountNumber))),D("payment","iban")&&re.push(Q(o("reservations.quote.labels.iban","رقم الآيبان"),v(We.iban)));const _e=`<section class="quote-section">
      <div class="payment-block">
        <h3>${E(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${re.length?re.join(""):F}</div>
      </div>
      <p class="quote-approval-note">${E(We.approvalNote)}</p>
    </section>`,It=`<footer class="quote-footer">
        <h4>${E(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${X.map(k=>`<li>${E(k)}</li>`).join("")}</ul>
      </footer>`,rt=[];R&&M?rt.push(Ve(`<div class="quote-section-row">${R}${M}</div>`,{blockType:"group"})):(M&&rt.push(Ve(M)),R&&rt.push(Ve(R))),O&&rt.push(Ve(O));const Tt=[];Ie&&Tt.push(Ve(Ie,{blockType:"table",extraAttributes:'data-table-id="items"'})),Ce&&Tt.push(Ve(Ce,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const Be=[];Le&&Be.push(Ve(Le,{blockType:"summary"})),de&&Be.push(Ve(de));const Ze=[Ve(_e,{blockType:"payment"}),Ve(It,{blockType:"footer"})],Bt=[...Ra(rt,"reservations.quote.placeholder.page1"),...Tt,...Ra(Be,"reservations.quote.placeholder.page2"),...Ze],bt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${E(We.logoUrl)}" alt="${E(We.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${E(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${E(We.companyName)}</p>
        <p class="quote-company-cr">${E(o("reservations.quote.labels.cr","السجل التجاري"))}: ${E(We.commercialRegistry)}</p>
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
      <style>${qo}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${bt}
          ${Bt.join("")}
        </div>
      </div>
    </div>
  `}async function zo(){try{const e=ge();if((Array.isArray(e?.packages)?e.packages:[]).length>0)return;const n=await xt("/packages/?all=1"),a=Array.isArray(n?.data)?n.data:Array.isArray(n)?n:[];a.length&&(Ka({packages:a}),document.dispatchEvent?.(new CustomEvent("packages:changed",{detail:{packages:a}})))}catch{}}function ju(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{i(),t()},s=()=>{i(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},i=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function na(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),i=a.map(c=>ju(c)),r=[s,...i].map(c=>c.catch(l=>(Ht("asset load failed",l),Wd(),null)));await Promise.all(r),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function Ma(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),i=e.querySelector("[data-quote-source]"),r=i?.querySelector("[data-quote-header-template]");if(!s||!i||!r)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await No(i),await na(i),s.innerHTML="";const c=Array.from(i.querySelectorAll(":scope > [data-quote-block]"));let l=null,d=null;const u=w=>{w.style.margin="0 auto",w.style.breakInside="avoid",w.style.pageBreakInside="avoid",w.style.pageBreakAfter="auto",w.style.breakAfter="auto"},b=()=>{const w=a.createElement("div"),I=s.childElementCount===0;if(w.className="quote-page",w.dataset.pageIndex=String(s.childElementCount),I){w.classList.add("quote-page--primary");const B=r.cloneNode(!0);B.removeAttribute("data-quote-header-template"),w.appendChild(B)}else w.classList.add("quote-page--continuation");const T=a.createElement("main");T.className="quote-body",w.appendChild(T),s.appendChild(w),u(w),l=w,d=T},f=()=>{(!l||!d||!d.isConnected)&&b()},m=()=>{if(!l||!d||d.childElementCount>0)return;const w=l;l=null,d=null,w.parentNode&&w.parentNode.removeChild(w)},p=()=>{l=null,d=null},g=()=>l?l.scrollHeight-l.clientHeight>Io:!1,q=(w,{allowOverflow:I=!1}={})=>(f(),d.appendChild(w),g()&&!I?(d.removeChild(w),m(),!1):!0),_=w=>{const I=w.cloneNode(!0);I.removeAttribute?.("data-quote-block"),I.removeAttribute?.("data-block-type"),I.removeAttribute?.("data-table-id"),!q(I)&&(p(),!q(I)&&q(I,{allowOverflow:!0}))},S=w=>{const I=w.querySelector("table");if(!I){_(w);return}const T=w.querySelector("h3"),B=I.querySelector("thead"),X=Array.from(I.querySelectorAll("tbody tr"));if(!X.length){_(w);return}let P=null,D=0;const G=(L=!1)=>{const j=w.cloneNode(!1);j.removeAttribute("data-quote-block"),j.removeAttribute("data-block-type"),j.removeAttribute("data-table-id"),j.classList.add("quote-section--table-fragment"),L&&j.classList.add("quote-section--table-fragment--continued");const Q=T?T.cloneNode(!0):null;Q&&j.appendChild(Q);const J=I.cloneNode(!1);J.classList.add("quote-table--fragment"),B&&J.appendChild(B.cloneNode(!0));const R=a.createElement("tbody");return J.appendChild(R),j.appendChild(J),{section:j,body:R}},F=(L=!1)=>P||(P=G(L),q(P.section)||(p(),q(P.section)||q(P.section,{allowOverflow:!0})),P);X.forEach(L=>{F(D>0);const j=L.cloneNode(!0);if(P.body.appendChild(j),g()&&(P.body.removeChild(j),P.body.childElementCount||(d.removeChild(P.section),P=null,m()),p(),P=null,F(D>0),P.body.appendChild(j),g())){P.section.classList.add("quote-section--table-fragment--overflow"),D+=1;return}D+=1}),P=null;try{const L=w.querySelector(":scope > .quote-table-subtotal");L&&_(L)}catch{}};if(!c.length)return;c.forEach(w=>{w.getAttribute("data-block-type")==="table"?S(w):_(w)});const N=Array.from(s.children),x=[];if(N.forEach((w,I)=>{const T=w.querySelector(".quote-body");if(I!==0&&(!T||T.childElementCount===0)){w.remove();return}x.push(w)}),!n){const w=a.defaultView||window,I=Math.min(3,Math.max(1,w.devicePixelRatio||1)),T=os()?Math.min(2,I):I;x.forEach(B=>uu(B,{pixelRatio:T}))}x.forEach((w,I)=>{const T=I===0;w.style.pageBreakAfter="auto",w.style.breakAfter="auto",w.style.pageBreakBefore=T?"auto":"always",w.style.breakBefore=T?"auto":"page",n?w.style.boxShadow="":w.style.boxShadow="none"});const z=x[x.length-1]||null;l=z,d=z?.querySelector(".quote-body")||null,await na(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function Oo(e=0){return e<=0?new Promise(t=>requestAnimationFrame(()=>t())):new Promise(t=>setTimeout(t,e))}function Ho(e){return e?Array.from(e.querySelectorAll(".quote-page")).some(n=>n.scrollHeight-n.clientHeight>Io):!1}function Ii(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function Tu(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[i,r]=await Promise.all([mu(),pu()]),c=e.ownerDocument||document,l=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,l,c?.documentElement?.getAttribute?.("dir")].some(w=>typeof w=="string"&&w.toLowerCase().startsWith("rtl")),b=typeof window<"u"&&window.devicePixelRatio||1,f=wi(),m=ko(),p=os();let g;p?g=1.5:m?g=Math.min(1.7,Math.max(1.2,b*1.1)):f?g=Math.min(1.8,Math.max(1.25,b*1.2)):g=Math.min(2,Math.max(1.6,b*1.4));const q=p||m?.9:f?.92:.95,_=new i({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),S={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let N=0;const x=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let w=0;w<s.length;w+=1){const I=s[w];await No(I),await na(I);const T=I.ownerDocument||document,B=T.createElement("div");Object.assign(B.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const X=I.cloneNode(!0);X.style.width=`${qa}px`,X.style.maxWidth=`${qa}px`,X.style.minWidth=`${qa}px`,X.style.height=`${Sa}px`,X.style.maxHeight=`${Sa}px`,X.style.minHeight=`${Sa}px`,X.style.position="relative",X.style.background="#ffffff",Ii(X),B.appendChild(X),T.body.appendChild(B);let P;try{await na(X),P=await r(X,{...S,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(R){throw Hs(R,"pageCapture",{toastMessage:x}),R}finally{B.parentNode?.removeChild(B)}if(!P)continue;const D=P.width||1,F=(P.height||1)/D;let L=Ms,j=L*F,Q=0;if(j>va){const R=va/j;j=va,L=L*R,Q=Math.max(0,(Ms-L)/2)}const J=P.toDataURL("image/jpeg",q);N>0&&_.addPage(),_.addImage(J,"JPEG",Q,0,L,j,`page-${N+1}`,"FAST"),N+=1,await new Promise(R=>window.requestAnimationFrame(R))}}catch(w){throw Vs({safariWindowRef:n,mobileWindowRef:a}),w}if(N===0)throw Vs({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(m||p){const w=_.output("blob");if(p){const I=URL.createObjectURL(w);Jn();try{window.location.assign(I)}catch(T){Ht("mobile safari blob navigation failed",T)}finally{setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{const I=URL.createObjectURL(w),T=()=>m&&n&&!n.closed?n:a&&!a.closed?a:null,B=(P,D)=>{if(Jn(),!P){window.location.assign(D);return}try{P.location.replace(D),P.focus?.()}catch(G){Ht("direct blob navigation failed",G);try{P.document.open(),P.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${E(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${D}" title="PDF preview"></iframe></body></html>`),P.document.close()}catch(F){Ht("iframe blob delivery failed",F),window.location.assign(D)}}},X=T();B(X,I),setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{Jn();const w=_.output("bloburl"),I=document.createElement("a");I.href=w,I.download=t,I.rel="noopener",I.style.display="none",document.body.appendChild(I),I.click(),setTimeout(()=>{URL.revokeObjectURL(w),I.remove()},2e3)}}function an(){if(!$||!Z)return;const{previewFrame:e}=Z;if(!e)return;const t=$.context||"reservation",n=Mo({context:t,reservation:$.reservation,customer:$.customer,project:$.project,crewAssignments:$.crewAssignments,totals:$.totals,totalsDisplay:$.totalsDisplay,rentalDays:$.rentalDays,currencyLabel:$.currencyLabel,sections:$.sections,fieldSelections:$.fields,quoteNumber:$.quoteNumber,quoteDate:$.quoteDateLabel,terms:$.terms,projectCrew:$.projectCrew,projectExpenses:$.projectExpenses,projectEquipment:$.projectEquipment,projectInfo:$.projectInfo,clientInfo:$.clientInfo,paymentSummary:$.paymentSummary,projectTotals:$.projectTotals});fn("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,i=a?.documentElement||a;i&&(po(i),lo(i,s),uo(i,s));const r=a?.getElementById("quotation-pdf-root");try{r&&(await Ma(r,{context:"preview"}),await Oo(120),Ho(r)&&await Ma(r,{context:"preview"}),Ii(r))}catch(m){console.error("[reservations/pdf] failed to layout preview document",m)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),l=a?.querySelector(".quote-preview-pages"),d=qa;let u=18;if(l&&a?.defaultView){const m=a.defaultView.getComputedStyle(l),p=parseFloat(m.rowGap||m.gap||`${u}`);Number.isFinite(p)&&p>=0&&(u=p)}const b=Sa,f=c.length?c.length*b+Math.max(0,(c.length-1)*u):b;if(e.dataset.baseWidth=String(d),e.dataset.baseHeight=String(f),e.style.width=`${d}px`,e.style.minWidth=`${d}px`,e.style.height=`${f}px`,e.style.minHeight=`${f}px`,Z?.previewFrameWrapper&&!Z?.userAdjustedZoom){const m=Z.previewFrameWrapper.clientWidth-24;m>0&&m<d?Pt=Math.max(m/d,.3):Pt=1}Ko(Pt)}finally{Jn()}},{once:!0})}function Bu(e){if(!$)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?$.sections.add(n):$.sections.delete(n),To($),Vo(),an())}function Fu(e){if(!$)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=$.context||"reservation",i=$.fields||($.fields=rs(s)),r=Xd(i,n);t.checked?r.add(a):r.delete(a),To($),an()}function Du(e){if(!$)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(Ei($,n),$.sectionExpansions[n]=t.open)}function Vo(){if(!Z?.toggles||!$)return;const{toggles:e}=Z,t=$.fields||{},n=$.context||"reservation";Ei($);const a=is(n),s=bo(n),i=a.map(({id:r,labelKey:c,fallback:l})=>{const d=o(c,l),u=$.sections.has(r),b=s[r]||[],f=Jd($,r),m=b.length?`<div class="quote-toggle-sublist">
          ${b.map(p=>{const g=qi(t,r,p.id),q=u?"":"disabled",_=p.labelKey?o(p.labelKey,p.fallback):p.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${r}" data-field-id="${p.id}" ${g?"checked":""} ${q}>
                <span>${E(_)}</span>
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
    `}).join("");e.innerHTML=i,e.querySelectorAll("input[data-section-toggle]").forEach(r=>{r.addEventListener("change",Bu)}),e.querySelectorAll("input[data-field-toggle]").forEach(r=>{r.addEventListener("change",Fu)}),e.querySelectorAll("details[data-section-group]").forEach(r=>{r.addEventListener("toggle",Du)})}function Ru(){if(Z?.modal)return Z;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
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
    <span data-quote-status-text>${E(vo("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(f),r?.addEventListener("click",async()=>{if($){r.disabled=!0;try{await Qo()}finally{r.disabled=!1}}});const q=()=>{zs()||Os(e)};d.forEach(x=>{x?.addEventListener("click",q)}),l&&!d.includes(l)&&l.addEventListener("click",q),e.addEventListener("click",x=>{zs()||x.target===e&&Os(e)}),Z={modal:e,toggles:t,preview:n,previewScroll:p,previewFrameWrapper:m,zoomControls:f,zoomValue:f.querySelector("[data-zoom-value]"),previewFrame:b,meta:a,downloadBtn:r,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:i,statusKind:null,userAdjustedZoom:!1};const _=f.querySelector("[data-zoom-out]"),S=f.querySelector("[data-zoom-in]"),N=f.querySelector("[data-zoom-reset]");return _?.addEventListener("click",()=>rr(-.1)),S?.addEventListener("click",()=>rr(.1)),N?.addEventListener("click",()=>za(1,{markManual:!0})),s&&s.addEventListener("input",Mu),i&&i.addEventListener("click",zu),za(Pt),Z}function za(e,{silent:t=!1,markManual:n=!1}={}){Pt=Math.min(Math.max(e,.25),2.2),n&&Z&&(Z.userAdjustedZoom=!0),Ko(Pt),!t&&Z?.zoomValue&&(Z.zoomValue.textContent=`${Math.round(Pt*100)}%`)}function rr(e){za(Pt+e,{markManual:!0})}function Ko(e){if(!Z?.previewFrame||!Z.previewFrameWrapper)return;const t=Z.previewFrame,n=Z.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",wi()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function Uo(){if(!Z?.meta||!$)return;const{meta:e}=Z;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${E(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${E($.quoteNumber)}</strong></div>
      <div><span>${E(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${E($.quoteDateLabel)}</strong></div>
    </div>
  `}function _i(){if(!Z?.termsInput)return;const e=($?.terms&&$.terms.length?$.terms:lt).join(`
`);Z.termsInput.value!==e&&(Z.termsInput.value=e)}function Mu(e){if(!$)return;const t=Fs(e?.target?.value??"");if(t.length){$.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{$.terms=[...lt],_i();const n=lt.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}an()}function zu(e){if(e?.preventDefault?.(),!$)return;$.terms=[...lt];const t=document.getElementById("reservation-terms");t&&(t.value=lt.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=lt.join(`
`)),_i(),an()}async function Qo(){if(!$)return;fn("export");const t=!wi()&&ko(),n=os(),a=null,s=!n&&t?window.open("","_blank"):null;(l=>{if(l)try{l.document.open(),l.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${E(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${E(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${E(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),l.document.close()}catch(d){Ht("failed to prime download window",d)}})(s);let r=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await fu(),Ss("html2pdf ensured");const l=$.context||"reservation",d=Mo({context:l,reservation:$.reservation,customer:$.customer,project:$.project,crewAssignments:$.crewAssignments,totals:$.totals,totalsDisplay:$.totalsDisplay,rentalDays:$.rentalDays,currencyLabel:$.currencyLabel,sections:$.sections,fieldSelections:$.fields,quoteNumber:$.quoteNumber,quoteDate:$.quoteDateLabel,terms:$.terms,projectCrew:$.projectCrew,projectExpenses:$.projectExpenses,projectEquipment:$.projectEquipment,projectInfo:$.projectInfo,clientInfo:$.clientInfo,paymentSummary:$.paymentSummary,projectTotals:$.projectTotals});r=document.createElement("div"),r.innerHTML=d,Object.assign(r.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(r),po(r),lo(r),uo(r),Ss("export container prepared");const u=r.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await Ma(u,{context:"export"}),await Oo(120),Ho(u)&&await Ma(u,{context:"export"}),await na(u),Ii(u),Ss("layout complete for export document")}catch(f){Hs(f,"layoutQuoteDocument",{suppressToast:!0})}}const b=`quotation-${$.quoteNumber}.pdf`;await Tu(u,{filename:b,safariWindowRef:s,mobileWindowRef:a}),$.sequenceCommitted||(hu($.quoteSequence),$.sequenceCommitted=!0)}catch(l){Vs({container:r,safariWindowRef:s,mobileWindowRef:a}),r=null,Hs(l,"exportQuoteAsPdf",{toastMessage:c})}finally{r&&r.parentNode&&r.parentNode.removeChild(r),Jn()}}function Go(){const e=Ru();e?.modal&&(Xn=!1,Pt=1,Z&&(Z.userAdjustedZoom=!1),za(Pt,{silent:!0}),Vo(),Uo(),_i(),an(),Gd(e.modal))}async function Ou({reservation:e,customer:t,project:n}){if(!e){A(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}await zo();const a=xi(e),{totalsDisplay:s,totals:i,rentalDays:r}=Do(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:l,quoteNumber:d}=Lo("reservation"),u=new Date,b=Td();$={context:"reservation",reservation:e,customer:t,project:n,crewAssignments:a,totals:i,totalsDisplay:s,rentalDays:r,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(is("reservation").filter(f=>f.defaultSelected).map(f=>f.id)),sectionExpansions:Si("reservation"),fields:rs("reservation"),terms:b,quoteSequence:l,quoteNumber:d,quoteDate:u,quoteDateLabel:Fo(u),sequenceCommitted:!1},Bo($),Go();try{Ao()}catch{}}async function Up({project:e}){if(!e){A(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}await zo();let t=ir(e);const{project:n}=t;if(!n){A(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}try{(!Array.isArray(t.equipmentItems)||t.equipmentItems.length===0)&&n?.id!=null&&(await si({project_id:n.id}),t=ir(n))}catch(c){console.warn("[reservationPdf] refreshReservationsForProject failed, proceeding with snapshot/state",c)}const{sequence:a,quoteNumber:s}=Lo("project"),i=new Date,r=[...jd];$={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,equipmentItems:t.equipmentItems||[],crewAssignments:t.crewAssignments||[],totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(is("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:Si("project"),fields:rs("project"),terms:r,quoteSequence:a,quoteNumber:s,quoteDate:i,quoteDateLabel:Fo(i),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},Bo($),Go();try{Ao()}catch{}}function Hu({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=bn(),{reservations:i=[],customers:r=[],technicians:c=[],projects:l=[]}=ge(),d=i.map(S=>{const N=As(S);return{...N,id:S.id??N.id,reservationId:S.reservationId??S.reservation_id??N.reservationId,reservationCode:S.reservationCode??S.reservation_code??N.reservationCode}}),u=d,b=Array.isArray(s)?s:c||[],f=new Map((l||[]).map(S=>[String(S.id),S])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!u||u.length===0){m.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const p=t||vd(),g=new Map(r.map(S=>[String(S.id),S])),q=new Map(b.map(S=>[String(S.id),S])),_=wd({reservations:d,filters:p,customersMap:g,techniciansMap:q,projectsMap:f});if(_.length===0){m.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${Ad({entries:_,customersMap:g,techniciansMap:q,projectsMap:f})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(S=>{const N=Number(S.dataset.reservationIndex);Number.isNaN(N)||S.addEventListener("click",()=>{typeof n=="function"&&n(N)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(S=>{const N=Number(S.dataset.reservationIndex);Number.isNaN(N)||S.addEventListener("click",x=>{x.stopPropagation(),typeof a=="function"&&a(N,x)})})}function Vu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:i=[],projects:r=[]}=ge(),c=s.map(g=>{const q=As(g);return{...q,id:g.id??q.id,reservationId:g.reservationId??g.reservation_id??q.reservationId,reservationCode:g.reservationCode??g.reservation_code??q.reservationCode}}),l=s[e];if(!l)return A(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=c[e]??As(l),u=i.find(g=>String(g.id)===String(l.customerId)),b=l.projectId?r.find(g=>String(g.id)===String(l.projectId)):null,f=document.getElementById("reservation-details-body"),m=document.getElementById("reservationDetailsModal"),p=()=>{const g=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},q=document.getElementById("reservation-details-edit-btn");q&&(q.onclick=()=>{g(),typeof t=="function"&&t(e,{reservation:l,customer:u,getEditContext:a})});const _=document.getElementById("reservation-details-delete-btn");_&&(_.onclick=()=>{g(),typeof n=="function"&&n(e,{reservation:l,customer:u})});const S=f?.querySelector('[data-action="open-project"]');S&&b&&S.addEventListener("click",()=>{g();const x=b?.id!=null?String(b.id):"",z=x?`projects.html?project=${encodeURIComponent(x)}`:"projects.html";window.location.href=z});const N=document.getElementById("reservation-details-export-btn");N&&(N.onclick=async x=>{x?.preventDefault?.(),x?.stopPropagation?.(),N.blur();try{await Ou({reservation:l,customer:u,project:b})}catch(z){console.error("❌ [reservations] export to PDF failed",z),A(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}});try{const x=f?.querySelector("[data-tech-slider]");if(x){const z=x.querySelector("[data-slider-track]"),w=x.querySelector("[data-slider-prev]"),I=x.querySelector("[data-slider-next]");if(z&&(w||I)){const T=document.documentElement.getAttribute("dir")==="rtl"||document.body.getAttribute("dir")==="rtl",B=()=>{const D=z.querySelector(".reservation-technician-card"),G=D&&D.getBoundingClientRect().width||220,F=12,L=Math.max(1,Math.floor(z.clientWidth/(G+F)));return Math.max(G+F,Math.floor(L*(G+F)*.9))},X=()=>{const D=Math.max(0,z.scrollWidth-z.clientWidth-2),G=z.scrollLeft<=1,F=z.scrollLeft>=D;w&&(w.disabled=G),I&&(I.disabled=F)},P=D=>{const G=B()*D,F=T?-G:G;z.scrollBy({left:F,behavior:"smooth"})};w?.addEventListener("click",()=>P(-1)),I?.addEventListener("click",()=>P(1)),z.addEventListener("scroll",X,{passive:!0}),window.addEventListener("resize",X,{passive:!0}),setTimeout(X,0)}}}catch{}};if(f){const g=bn()||[];f.innerHTML=Yi(d,u,g,e,b),p(),Ir().then(()=>{const q=bn()||[];f.innerHTML=Yi(d,u,q,e,b),p()}).catch(()=>{})}return m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}function Wo(){const e=()=>{zn(),st(),bn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let or=!1,cr=null;function Ku(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function Qp(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=Ku(n);if(!a&&or&&Mt().length>0&&s===cr)return Mt();try{const i=await si(n||{});return or=!0,cr=s,i}catch(i){if(console.error("❌ [reservationsActions] Failed to load reservations from API",i),!t)throw i;return Mt()}}async function Uu(e,{onAfterChange:t}={}){if(!Sn())return sa(),!1;const a=Mt()[e];if(!a)return A(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return A(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await nl(s),Wo(),t?.({type:"deleted",reservation:a}),A(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(i){console.error("❌ [reservationsActions] deleteReservation failed",i);const r=Ga(i)?i.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return A(r,"error"),!1}}async function Qu(e,{onAfterChange:t}={}){const a=Mt()[e];if(!a)return A(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return A(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:i}=nn(a);if(i)return A(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const r=await al(s);return Wo(),t?.({type:"confirmed",reservation:r}),A(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(r){console.error("❌ [reservationsActions] confirmReservation failed",r);const c=Ga(r)?r.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return A(c,"error"),!1}}function Hn(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:ea(e,n),end:ea(t,a)}}function Oa(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ki(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function Xo(){const{container:e,select:t,hint:n,addButton:a}=ki();if(!t)return;const s=t.value,i=br(),r=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,l=i.map(u=>{const b=Number.isFinite(Number(u.price))?Number(u.price):0,f=v(b.toFixed(2)),m=`${u.name} — ${f} ${r}`;return`<option value="${Oa(u.id)}">${Oa(m)}</option>`}).join("");t.innerHTML=`${c}${l}`;const d=i.length>0;t.disabled=!d,a&&(a.disabled=!d),e&&(e.hidden=!d,e.setAttribute("aria-hidden",d?"false":"true")),n&&(d?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),d&&s&&i.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function Gu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||A(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=rn(),{start:i,end:r}=Hn(),{reservations:c=[]}=ge(),l=a!=null&&c[a]||null,d=l?.id??l?.reservationId??null,u=to(n,{existingItems:s,start:i,end:r,ignoreReservationId:d});if(!u.success)return t||A(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const b=[...s,u.package];return on(a,b),sn(b),yt(),t||A(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function lr(){const{select:e}=ki();if(!e)return;const t=e.value||"";Gu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function Wu(){const{addButton:e,select:t}=ki();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{lr()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),lr())}),t.dataset.listenerAttached="true"),Xo()}function sn(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),r=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,ur(t);return}const l=Dn(e);t.innerHTML=l.map(d=>{const u=d.items[0]||{},b=wn(u)||d.image,f=b?`<img src="${b}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=d.items.some(P=>P?.type==="package"),p=v(String(d.count)),g=Qe(d.unitPrice),q=Number.isFinite(g)?$e(g):0,_=Qe(d.totalPrice),S=Number.isFinite(_)?_:q*(Number.isFinite(d.count)?d.count:1),N=$e(S),x=`${v(q.toFixed(2))} ${a}`,z=`${v(N.toFixed(2))} ${a}`,w=d.barcodes.map(P=>v(String(P||""))).filter(Boolean),I=w.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${w.map(P=>`<li>${P}</li>`).join("")}
            </ul>
          </details>`:"";let T="";if(m){const P=new Map,D=F=>{const L=Number.parseFloat(v(String(F??"")).replace(/[^0-9.]/g,""));return!Number.isFinite(L)||L<=0||L>99?1:Math.round(L)},G=[];if(Array.isArray(d.packageItems)&&d.packageItems.length&&G.push(...d.packageItems),d.items.forEach(F=>{Array.isArray(F?.packageItems)&&G.push(...F.packageItems)}),G.forEach(F=>{if(!F)return;const L=le(F.barcode||F.normalizedBarcode||F.desc||Math.random());if(!L)return;const j=P.get(L),Q=D(F.qtyPerPackage??F.perPackageQty??F.quantityPerPackage??F.qty??F.quantity??1),J=Math.max(1,Math.min(Q,99));if(j){j.qty=J;return}P.set(L,{desc:F.desc||F.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:J,barcode:F.barcode??F.normalizedBarcode??""})}),P.size){const F=Array.from(P.values()).map(L=>{const j=v(String(L.qty>0?Math.min(L.qty,99):1)),Q=Oa(L.desc||""),J=L.barcode?` <span class="reservation-package-items__barcode">(${Oa(v(String(L.barcode)))})</span>`:"";return`<li>${Q}${J} × ${j}</li>`}).join("");T=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${F}
              </ul>
            </details>
          `}}const B=m?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",X=m?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${d.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${d.description||"-"}</div>
                ${m?`${T||""}${I||""}`:I}
              </div>
            </div>
          </td>
          <td>
            <div class="${B}" data-group-key="${d.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${d.key}" aria-label="${r}"${X}>−</button>
              <span class="reservation-qty-value">${p}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${d.key}" aria-label="${i}"${X}>+</button>
            </div>
          </td>
          <td>${x}</td>
          <td>${z}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),ur(t)}function Xu(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function cs(){const e=document.getElementById("edit-res-payment-history");if(!e)return;let t=ls();const n=document.getElementById("edit-res-project")?.value||"";if(n)try{const r=(ge()?.projects||[]).find(l=>String(l.id)===String(n)),c=Array.isArray(r?.paymentHistory)?r.paymentHistory:Array.isArray(r?.payment_history)?r.payment_history:Array.isArray(r?.payments)?r.payments:Array.isArray(r?.paymentLogs)?r.paymentLogs:[];Array.isArray(c)&&c.length&&(t=c)}catch{}if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة")}</div>`,dr();return}const a=o("reservations.create.summary.currency","SR"),s=t.map((i,r)=>{const c=Number.isFinite(Number(i?.amount))&&Number(i.amount)>0?`${v(Number(i.amount).toFixed(2))} ${a}`:"—",l=Number.isFinite(Number(i?.percentage))&&Number(i.percentage)>0?`${v(Number(i.percentage).toFixed(2))}%`:"—",d=i?.recordedAt?v(mt(i.recordedAt)):"—",u=Xu(i?.type),b=i?.note?v(i.note):"";return`
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
  `,dr()}function Ju(){if(aa()){A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=Zo(e);let a=ec(t);if(!Number.isFinite(a)||a<=0){A(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=xs.lastResult,i=Number(s?.total)||0,r=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,l=o("reservations.create.summary.currency","SR");let d=null,u=null;if(n==="percent"){const f=Math.max(0,100-r);if(f<=1e-4){A(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const p=v(m.toFixed(2));A(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",p)),a=m}u=Number(a.toFixed(2)),i>0&&(d=a/100*i)}else{const f=Math.max(0,i-c);if(f<=1e-4){A(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const p=`${v(m.toFixed(2))} ${l}`;A(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",p)),a=m}d=Number(a.toFixed(2)),i>0&&(u=d/i*100)}d!=null&&(d=Number(d.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const b={type:n,value:a,amount:d,percentage:u,recordedAt:new Date().toISOString()};lp(b),$i(ls()),cs(),yt(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),A(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function dr(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(aa()){n.preventDefault(),A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ju()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(aa()){n.preventDefault(),A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(dp(s),$i(ls()),cs(),yt(),A(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function Yu(e){const{index:t,items:n}=rn(),s=Dn(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const i=s.itemIndices[s.itemIndices.length-1];if(i==null)return;const r=n.filter((c,l)=>l!==i);on(t,r),sn(r),yt()}function Zu(e){const{index:t,items:n}=rn(),a=n.filter(s=>Qa(s)!==e);a.length!==n.length&&(on(t,a),sn(a),yt())}function ep(e){const{index:t,items:n}=rn(),s=Dn(n).find(q=>q.key===e);if(!s||s.items.some(q=>q?.type==="package"))return;const{start:i,end:r}=Hn();if(!i||!r){A(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=ge(),l=t!=null&&c[t]||null,d=l?.id??l?.reservationId??null,u=new Set(n.map(q=>le(q.barcode))),{equipment:b=[]}=ge(),f=(b||[]).find(q=>{const _=le(q?.barcode);return!_||u.has(_)||Qa({desc:q?.desc||q?.description||q?.name||"",price:Number(q?.price)||0})!==e||!Nr(q)?!1:!Nt(_,i,r,d)});if(!f){A(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const m=le(f.barcode),p=En(f);if(!p){A(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:p,equipmentId:p,barcode:m,desc:f.desc||f.description||f.name||s.description||"",qty:1,price:Number.isFinite(Number(f.price))?Number(f.price):s.unitPrice,image:wn(f)}];on(t,g),sn(g),yt()}function ur(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:i}=n.dataset;if(a==="decrease-edit-group"&&s){Yu(s);return}if(a==="increase-edit-group"&&s){ep(s);return}if(a==="remove-edit-group"&&s){Zu(s);return}if(a==="remove-edit-item"){const r=Number(i);Number.isNaN(r)||ap(r)}}),e.dataset.groupListenerAttached="true")}function aa(){return!!document.getElementById("edit-res-project")?.value}function tp(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{aa()&&(A(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function np(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),i=document.getElementById("edit-res-payment-progress-type"),r=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),l=document.getElementById("edit-res-payment-history");if([n,a,s,i,r,c,l].forEach(tp),e){if(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s){const d=document.getElementById("edit-res-project")?.value||"";let u="unpaid";if(d)try{const f=(ge()?.projects||[]).find(p=>String(p.id)===String(d)),m=typeof f?.paymentStatus=="string"?f.paymentStatus.toLowerCase():null;m&&["paid","partial","unpaid"].includes(m)&&(u=m)}catch{}s.value=u,s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected}i&&(i.value=i.value||"percent",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),r&&(r.value="",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),l&&(l.dataset.linkedDisabled="true")}else n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.dataset.linkedDisabled="false")}function yt(){const e=document.getElementById("edit-res-summary");if(!e)return;cs();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),pt(a),yt()}),a.dataset.listenerAttached="true");const s=v(t?.value||"0");t&&(t.value=s);const i=parseFloat(s)||0,r=n?.value||"percent",c=aa();np(c);const l=document.getElementById("edit-res-tax"),d=c?!1:l?.checked||!1,u=!c&&a?.dataset?.userSelected==="true";let b="unpaid";if(c){const N=document.getElementById("edit-res-project")?.value||"";if(N)try{const z=(ge()?.projects||[]).find(I=>String(I.id)===String(N)),w=typeof z?.paymentStatus=="string"?z.paymentStatus.toLowerCase():null;w&&["paid","partial","unpaid"].includes(w)&&(b=w)}catch{}}else b=u&&a?.value||"unpaid";let f=null;!c&&d&&(At("edit-res-company-share"),f=Tn("edit-res-company-share"),(!Number.isFinite(f)||f<=0)&&(At("edit-res-company-share"),f=Tn("edit-res-company-share")));const{items:m=[],payments:p=[]}=rn(),{start:g,end:q}=Hn(),_=xs({items:m,discount:i,discountType:r,applyTax:d,paidStatus:b,start:g,end:q,companySharePercent:f,paymentHistory:p});e.innerHTML=_;const S=xs.lastResult;if(S&&a){const N=S.paymentStatus;u?pt(a,a.value):(a.value!==N&&(a.value=N),a.dataset&&delete a.dataset.userSelected,pt(a,N))}else a&&pt(a,a.value)}function ap(e){if(e==null)return;const{index:t,items:n}=rn();if(!Array.isArray(n))return;const a=n.filter((s,i)=>i!==e);on(t,a),sn(a),yt()}function sp(e){const t=e?.value??"",n=le(t);if(!n)return;const a=Xa(n);if(!a){A(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=Vt(a);if(s==="maintenance"||s==="retired"){A(qn(s));return}const i=le(n),{index:r,items:c=[]}=rn();if(c.findIndex(q=>le(q.barcode)===i)>-1){A(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=Hn();if(!d||!u){A(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:b=[]}=ge(),f=r!=null&&b[r]||null,m=f?.id??f?.reservationId??null;if(Nt(i,d,u,m)){A(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const p=En(a);if(!p){A(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:p,equipmentId:p,barcode:i,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];on(r,g),e&&(e.value=""),sn(g),yt()}function Ha(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Jr(t),a=le(n?.barcode||t);if(!n||!a){A(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=Vt(n);if(s==="maintenance"||s==="retired"){A(qn(s));return}const{start:i,end:r}=Hn();if(!i||!r){A(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:l=[]}=rn();if(l.some(g=>le(g.barcode)===a)){A(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=ge(),b=c!=null&&u[c]||null,f=b?.id??b?.reservationId??null;if(Nt(a,i,r,f)){A(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=En(n);if(!m){A(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const p=[...l,{id:m,equipmentId:m,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];on(c,p),sn(p),yt(),e.value=""}function Jo(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Ha(e))});const t=()=>{Yr(e.value,"edit-res-equipment-description-options")&&Ha(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{yt()});const e=()=>{Wu()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{Xo()})}typeof window<"u"&&(window.getEditReservationDateRange=Hn,window.renderEditPaymentHistory=cs);function ip(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){js(e);return}Ha(e)}}function Gp(){tn(),Jo()}function rp(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let Ln=null,$t=[],Ct=[],Ks=null,ot={},Es=!1;const op="__DEBUG_CREW__";function cp(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(op);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function pr(e,t){if(cp())try{console.log(`🪵 [crew-debug:edit] ${e}`,t)}catch{}}function Yn(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),i=!!e;if(n&&(n.value=i?"true":"false"),a){const r=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=i?r:c,a.dataset.state=i?"confirmed":"pending",a.classList.toggle("btn-success",i&&!t),a.classList.toggle("btn-outline-secondary",!i||t),a.disabled=t,a.setAttribute("aria-pressed",i?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function Ea(){return document.getElementById("edit-res-confirmed")?.value==="true"}function rn(){return{index:Ln,items:$t,payments:Ct}}function on(e,t,n=Ct){Ln=typeof e=="number"?e:null,$t=Array.isArray(t)?[...t]:[],Ct=Array.isArray(n)?[...n]:[]}function Yo(){Ln=null,$t=[],rl(),Ct=[]}function ls(){return[...Ct]}function $i(e){Ct=Array.isArray(e)?[...e]:[]}function lp(e){e&&(Ct=[...Ct,e])}function dp(e){!Number.isInteger(e)||e<0||(Ct=Ct.filter((t,n)=>n!==e))}function Zn(e,t=1){const n=Number.parseFloat(v(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function Us(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(v(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function up(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?le(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:Zn(e.qty??e.quantity??e.count??1),price:Us(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function pp(e,t=0){if(!e||typeof e!="object")return null;const n=ta(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=Zn(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),i=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:Xs(e)).map(f=>up(f)).filter(Boolean),r=e.total_price??e.totalPrice??e.total??null;let c=Us(e.unit_price??e.unitPrice??e.price??null,0);if((!c||c===0)&&r!=null){const f=Us(r,0);f>0&&a>0&&(c=Number((f/a).toFixed(2)))}const l=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,l,n].find(f=>f!=null&&String(f).trim()!=="")||`Package ${n}`,b=e.image??e.cover??e.thumbnail??i.find(f=>f?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:v(String(u)),name:v(String(u)),qty:a,price:c,barcode:l,packageItems:i,image:b}}function mp(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const i=s-n;e.set(a,i>0?i:0)})}function fp(e={},t=[]){const n=Array.isArray(t)?t.map(c=>({...c})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((c,l)=>pp(c,l)).filter(Boolean);if(!s.length)return n;const i=new Map;s.forEach(c=>{const l=Zn(c.qty??c.quantity??1);if(c.barcode){const d=le(c.barcode);if(d){const u=`package::${d}`;i.set(u,(i.get(u)??0)+l)}}(c.packageItems||[]).forEach(d=>{if(!d)return;const u=l*Zn(d.qty??d.quantity??1),b=d.equipmentId??null,f=d.normalizedBarcode||(d.barcode?le(d.barcode):null);if(b!=null){const m=`equipment::${String(b)}`;i.set(m,(i.get(m)??0)+u)}if(f){const m=`barcode::${f}`;i.set(m,(i.get(m)??0)+u)}})});const r=[];return n.forEach(c=>{if(!c||typeof c!="object"){r.push(c);return}if(c.type==="package"){const q=ta(c.packageId??c.package_id??c.id??"");s.some(S=>S.packageId===q)||r.push({...c});return}const l=Zn(c.qty??c.quantity??1),d=En(c),u=c.barcode?le(c.barcode):null,b=[];d!=null&&b.push(`equipment::${String(d)}`),u&&b.push(`barcode::${u}`);const f=b.map(q=>i.get(q)??0).filter(q=>q>0);if(!f.length){r.push({...c});return}const m=Math.min(...f);if(m<=0){r.push({...c});return}const p=Math.min(m,l);if(mp(i,b,p),p>=l)return;const g=l-p;r.push({...c,qty:g,quantity:g})}),[...r,...s.map(c=>({...c}))]}function yp(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Zo(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function ec(e){if(!e)return null;const t=v(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function bp(e,t){if(e){e.value="";return}}function Qn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function tc(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(v(String(e.value??""))),a=Number.parseFloat(v(String(e.amount??""))),s=Number.parseFloat(v(String(e.percentage??""))),i=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,r=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(i)?"amount":Number.isFinite(r)?"percent":null),l=c==="amount"?i??null:c==="percent"?r??null:Number.isFinite(n)?n:null,d=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:l,amount:Number.isFinite(i)?i:null,percentage:Number.isFinite(r)?r:null,note:e.note??null,recordedAt:d}}function gp(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),i=t?.projectId?String(t.projectId):"",r=Array.isArray(e)?[...e].sort((l,d)=>String(d.createdAt||d.start||"").localeCompare(String(l.createdAt||l.start||""))):[],c=[`<option value="">${Qn(a)}</option>`];r.forEach(l=>{c.push(`<option value="${Qn(l.id)}">${Qn(l.title||a)}</option>`)}),i&&!r.some(l=>String(l.id)===i)&&c.push(`<option value="${Qn(i)}">${Qn(s)}</option>`),n.innerHTML=c.join(""),i?n.value=i:n.value=""}function nc(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),i=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=i),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=i),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=i),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=i);else{if(t){const l=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",l&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}Qs("tax");const c=ot?.updateEditReservationSummary;typeof c=="function"&&c()}function Qs(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const i=ot?.updateEditReservationSummary;typeof i=="function"&&i()};if(Es){a();return}Es=!0;const s=()=>{Es=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(yn)),t.disabled){n.checked=!1,A(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),At("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?At("edit-res-company-share"):n.checked&&(n.checked=!1));s()}async function mr(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:i,ensureModal:r}={}){const{customers:c,projects:l}=ge(),u=Mt()?.[e];if(!u){A(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}ot={...ot,reservation:u,projects:l||[]},t?.(),gp(l||[],u);const b=u.projectId&&l?.find?.(M=>String(M.id)===String(u.projectId))||null,{effectiveConfirmed:f,projectLinked:m}=nn(u,b),p=u.items?u.items.map(M=>({...M,equipmentId:M.equipmentId??M.equipment_id??M.id,barcode:le(M?.barcode)})):[],g=fp(u,p),_=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(M=>tc(M)).filter(Boolean);on(e,g,_);const S=o("reservations.list.unknownCustomer","غير معروف"),N=c?.find?.(M=>String(M.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const x=document.getElementById("edit-res-id");x&&(x.value=u.reservationId||u.id);const z=document.getElementById("edit-res-customer");z&&(z.value=N?.customerName||S);const w=typeof a=="function"?a(u.start):{date:"",time:""},I=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",w.date),n?.("edit-res-start-time",w.time),n?.("edit-res-end",I.date),n?.("edit-res-end-time",I.time);const T=document.getElementById("edit-res-notes");T&&(T.value=u.notes||"");const B=document.getElementById("edit-res-discount");if(B){const M=m?0:u.discount??0;B.value=v(M)}const X=document.getElementById("edit-res-discount-type");X&&(X.value=m?"percent":u.discountType||"percent");const P=u.projectId?!1:!!u.applyTax,D=document.getElementById("edit-res-tax");D&&(D.checked=P);const G=document.getElementById("edit-res-company-share");if(G){const M=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,V=M!=null?Number.parseFloat(v(String(M).replace("%","").trim())):NaN,O=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,ne=O!=null?O===!0||O===1||O==="1"||String(O).toLowerCase()==="true":Number.isFinite(V)&&V>0,pe=ne&&Number.isFinite(V)&&V>0?V:yn,ae=P||ne;G.checked=ae,G.dataset.companyShare=String(pe)}Yn(f,{disable:m});const F=document.getElementById("edit-res-paid"),L=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");F&&(F.value=L,F.dataset&&delete F.dataset.userSelected);const j=document.getElementById("edit-res-payment-progress-type"),Q=document.getElementById("edit-res-payment-progress-value");j?.dataset?.userSelected&&delete j.dataset.userSelected,j&&(j.value="percent"),bp(Q);const J=document.getElementById("edit-res-cancelled");if(J){const M=String(u?.status||u?.reservationStatus||"").toLowerCase();J.checked=["cancelled","canceled"].includes(M),J.checked&&Yn(f,{disable:!0})}let R=Array.isArray(u.crewAssignments)&&u.crewAssignments.length?u.crewAssignments:Array.isArray(u.techniciansDetails)&&u.techniciansDetails.length?u.techniciansDetails:(u.technicians||[]).map(M=>String(M));if(!Array.isArray(R)||R.length===0){const M=ol(u.id??u.reservationId??u.reservation_code??null);Array.isArray(M)&&M.length&&(R=M)}try{await Ir()}catch(M){console.warn("[reservationsEdit] positions load failed (non-fatal)",M)}if(cl(R),s?.(g),typeof window<"u"){const M=window?.renderEditPaymentHistory;typeof M=="function"&&M()}nc(),i?.();const W=document.getElementById("editReservationModal");Ks=yp(W,r),Ks?.show?.()}async function hp({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:i,populateEquipmentDescriptionLists:r,handleReservationsMutation:c}={}){if(Ln===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const l=document.getElementById("edit-res-start")?.value?.trim(),d=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),b=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",f=document.getElementById("edit-res-notes")?.value||"",m=v(document.getElementById("edit-res-discount")?.value||"0");let p=parseFloat(m)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const q=Ea(),_=document.getElementById("edit-res-paid"),S=_?.dataset?.userSelected==="true",N=S&&_?.value||"unpaid",x=document.getElementById("edit-res-payment-progress-type"),z=document.getElementById("edit-res-payment-progress-value"),w=Zo(x),I=ec(z),T=document.getElementById("edit-res-project")?.value||"",X=document.getElementById("edit-res-cancelled")?.checked===!0,P=sl();P.map(K=>K?.technicianId).filter(Boolean);const D=document.getElementById("edit-res-company-share"),G=document.getElementById("edit-res-tax");if(!l||!u){A(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const F=typeof e=="function"?e:(K,ye)=>`${K}T${ye||"00:00"}`,L=F(l,d),j=F(u,b);if(L&&j&&new Date(L)>new Date(j)){A(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const J=Mt()?.[Ln];if(!J){A(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray($t)||$t.length===0&&P.length===0){A(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const R=typeof t=="function"?t:()=>!1,W=J.id??J.reservationId;for(const K of $t){if(K?.type==="package"&&Array.isArray(K.packageItems)){for(const h of K.packageItems){const H=h?.barcode??h?.normalizedBarcode??"";if(!H)continue;const C=Vt(H);if(C==="reserved"){const ee=le(H);if(!R(ee,L,j,W))continue}if(C!=="available"){A(qn(C));return}}continue}const ye=Vt(K.barcode);if(ye==="reserved"){const h=le(K.barcode);if(!R(h,L,j,W))continue}if(ye!=="available"){A(qn(ye));return}}for(const K of $t){if(K?.type==="package"&&Array.isArray(K.packageItems)){for(const h of K.packageItems){const H=le(h?.barcode??h?.normalizedBarcode??"");if(H&&R(H,L,j,W)){const C=h?.desc||h?.barcode||o("reservations.create.packages.unnamedItem","معدة بدون اسم"),ee=`${o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${v(String(C))})`;A(ee);return}}continue}const ye=le(K.barcode);if(R(ye,L,j,W)){A(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const M=typeof n=="function"?n:()=>!1;for(const K of $t){if(K?.type!=="package")continue;const ye=K.packageId??K.package_id??null;if(ye&&M(ye,L,j,W)){const h=K.desc||K.packageName||o("reservations.create.packages.genericName","الحزمة");A(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${v(String(h))} محجوزة بالفعل في الفترة المختارة`));return}}const V=typeof a=="function"?a:()=>!1;for(const K of P)if(K?.technicianId&&V(K.technicianId,L,j,W)){A(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const O=Array.isArray(ot.projects)&&ot.projects.length?ot.projects:ge().projects||[],ne=T&&O.find(K=>String(K.id)===String(T))||null,pe={...J,projectId:T?String(T):null,confirmed:q},{effectiveConfirmed:ae,projectLinked:Pe,projectStatus:Le}=nn(pe,ne);let Y=!!D?.checked,se=!!G?.checked;if(Pe&&(Y&&(D.checked=!1,Y=!1),se=!1),!Pe&&Y!==se){A(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}se&&(At("edit-res-company-share"),Y=!!D?.checked);let Ae=Y?getCompanySharePercent("edit-res-company-share"):null;Y&&(!Number.isFinite(Ae)||Ae<=0)&&(At("edit-res-company-share"),Ae=getCompanySharePercent("edit-res-company-share"));const De=Y&&se&&Number.isFinite(Ae)&&Ae>0,tt=Pe?!1:se;Pe&&(p=0,g="percent");const Ye=Zs($t,p,g,tt,P,{start:L,end:j,companySharePercent:De?Ae:0});let je=ls();if(Number.isFinite(I)&&I>0){const K=Ye;let ye=null,h=null;w==="amount"?(ye=I,K>0&&(h=I/K*100)):(h=I,K>0&&(ye=I/100*K));const H=tc({type:w,value:I,amount:ye,percentage:h,recordedAt:new Date().toISOString()});H&&(je=[...je,H],$i(je)),z&&(z.value="")}const he=ei({totalAmount:Ye,history:je}),Ie=ti({manualStatus:N,paidAmount:he.paidAmount,paidPercent:he.paidPercent,totalAmount:Ye});_&&!S&&(_.value=Ie,_.dataset&&delete _.dataset.userSelected);let Te=J.status??"pending";Pe?Te=ne?.status??Le??Te:X?Te="cancelled":["completed","cancelled"].includes(String(Te).toLowerCase())||(Te=q?"confirmed":"pending");const it=Er({reservationCode:J.reservationCode??J.reservationId??null,customerId:J.customerId,start:L,end:j,status:Te,title:J.title??null,location:J.location??null,notes:f,projectId:T?String(T):null,totalAmount:Ye,discount:p,discountType:g,applyTax:tt,paidStatus:Ie,confirmed:ae,items:$t.map(K=>({...K,equipmentId:K.equipmentId??K.id})),crewAssignments:P,companySharePercent:De?Ae:null,companyShareEnabled:De,paidAmount:he.paidAmount,paidPercentage:he.paidPercent,paymentProgressType:he.paymentProgressType,paymentProgressValue:he.paymentProgressValue,paymentHistory:je});try{pr("about to submit",{editingIndex:Ln,crewAssignments:P,techniciansPayload:it?.technicians,payload:it});const K=await il(J.id||J.reservationId,it);pr("server response",{reservation:K?.id??K?.reservationId??K?.reservation_code,technicians:K?.technicians,crewAssignments:K?.crewAssignments,techniciansDetails:K?.techniciansDetails}),await si(),zn(),bn(),st(),A(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),Yo(),c?.({type:"updated",reservation:K}),i?.(),r?.(),Ks?.hide?.()}catch(K){console.error("❌ [reservationsEdit] Failed to update reservation",K);const ye=Ga(K)?K.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");A(ye,"error")}}function Wp(e={}){ot={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=ot,i=document.getElementById("edit-res-discount");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",()=>{i.value=v(i.value),t?.()}),i.dataset.listenerAttached="true");const r=document.getElementById("edit-res-discount-type");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>t?.()),r.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{Qs("tax")}),c.dataset.listenerAttached="true");const l=document.getElementById("edit-res-company-share");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{Qs("share")}),l.dataset.listenerAttached="true");const d=document.getElementById("edit-res-payment-progress-type");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{d.dataset.userSelected="true",t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=v(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const b=document.getElementById("edit-res-project");b&&!b.dataset.listenerAttached&&(b.addEventListener("change",()=>{nc();const _=Array.isArray(ot.projects)&&ot.projects.length?ot.projects:ge().projects||[],S=b.value&&_.find(I=>String(I.id)===String(b.value))||null,x={...ot?.reservation??{},projectId:b.value||null,confirmed:Ea()},{effectiveConfirmed:z,projectLinked:w}=nn(x,S);Yn(z,{disable:w}),t?.()}),b.dataset.listenerAttached="true");const f=document.getElementById("edit-res-confirmed-btn");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{if(f.disabled)return;const _=!Ea();Yn(_),t?.()}),f.dataset.listenerAttached="true");const m=document.getElementById("edit-res-cancelled");m&&!m.dataset.listenerAttached&&(m.addEventListener("change",()=>{document.getElementById("edit-res-confirmed-btn")&&Yn(Ea(),{disable:m.checked}),t?.()}),m.dataset.listenerAttached="true");const p=document.getElementById("save-reservation-changes");p&&!p.dataset.listenerAttached&&(p.addEventListener("click",()=>{hp(ot).catch(_=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",_)})}),p.dataset.listenerAttached="true");const g=document.getElementById("edit-res-equipment-barcode");if(g&&!g.dataset.listenerAttached){let _=null;const S=()=>{g.value?.trim()&&(clearTimeout(_),_=null,n?.(g))};g.addEventListener("keydown",x=>{x.key==="Enter"&&(x.preventDefault(),S())});const N=()=>{if(clearTimeout(_),!g.value?.trim())return;const{start:x,end:z}=getEditReservationDateRange();!x||!z||(_=setTimeout(()=>{S()},150))};g.addEventListener("input",N),g.addEventListener("change",S),g.dataset.listenerAttached="true"}Jo?.();const q=document.getElementById("editReservationModal");q&&!q.dataset.cleanupAttached&&(q.addEventListener("hidden.bs.modal",()=>{Yo(),t?.(),s?.([])}),q.dataset.cleanupAttached="true")}const vp=ge()||{};let wt=(vp.projects||[]).map(ic),ca=!1;function qp(){return wt}function la(e){wt=Array.isArray(e)?e.map(Pi):[],Ka({projects:wt});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return wt}async function ac(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,l])=>{l==null||l===""||t.set(c,String(l))});const n=t.toString(),s=(await xt(`/projects/${n?`?${n}`:""}`))?.data;let i=[];Array.isArray(s)?i=s:s&&typeof s=="object"&&(Array.isArray(s.items)?i=s.items:Array.isArray(s.results)?i=s.results:Array.isArray(s.data)?i=s.data:Array.isArray(s.records)&&(i=s.records));const r=i.map(ds);return la(r),ca=!0,wt}async function sc({force:e=!1,params:t=null}={}){if(!e&&ca&&wt.length>0)return wt;try{return await ac(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),wt}}async function Sp(e){const t=await xt("/projects/",{method:"POST",body:e}),n=ds(t?.data??{}),a=[...wt,n];return la(a),ca=!0,n}async function Ep(e,t){const n=await xt(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=ds(n?.data??{}),s=wt.map(i=>String(i.id)===String(e)?a:i);return la(s),ca=!0,a}async function wp(e){await xt(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=wt.filter(n=>String(n.id)!==String(e));la(t),ca=!0}function Ap({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:i,start:r,end:c,applyTax:l,paymentStatus:d,equipmentEstimate:u=0,expenses:b=[],servicesClientPrice:f=0,taxAmount:m=0,totalWithTax:p=0,discount:g=0,discountType:q="percent",companyShareEnabled:_=!1,companySharePercent:S=null,companyShareAmount:N=0,paidAmount:x=null,paidPercentage:z=null,paymentProgressType:w=null,paymentProgressValue:I=null,confirmed:T=!1,technicians:B=[],equipment:X=[],payments:P,paymentHistory:D}={}){const G=Array.isArray(B)?B.map(V=>Number.parseInt(String(V),10)).filter(V=>Number.isInteger(V)&&V>0):[],F=Array.isArray(X)?X.map(V=>{const O=Number.parseInt(String(V.equipmentId??V.equipment_id??V.id??0),10),ne=Number.parseInt(String(V.qty??V.quantity??0),10);return!Number.isInteger(O)||O<=0?null:{equipment_id:O,quantity:Number.isInteger(ne)&&ne>0?ne:1}}).filter(Boolean):[],L=Array.isArray(b)?b.map(V=>{const O=Number.parseFloat(V?.amount??V?.value??0)||0,ne=(V?.label??V?.name??"").trim();if(!ne)return null;const pe=Number.parseFloat(V?.salePrice??V?.sale_price??0)||0,ae=(V?.note??V?.notes??"").toString().trim();return{label:ne,amount:Math.round(O*100)/100,sale_price:Math.max(0,Math.round(pe*100)/100),note:ae||void 0,...ae?{notes:ae}:{}}}).filter(Boolean):[],j=L.reduce((V,O)=>V+(O?.amount??0),0),Q={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:i??null,start_datetime:r??null,end_datetime:c||null,apply_tax:!!l,payment_status:d??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(j*100)/100,services_client_price:Number.isFinite(Number(f))?Math.round(Number(f)*100)/100:0,tax_amount:Math.round((Number.parseFloat(m)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(p)||0)*100)/100,confirmed:!!T,technicians:G,equipment:F,expenses:L},J=Math.max(0,Number.parseFloat(g)||0);Q.discount=J,Q.discount_type=q==="amount"?"amount":"percent";const R=Number.parseFloat(S),W=!!_&&Number.isFinite(R)&&R>0;Q.company_share_enabled=W,Q.company_share_percent=W?R:0,Q.company_share_amount=W?Math.max(0,Number.parseFloat(N)||0):0,Number.isFinite(Number(x))&&(Q.paid_amount=Math.max(0,Number.parseFloat(x)||0)),Number.isFinite(Number(z))&&(Q.paid_percentage=Math.max(0,Number.parseFloat(z)||0)),(w==="amount"||w==="percent")&&(Q.payment_progress_type=w),I!=null&&I!==""&&(Q.payment_progress_value=Number.parseFloat(I)||0),e&&(Q.project_code=String(e).trim());const M=P!==void 0?P:D;if(M!==void 0){const V=rc(M)||[];Q.payments=V.map(O=>({type:O.type,amount:O.amount!=null?O.amount:null,percentage:O.percentage!=null?O.percentage:null,value:O.value!=null?O.value:null,note:O.note??null,recorded_at:O.recordedAt??null}))}return Q.end_datetime||delete Q.end_datetime,Q.client_company||(Q.client_company=null),Q}function ds(e={}){return Pi(e)}function ic(e={}){return Pi(e)}function Pi(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(p=>{if(p==null)return null;if(typeof p=="object"){const g=p.id??p.technician_id??p.technicianId;return g!=null?String(g):null}return String(p)}).filter(Boolean),i=(Array.isArray(e.equipment)?e.equipment:[]).map(p=>{const g=p?.equipment_id??p?.equipmentId??p?.id??null,q=p?.quantity??p?.qty??0,_=p?.barcode??p?.code??"",S=p?.description??p?.name??"";return{equipmentId:g!=null?String(g):null,qty:Number.parseInt(String(q),10)||0,barcode:_,description:S}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((p,g)=>({id:p?.id??`expense-${t??"x"}-${g}`,label:p?.label??"",amount:Number.parseFloat(p?.amount??0)||0,salePrice:Number.parseFloat(p?.sale_price??p?.salePrice??0)||0,note:p?.note??p?.notes??""})),l=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,d=e.company_share_enabled??e.companyShareEnabled,u=d!=null?d===!0||d===1||String(d).toLowerCase()==="true":l>0,b=e.payment_history??e.paymentHistory??e.payments??null,f=rc(b),m=(()=>{const p=e.cancelled??e.canceled??e.is_cancelled??e.isCanceled;if(p===!0||p==="true"||p===1||p==="1")return!0;if(typeof p=="string"){const g=p.toLowerCase();return g==="yes"||g==="cancelled"||g==="canceled"}return!1})();return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,status:(()=>{const p=String(e.status??e.project_status??"").toLowerCase();if(m||p==="cancelled"||p==="canceled"||p==="ملغي"||p==="ملغى")return"cancelled";if(p==="completed"||p==="مكتمل")return"completed";if(p==="ongoing"||p==="in_progress"||p==="قيد التنفيذ")return"ongoing";if(p==="upcoming"||p==="قادم")return"upcoming"})(),cancelled:m,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,servicesClientPrice:Number.parseFloat(e.services_client_price??e.servicesClientPrice??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?l:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(p=>typeof p=="object"?p:{id:p}),equipment:i,expenses:c,paymentHistory:f}}function xp(e){return e instanceof fr}function ws(e){if(e==null||e==="")return null;const t=v(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const i=Number.parseFloat(n);return Number.isFinite(i)?i:null}function Ip(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=ws(e.value);let s=ws(e.amount),i=ws(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&i==null&&a!=null&&(i=a),!n)if(s!=null&&s>=0)n="amount";else if(i!=null&&i>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(i==null||!Number.isFinite(i)||i<0)return null;i=Math.min(100,Math.round(i*100)/100)}const r=e.note??e.memo??e.description??null,c=r!=null?String(r).trim():null,l=e.recordedAt??e.recorded_at??e.date??null;let d=null;if(l){const b=new Date(l);Number.isNaN(b.getTime())||(d=b.toISOString())}d||(d=new Date().toISOString());const u=n==="amount"?s:n==="percent"?i:a;return{type:n,amount:s??null,percentage:i??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:d}}function rc(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>Ip(t)).filter(Boolean):[]}const Xp=Object.freeze(Object.defineProperty({__proto__:null,buildProjectPayload:Ap,createProjectApi:Sp,deleteProjectApi:wp,ensureProjectsLoaded:sc,getProjectsState:qp,isApiError:xp,mapLegacyProject:ic,mapProjectFromApi:ds,refreshProjectsFromApi:ac,setProjectsState:la,updateProjectApi:Ep},Symbol.toStringTag,{value:"Module"})),Va="reservations-ui:ready",pn=typeof EventTarget<"u"?new EventTarget:null;let mn={};function _p(e){return Object.freeze({...e})}function kp(){if(!pn)return;const e=mn,t=typeof CustomEvent=="function"?new CustomEvent(Va,{detail:e}):{type:Va,detail:e};typeof pn.dispatchEvent=="function"&&pn.dispatchEvent(t)}function $p(e={}){if(!e||typeof e!="object")return mn;const t={...mn};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),mn=_p(t),kp(),mn}function Pp(e){if(e)return mn?.[e]}function Jp(e){const t=Pp(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const r=(s?.detail||mn)?.[e];typeof r=="function"&&(pn&&pn.removeEventListener(Va,a),n(r))};pn&&pn.addEventListener(Va,a)})}function Yp(){return sc().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=ge()||{};ll(e||[]),io()})}function Ci(e=null){io(),oc(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Cp(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Gs(){return{populateEquipmentDescriptionLists:tn,setFlatpickrValue:rp,splitDateTime:hr,renderEditItems:sn,updateEditReservationSummary:yt,addEquipmentByDescription:ip,addEquipmentToEditingReservation:sp,addEquipmentToEditingByDescription:Ha,combineDateTime:ea,hasEquipmentConflict:Nt,hasTechnicianConflict:Sr,renderReservations:oc,handleReservationsMutation:Ci,ensureModal:Cp}}function oc(e="reservations-list",t=null){Hu({containerId:e,filters:t,onShowDetails:cc,onConfirmReservation:dc})}function cc(e){return Vu(e,{getEditContext:Gs,onEdit:(t,{reservation:n})=>{uc(t,n)},onDelete:lc})}function lc(e){return Sn()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?Uu(e,{onAfterChange:Ci}):!1:(sa(),!1)}function dc(e){return Qu(e,{onAfterChange:Ci})}function uc(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",i)}mr(e,Gs());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",i)}mr(e,Gs());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const i=t.id??t.reservationId;n.set("reservationEditId",String(i));try{localStorage.setItem("pendingReservationEditId",String(i)),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",r)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",i)}}Uc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(i=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",i)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Zp(){$p({showReservationDetails:cc,deleteReservation:lc,confirmReservation:dc,openReservationEditor:uc})}export{Tp as $,ac as A,Zp as B,sc as C,wp as D,Sp as E,Fp as F,Wp as G,Yp as H,Gp as I,Bp as J,Ci as K,io as L,zp as M,yt as N,Mp as O,Op as P,Gs as Q,Se as R,lc as S,dc as T,uc as U,rp as V,Mn as W,gl as X,Ia as Y,jp as Z,Tl as _,st as a,Xp as a0,Yi as b,lo as c,uo as d,Qp as e,oc as f,ro as g,Pp as h,Ap as i,$p as j,cc as k,Hp as l,ds as m,Vp as n,qp as o,xp as p,xd as q,ra as r,po as s,oo as t,Ep as u,Kp as v,Jp as w,Up as x,Dp as y,Rp as z};
