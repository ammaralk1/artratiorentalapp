import{n as b,d as ue,f as uc,t as o,b as rt,h as E,j as zt,o as $n,s as hs,A as Nr,z as mc,k as Ue,B as jr,u as pc}from"./auth.js";import{n as te,A as it,B as Lr,C as fc,D as gt,E as vs,z as Re,F as cr,G as xn,H as wn,I as da,J as yc,h as qs,K as ot,L as Ss,M as an,N as Br,O as gc,P as bc,Q as hc,R as vc,S as Ht,T as Qn,U as qc,V as ua,W as Fr,X as Sc,Y as Dr,w as Es,j as xs,k as ws,Z as Rr,_ as Ec,s as Pn,c as ma,$ as Mr,a0 as xc,a1 as zr,a2 as wc,x as Is,e as It,a3 as As,q as pa,a4 as ut,a5 as Ae,a6 as Ic,a7 as Va,a as Hr,g as Lt,a8 as Ac,a9 as kc,aa as Ua,ab as _c,y as $c,ac as Pc,ad as Cc,b as Tc}from"./reservationsService.js";const Ba="select.form-select:not([data-no-enhance]):not([multiple])",ct=new WeakMap;let Fa=null,lr=!1,mt=null;function Yu(e=document){e&&(e.querySelectorAll(Ba).forEach(t=>Hn(t)),!Fa&&e===document&&(Fa=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(Ba)&&Hn(a),a.querySelectorAll?.(Ba).forEach(s=>Hn(s)))})}),Fa.observe(document.body,{childList:!0,subtree:!0})),lr||(lr=!0,document.addEventListener("pointerdown",Lc,{capture:!0})))}function zn(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){Hn(e);return}const t=e.closest(".enhanced-select");t&&(ks(t),Gn(t),Ka(t))}function Hn(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){zn(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};ct.set(t,r),a.addEventListener("click",()=>jc(t)),a.addEventListener("keydown",i=>Bc(i,t)),s.addEventListener("click",i=>Dc(i,t)),s.addEventListener("keydown",i=>Fc(i,t)),e.addEventListener("change",()=>{Gn(t),Or(t)}),r.observer=new MutationObserver(i=>{let c=!1,d=!1;for(const l of i)l.type==="attributes"&&l.attributeName==="disabled"&&(d=!0),l.type==="childList"&&(c=!0);d&&Ka(t),c&&Nc(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),ks(t),Gn(t),Ka(t)}function Nc(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,ks(t),Gn(t)})))}function ks(e){const t=ct.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),Or(e)}function Gn(e){const t=ct.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function Or(e){const t=ct.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function Ka(e){const t=ct.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function jc(e){ct.get(e)&&(e.getAttribute("data-open")==="true"?sn(e):Vr(e))}function Vr(e){const t=ct.get(e);if(!t)return;mt&&mt!==e&&sn(mt,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),mt=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function sn(e,{focusTrigger:t=!0}={}){const n=ct.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),mt===e&&(mt=null))}function Lc(e){if(!mt)return;const t=e.target;t instanceof Node&&(mt.contains(t)||sn(mt,{focusTrigger:!1}))}function Bc(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),Vr(t)):n==="Escape"&&sn(t)}function Fc(e,t){const n=e.key,a=ct.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&Ur(i,t)}else n==="Escape"&&(e.preventDefault(),sn(t))}function Dc(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&Ur(n,t)}function Ur(e,t){const n=ct.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),sn(t)}const rn=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let pt=null;function _s(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function Kr(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function Rc(e={}){const t={...e};return t.barcode&&(t.barcode=b(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function Mc(e={}){const t=Rc({...e,activatedAt:Date.now()});return pt=t,Kr(!0,t.mode||"create"),_s(rn.change,{active:!0,selection:{...t}}),t}function Wn(e="manual"){if(!pt)return;const t=pt;pt=null,Kr(!1),_s(rn.change,{active:!1,previous:t,reason:e})}function Qr(){return!!pt}function zc(){return pt?{...pt}:null}function Hc(e){if(!pt)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=b(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:r,description:i}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const d=c.map(u=>b(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!d.length)return!1;const l=Number.isInteger(s)&&s>0?s:d.length;t={barcodes:d,quantity:Math.min(l,d.length)},r&&(t.groupKey=r),i&&(t.description=i)}else return!1;return _s(rn.requestAdd,{...t,selection:{...pt}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||Wn("tab-changed")});const Oc=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Vc=new Set(["maintenance","reserved","retired"]);function Uc(e){const t=String(e??"").trim().toLowerCase();return t&&Oc.get(t)||"available"}function Kc(e){return e?typeof e=="object"?e:fa(e):null}function bt(e){const t=Kc(e);return t?Uc(t.status||t.state||t.statusLabel||t.status_label):"available"}function $s(e){return!Vc.has(bt(e))}function Ot(e={}){return e.image||e.imageUrl||e.img||""}function Qc(e){if(!e)return null;const t=te(e),{equipment:n=[]}=ue();return(n||[]).find(a=>te(a?.barcode)===t)||null}function fa(e){const t=te(e);if(!t)return null;const{equipment:n=[]}=ue();return(n||[]).find(a=>te(a?.barcode)===t)||null}const Gc=ue()||{};let qt=(Gc.equipment||[]).map(Jc),Qa=!1,hn="",Tt=null,Ft=null,Dt=null,ya=!1,dr=!1;function Wc(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function Xc(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function Jc(e={}){return Ps({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function ga(e={}){return Ps(e)}function Ps(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=Cn(e.quantity??e.qty??0),i=ba(e.unit_price??e.price??0),c=b(String(e.barcode??"").trim()),d=Be(e.status??e.state??e.status_label??e.statusLabel??"available"),l=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:Yc(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:d,image:l,imageUrl:l,created_at:e.created_at??null,updated_at:e.updated_at??null}}function Yc(e){return e!=null&&e!==""}function Cn(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function ba(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function Zc(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=b(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function ur(e){if(!e)return"";const t=b(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=b(String(n?.barcode??"")).trim();if(a)return a}return""}function el(e,t){const n=ur(e),a=ur(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}else{if(r!==i)return r?-1:1;{const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}}const c=Xn(e?.desc||e?.description||e?.name||""),d=Xn(t?.desc||t?.description||t?.name||"");return c.localeCompare(d,"ar",{sensitivity:"base"})}function ke(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Be(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function tl(e){return Be(e)}function Ga(){if(!Qr())return null;const e=zc();return e?{...e}:null}function nl(e){const t=Ga();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:r=null}=t,i=t?.mode||t?.source||"",c=[],d=new Set;if(n.forEach(p=>{const m=te(p?.barcode);!m||d.has(m)||(d.add(m),c.push({variant:p,barcode:m}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(i==="package-manager"||i==="equipment-packages"){const p=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:m})=>m),maxQuantity:p,reason:""}}const l=c.filter(({variant:p})=>$s(p));if(!a||!s)return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=l.filter(({barcode:p})=>!it(p,a,s,r));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:p})=>p),maxQuantity:u.length};let f=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(l.length>0)f=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const p=new Set(c.map(({variant:m})=>Be(m?.status)));p.has("maintenance")?f=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):p.has("reserved")?f=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):p.has("retired")&&(f=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:f,availableBarcodes:[],maxQuantity:0}}function al(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function Gr(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=Ga();e.hidden=!s;const r=s?.mode||s?.source||"";s?r==="package-manager"||r==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=Ga(),d=c?.mode||c?.source||"";d==="package-manager"||d==="equipment-packages"?Wn("package-finish-button"):(Wn("return-button"),al())}),t.dataset.listenerAttached="true")}function Ke(){return qt}function Rt(e){qt=Array.isArray(e)?e.map(Ps):[],hs({equipment:qt}),Xc()}function Xn(e){return String(e??"").trim().toLowerCase()}function Et(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=Xn(t);return n||(n=Xn(e.category||"")),n||(n=b(String(e.barcode||"")).trim().toLowerCase()),n}function ha(e){const t=Et(e);return t?Ke().filter(n=>Et(n)===t):[]}function va(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=qa(e);if(n){const a=ke(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${ke(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function Cs(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function Jn(){const e=Cs();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function Ts(e={}){const t=Cs();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?b(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?b(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function Zt(e){ya=e;const t=Cs(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function Zu(e){if(!zt()){$n();return}if(!e)return;try{await rl()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let d=0;if(i.forEach(l=>{const u=l.القسم??l.category??"",f=l["القسم الثانوي"]??l.subcategory??"",p=l.الوصف??l.description??l.name??"",m=l.الكمية??l.quantity??0,y=l.السعر??l.price??0,g=l.الباركود??l.barcode??"",v=l.الحالة??l.status??"متاح",k=l.الصورة??l.image_url??l.image??"",h=b(String(g||"")).trim();if(!p||!h){d+=1;return}c.push(Ns({category:u,subcategory:f,description:p,quantity:m,unit_price:y,barcode:h,status:v,image_url:k}))}),!c.length){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const l=await rt("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(l?.data)?l.data.map(ga):[];if(u.length){const m=[...Ke(),...u];Rt(m)}await Sa({showToastOnError:!1}),Fe();const f=l?.meta?.count??u.length,p=[];f&&p.push(`${f} ✔️`),d&&p.push(`${d} ⚠️`),E(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(p.length?` (${p.join(" / ")})`:""))}catch(l){const u=on(l,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");E(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const sl="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let pn=null;function rl(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):pn||(pn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=sl,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),pn=null,e}),pn)}function Ns({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const d=b(String(r||"")).trim(),l=tl(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:Cn(a),unit_price:ba(s),barcode:d,status:l,image_url:c?.trim()||null}}async function il(){if(!zt()){$n();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await rt("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await Sa({showToastOnError:!1}),E(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=on(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");E(t,"error")}}function qa(e){return e.image||e.imageUrl||e.img||""}function ol(e){const t=Be(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function Yn(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${ke(a)}</td></tr>`}n&&(n.textContent="0")}function Wr(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=Tt?.groupKey||Et(e);if(!r){Yn();return}const i=Ke().filter(f=>Et(f)===r).sort((f,p)=>{const m=String(f.barcode||"").trim(),y=String(p.barcode||"").trim();return!m&&!y?0:m?y?m.localeCompare(y,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){Yn();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),d=o("equipment.form.labels.quantity","الكمية"),l=Ke(),u=i.map(f=>{const p=f.id&&e.id?String(f.id)===String(e.id):String(f.barcode||"")===String(e.barcode||""),m=p?"equipment-variants-table__row--current":"",y=ke(String(f.barcode||"-")),g=p?`<span class="equipment-variants-current-badge">${ke(c)}</span>`:"",v=b(String(Number.isFinite(Number(f.qty))?Number(f.qty):0)),k=l.indexOf(f),h=ke(o("equipment.item.actions.delete","🗑️ حذف")),q=k>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${k}">${h}</button>
          </div>`:"";return`
        <tr class="${m}">
          <td>
            ${y}
            ${g}
          </td>
          <td>${ol(f.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${ke(d)}">${v}</span>
          </td>
          <td class="table-actions-cell">${q}</td>
        </tr>
      `}).join("");n.innerHTML=u}function cl({item:e,index:t}){const n=qa(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=zt(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},d=Number.isFinite(Number(e.qty))?Number(e.qty):0,l=Number.isFinite(Number(e.price))?Number(e.price):0,u=d.toLocaleString("en-US"),f=l.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),p=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,m=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,y=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(d-p-m,0),g=y.toLocaleString("en-US"),v=o("equipment.card.labels.availableOfTotal","من أصل"),k=Be(e.status);let h=`${ke(c.available)}: ${ke(g)} ${ke(v)} ${ke(u)}`,q="available";if(y===0){const M={reserved:{text:d===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},z=M[k]||M.default;h=ke(z.text),q=z.modifier}const N=`<span class="equipment-card__availability equipment-card__availability--${q}">${h}</span>`,V="",S=e.desc||e.name||"—",w=e.name&&e.name!==e.desc?e.name:"",T=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${f} ${r}`}].map(({label:M,value:z})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${M}</span>
              <span class="equipment-card__detail-value">${z}</span>
            </span>
          `).join("")}
    </div>`,D=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),$=D.length?`<div class="equipment-card__categories">${D.map(({label:M,value:z})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${M}</span>
              <span class="equipment-card__detail-value">${z}</span>
            </div>
          `).join("")}</div>`:"",F=w?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${w}</span>
      </div>`:"",P=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${S}</h3>
    </div>
  `}
      ${T}
    </div>
  `,j=[],I=nl(e),W=I?.availableBarcodes?.length?I.availableBarcodes.join(","):I?.barcode?I.barcode:"";let H="",A="";if(I.active){const M=`equipment-select-qty-${t}`,z=!!I.canSelect,ne=z?Math.max(1,Number(I.maxQuantity||I.availableBarcodes?.length||1)):1,ee=Math.max(1,Math.min(ne,99)),oe=[];for(let se=1;se<=ee;se+=1){const fe=b(String(se));oe.push(`<option value="${se}"${se===1?" selected":""}>${fe}</option>`)}const J=z?"":" disabled",re=o("reservations.create.equipment.selector.quantityLabel","الكمية"),he=z?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${b(String(ne))}`:I.reason?I.reason:"";H=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${M}">${re}</label>
        <select class="equipment-card__quantity-select" id="${M}" data-equipment-select-quantity${J}>
          ${oe.join("")}
        </select>
        ${he?`<span class="equipment-card__selection-hint">${ke(he)}</span>`:""}
      </div>
    `;const ve=o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),$e=z?"":" disabled",U=I.reason?` title="${ke(I.reason)}"`:"",Z=['data-equipment-action="select-reservation"',`data-selection-max="${z?ne:0}"`];W&&Z.push(`data-selection-barcodes="${ke(W)}"`),e.groupKey&&Z.push(`data-selection-group="${ke(String(e.groupKey))}"`),A=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${Z.join(" ")}${$e}${U}>${ve}</button>
    `}i&&j.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const O=j.length?j.join(`
`):"",R=ke(S);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${ke(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${R}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${V}
        ${N}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${P}
        </div>
      </div>
      <div class="equipment-card__body">
        ${$}
        ${F}
      </div>
      ${H||A||O?`<div class="equipment-card__actions equipment-card__actions--center">
            ${H}
            ${A}
            ${O}
          </div>`:""}
    </article>
  `}function ll(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,a.appendChild(d)}),t.includes(i)&&(a.value=i),zn(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,s.appendChild(d)}),n.includes(i)&&(s.value=i),zn(s)}const r=document.getElementById("filter-status");r&&zn(r)}function Tn(){const e=ue();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return qt=t||[],qt;const s=new Date;let r=!1;const i=new Set((a||[]).filter(d=>d?.status==="open").map(d=>b(String(d?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(d=>{if(!d)return d;const l=Be(d.status),u=b(String(d.barcode??"")).trim().toLowerCase(),f=u&&i.has(u);let p=f?"maintenance":"available";if(!f&&u)for(const m of n||[]){if(!dl(m,s))continue;if(m.items?.some(g=>b(String(g?.barcode??"")).trim().toLowerCase()===u)){p="reserved";break}}return p!==l?(r=!0,{...d,status:p}):{...d,status:p}});return r?Rt(c):(qt=c,hs({equipment:qt})),qt}function dl(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function Da(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Fe(){const e=document.getElementById("equipment-list");if(!e)return;Gr();const t=Tn(),n=Array.isArray(t)?t:Ke(),a=new Map;n.forEach(g=>{if(!g)return;const v=Et(g);v&&(a.has(v)||a.set(v,[]),a.get(v).push(g))});const s=Array.from(a.values()).map(g=>{const v=g[0],k=g.reduce((w,_)=>w+(Number.isFinite(Number(_.qty))?Number(_.qty):0),0),h=["maintenance","reserved","available","retired"],q=g.map(w=>Be(w.status)).sort((w,_)=>h.indexOf(w)-h.indexOf(_))[0]||"available",N=g.reduce((w,_)=>{const T=Cn(_?.qty??0)||0,D=Be(_?.status);return D==="reserved"?w.reserved+=T:D==="maintenance"&&(w.maintenance+=T),w},{reserved:0,maintenance:0}),V=Math.max(k-N.reserved-N.maintenance,0);return{item:{...v,qty:k,status:q,variants:g,groupKey:Et(v),reservedQty:N.reserved,maintenanceQty:N.maintenance,availableQty:V},index:n.indexOf(v)}});s.sort((g,v)=>el(g.item,v.item));const r=document.getElementById("search-equipment")?.value||"",i=b(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",d=document.getElementById("filter-sub")?.value||"",l=document.getElementById("filter-status")?.value||"",u=l?Be(l):"";if(Qa&&!n.length){e.innerHTML=Da(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(hn&&!n.length){e.innerHTML=Da(hn,{tone:"error",icon:"⚠️"});return}const f=s.filter(({item:g})=>{const v=b(String(g.barcode??"")).toLowerCase().trim(),k=Array.isArray(g.variants)?g.variants.map(S=>b(String(S.barcode??"")).toLowerCase().trim()).filter(Boolean):[],h=!i||g.name&&g.name.toLowerCase().includes(i)||g.desc&&g.desc.toLowerCase().includes(i)||v&&v.includes(i)||k.some(S=>S.includes(i))||g.category&&g.category.toLowerCase().includes(i)||g.sub&&g.sub.toLowerCase().includes(i),q=!c||g.category===c,N=!d||g.sub===d,V=!u||Be(g.status)===u;return h&&q&&N&&V}),p=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),m=f;e.innerHTML=m.length?m.map(cl).join(""):Da(p);const y=document.getElementById("equipment-list-count");if(y){const g=o("equipment.list.countSuffix","عنصر"),v=b(String(m.length)),k=m.length?`${v} ${g}`:`0 ${g}`;y.textContent=k}ll(n)}async function Sa({showToastOnError:e=!0}={}){Qa=!0,hn="",Fe();try{const t=await rt("/equipment/?all=1"),n=Array.isArray(t?.data)?t.data.map(ga):[];Rt(n)}catch(t){hn=on(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&E(hn,"error")}finally{Qa=!1,Fe()}}function on(e,t,n){if(e instanceof Nr){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function ul(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=b(a).trim(),r=ba(t.querySelector("#new-equipment-price")?.value||"0"),i=Cn(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",d=t.querySelector("#new-equipment-category")?.value?.trim()||"",l=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){E(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const f=Ns({category:d,subcategory:l,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const p=await rt("/equipment/",{method:"POST",body:f}),m=ga(p?.data),y=[...Ke(),m];Rt(y),Fe(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),E(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(p){const m=on(p,"equipment.toast.addFailed","تعذر إضافة المعدة");E(m,"error")}}async function Xr(e){if(!zt()){$n();return}const t=Ke(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await rt(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),Rt(a),Fe(),E(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=on(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");E(s,"error")}}async function ml(e,t){const n=Ke(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},Rt(r),Fe();return}const s=Ns({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await rt(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=ga(r?.data),c=[...n];c[e]=i,Rt(c),Fe(),E(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=on(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw E(i,"error"),r}}function Dn(){Fe()}function Jr(e){const n=Ke()[e];if(!n)return;Ft=e;const a=ha(n),s=a[0]||n,r=a.reduce((d,l)=>d+(Number.isFinite(Number(l.qty))?Number(l.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(d=>Be(d.status)).sort((d,l)=>i.indexOf(d)-i.indexOf(l))[0]||Be(s.status);document.getElementById("edit-equipment-index").value=e,Ts({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:qa(s)||"",barcode:s.barcode||"",status:s.status||c}),Zt(!1),Dt=Jn(),va(s),Wr(s),Tt={groupKey:Et(s),barcode:String(s.barcode||""),id:s.id||null},Wc(document.getElementById("editEquipmentModal"))?.show()}function pl(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),r=s?.querySelector("[data-equipment-select-quantity]");let i=Number.parseInt(r?.value||"1",10);(!Number.isFinite(i)||i<=0)&&(i=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&i>c&&(i=c);const l=(t.dataset.selectionBarcodes||"").split(",").map(m=>m.trim()).filter(m=>m.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",f=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";Hc({barcodes:l,quantity:i,groupKey:f,description:u})||E(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||Xr(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||Jr(s)}}function fl(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||Jr(n)}}function yl(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||Xr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function Yr(){if(!Tt||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=Ke(),a=Tt.id?n.find(d=>String(d.id)===String(Tt.id)):null,s=Tt.groupKey,r=s?n.find(d=>Et(d)===s):null,i=a||r;if(!i){Yn();return}const c=n.findIndex(d=>d===i);if(c>=0){const d=document.getElementById("edit-equipment-index");d&&(d.value=String(c)),Ft=c}if(Wr(i),!ya){const d=ha(i),l=d[0]||i,u=d.reduce((m,y)=>m+(Number.isFinite(Number(y.qty))?Number(y.qty):0),0),f=["maintenance","reserved","available","retired"],p=d.map(m=>Be(m.status)).sort((m,y)=>f.indexOf(m)-f.indexOf(y))[0]||Be(l.status);Ts({category:l.category||"",subcategory:l.sub||"",description:l.desc||l.description||"",quantity:String(u||l.qty||0),price:l.price!=null?String(l.price):"0",image:qa(l)||"",barcode:l.barcode||"",status:l.status||p}),Dt=Jn()}va(primary)}function gl(){document.getElementById("search-equipment")?.addEventListener("input",Dn),document.getElementById("filter-category")?.addEventListener("change",Dn),document.getElementById("filter-sub")?.addEventListener("change",Dn),document.getElementById("filter-status")?.addEventListener("change",Dn),document.getElementById("add-equipment-form")?.addEventListener("submit",ul);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),il().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",pl),t.addEventListener("keydown",fl),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",yl),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);Zc(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!ya){Dt=Jn(),Zt(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){E(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:Cn(document.getElementById("edit-equipment-quantity").value)||1,price:ba(document.getElementById("edit-equipment-price").value)||0,barcode:b(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await ml(t,n),Dt=Jn(),Zt(!1),Yr()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{gl(),Fe(),Sa();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(Dt&&Ts(Dt),Ft!=null){const a=Ke()[Ft];if(a){const r=ha(a)[0]||a;va(r)}}Zt(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Fe(),Zt(ya),Ft!=null){const t=Ke()[Ft];if(t){const a=ha(t)[0]||t;va(a)}}});document.addEventListener("equipment:refreshRequested",()=>{Sa({showToastOnError:!1})});document.addEventListener(uc.USER_UPDATED,()=>{Fe()});document.addEventListener("equipment:changed",()=>{Yr()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{Tt=null,Yn(),Ft=null,Dt=null,Zt(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!dr&&(document.addEventListener(rn.change,()=>{Gr(),Fe()}),dr=!0);const Zr="projects:create:draft",ei="projects.html#projects-section";let Wa=null,ti=[],Xa=new Map,Ja=new Map,Zn=new Map,Ra=!1,On=null,mr=!1,ni=[];function bl(e){if(!e)return null;let t=ni.find(a=>a.id===e)||null;if(t)return t;const n=gc(e);return n?(t={id:e,name:hc(n)||e,price:bc(n),items:qs(n),raw:n},t):null}function ea(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ta(e){return b(String(e||"")).trim().toLowerCase()}function hl(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=b(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function ai(e){const t=b(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function si(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function ri(e){if(!e)return null;const t=b(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function ii(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=b(String(t))}}function Mt(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function js(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function Vt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Oe(){const{input:e,hidden:t}=Vt();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function Pt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function oi(e,t,{allowPartial:n=!1}={}){const a=Re(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function Ya(e,t={}){return oi(Xa,e,t)}function Za(e,t={}){return oi(Ja,e,t)}function Ve(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function ci(e){ti=Array.isArray(e)?[...e]:[]}function Ls(){return ti}function Bs(e){return e&&Ls().find(t=>String(t.id)===String(e))||null}function pr(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function en(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??gt,a=b(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:gt}function Je(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??gt,a=b(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=gt),t.dataset.companyShare=String(s),t.checked=!0}function es(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(Ra){le();return}Ra=!0;const a=()=>{Ra=!1,le()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(gt)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),Je()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Je():n.checked&&(n.checked=!1));a()}function vl(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function fr(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function yr(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function ft({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=js();if(!n||!a||!s)return;const r=vs()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const d=new Set;Xa=new Map;const l=r.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:yr(m)||c})).filter(m=>{if(!m.label)return!1;const y=Re(m.label);return!y||d.has(y)?!1:(d.add(y),Xa.set(y,m),!0)}).sort((m,y)=>m.label.localeCompare(y.label,void 0,{sensitivity:"base"}));s.innerHTML=l.map(m=>`<option value="${ea(m.label)}"></option>`).join("");const u=t?"":n.value,f=e?String(e):a.value?String(a.value):"",p=f?r.find(m=>String(m.id)===f):null;if(p){const m=yr(p)||c;a.value=String(p.id),n.value=m,n.dataset.selectedId=String(p.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function tn({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=Vt();if(!a||!s||!r)return;const i=Array.isArray(t)?t:Ls()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const d=[...i].filter(g=>g&&g.id!=null).sort((g,v)=>String(v.createdAt||v.start||"").localeCompare(String(g.createdAt||g.start||""))),l=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),f=new Set;Ja=new Map;const p=d.map(g=>{const v=pr(g)||u;return{id:String(g.id),label:v}}).filter(g=>{if(!g.label)return!1;const v=Re(g.label);return!v||f.has(v)?!1:(f.add(v),Ja.set(v,g),!0)});r.innerHTML=p.map(g=>`<option value="${ea(g.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",y=m?d.find(g=>String(g.id)===m):null;if(y){const g=pr(y)||u;s.value=String(y.id),a.value=g,a.dataset.selectedId=String(y.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":l}function na(e,t,n){const{date:a,time:s}=Br(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function li(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||tn({selectedValue:a});const r=(vs()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";ft(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=fr(e,"start"),d=fr(e,"end");c&&na("res-start","res-start-time",c),d&&na("res-end","res-end-time",d);const l=document.getElementById("res-notes");l&&e.description&&(t||!l.value)&&(l.value=e.description),le(),xt()}function di({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:ue(),s=Array.isArray(a)?a:[];ci(s);const r=t!=null?String(t):n.value?String(n.value):"";tn({selectedValue:r,projectsList:s}),xt(),le()}function xt(){const{input:e,hidden:t}=Vt(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),d=document.getElementById("res-discount-type"),l=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),f=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(Pt(n,Oe),a&&Pt(a,Oe)),s&&Pt(s,Oe),r&&Pt(r,Oe),i&&Pt(i,Oe),c&&Pt(c,Oe),d&&Pt(d,Oe),f)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=l),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=l),s&&(s.value="unpaid",Ve(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=l),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=l),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=l),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=l),d&&(d.value="percent",d.disabled=!0,d.classList.add("reservation-input-disabled"),d.title=l);else{if(n){const p=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",p&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.disabled=!1,d.classList.remove("reservation-input-disabled"),d.title="")}es("tax"),le()}function Fs(){const{input:e,hidden:t}=Vt();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Za(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=Bs(r.id);i?li(i,{skipProjectSelectUpdate:!0}):(xt(),le())}else t.value="",e.dataset.selectedId="",xt(),le()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Za(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Ds(){const{input:e,hidden:t}=js();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Ya(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),le()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Ya(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function ql(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){vn({clearValue:!0});return}let n=null;try{const l=decodeURIComponent(t);n=JSON.parse(l)}catch(l){console.warn("⚠️ [reservations/createForm] Failed to decode project context",l)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),vn({clearValue:!1}),!n)return;n.fromProjectForm&&(On={draftStorageKey:n.draftStorageKey||Zr,returnUrl:n.returnUrl||ei});const r=document.getElementById("res-project");if(n.projectId){r&&(tn({selectedValue:String(n.projectId)}),xt());const l=Bs(n.projectId);l?li(l,{forceNotes:!!n.forceNotes}):le(),vn()}else{r&&tn({selectedValue:""});const l=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");Ll(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),l)}n.start&&na("res-start","res-start-time",n.start),n.end&&na("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(vs()||[]).find(f=>String(f.id)===String(n.customerId));u?.id!=null&&(ft({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(ft({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):ft({selectedValue:""});const d=document.getElementById("res-notes");d&&n.description&&!d.value&&(d.value=n.description),le()}function Ut(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:xn(e,n),end:xn(t,a)}}function ui(e){const t=ta(e);if(t){const c=Zn.get(t);if(c)return c}const{description:n,barcode:a}=ai(e);if(a){const c=fa(a);if(c)return c}const s=Re(n||e);if(!s)return null;let r=Mr();if(!r?.length){const c=ue();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&zr(r)}const i=r.find(c=>Re(c?.desc||c?.description||"")===s);return i||r.find(c=>Re(c?.desc||c?.description||"").includes(s))||null}function mi(e,t="equipment-description-options"){const n=ta(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(d=>ta(d.value)===n)||Zn.has(n))return!0;const{description:s}=ai(e);if(!s)return!1;const r=Re(s);return r?(Mr()||[]).some(c=>Re(c?.desc||c?.description||"")===r):!1}const Sl={available:0,reserved:1,maintenance:2,retired:3};function El(e){return Sl[e]??5}function gr(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function xl(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${gr(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${gr(n)})`}function wt(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=Tn(),a=ue(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];zr(r);const i=new Map;r.forEach(l=>{const u=hl(l),f=ta(u);if(!f||!u)return;const p=bt(l),m=El(p),y=i.get(f);if(!y){i.set(f,{normalized:f,value:u,bestItem:l,bestStatus:p,bestPriority:m,statuses:new Set([p])});return}y.statuses.add(p),m<y.bestPriority&&(y.bestItem=l,y.bestStatus=p,y.bestPriority=m,y.value=u)}),Zn=new Map;const d=Array.from(i.values()).sort((l,u)=>l.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(l=>{Zn.set(l.normalized,l.bestItem);const u=xl(l),f=ea(l.value);if(u===l.value)return`<option value="${f}"></option>`;const p=ea(u);return`<option value="${f}" label="${p}"></option>`}).join("");e&&(e.innerHTML=d),t&&(t.innerHTML=d)}function pi(e,t,n={}){const{silent:a=!1}=n,s=te(e);if(!s)return{success:!1,message:null};const{start:r,end:i}=Ut();if(!r||!i){const y=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||E(y),{success:!1,message:y}}const c=ot();if(Rs(c).has(s)){const y=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||E(y),{success:!1,message:y}}const l=Ss(s,r,i);if(l.length){const y=l.map(v=>v.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${y}`);return a||E(g),{success:!1,message:g}}if(it(s,r,i)){const y=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||E(y),{success:!1,message:y}}const u=fa(s);if(!u){const y=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||E(y),{success:!1,message:y}}const f=bt(u);if(f==="maintenance"||f==="retired"){const y=Mt(f);return a||E(y),{success:!1,message:y}}const p=Ht(u);if(!p){const y=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||E(y),{success:!1,message:y}}da({id:p,equipmentId:p,barcode:s,desc:u.desc,qty:1,price:u.price,image:Ot(u)}),t&&(t.value=""),ht(),le();const m=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||E(m),{success:!0,message:m,barcode:s}}function ts(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=ui(t);if(!n){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=Qc(n.barcode),s=bt(a||n);if(s==="maintenance"||s==="retired"){E(Mt(s));return}const r=te(n.barcode);if(!r){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=Ht(n);if(!i){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Ot(n)},{start:d,end:l}=Ut();if(!d||!l){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=ot();if(Rs(u).has(r)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const p=Ss(r,d,l);if(p.length){const m=p.map(y=>y.name).join(", ");E(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`));return}if(it(r,d,l)){E(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}da(c),ht(),le(),E(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function wl(){wt();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),ts(e))});const t=()=>{mi(e.value,"equipment-description-options")&&ts(e)};e.addEventListener("focus",()=>{if(wt(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function br(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function Rs(e=ot()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=te(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const r=te(s?.normalizedBarcode??s?.barcode);r&&t.add(r)})}),t}function Il(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=Ut();if(!t||!n){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}Mc({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):E(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(rn.change,t=>{br(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),br(e,Qr()))}function Al(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,r=a.length?a:t.barcode?[t.barcode]:[];if(!r.length)return;let i=0,c=null;const d=[],l=new Set;r.forEach(f=>{const p=te(f);p&&!l.has(p)&&(l.add(p),d.push(p))});const u=Math.min(s,d.length);for(let f=0;f<u;f+=1){const p=d[f],m=pi(p,null,{silent:!0});m.success&&(i+=1),m.message&&(c=m.message)}if(i>0){const p=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",b(String(i)));E(p)}else c&&E(c)}function fi(){Il(),!(mr||typeof document>"u")&&(document.addEventListener(rn.requestAdd,Al),mr=!0)}function Nn(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),r=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:r}}function ns(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=Nn();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const r=document.getElementById("equipment-barcode"),i=document.getElementById("equipment-description"),c=t==="package";r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),wc(t),t==="package"&&Ea()}function Ea(){const{packageSelect:e,packageHint:t}=Nn();if(!e)return;const n=Lr();ni=n,fc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,r=n.map(c=>{const d=Number.isFinite(Number(c.price))?Number(c.price):0,l=b(d.toFixed(2)),u=`${c.name} — ${l} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${r}`,e.selectedIndex=0;const i=n.length>0;e.disabled=!i,t&&(i?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),bi()}function kl(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:r,blockingPackages:i})=>{const c=r?.desc||b(String(r?.barcode??r?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(i)&&i.length){const d=i.map(l=>l.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${d})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function yi(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const r=wn(e);if(!r)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const i=bl(r);if(!i)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(m=>m?.type==="package"&&wn(m.packageId)===r))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(yc(r,n,a,s)){const m=i.name||r;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${m} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(i.items)&&i.items.length?i.items:qs(i.raw??{}),d=Rs(t),l=[],u=new Set;if(c.forEach(m=>{const y=te(m?.normalizedBarcode??m?.barcode);if(y){if(u.has(y)){l.push({item:m,type:"internal"});return}u.add(y),d.has(y)&&l.push({item:m,type:"external"})}}),l.length){const m=l.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>b(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:l.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",m):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",m),duplicates:l}}const f=[];return c.forEach(m=>{const y=te(m?.normalizedBarcode??m?.barcode);if(y&&it(y,n,a,s)){const g=Ss(y,n,a,s);f.push({item:m,blockingPackages:g})}}),f.length?{success:!1,reason:"item_conflict",message:kl(i,f),conflicts:f}:{success:!0,package:{id:`package::${r}`,packageId:r,type:"package",desc:i.name||`Package ${r}`,qty:1,price:Number.isFinite(Number(i.price))?Number(i.price):0,barcode:i.code||i.raw?.package_code||`pkg-${r}`,packageItems:c.map(m=>({equipmentId:m?.equipmentId??null,barcode:m?.barcode??m?.normalizedBarcode??"",normalizedBarcode:te(m?.normalizedBarcode??m?.barcode),desc:m?.desc??"",qty:Number.isFinite(Number(m?.qty))?Number(m.qty):1,price:Number.isFinite(Number(m?.price))?Number(m.price):0})),image:c.find(m=>m?.image)?.image??null},packageInfo:i}}function gi(e,{silent:t=!1}={}){const n=wn(e);if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=Ut(),r=ot(),i=yi(n,{existingItems:r,start:a,end:s});if(!i.success){if(!t){const d={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[i.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");E(i.message||d)}return i}return da(i.package),ht(),le(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:i.package}}function bi(){const{packageSelect:e}=Nn();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;gi(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function _l(){const{packageAddButton:e,packageSelect:t}=Nn();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}gi(n)}),e.dataset.listenerAttached="true")}function hi(){const{modeRadios:e}=Nn();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&ns(s.target.value)}),a.dataset.listenerAttached="true")}),_l(),bi();const t=Qn(),n=e.find(a=>a.value===t);n&&(n.checked=!0),ns(t)}function ht(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=ot(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),d=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const l=an(n);t.innerHTML=l.map(u=>{const f=u.items[0]||{},p=Ot(f)||u.image,m=p?`<img src="${p}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',y=b(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,v=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,k=`${b(g.toFixed(2))} ${s}`,h=`${b(v.toFixed(2))} ${s}`,q=u.items.some(w=>w?.type==="package"),N=u.barcodes.map(w=>b(String(w||""))).filter(Boolean),V=N.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${N.map(w=>`<li>${w}</li>`).join("")}
            </ul>
          </details>`:"";let S="";if(q){const w=new Map;if(u.items.forEach(_=>{Array.isArray(_?.packageItems)&&_.packageItems.forEach(T=>{if(!T)return;const D=te(T.barcode||T.desc||Math.random()),$=w.get(D);if($){$.qty+=Number.isFinite(Number(T.qty))?Number(T.qty):1;return}w.set(D,{desc:T.desc||T.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(T.qty))?Number(T.qty):1,barcode:T.barcode??T.normalizedBarcode??""})})}),w.size){const _=Array.from(w.values()).map(T=>{const D=b(String(T.qty)),$=T.desc||b(String(T.barcode||"")),F=T.barcode?` <span class="reservation-package-items__barcode">(${b(String(T.barcode))})</span>`:"";return`<li>${$}${F} × ${D}</li>`}).join("");S=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${_}
              </ul>
            </details>
          `}}return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${m}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${q?`${S||""}${V||""}`:V}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${c}" ${q?"disabled":""}>−</button>
              <span class="reservation-qty-value">${y}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${i}" ${q?"disabled":""}>+</button>
            </div>
          </td>
          <td>${k}</td>
          <td>${h}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${d}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function $l(e){const t=ot(),a=an(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(qc(s),ht(),le())}function Pl(e){const t=ot(),n=t.filter(a=>ua(a)!==e);n.length!==t.length&&(Fr(n),ht(),le())}function Cl(e){const t=ot(),a=an(t).find(f=>f.key===e);if(!a)return;const{start:s,end:r}=Ut();if(!s||!r){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(f=>te(f.barcode))),{equipment:c=[]}=ue(),d=(c||[]).find(f=>{const p=te(f?.barcode);return!p||i.has(p)||ua({desc:f?.desc||f?.description||f?.name||"",price:Number(f?.price)||0})!==e||!$s(f)?!1:!it(p,s,r)});if(!d){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const l=te(d.barcode),u=Ht(d);if(!u){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}da({id:u,equipmentId:u,barcode:l,desc:d.desc||d.description||d.name||a.description||"",qty:1,price:Number.isFinite(Number(d.price))?Number(d.price):a.unitPrice,image:Ot(d)}),ht(),le()}function le(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(b(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),d=c?.value||"unpaid",{start:l,end:u}=Ut();i&&Je();const f=en(),p=document.getElementById("res-payment-progress-type"),m=document.getElementById("res-payment-progress-value"),y=si(p),g=ri(m);cr({selectedItems:ot(),discount:n,discountType:s,applyTax:i,paidStatus:d,paymentProgressType:y,paymentProgressValue:g,start:l,end:u,companySharePercent:f,paymentHistory:[]});const v=cr.lastResult;v?(ii(m,v.paymentProgressValue),c&&(c.value=v.paymentStatus,Ve(c,v.paymentStatus))):Ve(c,d)}function Tl(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=b(c.target.value),le()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",le),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(Oe()){n.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}es("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(Oe()){a.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}es("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(Oe()){s.value="unpaid",Ve(s,"unpaid"),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ve(s),le()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(Oe()){r.value="percent",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",le()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(Oe()){i.value="",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=b(c.target.value),le()}),i.dataset.listenerAttached="true"),le()}function Nl(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){le();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),le()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function hr(){const{input:e,hidden:t}=js(),{input:n,hidden:a}=Vt(),{customers:s}=ue();let r=t?.value?String(t.value):"";if(!r&&e?.value){const J=Ya(e.value,{allowPartial:!0});J&&(r=String(J.id),t&&(t.value=r),e.value=J.label,e.dataset.selectedId=r)}const i=s.find(J=>String(J.id)===r);if(!i){E(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let d=a?.value?String(a.value):"";if(!d&&n?.value){const J=Za(n.value,{allowPartial:!0});J&&(d=String(J.id),a&&(a.value=d),n.value=J.label,n.dataset.selectedId=d)}const l=document.getElementById("res-start").value,u=document.getElementById("res-end").value,f=document.getElementById("res-start-time")?.value||"00:00",p=document.getElementById("res-end-time")?.value||"00:00";if(!l||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${l}T${f}`,y=`${u}T${p}`,g=new Date(m),v=new Date(y);if(Number.isNaN(g.getTime())||Number.isNaN(v.getTime())||g>=v){E(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const k=Sc(),h=ot();if(h.length===0&&k.length===0){E(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const q=document.getElementById("res-notes")?.value||"",N=parseFloat(b(document.getElementById("res-discount")?.value))||0,V=document.getElementById("res-discount-type")?.value||"percent",S=document.getElementById("res-payment-status"),w=S?.value||"unpaid",_=document.getElementById("res-payment-progress-type"),T=document.getElementById("res-payment-progress-value"),D=si(_),$=ri(T),F=d?Bs(d):null,Q=vl(F);if(d&&!F){E(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const J of h){const re=bt(J.barcode);if(re==="maintenance"||re==="retired"){E(Mt(re));return}}for(const J of h){const re=te(J.barcode);if(it(re,m,y)){E(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const J of k)if(Dr(J,m,y)){E(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const P=document.getElementById("res-tax"),j=document.getElementById("res-company-share"),I=!!d;I?(P&&(P.checked=!1,P.disabled=!0,P.classList.add("disabled"),P.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),j&&(j.checked=!1,j.disabled=!0,j.classList.add("disabled"),j.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),S&&(S.value="unpaid",S.disabled=!0,Ve(S,"unpaid"),S.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),_&&(_.disabled=!0,_.classList.add("disabled")),T&&(T.value="",T.disabled=!0,T.classList.add("disabled"))):(P&&(P.disabled=!1,P.classList.remove("disabled"),P.title=""),j&&(j.disabled=!1,j.classList.remove("disabled"),j.title=""),S&&(S.disabled=!1,S.title=""),_&&(_.disabled=!1,_.classList.remove("disabled")),T&&(T.disabled=!1,T.classList.remove("disabled")));const W=I?!1:P?.checked||!1,H=!!j?.checked;if(!I&&H!==W){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let A=H?en():null;H&&(!Number.isFinite(A)||A<=0)&&(Je(),A=en());const O=H&&W&&Number.isFinite(A)&&A>0;W&&Je();const R=Es(h,N,V,W,k,{start:m,end:y,companySharePercent:O?A:0}),M=mc(),z=xs({totalAmount:R,progressType:D,progressValue:$,history:[]});T&&ii(T,z.paymentProgressValue);const ne=[];z.paymentProgressValue!=null&&z.paymentProgressValue>0&&ne.push({type:z.paymentProgressType||D,value:z.paymentProgressValue,amount:z.paidAmount,percentage:z.paidPercent,recordedAt:new Date().toISOString()});const ee=ws({manualStatus:w,paidAmount:z.paidAmount,paidPercent:z.paidPercent,totalAmount:R});S&&(S.value=ee,Ve(S,ee));const oe=Rr({reservationCode:M,customerId:c,start:m,end:y,status:Q?"confirmed":"pending",title:null,location:null,notes:q,projectId:d||null,totalAmount:R,discount:I?0:N,discountType:I?"percent":V,applyTax:W,paidStatus:I?"unpaid":ee,confirmed:Q,items:h.map(J=>({...J,equipmentId:J.equipmentId??J.id})),technicians:k,companySharePercent:I||!O?null:A,companyShareEnabled:I?!1:O,paidAmount:I?0:z.paidAmount,paidPercentage:I?0:z.paidPercent,paymentProgressType:I?null:z.paymentProgressType,paymentProgressValue:I?null:z.paymentProgressValue,paymentHistory:I?[]:ne});try{const J=await Ec(oe);Tn(),wt(),Pn(),Bl(),E(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Wa=="function"&&Wa({type:"created",reservation:J}),jl(J)}catch(J){console.error("❌ [reservations/createForm] Failed to create reservation",J);const re=ma(J)?J.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");E(re,"error"),I&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),vn({clearValue:!1}))}}function jl(e){if(!On)return;const{draftStorageKey:t=Zr,returnUrl:n=ei}=On,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}On=null,n&&(window.location.href=n)}function vn({clearValue:e=!1}={}){const{input:t,hidden:n}=Vt();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,xt())}function Ll(e,t=""){const{input:n,hidden:a}=Vt();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),xt())}function Bl(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),ft({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),vn({clearValue:!1}),tn({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",Ve(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),xc(),Fr([]),Wn("form-reset"),ht(),xt(),le()}function Fl(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){$l(s);return}if(a==="increase-group"&&s){Cl(s);return}if(a==="remove-group"&&s){Pl(s);return}}),e.dataset.listenerAttached="true")}function Dl(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(Qn()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,pi(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||Qn()!=="single")return;const{start:r,end:i}=Ut();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function Rl(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await hr()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await hr()}),t.dataset.listenerAttached="true")}function em({onAfterSubmit:e}={}){Wa=typeof e=="function"?e:null;const{customers:t,projects:n}=ue();vc(t||[]),ft(),Ds(),ci(n||[]),di({projectsList:n}),Fs(),wt(),Ea(),wl(),fi(),hi(),Nl(),Tl(),Fl(),Dl(),Rl(),ql(),le(),ht()}function vi(){wt(),Ea(),di(),ft(),Ds(),Fs(),fi(),hi(),ht(),le()}if(typeof document<"u"){const e=()=>{ft(),tn({projectsList:Ls()}),Ds(),Fs(),le()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{wt()}),document.addEventListener("packages:changed",()=>{Ea(),Qn()==="package"&&ns("package")})}typeof window<"u"&&(window.getCompanySharePercent=en);function qi(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:Ct(t),endDate:Ct(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:Ct(n),endDate:Ct(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Ct(n),endDate:Ct(a)}}return e==="upcoming"?{startDate:Ct(t),endDate:""}:{startDate:"",endDate:""}}function Ml(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=b(t?.value||"").trim(),i=b(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),aa(t),aa(n),r="",i=""),!r&&!i&&c){const l=qi(c);r=l.startDate,i=l.endDate}return{searchTerm:Re(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function tm(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=b(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{zl(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),aa(a),aa(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function zl(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=qi(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function Ct(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function aa(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function Rn(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function Hl(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function Ol(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=Hl(n);if(a!==null)return a}return null}function vr(e,t=0){const n=Ol(e);if(n!=null)return n;const a=Rn(e.createdAt??e.created_at);if(a!=null)return a;const s=Rn(e.updatedAt??e.updated_at);if(s!=null)return s;const r=Rn(e.start);if(r!=null)return r;const i=Rn(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function Vl({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((h,q)=>({reservation:h,index:q})),i=t.searchTerm||"",c=t.searchReservationId||"",d=t.searchCustomerName||"",l=t.searchProjectId||"",u=t.startDate||"",f=t.endDate||"",p=t.status||"",m=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,y=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,v=f?new Date(`${f}T23:59:59`):null,k=r.filter(({reservation:h})=>{const q=n.get(String(h.customerId)),N=s?.get?.(String(h.projectId)),V=h.start?new Date(h.start):null,S=Is(h),{effectiveConfirmed:w}=It(h,N);if(m!=null&&String(h.customerId)!==String(m)||y!=null&&!(Array.isArray(h.technicians)?h.technicians.map(F=>String(F)):[]).includes(String(y))||p==="confirmed"&&!w||p==="pending"&&w||p==="completed"&&!S||g&&V&&V<g||v&&V&&V>v)return!1;if(c){const $=[h.reservationId,h.id,h.reservation_id,h.reservationCode,h.reservation_code,h.code,h.reference,h.referenceNumber,h.reference_number],F=Re($.filter(P=>P!=null&&P!=="").map(String).join(" ")).replace(/\s+/g,""),Q=c.replace(/\s+/g,"");if(!F.includes(Q))return!1}if(d&&!Re(q?.customerName||"").includes(d))return!1;if(l){const $=[h.projectId,h.project_id,h.projectID,N?.id,N?.projectCode,N?.project_code],F=Re($.filter(P=>P!=null&&P!=="").map(String).join(" ")).replace(/\s+/g,""),Q=l.replace(/\s+/g,"");if(!F.includes(Q))return!1}if(!i)return!0;const _=h.items?.map?.($=>`${$.barcode} ${$.desc}`).join(" ")||"",T=(h.technicians||[]).map($=>a.get(String($))?.name).filter(Boolean).join(" ");return Re([h.reservationId,q?.customerName,h.notes,_,T,N?.title].filter(Boolean).join(" ")).includes(i)});return k.sort((h,q)=>{const N=vr(h.reservation,h.index),V=vr(q.reservation,q.index);return N!==V?V-N:q.index-h.index}),k}function Ul({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),d=o("reservations.list.itemsCountShort","{count} عنصر"),l=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),f=o("reservations.list.status.pending","⏳ غير مؤكد"),p=o("reservations.list.payment.paid","💳 مدفوع"),m=o("reservations.list.payment.unpaid","💳 غير مدفوع"),y=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),g=o("reservations.list.actions.confirm","✔️ تأكيد"),v=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),k=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),h={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:q,index:N})=>{const V=t.get(String(q.customerId)),S=q.projectId?a?.get?.(String(q.projectId)):null,w=Is(q),_=q.paidStatus??q.paid_status??(q.paid===!0||q.paid==="paid"?"paid":"unpaid"),T=_==="paid",D=_==="partial",{effectiveConfirmed:$,projectLinked:F}=It(q,S),Q=$?"status-confirmed":"status-pending",P=T?"status-paid":D?"status-partial":"status-unpaid";let j=`<span class="reservation-chip status-chip ${Q}">${$?u:f}</span>`;const I=T?p:D?y:m;let W=`<span class="reservation-chip status-chip ${P}">${I}</span>`,H=T?" tile-paid":D?" tile-partial":" tile-unpaid";w&&(H+=" tile-completed");let A="";w&&(j=`<span class="reservation-chip status-chip status-completed">${u}</span>`,W=`<span class="reservation-chip status-chip status-completed">${I}</span>`,A=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const O=!F&&!$?`<button class="tile-confirm" data-reservation-index="${N}" data-action="confirm">${g}</button>`:"",R=O?`<div class="tile-actions">${O}</div>`:"",M=q.items?.length||0,z=(q.technicians||[]).map(fe=>n.get(String(fe))).filter(Boolean),ne=z.map(fe=>fe.name).join(l)||"—",ee=b(String(q.reservationId??"")),oe=q.start?b(Ue(q.start)):"-",J=q.end?b(Ue(q.end)):"-",re=b(String(q.cost??0)),he=b(String(M)),ve=q.notes?b(q.notes):c,$e=d.replace("{count}",he),U=q.applyTax?`<small>${r}</small>`:"";let Z=v;return q.projectId&&(Z=S?.title?b(S.title):k),`
      <div class="${O?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${H}"${A} data-reservation-index="${N}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${ee}</div>
          <div class="tile-badges">
            ${j}
            ${W}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${h.client}</span>
            <span class="tile-value">${V?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${h.project}</span>
            <span class="tile-value">${Z}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${h.start}</span>
            <span class="tile-value tile-inline">${oe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${h.end}</span>
            <span class="tile-value tile-inline">${J}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${h.cost}</span>
            <span class="tile-value">${re} ${s} ${U}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${h.equipment}</span>
            <span class="tile-value">${$e}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${h.crew}</span>
            <span class="tile-value">${z.length?ne:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${ve}</span>
          </div>
        </div>
        ${R}
      </div>
    `}).join("")}function De(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Kl(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=It(e,s),c=e.paid===!0||e.paid==="paid",d=Is(e),l=e.items||[],{groups:u}=As(e),{technicians:f=[]}=ue(),p=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(f)?f:[]),m=new Map;p.forEach(C=>{if(!C||C.id==null)return;const G=String(C.id),xe=m.get(G)||{};m.set(G,{...xe,...C})});const y=(e.technicians||[]).map(C=>m.get(String(C))).filter(Boolean),g=zt(),v=pa(e.start,e.end),k=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,h=ut(k),q=Number.isFinite(h)?h:0,N=e.discountType??e.discount_type??e.discountMode??"percent",V=String(N).toLowerCase()==="amount"?"amount":"percent",S=r?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),w=ut(e.cost??e.total??e.finalTotal),_=Number.isFinite(w),T=_?Ae(w):0,D=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,$=D!=null?ut(D):Number.NaN;let P=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite($)&&$>0)&&Number.isFinite($)?$:0;S&&P<=0&&(P=gt);const j=Ic({items:l,technicianIds:e.technicians||[],discount:q,discountType:V,applyTax:S,start:e.start,end:e.end,companySharePercent:P}),I=Ae(j.equipmentTotal),W=Ae(j.crewTotal);Ae(j.crewCostTotal);const H=Ae(j.discountAmount),A=Ae(j.subtotalAfterDiscount),O=Number.isFinite(j.companySharePercent)?j.companySharePercent:0;let R=Ae(j.companyShareAmount);R=O>0?Ae(Math.max(0,R)):0;const M=Ae(j.taxAmount),z=Ae(j.finalTotal),ne=r?z:_?T:z,ee=Ae(j.netProfit),oe=b(String(e.reservationId??e.id??"")),J=e.start?b(Ue(e.start)):"-",re=e.end?b(Ue(e.end)):"-",he=b(String(y.length)),ve=b(I.toFixed(2)),$e=b(H.toFixed(2)),U=b(A.toFixed(2)),Z=b(M.toFixed(2)),se=b((Number.isFinite(ne)?ne:0).toFixed(2)),fe=b(String(v)),me=o("reservations.create.summary.currency","SR"),Ye=o("reservations.details.labels.discount","الخصم"),Y=o("reservations.details.labels.tax","الضريبة (15%)"),be=o("reservations.details.labels.crewTotal","إجمالي الفريق"),B=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),ae=o("reservations.details.labels.duration","عدد الأيام"),pe=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),ce=o("reservations.details.labels.netProfit","💵 صافي الربح"),ye=o("reservations.create.equipment.imageAlt","صورة"),qe={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},je=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),Ge=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),Ze=o("reservations.details.technicians.roleUnknown","غير محدد"),Qt=o("reservations.details.technicians.phoneUnknown","غير متوفر"),ln=o("reservations.details.technicians.wage","{amount} {currency} / اليوم"),Gt=o("reservations.list.status.confirmed","✅ مؤكد"),K=o("reservations.list.status.pending","⏳ غير مؤكد"),Ee=o("reservations.list.payment.paid","💳 مدفوع"),et=o("reservations.list.payment.unpaid","💳 غير مدفوع"),lt=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),Ln=o("reservations.list.status.completed","📁 منتهي"),Bn=o("reservations.details.labels.id","🆔 رقم الحجز"),Pa=o("reservations.details.section.bookingInfo","بيانات الحجز"),Ca=o("reservations.details.section.paymentSummary","ملخص الدفع"),dn=o("reservations.details.labels.finalTotal","المجموع النهائي"),Wt=o("reservations.details.section.crew","😎 الفريق الفني"),So=o("reservations.details.crew.count","{count} عضو"),Eo=o("reservations.details.section.items","📦 المعدات المرتبطة"),xo=o("reservations.details.items.count","{count} عنصر"),wo=o("reservations.details.actions.edit","✏️ تعديل"),Io=o("reservations.details.actions.delete","🗑️ حذف"),Ao=o("reservations.details.labels.customer","العميل"),ko=o("reservations.details.labels.contact","رقم التواصل"),_o=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const $o=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Po=o("reservations.details.actions.openProject","📁 فتح المشروع"),Co=o("reservations.details.labels.start","بداية الحجز"),To=o("reservations.details.labels.end","نهاية الحجز"),No=o("reservations.details.labels.notes","ملاحظات"),jo=o("reservations.list.noNotes","لا توجد ملاحظات"),Lo=o("reservations.details.labels.itemsCount","عدد المعدات"),Bo=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),Fo=o("reservations.paymentHistory.title","سجل الدفعات"),Do=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Ro=o("reservations.list.unknownCustomer","غير معروف"),Ta=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),Zs=Ta==="partial",Mo=Ta==="paid"?Ee:Zs?lt:et;function Na(C){if(C==null)return Number.NaN;if(typeof C=="number")return Number.isFinite(C)?C:Number.NaN;const G=String(C).replace(/[^0-9.+-]/g,""),xe=Number(G);return Number.isFinite(xe)?xe:Number.NaN}const er=(C={})=>{const G=String(C.type??C.kind??C.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(G)||Array.isArray(C.packageItems)&&C.packageItems.length)},zo=(C={})=>[C.packageId,C.package_id,C.packageCode,C.package_code,C.bundleId,C.bundle_id].some(G=>G!=null&&G!==""),Ho=(C={})=>!C||typeof C!="object"?!1:!er(C)&&zo(C),tr=(C={})=>{const G=er(C),xe=[{value:C.qty,key:"qty",limit:999},{value:C.quantity,key:"quantity",limit:999},{value:C.units,key:"units",limit:999},{value:C.count,key:"count",limit:50},{value:C.package_quantity,key:"package_quantity",limit:999},{value:C.packageQty,key:"packageQty",limit:999},{value:C.packageCount,key:"packageCount",limit:999}];let ze=NaN;for(const Pe of xe){if(Pe.value==null||Pe.value==="")continue;const tt=typeof Pe.value=="string"?Pe.value.trim():String(Pe.value??"");if(Pe.key==="count"&&tt.length>6)continue;const Ne=Na(Pe.value);if(!Number.isFinite(Ne)||Ne<=0)continue;const Fn=Math.round(Ne);if(!(Fn>Pe.limit)){ze=Math.max(1,Fn);break}}return(!Number.isFinite(ze)||ze<=0)&&(ze=1),G?Math.max(1,Math.min(99,ze)):Math.max(1,Math.min(9999,ze))};let Te=(Array.isArray(l)?l:[]).reduce((C,G)=>!G||typeof G!="object"||Ho(G)?C:C+tr(G),0);Te<=0&&Array.isArray(u)&&u.length&&(Te=u.reduce((C,G)=>{const xe=tr({...G,type:G.type});return C+xe},0)),!Number.isFinite(Te)||Te<=0?Te=Array.isArray(u)&&u.length?u.length:(Array.isArray(l)?l.length:0)||1:Te>1e6&&(Te=Math.min(Te,Array.isArray(u)?u.length:Te),(!Number.isFinite(Te)||Te<=0)&&(Te=(Array.isArray(l)?l.length:0)||1)),Te=Math.max(1,Math.round(Te));const Oo=b(String(Te)),nr=xo.replace("{count}",Oo),Vo=So.replace("{count}",he),Uo=e.notes?b(e.notes):jo,Ko=b(W.toFixed(2)),Qo=b(String(O)),Go=b(R.toFixed(2)),Wo=`${Qo}% (${Go} ${me})`,Xo=Number.isFinite(ee)?Math.max(0,ee):0,Jo=b(Xo.toFixed(2)),vt=[{icon:"💼",label:Bo,value:`${ve} ${me}`}];vt.push({icon:"😎",label:be,value:`${Ko} ${me}`}),H>0&&vt.push({icon:"💸",label:Ye,value:`${$e} ${me}`}),vt.push({icon:"📊",label:B,value:`${U} ${me}`}),S&&M>0&&vt.push({icon:"🧾",label:Y,value:`${Z} ${me}`}),O>0&&vt.push({icon:"🏦",label:pe,value:Wo}),vt.push({icon:"💵",label:ce,value:`${Jo} ${me}`}),vt.push({icon:"💰",label:dn,value:`${se} ${me}`});const Yo=vt.map(({icon:C,label:G,value:xe})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${C} ${G}</span>
      <span class="summary-details-value">${xe}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let un=[];Array.isArray(e.paymentHistory)?un=e.paymentHistory:Array.isArray(e.payment_history)&&(un=e.payment_history);const Zo=Array.isArray(e.paymentLogs)?e.paymentLogs:[],ar=Array.isArray(un)&&un.length>0?un:Zo,ec=ar.length?`<ul class="reservation-payment-history-list">${ar.map(C=>{const G=C?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):C?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),xe=Number.isFinite(Number(C?.amount))&&Number(C.amount)>0?`${b(Number(C.amount).toFixed(2))} ${me}`:"—",ze=Number.isFinite(Number(C?.percentage))&&Number(C.percentage)>0?`${b(Number(C.percentage).toFixed(2))}%`:"—",Pe=C?.recordedAt?b(Ue(C.recordedAt)):"—",tt=C?.note?`<div class="payment-history-note">${De(b(C.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${De(G)}</span>
              <span class="payment-history-entry__amount">${xe}</span>
              <span class="payment-history-entry__percent">${ze}</span>
              <span class="payment-history-entry__date">${Pe}</span>
            </div>
            ${tt}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${De(Do)}</div>`,sr=[{text:i?Gt:K,className:i?"status-confirmed":"status-pending"},{text:Mo,className:Ta==="paid"?"status-paid":Zs?"status-partial":"status-unpaid"}];d&&sr.push({text:Ln,className:"status-completed"});const tc=sr.map(({text:C,className:G})=>`<span class="status-chip ${G}">${C}</span>`).join(""),$t=(C,G,xe)=>`
    <div class="res-info-row">
      <span class="label">${C} ${G}</span>
      <span class="value">${xe}</span>
    </div>
  `;let ja="";if(e.projectId){let C=De($o);if(s){const G=s.title||o("projects.fallback.untitled","مشروع بدون اسم");C=`${De(G)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${De(Po)}</button>`}ja=`
      <div class="res-info-row">
        <span class="label">📁 ${_o}</span>
        <span class="value">${C}</span>
      </div>
    `}const dt=[];dt.push($t("👤",Ao,t?.customerName||Ro)),dt.push($t("📞",ko,t?.phone||"—")),dt.push($t("🗓️",Co,J)),dt.push($t("🗓️",To,re)),dt.push($t("📦",Lo,nr)),dt.push($t("⏱️",ae,fe)),dt.push($t("📝",No,Uo)),ja&&dt.push(ja);const nc=dt.join(""),ac=u.length?u.map(C=>{const G=C.items[0]||{},xe=Ot(G)||C.image,ze=xe?`<img src="${xe}" alt="${ye}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',Pe=C.items.some(ge=>ge?.type==="package"),tt=(ge,{fallback:He=1,max:Ce=1e3}={})=>{const de=Na(ge);return Number.isFinite(de)&&de>0?Math.min(Ce,de):He};let Ne;if(Pe){const ge=tt(G?.qty??G?.quantity??G?.count,{fallback:NaN,max:999});Number.isFinite(ge)&&ge>0?Ne=ge:Ne=tt(C.quantity??C.count??1,{fallback:1,max:999})}else Ne=tt(C.quantity??C.count??G?.qty??G?.quantity??G?.count??0,{fallback:1,max:9999});const Fn=b(String(Ne)),La=(ge,{preferPositive:He=!1}={})=>{let Ce=Number.NaN;for(const de of ge){const we=ut(de);if(Number.isFinite(we)){if(He&&we>0)return we;Number.isFinite(Ce)||(Ce=we)}}return Ce};let Ie,We;if(Pe){const ge=[G?.price,G?.unit_price,G?.unitPrice,C.unitPrice];if(Ie=La(ge,{preferPositive:!0}),!Number.isFinite(Ie)||Ie<0){const Ce=ut(C.totalPrice??G?.total??G?.total_price);Number.isFinite(Ce)&&Ne>0&&(Ie=Ce/Ne)}Number.isFinite(Ie)||(Ie=0);const He=[G?.total,G?.total_price,C.totalPrice];if(We=La(He),!Number.isFinite(We))We=Ie*Ne;else{const Ce=Ie*Ne;Number.isFinite(Ce)&&Ce>0&&Math.abs(We-Ce)>Ce*.25&&(We=Ce)}}else{const ge=[G?.price,G?.unit_price,G?.unitPrice,C.unitPrice];if(Ie=La(ge,{preferPositive:!0}),!Number.isFinite(Ie)||Ie<0){const He=ut(C.totalPrice??G?.total??G?.total_price);Number.isFinite(He)&&Ne>0&&(Ie=He/Ne)}Number.isFinite(Ie)||(Ie=0),We=ut(C.totalPrice??G?.total??G?.total_price),Number.isFinite(We)||(We=Ie*Ne)}Ie=Ae(Ie),We=Ae(We);const oc=`${b(Ie.toFixed(2))} ${me}`,cc=`${b(We.toFixed(2))} ${me}`,rr=C.barcodes.map(ge=>b(String(ge||""))).filter(Boolean),ir=rr.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${rr.map(ge=>`<li>${ge}</li>`).join("")}
              </ul>
            </details>`:"";let or="";if(Pe){const ge=new Map,He=[];Array.isArray(C.packageItems)&&C.packageItems.length&&He.push(...C.packageItems),C.items.forEach(de=>{Array.isArray(de?.packageItems)&&de.packageItems.length&&He.push(...de.packageItems)});const Ce=de=>{const we=Na(de?.qtyPerPackage??de?.perPackageQty??de?.quantityPerPackage);return Number.isFinite(we)&&we>0&&we<=99?Math.round(we):1};if(He.forEach(de=>{if(!de)return;const we=te(de.barcode||de.normalizedBarcode||de.desc||Math.random());if(!we)return;const mn=ge.get(we),Xt=Ce(de);if(mn){mn.qty=Xt,mn.total=Xt;return}ge.set(we,{desc:de.desc||de.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(Xt,99)),total:Math.max(1,Math.min(Xt,99)),barcode:de.barcode??de.normalizedBarcode??""})}),ge.size){const de=Array.from(ge.values()).map(we=>{const mn=b(String(we.qty>0?Math.min(we.qty,99):1)),Xt=De(we.desc||""),dc=we.barcode?` <span class="reservation-package-items__barcode">(${De(b(String(we.barcode)))})</span>`:"";return`<li>${Xt}${dc} × ${mn}</li>`}).join("");or=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${de}
                </ul>
              </details>
            `}}const lc=Pe?`${or||""}${ir||""}`:ir;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${ze}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${De(G.desc||G.description||G.name||C.description||"-")}</div>
                  ${lc}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${De(qe.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Fn}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${De(qe.unitPrice)}">${oc}</td>
            <td class="reservation-modal-items-table__cell" data-label="${De(qe.total)}">${cc}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${De(qe.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${je}</td></tr>`,sc=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${qe.item}</th>
            <th>${qe.quantity}</th>
            <th>${qe.unitPrice}</th>
            <th>${qe.total}</th>
            <th>${qe.actions}</th>
          </tr>
        </thead>
        <tbody>${ac}</tbody>
      </table>
    </div>
  `,rc=y.map((C,G)=>{const xe=b(String(G+1)),ze=C.role||Ze,Pe=C.phone||Qt,tt=C.wage?ln.replace("{amount}",b(String(C.wage))).replace("{currency}",me):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${xe}</span>
          <span class="technician-name">${C.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${ze}</div>
          <div>📞 ${Pe}</div>
          ${tt?`<div>💰 ${tt}</div>`:""}
        </div>
      </div>
    `}).join(""),ic=y.length?`<div class="reservation-technicians-grid">${rc}</div>`:`<ul class="reservation-modal-technicians"><li>${Ge}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${Bn}</span>
          <strong>${oe}</strong>
        </div>
        <div class="status-chips">
          ${tc}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Pa}</h6>
          ${nc}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${Ca}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${Yo}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Fo}</h6>
              ${ec}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Wt}</span>
          <span class="count">${Vo}</span>
        </div>
        ${ic}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Eo}</span>
          <span class="count">${nr}</span>
        </div>
        ${sc}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${wo}</button>
        ${g?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Io}</button>`:""}
      </div>
    </div>
  `}const nm="project",am="editProject",sm=3600*1e3,Si=.15,rm=6,im="projectsTab",om="projectsSubTab",cm={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},lm={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},dm={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},Ql=`@page {
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
`,Gl=/color\([^)]*\)/gi,In=/(color\(|color-mix\(|oklab|oklch)/i,Wl=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"],Xl=typeof document<"u"?document.createElement("canvas"):null,Mn=Xl?.getContext?.("2d")||null;function Ei(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function as(e,t="#000"){if(!Mn||!e)return t;try{return Mn.fillStyle="#000",Mn.fillStyle=e,Mn.fillStyle||t}catch{return t}}function Jl(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&In.test(n)){const s=as(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function Jt(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function um(e=[]){if(!(!Array.isArray(e)||!e.length))for(let t=e.length-1;t>=0;t-=1){const{element:n,prop:a,value:s,priority:r}=e[t]||{};!n?.style||!a||(s&&s.length>0?n.style.setProperty(a,s,r||""):n.style.removeProperty(a))}}function xi(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;Wl.forEach(c=>{const d=r[c];if(d&&In.test(d)){const l=Ei(c);Jt(n,s,l);const u=c==="backgroundColor"?"#ffffff":r.color||"#000000",f=as(d,u);s.style.setProperty(l,f,"important")}});const i=r.backgroundImage;if(i&&In.test(i)){const c=as(r.backgroundColor||"#ffffff","#ffffff");Jt(n,s,"background-image"),Jt(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function wi(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(c=>{const d=r[c];if(d&&In.test(d)){const l=Ei(c);Jt(n,s,l);const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(l,u,"important")}});const i=r.backgroundImage;i&&In.test(i)&&(Jt(n,s,"background-image"),Jt(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function Ii(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(Gl,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const Ai="reservations.quote.sequence",qr={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},ki="https://help.artratio.sa/guide/quote-preview",_e={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Yl=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Me=[...Yl],Zl=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function ss(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...Me]}function ed(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=ss(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=ss(t.value);if(a.length)return a}const n=Me.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...Me]}const td=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],_i=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(b(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>x(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>x(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>x(b(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>x(b(Number(e?.price||0).toFixed(2)))}],$i=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(b(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>x(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>x(e?.role||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>x(e?.phone||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],rs={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:_i.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:$i.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},Pi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(b(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>x(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>x(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>x(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Ci=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(b(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>x(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>x(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>x(e?.note||"-")}],Ti=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(b(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>x(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>x(b(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>x(b(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>x(e?.displayCost||"—")}],nd=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],ad={customerInfo:rs.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:rs.payment,projectExpenses:Ci.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:Pi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:Ti.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},Ma=new Map;function xa(e="reservation"){if(Ma.has(e))return Ma.get(e);const t=e==="project"?nd:td,n=e==="project"?ad:rs,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(d=>d.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return Ma.set(e,r),r}function wa(e="reservation"){return xa(e).sectionDefs}function Ni(e="reservation"){return xa(e).fieldDefs}function ji(e="reservation"){return xa(e).sectionIdSet}function Li(e="reservation"){return xa(e).fieldIdMap}function Bi(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const sd="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",rd="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",id="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",Fi=Ql.trim(),Di=/^data:image\/svg\+xml/i,od=/\.svg($|[?#])/i,bn=512,is="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",Ri=96,Mi=25.4,os=210,Vn=297,Un=Math.round(os/Mi*Ri),Kn=Math.round(Vn/Mi*Ri),cd=2,zi=/safari/i,ld=/(iphone|ipad|ipod)/i,Sr=/(iphone|ipad|ipod)/i,dd=/(crios|fxios|edgios|opios)/i,sa="[reservations/pdf]";let X=null,L=null,at=1,fn=null,yn=null,St=null,Yt=null,qn=!1;function Bt(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!X?.statusIndicator||!X?.statusText)return;X.statusKind=e;const r=t||Bi(e);X.statusText.textContent=r,X.statusSpinner&&(X.statusSpinner.hidden=!s),X.statusAction&&(X.statusAction.hidden=!0,X.statusAction.onclick=null,n&&typeof a=="function"&&(X.statusAction.textContent=n,X.statusAction.hidden=!1,X.statusAction.onclick=i=>{i.preventDefault(),a()})),X.statusIndicator.hidden=!1,requestAnimationFrame(()=>{X.statusIndicator.classList.add("is-visible")})}function Sn(e){!X?.statusIndicator||!X?.statusText||(X.statusKind=null,X.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{X?.statusIndicator&&(X.statusIndicator.hidden=!0,X.statusAction&&(X.statusAction.hidden=!0,X.statusAction.onclick=null),X.statusSpinner&&(X.statusSpinner.hidden=!1))},220))}function cs(){return!!window?.bootstrap?.Modal}function ud(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),St||(St=document.createElement("div"),St.className="modal-backdrop fade show",St.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(St)),Yt||(Yt=t=>{t.key==="Escape"&&ls(e)},document.addEventListener("keydown",Yt));try{e.focus({preventScroll:!0})}catch{}}}function ls(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),St&&(St.remove(),St=null),Yt&&(document.removeEventListener("keydown",Yt),Yt=null))}function md(e){if(e){if(cs()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}ud(e)}}function pd(){if(qn)return;qn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!X?.modal?.classList.contains("show"),s=()=>{X?.modal?.classList.contains("show")&&(Bt("render"),qn=!1,Kt())};jr({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:ki}),a&&Bt("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function Ia(e="reservation"){const t={},n=Ni(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function Ms(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function fd(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function zs(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function Hs(e="reservation"){return Object.fromEntries(wa(e).map(({id:t})=>[t,!1]))}function Os(e,t){return e.sectionExpansions||(e.sectionExpansions=Hs(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function yd(e,t){return Os(e,t)?.[t]!==!1}function Vs(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function gd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return ld.test(e)}function bd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=zi.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Hi(){return gd()&&bd()}function Aa(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=Sr.test(e)||Sr.test(t),s=/Macintosh/i.test(e)&&n>1;return zi.test(e)&&!dd.test(e)&&(a||s)}function za(e,...t){try{console.log(`${sa} ${e}`,...t)}catch{}}function yt(e,...t){try{console.warn(`${sa} ${e}`,...t)}catch{}}function hd(e,t,...n){try{t?console.error(`${sa} ${e}`,t,...n):console.error(`${sa} ${e}`,...n)}catch{}}function Se(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function vd(e,t="لا توجد بيانات للعرض."){const n=x(o(e,t));return Se(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function ra(e,t){return Array.isArray(e)&&e.length?e:[vd(t)]}const qd=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function Oi(e=""){return qd.test(e)}function Sd(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!Oi(r))return a.call(this,r,...i);let c,d=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),d=!0)}catch{}try{if(!d){const l=this.canvas;l&&l.style?.direction!=="rtl"&&(l.__artRatioOriginalDirection=l.style.direction,l.style.direction="rtl")}return a.call(this,r,...i)}finally{if(d&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!d){const l=this.canvas;l&&l.__artRatioOriginalDirection!==void 0&&(l.style.direction=l.__artRatioOriginalDirection,delete l.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function Er(e,t=bn){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Ed(e){if(!e)return{width:bn,height:bn};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?Er(t,0):0,s=n?Er(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,d]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(d)&&d>0?d:0)}}return{width:a||bn,height:s||bn}}function Vi(e=""){return typeof e!="string"?!1:Di.test(e)||od.test(e)}function xd(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function wd(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function Ui(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await wd(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),d=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=d;const l=i.getContext("2d");return l.clearRect(0,0,c,d),l.drawImage(r,0,0,c,d),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function Id(e){if(!e)return null;if(Di.test(e))return xd(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Ad(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!Vi(t))return!1;const n=await Id(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",is),!1;const a=await Ui(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",is),!1)}async function kd(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Ed(e),s=await Ui(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||is),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),d=e.getAttribute("height");return c&&i.setAttribute("width",c),d&&i.setAttribute("height",d),e.parentNode?.replaceChild(i,e),!!s}async function Ki(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{Vi(s.getAttribute?.("src"))&&a.push(Ad(s))}),n.forEach(s=>{a.push(kd(s))}),a.length&&await Promise.allSettled(a)}function _d(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(A,O=0)=>{const R=parseFloat(A);return Number.isFinite(R)?R:O},i=r(s.paddingTop),c=r(s.paddingBottom),d=r(s.paddingRight),l=r(s.paddingLeft),u=r(s.borderRadius),f=r(s.fontSize,14),p=(()=>{const A=s.lineHeight;if(!A||A==="normal")return f*1.6;const O=r(A,f*1.6);return O>0?O:f*1.6})(),m=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(m<=0)return null;const y=Math.max(1,m-l-d),g=e.textContent||"",v=g.split(/\r?\n/),k=n.createElement("canvas"),h=k.getContext("2d");if(!h)return null;const q=s.fontStyle||"normal",N=s.fontVariant||"normal",V=s.fontWeight||"400",S=s.fontFamily||"sans-serif",w=s.fontStretch||"normal",_=A=>A.join(" "),T=[],D=A=>h.measureText(A).width;h.font=`${q} ${N} ${V} ${w} ${f}px ${S}`,v.forEach(A=>{const O=A.trim();if(O.length===0){T.push("");return}const R=O.split(/\s+/);let M=[];R.forEach((z,ne)=>{const ee=z.trim();if(!ee)return;const oe=_(M.concat(ee));if(D(oe)<=y||M.length===0){M.push(ee);return}T.push(_(M)),M=[ee]}),M.length&&T.push(_(M))}),T.length||T.push("");const $=i+c+T.length*p,F=Math.ceil(Math.max(1,m)*t),Q=Math.ceil(Math.max(1,$)*t);k.width=F,k.height=Q,k.style.width=`${Math.max(1,m)}px`,k.style.height=`${Math.max(1,$)}px`,h.scale(t,t);const P=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){h.save(),h.beginPath();const A=Math.max(1,m),O=Math.max(1,$),R=Math.min(u,A/2,O/2);h.moveTo(R,0),h.lineTo(A-R,0),h.quadraticCurveTo(A,0,A,R),h.lineTo(A,O-R),h.quadraticCurveTo(A,O,A-R,O),h.lineTo(R,O),h.quadraticCurveTo(0,O,0,O-R),h.lineTo(0,R),h.quadraticCurveTo(0,0,R,0),h.closePath(),h.clip()}if(h.fillStyle=P,h.fillRect(0,0,Math.max(1,m),Math.max(1,$)),h.font=`${q} ${N} ${V} ${w} ${f}px ${S}`,h.fillStyle=s.color||"#000000",h.textBaseline="top",h.textAlign="right","direction"in h)try{h.direction="rtl"}catch{}const j=Math.max(0,m-d);let I=i;T.forEach(A=>{const O=A.length?A:" ";h.fillText(O,j,I,y),I+=p});const W=n.createElement("img");let H;try{H=k.toDataURL("image/png")}catch(A){return yt("note canvas toDataURL failed",A),null}return W.src=H,W.alt=g,W.style.width=`${Math.max(1,m)}px`,W.style.height=`${Math.max(1,$)}px`,W.style.display="block",W.setAttribute("data-quote-note-image","true"),{image:W,canvas:k,totalHeight:$,width:m}}function $d(e,{pixelRatio:t=1}={}){if(!e||!Aa())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!Oi(a.textContent||""))return;let s;try{s=_d(a,{pixelRatio:t})}catch(r){yt("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function ds(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){hd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),d=o("reservations.quote.toast.retry","إعادة المحاولة"),l=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(Bt("export"),so()):(Bt("render"),qn=!1,Kt())};if(jr({message:i,duration:9e3,actionLabel:l?d:void 0,onAction:l?u:void 0,linkLabel:c,linkHref:ki}),X?.modal?.classList.contains("show")&&Bt("error",{message:i,actionLabel:l?d:void 0,onAction:l?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function us({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){yt("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){yt("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function Us(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function xr(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function wr(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function Pd(){const e=wr();return e||(yn||(yn=Us(rd).catch(t=>{throw yn=null,t}).then(()=>{const t=wr();if(!t)throw yn=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),yn)}async function Cd(){const e=xr();return e||(fn||(fn=Us(id).catch(t=>{throw fn=null,t}).then(()=>{const t=xr();if(!t)throw fn=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),fn)}async function Td(){if(window.html2pdf||await Us(sd),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}Jl(),Sd()}function x(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Nd(e="reservation"){return e==="project"?"QP":"Q"}function jd(e,t="reservation"){const n=Number(e),a=Nd(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function Ld(){const e=window.localStorage?.getItem?.(Ai),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function Qi(e="reservation"){const n=Ld()+1;return{sequence:n,quoteNumber:jd(n,e)}}function Bd(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(Ai,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function Gi(e="reservation"){return qr[e]||qr.reservation}function Fd(e="reservation"){try{const t=Gi(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function Dd(e,t="reservation"){try{const n=Gi(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function Rd(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function Md(e,t="reservation"){if(!e)return null;const n=ji(t),a=Li(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,d])=>{const l=i[c];if(l==null)return;const{ids:u,emptyExplicitly:f}=Rd(l);if(!u&&!f)return;const p=Array.isArray(u)?u.filter(m=>d.has(m)):[];(p.length>0||f)&&(r[c]=p)}),{version:1,sections:s,fields:r}}function Wi(e){if(!e)return;const t=e.context||"reservation",n=Md(e,t);n&&Dd(n,t)}function Xi(e){if(!e)return;const t=e.context||"reservation",n=Fd(t);if(!n)return;const a=ji(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=Ms(e.fields||Ia(t)),i=Li(t);Object.entries(n.fields).forEach(([c,d])=>{const l=i[c];if(!l)return;const u=Array.isArray(d)?d.filter(f=>l.has(f)):[];r[c]=new Set(u)}),e.fields=r}}function Ji(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function Yi(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(b(String(n)));if(Number.isFinite(a))return a}return 0}function zd(e={}){const t=[e.dailyTotal,e.daily_total,e.totalRate,e.total,e.total_wage];for(const n of t){if(n==null)continue;const a=parseFloat(b(String(n)));if(Number.isFinite(a))return a}return Yi(e)}function Hd(e){const t=Pn()||[],{technicians:n=[]}=ue(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const i=String(r.id),c=s.get(i)||{};s.set(i,{...c,...r})}),(e.technicians||[]).map(r=>s.get(String(r))).filter(Boolean)}function Od(e,t,n){const{projectLinked:a}=It(e,n),s=pa(e.start,e.end),{groups:r}=As(e),c=r.reduce((H,A)=>{const O=Array.isArray(A?.items)&&A.items.length?A.items[0]:{},R=Number(A?.count??A?.quantity??O?.qty??1)||1;let z=[O?.price,O?.unit_price,O?.unitPrice,A?.unitPrice].reduce((ee,oe)=>{if(Number.isFinite(ee)&&ee>0)return ee;const J=Number(oe);return Number.isFinite(J)?J:ee},NaN);if(!Number.isFinite(z)||z<=0){const ee=Number(A?.totalPrice??O?.total??O?.total_price);Number.isFinite(ee)&&R>0&&(z=Number((ee/R).toFixed(2)))}Number.isFinite(z)||(z=0),z=Ae(z);const ne=Ae(z);return H+ne*R},0)*s,d=t.reduce((H,A)=>H+Yi(A),0),l=t.reduce((H,A)=>H+zd(A),0),u=d*s,f=l*s,p=c+f,m=parseFloat(e.discount)||0,y=e.discountType==="amount"?m:p*(m/100),g=Math.max(0,p-y),v=a?!1:e.applyTax,k=Number(e.cost),h=Number.isFinite(k),q=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,N=q!=null?parseFloat(b(String(q).replace("%","").trim())):NaN,V=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let w=(V!=null?V===!0||V===1||V==="1"||String(V).toLowerCase()==="true":Number.isFinite(N)&&N>0)&&Number.isFinite(N)?Number(N):0;v&&w<=0&&(w=gt);let _=w>0?Math.max(0,g*(w/100)):0;_=Number(_.toFixed(2));const T=g+_;let D=v?T*.15:0;(!Number.isFinite(D)||D<0)&&(D=0),D=Number(D.toFixed(2));const $=T+D,F=Number.isFinite($)?Number($.toFixed(2)):0,Q=a?F:h?k:F,P=Math.max(0,c+f-y),j=Math.max(0,P-u),I={equipmentTotal:c,crewTotal:f,crewCostTotal:u,discountAmount:y,subtotalAfterDiscount:g,taxableAmount:T,taxAmount:D,finalTotal:Q,companySharePercent:w,companyShareAmount:_,netProfit:j},W={equipmentTotal:b(c.toFixed(2)),crewTotal:b(f.toFixed(2)),discountAmount:b(y.toFixed(2)),subtotalAfterDiscount:b(g.toFixed(2)),taxableAmount:b(T.toFixed(2)),taxAmount:b(D.toFixed(2)),finalTotal:b(Q.toFixed(2)),companySharePercent:b(w.toFixed(2)),companyShareAmount:b(_.toFixed(2)),netProfit:b(j.toFixed(2))};return{totals:I,totalsDisplay:W,rentalDays:s}}function nn(e){if(e==null||e==="")return null;const t=Number.parseFloat(b(String(e)));return Number.isFinite(t)?t:null}function Zi(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Vd(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=nn(e.amount??(n==="amount"?e.value:null)),s=nn(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=Zi(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function Ud(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(Vd).filter(Boolean);if(n.length>0)return n;const a=nn(e.paidPercent??e.paid_percent),s=nn(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Zi(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function Kd(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function Qd(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function Gd(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function Wd(e){const t=Number(e?.equipmentEstimate)||0,n=Gd(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const d=Math.max(0,a-c),l=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,f=l&&s&&u>0?u:0,p=f>0?Number((d*(f/100)).toFixed(2)):0,m=d+p;let y=s?m*Si:0;(!Number.isFinite(y)||y<0)&&(y=0),y=Number(y.toFixed(2));let g=s?Number(e?.totalWithTax):m;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((m+y).toFixed(2))):g=m,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:d,companyShareAmount:p,subtotal:m,applyTax:s,taxAmount:y,totalWithTax:g}}function Xd(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(b(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.technicians)?e.technicians:[],i=Es(t,a,s,!1,r,{start:e.start,end:e.end});if(Number.isFinite(i))return i;const c=Number(b(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function Jd(e,t){if(!e)return"—";const n=Ue(e);return t?`${n} - ${Ue(t)}`:n}function ie(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${b(a.toFixed(s))} ${t}`}function Ir(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${b(Number(e).toFixed(n))}%`}function Yd(e){if(!e?.start)return null;if(!e?.end)return 1;const t=pa(e.start,e.end);return Number.isFinite(t)?t:1}function Zd(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${b(String(Math.round(e)))} أيام`:"غير محدد"}function eu(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=ue(),i=e?.id!=null?s.find(B=>String(B.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:ie(0,t),expensesTotal:ie(0,t),reservationsTotal:ie(0,t),discountAmount:ie(0,t),taxAmount:ie(0,t),overallTotal:ie(0,t),paidAmount:ie(0,t),remainingAmount:ie(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:ie(0,t),remainingAmountDisplay:ie(0,t),paidPercentDisplay:Ir(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const d=i.clientId??i.customerId??i.client_id??i.customer_id??null,l=d!=null&&n.find(B=>String(B.id)===String(d))||null,u=l?.customerName??l?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),f=(i.clientCompany||l?.companyName||l?.company||"").trim(),p=l?.phone??l?.customerPhone??i.clientPhone??i.customerPhone??"",m=p?b(String(p).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),y=l?.email??i.clientEmail??i.customerEmail??"",g=y?String(y).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),v=i.projectCode||`PRJ-${b(String(i.id??""))}`,k=b(String(v)),h=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),q=Kd(i.type),N=i.start?Ue(i.start):"—",V=i.end?Ue(i.end):"—",S=Yd(i),w=S!=null?Zd(S):"غير محدد",_=Qd(i),T={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},D=o(`projects.status.${_}`,T[_]||_),$=i.id!=null?String(i.id):null,F=$?a.filter(B=>String(B.projectId)===$):[],P=F.map(B=>{const ae=B.reservationId||B.id||"",pe=B.status||B.state||"pending",ce=String(pe).toLowerCase(),ye=o(`reservations.status.${ce}`,ce),qe=Xd(B),je=B.start?new Date(B.start).getTime():0;return{reservationId:b(String(ae||"-")),status:ce,statusLabel:ye,total:qe,totalLabel:ie(qe,t),dateRange:Jd(B.start,B.end),startTimestamp:Number.isNaN(je)?0:je}}).sort((B,ae)=>ae.startTimestamp-B.startTimestamp).map(({startTimestamp:B,...ae})=>ae).reduce((B,ae)=>B+(Number(ae.total)||0),0),j=new Map;F.forEach(B=>{const ae=Array.isArray(B.items)?B.items:[],pe=pa(B.start,B.end),ce=B.reservationId||B.id||"";ae.forEach((ye,qe)=>{if(!ye)return;const je=ye.barcode||ye.code||ye.id||ye.desc||ye.description||`item-${qe}`,Ge=String(je||`item-${qe}`),Ze=j.get(Ge)||{description:ye.desc||ye.description||ye.name||ye.barcode||`#${b(String(qe+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},Qt=Number(ye.qty)||1,ln=Number(ye.price)||0;Ze.totalQuantity+=Qt,Ze.reservationIds.add(String(ce));const Gt=ln*Qt*Math.max(1,pe);Number.isFinite(Gt)&&(Ze.totalCost+=Gt),j.set(Ge,Ze)})});const I=Array.from(j.values()).map(B=>({description:B.description,totalQuantity:B.totalQuantity,reservationsCount:B.reservationIds.size,displayCost:ie(B.totalCost,t)})),W=new Map((r||[]).filter(Boolean).map(B=>[String(B.id),B])),H=new Map,A=B=>{if(!B)return;let ae=null;typeof B=="object"?ae=B.id??B.technicianId??B.technician_id??B.userId??B.user_id??null:(typeof B=="string"||typeof B=="number")&&(ae=B);const pe=ae!=null?String(ae):null,ce=pe&&W.has(pe)?W.get(pe):typeof B=="object"?B:null,ye=ce?.name||ce?.full_name||ce?.fullName||ce?.displayName||(typeof B=="string"?B:null),qe=ce?.role||ce?.title||null,je=ce?.phone||ce?.mobile||ce?.contact||null;if(!ye&&!pe)return;const Ge=pe||ye;H.has(Ge)||H.set(Ge,{id:pe,name:ye||"-",role:qe||null,phone:je||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(B=>A(B)),F.forEach(B=>{(Array.isArray(B.technicians)?B.technicians:[]).forEach(pe=>A(pe))});const O=Array.from(H.values()),R=Array.isArray(i.expenses)?i.expenses.map(B=>{const ae=Number(B?.amount)||0;return{label:B?.label||B?.name||"-",amount:ae,displayAmount:ie(ae,t),note:B?.note||B?.description||""}}):[],M=Wd(i),z=M.applyTax?Number(((M.subtotal+P)*Si).toFixed(2)):0,ne=Number((M.subtotal+P+z).toFixed(2)),ee=Ud(i),oe=nn(i.paidAmount??i.paid_amount)||0,J=nn(i.paidPercent??i.paid_percent)||0,re=xs({totalAmount:ne,paidAmount:oe,paidPercent:J,history:ee}),he=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",ve=ws({manualStatus:he,paidAmount:re.paidAmount,paidPercent:re.paidPercent,totalAmount:ne}),$e={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},U=o(`projects.paymentStatus.${ve}`,$e[ve]||ve),Z=Number(re.paidAmount||0),se=Number(re.paidPercent||0),fe=Math.max(0,Number((ne-Z).toFixed(2))),me={projectSubtotal:ie(M.subtotal,t),expensesTotal:ie(M.expensesTotal,t),reservationsTotal:ie(P,t),discountAmount:ie(M.discountAmount,t),taxAmount:ie(z,t),overallTotal:ie(ne,t),paidAmount:ie(Z,t),remainingAmount:ie(fe,t)},Ye={status:ve,statusLabel:U,paidAmount:Z,paidPercent:se,remainingAmount:fe,paidAmountDisplay:ie(Z,t),remainingAmountDisplay:ie(fe,t),paidPercentDisplay:Ir(se)},Y=(i.description||"").trim();return{project:i,customer:l,clientInfo:{name:u,company:f||"—",phone:m,email:g},projectInfo:{title:h,code:k,typeLabel:q,startDisplay:N,endDisplay:V,durationLabel:w,statusLabel:D},expenses:R,equipment:I,crew:O,totals:M,totalsDisplay:me,projectTotals:{combinedTaxAmount:z,overallTotal:ne,reservationsTotal:P,paidAmount:Z,paidPercent:se,remainingAmount:fe,paymentStatus:ve},paymentSummary:Ye,notes:Y,currencyLabel:t,projectStatus:_,projectStatusLabel:D,projectDurationDays:S,projectDurationLabel:w,paymentHistory:ee}}function tu({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:d={},currencyLabel:l="SR",sections:u,fieldSelections:f={},quoteNumber:p,quoteDate:m,terms:y=Me}){const g=Ms(f),v=(U,Z)=>zs(g,U,Z),k=U=>u?.has?.(U),h=`<div class="quote-placeholder">${x(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,q=(U,Z)=>`<div class="info-plain__item">
      <span class="info-plain__label">${x(U)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${x(Z)}</span>
    </div>`,N=(U,Z,{variant:se="inline"}={})=>se==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${x(U)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${x(Z)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${x(U)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${x(Z)}</span>
    </span>`,V=(U,Z)=>`<div class="payment-row">
      <span class="payment-row__label">${x(U)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${x(Z)}</span>
    </div>`,S=[];v("customerInfo","customerName")&&S.push(q(o("projects.details.client","العميل"),t.name||"-")),v("customerInfo","customerCompany")&&S.push(q(o("projects.details.company","شركة العميل"),t.company||"—")),v("customerInfo","customerPhone")&&S.push(q(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),v("customerInfo","customerEmail")&&S.push(q(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const w=k("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${x(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${S.length?`<div class="info-plain">${S.join("")}</div>`:h}
      </section>`:"",_=[];v("projectInfo","projectType")&&_.push(q(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),v("projectInfo","projectTitle")&&_.push(q(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),v("projectInfo","projectCode")&&_.push(q(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),v("projectInfo","projectStart")&&_.push(q(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),v("projectInfo","projectEnd")&&_.push(q(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),v("projectInfo","projectDuration")&&_.push(q(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),v("projectInfo","projectStatus")&&_.push(q(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const T=k("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${x(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${_.length?`<div class="info-plain">${_.join("")}</div>`:h}
      </section>`:"",D=Pi.filter(U=>v("projectCrew",U.id)),$=k("projectCrew")?D.length?`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${D.map(U=>`<th>${x(U.labelKey?o(U.labelKey,U.fallback):U.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((U,Z)=>`<tr>${D.map(se=>`<td>${se.render(U,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(D.length,1)}" class="empty">${x(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${h}
          </section>`:"",F=[];v("financialSummary","projectSubtotal")&&F.push(N(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${ie(0,l)}`)),v("financialSummary","expensesTotal")&&F.push(N(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||ie(0,l))),v("financialSummary","reservationsTotal")&&F.push(N(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||ie(0,l))),v("financialSummary","discountAmount")&&F.push(N(o("reservations.details.labels.discount","الخصم"),i.discountAmount||ie(0,l))),v("financialSummary","taxAmount")&&F.push(N(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||ie(0,l)));const Q=[];v("financialSummary","overallTotal")&&Q.push(N(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||ie(0,l),{variant:"final"})),v("financialSummary","paidAmount")&&Q.push(N(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||ie(0,l),{variant:"final"})),v("financialSummary","remainingAmount")&&Q.push(N(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||ie(0,l),{variant:"final"}));const P=k("financialSummary")?!F.length&&!Q.length?`<section class="quote-section quote-section--financial">${h}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${x(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${F.length?`<div class="totals-inline">${F.join("")}</div>`:""}
            ${Q.length?`<div class="totals-final">${Q.join("")}</div>`:""}
          </div>
        </section>`:"",j=Ci.filter(U=>v("projectExpenses",U.id)),I=k("projectExpenses")?j.length?`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${j.map(U=>`<th>${x(U.labelKey?o(U.labelKey,U.fallback):U.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((U,Z)=>`<tr>${j.map(se=>`<td>${se.render(U,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(j.length,1)}" class="empty">${x(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${h}
          </section>`:"",W=Ti.filter(U=>v("projectEquipment",U.id)),H=k("projectEquipment")?W.length?`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${W.map(U=>`<th>${x(U.labelKey?o(U.labelKey,U.fallback):U.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${r.length?r.map((U,Z)=>`<tr>${W.map(se=>`<td>${se.render(U,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(W.length,1)}" class="empty">${x(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${h}
          </section>`:"",A=(e?.description||"").trim()||"",O=k("projectNotes")?`<section class="quote-section">
        <h3>${x(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${x(A||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",R=[];v("payment","beneficiary")&&R.push(V(o("reservations.quote.labels.beneficiary","اسم المستفيد"),_e.beneficiaryName)),v("payment","bank")&&R.push(V(o("reservations.quote.labels.bank","اسم البنك"),_e.bankName)),v("payment","account")&&R.push(V(o("reservations.quote.labels.account","رقم الحساب"),b(_e.accountNumber))),v("payment","iban")&&R.push(V(o("reservations.quote.labels.iban","رقم الآيبان"),b(_e.iban)));const M=`<section class="quote-section">
      <div class="payment-block">
        <h3>${x(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${R.length?R.join(""):h}</div>
      </div>
      <p class="quote-approval-note">${x(_e.approvalNote)}</p>
    </section>`,z=Array.isArray(y)&&y.length?y:Me,ne=`<footer class="quote-footer">
        <h4>${x(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${z.map(U=>`<li>${x(U)}</li>`).join("")}</ul>
      </footer>`,ee=[],oe=[];if(T&&oe.push({key:"project",html:T}),w&&oe.push({key:"customer",html:w}),oe.length>1){const U=oe.find(fe=>fe.key==="project"),Z=oe.find(fe=>fe.key==="customer"),se=[];U?.html&&se.push(U.html),Z?.html&&se.push(Z.html),ee.push(Se(`<div class="quote-section-row quote-section-row--primary">${se.join("")}</div>`,{blockType:"group"}))}else oe.length===1&&ee.push(Se(oe[0].html));const J=[];$&&J.push(Se($,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),I&&J.push(Se(I,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),H&&J.push(Se(H,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const re=[];P&&re.push(Se(P,{blockType:"summary"})),O&&re.push(Se(O));const he=[Se(M,{blockType:"payment"}),Se(ne,{blockType:"footer"})],ve=[...ra(ee,"projects.quote.placeholder.primary"),...J,...ra(re,"projects.quote.placeholder.summary"),...he],$e=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${x(_e.logoUrl)}" alt="${x(_e.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${x(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${x(_e.companyName)}</p>
        <p class="quote-company-cr">${x(o("reservations.quote.labels.cr","السجل التجاري"))}: ${x(_e.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${x(o("reservations.details.labels.reservationId","رقم العرض"))}</span>
          <strong>${x(p)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${x(o("projects.quote.labels.date","التاريخ"))}</span>
          <strong>${x(m)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Fi}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${$e}
          ${ve.join("")}
        </div>
      </div>
    </div>
  `}function eo(e){if(e?.context==="project")return tu(e);const{reservation:t,customer:n,project:a,technicians:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:d,sections:l,fieldSelections:u={},quoteNumber:f,quoteDate:p,terms:m=Me}=e,y=b(String(t?.reservationId??t?.id??"")),g=t.start?b(Ue(t.start)):"-",v=t.end?b(Ue(t.end)):"-",k=n?.customerName||n?.full_name||n?.name||"-",h=n?.phone||"-",q=n?.email||"-",N=n?.company||n?.company_name||"-",V=b(h),S=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),w=a?.code||a?.projectCode||"",_=b(String(c)),T=t?.notes||"",D=Array.isArray(m)&&m.length?m:Me,$=Ms(u),F=(K,Ee)=>zs($,K,Ee),Q=K=>l?.has?.(K),P=`<div class="quote-placeholder">${x(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,j=(K,Ee)=>`<div class="info-plain__item">${x(K)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${x(Ee)}</strong></div>`,I=(K,Ee,{variant:et="inline"}={})=>et==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${x(K)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${x(Ee)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${x(K)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${x(Ee)}</span>
    </span>`,W=(K,Ee)=>`<div class="payment-row">
      <span class="payment-row__label">${x(K)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${x(Ee)}</span>
    </div>`,H=[];F("customerInfo","customerName")&&H.push(j(o("reservations.details.labels.customer","العميل"),k)),F("customerInfo","customerCompany")&&H.push(j(o("reservations.details.labels.company","الشركة"),N)),F("customerInfo","customerPhone")&&H.push(j(o("reservations.details.labels.phone","الهاتف"),V)),F("customerInfo","customerEmail")&&H.push(j(o("reservations.details.labels.email","البريد"),q));const A=Q("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${x(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${H.length?`<div class="info-plain">${H.join("")}</div>`:P}
      </section>`:"",O=[];F("reservationInfo","reservationId")&&O.push(j(o("reservations.details.labels.reservationId","رقم الحجز"),y||"-")),F("reservationInfo","reservationStart")&&O.push(j(o("reservations.details.labels.start","بداية الحجز"),g)),F("reservationInfo","reservationEnd")&&O.push(j(o("reservations.details.labels.end","نهاية الحجز"),v)),F("reservationInfo","reservationDuration")&&O.push(j(o("reservations.details.labels.duration","عدد الأيام"),_));const R=Q("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${x(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${O.length?`<div class="info-plain">${O.join("")}</div>`:P}
      </section>`:"",M=[];F("projectInfo","projectTitle")&&M.push(j(o("reservations.details.labels.project","المشروع"),S)),F("projectInfo","projectCode")&&M.push(j(o("reservations.details.labels.code","الرمز"),w||"-"));const z=Q("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${x(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${M.length?`<div class="info-plain">${M.join("")}</div>`:P}
      </section>`:"",ne=[];F("financialSummary","equipmentTotal")&&ne.push(I(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${d}`)),F("financialSummary","crewTotal")&&ne.push(I(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${d}`)),F("financialSummary","discountAmount")&&ne.push(I(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${d}`)),F("financialSummary","taxAmount")&&ne.push(I(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${d}`));const ee=F("financialSummary","finalTotal"),oe=[];ee&&oe.push(I(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${d}`,{variant:"final"}));const J=oe.length?`<div class="totals-final">${oe.join("")}</div>`:"",re=Q("financialSummary")?!ne.length&&!ee?`<section class="quote-section quote-section--financial">${P}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${x(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${ne.length?`<div class="totals-inline">${ne.join("")}</div>`:""}
            ${J}
          </div>
        </section>`:"",{groups:he}=As(t),ve=he.map(K=>{const Ee=Number(K?.count??K?.quantity??1)||1,et=Number(K?.unitPrice);let lt=Number.isFinite(et)?et:0;if(!lt||lt<=0){const Wt=Number(K?.totalPrice);Number.isFinite(Wt)&&Ee>0&&(lt=Number((Wt/Ee).toFixed(2)))}Number.isFinite(lt)||(lt=0);const Ln=K?.type==="package"||Array.isArray(K?.items)&&K.items.some(Wt=>Wt?.type==="package"),Bn=Array.isArray(K?.barcodes)&&K.barcodes.length?K.barcodes[0]:Array.isArray(K?.items)&&K.items.length?K.items[0]?.barcode:null,Pa=K?.package_code??K?.packageCode??K?.barcode??(Array.isArray(K?.items)&&K.items.length?K.items[0]?.package_code??K.items[0]?.packageCode:null),Ca=Ln?Pa??Bn??"":K?.barcode??Bn??"";let dn=Number.isFinite(Number(K?.totalPrice))?Number(K.totalPrice):Number((lt*Ee).toFixed(2));return dn=Ae(dn),{...K,isPackage:Ln,desc:K?.description,barcode:Ca,qty:Ee,price:lt,totalPrice:dn}}),$e=_i.filter(K=>F("items",K.id)),U=$e.length>0,Z=U?$e.map(K=>`<th>${x(K.labelKey?o(K.labelKey,K.fallback):K.fallback)}</th>`).join(""):"",fe=ve.length>0?ve.map((K,Ee)=>`<tr>${$e.map(et=>`<td>${et.render(K,Ee)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max($e.length,1)}" class="empty">${x(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,me=Q("items")?U?`<section class="quote-section quote-section--table">
            <h3>${x(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Z}</tr>
              </thead>
              <tbody>${fe}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(o("reservations.details.items.title","المعدات"))}</h3>
            ${P}
          </section>`:"",Ye=$i.filter(K=>F("crew",K.id)),Y=Ye.length>0,be=Y?Ye.map(K=>`<th>${x(K.labelKey?o(K.labelKey,K.fallback):K.fallback)}</th>`).join(""):"",B=s.length?s.map((K,Ee)=>`<tr>${Ye.map(et=>`<td>${et.render(K,Ee)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Ye.length,1)}" class="empty">${x(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,ae=Q("crew")?Y?`<section class="quote-section quote-section--table">
            <h3>${x(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${be}</tr>
              </thead>
              <tbody>${B}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${P}
          </section>`:"",pe=Q("notes")?`<section class="quote-section">
        <h3>${x(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${x(T||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",ce=[];F("payment","beneficiary")&&ce.push(W(o("reservations.quote.labels.beneficiary","اسم المستفيد"),_e.beneficiaryName)),F("payment","bank")&&ce.push(W(o("reservations.quote.labels.bank","اسم البنك"),_e.bankName)),F("payment","account")&&ce.push(W(o("reservations.quote.labels.account","رقم الحساب"),b(_e.accountNumber))),F("payment","iban")&&ce.push(W(o("reservations.quote.labels.iban","رقم الآيبان"),b(_e.iban)));const ye=`<section class="quote-section">
      <div class="payment-block">
        <h3>${x(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${ce.length?ce.join(""):P}</div>
      </div>
      <p class="quote-approval-note">${x(_e.approvalNote)}</p>
    </section>`,qe=`<footer class="quote-footer">
        <h4>${x(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${D.map(K=>`<li>${x(K)}</li>`).join("")}</ul>
      </footer>`,je=[];A&&R?je.push(Se(`<div class="quote-section-row">${A}${R}</div>`,{blockType:"group"})):(R&&je.push(Se(R)),A&&je.push(Se(A))),z&&je.push(Se(z));const Ge=[];me&&Ge.push(Se(me,{blockType:"table",extraAttributes:'data-table-id="items"'})),ae&&Ge.push(Se(ae,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const Ze=[];re&&Ze.push(Se(re,{blockType:"summary"})),pe&&Ze.push(Se(pe));const Qt=[Se(ye,{blockType:"payment"}),Se(qe,{blockType:"footer"})],ln=[...ra(je,"reservations.quote.placeholder.page1"),...Ge,...ra(Ze,"reservations.quote.placeholder.page2"),...Qt],Gt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${x(_e.logoUrl)}" alt="${x(_e.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${x(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${x(_e.companyName)}</p>
        <p class="quote-company-cr">${x(o("reservations.quote.labels.cr","السجل التجاري"))}: ${x(_e.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${x(f)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${x(p)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Fi}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Gt}
          ${ln.join("")}
        </div>
      </div>
    </div>
  `}function nu(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function An(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>nu(c)),i=[s,...r].map(c=>c.catch(d=>(yt("asset load failed",d),pd(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function to(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await Ki(r),await An(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let d=null,l=null;const u=S=>{S.style.margin="0 auto",S.style.breakInside="avoid",S.style.pageBreakInside="avoid",S.style.pageBreakAfter="auto",S.style.breakAfter="auto"},f=()=>{const S=a.createElement("div"),w=s.childElementCount===0;if(S.className="quote-page",S.dataset.pageIndex=String(s.childElementCount),w){S.classList.add("quote-page--primary");const T=i.cloneNode(!0);T.removeAttribute("data-quote-header-template"),S.appendChild(T)}else S.classList.add("quote-page--continuation");const _=a.createElement("main");_.className="quote-body",S.appendChild(_),s.appendChild(S),u(S),d=S,l=_},p=()=>{(!d||!l||!l.isConnected)&&f()},m=()=>{if(!d||!l||l.childElementCount>0)return;const S=d;d=null,l=null,S.parentNode&&S.parentNode.removeChild(S)},y=()=>{d=null,l=null},g=()=>d?d.scrollHeight-d.clientHeight>cd:!1,v=(S,{allowOverflow:w=!1}={})=>(p(),l.appendChild(S),g()&&!w?(l.removeChild(S),m(),!1):!0),k=S=>{const w=S.cloneNode(!0);w.removeAttribute?.("data-quote-block"),w.removeAttribute?.("data-block-type"),w.removeAttribute?.("data-table-id"),!v(w)&&(y(),!v(w)&&v(w,{allowOverflow:!0}))},h=S=>{const w=S.querySelector("table");if(!w){k(S);return}const _=S.querySelector("h3"),T=w.querySelector("thead"),D=Array.from(w.querySelectorAll("tbody tr"));if(!D.length){k(S);return}let $=null,F=0;const Q=(j=!1)=>{const I=S.cloneNode(!1);I.removeAttribute("data-quote-block"),I.removeAttribute("data-block-type"),I.removeAttribute("data-table-id"),I.classList.add("quote-section--table-fragment"),j&&I.classList.add("quote-section--table-fragment--continued");const W=_?_.cloneNode(!0):null;W&&I.appendChild(W);const H=w.cloneNode(!1);H.classList.add("quote-table--fragment"),T&&H.appendChild(T.cloneNode(!0));const A=a.createElement("tbody");return H.appendChild(A),I.appendChild(H),{section:I,body:A}},P=(j=!1)=>$||($=Q(j),v($.section)||(y(),v($.section)||v($.section,{allowOverflow:!0})),$);D.forEach(j=>{P(F>0);const I=j.cloneNode(!0);if($.body.appendChild(I),g()&&($.body.removeChild(I),$.body.childElementCount||(l.removeChild($.section),$=null,m()),y(),$=null,P(F>0),$.body.appendChild(I),g())){$.section.classList.add("quote-section--table-fragment--overflow"),F+=1;return}F+=1}),$=null};if(!c.length)return;c.forEach(S=>{S.getAttribute("data-block-type")==="table"?h(S):k(S)});const q=Array.from(s.children),N=[];if(q.forEach((S,w)=>{const _=S.querySelector(".quote-body");if(w!==0&&(!_||_.childElementCount===0)){S.remove();return}N.push(S)}),!n){const S=a.defaultView||window,w=Math.min(3,Math.max(1,S.devicePixelRatio||1)),_=Aa()?Math.min(2,w):w;N.forEach(T=>$d(T,{pixelRatio:_}))}N.forEach((S,w)=>{const _=w===0;S.style.pageBreakAfter="auto",S.style.breakAfter="auto",S.style.pageBreakBefore=_?"auto":"always",S.style.breakBefore=_?"auto":"page",n?S.style.boxShadow="":S.style.boxShadow="none"});const V=N[N.length-1]||null;d=V,l=V?.querySelector(".quote-body")||null,await An(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function Ks(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function au(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([Cd(),Pd()]),c=e.ownerDocument||document,d=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,d,c?.documentElement?.getAttribute?.("dir")].some(S=>typeof S=="string"&&S.toLowerCase().startsWith("rtl")),f=typeof window<"u"&&window.devicePixelRatio||1,p=Vs(),m=Hi(),y=Aa();let g;y?g=1.5:m?g=Math.min(1.7,Math.max(1.2,f*1.1)):p?g=Math.min(1.8,Math.max(1.25,f*1.2)):g=Math.min(2,Math.max(1.6,f*1.4));const v=y||m?.9:p?.92:.95,k=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),h={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let q=0;const N=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let S=0;S<s.length;S+=1){const w=s[S];await Ki(w),await An(w);const _=w.ownerDocument||document,T=_.createElement("div");Object.assign(T.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const D=w.cloneNode(!0);D.style.width=`${Un}px`,D.style.maxWidth=`${Un}px`,D.style.minWidth=`${Un}px`,D.style.height=`${Kn}px`,D.style.maxHeight=`${Kn}px`,D.style.minHeight=`${Kn}px`,D.style.position="relative",D.style.background="#ffffff",Ks(D),T.appendChild(D),_.body.appendChild(T);let $;try{await An(D),$=await i(D,{...h,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(A){throw ds(A,"pageCapture",{toastMessage:N}),A}finally{T.parentNode?.removeChild(T)}if(!$)continue;const F=$.width||1,P=($.height||1)/F;let j=os,I=j*P,W=0;if(I>Vn){const A=Vn/I;I=Vn,j=j*A,W=Math.max(0,(os-j)/2)}const H=$.toDataURL("image/jpeg",v);q>0&&k.addPage(),k.addImage(H,"JPEG",W,0,j,I,`page-${q+1}`,"FAST"),q+=1,await new Promise(A=>window.requestAnimationFrame(A))}}catch(S){throw us({safariWindowRef:n,mobileWindowRef:a}),S}if(q===0)throw us({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(m||y){const S=k.output("blob");if(y){const w=URL.createObjectURL(S);Sn();try{window.location.assign(w)}catch(_){yt("mobile safari blob navigation failed",_)}finally{setTimeout(()=>URL.revokeObjectURL(w),6e4)}}else{const w=URL.createObjectURL(S),_=()=>m&&n&&!n.closed?n:a&&!a.closed?a:null,T=($,F)=>{if(Sn(),!$){window.location.assign(F);return}try{$.location.replace(F),$.focus?.()}catch(Q){yt("direct blob navigation failed",Q);try{$.document.open(),$.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${x(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${F}" title="PDF preview"></iframe></body></html>`),$.document.close()}catch(P){yt("iframe blob delivery failed",P),window.location.assign(F)}}},D=_();T(D,w),setTimeout(()=>URL.revokeObjectURL(w),6e4)}}else{Sn();const S=k.output("bloburl"),w=document.createElement("a");w.href=S,w.download=t,w.rel="noopener",w.style.display="none",document.body.appendChild(w),w.click(),setTimeout(()=>{URL.revokeObjectURL(S),w.remove()},2e3)}}function Kt(){if(!L||!X)return;const{previewFrame:e}=X;if(!e)return;const t=L.context||"reservation",n=eo({context:t,reservation:L.reservation,customer:L.customer,project:L.project,technicians:L.technicians,totals:L.totals,totalsDisplay:L.totalsDisplay,rentalDays:L.rentalDays,currencyLabel:L.currencyLabel,sections:L.sections,fieldSelections:L.fields,quoteNumber:L.quoteNumber,quoteDate:L.quoteDateLabel,terms:L.terms,projectCrew:L.projectCrew,projectExpenses:L.projectExpenses,projectEquipment:L.projectEquipment,projectInfo:L.projectInfo,clientInfo:L.clientInfo,paymentSummary:L.paymentSummary,projectTotals:L.projectTotals});Bt("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&(Ii(r),xi(r,s),wi(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await to(i,{context:"preview"}),Ks(i))}catch(m){console.error("[reservations/pdf] failed to layout preview document",m)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),d=a?.querySelector(".quote-preview-pages"),l=Un;let u=18;if(d&&a?.defaultView){const m=a.defaultView.getComputedStyle(d),y=parseFloat(m.rowGap||m.gap||`${u}`);Number.isFinite(y)&&y>=0&&(u=y)}const f=Kn,p=c.length?c.length*f+Math.max(0,(c.length-1)*u):f;if(e.dataset.baseWidth=String(l),e.dataset.baseHeight=String(p),e.style.width=`${l}px`,e.style.minWidth=`${l}px`,e.style.height=`${p}px`,e.style.minHeight=`${p}px`,X?.previewFrameWrapper&&!X?.userAdjustedZoom){const m=X.previewFrameWrapper.clientWidth-24;m>0&&m<l?at=Math.max(m/l,.3):at=1}ao(at)}finally{Sn()}},{once:!0})}function su(e){if(!L)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?L.sections.add(n):L.sections.delete(n),Wi(L),no(),Kt())}function ru(e){if(!L)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=L.context||"reservation",r=L.fields||(L.fields=Ia(s)),i=fd(r,n);t.checked?i.add(a):i.delete(a),Wi(L),Kt()}function iu(e){if(!L)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(Os(L,n),L.sectionExpansions[n]=t.open)}function no(){if(!X?.toggles||!L)return;const{toggles:e}=X,t=L.fields||{},n=L.context||"reservation";Os(L);const a=wa(n),s=Ni(n),r=a.map(({id:i,labelKey:c,fallback:d})=>{const l=o(c,d),u=L.sections.has(i),f=s[i]||[],p=yd(L,i),m=f.length?`<div class="quote-toggle-sublist">
          ${f.map(y=>{const g=zs(t,i,y.id),v=u?"":"disabled",k=y.labelKey?o(y.labelKey,y.fallback):y.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${y.id}" ${g?"checked":""} ${v}>
                <span>${x(k)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${i}" ${p?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${i}" ${u?"checked":""}>
            <span>${x(l)}</span>
          </label>
          ${f.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${m}
      </details>
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",su)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",ru)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",iu)})}function ou(){if(X?.modal)return X;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${x(o("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${x(o("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
              <div class="quote-terms-editor" data-quote-terms-editor>
                <label class="quote-terms-editor__label" for="quote-terms-input">${x(o("reservations.quote.termsEditor.title","الشروط العامة (قابلة للتعديل)"))}</label>
                <textarea id="quote-terms-input" class="quote-terms-editor__textarea" rows="6" data-quote-terms-input placeholder="${x(o("reservations.quote.termsEditor.placeholder","اكتب كل شرط في سطر مستقل"))}"></textarea>
                <button type="button" class="quote-terms-reset" data-quote-terms-reset>${x(o("reservations.quote.termsEditor.reset","استعادة الشروط الافتراضية"))}</button>
              </div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${x(o("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${x(o("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),r=e.querySelector("[data-quote-terms-reset]"),i=e.querySelector("[data-quote-download]"),c=e.querySelector(".modal-header"),d=c?.querySelector(".btn-close"),l=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",c&&c.insertBefore(u,d||null);const f=document.createElement("iframe");f.className="quote-preview-frame",f.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),f.setAttribute("loading","lazy"),f.setAttribute("frameborder","0");const p=document.createElement("div");p.className="quote-preview-zoom-controls",p.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${x(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${x(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${x(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(f),n.innerHTML="";const y=document.createElement("div");y.className="quote-preview-scroll",y.appendChild(m),n.appendChild(y);const g=document.createElement("div");g.className="quote-preview-status",g.setAttribute("role","status"),g.setAttribute("aria-live","polite"),g.hidden=!0,g.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${x(Bi("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(p),i?.addEventListener("click",async()=>{if(L){i.disabled=!0;try{await so()}finally{i.disabled=!1}}});const v=()=>{cs()||ls(e)};l.forEach(N=>{N?.addEventListener("click",v)}),d&&!l.includes(d)&&d.addEventListener("click",v),e.addEventListener("click",N=>{cs()||N.target===e&&ls(e)}),X={modal:e,toggles:t,preview:n,previewScroll:y,previewFrameWrapper:m,zoomControls:p,zoomValue:p.querySelector("[data-zoom-value]"),previewFrame:f,meta:a,downloadBtn:i,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const k=p.querySelector("[data-zoom-out]"),h=p.querySelector("[data-zoom-in]"),q=p.querySelector("[data-zoom-reset]");return k?.addEventListener("click",()=>Ar(-.1)),h?.addEventListener("click",()=>Ar(.1)),q?.addEventListener("click",()=>ia(1,{markManual:!0})),s&&s.addEventListener("input",lu),r&&r.addEventListener("click",du),ia(at),X}function ia(e,{silent:t=!1,markManual:n=!1}={}){at=Math.min(Math.max(e,.25),2.2),n&&X&&(X.userAdjustedZoom=!0),ao(at),!t&&X?.zoomValue&&(X.zoomValue.textContent=`${Math.round(at*100)}%`)}function Ar(e){ia(at+e,{markManual:!0})}function ao(e){if(!X?.previewFrame||!X.previewFrameWrapper)return;const t=X.previewFrame,n=X.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",Vs()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function cu(){if(!X?.meta||!L)return;const{meta:e}=X;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${x(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${x(L.quoteNumber)}</strong></div>
      <div><span>${x(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${x(L.quoteDateLabel)}</strong></div>
    </div>
  `}function Qs(){if(!X?.termsInput)return;const e=(L?.terms&&L.terms.length?L.terms:Me).join(`
`);X.termsInput.value!==e&&(X.termsInput.value=e)}function lu(e){if(!L)return;const t=ss(e?.target?.value??"");if(t.length){L.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{L.terms=[...Me],Qs();const n=Me.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}Kt()}function du(e){if(e?.preventDefault?.(),!L)return;L.terms=[...Me];const t=document.getElementById("reservation-terms");t&&(t.value=Me.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=Me.join(`
`)),Qs(),Kt()}async function so(){if(!L)return;Bt("export");const t=!Vs()&&Hi(),n=Aa(),a=null,s=!n&&t?window.open("","_blank"):null;(d=>{if(d)try{d.document.open(),d.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${x(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${x(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${x(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),d.document.close()}catch(l){yt("failed to prime download window",l)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await Td(),za("html2pdf ensured");const d=L.context||"reservation",l=eo({context:d,reservation:L.reservation,customer:L.customer,project:L.project,technicians:L.technicians,totals:L.totals,totalsDisplay:L.totalsDisplay,rentalDays:L.rentalDays,currencyLabel:L.currencyLabel,sections:L.sections,fieldSelections:L.fields,quoteNumber:L.quoteNumber,quoteDate:L.quoteDateLabel,terms:L.terms,projectCrew:L.projectCrew,projectExpenses:L.projectExpenses,projectEquipment:L.projectEquipment,projectInfo:L.projectInfo,clientInfo:L.clientInfo,paymentSummary:L.paymentSummary,projectTotals:L.projectTotals});i=document.createElement("div"),i.innerHTML=l,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),Ii(i),xi(i),wi(i),za("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await to(u,{context:"export"}),await An(u),Ks(u),za("layout complete for export document")}catch(p){ds(p,"layoutQuoteDocument",{suppressToast:!0})}}const f=`quotation-${L.quoteNumber}.pdf`;await au(u,{filename:f,safariWindowRef:s,mobileWindowRef:a}),L.sequenceCommitted||(Bd(L.quoteSequence),L.sequenceCommitted=!0)}catch(d){us({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,ds(d,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),Sn()}}function ro(){const e=ou();e?.modal&&(qn=!1,at=1,X&&(X.userAdjustedZoom=!1),ia(at,{silent:!0}),no(),cu(),Qs(),Kt(),md(e.modal))}async function uu({reservation:e,customer:t,project:n}){if(!e){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=Hd(e),{totalsDisplay:s,totals:r,rentalDays:i}=Od(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:d,quoteNumber:l}=Qi("reservation"),u=new Date,f=ed();L={context:"reservation",reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(wa("reservation").filter(p=>p.defaultSelected).map(p=>p.id)),sectionExpansions:Hs("reservation"),fields:Ia("reservation"),terms:f,quoteSequence:d,quoteNumber:l,quoteDate:u,quoteDateLabel:Ji(u),sequenceCommitted:!1},Xi(L),ro()}async function mm({project:e}){if(!e){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=eu(e),{project:n}=t;if(!n){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=Qi("project"),r=new Date,i=[...Zl];L={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(wa("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:Hs("project"),fields:Ia("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:Ji(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},Xi(L),ro()}function mu({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=Pn(),{reservations:r=[],customers:i=[],technicians:c=[],projects:d=[]}=ue(),l=r.map(h=>{const q=Va(h);return{...q,id:h.id??q.id,reservationId:h.reservationId??h.reservation_id??q.reservationId,reservationCode:h.reservationCode??h.reservation_code??q.reservationCode}}),u=l,f=Array.isArray(s)?s:c||[],p=new Map((d||[]).map(h=>[String(h.id),h])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!u||u.length===0){m.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const y=t||Ml(),g=new Map(i.map(h=>[String(h.id),h])),v=new Map(f.map(h=>[String(h.id),h])),k=Vl({reservations:l,filters:y,customersMap:g,techniciansMap:v,projectsMap:p});if(k.length===0){m.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${Ul({entries:k,customersMap:g,techniciansMap:v,projectsMap:p})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(h=>{const q=Number(h.dataset.reservationIndex);Number.isNaN(q)||h.addEventListener("click",()=>{typeof n=="function"&&n(q)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(h=>{const q=Number(h.dataset.reservationIndex);Number.isNaN(q)||h.addEventListener("click",N=>{N.stopPropagation(),typeof a=="function"&&a(q,N)})})}function pu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=ue(),c=s.map(q=>{const N=Va(q);return{...N,id:q.id??N.id,reservationId:q.reservationId??q.reservation_id??N.reservationId,reservationCode:q.reservationCode??q.reservation_code??N.reservationCode}}),d=s[e];if(!d)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const l=c[e]??Va(d),u=r.find(q=>String(q.id)===String(d.customerId)),f=d.projectId?i.find(q=>String(q.id)===String(d.projectId)):null,p=document.getElementById("reservation-details-body");if(p){const q=Pn()||[];p.innerHTML=Kl(l,u,q,e,f)}const m=document.getElementById("reservationDetailsModal"),y=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},g=document.getElementById("reservation-details-edit-btn");g&&(g.onclick=()=>{y(),typeof t=="function"&&t(e,{reservation:d,customer:u,getEditContext:a})});const v=document.getElementById("reservation-details-delete-btn");v&&(v.onclick=()=>{y(),typeof n=="function"&&n(e,{reservation:d,customer:u})});const k=p?.querySelector('[data-action="open-project"]');k&&f&&k.addEventListener("click",()=>{y();const q=f?.id!=null?String(f.id):"",N=q?`projects.html?project=${encodeURIComponent(q)}`:"projects.html";window.location.href=N});const h=document.getElementById("reservation-details-export-btn");return h&&(h.onclick=async q=>{q?.preventDefault?.(),q?.stopPropagation?.(),h.blur();try{await uu({reservation:d,customer:u,project:f})}catch(N){console.error("❌ [reservations] export to PDF failed",N),E(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}function io(){const e=()=>{Tn(),Fe(),Pn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let kr=!1,_r=null;function fu(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function pm(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=fu(n);if(!a&&kr&&Lt().length>0&&s===_r)return Lt();try{const r=await Hr(n||{});return kr=!0,_r=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return Lt()}}async function yu(e,{onAfterChange:t}={}){if(!zt())return $n(),!1;const a=Lt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await Ac(s),io(),t?.({type:"deleted",reservation:a}),E(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=ma(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return E(i,"error"),!1}}async function gu(e,{onAfterChange:t}={}){const a=Lt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=It(a);if(r)return E(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await kc(s);return io(),t?.({type:"confirmed",reservation:i}),E(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=ma(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return E(c,"error"),!1}}function cn(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:xn(e,n),end:xn(t,a)}}function oa(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Gs(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function oo(){const{container:e,select:t,hint:n,addButton:a}=Gs();if(!t)return;const s=t.value,r=Lr(),i=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,d=r.map(u=>{const f=Number.isFinite(Number(u.price))?Number(u.price):0,p=b(f.toFixed(2)),m=`${u.name} — ${p} ${i}`;return`<option value="${oa(u.id)}">${oa(m)}</option>`}).join("");t.innerHTML=`${c}${d}`;const l=r.length>0;t.disabled=!l,a&&(a.disabled=!l),e&&(e.hidden=!l,e.setAttribute("aria-hidden",l?"false":"true")),n&&(l?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),l&&s&&r.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function bu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=kt(),{start:r,end:i}=cn(),{reservations:c=[]}=ue(),d=a!=null&&c[a]||null,l=d?.id??d?.reservationId??null,u=yi(n,{existingItems:s,start:r,end:i,ignoreReservationId:l});if(!u.success)return t||E(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const f=[...s,u.package];return _t(a,f),At(f),Qe(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function $r(){const{select:e}=Gs();if(!e)return;const t=e.value||"";bu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function hu(){const{addButton:e,select:t}=Gs();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{$r()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),$r())}),t.dataset.listenerAttached="true"),oo()}function At(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,Cr(t);return}const d=an(e);t.innerHTML=d.map(l=>{const u=l.items[0]||{},f=Ot(u)||l.image,p=f?`<img src="${f}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=l.items.some($=>$?.type==="package"),y=b(String(l.count)),g=ut(l.unitPrice),v=Number.isFinite(g)?Ae(g):0,k=ut(l.totalPrice),h=Number.isFinite(k)?k:v*(Number.isFinite(l.count)?l.count:1),q=Ae(h),N=`${b(v.toFixed(2))} ${a}`,V=`${b(q.toFixed(2))} ${a}`,S=l.barcodes.map($=>b(String($||""))).filter(Boolean),w=S.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${S.map($=>`<li>${$}</li>`).join("")}
            </ul>
          </details>`:"";let _="";if(m){const $=new Map,F=P=>{const j=Number.parseFloat(b(String(P??"")).replace(/[^0-9.]/g,""));return!Number.isFinite(j)||j<=0||j>99?1:Math.round(j)},Q=[];if(Array.isArray(l.packageItems)&&l.packageItems.length&&Q.push(...l.packageItems),l.items.forEach(P=>{Array.isArray(P?.packageItems)&&Q.push(...P.packageItems)}),Q.forEach(P=>{if(!P)return;const j=te(P.barcode||P.normalizedBarcode||P.desc||Math.random());if(!j)return;const I=$.get(j),W=F(P.qtyPerPackage??P.perPackageQty??P.quantityPerPackage??P.qty??P.quantity??1),H=Math.max(1,Math.min(W,99));if(I){I.qty=H;return}$.set(j,{desc:P.desc||P.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:H,barcode:P.barcode??P.normalizedBarcode??""})}),$.size){const P=Array.from($.values()).map(j=>{const I=b(String(j.qty>0?Math.min(j.qty,99):1)),W=oa(j.desc||""),H=j.barcode?` <span class="reservation-package-items__barcode">(${oa(b(String(j.barcode)))})</span>`:"";return`<li>${W}${H} × ${I}</li>`}).join("");_=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${P}
              </ul>
            </details>
          `}}const T=m?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",D=m?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${l.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${p}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${l.description||"-"}</div>
                ${m?`${_||""}${w||""}`:w}
              </div>
            </div>
          </td>
          <td>
            <div class="${T}" data-group-key="${l.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${l.key}" aria-label="${i}"${D}>−</button>
              <span class="reservation-qty-value">${y}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${l.key}" aria-label="${r}"${D}>+</button>
            </div>
          </td>
          <td>${N}</td>
          <td>${V}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${l.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),Cr(t)}function vu(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function ka(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=_a();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,Pr();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${b(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${b(Number(s.percentage).toFixed(2))}%`:"—",d=s?.recordedAt?b(Ue(s.recordedAt)):"—",l=vu(s?.type),u=s?.note?b(s.note):"";return`
      <tr>
        <td>${l}</td>
        <td>${i}</td>
        <td>${c}</td>
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
  `,Pr()}function qu(){if(kn()){E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=uo(e);let a=mo(t);if(!Number.isFinite(a)||a<=0){E(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=Ua.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,d=o("reservations.create.summary.currency","SR");let l=null,u=null;if(n==="percent"){const p=Math.max(0,100-i);if(p<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,p);if(m!==a){const y=b(m.toFixed(2));E(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",y)),a=m}u=Number(a.toFixed(2)),r>0&&(l=a/100*r)}else{const p=Math.max(0,r-c);if(p<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,p);if(m!==a){const y=`${b(m.toFixed(2))} ${d}`;E(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",y)),a=m}l=Number(a.toFixed(2)),r>0&&(u=l/r*100)}l!=null&&(l=Number(l.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const f={type:n,value:a,amount:l,percentage:u,recordedAt:new Date().toISOString()};Pu(f),Ws(_a()),ka(),Qe(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),E(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function Pr(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(kn()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}qu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(kn()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(Cu(s),Ws(_a()),ka(),Qe(),E(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function Su(e){const{index:t,items:n}=kt(),s=an(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,d)=>d!==r);_t(t,i),At(i),Qe()}function Eu(e){const{index:t,items:n}=kt(),a=n.filter(s=>ua(s)!==e);a.length!==n.length&&(_t(t,a),At(a),Qe())}function xu(e){const{index:t,items:n}=kt(),s=an(n).find(v=>v.key===e);if(!s||s.items.some(v=>v?.type==="package"))return;const{start:r,end:i}=cn();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=ue(),d=t!=null&&c[t]||null,l=d?.id??d?.reservationId??null,u=new Set(n.map(v=>te(v.barcode))),{equipment:f=[]}=ue(),p=(f||[]).find(v=>{const k=te(v?.barcode);return!k||u.has(k)||ua({desc:v?.desc||v?.description||v?.name||"",price:Number(v?.price)||0})!==e||!$s(v)?!1:!it(k,r,i,l)});if(!p){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const m=te(p.barcode),y=Ht(p);if(!y){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:y,equipmentId:y,barcode:m,desc:p.desc||p.description||p.name||s.description||"",qty:1,price:Number.isFinite(Number(p.price))?Number(p.price):s.unitPrice,image:Ot(p)}];_t(t,g),At(g),Qe()}function Cr(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){Su(s);return}if(a==="increase-edit-group"&&s){xu(s);return}if(a==="remove-edit-group"&&s){Eu(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||Au(i)}}),e.dataset.groupListenerAttached="true")}function kn(){return!!document.getElementById("edit-res-project")?.value}function wu(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{kn()&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function Iu(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),d=document.getElementById("edit-res-payment-history");[n,a,s,r,i,c,d].forEach(wu),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s&&(s.value="unpaid",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),d&&(d.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.dataset.linkedDisabled="false"))}function Qe(){const e=document.getElementById("edit-res-summary");if(!e)return;ka();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),Ve(a),Qe()}),a.dataset.listenerAttached="true");const s=b(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=kn();Iu(c);const d=document.getElementById("edit-res-tax"),l=c?!1:d?.checked||!1,u=!c&&a?.dataset?.userSelected==="true",f=c?"unpaid":u&&a?.value||"unpaid";let p=null;!c&&l&&(Je("edit-res-company-share"),p=en("edit-res-company-share"),(!Number.isFinite(p)||p<=0)&&(Je("edit-res-company-share"),p=en("edit-res-company-share")));const{items:m=[],payments:y=[]}=kt(),{start:g,end:v}=cn(),k=Ua({items:m,discount:r,discountType:i,applyTax:l,paidStatus:f,start:g,end:v,companySharePercent:p,paymentHistory:y});e.innerHTML=k;const h=Ua.lastResult;if(h&&a){const q=h.paymentStatus;u?Ve(a,a.value):(a.value!==q&&(a.value=q),a.dataset&&delete a.dataset.userSelected,Ve(a,q))}else a&&Ve(a,a.value)}function Au(e){if(e==null)return;const{index:t,items:n}=kt();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);_t(t,a),At(a),Qe()}function ku(e){const t=e?.value??"",n=te(t);if(!n)return;const a=fa(n);if(!a){E(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=bt(a);if(s==="maintenance"||s==="retired"){E(Mt(s));return}const r=te(n),{index:i,items:c=[]}=kt();if(c.findIndex(v=>te(v.barcode)===r)>-1){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:l,end:u}=cn();if(!l||!u){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:f=[]}=ue(),p=i!=null&&f[i]||null,m=p?.id??p?.reservationId??null;if(it(r,l,u,m)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const y=Ht(a);if(!y){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:y,equipmentId:y,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];_t(i,g),e&&(e.value=""),At(g),Qe()}function ca(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=ui(t),a=te(n?.barcode||t);if(!n||!a){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=bt(n);if(s==="maintenance"||s==="retired"){E(Mt(s));return}const{start:r,end:i}=cn();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:d=[]}=kt();if(d.some(g=>te(g.barcode)===a)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=ue(),f=c!=null&&u[c]||null,p=f?.id??f?.reservationId??null;if(it(a,r,i,p)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=Ht(n);if(!m){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const y=[...d,{id:m,equipmentId:m,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];_t(c,y),At(y),Qe(),e.value=""}function co(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),ca(e))});const t=()=>{mi(e.value,"edit-res-equipment-description-options")&&ca(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{Qe()});const e=()=>{hu()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{oo()})}typeof window<"u"&&(window.getEditReservationDateRange=cn,window.renderEditPaymentHistory=ka);function _u(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){ts(e);return}ca(e)}}function fm(){wt(),co()}function $u(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let _n=null,nt=[],st=[],ms=null,Le={},Ha=!1;function ps(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function fs(){return document.getElementById("edit-res-confirmed")?.value==="true"}function kt(){return{index:_n,items:nt,payments:st}}function _t(e,t,n=st){_n=typeof e=="number"?e:null,nt=Array.isArray(t)?[...t]:[],st=Array.isArray(n)?[...n]:[]}function lo(){_n=null,nt=[],Pc(),st=[]}function _a(){return[...st]}function Ws(e){st=Array.isArray(e)?[...e]:[]}function Pu(e){e&&(st=[...st,e])}function Cu(e){!Number.isInteger(e)||e<0||(st=st.filter((t,n)=>n!==e))}function En(e,t=1){const n=Number.parseFloat(b(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function ys(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(b(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function Tu(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?te(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:En(e.qty??e.quantity??e.count??1),price:ys(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function Nu(e,t=0){if(!e||typeof e!="object")return null;const n=wn(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=En(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),r=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:qs(e)).map(p=>Tu(p)).filter(Boolean),i=e.total_price??e.totalPrice??e.total??null;let c=ys(e.unit_price??e.unitPrice??e.price??null,0);if((!c||c===0)&&i!=null){const p=ys(i,0);p>0&&a>0&&(c=Number((p/a).toFixed(2)))}const d=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,d,n].find(p=>p!=null&&String(p).trim()!=="")||`Package ${n}`,f=e.image??e.cover??e.thumbnail??r.find(p=>p?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:b(String(u)),name:b(String(u)),qty:a,price:c,barcode:d,packageItems:r,image:f}}function ju(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const r=s-n;e.set(a,r>0?r:0)})}function Lu(e={},t=[]){const n=Array.isArray(t)?t.map(c=>({...c})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((c,d)=>Nu(c,d)).filter(Boolean);if(!s.length)return n;const r=new Map;s.forEach(c=>{const d=En(c.qty??c.quantity??1);if(c.barcode){const l=te(c.barcode);if(l){const u=`package::${l}`;r.set(u,(r.get(u)??0)+d)}}(c.packageItems||[]).forEach(l=>{if(!l)return;const u=d*En(l.qty??l.quantity??1),f=l.equipmentId??null,p=l.normalizedBarcode||(l.barcode?te(l.barcode):null);if(f!=null){const m=`equipment::${String(f)}`;r.set(m,(r.get(m)??0)+u)}if(p){const m=`barcode::${p}`;r.set(m,(r.get(m)??0)+u)}})});const i=[];return n.forEach(c=>{if(!c||typeof c!="object"){i.push(c);return}if(c.type==="package"){const v=wn(c.packageId??c.package_id??c.id??"");s.some(h=>h.packageId===v)||i.push({...c});return}const d=En(c.qty??c.quantity??1),l=Ht(c),u=c.barcode?te(c.barcode):null,f=[];l!=null&&f.push(`equipment::${String(l)}`),u&&f.push(`barcode::${u}`);const p=f.map(v=>r.get(v)??0).filter(v=>v>0);if(!p.length){i.push({...c});return}const m=Math.min(...p);if(m<=0){i.push({...c});return}const y=Math.min(m,d);if(ju(r,f,y),y>=d)return;const g=d-y;i.push({...c,qty:g,quantity:g})}),[...i,...s.map(c=>({...c}))]}function Bu(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function uo(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function mo(e){if(!e)return null;const t=b(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Fu(e,t){if(e){e.value="";return}}function gn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function po(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(b(String(e.value??""))),a=Number.parseFloat(b(String(e.amount??""))),s=Number.parseFloat(b(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),d=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,l=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:d,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:l}}function Du(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((d,l)=>String(l.createdAt||l.start||"").localeCompare(String(d.createdAt||d.start||""))):[],c=[`<option value="">${gn(a)}</option>`];i.forEach(d=>{c.push(`<option value="${gn(d.id)}">${gn(d.title||a)}</option>`)}),r&&!i.some(d=>String(d.id)===r)&&c.push(`<option value="${gn(r)}">${gn(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function fo(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const d=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",d&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}gs("tax");const c=Le?.updateEditReservationSummary;typeof c=="function"&&c()}function gs(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=Le?.updateEditReservationSummary;typeof r=="function"&&r()};if(Ha){a();return}Ha=!0;const s=()=>{Ha=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(gt)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),Je("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Je("edit-res-company-share"):n.checked&&(n.checked=!1));s()}function Tr(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:d}=ue(),u=Lt()?.[e];if(!u){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}Le={...Le,reservation:u,projects:d||[]},t?.(),Du(d||[],u);const f=u.projectId&&d?.find?.(A=>String(A.id)===String(u.projectId))||null,{effectiveConfirmed:p,projectLinked:m}=It(u,f),y=u.items?u.items.map(A=>({...A,equipmentId:A.equipmentId??A.equipment_id??A.id,barcode:te(A?.barcode)})):[],g=Lu(u,y),k=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(A=>po(A)).filter(Boolean);_t(e,g,k);const h=o("reservations.list.unknownCustomer","غير معروف"),q=c?.find?.(A=>String(A.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const N=document.getElementById("edit-res-id");N&&(N.value=u.reservationId||u.id);const V=document.getElementById("edit-res-customer");V&&(V.value=q?.customerName||h);const S=typeof a=="function"?a(u.start):{date:"",time:""},w=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",S.date),n?.("edit-res-start-time",S.time),n?.("edit-res-end",w.date),n?.("edit-res-end-time",w.time);const _=document.getElementById("edit-res-notes");_&&(_.value=u.notes||"");const T=document.getElementById("edit-res-discount");if(T){const A=m?0:u.discount??0;T.value=b(A)}const D=document.getElementById("edit-res-discount-type");D&&(D.value=m?"percent":u.discountType||"percent");const $=u.projectId?!1:!!u.applyTax,F=document.getElementById("edit-res-tax");F&&(F.checked=$);const Q=document.getElementById("edit-res-company-share");if(Q){const A=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,O=A!=null?Number.parseFloat(b(String(A).replace("%","").trim())):NaN,R=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,M=R!=null?R===!0||R===1||R==="1"||String(R).toLowerCase()==="true":Number.isFinite(O)&&O>0,z=M&&Number.isFinite(O)&&O>0?O:gt,ne=$||M;Q.checked=ne,Q.dataset.companyShare=String(z)}ps(p,{disable:m});const P=document.getElementById("edit-res-paid"),j=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");P&&(P.value=j,P.dataset&&delete P.dataset.userSelected);const I=document.getElementById("edit-res-payment-progress-type"),W=document.getElementById("edit-res-payment-progress-value");if(I?.dataset?.userSelected&&delete I.dataset.userSelected,I&&(I.value="percent"),Fu(W),Cc((u.technicians||[]).map(A=>String(A))),s?.(g),typeof window<"u"){const A=window?.renderEditPaymentHistory;typeof A=="function"&&A()}fo(),r?.();const H=document.getElementById("editReservationModal");ms=Bu(H,i),ms?.show?.()}async function Ru({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:r,populateEquipmentDescriptionLists:i,handleReservationsMutation:c}={}){if(_n===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const d=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),f=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",p=document.getElementById("edit-res-notes")?.value||"",m=b(document.getElementById("edit-res-discount")?.value||"0");let y=parseFloat(m)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const v=fs(),k=document.getElementById("edit-res-paid"),h=k?.dataset?.userSelected==="true",q=h&&k?.value||"unpaid",N=document.getElementById("edit-res-payment-progress-type"),V=document.getElementById("edit-res-payment-progress-value"),S=uo(N),w=mo(V),_=document.getElementById("edit-res-project")?.value||"",T=_c(),D=document.getElementById("edit-res-company-share"),$=document.getElementById("edit-res-tax");if(!d||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const F=typeof e=="function"?e:(Y,be)=>`${Y}T${be||"00:00"}`,Q=F(d,l),P=F(u,f);if(Q&&P&&new Date(Q)>new Date(P)){E(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const I=Lt()?.[_n];if(!I){E(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(nt)||nt.length===0&&T.length===0){E(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const W=typeof t=="function"?t:()=>!1,H=I.id??I.reservationId;for(const Y of nt){if(Y?.type==="package"&&Array.isArray(Y.packageItems)){for(const B of Y.packageItems){const ae=B?.barcode??B?.normalizedBarcode??"";if(!ae)continue;const pe=bt(ae);if(pe==="reserved"){const ce=te(ae);if(!W(ce,Q,P,H))continue}if(pe!=="available"){E(Mt(pe));return}}continue}const be=bt(Y.barcode);if(be==="reserved"){const B=te(Y.barcode);if(!W(B,Q,P,H))continue}if(be!=="available"){E(Mt(be));return}}for(const Y of nt){if(Y?.type==="package"&&Array.isArray(Y.packageItems)){for(const B of Y.packageItems){const ae=te(B?.barcode??B?.normalizedBarcode??"");if(ae&&W(ae,Q,P,H)){const pe=B?.desc||B?.barcode||o("reservations.create.packages.unnamedItem","معدة بدون اسم"),ce=`${o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${b(String(pe))})`;E(ce);return}}continue}const be=te(Y.barcode);if(W(be,Q,P,H)){E(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const A=typeof n=="function"?n:()=>!1;for(const Y of nt){if(Y?.type!=="package")continue;const be=Y.packageId??Y.package_id??null;if(be&&A(be,Q,P,H)){const B=Y.desc||Y.packageName||o("reservations.create.packages.genericName","الحزمة");E(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${b(String(B))} محجوزة بالفعل في الفترة المختارة`));return}}const O=typeof a=="function"?a:()=>!1;for(const Y of T)if(O(Y,Q,P,H)){E(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const R=Array.isArray(Le.projects)&&Le.projects.length?Le.projects:ue().projects||[],M=_&&R.find(Y=>String(Y.id)===String(_))||null,z={...I,projectId:_?String(_):null,confirmed:v},{effectiveConfirmed:ne,projectLinked:ee,projectStatus:oe}=It(z,M);let J=!!D?.checked,re=!!$?.checked;if(ee&&(J&&(D.checked=!1,J=!1),re=!1),!ee&&J!==re){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}re&&(Je("edit-res-company-share"),J=!!D?.checked);let he=J?getCompanySharePercent("edit-res-company-share"):null;J&&(!Number.isFinite(he)||he<=0)&&(Je("edit-res-company-share"),he=getCompanySharePercent("edit-res-company-share"));const ve=J&&re&&Number.isFinite(he)&&he>0,$e=ee?!1:re;ee&&(y=0,g="percent");const U=Es(nt,y,g,$e,T,{start:Q,end:P,companySharePercent:ve?he:0});let Z=_a();if(Number.isFinite(w)&&w>0){const Y=U;let be=null,B=null;S==="amount"?(be=w,Y>0&&(B=w/Y*100)):(B=w,Y>0&&(be=w/100*Y));const ae=po({type:S,value:w,amount:be,percentage:B,recordedAt:new Date().toISOString()});ae&&(Z=[...Z,ae],Ws(Z)),V&&(V.value="")}const se=xs({totalAmount:U,history:Z}),fe=ws({manualStatus:q,paidAmount:se.paidAmount,paidPercent:se.paidPercent,totalAmount:U});k&&!h&&(k.value=fe,k.dataset&&delete k.dataset.userSelected);let me=I.status??"pending";ee?me=M?.status??oe??me:["completed","cancelled"].includes(String(me).toLowerCase())||(me=v?"confirmed":"pending");const Ye=Rr({reservationCode:I.reservationCode??I.reservationId??null,customerId:I.customerId,start:Q,end:P,status:me,title:I.title??null,location:I.location??null,notes:p,projectId:_?String(_):null,totalAmount:U,discount:y,discountType:g,applyTax:$e,paidStatus:fe,confirmed:ne,items:nt.map(Y=>({...Y,equipmentId:Y.equipmentId??Y.id})),technicians:T,companySharePercent:ve?he:null,companyShareEnabled:ve,paidAmount:se.paidAmount,paidPercentage:se.paidPercent,paymentProgressType:se.paymentProgressType,paymentProgressValue:se.paymentProgressValue,paymentHistory:Z});try{const Y=await $c(I.id||I.reservationId,Ye);await Hr(),Tn(),Fe(),E(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),lo(),c?.({type:"updated",reservation:Y}),r?.(),i?.(),ms?.hide?.()}catch(Y){console.error("❌ [reservationsEdit] Failed to update reservation",Y);const be=ma(Y)?Y.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");E(be,"error")}}function ym(e={}){Le={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=Le,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=b(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{gs("tax")}),c.dataset.listenerAttached="true");const d=document.getElementById("edit-res-company-share");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{gs("share")}),d.dataset.listenerAttached="true");const l=document.getElementById("edit-res-payment-progress-type");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{l.dataset.userSelected="true",t?.()}),l.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=b(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const f=document.getElementById("edit-res-project");f&&!f.dataset.listenerAttached&&(f.addEventListener("change",()=>{fo();const v=Array.isArray(Le.projects)&&Le.projects.length?Le.projects:ue().projects||[],k=f.value&&v.find(S=>String(S.id)===String(f.value))||null,q={...Le?.reservation??{},projectId:f.value||null,confirmed:fs()},{effectiveConfirmed:N,projectLinked:V}=It(q,k);ps(N,{disable:V}),t?.()}),f.dataset.listenerAttached="true");const p=document.getElementById("edit-res-confirmed-btn");p&&!p.dataset.listenerAttached&&(p.addEventListener("click",()=>{if(p.disabled)return;const v=!fs();ps(v),t?.()}),p.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{Ru(Le).catch(v=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",v)})}),m.dataset.listenerAttached="true");const y=document.getElementById("edit-res-equipment-barcode");if(y&&!y.dataset.listenerAttached){let v=null;const k=()=>{y.value?.trim()&&(clearTimeout(v),v=null,n?.(y))};y.addEventListener("keydown",q=>{q.key==="Enter"&&(q.preventDefault(),k())});const h=()=>{if(clearTimeout(v),!y.value?.trim())return;const{start:q,end:N}=getEditReservationDateRange();!q||!N||(v=setTimeout(()=>{k()},150))};y.addEventListener("input",h),y.addEventListener("change",k),y.dataset.listenerAttached="true"}co?.();const g=document.getElementById("editReservationModal");g&&!g.dataset.cleanupAttached&&(g.addEventListener("hidden.bs.modal",()=>{lo(),t?.(),s?.([])}),g.dataset.cleanupAttached="true")}const Mu=ue()||{};let Xe=(Mu.projects||[]).map(Ou),jn=!1;function gm(){return Xe}function $a(e){Xe=Array.isArray(e)?e.map(Js):[],hs({projects:Xe});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return Xe}async function zu(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,d])=>{d==null||d===""||t.set(c,String(d))});const n=t.toString(),s=(await rt(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(Xs);return $a(i),jn=!0,Xe}async function Hu({force:e=!1,params:t=null}={}){if(!e&&jn&&Xe.length>0)return Xe;try{return await zu(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),Xe}}async function bm(e){const t=await rt("/projects/",{method:"POST",body:e}),n=Xs(t?.data??{}),a=[...Xe,n];return $a(a),jn=!0,n}async function hm(e,t){const n=await rt(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=Xs(n?.data??{}),s=Xe.map(r=>String(r.id)===String(e)?a:r);return $a(s),jn=!0,a}async function vm(e){await rt(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=Xe.filter(n=>String(n.id)!==String(e));$a(t),jn=!0}function qm({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:d,paymentStatus:l,equipmentEstimate:u=0,expenses:f=[],taxAmount:p=0,totalWithTax:m=0,discount:y=0,discountType:g="percent",companyShareEnabled:v=!1,companySharePercent:k=null,companyShareAmount:h=0,paidAmount:q=null,paidPercentage:N=null,paymentProgressType:V=null,paymentProgressValue:S=null,confirmed:w=!1,technicians:_=[],equipment:T=[],payments:D,paymentHistory:$}={}){const F=Array.isArray(_)?_.map(R=>Number.parseInt(String(R),10)).filter(R=>Number.isInteger(R)&&R>0):[],Q=Array.isArray(T)?T.map(R=>{const M=Number.parseInt(String(R.equipmentId??R.equipment_id??R.id??0),10),z=Number.parseInt(String(R.qty??R.quantity??0),10);return!Number.isInteger(M)||M<=0?null:{equipment_id:M,quantity:Number.isInteger(z)&&z>0?z:1}}).filter(Boolean):[],P=Array.isArray(f)?f.map(R=>{const M=Number.parseFloat(R?.amount??R?.value??0)||0,z=(R?.label??R?.name??"").trim();return z?{label:z,amount:Math.round(M*100)/100}:null}).filter(Boolean):[],j=P.reduce((R,M)=>R+(M?.amount??0),0),I={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!d,payment_status:l??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(j*100)/100,tax_amount:Math.round((Number.parseFloat(p)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(m)||0)*100)/100,confirmed:!!w,technicians:F,equipment:Q,expenses:P},W=Math.max(0,Number.parseFloat(y)||0);I.discount=W,I.discount_type=g==="amount"?"amount":"percent";const H=Number.parseFloat(k),A=!!v&&Number.isFinite(H)&&H>0;I.company_share_enabled=A,I.company_share_percent=A?H:0,I.company_share_amount=A?Math.max(0,Number.parseFloat(h)||0):0,Number.isFinite(Number(q))&&(I.paid_amount=Math.max(0,Number.parseFloat(q)||0)),Number.isFinite(Number(N))&&(I.paid_percentage=Math.max(0,Number.parseFloat(N)||0)),(V==="amount"||V==="percent")&&(I.payment_progress_type=V),S!=null&&S!==""&&(I.payment_progress_value=Number.parseFloat(S)||0),e&&(I.project_code=String(e).trim());const O=D!==void 0?D:$;if(O!==void 0){const R=yo(O)||[];I.payments=R.map(M=>({type:M.type,amount:M.amount!=null?M.amount:null,percentage:M.percentage!=null?M.percentage:null,value:M.value!=null?M.value:null,note:M.note??null,recorded_at:M.recordedAt??null}))}return I.end_datetime||delete I.end_datetime,I.client_company||(I.client_company=null),I}function Xs(e={}){return Js(e)}function Ou(e={}){return Js(e)}function Js(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(m=>{if(m==null)return null;if(typeof m=="object"){const y=m.id??m.technician_id??m.technicianId;return y!=null?String(y):null}return String(m)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(m=>{const y=m?.equipment_id??m?.equipmentId??m?.id??null,g=m?.quantity??m?.qty??0,v=m?.barcode??m?.code??"",k=m?.description??m?.name??"";return{equipmentId:y!=null?String(y):null,qty:Number.parseInt(String(g),10)||0,barcode:v,description:k}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((m,y)=>({id:m?.id??`expense-${t??"x"}-${y}`,label:m?.label??"",amount:Number.parseFloat(m?.amount??0)||0})),d=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,l=e.company_share_enabled??e.companyShareEnabled,u=l!=null?l===!0||l===1||String(l).toLowerCase()==="true":d>0,f=e.payment_history??e.paymentHistory??e.payments??null,p=yo(f);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?d:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(m=>typeof m=="object"?m:{id:m}),equipment:r,expenses:c,paymentHistory:p}}function Sm(e){return e instanceof Nr}function Oa(e){if(e==null||e==="")return null;const t=b(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function Vu(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=Oa(e.value);let s=Oa(e.amount),r=Oa(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,d=e.recordedAt??e.recorded_at??e.date??null;let l=null;if(d){const f=new Date(d);Number.isNaN(f.getTime())||(l=f.toISOString())}l||(l=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:l}}function yo(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>Vu(t)).filter(Boolean):[]}const la="reservations-ui:ready",Nt=typeof EventTarget<"u"?new EventTarget:null;let jt={};function Uu(e){return Object.freeze({...e})}function Ku(){if(!Nt)return;const e=jt,t=typeof CustomEvent=="function"?new CustomEvent(la,{detail:e}):{type:la,detail:e};typeof Nt.dispatchEvent=="function"&&Nt.dispatchEvent(t)}function Qu(e={}){if(!e||typeof e!="object")return jt;const t={...jt};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),jt=Uu(t),Ku(),jt}function Gu(e){if(e)return jt?.[e]}function Em(e){const t=Gu(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const i=(s?.detail||jt)?.[e];typeof i=="function"&&(Nt&&Nt.removeEventListener(la,a),n(i))};Nt&&Nt.addEventListener(la,a)})}function xm(){return Hu().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=ue()||{};Tc(e||[]),vi()})}function Ys(e=null){vi(),go(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Wu(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function bs(){return{populateEquipmentDescriptionLists:wt,setFlatpickrValue:$u,splitDateTime:Br,renderEditItems:At,updateEditReservationSummary:Qe,addEquipmentByDescription:_u,addEquipmentToEditingReservation:ku,addEquipmentToEditingByDescription:ca,combineDateTime:xn,hasEquipmentConflict:it,hasTechnicianConflict:Dr,renderReservations:go,handleReservationsMutation:Ys,ensureModal:Wu}}function go(e="reservations-list",t=null){mu({containerId:e,filters:t,onShowDetails:bo,onConfirmReservation:vo})}function bo(e){return pu(e,{getEditContext:bs,onEdit:(t,{reservation:n})=>{qo(t,n)},onDelete:ho})}function ho(e){return zt()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?yu(e,{onAfterChange:Ys}):!1:($n(),!1)}function vo(e){return gu(e,{onAfterChange:Ys})}function qo(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}Tr(e,bs());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}Tr(e,bs());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}pc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function wm(){Qu({showReservationDetails:bo,deleteReservation:ho,confirmReservation:vo,openReservationEditor:qo})}export{Qu as A,bo as B,Xs as C,om as D,rn as E,cm as F,gm as G,Sm as H,Si as I,lm as J,mm as K,nm as L,am as M,zu as N,sm as O,im as P,rm as Q,dm as R,vm as S,bm as T,Jl as U,xi as V,wi as W,um as X,Hu as a,wm as b,ym as c,fm as d,pm as e,vi as f,bs as g,le as h,em as i,Ys as j,Kl as k,xm as l,Sa as m,Fe as n,Mc as o,Wn as p,Yu as q,go as r,tm as s,Zu as t,Qe as u,Gu as v,Em as w,qi as x,qm as y,hm as z};
