import{n as h,d as ye,f as yc,t as o,b as lt,h as w,j as Gt,o as Nn,s as ks,A as Mi,z as bc,k as Ge,B as zi,u as gc}from"./auth.js";import{n as ee,A as dt,B as Hi,C as hc,D as _t,E as $s,z as He,F as Oi,G as pi,H as Pn,I as Cn,J as va,K as vc,h as Ps,L as ut,M as Cs,N as pn,O as Vi,P as qc,Q as Sc,R as Ec,S as wc,T as Wt,U as na,V as Ac,W as qa,X as Ui,Y as Ki,w as Ts,j as Ls,k as js,Z as Qi,_ as xc,s as Bn,c as Sa,$ as Gi,a0 as Ic,a1 as Wi,a2 as _c,x as Ns,e as Ct,a3 as Xi,a4 as ve,a5 as Te,q as Ea,a6 as Ji,a7 as Kn,a8 as es,a as Yi,g as Ht,a9 as kc,aa as $c,ab as ts,ac as Pc,y as Cc,ad as Tc,ae as Lc,af as jc,ag as Nc,b as Bc}from"./reservationsService.js";const Ua="select.form-select:not([data-no-enhance]):not([multiple])",mt=new WeakMap;let Ka=null,fi=!1,bt=null;function im(e=document){e&&(e.querySelectorAll(Ua).forEach(t=>Jn(t)),!Ka&&e===document&&(Ka=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(Ua)&&Jn(a),a.querySelectorAll?.(Ua).forEach(s=>Jn(s)))})}),Ka.observe(document.body,{childList:!0,subtree:!0})),fi||(fi=!0,document.addEventListener("pointerdown",Rc,{capture:!0})))}function Xn(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){Jn(e);return}const t=e.closest(".enhanced-select");t&&(Bs(t),aa(t),ns(t))}function Jn(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){Xn(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};mt.set(t,r),a.addEventListener("click",()=>Fc(t)),a.addEventListener("keydown",i=>Mc(i,t)),s.addEventListener("click",i=>Hc(i,t)),s.addEventListener("keydown",i=>zc(i,t)),e.addEventListener("change",()=>{aa(t),Zi(t)}),r.observer=new MutationObserver(i=>{let c=!1,l=!1;for(const d of i)d.type==="attributes"&&d.attributeName==="disabled"&&(l=!0),d.type==="childList"&&(c=!0);l&&ns(t),c&&Dc(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),Bs(t),aa(t),ns(t)}function Dc(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,Bs(t),aa(t)})))}function Bs(e){const t=mt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),Zi(e)}function aa(e){const t=mt.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function Zi(e){const t=mt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function ns(e){const t=mt.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function Fc(e){mt.get(e)&&(e.getAttribute("data-open")==="true"?fn(e):er(e))}function er(e){const t=mt.get(e);if(!t)return;bt&&bt!==e&&fn(bt,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),bt=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function fn(e,{focusTrigger:t=!0}={}){const n=mt.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),bt===e&&(bt=null))}function Rc(e){if(!bt)return;const t=e.target;t instanceof Node&&(bt.contains(t)||fn(bt,{focusTrigger:!1}))}function Mc(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),er(t)):n==="Escape"&&fn(t)}function zc(e,t){const n=e.key,a=mt.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&tr(i,t)}else n==="Escape"&&(e.preventDefault(),fn(t))}function Hc(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&tr(n,t)}function tr(e,t){const n=mt.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),fn(t)}const yn=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let gt=null;function Ds(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function nr(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function Oc(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function Vc(e={}){const t=Oc({...e,activatedAt:Date.now()});return gt=t,nr(!0,t.mode||"create"),Ds(yn.change,{active:!0,selection:{...t}}),t}function sa(e="manual"){if(!gt)return;const t=gt;gt=null,nr(!1),Ds(yn.change,{active:!1,previous:t,reason:e})}function ar(){return!!gt}function Uc(){return gt?{...gt}:null}function Kc(e){if(!gt)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=h(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:r,description:i}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const l=c.map(u=>h(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!l.length)return!1;const d=Number.isInteger(s)&&s>0?s:l.length;t={barcodes:l,quantity:Math.min(d,l.length)},r&&(t.groupKey=r),i&&(t.description=i)}else return!1;return Ds(yn.requestAdd,{...t,selection:{...gt}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||sa("tab-changed")});const Qc=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Gc=new Set(["maintenance","reserved","retired"]);function Wc(e){const t=String(e??"").trim().toLowerCase();return t&&Qc.get(t)||"available"}function Xc(e){return e?typeof e=="object"?e:wa(e):null}function qt(e){const t=Xc(e);return t?Wc(t.status||t.state||t.statusLabel||t.status_label):"available"}function Fs(e){return!Gc.has(qt(e))}function Xt(e={}){return e.image||e.imageUrl||e.img||""}function Jc(e){if(!e)return null;const t=ee(e),{equipment:n=[]}=ye();return(n||[]).find(a=>ee(a?.barcode)===t)||null}function wa(e){const t=ee(e);if(!t)return null;const{equipment:n=[]}=ye();return(n||[]).find(a=>ee(a?.barcode)===t)||null}const Yc=ye()||{};let xt=(Yc.equipment||[]).map(tl),as=!1,xn="",Rt=null,Vt=null,Ut=null,Aa=!1,yi=!1;function Zc(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function el(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function tl(e={}){return Rs({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function xa(e={}){return Rs(e)}function Rs(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=Dn(e.quantity??e.qty??0),i=Ia(e.unit_price??e.price??0),c=h(String(e.barcode??"").trim()),l=De(e.status??e.state??e.status_label??e.statusLabel??"available"),d=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:nl(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:l,image:d,imageUrl:d,created_at:e.created_at??null,updated_at:e.updated_at??null}}function nl(e){return e!=null&&e!==""}function Dn(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function Ia(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function al(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function bi(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function sl(e,t){const n=bi(e),a=bi(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}else{if(r!==i)return r?-1:1;{const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}}const c=ia(e?.desc||e?.description||e?.name||""),l=ia(t?.desc||t?.description||t?.name||"");return c.localeCompare(l,"ar",{sensitivity:"base"})}function $e(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function De(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function il(e){return De(e)}function ss(){if(!ar())return null;const e=Uc();return e?{...e}:null}function rl(e){const t=ss();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:r=null}=t,i=t?.mode||t?.source||"",c=[],l=new Set;if(n.forEach(f=>{const m=ee(f?.barcode);!m||l.has(m)||(l.add(m),c.push({variant:f,barcode:m}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(i==="package-manager"||i==="equipment-packages"){const f=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:m})=>m),maxQuantity:f,reason:""}}const d=c.filter(({variant:f})=>Fs(f));if(!a||!s)return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=d.filter(({barcode:f})=>!dt(f,a,s,r));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:f})=>f),maxQuantity:u.length};let y=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(d.length>0)y=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const f=new Set(c.map(({variant:m})=>De(m?.status)));f.has("maintenance")?y=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):f.has("reserved")?y=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):f.has("retired")&&(y=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:y,availableBarcodes:[],maxQuantity:0}}function ol(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function sr(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=ss();e.hidden=!s;const r=s?.mode||s?.source||"";s?r==="package-manager"||r==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=ss(),l=c?.mode||c?.source||"";l==="package-manager"||l==="equipment-packages"?sa("package-finish-button"):(sa("return-button"),ol())}),t.dataset.listenerAttached="true")}function We(){return xt}function Kt(e){xt=Array.isArray(e)?e.map(Rs):[],ks({equipment:xt}),el()}function ia(e){return String(e??"").trim().toLowerCase()}function kt(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=ia(t);return n||(n=ia(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function _a(e){const t=kt(e);return t?We().filter(n=>kt(n)===t):[]}function ka(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=$a(e);if(n){const a=$e(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${$e(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function Ms(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function ra(){const e=Ms();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function zs(e={}){const t=Ms();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function ln(e){Aa=e;const t=Ms(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function rm(e){if(!Gt()){Nn();return}if(!e)return;try{await ll()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){w(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let l=0;if(i.forEach(d=>{const u=d.القسم??d.category??"",y=d["القسم الثانوي"]??d.subcategory??"",f=d.الوصف??d.description??d.name??"",m=d.الكمية??d.quantity??0,p=d.السعر??d.price??0,g=d.الباركود??d.barcode??"",q=d.الحالة??d.status??"متاح",_=d.الصورة??d.image_url??d.image??"",v=h(String(g||"")).trim();if(!f||!v){l+=1;return}c.push(Hs({category:u,subcategory:y,description:f,quantity:m,unit_price:p,barcode:v,status:q,image_url:_}))}),!c.length){w(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const d=await lt("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(d?.data)?d.data.map(xa):[];if(u.length){const m=[...We(),...u];Kt(m)}await Pa({showToastOnError:!1}),Fe();const y=d?.meta?.count??u.length,f=[];y&&f.push(`${y} ✔️`),l&&f.push(`${l} ⚠️`),w(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(f.length?` (${f.join(" / ")})`:""))}catch(d){const u=bn(d,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");w(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),w(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),w(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const cl="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let qn=null;function ll(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):qn||(qn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=cl,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),qn=null,e}),qn)}function Hs({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const l=h(String(r||"")).trim(),d=il(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:Dn(a),unit_price:Ia(s),barcode:l,status:d,image_url:c?.trim()||null}}async function dl(){if(!Gt()){Nn();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await lt("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await Pa({showToastOnError:!1}),w(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=bn(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");w(t,"error")}}function $a(e){return e.image||e.imageUrl||e.img||""}function ul(e){const t=De(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function oa(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${$e(a)}</td></tr>`}n&&(n.textContent="0")}function ir(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=Rt?.groupKey||kt(e);if(!r){oa();return}const i=We().filter(y=>kt(y)===r).sort((y,f)=>{const m=String(y.barcode||"").trim(),p=String(f.barcode||"").trim();return!m&&!p?0:m?p?m.localeCompare(p,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){oa();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),l=o("equipment.form.labels.quantity","الكمية"),d=We(),u=i.map(y=>{const f=y.id&&e.id?String(y.id)===String(e.id):String(y.barcode||"")===String(e.barcode||""),m=f?"equipment-variants-table__row--current":"",p=$e(String(y.barcode||"-")),g=f?`<span class="equipment-variants-current-badge">${$e(c)}</span>`:"",q=h(String(Number.isFinite(Number(y.qty))?Number(y.qty):0)),_=d.indexOf(y),v=$e(o("equipment.item.actions.delete","🗑️ حذف")),S=_>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${_}">${v}</button>
          </div>`:"";return`
        <tr class="${m}">
          <td>
            ${p}
            ${g}
          </td>
          <td>${ul(y.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${$e(l)}">${q}</span>
          </td>
          <td class="table-actions-cell">${S}</td>
        </tr>
      `}).join("");n.innerHTML=u}function ml({item:e,index:t}){const n=$a(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=Gt(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},l=Number.isFinite(Number(e.qty))?Number(e.qty):0,d=Number.isFinite(Number(e.price))?Number(e.price):0,u=l.toLocaleString("en-US"),y=d.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),f=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,m=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,p=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(l-f-m,0),g=p.toLocaleString("en-US"),q=o("equipment.card.labels.availableOfTotal","من أصل"),_=De(e.status);let v=`${$e(c.available)}: ${$e(g)} ${$e(q)} ${$e(u)}`,S="available";if(p===0){const M={reserved:{text:l===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},G=M[_]||M.default;v=$e(G.text),S=G.modifier}const L=`<span class="equipment-card__availability equipment-card__availability--${S}">${v}</span>`,W="",E=e.desc||e.name||"—",I=e.name&&e.name!==e.desc?e.name:"",k=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${y} ${r}`}].map(({label:M,value:G})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${M}</span>
              <span class="equipment-card__detail-value">${G}</span>
            </span>
          `).join("")}
    </div>`,H=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),$=H.length?`<div class="equipment-card__categories">${H.map(({label:M,value:G})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${M}</span>
              <span class="equipment-card__detail-value">${G}</span>
            </div>
          `).join("")}</div>`:"",N=I?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${I}</span>
      </div>`:"",C=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${E}</h3>
    </div>
  `}
      ${k}
    </div>
  `,B=[],x=rl(e),Y=x?.availableBarcodes?.length?x.availableBarcodes.join(","):x?.barcode?x.barcode:"";let U="",F="";if(x.active){const M=`equipment-select-qty-${t}`,G=!!x.canSelect,se=G?Math.max(1,Number(x.maxQuantity||x.availableBarcodes?.length||1)):1,te=Math.max(1,Math.min(se,99)),de=[];for(let ae=1;ae<=te;ae+=1){const we=h(String(ae));de.push(`<option value="${ae}"${ae===1?" selected":""}>${we}</option>`)}const O=G?"":" disabled",re=o("reservations.create.equipment.selector.quantityLabel","الكمية"),Se=G?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${h(String(se))}`:x.reason?x.reason:"";U=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${M}">${re}</label>
        <select class="equipment-card__quantity-select" id="${M}" data-equipment-select-quantity${O}>
          ${de.join("")}
        </select>
        ${Se?`<span class="equipment-card__selection-hint">${$e(Se)}</span>`:""}
      </div>
    `;const Ee=o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),Ce=G?"":" disabled",K=x.reason?` title="${$e(x.reason)}"`:"",Z=['data-equipment-action="select-reservation"',`data-selection-max="${G?se:0}"`];Y&&Z.push(`data-selection-barcodes="${$e(Y)}"`),e.groupKey&&Z.push(`data-selection-group="${$e(String(e.groupKey))}"`),F=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${Z.join(" ")}${Ce}${K}>${Ee}</button>
    `}i&&B.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const D=B.length?B.join(`
`):"",R=$e(E);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${$e(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${R}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${W}
        ${L}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${C}
        </div>
      </div>
      <div class="equipment-card__body">
        ${$}
        ${N}
      </div>
      ${U||F||D?`<div class="equipment-card__actions equipment-card__actions--center">
            ${U}
            ${F}
            ${D}
          </div>`:""}
    </article>
  `}function pl(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,a.appendChild(l)}),t.includes(i)&&(a.value=i),Xn(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,s.appendChild(l)}),n.includes(i)&&(s.value=i),Xn(s)}const r=document.getElementById("filter-status");r&&Xn(r)}function Fn(){const e=ye();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return xt=t||[],xt;const s=new Date;let r=!1;const i=new Set((a||[]).filter(l=>l?.status==="open").map(l=>h(String(l?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(l=>{if(!l)return l;const d=De(l.status),u=h(String(l.barcode??"")).trim().toLowerCase(),y=u&&i.has(u);let f=y?"maintenance":"available";if(!y&&u)for(const m of n||[]){if(!fl(m,s))continue;if(m.items?.some(g=>h(String(g?.barcode??"")).trim().toLowerCase()===u)){f="reserved";break}}return f!==d?(r=!0,{...l,status:f}):{...l,status:f}});return r?Kt(c):(xt=c,ks({equipment:xt})),xt}function fl(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function Qa(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Fe(){const e=document.getElementById("equipment-list");if(!e)return;sr();const t=Fn(),n=Array.isArray(t)?t:We(),a=new Map;n.forEach(g=>{if(!g)return;const q=kt(g);q&&(a.has(q)||a.set(q,[]),a.get(q).push(g))});const s=Array.from(a.values()).map(g=>{const q=g[0],_=g.reduce((I,P)=>I+(Number.isFinite(Number(P.qty))?Number(P.qty):0),0),v=["maintenance","reserved","available","retired"],S=g.map(I=>De(I.status)).sort((I,P)=>v.indexOf(I)-v.indexOf(P))[0]||"available",L=g.reduce((I,P)=>{const k=Dn(P?.qty??0)||0,H=De(P?.status);return H==="reserved"?I.reserved+=k:H==="maintenance"&&(I.maintenance+=k),I},{reserved:0,maintenance:0}),W=Math.max(_-L.reserved-L.maintenance,0);return{item:{...q,qty:_,status:S,variants:g,groupKey:kt(q),reservedQty:L.reserved,maintenanceQty:L.maintenance,availableQty:W},index:n.indexOf(q)}});s.sort((g,q)=>sl(g.item,q.item));const r=document.getElementById("search-equipment")?.value||"",i=h(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",l=document.getElementById("filter-sub")?.value||"",d=document.getElementById("filter-status")?.value||"",u=d?De(d):"";if(as&&!n.length){e.innerHTML=Qa(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(xn&&!n.length){e.innerHTML=Qa(xn,{tone:"error",icon:"⚠️"});return}const y=s.filter(({item:g})=>{const q=h(String(g.barcode??"")).toLowerCase().trim(),_=Array.isArray(g.variants)?g.variants.map(E=>h(String(E.barcode??"")).toLowerCase().trim()).filter(Boolean):[],v=!i||g.name&&g.name.toLowerCase().includes(i)||g.desc&&g.desc.toLowerCase().includes(i)||q&&q.includes(i)||_.some(E=>E.includes(i))||g.category&&g.category.toLowerCase().includes(i)||g.sub&&g.sub.toLowerCase().includes(i),S=!c||g.category===c,L=!l||g.sub===l,W=!u||De(g.status)===u;return v&&S&&L&&W}),f=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),m=y;e.innerHTML=m.length?m.map(ml).join(""):Qa(f);const p=document.getElementById("equipment-list-count");if(p){const g=o("equipment.list.countSuffix","عنصر"),q=h(String(m.length)),_=m.length?`${q} ${g}`:`0 ${g}`;p.textContent=_}pl(n)}async function Pa({showToastOnError:e=!0}={}){as=!0,xn="",Fe();try{const t=await lt("/equipment/?all=1"),n=Array.isArray(t?.data)?t.data.map(xa):[];Kt(n)}catch(t){xn=bn(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&w(xn,"error")}finally{as=!1,Fe()}}function bn(e,t,n){if(e instanceof Mi){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function yl(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),r=Ia(t.querySelector("#new-equipment-price")?.value||"0"),i=Dn(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",l=t.querySelector("#new-equipment-category")?.value?.trim()||"",d=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){w(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const y=Hs({category:l,subcategory:d,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const f=await lt("/equipment/",{method:"POST",body:y}),m=xa(f?.data),p=[...We(),m];Kt(p),Fe(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),w(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(f){const m=bn(f,"equipment.toast.addFailed","تعذر إضافة المعدة");w(m,"error")}}async function rr(e){if(!Gt()){Nn();return}const t=We(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await lt(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),Kt(a),Fe(),w(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=bn(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");w(s,"error")}}async function bl(e,t){const n=We(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},Kt(r),Fe();return}const s=Hs({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await lt(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=xa(r?.data),c=[...n];c[e]=i,Kt(c),Fe(),w(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=bn(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw w(i,"error"),r}}function Qn(){Fe()}function or(e){const n=We()[e];if(!n)return;Vt=e;const a=_a(n),s=a[0]||n,r=a.reduce((l,d)=>l+(Number.isFinite(Number(d.qty))?Number(d.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(l=>De(l.status)).sort((l,d)=>i.indexOf(l)-i.indexOf(d))[0]||De(s.status);document.getElementById("edit-equipment-index").value=e,zs({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:$a(s)||"",barcode:s.barcode||"",status:s.status||c}),ln(!1),Ut=ra(),ka(s),ir(s),Rt={groupKey:kt(s),barcode:String(s.barcode||""),id:s.id||null},Zc(document.getElementById("editEquipmentModal"))?.show()}function gl(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),r=s?.querySelector("[data-equipment-select-quantity]");let i=Number.parseInt(r?.value||"1",10);(!Number.isFinite(i)||i<=0)&&(i=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&i>c&&(i=c);const d=(t.dataset.selectionBarcodes||"").split(",").map(m=>m.trim()).filter(m=>m.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",y=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";Kc({barcodes:d,quantity:i,groupKey:y,description:u})||w(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||rr(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||or(s)}}function hl(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||or(n)}}function vl(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||rr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function cr(){if(!Rt||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=We(),a=Rt.id?n.find(l=>String(l.id)===String(Rt.id)):null,s=Rt.groupKey,r=s?n.find(l=>kt(l)===s):null,i=a||r;if(!i){oa();return}const c=n.findIndex(l=>l===i);if(c>=0){const l=document.getElementById("edit-equipment-index");l&&(l.value=String(c)),Vt=c}if(ir(i),!Aa){const l=_a(i),d=l[0]||i,u=l.reduce((m,p)=>m+(Number.isFinite(Number(p.qty))?Number(p.qty):0),0),y=["maintenance","reserved","available","retired"],f=l.map(m=>De(m.status)).sort((m,p)=>y.indexOf(m)-y.indexOf(p))[0]||De(d.status);zs({category:d.category||"",subcategory:d.sub||"",description:d.desc||d.description||"",quantity:String(u||d.qty||0),price:d.price!=null?String(d.price):"0",image:$a(d)||"",barcode:d.barcode||"",status:d.status||f}),Ut=ra()}ka(primary)}function ql(){document.getElementById("search-equipment")?.addEventListener("input",Qn),document.getElementById("filter-category")?.addEventListener("change",Qn),document.getElementById("filter-sub")?.addEventListener("change",Qn),document.getElementById("filter-status")?.addEventListener("change",Qn),document.getElementById("add-equipment-form")?.addEventListener("submit",yl);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),dl().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",gl),t.addEventListener("keydown",hl),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",vl),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);al(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!Aa){Ut=ra(),ln(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){w(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:Dn(document.getElementById("edit-equipment-quantity").value)||1,price:Ia(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await bl(t,n),Ut=ra(),ln(!1),cr()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{ql(),Fe(),Pa();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(Ut&&zs(Ut),Vt!=null){const a=We()[Vt];if(a){const r=_a(a)[0]||a;ka(r)}}ln(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Fe(),ln(Aa),Vt!=null){const t=We()[Vt];if(t){const a=_a(t)[0]||t;ka(a)}}});document.addEventListener("equipment:refreshRequested",()=>{Pa({showToastOnError:!1})});document.addEventListener(yc.USER_UPDATED,()=>{Fe()});document.addEventListener("equipment:changed",()=>{cr()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{Rt=null,oa(),Vt=null,Ut=null,ln(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!yi&&(document.addEventListener(yn.change,()=>{sr(),Fe()}),yi=!0);const Sl="__DEBUG_CREW__";function El(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(Sl);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function gi(e,t){if(El())try{console.log(`🪵 [crew-debug:create] ${e}`,t)}catch{}}const lr="projects:create:draft",dr="projects.html#projects-section";let is=null,ur=[],rs=new Map,os=new Map,ca=new Map,Ga=!1,Yn=null,hi=!1,mr=[];function wl(e){if(!e)return null;let t=mr.find(a=>a.id===e)||null;if(t)return t;const n=qc(e);return n?(t={id:e,name:Ec(n)||e,price:Sc(n),items:Ps(n),raw:n},t):null}function la(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function da(e){return h(String(e||"")).trim().toLowerCase()}function Al(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function pr(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function fr(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function yr(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function br(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function Qt(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function Os(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function Jt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Ke(){const{input:e,hidden:t}=Jt();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function Dt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function gr(e,t,{allowPartial:n=!1}={}){const a=He(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function cs(e,t={}){return gr(rs,e,t)}function ls(e,t={}){return gr(os,e,t)}function Qe(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function hr(e){ur=Array.isArray(e)?[...e]:[]}function Vs(){return ur}function Us(e){return e&&Vs().find(t=>String(t.id)===String(e))||null}function vi(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function dn(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??_t,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:_t}function et(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??_t,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=_t),t.dataset.companyShare=String(s),t.checked=!0}function ds(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(Ga){ue();return}Ga=!0;const a=()=>{Ga=!1,ue()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(_t)),t.disabled){n.checked=!1,w(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),et()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?et():n.checked&&(n.checked=!1));a()}function xl(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function qi(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function Si(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function ht({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=Os();if(!n||!a||!s)return;const r=$s()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const l=new Set;rs=new Map;const d=r.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:Si(m)||c})).filter(m=>{if(!m.label)return!1;const p=He(m.label);return!p||l.has(p)?!1:(l.add(p),rs.set(p,m),!0)}).sort((m,p)=>m.label.localeCompare(p.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(m=>`<option value="${la(m.label)}"></option>`).join("");const u=t?"":n.value,y=e?String(e):a.value?String(a.value):"",f=y?r.find(m=>String(m.id)===y):null;if(f){const m=Si(f)||c;a.value=String(f.id),n.value=m,n.dataset.selectedId=String(f.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function un({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=Jt();if(!a||!s||!r)return;const i=Array.isArray(t)?t:Vs()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const l=[...i].filter(g=>g&&g.id!=null).sort((g,q)=>String(q.createdAt||q.start||"").localeCompare(String(g.createdAt||g.start||""))),d=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),y=new Set;os=new Map;const f=l.map(g=>{const q=vi(g)||u;return{id:String(g.id),label:q}}).filter(g=>{if(!g.label)return!1;const q=He(g.label);return!q||y.has(q)?!1:(y.add(q),os.set(q,g),!0)});r.innerHTML=f.map(g=>`<option value="${la(g.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",p=m?l.find(g=>String(g.id)===m):null;if(p){const g=vi(p)||u;s.value=String(p.id),a.value=g,a.dataset.selectedId=String(p.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function ua(e,t,n){const{date:a,time:s}=Vi(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function vr(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||un({selectedValue:a});const r=($s()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";ht(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=qi(e,"start"),l=qi(e,"end");c&&ua("res-start","res-start-time",c),l&&ua("res-end","res-end-time",l);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),ue(),$t()}function qr({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:ye(),s=Array.isArray(a)?a:[];hr(s);const r=t!=null?String(t):n.value?String(n.value):"";un({selectedValue:r,projectsList:s}),$t(),ue()}function $t(){const{input:e,hidden:t}=Jt(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),l=document.getElementById("res-discount-type"),d=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),y=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(Dt(n,Ke),a&&Dt(a,Ke)),s&&Dt(s,Ke),r&&Dt(r,Ke),i&&Dt(i,Ke),c&&Dt(c,Ke),l&&Dt(l,Ke),y)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=d),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=d),s&&(s.value="unpaid",Qe(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=d),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=d),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=d),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=d),l&&(l.value="percent",l.disabled=!0,l.classList.add("reservation-input-disabled"),l.title=d);else{if(n){const f=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",f&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.disabled=!1,l.classList.remove("reservation-input-disabled"),l.title="")}ds("tax"),ue()}function Ks(){const{input:e,hidden:t}=Jt();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?ls(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=Us(r.id);i?vr(i,{skipProjectSelectUpdate:!0}):($t(),ue())}else t.value="",e.dataset.selectedId="",$t(),ue()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?ls(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Qs(){const{input:e,hidden:t}=Os();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?cs(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),ue()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?cs(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Il(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){In({clearValue:!0});return}let n=null;try{const d=decodeURIComponent(t);n=JSON.parse(d)}catch(d){console.warn("⚠️ [reservations/createForm] Failed to decode project context",d)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),In({clearValue:!1}),!n)return;n.fromProjectForm&&(Yn={draftStorageKey:n.draftStorageKey||lr,returnUrl:n.returnUrl||dr});const r=document.getElementById("res-project");if(n.projectId){r&&(un({selectedValue:String(n.projectId)}),$t());const d=Us(n.projectId);d?vr(d,{forceNotes:!!n.forceNotes}):ue(),In()}else{r&&un({selectedValue:""});const d=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");zl(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),d)}n.start&&ua("res-start","res-start-time",n.start),n.end&&ua("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=($s()||[]).find(y=>String(y.id)===String(n.customerId));u?.id!=null&&(ht({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(ht({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):ht({selectedValue:""});const l=document.getElementById("res-notes");l&&n.description&&!l.value&&(l.value=n.description),ue()}function Yt(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Pn(e,n),end:Pn(t,a)}}function Sr(e){const t=da(e);if(t){const c=ca.get(t);if(c)return c}const{description:n,barcode:a}=pr(e);if(a){const c=wa(a);if(c)return c}const s=He(n||e);if(!s)return null;let r=Gi();if(!r?.length){const c=ye();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&Wi(r)}const i=r.find(c=>He(c?.desc||c?.description||"")===s);return i||r.find(c=>He(c?.desc||c?.description||"").includes(s))||null}function Er(e,t="equipment-description-options"){const n=da(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(l=>da(l.value)===n)||ca.has(n))return!0;const{description:s}=pr(e);if(!s)return!1;const r=He(s);return r?(Gi()||[]).some(c=>He(c?.desc||c?.description||"")===r):!1}const _l={available:0,reserved:1,maintenance:2,retired:3};function kl(e){return _l[e]??5}function Ei(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function $l(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${Ei(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${Ei(n)})`}function Pt(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=Fn(),a=ye(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];Wi(r);const i=new Map;r.forEach(d=>{const u=Al(d),y=da(u);if(!y||!u)return;const f=qt(d),m=kl(f),p=i.get(y);if(!p){i.set(y,{normalized:y,value:u,bestItem:d,bestStatus:f,bestPriority:m,statuses:new Set([f])});return}p.statuses.add(f),m<p.bestPriority&&(p.bestItem=d,p.bestStatus=f,p.bestPriority=m,p.value=u)}),ca=new Map;const l=Array.from(i.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{ca.set(d.normalized,d.bestItem);const u=$l(d),y=la(d.value);if(u===d.value)return`<option value="${y}"></option>`;const f=la(u);return`<option value="${y}" label="${f}"></option>`}).join("");e&&(e.innerHTML=l),t&&(t.innerHTML=l)}function wr(e,t,n={}){const{silent:a=!1}=n,s=ee(e);if(!s)return{success:!1,message:null};const{start:r,end:i}=Yt();if(!r||!i){const p=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||w(p),{success:!1,message:p}}const c=ut();if(Gs(c).has(s)){const p=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||w(p),{success:!1,message:p}}const d=Cs(s,r,i);if(d.length){const p=d.map(q=>q.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${p}`);return a||w(g),{success:!1,message:g}}if(dt(s,r,i)){const p=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||w(p),{success:!1,message:p}}const u=wa(s);if(!u){const p=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||w(p),{success:!1,message:p}}const y=qt(u);if(y==="maintenance"||y==="retired"){const p=Qt(y);return a||w(p),{success:!1,message:p}}const f=Wt(u);if(!f){const p=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||w(p),{success:!1,message:p}}va({id:f,equipmentId:f,barcode:s,desc:u.desc,qty:1,price:u.price,image:Xt(u)}),t&&(t.value=""),St(),ue();const m=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||w(m),{success:!0,message:m,barcode:s}}function us(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Sr(t);if(!n){w(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=Jc(n.barcode),s=qt(a||n);if(s==="maintenance"||s==="retired"){w(Qt(s));return}const r=ee(n.barcode);if(!r){w(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=Wt(n);if(!i){w(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Xt(n)},{start:l,end:d}=Yt();if(!l||!d){w(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=ut();if(Gs(u).has(r)){w(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const f=Cs(r,l,d);if(f.length){const m=f.map(p=>p.name).join(", ");w(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`));return}if(dt(r,l,d)){w(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}va(c),St(),ue(),w(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function Pl(){Pt();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),us(e))});const t=()=>{Er(e.value,"equipment-description-options")&&us(e)};e.addEventListener("focus",()=>{if(Pt(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function wi(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function Gs(e=ut()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=ee(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const r=ee(s?.normalizedBarcode??s?.barcode);r&&t.add(r)})}),t}function Cl(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=Yt();if(!t||!n){w(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}Vc({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):w(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(yn.change,t=>{wi(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),wi(e,ar()))}function Tl(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,r=a.length?a:t.barcode?[t.barcode]:[];if(!r.length)return;let i=0,c=null;const l=[],d=new Set;r.forEach(y=>{const f=ee(y);f&&!d.has(f)&&(d.add(f),l.push(f))});const u=Math.min(s,l.length);for(let y=0;y<u;y+=1){const f=l[y],m=wr(f,null,{silent:!0});m.success&&(i+=1),m.message&&(c=m.message)}if(i>0){const f=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",h(String(i)));w(f)}else c&&w(c)}function Ar(){Cl(),!(hi||typeof document>"u")&&(document.addEventListener(yn.requestAdd,Tl),hi=!0)}function Rn(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),r=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:r}}function ms(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=Rn();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const r=document.getElementById("equipment-barcode"),i=document.getElementById("equipment-description"),c=t==="package";r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),_c(t),t==="package"&&Ca()}function Ca(){const{packageSelect:e,packageHint:t}=Rn();if(!e)return;const n=Hi();mr=n,hc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,r=n.map(c=>{const l=Number.isFinite(Number(c.price))?Number(c.price):0,d=h(l.toFixed(2)),u=`${c.name} — ${d} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${r}`,e.selectedIndex=0;const i=n.length>0;e.disabled=!i,t&&(i?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),_r()}function Ll(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:r,blockingPackages:i})=>{const c=r?.desc||h(String(r?.barcode??r?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(i)&&i.length){const l=i.map(d=>d.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${l})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function xr(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const r=Cn(e);if(!r)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const i=wl(r);if(!i)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(m=>m?.type==="package"&&Cn(m.packageId)===r))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(vc(r,n,a,s)){const m=i.name||r;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${m} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(i.items)&&i.items.length?i.items:Ps(i.raw??{}),l=Gs(t),d=[],u=new Set;if(c.forEach(m=>{const p=ee(m?.normalizedBarcode??m?.barcode);if(p){if(u.has(p)){d.push({item:m,type:"internal"});return}u.add(p),l.has(p)&&d.push({item:m,type:"external"})}}),d.length){const m=d.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>h(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:d.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",m):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",m),duplicates:d}}const y=[];return c.forEach(m=>{const p=ee(m?.normalizedBarcode??m?.barcode);if(p&&dt(p,n,a,s)){const g=Cs(p,n,a,s);y.push({item:m,blockingPackages:g})}}),y.length?{success:!1,reason:"item_conflict",message:Ll(i,y),conflicts:y}:{success:!0,package:{id:`package::${r}`,packageId:r,type:"package",desc:i.name||`Package ${r}`,qty:1,price:Number.isFinite(Number(i.price))?Number(i.price):0,barcode:i.code||i.raw?.package_code||`pkg-${r}`,packageItems:c.map(m=>({equipmentId:m?.equipmentId??null,barcode:m?.barcode??m?.normalizedBarcode??"",normalizedBarcode:ee(m?.normalizedBarcode??m?.barcode),desc:m?.desc??"",qty:Number.isFinite(Number(m?.qty))?Number(m.qty):1,price:Number.isFinite(Number(m?.price))?Number(m.price):0})),image:c.find(m=>m?.image)?.image??null},packageInfo:i}}function Ir(e,{silent:t=!1}={}){const n=Cn(e);if(!n)return t||w(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=Yt(),r=ut(),i=xr(n,{existingItems:r,start:a,end:s});if(!i.success){if(!t){const l={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[i.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");w(i.message||l)}return i}return va(i.package),St(),ue(),t||w(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:i.package}}function _r(){const{packageSelect:e}=Rn();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;Ir(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function jl(){const{packageAddButton:e,packageSelect:t}=Rn();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){w(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}Ir(n)}),e.dataset.listenerAttached="true")}function kr(){const{modeRadios:e}=Rn();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&ms(s.target.value)}),a.dataset.listenerAttached="true")}),jl(),_r();const t=na(),n=e.find(a=>a.value===t);n&&(n.checked=!0),ms(t)}function St(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=ut(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),l=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=pn(n);t.innerHTML=d.map(u=>{const y=u.items[0]||{},f=Xt(y)||u.image,m=f?`<img src="${f}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',p=h(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,q=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,_=`${h(g.toFixed(2))} ${s}`,v=`${h(q.toFixed(2))} ${s}`,S=u.items.some(I=>I?.type==="package"),L=u.barcodes.map(I=>h(String(I||""))).filter(Boolean),W=L.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${L.map(I=>`<li>${I}</li>`).join("")}
            </ul>
          </details>`:"";let E="";if(S){const I=new Map;if(u.items.forEach(P=>{Array.isArray(P?.packageItems)&&P.packageItems.forEach(k=>{if(!k)return;const H=ee(k.barcode||k.desc||Math.random()),$=I.get(H);if($){$.qty+=Number.isFinite(Number(k.qty))?Number(k.qty):1;return}I.set(H,{desc:k.desc||k.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(k.qty))?Number(k.qty):1,barcode:k.barcode??k.normalizedBarcode??""})})}),I.size){const P=Array.from(I.values()).map(k=>{const H=h(String(k.qty)),$=k.desc||h(String(k.barcode||"")),N=k.barcode?` <span class="reservation-package-items__barcode">(${h(String(k.barcode))})</span>`:"";return`<li>${$}${N} × ${H}</li>`}).join("");E=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${P}
              </ul>
            </details>
          `}}return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${m}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${S?`${E||""}${W||""}`:W}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${c}" ${S?"disabled":""}>−</button>
              <span class="reservation-qty-value">${p}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${i}" ${S?"disabled":""}>+</button>
            </div>
          </td>
          <td>${_}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${l}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function Nl(e){const t=ut(),a=pn(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Ac(s),St(),ue())}function Bl(e){const t=ut(),n=t.filter(a=>qa(a)!==e);n.length!==t.length&&(Ui(n),St(),ue())}function Dl(e){const t=ut(),a=pn(t).find(y=>y.key===e);if(!a)return;const{start:s,end:r}=Yt();if(!s||!r){w(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(y=>ee(y.barcode))),{equipment:c=[]}=ye(),l=(c||[]).find(y=>{const f=ee(y?.barcode);return!f||i.has(f)||qa({desc:y?.desc||y?.description||y?.name||"",price:Number(y?.price)||0})!==e||!Fs(y)?!1:!dt(f,s,r)});if(!l){w(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=ee(l.barcode),u=Wt(l);if(!u){w(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}va({id:u,equipmentId:u,barcode:d,desc:l.desc||l.description||l.name||a.description||"",qty:1,price:Number.isFinite(Number(l.price))?Number(l.price):a.unitPrice,image:Xt(l)}),St(),ue()}function ue(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),l=c?.value||"unpaid",{start:d,end:u}=Yt();i&&et();const y=dn(),f=document.getElementById("res-payment-progress-type"),m=document.getElementById("res-payment-progress-value"),p=fr(f),g=yr(m);Oi(),pi({selectedItems:ut(),discount:n,discountType:s,applyTax:i,paidStatus:l,paymentProgressType:p,paymentProgressValue:g,start:d,end:u,companySharePercent:y,paymentHistory:[]});const q=pi.lastResult;q?(br(m,q.paymentProgressValue),c&&(c.value=q.paymentStatus,Qe(c,q.paymentStatus))):Qe(c,l)}function Fl(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=h(c.target.value),ue()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",ue),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(Ke()){n.checked=!1,w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}ds("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(Ke()){a.checked=!1,w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}ds("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(Ke()){s.value="unpaid",Qe(s,"unpaid"),w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Qe(s),ue()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(Ke()){r.value="percent",w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",ue()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(Ke()){i.value="",w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=h(c.target.value),ue()}),i.dataset.listenerAttached="true"),ue()}function Rl(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){ue();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),ue()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Ai(){const{input:e,hidden:t}=Os(),{input:n,hidden:a}=Jt(),{customers:s}=ye();let r=t?.value?String(t.value):"";if(!r&&e?.value){const O=cs(e.value,{allowPartial:!0});O&&(r=String(O.id),t&&(t.value=r),e.value=O.label,e.dataset.selectedId=r)}const i=s.find(O=>String(O.id)===r);if(!i){w(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let l=a?.value?String(a.value):"";if(!l&&n?.value){const O=ls(n.value,{allowPartial:!0});O&&(l=String(O.id),a&&(a.value=l),n.value=O.label,n.dataset.selectedId=l)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,y=document.getElementById("res-start-time")?.value||"00:00",f=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){w(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${d}T${y}`,p=`${u}T${f}`,g=new Date(m),q=new Date(p);if(Number.isNaN(g.getTime())||Number.isNaN(q.getTime())||g>=q){w(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const _=Oi();_.map(O=>O.technicianId).filter(Boolean);const v=ut();if(v.length===0&&_.length===0){w(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const S=document.getElementById("res-notes")?.value||"",L=parseFloat(h(document.getElementById("res-discount")?.value))||0,W=document.getElementById("res-discount-type")?.value||"percent",E=document.getElementById("res-payment-status"),I=E?.value||"unpaid",P=document.getElementById("res-payment-progress-type"),k=document.getElementById("res-payment-progress-value"),H=fr(P),$=yr(k),N=l?Us(l):null,X=xl(N);if(l&&!N){w(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const O of v){const re=qt(O.barcode);if(re==="maintenance"||re==="retired"){w(Qt(re));return}}for(const O of v){const re=ee(O.barcode);if(dt(re,m,p)){w(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const O of _)if(O?.technicianId&&Ki(O.technicianId,m,p)){w(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const C=document.getElementById("res-tax"),B=document.getElementById("res-company-share"),x=!!l;x?(C&&(C.checked=!1,C.disabled=!0,C.classList.add("disabled"),C.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),B&&(B.checked=!1,B.disabled=!0,B.classList.add("disabled"),B.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),E&&(E.value="unpaid",E.disabled=!0,Qe(E,"unpaid"),E.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),P&&(P.disabled=!0,P.classList.add("disabled")),k&&(k.value="",k.disabled=!0,k.classList.add("disabled"))):(C&&(C.disabled=!1,C.classList.remove("disabled"),C.title=""),B&&(B.disabled=!1,B.classList.remove("disabled"),B.title=""),E&&(E.disabled=!1,E.title=""),P&&(P.disabled=!1,P.classList.remove("disabled")),k&&(k.disabled=!1,k.classList.remove("disabled")));const Y=x?!1:C?.checked||!1,U=!!B?.checked;if(!x&&U!==Y){w(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let F=U?dn():null;U&&(!Number.isFinite(F)||F<=0)&&(et(),F=dn());const D=U&&Y&&Number.isFinite(F)&&F>0;Y&&et();const R=Ts(v,L,W,Y,_,{start:m,end:p,companySharePercent:D?F:0}),M=bc(),G=Ls({totalAmount:R,progressType:H,progressValue:$,history:[]});k&&br(k,G.paymentProgressValue);const se=[];G.paymentProgressValue!=null&&G.paymentProgressValue>0&&se.push({type:G.paymentProgressType||H,value:G.paymentProgressValue,amount:G.paidAmount,percentage:G.paidPercent,recordedAt:new Date().toISOString()});const te=js({manualStatus:I,paidAmount:G.paidAmount,paidPercent:G.paidPercent,totalAmount:R});E&&(E.value=te,Qe(E,te));const de=Qi({reservationCode:M,customerId:c,start:m,end:p,status:X?"confirmed":"pending",title:null,location:null,notes:S,projectId:l||null,totalAmount:R,discount:x?0:L,discountType:x?"percent":W,applyTax:Y,paidStatus:x?"unpaid":te,confirmed:X,items:v.map(O=>({...O,equipmentId:O.equipmentId??O.id})),crewAssignments:_,companySharePercent:x||!D?null:F,companyShareEnabled:x?!1:D,paidAmount:x?0:G.paidAmount,paidPercentage:x?0:G.paidPercent,paymentProgressType:x?null:G.paymentProgressType,paymentProgressValue:x?null:G.paymentProgressValue,paymentHistory:x?[]:se});try{gi("about to submit",{crewAssignments:_,techniciansPayload:de?.technicians,payload:de});const O=await xc(de);gi("server response",{reservation:O?.id??O?.reservationId??O?.reservation_code,technicians:O?.technicians,crewAssignments:O?.crewAssignments,techniciansDetails:O?.techniciansDetails}),Fn(),Pt(),Bn(),Hl(),w(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof is=="function"&&is({type:"created",reservation:O}),Ml(O)}catch(O){console.error("❌ [reservations/createForm] Failed to create reservation",O);const re=Sa(O)?O.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");w(re,"error"),x&&(w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),In({clearValue:!1}))}}function Ml(e){if(!Yn)return;const{draftStorageKey:t=lr,returnUrl:n=dr}=Yn,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}Yn=null,n&&(window.location.href=n)}function In({clearValue:e=!1}={}){const{input:t,hidden:n}=Jt();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,$t())}function zl(e,t=""){const{input:n,hidden:a}=Jt();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),$t())}function Hl(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),ht({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),In({clearValue:!1}),un({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",Qe(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),Ic(),Ui([]),sa("form-reset"),St(),$t(),ue()}function Ol(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){Nl(s);return}if(a==="increase-group"&&s){Dl(s);return}if(a==="remove-group"&&s){Bl(s);return}}),e.dataset.listenerAttached="true")}function Vl(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(na()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,wr(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||na()!=="single")return;const{start:r,end:i}=Yt();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function Ul(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Ai()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Ai()}),t.dataset.listenerAttached="true")}function om({onAfterSubmit:e}={}){is=typeof e=="function"?e:null;const{customers:t,projects:n}=ye();wc(t||[]),ht(),Qs(),hr(n||[]),qr({projectsList:n}),Ks(),Pt(),Ca(),Pl(),Ar(),kr(),Rl(),Fl(),Ol(),Vl(),Ul(),Il(),ue(),St()}function $r(){Pt(),Ca(),qr(),ht(),Qs(),Ks(),Ar(),kr(),St(),ue()}if(typeof document<"u"){const e=()=>{ht(),un({projectsList:Vs()}),Qs(),Ks(),ue()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{Pt()}),document.addEventListener("packages:changed",()=>{Ca(),na()==="package"&&ms("package")})}typeof window<"u"&&(window.getCompanySharePercent=dn);function Pr(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:Ft(t),endDate:Ft(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:Ft(n),endDate:Ft(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Ft(n),endDate:Ft(a)}}return e==="upcoming"?{startDate:Ft(t),endDate:""}:{startDate:"",endDate:""}}function Kl(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=h(t?.value||"").trim(),i=h(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),ma(t),ma(n),r="",i=""),!r&&!i&&c){const d=Pr(c);r=d.startDate,i=d.endDate}return{searchTerm:He(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function cm(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{Ql(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),ma(a),ma(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function Ql(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=Pr(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function Ft(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function ma(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function Gn(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function Gl(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function Wl(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=Gl(n);if(a!==null)return a}return null}function xi(e,t=0){const n=Wl(e);if(n!=null)return n;const a=Gn(e.createdAt??e.created_at);if(a!=null)return a;const s=Gn(e.updatedAt??e.updated_at);if(s!=null)return s;const r=Gn(e.start);if(r!=null)return r;const i=Gn(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function Xl({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((v,S)=>({reservation:v,index:S})),i=t.searchTerm||"",c=t.searchReservationId||"",l=t.searchCustomerName||"",d=t.searchProjectId||"",u=t.startDate||"",y=t.endDate||"",f=t.status||"",m=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,p=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,q=y?new Date(`${y}T23:59:59`):null,_=r.filter(({reservation:v})=>{const S=n.get(String(v.customerId)),L=s?.get?.(String(v.projectId)),W=v.start?new Date(v.start):null,E=Ns(v),{effectiveConfirmed:I}=Ct(v,L);if(m!=null&&String(v.customerId)!==String(m)||p!=null&&!(Array.isArray(v.technicians)?v.technicians.map(N=>String(N)):[]).includes(String(p))||f==="confirmed"&&!I||f==="pending"&&I||f==="completed"&&!E||g&&W&&W<g||q&&W&&W>q)return!1;if(c){const $=[v.reservationId,v.id,v.reservation_id,v.reservationCode,v.reservation_code,v.code,v.reference,v.referenceNumber,v.reference_number],N=He($.filter(C=>C!=null&&C!=="").map(String).join(" ")).replace(/\s+/g,""),X=c.replace(/\s+/g,"");if(!N.includes(X))return!1}if(l&&!He(S?.customerName||"").includes(l))return!1;if(d){const $=[v.projectId,v.project_id,v.projectID,L?.id,L?.projectCode,L?.project_code],N=He($.filter(C=>C!=null&&C!=="").map(String).join(" ")).replace(/\s+/g,""),X=d.replace(/\s+/g,"");if(!N.includes(X))return!1}if(!i)return!0;const P=v.items?.map?.($=>`${$.barcode} ${$.desc}`).join(" ")||"",k=(v.technicians||[]).map($=>a.get(String($))?.name).filter(Boolean).join(" ");return He([v.reservationId,S?.customerName,v.notes,P,k,L?.title].filter(Boolean).join(" ")).includes(i)});return _.sort((v,S)=>{const L=xi(v.reservation,v.index),W=xi(S.reservation,S.index);return L!==W?W-L:S.index-v.index}),_}function Jl({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),l=o("reservations.list.itemsCountShort","{count} عنصر"),d=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),y=o("reservations.list.status.pending","⏳ غير مؤكد"),f=o("reservations.list.payment.paid","💳 مدفوع"),m=o("reservations.list.payment.unpaid","💳 غير مدفوع"),p=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),g=o("reservations.list.actions.confirm","✔️ تأكيد"),q=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),_=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),v={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:S,index:L})=>{const W=t.get(String(S.customerId)),E=S.projectId?a?.get?.(String(S.projectId)):null,I=Ns(S),P=S.paidStatus??S.paid_status??(S.paid===!0||S.paid==="paid"?"paid":"unpaid"),k=P==="paid",H=P==="partial",{effectiveConfirmed:$,projectLinked:N}=Ct(S,E),X=$?"status-confirmed":"status-pending",C=k?"status-paid":H?"status-partial":"status-unpaid";let B=`<span class="reservation-chip status-chip ${X}">${$?u:y}</span>`;const x=k?f:H?p:m;let Y=`<span class="reservation-chip status-chip ${C}">${x}</span>`,U=k?" tile-paid":H?" tile-partial":" tile-unpaid";I&&(U+=" tile-completed");let F="";I&&(B=`<span class="reservation-chip status-chip status-completed">${u}</span>`,Y=`<span class="reservation-chip status-chip status-completed">${x}</span>`,F=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const D=!N&&!$?`<button class="tile-confirm" data-reservation-index="${L}" data-action="confirm">${g}</button>`:"",R=D?`<div class="tile-actions">${D}</div>`:"",M=S.items?.length||0,G=Array.isArray(S.crewAssignments)?S.crewAssignments:[],se=(S.technicians||[]).map(ne=>n.get(String(ne))).filter(Boolean),te=G.length?G.map(ne=>{const Q=ne.positionLabel??ne.position_name??ne.role??o("reservations.crew.positionFallback","منصب بدون اسم"),be=ne.technicianName??n.get(String(ne.technicianId??""))?.name??null;return be?`${h(Q)} (${h(be)})`:h(Q)}):se.map(ne=>ne.name),de=te.length?te.join(d):"—",O=h(String(S.reservationId??"")),re=S.start?h(Ge(S.start)):"-",Se=S.end?h(Ge(S.end)):"-",Ee=h(String(S.cost??0)),Ce=h(String(M)),K=S.notes?h(S.notes):c,Z=l.replace("{count}",Ce),ae=S.applyTax?`<small>${r}</small>`:"";let we=q;return S.projectId&&(we=E?.title?h(E.title):_),`
      <div class="${D?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${U}"${F} data-reservation-index="${L}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${O}</div>
          <div class="tile-badges">
            ${B}
            ${Y}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${v.client}</span>
            <span class="tile-value">${W?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.project}</span>
            <span class="tile-value">${we}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.start}</span>
            <span class="tile-value tile-inline">${re}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.end}</span>
            <span class="tile-value tile-inline">${Se}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.cost}</span>
            <span class="tile-value">${Ee} ${s} ${ae}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.equipment}</span>
            <span class="tile-value">${Z}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.crew}</span>
            <span class="tile-value">${te.length?de:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${K}</span>
          </div>
        </div>
        ${R}
      </div>
    `}).join("")}function ze(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Wa(e){if(e==null)return"";const t=String(e).trim();return t?h(t):""}function Yl(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=Ct(e,s),c=e.paid===!0||e.paid==="paid",l=Ns(e),d=e.items||[],{groups:u}=Xi(e),{technicians:y=[]}=ye(),f=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(y)?y:[]),m=new Map;f.forEach(b=>{if(!b||b.id==null)return;const V=String(b.id),ce=m.get(V)||{};m.set(V,{...ce,...b})});const g=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(b=>({technicianId:b}))).map((b,V)=>{const ce=b?.technicianId!=null?m.get(String(b.technicianId)):null;let he=b.positionLabel??b.position_name??b.position_label??b.role??b.position??o("reservations.crew.positionFallback","منصب بدون اسم");(!he||he.trim()==="")&&(he=b.positionLabelAr??b.position_label_ar??b.positionLabelEn??b.position_label_en??b.position_name_ar??b.position_name_en??o("reservations.crew.positionFallback","منصب بدون اسم"));const Ae=b.positionLabelAlt??b.position_label_alt??b.positionLabelEn??b.position_label_en??b.positionLabelAr??b.position_label_ar??"",Ue=ve(Te(b.positionCost??b.position_cost??b.cost??b.daily_wage??b.dailyWage??ce?.dailyWage??ce?.wage??0)),Je=ve(Te(b.positionClientPrice??b.position_client_price??b.client_price??b.clientPrice??b.daily_total??b.dailyTotal??b.total??ce?.dailyTotal??ce?.total??ce?.total_wage??0));return{assignmentId:b.assignmentId??b.assignment_id??`crew-${V}`,positionId:b.positionId??b.position_id??null,positionLabel:he,positionLabelAlt:Ae,positionLabelAr:b.positionLabelAr??b.position_label_ar??null,positionLabelEn:b.positionLabelEn??b.position_label_en??null,positionCost:Ue,positionClientPrice:Je,technicianId:b.technicianId!=null?String(b.technicianId):ce?.id!=null?String(ce.id):null,technicianName:b.technicianName??b.technician_name??ce?.name??null,technicianRole:b.technicianRole??ce?.role??null,technicianPhone:b.technicianPhone??ce?.phone??null,notes:b.notes??null}}),q=Gt(),_=Ea(e.start,e.end),v=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,S=Te(v),L=Number.isFinite(S)?S:0,W=e.discountType??e.discount_type??e.discountMode??"percent",E=String(W).toLowerCase()==="amount"?"amount":"percent",I=r?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),P=Te(e.cost??e.total??e.finalTotal),k=Number.isFinite(P),H=k?ve(P):0,$=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,N=$!=null?Te($):Number.NaN;let B=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(N)&&N>0)&&Number.isFinite(N)?N:0;I&&B<=0&&(B=_t);const x=Ji({items:d,technicianIds:e.technicians||[],crewAssignments:g,discount:L,discountType:E,applyTax:I,start:e.start,end:e.end,companySharePercent:B}),Y=ve(x.equipmentTotal),U=ve(x.crewTotal);ve(x.crewCostTotal);const F=ve(x.discountAmount),D=ve(x.subtotalAfterDiscount),R=Number.isFinite(x.companySharePercent)?x.companySharePercent:0;let M=ve(x.companyShareAmount);M=R>0?ve(Math.max(0,M)):0;const G=ve(x.taxAmount),se=ve(x.finalTotal),te=r?se:k?H:se,de=ve(x.netProfit),O=h(String(e.reservationId??e.id??"")),re=e.start?h(Ge(e.start)):"-",Se=e.end?h(Ge(e.end)):"-",Ee=h(String(g.length)),Ce=h(Y.toFixed(2)),K=h(F.toFixed(2)),Z=h(D.toFixed(2)),ae=h(G.toFixed(2)),we=h((Number.isFinite(te)?te:0).toFixed(2)),Re=h(String(_)),ne=o("reservations.create.summary.currency","SR"),Q=o("reservations.details.labels.discount","الخصم"),be=o("reservations.details.labels.tax","الضريبة (15%)"),T=o("reservations.details.labels.crewTotal","إجمالي الفريق"),ie=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),fe=o("reservations.details.labels.duration","عدد الأيام"),ge=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),me=o("reservations.details.labels.netProfit","💵 صافي الربح"),Ve=o("reservations.create.equipment.imageAlt","صورة"),ke={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},Me=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),tt=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");o("reservations.details.technicians.roleUnknown","غير محدد");const Et=o("reservations.details.technicians.phoneUnknown","غير متوفر");o("reservations.details.technicians.wage","{amount} {currency} / اليوم");const hn=o("reservations.list.status.confirmed","✅ مؤكد"),en=o("reservations.list.status.pending","⏳ غير مؤكد"),Ra=o("reservations.list.payment.paid","💳 مدفوع"),z=o("reservations.list.payment.unpaid","💳 غير مدفوع"),_e=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),nt=o("reservations.list.status.completed","📁 منتهي"),pt=o("reservations.details.labels.id","🆔 رقم الحجز"),zn=o("reservations.details.section.bookingInfo","بيانات الحجز"),Hn=o("reservations.details.section.paymentSummary","ملخص الدفع"),Ma=o("reservations.details.labels.finalTotal","المجموع النهائي"),On=o("reservations.details.section.crew","😎 الفريق الفني"),za=o("reservations.details.crew.count","{count} عضو"),tn=o("reservations.details.section.items","📦 المعدات المرتبطة"),nn=o("reservations.details.items.count","{count} عنصر"),Po=o("reservations.details.actions.edit","✏️ تعديل"),Co=o("reservations.details.actions.delete","🗑️ حذف"),To=o("reservations.details.labels.customer","العميل"),Lo=o("reservations.details.labels.contact","رقم التواصل"),jo=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const No=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Bo=o("reservations.details.actions.openProject","📁 فتح المشروع"),Do=o("reservations.details.labels.start","بداية الحجز"),Fo=o("reservations.details.labels.end","نهاية الحجز"),Ro=o("reservations.details.labels.notes","ملاحظات"),Mo=o("reservations.list.noNotes","لا توجد ملاحظات"),zo=o("reservations.details.labels.itemsCount","عدد المعدات"),Ho=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),Oo=o("reservations.paymentHistory.title","سجل الدفعات"),Vo=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Uo=o("reservations.list.unknownCustomer","غير معروف"),Ha=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),ci=Ha==="partial",Ko=Ha==="paid"?Ra:ci?_e:z;function Oa(b){if(b==null)return Number.NaN;if(typeof b=="number")return Number.isFinite(b)?b:Number.NaN;const V=String(b).replace(/[^0-9.+-]/g,""),ce=Number(V);return Number.isFinite(ce)?ce:Number.NaN}const Vn=(b={})=>{const V=String(b.type??b.kind??b.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(V)||Array.isArray(b.packageItems)&&b.packageItems.length)},Qo=(b={})=>[b.packageId,b.package_id,b.packageCode,b.package_code,b.bundleId,b.bundle_id].some(V=>V!=null&&V!==""),Go=(b={})=>!b||typeof b!="object"?!1:!Vn(b)&&Qo(b),li=(b={})=>{const V=Vn(b),ce=[{value:b.qty,key:"qty",limit:999},{value:b.quantity,key:"quantity",limit:999},{value:b.units,key:"units",limit:999},{value:b.count,key:"count",limit:50},{value:b.package_quantity,key:"package_quantity",limit:999},{value:b.packageQty,key:"packageQty",limit:999},{value:b.packageCount,key:"packageCount",limit:999}];let he=NaN;for(const Ae of ce){if(Ae.value==null||Ae.value==="")continue;const Ue=typeof Ae.value=="string"?Ae.value.trim():String(Ae.value??"");if(Ae.key==="count"&&Ue.length>6)continue;const Je=Oa(Ae.value);if(!Number.isFinite(Je)||Je<=0)continue;const Le=Math.round(Je);if(!(Le>Ae.limit)){he=Math.max(1,Le);break}}return(!Number.isFinite(he)||he<=0)&&(he=1),V?Math.max(1,Math.min(99,he)):Math.max(1,Math.min(9999,he))};let je=(Array.isArray(d)?d:[]).reduce((b,V)=>!V||typeof V!="object"||Go(V)?b:b+li(V),0);je<=0&&Array.isArray(u)&&u.length&&(je=u.reduce((b,V)=>{const ce=li({...V,type:V.type});return b+ce},0)),!Number.isFinite(je)||je<=0?je=Array.isArray(u)&&u.length?u.length:(Array.isArray(d)?d.length:0)||1:je>1e6&&(je=Math.min(je,Array.isArray(u)?u.length:je),(!Number.isFinite(je)||je<=0)&&(je=(Array.isArray(d)?d.length:0)||1)),je=Math.max(1,Math.round(je));const Wo=h(String(je)),di=nn.replace("{count}",Wo),Xo=za.replace("{count}",Ee),Jo=e.notes?h(e.notes):Mo,Yo=h(U.toFixed(2)),Zo=h(String(R)),ec=h(M.toFixed(2)),tc=`${Zo}% (${ec} ${ne})`,nc=Number.isFinite(de)?Math.max(0,de):0,ac=h(nc.toFixed(2)),wt=[{icon:"💼",label:Ho,value:`${Ce} ${ne}`}];wt.push({icon:"😎",label:T,value:`${Yo} ${ne}`}),F>0&&wt.push({icon:"💸",label:Q,value:`${K} ${ne}`}),wt.push({icon:"📊",label:ie,value:`${Z} ${ne}`}),I&&G>0&&wt.push({icon:"🧾",label:be,value:`${ae} ${ne}`}),R>0&&wt.push({icon:"🏦",label:ge,value:tc}),wt.push({icon:"💵",label:me,value:`${ac} ${ne}`}),wt.push({icon:"💰",label:Ma,value:`${we} ${ne}`});const sc=wt.map(({icon:b,label:V,value:ce})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${b} ${V}</span>
      <span class="summary-details-value">${ce}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let vn=[];Array.isArray(e.paymentHistory)?vn=e.paymentHistory:Array.isArray(e.payment_history)&&(vn=e.payment_history);const ic=Array.isArray(e.paymentLogs)?e.paymentLogs:[],ui=Array.isArray(vn)&&vn.length>0?vn:ic,rc=ui.length?`<ul class="reservation-payment-history-list">${ui.map(b=>{const V=b?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):b?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),ce=Number.isFinite(Number(b?.amount))&&Number(b.amount)>0?`${h(Number(b.amount).toFixed(2))} ${ne}`:"—",he=Number.isFinite(Number(b?.percentage))&&Number(b.percentage)>0?`${h(Number(b.percentage).toFixed(2))}%`:"—",Ae=b?.recordedAt?h(Ge(b.recordedAt)):"—",Ue=b?.note?`<div class="payment-history-note">${ze(h(b.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${ze(V)}</span>
              <span class="payment-history-entry__amount">${ce}</span>
              <span class="payment-history-entry__percent">${he}</span>
              <span class="payment-history-entry__date">${Ae}</span>
            </div>
            ${Ue}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${ze(Vo)}</div>`,mi=[{text:i?hn:en,className:i?"status-confirmed":"status-pending"},{text:Ko,className:Ha==="paid"?"status-paid":ci?"status-partial":"status-unpaid"}];l&&mi.push({text:nt,className:"status-completed"});const oc=mi.map(({text:b,className:V})=>`<span class="status-chip ${V}">${b}</span>`).join(""),Nt=(b,V,ce)=>`
    <div class="res-info-row">
      <span class="label">${b} ${V}</span>
      <span class="value">${ce}</span>
    </div>
  `;let Va="";if(e.projectId){let b=ze(No);if(s){const V=s.title||o("projects.fallback.untitled","مشروع بدون اسم");b=`${ze(V)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${ze(Bo)}</button>`}Va=`
      <div class="res-info-row">
        <span class="label">📁 ${jo}</span>
        <span class="value">${b}</span>
      </div>
    `}const ft=[];ft.push(Nt("👤",To,t?.customerName||Uo)),ft.push(Nt("📞",Lo,t?.phone||"—")),ft.push(Nt("🗓️",Do,re)),ft.push(Nt("🗓️",Fo,Se)),ft.push(Nt("📦",zo,di)),ft.push(Nt("⏱️",fe,Re)),ft.push(Nt("📝",Ro,Jo)),Va&&ft.push(Va);const cc=ft.join(""),lc=u.length?u.map(b=>{const V=b.items[0]||{},ce=Xt(V)||b.image,he=ce?`<img src="${ce}" alt="${Ve}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',Ae=[];Array.isArray(b.packageItems)&&b.packageItems.length&&Ae.push(...b.packageItems),b.items.forEach(pe=>{Array.isArray(pe?.packageItems)&&pe.packageItems.length&&Ae.push(...pe.packageItems)});const Ue=Vn(b)||b.items.some(pe=>Vn(pe))||Ae.length>0,Je=(pe,{fallback:st=1,max:le=1e3}={})=>{const qe=Oa(pe);return Number.isFinite(qe)&&qe>0?Math.min(le,qe):st};let Le;if(Ue){const pe=Je(V?.qty??V?.quantity??V?.count,{fallback:NaN,max:999});Number.isFinite(pe)&&pe>0?Le=pe:Le=Je(b.quantity??b.count??1,{fallback:1,max:999})}else Le=Je(b.quantity??b.count??V?.qty??V?.quantity??V?.count??0,{fallback:1,max:9999});const Un=h(String(Le)),At=(pe,{preferPositive:st=!1}={})=>{let le=Number.NaN;for(const qe of pe){const it=Te(qe);if(Number.isFinite(it)){if(st&&it>0)return it;Number.isFinite(le)||(le=it)}}return le};let xe,Ne;if(Ue){const pe=[V?.price,V?.unit_price,V?.unitPrice,b.unitPrice];if(xe=At(pe,{preferPositive:!0}),!Number.isFinite(xe)||xe<0){const le=Te(b.totalPrice??V?.total??V?.total_price);Number.isFinite(le)&&Le>0&&(xe=le/Le)}Number.isFinite(xe)||(xe=0);const st=[V?.total,V?.total_price,b.totalPrice];if(Ne=At(st),!Number.isFinite(Ne))Ne=xe*Le;else{const le=xe*Le;Number.isFinite(le)&&le>0&&Math.abs(Ne-le)>le*.25&&(Ne=le)}}else{const pe=[V?.price,V?.unit_price,V?.unitPrice,b.unitPrice];if(xe=At(pe,{preferPositive:!0}),!Number.isFinite(xe)||xe<0){const st=Te(b.totalPrice??V?.total??V?.total_price);Number.isFinite(st)&&Le>0&&(xe=st/Le)}Number.isFinite(xe)||(xe=0),Ne=Te(b.totalPrice??V?.total??V?.total_price),Number.isFinite(Ne)||(Ne=xe*Le)}xe=ve(xe),Ne=ve(Ne);const yt=`${h(xe.toFixed(2))} ${ne}`,Bt=`${h(Ne.toFixed(2))} ${ne}`,an=b.barcodes.map(pe=>h(String(pe||""))).filter(Boolean),Ye=an.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${an.map(pe=>`<li>${pe}</li>`).join("")}
              </ul>
            </details>`:"";let at="";if(Ae.length){const pe=new Map,st=le=>{const qe=Oa(le?.qtyPerPackage??le?.perPackageQty??le?.quantityPerPackage);return Number.isFinite(qe)&&qe>0&&qe<=99?Math.round(qe):1};if(Ae.forEach(le=>{if(!le)return;const qe=ee(le.barcode||le.normalizedBarcode||le.desc||Math.random());if(!qe)return;const it=pe.get(qe),sn=st(le);if(it){it.qty=sn,it.total=sn;return}pe.set(qe,{desc:le.desc||le.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(sn,99)),total:Math.max(1,Math.min(sn,99)),barcode:le.barcode??le.normalizedBarcode??""})}),pe.size){const le=Array.from(pe.values()).map(qe=>{const it=h(String(qe.qty>0?Math.min(qe.qty,99):1)),sn=ze(qe.desc||""),fc=qe.barcode?` <span class="reservation-package-items__barcode">(${ze(h(String(qe.barcode)))})</span>`:"";return`<li>${sn}${fc} × ${it}</li>`}).join("");at=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${le}
                </ul>
              </details>
            `}}const pc=Ue?`${at||""}${Ye||""}`:Ye;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${he}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${ze(V.desc||V.description||V.name||b.description||"-")}</div>
                  ${pc}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${ze(ke.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Un}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${ze(ke.unitPrice)}">${yt}</td>
            <td class="reservation-modal-items-table__cell" data-label="${ze(ke.total)}">${Bt}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${ze(ke.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${Me}</td></tr>`,dc=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${ke.item}</th>
            <th>${ke.quantity}</th>
            <th>${ke.unitPrice}</th>
            <th>${ke.total}</th>
            <th>${ke.actions}</th>
          </tr>
        </thead>
        <tbody>${lc}</tbody>
      </table>
    </div>
  `,uc=g.map((b,V)=>{const ce=h(String(V+1));let he=b.positionLabel??b.position_name??b.position_label??b.position_title??b.role??b.position??null;if((!he||he.trim()==="")&&(he=b.positionLabelAr??b.position_label_ar??b.position_title_ar??b.positionLabelEn??b.position_label_en??b.position_name_ar??b.position_title_en??b.position_name_en??null),!he||he.trim()==="")try{const yt=typeof Kn=="function"?Kn():[],Bt=b.positionId?yt.find(at=>String(at.id)===String(b.positionId)):null,an=!Bt&&b.positionKey?yt.find(at=>String(at.name).toLowerCase()===String(b.positionKey).toLowerCase()):null,Ye=Bt||an||null;Ye&&(he=Ye.labelAr||Ye.labelEn||Ye.name||he)}catch{}const Ae=Wa(he)||o("reservations.crew.positionFallback","منصب بدون اسم"),Ue=Wa(b.positionLabelAlt??b.position_label_alt??b.positionLabelEn??b.position_label_en??b.positionLabelAr??b.position_label_ar??b.position_name_en??b.position_name_ar??""),Je=Wa(b.technicianName)||o("technicians.picker.noTechnicianOption","— بدون تعيين —"),Le=b.technicianPhone||Et,Un=ve(Te(b.positionCost??b.position_cost??b.cost??b.daily_wage??b.dailyWage??b.internal_cost??0));let At=ve(Te(b.positionClientPrice??b.position_client_price??b.client_price??b.customer_price??b.position_price??b.clientPrice??b.daily_total??b.dailyTotal??b.total??0));if(!Number.isFinite(At)||At<=0)try{const yt=Kn?Kn():[],Bt=b.positionId?yt.find(at=>String(at.id)===String(b.positionId)):null,an=!Bt&&b.positionKey?yt.find(at=>String(at.name).toLowerCase()===String(b.positionKey).toLowerCase()):null,Ye=Bt||an||null;Ye&&Number.isFinite(Number(Ye.clientPrice))&&(At=ve(Number(Ye.clientPrice)))}catch{}const xe=`${h(At.toFixed(2))} ${ne}`,Ne=Un>0?`${h(Un.toFixed(2))} ${ne}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${ce}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${Je}</span>
            <small class="text-muted">🏷️ ${Ae}${Ue?` — ${Ue}`:""}</small>
            <small class="text-muted">💼 ${xe}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${Le}</div>
          ${Ne?`<div>💵 ${o("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${Ne}</div>`:""}
        </div>
      </div>
    `}).join(""),mc=g.length?`<div class="reservation-technicians-grid">${uc}</div>`:`<ul class="reservation-modal-technicians"><li>${tt}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${pt}</span>
          <strong>${O}</strong>
        </div>
        <div class="status-chips">
          ${oc}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${zn}</h6>
          ${cc}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${Hn}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${sc}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Oo}</h6>
              ${rc}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${On}</span>
          <span class="count">${Xo}</span>
        </div>
        ${mc}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${tn}</span>
          <span class="count">${di}</span>
        </div>
        ${dc}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${Po}</button>
        ${q?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Co}</button>`:""}
      </div>
    </div>
  `}const lm="project",dm="editProject",um=3600*1e3,Cr=.15,mm=6,pm="projectsTab",fm="projectsSubTab",ym={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},bm={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},gm={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},Zl=`@page {
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
`,ed=/color\([^)]*\)/gi,Tn=/(color\(|color-mix\(|oklab|oklch)/i,td=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"],nd=typeof document<"u"?document.createElement("canvas"):null,Wn=nd?.getContext?.("2d")||null;function Tr(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function ps(e,t="#000"){if(!Wn||!e)return t;try{return Wn.fillStyle="#000",Wn.fillStyle=e,Wn.fillStyle||t}catch{return t}}function ad(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&Tn.test(n)){const s=ps(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function rn(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function hm(e=[]){if(!(!Array.isArray(e)||!e.length))for(let t=e.length-1;t>=0;t-=1){const{element:n,prop:a,value:s,priority:r}=e[t]||{};!n?.style||!a||(s&&s.length>0?n.style.setProperty(a,s,r||""):n.style.removeProperty(a))}}function Lr(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;td.forEach(c=>{const l=r[c];if(l&&Tn.test(l)){const d=Tr(c);rn(n,s,d);const u=c==="backgroundColor"?"#ffffff":r.color||"#000000",y=ps(l,u);s.style.setProperty(d,y,"important")}});const i=r.backgroundImage;if(i&&Tn.test(i)){const c=ps(r.backgroundColor||"#ffffff","#ffffff");rn(n,s,"background-image"),rn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function jr(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(c=>{const l=r[c];if(l&&Tn.test(l)){const d=Tr(c);rn(n,s,d);const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(d,u,"important")}});const i=r.backgroundImage;i&&Tn.test(i)&&(rn(n,s,"background-image"),rn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function Nr(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(ed,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const Br="reservations.quote.sequence",Ii={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},Dr="https://help.artratio.sa/guide/quote-preview",Pe={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},sd=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Oe=[...sd],id=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function fs(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...Oe]}function rd(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=fs(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=fs(t.value);if(a.length)return a}const n=Oe.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...Oe]}const od=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],Fr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>A(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>A(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>A(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>A(h(Number(e?.price||0).toFixed(2)))}],Rr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(h(String(t+1)))},{id:"position",labelKey:"reservations.details.crew.position",fallback:"المنصب",render:e=>A(h(e?.positionLabel??e?.position_name??e?.role??o("reservations.crew.positionFallback","منصب بدون اسم")))},{id:"price",labelKey:"reservations.details.crew.clientPrice",fallback:"سعر العميل",render:e=>{const t=Number.isFinite(Number(e?.positionClientPrice))?Number(e.positionClientPrice):0;return A(`${h(t.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}}],ys={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:Fr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:Rr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},Mr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(h(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>A(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>A(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>A(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],zr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>A(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>A(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>A(e?.note||"-")}],Hr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(h(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>A(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>A(h(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>A(h(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>A(e?.displayCost||"—")}],cd=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],ld={customerInfo:ys.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:ys.payment,projectExpenses:zr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:Mr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:Hr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},Xa=new Map;function Ta(e="reservation"){if(Xa.has(e))return Xa.get(e);const t=e==="project"?cd:od,n=e==="project"?ld:ys,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(l=>l.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return Xa.set(e,r),r}function La(e="reservation"){return Ta(e).sectionDefs}function Or(e="reservation"){return Ta(e).fieldDefs}function Vr(e="reservation"){return Ta(e).sectionIdSet}function Ur(e="reservation"){return Ta(e).fieldIdMap}function Kr(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const dd="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",ud="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",md="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",Qr=Zl.trim(),Gr=/^data:image\/svg\+xml/i,pd=/\.svg($|[?#])/i,An=512,bs="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",Wr=96,Xr=25.4,gs=210,Zn=297,ea=Math.round(gs/Xr*Wr),ta=Math.round(Zn/Xr*Wr),fd=2,Jr=/safari/i,yd=/(iphone|ipad|ipod)/i,_i=/(iphone|ipad|ipod)/i,bd=/(crios|fxios|edgios|opios)/i,pa="[reservations/pdf]";let J=null,j=null,ot=1,Sn=null,En=null,It=null,on=null,_n=!1;function Ot(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!J?.statusIndicator||!J?.statusText)return;J.statusKind=e;const r=t||Kr(e);J.statusText.textContent=r,J.statusSpinner&&(J.statusSpinner.hidden=!s),J.statusAction&&(J.statusAction.hidden=!0,J.statusAction.onclick=null,n&&typeof a=="function"&&(J.statusAction.textContent=n,J.statusAction.hidden=!1,J.statusAction.onclick=i=>{i.preventDefault(),a()})),J.statusIndicator.hidden=!1,requestAnimationFrame(()=>{J.statusIndicator.classList.add("is-visible")})}function kn(e){!J?.statusIndicator||!J?.statusText||(J.statusKind=null,J.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{J?.statusIndicator&&(J.statusIndicator.hidden=!0,J.statusAction&&(J.statusAction.hidden=!0,J.statusAction.onclick=null),J.statusSpinner&&(J.statusSpinner.hidden=!1))},220))}function hs(){return!!window?.bootstrap?.Modal}function gd(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),It||(It=document.createElement("div"),It.className="modal-backdrop fade show",It.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(It)),on||(on=t=>{t.key==="Escape"&&vs(e)},document.addEventListener("keydown",on));try{e.focus({preventScroll:!0})}catch{}}}function vs(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),It&&(It.remove(),It=null),on&&(document.removeEventListener("keydown",on),on=null))}function hd(e){if(e){if(hs()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}gd(e)}}function vd(){if(_n)return;_n=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!J?.modal?.classList.contains("show"),s=()=>{J?.modal?.classList.contains("show")&&(Ot("render"),_n=!1,Zt())};zi({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:Dr}),a&&Ot("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function ja(e="reservation"){const t={},n=Or(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function Ws(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function qd(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function Xs(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function Js(e="reservation"){return Object.fromEntries(La(e).map(({id:t})=>[t,!1]))}function Ys(e,t){return e.sectionExpansions||(e.sectionExpansions=Js(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Sd(e,t){return Ys(e,t)?.[t]!==!1}function Zs(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function Ed(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return yd.test(e)}function wd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=Jr.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Yr(){return Ed()&&wd()}function Na(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=_i.test(e)||_i.test(t),s=/Macintosh/i.test(e)&&n>1;return Jr.test(e)&&!bd.test(e)&&(a||s)}function Ja(e,...t){try{console.log(`${pa} ${e}`,...t)}catch{}}function vt(e,...t){try{console.warn(`${pa} ${e}`,...t)}catch{}}function Ad(e,t,...n){try{t?console.error(`${pa} ${e}`,t,...n):console.error(`${pa} ${e}`,...n)}catch{}}function Ie(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function xd(e,t="لا توجد بيانات للعرض."){const n=A(o(e,t));return Ie(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function fa(e,t){return Array.isArray(e)&&e.length?e:[xd(t)]}const Id=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function Zr(e=""){return Id.test(e)}function _d(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!Zr(r))return a.call(this,r,...i);let c,l=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),l=!0)}catch{}try{if(!l){const d=this.canvas;d&&d.style?.direction!=="rtl"&&(d.__artRatioOriginalDirection=d.style.direction,d.style.direction="rtl")}return a.call(this,r,...i)}finally{if(l&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!l){const d=this.canvas;d&&d.__artRatioOriginalDirection!==void 0&&(d.style.direction=d.__artRatioOriginalDirection,delete d.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function ki(e,t=An){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function kd(e){if(!e)return{width:An,height:An};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?ki(t,0):0,s=n?ki(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,l]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(l)&&l>0?l:0)}}return{width:a||An,height:s||An}}function eo(e=""){return typeof e!="string"?!1:Gr.test(e)||pd.test(e)}function $d(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Pd(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function to(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await Pd(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),l=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=l;const d=i.getContext("2d");return d.clearRect(0,0,c,l),d.drawImage(r,0,0,c,l),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function Cd(e){if(!e)return null;if(Gr.test(e))return $d(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Td(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!eo(t))return!1;const n=await Cd(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",bs),!1;const a=await to(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",bs),!1)}async function Ld(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=kd(e),s=await to(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||bs),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),l=e.getAttribute("height");return c&&i.setAttribute("width",c),l&&i.setAttribute("height",l),e.parentNode?.replaceChild(i,e),!!s}async function no(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{eo(s.getAttribute?.("src"))&&a.push(Td(s))}),n.forEach(s=>{a.push(Ld(s))}),a.length&&await Promise.allSettled(a)}function jd(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(F,D=0)=>{const R=parseFloat(F);return Number.isFinite(R)?R:D},i=r(s.paddingTop),c=r(s.paddingBottom),l=r(s.paddingRight),d=r(s.paddingLeft),u=r(s.borderRadius),y=r(s.fontSize,14),f=(()=>{const F=s.lineHeight;if(!F||F==="normal")return y*1.6;const D=r(F,y*1.6);return D>0?D:y*1.6})(),m=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(m<=0)return null;const p=Math.max(1,m-d-l),g=e.textContent||"",q=g.split(/\r?\n/),_=n.createElement("canvas"),v=_.getContext("2d");if(!v)return null;const S=s.fontStyle||"normal",L=s.fontVariant||"normal",W=s.fontWeight||"400",E=s.fontFamily||"sans-serif",I=s.fontStretch||"normal",P=F=>F.join(" "),k=[],H=F=>v.measureText(F).width;v.font=`${S} ${L} ${W} ${I} ${y}px ${E}`,q.forEach(F=>{const D=F.trim();if(D.length===0){k.push("");return}const R=D.split(/\s+/);let M=[];R.forEach((G,se)=>{const te=G.trim();if(!te)return;const de=P(M.concat(te));if(H(de)<=p||M.length===0){M.push(te);return}k.push(P(M)),M=[te]}),M.length&&k.push(P(M))}),k.length||k.push("");const $=i+c+k.length*f,N=Math.ceil(Math.max(1,m)*t),X=Math.ceil(Math.max(1,$)*t);_.width=N,_.height=X,_.style.width=`${Math.max(1,m)}px`,_.style.height=`${Math.max(1,$)}px`,v.scale(t,t);const C=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){v.save(),v.beginPath();const F=Math.max(1,m),D=Math.max(1,$),R=Math.min(u,F/2,D/2);v.moveTo(R,0),v.lineTo(F-R,0),v.quadraticCurveTo(F,0,F,R),v.lineTo(F,D-R),v.quadraticCurveTo(F,D,F-R,D),v.lineTo(R,D),v.quadraticCurveTo(0,D,0,D-R),v.lineTo(0,R),v.quadraticCurveTo(0,0,R,0),v.closePath(),v.clip()}if(v.fillStyle=C,v.fillRect(0,0,Math.max(1,m),Math.max(1,$)),v.font=`${S} ${L} ${W} ${I} ${y}px ${E}`,v.fillStyle=s.color||"#000000",v.textBaseline="top",v.textAlign="right","direction"in v)try{v.direction="rtl"}catch{}const B=Math.max(0,m-l);let x=i;k.forEach(F=>{const D=F.length?F:" ";v.fillText(D,B,x,p),x+=f});const Y=n.createElement("img");let U;try{U=_.toDataURL("image/png")}catch(F){return vt("note canvas toDataURL failed",F),null}return Y.src=U,Y.alt=g,Y.style.width=`${Math.max(1,m)}px`,Y.style.height=`${Math.max(1,$)}px`,Y.style.display="block",Y.setAttribute("data-quote-note-image","true"),{image:Y,canvas:_,totalHeight:$,width:m}}function Nd(e,{pixelRatio:t=1}={}){if(!e||!Na())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!Zr(a.textContent||""))return;let s;try{s=jd(a,{pixelRatio:t})}catch(r){vt("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function qs(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){Ad(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),l=o("reservations.quote.toast.retry","إعادة المحاولة"),d=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(Ot("export"),fo()):(Ot("render"),_n=!1,Zt())};if(zi({message:i,duration:9e3,actionLabel:d?l:void 0,onAction:d?u:void 0,linkLabel:c,linkHref:Dr}),J?.modal?.classList.contains("show")&&Ot("error",{message:i,actionLabel:d?l:void 0,onAction:d?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function Ss({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){vt("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){vt("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function ei(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function $i(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function Pi(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function Bd(){const e=Pi();return e||(En||(En=ei(ud).catch(t=>{throw En=null,t}).then(()=>{const t=Pi();if(!t)throw En=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),En)}async function Dd(){const e=$i();return e||(Sn||(Sn=ei(md).catch(t=>{throw Sn=null,t}).then(()=>{const t=$i();if(!t)throw Sn=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),Sn)}async function Fd(){if(window.html2pdf||await ei(dd),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}ad(),_d()}function A(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Rd(e="reservation"){return e==="project"?"QP":"Q"}function Md(e,t="reservation"){const n=Number(e),a=Rd(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function zd(){const e=window.localStorage?.getItem?.(Br),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function ao(e="reservation"){const n=zd()+1;return{sequence:n,quoteNumber:Md(n,e)}}function Hd(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(Br,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function so(e="reservation"){return Ii[e]||Ii.reservation}function Od(e="reservation"){try{const t=so(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function Vd(e,t="reservation"){try{const n=so(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function Ud(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function Kd(e,t="reservation"){if(!e)return null;const n=Vr(t),a=Ur(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,l])=>{const d=i[c];if(d==null)return;const{ids:u,emptyExplicitly:y}=Ud(d);if(!u&&!y)return;const f=Array.isArray(u)?u.filter(m=>l.has(m)):[];(f.length>0||y)&&(r[c]=f)}),{version:1,sections:s,fields:r}}function io(e){if(!e)return;const t=e.context||"reservation",n=Kd(e,t);n&&Vd(n,t)}function ro(e){if(!e)return;const t=e.context||"reservation",n=Od(t);if(!n)return;const a=Vr(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=Ws(e.fields||ja(t)),i=Ur(t);Object.entries(n.fields).forEach(([c,l])=>{const d=i[c];if(!d)return;const u=Array.isArray(l)?l.filter(y=>d.has(y)):[];r[c]=new Set(u)}),e.fields=r}}function oo(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function Qd(e){const t=Bn()||[],{technicians:n=[]}=ye(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(i=>{if(!i||i.id==null)return;const c=String(i.id),l=s.get(c)||{};s.set(c,{...l,...i})}),(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(i=>({technicianId:i}))).map((i,c)=>{const l=i?.technicianId!=null?s.get(String(i.technicianId)):null;let d=i.positionLabel??i.position_name??i.position_label??i.role??i.position??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم");(!d||d.trim()==="")&&(d=i.positionLabelAr??i.position_label_ar??i.positionLabelEn??i.position_label_en??i.position_name_ar??i.position_name_en??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم"));const u=ve(Te(i.positionCost??i.position_cost??i.cost??i.daily_wage??i.dailyWage??l?.dailyWage??l?.wage??0)),y=ve(Te(i.positionClientPrice??i.position_client_price??i.client_price??i.clientPrice??i.daily_total??i.dailyTotal??i.total??l?.dailyTotal??l?.total??l?.total_wage??0));return{assignmentId:i.assignmentId??i.assignment_id??`crew-${c}`,positionId:i.positionId??i.position_id??null,positionLabel:d,positionLabelAlt:i.positionLabelAlt??i.position_label_alt??"",positionCost:u,positionClientPrice:y,technicianId:i.technicianId!=null?String(i.technicianId):l?.id!=null?String(l.id):null,technicianName:i.technicianName??i.technician_name??l?.name??null,technicianRole:i.technicianRole??l?.role??null}})}function Gd(e,t,n){const{projectLinked:a}=Ct(e,n);Ea(e.start,e.end);const s=e.discount??e.discountValue??0,r=Number(h(String(s)))||0,i=e.discountType??e.discount_type??"percent",c=String(i).toLowerCase()==="amount"?"amount":"percent",l=a?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),d=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,u=d!=null?Te(d):Number.NaN,f=(e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied)===!0&&Number.isFinite(u)&&u>0?u:null,m=Array.isArray(t)?t.map(L=>L?.technicianId).filter(Boolean):[],p=Ji({items:Array.isArray(e.items)?e.items:[],technicianIds:m,crewAssignments:Array.isArray(t)?t:[],discount:r,discountType:c,applyTax:l,start:e.start,end:e.end,companySharePercent:f}),g=Te(e.cost??e.total??e.finalTotal),q=Number.isFinite(g),_=a?p.finalTotal:q?ve(g):p.finalTotal,v={equipmentTotal:p.equipmentTotal,crewTotal:p.crewTotal,crewCostTotal:p.crewCostTotal,discountAmount:p.discountAmount,subtotalAfterDiscount:p.subtotalAfterDiscount,taxableAmount:p.taxableAmount,taxAmount:p.taxAmount,finalTotal:_,companySharePercent:p.companySharePercent,companyShareAmount:p.companyShareAmount,netProfit:p.netProfit},S={equipmentTotal:h(p.equipmentTotal.toFixed(2)),crewTotal:h(p.crewTotal.toFixed(2)),discountAmount:h(p.discountAmount.toFixed(2)),subtotalAfterDiscount:h(p.subtotalAfterDiscount.toFixed(2)),taxableAmount:h(p.taxableAmount.toFixed(2)),taxAmount:h(p.taxAmount.toFixed(2)),finalTotal:h(_.toFixed(2)),companySharePercent:h((Number.isFinite(p.companySharePercent)?p.companySharePercent:0).toFixed(2)),companyShareAmount:h(p.companyShareAmount.toFixed(2)),netProfit:h(p.netProfit.toFixed(2))};return{totals:v,totalsDisplay:S,rentalDays:p.rentalDays}}function mn(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function co(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Wd(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=mn(e.amount??(n==="amount"?e.value:null)),s=mn(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=co(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function Xd(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(Wd).filter(Boolean);if(n.length>0)return n;const a=mn(e.paidPercent??e.paid_percent),s=mn(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=co(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function Jd(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function Yd(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function Zd(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function eu(e){const t=Number(e?.equipmentEstimate)||0,n=Zd(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const l=Math.max(0,a-c),d=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,y=d&&s&&u>0?u:0,f=y>0?Number((l*(y/100)).toFixed(2)):0,m=l+f;let p=s?m*Cr:0;(!Number.isFinite(p)||p<0)&&(p=0),p=Number(p.toFixed(2));let g=s?Number(e?.totalWithTax):m;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((m+p).toFixed(2))):g=m,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:l,companyShareAmount:f,subtotal:m,applyTax:s,taxAmount:p,totalWithTax:g}}function tu(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=r.length?r:Array.isArray(e.technicians)?e.technicians:[],c=Ts(t,a,s,!1,i,{start:e.start,end:e.end});if(Number.isFinite(c))return c;const l=Number(h(String(e.cost??0)));return Number.isFinite(l)?Math.round(l):0}function nu(e,t){if(!e)return"—";const n=Ge(e);return t?`${n} - ${Ge(t)}`:n}function oe(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${h(a.toFixed(s))} ${t}`}function Ci(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function au(e){if(!e?.start)return null;if(!e?.end)return 1;const t=Ea(e.start,e.end);return Number.isFinite(t)?t:1}function su(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function iu(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=ye(),i=e?.id!=null?s.find(T=>String(T.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:oe(0,t),expensesTotal:oe(0,t),reservationsTotal:oe(0,t),discountAmount:oe(0,t),taxAmount:oe(0,t),overallTotal:oe(0,t),paidAmount:oe(0,t),remainingAmount:oe(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:oe(0,t),remainingAmountDisplay:oe(0,t),paidPercentDisplay:Ci(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const l=i.clientId??i.customerId??i.client_id??i.customer_id??null,d=l!=null&&n.find(T=>String(T.id)===String(l))||null,u=d?.customerName??d?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),y=(i.clientCompany||d?.companyName||d?.company||"").trim(),f=d?.phone??d?.customerPhone??i.clientPhone??i.customerPhone??"",m=f?h(String(f).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),p=d?.email??i.clientEmail??i.customerEmail??"",g=p?String(p).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),q=i.projectCode||`PRJ-${h(String(i.id??""))}`,_=h(String(q)),v=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),S=Jd(i.type),L=i.start?Ge(i.start):"—",W=i.end?Ge(i.end):"—",E=au(i),I=E!=null?su(E):"غير محدد",P=Yd(i),k={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},H=o(`projects.status.${P}`,k[P]||P),$=i.id!=null?String(i.id):null,N=$?a.filter(T=>String(T.projectId)===$):[],C=N.map(T=>{const ie=T.reservationId||T.id||"",fe=T.status||T.state||"pending",ge=String(fe).toLowerCase(),me=o(`reservations.status.${ge}`,ge),Ve=tu(T),ke=T.start?new Date(T.start).getTime():0;return{reservationId:h(String(ie||"-")),status:ge,statusLabel:me,total:Ve,totalLabel:oe(Ve,t),dateRange:nu(T.start,T.end),startTimestamp:Number.isNaN(ke)?0:ke}}).sort((T,ie)=>ie.startTimestamp-T.startTimestamp).map(({startTimestamp:T,...ie})=>ie).reduce((T,ie)=>T+(Number(ie.total)||0),0),B=new Map;N.forEach(T=>{const ie=Array.isArray(T.items)?T.items:[],fe=Ea(T.start,T.end),ge=T.reservationId||T.id||"";ie.forEach((me,Ve)=>{if(!me)return;const ke=me.barcode||me.code||me.id||me.desc||me.description||`item-${Ve}`,Me=String(ke||`item-${Ve}`),tt=B.get(Me)||{description:me.desc||me.description||me.name||me.barcode||`#${h(String(Ve+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},Et=Number(me.qty)||1,hn=Number(me.price)||0;tt.totalQuantity+=Et,tt.reservationIds.add(String(ge));const en=hn*Et*Math.max(1,fe);Number.isFinite(en)&&(tt.totalCost+=en),B.set(Me,tt)})});const x=Array.from(B.values()).map(T=>({description:T.description,totalQuantity:T.totalQuantity,reservationsCount:T.reservationIds.size,displayCost:oe(T.totalCost,t)})),Y=new Map((r||[]).filter(Boolean).map(T=>[String(T.id),T])),U=new Map,F=T=>{if(!T)return;let ie=null;typeof T=="object"?ie=T.id??T.technicianId??T.technician_id??T.userId??T.user_id??null:(typeof T=="string"||typeof T=="number")&&(ie=T);const fe=ie!=null?String(ie):null,ge=fe&&Y.has(fe)?Y.get(fe):typeof T=="object"?T:null,me=ge?.name||ge?.full_name||ge?.fullName||ge?.displayName||(typeof T=="string"?T:null),Ve=ge?.role||ge?.title||null,ke=ge?.phone||ge?.mobile||ge?.contact||null;if(!me&&!fe)return;const Me=fe||me;U.has(Me)||U.set(Me,{id:fe,name:me||"-",role:Ve||null,phone:ke||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(T=>F(T)),N.forEach(T=>{(Array.isArray(T.crewAssignments)&&T.crewAssignments.length?T.crewAssignments:Array.isArray(T.technicians)?T.technicians.map(fe=>({technicianId:fe})):[]).forEach(fe=>F(fe))});const D=Array.from(U.values()),R=Array.isArray(i.expenses)?i.expenses.map(T=>{const ie=Number(T?.amount)||0;return{label:T?.label||T?.name||"-",amount:ie,displayAmount:oe(ie,t),note:T?.note||T?.description||""}}):[],M=eu(i),G=M.applyTax?Number(((M.subtotal+C)*Cr).toFixed(2)):0,se=Number((M.subtotal+C+G).toFixed(2)),te=Xd(i),de=mn(i.paidAmount??i.paid_amount)||0,O=mn(i.paidPercent??i.paid_percent)||0,re=Ls({totalAmount:se,paidAmount:de,paidPercent:O,history:te}),Se=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",Ee=js({manualStatus:Se,paidAmount:re.paidAmount,paidPercent:re.paidPercent,totalAmount:se}),Ce={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},K=o(`projects.paymentStatus.${Ee}`,Ce[Ee]||Ee),Z=Number(re.paidAmount||0),ae=Number(re.paidPercent||0),we=Math.max(0,Number((se-Z).toFixed(2))),Re={projectSubtotal:oe(M.subtotal,t),expensesTotal:oe(M.expensesTotal,t),reservationsTotal:oe(C,t),discountAmount:oe(M.discountAmount,t),taxAmount:oe(G,t),overallTotal:oe(se,t),paidAmount:oe(Z,t),remainingAmount:oe(we,t)},ne={status:Ee,statusLabel:K,paidAmount:Z,paidPercent:ae,remainingAmount:we,paidAmountDisplay:oe(Z,t),remainingAmountDisplay:oe(we,t),paidPercentDisplay:Ci(ae)},Q=(i.description||"").trim();return{project:i,customer:d,clientInfo:{name:u,company:y||"—",phone:m,email:g},projectInfo:{title:v,code:_,typeLabel:S,startDisplay:L,endDisplay:W,durationLabel:I,statusLabel:H},expenses:R,equipment:x,crew:D,totals:M,totalsDisplay:Re,projectTotals:{combinedTaxAmount:G,overallTotal:se,reservationsTotal:C,paidAmount:Z,paidPercent:ae,remainingAmount:we,paymentStatus:Ee},paymentSummary:ne,notes:Q,currencyLabel:t,projectStatus:P,projectStatusLabel:H,projectDurationDays:E,projectDurationLabel:I,paymentHistory:te}}function ru({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:l={},currencyLabel:d="SR",sections:u,fieldSelections:y={},quoteNumber:f,quoteDate:m,terms:p=Oe}){const g=Ws(y),q=(K,Z)=>Xs(g,K,Z),_=K=>u?.has?.(K),v=`<div class="quote-placeholder">${A(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,S=(K,Z)=>`<div class="info-plain__item">
      <span class="info-plain__label">${A(K)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${A(Z)}</span>
    </div>`,L=(K,Z,{variant:ae="inline"}={})=>ae==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${A(K)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${A(Z)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${A(K)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${A(Z)}</span>
    </span>`,W=(K,Z)=>`<div class="payment-row">
      <span class="payment-row__label">${A(K)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${A(Z)}</span>
    </div>`,E=[];q("customerInfo","customerName")&&E.push(S(o("projects.details.client","العميل"),t.name||"-")),q("customerInfo","customerCompany")&&E.push(S(o("projects.details.company","شركة العميل"),t.company||"—")),q("customerInfo","customerPhone")&&E.push(S(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),q("customerInfo","customerEmail")&&E.push(S(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const I=_("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${A(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${E.length?`<div class="info-plain">${E.join("")}</div>`:v}
      </section>`:"",P=[];q("projectInfo","projectType")&&P.push(S(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),q("projectInfo","projectTitle")&&P.push(S(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),q("projectInfo","projectCode")&&P.push(S(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),q("projectInfo","projectStart")&&P.push(S(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),q("projectInfo","projectEnd")&&P.push(S(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),q("projectInfo","projectDuration")&&P.push(S(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),q("projectInfo","projectStatus")&&P.push(S(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const k=_("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${A(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${P.length?`<div class="info-plain">${P.join("")}</div>`:v}
      </section>`:"",H=Mr.filter(K=>q("projectCrew",K.id)),$=_("projectCrew")?H.length?`<section class="quote-section quote-section--table">
            <h3>${A(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${H.map(K=>`<th>${A(K.labelKey?o(K.labelKey,K.fallback):K.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((K,Z)=>`<tr>${H.map(ae=>`<td>${ae.render(K,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(H.length,1)}" class="empty">${A(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${v}
          </section>`:"",N=[];q("financialSummary","projectSubtotal")&&N.push(L(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${oe(0,d)}`)),q("financialSummary","expensesTotal")&&N.push(L(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||oe(0,d))),q("financialSummary","reservationsTotal")&&N.push(L(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||oe(0,d))),q("financialSummary","discountAmount")&&N.push(L(o("reservations.details.labels.discount","الخصم"),i.discountAmount||oe(0,d))),q("financialSummary","taxAmount")&&N.push(L(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||oe(0,d)));const X=[];q("financialSummary","overallTotal")&&X.push(L(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||oe(0,d),{variant:"final"})),q("financialSummary","paidAmount")&&X.push(L(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||oe(0,d),{variant:"final"})),q("financialSummary","remainingAmount")&&X.push(L(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||oe(0,d),{variant:"final"}));const C=_("financialSummary")?!N.length&&!X.length?`<section class="quote-section quote-section--financial">${v}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${A(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${N.length?`<div class="totals-inline">${N.join("")}</div>`:""}
            ${X.length?`<div class="totals-final">${X.join("")}</div>`:""}
          </div>
        </section>`:"",B=zr.filter(K=>q("projectExpenses",K.id)),x=_("projectExpenses")?B.length?`<section class="quote-section quote-section--table">
            <h3>${A(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${B.map(K=>`<th>${A(K.labelKey?o(K.labelKey,K.fallback):K.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((K,Z)=>`<tr>${B.map(ae=>`<td>${ae.render(K,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(B.length,1)}" class="empty">${A(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${v}
          </section>`:"",Y=Hr.filter(K=>q("projectEquipment",K.id)),U=_("projectEquipment")?Y.length?`<section class="quote-section quote-section--table">
            <h3>${A(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Y.map(K=>`<th>${A(K.labelKey?o(K.labelKey,K.fallback):K.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${r.length?r.map((K,Z)=>`<tr>${Y.map(ae=>`<td>${ae.render(K,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Y.length,1)}" class="empty">${A(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${v}
          </section>`:"",F=(e?.description||"").trim()||"",D=_("projectNotes")?`<section class="quote-section">
        <h3>${A(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${A(F||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",R=[];q("payment","beneficiary")&&R.push(W(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Pe.beneficiaryName)),q("payment","bank")&&R.push(W(o("reservations.quote.labels.bank","اسم البنك"),Pe.bankName)),q("payment","account")&&R.push(W(o("reservations.quote.labels.account","رقم الحساب"),h(Pe.accountNumber))),q("payment","iban")&&R.push(W(o("reservations.quote.labels.iban","رقم الآيبان"),h(Pe.iban)));const M=`<section class="quote-section">
      <div class="payment-block">
        <h3>${A(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${R.length?R.join(""):v}</div>
      </div>
      <p class="quote-approval-note">${A(Pe.approvalNote)}</p>
    </section>`,G=Array.isArray(p)&&p.length?p:Oe,se=`<footer class="quote-footer">
        <h4>${A(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${G.map(K=>`<li>${A(K)}</li>`).join("")}</ul>
      </footer>`,te=[],de=[];if(k&&de.push({key:"project",html:k}),I&&de.push({key:"customer",html:I}),de.length>1){const K=de.find(we=>we.key==="project"),Z=de.find(we=>we.key==="customer"),ae=[];K?.html&&ae.push(K.html),Z?.html&&ae.push(Z.html),te.push(Ie(`<div class="quote-section-row quote-section-row--primary">${ae.join("")}</div>`,{blockType:"group"}))}else de.length===1&&te.push(Ie(de[0].html));const O=[];$&&O.push(Ie($,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),x&&O.push(Ie(x,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),U&&O.push(Ie(U,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const re=[];C&&re.push(Ie(C,{blockType:"summary"})),D&&re.push(Ie(D));const Se=[Ie(M,{blockType:"payment"}),Ie(se,{blockType:"footer"})],Ee=[...fa(te,"projects.quote.placeholder.primary"),...O,...fa(re,"projects.quote.placeholder.summary"),...Se],Ce=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${A(Pe.logoUrl)}" alt="${A(Pe.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${A(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${A(Pe.companyName)}</p>
        <p class="quote-company-cr">${A(o("reservations.quote.labels.cr","السجل التجاري"))}: ${A(Pe.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${A(o("reservations.details.labels.reservationId","رقم العرض"))}</span>
          <strong>${A(f)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${A(o("projects.quote.labels.date","التاريخ"))}</span>
          <strong>${A(m)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Qr}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Ce}
          ${Ee.join("")}
        </div>
      </div>
    </div>
  `}function lo(e){if(e?.context==="project")return ru(e);const{reservation:t,customer:n,project:a,crewAssignments:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:l,sections:d,fieldSelections:u={},quoteNumber:y,quoteDate:f,terms:m=Oe}=e,p=h(String(t?.reservationId??t?.id??"")),g=t.start?h(Ge(t.start)):"-",q=t.end?h(Ge(t.end)):"-",_=n?.customerName||n?.full_name||n?.name||"-",v=n?.phone||"-",S=n?.email||"-",L=n?.company||n?.company_name||"-",W=h(v),E=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),I=a?.code||a?.projectCode||"",P=h(String(c)),k=t?.notes||"",H=Array.isArray(m)&&m.length?m:Oe,$=Ws(u),N=(z,_e)=>Xs($,z,_e),X=z=>d?.has?.(z),C=`<div class="quote-placeholder">${A(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,B=(z,_e)=>`<div class="info-plain__item">${A(z)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${A(_e)}</strong></div>`,x=(z,_e,{variant:nt="inline"}={})=>nt==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${A(z)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${A(_e)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${A(z)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${A(_e)}</span>
    </span>`,Y=(z,_e)=>`<div class="payment-row">
      <span class="payment-row__label">${A(z)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${A(_e)}</span>
    </div>`,U=[];N("customerInfo","customerName")&&U.push(B(o("reservations.details.labels.customer","العميل"),_)),N("customerInfo","customerCompany")&&U.push(B(o("reservations.details.labels.company","الشركة"),L)),N("customerInfo","customerPhone")&&U.push(B(o("reservations.details.labels.phone","الهاتف"),W)),N("customerInfo","customerEmail")&&U.push(B(o("reservations.details.labels.email","البريد"),S));const F=X("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${A(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${U.length?`<div class="info-plain">${U.join("")}</div>`:C}
      </section>`:"",D=[];N("reservationInfo","reservationId")&&D.push(B(o("reservations.details.labels.reservationId","رقم الحجز"),p||"-")),N("reservationInfo","reservationStart")&&D.push(B(o("reservations.details.labels.start","بداية الحجز"),g)),N("reservationInfo","reservationEnd")&&D.push(B(o("reservations.details.labels.end","نهاية الحجز"),q)),N("reservationInfo","reservationDuration")&&D.push(B(o("reservations.details.labels.duration","عدد الأيام"),P));const R=X("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${A(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${D.length?`<div class="info-plain">${D.join("")}</div>`:C}
      </section>`:"",M=[];N("projectInfo","projectTitle")&&M.push(B(o("reservations.details.labels.project","المشروع"),E)),N("projectInfo","projectCode")&&M.push(B(o("reservations.details.labels.code","الرمز"),I||"-"));const G=X("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${A(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${M.length?`<div class="info-plain">${M.join("")}</div>`:C}
      </section>`:"",se=[];N("financialSummary","equipmentTotal")&&se.push(x(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${l}`)),N("financialSummary","crewTotal")&&se.push(x(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${l}`)),N("financialSummary","discountAmount")&&se.push(x(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${l}`)),N("financialSummary","taxAmount")&&se.push(x(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${l}`));const te=N("financialSummary","finalTotal"),de=[];te&&de.push(x(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${l}`,{variant:"final"}));const O=de.length?`<div class="totals-final">${de.join("")}</div>`:"",re=X("financialSummary")?!se.length&&!te?`<section class="quote-section quote-section--financial">${C}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${A(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${se.length?`<div class="totals-inline">${se.join("")}</div>`:""}
            ${O}
          </div>
        </section>`:"",{groups:Se}=Xi(t),Ee=Se.map(z=>{const _e=Number(z?.count??z?.quantity??1)||1,nt=Number(z?.unitPrice);let pt=Number.isFinite(nt)?nt:0;if(!pt||pt<=0){const nn=Number(z?.totalPrice);Number.isFinite(nn)&&_e>0&&(pt=Number((nn/_e).toFixed(2)))}Number.isFinite(pt)||(pt=0);const zn=z?.type==="package"||Array.isArray(z?.items)&&z.items.some(nn=>nn?.type==="package"),Hn=Array.isArray(z?.barcodes)&&z.barcodes.length?z.barcodes[0]:Array.isArray(z?.items)&&z.items.length?z.items[0]?.barcode:null,Ma=z?.packageDisplayCode??z?.package_code??z?.packageCode??z?.packageId??z?.package_id??z?.code??z?.barcode??(Array.isArray(z?.items)&&z.items.length?z.items[0]?.package_code??z.items[0]?.packageCode??z.items[0]?.packageId??z.items[0]?.package_id??z.items[0]?.code??z.items[0]?.barcode:null),On=zn?Ma??Hn??"":z?.barcode??Hn??"",za=On!=null?String(On):"";let tn=Number.isFinite(Number(z?.totalPrice))?Number(z.totalPrice):Number((pt*_e).toFixed(2));return tn=ve(tn),{...z,isPackage:zn,desc:z?.description,barcode:za,qty:_e,price:tn,totalPrice:tn,unitPriceValue:pt}}),Ce=Fr.filter(z=>N("items",z.id)),K=Ce.length>0,Z=K?Ce.map(z=>`<th>${A(z.labelKey?o(z.labelKey,z.fallback):z.fallback)}</th>`).join(""):"",we=Ee.length>0?Ee.map((z,_e)=>`<tr>${Ce.map(nt=>`<td>${nt.render(z,_e)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Ce.length,1)}" class="empty">${A(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,Re=X("items")?K?`<section class="quote-section quote-section--table">
            <h3>${A(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Z}</tr>
              </thead>
              <tbody>${we}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(o("reservations.details.items.title","المعدات"))}</h3>
            ${C}
          </section>`:"",ne=Rr.filter(z=>N("crew",z.id)),Q=ne.length>0,be=Q?ne.map(z=>`<th>${A(z.labelKey?o(z.labelKey,z.fallback):z.fallback)}</th>`).join(""):"",T=Array.isArray(s)?s:[],ie=T.length?T.map((z,_e)=>`<tr>${ne.map(nt=>`<td>${nt.render(z,_e)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(ne.length,1)}" class="empty">${A(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,fe=X("crew")?Q?`<section class="quote-section quote-section--table">
            <h3>${A(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${be}</tr>
              </thead>
              <tbody>${ie}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${C}
          </section>`:"",ge=X("notes")?`<section class="quote-section">
        <h3>${A(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${A(k||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",me=[];N("payment","beneficiary")&&me.push(Y(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Pe.beneficiaryName)),N("payment","bank")&&me.push(Y(o("reservations.quote.labels.bank","اسم البنك"),Pe.bankName)),N("payment","account")&&me.push(Y(o("reservations.quote.labels.account","رقم الحساب"),h(Pe.accountNumber))),N("payment","iban")&&me.push(Y(o("reservations.quote.labels.iban","رقم الآيبان"),h(Pe.iban)));const Ve=`<section class="quote-section">
      <div class="payment-block">
        <h3>${A(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${me.length?me.join(""):C}</div>
      </div>
      <p class="quote-approval-note">${A(Pe.approvalNote)}</p>
    </section>`,ke=`<footer class="quote-footer">
        <h4>${A(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${H.map(z=>`<li>${A(z)}</li>`).join("")}</ul>
      </footer>`,Me=[];F&&R?Me.push(Ie(`<div class="quote-section-row">${F}${R}</div>`,{blockType:"group"})):(R&&Me.push(Ie(R)),F&&Me.push(Ie(F))),G&&Me.push(Ie(G));const tt=[];Re&&tt.push(Ie(Re,{blockType:"table",extraAttributes:'data-table-id="items"'})),fe&&tt.push(Ie(fe,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const Et=[];re&&Et.push(Ie(re,{blockType:"summary"})),ge&&Et.push(Ie(ge));const hn=[Ie(Ve,{blockType:"payment"}),Ie(ke,{blockType:"footer"})],en=[...fa(Me,"reservations.quote.placeholder.page1"),...tt,...fa(Et,"reservations.quote.placeholder.page2"),...hn],Ra=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${A(Pe.logoUrl)}" alt="${A(Pe.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${A(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${A(Pe.companyName)}</p>
        <p class="quote-company-cr">${A(o("reservations.quote.labels.cr","السجل التجاري"))}: ${A(Pe.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${A(y)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${A(f)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Qr}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Ra}
          ${en.join("")}
        </div>
      </div>
    </div>
  `}function ou(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function Ln(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>ou(c)),i=[s,...r].map(c=>c.catch(l=>(vt("asset load failed",l),vd(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function uo(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await no(r),await Ln(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let l=null,d=null;const u=E=>{E.style.margin="0 auto",E.style.breakInside="avoid",E.style.pageBreakInside="avoid",E.style.pageBreakAfter="auto",E.style.breakAfter="auto"},y=()=>{const E=a.createElement("div"),I=s.childElementCount===0;if(E.className="quote-page",E.dataset.pageIndex=String(s.childElementCount),I){E.classList.add("quote-page--primary");const k=i.cloneNode(!0);k.removeAttribute("data-quote-header-template"),E.appendChild(k)}else E.classList.add("quote-page--continuation");const P=a.createElement("main");P.className="quote-body",E.appendChild(P),s.appendChild(E),u(E),l=E,d=P},f=()=>{(!l||!d||!d.isConnected)&&y()},m=()=>{if(!l||!d||d.childElementCount>0)return;const E=l;l=null,d=null,E.parentNode&&E.parentNode.removeChild(E)},p=()=>{l=null,d=null},g=()=>l?l.scrollHeight-l.clientHeight>fd:!1,q=(E,{allowOverflow:I=!1}={})=>(f(),d.appendChild(E),g()&&!I?(d.removeChild(E),m(),!1):!0),_=E=>{const I=E.cloneNode(!0);I.removeAttribute?.("data-quote-block"),I.removeAttribute?.("data-block-type"),I.removeAttribute?.("data-table-id"),!q(I)&&(p(),!q(I)&&q(I,{allowOverflow:!0}))},v=E=>{const I=E.querySelector("table");if(!I){_(E);return}const P=E.querySelector("h3"),k=I.querySelector("thead"),H=Array.from(I.querySelectorAll("tbody tr"));if(!H.length){_(E);return}let $=null,N=0;const X=(B=!1)=>{const x=E.cloneNode(!1);x.removeAttribute("data-quote-block"),x.removeAttribute("data-block-type"),x.removeAttribute("data-table-id"),x.classList.add("quote-section--table-fragment"),B&&x.classList.add("quote-section--table-fragment--continued");const Y=P?P.cloneNode(!0):null;Y&&x.appendChild(Y);const U=I.cloneNode(!1);U.classList.add("quote-table--fragment"),k&&U.appendChild(k.cloneNode(!0));const F=a.createElement("tbody");return U.appendChild(F),x.appendChild(U),{section:x,body:F}},C=(B=!1)=>$||($=X(B),q($.section)||(p(),q($.section)||q($.section,{allowOverflow:!0})),$);H.forEach(B=>{C(N>0);const x=B.cloneNode(!0);if($.body.appendChild(x),g()&&($.body.removeChild(x),$.body.childElementCount||(d.removeChild($.section),$=null,m()),p(),$=null,C(N>0),$.body.appendChild(x),g())){$.section.classList.add("quote-section--table-fragment--overflow"),N+=1;return}N+=1}),$=null};if(!c.length)return;c.forEach(E=>{E.getAttribute("data-block-type")==="table"?v(E):_(E)});const S=Array.from(s.children),L=[];if(S.forEach((E,I)=>{const P=E.querySelector(".quote-body");if(I!==0&&(!P||P.childElementCount===0)){E.remove();return}L.push(E)}),!n){const E=a.defaultView||window,I=Math.min(3,Math.max(1,E.devicePixelRatio||1)),P=Na()?Math.min(2,I):I;L.forEach(k=>Nd(k,{pixelRatio:P}))}L.forEach((E,I)=>{const P=I===0;E.style.pageBreakAfter="auto",E.style.breakAfter="auto",E.style.pageBreakBefore=P?"auto":"always",E.style.breakBefore=P?"auto":"page",n?E.style.boxShadow="":E.style.boxShadow="none"});const W=L[L.length-1]||null;l=W,d=W?.querySelector(".quote-body")||null,await Ln(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function ti(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function cu(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([Dd(),Bd()]),c=e.ownerDocument||document,l=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,l,c?.documentElement?.getAttribute?.("dir")].some(E=>typeof E=="string"&&E.toLowerCase().startsWith("rtl")),y=typeof window<"u"&&window.devicePixelRatio||1,f=Zs(),m=Yr(),p=Na();let g;p?g=1.5:m?g=Math.min(1.7,Math.max(1.2,y*1.1)):f?g=Math.min(1.8,Math.max(1.25,y*1.2)):g=Math.min(2,Math.max(1.6,y*1.4));const q=p||m?.9:f?.92:.95,_=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),v={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let S=0;const L=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let E=0;E<s.length;E+=1){const I=s[E];await no(I),await Ln(I);const P=I.ownerDocument||document,k=P.createElement("div");Object.assign(k.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const H=I.cloneNode(!0);H.style.width=`${ea}px`,H.style.maxWidth=`${ea}px`,H.style.minWidth=`${ea}px`,H.style.height=`${ta}px`,H.style.maxHeight=`${ta}px`,H.style.minHeight=`${ta}px`,H.style.position="relative",H.style.background="#ffffff",ti(H),k.appendChild(H),P.body.appendChild(k);let $;try{await Ln(H),$=await i(H,{...v,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(F){throw qs(F,"pageCapture",{toastMessage:L}),F}finally{k.parentNode?.removeChild(k)}if(!$)continue;const N=$.width||1,C=($.height||1)/N;let B=gs,x=B*C,Y=0;if(x>Zn){const F=Zn/x;x=Zn,B=B*F,Y=Math.max(0,(gs-B)/2)}const U=$.toDataURL("image/jpeg",q);S>0&&_.addPage(),_.addImage(U,"JPEG",Y,0,B,x,`page-${S+1}`,"FAST"),S+=1,await new Promise(F=>window.requestAnimationFrame(F))}}catch(E){throw Ss({safariWindowRef:n,mobileWindowRef:a}),E}if(S===0)throw Ss({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(m||p){const E=_.output("blob");if(p){const I=URL.createObjectURL(E);kn();try{window.location.assign(I)}catch(P){vt("mobile safari blob navigation failed",P)}finally{setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{const I=URL.createObjectURL(E),P=()=>m&&n&&!n.closed?n:a&&!a.closed?a:null,k=($,N)=>{if(kn(),!$){window.location.assign(N);return}try{$.location.replace(N),$.focus?.()}catch(X){vt("direct blob navigation failed",X);try{$.document.open(),$.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${A(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${N}" title="PDF preview"></iframe></body></html>`),$.document.close()}catch(C){vt("iframe blob delivery failed",C),window.location.assign(N)}}},H=P();k(H,I),setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{kn();const E=_.output("bloburl"),I=document.createElement("a");I.href=E,I.download=t,I.rel="noopener",I.style.display="none",document.body.appendChild(I),I.click(),setTimeout(()=>{URL.revokeObjectURL(E),I.remove()},2e3)}}function Zt(){if(!j||!J)return;const{previewFrame:e}=J;if(!e)return;const t=j.context||"reservation",n=lo({context:t,reservation:j.reservation,customer:j.customer,project:j.project,crewAssignments:j.crewAssignments,totals:j.totals,totalsDisplay:j.totalsDisplay,rentalDays:j.rentalDays,currencyLabel:j.currencyLabel,sections:j.sections,fieldSelections:j.fields,quoteNumber:j.quoteNumber,quoteDate:j.quoteDateLabel,terms:j.terms,projectCrew:j.projectCrew,projectExpenses:j.projectExpenses,projectEquipment:j.projectEquipment,projectInfo:j.projectInfo,clientInfo:j.clientInfo,paymentSummary:j.paymentSummary,projectTotals:j.projectTotals});Ot("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&(Nr(r),Lr(r,s),jr(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await uo(i,{context:"preview"}),ti(i))}catch(m){console.error("[reservations/pdf] failed to layout preview document",m)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),l=a?.querySelector(".quote-preview-pages"),d=ea;let u=18;if(l&&a?.defaultView){const m=a.defaultView.getComputedStyle(l),p=parseFloat(m.rowGap||m.gap||`${u}`);Number.isFinite(p)&&p>=0&&(u=p)}const y=ta,f=c.length?c.length*y+Math.max(0,(c.length-1)*u):y;if(e.dataset.baseWidth=String(d),e.dataset.baseHeight=String(f),e.style.width=`${d}px`,e.style.minWidth=`${d}px`,e.style.height=`${f}px`,e.style.minHeight=`${f}px`,J?.previewFrameWrapper&&!J?.userAdjustedZoom){const m=J.previewFrameWrapper.clientWidth-24;m>0&&m<d?ot=Math.max(m/d,.3):ot=1}po(ot)}finally{kn()}},{once:!0})}function lu(e){if(!j)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?j.sections.add(n):j.sections.delete(n),io(j),mo(),Zt())}function du(e){if(!j)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=j.context||"reservation",r=j.fields||(j.fields=ja(s)),i=qd(r,n);t.checked?i.add(a):i.delete(a),io(j),Zt()}function uu(e){if(!j)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(Ys(j,n),j.sectionExpansions[n]=t.open)}function mo(){if(!J?.toggles||!j)return;const{toggles:e}=J,t=j.fields||{},n=j.context||"reservation";Ys(j);const a=La(n),s=Or(n),r=a.map(({id:i,labelKey:c,fallback:l})=>{const d=o(c,l),u=j.sections.has(i),y=s[i]||[],f=Sd(j,i),m=y.length?`<div class="quote-toggle-sublist">
          ${y.map(p=>{const g=Xs(t,i,p.id),q=u?"":"disabled",_=p.labelKey?o(p.labelKey,p.fallback):p.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${p.id}" ${g?"checked":""} ${q}>
                <span>${A(_)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${i}" ${f?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${i}" ${u?"checked":""}>
            <span>${A(d)}</span>
          </label>
          ${y.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${m}
      </details>
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",lu)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",du)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",uu)})}function mu(){if(J?.modal)return J;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${A(o("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${A(o("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
              <div class="quote-terms-editor" data-quote-terms-editor>
                <label class="quote-terms-editor__label" for="quote-terms-input">${A(o("reservations.quote.termsEditor.title","الشروط العامة (قابلة للتعديل)"))}</label>
                <textarea id="quote-terms-input" class="quote-terms-editor__textarea" rows="6" data-quote-terms-input placeholder="${A(o("reservations.quote.termsEditor.placeholder","اكتب كل شرط في سطر مستقل"))}"></textarea>
                <button type="button" class="quote-terms-reset" data-quote-terms-reset>${A(o("reservations.quote.termsEditor.reset","استعادة الشروط الافتراضية"))}</button>
              </div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${A(o("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${A(o("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),r=e.querySelector("[data-quote-terms-reset]"),i=e.querySelector("[data-quote-download]"),c=e.querySelector(".modal-header"),l=c?.querySelector(".btn-close"),d=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",c&&c.insertBefore(u,l||null);const y=document.createElement("iframe");y.className="quote-preview-frame",y.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),y.setAttribute("loading","lazy"),y.setAttribute("frameborder","0");const f=document.createElement("div");f.className="quote-preview-zoom-controls",f.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${A(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${A(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${A(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(y),n.innerHTML="";const p=document.createElement("div");p.className="quote-preview-scroll",p.appendChild(m),n.appendChild(p);const g=document.createElement("div");g.className="quote-preview-status",g.setAttribute("role","status"),g.setAttribute("aria-live","polite"),g.hidden=!0,g.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${A(Kr("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(f),i?.addEventListener("click",async()=>{if(j){i.disabled=!0;try{await fo()}finally{i.disabled=!1}}});const q=()=>{hs()||vs(e)};d.forEach(L=>{L?.addEventListener("click",q)}),l&&!d.includes(l)&&l.addEventListener("click",q),e.addEventListener("click",L=>{hs()||L.target===e&&vs(e)}),J={modal:e,toggles:t,preview:n,previewScroll:p,previewFrameWrapper:m,zoomControls:f,zoomValue:f.querySelector("[data-zoom-value]"),previewFrame:y,meta:a,downloadBtn:i,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const _=f.querySelector("[data-zoom-out]"),v=f.querySelector("[data-zoom-in]"),S=f.querySelector("[data-zoom-reset]");return _?.addEventListener("click",()=>Ti(-.1)),v?.addEventListener("click",()=>Ti(.1)),S?.addEventListener("click",()=>ya(1,{markManual:!0})),s&&s.addEventListener("input",fu),r&&r.addEventListener("click",yu),ya(ot),J}function ya(e,{silent:t=!1,markManual:n=!1}={}){ot=Math.min(Math.max(e,.25),2.2),n&&J&&(J.userAdjustedZoom=!0),po(ot),!t&&J?.zoomValue&&(J.zoomValue.textContent=`${Math.round(ot*100)}%`)}function Ti(e){ya(ot+e,{markManual:!0})}function po(e){if(!J?.previewFrame||!J.previewFrameWrapper)return;const t=J.previewFrame,n=J.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",Zs()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function pu(){if(!J?.meta||!j)return;const{meta:e}=J;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${A(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${A(j.quoteNumber)}</strong></div>
      <div><span>${A(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${A(j.quoteDateLabel)}</strong></div>
    </div>
  `}function ni(){if(!J?.termsInput)return;const e=(j?.terms&&j.terms.length?j.terms:Oe).join(`
`);J.termsInput.value!==e&&(J.termsInput.value=e)}function fu(e){if(!j)return;const t=fs(e?.target?.value??"");if(t.length){j.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{j.terms=[...Oe],ni();const n=Oe.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}Zt()}function yu(e){if(e?.preventDefault?.(),!j)return;j.terms=[...Oe];const t=document.getElementById("reservation-terms");t&&(t.value=Oe.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=Oe.join(`
`)),ni(),Zt()}async function fo(){if(!j)return;Ot("export");const t=!Zs()&&Yr(),n=Na(),a=null,s=!n&&t?window.open("","_blank"):null;(l=>{if(l)try{l.document.open(),l.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${A(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${A(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${A(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),l.document.close()}catch(d){vt("failed to prime download window",d)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await Fd(),Ja("html2pdf ensured");const l=j.context||"reservation",d=lo({context:l,reservation:j.reservation,customer:j.customer,project:j.project,crewAssignments:j.crewAssignments,totals:j.totals,totalsDisplay:j.totalsDisplay,rentalDays:j.rentalDays,currencyLabel:j.currencyLabel,sections:j.sections,fieldSelections:j.fields,quoteNumber:j.quoteNumber,quoteDate:j.quoteDateLabel,terms:j.terms,projectCrew:j.projectCrew,projectExpenses:j.projectExpenses,projectEquipment:j.projectEquipment,projectInfo:j.projectInfo,clientInfo:j.clientInfo,paymentSummary:j.paymentSummary,projectTotals:j.projectTotals});i=document.createElement("div"),i.innerHTML=d,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),Nr(i),Lr(i),jr(i),Ja("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await uo(u,{context:"export"}),await Ln(u),ti(u),Ja("layout complete for export document")}catch(f){qs(f,"layoutQuoteDocument",{suppressToast:!0})}}const y=`quotation-${j.quoteNumber}.pdf`;await cu(u,{filename:y,safariWindowRef:s,mobileWindowRef:a}),j.sequenceCommitted||(Hd(j.quoteSequence),j.sequenceCommitted=!0)}catch(l){Ss({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,qs(l,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),kn()}}function yo(){const e=mu();e?.modal&&(_n=!1,ot=1,J&&(J.userAdjustedZoom=!1),ya(ot,{silent:!0}),mo(),pu(),ni(),Zt(),hd(e.modal))}async function bu({reservation:e,customer:t,project:n}){if(!e){w(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=Qd(e),{totalsDisplay:s,totals:r,rentalDays:i}=Gd(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:l,quoteNumber:d}=ao("reservation"),u=new Date,y=rd();j={context:"reservation",reservation:e,customer:t,project:n,crewAssignments:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(La("reservation").filter(f=>f.defaultSelected).map(f=>f.id)),sectionExpansions:Js("reservation"),fields:ja("reservation"),terms:y,quoteSequence:l,quoteNumber:d,quoteDate:u,quoteDateLabel:oo(u),sequenceCommitted:!1},ro(j),yo()}async function vm({project:e}){if(!e){w(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=iu(e),{project:n}=t;if(!n){w(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=ao("project"),r=new Date,i=[...id];j={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(La("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:Js("project"),fields:ja("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:oo(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},ro(j),yo()}function gu({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=Bn(),{reservations:r=[],customers:i=[],technicians:c=[],projects:l=[]}=ye(),d=r.map(v=>{const S=es(v);return{...S,id:v.id??S.id,reservationId:v.reservationId??v.reservation_id??S.reservationId,reservationCode:v.reservationCode??v.reservation_code??S.reservationCode}}),u=d,y=Array.isArray(s)?s:c||[],f=new Map((l||[]).map(v=>[String(v.id),v])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!u||u.length===0){m.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const p=t||Kl(),g=new Map(i.map(v=>[String(v.id),v])),q=new Map(y.map(v=>[String(v.id),v])),_=Xl({reservations:d,filters:p,customersMap:g,techniciansMap:q,projectsMap:f});if(_.length===0){m.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${Jl({entries:_,customersMap:g,techniciansMap:q,projectsMap:f})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(v=>{const S=Number(v.dataset.reservationIndex);Number.isNaN(S)||v.addEventListener("click",()=>{typeof n=="function"&&n(S)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(v=>{const S=Number(v.dataset.reservationIndex);Number.isNaN(S)||v.addEventListener("click",L=>{L.stopPropagation(),typeof a=="function"&&a(S,L)})})}function hu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=ye(),c=s.map(S=>{const L=es(S);return{...L,id:S.id??L.id,reservationId:S.reservationId??S.reservation_id??L.reservationId,reservationCode:S.reservationCode??S.reservation_code??L.reservationCode}}),l=s[e];if(!l)return w(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=c[e]??es(l),u=r.find(S=>String(S.id)===String(l.customerId)),y=l.projectId?i.find(S=>String(S.id)===String(l.projectId)):null,f=document.getElementById("reservation-details-body");if(f){const S=Bn()||[];f.innerHTML=Yl(d,u,S,e,y)}const m=document.getElementById("reservationDetailsModal"),p=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},g=document.getElementById("reservation-details-edit-btn");g&&(g.onclick=()=>{p(),typeof t=="function"&&t(e,{reservation:l,customer:u,getEditContext:a})});const q=document.getElementById("reservation-details-delete-btn");q&&(q.onclick=()=>{p(),typeof n=="function"&&n(e,{reservation:l,customer:u})});const _=f?.querySelector('[data-action="open-project"]');_&&y&&_.addEventListener("click",()=>{p();const S=y?.id!=null?String(y.id):"",L=S?`projects.html?project=${encodeURIComponent(S)}`:"projects.html";window.location.href=L});const v=document.getElementById("reservation-details-export-btn");return v&&(v.onclick=async S=>{S?.preventDefault?.(),S?.stopPropagation?.(),v.blur();try{await bu({reservation:l,customer:u,project:y})}catch(L){console.error("❌ [reservations] export to PDF failed",L),w(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}function bo(){const e=()=>{Fn(),Fe(),Bn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let Li=!1,ji=null;function vu(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function qm(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=vu(n);if(!a&&Li&&Ht().length>0&&s===ji)return Ht();try{const r=await Yi(n||{});return Li=!0,ji=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return Ht()}}async function qu(e,{onAfterChange:t}={}){if(!Gt())return Nn(),!1;const a=Ht()[e];if(!a)return w(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return w(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await kc(s),bo(),t?.({type:"deleted",reservation:a}),w(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=Sa(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return w(i,"error"),!1}}async function Su(e,{onAfterChange:t}={}){const a=Ht()[e];if(!a)return w(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return w(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=Ct(a);if(r)return w(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await $c(s);return bo(),t?.({type:"confirmed",reservation:i}),w(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=Sa(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return w(c,"error"),!1}}function gn(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Pn(e,n),end:Pn(t,a)}}function ba(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ai(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function go(){const{container:e,select:t,hint:n,addButton:a}=ai();if(!t)return;const s=t.value,r=Hi(),i=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,l=r.map(u=>{const y=Number.isFinite(Number(u.price))?Number(u.price):0,f=h(y.toFixed(2)),m=`${u.name} — ${f} ${i}`;return`<option value="${ba(u.id)}">${ba(m)}</option>`}).join("");t.innerHTML=`${c}${l}`;const d=r.length>0;t.disabled=!d,a&&(a.disabled=!d),e&&(e.hidden=!d,e.setAttribute("aria-hidden",d?"false":"true")),n&&(d?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),d&&s&&r.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function Eu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||w(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=Lt(),{start:r,end:i}=gn(),{reservations:c=[]}=ye(),l=a!=null&&c[a]||null,d=l?.id??l?.reservationId??null,u=xr(n,{existingItems:s,start:r,end:i,ignoreReservationId:d});if(!u.success)return t||w(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const y=[...s,u.package];return jt(a,y),Tt(y),Xe(),t||w(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function Ni(){const{select:e}=ai();if(!e)return;const t=e.value||"";Eu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function wu(){const{addButton:e,select:t}=ai();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{Ni()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Ni())}),t.dataset.listenerAttached="true"),go()}function Tt(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,Di(t);return}const l=pn(e);t.innerHTML=l.map(d=>{const u=d.items[0]||{},y=Xt(u)||d.image,f=y?`<img src="${y}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=d.items.some($=>$?.type==="package"),p=h(String(d.count)),g=Te(d.unitPrice),q=Number.isFinite(g)?ve(g):0,_=Te(d.totalPrice),v=Number.isFinite(_)?_:q*(Number.isFinite(d.count)?d.count:1),S=ve(v),L=`${h(q.toFixed(2))} ${a}`,W=`${h(S.toFixed(2))} ${a}`,E=d.barcodes.map($=>h(String($||""))).filter(Boolean),I=E.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${E.map($=>`<li>${$}</li>`).join("")}
            </ul>
          </details>`:"";let P="";if(m){const $=new Map,N=C=>{const B=Number.parseFloat(h(String(C??"")).replace(/[^0-9.]/g,""));return!Number.isFinite(B)||B<=0||B>99?1:Math.round(B)},X=[];if(Array.isArray(d.packageItems)&&d.packageItems.length&&X.push(...d.packageItems),d.items.forEach(C=>{Array.isArray(C?.packageItems)&&X.push(...C.packageItems)}),X.forEach(C=>{if(!C)return;const B=ee(C.barcode||C.normalizedBarcode||C.desc||Math.random());if(!B)return;const x=$.get(B),Y=N(C.qtyPerPackage??C.perPackageQty??C.quantityPerPackage??C.qty??C.quantity??1),U=Math.max(1,Math.min(Y,99));if(x){x.qty=U;return}$.set(B,{desc:C.desc||C.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:U,barcode:C.barcode??C.normalizedBarcode??""})}),$.size){const C=Array.from($.values()).map(B=>{const x=h(String(B.qty>0?Math.min(B.qty,99):1)),Y=ba(B.desc||""),U=B.barcode?` <span class="reservation-package-items__barcode">(${ba(h(String(B.barcode)))})</span>`:"";return`<li>${Y}${U} × ${x}</li>`}).join("");P=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${C}
              </ul>
            </details>
          `}}const k=m?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",H=m?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${d.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${d.description||"-"}</div>
                ${m?`${P||""}${I||""}`:I}
              </div>
            </div>
          </td>
          <td>
            <div class="${k}" data-group-key="${d.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${d.key}" aria-label="${i}"${H}>−</button>
              <span class="reservation-qty-value">${p}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${d.key}" aria-label="${r}"${H}>+</button>
            </div>
          </td>
          <td>${L}</td>
          <td>${W}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),Di(t)}function Au(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function Ba(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=Da();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,Bi();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${h(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${h(Number(s.percentage).toFixed(2))}%`:"—",l=s?.recordedAt?h(Ge(s.recordedAt)):"—",d=Au(s?.type),u=s?.note?h(s.note):"";return`
      <tr>
        <td>${d}</td>
        <td>${i}</td>
        <td>${c}</td>
        <td>${l}</td>
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
  `,Bi()}function xu(){if(jn()){w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=qo(e);let a=So(t);if(!Number.isFinite(a)||a<=0){w(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=ts.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,l=o("reservations.create.summary.currency","SR");let d=null,u=null;if(n==="percent"){const f=Math.max(0,100-i);if(f<=1e-4){w(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const p=h(m.toFixed(2));w(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",p)),a=m}u=Number(a.toFixed(2)),r>0&&(d=a/100*r)}else{const f=Math.max(0,r-c);if(f<=1e-4){w(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const p=`${h(m.toFixed(2))} ${l}`;w(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",p)),a=m}d=Number(a.toFixed(2)),r>0&&(u=d/r*100)}d!=null&&(d=Number(d.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const y={type:n,value:a,amount:d,percentage:u,recordedAt:new Date().toISOString()};Du(y),si(Da()),Ba(),Xe(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),w(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function Bi(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(jn()){n.preventDefault(),w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}xu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(jn()){n.preventDefault(),w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(Fu(s),si(Da()),Ba(),Xe(),w(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function Iu(e){const{index:t,items:n}=Lt(),s=pn(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,l)=>l!==r);jt(t,i),Tt(i),Xe()}function _u(e){const{index:t,items:n}=Lt(),a=n.filter(s=>qa(s)!==e);a.length!==n.length&&(jt(t,a),Tt(a),Xe())}function ku(e){const{index:t,items:n}=Lt(),s=pn(n).find(q=>q.key===e);if(!s||s.items.some(q=>q?.type==="package"))return;const{start:r,end:i}=gn();if(!r||!i){w(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=ye(),l=t!=null&&c[t]||null,d=l?.id??l?.reservationId??null,u=new Set(n.map(q=>ee(q.barcode))),{equipment:y=[]}=ye(),f=(y||[]).find(q=>{const _=ee(q?.barcode);return!_||u.has(_)||qa({desc:q?.desc||q?.description||q?.name||"",price:Number(q?.price)||0})!==e||!Fs(q)?!1:!dt(_,r,i,d)});if(!f){w(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const m=ee(f.barcode),p=Wt(f);if(!p){w(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:p,equipmentId:p,barcode:m,desc:f.desc||f.description||f.name||s.description||"",qty:1,price:Number.isFinite(Number(f.price))?Number(f.price):s.unitPrice,image:Xt(f)}];jt(t,g),Tt(g),Xe()}function Di(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){Iu(s);return}if(a==="increase-edit-group"&&s){ku(s);return}if(a==="remove-edit-group"&&s){_u(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||Cu(i)}}),e.dataset.groupListenerAttached="true")}function jn(){return!!document.getElementById("edit-res-project")?.value}function $u(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{jn()&&(w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function Pu(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),l=document.getElementById("edit-res-payment-history");[n,a,s,r,i,c,l].forEach($u),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s&&(s.value="unpaid",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),l&&(l.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.dataset.linkedDisabled="false"))}function Xe(){const e=document.getElementById("edit-res-summary");if(!e)return;Ba();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),Qe(a),Xe()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=jn();Pu(c);const l=document.getElementById("edit-res-tax"),d=c?!1:l?.checked||!1,u=!c&&a?.dataset?.userSelected==="true",y=c?"unpaid":u&&a?.value||"unpaid";let f=null;!c&&d&&(et("edit-res-company-share"),f=dn("edit-res-company-share"),(!Number.isFinite(f)||f<=0)&&(et("edit-res-company-share"),f=dn("edit-res-company-share")));const{items:m=[],payments:p=[]}=Lt(),{start:g,end:q}=gn(),_=ts({items:m,discount:r,discountType:i,applyTax:d,paidStatus:y,start:g,end:q,companySharePercent:f,paymentHistory:p});e.innerHTML=_;const v=ts.lastResult;if(v&&a){const S=v.paymentStatus;u?Qe(a,a.value):(a.value!==S&&(a.value=S),a.dataset&&delete a.dataset.userSelected,Qe(a,S))}else a&&Qe(a,a.value)}function Cu(e){if(e==null)return;const{index:t,items:n}=Lt();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);jt(t,a),Tt(a),Xe()}function Tu(e){const t=e?.value??"",n=ee(t);if(!n)return;const a=wa(n);if(!a){w(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=qt(a);if(s==="maintenance"||s==="retired"){w(Qt(s));return}const r=ee(n),{index:i,items:c=[]}=Lt();if(c.findIndex(q=>ee(q.barcode)===r)>-1){w(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=gn();if(!d||!u){w(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:y=[]}=ye(),f=i!=null&&y[i]||null,m=f?.id??f?.reservationId??null;if(dt(r,d,u,m)){w(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const p=Wt(a);if(!p){w(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:p,equipmentId:p,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];jt(i,g),e&&(e.value=""),Tt(g),Xe()}function ga(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Sr(t),a=ee(n?.barcode||t);if(!n||!a){w(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=qt(n);if(s==="maintenance"||s==="retired"){w(Qt(s));return}const{start:r,end:i}=gn();if(!r||!i){w(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:l=[]}=Lt();if(l.some(g=>ee(g.barcode)===a)){w(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=ye(),y=c!=null&&u[c]||null,f=y?.id??y?.reservationId??null;if(dt(a,r,i,f)){w(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=Wt(n);if(!m){w(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const p=[...l,{id:m,equipmentId:m,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];jt(c,p),Tt(p),Xe(),e.value=""}function ho(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),ga(e))});const t=()=>{Er(e.value,"edit-res-equipment-description-options")&&ga(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{Xe()});const e=()=>{wu()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{go()})}typeof window<"u"&&(window.getEditReservationDateRange=gn,window.renderEditPaymentHistory=Ba);function Lu(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){us(e);return}ga(e)}}function Sm(){Pt(),ho()}function ju(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let cn=null,rt=[],ct=[],Es=null,Be={},Ya=!1;const Nu="__DEBUG_CREW__";function Bu(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(Nu);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function Fi(e,t){if(Bu())try{console.log(`🪵 [crew-debug:edit] ${e}`,t)}catch{}}function ws(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function As(){return document.getElementById("edit-res-confirmed")?.value==="true"}function Lt(){return{index:cn,items:rt,payments:ct}}function jt(e,t,n=ct){cn=typeof e=="number"?e:null,rt=Array.isArray(t)?[...t]:[],ct=Array.isArray(n)?[...n]:[]}function vo(){cn=null,rt=[],Tc(),ct=[]}function Da(){return[...ct]}function si(e){ct=Array.isArray(e)?[...e]:[]}function Du(e){e&&(ct=[...ct,e])}function Fu(e){!Number.isInteger(e)||e<0||(ct=ct.filter((t,n)=>n!==e))}function $n(e,t=1){const n=Number.parseFloat(h(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function xs(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(h(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function Ru(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?ee(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:$n(e.qty??e.quantity??e.count??1),price:xs(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function Mu(e,t=0){if(!e||typeof e!="object")return null;const n=Cn(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=$n(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),r=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:Ps(e)).map(f=>Ru(f)).filter(Boolean),i=e.total_price??e.totalPrice??e.total??null;let c=xs(e.unit_price??e.unitPrice??e.price??null,0);if((!c||c===0)&&i!=null){const f=xs(i,0);f>0&&a>0&&(c=Number((f/a).toFixed(2)))}const l=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,l,n].find(f=>f!=null&&String(f).trim()!=="")||`Package ${n}`,y=e.image??e.cover??e.thumbnail??r.find(f=>f?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:h(String(u)),name:h(String(u)),qty:a,price:c,barcode:l,packageItems:r,image:y}}function zu(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const r=s-n;e.set(a,r>0?r:0)})}function Hu(e={},t=[]){const n=Array.isArray(t)?t.map(c=>({...c})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((c,l)=>Mu(c,l)).filter(Boolean);if(!s.length)return n;const r=new Map;s.forEach(c=>{const l=$n(c.qty??c.quantity??1);if(c.barcode){const d=ee(c.barcode);if(d){const u=`package::${d}`;r.set(u,(r.get(u)??0)+l)}}(c.packageItems||[]).forEach(d=>{if(!d)return;const u=l*$n(d.qty??d.quantity??1),y=d.equipmentId??null,f=d.normalizedBarcode||(d.barcode?ee(d.barcode):null);if(y!=null){const m=`equipment::${String(y)}`;r.set(m,(r.get(m)??0)+u)}if(f){const m=`barcode::${f}`;r.set(m,(r.get(m)??0)+u)}})});const i=[];return n.forEach(c=>{if(!c||typeof c!="object"){i.push(c);return}if(c.type==="package"){const q=Cn(c.packageId??c.package_id??c.id??"");s.some(v=>v.packageId===q)||i.push({...c});return}const l=$n(c.qty??c.quantity??1),d=Wt(c),u=c.barcode?ee(c.barcode):null,y=[];d!=null&&y.push(`equipment::${String(d)}`),u&&y.push(`barcode::${u}`);const f=y.map(q=>r.get(q)??0).filter(q=>q>0);if(!f.length){i.push({...c});return}const m=Math.min(...f);if(m<=0){i.push({...c});return}const p=Math.min(m,l);if(zu(r,y,p),p>=l)return;const g=l-p;i.push({...c,qty:g,quantity:g})}),[...i,...s.map(c=>({...c}))]}function Ou(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function qo(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function So(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Vu(e,t){if(e){e.value="";return}}function wn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Eo(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),l=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,d=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:l,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:d}}function Uu(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((l,d)=>String(d.createdAt||d.start||"").localeCompare(String(l.createdAt||l.start||""))):[],c=[`<option value="">${wn(a)}</option>`];i.forEach(l=>{c.push(`<option value="${wn(l.id)}">${wn(l.title||a)}</option>`)}),r&&!i.some(l=>String(l.id)===r)&&c.push(`<option value="${wn(r)}">${wn(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function wo(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const l=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",l&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}Is("tax");const c=Be?.updateEditReservationSummary;typeof c=="function"&&c()}function Is(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=Be?.updateEditReservationSummary;typeof r=="function"&&r()};if(Ya){a();return}Ya=!0;const s=()=>{Ya=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(_t)),t.disabled){n.checked=!1,w(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),et("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?et("edit-res-company-share"):n.checked&&(n.checked=!1));s()}async function Ri(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:l}=ye(),u=Ht()?.[e];if(!u){w(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}Be={...Be,reservation:u,projects:l||[]},t?.(),Uu(l||[],u);const y=u.projectId&&l?.find?.(D=>String(D.id)===String(u.projectId))||null,{effectiveConfirmed:f,projectLinked:m}=Ct(u,y),p=u.items?u.items.map(D=>({...D,equipmentId:D.equipmentId??D.equipment_id??D.id,barcode:ee(D?.barcode)})):[],g=Hu(u,p),_=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(D=>Eo(D)).filter(Boolean);jt(e,g,_);const v=o("reservations.list.unknownCustomer","غير معروف"),S=c?.find?.(D=>String(D.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const L=document.getElementById("edit-res-id");L&&(L.value=u.reservationId||u.id);const W=document.getElementById("edit-res-customer");W&&(W.value=S?.customerName||v);const E=typeof a=="function"?a(u.start):{date:"",time:""},I=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",E.date),n?.("edit-res-start-time",E.time),n?.("edit-res-end",I.date),n?.("edit-res-end-time",I.time);const P=document.getElementById("edit-res-notes");P&&(P.value=u.notes||"");const k=document.getElementById("edit-res-discount");if(k){const D=m?0:u.discount??0;k.value=h(D)}const H=document.getElementById("edit-res-discount-type");H&&(H.value=m?"percent":u.discountType||"percent");const $=u.projectId?!1:!!u.applyTax,N=document.getElementById("edit-res-tax");N&&(N.checked=$);const X=document.getElementById("edit-res-company-share");if(X){const D=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,R=D!=null?Number.parseFloat(h(String(D).replace("%","").trim())):NaN,M=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,G=M!=null?M===!0||M===1||M==="1"||String(M).toLowerCase()==="true":Number.isFinite(R)&&R>0,se=G&&Number.isFinite(R)&&R>0?R:_t,te=$||G;X.checked=te,X.dataset.companyShare=String(se)}ws(f,{disable:m});const C=document.getElementById("edit-res-paid"),B=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");C&&(C.value=B,C.dataset&&delete C.dataset.userSelected);const x=document.getElementById("edit-res-payment-progress-type"),Y=document.getElementById("edit-res-payment-progress-value");x?.dataset?.userSelected&&delete x.dataset.userSelected,x&&(x.value="percent"),Vu(Y);let U=Array.isArray(u.crewAssignments)&&u.crewAssignments.length?u.crewAssignments:Array.isArray(u.techniciansDetails)&&u.techniciansDetails.length?u.techniciansDetails:(u.technicians||[]).map(D=>String(D));if(!Array.isArray(U)||U.length===0){const D=Lc(u.id??u.reservationId??u.reservation_code??null);Array.isArray(D)&&D.length&&(U=D)}try{await jc()}catch(D){console.warn("[reservationsEdit] positions load failed (non-fatal)",D)}if(Nc(U),s?.(g),typeof window<"u"){const D=window?.renderEditPaymentHistory;typeof D=="function"&&D()}wo(),r?.();const F=document.getElementById("editReservationModal");Es=Ou(F,i),Es?.show?.()}async function Ku({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:r,populateEquipmentDescriptionLists:i,handleReservationsMutation:c}={}){if(cn===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const l=document.getElementById("edit-res-start")?.value?.trim(),d=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),y=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",f=document.getElementById("edit-res-notes")?.value||"",m=h(document.getElementById("edit-res-discount")?.value||"0");let p=parseFloat(m)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const q=As(),_=document.getElementById("edit-res-paid"),v=_?.dataset?.userSelected==="true",S=v&&_?.value||"unpaid",L=document.getElementById("edit-res-payment-progress-type"),W=document.getElementById("edit-res-payment-progress-value"),E=qo(L),I=So(W),P=document.getElementById("edit-res-project")?.value||"",k=Pc();k.map(Q=>Q?.technicianId).filter(Boolean);const H=document.getElementById("edit-res-company-share"),$=document.getElementById("edit-res-tax");if(!l||!u){w(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const N=typeof e=="function"?e:(Q,be)=>`${Q}T${be||"00:00"}`,X=N(l,d),C=N(u,y);if(X&&C&&new Date(X)>new Date(C)){w(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const x=Ht()?.[cn];if(!x){w(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(rt)||rt.length===0&&k.length===0){w(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const Y=typeof t=="function"?t:()=>!1,U=x.id??x.reservationId;for(const Q of rt){if(Q?.type==="package"&&Array.isArray(Q.packageItems)){for(const T of Q.packageItems){const ie=T?.barcode??T?.normalizedBarcode??"";if(!ie)continue;const fe=qt(ie);if(fe==="reserved"){const ge=ee(ie);if(!Y(ge,X,C,U))continue}if(fe!=="available"){w(Qt(fe));return}}continue}const be=qt(Q.barcode);if(be==="reserved"){const T=ee(Q.barcode);if(!Y(T,X,C,U))continue}if(be!=="available"){w(Qt(be));return}}for(const Q of rt){if(Q?.type==="package"&&Array.isArray(Q.packageItems)){for(const T of Q.packageItems){const ie=ee(T?.barcode??T?.normalizedBarcode??"");if(ie&&Y(ie,X,C,U)){const fe=T?.desc||T?.barcode||o("reservations.create.packages.unnamedItem","معدة بدون اسم"),ge=`${o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${h(String(fe))})`;w(ge);return}}continue}const be=ee(Q.barcode);if(Y(be,X,C,U)){w(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const F=typeof n=="function"?n:()=>!1;for(const Q of rt){if(Q?.type!=="package")continue;const be=Q.packageId??Q.package_id??null;if(be&&F(be,X,C,U)){const T=Q.desc||Q.packageName||o("reservations.create.packages.genericName","الحزمة");w(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${h(String(T))} محجوزة بالفعل في الفترة المختارة`));return}}const D=typeof a=="function"?a:()=>!1;for(const Q of k)if(Q?.technicianId&&D(Q.technicianId,X,C,U)){w(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const R=Array.isArray(Be.projects)&&Be.projects.length?Be.projects:ye().projects||[],M=P&&R.find(Q=>String(Q.id)===String(P))||null,G={...x,projectId:P?String(P):null,confirmed:q},{effectiveConfirmed:se,projectLinked:te,projectStatus:de}=Ct(G,M);let O=!!H?.checked,re=!!$?.checked;if(te&&(O&&(H.checked=!1,O=!1),re=!1),!te&&O!==re){w(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}re&&(et("edit-res-company-share"),O=!!H?.checked);let Se=O?getCompanySharePercent("edit-res-company-share"):null;O&&(!Number.isFinite(Se)||Se<=0)&&(et("edit-res-company-share"),Se=getCompanySharePercent("edit-res-company-share"));const Ee=O&&re&&Number.isFinite(Se)&&Se>0,Ce=te?!1:re;te&&(p=0,g="percent");const K=Ts(rt,p,g,Ce,k,{start:X,end:C,companySharePercent:Ee?Se:0});let Z=Da();if(Number.isFinite(I)&&I>0){const Q=K;let be=null,T=null;E==="amount"?(be=I,Q>0&&(T=I/Q*100)):(T=I,Q>0&&(be=I/100*Q));const ie=Eo({type:E,value:I,amount:be,percentage:T,recordedAt:new Date().toISOString()});ie&&(Z=[...Z,ie],si(Z)),W&&(W.value="")}const ae=Ls({totalAmount:K,history:Z}),we=js({manualStatus:S,paidAmount:ae.paidAmount,paidPercent:ae.paidPercent,totalAmount:K});_&&!v&&(_.value=we,_.dataset&&delete _.dataset.userSelected);let Re=x.status??"pending";te?Re=M?.status??de??Re:["completed","cancelled"].includes(String(Re).toLowerCase())||(Re=q?"confirmed":"pending");const ne=Qi({reservationCode:x.reservationCode??x.reservationId??null,customerId:x.customerId,start:X,end:C,status:Re,title:x.title??null,location:x.location??null,notes:f,projectId:P?String(P):null,totalAmount:K,discount:p,discountType:g,applyTax:Ce,paidStatus:we,confirmed:se,items:rt.map(Q=>({...Q,equipmentId:Q.equipmentId??Q.id})),crewAssignments:k,companySharePercent:Ee?Se:null,companyShareEnabled:Ee,paidAmount:ae.paidAmount,paidPercentage:ae.paidPercent,paymentProgressType:ae.paymentProgressType,paymentProgressValue:ae.paymentProgressValue,paymentHistory:Z});try{Fi("about to submit",{editingIndex:cn,crewAssignments:k,techniciansPayload:ne?.technicians,payload:ne});const Q=await Cc(x.id||x.reservationId,ne);Fi("server response",{reservation:Q?.id??Q?.reservationId??Q?.reservation_code,technicians:Q?.technicians,crewAssignments:Q?.crewAssignments,techniciansDetails:Q?.techniciansDetails}),await Yi(),Fn(),Fe(),w(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),vo(),c?.({type:"updated",reservation:Q}),r?.(),i?.(),Es?.hide?.()}catch(Q){console.error("❌ [reservationsEdit] Failed to update reservation",Q);const be=Sa(Q)?Q.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");w(be,"error")}}function Em(e={}){Be={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=Be,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=h(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{Is("tax")}),c.dataset.listenerAttached="true");const l=document.getElementById("edit-res-company-share");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{Is("share")}),l.dataset.listenerAttached="true");const d=document.getElementById("edit-res-payment-progress-type");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{d.dataset.userSelected="true",t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const y=document.getElementById("edit-res-project");y&&!y.dataset.listenerAttached&&(y.addEventListener("change",()=>{wo();const q=Array.isArray(Be.projects)&&Be.projects.length?Be.projects:ye().projects||[],_=y.value&&q.find(E=>String(E.id)===String(y.value))||null,S={...Be?.reservation??{},projectId:y.value||null,confirmed:As()},{effectiveConfirmed:L,projectLinked:W}=Ct(S,_);ws(L,{disable:W}),t?.()}),y.dataset.listenerAttached="true");const f=document.getElementById("edit-res-confirmed-btn");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{if(f.disabled)return;const q=!As();ws(q),t?.()}),f.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{Ku(Be).catch(q=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",q)})}),m.dataset.listenerAttached="true");const p=document.getElementById("edit-res-equipment-barcode");if(p&&!p.dataset.listenerAttached){let q=null;const _=()=>{p.value?.trim()&&(clearTimeout(q),q=null,n?.(p))};p.addEventListener("keydown",S=>{S.key==="Enter"&&(S.preventDefault(),_())});const v=()=>{if(clearTimeout(q),!p.value?.trim())return;const{start:S,end:L}=getEditReservationDateRange();!S||!L||(q=setTimeout(()=>{_()},150))};p.addEventListener("input",v),p.addEventListener("change",_),p.dataset.listenerAttached="true"}ho?.();const g=document.getElementById("editReservationModal");g&&!g.dataset.cleanupAttached&&(g.addEventListener("hidden.bs.modal",()=>{vo(),t?.(),s?.([])}),g.dataset.cleanupAttached="true")}const Qu=ye()||{};let Ze=(Qu.projects||[]).map(Xu),Mn=!1;function wm(){return Ze}function Fa(e){Ze=Array.isArray(e)?e.map(ri):[],ks({projects:Ze});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return Ze}async function Gu(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,l])=>{l==null||l===""||t.set(c,String(l))});const n=t.toString(),s=(await lt(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(ii);return Fa(i),Mn=!0,Ze}async function Wu({force:e=!1,params:t=null}={}){if(!e&&Mn&&Ze.length>0)return Ze;try{return await Gu(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),Ze}}async function Am(e){const t=await lt("/projects/",{method:"POST",body:e}),n=ii(t?.data??{}),a=[...Ze,n];return Fa(a),Mn=!0,n}async function xm(e,t){const n=await lt(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=ii(n?.data??{}),s=Ze.map(r=>String(r.id)===String(e)?a:r);return Fa(s),Mn=!0,a}async function Im(e){await lt(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=Ze.filter(n=>String(n.id)!==String(e));Fa(t),Mn=!0}function _m({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:l,paymentStatus:d,equipmentEstimate:u=0,expenses:y=[],taxAmount:f=0,totalWithTax:m=0,discount:p=0,discountType:g="percent",companyShareEnabled:q=!1,companySharePercent:_=null,companyShareAmount:v=0,paidAmount:S=null,paidPercentage:L=null,paymentProgressType:W=null,paymentProgressValue:E=null,confirmed:I=!1,technicians:P=[],equipment:k=[],payments:H,paymentHistory:$}={}){const N=Array.isArray(P)?P.map(R=>Number.parseInt(String(R),10)).filter(R=>Number.isInteger(R)&&R>0):[],X=Array.isArray(k)?k.map(R=>{const M=Number.parseInt(String(R.equipmentId??R.equipment_id??R.id??0),10),G=Number.parseInt(String(R.qty??R.quantity??0),10);return!Number.isInteger(M)||M<=0?null:{equipment_id:M,quantity:Number.isInteger(G)&&G>0?G:1}}).filter(Boolean):[],C=Array.isArray(y)?y.map(R=>{const M=Number.parseFloat(R?.amount??R?.value??0)||0,G=(R?.label??R?.name??"").trim();return G?{label:G,amount:Math.round(M*100)/100}:null}).filter(Boolean):[],B=C.reduce((R,M)=>R+(M?.amount??0),0),x={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!l,payment_status:d??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(B*100)/100,tax_amount:Math.round((Number.parseFloat(f)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(m)||0)*100)/100,confirmed:!!I,technicians:N,equipment:X,expenses:C},Y=Math.max(0,Number.parseFloat(p)||0);x.discount=Y,x.discount_type=g==="amount"?"amount":"percent";const U=Number.parseFloat(_),F=!!q&&Number.isFinite(U)&&U>0;x.company_share_enabled=F,x.company_share_percent=F?U:0,x.company_share_amount=F?Math.max(0,Number.parseFloat(v)||0):0,Number.isFinite(Number(S))&&(x.paid_amount=Math.max(0,Number.parseFloat(S)||0)),Number.isFinite(Number(L))&&(x.paid_percentage=Math.max(0,Number.parseFloat(L)||0)),(W==="amount"||W==="percent")&&(x.payment_progress_type=W),E!=null&&E!==""&&(x.payment_progress_value=Number.parseFloat(E)||0),e&&(x.project_code=String(e).trim());const D=H!==void 0?H:$;if(D!==void 0){const R=Ao(D)||[];x.payments=R.map(M=>({type:M.type,amount:M.amount!=null?M.amount:null,percentage:M.percentage!=null?M.percentage:null,value:M.value!=null?M.value:null,note:M.note??null,recorded_at:M.recordedAt??null}))}return x.end_datetime||delete x.end_datetime,x.client_company||(x.client_company=null),x}function ii(e={}){return ri(e)}function Xu(e={}){return ri(e)}function ri(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(m=>{if(m==null)return null;if(typeof m=="object"){const p=m.id??m.technician_id??m.technicianId;return p!=null?String(p):null}return String(m)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(m=>{const p=m?.equipment_id??m?.equipmentId??m?.id??null,g=m?.quantity??m?.qty??0,q=m?.barcode??m?.code??"",_=m?.description??m?.name??"";return{equipmentId:p!=null?String(p):null,qty:Number.parseInt(String(g),10)||0,barcode:q,description:_}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((m,p)=>({id:m?.id??`expense-${t??"x"}-${p}`,label:m?.label??"",amount:Number.parseFloat(m?.amount??0)||0})),l=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,d=e.company_share_enabled??e.companyShareEnabled,u=d!=null?d===!0||d===1||String(d).toLowerCase()==="true":l>0,y=e.payment_history??e.paymentHistory??e.payments??null,f=Ao(y);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?l:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(m=>typeof m=="object"?m:{id:m}),equipment:r,expenses:c,paymentHistory:f}}function km(e){return e instanceof Mi}function Za(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function Ju(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=Za(e.value);let s=Za(e.amount),r=Za(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,l=e.recordedAt??e.recorded_at??e.date??null;let d=null;if(l){const y=new Date(l);Number.isNaN(y.getTime())||(d=y.toISOString())}d||(d=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:d}}function Ao(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>Ju(t)).filter(Boolean):[]}const ha="reservations-ui:ready",Mt=typeof EventTarget<"u"?new EventTarget:null;let zt={};function Yu(e){return Object.freeze({...e})}function Zu(){if(!Mt)return;const e=zt,t=typeof CustomEvent=="function"?new CustomEvent(ha,{detail:e}):{type:ha,detail:e};typeof Mt.dispatchEvent=="function"&&Mt.dispatchEvent(t)}function em(e={}){if(!e||typeof e!="object")return zt;const t={...zt};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),zt=Yu(t),Zu(),zt}function tm(e){if(e)return zt?.[e]}function $m(e){const t=tm(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const i=(s?.detail||zt)?.[e];typeof i=="function"&&(Mt&&Mt.removeEventListener(ha,a),n(i))};Mt&&Mt.addEventListener(ha,a)})}function Pm(){return Wu().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=ye()||{};Bc(e||[]),$r()})}function oi(e=null){$r(),xo(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function nm(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function _s(){return{populateEquipmentDescriptionLists:Pt,setFlatpickrValue:ju,splitDateTime:Vi,renderEditItems:Tt,updateEditReservationSummary:Xe,addEquipmentByDescription:Lu,addEquipmentToEditingReservation:Tu,addEquipmentToEditingByDescription:ga,combineDateTime:Pn,hasEquipmentConflict:dt,hasTechnicianConflict:Ki,renderReservations:xo,handleReservationsMutation:oi,ensureModal:nm}}function xo(e="reservations-list",t=null){gu({containerId:e,filters:t,onShowDetails:Io,onConfirmReservation:ko})}function Io(e){return hu(e,{getEditContext:_s,onEdit:(t,{reservation:n})=>{$o(t,n)},onDelete:_o})}function _o(e){return Gt()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?qu(e,{onAfterChange:oi}):!1:(Nn(),!1)}function ko(e){return Su(e,{onAfterChange:oi})}function $o(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}Ri(e,_s());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}Ri(e,_s());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}gc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Cm(){em({showReservationDetails:Io,deleteReservation:_o,confirmReservation:ko,openReservationEditor:$o})}export{em as A,Io as B,ii as C,fm as D,yn as E,ym as F,wm as G,km as H,Cr as I,bm as J,vm as K,lm as L,dm as M,Gu as N,um as O,pm as P,mm as Q,gm as R,Im as S,Am as T,ad as U,Lr as V,jr as W,hm as X,Wu as a,Cm as b,Em as c,Sm as d,qm as e,$r as f,_s as g,ue as h,om as i,oi as j,Yl as k,Pm as l,Pa as m,Fe as n,Vc as o,sa as p,im as q,xo as r,cm as s,rm as t,Xe as u,tm as v,$m as w,Pr as x,_m as y,xm as z};
