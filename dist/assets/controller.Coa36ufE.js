import{n as h,l as ye,A as Hc,t as o,a as ht,s as w,u as bn,c as Zn,d as Oa,b as pr,z as Vc,f as dt,B as mr,o as Kc}from"./auth.D26aJb88.js";import{B as re,C as xt,E as fr,F as Uc,D as dn,G as Qs,n as nt,H as yr,I as Fi,J as Wn,K as Xn,L as Ha,M as Qc,N as Gs,O as It,P as Ws,Q as Nn,R as br,S as Xs,T as Gc,U as Wc,V as Xc,W as gr,X as gn,Y as qa,Z as Jc,_ as Va,$ as hr,a0 as vr,a as Js,o as Ys,q as Zs,a1 as qr,a2 as Yc,s as un,h as Ka,a3 as Zc,a4 as Sr,a5 as el,i as ei,r as Wt,a6 as ti,a7 as Ot,a8 as Sa,m as Ae,p as Me,y as Ua,b as Er,a9 as wr,l as ni,g as Nt,aa as Es,j as Ar,z as tl,ab as nl,ac as ws,ad as al,u as sl,ae as il,af as rl,ag as ol,ah as cl}from"./reservationsService.BnprjwAK.js";const ms="select.form-select:not([data-no-enhance]):not([multiple])",_t=new WeakMap;let fs=null,Di=!1,Lt=null;function Np(e=document){e&&(e.querySelectorAll(ms).forEach(t=>fa(t)),!fs&&e===document&&(fs=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(ms)&&fa(a),a.querySelectorAll?.(ms).forEach(s=>fa(s)))})}),fs.observe(document.body,{childList:!0,subtree:!0})),Di||(Di=!0,document.addEventListener("pointerdown",ul,{capture:!0})))}function ma(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){fa(e);return}const t=e.closest(".enhanced-select");t&&(ai(t),Ea(t),As(t))}function fa(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){ma(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const i={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};_t.set(t,i),a.addEventListener("click",()=>dl(t)),a.addEventListener("keydown",r=>pl(r,t)),s.addEventListener("click",r=>fl(r,t)),s.addEventListener("keydown",r=>ml(r,t)),e.addEventListener("change",()=>{Ea(t),xr(t)}),i.observer=new MutationObserver(r=>{let c=!1,l=!1;for(const d of r)d.type==="attributes"&&d.attributeName==="disabled"&&(l=!0),d.type==="childList"&&(c=!0);l&&As(t),c&&ll(i,t)}),i.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),ai(t),Ea(t),As(t)}function ll(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,ai(t),Ea(t)})))}function ai(e){const t=_t.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),i=document.createDocumentFragment();s.forEach(r=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=r.textContent??r.value??"",c.dataset.value=r.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),r.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),r.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),i.appendChild(c)}),a.innerHTML="",a.appendChild(i),xr(e)}function Ea(e){const t=_t.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],i=s?.textContent?.trim()||s?.value||"";a.textContent=i}function xr(e){const t=_t.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(r=>{const c=r.dataset.value===s;r.toggleAttribute("aria-selected",c),r.dataset.selected=c?"true":"",r.setAttribute("tabindex",c?"0":"-1")})}function As(e){const t=_t.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function dl(e){_t.get(e)&&(e.getAttribute("data-open")==="true"?jn(e):Ir(e))}function Ir(e){const t=_t.get(e);if(!t)return;Lt&&Lt!==e&&jn(Lt,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),Lt=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function jn(e,{focusTrigger:t=!0}={}){const n=_t.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),Lt===e&&(Lt=null))}function ul(e){if(!Lt)return;const t=e.target;t instanceof Node&&(Lt.contains(t)||jn(Lt,{focusTrigger:!1}))}function pl(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),Ir(t)):n==="Escape"&&jn(t)}function ml(e,t){const n=e.key,a=_t.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const i=s.findIndex(r=>r===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(i+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const r=document.activeElement;r&&r.classList.contains("enhanced-select__option")&&_r(r,t)}else n==="Escape"&&(e.preventDefault(),jn(t))}function fl(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&_r(n,t)}function _r(e,t){const n=_t.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),jn(t)}const Tn=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let jt=null;function si(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function kr(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function yl(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function bl(e={}){const t=yl({...e,activatedAt:Date.now()});return jt=t,kr(!0,t.mode||"create"),si(Tn.change,{active:!0,selection:{...t}}),t}function wa(e="manual"){if(!jt)return;const t=jt;jt=null,kr(!1),si(Tn.change,{active:!1,previous:t,reason:e})}function Cr(){return!!jt}function gl(){return jt?{...jt}:null}function hl(e){if(!jt)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=h(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:i,description:r}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const l=c.map(u=>h(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!l.length)return!1;const d=Number.isInteger(s)&&s>0?s:l.length;t={barcodes:l,quantity:Math.min(d,l.length)},i&&(t.groupKey=i),r&&(t.description=r)}else return!1;return si(Tn.requestAdd,{...t,selection:{...jt}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||wa("tab-changed")});const vl=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),ql=new Set(["maintenance","reserved","retired"]);function Sl(e){const t=String(e??"").trim().toLowerCase();return t&&vl.get(t)||"available"}function El(e){return e?typeof e=="object"?e:Qa(e):null}function Ft(e){const t=El(e);return t?Sl(t.status||t.state||t.statusLabel||t.status_label):"available"}function $r(e){return!ql.has(Ft(e))}function hn(e={}){return e.image||e.imageUrl||e.img||""}function wl(e){if(!e)return null;const t=re(e),{equipment:n=[]}=ye();return(n||[]).find(a=>re(a?.barcode)===t)||null}function Qa(e){const t=re(e);if(!t)return null;const{equipment:n=[]}=ye();return(n||[]).find(a=>re(a?.barcode)===t)||null}const Al=ye()||{};let Ht=(Al.equipment||[]).map(_l),xs=!1,An="",rn=null,pn=null,mn=null,Ga=!1,Ri=!1;function xl(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function Il(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function _l(e={}){return ii({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function Wa(e={}){return ii(e)}function ii(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",i=ea(e.quantity??e.qty??0),r=Xa(e.unit_price??e.price??0),c=h(String(e.barcode??"").trim()),l=Je(e.status??e.state??e.status_label??e.statusLabel??"available"),d=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:kl(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:i,price:r,barcode:c,status:l,image:d,imageUrl:d,created_at:e.created_at??null,updated_at:e.updated_at??null}}function kl(e){return e!=null&&e!==""}function ea(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function Xa(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function Cl(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const i=s.length-a.length,r=t+i,c=n+i;e.setSelectionRange(r,c)}}),e.dataset.englishDigitsAttached="true")}function Mi(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function $l(e,t){const n=Mi(e),a=Mi(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,i=s.test(n),r=s.test(a);if(i&&r){if(n.length!==a.length)return n.length-a.length;const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}else{if(i!==r)return i?-1:1;{const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}}const c=xa(e?.desc||e?.description||e?.name||""),l=xa(t?.desc||t?.description||t?.name||"");return c.localeCompare(l,"ar",{sensitivity:"base"})}function ze(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Je(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function Pl(e){return Je(e)}function Aa(){if(!Cr())return null;const e=gl();return e?{...e}:null}function Ll(e){const t=Aa();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:i=null}=t,r=t?.mode||t?.source||"",c=[],l=new Set;if(n.forEach(f=>{const m=re(f?.barcode);!m||l.has(m)||(l.add(m),c.push({variant:f,barcode:m}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(r==="package-manager"||r==="equipment-packages"){const f=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:m})=>m),maxQuantity:f,reason:""}}const d=c.filter(({variant:f})=>{const m=Je(f?.status);return m!=="maintenance"&&m!=="retired"});if(!a||!s)return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=d.filter(({barcode:f})=>!xt(f,a,s,i));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:f})=>f),maxQuantity:u.length};let b=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(d.length>0)b=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const f=new Set(c.map(({variant:m})=>Je(m?.status)));f.has("maintenance")?b=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):f.has("reserved")?b=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):f.has("retired")&&(b=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:b,availableBarcodes:[],maxQuantity:0}}function Nl(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function Pr(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=Aa();e.hidden=!s;const i=s?.mode||s?.source||"";s?i==="package-manager"||i==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=Aa(),l=c?.mode||c?.source||"";l==="package-manager"||l==="equipment-packages"?wa("package-finish-button"):(wa("return-button"),Nl())}),t.dataset.listenerAttached="true")}function ut(){return Ht}function fn(e){Ht=Array.isArray(e)?e.map(ii):[],Oa({equipment:Ht}),Il()}function xa(e){return String(e??"").trim().toLowerCase()}function Ut(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=xa(t);return n||(n=xa(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function Ja(e){const t=Ut(e);return t?ut().filter(n=>Ut(n)===t):[]}function Ya(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=Za(e);if(n){const a=ze(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${ze(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function ri(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function Ia(){const e=ri();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function oi(e={}){const t=ri();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function Cn(e){Ga=e;const t=ri(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(r=>{r&&(e?r.removeAttribute("disabled"):r.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const r=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(r,c),a.dataset.mode=e?"save":"view"}if(e){const r=t.description||t.category||t.subcategory;r&&setTimeout(()=>{r.focus(),typeof r.select=="function"&&r.select()},0)}}async function jl(e){if(!bn()){Zn();return}if(!e)return;try{await Bl()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),i=s.Sheets[s.SheetNames[0]],r=XLSX.utils.sheet_to_json(i,{defval:""});if(!Array.isArray(r)||r.length===0){w(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let l=0;if(r.forEach(d=>{const u=d.القسم??d.category??"",b=d["القسم الثانوي"]??d.subcategory??"",f=d.الوصف??d.description??d.name??"",m=d.الكمية??d.quantity??0,p=d.السعر??d.price??0,g=d.الباركود??d.barcode??"",v=d.الحالة??d.status??"متاح",_=d.الصورة??d.image_url??d.image??"",q=h(String(g||"")).trim();if(!f||!q){l+=1;return}c.push(ci({category:u,subcategory:b,description:f,quantity:m,unit_price:p,barcode:q,status:v,image_url:_}))}),!c.length){w(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const d=await ht("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(d?.data)?d.data.map(Wa):[];if(u.length){const m=[...ut(),...u];fn(m)}await ta({showToastOnError:!1}),Ye();const b=d?.meta?.count??u.length,f=[];b&&f.push(`${b} ✔️`),l&&f.push(`${l} ⚠️`),w(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(f.length?` (${f.join(" / ")})`:""))}catch(d){const u=Fn(d,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");w(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),w(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),w(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const Tl="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let Rn=null;function Bl(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):Rn||(Rn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",i,{once:!0});return}const a=document.createElement("script");a.src=Tl,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",i,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function i(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),Rn=null,e}),Rn)}function ci({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:i="",status:r="متاح",image_url:c=""}){const l=h(String(i||"")).trim(),d=Pl(r);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:ea(a),unit_price:Xa(s),barcode:l,status:d,image_url:c?.trim()||null}}async function Lr(){if(!bn()){Zn();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await ht("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await ta({showToastOnError:!1}),w(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=Fn(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");w(t,"error")}}function Za(e){return e.image||e.imageUrl||e.img||""}function Fl(e){const t=Je(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function _a(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${ze(a)}</td></tr>`}n&&(n.textContent="0")}function Nr(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const i=rn?.groupKey||Ut(e);if(!i){_a();return}const r=ut().filter(b=>Ut(b)===i).sort((b,f)=>{const m=String(b.barcode||"").trim(),p=String(f.barcode||"").trim();return!m&&!p?0:m?p?m.localeCompare(p,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!r.length){_a();return}t.hidden=!1,a&&(a.textContent=String(r.length));const c=o("equipment.modal.variants.current","الحالي"),l=o("equipment.form.labels.quantity","الكمية"),d=ut(),u=r.map(b=>{const f=b.id&&e.id?String(b.id)===String(e.id):String(b.barcode||"")===String(e.barcode||""),m=f?"equipment-variants-table__row--current":"",p=ze(String(b.barcode||"-")),g=f?`<span class="equipment-variants-current-badge">${ze(c)}</span>`:"",v=h(String(Number.isFinite(Number(b.qty))?Number(b.qty):0)),_=d.indexOf(b),q=ze(o("equipment.item.actions.delete","🗑️ حذف")),P=_>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${_}">${q}</button>
          </div>`:"";return`
        <tr class="${m}">
          <td>
            ${p}
            ${g}
          </td>
          <td>${Fl(b.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${ze(l)}">${v}</span>
          </td>
          <td class="table-actions-cell">${P}</td>
        </tr>
      `}).join("");n.innerHTML=u}function Dl({item:e,index:t}){const n=Za(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),i=o("equipment.item.currency","SR"),r=bn(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},l=Number.isFinite(Number(e.qty))?Number(e.qty):0,d=Number.isFinite(Number(e.price))?Number(e.price):0,u=l.toLocaleString("en-US"),b=d.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),f=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,m=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,p=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(l-f-m,0),g=p.toLocaleString("en-US"),v=o("equipment.card.labels.availableOfTotal","من أصل"),_=Je(e.status);let q=`${ze(c.available)}: ${ze(g)} ${ze(v)} ${ze(u)}`,P="available";if(p===0){const K={reserved:{text:l===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},V=K[_]||K.default;q=ze(V.text),P=V.modifier}const x=`<span class="equipment-card__availability equipment-card__availability--${P}">${q}</span>`,O="",S=e.desc||e.name||"—",I=e.name&&e.name!==e.desc?e.name:"",T=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${b} ${i}`}].map(({label:K,value:V})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${K}</span>
              <span class="equipment-card__detail-value">${V}</span>
            </span>
          `).join("")}
    </div>`,X=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),C=X.length?`<div class="equipment-card__categories">${X.map(({label:K,value:V})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${K}</span>
              <span class="equipment-card__detail-value">${V}</span>
            </div>
          `).join("")}</div>`:"",D=I?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${I}</span>
      </div>`:"",B=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${S}</h3>
    </div>
  `}
      ${T}
    </div>
  `,F=[],N=Ll(e),H=N?.availableBarcodes?.length?N.availableBarcodes.join(","):N?.barcode?N.barcode:"";let Q="",z="";if(N.active){const K=`equipment-select-qty-${t}`,V=!!N.canSelect,te=V?Math.max(1,Number(N.maxQuantity||N.availableBarcodes?.length||1)):1,me=Math.max(1,Math.min(te,99)),oe=[];for(let Ie=1;Ie<=me;Ie+=1){const R=h(String(Ie));oe.push(`<option value="${Ie}"${Ie===1?" selected":""}>${R}</option>`)}const be=V?"":" disabled",ke=o("reservations.create.equipment.selector.quantityLabel","الكمية"),Y=V?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${h(String(te))}`:N.reason?N.reason:"";Q=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${K}">${ke}</label>
        <select class="equipment-card__quantity-select" id="${K}" data-equipment-select-quantity${be}>
          ${oe.join("")}
        </select>
        ${Y?`<span class="equipment-card__selection-hint">${ze(Y)}</span>`:""}
      </div>
    `;const ce=Aa(),Se=ce?.mode||ce?.source||"",He=Se==="package-manager"||Se==="equipment-packages"?o("equipment.packages.selection.addToPackage","➕ أضف إلى الحزمة"):o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),Ve=V?"":" disabled",Ce=N.reason?` title="${ze(N.reason)}"`:"",xe=['data-equipment-action="select-reservation"',`data-selection-max="${V?te:0}"`];H&&xe.push(`data-selection-barcodes="${ze(H)}"`),e.groupKey&&xe.push(`data-selection-group="${ze(String(e.groupKey))}"`),z=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${xe.join(" ")}${Ve}${Ce}>${He}</button>
    `}r&&F.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const J=F.length?F.join(`
`):"",M=ze(S);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${ze(String(e.groupKey))}"`:""}
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
      ${Q||z||J?`<div class="equipment-card__actions equipment-card__actions--center">
            ${Q}
            ${z}
            ${J}
          </div>`:""}
    </article>
  `}function Rl(e){const t=[...new Set(e.map(r=>r.category).filter(Boolean))],n=[...new Set(e.map(r=>r.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const r=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,a.appendChild(l)}),t.includes(r)&&(a.value=r),ma(a)}if(s){const r=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,s.appendChild(l)}),n.includes(r)&&(s.value=r),ma(s)}const i=document.getElementById("filter-status");i&&ma(i)}function Bn(){const e=ye();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return Ht=t||[],Ht;const s=new Date;let i=!1;const r=new Set((a||[]).filter(l=>l?.status==="open").map(l=>h(String(l?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(l=>{if(!l)return l;const d=Je(l.status),u=h(String(l.barcode??"")).trim().toLowerCase(),b=u&&r.has(u);let f=b?"maintenance":"available";if(!b&&u)for(const m of n||[]){if(!Ml(m,s))continue;if(m.items?.some(g=>h(String(g?.barcode??"")).trim().toLowerCase()===u)){f="reserved";break}}return f!==d?(i=!0,{...l,status:f}):{...l,status:f}});return i?fn(c):(Ht=c,Oa({equipment:Ht})),Ht}function Ml(e,t){if(!e?.start||!e?.end)return!1;const n=String(e?.status||e?.reservationStatus||"").toLowerCase();if(n==="cancelled"||n==="canceled")return!1;const a=new Date(e.start),s=new Date(e.end);return Number.isNaN(a.getTime())||Number.isNaN(s.getTime())?!1:a<=t&&t<s}function ys(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Ye(){const e=document.getElementById("equipment-list");if(!e)return;Pr();const t=Bn(),n=Array.isArray(t)?t:ut(),a=new Map;n.forEach(g=>{if(!g)return;const v=Ut(g);v&&(a.has(v)||a.set(v,[]),a.get(v).push(g))});const s=Array.from(a.values()).map(g=>{const v=g[0],_=g.reduce((I,j)=>I+(Number.isFinite(Number(j.qty))?Number(j.qty):0),0),q=["maintenance","reserved","available","retired"],P=g.map(I=>Je(I.status)).sort((I,j)=>q.indexOf(I)-q.indexOf(j))[0]||"available",x=g.reduce((I,j)=>{const T=ea(j?.qty??0)||0,X=Je(j?.status);return X==="reserved"?I.reserved+=T:X==="maintenance"&&(I.maintenance+=T),I},{reserved:0,maintenance:0}),O=Math.max(_-x.reserved-x.maintenance,0);return{item:{...v,qty:_,status:P,variants:g,groupKey:Ut(v),reservedQty:x.reserved,maintenanceQty:x.maintenance,availableQty:O},index:n.indexOf(v)}});s.sort((g,v)=>$l(g.item,v.item));const i=document.getElementById("search-equipment")?.value||"",r=h(i).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",l=document.getElementById("filter-sub")?.value||"",d=document.getElementById("filter-status")?.value||"",u=d?Je(d):"";if(xs&&!n.length){e.innerHTML=ys(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(An&&!n.length){e.innerHTML=ys(An,{tone:"error",icon:"⚠️"});return}const b=s.filter(({item:g})=>{const v=h(String(g.barcode??"")).toLowerCase().trim(),_=Array.isArray(g.variants)?g.variants.map(S=>h(String(S.barcode??"")).toLowerCase().trim()).filter(Boolean):[],q=!r||g.name&&g.name.toLowerCase().includes(r)||g.desc&&g.desc.toLowerCase().includes(r)||v&&v.includes(r)||_.some(S=>S.includes(r))||g.category&&g.category.toLowerCase().includes(r)||g.sub&&g.sub.toLowerCase().includes(r),P=!c||g.category===c,x=!l||g.sub===l,O=!u||Je(g.status)===u;return q&&P&&x&&O}),f=r?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),m=b;e.innerHTML=m.length?m.map(Dl).join(""):ys(f);const p=document.getElementById("equipment-list-count");if(p){const g=o("equipment.list.countSuffix","عنصر"),v=h(String(m.length)),_=m.length?`${v} ${g}`:`0 ${g}`;p.textContent=_}Rl(n)}async function ta({showToastOnError:e=!0}={}){xs=!0,An="",Ye();try{const t=await ht("/equipment/?all=1"),n=t?.data??t;let a=[];Array.isArray(n)?a=n:n&&typeof n=="object"&&(Array.isArray(n.items)?a=n.items:Array.isArray(n.results)?a=n.results:Array.isArray(n.data)?a=n.data:Array.isArray(n.records)&&(a=n.records));const s=a.map(Wa);fn(s)}catch(t){t&&typeof t=="object"&&Number(t.status)===401?An="":(An=Fn(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&w(An,"error"))}finally{xs=!1,Ye()}}function Fn(e,t,n){if(e instanceof pr){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function zl(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),i=Xa(t.querySelector("#new-equipment-price")?.value||"0"),r=ea(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",l=t.querySelector("#new-equipment-category")?.value?.trim()||"",d=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){w(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const b=ci({category:l,subcategory:d,description:n,quantity:r,unit_price:i,barcode:s,status:u,image_url:c});try{const f=await ht("/equipment/",{method:"POST",body:b}),m=Wa(f?.data),p=[...ut(),m];fn(p),Ye(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),w(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(f){const m=Fn(f,"equipment.toast.addFailed","تعذر إضافة المعدة");w(m,"error")}}async function jr(e){if(!bn()){Zn();return}const t=ut(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await ht(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),fn(a),Ye(),w(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=Fn(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");w(s,"error")}}async function Ol(e,t){const n=ut(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const i=[...n];i[e]={...i[e],...t},fn(i),Ye();return}const s=ci({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const i=await ht(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),r=Wa(i?.data),c=[...n];c[e]=r,fn(c),Ye(),w(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(i){const r=Fn(i,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw w(r,"error"),i}}function da(){Ye()}function Tr(e){const n=ut()[e];if(!n)return;pn=e;const a=Ja(n),s=a[0]||n,i=a.reduce((l,d)=>l+(Number.isFinite(Number(d.qty))?Number(d.qty):0),0),r=["maintenance","reserved","available","retired"],c=a.map(l=>Je(l.status)).sort((l,d)=>r.indexOf(l)-r.indexOf(d))[0]||Je(s.status);document.getElementById("edit-equipment-index").value=e,oi({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(i||s.qty||0),price:s.price!=null?String(s.price):"0",image:Za(s)||"",barcode:s.barcode||"",status:s.status||c}),Cn(!1),mn=Ia(),Ya(s),Nr(s),rn={groupKey:Ut(s),barcode:String(s.barcode||""),id:s.id||null},xl(document.getElementById("editEquipmentModal"))?.show()}function Hl(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),i=s?.querySelector("[data-equipment-select-quantity]");let r=Number.parseInt(i?.value||"1",10);(!Number.isFinite(r)||r<=0)&&(r=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&r>c&&(r=c);const d=(t.dataset.selectionBarcodes||"").split(",").map(m=>m.trim()).filter(m=>m.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",b=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";hl({barcodes:d,quantity:r,groupKey:b,description:u})||w(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||jr(s).catch(i=>{console.error("❌ [equipment.js] deleteEquipment",i)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||Tr(s)}}function Vl(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||Tr(n)}}function Kl(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||jr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function Br(){if(!rn||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=ut(),a=rn.id?n.find(l=>String(l.id)===String(rn.id)):null,s=rn.groupKey,i=s?n.find(l=>Ut(l)===s):null,r=a||i;if(!r){_a();return}const c=n.findIndex(l=>l===r);if(c>=0){const l=document.getElementById("edit-equipment-index");l&&(l.value=String(c)),pn=c}if(Nr(r),!Ga){const l=Ja(r),d=l[0]||r,u=l.reduce((m,p)=>m+(Number.isFinite(Number(p.qty))?Number(p.qty):0),0),b=["maintenance","reserved","available","retired"],f=l.map(m=>Je(m.status)).sort((m,p)=>b.indexOf(m)-b.indexOf(p))[0]||Je(d.status);oi({category:d.category||"",subcategory:d.sub||"",description:d.desc||d.description||"",quantity:String(u||d.qty||0),price:d.price!=null?String(d.price):"0",image:Za(d)||"",barcode:d.barcode||"",status:d.status||f}),mn=Ia()}Ya(primary)}function Ul(){document.getElementById("search-equipment")?.addEventListener("input",da),document.getElementById("filter-category")?.addEventListener("change",da),document.getElementById("filter-sub")?.addEventListener("change",da),document.getElementById("filter-status")?.addEventListener("change",da),document.getElementById("add-equipment-form")?.addEventListener("submit",zl);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),Lr().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",Hl),t.addEventListener("keydown",Vl),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",Kl),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);Cl(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!Ga){mn=Ia(),Cn(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){w(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:ea(document.getElementById("edit-equipment-quantity").value)||1,price:Xa(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await Ol(t,n),mn=Ia(),Cn(!1),Br()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{Ul(),Ye(),ta();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(mn&&oi(mn),pn!=null){const a=ut()[pn];if(a){const i=Ja(a)[0]||a;Ya(i)}}Cn(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Ye(),Cn(Ga),pn!=null){const t=ut()[pn];if(t){const a=Ja(t)[0]||t;Ya(a)}}});document.addEventListener("equipment:refreshRequested",()=>{ta({showToastOnError:!1})});document.addEventListener(Hc.USER_UPDATED,()=>{Ye()});document.addEventListener("equipment:changed",()=>{Br()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{rn=null,_a(),pn=null,mn=null,Cn(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!Ri&&(document.addEventListener(Tn.change,()=>{Pr(),Ye()}),Ri=!0);const jp=Object.freeze(Object.defineProperty({__proto__:null,clearEquipment:Lr,refreshEquipmentFromApi:ta,renderEquipment:Ye,syncEquipmentStatuses:Bn,uploadEquipmentFromExcel:jl},Symbol.toStringTag,{value:"Module"})),Ql="__DEBUG_CREW__";function Gl(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(Ql);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function zi(e,t){if(Gl())try{console.log(`🪵 [crew-debug:create] ${e}`,t)}catch{}}const Fr="projects:create:draft",Dr="projects.html#projects-section";let Is=null,Rr=[],_s=new Map,ks=new Map,ka=new Map,bs=!1,ya=null,Oi=!1,Mr=[];function Wl(e){if(!e)return null;let t=Mr.find(a=>a.id===e)||null;if(t)return t;const n=Xs(e);return n?(t={id:e,name:Wc(n)||e,price:Gc(n),items:Gs(n),raw:n},t):null}function Ca(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function $a(e){return h(String(e||"")).trim().toLowerCase()}function Xl(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function zr(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function Or(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Hr(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Vr(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function yn(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function li(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function vn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function ct(){const{input:e,hidden:t}=vn();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function an(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const i=document.querySelector(`label[for="${e.id}"]`);i&&n.add(i)}const s=i=>{t()&&w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(i=>{!i||i.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(r=>{i.addEventListener(r,s,{capture:!0})}),i.dataset.linkedGuardAttached="true")})}function Kr(e,t,{allowPartial:n=!1}={}){const a=nt(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const i=[];return e.forEach((r,c)=>{c.includes(a)&&i.push(r)}),i.length===1?i[0]:null}function Cs(e,t={}){return Kr(_s,e,t)}function $s(e,t={}){return Kr(ks,e,t)}function lt(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function Ur(e){Rr=Array.isArray(e)?[...e]:[]}function di(){return Rr}function ui(e){return e&&di().find(t=>String(t.id)===String(e))||null}function Hi(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function $n(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??dn,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:dn}function gt(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??dn,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=dn),t.dataset.companyShare=String(s),t.checked=!0}function Ps(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(bs){ve();return}bs=!0;const a=()=>{bs=!1,ve()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(dn)),t.disabled){n.checked=!1,w(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),gt()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?gt():n.checked&&(n.checked=!1));a()}function Jl(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Vi(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function Ki(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function Tt({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=li();if(!n||!a||!s)return;const i=Qs()||[],r=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",r);const l=new Set;_s=new Map;const d=i.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:Ki(m)||c})).filter(m=>{if(!m.label)return!1;const p=nt(m.label);return!p||l.has(p)?!1:(l.add(p),_s.set(p,m),!0)}).sort((m,p)=>m.label.localeCompare(p.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(m=>`<option value="${Ca(m.label)}"></option>`).join("");const u=t?"":n.value,b=e?String(e):a.value?String(a.value):"",f=b?i.find(m=>String(m.id)===b):null;if(f){const m=Ki(f)||c;a.value=String(f.id),n.value=m,n.dataset.selectedId=String(f.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function Pn({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:i}=vn();if(!a||!s||!i)return;const r=Array.isArray(t)?t:di()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const l=[...r].filter(g=>g&&g.id!=null).sort((g,v)=>String(v.createdAt||v.start||"").localeCompare(String(g.createdAt||g.start||""))),d=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),b=new Set;ks=new Map;const f=l.map(g=>{const v=Hi(g)||u;return{id:String(g.id),label:v}}).filter(g=>{if(!g.label)return!1;const v=nt(g.label);return!v||b.has(v)?!1:(b.add(v),ks.set(v,g),!0)});i.innerHTML=f.map(g=>`<option value="${Ca(g.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",p=m?l.find(g=>String(g.id)===m):null;if(p){const g=Hi(p)||u;s.value=String(p.id),a.value=g,a.dataset.selectedId=String(p.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function Pa(e,t,n){const{date:a,time:s}=br(n),i=document.getElementById(e),r=document.getElementById(t);if(i){if(a)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"Y-m-d";i._flatpickr.setDate(a,!1,c)}else i.value=a;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}if(r){if(s)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"H:i";r._flatpickr.setDate(s,!1,c)}else r.value=s;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}}function Qr(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||Pn({selectedValue:a});const i=(Qs()||[]).find(u=>String(u.id)===String(e.clientId)),r=i?.id!=null?String(i.id):"";Tt(r?{selectedValue:r}:{selectedValue:"",resetInput:!0});const c=Vi(e,"start"),l=Vi(e,"end");c&&Pa("res-start","res-start-time",c),l&&Pa("res-end","res-end-time",l);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),ve(),Qt()}function Gr({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:ye(),s=Array.isArray(a)?a:[];Ur(s);const i=t!=null?String(t):n.value?String(n.value):"";Pn({selectedValue:i,projectsList:s}),Qt(),ve()}function Qt(){const{input:e,hidden:t}=vn(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),i=document.getElementById("res-payment-progress-type"),r=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),l=document.getElementById("res-discount-type"),d=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),b=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(an(n,ct),a&&an(a,ct)),s&&an(s,ct),i&&an(i,ct),r&&an(r,ct),c&&an(c,ct),l&&an(l,ct),b)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=d),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=d),s&&(s.value="unpaid",lt(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=d),i&&(i.value=i.value||"percent",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=d),r&&(r.value="",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=d),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=d),l&&(l.value="percent",l.disabled=!0,l.classList.add("reservation-input-disabled"),l.title=d);else{if(n){const f=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",f&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.disabled=!1,l.classList.remove("reservation-input-disabled"),l.title="")}Ps("tax"),ve()}function pi(){const{input:e,hidden:t}=vn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),i=s?$s(s,{allowPartial:a}):null;if(i){t.value=String(i.id),e.value=i.label,e.dataset.selectedId=String(i.id);const r=ui(i.id);r?Qr(r,{skipProjectSelectUpdate:!0}):(Qt(),ve())}else t.value="",e.dataset.selectedId="",Qt(),ve()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?$s(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function mi(){const{input:e,hidden:t}=li();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),i=s?Cs(s,{allowPartial:a}):null;i?(t.value=String(i.id),e.value=i.label,e.dataset.selectedId=String(i.id)):(t.value="",e.dataset.selectedId=""),ve()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Cs(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Yl(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){Vn({clearValue:!0});return}let n=null;try{const d=decodeURIComponent(t);n=JSON.parse(d)}catch(d){console.warn("⚠️ [reservations/createForm] Failed to decode project context",d)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),Vn({clearValue:!1}),!n)return;n.fromProjectForm&&(ya={draftStorageKey:n.draftStorageKey||Fr,returnUrl:n.returnUrl||Dr});const i=document.getElementById("res-project");if(n.projectId){i&&(Pn({selectedValue:String(n.projectId)}),Qt());const d=ui(n.projectId);d?Qr(d,{forceNotes:!!n.forceNotes}):ve(),Vn()}else{i&&Pn({selectedValue:""});const d=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");md(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),d)}n.start&&Pa("res-start","res-start-time",n.start),n.end&&Pa("res-end","res-end-time",n.end);const r=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(Qs()||[]).find(b=>String(b.id)===String(n.customerId));u?.id!=null&&(Tt({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),r&&(r.value=u.customerName||u.name||r.value))}else n.customerName&&r?(Tt({selectedValue:""}),r.value=n.customerName,r.dataset.selectedId="",c&&(c.value="")):Tt({selectedValue:""});const l=document.getElementById("res-notes");l&&n.description&&!l.value&&(l.value=n.description),ve()}function qn(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Wn(e,n),end:Wn(t,a)}}function Wr(e){const t=$a(e);if(t){const c=ka.get(t);if(c)return c}const{description:n,barcode:a}=zr(e);if(a){const c=Qa(a);if(c)return c}const s=nt(n||e);if(!s)return null;let i=gr();if(!i?.length){const c=ye();i=Array.isArray(c?.equipment)?c.equipment:[],i.length&&Sr(i)}const r=i.find(c=>nt(c?.desc||c?.description||"")===s);return r||i.find(c=>nt(c?.desc||c?.description||"").includes(s))||null}function Xr(e,t="equipment-description-options"){const n=$a(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(l=>$a(l.value)===n)||ka.has(n))return!0;const{description:s}=zr(e);if(!s)return!1;const i=nt(s);return i?(gr()||[]).some(c=>nt(c?.desc||c?.description||"")===i):!1}const Zl={available:0,reserved:1,maintenance:2,retired:3};function ed(e){return Zl[e]??5}function Ui(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function td(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${Ui(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${Ui(n)})`}function Gt(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=Bn(),a=ye(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],i=Array.isArray(s)?s:[];Sr(i);const r=new Map;i.forEach(d=>{const u=Xl(d),b=$a(u);if(!b||!u)return;const f=Ft(d),m=ed(f),p=r.get(b);if(!p){r.set(b,{normalized:b,value:u,bestItem:d,bestStatus:f,bestPriority:m,statuses:new Set([f])});return}p.statuses.add(f),m<p.bestPriority&&(p.bestItem=d,p.bestStatus=f,p.bestPriority=m,p.value=u)}),ka=new Map;const l=Array.from(r.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{ka.set(d.normalized,d.bestItem);const u=td(d),b=Ca(d.value);if(u===d.value)return`<option value="${b}"></option>`;const f=Ca(u);return`<option value="${b}" label="${f}"></option>`}).join("");e&&(e.innerHTML=l),t&&(t.innerHTML=l)}function Jr(e,t,n={}){const{silent:a=!1}=n,s=re(e);if(!s)return{success:!1,message:null};const{start:i,end:r}=qn();if(!i||!r){const p=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||w(p),{success:!1,message:p}}const c=It();if(fi(c).has(s)){const p=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||w(p),{success:!1,message:p}}const d=Ws(s,i,r);if(d.length){const p=d.map(v=>v.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${p}`);return a||w(g),{success:!1,message:g}}if(xt(s,i,r)){const p=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||w(p),{success:!1,message:p}}const u=Qa(s);if(!u){const p=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||w(p),{success:!1,message:p}}const b=Ft(u);if(b==="maintenance"||b==="retired"){const p=yn(b);return a||w(p),{success:!1,message:p}}const f=gn(u);if(!f){const p=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||w(p),{success:!1,message:p}}Ha({id:f,equipmentId:f,barcode:s,desc:u.desc,qty:1,price:u.price,image:hn(u)}),t&&(t.value=""),Dt(),ve();const m=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||w(m),{success:!0,message:m,barcode:s}}function Ls(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Wr(t);if(!n){w(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=wl(n.barcode),s=Ft(a||n);if(s==="maintenance"||s==="retired"){w(yn(s));return}const i=re(n.barcode);if(!i){w(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const r=gn(n);if(!r){w(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:r,equipmentId:r,barcode:i,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:hn(n)},{start:l,end:d}=qn();if(!l||!d){w(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=It();if(fi(u).has(i)){w(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const f=Ws(i,l,d);if(f.length){const m=f.map(p=>p.name).join(", ");w(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`));return}if(xt(i,l,d)){w(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}Ha(c),Dt(),ve(),w(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function nd(){Gt();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Ls(e))});const t=()=>{Xr(e.value,"equipment-description-options")&&Ls(e)};e.addEventListener("focus",()=>{if(Gt(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Qi(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function fi(e=It()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=re(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const i=re(s?.normalizedBarcode??s?.barcode);i&&t.add(i)})}),t}function ad(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=qn();if(!t||!n){w(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}bl({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):w(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(Tn.change,t=>{Qi(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),Qi(e,Cr()))}function sd(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,i=a.length?a:t.barcode?[t.barcode]:[];if(!i.length)return;let r=0,c=null;const l=[],d=new Set;i.forEach(b=>{const f=re(b);f&&!d.has(f)&&(d.add(f),l.push(f))});const u=Math.min(s,l.length);for(let b=0;b<u;b+=1){const f=l[b],m=Jr(f,null,{silent:!0});m.success&&(r+=1),m.message&&(c=m.message)}if(r>0){const f=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",h(String(r)));w(f)}else c&&w(c)}function Yr(){ad(),!(Oi||typeof document>"u")&&(document.addEventListener(Tn.requestAdd,sd),Oi=!0)}function na(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),i=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:i}}function Ns(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=na();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const i=document.getElementById("equipment-barcode"),r=document.getElementById("equipment-description"),c=t==="package";i&&(i.disabled=c),r&&(r.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),el(t),t==="package"&&es()}function es(){const{packageSelect:e,packageHint:t}=na();if(!e)return;const n=fr();Mr=n,Uc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,i=n.map(c=>{const l=Number.isFinite(Number(c.price))?Number(c.price):0,d=h(l.toFixed(2)),u=`${c.name} — ${d} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${i}`,e.selectedIndex=0;const r=n.length>0;e.disabled=!r,t&&(r?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),to()}function id(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:i,blockingPackages:r})=>{const c=i?.desc||h(String(i?.barcode??i?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(r)&&r.length){const l=r.map(d=>d.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${l})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function Zr(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const i=Xn(e);if(!i)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const r=Wl(i);if(!r)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(m=>m?.type==="package"&&Xn(m.packageId)===i))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(Qc(i,n,a,s)){const m=r.name||i;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${m} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(r.items)&&r.items.length?r.items:Gs(r.raw??{}),l=fi(t),d=[],u=new Set;if(c.forEach(m=>{const p=re(m?.normalizedBarcode??m?.barcode);if(p){if(u.has(p)){d.push({item:m,type:"internal"});return}u.add(p),l.has(p)&&d.push({item:m,type:"external"})}}),d.length){const m=d.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>h(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:d.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",m):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",m),duplicates:d}}const b=[];return c.forEach(m=>{const p=re(m?.normalizedBarcode??m?.barcode);if(p&&xt(p,n,a,s)){const g=Ws(p,n,a,s);b.push({item:m,blockingPackages:g})}}),b.length?{success:!1,reason:"item_conflict",message:id(r,b),conflicts:b}:{success:!0,package:{id:`package::${i}`,packageId:i,type:"package",desc:r.name||`Package ${i}`,qty:1,price:Number.isFinite(Number(r.price))?Number(r.price):0,barcode:r.code||r.raw?.package_code||`pkg-${i}`,packageItems:c.map(m=>({equipmentId:m?.equipmentId??null,barcode:m?.barcode??m?.normalizedBarcode??"",normalizedBarcode:re(m?.normalizedBarcode??m?.barcode),desc:m?.desc??"",qty:Number.isFinite(Number(m?.qty))?Number(m.qty):1,price:Number.isFinite(Number(m?.price))?Number(m.price):0})),image:c.find(m=>m?.image)?.image??null},packageInfo:r}}function eo(e,{silent:t=!1}={}){const n=Xn(e);if(!n)return t||w(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=qn(),i=It(),r=Zr(n,{existingItems:i,start:a,end:s});if(!r.success){if(!t){const l={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[r.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");w(r.message||l)}return r}return Ha(r.package),Dt(),ve(),t||w(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:r.package}}function to(){const{packageSelect:e}=na();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;eo(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function rd(){const{packageAddButton:e,packageSelect:t}=na();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){w(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}eo(n)}),e.dataset.listenerAttached="true")}function no(){const{modeRadios:e}=na();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&Ns(s.target.value)}),a.dataset.listenerAttached="true")}),rd(),to();const t=qa(),n=e.find(a=>a.value===t);n&&(n.checked=!0),Ns(t)}function Dt(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=It(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),i=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),l=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=Nn(n);t.innerHTML=d.map(u=>{const b=u.items[0]||{},f=hn(b)||u.image,m=f?`<img src="${f}" alt="${i}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',p=h(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,v=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,_=`${h(g.toFixed(2))} ${s}`,q=`${h(v.toFixed(2))} ${s}`,P=u.items.some(I=>I?.type==="package"),x=u.barcodes.map(I=>h(String(I||""))).filter(Boolean),O=x.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${x.map(I=>`<li>${I}</li>`).join("")}
            </ul>
          </details>`:"";let S="";if(P){const I=new Map;if(u.items.forEach(j=>{Array.isArray(j?.packageItems)&&j.packageItems.forEach(T=>{if(!T)return;const X=re(T.barcode||T.desc||Math.random()),C=I.get(X);if(C){C.qty+=Number.isFinite(Number(T.qty))?Number(T.qty):1;return}I.set(X,{desc:T.desc||T.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(T.qty))?Number(T.qty):1,barcode:T.barcode??T.normalizedBarcode??""})})}),I.size){const j=Array.from(I.values()).map(T=>{const X=h(String(T.qty)),C=T.desc||h(String(T.barcode||"")),D=T.barcode?` <span class="reservation-package-items__barcode">(${h(String(T.barcode))})</span>`:"";return`<li>${C}${D} × ${X}</li>`}).join("");S=`
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
                ${P?`${S||""}${O||""}`:O}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${c}" ${P?"disabled":""}>−</button>
              <span class="reservation-qty-value">${p}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${r}" ${P?"disabled":""}>+</button>
            </div>
          </td>
          <td>${_}</td>
          <td>${q}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${l}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function od(e){const t=It(),a=Nn(t).find(i=>i.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Jc(s),Dt(),ve())}function cd(e){const t=It(),n=t.filter(a=>Va(a)!==e);n.length!==t.length&&(hr(n),Dt(),ve())}function ld(e){const t=It(),a=Nn(t).find(b=>b.key===e);if(!a)return;const{start:s,end:i}=qn();if(!s||!i){w(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const r=new Set(t.map(b=>re(b.barcode))),{equipment:c=[]}=ye(),l=(c||[]).find(b=>{const f=re(b?.barcode);return!f||r.has(f)||Va({desc:b?.desc||b?.description||b?.name||"",price:Number(b?.price)||0})!==e||!$r(b)?!1:!xt(f,s,i)});if(!l){w(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=re(l.barcode),u=gn(l);if(!u){w(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}Ha({id:u,equipmentId:u,barcode:d,desc:l.desc||l.description||l.name||a.description||"",qty:1,price:Number.isFinite(Number(l.price))?Number(l.price):a.unitPrice,image:hn(l)}),Dt(),ve()}function ve(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,i=document.getElementById("res-tax"),r=e?!1:i?.checked||!1,c=document.getElementById("res-payment-status"),l=c?.value||"unpaid",{start:d,end:u}=qn();r&&gt();const b=$n(),f=document.getElementById("res-payment-progress-type"),m=document.getElementById("res-payment-progress-value"),p=Or(f),g=Hr(m);yr(),Fi({selectedItems:It(),discount:n,discountType:s,applyTax:r,paidStatus:l,paymentProgressType:p,paymentProgressValue:g,start:d,end:u,companySharePercent:b,paymentHistory:[]});const v=Fi.lastResult;v?(Vr(m,v.paymentProgressValue),c&&(c.value=v.paymentStatus,lt(c,v.paymentStatus))):lt(c,l)}function dd(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=h(c.target.value),ve()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",ve),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(ct()){n.checked=!1,w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ps("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(ct()){a.checked=!1,w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ps("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(ct()){s.value="unpaid",lt(s,"unpaid"),w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}lt(s),ve()}),s.dataset.listenerAttached="true");const i=document.getElementById("res-payment-progress-type");i&&!i.dataset.listenerAttached?(i.dataset.userSelected!=="true"&&(i.value="percent"),i.addEventListener("change",c=>{if(ct()){i.value="percent",w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}i.dataset.userSelected="true",ve()}),i.dataset.listenerAttached="true"):i&&i.dataset.userSelected!=="true"&&!i.value&&(i.value="percent");const r=document.getElementById("res-payment-progress-value");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",c=>{if(ct()){r.value="",w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=h(c.target.value),ve()}),r.dataset.listenerAttached="true"),ve()}function ud(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){ve();return}const i=t.dataset.syncedWithStart;(!t.value?.trim()||i!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),ve()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Gi(){const{input:e,hidden:t}=li(),{input:n,hidden:a}=vn(),{customers:s}=ye();let i=t?.value?String(t.value):"";if(!i&&e?.value){const Y=Cs(e.value,{allowPartial:!0});Y&&(i=String(Y.id),t&&(t.value=i),e.value=Y.label,e.dataset.selectedId=i)}const r=s.find(Y=>String(Y.id)===i);if(!r){w(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=r.id;let l=a?.value?String(a.value):"";if(!l&&n?.value){const Y=$s(n.value,{allowPartial:!0});Y&&(l=String(Y.id),a&&(a.value=l),n.value=Y.label,n.dataset.selectedId=l)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,b=document.getElementById("res-start-time")?.value||"00:00",f=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){w(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${d}T${b}`,p=`${u}T${f}`,g=new Date(m),v=new Date(p);if(Number.isNaN(g.getTime())||Number.isNaN(v.getTime())||g>=v){w(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const _=yr();_.map(Y=>Y.technicianId).filter(Boolean);const q=It();if(q.length===0&&_.length===0){w(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const P=document.getElementById("res-notes")?.value||"",x=parseFloat(h(document.getElementById("res-discount")?.value))||0,O=document.getElementById("res-discount-type")?.value||"percent",S=document.getElementById("res-payment-status"),I=S?.value||"unpaid",j=document.getElementById("res-payment-progress-type"),T=document.getElementById("res-payment-progress-value"),X=Or(j),C=Hr(T),D=l?ui(l):null,W=Jl(D);if(l&&!D){w(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const Y of q){const ce=Ft(Y.barcode);if(ce==="maintenance"||ce==="retired"){w(yn(ce));return}}for(const Y of q){const ce=re(Y.barcode);if(xt(ce,m,p)){w(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const Y of _)if(Y?.technicianId&&vr(Y.technicianId,m,p)){w(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const B=document.getElementById("res-tax"),F=document.getElementById("res-company-share"),N=!!l;N?(B&&(B.checked=!1,B.disabled=!0,B.classList.add("disabled"),B.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),F&&(F.checked=!1,F.disabled=!0,F.classList.add("disabled"),F.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),S&&(S.value="unpaid",S.disabled=!0,lt(S,"unpaid"),S.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),j&&(j.disabled=!0,j.classList.add("disabled")),T&&(T.value="",T.disabled=!0,T.classList.add("disabled"))):(B&&(B.disabled=!1,B.classList.remove("disabled"),B.title=""),F&&(F.disabled=!1,F.classList.remove("disabled"),F.title=""),S&&(S.disabled=!1,S.title=""),j&&(j.disabled=!1,j.classList.remove("disabled")),T&&(T.disabled=!1,T.classList.remove("disabled")));const H=N?!1:B?.checked||!1,Q=!!F?.checked;if(!N&&Q!==H){w(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let z=Q?$n():null;Q&&(!Number.isFinite(z)||z<=0)&&(gt(),z=$n());const J=Q&&H&&Number.isFinite(z)&&z>0;H&&gt();const M=Js(q,x,O,H,_,{start:m,end:p,companySharePercent:J?z:0}),K=Vc(),V=Ys({totalAmount:M,progressType:X,progressValue:C,history:[]});T&&Vr(T,V.paymentProgressValue);const te=[];V.paymentProgressValue!=null&&V.paymentProgressValue>0&&te.push({type:V.paymentProgressType||X,value:V.paymentProgressValue,amount:V.paidAmount,percentage:V.paidPercent,recordedAt:new Date().toISOString()});const me=Zs({manualStatus:I,paidAmount:V.paidAmount,paidPercent:V.paidPercent,totalAmount:M});S&&(S.value=me,lt(S,me));const oe=typeof D?.paymentStatus=="string"?D.paymentStatus.toLowerCase():null,be=oe&&["paid","partial","unpaid"].includes(oe)?oe:"unpaid",ke=qr({reservationCode:K,customerId:c,start:m,end:p,status:W?"confirmed":"pending",title:null,location:null,notes:P,projectId:l||null,totalAmount:M,discount:N?0:x,discountType:N?"percent":O,applyTax:H,paidStatus:N?be:me,confirmed:W,items:q.map(Y=>({...Y,equipmentId:Y.equipmentId??Y.id})),crewAssignments:_,companySharePercent:N||!J?null:z,companyShareEnabled:N?!1:J,paidAmount:N?0:V.paidAmount,paidPercentage:N?0:V.paidPercent,paymentProgressType:N?null:V.paymentProgressType,paymentProgressValue:N?null:V.paymentProgressValue,paymentHistory:N?[]:te});try{zi("about to submit",{crewAssignments:_,techniciansPayload:ke?.technicians,payload:ke});const Y=await Yc(ke);zi("server response",{reservation:Y?.id??Y?.reservationId??Y?.reservation_code,technicians:Y?.technicians,crewAssignments:Y?.crewAssignments,techniciansDetails:Y?.techniciansDetails}),Bn(),Gt(),un(),fd(),w(o("reservations.toast.created","✅ تم إنشاء الحجز"));try{const ce=document.getElementById("sub-tab-trigger-my-reservations-tab");ce&&typeof ce.click=="function"&&setTimeout(()=>ce.click(),0)}catch{}typeof Is=="function"&&Is({type:"created",reservation:Y}),pd(Y)}catch(Y){console.error("❌ [reservations/createForm] Failed to create reservation",Y);const ce=Ka(Y)?Y.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");w(ce,"error"),N&&(w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),Vn({clearValue:!1}))}}function pd(e){if(!ya)return;const{draftStorageKey:t=Fr,returnUrl:n=Dr}=ya,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),i=s?JSON.parse(s)||{}:{},r=Array.isArray(i.linkedReservationIds)?i.linkedReservationIds:[],c=String(a);r.includes(c)||r.push(c),i.linkedReservationIds=r,window.sessionStorage.setItem(t,JSON.stringify(i))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}ya=null,n&&(window.location.href=n)}function Vn({clearValue:e=!1}={}){const{input:t,hidden:n}=vn();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,Qt())}function md(e,t=""){const{input:n,hidden:a}=vn();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),Qt())}function fd(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),Tt({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),Vn({clearValue:!1}),Pn({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const i=document.getElementById("res-payment-status");i&&(i.value="unpaid",lt(i,"unpaid"));const r=document.getElementById("res-payment-progress-type");r&&(r.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),Zc(),hr([]),wa("form-reset"),Dt(),Qt(),ve()}function yd(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){od(s);return}if(a==="increase-group"&&s){ld(s);return}if(a==="remove-group"&&s){cd(s);return}}),e.dataset.listenerAttached="true")}function bd(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(qa()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,Jr(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||qa()!=="single")return;const{start:i,end:r}=qn();!i||!r||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function gd(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Gi()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Gi()}),t.dataset.listenerAttached="true")}function Tp({onAfterSubmit:e}={}){Is=typeof e=="function"?e:null;const{customers:t,projects:n}=ye();Xc(t||[]),Tt(),mi(),Ur(n||[]),Gr({projectsList:n}),pi(),Gt(),es(),nd(),Yr(),no(),ud(),dd(),yd(),bd(),gd(),Yl(),ve(),Dt()}function ao(){Gt(),es(),Gr(),Tt(),mi(),pi(),Yr(),no(),Dt(),ve()}if(typeof document<"u"){const e=()=>{Tt(),Pn({projectsList:di()}),mi(),pi(),ve()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{Gt()}),document.addEventListener("packages:changed",()=>{es(),qa()==="package"&&Ns("package")})}typeof window<"u"&&(window.getCompanySharePercent=$n);function so(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:sn(t),endDate:sn(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const i=new Date(n);return i.setDate(n.getDate()+6),{startDate:sn(n),endDate:sn(i)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:sn(n),endDate:sn(a)}}return e==="upcoming"?{startDate:sn(t),endDate:""}:{startDate:"",endDate:""}}function hd(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let i=h(t?.value||"").trim(),r=h(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),La(t),La(n),i="",r=""),!i&&!r&&c){const d=so(c);i=d.startDate,r=d.endDate}return{searchTerm:nt(e?.value||""),startDate:i,endDate:r,status:s?.value||"",quickRange:c}}function Bp(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),s.dataset.listenerAttached="true");const i=document.getElementById("reservation-date-range");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>{vd(i.value),t()}),i.dataset.listenerAttached="true");const r=document.getElementById("reservation-status-filter");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",t),r.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),La(a),La(s),i&&(i.value=""),r&&(r.value=""),t()}),c.dataset.listenerAttached="true")}function vd(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=so(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function sn(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function La(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function ua(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function qd(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function Sd(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=qd(n);if(a!==null)return a}return null}function Wi(e,t=0){const n=Sd(e);if(n!=null)return n;const a=ua(e.createdAt??e.created_at);if(a!=null)return a;const s=ua(e.updatedAt??e.updated_at);if(s!=null)return s;const i=ua(e.start);if(i!=null)return i;const r=ua(e.end);if(r!=null)return r;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function Ed({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const i=e.map((q,P)=>({reservation:q,index:P})),r=t.searchTerm||"",c=t.searchReservationId||"",l=t.searchCustomerName||"",d=t.searchProjectId||"",u=t.startDate||"",b=t.endDate||"",f=t.status||"",m=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,p=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,v=b?new Date(`${b}T23:59:59`):null,_=i.filter(({reservation:q})=>{const P=n.get(String(q.customerId)),x=s?.get?.(String(q.projectId)),O=q.start?new Date(q.start):null,S=ei(q),{effectiveConfirmed:I}=Wt(q,x);if(m!=null&&String(q.customerId)!==String(m)||p!=null&&!(Array.isArray(q.technicians)?q.technicians.map(D=>String(D)):[]).includes(String(p))||f==="confirmed"&&!I||f==="pending"&&I||f==="completed"&&!S)return!1;if(f==="cancelled"){const C=String(q?.status||q?.reservationStatus||"").toLowerCase();if(!["cancelled","canceled"].includes(C))return!1}if(g&&O&&O<g||v&&O&&O>v)return!1;if(c){const C=[q.reservationId,q.id,q.reservation_id,q.reservationCode,q.reservation_code,q.code,q.reference,q.referenceNumber,q.reference_number],D=nt(C.filter(B=>B!=null&&B!=="").map(String).join(" ")).replace(/\s+/g,""),W=c.replace(/\s+/g,"");if(!D.includes(W))return!1}if(l&&!nt(P?.customerName||"").includes(l))return!1;if(d){const C=[q.projectId,q.project_id,q.projectID,x?.id,x?.projectCode,x?.project_code],D=nt(C.filter(B=>B!=null&&B!=="").map(String).join(" ")).replace(/\s+/g,""),W=d.replace(/\s+/g,"");if(!D.includes(W))return!1}if(!r)return!0;const j=q.items?.map?.(C=>`${C.barcode} ${C.desc}`).join(" ")||"",T=(q.technicians||[]).map(C=>a.get(String(C))?.name).filter(Boolean).join(" ");return nt([q.reservationId,P?.customerName,q.notes,j,T,x?.title].filter(Boolean).join(" ")).includes(r)});return _.sort((q,P)=>{const x=Wi(q.reservation,q.index),O=Wi(P.reservation,P.index);return x!==O?O-x:P.index-q.index}),_}function wd({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),i=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),r=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),l=o("reservations.list.itemsCountShort","{count} عنصر"),d=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),b=o("reservations.list.status.pending","⏳ غير مؤكد"),f=o("reservations.list.status.completed","📁 منتهي"),m=o("reservations.list.payment.paid","💳 مدفوع"),p=o("reservations.list.payment.unpaid","💳 غير مدفوع"),g=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),v=o("reservations.list.actions.confirm","✔️ تأكيد"),_=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),q=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),P={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 الإجمالي النهائي"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:x,index:O})=>{const S=t.get(String(x.customerId)),I=x.projectId?a?.get?.(String(x.projectId)):null,j=ei(x),T=typeof I?.paymentStatus=="string"?I.paymentStatus.toLowerCase():null,X=x.paidStatus??x.paid_status??(x.paid===!0||x.paid==="paid"?"paid":"unpaid"),C=T&&["paid","partial","unpaid"].includes(T)?T:X,D=C==="paid",W=C==="partial",{effectiveConfirmed:B,projectLinked:F}=Wt(x,I),N=B?"status-confirmed":"status-pending",H=D?"status-paid":W?"status-partial":"status-unpaid";let Q=`<span class="reservation-chip status-chip ${N}">${B?u:b}</span>`;const z=D?m:W?g:p;let J=`<span class="reservation-chip status-chip ${H}">${z}</span>`,M=D?" tile-paid":W?" tile-partial":" tile-unpaid";j&&(M+=" tile-completed");let K="";j&&(Q=`<span class="reservation-chip status-chip status-completed">${f}</span>`,J=`<span class="reservation-chip status-chip status-completed">${z}</span>`,K=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);let V=!F&&!B?`<button class="tile-confirm" data-reservation-index="${O}" data-action="confirm">${v}</button>`:"";{const k=String(x?.status||x?.reservationStatus||"").toLowerCase();(k==="cancelled"||k==="canceled")&&(Q=`<span class="reservation-chip status-chip status-cancelled">${o("reservations.list.status.cancelled","❌ ملغي")}</span>`,M=" tile-cancelled",K="",typeof V<"u"&&(V=""))}const te=V?`<div class="tile-actions">${V}</div>`:"",me=x.items?.length||0,oe=Array.isArray(x.crewAssignments)?x.crewAssignments:[],be=(x.technicians||[]).map(k=>n.get(String(k))).filter(Boolean),ke=oe.length?oe.map(k=>{const ee=k.positionLabel??k.position_name??k.role??o("reservations.crew.positionFallback","منصب بدون اسم"),A=k.technicianName??n.get(String(k.technicianId??""))?.name??null;return A?`${h(ee)} (${h(A)})`:h(ee)}):be.map(k=>k.name),Y=ke.length?ke.join(d):"—",ce=h(String(x.reservationId??"")),Se=x.start?h(dt(x.start)):"-",Ee=x.end?h(dt(x.end)):"-",He=h(String(x.cost??0)),Ve=h(String(me)),Ce=x.notes?h(x.notes):c,xe=l.replace("{count}",Ve),Ie=x.applyTax?`<small>${i}</small>`:"";let R=_;return x.projectId&&(R=I?.title?h(I.title):q),`
      <div class="${V?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${M}"${K} data-reservation-index="${O}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${ce}</div>
          <div class="tile-badges">
            ${Q}
            ${J}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${P.client}</span>
            <span class="tile-value">${S?.customerName||r}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${P.project}</span>
            <span class="tile-value">${R}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${P.start}</span>
            <span class="tile-value tile-inline">${Se}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${P.end}</span>
            <span class="tile-value tile-inline">${Ee}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${P.cost}</span>
            <span class="tile-value">${He} ${s} ${Ie}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${P.equipment}</span>
            <span class="tile-value">${xe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${P.crew}</span>
            <span class="tile-value">${ke.length?Y:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${Ce}</span>
          </div>
        </div>
        ${te}
      </div>
    `}).join("")}function We(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function gs(e){if(e==null)return"";const t=String(e).trim();return t?h(t):""}function Xi(e,t,n=[],a,s=null){const{projectLinked:i,effectiveConfirmed:r}=Wt(e,s),c=e.paid===!0||e.paid==="paid",l=ei(e),d=e.items||[];let{groups:u}=ti(e);const b=y=>!!(y&&typeof y=="object"&&(y.type==="package"||Array.isArray(y.packageItems)&&y.packageItems.length||Array.isArray(y.items)&&y.items.some(U=>U&&U.type==="package"))),f=y=>{const U=(y?.package_code??y?.packageDisplayCode??y?.barcode??y?.description??(Array.isArray(y?.items)&&y.items[0]?.barcode)??"").toString().trim().toLowerCase();return h(U)},m=(y,U)=>{const se=$e=>{const De=Array.isArray($e?.items)?$e.items[0]:null,je=[De?.price,De?.unit_price,De?.unitPrice,$e?.unitPrice,$e?.totalPrice];for(const Mt of je){const Ge=Me(Mt);if(Number.isFinite(Ge)&&Ge>0)return Ge}return 0},ge=se(y),qe=se(U);return ge&&qe?ge<=qe?y:U:ge?y:U},p=[],g=new Map;u.forEach(y=>{if(!b(y)){p.push(y);return}const U=f(y);if(!U){if(!g.has("__unknown__"))g.set("__unknown__",p.length),p.push(y);else{const se=g.get("__unknown__");p[se]=m(p[se],y)}return}if(!g.has(U))g.set(U,p.length),p.push(y);else{const se=g.get(U);p[se]=m(p[se],y)}}),u=p;const{technicians:v=[]}=ye(),_=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(v)?v:[]),q=new Map;_.forEach(y=>{if(!y||y.id==null)return;const U=String(y.id),se=q.get(U)||{};q.set(U,{...se,...y})});const x=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(y=>({technicianId:y}))).map((y,U)=>{const se=y?.technicianId!=null?q.get(String(y.technicianId)):null;let ge=y.positionLabel??y.position_name??y.position_label??y.role??y.position??"";(!ge||ge.trim()==="")&&(ge=y.positionLabelAr??y.position_label_ar??y.positionLabelEn??y.position_label_en??y.position_name_ar??y.position_name_en??"");const qe=y.positionLabelAlt??y.position_label_alt??y.positionLabelEn??y.position_label_en??y.positionLabelAr??y.position_label_ar??"";let $e=ge,De=qe;if(!$e||$e.trim()==="")try{const Ge=Ot?Ot():[];let ie=null;if(y.positionId!=null&&(ie=Ge.find(Te=>String(Te.id)===String(y.positionId))||null),!ie){const Te=y.positionKey??y.position_key??y.positionName??y.position_name??y.position??"";if(Te&&(ie=typeof Sa=="function"?Sa(Te):null,!ie&&Ge.length)){const mt=String(Te).trim().toLowerCase();ie=Ge.find(ft=>[ft.name,ft.labelAr,ft.labelEn].filter(Boolean).map(zt=>String(zt).toLowerCase()).includes(mt))||null}}ie&&($e=ie.labelAr||ie.labelEn||ie.name||"",(!De||String(De).trim()==="")&&(ie.labelAr&&ie.labelEn?De=$e===ie.labelAr?ie.labelEn:ie.labelAr:De=ie.labelAr||ie.labelEn||""))}catch{}const je=Ae(Me(y.positionCost??y.position_cost??y.cost??y.daily_wage??y.dailyWage??se?.dailyWage??se?.wage??0)),Mt=Ae(Me(y.positionClientPrice??y.position_client_price??y.client_price??y.clientPrice??y.daily_total??y.dailyTotal??y.total??se?.dailyTotal??se?.total??se?.total_wage??0));return{assignmentId:y.assignmentId??y.assignment_id??`crew-${U}`,positionId:y.positionId??y.position_id??null,positionKey:y.positionKey??y.position_key??y.positionName??y.position_name??y.position??null,positionLabel:$e,positionLabelAlt:De,positionLabelAr:y.positionLabelAr??y.position_label_ar??null,positionLabelEn:y.positionLabelEn??y.position_label_en??null,positionCost:je,positionClientPrice:Mt,technicianId:y.technicianId!=null?String(y.technicianId):se?.id!=null?String(se.id):null,technicianName:y.technicianName??y.technician_name??se?.name??null,technicianRole:y.technicianRole??se?.role??null,technicianPhone:y.technicianPhone??se?.phone??null,notes:y.notes??null}}),O=bn(),S=Ua(e.start,e.end),I=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,j=Me(I),T=Number.isFinite(j)?j:0,X=e.discountType??e.discount_type??e.discountMode??"percent",C=String(X).toLowerCase()==="amount"?"amount":"percent",D=i?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),W=Me(e.cost??e.total??e.finalTotal),B=Number.isFinite(W),F=B?Ae(W):0,N=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,H=N!=null?Me(N):Number.NaN,J=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(H)&&H>0)&&Number.isFinite(H)?H:0,M=Er({items:d,technicianIds:e.technicians||[],crewAssignments:x,discount:T,discountType:C,applyTax:D,start:e.start,end:e.end,companySharePercent:J}),K=Ae(M.equipmentTotal),V=Ae(M.crewTotal);Ae(M.crewCostTotal);const te=Ae(M.discountAmount),me=Ae(M.subtotalAfterDiscount),oe=Number.isFinite(M.companySharePercent)?M.companySharePercent:0;let be=Ae(M.companyShareAmount);be=oe>0?Ae(Math.max(0,be)):0;const ke=Ae(M.taxAmount),Y=Ae(M.finalTotal),ce=i?Y:B?F:Y,Se=Ae(M.netProfit),Ee=h(String(e.reservationId??e.id??"")),He=e.start?h(dt(e.start)):"-",Ve=e.end?h(dt(e.end)):"-",Ce=h(String(x.length)),xe=h(K.toFixed(2)),Ie=h(te.toFixed(2)),R=h(me.toFixed(2)),ne=h(ke.toFixed(2)),k=h((Number.isFinite(ce)?ce:0).toFixed(2)),ee=h(String(S)),A=o("reservations.create.summary.currency","SR"),ae=o("reservations.details.labels.discount","الخصم"),G=o("reservations.details.labels.tax","الضريبة (15%)"),fe=o("reservations.details.labels.crewTotal","إجمالي الفريق"),we=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),_e=o("reservations.details.labels.duration","عدد الأيام"),Ze=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),Ke=o("reservations.details.labels.netProfit","💵 صافي الربح"),Ue=o("reservations.create.equipment.imageAlt","صورة"),Qe={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},st=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),vt=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");o("reservations.details.technicians.roleUnknown","غير محدد");const en=o("reservations.details.technicians.phoneUnknown","غير متوفر");o("reservations.details.technicians.wage","{amount} {currency} / اليوم");const Ne=o("reservations.list.status.confirmed","✅ مؤكد"),Xe=o("reservations.list.status.pending","⏳ غير مؤكد"),kt=o("reservations.list.payment.paid","💳 مدفوع"),$=o("reservations.list.payment.unpaid","💳 غير مدفوع"),le=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),ue=o("reservations.list.status.completed","📁 منتهي"),Fe=o("reservations.details.labels.id","🆔 رقم الحجز"),it=o("reservations.details.section.bookingInfo","بيانات الحجز"),Ct=o("reservations.details.section.paymentSummary","ملخص الدفع"),rt=o("reservations.details.labels.finalTotal","المجموع النهائي"),ia=o("reservations.details.section.crew","😎 الفريق الفني"),ra=o("reservations.details.crew.count","{count} عضو"),cs=o("reservations.details.section.items","📦 المعدات المرتبطة"),Sn=o("reservations.details.items.count","{count} عنصر"),Re=o("reservations.details.actions.edit","✏️ تعديل"),et=o("reservations.details.actions.delete","🗑️ حذف"),tn=o("reservations.details.labels.customer","العميل"),$t=o("reservations.details.labels.contact","رقم التواصل"),oa=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const dc=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),uc=o("reservations.details.actions.openProject","📁 فتح المشروع"),pc=o("reservations.details.labels.start","بداية الحجز"),mc=o("reservations.details.labels.end","نهاية الحجز"),fc=o("reservations.details.labels.notes","ملاحظات"),yc=o("reservations.list.noNotes","لا توجد ملاحظات"),bc=o("reservations.details.labels.itemsCount","عدد المعدات"),gc=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),hc=o("reservations.paymentHistory.title","سجل الدفعات"),vc=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),qc=o("reservations.list.unknownCustomer","غير معروف"),ls=typeof s?.paymentStatus=="string"?s.paymentStatus.toLowerCase():null,ca=i&&ls&&["paid","partial","unpaid"].includes(ls)?ls:e.paidStatus??e.paid_status??(c?"paid":"unpaid"),ds=ca==="partial",$i=ca==="paid"?kt:ds?le:$;function us(y){if(y==null)return Number.NaN;if(typeof y=="number")return Number.isFinite(y)?y:Number.NaN;const U=String(y).replace(/[^0-9.+-]/g,""),se=Number(U);return Number.isFinite(se)?se:Number.NaN}const la=(y={})=>{const U=String(y.type??y.kind??y.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(U)||Array.isArray(y.packageItems)&&y.packageItems.length)},Sc=(y={})=>[y.packageId,y.package_id,y.packageCode,y.package_code,y.bundleId,y.bundle_id].some(U=>U!=null&&U!==""),Ec=(y={})=>!y||typeof y!="object"?!1:!la(y)&&Sc(y),wc=(y={})=>{const U=la(y),se=[{value:y.qty,key:"qty",limit:999},{value:y.quantity,key:"quantity",limit:999},{value:y.units,key:"units",limit:999},{value:y.count,key:"count",limit:50},{value:y.package_quantity,key:"package_quantity",limit:999},{value:y.packageQty,key:"packageQty",limit:999},{value:y.packageCount,key:"packageCount",limit:999}];let ge=NaN;for(const qe of se){if(qe.value==null||qe.value==="")continue;const $e=typeof qe.value=="string"?qe.value.trim():String(qe.value??"");if(qe.key==="count"&&$e.length>6)continue;const De=us(qe.value);if(!Number.isFinite(De)||De<=0)continue;const je=Math.round(De);if(!(je>qe.limit)){ge=Math.max(1,je);break}}return(!Number.isFinite(ge)||ge<=0)&&(ge=1),U?Math.max(1,Math.min(99,ge)):Math.max(1,Math.min(9999,ge))};let En=(Array.isArray(d)?d:[]).filter(y=>y&&typeof y=="object"&&!Ec(y)).reduce((y,U)=>y+wc(U),0);(!Number.isFinite(En)||En<=0)&&(En=Array.isArray(u)&&u.length?u.length:(Array.isArray(d)?d.length:0)||1),En=Math.max(1,Math.round(En));const Ac=h(String(En)),Pi=Sn.replace("{count}",Ac),xc=ra.replace("{count}",Ce),Ic=e.notes?h(e.notes):yc,_c=h(V.toFixed(2)),kc=h(String(oe)),Cc=h(be.toFixed(2)),$c=`${kc}% (${Cc} ${A})`,Pc=Number.isFinite(Se)?Math.max(0,Se):0,Lc=h(Pc.toFixed(2)),Rt=[{icon:"💼",label:gc,value:`${xe} ${A}`}];Rt.push({icon:"😎",label:fe,value:`${_c} ${A}`}),te>0&&Rt.push({icon:"💸",label:ae,value:`${Ie} ${A}`}),Rt.push({icon:"📊",label:we,value:`${R} ${A}`}),D&&ke>0&&Rt.push({icon:"🧾",label:G,value:`${ne} ${A}`}),oe>0&&Rt.push({icon:"🏦",label:Ze,value:$c}),Rt.push({icon:"💵",label:Ke,value:`${Lc} ${A}`}),Rt.push({icon:"💰",label:rt,value:`${k} ${A}`});const Nc=Rt.map(({icon:y,label:U,value:se})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${y} ${U}</span>
      <span class="summary-details-value">${se}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let ot=[];i&&s&&(Array.isArray(s.paymentHistory)?ot=s.paymentHistory:Array.isArray(s.payment_history)?ot=s.payment_history:Array.isArray(s.payments)?ot=s.payments:Array.isArray(s.paymentLogs)&&(ot=s.paymentLogs)),(!Array.isArray(ot)||ot.length===0)&&(Array.isArray(e.paymentHistory)?ot=e.paymentHistory:Array.isArray(e.payment_history)?ot=e.payment_history:Array.isArray(e.paymentLogs)?ot=e.paymentLogs:ot=[]);const Li=Array.isArray(ot)?ot:[],jc=Li.length?`<ul class="reservation-payment-history-list">${Li.map(y=>{const U=y?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):y?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),se=Number.isFinite(Number(y?.amount))&&Number(y.amount)>0?`${h(Number(y.amount).toFixed(2))} ${A}`:"—",ge=Number.isFinite(Number(y?.percentage))&&Number(y.percentage)>0?`${h(Number(y.percentage).toFixed(2))}%`:"—",qe=y?.recordedAt?h(dt(y.recordedAt)):"—",$e=y?.note?`<div class="payment-history-note">${We(h(y.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${We(U)}</span>
              <span class="payment-history-entry__amount">${se}</span>
              <span class="payment-history-entry__percent">${ge}</span>
              <span class="payment-history-entry__date">${qe}</span>
            </div>
            ${$e}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${We(vc)}</div>`,Ni=String(e?.status||e?.reservationStatus||"").toLowerCase(),ji=Ni==="cancelled"||Ni==="canceled",Ti=ji?[{text:o("reservations.list.status.cancelled","❌ ملغي"),className:"status-cancelled"},{text:$i,className:ca==="paid"?"status-paid":ds?"status-partial":"status-unpaid"}]:[{text:r?Ne:Xe,className:r?"status-confirmed":"status-pending"},{text:$i,className:ca==="paid"?"status-paid":ds?"status-partial":"status-unpaid"}];l&&!ji&&Ti.push({text:ue,className:"status-completed"});const Tc=Ti.map(({text:y,className:U})=>`<span class="status-chip ${U}">${y}</span>`).join(""),nn=(y,U,se)=>`
    <div class="res-info-row">
      <span class="label">${y} ${U}</span>
      <span class="value">${se}</span>
    </div>
  `;let ps="";if(e.projectId){let y=We(dc);if(s){const U=s.title||o("projects.fallback.untitled","مشروع بدون اسم");y=`${We(U)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${We(uc)}</button>`}ps=`
      <div class="res-info-row">
        <span class="label">📁 ${oa}</span>
        <span class="value">${y}</span>
      </div>
    `}const Pt=[];Pt.push(nn("👤",tn,t?.customerName||qc)),Pt.push(nn("📞",$t,t?.phone||"—")),Pt.push(nn("🗓️",pc,He)),Pt.push(nn("🗓️",mc,Ve)),Pt.push(nn("📦",bc,Pi)),Pt.push(nn("⏱️",_e,ee)),Pt.push(nn("📝",fc,Ic)),ps&&Pt.push(ps);const Bc=Pt.join(""),Fc=u.length?u.map(y=>{const U=y.items[0]||{},se=hn(U)||y.image,ge=se?`<img src="${se}" alt="${Ue}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let qe=[];if(Array.isArray(y.packageItems)&&y.packageItems.length)qe=[...y.packageItems];else{const he=[];y.items.forEach(Pe=>{Array.isArray(Pe?.packageItems)&&Pe.packageItems.length&&he.push(...Pe.packageItems)}),qe=he}if(Array.isArray(qe)&&qe.length>1){const he=new Set;qe=qe.filter(Pe=>{const de=Pe?.normalizedBarcode&&String(Pe.normalizedBarcode).toLowerCase()||Pe?.barcode&&String(Pe.barcode).toLowerCase()||(Pe?.equipmentId!=null?`id:${Pe.equipmentId}`:null);return de?he.has(de)?!1:(he.add(de),!0):!0})}const $e=la(y)||y.items.some(he=>la(he))||qe.length>0,De=(he,{fallback:Pe=1,max:de=1e3}={})=>{const Le=us(he);return Number.isFinite(Le)&&Le>0?Math.min(de,Le):Pe};let je;if($e){const he=De(U?.qty??U?.quantity??U?.count,{fallback:NaN,max:999});Number.isFinite(he)&&he>0?je=he:je=De(y.quantity??y.count??1,{fallback:1,max:999})}else je=De(y.quantity??y.count??U?.qty??U?.quantity??U?.count??0,{fallback:1,max:9999});const Mt=h(String(je)),Ge=(he,{preferPositive:Pe=!1}={})=>{let de=Number.NaN;for(const Le of he){const St=Me(Le);if(Number.isFinite(St)){if(Pe&&St>0)return St;Number.isFinite(de)||(de=St)}}return de};let ie,Te;if($e){const he=[U?.price,U?.unit_price,U?.unitPrice,y.unitPrice];if(ie=Ge(he,{preferPositive:!0}),!Number.isFinite(ie)||ie<0){const de=Me(y.totalPrice??U?.total??U?.total_price);Number.isFinite(de)&&je>0&&(ie=de/je)}Number.isFinite(ie)||(ie=0);const Pe=[U?.total,U?.total_price,y.totalPrice];if(Te=Ge(Pe),!Number.isFinite(Te))Te=ie*je;else{const de=ie*je;Number.isFinite(de)&&de>0&&Math.abs(Te-de)>de*.25&&(Te=de)}}else{const he=[U?.price,U?.unit_price,U?.unitPrice,y.unitPrice];if(ie=Ge(he,{preferPositive:!0}),!Number.isFinite(ie)||ie<0){const Pe=Me(y.totalPrice??U?.total??U?.total_price);Number.isFinite(Pe)&&je>0&&(ie=Pe/je)}Number.isFinite(ie)||(ie=0),Te=Me(y.totalPrice??U?.total??U?.total_price),Number.isFinite(Te)||(Te=ie*je)}ie=Ae(ie),Te=Ae(Te);const mt=`${h(ie.toFixed(2))} ${A}`,ft=`${h(Te.toFixed(2))} ${A}`,zt=y.barcodes.map(he=>h(String(he||""))).filter(Boolean),yt=zt.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${zt.map(he=>`<li>${he}</li>`).join("")}
              </ul>
            </details>`:"";let qt="";if(qe.length){const he=new Map,Pe=de=>{const Le=us(de?.qtyPerPackage??de?.perPackageQty??de?.quantityPerPackage);return Number.isFinite(Le)&&Le>0&&Le<=99?Math.round(Le):1};if(qe.forEach(de=>{if(!de)return;const Le=re(de.barcode||de.normalizedBarcode||de.desc||Math.random());if(!Le)return;const St=he.get(Le),wn=Pe(de);if(St){St.qty=wn,St.total=wn;return}he.set(Le,{desc:de.desc||de.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(wn,99)),total:Math.max(1,Math.min(wn,99)),barcode:de.barcode??de.normalizedBarcode??""})}),he.size){const de=Array.from(he.values()).map(Le=>{const St=h(String(Le.qty>0?Math.min(Le.qty,99):1)),wn=We(Le.desc||""),Oc=Le.barcode?` <span class="reservation-package-items__barcode">(${We(h(String(Le.barcode)))})</span>`:"";return`<li>${wn}${Oc} × ${St}</li>`}).join("");qt=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${de}
                </ul>
              </details>
            `}}const zc=$e?`${qt||""}${yt||""}`:yt;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${ge}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${We(U.desc||U.description||U.name||y.description||"-")}</div>
                  ${zc}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${We(Qe.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Mt}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${We(Qe.unitPrice)}">${mt}</td>
            <td class="reservation-modal-items-table__cell" data-label="${We(Qe.total)}">${ft}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${We(Qe.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${st}</td></tr>`,Dc=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${Qe.item}</th>
            <th>${Qe.quantity}</th>
            <th>${Qe.unitPrice}</th>
            <th>${Qe.total}</th>
            <th>${Qe.actions}</th>
          </tr>
        </thead>
        <tbody>${Fc}</tbody>
      </table>
    </div>
  `,Bi=x.map((y,U)=>{const se=h(String(U+1));let ge=y.positionLabel??y.position_name??y.position_label??y.position_title??y.role??y.position??null;if((!ge||ge.trim()==="")&&(ge=y.positionLabelAr??y.position_label_ar??y.position_title_ar??y.positionLabelEn??y.position_label_en??y.position_name_ar??y.position_title_en??y.position_name_en??null),!ge||ge.trim()==="")try{const mt=typeof Ot=="function"?Ot():[],ft=y.positionId?mt.find(qt=>String(qt.id)===String(y.positionId)):null,zt=!ft&&y.positionKey?mt.find(qt=>String(qt.name).toLowerCase()===String(y.positionKey).toLowerCase()):null,yt=ft||zt||null;yt&&(ge=yt.labelAr||yt.labelEn||yt.name||ge)}catch{}const qe=gs(ge)||o("reservations.crew.positionFallback","منصب بدون اسم"),$e=gs(y.positionLabelAlt??y.position_label_alt??y.positionLabelEn??y.position_label_en??y.positionLabelAr??y.position_label_ar??y.position_name_en??y.position_name_ar??""),De=gs(y.technicianName)||o("technicians.picker.noTechnicianOption","— بدون تعيين —"),je=y.technicianPhone||en,Mt=Ae(Me(y.positionCost??y.position_cost??y.cost??y.daily_wage??y.dailyWage??y.internal_cost??0));let Ge=Ae(Me(y.positionClientPrice??y.position_client_price??y.client_price??y.customer_price??y.position_price??y.clientPrice??y.daily_total??y.dailyTotal??y.total??0));if(!Number.isFinite(Ge)||Ge<=0)try{const mt=Ot?Ot():[],ft=y.positionId?mt.find(qt=>String(qt.id)===String(y.positionId)):null,zt=!ft&&y.positionKey?mt.find(qt=>String(qt.name).toLowerCase()===String(y.positionKey).toLowerCase()):null,yt=ft||zt||null;yt&&Number.isFinite(Number(yt.clientPrice))&&(Ge=Ae(Number(yt.clientPrice)))}catch{}const ie=`${h(Ge.toFixed(2))} ${A}`,Te=Mt>0?`${h(Mt.toFixed(2))} ${A}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${se}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${De}</span>
            <small class="text-muted">🏷️ ${qe}${$e?` — ${$e}`:""}</small>
            <small class="text-muted">💼 ${ie}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${je}</div>
          ${Te?`<div>💵 ${o("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${Te}</div>`:""}
        </div>
      </div>
    `}).join(""),Rc=Array.isArray(x)&&x.length>4,Mc=x.length?Rc?`
          <div class="reservation-technicians-slider" data-tech-slider>
            <button type="button" class="slider-btn slider-btn--prev" data-slider-prev aria-label="${We(o("reservations.details.slider.prev","السابق"))}" title="${We(o("reservations.details.slider.prev","السابق"))}">‹</button>
            <div class="reservation-technicians-track" data-slider-track>
              ${Bi}
            </div>
            <button type="button" class="slider-btn slider-btn--next" data-slider-next aria-label="${We(o("reservations.details.slider.next","التالي"))}" title="${We(o("reservations.details.slider.next","التالي"))}">›</button>
          </div>
        `:`<div class="reservation-technicians-grid">${Bi}</div>`:`<ul class="reservation-modal-technicians"><li>${vt}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${Fe}</span>
          <strong>${Ee}</strong>
        </div>
        <div class="status-chips">
          ${Tc}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${it}</h6>
          ${Bc}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${Ct}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${Nc}
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
          <span>${ia}</span>
          <span class="count">${xc}</span>
        </div>
        ${Mc}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${cs}</span>
          <span class="count">${Pi}</span>
        </div>
        ${Dc}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${Re}</button>
        ${O?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${et}</button>`:""}
      </div>
    </div>
  `}const Fp="project",Dp="editProject",Rp=3600*1e3,io=.15,Mp=6,zp="projectsTab",Op="projectsSubTab",Hp={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},Vp={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed",cancelled:"Cancelled",conflict:"Conflict"},Ad=`@page {
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
`,xd=/color\([^)]*\)/gi,Id=/color-mix\([^)]*\)/gi,_d=/oklab\([^)]*\)/gi,kd=/oklch\([^)]*\)/gi,Kt=/(color\(|color-mix\(|oklab|oklch)/i,Cd=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke","boxShadow","textShadow","accentColor","caretColor","columnRuleColor"],$d=typeof document<"u"?document.createElement("canvas"):null,pa=$d?.getContext?.("2d")||null;function ro(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function js(e,t="#000"){if(!pa||!e)return t;try{return pa.fillStyle="#000",pa.fillStyle=e,pa.fillStyle||t}catch{return t}}function Pd(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&Kt.test(n)){const s=js(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function xn(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function oo(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const i=t.getComputedStyle(s);if(!i)return;Cd.forEach(c=>{const l=i[c];if(l&&Kt.test(l)){const d=ro(c);if(xn(n,s,d),c==="boxShadow"||c==="textShadow")s.style.setProperty(d,"none","important");else{const u=c==="backgroundColor"?"#ffffff":i.color||"#000000",b=js(l,u);s.style.setProperty(d,b,"important")}}});const r=i.backgroundImage;if(r&&Kt.test(r)){const c=js(i.backgroundColor||"#ffffff","#ffffff");xn(n,s,"background-image"),xn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function co(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const i=t.getComputedStyle(s);if(!i)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","boxShadow","textShadow","accentColor","caretColor","columnRuleColor"].forEach(c=>{const l=i[c];if(l&&Kt.test(l)){const d=ro(c);if(xn(n,s,d),c==="boxShadow"||c==="textShadow")s.style.setProperty(d,"none","important");else{const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(d,u,"important")}}});const r=i.backgroundImage;r&&Kt.test(r)&&(xn(n,s,"background-image"),xn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function lo(e){if(!e)return;const t=(n="")=>{if(typeof n!="string")return n;let a=n;return Kt.test(a)&&(a=a.replace(xd,"#000").replace(Id,"#000").replace(_d,"#000").replace(kd,"#000")),a};e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&Kt.test(a)&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&Kt.test(a)&&n.setAttribute("style",t(a))})}const uo="reservations.quote.sequence",Ji={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},po="https://help.artratio.sa/guide/quote-preview",Oe={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Ld=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],at=[...Ld],Nd=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function Ts(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...at]}function jd(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=Ts(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=Ts(t.value);if(a.length)return a}const n=at.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...at]}const Td=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],yi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>{if(e?.isPackage){const t=e?.packageCodeResolved||e?.barcode||"";return E(t||"-")}return E(e?.barcode||"-")}},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>E(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>E(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>E(h(Number(e?.price||0).toFixed(2)))}],bi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"position",labelKey:"reservations.details.crew.position",fallback:"المنصب",render:e=>E(h(e?.positionLabel??e?.position_name??e?.role??o("reservations.crew.positionFallback","منصب بدون اسم")))},{id:"price",labelKey:"reservations.details.crew.clientPrice",fallback:"سعر العميل",render:e=>{const t=Number.isFinite(Number(e?.positionClientPrice))?Number(e.positionClientPrice):0;return E(`${h(t.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}}],Bs={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:yi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:[...bi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),{id:"groupByPosition",labelKey:null,fallback:"تجميع حسب المنصب",default:!1}]},Bd=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>E(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>E(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>E(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],mo=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>E(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>E(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>E(e?.note||"-")}],Fd=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>E(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>E(h(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>E(h(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>E(e?.displayCost||"—")}],Dd=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"الخدمات الإنتاجية",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],Rd={customerInfo:Bs.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:Bs.payment,projectExpenses:mo.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:[...Bd.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),{id:"groupByPosition",labelKey:null,fallback:"تجميع حسب المنصب",default:!1}],projectEquipment:Fd.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},hs=new Map;function ts(e="reservation"){if(hs.has(e))return hs.get(e);const t=e==="project"?Dd:Td,n=e==="project"?Rd:Bs,a=new Set(t.map(({id:r})=>r)),s=Object.fromEntries(Object.entries(n).map(([r,c=[]])=>[r,new Set(c.map(l=>l.id))])),i={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return hs.set(e,i),i}function ns(e="reservation"){return ts(e).sectionDefs}function fo(e="reservation"){return ts(e).fieldDefs}function yo(e="reservation"){return ts(e).sectionIdSet}function bo(e="reservation"){return ts(e).fieldIdMap}function go(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const Md="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",zd="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",Od="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",ho=Ad.trim(),vo=/^data:image\/svg\+xml/i,Hd=/\.svg($|[?#])/i,Hn=512,Fs="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",qo=96,So=25.4,Ds=210,ba=297,ga=Math.round(Ds/So*qo),ha=Math.round(ba/So*qo);let Na=!1,ja=null;function Eo(){Na||(ja=async function(){try{if(!L||!Z?.modal?.classList.contains("show")||(L.context||"reservation")!=="reservation")return;const n=L.reservation;if(!n)return;const a=[n.id,n.reservationId,n.reservation_id,n.reservationCode,n.reservation_code].map(u=>u==null?"":String(u)).filter(u=>u.length>0);if(!a.length)return;const s=Nt(),i=(Array.isArray(s)?s:[]).find(u=>[u?.id,u?.reservationId,u?.reservation_id,u?.reservationCode,u?.reservation_code].map(f=>f==null?"":String(f)).filter(f=>f.length>0).some(f=>a.includes(f)));if(!i)return;const r=wi(i),{totalsDisplay:c,totals:l,rentalDays:d}=Bo(i,r,L.project);L.reservation=i,L.crewAssignments=r,L.totals=l,L.totalsDisplay=c,L.rentalDays=d,Vo(),Xt()}catch(t){console.warn("[reservationPdf] live update failed",t)}},document.addEventListener("reservations:changed",ja),Na=!0)}function wo(){if(Na){try{document.removeEventListener("reservations:changed",ja)}catch{}ja=null,Na=!1}}const Ao=2,xo=/safari/i,Vd=/(iphone|ipad|ipod)/i,Yi=/(iphone|ipad|ipod)/i,Kd=/(crios|fxios|edgios|opios)/i,Ta="[reservations/pdf]";let Z=null,L=null,wt=1,Mn=null,zn=null,Vt=null,In=null,Kn=!1;function ln(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!Z?.statusIndicator||!Z?.statusText)return;Z.statusKind=e;const i=t||go(e);Z.statusText.textContent=i,Z.statusSpinner&&(Z.statusSpinner.hidden=!s),Z.statusAction&&(Z.statusAction.hidden=!0,Z.statusAction.onclick=null,n&&typeof a=="function"&&(Z.statusAction.textContent=n,Z.statusAction.hidden=!1,Z.statusAction.onclick=r=>{r.preventDefault(),a()})),Z.statusIndicator.hidden=!1,requestAnimationFrame(()=>{Z.statusIndicator.classList.add("is-visible")})}function _n(e){try{return String(e||"").toLowerCase().normalize("NFKD").replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,"").replace(/\s+/g," ").trim()}catch{return String(e||"").trim().toLowerCase()}}function Un(e){!Z?.statusIndicator||!Z?.statusText||(Z.statusKind=null,Z.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{Z?.statusIndicator&&(Z.statusIndicator.hidden=!0,Z.statusAction&&(Z.statusAction.hidden=!0,Z.statusAction.onclick=null),Z.statusSpinner&&(Z.statusSpinner.hidden=!1))},220))}function Rs(){return!!window?.bootstrap?.Modal}function Ud(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),Vt||(Vt=document.createElement("div"),Vt.className="modal-backdrop fade show",Vt.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(Vt)),In||(In=t=>{t.key==="Escape"&&Ms(e)},document.addEventListener("keydown",In));try{e.focus({preventScroll:!0})}catch{}}}function Ms(e){if(!(!e||!e.classList.contains("show"))){e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),Vt&&(Vt.remove(),Vt=null),In&&(document.removeEventListener("keydown",In),In=null);try{wo()}catch{}}}function Qd(e){if(e){if(Rs()){const t=window.bootstrap.Modal.getOrCreateInstance(e);try{e.addEventListener("hidden.bs.modal",()=>{try{wo()}catch{}},{once:!0})}catch{}t.show();return}Ud(e)}}function Gd(){if(Kn)return;Kn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!Z?.modal?.classList.contains("show"),s=()=>{Z?.modal?.classList.contains("show")&&(ln("render"),Kn=!1,Xt())};mr({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:po}),a&&ln("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function as(e="reservation"){const t={},n=fo(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(i=>i?.default!==!1).map(i=>i.id))}),t}function gi(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function Wd(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function hi(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function vi(e="reservation"){return Object.fromEntries(ns(e).map(({id:t})=>[t,!1]))}function qi(e,t){return e.sectionExpansions||(e.sectionExpansions=vi(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Xd(e,t){return qi(e,t)?.[t]!==!1}function Si(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function Jd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Vd.test(e)}function Yd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=xo.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Io(){return Jd()&&Yd()}function ss(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=Yi.test(e)||Yi.test(t),s=/Macintosh/i.test(e)&&n>1;return xo.test(e)&&!Kd.test(e)&&(a||s)}function vs(e,...t){try{console.log(`${Ta} ${e}`,...t)}catch{}}function Bt(e,...t){try{console.warn(`${Ta} ${e}`,...t)}catch{}}function Zd(e,t,...n){try{t?console.error(`${Ta} ${e}`,t,...n):console.error(`${Ta} ${e}`,...n)}catch{}}function Be(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function eu(e,t="لا توجد بيانات للعرض."){const n=E(o(e,t));return Be(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Ba(e,t){return Array.isArray(e)&&e.length?e:[eu(t)]}const tu=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function _o(e=""){return tu.test(e)}function nu(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(i,...r){if(typeof i!="string"||!_o(i))return a.call(this,i,...r);let c,l=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),l=!0)}catch{}try{if(!l){const d=this.canvas;d&&d.style?.direction!=="rtl"&&(d.__artRatioOriginalDirection=d.style.direction,d.style.direction="rtl")}return a.call(this,i,...r)}finally{if(l&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!l){const d=this.canvas;d&&d.__artRatioOriginalDirection!==void 0&&(d.style.direction=d.__artRatioOriginalDirection,delete d.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function Zi(e,t=Hn){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function au(e){if(!e)return{width:Hn,height:Hn};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?Zi(t,0):0,s=n?Zi(n,0):0;if(a>0&&s>0)return{width:a,height:s};const i=e.getAttribute?.("viewBox");if(i){const r=i.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(r.length>=4){const[,,c,l]=r;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(l)&&l>0?l:0)}}return{width:a||Hn,height:s||Hn}}function ko(e=""){return typeof e!="string"?!1:vo.test(e)||Hd.test(e)}function su(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function iu(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=i=>{const r=i?.message||`Unable to load image from ${e}`;a(new Error(r))},s.src=e})}async function Co(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const i=await iu(s),r=n.createElement("canvas"),c=Math.max(t.width||i.naturalWidth||i.width||0,1),l=Math.max(t.height||i.naturalHeight||i.height||c,1);r.width=c,r.height=l;const d=r.getContext("2d");return d.clearRect(0,0,c,l),d.drawImage(i,0,0,c,l),r.toDataURL("image/png")}catch(i){return console.warn("[reservations/pdf] failed to rasterize SVG content",i),null}finally{URL.revokeObjectURL(s)}}async function ru(e){if(!e)return null;if(vo.test(e))return su(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function ou(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!ko(t))return!1;const n=await ru(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",Fs),!1;const a=await Co(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",Fs),!1)}async function cu(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=au(e),s=await Co(n,a),r=(e.ownerDocument||document).createElement("img");r.setAttribute("src",s||Fs),r.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),r.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&r.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&r.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),l=e.getAttribute("height");return c&&r.setAttribute("width",c),l&&r.setAttribute("height",l),e.parentNode?.replaceChild(r,e),!!s}async function $o(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{ko(s.getAttribute?.("src"))&&a.push(ou(s))}),n.forEach(s=>{a.push(cu(s))}),a.length&&await Promise.allSettled(a)}function lu(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const i=(z,J=0)=>{const M=parseFloat(z);return Number.isFinite(M)?M:J},r=i(s.paddingTop),c=i(s.paddingBottom),l=i(s.paddingRight),d=i(s.paddingLeft),u=i(s.borderRadius),b=i(s.fontSize,14),f=(()=>{const z=s.lineHeight;if(!z||z==="normal")return b*1.6;const J=i(z,b*1.6);return J>0?J:b*1.6})(),m=Math.max(e.clientWidth||0,e.scrollWidth||0,i(s.width,0));if(m<=0)return null;const p=Math.max(1,m-d-l),g=e.textContent||"",v=g.split(/\r?\n/),_=n.createElement("canvas"),q=_.getContext("2d");if(!q)return null;const P=s.fontStyle||"normal",x=s.fontVariant||"normal",O=s.fontWeight||"400",S=s.fontFamily||"sans-serif",I=s.fontStretch||"normal",j=z=>z.join(" "),T=[],X=z=>q.measureText(z).width;q.font=`${P} ${x} ${O} ${I} ${b}px ${S}`,v.forEach(z=>{const J=z.trim();if(J.length===0){T.push("");return}const M=J.split(/\s+/);let K=[];M.forEach((V,te)=>{const me=V.trim();if(!me)return;const oe=j(K.concat(me));if(X(oe)<=p||K.length===0){K.push(me);return}T.push(j(K)),K=[me]}),K.length&&T.push(j(K))}),T.length||T.push("");const C=r+c+T.length*f,D=Math.ceil(Math.max(1,m)*t),W=Math.ceil(Math.max(1,C)*t);_.width=D,_.height=W,_.style.width=`${Math.max(1,m)}px`,_.style.height=`${Math.max(1,C)}px`,q.scale(t,t);const B=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){q.save(),q.beginPath();const z=Math.max(1,m),J=Math.max(1,C),M=Math.min(u,z/2,J/2);q.moveTo(M,0),q.lineTo(z-M,0),q.quadraticCurveTo(z,0,z,M),q.lineTo(z,J-M),q.quadraticCurveTo(z,J,z-M,J),q.lineTo(M,J),q.quadraticCurveTo(0,J,0,J-M),q.lineTo(0,M),q.quadraticCurveTo(0,0,M,0),q.closePath(),q.clip()}if(q.fillStyle=B,q.fillRect(0,0,Math.max(1,m),Math.max(1,C)),q.font=`${P} ${x} ${O} ${I} ${b}px ${S}`,q.fillStyle=s.color||"#000000",q.textBaseline="top",q.textAlign="right","direction"in q)try{q.direction="rtl"}catch{}const F=Math.max(0,m-l);let N=r;T.forEach(z=>{const J=z.length?z:" ";q.fillText(J,F,N,p),N+=f});const H=n.createElement("img");let Q;try{Q=_.toDataURL("image/png")}catch(z){return Bt("note canvas toDataURL failed",z),null}return H.src=Q,H.alt=g,H.style.width=`${Math.max(1,m)}px`,H.style.height=`${Math.max(1,C)}px`,H.style.display="block",H.setAttribute("data-quote-note-image","true"),{image:H,canvas:_,totalHeight:C,width:m}}function du(e,{pixelRatio:t=1}={}){if(!e||!ss())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!_o(a.textContent||""))return;let s;try{s=lu(a,{pixelRatio:t})}catch(i){Bt("failed to rasterize note content",i),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function zs(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){Zd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const i=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),r=n||i,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),l=o("reservations.quote.toast.retry","إعادة المحاولة"),d=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(ln("export"),Ko()):(ln("render"),Kn=!1,Xt())};if(mr({message:r,duration:9e3,actionLabel:d?l:void 0,onAction:d?u:void 0,linkLabel:c,linkHref:po}),Z?.modal?.classList.contains("show")&&ln("error",{message:r,actionLabel:d?l:void 0,onAction:d?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function Os({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){Bt("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){Bt("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function Ei(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",i=>n(i)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=i=>n(i),document.head.appendChild(s)})}function er(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function tr(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function uu(){const e=tr();return e||(zn||(zn=Ei(zd).catch(t=>{throw zn=null,t}).then(()=>{const t=tr();if(!t)throw zn=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),zn)}async function pu(){const e=er();return e||(Mn||(Mn=Ei(Od).catch(t=>{throw Mn=null,t}).then(()=>{const t=er();if(!t)throw Mn=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),Mn)}async function mu(){if(window.html2pdf||await Ei(Md),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}Pd(),nu()}function E(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function fu(e="reservation"){return e==="project"?"QP":"Q"}function yu(e,t="reservation"){const n=Number(e),a=fu(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function bu(){const e=window.localStorage?.getItem?.(uo),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function Po(e="reservation"){const n=bu()+1;return{sequence:n,quoteNumber:yu(n,e)}}function gu(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(uo,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function Lo(e="reservation"){return Ji[e]||Ji.reservation}function hu(e="reservation"){try{const t=Lo(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function vu(e,t="reservation"){try{const n=Lo(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function qu(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function Su(e,t="reservation"){if(!e)return null;const n=yo(t),a=bo(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),i={},r=e.fields||{};return Object.entries(a).forEach(([c,l])=>{const d=r[c];if(d==null)return;const{ids:u,emptyExplicitly:b}=qu(d);if(!u&&!b)return;const f=Array.isArray(u)?u.filter(m=>l.has(m)):[];(f.length>0||b)&&(i[c]=f)}),{version:1,sections:s,fields:i}}function No(e){if(!e)return;const t=e.context||"reservation",n=Su(e,t);n&&vu(n,t)}function jo(e){if(!e)return;const t=e.context||"reservation",n=hu(t);if(!n)return;const a=yo(t),s=Array.isArray(n.sections)?n.sections.filter(i=>a.has(i)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const i=gi(e.fields||as(t)),r=bo(t);Object.entries(n.fields).forEach(([c,l])=>{const d=r[c];if(!d)return;const u=Array.isArray(l)?l.filter(b=>d.has(b)):[];i[c]=new Set(u)}),e.fields=i}}function To(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function wi(e){const t=un()||[],{technicians:n=[]}=ye(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const c=String(r.id),l=s.get(c)||{};s.set(c,{...l,...r})}),(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(r=>({technicianId:r}))).map((r,c)=>{const l=r?.technicianId!=null?s.get(String(r.technicianId)):null;let d=r.positionLabel??r.position_name??r.position_label??r.role??r.position??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم");(!d||d.trim()==="")&&(d=r.positionLabelAr??r.position_label_ar??r.positionLabelEn??r.position_label_en??r.position_name_ar??r.position_name_en??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم"));try{const f=typeof Ot=="function"?Ot()||[]:[];let m=null;if(r?.positionId!=null&&(m=f.find(p=>String(p?.id)===String(r.positionId))||null),!m){const p=r.positionKey??r.position_key??r.positionName??r.position_name??r.position??"";if(p&&(m=typeof Sa=="function"&&Sa(p)||null,!m&&f.length)){const g=String(p).trim().toLowerCase();m=f.find(v=>[v.name,v.labelAr,v.labelEn].filter(Boolean).map(_=>String(_).toLowerCase()).includes(g))||null}}if(m){const p=m.labelAr||m.labelEn||m.name||"";p&&p.trim()&&(d=p)}}catch{}const u=Ae(Me(r.positionCost??r.position_cost??r.cost??r.daily_wage??r.dailyWage??l?.dailyWage??l?.wage??0)),b=Ae(Me(r.positionClientPrice??r.position_client_price??r.client_price??r.clientPrice??r.daily_total??r.dailyTotal??r.total??l?.dailyTotal??l?.total??l?.total_wage??0));return{assignmentId:r.assignmentId??r.assignment_id??`crew-${c}`,positionId:r.positionId??r.position_id??null,positionLabel:d,positionLabelAlt:r.positionLabelAlt??r.position_label_alt??"",positionCost:u,positionClientPrice:b,technicianId:r.technicianId!=null?String(r.technicianId):l?.id!=null?String(l.id):null,technicianName:r.technicianName??r.technician_name??l?.name??null,technicianRole:r.technicianRole??l?.role??null}})}function Bo(e,t,n){const{projectLinked:a}=Wt(e,n);Ua(e.start,e.end);const s=e.discount??e.discountValue??0,i=Number(h(String(s)))||0,r=e.discountType??e.discount_type??"percent",c=String(r).toLowerCase()==="amount"?"amount":"percent",l=a?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),d=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,u=d!=null?Me(d):Number.NaN,f=(e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied)===!0&&Number.isFinite(u)&&u>0?u:null,m=Array.isArray(t)?t.map(x=>x?.technicianId).filter(Boolean):[],p=Er({items:Array.isArray(e.items)?e.items:[],technicianIds:m,crewAssignments:Array.isArray(t)?t:[],discount:i,discountType:c,applyTax:l,start:e.start,end:e.end,companySharePercent:f}),g=Me(e.cost??e.total??e.finalTotal),v=Number.isFinite(g),_=a?p.finalTotal:v?Ae(g):p.finalTotal,q={equipmentTotal:p.equipmentTotal,crewTotal:p.crewTotal,crewCostTotal:p.crewCostTotal,discountAmount:p.discountAmount,subtotalAfterDiscount:p.subtotalAfterDiscount,taxableAmount:p.taxableAmount,taxAmount:p.taxAmount,finalTotal:_,companySharePercent:p.companySharePercent,companyShareAmount:p.companyShareAmount,netProfit:p.netProfit},P={equipmentTotal:h(p.equipmentTotal.toFixed(2)),crewTotal:h(p.crewTotal.toFixed(2)),discountAmount:h(p.discountAmount.toFixed(2)),subtotalAfterDiscount:h(p.subtotalAfterDiscount.toFixed(2)),taxableAmount:h(p.taxableAmount.toFixed(2)),taxAmount:h(p.taxAmount.toFixed(2)),finalTotal:h(_.toFixed(2)),companySharePercent:h((Number.isFinite(p.companySharePercent)?p.companySharePercent:0).toFixed(2)),companyShareAmount:h(p.companyShareAmount.toFixed(2)),netProfit:h(p.netProfit.toFixed(2))};return{totals:q,totalsDisplay:P,rentalDays:p.rentalDays}}function Ln(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function Fo(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Eu(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=Ln(e.amount??(n==="amount"?e.value:null)),s=Ln(e.percentage??(n==="percent"?e.value:null)),i=n==="percent"?s??null:a??null,r=e.note??e.memo??null,c=Fo(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:i,note:r,recordedAt:c}}function wu(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(Eu).filter(Boolean);if(n.length>0)return n;const a=Ln(e.paidPercent??e.paid_percent),s=Ln(e.paidAmount??e.paid_amount),i=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,r=Fo(i);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:r}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:r}]:[]}function Au(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function xu(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function Iu(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function _u(e){const t=Number(e?.equipmentEstimate)||0,n=Iu(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",i=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?i:a*(i/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const l=Math.max(0,a-c),d=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,b=d&&s&&u>0?u:0,f=b>0?Number((l*(b/100)).toFixed(2)):0,m=l+f;let p=s?m*io:0;(!Number.isFinite(p)||p<0)&&(p=0),p=Number(p.toFixed(2));let g=s?Number(e?.totalWithTax):m;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((m+p).toFixed(2))):g=m,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:l,companyShareAmount:f,subtotal:m,applyTax:s,taxAmount:p,totalWithTax:g}}function ku(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",i=Array.isArray(e.crewAssignments)?e.crewAssignments:[],r=i.length?i:Array.isArray(e.technicians)?e.technicians:[],c=Js(t,a,s,!1,r,{start:e.start,end:e.end});if(Number.isFinite(c))return c;const l=Number(h(String(e.cost??0)));return Number.isFinite(l)?Math.round(l):0}function Cu(e,t){if(!e)return"—";const n=dt(e);return t?`${n} - ${dt(t)}`:n}function pe(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${h(a.toFixed(s))} ${t}`}function nr(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function $u(e){if(!e?.start)return null;if(!e?.end)return 1;const t=Ua(e.start,e.end);return Number.isFinite(t)?t:1}function Pu(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function ar(e){const t=o("reservations.create.summary.currency","SR"),n=ye()||{},a=Array.isArray(n.customers)?n.customers:[],s=Array.isArray(n.projects)?n.projects:[],i=Array.isArray(n.technicians)?n.technicians:[];let r=[];try{const A=Nt?.()||[];r=Array.isArray(A)&&A.length?A:n.reservations||[]}catch{r=n.reservations||[]}const c=e?.id!=null?s.find(A=>String(A.id)===String(e.id))||e:e||null,l={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!c)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:l.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:pe(0,t),expensesTotal:pe(0,t),reservationsTotal:pe(0,t),discountAmount:pe(0,t),taxAmount:pe(0,t),overallTotal:pe(0,t),paidAmount:pe(0,t),remainingAmount:pe(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:l.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:pe(0,t),remainingAmountDisplay:pe(0,t),paidPercentDisplay:nr(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:l.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const d=c.clientId??c.customerId??c.client_id??c.customer_id??null,u=d!=null&&a.find(A=>String(A.id)===String(d))||null,b=u?.customerName??u?.name??c.clientName??c.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),f=(c.clientCompany||u?.companyName||u?.company||"").trim(),m=u?.phone??u?.customerPhone??c.clientPhone??c.customerPhone??"",p=m?h(String(m).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),g=u?.email??c.clientEmail??c.customerEmail??"",v=g?String(g).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),_=c.projectCode||`PRJ-${h(String(c.id??""))}`,q=h(String(_)),P=(c.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),x=Au(c.type),O=c.start?dt(c.start):"—",S=c.end?dt(c.end):"—",I=$u(c),j=I!=null?Pu(I):"غير محدد",T=xu(c),X={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},C=o(`projects.status.${T}`,X[T]||T),D=c.id!=null?String(c.id):null,W=D?r.filter(A=>{const ae=A?.projectId??A?.project_id??null;return ae!=null&&String(ae)===D}):[],F=W.map(A=>{const ae=A.reservationId||A.id||"",G=A.status||A.state||"pending",fe=String(G).toLowerCase(),we=o(`reservations.status.${fe}`,fe),_e=ku(A),Ze=A.start?new Date(A.start).getTime():0;return{reservationId:h(String(ae||"-")),status:fe,statusLabel:we,total:_e,totalLabel:pe(_e,t),dateRange:Cu(A.start,A.end),startTimestamp:Number.isNaN(Ze)?0:Ze}}).sort((A,ae)=>ae.startTimestamp-A.startTimestamp).map(({startTimestamp:A,...ae})=>ae).reduce((A,ae)=>A+(Number(ae.total)||0),0),N=[];try{W.forEach(A=>{const{groups:ae}=ti(A);ae.forEach(G=>{const fe=Number(G?.count??G?.quantity??1)||1,we=Number(G?.unitPrice);let _e=Number.isFinite(we)?we:0;if(!_e||_e<=0){const Ne=Number(G?.totalPrice);Number.isFinite(Ne)&&fe>0&&(_e=Number((Ne/fe).toFixed(2)))}Number.isFinite(_e)||(_e=0);const Ze=G?.type==="package"||Array.isArray(G?.items)&&G.items.some(Ne=>Ne?.type==="package"),Ke=Array.isArray(G?.barcodes)&&G.barcodes.length?G.barcodes[0]:Array.isArray(G?.items)&&G.items.length?G.items[0]?.barcode:null;let Ue=G?.packageDisplayCode??G?.package_code??G?.code??G?.packageCode??(Array.isArray(G?.items)&&G.items.length?G.items[0]?.package_code??G.items[0]?.code??G.items[0]?.packageCode:null);const Qe=Ne=>{const Xe=(Ne==null?"":String(Ne)).trim();return!!(!Xe||/^pkg-/i.test(Xe)||/^\d+$/.test(Xe)&&Xe.length<=4)};if(!Ue||Qe(Ue)){const Ne=G?.packageId??G?.package_id??(Array.isArray(G?.items)&&G.items.length?G.items[0]?.packageId??G.items[0]?.package_id:null);if(Ne)try{const Xe=Xs(Ne);Xe&&Xe.package_code&&(Ue=Xe.package_code)}catch{}}if(!Ue||Qe(Ue))try{const Ne=_n(G?.description||"");if(Ne){const Xe=wr();let kt=Xe.find($=>_n($?.name||$?.title||$?.label||"")===Ne);kt||(kt=Xe.find($=>{const le=_n($?.name||$?.title||$?.label||"");return le.includes(Ne)||Ne.includes(le)})),kt&&kt.package_code&&(Ue=kt.package_code)}}catch{}const st=Ze?Ue??Ke??"":G?.barcode??Ke??"",vt=st!=null?String(st):"",en=Number.isFinite(Number(G?.totalPrice))?Number(G.totalPrice):Number((_e*fe).toFixed(2));N.push({...G,isPackage:Ze,desc:G?.description,barcode:vt,packageCodeResolved:Ue||"",qty:fe,price:_e,totalPrice:Ae(en),unitPriceValue:_e})})})}catch{}const H=new Map;W.forEach(A=>{const ae=Array.isArray(A.items)?A.items:[],G=Ua(A.start,A.end),fe=A.reservationId||A.id||"";ae.forEach((we,_e)=>{if(!we)return;const Ze=we.barcode||we.code||we.id||we.desc||we.description||`item-${_e}`,Ke=String(Ze||`item-${_e}`),Ue=H.get(Ke)||{description:we.desc||we.description||we.name||we.barcode||`#${h(String(_e+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},Qe=Number(we.qty)||1,st=Number(we.price)||0;Ue.totalQuantity+=Qe,Ue.reservationIds.add(String(fe));const vt=st*Qe*Math.max(1,G);Number.isFinite(vt)&&(Ue.totalCost+=vt),H.set(Ke,Ue)})});const Q=Array.from(H.values()).map(A=>({description:A.description,totalQuantity:A.totalQuantity,reservationsCount:A.reservationIds.size,displayCost:pe(A.totalCost,t)})),z=new Map((i||[]).filter(Boolean).map(A=>[String(A.id),A])),J=new Map,M=A=>{if(!A)return;let ae=null;typeof A=="object"?ae=A.id??A.technicianId??A.technician_id??A.userId??A.user_id??null:(typeof A=="string"||typeof A=="number")&&(ae=A);const G=ae!=null?String(ae):null,fe=G&&z.has(G)?z.get(G):typeof A=="object"?A:null,we=fe?.name||fe?.full_name||fe?.fullName||fe?.displayName||(typeof A=="string"?A:null),_e=fe?.role||fe?.title||null,Ze=fe?.phone||fe?.mobile||fe?.contact||null;if(!we&&!G)return;const Ke=G||we;J.has(Ke)||J.set(Ke,{id:G,name:we||"-",role:_e||null,phone:Ze||null})};Array.isArray(c?.technicians)&&c.technicians.forEach(A=>M(A)),W.forEach(A=>{(Array.isArray(A.crewAssignments)&&A.crewAssignments.length?A.crewAssignments:Array.isArray(A.technicians)?A.technicians.map(G=>({technicianId:G})):[]).forEach(G=>M(G))});const K=Array.from(J.values()),V=Array.isArray(c.expenses)?c.expenses.map(A=>{const ae=Number(A?.amount)||0;return{label:A?.label||A?.name||"-",amount:ae,displayAmount:pe(ae,t),note:A?.note||A?.description||""}}):[],te=_u(c),me=te.applyTax?Number(((te.subtotal+F)*io).toFixed(2)):0,oe=Number((te.subtotal+F+me).toFixed(2)),be=wu(c),ke=Ln(c.paidAmount??c.paid_amount)||0,Y=Ln(c.paidPercent??c.paid_percent)||0,ce=Ys({totalAmount:oe,paidAmount:ke,paidPercent:Y,history:be}),Se=typeof c.paymentStatus=="string"?c.paymentStatus.toLowerCase():"",Ee=Zs({manualStatus:Se,paidAmount:ce.paidAmount,paidPercent:ce.paidPercent,totalAmount:oe}),He={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},Ve=o(`projects.paymentStatus.${Ee}`,He[Ee]||Ee),Ce=Number(ce.paidAmount||0),xe=Number(ce.paidPercent||0),Ie=Math.max(0,Number((oe-Ce).toFixed(2))),R={projectSubtotal:pe(te.subtotal,t),expensesTotal:pe(te.expensesTotal,t),reservationsTotal:pe(F,t),discountAmount:pe(te.discountAmount,t),taxAmount:pe(me,t),overallTotal:pe(oe,t),paidAmount:pe(Ce,t),remainingAmount:pe(Ie,t)},ne={status:Ee,statusLabel:Ve,paidAmount:Ce,paidPercent:xe,remainingAmount:Ie,paidAmountDisplay:pe(Ce,t),remainingAmountDisplay:pe(Ie,t),paidPercentDisplay:nr(xe)},k=(c.description||"").trim();return{project:c,customer:u,clientInfo:{name:b,company:f||"—",phone:p,email:v},projectInfo:{title:P,code:q,typeLabel:x,startDisplay:O,endDisplay:S,durationLabel:j,statusLabel:C},expenses:V,equipment:Q,crew:K,equipmentItems:N,crewAssignments:W.flatMap(A=>wi(A)),totals:te,totalsDisplay:R,projectTotals:{combinedTaxAmount:me,overallTotal:oe,reservationsTotal:F,paidAmount:Ce,paidPercent:xe,remainingAmount:Ie,paymentStatus:Ee},paymentSummary:ne,notes:k,currencyLabel:t,projectStatus:T,projectStatusLabel:C,projectDurationDays:I,projectDurationLabel:j,paymentHistory:be}}function Lu({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:i=[],totalsDisplay:r={},projectTotals:c={},paymentSummary:l={},currencyLabel:d="SR",sections:u,fieldSelections:b={},quoteNumber:f,quoteDate:m,terms:p=at}){const g=gi(b),v=(R,ne)=>hi(g,R,ne),_=R=>u?.has?.(R),q=`<div class="quote-placeholder">${E(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,P=(R,ne)=>`<div class="info-plain__item">
      <span class="info-plain__label">${E(R)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${E(ne)}</span>
    </div>`,x=(R,ne,{variant:k="inline"}={})=>k==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${E(R)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${E(ne)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${E(R)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${E(ne)}</span>
    </span>`,O=(R,ne)=>`<div class="payment-row">
      <span class="payment-row__label">${E(R)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${E(ne)}</span>
    </div>`,S=[];v("customerInfo","customerName")&&S.push(P(o("projects.details.client","العميل"),t.name||"-")),v("customerInfo","customerCompany")&&S.push(P(o("projects.details.company","شركة العميل"),t.company||"—")),v("customerInfo","customerPhone")&&S.push(P(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),v("customerInfo","customerEmail")&&S.push(P(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const I=_("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${E(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${S.length?`<div class="info-plain">${S.join("")}</div>`:q}
      </section>`:"",j=[];v("projectInfo","projectType")&&j.push(P(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),v("projectInfo","projectTitle")&&j.push(P(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),v("projectInfo","projectCode")&&j.push(P(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),v("projectInfo","projectStart")&&j.push(P(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),v("projectInfo","projectEnd")&&j.push(P(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),v("projectInfo","projectDuration")&&j.push(P(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),v("projectInfo","projectStatus")&&j.push(P(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const T=_("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${E(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${j.length?`<div class="info-plain">${j.join("")}</div>`:q}
      </section>`:"",X=bi.filter(R=>v("crew",R.id)),C=Array.isArray(L?.crewAssignments)?L.crewAssignments:[],D=v("projectCrew","groupByPosition"),W=R=>{const ne=R&&R.positionId!=null?`id:${String(R.positionId)}`:(()=>{const A=(R?.positionLabel||R?.position_name||R?.position||"").trim().toLowerCase();return A?`label:${A}`:""})(),k=Number.isFinite(Number(R?.positionClientPrice))?Number(R.positionClientPrice):0,ee=k>0?`|p:${k.toFixed(2)}`:"";return`${ne}${ee}`},B=(()=>{const R=new Map;return C.forEach(ne=>{const k=W(ne);k&&R.set(k,(R.get(k)||0)+1)}),R})(),F=(()=>{const R=[];return X.forEach(ne=>{ne.id==="position"?(R.push({...ne,render:k=>{const ee=k?.positionLabel??k?.position_name??k?.role??o("reservations.crew.positionFallback","منصب بدون اسم");if(D)return E(h(String(ee)));const A=W(k),ae=A&&B.get(A)||0,G=ae>1?` × ${h(String(ae))}`:"";return E(h(String(ee))+G)}}),D&&R.push({id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:k=>E(h(String(k?.__count||0)))})):ne.id==="price"&&D?R.push({...ne,render:k=>{const ee=Number.isFinite(Number(k?.positionClientPrice))?Number(k.positionClientPrice):0,A=Math.max(1,Number(k?.__count||1)),ae=ee*A;return E(`${h(ae.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}}):R.push(ne)}),R})(),N=_("projectCrew")?F.length?`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${F.map(R=>`<th>${E(R.labelKey?o(R.labelKey,R.fallback):R.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${(()=>{const R=D?(()=>{const ne=new Map;return C.forEach(k=>{const ee=W(k);if(!ee)return;const A=ne.get(ee);A?A.__count+=1:ne.set(ee,{...k,__count:1})}),Array.from(ne.values())})():C;return R.length?R.map((ne,k)=>`<tr>${F.map(ee=>`<td>${ee.render(ne,k)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(F.length,1)}" class="empty">${E(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`})()}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${q}
          </section>`:"",H=[];v("financialSummary","projectSubtotal")&&H.push(x(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),r.projectSubtotal||`${pe(0,d)}`)),v("financialSummary","expensesTotal")&&H.push(x(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),r.expensesTotal||pe(0,d))),v("financialSummary","reservationsTotal")&&H.push(x(o("projects.details.reservationsTotal","إجمالي الحجوزات"),r.reservationsTotal||pe(0,d))),v("financialSummary","discountAmount")&&H.push(x(o("reservations.details.labels.discount","الخصم"),r.discountAmount||pe(0,d))),v("financialSummary","taxAmount")&&H.push(x(o("projects.details.summary.combinedTax","إجمالي الضريبة"),r.taxAmount||pe(0,d)));const Q=[];v("financialSummary","overallTotal")&&Q.push(x(o("projects.details.summary.overallTotal","الإجمالي الكلي"),r.overallTotal||pe(0,d),{variant:"final"})),v("financialSummary","paidAmount")&&Q.push(x(o("projects.details.summary.paidAmount","إجمالي المدفوع"),r.paidAmount||pe(0,d),{variant:"final"})),v("financialSummary","remainingAmount")&&Q.push(x(o("projects.details.summary.remainingAmount","المتبقي للدفع"),r.remainingAmount||pe(0,d),{variant:"final"}));const z=_("financialSummary")?!H.length&&!Q.length?`<section class="quote-section quote-section--financial">${q}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${E(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${H.length?`<div class="totals-inline">${H.join("")}</div>`:""}
            ${Q.length?`<div class="totals-final">${Q.join("")}</div>`:""}
          </div>
        </section>`:"",J=mo.filter(R=>v("projectExpenses",R.id)),M=_("projectExpenses")?J.length?`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.expenses","الخدمات الإنتاجية"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${J.map(R=>`<th>${E(R.labelKey?o(R.labelKey,R.fallback):R.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((R,ne)=>`<tr>${J.map(k=>`<td>${k.render(R,ne)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(J.length,1)}" class="empty">${E(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.expenses","الخدمات الإنتاجية"))}</h3>
            ${q}
          </section>`:"",K=yi.filter(R=>v("items",R.id)),V=Array.isArray(L?.equipmentItems)?L.equipmentItems:[],te=_("projectEquipment")?K.length?`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${K.map(R=>`<th>${E(R.labelKey?o(R.labelKey,R.fallback):R.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${V.length?V.map((R,ne)=>`<tr>${K.map(k=>`<td>${k.render(R,ne)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(K.length,1)}" class="empty">${E(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${q}
          </section>`:"",me=(e?.description||"").trim()||"",oe=_("projectNotes")?`<section class="quote-section">
        <h3>${E(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${E(me||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",be=[];v("payment","beneficiary")&&be.push(O(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Oe.beneficiaryName)),v("payment","bank")&&be.push(O(o("reservations.quote.labels.bank","اسم البنك"),Oe.bankName)),v("payment","account")&&be.push(O(o("reservations.quote.labels.account","رقم الحساب"),h(Oe.accountNumber))),v("payment","iban")&&be.push(O(o("reservations.quote.labels.iban","رقم الآيبان"),h(Oe.iban)));const ke=`<section class="quote-section">
      <div class="payment-block">
        <h3>${E(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${be.length?be.join(""):q}</div>
      </div>
      <p class="quote-approval-note">${E(Oe.approvalNote)}</p>
    </section>`,Y=Array.isArray(p)&&p.length?p:at,ce=`<footer class="quote-footer">
        <h4>${E(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${Y.map(R=>`<li>${E(R)}</li>`).join("")}</ul>
      </footer>`,Se=[],Ee=[];if(T&&Ee.push({key:"project",html:T}),I&&Ee.push({key:"customer",html:I}),Ee.length>1){const R=Ee.find(ee=>ee.key==="project"),ne=Ee.find(ee=>ee.key==="customer"),k=[];R?.html&&k.push(R.html),ne?.html&&k.push(ne.html),Se.push(Be(`<div class="quote-section-row quote-section-row--primary">${k.join("")}</div>`,{blockType:"group"}))}else Ee.length===1&&Se.push(Be(Ee[0].html));const He=[];N&&He.push(Be(N,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),M&&He.push(Be(M,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),te&&He.push(Be(te,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const Ve=[];z&&Ve.push(Be(z,{blockType:"summary"})),oe&&Ve.push(Be(oe));const Ce=[Be(ke,{blockType:"payment"}),Be(ce,{blockType:"footer"})],xe=[...Ba(Se,"projects.quote.placeholder.primary"),...He,...Ba(Ve,"projects.quote.placeholder.summary"),...Ce],Ie=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${E(Oe.logoUrl)}" alt="${E(Oe.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${E(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${E(Oe.companyName)}</p>
        <p class="quote-company-cr">${E(o("reservations.quote.labels.cr","السجل التجاري"))}: ${E(Oe.commercialRegistry)}</p>
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
      <style>${ho}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Ie}
          ${xe.join("")}
        </div>
      </div>
    </div>
  `}function Do(e){if(e?.context==="project")return Lu(e);const{reservation:t,customer:n,project:a,crewAssignments:s,totals:i,totalsDisplay:r,rentalDays:c,currencyLabel:l,sections:d,fieldSelections:u={},quoteNumber:b,quoteDate:f,terms:m=at}=e,p=h(String(t?.reservationId??t?.id??"")),g=t.start?h(dt(t.start)):"-",v=t.end?h(dt(t.end)):"-",_=n?.customerName||n?.full_name||n?.name||"-",q=n?.phone||"-",P=n?.email||"-",x=n?.company||n?.company_name||"-",O=h(q),S=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),I=a?.code||a?.projectCode||"",j=h(String(c)),T=t?.notes||"",X=Array.isArray(m)&&m.length?m:at,C=gi(u),D=($,le)=>hi(C,$,le),W=$=>d?.has?.($),B=`<div class="quote-placeholder">${E(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,F=($,le)=>`<div class="info-plain__item">${E($)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${E(le)}</strong></div>`,N=($,le,{variant:ue="inline"}={})=>ue==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${E($)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${E(le)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${E($)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${E(le)}</span>
    </span>`,H=($,le)=>`<div class="payment-row">
      <span class="payment-row__label">${E($)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${E(le)}</span>
    </div>`,Q=[];D("customerInfo","customerName")&&Q.push(F(o("reservations.details.labels.customer","العميل"),_)),D("customerInfo","customerCompany")&&Q.push(F(o("reservations.details.labels.company","الشركة"),x)),D("customerInfo","customerPhone")&&Q.push(F(o("reservations.details.labels.phone","الهاتف"),O)),D("customerInfo","customerEmail")&&Q.push(F(o("reservations.details.labels.email","البريد"),P));const z=W("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${E(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${Q.length?`<div class="info-plain">${Q.join("")}</div>`:B}
      </section>`:"",J=[];D("reservationInfo","reservationId")&&J.push(F(o("reservations.details.labels.reservationId","رقم الحجز"),p||"-")),D("reservationInfo","reservationStart")&&J.push(F(o("reservations.details.labels.start","بداية الحجز"),g)),D("reservationInfo","reservationEnd")&&J.push(F(o("reservations.details.labels.end","نهاية الحجز"),v)),D("reservationInfo","reservationDuration")&&J.push(F(o("reservations.details.labels.duration","عدد الأيام"),j));const M=W("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${E(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${J.length?`<div class="info-plain">${J.join("")}</div>`:B}
      </section>`:"",K=[];D("projectInfo","projectTitle")&&K.push(F(o("reservations.details.labels.project","المشروع"),S)),D("projectInfo","projectCode")&&K.push(F(o("reservations.details.labels.code","الرمز"),I||"-"));const V=W("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${E(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${K.length?`<div class="info-plain">${K.join("")}</div>`:B}
      </section>`:"",te=[];D("financialSummary","equipmentTotal")&&te.push(N(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${r.equipmentTotal} ${l}`)),D("financialSummary","crewTotal")&&te.push(N(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${r.crewTotal} ${l}`)),D("financialSummary","discountAmount")&&te.push(N(o("reservations.details.labels.discount","الخصم"),`${r.discountAmount} ${l}`)),D("financialSummary","taxAmount")&&te.push(N(o("reservations.details.labels.tax","الضريبة"),`${r.taxAmount} ${l}`));const me=D("financialSummary","finalTotal"),oe=[];me&&oe.push(N(o("reservations.details.labels.total","الإجمالي النهائي"),`${r.finalTotal} ${l}`,{variant:"final"}));const be=oe.length?`<div class="totals-final">${oe.join("")}</div>`:"",ke=W("financialSummary")?!te.length&&!me?`<section class="quote-section quote-section--financial">${B}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${E(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${te.length?`<div class="totals-inline">${te.join("")}</div>`:""}
            ${be}
          </div>
        </section>`:"",{groups:Y}=ti(t),ce=Y.map($=>{const le=Number($?.count??$?.quantity??1)||1,ue=Number($?.unitPrice);let Fe=Number.isFinite(ue)?ue:0;if(!Fe||Fe<=0){const Re=Number($?.totalPrice);Number.isFinite(Re)&&le>0&&(Fe=Number((Re/le).toFixed(2)))}Number.isFinite(Fe)||(Fe=0);const it=$?.type==="package"||Array.isArray($?.items)&&$.items.some(Re=>Re?.type==="package"),Ct=Array.isArray($?.barcodes)&&$.barcodes.length?$.barcodes[0]:Array.isArray($?.items)&&$.items.length?$.items[0]?.barcode:null;let rt=$?.packageDisplayCode??$?.package_code??$?.code??$?.packageCode??(Array.isArray($?.items)&&$.items.length?$.items[0]?.package_code??$.items[0]?.code??$.items[0]?.packageCode:null);const ia=Re=>{const et=(Re==null?"":String(Re)).trim();return!!(!et||/^pkg-/i.test(et)||/^\d+$/.test(et)&&et.length<=4)};if(!rt||ia(rt)){const Re=$?.packageId??$?.package_id??(Array.isArray($?.items)&&$.items.length?$.items[0]?.packageId??$.items[0]?.package_id:null);if(Re)try{const et=Xs(Re);et&&et.package_code&&(rt=et.package_code)}catch{}}if(!rt||ia(rt))try{const Re=_n($?.description||"");if(Re){const et=wr();let tn=et.find($t=>_n($t?.name||$t?.title||$t?.label||"")===Re);tn||(tn=et.find($t=>{const oa=_n($t?.name||$t?.title||$t?.label||"");return oa.includes(Re)||Re.includes(oa)})),tn&&tn.package_code&&(rt=tn.package_code)}}catch{}const ra=it?rt??Ct??"":$?.barcode??Ct??"",cs=ra!=null?String(ra):"";let Sn=Number.isFinite(Number($?.totalPrice))?Number($.totalPrice):Number((Fe*le).toFixed(2));return Sn=Ae(Sn),{...$,isPackage:it,desc:$?.description,barcode:cs,packageCodeResolved:rt||"",qty:le,price:Sn,totalPrice:Sn,unitPriceValue:Fe}}),Se=yi.filter($=>D("items",$.id)),Ee=Se.length>0,He=Ee?Se.map($=>`<th>${E($.labelKey?o($.labelKey,$.fallback):$.fallback)}</th>`).join(""):"",Ce=ce.length>0?ce.map(($,le)=>`<tr>${Se.map(ue=>`<td>${ue.render($,le)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Se.length,1)}" class="empty">${E(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,xe=W("items")?Ee?`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${He}</tr>
              </thead>
              <tbody>${Ce}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.items.title","المعدات"))}</h3>
            ${B}
          </section>`:"",Ie=bi.filter($=>D("crew",$.id)),R=D("crew","groupByPosition"),ne=Ie.length>0,k=Array.isArray(s)?s:[],ee=$=>{const le=$&&$.positionId!=null?`id:${String($.positionId)}`:(()=>{const it=($?.positionLabel||$?.position_name||$?.position||"").trim().toLowerCase();return it?`label:${it}`:""})(),ue=Number.isFinite(Number($?.positionClientPrice))?Number($.positionClientPrice):0,Fe=ue>0?`|p:${ue.toFixed(2)}`:"";return`${le}${Fe}`},A=(()=>{const $=new Map;return k.forEach(le=>{const ue=ee(le);ue&&$.set(ue,($.get(ue)||0)+1)}),$})(),ae=(()=>{const $=[];return Ie.forEach(le=>{le.id==="position"?($.push({...le,render:ue=>{const Fe=ue?.positionLabel??ue?.position_name??ue?.role??o("reservations.crew.positionFallback","منصب بدون اسم");if(R)return E(h(String(Fe)));const it=ee(ue),Ct=it&&A.get(it)||0,rt=Ct>1?` × ${h(String(Ct))}`:"";return E(h(String(Fe))+rt)}}),R&&$.push({id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:ue=>E(h(String(ue?.__count||0)))})):le.id==="price"&&R?$.push({...le,render:ue=>{const Fe=Number.isFinite(Number(ue?.positionClientPrice))?Number(ue.positionClientPrice):0,it=Math.max(1,Number(ue?.__count||1)),Ct=Fe*it;return E(`${h(Ct.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}}):$.push(le)}),$})(),G=ne?ae.map($=>`<th>${E($.labelKey?o($.labelKey,$.fallback):$.fallback)}</th>`).join(""):"",fe=R?(()=>{const $=new Map;return k.forEach(le=>{const ue=ee(le);if(!ue)return;const Fe=$.get(ue);Fe?Fe.__count+=1:$.set(ue,{...le,__count:1})}),Array.from($.values())})():k,we=fe.length?fe.map(($,le)=>`<tr>${ae.map(ue=>`<td>${ue.render($,le)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(ae.length,1)}" class="empty">${E(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,_e=W("crew")?ne?`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${G}</tr>
              </thead>
              <tbody>${we}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${B}
          </section>`:"",Ze=W("notes")?`<section class="quote-section">
        <h3>${E(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${E(T||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",Ke=[];D("payment","beneficiary")&&Ke.push(H(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Oe.beneficiaryName)),D("payment","bank")&&Ke.push(H(o("reservations.quote.labels.bank","اسم البنك"),Oe.bankName)),D("payment","account")&&Ke.push(H(o("reservations.quote.labels.account","رقم الحساب"),h(Oe.accountNumber))),D("payment","iban")&&Ke.push(H(o("reservations.quote.labels.iban","رقم الآيبان"),h(Oe.iban)));const Ue=`<section class="quote-section">
      <div class="payment-block">
        <h3>${E(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${Ke.length?Ke.join(""):B}</div>
      </div>
      <p class="quote-approval-note">${E(Oe.approvalNote)}</p>
    </section>`,Qe=`<footer class="quote-footer">
        <h4>${E(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${X.map($=>`<li>${E($)}</li>`).join("")}</ul>
      </footer>`,st=[];z&&M?st.push(Be(`<div class="quote-section-row">${z}${M}</div>`,{blockType:"group"})):(M&&st.push(Be(M)),z&&st.push(Be(z))),V&&st.push(Be(V));const vt=[];xe&&vt.push(Be(xe,{blockType:"table",extraAttributes:'data-table-id="items"'})),_e&&vt.push(Be(_e,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const en=[];ke&&en.push(Be(ke,{blockType:"summary"})),Ze&&en.push(Be(Ze));const Ne=[Be(Ue,{blockType:"payment"}),Be(Qe,{blockType:"footer"})],Xe=[...Ba(st,"reservations.quote.placeholder.page1"),...vt,...Ba(en,"reservations.quote.placeholder.page2"),...Ne],kt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${E(Oe.logoUrl)}" alt="${E(Oe.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${E(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${E(Oe.companyName)}</p>
        <p class="quote-company-cr">${E(o("reservations.quote.labels.cr","السجل التجاري"))}: ${E(Oe.commercialRegistry)}</p>
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
      <style>${ho}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${kt}
          ${Xe.join("")}
        </div>
      </div>
    </div>
  `}async function Ro(){try{const e=ye();if((Array.isArray(e?.packages)?e.packages:[]).length>0)return;const n=await ht("/packages/?all=1"),a=Array.isArray(n?.data)?n.data:Array.isArray(n)?n:[];a.length&&(Oa({packages:a}),document.dispatchEvent?.(new CustomEvent("packages:changed",{detail:{packages:a}})))}catch{}}function Nu(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{i(),t()},s=()=>{i(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},i=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function Jn(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),i=a.map(c=>Nu(c)),r=[s,...i].map(c=>c.catch(l=>(Bt("asset load failed",l),Gd(),null)));await Promise.all(r),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function Fa(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),i=e.querySelector("[data-quote-source]"),r=i?.querySelector("[data-quote-header-template]");if(!s||!i||!r)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await $o(i),await Jn(i),s.innerHTML="";const c=Array.from(i.querySelectorAll(":scope > [data-quote-block]"));let l=null,d=null;const u=S=>{S.style.margin="0 auto",S.style.breakInside="avoid",S.style.pageBreakInside="avoid",S.style.pageBreakAfter="auto",S.style.breakAfter="auto"},b=()=>{const S=a.createElement("div"),I=s.childElementCount===0;if(S.className="quote-page",S.dataset.pageIndex=String(s.childElementCount),I){S.classList.add("quote-page--primary");const T=r.cloneNode(!0);T.removeAttribute("data-quote-header-template"),S.appendChild(T)}else S.classList.add("quote-page--continuation");const j=a.createElement("main");j.className="quote-body",S.appendChild(j),s.appendChild(S),u(S),l=S,d=j},f=()=>{(!l||!d||!d.isConnected)&&b()},m=()=>{if(!l||!d||d.childElementCount>0)return;const S=l;l=null,d=null,S.parentNode&&S.parentNode.removeChild(S)},p=()=>{l=null,d=null},g=()=>l?l.scrollHeight-l.clientHeight>Ao:!1,v=(S,{allowOverflow:I=!1}={})=>(f(),d.appendChild(S),g()&&!I?(d.removeChild(S),m(),!1):!0),_=S=>{const I=S.cloneNode(!0);I.removeAttribute?.("data-quote-block"),I.removeAttribute?.("data-block-type"),I.removeAttribute?.("data-table-id"),!v(I)&&(p(),!v(I)&&v(I,{allowOverflow:!0}))},q=S=>{const I=S.querySelector("table");if(!I){_(S);return}const j=S.querySelector("h3"),T=I.querySelector("thead"),X=Array.from(I.querySelectorAll("tbody tr"));if(!X.length){_(S);return}let C=null,D=0;const W=(F=!1)=>{const N=S.cloneNode(!1);N.removeAttribute("data-quote-block"),N.removeAttribute("data-block-type"),N.removeAttribute("data-table-id"),N.classList.add("quote-section--table-fragment"),F&&N.classList.add("quote-section--table-fragment--continued");const H=j?j.cloneNode(!0):null;H&&N.appendChild(H);const Q=I.cloneNode(!1);Q.classList.add("quote-table--fragment"),T&&Q.appendChild(T.cloneNode(!0));const z=a.createElement("tbody");return Q.appendChild(z),N.appendChild(Q),{section:N,body:z}},B=(F=!1)=>C||(C=W(F),v(C.section)||(p(),v(C.section)||v(C.section,{allowOverflow:!0})),C);X.forEach(F=>{B(D>0);const N=F.cloneNode(!0);if(C.body.appendChild(N),g()&&(C.body.removeChild(N),C.body.childElementCount||(d.removeChild(C.section),C=null,m()),p(),C=null,B(D>0),C.body.appendChild(N),g())){C.section.classList.add("quote-section--table-fragment--overflow"),D+=1;return}D+=1}),C=null};if(!c.length)return;c.forEach(S=>{S.getAttribute("data-block-type")==="table"?q(S):_(S)});const P=Array.from(s.children),x=[];if(P.forEach((S,I)=>{const j=S.querySelector(".quote-body");if(I!==0&&(!j||j.childElementCount===0)){S.remove();return}x.push(S)}),!n){const S=a.defaultView||window,I=Math.min(3,Math.max(1,S.devicePixelRatio||1)),j=ss()?Math.min(2,I):I;x.forEach(T=>du(T,{pixelRatio:j}))}x.forEach((S,I)=>{const j=I===0;S.style.pageBreakAfter="auto",S.style.breakAfter="auto",S.style.pageBreakBefore=j?"auto":"always",S.style.breakBefore=j?"auto":"page",n?S.style.boxShadow="":S.style.boxShadow="none"});const O=x[x.length-1]||null;l=O,d=O?.querySelector(".quote-body")||null,await Jn(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function Mo(e=0){return e<=0?new Promise(t=>requestAnimationFrame(()=>t())):new Promise(t=>setTimeout(t,e))}function zo(e){return e?Array.from(e.querySelectorAll(".quote-page")).some(n=>n.scrollHeight-n.clientHeight>Ao):!1}function Ai(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function ju(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[i,r]=await Promise.all([pu(),uu()]),c=e.ownerDocument||document,l=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,l,c?.documentElement?.getAttribute?.("dir")].some(S=>typeof S=="string"&&S.toLowerCase().startsWith("rtl")),b=typeof window<"u"&&window.devicePixelRatio||1,f=Si(),m=Io(),p=ss();let g;p?g=1.5:m?g=Math.min(1.7,Math.max(1.2,b*1.1)):f?g=Math.min(1.8,Math.max(1.25,b*1.2)):g=Math.min(2,Math.max(1.6,b*1.4));const v=p||m?.9:f?.92:.95,_=new i({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),q={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let P=0;const x=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let S=0;S<s.length;S+=1){const I=s[S];await $o(I),await Jn(I);const j=I.ownerDocument||document,T=j.createElement("div");Object.assign(T.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const X=I.cloneNode(!0);X.style.width=`${ga}px`,X.style.maxWidth=`${ga}px`,X.style.minWidth=`${ga}px`,X.style.height=`${ha}px`,X.style.maxHeight=`${ha}px`,X.style.minHeight=`${ha}px`,X.style.position="relative",X.style.background="#ffffff",Ai(X),T.appendChild(X),j.body.appendChild(T);let C;try{await Jn(X),C=await r(X,{...q,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(z){throw zs(z,"pageCapture",{toastMessage:x}),z}finally{T.parentNode?.removeChild(T)}if(!C)continue;const D=C.width||1,B=(C.height||1)/D;let F=Ds,N=F*B,H=0;if(N>ba){const z=ba/N;N=ba,F=F*z,H=Math.max(0,(Ds-F)/2)}const Q=C.toDataURL("image/jpeg",v);P>0&&_.addPage(),_.addImage(Q,"JPEG",H,0,F,N,`page-${P+1}`,"FAST"),P+=1,await new Promise(z=>window.requestAnimationFrame(z))}}catch(S){throw Os({safariWindowRef:n,mobileWindowRef:a}),S}if(P===0)throw Os({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(m||p){const S=_.output("blob");if(p){const I=URL.createObjectURL(S);Un();try{window.location.assign(I)}catch(j){Bt("mobile safari blob navigation failed",j)}finally{setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{const I=URL.createObjectURL(S),j=()=>m&&n&&!n.closed?n:a&&!a.closed?a:null,T=(C,D)=>{if(Un(),!C){window.location.assign(D);return}try{C.location.replace(D),C.focus?.()}catch(W){Bt("direct blob navigation failed",W);try{C.document.open(),C.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${E(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${D}" title="PDF preview"></iframe></body></html>`),C.document.close()}catch(B){Bt("iframe blob delivery failed",B),window.location.assign(D)}}},X=j();T(X,I),setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{Un();const S=_.output("bloburl"),I=document.createElement("a");I.href=S,I.download=t,I.rel="noopener",I.style.display="none",document.body.appendChild(I),I.click(),setTimeout(()=>{URL.revokeObjectURL(S),I.remove()},2e3)}}function Xt(){if(!L||!Z)return;const{previewFrame:e}=Z;if(!e)return;const t=L.context||"reservation",n=Do({context:t,reservation:L.reservation,customer:L.customer,project:L.project,crewAssignments:L.crewAssignments,totals:L.totals,totalsDisplay:L.totalsDisplay,rentalDays:L.rentalDays,currencyLabel:L.currencyLabel,sections:L.sections,fieldSelections:L.fields,quoteNumber:L.quoteNumber,quoteDate:L.quoteDateLabel,terms:L.terms,projectCrew:L.projectCrew,projectExpenses:L.projectExpenses,projectEquipment:L.projectEquipment,projectInfo:L.projectInfo,clientInfo:L.clientInfo,paymentSummary:L.paymentSummary,projectTotals:L.projectTotals});ln("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,i=a?.documentElement||a;i&&(lo(i),oo(i,s),co(i,s));const r=a?.getElementById("quotation-pdf-root");try{r&&(await Fa(r,{context:"preview"}),await Mo(120),zo(r)&&await Fa(r,{context:"preview"}),Ai(r))}catch(m){console.error("[reservations/pdf] failed to layout preview document",m)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),l=a?.querySelector(".quote-preview-pages"),d=ga;let u=18;if(l&&a?.defaultView){const m=a.defaultView.getComputedStyle(l),p=parseFloat(m.rowGap||m.gap||`${u}`);Number.isFinite(p)&&p>=0&&(u=p)}const b=ha,f=c.length?c.length*b+Math.max(0,(c.length-1)*u):b;if(e.dataset.baseWidth=String(d),e.dataset.baseHeight=String(f),e.style.width=`${d}px`,e.style.minWidth=`${d}px`,e.style.height=`${f}px`,e.style.minHeight=`${f}px`,Z?.previewFrameWrapper&&!Z?.userAdjustedZoom){const m=Z.previewFrameWrapper.clientWidth-24;m>0&&m<d?wt=Math.max(m/d,.3):wt=1}Ho(wt)}finally{Un()}},{once:!0})}function Tu(e){if(!L)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?L.sections.add(n):L.sections.delete(n),No(L),Oo(),Xt())}function Bu(e){if(!L)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=L.context||"reservation",i=L.fields||(L.fields=as(s)),r=Wd(i,n);t.checked?r.add(a):r.delete(a),No(L),Xt()}function Fu(e){if(!L)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(qi(L,n),L.sectionExpansions[n]=t.open)}function Oo(){if(!Z?.toggles||!L)return;const{toggles:e}=Z,t=L.fields||{},n=L.context||"reservation";qi(L);const a=ns(n),s=fo(n),i=a.map(({id:r,labelKey:c,fallback:l})=>{const d=o(c,l),u=L.sections.has(r),b=s[r]||[],f=Xd(L,r),m=b.length?`<div class="quote-toggle-sublist">
          ${b.map(p=>{const g=hi(t,r,p.id),v=u?"":"disabled",_=p.labelKey?o(p.labelKey,p.fallback):p.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${r}" data-field-id="${p.id}" ${g?"checked":""} ${v}>
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
    <span data-quote-status-text>${E(go("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(f),r?.addEventListener("click",async()=>{if(L){r.disabled=!0;try{await Ko()}finally{r.disabled=!1}}});const v=()=>{Rs()||Ms(e)};d.forEach(x=>{x?.addEventListener("click",v)}),l&&!d.includes(l)&&l.addEventListener("click",v),e.addEventListener("click",x=>{Rs()||x.target===e&&Ms(e)}),Z={modal:e,toggles:t,preview:n,previewScroll:p,previewFrameWrapper:m,zoomControls:f,zoomValue:f.querySelector("[data-zoom-value]"),previewFrame:b,meta:a,downloadBtn:r,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:i,statusKind:null,userAdjustedZoom:!1};const _=f.querySelector("[data-zoom-out]"),q=f.querySelector("[data-zoom-in]"),P=f.querySelector("[data-zoom-reset]");return _?.addEventListener("click",()=>sr(-.1)),q?.addEventListener("click",()=>sr(.1)),P?.addEventListener("click",()=>Da(1,{markManual:!0})),s&&s.addEventListener("input",Ru),i&&i.addEventListener("click",Mu),Da(wt),Z}function Da(e,{silent:t=!1,markManual:n=!1}={}){wt=Math.min(Math.max(e,.25),2.2),n&&Z&&(Z.userAdjustedZoom=!0),Ho(wt),!t&&Z?.zoomValue&&(Z.zoomValue.textContent=`${Math.round(wt*100)}%`)}function sr(e){Da(wt+e,{markManual:!0})}function Ho(e){if(!Z?.previewFrame||!Z.previewFrameWrapper)return;const t=Z.previewFrame,n=Z.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",Si()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function Vo(){if(!Z?.meta||!L)return;const{meta:e}=Z;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${E(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${E(L.quoteNumber)}</strong></div>
      <div><span>${E(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${E(L.quoteDateLabel)}</strong></div>
    </div>
  `}function xi(){if(!Z?.termsInput)return;const e=(L?.terms&&L.terms.length?L.terms:at).join(`
`);Z.termsInput.value!==e&&(Z.termsInput.value=e)}function Ru(e){if(!L)return;const t=Ts(e?.target?.value??"");if(t.length){L.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{L.terms=[...at],xi();const n=at.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}Xt()}function Mu(e){if(e?.preventDefault?.(),!L)return;L.terms=[...at];const t=document.getElementById("reservation-terms");t&&(t.value=at.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=at.join(`
`)),xi(),Xt()}async function Ko(){if(!L)return;ln("export");const t=!Si()&&Io(),n=ss(),a=null,s=!n&&t?window.open("","_blank"):null;(l=>{if(l)try{l.document.open(),l.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${E(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${E(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${E(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),l.document.close()}catch(d){Bt("failed to prime download window",d)}})(s);let r=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await mu(),vs("html2pdf ensured");const l=L.context||"reservation",d=Do({context:l,reservation:L.reservation,customer:L.customer,project:L.project,crewAssignments:L.crewAssignments,totals:L.totals,totalsDisplay:L.totalsDisplay,rentalDays:L.rentalDays,currencyLabel:L.currencyLabel,sections:L.sections,fieldSelections:L.fields,quoteNumber:L.quoteNumber,quoteDate:L.quoteDateLabel,terms:L.terms,projectCrew:L.projectCrew,projectExpenses:L.projectExpenses,projectEquipment:L.projectEquipment,projectInfo:L.projectInfo,clientInfo:L.clientInfo,paymentSummary:L.paymentSummary,projectTotals:L.projectTotals});r=document.createElement("div"),r.innerHTML=d,Object.assign(r.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(r),lo(r),oo(r),co(r),vs("export container prepared");const u=r.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await Fa(u,{context:"export"}),await Mo(120),zo(u)&&await Fa(u,{context:"export"}),await Jn(u),Ai(u),vs("layout complete for export document")}catch(f){zs(f,"layoutQuoteDocument",{suppressToast:!0})}}const b=`quotation-${L.quoteNumber}.pdf`;await ju(u,{filename:b,safariWindowRef:s,mobileWindowRef:a}),L.sequenceCommitted||(gu(L.quoteSequence),L.sequenceCommitted=!0)}catch(l){Os({container:r,safariWindowRef:s,mobileWindowRef:a}),r=null,zs(l,"exportQuoteAsPdf",{toastMessage:c})}finally{r&&r.parentNode&&r.parentNode.removeChild(r),Un()}}function Uo(){const e=Du();e?.modal&&(Kn=!1,wt=1,Z&&(Z.userAdjustedZoom=!1),Da(wt,{silent:!0}),Oo(),Vo(),xi(),Xt(),Qd(e.modal))}async function zu({reservation:e,customer:t,project:n}){if(!e){w(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}await Ro();const a=wi(e),{totalsDisplay:s,totals:i,rentalDays:r}=Bo(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:l,quoteNumber:d}=Po("reservation"),u=new Date,b=jd();L={context:"reservation",reservation:e,customer:t,project:n,crewAssignments:a,totals:i,totalsDisplay:s,rentalDays:r,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(ns("reservation").filter(f=>f.defaultSelected).map(f=>f.id)),sectionExpansions:vi("reservation"),fields:as("reservation"),terms:b,quoteSequence:l,quoteNumber:d,quoteDate:u,quoteDateLabel:To(u),sequenceCommitted:!1},jo(L),Uo();try{Eo()}catch{}}async function Kp({project:e}){if(!e){w(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}await Ro();let t=ar(e);const{project:n}=t;if(!n){w(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}try{(!Array.isArray(t.equipmentItems)||t.equipmentItems.length===0)&&n?.id!=null&&(await ni({project_id:n.id}),t=ar(n))}catch(c){console.warn("[reservationPdf] refreshReservationsForProject failed, proceeding with snapshot/state",c)}const{sequence:a,quoteNumber:s}=Po("project"),i=new Date,r=[...Nd];L={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,equipmentItems:t.equipmentItems||[],crewAssignments:t.crewAssignments||[],totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(ns("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:vi("project"),fields:as("project"),terms:r,quoteSequence:a,quoteNumber:s,quoteDate:i,quoteDateLabel:To(i),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},jo(L),Uo();try{Eo()}catch{}}function Ou({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=un(),{reservations:i=[],customers:r=[],technicians:c=[],projects:l=[]}=ye(),d=i.map(q=>{const P=Es(q);return{...P,id:q.id??P.id,reservationId:q.reservationId??q.reservation_id??P.reservationId,reservationCode:q.reservationCode??q.reservation_code??P.reservationCode}}),u=d,b=Array.isArray(s)?s:c||[],f=new Map((l||[]).map(q=>[String(q.id),q])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!u||u.length===0){m.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const p=t||hd(),g=new Map(r.map(q=>[String(q.id),q])),v=new Map(b.map(q=>[String(q.id),q])),_=Ed({reservations:d,filters:p,customersMap:g,techniciansMap:v,projectsMap:f});if(_.length===0){m.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${wd({entries:_,customersMap:g,techniciansMap:v,projectsMap:f})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(q=>{const P=Number(q.dataset.reservationIndex);Number.isNaN(P)||q.addEventListener("click",()=>{typeof n=="function"&&n(P)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(q=>{const P=Number(q.dataset.reservationIndex);Number.isNaN(P)||q.addEventListener("click",x=>{x.stopPropagation(),typeof a=="function"&&a(P,x)})})}function Hu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:i=[],projects:r=[]}=ye(),c=s.map(g=>{const v=Es(g);return{...v,id:g.id??v.id,reservationId:g.reservationId??g.reservation_id??v.reservationId,reservationCode:g.reservationCode??g.reservation_code??v.reservationCode}}),l=s[e];if(!l)return w(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=c[e]??Es(l),u=i.find(g=>String(g.id)===String(l.customerId)),b=l.projectId?r.find(g=>String(g.id)===String(l.projectId)):null,f=document.getElementById("reservation-details-body"),m=document.getElementById("reservationDetailsModal"),p=()=>{const g=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},v=document.getElementById("reservation-details-edit-btn");v&&(v.onclick=()=>{g(),typeof t=="function"&&t(e,{reservation:l,customer:u,getEditContext:a})});const _=document.getElementById("reservation-details-delete-btn");_&&(_.onclick=()=>{g(),typeof n=="function"&&n(e,{reservation:l,customer:u})});const q=f?.querySelector('[data-action="open-project"]');q&&b&&q.addEventListener("click",()=>{g();const x=b?.id!=null?String(b.id):"",O=x?`projects.html?project=${encodeURIComponent(x)}`:"projects.html";window.location.href=O});const P=document.getElementById("reservation-details-export-btn");P&&(P.onclick=async x=>{x?.preventDefault?.(),x?.stopPropagation?.(),P.blur();try{await zu({reservation:l,customer:u,project:b})}catch(O){console.error("❌ [reservations] export to PDF failed",O),w(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}});try{const x=f?.querySelector("[data-tech-slider]");if(x){const O=x.querySelector("[data-slider-track]"),S=x.querySelector("[data-slider-prev]"),I=x.querySelector("[data-slider-next]");if(O&&(S||I)){const j=document.documentElement.getAttribute("dir")==="rtl"||document.body.getAttribute("dir")==="rtl",T=()=>{const D=O.querySelector(".reservation-technician-card"),W=D&&D.getBoundingClientRect().width||220,B=12,F=Math.max(1,Math.floor(O.clientWidth/(W+B)));return Math.max(W+B,Math.floor(F*(W+B)*.9))},X=()=>{const D=Math.max(0,O.scrollWidth-O.clientWidth-2),W=O.scrollLeft<=1,B=O.scrollLeft>=D;S&&(S.disabled=W),I&&(I.disabled=B)},C=D=>{const W=T()*D,B=j?-W:W;O.scrollBy({left:B,behavior:"smooth"})};S?.addEventListener("click",()=>C(-1)),I?.addEventListener("click",()=>C(1)),O.addEventListener("scroll",X,{passive:!0}),window.addEventListener("resize",X,{passive:!0}),setTimeout(X,0)}}}catch{}};if(f){const g=un()||[];f.innerHTML=Xi(d,u,g,e,b),p(),Ar().then(()=>{const v=un()||[];f.innerHTML=Xi(d,u,v,e,b),p()}).catch(()=>{})}return m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}function Qo(){const e=()=>{Bn(),Ye(),un()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let ir=!1,rr=null;function Vu(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function Up(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=Vu(n);if(!a&&ir&&Nt().length>0&&s===rr)return Nt();try{const i=await ni(n||{});return ir=!0,rr=s,i}catch(i){if(console.error("❌ [reservationsActions] Failed to load reservations from API",i),!t)throw i;return Nt()}}async function Ku(e,{onAfterChange:t}={}){if(!bn())return Zn(),!1;const a=Nt()[e];if(!a)return w(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return w(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await tl(s),Qo(),t?.({type:"deleted",reservation:a}),w(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(i){console.error("❌ [reservationsActions] deleteReservation failed",i);const r=Ka(i)?i.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return w(r,"error"),!1}}async function Uu(e,{onAfterChange:t}={}){const a=Nt()[e];if(!a)return w(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return w(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:i}=Wt(a);if(i)return w(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const r=await nl(s);return Qo(),t?.({type:"confirmed",reservation:r}),w(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(r){console.error("❌ [reservationsActions] confirmReservation failed",r);const c=Ka(r)?r.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return w(c,"error"),!1}}function Dn(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Wn(e,n),end:Wn(t,a)}}function Ra(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ii(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function Go(){const{container:e,select:t,hint:n,addButton:a}=Ii();if(!t)return;const s=t.value,i=fr(),r=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,l=i.map(u=>{const b=Number.isFinite(Number(u.price))?Number(u.price):0,f=h(b.toFixed(2)),m=`${u.name} — ${f} ${r}`;return`<option value="${Ra(u.id)}">${Ra(m)}</option>`}).join("");t.innerHTML=`${c}${l}`;const d=i.length>0;t.disabled=!d,a&&(a.disabled=!d),e&&(e.hidden=!d,e.setAttribute("aria-hidden",d?"false":"true")),n&&(d?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),d&&s&&i.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function Qu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||w(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=Yt(),{start:i,end:r}=Dn(),{reservations:c=[]}=ye(),l=a!=null&&c[a]||null,d=l?.id??l?.reservationId??null,u=Zr(n,{existingItems:s,start:i,end:r,ignoreReservationId:d});if(!u.success)return t||w(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const b=[...s,u.package];return Zt(a,b),Jt(b),pt(),t||w(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function or(){const{select:e}=Ii();if(!e)return;const t=e.value||"";Qu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function Gu(){const{addButton:e,select:t}=Ii();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{or()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),or())}),t.dataset.listenerAttached="true"),Go()}function Jt(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),r=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,lr(t);return}const l=Nn(e);t.innerHTML=l.map(d=>{const u=d.items[0]||{},b=hn(u)||d.image,f=b?`<img src="${b}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=d.items.some(C=>C?.type==="package"),p=h(String(d.count)),g=Me(d.unitPrice),v=Number.isFinite(g)?Ae(g):0,_=Me(d.totalPrice),q=Number.isFinite(_)?_:v*(Number.isFinite(d.count)?d.count:1),P=Ae(q),x=`${h(v.toFixed(2))} ${a}`,O=`${h(P.toFixed(2))} ${a}`,S=d.barcodes.map(C=>h(String(C||""))).filter(Boolean),I=S.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${S.map(C=>`<li>${C}</li>`).join("")}
            </ul>
          </details>`:"";let j="";if(m){const C=new Map,D=B=>{const F=Number.parseFloat(h(String(B??"")).replace(/[^0-9.]/g,""));return!Number.isFinite(F)||F<=0||F>99?1:Math.round(F)},W=[];if(Array.isArray(d.packageItems)&&d.packageItems.length&&W.push(...d.packageItems),d.items.forEach(B=>{Array.isArray(B?.packageItems)&&W.push(...B.packageItems)}),W.forEach(B=>{if(!B)return;const F=re(B.barcode||B.normalizedBarcode||B.desc||Math.random());if(!F)return;const N=C.get(F),H=D(B.qtyPerPackage??B.perPackageQty??B.quantityPerPackage??B.qty??B.quantity??1),Q=Math.max(1,Math.min(H,99));if(N){N.qty=Q;return}C.set(F,{desc:B.desc||B.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Q,barcode:B.barcode??B.normalizedBarcode??""})}),C.size){const B=Array.from(C.values()).map(F=>{const N=h(String(F.qty>0?Math.min(F.qty,99):1)),H=Ra(F.desc||""),Q=F.barcode?` <span class="reservation-package-items__barcode">(${Ra(h(String(F.barcode)))})</span>`:"";return`<li>${H}${Q} × ${N}</li>`}).join("");j=`
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
                ${m?`${j||""}${I||""}`:I}
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
      `}).join(""),lr(t)}function Wu(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function is(){const e=document.getElementById("edit-res-payment-history");if(!e)return;let t=rs();const n=document.getElementById("edit-res-project")?.value||"";if(n)try{const r=(ye()?.projects||[]).find(l=>String(l.id)===String(n)),c=Array.isArray(r?.paymentHistory)?r.paymentHistory:Array.isArray(r?.payment_history)?r.payment_history:Array.isArray(r?.payments)?r.payments:Array.isArray(r?.paymentLogs)?r.paymentLogs:[];Array.isArray(c)&&c.length&&(t=c)}catch{}if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة")}</div>`,cr();return}const a=o("reservations.create.summary.currency","SR"),s=t.map((i,r)=>{const c=Number.isFinite(Number(i?.amount))&&Number(i.amount)>0?`${h(Number(i.amount).toFixed(2))} ${a}`:"—",l=Number.isFinite(Number(i?.percentage))&&Number(i.percentage)>0?`${h(Number(i.percentage).toFixed(2))}%`:"—",d=i?.recordedAt?h(dt(i.recordedAt)):"—",u=Wu(i?.type),b=i?.note?h(i.note):"";return`
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
  `,cr()}function Xu(){if(Yn()){w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=Jo(e);let a=Yo(t);if(!Number.isFinite(a)||a<=0){w(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=ws.lastResult,i=Number(s?.total)||0,r=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,l=o("reservations.create.summary.currency","SR");let d=null,u=null;if(n==="percent"){const f=Math.max(0,100-r);if(f<=1e-4){w(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const p=h(m.toFixed(2));w(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",p)),a=m}u=Number(a.toFixed(2)),i>0&&(d=a/100*i)}else{const f=Math.max(0,i-c);if(f<=1e-4){w(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const p=`${h(m.toFixed(2))} ${l}`;w(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",p)),a=m}d=Number(a.toFixed(2)),i>0&&(u=d/i*100)}d!=null&&(d=Number(d.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const b={type:n,value:a,amount:d,percentage:u,recordedAt:new Date().toISOString()};cp(b),_i(rs()),is(),pt(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),w(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function cr(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(Yn()){n.preventDefault(),w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Xu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(Yn()){n.preventDefault(),w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(lp(s),_i(rs()),is(),pt(),w(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function Ju(e){const{index:t,items:n}=Yt(),s=Nn(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const i=s.itemIndices[s.itemIndices.length-1];if(i==null)return;const r=n.filter((c,l)=>l!==i);Zt(t,r),Jt(r),pt()}function Yu(e){const{index:t,items:n}=Yt(),a=n.filter(s=>Va(s)!==e);a.length!==n.length&&(Zt(t,a),Jt(a),pt())}function Zu(e){const{index:t,items:n}=Yt(),s=Nn(n).find(v=>v.key===e);if(!s||s.items.some(v=>v?.type==="package"))return;const{start:i,end:r}=Dn();if(!i||!r){w(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=ye(),l=t!=null&&c[t]||null,d=l?.id??l?.reservationId??null,u=new Set(n.map(v=>re(v.barcode))),{equipment:b=[]}=ye(),f=(b||[]).find(v=>{const _=re(v?.barcode);return!_||u.has(_)||Va({desc:v?.desc||v?.description||v?.name||"",price:Number(v?.price)||0})!==e||!$r(v)?!1:!xt(_,i,r,d)});if(!f){w(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const m=re(f.barcode),p=gn(f);if(!p){w(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:p,equipmentId:p,barcode:m,desc:f.desc||f.description||f.name||s.description||"",qty:1,price:Number.isFinite(Number(f.price))?Number(f.price):s.unitPrice,image:hn(f)}];Zt(t,g),Jt(g),pt()}function lr(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:i}=n.dataset;if(a==="decrease-edit-group"&&s){Ju(s);return}if(a==="increase-edit-group"&&s){Zu(s);return}if(a==="remove-edit-group"&&s){Yu(s);return}if(a==="remove-edit-item"){const r=Number(i);Number.isNaN(r)||np(r)}}),e.dataset.groupListenerAttached="true")}function Yn(){return!!document.getElementById("edit-res-project")?.value}function ep(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{Yn()&&(w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function tp(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),i=document.getElementById("edit-res-payment-progress-type"),r=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),l=document.getElementById("edit-res-payment-history");if([n,a,s,i,r,c,l].forEach(ep),e){if(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s){const d=document.getElementById("edit-res-project")?.value||"";let u="unpaid";if(d)try{const f=(ye()?.projects||[]).find(p=>String(p.id)===String(d)),m=typeof f?.paymentStatus=="string"?f.paymentStatus.toLowerCase():null;m&&["paid","partial","unpaid"].includes(m)&&(u=m)}catch{}s.value=u,s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected}i&&(i.value=i.value||"percent",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),r&&(r.value="",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),l&&(l.dataset.linkedDisabled="true")}else n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.dataset.linkedDisabled="false")}function pt(){const e=document.getElementById("edit-res-summary");if(!e)return;is();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),lt(a),pt()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const i=parseFloat(s)||0,r=n?.value||"percent",c=Yn();tp(c);const l=document.getElementById("edit-res-tax"),d=c?!1:l?.checked||!1,u=!c&&a?.dataset?.userSelected==="true";let b="unpaid";if(c){const P=document.getElementById("edit-res-project")?.value||"";if(P)try{const O=(ye()?.projects||[]).find(I=>String(I.id)===String(P)),S=typeof O?.paymentStatus=="string"?O.paymentStatus.toLowerCase():null;S&&["paid","partial","unpaid"].includes(S)&&(b=S)}catch{}}else b=u&&a?.value||"unpaid";let f=null;!c&&d&&(gt("edit-res-company-share"),f=$n("edit-res-company-share"),(!Number.isFinite(f)||f<=0)&&(gt("edit-res-company-share"),f=$n("edit-res-company-share")));const{items:m=[],payments:p=[]}=Yt(),{start:g,end:v}=Dn(),_=ws({items:m,discount:i,discountType:r,applyTax:d,paidStatus:b,start:g,end:v,companySharePercent:f,paymentHistory:p});e.innerHTML=_;const q=ws.lastResult;if(q&&a){const P=q.paymentStatus;u?lt(a,a.value):(a.value!==P&&(a.value=P),a.dataset&&delete a.dataset.userSelected,lt(a,P))}else a&&lt(a,a.value)}function np(e){if(e==null)return;const{index:t,items:n}=Yt();if(!Array.isArray(n))return;const a=n.filter((s,i)=>i!==e);Zt(t,a),Jt(a),pt()}function ap(e){const t=e?.value??"",n=re(t);if(!n)return;const a=Qa(n);if(!a){w(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=Ft(a);if(s==="maintenance"||s==="retired"){w(yn(s));return}const i=re(n),{index:r,items:c=[]}=Yt();if(c.findIndex(v=>re(v.barcode)===i)>-1){w(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=Dn();if(!d||!u){w(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:b=[]}=ye(),f=r!=null&&b[r]||null,m=f?.id??f?.reservationId??null;if(xt(i,d,u,m)){w(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const p=gn(a);if(!p){w(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:p,equipmentId:p,barcode:i,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];Zt(r,g),e&&(e.value=""),Jt(g),pt()}function Ma(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Wr(t),a=re(n?.barcode||t);if(!n||!a){w(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=Ft(n);if(s==="maintenance"||s==="retired"){w(yn(s));return}const{start:i,end:r}=Dn();if(!i||!r){w(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:l=[]}=Yt();if(l.some(g=>re(g.barcode)===a)){w(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=ye(),b=c!=null&&u[c]||null,f=b?.id??b?.reservationId??null;if(xt(a,i,r,f)){w(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=gn(n);if(!m){w(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const p=[...l,{id:m,equipmentId:m,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];Zt(c,p),Jt(p),pt(),e.value=""}function Wo(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Ma(e))});const t=()=>{Xr(e.value,"edit-res-equipment-description-options")&&Ma(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{pt()});const e=()=>{Gu()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{Go()})}typeof window<"u"&&(window.getEditReservationDateRange=Dn,window.renderEditPaymentHistory=is);function sp(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){Ls(e);return}Ma(e)}}function Qp(){Gt(),Wo()}function ip(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let kn=null,Et=[],At=[],Hs=null,tt={},qs=!1;const rp="__DEBUG_CREW__";function op(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(rp);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function dr(e,t){if(op())try{console.log(`🪵 [crew-debug:edit] ${e}`,t)}catch{}}function Qn(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),i=!!e;if(n&&(n.value=i?"true":"false"),a){const r=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=i?r:c,a.dataset.state=i?"confirmed":"pending",a.classList.toggle("btn-success",i&&!t),a.classList.toggle("btn-outline-secondary",!i||t),a.disabled=t,a.setAttribute("aria-pressed",i?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function va(){return document.getElementById("edit-res-confirmed")?.value==="true"}function Yt(){return{index:kn,items:Et,payments:At}}function Zt(e,t,n=At){kn=typeof e=="number"?e:null,Et=Array.isArray(t)?[...t]:[],At=Array.isArray(n)?[...n]:[]}function Xo(){kn=null,Et=[],il(),At=[]}function rs(){return[...At]}function _i(e){At=Array.isArray(e)?[...e]:[]}function cp(e){e&&(At=[...At,e])}function lp(e){!Number.isInteger(e)||e<0||(At=At.filter((t,n)=>n!==e))}function Gn(e,t=1){const n=Number.parseFloat(h(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function Vs(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(h(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function dp(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?re(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:Gn(e.qty??e.quantity??e.count??1),price:Vs(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function up(e,t=0){if(!e||typeof e!="object")return null;const n=Xn(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=Gn(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),i=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:Gs(e)).map(f=>dp(f)).filter(Boolean),r=e.total_price??e.totalPrice??e.total??null;let c=Vs(e.unit_price??e.unitPrice??e.price??null,0);if((!c||c===0)&&r!=null){const f=Vs(r,0);f>0&&a>0&&(c=Number((f/a).toFixed(2)))}const l=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,l,n].find(f=>f!=null&&String(f).trim()!=="")||`Package ${n}`,b=e.image??e.cover??e.thumbnail??i.find(f=>f?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:h(String(u)),name:h(String(u)),qty:a,price:c,barcode:l,packageItems:i,image:b}}function pp(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const i=s-n;e.set(a,i>0?i:0)})}function mp(e={},t=[]){const n=Array.isArray(t)?t.map(c=>({...c})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((c,l)=>up(c,l)).filter(Boolean);if(!s.length)return n;const i=new Map;s.forEach(c=>{const l=Gn(c.qty??c.quantity??1);if(c.barcode){const d=re(c.barcode);if(d){const u=`package::${d}`;i.set(u,(i.get(u)??0)+l)}}(c.packageItems||[]).forEach(d=>{if(!d)return;const u=l*Gn(d.qty??d.quantity??1),b=d.equipmentId??null,f=d.normalizedBarcode||(d.barcode?re(d.barcode):null);if(b!=null){const m=`equipment::${String(b)}`;i.set(m,(i.get(m)??0)+u)}if(f){const m=`barcode::${f}`;i.set(m,(i.get(m)??0)+u)}})});const r=[];return n.forEach(c=>{if(!c||typeof c!="object"){r.push(c);return}if(c.type==="package"){const v=Xn(c.packageId??c.package_id??c.id??"");s.some(q=>q.packageId===v)||r.push({...c});return}const l=Gn(c.qty??c.quantity??1),d=gn(c),u=c.barcode?re(c.barcode):null,b=[];d!=null&&b.push(`equipment::${String(d)}`),u&&b.push(`barcode::${u}`);const f=b.map(v=>i.get(v)??0).filter(v=>v>0);if(!f.length){r.push({...c});return}const m=Math.min(...f);if(m<=0){r.push({...c});return}const p=Math.min(m,l);if(pp(i,b,p),p>=l)return;const g=l-p;r.push({...c,qty:g,quantity:g})}),[...r,...s.map(c=>({...c}))]}function fp(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Jo(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Yo(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function yp(e,t){if(e){e.value="";return}}function On(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Zo(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),i=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,r=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(i)?"amount":Number.isFinite(r)?"percent":null),l=c==="amount"?i??null:c==="percent"?r??null:Number.isFinite(n)?n:null,d=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:l,amount:Number.isFinite(i)?i:null,percentage:Number.isFinite(r)?r:null,note:e.note??null,recordedAt:d}}function bp(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),i=t?.projectId?String(t.projectId):"",r=Array.isArray(e)?[...e].sort((l,d)=>String(d.createdAt||d.start||"").localeCompare(String(l.createdAt||l.start||""))):[],c=[`<option value="">${On(a)}</option>`];r.forEach(l=>{c.push(`<option value="${On(l.id)}">${On(l.title||a)}</option>`)}),i&&!r.some(l=>String(l.id)===i)&&c.push(`<option value="${On(i)}">${On(s)}</option>`),n.innerHTML=c.join(""),i?n.value=i:n.value=""}function ec(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),i=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=i),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=i),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=i),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=i);else{if(t){const l=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",l&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}Ks("tax");const c=tt?.updateEditReservationSummary;typeof c=="function"&&c()}function Ks(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const i=tt?.updateEditReservationSummary;typeof i=="function"&&i()};if(qs){a();return}qs=!0;const s=()=>{qs=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(dn)),t.disabled){n.checked=!1,w(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),gt("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?gt("edit-res-company-share"):n.checked&&(n.checked=!1));s()}async function ur(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:i,ensureModal:r}={}){const{customers:c,projects:l}=ye(),u=Nt()?.[e];if(!u){w(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}tt={...tt,reservation:u,projects:l||[]},t?.(),bp(l||[],u);const b=u.projectId&&l?.find?.(M=>String(M.id)===String(u.projectId))||null,{effectiveConfirmed:f,projectLinked:m}=Wt(u,b),p=u.items?u.items.map(M=>({...M,equipmentId:M.equipmentId??M.equipment_id??M.id,barcode:re(M?.barcode)})):[],g=mp(u,p),_=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(M=>Zo(M)).filter(Boolean);Zt(e,g,_);const q=o("reservations.list.unknownCustomer","غير معروف"),P=c?.find?.(M=>String(M.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const x=document.getElementById("edit-res-id");x&&(x.value=u.reservationId||u.id);const O=document.getElementById("edit-res-customer");O&&(O.value=P?.customerName||q);const S=typeof a=="function"?a(u.start):{date:"",time:""},I=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",S.date),n?.("edit-res-start-time",S.time),n?.("edit-res-end",I.date),n?.("edit-res-end-time",I.time);const j=document.getElementById("edit-res-notes");j&&(j.value=u.notes||"");const T=document.getElementById("edit-res-discount");if(T){const M=m?0:u.discount??0;T.value=h(M)}const X=document.getElementById("edit-res-discount-type");X&&(X.value=m?"percent":u.discountType||"percent");const C=u.projectId?!1:!!u.applyTax,D=document.getElementById("edit-res-tax");D&&(D.checked=C);const W=document.getElementById("edit-res-company-share");if(W){const M=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,K=M!=null?Number.parseFloat(h(String(M).replace("%","").trim())):NaN,V=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,te=V!=null?V===!0||V===1||V==="1"||String(V).toLowerCase()==="true":Number.isFinite(K)&&K>0,me=te&&Number.isFinite(K)&&K>0?K:dn,oe=C||te;W.checked=oe,W.dataset.companyShare=String(me)}Qn(f,{disable:m});const B=document.getElementById("edit-res-paid"),F=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");B&&(B.value=F,B.dataset&&delete B.dataset.userSelected);const N=document.getElementById("edit-res-payment-progress-type"),H=document.getElementById("edit-res-payment-progress-value");N?.dataset?.userSelected&&delete N.dataset.userSelected,N&&(N.value="percent"),yp(H);const Q=document.getElementById("edit-res-cancelled");if(Q){const M=String(u?.status||u?.reservationStatus||"").toLowerCase();Q.checked=["cancelled","canceled"].includes(M),Q.checked&&Qn(f,{disable:!0})}let z=Array.isArray(u.crewAssignments)&&u.crewAssignments.length?u.crewAssignments:Array.isArray(u.techniciansDetails)&&u.techniciansDetails.length?u.techniciansDetails:(u.technicians||[]).map(M=>String(M));if(!Array.isArray(z)||z.length===0){const M=rl(u.id??u.reservationId??u.reservation_code??null);Array.isArray(M)&&M.length&&(z=M)}try{await Ar()}catch(M){console.warn("[reservationsEdit] positions load failed (non-fatal)",M)}if(ol(z),s?.(g),typeof window<"u"){const M=window?.renderEditPaymentHistory;typeof M=="function"&&M()}ec(),i?.();const J=document.getElementById("editReservationModal");Hs=fp(J,r),Hs?.show?.()}async function gp({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:i,populateEquipmentDescriptionLists:r,handleReservationsMutation:c}={}){if(kn===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const l=document.getElementById("edit-res-start")?.value?.trim(),d=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),b=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",f=document.getElementById("edit-res-notes")?.value||"",m=h(document.getElementById("edit-res-discount")?.value||"0");let p=parseFloat(m)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const v=va(),_=document.getElementById("edit-res-paid"),q=_?.dataset?.userSelected==="true",P=q&&_?.value||"unpaid",x=document.getElementById("edit-res-payment-progress-type"),O=document.getElementById("edit-res-payment-progress-value"),S=Jo(x),I=Yo(O),j=document.getElementById("edit-res-project")?.value||"",X=document.getElementById("edit-res-cancelled")?.checked===!0,C=al();C.map(k=>k?.technicianId).filter(Boolean);const D=document.getElementById("edit-res-company-share"),W=document.getElementById("edit-res-tax");if(!l||!u){w(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const B=typeof e=="function"?e:(k,ee)=>`${k}T${ee||"00:00"}`,F=B(l,d),N=B(u,b);if(F&&N&&new Date(F)>new Date(N)){w(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const Q=Nt()?.[kn];if(!Q){w(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(Et)||Et.length===0&&C.length===0){w(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const z=typeof t=="function"?t:()=>!1,J=Q.id??Q.reservationId;for(const k of Et){if(k?.type==="package"&&Array.isArray(k.packageItems)){for(const A of k.packageItems){const ae=A?.barcode??A?.normalizedBarcode??"";if(!ae)continue;const G=Ft(ae);if(G==="reserved"){const fe=re(ae);if(!z(fe,F,N,J))continue}if(G!=="available"){w(yn(G));return}}continue}const ee=Ft(k.barcode);if(ee==="reserved"){const A=re(k.barcode);if(!z(A,F,N,J))continue}if(ee!=="available"){w(yn(ee));return}}for(const k of Et){if(k?.type==="package"&&Array.isArray(k.packageItems)){for(const A of k.packageItems){const ae=re(A?.barcode??A?.normalizedBarcode??"");if(ae&&z(ae,F,N,J)){const G=A?.desc||A?.barcode||o("reservations.create.packages.unnamedItem","معدة بدون اسم"),fe=`${o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${h(String(G))})`;w(fe);return}}continue}const ee=re(k.barcode);if(z(ee,F,N,J)){w(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const M=typeof n=="function"?n:()=>!1;for(const k of Et){if(k?.type!=="package")continue;const ee=k.packageId??k.package_id??null;if(ee&&M(ee,F,N,J)){const A=k.desc||k.packageName||o("reservations.create.packages.genericName","الحزمة");w(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${h(String(A))} محجوزة بالفعل في الفترة المختارة`));return}}const K=typeof a=="function"?a:()=>!1;for(const k of C)if(k?.technicianId&&K(k.technicianId,F,N,J)){w(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const V=Array.isArray(tt.projects)&&tt.projects.length?tt.projects:ye().projects||[],te=j&&V.find(k=>String(k.id)===String(j))||null,me={...Q,projectId:j?String(j):null,confirmed:v},{effectiveConfirmed:oe,projectLinked:be,projectStatus:ke}=Wt(me,te);let Y=!!D?.checked,ce=!!W?.checked;if(be&&(Y&&(D.checked=!1,Y=!1),ce=!1),!be&&Y!==ce){w(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}ce&&(gt("edit-res-company-share"),Y=!!D?.checked);let Se=Y?getCompanySharePercent("edit-res-company-share"):null;Y&&(!Number.isFinite(Se)||Se<=0)&&(gt("edit-res-company-share"),Se=getCompanySharePercent("edit-res-company-share"));const Ee=Y&&ce&&Number.isFinite(Se)&&Se>0,He=be?!1:ce;be&&(p=0,g="percent");const Ve=Js(Et,p,g,He,C,{start:F,end:N,companySharePercent:Ee?Se:0});let Ce=rs();if(Number.isFinite(I)&&I>0){const k=Ve;let ee=null,A=null;S==="amount"?(ee=I,k>0&&(A=I/k*100)):(A=I,k>0&&(ee=I/100*k));const ae=Zo({type:S,value:I,amount:ee,percentage:A,recordedAt:new Date().toISOString()});ae&&(Ce=[...Ce,ae],_i(Ce)),O&&(O.value="")}const xe=Ys({totalAmount:Ve,history:Ce}),Ie=Zs({manualStatus:P,paidAmount:xe.paidAmount,paidPercent:xe.paidPercent,totalAmount:Ve});_&&!q&&(_.value=Ie,_.dataset&&delete _.dataset.userSelected);let R=Q.status??"pending";be?R=te?.status??ke??R:X?R="cancelled":["completed","cancelled"].includes(String(R).toLowerCase())||(R=v?"confirmed":"pending");const ne=qr({reservationCode:Q.reservationCode??Q.reservationId??null,customerId:Q.customerId,start:F,end:N,status:R,title:Q.title??null,location:Q.location??null,notes:f,projectId:j?String(j):null,totalAmount:Ve,discount:p,discountType:g,applyTax:He,paidStatus:Ie,confirmed:oe,items:Et.map(k=>({...k,equipmentId:k.equipmentId??k.id})),crewAssignments:C,companySharePercent:Ee?Se:null,companyShareEnabled:Ee,paidAmount:xe.paidAmount,paidPercentage:xe.paidPercent,paymentProgressType:xe.paymentProgressType,paymentProgressValue:xe.paymentProgressValue,paymentHistory:Ce});try{dr("about to submit",{editingIndex:kn,crewAssignments:C,techniciansPayload:ne?.technicians,payload:ne});const k=await sl(Q.id||Q.reservationId,ne);dr("server response",{reservation:k?.id??k?.reservationId??k?.reservation_code,technicians:k?.technicians,crewAssignments:k?.crewAssignments,techniciansDetails:k?.techniciansDetails}),await ni(),Bn(),un(),Ye(),w(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),Xo(),c?.({type:"updated",reservation:k}),i?.(),r?.(),Hs?.hide?.()}catch(k){console.error("❌ [reservationsEdit] Failed to update reservation",k);const ee=Ka(k)?k.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");w(ee,"error")}}function Gp(e={}){tt={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=tt,i=document.getElementById("edit-res-discount");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",()=>{i.value=h(i.value),t?.()}),i.dataset.listenerAttached="true");const r=document.getElementById("edit-res-discount-type");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>t?.()),r.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{Ks("tax")}),c.dataset.listenerAttached="true");const l=document.getElementById("edit-res-company-share");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{Ks("share")}),l.dataset.listenerAttached="true");const d=document.getElementById("edit-res-payment-progress-type");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{d.dataset.userSelected="true",t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const b=document.getElementById("edit-res-project");b&&!b.dataset.listenerAttached&&(b.addEventListener("change",()=>{ec();const _=Array.isArray(tt.projects)&&tt.projects.length?tt.projects:ye().projects||[],q=b.value&&_.find(I=>String(I.id)===String(b.value))||null,x={...tt?.reservation??{},projectId:b.value||null,confirmed:va()},{effectiveConfirmed:O,projectLinked:S}=Wt(x,q);Qn(O,{disable:S}),t?.()}),b.dataset.listenerAttached="true");const f=document.getElementById("edit-res-confirmed-btn");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{if(f.disabled)return;const _=!va();Qn(_),t?.()}),f.dataset.listenerAttached="true");const m=document.getElementById("edit-res-cancelled");m&&!m.dataset.listenerAttached&&(m.addEventListener("change",()=>{document.getElementById("edit-res-confirmed-btn")&&Qn(va(),{disable:m.checked}),t?.()}),m.dataset.listenerAttached="true");const p=document.getElementById("save-reservation-changes");p&&!p.dataset.listenerAttached&&(p.addEventListener("click",()=>{gp(tt).catch(_=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",_)})}),p.dataset.listenerAttached="true");const g=document.getElementById("edit-res-equipment-barcode");if(g&&!g.dataset.listenerAttached){let _=null;const q=()=>{g.value?.trim()&&(clearTimeout(_),_=null,n?.(g))};g.addEventListener("keydown",x=>{x.key==="Enter"&&(x.preventDefault(),q())});const P=()=>{if(clearTimeout(_),!g.value?.trim())return;const{start:x,end:O}=getEditReservationDateRange();!x||!O||(_=setTimeout(()=>{q()},150))};g.addEventListener("input",P),g.addEventListener("change",q),g.dataset.listenerAttached="true"}Wo?.();const v=document.getElementById("editReservationModal");v&&!v.dataset.cleanupAttached&&(v.addEventListener("hidden.bs.modal",()=>{Xo(),t?.(),s?.([])}),v.dataset.cleanupAttached="true")}const hp=ye()||{};let bt=(hp.projects||[]).map(ac),aa=!1;function vp(){return bt}function sa(e){bt=Array.isArray(e)?e.map(ki):[],Oa({projects:bt});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return bt}async function tc(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,l])=>{l==null||l===""||t.set(c,String(l))});const n=t.toString(),s=(await ht(`/projects/${n?`?${n}`:""}`))?.data;let i=[];Array.isArray(s)?i=s:s&&typeof s=="object"&&(Array.isArray(s.items)?i=s.items:Array.isArray(s.results)?i=s.results:Array.isArray(s.data)?i=s.data:Array.isArray(s.records)&&(i=s.records));const r=i.map(os);return sa(r),aa=!0,bt}async function nc({force:e=!1,params:t=null}={}){if(!e&&aa&&bt.length>0)return bt;try{return await tc(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),bt}}async function qp(e){const t=await ht("/projects/",{method:"POST",body:e}),n=os(t?.data??{}),a=[...bt,n];return sa(a),aa=!0,n}async function Sp(e,t){const n=await ht(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=os(n?.data??{}),s=bt.map(i=>String(i.id)===String(e)?a:i);return sa(s),aa=!0,a}async function Ep(e){await ht(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=bt.filter(n=>String(n.id)!==String(e));sa(t),aa=!0}function wp({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:i,start:r,end:c,applyTax:l,paymentStatus:d,equipmentEstimate:u=0,expenses:b=[],servicesClientPrice:f=0,taxAmount:m=0,totalWithTax:p=0,discount:g=0,discountType:v="percent",companyShareEnabled:_=!1,companySharePercent:q=null,companyShareAmount:P=0,paidAmount:x=null,paidPercentage:O=null,paymentProgressType:S=null,paymentProgressValue:I=null,confirmed:j=!1,technicians:T=[],equipment:X=[],payments:C,paymentHistory:D}={}){const W=Array.isArray(T)?T.map(K=>Number.parseInt(String(K),10)).filter(K=>Number.isInteger(K)&&K>0):[],B=Array.isArray(X)?X.map(K=>{const V=Number.parseInt(String(K.equipmentId??K.equipment_id??K.id??0),10),te=Number.parseInt(String(K.qty??K.quantity??0),10);return!Number.isInteger(V)||V<=0?null:{equipment_id:V,quantity:Number.isInteger(te)&&te>0?te:1}}).filter(Boolean):[],F=Array.isArray(b)?b.map(K=>{const V=Number.parseFloat(K?.amount??K?.value??0)||0,te=(K?.label??K?.name??"").trim();if(!te)return null;const me=Number.parseFloat(K?.salePrice??K?.sale_price??0)||0,oe=(K?.note??K?.notes??"").toString().trim();return{label:te,amount:Math.round(V*100)/100,sale_price:Math.max(0,Math.round(me*100)/100),note:oe||void 0,...oe?{notes:oe}:{}}}).filter(Boolean):[],N=F.reduce((K,V)=>K+(V?.amount??0),0),H={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:i??null,start_datetime:r??null,end_datetime:c||null,apply_tax:!!l,payment_status:d??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(N*100)/100,services_client_price:Number.isFinite(Number(f))?Math.round(Number(f)*100)/100:0,tax_amount:Math.round((Number.parseFloat(m)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(p)||0)*100)/100,confirmed:!!j,technicians:W,equipment:B,expenses:F},Q=Math.max(0,Number.parseFloat(g)||0);H.discount=Q,H.discount_type=v==="amount"?"amount":"percent";const z=Number.parseFloat(q),J=!!_&&Number.isFinite(z)&&z>0;H.company_share_enabled=J,H.company_share_percent=J?z:0,H.company_share_amount=J?Math.max(0,Number.parseFloat(P)||0):0,Number.isFinite(Number(x))&&(H.paid_amount=Math.max(0,Number.parseFloat(x)||0)),Number.isFinite(Number(O))&&(H.paid_percentage=Math.max(0,Number.parseFloat(O)||0)),(S==="amount"||S==="percent")&&(H.payment_progress_type=S),I!=null&&I!==""&&(H.payment_progress_value=Number.parseFloat(I)||0),e&&(H.project_code=String(e).trim());const M=C!==void 0?C:D;if(M!==void 0){const K=sc(M)||[];H.payments=K.map(V=>({type:V.type,amount:V.amount!=null?V.amount:null,percentage:V.percentage!=null?V.percentage:null,value:V.value!=null?V.value:null,note:V.note??null,recorded_at:V.recordedAt??null}))}return H.end_datetime||delete H.end_datetime,H.client_company||(H.client_company=null),H}function os(e={}){return ki(e)}function ac(e={}){return ki(e)}function ki(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(p=>{if(p==null)return null;if(typeof p=="object"){const g=p.id??p.technician_id??p.technicianId;return g!=null?String(g):null}return String(p)}).filter(Boolean),i=(Array.isArray(e.equipment)?e.equipment:[]).map(p=>{const g=p?.equipment_id??p?.equipmentId??p?.id??null,v=p?.quantity??p?.qty??0,_=p?.barcode??p?.code??"",q=p?.description??p?.name??"";return{equipmentId:g!=null?String(g):null,qty:Number.parseInt(String(v),10)||0,barcode:_,description:q}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((p,g)=>({id:p?.id??`expense-${t??"x"}-${g}`,label:p?.label??"",amount:Number.parseFloat(p?.amount??0)||0,salePrice:Number.parseFloat(p?.sale_price??p?.salePrice??0)||0,note:p?.note??p?.notes??""})),l=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,d=e.company_share_enabled??e.companyShareEnabled,u=d!=null?d===!0||d===1||String(d).toLowerCase()==="true":l>0,b=e.payment_history??e.paymentHistory??e.payments??null,f=sc(b),m=(()=>{const p=e.cancelled??e.canceled??e.is_cancelled??e.isCanceled;if(p===!0||p==="true"||p===1||p==="1")return!0;if(typeof p=="string"){const g=p.toLowerCase();return g==="yes"||g==="cancelled"||g==="canceled"}return!1})();return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,status:(()=>{const p=String(e.status??e.project_status??"").toLowerCase();if(m||p==="cancelled"||p==="canceled"||p==="ملغي"||p==="ملغى")return"cancelled";if(p==="completed"||p==="مكتمل")return"completed";if(p==="ongoing"||p==="in_progress"||p==="قيد التنفيذ")return"ongoing";if(p==="upcoming"||p==="قادم")return"upcoming"})(),cancelled:m,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,servicesClientPrice:Number.parseFloat(e.services_client_price??e.servicesClientPrice??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?l:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(p=>typeof p=="object"?p:{id:p}),equipment:i,expenses:c,paymentHistory:f}}function Ap(e){return e instanceof pr}function Ss(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const i=Number.parseFloat(n);return Number.isFinite(i)?i:null}function xp(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=Ss(e.value);let s=Ss(e.amount),i=Ss(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&i==null&&a!=null&&(i=a),!n)if(s!=null&&s>=0)n="amount";else if(i!=null&&i>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(i==null||!Number.isFinite(i)||i<0)return null;i=Math.min(100,Math.round(i*100)/100)}const r=e.note??e.memo??e.description??null,c=r!=null?String(r).trim():null,l=e.recordedAt??e.recorded_at??e.date??null;let d=null;if(l){const b=new Date(l);Number.isNaN(b.getTime())||(d=b.toISOString())}d||(d=new Date().toISOString());const u=n==="amount"?s:n==="percent"?i:a;return{type:n,amount:s??null,percentage:i??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:d}}function sc(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>xp(t)).filter(Boolean):[]}const Wp=Object.freeze(Object.defineProperty({__proto__:null,buildProjectPayload:wp,createProjectApi:qp,deleteProjectApi:Ep,ensureProjectsLoaded:nc,getProjectsState:vp,isApiError:Ap,mapLegacyProject:ac,mapProjectFromApi:os,refreshProjectsFromApi:tc,setProjectsState:sa,updateProjectApi:Sp},Symbol.toStringTag,{value:"Module"})),za="reservations-ui:ready",on=typeof EventTarget<"u"?new EventTarget:null;let cn={};function Ip(e){return Object.freeze({...e})}function _p(){if(!on)return;const e=cn,t=typeof CustomEvent=="function"?new CustomEvent(za,{detail:e}):{type:za,detail:e};typeof on.dispatchEvent=="function"&&on.dispatchEvent(t)}function kp(e={}){if(!e||typeof e!="object")return cn;const t={...cn};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),cn=Ip(t),_p(),cn}function Cp(e){if(e)return cn?.[e]}function Xp(e){const t=Cp(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const r=(s?.detail||cn)?.[e];typeof r=="function"&&(on&&on.removeEventListener(za,a),n(r))};on&&on.addEventListener(za,a)})}function Jp(){return nc().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=ye()||{};cl(e||[]),ao()})}function Ci(e=null){ao(),ic(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function $p(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Us(){return{populateEquipmentDescriptionLists:Gt,setFlatpickrValue:ip,splitDateTime:br,renderEditItems:Jt,updateEditReservationSummary:pt,addEquipmentByDescription:sp,addEquipmentToEditingReservation:ap,addEquipmentToEditingByDescription:Ma,combineDateTime:Wn,hasEquipmentConflict:xt,hasTechnicianConflict:vr,renderReservations:ic,handleReservationsMutation:Ci,ensureModal:$p}}function ic(e="reservations-list",t=null){Ou({containerId:e,filters:t,onShowDetails:rc,onConfirmReservation:cc})}function rc(e){return Hu(e,{getEditContext:Us,onEdit:(t,{reservation:n})=>{lc(t,n)},onDelete:oc})}function oc(e){return bn()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?Ku(e,{onAfterChange:Ci}):!1:(Zn(),!1)}function cc(e){return Uu(e,{onAfterChange:Ci})}function lc(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",i)}ur(e,Us());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",i)}ur(e,Us());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const i=t.id??t.reservationId;n.set("reservationEditId",String(i));try{localStorage.setItem("pendingReservationEditId",String(i)),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",r)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",i)}}Kc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(i=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",i)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Yp(){kp({showReservationDetails:rc,deleteReservation:oc,confirmReservation:cc,openReservationEditor:lc})}export{jp as $,tc as A,Yp as B,nc as C,Ep as D,qp as E,Bp as F,Gp as G,Jp as H,Qp as I,Tp as J,Ci as K,ao as L,Mp as M,pt as N,Rp as O,zp as P,Us as Q,ve as R,oc as S,cc as T,lc as U,ip as V,Tn as W,bl as X,wa as Y,Np as Z,jl as _,Ye as a,Wp as a0,Xi as b,oo as c,co as d,Up as e,ic as f,so as g,Cp as h,wp as i,kp as j,rc as k,Op as l,os as m,Hp as n,vp as o,Ap as p,Ad as q,ta as r,lo as s,io as t,Sp as u,Vp as v,Xp as w,Kp as x,Fp as y,Dp as z};
