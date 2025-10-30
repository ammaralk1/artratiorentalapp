import{n as h,l as ye,A as Kc,t as o,a as _t,s as x,u as wn,c as sa,d as Ua,b as yr,z as Qc,f as bt,B as br,o as Gc}from"./auth.D26aJb88.js";import{B as re,C as Nt,E as gr,F as Wc,D as bn,G as Js,n as dt,H as hr,I as Ri,J as ea,K as ta,L as Ka,M as Xc,N as Ys,O as Lt,P as Zs,Q as Fn,R as vr,S as ei,T as Jc,U as Yc,V as Zc,W as qr,X as En,Y as Ea,Z as el,_ as Qa,$ as Sr,a0 as wr,a as ti,o as ni,q as ai,a1 as Er,a2 as tl,s as gn,h as Ga,a3 as nl,a4 as Ar,a5 as al,i as si,r as nn,a6 as ii,a7 as Wt,a8 as Aa,m as Ee,p as Ge,y as Wa,b as xr,a9 as _r,l as ri,g as Ft,aa as _s,j as Ir,z as sl,ab as il,ac as Is,ad as rl,u as ol,ae as cl,af as ll,ag as dl,ah as ul}from"./reservationsService.BABq2xlS.js";const gs="select.form-select:not([data-no-enhance]):not([multiple])",jt=new WeakMap;let hs=null,Mi=!1,Dt=null;function Bp(e=document){e&&(e.querySelectorAll(gs).forEach(t=>ga(t)),!hs&&e===document&&(hs=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(gs)&&ga(a),a.querySelectorAll?.(gs).forEach(s=>ga(s)))})}),hs.observe(document.body,{childList:!0,subtree:!0})),Mi||(Mi=!0,document.addEventListener("pointerdown",fl,{capture:!0})))}function ba(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){ga(e);return}const t=e.closest(".enhanced-select");t&&(oi(t),xa(t),ks(t))}function ga(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){ba(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const i={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};jt.set(t,i),a.addEventListener("click",()=>ml(t)),a.addEventListener("keydown",r=>yl(r,t)),s.addEventListener("click",r=>gl(r,t)),s.addEventListener("keydown",r=>bl(r,t)),e.addEventListener("change",()=>{xa(t),kr(t)}),i.observer=new MutationObserver(r=>{let c=!1,l=!1;for(const d of r)d.type==="attributes"&&d.attributeName==="disabled"&&(l=!0),d.type==="childList"&&(c=!0);l&&ks(t),c&&pl(i,t)}),i.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),oi(t),xa(t),ks(t)}function pl(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,oi(t),xa(t)})))}function oi(e){const t=jt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),i=document.createDocumentFragment();s.forEach(r=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=r.textContent??r.value??"",c.dataset.value=r.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),r.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),r.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),i.appendChild(c)}),a.innerHTML="",a.appendChild(i),kr(e)}function xa(e){const t=jt.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],i=s?.textContent?.trim()||s?.value||"";a.textContent=i}function kr(e){const t=jt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(r=>{const c=r.dataset.value===s;r.toggleAttribute("aria-selected",c),r.dataset.selected=c?"true":"",r.setAttribute("tabindex",c?"0":"-1")})}function ks(e){const t=jt.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function ml(e){jt.get(e)&&(e.getAttribute("data-open")==="true"?Rn(e):$r(e))}function $r(e){const t=jt.get(e);if(!t)return;Dt&&Dt!==e&&Rn(Dt,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),Dt=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function Rn(e,{focusTrigger:t=!0}={}){const n=jt.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),Dt===e&&(Dt=null))}function fl(e){if(!Dt)return;const t=e.target;t instanceof Node&&(Dt.contains(t)||Rn(Dt,{focusTrigger:!1}))}function yl(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),$r(t)):n==="Escape"&&Rn(t)}function bl(e,t){const n=e.key,a=jt.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const i=s.findIndex(r=>r===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(i+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const r=document.activeElement;r&&r.classList.contains("enhanced-select__option")&&Pr(r,t)}else n==="Escape"&&(e.preventDefault(),Rn(t))}function gl(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&Pr(n,t)}function Pr(e,t){const n=jt.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),Rn(t)}const Mn=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let Rt=null;function ci(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function Cr(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function hl(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function vl(e={}){const t=hl({...e,activatedAt:Date.now()});return Rt=t,Cr(!0,t.mode||"create"),ci(Mn.change,{active:!0,selection:{...t}}),t}function _a(e="manual"){if(!Rt)return;const t=Rt;Rt=null,Cr(!1),ci(Mn.change,{active:!1,previous:t,reason:e})}function Nr(){return!!Rt}function ql(){return Rt?{...Rt}:null}function Sl(e){if(!Rt)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=h(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:i,description:r}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const l=c.map(u=>h(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!l.length)return!1;const d=Number.isInteger(s)&&s>0?s:l.length;t={barcodes:l,quantity:Math.min(d,l.length)},i&&(t.groupKey=i),r&&(t.description=r)}else return!1;return ci(Mn.requestAdd,{...t,selection:{...Rt}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||_a("tab-changed")});const wl=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),El=new Set(["maintenance","reserved","retired"]);function Al(e){const t=String(e??"").trim().toLowerCase();return t&&wl.get(t)||"available"}function xl(e){return e?typeof e=="object"?e:Xa(e):null}function Ot(e){const t=xl(e);return t?Al(t.status||t.state||t.statusLabel||t.status_label):"available"}function Lr(e){return!El.has(Ot(e))}function An(e={}){return e.image||e.imageUrl||e.img||""}function _l(e){if(!e)return null;const t=re(e),{equipment:n=[]}=ye();return(n||[]).find(a=>re(a?.barcode)===t)||null}function Xa(e){const t=re(e);if(!t)return null;const{equipment:n=[]}=ye();return(n||[]).find(a=>re(a?.barcode)===t)||null}const Il=ye()||{};let Xt=(Il.equipment||[]).map(Pl),$s=!1,$n="",pn=null,hn=null,vn=null,Ja=!1,zi=!1;function kl(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function $l(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function Pl(e={}){return li({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function Ya(e={}){return li(e)}function li(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",i=ia(e.quantity??e.qty??0),r=Za(e.unit_price??e.price??0),c=h(String(e.barcode??"").trim()),l=st(e.status??e.state??e.status_label??e.statusLabel??"available"),d=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:Cl(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:i,price:r,barcode:c,status:l,image:d,imageUrl:d,created_at:e.created_at??null,updated_at:e.updated_at??null}}function Cl(e){return e!=null&&e!==""}function ia(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function Za(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function Nl(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const i=s.length-a.length,r=t+i,c=n+i;e.setSelectionRange(r,c)}}),e.dataset.englishDigitsAttached="true")}function Oi(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function Ll(e,t){const n=Oi(e),a=Oi(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,i=s.test(n),r=s.test(a);if(i&&r){if(n.length!==a.length)return n.length-a.length;const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}else{if(i!==r)return i?-1:1;{const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}}const c=ka(e?.desc||e?.description||e?.name||""),l=ka(t?.desc||t?.description||t?.name||"");return c.localeCompare(l,"ar",{sensitivity:"base"})}function We(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function st(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function jl(e){return st(e)}function Ia(){if(!Nr())return null;const e=ql();return e?{...e}:null}function Tl(e){const t=Ia();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:i=null}=t,r=t?.mode||t?.source||"",c=[],l=new Set;if(n.forEach(f=>{const m=re(f?.barcode);!m||l.has(m)||(l.add(m),c.push({variant:f,barcode:m}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(r==="package-manager"||r==="equipment-packages"){const f=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:m})=>m),maxQuantity:f,reason:""}}const d=c.filter(({variant:f})=>{const m=st(f?.status);return m!=="maintenance"&&m!=="retired"});if(!a||!s)return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=d.filter(({barcode:f})=>!Nt(f,a,s,i));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:f})=>f),maxQuantity:u.length};let b=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(d.length>0)b=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const f=new Set(c.map(({variant:m})=>st(m?.status)));f.has("maintenance")?b=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):f.has("reserved")?b=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):f.has("retired")&&(b=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:b,availableBarcodes:[],maxQuantity:0}}function Bl(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function jr(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=Ia();e.hidden=!s;const i=s?.mode||s?.source||"";s?i==="package-manager"||i==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=Ia(),l=c?.mode||c?.source||"";l==="package-manager"||l==="equipment-packages"?_a("package-finish-button"):(_a("return-button"),Bl())}),t.dataset.listenerAttached="true")}function gt(){return Xt}function qn(e){Xt=Array.isArray(e)?e.map(li):[],Ua({equipment:Xt}),$l()}function ka(e){return String(e??"").trim().toLowerCase()}function Zt(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=ka(t);return n||(n=ka(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function es(e){const t=Zt(e);return t?gt().filter(n=>Zt(n)===t):[]}function ts(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=ns(e);if(n){const a=We(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${We(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function di(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function $a(){const e=di();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function ui(e={}){const t=di();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function jn(e){Ja=e;const t=di(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(r=>{r&&(e?r.removeAttribute("disabled"):r.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const r=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(r,c),a.dataset.mode=e?"save":"view"}if(e){const r=t.description||t.category||t.subcategory;r&&setTimeout(()=>{r.focus(),typeof r.select=="function"&&r.select()},0)}}async function Dl(e){if(!wn()){sa();return}if(!e)return;try{await Rl()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),i=s.Sheets[s.SheetNames[0]],r=XLSX.utils.sheet_to_json(i,{defval:""});if(!Array.isArray(r)||r.length===0){x(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let l=0;if(r.forEach(d=>{const u=d.القسم??d.category??"",b=d["القسم الثانوي"]??d.subcategory??"",f=d.الوصف??d.description??d.name??"",m=d.الكمية??d.quantity??0,p=d.السعر??d.price??0,g=d.الباركود??d.barcode??"",v=d.الحالة??d.status??"متاح",$=d.الصورة??d.image_url??d.image??"",q=h(String(g||"")).trim();if(!f||!q){l+=1;return}c.push(pi({category:u,subcategory:b,description:f,quantity:m,unit_price:p,barcode:q,status:v,image_url:$}))}),!c.length){x(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const d=await _t("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(d?.data)?d.data.map(Ya):[];if(u.length){const m=[...gt(),...u];qn(m)}await ra({showToastOnError:!1}),it();const b=d?.meta?.count??u.length,f=[];b&&f.push(`${b} ✔️`),l&&f.push(`${l} ⚠️`),x(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(f.length?` (${f.join(" / ")})`:""))}catch(d){const u=On(d,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");x(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),x(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),x(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const Fl="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let Vn=null;function Rl(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):Vn||(Vn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",i,{once:!0});return}const a=document.createElement("script");a.src=Fl,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",i,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function i(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),Vn=null,e}),Vn)}function pi({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:i="",status:r="متاح",image_url:c=""}){const l=h(String(i||"")).trim(),d=jl(r);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:ia(a),unit_price:Za(s),barcode:l,status:d,image_url:c?.trim()||null}}async function Tr(){if(!wn()){sa();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await _t("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await ra({showToastOnError:!1}),x(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=On(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");x(t,"error")}}function ns(e){return e.image||e.imageUrl||e.img||""}function Ml(e){const t=st(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function Pa(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${We(a)}</td></tr>`}n&&(n.textContent="0")}function Br(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const i=pn?.groupKey||Zt(e);if(!i){Pa();return}const r=gt().filter(b=>Zt(b)===i).sort((b,f)=>{const m=String(b.barcode||"").trim(),p=String(f.barcode||"").trim();return!m&&!p?0:m?p?m.localeCompare(p,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!r.length){Pa();return}t.hidden=!1,a&&(a.textContent=String(r.length));const c=o("equipment.modal.variants.current","الحالي"),l=o("equipment.form.labels.quantity","الكمية"),d=gt(),u=r.map(b=>{const f=b.id&&e.id?String(b.id)===String(e.id):String(b.barcode||"")===String(e.barcode||""),m=f?"equipment-variants-table__row--current":"",p=We(String(b.barcode||"-")),g=f?`<span class="equipment-variants-current-badge">${We(c)}</span>`:"",v=h(String(Number.isFinite(Number(b.qty))?Number(b.qty):0)),$=d.indexOf(b),q=We(o("equipment.item.actions.delete","🗑️ حذف")),N=$>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${$}">${q}</button>
          </div>`:"";return`
        <tr class="${m}">
          <td>
            ${p}
            ${g}
          </td>
          <td>${Ml(b.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${We(l)}">${v}</span>
          </td>
          <td class="table-actions-cell">${N}</td>
        </tr>
      `}).join("");n.innerHTML=u}function zl({item:e,index:t}){const n=ns(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),i=o("equipment.item.currency","SR"),r=wn(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},l=Number.isFinite(Number(e.qty))?Number(e.qty):0,d=Number.isFinite(Number(e.price))?Number(e.price):0,u=l.toLocaleString("en-US"),b=d.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),f=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,m=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,p=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(l-f-m,0),g=p.toLocaleString("en-US"),v=o("equipment.card.labels.availableOfTotal","من أصل"),$=st(e.status);let q=`${We(c.available)}: ${We(g)} ${We(v)} ${We(u)}`,N="available";if(p===0){const K={reserved:{text:l===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},H=K[$]||K.default;q=We(H.text),N=H.modifier}const I=`<span class="equipment-card__availability equipment-card__availability--${N}">${q}</span>`,O="",A=e.desc||e.name||"—",_=e.name&&e.name!==e.desc?e.name:"",B=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${b} ${i}`}].map(({label:K,value:H})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${K}</span>
              <span class="equipment-card__detail-value">${H}</span>
            </span>
          `).join("")}
    </div>`,Z=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),C=Z.length?`<div class="equipment-card__categories">${Z.map(({label:K,value:H})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${K}</span>
              <span class="equipment-card__detail-value">${H}</span>
            </div>
          `).join("")}</div>`:"",R=_?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${_}</span>
      </div>`:"",j=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${A}</h3>
    </div>
  `}
      ${B}
    </div>
  `,D=[],F=Tl(e),V=F?.availableBarcodes?.length?F.availableBarcodes.join(","):F?.barcode?F.barcode:"";let X="",z="";if(F.active){const K=`equipment-select-qty-${t}`,H=!!F.canSelect,ae=H?Math.max(1,Number(F.maxQuantity||F.availableBarcodes?.length||1)):1,me=Math.max(1,Math.min(ae,99)),oe=[];for(let Ne=1;Ne<=me;Ne+=1){const Re=h(String(Ne));oe.push(`<option value="${Ne}"${Ne===1?" selected":""}>${Re}</option>`)}const Ae=H?"":" disabled",Pe=o("reservations.create.equipment.selector.quantityLabel","الكمية"),G=H?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${h(String(ae))}`:F.reason?F.reason:"";X=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${K}">${Pe}</label>
        <select class="equipment-card__quantity-select" id="${K}" data-equipment-select-quantity${Ae}>
          ${oe.join("")}
        </select>
        ${G?`<span class="equipment-card__selection-hint">${We(G)}</span>`:""}
      </div>
    `;const ce=Ia(),je=ce?.mode||ce?.source||"",Je=je==="package-manager"||je==="equipment-packages"?o("equipment.packages.selection.addToPackage","➕ أضف إلى الحزمة"):o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),Ce=H?"":" disabled",Ie=F.reason?` title="${We(F.reason)}"`:"",xe=['data-equipment-action="select-reservation"',`data-selection-max="${H?ae:0}"`];V&&xe.push(`data-selection-barcodes="${We(V)}"`),e.groupKey&&xe.push(`data-selection-group="${We(String(e.groupKey))}"`),z=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${xe.join(" ")}${Ce}${Ie}>${Je}</button>
    `}r&&D.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const ee=D.length?D.join(`
`):"",M=We(A);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${We(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${M}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${O}
        ${I}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${j}
        </div>
      </div>
      <div class="equipment-card__body">
        ${C}
        ${R}
      </div>
      ${X||z||ee?`<div class="equipment-card__actions equipment-card__actions--center">
            ${X}
            ${z}
            ${ee}
          </div>`:""}
    </article>
  `}function Ol(e){const t=[...new Set(e.map(r=>r.category).filter(Boolean))],n=[...new Set(e.map(r=>r.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const r=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,a.appendChild(l)}),t.includes(r)&&(a.value=r),ba(a)}if(s){const r=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,s.appendChild(l)}),n.includes(r)&&(s.value=r),ba(s)}const i=document.getElementById("filter-status");i&&ba(i)}function zn(){const e=ye();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return Xt=t||[],Xt;const s=new Date;let i=!1;const r=new Set((a||[]).filter(l=>l?.status==="open").map(l=>h(String(l?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(l=>{if(!l)return l;const d=st(l.status),u=h(String(l.barcode??"")).trim().toLowerCase(),b=u&&r.has(u);let f=b?"maintenance":"available";if(!b&&u)for(const m of n||[]){if(!Hl(m,s))continue;if(m.items?.some(g=>h(String(g?.barcode??"")).trim().toLowerCase()===u)){f="reserved";break}}return f!==d?(i=!0,{...l,status:f}):{...l,status:f}});return i?qn(c):(Xt=c,Ua({equipment:Xt})),Xt}function Hl(e,t){if(!e?.start||!e?.end)return!1;const n=String(e?.status||e?.reservationStatus||"").toLowerCase();if(n==="cancelled"||n==="canceled")return!1;const a=new Date(e.start),s=new Date(e.end);return Number.isNaN(a.getTime())||Number.isNaN(s.getTime())?!1:a<=t&&t<s}function vs(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function it(){const e=document.getElementById("equipment-list");if(!e)return;jr();const t=zn(),n=Array.isArray(t)?t:gt(),a=new Map;n.forEach(g=>{if(!g)return;const v=Zt(g);v&&(a.has(v)||a.set(v,[]),a.get(v).push(g))});const s=Array.from(a.values()).map(g=>{const v=g[0],$=g.reduce((_,T)=>_+(Number.isFinite(Number(T.qty))?Number(T.qty):0),0),q=["maintenance","reserved","available","retired"],N=g.map(_=>st(_.status)).sort((_,T)=>q.indexOf(_)-q.indexOf(T))[0]||"available",I=g.reduce((_,T)=>{const B=ia(T?.qty??0)||0,Z=st(T?.status);return Z==="reserved"?_.reserved+=B:Z==="maintenance"&&(_.maintenance+=B),_},{reserved:0,maintenance:0}),O=Math.max($-I.reserved-I.maintenance,0);return{item:{...v,qty:$,status:N,variants:g,groupKey:Zt(v),reservedQty:I.reserved,maintenanceQty:I.maintenance,availableQty:O},index:n.indexOf(v)}});s.sort((g,v)=>Ll(g.item,v.item));const i=document.getElementById("search-equipment")?.value||"",r=h(i).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",l=document.getElementById("filter-sub")?.value||"",d=document.getElementById("filter-status")?.value||"",u=d?st(d):"";if($s&&!n.length){e.innerHTML=vs(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if($n&&!n.length){e.innerHTML=vs($n,{tone:"error",icon:"⚠️"});return}const b=s.filter(({item:g})=>{const v=h(String(g.barcode??"")).toLowerCase().trim(),$=Array.isArray(g.variants)?g.variants.map(A=>h(String(A.barcode??"")).toLowerCase().trim()).filter(Boolean):[],q=!r||g.name&&g.name.toLowerCase().includes(r)||g.desc&&g.desc.toLowerCase().includes(r)||v&&v.includes(r)||$.some(A=>A.includes(r))||g.category&&g.category.toLowerCase().includes(r)||g.sub&&g.sub.toLowerCase().includes(r),N=!c||g.category===c,I=!l||g.sub===l,O=!u||st(g.status)===u;return q&&N&&I&&O}),f=r?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),m=b;e.innerHTML=m.length?m.map(zl).join(""):vs(f);const p=document.getElementById("equipment-list-count");if(p){const g=o("equipment.list.countSuffix","عنصر"),v=h(String(m.length)),$=m.length?`${v} ${g}`:`0 ${g}`;p.textContent=$}Ol(n)}async function ra({showToastOnError:e=!0}={}){$s=!0,$n="",it();try{const t=await _t("/equipment/?all=1"),n=t?.data??t;let a=[];Array.isArray(n)?a=n:n&&typeof n=="object"&&(Array.isArray(n.items)?a=n.items:Array.isArray(n.results)?a=n.results:Array.isArray(n.data)?a=n.data:Array.isArray(n.records)&&(a=n.records));const s=a.map(Ya);qn(s)}catch(t){t&&typeof t=="object"&&Number(t.status)===401?$n="":($n=On(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&x($n,"error"))}finally{$s=!1,it()}}function On(e,t,n){if(e instanceof yr){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function Vl(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),i=Za(t.querySelector("#new-equipment-price")?.value||"0"),r=ia(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",l=t.querySelector("#new-equipment-category")?.value?.trim()||"",d=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){x(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const b=pi({category:l,subcategory:d,description:n,quantity:r,unit_price:i,barcode:s,status:u,image_url:c});try{const f=await _t("/equipment/",{method:"POST",body:b}),m=Ya(f?.data),p=[...gt(),m];qn(p),it(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),x(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(f){const m=On(f,"equipment.toast.addFailed","تعذر إضافة المعدة");x(m,"error")}}async function Dr(e){if(!wn()){sa();return}const t=gt(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await _t(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),qn(a),it(),x(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=On(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");x(s,"error")}}async function Ul(e,t){const n=gt(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const i=[...n];i[e]={...i[e],...t},qn(i),it();return}const s=pi({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const i=await _t(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),r=Ya(i?.data),c=[...n];c[e]=r,qn(c),it(),x(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(i){const r=On(i,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw x(r,"error"),i}}function ma(){it()}function Fr(e){const n=gt()[e];if(!n)return;hn=e;const a=es(n),s=a[0]||n,i=a.reduce((l,d)=>l+(Number.isFinite(Number(d.qty))?Number(d.qty):0),0),r=["maintenance","reserved","available","retired"],c=a.map(l=>st(l.status)).sort((l,d)=>r.indexOf(l)-r.indexOf(d))[0]||st(s.status);document.getElementById("edit-equipment-index").value=e,ui({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(i||s.qty||0),price:s.price!=null?String(s.price):"0",image:ns(s)||"",barcode:s.barcode||"",status:s.status||c}),jn(!1),vn=$a(),ts(s),Br(s),pn={groupKey:Zt(s),barcode:String(s.barcode||""),id:s.id||null},kl(document.getElementById("editEquipmentModal"))?.show()}function Kl(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),i=s?.querySelector("[data-equipment-select-quantity]");let r=Number.parseInt(i?.value||"1",10);(!Number.isFinite(r)||r<=0)&&(r=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&r>c&&(r=c);const d=(t.dataset.selectionBarcodes||"").split(",").map(m=>m.trim()).filter(m=>m.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",b=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";Sl({barcodes:d,quantity:r,groupKey:b,description:u})||x(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||Dr(s).catch(i=>{console.error("❌ [equipment.js] deleteEquipment",i)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||Fr(s)}}function Ql(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||Fr(n)}}function Gl(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||Dr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function Rr(){if(!pn||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=gt(),a=pn.id?n.find(l=>String(l.id)===String(pn.id)):null,s=pn.groupKey,i=s?n.find(l=>Zt(l)===s):null,r=a||i;if(!r){Pa();return}const c=n.findIndex(l=>l===r);if(c>=0){const l=document.getElementById("edit-equipment-index");l&&(l.value=String(c)),hn=c}if(Br(r),!Ja){const l=es(r),d=l[0]||r,u=l.reduce((m,p)=>m+(Number.isFinite(Number(p.qty))?Number(p.qty):0),0),b=["maintenance","reserved","available","retired"],f=l.map(m=>st(m.status)).sort((m,p)=>b.indexOf(m)-b.indexOf(p))[0]||st(d.status);ui({category:d.category||"",subcategory:d.sub||"",description:d.desc||d.description||"",quantity:String(u||d.qty||0),price:d.price!=null?String(d.price):"0",image:ns(d)||"",barcode:d.barcode||"",status:d.status||f}),vn=$a()}ts(primary)}function Wl(){document.getElementById("search-equipment")?.addEventListener("input",ma),document.getElementById("filter-category")?.addEventListener("change",ma),document.getElementById("filter-sub")?.addEventListener("change",ma),document.getElementById("filter-status")?.addEventListener("change",ma),document.getElementById("add-equipment-form")?.addEventListener("submit",Vl);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),Tr().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",Kl),t.addEventListener("keydown",Ql),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",Gl),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);Nl(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!Ja){vn=$a(),jn(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){x(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:ia(document.getElementById("edit-equipment-quantity").value)||1,price:Za(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await Ul(t,n),vn=$a(),jn(!1),Rr()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{Wl(),it(),ra();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(vn&&ui(vn),hn!=null){const a=gt()[hn];if(a){const i=es(a)[0]||a;ts(i)}}jn(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(it(),jn(Ja),hn!=null){const t=gt()[hn];if(t){const a=es(t)[0]||t;ts(a)}}});document.addEventListener("equipment:refreshRequested",()=>{ra({showToastOnError:!1})});document.addEventListener(Kc.USER_UPDATED,()=>{it()});document.addEventListener("equipment:changed",()=>{Rr()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{pn=null,Pa(),hn=null,vn=null,jn(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!zi&&(document.addEventListener(Mn.change,()=>{jr(),it()}),zi=!0);const Dp=Object.freeze(Object.defineProperty({__proto__:null,clearEquipment:Tr,refreshEquipmentFromApi:ra,renderEquipment:it,syncEquipmentStatuses:zn,uploadEquipmentFromExcel:Dl},Symbol.toStringTag,{value:"Module"})),Xl="__DEBUG_CREW__";function Jl(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(Xl);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function Hi(e,t){if(Jl())try{console.log(`🪵 [crew-debug:create] ${e}`,t)}catch{}}const Mr="projects:create:draft",zr="projects.html#projects-section";let Ps=null,Or=[],Cs=new Map,Ns=new Map,Ca=new Map,qs=!1,ha=null,Vi=!1,Hr=[];function Yl(e){if(!e)return null;let t=Hr.find(a=>a.id===e)||null;if(t)return t;const n=ei(e);return n?(t={id:e,name:Yc(n)||e,price:Jc(n),items:Ys(n),raw:n},t):null}function Na(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function La(e){return h(String(e||"")).trim().toLowerCase()}function Zl(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function Vr(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function Ur(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Kr(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Qr(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function Sn(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function mi(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function xn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function ft(){const{input:e,hidden:t}=xn();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function dn(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const i=document.querySelector(`label[for="${e.id}"]`);i&&n.add(i)}const s=i=>{t()&&x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(i=>{!i||i.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(r=>{i.addEventListener(r,s,{capture:!0})}),i.dataset.linkedGuardAttached="true")})}function Gr(e,t,{allowPartial:n=!1}={}){const a=dt(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const i=[];return e.forEach((r,c)=>{c.includes(a)&&i.push(r)}),i.length===1?i[0]:null}function Ls(e,t={}){return Gr(Cs,e,t)}function js(e,t={}){return Gr(Ns,e,t)}function yt(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function Wr(e){Or=Array.isArray(e)?[...e]:[]}function fi(){return Or}function yi(e){return e&&fi().find(t=>String(t.id)===String(e))||null}function Ui(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function Tn(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??bn,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:bn}function xt(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??bn,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=bn),t.dataset.companyShare=String(s),t.checked=!0}function Ts(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(qs){qe();return}qs=!0;const a=()=>{qs=!1,qe()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(bn)),t.disabled){n.checked=!1,x(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),xt()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?xt():n.checked&&(n.checked=!1));a()}function ed(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Ki(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function Qi(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function Mt({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=mi();if(!n||!a||!s)return;const i=Js()||[],r=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",r);const l=new Set;Cs=new Map;const d=i.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:Qi(m)||c})).filter(m=>{if(!m.label)return!1;const p=dt(m.label);return!p||l.has(p)?!1:(l.add(p),Cs.set(p,m),!0)}).sort((m,p)=>m.label.localeCompare(p.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(m=>`<option value="${Na(m.label)}"></option>`).join("");const u=t?"":n.value,b=e?String(e):a.value?String(a.value):"",f=b?i.find(m=>String(m.id)===b):null;if(f){const m=Qi(f)||c;a.value=String(f.id),n.value=m,n.dataset.selectedId=String(f.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function Bn({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:i}=xn();if(!a||!s||!i)return;const r=Array.isArray(t)?t:fi()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const l=[...r].filter(g=>g&&g.id!=null).sort((g,v)=>String(v.createdAt||v.start||"").localeCompare(String(g.createdAt||g.start||""))),d=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),b=new Set;Ns=new Map;const f=l.map(g=>{const v=Ui(g)||u;return{id:String(g.id),label:v}}).filter(g=>{if(!g.label)return!1;const v=dt(g.label);return!v||b.has(v)?!1:(b.add(v),Ns.set(v,g),!0)});i.innerHTML=f.map(g=>`<option value="${Na(g.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",p=m?l.find(g=>String(g.id)===m):null;if(p){const g=Ui(p)||u;s.value=String(p.id),a.value=g,a.dataset.selectedId=String(p.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function ja(e,t,n){const{date:a,time:s}=vr(n),i=document.getElementById(e),r=document.getElementById(t);if(i){if(a)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"Y-m-d";i._flatpickr.setDate(a,!1,c)}else i.value=a;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}if(r){if(s)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"H:i";r._flatpickr.setDate(s,!1,c)}else r.value=s;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}}function Xr(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||Bn({selectedValue:a});const i=(Js()||[]).find(u=>String(u.id)===String(e.clientId)),r=i?.id!=null?String(i.id):"";Mt(r?{selectedValue:r}:{selectedValue:"",resetInput:!0});const c=Ki(e,"start"),l=Ki(e,"end");c&&ja("res-start","res-start-time",c),l&&ja("res-end","res-end-time",l);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),qe(),en()}function Jr({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:ye(),s=Array.isArray(a)?a:[];Wr(s);const i=t!=null?String(t):n.value?String(n.value):"";Bn({selectedValue:i,projectsList:s}),en(),qe()}function en(){const{input:e,hidden:t}=xn(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),i=document.getElementById("res-payment-progress-type"),r=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),l=document.getElementById("res-discount-type"),d=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),b=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(dn(n,ft),a&&dn(a,ft)),s&&dn(s,ft),i&&dn(i,ft),r&&dn(r,ft),c&&dn(c,ft),l&&dn(l,ft),b)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=d),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=d),s&&(s.value="unpaid",yt(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=d),i&&(i.value=i.value||"percent",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=d),r&&(r.value="",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=d),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=d),l&&(l.value="percent",l.disabled=!0,l.classList.add("reservation-input-disabled"),l.title=d);else{if(n){const f=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",f&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.disabled=!1,l.classList.remove("reservation-input-disabled"),l.title="")}Ts("tax"),qe()}function bi(){const{input:e,hidden:t}=xn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),i=s?js(s,{allowPartial:a}):null;if(i){t.value=String(i.id),e.value=i.label,e.dataset.selectedId=String(i.id);const r=yi(i.id);r?Xr(r,{skipProjectSelectUpdate:!0}):(en(),qe())}else t.value="",e.dataset.selectedId="",en(),qe()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?js(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function gi(){const{input:e,hidden:t}=mi();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),i=s?Ls(s,{allowPartial:a}):null;i?(t.value=String(i.id),e.value=i.label,e.dataset.selectedId=String(i.id)):(t.value="",e.dataset.selectedId=""),qe()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Ls(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function td(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){Wn({clearValue:!0});return}let n=null;try{const d=decodeURIComponent(t);n=JSON.parse(d)}catch(d){console.warn("⚠️ [reservations/createForm] Failed to decode project context",d)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),Wn({clearValue:!1}),!n)return;n.fromProjectForm&&(ha={draftStorageKey:n.draftStorageKey||Mr,returnUrl:n.returnUrl||zr});const i=document.getElementById("res-project");if(n.projectId){i&&(Bn({selectedValue:String(n.projectId)}),en());const d=yi(n.projectId);d?Xr(d,{forceNotes:!!n.forceNotes}):qe(),Wn()}else{i&&Bn({selectedValue:""});const d=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");bd(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),d)}n.start&&ja("res-start","res-start-time",n.start),n.end&&ja("res-end","res-end-time",n.end);const r=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(Js()||[]).find(b=>String(b.id)===String(n.customerId));u?.id!=null&&(Mt({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),r&&(r.value=u.customerName||u.name||r.value))}else n.customerName&&r?(Mt({selectedValue:""}),r.value=n.customerName,r.dataset.selectedId="",c&&(c.value="")):Mt({selectedValue:""});const l=document.getElementById("res-notes");l&&n.description&&!l.value&&(l.value=n.description),qe()}function _n(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:ea(e,n),end:ea(t,a)}}function Yr(e){const t=La(e);if(t){const c=Ca.get(t);if(c)return c}const{description:n,barcode:a}=Vr(e);if(a){const c=Xa(a);if(c)return c}const s=dt(n||e);if(!s)return null;let i=qr();if(!i?.length){const c=ye();i=Array.isArray(c?.equipment)?c.equipment:[],i.length&&Ar(i)}const r=i.find(c=>dt(c?.desc||c?.description||"")===s);return r||i.find(c=>dt(c?.desc||c?.description||"").includes(s))||null}function Zr(e,t="equipment-description-options"){const n=La(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(l=>La(l.value)===n)||Ca.has(n))return!0;const{description:s}=Vr(e);if(!s)return!1;const i=dt(s);return i?(qr()||[]).some(c=>dt(c?.desc||c?.description||"")===i):!1}const nd={available:0,reserved:1,maintenance:2,retired:3};function ad(e){return nd[e]??5}function Gi(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function sd(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${Gi(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${Gi(n)})`}function tn(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=zn(),a=ye(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],i=Array.isArray(s)?s:[];Ar(i);const r=new Map;i.forEach(d=>{const u=Zl(d),b=La(u);if(!b||!u)return;const f=Ot(d),m=ad(f),p=r.get(b);if(!p){r.set(b,{normalized:b,value:u,bestItem:d,bestStatus:f,bestPriority:m,statuses:new Set([f])});return}p.statuses.add(f),m<p.bestPriority&&(p.bestItem=d,p.bestStatus=f,p.bestPriority=m,p.value=u)}),Ca=new Map;const l=Array.from(r.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{Ca.set(d.normalized,d.bestItem);const u=sd(d),b=Na(d.value);if(u===d.value)return`<option value="${b}"></option>`;const f=Na(u);return`<option value="${b}" label="${f}"></option>`}).join("");e&&(e.innerHTML=l),t&&(t.innerHTML=l)}function eo(e,t,n={}){const{silent:a=!1}=n,s=re(e);if(!s)return{success:!1,message:null};const{start:i,end:r}=_n();if(!i||!r){const p=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||x(p),{success:!1,message:p}}const c=Lt();if(hi(c).has(s)){const p=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||x(p),{success:!1,message:p}}const d=Zs(s,i,r);if(d.length){const p=d.map(v=>v.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${p}`);return a||x(g),{success:!1,message:g}}if(Nt(s,i,r)){const p=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||x(p),{success:!1,message:p}}const u=Xa(s);if(!u){const p=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||x(p),{success:!1,message:p}}const b=Ot(u);if(b==="maintenance"||b==="retired"){const p=Sn(b);return a||x(p),{success:!1,message:p}}const f=En(u);if(!f){const p=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||x(p),{success:!1,message:p}}Ka({id:f,equipmentId:f,barcode:s,desc:u.desc,qty:1,price:u.price,image:An(u)}),t&&(t.value=""),Ht(),qe();const m=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||x(m),{success:!0,message:m,barcode:s}}function Bs(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Yr(t);if(!n){x(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=_l(n.barcode),s=Ot(a||n);if(s==="maintenance"||s==="retired"){x(Sn(s));return}const i=re(n.barcode);if(!i){x(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const r=En(n);if(!r){x(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:r,equipmentId:r,barcode:i,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:An(n)},{start:l,end:d}=_n();if(!l||!d){x(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=Lt();if(hi(u).has(i)){x(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const f=Zs(i,l,d);if(f.length){const m=f.map(p=>p.name).join(", ");x(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`));return}if(Nt(i,l,d)){x(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}Ka(c),Ht(),qe(),x(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function id(){tn();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Bs(e))});const t=()=>{Zr(e.value,"equipment-description-options")&&Bs(e)};e.addEventListener("focus",()=>{if(tn(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Wi(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function hi(e=Lt()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=re(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const i=re(s?.normalizedBarcode??s?.barcode);i&&t.add(i)})}),t}function rd(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=_n();if(!t||!n){x(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}vl({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):x(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(Mn.change,t=>{Wi(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),Wi(e,Nr()))}function od(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,i=a.length?a:t.barcode?[t.barcode]:[];if(!i.length)return;let r=0,c=null;const l=[],d=new Set;i.forEach(b=>{const f=re(b);f&&!d.has(f)&&(d.add(f),l.push(f))});const u=Math.min(s,l.length);for(let b=0;b<u;b+=1){const f=l[b],m=eo(f,null,{silent:!0});m.success&&(r+=1),m.message&&(c=m.message)}if(r>0){const f=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",h(String(r)));x(f)}else c&&x(c)}function to(){rd(),!(Vi||typeof document>"u")&&(document.addEventListener(Mn.requestAdd,od),Vi=!0)}function oa(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),i=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:i}}function Ds(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=oa();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const i=document.getElementById("equipment-barcode"),r=document.getElementById("equipment-description"),c=t==="package";i&&(i.disabled=c),r&&(r.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),al(t),t==="package"&&as()}function as(){const{packageSelect:e,packageHint:t}=oa();if(!e)return;const n=gr();Hr=n,Wc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,i=n.map(c=>{const l=Number.isFinite(Number(c.price))?Number(c.price):0,d=h(l.toFixed(2)),u=`${c.name} — ${d} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${i}`,e.selectedIndex=0;const r=n.length>0;e.disabled=!r,t&&(r?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),so()}function cd(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:i,blockingPackages:r})=>{const c=i?.desc||h(String(i?.barcode??i?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(r)&&r.length){const l=r.map(d=>d.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${l})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function no(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const i=ta(e);if(!i)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const r=Yl(i);if(!r)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(m=>m?.type==="package"&&ta(m.packageId)===i))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(Xc(i,n,a,s)){const m=r.name||i;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${m} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(r.items)&&r.items.length?r.items:Ys(r.raw??{}),l=hi(t),d=[],u=new Set;if(c.forEach(m=>{const p=re(m?.normalizedBarcode??m?.barcode);if(p){if(u.has(p)){d.push({item:m,type:"internal"});return}u.add(p),l.has(p)&&d.push({item:m,type:"external"})}}),d.length){const m=d.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>h(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:d.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",m):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",m),duplicates:d}}const b=[];return c.forEach(m=>{const p=re(m?.normalizedBarcode??m?.barcode);if(p&&Nt(p,n,a,s)){const g=Zs(p,n,a,s);b.push({item:m,blockingPackages:g})}}),b.length?{success:!1,reason:"item_conflict",message:cd(r,b),conflicts:b}:{success:!0,package:{id:`package::${i}`,packageId:i,type:"package",desc:r.name||`Package ${i}`,qty:1,price:Number.isFinite(Number(r.price))?Number(r.price):0,barcode:r.code||r.raw?.package_code||`pkg-${i}`,packageItems:c.map(m=>({equipmentId:m?.equipmentId??null,barcode:m?.barcode??m?.normalizedBarcode??"",normalizedBarcode:re(m?.normalizedBarcode??m?.barcode),desc:m?.desc??"",qty:Number.isFinite(Number(m?.qty))?Number(m.qty):1,price:Number.isFinite(Number(m?.price))?Number(m.price):0})),image:c.find(m=>m?.image)?.image??null},packageInfo:r}}function ao(e,{silent:t=!1}={}){const n=ta(e);if(!n)return t||x(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=_n(),i=Lt(),r=no(n,{existingItems:i,start:a,end:s});if(!r.success){if(!t){const l={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[r.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");x(r.message||l)}return r}return Ka(r.package),Ht(),qe(),t||x(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:r.package}}function so(){const{packageSelect:e}=oa();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;ao(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function ld(){const{packageAddButton:e,packageSelect:t}=oa();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){x(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}ao(n)}),e.dataset.listenerAttached="true")}function io(){const{modeRadios:e}=oa();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&Ds(s.target.value)}),a.dataset.listenerAttached="true")}),ld(),so();const t=Ea(),n=e.find(a=>a.value===t);n&&(n.checked=!0),Ds(t)}function Ht(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=Lt(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),i=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),l=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=Fn(n);t.innerHTML=d.map(u=>{const b=u.items[0]||{},f=An(b)||u.image,m=f?`<img src="${f}" alt="${i}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',p=h(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,v=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,$=`${h(g.toFixed(2))} ${s}`,q=`${h(v.toFixed(2))} ${s}`,N=u.items.some(_=>_?.type==="package"),I=u.barcodes.map(_=>h(String(_||""))).filter(Boolean),O=I.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${I.map(_=>`<li>${_}</li>`).join("")}
            </ul>
          </details>`:"";let A="";if(N){const _=new Map;if(u.items.forEach(T=>{Array.isArray(T?.packageItems)&&T.packageItems.forEach(B=>{if(!B)return;const Z=re(B.barcode||B.desc||Math.random()),C=_.get(Z);if(C){C.qty+=Number.isFinite(Number(B.qty))?Number(B.qty):1;return}_.set(Z,{desc:B.desc||B.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(B.qty))?Number(B.qty):1,barcode:B.barcode??B.normalizedBarcode??""})})}),_.size){const T=Array.from(_.values()).map(B=>{const Z=h(String(B.qty)),C=B.desc||h(String(B.barcode||"")),R=B.barcode?` <span class="reservation-package-items__barcode">(${h(String(B.barcode))})</span>`:"";return`<li>${C}${R} × ${Z}</li>`}).join("");A=`
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
                ${N?`${A||""}${O||""}`:O}
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
          <td>${$}</td>
          <td>${q}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${l}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function dd(e){const t=Lt(),a=Fn(t).find(i=>i.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(el(s),Ht(),qe())}function ud(e){const t=Lt(),n=t.filter(a=>Qa(a)!==e);n.length!==t.length&&(Sr(n),Ht(),qe())}function pd(e){const t=Lt(),a=Fn(t).find(b=>b.key===e);if(!a)return;const{start:s,end:i}=_n();if(!s||!i){x(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const r=new Set(t.map(b=>re(b.barcode))),{equipment:c=[]}=ye(),l=(c||[]).find(b=>{const f=re(b?.barcode);return!f||r.has(f)||Qa({desc:b?.desc||b?.description||b?.name||"",price:Number(b?.price)||0})!==e||!Lr(b)?!1:!Nt(f,s,i)});if(!l){x(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=re(l.barcode),u=En(l);if(!u){x(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}Ka({id:u,equipmentId:u,barcode:d,desc:l.desc||l.description||l.name||a.description||"",qty:1,price:Number.isFinite(Number(l.price))?Number(l.price):a.unitPrice,image:An(l)}),Ht(),qe()}function qe(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,i=document.getElementById("res-tax"),r=e?!1:i?.checked||!1,c=document.getElementById("res-payment-status"),l=c?.value||"unpaid",{start:d,end:u}=_n();r&&xt();const b=Tn(),f=document.getElementById("res-payment-progress-type"),m=document.getElementById("res-payment-progress-value"),p=Ur(f),g=Kr(m);hr(),Ri({selectedItems:Lt(),discount:n,discountType:s,applyTax:r,paidStatus:l,paymentProgressType:p,paymentProgressValue:g,start:d,end:u,companySharePercent:b,paymentHistory:[]});const v=Ri.lastResult;v?(Qr(m,v.paymentProgressValue),c&&(c.value=v.paymentStatus,yt(c,v.paymentStatus))):yt(c,l)}function md(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=h(c.target.value),qe()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",qe),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(ft()){n.checked=!1,x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ts("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(ft()){a.checked=!1,x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ts("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(ft()){s.value="unpaid",yt(s,"unpaid"),x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}yt(s),qe()}),s.dataset.listenerAttached="true");const i=document.getElementById("res-payment-progress-type");i&&!i.dataset.listenerAttached?(i.dataset.userSelected!=="true"&&(i.value="percent"),i.addEventListener("change",c=>{if(ft()){i.value="percent",x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}i.dataset.userSelected="true",qe()}),i.dataset.listenerAttached="true"):i&&i.dataset.userSelected!=="true"&&!i.value&&(i.value="percent");const r=document.getElementById("res-payment-progress-value");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",c=>{if(ft()){r.value="",x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=h(c.target.value),qe()}),r.dataset.listenerAttached="true"),qe()}function fd(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){qe();return}const i=t.dataset.syncedWithStart;(!t.value?.trim()||i!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),qe()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Xi(){const{input:e,hidden:t}=mi(),{input:n,hidden:a}=xn(),{customers:s}=ye();let i=t?.value?String(t.value):"";if(!i&&e?.value){const G=Ls(e.value,{allowPartial:!0});G&&(i=String(G.id),t&&(t.value=i),e.value=G.label,e.dataset.selectedId=i)}const r=s.find(G=>String(G.id)===i);if(!r){x(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=r.id;let l=a?.value?String(a.value):"";if(!l&&n?.value){const G=js(n.value,{allowPartial:!0});G&&(l=String(G.id),a&&(a.value=l),n.value=G.label,n.dataset.selectedId=l)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,b=document.getElementById("res-start-time")?.value||"00:00",f=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){x(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${d}T${b}`,p=`${u}T${f}`,g=new Date(m),v=new Date(p);if(Number.isNaN(g.getTime())||Number.isNaN(v.getTime())||g>=v){x(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const $=hr();$.map(G=>G.technicianId).filter(Boolean);const q=Lt();if(q.length===0&&$.length===0){x(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const N=document.getElementById("res-notes")?.value||"",I=parseFloat(h(document.getElementById("res-discount")?.value))||0,O=document.getElementById("res-discount-type")?.value||"percent",A=document.getElementById("res-payment-status"),_=A?.value||"unpaid",T=document.getElementById("res-payment-progress-type"),B=document.getElementById("res-payment-progress-value"),Z=Ur(T),C=Kr(B),R=l?yi(l):null,W=ed(R);if(l&&!R){x(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const G of q){const ce=Ot(G.barcode);if(ce==="maintenance"||ce==="retired"){x(Sn(ce));return}}for(const G of q){const ce=re(G.barcode);if(Nt(ce,m,p)){x(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const G of $)if(G?.technicianId&&wr(G.technicianId,m,p)){x(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const j=document.getElementById("res-tax"),D=document.getElementById("res-company-share"),F=!!l;F?(j&&(j.checked=!1,j.disabled=!0,j.classList.add("disabled"),j.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),D&&(D.checked=!1,D.disabled=!0,D.classList.add("disabled"),D.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),A&&(A.value="unpaid",A.disabled=!0,yt(A,"unpaid"),A.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),T&&(T.disabled=!0,T.classList.add("disabled")),B&&(B.value="",B.disabled=!0,B.classList.add("disabled"))):(j&&(j.disabled=!1,j.classList.remove("disabled"),j.title=""),D&&(D.disabled=!1,D.classList.remove("disabled"),D.title=""),A&&(A.disabled=!1,A.title=""),T&&(T.disabled=!1,T.classList.remove("disabled")),B&&(B.disabled=!1,B.classList.remove("disabled")));const V=F?!1:j?.checked||!1,X=!!D?.checked;if(!F&&X!==V){x(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let z=X?Tn():null;X&&(!Number.isFinite(z)||z<=0)&&(xt(),z=Tn());const ee=X&&V&&Number.isFinite(z)&&z>0;V&&xt();const M=ti(q,I,O,V,$,{start:m,end:p,companySharePercent:ee?z:0}),K=Qc(),H=ni({totalAmount:M,progressType:Z,progressValue:C,history:[]});B&&Qr(B,H.paymentProgressValue);const ae=[];H.paymentProgressValue!=null&&H.paymentProgressValue>0&&ae.push({type:H.paymentProgressType||Z,value:H.paymentProgressValue,amount:H.paidAmount,percentage:H.paidPercent,recordedAt:new Date().toISOString()});const me=ai({manualStatus:_,paidAmount:H.paidAmount,paidPercent:H.paidPercent,totalAmount:M});A&&(A.value=me,yt(A,me));const oe=typeof R?.paymentStatus=="string"?R.paymentStatus.toLowerCase():null,Ae=oe&&["paid","partial","unpaid"].includes(oe)?oe:"unpaid",Pe=Er({reservationCode:K,customerId:c,start:m,end:p,status:W?"confirmed":"pending",title:null,location:null,notes:N,projectId:l||null,totalAmount:M,discount:F?0:I,discountType:F?"percent":O,applyTax:V,paidStatus:F?Ae:me,confirmed:W,items:q.map(G=>({...G,equipmentId:G.equipmentId??G.id})),crewAssignments:$,companySharePercent:F||!ee?null:z,companyShareEnabled:F?!1:ee,paidAmount:F?0:H.paidAmount,paidPercentage:F?0:H.paidPercent,paymentProgressType:F?null:H.paymentProgressType,paymentProgressValue:F?null:H.paymentProgressValue,paymentHistory:F?[]:ae});try{Hi("about to submit",{crewAssignments:$,techniciansPayload:Pe?.technicians,payload:Pe});const G=await tl(Pe);Hi("server response",{reservation:G?.id??G?.reservationId??G?.reservation_code,technicians:G?.technicians,crewAssignments:G?.crewAssignments,techniciansDetails:G?.techniciansDetails}),zn(),tn(),gn(),gd(),x(o("reservations.toast.created","✅ تم إنشاء الحجز"));try{const ce=document.getElementById("sub-tab-trigger-my-reservations-tab");ce&&typeof ce.click=="function"&&setTimeout(()=>ce.click(),0)}catch{}typeof Ps=="function"&&Ps({type:"created",reservation:G}),yd(G)}catch(G){console.error("❌ [reservations/createForm] Failed to create reservation",G);const ce=Ga(G)?G.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");x(ce,"error"),F&&(x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),Wn({clearValue:!1}))}}function yd(e){if(!ha)return;const{draftStorageKey:t=Mr,returnUrl:n=zr}=ha,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),i=s?JSON.parse(s)||{}:{},r=Array.isArray(i.linkedReservationIds)?i.linkedReservationIds:[],c=String(a);r.includes(c)||r.push(c),i.linkedReservationIds=r,window.sessionStorage.setItem(t,JSON.stringify(i))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}ha=null,n&&(window.location.href=n)}function Wn({clearValue:e=!1}={}){const{input:t,hidden:n}=xn();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,en())}function bd(e,t=""){const{input:n,hidden:a}=xn();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),en())}function gd(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),Mt({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),Wn({clearValue:!1}),Bn({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const i=document.getElementById("res-payment-status");i&&(i.value="unpaid",yt(i,"unpaid"));const r=document.getElementById("res-payment-progress-type");r&&(r.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),nl(),Sr([]),_a("form-reset"),Ht(),en(),qe()}function hd(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){dd(s);return}if(a==="increase-group"&&s){pd(s);return}if(a==="remove-group"&&s){ud(s);return}}),e.dataset.listenerAttached="true")}function vd(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(Ea()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,eo(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||Ea()!=="single")return;const{start:i,end:r}=_n();!i||!r||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function qd(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Xi()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Xi()}),t.dataset.listenerAttached="true")}function Fp({onAfterSubmit:e}={}){Ps=typeof e=="function"?e:null;const{customers:t,projects:n}=ye();Zc(t||[]),Mt(),gi(),Wr(n||[]),Jr({projectsList:n}),bi(),tn(),as(),id(),to(),io(),fd(),md(),hd(),vd(),qd(),td(),qe(),Ht()}function ro(){tn(),as(),Jr(),Mt(),gi(),bi(),to(),io(),Ht(),qe()}if(typeof document<"u"){const e=()=>{Mt(),Bn({projectsList:fi()}),gi(),bi(),qe()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{tn()}),document.addEventListener("packages:changed",()=>{as(),Ea()==="package"&&Ds("package")})}typeof window<"u"&&(window.getCompanySharePercent=Tn);function oo(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:un(t),endDate:un(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const i=new Date(n);return i.setDate(n.getDate()+6),{startDate:un(n),endDate:un(i)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:un(n),endDate:un(a)}}return e==="upcoming"?{startDate:un(t),endDate:""}:{startDate:"",endDate:""}}function Sd(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let i=h(t?.value||"").trim(),r=h(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),Ta(t),Ta(n),i="",r=""),!i&&!r&&c){const d=oo(c);i=d.startDate,r=d.endDate}return{searchTerm:dt(e?.value||""),startDate:i,endDate:r,status:s?.value||"",quickRange:c}}function Rp(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),s.dataset.listenerAttached="true");const i=document.getElementById("reservation-date-range");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>{wd(i.value),t()}),i.dataset.listenerAttached="true");const r=document.getElementById("reservation-status-filter");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",t),r.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),Ta(a),Ta(s),i&&(i.value=""),r&&(r.value=""),t()}),c.dataset.listenerAttached="true")}function wd(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=oo(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function un(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function Ta(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function fa(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function Ed(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function Ad(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=Ed(n);if(a!==null)return a}return null}function Ji(e,t=0){const n=Ad(e);if(n!=null)return n;const a=fa(e.createdAt??e.created_at);if(a!=null)return a;const s=fa(e.updatedAt??e.updated_at);if(s!=null)return s;const i=fa(e.start);if(i!=null)return i;const r=fa(e.end);if(r!=null)return r;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function xd({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const i=e.map((q,N)=>({reservation:q,index:N})),r=t.searchTerm||"",c=t.searchReservationId||"",l=t.searchCustomerName||"",d=t.searchProjectId||"",u=t.startDate||"",b=t.endDate||"",f=t.status||"",m=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,p=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,v=b?new Date(`${b}T23:59:59`):null,$=i.filter(({reservation:q})=>{const N=n.get(String(q.customerId)),I=s?.get?.(String(q.projectId)),O=q.start?new Date(q.start):null,A=si(q),{effectiveConfirmed:_}=nn(q,I);if(m!=null&&String(q.customerId)!==String(m)||p!=null&&!(Array.isArray(q.technicians)?q.technicians.map(R=>String(R)):[]).includes(String(p))||f==="confirmed"&&!_||f==="pending"&&_||f==="completed"&&!A)return!1;if(f==="cancelled"){const C=String(q?.status||q?.reservationStatus||"").toLowerCase();if(!["cancelled","canceled"].includes(C))return!1}if(g&&O&&O<g||v&&O&&O>v)return!1;if(c){const C=[q.reservationId,q.id,q.reservation_id,q.reservationCode,q.reservation_code,q.code,q.reference,q.referenceNumber,q.reference_number],R=dt(C.filter(j=>j!=null&&j!=="").map(String).join(" ")).replace(/\s+/g,""),W=c.replace(/\s+/g,"");if(!R.includes(W))return!1}if(l&&!dt(N?.customerName||"").includes(l))return!1;if(d){const C=[q.projectId,q.project_id,q.projectID,I?.id,I?.projectCode,I?.project_code],R=dt(C.filter(j=>j!=null&&j!=="").map(String).join(" ")).replace(/\s+/g,""),W=d.replace(/\s+/g,"");if(!R.includes(W))return!1}if(!r)return!0;const T=q.items?.map?.(C=>`${C.barcode} ${C.desc}`).join(" ")||"",B=(q.technicians||[]).map(C=>a.get(String(C))?.name).filter(Boolean).join(" ");return dt([q.reservationId,N?.customerName,q.notes,T,B,I?.title].filter(Boolean).join(" ")).includes(r)});return $.sort((q,N)=>{const I=Ji(q.reservation,q.index),O=Ji(N.reservation,N.index);return I!==O?O-I:N.index-q.index}),$}function _d({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),i=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),r=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),l=o("reservations.list.itemsCountShort","{count} عنصر"),d=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),b=o("reservations.list.status.pending","⏳ غير مؤكد"),f=o("reservations.list.status.completed","📁 منتهي"),m=o("reservations.list.payment.paid","💳 مدفوع"),p=o("reservations.list.payment.unpaid","💳 غير مدفوع"),g=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),v=o("reservations.list.actions.confirm","✔️ تأكيد"),$=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),q=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),N={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 الإجمالي النهائي"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:I,index:O})=>{const A=t.get(String(I.customerId)),_=I.projectId?a?.get?.(String(I.projectId)):null,T=si(I),B=typeof _?.paymentStatus=="string"?_.paymentStatus.toLowerCase():null,Z=I.paidStatus??I.paid_status??(I.paid===!0||I.paid==="paid"?"paid":"unpaid"),C=B&&["paid","partial","unpaid"].includes(B)?B:Z,R=C==="paid",W=C==="partial",{effectiveConfirmed:j,projectLinked:D}=nn(I,_),F=j?"status-confirmed":"status-pending",V=R?"status-paid":W?"status-partial":"status-unpaid";let X=`<span class="reservation-chip status-chip ${F}">${j?u:b}</span>`;const z=R?m:W?g:p;let ee=`<span class="reservation-chip status-chip ${V}">${z}</span>`,M=R?" tile-paid":W?" tile-partial":" tile-unpaid";T&&(M+=" tile-completed");let K="";T&&(X=`<span class="reservation-chip status-chip status-completed">${f}</span>`,ee=`<span class="reservation-chip status-chip status-completed">${z}</span>`,K=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);let H=!D&&!j?`<button class="tile-confirm" data-reservation-index="${O}" data-action="confirm">${v}</button>`:"";{const S=String(I?.status||I?.reservationStatus||"").toLowerCase();(S==="cancelled"||S==="canceled")&&(X=`<span class="reservation-chip status-chip status-cancelled">${o("reservations.list.status.cancelled","❌ ملغي")}</span>`,M=" tile-cancelled",K="",typeof H<"u"&&(H=""))}const ae=H?`<div class="tile-actions">${H}</div>`:"",me=I.items?.length||0,oe=Array.isArray(I.crewAssignments)?I.crewAssignments:[],Ae=(I.technicians||[]).map(S=>n.get(String(S))).filter(Boolean),Pe=oe.length?oe.map(S=>{const J=S.positionLabel??S.position_name??S.role??o("reservations.crew.positionFallback","منصب بدون اسم"),w=S.technicianName??n.get(String(S.technicianId??""))?.name??null;return w?`${h(J)} (${h(w)})`:h(J)}):Ae.map(S=>S.name),G=Pe.length?Pe.join(d):"—",ce=h(String(I.reservationId??"")),je=I.start?h(bt(I.start)):"-",Te=I.end?h(bt(I.end)):"-",Je=h(String(I.cost??0)),Ce=h(String(me)),Ie=I.notes?h(I.notes):c,xe=l.replace("{count}",Ce),Ne=I.applyTax?`<small>${i}</small>`:"";let Re=$;return I.projectId&&(Re=_?.title?h(_.title):q),`
      <div class="${H?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${M}"${K} data-reservation-index="${O}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${ce}</div>
          <div class="tile-badges">
            ${X}
            ${ee}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${N.client}</span>
            <span class="tile-value">${A?.customerName||r}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${N.project}</span>
            <span class="tile-value">${Re}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${N.start}</span>
            <span class="tile-value tile-inline">${je}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${N.end}</span>
            <span class="tile-value tile-inline">${Te}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${N.cost}</span>
            <span class="tile-value">${Je} ${s} ${Ne}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${N.equipment}</span>
            <span class="tile-value">${xe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${N.crew}</span>
            <span class="tile-value">${Pe.length?G:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${Ie}</span>
          </div>
        </div>
        ${ae}
      </div>
    `}).join("")}function nt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ss(e){if(e==null)return"";const t=String(e).trim();return t?h(t):""}function Yi(e,t,n=[],a,s=null){const{projectLinked:i,effectiveConfirmed:r}=nn(e,s),c=e.paid===!0||e.paid==="paid",l=si(e),d=e.items||[];let{groups:u}=ii(e);const b=y=>!!(y&&typeof y=="object"&&(y.type==="package"||Array.isArray(y.packageItems)&&y.packageItems.length||Array.isArray(y.items)&&y.items.some(U=>U&&U.type==="package"))),f=y=>{const U=(y?.package_code??y?.packageDisplayCode??y?.barcode??y?.description??(Array.isArray(y?.items)&&y.items[0]?.barcode)??"").toString().trim().toLowerCase();return h(U)},m=(y,U)=>{const se=Be=>{const Ke=Array.isArray(Be?.items)?Be.items[0]:null,ze=[Ke?.price,Ke?.unit_price,Ke?.unitPrice,Be?.unitPrice,Be?.totalPrice];for(const Qt of ze){const tt=Ge(Qt);if(Number.isFinite(tt)&&tt>0)return tt}return 0},ge=se(y),Se=se(U);return ge&&Se?ge<=Se?y:U:ge?y:U},p=[],g=new Map;u.forEach(y=>{if(!b(y)){p.push(y);return}const U=f(y);if(!U){if(!g.has("__unknown__"))g.set("__unknown__",p.length),p.push(y);else{const se=g.get("__unknown__");p[se]=m(p[se],y)}return}if(!g.has(U))g.set(U,p.length),p.push(y);else{const se=g.get(U);p[se]=m(p[se],y)}}),u=p;const{technicians:v=[]}=ye(),$=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(v)?v:[]),q=new Map;$.forEach(y=>{if(!y||y.id==null)return;const U=String(y.id),se=q.get(U)||{};q.set(U,{...se,...y})});const I=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(y=>({technicianId:y}))).map((y,U)=>{const se=y?.technicianId!=null?q.get(String(y.technicianId)):null;let ge=y.positionLabel??y.position_name??y.position_label??y.role??y.position??"";(!ge||ge.trim()==="")&&(ge=y.positionLabelAr??y.position_label_ar??y.positionLabelEn??y.position_label_en??y.position_name_ar??y.position_name_en??"");const Se=y.positionLabelAlt??y.position_label_alt??y.positionLabelEn??y.position_label_en??y.positionLabelAr??y.position_label_ar??"";let Be=ge,Ke=Se;if(!Be||Be.trim()==="")try{const tt=Wt?Wt():[];let ie=null;if(y.positionId!=null&&(ie=tt.find(Oe=>String(Oe.id)===String(y.positionId))||null),!ie){const Oe=y.positionKey??y.position_key??y.positionName??y.position_name??y.position??"";if(Oe&&(ie=typeof Aa=="function"?Aa(Oe):null,!ie&&tt.length)){const St=String(Oe).trim().toLowerCase();ie=tt.find(wt=>[wt.name,wt.labelAr,wt.labelEn].filter(Boolean).map(Gt=>String(Gt).toLowerCase()).includes(St))||null}}ie&&(Be=ie.labelAr||ie.labelEn||ie.name||"",(!Ke||String(Ke).trim()==="")&&(ie.labelAr&&ie.labelEn?Ke=Be===ie.labelAr?ie.labelEn:ie.labelAr:Ke=ie.labelAr||ie.labelEn||""))}catch{}const ze=Ee(Ge(y.positionCost??y.position_cost??y.cost??y.daily_wage??y.dailyWage??se?.dailyWage??se?.wage??0)),Qt=Ee(Ge(y.positionClientPrice??y.position_client_price??y.client_price??y.clientPrice??y.daily_total??y.dailyTotal??y.total??se?.dailyTotal??se?.total??se?.total_wage??0));return{assignmentId:y.assignmentId??y.assignment_id??`crew-${U}`,positionId:y.positionId??y.position_id??null,positionKey:y.positionKey??y.position_key??y.positionName??y.position_name??y.position??null,positionLabel:Be,positionLabelAlt:Ke,positionLabelAr:y.positionLabelAr??y.position_label_ar??null,positionLabelEn:y.positionLabelEn??y.position_label_en??null,positionCost:ze,positionClientPrice:Qt,technicianId:y.technicianId!=null?String(y.technicianId):se?.id!=null?String(se.id):null,technicianName:y.technicianName??y.technician_name??se?.name??null,technicianRole:y.technicianRole??se?.role??null,technicianPhone:y.technicianPhone??se?.phone??null,notes:y.notes??null}}),O=wn(),A=Wa(e.start,e.end),_=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,T=Ge(_),B=Number.isFinite(T)?T:0,Z=e.discountType??e.discount_type??e.discountMode??"percent",C=String(Z).toLowerCase()==="amount"?"amount":"percent",R=i?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),W=Ge(e.cost??e.total??e.finalTotal),j=Number.isFinite(W),D=j?Ee(W):0,F=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,V=F!=null?Ge(F):Number.NaN,ee=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(V)&&V>0)&&Number.isFinite(V)?V:0,M=xr({items:d,technicianIds:e.technicians||[],crewAssignments:I,discount:B,discountType:C,applyTax:R,start:e.start,end:e.end,companySharePercent:ee}),K=Ee(M.equipmentTotal),H=Ee(M.crewTotal);Ee(M.crewCostTotal);const ae=Ee(M.discountAmount),me=Ee(M.subtotalAfterDiscount),oe=Number.isFinite(M.companySharePercent)?M.companySharePercent:0;let Ae=Ee(M.companyShareAmount);Ae=oe>0?Ee(Math.max(0,Ae)):0;const Pe=Ee(M.taxAmount),G=Ee(M.finalTotal),ce=i?G:j?D:G,je=Ee(M.netProfit),Te=h(String(e.reservationId??e.id??"")),Je=e.start?h(bt(e.start)):"-",Ce=e.end?h(bt(e.end)):"-",Ie=h(String(I.length)),xe=h(K.toFixed(2)),Ne=h(ae.toFixed(2)),Re=h(me.toFixed(2)),rt=h(Pe.toFixed(2)),S=h((Number.isFinite(ce)?ce:0).toFixed(2)),J=h(String(A)),w=o("reservations.create.summary.currency","SR"),Y=o("reservations.details.labels.discount","الخصم"),L=o("reservations.details.labels.tax","الضريبة (15%)"),Q=o("reservations.details.labels.crewTotal","إجمالي الفريق"),ne=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),de=o("reservations.details.labels.duration","عدد الأيام"),Me=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),Ye=o("reservations.details.labels.netProfit","💵 صافي الربح"),_e=o("reservations.create.equipment.imageAlt","صورة"),Ze={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},Vt=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),pt=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");o("reservations.details.technicians.roleUnknown","غير محدد");const cn=o("reservations.details.technicians.phoneUnknown","غير متوفر");o("reservations.details.technicians.wage","{amount} {currency} / اليوم");const Le=o("reservations.list.status.confirmed","✅ مؤكد"),at=o("reservations.list.status.pending","⏳ غير مؤكد"),Tt=o("reservations.list.payment.paid","💳 مدفوع"),vt=o("reservations.list.payment.unpaid","💳 غير مدفوع"),k=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),ue=o("reservations.list.status.completed","📁 منتهي"),we=o("reservations.details.labels.id","🆔 رقم الحجز"),Qe=o("reservations.details.section.bookingInfo","بيانات الحجز"),qt=o("reservations.details.section.paymentSummary","ملخص الدفع"),Ut=o("reservations.details.labels.finalTotal","المجموع النهائي"),et=o("reservations.details.section.crew","😎 الفريق الفني"),ke=o("reservations.details.crew.count","{count} عضو"),Ue=o("reservations.details.section.items","📦 المعدات المرتبطة"),fe=o("reservations.details.items.count","{count} عنصر"),be=o("reservations.details.actions.edit","✏️ تعديل"),pe=o("reservations.details.actions.delete","🗑️ حذف"),$e=o("reservations.details.labels.customer","العميل"),ot=o("reservations.details.labels.contact","رقم التواصل"),lt=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const da=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),fc=o("reservations.details.actions.openProject","📁 فتح المشروع"),yc=o("reservations.details.labels.start","بداية الحجز"),bc=o("reservations.details.labels.end","نهاية الحجز"),gc=o("reservations.details.labels.notes","ملاحظات"),hc=o("reservations.list.noNotes","لا توجد ملاحظات"),vc=o("reservations.details.labels.itemsCount","عدد المعدات"),qc=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),Sc=o("reservations.paymentHistory.title","سجل الدفعات"),wc=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Ec=o("reservations.list.unknownCustomer","غير معروف"),ms=typeof s?.paymentStatus=="string"?s.paymentStatus.toLowerCase():null,ua=i&&ms&&["paid","partial","unpaid"].includes(ms)?ms:e.paidStatus??e.paid_status??(c?"paid":"unpaid"),fs=ua==="partial",Ni=ua==="paid"?Tt:fs?k:vt;function ys(y){if(y==null)return Number.NaN;if(typeof y=="number")return Number.isFinite(y)?y:Number.NaN;const U=String(y).replace(/[^0-9.+-]/g,""),se=Number(U);return Number.isFinite(se)?se:Number.NaN}const pa=(y={})=>{const U=String(y.type??y.kind??y.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(U)||Array.isArray(y.packageItems)&&y.packageItems.length)},Ac=(y={})=>[y.packageId,y.package_id,y.packageCode,y.package_code,y.bundleId,y.bundle_id].some(U=>U!=null&&U!==""),xc=(y={})=>!y||typeof y!="object"?!1:!pa(y)&&Ac(y),_c=(y={})=>{const U=pa(y),se=[{value:y.qty,key:"qty",limit:999},{value:y.quantity,key:"quantity",limit:999},{value:y.units,key:"units",limit:999},{value:y.count,key:"count",limit:50},{value:y.package_quantity,key:"package_quantity",limit:999},{value:y.packageQty,key:"packageQty",limit:999},{value:y.packageCount,key:"packageCount",limit:999}];let ge=NaN;for(const Se of se){if(Se.value==null||Se.value==="")continue;const Be=typeof Se.value=="string"?Se.value.trim():String(Se.value??"");if(Se.key==="count"&&Be.length>6)continue;const Ke=ys(Se.value);if(!Number.isFinite(Ke)||Ke<=0)continue;const ze=Math.round(Ke);if(!(ze>Se.limit)){ge=Math.max(1,ze);break}}return(!Number.isFinite(ge)||ge<=0)&&(ge=1),U?Math.max(1,Math.min(99,ge)):Math.max(1,Math.min(9999,ge))};let In=(Array.isArray(d)?d:[]).filter(y=>y&&typeof y=="object"&&!xc(y)).reduce((y,U)=>y+_c(U),0);(!Number.isFinite(In)||In<=0)&&(In=Array.isArray(u)&&u.length?u.length:(Array.isArray(d)?d.length:0)||1),In=Math.max(1,Math.round(In));const Ic=h(String(In)),Li=fe.replace("{count}",Ic),kc=ke.replace("{count}",Ie),$c=e.notes?h(e.notes):hc,Pc=h(H.toFixed(2)),Cc=h(String(oe)),Nc=h(Ae.toFixed(2)),Lc=`${Cc}% (${Nc} ${w})`,jc=Number.isFinite(je)?Math.max(0,je):0,Tc=h(jc.toFixed(2)),Kt=[{icon:"💼",label:qc,value:`${xe} ${w}`}];Kt.push({icon:"😎",label:Q,value:`${Pc} ${w}`}),ae>0&&Kt.push({icon:"💸",label:Y,value:`${Ne} ${w}`}),Kt.push({icon:"📊",label:ne,value:`${Re} ${w}`}),R&&Pe>0&&Kt.push({icon:"🧾",label:L,value:`${rt} ${w}`}),oe>0&&Kt.push({icon:"🏦",label:Me,value:Lc}),Kt.push({icon:"💵",label:Ye,value:`${Tc} ${w}`}),Kt.push({icon:"💰",label:Ut,value:`${S} ${w}`});const Bc=Kt.map(({icon:y,label:U,value:se})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${y} ${U}</span>
      <span class="summary-details-value">${se}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let mt=[];i&&s&&(Array.isArray(s.paymentHistory)?mt=s.paymentHistory:Array.isArray(s.payment_history)?mt=s.payment_history:Array.isArray(s.payments)?mt=s.payments:Array.isArray(s.paymentLogs)&&(mt=s.paymentLogs)),(!Array.isArray(mt)||mt.length===0)&&(Array.isArray(e.paymentHistory)?mt=e.paymentHistory:Array.isArray(e.payment_history)?mt=e.payment_history:Array.isArray(e.paymentLogs)?mt=e.paymentLogs:mt=[]);const ji=Array.isArray(mt)?mt:[],Dc=ji.length?`<ul class="reservation-payment-history-list">${ji.map(y=>{const U=y?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):y?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),se=Number.isFinite(Number(y?.amount))&&Number(y.amount)>0?`${h(Number(y.amount).toFixed(2))} ${w}`:"—",ge=Number.isFinite(Number(y?.percentage))&&Number(y.percentage)>0?`${h(Number(y.percentage).toFixed(2))}%`:"—",Se=y?.recordedAt?h(bt(y.recordedAt)):"—",Be=y?.note?`<div class="payment-history-note">${nt(h(y.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${nt(U)}</span>
              <span class="payment-history-entry__amount">${se}</span>
              <span class="payment-history-entry__percent">${ge}</span>
              <span class="payment-history-entry__date">${Se}</span>
            </div>
            ${Be}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${nt(wc)}</div>`,Ti=String(e?.status||e?.reservationStatus||"").toLowerCase(),Bi=Ti==="cancelled"||Ti==="canceled",Di=Bi?[{text:o("reservations.list.status.cancelled","❌ ملغي"),className:"status-cancelled"},{text:Ni,className:ua==="paid"?"status-paid":fs?"status-partial":"status-unpaid"}]:[{text:r?Le:at,className:r?"status-confirmed":"status-pending"},{text:Ni,className:ua==="paid"?"status-paid":fs?"status-partial":"status-unpaid"}];l&&!Bi&&Di.push({text:ue,className:"status-completed"});const Fc=Di.map(({text:y,className:U})=>`<span class="status-chip ${U}">${y}</span>`).join(""),ln=(y,U,se)=>`
    <div class="res-info-row">
      <span class="label">${y} ${U}</span>
      <span class="value">${se}</span>
    </div>
  `;let bs="";if(e.projectId){let y=nt(da);if(s){const U=s.title||o("projects.fallback.untitled","مشروع بدون اسم");y=`${nt(U)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${nt(fc)}</button>`}bs=`
      <div class="res-info-row">
        <span class="label">📁 ${lt}</span>
        <span class="value">${y}</span>
      </div>
    `}const Bt=[];Bt.push(ln("👤",$e,t?.customerName||Ec)),Bt.push(ln("📞",ot,t?.phone||"—")),Bt.push(ln("🗓️",yc,Je)),Bt.push(ln("🗓️",bc,Ce)),Bt.push(ln("📦",vc,Li)),Bt.push(ln("⏱️",de,J)),Bt.push(ln("📝",gc,$c)),bs&&Bt.push(bs);const Rc=Bt.join(""),Mc=u.length?u.map(y=>{const U=y.items[0]||{},se=An(U)||y.image,ge=se?`<img src="${se}" alt="${_e}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let Se=[];if(Array.isArray(y.packageItems)&&y.packageItems.length)Se=[...y.packageItems];else{const he=[];y.items.forEach(De=>{Array.isArray(De?.packageItems)&&De.packageItems.length&&he.push(...De.packageItems)}),Se=he}if(Array.isArray(Se)&&Se.length>1){const he=new Set;Se=Se.filter(De=>{const le=De?.normalizedBarcode&&String(De.normalizedBarcode).toLowerCase()||De?.barcode&&String(De.barcode).toLowerCase()||(De?.equipmentId!=null?`id:${De.equipmentId}`:null);return le?he.has(le)?!1:(he.add(le),!0):!0})}const Be=pa(y)||y.items.some(he=>pa(he))||Se.length>0,Ke=(he,{fallback:De=1,max:le=1e3}={})=>{const Fe=ys(he);return Number.isFinite(Fe)&&Fe>0?Math.min(le,Fe):De};let ze;if(Be){const he=Ke(U?.qty??U?.quantity??U?.count,{fallback:NaN,max:999});Number.isFinite(he)&&he>0?ze=he:ze=Ke(y.quantity??y.count??1,{fallback:1,max:999})}else ze=Ke(y.quantity??y.count??U?.qty??U?.quantity??U?.count??0,{fallback:1,max:9999});const Qt=h(String(ze)),tt=(he,{preferPositive:De=!1}={})=>{let le=Number.NaN;for(const Fe of he){const kt=Ge(Fe);if(Number.isFinite(kt)){if(De&&kt>0)return kt;Number.isFinite(le)||(le=kt)}}return le};let ie,Oe;if(Be){const he=[U?.price,U?.unit_price,U?.unitPrice,y.unitPrice];if(ie=tt(he,{preferPositive:!0}),!Number.isFinite(ie)||ie<0){const le=Ge(y.totalPrice??U?.total??U?.total_price);Number.isFinite(le)&&ze>0&&(ie=le/ze)}Number.isFinite(ie)||(ie=0);const De=[U?.total,U?.total_price,y.totalPrice];if(Oe=tt(De),!Number.isFinite(Oe))Oe=ie*ze;else{const le=ie*ze;Number.isFinite(le)&&le>0&&Math.abs(Oe-le)>le*.25&&(Oe=le)}}else{const he=[U?.price,U?.unit_price,U?.unitPrice,y.unitPrice];if(ie=tt(he,{preferPositive:!0}),!Number.isFinite(ie)||ie<0){const De=Ge(y.totalPrice??U?.total??U?.total_price);Number.isFinite(De)&&ze>0&&(ie=De/ze)}Number.isFinite(ie)||(ie=0),Oe=Ge(y.totalPrice??U?.total??U?.total_price),Number.isFinite(Oe)||(Oe=ie*ze)}ie=Ee(ie),Oe=Ee(Oe);const St=`${h(ie.toFixed(2))} ${w}`,wt=`${h(Oe.toFixed(2))} ${w}`,Gt=y.barcodes.map(he=>h(String(he||""))).filter(Boolean),Et=Gt.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${Gt.map(he=>`<li>${he}</li>`).join("")}
              </ul>
            </details>`:"";let It="";if(Se.length){const he=new Map,De=le=>{const Fe=ys(le?.qtyPerPackage??le?.perPackageQty??le?.quantityPerPackage);return Number.isFinite(Fe)&&Fe>0&&Fe<=99?Math.round(Fe):1};if(Se.forEach(le=>{if(!le)return;const Fe=re(le.barcode||le.normalizedBarcode||le.desc||Math.random());if(!Fe)return;const kt=he.get(Fe),kn=De(le);if(kt){kt.qty=kn,kt.total=kn;return}he.set(Fe,{desc:le.desc||le.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(kn,99)),total:Math.max(1,Math.min(kn,99)),barcode:le.barcode??le.normalizedBarcode??""})}),he.size){const le=Array.from(he.values()).map(Fe=>{const kt=h(String(Fe.qty>0?Math.min(Fe.qty,99):1)),kn=nt(Fe.desc||""),Uc=Fe.barcode?` <span class="reservation-package-items__barcode">(${nt(h(String(Fe.barcode)))})</span>`:"";return`<li>${kn}${Uc} × ${kt}</li>`}).join("");It=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${le}
                </ul>
              </details>
            `}}const Vc=Be?`${It||""}${Et||""}`:Et;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${ge}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${nt(U.desc||U.description||U.name||y.description||"-")}</div>
                  ${Vc}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${nt(Ze.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Qt}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${nt(Ze.unitPrice)}">${St}</td>
            <td class="reservation-modal-items-table__cell" data-label="${nt(Ze.total)}">${wt}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${nt(Ze.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${Vt}</td></tr>`,zc=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${Ze.item}</th>
            <th>${Ze.quantity}</th>
            <th>${Ze.unitPrice}</th>
            <th>${Ze.total}</th>
            <th>${Ze.actions}</th>
          </tr>
        </thead>
        <tbody>${Mc}</tbody>
      </table>
    </div>
  `,Fi=I.map((y,U)=>{const se=h(String(U+1));let ge=y.positionLabel??y.position_name??y.position_label??y.position_title??y.role??y.position??null;if((!ge||ge.trim()==="")&&(ge=y.positionLabelAr??y.position_label_ar??y.position_title_ar??y.positionLabelEn??y.position_label_en??y.position_name_ar??y.position_title_en??y.position_name_en??null),!ge||ge.trim()==="")try{const St=typeof Wt=="function"?Wt():[],wt=y.positionId?St.find(It=>String(It.id)===String(y.positionId)):null,Gt=!wt&&y.positionKey?St.find(It=>String(It.name).toLowerCase()===String(y.positionKey).toLowerCase()):null,Et=wt||Gt||null;Et&&(ge=Et.labelAr||Et.labelEn||Et.name||ge)}catch{}const Se=Ss(ge)||o("reservations.crew.positionFallback","منصب بدون اسم"),Be=Ss(y.positionLabelAlt??y.position_label_alt??y.positionLabelEn??y.position_label_en??y.positionLabelAr??y.position_label_ar??y.position_name_en??y.position_name_ar??""),Ke=Ss(y.technicianName)||o("technicians.picker.noTechnicianOption","— بدون تعيين —"),ze=y.technicianPhone||cn,Qt=Ee(Ge(y.positionCost??y.position_cost??y.cost??y.daily_wage??y.dailyWage??y.internal_cost??0));let tt=Ee(Ge(y.positionClientPrice??y.position_client_price??y.client_price??y.customer_price??y.position_price??y.clientPrice??y.daily_total??y.dailyTotal??y.total??0));if(!Number.isFinite(tt)||tt<=0)try{const St=Wt?Wt():[],wt=y.positionId?St.find(It=>String(It.id)===String(y.positionId)):null,Gt=!wt&&y.positionKey?St.find(It=>String(It.name).toLowerCase()===String(y.positionKey).toLowerCase()):null,Et=wt||Gt||null;Et&&Number.isFinite(Number(Et.clientPrice))&&(tt=Ee(Number(Et.clientPrice)))}catch{}const ie=`${h(tt.toFixed(2))} ${w}`,Oe=Qt>0?`${h(Qt.toFixed(2))} ${w}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${se}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${Ke}</span>
            <small class="text-muted">🏷️ ${Se}${Be?` — ${Be}`:""}</small>
            <small class="text-muted">💼 ${ie}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${ze}</div>
          ${Oe?`<div>💵 ${o("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${Oe}</div>`:""}
        </div>
      </div>
    `}).join(""),Oc=Array.isArray(I)&&I.length>4,Hc=I.length?Oc?`
          <div class="reservation-technicians-slider" data-tech-slider>
            <button type="button" class="slider-btn slider-btn--prev" data-slider-prev aria-label="${nt(o("reservations.details.slider.prev","السابق"))}" title="${nt(o("reservations.details.slider.prev","السابق"))}">‹</button>
            <div class="reservation-technicians-track" data-slider-track>
              ${Fi}
            </div>
            <button type="button" class="slider-btn slider-btn--next" data-slider-next aria-label="${nt(o("reservations.details.slider.next","التالي"))}" title="${nt(o("reservations.details.slider.next","التالي"))}">›</button>
          </div>
        `:`<div class="reservation-technicians-grid">${Fi}</div>`:`<ul class="reservation-modal-technicians"><li>${pt}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${we}</span>
          <strong>${Te}</strong>
        </div>
        <div class="status-chips">
          ${Fc}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Qe}</h6>
          ${Rc}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${qt}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${Bc}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Sc}</h6>
              ${Dc}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${et}</span>
          <span class="count">${kc}</span>
        </div>
        ${Hc}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Ue}</span>
          <span class="count">${Li}</span>
        </div>
        ${zc}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${be}</button>
        ${O?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${pe}</button>`:""}
      </div>
    </div>
  `}const Mp="project",zp="editProject",Op=3600*1e3,co=.15,Hp=6,Vp="projectsTab",Up="projectsSubTab",Kp={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},Qp={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed",cancelled:"Cancelled",conflict:"Conflict"},Id=`@page {
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

/* Make exported PDF table fonts match preview sizing more closely */
#quotation-pdf-root[data-quote-render-context="export"] .quote-table {
  font-size: 11px;
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

/* Ensure cell content is vertically centered in both preview and exported PDF */
.quote-table th,
.quote-table td {
  vertical-align: middle !important;
  line-height: 1.6;
}

.quote-table th > *,
.quote-table td > * {
  vertical-align: middle !important;
}

/* Wrapper used inside each cell to force consistent vertical centering in captured PDF */
.quote-cell {
  display: flex;
  align-items: center;      /* vertical center */
  justify-content: center;  /* horizontal center */
  width: 100%;
  height: 100%;
  min-height: 18px;
  text-align: center;
}

/* Multi-line descriptions preserve manual breaks while keeping vertical centering */
.quote-cell--desc {
  white-space: pre-wrap;
  text-align: center;
}

/* Subtotal row/box under each table */
.quote-table-subtotal {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
.quote-table-subtotal__pill {
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
`,kd=""+new URL("Tajawal-400.ttf",import.meta.url).href,$d=""+new URL("Tajawal-500.ttf",import.meta.url).href,Zi=""+new URL("Tajawal-700.ttf",import.meta.url).href,Pd=/color\([^)]*\)/gi,Cd=/color-mix\([^)]*\)/gi,Nd=/oklab\([^)]*\)/gi,Ld=/oklch\([^)]*\)/gi,Yt=/(color\(|color-mix\(|oklab|oklch)/i,jd=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke","boxShadow","textShadow","accentColor","caretColor","columnRuleColor"],Td=typeof document<"u"?document.createElement("canvas"):null,ya=Td?.getContext?.("2d")||null;function lo(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function Fs(e,t="#000"){if(!ya||!e)return t;try{return ya.fillStyle="#000",ya.fillStyle=e,ya.fillStyle||t}catch{return t}}function Bd(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&Yt.test(n)){const s=Fs(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function Pn(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function uo(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const i=t.getComputedStyle(s);if(!i)return;jd.forEach(c=>{const l=i[c];if(l&&Yt.test(l)){const d=lo(c);if(Pn(n,s,d),c==="boxShadow"||c==="textShadow")s.style.setProperty(d,"none","important");else{const u=c==="backgroundColor"?"#ffffff":i.color||"#000000",b=Fs(l,u);s.style.setProperty(d,b,"important")}}});const r=i.backgroundImage;if(r&&Yt.test(r)){const c=Fs(i.backgroundColor||"#ffffff","#ffffff");Pn(n,s,"background-image"),Pn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function po(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const i=t.getComputedStyle(s);if(!i)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","boxShadow","textShadow","accentColor","caretColor","columnRuleColor"].forEach(c=>{const l=i[c];if(l&&Yt.test(l)){const d=lo(c);if(Pn(n,s,d),c==="boxShadow"||c==="textShadow")s.style.setProperty(d,"none","important");else{const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(d,u,"important")}}});const r=i.backgroundImage;r&&Yt.test(r)&&(Pn(n,s,"background-image"),Pn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function mo(e){if(!e)return;const t=(n="")=>{if(typeof n!="string")return n;let a=n;return Yt.test(a)&&(a=a.replace(Pd,"#000").replace(Cd,"#000").replace(Nd,"#000").replace(Ld,"#000")),a};e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&Yt.test(a)&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&Yt.test(a)&&n.setAttribute("style",t(a))})}const fo="reservations.quote.sequence",er={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},yo="https://help.artratio.sa/guide/quote-preview",Xe={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Dd=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],ut=[...Dd],Fd=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function Rs(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...ut]}function Rd(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=Rs(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=Rs(t.value);if(a.length)return a}const n=ut.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...ut]}const Md=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],ss=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>{if(e?.isPackage){const t=e?.packageCodeResolved||e?.barcode||"";return E(t||"-")}return E(e?.barcode||"-")}},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>{const t=String(e?.desc||e?.description||"-");return`<div class="quote-cell quote-cell--desc">${E(t)}</div>`}},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>E(h(String(e?.qty||1)))},{id:"unitPrice",labelKey:null,fallback:"لكل يوم",render:e=>E(h(Number(e?.unitPriceValue||0).toFixed(2)))},{id:"price",labelKey:null,fallback:"المجموع",render:e=>E(h(Number(e?.price||0).toFixed(2)))}],is=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"position",labelKey:"reservations.details.crew.position",fallback:"المنصب",render:e=>E(h(e?.positionLabel??e?.position_name??e?.role??o("reservations.crew.positionFallback","منصب بدون اسم")))},{id:"unitPrice",labelKey:null,fallback:"لكل يوم",render:e=>{const t=Number.isFinite(Number(e?.positionClientPrice))?Number(e.positionClientPrice):0;return E(`${h(t.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}},{id:"price",labelKey:null,fallback:"المجموع",render:e=>{const t=Number.isFinite(Number(e?.positionClientPrice))?Number(e.positionClientPrice):0;return E(`${h(t.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}}],Ms={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:[...ss.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),{id:"equipmentSubtotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"}],crew:[...is.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),{id:"groupByPosition",labelKey:null,fallback:"تجميع حسب المنصب",default:!1},{id:"crewSubtotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"}]},bo=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>E(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>E(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>E(e?.note||"-")}],zd=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"الخدمات الإنتاجية",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],Od={customerInfo:Ms.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"}],payment:Ms.payment,projectExpenses:[...bo.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),{id:"expensesSubtotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي الخدمات الإنتاجية"}],projectCrew:[...is.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية"},{id:"days",labelKey:null,fallback:"الأيام"},{id:"crewSubtotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"}],projectEquipment:[...ss.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),{id:"days",labelKey:null,fallback:"الأيام"},{id:"equipmentSubtotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"}],projectNotes:[]},ws=new Map;function rs(e="reservation"){if(ws.has(e))return ws.get(e);const t=e==="project"?zd:Md,n=e==="project"?Od:Ms,a=new Set(t.map(({id:r})=>r)),s=Object.fromEntries(Object.entries(n).map(([r,c=[]])=>[r,new Set(c.map(l=>l.id))])),i={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return ws.set(e,i),i}function os(e="reservation"){return rs(e).sectionDefs}function go(e="reservation"){return rs(e).fieldDefs}function ho(e="reservation"){return rs(e).sectionIdSet}function vo(e="reservation"){return rs(e).fieldIdMap}function qo(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const Hd="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",Vd="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",Ud="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",So=Id.trim(),wo=`
@font-face { font-family: 'Tajawal'; font-style: normal; font-weight: 400; font-display: swap; src: url(${JSON.stringify(kd)}) format('truetype'); }
@font-face { font-family: 'Tajawal'; font-style: normal; font-weight: 500; font-display: swap; src: url(${JSON.stringify($d)}) format('truetype'); }
@font-face { font-family: 'Tajawal'; font-style: normal; font-weight: 600; font-display: swap; src: url(${JSON.stringify(Zi)}) format('truetype'); }
@font-face { font-family: 'Tajawal'; font-style: normal; font-weight: 700; font-display: swap; src: url(${JSON.stringify(Zi)}) format('truetype'); }
`,Eo=/^data:image\/svg\+xml/i,Kd=/\.svg($|[?#])/i,Gn=512,zs="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",Ao=96,xo=25.4,Os=210,va=297,qa=Math.round(Os/xo*Ao),Sa=Math.round(va/xo*Ao);function Ve(e){const t=Number(e),n=Number.isFinite(t)?t:0;try{const a=Math.abs(n%1)>1e-9;return h(n.toLocaleString("en-US",{minimumFractionDigits:a?2:0,maximumFractionDigits:2}))}catch{return Number.isInteger(n)?h(String(n)):h(n.toFixed(2))}}let Ba=!1,Da=null;function _o(){Ba||(Da=async function(){try{if(!P||!te?.modal?.classList.contains("show")||(P.context||"reservation")!=="reservation")return;const n=P.reservation;if(!n)return;const a=[n.id,n.reservationId,n.reservation_id,n.reservationCode,n.reservation_code].map(u=>u==null?"":String(u)).filter(u=>u.length>0);if(!a.length)return;const s=Ft(),i=(Array.isArray(s)?s:[]).find(u=>[u?.id,u?.reservationId,u?.reservation_id,u?.reservationCode,u?.reservation_code].map(f=>f==null?"":String(f)).filter(f=>f.length>0).some(f=>a.includes(f)));if(!i)return;const r=xi(i),{totalsDisplay:c,totals:l,rentalDays:d}=Mo(i,r,P.project);P.reservation=i,P.crewAssignments=r,P.totals=l,P.totalsDisplay=c,P.rentalDays=d,Go(),an()}catch(t){console.warn("[reservationPdf] live update failed",t)}},document.addEventListener("reservations:changed",Da),Ba=!0)}function Io(){if(Ba){try{document.removeEventListener("reservations:changed",Da)}catch{}Da=null,Ba=!1}}const ko=2,$o=/safari/i,Qd=/(iphone|ipad|ipod)/i,tr=/(iphone|ipad|ipod)/i,Gd=/(crios|fxios|edgios|opios)/i,Fa="[reservations/pdf]";let te=null,P=null,Pt=1,Un=null,Kn=null,Jt=null,Cn=null,Xn=!1;function yn(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!te?.statusIndicator||!te?.statusText)return;te.statusKind=e;const i=t||qo(e);te.statusText.textContent=i,te.statusSpinner&&(te.statusSpinner.hidden=!s),te.statusAction&&(te.statusAction.hidden=!0,te.statusAction.onclick=null,n&&typeof a=="function"&&(te.statusAction.textContent=n,te.statusAction.hidden=!1,te.statusAction.onclick=r=>{r.preventDefault(),a()})),te.statusIndicator.hidden=!1,requestAnimationFrame(()=>{te.statusIndicator.classList.add("is-visible")})}function Nn(e){try{return String(e||"").toLowerCase().normalize("NFKD").replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,"").replace(/\s+/g," ").trim()}catch{return String(e||"").trim().toLowerCase()}}function Jn(e){!te?.statusIndicator||!te?.statusText||(te.statusKind=null,te.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{te?.statusIndicator&&(te.statusIndicator.hidden=!0,te.statusAction&&(te.statusAction.hidden=!0,te.statusAction.onclick=null),te.statusSpinner&&(te.statusSpinner.hidden=!1))},220))}function Hs(){return!!window?.bootstrap?.Modal}function Wd(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),Jt||(Jt=document.createElement("div"),Jt.className="modal-backdrop fade show",Jt.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(Jt)),Cn||(Cn=t=>{t.key==="Escape"&&Vs(e)},document.addEventListener("keydown",Cn));try{e.focus({preventScroll:!0})}catch{}}}function Vs(e){if(!(!e||!e.classList.contains("show"))){try{const t=e.ownerDocument?.activeElement;if(t&&e.contains(t)){try{t.blur()}catch{}try{e.ownerDocument?.body?.focus({preventScroll:!0})}catch{}}}catch{}e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),Jt&&(Jt.remove(),Jt=null),Cn&&(document.removeEventListener("keydown",Cn),Cn=null);try{Io()}catch{}}}function Xd(e){if(e){if(Hs()){const t=window.bootstrap.Modal.getOrCreateInstance(e);try{const n=()=>{try{const a=document.activeElement;if(a&&e.contains(a)){try{a.blur()}catch{}try{document.body?.focus({preventScroll:!0})}catch{}}}catch{}try{Io()}catch{}try{e.removeEventListener("hidden.bs.modal",n)}catch{}};e.addEventListener("hidden.bs.modal",n,{once:!0}),e.addEventListener("hide.bs.modal",()=>{try{const a=document.activeElement;if(a&&e.contains(a))try{a.blur()}catch{}}catch{}})}catch{}t.show();return}Wd(e)}}function Jd(){if(Xn)return;Xn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!te?.modal?.classList.contains("show"),s=()=>{te?.modal?.classList.contains("show")&&(yn("render"),Xn=!1,an())};br({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:yo}),a&&yn("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function cs(e="reservation"){const t={},n=go(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(i=>i?.default!==!1).map(i=>i.id))}),t}function vi(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function Yd(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function qi(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function Si(e="reservation"){return Object.fromEntries(os(e).map(({id:t})=>[t,!1]))}function wi(e,t){return e.sectionExpansions||(e.sectionExpansions=Si(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Zd(e,t){return wi(e,t)?.[t]!==!1}function Ei(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function eu(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Qd.test(e)}function tu(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=$o.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Po(){return eu()&&tu()}function ls(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=tr.test(e)||tr.test(t),s=/Macintosh/i.test(e)&&n>1;return $o.test(e)&&!Gd.test(e)&&(a||s)}function Es(e,...t){try{console.log(`${Fa} ${e}`,...t)}catch{}}function zt(e,...t){try{console.warn(`${Fa} ${e}`,...t)}catch{}}function nu(e,t,...n){try{t?console.error(`${Fa} ${e}`,t,...n):console.error(`${Fa} ${e}`,...n)}catch{}}function He(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function au(e,t="لا توجد بيانات للعرض."){const n=E(o(e,t));return He(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Ra(e,t){return Array.isArray(e)&&e.length?e:[au(t)]}const su=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function Co(e=""){return su.test(e)}function iu(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(i,...r){if(typeof i!="string"||!Co(i))return a.call(this,i,...r);let c,l=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),l=!0)}catch{}try{if(!l){const d=this.canvas;d&&d.style?.direction!=="rtl"&&(d.__artRatioOriginalDirection=d.style.direction,d.style.direction="rtl")}return a.call(this,i,...r)}finally{if(l&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!l){const d=this.canvas;d&&d.__artRatioOriginalDirection!==void 0&&(d.style.direction=d.__artRatioOriginalDirection,delete d.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function nr(e,t=Gn){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function ru(e){if(!e)return{width:Gn,height:Gn};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?nr(t,0):0,s=n?nr(n,0):0;if(a>0&&s>0)return{width:a,height:s};const i=e.getAttribute?.("viewBox");if(i){const r=i.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(r.length>=4){const[,,c,l]=r;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(l)&&l>0?l:0)}}return{width:a||Gn,height:s||Gn}}function No(e=""){return typeof e!="string"?!1:Eo.test(e)||Kd.test(e)}function ou(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function cu(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=i=>{const r=i?.message||`Unable to load image from ${e}`;a(new Error(r))},s.src=e})}async function Lo(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const i=await cu(s),r=n.createElement("canvas"),c=Math.max(t.width||i.naturalWidth||i.width||0,1),l=Math.max(t.height||i.naturalHeight||i.height||c,1);r.width=c,r.height=l;const d=r.getContext("2d");return d.clearRect(0,0,c,l),d.drawImage(i,0,0,c,l),r.toDataURL("image/png")}catch(i){return console.warn("[reservations/pdf] failed to rasterize SVG content",i),null}finally{URL.revokeObjectURL(s)}}async function lu(e){if(!e)return null;if(Eo.test(e))return ou(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function du(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!No(t))return!1;const n=await lu(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",zs),!1;const a=await Lo(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",zs),!1)}async function uu(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=ru(e),s=await Lo(n,a),r=(e.ownerDocument||document).createElement("img");r.setAttribute("src",s||zs),r.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),r.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&r.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&r.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),l=e.getAttribute("height");return c&&r.setAttribute("width",c),l&&r.setAttribute("height",l),e.parentNode?.replaceChild(r,e),!!s}async function jo(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{No(s.getAttribute?.("src"))&&a.push(du(s))}),n.forEach(s=>{a.push(uu(s))}),a.length&&await Promise.allSettled(a)}function pu(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const i=(z,ee=0)=>{const M=parseFloat(z);return Number.isFinite(M)?M:ee},r=i(s.paddingTop),c=i(s.paddingBottom),l=i(s.paddingRight),d=i(s.paddingLeft),u=i(s.borderRadius),b=i(s.fontSize,14),f=(()=>{const z=s.lineHeight;if(!z||z==="normal")return b*1.6;const ee=i(z,b*1.6);return ee>0?ee:b*1.6})(),m=Math.max(e.clientWidth||0,e.scrollWidth||0,i(s.width,0));if(m<=0)return null;const p=Math.max(1,m-d-l),g=e.textContent||"",v=g.split(/\r?\n/),$=n.createElement("canvas"),q=$.getContext("2d");if(!q)return null;const N=s.fontStyle||"normal",I=s.fontVariant||"normal",O=s.fontWeight||"400",A=s.fontFamily||"sans-serif",_=s.fontStretch||"normal",T=z=>z.join(" "),B=[],Z=z=>q.measureText(z).width;q.font=`${N} ${I} ${O} ${_} ${b}px ${A}`,v.forEach(z=>{const ee=z.trim();if(ee.length===0){B.push("");return}const M=ee.split(/\s+/);let K=[];M.forEach((H,ae)=>{const me=H.trim();if(!me)return;const oe=T(K.concat(me));if(Z(oe)<=p||K.length===0){K.push(me);return}B.push(T(K)),K=[me]}),K.length&&B.push(T(K))}),B.length||B.push("");const C=r+c+B.length*f,R=Math.ceil(Math.max(1,m)*t),W=Math.ceil(Math.max(1,C)*t);$.width=R,$.height=W,$.style.width=`${Math.max(1,m)}px`,$.style.height=`${Math.max(1,C)}px`,q.scale(t,t);const j=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){q.save(),q.beginPath();const z=Math.max(1,m),ee=Math.max(1,C),M=Math.min(u,z/2,ee/2);q.moveTo(M,0),q.lineTo(z-M,0),q.quadraticCurveTo(z,0,z,M),q.lineTo(z,ee-M),q.quadraticCurveTo(z,ee,z-M,ee),q.lineTo(M,ee),q.quadraticCurveTo(0,ee,0,ee-M),q.lineTo(0,M),q.quadraticCurveTo(0,0,M,0),q.closePath(),q.clip()}if(q.fillStyle=j,q.fillRect(0,0,Math.max(1,m),Math.max(1,C)),q.font=`${N} ${I} ${O} ${_} ${b}px ${A}`,q.fillStyle=s.color||"#000000",q.textBaseline="top",q.textAlign="right","direction"in q)try{q.direction="rtl"}catch{}const D=Math.max(0,m-l);let F=r;B.forEach(z=>{const ee=z.length?z:" ";q.fillText(ee,D,F,p),F+=f});const V=n.createElement("img");let X;try{X=$.toDataURL("image/png")}catch(z){return zt("note canvas toDataURL failed",z),null}return V.src=X,V.alt=g,V.style.width=`${Math.max(1,m)}px`,V.style.height=`${Math.max(1,C)}px`,V.style.display="block",V.setAttribute("data-quote-note-image","true"),{image:V,canvas:$,totalHeight:C,width:m}}function mu(e,{pixelRatio:t=1}={}){if(!e||!ls())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!Co(a.textContent||""))return;let s;try{s=pu(a,{pixelRatio:t})}catch(i){zt("failed to rasterize note content",i),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function Us(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){nu(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const i=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),r=n||i,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),l=o("reservations.quote.toast.retry","إعادة المحاولة"),d=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(yn("export"),Wo()):(yn("render"),Xn=!1,an())};if(br({message:r,duration:9e3,actionLabel:d?l:void 0,onAction:d?u:void 0,linkLabel:c,linkHref:yo}),te?.modal?.classList.contains("show")&&yn("error",{message:r,actionLabel:d?l:void 0,onAction:d?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function Ks({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){zt("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){zt("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function Ai(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",i=>n(i)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=i=>n(i),document.head.appendChild(s)})}function ar(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function sr(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function fu(){const e=sr();return e||(Kn||(Kn=Ai(Vd).catch(t=>{throw Kn=null,t}).then(()=>{const t=sr();if(!t)throw Kn=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Kn)}async function yu(){const e=ar();return e||(Un||(Un=Ai(Ud).catch(t=>{throw Un=null,t}).then(()=>{const t=ar();if(!t)throw Un=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),Un)}async function bu(){if(window.html2pdf||await Ai(Hd),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}Bd(),iu()}function E(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function gu(e="reservation"){return e==="project"?"QP":"Q"}function hu(e,t="reservation"){const n=Number(e),a=gu(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function vu(){const e=window.localStorage?.getItem?.(fo),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function To(e="reservation"){const n=vu()+1;return{sequence:n,quoteNumber:hu(n,e)}}function qu(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(fo,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function Bo(e="reservation"){return er[e]||er.reservation}function Su(e="reservation"){try{const t=Bo(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function wu(e,t="reservation"){try{const n=Bo(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function Eu(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function Au(e,t="reservation"){if(!e)return null;const n=ho(t),a=vo(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),i={},r=e.fields||{};return Object.entries(a).forEach(([c,l])=>{const d=r[c];if(d==null)return;const{ids:u,emptyExplicitly:b}=Eu(d);if(!u&&!b)return;const f=Array.isArray(u)?u.filter(m=>l.has(m)):[];(f.length>0||b)&&(i[c]=f)}),{version:1,sections:s,fields:i}}function Do(e){if(!e)return;const t=e.context||"reservation",n=Au(e,t);n&&wu(n,t)}function Fo(e){if(!e)return;const t=e.context||"reservation",n=Su(t);if(!n)return;const a=ho(t),s=Array.isArray(n.sections)?n.sections.filter(i=>a.has(i)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const i=vi(e.fields||cs(t)),r=vo(t);Object.entries(n.fields).forEach(([c,l])=>{const d=r[c];if(!d)return;const u=Array.isArray(l)?l.filter(b=>d.has(b)):[];i[c]=new Set(u)}),e.fields=i}}function Ro(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function xi(e){const t=gn()||[],{technicians:n=[]}=ye(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const c=String(r.id),l=s.get(c)||{};s.set(c,{...l,...r})}),(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(r=>({technicianId:r}))).map((r,c)=>{const l=r?.technicianId!=null?s.get(String(r.technicianId)):null;let d=r.positionLabel??r.position_name??r.position_label??r.role??r.position??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم");(!d||d.trim()==="")&&(d=r.positionLabelAr??r.position_label_ar??r.positionLabelEn??r.position_label_en??r.position_name_ar??r.position_name_en??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم"));try{const f=typeof Wt=="function"?Wt()||[]:[];let m=null;if(r?.positionId!=null&&(m=f.find(p=>String(p?.id)===String(r.positionId))||null),!m){const p=r.positionKey??r.position_key??r.positionName??r.position_name??r.position??"";if(p&&(m=typeof Aa=="function"&&Aa(p)||null,!m&&f.length)){const g=String(p).trim().toLowerCase();m=f.find(v=>[v.name,v.labelAr,v.labelEn].filter(Boolean).map($=>String($).toLowerCase()).includes(g))||null}}if(m){const p=m.labelAr||m.labelEn||m.name||"";p&&p.trim()&&(d=p)}}catch{}const u=Ee(Ge(r.positionCost??r.position_cost??r.cost??r.daily_wage??r.dailyWage??l?.dailyWage??l?.wage??0)),b=Ee(Ge(r.positionClientPrice??r.position_client_price??r.client_price??r.clientPrice??r.daily_total??r.dailyTotal??r.total??l?.dailyTotal??l?.total??l?.total_wage??0));return{assignmentId:r.assignmentId??r.assignment_id??`crew-${c}`,positionId:r.positionId??r.position_id??null,positionLabel:d,positionLabelAlt:r.positionLabelAlt??r.position_label_alt??"",positionCost:u,positionClientPrice:b,technicianId:r.technicianId!=null?String(r.technicianId):l?.id!=null?String(l.id):null,technicianName:r.technicianName??r.technician_name??l?.name??null,technicianRole:r.technicianRole??l?.role??null}})}function Mo(e,t,n){const{projectLinked:a}=nn(e,n);Wa(e.start,e.end);const s=e.discount??e.discountValue??0,i=Number(h(String(s)))||0,r=e.discountType??e.discount_type??"percent",c=String(r).toLowerCase()==="amount"?"amount":"percent",l=a?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),d=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,u=d!=null?Ge(d):Number.NaN,f=(e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied)===!0&&Number.isFinite(u)&&u>0?u:null,m=Array.isArray(t)?t.map(I=>I?.technicianId).filter(Boolean):[],p=xr({items:Array.isArray(e.items)?e.items:[],technicianIds:m,crewAssignments:Array.isArray(t)?t:[],discount:i,discountType:c,applyTax:l,start:e.start,end:e.end,companySharePercent:f}),g=Ge(e.cost??e.total??e.finalTotal),v=Number.isFinite(g),$=a?p.finalTotal:v?Ee(g):p.finalTotal,q={equipmentTotal:p.equipmentTotal,crewTotal:p.crewTotal,crewCostTotal:p.crewCostTotal,discountAmount:p.discountAmount,subtotalAfterDiscount:p.subtotalAfterDiscount,taxableAmount:p.taxableAmount,taxAmount:p.taxAmount,finalTotal:$,companySharePercent:p.companySharePercent,companyShareAmount:p.companyShareAmount,netProfit:p.netProfit},N={equipmentTotal:Ve(p.equipmentTotal),crewTotal:Ve(p.crewTotal),discountAmount:Ve(p.discountAmount),subtotalAfterDiscount:Ve(p.subtotalAfterDiscount),taxableAmount:Ve(p.taxableAmount),taxAmount:Ve(p.taxAmount),finalTotal:Ve($),companySharePercent:h((Number.isFinite(p.companySharePercent)?p.companySharePercent:0).toFixed(2)),companyShareAmount:Ve(p.companyShareAmount),netProfit:h(p.netProfit.toFixed(2))};return{totals:q,totalsDisplay:N,rentalDays:p.rentalDays}}function Dn(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function zo(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function xu(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=Dn(e.amount??(n==="amount"?e.value:null)),s=Dn(e.percentage??(n==="percent"?e.value:null)),i=n==="percent"?s??null:a??null,r=e.note??e.memo??null,c=zo(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:i,note:r,recordedAt:c}}function _u(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(xu).filter(Boolean);if(n.length>0)return n;const a=Dn(e.paidPercent??e.paid_percent),s=Dn(e.paidAmount??e.paid_amount),i=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,r=zo(i);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:r}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:r}]:[]}function Iu(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function ku(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function $u(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function Pu(e){const t=Number(e?.equipmentEstimate)||0,n=$u(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",i=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?i:a*(i/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const l=Math.max(0,a-c),d=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,b=d&&s&&u>0?u:0,f=b>0?Number((l*(b/100)).toFixed(2)):0,m=l+f;let p=s?m*co:0;(!Number.isFinite(p)||p<0)&&(p=0),p=Number(p.toFixed(2));let g=s?Number(e?.totalWithTax):m;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((m+p).toFixed(2))):g=m,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:l,companyShareAmount:f,subtotal:m,applyTax:s,taxAmount:p,totalWithTax:g}}function Cu(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",i=Array.isArray(e.crewAssignments)?e.crewAssignments:[],r=i.length?i:Array.isArray(e.technicians)?e.technicians:[],c=ti(t,a,s,!1,r,{start:e.start,end:e.end});if(Number.isFinite(c))return c;const l=Number(h(String(e.cost??0)));return Number.isFinite(l)?Math.round(l):0}function Nu(e,t){if(!e)return"—";const n=bt(e);return t?`${n} - ${bt(t)}`:n}function ve(e,t="SR",n=2){const a=Number(e);return`${Ve(a)} ${t}`}function ir(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function Lu(e){if(!e?.start)return null;if(!e?.end)return 1;const t=Wa(e.start,e.end);return Number.isFinite(t)?t:1}function ju(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function rr(e){const t=o("reservations.create.summary.currency","SR"),n=ye()||{},a=Array.isArray(n.customers)?n.customers:[],s=Array.isArray(n.projects)?n.projects:[],i=Array.isArray(n.technicians)?n.technicians:[];let r=[];try{const w=Ft?.()||[];r=Array.isArray(w)&&w.length?w:n.reservations||[]}catch{r=n.reservations||[]}const c=e?.id!=null?s.find(w=>String(w.id)===String(e.id))||e:e||null,l={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!c)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:l.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:ve(0,t),expensesTotal:ve(0,t),reservationsTotal:ve(0,t),discountAmount:ve(0,t),taxAmount:ve(0,t),overallTotal:ve(0,t),paidAmount:ve(0,t),remainingAmount:ve(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:l.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:ve(0,t),remainingAmountDisplay:ve(0,t),paidPercentDisplay:ir(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:l.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const d=c.clientId??c.customerId??c.client_id??c.customer_id??null,u=d!=null&&a.find(w=>String(w.id)===String(d))||null,b=u?.customerName??u?.name??c.clientName??c.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),f=(c.clientCompany||u?.companyName||u?.company||"").trim(),m=u?.phone??u?.customerPhone??c.clientPhone??c.customerPhone??"",p=m?h(String(m).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),g=u?.email??c.clientEmail??c.customerEmail??"",v=g?String(g).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),$=c.projectCode||`PRJ-${h(String(c.id??""))}`,q=h(String($)),N=(c.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),I=Iu(c.type),O=c.start?bt(c.start):"—",A=c.end?bt(c.end):"—",_=Lu(c),T=_!=null?ju(_):"غير محدد",B=ku(c),Z={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},C=o(`projects.status.${B}`,Z[B]||B),R=c.id!=null?String(c.id):null,W=R?r.filter(w=>{const Y=w?.projectId??w?.project_id??null;return Y!=null&&String(Y)===R}):[],D=W.map(w=>{const Y=w.reservationId||w.id||"",L=w.status||w.state||"pending",Q=String(L).toLowerCase(),ne=o(`reservations.status.${Q}`,Q),de=Cu(w),Me=w.start?new Date(w.start).getTime():0;return{reservationId:h(String(Y||"-")),status:Q,statusLabel:ne,total:de,totalLabel:ve(de,t),dateRange:Nu(w.start,w.end),startTimestamp:Number.isNaN(Me)?0:Me}}).sort((w,Y)=>Y.startTimestamp-w.startTimestamp).map(({startTimestamp:w,...Y})=>Y).reduce((w,Y)=>w+(Number(Y.total)||0),0),F=[];try{W.forEach(w=>{const{groups:Y}=ii(w);Y.forEach(L=>{const Q=Number(L?.count??L?.quantity??1)||1,ne=Number(L?.unitPrice);let de=Number.isFinite(ne)?ne:0;if(!de||de<=0){const Le=Number(L?.totalPrice);Number.isFinite(Le)&&Q>0&&(de=Number((Le/Q).toFixed(2)))}Number.isFinite(de)||(de=0);const Me=L?.type==="package"||Array.isArray(L?.items)&&L.items.some(Le=>Le?.type==="package"),Ye=Array.isArray(L?.barcodes)&&L.barcodes.length?L.barcodes[0]:Array.isArray(L?.items)&&L.items.length?L.items[0]?.barcode:null;let _e=L?.packageDisplayCode??L?.package_code??L?.code??L?.packageCode??(Array.isArray(L?.items)&&L.items.length?L.items[0]?.package_code??L.items[0]?.code??L.items[0]?.packageCode:null);const Ze=Le=>{const at=(Le==null?"":String(Le)).trim();return!!(!at||/^pkg-/i.test(at)||/^\d+$/.test(at)&&at.length<=4)};if(!_e||Ze(_e)){const Le=L?.packageId??L?.package_id??(Array.isArray(L?.items)&&L.items.length?L.items[0]?.packageId??L.items[0]?.package_id:null);if(Le)try{const at=ei(Le);at&&at.package_code&&(_e=at.package_code)}catch{}}if(!_e||Ze(_e))try{const Le=Nn(L?.description||"");if(Le){const at=_r();let Tt=at.find(vt=>Nn(vt?.name||vt?.title||vt?.label||"")===Le);Tt||(Tt=at.find(vt=>{const k=Nn(vt?.name||vt?.title||vt?.label||"");return k.includes(Le)||Le.includes(k)})),Tt&&Tt.package_code&&(_e=Tt.package_code)}}catch{}const Vt=Me?_e??Ye??"":L?.barcode??Ye??"",pt=Vt!=null?String(Vt):"",cn=Number.isFinite(Number(L?.totalPrice))?Number(L.totalPrice):Number((de*Q).toFixed(2));F.push({...L,isPackage:Me,desc:L?.description,barcode:pt,packageCodeResolved:_e||"",qty:Q,price:de,totalPrice:Ee(cn),unitPriceValue:de})})})}catch{}const V=new Map;W.forEach(w=>{const Y=Array.isArray(w.items)?w.items:[],L=Wa(w.start,w.end),Q=w.reservationId||w.id||"";Y.forEach((ne,de)=>{if(!ne)return;const Me=ne.barcode||ne.code||ne.id||ne.desc||ne.description||`item-${de}`,Ye=String(Me||`item-${de}`),_e=V.get(Ye)||{description:ne.desc||ne.description||ne.name||ne.barcode||`#${h(String(de+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},Ze=Number(ne.qty)||1,Vt=Number(ne.price)||0;_e.totalQuantity+=Ze,_e.reservationIds.add(String(Q));const pt=Vt*Ze*Math.max(1,L);Number.isFinite(pt)&&(_e.totalCost+=pt),V.set(Ye,_e)})});const X=Array.from(V.values()).map(w=>({description:w.description,totalQuantity:w.totalQuantity,reservationsCount:w.reservationIds.size,displayCost:ve(w.totalCost,t)})),z=new Map((i||[]).filter(Boolean).map(w=>[String(w.id),w])),ee=new Map,M=w=>{if(!w)return;let Y=null;typeof w=="object"?Y=w.id??w.technicianId??w.technician_id??w.userId??w.user_id??null:(typeof w=="string"||typeof w=="number")&&(Y=w);const L=Y!=null?String(Y):null,Q=L&&z.has(L)?z.get(L):typeof w=="object"?w:null,ne=Q?.name||Q?.full_name||Q?.fullName||Q?.displayName||(typeof w=="string"?w:null),de=Q?.role||Q?.title||null,Me=Q?.phone||Q?.mobile||Q?.contact||null;if(!ne&&!L)return;const Ye=L||ne;ee.has(Ye)||ee.set(Ye,{id:L,name:ne||"-",role:de||null,phone:Me||null})};Array.isArray(c?.technicians)&&c.technicians.forEach(w=>M(w)),W.forEach(w=>{(Array.isArray(w.crewAssignments)&&w.crewAssignments.length?w.crewAssignments:Array.isArray(w.technicians)?w.technicians.map(L=>({technicianId:L})):[]).forEach(L=>M(L))});const K=Array.from(ee.values()),H=Array.isArray(c.expenses)?c.expenses.map(w=>{const Y=Number(w?.amount)||0;return{label:w?.label||w?.name||"-",amount:Y,displayAmount:ve(Y,t),note:w?.note||w?.description||""}}):[],ae=Pu(c),me=ae.applyTax?Number(((ae.subtotal+D)*co).toFixed(2)):0,oe=Number((ae.subtotal+D+me).toFixed(2)),Ae=_u(c),Pe=Dn(c.paidAmount??c.paid_amount)||0,G=Dn(c.paidPercent??c.paid_percent)||0,ce=ni({totalAmount:oe,paidAmount:Pe,paidPercent:G,history:Ae}),je=typeof c.paymentStatus=="string"?c.paymentStatus.toLowerCase():"",Te=ai({manualStatus:je,paidAmount:ce.paidAmount,paidPercent:ce.paidPercent,totalAmount:oe}),Je={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},Ce=o(`projects.paymentStatus.${Te}`,Je[Te]||Te),Ie=Number(ce.paidAmount||0),xe=Number(ce.paidPercent||0),Ne=Math.max(0,Number((oe-Ie).toFixed(2))),Re={projectSubtotal:ve(ae.subtotal,t),expensesTotal:ve(ae.expensesTotal,t),reservationsTotal:ve(D,t),discountAmount:ve(ae.discountAmount,t),taxAmount:ve(me,t),overallTotal:ve(oe,t),paidAmount:ve(Ie,t),remainingAmount:ve(Ne,t)},rt={status:Te,statusLabel:Ce,paidAmount:Ie,paidPercent:xe,remainingAmount:Ne,paidAmountDisplay:ve(Ie,t),remainingAmountDisplay:ve(Ne,t),paidPercentDisplay:ir(xe)},S=(c.description||"").trim();return{project:c,customer:u,clientInfo:{name:b,company:f||"—",phone:p,email:v},projectInfo:{title:N,code:q,typeLabel:I,startDisplay:O,endDisplay:A,durationLabel:T,statusLabel:C},expenses:H,equipment:X,crew:K,equipmentItems:F,crewAssignments:W.flatMap(w=>xi(w)),totals:ae,totalsDisplay:Re,projectTotals:{combinedTaxAmount:me,overallTotal:oe,reservationsTotal:D,paidAmount:Ie,paidPercent:xe,remainingAmount:Ne,paymentStatus:Te},paymentSummary:rt,notes:S,currencyLabel:t,projectStatus:B,projectStatusLabel:C,projectDurationDays:_,projectDurationLabel:T,paymentHistory:Ae}}function Tu({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:i=[],totalsDisplay:r={},projectTotals:c={},paymentSummary:l={},currencyLabel:d="SR",sections:u,fieldSelections:b={},quoteNumber:f,quoteDate:m,terms:p=ut}){const g=vi(b),v=(S,J)=>qi(g,S,J),$=S=>u?.has?.(S),q=`<div class="quote-placeholder">${E(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,N=(S,J)=>`<div class="info-plain__item">
      <span class="info-plain__label">${E(S)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${E(J)}</span>
    </div>`,I=(S,J,{variant:w="inline"}={})=>w==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${E(S)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${E(J)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${E(S)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${E(J)}</span>
    </span>`,O=(S,J)=>`<div class="payment-row">
      <span class="payment-row__label">${E(S)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${E(J)}</span>
    </div>`,A=[];v("customerInfo","customerName")&&A.push(N(o("projects.details.client","العميل"),t.name||"-")),v("customerInfo","customerCompany")&&A.push(N(o("projects.details.company","شركة العميل"),t.company||"—")),v("customerInfo","customerPhone")&&A.push(N(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),v("customerInfo","customerEmail")&&A.push(N(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const _=$("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${E(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${A.length?`<div class="info-plain">${A.join("")}</div>`:q}
      </section>`:"",T=[];v("projectInfo","projectType")&&T.push(N(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),v("projectInfo","projectTitle")&&T.push(N(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),v("projectInfo","projectCode")&&T.push(N(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),v("projectInfo","projectStart")&&T.push(N(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),v("projectInfo","projectEnd")&&T.push(N(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),v("projectInfo","projectDuration")&&T.push(N(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),v("projectInfo","projectStatus")&&T.push(N(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const B=$("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${E(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${T.length?`<div class="info-plain">${T.join("")}</div>`:q}
      </section>`:"",Z=is.filter(S=>v("projectCrew",S.id)),C=Array.isArray(P?.crewAssignments)?P.crewAssignments:[],R=S=>{const J=S&&S.positionId!=null?`id:${String(S.positionId)}`:(()=>{const L=(S?.positionLabel||S?.position_name||S?.position||"").trim().toLowerCase();return L?`label:${L}`:""})(),w=Number.isFinite(Number(S?.positionClientPrice))?Number(S.positionClientPrice):0,Y=w>0?`|p:${w.toFixed(2)}`:"";return`${J}${Y}`};(()=>{const S=new Map;return C.forEach(J=>{const w=R(J);w&&S.set(w,(S.get(w)||0)+1)}),S})();const W=(()=>{const S=[];if(Z.forEach(Q=>{Q.id==="position"?(S.push({...Q,render:ne=>{const de=ne?.positionLabel??ne?.position_name??ne?.role??o("reservations.crew.positionFallback","منصب بدون اسم");return E(h(String(de)))}}),v("projectCrew","quantity")&&S.push({id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:ne=>E(h(String(Math.max(1,Number(ne?.__count||1)))))})):Q.id==="price"?S.push({...Q,render:ne=>{const de=Number.isFinite(Number(ne?.positionClientPrice))?Number(ne.positionClientPrice):0,Me=Math.max(1,Number(ne?.__count||1)),Ye=Math.max(1,Number(P?.rentalDays||1)),_e=de*Me*Ye;return E(`${Ve(_e)} ${o("reservations.create.summary.currency","SR")}`)}}):Q.id==="unitPrice"?S.push({...Q,render:ne=>{const de=Number.isFinite(Number(ne?.positionClientPrice))?Number(ne.positionClientPrice):0;return E(`${Ve(de)} ${o("reservations.create.summary.currency","SR")}`)}}):S.push(Q)}),v("projectCrew","days")){const Q=Math.max(1,Number(P?.rentalDays||1)),ne=S.findIndex(Me=>Me.id==="price"),de=Math.max(0,ne);S.splice(de,0,{id:"days",labelKey:null,fallback:"الأيام",render:()=>E(h(String(Q)))})}const J=new Map(S.map(Q=>[Q.id,Q])),w=new Set,Y=[],L=Q=>{const ne=J.get(Q);ne&&!w.has(Q)&&(Y.push(ne),w.add(Q))};return L("rowNumber"),L("position"),L("unitPrice"),L("quantity"),L("days"),L("price"),S.forEach(Q=>{w.has(Q.id)||(Y.push(Q),w.add(Q.id))}),Y})(),j=(()=>{const S=new Map;return C.forEach(J=>{const w=R(J);if(!w)return;const Y=S.get(w);Y?Y.__count+=1:S.set(w,{...J,__count:1})}),Array.from(S.values())})(),D=(()=>{try{const S=Math.max(1,Number(P?.rentalDays||1)),J=(j||[]).reduce((w,Y)=>{const L=Number.isFinite(Number(Y?.positionClientPrice))?Number(Y.positionClientPrice):0,Q=Math.max(1,Number(Y?.__count||1));return w+L*Q*S},0);return Ve(J)}catch{return"0.00"}})(),F=$("projectCrew")?W.length?`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${W.map(S=>`<th>${E(S.labelKey?o(S.labelKey,S.fallback):S.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${j.length?j.map((S,J)=>`<tr>${W.map(w=>`<td><div class="quote-cell">${w.render(S,J)}</div></td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(W.length,1)}" class="empty">${E(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
            ${v("projectCrew","crewSubtotal")?`
              <div class="quote-table-subtotal">
                <span class="quote-table-subtotal__pill">
                  <span class="quote-table-subtotal__label">${E(o("reservations.details.labels.crewTotal","إجمالي الفريق"))}</span>
                  <span class="quote-table-subtotal__value">${E(`${D} ${d}`)}</span>
                </span>
              </div>
            `:""}
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${q}
          </section>`:"",V=[];v("financialSummary","reservationsTotal")&&V.push(I(o("projects.details.reservationsTotal","إجمالي الحجوزات"),r.reservationsTotal||ve(0,d))),v("financialSummary","discountAmount")&&V.push(I(o("reservations.details.labels.discount","الخصم"),r.discountAmount||ve(0,d))),v("financialSummary","taxAmount")&&V.push(I(o("projects.details.summary.combinedTax","إجمالي الضريبة"),r.taxAmount||ve(0,d)));const X=[];v("financialSummary","overallTotal")&&X.push(I(o("projects.details.summary.overallTotal","الإجمالي الكلي"),r.overallTotal||ve(0,d),{variant:"final"}));const z=$("financialSummary")?!V.length&&!X.length?`<section class="quote-section quote-section--financial">${q}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${E(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${V.length?`<div class="totals-inline">${V.join("")}</div>`:""}
            ${X.length?`<div class="totals-final">${X.join("")}</div>`:""}
          </div>
        </section>`:"",ee=bo.filter(S=>v("projectExpenses",S.id)),M=$("projectExpenses")?ee.length?`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.expenses","الخدمات الإنتاجية"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${ee.map(S=>`<th>${E(S.labelKey?o(S.labelKey,S.fallback):S.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((S,J)=>`<tr>${ee.map(w=>`<td><div class="quote-cell">${w.render(S,J)}</div></td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(ee.length,1)}" class="empty">${E(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
            ${v("projectExpenses","expensesSubtotal")?`
              <div class="quote-table-subtotal">
                <span class="quote-table-subtotal__pill">
                  <span class="quote-table-subtotal__label">${E(o("projects.details.expensesTotal","إجمالي الخدمات الإنتاجية"))}</span>
                  <span class="quote-table-subtotal__value">${E(r.expensesTotal||ve(0,d))}</span>
                </span>
              </div>
            `:""}
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.expenses","الخدمات الإنتاجية"))}</h3>
            ${q}
          </section>`:"",K=ss.filter(S=>v("projectEquipment",S.id)),H=(()=>{let S=[];if(K.forEach(L=>{L.id==="price"?S.push({...L,render:Q=>{const ne=Number.isFinite(Number(Q?.unitPriceValue))?Number(Q.unitPriceValue):0,de=Number.isFinite(Number(Q?.qty))?Math.max(1,Number(Q.qty)):1,Me=Math.max(1,Number(P?.rentalDays||1)),Ye=ne*de*Me;return E(`${Ve(Ye)} ${o("reservations.create.summary.currency","SR")}`)}}):L.id==="unitPrice"?S.push({...L,render:Q=>{const ne=Number.isFinite(Number(Q?.unitPriceValue))?Number(Q.unitPriceValue):0;return E(`${Ve(ne)} ${o("reservations.create.summary.currency","SR")}`)}}):S.push(L)}),v("projectEquipment","days")){const L=Math.max(1,Number(P?.rentalDays||1)),Q=S.findIndex(de=>de.id==="price"),ne=Math.max(0,Q);S.splice(ne,0,{id:"days",labelKey:null,fallback:"الأيام",render:()=>E(h(String(L)))})}const J=new Map(S.map(L=>[L.id,L])),w=S.filter(L=>!["unitPrice","quantity","days","price"].includes(L.id)),Y=["unitPrice","quantity","days","price"].map(L=>J.get(L)).filter(Boolean);return S=[...w,...Y],S})(),ae=Array.isArray(P?.equipmentItems)?P.equipmentItems:[],me=(()=>{try{const S=Math.max(1,Number(P?.rentalDays||1)),J=(ae||[]).reduce((w,Y)=>{const L=Number.isFinite(Number(Y?.unitPriceValue))?Number(Y.unitPriceValue):0,Q=Number.isFinite(Number(Y?.qty))?Math.max(1,Number(Y.qty)):1;return w+L*Q*S},0);return Ve(J)}catch{return"0.00"}})(),oe=$("projectEquipment")?H.length?`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${H.map(S=>`<th>${E(S.labelKey?o(S.labelKey,S.fallback):S.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${ae.length?ae.map((S,J)=>`<tr>${H.map(w=>`<td><div class="quote-cell">${w.render(S,J)}</div></td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(H.length,1)}" class="empty">${E(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
            ${v("projectEquipment","equipmentSubtotal")?`
              <div class="quote-table-subtotal">
                <span class="quote-table-subtotal__pill">
                  <span class="quote-table-subtotal__label">${E(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"))}</span>
                  <span class="quote-table-subtotal__value">${E(`${me} ${d}`)}</span>
                </span>
              </div>
            `:""}
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${q}
          </section>`:"",Ae=(e?.description||"").trim()||"",Pe=$("projectNotes")?`<section class="quote-section">
        <h3>${E(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${E(Ae||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",G=[];v("payment","beneficiary")&&G.push(O(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Xe.beneficiaryName)),v("payment","bank")&&G.push(O(o("reservations.quote.labels.bank","اسم البنك"),Xe.bankName)),v("payment","account")&&G.push(O(o("reservations.quote.labels.account","رقم الحساب"),h(Xe.accountNumber))),v("payment","iban")&&G.push(O(o("reservations.quote.labels.iban","رقم الآيبان"),h(Xe.iban)));const ce=`<section class="quote-section">
      <div class="payment-block">
        <h3>${E(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${G.length?G.join(""):q}</div>
      </div>
      <p class="quote-approval-note">${E(Xe.approvalNote)}</p>
    </section>`,je=Array.isArray(p)&&p.length?p:ut,Te=`<footer class="quote-footer">
        <h4>${E(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${je.map(S=>`<li>${E(S)}</li>`).join("")}</ul>
      </footer>`,Je=[],Ce=[];if(B&&Ce.push({key:"project",html:B}),_&&Ce.push({key:"customer",html:_}),Ce.length>1){const S=Ce.find(Y=>Y.key==="project"),J=Ce.find(Y=>Y.key==="customer"),w=[];S?.html&&w.push(S.html),J?.html&&w.push(J.html),Je.push(He(`<div class="quote-section-row quote-section-row--primary">${w.join("")}</div>`,{blockType:"group"}))}else Ce.length===1&&Je.push(He(Ce[0].html));const Ie=[];F&&Ie.push(He(F,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),M&&Ie.push(He(M,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),oe&&Ie.push(He(oe,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const xe=[];z&&xe.push(He(z,{blockType:"summary"})),Pe&&xe.push(He(Pe));const Ne=[He(ce,{blockType:"payment"}),He(Te,{blockType:"footer"})],Re=[...Ra(Je,"projects.quote.placeholder.primary"),...Ie,...Ra(xe,"projects.quote.placeholder.summary"),...Ne],rt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${E(Xe.logoUrl)}" alt="${E(Xe.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${E(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${E(Xe.companyName)}</p>
        <p class="quote-company-cr">${E(o("reservations.quote.labels.cr","السجل التجاري"))}: ${E(Xe.commercialRegistry)}</p>
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
        <style>${wo}${So}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${rt}
          ${Re.join("")}
        </div>
      </div>
    </div>
  `}function Oo(e){if(e?.context==="project")return Tu(e);const{reservation:t,customer:n,project:a,crewAssignments:s,totals:i,totalsDisplay:r,rentalDays:c,currencyLabel:l,sections:d,fieldSelections:u={},quoteNumber:b,quoteDate:f,terms:m=ut}=e,p=h(String(t?.reservationId??t?.id??"")),g=t.start?h(bt(t.start)):"-",v=t.end?h(bt(t.end)):"-",$=n?.customerName||n?.full_name||n?.name||"-",q=n?.phone||"-",N=n?.email||"-",I=n?.company||n?.company_name||"-",O=h(q),A=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),_=a?.code||a?.projectCode||"",T=h(String(c)),B=t?.notes||"",Z=Array.isArray(m)&&m.length?m:ut,C=vi(u),R=(k,ue)=>qi(C,k,ue),W=k=>d?.has?.(k),j=`<div class="quote-placeholder">${E(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,D=(k,ue)=>`<div class="info-plain__item">${E(k)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${E(ue)}</strong></div>`,F=(k,ue,{variant:we="inline"}={})=>we==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${E(k)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${E(ue)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${E(k)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${E(ue)}</span>
    </span>`,V=(k,ue)=>`<div class="payment-row">
      <span class="payment-row__label">${E(k)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${E(ue)}</span>
    </div>`,X=[];R("customerInfo","customerName")&&X.push(D(o("reservations.details.labels.customer","العميل"),$)),R("customerInfo","customerCompany")&&X.push(D(o("reservations.details.labels.company","الشركة"),I)),R("customerInfo","customerPhone")&&X.push(D(o("reservations.details.labels.phone","الهاتف"),O)),R("customerInfo","customerEmail")&&X.push(D(o("reservations.details.labels.email","البريد"),N));const z=W("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${E(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${X.length?`<div class="info-plain">${X.join("")}</div>`:j}
      </section>`:"",ee=[];R("reservationInfo","reservationId")&&ee.push(D(o("reservations.details.labels.reservationId","رقم الحجز"),p||"-")),R("reservationInfo","reservationStart")&&ee.push(D(o("reservations.details.labels.start","بداية الحجز"),g)),R("reservationInfo","reservationEnd")&&ee.push(D(o("reservations.details.labels.end","نهاية الحجز"),v)),R("reservationInfo","reservationDuration")&&ee.push(D(o("reservations.details.labels.duration","عدد الأيام"),T));const M=W("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${E(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${ee.length?`<div class="info-plain">${ee.join("")}</div>`:j}
      </section>`:"",K=[];R("projectInfo","projectTitle")&&K.push(D(o("reservations.details.labels.project","المشروع"),A)),R("projectInfo","projectCode")&&K.push(D(o("reservations.details.labels.code","الرمز"),_||"-"));const H=W("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${E(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${K.length?`<div class="info-plain">${K.join("")}</div>`:j}
      </section>`:"",ae=[];ae.push(F(o("reservations.details.labels.subtotalBeforeTax","الإجمالي قبل الضريبة"),`${r.taxableAmount} ${l}`)),R("financialSummary","discountAmount")&&ae.push(F(o("reservations.details.labels.discount","الخصم"),`${r.discountAmount} ${l}`)),R("financialSummary","taxAmount")&&ae.push(F(o("reservations.details.labels.tax","الضريبة"),`${r.taxAmount} ${l}`));const me=R("financialSummary","finalTotal"),oe=[];me&&oe.push(F(o("reservations.details.labels.total","الإجمالي النهائي"),`${r.finalTotal} ${l}`,{variant:"final"}));const Ae=oe.length?`<div class="totals-final">${oe.join("")}</div>`:"",Pe=W("financialSummary")?!ae.length&&!me?`<section class="quote-section quote-section--financial">${j}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${E(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${ae.length?`<div class="totals-inline">${ae.join("")}</div>`:""}
            ${Ae}
          </div>
        </section>`:"",{groups:G}=ii(t),ce=G.map(k=>{const ue=Number(k?.count??k?.quantity??1)||1,we=Number(k?.unitPrice);let Qe=Number.isFinite(we)?we:0;if(!Qe||Qe<=0){const pe=Number(k?.totalPrice);Number.isFinite(pe)&&ue>0&&(Qe=Number((pe/ue).toFixed(2)))}Number.isFinite(Qe)||(Qe=0);const qt=k?.type==="package"||Array.isArray(k?.items)&&k.items.some(pe=>pe?.type==="package"),Ut=Array.isArray(k?.barcodes)&&k.barcodes.length?k.barcodes[0]:Array.isArray(k?.items)&&k.items.length?k.items[0]?.barcode:null;let et=k?.packageDisplayCode??k?.package_code??k?.code??k?.packageCode??(Array.isArray(k?.items)&&k.items.length?k.items[0]?.package_code??k.items[0]?.code??k.items[0]?.packageCode:null);const ke=pe=>{const $e=(pe==null?"":String(pe)).trim();return!!(!$e||/^pkg-/i.test($e)||/^\d+$/.test($e)&&$e.length<=4)};if(!et||ke(et)){const pe=k?.packageId??k?.package_id??(Array.isArray(k?.items)&&k.items.length?k.items[0]?.packageId??k.items[0]?.package_id:null);if(pe)try{const $e=ei(pe);$e&&$e.package_code&&(et=$e.package_code)}catch{}}if(!et||ke(et))try{const pe=Nn(k?.description||"");if(pe){const $e=_r();let ot=$e.find(lt=>Nn(lt?.name||lt?.title||lt?.label||"")===pe);ot||(ot=$e.find(lt=>{const da=Nn(lt?.name||lt?.title||lt?.label||"");return da.includes(pe)||pe.includes(da)})),ot&&ot.package_code&&(et=ot.package_code)}}catch{}const Ue=qt?et??Ut??"":k?.barcode??Ut??"",fe=Ue!=null?String(Ue):"";let be=Number.isFinite(Number(k?.totalPrice))?Number(k.totalPrice):Number((Qe*ue).toFixed(2));return be=Ee(be),{...k,isPackage:qt,desc:k?.description,barcode:fe,packageCodeResolved:et||"",qty:ue,price:be,totalPrice:be,unitPriceValue:Qe}}),je=ss.filter(k=>R("items",k.id)),Te=(()=>{let k=[];je.forEach(ke=>{ke.id==="price"?k.push({...ke,render:Ue=>{const fe=Number.isFinite(Number(Ue?.unitPriceValue))?Number(Ue.unitPriceValue):0,be=Number.isFinite(Number(Ue?.qty))?Math.max(1,Number(Ue.qty)):1,pe=Math.max(1,Number(P?.rentalDays||1)),$e=fe*be*pe;return E(`${Ve($e)} ${o("reservations.create.summary.currency","SR")}`)}}):ke.id==="unitPrice"?k.push({...ke,render:Ue=>{const fe=Number.isFinite(Number(Ue?.unitPriceValue))?Number(Ue.unitPriceValue):0;return E(`${Ve(fe)} ${o("reservations.create.summary.currency","SR")}`)}}):k.push(ke)});const ue=Math.max(1,Number(P?.rentalDays||1)),we=k.findIndex(ke=>ke.id==="price"),Qe=Math.max(0,we);k.splice(Qe,0,{id:"days",labelKey:null,fallback:"الأيام",render:()=>E(h(String(ue)))});const qt=new Map(k.map(ke=>[ke.id,ke])),Ut=k.filter(ke=>!["unitPrice","quantity","days","price"].includes(ke.id)),et=["unitPrice","quantity","days","price"].map(ke=>qt.get(ke)).filter(Boolean);return k=[...Ut,...et],k})(),Je=Te.length>0,Ce=Je?Te.map(k=>`<th>${E(k.labelKey?o(k.labelKey,k.fallback):k.fallback)}</th>`).join(""):"",xe=ce.length>0?ce.map((k,ue)=>`<tr>${Te.map(we=>`<td><div class="quote-cell">${we.render(k,ue)}</div></td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Te.length,1)}" class="empty">${E(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,Ne=W("items")?Je?`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Ce}</tr>
              </thead>
              <tbody>${xe}</tbody>
            </table>
            ${R("items","equipmentSubtotal")?`
              <div class="quote-table-subtotal">
                <span class="quote-table-subtotal__pill">
                  <span class="quote-table-subtotal__label">${E(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"))}</span>
                  <span class="quote-table-subtotal__value">${E(`${r.equipmentTotal} ${l}`)}</span>
                </span>
              </div>
            `:""}
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.items.title","المعدات"))}</h3>
            ${j}
          </section>`:"",Re=is.filter(k=>R("crew",k.id)),rt=R("crew","groupByPosition"),S=Re.length>0,J=Array.isArray(s)?s:[],w=k=>{const ue=k&&k.positionId!=null?`id:${String(k.positionId)}`:(()=>{const qt=(k?.positionLabel||k?.position_name||k?.position||"").trim().toLowerCase();return qt?`label:${qt}`:""})(),we=Number.isFinite(Number(k?.positionClientPrice))?Number(k.positionClientPrice):0,Qe=we>0?`|p:${we.toFixed(2)}`:"";return`${ue}${Qe}`},Y=(()=>{const k=new Map;return J.forEach(ue=>{const we=w(ue);we&&k.set(we,(k.get(we)||0)+1)}),k})(),L=(()=>{let k=[],ue=null;Re.forEach(fe=>{fe.id==="position"?(k.push({...fe,render:be=>{const pe=be?.positionLabel??be?.position_name??be?.role??o("reservations.crew.positionFallback","منصب بدون اسم");if(rt)return E(h(String(pe)));const $e=w(be),ot=$e&&Y.get($e)||0,lt=ot>1?` × ${h(String(ot))}`:"";return E(h(String(pe))+lt)}}),ue={id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:be=>{const pe=Number(be?.__count||1);return E(h(String(Math.max(1,pe))))}}):fe.id==="price"?rt?k.push({...fe,render:be=>{const pe=Number.isFinite(Number(be?.positionClientPrice))?Number(be.positionClientPrice):0,$e=Math.max(1,Number(be?.__count||1)),ot=Math.max(1,Number(P?.rentalDays||1)),lt=pe*$e*ot;return E(`${Ve(lt)} ${o("reservations.create.summary.currency","SR")}`)}}):k.push({...fe,render:be=>{const pe=Number.isFinite(Number(be?.positionClientPrice))?Number(be.positionClientPrice):0,$e=Math.max(1,Number(P?.rentalDays||1)),ot=pe*$e;return E(`${Ve(ot)} ${o("reservations.create.summary.currency","SR")}`)}}):fe.id==="unitPrice"?k.push({...fe,render:be=>{const pe=Number.isFinite(Number(be?.positionClientPrice))?Number(be.positionClientPrice):0;return E(`${Ve(pe)} ${o("reservations.create.summary.currency","SR")}`)}}):k.push(fe)}),ue&&k.push(ue);const we=Math.max(1,Number(P?.rentalDays||1)),Qe=k.findIndex(fe=>fe.id==="price"),qt=Math.max(0,Qe);k.splice(qt,0,{id:"days",labelKey:null,fallback:"الأيام",render:()=>E(h(String(we)))});const Ut=new Map(k.map(fe=>[fe.id,fe])),et=new Set,ke=[],Ue=fe=>{const be=Ut.get(fe);be&&!et.has(fe)&&(ke.push(be),et.add(fe))};return Ue("rowNumber"),Ue("position"),Ue("unitPrice"),Ue("quantity"),Ue("days"),Ue("price"),k.forEach(fe=>{et.has(fe.id)||(ke.push(fe),et.add(fe.id))}),k=ke,k})(),Q=S?L.map(k=>`<th>${E(k.labelKey?o(k.labelKey,k.fallback):k.fallback)}</th>`).join(""):"",ne=rt?(()=>{const k=new Map;return J.forEach(ue=>{const we=w(ue);if(!we)return;const Qe=k.get(we);Qe?Qe.__count+=1:k.set(we,{...ue,__count:1})}),Array.from(k.values())})():J,de=ne.length?ne.map((k,ue)=>`<tr>${L.map(we=>`<td><div class="quote-cell">${we.render(k,ue)}</div></td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(L.length,1)}" class="empty">${E(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,Me=W("crew")?S?`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Q}</tr>
              </thead>
              <tbody>${de}</tbody>
            </table>
            ${R("crew","crewSubtotal")?`
              <div class="quote-table-subtotal">
                <span class="quote-table-subtotal__pill">
                  <span class="quote-table-subtotal__label">${E(o("reservations.details.labels.crewTotal","إجمالي الفريق"))}</span>
                  <span class="quote-table-subtotal__value">${E(`${r.crewTotal} ${l}`)}</span>
                </span>
              </div>
            `:""}
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${j}
          </section>`:"",Ye=W("notes")?`<section class="quote-section">
        <h3>${E(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${E(B||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",_e=[];R("payment","beneficiary")&&_e.push(V(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Xe.beneficiaryName)),R("payment","bank")&&_e.push(V(o("reservations.quote.labels.bank","اسم البنك"),Xe.bankName)),R("payment","account")&&_e.push(V(o("reservations.quote.labels.account","رقم الحساب"),h(Xe.accountNumber))),R("payment","iban")&&_e.push(V(o("reservations.quote.labels.iban","رقم الآيبان"),h(Xe.iban)));const Ze=`<section class="quote-section">
      <div class="payment-block">
        <h3>${E(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${_e.length?_e.join(""):j}</div>
      </div>
      <p class="quote-approval-note">${E(Xe.approvalNote)}</p>
    </section>`,Vt=`<footer class="quote-footer">
        <h4>${E(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${Z.map(k=>`<li>${E(k)}</li>`).join("")}</ul>
      </footer>`,pt=[];z&&M?pt.push(He(`<div class="quote-section-row">${z}${M}</div>`,{blockType:"group"})):(M&&pt.push(He(M)),z&&pt.push(He(z))),H&&pt.push(He(H));const cn=[];Ne&&cn.push(He(Ne,{blockType:"table",extraAttributes:'data-table-id="items"'})),Me&&cn.push(He(Me,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const Le=[];Pe&&Le.push(He(Pe,{blockType:"summary"})),Ye&&Le.push(He(Ye));const at=[He(Ze,{blockType:"payment"}),He(Vt,{blockType:"footer"})],Tt=[...Ra(pt,"reservations.quote.placeholder.page1"),...cn,...Ra(Le,"reservations.quote.placeholder.page2"),...at],vt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${E(Xe.logoUrl)}" alt="${E(Xe.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${E(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${E(Xe.companyName)}</p>
        <p class="quote-company-cr">${E(o("reservations.quote.labels.cr","السجل التجاري"))}: ${E(Xe.commercialRegistry)}</p>
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
      <style>${wo}${So}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${vt}
          ${Tt.join("")}
        </div>
      </div>
    </div>
  `}async function Ho(){try{const e=ye();if((Array.isArray(e?.packages)?e.packages:[]).length>0)return;const n=await _t("/packages/?all=1"),a=Array.isArray(n?.data)?n.data:Array.isArray(n)?n:[];a.length&&(Ua({packages:a}),document.dispatchEvent?.(new CustomEvent("packages:changed",{detail:{packages:a}})))}catch{}}function Bu(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{i(),t()},s=()=>{i(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},i=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function na(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),i=a.map(c=>Bu(c)),r=[s,...i].map(c=>c.catch(l=>(zt("asset load failed",l),Jd(),null)));await Promise.all(r),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function Ma(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),i=e.querySelector("[data-quote-source]"),r=i?.querySelector("[data-quote-header-template]");if(!s||!i||!r)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await jo(i),await na(i),s.innerHTML="";const c=Array.from(i.querySelectorAll(":scope > [data-quote-block]"));let l=null,d=null;const u=A=>{A.style.margin="0 auto",A.style.breakInside="avoid",A.style.pageBreakInside="avoid",A.style.pageBreakAfter="auto",A.style.breakAfter="auto"},b=()=>{const A=a.createElement("div"),_=s.childElementCount===0;if(A.className="quote-page",A.dataset.pageIndex=String(s.childElementCount),_){A.classList.add("quote-page--primary");const B=r.cloneNode(!0);B.removeAttribute("data-quote-header-template"),A.appendChild(B)}else A.classList.add("quote-page--continuation");const T=a.createElement("main");T.className="quote-body",A.appendChild(T),s.appendChild(A),u(A),l=A,d=T},f=()=>{(!l||!d||!d.isConnected)&&b()},m=()=>{if(!l||!d||d.childElementCount>0)return;const A=l;l=null,d=null,A.parentNode&&A.parentNode.removeChild(A)},p=()=>{l=null,d=null},g=()=>l?l.scrollHeight-l.clientHeight>ko:!1,v=(A,{allowOverflow:_=!1}={})=>(f(),d.appendChild(A),g()&&!_?(d.removeChild(A),m(),!1):!0),$=A=>{const _=A.cloneNode(!0);_.removeAttribute?.("data-quote-block"),_.removeAttribute?.("data-block-type"),_.removeAttribute?.("data-table-id"),!v(_)&&(p(),!v(_)&&v(_,{allowOverflow:!0}))},q=A=>{const _=A.querySelector("table");if(!_){$(A);return}const T=A.querySelector("h3"),B=_.querySelector("thead"),Z=Array.from(_.querySelectorAll("tbody tr"));if(!Z.length){$(A);return}let C=null,R=0;const W=(D=!1)=>{const F=A.cloneNode(!1);F.removeAttribute("data-quote-block"),F.removeAttribute("data-block-type"),F.removeAttribute("data-table-id"),F.classList.add("quote-section--table-fragment"),D&&F.classList.add("quote-section--table-fragment--continued");const V=T?T.cloneNode(!0):null;V&&F.appendChild(V);const X=_.cloneNode(!1);X.classList.add("quote-table--fragment"),B&&X.appendChild(B.cloneNode(!0));const z=a.createElement("tbody");return X.appendChild(z),F.appendChild(X),{section:F,body:z}},j=(D=!1)=>C||(C=W(D),v(C.section)||(p(),v(C.section)||v(C.section,{allowOverflow:!0})),C);Z.forEach(D=>{j(R>0);const F=D.cloneNode(!0);if(C.body.appendChild(F),g()&&(C.body.removeChild(F),C.body.childElementCount||(d.removeChild(C.section),C=null,m()),p(),C=null,j(R>0),C.body.appendChild(F),g())){C.section.classList.add("quote-section--table-fragment--overflow"),R+=1;return}R+=1}),C=null;try{const D=A.querySelector(":scope > .quote-table-subtotal");D&&$(D)}catch{}};if(!c.length)return;c.forEach(A=>{A.getAttribute("data-block-type")==="table"?q(A):$(A)});const N=Array.from(s.children),I=[];if(N.forEach((A,_)=>{const T=A.querySelector(".quote-body");if(_!==0&&(!T||T.childElementCount===0)){A.remove();return}I.push(A)}),!n){const A=a.defaultView||window,_=Math.min(3,Math.max(1,A.devicePixelRatio||1)),T=ls()?Math.min(2,_):_;I.forEach(B=>mu(B,{pixelRatio:T}))}I.forEach((A,_)=>{const T=_===0;A.style.pageBreakAfter="auto",A.style.breakAfter="auto",A.style.pageBreakBefore=T?"auto":"always",A.style.breakBefore=T?"auto":"page",n?A.style.boxShadow="":A.style.boxShadow="none"});const O=I[I.length-1]||null;l=O,d=O?.querySelector(".quote-body")||null,await na(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function Vo(e=0){return e<=0?new Promise(t=>requestAnimationFrame(()=>t())):new Promise(t=>setTimeout(t,e))}function Uo(e){return e?Array.from(e.querySelectorAll(".quote-page")).some(n=>n.scrollHeight-n.clientHeight>ko):!1}function _i(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function Du(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[i,r]=await Promise.all([yu(),fu()]),c=e.ownerDocument||document,l=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,l,c?.documentElement?.getAttribute?.("dir")].some(A=>typeof A=="string"&&A.toLowerCase().startsWith("rtl")),b=typeof window<"u"&&window.devicePixelRatio||1,f=Ei(),m=Po(),p=ls();let g;p?g=1.5:m?g=Math.min(1.7,Math.max(1.2,b*1.1)):f?g=Math.min(1.8,Math.max(1.25,b*1.2)):g=Math.min(2,Math.max(1.6,b*1.4));const v=p||m?.9:f?.92:.95,$=new i({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),q={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let N=0;const I=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let A=0;A<s.length;A+=1){const _=s[A];await jo(_),await na(_);const T=_.ownerDocument||document,B=T.createElement("div");Object.assign(B.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const Z=_.cloneNode(!0);Z.style.width=`${qa}px`,Z.style.maxWidth=`${qa}px`,Z.style.minWidth=`${qa}px`,Z.style.height=`${Sa}px`,Z.style.maxHeight=`${Sa}px`,Z.style.minHeight=`${Sa}px`,Z.style.position="relative",Z.style.background="#ffffff",_i(Z),B.appendChild(Z),T.body.appendChild(B);let C;try{await na(Z),C=await r(Z,{...q,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(z){throw Us(z,"pageCapture",{toastMessage:I}),z}finally{B.parentNode?.removeChild(B)}if(!C)continue;const R=C.width||1,j=(C.height||1)/R;let D=Os,F=D*j,V=0;if(F>va){const z=va/F;F=va,D=D*z,V=Math.max(0,(Os-D)/2)}const X=C.toDataURL("image/jpeg",v);N>0&&$.addPage(),$.addImage(X,"JPEG",V,0,D,F,`page-${N+1}`,"FAST"),N+=1,await new Promise(z=>window.requestAnimationFrame(z))}}catch(A){throw Ks({safariWindowRef:n,mobileWindowRef:a}),A}if(N===0)throw Ks({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(m||p){const A=$.output("blob");if(p){const _=URL.createObjectURL(A);Jn();try{window.location.assign(_)}catch(T){zt("mobile safari blob navigation failed",T)}finally{setTimeout(()=>URL.revokeObjectURL(_),6e4)}}else{const _=URL.createObjectURL(A),T=()=>m&&n&&!n.closed?n:a&&!a.closed?a:null,B=(C,R)=>{if(Jn(),!C){window.location.assign(R);return}try{C.location.replace(R),C.focus?.()}catch(W){zt("direct blob navigation failed",W);try{C.document.open(),C.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${E(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${R}" title="PDF preview"></iframe></body></html>`),C.document.close()}catch(j){zt("iframe blob delivery failed",j),window.location.assign(R)}}},Z=T();B(Z,_),setTimeout(()=>URL.revokeObjectURL(_),6e4)}}else{Jn();const A=$.output("bloburl"),_=document.createElement("a");_.href=A,_.download=t,_.rel="noopener",_.style.display="none",document.body.appendChild(_),_.click(),setTimeout(()=>{URL.revokeObjectURL(A),_.remove()},2e3)}}function an(){if(!P||!te)return;const{previewFrame:e}=te;if(!e)return;const t=P.context||"reservation",n=Oo({context:t,reservation:P.reservation,customer:P.customer,project:P.project,crewAssignments:P.crewAssignments,totals:P.totals,totalsDisplay:P.totalsDisplay,rentalDays:P.rentalDays,currencyLabel:P.currencyLabel,sections:P.sections,fieldSelections:P.fields,quoteNumber:P.quoteNumber,quoteDate:P.quoteDateLabel,terms:P.terms,projectCrew:P.projectCrew,projectExpenses:P.projectExpenses,projectEquipment:P.projectEquipment,projectInfo:P.projectInfo,clientInfo:P.clientInfo,paymentSummary:P.paymentSummary,projectTotals:P.projectTotals});yn("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,i=a?.documentElement||a;i&&(mo(i),uo(i,s),po(i,s));const r=a?.getElementById("quotation-pdf-root");try{r&&(await Ma(r,{context:"preview"}),await Vo(120),Uo(r)&&await Ma(r,{context:"preview"}),_i(r))}catch(m){console.error("[reservations/pdf] failed to layout preview document",m)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),l=a?.querySelector(".quote-preview-pages"),d=qa;let u=18;if(l&&a?.defaultView){const m=a.defaultView.getComputedStyle(l),p=parseFloat(m.rowGap||m.gap||`${u}`);Number.isFinite(p)&&p>=0&&(u=p)}const b=Sa,f=c.length?c.length*b+Math.max(0,(c.length-1)*u):b;if(e.dataset.baseWidth=String(d),e.dataset.baseHeight=String(f),e.style.width=`${d}px`,e.style.minWidth=`${d}px`,e.style.height=`${f}px`,e.style.minHeight=`${f}px`,te?.previewFrameWrapper&&!te?.userAdjustedZoom){const m=te.previewFrameWrapper.clientWidth-24;m>0&&m<d?Pt=Math.max(m/d,.3):Pt=1}Qo(Pt)}finally{Jn()}},{once:!0})}function Fu(e){if(!P)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?P.sections.add(n):P.sections.delete(n),Do(P),Ko(),an())}function Ru(e){if(!P)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=P.context||"reservation",i=P.fields||(P.fields=cs(s)),r=Yd(i,n);t.checked?r.add(a):r.delete(a),Do(P),an()}function Mu(e){if(!P)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(wi(P,n),P.sectionExpansions[n]=t.open)}function Ko(){if(!te?.toggles||!P)return;const{toggles:e}=te,t=P.fields||{},n=P.context||"reservation";wi(P);const a=os(n),s=go(n),i=a.map(({id:r,labelKey:c,fallback:l})=>{const d=o(c,l),u=P.sections.has(r),b=s[r]||[],f=Zd(P,r),m=b.length?`<div class="quote-toggle-sublist">
          ${b.map(p=>{const g=qi(t,r,p.id),v=u?"":"disabled",$=p.labelKey?o(p.labelKey,p.fallback):p.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${r}" data-field-id="${p.id}" ${g?"checked":""} ${v}>
                <span>${E($)}</span>
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
    `}).join("");e.innerHTML=i,e.querySelectorAll("input[data-section-toggle]").forEach(r=>{r.addEventListener("change",Fu)}),e.querySelectorAll("input[data-field-toggle]").forEach(r=>{r.addEventListener("change",Ru)}),e.querySelectorAll("details[data-section-group]").forEach(r=>{r.addEventListener("toggle",Mu)})}function zu(){if(te?.modal)return te;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
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
    <span data-quote-status-text>${E(qo("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(f),r?.addEventListener("click",async()=>{if(P){r.disabled=!0;try{await Wo()}finally{r.disabled=!1}}});const v=()=>{Hs()||Vs(e)};d.forEach(I=>{I?.addEventListener("click",v)}),l&&!d.includes(l)&&l.addEventListener("click",v),e.addEventListener("click",I=>{Hs()||I.target===e&&Vs(e)}),te={modal:e,toggles:t,preview:n,previewScroll:p,previewFrameWrapper:m,zoomControls:f,zoomValue:f.querySelector("[data-zoom-value]"),previewFrame:b,meta:a,downloadBtn:r,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:i,statusKind:null,userAdjustedZoom:!1};const $=f.querySelector("[data-zoom-out]"),q=f.querySelector("[data-zoom-in]"),N=f.querySelector("[data-zoom-reset]");return $?.addEventListener("click",()=>or(-.1)),q?.addEventListener("click",()=>or(.1)),N?.addEventListener("click",()=>za(1,{markManual:!0})),s&&s.addEventListener("input",Ou),i&&i.addEventListener("click",Hu),za(Pt),te}function za(e,{silent:t=!1,markManual:n=!1}={}){Pt=Math.min(Math.max(e,.25),2.2),n&&te&&(te.userAdjustedZoom=!0),Qo(Pt),!t&&te?.zoomValue&&(te.zoomValue.textContent=`${Math.round(Pt*100)}%`)}function or(e){za(Pt+e,{markManual:!0})}function Qo(e){if(!te?.previewFrame||!te.previewFrameWrapper)return;const t=te.previewFrame,n=te.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",Ei()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function Go(){if(!te?.meta||!P)return;const{meta:e}=te;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${E(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${E(P.quoteNumber)}</strong></div>
      <div><span>${E(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${E(P.quoteDateLabel)}</strong></div>
    </div>
  `}function Ii(){if(!te?.termsInput)return;const e=(P?.terms&&P.terms.length?P.terms:ut).join(`
`);te.termsInput.value!==e&&(te.termsInput.value=e)}function Ou(e){if(!P)return;const t=Rs(e?.target?.value??"");if(t.length){P.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{P.terms=[...ut],Ii();const n=ut.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}an()}function Hu(e){if(e?.preventDefault?.(),!P)return;P.terms=[...ut];const t=document.getElementById("reservation-terms");t&&(t.value=ut.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=ut.join(`
`)),Ii(),an()}async function Wo(){if(!P)return;yn("export");const t=!Ei()&&Po(),n=ls(),a=null,s=!n&&t?window.open("","_blank"):null;(l=>{if(l)try{l.document.open(),l.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${E(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${E(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${E(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),l.document.close()}catch(d){zt("failed to prime download window",d)}})(s);let r=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await bu(),Es("html2pdf ensured");const l=P.context||"reservation",d=Oo({context:l,reservation:P.reservation,customer:P.customer,project:P.project,crewAssignments:P.crewAssignments,totals:P.totals,totalsDisplay:P.totalsDisplay,rentalDays:P.rentalDays,currencyLabel:P.currencyLabel,sections:P.sections,fieldSelections:P.fields,quoteNumber:P.quoteNumber,quoteDate:P.quoteDateLabel,terms:P.terms,projectCrew:P.projectCrew,projectExpenses:P.projectExpenses,projectEquipment:P.projectEquipment,projectInfo:P.projectInfo,clientInfo:P.clientInfo,paymentSummary:P.paymentSummary,projectTotals:P.projectTotals});r=document.createElement("div"),r.innerHTML=d,Object.assign(r.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(r),mo(r),uo(r),po(r),Es("export container prepared");const u=r.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await Ma(u,{context:"export"}),await Vo(120),Uo(u)&&await Ma(u,{context:"export"}),await na(u),_i(u),Es("layout complete for export document")}catch(f){Us(f,"layoutQuoteDocument",{suppressToast:!0})}}const b=`quotation-${P.quoteNumber}.pdf`;await Du(u,{filename:b,safariWindowRef:s,mobileWindowRef:a}),P.sequenceCommitted||(qu(P.quoteSequence),P.sequenceCommitted=!0)}catch(l){Ks({container:r,safariWindowRef:s,mobileWindowRef:a}),r=null,Us(l,"exportQuoteAsPdf",{toastMessage:c})}finally{r&&r.parentNode&&r.parentNode.removeChild(r),Jn()}}function Xo(){const e=zu();e?.modal&&(Xn=!1,Pt=1,te&&(te.userAdjustedZoom=!1),za(Pt,{silent:!0}),Ko(),Go(),Ii(),an(),Xd(e.modal))}async function Vu({reservation:e,customer:t,project:n}){if(!e){x(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}await Ho();const a=xi(e),{totalsDisplay:s,totals:i,rentalDays:r}=Mo(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:l,quoteNumber:d}=To("reservation"),u=new Date,b=Rd();P={context:"reservation",reservation:e,customer:t,project:n,crewAssignments:a,totals:i,totalsDisplay:s,rentalDays:r,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(os("reservation").filter(f=>f.defaultSelected).map(f=>f.id)),sectionExpansions:Si("reservation"),fields:cs("reservation"),terms:b,quoteSequence:l,quoteNumber:d,quoteDate:u,quoteDateLabel:Ro(u),sequenceCommitted:!1},Fo(P),Xo();try{_o()}catch{}}async function Gp({project:e}){if(!e){x(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}await Ho();let t=rr(e);const{project:n}=t;if(!n){x(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}try{(!Array.isArray(t.equipmentItems)||t.equipmentItems.length===0)&&n?.id!=null&&(await ri({project_id:n.id}),t=rr(n))}catch(c){console.warn("[reservationPdf] refreshReservationsForProject failed, proceeding with snapshot/state",c)}const{sequence:a,quoteNumber:s}=To("project"),i=new Date,r=[...Fd];P={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,equipmentItems:t.equipmentItems||[],crewAssignments:t.crewAssignments||[],totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(os("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:Si("project"),fields:cs("project"),terms:r,quoteSequence:a,quoteNumber:s,quoteDate:i,quoteDateLabel:Ro(i),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},Fo(P),Xo();try{_o()}catch{}}function Uu({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=gn(),{reservations:i=[],customers:r=[],technicians:c=[],projects:l=[]}=ye(),d=i.map(q=>{const N=_s(q);return{...N,id:q.id??N.id,reservationId:q.reservationId??q.reservation_id??N.reservationId,reservationCode:q.reservationCode??q.reservation_code??N.reservationCode}}),u=d,b=Array.isArray(s)?s:c||[],f=new Map((l||[]).map(q=>[String(q.id),q])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!u||u.length===0){m.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const p=t||Sd(),g=new Map(r.map(q=>[String(q.id),q])),v=new Map(b.map(q=>[String(q.id),q])),$=xd({reservations:d,filters:p,customersMap:g,techniciansMap:v,projectsMap:f});if($.length===0){m.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${_d({entries:$,customersMap:g,techniciansMap:v,projectsMap:f})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(q=>{const N=Number(q.dataset.reservationIndex);Number.isNaN(N)||q.addEventListener("click",()=>{typeof n=="function"&&n(N)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(q=>{const N=Number(q.dataset.reservationIndex);Number.isNaN(N)||q.addEventListener("click",I=>{I.stopPropagation(),typeof a=="function"&&a(N,I)})})}function Ku(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:i=[],projects:r=[]}=ye(),c=s.map(g=>{const v=_s(g);return{...v,id:g.id??v.id,reservationId:g.reservationId??g.reservation_id??v.reservationId,reservationCode:g.reservationCode??g.reservation_code??v.reservationCode}}),l=s[e];if(!l)return x(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=c[e]??_s(l),u=i.find(g=>String(g.id)===String(l.customerId)),b=l.projectId?r.find(g=>String(g.id)===String(l.projectId)):null,f=document.getElementById("reservation-details-body"),m=document.getElementById("reservationDetailsModal"),p=()=>{const g=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},v=document.getElementById("reservation-details-edit-btn");v&&(v.onclick=()=>{g(),typeof t=="function"&&t(e,{reservation:l,customer:u,getEditContext:a})});const $=document.getElementById("reservation-details-delete-btn");$&&($.onclick=()=>{g(),typeof n=="function"&&n(e,{reservation:l,customer:u})});const q=f?.querySelector('[data-action="open-project"]');q&&b&&q.addEventListener("click",()=>{g();const I=b?.id!=null?String(b.id):"",O=I?`projects.html?project=${encodeURIComponent(I)}`:"projects.html";window.location.href=O});const N=document.getElementById("reservation-details-export-btn");N&&(N.onclick=async I=>{I?.preventDefault?.(),I?.stopPropagation?.(),N.blur();try{await Vu({reservation:l,customer:u,project:b})}catch(O){console.error("❌ [reservations] export to PDF failed",O),x(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}});try{const I=f?.querySelector("[data-tech-slider]");if(I){const O=I.querySelector("[data-slider-track]"),A=I.querySelector("[data-slider-prev]"),_=I.querySelector("[data-slider-next]");if(O&&(A||_)){const T=document.documentElement.getAttribute("dir")==="rtl"||document.body.getAttribute("dir")==="rtl",B=()=>{const R=O.querySelector(".reservation-technician-card"),W=R&&R.getBoundingClientRect().width||220,j=12,D=Math.max(1,Math.floor(O.clientWidth/(W+j)));return Math.max(W+j,Math.floor(D*(W+j)*.9))},Z=()=>{const R=Math.max(0,O.scrollWidth-O.clientWidth-2),W=O.scrollLeft<=1,j=O.scrollLeft>=R;A&&(A.disabled=W),_&&(_.disabled=j)},C=R=>{const W=B()*R,j=T?-W:W;O.scrollBy({left:j,behavior:"smooth"})};A?.addEventListener("click",()=>C(-1)),_?.addEventListener("click",()=>C(1)),O.addEventListener("scroll",Z,{passive:!0}),window.addEventListener("resize",Z,{passive:!0}),setTimeout(Z,0)}}}catch{}};if(f){const g=gn()||[];f.innerHTML=Yi(d,u,g,e,b),p(),Ir().then(()=>{const v=gn()||[];f.innerHTML=Yi(d,u,v,e,b),p()}).catch(()=>{})}return m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}function Jo(){const e=()=>{zn(),it(),gn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let cr=!1,lr=null;function Qu(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function Wp(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=Qu(n);if(!a&&cr&&Ft().length>0&&s===lr)return Ft();try{const i=await ri(n||{});return cr=!0,lr=s,i}catch(i){if(console.error("❌ [reservationsActions] Failed to load reservations from API",i),!t)throw i;return Ft()}}async function Gu(e,{onAfterChange:t}={}){if(!wn())return sa(),!1;const a=Ft()[e];if(!a)return x(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return x(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await sl(s),Jo(),t?.({type:"deleted",reservation:a}),x(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(i){console.error("❌ [reservationsActions] deleteReservation failed",i);const r=Ga(i)?i.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return x(r,"error"),!1}}async function Wu(e,{onAfterChange:t}={}){const a=Ft()[e];if(!a)return x(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return x(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:i}=nn(a);if(i)return x(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const r=await il(s);return Jo(),t?.({type:"confirmed",reservation:r}),x(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(r){console.error("❌ [reservationsActions] confirmReservation failed",r);const c=Ga(r)?r.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return x(c,"error"),!1}}function Hn(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:ea(e,n),end:ea(t,a)}}function Oa(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ki(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function Yo(){const{container:e,select:t,hint:n,addButton:a}=ki();if(!t)return;const s=t.value,i=gr(),r=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,l=i.map(u=>{const b=Number.isFinite(Number(u.price))?Number(u.price):0,f=h(b.toFixed(2)),m=`${u.name} — ${f} ${r}`;return`<option value="${Oa(u.id)}">${Oa(m)}</option>`}).join("");t.innerHTML=`${c}${l}`;const d=i.length>0;t.disabled=!d,a&&(a.disabled=!d),e&&(e.hidden=!d,e.setAttribute("aria-hidden",d?"false":"true")),n&&(d?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),d&&s&&i.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function Xu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||x(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=rn(),{start:i,end:r}=Hn(),{reservations:c=[]}=ye(),l=a!=null&&c[a]||null,d=l?.id??l?.reservationId??null,u=no(n,{existingItems:s,start:i,end:r,ignoreReservationId:d});if(!u.success)return t||x(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const b=[...s,u.package];return on(a,b),sn(b),ht(),t||x(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function dr(){const{select:e}=ki();if(!e)return;const t=e.value||"";Xu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function Ju(){const{addButton:e,select:t}=ki();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{dr()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),dr())}),t.dataset.listenerAttached="true"),Yo()}function sn(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),r=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,pr(t);return}const l=Fn(e);t.innerHTML=l.map(d=>{const u=d.items[0]||{},b=An(u)||d.image,f=b?`<img src="${b}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=d.items.some(C=>C?.type==="package"),p=h(String(d.count)),g=Ge(d.unitPrice),v=Number.isFinite(g)?Ee(g):0,$=Ge(d.totalPrice),q=Number.isFinite($)?$:v*(Number.isFinite(d.count)?d.count:1),N=Ee(q),I=`${h(v.toFixed(2))} ${a}`,O=`${h(N.toFixed(2))} ${a}`,A=d.barcodes.map(C=>h(String(C||""))).filter(Boolean),_=A.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${A.map(C=>`<li>${C}</li>`).join("")}
            </ul>
          </details>`:"";let T="";if(m){const C=new Map,R=j=>{const D=Number.parseFloat(h(String(j??"")).replace(/[^0-9.]/g,""));return!Number.isFinite(D)||D<=0||D>99?1:Math.round(D)},W=[];if(Array.isArray(d.packageItems)&&d.packageItems.length&&W.push(...d.packageItems),d.items.forEach(j=>{Array.isArray(j?.packageItems)&&W.push(...j.packageItems)}),W.forEach(j=>{if(!j)return;const D=re(j.barcode||j.normalizedBarcode||j.desc||Math.random());if(!D)return;const F=C.get(D),V=R(j.qtyPerPackage??j.perPackageQty??j.quantityPerPackage??j.qty??j.quantity??1),X=Math.max(1,Math.min(V,99));if(F){F.qty=X;return}C.set(D,{desc:j.desc||j.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:X,barcode:j.barcode??j.normalizedBarcode??""})}),C.size){const j=Array.from(C.values()).map(D=>{const F=h(String(D.qty>0?Math.min(D.qty,99):1)),V=Oa(D.desc||""),X=D.barcode?` <span class="reservation-package-items__barcode">(${Oa(h(String(D.barcode)))})</span>`:"";return`<li>${V}${X} × ${F}</li>`}).join("");T=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${j}
              </ul>
            </details>
          `}}const B=m?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",Z=m?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${d.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${d.description||"-"}</div>
                ${m?`${T||""}${_||""}`:_}
              </div>
            </div>
          </td>
          <td>
            <div class="${B}" data-group-key="${d.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${d.key}" aria-label="${r}"${Z}>−</button>
              <span class="reservation-qty-value">${p}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${d.key}" aria-label="${i}"${Z}>+</button>
            </div>
          </td>
          <td>${I}</td>
          <td>${O}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),pr(t)}function Yu(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function ds(){const e=document.getElementById("edit-res-payment-history");if(!e)return;let t=us();const n=document.getElementById("edit-res-project")?.value||"";if(n)try{const r=(ye()?.projects||[]).find(l=>String(l.id)===String(n)),c=Array.isArray(r?.paymentHistory)?r.paymentHistory:Array.isArray(r?.payment_history)?r.payment_history:Array.isArray(r?.payments)?r.payments:Array.isArray(r?.paymentLogs)?r.paymentLogs:[];Array.isArray(c)&&c.length&&(t=c)}catch{}if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة")}</div>`,ur();return}const a=o("reservations.create.summary.currency","SR"),s=t.map((i,r)=>{const c=Number.isFinite(Number(i?.amount))&&Number(i.amount)>0?`${h(Number(i.amount).toFixed(2))} ${a}`:"—",l=Number.isFinite(Number(i?.percentage))&&Number(i.percentage)>0?`${h(Number(i.percentage).toFixed(2))}%`:"—",d=i?.recordedAt?h(bt(i.recordedAt)):"—",u=Yu(i?.type),b=i?.note?h(i.note):"";return`
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
  `,ur()}function Zu(){if(aa()){x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=tc(e);let a=nc(t);if(!Number.isFinite(a)||a<=0){x(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=Is.lastResult,i=Number(s?.total)||0,r=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,l=o("reservations.create.summary.currency","SR");let d=null,u=null;if(n==="percent"){const f=Math.max(0,100-r);if(f<=1e-4){x(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const p=h(m.toFixed(2));x(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",p)),a=m}u=Number(a.toFixed(2)),i>0&&(d=a/100*i)}else{const f=Math.max(0,i-c);if(f<=1e-4){x(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const p=`${h(m.toFixed(2))} ${l}`;x(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",p)),a=m}d=Number(a.toFixed(2)),i>0&&(u=d/i*100)}d!=null&&(d=Number(d.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const b={type:n,value:a,amount:d,percentage:u,recordedAt:new Date().toISOString()};up(b),$i(us()),ds(),ht(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),x(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function ur(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(aa()){n.preventDefault(),x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Zu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(aa()){n.preventDefault(),x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(pp(s),$i(us()),ds(),ht(),x(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function ep(e){const{index:t,items:n}=rn(),s=Fn(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const i=s.itemIndices[s.itemIndices.length-1];if(i==null)return;const r=n.filter((c,l)=>l!==i);on(t,r),sn(r),ht()}function tp(e){const{index:t,items:n}=rn(),a=n.filter(s=>Qa(s)!==e);a.length!==n.length&&(on(t,a),sn(a),ht())}function np(e){const{index:t,items:n}=rn(),s=Fn(n).find(v=>v.key===e);if(!s||s.items.some(v=>v?.type==="package"))return;const{start:i,end:r}=Hn();if(!i||!r){x(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=ye(),l=t!=null&&c[t]||null,d=l?.id??l?.reservationId??null,u=new Set(n.map(v=>re(v.barcode))),{equipment:b=[]}=ye(),f=(b||[]).find(v=>{const $=re(v?.barcode);return!$||u.has($)||Qa({desc:v?.desc||v?.description||v?.name||"",price:Number(v?.price)||0})!==e||!Lr(v)?!1:!Nt($,i,r,d)});if(!f){x(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const m=re(f.barcode),p=En(f);if(!p){x(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:p,equipmentId:p,barcode:m,desc:f.desc||f.description||f.name||s.description||"",qty:1,price:Number.isFinite(Number(f.price))?Number(f.price):s.unitPrice,image:An(f)}];on(t,g),sn(g),ht()}function pr(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:i}=n.dataset;if(a==="decrease-edit-group"&&s){ep(s);return}if(a==="increase-edit-group"&&s){np(s);return}if(a==="remove-edit-group"&&s){tp(s);return}if(a==="remove-edit-item"){const r=Number(i);Number.isNaN(r)||ip(r)}}),e.dataset.groupListenerAttached="true")}function aa(){return!!document.getElementById("edit-res-project")?.value}function ap(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{aa()&&(x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function sp(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),i=document.getElementById("edit-res-payment-progress-type"),r=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),l=document.getElementById("edit-res-payment-history");if([n,a,s,i,r,c,l].forEach(ap),e){if(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s){const d=document.getElementById("edit-res-project")?.value||"";let u="unpaid";if(d)try{const f=(ye()?.projects||[]).find(p=>String(p.id)===String(d)),m=typeof f?.paymentStatus=="string"?f.paymentStatus.toLowerCase():null;m&&["paid","partial","unpaid"].includes(m)&&(u=m)}catch{}s.value=u,s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected}i&&(i.value=i.value||"percent",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),r&&(r.value="",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),l&&(l.dataset.linkedDisabled="true")}else n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.dataset.linkedDisabled="false")}function ht(){const e=document.getElementById("edit-res-summary");if(!e)return;ds();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),yt(a),ht()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const i=parseFloat(s)||0,r=n?.value||"percent",c=aa();sp(c);const l=document.getElementById("edit-res-tax"),d=c?!1:l?.checked||!1,u=!c&&a?.dataset?.userSelected==="true";let b="unpaid";if(c){const N=document.getElementById("edit-res-project")?.value||"";if(N)try{const O=(ye()?.projects||[]).find(_=>String(_.id)===String(N)),A=typeof O?.paymentStatus=="string"?O.paymentStatus.toLowerCase():null;A&&["paid","partial","unpaid"].includes(A)&&(b=A)}catch{}}else b=u&&a?.value||"unpaid";let f=null;!c&&d&&(xt("edit-res-company-share"),f=Tn("edit-res-company-share"),(!Number.isFinite(f)||f<=0)&&(xt("edit-res-company-share"),f=Tn("edit-res-company-share")));const{items:m=[],payments:p=[]}=rn(),{start:g,end:v}=Hn(),$=Is({items:m,discount:i,discountType:r,applyTax:d,paidStatus:b,start:g,end:v,companySharePercent:f,paymentHistory:p});e.innerHTML=$;const q=Is.lastResult;if(q&&a){const N=q.paymentStatus;u?yt(a,a.value):(a.value!==N&&(a.value=N),a.dataset&&delete a.dataset.userSelected,yt(a,N))}else a&&yt(a,a.value)}function ip(e){if(e==null)return;const{index:t,items:n}=rn();if(!Array.isArray(n))return;const a=n.filter((s,i)=>i!==e);on(t,a),sn(a),ht()}function rp(e){const t=e?.value??"",n=re(t);if(!n)return;const a=Xa(n);if(!a){x(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=Ot(a);if(s==="maintenance"||s==="retired"){x(Sn(s));return}const i=re(n),{index:r,items:c=[]}=rn();if(c.findIndex(v=>re(v.barcode)===i)>-1){x(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=Hn();if(!d||!u){x(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:b=[]}=ye(),f=r!=null&&b[r]||null,m=f?.id??f?.reservationId??null;if(Nt(i,d,u,m)){x(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const p=En(a);if(!p){x(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:p,equipmentId:p,barcode:i,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];on(r,g),e&&(e.value=""),sn(g),ht()}function Ha(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Yr(t),a=re(n?.barcode||t);if(!n||!a){x(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=Ot(n);if(s==="maintenance"||s==="retired"){x(Sn(s));return}const{start:i,end:r}=Hn();if(!i||!r){x(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:l=[]}=rn();if(l.some(g=>re(g.barcode)===a)){x(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=ye(),b=c!=null&&u[c]||null,f=b?.id??b?.reservationId??null;if(Nt(a,i,r,f)){x(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=En(n);if(!m){x(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const p=[...l,{id:m,equipmentId:m,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];on(c,p),sn(p),ht(),e.value=""}function Zo(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Ha(e))});const t=()=>{Zr(e.value,"edit-res-equipment-description-options")&&Ha(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{ht()});const e=()=>{Ju()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{Yo()})}typeof window<"u"&&(window.getEditReservationDateRange=Hn,window.renderEditPaymentHistory=ds);function op(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){Bs(e);return}Ha(e)}}function Xp(){tn(),Zo()}function cp(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let Ln=null,$t=[],Ct=[],Qs=null,ct={},As=!1;const lp="__DEBUG_CREW__";function dp(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(lp);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function mr(e,t){if(dp())try{console.log(`🪵 [crew-debug:edit] ${e}`,t)}catch{}}function Yn(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),i=!!e;if(n&&(n.value=i?"true":"false"),a){const r=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=i?r:c,a.dataset.state=i?"confirmed":"pending",a.classList.toggle("btn-success",i&&!t),a.classList.toggle("btn-outline-secondary",!i||t),a.disabled=t,a.setAttribute("aria-pressed",i?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function wa(){return document.getElementById("edit-res-confirmed")?.value==="true"}function rn(){return{index:Ln,items:$t,payments:Ct}}function on(e,t,n=Ct){Ln=typeof e=="number"?e:null,$t=Array.isArray(t)?[...t]:[],Ct=Array.isArray(n)?[...n]:[]}function ec(){Ln=null,$t=[],cl(),Ct=[]}function us(){return[...Ct]}function $i(e){Ct=Array.isArray(e)?[...e]:[]}function up(e){e&&(Ct=[...Ct,e])}function pp(e){!Number.isInteger(e)||e<0||(Ct=Ct.filter((t,n)=>n!==e))}function Zn(e,t=1){const n=Number.parseFloat(h(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function Gs(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(h(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function mp(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?re(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:Zn(e.qty??e.quantity??e.count??1),price:Gs(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function fp(e,t=0){if(!e||typeof e!="object")return null;const n=ta(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=Zn(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),i=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:Ys(e)).map(f=>mp(f)).filter(Boolean),r=e.total_price??e.totalPrice??e.total??null;let c=Gs(e.unit_price??e.unitPrice??e.price??null,0);if((!c||c===0)&&r!=null){const f=Gs(r,0);f>0&&a>0&&(c=Number((f/a).toFixed(2)))}const l=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,l,n].find(f=>f!=null&&String(f).trim()!=="")||`Package ${n}`,b=e.image??e.cover??e.thumbnail??i.find(f=>f?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:h(String(u)),name:h(String(u)),qty:a,price:c,barcode:l,packageItems:i,image:b}}function yp(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const i=s-n;e.set(a,i>0?i:0)})}function bp(e={},t=[]){const n=Array.isArray(t)?t.map(c=>({...c})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((c,l)=>fp(c,l)).filter(Boolean);if(!s.length)return n;const i=new Map;s.forEach(c=>{const l=Zn(c.qty??c.quantity??1);if(c.barcode){const d=re(c.barcode);if(d){const u=`package::${d}`;i.set(u,(i.get(u)??0)+l)}}(c.packageItems||[]).forEach(d=>{if(!d)return;const u=l*Zn(d.qty??d.quantity??1),b=d.equipmentId??null,f=d.normalizedBarcode||(d.barcode?re(d.barcode):null);if(b!=null){const m=`equipment::${String(b)}`;i.set(m,(i.get(m)??0)+u)}if(f){const m=`barcode::${f}`;i.set(m,(i.get(m)??0)+u)}})});const r=[];return n.forEach(c=>{if(!c||typeof c!="object"){r.push(c);return}if(c.type==="package"){const v=ta(c.packageId??c.package_id??c.id??"");s.some(q=>q.packageId===v)||r.push({...c});return}const l=Zn(c.qty??c.quantity??1),d=En(c),u=c.barcode?re(c.barcode):null,b=[];d!=null&&b.push(`equipment::${String(d)}`),u&&b.push(`barcode::${u}`);const f=b.map(v=>i.get(v)??0).filter(v=>v>0);if(!f.length){r.push({...c});return}const m=Math.min(...f);if(m<=0){r.push({...c});return}const p=Math.min(m,l);if(yp(i,b,p),p>=l)return;const g=l-p;r.push({...c,qty:g,quantity:g})}),[...r,...s.map(c=>({...c}))]}function gp(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function tc(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function nc(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function hp(e,t){if(e){e.value="";return}}function Qn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ac(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),i=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,r=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(i)?"amount":Number.isFinite(r)?"percent":null),l=c==="amount"?i??null:c==="percent"?r??null:Number.isFinite(n)?n:null,d=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:l,amount:Number.isFinite(i)?i:null,percentage:Number.isFinite(r)?r:null,note:e.note??null,recordedAt:d}}function vp(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),i=t?.projectId?String(t.projectId):"",r=Array.isArray(e)?[...e].sort((l,d)=>String(d.createdAt||d.start||"").localeCompare(String(l.createdAt||l.start||""))):[],c=[`<option value="">${Qn(a)}</option>`];r.forEach(l=>{c.push(`<option value="${Qn(l.id)}">${Qn(l.title||a)}</option>`)}),i&&!r.some(l=>String(l.id)===i)&&c.push(`<option value="${Qn(i)}">${Qn(s)}</option>`),n.innerHTML=c.join(""),i?n.value=i:n.value=""}function sc(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),i=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=i),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=i),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=i),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=i);else{if(t){const l=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",l&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}Ws("tax");const c=ct?.updateEditReservationSummary;typeof c=="function"&&c()}function Ws(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const i=ct?.updateEditReservationSummary;typeof i=="function"&&i()};if(As){a();return}As=!0;const s=()=>{As=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(bn)),t.disabled){n.checked=!1,x(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),xt("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?xt("edit-res-company-share"):n.checked&&(n.checked=!1));s()}async function fr(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:i,ensureModal:r}={}){const{customers:c,projects:l}=ye(),u=Ft()?.[e];if(!u){x(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}ct={...ct,reservation:u,projects:l||[]},t?.(),vp(l||[],u);const b=u.projectId&&l?.find?.(M=>String(M.id)===String(u.projectId))||null,{effectiveConfirmed:f,projectLinked:m}=nn(u,b),p=u.items?u.items.map(M=>({...M,equipmentId:M.equipmentId??M.equipment_id??M.id,barcode:re(M?.barcode)})):[],g=bp(u,p),$=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(M=>ac(M)).filter(Boolean);on(e,g,$);const q=o("reservations.list.unknownCustomer","غير معروف"),N=c?.find?.(M=>String(M.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const I=document.getElementById("edit-res-id");I&&(I.value=u.reservationId||u.id);const O=document.getElementById("edit-res-customer");O&&(O.value=N?.customerName||q);const A=typeof a=="function"?a(u.start):{date:"",time:""},_=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",A.date),n?.("edit-res-start-time",A.time),n?.("edit-res-end",_.date),n?.("edit-res-end-time",_.time);const T=document.getElementById("edit-res-notes");T&&(T.value=u.notes||"");const B=document.getElementById("edit-res-discount");if(B){const M=m?0:u.discount??0;B.value=h(M)}const Z=document.getElementById("edit-res-discount-type");Z&&(Z.value=m?"percent":u.discountType||"percent");const C=u.projectId?!1:!!u.applyTax,R=document.getElementById("edit-res-tax");R&&(R.checked=C);const W=document.getElementById("edit-res-company-share");if(W){const M=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,K=M!=null?Number.parseFloat(h(String(M).replace("%","").trim())):NaN,H=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,ae=H!=null?H===!0||H===1||H==="1"||String(H).toLowerCase()==="true":Number.isFinite(K)&&K>0,me=ae&&Number.isFinite(K)&&K>0?K:bn,oe=C||ae;W.checked=oe,W.dataset.companyShare=String(me)}Yn(f,{disable:m});const j=document.getElementById("edit-res-paid"),D=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");j&&(j.value=D,j.dataset&&delete j.dataset.userSelected);const F=document.getElementById("edit-res-payment-progress-type"),V=document.getElementById("edit-res-payment-progress-value");F?.dataset?.userSelected&&delete F.dataset.userSelected,F&&(F.value="percent"),hp(V);const X=document.getElementById("edit-res-cancelled");if(X){const M=String(u?.status||u?.reservationStatus||"").toLowerCase();X.checked=["cancelled","canceled"].includes(M),X.checked&&Yn(f,{disable:!0})}let z=Array.isArray(u.crewAssignments)&&u.crewAssignments.length?u.crewAssignments:Array.isArray(u.techniciansDetails)&&u.techniciansDetails.length?u.techniciansDetails:(u.technicians||[]).map(M=>String(M));if(!Array.isArray(z)||z.length===0){const M=ll(u.id??u.reservationId??u.reservation_code??null);Array.isArray(M)&&M.length&&(z=M)}try{await Ir()}catch(M){console.warn("[reservationsEdit] positions load failed (non-fatal)",M)}if(dl(z),s?.(g),typeof window<"u"){const M=window?.renderEditPaymentHistory;typeof M=="function"&&M()}sc(),i?.();const ee=document.getElementById("editReservationModal");Qs=gp(ee,r),Qs?.show?.()}async function qp({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:i,populateEquipmentDescriptionLists:r,handleReservationsMutation:c}={}){if(Ln===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const l=document.getElementById("edit-res-start")?.value?.trim(),d=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),b=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",f=document.getElementById("edit-res-notes")?.value||"",m=h(document.getElementById("edit-res-discount")?.value||"0");let p=parseFloat(m)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const v=wa(),$=document.getElementById("edit-res-paid"),q=$?.dataset?.userSelected==="true",N=q&&$?.value||"unpaid",I=document.getElementById("edit-res-payment-progress-type"),O=document.getElementById("edit-res-payment-progress-value"),A=tc(I),_=nc(O),T=document.getElementById("edit-res-project")?.value||"",Z=document.getElementById("edit-res-cancelled")?.checked===!0,C=rl();C.map(S=>S?.technicianId).filter(Boolean);const R=document.getElementById("edit-res-company-share"),W=document.getElementById("edit-res-tax");if(!l||!u){x(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const j=typeof e=="function"?e:(S,J)=>`${S}T${J||"00:00"}`,D=j(l,d),F=j(u,b);if(D&&F&&new Date(D)>new Date(F)){x(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const X=Ft()?.[Ln];if(!X){x(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray($t)||$t.length===0&&C.length===0){x(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const z=typeof t=="function"?t:()=>!1,ee=X.id??X.reservationId;for(const S of $t){if(S?.type==="package"&&Array.isArray(S.packageItems)){for(const w of S.packageItems){const Y=w?.barcode??w?.normalizedBarcode??"";if(!Y)continue;const L=Ot(Y);if(L==="reserved"){const Q=re(Y);if(!z(Q,D,F,ee))continue}if(L!=="available"){x(Sn(L));return}}continue}const J=Ot(S.barcode);if(J==="reserved"){const w=re(S.barcode);if(!z(w,D,F,ee))continue}if(J!=="available"){x(Sn(J));return}}for(const S of $t){if(S?.type==="package"&&Array.isArray(S.packageItems)){for(const w of S.packageItems){const Y=re(w?.barcode??w?.normalizedBarcode??"");if(Y&&z(Y,D,F,ee)){const L=w?.desc||w?.barcode||o("reservations.create.packages.unnamedItem","معدة بدون اسم"),Q=`${o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${h(String(L))})`;x(Q);return}}continue}const J=re(S.barcode);if(z(J,D,F,ee)){x(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const M=typeof n=="function"?n:()=>!1;for(const S of $t){if(S?.type!=="package")continue;const J=S.packageId??S.package_id??null;if(J&&M(J,D,F,ee)){const w=S.desc||S.packageName||o("reservations.create.packages.genericName","الحزمة");x(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${h(String(w))} محجوزة بالفعل في الفترة المختارة`));return}}const K=typeof a=="function"?a:()=>!1;for(const S of C)if(S?.technicianId&&K(S.technicianId,D,F,ee)){x(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const H=Array.isArray(ct.projects)&&ct.projects.length?ct.projects:ye().projects||[],ae=T&&H.find(S=>String(S.id)===String(T))||null,me={...X,projectId:T?String(T):null,confirmed:v},{effectiveConfirmed:oe,projectLinked:Ae,projectStatus:Pe}=nn(me,ae);let G=!!R?.checked,ce=!!W?.checked;if(Ae&&(G&&(R.checked=!1,G=!1),ce=!1),!Ae&&G!==ce){x(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}ce&&(xt("edit-res-company-share"),G=!!R?.checked);let je=G?getCompanySharePercent("edit-res-company-share"):null;G&&(!Number.isFinite(je)||je<=0)&&(xt("edit-res-company-share"),je=getCompanySharePercent("edit-res-company-share"));const Te=G&&ce&&Number.isFinite(je)&&je>0,Je=Ae?!1:ce;Ae&&(p=0,g="percent");const Ce=ti($t,p,g,Je,C,{start:D,end:F,companySharePercent:Te?je:0});let Ie=us();if(Number.isFinite(_)&&_>0){const S=Ce;let J=null,w=null;A==="amount"?(J=_,S>0&&(w=_/S*100)):(w=_,S>0&&(J=_/100*S));const Y=ac({type:A,value:_,amount:J,percentage:w,recordedAt:new Date().toISOString()});Y&&(Ie=[...Ie,Y],$i(Ie)),O&&(O.value="")}const xe=ni({totalAmount:Ce,history:Ie}),Ne=ai({manualStatus:N,paidAmount:xe.paidAmount,paidPercent:xe.paidPercent,totalAmount:Ce});$&&!q&&($.value=Ne,$.dataset&&delete $.dataset.userSelected);let Re=X.status??"pending";Ae?Re=ae?.status??Pe??Re:Z?Re="cancelled":["completed","cancelled"].includes(String(Re).toLowerCase())||(Re=v?"confirmed":"pending");const rt=Er({reservationCode:X.reservationCode??X.reservationId??null,customerId:X.customerId,start:D,end:F,status:Re,title:X.title??null,location:X.location??null,notes:f,projectId:T?String(T):null,totalAmount:Ce,discount:p,discountType:g,applyTax:Je,paidStatus:Ne,confirmed:oe,items:$t.map(S=>({...S,equipmentId:S.equipmentId??S.id})),crewAssignments:C,companySharePercent:Te?je:null,companyShareEnabled:Te,paidAmount:xe.paidAmount,paidPercentage:xe.paidPercent,paymentProgressType:xe.paymentProgressType,paymentProgressValue:xe.paymentProgressValue,paymentHistory:Ie});try{mr("about to submit",{editingIndex:Ln,crewAssignments:C,techniciansPayload:rt?.technicians,payload:rt});const S=await ol(X.id||X.reservationId,rt);mr("server response",{reservation:S?.id??S?.reservationId??S?.reservation_code,technicians:S?.technicians,crewAssignments:S?.crewAssignments,techniciansDetails:S?.techniciansDetails}),await ri(),zn(),gn(),it(),x(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),ec(),c?.({type:"updated",reservation:S}),i?.(),r?.(),Qs?.hide?.()}catch(S){console.error("❌ [reservationsEdit] Failed to update reservation",S);const J=Ga(S)?S.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");x(J,"error")}}function Jp(e={}){ct={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=ct,i=document.getElementById("edit-res-discount");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",()=>{i.value=h(i.value),t?.()}),i.dataset.listenerAttached="true");const r=document.getElementById("edit-res-discount-type");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>t?.()),r.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{Ws("tax")}),c.dataset.listenerAttached="true");const l=document.getElementById("edit-res-company-share");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{Ws("share")}),l.dataset.listenerAttached="true");const d=document.getElementById("edit-res-payment-progress-type");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{d.dataset.userSelected="true",t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const b=document.getElementById("edit-res-project");b&&!b.dataset.listenerAttached&&(b.addEventListener("change",()=>{sc();const $=Array.isArray(ct.projects)&&ct.projects.length?ct.projects:ye().projects||[],q=b.value&&$.find(_=>String(_.id)===String(b.value))||null,I={...ct?.reservation??{},projectId:b.value||null,confirmed:wa()},{effectiveConfirmed:O,projectLinked:A}=nn(I,q);Yn(O,{disable:A}),t?.()}),b.dataset.listenerAttached="true");const f=document.getElementById("edit-res-confirmed-btn");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{if(f.disabled)return;const $=!wa();Yn($),t?.()}),f.dataset.listenerAttached="true");const m=document.getElementById("edit-res-cancelled");m&&!m.dataset.listenerAttached&&(m.addEventListener("change",()=>{document.getElementById("edit-res-confirmed-btn")&&Yn(wa(),{disable:m.checked}),t?.()}),m.dataset.listenerAttached="true");const p=document.getElementById("save-reservation-changes");p&&!p.dataset.listenerAttached&&(p.addEventListener("click",()=>{qp(ct).catch($=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",$)})}),p.dataset.listenerAttached="true");const g=document.getElementById("edit-res-equipment-barcode");if(g&&!g.dataset.listenerAttached){let $=null;const q=()=>{g.value?.trim()&&(clearTimeout($),$=null,n?.(g))};g.addEventListener("keydown",I=>{I.key==="Enter"&&(I.preventDefault(),q())});const N=()=>{if(clearTimeout($),!g.value?.trim())return;const{start:I,end:O}=getEditReservationDateRange();!I||!O||($=setTimeout(()=>{q()},150))};g.addEventListener("input",N),g.addEventListener("change",q),g.dataset.listenerAttached="true"}Zo?.();const v=document.getElementById("editReservationModal");v&&!v.dataset.cleanupAttached&&(v.addEventListener("hidden.bs.modal",()=>{ec(),t?.(),s?.([])}),v.dataset.cleanupAttached="true")}const Sp=ye()||{};let At=(Sp.projects||[]).map(oc),ca=!1;function wp(){return At}function la(e){At=Array.isArray(e)?e.map(Pi):[],Ua({projects:At});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return At}async function ic(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,l])=>{l==null||l===""||t.set(c,String(l))});const n=t.toString(),s=(await _t(`/projects/${n?`?${n}`:""}`))?.data;let i=[];Array.isArray(s)?i=s:s&&typeof s=="object"&&(Array.isArray(s.items)?i=s.items:Array.isArray(s.results)?i=s.results:Array.isArray(s.data)?i=s.data:Array.isArray(s.records)&&(i=s.records));const r=i.map(ps);return la(r),ca=!0,At}async function rc({force:e=!1,params:t=null}={}){if(!e&&ca&&At.length>0)return At;try{return await ic(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),At}}async function Ep(e){const t=await _t("/projects/",{method:"POST",body:e}),n=ps(t?.data??{}),a=[...At,n];return la(a),ca=!0,n}async function Ap(e,t){const n=await _t(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=ps(n?.data??{}),s=At.map(i=>String(i.id)===String(e)?a:i);return la(s),ca=!0,a}async function xp(e){await _t(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=At.filter(n=>String(n.id)!==String(e));la(t),ca=!0}function _p({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:i,start:r,end:c,applyTax:l,paymentStatus:d,equipmentEstimate:u=0,expenses:b=[],servicesClientPrice:f=0,taxAmount:m=0,totalWithTax:p=0,discount:g=0,discountType:v="percent",companyShareEnabled:$=!1,companySharePercent:q=null,companyShareAmount:N=0,paidAmount:I=null,paidPercentage:O=null,paymentProgressType:A=null,paymentProgressValue:_=null,confirmed:T=!1,technicians:B=[],equipment:Z=[],payments:C,paymentHistory:R}={}){const W=Array.isArray(B)?B.map(K=>Number.parseInt(String(K),10)).filter(K=>Number.isInteger(K)&&K>0):[],j=Array.isArray(Z)?Z.map(K=>{const H=Number.parseInt(String(K.equipmentId??K.equipment_id??K.id??0),10),ae=Number.parseInt(String(K.qty??K.quantity??0),10);return!Number.isInteger(H)||H<=0?null:{equipment_id:H,quantity:Number.isInteger(ae)&&ae>0?ae:1}}).filter(Boolean):[],D=Array.isArray(b)?b.map(K=>{const H=Number.parseFloat(K?.amount??K?.value??0)||0,ae=(K?.label??K?.name??"").trim();if(!ae)return null;const me=Number.parseFloat(K?.salePrice??K?.sale_price??0)||0,oe=(K?.note??K?.notes??"").toString().trim();return{label:ae,amount:Math.round(H*100)/100,sale_price:Math.max(0,Math.round(me*100)/100),note:oe||void 0,...oe?{notes:oe}:{}}}).filter(Boolean):[],F=D.reduce((K,H)=>K+(H?.amount??0),0),V={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:i??null,start_datetime:r??null,end_datetime:c||null,apply_tax:!!l,payment_status:d??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(F*100)/100,services_client_price:Number.isFinite(Number(f))?Math.round(Number(f)*100)/100:0,tax_amount:Math.round((Number.parseFloat(m)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(p)||0)*100)/100,confirmed:!!T,technicians:W,equipment:j,expenses:D},X=Math.max(0,Number.parseFloat(g)||0);V.discount=X,V.discount_type=v==="amount"?"amount":"percent";const z=Number.parseFloat(q),ee=!!$&&Number.isFinite(z)&&z>0;V.company_share_enabled=ee,V.company_share_percent=ee?z:0,V.company_share_amount=ee?Math.max(0,Number.parseFloat(N)||0):0,Number.isFinite(Number(I))&&(V.paid_amount=Math.max(0,Number.parseFloat(I)||0)),Number.isFinite(Number(O))&&(V.paid_percentage=Math.max(0,Number.parseFloat(O)||0)),(A==="amount"||A==="percent")&&(V.payment_progress_type=A),_!=null&&_!==""&&(V.payment_progress_value=Number.parseFloat(_)||0),e&&(V.project_code=String(e).trim());const M=C!==void 0?C:R;if(M!==void 0){const K=cc(M)||[];V.payments=K.map(H=>({type:H.type,amount:H.amount!=null?H.amount:null,percentage:H.percentage!=null?H.percentage:null,value:H.value!=null?H.value:null,note:H.note??null,recorded_at:H.recordedAt??null}))}return V.end_datetime||delete V.end_datetime,V.client_company||(V.client_company=null),V}function ps(e={}){return Pi(e)}function oc(e={}){return Pi(e)}function Pi(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(p=>{if(p==null)return null;if(typeof p=="object"){const g=p.id??p.technician_id??p.technicianId;return g!=null?String(g):null}return String(p)}).filter(Boolean),i=(Array.isArray(e.equipment)?e.equipment:[]).map(p=>{const g=p?.equipment_id??p?.equipmentId??p?.id??null,v=p?.quantity??p?.qty??0,$=p?.barcode??p?.code??"",q=p?.description??p?.name??"";return{equipmentId:g!=null?String(g):null,qty:Number.parseInt(String(v),10)||0,barcode:$,description:q}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((p,g)=>({id:p?.id??`expense-${t??"x"}-${g}`,label:p?.label??"",amount:Number.parseFloat(p?.amount??0)||0,salePrice:Number.parseFloat(p?.sale_price??p?.salePrice??0)||0,note:p?.note??p?.notes??""})),l=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,d=e.company_share_enabled??e.companyShareEnabled,u=d!=null?d===!0||d===1||String(d).toLowerCase()==="true":l>0,b=e.payment_history??e.paymentHistory??e.payments??null,f=cc(b),m=(()=>{const p=e.cancelled??e.canceled??e.is_cancelled??e.isCanceled;if(p===!0||p==="true"||p===1||p==="1")return!0;if(typeof p=="string"){const g=p.toLowerCase();return g==="yes"||g==="cancelled"||g==="canceled"}return!1})();return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,status:(()=>{const p=String(e.status??e.project_status??"").toLowerCase();if(m||p==="cancelled"||p==="canceled"||p==="ملغي"||p==="ملغى")return"cancelled";if(p==="completed"||p==="مكتمل")return"completed";if(p==="ongoing"||p==="in_progress"||p==="قيد التنفيذ")return"ongoing";if(p==="upcoming"||p==="قادم")return"upcoming"})(),cancelled:m,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,servicesClientPrice:Number.parseFloat(e.services_client_price??e.servicesClientPrice??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?l:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(p=>typeof p=="object"?p:{id:p}),equipment:i,expenses:c,paymentHistory:f}}function Ip(e){return e instanceof yr}function xs(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const i=Number.parseFloat(n);return Number.isFinite(i)?i:null}function kp(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=xs(e.value);let s=xs(e.amount),i=xs(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&i==null&&a!=null&&(i=a),!n)if(s!=null&&s>=0)n="amount";else if(i!=null&&i>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(i==null||!Number.isFinite(i)||i<0)return null;i=Math.min(100,Math.round(i*100)/100)}const r=e.note??e.memo??e.description??null,c=r!=null?String(r).trim():null,l=e.recordedAt??e.recorded_at??e.date??null;let d=null;if(l){const b=new Date(l);Number.isNaN(b.getTime())||(d=b.toISOString())}d||(d=new Date().toISOString());const u=n==="amount"?s:n==="percent"?i:a;return{type:n,amount:s??null,percentage:i??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:d}}function cc(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>kp(t)).filter(Boolean):[]}const Yp=Object.freeze(Object.defineProperty({__proto__:null,buildProjectPayload:_p,createProjectApi:Ep,deleteProjectApi:xp,ensureProjectsLoaded:rc,getProjectsState:wp,isApiError:Ip,mapLegacyProject:oc,mapProjectFromApi:ps,refreshProjectsFromApi:ic,setProjectsState:la,updateProjectApi:Ap},Symbol.toStringTag,{value:"Module"})),Va="reservations-ui:ready",mn=typeof EventTarget<"u"?new EventTarget:null;let fn={};function $p(e){return Object.freeze({...e})}function Pp(){if(!mn)return;const e=fn,t=typeof CustomEvent=="function"?new CustomEvent(Va,{detail:e}):{type:Va,detail:e};typeof mn.dispatchEvent=="function"&&mn.dispatchEvent(t)}function Cp(e={}){if(!e||typeof e!="object")return fn;const t={...fn};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),fn=$p(t),Pp(),fn}function Np(e){if(e)return fn?.[e]}function Zp(e){const t=Np(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const r=(s?.detail||fn)?.[e];typeof r=="function"&&(mn&&mn.removeEventListener(Va,a),n(r))};mn&&mn.addEventListener(Va,a)})}function em(){return rc().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=ye()||{};ul(e||[]),ro()})}function Ci(e=null){ro(),lc(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Lp(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Xs(){return{populateEquipmentDescriptionLists:tn,setFlatpickrValue:cp,splitDateTime:vr,renderEditItems:sn,updateEditReservationSummary:ht,addEquipmentByDescription:op,addEquipmentToEditingReservation:rp,addEquipmentToEditingByDescription:Ha,combineDateTime:ea,hasEquipmentConflict:Nt,hasTechnicianConflict:wr,renderReservations:lc,handleReservationsMutation:Ci,ensureModal:Lp}}function lc(e="reservations-list",t=null){Uu({containerId:e,filters:t,onShowDetails:dc,onConfirmReservation:pc})}function dc(e){return Ku(e,{getEditContext:Xs,onEdit:(t,{reservation:n})=>{mc(t,n)},onDelete:uc})}function uc(e){return wn()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?Gu(e,{onAfterChange:Ci}):!1:(sa(),!1)}function pc(e){return Wu(e,{onAfterChange:Ci})}function mc(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",i)}fr(e,Xs());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",i)}fr(e,Xs());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const i=t.id??t.reservationId;n.set("reservationEditId",String(i));try{localStorage.setItem("pendingReservationEditId",String(i)),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",r)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",i)}}Gc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(i=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",i)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function tm(){Cp({showReservationDetails:dc,deleteReservation:uc,confirmReservation:pc,openReservationEditor:mc})}export{Dp as $,ic as A,tm as B,rc as C,xp as D,Ep as E,Rp as F,Jp as G,em as H,Xp as I,Fp as J,Ci as K,ro as L,Hp as M,ht as N,Op as O,Vp as P,Xs as Q,qe as R,uc as S,pc as T,mc as U,cp as V,Mn as W,vl as X,_a as Y,Bp as Z,Dl as _,it as a,Yp as a0,Yi as b,uo as c,po as d,Wp as e,lc as f,oo as g,Np as h,_p as i,Cp as j,dc as k,Up as l,ps as m,Kp as n,wp as o,Ip as p,Id as q,ra as r,mo as s,co as t,Ap as u,Qp as v,Zp as w,Gp as x,Mp as y,zp as z};
