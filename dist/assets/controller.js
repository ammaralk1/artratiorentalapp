import{n as h,d as ue,f as Fo,t as o,b as ze,h as E,j as Et,o as cn,s as za,A as tr,z as Ro,k as Ne,B as nr,u as Mo}from"./auth.js";import{n as ce,x as Ve,y as Ho,z as Oo,D as Ye,A as Va,B as ks,C as nn,E as ar,F as zo,G as Ze,H as Ua,I as Mn,J as wn,K as Vo,L as Uo,M as sr,v as Ka,h as Qa,j as Ga,N as rr,O as Ko,s as ln,c as Hn,P as ir,Q as _s,R as Qo,f as $s,S as Go,T as Wo,U as Xo,V as Jo,W as or,X as cr,Y as Yo,p as On,a as lr,g as bt,Z as Zo,_ as ec,$ as ba,a0 as tc,w as nc,a1 as ac,a2 as sc,b as rc}from"./reservationsService.js";const la="select.form-select:not([data-no-enhance]):not([multiple])",Ue=new WeakMap;let da=null,Ts=!1,Ge=null;function Eu(e=document){e&&(e.querySelectorAll(la).forEach(t=>vn(t)),!da&&e===document&&(da=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(la)&&vn(a),a.querySelectorAll?.(la).forEach(s=>vn(s)))})}),da.observe(document.body,{childList:!0,subtree:!0})),Ts||(Ts=!0,document.addEventListener("pointerdown",cc,{capture:!0})))}function hn(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){vn(e);return}const t=e.closest(".enhanced-select");t&&(Wa(t),In(t),ha(t))}function vn(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){hn(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};Ue.set(t,r),a.addEventListener("click",()=>oc(t)),a.addEventListener("keydown",i=>lc(i,t)),s.addEventListener("click",i=>uc(i,t)),s.addEventListener("keydown",i=>dc(i,t)),e.addEventListener("change",()=>{In(t),dr(t)}),r.observer=new MutationObserver(i=>{let c=!1,d=!1;for(const l of i)l.type==="attributes"&&l.attributeName==="disabled"&&(d=!0),l.type==="childList"&&(c=!0);d&&ha(t),c&&ic(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),Wa(t),In(t),ha(t)}function ic(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,Wa(t),In(t)})))}function Wa(e){const t=Ue.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),dr(e)}function In(e){const t=Ue.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function dr(e){const t=Ue.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function ha(e){const t=Ue.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function oc(e){Ue.get(e)&&(e.getAttribute("data-open")==="true"?Mt(e):ur(e))}function ur(e){const t=Ue.get(e);if(!t)return;Ge&&Ge!==e&&Mt(Ge,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),Ge=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function Mt(e,{focusTrigger:t=!0}={}){const n=Ue.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),Ge===e&&(Ge=null))}function cc(e){if(!Ge)return;const t=e.target;t instanceof Node&&(Ge.contains(t)||Mt(Ge,{focusTrigger:!1}))}function lc(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),ur(t)):n==="Escape"&&Mt(t)}function dc(e,t){const n=e.key,a=Ue.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&mr(i,t)}else n==="Escape"&&(e.preventDefault(),Mt(t))}function uc(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&mr(n,t)}function mr(e,t){const n=Ue.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),Mt(t)}const Ht=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let We=null;function Xa(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function pr(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function mc(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function pc(e={}){const t=mc({...e,activatedAt:Date.now()});return We=t,pr(!0,t.mode||"create"),Xa(Ht.change,{active:!0,selection:{...t}}),t}function An(e="manual"){if(!We)return;const t=We;We=null,pr(!1),Xa(Ht.change,{active:!1,previous:t,reason:e})}function fr(){return!!We}function fc(){return We?{...We}:null}function yc(e){if(!We)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=h(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:r,description:i}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const d=c.map(u=>h(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!d.length)return!1;const l=Number.isInteger(s)&&s>0?s:d.length;t={barcodes:d,quantity:Math.min(l,d.length)},r&&(t.groupKey=r),i&&(t.description=i)}else return!1;return Xa(Ht.requestAdd,{...t,selection:{...We}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||An("tab-changed")});const gc=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),bc=new Set(["maintenance","reserved","retired"]);function hc(e){const t=String(e??"").trim().toLowerCase();return t&&gc.get(t)||"available"}function vc(e){return e?typeof e=="object"?e:zn(e):null}function ct(e){const t=vc(e);return t?hc(t.status||t.state||t.statusLabel||t.status_label):"available"}function Ja(e){return!bc.has(ct(e))}function xt(e={}){return e.image||e.imageUrl||e.img||""}function qc(e){if(!e)return null;const t=ce(e),{equipment:n=[]}=ue();return(n||[]).find(a=>ce(a?.barcode)===t)||null}function zn(e){const t=ce(e);if(!t)return null;const{equipment:n=[]}=ue();return(n||[]).find(a=>ce(a?.barcode)===t)||null}const Sc=ue()||{};let st=(Sc.equipment||[]).map(wc),va=!1,Yt="",ft=null,vt=null,qt=null,Vn=!1,js=!1;function Ec(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function xc(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function wc(e={}){return Ya({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function Un(e={}){return Ya(e)}function Ya(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=dn(e.quantity??e.qty??0),i=Kn(e.unit_price??e.price??0),c=h(String(e.barcode??"").trim()),d=_e(e.status??e.state??e.status_label??e.statusLabel??"available"),l=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:Ic(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:d,image:l,imageUrl:l,created_at:e.created_at??null,updated_at:e.updated_at??null}}function Ic(e){return e!=null&&e!==""}function dn(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function Kn(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function Ac(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function Cs(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function kc(e,t){const n=Cs(e),a=Cs(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}else{if(r!==i)return r?-1:1;{const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}}const c=kn(e?.desc||e?.description||e?.name||""),d=kn(t?.desc||t?.description||t?.name||"");return c.localeCompare(d,"ar",{sensitivity:"base"})}function ve(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function _e(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function _c(e){return _e(e)}function qa(){if(!fr())return null;const e=fc();return e?{...e}:null}function $c(e){const t=qa();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:r=null}=t,i=t?.mode||t?.source||"",c=[],d=new Set;if(n.forEach(f=>{const m=ce(f?.barcode);!m||d.has(m)||(d.add(m),c.push({variant:f,barcode:m}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(i==="package-manager"||i==="equipment-packages"){const f=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:m})=>m),maxQuantity:f,reason:""}}const l=c.filter(({variant:f})=>Ja(f));if(!a||!s)return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=l.filter(({barcode:f})=>!Ve(f,a,s,r));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:f})=>f),maxQuantity:u.length};let p=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(l.length>0)p=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const f=new Set(c.map(({variant:m})=>_e(m?.status)));f.has("maintenance")?p=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):f.has("reserved")?p=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):f.has("retired")&&(p=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:p,availableBarcodes:[],maxQuantity:0}}function Tc(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function yr(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=qa();e.hidden=!s;const r=s?.mode||s?.source||"";s?r==="package-manager"||r==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=qa(),d=c?.mode||c?.source||"";d==="package-manager"||d==="equipment-packages"?An("package-finish-button"):(An("return-button"),Tc())}),t.dataset.listenerAttached="true")}function Le(){return st}function St(e){st=Array.isArray(e)?e.map(Ya):[],za({equipment:st}),xc()}function kn(e){return String(e??"").trim().toLowerCase()}function it(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=kn(t);return n||(n=kn(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function Qn(e){const t=it(e);return t?Le().filter(n=>it(n)===t):[]}function Gn(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=Wn(e);if(n){const a=ve(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${ve(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function Za(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function _n(){const e=Za();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function es(e={}){const t=Za();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function Bt(e){Vn=e;const t=Za(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function xu(e){if(!Et()){cn();return}if(!e)return;try{await Cc()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let d=0;if(i.forEach(l=>{const u=l.القسم??l.category??"",p=l["القسم الثانوي"]??l.subcategory??"",f=l.الوصف??l.description??l.name??"",m=l.الكمية??l.quantity??0,y=l.السعر??l.price??0,b=l.الباركود??l.barcode??"",g=l.الحالة??l.status??"متاح",w=l.الصورة??l.image_url??l.image??"",v=h(String(b||"")).trim();if(!f||!v){d+=1;return}c.push(ts({category:u,subcategory:p,description:f,quantity:m,unit_price:y,barcode:v,status:g,image_url:w}))}),!c.length){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const l=await ze("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(l?.data)?l.data.map(Un):[];if(u.length){const m=[...Le(),...u];St(m)}await Xn({showToastOnError:!1}),$e();const p=l?.meta?.count??u.length,f=[];p&&f.push(`${p} ✔️`),d&&f.push(`${d} ⚠️`),E(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(f.length?` (${f.join(" / ")})`:""))}catch(l){const u=Ot(l,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");E(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const jc="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let Qt=null;function Cc(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):Qt||(Qt=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=jc,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),Qt=null,e}),Qt)}function ts({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const d=h(String(r||"")).trim(),l=_c(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:dn(a),unit_price:Kn(s),barcode:d,status:l,image_url:c?.trim()||null}}async function Pc(){if(!Et()){cn();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await ze("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await Xn({showToastOnError:!1}),E(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=Ot(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");E(t,"error")}}function Wn(e){return e.image||e.imageUrl||e.img||""}function Nc(e){const t=_e(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function $n(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${ve(a)}</td></tr>`}n&&(n.textContent="0")}function gr(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=ft?.groupKey||it(e);if(!r){$n();return}const i=Le().filter(p=>it(p)===r).sort((p,f)=>{const m=String(p.barcode||"").trim(),y=String(f.barcode||"").trim();return!m&&!y?0:m?y?m.localeCompare(y,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){$n();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),d=o("equipment.form.labels.quantity","الكمية"),l=Le(),u=i.map(p=>{const f=p.id&&e.id?String(p.id)===String(e.id):String(p.barcode||"")===String(e.barcode||""),m=f?"equipment-variants-table__row--current":"",y=ve(String(p.barcode||"-")),b=f?`<span class="equipment-variants-current-badge">${ve(c)}</span>`:"",g=h(String(Number.isFinite(Number(p.qty))?Number(p.qty):0)),w=l.indexOf(p),v=ve(o("equipment.item.actions.delete","🗑️ حذف")),I=w>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${w}">${v}</button>
          </div>`:"";return`
        <tr class="${m}">
          <td>
            ${y}
            ${b}
          </td>
          <td>${Nc(p.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${ve(d)}">${g}</span>
          </td>
          <td class="table-actions-cell">${I}</td>
        </tr>
      `}).join("");n.innerHTML=u}function Lc({item:e,index:t}){const n=Wn(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=Et(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},d=Number.isFinite(Number(e.qty))?Number(e.qty):0,l=Number.isFinite(Number(e.price))?Number(e.price):0,u=d.toLocaleString("en-US"),p=l.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),f=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,m=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,y=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(d-f-m,0),b=y.toLocaleString("en-US"),g=o("equipment.card.labels.availableOfTotal","من أصل"),w=_e(e.status);let v=`${ve(c.available)}: ${ve(b)} ${ve(g)} ${ve(u)}`,I="available";if(y===0){const H={reserved:{text:d===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},O=H[w]||H.default;v=ve(O.text),I=O.modifier}const C=`<span class="equipment-card__availability equipment-card__availability--${I}">${v}</span>`,U="",q=e.desc||e.name||"—",x=e.name&&e.name!==e.desc?e.name:"",k=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${p} ${r}`}].map(({label:H,value:O})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${H}</span>
              <span class="equipment-card__detail-value">${O}</span>
            </span>
          `).join("")}
    </div>`,B=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),T=B.length?`<div class="equipment-card__categories">${B.map(({label:H,value:O})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${H}</span>
              <span class="equipment-card__detail-value">${O}</span>
            </div>
          `).join("")}</div>`:"",$=x?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${x}</span>
      </div>`:"",z=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${q}</h3>
    </div>
  `}
      ${k}
    </div>
  `,N=[],_=$c(e),G=_?.availableBarcodes?.length?_.availableBarcodes.join(","):_?.barcode?_.barcode:"";let L="",P="";if(_.active){const H=`equipment-select-qty-${t}`,O=!!_.canSelect,ne=O?Math.max(1,Number(_.maxQuantity||_.availableBarcodes?.length||1)):1,Y=Math.max(1,Math.min(ne,99)),ae=[];for(let Z=1;Z<=Y;Z+=1){const de=h(String(Z));ae.push(`<option value="${Z}"${Z===1?" selected":""}>${de}</option>`)}const W=O?"":" disabled",re=o("reservations.create.equipment.selector.quantityLabel","الكمية"),be=O?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${h(String(ne))}`:_.reason?_.reason:"";L=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${H}">${re}</label>
        <select class="equipment-card__quantity-select" id="${H}" data-equipment-select-quantity${W}>
          ${ae.join("")}
        </select>
        ${be?`<span class="equipment-card__selection-hint">${ve(be)}</span>`:""}
      </div>
    `;const pe=o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),Se=O?"":" disabled",V=_.reason?` title="${ve(_.reason)}"`:"",X=['data-equipment-action="select-reservation"',`data-selection-max="${O?ne:0}"`];G&&X.push(`data-selection-barcodes="${ve(G)}"`),e.groupKey&&X.push(`data-selection-group="${ve(String(e.groupKey))}"`),P=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${X.join(" ")}${Se}${V}>${pe}</button>
    `}i&&N.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const M=N.length?N.join(`
`):"",R=ve(q);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${ve(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${R}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${U}
        ${C}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${z}
        </div>
      </div>
      <div class="equipment-card__body">
        ${T}
        ${$}
      </div>
      ${L||P||M?`<div class="equipment-card__actions equipment-card__actions--center">
            ${L}
            ${P}
            ${M}
          </div>`:""}
    </article>
  `}function Bc(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,a.appendChild(d)}),t.includes(i)&&(a.value=i),hn(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,s.appendChild(d)}),n.includes(i)&&(s.value=i),hn(s)}const r=document.getElementById("filter-status");r&&hn(r)}function un(){const e=ue();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return st=t||[],st;const s=new Date;let r=!1;const i=new Set((a||[]).filter(d=>d?.status==="open").map(d=>h(String(d?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(d=>{if(!d)return d;const l=_e(d.status),u=h(String(d.barcode??"")).trim().toLowerCase(),p=u&&i.has(u);let f=p?"maintenance":"available";if(!p&&u)for(const m of n||[]){if(!Dc(m,s))continue;if(m.items?.some(b=>h(String(b?.barcode??"")).trim().toLowerCase()===u)){f="reserved";break}}return f!==l?(r=!0,{...d,status:f}):{...d,status:f}});return r?St(c):(st=c,za({equipment:st})),st}function Dc(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function ua(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function $e(){const e=document.getElementById("equipment-list");if(!e)return;yr();const t=un(),n=Array.isArray(t)?t:Le(),a=new Map;n.forEach(b=>{if(!b)return;const g=it(b);g&&(a.has(g)||a.set(g,[]),a.get(g).push(b))});const s=Array.from(a.values()).map(b=>{const g=b[0],w=b.reduce((x,A)=>x+(Number.isFinite(Number(A.qty))?Number(A.qty):0),0),v=["maintenance","reserved","available","retired"],I=b.map(x=>_e(x.status)).sort((x,A)=>v.indexOf(x)-v.indexOf(A))[0]||"available",C=b.reduce((x,A)=>{const k=dn(A?.qty??0)||0,B=_e(A?.status);return B==="reserved"?x.reserved+=k:B==="maintenance"&&(x.maintenance+=k),x},{reserved:0,maintenance:0}),U=Math.max(w-C.reserved-C.maintenance,0);return{item:{...g,qty:w,status:I,variants:b,groupKey:it(g),reservedQty:C.reserved,maintenanceQty:C.maintenance,availableQty:U},index:n.indexOf(g)}});s.sort((b,g)=>kc(b.item,g.item));const r=document.getElementById("search-equipment")?.value||"",i=h(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",d=document.getElementById("filter-sub")?.value||"",l=document.getElementById("filter-status")?.value||"",u=l?_e(l):"";if(va&&!n.length){e.innerHTML=ua(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(Yt&&!n.length){e.innerHTML=ua(Yt,{tone:"error",icon:"⚠️"});return}const p=s.filter(({item:b})=>{const g=h(String(b.barcode??"")).toLowerCase().trim(),w=Array.isArray(b.variants)?b.variants.map(q=>h(String(q.barcode??"")).toLowerCase().trim()).filter(Boolean):[],v=!i||b.name&&b.name.toLowerCase().includes(i)||b.desc&&b.desc.toLowerCase().includes(i)||g&&g.includes(i)||w.some(q=>q.includes(i))||b.category&&b.category.toLowerCase().includes(i)||b.sub&&b.sub.toLowerCase().includes(i),I=!c||b.category===c,C=!d||b.sub===d,U=!u||_e(b.status)===u;return v&&I&&C&&U}),f=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),m=p;e.innerHTML=m.length?m.map(Lc).join(""):ua(f);const y=document.getElementById("equipment-list-count");if(y){const b=o("equipment.list.countSuffix","عنصر"),g=h(String(m.length)),w=m.length?`${g} ${b}`:`0 ${b}`;y.textContent=w}Bc(n)}async function Xn({showToastOnError:e=!0}={}){va=!0,Yt="",$e();try{const t=await ze("/equipment/?all=1"),n=Array.isArray(t?.data)?t.data.map(Un):[];St(n)}catch(t){Yt=Ot(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&E(Yt,"error")}finally{va=!1,$e()}}function Ot(e,t,n){if(e instanceof tr){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function Fc(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),r=Kn(t.querySelector("#new-equipment-price")?.value||"0"),i=dn(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",d=t.querySelector("#new-equipment-category")?.value?.trim()||"",l=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){E(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const p=ts({category:d,subcategory:l,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const f=await ze("/equipment/",{method:"POST",body:p}),m=Un(f?.data),y=[...Le(),m];St(y),$e(),t.reset();const b=t.querySelector("#new-equipment-status");b&&(b.value="متاح"),E(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(f){const m=Ot(f,"equipment.toast.addFailed","تعذر إضافة المعدة");E(m,"error")}}async function br(e){if(!Et()){cn();return}const t=Le(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await ze(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),St(a),$e(),E(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=Ot(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");E(s,"error")}}async function Rc(e,t){const n=Le(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},St(r),$e();return}const s=ts({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await ze(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=Un(r?.data),c=[...n];c[e]=i,St(c),$e(),E(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=Ot(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw E(i,"error"),r}}function yn(){$e()}function hr(e){const n=Le()[e];if(!n)return;vt=e;const a=Qn(n),s=a[0]||n,r=a.reduce((d,l)=>d+(Number.isFinite(Number(l.qty))?Number(l.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(d=>_e(d.status)).sort((d,l)=>i.indexOf(d)-i.indexOf(l))[0]||_e(s.status);document.getElementById("edit-equipment-index").value=e,es({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:Wn(s)||"",barcode:s.barcode||"",status:s.status||c}),Bt(!1),qt=_n(),Gn(s),gr(s),ft={groupKey:it(s),barcode:String(s.barcode||""),id:s.id||null},Ec(document.getElementById("editEquipmentModal"))?.show()}function Mc(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),r=s?.querySelector("[data-equipment-select-quantity]");let i=Number.parseInt(r?.value||"1",10);(!Number.isFinite(i)||i<=0)&&(i=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&i>c&&(i=c);const l=(t.dataset.selectionBarcodes||"").split(",").map(m=>m.trim()).filter(m=>m.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",p=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";yc({barcodes:l,quantity:i,groupKey:p,description:u})||E(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||br(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||hr(s)}}function Hc(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||hr(n)}}function Oc(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||br(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function vr(){if(!ft||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=Le(),a=ft.id?n.find(d=>String(d.id)===String(ft.id)):null,s=ft.groupKey,r=s?n.find(d=>it(d)===s):null,i=a||r;if(!i){$n();return}const c=n.findIndex(d=>d===i);if(c>=0){const d=document.getElementById("edit-equipment-index");d&&(d.value=String(c)),vt=c}if(gr(i),!Vn){const d=Qn(i),l=d[0]||i,u=d.reduce((m,y)=>m+(Number.isFinite(Number(y.qty))?Number(y.qty):0),0),p=["maintenance","reserved","available","retired"],f=d.map(m=>_e(m.status)).sort((m,y)=>p.indexOf(m)-p.indexOf(y))[0]||_e(l.status);es({category:l.category||"",subcategory:l.sub||"",description:l.desc||l.description||"",quantity:String(u||l.qty||0),price:l.price!=null?String(l.price):"0",image:Wn(l)||"",barcode:l.barcode||"",status:l.status||f}),qt=_n()}Gn(primary)}function zc(){document.getElementById("search-equipment")?.addEventListener("input",yn),document.getElementById("filter-category")?.addEventListener("change",yn),document.getElementById("filter-sub")?.addEventListener("change",yn),document.getElementById("filter-status")?.addEventListener("change",yn),document.getElementById("add-equipment-form")?.addEventListener("submit",Fc);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),Pc().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",Mc),t.addEventListener("keydown",Hc),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",Oc),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);Ac(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!Vn){qt=_n(),Bt(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){E(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:dn(document.getElementById("edit-equipment-quantity").value)||1,price:Kn(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await Rc(t,n),qt=_n(),Bt(!1),vr()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{zc(),$e(),Xn();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(qt&&es(qt),vt!=null){const a=Le()[vt];if(a){const r=Qn(a)[0]||a;Gn(r)}}Bt(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if($e(),Bt(Vn),vt!=null){const t=Le()[vt];if(t){const a=Qn(t)[0]||t;Gn(a)}}});document.addEventListener("equipment:refreshRequested",()=>{Xn({showToastOnError:!1})});document.addEventListener(Fo.USER_UPDATED,()=>{$e()});document.addEventListener("equipment:changed",()=>{vr()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{ft=null,$n(),vt=null,qt=null,Bt(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!js&&(document.addEventListener(Ht.change,()=>{yr(),$e()}),js=!0);function Ie(e=""){return h(String(e)).trim().toLowerCase()}const Vc=2;function Uc(e){const t=Number(e);return Number.isFinite(t)?t.toFixed(Vc):"0.00"}function Ps(e={}){const t=Number(e?.qty);return Number.isFinite(t)&&t>0?t:1}function mn(e={}){const t=e?.desc||e?.description||e?.name||"",n=Ie(t),a=Uc(e?.price??e?.unitPrice??e?.unit_price??0);return`${n}::${a}`}function wt(e=[]){const t=new Map;return e.forEach((n,a)=>{const s=mn(n);if(!s)return;if(!t.has(s)){const i=n?.desc||n?.description||n?.name||"",c=Ie(i),d=Ns(n),l=n?.image||n?.imageUrl||n?.img||"";t.set(s,{key:s,description:i,normalizedDescription:c,unitPrice:d,image:l,items:[],itemIndices:[],barcodes:[]})}const r=t.get(s);r.items.push(n),r.itemIndices.push(a),n?.barcode&&r.barcodes.push(String(n.barcode))}),Array.from(t.values()).map(n=>({...n,quantity:n.items.reduce((a,s)=>a+Ps(s),0)})).map(n=>{const a=n.quantity||0,s=n.items.reduce((i,c)=>{const d=Ns(c),l=Ps(c);return i+d*l},0),r=a>0?s/a:n.unitPrice;return{...n,quantity:a,count:a,totalPrice:s,unitPrice:r}})}function zt(e={}){const t=[e?.id,e?.equipment_id,e?.equipmentId,e?.item_id,e?.itemId];for(const n of t)if(!(n==null||n===""))return String(n);return null}function Ns(e={}){const t=e?.price??e?.unit_price??e?.unitPrice??0,n=Number(t);return Number.isFinite(n)?n:0}function ns(e){if(!e?.end)return!1;const t=new Date(e.end);return Number.isNaN(t.getTime())?!1:t<new Date}function Kc(e=""){switch(String(e??"").trim().toLowerCase()){case"confirmed":case"مؤكد":return"confirmed";case"in_progress":case"in-progress":case"قيد التنفيذ":case"جاري":return"in_progress";case"completed":case"مكتمل":return"completed";case"cancelled":case"ملغي":return"cancelled";case"pending":case"draft":case"قيد الانتظار":case"بانتظار التأكيد":case"معلق":default:return"pending"}}function lt(e={},t=null){const n=e?.confirmed===!0||e?.confirmed==="true",a=e?.projectId??e?.project_id??null,s=a!=null&&a!==""&&a!=="null",r=s?Kc(t?.status??t?.status_label??t?.statusLabel??""):null,i=s&&(t?.confirmed===!0||["confirmed","in_progress","completed"].includes(r));return{reservationConfirmed:n,projectLinked:s,projectStatus:r,projectConfirmed:i,effectiveConfirmed:s?i:n}}const qr="projects:create:draft",Sr="projects.html#projects-section";let Sa=null,Er=[],Ea=new Map,xa=new Map,Tn=new Map,ma=!1,qn=null,Ls=!1,xr=[];function jn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Cn(e){return h(String(e||"")).trim().toLowerCase()}function Qc(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function wr(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function Ir(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Ar(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function kr(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function Vt(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function as(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function It(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Ce(){const{input:e,hidden:t}=It();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function mt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function _r(e,t,{allowPartial:n=!1}={}){const a=Ie(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function wa(e,t={}){return _r(Ea,e,t)}function Ia(e,t={}){return _r(xa,e,t)}function Pe(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function $r(e){Er=Array.isArray(e)?[...e]:[]}function ss(){return Er}function rs(e){return e&&ss().find(t=>String(t.id)===String(e))||null}function Bs(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function Dt(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??Ye,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:Ye}function Re(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??Ye,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=Ye),t.dataset.companyShare=String(s),t.checked=!0}function Aa(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(ma){ie();return}ma=!0;const a=()=>{ma=!1,ie()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(Ye)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),Re()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Re():n.checked&&(n.checked=!1));a()}function Gc(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Ds(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function Fs(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function Xe({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=as();if(!n||!a||!s)return;const r=Va()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const d=new Set;Ea=new Map;const l=r.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:Fs(m)||c})).filter(m=>{if(!m.label)return!1;const y=Ie(m.label);return!y||d.has(y)?!1:(d.add(y),Ea.set(y,m),!0)}).sort((m,y)=>m.label.localeCompare(y.label,void 0,{sensitivity:"base"}));s.innerHTML=l.map(m=>`<option value="${jn(m.label)}"></option>`).join("");const u=t?"":n.value,p=e?String(e):a.value?String(a.value):"",f=p?r.find(m=>String(m.id)===p):null;if(f){const m=Fs(f)||c;a.value=String(f.id),n.value=m,n.dataset.selectedId=String(f.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function Ft({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=It();if(!a||!s||!r)return;const i=Array.isArray(t)?t:ss()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const d=[...i].filter(b=>b&&b.id!=null).sort((b,g)=>String(g.createdAt||g.start||"").localeCompare(String(b.createdAt||b.start||""))),l=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),p=new Set;xa=new Map;const f=d.map(b=>{const g=Bs(b)||u;return{id:String(b.id),label:g}}).filter(b=>{if(!b.label)return!1;const g=Ie(b.label);return!g||p.has(g)?!1:(p.add(g),xa.set(g,b),!0)});r.innerHTML=f.map(b=>`<option value="${jn(b.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",y=m?d.find(b=>String(b.id)===m):null;if(y){const b=Bs(y)||u;s.value=String(y.id),a.value=b,a.dataset.selectedId=String(y.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":l}function Pn(e,t,n){const{date:a,time:s}=ar(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function Tr(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||Ft({selectedValue:a});const r=(Va()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";Xe(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=Ds(e,"start"),d=Ds(e,"end");c&&Pn("res-start","res-start-time",c),d&&Pn("res-end","res-end-time",d);const l=document.getElementById("res-notes");l&&e.description&&(t||!l.value)&&(l.value=e.description),ie(),ot()}function jr({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:ue(),s=Array.isArray(a)?a:[];$r(s);const r=t!=null?String(t):n.value?String(n.value):"";Ft({selectedValue:r,projectsList:s}),ot(),ie()}function ot(){const{input:e,hidden:t}=It(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),d=document.getElementById("res-discount-type"),l=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),p=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(mt(n,Ce),a&&mt(a,Ce)),s&&mt(s,Ce),r&&mt(r,Ce),i&&mt(i,Ce),c&&mt(c,Ce),d&&mt(d,Ce),p)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=l),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=l),s&&(s.value="unpaid",Pe(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=l),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=l),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=l),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=l),d&&(d.value="percent",d.disabled=!0,d.classList.add("reservation-input-disabled"),d.title=l);else{if(n){const f=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",f&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.disabled=!1,d.classList.remove("reservation-input-disabled"),d.title="")}Aa("tax"),ie()}function is(){const{input:e,hidden:t}=It();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Ia(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=rs(r.id);i?Tr(i,{skipProjectSelectUpdate:!0}):(ot(),ie())}else t.value="",e.dataset.selectedId="",ot(),ie()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Ia(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function os(){const{input:e,hidden:t}=as();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?wa(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),ie()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?wa(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Wc(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){Zt({clearValue:!0});return}let n=null;try{const l=decodeURIComponent(t);n=JSON.parse(l)}catch(l){console.warn("⚠️ [reservations/createForm] Failed to decode project context",l)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),Zt({clearValue:!1}),!n)return;n.fromProjectForm&&(qn={draftStorageKey:n.draftStorageKey||qr,returnUrl:n.returnUrl||Sr});const r=document.getElementById("res-project");if(n.projectId){r&&(Ft({selectedValue:String(n.projectId)}),ot());const l=rs(n.projectId);l?Tr(l,{forceNotes:!!n.forceNotes}):ie(),Zt()}else{r&&Ft({selectedValue:""});const l=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");ul(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),l)}n.start&&Pn("res-start","res-start-time",n.start),n.end&&Pn("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(Va()||[]).find(p=>String(p.id)===String(n.customerId));u?.id!=null&&(Xe({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(Xe({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):Xe({selectedValue:""});const d=document.getElementById("res-notes");d&&n.description&&!d.value&&(d.value=n.description),ie()}function At(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:nn(e,n),end:nn(t,a)}}function Cr(e){const t=Cn(e);if(t){const c=Tn.get(t);if(c)return c}const{description:n,barcode:a}=wr(e);if(a){const c=zn(a);if(c)return c}const s=Ie(n||e);if(!s)return null;let r=ir();if(!r?.length){const c=ue();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&cr(r)}const i=r.find(c=>Ie(c?.desc||c?.description||"")===s);return i||r.find(c=>Ie(c?.desc||c?.description||"").includes(s))||null}function Pr(e,t="equipment-description-options"){const n=Cn(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(d=>Cn(d.value)===n)||Tn.has(n))return!0;const{description:s}=wr(e);if(!s)return!1;const r=Ie(s);return r?(ir()||[]).some(c=>Ie(c?.desc||c?.description||"")===r):!1}const Xc={available:0,reserved:1,maintenance:2,retired:3};function Jc(e){return Xc[e]??5}function Rs(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function Yc(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${Rs(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${Rs(n)})`}function Ut(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=un(),a=ue(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];cr(r);const i=new Map;r.forEach(l=>{const u=Qc(l),p=Cn(u);if(!p||!u)return;const f=ct(l),m=Jc(f),y=i.get(p);if(!y){i.set(p,{normalized:p,value:u,bestItem:l,bestStatus:f,bestPriority:m,statuses:new Set([f])});return}y.statuses.add(f),m<y.bestPriority&&(y.bestItem=l,y.bestStatus=f,y.bestPriority=m,y.value=u)}),Tn=new Map;const d=Array.from(i.values()).sort((l,u)=>l.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(l=>{Tn.set(l.normalized,l.bestItem);const u=Yc(l),p=jn(l.value);if(u===l.value)return`<option value="${p}"></option>`;const f=jn(u);return`<option value="${p}" label="${f}"></option>`}).join("");e&&(e.innerHTML=d),t&&(t.innerHTML=d)}function Nr(e,t,n={}){const{silent:a=!1}=n,s=ce(e);if(!s)return{success:!1,message:null};const{start:r,end:i}=At();if(!r||!i){const m=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||E(m),{success:!1,message:m}}if(Ze().some(m=>ce(m.barcode)===s)){const m=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||E(m),{success:!1,message:m}}const d=Ua(s,r,i);if(d.length){const m=d.map(b=>b.name).join(", "),y=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`);return a||E(y),{success:!1,message:y}}if(Ve(s,r,i)){const m=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||E(m),{success:!1,message:m}}const l=zn(s);if(!l){const m=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||E(m),{success:!1,message:m}}const u=ct(l);if(u==="maintenance"||u==="retired"){const m=Vt(u);return a||E(m),{success:!1,message:m}}const p=zt(l);if(!p){const m=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||E(m),{success:!1,message:m}}Mn({id:p,equipmentId:p,barcode:s,desc:l.desc,qty:1,price:l.price,image:xt(l)}),t&&(t.value=""),et(),ie();const f=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||E(f),{success:!0,message:f,barcode:s}}function ka(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Cr(t);if(!n){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=qc(n.barcode),s=ct(a||n);if(s==="maintenance"||s==="retired"){E(Vt(s));return}const r=ce(n.barcode);if(!r){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=zt(n);if(!i){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:xt(n)},{start:d,end:l}=At();if(!d||!l){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}if(Ze().some(m=>ce(m.barcode)===r)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const f=Ua(r,d,l);if(f.length){const m=f.map(y=>y.name).join(", ");E(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`));return}if(Ve(r,d,l)){E(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}Mn(c),et(),ie(),E(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function Zc(){Ut();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),ka(e))});const t=()=>{Pr(e.value,"equipment-description-options")&&ka(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Ms(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-equipment-select-button--active",n),n?(e.classList.add("btn-primary"),e.classList.remove("btn-outline-primary")):(e.classList.add("btn-outline-primary"),e.classList.remove("btn-primary"))}function el(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=At();if(!t||!n){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}pc({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):E(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(Ht.change,t=>{Ms(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),Ms(e,fr()))}function tl(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=Array.isArray(t.barcodes)?t.barcodes:[],a=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,s=n.length?n:t.barcode?[t.barcode]:[];if(!s.length)return;let r=0,i=null;const c=[],d=new Set;s.forEach(u=>{const p=ce(u);p&&!d.has(p)&&(d.add(p),c.push(p))});const l=Math.min(a,c.length);for(let u=0;u<l;u+=1){const p=c[u],f=Nr(p,null,{silent:!0});f.success&&(r+=1),f.message&&(i=f.message)}if(r>0){const p=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",h(String(r)));E(p)}else i&&E(i)}function Lr(){el(),!(Ls||typeof document>"u")&&(document.addEventListener(Ht.requestAdd,tl),Ls=!0)}function Jn(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),r=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:r}}function _a(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=Jn();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const r=document.getElementById("equipment-barcode"),i=document.getElementById("equipment-description"),c=t==="package";r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),Yo(t),t==="package"&&Yn()}function Yn(){const{packageSelect:e,packageHint:t}=Jn();if(!e)return;const n=Ho();xr=n,Oo(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,r=n.map(c=>{const d=Number.isFinite(Number(c.price))?Number(c.price):0,l=h(d.toFixed(2)),u=`${c.name} — ${l} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${r}`;const i=n.length>0;e.disabled=!i,t&&(i?(t.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty"))}function nl(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:r,blockingPackages:i})=>{const c=r?.desc||h(String(r?.barcode??r?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(i)&&i.length){const d=i.map(l=>l.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${d})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function al(e,{silent:t=!1}={}){const n=_s(e);if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};let a=xr.find(p=>p.id===n)||null;if(!a){const p=Qo(n);p&&(a={id:n,name:Wo(p)||n,price:Go(p),items:$s(p),raw:p})}if(!a)return t||E(o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")),{success:!1,reason:"not_found"};const{start:s,end:r}=At();if(!s||!r)return t||E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")),{success:!1,reason:"missing_dates"};if(Ze().some(p=>p?.type==="package"&&_s(p.packageId)===n))return t||E(o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")),{success:!1,reason:"duplicate"};if(Xo(n,s,r)){if(!t){const p=a.name||n;E(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${p} محجوزة بالفعل في الفترة المختارة`))}return{success:!1,reason:"package_conflict"}}const d=Array.isArray(a.items)&&a.items.length?a.items:$s(a.raw??{}),l=[];if(d.forEach(p=>{const f=ce(p?.normalizedBarcode??p?.barcode);if(f&&Ve(f,s,r)){const m=Ua(f,s,r);l.push({item:p,blockingPackages:m})}}),l.length)return t||E(nl(a,l)),{success:!1,reason:"item_conflict",conflicts:l};const u={id:`package::${n}`,packageId:n,type:"package",desc:a.name||`Package ${n}`,qty:1,price:Number.isFinite(Number(a.price))?Number(a.price):0,barcode:`pkg-${n}`,packageItems:d.map(p=>({equipmentId:p?.equipmentId??null,barcode:p?.barcode??p?.normalizedBarcode??"",desc:p?.desc??"",qty:Number.isFinite(Number(p?.qty))?Number(p.qty):1,price:Number.isFinite(Number(p?.price))?Number(p.price):0})),image:d.find(p=>p?.image)?.image??null};return Mn(u),et(),ie(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:u}}function sl(){const{packageAddButton:e,packageSelect:t}=Jn();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}al(n)}),e.dataset.listenerAttached="true")}function Br(){const{modeRadios:e}=Jn();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&_a(s.target.value)}),a.dataset.listenerAttached="true")}),sl();const t=wn(),n=e.find(a=>a.value===t);n&&(n.checked=!0),_a(t)}function et(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=Ze(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),d=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const l=wt(n);t.innerHTML=l.map(u=>{const p=u.items[0]||{},f=xt(p)||u.image,m=f?`<img src="${f}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',y=h(String(u.count)),b=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,g=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):b*u.count,w=`${h(b.toFixed(2))} ${s}`,v=`${h(g.toFixed(2))} ${s}`,I=u.items.some(x=>x?.type==="package"),C=u.barcodes.map(x=>h(String(x||""))).filter(Boolean),U=C.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${C.map(x=>`<li>${x}</li>`).join("")}
            </ul>
          </details>`:"";let q="";if(I){const x=new Map;if(u.items.forEach(A=>{Array.isArray(A?.packageItems)&&A.packageItems.forEach(k=>{if(!k)return;const B=ce(k.barcode||k.desc||Math.random()),T=x.get(B);if(T){T.qty+=Number.isFinite(Number(k.qty))?Number(k.qty):1;return}x.set(B,{desc:k.desc||k.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(k.qty))?Number(k.qty):1,barcode:k.barcode??k.normalizedBarcode??""})})}),x.size){const A=Array.from(x.values()).map(k=>{const B=h(String(k.qty)),T=k.desc||h(String(k.barcode||"")),$=k.barcode?` <span class="reservation-package-items__barcode">(${h(String(k.barcode))})</span>`:"";return`<li>${T}${$} × ${B}</li>`}).join("");q=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${A}
              </ul>
            </details>
          `}}return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${m}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${I?`${q||""}${U||""}`:U}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${c}" ${I?"disabled":""}>−</button>
              <span class="reservation-qty-value">${y}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${i}" ${I?"disabled":""}>+</button>
            </div>
          </td>
          <td>${w}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${d}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function rl(e){const t=Ze(),a=wt(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Vo(s),et(),ie())}function il(e){const t=Ze(),n=t.filter(a=>mn(a)!==e);n.length!==t.length&&(or(n),et(),ie())}function ol(e){const t=Ze(),a=wt(t).find(p=>p.key===e);if(!a)return;const{start:s,end:r}=At();if(!s||!r){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(p=>ce(p.barcode))),{equipment:c=[]}=ue(),d=(c||[]).find(p=>{const f=ce(p?.barcode);return!f||i.has(f)||mn({desc:p?.desc||p?.description||p?.name||"",price:Number(p?.price)||0})!==e||!Ja(p)?!1:!Ve(f,s,r)});if(!d){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const l=ce(d.barcode),u=zt(d);if(!u){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}Mn({id:u,equipmentId:u,barcode:l,desc:d.desc||d.description||d.name||a.description||"",qty:1,price:Number.isFinite(Number(d.price))?Number(d.price):a.unitPrice,image:xt(d)}),et(),ie()}function ie(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),d=c?.value||"unpaid",{start:l,end:u}=At();i&&Re();const p=Dt(),f=document.getElementById("res-payment-progress-type"),m=document.getElementById("res-payment-progress-value"),y=Ir(f),b=Ar(m);ks({selectedItems:Ze(),discount:n,discountType:s,applyTax:i,paidStatus:d,paymentProgressType:y,paymentProgressValue:b,start:l,end:u,companySharePercent:p,paymentHistory:[]});const g=ks.lastResult;g?(kr(m,g.paymentProgressValue),c&&(c.value=g.paymentStatus,Pe(c,g.paymentStatus))):Pe(c,d)}function cl(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=h(c.target.value),ie()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",ie),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(Ce()){n.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Aa("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(Ce()){a.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Aa("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(Ce()){s.value="unpaid",Pe(s,"unpaid"),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Pe(s),ie()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(Ce()){r.value="percent",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",ie()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(Ce()){i.value="",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=h(c.target.value),ie()}),i.dataset.listenerAttached="true"),ie()}function ll(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){ie();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),ie()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Hs(){const{input:e,hidden:t}=as(),{input:n,hidden:a}=It(),{customers:s}=ue();let r=t?.value?String(t.value):"";if(!r&&e?.value){const W=wa(e.value,{allowPartial:!0});W&&(r=String(W.id),t&&(t.value=r),e.value=W.label,e.dataset.selectedId=r)}const i=s.find(W=>String(W.id)===r);if(!i){E(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let d=a?.value?String(a.value):"";if(!d&&n?.value){const W=Ia(n.value,{allowPartial:!0});W&&(d=String(W.id),a&&(a.value=d),n.value=W.label,n.dataset.selectedId=d)}const l=document.getElementById("res-start").value,u=document.getElementById("res-end").value,p=document.getElementById("res-start-time")?.value||"00:00",f=document.getElementById("res-end-time")?.value||"00:00";if(!l||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${l}T${p}`,y=`${u}T${f}`,b=new Date(m),g=new Date(y);if(Number.isNaN(b.getTime())||Number.isNaN(g.getTime())||b>=g){E(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const w=Uo(),v=Ze();if(v.length===0&&w.length===0){E(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const I=document.getElementById("res-notes")?.value||"",C=parseFloat(h(document.getElementById("res-discount")?.value))||0,U=document.getElementById("res-discount-type")?.value||"percent",q=document.getElementById("res-payment-status"),x=q?.value||"unpaid",A=document.getElementById("res-payment-progress-type"),k=document.getElementById("res-payment-progress-value"),B=Ir(A),T=Ar(k),$=d?rs(d):null,K=Gc($);if(d&&!$){E(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const W of v){const re=ct(W.barcode);if(re==="maintenance"||re==="retired"){E(Vt(re));return}}for(const W of v){const re=ce(W.barcode);if(Ve(re,m,y)){E(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const W of w)if(sr(W,m,y)){E(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const z=document.getElementById("res-tax"),N=document.getElementById("res-company-share"),_=!!d;_?(z&&(z.checked=!1,z.disabled=!0,z.classList.add("disabled"),z.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),N&&(N.checked=!1,N.disabled=!0,N.classList.add("disabled"),N.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),q&&(q.value="unpaid",q.disabled=!0,Pe(q,"unpaid"),q.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),A&&(A.disabled=!0,A.classList.add("disabled")),k&&(k.value="",k.disabled=!0,k.classList.add("disabled"))):(z&&(z.disabled=!1,z.classList.remove("disabled"),z.title=""),N&&(N.disabled=!1,N.classList.remove("disabled"),N.title=""),q&&(q.disabled=!1,q.title=""),A&&(A.disabled=!1,A.classList.remove("disabled")),k&&(k.disabled=!1,k.classList.remove("disabled")));const G=_?!1:z?.checked||!1,L=!!N?.checked;if(!_&&L!==G){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let P=L?Dt():null;L&&(!Number.isFinite(P)||P<=0)&&(Re(),P=Dt());const M=L&&G&&Number.isFinite(P)&&P>0;G&&Re();const R=Ka(v,C,U,G,w,{start:m,end:y,companySharePercent:M?P:0}),H=Ro(),O=Qa({totalAmount:R,progressType:B,progressValue:T,history:[]});k&&kr(k,O.paymentProgressValue);const ne=[];O.paymentProgressValue!=null&&O.paymentProgressValue>0&&ne.push({type:O.paymentProgressType||B,value:O.paymentProgressValue,amount:O.paidAmount,percentage:O.paidPercent,recordedAt:new Date().toISOString()});const Y=Ga({manualStatus:x,paidAmount:O.paidAmount,paidPercent:O.paidPercent,totalAmount:R});q&&(q.value=Y,Pe(q,Y));const ae=rr({reservationCode:H,customerId:c,start:m,end:y,status:K?"confirmed":"pending",title:null,location:null,notes:I,projectId:d||null,totalAmount:R,discount:_?0:C,discountType:_?"percent":U,applyTax:G,paidStatus:_?"unpaid":Y,confirmed:K,items:v.map(W=>({...W,equipmentId:W.equipmentId??W.id})),technicians:w,companySharePercent:_||!M?null:P,companyShareEnabled:_?!1:M,paidAmount:_?0:O.paidAmount,paidPercentage:_?0:O.paidPercent,paymentProgressType:_?null:O.paymentProgressType,paymentProgressValue:_?null:O.paymentProgressValue,paymentHistory:_?[]:ne});try{const W=await Ko(ae);un(),Ut(),ln(),ml(),E(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Sa=="function"&&Sa({type:"created",reservation:W}),dl(W)}catch(W){console.error("❌ [reservations/createForm] Failed to create reservation",W);const re=Hn(W)?W.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");E(re,"error"),_&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),Zt({clearValue:!1}))}}function dl(e){if(!qn)return;const{draftStorageKey:t=qr,returnUrl:n=Sr}=qn,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}qn=null,n&&(window.location.href=n)}function Zt({clearValue:e=!1}={}){const{input:t,hidden:n}=It();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,ot())}function ul(e,t=""){const{input:n,hidden:a}=It();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),ot())}function ml(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),Xe({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),Zt({clearValue:!1}),Ft({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",Pe(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),Jo(),or([]),An("form-reset"),et(),ot(),ie()}function pl(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){rl(s);return}if(a==="increase-group"&&s){ol(s);return}if(a==="remove-group"&&s){il(s);return}}),e.dataset.listenerAttached="true")}function fl(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(wn()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,Nr(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||wn()!=="single")return;const{start:r,end:i}=At();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function yl(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Hs()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Hs()}),t.dataset.listenerAttached="true")}function wu({onAfterSubmit:e}={}){Sa=typeof e=="function"?e:null;const{customers:t,projects:n}=ue();zo(t||[]),Xe(),os(),$r(n||[]),jr({projectsList:n}),is(),Ut(),Yn(),Zc(),Lr(),Br(),ll(),cl(),pl(),fl(),yl(),Wc(),ie(),et()}function Dr(){Ut(),Yn(),jr(),Xe(),os(),is(),Lr(),Br(),et(),ie()}if(typeof document<"u"){const e=()=>{Xe(),Ft({projectsList:ss()}),os(),is(),ie()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("packages:changed",()=>{Yn(),wn()==="package"&&_a("package")})}typeof window<"u"&&(window.getCompanySharePercent=Dt);function Fr(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:pt(t),endDate:pt(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:pt(n),endDate:pt(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:pt(n),endDate:pt(a)}}return e==="upcoming"?{startDate:pt(t),endDate:""}:{startDate:"",endDate:""}}function gl(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=h(t?.value||"").trim(),i=h(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),Nn(t),Nn(n),r="",i=""),!r&&!i&&c){const l=Fr(c);r=l.startDate,i=l.endDate}return{searchTerm:Ie(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function Iu(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{bl(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),Nn(a),Nn(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function bl(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=Fr(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function pt(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function Nn(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function gn(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function hl(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function vl(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=hl(n);if(a!==null)return a}return null}function Os(e,t=0){const n=vl(e);if(n!=null)return n;const a=gn(e.createdAt??e.created_at);if(a!=null)return a;const s=gn(e.updatedAt??e.updated_at);if(s!=null)return s;const r=gn(e.start);if(r!=null)return r;const i=gn(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function ql({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((v,I)=>({reservation:v,index:I})),i=t.searchTerm||"",c=t.searchReservationId||"",d=t.searchCustomerName||"",l=t.searchProjectId||"",u=t.startDate||"",p=t.endDate||"",f=t.status||"",m=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,y=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,b=u?new Date(`${u}T00:00:00`):null,g=p?new Date(`${p}T23:59:59`):null,w=r.filter(({reservation:v})=>{const I=n.get(String(v.customerId)),C=s?.get?.(String(v.projectId)),U=v.start?new Date(v.start):null,q=ns(v),{effectiveConfirmed:x}=lt(v,C);if(m!=null&&String(v.customerId)!==String(m)||y!=null&&!(Array.isArray(v.technicians)?v.technicians.map($=>String($)):[]).includes(String(y))||f==="confirmed"&&!x||f==="pending"&&x||f==="completed"&&!q||b&&U&&U<b||g&&U&&U>g)return!1;if(c){const T=[v.reservationId,v.id,v.reservation_id,v.reservationCode,v.reservation_code,v.code,v.reference,v.referenceNumber,v.reference_number],$=Ie(T.filter(z=>z!=null&&z!=="").map(String).join(" ")).replace(/\s+/g,""),K=c.replace(/\s+/g,"");if(!$.includes(K))return!1}if(d&&!Ie(I?.customerName||"").includes(d))return!1;if(l){const T=[v.projectId,v.project_id,v.projectID,C?.id,C?.projectCode,C?.project_code],$=Ie(T.filter(z=>z!=null&&z!=="").map(String).join(" ")).replace(/\s+/g,""),K=l.replace(/\s+/g,"");if(!$.includes(K))return!1}if(!i)return!0;const A=v.items?.map?.(T=>`${T.barcode} ${T.desc}`).join(" ")||"",k=(v.technicians||[]).map(T=>a.get(String(T))?.name).filter(Boolean).join(" ");return Ie([v.reservationId,I?.customerName,v.notes,A,k,C?.title].filter(Boolean).join(" ")).includes(i)});return w.sort((v,I)=>{const C=Os(v.reservation,v.index),U=Os(I.reservation,I.index);return C!==U?U-C:I.index-v.index}),w}function Sl({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),d=o("reservations.list.itemsCountShort","{count} عنصر"),l=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),p=o("reservations.list.status.pending","⏳ غير مؤكد"),f=o("reservations.list.payment.paid","💳 مدفوع"),m=o("reservations.list.payment.unpaid","💳 غير مدفوع"),y=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),b=o("reservations.list.actions.confirm","✔️ تأكيد"),g=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),w=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),v={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:I,index:C})=>{const U=t.get(String(I.customerId)),q=I.projectId?a?.get?.(String(I.projectId)):null,x=ns(I),A=I.paidStatus??I.paid_status??(I.paid===!0||I.paid==="paid"?"paid":"unpaid"),k=A==="paid",B=A==="partial",{effectiveConfirmed:T,projectLinked:$}=lt(I,q),K=T?"status-confirmed":"status-pending",z=k?"status-paid":B?"status-partial":"status-unpaid";let N=`<span class="reservation-chip status-chip ${K}">${T?u:p}</span>`;const _=k?f:B?y:m;let G=`<span class="reservation-chip status-chip ${z}">${_}</span>`,L=k?" tile-paid":B?" tile-partial":" tile-unpaid";x&&(L+=" tile-completed");let P="";x&&(N=`<span class="reservation-chip status-chip status-completed">${u}</span>`,G=`<span class="reservation-chip status-chip status-completed">${_}</span>`,P=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const M=!$&&!T?`<button class="tile-confirm" data-reservation-index="${C}" data-action="confirm">${b}</button>`:"",R=M?`<div class="tile-actions">${M}</div>`:"",H=I.items?.length||0,O=(I.technicians||[]).map(de=>n.get(String(de))).filter(Boolean),ne=O.map(de=>de.name).join(l)||"—",Y=h(String(I.reservationId??"")),ae=I.start?h(Ne(I.start)):"-",W=I.end?h(Ne(I.end)):"-",re=h(String(I.cost??0)),be=h(String(H)),pe=I.notes?h(I.notes):c,Se=d.replace("{count}",be),V=I.applyTax?`<small>${r}</small>`:"";let X=g;return I.projectId&&(X=q?.title?h(q.title):w),`
      <div class="${M?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${L}"${P} data-reservation-index="${C}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${Y}</div>
          <div class="tile-badges">
            ${N}
            ${G}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${v.client}</span>
            <span class="tile-value">${U?.customerName||i}</span>
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
            <span class="tile-value">${re} ${s} ${V}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.equipment}</span>
            <span class="tile-value">${Se}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.crew}</span>
            <span class="tile-value">${O.length?ne:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${pe}</span>
          </div>
        </div>
        ${R}
      </div>
    `}).join("")}function De(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function El(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=lt(e,s),c=e.paid===!0||e.paid==="paid",d=ns(e),l=e.items||[],u=wt(l),{technicians:p=[]}=ue(),f=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(p)?p:[]),m=new Map;f.forEach(F=>{if(!F||F.id==null)return;const te=String(F.id),he=m.get(te)||{};m.set(te,{...he,...F})});const y=(e.technicians||[]).map(F=>m.get(String(F))).filter(Boolean),b=Et(),g=On(e.start,e.end),w=(F={})=>{const te=[F.dailyWage,F.daily_rate,F.dailyRate,F.wage,F.rate];for(const he of te){if(he==null)continue;const Be=parseFloat(h(String(he)));if(Number.isFinite(Be))return Be}return 0},v=(F={})=>{const te=[F.dailyTotal,F.daily_total,F.totalRate,F.total,F.total_wage];for(const he of te){if(he==null)continue;const Be=parseFloat(h(String(he)));if(Number.isFinite(Be))return Be}return w(F)},C=l.reduce((F,te)=>F+(te.qty||1)*(te.price||0),0)*g,U=y.reduce((F,te)=>F+w(te),0),q=y.reduce((F,te)=>F+v(te),0),x=U*g,A=q*g,k=C+A,B=parseFloat(e.discount)||0,T=e.discountType==="amount"?B:k*(B/100),$=Math.max(0,k-T),K=r?!1:e.applyTax,z=Number(e.cost),N=Number.isFinite(z),_=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,G=_!=null?parseFloat(h(String(_))):NaN;let M=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(G)&&G>0)&&Number.isFinite(G)?G:0;K&&M<=0&&(M=Ye);let R=M>0?Math.max(0,$*(M/100)):0;const H=$+R,O=K?H*.15:0,ne=Number.isFinite(O)&&O>0?Number(O.toFixed(2)):0,Y=H+ne,ae=Number.isFinite(Y)?Number(Y.toFixed(2)):0,W=r?ae:N?z:ae;M>0&&(R=Number(Math.max(0,$*(M/100)).toFixed(2)));const re=h(String(e.reservationId??e.id??"")),be=e.start?h(Ne(e.start)):"-",pe=e.end?h(Ne(e.end)):"-",Se=h(String(y.length)),V=h(C.toFixed(2)),X=h(T.toFixed(2)),Z=h($.toFixed(2)),de=h(ne.toFixed(2)),ee=h((Number.isFinite(W)?W:0).toFixed(2)),ye=h(String(g)),me=o("reservations.create.summary.currency","SR"),tt=o("reservations.details.labels.discount","الخصم"),D=o("reservations.details.labels.tax","الضريبة (15%)"),oe=o("reservations.details.labels.crewTotal","إجمالي الفريق"),we=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),ge=o("reservations.details.labels.duration","عدد الأيام"),le=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),Ae=o("reservations.details.labels.netProfit","💵 صافي الربح"),je=o("reservations.create.equipment.imageAlt","صورة"),Ee={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},nt=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),jt=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),J=o("reservations.details.technicians.roleUnknown","غير محدد"),xe=o("reservations.details.technicians.phoneUnknown","غير متوفر"),dt=o("reservations.details.technicians.wage","{amount} {currency} / اليوم"),Di=o("reservations.list.status.confirmed","✅ مؤكد"),Fi=o("reservations.list.status.pending","⏳ غير مؤكد"),Ri=o("reservations.list.payment.paid","💳 مدفوع"),Mi=o("reservations.list.payment.unpaid","💳 غير مدفوع"),Hi=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),Oi=o("reservations.list.status.completed","📁 منتهي"),zi=o("reservations.details.labels.id","🆔 رقم الحجز"),Vi=o("reservations.details.section.bookingInfo","بيانات الحجز"),Ui=o("reservations.details.section.paymentSummary","ملخص الدفع"),Ki=o("reservations.details.labels.finalTotal","المجموع النهائي"),Qi=o("reservations.details.section.crew","😎 الفريق الفني"),Gi=o("reservations.details.crew.count","{count} عضو"),Wi=o("reservations.details.section.items","📦 المعدات المرتبطة"),Xi=o("reservations.details.items.count","{count} عنصر"),Ji=o("reservations.details.actions.edit","✏️ تعديل"),Yi=o("reservations.details.actions.delete","🗑️ حذف"),Zi=o("reservations.details.labels.customer","العميل"),eo=o("reservations.details.labels.contact","رقم التواصل"),to=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const no=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),ao=o("reservations.details.actions.openProject","📁 فتح المشروع"),so=o("reservations.details.labels.start","بداية الحجز"),ro=o("reservations.details.labels.end","نهاية الحجز"),io=o("reservations.details.labels.notes","ملاحظات"),oo=o("reservations.list.noNotes","لا توجد ملاحظات"),co=o("reservations.details.labels.itemsCount","عدد المعدات"),lo=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),uo=o("reservations.paymentHistory.title","سجل الدفعات"),mo=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),po=o("reservations.list.unknownCustomer","غير معروف"),ia=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),qs=ia==="partial",fo=ia==="paid"?Ri:qs?Hi:Mi,yo=u.reduce((F,te)=>F+(Number(te.quantity)||0),0),go=h(String(yo)),Ss=Xi.replace("{count}",go),bo=Gi.replace("{count}",Se),ho=e.notes?h(e.notes):oo,vo=h(A.toFixed(2)),qo=h(String(M)),So=h(R.toFixed(2)),Eo=`${qo}% (${So} ${me})`,xo=Math.max(0,C+A-T),Es=Math.max(0,xo-x),wo=h(Es.toFixed(2)),at=[{icon:"💼",label:lo,value:`${V} ${me}`}];at.push({icon:"😎",label:oe,value:`${vo} ${me}`}),T>0&&at.push({icon:"💸",label:tt,value:`${X} ${me}`}),at.push({icon:"📊",label:we,value:`${Z} ${me}`}),K&&ne>0&&at.push({icon:"🧾",label:D,value:`${de} ${me}`}),M>0&&at.push({icon:"🏦",label:le,value:Eo}),Math.abs(Es-(W??0))>.009&&at.push({icon:"💵",label:Ae,value:`${wo} ${me}`}),at.push({icon:"💰",label:Ki,value:`${ee} ${me}`});const Io=at.map(({icon:F,label:te,value:he})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${F} ${te}</span>
      <span class="summary-details-value">${he}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let Kt=[];Array.isArray(e.paymentHistory)?Kt=e.paymentHistory:Array.isArray(e.payment_history)&&(Kt=e.payment_history);const Ao=Array.isArray(e.paymentLogs)?e.paymentLogs:[],xs=Array.isArray(Kt)&&Kt.length>0?Kt:Ao,ko=xs.length?`<ul class="reservation-payment-history-list">${xs.map(F=>{const te=F?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):F?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),he=Number.isFinite(Number(F?.amount))&&Number(F.amount)>0?`${h(Number(F.amount).toFixed(2))} ${me}`:"—",Be=Number.isFinite(Number(F?.percentage))&&Number(F.percentage)>0?`${h(Number(F.percentage).toFixed(2))}%`:"—",Ct=F?.recordedAt?h(Ne(F.recordedAt)):"—",Pt=F?.note?`<div class="payment-history-note">${De(h(F.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${De(te)}</span>
              <span class="payment-history-entry__amount">${he}</span>
              <span class="payment-history-entry__percent">${Be}</span>
              <span class="payment-history-entry__date">${Ct}</span>
            </div>
            ${Pt}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${De(mo)}</div>`,ws=[{text:i?Di:Fi,className:i?"status-confirmed":"status-pending"},{text:fo,className:ia==="paid"?"status-paid":qs?"status-partial":"status-unpaid"}];d&&ws.push({text:Oi,className:"status-completed"});const _o=ws.map(({text:F,className:te})=>`<span class="status-chip ${te}">${F}</span>`).join(""),ut=(F,te,he)=>`
    <div class="res-info-row">
      <span class="label">${F} ${te}</span>
      <span class="value">${he}</span>
    </div>
  `;let oa="";if(e.projectId){let F=De(no);if(s){const te=s.title||o("projects.fallback.untitled","مشروع بدون اسم");F=`${De(te)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${De(ao)}</button>`}oa=`
      <div class="res-info-row">
        <span class="label">📁 ${to}</span>
        <span class="value">${F}</span>
      </div>
    `}const Ke=[];Ke.push(ut("👤",Zi,t?.customerName||po)),Ke.push(ut("📞",eo,t?.phone||"—")),Ke.push(ut("🗓️",so,be)),Ke.push(ut("🗓️",ro,pe)),Ke.push(ut("📦",co,Ss)),Ke.push(ut("⏱️",ge,ye)),Ke.push(ut("📝",io,ho)),oa&&Ke.push(oa);const $o=Ke.join(""),To=u.length?u.map(F=>{const te=F.items[0]||{},he=xt(te)||F.image,Be=he?`<img src="${he}" alt="${je}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',Ct=Number(F.quantity)||Number(F.count)||0,Pt=h(String(Ct)),Is=Number.isFinite(Number(F.unitPrice))?Number(F.unitPrice):0,No=Number.isFinite(Number(F.totalPrice))?Number(F.totalPrice):Is*Ct,Lo=`${h(Is.toFixed(2))} ${me}`,Bo=`${h(No.toFixed(2))} ${me}`,As=F.barcodes.map(ca=>h(String(ca||""))).filter(Boolean),Do=As.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${As.map(ca=>`<li>${ca}</li>`).join("")}
              </ul>
            </details>`:"";return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${Be}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${De(te.desc||te.description||te.name||F.description||"-")}</div>
                  ${Do}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${De(Ee.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Pt}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${De(Ee.unitPrice)}">${Lo}</td>
            <td class="reservation-modal-items-table__cell" data-label="${De(Ee.total)}">${Bo}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${De(Ee.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${nt}</td></tr>`,jo=`
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
        <tbody>${To}</tbody>
      </table>
    </div>
  `,Co=y.map((F,te)=>{const he=h(String(te+1)),Be=F.role||J,Ct=F.phone||xe,Pt=F.wage?dt.replace("{amount}",h(String(F.wage))).replace("{currency}",me):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${he}</span>
          <span class="technician-name">${F.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${Be}</div>
          <div>📞 ${Ct}</div>
          ${Pt?`<div>💰 ${Pt}</div>`:""}
        </div>
      </div>
    `}).join(""),Po=y.length?`<div class="reservation-technicians-grid">${Co}</div>`:`<ul class="reservation-modal-technicians"><li>${jt}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${zi}</span>
          <strong>${re}</strong>
        </div>
        <div class="status-chips">
          ${_o}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Vi}</h6>
          ${$o}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${Ui}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${Io}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${uo}</h6>
              ${ko}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Qi}</span>
          <span class="count">${bo}</span>
        </div>
        ${Po}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Wi}</span>
          <span class="count">${Ss}</span>
        </div>
        ${jo}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${Ji}</button>
        ${b?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Yi}</button>`:""}
      </div>
    </div>
  `}const Au="project",ku="editProject",_u=3600*1e3,Rr=.15,$u=6,Tu="projectsTab",ju="projectsSubTab",Cu={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},Pu={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},Nu={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},xl=`@page {
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
`,wl=/color\([^)]*\)/gi,an=/(color\(|color-mix\(|oklab|oklch)/i,Il=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"],Al=typeof document<"u"?document.createElement("canvas"):null,bn=Al?.getContext?.("2d")||null;function Mr(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function $a(e,t="#000"){if(!bn||!e)return t;try{return bn.fillStyle="#000",bn.fillStyle=e,bn.fillStyle||t}catch{return t}}function kl(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&an.test(n)){const s=$a(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function Nt(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function Lu(e=[]){if(!(!Array.isArray(e)||!e.length))for(let t=e.length-1;t>=0;t-=1){const{element:n,prop:a,value:s,priority:r}=e[t]||{};!n?.style||!a||(s&&s.length>0?n.style.setProperty(a,s,r||""):n.style.removeProperty(a))}}function Hr(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;Il.forEach(c=>{const d=r[c];if(d&&an.test(d)){const l=Mr(c);Nt(n,s,l);const u=c==="backgroundColor"?"#ffffff":r.color||"#000000",p=$a(d,u);s.style.setProperty(l,p,"important")}});const i=r.backgroundImage;if(i&&an.test(i)){const c=$a(r.backgroundColor||"#ffffff","#ffffff");Nt(n,s,"background-image"),Nt(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function Or(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(c=>{const d=r[c];if(d&&an.test(d)){const l=Mr(c);Nt(n,s,l);const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(l,u,"important")}});const i=r.backgroundImage;i&&an.test(i)&&(Nt(n,s,"background-image"),Nt(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function zr(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(wl,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const Vr="reservations.quote.sequence",zs={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},Ur="https://help.artratio.sa/guide/quote-preview",qe={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},_l=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Te=[..._l],$l=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function Ta(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...Te]}function Tl(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=Ta(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=Ta(t.value);if(a.length)return a}const n=Te.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...Te]}const jl=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],Kr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>S(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>S(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>S(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>S(h(Number(e?.price||0).toFixed(2)))}],Qr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>S(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>S(e?.role||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>S(e?.phone||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],ja={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:Kr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:Qr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},Gr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>S(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>S(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>S(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Wr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>S(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>S(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>S(e?.note||"-")}],Xr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>S(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>S(h(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>S(h(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>S(e?.displayCost||"—")}],Cl=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],Pl={customerInfo:ja.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:ja.payment,projectExpenses:Wr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:Gr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:Xr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},pa=new Map;function Zn(e="reservation"){if(pa.has(e))return pa.get(e);const t=e==="project"?Cl:jl,n=e==="project"?Pl:ja,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(d=>d.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return pa.set(e,r),r}function ea(e="reservation"){return Zn(e).sectionDefs}function Jr(e="reservation"){return Zn(e).fieldDefs}function Yr(e="reservation"){return Zn(e).sectionIdSet}function Zr(e="reservation"){return Zn(e).fieldIdMap}function ei(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const Nl="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",Ll="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",Bl="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",ti=xl.trim(),ni=/^data:image\/svg\+xml/i,Dl=/\.svg($|[?#])/i,Jt=512,Ca="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",ai=96,si=25.4,Pa=210,Sn=297,En=Math.round(Pa/si*ai),xn=Math.round(Sn/si*ai),Fl=2,ri=/safari/i,Rl=/(iphone|ipad|ipod)/i,Vs=/(iphone|ipad|ipod)/i,Ml=/(crios|fxios|edgios|opios)/i,Ln="[reservations/pdf]";let Q=null,j=null,He=1,Gt=null,Wt=null,rt=null,Lt=null,en=!1;function ht(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!Q?.statusIndicator||!Q?.statusText)return;Q.statusKind=e;const r=t||ei(e);Q.statusText.textContent=r,Q.statusSpinner&&(Q.statusSpinner.hidden=!s),Q.statusAction&&(Q.statusAction.hidden=!0,Q.statusAction.onclick=null,n&&typeof a=="function"&&(Q.statusAction.textContent=n,Q.statusAction.hidden=!1,Q.statusAction.onclick=i=>{i.preventDefault(),a()})),Q.statusIndicator.hidden=!1,requestAnimationFrame(()=>{Q.statusIndicator.classList.add("is-visible")})}function tn(e){!Q?.statusIndicator||!Q?.statusText||(Q.statusKind=null,Q.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{Q?.statusIndicator&&(Q.statusIndicator.hidden=!0,Q.statusAction&&(Q.statusAction.hidden=!0,Q.statusAction.onclick=null),Q.statusSpinner&&(Q.statusSpinner.hidden=!1))},220))}function Na(){return!!window?.bootstrap?.Modal}function Hl(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),rt||(rt=document.createElement("div"),rt.className="modal-backdrop fade show",rt.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(rt)),Lt||(Lt=t=>{t.key==="Escape"&&La(e)},document.addEventListener("keydown",Lt));try{e.focus({preventScroll:!0})}catch{}}}function La(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),rt&&(rt.remove(),rt=null),Lt&&(document.removeEventListener("keydown",Lt),Lt=null))}function Ol(e){if(e){if(Na()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}Hl(e)}}function zl(){if(en)return;en=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!Q?.modal?.classList.contains("show"),s=()=>{Q?.modal?.classList.contains("show")&&(ht("render"),en=!1,kt())};nr({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:Ur}),a&&ht("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function ta(e="reservation"){const t={},n=Jr(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function cs(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function Vl(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function ls(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function ds(e="reservation"){return Object.fromEntries(ea(e).map(({id:t})=>[t,!1]))}function us(e,t){return e.sectionExpansions||(e.sectionExpansions=ds(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Ul(e,t){return us(e,t)?.[t]!==!1}function ms(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function Kl(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Rl.test(e)}function Ql(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=ri.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function ii(){return Kl()&&Ql()}function na(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=Vs.test(e)||Vs.test(t),s=/Macintosh/i.test(e)&&n>1;return ri.test(e)&&!Ml.test(e)&&(a||s)}function fa(e,...t){try{console.log(`${Ln} ${e}`,...t)}catch{}}function Je(e,...t){try{console.warn(`${Ln} ${e}`,...t)}catch{}}function Gl(e,t,...n){try{t?console.error(`${Ln} ${e}`,t,...n):console.error(`${Ln} ${e}`,...n)}catch{}}function fe(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Wl(e,t="لا توجد بيانات للعرض."){const n=S(o(e,t));return fe(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Bn(e,t){return Array.isArray(e)&&e.length?e:[Wl(t)]}const Xl=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function oi(e=""){return Xl.test(e)}function Jl(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!oi(r))return a.call(this,r,...i);let c,d=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),d=!0)}catch{}try{if(!d){const l=this.canvas;l&&l.style?.direction!=="rtl"&&(l.__artRatioOriginalDirection=l.style.direction,l.style.direction="rtl")}return a.call(this,r,...i)}finally{if(d&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!d){const l=this.canvas;l&&l.__artRatioOriginalDirection!==void 0&&(l.style.direction=l.__artRatioOriginalDirection,delete l.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function Us(e,t=Jt){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Yl(e){if(!e)return{width:Jt,height:Jt};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?Us(t,0):0,s=n?Us(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,d]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(d)&&d>0?d:0)}}return{width:a||Jt,height:s||Jt}}function ci(e=""){return typeof e!="string"?!1:ni.test(e)||Dl.test(e)}function Zl(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function ed(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function li(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await ed(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),d=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=d;const l=i.getContext("2d");return l.clearRect(0,0,c,d),l.drawImage(r,0,0,c,d),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function td(e){if(!e)return null;if(ni.test(e))return Zl(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function nd(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!ci(t))return!1;const n=await td(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",Ca),!1;const a=await li(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",Ca),!1)}async function ad(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Yl(e),s=await li(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||Ca),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),d=e.getAttribute("height");return c&&i.setAttribute("width",c),d&&i.setAttribute("height",d),e.parentNode?.replaceChild(i,e),!!s}async function di(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{ci(s.getAttribute?.("src"))&&a.push(nd(s))}),n.forEach(s=>{a.push(ad(s))}),a.length&&await Promise.allSettled(a)}function sd(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(P,M=0)=>{const R=parseFloat(P);return Number.isFinite(R)?R:M},i=r(s.paddingTop),c=r(s.paddingBottom),d=r(s.paddingRight),l=r(s.paddingLeft),u=r(s.borderRadius),p=r(s.fontSize,14),f=(()=>{const P=s.lineHeight;if(!P||P==="normal")return p*1.6;const M=r(P,p*1.6);return M>0?M:p*1.6})(),m=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(m<=0)return null;const y=Math.max(1,m-l-d),b=e.textContent||"",g=b.split(/\r?\n/),w=n.createElement("canvas"),v=w.getContext("2d");if(!v)return null;const I=s.fontStyle||"normal",C=s.fontVariant||"normal",U=s.fontWeight||"400",q=s.fontFamily||"sans-serif",x=s.fontStretch||"normal",A=P=>P.join(" "),k=[],B=P=>v.measureText(P).width;v.font=`${I} ${C} ${U} ${x} ${p}px ${q}`,g.forEach(P=>{const M=P.trim();if(M.length===0){k.push("");return}const R=M.split(/\s+/);let H=[];R.forEach((O,ne)=>{const Y=O.trim();if(!Y)return;const ae=A(H.concat(Y));if(B(ae)<=y||H.length===0){H.push(Y);return}k.push(A(H)),H=[Y]}),H.length&&k.push(A(H))}),k.length||k.push("");const T=i+c+k.length*f,$=Math.ceil(Math.max(1,m)*t),K=Math.ceil(Math.max(1,T)*t);w.width=$,w.height=K,w.style.width=`${Math.max(1,m)}px`,w.style.height=`${Math.max(1,T)}px`,v.scale(t,t);const z=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){v.save(),v.beginPath();const P=Math.max(1,m),M=Math.max(1,T),R=Math.min(u,P/2,M/2);v.moveTo(R,0),v.lineTo(P-R,0),v.quadraticCurveTo(P,0,P,R),v.lineTo(P,M-R),v.quadraticCurveTo(P,M,P-R,M),v.lineTo(R,M),v.quadraticCurveTo(0,M,0,M-R),v.lineTo(0,R),v.quadraticCurveTo(0,0,R,0),v.closePath(),v.clip()}if(v.fillStyle=z,v.fillRect(0,0,Math.max(1,m),Math.max(1,T)),v.font=`${I} ${C} ${U} ${x} ${p}px ${q}`,v.fillStyle=s.color||"#000000",v.textBaseline="top",v.textAlign="right","direction"in v)try{v.direction="rtl"}catch{}const N=Math.max(0,m-d);let _=i;k.forEach(P=>{const M=P.length?P:" ";v.fillText(M,N,_,y),_+=f});const G=n.createElement("img");let L;try{L=w.toDataURL("image/png")}catch(P){return Je("note canvas toDataURL failed",P),null}return G.src=L,G.alt=b,G.style.width=`${Math.max(1,m)}px`,G.style.height=`${Math.max(1,T)}px`,G.style.display="block",G.setAttribute("data-quote-note-image","true"),{image:G,canvas:w,totalHeight:T,width:m}}function rd(e,{pixelRatio:t=1}={}){if(!e||!na())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!oi(a.textContent||""))return;let s;try{s=sd(a,{pixelRatio:t})}catch(r){Je("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function Ba(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){Gl(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),d=o("reservations.quote.toast.retry","إعادة المحاولة"),l=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(ht("export"),Ei()):(ht("render"),en=!1,kt())};if(nr({message:i,duration:9e3,actionLabel:l?d:void 0,onAction:l?u:void 0,linkLabel:c,linkHref:Ur}),Q?.modal?.classList.contains("show")&&ht("error",{message:i,actionLabel:l?d:void 0,onAction:l?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function Da({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){Je("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){Je("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function ps(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function Ks(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function Qs(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function id(){const e=Qs();return e||(Wt||(Wt=ps(Ll).catch(t=>{throw Wt=null,t}).then(()=>{const t=Qs();if(!t)throw Wt=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Wt)}async function od(){const e=Ks();return e||(Gt||(Gt=ps(Bl).catch(t=>{throw Gt=null,t}).then(()=>{const t=Ks();if(!t)throw Gt=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),Gt)}async function cd(){if(window.html2pdf||await ps(Nl),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}kl(),Jl()}function S(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ld(e="reservation"){return e==="project"?"QP":"Q"}function dd(e,t="reservation"){const n=Number(e),a=ld(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function ud(){const e=window.localStorage?.getItem?.(Vr),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function ui(e="reservation"){const n=ud()+1;return{sequence:n,quoteNumber:dd(n,e)}}function md(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(Vr,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function mi(e="reservation"){return zs[e]||zs.reservation}function pd(e="reservation"){try{const t=mi(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function fd(e,t="reservation"){try{const n=mi(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function yd(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function gd(e,t="reservation"){if(!e)return null;const n=Yr(t),a=Zr(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,d])=>{const l=i[c];if(l==null)return;const{ids:u,emptyExplicitly:p}=yd(l);if(!u&&!p)return;const f=Array.isArray(u)?u.filter(m=>d.has(m)):[];(f.length>0||p)&&(r[c]=f)}),{version:1,sections:s,fields:r}}function pi(e){if(!e)return;const t=e.context||"reservation",n=gd(e,t);n&&fd(n,t)}function fi(e){if(!e)return;const t=e.context||"reservation",n=pd(t);if(!n)return;const a=Yr(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=cs(e.fields||ta(t)),i=Zr(t);Object.entries(n.fields).forEach(([c,d])=>{const l=i[c];if(!l)return;const u=Array.isArray(d)?d.filter(p=>l.has(p)):[];r[c]=new Set(u)}),e.fields=r}}function yi(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function gi(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return 0}function bd(e={}){const t=[e.dailyTotal,e.daily_total,e.totalRate,e.total,e.total_wage];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return gi(e)}function hd(e){const t=ln()||[],{technicians:n=[]}=ue(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const i=String(r.id),c=s.get(i)||{};s.set(i,{...c,...r})}),(e.technicians||[]).map(r=>s.get(String(r))).filter(Boolean)}function vd(e,t,n){const{projectLinked:a}=lt(e,n),s=On(e.start,e.end),c=(Array.isArray(e.items)?e.items:[]).reduce((L,P)=>L+(Number(P?.qty)||1)*(Number(P?.price)||0),0)*s,d=t.reduce((L,P)=>L+gi(P),0),l=t.reduce((L,P)=>L+bd(P),0),u=d*s,p=l*s,f=c+p,m=parseFloat(e.discount)||0,y=e.discountType==="amount"?m:f*(m/100),b=Math.max(0,f-y),g=a?!1:e.applyTax,w=Number(e.cost),v=Number.isFinite(w),I=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,C=I!=null?parseFloat(h(String(I).replace("%","").trim())):NaN,U=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let x=(U!=null?U===!0||U===1||U==="1"||String(U).toLowerCase()==="true":Number.isFinite(C)&&C>0)&&Number.isFinite(C)?Number(C):0;g&&x<=0&&(x=Ye);let A=x>0?Math.max(0,b*(x/100)):0;A=Number(A.toFixed(2));const k=b+A;let B=g?k*.15:0;(!Number.isFinite(B)||B<0)&&(B=0),B=Number(B.toFixed(2));const T=k+B,$=Number.isFinite(T)?Number(T.toFixed(2)):0,K=a?$:v?w:$,z=Math.max(0,c+p-y),N=Math.max(0,z-u),_={equipmentTotal:c,crewTotal:p,crewCostTotal:u,discountAmount:y,subtotalAfterDiscount:b,taxableAmount:k,taxAmount:B,finalTotal:K,companySharePercent:x,companyShareAmount:A,netProfit:N},G={equipmentTotal:h(c.toFixed(2)),crewTotal:h(p.toFixed(2)),discountAmount:h(y.toFixed(2)),subtotalAfterDiscount:h(b.toFixed(2)),taxableAmount:h(k.toFixed(2)),taxAmount:h(B.toFixed(2)),finalTotal:h(K.toFixed(2)),companySharePercent:h(x.toFixed(2)),companyShareAmount:h(A.toFixed(2)),netProfit:h(N.toFixed(2))};return{totals:_,totalsDisplay:G,rentalDays:s}}function Rt(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function bi(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function qd(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=Rt(e.amount??(n==="amount"?e.value:null)),s=Rt(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=bi(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function Sd(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(qd).filter(Boolean);if(n.length>0)return n;const a=Rt(e.paidPercent??e.paid_percent),s=Rt(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=bi(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function Ed(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function xd(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function wd(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function Id(e){const t=Number(e?.equipmentEstimate)||0,n=wd(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const d=Math.max(0,a-c),l=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,p=l&&s&&u>0?u:0,f=p>0?Number((d*(p/100)).toFixed(2)):0,m=d+f;let y=s?m*Rr:0;(!Number.isFinite(y)||y<0)&&(y=0),y=Number(y.toFixed(2));let b=s?Number(e?.totalWithTax):m;return s?(!Number.isFinite(b)||b<=0)&&(b=Number((m+y).toFixed(2))):b=m,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:d,companyShareAmount:f,subtotal:m,applyTax:s,taxAmount:y,totalWithTax:b}}function Ad(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.technicians)?e.technicians:[],i=Ka(t,a,s,!1,r,{start:e.start,end:e.end});if(Number.isFinite(i))return i;const c=Number(h(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function kd(e,t){if(!e)return"—";const n=Ne(e);return t?`${n} - ${Ne(t)}`:n}function se(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${h(a.toFixed(s))} ${t}`}function Gs(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function _d(e){if(!e?.start)return null;if(!e?.end)return 1;const t=On(e.start,e.end);return Number.isFinite(t)?t:1}function $d(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function Td(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=ue(),i=e?.id!=null?s.find(D=>String(D.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:se(0,t),expensesTotal:se(0,t),reservationsTotal:se(0,t),discountAmount:se(0,t),taxAmount:se(0,t),overallTotal:se(0,t),paidAmount:se(0,t),remainingAmount:se(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:se(0,t),remainingAmountDisplay:se(0,t),paidPercentDisplay:Gs(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const d=i.clientId??i.customerId??i.client_id??i.customer_id??null,l=d!=null&&n.find(D=>String(D.id)===String(d))||null,u=l?.customerName??l?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),p=(i.clientCompany||l?.companyName||l?.company||"").trim(),f=l?.phone??l?.customerPhone??i.clientPhone??i.customerPhone??"",m=f?h(String(f).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),y=l?.email??i.clientEmail??i.customerEmail??"",b=y?String(y).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),g=i.projectCode||`PRJ-${h(String(i.id??""))}`,w=h(String(g)),v=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),I=Ed(i.type),C=i.start?Ne(i.start):"—",U=i.end?Ne(i.end):"—",q=_d(i),x=q!=null?$d(q):"غير محدد",A=xd(i),k={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},B=o(`projects.status.${A}`,k[A]||A),T=i.id!=null?String(i.id):null,$=T?a.filter(D=>String(D.projectId)===T):[],z=$.map(D=>{const oe=D.reservationId||D.id||"",we=D.status||D.state||"pending",ge=String(we).toLowerCase(),le=o(`reservations.status.${ge}`,ge),Ae=Ad(D),je=D.start?new Date(D.start).getTime():0;return{reservationId:h(String(oe||"-")),status:ge,statusLabel:le,total:Ae,totalLabel:se(Ae,t),dateRange:kd(D.start,D.end),startTimestamp:Number.isNaN(je)?0:je}}).sort((D,oe)=>oe.startTimestamp-D.startTimestamp).map(({startTimestamp:D,...oe})=>oe).reduce((D,oe)=>D+(Number(oe.total)||0),0),N=new Map;$.forEach(D=>{const oe=Array.isArray(D.items)?D.items:[],we=On(D.start,D.end),ge=D.reservationId||D.id||"";oe.forEach((le,Ae)=>{if(!le)return;const je=le.barcode||le.code||le.id||le.desc||le.description||`item-${Ae}`,Ee=String(je||`item-${Ae}`),nt=N.get(Ee)||{description:le.desc||le.description||le.name||le.barcode||`#${h(String(Ae+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},jt=Number(le.qty)||1,J=Number(le.price)||0;nt.totalQuantity+=jt,nt.reservationIds.add(String(ge));const xe=J*jt*Math.max(1,we);Number.isFinite(xe)&&(nt.totalCost+=xe),N.set(Ee,nt)})});const _=Array.from(N.values()).map(D=>({description:D.description,totalQuantity:D.totalQuantity,reservationsCount:D.reservationIds.size,displayCost:se(D.totalCost,t)})),G=new Map((r||[]).filter(Boolean).map(D=>[String(D.id),D])),L=new Map,P=D=>{if(!D)return;let oe=null;typeof D=="object"?oe=D.id??D.technicianId??D.technician_id??D.userId??D.user_id??null:(typeof D=="string"||typeof D=="number")&&(oe=D);const we=oe!=null?String(oe):null,ge=we&&G.has(we)?G.get(we):typeof D=="object"?D:null,le=ge?.name||ge?.full_name||ge?.fullName||ge?.displayName||(typeof D=="string"?D:null),Ae=ge?.role||ge?.title||null,je=ge?.phone||ge?.mobile||ge?.contact||null;if(!le&&!we)return;const Ee=we||le;L.has(Ee)||L.set(Ee,{id:we,name:le||"-",role:Ae||null,phone:je||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(D=>P(D)),$.forEach(D=>{(Array.isArray(D.technicians)?D.technicians:[]).forEach(we=>P(we))});const M=Array.from(L.values()),R=Array.isArray(i.expenses)?i.expenses.map(D=>{const oe=Number(D?.amount)||0;return{label:D?.label||D?.name||"-",amount:oe,displayAmount:se(oe,t),note:D?.note||D?.description||""}}):[],H=Id(i),O=H.applyTax?Number(((H.subtotal+z)*Rr).toFixed(2)):0,ne=Number((H.subtotal+z+O).toFixed(2)),Y=Sd(i),ae=Rt(i.paidAmount??i.paid_amount)||0,W=Rt(i.paidPercent??i.paid_percent)||0,re=Qa({totalAmount:ne,paidAmount:ae,paidPercent:W,history:Y}),be=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",pe=Ga({manualStatus:be,paidAmount:re.paidAmount,paidPercent:re.paidPercent,totalAmount:ne}),Se={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},V=o(`projects.paymentStatus.${pe}`,Se[pe]||pe),X=Number(re.paidAmount||0),Z=Number(re.paidPercent||0),de=Math.max(0,Number((ne-X).toFixed(2))),ee={projectSubtotal:se(H.subtotal,t),expensesTotal:se(H.expensesTotal,t),reservationsTotal:se(z,t),discountAmount:se(H.discountAmount,t),taxAmount:se(O,t),overallTotal:se(ne,t),paidAmount:se(X,t),remainingAmount:se(de,t)},ye={status:pe,statusLabel:V,paidAmount:X,paidPercent:Z,remainingAmount:de,paidAmountDisplay:se(X,t),remainingAmountDisplay:se(de,t),paidPercentDisplay:Gs(Z)},me=(i.description||"").trim();return{project:i,customer:l,clientInfo:{name:u,company:p||"—",phone:m,email:b},projectInfo:{title:v,code:w,typeLabel:I,startDisplay:C,endDisplay:U,durationLabel:x,statusLabel:B},expenses:R,equipment:_,crew:M,totals:H,totalsDisplay:ee,projectTotals:{combinedTaxAmount:O,overallTotal:ne,reservationsTotal:z,paidAmount:X,paidPercent:Z,remainingAmount:de,paymentStatus:pe},paymentSummary:ye,notes:me,currencyLabel:t,projectStatus:A,projectStatusLabel:B,projectDurationDays:q,projectDurationLabel:x,paymentHistory:Y}}function jd({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:d={},currencyLabel:l="SR",sections:u,fieldSelections:p={},quoteNumber:f,quoteDate:m,terms:y=Te}){const b=cs(p),g=(V,X)=>ls(b,V,X),w=V=>u?.has?.(V),v=`<div class="quote-placeholder">${S(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,I=(V,X)=>`<div class="info-plain__item">
      <span class="info-plain__label">${S(V)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${S(X)}</span>
    </div>`,C=(V,X,{variant:Z="inline"}={})=>Z==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${S(V)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${S(X)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${S(V)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${S(X)}</span>
    </span>`,U=(V,X)=>`<div class="payment-row">
      <span class="payment-row__label">${S(V)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${S(X)}</span>
    </div>`,q=[];g("customerInfo","customerName")&&q.push(I(o("projects.details.client","العميل"),t.name||"-")),g("customerInfo","customerCompany")&&q.push(I(o("projects.details.company","شركة العميل"),t.company||"—")),g("customerInfo","customerPhone")&&q.push(I(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),g("customerInfo","customerEmail")&&q.push(I(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const x=w("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${S(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${q.length?`<div class="info-plain">${q.join("")}</div>`:v}
      </section>`:"",A=[];g("projectInfo","projectType")&&A.push(I(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),g("projectInfo","projectTitle")&&A.push(I(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),g("projectInfo","projectCode")&&A.push(I(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),g("projectInfo","projectStart")&&A.push(I(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),g("projectInfo","projectEnd")&&A.push(I(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),g("projectInfo","projectDuration")&&A.push(I(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),g("projectInfo","projectStatus")&&A.push(I(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const k=w("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${S(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${A.length?`<div class="info-plain">${A.join("")}</div>`:v}
      </section>`:"",B=Gr.filter(V=>g("projectCrew",V.id)),T=w("projectCrew")?B.length?`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${B.map(V=>`<th>${S(V.labelKey?o(V.labelKey,V.fallback):V.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((V,X)=>`<tr>${B.map(Z=>`<td>${Z.render(V,X)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(B.length,1)}" class="empty">${S(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${v}
          </section>`:"",$=[];g("financialSummary","projectSubtotal")&&$.push(C(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${se(0,l)}`)),g("financialSummary","expensesTotal")&&$.push(C(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||se(0,l))),g("financialSummary","reservationsTotal")&&$.push(C(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||se(0,l))),g("financialSummary","discountAmount")&&$.push(C(o("reservations.details.labels.discount","الخصم"),i.discountAmount||se(0,l))),g("financialSummary","taxAmount")&&$.push(C(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||se(0,l)));const K=[];g("financialSummary","overallTotal")&&K.push(C(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||se(0,l),{variant:"final"})),g("financialSummary","paidAmount")&&K.push(C(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||se(0,l),{variant:"final"})),g("financialSummary","remainingAmount")&&K.push(C(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||se(0,l),{variant:"final"}));const z=w("financialSummary")?!$.length&&!K.length?`<section class="quote-section quote-section--financial">${v}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${S(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${$.length?`<div class="totals-inline">${$.join("")}</div>`:""}
            ${K.length?`<div class="totals-final">${K.join("")}</div>`:""}
          </div>
        </section>`:"",N=Wr.filter(V=>g("projectExpenses",V.id)),_=w("projectExpenses")?N.length?`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${N.map(V=>`<th>${S(V.labelKey?o(V.labelKey,V.fallback):V.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((V,X)=>`<tr>${N.map(Z=>`<td>${Z.render(V,X)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(N.length,1)}" class="empty">${S(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${v}
          </section>`:"",G=Xr.filter(V=>g("projectEquipment",V.id)),L=w("projectEquipment")?G.length?`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${G.map(V=>`<th>${S(V.labelKey?o(V.labelKey,V.fallback):V.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${r.length?r.map((V,X)=>`<tr>${G.map(Z=>`<td>${Z.render(V,X)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(G.length,1)}" class="empty">${S(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${v}
          </section>`:"",P=(e?.description||"").trim()||"",M=w("projectNotes")?`<section class="quote-section">
        <h3>${S(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${S(P||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",R=[];g("payment","beneficiary")&&R.push(U(o("reservations.quote.labels.beneficiary","اسم المستفيد"),qe.beneficiaryName)),g("payment","bank")&&R.push(U(o("reservations.quote.labels.bank","اسم البنك"),qe.bankName)),g("payment","account")&&R.push(U(o("reservations.quote.labels.account","رقم الحساب"),h(qe.accountNumber))),g("payment","iban")&&R.push(U(o("reservations.quote.labels.iban","رقم الآيبان"),h(qe.iban)));const H=`<section class="quote-section">
      <div class="payment-block">
        <h3>${S(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${R.length?R.join(""):v}</div>
      </div>
      <p class="quote-approval-note">${S(qe.approvalNote)}</p>
    </section>`,O=Array.isArray(y)&&y.length?y:Te,ne=`<footer class="quote-footer">
        <h4>${S(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${O.map(V=>`<li>${S(V)}</li>`).join("")}</ul>
      </footer>`,Y=[],ae=[];if(k&&ae.push({key:"project",html:k}),x&&ae.push({key:"customer",html:x}),ae.length>1){const V=ae.find(de=>de.key==="project"),X=ae.find(de=>de.key==="customer"),Z=[];V?.html&&Z.push(V.html),X?.html&&Z.push(X.html),Y.push(fe(`<div class="quote-section-row quote-section-row--primary">${Z.join("")}</div>`,{blockType:"group"}))}else ae.length===1&&Y.push(fe(ae[0].html));const W=[];T&&W.push(fe(T,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),_&&W.push(fe(_,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),L&&W.push(fe(L,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const re=[];z&&re.push(fe(z,{blockType:"summary"})),M&&re.push(fe(M));const be=[fe(H,{blockType:"payment"}),fe(ne,{blockType:"footer"})],pe=[...Bn(Y,"projects.quote.placeholder.primary"),...W,...Bn(re,"projects.quote.placeholder.summary"),...be],Se=`
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
          <strong>${S(m)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${ti}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Se}
          ${pe.join("")}
        </div>
      </div>
    </div>
  `}function hi(e){if(e?.context==="project")return jd(e);const{reservation:t,customer:n,project:a,technicians:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:d,sections:l,fieldSelections:u={},quoteNumber:p,quoteDate:f,terms:m=Te}=e,y=h(String(t?.reservationId??t?.id??"")),b=t.start?h(Ne(t.start)):"-",g=t.end?h(Ne(t.end)):"-",w=n?.customerName||n?.full_name||n?.name||"-",v=n?.phone||"-",I=n?.email||"-",C=n?.company||n?.company_name||"-",U=h(v),q=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),x=a?.code||a?.projectCode||"",A=h(String(c)),k=t?.notes||"",B=Array.isArray(m)&&m.length?m:Te,T=cs(u),$=(J,xe)=>ls(T,J,xe),K=J=>l?.has?.(J),z=`<div class="quote-placeholder">${S(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,N=(J,xe)=>`<div class="info-plain__item">${S(J)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${S(xe)}</strong></div>`,_=(J,xe,{variant:dt="inline"}={})=>dt==="final"?`<div class="totals-item totals-item--final">
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
    </div>`,L=[];$("customerInfo","customerName")&&L.push(N(o("reservations.details.labels.customer","العميل"),w)),$("customerInfo","customerCompany")&&L.push(N(o("reservations.details.labels.company","الشركة"),C)),$("customerInfo","customerPhone")&&L.push(N(o("reservations.details.labels.phone","الهاتف"),U)),$("customerInfo","customerEmail")&&L.push(N(o("reservations.details.labels.email","البريد"),I));const P=K("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${S(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${L.length?`<div class="info-plain">${L.join("")}</div>`:z}
      </section>`:"",M=[];$("reservationInfo","reservationId")&&M.push(N(o("reservations.details.labels.reservationId","رقم الحجز"),y||"-")),$("reservationInfo","reservationStart")&&M.push(N(o("reservations.details.labels.start","بداية الحجز"),b)),$("reservationInfo","reservationEnd")&&M.push(N(o("reservations.details.labels.end","نهاية الحجز"),g)),$("reservationInfo","reservationDuration")&&M.push(N(o("reservations.details.labels.duration","عدد الأيام"),A));const R=K("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${S(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${M.length?`<div class="info-plain">${M.join("")}</div>`:z}
      </section>`:"",H=[];$("projectInfo","projectTitle")&&H.push(N(o("reservations.details.labels.project","المشروع"),q)),$("projectInfo","projectCode")&&H.push(N(o("reservations.details.labels.code","الرمز"),x||"-"));const O=K("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${S(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${H.length?`<div class="info-plain">${H.join("")}</div>`:z}
      </section>`:"",ne=[];$("financialSummary","equipmentTotal")&&ne.push(_(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${d}`)),$("financialSummary","crewTotal")&&ne.push(_(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${d}`)),$("financialSummary","discountAmount")&&ne.push(_(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${d}`)),$("financialSummary","taxAmount")&&ne.push(_(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${d}`));const Y=$("financialSummary","finalTotal"),ae=[];Y&&ae.push(_(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${d}`,{variant:"final"}));const W=ae.length?`<div class="totals-final">${ae.join("")}</div>`:"",re=K("financialSummary")?!ne.length&&!Y?`<section class="quote-section quote-section--financial">${z}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${S(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${ne.length?`<div class="totals-inline">${ne.join("")}</div>`:""}
            ${W}
          </div>
        </section>`:"",be=Kr.filter(J=>$("items",J.id)),pe=be.length>0,Se=pe?be.map(J=>`<th>${S(J.labelKey?o(J.labelKey,J.fallback):J.fallback)}</th>`).join(""):"",X=Array.isArray(t.items)&&t.items.length>0?t.items.map((J,xe)=>`<tr>${be.map(dt=>`<td>${dt.render(J,xe)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(be.length,1)}" class="empty">${S(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,Z=K("items")?pe?`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Se}</tr>
              </thead>
              <tbody>${X}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.items.title","المعدات"))}</h3>
            ${z}
          </section>`:"",de=Qr.filter(J=>$("crew",J.id)),ee=de.length>0,ye=ee?de.map(J=>`<th>${S(J.labelKey?o(J.labelKey,J.fallback):J.fallback)}</th>`).join(""):"",me=s.length?s.map((J,xe)=>`<tr>${de.map(dt=>`<td>${dt.render(J,xe)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(de.length,1)}" class="empty">${S(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,tt=K("crew")?ee?`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${ye}</tr>
              </thead>
              <tbody>${me}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${z}
          </section>`:"",D=K("notes")?`<section class="quote-section">
        <h3>${S(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${S(k||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",oe=[];$("payment","beneficiary")&&oe.push(G(o("reservations.quote.labels.beneficiary","اسم المستفيد"),qe.beneficiaryName)),$("payment","bank")&&oe.push(G(o("reservations.quote.labels.bank","اسم البنك"),qe.bankName)),$("payment","account")&&oe.push(G(o("reservations.quote.labels.account","رقم الحساب"),h(qe.accountNumber))),$("payment","iban")&&oe.push(G(o("reservations.quote.labels.iban","رقم الآيبان"),h(qe.iban)));const we=`<section class="quote-section">
      <div class="payment-block">
        <h3>${S(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${oe.length?oe.join(""):z}</div>
      </div>
      <p class="quote-approval-note">${S(qe.approvalNote)}</p>
    </section>`,ge=`<footer class="quote-footer">
        <h4>${S(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${B.map(J=>`<li>${S(J)}</li>`).join("")}</ul>
      </footer>`,le=[];P&&R?le.push(fe(`<div class="quote-section-row">${P}${R}</div>`,{blockType:"group"})):(R&&le.push(fe(R)),P&&le.push(fe(P))),O&&le.push(fe(O));const Ae=[];Z&&Ae.push(fe(Z,{blockType:"table",extraAttributes:'data-table-id="items"'})),tt&&Ae.push(fe(tt,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const je=[];re&&je.push(fe(re,{blockType:"summary"})),D&&je.push(fe(D));const Ee=[fe(we,{blockType:"payment"}),fe(ge,{blockType:"footer"})],nt=[...Bn(le,"reservations.quote.placeholder.page1"),...Ae,...Bn(je,"reservations.quote.placeholder.page2"),...Ee],jt=`
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
          <strong>${S(p)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${S(f)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${ti}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${jt}
          ${nt.join("")}
        </div>
      </div>
    </div>
  `}function Cd(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function sn(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>Cd(c)),i=[s,...r].map(c=>c.catch(d=>(Je("asset load failed",d),zl(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function vi(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await di(r),await sn(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let d=null,l=null;const u=q=>{q.style.margin="0 auto",q.style.breakInside="avoid",q.style.pageBreakInside="avoid",q.style.pageBreakAfter="auto",q.style.breakAfter="auto"},p=()=>{const q=a.createElement("div"),x=s.childElementCount===0;if(q.className="quote-page",q.dataset.pageIndex=String(s.childElementCount),x){q.classList.add("quote-page--primary");const k=i.cloneNode(!0);k.removeAttribute("data-quote-header-template"),q.appendChild(k)}else q.classList.add("quote-page--continuation");const A=a.createElement("main");A.className="quote-body",q.appendChild(A),s.appendChild(q),u(q),d=q,l=A},f=()=>{(!d||!l||!l.isConnected)&&p()},m=()=>{if(!d||!l||l.childElementCount>0)return;const q=d;d=null,l=null,q.parentNode&&q.parentNode.removeChild(q)},y=()=>{d=null,l=null},b=()=>d?d.scrollHeight-d.clientHeight>Fl:!1,g=(q,{allowOverflow:x=!1}={})=>(f(),l.appendChild(q),b()&&!x?(l.removeChild(q),m(),!1):!0),w=q=>{const x=q.cloneNode(!0);x.removeAttribute?.("data-quote-block"),x.removeAttribute?.("data-block-type"),x.removeAttribute?.("data-table-id"),!g(x)&&(y(),!g(x)&&g(x,{allowOverflow:!0}))},v=q=>{const x=q.querySelector("table");if(!x){w(q);return}const A=q.querySelector("h3"),k=x.querySelector("thead"),B=Array.from(x.querySelectorAll("tbody tr"));if(!B.length){w(q);return}let T=null,$=0;const K=(N=!1)=>{const _=q.cloneNode(!1);_.removeAttribute("data-quote-block"),_.removeAttribute("data-block-type"),_.removeAttribute("data-table-id"),_.classList.add("quote-section--table-fragment"),N&&_.classList.add("quote-section--table-fragment--continued");const G=A?A.cloneNode(!0):null;G&&_.appendChild(G);const L=x.cloneNode(!1);L.classList.add("quote-table--fragment"),k&&L.appendChild(k.cloneNode(!0));const P=a.createElement("tbody");return L.appendChild(P),_.appendChild(L),{section:_,body:P}},z=(N=!1)=>T||(T=K(N),g(T.section)||(y(),g(T.section)||g(T.section,{allowOverflow:!0})),T);B.forEach(N=>{z($>0);const _=N.cloneNode(!0);if(T.body.appendChild(_),b()&&(T.body.removeChild(_),T.body.childElementCount||(l.removeChild(T.section),T=null,m()),y(),T=null,z($>0),T.body.appendChild(_),b())){T.section.classList.add("quote-section--table-fragment--overflow"),$+=1;return}$+=1}),T=null};if(!c.length)return;c.forEach(q=>{q.getAttribute("data-block-type")==="table"?v(q):w(q)});const I=Array.from(s.children),C=[];if(I.forEach((q,x)=>{const A=q.querySelector(".quote-body");if(x!==0&&(!A||A.childElementCount===0)){q.remove();return}C.push(q)}),!n){const q=a.defaultView||window,x=Math.min(3,Math.max(1,q.devicePixelRatio||1)),A=na()?Math.min(2,x):x;C.forEach(k=>rd(k,{pixelRatio:A}))}C.forEach((q,x)=>{const A=x===0;q.style.pageBreakAfter="auto",q.style.breakAfter="auto",q.style.pageBreakBefore=A?"auto":"always",q.style.breakBefore=A?"auto":"page",n?q.style.boxShadow="":q.style.boxShadow="none"});const U=C[C.length-1]||null;d=U,l=U?.querySelector(".quote-body")||null,await sn(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function fs(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function Pd(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([od(),id()]),c=e.ownerDocument||document,d=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,d,c?.documentElement?.getAttribute?.("dir")].some(q=>typeof q=="string"&&q.toLowerCase().startsWith("rtl")),p=typeof window<"u"&&window.devicePixelRatio||1,f=ms(),m=ii(),y=na();let b;y?b=1.5:m?b=Math.min(1.7,Math.max(1.2,p*1.1)):f?b=Math.min(1.8,Math.max(1.25,p*1.2)):b=Math.min(2,Math.max(1.6,p*1.4));const g=y||m?.9:f?.92:.95,w=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),v={scale:b,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let I=0;const C=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let q=0;q<s.length;q+=1){const x=s[q];await di(x),await sn(x);const A=x.ownerDocument||document,k=A.createElement("div");Object.assign(k.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const B=x.cloneNode(!0);B.style.width=`${En}px`,B.style.maxWidth=`${En}px`,B.style.minWidth=`${En}px`,B.style.height=`${xn}px`,B.style.maxHeight=`${xn}px`,B.style.minHeight=`${xn}px`,B.style.position="relative",B.style.background="#ffffff",fs(B),k.appendChild(B),A.body.appendChild(k);let T;try{await sn(B),T=await i(B,{...v,scale:b,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(P){throw Ba(P,"pageCapture",{toastMessage:C}),P}finally{k.parentNode?.removeChild(k)}if(!T)continue;const $=T.width||1,z=(T.height||1)/$;let N=Pa,_=N*z,G=0;if(_>Sn){const P=Sn/_;_=Sn,N=N*P,G=Math.max(0,(Pa-N)/2)}const L=T.toDataURL("image/jpeg",g);I>0&&w.addPage(),w.addImage(L,"JPEG",G,0,N,_,`page-${I+1}`,"FAST"),I+=1,await new Promise(P=>window.requestAnimationFrame(P))}}catch(q){throw Da({safariWindowRef:n,mobileWindowRef:a}),q}if(I===0)throw Da({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(m||y){const q=w.output("blob");if(y){const x=URL.createObjectURL(q);tn();try{window.location.assign(x)}catch(A){Je("mobile safari blob navigation failed",A)}finally{setTimeout(()=>URL.revokeObjectURL(x),6e4)}}else{const x=URL.createObjectURL(q),A=()=>m&&n&&!n.closed?n:a&&!a.closed?a:null,k=(T,$)=>{if(tn(),!T){window.location.assign($);return}try{T.location.replace($),T.focus?.()}catch(K){Je("direct blob navigation failed",K);try{T.document.open(),T.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${S(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${$}" title="PDF preview"></iframe></body></html>`),T.document.close()}catch(z){Je("iframe blob delivery failed",z),window.location.assign($)}}},B=A();k(B,x),setTimeout(()=>URL.revokeObjectURL(x),6e4)}}else{tn();const q=w.output("bloburl"),x=document.createElement("a");x.href=q,x.download=t,x.rel="noopener",x.style.display="none",document.body.appendChild(x),x.click(),setTimeout(()=>{URL.revokeObjectURL(q),x.remove()},2e3)}}function kt(){if(!j||!Q)return;const{previewFrame:e}=Q;if(!e)return;const t=j.context||"reservation",n=hi({context:t,reservation:j.reservation,customer:j.customer,project:j.project,technicians:j.technicians,totals:j.totals,totalsDisplay:j.totalsDisplay,rentalDays:j.rentalDays,currencyLabel:j.currencyLabel,sections:j.sections,fieldSelections:j.fields,quoteNumber:j.quoteNumber,quoteDate:j.quoteDateLabel,terms:j.terms,projectCrew:j.projectCrew,projectExpenses:j.projectExpenses,projectEquipment:j.projectEquipment,projectInfo:j.projectInfo,clientInfo:j.clientInfo,paymentSummary:j.paymentSummary,projectTotals:j.projectTotals});ht("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&(zr(r),Hr(r,s),Or(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await vi(i,{context:"preview"}),fs(i))}catch(m){console.error("[reservations/pdf] failed to layout preview document",m)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),d=a?.querySelector(".quote-preview-pages"),l=En;let u=18;if(d&&a?.defaultView){const m=a.defaultView.getComputedStyle(d),y=parseFloat(m.rowGap||m.gap||`${u}`);Number.isFinite(y)&&y>=0&&(u=y)}const p=xn,f=c.length?c.length*p+Math.max(0,(c.length-1)*u):p;if(e.dataset.baseWidth=String(l),e.dataset.baseHeight=String(f),e.style.width=`${l}px`,e.style.minWidth=`${l}px`,e.style.height=`${f}px`,e.style.minHeight=`${f}px`,Q?.previewFrameWrapper&&!Q?.userAdjustedZoom){const m=Q.previewFrameWrapper.clientWidth-24;m>0&&m<l?He=Math.max(m/l,.3):He=1}Si(He)}finally{tn()}},{once:!0})}function Nd(e){if(!j)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?j.sections.add(n):j.sections.delete(n),pi(j),qi(),kt())}function Ld(e){if(!j)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=j.context||"reservation",r=j.fields||(j.fields=ta(s)),i=Vl(r,n);t.checked?i.add(a):i.delete(a),pi(j),kt()}function Bd(e){if(!j)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(us(j,n),j.sectionExpansions[n]=t.open)}function qi(){if(!Q?.toggles||!j)return;const{toggles:e}=Q,t=j.fields||{},n=j.context||"reservation";us(j);const a=ea(n),s=Jr(n),r=a.map(({id:i,labelKey:c,fallback:d})=>{const l=o(c,d),u=j.sections.has(i),p=s[i]||[],f=Ul(j,i),m=p.length?`<div class="quote-toggle-sublist">
          ${p.map(y=>{const b=ls(t,i,y.id),g=u?"":"disabled",w=y.labelKey?o(y.labelKey,y.fallback):y.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${y.id}" ${b?"checked":""} ${g}>
                <span>${S(w)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${i}" ${f?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${i}" ${u?"checked":""}>
            <span>${S(l)}</span>
          </label>
          ${p.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${m}
      </details>
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",Nd)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",Ld)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",Bd)})}function Dd(){if(Q?.modal)return Q;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
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
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),r=e.querySelector("[data-quote-terms-reset]"),i=e.querySelector("[data-quote-download]"),c=e.querySelector(".modal-header"),d=c?.querySelector(".btn-close"),l=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",c&&c.insertBefore(u,d||null);const p=document.createElement("iframe");p.className="quote-preview-frame",p.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),p.setAttribute("loading","lazy"),p.setAttribute("frameborder","0");const f=document.createElement("div");f.className="quote-preview-zoom-controls",f.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${S(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${S(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${S(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(p),n.innerHTML="";const y=document.createElement("div");y.className="quote-preview-scroll",y.appendChild(m),n.appendChild(y);const b=document.createElement("div");b.className="quote-preview-status",b.setAttribute("role","status"),b.setAttribute("aria-live","polite"),b.hidden=!0,b.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${S(ei("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(b),u.appendChild(f),i?.addEventListener("click",async()=>{if(j){i.disabled=!0;try{await Ei()}finally{i.disabled=!1}}});const g=()=>{Na()||La(e)};l.forEach(C=>{C?.addEventListener("click",g)}),d&&!l.includes(d)&&d.addEventListener("click",g),e.addEventListener("click",C=>{Na()||C.target===e&&La(e)}),Q={modal:e,toggles:t,preview:n,previewScroll:y,previewFrameWrapper:m,zoomControls:f,zoomValue:f.querySelector("[data-zoom-value]"),previewFrame:p,meta:a,downloadBtn:i,statusIndicator:b,statusText:b.querySelector("[data-quote-status-text]"),statusSpinner:b.querySelector("[data-quote-status-spinner]"),statusAction:b.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const w=f.querySelector("[data-zoom-out]"),v=f.querySelector("[data-zoom-in]"),I=f.querySelector("[data-zoom-reset]");return w?.addEventListener("click",()=>Ws(-.1)),v?.addEventListener("click",()=>Ws(.1)),I?.addEventListener("click",()=>Dn(1,{markManual:!0})),s&&s.addEventListener("input",Rd),r&&r.addEventListener("click",Md),Dn(He),Q}function Dn(e,{silent:t=!1,markManual:n=!1}={}){He=Math.min(Math.max(e,.25),2.2),n&&Q&&(Q.userAdjustedZoom=!0),Si(He),!t&&Q?.zoomValue&&(Q.zoomValue.textContent=`${Math.round(He*100)}%`)}function Ws(e){Dn(He+e,{markManual:!0})}function Si(e){if(!Q?.previewFrame||!Q.previewFrameWrapper)return;const t=Q.previewFrame,n=Q.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",ms()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function Fd(){if(!Q?.meta||!j)return;const{meta:e}=Q;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${S(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${S(j.quoteNumber)}</strong></div>
      <div><span>${S(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${S(j.quoteDateLabel)}</strong></div>
    </div>
  `}function ys(){if(!Q?.termsInput)return;const e=(j?.terms&&j.terms.length?j.terms:Te).join(`
`);Q.termsInput.value!==e&&(Q.termsInput.value=e)}function Rd(e){if(!j)return;const t=Ta(e?.target?.value??"");if(t.length){j.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{j.terms=[...Te],ys();const n=Te.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}kt()}function Md(e){if(e?.preventDefault?.(),!j)return;j.terms=[...Te];const t=document.getElementById("reservation-terms");t&&(t.value=Te.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=Te.join(`
`)),ys(),kt()}async function Ei(){if(!j)return;ht("export");const t=!ms()&&ii(),n=na(),a=null,s=!n&&t?window.open("","_blank"):null;(d=>{if(d)try{d.document.open(),d.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${S(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${S(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${S(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),d.document.close()}catch(l){Je("failed to prime download window",l)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await cd(),fa("html2pdf ensured");const d=j.context||"reservation",l=hi({context:d,reservation:j.reservation,customer:j.customer,project:j.project,technicians:j.technicians,totals:j.totals,totalsDisplay:j.totalsDisplay,rentalDays:j.rentalDays,currencyLabel:j.currencyLabel,sections:j.sections,fieldSelections:j.fields,quoteNumber:j.quoteNumber,quoteDate:j.quoteDateLabel,terms:j.terms,projectCrew:j.projectCrew,projectExpenses:j.projectExpenses,projectEquipment:j.projectEquipment,projectInfo:j.projectInfo,clientInfo:j.clientInfo,paymentSummary:j.paymentSummary,projectTotals:j.projectTotals});i=document.createElement("div"),i.innerHTML=l,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),zr(i),Hr(i),Or(i),fa("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await vi(u,{context:"export"}),await sn(u),fs(u),fa("layout complete for export document")}catch(f){Ba(f,"layoutQuoteDocument",{suppressToast:!0})}}const p=`quotation-${j.quoteNumber}.pdf`;await Pd(u,{filename:p,safariWindowRef:s,mobileWindowRef:a}),j.sequenceCommitted||(md(j.quoteSequence),j.sequenceCommitted=!0)}catch(d){Da({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,Ba(d,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),tn()}}function xi(){const e=Dd();e?.modal&&(en=!1,He=1,Q&&(Q.userAdjustedZoom=!1),Dn(He,{silent:!0}),qi(),Fd(),ys(),kt(),Ol(e.modal))}async function Hd({reservation:e,customer:t,project:n}){if(!e){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=hd(e),{totalsDisplay:s,totals:r,rentalDays:i}=vd(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:d,quoteNumber:l}=ui("reservation"),u=new Date,p=Tl();j={context:"reservation",reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(ea("reservation").filter(f=>f.defaultSelected).map(f=>f.id)),sectionExpansions:ds("reservation"),fields:ta("reservation"),terms:p,quoteSequence:d,quoteNumber:l,quoteDate:u,quoteDateLabel:yi(u),sequenceCommitted:!1},fi(j),xi()}async function Bu({project:e}){if(!e){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=Td(e),{project:n}=t;if(!n){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=ui("project"),r=new Date,i=[...$l];j={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(ea("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:ds("project"),fields:ta("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:yi(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},fi(j),xi()}function Od({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=ln(),{reservations:r=[],customers:i=[],technicians:c=[],projects:d=[]}=ue(),l=Array.isArray(s)?s:c||[],u=new Map((d||[]).map(g=>[String(g.id),g])),p=document.getElementById(e);if(!p){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){p.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const f=t||gl(),m=new Map(i.map(g=>[String(g.id),g])),y=new Map(l.map(g=>[String(g.id),g])),b=ql({reservations:r,filters:f,customersMap:m,techniciansMap:y,projectsMap:u});if(b.length===0){p.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}p.innerHTML=`<div class="reservations-grid">${Sl({entries:b,customersMap:m,techniciansMap:y,projectsMap:u})}</div>`,p.querySelectorAll('[data-action="details"]').forEach(g=>{const w=Number(g.dataset.reservationIndex);Number.isNaN(w)||g.addEventListener("click",()=>{typeof n=="function"&&n(w)})}),p.querySelectorAll('button[data-action="confirm"]').forEach(g=>{const w=Number(g.dataset.reservationIndex);Number.isNaN(w)||g.addEventListener("click",v=>{v.stopPropagation(),typeof a=="function"&&a(w,v)})})}function zd(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=ue(),c=s[e];if(!c)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=r.find(w=>String(w.id)===String(c.customerId)),l=c.projectId?i.find(w=>String(w.id)===String(c.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const w=ln()||[];u.innerHTML=El(c,d,w,e,l)}const p=document.getElementById("reservationDetailsModal"),f=()=>{p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(p)?.hide()},m=document.getElementById("reservation-details-edit-btn");m&&(m.onclick=()=>{f(),typeof t=="function"&&t(e,{reservation:c,customer:d,getEditContext:a})});const y=document.getElementById("reservation-details-delete-btn");y&&(y.onclick=()=>{f(),typeof n=="function"&&n(e,{reservation:c,customer:d})});const b=u?.querySelector('[data-action="open-project"]');b&&l&&b.addEventListener("click",()=>{f();const w=l?.id!=null?String(l.id):"",v=w?`projects.html?project=${encodeURIComponent(w)}`:"projects.html";window.location.href=v});const g=document.getElementById("reservation-details-export-btn");return g&&(g.onclick=async w=>{w?.preventDefault?.(),w?.stopPropagation?.(),g.blur();try{await Hd({reservation:c,customer:d,project:l})}catch(v){console.error("❌ [reservations] export to PDF failed",v),E(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(p).show(),!0}function wi(){const e=()=>{un(),$e(),ln()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let Xs=!1,Js=null;function Vd(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function Du(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=Vd(n);if(!a&&Xs&&bt().length>0&&s===Js)return bt();try{const r=await lr(n||{});return Xs=!0,Js=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return bt()}}async function Ud(e,{onAfterChange:t}={}){if(!Et())return cn(),!1;const a=bt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await Zo(s),wi(),t?.({type:"deleted",reservation:a}),E(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=Hn(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return E(i,"error"),!1}}async function Kd(e,{onAfterChange:t}={}){const a=bt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=lt(a);if(r)return E(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await ec(s);return wi(),t?.({type:"confirmed",reservation:i}),E(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=Hn(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return E(c,"error"),!1}}function pn(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:nn(e,n),end:nn(t,a)}}function _t(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,Zs(t);return}const d=wt(e);t.innerHTML=d.map(l=>{const u=l.items[0]||{},p=xt(u)||l.image,f=p?`<img src="${p}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=h(String(l.count)),y=Number.isFinite(Number(l.unitPrice))?Number(l.unitPrice):0,b=Number.isFinite(Number(l.totalPrice))?Number(l.totalPrice):y*l.count,g=`${h(y.toFixed(2))} ${a}`,w=`${h(b.toFixed(2))} ${a}`,v=l.barcodes.map(C=>h(String(C||""))).filter(Boolean),I=v.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${v.map(C=>`<li>${C}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${l.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${l.description||"-"}</div>
                ${I}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${l.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${l.key}" aria-label="${i}">−</button>
              <span class="reservation-qty-value">${m}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${l.key}" aria-label="${r}">+</button>
            </div>
          </td>
          <td>${g}</td>
          <td>${w}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${l.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),Zs(t)}function Qd(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function aa(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=sa();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,Ys();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${h(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${h(Number(s.percentage).toFixed(2))}%`:"—",d=s?.recordedAt?h(Ne(s.recordedAt)):"—",l=Qd(s?.type),u=s?.note?h(s.note):"";return`
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
  `,Ys()}function Gd(){if(rn()){E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=ki(e);let a=_i(t);if(!Number.isFinite(a)||a<=0){E(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=ba.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,d=o("reservations.create.summary.currency","SR");let l=null,u=null;if(n==="percent"){const f=Math.max(0,100-i);if(f<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const y=h(m.toFixed(2));E(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",y)),a=m}u=Number(a.toFixed(2)),r>0&&(l=a/100*r)}else{const f=Math.max(0,r-c);if(f<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const y=`${h(m.toFixed(2))} ${d}`;E(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",y)),a=m}l=Number(a.toFixed(2)),r>0&&(u=l/r*100)}l!=null&&(l=Number(l.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const p={type:n,value:a,amount:l,percentage:u,recordedAt:new Date().toISOString()};su(p),gs(sa()),aa(),Me(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),E(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function Ys(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(rn()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Gd()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(rn()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(ru(s),gs(sa()),aa(),Me(),E(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function Wd(e){const{index:t,items:n}=$t(),s=wt(n).find(c=>c.key===e);if(!s)return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,d)=>d!==r);Tt(t,i),_t(i),Me()}function Xd(e){const{index:t,items:n}=$t(),a=n.filter(s=>mn(s)!==e);a.length!==n.length&&(Tt(t,a),_t(a),Me())}function Jd(e){const{index:t,items:n}=$t(),s=wt(n).find(g=>g.key===e);if(!s)return;const{start:r,end:i}=pn();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=ue(),d=t!=null&&c[t]||null,l=d?.id??d?.reservationId??null,u=new Set(n.map(g=>ce(g.barcode))),{equipment:p=[]}=ue(),f=(p||[]).find(g=>{const w=ce(g?.barcode);return!w||u.has(w)||mn({desc:g?.desc||g?.description||g?.name||"",price:Number(g?.price)||0})!==e||!Ja(g)?!1:!Ve(w,r,i,l)});if(!f){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const m=ce(f.barcode),y=zt(f);if(!y){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const b=[...n,{id:y,equipmentId:y,barcode:m,desc:f.desc||f.description||f.name||s.description||"",qty:1,price:Number.isFinite(Number(f.price))?Number(f.price):s.unitPrice,image:xt(f)}];Tt(t,b),_t(b),Me()}function Zs(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){Wd(s);return}if(a==="increase-edit-group"&&s){Jd(s);return}if(a==="remove-edit-group"&&s){Xd(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||eu(i)}}),e.dataset.groupListenerAttached="true")}function rn(){return!!document.getElementById("edit-res-project")?.value}function Yd(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{rn()&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function Zd(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),d=document.getElementById("edit-res-payment-history");[n,a,s,r,i,c,d].forEach(Yd),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s&&(s.value="unpaid",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),d&&(d.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.dataset.linkedDisabled="false"))}function Me(){const e=document.getElementById("edit-res-summary");if(!e)return;aa();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),Pe(a),Me()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=rn();Zd(c);const d=document.getElementById("edit-res-tax"),l=c?!1:d?.checked||!1,u=!c&&a?.dataset?.userSelected==="true",p=c?"unpaid":u&&a?.value||"unpaid";let f=null;!c&&l&&(Re("edit-res-company-share"),f=Dt("edit-res-company-share"),(!Number.isFinite(f)||f<=0)&&(Re("edit-res-company-share"),f=Dt("edit-res-company-share")));const{items:m=[],payments:y=[]}=$t(),{start:b,end:g}=pn(),w=ba({items:m,discount:r,discountType:i,applyTax:l,paidStatus:p,start:b,end:g,companySharePercent:f,paymentHistory:y});e.innerHTML=w;const v=ba.lastResult;if(v&&a){const I=v.paymentStatus;u?Pe(a,a.value):(a.value!==I&&(a.value=I),a.dataset&&delete a.dataset.userSelected,Pe(a,I))}else a&&Pe(a,a.value)}function eu(e){if(e==null)return;const{index:t,items:n}=$t();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);Tt(t,a),_t(a),Me()}function tu(e){const t=e?.value??"",n=ce(t);if(!n)return;const a=zn(n);if(!a){E(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=ct(a);if(s==="maintenance"||s==="retired"){E(Vt(s));return}const r=ce(n),{index:i,items:c=[]}=$t();if(c.findIndex(g=>ce(g.barcode)===r)>-1){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:l,end:u}=pn();if(!l||!u){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:p=[]}=ue(),f=i!=null&&p[i]||null,m=f?.id??f?.reservationId??null;if(Ve(r,l,u,m)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const y=zt(a);if(!y){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const b=[...c,{id:y,equipmentId:y,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];Tt(i,b),e&&(e.value=""),_t(b),Me()}function Fn(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Cr(t),a=ce(n?.barcode||t);if(!n||!a){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=ct(n);if(s==="maintenance"||s==="retired"){E(Vt(s));return}const{start:r,end:i}=pn();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:d=[]}=$t();if(d.some(b=>ce(b.barcode)===a)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=ue(),p=c!=null&&u[c]||null,f=p?.id??p?.reservationId??null;if(Ve(a,r,i,f)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=zt(n);if(!m){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const y=[...d,{id:m,equipmentId:m,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];Tt(c,y),_t(y),Me(),e.value=""}function Ii(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Fn(e))});const t=()=>{Pr(e.value,"edit-res-equipment-description-options")&&Fn(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}typeof document<"u"&&document.addEventListener("language:changed",()=>{Me()});typeof window<"u"&&(window.getEditReservationDateRange=pn,window.renderEditPaymentHistory=aa);function nu(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){ka(e);return}Fn(e)}}function Fu(){Ut(),Ii()}function au(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let on=null,Qe=[],Oe=[],Fa=null,ke={},ya=!1;function Ra(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function Ma(){return document.getElementById("edit-res-confirmed")?.value==="true"}function $t(){return{index:on,items:Qe,payments:Oe}}function Tt(e,t,n=Oe){on=typeof e=="number"?e:null,Qe=Array.isArray(t)?[...t]:[],Oe=Array.isArray(n)?[...n]:[]}function Ai(){on=null,Qe=[],ac(),Oe=[]}function sa(){return[...Oe]}function gs(e){Oe=Array.isArray(e)?[...e]:[]}function su(e){e&&(Oe=[...Oe,e])}function ru(e){!Number.isInteger(e)||e<0||(Oe=Oe.filter((t,n)=>n!==e))}function iu(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function ki(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function _i(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function ou(e,t){if(e){e.value="";return}}function Xt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function $i(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),d=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,l=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:d,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:l}}function cu(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((d,l)=>String(l.createdAt||l.start||"").localeCompare(String(d.createdAt||d.start||""))):[],c=[`<option value="">${Xt(a)}</option>`];i.forEach(d=>{c.push(`<option value="${Xt(d.id)}">${Xt(d.title||a)}</option>`)}),r&&!i.some(d=>String(d.id)===r)&&c.push(`<option value="${Xt(r)}">${Xt(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function Ti(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const d=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",d&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}Ha("tax");const c=ke?.updateEditReservationSummary;typeof c=="function"&&c()}function Ha(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=ke?.updateEditReservationSummary;typeof r=="function"&&r()};if(ya){a();return}ya=!0;const s=()=>{ya=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(Ye)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),Re("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Re("edit-res-company-share"):n.checked&&(n.checked=!1));s()}function er(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:d}=ue(),u=bt()?.[e];if(!u){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}ke={...ke,reservation:u,projects:d||[]},t?.(),cu(d||[],u);const p=u.projectId&&d?.find?.(L=>String(L.id)===String(u.projectId))||null,{effectiveConfirmed:f,projectLinked:m}=lt(u,p),y=u.items?u.items.map(L=>({...L,equipmentId:L.equipmentId??L.equipment_id??L.id,barcode:ce(L?.barcode)})):[],g=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(L=>$i(L)).filter(Boolean);Tt(e,y,g);const w=o("reservations.list.unknownCustomer","غير معروف"),v=c?.find?.(L=>String(L.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const I=document.getElementById("edit-res-id");I&&(I.value=u.reservationId||u.id);const C=document.getElementById("edit-res-customer");C&&(C.value=v?.customerName||w);const U=typeof a=="function"?a(u.start):{date:"",time:""},q=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",U.date),n?.("edit-res-start-time",U.time),n?.("edit-res-end",q.date),n?.("edit-res-end-time",q.time);const x=document.getElementById("edit-res-notes");x&&(x.value=u.notes||"");const A=document.getElementById("edit-res-discount");if(A){const L=m?0:u.discount??0;A.value=h(L)}const k=document.getElementById("edit-res-discount-type");k&&(k.value=m?"percent":u.discountType||"percent");const B=u.projectId?!1:!!u.applyTax,T=document.getElementById("edit-res-tax");T&&(T.checked=B);const $=document.getElementById("edit-res-company-share");if($){const L=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,P=L!=null?Number.parseFloat(h(String(L).replace("%","").trim())):NaN,M=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,R=M!=null?M===!0||M===1||M==="1"||String(M).toLowerCase()==="true":Number.isFinite(P)&&P>0,H=R&&Number.isFinite(P)&&P>0?P:Ye,O=B||R;$.checked=O,$.dataset.companyShare=String(H)}Ra(f,{disable:m});const K=document.getElementById("edit-res-paid"),z=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");K&&(K.value=z,K.dataset&&delete K.dataset.userSelected);const N=document.getElementById("edit-res-payment-progress-type"),_=document.getElementById("edit-res-payment-progress-value");if(N?.dataset?.userSelected&&delete N.dataset.userSelected,N&&(N.value="percent"),ou(_),sc((u.technicians||[]).map(L=>String(L))),s?.(y),typeof window<"u"){const L=window?.renderEditPaymentHistory;typeof L=="function"&&L()}Ti(),r?.();const G=document.getElementById("editReservationModal");Fa=iu(G,i),Fa?.show?.()}async function lu({combineDateTime:e,hasEquipmentConflict:t,hasTechnicianConflict:n,updateEditReservationSummary:a,renderReservations:s,populateEquipmentDescriptionLists:r,handleReservationsMutation:i}={}){if(on===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const c=document.getElementById("edit-res-start")?.value?.trim(),d=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",l=document.getElementById("edit-res-end")?.value?.trim(),u=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",p=document.getElementById("edit-res-notes")?.value||"",f=h(document.getElementById("edit-res-discount")?.value||"0");let m=parseFloat(f)||0,y=document.getElementById("edit-res-discount-type")?.value||"percent";const b=Ma(),g=document.getElementById("edit-res-paid"),w=g?.dataset?.userSelected==="true",v=w&&g?.value||"unpaid",I=document.getElementById("edit-res-payment-progress-type"),C=document.getElementById("edit-res-payment-progress-value"),U=ki(I),q=_i(C),x=document.getElementById("edit-res-project")?.value||"",A=tc(),k=document.getElementById("edit-res-company-share"),B=document.getElementById("edit-res-tax");if(!c||!l){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const T=typeof e=="function"?e:(ee,ye)=>`${ee}T${ye||"00:00"}`,$=T(c,d),K=T(l,u);if($&&K&&new Date($)>new Date(K)){E(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const N=bt()?.[on];if(!N){E(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(Qe)||Qe.length===0&&A.length===0){E(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const _=typeof t=="function"?t:()=>!1,G=N.id??N.reservationId;for(const ee of Qe){const ye=ct(ee.barcode);if(ye==="reserved"){const me=ce(ee.barcode);if(!_(me,$,K,G))continue}if(ye!=="available"){E(Vt(ye));return}}for(const ee of Qe){const ye=ce(ee.barcode);if(_(ye,$,K,G)){E(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const L=typeof n=="function"?n:()=>!1;for(const ee of A)if(L(ee,$,K,G)){E(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const P=Array.isArray(ke.projects)&&ke.projects.length?ke.projects:ue().projects||[],M=x&&P.find(ee=>String(ee.id)===String(x))||null,R={...N,projectId:x?String(x):null,confirmed:b},{effectiveConfirmed:H,projectLinked:O,projectStatus:ne}=lt(R,M);let Y=!!k?.checked,ae=!!B?.checked;if(O&&(Y&&(k.checked=!1,Y=!1),ae=!1),!O&&Y!==ae){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}ae&&(Re("edit-res-company-share"),Y=!!k?.checked);let W=Y?getCompanySharePercent("edit-res-company-share"):null;Y&&(!Number.isFinite(W)||W<=0)&&(Re("edit-res-company-share"),W=getCompanySharePercent("edit-res-company-share"));const re=Y&&ae&&Number.isFinite(W)&&W>0,be=O?!1:ae;O&&(m=0,y="percent");const pe=Ka(Qe,m,y,be,A,{start:$,end:K,companySharePercent:re?W:0});let Se=sa();if(Number.isFinite(q)&&q>0){const ee=pe;let ye=null,me=null;U==="amount"?(ye=q,ee>0&&(me=q/ee*100)):(me=q,ee>0&&(ye=q/100*ee));const tt=$i({type:U,value:q,amount:ye,percentage:me,recordedAt:new Date().toISOString()});tt&&(Se=[...Se,tt],gs(Se)),C&&(C.value="")}const V=Qa({totalAmount:pe,history:Se}),X=Ga({manualStatus:v,paidAmount:V.paidAmount,paidPercent:V.paidPercent,totalAmount:pe});g&&!w&&(g.value=X,g.dataset&&delete g.dataset.userSelected);let Z=N.status??"pending";O?Z=M?.status??ne??Z:["completed","cancelled"].includes(String(Z).toLowerCase())||(Z=b?"confirmed":"pending");const de=rr({reservationCode:N.reservationCode??N.reservationId??null,customerId:N.customerId,start:$,end:K,status:Z,title:N.title??null,location:N.location??null,notes:p,projectId:x?String(x):null,totalAmount:pe,discount:m,discountType:y,applyTax:be,paidStatus:X,confirmed:H,items:Qe.map(ee=>({...ee,equipmentId:ee.equipmentId??ee.id})),technicians:A,companySharePercent:re?W:null,companyShareEnabled:re,paidAmount:V.paidAmount,paidPercentage:V.paidPercent,paymentProgressType:V.paymentProgressType,paymentProgressValue:V.paymentProgressValue,paymentHistory:Se});try{const ee=await nc(N.id||N.reservationId,de);await lr(),un(),$e(),E(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),a?.(),Ai(),i?.({type:"updated",reservation:ee}),s?.(),r?.(),Fa?.hide?.()}catch(ee){console.error("❌ [reservationsEdit] Failed to update reservation",ee);const ye=Hn(ee)?ee.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");E(ye,"error")}}function Ru(e={}){ke={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=ke,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=h(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{Ha("tax")}),c.dataset.listenerAttached="true");const d=document.getElementById("edit-res-company-share");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{Ha("share")}),d.dataset.listenerAttached="true");const l=document.getElementById("edit-res-payment-progress-type");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{l.dataset.userSelected="true",t?.()}),l.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const p=document.getElementById("edit-res-project");p&&!p.dataset.listenerAttached&&(p.addEventListener("change",()=>{Ti();const g=Array.isArray(ke.projects)&&ke.projects.length?ke.projects:ue().projects||[],w=p.value&&g.find(q=>String(q.id)===String(p.value))||null,I={...ke?.reservation??{},projectId:p.value||null,confirmed:Ma()},{effectiveConfirmed:C,projectLinked:U}=lt(I,w);Ra(C,{disable:U}),t?.()}),p.dataset.listenerAttached="true");const f=document.getElementById("edit-res-confirmed-btn");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{if(f.disabled)return;const g=!Ma();Ra(g),t?.()}),f.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{lu(ke).catch(g=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",g)})}),m.dataset.listenerAttached="true");const y=document.getElementById("edit-res-equipment-barcode");if(y&&!y.dataset.listenerAttached){let g=null;const w=()=>{y.value?.trim()&&(clearTimeout(g),g=null,n?.(y))};y.addEventListener("keydown",I=>{I.key==="Enter"&&(I.preventDefault(),w())});const v=()=>{if(clearTimeout(g),!y.value?.trim())return;const{start:I,end:C}=getEditReservationDateRange();!I||!C||(g=setTimeout(()=>{w()},150))};y.addEventListener("input",v),y.addEventListener("change",w),y.dataset.listenerAttached="true"}Ii?.();const b=document.getElementById("editReservationModal");b&&!b.dataset.cleanupAttached&&(b.addEventListener("hidden.bs.modal",()=>{Ai(),t?.(),s?.([])}),b.dataset.cleanupAttached="true")}const du=ue()||{};let Fe=(du.projects||[]).map(pu),fn=!1;function Mu(){return Fe}function ra(e){Fe=Array.isArray(e)?e.map(hs):[],za({projects:Fe});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return Fe}async function uu(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,d])=>{d==null||d===""||t.set(c,String(d))});const n=t.toString(),s=(await ze(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(bs);return ra(i),fn=!0,Fe}async function mu({force:e=!1,params:t=null}={}){if(!e&&fn&&Fe.length>0)return Fe;try{return await uu(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),Fe}}async function Hu(e){const t=await ze("/projects/",{method:"POST",body:e}),n=bs(t?.data??{}),a=[...Fe,n];return ra(a),fn=!0,n}async function Ou(e,t){const n=await ze(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=bs(n?.data??{}),s=Fe.map(r=>String(r.id)===String(e)?a:r);return ra(s),fn=!0,a}async function zu(e){await ze(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=Fe.filter(n=>String(n.id)!==String(e));ra(t),fn=!0}function Vu({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:d,paymentStatus:l,equipmentEstimate:u=0,expenses:p=[],taxAmount:f=0,totalWithTax:m=0,discount:y=0,discountType:b="percent",companyShareEnabled:g=!1,companySharePercent:w=null,companyShareAmount:v=0,paidAmount:I=null,paidPercentage:C=null,paymentProgressType:U=null,paymentProgressValue:q=null,confirmed:x=!1,technicians:A=[],equipment:k=[],payments:B,paymentHistory:T}={}){const $=Array.isArray(A)?A.map(R=>Number.parseInt(String(R),10)).filter(R=>Number.isInteger(R)&&R>0):[],K=Array.isArray(k)?k.map(R=>{const H=Number.parseInt(String(R.equipmentId??R.equipment_id??R.id??0),10),O=Number.parseInt(String(R.qty??R.quantity??0),10);return!Number.isInteger(H)||H<=0?null:{equipment_id:H,quantity:Number.isInteger(O)&&O>0?O:1}}).filter(Boolean):[],z=Array.isArray(p)?p.map(R=>{const H=Number.parseFloat(R?.amount??R?.value??0)||0,O=(R?.label??R?.name??"").trim();return O?{label:O,amount:Math.round(H*100)/100}:null}).filter(Boolean):[],N=z.reduce((R,H)=>R+(H?.amount??0),0),_={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!d,payment_status:l??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(N*100)/100,tax_amount:Math.round((Number.parseFloat(f)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(m)||0)*100)/100,confirmed:!!x,technicians:$,equipment:K,expenses:z},G=Math.max(0,Number.parseFloat(y)||0);_.discount=G,_.discount_type=b==="amount"?"amount":"percent";const L=Number.parseFloat(w),P=!!g&&Number.isFinite(L)&&L>0;_.company_share_enabled=P,_.company_share_percent=P?L:0,_.company_share_amount=P?Math.max(0,Number.parseFloat(v)||0):0,Number.isFinite(Number(I))&&(_.paid_amount=Math.max(0,Number.parseFloat(I)||0)),Number.isFinite(Number(C))&&(_.paid_percentage=Math.max(0,Number.parseFloat(C)||0)),(U==="amount"||U==="percent")&&(_.payment_progress_type=U),q!=null&&q!==""&&(_.payment_progress_value=Number.parseFloat(q)||0),e&&(_.project_code=String(e).trim());const M=B!==void 0?B:T;if(M!==void 0){const R=ji(M)||[];_.payments=R.map(H=>({type:H.type,amount:H.amount!=null?H.amount:null,percentage:H.percentage!=null?H.percentage:null,value:H.value!=null?H.value:null,note:H.note??null,recorded_at:H.recordedAt??null}))}return _.end_datetime||delete _.end_datetime,_.client_company||(_.client_company=null),_}function bs(e={}){return hs(e)}function pu(e={}){return hs(e)}function hs(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(m=>{if(m==null)return null;if(typeof m=="object"){const y=m.id??m.technician_id??m.technicianId;return y!=null?String(y):null}return String(m)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(m=>{const y=m?.equipment_id??m?.equipmentId??m?.id??null,b=m?.quantity??m?.qty??0,g=m?.barcode??m?.code??"",w=m?.description??m?.name??"";return{equipmentId:y!=null?String(y):null,qty:Number.parseInt(String(b),10)||0,barcode:g,description:w}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((m,y)=>({id:m?.id??`expense-${t??"x"}-${y}`,label:m?.label??"",amount:Number.parseFloat(m?.amount??0)||0})),d=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,l=e.company_share_enabled??e.companyShareEnabled,u=l!=null?l===!0||l===1||String(l).toLowerCase()==="true":d>0,p=e.payment_history??e.paymentHistory??e.payments??null,f=ji(p);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?d:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(m=>typeof m=="object"?m:{id:m}),equipment:r,expenses:c,paymentHistory:f}}function Uu(e){return e instanceof tr}function ga(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function fu(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=ga(e.value);let s=ga(e.amount),r=ga(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,d=e.recordedAt??e.recorded_at??e.date??null;let l=null;if(d){const p=new Date(d);Number.isNaN(p.getTime())||(l=p.toISOString())}l||(l=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:l}}function ji(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>fu(t)).filter(Boolean):[]}const Rn="reservations-ui:ready",yt=typeof EventTarget<"u"?new EventTarget:null;let gt={};function yu(e){return Object.freeze({...e})}function gu(){if(!yt)return;const e=gt,t=typeof CustomEvent=="function"?new CustomEvent(Rn,{detail:e}):{type:Rn,detail:e};typeof yt.dispatchEvent=="function"&&yt.dispatchEvent(t)}function bu(e={}){if(!e||typeof e!="object")return gt;const t={...gt};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),gt=yu(t),gu(),gt}function hu(e){if(e)return gt?.[e]}function Ku(e){const t=hu(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const i=(s?.detail||gt)?.[e];typeof i=="function"&&(yt&&yt.removeEventListener(Rn,a),n(i))};yt&&yt.addEventListener(Rn,a)})}function Qu(){return mu().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=ue()||{};rc(e||[]),Dr()})}function vs(e=null){Dr(),Ci(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function vu(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Oa(){return{populateEquipmentDescriptionLists:Ut,setFlatpickrValue:au,splitDateTime:ar,renderEditItems:_t,updateEditReservationSummary:Me,addEquipmentByDescription:nu,addEquipmentToEditingReservation:tu,addEquipmentToEditingByDescription:Fn,combineDateTime:nn,hasEquipmentConflict:Ve,hasTechnicianConflict:sr,renderReservations:Ci,handleReservationsMutation:vs,ensureModal:vu}}function Ci(e="reservations-list",t=null){Od({containerId:e,filters:t,onShowDetails:Pi,onConfirmReservation:Li})}function Pi(e){return zd(e,{getEditContext:Oa,onEdit:(t,{reservation:n})=>{Bi(t,n)},onDelete:Ni})}function Ni(e){return Et()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?Ud(e,{onAfterChange:vs}):!1:(cn(),!1)}function Li(e){return Kd(e,{onAfterChange:vs})}function Bi(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}er(e,Oa());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}er(e,Oa());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}Mo({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Gu(){bu({showReservationDetails:Pi,deleteReservation:Ni,confirmReservation:Li,openReservationEditor:Bi})}export{Ou as A,bu as B,Pi as C,bs as D,Ht as E,ns as F,ju as G,Cu as H,Mu as I,Uu as J,Rr as K,Pu as L,Bu as M,Au as N,ku as O,Tu as P,uu as Q,Ie as R,_u as S,$u as T,Nu as U,zu as V,Hu as W,kl as X,Hr as Y,Or as Z,Lu as _,mu as a,Gu as b,Ru as c,Fu as d,Du as e,Dr as f,Oa as g,ie as h,wu as i,vs as j,El as k,Qu as l,lt as m,Xn as n,$e as o,pc as p,An as q,Ci as r,Iu as s,Eu as t,Me as u,xu as v,hu as w,Ku as x,Fr as y,Vu as z};
