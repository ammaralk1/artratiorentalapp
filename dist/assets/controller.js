import{n as h,d as ue,f as tc,t as o,b as Ke,h as E,j as $t,o as un,s as Xa,A as ur,z as nc,k as Be,B as mr,u as ac}from"./auth.js";import{n as re,x as Qe,y as pr,z as sc,D as tt,A as Ja,B as Fs,C as rn,E as xa,F as Gn,G as rc,f as fr,H as Ge,I as Ya,J as yr,K as ic,L as oc,M as cc,N as lc,O as jn,P as dc,Q as gr,R as uc,S as br,v as Za,h as es,j as ts,T as hr,U as mc,s as mn,c as Wn,V as vr,W as pc,X as qr,Y as fc,p as Xn,a as Sr,g as wt,Z as yc,_ as gc,$ as wa,a0 as bc,w as hc,a1 as vc,a2 as qc,b as Sc}from"./reservationsService.js";const ya="select.form-select:not([data-no-enhance]):not([multiple])",We=new WeakMap;let ga=null,Rs=!1,Je=null;function Mu(e=document){e&&(e.querySelectorAll(ya).forEach(t=>An(t)),!ga&&e===document&&(ga=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(ya)&&An(a),a.querySelectorAll?.(ya).forEach(s=>An(s)))})}),ga.observe(document.body,{childList:!0,subtree:!0})),Rs||(Rs=!0,document.addEventListener("pointerdown",wc,{capture:!0})))}function In(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){An(e);return}const t=e.closest(".enhanced-select");t&&(ns(t),Pn(t),Ia(t))}function An(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){In(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};We.set(t,r),a.addEventListener("click",()=>xc(t)),a.addEventListener("keydown",i=>Ic(i,t)),s.addEventListener("click",i=>kc(i,t)),s.addEventListener("keydown",i=>Ac(i,t)),e.addEventListener("change",()=>{Pn(t),Er(t)}),r.observer=new MutationObserver(i=>{let c=!1,d=!1;for(const l of i)l.type==="attributes"&&l.attributeName==="disabled"&&(d=!0),l.type==="childList"&&(c=!0);d&&Ia(t),c&&Ec(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),ns(t),Pn(t),Ia(t)}function Ec(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,ns(t),Pn(t)})))}function ns(e){const t=We.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),Er(e)}function Pn(e){const t=We.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function Er(e){const t=We.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function Ia(e){const t=We.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function xc(e){We.get(e)&&(e.getAttribute("data-open")==="true"?zt(e):xr(e))}function xr(e){const t=We.get(e);if(!t)return;Je&&Je!==e&&zt(Je,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),Je=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function zt(e,{focusTrigger:t=!0}={}){const n=We.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),Je===e&&(Je=null))}function wc(e){if(!Je)return;const t=e.target;t instanceof Node&&(Je.contains(t)||zt(Je,{focusTrigger:!1}))}function Ic(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),xr(t)):n==="Escape"&&zt(t)}function Ac(e,t){const n=e.key,a=We.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&wr(i,t)}else n==="Escape"&&(e.preventDefault(),zt(t))}function kc(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&wr(n,t)}function wr(e,t){const n=We.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),zt(t)}const Vt=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let Ye=null;function as(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function Ir(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function _c(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function $c(e={}){const t=_c({...e,activatedAt:Date.now()});return Ye=t,Ir(!0,t.mode||"create"),as(Vt.change,{active:!0,selection:{...t}}),t}function Cn(e="manual"){if(!Ye)return;const t=Ye;Ye=null,Ir(!1),as(Vt.change,{active:!1,previous:t,reason:e})}function Ar(){return!!Ye}function Tc(){return Ye?{...Ye}:null}function jc(e){if(!Ye)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=h(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:r,description:i}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const d=c.map(u=>h(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!d.length)return!1;const l=Number.isInteger(s)&&s>0?s:d.length;t={barcodes:d,quantity:Math.min(l,d.length)},r&&(t.groupKey=r),i&&(t.description=i)}else return!1;return as(Vt.requestAdd,{...t,selection:{...Ye}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||Cn("tab-changed")});const Pc=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Cc=new Set(["maintenance","reserved","retired"]);function Nc(e){const t=String(e??"").trim().toLowerCase();return t&&Pc.get(t)||"available"}function Lc(e){return e?typeof e=="object"?e:Jn(e):null}function dt(e){const t=Lc(e);return t?Nc(t.status||t.state||t.statusLabel||t.status_label):"available"}function ss(e){return!Cc.has(dt(e))}function Tt(e={}){return e.image||e.imageUrl||e.img||""}function Bc(e){if(!e)return null;const t=re(e),{equipment:n=[]}=ue();return(n||[]).find(a=>re(a?.barcode)===t)||null}function Jn(e){const t=re(e);if(!t)return null;const{equipment:n=[]}=ue();return(n||[]).find(a=>re(a?.barcode)===t)||null}const Dc=ue()||{};let rt=(Dc.equipment||[]).map(Mc),Aa=!1,tn="",St=null,At=null,kt=null,Yn=!1,Ms=!1;function Fc(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function Rc(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function Mc(e={}){return rs({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function Zn(e={}){return rs(e)}function rs(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=pn(e.quantity??e.qty??0),i=ea(e.unit_price??e.price??0),c=h(String(e.barcode??"").trim()),d=_e(e.status??e.state??e.status_label??e.statusLabel??"available"),l=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:Hc(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:d,image:l,imageUrl:l,created_at:e.created_at??null,updated_at:e.updated_at??null}}function Hc(e){return e!=null&&e!==""}function pn(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function ea(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function Oc(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function Hs(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function zc(e,t){const n=Hs(e),a=Hs(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}else{if(r!==i)return r?-1:1;{const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}}const c=Nn(e?.desc||e?.description||e?.name||""),d=Nn(t?.desc||t?.description||t?.name||"");return c.localeCompare(d,"ar",{sensitivity:"base"})}function he(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function _e(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function Vc(e){return _e(e)}function ka(){if(!Ar())return null;const e=Tc();return e?{...e}:null}function Uc(e){const t=ka();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:r=null}=t,i=t?.mode||t?.source||"",c=[],d=new Set;if(n.forEach(y=>{const m=re(y?.barcode);!m||d.has(m)||(d.add(m),c.push({variant:y,barcode:m}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(i==="package-manager"||i==="equipment-packages"){const y=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:m})=>m),maxQuantity:y,reason:""}}const l=c.filter(({variant:y})=>ss(y));if(!a||!s)return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=l.filter(({barcode:y})=>!Qe(y,a,s,r));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:y})=>y),maxQuantity:u.length};let p=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(l.length>0)p=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const y=new Set(c.map(({variant:m})=>_e(m?.status)));y.has("maintenance")?p=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):y.has("reserved")?p=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):y.has("retired")&&(p=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:p,availableBarcodes:[],maxQuantity:0}}function Kc(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function kr(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=ka();e.hidden=!s;const r=s?.mode||s?.source||"";s?r==="package-manager"||r==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=ka(),d=c?.mode||c?.source||"";d==="package-manager"||d==="equipment-packages"?Cn("package-finish-button"):(Cn("return-button"),Kc())}),t.dataset.listenerAttached="true")}function De(){return rt}function _t(e){rt=Array.isArray(e)?e.map(rs):[],Xa({equipment:rt}),Rc()}function Nn(e){return String(e??"").trim().toLowerCase()}function ot(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=Nn(t);return n||(n=Nn(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function ta(e){const t=ot(e);return t?De().filter(n=>ot(n)===t):[]}function na(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=aa(e);if(n){const a=he(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${he(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function is(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function Ln(){const e=is();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function os(e={}){const t=is();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function Rt(e){Yn=e;const t=is(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function Hu(e){if(!$t()){un();return}if(!e)return;try{await Gc()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let d=0;if(i.forEach(l=>{const u=l.القسم??l.category??"",p=l["القسم الثانوي"]??l.subcategory??"",y=l.الوصف??l.description??l.name??"",m=l.الكمية??l.quantity??0,f=l.السعر??l.price??0,g=l.الباركود??l.barcode??"",b=l.الحالة??l.status??"متاح",w=l.الصورة??l.image_url??l.image??"",v=h(String(g||"")).trim();if(!y||!v){d+=1;return}c.push(cs({category:u,subcategory:p,description:y,quantity:m,unit_price:f,barcode:v,status:b,image_url:w}))}),!c.length){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const l=await Ke("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(l?.data)?l.data.map(Zn):[];if(u.length){const m=[...De(),...u];_t(m)}await sa({showToastOnError:!1}),$e();const p=l?.meta?.count??u.length,y=[];p&&y.push(`${p} ✔️`),d&&y.push(`${d} ⚠️`),E(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(y.length?` (${y.join(" / ")})`:""))}catch(l){const u=Ut(l,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");E(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const Qc="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let Xt=null;function Gc(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):Xt||(Xt=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=Qc,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),Xt=null,e}),Xt)}function cs({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const d=h(String(r||"")).trim(),l=Vc(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:pn(a),unit_price:ea(s),barcode:d,status:l,image_url:c?.trim()||null}}async function Wc(){if(!$t()){un();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await Ke("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await sa({showToastOnError:!1}),E(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=Ut(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");E(t,"error")}}function aa(e){return e.image||e.imageUrl||e.img||""}function Xc(e){const t=_e(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function Bn(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${he(a)}</td></tr>`}n&&(n.textContent="0")}function _r(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=St?.groupKey||ot(e);if(!r){Bn();return}const i=De().filter(p=>ot(p)===r).sort((p,y)=>{const m=String(p.barcode||"").trim(),f=String(y.barcode||"").trim();return!m&&!f?0:m?f?m.localeCompare(f,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){Bn();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),d=o("equipment.form.labels.quantity","الكمية"),l=De(),u=i.map(p=>{const y=p.id&&e.id?String(p.id)===String(e.id):String(p.barcode||"")===String(e.barcode||""),m=y?"equipment-variants-table__row--current":"",f=he(String(p.barcode||"-")),g=y?`<span class="equipment-variants-current-badge">${he(c)}</span>`:"",b=h(String(Number.isFinite(Number(p.qty))?Number(p.qty):0)),w=l.indexOf(p),v=he(o("equipment.item.actions.delete","🗑️ حذف")),A=w>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${w}">${v}</button>
          </div>`:"";return`
        <tr class="${m}">
          <td>
            ${f}
            ${g}
          </td>
          <td>${Xc(p.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${he(d)}">${b}</span>
          </td>
          <td class="table-actions-cell">${A}</td>
        </tr>
      `}).join("");n.innerHTML=u}function Jc({item:e,index:t}){const n=aa(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=$t(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},d=Number.isFinite(Number(e.qty))?Number(e.qty):0,l=Number.isFinite(Number(e.price))?Number(e.price):0,u=d.toLocaleString("en-US"),p=l.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),y=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,m=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,f=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(d-y-m,0),g=f.toLocaleString("en-US"),b=o("equipment.card.labels.availableOfTotal","من أصل"),w=_e(e.status);let v=`${he(c.available)}: ${he(g)} ${he(b)} ${he(u)}`,A="available";if(f===0){const H={reserved:{text:d===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},K=H[w]||H.default;v=he(K.text),A=K.modifier}const N=`<span class="equipment-card__availability equipment-card__availability--${A}">${v}</span>`,O="",q=e.desc||e.name||"—",x=e.name&&e.name!==e.desc?e.name:"",_=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${p} ${r}`}].map(({label:H,value:K})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${H}</span>
              <span class="equipment-card__detail-value">${K}</span>
            </span>
          `).join("")}
    </div>`,T=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),$=T.length?`<div class="equipment-card__categories">${T.map(({label:H,value:K})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${H}</span>
              <span class="equipment-card__detail-value">${K}</span>
            </div>
          `).join("")}</div>`:"",j=x?`<div class="equipment-card__alias">
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
      ${_}
    </div>
  `,M=[],k=Uc(e),G=k?.availableBarcodes?.length?k.availableBarcodes.join(","):k?.barcode?k.barcode:"";let B="",C="";if(k.active){const H=`equipment-select-qty-${t}`,K=!!k.canSelect,te=K?Math.max(1,Number(k.maxQuantity||k.availableBarcodes?.length||1)):1,ne=Math.max(1,Math.min(te,99)),ce=[];for(let Y=1;Y<=ne;Y+=1){const de=h(String(Y));ce.push(`<option value="${Y}"${Y===1?" selected":""}>${de}</option>`)}const W=K?"":" disabled",ae=o("reservations.create.equipment.selector.quantityLabel","الكمية"),me=K?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${h(String(te))}`:k.reason?k.reason:"";B=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${H}">${ae}</label>
        <select class="equipment-card__quantity-select" id="${H}" data-equipment-select-quantity${W}>
          ${ce.join("")}
        </select>
        ${me?`<span class="equipment-card__selection-hint">${he(me)}</span>`:""}
      </div>
    `;const fe=o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),Ie=K?"":" disabled",U=k.reason?` title="${he(k.reason)}"`:"",J=['data-equipment-action="select-reservation"',`data-selection-max="${K?te:0}"`];G&&J.push(`data-selection-barcodes="${he(G)}"`),e.groupKey&&J.push(`data-selection-group="${he(String(e.groupKey))}"`),C=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${J.join(" ")}${Ie}${U}>${fe}</button>
    `}i&&M.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const V=M.length?M.join(`
`):"",R=he(q);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${he(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${R}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${O}
        ${N}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${F}
        </div>
      </div>
      <div class="equipment-card__body">
        ${$}
        ${j}
      </div>
      ${B||C||V?`<div class="equipment-card__actions equipment-card__actions--center">
            ${B}
            ${C}
            ${V}
          </div>`:""}
    </article>
  `}function Yc(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,a.appendChild(d)}),t.includes(i)&&(a.value=i),In(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,s.appendChild(d)}),n.includes(i)&&(s.value=i),In(s)}const r=document.getElementById("filter-status");r&&In(r)}function fn(){const e=ue();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return rt=t||[],rt;const s=new Date;let r=!1;const i=new Set((a||[]).filter(d=>d?.status==="open").map(d=>h(String(d?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(d=>{if(!d)return d;const l=_e(d.status),u=h(String(d.barcode??"")).trim().toLowerCase(),p=u&&i.has(u);let y=p?"maintenance":"available";if(!p&&u)for(const m of n||[]){if(!Zc(m,s))continue;if(m.items?.some(g=>h(String(g?.barcode??"")).trim().toLowerCase()===u)){y="reserved";break}}return y!==l?(r=!0,{...d,status:y}):{...d,status:y}});return r?_t(c):(rt=c,Xa({equipment:rt})),rt}function Zc(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function ba(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function $e(){const e=document.getElementById("equipment-list");if(!e)return;kr();const t=fn(),n=Array.isArray(t)?t:De(),a=new Map;n.forEach(g=>{if(!g)return;const b=ot(g);b&&(a.has(b)||a.set(b,[]),a.get(b).push(g))});const s=Array.from(a.values()).map(g=>{const b=g[0],w=g.reduce((x,I)=>x+(Number.isFinite(Number(I.qty))?Number(I.qty):0),0),v=["maintenance","reserved","available","retired"],A=g.map(x=>_e(x.status)).sort((x,I)=>v.indexOf(x)-v.indexOf(I))[0]||"available",N=g.reduce((x,I)=>{const _=pn(I?.qty??0)||0,T=_e(I?.status);return T==="reserved"?x.reserved+=_:T==="maintenance"&&(x.maintenance+=_),x},{reserved:0,maintenance:0}),O=Math.max(w-N.reserved-N.maintenance,0);return{item:{...b,qty:w,status:A,variants:g,groupKey:ot(b),reservedQty:N.reserved,maintenanceQty:N.maintenance,availableQty:O},index:n.indexOf(b)}});s.sort((g,b)=>zc(g.item,b.item));const r=document.getElementById("search-equipment")?.value||"",i=h(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",d=document.getElementById("filter-sub")?.value||"",l=document.getElementById("filter-status")?.value||"",u=l?_e(l):"";if(Aa&&!n.length){e.innerHTML=ba(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(tn&&!n.length){e.innerHTML=ba(tn,{tone:"error",icon:"⚠️"});return}const p=s.filter(({item:g})=>{const b=h(String(g.barcode??"")).toLowerCase().trim(),w=Array.isArray(g.variants)?g.variants.map(q=>h(String(q.barcode??"")).toLowerCase().trim()).filter(Boolean):[],v=!i||g.name&&g.name.toLowerCase().includes(i)||g.desc&&g.desc.toLowerCase().includes(i)||b&&b.includes(i)||w.some(q=>q.includes(i))||g.category&&g.category.toLowerCase().includes(i)||g.sub&&g.sub.toLowerCase().includes(i),A=!c||g.category===c,N=!d||g.sub===d,O=!u||_e(g.status)===u;return v&&A&&N&&O}),y=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),m=p;e.innerHTML=m.length?m.map(Jc).join(""):ba(y);const f=document.getElementById("equipment-list-count");if(f){const g=o("equipment.list.countSuffix","عنصر"),b=h(String(m.length)),w=m.length?`${b} ${g}`:`0 ${g}`;f.textContent=w}Yc(n)}async function sa({showToastOnError:e=!0}={}){Aa=!0,tn="",$e();try{const t=await Ke("/equipment/?all=1"),n=Array.isArray(t?.data)?t.data.map(Zn):[];_t(n)}catch(t){tn=Ut(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&E(tn,"error")}finally{Aa=!1,$e()}}function Ut(e,t,n){if(e instanceof ur){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function el(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),r=ea(t.querySelector("#new-equipment-price")?.value||"0"),i=pn(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",d=t.querySelector("#new-equipment-category")?.value?.trim()||"",l=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){E(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const p=cs({category:d,subcategory:l,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const y=await Ke("/equipment/",{method:"POST",body:p}),m=Zn(y?.data),f=[...De(),m];_t(f),$e(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),E(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(y){const m=Ut(y,"equipment.toast.addFailed","تعذر إضافة المعدة");E(m,"error")}}async function $r(e){if(!$t()){un();return}const t=De(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await Ke(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),_t(a),$e(),E(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=Ut(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");E(s,"error")}}async function tl(e,t){const n=De(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},_t(r),$e();return}const s=cs({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await Ke(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=Zn(r?.data),c=[...n];c[e]=i,_t(c),$e(),E(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=Ut(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw E(i,"error"),r}}function En(){$e()}function Tr(e){const n=De()[e];if(!n)return;At=e;const a=ta(n),s=a[0]||n,r=a.reduce((d,l)=>d+(Number.isFinite(Number(l.qty))?Number(l.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(d=>_e(d.status)).sort((d,l)=>i.indexOf(d)-i.indexOf(l))[0]||_e(s.status);document.getElementById("edit-equipment-index").value=e,os({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:aa(s)||"",barcode:s.barcode||"",status:s.status||c}),Rt(!1),kt=Ln(),na(s),_r(s),St={groupKey:ot(s),barcode:String(s.barcode||""),id:s.id||null},Fc(document.getElementById("editEquipmentModal"))?.show()}function nl(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),r=s?.querySelector("[data-equipment-select-quantity]");let i=Number.parseInt(r?.value||"1",10);(!Number.isFinite(i)||i<=0)&&(i=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&i>c&&(i=c);const l=(t.dataset.selectionBarcodes||"").split(",").map(m=>m.trim()).filter(m=>m.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",p=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";jc({barcodes:l,quantity:i,groupKey:p,description:u})||E(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||$r(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||Tr(s)}}function al(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||Tr(n)}}function sl(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||$r(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function jr(){if(!St||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=De(),a=St.id?n.find(d=>String(d.id)===String(St.id)):null,s=St.groupKey,r=s?n.find(d=>ot(d)===s):null,i=a||r;if(!i){Bn();return}const c=n.findIndex(d=>d===i);if(c>=0){const d=document.getElementById("edit-equipment-index");d&&(d.value=String(c)),At=c}if(_r(i),!Yn){const d=ta(i),l=d[0]||i,u=d.reduce((m,f)=>m+(Number.isFinite(Number(f.qty))?Number(f.qty):0),0),p=["maintenance","reserved","available","retired"],y=d.map(m=>_e(m.status)).sort((m,f)=>p.indexOf(m)-p.indexOf(f))[0]||_e(l.status);os({category:l.category||"",subcategory:l.sub||"",description:l.desc||l.description||"",quantity:String(u||l.qty||0),price:l.price!=null?String(l.price):"0",image:aa(l)||"",barcode:l.barcode||"",status:l.status||y}),kt=Ln()}na(primary)}function rl(){document.getElementById("search-equipment")?.addEventListener("input",En),document.getElementById("filter-category")?.addEventListener("change",En),document.getElementById("filter-sub")?.addEventListener("change",En),document.getElementById("filter-status")?.addEventListener("change",En),document.getElementById("add-equipment-form")?.addEventListener("submit",el);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),Wc().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",nl),t.addEventListener("keydown",al),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",sl),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);Oc(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!Yn){kt=Ln(),Rt(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){E(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:pn(document.getElementById("edit-equipment-quantity").value)||1,price:ea(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await tl(t,n),kt=Ln(),Rt(!1),jr()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{rl(),$e(),sa();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(kt&&os(kt),At!=null){const a=De()[At];if(a){const r=ta(a)[0]||a;na(r)}}Rt(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if($e(),Rt(Yn),At!=null){const t=De()[At];if(t){const a=ta(t)[0]||t;na(a)}}});document.addEventListener("equipment:refreshRequested",()=>{sa({showToastOnError:!1})});document.addEventListener(tc.USER_UPDATED,()=>{$e()});document.addEventListener("equipment:changed",()=>{jr()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{St=null,Bn(),At=null,kt=null,Rt(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!Ms&&(document.addEventListener(Vt.change,()=>{kr(),$e()}),Ms=!0);function we(e=""){return h(String(e)).trim().toLowerCase()}const il=2;function ol(e){const t=Number(e);return Number.isFinite(t)?t.toFixed(il):"0.00"}function Os(e={}){const t=Number(e?.qty);return Number.isFinite(t)&&t>0?t:1}function yn(e={}){const t=e?.desc||e?.description||e?.name||"",n=we(t),a=ol(e?.price??e?.unitPrice??e?.unit_price??0);return`${n}::${a}`}function jt(e=[]){const t=new Map;return e.forEach((n,a)=>{const s=yn(n);if(!s)return;if(!t.has(s)){const i=n?.desc||n?.description||n?.name||"",c=we(i),d=zs(n),l=n?.image||n?.imageUrl||n?.img||"";t.set(s,{key:s,description:i,normalizedDescription:c,unitPrice:d,image:l,items:[],itemIndices:[],barcodes:[]})}const r=t.get(s);r.items.push(n),r.itemIndices.push(a),n?.barcode&&r.barcodes.push(String(n.barcode))}),Array.from(t.values()).map(n=>({...n,quantity:n.items.reduce((a,s)=>a+Os(s),0)})).map(n=>{const a=n.quantity||0,s=n.items.reduce((i,c)=>{const d=zs(c),l=Os(c);return i+d*l},0),r=a>0?s/a:n.unitPrice;return{...n,quantity:a,count:a,totalPrice:s,unitPrice:r}})}function Kt(e={}){const t=[e?.id,e?.equipment_id,e?.equipmentId,e?.item_id,e?.itemId];for(const n of t)if(!(n==null||n===""))return String(n);return null}function zs(e={}){const t=e?.price??e?.unit_price??e?.unitPrice??0,n=Number(t);return Number.isFinite(n)?n:0}function ls(e){if(!e?.end)return!1;const t=new Date(e.end);return Number.isNaN(t.getTime())?!1:t<new Date}function cl(e=""){switch(String(e??"").trim().toLowerCase()){case"confirmed":case"مؤكد":return"confirmed";case"in_progress":case"in-progress":case"قيد التنفيذ":case"جاري":return"in_progress";case"completed":case"مكتمل":return"completed";case"cancelled":case"ملغي":return"cancelled";case"pending":case"draft":case"قيد الانتظار":case"بانتظار التأكيد":case"معلق":default:return"pending"}}function ut(e={},t=null){const n=e?.confirmed===!0||e?.confirmed==="true",a=e?.projectId??e?.project_id??null,s=a!=null&&a!==""&&a!=="null",r=s?cl(t?.status??t?.status_label??t?.statusLabel??""):null,i=s&&(t?.confirmed===!0||["confirmed","in_progress","completed"].includes(r));return{reservationConfirmed:n,projectLinked:s,projectStatus:r,projectConfirmed:i,effectiveConfirmed:s?i:n}}const Pr="projects:create:draft",Cr="projects.html#projects-section";let _a=null,Nr=[],$a=new Map,Ta=new Map,Dn=new Map,ha=!1,kn=null,Vs=!1,Lr=[];function ll(e){if(!e)return null;let t=Lr.find(a=>a.id===e)||null;if(t)return t;const n=ic(e);return n?(t={id:e,name:cc(n)||e,price:oc(n),items:fr(n),raw:n},t):null}function Fn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Rn(e){return h(String(e||"")).trim().toLowerCase()}function dl(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function Br(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function Dr(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Fr(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Rr(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function Qt(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function ds(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function Pt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Ne(){const{input:e,hidden:t}=Pt();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function vt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function Mr(e,t,{allowPartial:n=!1}={}){const a=we(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function ja(e,t={}){return Mr($a,e,t)}function Pa(e,t={}){return Mr(Ta,e,t)}function Le(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function Hr(e){Nr=Array.isArray(e)?[...e]:[]}function us(){return Nr}function ms(e){return e&&us().find(t=>String(t.id)===String(e))||null}function Us(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function Mt(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??tt,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:tt}function He(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??tt,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=tt),t.dataset.companyShare=String(s),t.checked=!0}function Ca(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(ha){oe();return}ha=!0;const a=()=>{ha=!1,oe()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(tt)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),He()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?He():n.checked&&(n.checked=!1));a()}function ul(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Ks(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function Qs(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function Ze({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=ds();if(!n||!a||!s)return;const r=Ja()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const d=new Set;$a=new Map;const l=r.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:Qs(m)||c})).filter(m=>{if(!m.label)return!1;const f=we(m.label);return!f||d.has(f)?!1:(d.add(f),$a.set(f,m),!0)}).sort((m,f)=>m.label.localeCompare(f.label,void 0,{sensitivity:"base"}));s.innerHTML=l.map(m=>`<option value="${Fn(m.label)}"></option>`).join("");const u=t?"":n.value,p=e?String(e):a.value?String(a.value):"",y=p?r.find(m=>String(m.id)===p):null;if(y){const m=Qs(y)||c;a.value=String(y.id),n.value=m,n.dataset.selectedId=String(y.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function Ht({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=Pt();if(!a||!s||!r)return;const i=Array.isArray(t)?t:us()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const d=[...i].filter(g=>g&&g.id!=null).sort((g,b)=>String(b.createdAt||b.start||"").localeCompare(String(g.createdAt||g.start||""))),l=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),p=new Set;Ta=new Map;const y=d.map(g=>{const b=Us(g)||u;return{id:String(g.id),label:b}}).filter(g=>{if(!g.label)return!1;const b=we(g.label);return!b||p.has(b)?!1:(p.add(b),Ta.set(b,g),!0)});r.innerHTML=y.map(g=>`<option value="${Fn(g.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",f=m?d.find(g=>String(g.id)===m):null;if(f){const g=Us(f)||u;s.value=String(f.id),a.value=g,a.dataset.selectedId=String(f.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":l}function Mn(e,t,n){const{date:a,time:s}=yr(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function Or(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||Ht({selectedValue:a});const r=(Ja()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";Ze(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=Ks(e,"start"),d=Ks(e,"end");c&&Mn("res-start","res-start-time",c),d&&Mn("res-end","res-end-time",d);const l=document.getElementById("res-notes");l&&e.description&&(t||!l.value)&&(l.value=e.description),oe(),ct()}function zr({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:ue(),s=Array.isArray(a)?a:[];Hr(s);const r=t!=null?String(t):n.value?String(n.value):"";Ht({selectedValue:r,projectsList:s}),ct(),oe()}function ct(){const{input:e,hidden:t}=Pt(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),d=document.getElementById("res-discount-type"),l=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),p=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(vt(n,Ne),a&&vt(a,Ne)),s&&vt(s,Ne),r&&vt(r,Ne),i&&vt(i,Ne),c&&vt(c,Ne),d&&vt(d,Ne),p)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=l),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=l),s&&(s.value="unpaid",Le(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=l),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=l),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=l),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=l),d&&(d.value="percent",d.disabled=!0,d.classList.add("reservation-input-disabled"),d.title=l);else{if(n){const y=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",y&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.disabled=!1,d.classList.remove("reservation-input-disabled"),d.title="")}Ca("tax"),oe()}function ps(){const{input:e,hidden:t}=Pt();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Pa(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=ms(r.id);i?Or(i,{skipProjectSelectUpdate:!0}):(ct(),oe())}else t.value="",e.dataset.selectedId="",ct(),oe()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Pa(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function fs(){const{input:e,hidden:t}=ds();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?ja(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),oe()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?ja(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function ml(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){nn({clearValue:!0});return}let n=null;try{const l=decodeURIComponent(t);n=JSON.parse(l)}catch(l){console.warn("⚠️ [reservations/createForm] Failed to decode project context",l)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),nn({clearValue:!1}),!n)return;n.fromProjectForm&&(kn={draftStorageKey:n.draftStorageKey||Pr,returnUrl:n.returnUrl||Cr});const r=document.getElementById("res-project");if(n.projectId){r&&(Ht({selectedValue:String(n.projectId)}),ct());const l=ms(n.projectId);l?Or(l,{forceNotes:!!n.forceNotes}):oe(),nn()}else{r&&Ht({selectedValue:""});const l=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");kl(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),l)}n.start&&Mn("res-start","res-start-time",n.start),n.end&&Mn("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(Ja()||[]).find(p=>String(p.id)===String(n.customerId));u?.id!=null&&(Ze({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(Ze({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):Ze({selectedValue:""});const d=document.getElementById("res-notes");d&&n.description&&!d.value&&(d.value=n.description),oe()}function Ct(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:rn(e,n),end:rn(t,a)}}function Vr(e){const t=Rn(e);if(t){const c=Dn.get(t);if(c)return c}const{description:n,barcode:a}=Br(e);if(a){const c=Jn(a);if(c)return c}const s=we(n||e);if(!s)return null;let r=vr();if(!r?.length){const c=ue();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&qr(r)}const i=r.find(c=>we(c?.desc||c?.description||"")===s);return i||r.find(c=>we(c?.desc||c?.description||"").includes(s))||null}function Ur(e,t="equipment-description-options"){const n=Rn(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(d=>Rn(d.value)===n)||Dn.has(n))return!0;const{description:s}=Br(e);if(!s)return!1;const r=we(s);return r?(vr()||[]).some(c=>we(c?.desc||c?.description||"")===r):!1}const pl={available:0,reserved:1,maintenance:2,retired:3};function fl(e){return pl[e]??5}function Gs(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function yl(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${Gs(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${Gs(n)})`}function lt(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=fn(),a=ue(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];qr(r);const i=new Map;r.forEach(l=>{const u=dl(l),p=Rn(u);if(!p||!u)return;const y=dt(l),m=fl(y),f=i.get(p);if(!f){i.set(p,{normalized:p,value:u,bestItem:l,bestStatus:y,bestPriority:m,statuses:new Set([y])});return}f.statuses.add(y),m<f.bestPriority&&(f.bestItem=l,f.bestStatus=y,f.bestPriority=m,f.value=u)}),Dn=new Map;const d=Array.from(i.values()).sort((l,u)=>l.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(l=>{Dn.set(l.normalized,l.bestItem);const u=yl(l),p=Fn(l.value);if(u===l.value)return`<option value="${p}"></option>`;const y=Fn(u);return`<option value="${p}" label="${y}"></option>`}).join("");e&&(e.innerHTML=d),t&&(t.innerHTML=d)}function Kr(e,t,n={}){const{silent:a=!1}=n,s=re(e);if(!s)return{success:!1,message:null};const{start:r,end:i}=Ct();if(!r||!i){const f=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||E(f),{success:!1,message:f}}const c=Ge();if(ys(c).has(s)){const f=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||E(f),{success:!1,message:f}}const l=Ya(s,r,i);if(l.length){const f=l.map(b=>b.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${f}`);return a||E(g),{success:!1,message:g}}if(Qe(s,r,i)){const f=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||E(f),{success:!1,message:f}}const u=Jn(s);if(!u){const f=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||E(f),{success:!1,message:f}}const p=dt(u);if(p==="maintenance"||p==="retired"){const f=Qt(p);return a||E(f),{success:!1,message:f}}const y=Kt(u);if(!y){const f=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||E(f),{success:!1,message:f}}Gn({id:y,equipmentId:y,barcode:s,desc:u.desc,qty:1,price:u.price,image:Tt(u)}),t&&(t.value=""),nt(),oe();const m=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||E(m),{success:!0,message:m,barcode:s}}function Na(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Vr(t);if(!n){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=Bc(n.barcode),s=dt(a||n);if(s==="maintenance"||s==="retired"){E(Qt(s));return}const r=re(n.barcode);if(!r){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=Kt(n);if(!i){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Tt(n)},{start:d,end:l}=Ct();if(!d||!l){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=Ge();if(ys(u).has(r)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const y=Ya(r,d,l);if(y.length){const m=y.map(f=>f.name).join(", ");E(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`));return}if(Qe(r,d,l)){E(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}Gn(c),nt(),oe(),E(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function gl(){lt();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Na(e))});const t=()=>{Ur(e.value,"equipment-description-options")&&Na(e)};e.addEventListener("focus",()=>{if(lt(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Ws(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function ys(e=Ge()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=re(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const r=re(s?.normalizedBarcode??s?.barcode);r&&t.add(r)})}),t}function bl(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=Ct();if(!t||!n){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}$c({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):E(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(Vt.change,t=>{Ws(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),Ws(e,Ar()))}function hl(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,r=a.length?a:t.barcode?[t.barcode]:[];if(!r.length)return;let i=0,c=null;const d=[],l=new Set;r.forEach(p=>{const y=re(p);y&&!l.has(y)&&(l.add(y),d.push(y))});const u=Math.min(s,d.length);for(let p=0;p<u;p+=1){const y=d[p],m=Kr(y,null,{silent:!0});m.success&&(i+=1),m.message&&(c=m.message)}if(i>0){const y=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",h(String(i)));E(y)}else c&&E(c)}function Qr(){bl(),!(Vs||typeof document>"u")&&(document.addEventListener(Vt.requestAdd,hl),Vs=!0)}function gn(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),r=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:r}}function La(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=gn();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const r=document.getElementById("equipment-barcode"),i=document.getElementById("equipment-description"),c=t==="package";r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),fc(t),t==="package"&&ra()}function ra(){const{packageSelect:e,packageHint:t}=gn();if(!e)return;const n=pr();Lr=n,sc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,r=n.map(c=>{const d=Number.isFinite(Number(c.price))?Number(c.price):0,l=h(d.toFixed(2)),u=`${c.name} — ${l} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${r}`,e.selectedIndex=0;const i=n.length>0;e.disabled=!i,t&&(i?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),Xr()}function vl(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:r,blockingPackages:i})=>{const c=r?.desc||h(String(r?.barcode??r?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(i)&&i.length){const d=i.map(l=>l.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${d})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function Gr(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const r=xa(e);if(!r)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const i=ll(r);if(!i)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(m=>m?.type==="package"&&xa(m.packageId)===r))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(rc(r,n,a,s)){const m=i.name||r;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${m} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(i.items)&&i.items.length?i.items:fr(i.raw??{}),d=ys(t),l=[],u=new Set;if(c.forEach(m=>{const f=re(m?.normalizedBarcode??m?.barcode);if(f){if(u.has(f)){l.push({item:m,type:"internal"});return}u.add(f),d.has(f)&&l.push({item:m,type:"external"})}}),l.length){const m=l.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>h(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:l.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",m):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",m),duplicates:l}}const p=[];return c.forEach(m=>{const f=re(m?.normalizedBarcode??m?.barcode);if(f&&Qe(f,n,a,s)){const g=Ya(f,n,a,s);p.push({item:m,blockingPackages:g})}}),p.length?{success:!1,reason:"item_conflict",message:vl(i,p),conflicts:p}:{success:!0,package:{id:`package::${r}`,packageId:r,type:"package",desc:i.name||`Package ${r}`,qty:1,price:Number.isFinite(Number(i.price))?Number(i.price):0,barcode:i.code||i.raw?.package_code||`pkg-${r}`,packageItems:c.map(m=>({equipmentId:m?.equipmentId??null,barcode:m?.barcode??m?.normalizedBarcode??"",normalizedBarcode:re(m?.normalizedBarcode??m?.barcode),desc:m?.desc??"",qty:Number.isFinite(Number(m?.qty))?Number(m.qty):1,price:Number.isFinite(Number(m?.price))?Number(m.price):0})),image:c.find(m=>m?.image)?.image??null},packageInfo:i}}function Wr(e,{silent:t=!1}={}){const n=xa(e);if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=Ct(),r=Ge(),i=Gr(n,{existingItems:r,start:a,end:s});if(!i.success){if(!t){const d={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[i.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");E(i.message||d)}return i}return Gn(i.package),nt(),oe(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:i.package}}function Xr(){const{packageSelect:e}=gn();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;Wr(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function ql(){const{packageAddButton:e,packageSelect:t}=gn();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}Wr(n)}),e.dataset.listenerAttached="true")}function Jr(){const{modeRadios:e}=gn();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&La(s.target.value)}),a.dataset.listenerAttached="true")}),ql(),Xr();const t=jn(),n=e.find(a=>a.value===t);n&&(n.checked=!0),La(t)}function nt(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=Ge(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),d=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const l=jt(n);t.innerHTML=l.map(u=>{const p=u.items[0]||{},y=Tt(p)||u.image,m=y?`<img src="${y}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',f=h(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,b=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,w=`${h(g.toFixed(2))} ${s}`,v=`${h(b.toFixed(2))} ${s}`,A=u.items.some(x=>x?.type==="package"),N=u.barcodes.map(x=>h(String(x||""))).filter(Boolean),O=N.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${N.map(x=>`<li>${x}</li>`).join("")}
            </ul>
          </details>`:"";let q="";if(A){const x=new Map;if(u.items.forEach(I=>{Array.isArray(I?.packageItems)&&I.packageItems.forEach(_=>{if(!_)return;const T=re(_.barcode||_.desc||Math.random()),$=x.get(T);if($){$.qty+=Number.isFinite(Number(_.qty))?Number(_.qty):1;return}x.set(T,{desc:_.desc||_.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(_.qty))?Number(_.qty):1,barcode:_.barcode??_.normalizedBarcode??""})})}),x.size){const I=Array.from(x.values()).map(_=>{const T=h(String(_.qty)),$=_.desc||h(String(_.barcode||"")),j=_.barcode?` <span class="reservation-package-items__barcode">(${h(String(_.barcode))})</span>`:"";return`<li>${$}${j} × ${T}</li>`}).join("");q=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${I}
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
              <span class="reservation-qty-value">${f}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${i}" ${A?"disabled":""}>+</button>
            </div>
          </td>
          <td>${w}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${d}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function Sl(e){const t=Ge(),a=jt(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(dc(s),nt(),oe())}function El(e){const t=Ge(),n=t.filter(a=>yn(a)!==e);n.length!==t.length&&(gr(n),nt(),oe())}function xl(e){const t=Ge(),a=jt(t).find(p=>p.key===e);if(!a)return;const{start:s,end:r}=Ct();if(!s||!r){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(p=>re(p.barcode))),{equipment:c=[]}=ue(),d=(c||[]).find(p=>{const y=re(p?.barcode);return!y||i.has(y)||yn({desc:p?.desc||p?.description||p?.name||"",price:Number(p?.price)||0})!==e||!ss(p)?!1:!Qe(y,s,r)});if(!d){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const l=re(d.barcode),u=Kt(d);if(!u){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}Gn({id:u,equipmentId:u,barcode:l,desc:d.desc||d.description||d.name||a.description||"",qty:1,price:Number.isFinite(Number(d.price))?Number(d.price):a.unitPrice,image:Tt(d)}),nt(),oe()}function oe(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),d=c?.value||"unpaid",{start:l,end:u}=Ct();i&&He();const p=Mt(),y=document.getElementById("res-payment-progress-type"),m=document.getElementById("res-payment-progress-value"),f=Dr(y),g=Fr(m);Fs({selectedItems:Ge(),discount:n,discountType:s,applyTax:i,paidStatus:d,paymentProgressType:f,paymentProgressValue:g,start:l,end:u,companySharePercent:p,paymentHistory:[]});const b=Fs.lastResult;b?(Rr(m,b.paymentProgressValue),c&&(c.value=b.paymentStatus,Le(c,b.paymentStatus))):Le(c,d)}function wl(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=h(c.target.value),oe()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",oe),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(Ne()){n.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ca("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(Ne()){a.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ca("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(Ne()){s.value="unpaid",Le(s,"unpaid"),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Le(s),oe()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(Ne()){r.value="percent",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",oe()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(Ne()){i.value="",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=h(c.target.value),oe()}),i.dataset.listenerAttached="true"),oe()}function Il(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){oe();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),oe()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Xs(){const{input:e,hidden:t}=ds(),{input:n,hidden:a}=Pt(),{customers:s}=ue();let r=t?.value?String(t.value):"";if(!r&&e?.value){const W=ja(e.value,{allowPartial:!0});W&&(r=String(W.id),t&&(t.value=r),e.value=W.label,e.dataset.selectedId=r)}const i=s.find(W=>String(W.id)===r);if(!i){E(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let d=a?.value?String(a.value):"";if(!d&&n?.value){const W=Pa(n.value,{allowPartial:!0});W&&(d=String(W.id),a&&(a.value=d),n.value=W.label,n.dataset.selectedId=d)}const l=document.getElementById("res-start").value,u=document.getElementById("res-end").value,p=document.getElementById("res-start-time")?.value||"00:00",y=document.getElementById("res-end-time")?.value||"00:00";if(!l||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${l}T${p}`,f=`${u}T${y}`,g=new Date(m),b=new Date(f);if(Number.isNaN(g.getTime())||Number.isNaN(b.getTime())||g>=b){E(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const w=uc(),v=Ge();if(v.length===0&&w.length===0){E(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const A=document.getElementById("res-notes")?.value||"",N=parseFloat(h(document.getElementById("res-discount")?.value))||0,O=document.getElementById("res-discount-type")?.value||"percent",q=document.getElementById("res-payment-status"),x=q?.value||"unpaid",I=document.getElementById("res-payment-progress-type"),_=document.getElementById("res-payment-progress-value"),T=Dr(I),$=Fr(_),j=d?ms(d):null,z=ul(j);if(d&&!j){E(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const W of v){const ae=dt(W.barcode);if(ae==="maintenance"||ae==="retired"){E(Qt(ae));return}}for(const W of v){const ae=re(W.barcode);if(Qe(ae,m,f)){E(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const W of w)if(br(W,m,f)){E(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const F=document.getElementById("res-tax"),M=document.getElementById("res-company-share"),k=!!d;k?(F&&(F.checked=!1,F.disabled=!0,F.classList.add("disabled"),F.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),M&&(M.checked=!1,M.disabled=!0,M.classList.add("disabled"),M.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),q&&(q.value="unpaid",q.disabled=!0,Le(q,"unpaid"),q.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),I&&(I.disabled=!0,I.classList.add("disabled")),_&&(_.value="",_.disabled=!0,_.classList.add("disabled"))):(F&&(F.disabled=!1,F.classList.remove("disabled"),F.title=""),M&&(M.disabled=!1,M.classList.remove("disabled"),M.title=""),q&&(q.disabled=!1,q.title=""),I&&(I.disabled=!1,I.classList.remove("disabled")),_&&(_.disabled=!1,_.classList.remove("disabled")));const G=k?!1:F?.checked||!1,B=!!M?.checked;if(!k&&B!==G){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let C=B?Mt():null;B&&(!Number.isFinite(C)||C<=0)&&(He(),C=Mt());const V=B&&G&&Number.isFinite(C)&&C>0;G&&He();const R=Za(v,N,O,G,w,{start:m,end:f,companySharePercent:V?C:0}),H=nc(),K=es({totalAmount:R,progressType:T,progressValue:$,history:[]});_&&Rr(_,K.paymentProgressValue);const te=[];K.paymentProgressValue!=null&&K.paymentProgressValue>0&&te.push({type:K.paymentProgressType||T,value:K.paymentProgressValue,amount:K.paidAmount,percentage:K.paidPercent,recordedAt:new Date().toISOString()});const ne=ts({manualStatus:x,paidAmount:K.paidAmount,paidPercent:K.paidPercent,totalAmount:R});q&&(q.value=ne,Le(q,ne));const ce=hr({reservationCode:H,customerId:c,start:m,end:f,status:z?"confirmed":"pending",title:null,location:null,notes:A,projectId:d||null,totalAmount:R,discount:k?0:N,discountType:k?"percent":O,applyTax:G,paidStatus:k?"unpaid":ne,confirmed:z,items:v.map(W=>({...W,equipmentId:W.equipmentId??W.id})),technicians:w,companySharePercent:k||!V?null:C,companyShareEnabled:k?!1:V,paidAmount:k?0:K.paidAmount,paidPercentage:k?0:K.paidPercent,paymentProgressType:k?null:K.paymentProgressType,paymentProgressValue:k?null:K.paymentProgressValue,paymentHistory:k?[]:te});try{const W=await mc(ce);fn(),lt(),mn(),_l(),E(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof _a=="function"&&_a({type:"created",reservation:W}),Al(W)}catch(W){console.error("❌ [reservations/createForm] Failed to create reservation",W);const ae=Wn(W)?W.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");E(ae,"error"),k&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),nn({clearValue:!1}))}}function Al(e){if(!kn)return;const{draftStorageKey:t=Pr,returnUrl:n=Cr}=kn,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}kn=null,n&&(window.location.href=n)}function nn({clearValue:e=!1}={}){const{input:t,hidden:n}=Pt();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,ct())}function kl(e,t=""){const{input:n,hidden:a}=Pt();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),ct())}function _l(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),Ze({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),nn({clearValue:!1}),Ht({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",Le(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),pc(),gr([]),Cn("form-reset"),nt(),ct(),oe()}function $l(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){Sl(s);return}if(a==="increase-group"&&s){xl(s);return}if(a==="remove-group"&&s){El(s);return}}),e.dataset.listenerAttached="true")}function Tl(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(jn()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,Kr(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||jn()!=="single")return;const{start:r,end:i}=Ct();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function jl(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Xs()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Xs()}),t.dataset.listenerAttached="true")}function Ou({onAfterSubmit:e}={}){_a=typeof e=="function"?e:null;const{customers:t,projects:n}=ue();lc(t||[]),Ze(),fs(),Hr(n||[]),zr({projectsList:n}),ps(),lt(),ra(),gl(),Qr(),Jr(),Il(),wl(),$l(),Tl(),jl(),ml(),oe(),nt()}function Yr(){lt(),ra(),zr(),Ze(),fs(),ps(),Qr(),Jr(),nt(),oe()}if(typeof document<"u"){const e=()=>{Ze(),Ht({projectsList:us()}),fs(),ps(),oe()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{lt()}),document.addEventListener("packages:changed",()=>{ra(),jn()==="package"&&La("package")})}typeof window<"u"&&(window.getCompanySharePercent=Mt);function Zr(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:qt(t),endDate:qt(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:qt(n),endDate:qt(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:qt(n),endDate:qt(a)}}return e==="upcoming"?{startDate:qt(t),endDate:""}:{startDate:"",endDate:""}}function Pl(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=h(t?.value||"").trim(),i=h(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),Hn(t),Hn(n),r="",i=""),!r&&!i&&c){const l=Zr(c);r=l.startDate,i=l.endDate}return{searchTerm:we(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function zu(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{Cl(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),Hn(a),Hn(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function Cl(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=Zr(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function qt(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function Hn(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function xn(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function Nl(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function Ll(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=Nl(n);if(a!==null)return a}return null}function Js(e,t=0){const n=Ll(e);if(n!=null)return n;const a=xn(e.createdAt??e.created_at);if(a!=null)return a;const s=xn(e.updatedAt??e.updated_at);if(s!=null)return s;const r=xn(e.start);if(r!=null)return r;const i=xn(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function Bl({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((v,A)=>({reservation:v,index:A})),i=t.searchTerm||"",c=t.searchReservationId||"",d=t.searchCustomerName||"",l=t.searchProjectId||"",u=t.startDate||"",p=t.endDate||"",y=t.status||"",m=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,f=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,b=p?new Date(`${p}T23:59:59`):null,w=r.filter(({reservation:v})=>{const A=n.get(String(v.customerId)),N=s?.get?.(String(v.projectId)),O=v.start?new Date(v.start):null,q=ls(v),{effectiveConfirmed:x}=ut(v,N);if(m!=null&&String(v.customerId)!==String(m)||f!=null&&!(Array.isArray(v.technicians)?v.technicians.map(j=>String(j)):[]).includes(String(f))||y==="confirmed"&&!x||y==="pending"&&x||y==="completed"&&!q||g&&O&&O<g||b&&O&&O>b)return!1;if(c){const $=[v.reservationId,v.id,v.reservation_id,v.reservationCode,v.reservation_code,v.code,v.reference,v.referenceNumber,v.reference_number],j=we($.filter(F=>F!=null&&F!=="").map(String).join(" ")).replace(/\s+/g,""),z=c.replace(/\s+/g,"");if(!j.includes(z))return!1}if(d&&!we(A?.customerName||"").includes(d))return!1;if(l){const $=[v.projectId,v.project_id,v.projectID,N?.id,N?.projectCode,N?.project_code],j=we($.filter(F=>F!=null&&F!=="").map(String).join(" ")).replace(/\s+/g,""),z=l.replace(/\s+/g,"");if(!j.includes(z))return!1}if(!i)return!0;const I=v.items?.map?.($=>`${$.barcode} ${$.desc}`).join(" ")||"",_=(v.technicians||[]).map($=>a.get(String($))?.name).filter(Boolean).join(" ");return we([v.reservationId,A?.customerName,v.notes,I,_,N?.title].filter(Boolean).join(" ")).includes(i)});return w.sort((v,A)=>{const N=Js(v.reservation,v.index),O=Js(A.reservation,A.index);return N!==O?O-N:A.index-v.index}),w}function Dl({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),d=o("reservations.list.itemsCountShort","{count} عنصر"),l=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),p=o("reservations.list.status.pending","⏳ غير مؤكد"),y=o("reservations.list.payment.paid","💳 مدفوع"),m=o("reservations.list.payment.unpaid","💳 غير مدفوع"),f=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),g=o("reservations.list.actions.confirm","✔️ تأكيد"),b=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),w=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),v={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:A,index:N})=>{const O=t.get(String(A.customerId)),q=A.projectId?a?.get?.(String(A.projectId)):null,x=ls(A),I=A.paidStatus??A.paid_status??(A.paid===!0||A.paid==="paid"?"paid":"unpaid"),_=I==="paid",T=I==="partial",{effectiveConfirmed:$,projectLinked:j}=ut(A,q),z=$?"status-confirmed":"status-pending",F=_?"status-paid":T?"status-partial":"status-unpaid";let M=`<span class="reservation-chip status-chip ${z}">${$?u:p}</span>`;const k=_?y:T?f:m;let G=`<span class="reservation-chip status-chip ${F}">${k}</span>`,B=_?" tile-paid":T?" tile-partial":" tile-unpaid";x&&(B+=" tile-completed");let C="";x&&(M=`<span class="reservation-chip status-chip status-completed">${u}</span>`,G=`<span class="reservation-chip status-chip status-completed">${k}</span>`,C=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const V=!j&&!$?`<button class="tile-confirm" data-reservation-index="${N}" data-action="confirm">${g}</button>`:"",R=V?`<div class="tile-actions">${V}</div>`:"",H=A.items?.length||0,K=(A.technicians||[]).map(de=>n.get(String(de))).filter(Boolean),te=K.map(de=>de.name).join(l)||"—",ne=h(String(A.reservationId??"")),ce=A.start?h(Be(A.start)):"-",W=A.end?h(Be(A.end)):"-",ae=h(String(A.cost??0)),me=h(String(H)),fe=A.notes?h(A.notes):c,Ie=d.replace("{count}",me),U=A.applyTax?`<small>${r}</small>`:"";let J=b;return A.projectId&&(J=q?.title?h(q.title):w),`
      <div class="${V?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${B}"${C} data-reservation-index="${N}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${ne}</div>
          <div class="tile-badges">
            ${M}
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
            <span class="tile-value">${J}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.start}</span>
            <span class="tile-value tile-inline">${ce}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.end}</span>
            <span class="tile-value tile-inline">${W}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.cost}</span>
            <span class="tile-value">${ae} ${s} ${U}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.equipment}</span>
            <span class="tile-value">${Ie}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.crew}</span>
            <span class="tile-value">${K.length?te:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${fe}</span>
          </div>
        </div>
        ${R}
      </div>
    `}).join("")}function je(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Fl(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=ut(e,s),c=e.paid===!0||e.paid==="paid",d=ls(e),l=e.items||[],u=jt(l),{technicians:p=[]}=ue(),y=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(p)?p:[]),m=new Map;y.forEach(D=>{if(!D||D.id==null)return;const ee=String(D.id),be=m.get(ee)||{};m.set(ee,{...be,...D})});const f=(e.technicians||[]).map(D=>m.get(String(D))).filter(Boolean),g=$t(),b=Xn(e.start,e.end),w=(D={})=>{const ee=[D.dailyWage,D.daily_rate,D.dailyRate,D.wage,D.rate];for(const be of ee){if(be==null)continue;const Re=parseFloat(h(String(be)));if(Number.isFinite(Re))return Re}return 0},v=(D={})=>{const ee=[D.dailyTotal,D.daily_total,D.totalRate,D.total,D.total_wage];for(const be of ee){if(be==null)continue;const Re=parseFloat(h(String(be)));if(Number.isFinite(Re))return Re}return w(D)},N=l.reduce((D,ee)=>D+(ee.qty||1)*(ee.price||0),0)*b,O=f.reduce((D,ee)=>D+w(ee),0),q=f.reduce((D,ee)=>D+v(ee),0),x=O*b,I=q*b,_=N+I,T=parseFloat(e.discount)||0,$=e.discountType==="amount"?T:_*(T/100),j=Math.max(0,_-$),z=r?!1:e.applyTax,F=Number(e.cost),M=Number.isFinite(F),k=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,G=k!=null?parseFloat(h(String(k))):NaN;let V=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(G)&&G>0)&&Number.isFinite(G)?G:0;z&&V<=0&&(V=tt);let R=V>0?Math.max(0,j*(V/100)):0;const H=j+R,K=z?H*.15:0,te=Number.isFinite(K)&&K>0?Number(K.toFixed(2)):0,ne=H+te,ce=Number.isFinite(ne)?Number(ne.toFixed(2)):0,W=r?ce:M?F:ce;V>0&&(R=Number(Math.max(0,j*(V/100)).toFixed(2)));const ae=h(String(e.reservationId??e.id??"")),me=e.start?h(Be(e.start)):"-",fe=e.end?h(Be(e.end)):"-",Ie=h(String(f.length)),U=h(N.toFixed(2)),J=h($.toFixed(2)),Y=h(j.toFixed(2)),de=h(te.toFixed(2)),Te=h((Number.isFinite(W)?W:0).toFixed(2)),yt=h(String(b)),X=o("reservations.create.summary.currency","SR"),pe=o("reservations.details.labels.discount","الخصم"),L=o("reservations.details.labels.tax","الضريبة (15%)"),ie=o("reservations.details.labels.crewTotal","إجمالي الفريق"),Ee=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),ge=o("reservations.details.labels.duration","عدد الأيام"),le=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),Ae=o("reservations.details.labels.netProfit","💵 صافي الربح"),Ce=o("reservations.create.equipment.imageAlt","صورة"),qe={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},at=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),Lt=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),Z=o("reservations.details.technicians.roleUnknown","غير محدد"),Se=o("reservations.details.technicians.phoneUnknown","غير متوفر"),gt=o("reservations.details.technicians.wage","{amount} {currency} / اليوم"),Zi=o("reservations.list.status.confirmed","✅ مؤكد"),eo=o("reservations.list.status.pending","⏳ غير مؤكد"),to=o("reservations.list.payment.paid","💳 مدفوع"),no=o("reservations.list.payment.unpaid","💳 غير مدفوع"),ao=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),so=o("reservations.list.status.completed","📁 منتهي"),ro=o("reservations.details.labels.id","🆔 رقم الحجز"),io=o("reservations.details.section.bookingInfo","بيانات الحجز"),oo=o("reservations.details.section.paymentSummary","ملخص الدفع"),co=o("reservations.details.labels.finalTotal","المجموع النهائي"),lo=o("reservations.details.section.crew","😎 الفريق الفني"),uo=o("reservations.details.crew.count","{count} عضو"),mo=o("reservations.details.section.items","📦 المعدات المرتبطة"),po=o("reservations.details.items.count","{count} عنصر"),fo=o("reservations.details.actions.edit","✏️ تعديل"),yo=o("reservations.details.actions.delete","🗑️ حذف"),go=o("reservations.details.labels.customer","العميل"),bo=o("reservations.details.labels.contact","رقم التواصل"),ho=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const vo=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),qo=o("reservations.details.actions.openProject","📁 فتح المشروع"),So=o("reservations.details.labels.start","بداية الحجز"),Eo=o("reservations.details.labels.end","نهاية الحجز"),xo=o("reservations.details.labels.notes","ملاحظات"),wo=o("reservations.list.noNotes","لا توجد ملاحظات"),Io=o("reservations.details.labels.itemsCount","عدد المعدات"),Ao=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),ko=o("reservations.paymentHistory.title","سجل الدفعات"),_o=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),$o=o("reservations.list.unknownCustomer","غير معروف"),pa=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),$s=pa==="partial",To=pa==="paid"?to:$s?ao:no,jo=u.reduce((D,ee)=>D+(Number(ee.quantity)||0),0),Po=h(String(jo)),Ts=po.replace("{count}",Po),Co=uo.replace("{count}",Ie),No=e.notes?h(e.notes):wo,Lo=h(I.toFixed(2)),Bo=h(String(V)),Do=h(R.toFixed(2)),Fo=`${Bo}% (${Do} ${X})`,Ro=Math.max(0,N+I-$),js=Math.max(0,Ro-x),Mo=h(js.toFixed(2)),st=[{icon:"💼",label:Ao,value:`${U} ${X}`}];st.push({icon:"😎",label:ie,value:`${Lo} ${X}`}),$>0&&st.push({icon:"💸",label:pe,value:`${J} ${X}`}),st.push({icon:"📊",label:Ee,value:`${Y} ${X}`}),z&&te>0&&st.push({icon:"🧾",label:L,value:`${de} ${X}`}),V>0&&st.push({icon:"🏦",label:le,value:Fo}),Math.abs(js-(W??0))>.009&&st.push({icon:"💵",label:Ae,value:`${Mo} ${X}`}),st.push({icon:"💰",label:co,value:`${Te} ${X}`});const Ho=st.map(({icon:D,label:ee,value:be})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${D} ${ee}</span>
      <span class="summary-details-value">${be}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let Wt=[];Array.isArray(e.paymentHistory)?Wt=e.paymentHistory:Array.isArray(e.payment_history)&&(Wt=e.payment_history);const Oo=Array.isArray(e.paymentLogs)?e.paymentLogs:[],Ps=Array.isArray(Wt)&&Wt.length>0?Wt:Oo,zo=Ps.length?`<ul class="reservation-payment-history-list">${Ps.map(D=>{const ee=D?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):D?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),be=Number.isFinite(Number(D?.amount))&&Number(D.amount)>0?`${h(Number(D.amount).toFixed(2))} ${X}`:"—",Re=Number.isFinite(Number(D?.percentage))&&Number(D.percentage)>0?`${h(Number(D.percentage).toFixed(2))}%`:"—",Bt=D?.recordedAt?h(Be(D.recordedAt)):"—",ht=D?.note?`<div class="payment-history-note">${je(h(D.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${je(ee)}</span>
              <span class="payment-history-entry__amount">${be}</span>
              <span class="payment-history-entry__percent">${Re}</span>
              <span class="payment-history-entry__date">${Bt}</span>
            </div>
            ${ht}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${je(_o)}</div>`,Cs=[{text:i?Zi:eo,className:i?"status-confirmed":"status-pending"},{text:To,className:pa==="paid"?"status-paid":$s?"status-partial":"status-unpaid"}];d&&Cs.push({text:so,className:"status-completed"});const Vo=Cs.map(({text:D,className:ee})=>`<span class="status-chip ${ee}">${D}</span>`).join(""),bt=(D,ee,be)=>`
    <div class="res-info-row">
      <span class="label">${D} ${ee}</span>
      <span class="value">${be}</span>
    </div>
  `;let fa="";if(e.projectId){let D=je(vo);if(s){const ee=s.title||o("projects.fallback.untitled","مشروع بدون اسم");D=`${je(ee)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${je(qo)}</button>`}fa=`
      <div class="res-info-row">
        <span class="label">📁 ${ho}</span>
        <span class="value">${D}</span>
      </div>
    `}const Xe=[];Xe.push(bt("👤",go,t?.customerName||$o)),Xe.push(bt("📞",bo,t?.phone||"—")),Xe.push(bt("🗓️",So,me)),Xe.push(bt("🗓️",Eo,fe)),Xe.push(bt("📦",Io,Ts)),Xe.push(bt("⏱️",ge,yt)),Xe.push(bt("📝",xo,No)),fa&&Xe.push(fa);const Uo=Xe.join(""),Ko=u.length?u.map(D=>{const ee=D.items[0]||{},be=Tt(ee)||D.image,Re=be?`<img src="${be}" alt="${Ce}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',Bt=D.items.some(Oe=>Oe?.type==="package"),ht=Number(D.quantity)||Number(D.count)||0,Xo=h(String(ht)),Ns=Number.isFinite(Number(D.unitPrice))?Number(D.unitPrice):0,Jo=Number.isFinite(Number(D.totalPrice))?Number(D.totalPrice):Ns*ht,Yo=`${h(Ns.toFixed(2))} ${X}`,Zo=`${h(Jo.toFixed(2))} ${X}`,Ls=D.barcodes.map(Oe=>h(String(Oe||""))).filter(Boolean),Bs=Ls.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${Ls.map(Oe=>`<li>${Oe}</li>`).join("")}
              </ul>
            </details>`:"";let Ds="";if(Bt){const Oe=new Map;if(D.items.forEach(hn=>{Array.isArray(hn?.packageItems)&&hn.packageItems.forEach(xe=>{if(!xe)return;const vn=re(xe.barcode||xe.normalizedBarcode||xe.desc||Math.random()),qn=Oe.get(vn),Sn=Number.isFinite(Number(xe.qty))?Number(xe.qty):1;if(qn){qn.qty+=Sn;return}Oe.set(vn,{desc:xe.desc||xe.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Sn,barcode:xe.barcode??xe.normalizedBarcode??""})})}),Oe.size){const hn=Array.from(Oe.values()).map(xe=>{const vn=h(String(xe.qty)),qn=je(xe.desc||""),Sn=xe.barcode?` <span class="reservation-package-items__barcode">(${je(h(String(xe.barcode)))})</span>`:"";return`<li>${qn}${Sn} × ${vn}</li>`}).join("");Ds=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${hn}
                </ul>
              </details>
            `}}const ec=Bt?`${Ds||""}${Bs||""}`:Bs;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${Re}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${je(ee.desc||ee.description||ee.name||D.description||"-")}</div>
                  ${ec}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${je(qe.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Xo}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${je(qe.unitPrice)}">${Yo}</td>
            <td class="reservation-modal-items-table__cell" data-label="${je(qe.total)}">${Zo}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${je(qe.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${at}</td></tr>`,Qo=`
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
        <tbody>${Ko}</tbody>
      </table>
    </div>
  `,Go=f.map((D,ee)=>{const be=h(String(ee+1)),Re=D.role||Z,Bt=D.phone||Se,ht=D.wage?gt.replace("{amount}",h(String(D.wage))).replace("{currency}",X):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${be}</span>
          <span class="technician-name">${D.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${Re}</div>
          <div>📞 ${Bt}</div>
          ${ht?`<div>💰 ${ht}</div>`:""}
        </div>
      </div>
    `}).join(""),Wo=f.length?`<div class="reservation-technicians-grid">${Go}</div>`:`<ul class="reservation-modal-technicians"><li>${Lt}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${ro}</span>
          <strong>${ae}</strong>
        </div>
        <div class="status-chips">
          ${Vo}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${io}</h6>
          ${Uo}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${oo}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${Ho}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${ko}</h6>
              ${zo}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${lo}</span>
          <span class="count">${Co}</span>
        </div>
        ${Wo}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${mo}</span>
          <span class="count">${Ts}</span>
        </div>
        ${Qo}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${fo}</button>
        ${g?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${yo}</button>`:""}
      </div>
    </div>
  `}const Vu="project",Uu="editProject",Ku=3600*1e3,ei=.15,Qu=6,Gu="projectsTab",Wu="projectsSubTab",Xu={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},Ju={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},Yu={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},Rl=`@page {
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
`,Ml=/color\([^)]*\)/gi,on=/(color\(|color-mix\(|oklab|oklch)/i,Hl=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"],Ol=typeof document<"u"?document.createElement("canvas"):null,wn=Ol?.getContext?.("2d")||null;function ti(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function Ba(e,t="#000"){if(!wn||!e)return t;try{return wn.fillStyle="#000",wn.fillStyle=e,wn.fillStyle||t}catch{return t}}function zl(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&on.test(n)){const s=Ba(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function Dt(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function Zu(e=[]){if(!(!Array.isArray(e)||!e.length))for(let t=e.length-1;t>=0;t-=1){const{element:n,prop:a,value:s,priority:r}=e[t]||{};!n?.style||!a||(s&&s.length>0?n.style.setProperty(a,s,r||""):n.style.removeProperty(a))}}function ni(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;Hl.forEach(c=>{const d=r[c];if(d&&on.test(d)){const l=ti(c);Dt(n,s,l);const u=c==="backgroundColor"?"#ffffff":r.color||"#000000",p=Ba(d,u);s.style.setProperty(l,p,"important")}});const i=r.backgroundImage;if(i&&on.test(i)){const c=Ba(r.backgroundColor||"#ffffff","#ffffff");Dt(n,s,"background-image"),Dt(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function ai(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(c=>{const d=r[c];if(d&&on.test(d)){const l=ti(c);Dt(n,s,l);const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(l,u,"important")}});const i=r.backgroundImage;i&&on.test(i)&&(Dt(n,s,"background-image"),Dt(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function si(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(Ml,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const ri="reservations.quote.sequence",Ys={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},ii="https://help.artratio.sa/guide/quote-preview",ve={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Vl=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Pe=[...Vl],Ul=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function Da(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...Pe]}function Kl(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=Da(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=Da(t.value);if(a.length)return a}const n=Pe.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...Pe]}const Ql=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],oi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>S(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>S(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>S(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>S(h(Number(e?.price||0).toFixed(2)))}],ci=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>S(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>S(e?.role||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>S(e?.phone||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Fa={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:oi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:ci.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},li=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>S(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>S(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>S(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],di=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>S(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>S(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>S(e?.note||"-")}],ui=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>S(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>S(h(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>S(h(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>S(e?.displayCost||"—")}],Gl=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],Wl={customerInfo:Fa.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:Fa.payment,projectExpenses:di.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:li.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:ui.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},va=new Map;function ia(e="reservation"){if(va.has(e))return va.get(e);const t=e==="project"?Gl:Ql,n=e==="project"?Wl:Fa,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(d=>d.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return va.set(e,r),r}function oa(e="reservation"){return ia(e).sectionDefs}function mi(e="reservation"){return ia(e).fieldDefs}function pi(e="reservation"){return ia(e).sectionIdSet}function fi(e="reservation"){return ia(e).fieldIdMap}function yi(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const Xl="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",Jl="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",Yl="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",gi=Rl.trim(),bi=/^data:image\/svg\+xml/i,Zl=/\.svg($|[?#])/i,en=512,Ra="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",hi=96,vi=25.4,Ma=210,_n=297,$n=Math.round(Ma/vi*hi),Tn=Math.round(_n/vi*hi),ed=2,qi=/safari/i,td=/(iphone|ipad|ipod)/i,Zs=/(iphone|ipad|ipod)/i,nd=/(crios|fxios|edgios|opios)/i,On="[reservations/pdf]";let Q=null,P=null,Ve=1,Jt=null,Yt=null,it=null,Ft=null,an=!1;function It(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!Q?.statusIndicator||!Q?.statusText)return;Q.statusKind=e;const r=t||yi(e);Q.statusText.textContent=r,Q.statusSpinner&&(Q.statusSpinner.hidden=!s),Q.statusAction&&(Q.statusAction.hidden=!0,Q.statusAction.onclick=null,n&&typeof a=="function"&&(Q.statusAction.textContent=n,Q.statusAction.hidden=!1,Q.statusAction.onclick=i=>{i.preventDefault(),a()})),Q.statusIndicator.hidden=!1,requestAnimationFrame(()=>{Q.statusIndicator.classList.add("is-visible")})}function sn(e){!Q?.statusIndicator||!Q?.statusText||(Q.statusKind=null,Q.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{Q?.statusIndicator&&(Q.statusIndicator.hidden=!0,Q.statusAction&&(Q.statusAction.hidden=!0,Q.statusAction.onclick=null),Q.statusSpinner&&(Q.statusSpinner.hidden=!1))},220))}function Ha(){return!!window?.bootstrap?.Modal}function ad(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),it||(it=document.createElement("div"),it.className="modal-backdrop fade show",it.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(it)),Ft||(Ft=t=>{t.key==="Escape"&&Oa(e)},document.addEventListener("keydown",Ft));try{e.focus({preventScroll:!0})}catch{}}}function Oa(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),it&&(it.remove(),it=null),Ft&&(document.removeEventListener("keydown",Ft),Ft=null))}function sd(e){if(e){if(Ha()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}ad(e)}}function rd(){if(an)return;an=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!Q?.modal?.classList.contains("show"),s=()=>{Q?.modal?.classList.contains("show")&&(It("render"),an=!1,Nt())};mr({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:ii}),a&&It("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function ca(e="reservation"){const t={},n=mi(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function gs(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function id(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function bs(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function hs(e="reservation"){return Object.fromEntries(oa(e).map(({id:t})=>[t,!1]))}function vs(e,t){return e.sectionExpansions||(e.sectionExpansions=hs(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function od(e,t){return vs(e,t)?.[t]!==!1}function qs(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function cd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return td.test(e)}function ld(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=qi.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Si(){return cd()&&ld()}function la(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=Zs.test(e)||Zs.test(t),s=/Macintosh/i.test(e)&&n>1;return qi.test(e)&&!nd.test(e)&&(a||s)}function qa(e,...t){try{console.log(`${On} ${e}`,...t)}catch{}}function et(e,...t){try{console.warn(`${On} ${e}`,...t)}catch{}}function dd(e,t,...n){try{t?console.error(`${On} ${e}`,t,...n):console.error(`${On} ${e}`,...n)}catch{}}function ye(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function ud(e,t="لا توجد بيانات للعرض."){const n=S(o(e,t));return ye(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function zn(e,t){return Array.isArray(e)&&e.length?e:[ud(t)]}const md=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function Ei(e=""){return md.test(e)}function pd(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!Ei(r))return a.call(this,r,...i);let c,d=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),d=!0)}catch{}try{if(!d){const l=this.canvas;l&&l.style?.direction!=="rtl"&&(l.__artRatioOriginalDirection=l.style.direction,l.style.direction="rtl")}return a.call(this,r,...i)}finally{if(d&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!d){const l=this.canvas;l&&l.__artRatioOriginalDirection!==void 0&&(l.style.direction=l.__artRatioOriginalDirection,delete l.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function er(e,t=en){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function fd(e){if(!e)return{width:en,height:en};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?er(t,0):0,s=n?er(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,d]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(d)&&d>0?d:0)}}return{width:a||en,height:s||en}}function xi(e=""){return typeof e!="string"?!1:bi.test(e)||Zl.test(e)}function yd(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function gd(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function wi(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await gd(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),d=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=d;const l=i.getContext("2d");return l.clearRect(0,0,c,d),l.drawImage(r,0,0,c,d),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function bd(e){if(!e)return null;if(bi.test(e))return yd(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function hd(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!xi(t))return!1;const n=await bd(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",Ra),!1;const a=await wi(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",Ra),!1)}async function vd(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=fd(e),s=await wi(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||Ra),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),d=e.getAttribute("height");return c&&i.setAttribute("width",c),d&&i.setAttribute("height",d),e.parentNode?.replaceChild(i,e),!!s}async function Ii(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{xi(s.getAttribute?.("src"))&&a.push(hd(s))}),n.forEach(s=>{a.push(vd(s))}),a.length&&await Promise.allSettled(a)}function qd(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(C,V=0)=>{const R=parseFloat(C);return Number.isFinite(R)?R:V},i=r(s.paddingTop),c=r(s.paddingBottom),d=r(s.paddingRight),l=r(s.paddingLeft),u=r(s.borderRadius),p=r(s.fontSize,14),y=(()=>{const C=s.lineHeight;if(!C||C==="normal")return p*1.6;const V=r(C,p*1.6);return V>0?V:p*1.6})(),m=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(m<=0)return null;const f=Math.max(1,m-l-d),g=e.textContent||"",b=g.split(/\r?\n/),w=n.createElement("canvas"),v=w.getContext("2d");if(!v)return null;const A=s.fontStyle||"normal",N=s.fontVariant||"normal",O=s.fontWeight||"400",q=s.fontFamily||"sans-serif",x=s.fontStretch||"normal",I=C=>C.join(" "),_=[],T=C=>v.measureText(C).width;v.font=`${A} ${N} ${O} ${x} ${p}px ${q}`,b.forEach(C=>{const V=C.trim();if(V.length===0){_.push("");return}const R=V.split(/\s+/);let H=[];R.forEach((K,te)=>{const ne=K.trim();if(!ne)return;const ce=I(H.concat(ne));if(T(ce)<=f||H.length===0){H.push(ne);return}_.push(I(H)),H=[ne]}),H.length&&_.push(I(H))}),_.length||_.push("");const $=i+c+_.length*y,j=Math.ceil(Math.max(1,m)*t),z=Math.ceil(Math.max(1,$)*t);w.width=j,w.height=z,w.style.width=`${Math.max(1,m)}px`,w.style.height=`${Math.max(1,$)}px`,v.scale(t,t);const F=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){v.save(),v.beginPath();const C=Math.max(1,m),V=Math.max(1,$),R=Math.min(u,C/2,V/2);v.moveTo(R,0),v.lineTo(C-R,0),v.quadraticCurveTo(C,0,C,R),v.lineTo(C,V-R),v.quadraticCurveTo(C,V,C-R,V),v.lineTo(R,V),v.quadraticCurveTo(0,V,0,V-R),v.lineTo(0,R),v.quadraticCurveTo(0,0,R,0),v.closePath(),v.clip()}if(v.fillStyle=F,v.fillRect(0,0,Math.max(1,m),Math.max(1,$)),v.font=`${A} ${N} ${O} ${x} ${p}px ${q}`,v.fillStyle=s.color||"#000000",v.textBaseline="top",v.textAlign="right","direction"in v)try{v.direction="rtl"}catch{}const M=Math.max(0,m-d);let k=i;_.forEach(C=>{const V=C.length?C:" ";v.fillText(V,M,k,f),k+=y});const G=n.createElement("img");let B;try{B=w.toDataURL("image/png")}catch(C){return et("note canvas toDataURL failed",C),null}return G.src=B,G.alt=g,G.style.width=`${Math.max(1,m)}px`,G.style.height=`${Math.max(1,$)}px`,G.style.display="block",G.setAttribute("data-quote-note-image","true"),{image:G,canvas:w,totalHeight:$,width:m}}function Sd(e,{pixelRatio:t=1}={}){if(!e||!la())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!Ei(a.textContent||""))return;let s;try{s=qd(a,{pixelRatio:t})}catch(r){et("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function za(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){dd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),d=o("reservations.quote.toast.retry","إعادة المحاولة"),l=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(It("export"),Di()):(It("render"),an=!1,Nt())};if(mr({message:i,duration:9e3,actionLabel:l?d:void 0,onAction:l?u:void 0,linkLabel:c,linkHref:ii}),Q?.modal?.classList.contains("show")&&It("error",{message:i,actionLabel:l?d:void 0,onAction:l?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function Va({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){et("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){et("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function Ss(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function tr(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function nr(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function Ed(){const e=nr();return e||(Yt||(Yt=Ss(Jl).catch(t=>{throw Yt=null,t}).then(()=>{const t=nr();if(!t)throw Yt=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Yt)}async function xd(){const e=tr();return e||(Jt||(Jt=Ss(Yl).catch(t=>{throw Jt=null,t}).then(()=>{const t=tr();if(!t)throw Jt=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),Jt)}async function wd(){if(window.html2pdf||await Ss(Xl),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}zl(),pd()}function S(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Id(e="reservation"){return e==="project"?"QP":"Q"}function Ad(e,t="reservation"){const n=Number(e),a=Id(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function kd(){const e=window.localStorage?.getItem?.(ri),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function Ai(e="reservation"){const n=kd()+1;return{sequence:n,quoteNumber:Ad(n,e)}}function _d(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(ri,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function ki(e="reservation"){return Ys[e]||Ys.reservation}function $d(e="reservation"){try{const t=ki(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function Td(e,t="reservation"){try{const n=ki(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function jd(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function Pd(e,t="reservation"){if(!e)return null;const n=pi(t),a=fi(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,d])=>{const l=i[c];if(l==null)return;const{ids:u,emptyExplicitly:p}=jd(l);if(!u&&!p)return;const y=Array.isArray(u)?u.filter(m=>d.has(m)):[];(y.length>0||p)&&(r[c]=y)}),{version:1,sections:s,fields:r}}function _i(e){if(!e)return;const t=e.context||"reservation",n=Pd(e,t);n&&Td(n,t)}function $i(e){if(!e)return;const t=e.context||"reservation",n=$d(t);if(!n)return;const a=pi(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=gs(e.fields||ca(t)),i=fi(t);Object.entries(n.fields).forEach(([c,d])=>{const l=i[c];if(!l)return;const u=Array.isArray(d)?d.filter(p=>l.has(p)):[];r[c]=new Set(u)}),e.fields=r}}function Ti(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function ji(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return 0}function Cd(e={}){const t=[e.dailyTotal,e.daily_total,e.totalRate,e.total,e.total_wage];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return ji(e)}function Nd(e){const t=mn()||[],{technicians:n=[]}=ue(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const i=String(r.id),c=s.get(i)||{};s.set(i,{...c,...r})}),(e.technicians||[]).map(r=>s.get(String(r))).filter(Boolean)}function Ld(e,t,n){const{projectLinked:a}=ut(e,n),s=Xn(e.start,e.end),c=(Array.isArray(e.items)?e.items:[]).reduce((B,C)=>B+(Number(C?.qty)||1)*(Number(C?.price)||0),0)*s,d=t.reduce((B,C)=>B+ji(C),0),l=t.reduce((B,C)=>B+Cd(C),0),u=d*s,p=l*s,y=c+p,m=parseFloat(e.discount)||0,f=e.discountType==="amount"?m:y*(m/100),g=Math.max(0,y-f),b=a?!1:e.applyTax,w=Number(e.cost),v=Number.isFinite(w),A=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,N=A!=null?parseFloat(h(String(A).replace("%","").trim())):NaN,O=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let x=(O!=null?O===!0||O===1||O==="1"||String(O).toLowerCase()==="true":Number.isFinite(N)&&N>0)&&Number.isFinite(N)?Number(N):0;b&&x<=0&&(x=tt);let I=x>0?Math.max(0,g*(x/100)):0;I=Number(I.toFixed(2));const _=g+I;let T=b?_*.15:0;(!Number.isFinite(T)||T<0)&&(T=0),T=Number(T.toFixed(2));const $=_+T,j=Number.isFinite($)?Number($.toFixed(2)):0,z=a?j:v?w:j,F=Math.max(0,c+p-f),M=Math.max(0,F-u),k={equipmentTotal:c,crewTotal:p,crewCostTotal:u,discountAmount:f,subtotalAfterDiscount:g,taxableAmount:_,taxAmount:T,finalTotal:z,companySharePercent:x,companyShareAmount:I,netProfit:M},G={equipmentTotal:h(c.toFixed(2)),crewTotal:h(p.toFixed(2)),discountAmount:h(f.toFixed(2)),subtotalAfterDiscount:h(g.toFixed(2)),taxableAmount:h(_.toFixed(2)),taxAmount:h(T.toFixed(2)),finalTotal:h(z.toFixed(2)),companySharePercent:h(x.toFixed(2)),companyShareAmount:h(I.toFixed(2)),netProfit:h(M.toFixed(2))};return{totals:k,totalsDisplay:G,rentalDays:s}}function Ot(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function Pi(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Bd(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=Ot(e.amount??(n==="amount"?e.value:null)),s=Ot(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=Pi(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function Dd(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(Bd).filter(Boolean);if(n.length>0)return n;const a=Ot(e.paidPercent??e.paid_percent),s=Ot(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Pi(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function Fd(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function Rd(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function Md(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function Hd(e){const t=Number(e?.equipmentEstimate)||0,n=Md(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const d=Math.max(0,a-c),l=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,p=l&&s&&u>0?u:0,y=p>0?Number((d*(p/100)).toFixed(2)):0,m=d+y;let f=s?m*ei:0;(!Number.isFinite(f)||f<0)&&(f=0),f=Number(f.toFixed(2));let g=s?Number(e?.totalWithTax):m;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((m+f).toFixed(2))):g=m,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:d,companyShareAmount:y,subtotal:m,applyTax:s,taxAmount:f,totalWithTax:g}}function Od(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.technicians)?e.technicians:[],i=Za(t,a,s,!1,r,{start:e.start,end:e.end});if(Number.isFinite(i))return i;const c=Number(h(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function zd(e,t){if(!e)return"—";const n=Be(e);return t?`${n} - ${Be(t)}`:n}function se(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${h(a.toFixed(s))} ${t}`}function ar(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function Vd(e){if(!e?.start)return null;if(!e?.end)return 1;const t=Xn(e.start,e.end);return Number.isFinite(t)?t:1}function Ud(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function Kd(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=ue(),i=e?.id!=null?s.find(L=>String(L.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:se(0,t),expensesTotal:se(0,t),reservationsTotal:se(0,t),discountAmount:se(0,t),taxAmount:se(0,t),overallTotal:se(0,t),paidAmount:se(0,t),remainingAmount:se(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:se(0,t),remainingAmountDisplay:se(0,t),paidPercentDisplay:ar(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const d=i.clientId??i.customerId??i.client_id??i.customer_id??null,l=d!=null&&n.find(L=>String(L.id)===String(d))||null,u=l?.customerName??l?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),p=(i.clientCompany||l?.companyName||l?.company||"").trim(),y=l?.phone??l?.customerPhone??i.clientPhone??i.customerPhone??"",m=y?h(String(y).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),f=l?.email??i.clientEmail??i.customerEmail??"",g=f?String(f).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),b=i.projectCode||`PRJ-${h(String(i.id??""))}`,w=h(String(b)),v=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),A=Fd(i.type),N=i.start?Be(i.start):"—",O=i.end?Be(i.end):"—",q=Vd(i),x=q!=null?Ud(q):"غير محدد",I=Rd(i),_={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},T=o(`projects.status.${I}`,_[I]||I),$=i.id!=null?String(i.id):null,j=$?a.filter(L=>String(L.projectId)===$):[],F=j.map(L=>{const ie=L.reservationId||L.id||"",Ee=L.status||L.state||"pending",ge=String(Ee).toLowerCase(),le=o(`reservations.status.${ge}`,ge),Ae=Od(L),Ce=L.start?new Date(L.start).getTime():0;return{reservationId:h(String(ie||"-")),status:ge,statusLabel:le,total:Ae,totalLabel:se(Ae,t),dateRange:zd(L.start,L.end),startTimestamp:Number.isNaN(Ce)?0:Ce}}).sort((L,ie)=>ie.startTimestamp-L.startTimestamp).map(({startTimestamp:L,...ie})=>ie).reduce((L,ie)=>L+(Number(ie.total)||0),0),M=new Map;j.forEach(L=>{const ie=Array.isArray(L.items)?L.items:[],Ee=Xn(L.start,L.end),ge=L.reservationId||L.id||"";ie.forEach((le,Ae)=>{if(!le)return;const Ce=le.barcode||le.code||le.id||le.desc||le.description||`item-${Ae}`,qe=String(Ce||`item-${Ae}`),at=M.get(qe)||{description:le.desc||le.description||le.name||le.barcode||`#${h(String(Ae+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},Lt=Number(le.qty)||1,Z=Number(le.price)||0;at.totalQuantity+=Lt,at.reservationIds.add(String(ge));const Se=Z*Lt*Math.max(1,Ee);Number.isFinite(Se)&&(at.totalCost+=Se),M.set(qe,at)})});const k=Array.from(M.values()).map(L=>({description:L.description,totalQuantity:L.totalQuantity,reservationsCount:L.reservationIds.size,displayCost:se(L.totalCost,t)})),G=new Map((r||[]).filter(Boolean).map(L=>[String(L.id),L])),B=new Map,C=L=>{if(!L)return;let ie=null;typeof L=="object"?ie=L.id??L.technicianId??L.technician_id??L.userId??L.user_id??null:(typeof L=="string"||typeof L=="number")&&(ie=L);const Ee=ie!=null?String(ie):null,ge=Ee&&G.has(Ee)?G.get(Ee):typeof L=="object"?L:null,le=ge?.name||ge?.full_name||ge?.fullName||ge?.displayName||(typeof L=="string"?L:null),Ae=ge?.role||ge?.title||null,Ce=ge?.phone||ge?.mobile||ge?.contact||null;if(!le&&!Ee)return;const qe=Ee||le;B.has(qe)||B.set(qe,{id:Ee,name:le||"-",role:Ae||null,phone:Ce||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(L=>C(L)),j.forEach(L=>{(Array.isArray(L.technicians)?L.technicians:[]).forEach(Ee=>C(Ee))});const V=Array.from(B.values()),R=Array.isArray(i.expenses)?i.expenses.map(L=>{const ie=Number(L?.amount)||0;return{label:L?.label||L?.name||"-",amount:ie,displayAmount:se(ie,t),note:L?.note||L?.description||""}}):[],H=Hd(i),K=H.applyTax?Number(((H.subtotal+F)*ei).toFixed(2)):0,te=Number((H.subtotal+F+K).toFixed(2)),ne=Dd(i),ce=Ot(i.paidAmount??i.paid_amount)||0,W=Ot(i.paidPercent??i.paid_percent)||0,ae=es({totalAmount:te,paidAmount:ce,paidPercent:W,history:ne}),me=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",fe=ts({manualStatus:me,paidAmount:ae.paidAmount,paidPercent:ae.paidPercent,totalAmount:te}),Ie={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},U=o(`projects.paymentStatus.${fe}`,Ie[fe]||fe),J=Number(ae.paidAmount||0),Y=Number(ae.paidPercent||0),de=Math.max(0,Number((te-J).toFixed(2))),Te={projectSubtotal:se(H.subtotal,t),expensesTotal:se(H.expensesTotal,t),reservationsTotal:se(F,t),discountAmount:se(H.discountAmount,t),taxAmount:se(K,t),overallTotal:se(te,t),paidAmount:se(J,t),remainingAmount:se(de,t)},yt={status:fe,statusLabel:U,paidAmount:J,paidPercent:Y,remainingAmount:de,paidAmountDisplay:se(J,t),remainingAmountDisplay:se(de,t),paidPercentDisplay:ar(Y)},X=(i.description||"").trim();return{project:i,customer:l,clientInfo:{name:u,company:p||"—",phone:m,email:g},projectInfo:{title:v,code:w,typeLabel:A,startDisplay:N,endDisplay:O,durationLabel:x,statusLabel:T},expenses:R,equipment:k,crew:V,totals:H,totalsDisplay:Te,projectTotals:{combinedTaxAmount:K,overallTotal:te,reservationsTotal:F,paidAmount:J,paidPercent:Y,remainingAmount:de,paymentStatus:fe},paymentSummary:yt,notes:X,currencyLabel:t,projectStatus:I,projectStatusLabel:T,projectDurationDays:q,projectDurationLabel:x,paymentHistory:ne}}function Qd({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:d={},currencyLabel:l="SR",sections:u,fieldSelections:p={},quoteNumber:y,quoteDate:m,terms:f=Pe}){const g=gs(p),b=(U,J)=>bs(g,U,J),w=U=>u?.has?.(U),v=`<div class="quote-placeholder">${S(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,A=(U,J)=>`<div class="info-plain__item">
      <span class="info-plain__label">${S(U)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${S(J)}</span>
    </div>`,N=(U,J,{variant:Y="inline"}={})=>Y==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${S(U)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${S(J)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${S(U)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${S(J)}</span>
    </span>`,O=(U,J)=>`<div class="payment-row">
      <span class="payment-row__label">${S(U)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${S(J)}</span>
    </div>`,q=[];b("customerInfo","customerName")&&q.push(A(o("projects.details.client","العميل"),t.name||"-")),b("customerInfo","customerCompany")&&q.push(A(o("projects.details.company","شركة العميل"),t.company||"—")),b("customerInfo","customerPhone")&&q.push(A(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),b("customerInfo","customerEmail")&&q.push(A(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const x=w("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${S(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${q.length?`<div class="info-plain">${q.join("")}</div>`:v}
      </section>`:"",I=[];b("projectInfo","projectType")&&I.push(A(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),b("projectInfo","projectTitle")&&I.push(A(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),b("projectInfo","projectCode")&&I.push(A(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),b("projectInfo","projectStart")&&I.push(A(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),b("projectInfo","projectEnd")&&I.push(A(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),b("projectInfo","projectDuration")&&I.push(A(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),b("projectInfo","projectStatus")&&I.push(A(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const _=w("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${S(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${I.length?`<div class="info-plain">${I.join("")}</div>`:v}
      </section>`:"",T=li.filter(U=>b("projectCrew",U.id)),$=w("projectCrew")?T.length?`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${T.map(U=>`<th>${S(U.labelKey?o(U.labelKey,U.fallback):U.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((U,J)=>`<tr>${T.map(Y=>`<td>${Y.render(U,J)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(T.length,1)}" class="empty">${S(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${v}
          </section>`:"",j=[];b("financialSummary","projectSubtotal")&&j.push(N(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${se(0,l)}`)),b("financialSummary","expensesTotal")&&j.push(N(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||se(0,l))),b("financialSummary","reservationsTotal")&&j.push(N(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||se(0,l))),b("financialSummary","discountAmount")&&j.push(N(o("reservations.details.labels.discount","الخصم"),i.discountAmount||se(0,l))),b("financialSummary","taxAmount")&&j.push(N(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||se(0,l)));const z=[];b("financialSummary","overallTotal")&&z.push(N(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||se(0,l),{variant:"final"})),b("financialSummary","paidAmount")&&z.push(N(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||se(0,l),{variant:"final"})),b("financialSummary","remainingAmount")&&z.push(N(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||se(0,l),{variant:"final"}));const F=w("financialSummary")?!j.length&&!z.length?`<section class="quote-section quote-section--financial">${v}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${S(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${j.length?`<div class="totals-inline">${j.join("")}</div>`:""}
            ${z.length?`<div class="totals-final">${z.join("")}</div>`:""}
          </div>
        </section>`:"",M=di.filter(U=>b("projectExpenses",U.id)),k=w("projectExpenses")?M.length?`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${M.map(U=>`<th>${S(U.labelKey?o(U.labelKey,U.fallback):U.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((U,J)=>`<tr>${M.map(Y=>`<td>${Y.render(U,J)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(M.length,1)}" class="empty">${S(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${v}
          </section>`:"",G=ui.filter(U=>b("projectEquipment",U.id)),B=w("projectEquipment")?G.length?`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${G.map(U=>`<th>${S(U.labelKey?o(U.labelKey,U.fallback):U.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${r.length?r.map((U,J)=>`<tr>${G.map(Y=>`<td>${Y.render(U,J)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(G.length,1)}" class="empty">${S(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${v}
          </section>`:"",C=(e?.description||"").trim()||"",V=w("projectNotes")?`<section class="quote-section">
        <h3>${S(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${S(C||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",R=[];b("payment","beneficiary")&&R.push(O(o("reservations.quote.labels.beneficiary","اسم المستفيد"),ve.beneficiaryName)),b("payment","bank")&&R.push(O(o("reservations.quote.labels.bank","اسم البنك"),ve.bankName)),b("payment","account")&&R.push(O(o("reservations.quote.labels.account","رقم الحساب"),h(ve.accountNumber))),b("payment","iban")&&R.push(O(o("reservations.quote.labels.iban","رقم الآيبان"),h(ve.iban)));const H=`<section class="quote-section">
      <div class="payment-block">
        <h3>${S(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${R.length?R.join(""):v}</div>
      </div>
      <p class="quote-approval-note">${S(ve.approvalNote)}</p>
    </section>`,K=Array.isArray(f)&&f.length?f:Pe,te=`<footer class="quote-footer">
        <h4>${S(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${K.map(U=>`<li>${S(U)}</li>`).join("")}</ul>
      </footer>`,ne=[],ce=[];if(_&&ce.push({key:"project",html:_}),x&&ce.push({key:"customer",html:x}),ce.length>1){const U=ce.find(de=>de.key==="project"),J=ce.find(de=>de.key==="customer"),Y=[];U?.html&&Y.push(U.html),J?.html&&Y.push(J.html),ne.push(ye(`<div class="quote-section-row quote-section-row--primary">${Y.join("")}</div>`,{blockType:"group"}))}else ce.length===1&&ne.push(ye(ce[0].html));const W=[];$&&W.push(ye($,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),k&&W.push(ye(k,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),B&&W.push(ye(B,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const ae=[];F&&ae.push(ye(F,{blockType:"summary"})),V&&ae.push(ye(V));const me=[ye(H,{blockType:"payment"}),ye(te,{blockType:"footer"})],fe=[...zn(ne,"projects.quote.placeholder.primary"),...W,...zn(ae,"projects.quote.placeholder.summary"),...me],Ie=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${S(ve.logoUrl)}" alt="${S(ve.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${S(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${S(ve.companyName)}</p>
        <p class="quote-company-cr">${S(o("reservations.quote.labels.cr","السجل التجاري"))}: ${S(ve.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${S(o("reservations.details.labels.reservationId","رقم العرض"))}</span>
          <strong>${S(y)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${S(o("projects.quote.labels.date","التاريخ"))}</span>
          <strong>${S(m)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${gi}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Ie}
          ${fe.join("")}
        </div>
      </div>
    </div>
  `}function Ci(e){if(e?.context==="project")return Qd(e);const{reservation:t,customer:n,project:a,technicians:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:d,sections:l,fieldSelections:u={},quoteNumber:p,quoteDate:y,terms:m=Pe}=e,f=h(String(t?.reservationId??t?.id??"")),g=t.start?h(Be(t.start)):"-",b=t.end?h(Be(t.end)):"-",w=n?.customerName||n?.full_name||n?.name||"-",v=n?.phone||"-",A=n?.email||"-",N=n?.company||n?.company_name||"-",O=h(v),q=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),x=a?.code||a?.projectCode||"",I=h(String(c)),_=t?.notes||"",T=Array.isArray(m)&&m.length?m:Pe,$=gs(u),j=(Z,Se)=>bs($,Z,Se),z=Z=>l?.has?.(Z),F=`<div class="quote-placeholder">${S(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,M=(Z,Se)=>`<div class="info-plain__item">${S(Z)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${S(Se)}</strong></div>`,k=(Z,Se,{variant:gt="inline"}={})=>gt==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${S(Z)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${S(Se)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${S(Z)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${S(Se)}</span>
    </span>`,G=(Z,Se)=>`<div class="payment-row">
      <span class="payment-row__label">${S(Z)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${S(Se)}</span>
    </div>`,B=[];j("customerInfo","customerName")&&B.push(M(o("reservations.details.labels.customer","العميل"),w)),j("customerInfo","customerCompany")&&B.push(M(o("reservations.details.labels.company","الشركة"),N)),j("customerInfo","customerPhone")&&B.push(M(o("reservations.details.labels.phone","الهاتف"),O)),j("customerInfo","customerEmail")&&B.push(M(o("reservations.details.labels.email","البريد"),A));const C=z("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${S(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${B.length?`<div class="info-plain">${B.join("")}</div>`:F}
      </section>`:"",V=[];j("reservationInfo","reservationId")&&V.push(M(o("reservations.details.labels.reservationId","رقم الحجز"),f||"-")),j("reservationInfo","reservationStart")&&V.push(M(o("reservations.details.labels.start","بداية الحجز"),g)),j("reservationInfo","reservationEnd")&&V.push(M(o("reservations.details.labels.end","نهاية الحجز"),b)),j("reservationInfo","reservationDuration")&&V.push(M(o("reservations.details.labels.duration","عدد الأيام"),I));const R=z("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${S(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${V.length?`<div class="info-plain">${V.join("")}</div>`:F}
      </section>`:"",H=[];j("projectInfo","projectTitle")&&H.push(M(o("reservations.details.labels.project","المشروع"),q)),j("projectInfo","projectCode")&&H.push(M(o("reservations.details.labels.code","الرمز"),x||"-"));const K=z("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${S(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${H.length?`<div class="info-plain">${H.join("")}</div>`:F}
      </section>`:"",te=[];j("financialSummary","equipmentTotal")&&te.push(k(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${d}`)),j("financialSummary","crewTotal")&&te.push(k(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${d}`)),j("financialSummary","discountAmount")&&te.push(k(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${d}`)),j("financialSummary","taxAmount")&&te.push(k(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${d}`));const ne=j("financialSummary","finalTotal"),ce=[];ne&&ce.push(k(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${d}`,{variant:"final"}));const W=ce.length?`<div class="totals-final">${ce.join("")}</div>`:"",ae=z("financialSummary")?!te.length&&!ne?`<section class="quote-section quote-section--financial">${F}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${S(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${te.length?`<div class="totals-inline">${te.join("")}</div>`:""}
            ${W}
          </div>
        </section>`:"",me=oi.filter(Z=>j("items",Z.id)),fe=me.length>0,Ie=fe?me.map(Z=>`<th>${S(Z.labelKey?o(Z.labelKey,Z.fallback):Z.fallback)}</th>`).join(""):"",J=Array.isArray(t.items)&&t.items.length>0?t.items.map((Z,Se)=>`<tr>${me.map(gt=>`<td>${gt.render(Z,Se)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(me.length,1)}" class="empty">${S(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,Y=z("items")?fe?`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Ie}</tr>
              </thead>
              <tbody>${J}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.items.title","المعدات"))}</h3>
            ${F}
          </section>`:"",de=ci.filter(Z=>j("crew",Z.id)),Te=de.length>0,yt=Te?de.map(Z=>`<th>${S(Z.labelKey?o(Z.labelKey,Z.fallback):Z.fallback)}</th>`).join(""):"",X=s.length?s.map((Z,Se)=>`<tr>${de.map(gt=>`<td>${gt.render(Z,Se)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(de.length,1)}" class="empty">${S(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,pe=z("crew")?Te?`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${yt}</tr>
              </thead>
              <tbody>${X}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${F}
          </section>`:"",L=z("notes")?`<section class="quote-section">
        <h3>${S(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${S(_||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",ie=[];j("payment","beneficiary")&&ie.push(G(o("reservations.quote.labels.beneficiary","اسم المستفيد"),ve.beneficiaryName)),j("payment","bank")&&ie.push(G(o("reservations.quote.labels.bank","اسم البنك"),ve.bankName)),j("payment","account")&&ie.push(G(o("reservations.quote.labels.account","رقم الحساب"),h(ve.accountNumber))),j("payment","iban")&&ie.push(G(o("reservations.quote.labels.iban","رقم الآيبان"),h(ve.iban)));const Ee=`<section class="quote-section">
      <div class="payment-block">
        <h3>${S(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${ie.length?ie.join(""):F}</div>
      </div>
      <p class="quote-approval-note">${S(ve.approvalNote)}</p>
    </section>`,ge=`<footer class="quote-footer">
        <h4>${S(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${T.map(Z=>`<li>${S(Z)}</li>`).join("")}</ul>
      </footer>`,le=[];C&&R?le.push(ye(`<div class="quote-section-row">${C}${R}</div>`,{blockType:"group"})):(R&&le.push(ye(R)),C&&le.push(ye(C))),K&&le.push(ye(K));const Ae=[];Y&&Ae.push(ye(Y,{blockType:"table",extraAttributes:'data-table-id="items"'})),pe&&Ae.push(ye(pe,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const Ce=[];ae&&Ce.push(ye(ae,{blockType:"summary"})),L&&Ce.push(ye(L));const qe=[ye(Ee,{blockType:"payment"}),ye(ge,{blockType:"footer"})],at=[...zn(le,"reservations.quote.placeholder.page1"),...Ae,...zn(Ce,"reservations.quote.placeholder.page2"),...qe],Lt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${S(ve.logoUrl)}" alt="${S(ve.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${S(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${S(ve.companyName)}</p>
        <p class="quote-company-cr">${S(o("reservations.quote.labels.cr","السجل التجاري"))}: ${S(ve.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${S(p)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${S(y)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${gi}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Lt}
          ${at.join("")}
        </div>
      </div>
    </div>
  `}function Gd(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function cn(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>Gd(c)),i=[s,...r].map(c=>c.catch(d=>(et("asset load failed",d),rd(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function Ni(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await Ii(r),await cn(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let d=null,l=null;const u=q=>{q.style.margin="0 auto",q.style.breakInside="avoid",q.style.pageBreakInside="avoid",q.style.pageBreakAfter="auto",q.style.breakAfter="auto"},p=()=>{const q=a.createElement("div"),x=s.childElementCount===0;if(q.className="quote-page",q.dataset.pageIndex=String(s.childElementCount),x){q.classList.add("quote-page--primary");const _=i.cloneNode(!0);_.removeAttribute("data-quote-header-template"),q.appendChild(_)}else q.classList.add("quote-page--continuation");const I=a.createElement("main");I.className="quote-body",q.appendChild(I),s.appendChild(q),u(q),d=q,l=I},y=()=>{(!d||!l||!l.isConnected)&&p()},m=()=>{if(!d||!l||l.childElementCount>0)return;const q=d;d=null,l=null,q.parentNode&&q.parentNode.removeChild(q)},f=()=>{d=null,l=null},g=()=>d?d.scrollHeight-d.clientHeight>ed:!1,b=(q,{allowOverflow:x=!1}={})=>(y(),l.appendChild(q),g()&&!x?(l.removeChild(q),m(),!1):!0),w=q=>{const x=q.cloneNode(!0);x.removeAttribute?.("data-quote-block"),x.removeAttribute?.("data-block-type"),x.removeAttribute?.("data-table-id"),!b(x)&&(f(),!b(x)&&b(x,{allowOverflow:!0}))},v=q=>{const x=q.querySelector("table");if(!x){w(q);return}const I=q.querySelector("h3"),_=x.querySelector("thead"),T=Array.from(x.querySelectorAll("tbody tr"));if(!T.length){w(q);return}let $=null,j=0;const z=(M=!1)=>{const k=q.cloneNode(!1);k.removeAttribute("data-quote-block"),k.removeAttribute("data-block-type"),k.removeAttribute("data-table-id"),k.classList.add("quote-section--table-fragment"),M&&k.classList.add("quote-section--table-fragment--continued");const G=I?I.cloneNode(!0):null;G&&k.appendChild(G);const B=x.cloneNode(!1);B.classList.add("quote-table--fragment"),_&&B.appendChild(_.cloneNode(!0));const C=a.createElement("tbody");return B.appendChild(C),k.appendChild(B),{section:k,body:C}},F=(M=!1)=>$||($=z(M),b($.section)||(f(),b($.section)||b($.section,{allowOverflow:!0})),$);T.forEach(M=>{F(j>0);const k=M.cloneNode(!0);if($.body.appendChild(k),g()&&($.body.removeChild(k),$.body.childElementCount||(l.removeChild($.section),$=null,m()),f(),$=null,F(j>0),$.body.appendChild(k),g())){$.section.classList.add("quote-section--table-fragment--overflow"),j+=1;return}j+=1}),$=null};if(!c.length)return;c.forEach(q=>{q.getAttribute("data-block-type")==="table"?v(q):w(q)});const A=Array.from(s.children),N=[];if(A.forEach((q,x)=>{const I=q.querySelector(".quote-body");if(x!==0&&(!I||I.childElementCount===0)){q.remove();return}N.push(q)}),!n){const q=a.defaultView||window,x=Math.min(3,Math.max(1,q.devicePixelRatio||1)),I=la()?Math.min(2,x):x;N.forEach(_=>Sd(_,{pixelRatio:I}))}N.forEach((q,x)=>{const I=x===0;q.style.pageBreakAfter="auto",q.style.breakAfter="auto",q.style.pageBreakBefore=I?"auto":"always",q.style.breakBefore=I?"auto":"page",n?q.style.boxShadow="":q.style.boxShadow="none"});const O=N[N.length-1]||null;d=O,l=O?.querySelector(".quote-body")||null,await cn(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function Es(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function Wd(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([xd(),Ed()]),c=e.ownerDocument||document,d=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,d,c?.documentElement?.getAttribute?.("dir")].some(q=>typeof q=="string"&&q.toLowerCase().startsWith("rtl")),p=typeof window<"u"&&window.devicePixelRatio||1,y=qs(),m=Si(),f=la();let g;f?g=1.5:m?g=Math.min(1.7,Math.max(1.2,p*1.1)):y?g=Math.min(1.8,Math.max(1.25,p*1.2)):g=Math.min(2,Math.max(1.6,p*1.4));const b=f||m?.9:y?.92:.95,w=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),v={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let A=0;const N=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let q=0;q<s.length;q+=1){const x=s[q];await Ii(x),await cn(x);const I=x.ownerDocument||document,_=I.createElement("div");Object.assign(_.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const T=x.cloneNode(!0);T.style.width=`${$n}px`,T.style.maxWidth=`${$n}px`,T.style.minWidth=`${$n}px`,T.style.height=`${Tn}px`,T.style.maxHeight=`${Tn}px`,T.style.minHeight=`${Tn}px`,T.style.position="relative",T.style.background="#ffffff",Es(T),_.appendChild(T),I.body.appendChild(_);let $;try{await cn(T),$=await i(T,{...v,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(C){throw za(C,"pageCapture",{toastMessage:N}),C}finally{_.parentNode?.removeChild(_)}if(!$)continue;const j=$.width||1,F=($.height||1)/j;let M=Ma,k=M*F,G=0;if(k>_n){const C=_n/k;k=_n,M=M*C,G=Math.max(0,(Ma-M)/2)}const B=$.toDataURL("image/jpeg",b);A>0&&w.addPage(),w.addImage(B,"JPEG",G,0,M,k,`page-${A+1}`,"FAST"),A+=1,await new Promise(C=>window.requestAnimationFrame(C))}}catch(q){throw Va({safariWindowRef:n,mobileWindowRef:a}),q}if(A===0)throw Va({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(m||f){const q=w.output("blob");if(f){const x=URL.createObjectURL(q);sn();try{window.location.assign(x)}catch(I){et("mobile safari blob navigation failed",I)}finally{setTimeout(()=>URL.revokeObjectURL(x),6e4)}}else{const x=URL.createObjectURL(q),I=()=>m&&n&&!n.closed?n:a&&!a.closed?a:null,_=($,j)=>{if(sn(),!$){window.location.assign(j);return}try{$.location.replace(j),$.focus?.()}catch(z){et("direct blob navigation failed",z);try{$.document.open(),$.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${S(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${j}" title="PDF preview"></iframe></body></html>`),$.document.close()}catch(F){et("iframe blob delivery failed",F),window.location.assign(j)}}},T=I();_(T,x),setTimeout(()=>URL.revokeObjectURL(x),6e4)}}else{sn();const q=w.output("bloburl"),x=document.createElement("a");x.href=q,x.download=t,x.rel="noopener",x.style.display="none",document.body.appendChild(x),x.click(),setTimeout(()=>{URL.revokeObjectURL(q),x.remove()},2e3)}}function Nt(){if(!P||!Q)return;const{previewFrame:e}=Q;if(!e)return;const t=P.context||"reservation",n=Ci({context:t,reservation:P.reservation,customer:P.customer,project:P.project,technicians:P.technicians,totals:P.totals,totalsDisplay:P.totalsDisplay,rentalDays:P.rentalDays,currencyLabel:P.currencyLabel,sections:P.sections,fieldSelections:P.fields,quoteNumber:P.quoteNumber,quoteDate:P.quoteDateLabel,terms:P.terms,projectCrew:P.projectCrew,projectExpenses:P.projectExpenses,projectEquipment:P.projectEquipment,projectInfo:P.projectInfo,clientInfo:P.clientInfo,paymentSummary:P.paymentSummary,projectTotals:P.projectTotals});It("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&(si(r),ni(r,s),ai(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await Ni(i,{context:"preview"}),Es(i))}catch(m){console.error("[reservations/pdf] failed to layout preview document",m)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),d=a?.querySelector(".quote-preview-pages"),l=$n;let u=18;if(d&&a?.defaultView){const m=a.defaultView.getComputedStyle(d),f=parseFloat(m.rowGap||m.gap||`${u}`);Number.isFinite(f)&&f>=0&&(u=f)}const p=Tn,y=c.length?c.length*p+Math.max(0,(c.length-1)*u):p;if(e.dataset.baseWidth=String(l),e.dataset.baseHeight=String(y),e.style.width=`${l}px`,e.style.minWidth=`${l}px`,e.style.height=`${y}px`,e.style.minHeight=`${y}px`,Q?.previewFrameWrapper&&!Q?.userAdjustedZoom){const m=Q.previewFrameWrapper.clientWidth-24;m>0&&m<l?Ve=Math.max(m/l,.3):Ve=1}Bi(Ve)}finally{sn()}},{once:!0})}function Xd(e){if(!P)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?P.sections.add(n):P.sections.delete(n),_i(P),Li(),Nt())}function Jd(e){if(!P)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=P.context||"reservation",r=P.fields||(P.fields=ca(s)),i=id(r,n);t.checked?i.add(a):i.delete(a),_i(P),Nt()}function Yd(e){if(!P)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(vs(P,n),P.sectionExpansions[n]=t.open)}function Li(){if(!Q?.toggles||!P)return;const{toggles:e}=Q,t=P.fields||{},n=P.context||"reservation";vs(P);const a=oa(n),s=mi(n),r=a.map(({id:i,labelKey:c,fallback:d})=>{const l=o(c,d),u=P.sections.has(i),p=s[i]||[],y=od(P,i),m=p.length?`<div class="quote-toggle-sublist">
          ${p.map(f=>{const g=bs(t,i,f.id),b=u?"":"disabled",w=f.labelKey?o(f.labelKey,f.fallback):f.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${f.id}" ${g?"checked":""} ${b}>
                <span>${S(w)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${i}" ${y?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${i}" ${u?"checked":""}>
            <span>${S(l)}</span>
          </label>
          ${p.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${m}
      </details>
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",Xd)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",Jd)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",Yd)})}function Zd(){if(Q?.modal)return Q;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
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
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),r=e.querySelector("[data-quote-terms-reset]"),i=e.querySelector("[data-quote-download]"),c=e.querySelector(".modal-header"),d=c?.querySelector(".btn-close"),l=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",c&&c.insertBefore(u,d||null);const p=document.createElement("iframe");p.className="quote-preview-frame",p.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),p.setAttribute("loading","lazy"),p.setAttribute("frameborder","0");const y=document.createElement("div");y.className="quote-preview-zoom-controls",y.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${S(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${S(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${S(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(p),n.innerHTML="";const f=document.createElement("div");f.className="quote-preview-scroll",f.appendChild(m),n.appendChild(f);const g=document.createElement("div");g.className="quote-preview-status",g.setAttribute("role","status"),g.setAttribute("aria-live","polite"),g.hidden=!0,g.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${S(yi("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(y),i?.addEventListener("click",async()=>{if(P){i.disabled=!0;try{await Di()}finally{i.disabled=!1}}});const b=()=>{Ha()||Oa(e)};l.forEach(N=>{N?.addEventListener("click",b)}),d&&!l.includes(d)&&d.addEventListener("click",b),e.addEventListener("click",N=>{Ha()||N.target===e&&Oa(e)}),Q={modal:e,toggles:t,preview:n,previewScroll:f,previewFrameWrapper:m,zoomControls:y,zoomValue:y.querySelector("[data-zoom-value]"),previewFrame:p,meta:a,downloadBtn:i,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const w=y.querySelector("[data-zoom-out]"),v=y.querySelector("[data-zoom-in]"),A=y.querySelector("[data-zoom-reset]");return w?.addEventListener("click",()=>sr(-.1)),v?.addEventListener("click",()=>sr(.1)),A?.addEventListener("click",()=>Vn(1,{markManual:!0})),s&&s.addEventListener("input",tu),r&&r.addEventListener("click",nu),Vn(Ve),Q}function Vn(e,{silent:t=!1,markManual:n=!1}={}){Ve=Math.min(Math.max(e,.25),2.2),n&&Q&&(Q.userAdjustedZoom=!0),Bi(Ve),!t&&Q?.zoomValue&&(Q.zoomValue.textContent=`${Math.round(Ve*100)}%`)}function sr(e){Vn(Ve+e,{markManual:!0})}function Bi(e){if(!Q?.previewFrame||!Q.previewFrameWrapper)return;const t=Q.previewFrame,n=Q.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",qs()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function eu(){if(!Q?.meta||!P)return;const{meta:e}=Q;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${S(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${S(P.quoteNumber)}</strong></div>
      <div><span>${S(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${S(P.quoteDateLabel)}</strong></div>
    </div>
  `}function xs(){if(!Q?.termsInput)return;const e=(P?.terms&&P.terms.length?P.terms:Pe).join(`
`);Q.termsInput.value!==e&&(Q.termsInput.value=e)}function tu(e){if(!P)return;const t=Da(e?.target?.value??"");if(t.length){P.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{P.terms=[...Pe],xs();const n=Pe.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}Nt()}function nu(e){if(e?.preventDefault?.(),!P)return;P.terms=[...Pe];const t=document.getElementById("reservation-terms");t&&(t.value=Pe.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=Pe.join(`
`)),xs(),Nt()}async function Di(){if(!P)return;It("export");const t=!qs()&&Si(),n=la(),a=null,s=!n&&t?window.open("","_blank"):null;(d=>{if(d)try{d.document.open(),d.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${S(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${S(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${S(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),d.document.close()}catch(l){et("failed to prime download window",l)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await wd(),qa("html2pdf ensured");const d=P.context||"reservation",l=Ci({context:d,reservation:P.reservation,customer:P.customer,project:P.project,technicians:P.technicians,totals:P.totals,totalsDisplay:P.totalsDisplay,rentalDays:P.rentalDays,currencyLabel:P.currencyLabel,sections:P.sections,fieldSelections:P.fields,quoteNumber:P.quoteNumber,quoteDate:P.quoteDateLabel,terms:P.terms,projectCrew:P.projectCrew,projectExpenses:P.projectExpenses,projectEquipment:P.projectEquipment,projectInfo:P.projectInfo,clientInfo:P.clientInfo,paymentSummary:P.paymentSummary,projectTotals:P.projectTotals});i=document.createElement("div"),i.innerHTML=l,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),si(i),ni(i),ai(i),qa("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await Ni(u,{context:"export"}),await cn(u),Es(u),qa("layout complete for export document")}catch(y){za(y,"layoutQuoteDocument",{suppressToast:!0})}}const p=`quotation-${P.quoteNumber}.pdf`;await Wd(u,{filename:p,safariWindowRef:s,mobileWindowRef:a}),P.sequenceCommitted||(_d(P.quoteSequence),P.sequenceCommitted=!0)}catch(d){Va({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,za(d,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),sn()}}function Fi(){const e=Zd();e?.modal&&(an=!1,Ve=1,Q&&(Q.userAdjustedZoom=!1),Vn(Ve,{silent:!0}),Li(),eu(),xs(),Nt(),sd(e.modal))}async function au({reservation:e,customer:t,project:n}){if(!e){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=Nd(e),{totalsDisplay:s,totals:r,rentalDays:i}=Ld(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:d,quoteNumber:l}=Ai("reservation"),u=new Date,p=Kl();P={context:"reservation",reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(oa("reservation").filter(y=>y.defaultSelected).map(y=>y.id)),sectionExpansions:hs("reservation"),fields:ca("reservation"),terms:p,quoteSequence:d,quoteNumber:l,quoteDate:u,quoteDateLabel:Ti(u),sequenceCommitted:!1},$i(P),Fi()}async function em({project:e}){if(!e){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=Kd(e),{project:n}=t;if(!n){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=Ai("project"),r=new Date,i=[...Ul];P={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(oa("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:hs("project"),fields:ca("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:Ti(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},$i(P),Fi()}function su({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=mn(),{reservations:r=[],customers:i=[],technicians:c=[],projects:d=[]}=ue(),l=Array.isArray(s)?s:c||[],u=new Map((d||[]).map(b=>[String(b.id),b])),p=document.getElementById(e);if(!p){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){p.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const y=t||Pl(),m=new Map(i.map(b=>[String(b.id),b])),f=new Map(l.map(b=>[String(b.id),b])),g=Bl({reservations:r,filters:y,customersMap:m,techniciansMap:f,projectsMap:u});if(g.length===0){p.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}p.innerHTML=`<div class="reservations-grid">${Dl({entries:g,customersMap:m,techniciansMap:f,projectsMap:u})}</div>`,p.querySelectorAll('[data-action="details"]').forEach(b=>{const w=Number(b.dataset.reservationIndex);Number.isNaN(w)||b.addEventListener("click",()=>{typeof n=="function"&&n(w)})}),p.querySelectorAll('button[data-action="confirm"]').forEach(b=>{const w=Number(b.dataset.reservationIndex);Number.isNaN(w)||b.addEventListener("click",v=>{v.stopPropagation(),typeof a=="function"&&a(w,v)})})}function ru(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=ue(),c=s[e];if(!c)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=r.find(w=>String(w.id)===String(c.customerId)),l=c.projectId?i.find(w=>String(w.id)===String(c.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const w=mn()||[];u.innerHTML=Fl(c,d,w,e,l)}const p=document.getElementById("reservationDetailsModal"),y=()=>{p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(p)?.hide()},m=document.getElementById("reservation-details-edit-btn");m&&(m.onclick=()=>{y(),typeof t=="function"&&t(e,{reservation:c,customer:d,getEditContext:a})});const f=document.getElementById("reservation-details-delete-btn");f&&(f.onclick=()=>{y(),typeof n=="function"&&n(e,{reservation:c,customer:d})});const g=u?.querySelector('[data-action="open-project"]');g&&l&&g.addEventListener("click",()=>{y();const w=l?.id!=null?String(l.id):"",v=w?`projects.html?project=${encodeURIComponent(w)}`:"projects.html";window.location.href=v});const b=document.getElementById("reservation-details-export-btn");return b&&(b.onclick=async w=>{w?.preventDefault?.(),w?.stopPropagation?.(),b.blur();try{await au({reservation:c,customer:d,project:l})}catch(v){console.error("❌ [reservations] export to PDF failed",v),E(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(p).show(),!0}function Ri(){const e=()=>{fn(),$e(),mn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let rr=!1,ir=null;function iu(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function tm(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=iu(n);if(!a&&rr&&wt().length>0&&s===ir)return wt();try{const r=await Sr(n||{});return rr=!0,ir=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return wt()}}async function ou(e,{onAfterChange:t}={}){if(!$t())return un(),!1;const a=wt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await yc(s),Ri(),t?.({type:"deleted",reservation:a}),E(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=Wn(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return E(i,"error"),!1}}async function cu(e,{onAfterChange:t}={}){const a=wt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=ut(a);if(r)return E(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await gc(s);return Ri(),t?.({type:"confirmed",reservation:i}),E(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=Wn(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return E(c,"error"),!1}}function Gt(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:rn(e,n),end:rn(t,a)}}function Un(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ws(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function Mi(){const{container:e,select:t,hint:n,addButton:a}=ws();if(!t)return;const s=t.value,r=pr(),i=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,d=r.map(u=>{const p=Number.isFinite(Number(u.price))?Number(u.price):0,y=h(p.toFixed(2)),m=`${u.name} — ${y} ${i}`;return`<option value="${Un(u.id)}">${Un(m)}</option>`}).join("");t.innerHTML=`${c}${d}`;const l=r.length>0;t.disabled=!l,a&&(a.disabled=!l),e&&(e.hidden=!l,e.setAttribute("aria-hidden",l?"false":"true")),n&&(l?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),l&&s&&r.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function lu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=pt(),{start:r,end:i}=Gt(),{reservations:c=[]}=ue(),d=a!=null&&c[a]||null,l=d?.id??d?.reservationId??null,u=Gr(n,{existingItems:s,start:r,end:i,ignoreReservationId:l});if(!u.success)return t||E(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const p=[...s,u.package];return ft(a,p),mt(p),Fe(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function or(){const{select:e}=ws();if(!e)return;const t=e.value||"";lu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function du(){const{addButton:e,select:t}=ws();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{or()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),or())}),t.dataset.listenerAttached="true"),Mi()}function mt(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,lr(t);return}const d=jt(e);t.innerHTML=d.map(l=>{const u=l.items[0]||{},p=Tt(u)||l.image,y=p?`<img src="${p}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=l.items.some(I=>I?.type==="package"),f=h(String(l.count)),g=Number.isFinite(Number(l.unitPrice))?Number(l.unitPrice):0,b=Number.isFinite(Number(l.totalPrice))?Number(l.totalPrice):g*l.count,w=`${h(g.toFixed(2))} ${a}`,v=`${h(b.toFixed(2))} ${a}`,A=l.barcodes.map(I=>h(String(I||""))).filter(Boolean),N=A.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${A.map(I=>`<li>${I}</li>`).join("")}
            </ul>
          </details>`:"";let O="";if(m){const I=new Map;if(l.items.forEach(_=>{Array.isArray(_?.packageItems)&&_.packageItems.forEach(T=>{if(!T)return;const $=re(T.barcode||T.normalizedBarcode||T.desc||Math.random()),j=I.get($),z=Number.isFinite(Number(T.qty))?Number(T.qty):1;if(j){j.qty+=z;return}I.set($,{desc:T.desc||T.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:z,barcode:T.barcode??T.normalizedBarcode??""})})}),I.size){const _=Array.from(I.values()).map(T=>{const $=h(String(T.qty)),j=Un(T.desc||""),z=T.barcode?` <span class="reservation-package-items__barcode">(${Un(h(String(T.barcode)))})</span>`:"";return`<li>${j}${z} × ${$}</li>`}).join("");O=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${_}
              </ul>
            </details>
          `}}const q=m?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",x=m?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${l.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${y}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${l.description||"-"}</div>
                ${m?`${O||""}${N||""}`:N}
              </div>
            </div>
          </td>
          <td>
            <div class="${q}" data-group-key="${l.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${l.key}" aria-label="${i}"${x}>−</button>
              <span class="reservation-qty-value">${f}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${l.key}" aria-label="${r}"${x}>+</button>
            </div>
          </td>
          <td>${w}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${l.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),lr(t)}function uu(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function da(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=ua();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,cr();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${h(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${h(Number(s.percentage).toFixed(2))}%`:"—",d=s?.recordedAt?h(Be(s.recordedAt)):"—",l=uu(s?.type),u=s?.note?h(s.note):"";return`
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
  `,cr()}function mu(){if(ln()){E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=zi(e);let a=Vi(t);if(!Number.isFinite(a)||a<=0){E(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=wa.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,d=o("reservations.create.summary.currency","SR");let l=null,u=null;if(n==="percent"){const y=Math.max(0,100-i);if(y<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,y);if(m!==a){const f=h(m.toFixed(2));E(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",f)),a=m}u=Number(a.toFixed(2)),r>0&&(l=a/100*r)}else{const y=Math.max(0,r-c);if(y<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,y);if(m!==a){const f=`${h(m.toFixed(2))} ${d}`;E(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",f)),a=m}l=Number(a.toFixed(2)),r>0&&(u=l/r*100)}l!=null&&(l=Number(l.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const p={type:n,value:a,amount:l,percentage:u,recordedAt:new Date().toISOString()};Eu(p),Is(ua()),da(),Fe(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),E(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function cr(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(ln()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}mu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(ln()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(xu(s),Is(ua()),da(),Fe(),E(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function pu(e){const{index:t,items:n}=pt(),s=jt(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,d)=>d!==r);ft(t,i),mt(i),Fe()}function fu(e){const{index:t,items:n}=pt(),a=n.filter(s=>yn(s)!==e);a.length!==n.length&&(ft(t,a),mt(a),Fe())}function yu(e){const{index:t,items:n}=pt(),s=jt(n).find(b=>b.key===e);if(!s||s.items.some(b=>b?.type==="package"))return;const{start:r,end:i}=Gt();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=ue(),d=t!=null&&c[t]||null,l=d?.id??d?.reservationId??null,u=new Set(n.map(b=>re(b.barcode))),{equipment:p=[]}=ue(),y=(p||[]).find(b=>{const w=re(b?.barcode);return!w||u.has(w)||yn({desc:b?.desc||b?.description||b?.name||"",price:Number(b?.price)||0})!==e||!ss(b)?!1:!Qe(w,r,i,l)});if(!y){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const m=re(y.barcode),f=Kt(y);if(!f){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:f,equipmentId:f,barcode:m,desc:y.desc||y.description||y.name||s.description||"",qty:1,price:Number.isFinite(Number(y.price))?Number(y.price):s.unitPrice,image:Tt(y)}];ft(t,g),mt(g),Fe()}function lr(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){pu(s);return}if(a==="increase-edit-group"&&s){yu(s);return}if(a==="remove-edit-group"&&s){fu(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||hu(i)}}),e.dataset.groupListenerAttached="true")}function ln(){return!!document.getElementById("edit-res-project")?.value}function gu(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{ln()&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function bu(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),d=document.getElementById("edit-res-payment-history");[n,a,s,r,i,c,d].forEach(gu),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s&&(s.value="unpaid",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),d&&(d.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.dataset.linkedDisabled="false"))}function Fe(){const e=document.getElementById("edit-res-summary");if(!e)return;da();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),Le(a),Fe()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=ln();bu(c);const d=document.getElementById("edit-res-tax"),l=c?!1:d?.checked||!1,u=!c&&a?.dataset?.userSelected==="true",p=c?"unpaid":u&&a?.value||"unpaid";let y=null;!c&&l&&(He("edit-res-company-share"),y=Mt("edit-res-company-share"),(!Number.isFinite(y)||y<=0)&&(He("edit-res-company-share"),y=Mt("edit-res-company-share")));const{items:m=[],payments:f=[]}=pt(),{start:g,end:b}=Gt(),w=wa({items:m,discount:r,discountType:i,applyTax:l,paidStatus:p,start:g,end:b,companySharePercent:y,paymentHistory:f});e.innerHTML=w;const v=wa.lastResult;if(v&&a){const A=v.paymentStatus;u?Le(a,a.value):(a.value!==A&&(a.value=A),a.dataset&&delete a.dataset.userSelected,Le(a,A))}else a&&Le(a,a.value)}function hu(e){if(e==null)return;const{index:t,items:n}=pt();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);ft(t,a),mt(a),Fe()}function vu(e){const t=e?.value??"",n=re(t);if(!n)return;const a=Jn(n);if(!a){E(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=dt(a);if(s==="maintenance"||s==="retired"){E(Qt(s));return}const r=re(n),{index:i,items:c=[]}=pt();if(c.findIndex(b=>re(b.barcode)===r)>-1){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:l,end:u}=Gt();if(!l||!u){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:p=[]}=ue(),y=i!=null&&p[i]||null,m=y?.id??y?.reservationId??null;if(Qe(r,l,u,m)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const f=Kt(a);if(!f){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:f,equipmentId:f,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];ft(i,g),e&&(e.value=""),mt(g),Fe()}function Kn(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Vr(t),a=re(n?.barcode||t);if(!n||!a){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=dt(n);if(s==="maintenance"||s==="retired"){E(Qt(s));return}const{start:r,end:i}=Gt();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:d=[]}=pt();if(d.some(g=>re(g.barcode)===a)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=ue(),p=c!=null&&u[c]||null,y=p?.id??p?.reservationId??null;if(Qe(a,r,i,y)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=Kt(n);if(!m){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const f=[...d,{id:m,equipmentId:m,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];ft(c,f),mt(f),Fe(),e.value=""}function Hi(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Kn(e))});const t=()=>{Ur(e.value,"edit-res-equipment-description-options")&&Kn(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{Fe()});const e=()=>{du()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{Mi()})}typeof window<"u"&&(window.getEditReservationDateRange=Gt,window.renderEditPaymentHistory=da);function qu(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){Na(e);return}Kn(e)}}function nm(){lt(),Hi()}function Su(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let dn=null,ze=[],Ue=[],Ua=null,ke={},Sa=!1;function Ka(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function Qa(){return document.getElementById("edit-res-confirmed")?.value==="true"}function pt(){return{index:dn,items:ze,payments:Ue}}function ft(e,t,n=Ue){dn=typeof e=="number"?e:null,ze=Array.isArray(t)?[...t]:[],Ue=Array.isArray(n)?[...n]:[]}function Oi(){dn=null,ze=[],vc(),Ue=[]}function ua(){return[...Ue]}function Is(e){Ue=Array.isArray(e)?[...e]:[]}function Eu(e){e&&(Ue=[...Ue,e])}function xu(e){!Number.isInteger(e)||e<0||(Ue=Ue.filter((t,n)=>n!==e))}function wu(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function zi(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Vi(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Iu(e,t){if(e){e.value="";return}}function Zt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ui(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),d=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,l=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:d,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:l}}function Au(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((d,l)=>String(l.createdAt||l.start||"").localeCompare(String(d.createdAt||d.start||""))):[],c=[`<option value="">${Zt(a)}</option>`];i.forEach(d=>{c.push(`<option value="${Zt(d.id)}">${Zt(d.title||a)}</option>`)}),r&&!i.some(d=>String(d.id)===r)&&c.push(`<option value="${Zt(r)}">${Zt(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function Ki(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const d=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",d&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}Ga("tax");const c=ke?.updateEditReservationSummary;typeof c=="function"&&c()}function Ga(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=ke?.updateEditReservationSummary;typeof r=="function"&&r()};if(Sa){a();return}Sa=!0;const s=()=>{Sa=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(tt)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),He("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?He("edit-res-company-share"):n.checked&&(n.checked=!1));s()}function dr(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:d}=ue(),u=wt()?.[e];if(!u){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}ke={...ke,reservation:u,projects:d||[]},t?.(),Au(d||[],u);const p=u.projectId&&d?.find?.(B=>String(B.id)===String(u.projectId))||null,{effectiveConfirmed:y,projectLinked:m}=ut(u,p),f=u.items?u.items.map(B=>({...B,equipmentId:B.equipmentId??B.equipment_id??B.id,barcode:re(B?.barcode)})):[],b=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(B=>Ui(B)).filter(Boolean);ft(e,f,b);const w=o("reservations.list.unknownCustomer","غير معروف"),v=c?.find?.(B=>String(B.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const A=document.getElementById("edit-res-id");A&&(A.value=u.reservationId||u.id);const N=document.getElementById("edit-res-customer");N&&(N.value=v?.customerName||w);const O=typeof a=="function"?a(u.start):{date:"",time:""},q=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",O.date),n?.("edit-res-start-time",O.time),n?.("edit-res-end",q.date),n?.("edit-res-end-time",q.time);const x=document.getElementById("edit-res-notes");x&&(x.value=u.notes||"");const I=document.getElementById("edit-res-discount");if(I){const B=m?0:u.discount??0;I.value=h(B)}const _=document.getElementById("edit-res-discount-type");_&&(_.value=m?"percent":u.discountType||"percent");const T=u.projectId?!1:!!u.applyTax,$=document.getElementById("edit-res-tax");$&&($.checked=T);const j=document.getElementById("edit-res-company-share");if(j){const B=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,C=B!=null?Number.parseFloat(h(String(B).replace("%","").trim())):NaN,V=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,R=V!=null?V===!0||V===1||V==="1"||String(V).toLowerCase()==="true":Number.isFinite(C)&&C>0,H=R&&Number.isFinite(C)&&C>0?C:tt,K=T||R;j.checked=K,j.dataset.companyShare=String(H)}Ka(y,{disable:m});const z=document.getElementById("edit-res-paid"),F=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");z&&(z.value=F,z.dataset&&delete z.dataset.userSelected);const M=document.getElementById("edit-res-payment-progress-type"),k=document.getElementById("edit-res-payment-progress-value");if(M?.dataset?.userSelected&&delete M.dataset.userSelected,M&&(M.value="percent"),Iu(k),qc((u.technicians||[]).map(B=>String(B))),s?.(f),typeof window<"u"){const B=window?.renderEditPaymentHistory;typeof B=="function"&&B()}Ki(),r?.();const G=document.getElementById("editReservationModal");Ua=wu(G,i),Ua?.show?.()}async function ku({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:r,populateEquipmentDescriptionLists:i,handleReservationsMutation:c}={}){if(dn===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const d=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),p=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",y=document.getElementById("edit-res-notes")?.value||"",m=h(document.getElementById("edit-res-discount")?.value||"0");let f=parseFloat(m)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const b=Qa(),w=document.getElementById("edit-res-paid"),v=w?.dataset?.userSelected==="true",A=v&&w?.value||"unpaid",N=document.getElementById("edit-res-payment-progress-type"),O=document.getElementById("edit-res-payment-progress-value"),q=zi(N),x=Vi(O),I=document.getElementById("edit-res-project")?.value||"",_=bc(),T=document.getElementById("edit-res-company-share"),$=document.getElementById("edit-res-tax");if(!d||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const j=typeof e=="function"?e:(X,pe)=>`${X}T${pe||"00:00"}`,z=j(d,l),F=j(u,p);if(z&&F&&new Date(z)>new Date(F)){E(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const k=wt()?.[dn];if(!k){E(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(ze)||ze.length===0&&_.length===0){E(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const G=typeof t=="function"?t:()=>!1,B=k.id??k.reservationId;for(const X of ze){const pe=dt(X.barcode);if(pe==="reserved"){const L=re(X.barcode);if(!G(L,z,F,B))continue}if(pe!=="available"){E(Qt(pe));return}}for(const X of ze){const pe=re(X.barcode);if(G(pe,z,F,B)){E(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const C=typeof n=="function"?n:()=>!1;for(const X of ze){if(X?.type!=="package")continue;const pe=X.packageId??X.package_id??null;if(pe&&C(pe,z,F,B)){const L=X.desc||X.packageName||o("reservations.create.packages.genericName","الحزمة");E(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${h(String(L))} محجوزة بالفعل في الفترة المختارة`));return}}const V=typeof a=="function"?a:()=>!1;for(const X of _)if(V(X,z,F,B)){E(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const R=Array.isArray(ke.projects)&&ke.projects.length?ke.projects:ue().projects||[],H=I&&R.find(X=>String(X.id)===String(I))||null,K={...k,projectId:I?String(I):null,confirmed:b},{effectiveConfirmed:te,projectLinked:ne,projectStatus:ce}=ut(K,H);let W=!!T?.checked,ae=!!$?.checked;if(ne&&(W&&(T.checked=!1,W=!1),ae=!1),!ne&&W!==ae){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}ae&&(He("edit-res-company-share"),W=!!T?.checked);let me=W?getCompanySharePercent("edit-res-company-share"):null;W&&(!Number.isFinite(me)||me<=0)&&(He("edit-res-company-share"),me=getCompanySharePercent("edit-res-company-share"));const fe=W&&ae&&Number.isFinite(me)&&me>0,Ie=ne?!1:ae;ne&&(f=0,g="percent");const U=Za(ze,f,g,Ie,_,{start:z,end:F,companySharePercent:fe?me:0});let J=ua();if(Number.isFinite(x)&&x>0){const X=U;let pe=null,L=null;q==="amount"?(pe=x,X>0&&(L=x/X*100)):(L=x,X>0&&(pe=x/100*X));const ie=Ui({type:q,value:x,amount:pe,percentage:L,recordedAt:new Date().toISOString()});ie&&(J=[...J,ie],Is(J)),O&&(O.value="")}const Y=es({totalAmount:U,history:J}),de=ts({manualStatus:A,paidAmount:Y.paidAmount,paidPercent:Y.paidPercent,totalAmount:U});w&&!v&&(w.value=de,w.dataset&&delete w.dataset.userSelected);let Te=k.status??"pending";ne?Te=H?.status??ce??Te:["completed","cancelled"].includes(String(Te).toLowerCase())||(Te=b?"confirmed":"pending");const yt=hr({reservationCode:k.reservationCode??k.reservationId??null,customerId:k.customerId,start:z,end:F,status:Te,title:k.title??null,location:k.location??null,notes:y,projectId:I?String(I):null,totalAmount:U,discount:f,discountType:g,applyTax:Ie,paidStatus:de,confirmed:te,items:ze.map(X=>({...X,equipmentId:X.equipmentId??X.id})),technicians:_,companySharePercent:fe?me:null,companyShareEnabled:fe,paidAmount:Y.paidAmount,paidPercentage:Y.paidPercent,paymentProgressType:Y.paymentProgressType,paymentProgressValue:Y.paymentProgressValue,paymentHistory:J});try{const X=await hc(k.id||k.reservationId,yt);await Sr(),fn(),$e(),E(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),Oi(),c?.({type:"updated",reservation:X}),r?.(),i?.(),Ua?.hide?.()}catch(X){console.error("❌ [reservationsEdit] Failed to update reservation",X);const pe=Wn(X)?X.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");E(pe,"error")}}function am(e={}){ke={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=ke,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=h(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{Ga("tax")}),c.dataset.listenerAttached="true");const d=document.getElementById("edit-res-company-share");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{Ga("share")}),d.dataset.listenerAttached="true");const l=document.getElementById("edit-res-payment-progress-type");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{l.dataset.userSelected="true",t?.()}),l.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const p=document.getElementById("edit-res-project");p&&!p.dataset.listenerAttached&&(p.addEventListener("change",()=>{Ki();const b=Array.isArray(ke.projects)&&ke.projects.length?ke.projects:ue().projects||[],w=p.value&&b.find(q=>String(q.id)===String(p.value))||null,A={...ke?.reservation??{},projectId:p.value||null,confirmed:Qa()},{effectiveConfirmed:N,projectLinked:O}=ut(A,w);Ka(N,{disable:O}),t?.()}),p.dataset.listenerAttached="true");const y=document.getElementById("edit-res-confirmed-btn");y&&!y.dataset.listenerAttached&&(y.addEventListener("click",()=>{if(y.disabled)return;const b=!Qa();Ka(b),t?.()}),y.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{ku(ke).catch(b=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",b)})}),m.dataset.listenerAttached="true");const f=document.getElementById("edit-res-equipment-barcode");if(f&&!f.dataset.listenerAttached){let b=null;const w=()=>{f.value?.trim()&&(clearTimeout(b),b=null,n?.(f))};f.addEventListener("keydown",A=>{A.key==="Enter"&&(A.preventDefault(),w())});const v=()=>{if(clearTimeout(b),!f.value?.trim())return;const{start:A,end:N}=getEditReservationDateRange();!A||!N||(b=setTimeout(()=>{w()},150))};f.addEventListener("input",v),f.addEventListener("change",w),f.dataset.listenerAttached="true"}Hi?.();const g=document.getElementById("editReservationModal");g&&!g.dataset.cleanupAttached&&(g.addEventListener("hidden.bs.modal",()=>{Oi(),t?.(),s?.([])}),g.dataset.cleanupAttached="true")}const _u=ue()||{};let Me=(_u.projects||[]).map(ju),bn=!1;function sm(){return Me}function ma(e){Me=Array.isArray(e)?e.map(ks):[],Xa({projects:Me});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return Me}async function $u(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,d])=>{d==null||d===""||t.set(c,String(d))});const n=t.toString(),s=(await Ke(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(As);return ma(i),bn=!0,Me}async function Tu({force:e=!1,params:t=null}={}){if(!e&&bn&&Me.length>0)return Me;try{return await $u(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),Me}}async function rm(e){const t=await Ke("/projects/",{method:"POST",body:e}),n=As(t?.data??{}),a=[...Me,n];return ma(a),bn=!0,n}async function im(e,t){const n=await Ke(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=As(n?.data??{}),s=Me.map(r=>String(r.id)===String(e)?a:r);return ma(s),bn=!0,a}async function om(e){await Ke(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=Me.filter(n=>String(n.id)!==String(e));ma(t),bn=!0}function cm({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:d,paymentStatus:l,equipmentEstimate:u=0,expenses:p=[],taxAmount:y=0,totalWithTax:m=0,discount:f=0,discountType:g="percent",companyShareEnabled:b=!1,companySharePercent:w=null,companyShareAmount:v=0,paidAmount:A=null,paidPercentage:N=null,paymentProgressType:O=null,paymentProgressValue:q=null,confirmed:x=!1,technicians:I=[],equipment:_=[],payments:T,paymentHistory:$}={}){const j=Array.isArray(I)?I.map(R=>Number.parseInt(String(R),10)).filter(R=>Number.isInteger(R)&&R>0):[],z=Array.isArray(_)?_.map(R=>{const H=Number.parseInt(String(R.equipmentId??R.equipment_id??R.id??0),10),K=Number.parseInt(String(R.qty??R.quantity??0),10);return!Number.isInteger(H)||H<=0?null:{equipment_id:H,quantity:Number.isInteger(K)&&K>0?K:1}}).filter(Boolean):[],F=Array.isArray(p)?p.map(R=>{const H=Number.parseFloat(R?.amount??R?.value??0)||0,K=(R?.label??R?.name??"").trim();return K?{label:K,amount:Math.round(H*100)/100}:null}).filter(Boolean):[],M=F.reduce((R,H)=>R+(H?.amount??0),0),k={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!d,payment_status:l??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(M*100)/100,tax_amount:Math.round((Number.parseFloat(y)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(m)||0)*100)/100,confirmed:!!x,technicians:j,equipment:z,expenses:F},G=Math.max(0,Number.parseFloat(f)||0);k.discount=G,k.discount_type=g==="amount"?"amount":"percent";const B=Number.parseFloat(w),C=!!b&&Number.isFinite(B)&&B>0;k.company_share_enabled=C,k.company_share_percent=C?B:0,k.company_share_amount=C?Math.max(0,Number.parseFloat(v)||0):0,Number.isFinite(Number(A))&&(k.paid_amount=Math.max(0,Number.parseFloat(A)||0)),Number.isFinite(Number(N))&&(k.paid_percentage=Math.max(0,Number.parseFloat(N)||0)),(O==="amount"||O==="percent")&&(k.payment_progress_type=O),q!=null&&q!==""&&(k.payment_progress_value=Number.parseFloat(q)||0),e&&(k.project_code=String(e).trim());const V=T!==void 0?T:$;if(V!==void 0){const R=Qi(V)||[];k.payments=R.map(H=>({type:H.type,amount:H.amount!=null?H.amount:null,percentage:H.percentage!=null?H.percentage:null,value:H.value!=null?H.value:null,note:H.note??null,recorded_at:H.recordedAt??null}))}return k.end_datetime||delete k.end_datetime,k.client_company||(k.client_company=null),k}function As(e={}){return ks(e)}function ju(e={}){return ks(e)}function ks(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(m=>{if(m==null)return null;if(typeof m=="object"){const f=m.id??m.technician_id??m.technicianId;return f!=null?String(f):null}return String(m)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(m=>{const f=m?.equipment_id??m?.equipmentId??m?.id??null,g=m?.quantity??m?.qty??0,b=m?.barcode??m?.code??"",w=m?.description??m?.name??"";return{equipmentId:f!=null?String(f):null,qty:Number.parseInt(String(g),10)||0,barcode:b,description:w}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((m,f)=>({id:m?.id??`expense-${t??"x"}-${f}`,label:m?.label??"",amount:Number.parseFloat(m?.amount??0)||0})),d=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,l=e.company_share_enabled??e.companyShareEnabled,u=l!=null?l===!0||l===1||String(l).toLowerCase()==="true":d>0,p=e.payment_history??e.paymentHistory??e.payments??null,y=Qi(p);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?d:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(m=>typeof m=="object"?m:{id:m}),equipment:r,expenses:c,paymentHistory:y}}function lm(e){return e instanceof ur}function Ea(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function Pu(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=Ea(e.value);let s=Ea(e.amount),r=Ea(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,d=e.recordedAt??e.recorded_at??e.date??null;let l=null;if(d){const p=new Date(d);Number.isNaN(p.getTime())||(l=p.toISOString())}l||(l=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:l}}function Qi(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>Pu(t)).filter(Boolean):[]}const Qn="reservations-ui:ready",Et=typeof EventTarget<"u"?new EventTarget:null;let xt={};function Cu(e){return Object.freeze({...e})}function Nu(){if(!Et)return;const e=xt,t=typeof CustomEvent=="function"?new CustomEvent(Qn,{detail:e}):{type:Qn,detail:e};typeof Et.dispatchEvent=="function"&&Et.dispatchEvent(t)}function Lu(e={}){if(!e||typeof e!="object")return xt;const t={...xt};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),xt=Cu(t),Nu(),xt}function Bu(e){if(e)return xt?.[e]}function dm(e){const t=Bu(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const i=(s?.detail||xt)?.[e];typeof i=="function"&&(Et&&Et.removeEventListener(Qn,a),n(i))};Et&&Et.addEventListener(Qn,a)})}function um(){return Tu().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=ue()||{};Sc(e||[]),Yr()})}function _s(e=null){Yr(),Gi(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Du(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Wa(){return{populateEquipmentDescriptionLists:lt,setFlatpickrValue:Su,splitDateTime:yr,renderEditItems:mt,updateEditReservationSummary:Fe,addEquipmentByDescription:qu,addEquipmentToEditingReservation:vu,addEquipmentToEditingByDescription:Kn,combineDateTime:rn,hasEquipmentConflict:Qe,hasTechnicianConflict:br,renderReservations:Gi,handleReservationsMutation:_s,ensureModal:Du}}function Gi(e="reservations-list",t=null){su({containerId:e,filters:t,onShowDetails:Wi,onConfirmReservation:Ji})}function Wi(e){return ru(e,{getEditContext:Wa,onEdit:(t,{reservation:n})=>{Yi(t,n)},onDelete:Xi})}function Xi(e){return $t()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?ou(e,{onAfterChange:_s}):!1:(un(),!1)}function Ji(e){return cu(e,{onAfterChange:_s})}function Yi(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}dr(e,Wa());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}dr(e,Wa());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}ac({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function mm(){Lu({showReservationDetails:Wi,deleteReservation:Xi,confirmReservation:Ji,openReservationEditor:Yi})}export{im as A,Lu as B,Wi as C,As as D,Vt as E,ls as F,Wu as G,Xu as H,sm as I,lm as J,ei as K,Ju as L,em as M,Vu as N,Uu as O,Gu as P,$u as Q,we as R,Ku as S,Qu as T,Yu as U,om as V,rm as W,zl as X,ni as Y,ai as Z,Zu as _,Tu as a,mm as b,am as c,nm as d,tm as e,Yr as f,Wa as g,oe as h,Ou as i,_s as j,Fl as k,um as l,ut as m,sa as n,$e as o,$c as p,Cn as q,Gi as r,zu as s,Mu as t,Fe as u,Hu as v,Bu as w,dm as x,Zr as y,cm as z};
