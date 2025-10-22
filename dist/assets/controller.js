import{n as h,d as me,f as Sc,t as o,b as ot,h as E,j as Vt,o as Cn,s as Ss,A as Rr,z as Ec,k as Qe,B as Mr,u as xc}from"./auth.js";import{n as ne,x as ct,y as an,f as ua,z as zr,A as wc,D as bt,B as Es,C as ur,E as kn,F as ma,G as Ic,H as lt,I as xs,J as Hr,K as Ac,L as kc,M as _c,N as Nc,O as Gn,P as $c,Q as Or,R as Pc,S as Vr,v as ws,h as Is,j as As,T as Ur,U as Cc,s as jn,c as pa,V as Kr,W as jc,X as Qr,Y as Tc,p as fa,a as Gr,g as Dt,Z as Lc,_ as Bc,$ as Qa,a0 as Fc,w as Dc,a1 as Rc,a2 as Mc,b as zc}from"./reservationsService.js";const Ra="select.form-select:not([data-no-enhance]):not([multiple])",dt=new WeakMap;let Ma=null,mr=!1,pt=null;function mm(e=document){e&&(e.querySelectorAll(Ra).forEach(t=>On(t)),!Ma&&e===document&&(Ma=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(Ra)&&On(a),a.querySelectorAll?.(Ra).forEach(s=>On(s)))})}),Ma.observe(document.body,{childList:!0,subtree:!0})),mr||(mr=!0,document.addEventListener("pointerdown",Vc,{capture:!0})))}function Hn(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){On(e);return}const t=e.closest(".enhanced-select");t&&(ks(t),Wn(t),Ga(t))}function On(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){Hn(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};dt.set(t,r),a.addEventListener("click",()=>Oc(t)),a.addEventListener("keydown",i=>Uc(i,t)),s.addEventListener("click",i=>Qc(i,t)),s.addEventListener("keydown",i=>Kc(i,t)),e.addEventListener("change",()=>{Wn(t),Wr(t)}),r.observer=new MutationObserver(i=>{let c=!1,d=!1;for(const l of i)l.type==="attributes"&&l.attributeName==="disabled"&&(d=!0),l.type==="childList"&&(c=!0);d&&Ga(t),c&&Hc(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),ks(t),Wn(t),Ga(t)}function Hc(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,ks(t),Wn(t)})))}function ks(e){const t=dt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),Wr(e)}function Wn(e){const t=dt.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function Wr(e){const t=dt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function Ga(e){const t=dt.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function Oc(e){dt.get(e)&&(e.getAttribute("data-open")==="true"?ln(e):Xr(e))}function Xr(e){const t=dt.get(e);if(!t)return;pt&&pt!==e&&ln(pt,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),pt=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function ln(e,{focusTrigger:t=!0}={}){const n=dt.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),pt===e&&(pt=null))}function Vc(e){if(!pt)return;const t=e.target;t instanceof Node&&(pt.contains(t)||ln(pt,{focusTrigger:!1}))}function Uc(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),Xr(t)):n==="Escape"&&ln(t)}function Kc(e,t){const n=e.key,a=dt.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&Jr(i,t)}else n==="Escape"&&(e.preventDefault(),ln(t))}function Qc(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&Jr(n,t)}function Jr(e,t){const n=dt.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),ln(t)}const dn=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let ft=null;function _s(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function Yr(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function Gc(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function Wc(e={}){const t=Gc({...e,activatedAt:Date.now()});return ft=t,Yr(!0,t.mode||"create"),_s(dn.change,{active:!0,selection:{...t}}),t}function Xn(e="manual"){if(!ft)return;const t=ft;ft=null,Yr(!1),_s(dn.change,{active:!1,previous:t,reason:e})}function Zr(){return!!ft}function Xc(){return ft?{...ft}:null}function Jc(e){if(!ft)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=h(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:r,description:i}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const d=c.map(u=>h(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!d.length)return!1;const l=Number.isInteger(s)&&s>0?s:d.length;t={barcodes:d,quantity:Math.min(l,d.length)},r&&(t.groupKey=r),i&&(t.description=i)}else return!1;return _s(dn.requestAdd,{...t,selection:{...ft}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||Xn("tab-changed")});const Yc=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Zc=new Set(["maintenance","reserved","retired"]);function el(e){const t=String(e??"").trim().toLowerCase();return t&&Yc.get(t)||"available"}function tl(e){return e?typeof e=="object"?e:ya(e):null}function ht(e){const t=tl(e);return t?el(t.status||t.state||t.statusLabel||t.status_label):"available"}function Ns(e){return!Zc.has(ht(e))}function Ut(e={}){return e.image||e.imageUrl||e.img||""}function nl(e){if(!e)return null;const t=ne(e),{equipment:n=[]}=me();return(n||[]).find(a=>ne(a?.barcode)===t)||null}function ya(e){const t=ne(e);if(!t)return null;const{equipment:n=[]}=me();return(n||[]).find(a=>ne(a?.barcode)===t)||null}const al=me()||{};let St=(al.equipment||[]).map(il),Wa=!1,En="",Lt=null,Mt=null,zt=null,ga=!1,pr=!1;function sl(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function rl(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function il(e={}){return $s({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function ba(e={}){return $s(e)}function $s(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=Tn(e.quantity??e.qty??0),i=ha(e.unit_price??e.price??0),c=h(String(e.barcode??"").trim()),d=De(e.status??e.state??e.status_label??e.statusLabel??"available"),l=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:ol(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:d,image:l,imageUrl:l,created_at:e.created_at??null,updated_at:e.updated_at??null}}function ol(e){return e!=null&&e!==""}function Tn(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function ha(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function cl(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function fr(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function ll(e,t){const n=fr(e),a=fr(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}else{if(r!==i)return r?-1:1;{const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}}const c=Jn(e?.desc||e?.description||e?.name||""),d=Jn(t?.desc||t?.description||t?.name||"");return c.localeCompare(d,"ar",{sensitivity:"base"})}function Ne(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function De(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function dl(e){return De(e)}function Xa(){if(!Zr())return null;const e=Xc();return e?{...e}:null}function ul(e){const t=Xa();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:r=null}=t,i=t?.mode||t?.source||"",c=[],d=new Set;if(n.forEach(f=>{const m=ne(f?.barcode);!m||d.has(m)||(d.add(m),c.push({variant:f,barcode:m}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(i==="package-manager"||i==="equipment-packages"){const f=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:m})=>m),maxQuantity:f,reason:""}}const l=c.filter(({variant:f})=>Ns(f));if(!a||!s)return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=l.filter(({barcode:f})=>!ct(f,a,s,r));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:f})=>f),maxQuantity:u.length};let p=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(l.length>0)p=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const f=new Set(c.map(({variant:m})=>De(m?.status)));f.has("maintenance")?p=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):f.has("reserved")?p=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):f.has("retired")&&(p=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:p,availableBarcodes:[],maxQuantity:0}}function ml(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function ei(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=Xa();e.hidden=!s;const r=s?.mode||s?.source||"";s?r==="package-manager"||r==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=Xa(),d=c?.mode||c?.source||"";d==="package-manager"||d==="equipment-packages"?Xn("package-finish-button"):(Xn("return-button"),ml())}),t.dataset.listenerAttached="true")}function Ge(){return St}function Ht(e){St=Array.isArray(e)?e.map($s):[],Ss({equipment:St}),rl()}function Jn(e){return String(e??"").trim().toLowerCase()}function xt(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=Jn(t);return n||(n=Jn(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function va(e){const t=xt(e);return t?Ge().filter(n=>xt(n)===t):[]}function qa(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=Sa(e);if(n){const a=Ne(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${Ne(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function Ps(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function Yn(){const e=Ps();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function Cs(e={}){const t=Ps();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function sn(e){ga=e;const t=Ps(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function pm(e){if(!Vt()){Cn();return}if(!e)return;try{await fl()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let d=0;if(i.forEach(l=>{const u=l.القسم??l.category??"",p=l["القسم الثانوي"]??l.subcategory??"",f=l.الوصف??l.description??l.name??"",m=l.الكمية??l.quantity??0,y=l.السعر??l.price??0,b=l.الباركود??l.barcode??"",g=l.الحالة??l.status??"متاح",S=l.الصورة??l.image_url??l.image??"",v=h(String(b||"")).trim();if(!f||!v){d+=1;return}c.push(js({category:u,subcategory:p,description:f,quantity:m,unit_price:y,barcode:v,status:g,image_url:S}))}),!c.length){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const l=await ot("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(l?.data)?l.data.map(ba):[];if(u.length){const m=[...Ge(),...u];Ht(m)}await Ea({showToastOnError:!1}),Re();const p=l?.meta?.count??u.length,f=[];p&&f.push(`${p} ✔️`),d&&f.push(`${d} ⚠️`),E(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(f.length?` (${f.join(" / ")})`:""))}catch(l){const u=un(l,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");E(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const pl="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let gn=null;function fl(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):gn||(gn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=pl,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),gn=null,e}),gn)}function js({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const d=h(String(r||"")).trim(),l=dl(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:Tn(a),unit_price:ha(s),barcode:d,status:l,image_url:c?.trim()||null}}async function yl(){if(!Vt()){Cn();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await ot("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await Ea({showToastOnError:!1}),E(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=un(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");E(t,"error")}}function Sa(e){return e.image||e.imageUrl||e.img||""}function gl(e){const t=De(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function Zn(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${Ne(a)}</td></tr>`}n&&(n.textContent="0")}function ti(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=Lt?.groupKey||xt(e);if(!r){Zn();return}const i=Ge().filter(p=>xt(p)===r).sort((p,f)=>{const m=String(p.barcode||"").trim(),y=String(f.barcode||"").trim();return!m&&!y?0:m?y?m.localeCompare(y,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){Zn();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),d=o("equipment.form.labels.quantity","الكمية"),l=Ge(),u=i.map(p=>{const f=p.id&&e.id?String(p.id)===String(e.id):String(p.barcode||"")===String(e.barcode||""),m=f?"equipment-variants-table__row--current":"",y=Ne(String(p.barcode||"-")),b=f?`<span class="equipment-variants-current-badge">${Ne(c)}</span>`:"",g=h(String(Number.isFinite(Number(p.qty))?Number(p.qty):0)),S=l.indexOf(p),v=Ne(o("equipment.item.actions.delete","🗑️ حذف")),k=S>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${S}">${v}</button>
          </div>`:"";return`
        <tr class="${m}">
          <td>
            ${y}
            ${b}
          </td>
          <td>${gl(p.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${Ne(d)}">${g}</span>
          </td>
          <td class="table-actions-cell">${k}</td>
        </tr>
      `}).join("");n.innerHTML=u}function bl({item:e,index:t}){const n=Sa(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=Vt(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},d=Number.isFinite(Number(e.qty))?Number(e.qty):0,l=Number.isFinite(Number(e.price))?Number(e.price):0,u=d.toLocaleString("en-US"),p=l.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),f=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,m=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,y=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(d-f-m,0),b=y.toLocaleString("en-US"),g=o("equipment.card.labels.availableOfTotal","من أصل"),S=De(e.status);let v=`${Ne(c.available)}: ${Ne(b)} ${Ne(g)} ${Ne(u)}`,k="available";if(y===0){const H={reserved:{text:d===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},O=H[S]||H.default;v=Ne(O.text),k=O.modifier}const B=`<span class="equipment-card__availability equipment-card__availability--${k}">${v}</span>`,V="",q=e.desc||e.name||"—",w=e.name&&e.name!==e.desc?e.name:"",P=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${p} ${r}`}].map(({label:H,value:O})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${H}</span>
              <span class="equipment-card__detail-value">${O}</span>
            </span>
          `).join("")}
    </div>`,C=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),j=C.length?`<div class="equipment-card__categories">${C.map(({label:H,value:O})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${H}</span>
              <span class="equipment-card__detail-value">${O}</span>
            </div>
          `).join("")}</div>`:"",A=w?`<div class="equipment-card__alias">
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
      ${P}
    </div>
  `,U=[],N=ul(e),X=N?.availableBarcodes?.length?N.availableBarcodes.join(","):N?.barcode?N.barcode:"";let Q="",$="";if(N.active){const H=`equipment-select-qty-${t}`,O=!!N.canSelect,ae=O?Math.max(1,Number(N.maxQuantity||N.availableBarcodes?.length||1)):1,ee=Math.max(1,Math.min(ae,99)),le=[];for(let re=1;re<=ee;re+=1){const ye=h(String(re));le.push(`<option value="${re}"${re===1?" selected":""}>${ye}</option>`)}const G=O?"":" disabled",oe=o("reservations.create.equipment.selector.quantityLabel","الكمية"),Ee=O?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${h(String(ae))}`:N.reason?N.reason:"";Q=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${H}">${oe}</label>
        <select class="equipment-card__quantity-select" id="${H}" data-equipment-select-quantity${G}>
          ${le.join("")}
        </select>
        ${Ee?`<span class="equipment-card__selection-hint">${Ne(Ee)}</span>`:""}
      </div>
    `;const xe=o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),Pe=O?"":" disabled",K=N.reason?` title="${Ne(N.reason)}"`:"",Z=['data-equipment-action="select-reservation"',`data-selection-max="${O?ae:0}"`];X&&Z.push(`data-selection-barcodes="${Ne(X)}"`),e.groupKey&&Z.push(`data-selection-group="${Ne(String(e.groupKey))}"`),$=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${Z.join(" ")}${Pe}${K}>${xe}</button>
    `}i&&U.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const z=U.length?U.join(`
`):"",R=Ne(q);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${Ne(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${R}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${V}
        ${B}
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
        ${A}
      </div>
      ${Q||$||z?`<div class="equipment-card__actions equipment-card__actions--center">
            ${Q}
            ${$}
            ${z}
          </div>`:""}
    </article>
  `}function hl(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,a.appendChild(d)}),t.includes(i)&&(a.value=i),Hn(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,s.appendChild(d)}),n.includes(i)&&(s.value=i),Hn(s)}const r=document.getElementById("filter-status");r&&Hn(r)}function Ln(){const e=me();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return St=t||[],St;const s=new Date;let r=!1;const i=new Set((a||[]).filter(d=>d?.status==="open").map(d=>h(String(d?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(d=>{if(!d)return d;const l=De(d.status),u=h(String(d.barcode??"")).trim().toLowerCase(),p=u&&i.has(u);let f=p?"maintenance":"available";if(!p&&u)for(const m of n||[]){if(!vl(m,s))continue;if(m.items?.some(b=>h(String(b?.barcode??"")).trim().toLowerCase()===u)){f="reserved";break}}return f!==l?(r=!0,{...d,status:f}):{...d,status:f}});return r?Ht(c):(St=c,Ss({equipment:St})),St}function vl(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function za(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Re(){const e=document.getElementById("equipment-list");if(!e)return;ei();const t=Ln(),n=Array.isArray(t)?t:Ge(),a=new Map;n.forEach(b=>{if(!b)return;const g=xt(b);g&&(a.has(g)||a.set(g,[]),a.get(g).push(b))});const s=Array.from(a.values()).map(b=>{const g=b[0],S=b.reduce((w,_)=>w+(Number.isFinite(Number(_.qty))?Number(_.qty):0),0),v=["maintenance","reserved","available","retired"],k=b.map(w=>De(w.status)).sort((w,_)=>v.indexOf(w)-v.indexOf(_))[0]||"available",B=b.reduce((w,_)=>{const P=Tn(_?.qty??0)||0,C=De(_?.status);return C==="reserved"?w.reserved+=P:C==="maintenance"&&(w.maintenance+=P),w},{reserved:0,maintenance:0}),V=Math.max(S-B.reserved-B.maintenance,0);return{item:{...g,qty:S,status:k,variants:b,groupKey:xt(g),reservedQty:B.reserved,maintenanceQty:B.maintenance,availableQty:V},index:n.indexOf(g)}});s.sort((b,g)=>ll(b.item,g.item));const r=document.getElementById("search-equipment")?.value||"",i=h(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",d=document.getElementById("filter-sub")?.value||"",l=document.getElementById("filter-status")?.value||"",u=l?De(l):"";if(Wa&&!n.length){e.innerHTML=za(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(En&&!n.length){e.innerHTML=za(En,{tone:"error",icon:"⚠️"});return}const p=s.filter(({item:b})=>{const g=h(String(b.barcode??"")).toLowerCase().trim(),S=Array.isArray(b.variants)?b.variants.map(q=>h(String(q.barcode??"")).toLowerCase().trim()).filter(Boolean):[],v=!i||b.name&&b.name.toLowerCase().includes(i)||b.desc&&b.desc.toLowerCase().includes(i)||g&&g.includes(i)||S.some(q=>q.includes(i))||b.category&&b.category.toLowerCase().includes(i)||b.sub&&b.sub.toLowerCase().includes(i),k=!c||b.category===c,B=!d||b.sub===d,V=!u||De(b.status)===u;return v&&k&&B&&V}),f=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),m=p;e.innerHTML=m.length?m.map(bl).join(""):za(f);const y=document.getElementById("equipment-list-count");if(y){const b=o("equipment.list.countSuffix","عنصر"),g=h(String(m.length)),S=m.length?`${g} ${b}`:`0 ${b}`;y.textContent=S}hl(n)}async function Ea({showToastOnError:e=!0}={}){Wa=!0,En="",Re();try{const t=await ot("/equipment/?all=1"),n=Array.isArray(t?.data)?t.data.map(ba):[];Ht(n)}catch(t){En=un(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&E(En,"error")}finally{Wa=!1,Re()}}function un(e,t,n){if(e instanceof Rr){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function ql(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),r=ha(t.querySelector("#new-equipment-price")?.value||"0"),i=Tn(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",d=t.querySelector("#new-equipment-category")?.value?.trim()||"",l=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){E(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const p=js({category:d,subcategory:l,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const f=await ot("/equipment/",{method:"POST",body:p}),m=ba(f?.data),y=[...Ge(),m];Ht(y),Re(),t.reset();const b=t.querySelector("#new-equipment-status");b&&(b.value="متاح"),E(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(f){const m=un(f,"equipment.toast.addFailed","تعذر إضافة المعدة");E(m,"error")}}async function ni(e){if(!Vt()){Cn();return}const t=Ge(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await ot(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),Ht(a),Re(),E(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=un(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");E(s,"error")}}async function Sl(e,t){const n=Ge(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},Ht(r),Re();return}const s=js({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await ot(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=ba(r?.data),c=[...n];c[e]=i,Ht(c),Re(),E(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=un(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw E(i,"error"),r}}function Rn(){Re()}function ai(e){const n=Ge()[e];if(!n)return;Mt=e;const a=va(n),s=a[0]||n,r=a.reduce((d,l)=>d+(Number.isFinite(Number(l.qty))?Number(l.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(d=>De(d.status)).sort((d,l)=>i.indexOf(d)-i.indexOf(l))[0]||De(s.status);document.getElementById("edit-equipment-index").value=e,Cs({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:Sa(s)||"",barcode:s.barcode||"",status:s.status||c}),sn(!1),zt=Yn(),qa(s),ti(s),Lt={groupKey:xt(s),barcode:String(s.barcode||""),id:s.id||null},sl(document.getElementById("editEquipmentModal"))?.show()}function El(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),r=s?.querySelector("[data-equipment-select-quantity]");let i=Number.parseInt(r?.value||"1",10);(!Number.isFinite(i)||i<=0)&&(i=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&i>c&&(i=c);const l=(t.dataset.selectionBarcodes||"").split(",").map(m=>m.trim()).filter(m=>m.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",p=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";Jc({barcodes:l,quantity:i,groupKey:p,description:u})||E(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||ni(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||ai(s)}}function xl(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||ai(n)}}function wl(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||ni(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function si(){if(!Lt||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=Ge(),a=Lt.id?n.find(d=>String(d.id)===String(Lt.id)):null,s=Lt.groupKey,r=s?n.find(d=>xt(d)===s):null,i=a||r;if(!i){Zn();return}const c=n.findIndex(d=>d===i);if(c>=0){const d=document.getElementById("edit-equipment-index");d&&(d.value=String(c)),Mt=c}if(ti(i),!ga){const d=va(i),l=d[0]||i,u=d.reduce((m,y)=>m+(Number.isFinite(Number(y.qty))?Number(y.qty):0),0),p=["maintenance","reserved","available","retired"],f=d.map(m=>De(m.status)).sort((m,y)=>p.indexOf(m)-p.indexOf(y))[0]||De(l.status);Cs({category:l.category||"",subcategory:l.sub||"",description:l.desc||l.description||"",quantity:String(u||l.qty||0),price:l.price!=null?String(l.price):"0",image:Sa(l)||"",barcode:l.barcode||"",status:l.status||f}),zt=Yn()}qa(primary)}function Il(){document.getElementById("search-equipment")?.addEventListener("input",Rn),document.getElementById("filter-category")?.addEventListener("change",Rn),document.getElementById("filter-sub")?.addEventListener("change",Rn),document.getElementById("filter-status")?.addEventListener("change",Rn),document.getElementById("add-equipment-form")?.addEventListener("submit",ql);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),yl().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",El),t.addEventListener("keydown",xl),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",wl),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);cl(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!ga){zt=Yn(),sn(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){E(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:Tn(document.getElementById("edit-equipment-quantity").value)||1,price:ha(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await Sl(t,n),zt=Yn(),sn(!1),si()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{Il(),Re(),Ea();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(zt&&Cs(zt),Mt!=null){const a=Ge()[Mt];if(a){const r=va(a)[0]||a;qa(r)}}sn(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Re(),sn(ga),Mt!=null){const t=Ge()[Mt];if(t){const a=va(t)[0]||t;qa(a)}}});document.addEventListener("equipment:refreshRequested",()=>{Ea({showToastOnError:!1})});document.addEventListener(Sc.USER_UPDATED,()=>{Re()});document.addEventListener("equipment:changed",()=>{si()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{Lt=null,Zn(),Mt=null,zt=null,sn(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!pr&&(document.addEventListener(dn.change,()=>{ei(),Re()}),pr=!0);function He(e){let t=Number(e);if(!Number.isFinite(t))return 0;let n=0;for(;Math.abs(t)>1e5&&n<8;)t/=10,n+=1;return Number(t.toFixed(2))}function qn(e){return h(String(e??"")).trim().toLowerCase()}function Le(e=""){return h(String(e)).trim().toLowerCase()}const Al=2;function kl(e){const t=Number(e);return Number.isFinite(t)?t.toFixed(Al):"0.00"}function yr(e={}){const t=Number(e?.qty);return Number.isFinite(t)&&t>0?He(t):1}function Bn(e={}){const t=e?.desc||e?.description||e?.name||"",n=Le(t),a=kl(e?.price??e?.unitPrice??e?.unit_price??0);return`${n}::${a}`}function Kt(e=[]){const t=new Map;return e.forEach((n,a)=>{const s=Bn(n);if(!s)return;if(!t.has(s)){const i=n?.desc||n?.description||n?.name||"",c=Le(i),d=br(n),l=n?.image||n?.imageUrl||n?.img||"";t.set(s,{key:s,description:i,normalizedDescription:c,unitPrice:d,image:l,items:[],itemIndices:[],barcodes:[]})}const r=t.get(s);r.items.push(n),r.itemIndices.push(a),n?.barcode&&r.barcodes.push(String(n.barcode))}),Array.from(t.values()).map(n=>({...n,quantity:n.items.reduce((a,s)=>a+yr(s),0)})).map(n=>{const a=n.quantity||0,s=n.items.reduce((i,c)=>{const d=br(c),l=yr(c);return i+d*l},0),r=a>0?s/a:n.unitPrice;return{...n,quantity:a,count:a,totalPrice:s,unitPrice:r}})}function gr(e={}){return(ua(e)||[]).map(n=>({...n,normalizedBarcode:n?.normalizedBarcode??qn(n?.barcode),qty:Number.isFinite(Number(n?.qty))?Number(n.qty):1,price:Number.isFinite(Number(n?.price))?Number(n.price):0}))}function Ja(e={}){const t=e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1,n=Number(t);return Number.isFinite(n)&&n>0?n:1}function _l(e={},t=[],n=null){const a=e.unit_price??e.unitPrice??e.price,s=Number(a);if(Number.isFinite(s)&&s>0)return s;const r=e.total_price??e.totalPrice??e.total,i=Number(r),c=Number.isFinite(Number(n))&&Number(n)>0?Number(n):Ja(e);if(Number.isFinite(i)&&i>0&&c>0)return He(Number((i/c).toFixed(2)));if(Array.isArray(t)&&t.length){const d=t.reduce((l,u)=>{const p=Number.isFinite(Number(u.price))?Number(u.price):0,f=Number.isFinite(Number(u.qty))?Number(u.qty):1;return l+p*f},0);if(d>0&&c>0)return He(Number((d/c).toFixed(2)))}return 0}function Ts(e={}){const t=Array.isArray(e?.items)?e.items:[],n=Kt(t),a=new Map,s=(p,f=0,m="packages")=>{if(!p||typeof p!="object")return;const b=an(p?.package_code??p?.packageId??p?.package_id??p?.code??p?.id??p?.barcode??`pkg-${f}`)||`pkg-${f}`;if(!a.has(b)){a.set(b,{source:p,normalizedId:b,index:f,itemSource:m==="items"?p:null});return}const g=a.get(b);if(g.source||(g.source=p),m==="items"&&(g.itemSource=p,g.source&&typeof g.source=="object")){const S=Array.isArray(g.source.packageItems)&&g.source.packageItems.length>0,v=Array.isArray(p.packageItems)&&p.packageItems.length>0;!S&&v&&(g.source={...g.source,packageItems:p.packageItems}),!g.source.image&&p.image&&(g.source={...g.source,image:p.image})}};Array.isArray(e?.packages)&&e.packages.forEach((p,f)=>s(p,f,"packages")),t.forEach((p,f)=>{p&&typeof p=="object"&&(p.type==="package"||Array.isArray(p?.packageItems))&&s(p,f+a.size,"items")});const r=[],i=new Set,c=new Set;a.forEach(({source:p,itemSource:f=null,normalizedId:m},y)=>{const b=p||{},g=f&&typeof f=="object"?f:null;let S=gr(b);(!Array.isArray(S)||S.length===0)&&g&&(S=gr(g)),S.forEach(A=>{const D=A?.normalizedBarcode??qn(A?.barcode);D&&i.add(D);const F=A?.equipmentId??A?.equipment_id??null;F!=null&&c.add(String(F))});let v=Ja(b);if(g){const A=Ja(g);Number.isFinite(A)&&A>0&&(v=A)}(!Number.isFinite(v)||v<=0)&&(v=1);let k=_l(b,S,v);const B=[g?.price,g?.unit_price,g?.unitPrice];for(const A of B){const D=Number(A);if(Number.isFinite(D)&&D>0){k=D;break}}k=He(k);const V=[g?.total,g?.total_price,g?.totalPrice,b?.total,b?.total_price,b?.totalPrice];let q=NaN;for(const A of V){const D=Number(A);if(Number.isFinite(D)&&D>=0){q=D;break}}Number.isFinite(q)||(q=k*v),q=He(q);const w=b?.package_code??b?.packageId??b?.package_id??b?.barcode??g?.package_code??g?.packageId??g?.package_id??g?.barcode??null;if(w){const A=qn(w);A&&i.add(A)}const _=S.map(A=>h(String(A?.barcode??A?.normalizedBarcode??""))).filter(Boolean),C=[b?.name,b?.package_name,b?.title,g?.name,g?.desc,g?.package_name,h(String(w??y))].find(A=>A!=null&&String(A).trim()!=="")||h(String(w??y)),j=S.find(A=>A?.image)?.image??b?.image??g?.image??null;r.push({key:`package::${y}`,description:C,normalizedDescription:h(String(C)),unitPrice:k,totalPrice:q,quantity:v,count:v,image:j,barcodes:_,barcode:w,items:[{type:"package",packageItems:S,packageId:m,desc:C,price:k,qty:v,barcode:w}],type:"package",packageItems:S,packageId:m})});const d=new Set(Array.from(i).map(p=>qn(p)).filter(Boolean)),l=n.filter(p=>!(p.items.some(y=>y?.type==="package")&&r.length>0||p.items.every(y=>{const b=At(y),g=b!=null?String(b):null;if(g&&c.has(g))return!0;const S=y?.barcode?qn(y.barcode):null;return!!(S&&d.has(S))})));return{groups:r.length?[...r,...l]:n,packageGroups:r,groupedItems:n,filteredGroupedItems:l,packagesMap:a}}function At(e={}){const t=[e?.id,e?.equipment_id,e?.equipmentId,e?.item_id,e?.itemId];for(const n of t)if(!(n==null||n===""))return String(n);return null}function br(e={}){const t=e?.price??e?.unit_price??e?.unitPrice??0,n=Number(t);return Number.isFinite(n)?n:0}function Ls(e){if(!e?.end)return!1;const t=new Date(e.end);return Number.isNaN(t.getTime())?!1:t<new Date}function Nl(e=""){switch(String(e??"").trim().toLowerCase()){case"confirmed":case"مؤكد":return"confirmed";case"in_progress":case"in-progress":case"قيد التنفيذ":case"جاري":return"in_progress";case"completed":case"مكتمل":return"completed";case"cancelled":case"ملغي":return"cancelled";case"pending":case"draft":case"قيد الانتظار":case"بانتظار التأكيد":case"معلق":default:return"pending"}}function kt(e={},t=null){const n=e?.confirmed===!0||e?.confirmed==="true",a=e?.projectId??e?.project_id??null,s=a!=null&&a!==""&&a!=="null",r=s?Nl(t?.status??t?.status_label??t?.statusLabel??""):null,i=s&&(t?.confirmed===!0||["confirmed","in_progress","completed"].includes(r));return{reservationConfirmed:n,projectLinked:s,projectStatus:r,projectConfirmed:i,effectiveConfirmed:s?i:n}}const ri="projects:create:draft",ii="projects.html#projects-section";let Ya=null,oi=[],Za=new Map,es=new Map,ea=new Map,Ha=!1,Vn=null,hr=!1,ci=[];function $l(e){if(!e)return null;let t=ci.find(a=>a.id===e)||null;if(t)return t;const n=Ac(e);return n?(t={id:e,name:_c(n)||e,price:kc(n),items:ua(n),raw:n},t):null}function ta(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function na(e){return h(String(e||"")).trim().toLowerCase()}function Pl(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function li(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function di(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function ui(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function mi(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function Ot(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function Bs(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function Qt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Ue(){const{input:e,hidden:t}=Qt();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function jt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function pi(e,t,{allowPartial:n=!1}={}){const a=Le(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function ts(e,t={}){return pi(Za,e,t)}function ns(e,t={}){return pi(es,e,t)}function Ke(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function fi(e){oi=Array.isArray(e)?[...e]:[]}function Fs(){return oi}function Ds(e){return e&&Fs().find(t=>String(t.id)===String(e))||null}function vr(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function rn(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??bt,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:bt}function Ze(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??bt,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=bt),t.dataset.companyShare=String(s),t.checked=!0}function as(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(Ha){ue();return}Ha=!0;const a=()=>{Ha=!1,ue()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(bt)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),Ze()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Ze():n.checked&&(n.checked=!1));a()}function Cl(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function qr(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function Sr(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function yt({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=Bs();if(!n||!a||!s)return;const r=Es()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const d=new Set;Za=new Map;const l=r.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:Sr(m)||c})).filter(m=>{if(!m.label)return!1;const y=Le(m.label);return!y||d.has(y)?!1:(d.add(y),Za.set(y,m),!0)}).sort((m,y)=>m.label.localeCompare(y.label,void 0,{sensitivity:"base"}));s.innerHTML=l.map(m=>`<option value="${ta(m.label)}"></option>`).join("");const u=t?"":n.value,p=e?String(e):a.value?String(a.value):"",f=p?r.find(m=>String(m.id)===p):null;if(f){const m=Sr(f)||c;a.value=String(f.id),n.value=m,n.dataset.selectedId=String(f.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function on({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=Qt();if(!a||!s||!r)return;const i=Array.isArray(t)?t:Fs()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const d=[...i].filter(b=>b&&b.id!=null).sort((b,g)=>String(g.createdAt||g.start||"").localeCompare(String(b.createdAt||b.start||""))),l=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),p=new Set;es=new Map;const f=d.map(b=>{const g=vr(b)||u;return{id:String(b.id),label:g}}).filter(b=>{if(!b.label)return!1;const g=Le(b.label);return!g||p.has(g)?!1:(p.add(g),es.set(g,b),!0)});r.innerHTML=f.map(b=>`<option value="${ta(b.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",y=m?d.find(b=>String(b.id)===m):null;if(y){const b=vr(y)||u;s.value=String(y.id),a.value=b,a.dataset.selectedId=String(y.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":l}function aa(e,t,n){const{date:a,time:s}=Hr(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function yi(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||on({selectedValue:a});const r=(Es()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";yt(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=qr(e,"start"),d=qr(e,"end");c&&aa("res-start","res-start-time",c),d&&aa("res-end","res-end-time",d);const l=document.getElementById("res-notes");l&&e.description&&(t||!l.value)&&(l.value=e.description),ue(),wt()}function gi({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:me(),s=Array.isArray(a)?a:[];fi(s);const r=t!=null?String(t):n.value?String(n.value):"";on({selectedValue:r,projectsList:s}),wt(),ue()}function wt(){const{input:e,hidden:t}=Qt(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),d=document.getElementById("res-discount-type"),l=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),p=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(jt(n,Ue),a&&jt(a,Ue)),s&&jt(s,Ue),r&&jt(r,Ue),i&&jt(i,Ue),c&&jt(c,Ue),d&&jt(d,Ue),p)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=l),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=l),s&&(s.value="unpaid",Ke(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=l),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=l),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=l),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=l),d&&(d.value="percent",d.disabled=!0,d.classList.add("reservation-input-disabled"),d.title=l);else{if(n){const f=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",f&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.disabled=!1,d.classList.remove("reservation-input-disabled"),d.title="")}as("tax"),ue()}function Rs(){const{input:e,hidden:t}=Qt();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?ns(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=Ds(r.id);i?yi(i,{skipProjectSelectUpdate:!0}):(wt(),ue())}else t.value="",e.dataset.selectedId="",wt(),ue()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?ns(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Ms(){const{input:e,hidden:t}=Bs();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?ts(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),ue()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?ts(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function jl(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){xn({clearValue:!0});return}let n=null;try{const l=decodeURIComponent(t);n=JSON.parse(l)}catch(l){console.warn("⚠️ [reservations/createForm] Failed to decode project context",l)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),xn({clearValue:!1}),!n)return;n.fromProjectForm&&(Vn={draftStorageKey:n.draftStorageKey||ri,returnUrl:n.returnUrl||ii});const r=document.getElementById("res-project");if(n.projectId){r&&(on({selectedValue:String(n.projectId)}),wt());const l=Ds(n.projectId);l?yi(l,{forceNotes:!!n.forceNotes}):ue(),xn()}else{r&&on({selectedValue:""});const l=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");Gl(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),l)}n.start&&aa("res-start","res-start-time",n.start),n.end&&aa("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(Es()||[]).find(p=>String(p.id)===String(n.customerId));u?.id!=null&&(yt({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(yt({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):yt({selectedValue:""});const d=document.getElementById("res-notes");d&&n.description&&!d.value&&(d.value=n.description),ue()}function Gt(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:kn(e,n),end:kn(t,a)}}function bi(e){const t=na(e);if(t){const c=ea.get(t);if(c)return c}const{description:n,barcode:a}=li(e);if(a){const c=ya(a);if(c)return c}const s=Le(n||e);if(!s)return null;let r=Kr();if(!r?.length){const c=me();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&Qr(r)}const i=r.find(c=>Le(c?.desc||c?.description||"")===s);return i||r.find(c=>Le(c?.desc||c?.description||"").includes(s))||null}function hi(e,t="equipment-description-options"){const n=na(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(d=>na(d.value)===n)||ea.has(n))return!0;const{description:s}=li(e);if(!s)return!1;const r=Le(s);return r?(Kr()||[]).some(c=>Le(c?.desc||c?.description||"")===r):!1}const Tl={available:0,reserved:1,maintenance:2,retired:3};function Ll(e){return Tl[e]??5}function Er(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function Bl(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${Er(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${Er(n)})`}function It(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=Ln(),a=me(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];Qr(r);const i=new Map;r.forEach(l=>{const u=Pl(l),p=na(u);if(!p||!u)return;const f=ht(l),m=Ll(f),y=i.get(p);if(!y){i.set(p,{normalized:p,value:u,bestItem:l,bestStatus:f,bestPriority:m,statuses:new Set([f])});return}y.statuses.add(f),m<y.bestPriority&&(y.bestItem=l,y.bestStatus=f,y.bestPriority=m,y.value=u)}),ea=new Map;const d=Array.from(i.values()).sort((l,u)=>l.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(l=>{ea.set(l.normalized,l.bestItem);const u=Bl(l),p=ta(l.value);if(u===l.value)return`<option value="${p}"></option>`;const f=ta(u);return`<option value="${p}" label="${f}"></option>`}).join("");e&&(e.innerHTML=d),t&&(t.innerHTML=d)}function vi(e,t,n={}){const{silent:a=!1}=n,s=ne(e);if(!s)return{success:!1,message:null};const{start:r,end:i}=Gt();if(!r||!i){const y=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||E(y),{success:!1,message:y}}const c=lt();if(zs(c).has(s)){const y=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||E(y),{success:!1,message:y}}const l=xs(s,r,i);if(l.length){const y=l.map(g=>g.name).join(", "),b=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${y}`);return a||E(b),{success:!1,message:b}}if(ct(s,r,i)){const y=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||E(y),{success:!1,message:y}}const u=ya(s);if(!u){const y=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||E(y),{success:!1,message:y}}const p=ht(u);if(p==="maintenance"||p==="retired"){const y=Ot(p);return a||E(y),{success:!1,message:y}}const f=At(u);if(!f){const y=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||E(y),{success:!1,message:y}}ma({id:f,equipmentId:f,barcode:s,desc:u.desc,qty:1,price:u.price,image:Ut(u)}),t&&(t.value=""),vt(),ue();const m=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||E(m),{success:!0,message:m,barcode:s}}function ss(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=bi(t);if(!n){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=nl(n.barcode),s=ht(a||n);if(s==="maintenance"||s==="retired"){E(Ot(s));return}const r=ne(n.barcode);if(!r){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=At(n);if(!i){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Ut(n)},{start:d,end:l}=Gt();if(!d||!l){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=lt();if(zs(u).has(r)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const f=xs(r,d,l);if(f.length){const m=f.map(y=>y.name).join(", ");E(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`));return}if(ct(r,d,l)){E(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}ma(c),vt(),ue(),E(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function Fl(){It();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),ss(e))});const t=()=>{hi(e.value,"equipment-description-options")&&ss(e)};e.addEventListener("focus",()=>{if(It(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function xr(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function zs(e=lt()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=ne(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const r=ne(s?.normalizedBarcode??s?.barcode);r&&t.add(r)})}),t}function Dl(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=Gt();if(!t||!n){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}Wc({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):E(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(dn.change,t=>{xr(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),xr(e,Zr()))}function Rl(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,r=a.length?a:t.barcode?[t.barcode]:[];if(!r.length)return;let i=0,c=null;const d=[],l=new Set;r.forEach(p=>{const f=ne(p);f&&!l.has(f)&&(l.add(f),d.push(f))});const u=Math.min(s,d.length);for(let p=0;p<u;p+=1){const f=d[p],m=vi(f,null,{silent:!0});m.success&&(i+=1),m.message&&(c=m.message)}if(i>0){const f=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",h(String(i)));E(f)}else c&&E(c)}function qi(){Dl(),!(hr||typeof document>"u")&&(document.addEventListener(dn.requestAdd,Rl),hr=!0)}function Fn(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),r=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:r}}function rs(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=Fn();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const r=document.getElementById("equipment-barcode"),i=document.getElementById("equipment-description"),c=t==="package";r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),Tc(t),t==="package"&&xa()}function xa(){const{packageSelect:e,packageHint:t}=Fn();if(!e)return;const n=zr();ci=n,wc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,r=n.map(c=>{const d=Number.isFinite(Number(c.price))?Number(c.price):0,l=h(d.toFixed(2)),u=`${c.name} — ${l} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${r}`,e.selectedIndex=0;const i=n.length>0;e.disabled=!i,t&&(i?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),xi()}function Ml(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:r,blockingPackages:i})=>{const c=r?.desc||h(String(r?.barcode??r?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(i)&&i.length){const d=i.map(l=>l.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${d})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function Si(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const r=an(e);if(!r)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const i=$l(r);if(!i)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(m=>m?.type==="package"&&an(m.packageId)===r))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(Ic(r,n,a,s)){const m=i.name||r;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${m} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(i.items)&&i.items.length?i.items:ua(i.raw??{}),d=zs(t),l=[],u=new Set;if(c.forEach(m=>{const y=ne(m?.normalizedBarcode??m?.barcode);if(y){if(u.has(y)){l.push({item:m,type:"internal"});return}u.add(y),d.has(y)&&l.push({item:m,type:"external"})}}),l.length){const m=l.map(({item:b})=>b?.desc||b?.description||b?.name||b?.barcode||b?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(b=>h(String(b))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:l.some(b=>b.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",m):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",m),duplicates:l}}const p=[];return c.forEach(m=>{const y=ne(m?.normalizedBarcode??m?.barcode);if(y&&ct(y,n,a,s)){const b=xs(y,n,a,s);p.push({item:m,blockingPackages:b})}}),p.length?{success:!1,reason:"item_conflict",message:Ml(i,p),conflicts:p}:{success:!0,package:{id:`package::${r}`,packageId:r,type:"package",desc:i.name||`Package ${r}`,qty:1,price:Number.isFinite(Number(i.price))?Number(i.price):0,barcode:i.code||i.raw?.package_code||`pkg-${r}`,packageItems:c.map(m=>({equipmentId:m?.equipmentId??null,barcode:m?.barcode??m?.normalizedBarcode??"",normalizedBarcode:ne(m?.normalizedBarcode??m?.barcode),desc:m?.desc??"",qty:Number.isFinite(Number(m?.qty))?Number(m.qty):1,price:Number.isFinite(Number(m?.price))?Number(m.price):0})),image:c.find(m=>m?.image)?.image??null},packageInfo:i}}function Ei(e,{silent:t=!1}={}){const n=an(e);if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=Gt(),r=lt(),i=Si(n,{existingItems:r,start:a,end:s});if(!i.success){if(!t){const d={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[i.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");E(i.message||d)}return i}return ma(i.package),vt(),ue(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:i.package}}function xi(){const{packageSelect:e}=Fn();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;Ei(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function zl(){const{packageAddButton:e,packageSelect:t}=Fn();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}Ei(n)}),e.dataset.listenerAttached="true")}function wi(){const{modeRadios:e}=Fn();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&rs(s.target.value)}),a.dataset.listenerAttached="true")}),zl(),xi();const t=Gn(),n=e.find(a=>a.value===t);n&&(n.checked=!0),rs(t)}function vt(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=lt(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),d=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const l=Kt(n);t.innerHTML=l.map(u=>{const p=u.items[0]||{},f=Ut(p)||u.image,m=f?`<img src="${f}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',y=h(String(u.count)),b=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,g=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):b*u.count,S=`${h(b.toFixed(2))} ${s}`,v=`${h(g.toFixed(2))} ${s}`,k=u.items.some(w=>w?.type==="package"),B=u.barcodes.map(w=>h(String(w||""))).filter(Boolean),V=B.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${B.map(w=>`<li>${w}</li>`).join("")}
            </ul>
          </details>`:"";let q="";if(k){const w=new Map;if(u.items.forEach(_=>{Array.isArray(_?.packageItems)&&_.packageItems.forEach(P=>{if(!P)return;const C=ne(P.barcode||P.desc||Math.random()),j=w.get(C);if(j){j.qty+=Number.isFinite(Number(P.qty))?Number(P.qty):1;return}w.set(C,{desc:P.desc||P.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(P.qty))?Number(P.qty):1,barcode:P.barcode??P.normalizedBarcode??""})})}),w.size){const _=Array.from(w.values()).map(P=>{const C=h(String(P.qty)),j=P.desc||h(String(P.barcode||"")),A=P.barcode?` <span class="reservation-package-items__barcode">(${h(String(P.barcode))})</span>`:"";return`<li>${j}${A} × ${C}</li>`}).join("");q=`
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
          <td>${S}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${d}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function Hl(e){const t=lt(),a=Kt(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&($c(s),vt(),ue())}function Ol(e){const t=lt(),n=t.filter(a=>Bn(a)!==e);n.length!==t.length&&(Or(n),vt(),ue())}function Vl(e){const t=lt(),a=Kt(t).find(p=>p.key===e);if(!a)return;const{start:s,end:r}=Gt();if(!s||!r){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(p=>ne(p.barcode))),{equipment:c=[]}=me(),d=(c||[]).find(p=>{const f=ne(p?.barcode);return!f||i.has(f)||Bn({desc:p?.desc||p?.description||p?.name||"",price:Number(p?.price)||0})!==e||!Ns(p)?!1:!ct(f,s,r)});if(!d){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const l=ne(d.barcode),u=At(d);if(!u){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}ma({id:u,equipmentId:u,barcode:l,desc:d.desc||d.description||d.name||a.description||"",qty:1,price:Number.isFinite(Number(d.price))?Number(d.price):a.unitPrice,image:Ut(d)}),vt(),ue()}function ue(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),d=c?.value||"unpaid",{start:l,end:u}=Gt();i&&Ze();const p=rn(),f=document.getElementById("res-payment-progress-type"),m=document.getElementById("res-payment-progress-value"),y=di(f),b=ui(m);ur({selectedItems:lt(),discount:n,discountType:s,applyTax:i,paidStatus:d,paymentProgressType:y,paymentProgressValue:b,start:l,end:u,companySharePercent:p,paymentHistory:[]});const g=ur.lastResult;g?(mi(m,g.paymentProgressValue),c&&(c.value=g.paymentStatus,Ke(c,g.paymentStatus))):Ke(c,d)}function Ul(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=h(c.target.value),ue()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",ue),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(Ue()){n.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}as("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(Ue()){a.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}as("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(Ue()){s.value="unpaid",Ke(s,"unpaid"),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ke(s),ue()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(Ue()){r.value="percent",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",ue()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(Ue()){i.value="",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=h(c.target.value),ue()}),i.dataset.listenerAttached="true"),ue()}function Kl(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){ue();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),ue()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function wr(){const{input:e,hidden:t}=Bs(),{input:n,hidden:a}=Qt(),{customers:s}=me();let r=t?.value?String(t.value):"";if(!r&&e?.value){const G=ts(e.value,{allowPartial:!0});G&&(r=String(G.id),t&&(t.value=r),e.value=G.label,e.dataset.selectedId=r)}const i=s.find(G=>String(G.id)===r);if(!i){E(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let d=a?.value?String(a.value):"";if(!d&&n?.value){const G=ns(n.value,{allowPartial:!0});G&&(d=String(G.id),a&&(a.value=d),n.value=G.label,n.dataset.selectedId=d)}const l=document.getElementById("res-start").value,u=document.getElementById("res-end").value,p=document.getElementById("res-start-time")?.value||"00:00",f=document.getElementById("res-end-time")?.value||"00:00";if(!l||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${l}T${p}`,y=`${u}T${f}`,b=new Date(m),g=new Date(y);if(Number.isNaN(b.getTime())||Number.isNaN(g.getTime())||b>=g){E(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const S=Pc(),v=lt();if(v.length===0&&S.length===0){E(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const k=document.getElementById("res-notes")?.value||"",B=parseFloat(h(document.getElementById("res-discount")?.value))||0,V=document.getElementById("res-discount-type")?.value||"percent",q=document.getElementById("res-payment-status"),w=q?.value||"unpaid",_=document.getElementById("res-payment-progress-type"),P=document.getElementById("res-payment-progress-value"),C=di(_),j=ui(P),A=d?Ds(d):null,D=Cl(A);if(d&&!A){E(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const G of v){const oe=ht(G.barcode);if(oe==="maintenance"||oe==="retired"){E(Ot(oe));return}}for(const G of v){const oe=ne(G.barcode);if(ct(oe,m,y)){E(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const G of S)if(Vr(G,m,y)){E(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const F=document.getElementById("res-tax"),U=document.getElementById("res-company-share"),N=!!d;N?(F&&(F.checked=!1,F.disabled=!0,F.classList.add("disabled"),F.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),U&&(U.checked=!1,U.disabled=!0,U.classList.add("disabled"),U.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),q&&(q.value="unpaid",q.disabled=!0,Ke(q,"unpaid"),q.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),_&&(_.disabled=!0,_.classList.add("disabled")),P&&(P.value="",P.disabled=!0,P.classList.add("disabled"))):(F&&(F.disabled=!1,F.classList.remove("disabled"),F.title=""),U&&(U.disabled=!1,U.classList.remove("disabled"),U.title=""),q&&(q.disabled=!1,q.title=""),_&&(_.disabled=!1,_.classList.remove("disabled")),P&&(P.disabled=!1,P.classList.remove("disabled")));const X=N?!1:F?.checked||!1,Q=!!U?.checked;if(!N&&Q!==X){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let $=Q?rn():null;Q&&(!Number.isFinite($)||$<=0)&&(Ze(),$=rn());const z=Q&&X&&Number.isFinite($)&&$>0;X&&Ze();const R=ws(v,B,V,X,S,{start:m,end:y,companySharePercent:z?$:0}),H=Ec(),O=Is({totalAmount:R,progressType:C,progressValue:j,history:[]});P&&mi(P,O.paymentProgressValue);const ae=[];O.paymentProgressValue!=null&&O.paymentProgressValue>0&&ae.push({type:O.paymentProgressType||C,value:O.paymentProgressValue,amount:O.paidAmount,percentage:O.paidPercent,recordedAt:new Date().toISOString()});const ee=As({manualStatus:w,paidAmount:O.paidAmount,paidPercent:O.paidPercent,totalAmount:R});q&&(q.value=ee,Ke(q,ee));const le=Ur({reservationCode:H,customerId:c,start:m,end:y,status:D?"confirmed":"pending",title:null,location:null,notes:k,projectId:d||null,totalAmount:R,discount:N?0:B,discountType:N?"percent":V,applyTax:X,paidStatus:N?"unpaid":ee,confirmed:D,items:v.map(G=>({...G,equipmentId:G.equipmentId??G.id})),technicians:S,companySharePercent:N||!z?null:$,companyShareEnabled:N?!1:z,paidAmount:N?0:O.paidAmount,paidPercentage:N?0:O.paidPercent,paymentProgressType:N?null:O.paymentProgressType,paymentProgressValue:N?null:O.paymentProgressValue,paymentHistory:N?[]:ae});try{const G=await Cc(le);Ln(),It(),jn(),Wl(),E(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Ya=="function"&&Ya({type:"created",reservation:G}),Ql(G)}catch(G){console.error("❌ [reservations/createForm] Failed to create reservation",G);const oe=pa(G)?G.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");E(oe,"error"),N&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),xn({clearValue:!1}))}}function Ql(e){if(!Vn)return;const{draftStorageKey:t=ri,returnUrl:n=ii}=Vn,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}Vn=null,n&&(window.location.href=n)}function xn({clearValue:e=!1}={}){const{input:t,hidden:n}=Qt();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,wt())}function Gl(e,t=""){const{input:n,hidden:a}=Qt();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),wt())}function Wl(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),yt({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),xn({clearValue:!1}),on({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",Ke(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),jc(),Or([]),Xn("form-reset"),vt(),wt(),ue()}function Xl(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){Hl(s);return}if(a==="increase-group"&&s){Vl(s);return}if(a==="remove-group"&&s){Ol(s);return}}),e.dataset.listenerAttached="true")}function Jl(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(Gn()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,vi(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||Gn()!=="single")return;const{start:r,end:i}=Gt();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function Yl(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await wr()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await wr()}),t.dataset.listenerAttached="true")}function fm({onAfterSubmit:e}={}){Ya=typeof e=="function"?e:null;const{customers:t,projects:n}=me();Nc(t||[]),yt(),Ms(),fi(n||[]),gi({projectsList:n}),Rs(),It(),xa(),Fl(),qi(),wi(),Kl(),Ul(),Xl(),Jl(),Yl(),jl(),ue(),vt()}function Ii(){It(),xa(),gi(),yt(),Ms(),Rs(),qi(),wi(),vt(),ue()}if(typeof document<"u"){const e=()=>{yt(),on({projectsList:Fs()}),Ms(),Rs(),ue()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{It()}),document.addEventListener("packages:changed",()=>{xa(),Gn()==="package"&&rs("package")})}typeof window<"u"&&(window.getCompanySharePercent=rn);function Ai(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:Tt(t),endDate:Tt(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:Tt(n),endDate:Tt(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Tt(n),endDate:Tt(a)}}return e==="upcoming"?{startDate:Tt(t),endDate:""}:{startDate:"",endDate:""}}function Zl(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=h(t?.value||"").trim(),i=h(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),sa(t),sa(n),r="",i=""),!r&&!i&&c){const l=Ai(c);r=l.startDate,i=l.endDate}return{searchTerm:Le(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function ym(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{ed(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),sa(a),sa(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function ed(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=Ai(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function Tt(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function sa(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function Mn(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function td(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function nd(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=td(n);if(a!==null)return a}return null}function Ir(e,t=0){const n=nd(e);if(n!=null)return n;const a=Mn(e.createdAt??e.created_at);if(a!=null)return a;const s=Mn(e.updatedAt??e.updated_at);if(s!=null)return s;const r=Mn(e.start);if(r!=null)return r;const i=Mn(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function ad({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((v,k)=>({reservation:v,index:k})),i=t.searchTerm||"",c=t.searchReservationId||"",d=t.searchCustomerName||"",l=t.searchProjectId||"",u=t.startDate||"",p=t.endDate||"",f=t.status||"",m=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,y=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,b=u?new Date(`${u}T00:00:00`):null,g=p?new Date(`${p}T23:59:59`):null,S=r.filter(({reservation:v})=>{const k=n.get(String(v.customerId)),B=s?.get?.(String(v.projectId)),V=v.start?new Date(v.start):null,q=Ls(v),{effectiveConfirmed:w}=kt(v,B);if(m!=null&&String(v.customerId)!==String(m)||y!=null&&!(Array.isArray(v.technicians)?v.technicians.map(A=>String(A)):[]).includes(String(y))||f==="confirmed"&&!w||f==="pending"&&w||f==="completed"&&!q||b&&V&&V<b||g&&V&&V>g)return!1;if(c){const j=[v.reservationId,v.id,v.reservation_id,v.reservationCode,v.reservation_code,v.code,v.reference,v.referenceNumber,v.reference_number],A=Le(j.filter(F=>F!=null&&F!=="").map(String).join(" ")).replace(/\s+/g,""),D=c.replace(/\s+/g,"");if(!A.includes(D))return!1}if(d&&!Le(k?.customerName||"").includes(d))return!1;if(l){const j=[v.projectId,v.project_id,v.projectID,B?.id,B?.projectCode,B?.project_code],A=Le(j.filter(F=>F!=null&&F!=="").map(String).join(" ")).replace(/\s+/g,""),D=l.replace(/\s+/g,"");if(!A.includes(D))return!1}if(!i)return!0;const _=v.items?.map?.(j=>`${j.barcode} ${j.desc}`).join(" ")||"",P=(v.technicians||[]).map(j=>a.get(String(j))?.name).filter(Boolean).join(" ");return Le([v.reservationId,k?.customerName,v.notes,_,P,B?.title].filter(Boolean).join(" ")).includes(i)});return S.sort((v,k)=>{const B=Ir(v.reservation,v.index),V=Ir(k.reservation,k.index);return B!==V?V-B:k.index-v.index}),S}function sd({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),d=o("reservations.list.itemsCountShort","{count} عنصر"),l=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),p=o("reservations.list.status.pending","⏳ غير مؤكد"),f=o("reservations.list.payment.paid","💳 مدفوع"),m=o("reservations.list.payment.unpaid","💳 غير مدفوع"),y=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),b=o("reservations.list.actions.confirm","✔️ تأكيد"),g=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),S=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),v={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:k,index:B})=>{const V=t.get(String(k.customerId)),q=k.projectId?a?.get?.(String(k.projectId)):null,w=Ls(k),_=k.paidStatus??k.paid_status??(k.paid===!0||k.paid==="paid"?"paid":"unpaid"),P=_==="paid",C=_==="partial",{effectiveConfirmed:j,projectLinked:A}=kt(k,q),D=j?"status-confirmed":"status-pending",F=P?"status-paid":C?"status-partial":"status-unpaid";let U=`<span class="reservation-chip status-chip ${D}">${j?u:p}</span>`;const N=P?f:C?y:m;let X=`<span class="reservation-chip status-chip ${F}">${N}</span>`,Q=P?" tile-paid":C?" tile-partial":" tile-unpaid";w&&(Q+=" tile-completed");let $="";w&&(U=`<span class="reservation-chip status-chip status-completed">${u}</span>`,X=`<span class="reservation-chip status-chip status-completed">${N}</span>`,$=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const z=!A&&!j?`<button class="tile-confirm" data-reservation-index="${B}" data-action="confirm">${b}</button>`:"",R=z?`<div class="tile-actions">${z}</div>`:"",H=k.items?.length||0,O=(k.technicians||[]).map(ye=>n.get(String(ye))).filter(Boolean),ae=O.map(ye=>ye.name).join(l)||"—",ee=h(String(k.reservationId??"")),le=k.start?h(Qe(k.start)):"-",G=k.end?h(Qe(k.end)):"-",oe=h(String(k.cost??0)),Ee=h(String(H)),xe=k.notes?h(k.notes):c,Pe=d.replace("{count}",Ee),K=k.applyTax?`<small>${r}</small>`:"";let Z=g;return k.projectId&&(Z=q?.title?h(q.title):S),`
      <div class="${z?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${Q}"${$} data-reservation-index="${B}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${ee}</div>
          <div class="tile-badges">
            ${U}
            ${X}
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
            <span class="tile-value tile-inline">${le}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.end}</span>
            <span class="tile-value tile-inline">${G}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.cost}</span>
            <span class="tile-value">${oe} ${s} ${K}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.equipment}</span>
            <span class="tile-value">${Pe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.crew}</span>
            <span class="tile-value">${O.length?ae:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${xe}</span>
          </div>
        </div>
        ${R}
      </div>
    `}).join("")}function ze(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function rd(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=kt(e,s),c=e.paid===!0||e.paid==="paid",d=Ls(e),l=e.items||[],{groups:u}=Ts(e),{technicians:p=[]}=me(),f=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(p)?p:[]),m=new Map;f.forEach(I=>{if(!I||I.id==null)return;const M=String(I.id),ie=m.get(M)||{};m.set(M,{...ie,...I})});const y=(e.technicians||[]).map(I=>m.get(String(I))).filter(Boolean),b=Vt(),g=fa(e.start,e.end),S=(I={})=>{const M=[I.dailyWage,I.daily_rate,I.dailyRate,I.wage,I.rate];for(const ie of M){if(ie==null)continue;const be=parseFloat(h(String(ie)));if(Number.isFinite(be))return be}return 0},v=(I={})=>{const M=[I.dailyTotal,I.daily_total,I.totalRate,I.total,I.total_wage];for(const ie of M){if(ie==null)continue;const be=parseFloat(h(String(ie)));if(Number.isFinite(be))return be}return S(I)},B=u.reduce((I,M)=>{const ie=Array.isArray(M?.items)&&M.items.length?M.items[0]:{},be=Number(M?.count??M?.quantity??ie?.qty??1)||1;let je=[ie?.price,ie?.unit_price,ie?.unitPrice,M?.unitPrice].reduce((he,Ba)=>{if(Number.isFinite(he)&&he>0)return he;const fe=Number(Ba);return Number.isFinite(fe)?fe:he},NaN);if(!Number.isFinite(je)||je<=0){const he=Number(M?.totalPrice??ie?.total??ie?.total_price);Number.isFinite(he)&&be>0&&(je=Number((he/be).toFixed(2)))}Number.isFinite(je)||(je=0);const Ct=He(je);return I+Ct*be},0)*g,V=y.reduce((I,M)=>I+S(M),0),q=y.reduce((I,M)=>I+v(M),0),w=V*g,_=q*g,P=B+_,C=parseFloat(e.discount)||0,j=e.discountType==="amount"?C:P*(C/100),A=Math.max(0,P-j),D=r?!1:e.applyTax,F=Number(e.cost),U=Number.isFinite(F),N=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,X=N!=null?parseFloat(h(String(N))):NaN;let z=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(X)&&X>0)&&Number.isFinite(X)?X:0;D&&z<=0&&(z=bt);let R=z>0?Math.max(0,A*(z/100)):0;const H=A+R,O=D?H*.15:0,ae=Number.isFinite(O)&&O>0?Number(O.toFixed(2)):0,ee=H+ae,le=Number.isFinite(ee)?Number(ee.toFixed(2)):0,G=r?le:U?F:le;z>0&&(R=Number(Math.max(0,A*(z/100)).toFixed(2)));const oe=h(String(e.reservationId??e.id??"")),Ee=e.start?h(Qe(e.start)):"-",xe=e.end?h(Qe(e.end)):"-",Pe=h(String(y.length)),K=h(B.toFixed(2)),Z=h(j.toFixed(2)),re=h(A.toFixed(2)),ye=h(ae.toFixed(2)),Me=h((Number.isFinite(G)?G:0).toFixed(2)),et=h(String(g)),W=o("reservations.create.summary.currency","SR"),qe=o("reservations.details.labels.discount","الخصم"),L=o("reservations.details.labels.tax","الضريبة (15%)"),se=o("reservations.details.labels.crewTotal","إجمالي الفريق"),pe=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),de=o("reservations.details.labels.duration","عدد الأيام"),ge=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),Ve=o("reservations.details.labels.netProfit","💵 صافي الربح"),Be=o("reservations.create.equipment.imageAlt","صورة"),Ie={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},tt=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),Xt=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),pn=o("reservations.details.technicians.roleUnknown","غير محدد"),Jt=o("reservations.details.technicians.phoneUnknown","غير متوفر"),Y=o("reservations.details.technicians.wage","{amount} {currency} / اليوم"),Ae=o("reservations.list.status.confirmed","✅ مؤكد"),nt=o("reservations.list.status.pending","⏳ غير مؤكد"),ut=o("reservations.list.payment.paid","💳 مدفوع"),Pa=o("reservations.list.payment.unpaid","💳 غير مدفوع"),Ca=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),ja=o("reservations.list.status.completed","📁 منتهي"),fn=o("reservations.details.labels.id","🆔 رقم الحجز"),Yt=o("reservations.details.section.bookingInfo","بيانات الحجز"),ko=o("reservations.details.section.paymentSummary","ملخص الدفع"),_o=o("reservations.details.labels.finalTotal","المجموع النهائي"),No=o("reservations.details.section.crew","😎 الفريق الفني"),$o=o("reservations.details.crew.count","{count} عضو"),Po=o("reservations.details.section.items","📦 المعدات المرتبطة"),Co=o("reservations.details.items.count","{count} عنصر"),jo=o("reservations.details.actions.edit","✏️ تعديل"),To=o("reservations.details.actions.delete","🗑️ حذف"),Lo=o("reservations.details.labels.customer","العميل"),Bo=o("reservations.details.labels.contact","رقم التواصل"),Fo=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Do=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Ro=o("reservations.details.actions.openProject","📁 فتح المشروع"),Mo=o("reservations.details.labels.start","بداية الحجز"),zo=o("reservations.details.labels.end","نهاية الحجز"),Ho=o("reservations.details.labels.notes","ملاحظات"),Oo=o("reservations.list.noNotes","لا توجد ملاحظات"),Vo=o("reservations.details.labels.itemsCount","عدد المعدات"),Uo=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),Ko=o("reservations.paymentHistory.title","سجل الدفعات"),Qo=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Go=o("reservations.list.unknownCustomer","غير معروف"),Ta=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),tr=Ta==="partial",Wo=Ta==="paid"?ut:tr?Ca:Pa,Xo=I=>{if(I==null)return NaN;if(typeof I=="number")return Number.isFinite(I)?I:NaN;const M=String(I).replace(/[^0-9.+-]/g,""),ie=Number(M);return Number.isFinite(ie)?ie:NaN},nr=(I={})=>{const M=String(I.type??I.kind??I.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(M)||Array.isArray(I.packageItems)&&I.packageItems.length)},Jo=(I={})=>[I.packageId,I.package_id,I.packageCode,I.package_code,I.bundleId,I.bundle_id].some(M=>M!=null&&M!==""),Yo=(I={})=>!I||typeof I!="object"?!1:!nr(I)&&Jo(I),ar=(I={})=>{const M=nr(I),ie=[{value:I.qty,key:"qty",limit:999},{value:I.quantity,key:"quantity",limit:999},{value:I.units,key:"units",limit:999},{value:I.count,key:"count",limit:50},{value:I.package_quantity,key:"package_quantity",limit:999},{value:I.packageQty,key:"packageQty",limit:999},{value:I.packageCount,key:"packageCount",limit:999}];let be=NaN;for(const ke of ie){if(ke.value==null||ke.value==="")continue;const je=typeof ke.value=="string"?ke.value.trim():String(ke.value??"");if(ke.key==="count"&&je.length>6)continue;const Ct=Xo(ke.value);if(!Number.isFinite(Ct)||Ct<=0)continue;const he=Math.round(Ct);if(!(he>ke.limit)){be=Math.max(1,he);break}}return(!Number.isFinite(be)||be<=0)&&(be=1),M?Math.max(1,Math.min(99,be)):Math.max(1,Math.min(9999,be))};let Ce=(Array.isArray(l)?l:[]).reduce((I,M)=>!M||typeof M!="object"||Yo(M)?I:I+ar(M),0);Ce<=0&&Array.isArray(u)&&u.length&&(Ce=u.reduce((I,M)=>{const ie=ar({...M,type:M.type});return I+ie},0)),!Number.isFinite(Ce)||Ce<=0?Ce=Array.isArray(u)&&u.length?u.length:(Array.isArray(l)?l.length:0)||1:Ce>1e6&&(Ce=Math.min(Ce,Array.isArray(u)?u.length:Ce),(!Number.isFinite(Ce)||Ce<=0)&&(Ce=(Array.isArray(l)?l.length:0)||1)),Ce=Math.max(1,Math.round(Ce));const Zo=h(String(Ce)),sr=Co.replace("{count}",Zo),ec=$o.replace("{count}",Pe),tc=e.notes?h(e.notes):Oo,nc=h(_.toFixed(2)),ac=h(String(z)),sc=h(R.toFixed(2)),rc=`${ac}% (${sc} ${W})`,ic=Math.max(0,B+_-j),rr=Math.max(0,ic-w),oc=h(rr.toFixed(2)),qt=[{icon:"💼",label:Uo,value:`${K} ${W}`}];qt.push({icon:"😎",label:se,value:`${nc} ${W}`}),j>0&&qt.push({icon:"💸",label:qe,value:`${Z} ${W}`}),qt.push({icon:"📊",label:pe,value:`${re} ${W}`}),D&&ae>0&&qt.push({icon:"🧾",label:L,value:`${ye} ${W}`}),z>0&&qt.push({icon:"🏦",label:ge,value:rc}),Math.abs(rr-(G??0))>.009&&qt.push({icon:"💵",label:Ve,value:`${oc} ${W}`}),qt.push({icon:"💰",label:_o,value:`${Me} ${W}`});const cc=qt.map(({icon:I,label:M,value:ie})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${I} ${M}</span>
      <span class="summary-details-value">${ie}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let yn=[];Array.isArray(e.paymentHistory)?yn=e.paymentHistory:Array.isArray(e.payment_history)&&(yn=e.payment_history);const lc=Array.isArray(e.paymentLogs)?e.paymentLogs:[],ir=Array.isArray(yn)&&yn.length>0?yn:lc,dc=ir.length?`<ul class="reservation-payment-history-list">${ir.map(I=>{const M=I?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):I?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),ie=Number.isFinite(Number(I?.amount))&&Number(I.amount)>0?`${h(Number(I.amount).toFixed(2))} ${W}`:"—",be=Number.isFinite(Number(I?.percentage))&&Number(I.percentage)>0?`${h(Number(I.percentage).toFixed(2))}%`:"—",ke=I?.recordedAt?h(Qe(I.recordedAt)):"—",je=I?.note?`<div class="payment-history-note">${ze(h(I.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${ze(M)}</span>
              <span class="payment-history-entry__amount">${ie}</span>
              <span class="payment-history-entry__percent">${be}</span>
              <span class="payment-history-entry__date">${ke}</span>
            </div>
            ${je}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${ze(Qo)}</div>`,or=[{text:i?Ae:nt,className:i?"status-confirmed":"status-pending"},{text:Wo,className:Ta==="paid"?"status-paid":tr?"status-partial":"status-unpaid"}];d&&or.push({text:ja,className:"status-completed"});const uc=or.map(({text:I,className:M})=>`<span class="status-chip ${M}">${I}</span>`).join(""),Pt=(I,M,ie)=>`
    <div class="res-info-row">
      <span class="label">${I} ${M}</span>
      <span class="value">${ie}</span>
    </div>
  `;let La="";if(e.projectId){let I=ze(Do);if(s){const M=s.title||o("projects.fallback.untitled","مشروع بدون اسم");I=`${ze(M)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${ze(Ro)}</button>`}La=`
      <div class="res-info-row">
        <span class="label">📁 ${Fo}</span>
        <span class="value">${I}</span>
      </div>
    `}const mt=[];mt.push(Pt("👤",Lo,t?.customerName||Go)),mt.push(Pt("📞",Bo,t?.phone||"—")),mt.push(Pt("🗓️",Mo,Ee)),mt.push(Pt("🗓️",zo,xe)),mt.push(Pt("📦",Vo,sr)),mt.push(Pt("⏱️",de,et)),mt.push(Pt("📝",Ho,tc)),La&&mt.push(La);const mc=mt.join(""),pc=u.length?u.map(I=>{const M=I.items[0]||{},ie=Ut(M)||I.image,be=ie?`<img src="${ie}" alt="${Be}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',ke=I.items.some(ve=>ve?.type==="package"),je=(()=>{if(!ke)return[];if(Array.isArray(I.packageItems)&&I.packageItems.length)return I.packageItems;const ve=Array.isArray(I.items)?I.items.find(_e=>Array.isArray(_e?.packageItems)&&_e.packageItems.length):null;return Array.isArray(ve?.packageItems)?ve.packageItems:[]})(),Ct=ve=>{if(!Array.isArray(ve)||!ve.length)return 0;const _e=ve.reduce((Se,te)=>{if(!te||typeof te!="object")return Se;const Te=[te.qty,te.quantity,te.count,1].find(Je=>Number.isFinite(Number(Je))&&Number(Je)>0),Fa=Number.isFinite(Number(Te))&&Number(Te)>0?Number(Te):1;let Zt=[te.price,te.unit_price,te.unitPrice].reduce((Je,en)=>{if(Number.isFinite(Je)&&Je>0)return Je;const Da=Number(en);return Number.isFinite(Da)&&Da>0?Da:Je},NaN);if(!Number.isFinite(Zt)||Zt<=0){const Je=[te.total,te.total_price,te.totalPrice].map(en=>Number(en)).find(en=>Number.isFinite(en)&&en>0);Number.isFinite(Je)&&Je>0&&Fa>0&&(Zt=Je/Fa)}if(!Number.isFinite(Zt)||Zt<=0)return Se;const qc=He(Zt);return Se+qc*Math.max(1,Fa)},0);return He(_e)};let he=Number(I.quantity??I.count??M?.qty??0);(!Number.isFinite(he)||he<=0)&&(he=1);const Ba=h(String(he));let fe,Xe;if(ke){const ve=Ct(je);if(fe=[M?.price,M?.unit_price,M?.unitPrice,I.unitPrice].reduce((te,at)=>{if(Number.isFinite(te)&&te>0)return te;const Te=Number(at);return Number.isFinite(Te)&&Te>0?Te:te},NaN),!Number.isFinite(fe)||fe<=0){const te=Number(I.totalPrice??M?.total??M?.total_price);Number.isFinite(te)&&he>0&&(fe=te/he)}if((!Number.isFinite(fe)||fe<0)&&(fe=0),Number.isFinite(ve)&&ve>0&&(fe=ve),Xe=[M?.total,M?.total_price,I.totalPrice].reduce((te,at)=>{if(Number.isFinite(te)&&te>=0)return te;const Te=Number(at);return Number.isFinite(Te)?Te:te},NaN),!Number.isFinite(Xe))Xe=fe*he;else{const te=fe*he;Number.isFinite(te)&&te>0&&Math.abs(Xe-te)>te*.25&&(Xe=te)}}else{if(fe=[M?.price,M?.unit_price,M?.unitPrice,I.unitPrice].reduce((_e,Se)=>{if(Number.isFinite(_e)&&_e>0)return _e;const te=Number(Se);return Number.isFinite(te)?te:_e},NaN),!Number.isFinite(fe)||fe<=0){const _e=Number(I.totalPrice??M?.total??M?.total_price);Number.isFinite(_e)&&he>0&&(fe=_e/he)}Number.isFinite(fe)||(fe=0),Xe=Number(I.totalPrice??M?.total??M?.total_price),Number.isFinite(Xe)||(Xe=fe*he)}fe=He(fe),Xe=He(Xe);const bc=`${h(fe.toFixed(2))} ${W}`,hc=`${h(Xe.toFixed(2))} ${W}`,cr=I.barcodes.map(ve=>h(String(ve||""))).filter(Boolean),lr=cr.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${cr.map(ve=>`<li>${ve}</li>`).join("")}
              </ul>
            </details>`:"";let dr="";if(ke){const ve=new Map;if(I.items.forEach(_e=>{Array.isArray(_e?.packageItems)&&_e.packageItems.forEach(Se=>{if(!Se)return;const te=ne(Se.barcode||Se.normalizedBarcode||Se.desc||Math.random()),at=ve.get(te),Te=Number.isFinite(Number(Se.qty))?Number(Se.qty):1;if(at){at.qty+=Te;return}ve.set(te,{desc:Se.desc||Se.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Te,barcode:Se.barcode??Se.normalizedBarcode??""})})}),ve.size){const _e=Array.from(ve.values()).map(Se=>{const te=h("1"),at=ze(Se.desc||""),Te=Se.barcode?` <span class="reservation-package-items__barcode">(${ze(h(String(Se.barcode)))})</span>`:"";return`<li>${at}${Te} × ${te}</li>`}).join("");dr=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${_e}
                </ul>
              </details>
            `}}const vc=ke?`${dr||""}${lr||""}`:lr;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${be}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${ze(M.desc||M.description||M.name||I.description||"-")}</div>
                  ${vc}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${ze(Ie.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Ba}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${ze(Ie.unitPrice)}">${bc}</td>
            <td class="reservation-modal-items-table__cell" data-label="${ze(Ie.total)}">${hc}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${ze(Ie.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${tt}</td></tr>`,fc=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${Ie.item}</th>
            <th>${Ie.quantity}</th>
            <th>${Ie.unitPrice}</th>
            <th>${Ie.total}</th>
            <th>${Ie.actions}</th>
          </tr>
        </thead>
        <tbody>${pc}</tbody>
      </table>
    </div>
  `,yc=y.map((I,M)=>{const ie=h(String(M+1)),be=I.role||pn,ke=I.phone||Jt,je=I.wage?Y.replace("{amount}",h(String(I.wage))).replace("{currency}",W):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${ie}</span>
          <span class="technician-name">${I.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${be}</div>
          <div>📞 ${ke}</div>
          ${je?`<div>💰 ${je}</div>`:""}
        </div>
      </div>
    `}).join(""),gc=y.length?`<div class="reservation-technicians-grid">${yc}</div>`:`<ul class="reservation-modal-technicians"><li>${Xt}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${fn}</span>
          <strong>${oe}</strong>
        </div>
        <div class="status-chips">
          ${uc}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Yt}</h6>
          ${mc}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${ko}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${cc}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Ko}</h6>
              ${dc}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${No}</span>
          <span class="count">${ec}</span>
        </div>
        ${gc}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Po}</span>
          <span class="count">${sr}</span>
        </div>
        ${fc}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${jo}</button>
        ${b?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${To}</button>`:""}
      </div>
    </div>
  `}const gm="project",bm="editProject",hm=3600*1e3,ki=.15,vm=6,qm="projectsTab",Sm="projectsSubTab",Em={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},xm={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},wm={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},id=`@page {
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
`,od=/color\([^)]*\)/gi,_n=/(color\(|color-mix\(|oklab|oklch)/i,cd=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"],ld=typeof document<"u"?document.createElement("canvas"):null,zn=ld?.getContext?.("2d")||null;function _i(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function is(e,t="#000"){if(!zn||!e)return t;try{return zn.fillStyle="#000",zn.fillStyle=e,zn.fillStyle||t}catch{return t}}function dd(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&_n.test(n)){const s=is(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function tn(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function Im(e=[]){if(!(!Array.isArray(e)||!e.length))for(let t=e.length-1;t>=0;t-=1){const{element:n,prop:a,value:s,priority:r}=e[t]||{};!n?.style||!a||(s&&s.length>0?n.style.setProperty(a,s,r||""):n.style.removeProperty(a))}}function Ni(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;cd.forEach(c=>{const d=r[c];if(d&&_n.test(d)){const l=_i(c);tn(n,s,l);const u=c==="backgroundColor"?"#ffffff":r.color||"#000000",p=is(d,u);s.style.setProperty(l,p,"important")}});const i=r.backgroundImage;if(i&&_n.test(i)){const c=is(r.backgroundColor||"#ffffff","#ffffff");tn(n,s,"background-image"),tn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function $i(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(c=>{const d=r[c];if(d&&_n.test(d)){const l=_i(c);tn(n,s,l);const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(l,u,"important")}});const i=r.backgroundImage;i&&_n.test(i)&&(tn(n,s,"background-image"),tn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function Pi(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(od,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const Ci="reservations.quote.sequence",Ar={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},ji="https://help.artratio.sa/guide/quote-preview",$e={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},ud=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Oe=[...ud],md=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function os(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...Oe]}function pd(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=os(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=os(t.value);if(a.length)return a}const n=Oe.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...Oe]}const fd=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],Ti=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>x(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>x(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>x(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>x(h(Number(e?.price||0).toFixed(2)))}],Li=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(h(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>x(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>x(e?.role||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>x(e?.phone||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],cs={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:Ti.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:Li.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},Bi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(h(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>x(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>x(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>x(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Fi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>x(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>x(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>x(e?.note||"-")}],Di=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(h(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>x(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>x(h(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>x(h(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>x(e?.displayCost||"—")}],yd=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],gd={customerInfo:cs.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:cs.payment,projectExpenses:Fi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:Bi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:Di.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},Oa=new Map;function wa(e="reservation"){if(Oa.has(e))return Oa.get(e);const t=e==="project"?yd:fd,n=e==="project"?gd:cs,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(d=>d.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return Oa.set(e,r),r}function Ia(e="reservation"){return wa(e).sectionDefs}function Ri(e="reservation"){return wa(e).fieldDefs}function Mi(e="reservation"){return wa(e).sectionIdSet}function zi(e="reservation"){return wa(e).fieldIdMap}function Hi(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const bd="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",hd="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",vd="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",Oi=id.trim(),Vi=/^data:image\/svg\+xml/i,qd=/\.svg($|[?#])/i,Sn=512,ls="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",Ui=96,Ki=25.4,ds=210,Un=297,Kn=Math.round(ds/Ki*Ui),Qn=Math.round(Un/Ki*Ui),Sd=2,Qi=/safari/i,Ed=/(iphone|ipad|ipod)/i,kr=/(iphone|ipad|ipod)/i,xd=/(crios|fxios|edgios|opios)/i,ra="[reservations/pdf]";let J=null,T=null,rt=1,bn=null,hn=null,Et=null,nn=null,wn=!1;function Rt(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!J?.statusIndicator||!J?.statusText)return;J.statusKind=e;const r=t||Hi(e);J.statusText.textContent=r,J.statusSpinner&&(J.statusSpinner.hidden=!s),J.statusAction&&(J.statusAction.hidden=!0,J.statusAction.onclick=null,n&&typeof a=="function"&&(J.statusAction.textContent=n,J.statusAction.hidden=!1,J.statusAction.onclick=i=>{i.preventDefault(),a()})),J.statusIndicator.hidden=!1,requestAnimationFrame(()=>{J.statusIndicator.classList.add("is-visible")})}function In(e){!J?.statusIndicator||!J?.statusText||(J.statusKind=null,J.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{J?.statusIndicator&&(J.statusIndicator.hidden=!0,J.statusAction&&(J.statusAction.hidden=!0,J.statusAction.onclick=null),J.statusSpinner&&(J.statusSpinner.hidden=!1))},220))}function us(){return!!window?.bootstrap?.Modal}function wd(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),Et||(Et=document.createElement("div"),Et.className="modal-backdrop fade show",Et.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(Et)),nn||(nn=t=>{t.key==="Escape"&&ms(e)},document.addEventListener("keydown",nn));try{e.focus({preventScroll:!0})}catch{}}}function ms(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),Et&&(Et.remove(),Et=null),nn&&(document.removeEventListener("keydown",nn),nn=null))}function Id(e){if(e){if(us()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}wd(e)}}function Ad(){if(wn)return;wn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!J?.modal?.classList.contains("show"),s=()=>{J?.modal?.classList.contains("show")&&(Rt("render"),wn=!1,Wt())};Mr({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:ji}),a&&Rt("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function Aa(e="reservation"){const t={},n=Ri(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function Hs(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function kd(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function Os(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function Vs(e="reservation"){return Object.fromEntries(Ia(e).map(({id:t})=>[t,!1]))}function Us(e,t){return e.sectionExpansions||(e.sectionExpansions=Vs(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function _d(e,t){return Us(e,t)?.[t]!==!1}function Ks(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function Nd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Ed.test(e)}function $d(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=Qi.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Gi(){return Nd()&&$d()}function ka(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=kr.test(e)||kr.test(t),s=/Macintosh/i.test(e)&&n>1;return Qi.test(e)&&!xd.test(e)&&(a||s)}function Va(e,...t){try{console.log(`${ra} ${e}`,...t)}catch{}}function gt(e,...t){try{console.warn(`${ra} ${e}`,...t)}catch{}}function Pd(e,t,...n){try{t?console.error(`${ra} ${e}`,t,...n):console.error(`${ra} ${e}`,...n)}catch{}}function we(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Cd(e,t="لا توجد بيانات للعرض."){const n=x(o(e,t));return we(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function ia(e,t){return Array.isArray(e)&&e.length?e:[Cd(t)]}const jd=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function Wi(e=""){return jd.test(e)}function Td(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!Wi(r))return a.call(this,r,...i);let c,d=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),d=!0)}catch{}try{if(!d){const l=this.canvas;l&&l.style?.direction!=="rtl"&&(l.__artRatioOriginalDirection=l.style.direction,l.style.direction="rtl")}return a.call(this,r,...i)}finally{if(d&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!d){const l=this.canvas;l&&l.__artRatioOriginalDirection!==void 0&&(l.style.direction=l.__artRatioOriginalDirection,delete l.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function _r(e,t=Sn){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Ld(e){if(!e)return{width:Sn,height:Sn};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?_r(t,0):0,s=n?_r(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,d]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(d)&&d>0?d:0)}}return{width:a||Sn,height:s||Sn}}function Xi(e=""){return typeof e!="string"?!1:Vi.test(e)||qd.test(e)}function Bd(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Fd(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function Ji(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await Fd(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),d=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=d;const l=i.getContext("2d");return l.clearRect(0,0,c,d),l.drawImage(r,0,0,c,d),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function Dd(e){if(!e)return null;if(Vi.test(e))return Bd(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Rd(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!Xi(t))return!1;const n=await Dd(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",ls),!1;const a=await Ji(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",ls),!1)}async function Md(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Ld(e),s=await Ji(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||ls),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),d=e.getAttribute("height");return c&&i.setAttribute("width",c),d&&i.setAttribute("height",d),e.parentNode?.replaceChild(i,e),!!s}async function Yi(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{Xi(s.getAttribute?.("src"))&&a.push(Rd(s))}),n.forEach(s=>{a.push(Md(s))}),a.length&&await Promise.allSettled(a)}function zd(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=($,z=0)=>{const R=parseFloat($);return Number.isFinite(R)?R:z},i=r(s.paddingTop),c=r(s.paddingBottom),d=r(s.paddingRight),l=r(s.paddingLeft),u=r(s.borderRadius),p=r(s.fontSize,14),f=(()=>{const $=s.lineHeight;if(!$||$==="normal")return p*1.6;const z=r($,p*1.6);return z>0?z:p*1.6})(),m=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(m<=0)return null;const y=Math.max(1,m-l-d),b=e.textContent||"",g=b.split(/\r?\n/),S=n.createElement("canvas"),v=S.getContext("2d");if(!v)return null;const k=s.fontStyle||"normal",B=s.fontVariant||"normal",V=s.fontWeight||"400",q=s.fontFamily||"sans-serif",w=s.fontStretch||"normal",_=$=>$.join(" "),P=[],C=$=>v.measureText($).width;v.font=`${k} ${B} ${V} ${w} ${p}px ${q}`,g.forEach($=>{const z=$.trim();if(z.length===0){P.push("");return}const R=z.split(/\s+/);let H=[];R.forEach((O,ae)=>{const ee=O.trim();if(!ee)return;const le=_(H.concat(ee));if(C(le)<=y||H.length===0){H.push(ee);return}P.push(_(H)),H=[ee]}),H.length&&P.push(_(H))}),P.length||P.push("");const j=i+c+P.length*f,A=Math.ceil(Math.max(1,m)*t),D=Math.ceil(Math.max(1,j)*t);S.width=A,S.height=D,S.style.width=`${Math.max(1,m)}px`,S.style.height=`${Math.max(1,j)}px`,v.scale(t,t);const F=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){v.save(),v.beginPath();const $=Math.max(1,m),z=Math.max(1,j),R=Math.min(u,$/2,z/2);v.moveTo(R,0),v.lineTo($-R,0),v.quadraticCurveTo($,0,$,R),v.lineTo($,z-R),v.quadraticCurveTo($,z,$-R,z),v.lineTo(R,z),v.quadraticCurveTo(0,z,0,z-R),v.lineTo(0,R),v.quadraticCurveTo(0,0,R,0),v.closePath(),v.clip()}if(v.fillStyle=F,v.fillRect(0,0,Math.max(1,m),Math.max(1,j)),v.font=`${k} ${B} ${V} ${w} ${p}px ${q}`,v.fillStyle=s.color||"#000000",v.textBaseline="top",v.textAlign="right","direction"in v)try{v.direction="rtl"}catch{}const U=Math.max(0,m-d);let N=i;P.forEach($=>{const z=$.length?$:" ";v.fillText(z,U,N,y),N+=f});const X=n.createElement("img");let Q;try{Q=S.toDataURL("image/png")}catch($){return gt("note canvas toDataURL failed",$),null}return X.src=Q,X.alt=b,X.style.width=`${Math.max(1,m)}px`,X.style.height=`${Math.max(1,j)}px`,X.style.display="block",X.setAttribute("data-quote-note-image","true"),{image:X,canvas:S,totalHeight:j,width:m}}function Hd(e,{pixelRatio:t=1}={}){if(!e||!ka())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!Wi(a.textContent||""))return;let s;try{s=zd(a,{pixelRatio:t})}catch(r){gt("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function ps(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){Pd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),d=o("reservations.quote.toast.retry","إعادة المحاولة"),l=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(Rt("export"),uo()):(Rt("render"),wn=!1,Wt())};if(Mr({message:i,duration:9e3,actionLabel:l?d:void 0,onAction:l?u:void 0,linkLabel:c,linkHref:ji}),J?.modal?.classList.contains("show")&&Rt("error",{message:i,actionLabel:l?d:void 0,onAction:l?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function fs({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){gt("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){gt("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function Qs(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function Nr(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function $r(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function Od(){const e=$r();return e||(hn||(hn=Qs(hd).catch(t=>{throw hn=null,t}).then(()=>{const t=$r();if(!t)throw hn=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),hn)}async function Vd(){const e=Nr();return e||(bn||(bn=Qs(vd).catch(t=>{throw bn=null,t}).then(()=>{const t=Nr();if(!t)throw bn=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),bn)}async function Ud(){if(window.html2pdf||await Qs(bd),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}dd(),Td()}function x(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Kd(e="reservation"){return e==="project"?"QP":"Q"}function Qd(e,t="reservation"){const n=Number(e),a=Kd(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function Gd(){const e=window.localStorage?.getItem?.(Ci),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function Zi(e="reservation"){const n=Gd()+1;return{sequence:n,quoteNumber:Qd(n,e)}}function Wd(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(Ci,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function eo(e="reservation"){return Ar[e]||Ar.reservation}function Xd(e="reservation"){try{const t=eo(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function Jd(e,t="reservation"){try{const n=eo(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function Yd(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function Zd(e,t="reservation"){if(!e)return null;const n=Mi(t),a=zi(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,d])=>{const l=i[c];if(l==null)return;const{ids:u,emptyExplicitly:p}=Yd(l);if(!u&&!p)return;const f=Array.isArray(u)?u.filter(m=>d.has(m)):[];(f.length>0||p)&&(r[c]=f)}),{version:1,sections:s,fields:r}}function to(e){if(!e)return;const t=e.context||"reservation",n=Zd(e,t);n&&Jd(n,t)}function no(e){if(!e)return;const t=e.context||"reservation",n=Xd(t);if(!n)return;const a=Mi(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=Hs(e.fields||Aa(t)),i=zi(t);Object.entries(n.fields).forEach(([c,d])=>{const l=i[c];if(!l)return;const u=Array.isArray(d)?d.filter(p=>l.has(p)):[];r[c]=new Set(u)}),e.fields=r}}function ao(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function so(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return 0}function eu(e={}){const t=[e.dailyTotal,e.daily_total,e.totalRate,e.total,e.total_wage];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return so(e)}function tu(e){const t=jn()||[],{technicians:n=[]}=me(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const i=String(r.id),c=s.get(i)||{};s.set(i,{...c,...r})}),(e.technicians||[]).map(r=>s.get(String(r))).filter(Boolean)}function nu(e,t,n){const{projectLinked:a}=kt(e,n),s=fa(e.start,e.end),{groups:r}=Ts(e),c=r.reduce((Q,$)=>{const z=Array.isArray($?.items)&&$.items.length?$.items[0]:{},R=Number($?.count??$?.quantity??z?.qty??1)||1;let O=[z?.price,z?.unit_price,z?.unitPrice,$?.unitPrice].reduce((ee,le)=>{if(Number.isFinite(ee)&&ee>0)return ee;const G=Number(le);return Number.isFinite(G)?G:ee},NaN);if(!Number.isFinite(O)||O<=0){const ee=Number($?.totalPrice??z?.total??z?.total_price);Number.isFinite(ee)&&R>0&&(O=Number((ee/R).toFixed(2)))}Number.isFinite(O)||(O=0),O=He(O);const ae=He(O);return Q+ae*R},0)*s,d=t.reduce((Q,$)=>Q+so($),0),l=t.reduce((Q,$)=>Q+eu($),0),u=d*s,p=l*s,f=c+p,m=parseFloat(e.discount)||0,y=e.discountType==="amount"?m:f*(m/100),b=Math.max(0,f-y),g=a?!1:e.applyTax,S=Number(e.cost),v=Number.isFinite(S),k=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,B=k!=null?parseFloat(h(String(k).replace("%","").trim())):NaN,V=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let w=(V!=null?V===!0||V===1||V==="1"||String(V).toLowerCase()==="true":Number.isFinite(B)&&B>0)&&Number.isFinite(B)?Number(B):0;g&&w<=0&&(w=bt);let _=w>0?Math.max(0,b*(w/100)):0;_=Number(_.toFixed(2));const P=b+_;let C=g?P*.15:0;(!Number.isFinite(C)||C<0)&&(C=0),C=Number(C.toFixed(2));const j=P+C,A=Number.isFinite(j)?Number(j.toFixed(2)):0,D=a?A:v?S:A,F=Math.max(0,c+p-y),U=Math.max(0,F-u),N={equipmentTotal:c,crewTotal:p,crewCostTotal:u,discountAmount:y,subtotalAfterDiscount:b,taxableAmount:P,taxAmount:C,finalTotal:D,companySharePercent:w,companyShareAmount:_,netProfit:U},X={equipmentTotal:h(c.toFixed(2)),crewTotal:h(p.toFixed(2)),discountAmount:h(y.toFixed(2)),subtotalAfterDiscount:h(b.toFixed(2)),taxableAmount:h(P.toFixed(2)),taxAmount:h(C.toFixed(2)),finalTotal:h(D.toFixed(2)),companySharePercent:h(w.toFixed(2)),companyShareAmount:h(_.toFixed(2)),netProfit:h(U.toFixed(2))};return{totals:N,totalsDisplay:X,rentalDays:s}}function cn(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function ro(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function au(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=cn(e.amount??(n==="amount"?e.value:null)),s=cn(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=ro(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function su(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(au).filter(Boolean);if(n.length>0)return n;const a=cn(e.paidPercent??e.paid_percent),s=cn(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=ro(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function ru(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function iu(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function ou(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function cu(e){const t=Number(e?.equipmentEstimate)||0,n=ou(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const d=Math.max(0,a-c),l=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,p=l&&s&&u>0?u:0,f=p>0?Number((d*(p/100)).toFixed(2)):0,m=d+f;let y=s?m*ki:0;(!Number.isFinite(y)||y<0)&&(y=0),y=Number(y.toFixed(2));let b=s?Number(e?.totalWithTax):m;return s?(!Number.isFinite(b)||b<=0)&&(b=Number((m+y).toFixed(2))):b=m,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:d,companyShareAmount:f,subtotal:m,applyTax:s,taxAmount:y,totalWithTax:b}}function lu(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.technicians)?e.technicians:[],i=ws(t,a,s,!1,r,{start:e.start,end:e.end});if(Number.isFinite(i))return i;const c=Number(h(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function du(e,t){if(!e)return"—";const n=Qe(e);return t?`${n} - ${Qe(t)}`:n}function ce(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${h(a.toFixed(s))} ${t}`}function Pr(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function uu(e){if(!e?.start)return null;if(!e?.end)return 1;const t=fa(e.start,e.end);return Number.isFinite(t)?t:1}function mu(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function pu(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=me(),i=e?.id!=null?s.find(L=>String(L.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:ce(0,t),expensesTotal:ce(0,t),reservationsTotal:ce(0,t),discountAmount:ce(0,t),taxAmount:ce(0,t),overallTotal:ce(0,t),paidAmount:ce(0,t),remainingAmount:ce(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:ce(0,t),remainingAmountDisplay:ce(0,t),paidPercentDisplay:Pr(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const d=i.clientId??i.customerId??i.client_id??i.customer_id??null,l=d!=null&&n.find(L=>String(L.id)===String(d))||null,u=l?.customerName??l?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),p=(i.clientCompany||l?.companyName||l?.company||"").trim(),f=l?.phone??l?.customerPhone??i.clientPhone??i.customerPhone??"",m=f?h(String(f).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),y=l?.email??i.clientEmail??i.customerEmail??"",b=y?String(y).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),g=i.projectCode||`PRJ-${h(String(i.id??""))}`,S=h(String(g)),v=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),k=ru(i.type),B=i.start?Qe(i.start):"—",V=i.end?Qe(i.end):"—",q=uu(i),w=q!=null?mu(q):"غير محدد",_=iu(i),P={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},C=o(`projects.status.${_}`,P[_]||_),j=i.id!=null?String(i.id):null,A=j?a.filter(L=>String(L.projectId)===j):[],F=A.map(L=>{const se=L.reservationId||L.id||"",pe=L.status||L.state||"pending",de=String(pe).toLowerCase(),ge=o(`reservations.status.${de}`,de),Ve=lu(L),Be=L.start?new Date(L.start).getTime():0;return{reservationId:h(String(se||"-")),status:de,statusLabel:ge,total:Ve,totalLabel:ce(Ve,t),dateRange:du(L.start,L.end),startTimestamp:Number.isNaN(Be)?0:Be}}).sort((L,se)=>se.startTimestamp-L.startTimestamp).map(({startTimestamp:L,...se})=>se).reduce((L,se)=>L+(Number(se.total)||0),0),U=new Map;A.forEach(L=>{const se=Array.isArray(L.items)?L.items:[],pe=fa(L.start,L.end),de=L.reservationId||L.id||"";se.forEach((ge,Ve)=>{if(!ge)return;const Be=ge.barcode||ge.code||ge.id||ge.desc||ge.description||`item-${Ve}`,Ie=String(Be||`item-${Ve}`),tt=U.get(Ie)||{description:ge.desc||ge.description||ge.name||ge.barcode||`#${h(String(Ve+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},Xt=Number(ge.qty)||1,pn=Number(ge.price)||0;tt.totalQuantity+=Xt,tt.reservationIds.add(String(de));const Jt=pn*Xt*Math.max(1,pe);Number.isFinite(Jt)&&(tt.totalCost+=Jt),U.set(Ie,tt)})});const N=Array.from(U.values()).map(L=>({description:L.description,totalQuantity:L.totalQuantity,reservationsCount:L.reservationIds.size,displayCost:ce(L.totalCost,t)})),X=new Map((r||[]).filter(Boolean).map(L=>[String(L.id),L])),Q=new Map,$=L=>{if(!L)return;let se=null;typeof L=="object"?se=L.id??L.technicianId??L.technician_id??L.userId??L.user_id??null:(typeof L=="string"||typeof L=="number")&&(se=L);const pe=se!=null?String(se):null,de=pe&&X.has(pe)?X.get(pe):typeof L=="object"?L:null,ge=de?.name||de?.full_name||de?.fullName||de?.displayName||(typeof L=="string"?L:null),Ve=de?.role||de?.title||null,Be=de?.phone||de?.mobile||de?.contact||null;if(!ge&&!pe)return;const Ie=pe||ge;Q.has(Ie)||Q.set(Ie,{id:pe,name:ge||"-",role:Ve||null,phone:Be||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(L=>$(L)),A.forEach(L=>{(Array.isArray(L.technicians)?L.technicians:[]).forEach(pe=>$(pe))});const z=Array.from(Q.values()),R=Array.isArray(i.expenses)?i.expenses.map(L=>{const se=Number(L?.amount)||0;return{label:L?.label||L?.name||"-",amount:se,displayAmount:ce(se,t),note:L?.note||L?.description||""}}):[],H=cu(i),O=H.applyTax?Number(((H.subtotal+F)*ki).toFixed(2)):0,ae=Number((H.subtotal+F+O).toFixed(2)),ee=su(i),le=cn(i.paidAmount??i.paid_amount)||0,G=cn(i.paidPercent??i.paid_percent)||0,oe=Is({totalAmount:ae,paidAmount:le,paidPercent:G,history:ee}),Ee=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",xe=As({manualStatus:Ee,paidAmount:oe.paidAmount,paidPercent:oe.paidPercent,totalAmount:ae}),Pe={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},K=o(`projects.paymentStatus.${xe}`,Pe[xe]||xe),Z=Number(oe.paidAmount||0),re=Number(oe.paidPercent||0),ye=Math.max(0,Number((ae-Z).toFixed(2))),Me={projectSubtotal:ce(H.subtotal,t),expensesTotal:ce(H.expensesTotal,t),reservationsTotal:ce(F,t),discountAmount:ce(H.discountAmount,t),taxAmount:ce(O,t),overallTotal:ce(ae,t),paidAmount:ce(Z,t),remainingAmount:ce(ye,t)},et={status:xe,statusLabel:K,paidAmount:Z,paidPercent:re,remainingAmount:ye,paidAmountDisplay:ce(Z,t),remainingAmountDisplay:ce(ye,t),paidPercentDisplay:Pr(re)},W=(i.description||"").trim();return{project:i,customer:l,clientInfo:{name:u,company:p||"—",phone:m,email:b},projectInfo:{title:v,code:S,typeLabel:k,startDisplay:B,endDisplay:V,durationLabel:w,statusLabel:C},expenses:R,equipment:N,crew:z,totals:H,totalsDisplay:Me,projectTotals:{combinedTaxAmount:O,overallTotal:ae,reservationsTotal:F,paidAmount:Z,paidPercent:re,remainingAmount:ye,paymentStatus:xe},paymentSummary:et,notes:W,currencyLabel:t,projectStatus:_,projectStatusLabel:C,projectDurationDays:q,projectDurationLabel:w,paymentHistory:ee}}function fu({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:d={},currencyLabel:l="SR",sections:u,fieldSelections:p={},quoteNumber:f,quoteDate:m,terms:y=Oe}){const b=Hs(p),g=(K,Z)=>Os(b,K,Z),S=K=>u?.has?.(K),v=`<div class="quote-placeholder">${x(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,k=(K,Z)=>`<div class="info-plain__item">
      <span class="info-plain__label">${x(K)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${x(Z)}</span>
    </div>`,B=(K,Z,{variant:re="inline"}={})=>re==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${x(K)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${x(Z)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${x(K)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${x(Z)}</span>
    </span>`,V=(K,Z)=>`<div class="payment-row">
      <span class="payment-row__label">${x(K)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${x(Z)}</span>
    </div>`,q=[];g("customerInfo","customerName")&&q.push(k(o("projects.details.client","العميل"),t.name||"-")),g("customerInfo","customerCompany")&&q.push(k(o("projects.details.company","شركة العميل"),t.company||"—")),g("customerInfo","customerPhone")&&q.push(k(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),g("customerInfo","customerEmail")&&q.push(k(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const w=S("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${x(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${q.length?`<div class="info-plain">${q.join("")}</div>`:v}
      </section>`:"",_=[];g("projectInfo","projectType")&&_.push(k(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),g("projectInfo","projectTitle")&&_.push(k(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),g("projectInfo","projectCode")&&_.push(k(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),g("projectInfo","projectStart")&&_.push(k(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),g("projectInfo","projectEnd")&&_.push(k(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),g("projectInfo","projectDuration")&&_.push(k(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),g("projectInfo","projectStatus")&&_.push(k(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const P=S("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${x(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${_.length?`<div class="info-plain">${_.join("")}</div>`:v}
      </section>`:"",C=Bi.filter(K=>g("projectCrew",K.id)),j=S("projectCrew")?C.length?`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${C.map(K=>`<th>${x(K.labelKey?o(K.labelKey,K.fallback):K.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((K,Z)=>`<tr>${C.map(re=>`<td>${re.render(K,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(C.length,1)}" class="empty">${x(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${v}
          </section>`:"",A=[];g("financialSummary","projectSubtotal")&&A.push(B(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${ce(0,l)}`)),g("financialSummary","expensesTotal")&&A.push(B(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||ce(0,l))),g("financialSummary","reservationsTotal")&&A.push(B(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||ce(0,l))),g("financialSummary","discountAmount")&&A.push(B(o("reservations.details.labels.discount","الخصم"),i.discountAmount||ce(0,l))),g("financialSummary","taxAmount")&&A.push(B(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||ce(0,l)));const D=[];g("financialSummary","overallTotal")&&D.push(B(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||ce(0,l),{variant:"final"})),g("financialSummary","paidAmount")&&D.push(B(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||ce(0,l),{variant:"final"})),g("financialSummary","remainingAmount")&&D.push(B(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||ce(0,l),{variant:"final"}));const F=S("financialSummary")?!A.length&&!D.length?`<section class="quote-section quote-section--financial">${v}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${x(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${A.length?`<div class="totals-inline">${A.join("")}</div>`:""}
            ${D.length?`<div class="totals-final">${D.join("")}</div>`:""}
          </div>
        </section>`:"",U=Fi.filter(K=>g("projectExpenses",K.id)),N=S("projectExpenses")?U.length?`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${U.map(K=>`<th>${x(K.labelKey?o(K.labelKey,K.fallback):K.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((K,Z)=>`<tr>${U.map(re=>`<td>${re.render(K,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(U.length,1)}" class="empty">${x(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${v}
          </section>`:"",X=Di.filter(K=>g("projectEquipment",K.id)),Q=S("projectEquipment")?X.length?`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${X.map(K=>`<th>${x(K.labelKey?o(K.labelKey,K.fallback):K.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${r.length?r.map((K,Z)=>`<tr>${X.map(re=>`<td>${re.render(K,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(X.length,1)}" class="empty">${x(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${v}
          </section>`:"",$=(e?.description||"").trim()||"",z=S("projectNotes")?`<section class="quote-section">
        <h3>${x(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${x($||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",R=[];g("payment","beneficiary")&&R.push(V(o("reservations.quote.labels.beneficiary","اسم المستفيد"),$e.beneficiaryName)),g("payment","bank")&&R.push(V(o("reservations.quote.labels.bank","اسم البنك"),$e.bankName)),g("payment","account")&&R.push(V(o("reservations.quote.labels.account","رقم الحساب"),h($e.accountNumber))),g("payment","iban")&&R.push(V(o("reservations.quote.labels.iban","رقم الآيبان"),h($e.iban)));const H=`<section class="quote-section">
      <div class="payment-block">
        <h3>${x(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${R.length?R.join(""):v}</div>
      </div>
      <p class="quote-approval-note">${x($e.approvalNote)}</p>
    </section>`,O=Array.isArray(y)&&y.length?y:Oe,ae=`<footer class="quote-footer">
        <h4>${x(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${O.map(K=>`<li>${x(K)}</li>`).join("")}</ul>
      </footer>`,ee=[],le=[];if(P&&le.push({key:"project",html:P}),w&&le.push({key:"customer",html:w}),le.length>1){const K=le.find(ye=>ye.key==="project"),Z=le.find(ye=>ye.key==="customer"),re=[];K?.html&&re.push(K.html),Z?.html&&re.push(Z.html),ee.push(we(`<div class="quote-section-row quote-section-row--primary">${re.join("")}</div>`,{blockType:"group"}))}else le.length===1&&ee.push(we(le[0].html));const G=[];j&&G.push(we(j,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),N&&G.push(we(N,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),Q&&G.push(we(Q,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const oe=[];F&&oe.push(we(F,{blockType:"summary"})),z&&oe.push(we(z));const Ee=[we(H,{blockType:"payment"}),we(ae,{blockType:"footer"})],xe=[...ia(ee,"projects.quote.placeholder.primary"),...G,...ia(oe,"projects.quote.placeholder.summary"),...Ee],Pe=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${x($e.logoUrl)}" alt="${x($e.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${x(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${x($e.companyName)}</p>
        <p class="quote-company-cr">${x(o("reservations.quote.labels.cr","السجل التجاري"))}: ${x($e.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${x(o("reservations.details.labels.reservationId","رقم العرض"))}</span>
          <strong>${x(f)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${x(o("projects.quote.labels.date","التاريخ"))}</span>
          <strong>${x(m)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Oi}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Pe}
          ${xe.join("")}
        </div>
      </div>
    </div>
  `}function io(e){if(e?.context==="project")return fu(e);const{reservation:t,customer:n,project:a,technicians:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:d,sections:l,fieldSelections:u={},quoteNumber:p,quoteDate:f,terms:m=Oe}=e,y=h(String(t?.reservationId??t?.id??"")),b=t.start?h(Qe(t.start)):"-",g=t.end?h(Qe(t.end)):"-",S=n?.customerName||n?.full_name||n?.name||"-",v=n?.phone||"-",k=n?.email||"-",B=n?.company||n?.company_name||"-",V=h(v),q=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),w=a?.code||a?.projectCode||"",_=h(String(c)),P=t?.notes||"",C=Array.isArray(m)&&m.length?m:Oe,j=Hs(u),A=(Y,Ae)=>Os(j,Y,Ae),D=Y=>l?.has?.(Y),F=`<div class="quote-placeholder">${x(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,U=(Y,Ae)=>`<div class="info-plain__item">${x(Y)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${x(Ae)}</strong></div>`,N=(Y,Ae,{variant:nt="inline"}={})=>nt==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${x(Y)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${x(Ae)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${x(Y)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${x(Ae)}</span>
    </span>`,X=(Y,Ae)=>`<div class="payment-row">
      <span class="payment-row__label">${x(Y)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${x(Ae)}</span>
    </div>`,Q=[];A("customerInfo","customerName")&&Q.push(U(o("reservations.details.labels.customer","العميل"),S)),A("customerInfo","customerCompany")&&Q.push(U(o("reservations.details.labels.company","الشركة"),B)),A("customerInfo","customerPhone")&&Q.push(U(o("reservations.details.labels.phone","الهاتف"),V)),A("customerInfo","customerEmail")&&Q.push(U(o("reservations.details.labels.email","البريد"),k));const $=D("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${x(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${Q.length?`<div class="info-plain">${Q.join("")}</div>`:F}
      </section>`:"",z=[];A("reservationInfo","reservationId")&&z.push(U(o("reservations.details.labels.reservationId","رقم الحجز"),y||"-")),A("reservationInfo","reservationStart")&&z.push(U(o("reservations.details.labels.start","بداية الحجز"),b)),A("reservationInfo","reservationEnd")&&z.push(U(o("reservations.details.labels.end","نهاية الحجز"),g)),A("reservationInfo","reservationDuration")&&z.push(U(o("reservations.details.labels.duration","عدد الأيام"),_));const R=D("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${x(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${z.length?`<div class="info-plain">${z.join("")}</div>`:F}
      </section>`:"",H=[];A("projectInfo","projectTitle")&&H.push(U(o("reservations.details.labels.project","المشروع"),q)),A("projectInfo","projectCode")&&H.push(U(o("reservations.details.labels.code","الرمز"),w||"-"));const O=D("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${x(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${H.length?`<div class="info-plain">${H.join("")}</div>`:F}
      </section>`:"",ae=[];A("financialSummary","equipmentTotal")&&ae.push(N(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${d}`)),A("financialSummary","crewTotal")&&ae.push(N(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${d}`)),A("financialSummary","discountAmount")&&ae.push(N(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${d}`)),A("financialSummary","taxAmount")&&ae.push(N(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${d}`));const ee=A("financialSummary","finalTotal"),le=[];ee&&le.push(N(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${d}`,{variant:"final"}));const G=le.length?`<div class="totals-final">${le.join("")}</div>`:"",oe=D("financialSummary")?!ae.length&&!ee?`<section class="quote-section quote-section--financial">${F}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${x(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${ae.length?`<div class="totals-inline">${ae.join("")}</div>`:""}
            ${G}
          </div>
        </section>`:"",{groups:Ee}=Ts(t),xe=Ee.map(Y=>{const Ae=Number(Y?.count??Y?.quantity??1)||1,nt=Number(Y?.unitPrice);let ut=Number.isFinite(nt)?nt:0;if(!ut||ut<=0){const Yt=Number(Y?.totalPrice);Number.isFinite(Yt)&&Ae>0&&(ut=Number((Yt/Ae).toFixed(2)))}Number.isFinite(ut)||(ut=0);const Pa=Y?.type==="package"||Array.isArray(Y?.items)&&Y.items.some(Yt=>Yt?.type==="package"),Ca=Array.isArray(Y?.barcodes)&&Y.barcodes.length?Y.barcodes[0]:Array.isArray(Y?.items)&&Y.items.length?Y.items[0]?.barcode:null,ja=Y?.barcode??Ca??"";let fn=Number.isFinite(Number(Y?.totalPrice))?Number(Y.totalPrice):Number((ut*Ae).toFixed(2));return fn=He(fn),{...Y,isPackage:Pa,desc:Y?.description,barcode:ja,qty:Ae,price:ut,totalPrice:fn}}),Pe=Ti.filter(Y=>A("items",Y.id)),K=Pe.length>0,Z=K?Pe.map(Y=>`<th>${x(Y.labelKey?o(Y.labelKey,Y.fallback):Y.fallback)}</th>`).join(""):"",ye=xe.length>0?xe.map((Y,Ae)=>`<tr>${Pe.map(nt=>`<td>${nt.render(Y,Ae)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Pe.length,1)}" class="empty">${x(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,Me=D("items")?K?`<section class="quote-section quote-section--table">
            <h3>${x(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Z}</tr>
              </thead>
              <tbody>${ye}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(o("reservations.details.items.title","المعدات"))}</h3>
            ${F}
          </section>`:"",et=Li.filter(Y=>A("crew",Y.id)),W=et.length>0,qe=W?et.map(Y=>`<th>${x(Y.labelKey?o(Y.labelKey,Y.fallback):Y.fallback)}</th>`).join(""):"",L=s.length?s.map((Y,Ae)=>`<tr>${et.map(nt=>`<td>${nt.render(Y,Ae)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(et.length,1)}" class="empty">${x(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,se=D("crew")?W?`<section class="quote-section quote-section--table">
            <h3>${x(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${qe}</tr>
              </thead>
              <tbody>${L}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${F}
          </section>`:"",pe=D("notes")?`<section class="quote-section">
        <h3>${x(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${x(P||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",de=[];A("payment","beneficiary")&&de.push(X(o("reservations.quote.labels.beneficiary","اسم المستفيد"),$e.beneficiaryName)),A("payment","bank")&&de.push(X(o("reservations.quote.labels.bank","اسم البنك"),$e.bankName)),A("payment","account")&&de.push(X(o("reservations.quote.labels.account","رقم الحساب"),h($e.accountNumber))),A("payment","iban")&&de.push(X(o("reservations.quote.labels.iban","رقم الآيبان"),h($e.iban)));const ge=`<section class="quote-section">
      <div class="payment-block">
        <h3>${x(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${de.length?de.join(""):F}</div>
      </div>
      <p class="quote-approval-note">${x($e.approvalNote)}</p>
    </section>`,Ve=`<footer class="quote-footer">
        <h4>${x(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${C.map(Y=>`<li>${x(Y)}</li>`).join("")}</ul>
      </footer>`,Be=[];$&&R?Be.push(we(`<div class="quote-section-row">${$}${R}</div>`,{blockType:"group"})):(R&&Be.push(we(R)),$&&Be.push(we($))),O&&Be.push(we(O));const Ie=[];Me&&Ie.push(we(Me,{blockType:"table",extraAttributes:'data-table-id="items"'})),se&&Ie.push(we(se,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const tt=[];oe&&tt.push(we(oe,{blockType:"summary"})),pe&&tt.push(we(pe));const Xt=[we(ge,{blockType:"payment"}),we(Ve,{blockType:"footer"})],pn=[...ia(Be,"reservations.quote.placeholder.page1"),...Ie,...ia(tt,"reservations.quote.placeholder.page2"),...Xt],Jt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${x($e.logoUrl)}" alt="${x($e.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${x(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${x($e.companyName)}</p>
        <p class="quote-company-cr">${x(o("reservations.quote.labels.cr","السجل التجاري"))}: ${x($e.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${x(p)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${x(f)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Oi}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Jt}
          ${pn.join("")}
        </div>
      </div>
    </div>
  `}function yu(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function Nn(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>yu(c)),i=[s,...r].map(c=>c.catch(d=>(gt("asset load failed",d),Ad(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function oo(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await Yi(r),await Nn(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let d=null,l=null;const u=q=>{q.style.margin="0 auto",q.style.breakInside="avoid",q.style.pageBreakInside="avoid",q.style.pageBreakAfter="auto",q.style.breakAfter="auto"},p=()=>{const q=a.createElement("div"),w=s.childElementCount===0;if(q.className="quote-page",q.dataset.pageIndex=String(s.childElementCount),w){q.classList.add("quote-page--primary");const P=i.cloneNode(!0);P.removeAttribute("data-quote-header-template"),q.appendChild(P)}else q.classList.add("quote-page--continuation");const _=a.createElement("main");_.className="quote-body",q.appendChild(_),s.appendChild(q),u(q),d=q,l=_},f=()=>{(!d||!l||!l.isConnected)&&p()},m=()=>{if(!d||!l||l.childElementCount>0)return;const q=d;d=null,l=null,q.parentNode&&q.parentNode.removeChild(q)},y=()=>{d=null,l=null},b=()=>d?d.scrollHeight-d.clientHeight>Sd:!1,g=(q,{allowOverflow:w=!1}={})=>(f(),l.appendChild(q),b()&&!w?(l.removeChild(q),m(),!1):!0),S=q=>{const w=q.cloneNode(!0);w.removeAttribute?.("data-quote-block"),w.removeAttribute?.("data-block-type"),w.removeAttribute?.("data-table-id"),!g(w)&&(y(),!g(w)&&g(w,{allowOverflow:!0}))},v=q=>{const w=q.querySelector("table");if(!w){S(q);return}const _=q.querySelector("h3"),P=w.querySelector("thead"),C=Array.from(w.querySelectorAll("tbody tr"));if(!C.length){S(q);return}let j=null,A=0;const D=(U=!1)=>{const N=q.cloneNode(!1);N.removeAttribute("data-quote-block"),N.removeAttribute("data-block-type"),N.removeAttribute("data-table-id"),N.classList.add("quote-section--table-fragment"),U&&N.classList.add("quote-section--table-fragment--continued");const X=_?_.cloneNode(!0):null;X&&N.appendChild(X);const Q=w.cloneNode(!1);Q.classList.add("quote-table--fragment"),P&&Q.appendChild(P.cloneNode(!0));const $=a.createElement("tbody");return Q.appendChild($),N.appendChild(Q),{section:N,body:$}},F=(U=!1)=>j||(j=D(U),g(j.section)||(y(),g(j.section)||g(j.section,{allowOverflow:!0})),j);C.forEach(U=>{F(A>0);const N=U.cloneNode(!0);if(j.body.appendChild(N),b()&&(j.body.removeChild(N),j.body.childElementCount||(l.removeChild(j.section),j=null,m()),y(),j=null,F(A>0),j.body.appendChild(N),b())){j.section.classList.add("quote-section--table-fragment--overflow"),A+=1;return}A+=1}),j=null};if(!c.length)return;c.forEach(q=>{q.getAttribute("data-block-type")==="table"?v(q):S(q)});const k=Array.from(s.children),B=[];if(k.forEach((q,w)=>{const _=q.querySelector(".quote-body");if(w!==0&&(!_||_.childElementCount===0)){q.remove();return}B.push(q)}),!n){const q=a.defaultView||window,w=Math.min(3,Math.max(1,q.devicePixelRatio||1)),_=ka()?Math.min(2,w):w;B.forEach(P=>Hd(P,{pixelRatio:_}))}B.forEach((q,w)=>{const _=w===0;q.style.pageBreakAfter="auto",q.style.breakAfter="auto",q.style.pageBreakBefore=_?"auto":"always",q.style.breakBefore=_?"auto":"page",n?q.style.boxShadow="":q.style.boxShadow="none"});const V=B[B.length-1]||null;d=V,l=V?.querySelector(".quote-body")||null,await Nn(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function Gs(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function gu(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([Vd(),Od()]),c=e.ownerDocument||document,d=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,d,c?.documentElement?.getAttribute?.("dir")].some(q=>typeof q=="string"&&q.toLowerCase().startsWith("rtl")),p=typeof window<"u"&&window.devicePixelRatio||1,f=Ks(),m=Gi(),y=ka();let b;y?b=1.5:m?b=Math.min(1.7,Math.max(1.2,p*1.1)):f?b=Math.min(1.8,Math.max(1.25,p*1.2)):b=Math.min(2,Math.max(1.6,p*1.4));const g=y||m?.9:f?.92:.95,S=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),v={scale:b,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let k=0;const B=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let q=0;q<s.length;q+=1){const w=s[q];await Yi(w),await Nn(w);const _=w.ownerDocument||document,P=_.createElement("div");Object.assign(P.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const C=w.cloneNode(!0);C.style.width=`${Kn}px`,C.style.maxWidth=`${Kn}px`,C.style.minWidth=`${Kn}px`,C.style.height=`${Qn}px`,C.style.maxHeight=`${Qn}px`,C.style.minHeight=`${Qn}px`,C.style.position="relative",C.style.background="#ffffff",Gs(C),P.appendChild(C),_.body.appendChild(P);let j;try{await Nn(C),j=await i(C,{...v,scale:b,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch($){throw ps($,"pageCapture",{toastMessage:B}),$}finally{P.parentNode?.removeChild(P)}if(!j)continue;const A=j.width||1,F=(j.height||1)/A;let U=ds,N=U*F,X=0;if(N>Un){const $=Un/N;N=Un,U=U*$,X=Math.max(0,(ds-U)/2)}const Q=j.toDataURL("image/jpeg",g);k>0&&S.addPage(),S.addImage(Q,"JPEG",X,0,U,N,`page-${k+1}`,"FAST"),k+=1,await new Promise($=>window.requestAnimationFrame($))}}catch(q){throw fs({safariWindowRef:n,mobileWindowRef:a}),q}if(k===0)throw fs({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(m||y){const q=S.output("blob");if(y){const w=URL.createObjectURL(q);In();try{window.location.assign(w)}catch(_){gt("mobile safari blob navigation failed",_)}finally{setTimeout(()=>URL.revokeObjectURL(w),6e4)}}else{const w=URL.createObjectURL(q),_=()=>m&&n&&!n.closed?n:a&&!a.closed?a:null,P=(j,A)=>{if(In(),!j){window.location.assign(A);return}try{j.location.replace(A),j.focus?.()}catch(D){gt("direct blob navigation failed",D);try{j.document.open(),j.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${x(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${A}" title="PDF preview"></iframe></body></html>`),j.document.close()}catch(F){gt("iframe blob delivery failed",F),window.location.assign(A)}}},C=_();P(C,w),setTimeout(()=>URL.revokeObjectURL(w),6e4)}}else{In();const q=S.output("bloburl"),w=document.createElement("a");w.href=q,w.download=t,w.rel="noopener",w.style.display="none",document.body.appendChild(w),w.click(),setTimeout(()=>{URL.revokeObjectURL(q),w.remove()},2e3)}}function Wt(){if(!T||!J)return;const{previewFrame:e}=J;if(!e)return;const t=T.context||"reservation",n=io({context:t,reservation:T.reservation,customer:T.customer,project:T.project,technicians:T.technicians,totals:T.totals,totalsDisplay:T.totalsDisplay,rentalDays:T.rentalDays,currencyLabel:T.currencyLabel,sections:T.sections,fieldSelections:T.fields,quoteNumber:T.quoteNumber,quoteDate:T.quoteDateLabel,terms:T.terms,projectCrew:T.projectCrew,projectExpenses:T.projectExpenses,projectEquipment:T.projectEquipment,projectInfo:T.projectInfo,clientInfo:T.clientInfo,paymentSummary:T.paymentSummary,projectTotals:T.projectTotals});Rt("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&(Pi(r),Ni(r,s),$i(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await oo(i,{context:"preview"}),Gs(i))}catch(m){console.error("[reservations/pdf] failed to layout preview document",m)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),d=a?.querySelector(".quote-preview-pages"),l=Kn;let u=18;if(d&&a?.defaultView){const m=a.defaultView.getComputedStyle(d),y=parseFloat(m.rowGap||m.gap||`${u}`);Number.isFinite(y)&&y>=0&&(u=y)}const p=Qn,f=c.length?c.length*p+Math.max(0,(c.length-1)*u):p;if(e.dataset.baseWidth=String(l),e.dataset.baseHeight=String(f),e.style.width=`${l}px`,e.style.minWidth=`${l}px`,e.style.height=`${f}px`,e.style.minHeight=`${f}px`,J?.previewFrameWrapper&&!J?.userAdjustedZoom){const m=J.previewFrameWrapper.clientWidth-24;m>0&&m<l?rt=Math.max(m/l,.3):rt=1}lo(rt)}finally{In()}},{once:!0})}function bu(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?T.sections.add(n):T.sections.delete(n),to(T),co(),Wt())}function hu(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=T.context||"reservation",r=T.fields||(T.fields=Aa(s)),i=kd(r,n);t.checked?i.add(a):i.delete(a),to(T),Wt()}function vu(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(Us(T,n),T.sectionExpansions[n]=t.open)}function co(){if(!J?.toggles||!T)return;const{toggles:e}=J,t=T.fields||{},n=T.context||"reservation";Us(T);const a=Ia(n),s=Ri(n),r=a.map(({id:i,labelKey:c,fallback:d})=>{const l=o(c,d),u=T.sections.has(i),p=s[i]||[],f=_d(T,i),m=p.length?`<div class="quote-toggle-sublist">
          ${p.map(y=>{const b=Os(t,i,y.id),g=u?"":"disabled",S=y.labelKey?o(y.labelKey,y.fallback):y.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${y.id}" ${b?"checked":""} ${g}>
                <span>${x(S)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${i}" ${f?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${i}" ${u?"checked":""}>
            <span>${x(l)}</span>
          </label>
          ${p.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${m}
      </details>
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",bu)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",hu)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",vu)})}function qu(){if(J?.modal)return J;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
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
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),r=e.querySelector("[data-quote-terms-reset]"),i=e.querySelector("[data-quote-download]"),c=e.querySelector(".modal-header"),d=c?.querySelector(".btn-close"),l=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",c&&c.insertBefore(u,d||null);const p=document.createElement("iframe");p.className="quote-preview-frame",p.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),p.setAttribute("loading","lazy"),p.setAttribute("frameborder","0");const f=document.createElement("div");f.className="quote-preview-zoom-controls",f.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${x(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${x(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${x(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(p),n.innerHTML="";const y=document.createElement("div");y.className="quote-preview-scroll",y.appendChild(m),n.appendChild(y);const b=document.createElement("div");b.className="quote-preview-status",b.setAttribute("role","status"),b.setAttribute("aria-live","polite"),b.hidden=!0,b.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${x(Hi("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(b),u.appendChild(f),i?.addEventListener("click",async()=>{if(T){i.disabled=!0;try{await uo()}finally{i.disabled=!1}}});const g=()=>{us()||ms(e)};l.forEach(B=>{B?.addEventListener("click",g)}),d&&!l.includes(d)&&d.addEventListener("click",g),e.addEventListener("click",B=>{us()||B.target===e&&ms(e)}),J={modal:e,toggles:t,preview:n,previewScroll:y,previewFrameWrapper:m,zoomControls:f,zoomValue:f.querySelector("[data-zoom-value]"),previewFrame:p,meta:a,downloadBtn:i,statusIndicator:b,statusText:b.querySelector("[data-quote-status-text]"),statusSpinner:b.querySelector("[data-quote-status-spinner]"),statusAction:b.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const S=f.querySelector("[data-zoom-out]"),v=f.querySelector("[data-zoom-in]"),k=f.querySelector("[data-zoom-reset]");return S?.addEventListener("click",()=>Cr(-.1)),v?.addEventListener("click",()=>Cr(.1)),k?.addEventListener("click",()=>oa(1,{markManual:!0})),s&&s.addEventListener("input",Eu),r&&r.addEventListener("click",xu),oa(rt),J}function oa(e,{silent:t=!1,markManual:n=!1}={}){rt=Math.min(Math.max(e,.25),2.2),n&&J&&(J.userAdjustedZoom=!0),lo(rt),!t&&J?.zoomValue&&(J.zoomValue.textContent=`${Math.round(rt*100)}%`)}function Cr(e){oa(rt+e,{markManual:!0})}function lo(e){if(!J?.previewFrame||!J.previewFrameWrapper)return;const t=J.previewFrame,n=J.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",Ks()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function Su(){if(!J?.meta||!T)return;const{meta:e}=J;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${x(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${x(T.quoteNumber)}</strong></div>
      <div><span>${x(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${x(T.quoteDateLabel)}</strong></div>
    </div>
  `}function Ws(){if(!J?.termsInput)return;const e=(T?.terms&&T.terms.length?T.terms:Oe).join(`
`);J.termsInput.value!==e&&(J.termsInput.value=e)}function Eu(e){if(!T)return;const t=os(e?.target?.value??"");if(t.length){T.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{T.terms=[...Oe],Ws();const n=Oe.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}Wt()}function xu(e){if(e?.preventDefault?.(),!T)return;T.terms=[...Oe];const t=document.getElementById("reservation-terms");t&&(t.value=Oe.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=Oe.join(`
`)),Ws(),Wt()}async function uo(){if(!T)return;Rt("export");const t=!Ks()&&Gi(),n=ka(),a=null,s=!n&&t?window.open("","_blank"):null;(d=>{if(d)try{d.document.open(),d.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${x(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${x(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${x(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),d.document.close()}catch(l){gt("failed to prime download window",l)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await Ud(),Va("html2pdf ensured");const d=T.context||"reservation",l=io({context:d,reservation:T.reservation,customer:T.customer,project:T.project,technicians:T.technicians,totals:T.totals,totalsDisplay:T.totalsDisplay,rentalDays:T.rentalDays,currencyLabel:T.currencyLabel,sections:T.sections,fieldSelections:T.fields,quoteNumber:T.quoteNumber,quoteDate:T.quoteDateLabel,terms:T.terms,projectCrew:T.projectCrew,projectExpenses:T.projectExpenses,projectEquipment:T.projectEquipment,projectInfo:T.projectInfo,clientInfo:T.clientInfo,paymentSummary:T.paymentSummary,projectTotals:T.projectTotals});i=document.createElement("div"),i.innerHTML=l,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),Pi(i),Ni(i),$i(i),Va("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await oo(u,{context:"export"}),await Nn(u),Gs(u),Va("layout complete for export document")}catch(f){ps(f,"layoutQuoteDocument",{suppressToast:!0})}}const p=`quotation-${T.quoteNumber}.pdf`;await gu(u,{filename:p,safariWindowRef:s,mobileWindowRef:a}),T.sequenceCommitted||(Wd(T.quoteSequence),T.sequenceCommitted=!0)}catch(d){fs({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,ps(d,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),In()}}function mo(){const e=qu();e?.modal&&(wn=!1,rt=1,J&&(J.userAdjustedZoom=!1),oa(rt,{silent:!0}),co(),Su(),Ws(),Wt(),Id(e.modal))}async function wu({reservation:e,customer:t,project:n}){if(!e){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=tu(e),{totalsDisplay:s,totals:r,rentalDays:i}=nu(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:d,quoteNumber:l}=Zi("reservation"),u=new Date,p=pd();T={context:"reservation",reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(Ia("reservation").filter(f=>f.defaultSelected).map(f=>f.id)),sectionExpansions:Vs("reservation"),fields:Aa("reservation"),terms:p,quoteSequence:d,quoteNumber:l,quoteDate:u,quoteDateLabel:ao(u),sequenceCommitted:!1},no(T),mo()}async function Am({project:e}){if(!e){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=pu(e),{project:n}=t;if(!n){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=Zi("project"),r=new Date,i=[...md];T={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(Ia("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:Vs("project"),fields:Aa("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:ao(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},no(T),mo()}function Iu({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=jn(),{reservations:r=[],customers:i=[],technicians:c=[],projects:d=[]}=me(),l=Array.isArray(s)?s:c||[],u=new Map((d||[]).map(g=>[String(g.id),g])),p=document.getElementById(e);if(!p){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){p.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const f=t||Zl(),m=new Map(i.map(g=>[String(g.id),g])),y=new Map(l.map(g=>[String(g.id),g])),b=ad({reservations:r,filters:f,customersMap:m,techniciansMap:y,projectsMap:u});if(b.length===0){p.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}p.innerHTML=`<div class="reservations-grid">${sd({entries:b,customersMap:m,techniciansMap:y,projectsMap:u})}</div>`,p.querySelectorAll('[data-action="details"]').forEach(g=>{const S=Number(g.dataset.reservationIndex);Number.isNaN(S)||g.addEventListener("click",()=>{typeof n=="function"&&n(S)})}),p.querySelectorAll('button[data-action="confirm"]').forEach(g=>{const S=Number(g.dataset.reservationIndex);Number.isNaN(S)||g.addEventListener("click",v=>{v.stopPropagation(),typeof a=="function"&&a(S,v)})})}function Au(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=me(),c=s[e];if(!c)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=r.find(S=>String(S.id)===String(c.customerId)),l=c.projectId?i.find(S=>String(S.id)===String(c.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const S=jn()||[];u.innerHTML=rd(c,d,S,e,l)}const p=document.getElementById("reservationDetailsModal"),f=()=>{p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(p)?.hide()},m=document.getElementById("reservation-details-edit-btn");m&&(m.onclick=()=>{f(),typeof t=="function"&&t(e,{reservation:c,customer:d,getEditContext:a})});const y=document.getElementById("reservation-details-delete-btn");y&&(y.onclick=()=>{f(),typeof n=="function"&&n(e,{reservation:c,customer:d})});const b=u?.querySelector('[data-action="open-project"]');b&&l&&b.addEventListener("click",()=>{f();const S=l?.id!=null?String(l.id):"",v=S?`projects.html?project=${encodeURIComponent(S)}`:"projects.html";window.location.href=v});const g=document.getElementById("reservation-details-export-btn");return g&&(g.onclick=async S=>{S?.preventDefault?.(),S?.stopPropagation?.(),g.blur();try{await wu({reservation:c,customer:d,project:l})}catch(v){console.error("❌ [reservations] export to PDF failed",v),E(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(p).show(),!0}function po(){const e=()=>{Ln(),Re(),jn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let jr=!1,Tr=null;function ku(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function km(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=ku(n);if(!a&&jr&&Dt().length>0&&s===Tr)return Dt();try{const r=await Gr(n||{});return jr=!0,Tr=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return Dt()}}async function _u(e,{onAfterChange:t}={}){if(!Vt())return Cn(),!1;const a=Dt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await Lc(s),po(),t?.({type:"deleted",reservation:a}),E(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=pa(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return E(i,"error"),!1}}async function Nu(e,{onAfterChange:t}={}){const a=Dt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=kt(a);if(r)return E(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await Bc(s);return po(),t?.({type:"confirmed",reservation:i}),E(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=pa(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return E(c,"error"),!1}}function mn(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:kn(e,n),end:kn(t,a)}}function ca(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Xs(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function fo(){const{container:e,select:t,hint:n,addButton:a}=Xs();if(!t)return;const s=t.value,r=zr(),i=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,d=r.map(u=>{const p=Number.isFinite(Number(u.price))?Number(u.price):0,f=h(p.toFixed(2)),m=`${u.name} — ${f} ${i}`;return`<option value="${ca(u.id)}">${ca(m)}</option>`}).join("");t.innerHTML=`${c}${d}`;const l=r.length>0;t.disabled=!l,a&&(a.disabled=!l),e&&(e.hidden=!l,e.setAttribute("aria-hidden",l?"false":"true")),n&&(l?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),l&&s&&r.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function $u(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=Nt(),{start:r,end:i}=mn(),{reservations:c=[]}=me(),d=a!=null&&c[a]||null,l=d?.id??d?.reservationId??null,u=Si(n,{existingItems:s,start:r,end:i,ignoreReservationId:l});if(!u.success)return t||E(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const p=[...s,u.package];return $t(a,p),_t(p),We(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function Lr(){const{select:e}=Xs();if(!e)return;const t=e.value||"";$u(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function Pu(){const{addButton:e,select:t}=Xs();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{Lr()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Lr())}),t.dataset.listenerAttached="true"),fo()}function _t(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,Fr(t);return}const d=Kt(e);t.innerHTML=d.map(l=>{const u=l.items[0]||{},p=Ut(u)||l.image,f=p?`<img src="${p}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=l.items.some(_=>_?.type==="package"),y=h(String(l.count)),b=Number.isFinite(Number(l.unitPrice))?Number(l.unitPrice):0,g=Number.isFinite(Number(l.totalPrice))?Number(l.totalPrice):b*l.count,S=`${h(b.toFixed(2))} ${a}`,v=`${h(g.toFixed(2))} ${a}`,k=l.barcodes.map(_=>h(String(_||""))).filter(Boolean),B=k.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${k.map(_=>`<li>${_}</li>`).join("")}
            </ul>
          </details>`:"";let V="";if(m){const _=new Map;if(l.items.forEach(P=>{Array.isArray(P?.packageItems)&&P.packageItems.forEach(C=>{if(!C)return;const j=ne(C.barcode||C.normalizedBarcode||C.desc||Math.random()),A=_.get(j),D=Number.isFinite(Number(C.qty))?Number(C.qty):1;if(A){A.qty+=D;return}_.set(j,{desc:C.desc||C.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:D,barcode:C.barcode??C.normalizedBarcode??""})})}),_.size){const P=Array.from(_.values()).map(C=>{const j=h(String(C.qty)),A=ca(C.desc||""),D=C.barcode?` <span class="reservation-package-items__barcode">(${ca(h(String(C.barcode)))})</span>`:"";return`<li>${A}${D} × ${j}</li>`}).join("");V=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${P}
              </ul>
            </details>
          `}}const q=m?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",w=m?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${l.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${l.description||"-"}</div>
                ${m?`${V||""}${B||""}`:B}
              </div>
            </div>
          </td>
          <td>
            <div class="${q}" data-group-key="${l.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${l.key}" aria-label="${i}"${w}>−</button>
              <span class="reservation-qty-value">${y}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${l.key}" aria-label="${r}"${w}>+</button>
            </div>
          </td>
          <td>${S}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${l.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),Fr(t)}function Cu(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function _a(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=Na();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,Br();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${h(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${h(Number(s.percentage).toFixed(2))}%`:"—",d=s?.recordedAt?h(Qe(s.recordedAt)):"—",l=Cu(s?.type),u=s?.note?h(s.note):"";return`
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
  `,Br()}function ju(){if($n()){E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=bo(e);let a=ho(t);if(!Number.isFinite(a)||a<=0){E(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=Qa.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,d=o("reservations.create.summary.currency","SR");let l=null,u=null;if(n==="percent"){const f=Math.max(0,100-i);if(f<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const y=h(m.toFixed(2));E(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",y)),a=m}u=Number(a.toFixed(2)),r>0&&(l=a/100*r)}else{const f=Math.max(0,r-c);if(f<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const y=`${h(m.toFixed(2))} ${d}`;E(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",y)),a=m}l=Number(a.toFixed(2)),r>0&&(u=l/r*100)}l!=null&&(l=Number(l.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const p={type:n,value:a,amount:l,percentage:u,recordedAt:new Date().toISOString()};Ou(p),Js(Na()),_a(),We(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),E(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function Br(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if($n()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}ju()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if($n()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(Vu(s),Js(Na()),_a(),We(),E(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function Tu(e){const{index:t,items:n}=Nt(),s=Kt(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,d)=>d!==r);$t(t,i),_t(i),We()}function Lu(e){const{index:t,items:n}=Nt(),a=n.filter(s=>Bn(s)!==e);a.length!==n.length&&($t(t,a),_t(a),We())}function Bu(e){const{index:t,items:n}=Nt(),s=Kt(n).find(g=>g.key===e);if(!s||s.items.some(g=>g?.type==="package"))return;const{start:r,end:i}=mn();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=me(),d=t!=null&&c[t]||null,l=d?.id??d?.reservationId??null,u=new Set(n.map(g=>ne(g.barcode))),{equipment:p=[]}=me(),f=(p||[]).find(g=>{const S=ne(g?.barcode);return!S||u.has(S)||Bn({desc:g?.desc||g?.description||g?.name||"",price:Number(g?.price)||0})!==e||!Ns(g)?!1:!ct(S,r,i,l)});if(!f){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const m=ne(f.barcode),y=At(f);if(!y){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const b=[...n,{id:y,equipmentId:y,barcode:m,desc:f.desc||f.description||f.name||s.description||"",qty:1,price:Number.isFinite(Number(f.price))?Number(f.price):s.unitPrice,image:Ut(f)}];$t(t,b),_t(b),We()}function Fr(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){Tu(s);return}if(a==="increase-edit-group"&&s){Bu(s);return}if(a==="remove-edit-group"&&s){Lu(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||Ru(i)}}),e.dataset.groupListenerAttached="true")}function $n(){return!!document.getElementById("edit-res-project")?.value}function Fu(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{$n()&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function Du(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),d=document.getElementById("edit-res-payment-history");[n,a,s,r,i,c,d].forEach(Fu),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s&&(s.value="unpaid",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),d&&(d.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.dataset.linkedDisabled="false"))}function We(){const e=document.getElementById("edit-res-summary");if(!e)return;_a();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),Ke(a),We()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=$n();Du(c);const d=document.getElementById("edit-res-tax"),l=c?!1:d?.checked||!1,u=!c&&a?.dataset?.userSelected==="true",p=c?"unpaid":u&&a?.value||"unpaid";let f=null;!c&&l&&(Ze("edit-res-company-share"),f=rn("edit-res-company-share"),(!Number.isFinite(f)||f<=0)&&(Ze("edit-res-company-share"),f=rn("edit-res-company-share")));const{items:m=[],payments:y=[]}=Nt(),{start:b,end:g}=mn(),S=Qa({items:m,discount:r,discountType:i,applyTax:l,paidStatus:p,start:b,end:g,companySharePercent:f,paymentHistory:y});e.innerHTML=S;const v=Qa.lastResult;if(v&&a){const k=v.paymentStatus;u?Ke(a,a.value):(a.value!==k&&(a.value=k),a.dataset&&delete a.dataset.userSelected,Ke(a,k))}else a&&Ke(a,a.value)}function Ru(e){if(e==null)return;const{index:t,items:n}=Nt();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);$t(t,a),_t(a),We()}function Mu(e){const t=e?.value??"",n=ne(t);if(!n)return;const a=ya(n);if(!a){E(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=ht(a);if(s==="maintenance"||s==="retired"){E(Ot(s));return}const r=ne(n),{index:i,items:c=[]}=Nt();if(c.findIndex(g=>ne(g.barcode)===r)>-1){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:l,end:u}=mn();if(!l||!u){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:p=[]}=me(),f=i!=null&&p[i]||null,m=f?.id??f?.reservationId??null;if(ct(r,l,u,m)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const y=At(a);if(!y){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const b=[...c,{id:y,equipmentId:y,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];$t(i,b),e&&(e.value=""),_t(b),We()}function la(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=bi(t),a=ne(n?.barcode||t);if(!n||!a){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=ht(n);if(s==="maintenance"||s==="retired"){E(Ot(s));return}const{start:r,end:i}=mn();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:d=[]}=Nt();if(d.some(b=>ne(b.barcode)===a)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=me(),p=c!=null&&u[c]||null,f=p?.id??p?.reservationId??null;if(ct(a,r,i,f)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=At(n);if(!m){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const y=[...d,{id:m,equipmentId:m,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];$t(c,y),_t(y),We(),e.value=""}function yo(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),la(e))});const t=()=>{hi(e.value,"edit-res-equipment-description-options")&&la(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{We()});const e=()=>{Pu()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{fo()})}typeof window<"u"&&(window.getEditReservationDateRange=mn,window.renderEditPaymentHistory=_a);function zu(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){ss(e);return}la(e)}}function _m(){It(),yo()}function Hu(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let Pn=null,st=[],it=[],ys=null,Fe={},Ua=!1;function gs(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function bs(){return document.getElementById("edit-res-confirmed")?.value==="true"}function Nt(){return{index:Pn,items:st,payments:it}}function $t(e,t,n=it){Pn=typeof e=="number"?e:null,st=Array.isArray(t)?[...t]:[],it=Array.isArray(n)?[...n]:[]}function go(){Pn=null,st=[],Rc(),it=[]}function Na(){return[...it]}function Js(e){it=Array.isArray(e)?[...e]:[]}function Ou(e){e&&(it=[...it,e])}function Vu(e){!Number.isInteger(e)||e<0||(it=it.filter((t,n)=>n!==e))}function An(e,t=1){const n=Number.parseFloat(h(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function hs(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(h(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function Uu(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?ne(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:An(e.qty??e.quantity??e.count??1),price:hs(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function Ku(e,t=0){if(!e||typeof e!="object")return null;const n=an(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=An(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),r=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:ua(e)).map(f=>Uu(f)).filter(Boolean),i=e.total_price??e.totalPrice??e.total??null;let c=hs(e.unit_price??e.unitPrice??e.price??null,0);if((!c||c===0)&&i!=null){const f=hs(i,0);f>0&&a>0&&(c=Number((f/a).toFixed(2)))}const d=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,d,n].find(f=>f!=null&&String(f).trim()!=="")||`Package ${n}`,p=e.image??e.cover??e.thumbnail??r.find(f=>f?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:h(String(u)),name:h(String(u)),qty:a,price:c,barcode:d,packageItems:r,image:p}}function Qu(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const r=s-n;e.set(a,r>0?r:0)})}function Gu(e={},t=[]){const n=Array.isArray(t)?t.map(c=>({...c})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((c,d)=>Ku(c,d)).filter(Boolean);if(!s.length)return n;const r=new Map;s.forEach(c=>{const d=An(c.qty??c.quantity??1);if(c.barcode){const l=ne(c.barcode);if(l){const u=`package::${l}`;r.set(u,(r.get(u)??0)+d)}}(c.packageItems||[]).forEach(l=>{if(!l)return;const u=d*An(l.qty??l.quantity??1),p=l.equipmentId??null,f=l.normalizedBarcode||(l.barcode?ne(l.barcode):null);if(p!=null){const m=`equipment::${String(p)}`;r.set(m,(r.get(m)??0)+u)}if(f){const m=`barcode::${f}`;r.set(m,(r.get(m)??0)+u)}})});const i=[];return n.forEach(c=>{if(!c||typeof c!="object"){i.push(c);return}if(c.type==="package"){const g=an(c.packageId??c.package_id??c.id??"");s.some(v=>v.packageId===g)||i.push({...c});return}const d=An(c.qty??c.quantity??1),l=At(c),u=c.barcode?ne(c.barcode):null,p=[];l!=null&&p.push(`equipment::${String(l)}`),u&&p.push(`barcode::${u}`);const f=p.map(g=>r.get(g)??0).filter(g=>g>0);if(!f.length){i.push({...c});return}const m=Math.min(...f);if(m<=0){i.push({...c});return}const y=Math.min(m,d);if(Qu(r,p,y),y>=d)return;const b=d-y;i.push({...c,qty:b,quantity:b})}),[...i,...s.map(c=>({...c}))]}function Wu(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function bo(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function ho(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Xu(e,t){if(e){e.value="";return}}function vn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function vo(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),d=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,l=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:d,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:l}}function Ju(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((d,l)=>String(l.createdAt||l.start||"").localeCompare(String(d.createdAt||d.start||""))):[],c=[`<option value="">${vn(a)}</option>`];i.forEach(d=>{c.push(`<option value="${vn(d.id)}">${vn(d.title||a)}</option>`)}),r&&!i.some(d=>String(d.id)===r)&&c.push(`<option value="${vn(r)}">${vn(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function qo(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const d=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",d&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}vs("tax");const c=Fe?.updateEditReservationSummary;typeof c=="function"&&c()}function vs(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=Fe?.updateEditReservationSummary;typeof r=="function"&&r()};if(Ua){a();return}Ua=!0;const s=()=>{Ua=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(bt)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),Ze("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Ze("edit-res-company-share"):n.checked&&(n.checked=!1));s()}function Dr(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:d}=me(),u=Dt()?.[e];if(!u){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}Fe={...Fe,reservation:u,projects:d||[]},t?.(),Ju(d||[],u);const p=u.projectId&&d?.find?.($=>String($.id)===String(u.projectId))||null,{effectiveConfirmed:f,projectLinked:m}=kt(u,p),y=u.items?u.items.map($=>({...$,equipmentId:$.equipmentId??$.equipment_id??$.id,barcode:ne($?.barcode)})):[],b=Gu(u,y),S=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map($=>vo($)).filter(Boolean);$t(e,b,S);const v=o("reservations.list.unknownCustomer","غير معروف"),k=c?.find?.($=>String($.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const B=document.getElementById("edit-res-id");B&&(B.value=u.reservationId||u.id);const V=document.getElementById("edit-res-customer");V&&(V.value=k?.customerName||v);const q=typeof a=="function"?a(u.start):{date:"",time:""},w=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",q.date),n?.("edit-res-start-time",q.time),n?.("edit-res-end",w.date),n?.("edit-res-end-time",w.time);const _=document.getElementById("edit-res-notes");_&&(_.value=u.notes||"");const P=document.getElementById("edit-res-discount");if(P){const $=m?0:u.discount??0;P.value=h($)}const C=document.getElementById("edit-res-discount-type");C&&(C.value=m?"percent":u.discountType||"percent");const j=u.projectId?!1:!!u.applyTax,A=document.getElementById("edit-res-tax");A&&(A.checked=j);const D=document.getElementById("edit-res-company-share");if(D){const $=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,z=$!=null?Number.parseFloat(h(String($).replace("%","").trim())):NaN,R=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,H=R!=null?R===!0||R===1||R==="1"||String(R).toLowerCase()==="true":Number.isFinite(z)&&z>0,O=H&&Number.isFinite(z)&&z>0?z:bt,ae=j||H;D.checked=ae,D.dataset.companyShare=String(O)}gs(f,{disable:m});const F=document.getElementById("edit-res-paid"),U=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");F&&(F.value=U,F.dataset&&delete F.dataset.userSelected);const N=document.getElementById("edit-res-payment-progress-type"),X=document.getElementById("edit-res-payment-progress-value");if(N?.dataset?.userSelected&&delete N.dataset.userSelected,N&&(N.value="percent"),Xu(X),Mc((u.technicians||[]).map($=>String($))),s?.(b),typeof window<"u"){const $=window?.renderEditPaymentHistory;typeof $=="function"&&$()}qo(),r?.();const Q=document.getElementById("editReservationModal");ys=Wu(Q,i),ys?.show?.()}async function Yu({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:r,populateEquipmentDescriptionLists:i,handleReservationsMutation:c}={}){if(Pn===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const d=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),p=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",f=document.getElementById("edit-res-notes")?.value||"",m=h(document.getElementById("edit-res-discount")?.value||"0");let y=parseFloat(m)||0,b=document.getElementById("edit-res-discount-type")?.value||"percent";const g=bs(),S=document.getElementById("edit-res-paid"),v=S?.dataset?.userSelected==="true",k=v&&S?.value||"unpaid",B=document.getElementById("edit-res-payment-progress-type"),V=document.getElementById("edit-res-payment-progress-value"),q=bo(B),w=ho(V),_=document.getElementById("edit-res-project")?.value||"",P=Fc(),C=document.getElementById("edit-res-company-share"),j=document.getElementById("edit-res-tax");if(!d||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const A=typeof e=="function"?e:(W,qe)=>`${W}T${qe||"00:00"}`,D=A(d,l),F=A(u,p);if(D&&F&&new Date(D)>new Date(F)){E(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const N=Dt()?.[Pn];if(!N){E(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(st)||st.length===0&&P.length===0){E(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const X=typeof t=="function"?t:()=>!1,Q=N.id??N.reservationId;for(const W of st){if(W?.type==="package"&&Array.isArray(W.packageItems)){for(const L of W.packageItems){const se=L?.barcode??L?.normalizedBarcode??"";if(!se)continue;const pe=ht(se);if(pe==="reserved"){const de=ne(se);if(!X(de,D,F,Q))continue}if(pe!=="available"){E(Ot(pe));return}}continue}const qe=ht(W.barcode);if(qe==="reserved"){const L=ne(W.barcode);if(!X(L,D,F,Q))continue}if(qe!=="available"){E(Ot(qe));return}}for(const W of st){if(W?.type==="package"&&Array.isArray(W.packageItems)){for(const L of W.packageItems){const se=ne(L?.barcode??L?.normalizedBarcode??"");if(se&&X(se,D,F,Q)){const pe=L?.desc||L?.barcode||o("reservations.create.packages.unnamedItem","معدة بدون اسم"),de=`${o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${h(String(pe))})`;E(de);return}}continue}const qe=ne(W.barcode);if(X(qe,D,F,Q)){E(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const $=typeof n=="function"?n:()=>!1;for(const W of st){if(W?.type!=="package")continue;const qe=W.packageId??W.package_id??null;if(qe&&$(qe,D,F,Q)){const L=W.desc||W.packageName||o("reservations.create.packages.genericName","الحزمة");E(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${h(String(L))} محجوزة بالفعل في الفترة المختارة`));return}}const z=typeof a=="function"?a:()=>!1;for(const W of P)if(z(W,D,F,Q)){E(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const R=Array.isArray(Fe.projects)&&Fe.projects.length?Fe.projects:me().projects||[],H=_&&R.find(W=>String(W.id)===String(_))||null,O={...N,projectId:_?String(_):null,confirmed:g},{effectiveConfirmed:ae,projectLinked:ee,projectStatus:le}=kt(O,H);let G=!!C?.checked,oe=!!j?.checked;if(ee&&(G&&(C.checked=!1,G=!1),oe=!1),!ee&&G!==oe){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}oe&&(Ze("edit-res-company-share"),G=!!C?.checked);let Ee=G?getCompanySharePercent("edit-res-company-share"):null;G&&(!Number.isFinite(Ee)||Ee<=0)&&(Ze("edit-res-company-share"),Ee=getCompanySharePercent("edit-res-company-share"));const xe=G&&oe&&Number.isFinite(Ee)&&Ee>0,Pe=ee?!1:oe;ee&&(y=0,b="percent");const K=ws(st,y,b,Pe,P,{start:D,end:F,companySharePercent:xe?Ee:0});let Z=Na();if(Number.isFinite(w)&&w>0){const W=K;let qe=null,L=null;q==="amount"?(qe=w,W>0&&(L=w/W*100)):(L=w,W>0&&(qe=w/100*W));const se=vo({type:q,value:w,amount:qe,percentage:L,recordedAt:new Date().toISOString()});se&&(Z=[...Z,se],Js(Z)),V&&(V.value="")}const re=Is({totalAmount:K,history:Z}),ye=As({manualStatus:k,paidAmount:re.paidAmount,paidPercent:re.paidPercent,totalAmount:K});S&&!v&&(S.value=ye,S.dataset&&delete S.dataset.userSelected);let Me=N.status??"pending";ee?Me=H?.status??le??Me:["completed","cancelled"].includes(String(Me).toLowerCase())||(Me=g?"confirmed":"pending");const et=Ur({reservationCode:N.reservationCode??N.reservationId??null,customerId:N.customerId,start:D,end:F,status:Me,title:N.title??null,location:N.location??null,notes:f,projectId:_?String(_):null,totalAmount:K,discount:y,discountType:b,applyTax:Pe,paidStatus:ye,confirmed:ae,items:st.map(W=>({...W,equipmentId:W.equipmentId??W.id})),technicians:P,companySharePercent:xe?Ee:null,companyShareEnabled:xe,paidAmount:re.paidAmount,paidPercentage:re.paidPercent,paymentProgressType:re.paymentProgressType,paymentProgressValue:re.paymentProgressValue,paymentHistory:Z});try{const W=await Dc(N.id||N.reservationId,et);await Gr(),Ln(),Re(),E(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),go(),c?.({type:"updated",reservation:W}),r?.(),i?.(),ys?.hide?.()}catch(W){console.error("❌ [reservationsEdit] Failed to update reservation",W);const qe=pa(W)?W.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");E(qe,"error")}}function Nm(e={}){Fe={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=Fe,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=h(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{vs("tax")}),c.dataset.listenerAttached="true");const d=document.getElementById("edit-res-company-share");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{vs("share")}),d.dataset.listenerAttached="true");const l=document.getElementById("edit-res-payment-progress-type");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{l.dataset.userSelected="true",t?.()}),l.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const p=document.getElementById("edit-res-project");p&&!p.dataset.listenerAttached&&(p.addEventListener("change",()=>{qo();const g=Array.isArray(Fe.projects)&&Fe.projects.length?Fe.projects:me().projects||[],S=p.value&&g.find(q=>String(q.id)===String(p.value))||null,k={...Fe?.reservation??{},projectId:p.value||null,confirmed:bs()},{effectiveConfirmed:B,projectLinked:V}=kt(k,S);gs(B,{disable:V}),t?.()}),p.dataset.listenerAttached="true");const f=document.getElementById("edit-res-confirmed-btn");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{if(f.disabled)return;const g=!bs();gs(g),t?.()}),f.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{Yu(Fe).catch(g=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",g)})}),m.dataset.listenerAttached="true");const y=document.getElementById("edit-res-equipment-barcode");if(y&&!y.dataset.listenerAttached){let g=null;const S=()=>{y.value?.trim()&&(clearTimeout(g),g=null,n?.(y))};y.addEventListener("keydown",k=>{k.key==="Enter"&&(k.preventDefault(),S())});const v=()=>{if(clearTimeout(g),!y.value?.trim())return;const{start:k,end:B}=getEditReservationDateRange();!k||!B||(g=setTimeout(()=>{S()},150))};y.addEventListener("input",v),y.addEventListener("change",S),y.dataset.listenerAttached="true"}yo?.();const b=document.getElementById("editReservationModal");b&&!b.dataset.cleanupAttached&&(b.addEventListener("hidden.bs.modal",()=>{go(),t?.(),s?.([])}),b.dataset.cleanupAttached="true")}const Zu=me()||{};let Ye=(Zu.projects||[]).map(nm),Dn=!1;function $m(){return Ye}function $a(e){Ye=Array.isArray(e)?e.map(Zs):[],Ss({projects:Ye});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return Ye}async function em(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,d])=>{d==null||d===""||t.set(c,String(d))});const n=t.toString(),s=(await ot(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(Ys);return $a(i),Dn=!0,Ye}async function tm({force:e=!1,params:t=null}={}){if(!e&&Dn&&Ye.length>0)return Ye;try{return await em(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),Ye}}async function Pm(e){const t=await ot("/projects/",{method:"POST",body:e}),n=Ys(t?.data??{}),a=[...Ye,n];return $a(a),Dn=!0,n}async function Cm(e,t){const n=await ot(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=Ys(n?.data??{}),s=Ye.map(r=>String(r.id)===String(e)?a:r);return $a(s),Dn=!0,a}async function jm(e){await ot(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=Ye.filter(n=>String(n.id)!==String(e));$a(t),Dn=!0}function Tm({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:d,paymentStatus:l,equipmentEstimate:u=0,expenses:p=[],taxAmount:f=0,totalWithTax:m=0,discount:y=0,discountType:b="percent",companyShareEnabled:g=!1,companySharePercent:S=null,companyShareAmount:v=0,paidAmount:k=null,paidPercentage:B=null,paymentProgressType:V=null,paymentProgressValue:q=null,confirmed:w=!1,technicians:_=[],equipment:P=[],payments:C,paymentHistory:j}={}){const A=Array.isArray(_)?_.map(R=>Number.parseInt(String(R),10)).filter(R=>Number.isInteger(R)&&R>0):[],D=Array.isArray(P)?P.map(R=>{const H=Number.parseInt(String(R.equipmentId??R.equipment_id??R.id??0),10),O=Number.parseInt(String(R.qty??R.quantity??0),10);return!Number.isInteger(H)||H<=0?null:{equipment_id:H,quantity:Number.isInteger(O)&&O>0?O:1}}).filter(Boolean):[],F=Array.isArray(p)?p.map(R=>{const H=Number.parseFloat(R?.amount??R?.value??0)||0,O=(R?.label??R?.name??"").trim();return O?{label:O,amount:Math.round(H*100)/100}:null}).filter(Boolean):[],U=F.reduce((R,H)=>R+(H?.amount??0),0),N={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!d,payment_status:l??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(U*100)/100,tax_amount:Math.round((Number.parseFloat(f)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(m)||0)*100)/100,confirmed:!!w,technicians:A,equipment:D,expenses:F},X=Math.max(0,Number.parseFloat(y)||0);N.discount=X,N.discount_type=b==="amount"?"amount":"percent";const Q=Number.parseFloat(S),$=!!g&&Number.isFinite(Q)&&Q>0;N.company_share_enabled=$,N.company_share_percent=$?Q:0,N.company_share_amount=$?Math.max(0,Number.parseFloat(v)||0):0,Number.isFinite(Number(k))&&(N.paid_amount=Math.max(0,Number.parseFloat(k)||0)),Number.isFinite(Number(B))&&(N.paid_percentage=Math.max(0,Number.parseFloat(B)||0)),(V==="amount"||V==="percent")&&(N.payment_progress_type=V),q!=null&&q!==""&&(N.payment_progress_value=Number.parseFloat(q)||0),e&&(N.project_code=String(e).trim());const z=C!==void 0?C:j;if(z!==void 0){const R=So(z)||[];N.payments=R.map(H=>({type:H.type,amount:H.amount!=null?H.amount:null,percentage:H.percentage!=null?H.percentage:null,value:H.value!=null?H.value:null,note:H.note??null,recorded_at:H.recordedAt??null}))}return N.end_datetime||delete N.end_datetime,N.client_company||(N.client_company=null),N}function Ys(e={}){return Zs(e)}function nm(e={}){return Zs(e)}function Zs(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(m=>{if(m==null)return null;if(typeof m=="object"){const y=m.id??m.technician_id??m.technicianId;return y!=null?String(y):null}return String(m)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(m=>{const y=m?.equipment_id??m?.equipmentId??m?.id??null,b=m?.quantity??m?.qty??0,g=m?.barcode??m?.code??"",S=m?.description??m?.name??"";return{equipmentId:y!=null?String(y):null,qty:Number.parseInt(String(b),10)||0,barcode:g,description:S}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((m,y)=>({id:m?.id??`expense-${t??"x"}-${y}`,label:m?.label??"",amount:Number.parseFloat(m?.amount??0)||0})),d=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,l=e.company_share_enabled??e.companyShareEnabled,u=l!=null?l===!0||l===1||String(l).toLowerCase()==="true":d>0,p=e.payment_history??e.paymentHistory??e.payments??null,f=So(p);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?d:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(m=>typeof m=="object"?m:{id:m}),equipment:r,expenses:c,paymentHistory:f}}function Lm(e){return e instanceof Rr}function Ka(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function am(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=Ka(e.value);let s=Ka(e.amount),r=Ka(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,d=e.recordedAt??e.recorded_at??e.date??null;let l=null;if(d){const p=new Date(d);Number.isNaN(p.getTime())||(l=p.toISOString())}l||(l=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:l}}function So(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>am(t)).filter(Boolean):[]}const da="reservations-ui:ready",Bt=typeof EventTarget<"u"?new EventTarget:null;let Ft={};function sm(e){return Object.freeze({...e})}function rm(){if(!Bt)return;const e=Ft,t=typeof CustomEvent=="function"?new CustomEvent(da,{detail:e}):{type:da,detail:e};typeof Bt.dispatchEvent=="function"&&Bt.dispatchEvent(t)}function im(e={}){if(!e||typeof e!="object")return Ft;const t={...Ft};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),Ft=sm(t),rm(),Ft}function om(e){if(e)return Ft?.[e]}function Bm(e){const t=om(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const i=(s?.detail||Ft)?.[e];typeof i=="function"&&(Bt&&Bt.removeEventListener(da,a),n(i))};Bt&&Bt.addEventListener(da,a)})}function Fm(){return tm().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=me()||{};zc(e||[]),Ii()})}function er(e=null){Ii(),Eo(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function cm(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function qs(){return{populateEquipmentDescriptionLists:It,setFlatpickrValue:Hu,splitDateTime:Hr,renderEditItems:_t,updateEditReservationSummary:We,addEquipmentByDescription:zu,addEquipmentToEditingReservation:Mu,addEquipmentToEditingByDescription:la,combineDateTime:kn,hasEquipmentConflict:ct,hasTechnicianConflict:Vr,renderReservations:Eo,handleReservationsMutation:er,ensureModal:cm}}function Eo(e="reservations-list",t=null){Iu({containerId:e,filters:t,onShowDetails:xo,onConfirmReservation:Io})}function xo(e){return Au(e,{getEditContext:qs,onEdit:(t,{reservation:n})=>{Ao(t,n)},onDelete:wo})}function wo(e){return Vt()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?_u(e,{onAfterChange:er}):!1:(Cn(),!1)}function Io(e){return Nu(e,{onAfterChange:er})}function Ao(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}Dr(e,qs());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}Dr(e,qs());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}xc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Dm(){im({showReservationDetails:xo,deleteReservation:wo,confirmReservation:Io,openReservationEditor:Ao})}export{Cm as A,im as B,xo as C,Ys as D,dn as E,Ls as F,Sm as G,Em as H,$m as I,Lm as J,ki as K,xm as L,Am as M,gm as N,bm as O,qm as P,em as Q,Le as R,hm as S,vm as T,wm as U,jm as V,Pm as W,dd as X,Ni as Y,$i as Z,Im as _,tm as a,Dm as b,Nm as c,_m as d,km as e,Ii as f,qs as g,ue as h,fm as i,er as j,rd as k,Fm as l,kt as m,Ea as n,Re as o,Wc as p,Xn as q,Eo as r,ym as s,mm as t,We as u,pm as v,om as w,Bm as x,Ai as y,Tm as z};
