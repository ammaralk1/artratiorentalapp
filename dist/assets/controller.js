import{n as h,d as ye,f as uc,t as o,b as ot,h as x,j as Ot,o as Pn,s as Es,A as Li,z as mc,k as Ge,B as Bi,u as pc}from"./auth.js";import{n as ee,A as ct,B as Di,C as fc,D as xt,E as xs,z as He,F as Fi,G as di,H as wn,I as An,J as pa,K as yc,h as ws,L as lt,M as As,N as rn,O as Ri,P as bc,Q as gc,R as hc,S as vc,T as Vt,U as Xn,V as qc,W as fa,X as Mi,Y as zi,w as Is,j as ks,k as _s,Z as Hi,_ as Sc,s as Cn,c as ya,$ as Oi,a0 as Ec,a1 as Vi,a2 as xc,x as $s,e as kt,a3 as Ui,a4 as he,a5 as Te,q as ba,a6 as wc,a7 as Ga,a as Ki,g as Dt,a8 as Ac,a9 as Ic,aa as Wa,ab as kc,y as _c,ac as $c,ad as Pc,ae as Cc,b as Tc}from"./reservationsService.js";const Ra="select.form-select:not([data-no-enhance]):not([multiple])",dt=new WeakMap;let Ma=null,ui=!1,pt=null;function Ju(e=document){e&&(e.querySelectorAll(Ra).forEach(t=>Un(t)),!Ma&&e===document&&(Ma=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(Ra)&&Un(a),a.querySelectorAll?.(Ra).forEach(s=>Un(s)))})}),Ma.observe(document.body,{childList:!0,subtree:!0})),ui||(ui=!0,document.addEventListener("pointerdown",Lc,{capture:!0})))}function Vn(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){Un(e);return}const t=e.closest(".enhanced-select");t&&(Ps(t),Jn(t),Xa(t))}function Un(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){Vn(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};dt.set(t,r),a.addEventListener("click",()=>Nc(t)),a.addEventListener("keydown",i=>Bc(i,t)),s.addEventListener("click",i=>Fc(i,t)),s.addEventListener("keydown",i=>Dc(i,t)),e.addEventListener("change",()=>{Jn(t),Qi(t)}),r.observer=new MutationObserver(i=>{let c=!1,l=!1;for(const d of i)d.type==="attributes"&&d.attributeName==="disabled"&&(l=!0),d.type==="childList"&&(c=!0);l&&Xa(t),c&&jc(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),Ps(t),Jn(t),Xa(t)}function jc(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,Ps(t),Jn(t)})))}function Ps(e){const t=dt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),Qi(e)}function Jn(e){const t=dt.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function Qi(e){const t=dt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function Xa(e){const t=dt.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function Nc(e){dt.get(e)&&(e.getAttribute("data-open")==="true"?on(e):Gi(e))}function Gi(e){const t=dt.get(e);if(!t)return;pt&&pt!==e&&on(pt,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),pt=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function on(e,{focusTrigger:t=!0}={}){const n=dt.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),pt===e&&(pt=null))}function Lc(e){if(!pt)return;const t=e.target;t instanceof Node&&(pt.contains(t)||on(pt,{focusTrigger:!1}))}function Bc(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),Gi(t)):n==="Escape"&&on(t)}function Dc(e,t){const n=e.key,a=dt.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&Wi(i,t)}else n==="Escape"&&(e.preventDefault(),on(t))}function Fc(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&Wi(n,t)}function Wi(e,t){const n=dt.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),on(t)}const cn=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let ft=null;function Cs(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function Xi(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function Rc(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function Mc(e={}){const t=Rc({...e,activatedAt:Date.now()});return ft=t,Xi(!0,t.mode||"create"),Cs(cn.change,{active:!0,selection:{...t}}),t}function Yn(e="manual"){if(!ft)return;const t=ft;ft=null,Xi(!1),Cs(cn.change,{active:!1,previous:t,reason:e})}function Ji(){return!!ft}function zc(){return ft?{...ft}:null}function Hc(e){if(!ft)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=h(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:r,description:i}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const l=c.map(u=>h(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!l.length)return!1;const d=Number.isInteger(s)&&s>0?s:l.length;t={barcodes:l,quantity:Math.min(d,l.length)},r&&(t.groupKey=r),i&&(t.description=i)}else return!1;return Cs(cn.requestAdd,{...t,selection:{...ft}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||Yn("tab-changed")});const Oc=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Vc=new Set(["maintenance","reserved","retired"]);function Uc(e){const t=String(e??"").trim().toLowerCase();return t&&Oc.get(t)||"available"}function Kc(e){return e?typeof e=="object"?e:ga(e):null}function gt(e){const t=Kc(e);return t?Uc(t.status||t.state||t.statusLabel||t.status_label):"available"}function Ts(e){return!Vc.has(gt(e))}function Ut(e={}){return e.image||e.imageUrl||e.img||""}function Qc(e){if(!e)return null;const t=ee(e),{equipment:n=[]}=ye();return(n||[]).find(a=>ee(a?.barcode)===t)||null}function ga(e){const t=ee(e);if(!t)return null;const{equipment:n=[]}=ye();return(n||[]).find(a=>ee(a?.barcode)===t)||null}const Gc=ye()||{};let St=(Gc.equipment||[]).map(Jc),Ja=!1,vn="",Nt=null,Rt=null,Mt=null,ha=!1,mi=!1;function Wc(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function Xc(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function Jc(e={}){return js({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function va(e={}){return js(e)}function js(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=Tn(e.quantity??e.qty??0),i=qa(e.unit_price??e.price??0),c=h(String(e.barcode??"").trim()),l=De(e.status??e.state??e.status_label??e.statusLabel??"available"),d=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:Yc(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:l,image:d,imageUrl:d,created_at:e.created_at??null,updated_at:e.updated_at??null}}function Yc(e){return e!=null&&e!==""}function Tn(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function qa(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function Zc(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function pi(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function el(e,t){const n=pi(e),a=pi(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}else{if(r!==i)return r?-1:1;{const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}}const c=Zn(e?.desc||e?.description||e?.name||""),l=Zn(t?.desc||t?.description||t?.name||"");return c.localeCompare(l,"ar",{sensitivity:"base"})}function $e(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function De(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function tl(e){return De(e)}function Ya(){if(!Ji())return null;const e=zc();return e?{...e}:null}function nl(e){const t=Ya();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:r=null}=t,i=t?.mode||t?.source||"",c=[],l=new Set;if(n.forEach(f=>{const m=ee(f?.barcode);!m||l.has(m)||(l.add(m),c.push({variant:f,barcode:m}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(i==="package-manager"||i==="equipment-packages"){const f=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:m})=>m),maxQuantity:f,reason:""}}const d=c.filter(({variant:f})=>Ts(f));if(!a||!s)return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=d.filter(({barcode:f})=>!ct(f,a,s,r));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:f})=>f),maxQuantity:u.length};let y=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(d.length>0)y=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const f=new Set(c.map(({variant:m})=>De(m?.status)));f.has("maintenance")?y=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):f.has("reserved")?y=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):f.has("retired")&&(y=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:y,availableBarcodes:[],maxQuantity:0}}function al(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function Yi(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=Ya();e.hidden=!s;const r=s?.mode||s?.source||"";s?r==="package-manager"||r==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=Ya(),l=c?.mode||c?.source||"";l==="package-manager"||l==="equipment-packages"?Yn("package-finish-button"):(Yn("return-button"),al())}),t.dataset.listenerAttached="true")}function We(){return St}function zt(e){St=Array.isArray(e)?e.map(js):[],Es({equipment:St}),Xc()}function Zn(e){return String(e??"").trim().toLowerCase()}function wt(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=Zn(t);return n||(n=Zn(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function Sa(e){const t=wt(e);return t?We().filter(n=>wt(n)===t):[]}function Ea(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=xa(e);if(n){const a=$e(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${$e(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function Ns(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function ea(){const e=Ns();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function Ls(e={}){const t=Ns();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function tn(e){ha=e;const t=Ns(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function Yu(e){if(!Ot()){Pn();return}if(!e)return;try{await il()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){x(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let l=0;if(i.forEach(d=>{const u=d.القسم??d.category??"",y=d["القسم الثانوي"]??d.subcategory??"",f=d.الوصف??d.description??d.name??"",m=d.الكمية??d.quantity??0,p=d.السعر??d.price??0,g=d.الباركود??d.barcode??"",q=d.الحالة??d.status??"متاح",k=d.الصورة??d.image_url??d.image??"",v=h(String(g||"")).trim();if(!f||!v){l+=1;return}c.push(Bs({category:u,subcategory:y,description:f,quantity:m,unit_price:p,barcode:v,status:q,image_url:k}))}),!c.length){x(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const d=await ot("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(d?.data)?d.data.map(va):[];if(u.length){const m=[...We(),...u];zt(m)}await wa({showToastOnError:!1}),Fe();const y=d?.meta?.count??u.length,f=[];y&&f.push(`${y} ✔️`),l&&f.push(`${l} ⚠️`),x(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(f.length?` (${f.join(" / ")})`:""))}catch(d){const u=ln(d,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");x(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),x(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),x(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const sl="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let fn=null;function il(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):fn||(fn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=sl,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),fn=null,e}),fn)}function Bs({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const l=h(String(r||"")).trim(),d=tl(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:Tn(a),unit_price:qa(s),barcode:l,status:d,image_url:c?.trim()||null}}async function rl(){if(!Ot()){Pn();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await ot("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await wa({showToastOnError:!1}),x(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=ln(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");x(t,"error")}}function xa(e){return e.image||e.imageUrl||e.img||""}function ol(e){const t=De(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function ta(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${$e(a)}</td></tr>`}n&&(n.textContent="0")}function Zi(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=Nt?.groupKey||wt(e);if(!r){ta();return}const i=We().filter(y=>wt(y)===r).sort((y,f)=>{const m=String(y.barcode||"").trim(),p=String(f.barcode||"").trim();return!m&&!p?0:m?p?m.localeCompare(p,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){ta();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),l=o("equipment.form.labels.quantity","الكمية"),d=We(),u=i.map(y=>{const f=y.id&&e.id?String(y.id)===String(e.id):String(y.barcode||"")===String(e.barcode||""),m=f?"equipment-variants-table__row--current":"",p=$e(String(y.barcode||"-")),g=f?`<span class="equipment-variants-current-badge">${$e(c)}</span>`:"",q=h(String(Number.isFinite(Number(y.qty))?Number(y.qty):0)),k=d.indexOf(y),v=$e(o("equipment.item.actions.delete","🗑️ حذف")),S=k>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${k}">${v}</button>
          </div>`:"";return`
        <tr class="${m}">
          <td>
            ${p}
            ${g}
          </td>
          <td>${ol(y.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${$e(l)}">${q}</span>
          </td>
          <td class="table-actions-cell">${S}</td>
        </tr>
      `}).join("");n.innerHTML=u}function cl({item:e,index:t}){const n=xa(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=Ot(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},l=Number.isFinite(Number(e.qty))?Number(e.qty):0,d=Number.isFinite(Number(e.price))?Number(e.price):0,u=l.toLocaleString("en-US"),y=d.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),f=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,m=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,p=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(l-f-m,0),g=p.toLocaleString("en-US"),q=o("equipment.card.labels.availableOfTotal","من أصل"),k=De(e.status);let v=`${$e(c.available)}: ${$e(g)} ${$e(q)} ${$e(u)}`,S="available";if(p===0){const M={reserved:{text:l===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},K=M[k]||M.default;v=$e(K.text),S=K.modifier}const j=`<span class="equipment-card__availability equipment-card__availability--${S}">${v}</span>`,Q="",E=e.desc||e.name||"—",I=e.name&&e.name!==e.desc?e.name:"",P=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${y} ${r}`}].map(({label:M,value:K})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${M}</span>
              <span class="equipment-card__detail-value">${K}</span>
            </span>
          `).join("")}
    </div>`,H=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),_=H.length?`<div class="equipment-card__categories">${H.map(({label:M,value:K})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${M}</span>
              <span class="equipment-card__detail-value">${K}</span>
            </div>
          `).join("")}</div>`:"",L=I?`<div class="equipment-card__alias">
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
      ${P}
    </div>
  `,B=[],A=nl(e),X=A?.availableBarcodes?.length?A.availableBarcodes.join(","):A?.barcode?A.barcode:"";let U="",D="";if(A.active){const M=`equipment-select-qty-${t}`,K=!!A.canSelect,se=K?Math.max(1,Number(A.maxQuantity||A.availableBarcodes?.length||1)):1,te=Math.max(1,Math.min(se,99)),ue=[];for(let ne=1;ne<=te;ne+=1){const Ee=h(String(ne));ue.push(`<option value="${ne}"${ne===1?" selected":""}>${Ee}</option>`)}const J=K?"":" disabled",oe=o("reservations.create.equipment.selector.quantityLabel","الكمية"),qe=K?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${h(String(se))}`:A.reason?A.reason:"";U=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${M}">${oe}</label>
        <select class="equipment-card__quantity-select" id="${M}" data-equipment-select-quantity${J}>
          ${ue.join("")}
        </select>
        ${qe?`<span class="equipment-card__selection-hint">${$e(qe)}</span>`:""}
      </div>
    `;const Se=o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),Ce=K?"":" disabled",V=A.reason?` title="${$e(A.reason)}"`:"",Z=['data-equipment-action="select-reservation"',`data-selection-max="${K?se:0}"`];X&&Z.push(`data-selection-barcodes="${$e(X)}"`),e.groupKey&&Z.push(`data-selection-group="${$e(String(e.groupKey))}"`),D=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${Z.join(" ")}${Ce}${V}>${Se}</button>
    `}i&&B.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const F=B.length?B.join(`
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
        ${Q}
        ${j}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${C}
        </div>
      </div>
      <div class="equipment-card__body">
        ${_}
        ${L}
      </div>
      ${U||D||F?`<div class="equipment-card__actions equipment-card__actions--center">
            ${U}
            ${D}
            ${F}
          </div>`:""}
    </article>
  `}function ll(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,a.appendChild(l)}),t.includes(i)&&(a.value=i),Vn(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,s.appendChild(l)}),n.includes(i)&&(s.value=i),Vn(s)}const r=document.getElementById("filter-status");r&&Vn(r)}function jn(){const e=ye();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return St=t||[],St;const s=new Date;let r=!1;const i=new Set((a||[]).filter(l=>l?.status==="open").map(l=>h(String(l?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(l=>{if(!l)return l;const d=De(l.status),u=h(String(l.barcode??"")).trim().toLowerCase(),y=u&&i.has(u);let f=y?"maintenance":"available";if(!y&&u)for(const m of n||[]){if(!dl(m,s))continue;if(m.items?.some(g=>h(String(g?.barcode??"")).trim().toLowerCase()===u)){f="reserved";break}}return f!==d?(r=!0,{...l,status:f}):{...l,status:f}});return r?zt(c):(St=c,Es({equipment:St})),St}function dl(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function za(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Fe(){const e=document.getElementById("equipment-list");if(!e)return;Yi();const t=jn(),n=Array.isArray(t)?t:We(),a=new Map;n.forEach(g=>{if(!g)return;const q=wt(g);q&&(a.has(q)||a.set(q,[]),a.get(q).push(g))});const s=Array.from(a.values()).map(g=>{const q=g[0],k=g.reduce((I,$)=>I+(Number.isFinite(Number($.qty))?Number($.qty):0),0),v=["maintenance","reserved","available","retired"],S=g.map(I=>De(I.status)).sort((I,$)=>v.indexOf(I)-v.indexOf($))[0]||"available",j=g.reduce((I,$)=>{const P=Tn($?.qty??0)||0,H=De($?.status);return H==="reserved"?I.reserved+=P:H==="maintenance"&&(I.maintenance+=P),I},{reserved:0,maintenance:0}),Q=Math.max(k-j.reserved-j.maintenance,0);return{item:{...q,qty:k,status:S,variants:g,groupKey:wt(q),reservedQty:j.reserved,maintenanceQty:j.maintenance,availableQty:Q},index:n.indexOf(q)}});s.sort((g,q)=>el(g.item,q.item));const r=document.getElementById("search-equipment")?.value||"",i=h(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",l=document.getElementById("filter-sub")?.value||"",d=document.getElementById("filter-status")?.value||"",u=d?De(d):"";if(Ja&&!n.length){e.innerHTML=za(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(vn&&!n.length){e.innerHTML=za(vn,{tone:"error",icon:"⚠️"});return}const y=s.filter(({item:g})=>{const q=h(String(g.barcode??"")).toLowerCase().trim(),k=Array.isArray(g.variants)?g.variants.map(E=>h(String(E.barcode??"")).toLowerCase().trim()).filter(Boolean):[],v=!i||g.name&&g.name.toLowerCase().includes(i)||g.desc&&g.desc.toLowerCase().includes(i)||q&&q.includes(i)||k.some(E=>E.includes(i))||g.category&&g.category.toLowerCase().includes(i)||g.sub&&g.sub.toLowerCase().includes(i),S=!c||g.category===c,j=!l||g.sub===l,Q=!u||De(g.status)===u;return v&&S&&j&&Q}),f=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),m=y;e.innerHTML=m.length?m.map(cl).join(""):za(f);const p=document.getElementById("equipment-list-count");if(p){const g=o("equipment.list.countSuffix","عنصر"),q=h(String(m.length)),k=m.length?`${q} ${g}`:`0 ${g}`;p.textContent=k}ll(n)}async function wa({showToastOnError:e=!0}={}){Ja=!0,vn="",Fe();try{const t=await ot("/equipment/?all=1"),n=Array.isArray(t?.data)?t.data.map(va):[];zt(n)}catch(t){vn=ln(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&x(vn,"error")}finally{Ja=!1,Fe()}}function ln(e,t,n){if(e instanceof Li){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function ul(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),r=qa(t.querySelector("#new-equipment-price")?.value||"0"),i=Tn(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",l=t.querySelector("#new-equipment-category")?.value?.trim()||"",d=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){x(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const y=Bs({category:l,subcategory:d,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const f=await ot("/equipment/",{method:"POST",body:y}),m=va(f?.data),p=[...We(),m];zt(p),Fe(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),x(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(f){const m=ln(f,"equipment.toast.addFailed","تعذر إضافة المعدة");x(m,"error")}}async function er(e){if(!Ot()){Pn();return}const t=We(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await ot(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),zt(a),Fe(),x(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=ln(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");x(s,"error")}}async function ml(e,t){const n=We(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},zt(r),Fe();return}const s=Bs({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await ot(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=va(r?.data),c=[...n];c[e]=i,zt(c),Fe(),x(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=ln(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw x(i,"error"),r}}function zn(){Fe()}function tr(e){const n=We()[e];if(!n)return;Rt=e;const a=Sa(n),s=a[0]||n,r=a.reduce((l,d)=>l+(Number.isFinite(Number(d.qty))?Number(d.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(l=>De(l.status)).sort((l,d)=>i.indexOf(l)-i.indexOf(d))[0]||De(s.status);document.getElementById("edit-equipment-index").value=e,Ls({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:xa(s)||"",barcode:s.barcode||"",status:s.status||c}),tn(!1),Mt=ea(),Ea(s),Zi(s),Nt={groupKey:wt(s),barcode:String(s.barcode||""),id:s.id||null},Wc(document.getElementById("editEquipmentModal"))?.show()}function pl(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),r=s?.querySelector("[data-equipment-select-quantity]");let i=Number.parseInt(r?.value||"1",10);(!Number.isFinite(i)||i<=0)&&(i=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&i>c&&(i=c);const d=(t.dataset.selectionBarcodes||"").split(",").map(m=>m.trim()).filter(m=>m.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",y=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";Hc({barcodes:d,quantity:i,groupKey:y,description:u})||x(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||er(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||tr(s)}}function fl(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||tr(n)}}function yl(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||er(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function nr(){if(!Nt||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=We(),a=Nt.id?n.find(l=>String(l.id)===String(Nt.id)):null,s=Nt.groupKey,r=s?n.find(l=>wt(l)===s):null,i=a||r;if(!i){ta();return}const c=n.findIndex(l=>l===i);if(c>=0){const l=document.getElementById("edit-equipment-index");l&&(l.value=String(c)),Rt=c}if(Zi(i),!ha){const l=Sa(i),d=l[0]||i,u=l.reduce((m,p)=>m+(Number.isFinite(Number(p.qty))?Number(p.qty):0),0),y=["maintenance","reserved","available","retired"],f=l.map(m=>De(m.status)).sort((m,p)=>y.indexOf(m)-y.indexOf(p))[0]||De(d.status);Ls({category:d.category||"",subcategory:d.sub||"",description:d.desc||d.description||"",quantity:String(u||d.qty||0),price:d.price!=null?String(d.price):"0",image:xa(d)||"",barcode:d.barcode||"",status:d.status||f}),Mt=ea()}Ea(primary)}function bl(){document.getElementById("search-equipment")?.addEventListener("input",zn),document.getElementById("filter-category")?.addEventListener("change",zn),document.getElementById("filter-sub")?.addEventListener("change",zn),document.getElementById("filter-status")?.addEventListener("change",zn),document.getElementById("add-equipment-form")?.addEventListener("submit",ul);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),rl().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",pl),t.addEventListener("keydown",fl),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",yl),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);Zc(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!ha){Mt=ea(),tn(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){x(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:Tn(document.getElementById("edit-equipment-quantity").value)||1,price:qa(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await ml(t,n),Mt=ea(),tn(!1),nr()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{bl(),Fe(),wa();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(Mt&&Ls(Mt),Rt!=null){const a=We()[Rt];if(a){const r=Sa(a)[0]||a;Ea(r)}}tn(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Fe(),tn(ha),Rt!=null){const t=We()[Rt];if(t){const a=Sa(t)[0]||t;Ea(a)}}});document.addEventListener("equipment:refreshRequested",()=>{wa({showToastOnError:!1})});document.addEventListener(uc.USER_UPDATED,()=>{Fe()});document.addEventListener("equipment:changed",()=>{nr()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{Nt=null,ta(),Rt=null,Mt=null,tn(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!mi&&(document.addEventListener(cn.change,()=>{Yi(),Fe()}),mi=!0);const ar="projects:create:draft",sr="projects.html#projects-section";let Za=null,ir=[],es=new Map,ts=new Map,na=new Map,Ha=!1,Kn=null,fi=!1,rr=[];function gl(e){if(!e)return null;let t=rr.find(a=>a.id===e)||null;if(t)return t;const n=bc(e);return n?(t={id:e,name:hc(n)||e,price:gc(n),items:ws(n),raw:n},t):null}function aa(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function sa(e){return h(String(e||"")).trim().toLowerCase()}function hl(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function or(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function cr(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function lr(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function dr(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function Ht(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function Ds(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function Kt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Ke(){const{input:e,hidden:t}=Kt();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function Tt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function ur(e,t,{allowPartial:n=!1}={}){const a=He(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function ns(e,t={}){return ur(es,e,t)}function as(e,t={}){return ur(ts,e,t)}function Qe(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function mr(e){ir=Array.isArray(e)?[...e]:[]}function Fs(){return ir}function Rs(e){return e&&Fs().find(t=>String(t.id)===String(e))||null}function yi(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function nn(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??xt,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:xt}function Ze(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??xt,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=xt),t.dataset.companyShare=String(s),t.checked=!0}function ss(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(Ha){de();return}Ha=!0;const a=()=>{Ha=!1,de()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(xt)),t.disabled){n.checked=!1,x(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),Ze()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Ze():n.checked&&(n.checked=!1));a()}function vl(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function bi(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function gi(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function yt({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=Ds();if(!n||!a||!s)return;const r=xs()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const l=new Set;es=new Map;const d=r.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:gi(m)||c})).filter(m=>{if(!m.label)return!1;const p=He(m.label);return!p||l.has(p)?!1:(l.add(p),es.set(p,m),!0)}).sort((m,p)=>m.label.localeCompare(p.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(m=>`<option value="${aa(m.label)}"></option>`).join("");const u=t?"":n.value,y=e?String(e):a.value?String(a.value):"",f=y?r.find(m=>String(m.id)===y):null;if(f){const m=gi(f)||c;a.value=String(f.id),n.value=m,n.dataset.selectedId=String(f.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function an({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=Kt();if(!a||!s||!r)return;const i=Array.isArray(t)?t:Fs()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const l=[...i].filter(g=>g&&g.id!=null).sort((g,q)=>String(q.createdAt||q.start||"").localeCompare(String(g.createdAt||g.start||""))),d=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),y=new Set;ts=new Map;const f=l.map(g=>{const q=yi(g)||u;return{id:String(g.id),label:q}}).filter(g=>{if(!g.label)return!1;const q=He(g.label);return!q||y.has(q)?!1:(y.add(q),ts.set(q,g),!0)});r.innerHTML=f.map(g=>`<option value="${aa(g.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",p=m?l.find(g=>String(g.id)===m):null;if(p){const g=yi(p)||u;s.value=String(p.id),a.value=g,a.dataset.selectedId=String(p.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function ia(e,t,n){const{date:a,time:s}=Ri(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function pr(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||an({selectedValue:a});const r=(xs()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";yt(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=bi(e,"start"),l=bi(e,"end");c&&ia("res-start","res-start-time",c),l&&ia("res-end","res-end-time",l);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),de(),At()}function fr({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:ye(),s=Array.isArray(a)?a:[];mr(s);const r=t!=null?String(t):n.value?String(n.value):"";an({selectedValue:r,projectsList:s}),At(),de()}function At(){const{input:e,hidden:t}=Kt(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),l=document.getElementById("res-discount-type"),d=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),y=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(Tt(n,Ke),a&&Tt(a,Ke)),s&&Tt(s,Ke),r&&Tt(r,Ke),i&&Tt(i,Ke),c&&Tt(c,Ke),l&&Tt(l,Ke),y)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=d),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=d),s&&(s.value="unpaid",Qe(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=d),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=d),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=d),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=d),l&&(l.value="percent",l.disabled=!0,l.classList.add("reservation-input-disabled"),l.title=d);else{if(n){const f=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",f&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.disabled=!1,l.classList.remove("reservation-input-disabled"),l.title="")}ss("tax"),de()}function Ms(){const{input:e,hidden:t}=Kt();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?as(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=Rs(r.id);i?pr(i,{skipProjectSelectUpdate:!0}):(At(),de())}else t.value="",e.dataset.selectedId="",At(),de()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?as(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function zs(){const{input:e,hidden:t}=Ds();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?ns(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),de()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?ns(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function ql(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){qn({clearValue:!0});return}let n=null;try{const d=decodeURIComponent(t);n=JSON.parse(d)}catch(d){console.warn("⚠️ [reservations/createForm] Failed to decode project context",d)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),qn({clearValue:!1}),!n)return;n.fromProjectForm&&(Kn={draftStorageKey:n.draftStorageKey||ar,returnUrl:n.returnUrl||sr});const r=document.getElementById("res-project");if(n.projectId){r&&(an({selectedValue:String(n.projectId)}),At());const d=Rs(n.projectId);d?pr(d,{forceNotes:!!n.forceNotes}):de(),qn()}else{r&&an({selectedValue:""});const d=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");Ll(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),d)}n.start&&ia("res-start","res-start-time",n.start),n.end&&ia("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(xs()||[]).find(y=>String(y.id)===String(n.customerId));u?.id!=null&&(yt({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(yt({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):yt({selectedValue:""});const l=document.getElementById("res-notes");l&&n.description&&!l.value&&(l.value=n.description),de()}function Qt(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:wn(e,n),end:wn(t,a)}}function yr(e){const t=sa(e);if(t){const c=na.get(t);if(c)return c}const{description:n,barcode:a}=or(e);if(a){const c=ga(a);if(c)return c}const s=He(n||e);if(!s)return null;let r=Oi();if(!r?.length){const c=ye();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&Vi(r)}const i=r.find(c=>He(c?.desc||c?.description||"")===s);return i||r.find(c=>He(c?.desc||c?.description||"").includes(s))||null}function br(e,t="equipment-description-options"){const n=sa(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(l=>sa(l.value)===n)||na.has(n))return!0;const{description:s}=or(e);if(!s)return!1;const r=He(s);return r?(Oi()||[]).some(c=>He(c?.desc||c?.description||"")===r):!1}const Sl={available:0,reserved:1,maintenance:2,retired:3};function El(e){return Sl[e]??5}function hi(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function xl(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${hi(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${hi(n)})`}function It(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=jn(),a=ye(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];Vi(r);const i=new Map;r.forEach(d=>{const u=hl(d),y=sa(u);if(!y||!u)return;const f=gt(d),m=El(f),p=i.get(y);if(!p){i.set(y,{normalized:y,value:u,bestItem:d,bestStatus:f,bestPriority:m,statuses:new Set([f])});return}p.statuses.add(f),m<p.bestPriority&&(p.bestItem=d,p.bestStatus=f,p.bestPriority=m,p.value=u)}),na=new Map;const l=Array.from(i.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{na.set(d.normalized,d.bestItem);const u=xl(d),y=aa(d.value);if(u===d.value)return`<option value="${y}"></option>`;const f=aa(u);return`<option value="${y}" label="${f}"></option>`}).join("");e&&(e.innerHTML=l),t&&(t.innerHTML=l)}function gr(e,t,n={}){const{silent:a=!1}=n,s=ee(e);if(!s)return{success:!1,message:null};const{start:r,end:i}=Qt();if(!r||!i){const p=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||x(p),{success:!1,message:p}}const c=lt();if(Hs(c).has(s)){const p=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||x(p),{success:!1,message:p}}const d=As(s,r,i);if(d.length){const p=d.map(q=>q.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${p}`);return a||x(g),{success:!1,message:g}}if(ct(s,r,i)){const p=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||x(p),{success:!1,message:p}}const u=ga(s);if(!u){const p=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||x(p),{success:!1,message:p}}const y=gt(u);if(y==="maintenance"||y==="retired"){const p=Ht(y);return a||x(p),{success:!1,message:p}}const f=Vt(u);if(!f){const p=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||x(p),{success:!1,message:p}}pa({id:f,equipmentId:f,barcode:s,desc:u.desc,qty:1,price:u.price,image:Ut(u)}),t&&(t.value=""),ht(),de();const m=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||x(m),{success:!0,message:m,barcode:s}}function is(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=yr(t);if(!n){x(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=Qc(n.barcode),s=gt(a||n);if(s==="maintenance"||s==="retired"){x(Ht(s));return}const r=ee(n.barcode);if(!r){x(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=Vt(n);if(!i){x(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Ut(n)},{start:l,end:d}=Qt();if(!l||!d){x(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=lt();if(Hs(u).has(r)){x(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const f=As(r,l,d);if(f.length){const m=f.map(p=>p.name).join(", ");x(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`));return}if(ct(r,l,d)){x(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}pa(c),ht(),de(),x(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function wl(){It();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),is(e))});const t=()=>{br(e.value,"equipment-description-options")&&is(e)};e.addEventListener("focus",()=>{if(It(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function vi(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function Hs(e=lt()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=ee(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const r=ee(s?.normalizedBarcode??s?.barcode);r&&t.add(r)})}),t}function Al(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=Qt();if(!t||!n){x(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}Mc({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):x(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(cn.change,t=>{vi(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),vi(e,Ji()))}function Il(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,r=a.length?a:t.barcode?[t.barcode]:[];if(!r.length)return;let i=0,c=null;const l=[],d=new Set;r.forEach(y=>{const f=ee(y);f&&!d.has(f)&&(d.add(f),l.push(f))});const u=Math.min(s,l.length);for(let y=0;y<u;y+=1){const f=l[y],m=gr(f,null,{silent:!0});m.success&&(i+=1),m.message&&(c=m.message)}if(i>0){const f=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",h(String(i)));x(f)}else c&&x(c)}function hr(){Al(),!(fi||typeof document>"u")&&(document.addEventListener(cn.requestAdd,Il),fi=!0)}function Nn(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),r=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:r}}function rs(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=Nn();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const r=document.getElementById("equipment-barcode"),i=document.getElementById("equipment-description"),c=t==="package";r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),xc(t),t==="package"&&Aa()}function Aa(){const{packageSelect:e,packageHint:t}=Nn();if(!e)return;const n=Di();rr=n,fc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,r=n.map(c=>{const l=Number.isFinite(Number(c.price))?Number(c.price):0,d=h(l.toFixed(2)),u=`${c.name} — ${d} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${r}`,e.selectedIndex=0;const i=n.length>0;e.disabled=!i,t&&(i?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),Sr()}function kl(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:r,blockingPackages:i})=>{const c=r?.desc||h(String(r?.barcode??r?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(i)&&i.length){const l=i.map(d=>d.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${l})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function vr(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const r=An(e);if(!r)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const i=gl(r);if(!i)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(m=>m?.type==="package"&&An(m.packageId)===r))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(yc(r,n,a,s)){const m=i.name||r;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${m} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(i.items)&&i.items.length?i.items:ws(i.raw??{}),l=Hs(t),d=[],u=new Set;if(c.forEach(m=>{const p=ee(m?.normalizedBarcode??m?.barcode);if(p){if(u.has(p)){d.push({item:m,type:"internal"});return}u.add(p),l.has(p)&&d.push({item:m,type:"external"})}}),d.length){const m=d.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>h(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:d.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",m):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",m),duplicates:d}}const y=[];return c.forEach(m=>{const p=ee(m?.normalizedBarcode??m?.barcode);if(p&&ct(p,n,a,s)){const g=As(p,n,a,s);y.push({item:m,blockingPackages:g})}}),y.length?{success:!1,reason:"item_conflict",message:kl(i,y),conflicts:y}:{success:!0,package:{id:`package::${r}`,packageId:r,type:"package",desc:i.name||`Package ${r}`,qty:1,price:Number.isFinite(Number(i.price))?Number(i.price):0,barcode:i.code||i.raw?.package_code||`pkg-${r}`,packageItems:c.map(m=>({equipmentId:m?.equipmentId??null,barcode:m?.barcode??m?.normalizedBarcode??"",normalizedBarcode:ee(m?.normalizedBarcode??m?.barcode),desc:m?.desc??"",qty:Number.isFinite(Number(m?.qty))?Number(m.qty):1,price:Number.isFinite(Number(m?.price))?Number(m.price):0})),image:c.find(m=>m?.image)?.image??null},packageInfo:i}}function qr(e,{silent:t=!1}={}){const n=An(e);if(!n)return t||x(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=Qt(),r=lt(),i=vr(n,{existingItems:r,start:a,end:s});if(!i.success){if(!t){const l={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[i.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");x(i.message||l)}return i}return pa(i.package),ht(),de(),t||x(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:i.package}}function Sr(){const{packageSelect:e}=Nn();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;qr(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function _l(){const{packageAddButton:e,packageSelect:t}=Nn();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){x(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}qr(n)}),e.dataset.listenerAttached="true")}function Er(){const{modeRadios:e}=Nn();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&rs(s.target.value)}),a.dataset.listenerAttached="true")}),_l(),Sr();const t=Xn(),n=e.find(a=>a.value===t);n&&(n.checked=!0),rs(t)}function ht(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=lt(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),l=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=rn(n);t.innerHTML=d.map(u=>{const y=u.items[0]||{},f=Ut(y)||u.image,m=f?`<img src="${f}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',p=h(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,q=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,k=`${h(g.toFixed(2))} ${s}`,v=`${h(q.toFixed(2))} ${s}`,S=u.items.some(I=>I?.type==="package"),j=u.barcodes.map(I=>h(String(I||""))).filter(Boolean),Q=j.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${j.map(I=>`<li>${I}</li>`).join("")}
            </ul>
          </details>`:"";let E="";if(S){const I=new Map;if(u.items.forEach($=>{Array.isArray($?.packageItems)&&$.packageItems.forEach(P=>{if(!P)return;const H=ee(P.barcode||P.desc||Math.random()),_=I.get(H);if(_){_.qty+=Number.isFinite(Number(P.qty))?Number(P.qty):1;return}I.set(H,{desc:P.desc||P.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(P.qty))?Number(P.qty):1,barcode:P.barcode??P.normalizedBarcode??""})})}),I.size){const $=Array.from(I.values()).map(P=>{const H=h(String(P.qty)),_=P.desc||h(String(P.barcode||"")),L=P.barcode?` <span class="reservation-package-items__barcode">(${h(String(P.barcode))})</span>`:"";return`<li>${_}${L} × ${H}</li>`}).join("");E=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${$}
              </ul>
            </details>
          `}}return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${m}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${S?`${E||""}${Q||""}`:Q}
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
          <td>${k}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${l}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function $l(e){const t=lt(),a=rn(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(qc(s),ht(),de())}function Pl(e){const t=lt(),n=t.filter(a=>fa(a)!==e);n.length!==t.length&&(Mi(n),ht(),de())}function Cl(e){const t=lt(),a=rn(t).find(y=>y.key===e);if(!a)return;const{start:s,end:r}=Qt();if(!s||!r){x(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(y=>ee(y.barcode))),{equipment:c=[]}=ye(),l=(c||[]).find(y=>{const f=ee(y?.barcode);return!f||i.has(f)||fa({desc:y?.desc||y?.description||y?.name||"",price:Number(y?.price)||0})!==e||!Ts(y)?!1:!ct(f,s,r)});if(!l){x(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=ee(l.barcode),u=Vt(l);if(!u){x(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}pa({id:u,equipmentId:u,barcode:d,desc:l.desc||l.description||l.name||a.description||"",qty:1,price:Number.isFinite(Number(l.price))?Number(l.price):a.unitPrice,image:Ut(l)}),ht(),de()}function de(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),l=c?.value||"unpaid",{start:d,end:u}=Qt();i&&Ze();const y=nn(),f=document.getElementById("res-payment-progress-type"),m=document.getElementById("res-payment-progress-value"),p=cr(f),g=lr(m);Fi(),di({selectedItems:lt(),discount:n,discountType:s,applyTax:i,paidStatus:l,paymentProgressType:p,paymentProgressValue:g,start:d,end:u,companySharePercent:y,paymentHistory:[]});const q=di.lastResult;q?(dr(m,q.paymentProgressValue),c&&(c.value=q.paymentStatus,Qe(c,q.paymentStatus))):Qe(c,l)}function Tl(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=h(c.target.value),de()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",de),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(Ke()){n.checked=!1,x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}ss("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(Ke()){a.checked=!1,x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}ss("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(Ke()){s.value="unpaid",Qe(s,"unpaid"),x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Qe(s),de()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(Ke()){r.value="percent",x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",de()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(Ke()){i.value="",x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=h(c.target.value),de()}),i.dataset.listenerAttached="true"),de()}function jl(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){de();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),de()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function qi(){const{input:e,hidden:t}=Ds(),{input:n,hidden:a}=Kt(),{customers:s}=ye();let r=t?.value?String(t.value):"";if(!r&&e?.value){const J=ns(e.value,{allowPartial:!0});J&&(r=String(J.id),t&&(t.value=r),e.value=J.label,e.dataset.selectedId=r)}const i=s.find(J=>String(J.id)===r);if(!i){x(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let l=a?.value?String(a.value):"";if(!l&&n?.value){const J=as(n.value,{allowPartial:!0});J&&(l=String(J.id),a&&(a.value=l),n.value=J.label,n.dataset.selectedId=l)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,y=document.getElementById("res-start-time")?.value||"00:00",f=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){x(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${d}T${y}`,p=`${u}T${f}`,g=new Date(m),q=new Date(p);if(Number.isNaN(g.getTime())||Number.isNaN(q.getTime())||g>=q){x(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const k=Fi();k.map(J=>J.technicianId).filter(Boolean);const v=lt();if(v.length===0&&k.length===0){x(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const S=document.getElementById("res-notes")?.value||"",j=parseFloat(h(document.getElementById("res-discount")?.value))||0,Q=document.getElementById("res-discount-type")?.value||"percent",E=document.getElementById("res-payment-status"),I=E?.value||"unpaid",$=document.getElementById("res-payment-progress-type"),P=document.getElementById("res-payment-progress-value"),H=cr($),_=lr(P),L=l?Rs(l):null,G=vl(L);if(l&&!L){x(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const J of v){const oe=gt(J.barcode);if(oe==="maintenance"||oe==="retired"){x(Ht(oe));return}}for(const J of v){const oe=ee(J.barcode);if(ct(oe,m,p)){x(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const J of k)if(J?.technicianId&&zi(J.technicianId,m,p)){x(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const C=document.getElementById("res-tax"),B=document.getElementById("res-company-share"),A=!!l;A?(C&&(C.checked=!1,C.disabled=!0,C.classList.add("disabled"),C.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),B&&(B.checked=!1,B.disabled=!0,B.classList.add("disabled"),B.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),E&&(E.value="unpaid",E.disabled=!0,Qe(E,"unpaid"),E.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),$&&($.disabled=!0,$.classList.add("disabled")),P&&(P.value="",P.disabled=!0,P.classList.add("disabled"))):(C&&(C.disabled=!1,C.classList.remove("disabled"),C.title=""),B&&(B.disabled=!1,B.classList.remove("disabled"),B.title=""),E&&(E.disabled=!1,E.title=""),$&&($.disabled=!1,$.classList.remove("disabled")),P&&(P.disabled=!1,P.classList.remove("disabled")));const X=A?!1:C?.checked||!1,U=!!B?.checked;if(!A&&U!==X){x(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let D=U?nn():null;U&&(!Number.isFinite(D)||D<=0)&&(Ze(),D=nn());const F=U&&X&&Number.isFinite(D)&&D>0;X&&Ze();const R=Is(v,j,Q,X,k,{start:m,end:p,companySharePercent:F?D:0}),M=mc(),K=ks({totalAmount:R,progressType:H,progressValue:_,history:[]});P&&dr(P,K.paymentProgressValue);const se=[];K.paymentProgressValue!=null&&K.paymentProgressValue>0&&se.push({type:K.paymentProgressType||H,value:K.paymentProgressValue,amount:K.paidAmount,percentage:K.paidPercent,recordedAt:new Date().toISOString()});const te=_s({manualStatus:I,paidAmount:K.paidAmount,paidPercent:K.paidPercent,totalAmount:R});E&&(E.value=te,Qe(E,te));const ue=Hi({reservationCode:M,customerId:c,start:m,end:p,status:G?"confirmed":"pending",title:null,location:null,notes:S,projectId:l||null,totalAmount:R,discount:A?0:j,discountType:A?"percent":Q,applyTax:X,paidStatus:A?"unpaid":te,confirmed:G,items:v.map(J=>({...J,equipmentId:J.equipmentId??J.id})),crewAssignments:k,companySharePercent:A||!F?null:D,companyShareEnabled:A?!1:F,paidAmount:A?0:K.paidAmount,paidPercentage:A?0:K.paidPercent,paymentProgressType:A?null:K.paymentProgressType,paymentProgressValue:A?null:K.paymentProgressValue,paymentHistory:A?[]:se});try{const J=await Sc(ue);jn(),It(),Cn(),Bl(),x(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Za=="function"&&Za({type:"created",reservation:J}),Nl(J)}catch(J){console.error("❌ [reservations/createForm] Failed to create reservation",J);const oe=ya(J)?J.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");x(oe,"error"),A&&(x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),qn({clearValue:!1}))}}function Nl(e){if(!Kn)return;const{draftStorageKey:t=ar,returnUrl:n=sr}=Kn,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}Kn=null,n&&(window.location.href=n)}function qn({clearValue:e=!1}={}){const{input:t,hidden:n}=Kt();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,At())}function Ll(e,t=""){const{input:n,hidden:a}=Kt();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),At())}function Bl(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),yt({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),qn({clearValue:!1}),an({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",Qe(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),Ec(),Mi([]),Yn("form-reset"),ht(),At(),de()}function Dl(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){$l(s);return}if(a==="increase-group"&&s){Cl(s);return}if(a==="remove-group"&&s){Pl(s);return}}),e.dataset.listenerAttached="true")}function Fl(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(Xn()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,gr(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||Xn()!=="single")return;const{start:r,end:i}=Qt();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function Rl(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await qi()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await qi()}),t.dataset.listenerAttached="true")}function Zu({onAfterSubmit:e}={}){Za=typeof e=="function"?e:null;const{customers:t,projects:n}=ye();vc(t||[]),yt(),zs(),mr(n||[]),fr({projectsList:n}),Ms(),It(),Aa(),wl(),hr(),Er(),jl(),Tl(),Dl(),Fl(),Rl(),ql(),de(),ht()}function xr(){It(),Aa(),fr(),yt(),zs(),Ms(),hr(),Er(),ht(),de()}if(typeof document<"u"){const e=()=>{yt(),an({projectsList:Fs()}),zs(),Ms(),de()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{It()}),document.addEventListener("packages:changed",()=>{Aa(),Xn()==="package"&&rs("package")})}typeof window<"u"&&(window.getCompanySharePercent=nn);function wr(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:jt(t),endDate:jt(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:jt(n),endDate:jt(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:jt(n),endDate:jt(a)}}return e==="upcoming"?{startDate:jt(t),endDate:""}:{startDate:"",endDate:""}}function Ml(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=h(t?.value||"").trim(),i=h(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),ra(t),ra(n),r="",i=""),!r&&!i&&c){const d=wr(c);r=d.startDate,i=d.endDate}return{searchTerm:He(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function em(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{zl(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),ra(a),ra(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function zl(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=wr(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function jt(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function ra(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function Hn(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function Hl(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function Ol(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=Hl(n);if(a!==null)return a}return null}function Si(e,t=0){const n=Ol(e);if(n!=null)return n;const a=Hn(e.createdAt??e.created_at);if(a!=null)return a;const s=Hn(e.updatedAt??e.updated_at);if(s!=null)return s;const r=Hn(e.start);if(r!=null)return r;const i=Hn(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function Vl({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((v,S)=>({reservation:v,index:S})),i=t.searchTerm||"",c=t.searchReservationId||"",l=t.searchCustomerName||"",d=t.searchProjectId||"",u=t.startDate||"",y=t.endDate||"",f=t.status||"",m=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,p=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,q=y?new Date(`${y}T23:59:59`):null,k=r.filter(({reservation:v})=>{const S=n.get(String(v.customerId)),j=s?.get?.(String(v.projectId)),Q=v.start?new Date(v.start):null,E=$s(v),{effectiveConfirmed:I}=kt(v,j);if(m!=null&&String(v.customerId)!==String(m)||p!=null&&!(Array.isArray(v.technicians)?v.technicians.map(L=>String(L)):[]).includes(String(p))||f==="confirmed"&&!I||f==="pending"&&I||f==="completed"&&!E||g&&Q&&Q<g||q&&Q&&Q>q)return!1;if(c){const _=[v.reservationId,v.id,v.reservation_id,v.reservationCode,v.reservation_code,v.code,v.reference,v.referenceNumber,v.reference_number],L=He(_.filter(C=>C!=null&&C!=="").map(String).join(" ")).replace(/\s+/g,""),G=c.replace(/\s+/g,"");if(!L.includes(G))return!1}if(l&&!He(S?.customerName||"").includes(l))return!1;if(d){const _=[v.projectId,v.project_id,v.projectID,j?.id,j?.projectCode,j?.project_code],L=He(_.filter(C=>C!=null&&C!=="").map(String).join(" ")).replace(/\s+/g,""),G=d.replace(/\s+/g,"");if(!L.includes(G))return!1}if(!i)return!0;const $=v.items?.map?.(_=>`${_.barcode} ${_.desc}`).join(" ")||"",P=(v.technicians||[]).map(_=>a.get(String(_))?.name).filter(Boolean).join(" ");return He([v.reservationId,S?.customerName,v.notes,$,P,j?.title].filter(Boolean).join(" ")).includes(i)});return k.sort((v,S)=>{const j=Si(v.reservation,v.index),Q=Si(S.reservation,S.index);return j!==Q?Q-j:S.index-v.index}),k}function Ul({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),l=o("reservations.list.itemsCountShort","{count} عنصر"),d=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),y=o("reservations.list.status.pending","⏳ غير مؤكد"),f=o("reservations.list.payment.paid","💳 مدفوع"),m=o("reservations.list.payment.unpaid","💳 غير مدفوع"),p=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),g=o("reservations.list.actions.confirm","✔️ تأكيد"),q=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),k=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),v={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:S,index:j})=>{const Q=t.get(String(S.customerId)),E=S.projectId?a?.get?.(String(S.projectId)):null,I=$s(S),$=S.paidStatus??S.paid_status??(S.paid===!0||S.paid==="paid"?"paid":"unpaid"),P=$==="paid",H=$==="partial",{effectiveConfirmed:_,projectLinked:L}=kt(S,E),G=_?"status-confirmed":"status-pending",C=P?"status-paid":H?"status-partial":"status-unpaid";let B=`<span class="reservation-chip status-chip ${G}">${_?u:y}</span>`;const A=P?f:H?p:m;let X=`<span class="reservation-chip status-chip ${C}">${A}</span>`,U=P?" tile-paid":H?" tile-partial":" tile-unpaid";I&&(U+=" tile-completed");let D="";I&&(B=`<span class="reservation-chip status-chip status-completed">${u}</span>`,X=`<span class="reservation-chip status-chip status-completed">${A}</span>`,D=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const F=!L&&!_?`<button class="tile-confirm" data-reservation-index="${j}" data-action="confirm">${g}</button>`:"",R=F?`<div class="tile-actions">${F}</div>`:"",M=S.items?.length||0,K=Array.isArray(S.crewAssignments)?S.crewAssignments:[],se=(S.technicians||[]).map(ae=>n.get(String(ae))).filter(Boolean),te=K.length?K.map(ae=>{const Y=ae.positionLabel??ae.position_name??ae.role??o("reservations.crew.positionFallback","منصب بدون اسم"),be=ae.technicianName??n.get(String(ae.technicianId??""))?.name??null;return be?`${h(Y)} (${h(be)})`:h(Y)}):se.map(ae=>ae.name),ue=te.length?te.join(d):"—",J=h(String(S.reservationId??"")),oe=S.start?h(Ge(S.start)):"-",qe=S.end?h(Ge(S.end)):"-",Se=h(String(S.cost??0)),Ce=h(String(M)),V=S.notes?h(S.notes):c,Z=l.replace("{count}",Ce),ne=S.applyTax?`<small>${r}</small>`:"";let Ee=q;return S.projectId&&(Ee=E?.title?h(E.title):k),`
      <div class="${F?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${U}"${D} data-reservation-index="${j}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${J}</div>
          <div class="tile-badges">
            ${B}
            ${X}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${v.client}</span>
            <span class="tile-value">${Q?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.project}</span>
            <span class="tile-value">${Ee}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.start}</span>
            <span class="tile-value tile-inline">${oe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.end}</span>
            <span class="tile-value tile-inline">${qe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.cost}</span>
            <span class="tile-value">${Se} ${s} ${ne}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.equipment}</span>
            <span class="tile-value">${Z}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.crew}</span>
            <span class="tile-value">${te.length?ue:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${V}</span>
          </div>
        </div>
        ${R}
      </div>
    `}).join("")}function ze(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Oa(e){if(e==null)return"";const t=String(e).trim();return t?h(t):""}function Kl(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=kt(e,s),c=e.paid===!0||e.paid==="paid",l=$s(e),d=e.items||[],{groups:u}=Ui(e),{technicians:y=[]}=ye(),f=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(y)?y:[]),m=new Map;f.forEach(b=>{if(!b||b.id==null)return;const O=String(b.id),re=m.get(O)||{};m.set(O,{...re,...b})});const g=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(b=>({technicianId:b}))).map((b,O)=>{const re=b?.technicianId!=null?m.get(String(b.technicianId)):null;let xe=b.positionLabel??b.position_name??b.position_label??b.role??b.position??re?.role??o("reservations.crew.positionFallback","منصب بدون اسم");(!xe||xe.trim()==="")&&(xe=b.positionLabelAr??b.position_label_ar??b.positionLabelEn??b.position_label_en??b.position_name_ar??b.position_name_en??re?.role??o("reservations.crew.positionFallback","منصب بدون اسم"));const we=b.positionLabelAlt??b.position_label_alt??b.positionLabelEn??b.position_label_en??b.positionLabelAr??b.position_label_ar??"",Ue=he(Te(b.positionCost??b.position_cost??b.cost??b.daily_wage??b.dailyWage??re?.dailyWage??re?.wage??0)),Je=he(Te(b.positionClientPrice??b.position_client_price??b.client_price??b.clientPrice??b.daily_total??b.dailyTotal??b.total??re?.dailyTotal??re?.total??re?.total_wage??0));return{assignmentId:b.assignmentId??b.assignment_id??`crew-${O}`,positionId:b.positionId??b.position_id??null,positionLabel:xe,positionLabelAlt:we,positionLabelAr:b.positionLabelAr??b.position_label_ar??null,positionLabelEn:b.positionLabelEn??b.position_label_en??null,positionCost:Ue,positionClientPrice:Je,technicianId:b.technicianId!=null?String(b.technicianId):re?.id!=null?String(re.id):null,technicianName:b.technicianName??b.technician_name??re?.name??null,technicianRole:b.technicianRole??re?.role??null,technicianPhone:b.technicianPhone??re?.phone??null,notes:b.notes??null}}),q=Ot(),k=ba(e.start,e.end),v=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,S=Te(v),j=Number.isFinite(S)?S:0,Q=e.discountType??e.discount_type??e.discountMode??"percent",E=String(Q).toLowerCase()==="amount"?"amount":"percent",I=r?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),$=Te(e.cost??e.total??e.finalTotal),P=Number.isFinite($),H=P?he($):0,_=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,L=_!=null?Te(_):Number.NaN;let B=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(L)&&L>0)&&Number.isFinite(L)?L:0;I&&B<=0&&(B=xt);const A=wc({items:d,technicianIds:e.technicians||[],crewAssignments:g,discount:j,discountType:E,applyTax:I,start:e.start,end:e.end,companySharePercent:B}),X=he(A.equipmentTotal),U=he(A.crewTotal);he(A.crewCostTotal);const D=he(A.discountAmount),F=he(A.subtotalAfterDiscount),R=Number.isFinite(A.companySharePercent)?A.companySharePercent:0;let M=he(A.companyShareAmount);M=R>0?he(Math.max(0,M)):0;const K=he(A.taxAmount),se=he(A.finalTotal),te=r?se:P?H:se,ue=he(A.netProfit),J=h(String(e.reservationId??e.id??"")),oe=e.start?h(Ge(e.start)):"-",qe=e.end?h(Ge(e.end)):"-",Se=h(String(g.length)),Ce=h(X.toFixed(2)),V=h(D.toFixed(2)),Z=h(F.toFixed(2)),ne=h(K.toFixed(2)),Ee=h((Number.isFinite(te)?te:0).toFixed(2)),Re=h(String(k)),ae=o("reservations.create.summary.currency","SR"),Y=o("reservations.details.labels.discount","الخصم"),be=o("reservations.details.labels.tax","الضريبة (15%)"),T=o("reservations.details.labels.crewTotal","إجمالي الفريق"),ie=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),fe=o("reservations.details.labels.duration","عدد الأيام"),ge=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),me=o("reservations.details.labels.netProfit","💵 صافي الربح"),Ve=o("reservations.create.equipment.imageAlt","صورة"),_e={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},Me=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),et=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");o("reservations.details.technicians.roleUnknown","غير محدد");const vt=o("reservations.details.technicians.phoneUnknown","غير متوفر");o("reservations.details.technicians.wage","{amount} {currency} / اليوم");const un=o("reservations.list.status.confirmed","✅ مؤكد"),Wt=o("reservations.list.status.pending","⏳ غير مؤكد"),ja=o("reservations.list.payment.paid","💳 مدفوع"),z=o("reservations.list.payment.unpaid","💳 غير مدفوع"),ke=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),tt=o("reservations.list.status.completed","📁 منتهي"),ut=o("reservations.details.labels.id","🆔 رقم الحجز"),Bn=o("reservations.details.section.bookingInfo","بيانات الحجز"),Dn=o("reservations.details.section.paymentSummary","ملخص الدفع"),Na=o("reservations.details.labels.finalTotal","المجموع النهائي"),Fn=o("reservations.details.section.crew","😎 الفريق الفني"),La=o("reservations.details.crew.count","{count} عضو"),Xt=o("reservations.details.section.items","📦 المعدات المرتبطة"),Jt=o("reservations.details.items.count","{count} عنصر"),wo=o("reservations.details.actions.edit","✏️ تعديل"),Ao=o("reservations.details.actions.delete","🗑️ حذف"),Io=o("reservations.details.labels.customer","العميل"),ko=o("reservations.details.labels.contact","رقم التواصل"),_o=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const $o=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Po=o("reservations.details.actions.openProject","📁 فتح المشروع"),Co=o("reservations.details.labels.start","بداية الحجز"),To=o("reservations.details.labels.end","نهاية الحجز"),jo=o("reservations.details.labels.notes","ملاحظات"),No=o("reservations.list.noNotes","لا توجد ملاحظات"),Lo=o("reservations.details.labels.itemsCount","عدد المعدات"),Bo=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),Do=o("reservations.paymentHistory.title","سجل الدفعات"),Fo=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Ro=o("reservations.list.unknownCustomer","غير معروف"),Ba=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),ni=Ba==="partial",Mo=Ba==="paid"?ja:ni?ke:z;function Da(b){if(b==null)return Number.NaN;if(typeof b=="number")return Number.isFinite(b)?b:Number.NaN;const O=String(b).replace(/[^0-9.+-]/g,""),re=Number(O);return Number.isFinite(re)?re:Number.NaN}const Rn=(b={})=>{const O=String(b.type??b.kind??b.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(O)||Array.isArray(b.packageItems)&&b.packageItems.length)},zo=(b={})=>[b.packageId,b.package_id,b.packageCode,b.package_code,b.bundleId,b.bundle_id].some(O=>O!=null&&O!==""),Ho=(b={})=>!b||typeof b!="object"?!1:!Rn(b)&&zo(b),ai=(b={})=>{const O=Rn(b),re=[{value:b.qty,key:"qty",limit:999},{value:b.quantity,key:"quantity",limit:999},{value:b.units,key:"units",limit:999},{value:b.count,key:"count",limit:50},{value:b.package_quantity,key:"package_quantity",limit:999},{value:b.packageQty,key:"packageQty",limit:999},{value:b.packageCount,key:"packageCount",limit:999}];let xe=NaN;for(const we of re){if(we.value==null||we.value==="")continue;const Ue=typeof we.value=="string"?we.value.trim():String(we.value??"");if(we.key==="count"&&Ue.length>6)continue;const Je=Da(we.value);if(!Number.isFinite(Je)||Je<=0)continue;const je=Math.round(Je);if(!(je>we.limit)){xe=Math.max(1,je);break}}return(!Number.isFinite(xe)||xe<=0)&&(xe=1),O?Math.max(1,Math.min(99,xe)):Math.max(1,Math.min(9999,xe))};let Ne=(Array.isArray(d)?d:[]).reduce((b,O)=>!O||typeof O!="object"||Ho(O)?b:b+ai(O),0);Ne<=0&&Array.isArray(u)&&u.length&&(Ne=u.reduce((b,O)=>{const re=ai({...O,type:O.type});return b+re},0)),!Number.isFinite(Ne)||Ne<=0?Ne=Array.isArray(u)&&u.length?u.length:(Array.isArray(d)?d.length:0)||1:Ne>1e6&&(Ne=Math.min(Ne,Array.isArray(u)?u.length:Ne),(!Number.isFinite(Ne)||Ne<=0)&&(Ne=(Array.isArray(d)?d.length:0)||1)),Ne=Math.max(1,Math.round(Ne));const Oo=h(String(Ne)),si=Jt.replace("{count}",Oo),Vo=La.replace("{count}",Se),Uo=e.notes?h(e.notes):No,Ko=h(U.toFixed(2)),Qo=h(String(R)),Go=h(M.toFixed(2)),Wo=`${Qo}% (${Go} ${ae})`,Xo=Number.isFinite(ue)?Math.max(0,ue):0,Jo=h(Xo.toFixed(2)),qt=[{icon:"💼",label:Bo,value:`${Ce} ${ae}`}];qt.push({icon:"😎",label:T,value:`${Ko} ${ae}`}),D>0&&qt.push({icon:"💸",label:Y,value:`${V} ${ae}`}),qt.push({icon:"📊",label:ie,value:`${Z} ${ae}`}),I&&K>0&&qt.push({icon:"🧾",label:be,value:`${ne} ${ae}`}),R>0&&qt.push({icon:"🏦",label:ge,value:Wo}),qt.push({icon:"💵",label:me,value:`${Jo} ${ae}`}),qt.push({icon:"💰",label:Na,value:`${Ee} ${ae}`});const Yo=qt.map(({icon:b,label:O,value:re})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${b} ${O}</span>
      <span class="summary-details-value">${re}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let mn=[];Array.isArray(e.paymentHistory)?mn=e.paymentHistory:Array.isArray(e.payment_history)&&(mn=e.payment_history);const Zo=Array.isArray(e.paymentLogs)?e.paymentLogs:[],ii=Array.isArray(mn)&&mn.length>0?mn:Zo,ec=ii.length?`<ul class="reservation-payment-history-list">${ii.map(b=>{const O=b?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):b?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),re=Number.isFinite(Number(b?.amount))&&Number(b.amount)>0?`${h(Number(b.amount).toFixed(2))} ${ae}`:"—",xe=Number.isFinite(Number(b?.percentage))&&Number(b.percentage)>0?`${h(Number(b.percentage).toFixed(2))}%`:"—",we=b?.recordedAt?h(Ge(b.recordedAt)):"—",Ue=b?.note?`<div class="payment-history-note">${ze(h(b.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${ze(O)}</span>
              <span class="payment-history-entry__amount">${re}</span>
              <span class="payment-history-entry__percent">${xe}</span>
              <span class="payment-history-entry__date">${we}</span>
            </div>
            ${Ue}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${ze(Fo)}</div>`,ri=[{text:i?un:Wt,className:i?"status-confirmed":"status-pending"},{text:Mo,className:Ba==="paid"?"status-paid":ni?"status-partial":"status-unpaid"}];l&&ri.push({text:tt,className:"status-completed"});const tc=ri.map(({text:b,className:O})=>`<span class="status-chip ${O}">${b}</span>`).join(""),Ct=(b,O,re)=>`
    <div class="res-info-row">
      <span class="label">${b} ${O}</span>
      <span class="value">${re}</span>
    </div>
  `;let Fa="";if(e.projectId){let b=ze($o);if(s){const O=s.title||o("projects.fallback.untitled","مشروع بدون اسم");b=`${ze(O)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${ze(Po)}</button>`}Fa=`
      <div class="res-info-row">
        <span class="label">📁 ${_o}</span>
        <span class="value">${b}</span>
      </div>
    `}const mt=[];mt.push(Ct("👤",Io,t?.customerName||Ro)),mt.push(Ct("📞",ko,t?.phone||"—")),mt.push(Ct("🗓️",Co,oe)),mt.push(Ct("🗓️",To,qe)),mt.push(Ct("📦",Lo,si)),mt.push(Ct("⏱️",fe,Re)),mt.push(Ct("📝",jo,Uo)),Fa&&mt.push(Fa);const nc=mt.join(""),ac=u.length?u.map(b=>{const O=b.items[0]||{},re=Ut(O)||b.image,xe=re?`<img src="${re}" alt="${Ve}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',we=[];Array.isArray(b.packageItems)&&b.packageItems.length&&we.push(...b.packageItems),b.items.forEach(pe=>{Array.isArray(pe?.packageItems)&&pe.packageItems.length&&we.push(...pe.packageItems)});const Ue=Rn(b)||b.items.some(pe=>Rn(pe))||we.length>0,Je=(pe,{fallback:nt=1,max:le=1e3}={})=>{const ve=Da(pe);return Number.isFinite(ve)&&ve>0?Math.min(le,ve):nt};let je;if(Ue){const pe=Je(O?.qty??O?.quantity??O?.count,{fallback:NaN,max:999});Number.isFinite(pe)&&pe>0?je=pe:je=Je(b.quantity??b.count??1,{fallback:1,max:999})}else je=Je(b.quantity??b.count??O?.qty??O?.quantity??O?.count??0,{fallback:1,max:9999});const Mn=h(String(je)),pn=(pe,{preferPositive:nt=!1}={})=>{let le=Number.NaN;for(const ve of pe){const at=Te(ve);if(Number.isFinite(at)){if(nt&&at>0)return at;Number.isFinite(le)||(le=at)}}return le};let Ae,Le;if(Ue){const pe=[O?.price,O?.unit_price,O?.unitPrice,b.unitPrice];if(Ae=pn(pe,{preferPositive:!0}),!Number.isFinite(Ae)||Ae<0){const le=Te(b.totalPrice??O?.total??O?.total_price);Number.isFinite(le)&&je>0&&(Ae=le/je)}Number.isFinite(Ae)||(Ae=0);const nt=[O?.total,O?.total_price,b.totalPrice];if(Le=pn(nt),!Number.isFinite(Le))Le=Ae*je;else{const le=Ae*je;Number.isFinite(le)&&le>0&&Math.abs(Le-le)>le*.25&&(Le=le)}}else{const pe=[O?.price,O?.unit_price,O?.unitPrice,b.unitPrice];if(Ae=pn(pe,{preferPositive:!0}),!Number.isFinite(Ae)||Ae<0){const nt=Te(b.totalPrice??O?.total??O?.total_price);Number.isFinite(nt)&&je>0&&(Ae=nt/je)}Number.isFinite(Ae)||(Ae=0),Le=Te(b.totalPrice??O?.total??O?.total_price),Number.isFinite(Le)||(Le=Ae*je)}Ae=he(Ae),Le=he(Le);const oc=`${h(Ae.toFixed(2))} ${ae}`,cc=`${h(Le.toFixed(2))} ${ae}`,oi=b.barcodes.map(pe=>h(String(pe||""))).filter(Boolean),ci=oi.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${oi.map(pe=>`<li>${pe}</li>`).join("")}
              </ul>
            </details>`:"";let li="";if(we.length){const pe=new Map,nt=le=>{const ve=Da(le?.qtyPerPackage??le?.perPackageQty??le?.quantityPerPackage);return Number.isFinite(ve)&&ve>0&&ve<=99?Math.round(ve):1};if(we.forEach(le=>{if(!le)return;const ve=ee(le.barcode||le.normalizedBarcode||le.desc||Math.random());if(!ve)return;const at=pe.get(ve),Yt=nt(le);if(at){at.qty=Yt,at.total=Yt;return}pe.set(ve,{desc:le.desc||le.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(Yt,99)),total:Math.max(1,Math.min(Yt,99)),barcode:le.barcode??le.normalizedBarcode??""})}),pe.size){const le=Array.from(pe.values()).map(ve=>{const at=h(String(ve.qty>0?Math.min(ve.qty,99):1)),Yt=ze(ve.desc||""),dc=ve.barcode?` <span class="reservation-package-items__barcode">(${ze(h(String(ve.barcode)))})</span>`:"";return`<li>${Yt}${dc} × ${at}</li>`}).join("");li=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${le}
                </ul>
              </details>
            `}}const lc=Ue?`${li||""}${ci||""}`:ci;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${xe}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${ze(O.desc||O.description||O.name||b.description||"-")}</div>
                  ${lc}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${ze(_e.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Mn}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${ze(_e.unitPrice)}">${oc}</td>
            <td class="reservation-modal-items-table__cell" data-label="${ze(_e.total)}">${cc}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${ze(_e.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${Me}</td></tr>`,sc=`
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
        <tbody>${ac}</tbody>
      </table>
    </div>
  `,ic=g.map((b,O)=>{const re=h(String(O+1));let xe=b.positionLabel??b.position_name??b.position_label??b.position_title??b.role??b.position??null;(!xe||xe.trim()==="")&&(xe=b.positionLabelAr??b.position_label_ar??b.position_title_ar??b.positionLabelEn??b.position_label_en??b.position_name_ar??b.position_title_en??b.position_name_en??null);const we=Oa(xe)||o("reservations.crew.positionFallback","منصب بدون اسم"),Ue=Oa(b.positionLabelAlt??b.position_label_alt??b.positionLabelEn??b.position_label_en??b.positionLabelAr??b.position_label_ar??b.position_name_en??b.position_name_ar??""),Je=Oa(b.technicianName)||o("technicians.picker.noTechnicianOption","— بدون تعيين —"),je=b.technicianPhone||vt,Mn=he(Te(b.positionCost??b.position_cost??b.cost??b.daily_wage??b.dailyWage??b.internal_cost??0)),pn=he(Te(b.positionClientPrice??b.position_client_price??b.client_price??b.customer_price??b.position_price??b.clientPrice??b.daily_total??b.dailyTotal??b.total??0)),Ae=`${h(pn.toFixed(2))} ${ae}`,Le=Mn>0?`${h(Mn.toFixed(2))} ${ae}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${re}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${Je}</span>
            <small class="text-muted">👔 ${we}${Ue?` — ${Ue}`:""}</small>
            <small class="text-muted">💼 ${Ae}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${je}</div>
          ${Le?`<div>💵 ${o("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${Le}</div>`:""}
        </div>
      </div>
    `}).join(""),rc=g.length?`<div class="reservation-technicians-grid">${ic}</div>`:`<ul class="reservation-modal-technicians"><li>${et}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${ut}</span>
          <strong>${J}</strong>
        </div>
        <div class="status-chips">
          ${tc}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Bn}</h6>
          ${nc}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${Dn}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${Yo}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Do}</h6>
              ${ec}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Fn}</span>
          <span class="count">${Vo}</span>
        </div>
        ${rc}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Xt}</span>
          <span class="count">${si}</span>
        </div>
        ${sc}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${wo}</button>
        ${q?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Ao}</button>`:""}
      </div>
    </div>
  `}const tm="project",nm="editProject",am=3600*1e3,Ar=.15,sm=6,im="projectsTab",rm="projectsSubTab",om={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},cm={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},lm={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},Ql=`@page {
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
`,Gl=/color\([^)]*\)/gi,In=/(color\(|color-mix\(|oklab|oklch)/i,Wl=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"],Xl=typeof document<"u"?document.createElement("canvas"):null,On=Xl?.getContext?.("2d")||null;function Ir(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function os(e,t="#000"){if(!On||!e)return t;try{return On.fillStyle="#000",On.fillStyle=e,On.fillStyle||t}catch{return t}}function Jl(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&In.test(n)){const s=os(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function Zt(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function dm(e=[]){if(!(!Array.isArray(e)||!e.length))for(let t=e.length-1;t>=0;t-=1){const{element:n,prop:a,value:s,priority:r}=e[t]||{};!n?.style||!a||(s&&s.length>0?n.style.setProperty(a,s,r||""):n.style.removeProperty(a))}}function kr(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;Wl.forEach(c=>{const l=r[c];if(l&&In.test(l)){const d=Ir(c);Zt(n,s,d);const u=c==="backgroundColor"?"#ffffff":r.color||"#000000",y=os(l,u);s.style.setProperty(d,y,"important")}});const i=r.backgroundImage;if(i&&In.test(i)){const c=os(r.backgroundColor||"#ffffff","#ffffff");Zt(n,s,"background-image"),Zt(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function _r(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(c=>{const l=r[c];if(l&&In.test(l)){const d=Ir(c);Zt(n,s,d);const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(d,u,"important")}});const i=r.backgroundImage;i&&In.test(i)&&(Zt(n,s,"background-image"),Zt(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function $r(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(Gl,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const Pr="reservations.quote.sequence",Ei={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},Cr="https://help.artratio.sa/guide/quote-preview",Pe={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Yl=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Oe=[...Yl],Zl=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function cs(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...Oe]}function ed(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=cs(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=cs(t.value);if(a.length)return a}const n=Oe.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...Oe]}const td=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],Tr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>w(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>w(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>w(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>w(h(Number(e?.price||0).toFixed(2)))}],jr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(h(String(t+1)))},{id:"position",labelKey:"reservations.details.crew.position",fallback:"المنصب",render:e=>w(h(e?.positionLabel??e?.position_name??e?.role??o("reservations.crew.positionFallback","منصب بدون اسم")))},{id:"price",labelKey:"reservations.details.crew.clientPrice",fallback:"سعر العميل",render:e=>{const t=Number.isFinite(Number(e?.positionClientPrice))?Number(e.positionClientPrice):0;return w(`${h(t.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}}],ls={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:Tr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:jr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},Nr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(h(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>w(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>w(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>w(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Lr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>w(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>w(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>w(e?.note||"-")}],Br=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(h(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>w(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>w(h(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>w(h(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>w(e?.displayCost||"—")}],nd=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],ad={customerInfo:ls.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:ls.payment,projectExpenses:Lr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:Nr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:Br.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},Va=new Map;function Ia(e="reservation"){if(Va.has(e))return Va.get(e);const t=e==="project"?nd:td,n=e==="project"?ad:ls,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(l=>l.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return Va.set(e,r),r}function ka(e="reservation"){return Ia(e).sectionDefs}function Dr(e="reservation"){return Ia(e).fieldDefs}function Fr(e="reservation"){return Ia(e).sectionIdSet}function Rr(e="reservation"){return Ia(e).fieldIdMap}function Mr(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const sd="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",id="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",rd="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",zr=Ql.trim(),Hr=/^data:image\/svg\+xml/i,od=/\.svg($|[?#])/i,hn=512,ds="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",Or=96,Vr=25.4,us=210,Qn=297,Gn=Math.round(us/Vr*Or),Wn=Math.round(Qn/Vr*Or),cd=2,Ur=/safari/i,ld=/(iphone|ipad|ipod)/i,xi=/(iphone|ipad|ipod)/i,dd=/(crios|fxios|edgios|opios)/i,oa="[reservations/pdf]";let W=null,N=null,it=1,yn=null,bn=null,Et=null,en=null,Sn=!1;function Ft(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!W?.statusIndicator||!W?.statusText)return;W.statusKind=e;const r=t||Mr(e);W.statusText.textContent=r,W.statusSpinner&&(W.statusSpinner.hidden=!s),W.statusAction&&(W.statusAction.hidden=!0,W.statusAction.onclick=null,n&&typeof a=="function"&&(W.statusAction.textContent=n,W.statusAction.hidden=!1,W.statusAction.onclick=i=>{i.preventDefault(),a()})),W.statusIndicator.hidden=!1,requestAnimationFrame(()=>{W.statusIndicator.classList.add("is-visible")})}function En(e){!W?.statusIndicator||!W?.statusText||(W.statusKind=null,W.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{W?.statusIndicator&&(W.statusIndicator.hidden=!0,W.statusAction&&(W.statusAction.hidden=!0,W.statusAction.onclick=null),W.statusSpinner&&(W.statusSpinner.hidden=!1))},220))}function ms(){return!!window?.bootstrap?.Modal}function ud(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),Et||(Et=document.createElement("div"),Et.className="modal-backdrop fade show",Et.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(Et)),en||(en=t=>{t.key==="Escape"&&ps(e)},document.addEventListener("keydown",en));try{e.focus({preventScroll:!0})}catch{}}}function ps(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),Et&&(Et.remove(),Et=null),en&&(document.removeEventListener("keydown",en),en=null))}function md(e){if(e){if(ms()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}ud(e)}}function pd(){if(Sn)return;Sn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!W?.modal?.classList.contains("show"),s=()=>{W?.modal?.classList.contains("show")&&(Ft("render"),Sn=!1,Gt())};Bi({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:Cr}),a&&Ft("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function _a(e="reservation"){const t={},n=Dr(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function Os(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function fd(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function Vs(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function Us(e="reservation"){return Object.fromEntries(ka(e).map(({id:t})=>[t,!1]))}function Ks(e,t){return e.sectionExpansions||(e.sectionExpansions=Us(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function yd(e,t){return Ks(e,t)?.[t]!==!1}function Qs(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function bd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return ld.test(e)}function gd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=Ur.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Kr(){return bd()&&gd()}function $a(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=xi.test(e)||xi.test(t),s=/Macintosh/i.test(e)&&n>1;return Ur.test(e)&&!dd.test(e)&&(a||s)}function Ua(e,...t){try{console.log(`${oa} ${e}`,...t)}catch{}}function bt(e,...t){try{console.warn(`${oa} ${e}`,...t)}catch{}}function hd(e,t,...n){try{t?console.error(`${oa} ${e}`,t,...n):console.error(`${oa} ${e}`,...n)}catch{}}function Ie(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function vd(e,t="لا توجد بيانات للعرض."){const n=w(o(e,t));return Ie(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function ca(e,t){return Array.isArray(e)&&e.length?e:[vd(t)]}const qd=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function Qr(e=""){return qd.test(e)}function Sd(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!Qr(r))return a.call(this,r,...i);let c,l=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),l=!0)}catch{}try{if(!l){const d=this.canvas;d&&d.style?.direction!=="rtl"&&(d.__artRatioOriginalDirection=d.style.direction,d.style.direction="rtl")}return a.call(this,r,...i)}finally{if(l&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!l){const d=this.canvas;d&&d.__artRatioOriginalDirection!==void 0&&(d.style.direction=d.__artRatioOriginalDirection,delete d.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function wi(e,t=hn){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Ed(e){if(!e)return{width:hn,height:hn};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?wi(t,0):0,s=n?wi(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,l]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(l)&&l>0?l:0)}}return{width:a||hn,height:s||hn}}function Gr(e=""){return typeof e!="string"?!1:Hr.test(e)||od.test(e)}function xd(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function wd(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function Wr(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await wd(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),l=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=l;const d=i.getContext("2d");return d.clearRect(0,0,c,l),d.drawImage(r,0,0,c,l),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function Ad(e){if(!e)return null;if(Hr.test(e))return xd(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Id(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!Gr(t))return!1;const n=await Ad(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",ds),!1;const a=await Wr(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",ds),!1)}async function kd(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Ed(e),s=await Wr(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||ds),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),l=e.getAttribute("height");return c&&i.setAttribute("width",c),l&&i.setAttribute("height",l),e.parentNode?.replaceChild(i,e),!!s}async function Xr(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{Gr(s.getAttribute?.("src"))&&a.push(Id(s))}),n.forEach(s=>{a.push(kd(s))}),a.length&&await Promise.allSettled(a)}function _d(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(D,F=0)=>{const R=parseFloat(D);return Number.isFinite(R)?R:F},i=r(s.paddingTop),c=r(s.paddingBottom),l=r(s.paddingRight),d=r(s.paddingLeft),u=r(s.borderRadius),y=r(s.fontSize,14),f=(()=>{const D=s.lineHeight;if(!D||D==="normal")return y*1.6;const F=r(D,y*1.6);return F>0?F:y*1.6})(),m=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(m<=0)return null;const p=Math.max(1,m-d-l),g=e.textContent||"",q=g.split(/\r?\n/),k=n.createElement("canvas"),v=k.getContext("2d");if(!v)return null;const S=s.fontStyle||"normal",j=s.fontVariant||"normal",Q=s.fontWeight||"400",E=s.fontFamily||"sans-serif",I=s.fontStretch||"normal",$=D=>D.join(" "),P=[],H=D=>v.measureText(D).width;v.font=`${S} ${j} ${Q} ${I} ${y}px ${E}`,q.forEach(D=>{const F=D.trim();if(F.length===0){P.push("");return}const R=F.split(/\s+/);let M=[];R.forEach((K,se)=>{const te=K.trim();if(!te)return;const ue=$(M.concat(te));if(H(ue)<=p||M.length===0){M.push(te);return}P.push($(M)),M=[te]}),M.length&&P.push($(M))}),P.length||P.push("");const _=i+c+P.length*f,L=Math.ceil(Math.max(1,m)*t),G=Math.ceil(Math.max(1,_)*t);k.width=L,k.height=G,k.style.width=`${Math.max(1,m)}px`,k.style.height=`${Math.max(1,_)}px`,v.scale(t,t);const C=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){v.save(),v.beginPath();const D=Math.max(1,m),F=Math.max(1,_),R=Math.min(u,D/2,F/2);v.moveTo(R,0),v.lineTo(D-R,0),v.quadraticCurveTo(D,0,D,R),v.lineTo(D,F-R),v.quadraticCurveTo(D,F,D-R,F),v.lineTo(R,F),v.quadraticCurveTo(0,F,0,F-R),v.lineTo(0,R),v.quadraticCurveTo(0,0,R,0),v.closePath(),v.clip()}if(v.fillStyle=C,v.fillRect(0,0,Math.max(1,m),Math.max(1,_)),v.font=`${S} ${j} ${Q} ${I} ${y}px ${E}`,v.fillStyle=s.color||"#000000",v.textBaseline="top",v.textAlign="right","direction"in v)try{v.direction="rtl"}catch{}const B=Math.max(0,m-l);let A=i;P.forEach(D=>{const F=D.length?D:" ";v.fillText(F,B,A,p),A+=f});const X=n.createElement("img");let U;try{U=k.toDataURL("image/png")}catch(D){return bt("note canvas toDataURL failed",D),null}return X.src=U,X.alt=g,X.style.width=`${Math.max(1,m)}px`,X.style.height=`${Math.max(1,_)}px`,X.style.display="block",X.setAttribute("data-quote-note-image","true"),{image:X,canvas:k,totalHeight:_,width:m}}function $d(e,{pixelRatio:t=1}={}){if(!e||!$a())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!Qr(a.textContent||""))return;let s;try{s=_d(a,{pixelRatio:t})}catch(r){bt("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function fs(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){hd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),l=o("reservations.quote.toast.retry","إعادة المحاولة"),d=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(Ft("export"),oo()):(Ft("render"),Sn=!1,Gt())};if(Bi({message:i,duration:9e3,actionLabel:d?l:void 0,onAction:d?u:void 0,linkLabel:c,linkHref:Cr}),W?.modal?.classList.contains("show")&&Ft("error",{message:i,actionLabel:d?l:void 0,onAction:d?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function ys({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){bt("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){bt("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function Gs(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function Ai(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function Ii(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function Pd(){const e=Ii();return e||(bn||(bn=Gs(id).catch(t=>{throw bn=null,t}).then(()=>{const t=Ii();if(!t)throw bn=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),bn)}async function Cd(){const e=Ai();return e||(yn||(yn=Gs(rd).catch(t=>{throw yn=null,t}).then(()=>{const t=Ai();if(!t)throw yn=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),yn)}async function Td(){if(window.html2pdf||await Gs(sd),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}Jl(),Sd()}function w(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function jd(e="reservation"){return e==="project"?"QP":"Q"}function Nd(e,t="reservation"){const n=Number(e),a=jd(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function Ld(){const e=window.localStorage?.getItem?.(Pr),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function Jr(e="reservation"){const n=Ld()+1;return{sequence:n,quoteNumber:Nd(n,e)}}function Bd(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(Pr,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function Yr(e="reservation"){return Ei[e]||Ei.reservation}function Dd(e="reservation"){try{const t=Yr(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function Fd(e,t="reservation"){try{const n=Yr(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function Rd(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function Md(e,t="reservation"){if(!e)return null;const n=Fr(t),a=Rr(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,l])=>{const d=i[c];if(d==null)return;const{ids:u,emptyExplicitly:y}=Rd(d);if(!u&&!y)return;const f=Array.isArray(u)?u.filter(m=>l.has(m)):[];(f.length>0||y)&&(r[c]=f)}),{version:1,sections:s,fields:r}}function Zr(e){if(!e)return;const t=e.context||"reservation",n=Md(e,t);n&&Fd(n,t)}function eo(e){if(!e)return;const t=e.context||"reservation",n=Dd(t);if(!n)return;const a=Fr(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=Os(e.fields||_a(t)),i=Rr(t);Object.entries(n.fields).forEach(([c,l])=>{const d=i[c];if(!d)return;const u=Array.isArray(l)?l.filter(y=>d.has(y)):[];r[c]=new Set(u)}),e.fields=r}}function to(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function zd(e){const t=Cn()||[],{technicians:n=[]}=ye(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(i=>{if(!i||i.id==null)return;const c=String(i.id),l=s.get(c)||{};s.set(c,{...l,...i})}),(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(i=>({technicianId:i}))).map((i,c)=>{const l=i?.technicianId!=null?s.get(String(i.technicianId)):null;let d=i.positionLabel??i.position_name??i.position_label??i.role??i.position??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم");(!d||d.trim()==="")&&(d=i.positionLabelAr??i.position_label_ar??i.positionLabelEn??i.position_label_en??i.position_name_ar??i.position_name_en??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم"));const u=he(Te(i.positionCost??i.position_cost??i.cost??i.daily_wage??i.dailyWage??l?.dailyWage??l?.wage??0)),y=he(Te(i.positionClientPrice??i.position_client_price??i.client_price??i.clientPrice??i.daily_total??i.dailyTotal??i.total??l?.dailyTotal??l?.total??l?.total_wage??0));return{assignmentId:i.assignmentId??i.assignment_id??`crew-${c}`,positionId:i.positionId??i.position_id??null,positionLabel:d,positionLabelAlt:i.positionLabelAlt??i.position_label_alt??"",positionCost:u,positionClientPrice:y,technicianId:i.technicianId!=null?String(i.technicianId):l?.id!=null?String(l.id):null,technicianName:i.technicianName??i.technician_name??l?.name??null,technicianRole:i.technicianRole??l?.role??null}})}function Hd(e,t,n){const{projectLinked:a}=kt(e,n);ba(e.start,e.end);const s=e.discount??e.discountValue??0,r=Number(h(String(s)))||0,i=e.discountType??e.discount_type??"percent",c=String(i).toLowerCase()==="amount"?"amount":"percent",l=a?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),d=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,u=d!=null?Te(d):Number.NaN,f=(e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied)===!0&&Number.isFinite(u)&&u>0?u:null,m=Array.isArray(t)?t.map(j=>j?.technicianId).filter(Boolean):[],p=calculateDraftFinancialBreakdown({items:Array.isArray(e.items)?e.items:[],technicianIds:m,crewAssignments:Array.isArray(t)?t:[],discount:r,discountType:c,applyTax:l,start:e.start,end:e.end,companySharePercent:f}),g=Te(e.cost??e.total??e.finalTotal),q=Number.isFinite(g),k=a?p.finalTotal:q?he(g):p.finalTotal,v={equipmentTotal:p.equipmentTotal,crewTotal:p.crewTotal,crewCostTotal:p.crewCostTotal,discountAmount:p.discountAmount,subtotalAfterDiscount:p.subtotalAfterDiscount,taxableAmount:p.taxableAmount,taxAmount:p.taxAmount,finalTotal:k,companySharePercent:p.companySharePercent,companyShareAmount:p.companyShareAmount,netProfit:p.netProfit},S={equipmentTotal:h(p.equipmentTotal.toFixed(2)),crewTotal:h(p.crewTotal.toFixed(2)),discountAmount:h(p.discountAmount.toFixed(2)),subtotalAfterDiscount:h(p.subtotalAfterDiscount.toFixed(2)),taxableAmount:h(p.taxableAmount.toFixed(2)),taxAmount:h(p.taxAmount.toFixed(2)),finalTotal:h(k.toFixed(2)),companySharePercent:h((Number.isFinite(p.companySharePercent)?p.companySharePercent:0).toFixed(2)),companyShareAmount:h(p.companyShareAmount.toFixed(2)),netProfit:h(p.netProfit.toFixed(2))};return{totals:v,totalsDisplay:S,rentalDays:p.rentalDays}}function sn(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function no(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Od(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=sn(e.amount??(n==="amount"?e.value:null)),s=sn(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=no(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function Vd(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(Od).filter(Boolean);if(n.length>0)return n;const a=sn(e.paidPercent??e.paid_percent),s=sn(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=no(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function Ud(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function Kd(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function Qd(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function Gd(e){const t=Number(e?.equipmentEstimate)||0,n=Qd(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const l=Math.max(0,a-c),d=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,y=d&&s&&u>0?u:0,f=y>0?Number((l*(y/100)).toFixed(2)):0,m=l+f;let p=s?m*Ar:0;(!Number.isFinite(p)||p<0)&&(p=0),p=Number(p.toFixed(2));let g=s?Number(e?.totalWithTax):m;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((m+p).toFixed(2))):g=m,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:l,companyShareAmount:f,subtotal:m,applyTax:s,taxAmount:p,totalWithTax:g}}function Wd(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=r.length?r:Array.isArray(e.technicians)?e.technicians:[],c=Is(t,a,s,!1,i,{start:e.start,end:e.end});if(Number.isFinite(c))return c;const l=Number(h(String(e.cost??0)));return Number.isFinite(l)?Math.round(l):0}function Xd(e,t){if(!e)return"—";const n=Ge(e);return t?`${n} - ${Ge(t)}`:n}function ce(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${h(a.toFixed(s))} ${t}`}function ki(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function Jd(e){if(!e?.start)return null;if(!e?.end)return 1;const t=ba(e.start,e.end);return Number.isFinite(t)?t:1}function Yd(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function Zd(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=ye(),i=e?.id!=null?s.find(T=>String(T.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:ce(0,t),expensesTotal:ce(0,t),reservationsTotal:ce(0,t),discountAmount:ce(0,t),taxAmount:ce(0,t),overallTotal:ce(0,t),paidAmount:ce(0,t),remainingAmount:ce(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:ce(0,t),remainingAmountDisplay:ce(0,t),paidPercentDisplay:ki(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const l=i.clientId??i.customerId??i.client_id??i.customer_id??null,d=l!=null&&n.find(T=>String(T.id)===String(l))||null,u=d?.customerName??d?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),y=(i.clientCompany||d?.companyName||d?.company||"").trim(),f=d?.phone??d?.customerPhone??i.clientPhone??i.customerPhone??"",m=f?h(String(f).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),p=d?.email??i.clientEmail??i.customerEmail??"",g=p?String(p).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),q=i.projectCode||`PRJ-${h(String(i.id??""))}`,k=h(String(q)),v=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),S=Ud(i.type),j=i.start?Ge(i.start):"—",Q=i.end?Ge(i.end):"—",E=Jd(i),I=E!=null?Yd(E):"غير محدد",$=Kd(i),P={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},H=o(`projects.status.${$}`,P[$]||$),_=i.id!=null?String(i.id):null,L=_?a.filter(T=>String(T.projectId)===_):[],C=L.map(T=>{const ie=T.reservationId||T.id||"",fe=T.status||T.state||"pending",ge=String(fe).toLowerCase(),me=o(`reservations.status.${ge}`,ge),Ve=Wd(T),_e=T.start?new Date(T.start).getTime():0;return{reservationId:h(String(ie||"-")),status:ge,statusLabel:me,total:Ve,totalLabel:ce(Ve,t),dateRange:Xd(T.start,T.end),startTimestamp:Number.isNaN(_e)?0:_e}}).sort((T,ie)=>ie.startTimestamp-T.startTimestamp).map(({startTimestamp:T,...ie})=>ie).reduce((T,ie)=>T+(Number(ie.total)||0),0),B=new Map;L.forEach(T=>{const ie=Array.isArray(T.items)?T.items:[],fe=ba(T.start,T.end),ge=T.reservationId||T.id||"";ie.forEach((me,Ve)=>{if(!me)return;const _e=me.barcode||me.code||me.id||me.desc||me.description||`item-${Ve}`,Me=String(_e||`item-${Ve}`),et=B.get(Me)||{description:me.desc||me.description||me.name||me.barcode||`#${h(String(Ve+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},vt=Number(me.qty)||1,un=Number(me.price)||0;et.totalQuantity+=vt,et.reservationIds.add(String(ge));const Wt=un*vt*Math.max(1,fe);Number.isFinite(Wt)&&(et.totalCost+=Wt),B.set(Me,et)})});const A=Array.from(B.values()).map(T=>({description:T.description,totalQuantity:T.totalQuantity,reservationsCount:T.reservationIds.size,displayCost:ce(T.totalCost,t)})),X=new Map((r||[]).filter(Boolean).map(T=>[String(T.id),T])),U=new Map,D=T=>{if(!T)return;let ie=null;typeof T=="object"?ie=T.id??T.technicianId??T.technician_id??T.userId??T.user_id??null:(typeof T=="string"||typeof T=="number")&&(ie=T);const fe=ie!=null?String(ie):null,ge=fe&&X.has(fe)?X.get(fe):typeof T=="object"?T:null,me=ge?.name||ge?.full_name||ge?.fullName||ge?.displayName||(typeof T=="string"?T:null),Ve=ge?.role||ge?.title||null,_e=ge?.phone||ge?.mobile||ge?.contact||null;if(!me&&!fe)return;const Me=fe||me;U.has(Me)||U.set(Me,{id:fe,name:me||"-",role:Ve||null,phone:_e||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(T=>D(T)),L.forEach(T=>{(Array.isArray(T.crewAssignments)&&T.crewAssignments.length?T.crewAssignments:Array.isArray(T.technicians)?T.technicians.map(fe=>({technicianId:fe})):[]).forEach(fe=>D(fe))});const F=Array.from(U.values()),R=Array.isArray(i.expenses)?i.expenses.map(T=>{const ie=Number(T?.amount)||0;return{label:T?.label||T?.name||"-",amount:ie,displayAmount:ce(ie,t),note:T?.note||T?.description||""}}):[],M=Gd(i),K=M.applyTax?Number(((M.subtotal+C)*Ar).toFixed(2)):0,se=Number((M.subtotal+C+K).toFixed(2)),te=Vd(i),ue=sn(i.paidAmount??i.paid_amount)||0,J=sn(i.paidPercent??i.paid_percent)||0,oe=ks({totalAmount:se,paidAmount:ue,paidPercent:J,history:te}),qe=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",Se=_s({manualStatus:qe,paidAmount:oe.paidAmount,paidPercent:oe.paidPercent,totalAmount:se}),Ce={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},V=o(`projects.paymentStatus.${Se}`,Ce[Se]||Se),Z=Number(oe.paidAmount||0),ne=Number(oe.paidPercent||0),Ee=Math.max(0,Number((se-Z).toFixed(2))),Re={projectSubtotal:ce(M.subtotal,t),expensesTotal:ce(M.expensesTotal,t),reservationsTotal:ce(C,t),discountAmount:ce(M.discountAmount,t),taxAmount:ce(K,t),overallTotal:ce(se,t),paidAmount:ce(Z,t),remainingAmount:ce(Ee,t)},ae={status:Se,statusLabel:V,paidAmount:Z,paidPercent:ne,remainingAmount:Ee,paidAmountDisplay:ce(Z,t),remainingAmountDisplay:ce(Ee,t),paidPercentDisplay:ki(ne)},Y=(i.description||"").trim();return{project:i,customer:d,clientInfo:{name:u,company:y||"—",phone:m,email:g},projectInfo:{title:v,code:k,typeLabel:S,startDisplay:j,endDisplay:Q,durationLabel:I,statusLabel:H},expenses:R,equipment:A,crew:F,totals:M,totalsDisplay:Re,projectTotals:{combinedTaxAmount:K,overallTotal:se,reservationsTotal:C,paidAmount:Z,paidPercent:ne,remainingAmount:Ee,paymentStatus:Se},paymentSummary:ae,notes:Y,currencyLabel:t,projectStatus:$,projectStatusLabel:H,projectDurationDays:E,projectDurationLabel:I,paymentHistory:te}}function eu({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:l={},currencyLabel:d="SR",sections:u,fieldSelections:y={},quoteNumber:f,quoteDate:m,terms:p=Oe}){const g=Os(y),q=(V,Z)=>Vs(g,V,Z),k=V=>u?.has?.(V),v=`<div class="quote-placeholder">${w(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,S=(V,Z)=>`<div class="info-plain__item">
      <span class="info-plain__label">${w(V)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${w(Z)}</span>
    </div>`,j=(V,Z,{variant:ne="inline"}={})=>ne==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${w(V)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${w(Z)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${w(V)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${w(Z)}</span>
    </span>`,Q=(V,Z)=>`<div class="payment-row">
      <span class="payment-row__label">${w(V)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${w(Z)}</span>
    </div>`,E=[];q("customerInfo","customerName")&&E.push(S(o("projects.details.client","العميل"),t.name||"-")),q("customerInfo","customerCompany")&&E.push(S(o("projects.details.company","شركة العميل"),t.company||"—")),q("customerInfo","customerPhone")&&E.push(S(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),q("customerInfo","customerEmail")&&E.push(S(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const I=k("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${w(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${E.length?`<div class="info-plain">${E.join("")}</div>`:v}
      </section>`:"",$=[];q("projectInfo","projectType")&&$.push(S(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),q("projectInfo","projectTitle")&&$.push(S(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),q("projectInfo","projectCode")&&$.push(S(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),q("projectInfo","projectStart")&&$.push(S(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),q("projectInfo","projectEnd")&&$.push(S(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),q("projectInfo","projectDuration")&&$.push(S(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),q("projectInfo","projectStatus")&&$.push(S(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const P=k("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${w(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${$.length?`<div class="info-plain">${$.join("")}</div>`:v}
      </section>`:"",H=Nr.filter(V=>q("projectCrew",V.id)),_=k("projectCrew")?H.length?`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${H.map(V=>`<th>${w(V.labelKey?o(V.labelKey,V.fallback):V.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((V,Z)=>`<tr>${H.map(ne=>`<td>${ne.render(V,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(H.length,1)}" class="empty">${w(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${v}
          </section>`:"",L=[];q("financialSummary","projectSubtotal")&&L.push(j(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${ce(0,d)}`)),q("financialSummary","expensesTotal")&&L.push(j(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||ce(0,d))),q("financialSummary","reservationsTotal")&&L.push(j(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||ce(0,d))),q("financialSummary","discountAmount")&&L.push(j(o("reservations.details.labels.discount","الخصم"),i.discountAmount||ce(0,d))),q("financialSummary","taxAmount")&&L.push(j(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||ce(0,d)));const G=[];q("financialSummary","overallTotal")&&G.push(j(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||ce(0,d),{variant:"final"})),q("financialSummary","paidAmount")&&G.push(j(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||ce(0,d),{variant:"final"})),q("financialSummary","remainingAmount")&&G.push(j(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||ce(0,d),{variant:"final"}));const C=k("financialSummary")?!L.length&&!G.length?`<section class="quote-section quote-section--financial">${v}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${w(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${L.length?`<div class="totals-inline">${L.join("")}</div>`:""}
            ${G.length?`<div class="totals-final">${G.join("")}</div>`:""}
          </div>
        </section>`:"",B=Lr.filter(V=>q("projectExpenses",V.id)),A=k("projectExpenses")?B.length?`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${B.map(V=>`<th>${w(V.labelKey?o(V.labelKey,V.fallback):V.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((V,Z)=>`<tr>${B.map(ne=>`<td>${ne.render(V,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(B.length,1)}" class="empty">${w(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${v}
          </section>`:"",X=Br.filter(V=>q("projectEquipment",V.id)),U=k("projectEquipment")?X.length?`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${X.map(V=>`<th>${w(V.labelKey?o(V.labelKey,V.fallback):V.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${r.length?r.map((V,Z)=>`<tr>${X.map(ne=>`<td>${ne.render(V,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(X.length,1)}" class="empty">${w(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${v}
          </section>`:"",D=(e?.description||"").trim()||"",F=k("projectNotes")?`<section class="quote-section">
        <h3>${w(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${w(D||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",R=[];q("payment","beneficiary")&&R.push(Q(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Pe.beneficiaryName)),q("payment","bank")&&R.push(Q(o("reservations.quote.labels.bank","اسم البنك"),Pe.bankName)),q("payment","account")&&R.push(Q(o("reservations.quote.labels.account","رقم الحساب"),h(Pe.accountNumber))),q("payment","iban")&&R.push(Q(o("reservations.quote.labels.iban","رقم الآيبان"),h(Pe.iban)));const M=`<section class="quote-section">
      <div class="payment-block">
        <h3>${w(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${R.length?R.join(""):v}</div>
      </div>
      <p class="quote-approval-note">${w(Pe.approvalNote)}</p>
    </section>`,K=Array.isArray(p)&&p.length?p:Oe,se=`<footer class="quote-footer">
        <h4>${w(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${K.map(V=>`<li>${w(V)}</li>`).join("")}</ul>
      </footer>`,te=[],ue=[];if(P&&ue.push({key:"project",html:P}),I&&ue.push({key:"customer",html:I}),ue.length>1){const V=ue.find(Ee=>Ee.key==="project"),Z=ue.find(Ee=>Ee.key==="customer"),ne=[];V?.html&&ne.push(V.html),Z?.html&&ne.push(Z.html),te.push(Ie(`<div class="quote-section-row quote-section-row--primary">${ne.join("")}</div>`,{blockType:"group"}))}else ue.length===1&&te.push(Ie(ue[0].html));const J=[];_&&J.push(Ie(_,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),A&&J.push(Ie(A,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),U&&J.push(Ie(U,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const oe=[];C&&oe.push(Ie(C,{blockType:"summary"})),F&&oe.push(Ie(F));const qe=[Ie(M,{blockType:"payment"}),Ie(se,{blockType:"footer"})],Se=[...ca(te,"projects.quote.placeholder.primary"),...J,...ca(oe,"projects.quote.placeholder.summary"),...qe],Ce=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${w(Pe.logoUrl)}" alt="${w(Pe.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${w(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${w(Pe.companyName)}</p>
        <p class="quote-company-cr">${w(o("reservations.quote.labels.cr","السجل التجاري"))}: ${w(Pe.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${w(o("reservations.details.labels.reservationId","رقم العرض"))}</span>
          <strong>${w(f)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${w(o("projects.quote.labels.date","التاريخ"))}</span>
          <strong>${w(m)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${zr}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Ce}
          ${Se.join("")}
        </div>
      </div>
    </div>
  `}function ao(e){if(e?.context==="project")return eu(e);const{reservation:t,customer:n,project:a,crewAssignments:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:l,sections:d,fieldSelections:u={},quoteNumber:y,quoteDate:f,terms:m=Oe}=e,p=h(String(t?.reservationId??t?.id??"")),g=t.start?h(Ge(t.start)):"-",q=t.end?h(Ge(t.end)):"-",k=n?.customerName||n?.full_name||n?.name||"-",v=n?.phone||"-",S=n?.email||"-",j=n?.company||n?.company_name||"-",Q=h(v),E=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),I=a?.code||a?.projectCode||"",$=h(String(c)),P=t?.notes||"",H=Array.isArray(m)&&m.length?m:Oe,_=Os(u),L=(z,ke)=>Vs(_,z,ke),G=z=>d?.has?.(z),C=`<div class="quote-placeholder">${w(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,B=(z,ke)=>`<div class="info-plain__item">${w(z)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${w(ke)}</strong></div>`,A=(z,ke,{variant:tt="inline"}={})=>tt==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${w(z)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${w(ke)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${w(z)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${w(ke)}</span>
    </span>`,X=(z,ke)=>`<div class="payment-row">
      <span class="payment-row__label">${w(z)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${w(ke)}</span>
    </div>`,U=[];L("customerInfo","customerName")&&U.push(B(o("reservations.details.labels.customer","العميل"),k)),L("customerInfo","customerCompany")&&U.push(B(o("reservations.details.labels.company","الشركة"),j)),L("customerInfo","customerPhone")&&U.push(B(o("reservations.details.labels.phone","الهاتف"),Q)),L("customerInfo","customerEmail")&&U.push(B(o("reservations.details.labels.email","البريد"),S));const D=G("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${U.length?`<div class="info-plain">${U.join("")}</div>`:C}
      </section>`:"",F=[];L("reservationInfo","reservationId")&&F.push(B(o("reservations.details.labels.reservationId","رقم الحجز"),p||"-")),L("reservationInfo","reservationStart")&&F.push(B(o("reservations.details.labels.start","بداية الحجز"),g)),L("reservationInfo","reservationEnd")&&F.push(B(o("reservations.details.labels.end","نهاية الحجز"),q)),L("reservationInfo","reservationDuration")&&F.push(B(o("reservations.details.labels.duration","عدد الأيام"),$));const R=G("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${F.length?`<div class="info-plain">${F.join("")}</div>`:C}
      </section>`:"",M=[];L("projectInfo","projectTitle")&&M.push(B(o("reservations.details.labels.project","المشروع"),E)),L("projectInfo","projectCode")&&M.push(B(o("reservations.details.labels.code","الرمز"),I||"-"));const K=G("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${M.length?`<div class="info-plain">${M.join("")}</div>`:C}
      </section>`:"",se=[];L("financialSummary","equipmentTotal")&&se.push(A(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${l}`)),L("financialSummary","crewTotal")&&se.push(A(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${l}`)),L("financialSummary","discountAmount")&&se.push(A(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${l}`)),L("financialSummary","taxAmount")&&se.push(A(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${l}`));const te=L("financialSummary","finalTotal"),ue=[];te&&ue.push(A(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${l}`,{variant:"final"}));const J=ue.length?`<div class="totals-final">${ue.join("")}</div>`:"",oe=G("financialSummary")?!se.length&&!te?`<section class="quote-section quote-section--financial">${C}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${w(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${se.length?`<div class="totals-inline">${se.join("")}</div>`:""}
            ${J}
          </div>
        </section>`:"",{groups:qe}=Ui(t),Se=qe.map(z=>{const ke=Number(z?.count??z?.quantity??1)||1,tt=Number(z?.unitPrice);let ut=Number.isFinite(tt)?tt:0;if(!ut||ut<=0){const Jt=Number(z?.totalPrice);Number.isFinite(Jt)&&ke>0&&(ut=Number((Jt/ke).toFixed(2)))}Number.isFinite(ut)||(ut=0);const Bn=z?.type==="package"||Array.isArray(z?.items)&&z.items.some(Jt=>Jt?.type==="package"),Dn=Array.isArray(z?.barcodes)&&z.barcodes.length?z.barcodes[0]:Array.isArray(z?.items)&&z.items.length?z.items[0]?.barcode:null,Na=z?.packageDisplayCode??z?.package_code??z?.packageCode??z?.packageId??z?.package_id??z?.code??z?.barcode??(Array.isArray(z?.items)&&z.items.length?z.items[0]?.package_code??z.items[0]?.packageCode??z.items[0]?.packageId??z.items[0]?.package_id??z.items[0]?.code??z.items[0]?.barcode:null),Fn=Bn?Na??Dn??"":z?.barcode??Dn??"",La=Fn!=null?String(Fn):"";let Xt=Number.isFinite(Number(z?.totalPrice))?Number(z.totalPrice):Number((ut*ke).toFixed(2));return Xt=he(Xt),{...z,isPackage:Bn,desc:z?.description,barcode:La,qty:ke,price:Xt,totalPrice:Xt,unitPriceValue:ut}}),Ce=Tr.filter(z=>L("items",z.id)),V=Ce.length>0,Z=V?Ce.map(z=>`<th>${w(z.labelKey?o(z.labelKey,z.fallback):z.fallback)}</th>`).join(""):"",Ee=Se.length>0?Se.map((z,ke)=>`<tr>${Ce.map(tt=>`<td>${tt.render(z,ke)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Ce.length,1)}" class="empty">${w(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,Re=G("items")?V?`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Z}</tr>
              </thead>
              <tbody>${Ee}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.items.title","المعدات"))}</h3>
            ${C}
          </section>`:"",ae=jr.filter(z=>L("crew",z.id)),Y=ae.length>0,be=Y?ae.map(z=>`<th>${w(z.labelKey?o(z.labelKey,z.fallback):z.fallback)}</th>`).join(""):"",T=Array.isArray(s)?s:[],ie=T.length?T.map((z,ke)=>`<tr>${ae.map(tt=>`<td>${tt.render(z,ke)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(ae.length,1)}" class="empty">${w(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,fe=G("crew")?Y?`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${be}</tr>
              </thead>
              <tbody>${ie}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${C}
          </section>`:"",ge=G("notes")?`<section class="quote-section">
        <h3>${w(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${w(P||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",me=[];L("payment","beneficiary")&&me.push(X(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Pe.beneficiaryName)),L("payment","bank")&&me.push(X(o("reservations.quote.labels.bank","اسم البنك"),Pe.bankName)),L("payment","account")&&me.push(X(o("reservations.quote.labels.account","رقم الحساب"),h(Pe.accountNumber))),L("payment","iban")&&me.push(X(o("reservations.quote.labels.iban","رقم الآيبان"),h(Pe.iban)));const Ve=`<section class="quote-section">
      <div class="payment-block">
        <h3>${w(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${me.length?me.join(""):C}</div>
      </div>
      <p class="quote-approval-note">${w(Pe.approvalNote)}</p>
    </section>`,_e=`<footer class="quote-footer">
        <h4>${w(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${H.map(z=>`<li>${w(z)}</li>`).join("")}</ul>
      </footer>`,Me=[];D&&R?Me.push(Ie(`<div class="quote-section-row">${D}${R}</div>`,{blockType:"group"})):(R&&Me.push(Ie(R)),D&&Me.push(Ie(D))),K&&Me.push(Ie(K));const et=[];Re&&et.push(Ie(Re,{blockType:"table",extraAttributes:'data-table-id="items"'})),fe&&et.push(Ie(fe,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const vt=[];oe&&vt.push(Ie(oe,{blockType:"summary"})),ge&&vt.push(Ie(ge));const un=[Ie(Ve,{blockType:"payment"}),Ie(_e,{blockType:"footer"})],Wt=[...ca(Me,"reservations.quote.placeholder.page1"),...et,...ca(vt,"reservations.quote.placeholder.page2"),...un],ja=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${w(Pe.logoUrl)}" alt="${w(Pe.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${w(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${w(Pe.companyName)}</p>
        <p class="quote-company-cr">${w(o("reservations.quote.labels.cr","السجل التجاري"))}: ${w(Pe.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${w(y)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${w(f)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${zr}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${ja}
          ${Wt.join("")}
        </div>
      </div>
    </div>
  `}function tu(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function kn(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>tu(c)),i=[s,...r].map(c=>c.catch(l=>(bt("asset load failed",l),pd(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function so(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await Xr(r),await kn(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let l=null,d=null;const u=E=>{E.style.margin="0 auto",E.style.breakInside="avoid",E.style.pageBreakInside="avoid",E.style.pageBreakAfter="auto",E.style.breakAfter="auto"},y=()=>{const E=a.createElement("div"),I=s.childElementCount===0;if(E.className="quote-page",E.dataset.pageIndex=String(s.childElementCount),I){E.classList.add("quote-page--primary");const P=i.cloneNode(!0);P.removeAttribute("data-quote-header-template"),E.appendChild(P)}else E.classList.add("quote-page--continuation");const $=a.createElement("main");$.className="quote-body",E.appendChild($),s.appendChild(E),u(E),l=E,d=$},f=()=>{(!l||!d||!d.isConnected)&&y()},m=()=>{if(!l||!d||d.childElementCount>0)return;const E=l;l=null,d=null,E.parentNode&&E.parentNode.removeChild(E)},p=()=>{l=null,d=null},g=()=>l?l.scrollHeight-l.clientHeight>cd:!1,q=(E,{allowOverflow:I=!1}={})=>(f(),d.appendChild(E),g()&&!I?(d.removeChild(E),m(),!1):!0),k=E=>{const I=E.cloneNode(!0);I.removeAttribute?.("data-quote-block"),I.removeAttribute?.("data-block-type"),I.removeAttribute?.("data-table-id"),!q(I)&&(p(),!q(I)&&q(I,{allowOverflow:!0}))},v=E=>{const I=E.querySelector("table");if(!I){k(E);return}const $=E.querySelector("h3"),P=I.querySelector("thead"),H=Array.from(I.querySelectorAll("tbody tr"));if(!H.length){k(E);return}let _=null,L=0;const G=(B=!1)=>{const A=E.cloneNode(!1);A.removeAttribute("data-quote-block"),A.removeAttribute("data-block-type"),A.removeAttribute("data-table-id"),A.classList.add("quote-section--table-fragment"),B&&A.classList.add("quote-section--table-fragment--continued");const X=$?$.cloneNode(!0):null;X&&A.appendChild(X);const U=I.cloneNode(!1);U.classList.add("quote-table--fragment"),P&&U.appendChild(P.cloneNode(!0));const D=a.createElement("tbody");return U.appendChild(D),A.appendChild(U),{section:A,body:D}},C=(B=!1)=>_||(_=G(B),q(_.section)||(p(),q(_.section)||q(_.section,{allowOverflow:!0})),_);H.forEach(B=>{C(L>0);const A=B.cloneNode(!0);if(_.body.appendChild(A),g()&&(_.body.removeChild(A),_.body.childElementCount||(d.removeChild(_.section),_=null,m()),p(),_=null,C(L>0),_.body.appendChild(A),g())){_.section.classList.add("quote-section--table-fragment--overflow"),L+=1;return}L+=1}),_=null};if(!c.length)return;c.forEach(E=>{E.getAttribute("data-block-type")==="table"?v(E):k(E)});const S=Array.from(s.children),j=[];if(S.forEach((E,I)=>{const $=E.querySelector(".quote-body");if(I!==0&&(!$||$.childElementCount===0)){E.remove();return}j.push(E)}),!n){const E=a.defaultView||window,I=Math.min(3,Math.max(1,E.devicePixelRatio||1)),$=$a()?Math.min(2,I):I;j.forEach(P=>$d(P,{pixelRatio:$}))}j.forEach((E,I)=>{const $=I===0;E.style.pageBreakAfter="auto",E.style.breakAfter="auto",E.style.pageBreakBefore=$?"auto":"always",E.style.breakBefore=$?"auto":"page",n?E.style.boxShadow="":E.style.boxShadow="none"});const Q=j[j.length-1]||null;l=Q,d=Q?.querySelector(".quote-body")||null,await kn(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function Ws(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function nu(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([Cd(),Pd()]),c=e.ownerDocument||document,l=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,l,c?.documentElement?.getAttribute?.("dir")].some(E=>typeof E=="string"&&E.toLowerCase().startsWith("rtl")),y=typeof window<"u"&&window.devicePixelRatio||1,f=Qs(),m=Kr(),p=$a();let g;p?g=1.5:m?g=Math.min(1.7,Math.max(1.2,y*1.1)):f?g=Math.min(1.8,Math.max(1.25,y*1.2)):g=Math.min(2,Math.max(1.6,y*1.4));const q=p||m?.9:f?.92:.95,k=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),v={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let S=0;const j=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let E=0;E<s.length;E+=1){const I=s[E];await Xr(I),await kn(I);const $=I.ownerDocument||document,P=$.createElement("div");Object.assign(P.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const H=I.cloneNode(!0);H.style.width=`${Gn}px`,H.style.maxWidth=`${Gn}px`,H.style.minWidth=`${Gn}px`,H.style.height=`${Wn}px`,H.style.maxHeight=`${Wn}px`,H.style.minHeight=`${Wn}px`,H.style.position="relative",H.style.background="#ffffff",Ws(H),P.appendChild(H),$.body.appendChild(P);let _;try{await kn(H),_=await i(H,{...v,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(D){throw fs(D,"pageCapture",{toastMessage:j}),D}finally{P.parentNode?.removeChild(P)}if(!_)continue;const L=_.width||1,C=(_.height||1)/L;let B=us,A=B*C,X=0;if(A>Qn){const D=Qn/A;A=Qn,B=B*D,X=Math.max(0,(us-B)/2)}const U=_.toDataURL("image/jpeg",q);S>0&&k.addPage(),k.addImage(U,"JPEG",X,0,B,A,`page-${S+1}`,"FAST"),S+=1,await new Promise(D=>window.requestAnimationFrame(D))}}catch(E){throw ys({safariWindowRef:n,mobileWindowRef:a}),E}if(S===0)throw ys({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(m||p){const E=k.output("blob");if(p){const I=URL.createObjectURL(E);En();try{window.location.assign(I)}catch($){bt("mobile safari blob navigation failed",$)}finally{setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{const I=URL.createObjectURL(E),$=()=>m&&n&&!n.closed?n:a&&!a.closed?a:null,P=(_,L)=>{if(En(),!_){window.location.assign(L);return}try{_.location.replace(L),_.focus?.()}catch(G){bt("direct blob navigation failed",G);try{_.document.open(),_.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${w(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${L}" title="PDF preview"></iframe></body></html>`),_.document.close()}catch(C){bt("iframe blob delivery failed",C),window.location.assign(L)}}},H=$();P(H,I),setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{En();const E=k.output("bloburl"),I=document.createElement("a");I.href=E,I.download=t,I.rel="noopener",I.style.display="none",document.body.appendChild(I),I.click(),setTimeout(()=>{URL.revokeObjectURL(E),I.remove()},2e3)}}function Gt(){if(!N||!W)return;const{previewFrame:e}=W;if(!e)return;const t=N.context||"reservation",n=ao({context:t,reservation:N.reservation,customer:N.customer,project:N.project,crewAssignments:N.crewAssignments,totals:N.totals,totalsDisplay:N.totalsDisplay,rentalDays:N.rentalDays,currencyLabel:N.currencyLabel,sections:N.sections,fieldSelections:N.fields,quoteNumber:N.quoteNumber,quoteDate:N.quoteDateLabel,terms:N.terms,projectCrew:N.projectCrew,projectExpenses:N.projectExpenses,projectEquipment:N.projectEquipment,projectInfo:N.projectInfo,clientInfo:N.clientInfo,paymentSummary:N.paymentSummary,projectTotals:N.projectTotals});Ft("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&($r(r),kr(r,s),_r(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await so(i,{context:"preview"}),Ws(i))}catch(m){console.error("[reservations/pdf] failed to layout preview document",m)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),l=a?.querySelector(".quote-preview-pages"),d=Gn;let u=18;if(l&&a?.defaultView){const m=a.defaultView.getComputedStyle(l),p=parseFloat(m.rowGap||m.gap||`${u}`);Number.isFinite(p)&&p>=0&&(u=p)}const y=Wn,f=c.length?c.length*y+Math.max(0,(c.length-1)*u):y;if(e.dataset.baseWidth=String(d),e.dataset.baseHeight=String(f),e.style.width=`${d}px`,e.style.minWidth=`${d}px`,e.style.height=`${f}px`,e.style.minHeight=`${f}px`,W?.previewFrameWrapper&&!W?.userAdjustedZoom){const m=W.previewFrameWrapper.clientWidth-24;m>0&&m<d?it=Math.max(m/d,.3):it=1}ro(it)}finally{En()}},{once:!0})}function au(e){if(!N)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?N.sections.add(n):N.sections.delete(n),Zr(N),io(),Gt())}function su(e){if(!N)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=N.context||"reservation",r=N.fields||(N.fields=_a(s)),i=fd(r,n);t.checked?i.add(a):i.delete(a),Zr(N),Gt()}function iu(e){if(!N)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(Ks(N,n),N.sectionExpansions[n]=t.open)}function io(){if(!W?.toggles||!N)return;const{toggles:e}=W,t=N.fields||{},n=N.context||"reservation";Ks(N);const a=ka(n),s=Dr(n),r=a.map(({id:i,labelKey:c,fallback:l})=>{const d=o(c,l),u=N.sections.has(i),y=s[i]||[],f=yd(N,i),m=y.length?`<div class="quote-toggle-sublist">
          ${y.map(p=>{const g=Vs(t,i,p.id),q=u?"":"disabled",k=p.labelKey?o(p.labelKey,p.fallback):p.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${p.id}" ${g?"checked":""} ${q}>
                <span>${w(k)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${i}" ${f?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${i}" ${u?"checked":""}>
            <span>${w(d)}</span>
          </label>
          ${y.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${m}
      </details>
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",au)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",su)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",iu)})}function ru(){if(W?.modal)return W;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${w(o("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${w(o("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
              <div class="quote-terms-editor" data-quote-terms-editor>
                <label class="quote-terms-editor__label" for="quote-terms-input">${w(o("reservations.quote.termsEditor.title","الشروط العامة (قابلة للتعديل)"))}</label>
                <textarea id="quote-terms-input" class="quote-terms-editor__textarea" rows="6" data-quote-terms-input placeholder="${w(o("reservations.quote.termsEditor.placeholder","اكتب كل شرط في سطر مستقل"))}"></textarea>
                <button type="button" class="quote-terms-reset" data-quote-terms-reset>${w(o("reservations.quote.termsEditor.reset","استعادة الشروط الافتراضية"))}</button>
              </div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${w(o("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${w(o("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),r=e.querySelector("[data-quote-terms-reset]"),i=e.querySelector("[data-quote-download]"),c=e.querySelector(".modal-header"),l=c?.querySelector(".btn-close"),d=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",c&&c.insertBefore(u,l||null);const y=document.createElement("iframe");y.className="quote-preview-frame",y.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),y.setAttribute("loading","lazy"),y.setAttribute("frameborder","0");const f=document.createElement("div");f.className="quote-preview-zoom-controls",f.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${w(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${w(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${w(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(y),n.innerHTML="";const p=document.createElement("div");p.className="quote-preview-scroll",p.appendChild(m),n.appendChild(p);const g=document.createElement("div");g.className="quote-preview-status",g.setAttribute("role","status"),g.setAttribute("aria-live","polite"),g.hidden=!0,g.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${w(Mr("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(f),i?.addEventListener("click",async()=>{if(N){i.disabled=!0;try{await oo()}finally{i.disabled=!1}}});const q=()=>{ms()||ps(e)};d.forEach(j=>{j?.addEventListener("click",q)}),l&&!d.includes(l)&&l.addEventListener("click",q),e.addEventListener("click",j=>{ms()||j.target===e&&ps(e)}),W={modal:e,toggles:t,preview:n,previewScroll:p,previewFrameWrapper:m,zoomControls:f,zoomValue:f.querySelector("[data-zoom-value]"),previewFrame:y,meta:a,downloadBtn:i,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const k=f.querySelector("[data-zoom-out]"),v=f.querySelector("[data-zoom-in]"),S=f.querySelector("[data-zoom-reset]");return k?.addEventListener("click",()=>_i(-.1)),v?.addEventListener("click",()=>_i(.1)),S?.addEventListener("click",()=>la(1,{markManual:!0})),s&&s.addEventListener("input",cu),r&&r.addEventListener("click",lu),la(it),W}function la(e,{silent:t=!1,markManual:n=!1}={}){it=Math.min(Math.max(e,.25),2.2),n&&W&&(W.userAdjustedZoom=!0),ro(it),!t&&W?.zoomValue&&(W.zoomValue.textContent=`${Math.round(it*100)}%`)}function _i(e){la(it+e,{markManual:!0})}function ro(e){if(!W?.previewFrame||!W.previewFrameWrapper)return;const t=W.previewFrame,n=W.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",Qs()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function ou(){if(!W?.meta||!N)return;const{meta:e}=W;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${w(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${w(N.quoteNumber)}</strong></div>
      <div><span>${w(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${w(N.quoteDateLabel)}</strong></div>
    </div>
  `}function Xs(){if(!W?.termsInput)return;const e=(N?.terms&&N.terms.length?N.terms:Oe).join(`
`);W.termsInput.value!==e&&(W.termsInput.value=e)}function cu(e){if(!N)return;const t=cs(e?.target?.value??"");if(t.length){N.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{N.terms=[...Oe],Xs();const n=Oe.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}Gt()}function lu(e){if(e?.preventDefault?.(),!N)return;N.terms=[...Oe];const t=document.getElementById("reservation-terms");t&&(t.value=Oe.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=Oe.join(`
`)),Xs(),Gt()}async function oo(){if(!N)return;Ft("export");const t=!Qs()&&Kr(),n=$a(),a=null,s=!n&&t?window.open("","_blank"):null;(l=>{if(l)try{l.document.open(),l.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${w(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${w(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${w(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),l.document.close()}catch(d){bt("failed to prime download window",d)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await Td(),Ua("html2pdf ensured");const l=N.context||"reservation",d=ao({context:l,reservation:N.reservation,customer:N.customer,project:N.project,crewAssignments:N.crewAssignments,totals:N.totals,totalsDisplay:N.totalsDisplay,rentalDays:N.rentalDays,currencyLabel:N.currencyLabel,sections:N.sections,fieldSelections:N.fields,quoteNumber:N.quoteNumber,quoteDate:N.quoteDateLabel,terms:N.terms,projectCrew:N.projectCrew,projectExpenses:N.projectExpenses,projectEquipment:N.projectEquipment,projectInfo:N.projectInfo,clientInfo:N.clientInfo,paymentSummary:N.paymentSummary,projectTotals:N.projectTotals});i=document.createElement("div"),i.innerHTML=d,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),$r(i),kr(i),_r(i),Ua("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await so(u,{context:"export"}),await kn(u),Ws(u),Ua("layout complete for export document")}catch(f){fs(f,"layoutQuoteDocument",{suppressToast:!0})}}const y=`quotation-${N.quoteNumber}.pdf`;await nu(u,{filename:y,safariWindowRef:s,mobileWindowRef:a}),N.sequenceCommitted||(Bd(N.quoteSequence),N.sequenceCommitted=!0)}catch(l){ys({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,fs(l,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),En()}}function co(){const e=ru();e?.modal&&(Sn=!1,it=1,W&&(W.userAdjustedZoom=!1),la(it,{silent:!0}),io(),ou(),Xs(),Gt(),md(e.modal))}async function du({reservation:e,customer:t,project:n}){if(!e){x(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=zd(e),{totalsDisplay:s,totals:r,rentalDays:i}=Hd(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:l,quoteNumber:d}=Jr("reservation"),u=new Date,y=ed();N={context:"reservation",reservation:e,customer:t,project:n,crewAssignments:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(ka("reservation").filter(f=>f.defaultSelected).map(f=>f.id)),sectionExpansions:Us("reservation"),fields:_a("reservation"),terms:y,quoteSequence:l,quoteNumber:d,quoteDate:u,quoteDateLabel:to(u),sequenceCommitted:!1},eo(N),co()}async function um({project:e}){if(!e){x(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=Zd(e),{project:n}=t;if(!n){x(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=Jr("project"),r=new Date,i=[...Zl];N={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(ka("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:Us("project"),fields:_a("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:to(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},eo(N),co()}function uu({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=Cn(),{reservations:r=[],customers:i=[],technicians:c=[],projects:l=[]}=ye(),d=r.map(v=>{const S=Ga(v);return{...S,id:v.id??S.id,reservationId:v.reservationId??v.reservation_id??S.reservationId,reservationCode:v.reservationCode??v.reservation_code??S.reservationCode}}),u=d,y=Array.isArray(s)?s:c||[],f=new Map((l||[]).map(v=>[String(v.id),v])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!u||u.length===0){m.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const p=t||Ml(),g=new Map(i.map(v=>[String(v.id),v])),q=new Map(y.map(v=>[String(v.id),v])),k=Vl({reservations:d,filters:p,customersMap:g,techniciansMap:q,projectsMap:f});if(k.length===0){m.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${Ul({entries:k,customersMap:g,techniciansMap:q,projectsMap:f})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(v=>{const S=Number(v.dataset.reservationIndex);Number.isNaN(S)||v.addEventListener("click",()=>{typeof n=="function"&&n(S)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(v=>{const S=Number(v.dataset.reservationIndex);Number.isNaN(S)||v.addEventListener("click",j=>{j.stopPropagation(),typeof a=="function"&&a(S,j)})})}function mu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=ye(),c=s.map(S=>{const j=Ga(S);return{...j,id:S.id??j.id,reservationId:S.reservationId??S.reservation_id??j.reservationId,reservationCode:S.reservationCode??S.reservation_code??j.reservationCode}}),l=s[e];if(!l)return x(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=c[e]??Ga(l),u=r.find(S=>String(S.id)===String(l.customerId)),y=l.projectId?i.find(S=>String(S.id)===String(l.projectId)):null,f=document.getElementById("reservation-details-body");if(f){const S=Cn()||[];f.innerHTML=Kl(d,u,S,e,y)}const m=document.getElementById("reservationDetailsModal"),p=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},g=document.getElementById("reservation-details-edit-btn");g&&(g.onclick=()=>{p(),typeof t=="function"&&t(e,{reservation:l,customer:u,getEditContext:a})});const q=document.getElementById("reservation-details-delete-btn");q&&(q.onclick=()=>{p(),typeof n=="function"&&n(e,{reservation:l,customer:u})});const k=f?.querySelector('[data-action="open-project"]');k&&y&&k.addEventListener("click",()=>{p();const S=y?.id!=null?String(y.id):"",j=S?`projects.html?project=${encodeURIComponent(S)}`:"projects.html";window.location.href=j});const v=document.getElementById("reservation-details-export-btn");return v&&(v.onclick=async S=>{S?.preventDefault?.(),S?.stopPropagation?.(),v.blur();try{await du({reservation:l,customer:u,project:y})}catch(j){console.error("❌ [reservations] export to PDF failed",j),x(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}function lo(){const e=()=>{jn(),Fe(),Cn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let $i=!1,Pi=null;function pu(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function mm(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=pu(n);if(!a&&$i&&Dt().length>0&&s===Pi)return Dt();try{const r=await Ki(n||{});return $i=!0,Pi=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return Dt()}}async function fu(e,{onAfterChange:t}={}){if(!Ot())return Pn(),!1;const a=Dt()[e];if(!a)return x(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return x(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await Ac(s),lo(),t?.({type:"deleted",reservation:a}),x(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=ya(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return x(i,"error"),!1}}async function yu(e,{onAfterChange:t}={}){const a=Dt()[e];if(!a)return x(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return x(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=kt(a);if(r)return x(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await Ic(s);return lo(),t?.({type:"confirmed",reservation:i}),x(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=ya(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return x(c,"error"),!1}}function dn(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:wn(e,n),end:wn(t,a)}}function da(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Js(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function uo(){const{container:e,select:t,hint:n,addButton:a}=Js();if(!t)return;const s=t.value,r=Di(),i=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,l=r.map(u=>{const y=Number.isFinite(Number(u.price))?Number(u.price):0,f=h(y.toFixed(2)),m=`${u.name} — ${f} ${i}`;return`<option value="${da(u.id)}">${da(m)}</option>`}).join("");t.innerHTML=`${c}${l}`;const d=r.length>0;t.disabled=!d,a&&(a.disabled=!d),e&&(e.hidden=!d,e.setAttribute("aria-hidden",d?"false":"true")),n&&(d?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),d&&s&&r.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function bu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||x(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=$t(),{start:r,end:i}=dn(),{reservations:c=[]}=ye(),l=a!=null&&c[a]||null,d=l?.id??l?.reservationId??null,u=vr(n,{existingItems:s,start:r,end:i,ignoreReservationId:d});if(!u.success)return t||x(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const y=[...s,u.package];return Pt(a,y),_t(y),Xe(),t||x(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function Ci(){const{select:e}=Js();if(!e)return;const t=e.value||"";bu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function gu(){const{addButton:e,select:t}=Js();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{Ci()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Ci())}),t.dataset.listenerAttached="true"),uo()}function _t(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,ji(t);return}const l=rn(e);t.innerHTML=l.map(d=>{const u=d.items[0]||{},y=Ut(u)||d.image,f=y?`<img src="${y}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=d.items.some(_=>_?.type==="package"),p=h(String(d.count)),g=Te(d.unitPrice),q=Number.isFinite(g)?he(g):0,k=Te(d.totalPrice),v=Number.isFinite(k)?k:q*(Number.isFinite(d.count)?d.count:1),S=he(v),j=`${h(q.toFixed(2))} ${a}`,Q=`${h(S.toFixed(2))} ${a}`,E=d.barcodes.map(_=>h(String(_||""))).filter(Boolean),I=E.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${E.map(_=>`<li>${_}</li>`).join("")}
            </ul>
          </details>`:"";let $="";if(m){const _=new Map,L=C=>{const B=Number.parseFloat(h(String(C??"")).replace(/[^0-9.]/g,""));return!Number.isFinite(B)||B<=0||B>99?1:Math.round(B)},G=[];if(Array.isArray(d.packageItems)&&d.packageItems.length&&G.push(...d.packageItems),d.items.forEach(C=>{Array.isArray(C?.packageItems)&&G.push(...C.packageItems)}),G.forEach(C=>{if(!C)return;const B=ee(C.barcode||C.normalizedBarcode||C.desc||Math.random());if(!B)return;const A=_.get(B),X=L(C.qtyPerPackage??C.perPackageQty??C.quantityPerPackage??C.qty??C.quantity??1),U=Math.max(1,Math.min(X,99));if(A){A.qty=U;return}_.set(B,{desc:C.desc||C.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:U,barcode:C.barcode??C.normalizedBarcode??""})}),_.size){const C=Array.from(_.values()).map(B=>{const A=h(String(B.qty>0?Math.min(B.qty,99):1)),X=da(B.desc||""),U=B.barcode?` <span class="reservation-package-items__barcode">(${da(h(String(B.barcode)))})</span>`:"";return`<li>${X}${U} × ${A}</li>`}).join("");$=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${C}
              </ul>
            </details>
          `}}const P=m?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",H=m?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${d.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${d.description||"-"}</div>
                ${m?`${$||""}${I||""}`:I}
              </div>
            </div>
          </td>
          <td>
            <div class="${P}" data-group-key="${d.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${d.key}" aria-label="${i}"${H}>−</button>
              <span class="reservation-qty-value">${p}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${d.key}" aria-label="${r}"${H}>+</button>
            </div>
          </td>
          <td>${j}</td>
          <td>${Q}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),ji(t)}function hu(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function Pa(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=Ca();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,Ti();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${h(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${h(Number(s.percentage).toFixed(2))}%`:"—",l=s?.recordedAt?h(Ge(s.recordedAt)):"—",d=hu(s?.type),u=s?.note?h(s.note):"";return`
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
  `,Ti()}function vu(){if(_n()){x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=fo(e);let a=yo(t);if(!Number.isFinite(a)||a<=0){x(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=Wa.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,l=o("reservations.create.summary.currency","SR");let d=null,u=null;if(n==="percent"){const f=Math.max(0,100-i);if(f<=1e-4){x(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const p=h(m.toFixed(2));x(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",p)),a=m}u=Number(a.toFixed(2)),r>0&&(d=a/100*r)}else{const f=Math.max(0,r-c);if(f<=1e-4){x(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const p=`${h(m.toFixed(2))} ${l}`;x(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",p)),a=m}d=Number(a.toFixed(2)),r>0&&(u=d/r*100)}d!=null&&(d=Number(d.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const y={type:n,value:a,amount:d,percentage:u,recordedAt:new Date().toISOString()};$u(y),Ys(Ca()),Pa(),Xe(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),x(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function Ti(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(_n()){n.preventDefault(),x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}vu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(_n()){n.preventDefault(),x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(Pu(s),Ys(Ca()),Pa(),Xe(),x(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function qu(e){const{index:t,items:n}=$t(),s=rn(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,l)=>l!==r);Pt(t,i),_t(i),Xe()}function Su(e){const{index:t,items:n}=$t(),a=n.filter(s=>fa(s)!==e);a.length!==n.length&&(Pt(t,a),_t(a),Xe())}function Eu(e){const{index:t,items:n}=$t(),s=rn(n).find(q=>q.key===e);if(!s||s.items.some(q=>q?.type==="package"))return;const{start:r,end:i}=dn();if(!r||!i){x(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=ye(),l=t!=null&&c[t]||null,d=l?.id??l?.reservationId??null,u=new Set(n.map(q=>ee(q.barcode))),{equipment:y=[]}=ye(),f=(y||[]).find(q=>{const k=ee(q?.barcode);return!k||u.has(k)||fa({desc:q?.desc||q?.description||q?.name||"",price:Number(q?.price)||0})!==e||!Ts(q)?!1:!ct(k,r,i,d)});if(!f){x(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const m=ee(f.barcode),p=Vt(f);if(!p){x(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:p,equipmentId:p,barcode:m,desc:f.desc||f.description||f.name||s.description||"",qty:1,price:Number.isFinite(Number(f.price))?Number(f.price):s.unitPrice,image:Ut(f)}];Pt(t,g),_t(g),Xe()}function ji(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){qu(s);return}if(a==="increase-edit-group"&&s){Eu(s);return}if(a==="remove-edit-group"&&s){Su(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||Au(i)}}),e.dataset.groupListenerAttached="true")}function _n(){return!!document.getElementById("edit-res-project")?.value}function xu(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{_n()&&(x(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function wu(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),l=document.getElementById("edit-res-payment-history");[n,a,s,r,i,c,l].forEach(xu),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s&&(s.value="unpaid",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),l&&(l.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.dataset.linkedDisabled="false"))}function Xe(){const e=document.getElementById("edit-res-summary");if(!e)return;Pa();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),Qe(a),Xe()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=_n();wu(c);const l=document.getElementById("edit-res-tax"),d=c?!1:l?.checked||!1,u=!c&&a?.dataset?.userSelected==="true",y=c?"unpaid":u&&a?.value||"unpaid";let f=null;!c&&d&&(Ze("edit-res-company-share"),f=nn("edit-res-company-share"),(!Number.isFinite(f)||f<=0)&&(Ze("edit-res-company-share"),f=nn("edit-res-company-share")));const{items:m=[],payments:p=[]}=$t(),{start:g,end:q}=dn(),k=Wa({items:m,discount:r,discountType:i,applyTax:d,paidStatus:y,start:g,end:q,companySharePercent:f,paymentHistory:p});e.innerHTML=k;const v=Wa.lastResult;if(v&&a){const S=v.paymentStatus;u?Qe(a,a.value):(a.value!==S&&(a.value=S),a.dataset&&delete a.dataset.userSelected,Qe(a,S))}else a&&Qe(a,a.value)}function Au(e){if(e==null)return;const{index:t,items:n}=$t();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);Pt(t,a),_t(a),Xe()}function Iu(e){const t=e?.value??"",n=ee(t);if(!n)return;const a=ga(n);if(!a){x(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=gt(a);if(s==="maintenance"||s==="retired"){x(Ht(s));return}const r=ee(n),{index:i,items:c=[]}=$t();if(c.findIndex(q=>ee(q.barcode)===r)>-1){x(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=dn();if(!d||!u){x(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:y=[]}=ye(),f=i!=null&&y[i]||null,m=f?.id??f?.reservationId??null;if(ct(r,d,u,m)){x(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const p=Vt(a);if(!p){x(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:p,equipmentId:p,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];Pt(i,g),e&&(e.value=""),_t(g),Xe()}function ua(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=yr(t),a=ee(n?.barcode||t);if(!n||!a){x(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=gt(n);if(s==="maintenance"||s==="retired"){x(Ht(s));return}const{start:r,end:i}=dn();if(!r||!i){x(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:l=[]}=$t();if(l.some(g=>ee(g.barcode)===a)){x(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=ye(),y=c!=null&&u[c]||null,f=y?.id??y?.reservationId??null;if(ct(a,r,i,f)){x(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=Vt(n);if(!m){x(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const p=[...l,{id:m,equipmentId:m,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];Pt(c,p),_t(p),Xe(),e.value=""}function mo(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),ua(e))});const t=()=>{br(e.value,"edit-res-equipment-description-options")&&ua(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{Xe()});const e=()=>{gu()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{uo()})}typeof window<"u"&&(window.getEditReservationDateRange=dn,window.renderEditPaymentHistory=Pa);function ku(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){is(e);return}ua(e)}}function pm(){It(),mo()}function _u(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let $n=null,st=[],rt=[],bs=null,Be={},Ka=!1;function gs(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function hs(){return document.getElementById("edit-res-confirmed")?.value==="true"}function $t(){return{index:$n,items:st,payments:rt}}function Pt(e,t,n=rt){$n=typeof e=="number"?e:null,st=Array.isArray(t)?[...t]:[],rt=Array.isArray(n)?[...n]:[]}function po(){$n=null,st=[],$c(),rt=[]}function Ca(){return[...rt]}function Ys(e){rt=Array.isArray(e)?[...e]:[]}function $u(e){e&&(rt=[...rt,e])}function Pu(e){!Number.isInteger(e)||e<0||(rt=rt.filter((t,n)=>n!==e))}function xn(e,t=1){const n=Number.parseFloat(h(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function vs(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(h(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function Cu(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?ee(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:xn(e.qty??e.quantity??e.count??1),price:vs(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function Tu(e,t=0){if(!e||typeof e!="object")return null;const n=An(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=xn(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),r=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:ws(e)).map(f=>Cu(f)).filter(Boolean),i=e.total_price??e.totalPrice??e.total??null;let c=vs(e.unit_price??e.unitPrice??e.price??null,0);if((!c||c===0)&&i!=null){const f=vs(i,0);f>0&&a>0&&(c=Number((f/a).toFixed(2)))}const l=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,l,n].find(f=>f!=null&&String(f).trim()!=="")||`Package ${n}`,y=e.image??e.cover??e.thumbnail??r.find(f=>f?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:h(String(u)),name:h(String(u)),qty:a,price:c,barcode:l,packageItems:r,image:y}}function ju(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const r=s-n;e.set(a,r>0?r:0)})}function Nu(e={},t=[]){const n=Array.isArray(t)?t.map(c=>({...c})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((c,l)=>Tu(c,l)).filter(Boolean);if(!s.length)return n;const r=new Map;s.forEach(c=>{const l=xn(c.qty??c.quantity??1);if(c.barcode){const d=ee(c.barcode);if(d){const u=`package::${d}`;r.set(u,(r.get(u)??0)+l)}}(c.packageItems||[]).forEach(d=>{if(!d)return;const u=l*xn(d.qty??d.quantity??1),y=d.equipmentId??null,f=d.normalizedBarcode||(d.barcode?ee(d.barcode):null);if(y!=null){const m=`equipment::${String(y)}`;r.set(m,(r.get(m)??0)+u)}if(f){const m=`barcode::${f}`;r.set(m,(r.get(m)??0)+u)}})});const i=[];return n.forEach(c=>{if(!c||typeof c!="object"){i.push(c);return}if(c.type==="package"){const q=An(c.packageId??c.package_id??c.id??"");s.some(v=>v.packageId===q)||i.push({...c});return}const l=xn(c.qty??c.quantity??1),d=Vt(c),u=c.barcode?ee(c.barcode):null,y=[];d!=null&&y.push(`equipment::${String(d)}`),u&&y.push(`barcode::${u}`);const f=y.map(q=>r.get(q)??0).filter(q=>q>0);if(!f.length){i.push({...c});return}const m=Math.min(...f);if(m<=0){i.push({...c});return}const p=Math.min(m,l);if(ju(r,y,p),p>=l)return;const g=l-p;i.push({...c,qty:g,quantity:g})}),[...i,...s.map(c=>({...c}))]}function Lu(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function fo(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function yo(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Bu(e,t){if(e){e.value="";return}}function gn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function bo(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),l=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,d=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:l,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:d}}function Du(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((l,d)=>String(d.createdAt||d.start||"").localeCompare(String(l.createdAt||l.start||""))):[],c=[`<option value="">${gn(a)}</option>`];i.forEach(l=>{c.push(`<option value="${gn(l.id)}">${gn(l.title||a)}</option>`)}),r&&!i.some(l=>String(l.id)===r)&&c.push(`<option value="${gn(r)}">${gn(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function go(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const l=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",l&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}qs("tax");const c=Be?.updateEditReservationSummary;typeof c=="function"&&c()}function qs(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=Be?.updateEditReservationSummary;typeof r=="function"&&r()};if(Ka){a();return}Ka=!0;const s=()=>{Ka=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(xt)),t.disabled){n.checked=!1,x(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),Ze("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Ze("edit-res-company-share"):n.checked&&(n.checked=!1));s()}async function Ni(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:l}=ye(),u=Dt()?.[e];if(!u){x(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}Be={...Be,reservation:u,projects:l||[]},t?.(),Du(l||[],u);const y=u.projectId&&l?.find?.(F=>String(F.id)===String(u.projectId))||null,{effectiveConfirmed:f,projectLinked:m}=kt(u,y),p=u.items?u.items.map(F=>({...F,equipmentId:F.equipmentId??F.equipment_id??F.id,barcode:ee(F?.barcode)})):[],g=Nu(u,p),k=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(F=>bo(F)).filter(Boolean);Pt(e,g,k);const v=o("reservations.list.unknownCustomer","غير معروف"),S=c?.find?.(F=>String(F.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const j=document.getElementById("edit-res-id");j&&(j.value=u.reservationId||u.id);const Q=document.getElementById("edit-res-customer");Q&&(Q.value=S?.customerName||v);const E=typeof a=="function"?a(u.start):{date:"",time:""},I=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",E.date),n?.("edit-res-start-time",E.time),n?.("edit-res-end",I.date),n?.("edit-res-end-time",I.time);const $=document.getElementById("edit-res-notes");$&&($.value=u.notes||"");const P=document.getElementById("edit-res-discount");if(P){const F=m?0:u.discount??0;P.value=h(F)}const H=document.getElementById("edit-res-discount-type");H&&(H.value=m?"percent":u.discountType||"percent");const _=u.projectId?!1:!!u.applyTax,L=document.getElementById("edit-res-tax");L&&(L.checked=_);const G=document.getElementById("edit-res-company-share");if(G){const F=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,R=F!=null?Number.parseFloat(h(String(F).replace("%","").trim())):NaN,M=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,K=M!=null?M===!0||M===1||M==="1"||String(M).toLowerCase()==="true":Number.isFinite(R)&&R>0,se=K&&Number.isFinite(R)&&R>0?R:xt,te=_||K;G.checked=te,G.dataset.companyShare=String(se)}gs(f,{disable:m});const C=document.getElementById("edit-res-paid"),B=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");C&&(C.value=B,C.dataset&&delete C.dataset.userSelected);const A=document.getElementById("edit-res-payment-progress-type"),X=document.getElementById("edit-res-payment-progress-value");A?.dataset?.userSelected&&delete A.dataset.userSelected,A&&(A.value="percent"),Bu(X);const U=Array.isArray(u.crewAssignments)&&u.crewAssignments.length?u.crewAssignments:Array.isArray(u.techniciansDetails)&&u.techniciansDetails.length?u.techniciansDetails:(u.technicians||[]).map(F=>String(F));try{await Pc()}catch(F){console.warn("[reservationsEdit] positions load failed (non-fatal)",F)}if(Cc(U),s?.(g),typeof window<"u"){const F=window?.renderEditPaymentHistory;typeof F=="function"&&F()}go(),r?.();const D=document.getElementById("editReservationModal");bs=Lu(D,i),bs?.show?.()}async function Fu({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:r,populateEquipmentDescriptionLists:i,handleReservationsMutation:c}={}){if($n===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const l=document.getElementById("edit-res-start")?.value?.trim(),d=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),y=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",f=document.getElementById("edit-res-notes")?.value||"",m=h(document.getElementById("edit-res-discount")?.value||"0");let p=parseFloat(m)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const q=hs(),k=document.getElementById("edit-res-paid"),v=k?.dataset?.userSelected==="true",S=v&&k?.value||"unpaid",j=document.getElementById("edit-res-payment-progress-type"),Q=document.getElementById("edit-res-payment-progress-value"),E=fo(j),I=yo(Q),$=document.getElementById("edit-res-project")?.value||"",P=kc();P.map(Y=>Y?.technicianId).filter(Boolean);const H=document.getElementById("edit-res-company-share"),_=document.getElementById("edit-res-tax");if(!l||!u){x(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const L=typeof e=="function"?e:(Y,be)=>`${Y}T${be||"00:00"}`,G=L(l,d),C=L(u,y);if(G&&C&&new Date(G)>new Date(C)){x(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const A=Dt()?.[$n];if(!A){x(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(st)||st.length===0&&P.length===0){x(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const X=typeof t=="function"?t:()=>!1,U=A.id??A.reservationId;for(const Y of st){if(Y?.type==="package"&&Array.isArray(Y.packageItems)){for(const T of Y.packageItems){const ie=T?.barcode??T?.normalizedBarcode??"";if(!ie)continue;const fe=gt(ie);if(fe==="reserved"){const ge=ee(ie);if(!X(ge,G,C,U))continue}if(fe!=="available"){x(Ht(fe));return}}continue}const be=gt(Y.barcode);if(be==="reserved"){const T=ee(Y.barcode);if(!X(T,G,C,U))continue}if(be!=="available"){x(Ht(be));return}}for(const Y of st){if(Y?.type==="package"&&Array.isArray(Y.packageItems)){for(const T of Y.packageItems){const ie=ee(T?.barcode??T?.normalizedBarcode??"");if(ie&&X(ie,G,C,U)){const fe=T?.desc||T?.barcode||o("reservations.create.packages.unnamedItem","معدة بدون اسم"),ge=`${o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${h(String(fe))})`;x(ge);return}}continue}const be=ee(Y.barcode);if(X(be,G,C,U)){x(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const D=typeof n=="function"?n:()=>!1;for(const Y of st){if(Y?.type!=="package")continue;const be=Y.packageId??Y.package_id??null;if(be&&D(be,G,C,U)){const T=Y.desc||Y.packageName||o("reservations.create.packages.genericName","الحزمة");x(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${h(String(T))} محجوزة بالفعل في الفترة المختارة`));return}}const F=typeof a=="function"?a:()=>!1;for(const Y of P)if(Y?.technicianId&&F(Y.technicianId,G,C,U)){x(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const R=Array.isArray(Be.projects)&&Be.projects.length?Be.projects:ye().projects||[],M=$&&R.find(Y=>String(Y.id)===String($))||null,K={...A,projectId:$?String($):null,confirmed:q},{effectiveConfirmed:se,projectLinked:te,projectStatus:ue}=kt(K,M);let J=!!H?.checked,oe=!!_?.checked;if(te&&(J&&(H.checked=!1,J=!1),oe=!1),!te&&J!==oe){x(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}oe&&(Ze("edit-res-company-share"),J=!!H?.checked);let qe=J?getCompanySharePercent("edit-res-company-share"):null;J&&(!Number.isFinite(qe)||qe<=0)&&(Ze("edit-res-company-share"),qe=getCompanySharePercent("edit-res-company-share"));const Se=J&&oe&&Number.isFinite(qe)&&qe>0,Ce=te?!1:oe;te&&(p=0,g="percent");const V=Is(st,p,g,Ce,P,{start:G,end:C,companySharePercent:Se?qe:0});let Z=Ca();if(Number.isFinite(I)&&I>0){const Y=V;let be=null,T=null;E==="amount"?(be=I,Y>0&&(T=I/Y*100)):(T=I,Y>0&&(be=I/100*Y));const ie=bo({type:E,value:I,amount:be,percentage:T,recordedAt:new Date().toISOString()});ie&&(Z=[...Z,ie],Ys(Z)),Q&&(Q.value="")}const ne=ks({totalAmount:V,history:Z}),Ee=_s({manualStatus:S,paidAmount:ne.paidAmount,paidPercent:ne.paidPercent,totalAmount:V});k&&!v&&(k.value=Ee,k.dataset&&delete k.dataset.userSelected);let Re=A.status??"pending";te?Re=M?.status??ue??Re:["completed","cancelled"].includes(String(Re).toLowerCase())||(Re=q?"confirmed":"pending");const ae=Hi({reservationCode:A.reservationCode??A.reservationId??null,customerId:A.customerId,start:G,end:C,status:Re,title:A.title??null,location:A.location??null,notes:f,projectId:$?String($):null,totalAmount:V,discount:p,discountType:g,applyTax:Ce,paidStatus:Ee,confirmed:se,items:st.map(Y=>({...Y,equipmentId:Y.equipmentId??Y.id})),crewAssignments:P,companySharePercent:Se?qe:null,companyShareEnabled:Se,paidAmount:ne.paidAmount,paidPercentage:ne.paidPercent,paymentProgressType:ne.paymentProgressType,paymentProgressValue:ne.paymentProgressValue,paymentHistory:Z});try{const Y=await _c(A.id||A.reservationId,ae);await Ki(),jn(),Fe(),x(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),po(),c?.({type:"updated",reservation:Y}),r?.(),i?.(),bs?.hide?.()}catch(Y){console.error("❌ [reservationsEdit] Failed to update reservation",Y);const be=ya(Y)?Y.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");x(be,"error")}}function fm(e={}){Be={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=Be,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=h(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{qs("tax")}),c.dataset.listenerAttached="true");const l=document.getElementById("edit-res-company-share");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{qs("share")}),l.dataset.listenerAttached="true");const d=document.getElementById("edit-res-payment-progress-type");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{d.dataset.userSelected="true",t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const y=document.getElementById("edit-res-project");y&&!y.dataset.listenerAttached&&(y.addEventListener("change",()=>{go();const q=Array.isArray(Be.projects)&&Be.projects.length?Be.projects:ye().projects||[],k=y.value&&q.find(E=>String(E.id)===String(y.value))||null,S={...Be?.reservation??{},projectId:y.value||null,confirmed:hs()},{effectiveConfirmed:j,projectLinked:Q}=kt(S,k);gs(j,{disable:Q}),t?.()}),y.dataset.listenerAttached="true");const f=document.getElementById("edit-res-confirmed-btn");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{if(f.disabled)return;const q=!hs();gs(q),t?.()}),f.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{Fu(Be).catch(q=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",q)})}),m.dataset.listenerAttached="true");const p=document.getElementById("edit-res-equipment-barcode");if(p&&!p.dataset.listenerAttached){let q=null;const k=()=>{p.value?.trim()&&(clearTimeout(q),q=null,n?.(p))};p.addEventListener("keydown",S=>{S.key==="Enter"&&(S.preventDefault(),k())});const v=()=>{if(clearTimeout(q),!p.value?.trim())return;const{start:S,end:j}=getEditReservationDateRange();!S||!j||(q=setTimeout(()=>{k()},150))};p.addEventListener("input",v),p.addEventListener("change",k),p.dataset.listenerAttached="true"}mo?.();const g=document.getElementById("editReservationModal");g&&!g.dataset.cleanupAttached&&(g.addEventListener("hidden.bs.modal",()=>{po(),t?.(),s?.([])}),g.dataset.cleanupAttached="true")}const Ru=ye()||{};let Ye=(Ru.projects||[]).map(Hu),Ln=!1;function ym(){return Ye}function Ta(e){Ye=Array.isArray(e)?e.map(ei):[],Es({projects:Ye});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return Ye}async function Mu(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,l])=>{l==null||l===""||t.set(c,String(l))});const n=t.toString(),s=(await ot(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(Zs);return Ta(i),Ln=!0,Ye}async function zu({force:e=!1,params:t=null}={}){if(!e&&Ln&&Ye.length>0)return Ye;try{return await Mu(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),Ye}}async function bm(e){const t=await ot("/projects/",{method:"POST",body:e}),n=Zs(t?.data??{}),a=[...Ye,n];return Ta(a),Ln=!0,n}async function gm(e,t){const n=await ot(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=Zs(n?.data??{}),s=Ye.map(r=>String(r.id)===String(e)?a:r);return Ta(s),Ln=!0,a}async function hm(e){await ot(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=Ye.filter(n=>String(n.id)!==String(e));Ta(t),Ln=!0}function vm({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:l,paymentStatus:d,equipmentEstimate:u=0,expenses:y=[],taxAmount:f=0,totalWithTax:m=0,discount:p=0,discountType:g="percent",companyShareEnabled:q=!1,companySharePercent:k=null,companyShareAmount:v=0,paidAmount:S=null,paidPercentage:j=null,paymentProgressType:Q=null,paymentProgressValue:E=null,confirmed:I=!1,technicians:$=[],equipment:P=[],payments:H,paymentHistory:_}={}){const L=Array.isArray($)?$.map(R=>Number.parseInt(String(R),10)).filter(R=>Number.isInteger(R)&&R>0):[],G=Array.isArray(P)?P.map(R=>{const M=Number.parseInt(String(R.equipmentId??R.equipment_id??R.id??0),10),K=Number.parseInt(String(R.qty??R.quantity??0),10);return!Number.isInteger(M)||M<=0?null:{equipment_id:M,quantity:Number.isInteger(K)&&K>0?K:1}}).filter(Boolean):[],C=Array.isArray(y)?y.map(R=>{const M=Number.parseFloat(R?.amount??R?.value??0)||0,K=(R?.label??R?.name??"").trim();return K?{label:K,amount:Math.round(M*100)/100}:null}).filter(Boolean):[],B=C.reduce((R,M)=>R+(M?.amount??0),0),A={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!l,payment_status:d??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(B*100)/100,tax_amount:Math.round((Number.parseFloat(f)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(m)||0)*100)/100,confirmed:!!I,technicians:L,equipment:G,expenses:C},X=Math.max(0,Number.parseFloat(p)||0);A.discount=X,A.discount_type=g==="amount"?"amount":"percent";const U=Number.parseFloat(k),D=!!q&&Number.isFinite(U)&&U>0;A.company_share_enabled=D,A.company_share_percent=D?U:0,A.company_share_amount=D?Math.max(0,Number.parseFloat(v)||0):0,Number.isFinite(Number(S))&&(A.paid_amount=Math.max(0,Number.parseFloat(S)||0)),Number.isFinite(Number(j))&&(A.paid_percentage=Math.max(0,Number.parseFloat(j)||0)),(Q==="amount"||Q==="percent")&&(A.payment_progress_type=Q),E!=null&&E!==""&&(A.payment_progress_value=Number.parseFloat(E)||0),e&&(A.project_code=String(e).trim());const F=H!==void 0?H:_;if(F!==void 0){const R=ho(F)||[];A.payments=R.map(M=>({type:M.type,amount:M.amount!=null?M.amount:null,percentage:M.percentage!=null?M.percentage:null,value:M.value!=null?M.value:null,note:M.note??null,recorded_at:M.recordedAt??null}))}return A.end_datetime||delete A.end_datetime,A.client_company||(A.client_company=null),A}function Zs(e={}){return ei(e)}function Hu(e={}){return ei(e)}function ei(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(m=>{if(m==null)return null;if(typeof m=="object"){const p=m.id??m.technician_id??m.technicianId;return p!=null?String(p):null}return String(m)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(m=>{const p=m?.equipment_id??m?.equipmentId??m?.id??null,g=m?.quantity??m?.qty??0,q=m?.barcode??m?.code??"",k=m?.description??m?.name??"";return{equipmentId:p!=null?String(p):null,qty:Number.parseInt(String(g),10)||0,barcode:q,description:k}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((m,p)=>({id:m?.id??`expense-${t??"x"}-${p}`,label:m?.label??"",amount:Number.parseFloat(m?.amount??0)||0})),l=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,d=e.company_share_enabled??e.companyShareEnabled,u=d!=null?d===!0||d===1||String(d).toLowerCase()==="true":l>0,y=e.payment_history??e.paymentHistory??e.payments??null,f=ho(y);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?l:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(m=>typeof m=="object"?m:{id:m}),equipment:r,expenses:c,paymentHistory:f}}function qm(e){return e instanceof Li}function Qa(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function Ou(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=Qa(e.value);let s=Qa(e.amount),r=Qa(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,l=e.recordedAt??e.recorded_at??e.date??null;let d=null;if(l){const y=new Date(l);Number.isNaN(y.getTime())||(d=y.toISOString())}d||(d=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:d}}function ho(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>Ou(t)).filter(Boolean):[]}const ma="reservations-ui:ready",Lt=typeof EventTarget<"u"?new EventTarget:null;let Bt={};function Vu(e){return Object.freeze({...e})}function Uu(){if(!Lt)return;const e=Bt,t=typeof CustomEvent=="function"?new CustomEvent(ma,{detail:e}):{type:ma,detail:e};typeof Lt.dispatchEvent=="function"&&Lt.dispatchEvent(t)}function Ku(e={}){if(!e||typeof e!="object")return Bt;const t={...Bt};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),Bt=Vu(t),Uu(),Bt}function Qu(e){if(e)return Bt?.[e]}function Sm(e){const t=Qu(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const i=(s?.detail||Bt)?.[e];typeof i=="function"&&(Lt&&Lt.removeEventListener(ma,a),n(i))};Lt&&Lt.addEventListener(ma,a)})}function Em(){return zu().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=ye()||{};Tc(e||[]),xr()})}function ti(e=null){xr(),vo(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Gu(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Ss(){return{populateEquipmentDescriptionLists:It,setFlatpickrValue:_u,splitDateTime:Ri,renderEditItems:_t,updateEditReservationSummary:Xe,addEquipmentByDescription:ku,addEquipmentToEditingReservation:Iu,addEquipmentToEditingByDescription:ua,combineDateTime:wn,hasEquipmentConflict:ct,hasTechnicianConflict:zi,renderReservations:vo,handleReservationsMutation:ti,ensureModal:Gu}}function vo(e="reservations-list",t=null){uu({containerId:e,filters:t,onShowDetails:qo,onConfirmReservation:Eo})}function qo(e){return mu(e,{getEditContext:Ss,onEdit:(t,{reservation:n})=>{xo(t,n)},onDelete:So})}function So(e){return Ot()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?fu(e,{onAfterChange:ti}):!1:(Pn(),!1)}function Eo(e){return yu(e,{onAfterChange:ti})}function xo(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}Ni(e,Ss());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}Ni(e,Ss());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}pc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function xm(){Ku({showReservationDetails:qo,deleteReservation:So,confirmReservation:Eo,openReservationEditor:xo})}export{Ku as A,qo as B,Zs as C,rm as D,cn as E,om as F,ym as G,qm as H,Ar as I,cm as J,um as K,tm as L,nm as M,Mu as N,am as O,im as P,sm as Q,lm as R,hm as S,bm as T,Jl as U,kr as V,_r as W,dm as X,zu as a,xm as b,fm as c,pm as d,mm as e,xr as f,Ss as g,de as h,Zu as i,ti as j,Kl as k,Em as l,wa as m,Fe as n,Mc as o,Yn as p,Ju as q,vo as r,em as s,Yu as t,Xe as u,Qu as v,Sm as w,wr as x,vm as y,gm as z};
