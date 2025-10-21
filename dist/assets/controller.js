import{n as h,d as pe,f as oc,t as o,b as We,h as E,j as Nt,o as yn,s as ss,A as br,z as cc,k as Fe,B as hr,u as lc}from"./auth.js";import{n as ee,x as Xe,y as vr,z as dc,D as it,A as rs,B as Vs,C as dn,E as Dn,F as ta,G as uc,f as is,H as Je,I as os,J as qr,K as mc,L as pc,M as fc,N as yc,O as Fn,P as gc,Q as Sr,R as bc,S as Er,v as cs,h as ls,j as ds,T as xr,U as hc,s as gn,c as na,V as wr,W as vc,X as Ir,Y as qc,p as aa,a as Ar,g as _t,Z as Sc,_ as Ec,$ as Pa,a0 as xc,w as wc,a1 as Ic,a2 as Ac,b as kc}from"./reservationsService.js";const wa="select.form-select:not([data-no-enhance]):not([multiple])",Ye=new WeakMap;let Ia=null,Us=!1,nt=null;function Ku(e=document){e&&(e.querySelectorAll(wa).forEach(t=>Pn(t)),!Ia&&e===document&&(Ia=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(wa)&&Pn(a),a.querySelectorAll?.(wa).forEach(s=>Pn(s)))})}),Ia.observe(document.body,{childList:!0,subtree:!0})),Us||(Us=!0,document.addEventListener("pointerdown",Tc,{capture:!0})))}function jn(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){Pn(e);return}const t=e.closest(".enhanced-select");t&&(us(t),Rn(t),Na(t))}function Pn(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){jn(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};Ye.set(t,r),a.addEventListener("click",()=>$c(t)),a.addEventListener("keydown",i=>jc(i,t)),s.addEventListener("click",i=>Nc(i,t)),s.addEventListener("keydown",i=>Pc(i,t)),e.addEventListener("change",()=>{Rn(t),kr(t)}),r.observer=new MutationObserver(i=>{let c=!1,d=!1;for(const l of i)l.type==="attributes"&&l.attributeName==="disabled"&&(d=!0),l.type==="childList"&&(c=!0);d&&Na(t),c&&_c(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),us(t),Rn(t),Na(t)}function _c(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,us(t),Rn(t)})))}function us(e){const t=Ye.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),kr(e)}function Rn(e){const t=Ye.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function kr(e){const t=Ye.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function Na(e){const t=Ye.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function $c(e){Ye.get(e)&&(e.getAttribute("data-open")==="true"?Kt(e):_r(e))}function _r(e){const t=Ye.get(e);if(!t)return;nt&&nt!==e&&Kt(nt,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),nt=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function Kt(e,{focusTrigger:t=!0}={}){const n=Ye.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),nt===e&&(nt=null))}function Tc(e){if(!nt)return;const t=e.target;t instanceof Node&&(nt.contains(t)||Kt(nt,{focusTrigger:!1}))}function jc(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),_r(t)):n==="Escape"&&Kt(t)}function Pc(e,t){const n=e.key,a=Ye.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&$r(i,t)}else n==="Escape"&&(e.preventDefault(),Kt(t))}function Nc(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&$r(n,t)}function $r(e,t){const n=Ye.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),Kt(t)}const Qt=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let at=null;function ms(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function Tr(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function Cc(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function Lc(e={}){const t=Cc({...e,activatedAt:Date.now()});return at=t,Tr(!0,t.mode||"create"),ms(Qt.change,{active:!0,selection:{...t}}),t}function Mn(e="manual"){if(!at)return;const t=at;at=null,Tr(!1),ms(Qt.change,{active:!1,previous:t,reason:e})}function jr(){return!!at}function Bc(){return at?{...at}:null}function Dc(e){if(!at)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=h(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:r,description:i}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const d=c.map(u=>h(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!d.length)return!1;const l=Number.isInteger(s)&&s>0?s:d.length;t={barcodes:d,quantity:Math.min(l,d.length)},r&&(t.groupKey=r),i&&(t.description=i)}else return!1;return ms(Qt.requestAdd,{...t,selection:{...at}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||Mn("tab-changed")});const Fc=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Rc=new Set(["maintenance","reserved","retired"]);function Mc(e){const t=String(e??"").trim().toLowerCase();return t&&Fc.get(t)||"available"}function Hc(e){return e?typeof e=="object"?e:sa(e):null}function yt(e){const t=Hc(e);return t?Mc(t.status||t.state||t.statusLabel||t.status_label):"available"}function ps(e){return!Rc.has(yt(e))}function Ct(e={}){return e.image||e.imageUrl||e.img||""}function Oc(e){if(!e)return null;const t=ee(e),{equipment:n=[]}=pe();return(n||[]).find(a=>ee(a?.barcode)===t)||null}function sa(e){const t=ee(e);if(!t)return null;const{equipment:n=[]}=pe();return(n||[]).find(a=>ee(a?.barcode)===t)||null}const zc=pe()||{};let dt=(zc.equipment||[]).map(Kc),Ca=!1,rn="",It=null,Tt=null,jt=null,ra=!1,Ks=!1;function Vc(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function Uc(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function Kc(e={}){return fs({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function ia(e={}){return fs(e)}function fs(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=bn(e.quantity??e.qty??0),i=oa(e.unit_price??e.price??0),c=h(String(e.barcode??"").trim()),d=$e(e.status??e.state??e.status_label??e.statusLabel??"available"),l=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:Qc(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:d,image:l,imageUrl:l,created_at:e.created_at??null,updated_at:e.updated_at??null}}function Qc(e){return e!=null&&e!==""}function bn(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function oa(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function Gc(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function Qs(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function Wc(e,t){const n=Qs(e),a=Qs(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}else{if(r!==i)return r?-1:1;{const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}}const c=Hn(e?.desc||e?.description||e?.name||""),d=Hn(t?.desc||t?.description||t?.name||"");return c.localeCompare(d,"ar",{sensitivity:"base"})}function ve(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function $e(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function Xc(e){return $e(e)}function La(){if(!jr())return null;const e=Bc();return e?{...e}:null}function Jc(e){const t=La();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:r=null}=t,i=t?.mode||t?.source||"",c=[],d=new Set;if(n.forEach(f=>{const m=ee(f?.barcode);!m||d.has(m)||(d.add(m),c.push({variant:f,barcode:m}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(i==="package-manager"||i==="equipment-packages"){const f=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:m})=>m),maxQuantity:f,reason:""}}const l=c.filter(({variant:f})=>ps(f));if(!a||!s)return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=l.filter(({barcode:f})=>!Xe(f,a,s,r));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:f})=>f),maxQuantity:u.length};let p=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(l.length>0)p=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const f=new Set(c.map(({variant:m})=>$e(m?.status)));f.has("maintenance")?p=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):f.has("reserved")?p=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):f.has("retired")&&(p=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:p,availableBarcodes:[],maxQuantity:0}}function Yc(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function Pr(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=La();e.hidden=!s;const r=s?.mode||s?.source||"";s?r==="package-manager"||r==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=La(),d=c?.mode||c?.source||"";d==="package-manager"||d==="equipment-packages"?Mn("package-finish-button"):(Mn("return-button"),Yc())}),t.dataset.listenerAttached="true")}function Re(){return dt}function Pt(e){dt=Array.isArray(e)?e.map(fs):[],ss({equipment:dt}),Uc()}function Hn(e){return String(e??"").trim().toLowerCase()}function mt(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=Hn(t);return n||(n=Hn(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function ca(e){const t=mt(e);return t?Re().filter(n=>mt(n)===t):[]}function la(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=da(e);if(n){const a=ve(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${ve(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function ys(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function On(){const e=ys();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function gs(e={}){const t=ys();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function Ot(e){ra=e;const t=ys(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function Qu(e){if(!Nt()){yn();return}if(!e)return;try{await el()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let d=0;if(i.forEach(l=>{const u=l.القسم??l.category??"",p=l["القسم الثانوي"]??l.subcategory??"",f=l.الوصف??l.description??l.name??"",m=l.الكمية??l.quantity??0,y=l.السعر??l.price??0,g=l.الباركود??l.barcode??"",b=l.الحالة??l.status??"متاح",w=l.الصورة??l.image_url??l.image??"",v=h(String(g||"")).trim();if(!f||!v){d+=1;return}c.push(bs({category:u,subcategory:p,description:f,quantity:m,unit_price:y,barcode:v,status:b,image_url:w}))}),!c.length){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const l=await We("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(l?.data)?l.data.map(ia):[];if(u.length){const m=[...Re(),...u];Pt(m)}await ua({showToastOnError:!1}),Te();const p=l?.meta?.count??u.length,f=[];p&&f.push(`${p} ✔️`),d&&f.push(`${d} ⚠️`),E(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(f.length?` (${f.join(" / ")})`:""))}catch(l){const u=Gt(l,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");E(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const Zc="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let en=null;function el(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):en||(en=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=Zc,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),en=null,e}),en)}function bs({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const d=h(String(r||"")).trim(),l=Xc(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:bn(a),unit_price:oa(s),barcode:d,status:l,image_url:c?.trim()||null}}async function tl(){if(!Nt()){yn();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await We("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await ua({showToastOnError:!1}),E(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=Gt(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");E(t,"error")}}function da(e){return e.image||e.imageUrl||e.img||""}function nl(e){const t=$e(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function zn(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${ve(a)}</td></tr>`}n&&(n.textContent="0")}function Nr(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=It?.groupKey||mt(e);if(!r){zn();return}const i=Re().filter(p=>mt(p)===r).sort((p,f)=>{const m=String(p.barcode||"").trim(),y=String(f.barcode||"").trim();return!m&&!y?0:m?y?m.localeCompare(y,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){zn();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),d=o("equipment.form.labels.quantity","الكمية"),l=Re(),u=i.map(p=>{const f=p.id&&e.id?String(p.id)===String(e.id):String(p.barcode||"")===String(e.barcode||""),m=f?"equipment-variants-table__row--current":"",y=ve(String(p.barcode||"-")),g=f?`<span class="equipment-variants-current-badge">${ve(c)}</span>`:"",b=h(String(Number.isFinite(Number(p.qty))?Number(p.qty):0)),w=l.indexOf(p),v=ve(o("equipment.item.actions.delete","🗑️ حذف")),A=w>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${w}">${v}</button>
          </div>`:"";return`
        <tr class="${m}">
          <td>
            ${y}
            ${g}
          </td>
          <td>${nl(p.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${ve(d)}">${b}</span>
          </td>
          <td class="table-actions-cell">${A}</td>
        </tr>
      `}).join("");n.innerHTML=u}function al({item:e,index:t}){const n=da(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=Nt(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},d=Number.isFinite(Number(e.qty))?Number(e.qty):0,l=Number.isFinite(Number(e.price))?Number(e.price):0,u=d.toLocaleString("en-US"),p=l.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),f=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,m=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,y=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(d-f-m,0),g=y.toLocaleString("en-US"),b=o("equipment.card.labels.availableOfTotal","من أصل"),w=$e(e.status);let v=`${ve(c.available)}: ${ve(g)} ${ve(b)} ${ve(u)}`,A="available";if(y===0){const H={reserved:{text:d===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},U=H[w]||H.default;v=ve(U.text),A=U.modifier}const L=`<span class="equipment-card__availability equipment-card__availability--${A}">${v}</span>`,O="",q=e.desc||e.name||"—",x=e.name&&e.name!==e.desc?e.name:"",$=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${p} ${r}`}].map(({label:H,value:U})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${H}</span>
              <span class="equipment-card__detail-value">${U}</span>
            </span>
          `).join("")}
    </div>`,T=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),j=T.length?`<div class="equipment-card__categories">${T.map(({label:H,value:U})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${H}</span>
              <span class="equipment-card__detail-value">${U}</span>
            </div>
          `).join("")}</div>`:"",N=x?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${x}</span>
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
  `,R=[],_=Jc(e),G=_?.availableBarcodes?.length?_.availableBarcodes.join(","):_?.barcode?_.barcode:"";let B="",P="";if(_.active){const H=`equipment-select-qty-${t}`,U=!!_.canSelect,ce=U?Math.max(1,Number(_.maxQuantity||_.availableBarcodes?.length||1)):1,oe=Math.max(1,Math.min(ce,99)),ae=[];for(let te=1;te<=oe;te+=1){const ue=h(String(te));ae.push(`<option value="${te}"${te===1?" selected":""}>${ue}</option>`)}const W=U?"":" disabled",se=o("reservations.create.equipment.selector.quantityLabel","الكمية"),de=U?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${h(String(ce))}`:_.reason?_.reason:"";B=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${H}">${se}</label>
        <select class="equipment-card__quantity-select" id="${H}" data-equipment-select-quantity${W}>
          ${ae.join("")}
        </select>
        ${de?`<span class="equipment-card__selection-hint">${ve(de)}</span>`:""}
      </div>
    `;const ye=o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),we=U?"":" disabled",V=_.reason?` title="${ve(_.reason)}"`:"",X=['data-equipment-action="select-reservation"',`data-selection-max="${U?ce:0}"`];G&&X.push(`data-selection-barcodes="${ve(G)}"`),e.groupKey&&X.push(`data-selection-group="${ve(String(e.groupKey))}"`),P=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${X.join(" ")}${we}${V}>${ye}</button>
    `}i&&R.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const K=R.length?R.join(`
`):"",M=ve(q);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${ve(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${M}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${O}
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
      ${B||P||K?`<div class="equipment-card__actions equipment-card__actions--center">
            ${B}
            ${P}
            ${K}
          </div>`:""}
    </article>
  `}function sl(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,a.appendChild(d)}),t.includes(i)&&(a.value=i),jn(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,s.appendChild(d)}),n.includes(i)&&(s.value=i),jn(s)}const r=document.getElementById("filter-status");r&&jn(r)}function hn(){const e=pe();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return dt=t||[],dt;const s=new Date;let r=!1;const i=new Set((a||[]).filter(d=>d?.status==="open").map(d=>h(String(d?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(d=>{if(!d)return d;const l=$e(d.status),u=h(String(d.barcode??"")).trim().toLowerCase(),p=u&&i.has(u);let f=p?"maintenance":"available";if(!p&&u)for(const m of n||[]){if(!rl(m,s))continue;if(m.items?.some(g=>h(String(g?.barcode??"")).trim().toLowerCase()===u)){f="reserved";break}}return f!==l?(r=!0,{...d,status:f}):{...d,status:f}});return r?Pt(c):(dt=c,ss({equipment:dt})),dt}function rl(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function Aa(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Te(){const e=document.getElementById("equipment-list");if(!e)return;Pr();const t=hn(),n=Array.isArray(t)?t:Re(),a=new Map;n.forEach(g=>{if(!g)return;const b=mt(g);b&&(a.has(b)||a.set(b,[]),a.get(b).push(g))});const s=Array.from(a.values()).map(g=>{const b=g[0],w=g.reduce((x,k)=>x+(Number.isFinite(Number(k.qty))?Number(k.qty):0),0),v=["maintenance","reserved","available","retired"],A=g.map(x=>$e(x.status)).sort((x,k)=>v.indexOf(x)-v.indexOf(k))[0]||"available",L=g.reduce((x,k)=>{const $=bn(k?.qty??0)||0,T=$e(k?.status);return T==="reserved"?x.reserved+=$:T==="maintenance"&&(x.maintenance+=$),x},{reserved:0,maintenance:0}),O=Math.max(w-L.reserved-L.maintenance,0);return{item:{...b,qty:w,status:A,variants:g,groupKey:mt(b),reservedQty:L.reserved,maintenanceQty:L.maintenance,availableQty:O},index:n.indexOf(b)}});s.sort((g,b)=>Wc(g.item,b.item));const r=document.getElementById("search-equipment")?.value||"",i=h(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",d=document.getElementById("filter-sub")?.value||"",l=document.getElementById("filter-status")?.value||"",u=l?$e(l):"";if(Ca&&!n.length){e.innerHTML=Aa(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(rn&&!n.length){e.innerHTML=Aa(rn,{tone:"error",icon:"⚠️"});return}const p=s.filter(({item:g})=>{const b=h(String(g.barcode??"")).toLowerCase().trim(),w=Array.isArray(g.variants)?g.variants.map(q=>h(String(q.barcode??"")).toLowerCase().trim()).filter(Boolean):[],v=!i||g.name&&g.name.toLowerCase().includes(i)||g.desc&&g.desc.toLowerCase().includes(i)||b&&b.includes(i)||w.some(q=>q.includes(i))||g.category&&g.category.toLowerCase().includes(i)||g.sub&&g.sub.toLowerCase().includes(i),A=!c||g.category===c,L=!d||g.sub===d,O=!u||$e(g.status)===u;return v&&A&&L&&O}),f=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),m=p;e.innerHTML=m.length?m.map(al).join(""):Aa(f);const y=document.getElementById("equipment-list-count");if(y){const g=o("equipment.list.countSuffix","عنصر"),b=h(String(m.length)),w=m.length?`${b} ${g}`:`0 ${g}`;y.textContent=w}sl(n)}async function ua({showToastOnError:e=!0}={}){Ca=!0,rn="",Te();try{const t=await We("/equipment/?all=1"),n=Array.isArray(t?.data)?t.data.map(ia):[];Pt(n)}catch(t){rn=Gt(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&E(rn,"error")}finally{Ca=!1,Te()}}function Gt(e,t,n){if(e instanceof br){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function il(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),r=oa(t.querySelector("#new-equipment-price")?.value||"0"),i=bn(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",d=t.querySelector("#new-equipment-category")?.value?.trim()||"",l=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){E(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const p=bs({category:d,subcategory:l,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const f=await We("/equipment/",{method:"POST",body:p}),m=ia(f?.data),y=[...Re(),m];Pt(y),Te(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),E(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(f){const m=Gt(f,"equipment.toast.addFailed","تعذر إضافة المعدة");E(m,"error")}}async function Cr(e){if(!Nt()){yn();return}const t=Re(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await We(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),Pt(a),Te(),E(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=Gt(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");E(s,"error")}}async function ol(e,t){const n=Re(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},Pt(r),Te();return}const s=bs({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await We(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=ia(r?.data),c=[...n];c[e]=i,Pt(c),Te(),E(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=Gt(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw E(i,"error"),r}}function _n(){Te()}function Lr(e){const n=Re()[e];if(!n)return;Tt=e;const a=ca(n),s=a[0]||n,r=a.reduce((d,l)=>d+(Number.isFinite(Number(l.qty))?Number(l.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(d=>$e(d.status)).sort((d,l)=>i.indexOf(d)-i.indexOf(l))[0]||$e(s.status);document.getElementById("edit-equipment-index").value=e,gs({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:da(s)||"",barcode:s.barcode||"",status:s.status||c}),Ot(!1),jt=On(),la(s),Nr(s),It={groupKey:mt(s),barcode:String(s.barcode||""),id:s.id||null},Vc(document.getElementById("editEquipmentModal"))?.show()}function cl(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),r=s?.querySelector("[data-equipment-select-quantity]");let i=Number.parseInt(r?.value||"1",10);(!Number.isFinite(i)||i<=0)&&(i=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&i>c&&(i=c);const l=(t.dataset.selectionBarcodes||"").split(",").map(m=>m.trim()).filter(m=>m.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",p=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";Dc({barcodes:l,quantity:i,groupKey:p,description:u})||E(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||Cr(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||Lr(s)}}function ll(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||Lr(n)}}function dl(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||Cr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function Br(){if(!It||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=Re(),a=It.id?n.find(d=>String(d.id)===String(It.id)):null,s=It.groupKey,r=s?n.find(d=>mt(d)===s):null,i=a||r;if(!i){zn();return}const c=n.findIndex(d=>d===i);if(c>=0){const d=document.getElementById("edit-equipment-index");d&&(d.value=String(c)),Tt=c}if(Nr(i),!ra){const d=ca(i),l=d[0]||i,u=d.reduce((m,y)=>m+(Number.isFinite(Number(y.qty))?Number(y.qty):0),0),p=["maintenance","reserved","available","retired"],f=d.map(m=>$e(m.status)).sort((m,y)=>p.indexOf(m)-p.indexOf(y))[0]||$e(l.status);gs({category:l.category||"",subcategory:l.sub||"",description:l.desc||l.description||"",quantity:String(u||l.qty||0),price:l.price!=null?String(l.price):"0",image:da(l)||"",barcode:l.barcode||"",status:l.status||f}),jt=On()}la(primary)}function ul(){document.getElementById("search-equipment")?.addEventListener("input",_n),document.getElementById("filter-category")?.addEventListener("change",_n),document.getElementById("filter-sub")?.addEventListener("change",_n),document.getElementById("filter-status")?.addEventListener("change",_n),document.getElementById("add-equipment-form")?.addEventListener("submit",il);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),tl().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",cl),t.addEventListener("keydown",ll),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",dl),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);Gc(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!ra){jt=On(),Ot(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){E(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:bn(document.getElementById("edit-equipment-quantity").value)||1,price:oa(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await ol(t,n),jt=On(),Ot(!1),Br()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{ul(),Te(),ua();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(jt&&gs(jt),Tt!=null){const a=Re()[Tt];if(a){const r=ca(a)[0]||a;la(r)}}Ot(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Te(),Ot(ra),Tt!=null){const t=Re()[Tt];if(t){const a=ca(t)[0]||t;la(a)}}});document.addEventListener("equipment:refreshRequested",()=>{ua({showToastOnError:!1})});document.addEventListener(oc.USER_UPDATED,()=>{Te()});document.addEventListener("equipment:changed",()=>{Br()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{It=null,zn(),Tt=null,jt=null,Ot(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!Ks&&(document.addEventListener(Qt.change,()=>{Pr(),Te()}),Ks=!0);function Ae(e=""){return h(String(e)).trim().toLowerCase()}const ml=2;function pl(e){const t=Number(e);return Number.isFinite(t)?t.toFixed(ml):"0.00"}function Gs(e={}){const t=Number(e?.qty);return Number.isFinite(t)&&t>0?t:1}function vn(e={}){const t=e?.desc||e?.description||e?.name||"",n=Ae(t),a=pl(e?.price??e?.unitPrice??e?.unit_price??0);return`${n}::${a}`}function Lt(e=[]){const t=new Map;return e.forEach((n,a)=>{const s=vn(n);if(!s)return;if(!t.has(s)){const i=n?.desc||n?.description||n?.name||"",c=Ae(i),d=Ws(n),l=n?.image||n?.imageUrl||n?.img||"";t.set(s,{key:s,description:i,normalizedDescription:c,unitPrice:d,image:l,items:[],itemIndices:[],barcodes:[]})}const r=t.get(s);r.items.push(n),r.itemIndices.push(a),n?.barcode&&r.barcodes.push(String(n.barcode))}),Array.from(t.values()).map(n=>({...n,quantity:n.items.reduce((a,s)=>a+Gs(s),0)})).map(n=>{const a=n.quantity||0,s=n.items.reduce((i,c)=>{const d=Ws(c),l=Gs(c);return i+d*l},0),r=a>0?s/a:n.unitPrice;return{...n,quantity:a,count:a,totalPrice:s,unitPrice:r}})}function Wt(e={}){const t=[e?.id,e?.equipment_id,e?.equipmentId,e?.item_id,e?.itemId];for(const n of t)if(!(n==null||n===""))return String(n);return null}function Ws(e={}){const t=e?.price??e?.unit_price??e?.unitPrice??0,n=Number(t);return Number.isFinite(n)?n:0}function hs(e){if(!e?.end)return!1;const t=new Date(e.end);return Number.isNaN(t.getTime())?!1:t<new Date}function fl(e=""){switch(String(e??"").trim().toLowerCase()){case"confirmed":case"مؤكد":return"confirmed";case"in_progress":case"in-progress":case"قيد التنفيذ":case"جاري":return"in_progress";case"completed":case"مكتمل":return"completed";case"cancelled":case"ملغي":return"cancelled";case"pending":case"draft":case"قيد الانتظار":case"بانتظار التأكيد":case"معلق":default:return"pending"}}function gt(e={},t=null){const n=e?.confirmed===!0||e?.confirmed==="true",a=e?.projectId??e?.project_id??null,s=a!=null&&a!==""&&a!=="null",r=s?fl(t?.status??t?.status_label??t?.statusLabel??""):null,i=s&&(t?.confirmed===!0||["confirmed","in_progress","completed"].includes(r));return{reservationConfirmed:n,projectLinked:s,projectStatus:r,projectConfirmed:i,effectiveConfirmed:s?i:n}}const Dr="projects:create:draft",Fr="projects.html#projects-section";let Ba=null,Rr=[],Da=new Map,Fa=new Map,Vn=new Map,ka=!1,Nn=null,Xs=!1,Mr=[];function yl(e){if(!e)return null;let t=Mr.find(a=>a.id===e)||null;if(t)return t;const n=mc(e);return n?(t={id:e,name:fc(n)||e,price:pc(n),items:is(n),raw:n},t):null}function Un(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Kn(e){return h(String(e||"")).trim().toLowerCase()}function gl(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function Hr(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function Or(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function zr(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Vr(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function Xt(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function vs(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function Bt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Be(){const{input:e,hidden:t}=Bt();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function xt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function Ur(e,t,{allowPartial:n=!1}={}){const a=Ae(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function Ra(e,t={}){return Ur(Da,e,t)}function Ma(e,t={}){return Ur(Fa,e,t)}function De(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function Kr(e){Rr=Array.isArray(e)?[...e]:[]}function qs(){return Rr}function Ss(e){return e&&qs().find(t=>String(t.id)===String(e))||null}function Js(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function zt(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??it,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:it}function ze(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??it,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=it),t.dataset.companyShare=String(s),t.checked=!0}function Ha(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(ka){le();return}ka=!0;const a=()=>{ka=!1,le()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(it)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),ze()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?ze():n.checked&&(n.checked=!1));a()}function bl(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Ys(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function Zs(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function st({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=vs();if(!n||!a||!s)return;const r=rs()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const d=new Set;Da=new Map;const l=r.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:Zs(m)||c})).filter(m=>{if(!m.label)return!1;const y=Ae(m.label);return!y||d.has(y)?!1:(d.add(y),Da.set(y,m),!0)}).sort((m,y)=>m.label.localeCompare(y.label,void 0,{sensitivity:"base"}));s.innerHTML=l.map(m=>`<option value="${Un(m.label)}"></option>`).join("");const u=t?"":n.value,p=e?String(e):a.value?String(a.value):"",f=p?r.find(m=>String(m.id)===p):null;if(f){const m=Zs(f)||c;a.value=String(f.id),n.value=m,n.dataset.selectedId=String(f.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function Vt({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=Bt();if(!a||!s||!r)return;const i=Array.isArray(t)?t:qs()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const d=[...i].filter(g=>g&&g.id!=null).sort((g,b)=>String(b.createdAt||b.start||"").localeCompare(String(g.createdAt||g.start||""))),l=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),p=new Set;Fa=new Map;const f=d.map(g=>{const b=Js(g)||u;return{id:String(g.id),label:b}}).filter(g=>{if(!g.label)return!1;const b=Ae(g.label);return!b||p.has(b)?!1:(p.add(b),Fa.set(b,g),!0)});r.innerHTML=f.map(g=>`<option value="${Un(g.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",y=m?d.find(g=>String(g.id)===m):null;if(y){const g=Js(y)||u;s.value=String(y.id),a.value=g,a.dataset.selectedId=String(y.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":l}function Qn(e,t,n){const{date:a,time:s}=qr(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function Qr(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||Vt({selectedValue:a});const r=(rs()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";st(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=Ys(e,"start"),d=Ys(e,"end");c&&Qn("res-start","res-start-time",c),d&&Qn("res-end","res-end-time",d);const l=document.getElementById("res-notes");l&&e.description&&(t||!l.value)&&(l.value=e.description),le(),pt()}function Gr({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:pe(),s=Array.isArray(a)?a:[];Kr(s);const r=t!=null?String(t):n.value?String(n.value):"";Vt({selectedValue:r,projectsList:s}),pt(),le()}function pt(){const{input:e,hidden:t}=Bt(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),d=document.getElementById("res-discount-type"),l=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),p=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(xt(n,Be),a&&xt(a,Be)),s&&xt(s,Be),r&&xt(r,Be),i&&xt(i,Be),c&&xt(c,Be),d&&xt(d,Be),p)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=l),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=l),s&&(s.value="unpaid",De(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=l),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=l),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=l),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=l),d&&(d.value="percent",d.disabled=!0,d.classList.add("reservation-input-disabled"),d.title=l);else{if(n){const f=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",f&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.disabled=!1,d.classList.remove("reservation-input-disabled"),d.title="")}Ha("tax"),le()}function Es(){const{input:e,hidden:t}=Bt();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Ma(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=Ss(r.id);i?Qr(i,{skipProjectSelectUpdate:!0}):(pt(),le())}else t.value="",e.dataset.selectedId="",pt(),le()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Ma(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function xs(){const{input:e,hidden:t}=vs();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Ra(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),le()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Ra(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function hl(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){on({clearValue:!0});return}let n=null;try{const l=decodeURIComponent(t);n=JSON.parse(l)}catch(l){console.warn("⚠️ [reservations/createForm] Failed to decode project context",l)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),on({clearValue:!1}),!n)return;n.fromProjectForm&&(Nn={draftStorageKey:n.draftStorageKey||Dr,returnUrl:n.returnUrl||Fr});const r=document.getElementById("res-project");if(n.projectId){r&&(Vt({selectedValue:String(n.projectId)}),pt());const l=Ss(n.projectId);l?Qr(l,{forceNotes:!!n.forceNotes}):le(),on()}else{r&&Vt({selectedValue:""});const l=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");Nl(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),l)}n.start&&Qn("res-start","res-start-time",n.start),n.end&&Qn("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(rs()||[]).find(p=>String(p.id)===String(n.customerId));u?.id!=null&&(st({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(st({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):st({selectedValue:""});const d=document.getElementById("res-notes");d&&n.description&&!d.value&&(d.value=n.description),le()}function Dt(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:dn(e,n),end:dn(t,a)}}function Wr(e){const t=Kn(e);if(t){const c=Vn.get(t);if(c)return c}const{description:n,barcode:a}=Hr(e);if(a){const c=sa(a);if(c)return c}const s=Ae(n||e);if(!s)return null;let r=wr();if(!r?.length){const c=pe();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&Ir(r)}const i=r.find(c=>Ae(c?.desc||c?.description||"")===s);return i||r.find(c=>Ae(c?.desc||c?.description||"").includes(s))||null}function Xr(e,t="equipment-description-options"){const n=Kn(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(d=>Kn(d.value)===n)||Vn.has(n))return!0;const{description:s}=Hr(e);if(!s)return!1;const r=Ae(s);return r?(wr()||[]).some(c=>Ae(c?.desc||c?.description||"")===r):!1}const vl={available:0,reserved:1,maintenance:2,retired:3};function ql(e){return vl[e]??5}function er(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function Sl(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${er(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${er(n)})`}function ft(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=hn(),a=pe(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];Ir(r);const i=new Map;r.forEach(l=>{const u=gl(l),p=Kn(u);if(!p||!u)return;const f=yt(l),m=ql(f),y=i.get(p);if(!y){i.set(p,{normalized:p,value:u,bestItem:l,bestStatus:f,bestPriority:m,statuses:new Set([f])});return}y.statuses.add(f),m<y.bestPriority&&(y.bestItem=l,y.bestStatus=f,y.bestPriority=m,y.value=u)}),Vn=new Map;const d=Array.from(i.values()).sort((l,u)=>l.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(l=>{Vn.set(l.normalized,l.bestItem);const u=Sl(l),p=Un(l.value);if(u===l.value)return`<option value="${p}"></option>`;const f=Un(u);return`<option value="${p}" label="${f}"></option>`}).join("");e&&(e.innerHTML=d),t&&(t.innerHTML=d)}function Jr(e,t,n={}){const{silent:a=!1}=n,s=ee(e);if(!s)return{success:!1,message:null};const{start:r,end:i}=Dt();if(!r||!i){const y=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||E(y),{success:!1,message:y}}const c=Je();if(ws(c).has(s)){const y=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||E(y),{success:!1,message:y}}const l=os(s,r,i);if(l.length){const y=l.map(b=>b.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${y}`);return a||E(g),{success:!1,message:g}}if(Xe(s,r,i)){const y=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||E(y),{success:!1,message:y}}const u=sa(s);if(!u){const y=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||E(y),{success:!1,message:y}}const p=yt(u);if(p==="maintenance"||p==="retired"){const y=Xt(p);return a||E(y),{success:!1,message:y}}const f=Wt(u);if(!f){const y=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||E(y),{success:!1,message:y}}ta({id:f,equipmentId:f,barcode:s,desc:u.desc,qty:1,price:u.price,image:Ct(u)}),t&&(t.value=""),ot(),le();const m=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||E(m),{success:!0,message:m,barcode:s}}function Oa(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Wr(t);if(!n){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=Oc(n.barcode),s=yt(a||n);if(s==="maintenance"||s==="retired"){E(Xt(s));return}const r=ee(n.barcode);if(!r){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=Wt(n);if(!i){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Ct(n)},{start:d,end:l}=Dt();if(!d||!l){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=Je();if(ws(u).has(r)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const f=os(r,d,l);if(f.length){const m=f.map(y=>y.name).join(", ");E(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`));return}if(Xe(r,d,l)){E(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}ta(c),ot(),le(),E(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function El(){ft();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Oa(e))});const t=()=>{Xr(e.value,"equipment-description-options")&&Oa(e)};e.addEventListener("focus",()=>{if(ft(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function tr(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function ws(e=Je()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=ee(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const r=ee(s?.normalizedBarcode??s?.barcode);r&&t.add(r)})}),t}function xl(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=Dt();if(!t||!n){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}Lc({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):E(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(Qt.change,t=>{tr(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),tr(e,jr()))}function wl(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,r=a.length?a:t.barcode?[t.barcode]:[];if(!r.length)return;let i=0,c=null;const d=[],l=new Set;r.forEach(p=>{const f=ee(p);f&&!l.has(f)&&(l.add(f),d.push(f))});const u=Math.min(s,d.length);for(let p=0;p<u;p+=1){const f=d[p],m=Jr(f,null,{silent:!0});m.success&&(i+=1),m.message&&(c=m.message)}if(i>0){const f=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",h(String(i)));E(f)}else c&&E(c)}function Yr(){xl(),!(Xs||typeof document>"u")&&(document.addEventListener(Qt.requestAdd,wl),Xs=!0)}function qn(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),r=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:r}}function za(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=qn();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const r=document.getElementById("equipment-barcode"),i=document.getElementById("equipment-description"),c=t==="package";r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),qc(t),t==="package"&&ma()}function ma(){const{packageSelect:e,packageHint:t}=qn();if(!e)return;const n=vr();Mr=n,dc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,r=n.map(c=>{const d=Number.isFinite(Number(c.price))?Number(c.price):0,l=h(d.toFixed(2)),u=`${c.name} — ${l} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${r}`,e.selectedIndex=0;const i=n.length>0;e.disabled=!i,t&&(i?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),ti()}function Il(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:r,blockingPackages:i})=>{const c=r?.desc||h(String(r?.barcode??r?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(i)&&i.length){const d=i.map(l=>l.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${d})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function Zr(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const r=Dn(e);if(!r)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const i=yl(r);if(!i)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(m=>m?.type==="package"&&Dn(m.packageId)===r))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(uc(r,n,a,s)){const m=i.name||r;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${m} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(i.items)&&i.items.length?i.items:is(i.raw??{}),d=ws(t),l=[],u=new Set;if(c.forEach(m=>{const y=ee(m?.normalizedBarcode??m?.barcode);if(y){if(u.has(y)){l.push({item:m,type:"internal"});return}u.add(y),d.has(y)&&l.push({item:m,type:"external"})}}),l.length){const m=l.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>h(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:l.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",m):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",m),duplicates:l}}const p=[];return c.forEach(m=>{const y=ee(m?.normalizedBarcode??m?.barcode);if(y&&Xe(y,n,a,s)){const g=os(y,n,a,s);p.push({item:m,blockingPackages:g})}}),p.length?{success:!1,reason:"item_conflict",message:Il(i,p),conflicts:p}:{success:!0,package:{id:`package::${r}`,packageId:r,type:"package",desc:i.name||`Package ${r}`,qty:1,price:Number.isFinite(Number(i.price))?Number(i.price):0,barcode:i.code||i.raw?.package_code||`pkg-${r}`,packageItems:c.map(m=>({equipmentId:m?.equipmentId??null,barcode:m?.barcode??m?.normalizedBarcode??"",normalizedBarcode:ee(m?.normalizedBarcode??m?.barcode),desc:m?.desc??"",qty:Number.isFinite(Number(m?.qty))?Number(m.qty):1,price:Number.isFinite(Number(m?.price))?Number(m.price):0})),image:c.find(m=>m?.image)?.image??null},packageInfo:i}}function ei(e,{silent:t=!1}={}){const n=Dn(e);if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=Dt(),r=Je(),i=Zr(n,{existingItems:r,start:a,end:s});if(!i.success){if(!t){const d={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[i.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");E(i.message||d)}return i}return ta(i.package),ot(),le(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:i.package}}function ti(){const{packageSelect:e}=qn();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;ei(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function Al(){const{packageAddButton:e,packageSelect:t}=qn();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}ei(n)}),e.dataset.listenerAttached="true")}function ni(){const{modeRadios:e}=qn();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&za(s.target.value)}),a.dataset.listenerAttached="true")}),Al(),ti();const t=Fn(),n=e.find(a=>a.value===t);n&&(n.checked=!0),za(t)}function ot(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=Je(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),d=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const l=Lt(n);t.innerHTML=l.map(u=>{const p=u.items[0]||{},f=Ct(p)||u.image,m=f?`<img src="${f}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',y=h(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,b=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,w=`${h(g.toFixed(2))} ${s}`,v=`${h(b.toFixed(2))} ${s}`,A=u.items.some(x=>x?.type==="package"),L=u.barcodes.map(x=>h(String(x||""))).filter(Boolean),O=L.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${L.map(x=>`<li>${x}</li>`).join("")}
            </ul>
          </details>`:"";let q="";if(A){const x=new Map;if(u.items.forEach(k=>{Array.isArray(k?.packageItems)&&k.packageItems.forEach($=>{if(!$)return;const T=ee($.barcode||$.desc||Math.random()),j=x.get(T);if(j){j.qty+=Number.isFinite(Number($.qty))?Number($.qty):1;return}x.set(T,{desc:$.desc||$.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number($.qty))?Number($.qty):1,barcode:$.barcode??$.normalizedBarcode??""})})}),x.size){const k=Array.from(x.values()).map($=>{const T=h(String($.qty)),j=$.desc||h(String($.barcode||"")),N=$.barcode?` <span class="reservation-package-items__barcode">(${h(String($.barcode))})</span>`:"";return`<li>${j}${N} × ${T}</li>`}).join("");q=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${k}
              </ul>
            </details>
          `}}return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${m}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${A?`${q||""}${O||""}`:O}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${c}" ${A?"disabled":""}>−</button>
              <span class="reservation-qty-value">${y}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${i}" ${A?"disabled":""}>+</button>
            </div>
          </td>
          <td>${w}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${d}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function kl(e){const t=Je(),a=Lt(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(gc(s),ot(),le())}function _l(e){const t=Je(),n=t.filter(a=>vn(a)!==e);n.length!==t.length&&(Sr(n),ot(),le())}function $l(e){const t=Je(),a=Lt(t).find(p=>p.key===e);if(!a)return;const{start:s,end:r}=Dt();if(!s||!r){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(p=>ee(p.barcode))),{equipment:c=[]}=pe(),d=(c||[]).find(p=>{const f=ee(p?.barcode);return!f||i.has(f)||vn({desc:p?.desc||p?.description||p?.name||"",price:Number(p?.price)||0})!==e||!ps(p)?!1:!Xe(f,s,r)});if(!d){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const l=ee(d.barcode),u=Wt(d);if(!u){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}ta({id:u,equipmentId:u,barcode:l,desc:d.desc||d.description||d.name||a.description||"",qty:1,price:Number.isFinite(Number(d.price))?Number(d.price):a.unitPrice,image:Ct(d)}),ot(),le()}function le(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),d=c?.value||"unpaid",{start:l,end:u}=Dt();i&&ze();const p=zt(),f=document.getElementById("res-payment-progress-type"),m=document.getElementById("res-payment-progress-value"),y=Or(f),g=zr(m);Vs({selectedItems:Je(),discount:n,discountType:s,applyTax:i,paidStatus:d,paymentProgressType:y,paymentProgressValue:g,start:l,end:u,companySharePercent:p,paymentHistory:[]});const b=Vs.lastResult;b?(Vr(m,b.paymentProgressValue),c&&(c.value=b.paymentStatus,De(c,b.paymentStatus))):De(c,d)}function Tl(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=h(c.target.value),le()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",le),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(Be()){n.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ha("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(Be()){a.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ha("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(Be()){s.value="unpaid",De(s,"unpaid"),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}De(s),le()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(Be()){r.value="percent",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",le()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(Be()){i.value="",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=h(c.target.value),le()}),i.dataset.listenerAttached="true"),le()}function jl(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){le();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),le()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function nr(){const{input:e,hidden:t}=vs(),{input:n,hidden:a}=Bt(),{customers:s}=pe();let r=t?.value?String(t.value):"";if(!r&&e?.value){const W=Ra(e.value,{allowPartial:!0});W&&(r=String(W.id),t&&(t.value=r),e.value=W.label,e.dataset.selectedId=r)}const i=s.find(W=>String(W.id)===r);if(!i){E(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let d=a?.value?String(a.value):"";if(!d&&n?.value){const W=Ma(n.value,{allowPartial:!0});W&&(d=String(W.id),a&&(a.value=d),n.value=W.label,n.dataset.selectedId=d)}const l=document.getElementById("res-start").value,u=document.getElementById("res-end").value,p=document.getElementById("res-start-time")?.value||"00:00",f=document.getElementById("res-end-time")?.value||"00:00";if(!l||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${l}T${p}`,y=`${u}T${f}`,g=new Date(m),b=new Date(y);if(Number.isNaN(g.getTime())||Number.isNaN(b.getTime())||g>=b){E(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const w=bc(),v=Je();if(v.length===0&&w.length===0){E(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const A=document.getElementById("res-notes")?.value||"",L=parseFloat(h(document.getElementById("res-discount")?.value))||0,O=document.getElementById("res-discount-type")?.value||"percent",q=document.getElementById("res-payment-status"),x=q?.value||"unpaid",k=document.getElementById("res-payment-progress-type"),$=document.getElementById("res-payment-progress-value"),T=Or(k),j=zr($),N=d?Ss(d):null,z=bl(N);if(d&&!N){E(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const W of v){const se=yt(W.barcode);if(se==="maintenance"||se==="retired"){E(Xt(se));return}}for(const W of v){const se=ee(W.barcode);if(Xe(se,m,y)){E(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const W of w)if(Er(W,m,y)){E(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const F=document.getElementById("res-tax"),R=document.getElementById("res-company-share"),_=!!d;_?(F&&(F.checked=!1,F.disabled=!0,F.classList.add("disabled"),F.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),R&&(R.checked=!1,R.disabled=!0,R.classList.add("disabled"),R.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),q&&(q.value="unpaid",q.disabled=!0,De(q,"unpaid"),q.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),k&&(k.disabled=!0,k.classList.add("disabled")),$&&($.value="",$.disabled=!0,$.classList.add("disabled"))):(F&&(F.disabled=!1,F.classList.remove("disabled"),F.title=""),R&&(R.disabled=!1,R.classList.remove("disabled"),R.title=""),q&&(q.disabled=!1,q.title=""),k&&(k.disabled=!1,k.classList.remove("disabled")),$&&($.disabled=!1,$.classList.remove("disabled")));const G=_?!1:F?.checked||!1,B=!!R?.checked;if(!_&&B!==G){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let P=B?zt():null;B&&(!Number.isFinite(P)||P<=0)&&(ze(),P=zt());const K=B&&G&&Number.isFinite(P)&&P>0;G&&ze();const M=cs(v,L,O,G,w,{start:m,end:y,companySharePercent:K?P:0}),H=cc(),U=ls({totalAmount:M,progressType:T,progressValue:j,history:[]});$&&Vr($,U.paymentProgressValue);const ce=[];U.paymentProgressValue!=null&&U.paymentProgressValue>0&&ce.push({type:U.paymentProgressType||T,value:U.paymentProgressValue,amount:U.paidAmount,percentage:U.paidPercent,recordedAt:new Date().toISOString()});const oe=ds({manualStatus:x,paidAmount:U.paidAmount,paidPercent:U.paidPercent,totalAmount:M});q&&(q.value=oe,De(q,oe));const ae=xr({reservationCode:H,customerId:c,start:m,end:y,status:z?"confirmed":"pending",title:null,location:null,notes:A,projectId:d||null,totalAmount:M,discount:_?0:L,discountType:_?"percent":O,applyTax:G,paidStatus:_?"unpaid":oe,confirmed:z,items:v.map(W=>({...W,equipmentId:W.equipmentId??W.id})),technicians:w,companySharePercent:_||!K?null:P,companyShareEnabled:_?!1:K,paidAmount:_?0:U.paidAmount,paidPercentage:_?0:U.paidPercent,paymentProgressType:_?null:U.paymentProgressType,paymentProgressValue:_?null:U.paymentProgressValue,paymentHistory:_?[]:ce});try{const W=await hc(ae);hn(),ft(),gn(),Cl(),E(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Ba=="function"&&Ba({type:"created",reservation:W}),Pl(W)}catch(W){console.error("❌ [reservations/createForm] Failed to create reservation",W);const se=na(W)?W.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");E(se,"error"),_&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),on({clearValue:!1}))}}function Pl(e){if(!Nn)return;const{draftStorageKey:t=Dr,returnUrl:n=Fr}=Nn,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}Nn=null,n&&(window.location.href=n)}function on({clearValue:e=!1}={}){const{input:t,hidden:n}=Bt();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,pt())}function Nl(e,t=""){const{input:n,hidden:a}=Bt();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),pt())}function Cl(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),st({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),on({clearValue:!1}),Vt({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",De(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),vc(),Sr([]),Mn("form-reset"),ot(),pt(),le()}function Ll(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){kl(s);return}if(a==="increase-group"&&s){$l(s);return}if(a==="remove-group"&&s){_l(s);return}}),e.dataset.listenerAttached="true")}function Bl(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(Fn()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,Jr(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||Fn()!=="single")return;const{start:r,end:i}=Dt();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function Dl(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await nr()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await nr()}),t.dataset.listenerAttached="true")}function Gu({onAfterSubmit:e}={}){Ba=typeof e=="function"?e:null;const{customers:t,projects:n}=pe();yc(t||[]),st(),xs(),Kr(n||[]),Gr({projectsList:n}),Es(),ft(),ma(),El(),Yr(),ni(),jl(),Tl(),Ll(),Bl(),Dl(),hl(),le(),ot()}function ai(){ft(),ma(),Gr(),st(),xs(),Es(),Yr(),ni(),ot(),le()}if(typeof document<"u"){const e=()=>{st(),Vt({projectsList:qs()}),xs(),Es(),le()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{ft()}),document.addEventListener("packages:changed",()=>{ma(),Fn()==="package"&&za("package")})}typeof window<"u"&&(window.getCompanySharePercent=zt);function si(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:wt(t),endDate:wt(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:wt(n),endDate:wt(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:wt(n),endDate:wt(a)}}return e==="upcoming"?{startDate:wt(t),endDate:""}:{startDate:"",endDate:""}}function Fl(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=h(t?.value||"").trim(),i=h(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),Gn(t),Gn(n),r="",i=""),!r&&!i&&c){const l=si(c);r=l.startDate,i=l.endDate}return{searchTerm:Ae(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function Wu(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{Rl(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),Gn(a),Gn(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function Rl(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=si(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function wt(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function Gn(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function $n(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function Ml(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function Hl(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=Ml(n);if(a!==null)return a}return null}function ar(e,t=0){const n=Hl(e);if(n!=null)return n;const a=$n(e.createdAt??e.created_at);if(a!=null)return a;const s=$n(e.updatedAt??e.updated_at);if(s!=null)return s;const r=$n(e.start);if(r!=null)return r;const i=$n(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function Ol({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((v,A)=>({reservation:v,index:A})),i=t.searchTerm||"",c=t.searchReservationId||"",d=t.searchCustomerName||"",l=t.searchProjectId||"",u=t.startDate||"",p=t.endDate||"",f=t.status||"",m=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,y=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,b=p?new Date(`${p}T23:59:59`):null,w=r.filter(({reservation:v})=>{const A=n.get(String(v.customerId)),L=s?.get?.(String(v.projectId)),O=v.start?new Date(v.start):null,q=hs(v),{effectiveConfirmed:x}=gt(v,L);if(m!=null&&String(v.customerId)!==String(m)||y!=null&&!(Array.isArray(v.technicians)?v.technicians.map(N=>String(N)):[]).includes(String(y))||f==="confirmed"&&!x||f==="pending"&&x||f==="completed"&&!q||g&&O&&O<g||b&&O&&O>b)return!1;if(c){const j=[v.reservationId,v.id,v.reservation_id,v.reservationCode,v.reservation_code,v.code,v.reference,v.referenceNumber,v.reference_number],N=Ae(j.filter(F=>F!=null&&F!=="").map(String).join(" ")).replace(/\s+/g,""),z=c.replace(/\s+/g,"");if(!N.includes(z))return!1}if(d&&!Ae(A?.customerName||"").includes(d))return!1;if(l){const j=[v.projectId,v.project_id,v.projectID,L?.id,L?.projectCode,L?.project_code],N=Ae(j.filter(F=>F!=null&&F!=="").map(String).join(" ")).replace(/\s+/g,""),z=l.replace(/\s+/g,"");if(!N.includes(z))return!1}if(!i)return!0;const k=v.items?.map?.(j=>`${j.barcode} ${j.desc}`).join(" ")||"",$=(v.technicians||[]).map(j=>a.get(String(j))?.name).filter(Boolean).join(" ");return Ae([v.reservationId,A?.customerName,v.notes,k,$,L?.title].filter(Boolean).join(" ")).includes(i)});return w.sort((v,A)=>{const L=ar(v.reservation,v.index),O=ar(A.reservation,A.index);return L!==O?O-L:A.index-v.index}),w}function zl({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),d=o("reservations.list.itemsCountShort","{count} عنصر"),l=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),p=o("reservations.list.status.pending","⏳ غير مؤكد"),f=o("reservations.list.payment.paid","💳 مدفوع"),m=o("reservations.list.payment.unpaid","💳 غير مدفوع"),y=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),g=o("reservations.list.actions.confirm","✔️ تأكيد"),b=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),w=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),v={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:A,index:L})=>{const O=t.get(String(A.customerId)),q=A.projectId?a?.get?.(String(A.projectId)):null,x=hs(A),k=A.paidStatus??A.paid_status??(A.paid===!0||A.paid==="paid"?"paid":"unpaid"),$=k==="paid",T=k==="partial",{effectiveConfirmed:j,projectLinked:N}=gt(A,q),z=j?"status-confirmed":"status-pending",F=$?"status-paid":T?"status-partial":"status-unpaid";let R=`<span class="reservation-chip status-chip ${z}">${j?u:p}</span>`;const _=$?f:T?y:m;let G=`<span class="reservation-chip status-chip ${F}">${_}</span>`,B=$?" tile-paid":T?" tile-partial":" tile-unpaid";x&&(B+=" tile-completed");let P="";x&&(R=`<span class="reservation-chip status-chip status-completed">${u}</span>`,G=`<span class="reservation-chip status-chip status-completed">${_}</span>`,P=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const K=!N&&!j?`<button class="tile-confirm" data-reservation-index="${L}" data-action="confirm">${g}</button>`:"",M=K?`<div class="tile-actions">${K}</div>`:"",H=A.items?.length||0,U=(A.technicians||[]).map(ue=>n.get(String(ue))).filter(Boolean),ce=U.map(ue=>ue.name).join(l)||"—",oe=h(String(A.reservationId??"")),ae=A.start?h(Fe(A.start)):"-",W=A.end?h(Fe(A.end)):"-",se=h(String(A.cost??0)),de=h(String(H)),ye=A.notes?h(A.notes):c,we=d.replace("{count}",de),V=A.applyTax?`<small>${r}</small>`:"";let X=b;return A.projectId&&(X=q?.title?h(q.title):w),`
      <div class="${K?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${B}"${P} data-reservation-index="${L}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${oe}</div>
          <div class="tile-badges">
            ${R}
            ${G}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${v.client}</span>
            <span class="tile-value">${O?.customerName||i}</span>
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
            <span class="tile-value">${se} ${s} ${V}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.equipment}</span>
            <span class="tile-value">${we}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.crew}</span>
            <span class="tile-value">${U.length?ce:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${ye}</span>
          </div>
        </div>
        ${M}
      </div>
    `}).join("")}function Ne(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Vl(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=gt(e,s),c=e.paid===!0||e.paid==="paid",d=hs(e),l=e.items||[],u=Lt(l),p=Array.isArray(e.packages)?e.packages:[],f=new Set,m=p.map((I,Z)=>{const me=Dn(I?.package_code??I?.packageId??I?.package_id??I?.code??I?.id??`pkg-${Z}`),fe=is(I).map(Ee=>({...Ee,normalizedBarcode:Ee?.normalizedBarcode??ee(Ee?.barcode),qty:Number.isFinite(Number(Ee?.qty))?Number(Ee.qty):1}));fe.forEach(Ee=>{const Ve=Ee?.normalizedBarcode??ee(Ee?.barcode);Ve&&f.add(Ve)});const Pe=Number.isFinite(Number(I?.quantity??I?.qty??I?.count))?Number(I.quantity??I.qty??I.count):1,He=Number.isFinite(Number(I?.unit_price??I?.price??I?.unitPrice))?Number(I.unit_price??I.price??I.unitPrice):0,Ea=fe.reduce((Ee,Ve)=>{const xn=Number.isFinite(Number(Ve?.price))?Number(Ve.price):0;return Ee+xn*(Number.isFinite(Number(Ve?.qty))?Number(Ve.qty):1)},0),Zt=Number.isFinite(Number(I?.total??I?.total_price??I?.totalPrice))?Number(I.total??I.total_price??I.totalPrice):He?He*Pe:Ea,En=Pe>0?Zt/Pe:He,xa=fe.map(Ee=>h(String(Ee?.barcode??Ee?.normalizedBarcode??""))).filter(Boolean);return{key:`package::${me||Z}`,description:I?.name||I?.package_name||I?.title||h(String(I?.package_code??me??"")),normalizedDescription:h(String(I?.name||I?.package_name||"")),unitPrice:En,totalPrice:Zt,quantity:Pe,count:Pe,image:fe.find(Ee=>Ee?.image)?.image??null,barcodes:xa,items:[{type:"package",packageItems:fe,packageId:me,desc:I?.name||I?.package_name||"",price:En,qty:Pe,barcode:I?.package_code??I?.packageId??I?.package_id??null}]}}),y=new Set(Array.from(f).map(I=>ee(I))),g=u.filter(I=>{if(I.items.some(fe=>fe?.type==="package"))return p.length===0;const me=I.barcodes.map(fe=>ee(fe)).filter(Boolean);return me.length?!me.every(fe=>y.has(fe)):!0}),b=m.length?[...m,...g]:u,{technicians:w=[]}=pe(),v=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(w)?w:[]),A=new Map;v.forEach(I=>{if(!I||I.id==null)return;const Z=String(I.id),me=A.get(Z)||{};A.set(Z,{...me,...I})});const L=(e.technicians||[]).map(I=>A.get(String(I))).filter(Boolean),O=Nt(),q=aa(e.start,e.end),x=(I={})=>{const Z=[I.dailyWage,I.daily_rate,I.dailyRate,I.wage,I.rate];for(const me of Z){if(me==null)continue;const fe=parseFloat(h(String(me)));if(Number.isFinite(fe))return fe}return 0},k=(I={})=>{const Z=[I.dailyTotal,I.daily_total,I.totalRate,I.total,I.total_wage];for(const me of Z){if(me==null)continue;const fe=parseFloat(h(String(me)));if(Number.isFinite(fe))return fe}return x(I)},T=l.reduce((I,Z)=>I+(Z.qty||1)*(Z.price||0),0)*q,j=L.reduce((I,Z)=>I+x(Z),0),N=L.reduce((I,Z)=>I+k(Z),0),z=j*q,F=N*q,R=T+F,_=parseFloat(e.discount)||0,G=e.discountType==="amount"?_:R*(_/100),B=Math.max(0,R-G),P=r?!1:e.applyTax,K=Number(e.cost),M=Number.isFinite(K),H=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,U=H!=null?parseFloat(h(String(H))):NaN;let ae=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(U)&&U>0)&&Number.isFinite(U)?U:0;P&&ae<=0&&(ae=it);let W=ae>0?Math.max(0,B*(ae/100)):0;const se=B+W,de=P?se*.15:0,ye=Number.isFinite(de)&&de>0?Number(de.toFixed(2)):0,we=se+ye,V=Number.isFinite(we)?Number(we.toFixed(2)):0,X=r?V:M?K:V;ae>0&&(W=Number(Math.max(0,B*(ae/100)).toFixed(2)));const te=h(String(e.reservationId??e.id??"")),ue=e.start?h(Fe(e.start)):"-",je=e.end?h(Fe(e.end)):"-",qt=h(String(L.length)),J=h(T.toFixed(2)),ge=h(G.toFixed(2)),D=h(B.toFixed(2)),ie=h(ye.toFixed(2)),xe=h((Number.isFinite(X)?X:0).toFixed(2)),he=h(String(q)),Y=o("reservations.create.summary.currency","SR"),ke=o("reservations.details.labels.discount","الخصم"),Le=o("reservations.details.labels.tax","الضريبة (15%)"),Ze=o("reservations.details.labels.crewTotal","إجمالي الفريق"),ct=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),Rt=o("reservations.details.labels.duration","عدد الأيام"),ne=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),Se=o("reservations.details.labels.netProfit","💵 صافي الربح"),St=o("reservations.create.equipment.imageAlt","صورة"),et={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},so=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),ro=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),io=o("reservations.details.technicians.roleUnknown","غير محدد"),oo=o("reservations.details.technicians.phoneUnknown","غير متوفر"),co=o("reservations.details.technicians.wage","{amount} {currency} / اليوم"),lo=o("reservations.list.status.confirmed","✅ مؤكد"),uo=o("reservations.list.status.pending","⏳ غير مؤكد"),mo=o("reservations.list.payment.paid","💳 مدفوع"),po=o("reservations.list.payment.unpaid","💳 غير مدفوع"),fo=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),yo=o("reservations.list.status.completed","📁 منتهي"),go=o("reservations.details.labels.id","🆔 رقم الحجز"),bo=o("reservations.details.section.bookingInfo","بيانات الحجز"),ho=o("reservations.details.section.paymentSummary","ملخص الدفع"),vo=o("reservations.details.labels.finalTotal","المجموع النهائي"),qo=o("reservations.details.section.crew","😎 الفريق الفني"),So=o("reservations.details.crew.count","{count} عضو"),Eo=o("reservations.details.section.items","📦 المعدات المرتبطة"),xo=o("reservations.details.items.count","{count} عنصر"),wo=o("reservations.details.actions.edit","✏️ تعديل"),Io=o("reservations.details.actions.delete","🗑️ حذف"),Ao=o("reservations.details.labels.customer","العميل"),ko=o("reservations.details.labels.contact","رقم التواصل"),_o=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const $o=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),To=o("reservations.details.actions.openProject","📁 فتح المشروع"),jo=o("reservations.details.labels.start","بداية الحجز"),Po=o("reservations.details.labels.end","نهاية الحجز"),No=o("reservations.details.labels.notes","ملاحظات"),Co=o("reservations.list.noNotes","لا توجد ملاحظات"),Lo=o("reservations.details.labels.itemsCount","عدد المعدات"),Bo=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),Do=o("reservations.paymentHistory.title","سجل الدفعات"),Fo=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Ro=o("reservations.list.unknownCustomer","غير معروف"),qa=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),Fs=qa==="partial",Mo=qa==="paid"?mo:Fs?fo:po,Ho=u.reduce((I,Z)=>I+(Number(Z.quantity)||0),0),Oo=h(String(Ho)),Rs=xo.replace("{count}",Oo),zo=So.replace("{count}",qt),Vo=e.notes?h(e.notes):Co,Uo=h(F.toFixed(2)),Ko=h(String(ae)),Qo=h(W.toFixed(2)),Go=`${Ko}% (${Qo} ${Y})`,Wo=Math.max(0,T+F-G),Ms=Math.max(0,Wo-z),Xo=h(Ms.toFixed(2)),lt=[{icon:"💼",label:Bo,value:`${J} ${Y}`}];lt.push({icon:"😎",label:Ze,value:`${Uo} ${Y}`}),G>0&&lt.push({icon:"💸",label:ke,value:`${ge} ${Y}`}),lt.push({icon:"📊",label:ct,value:`${D} ${Y}`}),P&&ye>0&&lt.push({icon:"🧾",label:Le,value:`${ie} ${Y}`}),ae>0&&lt.push({icon:"🏦",label:ne,value:Go}),Math.abs(Ms-(X??0))>.009&&lt.push({icon:"💵",label:Se,value:`${Xo} ${Y}`}),lt.push({icon:"💰",label:vo,value:`${xe} ${Y}`});const Jo=lt.map(({icon:I,label:Z,value:me})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${I} ${Z}</span>
      <span class="summary-details-value">${me}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let Yt=[];Array.isArray(e.paymentHistory)?Yt=e.paymentHistory:Array.isArray(e.payment_history)&&(Yt=e.payment_history);const Yo=Array.isArray(e.paymentLogs)?e.paymentLogs:[],Hs=Array.isArray(Yt)&&Yt.length>0?Yt:Yo,Zo=Hs.length?`<ul class="reservation-payment-history-list">${Hs.map(I=>{const Z=I?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):I?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),me=Number.isFinite(Number(I?.amount))&&Number(I.amount)>0?`${h(Number(I.amount).toFixed(2))} ${Y}`:"—",fe=Number.isFinite(Number(I?.percentage))&&Number(I.percentage)>0?`${h(Number(I.percentage).toFixed(2))}%`:"—",Pe=I?.recordedAt?h(Fe(I.recordedAt)):"—",He=I?.note?`<div class="payment-history-note">${Ne(h(I.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${Ne(Z)}</span>
              <span class="payment-history-entry__amount">${me}</span>
              <span class="payment-history-entry__percent">${fe}</span>
              <span class="payment-history-entry__date">${Pe}</span>
            </div>
            ${He}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${Ne(Fo)}</div>`,Os=[{text:i?lo:uo,className:i?"status-confirmed":"status-pending"},{text:Mo,className:qa==="paid"?"status-paid":Fs?"status-partial":"status-unpaid"}];d&&Os.push({text:yo,className:"status-completed"});const ec=Os.map(({text:I,className:Z})=>`<span class="status-chip ${Z}">${I}</span>`).join(""),Et=(I,Z,me)=>`
    <div class="res-info-row">
      <span class="label">${I} ${Z}</span>
      <span class="value">${me}</span>
    </div>
  `;let Sa="";if(e.projectId){let I=Ne($o);if(s){const Z=s.title||o("projects.fallback.untitled","مشروع بدون اسم");I=`${Ne(Z)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${Ne(To)}</button>`}Sa=`
      <div class="res-info-row">
        <span class="label">📁 ${_o}</span>
        <span class="value">${I}</span>
      </div>
    `}const tt=[];tt.push(Et("👤",Ao,t?.customerName||Ro)),tt.push(Et("📞",ko,t?.phone||"—")),tt.push(Et("🗓️",jo,ue)),tt.push(Et("🗓️",Po,je)),tt.push(Et("📦",Lo,Rs)),tt.push(Et("⏱️",Rt,he)),tt.push(Et("📝",No,Vo)),Sa&&tt.push(Sa);const tc=tt.join(""),nc=b.length?b.map(I=>{const Z=I.items[0]||{},me=Ct(Z)||I.image,fe=me?`<img src="${me}" alt="${St}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',Pe=I.items.some(Ue=>Ue?.type==="package"),He=Number(I.quantity)||Number(I.count)||0,Ea=h(String(He)),Zt=Number.isFinite(Number(I.unitPrice))?Number(I.unitPrice):0,En=Number.isFinite(Number(I.totalPrice))?Number(I.totalPrice):Zt*He,xa=`${h(Zt.toFixed(2))} ${Y}`,Ee=`${h(En.toFixed(2))} ${Y}`,Ve=I.barcodes.map(Ue=>h(String(Ue||""))).filter(Boolean),xn=Ve.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${Ve.map(Ue=>`<li>${Ue}</li>`).join("")}
              </ul>
            </details>`:"";let zs="";if(Pe){const Ue=new Map;if(I.items.forEach(wn=>{Array.isArray(wn?.packageItems)&&wn.packageItems.forEach(Ie=>{if(!Ie)return;const In=ee(Ie.barcode||Ie.normalizedBarcode||Ie.desc||Math.random()),An=Ue.get(In),kn=Number.isFinite(Number(Ie.qty))?Number(Ie.qty):1;if(An){An.qty+=kn;return}Ue.set(In,{desc:Ie.desc||Ie.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:kn,barcode:Ie.barcode??Ie.normalizedBarcode??""})})}),Ue.size){const wn=Array.from(Ue.values()).map(Ie=>{const In=h(String(Ie.qty)),An=Ne(Ie.desc||""),kn=Ie.barcode?` <span class="reservation-package-items__barcode">(${Ne(h(String(Ie.barcode)))})</span>`:"";return`<li>${An}${kn} × ${In}</li>`}).join("");zs=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${wn}
                </ul>
              </details>
            `}}const ic=Pe?`${zs||""}${xn||""}`:xn;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${fe}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${Ne(Z.desc||Z.description||Z.name||I.description||"-")}</div>
                  ${ic}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Ne(et.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Ea}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Ne(et.unitPrice)}">${xa}</td>
            <td class="reservation-modal-items-table__cell" data-label="${Ne(et.total)}">${Ee}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${Ne(et.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${so}</td></tr>`,ac=`
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
        <tbody>${nc}</tbody>
      </table>
    </div>
  `,sc=L.map((I,Z)=>{const me=h(String(Z+1)),fe=I.role||io,Pe=I.phone||oo,He=I.wage?co.replace("{amount}",h(String(I.wage))).replace("{currency}",Y):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${me}</span>
          <span class="technician-name">${I.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${fe}</div>
          <div>📞 ${Pe}</div>
          ${He?`<div>💰 ${He}</div>`:""}
        </div>
      </div>
    `}).join(""),rc=L.length?`<div class="reservation-technicians-grid">${sc}</div>`:`<ul class="reservation-modal-technicians"><li>${ro}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${go}</span>
          <strong>${te}</strong>
        </div>
        <div class="status-chips">
          ${ec}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${bo}</h6>
          ${tc}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${ho}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${Jo}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Do}</h6>
              ${Zo}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${qo}</span>
          <span class="count">${zo}</span>
        </div>
        ${rc}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Eo}</span>
          <span class="count">${Rs}</span>
        </div>
        ${ac}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${wo}</button>
        ${O?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Io}</button>`:""}
      </div>
    </div>
  `}const Xu="project",Ju="editProject",Yu=3600*1e3,ri=.15,Zu=6,em="projectsTab",tm="projectsSubTab",nm={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},am={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},sm={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},Ul=`@page {
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
`,Kl=/color\([^)]*\)/gi,un=/(color\(|color-mix\(|oklab|oklch)/i,Ql=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"],Gl=typeof document<"u"?document.createElement("canvas"):null,Tn=Gl?.getContext?.("2d")||null;function ii(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function Va(e,t="#000"){if(!Tn||!e)return t;try{return Tn.fillStyle="#000",Tn.fillStyle=e,Tn.fillStyle||t}catch{return t}}function Wl(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&un.test(n)){const s=Va(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function Mt(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function rm(e=[]){if(!(!Array.isArray(e)||!e.length))for(let t=e.length-1;t>=0;t-=1){const{element:n,prop:a,value:s,priority:r}=e[t]||{};!n?.style||!a||(s&&s.length>0?n.style.setProperty(a,s,r||""):n.style.removeProperty(a))}}function oi(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;Ql.forEach(c=>{const d=r[c];if(d&&un.test(d)){const l=ii(c);Mt(n,s,l);const u=c==="backgroundColor"?"#ffffff":r.color||"#000000",p=Va(d,u);s.style.setProperty(l,p,"important")}});const i=r.backgroundImage;if(i&&un.test(i)){const c=Va(r.backgroundColor||"#ffffff","#ffffff");Mt(n,s,"background-image"),Mt(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function ci(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(c=>{const d=r[c];if(d&&un.test(d)){const l=ii(c);Mt(n,s,l);const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(l,u,"important")}});const i=r.backgroundImage;i&&un.test(i)&&(Mt(n,s,"background-image"),Mt(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function li(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(Kl,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const di="reservations.quote.sequence",sr={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},ui="https://help.artratio.sa/guide/quote-preview",qe={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Xl=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Ce=[...Xl],Jl=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function Ua(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...Ce]}function Yl(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=Ua(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=Ua(t.value);if(a.length)return a}const n=Ce.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...Ce]}const Zl=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],mi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>S(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>S(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>S(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>S(h(Number(e?.price||0).toFixed(2)))}],pi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>S(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>S(e?.role||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>S(e?.phone||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Ka={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:mi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:pi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},fi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>S(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>S(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>S(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],yi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>S(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>S(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>S(e?.note||"-")}],gi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>S(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>S(h(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>S(h(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>S(e?.displayCost||"—")}],ed=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],td={customerInfo:Ka.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:Ka.payment,projectExpenses:yi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:fi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:gi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},_a=new Map;function pa(e="reservation"){if(_a.has(e))return _a.get(e);const t=e==="project"?ed:Zl,n=e==="project"?td:Ka,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(d=>d.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return _a.set(e,r),r}function fa(e="reservation"){return pa(e).sectionDefs}function bi(e="reservation"){return pa(e).fieldDefs}function hi(e="reservation"){return pa(e).sectionIdSet}function vi(e="reservation"){return pa(e).fieldIdMap}function qi(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const nd="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",ad="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",sd="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",Si=Ul.trim(),Ei=/^data:image\/svg\+xml/i,rd=/\.svg($|[?#])/i,sn=512,Qa="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",xi=96,wi=25.4,Ga=210,Cn=297,Ln=Math.round(Ga/wi*xi),Bn=Math.round(Cn/wi*xi),id=2,Ii=/safari/i,od=/(iphone|ipad|ipod)/i,rr=/(iphone|ipad|ipod)/i,cd=/(crios|fxios|edgios|opios)/i,Wn="[reservations/pdf]";let Q=null,C=null,Qe=1,tn=null,nn=null,ut=null,Ht=null,cn=!1;function $t(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!Q?.statusIndicator||!Q?.statusText)return;Q.statusKind=e;const r=t||qi(e);Q.statusText.textContent=r,Q.statusSpinner&&(Q.statusSpinner.hidden=!s),Q.statusAction&&(Q.statusAction.hidden=!0,Q.statusAction.onclick=null,n&&typeof a=="function"&&(Q.statusAction.textContent=n,Q.statusAction.hidden=!1,Q.statusAction.onclick=i=>{i.preventDefault(),a()})),Q.statusIndicator.hidden=!1,requestAnimationFrame(()=>{Q.statusIndicator.classList.add("is-visible")})}function ln(e){!Q?.statusIndicator||!Q?.statusText||(Q.statusKind=null,Q.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{Q?.statusIndicator&&(Q.statusIndicator.hidden=!0,Q.statusAction&&(Q.statusAction.hidden=!0,Q.statusAction.onclick=null),Q.statusSpinner&&(Q.statusSpinner.hidden=!1))},220))}function Wa(){return!!window?.bootstrap?.Modal}function ld(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),ut||(ut=document.createElement("div"),ut.className="modal-backdrop fade show",ut.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(ut)),Ht||(Ht=t=>{t.key==="Escape"&&Xa(e)},document.addEventListener("keydown",Ht));try{e.focus({preventScroll:!0})}catch{}}}function Xa(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),ut&&(ut.remove(),ut=null),Ht&&(document.removeEventListener("keydown",Ht),Ht=null))}function dd(e){if(e){if(Wa()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}ld(e)}}function ud(){if(cn)return;cn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!Q?.modal?.classList.contains("show"),s=()=>{Q?.modal?.classList.contains("show")&&($t("render"),cn=!1,Ft())};hr({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:ui}),a&&$t("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function ya(e="reservation"){const t={},n=bi(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function Is(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function md(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function As(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function ks(e="reservation"){return Object.fromEntries(fa(e).map(({id:t})=>[t,!1]))}function _s(e,t){return e.sectionExpansions||(e.sectionExpansions=ks(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function pd(e,t){return _s(e,t)?.[t]!==!1}function $s(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function fd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return od.test(e)}function yd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=Ii.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Ai(){return fd()&&yd()}function ga(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=rr.test(e)||rr.test(t),s=/Macintosh/i.test(e)&&n>1;return Ii.test(e)&&!cd.test(e)&&(a||s)}function $a(e,...t){try{console.log(`${Wn} ${e}`,...t)}catch{}}function rt(e,...t){try{console.warn(`${Wn} ${e}`,...t)}catch{}}function gd(e,t,...n){try{t?console.error(`${Wn} ${e}`,t,...n):console.error(`${Wn} ${e}`,...n)}catch{}}function be(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function bd(e,t="لا توجد بيانات للعرض."){const n=S(o(e,t));return be(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Xn(e,t){return Array.isArray(e)&&e.length?e:[bd(t)]}const hd=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function ki(e=""){return hd.test(e)}function vd(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!ki(r))return a.call(this,r,...i);let c,d=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),d=!0)}catch{}try{if(!d){const l=this.canvas;l&&l.style?.direction!=="rtl"&&(l.__artRatioOriginalDirection=l.style.direction,l.style.direction="rtl")}return a.call(this,r,...i)}finally{if(d&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!d){const l=this.canvas;l&&l.__artRatioOriginalDirection!==void 0&&(l.style.direction=l.__artRatioOriginalDirection,delete l.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function ir(e,t=sn){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function qd(e){if(!e)return{width:sn,height:sn};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?ir(t,0):0,s=n?ir(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,d]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(d)&&d>0?d:0)}}return{width:a||sn,height:s||sn}}function _i(e=""){return typeof e!="string"?!1:Ei.test(e)||rd.test(e)}function Sd(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Ed(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function $i(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await Ed(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),d=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=d;const l=i.getContext("2d");return l.clearRect(0,0,c,d),l.drawImage(r,0,0,c,d),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function xd(e){if(!e)return null;if(Ei.test(e))return Sd(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function wd(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!_i(t))return!1;const n=await xd(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",Qa),!1;const a=await $i(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",Qa),!1)}async function Id(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=qd(e),s=await $i(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||Qa),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),d=e.getAttribute("height");return c&&i.setAttribute("width",c),d&&i.setAttribute("height",d),e.parentNode?.replaceChild(i,e),!!s}async function Ti(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{_i(s.getAttribute?.("src"))&&a.push(wd(s))}),n.forEach(s=>{a.push(Id(s))}),a.length&&await Promise.allSettled(a)}function Ad(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(P,K=0)=>{const M=parseFloat(P);return Number.isFinite(M)?M:K},i=r(s.paddingTop),c=r(s.paddingBottom),d=r(s.paddingRight),l=r(s.paddingLeft),u=r(s.borderRadius),p=r(s.fontSize,14),f=(()=>{const P=s.lineHeight;if(!P||P==="normal")return p*1.6;const K=r(P,p*1.6);return K>0?K:p*1.6})(),m=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(m<=0)return null;const y=Math.max(1,m-l-d),g=e.textContent||"",b=g.split(/\r?\n/),w=n.createElement("canvas"),v=w.getContext("2d");if(!v)return null;const A=s.fontStyle||"normal",L=s.fontVariant||"normal",O=s.fontWeight||"400",q=s.fontFamily||"sans-serif",x=s.fontStretch||"normal",k=P=>P.join(" "),$=[],T=P=>v.measureText(P).width;v.font=`${A} ${L} ${O} ${x} ${p}px ${q}`,b.forEach(P=>{const K=P.trim();if(K.length===0){$.push("");return}const M=K.split(/\s+/);let H=[];M.forEach((U,ce)=>{const oe=U.trim();if(!oe)return;const ae=k(H.concat(oe));if(T(ae)<=y||H.length===0){H.push(oe);return}$.push(k(H)),H=[oe]}),H.length&&$.push(k(H))}),$.length||$.push("");const j=i+c+$.length*f,N=Math.ceil(Math.max(1,m)*t),z=Math.ceil(Math.max(1,j)*t);w.width=N,w.height=z,w.style.width=`${Math.max(1,m)}px`,w.style.height=`${Math.max(1,j)}px`,v.scale(t,t);const F=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){v.save(),v.beginPath();const P=Math.max(1,m),K=Math.max(1,j),M=Math.min(u,P/2,K/2);v.moveTo(M,0),v.lineTo(P-M,0),v.quadraticCurveTo(P,0,P,M),v.lineTo(P,K-M),v.quadraticCurveTo(P,K,P-M,K),v.lineTo(M,K),v.quadraticCurveTo(0,K,0,K-M),v.lineTo(0,M),v.quadraticCurveTo(0,0,M,0),v.closePath(),v.clip()}if(v.fillStyle=F,v.fillRect(0,0,Math.max(1,m),Math.max(1,j)),v.font=`${A} ${L} ${O} ${x} ${p}px ${q}`,v.fillStyle=s.color||"#000000",v.textBaseline="top",v.textAlign="right","direction"in v)try{v.direction="rtl"}catch{}const R=Math.max(0,m-d);let _=i;$.forEach(P=>{const K=P.length?P:" ";v.fillText(K,R,_,y),_+=f});const G=n.createElement("img");let B;try{B=w.toDataURL("image/png")}catch(P){return rt("note canvas toDataURL failed",P),null}return G.src=B,G.alt=g,G.style.width=`${Math.max(1,m)}px`,G.style.height=`${Math.max(1,j)}px`,G.style.display="block",G.setAttribute("data-quote-note-image","true"),{image:G,canvas:w,totalHeight:j,width:m}}function kd(e,{pixelRatio:t=1}={}){if(!e||!ga())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!ki(a.textContent||""))return;let s;try{s=Ad(a,{pixelRatio:t})}catch(r){rt("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function Ja(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){gd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),d=o("reservations.quote.toast.retry","إعادة المحاولة"),l=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?($t("export"),Oi()):($t("render"),cn=!1,Ft())};if(hr({message:i,duration:9e3,actionLabel:l?d:void 0,onAction:l?u:void 0,linkLabel:c,linkHref:ui}),Q?.modal?.classList.contains("show")&&$t("error",{message:i,actionLabel:l?d:void 0,onAction:l?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function Ya({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){rt("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){rt("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function Ts(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function or(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function cr(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function _d(){const e=cr();return e||(nn||(nn=Ts(ad).catch(t=>{throw nn=null,t}).then(()=>{const t=cr();if(!t)throw nn=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),nn)}async function $d(){const e=or();return e||(tn||(tn=Ts(sd).catch(t=>{throw tn=null,t}).then(()=>{const t=or();if(!t)throw tn=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),tn)}async function Td(){if(window.html2pdf||await Ts(nd),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}Wl(),vd()}function S(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function jd(e="reservation"){return e==="project"?"QP":"Q"}function Pd(e,t="reservation"){const n=Number(e),a=jd(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function Nd(){const e=window.localStorage?.getItem?.(di),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function ji(e="reservation"){const n=Nd()+1;return{sequence:n,quoteNumber:Pd(n,e)}}function Cd(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(di,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function Pi(e="reservation"){return sr[e]||sr.reservation}function Ld(e="reservation"){try{const t=Pi(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function Bd(e,t="reservation"){try{const n=Pi(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function Dd(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function Fd(e,t="reservation"){if(!e)return null;const n=hi(t),a=vi(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,d])=>{const l=i[c];if(l==null)return;const{ids:u,emptyExplicitly:p}=Dd(l);if(!u&&!p)return;const f=Array.isArray(u)?u.filter(m=>d.has(m)):[];(f.length>0||p)&&(r[c]=f)}),{version:1,sections:s,fields:r}}function Ni(e){if(!e)return;const t=e.context||"reservation",n=Fd(e,t);n&&Bd(n,t)}function Ci(e){if(!e)return;const t=e.context||"reservation",n=Ld(t);if(!n)return;const a=hi(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=Is(e.fields||ya(t)),i=vi(t);Object.entries(n.fields).forEach(([c,d])=>{const l=i[c];if(!l)return;const u=Array.isArray(d)?d.filter(p=>l.has(p)):[];r[c]=new Set(u)}),e.fields=r}}function Li(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function Bi(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return 0}function Rd(e={}){const t=[e.dailyTotal,e.daily_total,e.totalRate,e.total,e.total_wage];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return Bi(e)}function Md(e){const t=gn()||[],{technicians:n=[]}=pe(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const i=String(r.id),c=s.get(i)||{};s.set(i,{...c,...r})}),(e.technicians||[]).map(r=>s.get(String(r))).filter(Boolean)}function Hd(e,t,n){const{projectLinked:a}=gt(e,n),s=aa(e.start,e.end),c=(Array.isArray(e.items)?e.items:[]).reduce((B,P)=>B+(Number(P?.qty)||1)*(Number(P?.price)||0),0)*s,d=t.reduce((B,P)=>B+Bi(P),0),l=t.reduce((B,P)=>B+Rd(P),0),u=d*s,p=l*s,f=c+p,m=parseFloat(e.discount)||0,y=e.discountType==="amount"?m:f*(m/100),g=Math.max(0,f-y),b=a?!1:e.applyTax,w=Number(e.cost),v=Number.isFinite(w),A=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,L=A!=null?parseFloat(h(String(A).replace("%","").trim())):NaN,O=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let x=(O!=null?O===!0||O===1||O==="1"||String(O).toLowerCase()==="true":Number.isFinite(L)&&L>0)&&Number.isFinite(L)?Number(L):0;b&&x<=0&&(x=it);let k=x>0?Math.max(0,g*(x/100)):0;k=Number(k.toFixed(2));const $=g+k;let T=b?$*.15:0;(!Number.isFinite(T)||T<0)&&(T=0),T=Number(T.toFixed(2));const j=$+T,N=Number.isFinite(j)?Number(j.toFixed(2)):0,z=a?N:v?w:N,F=Math.max(0,c+p-y),R=Math.max(0,F-u),_={equipmentTotal:c,crewTotal:p,crewCostTotal:u,discountAmount:y,subtotalAfterDiscount:g,taxableAmount:$,taxAmount:T,finalTotal:z,companySharePercent:x,companyShareAmount:k,netProfit:R},G={equipmentTotal:h(c.toFixed(2)),crewTotal:h(p.toFixed(2)),discountAmount:h(y.toFixed(2)),subtotalAfterDiscount:h(g.toFixed(2)),taxableAmount:h($.toFixed(2)),taxAmount:h(T.toFixed(2)),finalTotal:h(z.toFixed(2)),companySharePercent:h(x.toFixed(2)),companyShareAmount:h(k.toFixed(2)),netProfit:h(R.toFixed(2))};return{totals:_,totalsDisplay:G,rentalDays:s}}function Ut(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function Di(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Od(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=Ut(e.amount??(n==="amount"?e.value:null)),s=Ut(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=Di(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function zd(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(Od).filter(Boolean);if(n.length>0)return n;const a=Ut(e.paidPercent??e.paid_percent),s=Ut(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Di(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function Vd(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function Ud(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function Kd(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function Qd(e){const t=Number(e?.equipmentEstimate)||0,n=Kd(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const d=Math.max(0,a-c),l=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,p=l&&s&&u>0?u:0,f=p>0?Number((d*(p/100)).toFixed(2)):0,m=d+f;let y=s?m*ri:0;(!Number.isFinite(y)||y<0)&&(y=0),y=Number(y.toFixed(2));let g=s?Number(e?.totalWithTax):m;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((m+y).toFixed(2))):g=m,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:d,companyShareAmount:f,subtotal:m,applyTax:s,taxAmount:y,totalWithTax:g}}function Gd(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.technicians)?e.technicians:[],i=cs(t,a,s,!1,r,{start:e.start,end:e.end});if(Number.isFinite(i))return i;const c=Number(h(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function Wd(e,t){if(!e)return"—";const n=Fe(e);return t?`${n} - ${Fe(t)}`:n}function re(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${h(a.toFixed(s))} ${t}`}function lr(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function Xd(e){if(!e?.start)return null;if(!e?.end)return 1;const t=aa(e.start,e.end);return Number.isFinite(t)?t:1}function Jd(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function Yd(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=pe(),i=e?.id!=null?s.find(D=>String(D.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:re(0,t),expensesTotal:re(0,t),reservationsTotal:re(0,t),discountAmount:re(0,t),taxAmount:re(0,t),overallTotal:re(0,t),paidAmount:re(0,t),remainingAmount:re(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:re(0,t),remainingAmountDisplay:re(0,t),paidPercentDisplay:lr(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const d=i.clientId??i.customerId??i.client_id??i.customer_id??null,l=d!=null&&n.find(D=>String(D.id)===String(d))||null,u=l?.customerName??l?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),p=(i.clientCompany||l?.companyName||l?.company||"").trim(),f=l?.phone??l?.customerPhone??i.clientPhone??i.customerPhone??"",m=f?h(String(f).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),y=l?.email??i.clientEmail??i.customerEmail??"",g=y?String(y).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),b=i.projectCode||`PRJ-${h(String(i.id??""))}`,w=h(String(b)),v=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),A=Vd(i.type),L=i.start?Fe(i.start):"—",O=i.end?Fe(i.end):"—",q=Xd(i),x=q!=null?Jd(q):"غير محدد",k=Ud(i),$={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},T=o(`projects.status.${k}`,$[k]||k),j=i.id!=null?String(i.id):null,N=j?a.filter(D=>String(D.projectId)===j):[],F=N.map(D=>{const ie=D.reservationId||D.id||"",xe=D.status||D.state||"pending",he=String(xe).toLowerCase(),Y=o(`reservations.status.${he}`,he),ke=Gd(D),Le=D.start?new Date(D.start).getTime():0;return{reservationId:h(String(ie||"-")),status:he,statusLabel:Y,total:ke,totalLabel:re(ke,t),dateRange:Wd(D.start,D.end),startTimestamp:Number.isNaN(Le)?0:Le}}).sort((D,ie)=>ie.startTimestamp-D.startTimestamp).map(({startTimestamp:D,...ie})=>ie).reduce((D,ie)=>D+(Number(ie.total)||0),0),R=new Map;N.forEach(D=>{const ie=Array.isArray(D.items)?D.items:[],xe=aa(D.start,D.end),he=D.reservationId||D.id||"";ie.forEach((Y,ke)=>{if(!Y)return;const Le=Y.barcode||Y.code||Y.id||Y.desc||Y.description||`item-${ke}`,Ze=String(Le||`item-${ke}`),ct=R.get(Ze)||{description:Y.desc||Y.description||Y.name||Y.barcode||`#${h(String(ke+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},Rt=Number(Y.qty)||1,ne=Number(Y.price)||0;ct.totalQuantity+=Rt,ct.reservationIds.add(String(he));const Se=ne*Rt*Math.max(1,xe);Number.isFinite(Se)&&(ct.totalCost+=Se),R.set(Ze,ct)})});const _=Array.from(R.values()).map(D=>({description:D.description,totalQuantity:D.totalQuantity,reservationsCount:D.reservationIds.size,displayCost:re(D.totalCost,t)})),G=new Map((r||[]).filter(Boolean).map(D=>[String(D.id),D])),B=new Map,P=D=>{if(!D)return;let ie=null;typeof D=="object"?ie=D.id??D.technicianId??D.technician_id??D.userId??D.user_id??null:(typeof D=="string"||typeof D=="number")&&(ie=D);const xe=ie!=null?String(ie):null,he=xe&&G.has(xe)?G.get(xe):typeof D=="object"?D:null,Y=he?.name||he?.full_name||he?.fullName||he?.displayName||(typeof D=="string"?D:null),ke=he?.role||he?.title||null,Le=he?.phone||he?.mobile||he?.contact||null;if(!Y&&!xe)return;const Ze=xe||Y;B.has(Ze)||B.set(Ze,{id:xe,name:Y||"-",role:ke||null,phone:Le||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(D=>P(D)),N.forEach(D=>{(Array.isArray(D.technicians)?D.technicians:[]).forEach(xe=>P(xe))});const K=Array.from(B.values()),M=Array.isArray(i.expenses)?i.expenses.map(D=>{const ie=Number(D?.amount)||0;return{label:D?.label||D?.name||"-",amount:ie,displayAmount:re(ie,t),note:D?.note||D?.description||""}}):[],H=Qd(i),U=H.applyTax?Number(((H.subtotal+F)*ri).toFixed(2)):0,ce=Number((H.subtotal+F+U).toFixed(2)),oe=zd(i),ae=Ut(i.paidAmount??i.paid_amount)||0,W=Ut(i.paidPercent??i.paid_percent)||0,se=ls({totalAmount:ce,paidAmount:ae,paidPercent:W,history:oe}),de=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",ye=ds({manualStatus:de,paidAmount:se.paidAmount,paidPercent:se.paidPercent,totalAmount:ce}),we={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},V=o(`projects.paymentStatus.${ye}`,we[ye]||ye),X=Number(se.paidAmount||0),te=Number(se.paidPercent||0),ue=Math.max(0,Number((ce-X).toFixed(2))),je={projectSubtotal:re(H.subtotal,t),expensesTotal:re(H.expensesTotal,t),reservationsTotal:re(F,t),discountAmount:re(H.discountAmount,t),taxAmount:re(U,t),overallTotal:re(ce,t),paidAmount:re(X,t),remainingAmount:re(ue,t)},qt={status:ye,statusLabel:V,paidAmount:X,paidPercent:te,remainingAmount:ue,paidAmountDisplay:re(X,t),remainingAmountDisplay:re(ue,t),paidPercentDisplay:lr(te)},J=(i.description||"").trim();return{project:i,customer:l,clientInfo:{name:u,company:p||"—",phone:m,email:g},projectInfo:{title:v,code:w,typeLabel:A,startDisplay:L,endDisplay:O,durationLabel:x,statusLabel:T},expenses:M,equipment:_,crew:K,totals:H,totalsDisplay:je,projectTotals:{combinedTaxAmount:U,overallTotal:ce,reservationsTotal:F,paidAmount:X,paidPercent:te,remainingAmount:ue,paymentStatus:ye},paymentSummary:qt,notes:J,currencyLabel:t,projectStatus:k,projectStatusLabel:T,projectDurationDays:q,projectDurationLabel:x,paymentHistory:oe}}function Zd({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:d={},currencyLabel:l="SR",sections:u,fieldSelections:p={},quoteNumber:f,quoteDate:m,terms:y=Ce}){const g=Is(p),b=(V,X)=>As(g,V,X),w=V=>u?.has?.(V),v=`<div class="quote-placeholder">${S(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,A=(V,X)=>`<div class="info-plain__item">
      <span class="info-plain__label">${S(V)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${S(X)}</span>
    </div>`,L=(V,X,{variant:te="inline"}={})=>te==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${S(V)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${S(X)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${S(V)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${S(X)}</span>
    </span>`,O=(V,X)=>`<div class="payment-row">
      <span class="payment-row__label">${S(V)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${S(X)}</span>
    </div>`,q=[];b("customerInfo","customerName")&&q.push(A(o("projects.details.client","العميل"),t.name||"-")),b("customerInfo","customerCompany")&&q.push(A(o("projects.details.company","شركة العميل"),t.company||"—")),b("customerInfo","customerPhone")&&q.push(A(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),b("customerInfo","customerEmail")&&q.push(A(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const x=w("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${S(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${q.length?`<div class="info-plain">${q.join("")}</div>`:v}
      </section>`:"",k=[];b("projectInfo","projectType")&&k.push(A(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),b("projectInfo","projectTitle")&&k.push(A(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),b("projectInfo","projectCode")&&k.push(A(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),b("projectInfo","projectStart")&&k.push(A(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),b("projectInfo","projectEnd")&&k.push(A(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),b("projectInfo","projectDuration")&&k.push(A(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),b("projectInfo","projectStatus")&&k.push(A(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const $=w("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${S(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${k.length?`<div class="info-plain">${k.join("")}</div>`:v}
      </section>`:"",T=fi.filter(V=>b("projectCrew",V.id)),j=w("projectCrew")?T.length?`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${T.map(V=>`<th>${S(V.labelKey?o(V.labelKey,V.fallback):V.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((V,X)=>`<tr>${T.map(te=>`<td>${te.render(V,X)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(T.length,1)}" class="empty">${S(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${v}
          </section>`:"",N=[];b("financialSummary","projectSubtotal")&&N.push(L(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${re(0,l)}`)),b("financialSummary","expensesTotal")&&N.push(L(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||re(0,l))),b("financialSummary","reservationsTotal")&&N.push(L(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||re(0,l))),b("financialSummary","discountAmount")&&N.push(L(o("reservations.details.labels.discount","الخصم"),i.discountAmount||re(0,l))),b("financialSummary","taxAmount")&&N.push(L(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||re(0,l)));const z=[];b("financialSummary","overallTotal")&&z.push(L(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||re(0,l),{variant:"final"})),b("financialSummary","paidAmount")&&z.push(L(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||re(0,l),{variant:"final"})),b("financialSummary","remainingAmount")&&z.push(L(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||re(0,l),{variant:"final"}));const F=w("financialSummary")?!N.length&&!z.length?`<section class="quote-section quote-section--financial">${v}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${S(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${N.length?`<div class="totals-inline">${N.join("")}</div>`:""}
            ${z.length?`<div class="totals-final">${z.join("")}</div>`:""}
          </div>
        </section>`:"",R=yi.filter(V=>b("projectExpenses",V.id)),_=w("projectExpenses")?R.length?`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${R.map(V=>`<th>${S(V.labelKey?o(V.labelKey,V.fallback):V.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((V,X)=>`<tr>${R.map(te=>`<td>${te.render(V,X)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(R.length,1)}" class="empty">${S(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${v}
          </section>`:"",G=gi.filter(V=>b("projectEquipment",V.id)),B=w("projectEquipment")?G.length?`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${G.map(V=>`<th>${S(V.labelKey?o(V.labelKey,V.fallback):V.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${r.length?r.map((V,X)=>`<tr>${G.map(te=>`<td>${te.render(V,X)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(G.length,1)}" class="empty">${S(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${v}
          </section>`:"",P=(e?.description||"").trim()||"",K=w("projectNotes")?`<section class="quote-section">
        <h3>${S(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${S(P||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",M=[];b("payment","beneficiary")&&M.push(O(o("reservations.quote.labels.beneficiary","اسم المستفيد"),qe.beneficiaryName)),b("payment","bank")&&M.push(O(o("reservations.quote.labels.bank","اسم البنك"),qe.bankName)),b("payment","account")&&M.push(O(o("reservations.quote.labels.account","رقم الحساب"),h(qe.accountNumber))),b("payment","iban")&&M.push(O(o("reservations.quote.labels.iban","رقم الآيبان"),h(qe.iban)));const H=`<section class="quote-section">
      <div class="payment-block">
        <h3>${S(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${M.length?M.join(""):v}</div>
      </div>
      <p class="quote-approval-note">${S(qe.approvalNote)}</p>
    </section>`,U=Array.isArray(y)&&y.length?y:Ce,ce=`<footer class="quote-footer">
        <h4>${S(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${U.map(V=>`<li>${S(V)}</li>`).join("")}</ul>
      </footer>`,oe=[],ae=[];if($&&ae.push({key:"project",html:$}),x&&ae.push({key:"customer",html:x}),ae.length>1){const V=ae.find(ue=>ue.key==="project"),X=ae.find(ue=>ue.key==="customer"),te=[];V?.html&&te.push(V.html),X?.html&&te.push(X.html),oe.push(be(`<div class="quote-section-row quote-section-row--primary">${te.join("")}</div>`,{blockType:"group"}))}else ae.length===1&&oe.push(be(ae[0].html));const W=[];j&&W.push(be(j,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),_&&W.push(be(_,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),B&&W.push(be(B,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const se=[];F&&se.push(be(F,{blockType:"summary"})),K&&se.push(be(K));const de=[be(H,{blockType:"payment"}),be(ce,{blockType:"footer"})],ye=[...Xn(oe,"projects.quote.placeholder.primary"),...W,...Xn(se,"projects.quote.placeholder.summary"),...de],we=`
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
      <style>${Si}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${we}
          ${ye.join("")}
        </div>
      </div>
    </div>
  `}function Fi(e){if(e?.context==="project")return Zd(e);const{reservation:t,customer:n,project:a,technicians:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:d,sections:l,fieldSelections:u={},quoteNumber:p,quoteDate:f,terms:m=Ce}=e,y=h(String(t?.reservationId??t?.id??"")),g=t.start?h(Fe(t.start)):"-",b=t.end?h(Fe(t.end)):"-",w=n?.customerName||n?.full_name||n?.name||"-",v=n?.phone||"-",A=n?.email||"-",L=n?.company||n?.company_name||"-",O=h(v),q=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),x=a?.code||a?.projectCode||"",k=h(String(c)),$=t?.notes||"",T=Array.isArray(m)&&m.length?m:Ce,j=Is(u),N=(ne,Se)=>As(j,ne,Se),z=ne=>l?.has?.(ne),F=`<div class="quote-placeholder">${S(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,R=(ne,Se)=>`<div class="info-plain__item">${S(ne)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${S(Se)}</strong></div>`,_=(ne,Se,{variant:St="inline"}={})=>St==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${S(ne)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${S(Se)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${S(ne)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${S(Se)}</span>
    </span>`,G=(ne,Se)=>`<div class="payment-row">
      <span class="payment-row__label">${S(ne)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${S(Se)}</span>
    </div>`,B=[];N("customerInfo","customerName")&&B.push(R(o("reservations.details.labels.customer","العميل"),w)),N("customerInfo","customerCompany")&&B.push(R(o("reservations.details.labels.company","الشركة"),L)),N("customerInfo","customerPhone")&&B.push(R(o("reservations.details.labels.phone","الهاتف"),O)),N("customerInfo","customerEmail")&&B.push(R(o("reservations.details.labels.email","البريد"),A));const P=z("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${S(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${B.length?`<div class="info-plain">${B.join("")}</div>`:F}
      </section>`:"",K=[];N("reservationInfo","reservationId")&&K.push(R(o("reservations.details.labels.reservationId","رقم الحجز"),y||"-")),N("reservationInfo","reservationStart")&&K.push(R(o("reservations.details.labels.start","بداية الحجز"),g)),N("reservationInfo","reservationEnd")&&K.push(R(o("reservations.details.labels.end","نهاية الحجز"),b)),N("reservationInfo","reservationDuration")&&K.push(R(o("reservations.details.labels.duration","عدد الأيام"),k));const M=z("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${S(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${K.length?`<div class="info-plain">${K.join("")}</div>`:F}
      </section>`:"",H=[];N("projectInfo","projectTitle")&&H.push(R(o("reservations.details.labels.project","المشروع"),q)),N("projectInfo","projectCode")&&H.push(R(o("reservations.details.labels.code","الرمز"),x||"-"));const U=z("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${S(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${H.length?`<div class="info-plain">${H.join("")}</div>`:F}
      </section>`:"",ce=[];N("financialSummary","equipmentTotal")&&ce.push(_(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${d}`)),N("financialSummary","crewTotal")&&ce.push(_(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${d}`)),N("financialSummary","discountAmount")&&ce.push(_(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${d}`)),N("financialSummary","taxAmount")&&ce.push(_(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${d}`));const oe=N("financialSummary","finalTotal"),ae=[];oe&&ae.push(_(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${d}`,{variant:"final"}));const W=ae.length?`<div class="totals-final">${ae.join("")}</div>`:"",se=z("financialSummary")?!ce.length&&!oe?`<section class="quote-section quote-section--financial">${F}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${S(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${ce.length?`<div class="totals-inline">${ce.join("")}</div>`:""}
            ${W}
          </div>
        </section>`:"",de=mi.filter(ne=>N("items",ne.id)),ye=de.length>0,we=ye?de.map(ne=>`<th>${S(ne.labelKey?o(ne.labelKey,ne.fallback):ne.fallback)}</th>`).join(""):"",X=Array.isArray(t.items)&&t.items.length>0?t.items.map((ne,Se)=>`<tr>${de.map(St=>`<td>${St.render(ne,Se)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(de.length,1)}" class="empty">${S(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,te=z("items")?ye?`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${we}</tr>
              </thead>
              <tbody>${X}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.items.title","المعدات"))}</h3>
            ${F}
          </section>`:"",ue=pi.filter(ne=>N("crew",ne.id)),je=ue.length>0,qt=je?ue.map(ne=>`<th>${S(ne.labelKey?o(ne.labelKey,ne.fallback):ne.fallback)}</th>`).join(""):"",J=s.length?s.map((ne,Se)=>`<tr>${ue.map(St=>`<td>${St.render(ne,Se)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(ue.length,1)}" class="empty">${S(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,ge=z("crew")?je?`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${qt}</tr>
              </thead>
              <tbody>${J}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${F}
          </section>`:"",D=z("notes")?`<section class="quote-section">
        <h3>${S(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${S($||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",ie=[];N("payment","beneficiary")&&ie.push(G(o("reservations.quote.labels.beneficiary","اسم المستفيد"),qe.beneficiaryName)),N("payment","bank")&&ie.push(G(o("reservations.quote.labels.bank","اسم البنك"),qe.bankName)),N("payment","account")&&ie.push(G(o("reservations.quote.labels.account","رقم الحساب"),h(qe.accountNumber))),N("payment","iban")&&ie.push(G(o("reservations.quote.labels.iban","رقم الآيبان"),h(qe.iban)));const xe=`<section class="quote-section">
      <div class="payment-block">
        <h3>${S(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${ie.length?ie.join(""):F}</div>
      </div>
      <p class="quote-approval-note">${S(qe.approvalNote)}</p>
    </section>`,he=`<footer class="quote-footer">
        <h4>${S(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${T.map(ne=>`<li>${S(ne)}</li>`).join("")}</ul>
      </footer>`,Y=[];P&&M?Y.push(be(`<div class="quote-section-row">${P}${M}</div>`,{blockType:"group"})):(M&&Y.push(be(M)),P&&Y.push(be(P))),U&&Y.push(be(U));const ke=[];te&&ke.push(be(te,{blockType:"table",extraAttributes:'data-table-id="items"'})),ge&&ke.push(be(ge,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const Le=[];se&&Le.push(be(se,{blockType:"summary"})),D&&Le.push(be(D));const Ze=[be(xe,{blockType:"payment"}),be(he,{blockType:"footer"})],ct=[...Xn(Y,"reservations.quote.placeholder.page1"),...ke,...Xn(Le,"reservations.quote.placeholder.page2"),...Ze],Rt=`
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
      <style>${Si}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Rt}
          ${ct.join("")}
        </div>
      </div>
    </div>
  `}function eu(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function mn(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>eu(c)),i=[s,...r].map(c=>c.catch(d=>(rt("asset load failed",d),ud(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function Ri(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await Ti(r),await mn(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let d=null,l=null;const u=q=>{q.style.margin="0 auto",q.style.breakInside="avoid",q.style.pageBreakInside="avoid",q.style.pageBreakAfter="auto",q.style.breakAfter="auto"},p=()=>{const q=a.createElement("div"),x=s.childElementCount===0;if(q.className="quote-page",q.dataset.pageIndex=String(s.childElementCount),x){q.classList.add("quote-page--primary");const $=i.cloneNode(!0);$.removeAttribute("data-quote-header-template"),q.appendChild($)}else q.classList.add("quote-page--continuation");const k=a.createElement("main");k.className="quote-body",q.appendChild(k),s.appendChild(q),u(q),d=q,l=k},f=()=>{(!d||!l||!l.isConnected)&&p()},m=()=>{if(!d||!l||l.childElementCount>0)return;const q=d;d=null,l=null,q.parentNode&&q.parentNode.removeChild(q)},y=()=>{d=null,l=null},g=()=>d?d.scrollHeight-d.clientHeight>id:!1,b=(q,{allowOverflow:x=!1}={})=>(f(),l.appendChild(q),g()&&!x?(l.removeChild(q),m(),!1):!0),w=q=>{const x=q.cloneNode(!0);x.removeAttribute?.("data-quote-block"),x.removeAttribute?.("data-block-type"),x.removeAttribute?.("data-table-id"),!b(x)&&(y(),!b(x)&&b(x,{allowOverflow:!0}))},v=q=>{const x=q.querySelector("table");if(!x){w(q);return}const k=q.querySelector("h3"),$=x.querySelector("thead"),T=Array.from(x.querySelectorAll("tbody tr"));if(!T.length){w(q);return}let j=null,N=0;const z=(R=!1)=>{const _=q.cloneNode(!1);_.removeAttribute("data-quote-block"),_.removeAttribute("data-block-type"),_.removeAttribute("data-table-id"),_.classList.add("quote-section--table-fragment"),R&&_.classList.add("quote-section--table-fragment--continued");const G=k?k.cloneNode(!0):null;G&&_.appendChild(G);const B=x.cloneNode(!1);B.classList.add("quote-table--fragment"),$&&B.appendChild($.cloneNode(!0));const P=a.createElement("tbody");return B.appendChild(P),_.appendChild(B),{section:_,body:P}},F=(R=!1)=>j||(j=z(R),b(j.section)||(y(),b(j.section)||b(j.section,{allowOverflow:!0})),j);T.forEach(R=>{F(N>0);const _=R.cloneNode(!0);if(j.body.appendChild(_),g()&&(j.body.removeChild(_),j.body.childElementCount||(l.removeChild(j.section),j=null,m()),y(),j=null,F(N>0),j.body.appendChild(_),g())){j.section.classList.add("quote-section--table-fragment--overflow"),N+=1;return}N+=1}),j=null};if(!c.length)return;c.forEach(q=>{q.getAttribute("data-block-type")==="table"?v(q):w(q)});const A=Array.from(s.children),L=[];if(A.forEach((q,x)=>{const k=q.querySelector(".quote-body");if(x!==0&&(!k||k.childElementCount===0)){q.remove();return}L.push(q)}),!n){const q=a.defaultView||window,x=Math.min(3,Math.max(1,q.devicePixelRatio||1)),k=ga()?Math.min(2,x):x;L.forEach($=>kd($,{pixelRatio:k}))}L.forEach((q,x)=>{const k=x===0;q.style.pageBreakAfter="auto",q.style.breakAfter="auto",q.style.pageBreakBefore=k?"auto":"always",q.style.breakBefore=k?"auto":"page",n?q.style.boxShadow="":q.style.boxShadow="none"});const O=L[L.length-1]||null;d=O,l=O?.querySelector(".quote-body")||null,await mn(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function js(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function tu(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([$d(),_d()]),c=e.ownerDocument||document,d=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,d,c?.documentElement?.getAttribute?.("dir")].some(q=>typeof q=="string"&&q.toLowerCase().startsWith("rtl")),p=typeof window<"u"&&window.devicePixelRatio||1,f=$s(),m=Ai(),y=ga();let g;y?g=1.5:m?g=Math.min(1.7,Math.max(1.2,p*1.1)):f?g=Math.min(1.8,Math.max(1.25,p*1.2)):g=Math.min(2,Math.max(1.6,p*1.4));const b=y||m?.9:f?.92:.95,w=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),v={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let A=0;const L=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let q=0;q<s.length;q+=1){const x=s[q];await Ti(x),await mn(x);const k=x.ownerDocument||document,$=k.createElement("div");Object.assign($.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const T=x.cloneNode(!0);T.style.width=`${Ln}px`,T.style.maxWidth=`${Ln}px`,T.style.minWidth=`${Ln}px`,T.style.height=`${Bn}px`,T.style.maxHeight=`${Bn}px`,T.style.minHeight=`${Bn}px`,T.style.position="relative",T.style.background="#ffffff",js(T),$.appendChild(T),k.body.appendChild($);let j;try{await mn(T),j=await i(T,{...v,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(P){throw Ja(P,"pageCapture",{toastMessage:L}),P}finally{$.parentNode?.removeChild($)}if(!j)continue;const N=j.width||1,F=(j.height||1)/N;let R=Ga,_=R*F,G=0;if(_>Cn){const P=Cn/_;_=Cn,R=R*P,G=Math.max(0,(Ga-R)/2)}const B=j.toDataURL("image/jpeg",b);A>0&&w.addPage(),w.addImage(B,"JPEG",G,0,R,_,`page-${A+1}`,"FAST"),A+=1,await new Promise(P=>window.requestAnimationFrame(P))}}catch(q){throw Ya({safariWindowRef:n,mobileWindowRef:a}),q}if(A===0)throw Ya({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(m||y){const q=w.output("blob");if(y){const x=URL.createObjectURL(q);ln();try{window.location.assign(x)}catch(k){rt("mobile safari blob navigation failed",k)}finally{setTimeout(()=>URL.revokeObjectURL(x),6e4)}}else{const x=URL.createObjectURL(q),k=()=>m&&n&&!n.closed?n:a&&!a.closed?a:null,$=(j,N)=>{if(ln(),!j){window.location.assign(N);return}try{j.location.replace(N),j.focus?.()}catch(z){rt("direct blob navigation failed",z);try{j.document.open(),j.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${S(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${N}" title="PDF preview"></iframe></body></html>`),j.document.close()}catch(F){rt("iframe blob delivery failed",F),window.location.assign(N)}}},T=k();$(T,x),setTimeout(()=>URL.revokeObjectURL(x),6e4)}}else{ln();const q=w.output("bloburl"),x=document.createElement("a");x.href=q,x.download=t,x.rel="noopener",x.style.display="none",document.body.appendChild(x),x.click(),setTimeout(()=>{URL.revokeObjectURL(q),x.remove()},2e3)}}function Ft(){if(!C||!Q)return;const{previewFrame:e}=Q;if(!e)return;const t=C.context||"reservation",n=Fi({context:t,reservation:C.reservation,customer:C.customer,project:C.project,technicians:C.technicians,totals:C.totals,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,fieldSelections:C.fields,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel,terms:C.terms,projectCrew:C.projectCrew,projectExpenses:C.projectExpenses,projectEquipment:C.projectEquipment,projectInfo:C.projectInfo,clientInfo:C.clientInfo,paymentSummary:C.paymentSummary,projectTotals:C.projectTotals});$t("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&(li(r),oi(r,s),ci(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await Ri(i,{context:"preview"}),js(i))}catch(m){console.error("[reservations/pdf] failed to layout preview document",m)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),d=a?.querySelector(".quote-preview-pages"),l=Ln;let u=18;if(d&&a?.defaultView){const m=a.defaultView.getComputedStyle(d),y=parseFloat(m.rowGap||m.gap||`${u}`);Number.isFinite(y)&&y>=0&&(u=y)}const p=Bn,f=c.length?c.length*p+Math.max(0,(c.length-1)*u):p;if(e.dataset.baseWidth=String(l),e.dataset.baseHeight=String(f),e.style.width=`${l}px`,e.style.minWidth=`${l}px`,e.style.height=`${f}px`,e.style.minHeight=`${f}px`,Q?.previewFrameWrapper&&!Q?.userAdjustedZoom){const m=Q.previewFrameWrapper.clientWidth-24;m>0&&m<l?Qe=Math.max(m/l,.3):Qe=1}Hi(Qe)}finally{ln()}},{once:!0})}function nu(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?C.sections.add(n):C.sections.delete(n),Ni(C),Mi(),Ft())}function au(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=C.context||"reservation",r=C.fields||(C.fields=ya(s)),i=md(r,n);t.checked?i.add(a):i.delete(a),Ni(C),Ft()}function su(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(_s(C,n),C.sectionExpansions[n]=t.open)}function Mi(){if(!Q?.toggles||!C)return;const{toggles:e}=Q,t=C.fields||{},n=C.context||"reservation";_s(C);const a=fa(n),s=bi(n),r=a.map(({id:i,labelKey:c,fallback:d})=>{const l=o(c,d),u=C.sections.has(i),p=s[i]||[],f=pd(C,i),m=p.length?`<div class="quote-toggle-sublist">
          ${p.map(y=>{const g=As(t,i,y.id),b=u?"":"disabled",w=y.labelKey?o(y.labelKey,y.fallback):y.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${y.id}" ${g?"checked":""} ${b}>
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
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",nu)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",au)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",su)})}function ru(){if(Q?.modal)return Q;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
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
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(p),n.innerHTML="";const y=document.createElement("div");y.className="quote-preview-scroll",y.appendChild(m),n.appendChild(y);const g=document.createElement("div");g.className="quote-preview-status",g.setAttribute("role","status"),g.setAttribute("aria-live","polite"),g.hidden=!0,g.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${S(qi("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(f),i?.addEventListener("click",async()=>{if(C){i.disabled=!0;try{await Oi()}finally{i.disabled=!1}}});const b=()=>{Wa()||Xa(e)};l.forEach(L=>{L?.addEventListener("click",b)}),d&&!l.includes(d)&&d.addEventListener("click",b),e.addEventListener("click",L=>{Wa()||L.target===e&&Xa(e)}),Q={modal:e,toggles:t,preview:n,previewScroll:y,previewFrameWrapper:m,zoomControls:f,zoomValue:f.querySelector("[data-zoom-value]"),previewFrame:p,meta:a,downloadBtn:i,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const w=f.querySelector("[data-zoom-out]"),v=f.querySelector("[data-zoom-in]"),A=f.querySelector("[data-zoom-reset]");return w?.addEventListener("click",()=>dr(-.1)),v?.addEventListener("click",()=>dr(.1)),A?.addEventListener("click",()=>Jn(1,{markManual:!0})),s&&s.addEventListener("input",ou),r&&r.addEventListener("click",cu),Jn(Qe),Q}function Jn(e,{silent:t=!1,markManual:n=!1}={}){Qe=Math.min(Math.max(e,.25),2.2),n&&Q&&(Q.userAdjustedZoom=!0),Hi(Qe),!t&&Q?.zoomValue&&(Q.zoomValue.textContent=`${Math.round(Qe*100)}%`)}function dr(e){Jn(Qe+e,{markManual:!0})}function Hi(e){if(!Q?.previewFrame||!Q.previewFrameWrapper)return;const t=Q.previewFrame,n=Q.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",$s()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function iu(){if(!Q?.meta||!C)return;const{meta:e}=Q;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${S(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${S(C.quoteNumber)}</strong></div>
      <div><span>${S(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${S(C.quoteDateLabel)}</strong></div>
    </div>
  `}function Ps(){if(!Q?.termsInput)return;const e=(C?.terms&&C.terms.length?C.terms:Ce).join(`
`);Q.termsInput.value!==e&&(Q.termsInput.value=e)}function ou(e){if(!C)return;const t=Ua(e?.target?.value??"");if(t.length){C.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{C.terms=[...Ce],Ps();const n=Ce.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}Ft()}function cu(e){if(e?.preventDefault?.(),!C)return;C.terms=[...Ce];const t=document.getElementById("reservation-terms");t&&(t.value=Ce.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=Ce.join(`
`)),Ps(),Ft()}async function Oi(){if(!C)return;$t("export");const t=!$s()&&Ai(),n=ga(),a=null,s=!n&&t?window.open("","_blank"):null;(d=>{if(d)try{d.document.open(),d.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${S(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${S(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${S(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),d.document.close()}catch(l){rt("failed to prime download window",l)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await Td(),$a("html2pdf ensured");const d=C.context||"reservation",l=Fi({context:d,reservation:C.reservation,customer:C.customer,project:C.project,technicians:C.technicians,totals:C.totals,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,fieldSelections:C.fields,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel,terms:C.terms,projectCrew:C.projectCrew,projectExpenses:C.projectExpenses,projectEquipment:C.projectEquipment,projectInfo:C.projectInfo,clientInfo:C.clientInfo,paymentSummary:C.paymentSummary,projectTotals:C.projectTotals});i=document.createElement("div"),i.innerHTML=l,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),li(i),oi(i),ci(i),$a("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await Ri(u,{context:"export"}),await mn(u),js(u),$a("layout complete for export document")}catch(f){Ja(f,"layoutQuoteDocument",{suppressToast:!0})}}const p=`quotation-${C.quoteNumber}.pdf`;await tu(u,{filename:p,safariWindowRef:s,mobileWindowRef:a}),C.sequenceCommitted||(Cd(C.quoteSequence),C.sequenceCommitted=!0)}catch(d){Ya({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,Ja(d,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),ln()}}function zi(){const e=ru();e?.modal&&(cn=!1,Qe=1,Q&&(Q.userAdjustedZoom=!1),Jn(Qe,{silent:!0}),Mi(),iu(),Ps(),Ft(),dd(e.modal))}async function lu({reservation:e,customer:t,project:n}){if(!e){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=Md(e),{totalsDisplay:s,totals:r,rentalDays:i}=Hd(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:d,quoteNumber:l}=ji("reservation"),u=new Date,p=Yl();C={context:"reservation",reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(fa("reservation").filter(f=>f.defaultSelected).map(f=>f.id)),sectionExpansions:ks("reservation"),fields:ya("reservation"),terms:p,quoteSequence:d,quoteNumber:l,quoteDate:u,quoteDateLabel:Li(u),sequenceCommitted:!1},Ci(C),zi()}async function im({project:e}){if(!e){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=Yd(e),{project:n}=t;if(!n){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=ji("project"),r=new Date,i=[...Jl];C={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(fa("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:ks("project"),fields:ya("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:Li(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},Ci(C),zi()}function du({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=gn(),{reservations:r=[],customers:i=[],technicians:c=[],projects:d=[]}=pe(),l=Array.isArray(s)?s:c||[],u=new Map((d||[]).map(b=>[String(b.id),b])),p=document.getElementById(e);if(!p){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){p.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const f=t||Fl(),m=new Map(i.map(b=>[String(b.id),b])),y=new Map(l.map(b=>[String(b.id),b])),g=Ol({reservations:r,filters:f,customersMap:m,techniciansMap:y,projectsMap:u});if(g.length===0){p.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}p.innerHTML=`<div class="reservations-grid">${zl({entries:g,customersMap:m,techniciansMap:y,projectsMap:u})}</div>`,p.querySelectorAll('[data-action="details"]').forEach(b=>{const w=Number(b.dataset.reservationIndex);Number.isNaN(w)||b.addEventListener("click",()=>{typeof n=="function"&&n(w)})}),p.querySelectorAll('button[data-action="confirm"]').forEach(b=>{const w=Number(b.dataset.reservationIndex);Number.isNaN(w)||b.addEventListener("click",v=>{v.stopPropagation(),typeof a=="function"&&a(w,v)})})}function uu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=pe(),c=s[e];if(!c)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=r.find(w=>String(w.id)===String(c.customerId)),l=c.projectId?i.find(w=>String(w.id)===String(c.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const w=gn()||[];u.innerHTML=Vl(c,d,w,e,l)}const p=document.getElementById("reservationDetailsModal"),f=()=>{p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(p)?.hide()},m=document.getElementById("reservation-details-edit-btn");m&&(m.onclick=()=>{f(),typeof t=="function"&&t(e,{reservation:c,customer:d,getEditContext:a})});const y=document.getElementById("reservation-details-delete-btn");y&&(y.onclick=()=>{f(),typeof n=="function"&&n(e,{reservation:c,customer:d})});const g=u?.querySelector('[data-action="open-project"]');g&&l&&g.addEventListener("click",()=>{f();const w=l?.id!=null?String(l.id):"",v=w?`projects.html?project=${encodeURIComponent(w)}`:"projects.html";window.location.href=v});const b=document.getElementById("reservation-details-export-btn");return b&&(b.onclick=async w=>{w?.preventDefault?.(),w?.stopPropagation?.(),b.blur();try{await lu({reservation:c,customer:d,project:l})}catch(v){console.error("❌ [reservations] export to PDF failed",v),E(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(p).show(),!0}function Vi(){const e=()=>{hn(),Te(),gn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let ur=!1,mr=null;function mu(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function om(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=mu(n);if(!a&&ur&&_t().length>0&&s===mr)return _t();try{const r=await Ar(n||{});return ur=!0,mr=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return _t()}}async function pu(e,{onAfterChange:t}={}){if(!Nt())return yn(),!1;const a=_t()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await Sc(s),Vi(),t?.({type:"deleted",reservation:a}),E(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=na(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return E(i,"error"),!1}}async function fu(e,{onAfterChange:t}={}){const a=_t()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=gt(a);if(r)return E(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await Ec(s);return Vi(),t?.({type:"confirmed",reservation:i}),E(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=na(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return E(c,"error"),!1}}function Jt(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:dn(e,n),end:dn(t,a)}}function Yn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ns(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function Ui(){const{container:e,select:t,hint:n,addButton:a}=Ns();if(!t)return;const s=t.value,r=vr(),i=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,d=r.map(u=>{const p=Number.isFinite(Number(u.price))?Number(u.price):0,f=h(p.toFixed(2)),m=`${u.name} — ${f} ${i}`;return`<option value="${Yn(u.id)}">${Yn(m)}</option>`}).join("");t.innerHTML=`${c}${d}`;const l=r.length>0;t.disabled=!l,a&&(a.disabled=!l),e&&(e.hidden=!l,e.setAttribute("aria-hidden",l?"false":"true")),n&&(l?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),l&&s&&r.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function yu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=ht(),{start:r,end:i}=Jt(),{reservations:c=[]}=pe(),d=a!=null&&c[a]||null,l=d?.id??d?.reservationId??null,u=Zr(n,{existingItems:s,start:r,end:i,ignoreReservationId:l});if(!u.success)return t||E(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const p=[...s,u.package];return vt(a,p),bt(p),Me(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function pr(){const{select:e}=Ns();if(!e)return;const t=e.value||"";yu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function gu(){const{addButton:e,select:t}=Ns();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{pr()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),pr())}),t.dataset.listenerAttached="true"),Ui()}function bt(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,yr(t);return}const d=Lt(e);t.innerHTML=d.map(l=>{const u=l.items[0]||{},p=Ct(u)||l.image,f=p?`<img src="${p}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=l.items.some(k=>k?.type==="package"),y=h(String(l.count)),g=Number.isFinite(Number(l.unitPrice))?Number(l.unitPrice):0,b=Number.isFinite(Number(l.totalPrice))?Number(l.totalPrice):g*l.count,w=`${h(g.toFixed(2))} ${a}`,v=`${h(b.toFixed(2))} ${a}`,A=l.barcodes.map(k=>h(String(k||""))).filter(Boolean),L=A.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${A.map(k=>`<li>${k}</li>`).join("")}
            </ul>
          </details>`:"";let O="";if(m){const k=new Map;if(l.items.forEach($=>{Array.isArray($?.packageItems)&&$.packageItems.forEach(T=>{if(!T)return;const j=ee(T.barcode||T.normalizedBarcode||T.desc||Math.random()),N=k.get(j),z=Number.isFinite(Number(T.qty))?Number(T.qty):1;if(N){N.qty+=z;return}k.set(j,{desc:T.desc||T.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:z,barcode:T.barcode??T.normalizedBarcode??""})})}),k.size){const $=Array.from(k.values()).map(T=>{const j=h(String(T.qty)),N=Yn(T.desc||""),z=T.barcode?` <span class="reservation-package-items__barcode">(${Yn(h(String(T.barcode)))})</span>`:"";return`<li>${N}${z} × ${j}</li>`}).join("");O=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${$}
              </ul>
            </details>
          `}}const q=m?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",x=m?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${l.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${l.description||"-"}</div>
                ${m?`${O||""}${L||""}`:L}
              </div>
            </div>
          </td>
          <td>
            <div class="${q}" data-group-key="${l.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${l.key}" aria-label="${i}"${x}>−</button>
              <span class="reservation-qty-value">${y}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${l.key}" aria-label="${r}"${x}>+</button>
            </div>
          </td>
          <td>${w}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${l.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),yr(t)}function bu(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function ba(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=ha();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,fr();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${h(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${h(Number(s.percentage).toFixed(2))}%`:"—",d=s?.recordedAt?h(Fe(s.recordedAt)):"—",l=bu(s?.type),u=s?.note?h(s.note):"";return`
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
  `,fr()}function hu(){if(pn()){E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=Gi(e);let a=Wi(t);if(!Number.isFinite(a)||a<=0){E(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=Pa.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,d=o("reservations.create.summary.currency","SR");let l=null,u=null;if(n==="percent"){const f=Math.max(0,100-i);if(f<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const y=h(m.toFixed(2));E(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",y)),a=m}u=Number(a.toFixed(2)),r>0&&(l=a/100*r)}else{const f=Math.max(0,r-c);if(f<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const y=`${h(m.toFixed(2))} ${d}`;E(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",y)),a=m}l=Number(a.toFixed(2)),r>0&&(u=l/r*100)}l!=null&&(l=Number(l.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const p={type:n,value:a,amount:l,percentage:u,recordedAt:new Date().toISOString()};_u(p),Cs(ha()),ba(),Me(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),E(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function fr(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(pn()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}hu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(pn()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||($u(s),Cs(ha()),ba(),Me(),E(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function vu(e){const{index:t,items:n}=ht(),s=Lt(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,d)=>d!==r);vt(t,i),bt(i),Me()}function qu(e){const{index:t,items:n}=ht(),a=n.filter(s=>vn(s)!==e);a.length!==n.length&&(vt(t,a),bt(a),Me())}function Su(e){const{index:t,items:n}=ht(),s=Lt(n).find(b=>b.key===e);if(!s||s.items.some(b=>b?.type==="package"))return;const{start:r,end:i}=Jt();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=pe(),d=t!=null&&c[t]||null,l=d?.id??d?.reservationId??null,u=new Set(n.map(b=>ee(b.barcode))),{equipment:p=[]}=pe(),f=(p||[]).find(b=>{const w=ee(b?.barcode);return!w||u.has(w)||vn({desc:b?.desc||b?.description||b?.name||"",price:Number(b?.price)||0})!==e||!ps(b)?!1:!Xe(w,r,i,l)});if(!f){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const m=ee(f.barcode),y=Wt(f);if(!y){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:y,equipmentId:y,barcode:m,desc:f.desc||f.description||f.name||s.description||"",qty:1,price:Number.isFinite(Number(f.price))?Number(f.price):s.unitPrice,image:Ct(f)}];vt(t,g),bt(g),Me()}function yr(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){vu(s);return}if(a==="increase-edit-group"&&s){Su(s);return}if(a==="remove-edit-group"&&s){qu(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||wu(i)}}),e.dataset.groupListenerAttached="true")}function pn(){return!!document.getElementById("edit-res-project")?.value}function Eu(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{pn()&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function xu(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),d=document.getElementById("edit-res-payment-history");[n,a,s,r,i,c,d].forEach(Eu),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s&&(s.value="unpaid",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),d&&(d.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.dataset.linkedDisabled="false"))}function Me(){const e=document.getElementById("edit-res-summary");if(!e)return;ba();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),De(a),Me()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=pn();xu(c);const d=document.getElementById("edit-res-tax"),l=c?!1:d?.checked||!1,u=!c&&a?.dataset?.userSelected==="true",p=c?"unpaid":u&&a?.value||"unpaid";let f=null;!c&&l&&(ze("edit-res-company-share"),f=zt("edit-res-company-share"),(!Number.isFinite(f)||f<=0)&&(ze("edit-res-company-share"),f=zt("edit-res-company-share")));const{items:m=[],payments:y=[]}=ht(),{start:g,end:b}=Jt(),w=Pa({items:m,discount:r,discountType:i,applyTax:l,paidStatus:p,start:g,end:b,companySharePercent:f,paymentHistory:y});e.innerHTML=w;const v=Pa.lastResult;if(v&&a){const A=v.paymentStatus;u?De(a,a.value):(a.value!==A&&(a.value=A),a.dataset&&delete a.dataset.userSelected,De(a,A))}else a&&De(a,a.value)}function wu(e){if(e==null)return;const{index:t,items:n}=ht();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);vt(t,a),bt(a),Me()}function Iu(e){const t=e?.value??"",n=ee(t);if(!n)return;const a=sa(n);if(!a){E(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=yt(a);if(s==="maintenance"||s==="retired"){E(Xt(s));return}const r=ee(n),{index:i,items:c=[]}=ht();if(c.findIndex(b=>ee(b.barcode)===r)>-1){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:l,end:u}=Jt();if(!l||!u){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:p=[]}=pe(),f=i!=null&&p[i]||null,m=f?.id??f?.reservationId??null;if(Xe(r,l,u,m)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const y=Wt(a);if(!y){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:y,equipmentId:y,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];vt(i,g),e&&(e.value=""),bt(g),Me()}function Zn(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Wr(t),a=ee(n?.barcode||t);if(!n||!a){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=yt(n);if(s==="maintenance"||s==="retired"){E(Xt(s));return}const{start:r,end:i}=Jt();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:d=[]}=ht();if(d.some(g=>ee(g.barcode)===a)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=pe(),p=c!=null&&u[c]||null,f=p?.id??p?.reservationId??null;if(Xe(a,r,i,f)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=Wt(n);if(!m){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const y=[...d,{id:m,equipmentId:m,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];vt(c,y),bt(y),Me(),e.value=""}function Ki(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Zn(e))});const t=()=>{Xr(e.value,"edit-res-equipment-description-options")&&Zn(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{Me()});const e=()=>{gu()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{Ui()})}typeof window<"u"&&(window.getEditReservationDateRange=Jt,window.renderEditPaymentHistory=ba);function Au(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){Oa(e);return}Zn(e)}}function cm(){ft(),Ki()}function ku(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let fn=null,Ke=[],Ge=[],Za=null,_e={},Ta=!1;function es(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function ts(){return document.getElementById("edit-res-confirmed")?.value==="true"}function ht(){return{index:fn,items:Ke,payments:Ge}}function vt(e,t,n=Ge){fn=typeof e=="number"?e:null,Ke=Array.isArray(t)?[...t]:[],Ge=Array.isArray(n)?[...n]:[]}function Qi(){fn=null,Ke=[],Ic(),Ge=[]}function ha(){return[...Ge]}function Cs(e){Ge=Array.isArray(e)?[...e]:[]}function _u(e){e&&(Ge=[...Ge,e])}function $u(e){!Number.isInteger(e)||e<0||(Ge=Ge.filter((t,n)=>n!==e))}function Tu(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Gi(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Wi(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function ju(e,t){if(e){e.value="";return}}function an(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Xi(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),d=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,l=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:d,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:l}}function Pu(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((d,l)=>String(l.createdAt||l.start||"").localeCompare(String(d.createdAt||d.start||""))):[],c=[`<option value="">${an(a)}</option>`];i.forEach(d=>{c.push(`<option value="${an(d.id)}">${an(d.title||a)}</option>`)}),r&&!i.some(d=>String(d.id)===r)&&c.push(`<option value="${an(r)}">${an(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function Ji(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const d=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",d&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}ns("tax");const c=_e?.updateEditReservationSummary;typeof c=="function"&&c()}function ns(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=_e?.updateEditReservationSummary;typeof r=="function"&&r()};if(Ta){a();return}Ta=!0;const s=()=>{Ta=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(it)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),ze("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?ze("edit-res-company-share"):n.checked&&(n.checked=!1));s()}function gr(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:d}=pe(),u=_t()?.[e];if(!u){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}_e={..._e,reservation:u,projects:d||[]},t?.(),Pu(d||[],u);const p=u.projectId&&d?.find?.(B=>String(B.id)===String(u.projectId))||null,{effectiveConfirmed:f,projectLinked:m}=gt(u,p),y=u.items?u.items.map(B=>({...B,equipmentId:B.equipmentId??B.equipment_id??B.id,barcode:ee(B?.barcode)})):[],b=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(B=>Xi(B)).filter(Boolean);vt(e,y,b);const w=o("reservations.list.unknownCustomer","غير معروف"),v=c?.find?.(B=>String(B.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const A=document.getElementById("edit-res-id");A&&(A.value=u.reservationId||u.id);const L=document.getElementById("edit-res-customer");L&&(L.value=v?.customerName||w);const O=typeof a=="function"?a(u.start):{date:"",time:""},q=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",O.date),n?.("edit-res-start-time",O.time),n?.("edit-res-end",q.date),n?.("edit-res-end-time",q.time);const x=document.getElementById("edit-res-notes");x&&(x.value=u.notes||"");const k=document.getElementById("edit-res-discount");if(k){const B=m?0:u.discount??0;k.value=h(B)}const $=document.getElementById("edit-res-discount-type");$&&($.value=m?"percent":u.discountType||"percent");const T=u.projectId?!1:!!u.applyTax,j=document.getElementById("edit-res-tax");j&&(j.checked=T);const N=document.getElementById("edit-res-company-share");if(N){const B=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,P=B!=null?Number.parseFloat(h(String(B).replace("%","").trim())):NaN,K=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,M=K!=null?K===!0||K===1||K==="1"||String(K).toLowerCase()==="true":Number.isFinite(P)&&P>0,H=M&&Number.isFinite(P)&&P>0?P:it,U=T||M;N.checked=U,N.dataset.companyShare=String(H)}es(f,{disable:m});const z=document.getElementById("edit-res-paid"),F=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");z&&(z.value=F,z.dataset&&delete z.dataset.userSelected);const R=document.getElementById("edit-res-payment-progress-type"),_=document.getElementById("edit-res-payment-progress-value");if(R?.dataset?.userSelected&&delete R.dataset.userSelected,R&&(R.value="percent"),ju(_),Ac((u.technicians||[]).map(B=>String(B))),s?.(y),typeof window<"u"){const B=window?.renderEditPaymentHistory;typeof B=="function"&&B()}Ji(),r?.();const G=document.getElementById("editReservationModal");Za=Tu(G,i),Za?.show?.()}async function Nu({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:r,populateEquipmentDescriptionLists:i,handleReservationsMutation:c}={}){if(fn===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const d=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),p=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",f=document.getElementById("edit-res-notes")?.value||"",m=h(document.getElementById("edit-res-discount")?.value||"0");let y=parseFloat(m)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const b=ts(),w=document.getElementById("edit-res-paid"),v=w?.dataset?.userSelected==="true",A=v&&w?.value||"unpaid",L=document.getElementById("edit-res-payment-progress-type"),O=document.getElementById("edit-res-payment-progress-value"),q=Gi(L),x=Wi(O),k=document.getElementById("edit-res-project")?.value||"",$=xc(),T=document.getElementById("edit-res-company-share"),j=document.getElementById("edit-res-tax");if(!d||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const N=typeof e=="function"?e:(J,ge)=>`${J}T${ge||"00:00"}`,z=N(d,l),F=N(u,p);if(z&&F&&new Date(z)>new Date(F)){E(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const _=_t()?.[fn];if(!_){E(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(Ke)||Ke.length===0&&$.length===0){E(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const G=typeof t=="function"?t:()=>!1,B=_.id??_.reservationId;for(const J of Ke){const ge=yt(J.barcode);if(ge==="reserved"){const D=ee(J.barcode);if(!G(D,z,F,B))continue}if(ge!=="available"){E(Xt(ge));return}}for(const J of Ke){const ge=ee(J.barcode);if(G(ge,z,F,B)){E(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const P=typeof n=="function"?n:()=>!1;for(const J of Ke){if(J?.type!=="package")continue;const ge=J.packageId??J.package_id??null;if(ge&&P(ge,z,F,B)){const D=J.desc||J.packageName||o("reservations.create.packages.genericName","الحزمة");E(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${h(String(D))} محجوزة بالفعل في الفترة المختارة`));return}}const K=typeof a=="function"?a:()=>!1;for(const J of $)if(K(J,z,F,B)){E(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const M=Array.isArray(_e.projects)&&_e.projects.length?_e.projects:pe().projects||[],H=k&&M.find(J=>String(J.id)===String(k))||null,U={..._,projectId:k?String(k):null,confirmed:b},{effectiveConfirmed:ce,projectLinked:oe,projectStatus:ae}=gt(U,H);let W=!!T?.checked,se=!!j?.checked;if(oe&&(W&&(T.checked=!1,W=!1),se=!1),!oe&&W!==se){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}se&&(ze("edit-res-company-share"),W=!!T?.checked);let de=W?getCompanySharePercent("edit-res-company-share"):null;W&&(!Number.isFinite(de)||de<=0)&&(ze("edit-res-company-share"),de=getCompanySharePercent("edit-res-company-share"));const ye=W&&se&&Number.isFinite(de)&&de>0,we=oe?!1:se;oe&&(y=0,g="percent");const V=cs(Ke,y,g,we,$,{start:z,end:F,companySharePercent:ye?de:0});let X=ha();if(Number.isFinite(x)&&x>0){const J=V;let ge=null,D=null;q==="amount"?(ge=x,J>0&&(D=x/J*100)):(D=x,J>0&&(ge=x/100*J));const ie=Xi({type:q,value:x,amount:ge,percentage:D,recordedAt:new Date().toISOString()});ie&&(X=[...X,ie],Cs(X)),O&&(O.value="")}const te=ls({totalAmount:V,history:X}),ue=ds({manualStatus:A,paidAmount:te.paidAmount,paidPercent:te.paidPercent,totalAmount:V});w&&!v&&(w.value=ue,w.dataset&&delete w.dataset.userSelected);let je=_.status??"pending";oe?je=H?.status??ae??je:["completed","cancelled"].includes(String(je).toLowerCase())||(je=b?"confirmed":"pending");const qt=xr({reservationCode:_.reservationCode??_.reservationId??null,customerId:_.customerId,start:z,end:F,status:je,title:_.title??null,location:_.location??null,notes:f,projectId:k?String(k):null,totalAmount:V,discount:y,discountType:g,applyTax:we,paidStatus:ue,confirmed:ce,items:Ke.map(J=>({...J,equipmentId:J.equipmentId??J.id})),technicians:$,companySharePercent:ye?de:null,companyShareEnabled:ye,paidAmount:te.paidAmount,paidPercentage:te.paidPercent,paymentProgressType:te.paymentProgressType,paymentProgressValue:te.paymentProgressValue,paymentHistory:X});try{const J=await wc(_.id||_.reservationId,qt);await Ar(),hn(),Te(),E(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),Qi(),c?.({type:"updated",reservation:J}),r?.(),i?.(),Za?.hide?.()}catch(J){console.error("❌ [reservationsEdit] Failed to update reservation",J);const ge=na(J)?J.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");E(ge,"error")}}function lm(e={}){_e={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=_e,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=h(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{ns("tax")}),c.dataset.listenerAttached="true");const d=document.getElementById("edit-res-company-share");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{ns("share")}),d.dataset.listenerAttached="true");const l=document.getElementById("edit-res-payment-progress-type");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{l.dataset.userSelected="true",t?.()}),l.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const p=document.getElementById("edit-res-project");p&&!p.dataset.listenerAttached&&(p.addEventListener("change",()=>{Ji();const b=Array.isArray(_e.projects)&&_e.projects.length?_e.projects:pe().projects||[],w=p.value&&b.find(q=>String(q.id)===String(p.value))||null,A={..._e?.reservation??{},projectId:p.value||null,confirmed:ts()},{effectiveConfirmed:L,projectLinked:O}=gt(A,w);es(L,{disable:O}),t?.()}),p.dataset.listenerAttached="true");const f=document.getElementById("edit-res-confirmed-btn");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{if(f.disabled)return;const b=!ts();es(b),t?.()}),f.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{Nu(_e).catch(b=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",b)})}),m.dataset.listenerAttached="true");const y=document.getElementById("edit-res-equipment-barcode");if(y&&!y.dataset.listenerAttached){let b=null;const w=()=>{y.value?.trim()&&(clearTimeout(b),b=null,n?.(y))};y.addEventListener("keydown",A=>{A.key==="Enter"&&(A.preventDefault(),w())});const v=()=>{if(clearTimeout(b),!y.value?.trim())return;const{start:A,end:L}=getEditReservationDateRange();!A||!L||(b=setTimeout(()=>{w()},150))};y.addEventListener("input",v),y.addEventListener("change",w),y.dataset.listenerAttached="true"}Ki?.();const g=document.getElementById("editReservationModal");g&&!g.dataset.cleanupAttached&&(g.addEventListener("hidden.bs.modal",()=>{Qi(),t?.(),s?.([])}),g.dataset.cleanupAttached="true")}const Cu=pe()||{};let Oe=(Cu.projects||[]).map(Du),Sn=!1;function dm(){return Oe}function va(e){Oe=Array.isArray(e)?e.map(Bs):[],ss({projects:Oe});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return Oe}async function Lu(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,d])=>{d==null||d===""||t.set(c,String(d))});const n=t.toString(),s=(await We(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(Ls);return va(i),Sn=!0,Oe}async function Bu({force:e=!1,params:t=null}={}){if(!e&&Sn&&Oe.length>0)return Oe;try{return await Lu(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),Oe}}async function um(e){const t=await We("/projects/",{method:"POST",body:e}),n=Ls(t?.data??{}),a=[...Oe,n];return va(a),Sn=!0,n}async function mm(e,t){const n=await We(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=Ls(n?.data??{}),s=Oe.map(r=>String(r.id)===String(e)?a:r);return va(s),Sn=!0,a}async function pm(e){await We(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=Oe.filter(n=>String(n.id)!==String(e));va(t),Sn=!0}function fm({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:d,paymentStatus:l,equipmentEstimate:u=0,expenses:p=[],taxAmount:f=0,totalWithTax:m=0,discount:y=0,discountType:g="percent",companyShareEnabled:b=!1,companySharePercent:w=null,companyShareAmount:v=0,paidAmount:A=null,paidPercentage:L=null,paymentProgressType:O=null,paymentProgressValue:q=null,confirmed:x=!1,technicians:k=[],equipment:$=[],payments:T,paymentHistory:j}={}){const N=Array.isArray(k)?k.map(M=>Number.parseInt(String(M),10)).filter(M=>Number.isInteger(M)&&M>0):[],z=Array.isArray($)?$.map(M=>{const H=Number.parseInt(String(M.equipmentId??M.equipment_id??M.id??0),10),U=Number.parseInt(String(M.qty??M.quantity??0),10);return!Number.isInteger(H)||H<=0?null:{equipment_id:H,quantity:Number.isInteger(U)&&U>0?U:1}}).filter(Boolean):[],F=Array.isArray(p)?p.map(M=>{const H=Number.parseFloat(M?.amount??M?.value??0)||0,U=(M?.label??M?.name??"").trim();return U?{label:U,amount:Math.round(H*100)/100}:null}).filter(Boolean):[],R=F.reduce((M,H)=>M+(H?.amount??0),0),_={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!d,payment_status:l??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(R*100)/100,tax_amount:Math.round((Number.parseFloat(f)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(m)||0)*100)/100,confirmed:!!x,technicians:N,equipment:z,expenses:F},G=Math.max(0,Number.parseFloat(y)||0);_.discount=G,_.discount_type=g==="amount"?"amount":"percent";const B=Number.parseFloat(w),P=!!b&&Number.isFinite(B)&&B>0;_.company_share_enabled=P,_.company_share_percent=P?B:0,_.company_share_amount=P?Math.max(0,Number.parseFloat(v)||0):0,Number.isFinite(Number(A))&&(_.paid_amount=Math.max(0,Number.parseFloat(A)||0)),Number.isFinite(Number(L))&&(_.paid_percentage=Math.max(0,Number.parseFloat(L)||0)),(O==="amount"||O==="percent")&&(_.payment_progress_type=O),q!=null&&q!==""&&(_.payment_progress_value=Number.parseFloat(q)||0),e&&(_.project_code=String(e).trim());const K=T!==void 0?T:j;if(K!==void 0){const M=Yi(K)||[];_.payments=M.map(H=>({type:H.type,amount:H.amount!=null?H.amount:null,percentage:H.percentage!=null?H.percentage:null,value:H.value!=null?H.value:null,note:H.note??null,recorded_at:H.recordedAt??null}))}return _.end_datetime||delete _.end_datetime,_.client_company||(_.client_company=null),_}function Ls(e={}){return Bs(e)}function Du(e={}){return Bs(e)}function Bs(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(m=>{if(m==null)return null;if(typeof m=="object"){const y=m.id??m.technician_id??m.technicianId;return y!=null?String(y):null}return String(m)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(m=>{const y=m?.equipment_id??m?.equipmentId??m?.id??null,g=m?.quantity??m?.qty??0,b=m?.barcode??m?.code??"",w=m?.description??m?.name??"";return{equipmentId:y!=null?String(y):null,qty:Number.parseInt(String(g),10)||0,barcode:b,description:w}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((m,y)=>({id:m?.id??`expense-${t??"x"}-${y}`,label:m?.label??"",amount:Number.parseFloat(m?.amount??0)||0})),d=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,l=e.company_share_enabled??e.companyShareEnabled,u=l!=null?l===!0||l===1||String(l).toLowerCase()==="true":d>0,p=e.payment_history??e.paymentHistory??e.payments??null,f=Yi(p);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?d:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(m=>typeof m=="object"?m:{id:m}),equipment:r,expenses:c,paymentHistory:f}}function ym(e){return e instanceof br}function ja(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function Fu(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=ja(e.value);let s=ja(e.amount),r=ja(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,d=e.recordedAt??e.recorded_at??e.date??null;let l=null;if(d){const p=new Date(d);Number.isNaN(p.getTime())||(l=p.toISOString())}l||(l=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:l}}function Yi(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>Fu(t)).filter(Boolean):[]}const ea="reservations-ui:ready",At=typeof EventTarget<"u"?new EventTarget:null;let kt={};function Ru(e){return Object.freeze({...e})}function Mu(){if(!At)return;const e=kt,t=typeof CustomEvent=="function"?new CustomEvent(ea,{detail:e}):{type:ea,detail:e};typeof At.dispatchEvent=="function"&&At.dispatchEvent(t)}function Hu(e={}){if(!e||typeof e!="object")return kt;const t={...kt};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),kt=Ru(t),Mu(),kt}function Ou(e){if(e)return kt?.[e]}function gm(e){const t=Ou(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const i=(s?.detail||kt)?.[e];typeof i=="function"&&(At&&At.removeEventListener(ea,a),n(i))};At&&At.addEventListener(ea,a)})}function bm(){return Bu().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=pe()||{};kc(e||[]),ai()})}function Ds(e=null){ai(),Zi(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function zu(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function as(){return{populateEquipmentDescriptionLists:ft,setFlatpickrValue:ku,splitDateTime:qr,renderEditItems:bt,updateEditReservationSummary:Me,addEquipmentByDescription:Au,addEquipmentToEditingReservation:Iu,addEquipmentToEditingByDescription:Zn,combineDateTime:dn,hasEquipmentConflict:Xe,hasTechnicianConflict:Er,renderReservations:Zi,handleReservationsMutation:Ds,ensureModal:zu}}function Zi(e="reservations-list",t=null){du({containerId:e,filters:t,onShowDetails:eo,onConfirmReservation:no})}function eo(e){return uu(e,{getEditContext:as,onEdit:(t,{reservation:n})=>{ao(t,n)},onDelete:to})}function to(e){return Nt()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?pu(e,{onAfterChange:Ds}):!1:(yn(),!1)}function no(e){return fu(e,{onAfterChange:Ds})}function ao(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}gr(e,as());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}gr(e,as());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}lc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function hm(){Hu({showReservationDetails:eo,deleteReservation:to,confirmReservation:no,openReservationEditor:ao})}export{mm as A,Hu as B,eo as C,Ls as D,Qt as E,hs as F,tm as G,nm as H,dm as I,ym as J,ri as K,am as L,im as M,Xu as N,Ju as O,em as P,Lu as Q,Ae as R,Yu as S,Zu as T,sm as U,pm as V,um as W,Wl as X,oi as Y,ci as Z,rm as _,Bu as a,hm as b,lm as c,cm as d,om as e,ai as f,as as g,le as h,Gu as i,Ds as j,Vl as k,bm as l,gt as m,ua as n,Te as o,Lc as p,Mn as q,Zi as r,Wu as s,Ku as t,Me as u,Qu as v,Ou as w,gm as x,si as y,fm as z};
