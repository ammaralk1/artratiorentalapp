import{n as h,d as fe,f as lc,t as o,b as We,h as x,j as Nt,o as bn,s as is,A as hr,z as dc,k as Re,B as vr,u as uc}from"./auth.js";import{n as ee,x as Xe,y as qr,z as mc,D as it,A as os,B as Us,C as mn,E as Rn,F as aa,G as pc,f as cs,H as Je,I as ls,J as Sr,K as fc,L as yc,M as gc,N as bc,O as Mn,P as hc,Q as Er,R as vc,S as xr,v as ds,h as us,j as ms,T as wr,U as qc,s as hn,c as sa,V as Ir,W as Sc,X as Ar,Y as Ec,p as ra,a as kr,g as _t,Z as xc,_ as wc,$ as Ca,a0 as Ic,w as Ac,a1 as kc,a2 as _c,b as $c}from"./reservationsService.js";const Aa="select.form-select:not([data-no-enhance]):not([multiple])",Ye=new WeakMap;let ka=null,Ks=!1,nt=null;function Gu(e=document){e&&(e.querySelectorAll(Aa).forEach(t=>Cn(t)),!ka&&e===document&&(ka=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(Aa)&&Cn(a),a.querySelectorAll?.(Aa).forEach(s=>Cn(s)))})}),ka.observe(document.body,{childList:!0,subtree:!0})),Ks||(Ks=!0,document.addEventListener("pointerdown",jc,{capture:!0})))}function Nn(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){Cn(e);return}const t=e.closest(".enhanced-select");t&&(ps(t),zn(t),La(t))}function Cn(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){Nn(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};Ye.set(t,r),a.addEventListener("click",()=>Pc(t)),a.addEventListener("keydown",i=>Nc(i,t)),s.addEventListener("click",i=>Lc(i,t)),s.addEventListener("keydown",i=>Cc(i,t)),e.addEventListener("change",()=>{zn(t),_r(t)}),r.observer=new MutationObserver(i=>{let c=!1,d=!1;for(const l of i)l.type==="attributes"&&l.attributeName==="disabled"&&(d=!0),l.type==="childList"&&(c=!0);d&&La(t),c&&Tc(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),ps(t),zn(t),La(t)}function Tc(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,ps(t),zn(t)})))}function ps(e){const t=Ye.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),_r(e)}function zn(e){const t=Ye.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function _r(e){const t=Ye.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function La(e){const t=Ye.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function Pc(e){Ye.get(e)&&(e.getAttribute("data-open")==="true"?Wt(e):$r(e))}function $r(e){const t=Ye.get(e);if(!t)return;nt&&nt!==e&&Wt(nt,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),nt=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function Wt(e,{focusTrigger:t=!0}={}){const n=Ye.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),nt===e&&(nt=null))}function jc(e){if(!nt)return;const t=e.target;t instanceof Node&&(nt.contains(t)||Wt(nt,{focusTrigger:!1}))}function Nc(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),$r(t)):n==="Escape"&&Wt(t)}function Cc(e,t){const n=e.key,a=Ye.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&Tr(i,t)}else n==="Escape"&&(e.preventDefault(),Wt(t))}function Lc(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&Tr(n,t)}function Tr(e,t){const n=Ye.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),Wt(t)}const Xt=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let at=null;function fs(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function Pr(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function Bc(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function Dc(e={}){const t=Bc({...e,activatedAt:Date.now()});return at=t,Pr(!0,t.mode||"create"),fs(Xt.change,{active:!0,selection:{...t}}),t}function Hn(e="manual"){if(!at)return;const t=at;at=null,Pr(!1),fs(Xt.change,{active:!1,previous:t,reason:e})}function jr(){return!!at}function Fc(){return at?{...at}:null}function Rc(e){if(!at)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=h(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:r,description:i}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const d=c.map(u=>h(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!d.length)return!1;const l=Number.isInteger(s)&&s>0?s:d.length;t={barcodes:d,quantity:Math.min(l,d.length)},r&&(t.groupKey=r),i&&(t.description=i)}else return!1;return fs(Xt.requestAdd,{...t,selection:{...at}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||Hn("tab-changed")});const Mc=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),zc=new Set(["maintenance","reserved","retired"]);function Hc(e){const t=String(e??"").trim().toLowerCase();return t&&Mc.get(t)||"available"}function Oc(e){return e?typeof e=="object"?e:ia(e):null}function yt(e){const t=Oc(e);return t?Hc(t.status||t.state||t.statusLabel||t.status_label):"available"}function ys(e){return!zc.has(yt(e))}function Ct(e={}){return e.image||e.imageUrl||e.img||""}function Vc(e){if(!e)return null;const t=ee(e),{equipment:n=[]}=fe();return(n||[]).find(a=>ee(a?.barcode)===t)||null}function ia(e){const t=ee(e);if(!t)return null;const{equipment:n=[]}=fe();return(n||[]).find(a=>ee(a?.barcode)===t)||null}const Uc=fe()||{};let dt=(Uc.equipment||[]).map(Gc),Ba=!1,cn="",It=null,Tt=null,Pt=null,oa=!1,Qs=!1;function Kc(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function Qc(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function Gc(e={}){return gs({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function ca(e={}){return gs(e)}function gs(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=vn(e.quantity??e.qty??0),i=la(e.unit_price??e.price??0),c=h(String(e.barcode??"").trim()),d=je(e.status??e.state??e.status_label??e.statusLabel??"available"),l=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:Wc(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:d,image:l,imageUrl:l,created_at:e.created_at??null,updated_at:e.updated_at??null}}function Wc(e){return e!=null&&e!==""}function vn(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function la(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function Xc(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function Gs(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function Jc(e,t){const n=Gs(e),a=Gs(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}else{if(r!==i)return r?-1:1;{const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}}const c=On(e?.desc||e?.description||e?.name||""),d=On(t?.desc||t?.description||t?.name||"");return c.localeCompare(d,"ar",{sensitivity:"base"})}function Se(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function je(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function Yc(e){return je(e)}function Da(){if(!jr())return null;const e=Fc();return e?{...e}:null}function Zc(e){const t=Da();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:r=null}=t,i=t?.mode||t?.source||"",c=[],d=new Set;if(n.forEach(y=>{const m=ee(y?.barcode);!m||d.has(m)||(d.add(m),c.push({variant:y,barcode:m}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(i==="package-manager"||i==="equipment-packages"){const y=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:m})=>m),maxQuantity:y,reason:""}}const l=c.filter(({variant:y})=>ys(y));if(!a||!s)return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=l.filter(({barcode:y})=>!Xe(y,a,s,r));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:y})=>y),maxQuantity:u.length};let p=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(l.length>0)p=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const y=new Set(c.map(({variant:m})=>je(m?.status)));y.has("maintenance")?p=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):y.has("reserved")?p=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):y.has("retired")&&(p=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:p,availableBarcodes:[],maxQuantity:0}}function el(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function Nr(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=Da();e.hidden=!s;const r=s?.mode||s?.source||"";s?r==="package-manager"||r==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=Da(),d=c?.mode||c?.source||"";d==="package-manager"||d==="equipment-packages"?Hn("package-finish-button"):(Hn("return-button"),el())}),t.dataset.listenerAttached="true")}function Me(){return dt}function jt(e){dt=Array.isArray(e)?e.map(gs):[],is({equipment:dt}),Qc()}function On(e){return String(e??"").trim().toLowerCase()}function mt(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=On(t);return n||(n=On(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function da(e){const t=mt(e);return t?Me().filter(n=>mt(n)===t):[]}function ua(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=ma(e);if(n){const a=Se(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${Se(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function bs(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function Vn(){const e=bs();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function hs(e={}){const t=bs();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function Ut(e){oa=e;const t=bs(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function Wu(e){if(!Nt()){bn();return}if(!e)return;try{await nl()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){x(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let d=0;if(i.forEach(l=>{const u=l.القسم??l.category??"",p=l["القسم الثانوي"]??l.subcategory??"",y=l.الوصف??l.description??l.name??"",m=l.الكمية??l.quantity??0,f=l.السعر??l.price??0,g=l.الباركود??l.barcode??"",b=l.الحالة??l.status??"متاح",I=l.الصورة??l.image_url??l.image??"",v=h(String(g||"")).trim();if(!y||!v){d+=1;return}c.push(vs({category:u,subcategory:p,description:y,quantity:m,unit_price:f,barcode:v,status:b,image_url:I}))}),!c.length){x(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const l=await We("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(l?.data)?l.data.map(ca):[];if(u.length){const m=[...Me(),...u];jt(m)}await pa({showToastOnError:!1}),Ne();const p=l?.meta?.count??u.length,y=[];p&&y.push(`${p} ✔️`),d&&y.push(`${d} ⚠️`),x(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(y.length?` (${y.join(" / ")})`:""))}catch(l){const u=Jt(l,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");x(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),x(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),x(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const tl="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let nn=null;function nl(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):nn||(nn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=tl,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),nn=null,e}),nn)}function vs({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const d=h(String(r||"")).trim(),l=Yc(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:vn(a),unit_price:la(s),barcode:d,status:l,image_url:c?.trim()||null}}async function al(){if(!Nt()){bn();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await We("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await pa({showToastOnError:!1}),x(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=Jt(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");x(t,"error")}}function ma(e){return e.image||e.imageUrl||e.img||""}function sl(e){const t=je(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function Un(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${Se(a)}</td></tr>`}n&&(n.textContent="0")}function Cr(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=It?.groupKey||mt(e);if(!r){Un();return}const i=Me().filter(p=>mt(p)===r).sort((p,y)=>{const m=String(p.barcode||"").trim(),f=String(y.barcode||"").trim();return!m&&!f?0:m?f?m.localeCompare(f,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){Un();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),d=o("equipment.form.labels.quantity","الكمية"),l=Me(),u=i.map(p=>{const y=p.id&&e.id?String(p.id)===String(e.id):String(p.barcode||"")===String(e.barcode||""),m=y?"equipment-variants-table__row--current":"",f=Se(String(p.barcode||"-")),g=y?`<span class="equipment-variants-current-badge">${Se(c)}</span>`:"",b=h(String(Number.isFinite(Number(p.qty))?Number(p.qty):0)),I=l.indexOf(p),v=Se(o("equipment.item.actions.delete","🗑️ حذف")),k=I>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${I}">${v}</button>
          </div>`:"";return`
        <tr class="${m}">
          <td>
            ${f}
            ${g}
          </td>
          <td>${sl(p.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${Se(d)}">${b}</span>
          </td>
          <td class="table-actions-cell">${k}</td>
        </tr>
      `}).join("");n.innerHTML=u}function rl({item:e,index:t}){const n=ma(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=Nt(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},d=Number.isFinite(Number(e.qty))?Number(e.qty):0,l=Number.isFinite(Number(e.price))?Number(e.price):0,u=d.toLocaleString("en-US"),p=l.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),y=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,m=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,f=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(d-y-m,0),g=f.toLocaleString("en-US"),b=o("equipment.card.labels.availableOfTotal","من أصل"),I=je(e.status);let v=`${Se(c.available)}: ${Se(g)} ${Se(b)} ${Se(u)}`,k="available";if(f===0){const H={reserved:{text:d===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},Q=H[I]||H.default;v=Se(Q.text),k=Q.modifier}const L=`<span class="equipment-card__availability equipment-card__availability--${k}">${v}</span>`,z="",q=e.desc||e.name||"—",w=e.name&&e.name!==e.desc?e.name:"",$=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${p} ${r}`}].map(({label:H,value:Q})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${H}</span>
              <span class="equipment-card__detail-value">${Q}</span>
            </span>
          `).join("")}
    </div>`,T=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),j=T.length?`<div class="equipment-card__categories">${T.map(({label:H,value:Q})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${H}</span>
              <span class="equipment-card__detail-value">${Q}</span>
            </div>
          `).join("")}</div>`:"",N=w?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${w}</span>
      </div>`:"",F=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${q}</h3>
    </div>
  `}
      ${$}
    </div>
  `,M=[],_=Zc(e),G=_?.availableBarcodes?.length?_.availableBarcodes.join(","):_?.barcode?_.barcode:"";let B="",P="";if(_.active){const H=`equipment-select-qty-${t}`,Q=!!_.canSelect,re=Q?Math.max(1,Number(_.maxQuantity||_.availableBarcodes?.length||1)):1,ae=Math.max(1,Math.min(re,99)),ue=[];for(let te=1;te<=ae;te+=1){const ce=h(String(te));ue.push(`<option value="${te}"${te===1?" selected":""}>${ce}</option>`)}const W=Q?"":" disabled",Y=o("reservations.create.equipment.selector.quantityLabel","الكمية"),me=Q?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${h(String(re))}`:_.reason?_.reason:"";B=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${H}">${Y}</label>
        <select class="equipment-card__quantity-select" id="${H}" data-equipment-select-quantity${W}>
          ${ue.join("")}
        </select>
        ${me?`<span class="equipment-card__selection-hint">${Se(me)}</span>`:""}
      </div>
    `;const he=o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),we=Q?"":" disabled",V=_.reason?` title="${Se(_.reason)}"`:"",J=['data-equipment-action="select-reservation"',`data-selection-max="${Q?re:0}"`];G&&J.push(`data-selection-barcodes="${Se(G)}"`),e.groupKey&&J.push(`data-selection-group="${Se(String(e.groupKey))}"`),P=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${J.join(" ")}${we}${V}>${he}</button>
    `}i&&M.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const U=M.length?M.join(`
`):"",R=Se(q);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${Se(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${R}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${z}
        ${L}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${F}
        </div>
      </div>
      <div class="equipment-card__body">
        ${j}
        ${N}
      </div>
      ${B||P||U?`<div class="equipment-card__actions equipment-card__actions--center">
            ${B}
            ${P}
            ${U}
          </div>`:""}
    </article>
  `}function il(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,a.appendChild(d)}),t.includes(i)&&(a.value=i),Nn(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,s.appendChild(d)}),n.includes(i)&&(s.value=i),Nn(s)}const r=document.getElementById("filter-status");r&&Nn(r)}function qn(){const e=fe();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return dt=t||[],dt;const s=new Date;let r=!1;const i=new Set((a||[]).filter(d=>d?.status==="open").map(d=>h(String(d?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(d=>{if(!d)return d;const l=je(d.status),u=h(String(d.barcode??"")).trim().toLowerCase(),p=u&&i.has(u);let y=p?"maintenance":"available";if(!p&&u)for(const m of n||[]){if(!ol(m,s))continue;if(m.items?.some(g=>h(String(g?.barcode??"")).trim().toLowerCase()===u)){y="reserved";break}}return y!==l?(r=!0,{...d,status:y}):{...d,status:y}});return r?jt(c):(dt=c,is({equipment:dt})),dt}function ol(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function _a(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Ne(){const e=document.getElementById("equipment-list");if(!e)return;Nr();const t=qn(),n=Array.isArray(t)?t:Me(),a=new Map;n.forEach(g=>{if(!g)return;const b=mt(g);b&&(a.has(b)||a.set(b,[]),a.get(b).push(g))});const s=Array.from(a.values()).map(g=>{const b=g[0],I=g.reduce((w,A)=>w+(Number.isFinite(Number(A.qty))?Number(A.qty):0),0),v=["maintenance","reserved","available","retired"],k=g.map(w=>je(w.status)).sort((w,A)=>v.indexOf(w)-v.indexOf(A))[0]||"available",L=g.reduce((w,A)=>{const $=vn(A?.qty??0)||0,T=je(A?.status);return T==="reserved"?w.reserved+=$:T==="maintenance"&&(w.maintenance+=$),w},{reserved:0,maintenance:0}),z=Math.max(I-L.reserved-L.maintenance,0);return{item:{...b,qty:I,status:k,variants:g,groupKey:mt(b),reservedQty:L.reserved,maintenanceQty:L.maintenance,availableQty:z},index:n.indexOf(b)}});s.sort((g,b)=>Jc(g.item,b.item));const r=document.getElementById("search-equipment")?.value||"",i=h(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",d=document.getElementById("filter-sub")?.value||"",l=document.getElementById("filter-status")?.value||"",u=l?je(l):"";if(Ba&&!n.length){e.innerHTML=_a(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(cn&&!n.length){e.innerHTML=_a(cn,{tone:"error",icon:"⚠️"});return}const p=s.filter(({item:g})=>{const b=h(String(g.barcode??"")).toLowerCase().trim(),I=Array.isArray(g.variants)?g.variants.map(q=>h(String(q.barcode??"")).toLowerCase().trim()).filter(Boolean):[],v=!i||g.name&&g.name.toLowerCase().includes(i)||g.desc&&g.desc.toLowerCase().includes(i)||b&&b.includes(i)||I.some(q=>q.includes(i))||g.category&&g.category.toLowerCase().includes(i)||g.sub&&g.sub.toLowerCase().includes(i),k=!c||g.category===c,L=!d||g.sub===d,z=!u||je(g.status)===u;return v&&k&&L&&z}),y=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),m=p;e.innerHTML=m.length?m.map(rl).join(""):_a(y);const f=document.getElementById("equipment-list-count");if(f){const g=o("equipment.list.countSuffix","عنصر"),b=h(String(m.length)),I=m.length?`${b} ${g}`:`0 ${g}`;f.textContent=I}il(n)}async function pa({showToastOnError:e=!0}={}){Ba=!0,cn="",Ne();try{const t=await We("/equipment/?all=1"),n=Array.isArray(t?.data)?t.data.map(ca):[];jt(n)}catch(t){cn=Jt(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&x(cn,"error")}finally{Ba=!1,Ne()}}function Jt(e,t,n){if(e instanceof hr){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function cl(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),r=la(t.querySelector("#new-equipment-price")?.value||"0"),i=vn(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",d=t.querySelector("#new-equipment-category")?.value?.trim()||"",l=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){x(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const p=vs({category:d,subcategory:l,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const y=await We("/equipment/",{method:"POST",body:p}),m=ca(y?.data),f=[...Me(),m];jt(f),Ne(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),x(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(y){const m=Jt(y,"equipment.toast.addFailed","تعذر إضافة المعدة");x(m,"error")}}async function Lr(e){if(!Nt()){bn();return}const t=Me(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await We(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),jt(a),Ne(),x(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=Jt(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");x(s,"error")}}async function ll(e,t){const n=Me(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},jt(r),Ne();return}const s=vs({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await We(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=ca(r?.data),c=[...n];c[e]=i,jt(c),Ne(),x(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=Jt(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw x(i,"error"),r}}function Tn(){Ne()}function Br(e){const n=Me()[e];if(!n)return;Tt=e;const a=da(n),s=a[0]||n,r=a.reduce((d,l)=>d+(Number.isFinite(Number(l.qty))?Number(l.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(d=>je(d.status)).sort((d,l)=>i.indexOf(d)-i.indexOf(l))[0]||je(s.status);document.getElementById("edit-equipment-index").value=e,hs({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:ma(s)||"",barcode:s.barcode||"",status:s.status||c}),Ut(!1),Pt=Vn(),ua(s),Cr(s),It={groupKey:mt(s),barcode:String(s.barcode||""),id:s.id||null},Kc(document.getElementById("editEquipmentModal"))?.show()}function dl(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),r=s?.querySelector("[data-equipment-select-quantity]");let i=Number.parseInt(r?.value||"1",10);(!Number.isFinite(i)||i<=0)&&(i=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&i>c&&(i=c);const l=(t.dataset.selectionBarcodes||"").split(",").map(m=>m.trim()).filter(m=>m.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",p=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";Rc({barcodes:l,quantity:i,groupKey:p,description:u})||x(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||Lr(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||Br(s)}}function ul(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||Br(n)}}function ml(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||Lr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function Dr(){if(!It||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=Me(),a=It.id?n.find(d=>String(d.id)===String(It.id)):null,s=It.groupKey,r=s?n.find(d=>mt(d)===s):null,i=a||r;if(!i){Un();return}const c=n.findIndex(d=>d===i);if(c>=0){const d=document.getElementById("edit-equipment-index");d&&(d.value=String(c)),Tt=c}if(Cr(i),!oa){const d=da(i),l=d[0]||i,u=d.reduce((m,f)=>m+(Number.isFinite(Number(f.qty))?Number(f.qty):0),0),p=["maintenance","reserved","available","retired"],y=d.map(m=>je(m.status)).sort((m,f)=>p.indexOf(m)-p.indexOf(f))[0]||je(l.status);hs({category:l.category||"",subcategory:l.sub||"",description:l.desc||l.description||"",quantity:String(u||l.qty||0),price:l.price!=null?String(l.price):"0",image:ma(l)||"",barcode:l.barcode||"",status:l.status||y}),Pt=Vn()}ua(primary)}function pl(){document.getElementById("search-equipment")?.addEventListener("input",Tn),document.getElementById("filter-category")?.addEventListener("change",Tn),document.getElementById("filter-sub")?.addEventListener("change",Tn),document.getElementById("filter-status")?.addEventListener("change",Tn),document.getElementById("add-equipment-form")?.addEventListener("submit",cl);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),al().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",dl),t.addEventListener("keydown",ul),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",ml),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);Xc(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!oa){Pt=Vn(),Ut(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){x(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:vn(document.getElementById("edit-equipment-quantity").value)||1,price:la(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await ll(t,n),Pt=Vn(),Ut(!1),Dr()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{pl(),Ne(),pa();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(Pt&&hs(Pt),Tt!=null){const a=Me()[Tt];if(a){const r=da(a)[0]||a;ua(r)}}Ut(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Ne(),Ut(oa),Tt!=null){const t=Me()[Tt];if(t){const a=da(t)[0]||t;ua(a)}}});document.addEventListener("equipment:refreshRequested",()=>{pa({showToastOnError:!1})});document.addEventListener(lc.USER_UPDATED,()=>{Ne()});document.addEventListener("equipment:changed",()=>{Dr()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{It=null,Un(),Tt=null,Pt=null,Ut(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!Qs&&(document.addEventListener(Xt.change,()=>{Nr(),Ne()}),Qs=!0);function _e(e=""){return h(String(e)).trim().toLowerCase()}const fl=2;function yl(e){const t=Number(e);return Number.isFinite(t)?t.toFixed(fl):"0.00"}function Ws(e={}){const t=Number(e?.qty);return Number.isFinite(t)&&t>0?t:1}function Sn(e={}){const t=e?.desc||e?.description||e?.name||"",n=_e(t),a=yl(e?.price??e?.unitPrice??e?.unit_price??0);return`${n}::${a}`}function Lt(e=[]){const t=new Map;return e.forEach((n,a)=>{const s=Sn(n);if(!s)return;if(!t.has(s)){const i=n?.desc||n?.description||n?.name||"",c=_e(i),d=Xs(n),l=n?.image||n?.imageUrl||n?.img||"";t.set(s,{key:s,description:i,normalizedDescription:c,unitPrice:d,image:l,items:[],itemIndices:[],barcodes:[]})}const r=t.get(s);r.items.push(n),r.itemIndices.push(a),n?.barcode&&r.barcodes.push(String(n.barcode))}),Array.from(t.values()).map(n=>({...n,quantity:n.items.reduce((a,s)=>a+Ws(s),0)})).map(n=>{const a=n.quantity||0,s=n.items.reduce((i,c)=>{const d=Xs(c),l=Ws(c);return i+d*l},0),r=a>0?s/a:n.unitPrice;return{...n,quantity:a,count:a,totalPrice:s,unitPrice:r}})}function Bt(e={}){const t=[e?.id,e?.equipment_id,e?.equipmentId,e?.item_id,e?.itemId];for(const n of t)if(!(n==null||n===""))return String(n);return null}function Xs(e={}){const t=e?.price??e?.unit_price??e?.unitPrice??0,n=Number(t);return Number.isFinite(n)?n:0}function qs(e){if(!e?.end)return!1;const t=new Date(e.end);return Number.isNaN(t.getTime())?!1:t<new Date}function gl(e=""){switch(String(e??"").trim().toLowerCase()){case"confirmed":case"مؤكد":return"confirmed";case"in_progress":case"in-progress":case"قيد التنفيذ":case"جاري":return"in_progress";case"completed":case"مكتمل":return"completed";case"cancelled":case"ملغي":return"cancelled";case"pending":case"draft":case"قيد الانتظار":case"بانتظار التأكيد":case"معلق":default:return"pending"}}function gt(e={},t=null){const n=e?.confirmed===!0||e?.confirmed==="true",a=e?.projectId??e?.project_id??null,s=a!=null&&a!==""&&a!=="null",r=s?gl(t?.status??t?.status_label??t?.statusLabel??""):null,i=s&&(t?.confirmed===!0||["confirmed","in_progress","completed"].includes(r));return{reservationConfirmed:n,projectLinked:s,projectStatus:r,projectConfirmed:i,effectiveConfirmed:s?i:n}}const Fr="projects:create:draft",Rr="projects.html#projects-section";let Fa=null,Mr=[],Ra=new Map,Ma=new Map,Kn=new Map,$a=!1,Ln=null,Js=!1,zr=[];function bl(e){if(!e)return null;let t=zr.find(a=>a.id===e)||null;if(t)return t;const n=fc(e);return n?(t={id:e,name:gc(n)||e,price:yc(n),items:cs(n),raw:n},t):null}function Qn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Gn(e){return h(String(e||"")).trim().toLowerCase()}function hl(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function Hr(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function Or(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Vr(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Ur(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function Yt(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function Ss(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function Dt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function De(){const{input:e,hidden:t}=Dt();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function xt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function Kr(e,t,{allowPartial:n=!1}={}){const a=_e(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function za(e,t={}){return Kr(Ra,e,t)}function Ha(e,t={}){return Kr(Ma,e,t)}function Fe(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function Qr(e){Mr=Array.isArray(e)?[...e]:[]}function Es(){return Mr}function xs(e){return e&&Es().find(t=>String(t.id)===String(e))||null}function Ys(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function Kt(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??it,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:it}function Oe(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??it,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=it),t.dataset.companyShare=String(s),t.checked=!0}function Oa(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if($a){oe();return}$a=!0;const a=()=>{$a=!1,oe()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(it)),t.disabled){n.checked=!1,x(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),Oe()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Oe():n.checked&&(n.checked=!1));a()}function vl(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Zs(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function er(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function st({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=Ss();if(!n||!a||!s)return;const r=os()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const d=new Set;Ra=new Map;const l=r.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:er(m)||c})).filter(m=>{if(!m.label)return!1;const f=_e(m.label);return!f||d.has(f)?!1:(d.add(f),Ra.set(f,m),!0)}).sort((m,f)=>m.label.localeCompare(f.label,void 0,{sensitivity:"base"}));s.innerHTML=l.map(m=>`<option value="${Qn(m.label)}"></option>`).join("");const u=t?"":n.value,p=e?String(e):a.value?String(a.value):"",y=p?r.find(m=>String(m.id)===p):null;if(y){const m=er(y)||c;a.value=String(y.id),n.value=m,n.dataset.selectedId=String(y.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function Qt({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=Dt();if(!a||!s||!r)return;const i=Array.isArray(t)?t:Es()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const d=[...i].filter(g=>g&&g.id!=null).sort((g,b)=>String(b.createdAt||b.start||"").localeCompare(String(g.createdAt||g.start||""))),l=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),p=new Set;Ma=new Map;const y=d.map(g=>{const b=Ys(g)||u;return{id:String(g.id),label:b}}).filter(g=>{if(!g.label)return!1;const b=_e(g.label);return!b||p.has(b)?!1:(p.add(b),Ma.set(b,g),!0)});r.innerHTML=y.map(g=>`<option value="${Qn(g.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",f=m?d.find(g=>String(g.id)===m):null;if(f){const g=Ys(f)||u;s.value=String(f.id),a.value=g,a.dataset.selectedId=String(f.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":l}function Wn(e,t,n){const{date:a,time:s}=Sr(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function Gr(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||Qt({selectedValue:a});const r=(os()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";st(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=Zs(e,"start"),d=Zs(e,"end");c&&Wn("res-start","res-start-time",c),d&&Wn("res-end","res-end-time",d);const l=document.getElementById("res-notes");l&&e.description&&(t||!l.value)&&(l.value=e.description),oe(),pt()}function Wr({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:fe(),s=Array.isArray(a)?a:[];Qr(s);const r=t!=null?String(t):n.value?String(n.value):"";Qt({selectedValue:r,projectsList:s}),pt(),oe()}function pt(){const{input:e,hidden:t}=Dt(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),d=document.getElementById("res-discount-type"),l=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),p=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(xt(n,De),a&&xt(a,De)),s&&xt(s,De),r&&xt(r,De),i&&xt(i,De),c&&xt(c,De),d&&xt(d,De),p)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=l),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=l),s&&(s.value="unpaid",Fe(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=l),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=l),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=l),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=l),d&&(d.value="percent",d.disabled=!0,d.classList.add("reservation-input-disabled"),d.title=l);else{if(n){const y=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",y&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.disabled=!1,d.classList.remove("reservation-input-disabled"),d.title="")}Oa("tax"),oe()}function ws(){const{input:e,hidden:t}=Dt();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Ha(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=xs(r.id);i?Gr(i,{skipProjectSelectUpdate:!0}):(pt(),oe())}else t.value="",e.dataset.selectedId="",pt(),oe()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Ha(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Is(){const{input:e,hidden:t}=Ss();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?za(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),oe()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?za(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function ql(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){ln({clearValue:!0});return}let n=null;try{const l=decodeURIComponent(t);n=JSON.parse(l)}catch(l){console.warn("⚠️ [reservations/createForm] Failed to decode project context",l)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),ln({clearValue:!1}),!n)return;n.fromProjectForm&&(Ln={draftStorageKey:n.draftStorageKey||Fr,returnUrl:n.returnUrl||Rr});const r=document.getElementById("res-project");if(n.projectId){r&&(Qt({selectedValue:String(n.projectId)}),pt());const l=xs(n.projectId);l?Gr(l,{forceNotes:!!n.forceNotes}):oe(),ln()}else{r&&Qt({selectedValue:""});const l=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");Ll(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),l)}n.start&&Wn("res-start","res-start-time",n.start),n.end&&Wn("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(os()||[]).find(p=>String(p.id)===String(n.customerId));u?.id!=null&&(st({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(st({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):st({selectedValue:""});const d=document.getElementById("res-notes");d&&n.description&&!d.value&&(d.value=n.description),oe()}function Ft(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:mn(e,n),end:mn(t,a)}}function Xr(e){const t=Gn(e);if(t){const c=Kn.get(t);if(c)return c}const{description:n,barcode:a}=Hr(e);if(a){const c=ia(a);if(c)return c}const s=_e(n||e);if(!s)return null;let r=Ir();if(!r?.length){const c=fe();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&Ar(r)}const i=r.find(c=>_e(c?.desc||c?.description||"")===s);return i||r.find(c=>_e(c?.desc||c?.description||"").includes(s))||null}function Jr(e,t="equipment-description-options"){const n=Gn(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(d=>Gn(d.value)===n)||Kn.has(n))return!0;const{description:s}=Hr(e);if(!s)return!1;const r=_e(s);return r?(Ir()||[]).some(c=>_e(c?.desc||c?.description||"")===r):!1}const Sl={available:0,reserved:1,maintenance:2,retired:3};function El(e){return Sl[e]??5}function tr(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function xl(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${tr(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${tr(n)})`}function ft(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=qn(),a=fe(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];Ar(r);const i=new Map;r.forEach(l=>{const u=hl(l),p=Gn(u);if(!p||!u)return;const y=yt(l),m=El(y),f=i.get(p);if(!f){i.set(p,{normalized:p,value:u,bestItem:l,bestStatus:y,bestPriority:m,statuses:new Set([y])});return}f.statuses.add(y),m<f.bestPriority&&(f.bestItem=l,f.bestStatus=y,f.bestPriority=m,f.value=u)}),Kn=new Map;const d=Array.from(i.values()).sort((l,u)=>l.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(l=>{Kn.set(l.normalized,l.bestItem);const u=xl(l),p=Qn(l.value);if(u===l.value)return`<option value="${p}"></option>`;const y=Qn(u);return`<option value="${p}" label="${y}"></option>`}).join("");e&&(e.innerHTML=d),t&&(t.innerHTML=d)}function Yr(e,t,n={}){const{silent:a=!1}=n,s=ee(e);if(!s)return{success:!1,message:null};const{start:r,end:i}=Ft();if(!r||!i){const f=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||x(f),{success:!1,message:f}}const c=Je();if(As(c).has(s)){const f=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||x(f),{success:!1,message:f}}const l=ls(s,r,i);if(l.length){const f=l.map(b=>b.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${f}`);return a||x(g),{success:!1,message:g}}if(Xe(s,r,i)){const f=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||x(f),{success:!1,message:f}}const u=ia(s);if(!u){const f=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||x(f),{success:!1,message:f}}const p=yt(u);if(p==="maintenance"||p==="retired"){const f=Yt(p);return a||x(f),{success:!1,message:f}}const y=Bt(u);if(!y){const f=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||x(f),{success:!1,message:f}}aa({id:y,equipmentId:y,barcode:s,desc:u.desc,qty:1,price:u.price,image:Ct(u)}),t&&(t.value=""),ot(),oe();const m=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||x(m),{success:!0,message:m,barcode:s}}function Va(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Xr(t);if(!n){x(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=Vc(n.barcode),s=yt(a||n);if(s==="maintenance"||s==="retired"){x(Yt(s));return}const r=ee(n.barcode);if(!r){x(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=Bt(n);if(!i){x(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Ct(n)},{start:d,end:l}=Ft();if(!d||!l){x(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=Je();if(As(u).has(r)){x(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const y=ls(r,d,l);if(y.length){const m=y.map(f=>f.name).join(", ");x(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`));return}if(Xe(r,d,l)){x(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}aa(c),ot(),oe(),x(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function wl(){ft();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Va(e))});const t=()=>{Jr(e.value,"equipment-description-options")&&Va(e)};e.addEventListener("focus",()=>{if(ft(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function nr(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function As(e=Je()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=ee(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const r=ee(s?.normalizedBarcode??s?.barcode);r&&t.add(r)})}),t}function Il(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=Ft();if(!t||!n){x(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}Dc({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):x(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(Xt.change,t=>{nr(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),nr(e,jr()))}function Al(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,r=a.length?a:t.barcode?[t.barcode]:[];if(!r.length)return;let i=0,c=null;const d=[],l=new Set;r.forEach(p=>{const y=ee(p);y&&!l.has(y)&&(l.add(y),d.push(y))});const u=Math.min(s,d.length);for(let p=0;p<u;p+=1){const y=d[p],m=Yr(y,null,{silent:!0});m.success&&(i+=1),m.message&&(c=m.message)}if(i>0){const y=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",h(String(i)));x(y)}else c&&x(c)}function Zr(){Il(),!(Js||typeof document>"u")&&(document.addEventListener(Xt.requestAdd,Al),Js=!0)}function En(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),r=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:r}}function Ua(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=En();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const r=document.getElementById("equipment-barcode"),i=document.getElementById("equipment-description"),c=t==="package";r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),Ec(t),t==="package"&&fa()}function fa(){const{packageSelect:e,packageHint:t}=En();if(!e)return;const n=qr();zr=n,mc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,r=n.map(c=>{const d=Number.isFinite(Number(c.price))?Number(c.price):0,l=h(d.toFixed(2)),u=`${c.name} — ${l} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${r}`,e.selectedIndex=0;const i=n.length>0;e.disabled=!i,t&&(i?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),ni()}function kl(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:r,blockingPackages:i})=>{const c=r?.desc||h(String(r?.barcode??r?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(i)&&i.length){const d=i.map(l=>l.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${d})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function ei(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const r=Rn(e);if(!r)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const i=bl(r);if(!i)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(m=>m?.type==="package"&&Rn(m.packageId)===r))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(pc(r,n,a,s)){const m=i.name||r;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${m} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(i.items)&&i.items.length?i.items:cs(i.raw??{}),d=As(t),l=[],u=new Set;if(c.forEach(m=>{const f=ee(m?.normalizedBarcode??m?.barcode);if(f){if(u.has(f)){l.push({item:m,type:"internal"});return}u.add(f),d.has(f)&&l.push({item:m,type:"external"})}}),l.length){const m=l.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>h(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:l.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",m):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",m),duplicates:l}}const p=[];return c.forEach(m=>{const f=ee(m?.normalizedBarcode??m?.barcode);if(f&&Xe(f,n,a,s)){const g=ls(f,n,a,s);p.push({item:m,blockingPackages:g})}}),p.length?{success:!1,reason:"item_conflict",message:kl(i,p),conflicts:p}:{success:!0,package:{id:`package::${r}`,packageId:r,type:"package",desc:i.name||`Package ${r}`,qty:1,price:Number.isFinite(Number(i.price))?Number(i.price):0,barcode:i.code||i.raw?.package_code||`pkg-${r}`,packageItems:c.map(m=>({equipmentId:m?.equipmentId??null,barcode:m?.barcode??m?.normalizedBarcode??"",normalizedBarcode:ee(m?.normalizedBarcode??m?.barcode),desc:m?.desc??"",qty:Number.isFinite(Number(m?.qty))?Number(m.qty):1,price:Number.isFinite(Number(m?.price))?Number(m.price):0})),image:c.find(m=>m?.image)?.image??null},packageInfo:i}}function ti(e,{silent:t=!1}={}){const n=Rn(e);if(!n)return t||x(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=Ft(),r=Je(),i=ei(n,{existingItems:r,start:a,end:s});if(!i.success){if(!t){const d={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[i.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");x(i.message||d)}return i}return aa(i.package),ot(),oe(),t||x(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:i.package}}function ni(){const{packageSelect:e}=En();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;ti(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function _l(){const{packageAddButton:e,packageSelect:t}=En();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){x(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}ti(n)}),e.dataset.listenerAttached="true")}function ai(){const{modeRadios:e}=En();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&Ua(s.target.value)}),a.dataset.listenerAttached="true")}),_l(),ni();const t=Mn(),n=e.find(a=>a.value===t);n&&(n.checked=!0),Ua(t)}function ot(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=Je(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),d=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const l=Lt(n);t.innerHTML=l.map(u=>{const p=u.items[0]||{},y=Ct(p)||u.image,m=y?`<img src="${y}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',f=h(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,b=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,I=`${h(g.toFixed(2))} ${s}`,v=`${h(b.toFixed(2))} ${s}`,k=u.items.some(w=>w?.type==="package"),L=u.barcodes.map(w=>h(String(w||""))).filter(Boolean),z=L.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${L.map(w=>`<li>${w}</li>`).join("")}
            </ul>
          </details>`:"";let q="";if(k){const w=new Map;if(u.items.forEach(A=>{Array.isArray(A?.packageItems)&&A.packageItems.forEach($=>{if(!$)return;const T=ee($.barcode||$.desc||Math.random()),j=w.get(T);if(j){j.qty+=Number.isFinite(Number($.qty))?Number($.qty):1;return}w.set(T,{desc:$.desc||$.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number($.qty))?Number($.qty):1,barcode:$.barcode??$.normalizedBarcode??""})})}),w.size){const A=Array.from(w.values()).map($=>{const T=h(String($.qty)),j=$.desc||h(String($.barcode||"")),N=$.barcode?` <span class="reservation-package-items__barcode">(${h(String($.barcode))})</span>`:"";return`<li>${j}${N} × ${T}</li>`}).join("");q=`
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
                ${k?`${q||""}${z||""}`:z}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${c}" ${k?"disabled":""}>−</button>
              <span class="reservation-qty-value">${f}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${i}" ${k?"disabled":""}>+</button>
            </div>
          </td>
          <td>${I}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${d}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function $l(e){const t=Je(),a=Lt(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(hc(s),ot(),oe())}function Tl(e){const t=Je(),n=t.filter(a=>Sn(a)!==e);n.length!==t.length&&(Er(n),ot(),oe())}function Pl(e){const t=Je(),a=Lt(t).find(p=>p.key===e);if(!a)return;const{start:s,end:r}=Ft();if(!s||!r){x(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(p=>ee(p.barcode))),{equipment:c=[]}=fe(),d=(c||[]).find(p=>{const y=ee(p?.barcode);return!y||i.has(y)||Sn({desc:p?.desc||p?.description||p?.name||"",price:Number(p?.price)||0})!==e||!ys(p)?!1:!Xe(y,s,r)});if(!d){x(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const l=ee(d.barcode),u=Bt(d);if(!u){x(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}aa({id:u,equipmentId:u,barcode:l,desc:d.desc||d.description||d.name||a.description||"",qty:1,price:Number.isFinite(Number(d.price))?Number(d.price):a.unitPrice,image:Ct(d)}),ot(),oe()}function oe(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),d=c?.value||"unpaid",{start:l,end:u}=Ft();i&&Oe();const p=Kt(),y=document.getElementById("res-payment-progress-type"),m=document.getElementById("res-payment-progress-value"),f=Or(y),g=Vr(m);Us({selectedItems:Je(),discount:n,discountType:s,applyTax:i,paidStatus:d,paymentProgressType:f,paymentProgressValue:g,start:l,end:u,companySharePercent:p,paymentHistory:[]});const b=Us.lastResult;b?(Ur(m,b.paymentProgressValue),c&&(c.value=b.paymentStatus,Fe(c,b.paymentStatus))):Fe(c,d)}function jl(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=h(c.target.value),oe()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",oe),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(De()){n.checked=!1,x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Oa("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(De()){a.checked=!1,x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Oa("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(De()){s.value="unpaid",Fe(s,"unpaid"),x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Fe(s),oe()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(De()){r.value="percent",x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",oe()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(De()){i.value="",x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=h(c.target.value),oe()}),i.dataset.listenerAttached="true"),oe()}function Nl(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){oe();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),oe()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function ar(){const{input:e,hidden:t}=Ss(),{input:n,hidden:a}=Dt(),{customers:s}=fe();let r=t?.value?String(t.value):"";if(!r&&e?.value){const W=za(e.value,{allowPartial:!0});W&&(r=String(W.id),t&&(t.value=r),e.value=W.label,e.dataset.selectedId=r)}const i=s.find(W=>String(W.id)===r);if(!i){x(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let d=a?.value?String(a.value):"";if(!d&&n?.value){const W=Ha(n.value,{allowPartial:!0});W&&(d=String(W.id),a&&(a.value=d),n.value=W.label,n.dataset.selectedId=d)}const l=document.getElementById("res-start").value,u=document.getElementById("res-end").value,p=document.getElementById("res-start-time")?.value||"00:00",y=document.getElementById("res-end-time")?.value||"00:00";if(!l||!u){x(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${l}T${p}`,f=`${u}T${y}`,g=new Date(m),b=new Date(f);if(Number.isNaN(g.getTime())||Number.isNaN(b.getTime())||g>=b){x(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const I=vc(),v=Je();if(v.length===0&&I.length===0){x(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const k=document.getElementById("res-notes")?.value||"",L=parseFloat(h(document.getElementById("res-discount")?.value))||0,z=document.getElementById("res-discount-type")?.value||"percent",q=document.getElementById("res-payment-status"),w=q?.value||"unpaid",A=document.getElementById("res-payment-progress-type"),$=document.getElementById("res-payment-progress-value"),T=Or(A),j=Vr($),N=d?xs(d):null,O=vl(N);if(d&&!N){x(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const W of v){const Y=yt(W.barcode);if(Y==="maintenance"||Y==="retired"){x(Yt(Y));return}}for(const W of v){const Y=ee(W.barcode);if(Xe(Y,m,f)){x(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const W of I)if(xr(W,m,f)){x(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const F=document.getElementById("res-tax"),M=document.getElementById("res-company-share"),_=!!d;_?(F&&(F.checked=!1,F.disabled=!0,F.classList.add("disabled"),F.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),M&&(M.checked=!1,M.disabled=!0,M.classList.add("disabled"),M.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),q&&(q.value="unpaid",q.disabled=!0,Fe(q,"unpaid"),q.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),A&&(A.disabled=!0,A.classList.add("disabled")),$&&($.value="",$.disabled=!0,$.classList.add("disabled"))):(F&&(F.disabled=!1,F.classList.remove("disabled"),F.title=""),M&&(M.disabled=!1,M.classList.remove("disabled"),M.title=""),q&&(q.disabled=!1,q.title=""),A&&(A.disabled=!1,A.classList.remove("disabled")),$&&($.disabled=!1,$.classList.remove("disabled")));const G=_?!1:F?.checked||!1,B=!!M?.checked;if(!_&&B!==G){x(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let P=B?Kt():null;B&&(!Number.isFinite(P)||P<=0)&&(Oe(),P=Kt());const U=B&&G&&Number.isFinite(P)&&P>0;G&&Oe();const R=ds(v,L,z,G,I,{start:m,end:f,companySharePercent:U?P:0}),H=dc(),Q=us({totalAmount:R,progressType:T,progressValue:j,history:[]});$&&Ur($,Q.paymentProgressValue);const re=[];Q.paymentProgressValue!=null&&Q.paymentProgressValue>0&&re.push({type:Q.paymentProgressType||T,value:Q.paymentProgressValue,amount:Q.paidAmount,percentage:Q.paidPercent,recordedAt:new Date().toISOString()});const ae=ms({manualStatus:w,paidAmount:Q.paidAmount,paidPercent:Q.paidPercent,totalAmount:R});q&&(q.value=ae,Fe(q,ae));const ue=wr({reservationCode:H,customerId:c,start:m,end:f,status:O?"confirmed":"pending",title:null,location:null,notes:k,projectId:d||null,totalAmount:R,discount:_?0:L,discountType:_?"percent":z,applyTax:G,paidStatus:_?"unpaid":ae,confirmed:O,items:v.map(W=>({...W,equipmentId:W.equipmentId??W.id})),technicians:I,companySharePercent:_||!U?null:P,companyShareEnabled:_?!1:U,paidAmount:_?0:Q.paidAmount,paidPercentage:_?0:Q.paidPercent,paymentProgressType:_?null:Q.paymentProgressType,paymentProgressValue:_?null:Q.paymentProgressValue,paymentHistory:_?[]:re});try{const W=await qc(ue);qn(),ft(),hn(),Bl(),x(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Fa=="function"&&Fa({type:"created",reservation:W}),Cl(W)}catch(W){console.error("❌ [reservations/createForm] Failed to create reservation",W);const Y=sa(W)?W.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");x(Y,"error"),_&&(x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),ln({clearValue:!1}))}}function Cl(e){if(!Ln)return;const{draftStorageKey:t=Fr,returnUrl:n=Rr}=Ln,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}Ln=null,n&&(window.location.href=n)}function ln({clearValue:e=!1}={}){const{input:t,hidden:n}=Dt();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,pt())}function Ll(e,t=""){const{input:n,hidden:a}=Dt();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),pt())}function Bl(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),st({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),ln({clearValue:!1}),Qt({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",Fe(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),Sc(),Er([]),Hn("form-reset"),ot(),pt(),oe()}function Dl(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){$l(s);return}if(a==="increase-group"&&s){Pl(s);return}if(a==="remove-group"&&s){Tl(s);return}}),e.dataset.listenerAttached="true")}function Fl(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(Mn()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,Yr(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||Mn()!=="single")return;const{start:r,end:i}=Ft();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function Rl(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await ar()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await ar()}),t.dataset.listenerAttached="true")}function Xu({onAfterSubmit:e}={}){Fa=typeof e=="function"?e:null;const{customers:t,projects:n}=fe();bc(t||[]),st(),Is(),Qr(n||[]),Wr({projectsList:n}),ws(),ft(),fa(),wl(),Zr(),ai(),Nl(),jl(),Dl(),Fl(),Rl(),ql(),oe(),ot()}function si(){ft(),fa(),Wr(),st(),Is(),ws(),Zr(),ai(),ot(),oe()}if(typeof document<"u"){const e=()=>{st(),Qt({projectsList:Es()}),Is(),ws(),oe()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{ft()}),document.addEventListener("packages:changed",()=>{fa(),Mn()==="package"&&Ua("package")})}typeof window<"u"&&(window.getCompanySharePercent=Kt);function ri(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:wt(t),endDate:wt(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:wt(n),endDate:wt(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:wt(n),endDate:wt(a)}}return e==="upcoming"?{startDate:wt(t),endDate:""}:{startDate:"",endDate:""}}function Ml(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=h(t?.value||"").trim(),i=h(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),Xn(t),Xn(n),r="",i=""),!r&&!i&&c){const l=ri(c);r=l.startDate,i=l.endDate}return{searchTerm:_e(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function Ju(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{zl(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),Xn(a),Xn(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function zl(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=ri(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function wt(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function Xn(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function Pn(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function Hl(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function Ol(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=Hl(n);if(a!==null)return a}return null}function sr(e,t=0){const n=Ol(e);if(n!=null)return n;const a=Pn(e.createdAt??e.created_at);if(a!=null)return a;const s=Pn(e.updatedAt??e.updated_at);if(s!=null)return s;const r=Pn(e.start);if(r!=null)return r;const i=Pn(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function Vl({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((v,k)=>({reservation:v,index:k})),i=t.searchTerm||"",c=t.searchReservationId||"",d=t.searchCustomerName||"",l=t.searchProjectId||"",u=t.startDate||"",p=t.endDate||"",y=t.status||"",m=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,f=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,b=p?new Date(`${p}T23:59:59`):null,I=r.filter(({reservation:v})=>{const k=n.get(String(v.customerId)),L=s?.get?.(String(v.projectId)),z=v.start?new Date(v.start):null,q=qs(v),{effectiveConfirmed:w}=gt(v,L);if(m!=null&&String(v.customerId)!==String(m)||f!=null&&!(Array.isArray(v.technicians)?v.technicians.map(N=>String(N)):[]).includes(String(f))||y==="confirmed"&&!w||y==="pending"&&w||y==="completed"&&!q||g&&z&&z<g||b&&z&&z>b)return!1;if(c){const j=[v.reservationId,v.id,v.reservation_id,v.reservationCode,v.reservation_code,v.code,v.reference,v.referenceNumber,v.reference_number],N=_e(j.filter(F=>F!=null&&F!=="").map(String).join(" ")).replace(/\s+/g,""),O=c.replace(/\s+/g,"");if(!N.includes(O))return!1}if(d&&!_e(k?.customerName||"").includes(d))return!1;if(l){const j=[v.projectId,v.project_id,v.projectID,L?.id,L?.projectCode,L?.project_code],N=_e(j.filter(F=>F!=null&&F!=="").map(String).join(" ")).replace(/\s+/g,""),O=l.replace(/\s+/g,"");if(!N.includes(O))return!1}if(!i)return!0;const A=v.items?.map?.(j=>`${j.barcode} ${j.desc}`).join(" ")||"",$=(v.technicians||[]).map(j=>a.get(String(j))?.name).filter(Boolean).join(" ");return _e([v.reservationId,k?.customerName,v.notes,A,$,L?.title].filter(Boolean).join(" ")).includes(i)});return I.sort((v,k)=>{const L=sr(v.reservation,v.index),z=sr(k.reservation,k.index);return L!==z?z-L:k.index-v.index}),I}function Ul({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),d=o("reservations.list.itemsCountShort","{count} عنصر"),l=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),p=o("reservations.list.status.pending","⏳ غير مؤكد"),y=o("reservations.list.payment.paid","💳 مدفوع"),m=o("reservations.list.payment.unpaid","💳 غير مدفوع"),f=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),g=o("reservations.list.actions.confirm","✔️ تأكيد"),b=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),I=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),v={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:k,index:L})=>{const z=t.get(String(k.customerId)),q=k.projectId?a?.get?.(String(k.projectId)):null,w=qs(k),A=k.paidStatus??k.paid_status??(k.paid===!0||k.paid==="paid"?"paid":"unpaid"),$=A==="paid",T=A==="partial",{effectiveConfirmed:j,projectLinked:N}=gt(k,q),O=j?"status-confirmed":"status-pending",F=$?"status-paid":T?"status-partial":"status-unpaid";let M=`<span class="reservation-chip status-chip ${O}">${j?u:p}</span>`;const _=$?y:T?f:m;let G=`<span class="reservation-chip status-chip ${F}">${_}</span>`,B=$?" tile-paid":T?" tile-partial":" tile-unpaid";w&&(B+=" tile-completed");let P="";w&&(M=`<span class="reservation-chip status-chip status-completed">${u}</span>`,G=`<span class="reservation-chip status-chip status-completed">${_}</span>`,P=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const U=!N&&!j?`<button class="tile-confirm" data-reservation-index="${L}" data-action="confirm">${g}</button>`:"",R=U?`<div class="tile-actions">${U}</div>`:"",H=k.items?.length||0,Q=(k.technicians||[]).map(ce=>n.get(String(ce))).filter(Boolean),re=Q.map(ce=>ce.name).join(l)||"—",ae=h(String(k.reservationId??"")),ue=k.start?h(Re(k.start)):"-",W=k.end?h(Re(k.end)):"-",Y=h(String(k.cost??0)),me=h(String(H)),he=k.notes?h(k.notes):c,we=d.replace("{count}",me),V=k.applyTax?`<small>${r}</small>`:"";let J=b;return k.projectId&&(J=q?.title?h(q.title):I),`
      <div class="${U?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${B}"${P} data-reservation-index="${L}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${ae}</div>
          <div class="tile-badges">
            ${M}
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
            <span class="tile-value">${J}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.start}</span>
            <span class="tile-value tile-inline">${ue}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.end}</span>
            <span class="tile-value tile-inline">${W}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.cost}</span>
            <span class="tile-value">${Y} ${s} ${V}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.equipment}</span>
            <span class="tile-value">${we}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.crew}</span>
            <span class="tile-value">${Q.length?re:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${he}</span>
          </div>
        </div>
        ${R}
      </div>
    `}).join("")}function Le(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Kl(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=gt(e,s),c=e.paid===!0||e.paid==="paid",d=qs(e),l=e.items||[],u=Lt(l),p=new Map,y=(S,X=0)=>{if(!S||typeof S!="object")return;const le=Rn(S?.package_code??S?.packageId??S?.package_id??S?.code??S?.id??S?.barcode??`pkg-${X}`)||`pkg-${X}`;p.has(le)||p.set(le,{source:S,normalizedId:le,index:X})};Array.isArray(e.packages)&&e.packages.forEach((S,X)=>y(S,X)),l.forEach((S,X)=>{S&&typeof S=="object"&&(S.type==="package"||Array.isArray(S?.packageItems))&&y(S,X)});const m=[],f=new Set,g=new Set;p.forEach(({source:S,normalizedId:X},ge)=>{const le=cs(S).map(pe=>({...pe,normalizedBarcode:pe?.normalizedBarcode??ee(pe?.barcode),qty:Number.isFinite(Number(pe?.qty))?Number(pe.qty):1}));le.forEach(pe=>{const Ve=pe?.normalizedBarcode??ee(pe?.barcode);Ve&&f.add(Ve),pe?.equipmentId!=null?g.add(String(pe.equipmentId)):pe?.equipment_id!=null&&g.add(String(pe.equipment_id))});const Ae=Number.isFinite(Number(S?.quantity??S?.qty??S?.count))?Number(S.quantity??S.qty??S.count):1,Te=Number.isFinite(Number(S?.unit_price??S?.price??S?.unitPrice))?Number(S.unit_price??S.price??S.unitPrice):0,zt=le.reduce((pe,Ve)=>{const In=Number.isFinite(Number(Ve?.price))?Number(Ve.price):0,Ia=Number.isFinite(Number(Ve?.qty))?Number(Ve.qty):1;return pe+In*Ia},0),tn=Number.isFinite(Number(S?.total??S?.total_price??S?.totalPrice))?Number(S.total??S.total_price??S.totalPrice):Te?Te*Ae:zt,wn=Ae>0?tn/Ae:Te,Ht=S?.package_code??S?.packageId??S?.package_id??S?.barcode??null;if(Ht){const pe=ee(Ht);pe&&f.add(pe)}const wa=le.map(pe=>h(String(pe?.barcode??pe?.normalizedBarcode??""))).filter(Boolean);m.push({key:`package::${ge}`,description:S?.name||S?.package_name||S?.title||h(String(Ht??ge)),normalizedDescription:h(String(S?.name||S?.package_name||"")),unitPrice:wn,totalPrice:tn,quantity:Ae,count:Ae,image:le.find(pe=>pe?.image)?.image??null,barcodes:wa,items:[{type:"package",packageItems:le,packageId:X,desc:S?.name||S?.package_name||"",price:wn,qty:Ae,barcode:Ht}]})});const b=new Set(Array.from(f).map(S=>ee(S)).filter(Boolean)),I=u.filter(S=>!(S.items.some(le=>le?.type==="package")&&m.length>0||S.items.every(le=>{const Ae=Bt(le),Te=Ae!=null?String(Ae):null;if(Te&&g.has(Te))return!0;const zt=le?.barcode?ee(le.barcode):null;return!!(zt&&b.has(zt))}))),v=m.length?[...m,...I]:u,{technicians:k=[]}=fe(),L=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(k)?k:[]),z=new Map;L.forEach(S=>{if(!S||S.id==null)return;const X=String(S.id),ge=z.get(X)||{};z.set(X,{...ge,...S})});const q=(e.technicians||[]).map(S=>z.get(String(S))).filter(Boolean),w=Nt(),A=ra(e.start,e.end),$=(S={})=>{const X=[S.dailyWage,S.daily_rate,S.dailyRate,S.wage,S.rate];for(const ge of X){if(ge==null)continue;const le=parseFloat(h(String(ge)));if(Number.isFinite(le))return le}return 0},T=(S={})=>{const X=[S.dailyTotal,S.daily_total,S.totalRate,S.total,S.total_wage];for(const ge of X){if(ge==null)continue;const le=parseFloat(h(String(ge)));if(Number.isFinite(le))return le}return $(S)},N=l.reduce((S,X)=>S+(X.qty||1)*(X.price||0),0)*A,O=q.reduce((S,X)=>S+$(X),0),F=q.reduce((S,X)=>S+T(X),0),M=O*A,_=F*A,G=N+_,B=parseFloat(e.discount)||0,P=e.discountType==="amount"?B:G*(B/100),U=Math.max(0,G-P),R=r?!1:e.applyTax,H=Number(e.cost),Q=Number.isFinite(H),re=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,ae=re!=null?parseFloat(h(String(re))):NaN;let Y=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(ae)&&ae>0)&&Number.isFinite(ae)?ae:0;R&&Y<=0&&(Y=it);let me=Y>0?Math.max(0,U*(Y/100)):0;const he=U+me,we=R?he*.15:0,V=Number.isFinite(we)&&we>0?Number(we.toFixed(2)):0,J=he+V,te=Number.isFinite(J)?Number(J.toFixed(2)):0,ce=r?te:Q?H:te;Y>0&&(me=Number(Math.max(0,U*(Y/100)).toFixed(2)));const Ce=h(String(e.reservationId??e.id??"")),qt=e.start?h(Re(e.start)):"-",Z=e.end?h(Re(e.end)):"-",be=h(String(q.length)),D=h(N.toFixed(2)),ie=h(P.toFixed(2)),Ie=h(U.toFixed(2)),qe=h(V.toFixed(2)),de=h((Number.isFinite(ce)?ce:0).toFixed(2)),$e=h(String(A)),ye=o("reservations.create.summary.currency","SR"),Ze=o("reservations.details.labels.discount","الخصم"),ct=o("reservations.details.labels.tax","الضريبة (15%)"),Mt=o("reservations.details.labels.crewTotal","إجمالي الفريق"),ne=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),xe=o("reservations.details.labels.duration","عدد الأيام"),St=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),ro=o("reservations.details.labels.netProfit","💵 صافي الربح"),io=o("reservations.create.equipment.imageAlt","صورة"),et={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},oo=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),co=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),lo=o("reservations.details.technicians.roleUnknown","غير محدد"),uo=o("reservations.details.technicians.phoneUnknown","غير متوفر"),mo=o("reservations.details.technicians.wage","{amount} {currency} / اليوم"),po=o("reservations.list.status.confirmed","✅ مؤكد"),fo=o("reservations.list.status.pending","⏳ غير مؤكد"),yo=o("reservations.list.payment.paid","💳 مدفوع"),go=o("reservations.list.payment.unpaid","💳 غير مدفوع"),bo=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),ho=o("reservations.list.status.completed","📁 منتهي"),vo=o("reservations.details.labels.id","🆔 رقم الحجز"),qo=o("reservations.details.section.bookingInfo","بيانات الحجز"),So=o("reservations.details.section.paymentSummary","ملخص الدفع"),Eo=o("reservations.details.labels.finalTotal","المجموع النهائي"),xo=o("reservations.details.section.crew","😎 الفريق الفني"),wo=o("reservations.details.crew.count","{count} عضو"),Io=o("reservations.details.section.items","📦 المعدات المرتبطة"),Ao=o("reservations.details.items.count","{count} عنصر"),ko=o("reservations.details.actions.edit","✏️ تعديل"),_o=o("reservations.details.actions.delete","🗑️ حذف"),$o=o("reservations.details.labels.customer","العميل"),To=o("reservations.details.labels.contact","رقم التواصل"),Po=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const jo=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),No=o("reservations.details.actions.openProject","📁 فتح المشروع"),Co=o("reservations.details.labels.start","بداية الحجز"),Lo=o("reservations.details.labels.end","نهاية الحجز"),Bo=o("reservations.details.labels.notes","ملاحظات"),Do=o("reservations.list.noNotes","لا توجد ملاحظات"),Fo=o("reservations.details.labels.itemsCount","عدد المعدات"),Ro=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),Mo=o("reservations.paymentHistory.title","سجل الدفعات"),zo=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Ho=o("reservations.list.unknownCustomer","غير معروف"),Ea=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),Ms=Ea==="partial",Oo=Ea==="paid"?yo:Ms?bo:go,Vo=u.reduce((S,X)=>S+(Number(X.quantity)||0),0),Uo=h(String(Vo)),zs=Ao.replace("{count}",Uo),Ko=wo.replace("{count}",be),Qo=e.notes?h(e.notes):Do,Go=h(_.toFixed(2)),Wo=h(String(Y)),Xo=h(me.toFixed(2)),Jo=`${Wo}% (${Xo} ${ye})`,Yo=Math.max(0,N+_-P),Hs=Math.max(0,Yo-M),Zo=h(Hs.toFixed(2)),lt=[{icon:"💼",label:Ro,value:`${D} ${ye}`}];lt.push({icon:"😎",label:Mt,value:`${Go} ${ye}`}),P>0&&lt.push({icon:"💸",label:Ze,value:`${ie} ${ye}`}),lt.push({icon:"📊",label:ne,value:`${Ie} ${ye}`}),R&&V>0&&lt.push({icon:"🧾",label:ct,value:`${qe} ${ye}`}),Y>0&&lt.push({icon:"🏦",label:St,value:Jo}),Math.abs(Hs-(ce??0))>.009&&lt.push({icon:"💵",label:ro,value:`${Zo} ${ye}`}),lt.push({icon:"💰",label:Eo,value:`${de} ${ye}`});const ec=lt.map(({icon:S,label:X,value:ge})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${S} ${X}</span>
      <span class="summary-details-value">${ge}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let en=[];Array.isArray(e.paymentHistory)?en=e.paymentHistory:Array.isArray(e.payment_history)&&(en=e.payment_history);const tc=Array.isArray(e.paymentLogs)?e.paymentLogs:[],Os=Array.isArray(en)&&en.length>0?en:tc,nc=Os.length?`<ul class="reservation-payment-history-list">${Os.map(S=>{const X=S?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):S?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),ge=Number.isFinite(Number(S?.amount))&&Number(S.amount)>0?`${h(Number(S.amount).toFixed(2))} ${ye}`:"—",le=Number.isFinite(Number(S?.percentage))&&Number(S.percentage)>0?`${h(Number(S.percentage).toFixed(2))}%`:"—",Ae=S?.recordedAt?h(Re(S.recordedAt)):"—",Te=S?.note?`<div class="payment-history-note">${Le(h(S.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${Le(X)}</span>
              <span class="payment-history-entry__amount">${ge}</span>
              <span class="payment-history-entry__percent">${le}</span>
              <span class="payment-history-entry__date">${Ae}</span>
            </div>
            ${Te}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${Le(zo)}</div>`,Vs=[{text:i?po:fo,className:i?"status-confirmed":"status-pending"},{text:Oo,className:Ea==="paid"?"status-paid":Ms?"status-partial":"status-unpaid"}];d&&Vs.push({text:ho,className:"status-completed"});const ac=Vs.map(({text:S,className:X})=>`<span class="status-chip ${X}">${S}</span>`).join(""),Et=(S,X,ge)=>`
    <div class="res-info-row">
      <span class="label">${S} ${X}</span>
      <span class="value">${ge}</span>
    </div>
  `;let xa="";if(e.projectId){let S=Le(jo);if(s){const X=s.title||o("projects.fallback.untitled","مشروع بدون اسم");S=`${Le(X)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${Le(No)}</button>`}xa=`
      <div class="res-info-row">
        <span class="label">📁 ${Po}</span>
        <span class="value">${S}</span>
      </div>
    `}const tt=[];tt.push(Et("👤",$o,t?.customerName||Ho)),tt.push(Et("📞",To,t?.phone||"—")),tt.push(Et("🗓️",Co,qt)),tt.push(Et("🗓️",Lo,Z)),tt.push(Et("📦",Fo,zs)),tt.push(Et("⏱️",xe,$e)),tt.push(Et("📝",Bo,Qo)),xa&&tt.push(xa);const sc=tt.join(""),rc=v.length?v.map(S=>{const X=S.items[0]||{},ge=Ct(X)||S.image,le=ge?`<img src="${ge}" alt="${io}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',Ae=S.items.some(Ue=>Ue?.type==="package"),Te=Number(S.quantity)||Number(S.count)||0,zt=h(String(Te)),tn=Number.isFinite(Number(S.unitPrice))?Number(S.unitPrice):0,wn=Number.isFinite(Number(S.totalPrice))?Number(S.totalPrice):tn*Te,Ht=`${h(tn.toFixed(2))} ${ye}`,wa=`${h(wn.toFixed(2))} ${ye}`,pe=S.barcodes.map(Ue=>h(String(Ue||""))).filter(Boolean),Ve=pe.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${pe.map(Ue=>`<li>${Ue}</li>`).join("")}
              </ul>
            </details>`:"";let In="";if(Ae){const Ue=new Map;if(S.items.forEach(An=>{Array.isArray(An?.packageItems)&&An.packageItems.forEach(ke=>{if(!ke)return;const kn=ee(ke.barcode||ke.normalizedBarcode||ke.desc||Math.random()),_n=Ue.get(kn),$n=Number.isFinite(Number(ke.qty))?Number(ke.qty):1;if(_n){_n.qty+=$n;return}Ue.set(kn,{desc:ke.desc||ke.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:$n,barcode:ke.barcode??ke.normalizedBarcode??""})})}),Ue.size){const An=Array.from(Ue.values()).map(ke=>{const kn=h(String(ke.qty)),_n=Le(ke.desc||""),$n=ke.barcode?` <span class="reservation-package-items__barcode">(${Le(h(String(ke.barcode)))})</span>`:"";return`<li>${_n}${$n} × ${kn}</li>`}).join("");In=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${An}
                </ul>
              </details>
            `}}const Ia=Ae?`${In||""}${Ve||""}`:Ve;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${le}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${Le(X.desc||X.description||X.name||S.description||"-")}</div>
                  ${Ia}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Le(et.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${zt}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Le(et.unitPrice)}">${Ht}</td>
            <td class="reservation-modal-items-table__cell" data-label="${Le(et.total)}">${wa}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${Le(et.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${oo}</td></tr>`,ic=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${et.item}</th>
            <th>${et.quantity}</th>
            <th>${et.unitPrice}</th>
            <th>${et.total}</th>
            <th>${et.actions}</th>
          </tr>
        </thead>
        <tbody>${rc}</tbody>
      </table>
    </div>
  `,oc=q.map((S,X)=>{const ge=h(String(X+1)),le=S.role||lo,Ae=S.phone||uo,Te=S.wage?mo.replace("{amount}",h(String(S.wage))).replace("{currency}",ye):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${ge}</span>
          <span class="technician-name">${S.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${le}</div>
          <div>📞 ${Ae}</div>
          ${Te?`<div>💰 ${Te}</div>`:""}
        </div>
      </div>
    `}).join(""),cc=q.length?`<div class="reservation-technicians-grid">${oc}</div>`:`<ul class="reservation-modal-technicians"><li>${co}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${vo}</span>
          <strong>${Ce}</strong>
        </div>
        <div class="status-chips">
          ${ac}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${qo}</h6>
          ${sc}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${So}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${ec}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Mo}</h6>
              ${nc}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${xo}</span>
          <span class="count">${Ko}</span>
        </div>
        ${cc}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Io}</span>
          <span class="count">${zs}</span>
        </div>
        ${ic}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${ko}</button>
        ${w?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${_o}</button>`:""}
      </div>
    </div>
  `}const Yu="project",Zu="editProject",em=3600*1e3,ii=.15,tm=6,nm="projectsTab",am="projectsSubTab",sm={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},rm={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},im={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},Ql=`@page {
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
`,Gl=/color\([^)]*\)/gi,pn=/(color\(|color-mix\(|oklab|oklch)/i,Wl=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"],Xl=typeof document<"u"?document.createElement("canvas"):null,jn=Xl?.getContext?.("2d")||null;function oi(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function Ka(e,t="#000"){if(!jn||!e)return t;try{return jn.fillStyle="#000",jn.fillStyle=e,jn.fillStyle||t}catch{return t}}function Jl(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&pn.test(n)){const s=Ka(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function Ot(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function om(e=[]){if(!(!Array.isArray(e)||!e.length))for(let t=e.length-1;t>=0;t-=1){const{element:n,prop:a,value:s,priority:r}=e[t]||{};!n?.style||!a||(s&&s.length>0?n.style.setProperty(a,s,r||""):n.style.removeProperty(a))}}function ci(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;Wl.forEach(c=>{const d=r[c];if(d&&pn.test(d)){const l=oi(c);Ot(n,s,l);const u=c==="backgroundColor"?"#ffffff":r.color||"#000000",p=Ka(d,u);s.style.setProperty(l,p,"important")}});const i=r.backgroundImage;if(i&&pn.test(i)){const c=Ka(r.backgroundColor||"#ffffff","#ffffff");Ot(n,s,"background-image"),Ot(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function li(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(c=>{const d=r[c];if(d&&pn.test(d)){const l=oi(c);Ot(n,s,l);const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(l,u,"important")}});const i=r.backgroundImage;i&&pn.test(i)&&(Ot(n,s,"background-image"),Ot(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function di(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(Gl,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const ui="reservations.quote.sequence",rr={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},mi="https://help.artratio.sa/guide/quote-preview",Ee={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Yl=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Be=[...Yl],Zl=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function Qa(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...Be]}function ed(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=Qa(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=Qa(t.value);if(a.length)return a}const n=Be.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...Be]}const td=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],pi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>E(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>E(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>E(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>E(h(Number(e?.price||0).toFixed(2)))}],fi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>E(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>E(e?.role||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>E(e?.phone||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Ga={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:pi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:fi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},yi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>E(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>E(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>E(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],gi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>E(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>E(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>E(e?.note||"-")}],bi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>E(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>E(h(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>E(h(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>E(e?.displayCost||"—")}],nd=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],ad={customerInfo:Ga.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:Ga.payment,projectExpenses:gi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:yi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:bi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},Ta=new Map;function ya(e="reservation"){if(Ta.has(e))return Ta.get(e);const t=e==="project"?nd:td,n=e==="project"?ad:Ga,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(d=>d.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return Ta.set(e,r),r}function ga(e="reservation"){return ya(e).sectionDefs}function hi(e="reservation"){return ya(e).fieldDefs}function vi(e="reservation"){return ya(e).sectionIdSet}function qi(e="reservation"){return ya(e).fieldIdMap}function Si(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const sd="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",rd="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",id="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",Ei=Ql.trim(),xi=/^data:image\/svg\+xml/i,od=/\.svg($|[?#])/i,on=512,Wa="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",wi=96,Ii=25.4,Xa=210,Bn=297,Dn=Math.round(Xa/Ii*wi),Fn=Math.round(Bn/Ii*wi),cd=2,Ai=/safari/i,ld=/(iphone|ipad|ipod)/i,ir=/(iphone|ipad|ipod)/i,dd=/(crios|fxios|edgios|opios)/i,Jn="[reservations/pdf]";let K=null,C=null,Qe=1,an=null,sn=null,ut=null,Vt=null,dn=!1;function $t(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!K?.statusIndicator||!K?.statusText)return;K.statusKind=e;const r=t||Si(e);K.statusText.textContent=r,K.statusSpinner&&(K.statusSpinner.hidden=!s),K.statusAction&&(K.statusAction.hidden=!0,K.statusAction.onclick=null,n&&typeof a=="function"&&(K.statusAction.textContent=n,K.statusAction.hidden=!1,K.statusAction.onclick=i=>{i.preventDefault(),a()})),K.statusIndicator.hidden=!1,requestAnimationFrame(()=>{K.statusIndicator.classList.add("is-visible")})}function un(e){!K?.statusIndicator||!K?.statusText||(K.statusKind=null,K.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{K?.statusIndicator&&(K.statusIndicator.hidden=!0,K.statusAction&&(K.statusAction.hidden=!0,K.statusAction.onclick=null),K.statusSpinner&&(K.statusSpinner.hidden=!1))},220))}function Ja(){return!!window?.bootstrap?.Modal}function ud(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),ut||(ut=document.createElement("div"),ut.className="modal-backdrop fade show",ut.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(ut)),Vt||(Vt=t=>{t.key==="Escape"&&Ya(e)},document.addEventListener("keydown",Vt));try{e.focus({preventScroll:!0})}catch{}}}function Ya(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),ut&&(ut.remove(),ut=null),Vt&&(document.removeEventListener("keydown",Vt),Vt=null))}function md(e){if(e){if(Ja()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}ud(e)}}function pd(){if(dn)return;dn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!K?.modal?.classList.contains("show"),s=()=>{K?.modal?.classList.contains("show")&&($t("render"),dn=!1,Rt())};vr({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:mi}),a&&$t("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function ba(e="reservation"){const t={},n=hi(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function ks(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function fd(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function _s(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function $s(e="reservation"){return Object.fromEntries(ga(e).map(({id:t})=>[t,!1]))}function Ts(e,t){return e.sectionExpansions||(e.sectionExpansions=$s(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function yd(e,t){return Ts(e,t)?.[t]!==!1}function Ps(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function gd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return ld.test(e)}function bd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=Ai.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function ki(){return gd()&&bd()}function ha(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=ir.test(e)||ir.test(t),s=/Macintosh/i.test(e)&&n>1;return Ai.test(e)&&!dd.test(e)&&(a||s)}function Pa(e,...t){try{console.log(`${Jn} ${e}`,...t)}catch{}}function rt(e,...t){try{console.warn(`${Jn} ${e}`,...t)}catch{}}function hd(e,t,...n){try{t?console.error(`${Jn} ${e}`,t,...n):console.error(`${Jn} ${e}`,...n)}catch{}}function ve(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function vd(e,t="لا توجد بيانات للعرض."){const n=E(o(e,t));return ve(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Yn(e,t){return Array.isArray(e)&&e.length?e:[vd(t)]}const qd=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function _i(e=""){return qd.test(e)}function Sd(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!_i(r))return a.call(this,r,...i);let c,d=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),d=!0)}catch{}try{if(!d){const l=this.canvas;l&&l.style?.direction!=="rtl"&&(l.__artRatioOriginalDirection=l.style.direction,l.style.direction="rtl")}return a.call(this,r,...i)}finally{if(d&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!d){const l=this.canvas;l&&l.__artRatioOriginalDirection!==void 0&&(l.style.direction=l.__artRatioOriginalDirection,delete l.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function or(e,t=on){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Ed(e){if(!e)return{width:on,height:on};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?or(t,0):0,s=n?or(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,d]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(d)&&d>0?d:0)}}return{width:a||on,height:s||on}}function $i(e=""){return typeof e!="string"?!1:xi.test(e)||od.test(e)}function xd(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function wd(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function Ti(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await wd(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),d=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=d;const l=i.getContext("2d");return l.clearRect(0,0,c,d),l.drawImage(r,0,0,c,d),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function Id(e){if(!e)return null;if(xi.test(e))return xd(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Ad(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!$i(t))return!1;const n=await Id(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",Wa),!1;const a=await Ti(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",Wa),!1)}async function kd(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Ed(e),s=await Ti(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||Wa),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),d=e.getAttribute("height");return c&&i.setAttribute("width",c),d&&i.setAttribute("height",d),e.parentNode?.replaceChild(i,e),!!s}async function Pi(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{$i(s.getAttribute?.("src"))&&a.push(Ad(s))}),n.forEach(s=>{a.push(kd(s))}),a.length&&await Promise.allSettled(a)}function _d(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(P,U=0)=>{const R=parseFloat(P);return Number.isFinite(R)?R:U},i=r(s.paddingTop),c=r(s.paddingBottom),d=r(s.paddingRight),l=r(s.paddingLeft),u=r(s.borderRadius),p=r(s.fontSize,14),y=(()=>{const P=s.lineHeight;if(!P||P==="normal")return p*1.6;const U=r(P,p*1.6);return U>0?U:p*1.6})(),m=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(m<=0)return null;const f=Math.max(1,m-l-d),g=e.textContent||"",b=g.split(/\r?\n/),I=n.createElement("canvas"),v=I.getContext("2d");if(!v)return null;const k=s.fontStyle||"normal",L=s.fontVariant||"normal",z=s.fontWeight||"400",q=s.fontFamily||"sans-serif",w=s.fontStretch||"normal",A=P=>P.join(" "),$=[],T=P=>v.measureText(P).width;v.font=`${k} ${L} ${z} ${w} ${p}px ${q}`,b.forEach(P=>{const U=P.trim();if(U.length===0){$.push("");return}const R=U.split(/\s+/);let H=[];R.forEach((Q,re)=>{const ae=Q.trim();if(!ae)return;const ue=A(H.concat(ae));if(T(ue)<=f||H.length===0){H.push(ae);return}$.push(A(H)),H=[ae]}),H.length&&$.push(A(H))}),$.length||$.push("");const j=i+c+$.length*y,N=Math.ceil(Math.max(1,m)*t),O=Math.ceil(Math.max(1,j)*t);I.width=N,I.height=O,I.style.width=`${Math.max(1,m)}px`,I.style.height=`${Math.max(1,j)}px`,v.scale(t,t);const F=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){v.save(),v.beginPath();const P=Math.max(1,m),U=Math.max(1,j),R=Math.min(u,P/2,U/2);v.moveTo(R,0),v.lineTo(P-R,0),v.quadraticCurveTo(P,0,P,R),v.lineTo(P,U-R),v.quadraticCurveTo(P,U,P-R,U),v.lineTo(R,U),v.quadraticCurveTo(0,U,0,U-R),v.lineTo(0,R),v.quadraticCurveTo(0,0,R,0),v.closePath(),v.clip()}if(v.fillStyle=F,v.fillRect(0,0,Math.max(1,m),Math.max(1,j)),v.font=`${k} ${L} ${z} ${w} ${p}px ${q}`,v.fillStyle=s.color||"#000000",v.textBaseline="top",v.textAlign="right","direction"in v)try{v.direction="rtl"}catch{}const M=Math.max(0,m-d);let _=i;$.forEach(P=>{const U=P.length?P:" ";v.fillText(U,M,_,f),_+=y});const G=n.createElement("img");let B;try{B=I.toDataURL("image/png")}catch(P){return rt("note canvas toDataURL failed",P),null}return G.src=B,G.alt=g,G.style.width=`${Math.max(1,m)}px`,G.style.height=`${Math.max(1,j)}px`,G.style.display="block",G.setAttribute("data-quote-note-image","true"),{image:G,canvas:I,totalHeight:j,width:m}}function $d(e,{pixelRatio:t=1}={}){if(!e||!ha())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!_i(a.textContent||""))return;let s;try{s=_d(a,{pixelRatio:t})}catch(r){rt("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function Za(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){hd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),d=o("reservations.quote.toast.retry","إعادة المحاولة"),l=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?($t("export"),Oi()):($t("render"),dn=!1,Rt())};if(vr({message:i,duration:9e3,actionLabel:l?d:void 0,onAction:l?u:void 0,linkLabel:c,linkHref:mi}),K?.modal?.classList.contains("show")&&$t("error",{message:i,actionLabel:l?d:void 0,onAction:l?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function es({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){rt("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){rt("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function js(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function cr(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function lr(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function Td(){const e=lr();return e||(sn||(sn=js(rd).catch(t=>{throw sn=null,t}).then(()=>{const t=lr();if(!t)throw sn=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),sn)}async function Pd(){const e=cr();return e||(an||(an=js(id).catch(t=>{throw an=null,t}).then(()=>{const t=cr();if(!t)throw an=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),an)}async function jd(){if(window.html2pdf||await js(sd),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}Jl(),Sd()}function E(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Nd(e="reservation"){return e==="project"?"QP":"Q"}function Cd(e,t="reservation"){const n=Number(e),a=Nd(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function Ld(){const e=window.localStorage?.getItem?.(ui),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function ji(e="reservation"){const n=Ld()+1;return{sequence:n,quoteNumber:Cd(n,e)}}function Bd(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(ui,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function Ni(e="reservation"){return rr[e]||rr.reservation}function Dd(e="reservation"){try{const t=Ni(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function Fd(e,t="reservation"){try{const n=Ni(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function Rd(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function Md(e,t="reservation"){if(!e)return null;const n=vi(t),a=qi(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,d])=>{const l=i[c];if(l==null)return;const{ids:u,emptyExplicitly:p}=Rd(l);if(!u&&!p)return;const y=Array.isArray(u)?u.filter(m=>d.has(m)):[];(y.length>0||p)&&(r[c]=y)}),{version:1,sections:s,fields:r}}function Ci(e){if(!e)return;const t=e.context||"reservation",n=Md(e,t);n&&Fd(n,t)}function Li(e){if(!e)return;const t=e.context||"reservation",n=Dd(t);if(!n)return;const a=vi(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=ks(e.fields||ba(t)),i=qi(t);Object.entries(n.fields).forEach(([c,d])=>{const l=i[c];if(!l)return;const u=Array.isArray(d)?d.filter(p=>l.has(p)):[];r[c]=new Set(u)}),e.fields=r}}function Bi(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function Di(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return 0}function zd(e={}){const t=[e.dailyTotal,e.daily_total,e.totalRate,e.total,e.total_wage];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return Di(e)}function Hd(e){const t=hn()||[],{technicians:n=[]}=fe(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const i=String(r.id),c=s.get(i)||{};s.set(i,{...c,...r})}),(e.technicians||[]).map(r=>s.get(String(r))).filter(Boolean)}function Od(e,t,n){const{projectLinked:a}=gt(e,n),s=ra(e.start,e.end),c=(Array.isArray(e.items)?e.items:[]).reduce((B,P)=>B+(Number(P?.qty)||1)*(Number(P?.price)||0),0)*s,d=t.reduce((B,P)=>B+Di(P),0),l=t.reduce((B,P)=>B+zd(P),0),u=d*s,p=l*s,y=c+p,m=parseFloat(e.discount)||0,f=e.discountType==="amount"?m:y*(m/100),g=Math.max(0,y-f),b=a?!1:e.applyTax,I=Number(e.cost),v=Number.isFinite(I),k=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,L=k!=null?parseFloat(h(String(k).replace("%","").trim())):NaN,z=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let w=(z!=null?z===!0||z===1||z==="1"||String(z).toLowerCase()==="true":Number.isFinite(L)&&L>0)&&Number.isFinite(L)?Number(L):0;b&&w<=0&&(w=it);let A=w>0?Math.max(0,g*(w/100)):0;A=Number(A.toFixed(2));const $=g+A;let T=b?$*.15:0;(!Number.isFinite(T)||T<0)&&(T=0),T=Number(T.toFixed(2));const j=$+T,N=Number.isFinite(j)?Number(j.toFixed(2)):0,O=a?N:v?I:N,F=Math.max(0,c+p-f),M=Math.max(0,F-u),_={equipmentTotal:c,crewTotal:p,crewCostTotal:u,discountAmount:f,subtotalAfterDiscount:g,taxableAmount:$,taxAmount:T,finalTotal:O,companySharePercent:w,companyShareAmount:A,netProfit:M},G={equipmentTotal:h(c.toFixed(2)),crewTotal:h(p.toFixed(2)),discountAmount:h(f.toFixed(2)),subtotalAfterDiscount:h(g.toFixed(2)),taxableAmount:h($.toFixed(2)),taxAmount:h(T.toFixed(2)),finalTotal:h(O.toFixed(2)),companySharePercent:h(w.toFixed(2)),companyShareAmount:h(A.toFixed(2)),netProfit:h(M.toFixed(2))};return{totals:_,totalsDisplay:G,rentalDays:s}}function Gt(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function Fi(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Vd(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=Gt(e.amount??(n==="amount"?e.value:null)),s=Gt(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=Fi(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function Ud(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(Vd).filter(Boolean);if(n.length>0)return n;const a=Gt(e.paidPercent??e.paid_percent),s=Gt(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Fi(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function Kd(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function Qd(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function Gd(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function Wd(e){const t=Number(e?.equipmentEstimate)||0,n=Gd(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const d=Math.max(0,a-c),l=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,p=l&&s&&u>0?u:0,y=p>0?Number((d*(p/100)).toFixed(2)):0,m=d+y;let f=s?m*ii:0;(!Number.isFinite(f)||f<0)&&(f=0),f=Number(f.toFixed(2));let g=s?Number(e?.totalWithTax):m;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((m+f).toFixed(2))):g=m,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:d,companyShareAmount:y,subtotal:m,applyTax:s,taxAmount:f,totalWithTax:g}}function Xd(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.technicians)?e.technicians:[],i=ds(t,a,s,!1,r,{start:e.start,end:e.end});if(Number.isFinite(i))return i;const c=Number(h(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function Jd(e,t){if(!e)return"—";const n=Re(e);return t?`${n} - ${Re(t)}`:n}function se(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${h(a.toFixed(s))} ${t}`}function dr(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function Yd(e){if(!e?.start)return null;if(!e?.end)return 1;const t=ra(e.start,e.end);return Number.isFinite(t)?t:1}function Zd(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function eu(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=fe(),i=e?.id!=null?s.find(D=>String(D.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:se(0,t),expensesTotal:se(0,t),reservationsTotal:se(0,t),discountAmount:se(0,t),taxAmount:se(0,t),overallTotal:se(0,t),paidAmount:se(0,t),remainingAmount:se(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:se(0,t),remainingAmountDisplay:se(0,t),paidPercentDisplay:dr(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const d=i.clientId??i.customerId??i.client_id??i.customer_id??null,l=d!=null&&n.find(D=>String(D.id)===String(d))||null,u=l?.customerName??l?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),p=(i.clientCompany||l?.companyName||l?.company||"").trim(),y=l?.phone??l?.customerPhone??i.clientPhone??i.customerPhone??"",m=y?h(String(y).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),f=l?.email??i.clientEmail??i.customerEmail??"",g=f?String(f).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),b=i.projectCode||`PRJ-${h(String(i.id??""))}`,I=h(String(b)),v=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),k=Kd(i.type),L=i.start?Re(i.start):"—",z=i.end?Re(i.end):"—",q=Yd(i),w=q!=null?Zd(q):"غير محدد",A=Qd(i),$={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},T=o(`projects.status.${A}`,$[A]||A),j=i.id!=null?String(i.id):null,N=j?a.filter(D=>String(D.projectId)===j):[],F=N.map(D=>{const ie=D.reservationId||D.id||"",Ie=D.status||D.state||"pending",qe=String(Ie).toLowerCase(),de=o(`reservations.status.${qe}`,qe),$e=Xd(D),ye=D.start?new Date(D.start).getTime():0;return{reservationId:h(String(ie||"-")),status:qe,statusLabel:de,total:$e,totalLabel:se($e,t),dateRange:Jd(D.start,D.end),startTimestamp:Number.isNaN(ye)?0:ye}}).sort((D,ie)=>ie.startTimestamp-D.startTimestamp).map(({startTimestamp:D,...ie})=>ie).reduce((D,ie)=>D+(Number(ie.total)||0),0),M=new Map;N.forEach(D=>{const ie=Array.isArray(D.items)?D.items:[],Ie=ra(D.start,D.end),qe=D.reservationId||D.id||"";ie.forEach((de,$e)=>{if(!de)return;const ye=de.barcode||de.code||de.id||de.desc||de.description||`item-${$e}`,Ze=String(ye||`item-${$e}`),ct=M.get(Ze)||{description:de.desc||de.description||de.name||de.barcode||`#${h(String($e+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},Mt=Number(de.qty)||1,ne=Number(de.price)||0;ct.totalQuantity+=Mt,ct.reservationIds.add(String(qe));const xe=ne*Mt*Math.max(1,Ie);Number.isFinite(xe)&&(ct.totalCost+=xe),M.set(Ze,ct)})});const _=Array.from(M.values()).map(D=>({description:D.description,totalQuantity:D.totalQuantity,reservationsCount:D.reservationIds.size,displayCost:se(D.totalCost,t)})),G=new Map((r||[]).filter(Boolean).map(D=>[String(D.id),D])),B=new Map,P=D=>{if(!D)return;let ie=null;typeof D=="object"?ie=D.id??D.technicianId??D.technician_id??D.userId??D.user_id??null:(typeof D=="string"||typeof D=="number")&&(ie=D);const Ie=ie!=null?String(ie):null,qe=Ie&&G.has(Ie)?G.get(Ie):typeof D=="object"?D:null,de=qe?.name||qe?.full_name||qe?.fullName||qe?.displayName||(typeof D=="string"?D:null),$e=qe?.role||qe?.title||null,ye=qe?.phone||qe?.mobile||qe?.contact||null;if(!de&&!Ie)return;const Ze=Ie||de;B.has(Ze)||B.set(Ze,{id:Ie,name:de||"-",role:$e||null,phone:ye||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(D=>P(D)),N.forEach(D=>{(Array.isArray(D.technicians)?D.technicians:[]).forEach(Ie=>P(Ie))});const U=Array.from(B.values()),R=Array.isArray(i.expenses)?i.expenses.map(D=>{const ie=Number(D?.amount)||0;return{label:D?.label||D?.name||"-",amount:ie,displayAmount:se(ie,t),note:D?.note||D?.description||""}}):[],H=Wd(i),Q=H.applyTax?Number(((H.subtotal+F)*ii).toFixed(2)):0,re=Number((H.subtotal+F+Q).toFixed(2)),ae=Ud(i),ue=Gt(i.paidAmount??i.paid_amount)||0,W=Gt(i.paidPercent??i.paid_percent)||0,Y=us({totalAmount:re,paidAmount:ue,paidPercent:W,history:ae}),me=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",he=ms({manualStatus:me,paidAmount:Y.paidAmount,paidPercent:Y.paidPercent,totalAmount:re}),we={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},V=o(`projects.paymentStatus.${he}`,we[he]||he),J=Number(Y.paidAmount||0),te=Number(Y.paidPercent||0),ce=Math.max(0,Number((re-J).toFixed(2))),Ce={projectSubtotal:se(H.subtotal,t),expensesTotal:se(H.expensesTotal,t),reservationsTotal:se(F,t),discountAmount:se(H.discountAmount,t),taxAmount:se(Q,t),overallTotal:se(re,t),paidAmount:se(J,t),remainingAmount:se(ce,t)},qt={status:he,statusLabel:V,paidAmount:J,paidPercent:te,remainingAmount:ce,paidAmountDisplay:se(J,t),remainingAmountDisplay:se(ce,t),paidPercentDisplay:dr(te)},Z=(i.description||"").trim();return{project:i,customer:l,clientInfo:{name:u,company:p||"—",phone:m,email:g},projectInfo:{title:v,code:I,typeLabel:k,startDisplay:L,endDisplay:z,durationLabel:w,statusLabel:T},expenses:R,equipment:_,crew:U,totals:H,totalsDisplay:Ce,projectTotals:{combinedTaxAmount:Q,overallTotal:re,reservationsTotal:F,paidAmount:J,paidPercent:te,remainingAmount:ce,paymentStatus:he},paymentSummary:qt,notes:Z,currencyLabel:t,projectStatus:A,projectStatusLabel:T,projectDurationDays:q,projectDurationLabel:w,paymentHistory:ae}}function tu({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:d={},currencyLabel:l="SR",sections:u,fieldSelections:p={},quoteNumber:y,quoteDate:m,terms:f=Be}){const g=ks(p),b=(V,J)=>_s(g,V,J),I=V=>u?.has?.(V),v=`<div class="quote-placeholder">${E(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,k=(V,J)=>`<div class="info-plain__item">
      <span class="info-plain__label">${E(V)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${E(J)}</span>
    </div>`,L=(V,J,{variant:te="inline"}={})=>te==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${E(V)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${E(J)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${E(V)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${E(J)}</span>
    </span>`,z=(V,J)=>`<div class="payment-row">
      <span class="payment-row__label">${E(V)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${E(J)}</span>
    </div>`,q=[];b("customerInfo","customerName")&&q.push(k(o("projects.details.client","العميل"),t.name||"-")),b("customerInfo","customerCompany")&&q.push(k(o("projects.details.company","شركة العميل"),t.company||"—")),b("customerInfo","customerPhone")&&q.push(k(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),b("customerInfo","customerEmail")&&q.push(k(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const w=I("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${E(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${q.length?`<div class="info-plain">${q.join("")}</div>`:v}
      </section>`:"",A=[];b("projectInfo","projectType")&&A.push(k(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),b("projectInfo","projectTitle")&&A.push(k(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),b("projectInfo","projectCode")&&A.push(k(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),b("projectInfo","projectStart")&&A.push(k(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),b("projectInfo","projectEnd")&&A.push(k(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),b("projectInfo","projectDuration")&&A.push(k(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),b("projectInfo","projectStatus")&&A.push(k(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const $=I("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${E(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${A.length?`<div class="info-plain">${A.join("")}</div>`:v}
      </section>`:"",T=yi.filter(V=>b("projectCrew",V.id)),j=I("projectCrew")?T.length?`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${T.map(V=>`<th>${E(V.labelKey?o(V.labelKey,V.fallback):V.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((V,J)=>`<tr>${T.map(te=>`<td>${te.render(V,J)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(T.length,1)}" class="empty">${E(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${v}
          </section>`:"",N=[];b("financialSummary","projectSubtotal")&&N.push(L(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${se(0,l)}`)),b("financialSummary","expensesTotal")&&N.push(L(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||se(0,l))),b("financialSummary","reservationsTotal")&&N.push(L(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||se(0,l))),b("financialSummary","discountAmount")&&N.push(L(o("reservations.details.labels.discount","الخصم"),i.discountAmount||se(0,l))),b("financialSummary","taxAmount")&&N.push(L(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||se(0,l)));const O=[];b("financialSummary","overallTotal")&&O.push(L(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||se(0,l),{variant:"final"})),b("financialSummary","paidAmount")&&O.push(L(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||se(0,l),{variant:"final"})),b("financialSummary","remainingAmount")&&O.push(L(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||se(0,l),{variant:"final"}));const F=I("financialSummary")?!N.length&&!O.length?`<section class="quote-section quote-section--financial">${v}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${E(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${N.length?`<div class="totals-inline">${N.join("")}</div>`:""}
            ${O.length?`<div class="totals-final">${O.join("")}</div>`:""}
          </div>
        </section>`:"",M=gi.filter(V=>b("projectExpenses",V.id)),_=I("projectExpenses")?M.length?`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${M.map(V=>`<th>${E(V.labelKey?o(V.labelKey,V.fallback):V.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((V,J)=>`<tr>${M.map(te=>`<td>${te.render(V,J)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(M.length,1)}" class="empty">${E(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${v}
          </section>`:"",G=bi.filter(V=>b("projectEquipment",V.id)),B=I("projectEquipment")?G.length?`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${G.map(V=>`<th>${E(V.labelKey?o(V.labelKey,V.fallback):V.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${r.length?r.map((V,J)=>`<tr>${G.map(te=>`<td>${te.render(V,J)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(G.length,1)}" class="empty">${E(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${v}
          </section>`:"",P=(e?.description||"").trim()||"",U=I("projectNotes")?`<section class="quote-section">
        <h3>${E(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${E(P||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",R=[];b("payment","beneficiary")&&R.push(z(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Ee.beneficiaryName)),b("payment","bank")&&R.push(z(o("reservations.quote.labels.bank","اسم البنك"),Ee.bankName)),b("payment","account")&&R.push(z(o("reservations.quote.labels.account","رقم الحساب"),h(Ee.accountNumber))),b("payment","iban")&&R.push(z(o("reservations.quote.labels.iban","رقم الآيبان"),h(Ee.iban)));const H=`<section class="quote-section">
      <div class="payment-block">
        <h3>${E(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${R.length?R.join(""):v}</div>
      </div>
      <p class="quote-approval-note">${E(Ee.approvalNote)}</p>
    </section>`,Q=Array.isArray(f)&&f.length?f:Be,re=`<footer class="quote-footer">
        <h4>${E(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${Q.map(V=>`<li>${E(V)}</li>`).join("")}</ul>
      </footer>`,ae=[],ue=[];if($&&ue.push({key:"project",html:$}),w&&ue.push({key:"customer",html:w}),ue.length>1){const V=ue.find(ce=>ce.key==="project"),J=ue.find(ce=>ce.key==="customer"),te=[];V?.html&&te.push(V.html),J?.html&&te.push(J.html),ae.push(ve(`<div class="quote-section-row quote-section-row--primary">${te.join("")}</div>`,{blockType:"group"}))}else ue.length===1&&ae.push(ve(ue[0].html));const W=[];j&&W.push(ve(j,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),_&&W.push(ve(_,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),B&&W.push(ve(B,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const Y=[];F&&Y.push(ve(F,{blockType:"summary"})),U&&Y.push(ve(U));const me=[ve(H,{blockType:"payment"}),ve(re,{blockType:"footer"})],he=[...Yn(ae,"projects.quote.placeholder.primary"),...W,...Yn(Y,"projects.quote.placeholder.summary"),...me],we=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${E(Ee.logoUrl)}" alt="${E(Ee.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${E(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${E(Ee.companyName)}</p>
        <p class="quote-company-cr">${E(o("reservations.quote.labels.cr","السجل التجاري"))}: ${E(Ee.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${E(o("reservations.details.labels.reservationId","رقم العرض"))}</span>
          <strong>${E(y)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${E(o("projects.quote.labels.date","التاريخ"))}</span>
          <strong>${E(m)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Ei}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${we}
          ${he.join("")}
        </div>
      </div>
    </div>
  `}function Ri(e){if(e?.context==="project")return tu(e);const{reservation:t,customer:n,project:a,technicians:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:d,sections:l,fieldSelections:u={},quoteNumber:p,quoteDate:y,terms:m=Be}=e,f=h(String(t?.reservationId??t?.id??"")),g=t.start?h(Re(t.start)):"-",b=t.end?h(Re(t.end)):"-",I=n?.customerName||n?.full_name||n?.name||"-",v=n?.phone||"-",k=n?.email||"-",L=n?.company||n?.company_name||"-",z=h(v),q=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),w=a?.code||a?.projectCode||"",A=h(String(c)),$=t?.notes||"",T=Array.isArray(m)&&m.length?m:Be,j=ks(u),N=(ne,xe)=>_s(j,ne,xe),O=ne=>l?.has?.(ne),F=`<div class="quote-placeholder">${E(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,M=(ne,xe)=>`<div class="info-plain__item">${E(ne)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${E(xe)}</strong></div>`,_=(ne,xe,{variant:St="inline"}={})=>St==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${E(ne)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${E(xe)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${E(ne)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${E(xe)}</span>
    </span>`,G=(ne,xe)=>`<div class="payment-row">
      <span class="payment-row__label">${E(ne)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${E(xe)}</span>
    </div>`,B=[];N("customerInfo","customerName")&&B.push(M(o("reservations.details.labels.customer","العميل"),I)),N("customerInfo","customerCompany")&&B.push(M(o("reservations.details.labels.company","الشركة"),L)),N("customerInfo","customerPhone")&&B.push(M(o("reservations.details.labels.phone","الهاتف"),z)),N("customerInfo","customerEmail")&&B.push(M(o("reservations.details.labels.email","البريد"),k));const P=O("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${E(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${B.length?`<div class="info-plain">${B.join("")}</div>`:F}
      </section>`:"",U=[];N("reservationInfo","reservationId")&&U.push(M(o("reservations.details.labels.reservationId","رقم الحجز"),f||"-")),N("reservationInfo","reservationStart")&&U.push(M(o("reservations.details.labels.start","بداية الحجز"),g)),N("reservationInfo","reservationEnd")&&U.push(M(o("reservations.details.labels.end","نهاية الحجز"),b)),N("reservationInfo","reservationDuration")&&U.push(M(o("reservations.details.labels.duration","عدد الأيام"),A));const R=O("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${E(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${U.length?`<div class="info-plain">${U.join("")}</div>`:F}
      </section>`:"",H=[];N("projectInfo","projectTitle")&&H.push(M(o("reservations.details.labels.project","المشروع"),q)),N("projectInfo","projectCode")&&H.push(M(o("reservations.details.labels.code","الرمز"),w||"-"));const Q=O("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${E(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${H.length?`<div class="info-plain">${H.join("")}</div>`:F}
      </section>`:"",re=[];N("financialSummary","equipmentTotal")&&re.push(_(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${d}`)),N("financialSummary","crewTotal")&&re.push(_(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${d}`)),N("financialSummary","discountAmount")&&re.push(_(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${d}`)),N("financialSummary","taxAmount")&&re.push(_(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${d}`));const ae=N("financialSummary","finalTotal"),ue=[];ae&&ue.push(_(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${d}`,{variant:"final"}));const W=ue.length?`<div class="totals-final">${ue.join("")}</div>`:"",Y=O("financialSummary")?!re.length&&!ae?`<section class="quote-section quote-section--financial">${F}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${E(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${re.length?`<div class="totals-inline">${re.join("")}</div>`:""}
            ${W}
          </div>
        </section>`:"",me=pi.filter(ne=>N("items",ne.id)),he=me.length>0,we=he?me.map(ne=>`<th>${E(ne.labelKey?o(ne.labelKey,ne.fallback):ne.fallback)}</th>`).join(""):"",J=Array.isArray(t.items)&&t.items.length>0?t.items.map((ne,xe)=>`<tr>${me.map(St=>`<td>${St.render(ne,xe)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(me.length,1)}" class="empty">${E(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,te=O("items")?he?`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${we}</tr>
              </thead>
              <tbody>${J}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.items.title","المعدات"))}</h3>
            ${F}
          </section>`:"",ce=fi.filter(ne=>N("crew",ne.id)),Ce=ce.length>0,qt=Ce?ce.map(ne=>`<th>${E(ne.labelKey?o(ne.labelKey,ne.fallback):ne.fallback)}</th>`).join(""):"",Z=s.length?s.map((ne,xe)=>`<tr>${ce.map(St=>`<td>${St.render(ne,xe)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(ce.length,1)}" class="empty">${E(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,be=O("crew")?Ce?`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${qt}</tr>
              </thead>
              <tbody>${Z}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${F}
          </section>`:"",D=O("notes")?`<section class="quote-section">
        <h3>${E(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${E($||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",ie=[];N("payment","beneficiary")&&ie.push(G(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Ee.beneficiaryName)),N("payment","bank")&&ie.push(G(o("reservations.quote.labels.bank","اسم البنك"),Ee.bankName)),N("payment","account")&&ie.push(G(o("reservations.quote.labels.account","رقم الحساب"),h(Ee.accountNumber))),N("payment","iban")&&ie.push(G(o("reservations.quote.labels.iban","رقم الآيبان"),h(Ee.iban)));const Ie=`<section class="quote-section">
      <div class="payment-block">
        <h3>${E(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${ie.length?ie.join(""):F}</div>
      </div>
      <p class="quote-approval-note">${E(Ee.approvalNote)}</p>
    </section>`,qe=`<footer class="quote-footer">
        <h4>${E(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${T.map(ne=>`<li>${E(ne)}</li>`).join("")}</ul>
      </footer>`,de=[];P&&R?de.push(ve(`<div class="quote-section-row">${P}${R}</div>`,{blockType:"group"})):(R&&de.push(ve(R)),P&&de.push(ve(P))),Q&&de.push(ve(Q));const $e=[];te&&$e.push(ve(te,{blockType:"table",extraAttributes:'data-table-id="items"'})),be&&$e.push(ve(be,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const ye=[];Y&&ye.push(ve(Y,{blockType:"summary"})),D&&ye.push(ve(D));const Ze=[ve(Ie,{blockType:"payment"}),ve(qe,{blockType:"footer"})],ct=[...Yn(de,"reservations.quote.placeholder.page1"),...$e,...Yn(ye,"reservations.quote.placeholder.page2"),...Ze],Mt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${E(Ee.logoUrl)}" alt="${E(Ee.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${E(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${E(Ee.companyName)}</p>
        <p class="quote-company-cr">${E(o("reservations.quote.labels.cr","السجل التجاري"))}: ${E(Ee.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${E(p)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${E(y)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Ei}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Mt}
          ${ct.join("")}
        </div>
      </div>
    </div>
  `}function nu(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function fn(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>nu(c)),i=[s,...r].map(c=>c.catch(d=>(rt("asset load failed",d),pd(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function Mi(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await Pi(r),await fn(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let d=null,l=null;const u=q=>{q.style.margin="0 auto",q.style.breakInside="avoid",q.style.pageBreakInside="avoid",q.style.pageBreakAfter="auto",q.style.breakAfter="auto"},p=()=>{const q=a.createElement("div"),w=s.childElementCount===0;if(q.className="quote-page",q.dataset.pageIndex=String(s.childElementCount),w){q.classList.add("quote-page--primary");const $=i.cloneNode(!0);$.removeAttribute("data-quote-header-template"),q.appendChild($)}else q.classList.add("quote-page--continuation");const A=a.createElement("main");A.className="quote-body",q.appendChild(A),s.appendChild(q),u(q),d=q,l=A},y=()=>{(!d||!l||!l.isConnected)&&p()},m=()=>{if(!d||!l||l.childElementCount>0)return;const q=d;d=null,l=null,q.parentNode&&q.parentNode.removeChild(q)},f=()=>{d=null,l=null},g=()=>d?d.scrollHeight-d.clientHeight>cd:!1,b=(q,{allowOverflow:w=!1}={})=>(y(),l.appendChild(q),g()&&!w?(l.removeChild(q),m(),!1):!0),I=q=>{const w=q.cloneNode(!0);w.removeAttribute?.("data-quote-block"),w.removeAttribute?.("data-block-type"),w.removeAttribute?.("data-table-id"),!b(w)&&(f(),!b(w)&&b(w,{allowOverflow:!0}))},v=q=>{const w=q.querySelector("table");if(!w){I(q);return}const A=q.querySelector("h3"),$=w.querySelector("thead"),T=Array.from(w.querySelectorAll("tbody tr"));if(!T.length){I(q);return}let j=null,N=0;const O=(M=!1)=>{const _=q.cloneNode(!1);_.removeAttribute("data-quote-block"),_.removeAttribute("data-block-type"),_.removeAttribute("data-table-id"),_.classList.add("quote-section--table-fragment"),M&&_.classList.add("quote-section--table-fragment--continued");const G=A?A.cloneNode(!0):null;G&&_.appendChild(G);const B=w.cloneNode(!1);B.classList.add("quote-table--fragment"),$&&B.appendChild($.cloneNode(!0));const P=a.createElement("tbody");return B.appendChild(P),_.appendChild(B),{section:_,body:P}},F=(M=!1)=>j||(j=O(M),b(j.section)||(f(),b(j.section)||b(j.section,{allowOverflow:!0})),j);T.forEach(M=>{F(N>0);const _=M.cloneNode(!0);if(j.body.appendChild(_),g()&&(j.body.removeChild(_),j.body.childElementCount||(l.removeChild(j.section),j=null,m()),f(),j=null,F(N>0),j.body.appendChild(_),g())){j.section.classList.add("quote-section--table-fragment--overflow"),N+=1;return}N+=1}),j=null};if(!c.length)return;c.forEach(q=>{q.getAttribute("data-block-type")==="table"?v(q):I(q)});const k=Array.from(s.children),L=[];if(k.forEach((q,w)=>{const A=q.querySelector(".quote-body");if(w!==0&&(!A||A.childElementCount===0)){q.remove();return}L.push(q)}),!n){const q=a.defaultView||window,w=Math.min(3,Math.max(1,q.devicePixelRatio||1)),A=ha()?Math.min(2,w):w;L.forEach($=>$d($,{pixelRatio:A}))}L.forEach((q,w)=>{const A=w===0;q.style.pageBreakAfter="auto",q.style.breakAfter="auto",q.style.pageBreakBefore=A?"auto":"always",q.style.breakBefore=A?"auto":"page",n?q.style.boxShadow="":q.style.boxShadow="none"});const z=L[L.length-1]||null;d=z,l=z?.querySelector(".quote-body")||null,await fn(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function Ns(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function au(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([Pd(),Td()]),c=e.ownerDocument||document,d=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,d,c?.documentElement?.getAttribute?.("dir")].some(q=>typeof q=="string"&&q.toLowerCase().startsWith("rtl")),p=typeof window<"u"&&window.devicePixelRatio||1,y=Ps(),m=ki(),f=ha();let g;f?g=1.5:m?g=Math.min(1.7,Math.max(1.2,p*1.1)):y?g=Math.min(1.8,Math.max(1.25,p*1.2)):g=Math.min(2,Math.max(1.6,p*1.4));const b=f||m?.9:y?.92:.95,I=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),v={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let k=0;const L=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let q=0;q<s.length;q+=1){const w=s[q];await Pi(w),await fn(w);const A=w.ownerDocument||document,$=A.createElement("div");Object.assign($.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const T=w.cloneNode(!0);T.style.width=`${Dn}px`,T.style.maxWidth=`${Dn}px`,T.style.minWidth=`${Dn}px`,T.style.height=`${Fn}px`,T.style.maxHeight=`${Fn}px`,T.style.minHeight=`${Fn}px`,T.style.position="relative",T.style.background="#ffffff",Ns(T),$.appendChild(T),A.body.appendChild($);let j;try{await fn(T),j=await i(T,{...v,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(P){throw Za(P,"pageCapture",{toastMessage:L}),P}finally{$.parentNode?.removeChild($)}if(!j)continue;const N=j.width||1,F=(j.height||1)/N;let M=Xa,_=M*F,G=0;if(_>Bn){const P=Bn/_;_=Bn,M=M*P,G=Math.max(0,(Xa-M)/2)}const B=j.toDataURL("image/jpeg",b);k>0&&I.addPage(),I.addImage(B,"JPEG",G,0,M,_,`page-${k+1}`,"FAST"),k+=1,await new Promise(P=>window.requestAnimationFrame(P))}}catch(q){throw es({safariWindowRef:n,mobileWindowRef:a}),q}if(k===0)throw es({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(m||f){const q=I.output("blob");if(f){const w=URL.createObjectURL(q);un();try{window.location.assign(w)}catch(A){rt("mobile safari blob navigation failed",A)}finally{setTimeout(()=>URL.revokeObjectURL(w),6e4)}}else{const w=URL.createObjectURL(q),A=()=>m&&n&&!n.closed?n:a&&!a.closed?a:null,$=(j,N)=>{if(un(),!j){window.location.assign(N);return}try{j.location.replace(N),j.focus?.()}catch(O){rt("direct blob navigation failed",O);try{j.document.open(),j.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${E(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${N}" title="PDF preview"></iframe></body></html>`),j.document.close()}catch(F){rt("iframe blob delivery failed",F),window.location.assign(N)}}},T=A();$(T,w),setTimeout(()=>URL.revokeObjectURL(w),6e4)}}else{un();const q=I.output("bloburl"),w=document.createElement("a");w.href=q,w.download=t,w.rel="noopener",w.style.display="none",document.body.appendChild(w),w.click(),setTimeout(()=>{URL.revokeObjectURL(q),w.remove()},2e3)}}function Rt(){if(!C||!K)return;const{previewFrame:e}=K;if(!e)return;const t=C.context||"reservation",n=Ri({context:t,reservation:C.reservation,customer:C.customer,project:C.project,technicians:C.technicians,totals:C.totals,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,fieldSelections:C.fields,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel,terms:C.terms,projectCrew:C.projectCrew,projectExpenses:C.projectExpenses,projectEquipment:C.projectEquipment,projectInfo:C.projectInfo,clientInfo:C.clientInfo,paymentSummary:C.paymentSummary,projectTotals:C.projectTotals});$t("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&(di(r),ci(r,s),li(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await Mi(i,{context:"preview"}),Ns(i))}catch(m){console.error("[reservations/pdf] failed to layout preview document",m)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),d=a?.querySelector(".quote-preview-pages"),l=Dn;let u=18;if(d&&a?.defaultView){const m=a.defaultView.getComputedStyle(d),f=parseFloat(m.rowGap||m.gap||`${u}`);Number.isFinite(f)&&f>=0&&(u=f)}const p=Fn,y=c.length?c.length*p+Math.max(0,(c.length-1)*u):p;if(e.dataset.baseWidth=String(l),e.dataset.baseHeight=String(y),e.style.width=`${l}px`,e.style.minWidth=`${l}px`,e.style.height=`${y}px`,e.style.minHeight=`${y}px`,K?.previewFrameWrapper&&!K?.userAdjustedZoom){const m=K.previewFrameWrapper.clientWidth-24;m>0&&m<l?Qe=Math.max(m/l,.3):Qe=1}Hi(Qe)}finally{un()}},{once:!0})}function su(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?C.sections.add(n):C.sections.delete(n),Ci(C),zi(),Rt())}function ru(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=C.context||"reservation",r=C.fields||(C.fields=ba(s)),i=fd(r,n);t.checked?i.add(a):i.delete(a),Ci(C),Rt()}function iu(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(Ts(C,n),C.sectionExpansions[n]=t.open)}function zi(){if(!K?.toggles||!C)return;const{toggles:e}=K,t=C.fields||{},n=C.context||"reservation";Ts(C);const a=ga(n),s=hi(n),r=a.map(({id:i,labelKey:c,fallback:d})=>{const l=o(c,d),u=C.sections.has(i),p=s[i]||[],y=yd(C,i),m=p.length?`<div class="quote-toggle-sublist">
          ${p.map(f=>{const g=_s(t,i,f.id),b=u?"":"disabled",I=f.labelKey?o(f.labelKey,f.fallback):f.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${f.id}" ${g?"checked":""} ${b}>
                <span>${E(I)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${i}" ${y?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${i}" ${u?"checked":""}>
            <span>${E(l)}</span>
          </label>
          ${p.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${m}
      </details>
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",su)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",ru)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",iu)})}function ou(){if(K?.modal)return K;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
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
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),r=e.querySelector("[data-quote-terms-reset]"),i=e.querySelector("[data-quote-download]"),c=e.querySelector(".modal-header"),d=c?.querySelector(".btn-close"),l=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",c&&c.insertBefore(u,d||null);const p=document.createElement("iframe");p.className="quote-preview-frame",p.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),p.setAttribute("loading","lazy"),p.setAttribute("frameborder","0");const y=document.createElement("div");y.className="quote-preview-zoom-controls",y.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${E(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${E(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${E(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(p),n.innerHTML="";const f=document.createElement("div");f.className="quote-preview-scroll",f.appendChild(m),n.appendChild(f);const g=document.createElement("div");g.className="quote-preview-status",g.setAttribute("role","status"),g.setAttribute("aria-live","polite"),g.hidden=!0,g.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${E(Si("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(y),i?.addEventListener("click",async()=>{if(C){i.disabled=!0;try{await Oi()}finally{i.disabled=!1}}});const b=()=>{Ja()||Ya(e)};l.forEach(L=>{L?.addEventListener("click",b)}),d&&!l.includes(d)&&d.addEventListener("click",b),e.addEventListener("click",L=>{Ja()||L.target===e&&Ya(e)}),K={modal:e,toggles:t,preview:n,previewScroll:f,previewFrameWrapper:m,zoomControls:y,zoomValue:y.querySelector("[data-zoom-value]"),previewFrame:p,meta:a,downloadBtn:i,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const I=y.querySelector("[data-zoom-out]"),v=y.querySelector("[data-zoom-in]"),k=y.querySelector("[data-zoom-reset]");return I?.addEventListener("click",()=>ur(-.1)),v?.addEventListener("click",()=>ur(.1)),k?.addEventListener("click",()=>Zn(1,{markManual:!0})),s&&s.addEventListener("input",lu),r&&r.addEventListener("click",du),Zn(Qe),K}function Zn(e,{silent:t=!1,markManual:n=!1}={}){Qe=Math.min(Math.max(e,.25),2.2),n&&K&&(K.userAdjustedZoom=!0),Hi(Qe),!t&&K?.zoomValue&&(K.zoomValue.textContent=`${Math.round(Qe*100)}%`)}function ur(e){Zn(Qe+e,{markManual:!0})}function Hi(e){if(!K?.previewFrame||!K.previewFrameWrapper)return;const t=K.previewFrame,n=K.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",Ps()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function cu(){if(!K?.meta||!C)return;const{meta:e}=K;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${E(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${E(C.quoteNumber)}</strong></div>
      <div><span>${E(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${E(C.quoteDateLabel)}</strong></div>
    </div>
  `}function Cs(){if(!K?.termsInput)return;const e=(C?.terms&&C.terms.length?C.terms:Be).join(`
`);K.termsInput.value!==e&&(K.termsInput.value=e)}function lu(e){if(!C)return;const t=Qa(e?.target?.value??"");if(t.length){C.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{C.terms=[...Be],Cs();const n=Be.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}Rt()}function du(e){if(e?.preventDefault?.(),!C)return;C.terms=[...Be];const t=document.getElementById("reservation-terms");t&&(t.value=Be.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=Be.join(`
`)),Cs(),Rt()}async function Oi(){if(!C)return;$t("export");const t=!Ps()&&ki(),n=ha(),a=null,s=!n&&t?window.open("","_blank"):null;(d=>{if(d)try{d.document.open(),d.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${E(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${E(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${E(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),d.document.close()}catch(l){rt("failed to prime download window",l)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await jd(),Pa("html2pdf ensured");const d=C.context||"reservation",l=Ri({context:d,reservation:C.reservation,customer:C.customer,project:C.project,technicians:C.technicians,totals:C.totals,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,fieldSelections:C.fields,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel,terms:C.terms,projectCrew:C.projectCrew,projectExpenses:C.projectExpenses,projectEquipment:C.projectEquipment,projectInfo:C.projectInfo,clientInfo:C.clientInfo,paymentSummary:C.paymentSummary,projectTotals:C.projectTotals});i=document.createElement("div"),i.innerHTML=l,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),di(i),ci(i),li(i),Pa("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await Mi(u,{context:"export"}),await fn(u),Ns(u),Pa("layout complete for export document")}catch(y){Za(y,"layoutQuoteDocument",{suppressToast:!0})}}const p=`quotation-${C.quoteNumber}.pdf`;await au(u,{filename:p,safariWindowRef:s,mobileWindowRef:a}),C.sequenceCommitted||(Bd(C.quoteSequence),C.sequenceCommitted=!0)}catch(d){es({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,Za(d,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),un()}}function Vi(){const e=ou();e?.modal&&(dn=!1,Qe=1,K&&(K.userAdjustedZoom=!1),Zn(Qe,{silent:!0}),zi(),cu(),Cs(),Rt(),md(e.modal))}async function uu({reservation:e,customer:t,project:n}){if(!e){x(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=Hd(e),{totalsDisplay:s,totals:r,rentalDays:i}=Od(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:d,quoteNumber:l}=ji("reservation"),u=new Date,p=ed();C={context:"reservation",reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(ga("reservation").filter(y=>y.defaultSelected).map(y=>y.id)),sectionExpansions:$s("reservation"),fields:ba("reservation"),terms:p,quoteSequence:d,quoteNumber:l,quoteDate:u,quoteDateLabel:Bi(u),sequenceCommitted:!1},Li(C),Vi()}async function cm({project:e}){if(!e){x(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=eu(e),{project:n}=t;if(!n){x(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=ji("project"),r=new Date,i=[...Zl];C={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(ga("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:$s("project"),fields:ba("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:Bi(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},Li(C),Vi()}function mu({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=hn(),{reservations:r=[],customers:i=[],technicians:c=[],projects:d=[]}=fe(),l=Array.isArray(s)?s:c||[],u=new Map((d||[]).map(b=>[String(b.id),b])),p=document.getElementById(e);if(!p){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){p.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const y=t||Ml(),m=new Map(i.map(b=>[String(b.id),b])),f=new Map(l.map(b=>[String(b.id),b])),g=Vl({reservations:r,filters:y,customersMap:m,techniciansMap:f,projectsMap:u});if(g.length===0){p.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}p.innerHTML=`<div class="reservations-grid">${Ul({entries:g,customersMap:m,techniciansMap:f,projectsMap:u})}</div>`,p.querySelectorAll('[data-action="details"]').forEach(b=>{const I=Number(b.dataset.reservationIndex);Number.isNaN(I)||b.addEventListener("click",()=>{typeof n=="function"&&n(I)})}),p.querySelectorAll('button[data-action="confirm"]').forEach(b=>{const I=Number(b.dataset.reservationIndex);Number.isNaN(I)||b.addEventListener("click",v=>{v.stopPropagation(),typeof a=="function"&&a(I,v)})})}function pu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=fe(),c=s[e];if(!c)return x(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=r.find(I=>String(I.id)===String(c.customerId)),l=c.projectId?i.find(I=>String(I.id)===String(c.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const I=hn()||[];u.innerHTML=Kl(c,d,I,e,l)}const p=document.getElementById("reservationDetailsModal"),y=()=>{p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(p)?.hide()},m=document.getElementById("reservation-details-edit-btn");m&&(m.onclick=()=>{y(),typeof t=="function"&&t(e,{reservation:c,customer:d,getEditContext:a})});const f=document.getElementById("reservation-details-delete-btn");f&&(f.onclick=()=>{y(),typeof n=="function"&&n(e,{reservation:c,customer:d})});const g=u?.querySelector('[data-action="open-project"]');g&&l&&g.addEventListener("click",()=>{y();const I=l?.id!=null?String(l.id):"",v=I?`projects.html?project=${encodeURIComponent(I)}`:"projects.html";window.location.href=v});const b=document.getElementById("reservation-details-export-btn");return b&&(b.onclick=async I=>{I?.preventDefault?.(),I?.stopPropagation?.(),b.blur();try{await uu({reservation:c,customer:d,project:l})}catch(v){console.error("❌ [reservations] export to PDF failed",v),x(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(p).show(),!0}function Ui(){const e=()=>{qn(),Ne(),hn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let mr=!1,pr=null;function fu(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function lm(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=fu(n);if(!a&&mr&&_t().length>0&&s===pr)return _t();try{const r=await kr(n||{});return mr=!0,pr=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return _t()}}async function yu(e,{onAfterChange:t}={}){if(!Nt())return bn(),!1;const a=_t()[e];if(!a)return x(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return x(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await xc(s),Ui(),t?.({type:"deleted",reservation:a}),x(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=sa(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return x(i,"error"),!1}}async function gu(e,{onAfterChange:t}={}){const a=_t()[e];if(!a)return x(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return x(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=gt(a);if(r)return x(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await wc(s);return Ui(),t?.({type:"confirmed",reservation:i}),x(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=sa(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return x(c,"error"),!1}}function Zt(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:mn(e,n),end:mn(t,a)}}function ea(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ls(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function Ki(){const{container:e,select:t,hint:n,addButton:a}=Ls();if(!t)return;const s=t.value,r=qr(),i=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,d=r.map(u=>{const p=Number.isFinite(Number(u.price))?Number(u.price):0,y=h(p.toFixed(2)),m=`${u.name} — ${y} ${i}`;return`<option value="${ea(u.id)}">${ea(m)}</option>`}).join("");t.innerHTML=`${c}${d}`;const l=r.length>0;t.disabled=!l,a&&(a.disabled=!l),e&&(e.hidden=!l,e.setAttribute("aria-hidden",l?"false":"true")),n&&(l?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),l&&s&&r.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function bu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||x(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=ht(),{start:r,end:i}=Zt(),{reservations:c=[]}=fe(),d=a!=null&&c[a]||null,l=d?.id??d?.reservationId??null,u=ei(n,{existingItems:s,start:r,end:i,ignoreReservationId:l});if(!u.success)return t||x(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const p=[...s,u.package];return vt(a,p),bt(p),ze(),t||x(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function fr(){const{select:e}=Ls();if(!e)return;const t=e.value||"";bu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function hu(){const{addButton:e,select:t}=Ls();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{fr()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),fr())}),t.dataset.listenerAttached="true"),Ki()}function bt(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,gr(t);return}const d=Lt(e);t.innerHTML=d.map(l=>{const u=l.items[0]||{},p=Ct(u)||l.image,y=p?`<img src="${p}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=l.items.some(A=>A?.type==="package"),f=h(String(l.count)),g=Number.isFinite(Number(l.unitPrice))?Number(l.unitPrice):0,b=Number.isFinite(Number(l.totalPrice))?Number(l.totalPrice):g*l.count,I=`${h(g.toFixed(2))} ${a}`,v=`${h(b.toFixed(2))} ${a}`,k=l.barcodes.map(A=>h(String(A||""))).filter(Boolean),L=k.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${k.map(A=>`<li>${A}</li>`).join("")}
            </ul>
          </details>`:"";let z="";if(m){const A=new Map;if(l.items.forEach($=>{Array.isArray($?.packageItems)&&$.packageItems.forEach(T=>{if(!T)return;const j=ee(T.barcode||T.normalizedBarcode||T.desc||Math.random()),N=A.get(j),O=Number.isFinite(Number(T.qty))?Number(T.qty):1;if(N){N.qty+=O;return}A.set(j,{desc:T.desc||T.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:O,barcode:T.barcode??T.normalizedBarcode??""})})}),A.size){const $=Array.from(A.values()).map(T=>{const j=h(String(T.qty)),N=ea(T.desc||""),O=T.barcode?` <span class="reservation-package-items__barcode">(${ea(h(String(T.barcode)))})</span>`:"";return`<li>${N}${O} × ${j}</li>`}).join("");z=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${$}
              </ul>
            </details>
          `}}const q=m?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",w=m?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${l.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${y}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${l.description||"-"}</div>
                ${m?`${z||""}${L||""}`:L}
              </div>
            </div>
          </td>
          <td>
            <div class="${q}" data-group-key="${l.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${l.key}" aria-label="${i}"${w}>−</button>
              <span class="reservation-qty-value">${f}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${l.key}" aria-label="${r}"${w}>+</button>
            </div>
          </td>
          <td>${I}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${l.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),gr(t)}function vu(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function va(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=qa();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,yr();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${h(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${h(Number(s.percentage).toFixed(2))}%`:"—",d=s?.recordedAt?h(Re(s.recordedAt)):"—",l=vu(s?.type),u=s?.note?h(s.note):"";return`
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
  `,yr()}function qu(){if(yn()){x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=Wi(e);let a=Xi(t);if(!Number.isFinite(a)||a<=0){x(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=Ca.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,d=o("reservations.create.summary.currency","SR");let l=null,u=null;if(n==="percent"){const y=Math.max(0,100-i);if(y<=1e-4){x(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,y);if(m!==a){const f=h(m.toFixed(2));x(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",f)),a=m}u=Number(a.toFixed(2)),r>0&&(l=a/100*r)}else{const y=Math.max(0,r-c);if(y<=1e-4){x(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,y);if(m!==a){const f=`${h(m.toFixed(2))} ${d}`;x(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",f)),a=m}l=Number(a.toFixed(2)),r>0&&(u=l/r*100)}l!=null&&(l=Number(l.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const p={type:n,value:a,amount:l,percentage:u,recordedAt:new Date().toISOString()};Tu(p),Bs(qa()),va(),ze(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),x(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function yr(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(yn()){n.preventDefault(),x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}qu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(yn()){n.preventDefault(),x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(Pu(s),Bs(qa()),va(),ze(),x(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function Su(e){const{index:t,items:n}=ht(),s=Lt(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,d)=>d!==r);vt(t,i),bt(i),ze()}function Eu(e){const{index:t,items:n}=ht(),a=n.filter(s=>Sn(s)!==e);a.length!==n.length&&(vt(t,a),bt(a),ze())}function xu(e){const{index:t,items:n}=ht(),s=Lt(n).find(b=>b.key===e);if(!s||s.items.some(b=>b?.type==="package"))return;const{start:r,end:i}=Zt();if(!r||!i){x(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=fe(),d=t!=null&&c[t]||null,l=d?.id??d?.reservationId??null,u=new Set(n.map(b=>ee(b.barcode))),{equipment:p=[]}=fe(),y=(p||[]).find(b=>{const I=ee(b?.barcode);return!I||u.has(I)||Sn({desc:b?.desc||b?.description||b?.name||"",price:Number(b?.price)||0})!==e||!ys(b)?!1:!Xe(I,r,i,l)});if(!y){x(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const m=ee(y.barcode),f=Bt(y);if(!f){x(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:f,equipmentId:f,barcode:m,desc:y.desc||y.description||y.name||s.description||"",qty:1,price:Number.isFinite(Number(y.price))?Number(y.price):s.unitPrice,image:Ct(y)}];vt(t,g),bt(g),ze()}function gr(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){Su(s);return}if(a==="increase-edit-group"&&s){xu(s);return}if(a==="remove-edit-group"&&s){Eu(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||Au(i)}}),e.dataset.groupListenerAttached="true")}function yn(){return!!document.getElementById("edit-res-project")?.value}function wu(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{yn()&&(x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function Iu(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),d=document.getElementById("edit-res-payment-history");[n,a,s,r,i,c,d].forEach(wu),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s&&(s.value="unpaid",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),d&&(d.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.dataset.linkedDisabled="false"))}function ze(){const e=document.getElementById("edit-res-summary");if(!e)return;va();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),Fe(a),ze()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=yn();Iu(c);const d=document.getElementById("edit-res-tax"),l=c?!1:d?.checked||!1,u=!c&&a?.dataset?.userSelected==="true",p=c?"unpaid":u&&a?.value||"unpaid";let y=null;!c&&l&&(Oe("edit-res-company-share"),y=Kt("edit-res-company-share"),(!Number.isFinite(y)||y<=0)&&(Oe("edit-res-company-share"),y=Kt("edit-res-company-share")));const{items:m=[],payments:f=[]}=ht(),{start:g,end:b}=Zt(),I=Ca({items:m,discount:r,discountType:i,applyTax:l,paidStatus:p,start:g,end:b,companySharePercent:y,paymentHistory:f});e.innerHTML=I;const v=Ca.lastResult;if(v&&a){const k=v.paymentStatus;u?Fe(a,a.value):(a.value!==k&&(a.value=k),a.dataset&&delete a.dataset.userSelected,Fe(a,k))}else a&&Fe(a,a.value)}function Au(e){if(e==null)return;const{index:t,items:n}=ht();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);vt(t,a),bt(a),ze()}function ku(e){const t=e?.value??"",n=ee(t);if(!n)return;const a=ia(n);if(!a){x(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=yt(a);if(s==="maintenance"||s==="retired"){x(Yt(s));return}const r=ee(n),{index:i,items:c=[]}=ht();if(c.findIndex(b=>ee(b.barcode)===r)>-1){x(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:l,end:u}=Zt();if(!l||!u){x(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:p=[]}=fe(),y=i!=null&&p[i]||null,m=y?.id??y?.reservationId??null;if(Xe(r,l,u,m)){x(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const f=Bt(a);if(!f){x(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:f,equipmentId:f,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];vt(i,g),e&&(e.value=""),bt(g),ze()}function ta(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Xr(t),a=ee(n?.barcode||t);if(!n||!a){x(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=yt(n);if(s==="maintenance"||s==="retired"){x(Yt(s));return}const{start:r,end:i}=Zt();if(!r||!i){x(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:d=[]}=ht();if(d.some(g=>ee(g.barcode)===a)){x(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=fe(),p=c!=null&&u[c]||null,y=p?.id??p?.reservationId??null;if(Xe(a,r,i,y)){x(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=Bt(n);if(!m){x(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const f=[...d,{id:m,equipmentId:m,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];vt(c,f),bt(f),ze(),e.value=""}function Qi(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),ta(e))});const t=()=>{Jr(e.value,"edit-res-equipment-description-options")&&ta(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{ze()});const e=()=>{hu()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{Ki()})}typeof window<"u"&&(window.getEditReservationDateRange=Zt,window.renderEditPaymentHistory=va);function _u(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){Va(e);return}ta(e)}}function dm(){ft(),Qi()}function $u(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let gn=null,Ke=[],Ge=[],ts=null,Pe={},ja=!1;function ns(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function as(){return document.getElementById("edit-res-confirmed")?.value==="true"}function ht(){return{index:gn,items:Ke,payments:Ge}}function vt(e,t,n=Ge){gn=typeof e=="number"?e:null,Ke=Array.isArray(t)?[...t]:[],Ge=Array.isArray(n)?[...n]:[]}function Gi(){gn=null,Ke=[],kc(),Ge=[]}function qa(){return[...Ge]}function Bs(e){Ge=Array.isArray(e)?[...e]:[]}function Tu(e){e&&(Ge=[...Ge,e])}function Pu(e){!Number.isInteger(e)||e<0||(Ge=Ge.filter((t,n)=>n!==e))}function ju(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Wi(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Xi(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Nu(e,t){if(e){e.value="";return}}function rn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ji(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),d=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,l=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:d,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:l}}function Cu(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((d,l)=>String(l.createdAt||l.start||"").localeCompare(String(d.createdAt||d.start||""))):[],c=[`<option value="">${rn(a)}</option>`];i.forEach(d=>{c.push(`<option value="${rn(d.id)}">${rn(d.title||a)}</option>`)}),r&&!i.some(d=>String(d.id)===r)&&c.push(`<option value="${rn(r)}">${rn(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function Yi(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const d=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",d&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}ss("tax");const c=Pe?.updateEditReservationSummary;typeof c=="function"&&c()}function ss(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=Pe?.updateEditReservationSummary;typeof r=="function"&&r()};if(ja){a();return}ja=!0;const s=()=>{ja=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(it)),t.disabled){n.checked=!1,x(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),Oe("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Oe("edit-res-company-share"):n.checked&&(n.checked=!1));s()}function br(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:d}=fe(),u=_t()?.[e];if(!u){x(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}Pe={...Pe,reservation:u,projects:d||[]},t?.(),Cu(d||[],u);const p=u.projectId&&d?.find?.(B=>String(B.id)===String(u.projectId))||null,{effectiveConfirmed:y,projectLinked:m}=gt(u,p),f=u.items?u.items.map(B=>({...B,equipmentId:B.equipmentId??B.equipment_id??B.id,barcode:ee(B?.barcode)})):[],b=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(B=>Ji(B)).filter(Boolean);vt(e,f,b);const I=o("reservations.list.unknownCustomer","غير معروف"),v=c?.find?.(B=>String(B.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const k=document.getElementById("edit-res-id");k&&(k.value=u.reservationId||u.id);const L=document.getElementById("edit-res-customer");L&&(L.value=v?.customerName||I);const z=typeof a=="function"?a(u.start):{date:"",time:""},q=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",z.date),n?.("edit-res-start-time",z.time),n?.("edit-res-end",q.date),n?.("edit-res-end-time",q.time);const w=document.getElementById("edit-res-notes");w&&(w.value=u.notes||"");const A=document.getElementById("edit-res-discount");if(A){const B=m?0:u.discount??0;A.value=h(B)}const $=document.getElementById("edit-res-discount-type");$&&($.value=m?"percent":u.discountType||"percent");const T=u.projectId?!1:!!u.applyTax,j=document.getElementById("edit-res-tax");j&&(j.checked=T);const N=document.getElementById("edit-res-company-share");if(N){const B=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,P=B!=null?Number.parseFloat(h(String(B).replace("%","").trim())):NaN,U=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,R=U!=null?U===!0||U===1||U==="1"||String(U).toLowerCase()==="true":Number.isFinite(P)&&P>0,H=R&&Number.isFinite(P)&&P>0?P:it,Q=T||R;N.checked=Q,N.dataset.companyShare=String(H)}ns(y,{disable:m});const O=document.getElementById("edit-res-paid"),F=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");O&&(O.value=F,O.dataset&&delete O.dataset.userSelected);const M=document.getElementById("edit-res-payment-progress-type"),_=document.getElementById("edit-res-payment-progress-value");if(M?.dataset?.userSelected&&delete M.dataset.userSelected,M&&(M.value="percent"),Nu(_),_c((u.technicians||[]).map(B=>String(B))),s?.(f),typeof window<"u"){const B=window?.renderEditPaymentHistory;typeof B=="function"&&B()}Yi(),r?.();const G=document.getElementById("editReservationModal");ts=ju(G,i),ts?.show?.()}async function Lu({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:r,populateEquipmentDescriptionLists:i,handleReservationsMutation:c}={}){if(gn===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const d=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),p=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",y=document.getElementById("edit-res-notes")?.value||"",m=h(document.getElementById("edit-res-discount")?.value||"0");let f=parseFloat(m)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const b=as(),I=document.getElementById("edit-res-paid"),v=I?.dataset?.userSelected==="true",k=v&&I?.value||"unpaid",L=document.getElementById("edit-res-payment-progress-type"),z=document.getElementById("edit-res-payment-progress-value"),q=Wi(L),w=Xi(z),A=document.getElementById("edit-res-project")?.value||"",$=Ic(),T=document.getElementById("edit-res-company-share"),j=document.getElementById("edit-res-tax");if(!d||!u){x(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const N=typeof e=="function"?e:(Z,be)=>`${Z}T${be||"00:00"}`,O=N(d,l),F=N(u,p);if(O&&F&&new Date(O)>new Date(F)){x(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const _=_t()?.[gn];if(!_){x(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(Ke)||Ke.length===0&&$.length===0){x(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const G=typeof t=="function"?t:()=>!1,B=_.id??_.reservationId;for(const Z of Ke){const be=yt(Z.barcode);if(be==="reserved"){const D=ee(Z.barcode);if(!G(D,O,F,B))continue}if(be!=="available"){x(Yt(be));return}}for(const Z of Ke){const be=ee(Z.barcode);if(G(be,O,F,B)){x(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const P=typeof n=="function"?n:()=>!1;for(const Z of Ke){if(Z?.type!=="package")continue;const be=Z.packageId??Z.package_id??null;if(be&&P(be,O,F,B)){const D=Z.desc||Z.packageName||o("reservations.create.packages.genericName","الحزمة");x(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${h(String(D))} محجوزة بالفعل في الفترة المختارة`));return}}const U=typeof a=="function"?a:()=>!1;for(const Z of $)if(U(Z,O,F,B)){x(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const R=Array.isArray(Pe.projects)&&Pe.projects.length?Pe.projects:fe().projects||[],H=A&&R.find(Z=>String(Z.id)===String(A))||null,Q={..._,projectId:A?String(A):null,confirmed:b},{effectiveConfirmed:re,projectLinked:ae,projectStatus:ue}=gt(Q,H);let W=!!T?.checked,Y=!!j?.checked;if(ae&&(W&&(T.checked=!1,W=!1),Y=!1),!ae&&W!==Y){x(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}Y&&(Oe("edit-res-company-share"),W=!!T?.checked);let me=W?getCompanySharePercent("edit-res-company-share"):null;W&&(!Number.isFinite(me)||me<=0)&&(Oe("edit-res-company-share"),me=getCompanySharePercent("edit-res-company-share"));const he=W&&Y&&Number.isFinite(me)&&me>0,we=ae?!1:Y;ae&&(f=0,g="percent");const V=ds(Ke,f,g,we,$,{start:O,end:F,companySharePercent:he?me:0});let J=qa();if(Number.isFinite(w)&&w>0){const Z=V;let be=null,D=null;q==="amount"?(be=w,Z>0&&(D=w/Z*100)):(D=w,Z>0&&(be=w/100*Z));const ie=Ji({type:q,value:w,amount:be,percentage:D,recordedAt:new Date().toISOString()});ie&&(J=[...J,ie],Bs(J)),z&&(z.value="")}const te=us({totalAmount:V,history:J}),ce=ms({manualStatus:k,paidAmount:te.paidAmount,paidPercent:te.paidPercent,totalAmount:V});I&&!v&&(I.value=ce,I.dataset&&delete I.dataset.userSelected);let Ce=_.status??"pending";ae?Ce=H?.status??ue??Ce:["completed","cancelled"].includes(String(Ce).toLowerCase())||(Ce=b?"confirmed":"pending");const qt=wr({reservationCode:_.reservationCode??_.reservationId??null,customerId:_.customerId,start:O,end:F,status:Ce,title:_.title??null,location:_.location??null,notes:y,projectId:A?String(A):null,totalAmount:V,discount:f,discountType:g,applyTax:we,paidStatus:ce,confirmed:re,items:Ke.map(Z=>({...Z,equipmentId:Z.equipmentId??Z.id})),technicians:$,companySharePercent:he?me:null,companyShareEnabled:he,paidAmount:te.paidAmount,paidPercentage:te.paidPercent,paymentProgressType:te.paymentProgressType,paymentProgressValue:te.paymentProgressValue,paymentHistory:J});try{const Z=await Ac(_.id||_.reservationId,qt);await kr(),qn(),Ne(),x(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),Gi(),c?.({type:"updated",reservation:Z}),r?.(),i?.(),ts?.hide?.()}catch(Z){console.error("❌ [reservationsEdit] Failed to update reservation",Z);const be=sa(Z)?Z.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");x(be,"error")}}function um(e={}){Pe={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=Pe,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=h(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{ss("tax")}),c.dataset.listenerAttached="true");const d=document.getElementById("edit-res-company-share");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{ss("share")}),d.dataset.listenerAttached="true");const l=document.getElementById("edit-res-payment-progress-type");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{l.dataset.userSelected="true",t?.()}),l.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const p=document.getElementById("edit-res-project");p&&!p.dataset.listenerAttached&&(p.addEventListener("change",()=>{Yi();const b=Array.isArray(Pe.projects)&&Pe.projects.length?Pe.projects:fe().projects||[],I=p.value&&b.find(q=>String(q.id)===String(p.value))||null,k={...Pe?.reservation??{},projectId:p.value||null,confirmed:as()},{effectiveConfirmed:L,projectLinked:z}=gt(k,I);ns(L,{disable:z}),t?.()}),p.dataset.listenerAttached="true");const y=document.getElementById("edit-res-confirmed-btn");y&&!y.dataset.listenerAttached&&(y.addEventListener("click",()=>{if(y.disabled)return;const b=!as();ns(b),t?.()}),y.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{Lu(Pe).catch(b=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",b)})}),m.dataset.listenerAttached="true");const f=document.getElementById("edit-res-equipment-barcode");if(f&&!f.dataset.listenerAttached){let b=null;const I=()=>{f.value?.trim()&&(clearTimeout(b),b=null,n?.(f))};f.addEventListener("keydown",k=>{k.key==="Enter"&&(k.preventDefault(),I())});const v=()=>{if(clearTimeout(b),!f.value?.trim())return;const{start:k,end:L}=getEditReservationDateRange();!k||!L||(b=setTimeout(()=>{I()},150))};f.addEventListener("input",v),f.addEventListener("change",I),f.dataset.listenerAttached="true"}Qi?.();const g=document.getElementById("editReservationModal");g&&!g.dataset.cleanupAttached&&(g.addEventListener("hidden.bs.modal",()=>{Gi(),t?.(),s?.([])}),g.dataset.cleanupAttached="true")}const Bu=fe()||{};let He=(Bu.projects||[]).map(Ru),xn=!1;function mm(){return He}function Sa(e){He=Array.isArray(e)?e.map(Fs):[],is({projects:He});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return He}async function Du(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,d])=>{d==null||d===""||t.set(c,String(d))});const n=t.toString(),s=(await We(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(Ds);return Sa(i),xn=!0,He}async function Fu({force:e=!1,params:t=null}={}){if(!e&&xn&&He.length>0)return He;try{return await Du(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),He}}async function pm(e){const t=await We("/projects/",{method:"POST",body:e}),n=Ds(t?.data??{}),a=[...He,n];return Sa(a),xn=!0,n}async function fm(e,t){const n=await We(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=Ds(n?.data??{}),s=He.map(r=>String(r.id)===String(e)?a:r);return Sa(s),xn=!0,a}async function ym(e){await We(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=He.filter(n=>String(n.id)!==String(e));Sa(t),xn=!0}function gm({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:d,paymentStatus:l,equipmentEstimate:u=0,expenses:p=[],taxAmount:y=0,totalWithTax:m=0,discount:f=0,discountType:g="percent",companyShareEnabled:b=!1,companySharePercent:I=null,companyShareAmount:v=0,paidAmount:k=null,paidPercentage:L=null,paymentProgressType:z=null,paymentProgressValue:q=null,confirmed:w=!1,technicians:A=[],equipment:$=[],payments:T,paymentHistory:j}={}){const N=Array.isArray(A)?A.map(R=>Number.parseInt(String(R),10)).filter(R=>Number.isInteger(R)&&R>0):[],O=Array.isArray($)?$.map(R=>{const H=Number.parseInt(String(R.equipmentId??R.equipment_id??R.id??0),10),Q=Number.parseInt(String(R.qty??R.quantity??0),10);return!Number.isInteger(H)||H<=0?null:{equipment_id:H,quantity:Number.isInteger(Q)&&Q>0?Q:1}}).filter(Boolean):[],F=Array.isArray(p)?p.map(R=>{const H=Number.parseFloat(R?.amount??R?.value??0)||0,Q=(R?.label??R?.name??"").trim();return Q?{label:Q,amount:Math.round(H*100)/100}:null}).filter(Boolean):[],M=F.reduce((R,H)=>R+(H?.amount??0),0),_={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!d,payment_status:l??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(M*100)/100,tax_amount:Math.round((Number.parseFloat(y)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(m)||0)*100)/100,confirmed:!!w,technicians:N,equipment:O,expenses:F},G=Math.max(0,Number.parseFloat(f)||0);_.discount=G,_.discount_type=g==="amount"?"amount":"percent";const B=Number.parseFloat(I),P=!!b&&Number.isFinite(B)&&B>0;_.company_share_enabled=P,_.company_share_percent=P?B:0,_.company_share_amount=P?Math.max(0,Number.parseFloat(v)||0):0,Number.isFinite(Number(k))&&(_.paid_amount=Math.max(0,Number.parseFloat(k)||0)),Number.isFinite(Number(L))&&(_.paid_percentage=Math.max(0,Number.parseFloat(L)||0)),(z==="amount"||z==="percent")&&(_.payment_progress_type=z),q!=null&&q!==""&&(_.payment_progress_value=Number.parseFloat(q)||0),e&&(_.project_code=String(e).trim());const U=T!==void 0?T:j;if(U!==void 0){const R=Zi(U)||[];_.payments=R.map(H=>({type:H.type,amount:H.amount!=null?H.amount:null,percentage:H.percentage!=null?H.percentage:null,value:H.value!=null?H.value:null,note:H.note??null,recorded_at:H.recordedAt??null}))}return _.end_datetime||delete _.end_datetime,_.client_company||(_.client_company=null),_}function Ds(e={}){return Fs(e)}function Ru(e={}){return Fs(e)}function Fs(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(m=>{if(m==null)return null;if(typeof m=="object"){const f=m.id??m.technician_id??m.technicianId;return f!=null?String(f):null}return String(m)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(m=>{const f=m?.equipment_id??m?.equipmentId??m?.id??null,g=m?.quantity??m?.qty??0,b=m?.barcode??m?.code??"",I=m?.description??m?.name??"";return{equipmentId:f!=null?String(f):null,qty:Number.parseInt(String(g),10)||0,barcode:b,description:I}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((m,f)=>({id:m?.id??`expense-${t??"x"}-${f}`,label:m?.label??"",amount:Number.parseFloat(m?.amount??0)||0})),d=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,l=e.company_share_enabled??e.companyShareEnabled,u=l!=null?l===!0||l===1||String(l).toLowerCase()==="true":d>0,p=e.payment_history??e.paymentHistory??e.payments??null,y=Zi(p);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?d:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(m=>typeof m=="object"?m:{id:m}),equipment:r,expenses:c,paymentHistory:y}}function bm(e){return e instanceof hr}function Na(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function Mu(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=Na(e.value);let s=Na(e.amount),r=Na(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,d=e.recordedAt??e.recorded_at??e.date??null;let l=null;if(d){const p=new Date(d);Number.isNaN(p.getTime())||(l=p.toISOString())}l||(l=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:l}}function Zi(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>Mu(t)).filter(Boolean):[]}const na="reservations-ui:ready",At=typeof EventTarget<"u"?new EventTarget:null;let kt={};function zu(e){return Object.freeze({...e})}function Hu(){if(!At)return;const e=kt,t=typeof CustomEvent=="function"?new CustomEvent(na,{detail:e}):{type:na,detail:e};typeof At.dispatchEvent=="function"&&At.dispatchEvent(t)}function Ou(e={}){if(!e||typeof e!="object")return kt;const t={...kt};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),kt=zu(t),Hu(),kt}function Vu(e){if(e)return kt?.[e]}function hm(e){const t=Vu(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const i=(s?.detail||kt)?.[e];typeof i=="function"&&(At&&At.removeEventListener(na,a),n(i))};At&&At.addEventListener(na,a)})}function vm(){return Fu().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=fe()||{};$c(e||[]),si()})}function Rs(e=null){si(),eo(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Uu(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function rs(){return{populateEquipmentDescriptionLists:ft,setFlatpickrValue:$u,splitDateTime:Sr,renderEditItems:bt,updateEditReservationSummary:ze,addEquipmentByDescription:_u,addEquipmentToEditingReservation:ku,addEquipmentToEditingByDescription:ta,combineDateTime:mn,hasEquipmentConflict:Xe,hasTechnicianConflict:xr,renderReservations:eo,handleReservationsMutation:Rs,ensureModal:Uu}}function eo(e="reservations-list",t=null){mu({containerId:e,filters:t,onShowDetails:to,onConfirmReservation:ao})}function to(e){return pu(e,{getEditContext:rs,onEdit:(t,{reservation:n})=>{so(t,n)},onDelete:no})}function no(e){return Nt()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?yu(e,{onAfterChange:Rs}):!1:(bn(),!1)}function ao(e){return gu(e,{onAfterChange:Rs})}function so(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}br(e,rs());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}br(e,rs());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}uc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function qm(){Ou({showReservationDetails:to,deleteReservation:no,confirmReservation:ao,openReservationEditor:so})}export{fm as A,Ou as B,to as C,Ds as D,Xt as E,qs as F,am as G,sm as H,mm as I,bm as J,ii as K,rm as L,cm as M,Yu as N,Zu as O,nm as P,Du as Q,_e as R,em as S,tm as T,im as U,ym as V,pm as W,Jl as X,ci as Y,li as Z,om as _,Fu as a,qm as b,um as c,dm as d,lm as e,si as f,rs as g,oe as h,Xu as i,Rs as j,Kl as k,vm as l,gt as m,pa as n,Ne as o,Dc as p,Hn as q,eo as r,Ju as s,Gu as t,ze as u,Wu as v,Vu as w,hm as x,ri as y,gm as z};
