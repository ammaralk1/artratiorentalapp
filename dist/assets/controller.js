import{n as h,d as ue,f as dc,t as o,b as rt,h as S,j as Ht,o as $n,s as gs,A as Tr,z as uc,k as Ue,B as Nr,u as mc}from"./auth.js";import{n as te,A as it,B as jr,C as pc,D as gt,E as bs,z as Re,F as ir,G as xn,H as wn,I as ca,J as fc,h as hs,K as ot,L as vs,M as an,N as Cr,O as yc,P as gc,Q as bc,R as hc,S as zt,T as Un,U as vc,V as la,W as Lr,X as qc,Y as Br,w as qs,j as Ss,k as Es,Z as Fr,_ as Sc,s as Pn,c as da,$ as Dr,a0 as Ec,a1 as Rr,a2 as xc,x as xs,e as At,a3 as ws,q as ua,a4 as ut,a5 as Ie,a6 as wc,a as Mr,g as Lt,a7 as Ac,a8 as Ic,a9 as Oa,aa as kc,y as _c,ab as $c,ac as Pc,b as Tc}from"./reservationsService.js";const La="select.form-select:not([data-no-enhance]):not([multiple])",ct=new WeakMap;let Ba=null,or=!1,mt=null;function Ju(e=document){e&&(e.querySelectorAll(La).forEach(t=>Mn(t)),!Ba&&e===document&&(Ba=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(La)&&Mn(a),a.querySelectorAll?.(La).forEach(s=>Mn(s)))})}),Ba.observe(document.body,{childList:!0,subtree:!0})),or||(or=!0,document.addEventListener("pointerdown",Cc,{capture:!0})))}function Rn(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){Mn(e);return}const t=e.closest(".enhanced-select");t&&(As(t),Kn(t),Va(t))}function Mn(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){Rn(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};ct.set(t,r),a.addEventListener("click",()=>jc(t)),a.addEventListener("keydown",i=>Lc(i,t)),s.addEventListener("click",i=>Fc(i,t)),s.addEventListener("keydown",i=>Bc(i,t)),e.addEventListener("change",()=>{Kn(t),Hr(t)}),r.observer=new MutationObserver(i=>{let c=!1,d=!1;for(const l of i)l.type==="attributes"&&l.attributeName==="disabled"&&(d=!0),l.type==="childList"&&(c=!0);d&&Va(t),c&&Nc(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),As(t),Kn(t),Va(t)}function Nc(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,As(t),Kn(t)})))}function As(e){const t=ct.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),Hr(e)}function Kn(e){const t=ct.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function Hr(e){const t=ct.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function Va(e){const t=ct.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function jc(e){ct.get(e)&&(e.getAttribute("data-open")==="true"?sn(e):zr(e))}function zr(e){const t=ct.get(e);if(!t)return;mt&&mt!==e&&sn(mt,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),mt=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function sn(e,{focusTrigger:t=!0}={}){const n=ct.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),mt===e&&(mt=null))}function Cc(e){if(!mt)return;const t=e.target;t instanceof Node&&(mt.contains(t)||sn(mt,{focusTrigger:!1}))}function Lc(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),zr(t)):n==="Escape"&&sn(t)}function Bc(e,t){const n=e.key,a=ct.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&Or(i,t)}else n==="Escape"&&(e.preventDefault(),sn(t))}function Fc(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&Or(n,t)}function Or(e,t){const n=ct.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),sn(t)}const rn=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let pt=null;function Is(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function Vr(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function Dc(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function Rc(e={}){const t=Dc({...e,activatedAt:Date.now()});return pt=t,Vr(!0,t.mode||"create"),Is(rn.change,{active:!0,selection:{...t}}),t}function Qn(e="manual"){if(!pt)return;const t=pt;pt=null,Vr(!1),Is(rn.change,{active:!1,previous:t,reason:e})}function Ur(){return!!pt}function Mc(){return pt?{...pt}:null}function Hc(e){if(!pt)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=h(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:r,description:i}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const d=c.map(u=>h(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!d.length)return!1;const l=Number.isInteger(s)&&s>0?s:d.length;t={barcodes:d,quantity:Math.min(l,d.length)},r&&(t.groupKey=r),i&&(t.description=i)}else return!1;return Is(rn.requestAdd,{...t,selection:{...pt}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||Qn("tab-changed")});const zc=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Oc=new Set(["maintenance","reserved","retired"]);function Vc(e){const t=String(e??"").trim().toLowerCase();return t&&zc.get(t)||"available"}function Uc(e){return e?typeof e=="object"?e:ma(e):null}function bt(e){const t=Uc(e);return t?Vc(t.status||t.state||t.statusLabel||t.status_label):"available"}function ks(e){return!Oc.has(bt(e))}function Ot(e={}){return e.image||e.imageUrl||e.img||""}function Kc(e){if(!e)return null;const t=te(e),{equipment:n=[]}=ue();return(n||[]).find(a=>te(a?.barcode)===t)||null}function ma(e){const t=te(e);if(!t)return null;const{equipment:n=[]}=ue();return(n||[]).find(a=>te(a?.barcode)===t)||null}const Qc=ue()||{};let qt=(Qc.equipment||[]).map(Xc),Ua=!1,hn="",Nt=null,Ft=null,Dt=null,pa=!1,cr=!1;function Gc(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function Wc(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function Xc(e={}){return _s({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function fa(e={}){return _s(e)}function _s(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=Tn(e.quantity??e.qty??0),i=ya(e.unit_price??e.price??0),c=h(String(e.barcode??"").trim()),d=Be(e.status??e.state??e.status_label??e.statusLabel??"available"),l=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:Jc(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:d,image:l,imageUrl:l,created_at:e.created_at??null,updated_at:e.updated_at??null}}function Jc(e){return e!=null&&e!==""}function Tn(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function ya(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function Yc(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function lr(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function Zc(e,t){const n=lr(e),a=lr(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}else{if(r!==i)return r?-1:1;{const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}}const c=Gn(e?.desc||e?.description||e?.name||""),d=Gn(t?.desc||t?.description||t?.name||"");return c.localeCompare(d,"ar",{sensitivity:"base"})}function ke(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Be(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function el(e){return Be(e)}function Ka(){if(!Ur())return null;const e=Mc();return e?{...e}:null}function tl(e){const t=Ka();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:r=null}=t,i=t?.mode||t?.source||"",c=[],d=new Set;if(n.forEach(f=>{const m=te(f?.barcode);!m||d.has(m)||(d.add(m),c.push({variant:f,barcode:m}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(i==="package-manager"||i==="equipment-packages"){const f=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:m})=>m),maxQuantity:f,reason:""}}const l=c.filter(({variant:f})=>ks(f));if(!a||!s)return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=l.filter(({barcode:f})=>!it(f,a,s,r));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:f})=>f),maxQuantity:u.length};let p=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(l.length>0)p=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const f=new Set(c.map(({variant:m})=>Be(m?.status)));f.has("maintenance")?p=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):f.has("reserved")?p=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):f.has("retired")&&(p=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:p,availableBarcodes:[],maxQuantity:0}}function nl(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function Kr(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=Ka();e.hidden=!s;const r=s?.mode||s?.source||"";s?r==="package-manager"||r==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=Ka(),d=c?.mode||c?.source||"";d==="package-manager"||d==="equipment-packages"?Qn("package-finish-button"):(Qn("return-button"),nl())}),t.dataset.listenerAttached="true")}function Ke(){return qt}function Rt(e){qt=Array.isArray(e)?e.map(_s):[],gs({equipment:qt}),Wc()}function Gn(e){return String(e??"").trim().toLowerCase()}function Et(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=Gn(t);return n||(n=Gn(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function ga(e){const t=Et(e);return t?Ke().filter(n=>Et(n)===t):[]}function ba(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=ha(e);if(n){const a=ke(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${ke(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function $s(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function Wn(){const e=$s();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function Ps(e={}){const t=$s();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function Zt(e){pa=e;const t=$s(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function Yu(e){if(!Ht()){$n();return}if(!e)return;try{await sl()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){S(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let d=0;if(i.forEach(l=>{const u=l.القسم??l.category??"",p=l["القسم الثانوي"]??l.subcategory??"",f=l.الوصف??l.description??l.name??"",m=l.الكمية??l.quantity??0,y=l.السعر??l.price??0,g=l.الباركود??l.barcode??"",b=l.الحالة??l.status??"متاح",w=l.الصورة??l.image_url??l.image??"",v=h(String(g||"")).trim();if(!f||!v){d+=1;return}c.push(Ts({category:u,subcategory:p,description:f,quantity:m,unit_price:y,barcode:v,status:b,image_url:w}))}),!c.length){S(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const l=await rt("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(l?.data)?l.data.map(fa):[];if(u.length){const m=[...Ke(),...u];Rt(m)}await va({showToastOnError:!1}),Fe();const p=l?.meta?.count??u.length,f=[];p&&f.push(`${p} ✔️`),d&&f.push(`${d} ⚠️`),S(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(f.length?` (${f.join(" / ")})`:""))}catch(l){const u=on(l,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");S(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),S(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),S(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const al="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let pn=null;function sl(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):pn||(pn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=al,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),pn=null,e}),pn)}function Ts({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const d=h(String(r||"")).trim(),l=el(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:Tn(a),unit_price:ya(s),barcode:d,status:l,image_url:c?.trim()||null}}async function rl(){if(!Ht()){$n();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await rt("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await va({showToastOnError:!1}),S(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=on(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");S(t,"error")}}function ha(e){return e.image||e.imageUrl||e.img||""}function il(e){const t=Be(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function Xn(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${ke(a)}</td></tr>`}n&&(n.textContent="0")}function Qr(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=Nt?.groupKey||Et(e);if(!r){Xn();return}const i=Ke().filter(p=>Et(p)===r).sort((p,f)=>{const m=String(p.barcode||"").trim(),y=String(f.barcode||"").trim();return!m&&!y?0:m?y?m.localeCompare(y,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){Xn();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),d=o("equipment.form.labels.quantity","الكمية"),l=Ke(),u=i.map(p=>{const f=p.id&&e.id?String(p.id)===String(e.id):String(p.barcode||"")===String(e.barcode||""),m=f?"equipment-variants-table__row--current":"",y=ke(String(p.barcode||"-")),g=f?`<span class="equipment-variants-current-badge">${ke(c)}</span>`:"",b=h(String(Number.isFinite(Number(p.qty))?Number(p.qty):0)),w=l.indexOf(p),v=ke(o("equipment.item.actions.delete","🗑️ حذف")),k=w>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${w}">${v}</button>
          </div>`:"";return`
        <tr class="${m}">
          <td>
            ${y}
            ${g}
          </td>
          <td>${il(p.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${ke(d)}">${b}</span>
          </td>
          <td class="table-actions-cell">${k}</td>
        </tr>
      `}).join("");n.innerHTML=u}function ol({item:e,index:t}){const n=ha(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=Ht(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},d=Number.isFinite(Number(e.qty))?Number(e.qty):0,l=Number.isFinite(Number(e.price))?Number(e.price):0,u=d.toLocaleString("en-US"),p=l.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),f=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,m=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,y=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(d-f-m,0),g=y.toLocaleString("en-US"),b=o("equipment.card.labels.availableOfTotal","من أصل"),w=Be(e.status);let v=`${ke(c.available)}: ${ke(g)} ${ke(b)} ${ke(u)}`,k="available";if(y===0){const M={reserved:{text:d===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},H=M[w]||M.default;v=ke(H.text),k=H.modifier}const F=`<span class="equipment-card__availability equipment-card__availability--${k}">${v}</span>`,V="",q=e.desc||e.name||"—",x=e.name&&e.name!==e.desc?e.name:"",N=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${p} ${r}`}].map(({label:M,value:H})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${M}</span>
              <span class="equipment-card__detail-value">${H}</span>
            </span>
          `).join("")}
    </div>`,D=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),$=D.length?`<div class="equipment-card__categories">${D.map(({label:M,value:H})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${M}</span>
              <span class="equipment-card__detail-value">${H}</span>
            </div>
          `).join("")}</div>`:"",B=x?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${x}</span>
      </div>`:"",P=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${q}</h3>
    </div>
  `}
      ${N}
    </div>
  `,j=[],A=tl(e),G=A?.availableBarcodes?.length?A.availableBarcodes.join(","):A?.barcode?A.barcode:"";let z="",I="";if(A.active){const M=`equipment-select-qty-${t}`,H=!!A.canSelect,ne=H?Math.max(1,Number(A.maxQuantity||A.availableBarcodes?.length||1)):1,ee=Math.max(1,Math.min(ne,99)),oe=[];for(let se=1;se<=ee;se+=1){const fe=h(String(se));oe.push(`<option value="${se}"${se===1?" selected":""}>${fe}</option>`)}const X=H?"":" disabled",re=o("reservations.create.equipment.selector.quantityLabel","الكمية"),he=H?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${h(String(ne))}`:A.reason?A.reason:"";z=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${M}">${re}</label>
        <select class="equipment-card__quantity-select" id="${M}" data-equipment-select-quantity${X}>
          ${oe.join("")}
        </select>
        ${he?`<span class="equipment-card__selection-hint">${ke(he)}</span>`:""}
      </div>
    `;const ve=o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),$e=H?"":" disabled",U=A.reason?` title="${ke(A.reason)}"`:"",Z=['data-equipment-action="select-reservation"',`data-selection-max="${H?ne:0}"`];G&&Z.push(`data-selection-barcodes="${ke(G)}"`),e.groupKey&&Z.push(`data-selection-group="${ke(String(e.groupKey))}"`),I=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${Z.join(" ")}${$e}${U}>${ve}</button>
    `}i&&j.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const O=j.length?j.join(`
`):"",R=ke(q);return`
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
        ${F}
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
        ${B}
      </div>
      ${z||I||O?`<div class="equipment-card__actions equipment-card__actions--center">
            ${z}
            ${I}
            ${O}
          </div>`:""}
    </article>
  `}function cl(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,a.appendChild(d)}),t.includes(i)&&(a.value=i),Rn(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,s.appendChild(d)}),n.includes(i)&&(s.value=i),Rn(s)}const r=document.getElementById("filter-status");r&&Rn(r)}function Nn(){const e=ue();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return qt=t||[],qt;const s=new Date;let r=!1;const i=new Set((a||[]).filter(d=>d?.status==="open").map(d=>h(String(d?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(d=>{if(!d)return d;const l=Be(d.status),u=h(String(d.barcode??"")).trim().toLowerCase(),p=u&&i.has(u);let f=p?"maintenance":"available";if(!p&&u)for(const m of n||[]){if(!ll(m,s))continue;if(m.items?.some(g=>h(String(g?.barcode??"")).trim().toLowerCase()===u)){f="reserved";break}}return f!==l?(r=!0,{...d,status:f}):{...d,status:f}});return r?Rt(c):(qt=c,gs({equipment:qt})),qt}function ll(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function Fa(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Fe(){const e=document.getElementById("equipment-list");if(!e)return;Kr();const t=Nn(),n=Array.isArray(t)?t:Ke(),a=new Map;n.forEach(g=>{if(!g)return;const b=Et(g);b&&(a.has(b)||a.set(b,[]),a.get(b).push(g))});const s=Array.from(a.values()).map(g=>{const b=g[0],w=g.reduce((x,_)=>x+(Number.isFinite(Number(_.qty))?Number(_.qty):0),0),v=["maintenance","reserved","available","retired"],k=g.map(x=>Be(x.status)).sort((x,_)=>v.indexOf(x)-v.indexOf(_))[0]||"available",F=g.reduce((x,_)=>{const N=Tn(_?.qty??0)||0,D=Be(_?.status);return D==="reserved"?x.reserved+=N:D==="maintenance"&&(x.maintenance+=N),x},{reserved:0,maintenance:0}),V=Math.max(w-F.reserved-F.maintenance,0);return{item:{...b,qty:w,status:k,variants:g,groupKey:Et(b),reservedQty:F.reserved,maintenanceQty:F.maintenance,availableQty:V},index:n.indexOf(b)}});s.sort((g,b)=>Zc(g.item,b.item));const r=document.getElementById("search-equipment")?.value||"",i=h(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",d=document.getElementById("filter-sub")?.value||"",l=document.getElementById("filter-status")?.value||"",u=l?Be(l):"";if(Ua&&!n.length){e.innerHTML=Fa(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(hn&&!n.length){e.innerHTML=Fa(hn,{tone:"error",icon:"⚠️"});return}const p=s.filter(({item:g})=>{const b=h(String(g.barcode??"")).toLowerCase().trim(),w=Array.isArray(g.variants)?g.variants.map(q=>h(String(q.barcode??"")).toLowerCase().trim()).filter(Boolean):[],v=!i||g.name&&g.name.toLowerCase().includes(i)||g.desc&&g.desc.toLowerCase().includes(i)||b&&b.includes(i)||w.some(q=>q.includes(i))||g.category&&g.category.toLowerCase().includes(i)||g.sub&&g.sub.toLowerCase().includes(i),k=!c||g.category===c,F=!d||g.sub===d,V=!u||Be(g.status)===u;return v&&k&&F&&V}),f=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),m=p;e.innerHTML=m.length?m.map(ol).join(""):Fa(f);const y=document.getElementById("equipment-list-count");if(y){const g=o("equipment.list.countSuffix","عنصر"),b=h(String(m.length)),w=m.length?`${b} ${g}`:`0 ${g}`;y.textContent=w}cl(n)}async function va({showToastOnError:e=!0}={}){Ua=!0,hn="",Fe();try{const t=await rt("/equipment/?all=1"),n=Array.isArray(t?.data)?t.data.map(fa):[];Rt(n)}catch(t){hn=on(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&S(hn,"error")}finally{Ua=!1,Fe()}}function on(e,t,n){if(e instanceof Tr){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function dl(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),r=ya(t.querySelector("#new-equipment-price")?.value||"0"),i=Tn(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",d=t.querySelector("#new-equipment-category")?.value?.trim()||"",l=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){S(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const p=Ts({category:d,subcategory:l,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const f=await rt("/equipment/",{method:"POST",body:p}),m=fa(f?.data),y=[...Ke(),m];Rt(y),Fe(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),S(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(f){const m=on(f,"equipment.toast.addFailed","تعذر إضافة المعدة");S(m,"error")}}async function Gr(e){if(!Ht()){$n();return}const t=Ke(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await rt(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),Rt(a),Fe(),S(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=on(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");S(s,"error")}}async function ul(e,t){const n=Ke(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},Rt(r),Fe();return}const s=Ts({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await rt(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=fa(r?.data),c=[...n];c[e]=i,Rt(c),Fe(),S(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=on(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw S(i,"error"),r}}function Bn(){Fe()}function Wr(e){const n=Ke()[e];if(!n)return;Ft=e;const a=ga(n),s=a[0]||n,r=a.reduce((d,l)=>d+(Number.isFinite(Number(l.qty))?Number(l.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(d=>Be(d.status)).sort((d,l)=>i.indexOf(d)-i.indexOf(l))[0]||Be(s.status);document.getElementById("edit-equipment-index").value=e,Ps({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:ha(s)||"",barcode:s.barcode||"",status:s.status||c}),Zt(!1),Dt=Wn(),ba(s),Qr(s),Nt={groupKey:Et(s),barcode:String(s.barcode||""),id:s.id||null},Gc(document.getElementById("editEquipmentModal"))?.show()}function ml(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),r=s?.querySelector("[data-equipment-select-quantity]");let i=Number.parseInt(r?.value||"1",10);(!Number.isFinite(i)||i<=0)&&(i=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&i>c&&(i=c);const l=(t.dataset.selectionBarcodes||"").split(",").map(m=>m.trim()).filter(m=>m.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",p=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";Hc({barcodes:l,quantity:i,groupKey:p,description:u})||S(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||Gr(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||Wr(s)}}function pl(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||Wr(n)}}function fl(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||Gr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function Xr(){if(!Nt||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=Ke(),a=Nt.id?n.find(d=>String(d.id)===String(Nt.id)):null,s=Nt.groupKey,r=s?n.find(d=>Et(d)===s):null,i=a||r;if(!i){Xn();return}const c=n.findIndex(d=>d===i);if(c>=0){const d=document.getElementById("edit-equipment-index");d&&(d.value=String(c)),Ft=c}if(Qr(i),!pa){const d=ga(i),l=d[0]||i,u=d.reduce((m,y)=>m+(Number.isFinite(Number(y.qty))?Number(y.qty):0),0),p=["maintenance","reserved","available","retired"],f=d.map(m=>Be(m.status)).sort((m,y)=>p.indexOf(m)-p.indexOf(y))[0]||Be(l.status);Ps({category:l.category||"",subcategory:l.sub||"",description:l.desc||l.description||"",quantity:String(u||l.qty||0),price:l.price!=null?String(l.price):"0",image:ha(l)||"",barcode:l.barcode||"",status:l.status||f}),Dt=Wn()}ba(primary)}function yl(){document.getElementById("search-equipment")?.addEventListener("input",Bn),document.getElementById("filter-category")?.addEventListener("change",Bn),document.getElementById("filter-sub")?.addEventListener("change",Bn),document.getElementById("filter-status")?.addEventListener("change",Bn),document.getElementById("add-equipment-form")?.addEventListener("submit",dl);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),rl().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",ml),t.addEventListener("keydown",pl),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",fl),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);Yc(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!pa){Dt=Wn(),Zt(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){S(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:Tn(document.getElementById("edit-equipment-quantity").value)||1,price:ya(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await ul(t,n),Dt=Wn(),Zt(!1),Xr()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{yl(),Fe(),va();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(Dt&&Ps(Dt),Ft!=null){const a=Ke()[Ft];if(a){const r=ga(a)[0]||a;ba(r)}}Zt(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Fe(),Zt(pa),Ft!=null){const t=Ke()[Ft];if(t){const a=ga(t)[0]||t;ba(a)}}});document.addEventListener("equipment:refreshRequested",()=>{va({showToastOnError:!1})});document.addEventListener(dc.USER_UPDATED,()=>{Fe()});document.addEventListener("equipment:changed",()=>{Xr()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{Nt=null,Xn(),Ft=null,Dt=null,Zt(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!cr&&(document.addEventListener(rn.change,()=>{Kr(),Fe()}),cr=!0);const Jr="projects:create:draft",Yr="projects.html#projects-section";let Qa=null,Zr=[],Ga=new Map,Wa=new Map,Jn=new Map,Da=!1,Hn=null,dr=!1,ei=[];function gl(e){if(!e)return null;let t=ei.find(a=>a.id===e)||null;if(t)return t;const n=yc(e);return n?(t={id:e,name:bc(n)||e,price:gc(n),items:hs(n),raw:n},t):null}function Yn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Zn(e){return h(String(e||"")).trim().toLowerCase()}function bl(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function ti(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function ni(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function ai(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function si(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function Mt(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function Ns(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function Vt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Oe(){const{input:e,hidden:t}=Vt();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function Pt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function ri(e,t,{allowPartial:n=!1}={}){const a=Re(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function Xa(e,t={}){return ri(Ga,e,t)}function Ja(e,t={}){return ri(Wa,e,t)}function Ve(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function ii(e){Zr=Array.isArray(e)?[...e]:[]}function js(){return Zr}function Cs(e){return e&&js().find(t=>String(t.id)===String(e))||null}function ur(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function en(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??gt,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:gt}function Je(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??gt,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=gt),t.dataset.companyShare=String(s),t.checked=!0}function Ya(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(Da){le();return}Da=!0;const a=()=>{Da=!1,le()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(gt)),t.disabled){n.checked=!1,S(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),Je()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Je():n.checked&&(n.checked=!1));a()}function hl(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function mr(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function pr(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function ft({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=Ns();if(!n||!a||!s)return;const r=bs()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const d=new Set;Ga=new Map;const l=r.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:pr(m)||c})).filter(m=>{if(!m.label)return!1;const y=Re(m.label);return!y||d.has(y)?!1:(d.add(y),Ga.set(y,m),!0)}).sort((m,y)=>m.label.localeCompare(y.label,void 0,{sensitivity:"base"}));s.innerHTML=l.map(m=>`<option value="${Yn(m.label)}"></option>`).join("");const u=t?"":n.value,p=e?String(e):a.value?String(a.value):"",f=p?r.find(m=>String(m.id)===p):null;if(f){const m=pr(f)||c;a.value=String(f.id),n.value=m,n.dataset.selectedId=String(f.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function tn({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=Vt();if(!a||!s||!r)return;const i=Array.isArray(t)?t:js()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const d=[...i].filter(g=>g&&g.id!=null).sort((g,b)=>String(b.createdAt||b.start||"").localeCompare(String(g.createdAt||g.start||""))),l=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),p=new Set;Wa=new Map;const f=d.map(g=>{const b=ur(g)||u;return{id:String(g.id),label:b}}).filter(g=>{if(!g.label)return!1;const b=Re(g.label);return!b||p.has(b)?!1:(p.add(b),Wa.set(b,g),!0)});r.innerHTML=f.map(g=>`<option value="${Yn(g.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",y=m?d.find(g=>String(g.id)===m):null;if(y){const g=ur(y)||u;s.value=String(y.id),a.value=g,a.dataset.selectedId=String(y.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":l}function ea(e,t,n){const{date:a,time:s}=Cr(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function oi(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||tn({selectedValue:a});const r=(bs()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";ft(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=mr(e,"start"),d=mr(e,"end");c&&ea("res-start","res-start-time",c),d&&ea("res-end","res-end-time",d);const l=document.getElementById("res-notes");l&&e.description&&(t||!l.value)&&(l.value=e.description),le(),xt()}function ci({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:ue(),s=Array.isArray(a)?a:[];ii(s);const r=t!=null?String(t):n.value?String(n.value):"";tn({selectedValue:r,projectsList:s}),xt(),le()}function xt(){const{input:e,hidden:t}=Vt(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),d=document.getElementById("res-discount-type"),l=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),p=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(Pt(n,Oe),a&&Pt(a,Oe)),s&&Pt(s,Oe),r&&Pt(r,Oe),i&&Pt(i,Oe),c&&Pt(c,Oe),d&&Pt(d,Oe),p)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=l),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=l),s&&(s.value="unpaid",Ve(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=l),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=l),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=l),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=l),d&&(d.value="percent",d.disabled=!0,d.classList.add("reservation-input-disabled"),d.title=l);else{if(n){const f=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",f&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.disabled=!1,d.classList.remove("reservation-input-disabled"),d.title="")}Ya("tax"),le()}function Ls(){const{input:e,hidden:t}=Vt();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Ja(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=Cs(r.id);i?oi(i,{skipProjectSelectUpdate:!0}):(xt(),le())}else t.value="",e.dataset.selectedId="",xt(),le()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Ja(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Bs(){const{input:e,hidden:t}=Ns();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Xa(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),le()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Xa(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function vl(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){vn({clearValue:!0});return}let n=null;try{const l=decodeURIComponent(t);n=JSON.parse(l)}catch(l){console.warn("⚠️ [reservations/createForm] Failed to decode project context",l)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),vn({clearValue:!1}),!n)return;n.fromProjectForm&&(Hn={draftStorageKey:n.draftStorageKey||Jr,returnUrl:n.returnUrl||Yr});const r=document.getElementById("res-project");if(n.projectId){r&&(tn({selectedValue:String(n.projectId)}),xt());const l=Cs(n.projectId);l?oi(l,{forceNotes:!!n.forceNotes}):le(),vn()}else{r&&tn({selectedValue:""});const l=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");Cl(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),l)}n.start&&ea("res-start","res-start-time",n.start),n.end&&ea("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(bs()||[]).find(p=>String(p.id)===String(n.customerId));u?.id!=null&&(ft({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(ft({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):ft({selectedValue:""});const d=document.getElementById("res-notes");d&&n.description&&!d.value&&(d.value=n.description),le()}function Ut(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:xn(e,n),end:xn(t,a)}}function li(e){const t=Zn(e);if(t){const c=Jn.get(t);if(c)return c}const{description:n,barcode:a}=ti(e);if(a){const c=ma(a);if(c)return c}const s=Re(n||e);if(!s)return null;let r=Dr();if(!r?.length){const c=ue();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&Rr(r)}const i=r.find(c=>Re(c?.desc||c?.description||"")===s);return i||r.find(c=>Re(c?.desc||c?.description||"").includes(s))||null}function di(e,t="equipment-description-options"){const n=Zn(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(d=>Zn(d.value)===n)||Jn.has(n))return!0;const{description:s}=ti(e);if(!s)return!1;const r=Re(s);return r?(Dr()||[]).some(c=>Re(c?.desc||c?.description||"")===r):!1}const ql={available:0,reserved:1,maintenance:2,retired:3};function Sl(e){return ql[e]??5}function fr(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function El(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${fr(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${fr(n)})`}function wt(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=Nn(),a=ue(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];Rr(r);const i=new Map;r.forEach(l=>{const u=bl(l),p=Zn(u);if(!p||!u)return;const f=bt(l),m=Sl(f),y=i.get(p);if(!y){i.set(p,{normalized:p,value:u,bestItem:l,bestStatus:f,bestPriority:m,statuses:new Set([f])});return}y.statuses.add(f),m<y.bestPriority&&(y.bestItem=l,y.bestStatus=f,y.bestPriority=m,y.value=u)}),Jn=new Map;const d=Array.from(i.values()).sort((l,u)=>l.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(l=>{Jn.set(l.normalized,l.bestItem);const u=El(l),p=Yn(l.value);if(u===l.value)return`<option value="${p}"></option>`;const f=Yn(u);return`<option value="${p}" label="${f}"></option>`}).join("");e&&(e.innerHTML=d),t&&(t.innerHTML=d)}function ui(e,t,n={}){const{silent:a=!1}=n,s=te(e);if(!s)return{success:!1,message:null};const{start:r,end:i}=Ut();if(!r||!i){const y=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||S(y),{success:!1,message:y}}const c=ot();if(Fs(c).has(s)){const y=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||S(y),{success:!1,message:y}}const l=vs(s,r,i);if(l.length){const y=l.map(b=>b.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${y}`);return a||S(g),{success:!1,message:g}}if(it(s,r,i)){const y=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||S(y),{success:!1,message:y}}const u=ma(s);if(!u){const y=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||S(y),{success:!1,message:y}}const p=bt(u);if(p==="maintenance"||p==="retired"){const y=Mt(p);return a||S(y),{success:!1,message:y}}const f=zt(u);if(!f){const y=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||S(y),{success:!1,message:y}}ca({id:f,equipmentId:f,barcode:s,desc:u.desc,qty:1,price:u.price,image:Ot(u)}),t&&(t.value=""),ht(),le();const m=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||S(m),{success:!0,message:m,barcode:s}}function Za(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=li(t);if(!n){S(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=Kc(n.barcode),s=bt(a||n);if(s==="maintenance"||s==="retired"){S(Mt(s));return}const r=te(n.barcode);if(!r){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=zt(n);if(!i){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Ot(n)},{start:d,end:l}=Ut();if(!d||!l){S(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=ot();if(Fs(u).has(r)){S(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const f=vs(r,d,l);if(f.length){const m=f.map(y=>y.name).join(", ");S(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`));return}if(it(r,d,l)){S(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}ca(c),ht(),le(),S(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function xl(){wt();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Za(e))});const t=()=>{di(e.value,"equipment-description-options")&&Za(e)};e.addEventListener("focus",()=>{if(wt(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function yr(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function Fs(e=ot()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=te(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const r=te(s?.normalizedBarcode??s?.barcode);r&&t.add(r)})}),t}function wl(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=Ut();if(!t||!n){S(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}Rc({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):S(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(rn.change,t=>{yr(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),yr(e,Ur()))}function Al(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,r=a.length?a:t.barcode?[t.barcode]:[];if(!r.length)return;let i=0,c=null;const d=[],l=new Set;r.forEach(p=>{const f=te(p);f&&!l.has(f)&&(l.add(f),d.push(f))});const u=Math.min(s,d.length);for(let p=0;p<u;p+=1){const f=d[p],m=ui(f,null,{silent:!0});m.success&&(i+=1),m.message&&(c=m.message)}if(i>0){const f=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",h(String(i)));S(f)}else c&&S(c)}function mi(){wl(),!(dr||typeof document>"u")&&(document.addEventListener(rn.requestAdd,Al),dr=!0)}function jn(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),r=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:r}}function es(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=jn();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const r=document.getElementById("equipment-barcode"),i=document.getElementById("equipment-description"),c=t==="package";r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),xc(t),t==="package"&&qa()}function qa(){const{packageSelect:e,packageHint:t}=jn();if(!e)return;const n=jr();ei=n,pc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,r=n.map(c=>{const d=Number.isFinite(Number(c.price))?Number(c.price):0,l=h(d.toFixed(2)),u=`${c.name} — ${l} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${r}`,e.selectedIndex=0;const i=n.length>0;e.disabled=!i,t&&(i?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),yi()}function Il(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:r,blockingPackages:i})=>{const c=r?.desc||h(String(r?.barcode??r?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(i)&&i.length){const d=i.map(l=>l.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${d})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function pi(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const r=wn(e);if(!r)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const i=gl(r);if(!i)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(m=>m?.type==="package"&&wn(m.packageId)===r))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(fc(r,n,a,s)){const m=i.name||r;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${m} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(i.items)&&i.items.length?i.items:hs(i.raw??{}),d=Fs(t),l=[],u=new Set;if(c.forEach(m=>{const y=te(m?.normalizedBarcode??m?.barcode);if(y){if(u.has(y)){l.push({item:m,type:"internal"});return}u.add(y),d.has(y)&&l.push({item:m,type:"external"})}}),l.length){const m=l.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>h(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:l.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",m):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",m),duplicates:l}}const p=[];return c.forEach(m=>{const y=te(m?.normalizedBarcode??m?.barcode);if(y&&it(y,n,a,s)){const g=vs(y,n,a,s);p.push({item:m,blockingPackages:g})}}),p.length?{success:!1,reason:"item_conflict",message:Il(i,p),conflicts:p}:{success:!0,package:{id:`package::${r}`,packageId:r,type:"package",desc:i.name||`Package ${r}`,qty:1,price:Number.isFinite(Number(i.price))?Number(i.price):0,barcode:i.code||i.raw?.package_code||`pkg-${r}`,packageItems:c.map(m=>({equipmentId:m?.equipmentId??null,barcode:m?.barcode??m?.normalizedBarcode??"",normalizedBarcode:te(m?.normalizedBarcode??m?.barcode),desc:m?.desc??"",qty:Number.isFinite(Number(m?.qty))?Number(m.qty):1,price:Number.isFinite(Number(m?.price))?Number(m.price):0})),image:c.find(m=>m?.image)?.image??null},packageInfo:i}}function fi(e,{silent:t=!1}={}){const n=wn(e);if(!n)return t||S(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=Ut(),r=ot(),i=pi(n,{existingItems:r,start:a,end:s});if(!i.success){if(!t){const d={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[i.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");S(i.message||d)}return i}return ca(i.package),ht(),le(),t||S(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:i.package}}function yi(){const{packageSelect:e}=jn();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;fi(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function kl(){const{packageAddButton:e,packageSelect:t}=jn();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){S(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}fi(n)}),e.dataset.listenerAttached="true")}function gi(){const{modeRadios:e}=jn();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&es(s.target.value)}),a.dataset.listenerAttached="true")}),kl(),yi();const t=Un(),n=e.find(a=>a.value===t);n&&(n.checked=!0),es(t)}function ht(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=ot(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),d=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const l=an(n);t.innerHTML=l.map(u=>{const p=u.items[0]||{},f=Ot(p)||u.image,m=f?`<img src="${f}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',y=h(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,b=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,w=`${h(g.toFixed(2))} ${s}`,v=`${h(b.toFixed(2))} ${s}`,k=u.items.some(x=>x?.type==="package"),F=u.barcodes.map(x=>h(String(x||""))).filter(Boolean),V=F.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${F.map(x=>`<li>${x}</li>`).join("")}
            </ul>
          </details>`:"";let q="";if(k){const x=new Map;if(u.items.forEach(_=>{Array.isArray(_?.packageItems)&&_.packageItems.forEach(N=>{if(!N)return;const D=te(N.barcode||N.desc||Math.random()),$=x.get(D);if($){$.qty+=Number.isFinite(Number(N.qty))?Number(N.qty):1;return}x.set(D,{desc:N.desc||N.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(N.qty))?Number(N.qty):1,barcode:N.barcode??N.normalizedBarcode??""})})}),x.size){const _=Array.from(x.values()).map(N=>{const D=h(String(N.qty)),$=N.desc||h(String(N.barcode||"")),B=N.barcode?` <span class="reservation-package-items__barcode">(${h(String(N.barcode))})</span>`:"";return`<li>${$}${B} × ${D}</li>`}).join("");q=`
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
                ${k?`${q||""}${V||""}`:V}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${c}" ${k?"disabled":""}>−</button>
              <span class="reservation-qty-value">${y}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${i}" ${k?"disabled":""}>+</button>
            </div>
          </td>
          <td>${w}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${d}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function _l(e){const t=ot(),a=an(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(vc(s),ht(),le())}function $l(e){const t=ot(),n=t.filter(a=>la(a)!==e);n.length!==t.length&&(Lr(n),ht(),le())}function Pl(e){const t=ot(),a=an(t).find(p=>p.key===e);if(!a)return;const{start:s,end:r}=Ut();if(!s||!r){S(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(p=>te(p.barcode))),{equipment:c=[]}=ue(),d=(c||[]).find(p=>{const f=te(p?.barcode);return!f||i.has(f)||la({desc:p?.desc||p?.description||p?.name||"",price:Number(p?.price)||0})!==e||!ks(p)?!1:!it(f,s,r)});if(!d){S(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const l=te(d.barcode),u=zt(d);if(!u){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}ca({id:u,equipmentId:u,barcode:l,desc:d.desc||d.description||d.name||a.description||"",qty:1,price:Number.isFinite(Number(d.price))?Number(d.price):a.unitPrice,image:Ot(d)}),ht(),le()}function le(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),d=c?.value||"unpaid",{start:l,end:u}=Ut();i&&Je();const p=en(),f=document.getElementById("res-payment-progress-type"),m=document.getElementById("res-payment-progress-value"),y=ni(f),g=ai(m);ir({selectedItems:ot(),discount:n,discountType:s,applyTax:i,paidStatus:d,paymentProgressType:y,paymentProgressValue:g,start:l,end:u,companySharePercent:p,paymentHistory:[]});const b=ir.lastResult;b?(si(m,b.paymentProgressValue),c&&(c.value=b.paymentStatus,Ve(c,b.paymentStatus))):Ve(c,d)}function Tl(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=h(c.target.value),le()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",le),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(Oe()){n.checked=!1,S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ya("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(Oe()){a.checked=!1,S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ya("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(Oe()){s.value="unpaid",Ve(s,"unpaid"),S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ve(s),le()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(Oe()){r.value="percent",S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",le()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(Oe()){i.value="",S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=h(c.target.value),le()}),i.dataset.listenerAttached="true"),le()}function Nl(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){le();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),le()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function gr(){const{input:e,hidden:t}=Ns(),{input:n,hidden:a}=Vt(),{customers:s}=ue();let r=t?.value?String(t.value):"";if(!r&&e?.value){const X=Xa(e.value,{allowPartial:!0});X&&(r=String(X.id),t&&(t.value=r),e.value=X.label,e.dataset.selectedId=r)}const i=s.find(X=>String(X.id)===r);if(!i){S(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let d=a?.value?String(a.value):"";if(!d&&n?.value){const X=Ja(n.value,{allowPartial:!0});X&&(d=String(X.id),a&&(a.value=d),n.value=X.label,n.dataset.selectedId=d)}const l=document.getElementById("res-start").value,u=document.getElementById("res-end").value,p=document.getElementById("res-start-time")?.value||"00:00",f=document.getElementById("res-end-time")?.value||"00:00";if(!l||!u){S(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${l}T${p}`,y=`${u}T${f}`,g=new Date(m),b=new Date(y);if(Number.isNaN(g.getTime())||Number.isNaN(b.getTime())||g>=b){S(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const w=qc(),v=ot();if(v.length===0&&w.length===0){S(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const k=document.getElementById("res-notes")?.value||"",F=parseFloat(h(document.getElementById("res-discount")?.value))||0,V=document.getElementById("res-discount-type")?.value||"percent",q=document.getElementById("res-payment-status"),x=q?.value||"unpaid",_=document.getElementById("res-payment-progress-type"),N=document.getElementById("res-payment-progress-value"),D=ni(_),$=ai(N),B=d?Cs(d):null,K=hl(B);if(d&&!B){S(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const X of v){const re=bt(X.barcode);if(re==="maintenance"||re==="retired"){S(Mt(re));return}}for(const X of v){const re=te(X.barcode);if(it(re,m,y)){S(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const X of w)if(Br(X,m,y)){S(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const P=document.getElementById("res-tax"),j=document.getElementById("res-company-share"),A=!!d;A?(P&&(P.checked=!1,P.disabled=!0,P.classList.add("disabled"),P.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),j&&(j.checked=!1,j.disabled=!0,j.classList.add("disabled"),j.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),q&&(q.value="unpaid",q.disabled=!0,Ve(q,"unpaid"),q.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),_&&(_.disabled=!0,_.classList.add("disabled")),N&&(N.value="",N.disabled=!0,N.classList.add("disabled"))):(P&&(P.disabled=!1,P.classList.remove("disabled"),P.title=""),j&&(j.disabled=!1,j.classList.remove("disabled"),j.title=""),q&&(q.disabled=!1,q.title=""),_&&(_.disabled=!1,_.classList.remove("disabled")),N&&(N.disabled=!1,N.classList.remove("disabled")));const G=A?!1:P?.checked||!1,z=!!j?.checked;if(!A&&z!==G){S(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let I=z?en():null;z&&(!Number.isFinite(I)||I<=0)&&(Je(),I=en());const O=z&&G&&Number.isFinite(I)&&I>0;G&&Je();const R=qs(v,F,V,G,w,{start:m,end:y,companySharePercent:O?I:0}),M=uc(),H=Ss({totalAmount:R,progressType:D,progressValue:$,history:[]});N&&si(N,H.paymentProgressValue);const ne=[];H.paymentProgressValue!=null&&H.paymentProgressValue>0&&ne.push({type:H.paymentProgressType||D,value:H.paymentProgressValue,amount:H.paidAmount,percentage:H.paidPercent,recordedAt:new Date().toISOString()});const ee=Es({manualStatus:x,paidAmount:H.paidAmount,paidPercent:H.paidPercent,totalAmount:R});q&&(q.value=ee,Ve(q,ee));const oe=Fr({reservationCode:M,customerId:c,start:m,end:y,status:K?"confirmed":"pending",title:null,location:null,notes:k,projectId:d||null,totalAmount:R,discount:A?0:F,discountType:A?"percent":V,applyTax:G,paidStatus:A?"unpaid":ee,confirmed:K,items:v.map(X=>({...X,equipmentId:X.equipmentId??X.id})),technicians:w,companySharePercent:A||!O?null:I,companyShareEnabled:A?!1:O,paidAmount:A?0:H.paidAmount,paidPercentage:A?0:H.paidPercent,paymentProgressType:A?null:H.paymentProgressType,paymentProgressValue:A?null:H.paymentProgressValue,paymentHistory:A?[]:ne});try{const X=await Sc(oe);Nn(),wt(),Pn(),Ll(),S(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Qa=="function"&&Qa({type:"created",reservation:X}),jl(X)}catch(X){console.error("❌ [reservations/createForm] Failed to create reservation",X);const re=da(X)?X.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");S(re,"error"),A&&(S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),vn({clearValue:!1}))}}function jl(e){if(!Hn)return;const{draftStorageKey:t=Jr,returnUrl:n=Yr}=Hn,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}Hn=null,n&&(window.location.href=n)}function vn({clearValue:e=!1}={}){const{input:t,hidden:n}=Vt();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,xt())}function Cl(e,t=""){const{input:n,hidden:a}=Vt();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),xt())}function Ll(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),ft({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),vn({clearValue:!1}),tn({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",Ve(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),Ec(),Lr([]),Qn("form-reset"),ht(),xt(),le()}function Bl(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){_l(s);return}if(a==="increase-group"&&s){Pl(s);return}if(a==="remove-group"&&s){$l(s);return}}),e.dataset.listenerAttached="true")}function Fl(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(Un()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,ui(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||Un()!=="single")return;const{start:r,end:i}=Ut();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function Dl(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await gr()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await gr()}),t.dataset.listenerAttached="true")}function Zu({onAfterSubmit:e}={}){Qa=typeof e=="function"?e:null;const{customers:t,projects:n}=ue();hc(t||[]),ft(),Bs(),ii(n||[]),ci({projectsList:n}),Ls(),wt(),qa(),xl(),mi(),gi(),Nl(),Tl(),Bl(),Fl(),Dl(),vl(),le(),ht()}function bi(){wt(),qa(),ci(),ft(),Bs(),Ls(),mi(),gi(),ht(),le()}if(typeof document<"u"){const e=()=>{ft(),tn({projectsList:js()}),Bs(),Ls(),le()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{wt()}),document.addEventListener("packages:changed",()=>{qa(),Un()==="package"&&es("package")})}typeof window<"u"&&(window.getCompanySharePercent=en);function hi(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:Tt(t),endDate:Tt(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:Tt(n),endDate:Tt(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Tt(n),endDate:Tt(a)}}return e==="upcoming"?{startDate:Tt(t),endDate:""}:{startDate:"",endDate:""}}function Rl(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=h(t?.value||"").trim(),i=h(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),ta(t),ta(n),r="",i=""),!r&&!i&&c){const l=hi(c);r=l.startDate,i=l.endDate}return{searchTerm:Re(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function em(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{Ml(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),ta(a),ta(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function Ml(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=hi(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function Tt(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function ta(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function Fn(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function Hl(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function zl(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=Hl(n);if(a!==null)return a}return null}function br(e,t=0){const n=zl(e);if(n!=null)return n;const a=Fn(e.createdAt??e.created_at);if(a!=null)return a;const s=Fn(e.updatedAt??e.updated_at);if(s!=null)return s;const r=Fn(e.start);if(r!=null)return r;const i=Fn(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function Ol({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((v,k)=>({reservation:v,index:k})),i=t.searchTerm||"",c=t.searchReservationId||"",d=t.searchCustomerName||"",l=t.searchProjectId||"",u=t.startDate||"",p=t.endDate||"",f=t.status||"",m=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,y=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,b=p?new Date(`${p}T23:59:59`):null,w=r.filter(({reservation:v})=>{const k=n.get(String(v.customerId)),F=s?.get?.(String(v.projectId)),V=v.start?new Date(v.start):null,q=xs(v),{effectiveConfirmed:x}=At(v,F);if(m!=null&&String(v.customerId)!==String(m)||y!=null&&!(Array.isArray(v.technicians)?v.technicians.map(B=>String(B)):[]).includes(String(y))||f==="confirmed"&&!x||f==="pending"&&x||f==="completed"&&!q||g&&V&&V<g||b&&V&&V>b)return!1;if(c){const $=[v.reservationId,v.id,v.reservation_id,v.reservationCode,v.reservation_code,v.code,v.reference,v.referenceNumber,v.reference_number],B=Re($.filter(P=>P!=null&&P!=="").map(String).join(" ")).replace(/\s+/g,""),K=c.replace(/\s+/g,"");if(!B.includes(K))return!1}if(d&&!Re(k?.customerName||"").includes(d))return!1;if(l){const $=[v.projectId,v.project_id,v.projectID,F?.id,F?.projectCode,F?.project_code],B=Re($.filter(P=>P!=null&&P!=="").map(String).join(" ")).replace(/\s+/g,""),K=l.replace(/\s+/g,"");if(!B.includes(K))return!1}if(!i)return!0;const _=v.items?.map?.($=>`${$.barcode} ${$.desc}`).join(" ")||"",N=(v.technicians||[]).map($=>a.get(String($))?.name).filter(Boolean).join(" ");return Re([v.reservationId,k?.customerName,v.notes,_,N,F?.title].filter(Boolean).join(" ")).includes(i)});return w.sort((v,k)=>{const F=br(v.reservation,v.index),V=br(k.reservation,k.index);return F!==V?V-F:k.index-v.index}),w}function Vl({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),d=o("reservations.list.itemsCountShort","{count} عنصر"),l=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),p=o("reservations.list.status.pending","⏳ غير مؤكد"),f=o("reservations.list.payment.paid","💳 مدفوع"),m=o("reservations.list.payment.unpaid","💳 غير مدفوع"),y=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),g=o("reservations.list.actions.confirm","✔️ تأكيد"),b=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),w=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),v={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:k,index:F})=>{const V=t.get(String(k.customerId)),q=k.projectId?a?.get?.(String(k.projectId)):null,x=xs(k),_=k.paidStatus??k.paid_status??(k.paid===!0||k.paid==="paid"?"paid":"unpaid"),N=_==="paid",D=_==="partial",{effectiveConfirmed:$,projectLinked:B}=At(k,q),K=$?"status-confirmed":"status-pending",P=N?"status-paid":D?"status-partial":"status-unpaid";let j=`<span class="reservation-chip status-chip ${K}">${$?u:p}</span>`;const A=N?f:D?y:m;let G=`<span class="reservation-chip status-chip ${P}">${A}</span>`,z=N?" tile-paid":D?" tile-partial":" tile-unpaid";x&&(z+=" tile-completed");let I="";x&&(j=`<span class="reservation-chip status-chip status-completed">${u}</span>`,G=`<span class="reservation-chip status-chip status-completed">${A}</span>`,I=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const O=!B&&!$?`<button class="tile-confirm" data-reservation-index="${F}" data-action="confirm">${g}</button>`:"",R=O?`<div class="tile-actions">${O}</div>`:"",M=k.items?.length||0,H=(k.technicians||[]).map(fe=>n.get(String(fe))).filter(Boolean),ne=H.map(fe=>fe.name).join(l)||"—",ee=h(String(k.reservationId??"")),oe=k.start?h(Ue(k.start)):"-",X=k.end?h(Ue(k.end)):"-",re=h(String(k.cost??0)),he=h(String(M)),ve=k.notes?h(k.notes):c,$e=d.replace("{count}",he),U=k.applyTax?`<small>${r}</small>`:"";let Z=b;return k.projectId&&(Z=q?.title?h(q.title):w),`
      <div class="${O?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${z}"${I} data-reservation-index="${F}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${ee}</div>
          <div class="tile-badges">
            ${j}
            ${G}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${v.client}</span>
            <span class="tile-value">${V?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.project}</span>
            <span class="tile-value">${Z}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.start}</span>
            <span class="tile-value tile-inline">${oe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.end}</span>
            <span class="tile-value tile-inline">${X}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.cost}</span>
            <span class="tile-value">${re} ${s} ${U}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.equipment}</span>
            <span class="tile-value">${$e}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.crew}</span>
            <span class="tile-value">${H.length?ne:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${ve}</span>
          </div>
        </div>
        ${R}
      </div>
    `}).join("")}function De(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ul(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=At(e,s),c=e.paid===!0||e.paid==="paid",d=xs(e),l=e.items||[],{groups:u}=ws(e),{technicians:p=[]}=ue(),f=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(p)?p:[]),m=new Map;f.forEach(T=>{if(!T||T.id==null)return;const Q=String(T.id),xe=m.get(Q)||{};m.set(Q,{...xe,...T})});const y=(e.technicians||[]).map(T=>m.get(String(T))).filter(Boolean),g=Ht(),b=ua(e.start,e.end),w=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,v=ut(w),k=Number.isFinite(v)?v:0,F=e.discountType??e.discount_type??e.discountMode??"percent",V=String(F).toLowerCase()==="amount"?"amount":"percent",q=r?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),x=ut(e.cost??e.total??e.finalTotal),_=Number.isFinite(x),N=_?Ie(x):0,D=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,$=D!=null?ut(D):Number.NaN;let P=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite($)&&$>0)&&Number.isFinite($)?$:0;q&&P<=0&&(P=gt);const j=wc({items:l,technicianIds:e.technicians||[],discount:k,discountType:V,applyTax:q,start:e.start,end:e.end,companySharePercent:P}),A=Ie(j.equipmentTotal),G=Ie(j.crewTotal);Ie(j.crewCostTotal);const z=Ie(j.discountAmount),I=Ie(j.subtotalAfterDiscount),O=Number.isFinite(j.companySharePercent)?j.companySharePercent:0;let R=Ie(j.companyShareAmount);R=O>0?Ie(Math.max(0,R)):0;const M=Ie(j.taxAmount),H=Ie(j.finalTotal),ne=r?H:_?N:H,ee=Ie(j.netProfit),oe=h(String(e.reservationId??e.id??"")),X=e.start?h(Ue(e.start)):"-",re=e.end?h(Ue(e.end)):"-",he=h(String(y.length)),ve=h(A.toFixed(2)),$e=h(z.toFixed(2)),U=h(I.toFixed(2)),Z=h(M.toFixed(2)),se=h((Number.isFinite(ne)?ne:0).toFixed(2)),fe=h(String(b)),me=o("reservations.create.summary.currency","SR"),Ye=o("reservations.details.labels.discount","الخصم"),Y=o("reservations.details.labels.tax","الضريبة (15%)"),be=o("reservations.details.labels.crewTotal","إجمالي الفريق"),L=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),ae=o("reservations.details.labels.duration","عدد الأيام"),pe=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),ce=o("reservations.details.labels.netProfit","💵 صافي الربح"),ye=o("reservations.create.equipment.imageAlt","صورة"),qe={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},Ce=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),Ge=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),Ze=o("reservations.details.technicians.roleUnknown","غير محدد"),Qt=o("reservations.details.technicians.phoneUnknown","غير متوفر"),ln=o("reservations.details.technicians.wage","{amount} {currency} / اليوم"),Gt=o("reservations.list.status.confirmed","✅ مؤكد"),J=o("reservations.list.status.pending","⏳ غير مؤكد"),Ee=o("reservations.list.payment.paid","💳 مدفوع"),et=o("reservations.list.payment.unpaid","💳 غير مدفوع"),lt=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),_a=o("reservations.list.status.completed","📁 منتهي"),$a=o("reservations.details.labels.id","🆔 رقم الحجز"),Pa=o("reservations.details.section.bookingInfo","بيانات الحجز"),dn=o("reservations.details.section.paymentSummary","ملخص الدفع"),Wt=o("reservations.details.labels.finalTotal","المجموع النهائي"),vo=o("reservations.details.section.crew","😎 الفريق الفني"),qo=o("reservations.details.crew.count","{count} عضو"),So=o("reservations.details.section.items","📦 المعدات المرتبطة"),Eo=o("reservations.details.items.count","{count} عنصر"),xo=o("reservations.details.actions.edit","✏️ تعديل"),wo=o("reservations.details.actions.delete","🗑️ حذف"),Ao=o("reservations.details.labels.customer","العميل"),Io=o("reservations.details.labels.contact","رقم التواصل"),ko=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const _o=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),$o=o("reservations.details.actions.openProject","📁 فتح المشروع"),Po=o("reservations.details.labels.start","بداية الحجز"),To=o("reservations.details.labels.end","نهاية الحجز"),No=o("reservations.details.labels.notes","ملاحظات"),jo=o("reservations.list.noNotes","لا توجد ملاحظات"),Co=o("reservations.details.labels.itemsCount","عدد المعدات"),Lo=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),Bo=o("reservations.paymentHistory.title","سجل الدفعات"),Fo=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Do=o("reservations.list.unknownCustomer","غير معروف"),Ta=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),Js=Ta==="partial",Ro=Ta==="paid"?Ee:Js?lt:et;function Na(T){if(T==null)return Number.NaN;if(typeof T=="number")return Number.isFinite(T)?T:Number.NaN;const Q=String(T).replace(/[^0-9.+-]/g,""),xe=Number(Q);return Number.isFinite(xe)?xe:Number.NaN}const Ys=(T={})=>{const Q=String(T.type??T.kind??T.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(Q)||Array.isArray(T.packageItems)&&T.packageItems.length)},Mo=(T={})=>[T.packageId,T.package_id,T.packageCode,T.package_code,T.bundleId,T.bundle_id].some(Q=>Q!=null&&Q!==""),Ho=(T={})=>!T||typeof T!="object"?!1:!Ys(T)&&Mo(T),Zs=(T={})=>{const Q=Ys(T),xe=[{value:T.qty,key:"qty",limit:999},{value:T.quantity,key:"quantity",limit:999},{value:T.units,key:"units",limit:999},{value:T.count,key:"count",limit:50},{value:T.package_quantity,key:"package_quantity",limit:999},{value:T.packageQty,key:"packageQty",limit:999},{value:T.packageCount,key:"packageCount",limit:999}];let He=NaN;for(const Pe of xe){if(Pe.value==null||Pe.value==="")continue;const tt=typeof Pe.value=="string"?Pe.value.trim():String(Pe.value??"");if(Pe.key==="count"&&tt.length>6)continue;const je=Na(Pe.value);if(!Number.isFinite(je)||je<=0)continue;const Ln=Math.round(je);if(!(Ln>Pe.limit)){He=Math.max(1,Ln);break}}return(!Number.isFinite(He)||He<=0)&&(He=1),Q?Math.max(1,Math.min(99,He)):Math.max(1,Math.min(9999,He))};let Ne=(Array.isArray(l)?l:[]).reduce((T,Q)=>!Q||typeof Q!="object"||Ho(Q)?T:T+Zs(Q),0);Ne<=0&&Array.isArray(u)&&u.length&&(Ne=u.reduce((T,Q)=>{const xe=Zs({...Q,type:Q.type});return T+xe},0)),!Number.isFinite(Ne)||Ne<=0?Ne=Array.isArray(u)&&u.length?u.length:(Array.isArray(l)?l.length:0)||1:Ne>1e6&&(Ne=Math.min(Ne,Array.isArray(u)?u.length:Ne),(!Number.isFinite(Ne)||Ne<=0)&&(Ne=(Array.isArray(l)?l.length:0)||1)),Ne=Math.max(1,Math.round(Ne));const zo=h(String(Ne)),er=Eo.replace("{count}",zo),Oo=qo.replace("{count}",he),Vo=e.notes?h(e.notes):jo,Uo=h(G.toFixed(2)),Ko=h(String(O)),Qo=h(R.toFixed(2)),Go=`${Ko}% (${Qo} ${me})`,Wo=Number.isFinite(ee)?Math.max(0,ee):0,Xo=h(Wo.toFixed(2)),vt=[{icon:"💼",label:Lo,value:`${ve} ${me}`}];vt.push({icon:"😎",label:be,value:`${Uo} ${me}`}),z>0&&vt.push({icon:"💸",label:Ye,value:`${$e} ${me}`}),vt.push({icon:"📊",label:L,value:`${U} ${me}`}),q&&M>0&&vt.push({icon:"🧾",label:Y,value:`${Z} ${me}`}),O>0&&vt.push({icon:"🏦",label:pe,value:Go}),vt.push({icon:"💵",label:ce,value:`${Xo} ${me}`}),vt.push({icon:"💰",label:Wt,value:`${se} ${me}`});const Jo=vt.map(({icon:T,label:Q,value:xe})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${T} ${Q}</span>
      <span class="summary-details-value">${xe}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let un=[];Array.isArray(e.paymentHistory)?un=e.paymentHistory:Array.isArray(e.payment_history)&&(un=e.payment_history);const Yo=Array.isArray(e.paymentLogs)?e.paymentLogs:[],tr=Array.isArray(un)&&un.length>0?un:Yo,Zo=tr.length?`<ul class="reservation-payment-history-list">${tr.map(T=>{const Q=T?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):T?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),xe=Number.isFinite(Number(T?.amount))&&Number(T.amount)>0?`${h(Number(T.amount).toFixed(2))} ${me}`:"—",He=Number.isFinite(Number(T?.percentage))&&Number(T.percentage)>0?`${h(Number(T.percentage).toFixed(2))}%`:"—",Pe=T?.recordedAt?h(Ue(T.recordedAt)):"—",tt=T?.note?`<div class="payment-history-note">${De(h(T.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${De(Q)}</span>
              <span class="payment-history-entry__amount">${xe}</span>
              <span class="payment-history-entry__percent">${He}</span>
              <span class="payment-history-entry__date">${Pe}</span>
            </div>
            ${tt}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${De(Fo)}</div>`,nr=[{text:i?Gt:J,className:i?"status-confirmed":"status-pending"},{text:Ro,className:Ta==="paid"?"status-paid":Js?"status-partial":"status-unpaid"}];d&&nr.push({text:_a,className:"status-completed"});const ec=nr.map(({text:T,className:Q})=>`<span class="status-chip ${Q}">${T}</span>`).join(""),$t=(T,Q,xe)=>`
    <div class="res-info-row">
      <span class="label">${T} ${Q}</span>
      <span class="value">${xe}</span>
    </div>
  `;let ja="";if(e.projectId){let T=De(_o);if(s){const Q=s.title||o("projects.fallback.untitled","مشروع بدون اسم");T=`${De(Q)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${De($o)}</button>`}ja=`
      <div class="res-info-row">
        <span class="label">📁 ${ko}</span>
        <span class="value">${T}</span>
      </div>
    `}const dt=[];dt.push($t("👤",Ao,t?.customerName||Do)),dt.push($t("📞",Io,t?.phone||"—")),dt.push($t("🗓️",Po,X)),dt.push($t("🗓️",To,re)),dt.push($t("📦",Co,er)),dt.push($t("⏱️",ae,fe)),dt.push($t("📝",No,Vo)),ja&&dt.push(ja);const tc=dt.join(""),nc=u.length?u.map(T=>{const Q=T.items[0]||{},xe=Ot(Q)||T.image,He=xe?`<img src="${xe}" alt="${ye}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',Pe=T.items.some(ge=>ge?.type==="package"),tt=(ge,{fallback:ze=1,max:Te=1e3}={})=>{const de=Na(ge);return Number.isFinite(de)&&de>0?Math.min(Te,de):ze};let je;if(Pe){const ge=tt(Q?.qty??Q?.quantity??Q?.count,{fallback:NaN,max:999});Number.isFinite(ge)&&ge>0?je=ge:je=tt(T.quantity??T.count??1,{fallback:1,max:999})}else je=tt(T.quantity??T.count??Q?.qty??Q?.quantity??Q?.count??0,{fallback:1,max:9999});const Ln=h(String(je)),Ca=(ge,{preferPositive:ze=!1}={})=>{let Te=Number.NaN;for(const de of ge){const we=ut(de);if(Number.isFinite(we)){if(ze&&we>0)return we;Number.isFinite(Te)||(Te=we)}}return Te};let Ae,We;if(Pe){const ge=[Q?.price,Q?.unit_price,Q?.unitPrice,T.unitPrice];if(Ae=Ca(ge,{preferPositive:!0}),!Number.isFinite(Ae)||Ae<0){const Te=ut(T.totalPrice??Q?.total??Q?.total_price);Number.isFinite(Te)&&je>0&&(Ae=Te/je)}Number.isFinite(Ae)||(Ae=0);const ze=[Q?.total,Q?.total_price,T.totalPrice];if(We=Ca(ze),!Number.isFinite(We))We=Ae*je;else{const Te=Ae*je;Number.isFinite(Te)&&Te>0&&Math.abs(We-Te)>Te*.25&&(We=Te)}}else{const ge=[Q?.price,Q?.unit_price,Q?.unitPrice,T.unitPrice];if(Ae=Ca(ge,{preferPositive:!0}),!Number.isFinite(Ae)||Ae<0){const ze=ut(T.totalPrice??Q?.total??Q?.total_price);Number.isFinite(ze)&&je>0&&(Ae=ze/je)}Number.isFinite(Ae)||(Ae=0),We=ut(T.totalPrice??Q?.total??Q?.total_price),Number.isFinite(We)||(We=Ae*je)}Ae=Ie(Ae),We=Ie(We);const ic=`${h(Ae.toFixed(2))} ${me}`,oc=`${h(We.toFixed(2))} ${me}`,ar=T.barcodes.map(ge=>h(String(ge||""))).filter(Boolean),sr=ar.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${ar.map(ge=>`<li>${ge}</li>`).join("")}
              </ul>
            </details>`:"";let rr="";if(Pe){const ge=new Map,ze=[];Array.isArray(T.packageItems)&&T.packageItems.length&&ze.push(...T.packageItems),T.items.forEach(de=>{Array.isArray(de?.packageItems)&&de.packageItems.length&&ze.push(...de.packageItems)});const Te=de=>{const we=Na(de?.qtyPerPackage??de?.perPackageQty??de?.quantityPerPackage);return Number.isFinite(we)&&we>0&&we<=99?Math.round(we):1};if(ze.forEach(de=>{if(!de)return;const we=te(de.barcode||de.normalizedBarcode||de.desc||Math.random());if(!we)return;const mn=ge.get(we),Xt=Te(de);if(mn){mn.qty=Xt,mn.total=Xt;return}ge.set(we,{desc:de.desc||de.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(Xt,99)),total:Math.max(1,Math.min(Xt,99)),barcode:de.barcode??de.normalizedBarcode??""})}),ge.size){const de=Array.from(ge.values()).map(we=>{const mn=h(String(we.qty>0?Math.min(we.qty,99):1)),Xt=De(we.desc||""),lc=we.barcode?` <span class="reservation-package-items__barcode">(${De(h(String(we.barcode)))})</span>`:"";return`<li>${Xt}${lc} × ${mn}</li>`}).join("");rr=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${de}
                </ul>
              </details>
            `}}const cc=Pe?`${rr||""}${sr||""}`:sr;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${He}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${De(Q.desc||Q.description||Q.name||T.description||"-")}</div>
                  ${cc}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${De(qe.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Ln}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${De(qe.unitPrice)}">${ic}</td>
            <td class="reservation-modal-items-table__cell" data-label="${De(qe.total)}">${oc}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${De(qe.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${Ce}</td></tr>`,ac=`
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
        <tbody>${nc}</tbody>
      </table>
    </div>
  `,sc=y.map((T,Q)=>{const xe=h(String(Q+1)),He=T.role||Ze,Pe=T.phone||Qt,tt=T.wage?ln.replace("{amount}",h(String(T.wage))).replace("{currency}",me):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${xe}</span>
          <span class="technician-name">${T.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${He}</div>
          <div>📞 ${Pe}</div>
          ${tt?`<div>💰 ${tt}</div>`:""}
        </div>
      </div>
    `}).join(""),rc=y.length?`<div class="reservation-technicians-grid">${sc}</div>`:`<ul class="reservation-modal-technicians"><li>${Ge}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${$a}</span>
          <strong>${oe}</strong>
        </div>
        <div class="status-chips">
          ${ec}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Pa}</h6>
          ${tc}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${dn}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${Jo}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Bo}</h6>
              ${Zo}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${vo}</span>
          <span class="count">${Oo}</span>
        </div>
        ${rc}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${So}</span>
          <span class="count">${er}</span>
        </div>
        ${ac}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${xo}</button>
        ${g?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${wo}</button>`:""}
      </div>
    </div>
  `}const tm="project",nm="editProject",am=3600*1e3,vi=.15,sm=6,rm="projectsTab",im="projectsSubTab",om={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},cm={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},lm={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},Kl=`@page {
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
`,Ql=/color\([^)]*\)/gi,An=/(color\(|color-mix\(|oklab|oklch)/i,Gl=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"],Wl=typeof document<"u"?document.createElement("canvas"):null,Dn=Wl?.getContext?.("2d")||null;function qi(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function ts(e,t="#000"){if(!Dn||!e)return t;try{return Dn.fillStyle="#000",Dn.fillStyle=e,Dn.fillStyle||t}catch{return t}}function Xl(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&An.test(n)){const s=ts(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function Jt(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function dm(e=[]){if(!(!Array.isArray(e)||!e.length))for(let t=e.length-1;t>=0;t-=1){const{element:n,prop:a,value:s,priority:r}=e[t]||{};!n?.style||!a||(s&&s.length>0?n.style.setProperty(a,s,r||""):n.style.removeProperty(a))}}function Si(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;Gl.forEach(c=>{const d=r[c];if(d&&An.test(d)){const l=qi(c);Jt(n,s,l);const u=c==="backgroundColor"?"#ffffff":r.color||"#000000",p=ts(d,u);s.style.setProperty(l,p,"important")}});const i=r.backgroundImage;if(i&&An.test(i)){const c=ts(r.backgroundColor||"#ffffff","#ffffff");Jt(n,s,"background-image"),Jt(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function Ei(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(c=>{const d=r[c];if(d&&An.test(d)){const l=qi(c);Jt(n,s,l);const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(l,u,"important")}});const i=r.backgroundImage;i&&An.test(i)&&(Jt(n,s,"background-image"),Jt(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function xi(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(Ql,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const wi="reservations.quote.sequence",hr={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},Ai="https://help.artratio.sa/guide/quote-preview",_e={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Jl=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Me=[...Jl],Yl=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function ns(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...Me]}function Zl(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=ns(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=ns(t.value);if(a.length)return a}const n=Me.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...Me]}const ed=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],Ii=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>E(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>E(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>E(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>E(h(Number(e?.price||0).toFixed(2)))}],ki=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>E(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>E(e?.role||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>E(e?.phone||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],as={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:Ii.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:ki.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},_i=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>E(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>E(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>E(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],$i=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>E(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>E(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>E(e?.note||"-")}],Pi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>E(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>E(h(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>E(h(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>E(e?.displayCost||"—")}],td=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],nd={customerInfo:as.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:as.payment,projectExpenses:$i.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:_i.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:Pi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},Ra=new Map;function Sa(e="reservation"){if(Ra.has(e))return Ra.get(e);const t=e==="project"?td:ed,n=e==="project"?nd:as,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(d=>d.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return Ra.set(e,r),r}function Ea(e="reservation"){return Sa(e).sectionDefs}function Ti(e="reservation"){return Sa(e).fieldDefs}function Ni(e="reservation"){return Sa(e).sectionIdSet}function ji(e="reservation"){return Sa(e).fieldIdMap}function Ci(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const ad="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",sd="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",rd="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",Li=Kl.trim(),Bi=/^data:image\/svg\+xml/i,id=/\.svg($|[?#])/i,bn=512,ss="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",Fi=96,Di=25.4,rs=210,zn=297,On=Math.round(rs/Di*Fi),Vn=Math.round(zn/Di*Fi),od=2,Ri=/safari/i,cd=/(iphone|ipad|ipod)/i,vr=/(iphone|ipad|ipod)/i,ld=/(crios|fxios|edgios|opios)/i,na="[reservations/pdf]";let W=null,C=null,at=1,fn=null,yn=null,St=null,Yt=null,qn=!1;function Bt(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!W?.statusIndicator||!W?.statusText)return;W.statusKind=e;const r=t||Ci(e);W.statusText.textContent=r,W.statusSpinner&&(W.statusSpinner.hidden=!s),W.statusAction&&(W.statusAction.hidden=!0,W.statusAction.onclick=null,n&&typeof a=="function"&&(W.statusAction.textContent=n,W.statusAction.hidden=!1,W.statusAction.onclick=i=>{i.preventDefault(),a()})),W.statusIndicator.hidden=!1,requestAnimationFrame(()=>{W.statusIndicator.classList.add("is-visible")})}function Sn(e){!W?.statusIndicator||!W?.statusText||(W.statusKind=null,W.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{W?.statusIndicator&&(W.statusIndicator.hidden=!0,W.statusAction&&(W.statusAction.hidden=!0,W.statusAction.onclick=null),W.statusSpinner&&(W.statusSpinner.hidden=!1))},220))}function is(){return!!window?.bootstrap?.Modal}function dd(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),St||(St=document.createElement("div"),St.className="modal-backdrop fade show",St.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(St)),Yt||(Yt=t=>{t.key==="Escape"&&os(e)},document.addEventListener("keydown",Yt));try{e.focus({preventScroll:!0})}catch{}}}function os(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),St&&(St.remove(),St=null),Yt&&(document.removeEventListener("keydown",Yt),Yt=null))}function ud(e){if(e){if(is()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}dd(e)}}function md(){if(qn)return;qn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!W?.modal?.classList.contains("show"),s=()=>{W?.modal?.classList.contains("show")&&(Bt("render"),qn=!1,Kt())};Nr({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:Ai}),a&&Bt("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function xa(e="reservation"){const t={},n=Ti(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function Ds(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function pd(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function Rs(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function Ms(e="reservation"){return Object.fromEntries(Ea(e).map(({id:t})=>[t,!1]))}function Hs(e,t){return e.sectionExpansions||(e.sectionExpansions=Ms(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function fd(e,t){return Hs(e,t)?.[t]!==!1}function zs(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function yd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return cd.test(e)}function gd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=Ri.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Mi(){return yd()&&gd()}function wa(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=vr.test(e)||vr.test(t),s=/Macintosh/i.test(e)&&n>1;return Ri.test(e)&&!ld.test(e)&&(a||s)}function Ma(e,...t){try{console.log(`${na} ${e}`,...t)}catch{}}function yt(e,...t){try{console.warn(`${na} ${e}`,...t)}catch{}}function bd(e,t,...n){try{t?console.error(`${na} ${e}`,t,...n):console.error(`${na} ${e}`,...n)}catch{}}function Se(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function hd(e,t="لا توجد بيانات للعرض."){const n=E(o(e,t));return Se(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function aa(e,t){return Array.isArray(e)&&e.length?e:[hd(t)]}const vd=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function Hi(e=""){return vd.test(e)}function qd(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!Hi(r))return a.call(this,r,...i);let c,d=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),d=!0)}catch{}try{if(!d){const l=this.canvas;l&&l.style?.direction!=="rtl"&&(l.__artRatioOriginalDirection=l.style.direction,l.style.direction="rtl")}return a.call(this,r,...i)}finally{if(d&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!d){const l=this.canvas;l&&l.__artRatioOriginalDirection!==void 0&&(l.style.direction=l.__artRatioOriginalDirection,delete l.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function qr(e,t=bn){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Sd(e){if(!e)return{width:bn,height:bn};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?qr(t,0):0,s=n?qr(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,d]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(d)&&d>0?d:0)}}return{width:a||bn,height:s||bn}}function zi(e=""){return typeof e!="string"?!1:Bi.test(e)||id.test(e)}function Ed(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function xd(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function Oi(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await xd(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),d=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=d;const l=i.getContext("2d");return l.clearRect(0,0,c,d),l.drawImage(r,0,0,c,d),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function wd(e){if(!e)return null;if(Bi.test(e))return Ed(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Ad(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!zi(t))return!1;const n=await wd(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",ss),!1;const a=await Oi(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",ss),!1)}async function Id(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Sd(e),s=await Oi(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||ss),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),d=e.getAttribute("height");return c&&i.setAttribute("width",c),d&&i.setAttribute("height",d),e.parentNode?.replaceChild(i,e),!!s}async function Vi(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{zi(s.getAttribute?.("src"))&&a.push(Ad(s))}),n.forEach(s=>{a.push(Id(s))}),a.length&&await Promise.allSettled(a)}function kd(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(I,O=0)=>{const R=parseFloat(I);return Number.isFinite(R)?R:O},i=r(s.paddingTop),c=r(s.paddingBottom),d=r(s.paddingRight),l=r(s.paddingLeft),u=r(s.borderRadius),p=r(s.fontSize,14),f=(()=>{const I=s.lineHeight;if(!I||I==="normal")return p*1.6;const O=r(I,p*1.6);return O>0?O:p*1.6})(),m=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(m<=0)return null;const y=Math.max(1,m-l-d),g=e.textContent||"",b=g.split(/\r?\n/),w=n.createElement("canvas"),v=w.getContext("2d");if(!v)return null;const k=s.fontStyle||"normal",F=s.fontVariant||"normal",V=s.fontWeight||"400",q=s.fontFamily||"sans-serif",x=s.fontStretch||"normal",_=I=>I.join(" "),N=[],D=I=>v.measureText(I).width;v.font=`${k} ${F} ${V} ${x} ${p}px ${q}`,b.forEach(I=>{const O=I.trim();if(O.length===0){N.push("");return}const R=O.split(/\s+/);let M=[];R.forEach((H,ne)=>{const ee=H.trim();if(!ee)return;const oe=_(M.concat(ee));if(D(oe)<=y||M.length===0){M.push(ee);return}N.push(_(M)),M=[ee]}),M.length&&N.push(_(M))}),N.length||N.push("");const $=i+c+N.length*f,B=Math.ceil(Math.max(1,m)*t),K=Math.ceil(Math.max(1,$)*t);w.width=B,w.height=K,w.style.width=`${Math.max(1,m)}px`,w.style.height=`${Math.max(1,$)}px`,v.scale(t,t);const P=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){v.save(),v.beginPath();const I=Math.max(1,m),O=Math.max(1,$),R=Math.min(u,I/2,O/2);v.moveTo(R,0),v.lineTo(I-R,0),v.quadraticCurveTo(I,0,I,R),v.lineTo(I,O-R),v.quadraticCurveTo(I,O,I-R,O),v.lineTo(R,O),v.quadraticCurveTo(0,O,0,O-R),v.lineTo(0,R),v.quadraticCurveTo(0,0,R,0),v.closePath(),v.clip()}if(v.fillStyle=P,v.fillRect(0,0,Math.max(1,m),Math.max(1,$)),v.font=`${k} ${F} ${V} ${x} ${p}px ${q}`,v.fillStyle=s.color||"#000000",v.textBaseline="top",v.textAlign="right","direction"in v)try{v.direction="rtl"}catch{}const j=Math.max(0,m-d);let A=i;N.forEach(I=>{const O=I.length?I:" ";v.fillText(O,j,A,y),A+=f});const G=n.createElement("img");let z;try{z=w.toDataURL("image/png")}catch(I){return yt("note canvas toDataURL failed",I),null}return G.src=z,G.alt=g,G.style.width=`${Math.max(1,m)}px`,G.style.height=`${Math.max(1,$)}px`,G.style.display="block",G.setAttribute("data-quote-note-image","true"),{image:G,canvas:w,totalHeight:$,width:m}}function _d(e,{pixelRatio:t=1}={}){if(!e||!wa())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!Hi(a.textContent||""))return;let s;try{s=kd(a,{pixelRatio:t})}catch(r){yt("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function cs(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){bd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),d=o("reservations.quote.toast.retry","إعادة المحاولة"),l=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(Bt("export"),no()):(Bt("render"),qn=!1,Kt())};if(Nr({message:i,duration:9e3,actionLabel:l?d:void 0,onAction:l?u:void 0,linkLabel:c,linkHref:Ai}),W?.modal?.classList.contains("show")&&Bt("error",{message:i,actionLabel:l?d:void 0,onAction:l?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function ls({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){yt("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){yt("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function Os(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function Sr(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function Er(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function $d(){const e=Er();return e||(yn||(yn=Os(sd).catch(t=>{throw yn=null,t}).then(()=>{const t=Er();if(!t)throw yn=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),yn)}async function Pd(){const e=Sr();return e||(fn||(fn=Os(rd).catch(t=>{throw fn=null,t}).then(()=>{const t=Sr();if(!t)throw fn=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),fn)}async function Td(){if(window.html2pdf||await Os(ad),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}Xl(),qd()}function E(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Nd(e="reservation"){return e==="project"?"QP":"Q"}function jd(e,t="reservation"){const n=Number(e),a=Nd(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function Cd(){const e=window.localStorage?.getItem?.(wi),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function Ui(e="reservation"){const n=Cd()+1;return{sequence:n,quoteNumber:jd(n,e)}}function Ld(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(wi,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function Ki(e="reservation"){return hr[e]||hr.reservation}function Bd(e="reservation"){try{const t=Ki(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function Fd(e,t="reservation"){try{const n=Ki(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function Dd(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function Rd(e,t="reservation"){if(!e)return null;const n=Ni(t),a=ji(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,d])=>{const l=i[c];if(l==null)return;const{ids:u,emptyExplicitly:p}=Dd(l);if(!u&&!p)return;const f=Array.isArray(u)?u.filter(m=>d.has(m)):[];(f.length>0||p)&&(r[c]=f)}),{version:1,sections:s,fields:r}}function Qi(e){if(!e)return;const t=e.context||"reservation",n=Rd(e,t);n&&Fd(n,t)}function Gi(e){if(!e)return;const t=e.context||"reservation",n=Bd(t);if(!n)return;const a=Ni(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=Ds(e.fields||xa(t)),i=ji(t);Object.entries(n.fields).forEach(([c,d])=>{const l=i[c];if(!l)return;const u=Array.isArray(d)?d.filter(p=>l.has(p)):[];r[c]=new Set(u)}),e.fields=r}}function Wi(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function Xi(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return 0}function Md(e={}){const t=[e.dailyTotal,e.daily_total,e.totalRate,e.total,e.total_wage];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return Xi(e)}function Hd(e){const t=Pn()||[],{technicians:n=[]}=ue(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const i=String(r.id),c=s.get(i)||{};s.set(i,{...c,...r})}),(e.technicians||[]).map(r=>s.get(String(r))).filter(Boolean)}function zd(e,t,n){const{projectLinked:a}=At(e,n),s=ua(e.start,e.end),{groups:r}=ws(e),c=r.reduce((z,I)=>{const O=Array.isArray(I?.items)&&I.items.length?I.items[0]:{},R=Number(I?.count??I?.quantity??O?.qty??1)||1;let H=[O?.price,O?.unit_price,O?.unitPrice,I?.unitPrice].reduce((ee,oe)=>{if(Number.isFinite(ee)&&ee>0)return ee;const X=Number(oe);return Number.isFinite(X)?X:ee},NaN);if(!Number.isFinite(H)||H<=0){const ee=Number(I?.totalPrice??O?.total??O?.total_price);Number.isFinite(ee)&&R>0&&(H=Number((ee/R).toFixed(2)))}Number.isFinite(H)||(H=0),H=Ie(H);const ne=Ie(H);return z+ne*R},0)*s,d=t.reduce((z,I)=>z+Xi(I),0),l=t.reduce((z,I)=>z+Md(I),0),u=d*s,p=l*s,f=c+p,m=parseFloat(e.discount)||0,y=e.discountType==="amount"?m:f*(m/100),g=Math.max(0,f-y),b=a?!1:e.applyTax,w=Number(e.cost),v=Number.isFinite(w),k=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,F=k!=null?parseFloat(h(String(k).replace("%","").trim())):NaN,V=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let x=(V!=null?V===!0||V===1||V==="1"||String(V).toLowerCase()==="true":Number.isFinite(F)&&F>0)&&Number.isFinite(F)?Number(F):0;b&&x<=0&&(x=gt);let _=x>0?Math.max(0,g*(x/100)):0;_=Number(_.toFixed(2));const N=g+_;let D=b?N*.15:0;(!Number.isFinite(D)||D<0)&&(D=0),D=Number(D.toFixed(2));const $=N+D,B=Number.isFinite($)?Number($.toFixed(2)):0,K=a?B:v?w:B,P=Math.max(0,c+p-y),j=Math.max(0,P-u),A={equipmentTotal:c,crewTotal:p,crewCostTotal:u,discountAmount:y,subtotalAfterDiscount:g,taxableAmount:N,taxAmount:D,finalTotal:K,companySharePercent:x,companyShareAmount:_,netProfit:j},G={equipmentTotal:h(c.toFixed(2)),crewTotal:h(p.toFixed(2)),discountAmount:h(y.toFixed(2)),subtotalAfterDiscount:h(g.toFixed(2)),taxableAmount:h(N.toFixed(2)),taxAmount:h(D.toFixed(2)),finalTotal:h(K.toFixed(2)),companySharePercent:h(x.toFixed(2)),companyShareAmount:h(_.toFixed(2)),netProfit:h(j.toFixed(2))};return{totals:A,totalsDisplay:G,rentalDays:s}}function nn(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function Ji(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Od(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=nn(e.amount??(n==="amount"?e.value:null)),s=nn(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=Ji(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function Vd(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(Od).filter(Boolean);if(n.length>0)return n;const a=nn(e.paidPercent??e.paid_percent),s=nn(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Ji(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function Ud(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function Kd(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function Qd(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function Gd(e){const t=Number(e?.equipmentEstimate)||0,n=Qd(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const d=Math.max(0,a-c),l=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,p=l&&s&&u>0?u:0,f=p>0?Number((d*(p/100)).toFixed(2)):0,m=d+f;let y=s?m*vi:0;(!Number.isFinite(y)||y<0)&&(y=0),y=Number(y.toFixed(2));let g=s?Number(e?.totalWithTax):m;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((m+y).toFixed(2))):g=m,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:d,companyShareAmount:f,subtotal:m,applyTax:s,taxAmount:y,totalWithTax:g}}function Wd(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.technicians)?e.technicians:[],i=qs(t,a,s,!1,r,{start:e.start,end:e.end});if(Number.isFinite(i))return i;const c=Number(h(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function Xd(e,t){if(!e)return"—";const n=Ue(e);return t?`${n} - ${Ue(t)}`:n}function ie(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${h(a.toFixed(s))} ${t}`}function xr(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function Jd(e){if(!e?.start)return null;if(!e?.end)return 1;const t=ua(e.start,e.end);return Number.isFinite(t)?t:1}function Yd(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function Zd(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=ue(),i=e?.id!=null?s.find(L=>String(L.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:ie(0,t),expensesTotal:ie(0,t),reservationsTotal:ie(0,t),discountAmount:ie(0,t),taxAmount:ie(0,t),overallTotal:ie(0,t),paidAmount:ie(0,t),remainingAmount:ie(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:ie(0,t),remainingAmountDisplay:ie(0,t),paidPercentDisplay:xr(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const d=i.clientId??i.customerId??i.client_id??i.customer_id??null,l=d!=null&&n.find(L=>String(L.id)===String(d))||null,u=l?.customerName??l?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),p=(i.clientCompany||l?.companyName||l?.company||"").trim(),f=l?.phone??l?.customerPhone??i.clientPhone??i.customerPhone??"",m=f?h(String(f).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),y=l?.email??i.clientEmail??i.customerEmail??"",g=y?String(y).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),b=i.projectCode||`PRJ-${h(String(i.id??""))}`,w=h(String(b)),v=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),k=Ud(i.type),F=i.start?Ue(i.start):"—",V=i.end?Ue(i.end):"—",q=Jd(i),x=q!=null?Yd(q):"غير محدد",_=Kd(i),N={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},D=o(`projects.status.${_}`,N[_]||_),$=i.id!=null?String(i.id):null,B=$?a.filter(L=>String(L.projectId)===$):[],P=B.map(L=>{const ae=L.reservationId||L.id||"",pe=L.status||L.state||"pending",ce=String(pe).toLowerCase(),ye=o(`reservations.status.${ce}`,ce),qe=Wd(L),Ce=L.start?new Date(L.start).getTime():0;return{reservationId:h(String(ae||"-")),status:ce,statusLabel:ye,total:qe,totalLabel:ie(qe,t),dateRange:Xd(L.start,L.end),startTimestamp:Number.isNaN(Ce)?0:Ce}}).sort((L,ae)=>ae.startTimestamp-L.startTimestamp).map(({startTimestamp:L,...ae})=>ae).reduce((L,ae)=>L+(Number(ae.total)||0),0),j=new Map;B.forEach(L=>{const ae=Array.isArray(L.items)?L.items:[],pe=ua(L.start,L.end),ce=L.reservationId||L.id||"";ae.forEach((ye,qe)=>{if(!ye)return;const Ce=ye.barcode||ye.code||ye.id||ye.desc||ye.description||`item-${qe}`,Ge=String(Ce||`item-${qe}`),Ze=j.get(Ge)||{description:ye.desc||ye.description||ye.name||ye.barcode||`#${h(String(qe+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},Qt=Number(ye.qty)||1,ln=Number(ye.price)||0;Ze.totalQuantity+=Qt,Ze.reservationIds.add(String(ce));const Gt=ln*Qt*Math.max(1,pe);Number.isFinite(Gt)&&(Ze.totalCost+=Gt),j.set(Ge,Ze)})});const A=Array.from(j.values()).map(L=>({description:L.description,totalQuantity:L.totalQuantity,reservationsCount:L.reservationIds.size,displayCost:ie(L.totalCost,t)})),G=new Map((r||[]).filter(Boolean).map(L=>[String(L.id),L])),z=new Map,I=L=>{if(!L)return;let ae=null;typeof L=="object"?ae=L.id??L.technicianId??L.technician_id??L.userId??L.user_id??null:(typeof L=="string"||typeof L=="number")&&(ae=L);const pe=ae!=null?String(ae):null,ce=pe&&G.has(pe)?G.get(pe):typeof L=="object"?L:null,ye=ce?.name||ce?.full_name||ce?.fullName||ce?.displayName||(typeof L=="string"?L:null),qe=ce?.role||ce?.title||null,Ce=ce?.phone||ce?.mobile||ce?.contact||null;if(!ye&&!pe)return;const Ge=pe||ye;z.has(Ge)||z.set(Ge,{id:pe,name:ye||"-",role:qe||null,phone:Ce||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(L=>I(L)),B.forEach(L=>{(Array.isArray(L.technicians)?L.technicians:[]).forEach(pe=>I(pe))});const O=Array.from(z.values()),R=Array.isArray(i.expenses)?i.expenses.map(L=>{const ae=Number(L?.amount)||0;return{label:L?.label||L?.name||"-",amount:ae,displayAmount:ie(ae,t),note:L?.note||L?.description||""}}):[],M=Gd(i),H=M.applyTax?Number(((M.subtotal+P)*vi).toFixed(2)):0,ne=Number((M.subtotal+P+H).toFixed(2)),ee=Vd(i),oe=nn(i.paidAmount??i.paid_amount)||0,X=nn(i.paidPercent??i.paid_percent)||0,re=Ss({totalAmount:ne,paidAmount:oe,paidPercent:X,history:ee}),he=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",ve=Es({manualStatus:he,paidAmount:re.paidAmount,paidPercent:re.paidPercent,totalAmount:ne}),$e={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},U=o(`projects.paymentStatus.${ve}`,$e[ve]||ve),Z=Number(re.paidAmount||0),se=Number(re.paidPercent||0),fe=Math.max(0,Number((ne-Z).toFixed(2))),me={projectSubtotal:ie(M.subtotal,t),expensesTotal:ie(M.expensesTotal,t),reservationsTotal:ie(P,t),discountAmount:ie(M.discountAmount,t),taxAmount:ie(H,t),overallTotal:ie(ne,t),paidAmount:ie(Z,t),remainingAmount:ie(fe,t)},Ye={status:ve,statusLabel:U,paidAmount:Z,paidPercent:se,remainingAmount:fe,paidAmountDisplay:ie(Z,t),remainingAmountDisplay:ie(fe,t),paidPercentDisplay:xr(se)},Y=(i.description||"").trim();return{project:i,customer:l,clientInfo:{name:u,company:p||"—",phone:m,email:g},projectInfo:{title:v,code:w,typeLabel:k,startDisplay:F,endDisplay:V,durationLabel:x,statusLabel:D},expenses:R,equipment:A,crew:O,totals:M,totalsDisplay:me,projectTotals:{combinedTaxAmount:H,overallTotal:ne,reservationsTotal:P,paidAmount:Z,paidPercent:se,remainingAmount:fe,paymentStatus:ve},paymentSummary:Ye,notes:Y,currencyLabel:t,projectStatus:_,projectStatusLabel:D,projectDurationDays:q,projectDurationLabel:x,paymentHistory:ee}}function eu({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:d={},currencyLabel:l="SR",sections:u,fieldSelections:p={},quoteNumber:f,quoteDate:m,terms:y=Me}){const g=Ds(p),b=(U,Z)=>Rs(g,U,Z),w=U=>u?.has?.(U),v=`<div class="quote-placeholder">${E(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,k=(U,Z)=>`<div class="info-plain__item">
      <span class="info-plain__label">${E(U)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${E(Z)}</span>
    </div>`,F=(U,Z,{variant:se="inline"}={})=>se==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${E(U)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${E(Z)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${E(U)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${E(Z)}</span>
    </span>`,V=(U,Z)=>`<div class="payment-row">
      <span class="payment-row__label">${E(U)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${E(Z)}</span>
    </div>`,q=[];b("customerInfo","customerName")&&q.push(k(o("projects.details.client","العميل"),t.name||"-")),b("customerInfo","customerCompany")&&q.push(k(o("projects.details.company","شركة العميل"),t.company||"—")),b("customerInfo","customerPhone")&&q.push(k(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),b("customerInfo","customerEmail")&&q.push(k(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const x=w("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${E(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${q.length?`<div class="info-plain">${q.join("")}</div>`:v}
      </section>`:"",_=[];b("projectInfo","projectType")&&_.push(k(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),b("projectInfo","projectTitle")&&_.push(k(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),b("projectInfo","projectCode")&&_.push(k(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),b("projectInfo","projectStart")&&_.push(k(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),b("projectInfo","projectEnd")&&_.push(k(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),b("projectInfo","projectDuration")&&_.push(k(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),b("projectInfo","projectStatus")&&_.push(k(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const N=w("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${E(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${_.length?`<div class="info-plain">${_.join("")}</div>`:v}
      </section>`:"",D=_i.filter(U=>b("projectCrew",U.id)),$=w("projectCrew")?D.length?`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${D.map(U=>`<th>${E(U.labelKey?o(U.labelKey,U.fallback):U.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((U,Z)=>`<tr>${D.map(se=>`<td>${se.render(U,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(D.length,1)}" class="empty">${E(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${v}
          </section>`:"",B=[];b("financialSummary","projectSubtotal")&&B.push(F(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${ie(0,l)}`)),b("financialSummary","expensesTotal")&&B.push(F(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||ie(0,l))),b("financialSummary","reservationsTotal")&&B.push(F(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||ie(0,l))),b("financialSummary","discountAmount")&&B.push(F(o("reservations.details.labels.discount","الخصم"),i.discountAmount||ie(0,l))),b("financialSummary","taxAmount")&&B.push(F(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||ie(0,l)));const K=[];b("financialSummary","overallTotal")&&K.push(F(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||ie(0,l),{variant:"final"})),b("financialSummary","paidAmount")&&K.push(F(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||ie(0,l),{variant:"final"})),b("financialSummary","remainingAmount")&&K.push(F(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||ie(0,l),{variant:"final"}));const P=w("financialSummary")?!B.length&&!K.length?`<section class="quote-section quote-section--financial">${v}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${E(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${B.length?`<div class="totals-inline">${B.join("")}</div>`:""}
            ${K.length?`<div class="totals-final">${K.join("")}</div>`:""}
          </div>
        </section>`:"",j=$i.filter(U=>b("projectExpenses",U.id)),A=w("projectExpenses")?j.length?`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${j.map(U=>`<th>${E(U.labelKey?o(U.labelKey,U.fallback):U.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((U,Z)=>`<tr>${j.map(se=>`<td>${se.render(U,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(j.length,1)}" class="empty">${E(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${v}
          </section>`:"",G=Pi.filter(U=>b("projectEquipment",U.id)),z=w("projectEquipment")?G.length?`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${G.map(U=>`<th>${E(U.labelKey?o(U.labelKey,U.fallback):U.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${r.length?r.map((U,Z)=>`<tr>${G.map(se=>`<td>${se.render(U,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(G.length,1)}" class="empty">${E(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${v}
          </section>`:"",I=(e?.description||"").trim()||"",O=w("projectNotes")?`<section class="quote-section">
        <h3>${E(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${E(I||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",R=[];b("payment","beneficiary")&&R.push(V(o("reservations.quote.labels.beneficiary","اسم المستفيد"),_e.beneficiaryName)),b("payment","bank")&&R.push(V(o("reservations.quote.labels.bank","اسم البنك"),_e.bankName)),b("payment","account")&&R.push(V(o("reservations.quote.labels.account","رقم الحساب"),h(_e.accountNumber))),b("payment","iban")&&R.push(V(o("reservations.quote.labels.iban","رقم الآيبان"),h(_e.iban)));const M=`<section class="quote-section">
      <div class="payment-block">
        <h3>${E(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${R.length?R.join(""):v}</div>
      </div>
      <p class="quote-approval-note">${E(_e.approvalNote)}</p>
    </section>`,H=Array.isArray(y)&&y.length?y:Me,ne=`<footer class="quote-footer">
        <h4>${E(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${H.map(U=>`<li>${E(U)}</li>`).join("")}</ul>
      </footer>`,ee=[],oe=[];if(N&&oe.push({key:"project",html:N}),x&&oe.push({key:"customer",html:x}),oe.length>1){const U=oe.find(fe=>fe.key==="project"),Z=oe.find(fe=>fe.key==="customer"),se=[];U?.html&&se.push(U.html),Z?.html&&se.push(Z.html),ee.push(Se(`<div class="quote-section-row quote-section-row--primary">${se.join("")}</div>`,{blockType:"group"}))}else oe.length===1&&ee.push(Se(oe[0].html));const X=[];$&&X.push(Se($,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),A&&X.push(Se(A,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),z&&X.push(Se(z,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const re=[];P&&re.push(Se(P,{blockType:"summary"})),O&&re.push(Se(O));const he=[Se(M,{blockType:"payment"}),Se(ne,{blockType:"footer"})],ve=[...aa(ee,"projects.quote.placeholder.primary"),...X,...aa(re,"projects.quote.placeholder.summary"),...he],$e=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${E(_e.logoUrl)}" alt="${E(_e.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${E(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${E(_e.companyName)}</p>
        <p class="quote-company-cr">${E(o("reservations.quote.labels.cr","السجل التجاري"))}: ${E(_e.commercialRegistry)}</p>
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
      <style>${Li}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${$e}
          ${ve.join("")}
        </div>
      </div>
    </div>
  `}function Yi(e){if(e?.context==="project")return eu(e);const{reservation:t,customer:n,project:a,technicians:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:d,sections:l,fieldSelections:u={},quoteNumber:p,quoteDate:f,terms:m=Me}=e,y=h(String(t?.reservationId??t?.id??"")),g=t.start?h(Ue(t.start)):"-",b=t.end?h(Ue(t.end)):"-",w=n?.customerName||n?.full_name||n?.name||"-",v=n?.phone||"-",k=n?.email||"-",F=n?.company||n?.company_name||"-",V=h(v),q=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),x=a?.code||a?.projectCode||"",_=h(String(c)),N=t?.notes||"",D=Array.isArray(m)&&m.length?m:Me,$=Ds(u),B=(J,Ee)=>Rs($,J,Ee),K=J=>l?.has?.(J),P=`<div class="quote-placeholder">${E(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,j=(J,Ee)=>`<div class="info-plain__item">${E(J)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${E(Ee)}</strong></div>`,A=(J,Ee,{variant:et="inline"}={})=>et==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${E(J)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${E(Ee)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${E(J)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${E(Ee)}</span>
    </span>`,G=(J,Ee)=>`<div class="payment-row">
      <span class="payment-row__label">${E(J)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${E(Ee)}</span>
    </div>`,z=[];B("customerInfo","customerName")&&z.push(j(o("reservations.details.labels.customer","العميل"),w)),B("customerInfo","customerCompany")&&z.push(j(o("reservations.details.labels.company","الشركة"),F)),B("customerInfo","customerPhone")&&z.push(j(o("reservations.details.labels.phone","الهاتف"),V)),B("customerInfo","customerEmail")&&z.push(j(o("reservations.details.labels.email","البريد"),k));const I=K("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${E(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${z.length?`<div class="info-plain">${z.join("")}</div>`:P}
      </section>`:"",O=[];B("reservationInfo","reservationId")&&O.push(j(o("reservations.details.labels.reservationId","رقم الحجز"),y||"-")),B("reservationInfo","reservationStart")&&O.push(j(o("reservations.details.labels.start","بداية الحجز"),g)),B("reservationInfo","reservationEnd")&&O.push(j(o("reservations.details.labels.end","نهاية الحجز"),b)),B("reservationInfo","reservationDuration")&&O.push(j(o("reservations.details.labels.duration","عدد الأيام"),_));const R=K("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${E(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${O.length?`<div class="info-plain">${O.join("")}</div>`:P}
      </section>`:"",M=[];B("projectInfo","projectTitle")&&M.push(j(o("reservations.details.labels.project","المشروع"),q)),B("projectInfo","projectCode")&&M.push(j(o("reservations.details.labels.code","الرمز"),x||"-"));const H=K("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${E(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${M.length?`<div class="info-plain">${M.join("")}</div>`:P}
      </section>`:"",ne=[];B("financialSummary","equipmentTotal")&&ne.push(A(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${d}`)),B("financialSummary","crewTotal")&&ne.push(A(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${d}`)),B("financialSummary","discountAmount")&&ne.push(A(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${d}`)),B("financialSummary","taxAmount")&&ne.push(A(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${d}`));const ee=B("financialSummary","finalTotal"),oe=[];ee&&oe.push(A(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${d}`,{variant:"final"}));const X=oe.length?`<div class="totals-final">${oe.join("")}</div>`:"",re=K("financialSummary")?!ne.length&&!ee?`<section class="quote-section quote-section--financial">${P}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${E(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${ne.length?`<div class="totals-inline">${ne.join("")}</div>`:""}
            ${X}
          </div>
        </section>`:"",{groups:he}=ws(t),ve=he.map(J=>{const Ee=Number(J?.count??J?.quantity??1)||1,et=Number(J?.unitPrice);let lt=Number.isFinite(et)?et:0;if(!lt||lt<=0){const Wt=Number(J?.totalPrice);Number.isFinite(Wt)&&Ee>0&&(lt=Number((Wt/Ee).toFixed(2)))}Number.isFinite(lt)||(lt=0);const _a=J?.type==="package"||Array.isArray(J?.items)&&J.items.some(Wt=>Wt?.type==="package"),$a=Array.isArray(J?.barcodes)&&J.barcodes.length?J.barcodes[0]:Array.isArray(J?.items)&&J.items.length?J.items[0]?.barcode:null,Pa=J?.barcode??$a??"";let dn=Number.isFinite(Number(J?.totalPrice))?Number(J.totalPrice):Number((lt*Ee).toFixed(2));return dn=Ie(dn),{...J,isPackage:_a,desc:J?.description,barcode:Pa,qty:Ee,price:lt,totalPrice:dn}}),$e=Ii.filter(J=>B("items",J.id)),U=$e.length>0,Z=U?$e.map(J=>`<th>${E(J.labelKey?o(J.labelKey,J.fallback):J.fallback)}</th>`).join(""):"",fe=ve.length>0?ve.map((J,Ee)=>`<tr>${$e.map(et=>`<td>${et.render(J,Ee)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max($e.length,1)}" class="empty">${E(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,me=K("items")?U?`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Z}</tr>
              </thead>
              <tbody>${fe}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.items.title","المعدات"))}</h3>
            ${P}
          </section>`:"",Ye=ki.filter(J=>B("crew",J.id)),Y=Ye.length>0,be=Y?Ye.map(J=>`<th>${E(J.labelKey?o(J.labelKey,J.fallback):J.fallback)}</th>`).join(""):"",L=s.length?s.map((J,Ee)=>`<tr>${Ye.map(et=>`<td>${et.render(J,Ee)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Ye.length,1)}" class="empty">${E(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,ae=K("crew")?Y?`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${be}</tr>
              </thead>
              <tbody>${L}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${P}
          </section>`:"",pe=K("notes")?`<section class="quote-section">
        <h3>${E(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${E(N||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",ce=[];B("payment","beneficiary")&&ce.push(G(o("reservations.quote.labels.beneficiary","اسم المستفيد"),_e.beneficiaryName)),B("payment","bank")&&ce.push(G(o("reservations.quote.labels.bank","اسم البنك"),_e.bankName)),B("payment","account")&&ce.push(G(o("reservations.quote.labels.account","رقم الحساب"),h(_e.accountNumber))),B("payment","iban")&&ce.push(G(o("reservations.quote.labels.iban","رقم الآيبان"),h(_e.iban)));const ye=`<section class="quote-section">
      <div class="payment-block">
        <h3>${E(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${ce.length?ce.join(""):P}</div>
      </div>
      <p class="quote-approval-note">${E(_e.approvalNote)}</p>
    </section>`,qe=`<footer class="quote-footer">
        <h4>${E(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${D.map(J=>`<li>${E(J)}</li>`).join("")}</ul>
      </footer>`,Ce=[];I&&R?Ce.push(Se(`<div class="quote-section-row">${I}${R}</div>`,{blockType:"group"})):(R&&Ce.push(Se(R)),I&&Ce.push(Se(I))),H&&Ce.push(Se(H));const Ge=[];me&&Ge.push(Se(me,{blockType:"table",extraAttributes:'data-table-id="items"'})),ae&&Ge.push(Se(ae,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const Ze=[];re&&Ze.push(Se(re,{blockType:"summary"})),pe&&Ze.push(Se(pe));const Qt=[Se(ye,{blockType:"payment"}),Se(qe,{blockType:"footer"})],ln=[...aa(Ce,"reservations.quote.placeholder.page1"),...Ge,...aa(Ze,"reservations.quote.placeholder.page2"),...Qt],Gt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${E(_e.logoUrl)}" alt="${E(_e.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${E(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${E(_e.companyName)}</p>
        <p class="quote-company-cr">${E(o("reservations.quote.labels.cr","السجل التجاري"))}: ${E(_e.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${E(p)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${E(f)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Li}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Gt}
          ${ln.join("")}
        </div>
      </div>
    </div>
  `}function tu(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function In(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>tu(c)),i=[s,...r].map(c=>c.catch(d=>(yt("asset load failed",d),md(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function Zi(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await Vi(r),await In(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let d=null,l=null;const u=q=>{q.style.margin="0 auto",q.style.breakInside="avoid",q.style.pageBreakInside="avoid",q.style.pageBreakAfter="auto",q.style.breakAfter="auto"},p=()=>{const q=a.createElement("div"),x=s.childElementCount===0;if(q.className="quote-page",q.dataset.pageIndex=String(s.childElementCount),x){q.classList.add("quote-page--primary");const N=i.cloneNode(!0);N.removeAttribute("data-quote-header-template"),q.appendChild(N)}else q.classList.add("quote-page--continuation");const _=a.createElement("main");_.className="quote-body",q.appendChild(_),s.appendChild(q),u(q),d=q,l=_},f=()=>{(!d||!l||!l.isConnected)&&p()},m=()=>{if(!d||!l||l.childElementCount>0)return;const q=d;d=null,l=null,q.parentNode&&q.parentNode.removeChild(q)},y=()=>{d=null,l=null},g=()=>d?d.scrollHeight-d.clientHeight>od:!1,b=(q,{allowOverflow:x=!1}={})=>(f(),l.appendChild(q),g()&&!x?(l.removeChild(q),m(),!1):!0),w=q=>{const x=q.cloneNode(!0);x.removeAttribute?.("data-quote-block"),x.removeAttribute?.("data-block-type"),x.removeAttribute?.("data-table-id"),!b(x)&&(y(),!b(x)&&b(x,{allowOverflow:!0}))},v=q=>{const x=q.querySelector("table");if(!x){w(q);return}const _=q.querySelector("h3"),N=x.querySelector("thead"),D=Array.from(x.querySelectorAll("tbody tr"));if(!D.length){w(q);return}let $=null,B=0;const K=(j=!1)=>{const A=q.cloneNode(!1);A.removeAttribute("data-quote-block"),A.removeAttribute("data-block-type"),A.removeAttribute("data-table-id"),A.classList.add("quote-section--table-fragment"),j&&A.classList.add("quote-section--table-fragment--continued");const G=_?_.cloneNode(!0):null;G&&A.appendChild(G);const z=x.cloneNode(!1);z.classList.add("quote-table--fragment"),N&&z.appendChild(N.cloneNode(!0));const I=a.createElement("tbody");return z.appendChild(I),A.appendChild(z),{section:A,body:I}},P=(j=!1)=>$||($=K(j),b($.section)||(y(),b($.section)||b($.section,{allowOverflow:!0})),$);D.forEach(j=>{P(B>0);const A=j.cloneNode(!0);if($.body.appendChild(A),g()&&($.body.removeChild(A),$.body.childElementCount||(l.removeChild($.section),$=null,m()),y(),$=null,P(B>0),$.body.appendChild(A),g())){$.section.classList.add("quote-section--table-fragment--overflow"),B+=1;return}B+=1}),$=null};if(!c.length)return;c.forEach(q=>{q.getAttribute("data-block-type")==="table"?v(q):w(q)});const k=Array.from(s.children),F=[];if(k.forEach((q,x)=>{const _=q.querySelector(".quote-body");if(x!==0&&(!_||_.childElementCount===0)){q.remove();return}F.push(q)}),!n){const q=a.defaultView||window,x=Math.min(3,Math.max(1,q.devicePixelRatio||1)),_=wa()?Math.min(2,x):x;F.forEach(N=>_d(N,{pixelRatio:_}))}F.forEach((q,x)=>{const _=x===0;q.style.pageBreakAfter="auto",q.style.breakAfter="auto",q.style.pageBreakBefore=_?"auto":"always",q.style.breakBefore=_?"auto":"page",n?q.style.boxShadow="":q.style.boxShadow="none"});const V=F[F.length-1]||null;d=V,l=V?.querySelector(".quote-body")||null,await In(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function Vs(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function nu(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([Pd(),$d()]),c=e.ownerDocument||document,d=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,d,c?.documentElement?.getAttribute?.("dir")].some(q=>typeof q=="string"&&q.toLowerCase().startsWith("rtl")),p=typeof window<"u"&&window.devicePixelRatio||1,f=zs(),m=Mi(),y=wa();let g;y?g=1.5:m?g=Math.min(1.7,Math.max(1.2,p*1.1)):f?g=Math.min(1.8,Math.max(1.25,p*1.2)):g=Math.min(2,Math.max(1.6,p*1.4));const b=y||m?.9:f?.92:.95,w=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),v={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let k=0;const F=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let q=0;q<s.length;q+=1){const x=s[q];await Vi(x),await In(x);const _=x.ownerDocument||document,N=_.createElement("div");Object.assign(N.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const D=x.cloneNode(!0);D.style.width=`${On}px`,D.style.maxWidth=`${On}px`,D.style.minWidth=`${On}px`,D.style.height=`${Vn}px`,D.style.maxHeight=`${Vn}px`,D.style.minHeight=`${Vn}px`,D.style.position="relative",D.style.background="#ffffff",Vs(D),N.appendChild(D),_.body.appendChild(N);let $;try{await In(D),$=await i(D,{...v,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(I){throw cs(I,"pageCapture",{toastMessage:F}),I}finally{N.parentNode?.removeChild(N)}if(!$)continue;const B=$.width||1,P=($.height||1)/B;let j=rs,A=j*P,G=0;if(A>zn){const I=zn/A;A=zn,j=j*I,G=Math.max(0,(rs-j)/2)}const z=$.toDataURL("image/jpeg",b);k>0&&w.addPage(),w.addImage(z,"JPEG",G,0,j,A,`page-${k+1}`,"FAST"),k+=1,await new Promise(I=>window.requestAnimationFrame(I))}}catch(q){throw ls({safariWindowRef:n,mobileWindowRef:a}),q}if(k===0)throw ls({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(m||y){const q=w.output("blob");if(y){const x=URL.createObjectURL(q);Sn();try{window.location.assign(x)}catch(_){yt("mobile safari blob navigation failed",_)}finally{setTimeout(()=>URL.revokeObjectURL(x),6e4)}}else{const x=URL.createObjectURL(q),_=()=>m&&n&&!n.closed?n:a&&!a.closed?a:null,N=($,B)=>{if(Sn(),!$){window.location.assign(B);return}try{$.location.replace(B),$.focus?.()}catch(K){yt("direct blob navigation failed",K);try{$.document.open(),$.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${E(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${B}" title="PDF preview"></iframe></body></html>`),$.document.close()}catch(P){yt("iframe blob delivery failed",P),window.location.assign(B)}}},D=_();N(D,x),setTimeout(()=>URL.revokeObjectURL(x),6e4)}}else{Sn();const q=w.output("bloburl"),x=document.createElement("a");x.href=q,x.download=t,x.rel="noopener",x.style.display="none",document.body.appendChild(x),x.click(),setTimeout(()=>{URL.revokeObjectURL(q),x.remove()},2e3)}}function Kt(){if(!C||!W)return;const{previewFrame:e}=W;if(!e)return;const t=C.context||"reservation",n=Yi({context:t,reservation:C.reservation,customer:C.customer,project:C.project,technicians:C.technicians,totals:C.totals,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,fieldSelections:C.fields,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel,terms:C.terms,projectCrew:C.projectCrew,projectExpenses:C.projectExpenses,projectEquipment:C.projectEquipment,projectInfo:C.projectInfo,clientInfo:C.clientInfo,paymentSummary:C.paymentSummary,projectTotals:C.projectTotals});Bt("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&(xi(r),Si(r,s),Ei(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await Zi(i,{context:"preview"}),Vs(i))}catch(m){console.error("[reservations/pdf] failed to layout preview document",m)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),d=a?.querySelector(".quote-preview-pages"),l=On;let u=18;if(d&&a?.defaultView){const m=a.defaultView.getComputedStyle(d),y=parseFloat(m.rowGap||m.gap||`${u}`);Number.isFinite(y)&&y>=0&&(u=y)}const p=Vn,f=c.length?c.length*p+Math.max(0,(c.length-1)*u):p;if(e.dataset.baseWidth=String(l),e.dataset.baseHeight=String(f),e.style.width=`${l}px`,e.style.minWidth=`${l}px`,e.style.height=`${f}px`,e.style.minHeight=`${f}px`,W?.previewFrameWrapper&&!W?.userAdjustedZoom){const m=W.previewFrameWrapper.clientWidth-24;m>0&&m<l?at=Math.max(m/l,.3):at=1}to(at)}finally{Sn()}},{once:!0})}function au(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?C.sections.add(n):C.sections.delete(n),Qi(C),eo(),Kt())}function su(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=C.context||"reservation",r=C.fields||(C.fields=xa(s)),i=pd(r,n);t.checked?i.add(a):i.delete(a),Qi(C),Kt()}function ru(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(Hs(C,n),C.sectionExpansions[n]=t.open)}function eo(){if(!W?.toggles||!C)return;const{toggles:e}=W,t=C.fields||{},n=C.context||"reservation";Hs(C);const a=Ea(n),s=Ti(n),r=a.map(({id:i,labelKey:c,fallback:d})=>{const l=o(c,d),u=C.sections.has(i),p=s[i]||[],f=fd(C,i),m=p.length?`<div class="quote-toggle-sublist">
          ${p.map(y=>{const g=Rs(t,i,y.id),b=u?"":"disabled",w=y.labelKey?o(y.labelKey,y.fallback):y.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${y.id}" ${g?"checked":""} ${b}>
                <span>${E(w)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${i}" ${f?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${i}" ${u?"checked":""}>
            <span>${E(l)}</span>
          </label>
          ${p.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${m}
      </details>
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",au)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",su)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",ru)})}function iu(){if(W?.modal)return W;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
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
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),r=e.querySelector("[data-quote-terms-reset]"),i=e.querySelector("[data-quote-download]"),c=e.querySelector(".modal-header"),d=c?.querySelector(".btn-close"),l=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",c&&c.insertBefore(u,d||null);const p=document.createElement("iframe");p.className="quote-preview-frame",p.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),p.setAttribute("loading","lazy"),p.setAttribute("frameborder","0");const f=document.createElement("div");f.className="quote-preview-zoom-controls",f.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${E(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${E(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${E(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(p),n.innerHTML="";const y=document.createElement("div");y.className="quote-preview-scroll",y.appendChild(m),n.appendChild(y);const g=document.createElement("div");g.className="quote-preview-status",g.setAttribute("role","status"),g.setAttribute("aria-live","polite"),g.hidden=!0,g.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${E(Ci("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(f),i?.addEventListener("click",async()=>{if(C){i.disabled=!0;try{await no()}finally{i.disabled=!1}}});const b=()=>{is()||os(e)};l.forEach(F=>{F?.addEventListener("click",b)}),d&&!l.includes(d)&&d.addEventListener("click",b),e.addEventListener("click",F=>{is()||F.target===e&&os(e)}),W={modal:e,toggles:t,preview:n,previewScroll:y,previewFrameWrapper:m,zoomControls:f,zoomValue:f.querySelector("[data-zoom-value]"),previewFrame:p,meta:a,downloadBtn:i,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const w=f.querySelector("[data-zoom-out]"),v=f.querySelector("[data-zoom-in]"),k=f.querySelector("[data-zoom-reset]");return w?.addEventListener("click",()=>wr(-.1)),v?.addEventListener("click",()=>wr(.1)),k?.addEventListener("click",()=>sa(1,{markManual:!0})),s&&s.addEventListener("input",cu),r&&r.addEventListener("click",lu),sa(at),W}function sa(e,{silent:t=!1,markManual:n=!1}={}){at=Math.min(Math.max(e,.25),2.2),n&&W&&(W.userAdjustedZoom=!0),to(at),!t&&W?.zoomValue&&(W.zoomValue.textContent=`${Math.round(at*100)}%`)}function wr(e){sa(at+e,{markManual:!0})}function to(e){if(!W?.previewFrame||!W.previewFrameWrapper)return;const t=W.previewFrame,n=W.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",zs()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function ou(){if(!W?.meta||!C)return;const{meta:e}=W;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${E(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${E(C.quoteNumber)}</strong></div>
      <div><span>${E(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${E(C.quoteDateLabel)}</strong></div>
    </div>
  `}function Us(){if(!W?.termsInput)return;const e=(C?.terms&&C.terms.length?C.terms:Me).join(`
`);W.termsInput.value!==e&&(W.termsInput.value=e)}function cu(e){if(!C)return;const t=ns(e?.target?.value??"");if(t.length){C.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{C.terms=[...Me],Us();const n=Me.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}Kt()}function lu(e){if(e?.preventDefault?.(),!C)return;C.terms=[...Me];const t=document.getElementById("reservation-terms");t&&(t.value=Me.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=Me.join(`
`)),Us(),Kt()}async function no(){if(!C)return;Bt("export");const t=!zs()&&Mi(),n=wa(),a=null,s=!n&&t?window.open("","_blank"):null;(d=>{if(d)try{d.document.open(),d.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${E(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${E(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${E(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),d.document.close()}catch(l){yt("failed to prime download window",l)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await Td(),Ma("html2pdf ensured");const d=C.context||"reservation",l=Yi({context:d,reservation:C.reservation,customer:C.customer,project:C.project,technicians:C.technicians,totals:C.totals,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,fieldSelections:C.fields,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel,terms:C.terms,projectCrew:C.projectCrew,projectExpenses:C.projectExpenses,projectEquipment:C.projectEquipment,projectInfo:C.projectInfo,clientInfo:C.clientInfo,paymentSummary:C.paymentSummary,projectTotals:C.projectTotals});i=document.createElement("div"),i.innerHTML=l,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),xi(i),Si(i),Ei(i),Ma("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await Zi(u,{context:"export"}),await In(u),Vs(u),Ma("layout complete for export document")}catch(f){cs(f,"layoutQuoteDocument",{suppressToast:!0})}}const p=`quotation-${C.quoteNumber}.pdf`;await nu(u,{filename:p,safariWindowRef:s,mobileWindowRef:a}),C.sequenceCommitted||(Ld(C.quoteSequence),C.sequenceCommitted=!0)}catch(d){ls({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,cs(d,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),Sn()}}function ao(){const e=iu();e?.modal&&(qn=!1,at=1,W&&(W.userAdjustedZoom=!1),sa(at,{silent:!0}),eo(),ou(),Us(),Kt(),ud(e.modal))}async function du({reservation:e,customer:t,project:n}){if(!e){S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=Hd(e),{totalsDisplay:s,totals:r,rentalDays:i}=zd(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:d,quoteNumber:l}=Ui("reservation"),u=new Date,p=Zl();C={context:"reservation",reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(Ea("reservation").filter(f=>f.defaultSelected).map(f=>f.id)),sectionExpansions:Ms("reservation"),fields:xa("reservation"),terms:p,quoteSequence:d,quoteNumber:l,quoteDate:u,quoteDateLabel:Wi(u),sequenceCommitted:!1},Gi(C),ao()}async function um({project:e}){if(!e){S(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=Zd(e),{project:n}=t;if(!n){S(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=Ui("project"),r=new Date,i=[...Yl];C={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(Ea("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:Ms("project"),fields:xa("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:Wi(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},Gi(C),ao()}function uu({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=Pn(),{reservations:r=[],customers:i=[],technicians:c=[],projects:d=[]}=ue(),l=Array.isArray(s)?s:c||[],u=new Map((d||[]).map(b=>[String(b.id),b])),p=document.getElementById(e);if(!p){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){p.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const f=t||Rl(),m=new Map(i.map(b=>[String(b.id),b])),y=new Map(l.map(b=>[String(b.id),b])),g=Ol({reservations:r,filters:f,customersMap:m,techniciansMap:y,projectsMap:u});if(g.length===0){p.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}p.innerHTML=`<div class="reservations-grid">${Vl({entries:g,customersMap:m,techniciansMap:y,projectsMap:u})}</div>`,p.querySelectorAll('[data-action="details"]').forEach(b=>{const w=Number(b.dataset.reservationIndex);Number.isNaN(w)||b.addEventListener("click",()=>{typeof n=="function"&&n(w)})}),p.querySelectorAll('button[data-action="confirm"]').forEach(b=>{const w=Number(b.dataset.reservationIndex);Number.isNaN(w)||b.addEventListener("click",v=>{v.stopPropagation(),typeof a=="function"&&a(w,v)})})}function mu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=ue(),c=s[e];if(!c)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=r.find(w=>String(w.id)===String(c.customerId)),l=c.projectId?i.find(w=>String(w.id)===String(c.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const w=Pn()||[];u.innerHTML=Ul(c,d,w,e,l)}const p=document.getElementById("reservationDetailsModal"),f=()=>{p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(p)?.hide()},m=document.getElementById("reservation-details-edit-btn");m&&(m.onclick=()=>{f(),typeof t=="function"&&t(e,{reservation:c,customer:d,getEditContext:a})});const y=document.getElementById("reservation-details-delete-btn");y&&(y.onclick=()=>{f(),typeof n=="function"&&n(e,{reservation:c,customer:d})});const g=u?.querySelector('[data-action="open-project"]');g&&l&&g.addEventListener("click",()=>{f();const w=l?.id!=null?String(l.id):"",v=w?`projects.html?project=${encodeURIComponent(w)}`:"projects.html";window.location.href=v});const b=document.getElementById("reservation-details-export-btn");return b&&(b.onclick=async w=>{w?.preventDefault?.(),w?.stopPropagation?.(),b.blur();try{await du({reservation:c,customer:d,project:l})}catch(v){console.error("❌ [reservations] export to PDF failed",v),S(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(p).show(),!0}function so(){const e=()=>{Nn(),Fe(),Pn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let Ar=!1,Ir=null;function pu(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function mm(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=pu(n);if(!a&&Ar&&Lt().length>0&&s===Ir)return Lt();try{const r=await Mr(n||{});return Ar=!0,Ir=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return Lt()}}async function fu(e,{onAfterChange:t}={}){if(!Ht())return $n(),!1;const a=Lt()[e];if(!a)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await Ac(s),so(),t?.({type:"deleted",reservation:a}),S(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=da(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return S(i,"error"),!1}}async function yu(e,{onAfterChange:t}={}){const a=Lt()[e];if(!a)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=At(a);if(r)return S(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await Ic(s);return so(),t?.({type:"confirmed",reservation:i}),S(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=da(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return S(c,"error"),!1}}function cn(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:xn(e,n),end:xn(t,a)}}function ra(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ks(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function ro(){const{container:e,select:t,hint:n,addButton:a}=Ks();if(!t)return;const s=t.value,r=jr(),i=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,d=r.map(u=>{const p=Number.isFinite(Number(u.price))?Number(u.price):0,f=h(p.toFixed(2)),m=`${u.name} — ${f} ${i}`;return`<option value="${ra(u.id)}">${ra(m)}</option>`}).join("");t.innerHTML=`${c}${d}`;const l=r.length>0;t.disabled=!l,a&&(a.disabled=!l),e&&(e.hidden=!l,e.setAttribute("aria-hidden",l?"false":"true")),n&&(l?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),l&&s&&r.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function gu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||S(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=kt(),{start:r,end:i}=cn(),{reservations:c=[]}=ue(),d=a!=null&&c[a]||null,l=d?.id??d?.reservationId??null,u=pi(n,{existingItems:s,start:r,end:i,ignoreReservationId:l});if(!u.success)return t||S(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const p=[...s,u.package];return _t(a,p),It(p),Qe(),t||S(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function kr(){const{select:e}=Ks();if(!e)return;const t=e.value||"";gu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function bu(){const{addButton:e,select:t}=Ks();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{kr()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),kr())}),t.dataset.listenerAttached="true"),ro()}function It(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,$r(t);return}const d=an(e);t.innerHTML=d.map(l=>{const u=l.items[0]||{},p=Ot(u)||l.image,f=p?`<img src="${p}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=l.items.some($=>$?.type==="package"),y=h(String(l.count)),g=ut(l.unitPrice),b=Number.isFinite(g)?Ie(g):0,w=ut(l.totalPrice),v=Number.isFinite(w)?w:b*(Number.isFinite(l.count)?l.count:1),k=Ie(v),F=`${h(b.toFixed(2))} ${a}`,V=`${h(k.toFixed(2))} ${a}`,q=l.barcodes.map($=>h(String($||""))).filter(Boolean),x=q.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${q.map($=>`<li>${$}</li>`).join("")}
            </ul>
          </details>`:"";let _="";if(m){const $=new Map,B=P=>{const j=Number.parseFloat(h(String(P??"")).replace(/[^0-9.]/g,""));return!Number.isFinite(j)||j<=0||j>99?1:Math.round(j)},K=[];if(Array.isArray(l.packageItems)&&l.packageItems.length&&K.push(...l.packageItems),l.items.forEach(P=>{Array.isArray(P?.packageItems)&&K.push(...P.packageItems)}),K.forEach(P=>{if(!P)return;const j=te(P.barcode||P.normalizedBarcode||P.desc||Math.random());if(!j)return;const A=$.get(j),G=B(P.qtyPerPackage??P.perPackageQty??P.quantityPerPackage??P.qty??P.quantity??1),z=Math.max(1,Math.min(G,99));if(A){A.qty=z;return}$.set(j,{desc:P.desc||P.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:z,barcode:P.barcode??P.normalizedBarcode??""})}),$.size){const P=Array.from($.values()).map(j=>{const A=h(String(j.qty>0?Math.min(j.qty,99):1)),G=ra(j.desc||""),z=j.barcode?` <span class="reservation-package-items__barcode">(${ra(h(String(j.barcode)))})</span>`:"";return`<li>${G}${z} × ${A}</li>`}).join("");_=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${P}
              </ul>
            </details>
          `}}const N=m?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",D=m?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${l.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${l.description||"-"}</div>
                ${m?`${_||""}${x||""}`:x}
              </div>
            </div>
          </td>
          <td>
            <div class="${N}" data-group-key="${l.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${l.key}" aria-label="${i}"${D}>−</button>
              <span class="reservation-qty-value">${y}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${l.key}" aria-label="${r}"${D}>+</button>
            </div>
          </td>
          <td>${F}</td>
          <td>${V}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${l.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),$r(t)}function hu(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function Aa(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=Ia();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,_r();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${h(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${h(Number(s.percentage).toFixed(2))}%`:"—",d=s?.recordedAt?h(Ue(s.recordedAt)):"—",l=hu(s?.type),u=s?.note?h(s.note):"";return`
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
  `,_r()}function vu(){if(kn()){S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=co(e);let a=lo(t);if(!Number.isFinite(a)||a<=0){S(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=Oa.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,d=o("reservations.create.summary.currency","SR");let l=null,u=null;if(n==="percent"){const f=Math.max(0,100-i);if(f<=1e-4){S(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const y=h(m.toFixed(2));S(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",y)),a=m}u=Number(a.toFixed(2)),r>0&&(l=a/100*r)}else{const f=Math.max(0,r-c);if(f<=1e-4){S(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const y=`${h(m.toFixed(2))} ${d}`;S(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",y)),a=m}l=Number(a.toFixed(2)),r>0&&(u=l/r*100)}l!=null&&(l=Number(l.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const p={type:n,value:a,amount:l,percentage:u,recordedAt:new Date().toISOString()};$u(p),Qs(Ia()),Aa(),Qe(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),S(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function _r(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(kn()){n.preventDefault(),S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}vu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(kn()){n.preventDefault(),S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(Pu(s),Qs(Ia()),Aa(),Qe(),S(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function qu(e){const{index:t,items:n}=kt(),s=an(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,d)=>d!==r);_t(t,i),It(i),Qe()}function Su(e){const{index:t,items:n}=kt(),a=n.filter(s=>la(s)!==e);a.length!==n.length&&(_t(t,a),It(a),Qe())}function Eu(e){const{index:t,items:n}=kt(),s=an(n).find(b=>b.key===e);if(!s||s.items.some(b=>b?.type==="package"))return;const{start:r,end:i}=cn();if(!r||!i){S(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=ue(),d=t!=null&&c[t]||null,l=d?.id??d?.reservationId??null,u=new Set(n.map(b=>te(b.barcode))),{equipment:p=[]}=ue(),f=(p||[]).find(b=>{const w=te(b?.barcode);return!w||u.has(w)||la({desc:b?.desc||b?.description||b?.name||"",price:Number(b?.price)||0})!==e||!ks(b)?!1:!it(w,r,i,l)});if(!f){S(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const m=te(f.barcode),y=zt(f);if(!y){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:y,equipmentId:y,barcode:m,desc:f.desc||f.description||f.name||s.description||"",qty:1,price:Number.isFinite(Number(f.price))?Number(f.price):s.unitPrice,image:Ot(f)}];_t(t,g),It(g),Qe()}function $r(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){qu(s);return}if(a==="increase-edit-group"&&s){Eu(s);return}if(a==="remove-edit-group"&&s){Su(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||Au(i)}}),e.dataset.groupListenerAttached="true")}function kn(){return!!document.getElementById("edit-res-project")?.value}function xu(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{kn()&&(S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function wu(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),d=document.getElementById("edit-res-payment-history");[n,a,s,r,i,c,d].forEach(xu),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s&&(s.value="unpaid",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),d&&(d.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.dataset.linkedDisabled="false"))}function Qe(){const e=document.getElementById("edit-res-summary");if(!e)return;Aa();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),Ve(a),Qe()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=kn();wu(c);const d=document.getElementById("edit-res-tax"),l=c?!1:d?.checked||!1,u=!c&&a?.dataset?.userSelected==="true",p=c?"unpaid":u&&a?.value||"unpaid";let f=null;!c&&l&&(Je("edit-res-company-share"),f=en("edit-res-company-share"),(!Number.isFinite(f)||f<=0)&&(Je("edit-res-company-share"),f=en("edit-res-company-share")));const{items:m=[],payments:y=[]}=kt(),{start:g,end:b}=cn(),w=Oa({items:m,discount:r,discountType:i,applyTax:l,paidStatus:p,start:g,end:b,companySharePercent:f,paymentHistory:y});e.innerHTML=w;const v=Oa.lastResult;if(v&&a){const k=v.paymentStatus;u?Ve(a,a.value):(a.value!==k&&(a.value=k),a.dataset&&delete a.dataset.userSelected,Ve(a,k))}else a&&Ve(a,a.value)}function Au(e){if(e==null)return;const{index:t,items:n}=kt();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);_t(t,a),It(a),Qe()}function Iu(e){const t=e?.value??"",n=te(t);if(!n)return;const a=ma(n);if(!a){S(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=bt(a);if(s==="maintenance"||s==="retired"){S(Mt(s));return}const r=te(n),{index:i,items:c=[]}=kt();if(c.findIndex(b=>te(b.barcode)===r)>-1){S(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:l,end:u}=cn();if(!l||!u){S(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:p=[]}=ue(),f=i!=null&&p[i]||null,m=f?.id??f?.reservationId??null;if(it(r,l,u,m)){S(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const y=zt(a);if(!y){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:y,equipmentId:y,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];_t(i,g),e&&(e.value=""),It(g),Qe()}function ia(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=li(t),a=te(n?.barcode||t);if(!n||!a){S(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=bt(n);if(s==="maintenance"||s==="retired"){S(Mt(s));return}const{start:r,end:i}=cn();if(!r||!i){S(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:d=[]}=kt();if(d.some(g=>te(g.barcode)===a)){S(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=ue(),p=c!=null&&u[c]||null,f=p?.id??p?.reservationId??null;if(it(a,r,i,f)){S(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=zt(n);if(!m){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const y=[...d,{id:m,equipmentId:m,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];_t(c,y),It(y),Qe(),e.value=""}function io(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),ia(e))});const t=()=>{di(e.value,"edit-res-equipment-description-options")&&ia(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{Qe()});const e=()=>{bu()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{ro()})}typeof window<"u"&&(window.getEditReservationDateRange=cn,window.renderEditPaymentHistory=Aa);function ku(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){Za(e);return}ia(e)}}function pm(){wt(),io()}function _u(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let _n=null,nt=[],st=[],ds=null,Le={},Ha=!1;function us(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function ms(){return document.getElementById("edit-res-confirmed")?.value==="true"}function kt(){return{index:_n,items:nt,payments:st}}function _t(e,t,n=st){_n=typeof e=="number"?e:null,nt=Array.isArray(t)?[...t]:[],st=Array.isArray(n)?[...n]:[]}function oo(){_n=null,nt=[],$c(),st=[]}function Ia(){return[...st]}function Qs(e){st=Array.isArray(e)?[...e]:[]}function $u(e){e&&(st=[...st,e])}function Pu(e){!Number.isInteger(e)||e<0||(st=st.filter((t,n)=>n!==e))}function En(e,t=1){const n=Number.parseFloat(h(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function ps(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(h(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function Tu(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?te(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:En(e.qty??e.quantity??e.count??1),price:ps(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function Nu(e,t=0){if(!e||typeof e!="object")return null;const n=wn(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=En(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),r=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:hs(e)).map(f=>Tu(f)).filter(Boolean),i=e.total_price??e.totalPrice??e.total??null;let c=ps(e.unit_price??e.unitPrice??e.price??null,0);if((!c||c===0)&&i!=null){const f=ps(i,0);f>0&&a>0&&(c=Number((f/a).toFixed(2)))}const d=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,d,n].find(f=>f!=null&&String(f).trim()!=="")||`Package ${n}`,p=e.image??e.cover??e.thumbnail??r.find(f=>f?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:h(String(u)),name:h(String(u)),qty:a,price:c,barcode:d,packageItems:r,image:p}}function ju(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const r=s-n;e.set(a,r>0?r:0)})}function Cu(e={},t=[]){const n=Array.isArray(t)?t.map(c=>({...c})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((c,d)=>Nu(c,d)).filter(Boolean);if(!s.length)return n;const r=new Map;s.forEach(c=>{const d=En(c.qty??c.quantity??1);if(c.barcode){const l=te(c.barcode);if(l){const u=`package::${l}`;r.set(u,(r.get(u)??0)+d)}}(c.packageItems||[]).forEach(l=>{if(!l)return;const u=d*En(l.qty??l.quantity??1),p=l.equipmentId??null,f=l.normalizedBarcode||(l.barcode?te(l.barcode):null);if(p!=null){const m=`equipment::${String(p)}`;r.set(m,(r.get(m)??0)+u)}if(f){const m=`barcode::${f}`;r.set(m,(r.get(m)??0)+u)}})});const i=[];return n.forEach(c=>{if(!c||typeof c!="object"){i.push(c);return}if(c.type==="package"){const b=wn(c.packageId??c.package_id??c.id??"");s.some(v=>v.packageId===b)||i.push({...c});return}const d=En(c.qty??c.quantity??1),l=zt(c),u=c.barcode?te(c.barcode):null,p=[];l!=null&&p.push(`equipment::${String(l)}`),u&&p.push(`barcode::${u}`);const f=p.map(b=>r.get(b)??0).filter(b=>b>0);if(!f.length){i.push({...c});return}const m=Math.min(...f);if(m<=0){i.push({...c});return}const y=Math.min(m,d);if(ju(r,p,y),y>=d)return;const g=d-y;i.push({...c,qty:g,quantity:g})}),[...i,...s.map(c=>({...c}))]}function Lu(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function co(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function lo(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Bu(e,t){if(e){e.value="";return}}function gn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function uo(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),d=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,l=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:d,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:l}}function Fu(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((d,l)=>String(l.createdAt||l.start||"").localeCompare(String(d.createdAt||d.start||""))):[],c=[`<option value="">${gn(a)}</option>`];i.forEach(d=>{c.push(`<option value="${gn(d.id)}">${gn(d.title||a)}</option>`)}),r&&!i.some(d=>String(d.id)===r)&&c.push(`<option value="${gn(r)}">${gn(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function mo(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const d=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",d&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}fs("tax");const c=Le?.updateEditReservationSummary;typeof c=="function"&&c()}function fs(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=Le?.updateEditReservationSummary;typeof r=="function"&&r()};if(Ha){a();return}Ha=!0;const s=()=>{Ha=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(gt)),t.disabled){n.checked=!1,S(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),Je("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Je("edit-res-company-share"):n.checked&&(n.checked=!1));s()}function Pr(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:d}=ue(),u=Lt()?.[e];if(!u){S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}Le={...Le,reservation:u,projects:d||[]},t?.(),Fu(d||[],u);const p=u.projectId&&d?.find?.(I=>String(I.id)===String(u.projectId))||null,{effectiveConfirmed:f,projectLinked:m}=At(u,p),y=u.items?u.items.map(I=>({...I,equipmentId:I.equipmentId??I.equipment_id??I.id,barcode:te(I?.barcode)})):[],g=Cu(u,y),w=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(I=>uo(I)).filter(Boolean);_t(e,g,w);const v=o("reservations.list.unknownCustomer","غير معروف"),k=c?.find?.(I=>String(I.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const F=document.getElementById("edit-res-id");F&&(F.value=u.reservationId||u.id);const V=document.getElementById("edit-res-customer");V&&(V.value=k?.customerName||v);const q=typeof a=="function"?a(u.start):{date:"",time:""},x=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",q.date),n?.("edit-res-start-time",q.time),n?.("edit-res-end",x.date),n?.("edit-res-end-time",x.time);const _=document.getElementById("edit-res-notes");_&&(_.value=u.notes||"");const N=document.getElementById("edit-res-discount");if(N){const I=m?0:u.discount??0;N.value=h(I)}const D=document.getElementById("edit-res-discount-type");D&&(D.value=m?"percent":u.discountType||"percent");const $=u.projectId?!1:!!u.applyTax,B=document.getElementById("edit-res-tax");B&&(B.checked=$);const K=document.getElementById("edit-res-company-share");if(K){const I=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,O=I!=null?Number.parseFloat(h(String(I).replace("%","").trim())):NaN,R=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,M=R!=null?R===!0||R===1||R==="1"||String(R).toLowerCase()==="true":Number.isFinite(O)&&O>0,H=M&&Number.isFinite(O)&&O>0?O:gt,ne=$||M;K.checked=ne,K.dataset.companyShare=String(H)}us(f,{disable:m});const P=document.getElementById("edit-res-paid"),j=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");P&&(P.value=j,P.dataset&&delete P.dataset.userSelected);const A=document.getElementById("edit-res-payment-progress-type"),G=document.getElementById("edit-res-payment-progress-value");if(A?.dataset?.userSelected&&delete A.dataset.userSelected,A&&(A.value="percent"),Bu(G),Pc((u.technicians||[]).map(I=>String(I))),s?.(g),typeof window<"u"){const I=window?.renderEditPaymentHistory;typeof I=="function"&&I()}mo(),r?.();const z=document.getElementById("editReservationModal");ds=Lu(z,i),ds?.show?.()}async function Du({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:r,populateEquipmentDescriptionLists:i,handleReservationsMutation:c}={}){if(_n===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const d=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),p=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",f=document.getElementById("edit-res-notes")?.value||"",m=h(document.getElementById("edit-res-discount")?.value||"0");let y=parseFloat(m)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const b=ms(),w=document.getElementById("edit-res-paid"),v=w?.dataset?.userSelected==="true",k=v&&w?.value||"unpaid",F=document.getElementById("edit-res-payment-progress-type"),V=document.getElementById("edit-res-payment-progress-value"),q=co(F),x=lo(V),_=document.getElementById("edit-res-project")?.value||"",N=kc(),D=document.getElementById("edit-res-company-share"),$=document.getElementById("edit-res-tax");if(!d||!u){S(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const B=typeof e=="function"?e:(Y,be)=>`${Y}T${be||"00:00"}`,K=B(d,l),P=B(u,p);if(K&&P&&new Date(K)>new Date(P)){S(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const A=Lt()?.[_n];if(!A){S(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(nt)||nt.length===0&&N.length===0){S(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const G=typeof t=="function"?t:()=>!1,z=A.id??A.reservationId;for(const Y of nt){if(Y?.type==="package"&&Array.isArray(Y.packageItems)){for(const L of Y.packageItems){const ae=L?.barcode??L?.normalizedBarcode??"";if(!ae)continue;const pe=bt(ae);if(pe==="reserved"){const ce=te(ae);if(!G(ce,K,P,z))continue}if(pe!=="available"){S(Mt(pe));return}}continue}const be=bt(Y.barcode);if(be==="reserved"){const L=te(Y.barcode);if(!G(L,K,P,z))continue}if(be!=="available"){S(Mt(be));return}}for(const Y of nt){if(Y?.type==="package"&&Array.isArray(Y.packageItems)){for(const L of Y.packageItems){const ae=te(L?.barcode??L?.normalizedBarcode??"");if(ae&&G(ae,K,P,z)){const pe=L?.desc||L?.barcode||o("reservations.create.packages.unnamedItem","معدة بدون اسم"),ce=`${o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${h(String(pe))})`;S(ce);return}}continue}const be=te(Y.barcode);if(G(be,K,P,z)){S(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const I=typeof n=="function"?n:()=>!1;for(const Y of nt){if(Y?.type!=="package")continue;const be=Y.packageId??Y.package_id??null;if(be&&I(be,K,P,z)){const L=Y.desc||Y.packageName||o("reservations.create.packages.genericName","الحزمة");S(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${h(String(L))} محجوزة بالفعل في الفترة المختارة`));return}}const O=typeof a=="function"?a:()=>!1;for(const Y of N)if(O(Y,K,P,z)){S(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const R=Array.isArray(Le.projects)&&Le.projects.length?Le.projects:ue().projects||[],M=_&&R.find(Y=>String(Y.id)===String(_))||null,H={...A,projectId:_?String(_):null,confirmed:b},{effectiveConfirmed:ne,projectLinked:ee,projectStatus:oe}=At(H,M);let X=!!D?.checked,re=!!$?.checked;if(ee&&(X&&(D.checked=!1,X=!1),re=!1),!ee&&X!==re){S(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}re&&(Je("edit-res-company-share"),X=!!D?.checked);let he=X?getCompanySharePercent("edit-res-company-share"):null;X&&(!Number.isFinite(he)||he<=0)&&(Je("edit-res-company-share"),he=getCompanySharePercent("edit-res-company-share"));const ve=X&&re&&Number.isFinite(he)&&he>0,$e=ee?!1:re;ee&&(y=0,g="percent");const U=qs(nt,y,g,$e,N,{start:K,end:P,companySharePercent:ve?he:0});let Z=Ia();if(Number.isFinite(x)&&x>0){const Y=U;let be=null,L=null;q==="amount"?(be=x,Y>0&&(L=x/Y*100)):(L=x,Y>0&&(be=x/100*Y));const ae=uo({type:q,value:x,amount:be,percentage:L,recordedAt:new Date().toISOString()});ae&&(Z=[...Z,ae],Qs(Z)),V&&(V.value="")}const se=Ss({totalAmount:U,history:Z}),fe=Es({manualStatus:k,paidAmount:se.paidAmount,paidPercent:se.paidPercent,totalAmount:U});w&&!v&&(w.value=fe,w.dataset&&delete w.dataset.userSelected);let me=A.status??"pending";ee?me=M?.status??oe??me:["completed","cancelled"].includes(String(me).toLowerCase())||(me=b?"confirmed":"pending");const Ye=Fr({reservationCode:A.reservationCode??A.reservationId??null,customerId:A.customerId,start:K,end:P,status:me,title:A.title??null,location:A.location??null,notes:f,projectId:_?String(_):null,totalAmount:U,discount:y,discountType:g,applyTax:$e,paidStatus:fe,confirmed:ne,items:nt.map(Y=>({...Y,equipmentId:Y.equipmentId??Y.id})),technicians:N,companySharePercent:ve?he:null,companyShareEnabled:ve,paidAmount:se.paidAmount,paidPercentage:se.paidPercent,paymentProgressType:se.paymentProgressType,paymentProgressValue:se.paymentProgressValue,paymentHistory:Z});try{const Y=await _c(A.id||A.reservationId,Ye);await Mr(),Nn(),Fe(),S(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),oo(),c?.({type:"updated",reservation:Y}),r?.(),i?.(),ds?.hide?.()}catch(Y){console.error("❌ [reservationsEdit] Failed to update reservation",Y);const be=da(Y)?Y.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");S(be,"error")}}function fm(e={}){Le={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=Le,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=h(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{fs("tax")}),c.dataset.listenerAttached="true");const d=document.getElementById("edit-res-company-share");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{fs("share")}),d.dataset.listenerAttached="true");const l=document.getElementById("edit-res-payment-progress-type");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{l.dataset.userSelected="true",t?.()}),l.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const p=document.getElementById("edit-res-project");p&&!p.dataset.listenerAttached&&(p.addEventListener("change",()=>{mo();const b=Array.isArray(Le.projects)&&Le.projects.length?Le.projects:ue().projects||[],w=p.value&&b.find(q=>String(q.id)===String(p.value))||null,k={...Le?.reservation??{},projectId:p.value||null,confirmed:ms()},{effectiveConfirmed:F,projectLinked:V}=At(k,w);us(F,{disable:V}),t?.()}),p.dataset.listenerAttached="true");const f=document.getElementById("edit-res-confirmed-btn");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{if(f.disabled)return;const b=!ms();us(b),t?.()}),f.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{Du(Le).catch(b=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",b)})}),m.dataset.listenerAttached="true");const y=document.getElementById("edit-res-equipment-barcode");if(y&&!y.dataset.listenerAttached){let b=null;const w=()=>{y.value?.trim()&&(clearTimeout(b),b=null,n?.(y))};y.addEventListener("keydown",k=>{k.key==="Enter"&&(k.preventDefault(),w())});const v=()=>{if(clearTimeout(b),!y.value?.trim())return;const{start:k,end:F}=getEditReservationDateRange();!k||!F||(b=setTimeout(()=>{w()},150))};y.addEventListener("input",v),y.addEventListener("change",w),y.dataset.listenerAttached="true"}io?.();const g=document.getElementById("editReservationModal");g&&!g.dataset.cleanupAttached&&(g.addEventListener("hidden.bs.modal",()=>{oo(),t?.(),s?.([])}),g.dataset.cleanupAttached="true")}const Ru=ue()||{};let Xe=(Ru.projects||[]).map(zu),Cn=!1;function ym(){return Xe}function ka(e){Xe=Array.isArray(e)?e.map(Ws):[],gs({projects:Xe});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return Xe}async function Mu(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,d])=>{d==null||d===""||t.set(c,String(d))});const n=t.toString(),s=(await rt(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(Gs);return ka(i),Cn=!0,Xe}async function Hu({force:e=!1,params:t=null}={}){if(!e&&Cn&&Xe.length>0)return Xe;try{return await Mu(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),Xe}}async function gm(e){const t=await rt("/projects/",{method:"POST",body:e}),n=Gs(t?.data??{}),a=[...Xe,n];return ka(a),Cn=!0,n}async function bm(e,t){const n=await rt(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=Gs(n?.data??{}),s=Xe.map(r=>String(r.id)===String(e)?a:r);return ka(s),Cn=!0,a}async function hm(e){await rt(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=Xe.filter(n=>String(n.id)!==String(e));ka(t),Cn=!0}function vm({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:d,paymentStatus:l,equipmentEstimate:u=0,expenses:p=[],taxAmount:f=0,totalWithTax:m=0,discount:y=0,discountType:g="percent",companyShareEnabled:b=!1,companySharePercent:w=null,companyShareAmount:v=0,paidAmount:k=null,paidPercentage:F=null,paymentProgressType:V=null,paymentProgressValue:q=null,confirmed:x=!1,technicians:_=[],equipment:N=[],payments:D,paymentHistory:$}={}){const B=Array.isArray(_)?_.map(R=>Number.parseInt(String(R),10)).filter(R=>Number.isInteger(R)&&R>0):[],K=Array.isArray(N)?N.map(R=>{const M=Number.parseInt(String(R.equipmentId??R.equipment_id??R.id??0),10),H=Number.parseInt(String(R.qty??R.quantity??0),10);return!Number.isInteger(M)||M<=0?null:{equipment_id:M,quantity:Number.isInteger(H)&&H>0?H:1}}).filter(Boolean):[],P=Array.isArray(p)?p.map(R=>{const M=Number.parseFloat(R?.amount??R?.value??0)||0,H=(R?.label??R?.name??"").trim();return H?{label:H,amount:Math.round(M*100)/100}:null}).filter(Boolean):[],j=P.reduce((R,M)=>R+(M?.amount??0),0),A={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!d,payment_status:l??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(j*100)/100,tax_amount:Math.round((Number.parseFloat(f)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(m)||0)*100)/100,confirmed:!!x,technicians:B,equipment:K,expenses:P},G=Math.max(0,Number.parseFloat(y)||0);A.discount=G,A.discount_type=g==="amount"?"amount":"percent";const z=Number.parseFloat(w),I=!!b&&Number.isFinite(z)&&z>0;A.company_share_enabled=I,A.company_share_percent=I?z:0,A.company_share_amount=I?Math.max(0,Number.parseFloat(v)||0):0,Number.isFinite(Number(k))&&(A.paid_amount=Math.max(0,Number.parseFloat(k)||0)),Number.isFinite(Number(F))&&(A.paid_percentage=Math.max(0,Number.parseFloat(F)||0)),(V==="amount"||V==="percent")&&(A.payment_progress_type=V),q!=null&&q!==""&&(A.payment_progress_value=Number.parseFloat(q)||0),e&&(A.project_code=String(e).trim());const O=D!==void 0?D:$;if(O!==void 0){const R=po(O)||[];A.payments=R.map(M=>({type:M.type,amount:M.amount!=null?M.amount:null,percentage:M.percentage!=null?M.percentage:null,value:M.value!=null?M.value:null,note:M.note??null,recorded_at:M.recordedAt??null}))}return A.end_datetime||delete A.end_datetime,A.client_company||(A.client_company=null),A}function Gs(e={}){return Ws(e)}function zu(e={}){return Ws(e)}function Ws(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(m=>{if(m==null)return null;if(typeof m=="object"){const y=m.id??m.technician_id??m.technicianId;return y!=null?String(y):null}return String(m)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(m=>{const y=m?.equipment_id??m?.equipmentId??m?.id??null,g=m?.quantity??m?.qty??0,b=m?.barcode??m?.code??"",w=m?.description??m?.name??"";return{equipmentId:y!=null?String(y):null,qty:Number.parseInt(String(g),10)||0,barcode:b,description:w}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((m,y)=>({id:m?.id??`expense-${t??"x"}-${y}`,label:m?.label??"",amount:Number.parseFloat(m?.amount??0)||0})),d=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,l=e.company_share_enabled??e.companyShareEnabled,u=l!=null?l===!0||l===1||String(l).toLowerCase()==="true":d>0,p=e.payment_history??e.paymentHistory??e.payments??null,f=po(p);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?d:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(m=>typeof m=="object"?m:{id:m}),equipment:r,expenses:c,paymentHistory:f}}function qm(e){return e instanceof Tr}function za(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function Ou(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=za(e.value);let s=za(e.amount),r=za(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,d=e.recordedAt??e.recorded_at??e.date??null;let l=null;if(d){const p=new Date(d);Number.isNaN(p.getTime())||(l=p.toISOString())}l||(l=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:l}}function po(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>Ou(t)).filter(Boolean):[]}const oa="reservations-ui:ready",jt=typeof EventTarget<"u"?new EventTarget:null;let Ct={};function Vu(e){return Object.freeze({...e})}function Uu(){if(!jt)return;const e=Ct,t=typeof CustomEvent=="function"?new CustomEvent(oa,{detail:e}):{type:oa,detail:e};typeof jt.dispatchEvent=="function"&&jt.dispatchEvent(t)}function Ku(e={}){if(!e||typeof e!="object")return Ct;const t={...Ct};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),Ct=Vu(t),Uu(),Ct}function Qu(e){if(e)return Ct?.[e]}function Sm(e){const t=Qu(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const i=(s?.detail||Ct)?.[e];typeof i=="function"&&(jt&&jt.removeEventListener(oa,a),n(i))};jt&&jt.addEventListener(oa,a)})}function Em(){return Hu().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=ue()||{};Tc(e||[]),bi()})}function Xs(e=null){bi(),fo(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Gu(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function ys(){return{populateEquipmentDescriptionLists:wt,setFlatpickrValue:_u,splitDateTime:Cr,renderEditItems:It,updateEditReservationSummary:Qe,addEquipmentByDescription:ku,addEquipmentToEditingReservation:Iu,addEquipmentToEditingByDescription:ia,combineDateTime:xn,hasEquipmentConflict:it,hasTechnicianConflict:Br,renderReservations:fo,handleReservationsMutation:Xs,ensureModal:Gu}}function fo(e="reservations-list",t=null){uu({containerId:e,filters:t,onShowDetails:yo,onConfirmReservation:bo})}function yo(e){return mu(e,{getEditContext:ys,onEdit:(t,{reservation:n})=>{ho(t,n)},onDelete:go})}function go(e){return Ht()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?fu(e,{onAfterChange:Xs}):!1:($n(),!1)}function bo(e){return yu(e,{onAfterChange:Xs})}function ho(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}Pr(e,ys());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}Pr(e,ys());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}mc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function xm(){Ku({showReservationDetails:yo,deleteReservation:go,confirmReservation:bo,openReservationEditor:ho})}export{Ku as A,yo as B,Gs as C,im as D,rn as E,om as F,ym as G,qm as H,vi as I,cm as J,um as K,tm as L,nm as M,Mu as N,am as O,rm as P,sm as Q,lm as R,hm as S,gm as T,Xl as U,Si as V,Ei as W,dm as X,Hu as a,xm as b,fm as c,pm as d,mm as e,bi as f,ys as g,le as h,Zu as i,Xs as j,Ul as k,Em as l,va as m,Fe as n,Rc as o,Qn as p,Ju as q,fo as r,em as s,Yu as t,Qe as u,Qu as v,Sm as w,hi as x,vm as y,bm as z};
