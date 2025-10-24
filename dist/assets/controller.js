import{n as h,d as be,f as hc,t as o,b as mt,h as E,j as Wt,o as Fn,s as ks,A as Hi,z as vc,k as Xe,B as Oi,u as qc}from"./auth.js";import{n as te,B as pt,C as Vi,E as Sc,D as $t,F as $s,A as Ue,G as Ui,H as pi,I as Tn,J as Nn,K as va,L as Ec,j as Ps,M as ft,N as Cs,O as bn,P as Ki,Q as wc,R as Ac,S as xc,T as Ic,U as Xt,V as na,W as _c,X as qa,Y as Qi,Z as Gi,x as Ls,k as Ts,l as Ns,_ as Wi,$ as kc,s as un,c as Sa,a0 as Xi,a1 as $c,a2 as Ji,a3 as Pc,y as js,f as Tt,a4 as Yi,a5 as on,a6 as fi,a7 as qe,a8 as Ne,t as Ea,a9 as Zi,aa as es,e as er,a as tr,g as Ot,ab as Cc,ac as Lc,ad as ts,ae as Tc,z as Nc,af as jc,ag as Bc,ah as Dc,b as Fc}from"./reservationsService.js";const Ua="select.form-select:not([data-no-enhance]):not([multiple])",yt=new WeakMap;let Ka=null,yi=!1,ht=null;function rm(e=document){e&&(e.querySelectorAll(Ua).forEach(t=>Jn(t)),!Ka&&e===document&&(Ka=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(Ua)&&Jn(a),a.querySelectorAll?.(Ua).forEach(s=>Jn(s)))})}),Ka.observe(document.body,{childList:!0,subtree:!0})),yi||(yi=!0,document.addEventListener("pointerdown",zc,{capture:!0})))}function Xn(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){Jn(e);return}const t=e.closest(".enhanced-select");t&&(Bs(t),aa(t),ns(t))}function Jn(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){Xn(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};yt.set(t,r),a.addEventListener("click",()=>Mc(t)),a.addEventListener("keydown",i=>Hc(i,t)),s.addEventListener("click",i=>Vc(i,t)),s.addEventListener("keydown",i=>Oc(i,t)),e.addEventListener("change",()=>{aa(t),nr(t)}),r.observer=new MutationObserver(i=>{let c=!1,l=!1;for(const d of i)d.type==="attributes"&&d.attributeName==="disabled"&&(l=!0),d.type==="childList"&&(c=!0);l&&ns(t),c&&Rc(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),Bs(t),aa(t),ns(t)}function Rc(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,Bs(t),aa(t)})))}function Bs(e){const t=yt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),nr(e)}function aa(e){const t=yt.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function nr(e){const t=yt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function ns(e){const t=yt.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function Mc(e){yt.get(e)&&(e.getAttribute("data-open")==="true"?gn(e):ar(e))}function ar(e){const t=yt.get(e);if(!t)return;ht&&ht!==e&&gn(ht,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),ht=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function gn(e,{focusTrigger:t=!0}={}){const n=yt.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),ht===e&&(ht=null))}function zc(e){if(!ht)return;const t=e.target;t instanceof Node&&(ht.contains(t)||gn(ht,{focusTrigger:!1}))}function Hc(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),ar(t)):n==="Escape"&&gn(t)}function Oc(e,t){const n=e.key,a=yt.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&sr(i,t)}else n==="Escape"&&(e.preventDefault(),gn(t))}function Vc(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&sr(n,t)}function sr(e,t){const n=yt.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),gn(t)}const hn=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let vt=null;function Ds(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function ir(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function Uc(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function Kc(e={}){const t=Uc({...e,activatedAt:Date.now()});return vt=t,ir(!0,t.mode||"create"),Ds(hn.change,{active:!0,selection:{...t}}),t}function sa(e="manual"){if(!vt)return;const t=vt;vt=null,ir(!1),Ds(hn.change,{active:!1,previous:t,reason:e})}function rr(){return!!vt}function Qc(){return vt?{...vt}:null}function Gc(e){if(!vt)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=h(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:r,description:i}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const l=c.map(u=>h(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!l.length)return!1;const d=Number.isInteger(s)&&s>0?s:l.length;t={barcodes:l,quantity:Math.min(d,l.length)},r&&(t.groupKey=r),i&&(t.description=i)}else return!1;return Ds(hn.requestAdd,{...t,selection:{...vt}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||sa("tab-changed")});const Wc=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Xc=new Set(["maintenance","reserved","retired"]);function Jc(e){const t=String(e??"").trim().toLowerCase();return t&&Wc.get(t)||"available"}function Yc(e){return e?typeof e=="object"?e:wa(e):null}function Et(e){const t=Yc(e);return t?Jc(t.status||t.state||t.statusLabel||t.status_label):"available"}function Fs(e){return!Xc.has(Et(e))}function Jt(e={}){return e.image||e.imageUrl||e.img||""}function Zc(e){if(!e)return null;const t=te(e),{equipment:n=[]}=be();return(n||[]).find(a=>te(a?.barcode)===t)||null}function wa(e){const t=te(e);if(!t)return null;const{equipment:n=[]}=be();return(n||[]).find(a=>te(a?.barcode)===t)||null}const el=be()||{};let _t=(el.equipment||[]).map(al),as=!1,kn="",Mt=null,Ut=null,Kt=null,Aa=!1,bi=!1;function tl(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function nl(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function al(e={}){return Rs({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function xa(e={}){return Rs(e)}function Rs(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=Rn(e.quantity??e.qty??0),i=Ia(e.unit_price??e.price??0),c=h(String(e.barcode??"").trim()),l=Re(e.status??e.state??e.status_label??e.statusLabel??"available"),d=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:sl(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:l,image:d,imageUrl:d,created_at:e.created_at??null,updated_at:e.updated_at??null}}function sl(e){return e!=null&&e!==""}function Rn(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function Ia(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function il(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function gi(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function rl(e,t){const n=gi(e),a=gi(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}else{if(r!==i)return r?-1:1;{const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}}const c=ia(e?.desc||e?.description||e?.name||""),l=ia(t?.desc||t?.description||t?.name||"");return c.localeCompare(l,"ar",{sensitivity:"base"})}function Ce(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Re(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function ol(e){return Re(e)}function ss(){if(!rr())return null;const e=Qc();return e?{...e}:null}function cl(e){const t=ss();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:r=null}=t,i=t?.mode||t?.source||"",c=[],l=new Set;if(n.forEach(f=>{const m=te(f?.barcode);!m||l.has(m)||(l.add(m),c.push({variant:f,barcode:m}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(i==="package-manager"||i==="equipment-packages"){const f=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:m})=>m),maxQuantity:f,reason:""}}const d=c.filter(({variant:f})=>Fs(f));if(!a||!s)return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=d.filter(({barcode:f})=>!pt(f,a,s,r));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:f})=>f),maxQuantity:u.length};let y=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(d.length>0)y=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const f=new Set(c.map(({variant:m})=>Re(m?.status)));f.has("maintenance")?y=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):f.has("reserved")?y=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):f.has("retired")&&(y=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:y,availableBarcodes:[],maxQuantity:0}}function ll(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function or(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=ss();e.hidden=!s;const r=s?.mode||s?.source||"";s?r==="package-manager"||r==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=ss(),l=c?.mode||c?.source||"";l==="package-manager"||l==="equipment-packages"?sa("package-finish-button"):(sa("return-button"),ll())}),t.dataset.listenerAttached="true")}function Je(){return _t}function Qt(e){_t=Array.isArray(e)?e.map(Rs):[],ks({equipment:_t}),nl()}function ia(e){return String(e??"").trim().toLowerCase()}function Pt(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=ia(t);return n||(n=ia(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function _a(e){const t=Pt(e);return t?Je().filter(n=>Pt(n)===t):[]}function ka(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=$a(e);if(n){const a=Ce(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${Ce(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function Ms(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function ra(){const e=Ms();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function zs(e={}){const t=Ms();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function mn(e){Aa=e;const t=Ms(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function om(e){if(!Wt()){Fn();return}if(!e)return;try{await ul()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let l=0;if(i.forEach(d=>{const u=d.القسم??d.category??"",y=d["القسم الثانوي"]??d.subcategory??"",f=d.الوصف??d.description??d.name??"",m=d.الكمية??d.quantity??0,p=d.السعر??d.price??0,g=d.الباركود??d.barcode??"",v=d.الحالة??d.status??"متاح",_=d.الصورة??d.image_url??d.image??"",q=h(String(g||"")).trim();if(!f||!q){l+=1;return}c.push(Hs({category:u,subcategory:y,description:f,quantity:m,unit_price:p,barcode:q,status:v,image_url:_}))}),!c.length){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const d=await mt("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(d?.data)?d.data.map(xa):[];if(u.length){const m=[...Je(),...u];Qt(m)}await Pa({showToastOnError:!1}),Me();const y=d?.meta?.count??u.length,f=[];y&&f.push(`${y} ✔️`),l&&f.push(`${l} ⚠️`),E(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(f.length?` (${f.join(" / ")})`:""))}catch(d){const u=vn(d,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");E(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const dl="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let wn=null;function ul(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):wn||(wn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=dl,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),wn=null,e}),wn)}function Hs({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const l=h(String(r||"")).trim(),d=ol(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:Rn(a),unit_price:Ia(s),barcode:l,status:d,image_url:c?.trim()||null}}async function ml(){if(!Wt()){Fn();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await mt("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await Pa({showToastOnError:!1}),E(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=vn(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");E(t,"error")}}function $a(e){return e.image||e.imageUrl||e.img||""}function pl(e){const t=Re(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function oa(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${Ce(a)}</td></tr>`}n&&(n.textContent="0")}function cr(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=Mt?.groupKey||Pt(e);if(!r){oa();return}const i=Je().filter(y=>Pt(y)===r).sort((y,f)=>{const m=String(y.barcode||"").trim(),p=String(f.barcode||"").trim();return!m&&!p?0:m?p?m.localeCompare(p,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){oa();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),l=o("equipment.form.labels.quantity","الكمية"),d=Je(),u=i.map(y=>{const f=y.id&&e.id?String(y.id)===String(e.id):String(y.barcode||"")===String(e.barcode||""),m=f?"equipment-variants-table__row--current":"",p=Ce(String(y.barcode||"-")),g=f?`<span class="equipment-variants-current-badge">${Ce(c)}</span>`:"",v=h(String(Number.isFinite(Number(y.qty))?Number(y.qty):0)),_=d.indexOf(y),q=Ce(o("equipment.item.actions.delete","🗑️ حذف")),A=_>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${_}">${q}</button>
          </div>`:"";return`
        <tr class="${m}">
          <td>
            ${p}
            ${g}
          </td>
          <td>${pl(y.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${Ce(l)}">${v}</span>
          </td>
          <td class="table-actions-cell">${A}</td>
        </tr>
      `}).join("");n.innerHTML=u}function fl({item:e,index:t}){const n=$a(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=Wt(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},l=Number.isFinite(Number(e.qty))?Number(e.qty):0,d=Number.isFinite(Number(e.price))?Number(e.price):0,u=l.toLocaleString("en-US"),y=d.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),f=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,m=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,p=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(l-f-m,0),g=p.toLocaleString("en-US"),v=o("equipment.card.labels.availableOfTotal","من أصل"),_=Re(e.status);let q=`${Ce(c.available)}: ${Ce(g)} ${Ce(v)} ${Ce(u)}`,A="available";if(p===0){const M={reserved:{text:l===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},W=M[_]||M.default;q=Ce(W.text),A=W.modifier}const N=`<span class="equipment-card__availability equipment-card__availability--${A}">${q}</span>`,U="",S=e.desc||e.name||"—",I=e.name&&e.name!==e.desc?e.name:"",k=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${y} ${r}`}].map(({label:M,value:W})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${M}</span>
              <span class="equipment-card__detail-value">${W}</span>
            </span>
          `).join("")}
    </div>`,H=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),$=H.length?`<div class="equipment-card__categories">${H.map(({label:M,value:W})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${M}</span>
              <span class="equipment-card__detail-value">${W}</span>
            </div>
          `).join("")}</div>`:"",j=I?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${I}</span>
      </div>`:"",C=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${S}</h3>
    </div>
  `}
      ${k}
    </div>
  `,B=[],x=cl(e),Y=x?.availableBarcodes?.length?x.availableBarcodes.join(","):x?.barcode?x.barcode:"";let K="",F="";if(x.active){const M=`equipment-select-qty-${t}`,W=!!x.canSelect,ie=W?Math.max(1,Number(x.maxQuantity||x.availableBarcodes?.length||1)):1,ne=Math.max(1,Math.min(ie,99)),ue=[];for(let se=1;se<=ne;se+=1){const Ae=h(String(se));ue.push(`<option value="${se}"${se===1?" selected":""}>${Ae}</option>`)}const O=W?"":" disabled",oe=o("reservations.create.equipment.selector.quantityLabel","الكمية"),Ee=W?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${h(String(ie))}`:x.reason?x.reason:"";K=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${M}">${oe}</label>
        <select class="equipment-card__quantity-select" id="${M}" data-equipment-select-quantity${O}>
          ${ue.join("")}
        </select>
        ${Ee?`<span class="equipment-card__selection-hint">${Ce(Ee)}</span>`:""}
      </div>
    `;const we=o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),Te=W?"":" disabled",Q=x.reason?` title="${Ce(x.reason)}"`:"",Z=['data-equipment-action="select-reservation"',`data-selection-max="${W?ie:0}"`];Y&&Z.push(`data-selection-barcodes="${Ce(Y)}"`),e.groupKey&&Z.push(`data-selection-group="${Ce(String(e.groupKey))}"`),F=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${Z.join(" ")}${Te}${Q}>${we}</button>
    `}i&&B.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const D=B.length?B.join(`
`):"",R=Ce(S);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${Ce(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${R}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${U}
        ${N}
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
        ${j}
      </div>
      ${K||F||D?`<div class="equipment-card__actions equipment-card__actions--center">
            ${K}
            ${F}
            ${D}
          </div>`:""}
    </article>
  `}function yl(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,a.appendChild(l)}),t.includes(i)&&(a.value=i),Xn(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,s.appendChild(l)}),n.includes(i)&&(s.value=i),Xn(s)}const r=document.getElementById("filter-status");r&&Xn(r)}function Mn(){const e=be();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return _t=t||[],_t;const s=new Date;let r=!1;const i=new Set((a||[]).filter(l=>l?.status==="open").map(l=>h(String(l?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(l=>{if(!l)return l;const d=Re(l.status),u=h(String(l.barcode??"")).trim().toLowerCase(),y=u&&i.has(u);let f=y?"maintenance":"available";if(!y&&u)for(const m of n||[]){if(!bl(m,s))continue;if(m.items?.some(g=>h(String(g?.barcode??"")).trim().toLowerCase()===u)){f="reserved";break}}return f!==d?(r=!0,{...l,status:f}):{...l,status:f}});return r?Qt(c):(_t=c,ks({equipment:_t})),_t}function bl(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function Qa(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Me(){const e=document.getElementById("equipment-list");if(!e)return;or();const t=Mn(),n=Array.isArray(t)?t:Je(),a=new Map;n.forEach(g=>{if(!g)return;const v=Pt(g);v&&(a.has(v)||a.set(v,[]),a.get(v).push(g))});const s=Array.from(a.values()).map(g=>{const v=g[0],_=g.reduce((I,P)=>I+(Number.isFinite(Number(P.qty))?Number(P.qty):0),0),q=["maintenance","reserved","available","retired"],A=g.map(I=>Re(I.status)).sort((I,P)=>q.indexOf(I)-q.indexOf(P))[0]||"available",N=g.reduce((I,P)=>{const k=Rn(P?.qty??0)||0,H=Re(P?.status);return H==="reserved"?I.reserved+=k:H==="maintenance"&&(I.maintenance+=k),I},{reserved:0,maintenance:0}),U=Math.max(_-N.reserved-N.maintenance,0);return{item:{...v,qty:_,status:A,variants:g,groupKey:Pt(v),reservedQty:N.reserved,maintenanceQty:N.maintenance,availableQty:U},index:n.indexOf(v)}});s.sort((g,v)=>rl(g.item,v.item));const r=document.getElementById("search-equipment")?.value||"",i=h(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",l=document.getElementById("filter-sub")?.value||"",d=document.getElementById("filter-status")?.value||"",u=d?Re(d):"";if(as&&!n.length){e.innerHTML=Qa(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(kn&&!n.length){e.innerHTML=Qa(kn,{tone:"error",icon:"⚠️"});return}const y=s.filter(({item:g})=>{const v=h(String(g.barcode??"")).toLowerCase().trim(),_=Array.isArray(g.variants)?g.variants.map(S=>h(String(S.barcode??"")).toLowerCase().trim()).filter(Boolean):[],q=!i||g.name&&g.name.toLowerCase().includes(i)||g.desc&&g.desc.toLowerCase().includes(i)||v&&v.includes(i)||_.some(S=>S.includes(i))||g.category&&g.category.toLowerCase().includes(i)||g.sub&&g.sub.toLowerCase().includes(i),A=!c||g.category===c,N=!l||g.sub===l,U=!u||Re(g.status)===u;return q&&A&&N&&U}),f=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),m=y;e.innerHTML=m.length?m.map(fl).join(""):Qa(f);const p=document.getElementById("equipment-list-count");if(p){const g=o("equipment.list.countSuffix","عنصر"),v=h(String(m.length)),_=m.length?`${v} ${g}`:`0 ${g}`;p.textContent=_}yl(n)}async function Pa({showToastOnError:e=!0}={}){as=!0,kn="",Me();try{const t=await mt("/equipment/?all=1"),n=Array.isArray(t?.data)?t.data.map(xa):[];Qt(n)}catch(t){kn=vn(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&E(kn,"error")}finally{as=!1,Me()}}function vn(e,t,n){if(e instanceof Hi){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function gl(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),r=Ia(t.querySelector("#new-equipment-price")?.value||"0"),i=Rn(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",l=t.querySelector("#new-equipment-category")?.value?.trim()||"",d=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){E(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const y=Hs({category:l,subcategory:d,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const f=await mt("/equipment/",{method:"POST",body:y}),m=xa(f?.data),p=[...Je(),m];Qt(p),Me(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),E(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(f){const m=vn(f,"equipment.toast.addFailed","تعذر إضافة المعدة");E(m,"error")}}async function lr(e){if(!Wt()){Fn();return}const t=Je(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await mt(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),Qt(a),Me(),E(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=vn(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");E(s,"error")}}async function hl(e,t){const n=Je(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},Qt(r),Me();return}const s=Hs({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await mt(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=xa(r?.data),c=[...n];c[e]=i,Qt(c),Me(),E(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=vn(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw E(i,"error"),r}}function Qn(){Me()}function dr(e){const n=Je()[e];if(!n)return;Ut=e;const a=_a(n),s=a[0]||n,r=a.reduce((l,d)=>l+(Number.isFinite(Number(d.qty))?Number(d.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(l=>Re(l.status)).sort((l,d)=>i.indexOf(l)-i.indexOf(d))[0]||Re(s.status);document.getElementById("edit-equipment-index").value=e,zs({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:$a(s)||"",barcode:s.barcode||"",status:s.status||c}),mn(!1),Kt=ra(),ka(s),cr(s),Mt={groupKey:Pt(s),barcode:String(s.barcode||""),id:s.id||null},tl(document.getElementById("editEquipmentModal"))?.show()}function vl(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),r=s?.querySelector("[data-equipment-select-quantity]");let i=Number.parseInt(r?.value||"1",10);(!Number.isFinite(i)||i<=0)&&(i=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&i>c&&(i=c);const d=(t.dataset.selectionBarcodes||"").split(",").map(m=>m.trim()).filter(m=>m.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",y=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";Gc({barcodes:d,quantity:i,groupKey:y,description:u})||E(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||lr(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||dr(s)}}function ql(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||dr(n)}}function Sl(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||lr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function ur(){if(!Mt||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=Je(),a=Mt.id?n.find(l=>String(l.id)===String(Mt.id)):null,s=Mt.groupKey,r=s?n.find(l=>Pt(l)===s):null,i=a||r;if(!i){oa();return}const c=n.findIndex(l=>l===i);if(c>=0){const l=document.getElementById("edit-equipment-index");l&&(l.value=String(c)),Ut=c}if(cr(i),!Aa){const l=_a(i),d=l[0]||i,u=l.reduce((m,p)=>m+(Number.isFinite(Number(p.qty))?Number(p.qty):0),0),y=["maintenance","reserved","available","retired"],f=l.map(m=>Re(m.status)).sort((m,p)=>y.indexOf(m)-y.indexOf(p))[0]||Re(d.status);zs({category:d.category||"",subcategory:d.sub||"",description:d.desc||d.description||"",quantity:String(u||d.qty||0),price:d.price!=null?String(d.price):"0",image:$a(d)||"",barcode:d.barcode||"",status:d.status||f}),Kt=ra()}ka(primary)}function El(){document.getElementById("search-equipment")?.addEventListener("input",Qn),document.getElementById("filter-category")?.addEventListener("change",Qn),document.getElementById("filter-sub")?.addEventListener("change",Qn),document.getElementById("filter-status")?.addEventListener("change",Qn),document.getElementById("add-equipment-form")?.addEventListener("submit",gl);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),ml().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",vl),t.addEventListener("keydown",ql),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",Sl),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);il(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!Aa){Kt=ra(),mn(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){E(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:Rn(document.getElementById("edit-equipment-quantity").value)||1,price:Ia(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await hl(t,n),Kt=ra(),mn(!1),ur()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{El(),Me(),Pa();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(Kt&&zs(Kt),Ut!=null){const a=Je()[Ut];if(a){const r=_a(a)[0]||a;ka(r)}}mn(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Me(),mn(Aa),Ut!=null){const t=Je()[Ut];if(t){const a=_a(t)[0]||t;ka(a)}}});document.addEventListener("equipment:refreshRequested",()=>{Pa({showToastOnError:!1})});document.addEventListener(hc.USER_UPDATED,()=>{Me()});document.addEventListener("equipment:changed",()=>{ur()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{Mt=null,oa(),Ut=null,Kt=null,mn(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!bi&&(document.addEventListener(hn.change,()=>{or(),Me()}),bi=!0);const wl="__DEBUG_CREW__";function Al(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(wl);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function hi(e,t){if(Al())try{console.log(`🪵 [crew-debug:create] ${e}`,t)}catch{}}const mr="projects:create:draft",pr="projects.html#projects-section";let is=null,fr=[],rs=new Map,os=new Map,ca=new Map,Ga=!1,Yn=null,vi=!1,yr=[];function xl(e){if(!e)return null;let t=yr.find(a=>a.id===e)||null;if(t)return t;const n=wc(e);return n?(t={id:e,name:xc(n)||e,price:Ac(n),items:Ps(n),raw:n},t):null}function la(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function da(e){return h(String(e||"")).trim().toLowerCase()}function Il(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function br(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function gr(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function hr(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function vr(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function Gt(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function Os(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function Yt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Ge(){const{input:e,hidden:t}=Yt();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function Ft(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function qr(e,t,{allowPartial:n=!1}={}){const a=Ue(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function cs(e,t={}){return qr(rs,e,t)}function ls(e,t={}){return qr(os,e,t)}function We(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function Sr(e){fr=Array.isArray(e)?[...e]:[]}function Vs(){return fr}function Us(e){return e&&Vs().find(t=>String(t.id)===String(e))||null}function qi(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function pn(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??$t,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:$t}function at(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??$t,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=$t),t.dataset.companyShare=String(s),t.checked=!0}function ds(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(Ga){me();return}Ga=!0;const a=()=>{Ga=!1,me()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String($t)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),at()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?at():n.checked&&(n.checked=!1));a()}function _l(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Si(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function Ei(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function qt({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=Os();if(!n||!a||!s)return;const r=$s()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const l=new Set;rs=new Map;const d=r.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:Ei(m)||c})).filter(m=>{if(!m.label)return!1;const p=Ue(m.label);return!p||l.has(p)?!1:(l.add(p),rs.set(p,m),!0)}).sort((m,p)=>m.label.localeCompare(p.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(m=>`<option value="${la(m.label)}"></option>`).join("");const u=t?"":n.value,y=e?String(e):a.value?String(a.value):"",f=y?r.find(m=>String(m.id)===y):null;if(f){const m=Ei(f)||c;a.value=String(f.id),n.value=m,n.dataset.selectedId=String(f.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function fn({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=Yt();if(!a||!s||!r)return;const i=Array.isArray(t)?t:Vs()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const l=[...i].filter(g=>g&&g.id!=null).sort((g,v)=>String(v.createdAt||v.start||"").localeCompare(String(g.createdAt||g.start||""))),d=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),y=new Set;os=new Map;const f=l.map(g=>{const v=qi(g)||u;return{id:String(g.id),label:v}}).filter(g=>{if(!g.label)return!1;const v=Ue(g.label);return!v||y.has(v)?!1:(y.add(v),os.set(v,g),!0)});r.innerHTML=f.map(g=>`<option value="${la(g.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",p=m?l.find(g=>String(g.id)===m):null;if(p){const g=qi(p)||u;s.value=String(p.id),a.value=g,a.dataset.selectedId=String(p.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function ua(e,t,n){const{date:a,time:s}=Ki(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function Er(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||fn({selectedValue:a});const r=($s()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";qt(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=Si(e,"start"),l=Si(e,"end");c&&ua("res-start","res-start-time",c),l&&ua("res-end","res-end-time",l);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),me(),Ct()}function wr({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:be(),s=Array.isArray(a)?a:[];Sr(s);const r=t!=null?String(t):n.value?String(n.value):"";fn({selectedValue:r,projectsList:s}),Ct(),me()}function Ct(){const{input:e,hidden:t}=Yt(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),l=document.getElementById("res-discount-type"),d=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),y=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(Ft(n,Ge),a&&Ft(a,Ge)),s&&Ft(s,Ge),r&&Ft(r,Ge),i&&Ft(i,Ge),c&&Ft(c,Ge),l&&Ft(l,Ge),y)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=d),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=d),s&&(s.value="unpaid",We(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=d),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=d),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=d),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=d),l&&(l.value="percent",l.disabled=!0,l.classList.add("reservation-input-disabled"),l.title=d);else{if(n){const f=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",f&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.disabled=!1,l.classList.remove("reservation-input-disabled"),l.title="")}ds("tax"),me()}function Ks(){const{input:e,hidden:t}=Yt();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?ls(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=Us(r.id);i?Er(i,{skipProjectSelectUpdate:!0}):(Ct(),me())}else t.value="",e.dataset.selectedId="",Ct(),me()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?ls(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Qs(){const{input:e,hidden:t}=Os();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?cs(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),me()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?cs(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function kl(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){$n({clearValue:!0});return}let n=null;try{const d=decodeURIComponent(t);n=JSON.parse(d)}catch(d){console.warn("⚠️ [reservations/createForm] Failed to decode project context",d)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),$n({clearValue:!1}),!n)return;n.fromProjectForm&&(Yn={draftStorageKey:n.draftStorageKey||mr,returnUrl:n.returnUrl||pr});const r=document.getElementById("res-project");if(n.projectId){r&&(fn({selectedValue:String(n.projectId)}),Ct());const d=Us(n.projectId);d?Er(d,{forceNotes:!!n.forceNotes}):me(),$n()}else{r&&fn({selectedValue:""});const d=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");Ol(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),d)}n.start&&ua("res-start","res-start-time",n.start),n.end&&ua("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=($s()||[]).find(y=>String(y.id)===String(n.customerId));u?.id!=null&&(qt({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(qt({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):qt({selectedValue:""});const l=document.getElementById("res-notes");l&&n.description&&!l.value&&(l.value=n.description),me()}function Zt(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Tn(e,n),end:Tn(t,a)}}function Ar(e){const t=da(e);if(t){const c=ca.get(t);if(c)return c}const{description:n,barcode:a}=br(e);if(a){const c=wa(a);if(c)return c}const s=Ue(n||e);if(!s)return null;let r=Xi();if(!r?.length){const c=be();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&Ji(r)}const i=r.find(c=>Ue(c?.desc||c?.description||"")===s);return i||r.find(c=>Ue(c?.desc||c?.description||"").includes(s))||null}function xr(e,t="equipment-description-options"){const n=da(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(l=>da(l.value)===n)||ca.has(n))return!0;const{description:s}=br(e);if(!s)return!1;const r=Ue(s);return r?(Xi()||[]).some(c=>Ue(c?.desc||c?.description||"")===r):!1}const $l={available:0,reserved:1,maintenance:2,retired:3};function Pl(e){return $l[e]??5}function wi(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function Cl(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${wi(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${wi(n)})`}function Lt(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=Mn(),a=be(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];Ji(r);const i=new Map;r.forEach(d=>{const u=Il(d),y=da(u);if(!y||!u)return;const f=Et(d),m=Pl(f),p=i.get(y);if(!p){i.set(y,{normalized:y,value:u,bestItem:d,bestStatus:f,bestPriority:m,statuses:new Set([f])});return}p.statuses.add(f),m<p.bestPriority&&(p.bestItem=d,p.bestStatus=f,p.bestPriority=m,p.value=u)}),ca=new Map;const l=Array.from(i.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{ca.set(d.normalized,d.bestItem);const u=Cl(d),y=la(d.value);if(u===d.value)return`<option value="${y}"></option>`;const f=la(u);return`<option value="${y}" label="${f}"></option>`}).join("");e&&(e.innerHTML=l),t&&(t.innerHTML=l)}function Ir(e,t,n={}){const{silent:a=!1}=n,s=te(e);if(!s)return{success:!1,message:null};const{start:r,end:i}=Zt();if(!r||!i){const p=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||E(p),{success:!1,message:p}}const c=ft();if(Gs(c).has(s)){const p=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||E(p),{success:!1,message:p}}const d=Cs(s,r,i);if(d.length){const p=d.map(v=>v.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${p}`);return a||E(g),{success:!1,message:g}}if(pt(s,r,i)){const p=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||E(p),{success:!1,message:p}}const u=wa(s);if(!u){const p=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||E(p),{success:!1,message:p}}const y=Et(u);if(y==="maintenance"||y==="retired"){const p=Gt(y);return a||E(p),{success:!1,message:p}}const f=Xt(u);if(!f){const p=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||E(p),{success:!1,message:p}}va({id:f,equipmentId:f,barcode:s,desc:u.desc,qty:1,price:u.price,image:Jt(u)}),t&&(t.value=""),wt(),me();const m=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||E(m),{success:!0,message:m,barcode:s}}function us(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Ar(t);if(!n){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=Zc(n.barcode),s=Et(a||n);if(s==="maintenance"||s==="retired"){E(Gt(s));return}const r=te(n.barcode);if(!r){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=Xt(n);if(!i){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Jt(n)},{start:l,end:d}=Zt();if(!l||!d){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=ft();if(Gs(u).has(r)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const f=Cs(r,l,d);if(f.length){const m=f.map(p=>p.name).join(", ");E(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`));return}if(pt(r,l,d)){E(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}va(c),wt(),me(),E(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function Ll(){Lt();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),us(e))});const t=()=>{xr(e.value,"equipment-description-options")&&us(e)};e.addEventListener("focus",()=>{if(Lt(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Ai(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function Gs(e=ft()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=te(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const r=te(s?.normalizedBarcode??s?.barcode);r&&t.add(r)})}),t}function Tl(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=Zt();if(!t||!n){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}Kc({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):E(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(hn.change,t=>{Ai(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),Ai(e,rr()))}function Nl(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,r=a.length?a:t.barcode?[t.barcode]:[];if(!r.length)return;let i=0,c=null;const l=[],d=new Set;r.forEach(y=>{const f=te(y);f&&!d.has(f)&&(d.add(f),l.push(f))});const u=Math.min(s,l.length);for(let y=0;y<u;y+=1){const f=l[y],m=Ir(f,null,{silent:!0});m.success&&(i+=1),m.message&&(c=m.message)}if(i>0){const f=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",h(String(i)));E(f)}else c&&E(c)}function _r(){Tl(),!(vi||typeof document>"u")&&(document.addEventListener(hn.requestAdd,Nl),vi=!0)}function zn(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),r=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:r}}function ms(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=zn();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const r=document.getElementById("equipment-barcode"),i=document.getElementById("equipment-description"),c=t==="package";r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),Pc(t),t==="package"&&Ca()}function Ca(){const{packageSelect:e,packageHint:t}=zn();if(!e)return;const n=Vi();yr=n,Sc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,r=n.map(c=>{const l=Number.isFinite(Number(c.price))?Number(c.price):0,d=h(l.toFixed(2)),u=`${c.name} — ${d} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${r}`,e.selectedIndex=0;const i=n.length>0;e.disabled=!i,t&&(i?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),Pr()}function jl(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:r,blockingPackages:i})=>{const c=r?.desc||h(String(r?.barcode??r?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(i)&&i.length){const l=i.map(d=>d.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${l})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function kr(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const r=Nn(e);if(!r)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const i=xl(r);if(!i)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(m=>m?.type==="package"&&Nn(m.packageId)===r))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(Ec(r,n,a,s)){const m=i.name||r;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${m} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(i.items)&&i.items.length?i.items:Ps(i.raw??{}),l=Gs(t),d=[],u=new Set;if(c.forEach(m=>{const p=te(m?.normalizedBarcode??m?.barcode);if(p){if(u.has(p)){d.push({item:m,type:"internal"});return}u.add(p),l.has(p)&&d.push({item:m,type:"external"})}}),d.length){const m=d.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>h(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:d.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",m):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",m),duplicates:d}}const y=[];return c.forEach(m=>{const p=te(m?.normalizedBarcode??m?.barcode);if(p&&pt(p,n,a,s)){const g=Cs(p,n,a,s);y.push({item:m,blockingPackages:g})}}),y.length?{success:!1,reason:"item_conflict",message:jl(i,y),conflicts:y}:{success:!0,package:{id:`package::${r}`,packageId:r,type:"package",desc:i.name||`Package ${r}`,qty:1,price:Number.isFinite(Number(i.price))?Number(i.price):0,barcode:i.code||i.raw?.package_code||`pkg-${r}`,packageItems:c.map(m=>({equipmentId:m?.equipmentId??null,barcode:m?.barcode??m?.normalizedBarcode??"",normalizedBarcode:te(m?.normalizedBarcode??m?.barcode),desc:m?.desc??"",qty:Number.isFinite(Number(m?.qty))?Number(m.qty):1,price:Number.isFinite(Number(m?.price))?Number(m.price):0})),image:c.find(m=>m?.image)?.image??null},packageInfo:i}}function $r(e,{silent:t=!1}={}){const n=Nn(e);if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=Zt(),r=ft(),i=kr(n,{existingItems:r,start:a,end:s});if(!i.success){if(!t){const l={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[i.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");E(i.message||l)}return i}return va(i.package),wt(),me(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:i.package}}function Pr(){const{packageSelect:e}=zn();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;$r(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function Bl(){const{packageAddButton:e,packageSelect:t}=zn();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}$r(n)}),e.dataset.listenerAttached="true")}function Cr(){const{modeRadios:e}=zn();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&ms(s.target.value)}),a.dataset.listenerAttached="true")}),Bl(),Pr();const t=na(),n=e.find(a=>a.value===t);n&&(n.checked=!0),ms(t)}function wt(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=ft(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),l=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=bn(n);t.innerHTML=d.map(u=>{const y=u.items[0]||{},f=Jt(y)||u.image,m=f?`<img src="${f}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',p=h(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,v=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,_=`${h(g.toFixed(2))} ${s}`,q=`${h(v.toFixed(2))} ${s}`,A=u.items.some(I=>I?.type==="package"),N=u.barcodes.map(I=>h(String(I||""))).filter(Boolean),U=N.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${N.map(I=>`<li>${I}</li>`).join("")}
            </ul>
          </details>`:"";let S="";if(A){const I=new Map;if(u.items.forEach(P=>{Array.isArray(P?.packageItems)&&P.packageItems.forEach(k=>{if(!k)return;const H=te(k.barcode||k.desc||Math.random()),$=I.get(H);if($){$.qty+=Number.isFinite(Number(k.qty))?Number(k.qty):1;return}I.set(H,{desc:k.desc||k.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(k.qty))?Number(k.qty):1,barcode:k.barcode??k.normalizedBarcode??""})})}),I.size){const P=Array.from(I.values()).map(k=>{const H=h(String(k.qty)),$=k.desc||h(String(k.barcode||"")),j=k.barcode?` <span class="reservation-package-items__barcode">(${h(String(k.barcode))})</span>`:"";return`<li>${$}${j} × ${H}</li>`}).join("");S=`
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
                ${A?`${S||""}${U||""}`:U}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${c}" ${A?"disabled":""}>−</button>
              <span class="reservation-qty-value">${p}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${i}" ${A?"disabled":""}>+</button>
            </div>
          </td>
          <td>${_}</td>
          <td>${q}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${l}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function Dl(e){const t=ft(),a=bn(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(_c(s),wt(),me())}function Fl(e){const t=ft(),n=t.filter(a=>qa(a)!==e);n.length!==t.length&&(Qi(n),wt(),me())}function Rl(e){const t=ft(),a=bn(t).find(y=>y.key===e);if(!a)return;const{start:s,end:r}=Zt();if(!s||!r){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(y=>te(y.barcode))),{equipment:c=[]}=be(),l=(c||[]).find(y=>{const f=te(y?.barcode);return!f||i.has(f)||qa({desc:y?.desc||y?.description||y?.name||"",price:Number(y?.price)||0})!==e||!Fs(y)?!1:!pt(f,s,r)});if(!l){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=te(l.barcode),u=Xt(l);if(!u){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}va({id:u,equipmentId:u,barcode:d,desc:l.desc||l.description||l.name||a.description||"",qty:1,price:Number.isFinite(Number(l.price))?Number(l.price):a.unitPrice,image:Jt(l)}),wt(),me()}function me(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),l=c?.value||"unpaid",{start:d,end:u}=Zt();i&&at();const y=pn(),f=document.getElementById("res-payment-progress-type"),m=document.getElementById("res-payment-progress-value"),p=gr(f),g=hr(m);Ui(),pi({selectedItems:ft(),discount:n,discountType:s,applyTax:i,paidStatus:l,paymentProgressType:p,paymentProgressValue:g,start:d,end:u,companySharePercent:y,paymentHistory:[]});const v=pi.lastResult;v?(vr(m,v.paymentProgressValue),c&&(c.value=v.paymentStatus,We(c,v.paymentStatus))):We(c,l)}function Ml(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=h(c.target.value),me()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",me),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(Ge()){n.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}ds("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(Ge()){a.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}ds("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(Ge()){s.value="unpaid",We(s,"unpaid"),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}We(s),me()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(Ge()){r.value="percent",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",me()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(Ge()){i.value="",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=h(c.target.value),me()}),i.dataset.listenerAttached="true"),me()}function zl(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){me();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),me()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function xi(){const{input:e,hidden:t}=Os(),{input:n,hidden:a}=Yt(),{customers:s}=be();let r=t?.value?String(t.value):"";if(!r&&e?.value){const O=cs(e.value,{allowPartial:!0});O&&(r=String(O.id),t&&(t.value=r),e.value=O.label,e.dataset.selectedId=r)}const i=s.find(O=>String(O.id)===r);if(!i){E(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let l=a?.value?String(a.value):"";if(!l&&n?.value){const O=ls(n.value,{allowPartial:!0});O&&(l=String(O.id),a&&(a.value=l),n.value=O.label,n.dataset.selectedId=l)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,y=document.getElementById("res-start-time")?.value||"00:00",f=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${d}T${y}`,p=`${u}T${f}`,g=new Date(m),v=new Date(p);if(Number.isNaN(g.getTime())||Number.isNaN(v.getTime())||g>=v){E(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const _=Ui();_.map(O=>O.technicianId).filter(Boolean);const q=ft();if(q.length===0&&_.length===0){E(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const A=document.getElementById("res-notes")?.value||"",N=parseFloat(h(document.getElementById("res-discount")?.value))||0,U=document.getElementById("res-discount-type")?.value||"percent",S=document.getElementById("res-payment-status"),I=S?.value||"unpaid",P=document.getElementById("res-payment-progress-type"),k=document.getElementById("res-payment-progress-value"),H=gr(P),$=hr(k),j=l?Us(l):null,X=_l(j);if(l&&!j){E(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const O of q){const oe=Et(O.barcode);if(oe==="maintenance"||oe==="retired"){E(Gt(oe));return}}for(const O of q){const oe=te(O.barcode);if(pt(oe,m,p)){E(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const O of _)if(O?.technicianId&&Gi(O.technicianId,m,p)){E(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const C=document.getElementById("res-tax"),B=document.getElementById("res-company-share"),x=!!l;x?(C&&(C.checked=!1,C.disabled=!0,C.classList.add("disabled"),C.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),B&&(B.checked=!1,B.disabled=!0,B.classList.add("disabled"),B.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),S&&(S.value="unpaid",S.disabled=!0,We(S,"unpaid"),S.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),P&&(P.disabled=!0,P.classList.add("disabled")),k&&(k.value="",k.disabled=!0,k.classList.add("disabled"))):(C&&(C.disabled=!1,C.classList.remove("disabled"),C.title=""),B&&(B.disabled=!1,B.classList.remove("disabled"),B.title=""),S&&(S.disabled=!1,S.title=""),P&&(P.disabled=!1,P.classList.remove("disabled")),k&&(k.disabled=!1,k.classList.remove("disabled")));const Y=x?!1:C?.checked||!1,K=!!B?.checked;if(!x&&K!==Y){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let F=K?pn():null;K&&(!Number.isFinite(F)||F<=0)&&(at(),F=pn());const D=K&&Y&&Number.isFinite(F)&&F>0;Y&&at();const R=Ls(q,N,U,Y,_,{start:m,end:p,companySharePercent:D?F:0}),M=vc(),W=Ts({totalAmount:R,progressType:H,progressValue:$,history:[]});k&&vr(k,W.paymentProgressValue);const ie=[];W.paymentProgressValue!=null&&W.paymentProgressValue>0&&ie.push({type:W.paymentProgressType||H,value:W.paymentProgressValue,amount:W.paidAmount,percentage:W.paidPercent,recordedAt:new Date().toISOString()});const ne=Ns({manualStatus:I,paidAmount:W.paidAmount,paidPercent:W.paidPercent,totalAmount:R});S&&(S.value=ne,We(S,ne));const ue=Wi({reservationCode:M,customerId:c,start:m,end:p,status:X?"confirmed":"pending",title:null,location:null,notes:A,projectId:l||null,totalAmount:R,discount:x?0:N,discountType:x?"percent":U,applyTax:Y,paidStatus:x?"unpaid":ne,confirmed:X,items:q.map(O=>({...O,equipmentId:O.equipmentId??O.id})),crewAssignments:_,companySharePercent:x||!D?null:F,companyShareEnabled:x?!1:D,paidAmount:x?0:W.paidAmount,paidPercentage:x?0:W.paidPercent,paymentProgressType:x?null:W.paymentProgressType,paymentProgressValue:x?null:W.paymentProgressValue,paymentHistory:x?[]:ie});try{hi("about to submit",{crewAssignments:_,techniciansPayload:ue?.technicians,payload:ue});const O=await kc(ue);hi("server response",{reservation:O?.id??O?.reservationId??O?.reservation_code,technicians:O?.technicians,crewAssignments:O?.crewAssignments,techniciansDetails:O?.techniciansDetails}),Mn(),Lt(),un(),Vl(),E(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof is=="function"&&is({type:"created",reservation:O}),Hl(O)}catch(O){console.error("❌ [reservations/createForm] Failed to create reservation",O);const oe=Sa(O)?O.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");E(oe,"error"),x&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),$n({clearValue:!1}))}}function Hl(e){if(!Yn)return;const{draftStorageKey:t=mr,returnUrl:n=pr}=Yn,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}Yn=null,n&&(window.location.href=n)}function $n({clearValue:e=!1}={}){const{input:t,hidden:n}=Yt();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,Ct())}function Ol(e,t=""){const{input:n,hidden:a}=Yt();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),Ct())}function Vl(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),qt({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),$n({clearValue:!1}),fn({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",We(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),$c(),Qi([]),sa("form-reset"),wt(),Ct(),me()}function Ul(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){Dl(s);return}if(a==="increase-group"&&s){Rl(s);return}if(a==="remove-group"&&s){Fl(s);return}}),e.dataset.listenerAttached="true")}function Kl(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(na()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,Ir(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||na()!=="single")return;const{start:r,end:i}=Zt();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function Ql(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await xi()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await xi()}),t.dataset.listenerAttached="true")}function cm({onAfterSubmit:e}={}){is=typeof e=="function"?e:null;const{customers:t,projects:n}=be();Ic(t||[]),qt(),Qs(),Sr(n||[]),wr({projectsList:n}),Ks(),Lt(),Ca(),Ll(),_r(),Cr(),zl(),Ml(),Ul(),Kl(),Ql(),kl(),me(),wt()}function Lr(){Lt(),Ca(),wr(),qt(),Qs(),Ks(),_r(),Cr(),wt(),me()}if(typeof document<"u"){const e=()=>{qt(),fn({projectsList:Vs()}),Qs(),Ks(),me()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{Lt()}),document.addEventListener("packages:changed",()=>{Ca(),na()==="package"&&ms("package")})}typeof window<"u"&&(window.getCompanySharePercent=pn);function Tr(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:Rt(t),endDate:Rt(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:Rt(n),endDate:Rt(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Rt(n),endDate:Rt(a)}}return e==="upcoming"?{startDate:Rt(t),endDate:""}:{startDate:"",endDate:""}}function Gl(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=h(t?.value||"").trim(),i=h(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),ma(t),ma(n),r="",i=""),!r&&!i&&c){const d=Tr(c);r=d.startDate,i=d.endDate}return{searchTerm:Ue(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function lm(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{Wl(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),ma(a),ma(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function Wl(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=Tr(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function Rt(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function ma(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function Gn(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function Xl(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function Jl(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=Xl(n);if(a!==null)return a}return null}function Ii(e,t=0){const n=Jl(e);if(n!=null)return n;const a=Gn(e.createdAt??e.created_at);if(a!=null)return a;const s=Gn(e.updatedAt??e.updated_at);if(s!=null)return s;const r=Gn(e.start);if(r!=null)return r;const i=Gn(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function Yl({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((q,A)=>({reservation:q,index:A})),i=t.searchTerm||"",c=t.searchReservationId||"",l=t.searchCustomerName||"",d=t.searchProjectId||"",u=t.startDate||"",y=t.endDate||"",f=t.status||"",m=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,p=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,v=y?new Date(`${y}T23:59:59`):null,_=r.filter(({reservation:q})=>{const A=n.get(String(q.customerId)),N=s?.get?.(String(q.projectId)),U=q.start?new Date(q.start):null,S=js(q),{effectiveConfirmed:I}=Tt(q,N);if(m!=null&&String(q.customerId)!==String(m)||p!=null&&!(Array.isArray(q.technicians)?q.technicians.map(j=>String(j)):[]).includes(String(p))||f==="confirmed"&&!I||f==="pending"&&I||f==="completed"&&!S||g&&U&&U<g||v&&U&&U>v)return!1;if(c){const $=[q.reservationId,q.id,q.reservation_id,q.reservationCode,q.reservation_code,q.code,q.reference,q.referenceNumber,q.reference_number],j=Ue($.filter(C=>C!=null&&C!=="").map(String).join(" ")).replace(/\s+/g,""),X=c.replace(/\s+/g,"");if(!j.includes(X))return!1}if(l&&!Ue(A?.customerName||"").includes(l))return!1;if(d){const $=[q.projectId,q.project_id,q.projectID,N?.id,N?.projectCode,N?.project_code],j=Ue($.filter(C=>C!=null&&C!=="").map(String).join(" ")).replace(/\s+/g,""),X=d.replace(/\s+/g,"");if(!j.includes(X))return!1}if(!i)return!0;const P=q.items?.map?.($=>`${$.barcode} ${$.desc}`).join(" ")||"",k=(q.technicians||[]).map($=>a.get(String($))?.name).filter(Boolean).join(" ");return Ue([q.reservationId,A?.customerName,q.notes,P,k,N?.title].filter(Boolean).join(" ")).includes(i)});return _.sort((q,A)=>{const N=Ii(q.reservation,q.index),U=Ii(A.reservation,A.index);return N!==U?U-N:A.index-q.index}),_}function Zl({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),l=o("reservations.list.itemsCountShort","{count} عنصر"),d=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),y=o("reservations.list.status.pending","⏳ غير مؤكد"),f=o("reservations.list.payment.paid","💳 مدفوع"),m=o("reservations.list.payment.unpaid","💳 غير مدفوع"),p=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),g=o("reservations.list.actions.confirm","✔️ تأكيد"),v=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),_=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),q={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:A,index:N})=>{const U=t.get(String(A.customerId)),S=A.projectId?a?.get?.(String(A.projectId)):null,I=js(A),P=A.paidStatus??A.paid_status??(A.paid===!0||A.paid==="paid"?"paid":"unpaid"),k=P==="paid",H=P==="partial",{effectiveConfirmed:$,projectLinked:j}=Tt(A,S),X=$?"status-confirmed":"status-pending",C=k?"status-paid":H?"status-partial":"status-unpaid";let B=`<span class="reservation-chip status-chip ${X}">${$?u:y}</span>`;const x=k?f:H?p:m;let Y=`<span class="reservation-chip status-chip ${C}">${x}</span>`,K=k?" tile-paid":H?" tile-partial":" tile-unpaid";I&&(K+=" tile-completed");let F="";I&&(B=`<span class="reservation-chip status-chip status-completed">${u}</span>`,Y=`<span class="reservation-chip status-chip status-completed">${x}</span>`,F=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const D=!j&&!$?`<button class="tile-confirm" data-reservation-index="${N}" data-action="confirm">${g}</button>`:"",R=D?`<div class="tile-actions">${D}</div>`:"",M=A.items?.length||0,W=Array.isArray(A.crewAssignments)?A.crewAssignments:[],ie=(A.technicians||[]).map(ae=>n.get(String(ae))).filter(Boolean),ne=W.length?W.map(ae=>{const G=ae.positionLabel??ae.position_name??ae.role??o("reservations.crew.positionFallback","منصب بدون اسم"),ge=ae.technicianName??n.get(String(ae.technicianId??""))?.name??null;return ge?`${h(G)} (${h(ge)})`:h(G)}):ie.map(ae=>ae.name),ue=ne.length?ne.join(d):"—",O=h(String(A.reservationId??"")),oe=A.start?h(Xe(A.start)):"-",Ee=A.end?h(Xe(A.end)):"-",we=h(String(A.cost??0)),Te=h(String(M)),Q=A.notes?h(A.notes):c,Z=l.replace("{count}",Te),se=A.applyTax?`<small>${r}</small>`:"";let Ae=v;return A.projectId&&(Ae=S?.title?h(S.title):_),`
      <div class="${D?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${K}"${F} data-reservation-index="${N}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${O}</div>
          <div class="tile-badges">
            ${B}
            ${Y}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${q.client}</span>
            <span class="tile-value">${U?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${q.project}</span>
            <span class="tile-value">${Ae}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${q.start}</span>
            <span class="tile-value tile-inline">${oe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${q.end}</span>
            <span class="tile-value tile-inline">${Ee}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${q.cost}</span>
            <span class="tile-value">${we} ${s} ${se}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${q.equipment}</span>
            <span class="tile-value">${Z}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${q.crew}</span>
            <span class="tile-value">${ne.length?ue:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${Q}</span>
          </div>
        </div>
        ${R}
      </div>
    `}).join("")}function Ve(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Wa(e){if(e==null)return"";const t=String(e).trim();return t?h(t):""}function _i(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=Tt(e,s),c=e.paid===!0||e.paid==="paid",l=js(e),d=e.items||[],{groups:u}=Yi(e),{technicians:y=[]}=be(),f=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(y)?y:[]),m=new Map;f.forEach(b=>{if(!b||b.id==null)return;const V=String(b.id),le=m.get(V)||{};m.set(V,{...le,...b})});const g=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(b=>({technicianId:b}))).map((b,V)=>{const le=b?.technicianId!=null?m.get(String(b.technicianId)):null;let ve=b.positionLabel??b.position_name??b.position_label??b.role??b.position??"";(!ve||ve.trim()==="")&&(ve=b.positionLabelAr??b.position_label_ar??b.positionLabelEn??b.position_label_en??b.position_name_ar??b.position_name_en??"");const xe=b.positionLabelAlt??b.position_label_alt??b.positionLabelEn??b.position_label_en??b.positionLabelAr??b.position_label_ar??"";let je=ve,De=xe;if(!je||je.trim()==="")try{const Oe=on?on():[];let ee=null;if(b.positionId!=null&&(ee=Oe.find(Ie=>String(Ie.id)===String(b.positionId))||null),!ee){const Ie=b.positionKey??b.position_key??b.positionName??b.position_name??b.position??"";if(Ie&&(ee=typeof fi=="function"?fi(Ie):null,!ee&&Oe.length)){const Ze=String(Ie).trim().toLowerCase();ee=Oe.find(et=>[et.name,et.labelAr,et.labelEn].filter(Boolean).map(It=>String(It).toLowerCase()).includes(Ze))||null}}ee&&(je=ee.labelAr||ee.labelEn||ee.name||"",(!De||String(De).trim()==="")&&(ee.labelAr&&ee.labelEn?De=je===ee.labelAr?ee.labelEn:ee.labelAr:De=ee.labelAr||ee.labelEn||""))}catch{}const Pe=qe(Ne(b.positionCost??b.position_cost??b.cost??b.daily_wage??b.dailyWage??le?.dailyWage??le?.wage??0)),sn=qe(Ne(b.positionClientPrice??b.position_client_price??b.client_price??b.clientPrice??b.daily_total??b.dailyTotal??b.total??le?.dailyTotal??le?.total??le?.total_wage??0));return{assignmentId:b.assignmentId??b.assignment_id??`crew-${V}`,positionId:b.positionId??b.position_id??null,positionKey:b.positionKey??b.position_key??b.positionName??b.position_name??b.position??null,positionLabel:je,positionLabelAlt:De,positionLabelAr:b.positionLabelAr??b.position_label_ar??null,positionLabelEn:b.positionLabelEn??b.position_label_en??null,positionCost:Pe,positionClientPrice:sn,technicianId:b.technicianId!=null?String(b.technicianId):le?.id!=null?String(le.id):null,technicianName:b.technicianName??b.technician_name??le?.name??null,technicianRole:b.technicianRole??le?.role??null,technicianPhone:b.technicianPhone??le?.phone??null,notes:b.notes??null}}),v=Wt(),_=Ea(e.start,e.end),q=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,A=Ne(q),N=Number.isFinite(A)?A:0,U=e.discountType??e.discount_type??e.discountMode??"percent",S=String(U).toLowerCase()==="amount"?"amount":"percent",I=r?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),P=Ne(e.cost??e.total??e.finalTotal),k=Number.isFinite(P),H=k?qe(P):0,$=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,j=$!=null?Ne($):Number.NaN;let B=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(j)&&j>0)&&Number.isFinite(j)?j:0;I&&B<=0&&(B=$t);const x=Zi({items:d,technicianIds:e.technicians||[],crewAssignments:g,discount:N,discountType:S,applyTax:I,start:e.start,end:e.end,companySharePercent:B}),Y=qe(x.equipmentTotal),K=qe(x.crewTotal);qe(x.crewCostTotal);const F=qe(x.discountAmount),D=qe(x.subtotalAfterDiscount),R=Number.isFinite(x.companySharePercent)?x.companySharePercent:0;let M=qe(x.companyShareAmount);M=R>0?qe(Math.max(0,M)):0;const W=qe(x.taxAmount),ie=qe(x.finalTotal),ne=r?ie:k?H:ie,ue=qe(x.netProfit),O=h(String(e.reservationId??e.id??"")),oe=e.start?h(Xe(e.start)):"-",Ee=e.end?h(Xe(e.end)):"-",we=h(String(g.length)),Te=h(Y.toFixed(2)),Q=h(F.toFixed(2)),Z=h(D.toFixed(2)),se=h(W.toFixed(2)),Ae=h((Number.isFinite(ne)?ne:0).toFixed(2)),ze=h(String(_)),ae=o("reservations.create.summary.currency","SR"),G=o("reservations.details.labels.discount","الخصم"),ge=o("reservations.details.labels.tax","الضريبة (15%)"),L=o("reservations.details.labels.crewTotal","إجمالي الفريق"),re=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),ye=o("reservations.details.labels.duration","عدد الأيام"),he=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),pe=o("reservations.details.labels.netProfit","💵 صافي الربح"),Qe=o("reservations.create.equipment.imageAlt","صورة"),$e={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},He=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),st=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");o("reservations.details.technicians.roleUnknown","غير محدد");const At=o("reservations.details.technicians.phoneUnknown","غير متوفر");o("reservations.details.technicians.wage","{amount} {currency} / اليوم");const Sn=o("reservations.list.status.confirmed","✅ مؤكد"),tn=o("reservations.list.status.pending","⏳ غير مؤكد"),Ra=o("reservations.list.payment.paid","💳 مدفوع"),z=o("reservations.list.payment.unpaid","💳 غير مدفوع"),ke=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),it=o("reservations.list.status.completed","📁 منتهي"),bt=o("reservations.details.labels.id","🆔 رقم الحجز"),On=o("reservations.details.section.bookingInfo","بيانات الحجز"),Vn=o("reservations.details.section.paymentSummary","ملخص الدفع"),Ma=o("reservations.details.labels.finalTotal","المجموع النهائي"),Un=o("reservations.details.section.crew","😎 الفريق الفني"),za=o("reservations.details.crew.count","{count} عضو"),nn=o("reservations.details.section.items","📦 المعدات المرتبطة"),an=o("reservations.details.items.count","{count} عنصر"),To=o("reservations.details.actions.edit","✏️ تعديل"),No=o("reservations.details.actions.delete","🗑️ حذف"),jo=o("reservations.details.labels.customer","العميل"),Bo=o("reservations.details.labels.contact","رقم التواصل"),Do=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Fo=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Ro=o("reservations.details.actions.openProject","📁 فتح المشروع"),Mo=o("reservations.details.labels.start","بداية الحجز"),zo=o("reservations.details.labels.end","نهاية الحجز"),Ho=o("reservations.details.labels.notes","ملاحظات"),Oo=o("reservations.list.noNotes","لا توجد ملاحظات"),Vo=o("reservations.details.labels.itemsCount","عدد المعدات"),Uo=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),Ko=o("reservations.paymentHistory.title","سجل الدفعات"),Qo=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Go=o("reservations.list.unknownCustomer","غير معروف"),Ha=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),ci=Ha==="partial",Wo=Ha==="paid"?Ra:ci?ke:z;function Oa(b){if(b==null)return Number.NaN;if(typeof b=="number")return Number.isFinite(b)?b:Number.NaN;const V=String(b).replace(/[^0-9.+-]/g,""),le=Number(V);return Number.isFinite(le)?le:Number.NaN}const Kn=(b={})=>{const V=String(b.type??b.kind??b.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(V)||Array.isArray(b.packageItems)&&b.packageItems.length)},Xo=(b={})=>[b.packageId,b.package_id,b.packageCode,b.package_code,b.bundleId,b.bundle_id].some(V=>V!=null&&V!==""),Jo=(b={})=>!b||typeof b!="object"?!1:!Kn(b)&&Xo(b),li=(b={})=>{const V=Kn(b),le=[{value:b.qty,key:"qty",limit:999},{value:b.quantity,key:"quantity",limit:999},{value:b.units,key:"units",limit:999},{value:b.count,key:"count",limit:50},{value:b.package_quantity,key:"package_quantity",limit:999},{value:b.packageQty,key:"packageQty",limit:999},{value:b.packageCount,key:"packageCount",limit:999}];let ve=NaN;for(const xe of le){if(xe.value==null||xe.value==="")continue;const je=typeof xe.value=="string"?xe.value.trim():String(xe.value??"");if(xe.key==="count"&&je.length>6)continue;const De=Oa(xe.value);if(!Number.isFinite(De)||De<=0)continue;const Pe=Math.round(De);if(!(Pe>xe.limit)){ve=Math.max(1,Pe);break}}return(!Number.isFinite(ve)||ve<=0)&&(ve=1),V?Math.max(1,Math.min(99,ve)):Math.max(1,Math.min(9999,ve))};let Be=(Array.isArray(d)?d:[]).reduce((b,V)=>!V||typeof V!="object"||Jo(V)?b:b+li(V),0);Be<=0&&Array.isArray(u)&&u.length&&(Be=u.reduce((b,V)=>{const le=li({...V,type:V.type});return b+le},0)),!Number.isFinite(Be)||Be<=0?Be=Array.isArray(u)&&u.length?u.length:(Array.isArray(d)?d.length:0)||1:Be>1e6&&(Be=Math.min(Be,Array.isArray(u)?u.length:Be),(!Number.isFinite(Be)||Be<=0)&&(Be=(Array.isArray(d)?d.length:0)||1)),Be=Math.max(1,Math.round(Be));const Yo=h(String(Be)),di=an.replace("{count}",Yo),Zo=za.replace("{count}",we),ec=e.notes?h(e.notes):Oo,tc=h(K.toFixed(2)),nc=h(String(R)),ac=h(M.toFixed(2)),sc=`${nc}% (${ac} ${ae})`,ic=Number.isFinite(ue)?Math.max(0,ue):0,rc=h(ic.toFixed(2)),xt=[{icon:"💼",label:Uo,value:`${Te} ${ae}`}];xt.push({icon:"😎",label:L,value:`${tc} ${ae}`}),F>0&&xt.push({icon:"💸",label:G,value:`${Q} ${ae}`}),xt.push({icon:"📊",label:re,value:`${Z} ${ae}`}),I&&W>0&&xt.push({icon:"🧾",label:ge,value:`${se} ${ae}`}),R>0&&xt.push({icon:"🏦",label:he,value:sc}),xt.push({icon:"💵",label:pe,value:`${rc} ${ae}`}),xt.push({icon:"💰",label:Ma,value:`${Ae} ${ae}`});const oc=xt.map(({icon:b,label:V,value:le})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${b} ${V}</span>
      <span class="summary-details-value">${le}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let En=[];Array.isArray(e.paymentHistory)?En=e.paymentHistory:Array.isArray(e.payment_history)&&(En=e.payment_history);const cc=Array.isArray(e.paymentLogs)?e.paymentLogs:[],ui=Array.isArray(En)&&En.length>0?En:cc,lc=ui.length?`<ul class="reservation-payment-history-list">${ui.map(b=>{const V=b?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):b?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),le=Number.isFinite(Number(b?.amount))&&Number(b.amount)>0?`${h(Number(b.amount).toFixed(2))} ${ae}`:"—",ve=Number.isFinite(Number(b?.percentage))&&Number(b.percentage)>0?`${h(Number(b.percentage).toFixed(2))}%`:"—",xe=b?.recordedAt?h(Xe(b.recordedAt)):"—",je=b?.note?`<div class="payment-history-note">${Ve(h(b.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${Ve(V)}</span>
              <span class="payment-history-entry__amount">${le}</span>
              <span class="payment-history-entry__percent">${ve}</span>
              <span class="payment-history-entry__date">${xe}</span>
            </div>
            ${je}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${Ve(Qo)}</div>`,mi=[{text:i?Sn:tn,className:i?"status-confirmed":"status-pending"},{text:Wo,className:Ha==="paid"?"status-paid":ci?"status-partial":"status-unpaid"}];l&&mi.push({text:it,className:"status-completed"});const dc=mi.map(({text:b,className:V})=>`<span class="status-chip ${V}">${b}</span>`).join(""),Dt=(b,V,le)=>`
    <div class="res-info-row">
      <span class="label">${b} ${V}</span>
      <span class="value">${le}</span>
    </div>
  `;let Va="";if(e.projectId){let b=Ve(Fo);if(s){const V=s.title||o("projects.fallback.untitled","مشروع بدون اسم");b=`${Ve(V)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${Ve(Ro)}</button>`}Va=`
      <div class="res-info-row">
        <span class="label">📁 ${Do}</span>
        <span class="value">${b}</span>
      </div>
    `}const gt=[];gt.push(Dt("👤",jo,t?.customerName||Go)),gt.push(Dt("📞",Bo,t?.phone||"—")),gt.push(Dt("🗓️",Mo,oe)),gt.push(Dt("🗓️",zo,Ee)),gt.push(Dt("📦",Vo,di)),gt.push(Dt("⏱️",ye,ze)),gt.push(Dt("📝",Ho,ec)),Va&&gt.push(Va);const uc=gt.join(""),mc=u.length?u.map(b=>{const V=b.items[0]||{},le=Jt(V)||b.image,ve=le?`<img src="${le}" alt="${Qe}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',xe=[];Array.isArray(b.packageItems)&&b.packageItems.length&&xe.push(...b.packageItems),b.items.forEach(fe=>{Array.isArray(fe?.packageItems)&&fe.packageItems.length&&xe.push(...fe.packageItems)});const je=Kn(b)||b.items.some(fe=>Kn(fe))||xe.length>0,De=(fe,{fallback:ot=1,max:de=1e3}={})=>{const Se=Oa(fe);return Number.isFinite(Se)&&Se>0?Math.min(de,Se):ot};let Pe;if(je){const fe=De(V?.qty??V?.quantity??V?.count,{fallback:NaN,max:999});Number.isFinite(fe)&&fe>0?Pe=fe:Pe=De(b.quantity??b.count??1,{fallback:1,max:999})}else Pe=De(b.quantity??b.count??V?.qty??V?.quantity??V?.count??0,{fallback:1,max:9999});const sn=h(String(Pe)),Oe=(fe,{preferPositive:ot=!1}={})=>{let de=Number.NaN;for(const Se of fe){const ct=Ne(Se);if(Number.isFinite(ct)){if(ot&&ct>0)return ct;Number.isFinite(de)||(de=ct)}}return de};let ee,Ie;if(je){const fe=[V?.price,V?.unit_price,V?.unitPrice,b.unitPrice];if(ee=Oe(fe,{preferPositive:!0}),!Number.isFinite(ee)||ee<0){const de=Ne(b.totalPrice??V?.total??V?.total_price);Number.isFinite(de)&&Pe>0&&(ee=de/Pe)}Number.isFinite(ee)||(ee=0);const ot=[V?.total,V?.total_price,b.totalPrice];if(Ie=Oe(ot),!Number.isFinite(Ie))Ie=ee*Pe;else{const de=ee*Pe;Number.isFinite(de)&&de>0&&Math.abs(Ie-de)>de*.25&&(Ie=de)}}else{const fe=[V?.price,V?.unit_price,V?.unitPrice,b.unitPrice];if(ee=Oe(fe,{preferPositive:!0}),!Number.isFinite(ee)||ee<0){const ot=Ne(b.totalPrice??V?.total??V?.total_price);Number.isFinite(ot)&&Pe>0&&(ee=ot/Pe)}Number.isFinite(ee)||(ee=0),Ie=Ne(b.totalPrice??V?.total??V?.total_price),Number.isFinite(Ie)||(Ie=ee*Pe)}ee=qe(ee),Ie=qe(Ie);const Ze=`${h(ee.toFixed(2))} ${ae}`,et=`${h(Ie.toFixed(2))} ${ae}`,It=b.barcodes.map(fe=>h(String(fe||""))).filter(Boolean),tt=It.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${It.map(fe=>`<li>${fe}</li>`).join("")}
              </ul>
            </details>`:"";let rt="";if(xe.length){const fe=new Map,ot=de=>{const Se=Oa(de?.qtyPerPackage??de?.perPackageQty??de?.quantityPerPackage);return Number.isFinite(Se)&&Se>0&&Se<=99?Math.round(Se):1};if(xe.forEach(de=>{if(!de)return;const Se=te(de.barcode||de.normalizedBarcode||de.desc||Math.random());if(!Se)return;const ct=fe.get(Se),rn=ot(de);if(ct){ct.qty=rn,ct.total=rn;return}fe.set(Se,{desc:de.desc||de.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(rn,99)),total:Math.max(1,Math.min(rn,99)),barcode:de.barcode??de.normalizedBarcode??""})}),fe.size){const de=Array.from(fe.values()).map(Se=>{const ct=h(String(Se.qty>0?Math.min(Se.qty,99):1)),rn=Ve(Se.desc||""),gc=Se.barcode?` <span class="reservation-package-items__barcode">(${Ve(h(String(Se.barcode)))})</span>`:"";return`<li>${rn}${gc} × ${ct}</li>`}).join("");rt=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${de}
                </ul>
              </details>
            `}}const bc=je?`${rt||""}${tt||""}`:tt;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${ve}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${Ve(V.desc||V.description||V.name||b.description||"-")}</div>
                  ${bc}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Ve($e.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${sn}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Ve($e.unitPrice)}">${Ze}</td>
            <td class="reservation-modal-items-table__cell" data-label="${Ve($e.total)}">${et}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${Ve($e.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${He}</td></tr>`,pc=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${$e.item}</th>
            <th>${$e.quantity}</th>
            <th>${$e.unitPrice}</th>
            <th>${$e.total}</th>
            <th>${$e.actions}</th>
          </tr>
        </thead>
        <tbody>${mc}</tbody>
      </table>
    </div>
  `,fc=g.map((b,V)=>{const le=h(String(V+1));let ve=b.positionLabel??b.position_name??b.position_label??b.position_title??b.role??b.position??null;if((!ve||ve.trim()==="")&&(ve=b.positionLabelAr??b.position_label_ar??b.position_title_ar??b.positionLabelEn??b.position_label_en??b.position_name_ar??b.position_title_en??b.position_name_en??null),!ve||ve.trim()==="")try{const Ze=typeof on=="function"?on():[],et=b.positionId?Ze.find(rt=>String(rt.id)===String(b.positionId)):null,It=!et&&b.positionKey?Ze.find(rt=>String(rt.name).toLowerCase()===String(b.positionKey).toLowerCase()):null,tt=et||It||null;tt&&(ve=tt.labelAr||tt.labelEn||tt.name||ve)}catch{}const xe=Wa(ve)||o("reservations.crew.positionFallback","منصب بدون اسم"),je=Wa(b.positionLabelAlt??b.position_label_alt??b.positionLabelEn??b.position_label_en??b.positionLabelAr??b.position_label_ar??b.position_name_en??b.position_name_ar??""),De=Wa(b.technicianName)||o("technicians.picker.noTechnicianOption","— بدون تعيين —"),Pe=b.technicianPhone||At,sn=qe(Ne(b.positionCost??b.position_cost??b.cost??b.daily_wage??b.dailyWage??b.internal_cost??0));let Oe=qe(Ne(b.positionClientPrice??b.position_client_price??b.client_price??b.customer_price??b.position_price??b.clientPrice??b.daily_total??b.dailyTotal??b.total??0));if(!Number.isFinite(Oe)||Oe<=0)try{const Ze=on?on():[],et=b.positionId?Ze.find(rt=>String(rt.id)===String(b.positionId)):null,It=!et&&b.positionKey?Ze.find(rt=>String(rt.name).toLowerCase()===String(b.positionKey).toLowerCase()):null,tt=et||It||null;tt&&Number.isFinite(Number(tt.clientPrice))&&(Oe=qe(Number(tt.clientPrice)))}catch{}const ee=`${h(Oe.toFixed(2))} ${ae}`,Ie=sn>0?`${h(sn.toFixed(2))} ${ae}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${le}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${De}</span>
            <small class="text-muted">🏷️ ${xe}${je?` — ${je}`:""}</small>
            <small class="text-muted">💼 ${ee}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${Pe}</div>
          ${Ie?`<div>💵 ${o("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${Ie}</div>`:""}
        </div>
      </div>
    `}).join(""),yc=g.length?`<div class="reservation-technicians-grid">${fc}</div>`:`<ul class="reservation-modal-technicians"><li>${st}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${bt}</span>
          <strong>${O}</strong>
        </div>
        <div class="status-chips">
          ${dc}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${On}</h6>
          ${uc}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${Vn}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${oc}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Ko}</h6>
              ${lc}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Un}</span>
          <span class="count">${Zo}</span>
        </div>
        ${yc}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${nn}</span>
          <span class="count">${di}</span>
        </div>
        ${pc}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${To}</button>
        ${v?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${No}</button>`:""}
      </div>
    </div>
  `}const dm="project",um="editProject",mm=3600*1e3,Nr=.15,pm=6,fm="projectsTab",ym="projectsSubTab",bm={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},gm={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},hm={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},ed=`@page {
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
`,td=/color\([^)]*\)/gi,jn=/(color\(|color-mix\(|oklab|oklch)/i,nd=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"],ad=typeof document<"u"?document.createElement("canvas"):null,Wn=ad?.getContext?.("2d")||null;function jr(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function ps(e,t="#000"){if(!Wn||!e)return t;try{return Wn.fillStyle="#000",Wn.fillStyle=e,Wn.fillStyle||t}catch{return t}}function sd(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&jn.test(n)){const s=ps(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function cn(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function vm(e=[]){if(!(!Array.isArray(e)||!e.length))for(let t=e.length-1;t>=0;t-=1){const{element:n,prop:a,value:s,priority:r}=e[t]||{};!n?.style||!a||(s&&s.length>0?n.style.setProperty(a,s,r||""):n.style.removeProperty(a))}}function Br(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;nd.forEach(c=>{const l=r[c];if(l&&jn.test(l)){const d=jr(c);cn(n,s,d);const u=c==="backgroundColor"?"#ffffff":r.color||"#000000",y=ps(l,u);s.style.setProperty(d,y,"important")}});const i=r.backgroundImage;if(i&&jn.test(i)){const c=ps(r.backgroundColor||"#ffffff","#ffffff");cn(n,s,"background-image"),cn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function Dr(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(c=>{const l=r[c];if(l&&jn.test(l)){const d=jr(c);cn(n,s,d);const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(d,u,"important")}});const i=r.backgroundImage;i&&jn.test(i)&&(cn(n,s,"background-image"),cn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function Fr(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(td,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const Rr="reservations.quote.sequence",ki={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},Mr="https://help.artratio.sa/guide/quote-preview",Le={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},id=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Ke=[...id],rd=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function fs(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...Ke]}function od(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=fs(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=fs(t.value);if(a.length)return a}const n=Ke.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...Ke]}const cd=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],zr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>w(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>w(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>w(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>w(h(Number(e?.price||0).toFixed(2)))}],Hr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(h(String(t+1)))},{id:"position",labelKey:"reservations.details.crew.position",fallback:"المنصب",render:e=>w(h(e?.positionLabel??e?.position_name??e?.role??o("reservations.crew.positionFallback","منصب بدون اسم")))},{id:"price",labelKey:"reservations.details.crew.clientPrice",fallback:"سعر العميل",render:e=>{const t=Number.isFinite(Number(e?.positionClientPrice))?Number(e.positionClientPrice):0;return w(`${h(t.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}}],ys={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:zr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:Hr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},Or=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(h(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>w(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>w(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>w(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Vr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>w(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>w(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>w(e?.note||"-")}],Ur=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(h(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>w(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>w(h(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>w(h(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>w(e?.displayCost||"—")}],ld=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],dd={customerInfo:ys.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:ys.payment,projectExpenses:Vr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:Or.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:Ur.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},Xa=new Map;function La(e="reservation"){if(Xa.has(e))return Xa.get(e);const t=e==="project"?ld:cd,n=e==="project"?dd:ys,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(l=>l.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return Xa.set(e,r),r}function Ta(e="reservation"){return La(e).sectionDefs}function Kr(e="reservation"){return La(e).fieldDefs}function Qr(e="reservation"){return La(e).sectionIdSet}function Gr(e="reservation"){return La(e).fieldIdMap}function Wr(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const ud="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",md="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",pd="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",Xr=ed.trim(),Jr=/^data:image\/svg\+xml/i,fd=/\.svg($|[?#])/i,_n=512,bs="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",Yr=96,Zr=25.4,gs=210,Zn=297,ea=Math.round(gs/Zr*Yr),ta=Math.round(Zn/Zr*Yr),yd=2,eo=/safari/i,bd=/(iphone|ipad|ipod)/i,$i=/(iphone|ipad|ipod)/i,gd=/(crios|fxios|edgios|opios)/i,pa="[reservations/pdf]";let J=null,T=null,dt=1,An=null,xn=null,kt=null,ln=null,Pn=!1;function Vt(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!J?.statusIndicator||!J?.statusText)return;J.statusKind=e;const r=t||Wr(e);J.statusText.textContent=r,J.statusSpinner&&(J.statusSpinner.hidden=!s),J.statusAction&&(J.statusAction.hidden=!0,J.statusAction.onclick=null,n&&typeof a=="function"&&(J.statusAction.textContent=n,J.statusAction.hidden=!1,J.statusAction.onclick=i=>{i.preventDefault(),a()})),J.statusIndicator.hidden=!1,requestAnimationFrame(()=>{J.statusIndicator.classList.add("is-visible")})}function Cn(e){!J?.statusIndicator||!J?.statusText||(J.statusKind=null,J.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{J?.statusIndicator&&(J.statusIndicator.hidden=!0,J.statusAction&&(J.statusAction.hidden=!0,J.statusAction.onclick=null),J.statusSpinner&&(J.statusSpinner.hidden=!1))},220))}function hs(){return!!window?.bootstrap?.Modal}function hd(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),kt||(kt=document.createElement("div"),kt.className="modal-backdrop fade show",kt.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(kt)),ln||(ln=t=>{t.key==="Escape"&&vs(e)},document.addEventListener("keydown",ln));try{e.focus({preventScroll:!0})}catch{}}}function vs(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),kt&&(kt.remove(),kt=null),ln&&(document.removeEventListener("keydown",ln),ln=null))}function vd(e){if(e){if(hs()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}hd(e)}}function qd(){if(Pn)return;Pn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!J?.modal?.classList.contains("show"),s=()=>{J?.modal?.classList.contains("show")&&(Vt("render"),Pn=!1,en())};Oi({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:Mr}),a&&Vt("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function Na(e="reservation"){const t={},n=Kr(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function Ws(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function Sd(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function Xs(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function Js(e="reservation"){return Object.fromEntries(Ta(e).map(({id:t})=>[t,!1]))}function Ys(e,t){return e.sectionExpansions||(e.sectionExpansions=Js(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Ed(e,t){return Ys(e,t)?.[t]!==!1}function Zs(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function wd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return bd.test(e)}function Ad(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=eo.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function to(){return wd()&&Ad()}function ja(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=$i.test(e)||$i.test(t),s=/Macintosh/i.test(e)&&n>1;return eo.test(e)&&!gd.test(e)&&(a||s)}function Ja(e,...t){try{console.log(`${pa} ${e}`,...t)}catch{}}function St(e,...t){try{console.warn(`${pa} ${e}`,...t)}catch{}}function xd(e,t,...n){try{t?console.error(`${pa} ${e}`,t,...n):console.error(`${pa} ${e}`,...n)}catch{}}function _e(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Id(e,t="لا توجد بيانات للعرض."){const n=w(o(e,t));return _e(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function fa(e,t){return Array.isArray(e)&&e.length?e:[Id(t)]}const _d=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function no(e=""){return _d.test(e)}function kd(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!no(r))return a.call(this,r,...i);let c,l=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),l=!0)}catch{}try{if(!l){const d=this.canvas;d&&d.style?.direction!=="rtl"&&(d.__artRatioOriginalDirection=d.style.direction,d.style.direction="rtl")}return a.call(this,r,...i)}finally{if(l&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!l){const d=this.canvas;d&&d.__artRatioOriginalDirection!==void 0&&(d.style.direction=d.__artRatioOriginalDirection,delete d.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function Pi(e,t=_n){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function $d(e){if(!e)return{width:_n,height:_n};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?Pi(t,0):0,s=n?Pi(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,l]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(l)&&l>0?l:0)}}return{width:a||_n,height:s||_n}}function ao(e=""){return typeof e!="string"?!1:Jr.test(e)||fd.test(e)}function Pd(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Cd(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function so(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await Cd(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),l=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=l;const d=i.getContext("2d");return d.clearRect(0,0,c,l),d.drawImage(r,0,0,c,l),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function Ld(e){if(!e)return null;if(Jr.test(e))return Pd(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Td(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!ao(t))return!1;const n=await Ld(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",bs),!1;const a=await so(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",bs),!1)}async function Nd(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=$d(e),s=await so(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||bs),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),l=e.getAttribute("height");return c&&i.setAttribute("width",c),l&&i.setAttribute("height",l),e.parentNode?.replaceChild(i,e),!!s}async function io(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{ao(s.getAttribute?.("src"))&&a.push(Td(s))}),n.forEach(s=>{a.push(Nd(s))}),a.length&&await Promise.allSettled(a)}function jd(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(F,D=0)=>{const R=parseFloat(F);return Number.isFinite(R)?R:D},i=r(s.paddingTop),c=r(s.paddingBottom),l=r(s.paddingRight),d=r(s.paddingLeft),u=r(s.borderRadius),y=r(s.fontSize,14),f=(()=>{const F=s.lineHeight;if(!F||F==="normal")return y*1.6;const D=r(F,y*1.6);return D>0?D:y*1.6})(),m=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(m<=0)return null;const p=Math.max(1,m-d-l),g=e.textContent||"",v=g.split(/\r?\n/),_=n.createElement("canvas"),q=_.getContext("2d");if(!q)return null;const A=s.fontStyle||"normal",N=s.fontVariant||"normal",U=s.fontWeight||"400",S=s.fontFamily||"sans-serif",I=s.fontStretch||"normal",P=F=>F.join(" "),k=[],H=F=>q.measureText(F).width;q.font=`${A} ${N} ${U} ${I} ${y}px ${S}`,v.forEach(F=>{const D=F.trim();if(D.length===0){k.push("");return}const R=D.split(/\s+/);let M=[];R.forEach((W,ie)=>{const ne=W.trim();if(!ne)return;const ue=P(M.concat(ne));if(H(ue)<=p||M.length===0){M.push(ne);return}k.push(P(M)),M=[ne]}),M.length&&k.push(P(M))}),k.length||k.push("");const $=i+c+k.length*f,j=Math.ceil(Math.max(1,m)*t),X=Math.ceil(Math.max(1,$)*t);_.width=j,_.height=X,_.style.width=`${Math.max(1,m)}px`,_.style.height=`${Math.max(1,$)}px`,q.scale(t,t);const C=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){q.save(),q.beginPath();const F=Math.max(1,m),D=Math.max(1,$),R=Math.min(u,F/2,D/2);q.moveTo(R,0),q.lineTo(F-R,0),q.quadraticCurveTo(F,0,F,R),q.lineTo(F,D-R),q.quadraticCurveTo(F,D,F-R,D),q.lineTo(R,D),q.quadraticCurveTo(0,D,0,D-R),q.lineTo(0,R),q.quadraticCurveTo(0,0,R,0),q.closePath(),q.clip()}if(q.fillStyle=C,q.fillRect(0,0,Math.max(1,m),Math.max(1,$)),q.font=`${A} ${N} ${U} ${I} ${y}px ${S}`,q.fillStyle=s.color||"#000000",q.textBaseline="top",q.textAlign="right","direction"in q)try{q.direction="rtl"}catch{}const B=Math.max(0,m-l);let x=i;k.forEach(F=>{const D=F.length?F:" ";q.fillText(D,B,x,p),x+=f});const Y=n.createElement("img");let K;try{K=_.toDataURL("image/png")}catch(F){return St("note canvas toDataURL failed",F),null}return Y.src=K,Y.alt=g,Y.style.width=`${Math.max(1,m)}px`,Y.style.height=`${Math.max(1,$)}px`,Y.style.display="block",Y.setAttribute("data-quote-note-image","true"),{image:Y,canvas:_,totalHeight:$,width:m}}function Bd(e,{pixelRatio:t=1}={}){if(!e||!ja())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!no(a.textContent||""))return;let s;try{s=jd(a,{pixelRatio:t})}catch(r){St("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function qs(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){xd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),l=o("reservations.quote.toast.retry","إعادة المحاولة"),d=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(Vt("export"),go()):(Vt("render"),Pn=!1,en())};if(Oi({message:i,duration:9e3,actionLabel:d?l:void 0,onAction:d?u:void 0,linkLabel:c,linkHref:Mr}),J?.modal?.classList.contains("show")&&Vt("error",{message:i,actionLabel:d?l:void 0,onAction:d?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function Ss({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){St("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){St("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function ei(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function Ci(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function Li(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function Dd(){const e=Li();return e||(xn||(xn=ei(md).catch(t=>{throw xn=null,t}).then(()=>{const t=Li();if(!t)throw xn=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),xn)}async function Fd(){const e=Ci();return e||(An||(An=ei(pd).catch(t=>{throw An=null,t}).then(()=>{const t=Ci();if(!t)throw An=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),An)}async function Rd(){if(window.html2pdf||await ei(ud),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}sd(),kd()}function w(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Md(e="reservation"){return e==="project"?"QP":"Q"}function zd(e,t="reservation"){const n=Number(e),a=Md(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function Hd(){const e=window.localStorage?.getItem?.(Rr),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function ro(e="reservation"){const n=Hd()+1;return{sequence:n,quoteNumber:zd(n,e)}}function Od(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(Rr,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function oo(e="reservation"){return ki[e]||ki.reservation}function Vd(e="reservation"){try{const t=oo(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function Ud(e,t="reservation"){try{const n=oo(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function Kd(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function Qd(e,t="reservation"){if(!e)return null;const n=Qr(t),a=Gr(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,l])=>{const d=i[c];if(d==null)return;const{ids:u,emptyExplicitly:y}=Kd(d);if(!u&&!y)return;const f=Array.isArray(u)?u.filter(m=>l.has(m)):[];(f.length>0||y)&&(r[c]=f)}),{version:1,sections:s,fields:r}}function co(e){if(!e)return;const t=e.context||"reservation",n=Qd(e,t);n&&Ud(n,t)}function lo(e){if(!e)return;const t=e.context||"reservation",n=Vd(t);if(!n)return;const a=Qr(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=Ws(e.fields||Na(t)),i=Gr(t);Object.entries(n.fields).forEach(([c,l])=>{const d=i[c];if(!d)return;const u=Array.isArray(l)?l.filter(y=>d.has(y)):[];r[c]=new Set(u)}),e.fields=r}}function uo(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function Gd(e){const t=un()||[],{technicians:n=[]}=be(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(i=>{if(!i||i.id==null)return;const c=String(i.id),l=s.get(c)||{};s.set(c,{...l,...i})}),(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(i=>({technicianId:i}))).map((i,c)=>{const l=i?.technicianId!=null?s.get(String(i.technicianId)):null;let d=i.positionLabel??i.position_name??i.position_label??i.role??i.position??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم");(!d||d.trim()==="")&&(d=i.positionLabelAr??i.position_label_ar??i.positionLabelEn??i.position_label_en??i.position_name_ar??i.position_name_en??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم"));const u=qe(Ne(i.positionCost??i.position_cost??i.cost??i.daily_wage??i.dailyWage??l?.dailyWage??l?.wage??0)),y=qe(Ne(i.positionClientPrice??i.position_client_price??i.client_price??i.clientPrice??i.daily_total??i.dailyTotal??i.total??l?.dailyTotal??l?.total??l?.total_wage??0));return{assignmentId:i.assignmentId??i.assignment_id??`crew-${c}`,positionId:i.positionId??i.position_id??null,positionLabel:d,positionLabelAlt:i.positionLabelAlt??i.position_label_alt??"",positionCost:u,positionClientPrice:y,technicianId:i.technicianId!=null?String(i.technicianId):l?.id!=null?String(l.id):null,technicianName:i.technicianName??i.technician_name??l?.name??null,technicianRole:i.technicianRole??l?.role??null}})}function Wd(e,t,n){const{projectLinked:a}=Tt(e,n);Ea(e.start,e.end);const s=e.discount??e.discountValue??0,r=Number(h(String(s)))||0,i=e.discountType??e.discount_type??"percent",c=String(i).toLowerCase()==="amount"?"amount":"percent",l=a?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),d=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,u=d!=null?Ne(d):Number.NaN,f=(e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied)===!0&&Number.isFinite(u)&&u>0?u:null,m=Array.isArray(t)?t.map(N=>N?.technicianId).filter(Boolean):[],p=Zi({items:Array.isArray(e.items)?e.items:[],technicianIds:m,crewAssignments:Array.isArray(t)?t:[],discount:r,discountType:c,applyTax:l,start:e.start,end:e.end,companySharePercent:f}),g=Ne(e.cost??e.total??e.finalTotal),v=Number.isFinite(g),_=a?p.finalTotal:v?qe(g):p.finalTotal,q={equipmentTotal:p.equipmentTotal,crewTotal:p.crewTotal,crewCostTotal:p.crewCostTotal,discountAmount:p.discountAmount,subtotalAfterDiscount:p.subtotalAfterDiscount,taxableAmount:p.taxableAmount,taxAmount:p.taxAmount,finalTotal:_,companySharePercent:p.companySharePercent,companyShareAmount:p.companyShareAmount,netProfit:p.netProfit},A={equipmentTotal:h(p.equipmentTotal.toFixed(2)),crewTotal:h(p.crewTotal.toFixed(2)),discountAmount:h(p.discountAmount.toFixed(2)),subtotalAfterDiscount:h(p.subtotalAfterDiscount.toFixed(2)),taxableAmount:h(p.taxableAmount.toFixed(2)),taxAmount:h(p.taxAmount.toFixed(2)),finalTotal:h(_.toFixed(2)),companySharePercent:h((Number.isFinite(p.companySharePercent)?p.companySharePercent:0).toFixed(2)),companyShareAmount:h(p.companyShareAmount.toFixed(2)),netProfit:h(p.netProfit.toFixed(2))};return{totals:q,totalsDisplay:A,rentalDays:p.rentalDays}}function yn(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function mo(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Xd(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=yn(e.amount??(n==="amount"?e.value:null)),s=yn(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=mo(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function Jd(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(Xd).filter(Boolean);if(n.length>0)return n;const a=yn(e.paidPercent??e.paid_percent),s=yn(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=mo(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function Yd(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function Zd(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function eu(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function tu(e){const t=Number(e?.equipmentEstimate)||0,n=eu(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const l=Math.max(0,a-c),d=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,y=d&&s&&u>0?u:0,f=y>0?Number((l*(y/100)).toFixed(2)):0,m=l+f;let p=s?m*Nr:0;(!Number.isFinite(p)||p<0)&&(p=0),p=Number(p.toFixed(2));let g=s?Number(e?.totalWithTax):m;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((m+p).toFixed(2))):g=m,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:l,companyShareAmount:f,subtotal:m,applyTax:s,taxAmount:p,totalWithTax:g}}function nu(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=r.length?r:Array.isArray(e.technicians)?e.technicians:[],c=Ls(t,a,s,!1,i,{start:e.start,end:e.end});if(Number.isFinite(c))return c;const l=Number(h(String(e.cost??0)));return Number.isFinite(l)?Math.round(l):0}function au(e,t){if(!e)return"—";const n=Xe(e);return t?`${n} - ${Xe(t)}`:n}function ce(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${h(a.toFixed(s))} ${t}`}function Ti(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function su(e){if(!e?.start)return null;if(!e?.end)return 1;const t=Ea(e.start,e.end);return Number.isFinite(t)?t:1}function iu(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function ru(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=be(),i=e?.id!=null?s.find(L=>String(L.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:ce(0,t),expensesTotal:ce(0,t),reservationsTotal:ce(0,t),discountAmount:ce(0,t),taxAmount:ce(0,t),overallTotal:ce(0,t),paidAmount:ce(0,t),remainingAmount:ce(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:ce(0,t),remainingAmountDisplay:ce(0,t),paidPercentDisplay:Ti(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const l=i.clientId??i.customerId??i.client_id??i.customer_id??null,d=l!=null&&n.find(L=>String(L.id)===String(l))||null,u=d?.customerName??d?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),y=(i.clientCompany||d?.companyName||d?.company||"").trim(),f=d?.phone??d?.customerPhone??i.clientPhone??i.customerPhone??"",m=f?h(String(f).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),p=d?.email??i.clientEmail??i.customerEmail??"",g=p?String(p).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),v=i.projectCode||`PRJ-${h(String(i.id??""))}`,_=h(String(v)),q=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),A=Yd(i.type),N=i.start?Xe(i.start):"—",U=i.end?Xe(i.end):"—",S=su(i),I=S!=null?iu(S):"غير محدد",P=Zd(i),k={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},H=o(`projects.status.${P}`,k[P]||P),$=i.id!=null?String(i.id):null,j=$?a.filter(L=>String(L.projectId)===$):[],C=j.map(L=>{const re=L.reservationId||L.id||"",ye=L.status||L.state||"pending",he=String(ye).toLowerCase(),pe=o(`reservations.status.${he}`,he),Qe=nu(L),$e=L.start?new Date(L.start).getTime():0;return{reservationId:h(String(re||"-")),status:he,statusLabel:pe,total:Qe,totalLabel:ce(Qe,t),dateRange:au(L.start,L.end),startTimestamp:Number.isNaN($e)?0:$e}}).sort((L,re)=>re.startTimestamp-L.startTimestamp).map(({startTimestamp:L,...re})=>re).reduce((L,re)=>L+(Number(re.total)||0),0),B=new Map;j.forEach(L=>{const re=Array.isArray(L.items)?L.items:[],ye=Ea(L.start,L.end),he=L.reservationId||L.id||"";re.forEach((pe,Qe)=>{if(!pe)return;const $e=pe.barcode||pe.code||pe.id||pe.desc||pe.description||`item-${Qe}`,He=String($e||`item-${Qe}`),st=B.get(He)||{description:pe.desc||pe.description||pe.name||pe.barcode||`#${h(String(Qe+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},At=Number(pe.qty)||1,Sn=Number(pe.price)||0;st.totalQuantity+=At,st.reservationIds.add(String(he));const tn=Sn*At*Math.max(1,ye);Number.isFinite(tn)&&(st.totalCost+=tn),B.set(He,st)})});const x=Array.from(B.values()).map(L=>({description:L.description,totalQuantity:L.totalQuantity,reservationsCount:L.reservationIds.size,displayCost:ce(L.totalCost,t)})),Y=new Map((r||[]).filter(Boolean).map(L=>[String(L.id),L])),K=new Map,F=L=>{if(!L)return;let re=null;typeof L=="object"?re=L.id??L.technicianId??L.technician_id??L.userId??L.user_id??null:(typeof L=="string"||typeof L=="number")&&(re=L);const ye=re!=null?String(re):null,he=ye&&Y.has(ye)?Y.get(ye):typeof L=="object"?L:null,pe=he?.name||he?.full_name||he?.fullName||he?.displayName||(typeof L=="string"?L:null),Qe=he?.role||he?.title||null,$e=he?.phone||he?.mobile||he?.contact||null;if(!pe&&!ye)return;const He=ye||pe;K.has(He)||K.set(He,{id:ye,name:pe||"-",role:Qe||null,phone:$e||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(L=>F(L)),j.forEach(L=>{(Array.isArray(L.crewAssignments)&&L.crewAssignments.length?L.crewAssignments:Array.isArray(L.technicians)?L.technicians.map(ye=>({technicianId:ye})):[]).forEach(ye=>F(ye))});const D=Array.from(K.values()),R=Array.isArray(i.expenses)?i.expenses.map(L=>{const re=Number(L?.amount)||0;return{label:L?.label||L?.name||"-",amount:re,displayAmount:ce(re,t),note:L?.note||L?.description||""}}):[],M=tu(i),W=M.applyTax?Number(((M.subtotal+C)*Nr).toFixed(2)):0,ie=Number((M.subtotal+C+W).toFixed(2)),ne=Jd(i),ue=yn(i.paidAmount??i.paid_amount)||0,O=yn(i.paidPercent??i.paid_percent)||0,oe=Ts({totalAmount:ie,paidAmount:ue,paidPercent:O,history:ne}),Ee=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",we=Ns({manualStatus:Ee,paidAmount:oe.paidAmount,paidPercent:oe.paidPercent,totalAmount:ie}),Te={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},Q=o(`projects.paymentStatus.${we}`,Te[we]||we),Z=Number(oe.paidAmount||0),se=Number(oe.paidPercent||0),Ae=Math.max(0,Number((ie-Z).toFixed(2))),ze={projectSubtotal:ce(M.subtotal,t),expensesTotal:ce(M.expensesTotal,t),reservationsTotal:ce(C,t),discountAmount:ce(M.discountAmount,t),taxAmount:ce(W,t),overallTotal:ce(ie,t),paidAmount:ce(Z,t),remainingAmount:ce(Ae,t)},ae={status:we,statusLabel:Q,paidAmount:Z,paidPercent:se,remainingAmount:Ae,paidAmountDisplay:ce(Z,t),remainingAmountDisplay:ce(Ae,t),paidPercentDisplay:Ti(se)},G=(i.description||"").trim();return{project:i,customer:d,clientInfo:{name:u,company:y||"—",phone:m,email:g},projectInfo:{title:q,code:_,typeLabel:A,startDisplay:N,endDisplay:U,durationLabel:I,statusLabel:H},expenses:R,equipment:x,crew:D,totals:M,totalsDisplay:ze,projectTotals:{combinedTaxAmount:W,overallTotal:ie,reservationsTotal:C,paidAmount:Z,paidPercent:se,remainingAmount:Ae,paymentStatus:we},paymentSummary:ae,notes:G,currencyLabel:t,projectStatus:P,projectStatusLabel:H,projectDurationDays:S,projectDurationLabel:I,paymentHistory:ne}}function ou({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:l={},currencyLabel:d="SR",sections:u,fieldSelections:y={},quoteNumber:f,quoteDate:m,terms:p=Ke}){const g=Ws(y),v=(Q,Z)=>Xs(g,Q,Z),_=Q=>u?.has?.(Q),q=`<div class="quote-placeholder">${w(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,A=(Q,Z)=>`<div class="info-plain__item">
      <span class="info-plain__label">${w(Q)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${w(Z)}</span>
    </div>`,N=(Q,Z,{variant:se="inline"}={})=>se==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${w(Q)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${w(Z)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${w(Q)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${w(Z)}</span>
    </span>`,U=(Q,Z)=>`<div class="payment-row">
      <span class="payment-row__label">${w(Q)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${w(Z)}</span>
    </div>`,S=[];v("customerInfo","customerName")&&S.push(A(o("projects.details.client","العميل"),t.name||"-")),v("customerInfo","customerCompany")&&S.push(A(o("projects.details.company","شركة العميل"),t.company||"—")),v("customerInfo","customerPhone")&&S.push(A(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),v("customerInfo","customerEmail")&&S.push(A(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const I=_("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${w(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${S.length?`<div class="info-plain">${S.join("")}</div>`:q}
      </section>`:"",P=[];v("projectInfo","projectType")&&P.push(A(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),v("projectInfo","projectTitle")&&P.push(A(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),v("projectInfo","projectCode")&&P.push(A(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),v("projectInfo","projectStart")&&P.push(A(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),v("projectInfo","projectEnd")&&P.push(A(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),v("projectInfo","projectDuration")&&P.push(A(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),v("projectInfo","projectStatus")&&P.push(A(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const k=_("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${w(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${P.length?`<div class="info-plain">${P.join("")}</div>`:q}
      </section>`:"",H=Or.filter(Q=>v("projectCrew",Q.id)),$=_("projectCrew")?H.length?`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${H.map(Q=>`<th>${w(Q.labelKey?o(Q.labelKey,Q.fallback):Q.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((Q,Z)=>`<tr>${H.map(se=>`<td>${se.render(Q,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(H.length,1)}" class="empty">${w(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${q}
          </section>`:"",j=[];v("financialSummary","projectSubtotal")&&j.push(N(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${ce(0,d)}`)),v("financialSummary","expensesTotal")&&j.push(N(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||ce(0,d))),v("financialSummary","reservationsTotal")&&j.push(N(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||ce(0,d))),v("financialSummary","discountAmount")&&j.push(N(o("reservations.details.labels.discount","الخصم"),i.discountAmount||ce(0,d))),v("financialSummary","taxAmount")&&j.push(N(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||ce(0,d)));const X=[];v("financialSummary","overallTotal")&&X.push(N(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||ce(0,d),{variant:"final"})),v("financialSummary","paidAmount")&&X.push(N(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||ce(0,d),{variant:"final"})),v("financialSummary","remainingAmount")&&X.push(N(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||ce(0,d),{variant:"final"}));const C=_("financialSummary")?!j.length&&!X.length?`<section class="quote-section quote-section--financial">${q}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${w(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${j.length?`<div class="totals-inline">${j.join("")}</div>`:""}
            ${X.length?`<div class="totals-final">${X.join("")}</div>`:""}
          </div>
        </section>`:"",B=Vr.filter(Q=>v("projectExpenses",Q.id)),x=_("projectExpenses")?B.length?`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${B.map(Q=>`<th>${w(Q.labelKey?o(Q.labelKey,Q.fallback):Q.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((Q,Z)=>`<tr>${B.map(se=>`<td>${se.render(Q,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(B.length,1)}" class="empty">${w(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${q}
          </section>`:"",Y=Ur.filter(Q=>v("projectEquipment",Q.id)),K=_("projectEquipment")?Y.length?`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Y.map(Q=>`<th>${w(Q.labelKey?o(Q.labelKey,Q.fallback):Q.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${r.length?r.map((Q,Z)=>`<tr>${Y.map(se=>`<td>${se.render(Q,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Y.length,1)}" class="empty">${w(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${q}
          </section>`:"",F=(e?.description||"").trim()||"",D=_("projectNotes")?`<section class="quote-section">
        <h3>${w(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${w(F||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",R=[];v("payment","beneficiary")&&R.push(U(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Le.beneficiaryName)),v("payment","bank")&&R.push(U(o("reservations.quote.labels.bank","اسم البنك"),Le.bankName)),v("payment","account")&&R.push(U(o("reservations.quote.labels.account","رقم الحساب"),h(Le.accountNumber))),v("payment","iban")&&R.push(U(o("reservations.quote.labels.iban","رقم الآيبان"),h(Le.iban)));const M=`<section class="quote-section">
      <div class="payment-block">
        <h3>${w(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${R.length?R.join(""):q}</div>
      </div>
      <p class="quote-approval-note">${w(Le.approvalNote)}</p>
    </section>`,W=Array.isArray(p)&&p.length?p:Ke,ie=`<footer class="quote-footer">
        <h4>${w(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${W.map(Q=>`<li>${w(Q)}</li>`).join("")}</ul>
      </footer>`,ne=[],ue=[];if(k&&ue.push({key:"project",html:k}),I&&ue.push({key:"customer",html:I}),ue.length>1){const Q=ue.find(Ae=>Ae.key==="project"),Z=ue.find(Ae=>Ae.key==="customer"),se=[];Q?.html&&se.push(Q.html),Z?.html&&se.push(Z.html),ne.push(_e(`<div class="quote-section-row quote-section-row--primary">${se.join("")}</div>`,{blockType:"group"}))}else ue.length===1&&ne.push(_e(ue[0].html));const O=[];$&&O.push(_e($,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),x&&O.push(_e(x,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),K&&O.push(_e(K,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const oe=[];C&&oe.push(_e(C,{blockType:"summary"})),D&&oe.push(_e(D));const Ee=[_e(M,{blockType:"payment"}),_e(ie,{blockType:"footer"})],we=[...fa(ne,"projects.quote.placeholder.primary"),...O,...fa(oe,"projects.quote.placeholder.summary"),...Ee],Te=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${w(Le.logoUrl)}" alt="${w(Le.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${w(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${w(Le.companyName)}</p>
        <p class="quote-company-cr">${w(o("reservations.quote.labels.cr","السجل التجاري"))}: ${w(Le.commercialRegistry)}</p>
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
      <style>${Xr}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Te}
          ${we.join("")}
        </div>
      </div>
    </div>
  `}function po(e){if(e?.context==="project")return ou(e);const{reservation:t,customer:n,project:a,crewAssignments:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:l,sections:d,fieldSelections:u={},quoteNumber:y,quoteDate:f,terms:m=Ke}=e,p=h(String(t?.reservationId??t?.id??"")),g=t.start?h(Xe(t.start)):"-",v=t.end?h(Xe(t.end)):"-",_=n?.customerName||n?.full_name||n?.name||"-",q=n?.phone||"-",A=n?.email||"-",N=n?.company||n?.company_name||"-",U=h(q),S=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),I=a?.code||a?.projectCode||"",P=h(String(c)),k=t?.notes||"",H=Array.isArray(m)&&m.length?m:Ke,$=Ws(u),j=(z,ke)=>Xs($,z,ke),X=z=>d?.has?.(z),C=`<div class="quote-placeholder">${w(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,B=(z,ke)=>`<div class="info-plain__item">${w(z)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${w(ke)}</strong></div>`,x=(z,ke,{variant:it="inline"}={})=>it==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${w(z)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${w(ke)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${w(z)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${w(ke)}</span>
    </span>`,Y=(z,ke)=>`<div class="payment-row">
      <span class="payment-row__label">${w(z)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${w(ke)}</span>
    </div>`,K=[];j("customerInfo","customerName")&&K.push(B(o("reservations.details.labels.customer","العميل"),_)),j("customerInfo","customerCompany")&&K.push(B(o("reservations.details.labels.company","الشركة"),N)),j("customerInfo","customerPhone")&&K.push(B(o("reservations.details.labels.phone","الهاتف"),U)),j("customerInfo","customerEmail")&&K.push(B(o("reservations.details.labels.email","البريد"),A));const F=X("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${K.length?`<div class="info-plain">${K.join("")}</div>`:C}
      </section>`:"",D=[];j("reservationInfo","reservationId")&&D.push(B(o("reservations.details.labels.reservationId","رقم الحجز"),p||"-")),j("reservationInfo","reservationStart")&&D.push(B(o("reservations.details.labels.start","بداية الحجز"),g)),j("reservationInfo","reservationEnd")&&D.push(B(o("reservations.details.labels.end","نهاية الحجز"),v)),j("reservationInfo","reservationDuration")&&D.push(B(o("reservations.details.labels.duration","عدد الأيام"),P));const R=X("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${D.length?`<div class="info-plain">${D.join("")}</div>`:C}
      </section>`:"",M=[];j("projectInfo","projectTitle")&&M.push(B(o("reservations.details.labels.project","المشروع"),S)),j("projectInfo","projectCode")&&M.push(B(o("reservations.details.labels.code","الرمز"),I||"-"));const W=X("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${M.length?`<div class="info-plain">${M.join("")}</div>`:C}
      </section>`:"",ie=[];j("financialSummary","equipmentTotal")&&ie.push(x(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${l}`)),j("financialSummary","crewTotal")&&ie.push(x(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${l}`)),j("financialSummary","discountAmount")&&ie.push(x(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${l}`)),j("financialSummary","taxAmount")&&ie.push(x(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${l}`));const ne=j("financialSummary","finalTotal"),ue=[];ne&&ue.push(x(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${l}`,{variant:"final"}));const O=ue.length?`<div class="totals-final">${ue.join("")}</div>`:"",oe=X("financialSummary")?!ie.length&&!ne?`<section class="quote-section quote-section--financial">${C}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${w(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${ie.length?`<div class="totals-inline">${ie.join("")}</div>`:""}
            ${O}
          </div>
        </section>`:"",{groups:Ee}=Yi(t),we=Ee.map(z=>{const ke=Number(z?.count??z?.quantity??1)||1,it=Number(z?.unitPrice);let bt=Number.isFinite(it)?it:0;if(!bt||bt<=0){const an=Number(z?.totalPrice);Number.isFinite(an)&&ke>0&&(bt=Number((an/ke).toFixed(2)))}Number.isFinite(bt)||(bt=0);const On=z?.type==="package"||Array.isArray(z?.items)&&z.items.some(an=>an?.type==="package"),Vn=Array.isArray(z?.barcodes)&&z.barcodes.length?z.barcodes[0]:Array.isArray(z?.items)&&z.items.length?z.items[0]?.barcode:null,Ma=z?.packageDisplayCode??z?.package_code??z?.packageCode??z?.packageId??z?.package_id??z?.code??z?.barcode??(Array.isArray(z?.items)&&z.items.length?z.items[0]?.package_code??z.items[0]?.packageCode??z.items[0]?.packageId??z.items[0]?.package_id??z.items[0]?.code??z.items[0]?.barcode:null),Un=On?Ma??Vn??"":z?.barcode??Vn??"",za=Un!=null?String(Un):"";let nn=Number.isFinite(Number(z?.totalPrice))?Number(z.totalPrice):Number((bt*ke).toFixed(2));return nn=qe(nn),{...z,isPackage:On,desc:z?.description,barcode:za,qty:ke,price:nn,totalPrice:nn,unitPriceValue:bt}}),Te=zr.filter(z=>j("items",z.id)),Q=Te.length>0,Z=Q?Te.map(z=>`<th>${w(z.labelKey?o(z.labelKey,z.fallback):z.fallback)}</th>`).join(""):"",Ae=we.length>0?we.map((z,ke)=>`<tr>${Te.map(it=>`<td>${it.render(z,ke)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Te.length,1)}" class="empty">${w(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,ze=X("items")?Q?`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Z}</tr>
              </thead>
              <tbody>${Ae}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.items.title","المعدات"))}</h3>
            ${C}
          </section>`:"",ae=Hr.filter(z=>j("crew",z.id)),G=ae.length>0,ge=G?ae.map(z=>`<th>${w(z.labelKey?o(z.labelKey,z.fallback):z.fallback)}</th>`).join(""):"",L=Array.isArray(s)?s:[],re=L.length?L.map((z,ke)=>`<tr>${ae.map(it=>`<td>${it.render(z,ke)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(ae.length,1)}" class="empty">${w(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,ye=X("crew")?G?`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${ge}</tr>
              </thead>
              <tbody>${re}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${C}
          </section>`:"",he=X("notes")?`<section class="quote-section">
        <h3>${w(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${w(k||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",pe=[];j("payment","beneficiary")&&pe.push(Y(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Le.beneficiaryName)),j("payment","bank")&&pe.push(Y(o("reservations.quote.labels.bank","اسم البنك"),Le.bankName)),j("payment","account")&&pe.push(Y(o("reservations.quote.labels.account","رقم الحساب"),h(Le.accountNumber))),j("payment","iban")&&pe.push(Y(o("reservations.quote.labels.iban","رقم الآيبان"),h(Le.iban)));const Qe=`<section class="quote-section">
      <div class="payment-block">
        <h3>${w(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${pe.length?pe.join(""):C}</div>
      </div>
      <p class="quote-approval-note">${w(Le.approvalNote)}</p>
    </section>`,$e=`<footer class="quote-footer">
        <h4>${w(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${H.map(z=>`<li>${w(z)}</li>`).join("")}</ul>
      </footer>`,He=[];F&&R?He.push(_e(`<div class="quote-section-row">${F}${R}</div>`,{blockType:"group"})):(R&&He.push(_e(R)),F&&He.push(_e(F))),W&&He.push(_e(W));const st=[];ze&&st.push(_e(ze,{blockType:"table",extraAttributes:'data-table-id="items"'})),ye&&st.push(_e(ye,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const At=[];oe&&At.push(_e(oe,{blockType:"summary"})),he&&At.push(_e(he));const Sn=[_e(Qe,{blockType:"payment"}),_e($e,{blockType:"footer"})],tn=[...fa(He,"reservations.quote.placeholder.page1"),...st,...fa(At,"reservations.quote.placeholder.page2"),...Sn],Ra=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${w(Le.logoUrl)}" alt="${w(Le.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${w(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${w(Le.companyName)}</p>
        <p class="quote-company-cr">${w(o("reservations.quote.labels.cr","السجل التجاري"))}: ${w(Le.commercialRegistry)}</p>
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
      <style>${Xr}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Ra}
          ${tn.join("")}
        </div>
      </div>
    </div>
  `}function cu(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function Bn(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>cu(c)),i=[s,...r].map(c=>c.catch(l=>(St("asset load failed",l),qd(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function fo(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await io(r),await Bn(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let l=null,d=null;const u=S=>{S.style.margin="0 auto",S.style.breakInside="avoid",S.style.pageBreakInside="avoid",S.style.pageBreakAfter="auto",S.style.breakAfter="auto"},y=()=>{const S=a.createElement("div"),I=s.childElementCount===0;if(S.className="quote-page",S.dataset.pageIndex=String(s.childElementCount),I){S.classList.add("quote-page--primary");const k=i.cloneNode(!0);k.removeAttribute("data-quote-header-template"),S.appendChild(k)}else S.classList.add("quote-page--continuation");const P=a.createElement("main");P.className="quote-body",S.appendChild(P),s.appendChild(S),u(S),l=S,d=P},f=()=>{(!l||!d||!d.isConnected)&&y()},m=()=>{if(!l||!d||d.childElementCount>0)return;const S=l;l=null,d=null,S.parentNode&&S.parentNode.removeChild(S)},p=()=>{l=null,d=null},g=()=>l?l.scrollHeight-l.clientHeight>yd:!1,v=(S,{allowOverflow:I=!1}={})=>(f(),d.appendChild(S),g()&&!I?(d.removeChild(S),m(),!1):!0),_=S=>{const I=S.cloneNode(!0);I.removeAttribute?.("data-quote-block"),I.removeAttribute?.("data-block-type"),I.removeAttribute?.("data-table-id"),!v(I)&&(p(),!v(I)&&v(I,{allowOverflow:!0}))},q=S=>{const I=S.querySelector("table");if(!I){_(S);return}const P=S.querySelector("h3"),k=I.querySelector("thead"),H=Array.from(I.querySelectorAll("tbody tr"));if(!H.length){_(S);return}let $=null,j=0;const X=(B=!1)=>{const x=S.cloneNode(!1);x.removeAttribute("data-quote-block"),x.removeAttribute("data-block-type"),x.removeAttribute("data-table-id"),x.classList.add("quote-section--table-fragment"),B&&x.classList.add("quote-section--table-fragment--continued");const Y=P?P.cloneNode(!0):null;Y&&x.appendChild(Y);const K=I.cloneNode(!1);K.classList.add("quote-table--fragment"),k&&K.appendChild(k.cloneNode(!0));const F=a.createElement("tbody");return K.appendChild(F),x.appendChild(K),{section:x,body:F}},C=(B=!1)=>$||($=X(B),v($.section)||(p(),v($.section)||v($.section,{allowOverflow:!0})),$);H.forEach(B=>{C(j>0);const x=B.cloneNode(!0);if($.body.appendChild(x),g()&&($.body.removeChild(x),$.body.childElementCount||(d.removeChild($.section),$=null,m()),p(),$=null,C(j>0),$.body.appendChild(x),g())){$.section.classList.add("quote-section--table-fragment--overflow"),j+=1;return}j+=1}),$=null};if(!c.length)return;c.forEach(S=>{S.getAttribute("data-block-type")==="table"?q(S):_(S)});const A=Array.from(s.children),N=[];if(A.forEach((S,I)=>{const P=S.querySelector(".quote-body");if(I!==0&&(!P||P.childElementCount===0)){S.remove();return}N.push(S)}),!n){const S=a.defaultView||window,I=Math.min(3,Math.max(1,S.devicePixelRatio||1)),P=ja()?Math.min(2,I):I;N.forEach(k=>Bd(k,{pixelRatio:P}))}N.forEach((S,I)=>{const P=I===0;S.style.pageBreakAfter="auto",S.style.breakAfter="auto",S.style.pageBreakBefore=P?"auto":"always",S.style.breakBefore=P?"auto":"page",n?S.style.boxShadow="":S.style.boxShadow="none"});const U=N[N.length-1]||null;l=U,d=U?.querySelector(".quote-body")||null,await Bn(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function ti(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function lu(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([Fd(),Dd()]),c=e.ownerDocument||document,l=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,l,c?.documentElement?.getAttribute?.("dir")].some(S=>typeof S=="string"&&S.toLowerCase().startsWith("rtl")),y=typeof window<"u"&&window.devicePixelRatio||1,f=Zs(),m=to(),p=ja();let g;p?g=1.5:m?g=Math.min(1.7,Math.max(1.2,y*1.1)):f?g=Math.min(1.8,Math.max(1.25,y*1.2)):g=Math.min(2,Math.max(1.6,y*1.4));const v=p||m?.9:f?.92:.95,_=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),q={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let A=0;const N=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let S=0;S<s.length;S+=1){const I=s[S];await io(I),await Bn(I);const P=I.ownerDocument||document,k=P.createElement("div");Object.assign(k.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const H=I.cloneNode(!0);H.style.width=`${ea}px`,H.style.maxWidth=`${ea}px`,H.style.minWidth=`${ea}px`,H.style.height=`${ta}px`,H.style.maxHeight=`${ta}px`,H.style.minHeight=`${ta}px`,H.style.position="relative",H.style.background="#ffffff",ti(H),k.appendChild(H),P.body.appendChild(k);let $;try{await Bn(H),$=await i(H,{...q,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(F){throw qs(F,"pageCapture",{toastMessage:N}),F}finally{k.parentNode?.removeChild(k)}if(!$)continue;const j=$.width||1,C=($.height||1)/j;let B=gs,x=B*C,Y=0;if(x>Zn){const F=Zn/x;x=Zn,B=B*F,Y=Math.max(0,(gs-B)/2)}const K=$.toDataURL("image/jpeg",v);A>0&&_.addPage(),_.addImage(K,"JPEG",Y,0,B,x,`page-${A+1}`,"FAST"),A+=1,await new Promise(F=>window.requestAnimationFrame(F))}}catch(S){throw Ss({safariWindowRef:n,mobileWindowRef:a}),S}if(A===0)throw Ss({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(m||p){const S=_.output("blob");if(p){const I=URL.createObjectURL(S);Cn();try{window.location.assign(I)}catch(P){St("mobile safari blob navigation failed",P)}finally{setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{const I=URL.createObjectURL(S),P=()=>m&&n&&!n.closed?n:a&&!a.closed?a:null,k=($,j)=>{if(Cn(),!$){window.location.assign(j);return}try{$.location.replace(j),$.focus?.()}catch(X){St("direct blob navigation failed",X);try{$.document.open(),$.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${w(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${j}" title="PDF preview"></iframe></body></html>`),$.document.close()}catch(C){St("iframe blob delivery failed",C),window.location.assign(j)}}},H=P();k(H,I),setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{Cn();const S=_.output("bloburl"),I=document.createElement("a");I.href=S,I.download=t,I.rel="noopener",I.style.display="none",document.body.appendChild(I),I.click(),setTimeout(()=>{URL.revokeObjectURL(S),I.remove()},2e3)}}function en(){if(!T||!J)return;const{previewFrame:e}=J;if(!e)return;const t=T.context||"reservation",n=po({context:t,reservation:T.reservation,customer:T.customer,project:T.project,crewAssignments:T.crewAssignments,totals:T.totals,totalsDisplay:T.totalsDisplay,rentalDays:T.rentalDays,currencyLabel:T.currencyLabel,sections:T.sections,fieldSelections:T.fields,quoteNumber:T.quoteNumber,quoteDate:T.quoteDateLabel,terms:T.terms,projectCrew:T.projectCrew,projectExpenses:T.projectExpenses,projectEquipment:T.projectEquipment,projectInfo:T.projectInfo,clientInfo:T.clientInfo,paymentSummary:T.paymentSummary,projectTotals:T.projectTotals});Vt("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&(Fr(r),Br(r,s),Dr(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await fo(i,{context:"preview"}),ti(i))}catch(m){console.error("[reservations/pdf] failed to layout preview document",m)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),l=a?.querySelector(".quote-preview-pages"),d=ea;let u=18;if(l&&a?.defaultView){const m=a.defaultView.getComputedStyle(l),p=parseFloat(m.rowGap||m.gap||`${u}`);Number.isFinite(p)&&p>=0&&(u=p)}const y=ta,f=c.length?c.length*y+Math.max(0,(c.length-1)*u):y;if(e.dataset.baseWidth=String(d),e.dataset.baseHeight=String(f),e.style.width=`${d}px`,e.style.minWidth=`${d}px`,e.style.height=`${f}px`,e.style.minHeight=`${f}px`,J?.previewFrameWrapper&&!J?.userAdjustedZoom){const m=J.previewFrameWrapper.clientWidth-24;m>0&&m<d?dt=Math.max(m/d,.3):dt=1}bo(dt)}finally{Cn()}},{once:!0})}function du(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?T.sections.add(n):T.sections.delete(n),co(T),yo(),en())}function uu(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=T.context||"reservation",r=T.fields||(T.fields=Na(s)),i=Sd(r,n);t.checked?i.add(a):i.delete(a),co(T),en()}function mu(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(Ys(T,n),T.sectionExpansions[n]=t.open)}function yo(){if(!J?.toggles||!T)return;const{toggles:e}=J,t=T.fields||{},n=T.context||"reservation";Ys(T);const a=Ta(n),s=Kr(n),r=a.map(({id:i,labelKey:c,fallback:l})=>{const d=o(c,l),u=T.sections.has(i),y=s[i]||[],f=Ed(T,i),m=y.length?`<div class="quote-toggle-sublist">
          ${y.map(p=>{const g=Xs(t,i,p.id),v=u?"":"disabled",_=p.labelKey?o(p.labelKey,p.fallback):p.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${p.id}" ${g?"checked":""} ${v}>
                <span>${w(_)}</span>
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
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",du)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",uu)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",mu)})}function pu(){if(J?.modal)return J;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
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
    <span data-quote-status-text>${w(Wr("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(f),i?.addEventListener("click",async()=>{if(T){i.disabled=!0;try{await go()}finally{i.disabled=!1}}});const v=()=>{hs()||vs(e)};d.forEach(N=>{N?.addEventListener("click",v)}),l&&!d.includes(l)&&l.addEventListener("click",v),e.addEventListener("click",N=>{hs()||N.target===e&&vs(e)}),J={modal:e,toggles:t,preview:n,previewScroll:p,previewFrameWrapper:m,zoomControls:f,zoomValue:f.querySelector("[data-zoom-value]"),previewFrame:y,meta:a,downloadBtn:i,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const _=f.querySelector("[data-zoom-out]"),q=f.querySelector("[data-zoom-in]"),A=f.querySelector("[data-zoom-reset]");return _?.addEventListener("click",()=>Ni(-.1)),q?.addEventListener("click",()=>Ni(.1)),A?.addEventListener("click",()=>ya(1,{markManual:!0})),s&&s.addEventListener("input",yu),r&&r.addEventListener("click",bu),ya(dt),J}function ya(e,{silent:t=!1,markManual:n=!1}={}){dt=Math.min(Math.max(e,.25),2.2),n&&J&&(J.userAdjustedZoom=!0),bo(dt),!t&&J?.zoomValue&&(J.zoomValue.textContent=`${Math.round(dt*100)}%`)}function Ni(e){ya(dt+e,{markManual:!0})}function bo(e){if(!J?.previewFrame||!J.previewFrameWrapper)return;const t=J.previewFrame,n=J.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",Zs()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function fu(){if(!J?.meta||!T)return;const{meta:e}=J;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${w(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${w(T.quoteNumber)}</strong></div>
      <div><span>${w(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${w(T.quoteDateLabel)}</strong></div>
    </div>
  `}function ni(){if(!J?.termsInput)return;const e=(T?.terms&&T.terms.length?T.terms:Ke).join(`
`);J.termsInput.value!==e&&(J.termsInput.value=e)}function yu(e){if(!T)return;const t=fs(e?.target?.value??"");if(t.length){T.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{T.terms=[...Ke],ni();const n=Ke.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}en()}function bu(e){if(e?.preventDefault?.(),!T)return;T.terms=[...Ke];const t=document.getElementById("reservation-terms");t&&(t.value=Ke.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=Ke.join(`
`)),ni(),en()}async function go(){if(!T)return;Vt("export");const t=!Zs()&&to(),n=ja(),a=null,s=!n&&t?window.open("","_blank"):null;(l=>{if(l)try{l.document.open(),l.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${w(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${w(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${w(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),l.document.close()}catch(d){St("failed to prime download window",d)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await Rd(),Ja("html2pdf ensured");const l=T.context||"reservation",d=po({context:l,reservation:T.reservation,customer:T.customer,project:T.project,crewAssignments:T.crewAssignments,totals:T.totals,totalsDisplay:T.totalsDisplay,rentalDays:T.rentalDays,currencyLabel:T.currencyLabel,sections:T.sections,fieldSelections:T.fields,quoteNumber:T.quoteNumber,quoteDate:T.quoteDateLabel,terms:T.terms,projectCrew:T.projectCrew,projectExpenses:T.projectExpenses,projectEquipment:T.projectEquipment,projectInfo:T.projectInfo,clientInfo:T.clientInfo,paymentSummary:T.paymentSummary,projectTotals:T.projectTotals});i=document.createElement("div"),i.innerHTML=d,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),Fr(i),Br(i),Dr(i),Ja("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await fo(u,{context:"export"}),await Bn(u),ti(u),Ja("layout complete for export document")}catch(f){qs(f,"layoutQuoteDocument",{suppressToast:!0})}}const y=`quotation-${T.quoteNumber}.pdf`;await lu(u,{filename:y,safariWindowRef:s,mobileWindowRef:a}),T.sequenceCommitted||(Od(T.quoteSequence),T.sequenceCommitted=!0)}catch(l){Ss({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,qs(l,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),Cn()}}function ho(){const e=pu();e?.modal&&(Pn=!1,dt=1,J&&(J.userAdjustedZoom=!1),ya(dt,{silent:!0}),yo(),fu(),ni(),en(),vd(e.modal))}async function gu({reservation:e,customer:t,project:n}){if(!e){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=Gd(e),{totalsDisplay:s,totals:r,rentalDays:i}=Wd(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:l,quoteNumber:d}=ro("reservation"),u=new Date,y=od();T={context:"reservation",reservation:e,customer:t,project:n,crewAssignments:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(Ta("reservation").filter(f=>f.defaultSelected).map(f=>f.id)),sectionExpansions:Js("reservation"),fields:Na("reservation"),terms:y,quoteSequence:l,quoteNumber:d,quoteDate:u,quoteDateLabel:uo(u),sequenceCommitted:!1},lo(T),ho()}async function qm({project:e}){if(!e){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=ru(e),{project:n}=t;if(!n){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=ro("project"),r=new Date,i=[...rd];T={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(Ta("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:Js("project"),fields:Na("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:uo(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},lo(T),ho()}function hu({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=un(),{reservations:r=[],customers:i=[],technicians:c=[],projects:l=[]}=be(),d=r.map(q=>{const A=es(q);return{...A,id:q.id??A.id,reservationId:q.reservationId??q.reservation_id??A.reservationId,reservationCode:q.reservationCode??q.reservation_code??A.reservationCode}}),u=d,y=Array.isArray(s)?s:c||[],f=new Map((l||[]).map(q=>[String(q.id),q])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!u||u.length===0){m.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const p=t||Gl(),g=new Map(i.map(q=>[String(q.id),q])),v=new Map(y.map(q=>[String(q.id),q])),_=Yl({reservations:d,filters:p,customersMap:g,techniciansMap:v,projectsMap:f});if(_.length===0){m.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${Zl({entries:_,customersMap:g,techniciansMap:v,projectsMap:f})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(q=>{const A=Number(q.dataset.reservationIndex);Number.isNaN(A)||q.addEventListener("click",()=>{typeof n=="function"&&n(A)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(q=>{const A=Number(q.dataset.reservationIndex);Number.isNaN(A)||q.addEventListener("click",N=>{N.stopPropagation(),typeof a=="function"&&a(A,N)})})}function vu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=be(),c=s.map(g=>{const v=es(g);return{...v,id:g.id??v.id,reservationId:g.reservationId??g.reservation_id??v.reservationId,reservationCode:g.reservationCode??g.reservation_code??v.reservationCode}}),l=s[e];if(!l)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=c[e]??es(l),u=r.find(g=>String(g.id)===String(l.customerId)),y=l.projectId?i.find(g=>String(g.id)===String(l.projectId)):null,f=document.getElementById("reservation-details-body"),m=document.getElementById("reservationDetailsModal"),p=()=>{const g=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},v=document.getElementById("reservation-details-edit-btn");v&&(v.onclick=()=>{g(),typeof t=="function"&&t(e,{reservation:l,customer:u,getEditContext:a})});const _=document.getElementById("reservation-details-delete-btn");_&&(_.onclick=()=>{g(),typeof n=="function"&&n(e,{reservation:l,customer:u})});const q=f?.querySelector('[data-action="open-project"]');q&&y&&q.addEventListener("click",()=>{g();const N=y?.id!=null?String(y.id):"",U=N?`projects.html?project=${encodeURIComponent(N)}`:"projects.html";window.location.href=U});const A=document.getElementById("reservation-details-export-btn");A&&(A.onclick=async N=>{N?.preventDefault?.(),N?.stopPropagation?.(),A.blur();try{await gu({reservation:l,customer:u,project:y})}catch(U){console.error("❌ [reservations] export to PDF failed",U),E(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}})};if(f){const g=un()||[];f.innerHTML=_i(d,u,g,e,y),p(),er().then(()=>{const v=un()||[];f.innerHTML=_i(d,u,v,e,y),p()}).catch(()=>{})}return m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}function vo(){const e=()=>{Mn(),Me(),un()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let ji=!1,Bi=null;function qu(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function Sm(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=qu(n);if(!a&&ji&&Ot().length>0&&s===Bi)return Ot();try{const r=await tr(n||{});return ji=!0,Bi=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return Ot()}}async function Su(e,{onAfterChange:t}={}){if(!Wt())return Fn(),!1;const a=Ot()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await Cc(s),vo(),t?.({type:"deleted",reservation:a}),E(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=Sa(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return E(i,"error"),!1}}async function Eu(e,{onAfterChange:t}={}){const a=Ot()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=Tt(a);if(r)return E(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await Lc(s);return vo(),t?.({type:"confirmed",reservation:i}),E(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=Sa(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return E(c,"error"),!1}}function qn(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Tn(e,n),end:Tn(t,a)}}function ba(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ai(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function qo(){const{container:e,select:t,hint:n,addButton:a}=ai();if(!t)return;const s=t.value,r=Vi(),i=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,l=r.map(u=>{const y=Number.isFinite(Number(u.price))?Number(u.price):0,f=h(y.toFixed(2)),m=`${u.name} — ${f} ${i}`;return`<option value="${ba(u.id)}">${ba(m)}</option>`}).join("");t.innerHTML=`${c}${l}`;const d=r.length>0;t.disabled=!d,a&&(a.disabled=!d),e&&(e.hidden=!d,e.setAttribute("aria-hidden",d?"false":"true")),n&&(d?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),d&&s&&r.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function wu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=jt(),{start:r,end:i}=qn(),{reservations:c=[]}=be(),l=a!=null&&c[a]||null,d=l?.id??l?.reservationId??null,u=kr(n,{existingItems:s,start:r,end:i,ignoreReservationId:d});if(!u.success)return t||E(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const y=[...s,u.package];return Bt(a,y),Nt(y),Ye(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function Di(){const{select:e}=ai();if(!e)return;const t=e.value||"";wu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function Au(){const{addButton:e,select:t}=ai();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{Di()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Di())}),t.dataset.listenerAttached="true"),qo()}function Nt(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,Ri(t);return}const l=bn(e);t.innerHTML=l.map(d=>{const u=d.items[0]||{},y=Jt(u)||d.image,f=y?`<img src="${y}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=d.items.some($=>$?.type==="package"),p=h(String(d.count)),g=Ne(d.unitPrice),v=Number.isFinite(g)?qe(g):0,_=Ne(d.totalPrice),q=Number.isFinite(_)?_:v*(Number.isFinite(d.count)?d.count:1),A=qe(q),N=`${h(v.toFixed(2))} ${a}`,U=`${h(A.toFixed(2))} ${a}`,S=d.barcodes.map($=>h(String($||""))).filter(Boolean),I=S.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${S.map($=>`<li>${$}</li>`).join("")}
            </ul>
          </details>`:"";let P="";if(m){const $=new Map,j=C=>{const B=Number.parseFloat(h(String(C??"")).replace(/[^0-9.]/g,""));return!Number.isFinite(B)||B<=0||B>99?1:Math.round(B)},X=[];if(Array.isArray(d.packageItems)&&d.packageItems.length&&X.push(...d.packageItems),d.items.forEach(C=>{Array.isArray(C?.packageItems)&&X.push(...C.packageItems)}),X.forEach(C=>{if(!C)return;const B=te(C.barcode||C.normalizedBarcode||C.desc||Math.random());if(!B)return;const x=$.get(B),Y=j(C.qtyPerPackage??C.perPackageQty??C.quantityPerPackage??C.qty??C.quantity??1),K=Math.max(1,Math.min(Y,99));if(x){x.qty=K;return}$.set(B,{desc:C.desc||C.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:K,barcode:C.barcode??C.normalizedBarcode??""})}),$.size){const C=Array.from($.values()).map(B=>{const x=h(String(B.qty>0?Math.min(B.qty,99):1)),Y=ba(B.desc||""),K=B.barcode?` <span class="reservation-package-items__barcode">(${ba(h(String(B.barcode)))})</span>`:"";return`<li>${Y}${K} × ${x}</li>`}).join("");P=`
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
          <td>${N}</td>
          <td>${U}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),Ri(t)}function xu(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function Ba(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=Da();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,Fi();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${h(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${h(Number(s.percentage).toFixed(2))}%`:"—",l=s?.recordedAt?h(Xe(s.recordedAt)):"—",d=xu(s?.type),u=s?.note?h(s.note):"";return`
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
  `,Fi()}function Iu(){if(Dn()){E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=wo(e);let a=Ao(t);if(!Number.isFinite(a)||a<=0){E(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=ts.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,l=o("reservations.create.summary.currency","SR");let d=null,u=null;if(n==="percent"){const f=Math.max(0,100-i);if(f<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const p=h(m.toFixed(2));E(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",p)),a=m}u=Number(a.toFixed(2)),r>0&&(d=a/100*r)}else{const f=Math.max(0,r-c);if(f<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const p=`${h(m.toFixed(2))} ${l}`;E(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",p)),a=m}d=Number(a.toFixed(2)),r>0&&(u=d/r*100)}d!=null&&(d=Number(d.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const y={type:n,value:a,amount:d,percentage:u,recordedAt:new Date().toISOString()};Fu(y),si(Da()),Ba(),Ye(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),E(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function Fi(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(Dn()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Iu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(Dn()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(Ru(s),si(Da()),Ba(),Ye(),E(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function _u(e){const{index:t,items:n}=jt(),s=bn(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,l)=>l!==r);Bt(t,i),Nt(i),Ye()}function ku(e){const{index:t,items:n}=jt(),a=n.filter(s=>qa(s)!==e);a.length!==n.length&&(Bt(t,a),Nt(a),Ye())}function $u(e){const{index:t,items:n}=jt(),s=bn(n).find(v=>v.key===e);if(!s||s.items.some(v=>v?.type==="package"))return;const{start:r,end:i}=qn();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=be(),l=t!=null&&c[t]||null,d=l?.id??l?.reservationId??null,u=new Set(n.map(v=>te(v.barcode))),{equipment:y=[]}=be(),f=(y||[]).find(v=>{const _=te(v?.barcode);return!_||u.has(_)||qa({desc:v?.desc||v?.description||v?.name||"",price:Number(v?.price)||0})!==e||!Fs(v)?!1:!pt(_,r,i,d)});if(!f){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const m=te(f.barcode),p=Xt(f);if(!p){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:p,equipmentId:p,barcode:m,desc:f.desc||f.description||f.name||s.description||"",qty:1,price:Number.isFinite(Number(f.price))?Number(f.price):s.unitPrice,image:Jt(f)}];Bt(t,g),Nt(g),Ye()}function Ri(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){_u(s);return}if(a==="increase-edit-group"&&s){$u(s);return}if(a==="remove-edit-group"&&s){ku(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||Lu(i)}}),e.dataset.groupListenerAttached="true")}function Dn(){return!!document.getElementById("edit-res-project")?.value}function Pu(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{Dn()&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function Cu(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),l=document.getElementById("edit-res-payment-history");[n,a,s,r,i,c,l].forEach(Pu),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s&&(s.value="unpaid",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),l&&(l.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.dataset.linkedDisabled="false"))}function Ye(){const e=document.getElementById("edit-res-summary");if(!e)return;Ba();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),We(a),Ye()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=Dn();Cu(c);const l=document.getElementById("edit-res-tax"),d=c?!1:l?.checked||!1,u=!c&&a?.dataset?.userSelected==="true",y=c?"unpaid":u&&a?.value||"unpaid";let f=null;!c&&d&&(at("edit-res-company-share"),f=pn("edit-res-company-share"),(!Number.isFinite(f)||f<=0)&&(at("edit-res-company-share"),f=pn("edit-res-company-share")));const{items:m=[],payments:p=[]}=jt(),{start:g,end:v}=qn(),_=ts({items:m,discount:r,discountType:i,applyTax:d,paidStatus:y,start:g,end:v,companySharePercent:f,paymentHistory:p});e.innerHTML=_;const q=ts.lastResult;if(q&&a){const A=q.paymentStatus;u?We(a,a.value):(a.value!==A&&(a.value=A),a.dataset&&delete a.dataset.userSelected,We(a,A))}else a&&We(a,a.value)}function Lu(e){if(e==null)return;const{index:t,items:n}=jt();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);Bt(t,a),Nt(a),Ye()}function Tu(e){const t=e?.value??"",n=te(t);if(!n)return;const a=wa(n);if(!a){E(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=Et(a);if(s==="maintenance"||s==="retired"){E(Gt(s));return}const r=te(n),{index:i,items:c=[]}=jt();if(c.findIndex(v=>te(v.barcode)===r)>-1){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=qn();if(!d||!u){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:y=[]}=be(),f=i!=null&&y[i]||null,m=f?.id??f?.reservationId??null;if(pt(r,d,u,m)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const p=Xt(a);if(!p){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:p,equipmentId:p,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];Bt(i,g),e&&(e.value=""),Nt(g),Ye()}function ga(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Ar(t),a=te(n?.barcode||t);if(!n||!a){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=Et(n);if(s==="maintenance"||s==="retired"){E(Gt(s));return}const{start:r,end:i}=qn();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:l=[]}=jt();if(l.some(g=>te(g.barcode)===a)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=be(),y=c!=null&&u[c]||null,f=y?.id??y?.reservationId??null;if(pt(a,r,i,f)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=Xt(n);if(!m){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const p=[...l,{id:m,equipmentId:m,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];Bt(c,p),Nt(p),Ye(),e.value=""}function So(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),ga(e))});const t=()=>{xr(e.value,"edit-res-equipment-description-options")&&ga(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{Ye()});const e=()=>{Au()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{qo()})}typeof window<"u"&&(window.getEditReservationDateRange=qn,window.renderEditPaymentHistory=Ba);function Nu(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){us(e);return}ga(e)}}function Em(){Lt(),So()}function ju(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let dn=null,lt=[],ut=[],Es=null,Fe={},Ya=!1;const Bu="__DEBUG_CREW__";function Du(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(Bu);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function Mi(e,t){if(Du())try{console.log(`🪵 [crew-debug:edit] ${e}`,t)}catch{}}function ws(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function As(){return document.getElementById("edit-res-confirmed")?.value==="true"}function jt(){return{index:dn,items:lt,payments:ut}}function Bt(e,t,n=ut){dn=typeof e=="number"?e:null,lt=Array.isArray(t)?[...t]:[],ut=Array.isArray(n)?[...n]:[]}function Eo(){dn=null,lt=[],jc(),ut=[]}function Da(){return[...ut]}function si(e){ut=Array.isArray(e)?[...e]:[]}function Fu(e){e&&(ut=[...ut,e])}function Ru(e){!Number.isInteger(e)||e<0||(ut=ut.filter((t,n)=>n!==e))}function Ln(e,t=1){const n=Number.parseFloat(h(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function xs(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(h(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function Mu(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?te(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:Ln(e.qty??e.quantity??e.count??1),price:xs(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function zu(e,t=0){if(!e||typeof e!="object")return null;const n=Nn(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=Ln(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),r=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:Ps(e)).map(f=>Mu(f)).filter(Boolean),i=e.total_price??e.totalPrice??e.total??null;let c=xs(e.unit_price??e.unitPrice??e.price??null,0);if((!c||c===0)&&i!=null){const f=xs(i,0);f>0&&a>0&&(c=Number((f/a).toFixed(2)))}const l=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,l,n].find(f=>f!=null&&String(f).trim()!=="")||`Package ${n}`,y=e.image??e.cover??e.thumbnail??r.find(f=>f?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:h(String(u)),name:h(String(u)),qty:a,price:c,barcode:l,packageItems:r,image:y}}function Hu(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const r=s-n;e.set(a,r>0?r:0)})}function Ou(e={},t=[]){const n=Array.isArray(t)?t.map(c=>({...c})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((c,l)=>zu(c,l)).filter(Boolean);if(!s.length)return n;const r=new Map;s.forEach(c=>{const l=Ln(c.qty??c.quantity??1);if(c.barcode){const d=te(c.barcode);if(d){const u=`package::${d}`;r.set(u,(r.get(u)??0)+l)}}(c.packageItems||[]).forEach(d=>{if(!d)return;const u=l*Ln(d.qty??d.quantity??1),y=d.equipmentId??null,f=d.normalizedBarcode||(d.barcode?te(d.barcode):null);if(y!=null){const m=`equipment::${String(y)}`;r.set(m,(r.get(m)??0)+u)}if(f){const m=`barcode::${f}`;r.set(m,(r.get(m)??0)+u)}})});const i=[];return n.forEach(c=>{if(!c||typeof c!="object"){i.push(c);return}if(c.type==="package"){const v=Nn(c.packageId??c.package_id??c.id??"");s.some(q=>q.packageId===v)||i.push({...c});return}const l=Ln(c.qty??c.quantity??1),d=Xt(c),u=c.barcode?te(c.barcode):null,y=[];d!=null&&y.push(`equipment::${String(d)}`),u&&y.push(`barcode::${u}`);const f=y.map(v=>r.get(v)??0).filter(v=>v>0);if(!f.length){i.push({...c});return}const m=Math.min(...f);if(m<=0){i.push({...c});return}const p=Math.min(m,l);if(Hu(r,y,p),p>=l)return;const g=l-p;i.push({...c,qty:g,quantity:g})}),[...i,...s.map(c=>({...c}))]}function Vu(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function wo(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Ao(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Uu(e,t){if(e){e.value="";return}}function In(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function xo(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),l=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,d=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:l,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:d}}function Ku(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((l,d)=>String(d.createdAt||d.start||"").localeCompare(String(l.createdAt||l.start||""))):[],c=[`<option value="">${In(a)}</option>`];i.forEach(l=>{c.push(`<option value="${In(l.id)}">${In(l.title||a)}</option>`)}),r&&!i.some(l=>String(l.id)===r)&&c.push(`<option value="${In(r)}">${In(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function Io(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const l=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",l&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}Is("tax");const c=Fe?.updateEditReservationSummary;typeof c=="function"&&c()}function Is(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=Fe?.updateEditReservationSummary;typeof r=="function"&&r()};if(Ya){a();return}Ya=!0;const s=()=>{Ya=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String($t)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),at("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?at("edit-res-company-share"):n.checked&&(n.checked=!1));s()}async function zi(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:l}=be(),u=Ot()?.[e];if(!u){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}Fe={...Fe,reservation:u,projects:l||[]},t?.(),Ku(l||[],u);const y=u.projectId&&l?.find?.(D=>String(D.id)===String(u.projectId))||null,{effectiveConfirmed:f,projectLinked:m}=Tt(u,y),p=u.items?u.items.map(D=>({...D,equipmentId:D.equipmentId??D.equipment_id??D.id,barcode:te(D?.barcode)})):[],g=Ou(u,p),_=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(D=>xo(D)).filter(Boolean);Bt(e,g,_);const q=o("reservations.list.unknownCustomer","غير معروف"),A=c?.find?.(D=>String(D.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const N=document.getElementById("edit-res-id");N&&(N.value=u.reservationId||u.id);const U=document.getElementById("edit-res-customer");U&&(U.value=A?.customerName||q);const S=typeof a=="function"?a(u.start):{date:"",time:""},I=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",S.date),n?.("edit-res-start-time",S.time),n?.("edit-res-end",I.date),n?.("edit-res-end-time",I.time);const P=document.getElementById("edit-res-notes");P&&(P.value=u.notes||"");const k=document.getElementById("edit-res-discount");if(k){const D=m?0:u.discount??0;k.value=h(D)}const H=document.getElementById("edit-res-discount-type");H&&(H.value=m?"percent":u.discountType||"percent");const $=u.projectId?!1:!!u.applyTax,j=document.getElementById("edit-res-tax");j&&(j.checked=$);const X=document.getElementById("edit-res-company-share");if(X){const D=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,R=D!=null?Number.parseFloat(h(String(D).replace("%","").trim())):NaN,M=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,W=M!=null?M===!0||M===1||M==="1"||String(M).toLowerCase()==="true":Number.isFinite(R)&&R>0,ie=W&&Number.isFinite(R)&&R>0?R:$t,ne=$||W;X.checked=ne,X.dataset.companyShare=String(ie)}ws(f,{disable:m});const C=document.getElementById("edit-res-paid"),B=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");C&&(C.value=B,C.dataset&&delete C.dataset.userSelected);const x=document.getElementById("edit-res-payment-progress-type"),Y=document.getElementById("edit-res-payment-progress-value");x?.dataset?.userSelected&&delete x.dataset.userSelected,x&&(x.value="percent"),Uu(Y);let K=Array.isArray(u.crewAssignments)&&u.crewAssignments.length?u.crewAssignments:Array.isArray(u.techniciansDetails)&&u.techniciansDetails.length?u.techniciansDetails:(u.technicians||[]).map(D=>String(D));if(!Array.isArray(K)||K.length===0){const D=Bc(u.id??u.reservationId??u.reservation_code??null);Array.isArray(D)&&D.length&&(K=D)}try{await er()}catch(D){console.warn("[reservationsEdit] positions load failed (non-fatal)",D)}if(Dc(K),s?.(g),typeof window<"u"){const D=window?.renderEditPaymentHistory;typeof D=="function"&&D()}Io(),r?.();const F=document.getElementById("editReservationModal");Es=Vu(F,i),Es?.show?.()}async function Qu({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:r,populateEquipmentDescriptionLists:i,handleReservationsMutation:c}={}){if(dn===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const l=document.getElementById("edit-res-start")?.value?.trim(),d=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),y=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",f=document.getElementById("edit-res-notes")?.value||"",m=h(document.getElementById("edit-res-discount")?.value||"0");let p=parseFloat(m)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const v=As(),_=document.getElementById("edit-res-paid"),q=_?.dataset?.userSelected==="true",A=q&&_?.value||"unpaid",N=document.getElementById("edit-res-payment-progress-type"),U=document.getElementById("edit-res-payment-progress-value"),S=wo(N),I=Ao(U),P=document.getElementById("edit-res-project")?.value||"",k=Tc();k.map(G=>G?.technicianId).filter(Boolean);const H=document.getElementById("edit-res-company-share"),$=document.getElementById("edit-res-tax");if(!l||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const j=typeof e=="function"?e:(G,ge)=>`${G}T${ge||"00:00"}`,X=j(l,d),C=j(u,y);if(X&&C&&new Date(X)>new Date(C)){E(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const x=Ot()?.[dn];if(!x){E(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(lt)||lt.length===0&&k.length===0){E(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const Y=typeof t=="function"?t:()=>!1,K=x.id??x.reservationId;for(const G of lt){if(G?.type==="package"&&Array.isArray(G.packageItems)){for(const L of G.packageItems){const re=L?.barcode??L?.normalizedBarcode??"";if(!re)continue;const ye=Et(re);if(ye==="reserved"){const he=te(re);if(!Y(he,X,C,K))continue}if(ye!=="available"){E(Gt(ye));return}}continue}const ge=Et(G.barcode);if(ge==="reserved"){const L=te(G.barcode);if(!Y(L,X,C,K))continue}if(ge!=="available"){E(Gt(ge));return}}for(const G of lt){if(G?.type==="package"&&Array.isArray(G.packageItems)){for(const L of G.packageItems){const re=te(L?.barcode??L?.normalizedBarcode??"");if(re&&Y(re,X,C,K)){const ye=L?.desc||L?.barcode||o("reservations.create.packages.unnamedItem","معدة بدون اسم"),he=`${o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${h(String(ye))})`;E(he);return}}continue}const ge=te(G.barcode);if(Y(ge,X,C,K)){E(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const F=typeof n=="function"?n:()=>!1;for(const G of lt){if(G?.type!=="package")continue;const ge=G.packageId??G.package_id??null;if(ge&&F(ge,X,C,K)){const L=G.desc||G.packageName||o("reservations.create.packages.genericName","الحزمة");E(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${h(String(L))} محجوزة بالفعل في الفترة المختارة`));return}}const D=typeof a=="function"?a:()=>!1;for(const G of k)if(G?.technicianId&&D(G.technicianId,X,C,K)){E(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const R=Array.isArray(Fe.projects)&&Fe.projects.length?Fe.projects:be().projects||[],M=P&&R.find(G=>String(G.id)===String(P))||null,W={...x,projectId:P?String(P):null,confirmed:v},{effectiveConfirmed:ie,projectLinked:ne,projectStatus:ue}=Tt(W,M);let O=!!H?.checked,oe=!!$?.checked;if(ne&&(O&&(H.checked=!1,O=!1),oe=!1),!ne&&O!==oe){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}oe&&(at("edit-res-company-share"),O=!!H?.checked);let Ee=O?getCompanySharePercent("edit-res-company-share"):null;O&&(!Number.isFinite(Ee)||Ee<=0)&&(at("edit-res-company-share"),Ee=getCompanySharePercent("edit-res-company-share"));const we=O&&oe&&Number.isFinite(Ee)&&Ee>0,Te=ne?!1:oe;ne&&(p=0,g="percent");const Q=Ls(lt,p,g,Te,k,{start:X,end:C,companySharePercent:we?Ee:0});let Z=Da();if(Number.isFinite(I)&&I>0){const G=Q;let ge=null,L=null;S==="amount"?(ge=I,G>0&&(L=I/G*100)):(L=I,G>0&&(ge=I/100*G));const re=xo({type:S,value:I,amount:ge,percentage:L,recordedAt:new Date().toISOString()});re&&(Z=[...Z,re],si(Z)),U&&(U.value="")}const se=Ts({totalAmount:Q,history:Z}),Ae=Ns({manualStatus:A,paidAmount:se.paidAmount,paidPercent:se.paidPercent,totalAmount:Q});_&&!q&&(_.value=Ae,_.dataset&&delete _.dataset.userSelected);let ze=x.status??"pending";ne?ze=M?.status??ue??ze:["completed","cancelled"].includes(String(ze).toLowerCase())||(ze=v?"confirmed":"pending");const ae=Wi({reservationCode:x.reservationCode??x.reservationId??null,customerId:x.customerId,start:X,end:C,status:ze,title:x.title??null,location:x.location??null,notes:f,projectId:P?String(P):null,totalAmount:Q,discount:p,discountType:g,applyTax:Te,paidStatus:Ae,confirmed:ie,items:lt.map(G=>({...G,equipmentId:G.equipmentId??G.id})),crewAssignments:k,companySharePercent:we?Ee:null,companyShareEnabled:we,paidAmount:se.paidAmount,paidPercentage:se.paidPercent,paymentProgressType:se.paymentProgressType,paymentProgressValue:se.paymentProgressValue,paymentHistory:Z});try{Mi("about to submit",{editingIndex:dn,crewAssignments:k,techniciansPayload:ae?.technicians,payload:ae});const G=await Nc(x.id||x.reservationId,ae);Mi("server response",{reservation:G?.id??G?.reservationId??G?.reservation_code,technicians:G?.technicians,crewAssignments:G?.crewAssignments,techniciansDetails:G?.techniciansDetails}),await tr(),Mn(),Me(),E(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),Eo(),c?.({type:"updated",reservation:G}),r?.(),i?.(),Es?.hide?.()}catch(G){console.error("❌ [reservationsEdit] Failed to update reservation",G);const ge=Sa(G)?G.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");E(ge,"error")}}function wm(e={}){Fe={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=Fe,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=h(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{Is("tax")}),c.dataset.listenerAttached="true");const l=document.getElementById("edit-res-company-share");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{Is("share")}),l.dataset.listenerAttached="true");const d=document.getElementById("edit-res-payment-progress-type");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{d.dataset.userSelected="true",t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const y=document.getElementById("edit-res-project");y&&!y.dataset.listenerAttached&&(y.addEventListener("change",()=>{Io();const v=Array.isArray(Fe.projects)&&Fe.projects.length?Fe.projects:be().projects||[],_=y.value&&v.find(S=>String(S.id)===String(y.value))||null,A={...Fe?.reservation??{},projectId:y.value||null,confirmed:As()},{effectiveConfirmed:N,projectLinked:U}=Tt(A,_);ws(N,{disable:U}),t?.()}),y.dataset.listenerAttached="true");const f=document.getElementById("edit-res-confirmed-btn");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{if(f.disabled)return;const v=!As();ws(v),t?.()}),f.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{Qu(Fe).catch(v=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",v)})}),m.dataset.listenerAttached="true");const p=document.getElementById("edit-res-equipment-barcode");if(p&&!p.dataset.listenerAttached){let v=null;const _=()=>{p.value?.trim()&&(clearTimeout(v),v=null,n?.(p))};p.addEventListener("keydown",A=>{A.key==="Enter"&&(A.preventDefault(),_())});const q=()=>{if(clearTimeout(v),!p.value?.trim())return;const{start:A,end:N}=getEditReservationDateRange();!A||!N||(v=setTimeout(()=>{_()},150))};p.addEventListener("input",q),p.addEventListener("change",_),p.dataset.listenerAttached="true"}So?.();const g=document.getElementById("editReservationModal");g&&!g.dataset.cleanupAttached&&(g.addEventListener("hidden.bs.modal",()=>{Eo(),t?.(),s?.([])}),g.dataset.cleanupAttached="true")}const Gu=be()||{};let nt=(Gu.projects||[]).map(Ju),Hn=!1;function Am(){return nt}function Fa(e){nt=Array.isArray(e)?e.map(ri):[],ks({projects:nt});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return nt}async function Wu(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,l])=>{l==null||l===""||t.set(c,String(l))});const n=t.toString(),s=(await mt(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(ii);return Fa(i),Hn=!0,nt}async function Xu({force:e=!1,params:t=null}={}){if(!e&&Hn&&nt.length>0)return nt;try{return await Wu(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),nt}}async function xm(e){const t=await mt("/projects/",{method:"POST",body:e}),n=ii(t?.data??{}),a=[...nt,n];return Fa(a),Hn=!0,n}async function Im(e,t){const n=await mt(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=ii(n?.data??{}),s=nt.map(r=>String(r.id)===String(e)?a:r);return Fa(s),Hn=!0,a}async function _m(e){await mt(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=nt.filter(n=>String(n.id)!==String(e));Fa(t),Hn=!0}function km({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:l,paymentStatus:d,equipmentEstimate:u=0,expenses:y=[],taxAmount:f=0,totalWithTax:m=0,discount:p=0,discountType:g="percent",companyShareEnabled:v=!1,companySharePercent:_=null,companyShareAmount:q=0,paidAmount:A=null,paidPercentage:N=null,paymentProgressType:U=null,paymentProgressValue:S=null,confirmed:I=!1,technicians:P=[],equipment:k=[],payments:H,paymentHistory:$}={}){const j=Array.isArray(P)?P.map(R=>Number.parseInt(String(R),10)).filter(R=>Number.isInteger(R)&&R>0):[],X=Array.isArray(k)?k.map(R=>{const M=Number.parseInt(String(R.equipmentId??R.equipment_id??R.id??0),10),W=Number.parseInt(String(R.qty??R.quantity??0),10);return!Number.isInteger(M)||M<=0?null:{equipment_id:M,quantity:Number.isInteger(W)&&W>0?W:1}}).filter(Boolean):[],C=Array.isArray(y)?y.map(R=>{const M=Number.parseFloat(R?.amount??R?.value??0)||0,W=(R?.label??R?.name??"").trim();return W?{label:W,amount:Math.round(M*100)/100}:null}).filter(Boolean):[],B=C.reduce((R,M)=>R+(M?.amount??0),0),x={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!l,payment_status:d??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(B*100)/100,tax_amount:Math.round((Number.parseFloat(f)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(m)||0)*100)/100,confirmed:!!I,technicians:j,equipment:X,expenses:C},Y=Math.max(0,Number.parseFloat(p)||0);x.discount=Y,x.discount_type=g==="amount"?"amount":"percent";const K=Number.parseFloat(_),F=!!v&&Number.isFinite(K)&&K>0;x.company_share_enabled=F,x.company_share_percent=F?K:0,x.company_share_amount=F?Math.max(0,Number.parseFloat(q)||0):0,Number.isFinite(Number(A))&&(x.paid_amount=Math.max(0,Number.parseFloat(A)||0)),Number.isFinite(Number(N))&&(x.paid_percentage=Math.max(0,Number.parseFloat(N)||0)),(U==="amount"||U==="percent")&&(x.payment_progress_type=U),S!=null&&S!==""&&(x.payment_progress_value=Number.parseFloat(S)||0),e&&(x.project_code=String(e).trim());const D=H!==void 0?H:$;if(D!==void 0){const R=_o(D)||[];x.payments=R.map(M=>({type:M.type,amount:M.amount!=null?M.amount:null,percentage:M.percentage!=null?M.percentage:null,value:M.value!=null?M.value:null,note:M.note??null,recorded_at:M.recordedAt??null}))}return x.end_datetime||delete x.end_datetime,x.client_company||(x.client_company=null),x}function ii(e={}){return ri(e)}function Ju(e={}){return ri(e)}function ri(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(m=>{if(m==null)return null;if(typeof m=="object"){const p=m.id??m.technician_id??m.technicianId;return p!=null?String(p):null}return String(m)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(m=>{const p=m?.equipment_id??m?.equipmentId??m?.id??null,g=m?.quantity??m?.qty??0,v=m?.barcode??m?.code??"",_=m?.description??m?.name??"";return{equipmentId:p!=null?String(p):null,qty:Number.parseInt(String(g),10)||0,barcode:v,description:_}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((m,p)=>({id:m?.id??`expense-${t??"x"}-${p}`,label:m?.label??"",amount:Number.parseFloat(m?.amount??0)||0})),l=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,d=e.company_share_enabled??e.companyShareEnabled,u=d!=null?d===!0||d===1||String(d).toLowerCase()==="true":l>0,y=e.payment_history??e.paymentHistory??e.payments??null,f=_o(y);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?l:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(m=>typeof m=="object"?m:{id:m}),equipment:r,expenses:c,paymentHistory:f}}function $m(e){return e instanceof Hi}function Za(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function Yu(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=Za(e.value);let s=Za(e.amount),r=Za(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,l=e.recordedAt??e.recorded_at??e.date??null;let d=null;if(l){const y=new Date(l);Number.isNaN(y.getTime())||(d=y.toISOString())}d||(d=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:d}}function _o(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>Yu(t)).filter(Boolean):[]}const ha="reservations-ui:ready",zt=typeof EventTarget<"u"?new EventTarget:null;let Ht={};function Zu(e){return Object.freeze({...e})}function em(){if(!zt)return;const e=Ht,t=typeof CustomEvent=="function"?new CustomEvent(ha,{detail:e}):{type:ha,detail:e};typeof zt.dispatchEvent=="function"&&zt.dispatchEvent(t)}function tm(e={}){if(!e||typeof e!="object")return Ht;const t={...Ht};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),Ht=Zu(t),em(),Ht}function nm(e){if(e)return Ht?.[e]}function Pm(e){const t=nm(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const i=(s?.detail||Ht)?.[e];typeof i=="function"&&(zt&&zt.removeEventListener(ha,a),n(i))};zt&&zt.addEventListener(ha,a)})}function Cm(){return Xu().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=be()||{};Fc(e||[]),Lr()})}function oi(e=null){Lr(),ko(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function am(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function _s(){return{populateEquipmentDescriptionLists:Lt,setFlatpickrValue:ju,splitDateTime:Ki,renderEditItems:Nt,updateEditReservationSummary:Ye,addEquipmentByDescription:Nu,addEquipmentToEditingReservation:Tu,addEquipmentToEditingByDescription:ga,combineDateTime:Tn,hasEquipmentConflict:pt,hasTechnicianConflict:Gi,renderReservations:ko,handleReservationsMutation:oi,ensureModal:am}}function ko(e="reservations-list",t=null){hu({containerId:e,filters:t,onShowDetails:$o,onConfirmReservation:Co})}function $o(e){return vu(e,{getEditContext:_s,onEdit:(t,{reservation:n})=>{Lo(t,n)},onDelete:Po})}function Po(e){return Wt()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?Su(e,{onAfterChange:oi}):!1:(Fn(),!1)}function Co(e){return Eu(e,{onAfterChange:oi})}function Lo(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}zi(e,_s());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}zi(e,_s());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}qc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Lm(){tm({showReservationDetails:$o,deleteReservation:Po,confirmReservation:Co,openReservationEditor:Lo})}export{tm as A,$o as B,ii as C,ym as D,hn as E,bm as F,Am as G,$m as H,Nr as I,gm as J,qm as K,dm as L,um as M,Wu as N,mm as O,fm as P,pm as Q,hm as R,_m as S,xm as T,sd as U,Br as V,Dr as W,vm as X,Xu as a,Lm as b,wm as c,Em as d,Sm as e,Lr as f,_s as g,me as h,cm as i,oi as j,_i as k,Cm as l,Pa as m,Me as n,Kc as o,sa as p,rm as q,ko as r,lm as s,om as t,Ye as u,nm as v,Pm as w,Tr as x,km as y,Im as z};
