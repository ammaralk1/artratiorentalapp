import{n as v,l as ye,A as Ac,t as o,a as rt,s as E,u as tn,c as Hn,d as ka,b as Gi,z as xc,f as Ye,B as Wi,o as Ic}from"./auth.CqiyQgTP.js";import{A as te,B as bt,C as Xi,E as _c,D as Nt,F as Ds,n as Qe,G as Ji,H as qi,I as Fn,J as Rn,K as $a,L as kc,M as Fs,N as gt,O as Rs,P as Sn,Q as Yi,R as Zi,S as $c,T as Pc,U as Cc,V as er,W as nn,X as da,Y as Lc,Z as Pa,_ as tr,$ as nr,a as Ms,o as zs,q as Os,a0 as ar,a1 as Tc,s as bn,b as Ca,a2 as Nc,a3 as sr,a4 as jc,i as Hs,r as Ft,a5 as ir,a6 as Ct,a7 as ua,m as qe,p as je,y as La,l as rr,a8 as Bc,a9 as ls,h as or,g as Wt,aa as Dc,ab as Fc,k as cr,ac as ds,ad as Rc,u as Mc,ae as zc,af as Oc,ag as Hc,ah as Vc}from"./reservationsService.BpD8vLL-.js";const Za="select.form-select:not([data-no-enhance]):not([multiple])",ht=new WeakMap;let es=null,Si=!1,Et=null;function bp(e=document){e&&(e.querySelectorAll(Za).forEach(t=>ia(t)),!es&&e===document&&(es=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(Za)&&ia(a),a.querySelectorAll?.(Za).forEach(s=>ia(s)))})}),es.observe(document.body,{childList:!0,subtree:!0})),Si||(Si=!0,document.addEventListener("pointerdown",Qc,{capture:!0})))}function sa(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){ia(e);return}const t=e.closest(".enhanced-select");t&&(Vs(t),pa(t),us(t))}function ia(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){sa(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};ht.set(t,r),a.addEventListener("click",()=>Kc(t)),a.addEventListener("keydown",i=>Gc(i,t)),s.addEventListener("click",i=>Xc(i,t)),s.addEventListener("keydown",i=>Wc(i,t)),e.addEventListener("change",()=>{pa(t),lr(t)}),r.observer=new MutationObserver(i=>{let c=!1,l=!1;for(const d of i)d.type==="attributes"&&d.attributeName==="disabled"&&(l=!0),d.type==="childList"&&(c=!0);l&&us(t),c&&Uc(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),Vs(t),pa(t),us(t)}function Uc(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,Vs(t),pa(t)})))}function Vs(e){const t=ht.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),lr(e)}function pa(e){const t=ht.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function lr(e){const t=ht.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function us(e){const t=ht.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function Kc(e){ht.get(e)&&(e.getAttribute("data-open")==="true"?En(e):dr(e))}function dr(e){const t=ht.get(e);if(!t)return;Et&&Et!==e&&En(Et,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),Et=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function En(e,{focusTrigger:t=!0}={}){const n=ht.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),Et===e&&(Et=null))}function Qc(e){if(!Et)return;const t=e.target;t instanceof Node&&(Et.contains(t)||En(Et,{focusTrigger:!1}))}function Gc(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),dr(t)):n==="Escape"&&En(t)}function Wc(e,t){const n=e.key,a=ht.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&ur(i,t)}else n==="Escape"&&(e.preventDefault(),En(t))}function Xc(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&ur(n,t)}function ur(e,t){const n=ht.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),En(t)}const wn=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let wt=null;function Us(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function pr(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function Jc(e={}){const t={...e};return t.barcode&&(t.barcode=v(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function Yc(e={}){const t=Jc({...e,activatedAt:Date.now()});return wt=t,pr(!0,t.mode||"create"),Us(wn.change,{active:!0,selection:{...t}}),t}function ma(e="manual"){if(!wt)return;const t=wt;wt=null,pr(!1),Us(wn.change,{active:!1,previous:t,reason:e})}function mr(){return!!wt}function Zc(){return wt?{...wt}:null}function el(e){if(!wt)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=v(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:r,description:i}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const l=c.map(u=>v(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!l.length)return!1;const d=Number.isInteger(s)&&s>0?s:l.length;t={barcodes:l,quantity:Math.min(d,l.length)},r&&(t.groupKey=r),i&&(t.description=i)}else return!1;return Us(wn.requestAdd,{...t,selection:{...wt}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||ma("tab-changed")});const tl=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),nl=new Set(["maintenance","reserved","retired"]);function al(e){const t=String(e??"").trim().toLowerCase();return t&&tl.get(t)||"available"}function sl(e){return e?typeof e=="object"?e:Ta(e):null}function It(e){const t=sl(e);return t?al(t.status||t.state||t.statusLabel||t.status_label):"available"}function Ks(e){return!nl.has(It(e))}function an(e={}){return e.image||e.imageUrl||e.img||""}function il(e){if(!e)return null;const t=te(e),{equipment:n=[]}=ye();return(n||[]).find(a=>te(a?.barcode)===t)||null}function Ta(e){const t=te(e);if(!t)return null;const{equipment:n=[]}=ye();return(n||[]).find(a=>te(a?.barcode)===t)||null}const rl=ye()||{};let Lt=(rl.equipment||[]).map(ll),ps=!1,pn="",Kt=null,Jt=null,Yt=null,Na=!1,Ei=!1;function ol(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function cl(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function ll(e={}){return Qs({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function ja(e={}){return Qs(e)}function Qs(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=Vn(e.quantity??e.qty??0),i=Ba(e.unit_price??e.price??0),c=v(String(e.barcode??"").trim()),l=Oe(e.status??e.state??e.status_label??e.statusLabel??"available"),d=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:dl(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:l,image:d,imageUrl:d,created_at:e.created_at??null,updated_at:e.updated_at??null}}function dl(e){return e!=null&&e!==""}function Vn(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function Ba(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function ul(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=v(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function wi(e){if(!e)return"";const t=v(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=v(String(n?.barcode??"")).trim();if(a)return a}return""}function pl(e,t){const n=wi(e),a=wi(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}else{if(r!==i)return r?-1:1;{const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}}const c=fa(e?.desc||e?.description||e?.name||""),l=fa(t?.desc||t?.description||t?.name||"");return c.localeCompare(l,"ar",{sensitivity:"base"})}function Le(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Oe(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function ml(e){return Oe(e)}function ms(){if(!mr())return null;const e=Zc();return e?{...e}:null}function fl(e){const t=ms();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:r=null}=t,i=t?.mode||t?.source||"",c=[],l=new Set;if(n.forEach(f=>{const p=te(f?.barcode);!p||l.has(p)||(l.add(p),c.push({variant:f,barcode:p}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(i==="package-manager"||i==="equipment-packages"){const f=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:p})=>p),maxQuantity:f,reason:""}}const d=c.filter(({variant:f})=>Ks(f));if(!a||!s)return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=d.filter(({barcode:f})=>!bt(f,a,s,r));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:f})=>f),maxQuantity:u.length};let y=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(d.length>0)y=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const f=new Set(c.map(({variant:p})=>Oe(p?.status)));f.has("maintenance")?y=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):f.has("reserved")?y=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):f.has("retired")&&(y=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:y,availableBarcodes:[],maxQuantity:0}}function yl(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function fr(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=ms();e.hidden=!s;const r=s?.mode||s?.source||"";s?r==="package-manager"||r==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=ms(),l=c?.mode||c?.source||"";l==="package-manager"||l==="equipment-packages"?ma("package-finish-button"):(ma("return-button"),yl())}),t.dataset.listenerAttached="true")}function Ze(){return Lt}function Zt(e){Lt=Array.isArray(e)?e.map(Qs):[],ka({equipment:Lt}),cl()}function fa(e){return String(e??"").trim().toLowerCase()}function jt(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=fa(t);return n||(n=fa(e.category||"")),n||(n=v(String(e.barcode||"")).trim().toLowerCase()),n}function Da(e){const t=jt(e);return t?Ze().filter(n=>jt(n)===t):[]}function Fa(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=Ra(e);if(n){const a=Le(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${Le(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function Gs(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function ya(){const e=Gs();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function Ws(e={}){const t=Gs();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?v(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?v(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function gn(e){Na=e;const t=Gs(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function bl(e){if(!tn()){Hn();return}if(!e)return;try{await hl()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let l=0;if(i.forEach(d=>{const u=d.القسم??d.category??"",y=d["القسم الثانوي"]??d.subcategory??"",f=d.الوصف??d.description??d.name??"",p=d.الكمية??d.quantity??0,m=d.السعر??d.price??0,g=d.الباركود??d.barcode??"",h=d.الحالة??d.status??"متاح",_=d.الصورة??d.image_url??d.image??"",q=v(String(g||"")).trim();if(!f||!q){l+=1;return}c.push(Xs({category:u,subcategory:y,description:f,quantity:p,unit_price:m,barcode:q,status:h,image_url:_}))}),!c.length){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const d=await rt("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(d?.data)?d.data.map(ja):[];if(u.length){const p=[...Ze(),...u];Zt(p)}await Un({showToastOnError:!1}),Re();const y=d?.meta?.count??u.length,f=[];y&&f.push(`${y} ✔️`),l&&f.push(`${l} ⚠️`),E(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(f.length?` (${f.join(" / ")})`:""))}catch(d){const u=xn(d,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");E(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const gl="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let $n=null;function hl(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):$n||($n=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=gl,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),$n=null,e}),$n)}function Xs({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const l=v(String(r||"")).trim(),d=ml(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:Vn(a),unit_price:Ba(s),barcode:l,status:d,image_url:c?.trim()||null}}async function yr(){if(!tn()){Hn();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await rt("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await Un({showToastOnError:!1}),E(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=xn(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");E(t,"error")}}function Ra(e){return e.image||e.imageUrl||e.img||""}function vl(e){const t=Oe(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function ba(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${Le(a)}</td></tr>`}n&&(n.textContent="0")}function br(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=Kt?.groupKey||jt(e);if(!r){ba();return}const i=Ze().filter(y=>jt(y)===r).sort((y,f)=>{const p=String(y.barcode||"").trim(),m=String(f.barcode||"").trim();return!p&&!m?0:p?m?p.localeCompare(m,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){ba();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),l=o("equipment.form.labels.quantity","الكمية"),d=Ze(),u=i.map(y=>{const f=y.id&&e.id?String(y.id)===String(e.id):String(y.barcode||"")===String(e.barcode||""),p=f?"equipment-variants-table__row--current":"",m=Le(String(y.barcode||"-")),g=f?`<span class="equipment-variants-current-badge">${Le(c)}</span>`:"",h=v(String(Number.isFinite(Number(y.qty))?Number(y.qty):0)),_=d.indexOf(y),q=Le(o("equipment.item.actions.delete","🗑️ حذف")),A=_>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${_}">${q}</button>
          </div>`:"";return`
        <tr class="${p}">
          <td>
            ${m}
            ${g}
          </td>
          <td>${vl(y.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${Le(l)}">${h}</span>
          </td>
          <td class="table-actions-cell">${A}</td>
        </tr>
      `}).join("");n.innerHTML=u}function ql({item:e,index:t}){const n=Ra(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=tn(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},l=Number.isFinite(Number(e.qty))?Number(e.qty):0,d=Number.isFinite(Number(e.price))?Number(e.price):0,u=l.toLocaleString("en-US"),y=d.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),f=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,p=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,m=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(l-f-p,0),g=m.toLocaleString("en-US"),h=o("equipment.card.labels.availableOfTotal","من أصل"),_=Oe(e.status);let q=`${Le(c.available)}: ${Le(g)} ${Le(h)} ${Le(u)}`,A="available";if(m===0){const M={reserved:{text:l===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},W=M[_]||M.default;q=Le(W.text),A=W.modifier}const N=`<span class="equipment-card__availability equipment-card__availability--${A}">${q}</span>`,U="",S=e.desc||e.name||"—",I=e.name&&e.name!==e.desc?e.name:"",k=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${y} ${r}`}].map(({label:M,value:W})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${M}</span>
              <span class="equipment-card__detail-value">${W}</span>
            </span>
          `).join("")}
    </div>`,O=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),$=O.length?`<div class="equipment-card__categories">${O.map(({label:M,value:W})=>`
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
  `,B=[],x=fl(e),Y=x?.availableBarcodes?.length?x.availableBarcodes.join(","):x?.barcode?x.barcode:"";let K="",F="";if(x.active){const M=`equipment-select-qty-${t}`,W=!!x.canSelect,ie=W?Math.max(1,Number(x.maxQuantity||x.availableBarcodes?.length||1)):1,ne=Math.max(1,Math.min(ie,99)),ue=[];for(let se=1;se<=ne;se+=1){const Ae=v(String(se));ue.push(`<option value="${se}"${se===1?" selected":""}>${Ae}</option>`)}const H=W?"":" disabled",oe=o("reservations.create.equipment.selector.quantityLabel","الكمية"),Ee=W?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${v(String(ie))}`:x.reason?x.reason:"";K=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${M}">${oe}</label>
        <select class="equipment-card__quantity-select" id="${M}" data-equipment-select-quantity${H}>
          ${ue.join("")}
        </select>
        ${Ee?`<span class="equipment-card__selection-hint">${Le(Ee)}</span>`:""}
      </div>
    `;const we=o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),Ne=W?"":" disabled",Q=x.reason?` title="${Le(x.reason)}"`:"",Z=['data-equipment-action="select-reservation"',`data-selection-max="${W?ie:0}"`];Y&&Z.push(`data-selection-barcodes="${Le(Y)}"`),e.groupKey&&Z.push(`data-selection-group="${Le(String(e.groupKey))}"`),F=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${Z.join(" ")}${Ne}${Q}>${we}</button>
    `}i&&B.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const D=B.length?B.join(`
`):"",R=Le(S);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${Le(String(e.groupKey))}"`:""}
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
  `}function Sl(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,a.appendChild(l)}),t.includes(i)&&(a.value=i),sa(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,s.appendChild(l)}),n.includes(i)&&(s.value=i),sa(s)}const r=document.getElementById("filter-status");r&&sa(r)}function An(){const e=ye();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return Lt=t||[],Lt;const s=new Date;let r=!1;const i=new Set((a||[]).filter(l=>l?.status==="open").map(l=>v(String(l?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(l=>{if(!l)return l;const d=Oe(l.status),u=v(String(l.barcode??"")).trim().toLowerCase(),y=u&&i.has(u);let f=y?"maintenance":"available";if(!y&&u)for(const p of n||[]){if(!El(p,s))continue;if(p.items?.some(g=>v(String(g?.barcode??"")).trim().toLowerCase()===u)){f="reserved";break}}return f!==d?(r=!0,{...l,status:f}):{...l,status:f}});return r?Zt(c):(Lt=c,ka({equipment:Lt})),Lt}function El(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function ts(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Re(){const e=document.getElementById("equipment-list");if(!e)return;fr();const t=An(),n=Array.isArray(t)?t:Ze(),a=new Map;n.forEach(g=>{if(!g)return;const h=jt(g);h&&(a.has(h)||a.set(h,[]),a.get(h).push(g))});const s=Array.from(a.values()).map(g=>{const h=g[0],_=g.reduce((I,P)=>I+(Number.isFinite(Number(P.qty))?Number(P.qty):0),0),q=["maintenance","reserved","available","retired"],A=g.map(I=>Oe(I.status)).sort((I,P)=>q.indexOf(I)-q.indexOf(P))[0]||"available",N=g.reduce((I,P)=>{const k=Vn(P?.qty??0)||0,O=Oe(P?.status);return O==="reserved"?I.reserved+=k:O==="maintenance"&&(I.maintenance+=k),I},{reserved:0,maintenance:0}),U=Math.max(_-N.reserved-N.maintenance,0);return{item:{...h,qty:_,status:A,variants:g,groupKey:jt(h),reservedQty:N.reserved,maintenanceQty:N.maintenance,availableQty:U},index:n.indexOf(h)}});s.sort((g,h)=>pl(g.item,h.item));const r=document.getElementById("search-equipment")?.value||"",i=v(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",l=document.getElementById("filter-sub")?.value||"",d=document.getElementById("filter-status")?.value||"",u=d?Oe(d):"";if(ps&&!n.length){e.innerHTML=ts(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(pn&&!n.length){e.innerHTML=ts(pn,{tone:"error",icon:"⚠️"});return}const y=s.filter(({item:g})=>{const h=v(String(g.barcode??"")).toLowerCase().trim(),_=Array.isArray(g.variants)?g.variants.map(S=>v(String(S.barcode??"")).toLowerCase().trim()).filter(Boolean):[],q=!i||g.name&&g.name.toLowerCase().includes(i)||g.desc&&g.desc.toLowerCase().includes(i)||h&&h.includes(i)||_.some(S=>S.includes(i))||g.category&&g.category.toLowerCase().includes(i)||g.sub&&g.sub.toLowerCase().includes(i),A=!c||g.category===c,N=!l||g.sub===l,U=!u||Oe(g.status)===u;return q&&A&&N&&U}),f=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),p=y;e.innerHTML=p.length?p.map(ql).join(""):ts(f);const m=document.getElementById("equipment-list-count");if(m){const g=o("equipment.list.countSuffix","عنصر"),h=v(String(p.length)),_=p.length?`${h} ${g}`:`0 ${g}`;m.textContent=_}Sl(n)}async function Un({showToastOnError:e=!0}={}){ps=!0,pn="",Re();try{const t=await rt("/equipment/?all=1"),n=t?.data??t;let a=[];Array.isArray(n)?a=n:n&&typeof n=="object"&&(Array.isArray(n.items)?a=n.items:Array.isArray(n.results)?a=n.results:Array.isArray(n.data)?a=n.data:Array.isArray(n.records)&&(a=n.records));const s=a.map(ja);Zt(s)}catch(t){t&&typeof t=="object"&&Number(t.status)===401?pn="":(pn=xn(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&E(pn,"error"))}finally{ps=!1,Re()}}function xn(e,t,n){if(e instanceof Gi){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function wl(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=v(a).trim(),r=Ba(t.querySelector("#new-equipment-price")?.value||"0"),i=Vn(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",l=t.querySelector("#new-equipment-category")?.value?.trim()||"",d=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){E(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const y=Xs({category:l,subcategory:d,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const f=await rt("/equipment/",{method:"POST",body:y}),p=ja(f?.data),m=[...Ze(),p];Zt(m),Re(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),E(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(f){const p=xn(f,"equipment.toast.addFailed","تعذر إضافة المعدة");E(p,"error")}}async function gr(e){if(!tn()){Hn();return}const t=Ze(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await rt(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),Zt(a),Re(),E(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=xn(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");E(s,"error")}}async function Al(e,t){const n=Ze(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},Zt(r),Re();return}const s=Xs({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await rt(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=ja(r?.data),c=[...n];c[e]=i,Zt(c),Re(),E(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=xn(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw E(i,"error"),r}}function ta(){Re()}function hr(e){const n=Ze()[e];if(!n)return;Jt=e;const a=Da(n),s=a[0]||n,r=a.reduce((l,d)=>l+(Number.isFinite(Number(d.qty))?Number(d.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(l=>Oe(l.status)).sort((l,d)=>i.indexOf(l)-i.indexOf(d))[0]||Oe(s.status);document.getElementById("edit-equipment-index").value=e,Ws({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:Ra(s)||"",barcode:s.barcode||"",status:s.status||c}),gn(!1),Yt=ya(),Fa(s),br(s),Kt={groupKey:jt(s),barcode:String(s.barcode||""),id:s.id||null},ol(document.getElementById("editEquipmentModal"))?.show()}function xl(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),r=s?.querySelector("[data-equipment-select-quantity]");let i=Number.parseInt(r?.value||"1",10);(!Number.isFinite(i)||i<=0)&&(i=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&i>c&&(i=c);const d=(t.dataset.selectionBarcodes||"").split(",").map(p=>p.trim()).filter(p=>p.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",y=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";el({barcodes:d,quantity:i,groupKey:y,description:u})||E(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||gr(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||hr(s)}}function Il(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||hr(n)}}function _l(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||gr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function vr(){if(!Kt||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=Ze(),a=Kt.id?n.find(l=>String(l.id)===String(Kt.id)):null,s=Kt.groupKey,r=s?n.find(l=>jt(l)===s):null,i=a||r;if(!i){ba();return}const c=n.findIndex(l=>l===i);if(c>=0){const l=document.getElementById("edit-equipment-index");l&&(l.value=String(c)),Jt=c}if(br(i),!Na){const l=Da(i),d=l[0]||i,u=l.reduce((p,m)=>p+(Number.isFinite(Number(m.qty))?Number(m.qty):0),0),y=["maintenance","reserved","available","retired"],f=l.map(p=>Oe(p.status)).sort((p,m)=>y.indexOf(p)-y.indexOf(m))[0]||Oe(d.status);Ws({category:d.category||"",subcategory:d.sub||"",description:d.desc||d.description||"",quantity:String(u||d.qty||0),price:d.price!=null?String(d.price):"0",image:Ra(d)||"",barcode:d.barcode||"",status:d.status||f}),Yt=ya()}Fa(primary)}function kl(){document.getElementById("search-equipment")?.addEventListener("input",ta),document.getElementById("filter-category")?.addEventListener("change",ta),document.getElementById("filter-sub")?.addEventListener("change",ta),document.getElementById("filter-status")?.addEventListener("change",ta),document.getElementById("add-equipment-form")?.addEventListener("submit",wl);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),yr().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",xl),t.addEventListener("keydown",Il),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",_l),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);ul(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!Na){Yt=ya(),gn(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){E(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:Vn(document.getElementById("edit-equipment-quantity").value)||1,price:Ba(document.getElementById("edit-equipment-price").value)||0,barcode:v(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await Al(t,n),Yt=ya(),gn(!1),vr()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{kl(),Re(),Un();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(Yt&&Ws(Yt),Jt!=null){const a=Ze()[Jt];if(a){const r=Da(a)[0]||a;Fa(r)}}gn(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Re(),gn(Na),Jt!=null){const t=Ze()[Jt];if(t){const a=Da(t)[0]||t;Fa(a)}}});document.addEventListener("equipment:refreshRequested",()=>{Un({showToastOnError:!1})});document.addEventListener(Ac.USER_UPDATED,()=>{Re()});document.addEventListener("equipment:changed",()=>{vr()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{Kt=null,ba(),Jt=null,Yt=null,gn(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!Ei&&(document.addEventListener(wn.change,()=>{fr(),Re()}),Ei=!0);const gp=Object.freeze(Object.defineProperty({__proto__:null,clearEquipment:yr,refreshEquipmentFromApi:Un,renderEquipment:Re,syncEquipmentStatuses:An,uploadEquipmentFromExcel:bl},Symbol.toStringTag,{value:"Module"})),$l="__DEBUG_CREW__";function Pl(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem($l);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function Ai(e,t){if(Pl())try{console.log(`🪵 [crew-debug:create] ${e}`,t)}catch{}}const qr="projects:create:draft",Sr="projects.html#projects-section";let fs=null,Er=[],ys=new Map,bs=new Map,ga=new Map,ns=!1,ra=null,xi=!1,wr=[];function Cl(e){if(!e)return null;let t=wr.find(a=>a.id===e)||null;if(t)return t;const n=Zi(e);return n?(t={id:e,name:Pc(n)||e,price:$c(n),items:Fs(n),raw:n},t):null}function ha(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function va(e){return v(String(e||"")).trim().toLowerCase()}function Ll(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=v(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function Ar(e){const t=v(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function xr(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Ir(e){if(!e)return null;const t=v(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function _r(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=v(String(t))}}function en(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function Js(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function sn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Xe(){const{input:e,hidden:t}=sn();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function Vt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function kr(e,t,{allowPartial:n=!1}={}){const a=Qe(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function gs(e,t={}){return kr(ys,e,t)}function hs(e,t={}){return kr(bs,e,t)}function Je(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function $r(e){Er=Array.isArray(e)?[...e]:[]}function Ys(){return Er}function Zs(e){return e&&Ys().find(t=>String(t.id)===String(e))||null}function Ii(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function hn(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??Nt,a=v(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:Nt}function it(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??Nt,a=v(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=Nt),t.dataset.companyShare=String(s),t.checked=!0}function vs(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(ns){pe();return}ns=!0;const a=()=>{ns=!1,pe()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(Nt)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),it()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?it():n.checked&&(n.checked=!1));a()}function Tl(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function _i(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function ki(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function At({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=Js();if(!n||!a||!s)return;const r=Ds()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const l=new Set;ys=new Map;const d=r.filter(p=>p&&p.id!=null).map(p=>({id:String(p.id),label:ki(p)||c})).filter(p=>{if(!p.label)return!1;const m=Qe(p.label);return!m||l.has(m)?!1:(l.add(m),ys.set(m,p),!0)}).sort((p,m)=>p.label.localeCompare(m.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(p=>`<option value="${ha(p.label)}"></option>`).join("");const u=t?"":n.value,y=e?String(e):a.value?String(a.value):"",f=y?r.find(p=>String(p.id)===y):null;if(f){const p=ki(f)||c;a.value=String(f.id),n.value=p,n.dataset.selectedId=String(f.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function vn({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=sn();if(!a||!s||!r)return;const i=Array.isArray(t)?t:Ys()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const l=[...i].filter(g=>g&&g.id!=null).sort((g,h)=>String(h.createdAt||h.start||"").localeCompare(String(g.createdAt||g.start||""))),d=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),y=new Set;bs=new Map;const f=l.map(g=>{const h=Ii(g)||u;return{id:String(g.id),label:h}}).filter(g=>{if(!g.label)return!1;const h=Qe(g.label);return!h||y.has(h)?!1:(y.add(h),bs.set(h,g),!0)});r.innerHTML=f.map(g=>`<option value="${ha(g.label)}"></option>`).join("");const p=e?String(e):s.value?String(s.value):"",m=p?l.find(g=>String(g.id)===p):null;if(m){const g=Ii(m)||u;s.value=String(m.id),a.value=g,a.dataset.selectedId=String(m.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function qa(e,t,n){const{date:a,time:s}=Yi(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function Pr(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||vn({selectedValue:a});const r=(Ds()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";At(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=_i(e,"start"),l=_i(e,"end");c&&qa("res-start","res-start-time",c),l&&qa("res-end","res-end-time",l);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),pe(),Bt()}function Cr({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:ye(),s=Array.isArray(a)?a:[];$r(s);const r=t!=null?String(t):n.value?String(n.value):"";vn({selectedValue:r,projectsList:s}),Bt(),pe()}function Bt(){const{input:e,hidden:t}=sn(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),l=document.getElementById("res-discount-type"),d=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),y=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(Vt(n,Xe),a&&Vt(a,Xe)),s&&Vt(s,Xe),r&&Vt(r,Xe),i&&Vt(i,Xe),c&&Vt(c,Xe),l&&Vt(l,Xe),y)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=d),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=d),s&&(s.value="unpaid",Je(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=d),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=d),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=d),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=d),l&&(l.value="percent",l.disabled=!0,l.classList.add("reservation-input-disabled"),l.title=d);else{if(n){const f=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",f&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.disabled=!1,l.classList.remove("reservation-input-disabled"),l.title="")}vs("tax"),pe()}function ei(){const{input:e,hidden:t}=sn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?hs(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=Zs(r.id);i?Pr(i,{skipProjectSelectUpdate:!0}):(Bt(),pe())}else t.value="",e.dataset.selectedId="",Bt(),pe()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?hs(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function ti(){const{input:e,hidden:t}=Js();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?gs(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),pe()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?gs(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Nl(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){Nn({clearValue:!0});return}let n=null;try{const d=decodeURIComponent(t);n=JSON.parse(d)}catch(d){console.warn("⚠️ [reservations/createForm] Failed to decode project context",d)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),Nn({clearValue:!1}),!n)return;n.fromProjectForm&&(ra={draftStorageKey:n.draftStorageKey||qr,returnUrl:n.returnUrl||Sr});const r=document.getElementById("res-project");if(n.projectId){r&&(vn({selectedValue:String(n.projectId)}),Bt());const d=Zs(n.projectId);d?Pr(d,{forceNotes:!!n.forceNotes}):pe(),Nn()}else{r&&vn({selectedValue:""});const d=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");Wl(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),d)}n.start&&qa("res-start","res-start-time",n.start),n.end&&qa("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(Ds()||[]).find(y=>String(y.id)===String(n.customerId));u?.id!=null&&(At({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(At({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):At({selectedValue:""});const l=document.getElementById("res-notes");l&&n.description&&!l.value&&(l.value=n.description),pe()}function rn(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Fn(e,n),end:Fn(t,a)}}function Lr(e){const t=va(e);if(t){const c=ga.get(t);if(c)return c}const{description:n,barcode:a}=Ar(e);if(a){const c=Ta(a);if(c)return c}const s=Qe(n||e);if(!s)return null;let r=er();if(!r?.length){const c=ye();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&sr(r)}const i=r.find(c=>Qe(c?.desc||c?.description||"")===s);return i||r.find(c=>Qe(c?.desc||c?.description||"").includes(s))||null}function Tr(e,t="equipment-description-options"){const n=va(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(l=>va(l.value)===n)||ga.has(n))return!0;const{description:s}=Ar(e);if(!s)return!1;const r=Qe(s);return r?(er()||[]).some(c=>Qe(c?.desc||c?.description||"")===r):!1}const jl={available:0,reserved:1,maintenance:2,retired:3};function Bl(e){return jl[e]??5}function $i(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function Dl(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${$i(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${$i(n)})`}function Dt(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=An(),a=ye(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];sr(r);const i=new Map;r.forEach(d=>{const u=Ll(d),y=va(u);if(!y||!u)return;const f=It(d),p=Bl(f),m=i.get(y);if(!m){i.set(y,{normalized:y,value:u,bestItem:d,bestStatus:f,bestPriority:p,statuses:new Set([f])});return}m.statuses.add(f),p<m.bestPriority&&(m.bestItem=d,m.bestStatus=f,m.bestPriority=p,m.value=u)}),ga=new Map;const l=Array.from(i.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{ga.set(d.normalized,d.bestItem);const u=Dl(d),y=ha(d.value);if(u===d.value)return`<option value="${y}"></option>`;const f=ha(u);return`<option value="${y}" label="${f}"></option>`}).join("");e&&(e.innerHTML=l),t&&(t.innerHTML=l)}function Nr(e,t,n={}){const{silent:a=!1}=n,s=te(e);if(!s)return{success:!1,message:null};const{start:r,end:i}=rn();if(!r||!i){const m=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||E(m),{success:!1,message:m}}const c=gt();if(ni(c).has(s)){const m=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||E(m),{success:!1,message:m}}const d=Rs(s,r,i);if(d.length){const m=d.map(h=>h.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`);return a||E(g),{success:!1,message:g}}if(bt(s,r,i)){const m=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||E(m),{success:!1,message:m}}const u=Ta(s);if(!u){const m=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||E(m),{success:!1,message:m}}const y=It(u);if(y==="maintenance"||y==="retired"){const m=en(y);return a||E(m),{success:!1,message:m}}const f=nn(u);if(!f){const m=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||E(m),{success:!1,message:m}}$a({id:f,equipmentId:f,barcode:s,desc:u.desc,qty:1,price:u.price,image:an(u)}),t&&(t.value=""),_t(),pe();const p=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||E(p),{success:!0,message:p,barcode:s}}function qs(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Lr(t);if(!n){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=il(n.barcode),s=It(a||n);if(s==="maintenance"||s==="retired"){E(en(s));return}const r=te(n.barcode);if(!r){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=nn(n);if(!i){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:an(n)},{start:l,end:d}=rn();if(!l||!d){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=gt();if(ni(u).has(r)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const f=Rs(r,l,d);if(f.length){const p=f.map(m=>m.name).join(", ");E(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${p}`));return}if(bt(r,l,d)){E(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}$a(c),_t(),pe(),E(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function Fl(){Dt();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),qs(e))});const t=()=>{Tr(e.value,"equipment-description-options")&&qs(e)};e.addEventListener("focus",()=>{if(Dt(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Pi(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function ni(e=gt()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=te(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const r=te(s?.normalizedBarcode??s?.barcode);r&&t.add(r)})}),t}function Rl(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=rn();if(!t||!n){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}Yc({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):E(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(wn.change,t=>{Pi(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),Pi(e,mr()))}function Ml(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,r=a.length?a:t.barcode?[t.barcode]:[];if(!r.length)return;let i=0,c=null;const l=[],d=new Set;r.forEach(y=>{const f=te(y);f&&!d.has(f)&&(d.add(f),l.push(f))});const u=Math.min(s,l.length);for(let y=0;y<u;y+=1){const f=l[y],p=Nr(f,null,{silent:!0});p.success&&(i+=1),p.message&&(c=p.message)}if(i>0){const f=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",v(String(i)));E(f)}else c&&E(c)}function jr(){Rl(),!(xi||typeof document>"u")&&(document.addEventListener(wn.requestAdd,Ml),xi=!0)}function Kn(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),r=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:r}}function Ss(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=Kn();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const r=document.getElementById("equipment-barcode"),i=document.getElementById("equipment-description"),c=t==="package";r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),jc(t),t==="package"&&Ma()}function Ma(){const{packageSelect:e,packageHint:t}=Kn();if(!e)return;const n=Xi();wr=n,_c(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,r=n.map(c=>{const l=Number.isFinite(Number(c.price))?Number(c.price):0,d=v(l.toFixed(2)),u=`${c.name} — ${d} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${r}`,e.selectedIndex=0;const i=n.length>0;e.disabled=!i,t&&(i?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),Fr()}function zl(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:r,blockingPackages:i})=>{const c=r?.desc||v(String(r?.barcode??r?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(i)&&i.length){const l=i.map(d=>d.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${l})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function Br(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const r=Rn(e);if(!r)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const i=Cl(r);if(!i)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(p=>p?.type==="package"&&Rn(p.packageId)===r))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(kc(r,n,a,s)){const p=i.name||r;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${p} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(i.items)&&i.items.length?i.items:Fs(i.raw??{}),l=ni(t),d=[],u=new Set;if(c.forEach(p=>{const m=te(p?.normalizedBarcode??p?.barcode);if(m){if(u.has(m)){d.push({item:p,type:"internal"});return}u.add(m),l.has(m)&&d.push({item:p,type:"external"})}}),d.length){const p=d.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>v(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:d.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",p):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",p),duplicates:d}}const y=[];return c.forEach(p=>{const m=te(p?.normalizedBarcode??p?.barcode);if(m&&bt(m,n,a,s)){const g=Rs(m,n,a,s);y.push({item:p,blockingPackages:g})}}),y.length?{success:!1,reason:"item_conflict",message:zl(i,y),conflicts:y}:{success:!0,package:{id:`package::${r}`,packageId:r,type:"package",desc:i.name||`Package ${r}`,qty:1,price:Number.isFinite(Number(i.price))?Number(i.price):0,barcode:i.code||i.raw?.package_code||`pkg-${r}`,packageItems:c.map(p=>({equipmentId:p?.equipmentId??null,barcode:p?.barcode??p?.normalizedBarcode??"",normalizedBarcode:te(p?.normalizedBarcode??p?.barcode),desc:p?.desc??"",qty:Number.isFinite(Number(p?.qty))?Number(p.qty):1,price:Number.isFinite(Number(p?.price))?Number(p.price):0})),image:c.find(p=>p?.image)?.image??null},packageInfo:i}}function Dr(e,{silent:t=!1}={}){const n=Rn(e);if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=rn(),r=gt(),i=Br(n,{existingItems:r,start:a,end:s});if(!i.success){if(!t){const l={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[i.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");E(i.message||l)}return i}return $a(i.package),_t(),pe(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:i.package}}function Fr(){const{packageSelect:e}=Kn();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;Dr(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function Ol(){const{packageAddButton:e,packageSelect:t}=Kn();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}Dr(n)}),e.dataset.listenerAttached="true")}function Rr(){const{modeRadios:e}=Kn();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&Ss(s.target.value)}),a.dataset.listenerAttached="true")}),Ol(),Fr();const t=da(),n=e.find(a=>a.value===t);n&&(n.checked=!0),Ss(t)}function _t(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=gt(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),l=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=Sn(n);t.innerHTML=d.map(u=>{const y=u.items[0]||{},f=an(y)||u.image,p=f?`<img src="${f}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=v(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,h=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,_=`${v(g.toFixed(2))} ${s}`,q=`${v(h.toFixed(2))} ${s}`,A=u.items.some(I=>I?.type==="package"),N=u.barcodes.map(I=>v(String(I||""))).filter(Boolean),U=N.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${N.map(I=>`<li>${I}</li>`).join("")}
            </ul>
          </details>`:"";let S="";if(A){const I=new Map;if(u.items.forEach(P=>{Array.isArray(P?.packageItems)&&P.packageItems.forEach(k=>{if(!k)return;const O=te(k.barcode||k.desc||Math.random()),$=I.get(O);if($){$.qty+=Number.isFinite(Number(k.qty))?Number(k.qty):1;return}I.set(O,{desc:k.desc||k.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(k.qty))?Number(k.qty):1,barcode:k.barcode??k.normalizedBarcode??""})})}),I.size){const P=Array.from(I.values()).map(k=>{const O=v(String(k.qty)),$=k.desc||v(String(k.barcode||"")),j=k.barcode?` <span class="reservation-package-items__barcode">(${v(String(k.barcode))})</span>`:"";return`<li>${$}${j} × ${O}</li>`}).join("");S=`
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
              <div class="reservation-item-thumb-wrapper">${p}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${A?`${S||""}${U||""}`:U}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${c}" ${A?"disabled":""}>−</button>
              <span class="reservation-qty-value">${m}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${i}" ${A?"disabled":""}>+</button>
            </div>
          </td>
          <td>${_}</td>
          <td>${q}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${l}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function Hl(e){const t=gt(),a=Sn(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Lc(s),_t(),pe())}function Vl(e){const t=gt(),n=t.filter(a=>Pa(a)!==e);n.length!==t.length&&(tr(n),_t(),pe())}function Ul(e){const t=gt(),a=Sn(t).find(y=>y.key===e);if(!a)return;const{start:s,end:r}=rn();if(!s||!r){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(y=>te(y.barcode))),{equipment:c=[]}=ye(),l=(c||[]).find(y=>{const f=te(y?.barcode);return!f||i.has(f)||Pa({desc:y?.desc||y?.description||y?.name||"",price:Number(y?.price)||0})!==e||!Ks(y)?!1:!bt(f,s,r)});if(!l){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=te(l.barcode),u=nn(l);if(!u){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}$a({id:u,equipmentId:u,barcode:d,desc:l.desc||l.description||l.name||a.description||"",qty:1,price:Number.isFinite(Number(l.price))?Number(l.price):a.unitPrice,image:an(l)}),_t(),pe()}function pe(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(v(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),l=c?.value||"unpaid",{start:d,end:u}=rn();i&&it();const y=hn(),f=document.getElementById("res-payment-progress-type"),p=document.getElementById("res-payment-progress-value"),m=xr(f),g=Ir(p);Ji(),qi({selectedItems:gt(),discount:n,discountType:s,applyTax:i,paidStatus:l,paymentProgressType:m,paymentProgressValue:g,start:d,end:u,companySharePercent:y,paymentHistory:[]});const h=qi.lastResult;h?(_r(p,h.paymentProgressValue),c&&(c.value=h.paymentStatus,Je(c,h.paymentStatus))):Je(c,l)}function Kl(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=v(c.target.value),pe()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",pe),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(Xe()){n.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}vs("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(Xe()){a.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}vs("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(Xe()){s.value="unpaid",Je(s,"unpaid"),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Je(s),pe()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(Xe()){r.value="percent",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",pe()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(Xe()){i.value="",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=v(c.target.value),pe()}),i.dataset.listenerAttached="true"),pe()}function Ql(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){pe();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),pe()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Ci(){const{input:e,hidden:t}=Js(),{input:n,hidden:a}=sn(),{customers:s}=ye();let r=t?.value?String(t.value):"";if(!r&&e?.value){const H=gs(e.value,{allowPartial:!0});H&&(r=String(H.id),t&&(t.value=r),e.value=H.label,e.dataset.selectedId=r)}const i=s.find(H=>String(H.id)===r);if(!i){E(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let l=a?.value?String(a.value):"";if(!l&&n?.value){const H=hs(n.value,{allowPartial:!0});H&&(l=String(H.id),a&&(a.value=l),n.value=H.label,n.dataset.selectedId=l)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,y=document.getElementById("res-start-time")?.value||"00:00",f=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const p=`${d}T${y}`,m=`${u}T${f}`,g=new Date(p),h=new Date(m);if(Number.isNaN(g.getTime())||Number.isNaN(h.getTime())||g>=h){E(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const _=Ji();_.map(H=>H.technicianId).filter(Boolean);const q=gt();if(q.length===0&&_.length===0){E(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const A=document.getElementById("res-notes")?.value||"",N=parseFloat(v(document.getElementById("res-discount")?.value))||0,U=document.getElementById("res-discount-type")?.value||"percent",S=document.getElementById("res-payment-status"),I=S?.value||"unpaid",P=document.getElementById("res-payment-progress-type"),k=document.getElementById("res-payment-progress-value"),O=xr(P),$=Ir(k),j=l?Zs(l):null,X=Tl(j);if(l&&!j){E(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const H of q){const oe=It(H.barcode);if(oe==="maintenance"||oe==="retired"){E(en(oe));return}}for(const H of q){const oe=te(H.barcode);if(bt(oe,p,m)){E(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const H of _)if(H?.technicianId&&nr(H.technicianId,p,m)){E(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const C=document.getElementById("res-tax"),B=document.getElementById("res-company-share"),x=!!l;x?(C&&(C.checked=!1,C.disabled=!0,C.classList.add("disabled"),C.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),B&&(B.checked=!1,B.disabled=!0,B.classList.add("disabled"),B.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),S&&(S.value="unpaid",S.disabled=!0,Je(S,"unpaid"),S.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),P&&(P.disabled=!0,P.classList.add("disabled")),k&&(k.value="",k.disabled=!0,k.classList.add("disabled"))):(C&&(C.disabled=!1,C.classList.remove("disabled"),C.title=""),B&&(B.disabled=!1,B.classList.remove("disabled"),B.title=""),S&&(S.disabled=!1,S.title=""),P&&(P.disabled=!1,P.classList.remove("disabled")),k&&(k.disabled=!1,k.classList.remove("disabled")));const Y=x?!1:C?.checked||!1,K=!!B?.checked;if(!x&&K!==Y){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let F=K?hn():null;K&&(!Number.isFinite(F)||F<=0)&&(it(),F=hn());const D=K&&Y&&Number.isFinite(F)&&F>0;Y&&it();const R=Ms(q,N,U,Y,_,{start:p,end:m,companySharePercent:D?F:0}),M=xc(),W=zs({totalAmount:R,progressType:O,progressValue:$,history:[]});k&&_r(k,W.paymentProgressValue);const ie=[];W.paymentProgressValue!=null&&W.paymentProgressValue>0&&ie.push({type:W.paymentProgressType||O,value:W.paymentProgressValue,amount:W.paidAmount,percentage:W.paidPercent,recordedAt:new Date().toISOString()});const ne=Os({manualStatus:I,paidAmount:W.paidAmount,paidPercent:W.paidPercent,totalAmount:R});S&&(S.value=ne,Je(S,ne));const ue=ar({reservationCode:M,customerId:c,start:p,end:m,status:X?"confirmed":"pending",title:null,location:null,notes:A,projectId:l||null,totalAmount:R,discount:x?0:N,discountType:x?"percent":U,applyTax:Y,paidStatus:x?"unpaid":ne,confirmed:X,items:q.map(H=>({...H,equipmentId:H.equipmentId??H.id})),crewAssignments:_,companySharePercent:x||!D?null:F,companyShareEnabled:x?!1:D,paidAmount:x?0:W.paidAmount,paidPercentage:x?0:W.paidPercent,paymentProgressType:x?null:W.paymentProgressType,paymentProgressValue:x?null:W.paymentProgressValue,paymentHistory:x?[]:ie});try{Ai("about to submit",{crewAssignments:_,techniciansPayload:ue?.technicians,payload:ue});const H=await Tc(ue);Ai("server response",{reservation:H?.id??H?.reservationId??H?.reservation_code,technicians:H?.technicians,crewAssignments:H?.crewAssignments,techniciansDetails:H?.techniciansDetails}),An(),Dt(),bn(),Xl(),E(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof fs=="function"&&fs({type:"created",reservation:H}),Gl(H)}catch(H){console.error("❌ [reservations/createForm] Failed to create reservation",H);const oe=Ca(H)?H.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");E(oe,"error"),x&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),Nn({clearValue:!1}))}}function Gl(e){if(!ra)return;const{draftStorageKey:t=qr,returnUrl:n=Sr}=ra,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}ra=null,n&&(window.location.href=n)}function Nn({clearValue:e=!1}={}){const{input:t,hidden:n}=sn();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,Bt())}function Wl(e,t=""){const{input:n,hidden:a}=sn();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),Bt())}function Xl(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),At({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),Nn({clearValue:!1}),vn({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",Je(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),Nc(),tr([]),ma("form-reset"),_t(),Bt(),pe()}function Jl(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){Hl(s);return}if(a==="increase-group"&&s){Ul(s);return}if(a==="remove-group"&&s){Vl(s);return}}),e.dataset.listenerAttached="true")}function Yl(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(da()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,Nr(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||da()!=="single")return;const{start:r,end:i}=rn();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function Zl(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Ci()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Ci()}),t.dataset.listenerAttached="true")}function hp({onAfterSubmit:e}={}){fs=typeof e=="function"?e:null;const{customers:t,projects:n}=ye();Cc(t||[]),At(),ti(),$r(n||[]),Cr({projectsList:n}),ei(),Dt(),Ma(),Fl(),jr(),Rr(),Ql(),Kl(),Jl(),Yl(),Zl(),Nl(),pe(),_t()}function Mr(){Dt(),Ma(),Cr(),At(),ti(),ei(),jr(),Rr(),_t(),pe()}if(typeof document<"u"){const e=()=>{At(),vn({projectsList:Ys()}),ti(),ei(),pe()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{Dt()}),document.addEventListener("packages:changed",()=>{Ma(),da()==="package"&&Ss("package")})}typeof window<"u"&&(window.getCompanySharePercent=hn);function zr(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:Ut(t),endDate:Ut(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:Ut(n),endDate:Ut(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Ut(n),endDate:Ut(a)}}return e==="upcoming"?{startDate:Ut(t),endDate:""}:{startDate:"",endDate:""}}function ed(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=v(t?.value||"").trim(),i=v(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),Sa(t),Sa(n),r="",i=""),!r&&!i&&c){const d=zr(c);r=d.startDate,i=d.endDate}return{searchTerm:Qe(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function vp(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=v(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{td(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),Sa(a),Sa(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function td(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=zr(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function Ut(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function Sa(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function na(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function nd(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function ad(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=nd(n);if(a!==null)return a}return null}function Li(e,t=0){const n=ad(e);if(n!=null)return n;const a=na(e.createdAt??e.created_at);if(a!=null)return a;const s=na(e.updatedAt??e.updated_at);if(s!=null)return s;const r=na(e.start);if(r!=null)return r;const i=na(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function sd({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((q,A)=>({reservation:q,index:A})),i=t.searchTerm||"",c=t.searchReservationId||"",l=t.searchCustomerName||"",d=t.searchProjectId||"",u=t.startDate||"",y=t.endDate||"",f=t.status||"",p=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,m=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,h=y?new Date(`${y}T23:59:59`):null,_=r.filter(({reservation:q})=>{const A=n.get(String(q.customerId)),N=s?.get?.(String(q.projectId)),U=q.start?new Date(q.start):null,S=Hs(q),{effectiveConfirmed:I}=Ft(q,N);if(p!=null&&String(q.customerId)!==String(p)||m!=null&&!(Array.isArray(q.technicians)?q.technicians.map(j=>String(j)):[]).includes(String(m))||f==="confirmed"&&!I||f==="pending"&&I||f==="completed"&&!S||g&&U&&U<g||h&&U&&U>h)return!1;if(c){const $=[q.reservationId,q.id,q.reservation_id,q.reservationCode,q.reservation_code,q.code,q.reference,q.referenceNumber,q.reference_number],j=Qe($.filter(C=>C!=null&&C!=="").map(String).join(" ")).replace(/\s+/g,""),X=c.replace(/\s+/g,"");if(!j.includes(X))return!1}if(l&&!Qe(A?.customerName||"").includes(l))return!1;if(d){const $=[q.projectId,q.project_id,q.projectID,N?.id,N?.projectCode,N?.project_code],j=Qe($.filter(C=>C!=null&&C!=="").map(String).join(" ")).replace(/\s+/g,""),X=d.replace(/\s+/g,"");if(!j.includes(X))return!1}if(!i)return!0;const P=q.items?.map?.($=>`${$.barcode} ${$.desc}`).join(" ")||"",k=(q.technicians||[]).map($=>a.get(String($))?.name).filter(Boolean).join(" ");return Qe([q.reservationId,A?.customerName,q.notes,P,k,N?.title].filter(Boolean).join(" ")).includes(i)});return _.sort((q,A)=>{const N=Li(q.reservation,q.index),U=Li(A.reservation,A.index);return N!==U?U-N:A.index-q.index}),_}function id({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),l=o("reservations.list.itemsCountShort","{count} عنصر"),d=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),y=o("reservations.list.status.pending","⏳ غير مؤكد"),f=o("reservations.list.payment.paid","💳 مدفوع"),p=o("reservations.list.payment.unpaid","💳 غير مدفوع"),m=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),g=o("reservations.list.actions.confirm","✔️ تأكيد"),h=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),_=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),q={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:A,index:N})=>{const U=t.get(String(A.customerId)),S=A.projectId?a?.get?.(String(A.projectId)):null,I=Hs(A),P=A.paidStatus??A.paid_status??(A.paid===!0||A.paid==="paid"?"paid":"unpaid"),k=P==="paid",O=P==="partial",{effectiveConfirmed:$,projectLinked:j}=Ft(A,S),X=$?"status-confirmed":"status-pending",C=k?"status-paid":O?"status-partial":"status-unpaid";let B=`<span class="reservation-chip status-chip ${X}">${$?u:y}</span>`;const x=k?f:O?m:p;let Y=`<span class="reservation-chip status-chip ${C}">${x}</span>`,K=k?" tile-paid":O?" tile-partial":" tile-unpaid";I&&(K+=" tile-completed");let F="";I&&(B=`<span class="reservation-chip status-chip status-completed">${u}</span>`,Y=`<span class="reservation-chip status-chip status-completed">${x}</span>`,F=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const D=!j&&!$?`<button class="tile-confirm" data-reservation-index="${N}" data-action="confirm">${g}</button>`:"",R=D?`<div class="tile-actions">${D}</div>`:"",M=A.items?.length||0,W=Array.isArray(A.crewAssignments)?A.crewAssignments:[],ie=(A.technicians||[]).map(ae=>n.get(String(ae))).filter(Boolean),ne=W.length?W.map(ae=>{const G=ae.positionLabel??ae.position_name??ae.role??o("reservations.crew.positionFallback","منصب بدون اسم"),ge=ae.technicianName??n.get(String(ae.technicianId??""))?.name??null;return ge?`${v(G)} (${v(ge)})`:v(G)}):ie.map(ae=>ae.name),ue=ne.length?ne.join(d):"—",H=v(String(A.reservationId??"")),oe=A.start?v(Ye(A.start)):"-",Ee=A.end?v(Ye(A.end)):"-",we=v(String(A.cost??0)),Ne=v(String(M)),Q=A.notes?v(A.notes):c,Z=l.replace("{count}",Ne),se=A.applyTax?`<small>${r}</small>`:"";let Ae=h;return A.projectId&&(Ae=S?.title?v(S.title):_),`
      <div class="${D?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${K}"${F} data-reservation-index="${N}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${H}</div>
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
    `}).join("")}function Ke(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function as(e){if(e==null)return"";const t=String(e).trim();return t?v(t):""}function Ti(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=Ft(e,s),c=e.paid===!0||e.paid==="paid",l=Hs(e),d=e.items||[],{groups:u}=ir(e),{technicians:y=[]}=ye(),f=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(y)?y:[]),p=new Map;f.forEach(b=>{if(!b||b.id==null)return;const V=String(b.id),le=p.get(V)||{};p.set(V,{...le,...b})});const g=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(b=>({technicianId:b}))).map((b,V)=>{const le=b?.technicianId!=null?p.get(String(b.technicianId)):null;let ve=b.positionLabel??b.position_name??b.position_label??b.role??b.position??"";(!ve||ve.trim()==="")&&(ve=b.positionLabelAr??b.position_label_ar??b.positionLabelEn??b.position_label_en??b.position_name_ar??b.position_name_en??"");const xe=b.positionLabelAlt??b.position_label_alt??b.positionLabelEn??b.position_label_en??b.positionLabelAr??b.position_label_ar??"";let Be=ve,Fe=xe;if(!Be||Be.trim()==="")try{const Ue=Ct?Ct():[];let ee=null;if(b.positionId!=null&&(ee=Ue.find(Ie=>String(Ie.id)===String(b.positionId))||null),!ee){const Ie=b.positionKey??b.position_key??b.positionName??b.position_name??b.position??"";if(Ie&&(ee=typeof ua=="function"?ua(Ie):null,!ee&&Ue.length)){const tt=String(Ie).trim().toLowerCase();ee=Ue.find(nt=>[nt.name,nt.labelAr,nt.labelEn].filter(Boolean).map(Pt=>String(Pt).toLowerCase()).includes(tt))||null}}ee&&(Be=ee.labelAr||ee.labelEn||ee.name||"",(!Fe||String(Fe).trim()==="")&&(ee.labelAr&&ee.labelEn?Fe=Be===ee.labelAr?ee.labelEn:ee.labelAr:Fe=ee.labelAr||ee.labelEn||""))}catch{}const Ce=qe(je(b.positionCost??b.position_cost??b.cost??b.daily_wage??b.dailyWage??le?.dailyWage??le?.wage??0)),dn=qe(je(b.positionClientPrice??b.position_client_price??b.client_price??b.clientPrice??b.daily_total??b.dailyTotal??b.total??le?.dailyTotal??le?.total??le?.total_wage??0));return{assignmentId:b.assignmentId??b.assignment_id??`crew-${V}`,positionId:b.positionId??b.position_id??null,positionKey:b.positionKey??b.position_key??b.positionName??b.position_name??b.position??null,positionLabel:Be,positionLabelAlt:Fe,positionLabelAr:b.positionLabelAr??b.position_label_ar??null,positionLabelEn:b.positionLabelEn??b.position_label_en??null,positionCost:Ce,positionClientPrice:dn,technicianId:b.technicianId!=null?String(b.technicianId):le?.id!=null?String(le.id):null,technicianName:b.technicianName??b.technician_name??le?.name??null,technicianRole:b.technicianRole??le?.role??null,technicianPhone:b.technicianPhone??le?.phone??null,notes:b.notes??null}}),h=tn(),_=La(e.start,e.end),q=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,A=je(q),N=Number.isFinite(A)?A:0,U=e.discountType??e.discount_type??e.discountMode??"percent",S=String(U).toLowerCase()==="amount"?"amount":"percent",I=r?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),P=je(e.cost??e.total??e.finalTotal),k=Number.isFinite(P),O=k?qe(P):0,$=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,j=$!=null?je($):Number.NaN;let B=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(j)&&j>0)&&Number.isFinite(j)?j:0;I&&B<=0&&(B=Nt);const x=rr({items:d,technicianIds:e.technicians||[],crewAssignments:g,discount:N,discountType:S,applyTax:I,start:e.start,end:e.end,companySharePercent:B}),Y=qe(x.equipmentTotal),K=qe(x.crewTotal);qe(x.crewCostTotal);const F=qe(x.discountAmount),D=qe(x.subtotalAfterDiscount),R=Number.isFinite(x.companySharePercent)?x.companySharePercent:0;let M=qe(x.companyShareAmount);M=R>0?qe(Math.max(0,M)):0;const W=qe(x.taxAmount),ie=qe(x.finalTotal),ne=r?ie:k?O:ie,ue=qe(x.netProfit),H=v(String(e.reservationId??e.id??"")),oe=e.start?v(Ye(e.start)):"-",Ee=e.end?v(Ye(e.end)):"-",we=v(String(g.length)),Ne=v(Y.toFixed(2)),Q=v(F.toFixed(2)),Z=v(D.toFixed(2)),se=v(W.toFixed(2)),Ae=v((Number.isFinite(ne)?ne:0).toFixed(2)),He=v(String(_)),ae=o("reservations.create.summary.currency","SR"),G=o("reservations.details.labels.discount","الخصم"),ge=o("reservations.details.labels.tax","الضريبة (15%)"),L=o("reservations.details.labels.crewTotal","إجمالي الفريق"),re=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),be=o("reservations.details.labels.duration","عدد الأيام"),he=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),me=o("reservations.details.labels.netProfit","💵 صافي الربح"),We=o("reservations.create.equipment.imageAlt","صورة"),$e={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},Ve=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),ot=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");o("reservations.details.technicians.roleUnknown","غير محدد");const kt=o("reservations.details.technicians.phoneUnknown","غير متوفر");o("reservations.details.technicians.wage","{amount} {currency} / اليوم");const _n=o("reservations.list.status.confirmed","✅ مؤكد"),cn=o("reservations.list.status.pending","⏳ غير مؤكد"),Ga=o("reservations.list.payment.paid","💳 مدفوع"),z=o("reservations.list.payment.unpaid","💳 غير مدفوع"),ke=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),ct=o("reservations.list.status.completed","📁 منتهي"),vt=o("reservations.details.labels.id","🆔 رقم الحجز"),Wn=o("reservations.details.section.bookingInfo","بيانات الحجز"),Xn=o("reservations.details.section.paymentSummary","ملخص الدفع"),lt=o("reservations.details.labels.finalTotal","المجموع النهائي"),Jn=o("reservations.details.section.crew","😎 الفريق الفني"),Yn=o("reservations.details.crew.count","{count} عضو"),Wa=o("reservations.details.section.items","📦 المعدات المرتبطة"),ln=o("reservations.details.items.count","{count} عنصر"),Pe=o("reservations.details.actions.edit","✏️ تعديل"),Me=o("reservations.details.actions.delete","🗑️ حذف"),Ot=o("reservations.details.labels.customer","العميل"),qt=o("reservations.details.labels.contact","رقم التواصل"),Zn=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Vo=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Uo=o("reservations.details.actions.openProject","📁 فتح المشروع"),Ko=o("reservations.details.labels.start","بداية الحجز"),Qo=o("reservations.details.labels.end","نهاية الحجز"),Go=o("reservations.details.labels.notes","ملاحظات"),Wo=o("reservations.list.noNotes","لا توجد ملاحظات"),Xo=o("reservations.details.labels.itemsCount","عدد المعدات"),Jo=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),Yo=o("reservations.paymentHistory.title","سجل الدفعات"),Zo=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),ec=o("reservations.list.unknownCustomer","غير معروف"),Xa=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),yi=Xa==="partial",tc=Xa==="paid"?Ga:yi?ke:z;function Ja(b){if(b==null)return Number.NaN;if(typeof b=="number")return Number.isFinite(b)?b:Number.NaN;const V=String(b).replace(/[^0-9.+-]/g,""),le=Number(V);return Number.isFinite(le)?le:Number.NaN}const ea=(b={})=>{const V=String(b.type??b.kind??b.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(V)||Array.isArray(b.packageItems)&&b.packageItems.length)},nc=(b={})=>[b.packageId,b.package_id,b.packageCode,b.package_code,b.bundleId,b.bundle_id].some(V=>V!=null&&V!==""),ac=(b={})=>!b||typeof b!="object"?!1:!ea(b)&&nc(b),bi=(b={})=>{const V=ea(b),le=[{value:b.qty,key:"qty",limit:999},{value:b.quantity,key:"quantity",limit:999},{value:b.units,key:"units",limit:999},{value:b.count,key:"count",limit:50},{value:b.package_quantity,key:"package_quantity",limit:999},{value:b.packageQty,key:"packageQty",limit:999},{value:b.packageCount,key:"packageCount",limit:999}];let ve=NaN;for(const xe of le){if(xe.value==null||xe.value==="")continue;const Be=typeof xe.value=="string"?xe.value.trim():String(xe.value??"");if(xe.key==="count"&&Be.length>6)continue;const Fe=Ja(xe.value);if(!Number.isFinite(Fe)||Fe<=0)continue;const Ce=Math.round(Fe);if(!(Ce>xe.limit)){ve=Math.max(1,Ce);break}}return(!Number.isFinite(ve)||ve<=0)&&(ve=1),V?Math.max(1,Math.min(99,ve)):Math.max(1,Math.min(9999,ve))};let De=(Array.isArray(d)?d:[]).reduce((b,V)=>!V||typeof V!="object"||ac(V)?b:b+bi(V),0);De<=0&&Array.isArray(u)&&u.length&&(De=u.reduce((b,V)=>{const le=bi({...V,type:V.type});return b+le},0)),!Number.isFinite(De)||De<=0?De=Array.isArray(u)&&u.length?u.length:(Array.isArray(d)?d.length:0)||1:De>1e6&&(De=Math.min(De,Array.isArray(u)?u.length:De),(!Number.isFinite(De)||De<=0)&&(De=(Array.isArray(d)?d.length:0)||1)),De=Math.max(1,Math.round(De));const sc=v(String(De)),gi=ln.replace("{count}",sc),ic=Yn.replace("{count}",we),rc=e.notes?v(e.notes):Wo,oc=v(K.toFixed(2)),cc=v(String(R)),lc=v(M.toFixed(2)),dc=`${cc}% (${lc} ${ae})`,uc=Number.isFinite(ue)?Math.max(0,ue):0,pc=v(uc.toFixed(2)),$t=[{icon:"💼",label:Jo,value:`${Ne} ${ae}`}];$t.push({icon:"😎",label:L,value:`${oc} ${ae}`}),F>0&&$t.push({icon:"💸",label:G,value:`${Q} ${ae}`}),$t.push({icon:"📊",label:re,value:`${Z} ${ae}`}),I&&W>0&&$t.push({icon:"🧾",label:ge,value:`${se} ${ae}`}),R>0&&$t.push({icon:"🏦",label:he,value:dc}),$t.push({icon:"💵",label:me,value:`${pc} ${ae}`}),$t.push({icon:"💰",label:lt,value:`${Ae} ${ae}`});const mc=$t.map(({icon:b,label:V,value:le})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${b} ${V}</span>
      <span class="summary-details-value">${le}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let kn=[];Array.isArray(e.paymentHistory)?kn=e.paymentHistory:Array.isArray(e.payment_history)&&(kn=e.payment_history);const fc=Array.isArray(e.paymentLogs)?e.paymentLogs:[],hi=Array.isArray(kn)&&kn.length>0?kn:fc,yc=hi.length?`<ul class="reservation-payment-history-list">${hi.map(b=>{const V=b?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):b?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),le=Number.isFinite(Number(b?.amount))&&Number(b.amount)>0?`${v(Number(b.amount).toFixed(2))} ${ae}`:"—",ve=Number.isFinite(Number(b?.percentage))&&Number(b.percentage)>0?`${v(Number(b.percentage).toFixed(2))}%`:"—",xe=b?.recordedAt?v(Ye(b.recordedAt)):"—",Be=b?.note?`<div class="payment-history-note">${Ke(v(b.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${Ke(V)}</span>
              <span class="payment-history-entry__amount">${le}</span>
              <span class="payment-history-entry__percent">${ve}</span>
              <span class="payment-history-entry__date">${xe}</span>
            </div>
            ${Be}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${Ke(Zo)}</div>`,vi=[{text:i?_n:cn,className:i?"status-confirmed":"status-pending"},{text:tc,className:Xa==="paid"?"status-paid":yi?"status-partial":"status-unpaid"}];l&&vi.push({text:ct,className:"status-completed"});const bc=vi.map(({text:b,className:V})=>`<span class="status-chip ${V}">${b}</span>`).join(""),Ht=(b,V,le)=>`
    <div class="res-info-row">
      <span class="label">${b} ${V}</span>
      <span class="value">${le}</span>
    </div>
  `;let Ya="";if(e.projectId){let b=Ke(Vo);if(s){const V=s.title||o("projects.fallback.untitled","مشروع بدون اسم");b=`${Ke(V)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${Ke(Uo)}</button>`}Ya=`
      <div class="res-info-row">
        <span class="label">📁 ${Zn}</span>
        <span class="value">${b}</span>
      </div>
    `}const St=[];St.push(Ht("👤",Ot,t?.customerName||ec)),St.push(Ht("📞",qt,t?.phone||"—")),St.push(Ht("🗓️",Ko,oe)),St.push(Ht("🗓️",Qo,Ee)),St.push(Ht("📦",Xo,gi)),St.push(Ht("⏱️",be,He)),St.push(Ht("📝",Go,rc)),Ya&&St.push(Ya);const gc=St.join(""),hc=u.length?u.map(b=>{const V=b.items[0]||{},le=an(V)||b.image,ve=le?`<img src="${le}" alt="${We}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',xe=[];Array.isArray(b.packageItems)&&b.packageItems.length&&xe.push(...b.packageItems),b.items.forEach(fe=>{Array.isArray(fe?.packageItems)&&fe.packageItems.length&&xe.push(...fe.packageItems)});const Be=ea(b)||b.items.some(fe=>ea(fe))||xe.length>0,Fe=(fe,{fallback:ut=1,max:de=1e3}={})=>{const Se=Ja(fe);return Number.isFinite(Se)&&Se>0?Math.min(de,Se):ut};let Ce;if(Be){const fe=Fe(V?.qty??V?.quantity??V?.count,{fallback:NaN,max:999});Number.isFinite(fe)&&fe>0?Ce=fe:Ce=Fe(b.quantity??b.count??1,{fallback:1,max:999})}else Ce=Fe(b.quantity??b.count??V?.qty??V?.quantity??V?.count??0,{fallback:1,max:9999});const dn=v(String(Ce)),Ue=(fe,{preferPositive:ut=!1}={})=>{let de=Number.NaN;for(const Se of fe){const pt=je(Se);if(Number.isFinite(pt)){if(ut&&pt>0)return pt;Number.isFinite(de)||(de=pt)}}return de};let ee,Ie;if(Be){const fe=[V?.price,V?.unit_price,V?.unitPrice,b.unitPrice];if(ee=Ue(fe,{preferPositive:!0}),!Number.isFinite(ee)||ee<0){const de=je(b.totalPrice??V?.total??V?.total_price);Number.isFinite(de)&&Ce>0&&(ee=de/Ce)}Number.isFinite(ee)||(ee=0);const ut=[V?.total,V?.total_price,b.totalPrice];if(Ie=Ue(ut),!Number.isFinite(Ie))Ie=ee*Ce;else{const de=ee*Ce;Number.isFinite(de)&&de>0&&Math.abs(Ie-de)>de*.25&&(Ie=de)}}else{const fe=[V?.price,V?.unit_price,V?.unitPrice,b.unitPrice];if(ee=Ue(fe,{preferPositive:!0}),!Number.isFinite(ee)||ee<0){const ut=je(b.totalPrice??V?.total??V?.total_price);Number.isFinite(ut)&&Ce>0&&(ee=ut/Ce)}Number.isFinite(ee)||(ee=0),Ie=je(b.totalPrice??V?.total??V?.total_price),Number.isFinite(Ie)||(Ie=ee*Ce)}ee=qe(ee),Ie=qe(Ie);const tt=`${v(ee.toFixed(2))} ${ae}`,nt=`${v(Ie.toFixed(2))} ${ae}`,Pt=b.barcodes.map(fe=>v(String(fe||""))).filter(Boolean),at=Pt.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${Pt.map(fe=>`<li>${fe}</li>`).join("")}
              </ul>
            </details>`:"";let dt="";if(xe.length){const fe=new Map,ut=de=>{const Se=Ja(de?.qtyPerPackage??de?.perPackageQty??de?.quantityPerPackage);return Number.isFinite(Se)&&Se>0&&Se<=99?Math.round(Se):1};if(xe.forEach(de=>{if(!de)return;const Se=te(de.barcode||de.normalizedBarcode||de.desc||Math.random());if(!Se)return;const pt=fe.get(Se),un=ut(de);if(pt){pt.qty=un,pt.total=un;return}fe.set(Se,{desc:de.desc||de.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(un,99)),total:Math.max(1,Math.min(un,99)),barcode:de.barcode??de.normalizedBarcode??""})}),fe.size){const de=Array.from(fe.values()).map(Se=>{const pt=v(String(Se.qty>0?Math.min(Se.qty,99):1)),un=Ke(Se.desc||""),wc=Se.barcode?` <span class="reservation-package-items__barcode">(${Ke(v(String(Se.barcode)))})</span>`:"";return`<li>${un}${wc} × ${pt}</li>`}).join("");dt=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${de}
                </ul>
              </details>
            `}}const Ec=Be?`${dt||""}${at||""}`:at;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${ve}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${Ke(V.desc||V.description||V.name||b.description||"-")}</div>
                  ${Ec}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Ke($e.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${dn}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Ke($e.unitPrice)}">${tt}</td>
            <td class="reservation-modal-items-table__cell" data-label="${Ke($e.total)}">${nt}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${Ke($e.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${Ve}</td></tr>`,vc=`
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
        <tbody>${hc}</tbody>
      </table>
    </div>
  `,qc=g.map((b,V)=>{const le=v(String(V+1));let ve=b.positionLabel??b.position_name??b.position_label??b.position_title??b.role??b.position??null;if((!ve||ve.trim()==="")&&(ve=b.positionLabelAr??b.position_label_ar??b.position_title_ar??b.positionLabelEn??b.position_label_en??b.position_name_ar??b.position_title_en??b.position_name_en??null),!ve||ve.trim()==="")try{const tt=typeof Ct=="function"?Ct():[],nt=b.positionId?tt.find(dt=>String(dt.id)===String(b.positionId)):null,Pt=!nt&&b.positionKey?tt.find(dt=>String(dt.name).toLowerCase()===String(b.positionKey).toLowerCase()):null,at=nt||Pt||null;at&&(ve=at.labelAr||at.labelEn||at.name||ve)}catch{}const xe=as(ve)||o("reservations.crew.positionFallback","منصب بدون اسم"),Be=as(b.positionLabelAlt??b.position_label_alt??b.positionLabelEn??b.position_label_en??b.positionLabelAr??b.position_label_ar??b.position_name_en??b.position_name_ar??""),Fe=as(b.technicianName)||o("technicians.picker.noTechnicianOption","— بدون تعيين —"),Ce=b.technicianPhone||kt,dn=qe(je(b.positionCost??b.position_cost??b.cost??b.daily_wage??b.dailyWage??b.internal_cost??0));let Ue=qe(je(b.positionClientPrice??b.position_client_price??b.client_price??b.customer_price??b.position_price??b.clientPrice??b.daily_total??b.dailyTotal??b.total??0));if(!Number.isFinite(Ue)||Ue<=0)try{const tt=Ct?Ct():[],nt=b.positionId?tt.find(dt=>String(dt.id)===String(b.positionId)):null,Pt=!nt&&b.positionKey?tt.find(dt=>String(dt.name).toLowerCase()===String(b.positionKey).toLowerCase()):null,at=nt||Pt||null;at&&Number.isFinite(Number(at.clientPrice))&&(Ue=qe(Number(at.clientPrice)))}catch{}const ee=`${v(Ue.toFixed(2))} ${ae}`,Ie=dn>0?`${v(dn.toFixed(2))} ${ae}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${le}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${Fe}</span>
            <small class="text-muted">🏷️ ${xe}${Be?` — ${Be}`:""}</small>
            <small class="text-muted">💼 ${ee}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${Ce}</div>
          ${Ie?`<div>💵 ${o("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${Ie}</div>`:""}
        </div>
      </div>
    `}).join(""),Sc=g.length?`<div class="reservation-technicians-grid">${qc}</div>`:`<ul class="reservation-modal-technicians"><li>${ot}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${vt}</span>
          <strong>${H}</strong>
        </div>
        <div class="status-chips">
          ${bc}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Wn}</h6>
          ${gc}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${Xn}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${mc}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Yo}</h6>
              ${yc}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Jn}</span>
          <span class="count">${ic}</span>
        </div>
        ${Sc}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Wa}</span>
          <span class="count">${gi}</span>
        </div>
        ${vc}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${Pe}</button>
        ${h?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Me}</button>`:""}
      </div>
    </div>
  `}const qp="project",Sp="editProject",Ep=3600*1e3,Or=.15,wp=6,Ap="projectsTab",xp="projectsSubTab",Ip={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},_p={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},kp={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},rd=`@page {
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
`,od=/color\([^)]*\)/gi,Mn=/(color\(|color-mix\(|oklab|oklch)/i,cd=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"],ld=typeof document<"u"?document.createElement("canvas"):null,aa=ld?.getContext?.("2d")||null;function Hr(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function Es(e,t="#000"){if(!aa||!e)return t;try{return aa.fillStyle="#000",aa.fillStyle=e,aa.fillStyle||t}catch{return t}}function dd(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&Mn.test(n)){const s=Es(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function mn(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function $p(e=[]){if(!(!Array.isArray(e)||!e.length))for(let t=e.length-1;t>=0;t-=1){const{element:n,prop:a,value:s,priority:r}=e[t]||{};!n?.style||!a||(s&&s.length>0?n.style.setProperty(a,s,r||""):n.style.removeProperty(a))}}function Vr(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;cd.forEach(c=>{const l=r[c];if(l&&Mn.test(l)){const d=Hr(c);mn(n,s,d);const u=c==="backgroundColor"?"#ffffff":r.color||"#000000",y=Es(l,u);s.style.setProperty(d,y,"important")}});const i=r.backgroundImage;if(i&&Mn.test(i)){const c=Es(r.backgroundColor||"#ffffff","#ffffff");mn(n,s,"background-image"),mn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function Ur(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(c=>{const l=r[c];if(l&&Mn.test(l)){const d=Hr(c);mn(n,s,d);const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(d,u,"important")}});const i=r.backgroundImage;i&&Mn.test(i)&&(mn(n,s,"background-image"),mn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function Kr(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(od,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const Qr="reservations.quote.sequence",Ni={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},Gr="https://help.artratio.sa/guide/quote-preview",Te={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},ud=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Ge=[...ud],pd=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function ws(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...Ge]}function md(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=ws(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=ws(t.value);if(a.length)return a}const n=Ge.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...Ge]}const fd=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],Wr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(v(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>{if(e?.isPackage){const t=e?.packageCodeResolved||e?.barcode||"";return w(t||"-")}return w(e?.barcode||"-")}},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>w(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>w(v(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>w(v(Number(e?.price||0).toFixed(2)))}],Xr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(v(String(t+1)))},{id:"position",labelKey:"reservations.details.crew.position",fallback:"المنصب",render:e=>w(v(e?.positionLabel??e?.position_name??e?.role??o("reservations.crew.positionFallback","منصب بدون اسم")))},{id:"price",labelKey:"reservations.details.crew.clientPrice",fallback:"سعر العميل",render:e=>{const t=Number.isFinite(Number(e?.positionClientPrice))?Number(e.positionClientPrice):0;return w(`${v(t.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}}],As={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:Wr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:Xr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},Jr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(v(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>w(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>w(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>w(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Yr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(v(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>w(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>w(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>w(e?.note||"-")}],Zr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(v(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>w(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>w(v(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>w(v(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>w(e?.displayCost||"—")}],yd=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],bd={customerInfo:As.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:As.payment,projectExpenses:Yr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:Jr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:Zr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},ss=new Map;function za(e="reservation"){if(ss.has(e))return ss.get(e);const t=e==="project"?yd:fd,n=e==="project"?bd:As,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(l=>l.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return ss.set(e,r),r}function Oa(e="reservation"){return za(e).sectionDefs}function eo(e="reservation"){return za(e).fieldDefs}function to(e="reservation"){return za(e).sectionIdSet}function no(e="reservation"){return za(e).fieldIdMap}function ao(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const gd="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",hd="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",vd="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",so=rd.trim(),io=/^data:image\/svg\+xml/i,qd=/\.svg($|[?#])/i,Tn=512,xs="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",ro=96,oo=25.4,Is=210,oa=297,ca=Math.round(Is/oo*ro),la=Math.round(oa/oo*ro),Sd=2,co=/safari/i,Ed=/(iphone|ipad|ipod)/i,ji=/(iphone|ipad|ipod)/i,wd=/(crios|fxios|edgios|opios)/i,Ea="[reservations/pdf]";let J=null,T=null,ft=1,Pn=null,Cn=null,Tt=null,fn=null,jn=!1;function Xt(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!J?.statusIndicator||!J?.statusText)return;J.statusKind=e;const r=t||ao(e);J.statusText.textContent=r,J.statusSpinner&&(J.statusSpinner.hidden=!s),J.statusAction&&(J.statusAction.hidden=!0,J.statusAction.onclick=null,n&&typeof a=="function"&&(J.statusAction.textContent=n,J.statusAction.hidden=!1,J.statusAction.onclick=i=>{i.preventDefault(),a()})),J.statusIndicator.hidden=!1,requestAnimationFrame(()=>{J.statusIndicator.classList.add("is-visible")})}function is(e){try{return String(e||"").toLowerCase().normalize("NFKD").replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,"").replace(/\s+/g," ").trim()}catch{return String(e||"").trim().toLowerCase()}}function Bn(e){!J?.statusIndicator||!J?.statusText||(J.statusKind=null,J.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{J?.statusIndicator&&(J.statusIndicator.hidden=!0,J.statusAction&&(J.statusAction.hidden=!0,J.statusAction.onclick=null),J.statusSpinner&&(J.statusSpinner.hidden=!1))},220))}function _s(){return!!window?.bootstrap?.Modal}function Ad(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),Tt||(Tt=document.createElement("div"),Tt.className="modal-backdrop fade show",Tt.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(Tt)),fn||(fn=t=>{t.key==="Escape"&&ks(e)},document.addEventListener("keydown",fn));try{e.focus({preventScroll:!0})}catch{}}}function ks(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),Tt&&(Tt.remove(),Tt=null),fn&&(document.removeEventListener("keydown",fn),fn=null))}function xd(e){if(e){if(_s()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}Ad(e)}}function Id(){if(jn)return;jn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!J?.modal?.classList.contains("show"),s=()=>{J?.modal?.classList.contains("show")&&(Xt("render"),jn=!1,on())};Wi({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:Gr}),a&&Xt("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function Ha(e="reservation"){const t={},n=eo(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function ai(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function _d(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function si(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function ii(e="reservation"){return Object.fromEntries(Oa(e).map(({id:t})=>[t,!1]))}function ri(e,t){return e.sectionExpansions||(e.sectionExpansions=ii(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function kd(e,t){return ri(e,t)?.[t]!==!1}function oi(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function $d(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Ed.test(e)}function Pd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=co.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function lo(){return $d()&&Pd()}function Va(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=ji.test(e)||ji.test(t),s=/Macintosh/i.test(e)&&n>1;return co.test(e)&&!wd.test(e)&&(a||s)}function rs(e,...t){try{console.log(`${Ea} ${e}`,...t)}catch{}}function xt(e,...t){try{console.warn(`${Ea} ${e}`,...t)}catch{}}function Cd(e,t,...n){try{t?console.error(`${Ea} ${e}`,t,...n):console.error(`${Ea} ${e}`,...n)}catch{}}function _e(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Ld(e,t="لا توجد بيانات للعرض."){const n=w(o(e,t));return _e(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function wa(e,t){return Array.isArray(e)&&e.length?e:[Ld(t)]}const Td=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function uo(e=""){return Td.test(e)}function Nd(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!uo(r))return a.call(this,r,...i);let c,l=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),l=!0)}catch{}try{if(!l){const d=this.canvas;d&&d.style?.direction!=="rtl"&&(d.__artRatioOriginalDirection=d.style.direction,d.style.direction="rtl")}return a.call(this,r,...i)}finally{if(l&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!l){const d=this.canvas;d&&d.__artRatioOriginalDirection!==void 0&&(d.style.direction=d.__artRatioOriginalDirection,delete d.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function Bi(e,t=Tn){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function jd(e){if(!e)return{width:Tn,height:Tn};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?Bi(t,0):0,s=n?Bi(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,l]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(l)&&l>0?l:0)}}return{width:a||Tn,height:s||Tn}}function po(e=""){return typeof e!="string"?!1:io.test(e)||qd.test(e)}function Bd(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Dd(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function mo(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await Dd(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),l=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=l;const d=i.getContext("2d");return d.clearRect(0,0,c,l),d.drawImage(r,0,0,c,l),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function Fd(e){if(!e)return null;if(io.test(e))return Bd(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Rd(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!po(t))return!1;const n=await Fd(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",xs),!1;const a=await mo(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",xs),!1)}async function Md(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=jd(e),s=await mo(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||xs),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),l=e.getAttribute("height");return c&&i.setAttribute("width",c),l&&i.setAttribute("height",l),e.parentNode?.replaceChild(i,e),!!s}async function fo(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{po(s.getAttribute?.("src"))&&a.push(Rd(s))}),n.forEach(s=>{a.push(Md(s))}),a.length&&await Promise.allSettled(a)}function zd(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(F,D=0)=>{const R=parseFloat(F);return Number.isFinite(R)?R:D},i=r(s.paddingTop),c=r(s.paddingBottom),l=r(s.paddingRight),d=r(s.paddingLeft),u=r(s.borderRadius),y=r(s.fontSize,14),f=(()=>{const F=s.lineHeight;if(!F||F==="normal")return y*1.6;const D=r(F,y*1.6);return D>0?D:y*1.6})(),p=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(p<=0)return null;const m=Math.max(1,p-d-l),g=e.textContent||"",h=g.split(/\r?\n/),_=n.createElement("canvas"),q=_.getContext("2d");if(!q)return null;const A=s.fontStyle||"normal",N=s.fontVariant||"normal",U=s.fontWeight||"400",S=s.fontFamily||"sans-serif",I=s.fontStretch||"normal",P=F=>F.join(" "),k=[],O=F=>q.measureText(F).width;q.font=`${A} ${N} ${U} ${I} ${y}px ${S}`,h.forEach(F=>{const D=F.trim();if(D.length===0){k.push("");return}const R=D.split(/\s+/);let M=[];R.forEach((W,ie)=>{const ne=W.trim();if(!ne)return;const ue=P(M.concat(ne));if(O(ue)<=m||M.length===0){M.push(ne);return}k.push(P(M)),M=[ne]}),M.length&&k.push(P(M))}),k.length||k.push("");const $=i+c+k.length*f,j=Math.ceil(Math.max(1,p)*t),X=Math.ceil(Math.max(1,$)*t);_.width=j,_.height=X,_.style.width=`${Math.max(1,p)}px`,_.style.height=`${Math.max(1,$)}px`,q.scale(t,t);const C=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){q.save(),q.beginPath();const F=Math.max(1,p),D=Math.max(1,$),R=Math.min(u,F/2,D/2);q.moveTo(R,0),q.lineTo(F-R,0),q.quadraticCurveTo(F,0,F,R),q.lineTo(F,D-R),q.quadraticCurveTo(F,D,F-R,D),q.lineTo(R,D),q.quadraticCurveTo(0,D,0,D-R),q.lineTo(0,R),q.quadraticCurveTo(0,0,R,0),q.closePath(),q.clip()}if(q.fillStyle=C,q.fillRect(0,0,Math.max(1,p),Math.max(1,$)),q.font=`${A} ${N} ${U} ${I} ${y}px ${S}`,q.fillStyle=s.color||"#000000",q.textBaseline="top",q.textAlign="right","direction"in q)try{q.direction="rtl"}catch{}const B=Math.max(0,p-l);let x=i;k.forEach(F=>{const D=F.length?F:" ";q.fillText(D,B,x,m),x+=f});const Y=n.createElement("img");let K;try{K=_.toDataURL("image/png")}catch(F){return xt("note canvas toDataURL failed",F),null}return Y.src=K,Y.alt=g,Y.style.width=`${Math.max(1,p)}px`,Y.style.height=`${Math.max(1,$)}px`,Y.style.display="block",Y.setAttribute("data-quote-note-image","true"),{image:Y,canvas:_,totalHeight:$,width:p}}function Od(e,{pixelRatio:t=1}={}){if(!e||!Va())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!uo(a.textContent||""))return;let s;try{s=zd(a,{pixelRatio:t})}catch(r){xt("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function $s(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){Cd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),l=o("reservations.quote.toast.retry","إعادة المحاولة"),d=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(Xt("export"),xo()):(Xt("render"),jn=!1,on())};if(Wi({message:i,duration:9e3,actionLabel:d?l:void 0,onAction:d?u:void 0,linkLabel:c,linkHref:Gr}),J?.modal?.classList.contains("show")&&Xt("error",{message:i,actionLabel:d?l:void 0,onAction:d?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function Ps({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){xt("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){xt("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function ci(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function Di(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function Fi(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function Hd(){const e=Fi();return e||(Cn||(Cn=ci(hd).catch(t=>{throw Cn=null,t}).then(()=>{const t=Fi();if(!t)throw Cn=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Cn)}async function Vd(){const e=Di();return e||(Pn||(Pn=ci(vd).catch(t=>{throw Pn=null,t}).then(()=>{const t=Di();if(!t)throw Pn=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),Pn)}async function Ud(){if(window.html2pdf||await ci(gd),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}dd(),Nd()}function w(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Kd(e="reservation"){return e==="project"?"QP":"Q"}function Qd(e,t="reservation"){const n=Number(e),a=Kd(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function Gd(){const e=window.localStorage?.getItem?.(Qr),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function yo(e="reservation"){const n=Gd()+1;return{sequence:n,quoteNumber:Qd(n,e)}}function Wd(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(Qr,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function bo(e="reservation"){return Ni[e]||Ni.reservation}function Xd(e="reservation"){try{const t=bo(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function Jd(e,t="reservation"){try{const n=bo(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function Yd(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function Zd(e,t="reservation"){if(!e)return null;const n=to(t),a=no(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,l])=>{const d=i[c];if(d==null)return;const{ids:u,emptyExplicitly:y}=Yd(d);if(!u&&!y)return;const f=Array.isArray(u)?u.filter(p=>l.has(p)):[];(f.length>0||y)&&(r[c]=f)}),{version:1,sections:s,fields:r}}function go(e){if(!e)return;const t=e.context||"reservation",n=Zd(e,t);n&&Jd(n,t)}function ho(e){if(!e)return;const t=e.context||"reservation",n=Xd(t);if(!n)return;const a=to(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=ai(e.fields||Ha(t)),i=no(t);Object.entries(n.fields).forEach(([c,l])=>{const d=i[c];if(!d)return;const u=Array.isArray(l)?l.filter(y=>d.has(y)):[];r[c]=new Set(u)}),e.fields=r}}function vo(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function eu(e){const t=bn()||[],{technicians:n=[]}=ye(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(i=>{if(!i||i.id==null)return;const c=String(i.id),l=s.get(c)||{};s.set(c,{...l,...i})}),(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(i=>({technicianId:i}))).map((i,c)=>{const l=i?.technicianId!=null?s.get(String(i.technicianId)):null;let d=i.positionLabel??i.position_name??i.position_label??i.role??i.position??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم");(!d||d.trim()==="")&&(d=i.positionLabelAr??i.position_label_ar??i.positionLabelEn??i.position_label_en??i.position_name_ar??i.position_name_en??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم"));try{const f=typeof Ct=="function"?Ct()||[]:[];let p=null;if(i?.positionId!=null&&(p=f.find(m=>String(m?.id)===String(i.positionId))||null),!p){const m=i.positionKey??i.position_key??i.positionName??i.position_name??i.position??"";if(m&&(p=typeof ua=="function"&&ua(m)||null,!p&&f.length)){const g=String(m).trim().toLowerCase();p=f.find(h=>[h.name,h.labelAr,h.labelEn].filter(Boolean).map(_=>String(_).toLowerCase()).includes(g))||null}}if(p){const m=p.labelAr||p.labelEn||p.name||"";m&&m.trim()&&(d=m)}}catch{}const u=qe(je(i.positionCost??i.position_cost??i.cost??i.daily_wage??i.dailyWage??l?.dailyWage??l?.wage??0)),y=qe(je(i.positionClientPrice??i.position_client_price??i.client_price??i.clientPrice??i.daily_total??i.dailyTotal??i.total??l?.dailyTotal??l?.total??l?.total_wage??0));return{assignmentId:i.assignmentId??i.assignment_id??`crew-${c}`,positionId:i.positionId??i.position_id??null,positionLabel:d,positionLabelAlt:i.positionLabelAlt??i.position_label_alt??"",positionCost:u,positionClientPrice:y,technicianId:i.technicianId!=null?String(i.technicianId):l?.id!=null?String(l.id):null,technicianName:i.technicianName??i.technician_name??l?.name??null,technicianRole:i.technicianRole??l?.role??null}})}function tu(e,t,n){const{projectLinked:a}=Ft(e,n);La(e.start,e.end);const s=e.discount??e.discountValue??0,r=Number(v(String(s)))||0,i=e.discountType??e.discount_type??"percent",c=String(i).toLowerCase()==="amount"?"amount":"percent",l=a?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),d=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,u=d!=null?je(d):Number.NaN,f=(e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied)===!0&&Number.isFinite(u)&&u>0?u:null,p=Array.isArray(t)?t.map(N=>N?.technicianId).filter(Boolean):[],m=rr({items:Array.isArray(e.items)?e.items:[],technicianIds:p,crewAssignments:Array.isArray(t)?t:[],discount:r,discountType:c,applyTax:l,start:e.start,end:e.end,companySharePercent:f}),g=je(e.cost??e.total??e.finalTotal),h=Number.isFinite(g),_=a?m.finalTotal:h?qe(g):m.finalTotal,q={equipmentTotal:m.equipmentTotal,crewTotal:m.crewTotal,crewCostTotal:m.crewCostTotal,discountAmount:m.discountAmount,subtotalAfterDiscount:m.subtotalAfterDiscount,taxableAmount:m.taxableAmount,taxAmount:m.taxAmount,finalTotal:_,companySharePercent:m.companySharePercent,companyShareAmount:m.companyShareAmount,netProfit:m.netProfit},A={equipmentTotal:v(m.equipmentTotal.toFixed(2)),crewTotal:v(m.crewTotal.toFixed(2)),discountAmount:v(m.discountAmount.toFixed(2)),subtotalAfterDiscount:v(m.subtotalAfterDiscount.toFixed(2)),taxableAmount:v(m.taxableAmount.toFixed(2)),taxAmount:v(m.taxAmount.toFixed(2)),finalTotal:v(_.toFixed(2)),companySharePercent:v((Number.isFinite(m.companySharePercent)?m.companySharePercent:0).toFixed(2)),companyShareAmount:v(m.companyShareAmount.toFixed(2)),netProfit:v(m.netProfit.toFixed(2))};return{totals:q,totalsDisplay:A,rentalDays:m.rentalDays}}function qn(e){if(e==null||e==="")return null;const t=Number.parseFloat(v(String(e)));return Number.isFinite(t)?t:null}function qo(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function nu(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=qn(e.amount??(n==="amount"?e.value:null)),s=qn(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=qo(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function au(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(nu).filter(Boolean);if(n.length>0)return n;const a=qn(e.paidPercent??e.paid_percent),s=qn(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=qo(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function su(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function iu(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function ru(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function ou(e){const t=Number(e?.equipmentEstimate)||0,n=ru(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const l=Math.max(0,a-c),d=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,y=d&&s&&u>0?u:0,f=y>0?Number((l*(y/100)).toFixed(2)):0,p=l+f;let m=s?p*Or:0;(!Number.isFinite(m)||m<0)&&(m=0),m=Number(m.toFixed(2));let g=s?Number(e?.totalWithTax):p;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((p+m).toFixed(2))):g=p,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:l,companyShareAmount:f,subtotal:p,applyTax:s,taxAmount:m,totalWithTax:g}}function cu(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(v(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=r.length?r:Array.isArray(e.technicians)?e.technicians:[],c=Ms(t,a,s,!1,i,{start:e.start,end:e.end});if(Number.isFinite(c))return c;const l=Number(v(String(e.cost??0)));return Number.isFinite(l)?Math.round(l):0}function lu(e,t){if(!e)return"—";const n=Ye(e);return t?`${n} - ${Ye(t)}`:n}function ce(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${v(a.toFixed(s))} ${t}`}function Ri(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${v(Number(e).toFixed(n))}%`}function du(e){if(!e?.start)return null;if(!e?.end)return 1;const t=La(e.start,e.end);return Number.isFinite(t)?t:1}function uu(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${v(String(Math.round(e)))} أيام`:"غير محدد"}function pu(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=ye(),i=e?.id!=null?s.find(L=>String(L.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:ce(0,t),expensesTotal:ce(0,t),reservationsTotal:ce(0,t),discountAmount:ce(0,t),taxAmount:ce(0,t),overallTotal:ce(0,t),paidAmount:ce(0,t),remainingAmount:ce(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:ce(0,t),remainingAmountDisplay:ce(0,t),paidPercentDisplay:Ri(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const l=i.clientId??i.customerId??i.client_id??i.customer_id??null,d=l!=null&&n.find(L=>String(L.id)===String(l))||null,u=d?.customerName??d?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),y=(i.clientCompany||d?.companyName||d?.company||"").trim(),f=d?.phone??d?.customerPhone??i.clientPhone??i.customerPhone??"",p=f?v(String(f).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),m=d?.email??i.clientEmail??i.customerEmail??"",g=m?String(m).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),h=i.projectCode||`PRJ-${v(String(i.id??""))}`,_=v(String(h)),q=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),A=su(i.type),N=i.start?Ye(i.start):"—",U=i.end?Ye(i.end):"—",S=du(i),I=S!=null?uu(S):"غير محدد",P=iu(i),k={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},O=o(`projects.status.${P}`,k[P]||P),$=i.id!=null?String(i.id):null,j=$?a.filter(L=>String(L.projectId)===$):[],C=j.map(L=>{const re=L.reservationId||L.id||"",be=L.status||L.state||"pending",he=String(be).toLowerCase(),me=o(`reservations.status.${he}`,he),We=cu(L),$e=L.start?new Date(L.start).getTime():0;return{reservationId:v(String(re||"-")),status:he,statusLabel:me,total:We,totalLabel:ce(We,t),dateRange:lu(L.start,L.end),startTimestamp:Number.isNaN($e)?0:$e}}).sort((L,re)=>re.startTimestamp-L.startTimestamp).map(({startTimestamp:L,...re})=>re).reduce((L,re)=>L+(Number(re.total)||0),0),B=new Map;j.forEach(L=>{const re=Array.isArray(L.items)?L.items:[],be=La(L.start,L.end),he=L.reservationId||L.id||"";re.forEach((me,We)=>{if(!me)return;const $e=me.barcode||me.code||me.id||me.desc||me.description||`item-${We}`,Ve=String($e||`item-${We}`),ot=B.get(Ve)||{description:me.desc||me.description||me.name||me.barcode||`#${v(String(We+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},kt=Number(me.qty)||1,_n=Number(me.price)||0;ot.totalQuantity+=kt,ot.reservationIds.add(String(he));const cn=_n*kt*Math.max(1,be);Number.isFinite(cn)&&(ot.totalCost+=cn),B.set(Ve,ot)})});const x=Array.from(B.values()).map(L=>({description:L.description,totalQuantity:L.totalQuantity,reservationsCount:L.reservationIds.size,displayCost:ce(L.totalCost,t)})),Y=new Map((r||[]).filter(Boolean).map(L=>[String(L.id),L])),K=new Map,F=L=>{if(!L)return;let re=null;typeof L=="object"?re=L.id??L.technicianId??L.technician_id??L.userId??L.user_id??null:(typeof L=="string"||typeof L=="number")&&(re=L);const be=re!=null?String(re):null,he=be&&Y.has(be)?Y.get(be):typeof L=="object"?L:null,me=he?.name||he?.full_name||he?.fullName||he?.displayName||(typeof L=="string"?L:null),We=he?.role||he?.title||null,$e=he?.phone||he?.mobile||he?.contact||null;if(!me&&!be)return;const Ve=be||me;K.has(Ve)||K.set(Ve,{id:be,name:me||"-",role:We||null,phone:$e||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(L=>F(L)),j.forEach(L=>{(Array.isArray(L.crewAssignments)&&L.crewAssignments.length?L.crewAssignments:Array.isArray(L.technicians)?L.technicians.map(be=>({technicianId:be})):[]).forEach(be=>F(be))});const D=Array.from(K.values()),R=Array.isArray(i.expenses)?i.expenses.map(L=>{const re=Number(L?.amount)||0;return{label:L?.label||L?.name||"-",amount:re,displayAmount:ce(re,t),note:L?.note||L?.description||""}}):[],M=ou(i),W=M.applyTax?Number(((M.subtotal+C)*Or).toFixed(2)):0,ie=Number((M.subtotal+C+W).toFixed(2)),ne=au(i),ue=qn(i.paidAmount??i.paid_amount)||0,H=qn(i.paidPercent??i.paid_percent)||0,oe=zs({totalAmount:ie,paidAmount:ue,paidPercent:H,history:ne}),Ee=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",we=Os({manualStatus:Ee,paidAmount:oe.paidAmount,paidPercent:oe.paidPercent,totalAmount:ie}),Ne={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},Q=o(`projects.paymentStatus.${we}`,Ne[we]||we),Z=Number(oe.paidAmount||0),se=Number(oe.paidPercent||0),Ae=Math.max(0,Number((ie-Z).toFixed(2))),He={projectSubtotal:ce(M.subtotal,t),expensesTotal:ce(M.expensesTotal,t),reservationsTotal:ce(C,t),discountAmount:ce(M.discountAmount,t),taxAmount:ce(W,t),overallTotal:ce(ie,t),paidAmount:ce(Z,t),remainingAmount:ce(Ae,t)},ae={status:we,statusLabel:Q,paidAmount:Z,paidPercent:se,remainingAmount:Ae,paidAmountDisplay:ce(Z,t),remainingAmountDisplay:ce(Ae,t),paidPercentDisplay:Ri(se)},G=(i.description||"").trim();return{project:i,customer:d,clientInfo:{name:u,company:y||"—",phone:p,email:g},projectInfo:{title:q,code:_,typeLabel:A,startDisplay:N,endDisplay:U,durationLabel:I,statusLabel:O},expenses:R,equipment:x,crew:D,totals:M,totalsDisplay:He,projectTotals:{combinedTaxAmount:W,overallTotal:ie,reservationsTotal:C,paidAmount:Z,paidPercent:se,remainingAmount:Ae,paymentStatus:we},paymentSummary:ae,notes:G,currencyLabel:t,projectStatus:P,projectStatusLabel:O,projectDurationDays:S,projectDurationLabel:I,paymentHistory:ne}}function mu({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:l={},currencyLabel:d="SR",sections:u,fieldSelections:y={},quoteNumber:f,quoteDate:p,terms:m=Ge}){const g=ai(y),h=(Q,Z)=>si(g,Q,Z),_=Q=>u?.has?.(Q),q=`<div class="quote-placeholder">${w(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,A=(Q,Z)=>`<div class="info-plain__item">
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
    </div>`,S=[];h("customerInfo","customerName")&&S.push(A(o("projects.details.client","العميل"),t.name||"-")),h("customerInfo","customerCompany")&&S.push(A(o("projects.details.company","شركة العميل"),t.company||"—")),h("customerInfo","customerPhone")&&S.push(A(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),h("customerInfo","customerEmail")&&S.push(A(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const I=_("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${w(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${S.length?`<div class="info-plain">${S.join("")}</div>`:q}
      </section>`:"",P=[];h("projectInfo","projectType")&&P.push(A(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),h("projectInfo","projectTitle")&&P.push(A(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),h("projectInfo","projectCode")&&P.push(A(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),h("projectInfo","projectStart")&&P.push(A(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),h("projectInfo","projectEnd")&&P.push(A(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),h("projectInfo","projectDuration")&&P.push(A(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),h("projectInfo","projectStatus")&&P.push(A(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const k=_("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${w(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${P.length?`<div class="info-plain">${P.join("")}</div>`:q}
      </section>`:"",O=Jr.filter(Q=>h("projectCrew",Q.id)),$=_("projectCrew")?O.length?`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${O.map(Q=>`<th>${w(Q.labelKey?o(Q.labelKey,Q.fallback):Q.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((Q,Z)=>`<tr>${O.map(se=>`<td>${se.render(Q,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(O.length,1)}" class="empty">${w(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${q}
          </section>`:"",j=[];h("financialSummary","projectSubtotal")&&j.push(N(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${ce(0,d)}`)),h("financialSummary","expensesTotal")&&j.push(N(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||ce(0,d))),h("financialSummary","reservationsTotal")&&j.push(N(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||ce(0,d))),h("financialSummary","discountAmount")&&j.push(N(o("reservations.details.labels.discount","الخصم"),i.discountAmount||ce(0,d))),h("financialSummary","taxAmount")&&j.push(N(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||ce(0,d)));const X=[];h("financialSummary","overallTotal")&&X.push(N(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||ce(0,d),{variant:"final"})),h("financialSummary","paidAmount")&&X.push(N(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||ce(0,d),{variant:"final"})),h("financialSummary","remainingAmount")&&X.push(N(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||ce(0,d),{variant:"final"}));const C=_("financialSummary")?!j.length&&!X.length?`<section class="quote-section quote-section--financial">${q}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${w(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${j.length?`<div class="totals-inline">${j.join("")}</div>`:""}
            ${X.length?`<div class="totals-final">${X.join("")}</div>`:""}
          </div>
        </section>`:"",B=Yr.filter(Q=>h("projectExpenses",Q.id)),x=_("projectExpenses")?B.length?`<section class="quote-section quote-section--table">
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
          </section>`:"",Y=Zr.filter(Q=>h("projectEquipment",Q.id)),K=_("projectEquipment")?Y.length?`<section class="quote-section quote-section--table">
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
      </section>`:"",R=[];h("payment","beneficiary")&&R.push(U(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Te.beneficiaryName)),h("payment","bank")&&R.push(U(o("reservations.quote.labels.bank","اسم البنك"),Te.bankName)),h("payment","account")&&R.push(U(o("reservations.quote.labels.account","رقم الحساب"),v(Te.accountNumber))),h("payment","iban")&&R.push(U(o("reservations.quote.labels.iban","رقم الآيبان"),v(Te.iban)));const M=`<section class="quote-section">
      <div class="payment-block">
        <h3>${w(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${R.length?R.join(""):q}</div>
      </div>
      <p class="quote-approval-note">${w(Te.approvalNote)}</p>
    </section>`,W=Array.isArray(m)&&m.length?m:Ge,ie=`<footer class="quote-footer">
        <h4>${w(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${W.map(Q=>`<li>${w(Q)}</li>`).join("")}</ul>
      </footer>`,ne=[],ue=[];if(k&&ue.push({key:"project",html:k}),I&&ue.push({key:"customer",html:I}),ue.length>1){const Q=ue.find(Ae=>Ae.key==="project"),Z=ue.find(Ae=>Ae.key==="customer"),se=[];Q?.html&&se.push(Q.html),Z?.html&&se.push(Z.html),ne.push(_e(`<div class="quote-section-row quote-section-row--primary">${se.join("")}</div>`,{blockType:"group"}))}else ue.length===1&&ne.push(_e(ue[0].html));const H=[];$&&H.push(_e($,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),x&&H.push(_e(x,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),K&&H.push(_e(K,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const oe=[];C&&oe.push(_e(C,{blockType:"summary"})),D&&oe.push(_e(D));const Ee=[_e(M,{blockType:"payment"}),_e(ie,{blockType:"footer"})],we=[...wa(ne,"projects.quote.placeholder.primary"),...H,...wa(oe,"projects.quote.placeholder.summary"),...Ee],Ne=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${w(Te.logoUrl)}" alt="${w(Te.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${w(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${w(Te.companyName)}</p>
        <p class="quote-company-cr">${w(o("reservations.quote.labels.cr","السجل التجاري"))}: ${w(Te.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${w(o("reservations.details.labels.reservationId","رقم العرض"))}</span>
          <strong>${w(f)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${w(o("projects.quote.labels.date","التاريخ"))}</span>
          <strong>${w(p)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${so}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Ne}
          ${we.join("")}
        </div>
      </div>
    </div>
  `}function So(e){if(e?.context==="project")return mu(e);const{reservation:t,customer:n,project:a,crewAssignments:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:l,sections:d,fieldSelections:u={},quoteNumber:y,quoteDate:f,terms:p=Ge}=e,m=v(String(t?.reservationId??t?.id??"")),g=t.start?v(Ye(t.start)):"-",h=t.end?v(Ye(t.end)):"-",_=n?.customerName||n?.full_name||n?.name||"-",q=n?.phone||"-",A=n?.email||"-",N=n?.company||n?.company_name||"-",U=v(q),S=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),I=a?.code||a?.projectCode||"",P=v(String(c)),k=t?.notes||"",O=Array.isArray(p)&&p.length?p:Ge,$=ai(u),j=(z,ke)=>si($,z,ke),X=z=>d?.has?.(z),C=`<div class="quote-placeholder">${w(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,B=(z,ke)=>`<div class="info-plain__item">${w(z)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${w(ke)}</strong></div>`,x=(z,ke,{variant:ct="inline"}={})=>ct==="final"?`<div class="totals-item totals-item--final">
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
      </section>`:"",D=[];j("reservationInfo","reservationId")&&D.push(B(o("reservations.details.labels.reservationId","رقم الحجز"),m||"-")),j("reservationInfo","reservationStart")&&D.push(B(o("reservations.details.labels.start","بداية الحجز"),g)),j("reservationInfo","reservationEnd")&&D.push(B(o("reservations.details.labels.end","نهاية الحجز"),h)),j("reservationInfo","reservationDuration")&&D.push(B(o("reservations.details.labels.duration","عدد الأيام"),P));const R=X("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${D.length?`<div class="info-plain">${D.join("")}</div>`:C}
      </section>`:"",M=[];j("projectInfo","projectTitle")&&M.push(B(o("reservations.details.labels.project","المشروع"),S)),j("projectInfo","projectCode")&&M.push(B(o("reservations.details.labels.code","الرمز"),I||"-"));const W=X("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${M.length?`<div class="info-plain">${M.join("")}</div>`:C}
      </section>`:"",ie=[];j("financialSummary","equipmentTotal")&&ie.push(x(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${l}`)),j("financialSummary","crewTotal")&&ie.push(x(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${l}`)),j("financialSummary","discountAmount")&&ie.push(x(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${l}`)),j("financialSummary","taxAmount")&&ie.push(x(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${l}`));const ne=j("financialSummary","finalTotal"),ue=[];ne&&ue.push(x(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${l}`,{variant:"final"}));const H=ue.length?`<div class="totals-final">${ue.join("")}</div>`:"",oe=X("financialSummary")?!ie.length&&!ne?`<section class="quote-section quote-section--financial">${C}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${w(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${ie.length?`<div class="totals-inline">${ie.join("")}</div>`:""}
            ${H}
          </div>
        </section>`:"",{groups:Ee}=ir(t),we=Ee.map(z=>{const ke=Number(z?.count??z?.quantity??1)||1,ct=Number(z?.unitPrice);let vt=Number.isFinite(ct)?ct:0;if(!vt||vt<=0){const Pe=Number(z?.totalPrice);Number.isFinite(Pe)&&ke>0&&(vt=Number((Pe/ke).toFixed(2)))}Number.isFinite(vt)||(vt=0);const Wn=z?.type==="package"||Array.isArray(z?.items)&&z.items.some(Pe=>Pe?.type==="package"),Xn=Array.isArray(z?.barcodes)&&z.barcodes.length?z.barcodes[0]:Array.isArray(z?.items)&&z.items.length?z.items[0]?.barcode:null;let lt=z?.packageDisplayCode??z?.package_code??z?.code??z?.packageCode??(Array.isArray(z?.items)&&z.items.length?z.items[0]?.package_code??z.items[0]?.code??z.items[0]?.packageCode:null);const Jn=Pe=>{const Me=(Pe==null?"":String(Pe)).trim();return!!(!Me||/^pkg-/i.test(Me)||/^\d+$/.test(Me)&&Me.length<=4)};if(!lt||Jn(lt)){const Pe=z?.packageId??z?.package_id??(Array.isArray(z?.items)&&z.items.length?z.items[0]?.packageId??z.items[0]?.package_id:null);if(Pe)try{const Me=Zi(Pe);Me&&Me.package_code&&(lt=Me.package_code)}catch{}}if(!lt||Jn(lt))try{const Pe=is(z?.description||"");if(Pe){const Me=Bc();let Ot=Me.find(qt=>is(qt?.name||qt?.title||qt?.label||"")===Pe);Ot||(Ot=Me.find(qt=>{const Zn=is(qt?.name||qt?.title||qt?.label||"");return Zn.includes(Pe)||Pe.includes(Zn)})),Ot&&Ot.package_code&&(lt=Ot.package_code)}}catch{}const Yn=Wn?lt??Xn??"":z?.barcode??Xn??"",Wa=Yn!=null?String(Yn):"";let ln=Number.isFinite(Number(z?.totalPrice))?Number(z.totalPrice):Number((vt*ke).toFixed(2));return ln=qe(ln),{...z,isPackage:Wn,desc:z?.description,barcode:Wa,packageCodeResolved:lt||"",qty:ke,price:ln,totalPrice:ln,unitPriceValue:vt}}),Ne=Wr.filter(z=>j("items",z.id)),Q=Ne.length>0,Z=Q?Ne.map(z=>`<th>${w(z.labelKey?o(z.labelKey,z.fallback):z.fallback)}</th>`).join(""):"",Ae=we.length>0?we.map((z,ke)=>`<tr>${Ne.map(ct=>`<td>${ct.render(z,ke)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Ne.length,1)}" class="empty">${w(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,He=X("items")?Q?`<section class="quote-section quote-section--table">
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
          </section>`:"",ae=Xr.filter(z=>j("crew",z.id)),G=ae.length>0,ge=G?ae.map(z=>`<th>${w(z.labelKey?o(z.labelKey,z.fallback):z.fallback)}</th>`).join(""):"",L=Array.isArray(s)?s:[],re=L.length?L.map((z,ke)=>`<tr>${ae.map(ct=>`<td>${ct.render(z,ke)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(ae.length,1)}" class="empty">${w(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,be=X("crew")?G?`<section class="quote-section quote-section--table">
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
      </section>`:"",me=[];j("payment","beneficiary")&&me.push(Y(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Te.beneficiaryName)),j("payment","bank")&&me.push(Y(o("reservations.quote.labels.bank","اسم البنك"),Te.bankName)),j("payment","account")&&me.push(Y(o("reservations.quote.labels.account","رقم الحساب"),v(Te.accountNumber))),j("payment","iban")&&me.push(Y(o("reservations.quote.labels.iban","رقم الآيبان"),v(Te.iban)));const We=`<section class="quote-section">
      <div class="payment-block">
        <h3>${w(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${me.length?me.join(""):C}</div>
      </div>
      <p class="quote-approval-note">${w(Te.approvalNote)}</p>
    </section>`,$e=`<footer class="quote-footer">
        <h4>${w(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${O.map(z=>`<li>${w(z)}</li>`).join("")}</ul>
      </footer>`,Ve=[];F&&R?Ve.push(_e(`<div class="quote-section-row">${F}${R}</div>`,{blockType:"group"})):(R&&Ve.push(_e(R)),F&&Ve.push(_e(F))),W&&Ve.push(_e(W));const ot=[];He&&ot.push(_e(He,{blockType:"table",extraAttributes:'data-table-id="items"'})),be&&ot.push(_e(be,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const kt=[];oe&&kt.push(_e(oe,{blockType:"summary"})),he&&kt.push(_e(he));const _n=[_e(We,{blockType:"payment"}),_e($e,{blockType:"footer"})],cn=[...wa(Ve,"reservations.quote.placeholder.page1"),...ot,...wa(kt,"reservations.quote.placeholder.page2"),..._n],Ga=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${w(Te.logoUrl)}" alt="${w(Te.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${w(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${w(Te.companyName)}</p>
        <p class="quote-company-cr">${w(o("reservations.quote.labels.cr","السجل التجاري"))}: ${w(Te.commercialRegistry)}</p>
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
      <style>${so}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Ga}
          ${cn.join("")}
        </div>
      </div>
    </div>
  `}async function fu(){try{const e=ye();if((Array.isArray(e?.packages)?e.packages:[]).length>0)return;const n=await rt("/packages/?all=1"),a=Array.isArray(n?.data)?n.data:Array.isArray(n)?n:[];a.length&&(ka({packages:a}),document.dispatchEvent?.(new CustomEvent("packages:changed",{detail:{packages:a}})))}catch{}}function yu(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function zn(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>yu(c)),i=[s,...r].map(c=>c.catch(l=>(xt("asset load failed",l),Id(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function Eo(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await fo(r),await zn(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let l=null,d=null;const u=S=>{S.style.margin="0 auto",S.style.breakInside="avoid",S.style.pageBreakInside="avoid",S.style.pageBreakAfter="auto",S.style.breakAfter="auto"},y=()=>{const S=a.createElement("div"),I=s.childElementCount===0;if(S.className="quote-page",S.dataset.pageIndex=String(s.childElementCount),I){S.classList.add("quote-page--primary");const k=i.cloneNode(!0);k.removeAttribute("data-quote-header-template"),S.appendChild(k)}else S.classList.add("quote-page--continuation");const P=a.createElement("main");P.className="quote-body",S.appendChild(P),s.appendChild(S),u(S),l=S,d=P},f=()=>{(!l||!d||!d.isConnected)&&y()},p=()=>{if(!l||!d||d.childElementCount>0)return;const S=l;l=null,d=null,S.parentNode&&S.parentNode.removeChild(S)},m=()=>{l=null,d=null},g=()=>l?l.scrollHeight-l.clientHeight>Sd:!1,h=(S,{allowOverflow:I=!1}={})=>(f(),d.appendChild(S),g()&&!I?(d.removeChild(S),p(),!1):!0),_=S=>{const I=S.cloneNode(!0);I.removeAttribute?.("data-quote-block"),I.removeAttribute?.("data-block-type"),I.removeAttribute?.("data-table-id"),!h(I)&&(m(),!h(I)&&h(I,{allowOverflow:!0}))},q=S=>{const I=S.querySelector("table");if(!I){_(S);return}const P=S.querySelector("h3"),k=I.querySelector("thead"),O=Array.from(I.querySelectorAll("tbody tr"));if(!O.length){_(S);return}let $=null,j=0;const X=(B=!1)=>{const x=S.cloneNode(!1);x.removeAttribute("data-quote-block"),x.removeAttribute("data-block-type"),x.removeAttribute("data-table-id"),x.classList.add("quote-section--table-fragment"),B&&x.classList.add("quote-section--table-fragment--continued");const Y=P?P.cloneNode(!0):null;Y&&x.appendChild(Y);const K=I.cloneNode(!1);K.classList.add("quote-table--fragment"),k&&K.appendChild(k.cloneNode(!0));const F=a.createElement("tbody");return K.appendChild(F),x.appendChild(K),{section:x,body:F}},C=(B=!1)=>$||($=X(B),h($.section)||(m(),h($.section)||h($.section,{allowOverflow:!0})),$);O.forEach(B=>{C(j>0);const x=B.cloneNode(!0);if($.body.appendChild(x),g()&&($.body.removeChild(x),$.body.childElementCount||(d.removeChild($.section),$=null,p()),m(),$=null,C(j>0),$.body.appendChild(x),g())){$.section.classList.add("quote-section--table-fragment--overflow"),j+=1;return}j+=1}),$=null};if(!c.length)return;c.forEach(S=>{S.getAttribute("data-block-type")==="table"?q(S):_(S)});const A=Array.from(s.children),N=[];if(A.forEach((S,I)=>{const P=S.querySelector(".quote-body");if(I!==0&&(!P||P.childElementCount===0)){S.remove();return}N.push(S)}),!n){const S=a.defaultView||window,I=Math.min(3,Math.max(1,S.devicePixelRatio||1)),P=Va()?Math.min(2,I):I;N.forEach(k=>Od(k,{pixelRatio:P}))}N.forEach((S,I)=>{const P=I===0;S.style.pageBreakAfter="auto",S.style.breakAfter="auto",S.style.pageBreakBefore=P?"auto":"always",S.style.breakBefore=P?"auto":"page",n?S.style.boxShadow="":S.style.boxShadow="none"});const U=N[N.length-1]||null;l=U,d=U?.querySelector(".quote-body")||null,await zn(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function li(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function bu(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([Vd(),Hd()]),c=e.ownerDocument||document,l=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,l,c?.documentElement?.getAttribute?.("dir")].some(S=>typeof S=="string"&&S.toLowerCase().startsWith("rtl")),y=typeof window<"u"&&window.devicePixelRatio||1,f=oi(),p=lo(),m=Va();let g;m?g=1.5:p?g=Math.min(1.7,Math.max(1.2,y*1.1)):f?g=Math.min(1.8,Math.max(1.25,y*1.2)):g=Math.min(2,Math.max(1.6,y*1.4));const h=m||p?.9:f?.92:.95,_=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),q={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let A=0;const N=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let S=0;S<s.length;S+=1){const I=s[S];await fo(I),await zn(I);const P=I.ownerDocument||document,k=P.createElement("div");Object.assign(k.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const O=I.cloneNode(!0);O.style.width=`${ca}px`,O.style.maxWidth=`${ca}px`,O.style.minWidth=`${ca}px`,O.style.height=`${la}px`,O.style.maxHeight=`${la}px`,O.style.minHeight=`${la}px`,O.style.position="relative",O.style.background="#ffffff",li(O),k.appendChild(O),P.body.appendChild(k);let $;try{await zn(O),$=await i(O,{...q,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(F){throw $s(F,"pageCapture",{toastMessage:N}),F}finally{k.parentNode?.removeChild(k)}if(!$)continue;const j=$.width||1,C=($.height||1)/j;let B=Is,x=B*C,Y=0;if(x>oa){const F=oa/x;x=oa,B=B*F,Y=Math.max(0,(Is-B)/2)}const K=$.toDataURL("image/jpeg",h);A>0&&_.addPage(),_.addImage(K,"JPEG",Y,0,B,x,`page-${A+1}`,"FAST"),A+=1,await new Promise(F=>window.requestAnimationFrame(F))}}catch(S){throw Ps({safariWindowRef:n,mobileWindowRef:a}),S}if(A===0)throw Ps({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(p||m){const S=_.output("blob");if(m){const I=URL.createObjectURL(S);Bn();try{window.location.assign(I)}catch(P){xt("mobile safari blob navigation failed",P)}finally{setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{const I=URL.createObjectURL(S),P=()=>p&&n&&!n.closed?n:a&&!a.closed?a:null,k=($,j)=>{if(Bn(),!$){window.location.assign(j);return}try{$.location.replace(j),$.focus?.()}catch(X){xt("direct blob navigation failed",X);try{$.document.open(),$.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${w(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${j}" title="PDF preview"></iframe></body></html>`),$.document.close()}catch(C){xt("iframe blob delivery failed",C),window.location.assign(j)}}},O=P();k(O,I),setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{Bn();const S=_.output("bloburl"),I=document.createElement("a");I.href=S,I.download=t,I.rel="noopener",I.style.display="none",document.body.appendChild(I),I.click(),setTimeout(()=>{URL.revokeObjectURL(S),I.remove()},2e3)}}function on(){if(!T||!J)return;const{previewFrame:e}=J;if(!e)return;const t=T.context||"reservation",n=So({context:t,reservation:T.reservation,customer:T.customer,project:T.project,crewAssignments:T.crewAssignments,totals:T.totals,totalsDisplay:T.totalsDisplay,rentalDays:T.rentalDays,currencyLabel:T.currencyLabel,sections:T.sections,fieldSelections:T.fields,quoteNumber:T.quoteNumber,quoteDate:T.quoteDateLabel,terms:T.terms,projectCrew:T.projectCrew,projectExpenses:T.projectExpenses,projectEquipment:T.projectEquipment,projectInfo:T.projectInfo,clientInfo:T.clientInfo,paymentSummary:T.paymentSummary,projectTotals:T.projectTotals});Xt("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&(Kr(r),Vr(r,s),Ur(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await Eo(i,{context:"preview"}),li(i))}catch(p){console.error("[reservations/pdf] failed to layout preview document",p)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),l=a?.querySelector(".quote-preview-pages"),d=ca;let u=18;if(l&&a?.defaultView){const p=a.defaultView.getComputedStyle(l),m=parseFloat(p.rowGap||p.gap||`${u}`);Number.isFinite(m)&&m>=0&&(u=m)}const y=la,f=c.length?c.length*y+Math.max(0,(c.length-1)*u):y;if(e.dataset.baseWidth=String(d),e.dataset.baseHeight=String(f),e.style.width=`${d}px`,e.style.minWidth=`${d}px`,e.style.height=`${f}px`,e.style.minHeight=`${f}px`,J?.previewFrameWrapper&&!J?.userAdjustedZoom){const p=J.previewFrameWrapper.clientWidth-24;p>0&&p<d?ft=Math.max(p/d,.3):ft=1}Ao(ft)}finally{Bn()}},{once:!0})}function gu(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?T.sections.add(n):T.sections.delete(n),go(T),wo(),on())}function hu(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=T.context||"reservation",r=T.fields||(T.fields=Ha(s)),i=_d(r,n);t.checked?i.add(a):i.delete(a),go(T),on()}function vu(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(ri(T,n),T.sectionExpansions[n]=t.open)}function wo(){if(!J?.toggles||!T)return;const{toggles:e}=J,t=T.fields||{},n=T.context||"reservation";ri(T);const a=Oa(n),s=eo(n),r=a.map(({id:i,labelKey:c,fallback:l})=>{const d=o(c,l),u=T.sections.has(i),y=s[i]||[],f=kd(T,i),p=y.length?`<div class="quote-toggle-sublist">
          ${y.map(m=>{const g=si(t,i,m.id),h=u?"":"disabled",_=m.labelKey?o(m.labelKey,m.fallback):m.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${m.id}" ${g?"checked":""} ${h}>
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
        ${p}
      </details>
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",gu)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",hu)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",vu)})}function qu(){if(J?.modal)return J;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
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
  `;const p=document.createElement("div");p.className="quote-preview-frame-wrapper",p.appendChild(y),n.innerHTML="";const m=document.createElement("div");m.className="quote-preview-scroll",m.appendChild(p),n.appendChild(m);const g=document.createElement("div");g.className="quote-preview-status",g.setAttribute("role","status"),g.setAttribute("aria-live","polite"),g.hidden=!0,g.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${w(ao("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(f),i?.addEventListener("click",async()=>{if(T){i.disabled=!0;try{await xo()}finally{i.disabled=!1}}});const h=()=>{_s()||ks(e)};d.forEach(N=>{N?.addEventListener("click",h)}),l&&!d.includes(l)&&l.addEventListener("click",h),e.addEventListener("click",N=>{_s()||N.target===e&&ks(e)}),J={modal:e,toggles:t,preview:n,previewScroll:m,previewFrameWrapper:p,zoomControls:f,zoomValue:f.querySelector("[data-zoom-value]"),previewFrame:y,meta:a,downloadBtn:i,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const _=f.querySelector("[data-zoom-out]"),q=f.querySelector("[data-zoom-in]"),A=f.querySelector("[data-zoom-reset]");return _?.addEventListener("click",()=>Mi(-.1)),q?.addEventListener("click",()=>Mi(.1)),A?.addEventListener("click",()=>Aa(1,{markManual:!0})),s&&s.addEventListener("input",Eu),r&&r.addEventListener("click",wu),Aa(ft),J}function Aa(e,{silent:t=!1,markManual:n=!1}={}){ft=Math.min(Math.max(e,.25),2.2),n&&J&&(J.userAdjustedZoom=!0),Ao(ft),!t&&J?.zoomValue&&(J.zoomValue.textContent=`${Math.round(ft*100)}%`)}function Mi(e){Aa(ft+e,{markManual:!0})}function Ao(e){if(!J?.previewFrame||!J.previewFrameWrapper)return;const t=J.previewFrame,n=J.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",oi()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function Su(){if(!J?.meta||!T)return;const{meta:e}=J;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${w(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${w(T.quoteNumber)}</strong></div>
      <div><span>${w(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${w(T.quoteDateLabel)}</strong></div>
    </div>
  `}function di(){if(!J?.termsInput)return;const e=(T?.terms&&T.terms.length?T.terms:Ge).join(`
`);J.termsInput.value!==e&&(J.termsInput.value=e)}function Eu(e){if(!T)return;const t=ws(e?.target?.value??"");if(t.length){T.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{T.terms=[...Ge],di();const n=Ge.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}on()}function wu(e){if(e?.preventDefault?.(),!T)return;T.terms=[...Ge];const t=document.getElementById("reservation-terms");t&&(t.value=Ge.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=Ge.join(`
`)),di(),on()}async function xo(){if(!T)return;Xt("export");const t=!oi()&&lo(),n=Va(),a=null,s=!n&&t?window.open("","_blank"):null;(l=>{if(l)try{l.document.open(),l.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${w(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${w(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${w(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),l.document.close()}catch(d){xt("failed to prime download window",d)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await Ud(),rs("html2pdf ensured");const l=T.context||"reservation",d=So({context:l,reservation:T.reservation,customer:T.customer,project:T.project,crewAssignments:T.crewAssignments,totals:T.totals,totalsDisplay:T.totalsDisplay,rentalDays:T.rentalDays,currencyLabel:T.currencyLabel,sections:T.sections,fieldSelections:T.fields,quoteNumber:T.quoteNumber,quoteDate:T.quoteDateLabel,terms:T.terms,projectCrew:T.projectCrew,projectExpenses:T.projectExpenses,projectEquipment:T.projectEquipment,projectInfo:T.projectInfo,clientInfo:T.clientInfo,paymentSummary:T.paymentSummary,projectTotals:T.projectTotals});i=document.createElement("div"),i.innerHTML=d,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),Kr(i),Vr(i),Ur(i),rs("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await Eo(u,{context:"export"}),await zn(u),li(u),rs("layout complete for export document")}catch(f){$s(f,"layoutQuoteDocument",{suppressToast:!0})}}const y=`quotation-${T.quoteNumber}.pdf`;await bu(u,{filename:y,safariWindowRef:s,mobileWindowRef:a}),T.sequenceCommitted||(Wd(T.quoteSequence),T.sequenceCommitted=!0)}catch(l){Ps({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,$s(l,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),Bn()}}function Io(){const e=qu();e?.modal&&(jn=!1,ft=1,J&&(J.userAdjustedZoom=!1),Aa(ft,{silent:!0}),wo(),Su(),di(),on(),xd(e.modal))}async function Au({reservation:e,customer:t,project:n}){if(!e){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}await fu();const a=eu(e),{totalsDisplay:s,totals:r,rentalDays:i}=tu(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:l,quoteNumber:d}=yo("reservation"),u=new Date,y=md();T={context:"reservation",reservation:e,customer:t,project:n,crewAssignments:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(Oa("reservation").filter(f=>f.defaultSelected).map(f=>f.id)),sectionExpansions:ii("reservation"),fields:Ha("reservation"),terms:y,quoteSequence:l,quoteNumber:d,quoteDate:u,quoteDateLabel:vo(u),sequenceCommitted:!1},ho(T),Io()}async function Pp({project:e}){if(!e){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=pu(e),{project:n}=t;if(!n){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=yo("project"),r=new Date,i=[...pd];T={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(Oa("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:ii("project"),fields:Ha("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:vo(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},ho(T),Io()}function xu({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=bn(),{reservations:r=[],customers:i=[],technicians:c=[],projects:l=[]}=ye(),d=r.map(q=>{const A=ls(q);return{...A,id:q.id??A.id,reservationId:q.reservationId??q.reservation_id??A.reservationId,reservationCode:q.reservationCode??q.reservation_code??A.reservationCode}}),u=d,y=Array.isArray(s)?s:c||[],f=new Map((l||[]).map(q=>[String(q.id),q])),p=document.getElementById(e);if(!p){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!u||u.length===0){p.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const m=t||ed(),g=new Map(i.map(q=>[String(q.id),q])),h=new Map(y.map(q=>[String(q.id),q])),_=sd({reservations:d,filters:m,customersMap:g,techniciansMap:h,projectsMap:f});if(_.length===0){p.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}p.innerHTML=`<div class="reservations-grid">${id({entries:_,customersMap:g,techniciansMap:h,projectsMap:f})}</div>`,p.querySelectorAll('[data-action="details"]').forEach(q=>{const A=Number(q.dataset.reservationIndex);Number.isNaN(A)||q.addEventListener("click",()=>{typeof n=="function"&&n(A)})}),p.querySelectorAll('button[data-action="confirm"]').forEach(q=>{const A=Number(q.dataset.reservationIndex);Number.isNaN(A)||q.addEventListener("click",N=>{N.stopPropagation(),typeof a=="function"&&a(A,N)})})}function Iu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=ye(),c=s.map(g=>{const h=ls(g);return{...h,id:g.id??h.id,reservationId:g.reservationId??g.reservation_id??h.reservationId,reservationCode:g.reservationCode??g.reservation_code??h.reservationCode}}),l=s[e];if(!l)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=c[e]??ls(l),u=r.find(g=>String(g.id)===String(l.customerId)),y=l.projectId?i.find(g=>String(g.id)===String(l.projectId)):null,f=document.getElementById("reservation-details-body"),p=document.getElementById("reservationDetailsModal"),m=()=>{const g=()=>{p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(p)?.hide()},h=document.getElementById("reservation-details-edit-btn");h&&(h.onclick=()=>{g(),typeof t=="function"&&t(e,{reservation:l,customer:u,getEditContext:a})});const _=document.getElementById("reservation-details-delete-btn");_&&(_.onclick=()=>{g(),typeof n=="function"&&n(e,{reservation:l,customer:u})});const q=f?.querySelector('[data-action="open-project"]');q&&y&&q.addEventListener("click",()=>{g();const N=y?.id!=null?String(y.id):"",U=N?`projects.html?project=${encodeURIComponent(N)}`:"projects.html";window.location.href=U});const A=document.getElementById("reservation-details-export-btn");A&&(A.onclick=async N=>{N?.preventDefault?.(),N?.stopPropagation?.(),A.blur();try{await Au({reservation:l,customer:u,project:y})}catch(U){console.error("❌ [reservations] export to PDF failed",U),E(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}})};if(f){const g=bn()||[];f.innerHTML=Ti(d,u,g,e,y),m(),or().then(()=>{const h=bn()||[];f.innerHTML=Ti(d,u,h,e,y),m()}).catch(()=>{})}return p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(p).show(),!0}function _o(){const e=()=>{An(),Re(),bn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let zi=!1,Oi=null;function _u(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function Cp(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=_u(n);if(!a&&zi&&Wt().length>0&&s===Oi)return Wt();try{const r=await cr(n||{});return zi=!0,Oi=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return Wt()}}async function ku(e,{onAfterChange:t}={}){if(!tn())return Hn(),!1;const a=Wt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await Dc(s),_o(),t?.({type:"deleted",reservation:a}),E(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=Ca(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return E(i,"error"),!1}}async function $u(e,{onAfterChange:t}={}){const a=Wt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=Ft(a);if(r)return E(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await Fc(s);return _o(),t?.({type:"confirmed",reservation:i}),E(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=Ca(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return E(c,"error"),!1}}function In(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Fn(e,n),end:Fn(t,a)}}function xa(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ui(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function ko(){const{container:e,select:t,hint:n,addButton:a}=ui();if(!t)return;const s=t.value,r=Xi(),i=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,l=r.map(u=>{const y=Number.isFinite(Number(u.price))?Number(u.price):0,f=v(y.toFixed(2)),p=`${u.name} — ${f} ${i}`;return`<option value="${xa(u.id)}">${xa(p)}</option>`}).join("");t.innerHTML=`${c}${l}`;const d=r.length>0;t.disabled=!d,a&&(a.disabled=!d),e&&(e.hidden=!d,e.setAttribute("aria-hidden",d?"false":"true")),n&&(d?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),d&&s&&r.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function Pu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=Mt(),{start:r,end:i}=In(),{reservations:c=[]}=ye(),l=a!=null&&c[a]||null,d=l?.id??l?.reservationId??null,u=Br(n,{existingItems:s,start:r,end:i,ignoreReservationId:d});if(!u.success)return t||E(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const y=[...s,u.package];return zt(a,y),Rt(y),et(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function Hi(){const{select:e}=ui();if(!e)return;const t=e.value||"";Pu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function Cu(){const{addButton:e,select:t}=ui();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{Hi()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Hi())}),t.dataset.listenerAttached="true"),ko()}function Rt(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,Ui(t);return}const l=Sn(e);t.innerHTML=l.map(d=>{const u=d.items[0]||{},y=an(u)||d.image,f=y?`<img src="${y}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',p=d.items.some($=>$?.type==="package"),m=v(String(d.count)),g=je(d.unitPrice),h=Number.isFinite(g)?qe(g):0,_=je(d.totalPrice),q=Number.isFinite(_)?_:h*(Number.isFinite(d.count)?d.count:1),A=qe(q),N=`${v(h.toFixed(2))} ${a}`,U=`${v(A.toFixed(2))} ${a}`,S=d.barcodes.map($=>v(String($||""))).filter(Boolean),I=S.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${S.map($=>`<li>${$}</li>`).join("")}
            </ul>
          </details>`:"";let P="";if(p){const $=new Map,j=C=>{const B=Number.parseFloat(v(String(C??"")).replace(/[^0-9.]/g,""));return!Number.isFinite(B)||B<=0||B>99?1:Math.round(B)},X=[];if(Array.isArray(d.packageItems)&&d.packageItems.length&&X.push(...d.packageItems),d.items.forEach(C=>{Array.isArray(C?.packageItems)&&X.push(...C.packageItems)}),X.forEach(C=>{if(!C)return;const B=te(C.barcode||C.normalizedBarcode||C.desc||Math.random());if(!B)return;const x=$.get(B),Y=j(C.qtyPerPackage??C.perPackageQty??C.quantityPerPackage??C.qty??C.quantity??1),K=Math.max(1,Math.min(Y,99));if(x){x.qty=K;return}$.set(B,{desc:C.desc||C.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:K,barcode:C.barcode??C.normalizedBarcode??""})}),$.size){const C=Array.from($.values()).map(B=>{const x=v(String(B.qty>0?Math.min(B.qty,99):1)),Y=xa(B.desc||""),K=B.barcode?` <span class="reservation-package-items__barcode">(${xa(v(String(B.barcode)))})</span>`:"";return`<li>${Y}${K} × ${x}</li>`}).join("");P=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${C}
              </ul>
            </details>
          `}}const k=p?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",O=p?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${d.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${d.description||"-"}</div>
                ${p?`${P||""}${I||""}`:I}
              </div>
            </div>
          </td>
          <td>
            <div class="${k}" data-group-key="${d.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${d.key}" aria-label="${i}"${O}>−</button>
              <span class="reservation-qty-value">${m}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${d.key}" aria-label="${r}"${O}>+</button>
            </div>
          </td>
          <td>${N}</td>
          <td>${U}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),Ui(t)}function Lu(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function Ua(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=Ka();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,Vi();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${v(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${v(Number(s.percentage).toFixed(2))}%`:"—",l=s?.recordedAt?v(Ye(s.recordedAt)):"—",d=Lu(s?.type),u=s?.note?v(s.note):"";return`
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
  `,Vi()}function Tu(){if(On()){E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=Co(e);let a=Lo(t);if(!Number.isFinite(a)||a<=0){E(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=ds.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,l=o("reservations.create.summary.currency","SR");let d=null,u=null;if(n==="percent"){const f=Math.max(0,100-i);if(f<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const p=Math.min(a,f);if(p!==a){const m=v(p.toFixed(2));E(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",m)),a=p}u=Number(a.toFixed(2)),r>0&&(d=a/100*r)}else{const f=Math.max(0,r-c);if(f<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const p=Math.min(a,f);if(p!==a){const m=`${v(p.toFixed(2))} ${l}`;E(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",m)),a=p}d=Number(a.toFixed(2)),r>0&&(u=d/r*100)}d!=null&&(d=Number(d.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const y={type:n,value:a,amount:d,percentage:u,recordedAt:new Date().toISOString()};Uu(y),pi(Ka()),Ua(),et(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),E(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function Vi(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(On()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Tu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(On()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(Ku(s),pi(Ka()),Ua(),et(),E(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function Nu(e){const{index:t,items:n}=Mt(),s=Sn(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,l)=>l!==r);zt(t,i),Rt(i),et()}function ju(e){const{index:t,items:n}=Mt(),a=n.filter(s=>Pa(s)!==e);a.length!==n.length&&(zt(t,a),Rt(a),et())}function Bu(e){const{index:t,items:n}=Mt(),s=Sn(n).find(h=>h.key===e);if(!s||s.items.some(h=>h?.type==="package"))return;const{start:r,end:i}=In();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=ye(),l=t!=null&&c[t]||null,d=l?.id??l?.reservationId??null,u=new Set(n.map(h=>te(h.barcode))),{equipment:y=[]}=ye(),f=(y||[]).find(h=>{const _=te(h?.barcode);return!_||u.has(_)||Pa({desc:h?.desc||h?.description||h?.name||"",price:Number(h?.price)||0})!==e||!Ks(h)?!1:!bt(_,r,i,d)});if(!f){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const p=te(f.barcode),m=nn(f);if(!m){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:m,equipmentId:m,barcode:p,desc:f.desc||f.description||f.name||s.description||"",qty:1,price:Number.isFinite(Number(f.price))?Number(f.price):s.unitPrice,image:an(f)}];zt(t,g),Rt(g),et()}function Ui(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){Nu(s);return}if(a==="increase-edit-group"&&s){Bu(s);return}if(a==="remove-edit-group"&&s){ju(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||Ru(i)}}),e.dataset.groupListenerAttached="true")}function On(){return!!document.getElementById("edit-res-project")?.value}function Du(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{On()&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function Fu(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),l=document.getElementById("edit-res-payment-history");[n,a,s,r,i,c,l].forEach(Du),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s&&(s.value="unpaid",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),l&&(l.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.dataset.linkedDisabled="false"))}function et(){const e=document.getElementById("edit-res-summary");if(!e)return;Ua();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),Je(a),et()}),a.dataset.listenerAttached="true");const s=v(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=On();Fu(c);const l=document.getElementById("edit-res-tax"),d=c?!1:l?.checked||!1,u=!c&&a?.dataset?.userSelected==="true",y=c?"unpaid":u&&a?.value||"unpaid";let f=null;!c&&d&&(it("edit-res-company-share"),f=hn("edit-res-company-share"),(!Number.isFinite(f)||f<=0)&&(it("edit-res-company-share"),f=hn("edit-res-company-share")));const{items:p=[],payments:m=[]}=Mt(),{start:g,end:h}=In(),_=ds({items:p,discount:r,discountType:i,applyTax:d,paidStatus:y,start:g,end:h,companySharePercent:f,paymentHistory:m});e.innerHTML=_;const q=ds.lastResult;if(q&&a){const A=q.paymentStatus;u?Je(a,a.value):(a.value!==A&&(a.value=A),a.dataset&&delete a.dataset.userSelected,Je(a,A))}else a&&Je(a,a.value)}function Ru(e){if(e==null)return;const{index:t,items:n}=Mt();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);zt(t,a),Rt(a),et()}function Mu(e){const t=e?.value??"",n=te(t);if(!n)return;const a=Ta(n);if(!a){E(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=It(a);if(s==="maintenance"||s==="retired"){E(en(s));return}const r=te(n),{index:i,items:c=[]}=Mt();if(c.findIndex(h=>te(h.barcode)===r)>-1){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=In();if(!d||!u){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:y=[]}=ye(),f=i!=null&&y[i]||null,p=f?.id??f?.reservationId??null;if(bt(r,d,u,p)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=nn(a);if(!m){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:m,equipmentId:m,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];zt(i,g),e&&(e.value=""),Rt(g),et()}function Ia(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Lr(t),a=te(n?.barcode||t);if(!n||!a){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=It(n);if(s==="maintenance"||s==="retired"){E(en(s));return}const{start:r,end:i}=In();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:l=[]}=Mt();if(l.some(g=>te(g.barcode)===a)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=ye(),y=c!=null&&u[c]||null,f=y?.id??y?.reservationId??null;if(bt(a,r,i,f)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const p=nn(n);if(!p){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const m=[...l,{id:p,equipmentId:p,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];zt(c,m),Rt(m),et(),e.value=""}function $o(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Ia(e))});const t=()=>{Tr(e.value,"edit-res-equipment-description-options")&&Ia(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{et()});const e=()=>{Cu()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{ko()})}typeof window<"u"&&(window.getEditReservationDateRange=In,window.renderEditPaymentHistory=Ua);function zu(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){qs(e);return}Ia(e)}}function Lp(){Dt(),$o()}function Ou(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let yn=null,mt=[],yt=[],Cs=null,ze={},os=!1;const Hu="__DEBUG_CREW__";function Vu(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(Hu);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function Ki(e,t){if(Vu())try{console.log(`🪵 [crew-debug:edit] ${e}`,t)}catch{}}function Ls(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function Ts(){return document.getElementById("edit-res-confirmed")?.value==="true"}function Mt(){return{index:yn,items:mt,payments:yt}}function zt(e,t,n=yt){yn=typeof e=="number"?e:null,mt=Array.isArray(t)?[...t]:[],yt=Array.isArray(n)?[...n]:[]}function Po(){yn=null,mt=[],zc(),yt=[]}function Ka(){return[...yt]}function pi(e){yt=Array.isArray(e)?[...e]:[]}function Uu(e){e&&(yt=[...yt,e])}function Ku(e){!Number.isInteger(e)||e<0||(yt=yt.filter((t,n)=>n!==e))}function Dn(e,t=1){const n=Number.parseFloat(v(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function Ns(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(v(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function Qu(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?te(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:Dn(e.qty??e.quantity??e.count??1),price:Ns(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function Gu(e,t=0){if(!e||typeof e!="object")return null;const n=Rn(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=Dn(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),r=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:Fs(e)).map(f=>Qu(f)).filter(Boolean),i=e.total_price??e.totalPrice??e.total??null;let c=Ns(e.unit_price??e.unitPrice??e.price??null,0);if((!c||c===0)&&i!=null){const f=Ns(i,0);f>0&&a>0&&(c=Number((f/a).toFixed(2)))}const l=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,l,n].find(f=>f!=null&&String(f).trim()!=="")||`Package ${n}`,y=e.image??e.cover??e.thumbnail??r.find(f=>f?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:v(String(u)),name:v(String(u)),qty:a,price:c,barcode:l,packageItems:r,image:y}}function Wu(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const r=s-n;e.set(a,r>0?r:0)})}function Xu(e={},t=[]){const n=Array.isArray(t)?t.map(c=>({...c})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((c,l)=>Gu(c,l)).filter(Boolean);if(!s.length)return n;const r=new Map;s.forEach(c=>{const l=Dn(c.qty??c.quantity??1);if(c.barcode){const d=te(c.barcode);if(d){const u=`package::${d}`;r.set(u,(r.get(u)??0)+l)}}(c.packageItems||[]).forEach(d=>{if(!d)return;const u=l*Dn(d.qty??d.quantity??1),y=d.equipmentId??null,f=d.normalizedBarcode||(d.barcode?te(d.barcode):null);if(y!=null){const p=`equipment::${String(y)}`;r.set(p,(r.get(p)??0)+u)}if(f){const p=`barcode::${f}`;r.set(p,(r.get(p)??0)+u)}})});const i=[];return n.forEach(c=>{if(!c||typeof c!="object"){i.push(c);return}if(c.type==="package"){const h=Rn(c.packageId??c.package_id??c.id??"");s.some(q=>q.packageId===h)||i.push({...c});return}const l=Dn(c.qty??c.quantity??1),d=nn(c),u=c.barcode?te(c.barcode):null,y=[];d!=null&&y.push(`equipment::${String(d)}`),u&&y.push(`barcode::${u}`);const f=y.map(h=>r.get(h)??0).filter(h=>h>0);if(!f.length){i.push({...c});return}const p=Math.min(...f);if(p<=0){i.push({...c});return}const m=Math.min(p,l);if(Wu(r,y,m),m>=l)return;const g=l-m;i.push({...c,qty:g,quantity:g})}),[...i,...s.map(c=>({...c}))]}function Ju(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Co(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Lo(e){if(!e)return null;const t=v(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Yu(e,t){if(e){e.value="";return}}function Ln(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function To(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(v(String(e.value??""))),a=Number.parseFloat(v(String(e.amount??""))),s=Number.parseFloat(v(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),l=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,d=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:l,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:d}}function Zu(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((l,d)=>String(d.createdAt||d.start||"").localeCompare(String(l.createdAt||l.start||""))):[],c=[`<option value="">${Ln(a)}</option>`];i.forEach(l=>{c.push(`<option value="${Ln(l.id)}">${Ln(l.title||a)}</option>`)}),r&&!i.some(l=>String(l.id)===r)&&c.push(`<option value="${Ln(r)}">${Ln(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function No(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const l=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",l&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}js("tax");const c=ze?.updateEditReservationSummary;typeof c=="function"&&c()}function js(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=ze?.updateEditReservationSummary;typeof r=="function"&&r()};if(os){a();return}os=!0;const s=()=>{os=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(Nt)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),it("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?it("edit-res-company-share"):n.checked&&(n.checked=!1));s()}async function Qi(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:l}=ye(),u=Wt()?.[e];if(!u){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}ze={...ze,reservation:u,projects:l||[]},t?.(),Zu(l||[],u);const y=u.projectId&&l?.find?.(D=>String(D.id)===String(u.projectId))||null,{effectiveConfirmed:f,projectLinked:p}=Ft(u,y),m=u.items?u.items.map(D=>({...D,equipmentId:D.equipmentId??D.equipment_id??D.id,barcode:te(D?.barcode)})):[],g=Xu(u,m),_=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(D=>To(D)).filter(Boolean);zt(e,g,_);const q=o("reservations.list.unknownCustomer","غير معروف"),A=c?.find?.(D=>String(D.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const N=document.getElementById("edit-res-id");N&&(N.value=u.reservationId||u.id);const U=document.getElementById("edit-res-customer");U&&(U.value=A?.customerName||q);const S=typeof a=="function"?a(u.start):{date:"",time:""},I=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",S.date),n?.("edit-res-start-time",S.time),n?.("edit-res-end",I.date),n?.("edit-res-end-time",I.time);const P=document.getElementById("edit-res-notes");P&&(P.value=u.notes||"");const k=document.getElementById("edit-res-discount");if(k){const D=p?0:u.discount??0;k.value=v(D)}const O=document.getElementById("edit-res-discount-type");O&&(O.value=p?"percent":u.discountType||"percent");const $=u.projectId?!1:!!u.applyTax,j=document.getElementById("edit-res-tax");j&&(j.checked=$);const X=document.getElementById("edit-res-company-share");if(X){const D=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,R=D!=null?Number.parseFloat(v(String(D).replace("%","").trim())):NaN,M=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,W=M!=null?M===!0||M===1||M==="1"||String(M).toLowerCase()==="true":Number.isFinite(R)&&R>0,ie=W&&Number.isFinite(R)&&R>0?R:Nt,ne=$||W;X.checked=ne,X.dataset.companyShare=String(ie)}Ls(f,{disable:p});const C=document.getElementById("edit-res-paid"),B=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");C&&(C.value=B,C.dataset&&delete C.dataset.userSelected);const x=document.getElementById("edit-res-payment-progress-type"),Y=document.getElementById("edit-res-payment-progress-value");x?.dataset?.userSelected&&delete x.dataset.userSelected,x&&(x.value="percent"),Yu(Y);let K=Array.isArray(u.crewAssignments)&&u.crewAssignments.length?u.crewAssignments:Array.isArray(u.techniciansDetails)&&u.techniciansDetails.length?u.techniciansDetails:(u.technicians||[]).map(D=>String(D));if(!Array.isArray(K)||K.length===0){const D=Oc(u.id??u.reservationId??u.reservation_code??null);Array.isArray(D)&&D.length&&(K=D)}try{await or()}catch(D){console.warn("[reservationsEdit] positions load failed (non-fatal)",D)}if(Hc(K),s?.(g),typeof window<"u"){const D=window?.renderEditPaymentHistory;typeof D=="function"&&D()}No(),r?.();const F=document.getElementById("editReservationModal");Cs=Ju(F,i),Cs?.show?.()}async function ep({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:r,populateEquipmentDescriptionLists:i,handleReservationsMutation:c}={}){if(yn===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const l=document.getElementById("edit-res-start")?.value?.trim(),d=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),y=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",f=document.getElementById("edit-res-notes")?.value||"",p=v(document.getElementById("edit-res-discount")?.value||"0");let m=parseFloat(p)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const h=Ts(),_=document.getElementById("edit-res-paid"),q=_?.dataset?.userSelected==="true",A=q&&_?.value||"unpaid",N=document.getElementById("edit-res-payment-progress-type"),U=document.getElementById("edit-res-payment-progress-value"),S=Co(N),I=Lo(U),P=document.getElementById("edit-res-project")?.value||"",k=Rc();k.map(G=>G?.technicianId).filter(Boolean);const O=document.getElementById("edit-res-company-share"),$=document.getElementById("edit-res-tax");if(!l||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const j=typeof e=="function"?e:(G,ge)=>`${G}T${ge||"00:00"}`,X=j(l,d),C=j(u,y);if(X&&C&&new Date(X)>new Date(C)){E(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const x=Wt()?.[yn];if(!x){E(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(mt)||mt.length===0&&k.length===0){E(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const Y=typeof t=="function"?t:()=>!1,K=x.id??x.reservationId;for(const G of mt){if(G?.type==="package"&&Array.isArray(G.packageItems)){for(const L of G.packageItems){const re=L?.barcode??L?.normalizedBarcode??"";if(!re)continue;const be=It(re);if(be==="reserved"){const he=te(re);if(!Y(he,X,C,K))continue}if(be!=="available"){E(en(be));return}}continue}const ge=It(G.barcode);if(ge==="reserved"){const L=te(G.barcode);if(!Y(L,X,C,K))continue}if(ge!=="available"){E(en(ge));return}}for(const G of mt){if(G?.type==="package"&&Array.isArray(G.packageItems)){for(const L of G.packageItems){const re=te(L?.barcode??L?.normalizedBarcode??"");if(re&&Y(re,X,C,K)){const be=L?.desc||L?.barcode||o("reservations.create.packages.unnamedItem","معدة بدون اسم"),he=`${o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${v(String(be))})`;E(he);return}}continue}const ge=te(G.barcode);if(Y(ge,X,C,K)){E(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const F=typeof n=="function"?n:()=>!1;for(const G of mt){if(G?.type!=="package")continue;const ge=G.packageId??G.package_id??null;if(ge&&F(ge,X,C,K)){const L=G.desc||G.packageName||o("reservations.create.packages.genericName","الحزمة");E(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${v(String(L))} محجوزة بالفعل في الفترة المختارة`));return}}const D=typeof a=="function"?a:()=>!1;for(const G of k)if(G?.technicianId&&D(G.technicianId,X,C,K)){E(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const R=Array.isArray(ze.projects)&&ze.projects.length?ze.projects:ye().projects||[],M=P&&R.find(G=>String(G.id)===String(P))||null,W={...x,projectId:P?String(P):null,confirmed:h},{effectiveConfirmed:ie,projectLinked:ne,projectStatus:ue}=Ft(W,M);let H=!!O?.checked,oe=!!$?.checked;if(ne&&(H&&(O.checked=!1,H=!1),oe=!1),!ne&&H!==oe){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}oe&&(it("edit-res-company-share"),H=!!O?.checked);let Ee=H?getCompanySharePercent("edit-res-company-share"):null;H&&(!Number.isFinite(Ee)||Ee<=0)&&(it("edit-res-company-share"),Ee=getCompanySharePercent("edit-res-company-share"));const we=H&&oe&&Number.isFinite(Ee)&&Ee>0,Ne=ne?!1:oe;ne&&(m=0,g="percent");const Q=Ms(mt,m,g,Ne,k,{start:X,end:C,companySharePercent:we?Ee:0});let Z=Ka();if(Number.isFinite(I)&&I>0){const G=Q;let ge=null,L=null;S==="amount"?(ge=I,G>0&&(L=I/G*100)):(L=I,G>0&&(ge=I/100*G));const re=To({type:S,value:I,amount:ge,percentage:L,recordedAt:new Date().toISOString()});re&&(Z=[...Z,re],pi(Z)),U&&(U.value="")}const se=zs({totalAmount:Q,history:Z}),Ae=Os({manualStatus:A,paidAmount:se.paidAmount,paidPercent:se.paidPercent,totalAmount:Q});_&&!q&&(_.value=Ae,_.dataset&&delete _.dataset.userSelected);let He=x.status??"pending";ne?He=M?.status??ue??He:["completed","cancelled"].includes(String(He).toLowerCase())||(He=h?"confirmed":"pending");const ae=ar({reservationCode:x.reservationCode??x.reservationId??null,customerId:x.customerId,start:X,end:C,status:He,title:x.title??null,location:x.location??null,notes:f,projectId:P?String(P):null,totalAmount:Q,discount:m,discountType:g,applyTax:Ne,paidStatus:Ae,confirmed:ie,items:mt.map(G=>({...G,equipmentId:G.equipmentId??G.id})),crewAssignments:k,companySharePercent:we?Ee:null,companyShareEnabled:we,paidAmount:se.paidAmount,paidPercentage:se.paidPercent,paymentProgressType:se.paymentProgressType,paymentProgressValue:se.paymentProgressValue,paymentHistory:Z});try{Ki("about to submit",{editingIndex:yn,crewAssignments:k,techniciansPayload:ae?.technicians,payload:ae});const G=await Mc(x.id||x.reservationId,ae);Ki("server response",{reservation:G?.id??G?.reservationId??G?.reservation_code,technicians:G?.technicians,crewAssignments:G?.crewAssignments,techniciansDetails:G?.techniciansDetails}),await cr(),An(),Re(),E(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),Po(),c?.({type:"updated",reservation:G}),r?.(),i?.(),Cs?.hide?.()}catch(G){console.error("❌ [reservationsEdit] Failed to update reservation",G);const ge=Ca(G)?G.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");E(ge,"error")}}function Tp(e={}){ze={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=ze,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=v(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{js("tax")}),c.dataset.listenerAttached="true");const l=document.getElementById("edit-res-company-share");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{js("share")}),l.dataset.listenerAttached="true");const d=document.getElementById("edit-res-payment-progress-type");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{d.dataset.userSelected="true",t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=v(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const y=document.getElementById("edit-res-project");y&&!y.dataset.listenerAttached&&(y.addEventListener("change",()=>{No();const h=Array.isArray(ze.projects)&&ze.projects.length?ze.projects:ye().projects||[],_=y.value&&h.find(S=>String(S.id)===String(y.value))||null,A={...ze?.reservation??{},projectId:y.value||null,confirmed:Ts()},{effectiveConfirmed:N,projectLinked:U}=Ft(A,_);Ls(N,{disable:U}),t?.()}),y.dataset.listenerAttached="true");const f=document.getElementById("edit-res-confirmed-btn");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{if(f.disabled)return;const h=!Ts();Ls(h),t?.()}),f.dataset.listenerAttached="true");const p=document.getElementById("save-reservation-changes");p&&!p.dataset.listenerAttached&&(p.addEventListener("click",()=>{ep(ze).catch(h=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",h)})}),p.dataset.listenerAttached="true");const m=document.getElementById("edit-res-equipment-barcode");if(m&&!m.dataset.listenerAttached){let h=null;const _=()=>{m.value?.trim()&&(clearTimeout(h),h=null,n?.(m))};m.addEventListener("keydown",A=>{A.key==="Enter"&&(A.preventDefault(),_())});const q=()=>{if(clearTimeout(h),!m.value?.trim())return;const{start:A,end:N}=getEditReservationDateRange();!A||!N||(h=setTimeout(()=>{_()},150))};m.addEventListener("input",q),m.addEventListener("change",_),m.dataset.listenerAttached="true"}$o?.();const g=document.getElementById("editReservationModal");g&&!g.dataset.cleanupAttached&&(g.addEventListener("hidden.bs.modal",()=>{Po(),t?.(),s?.([])}),g.dataset.cleanupAttached="true")}const tp=ye()||{};let st=(tp.projects||[]).map(Do),Qn=!1;function np(){return st}function Gn(e){st=Array.isArray(e)?e.map(mi):[],ka({projects:st});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return st}async function jo(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,l])=>{l==null||l===""||t.set(c,String(l))});const n=t.toString(),s=(await rt(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(Qa);return Gn(i),Qn=!0,st}async function Bo({force:e=!1,params:t=null}={}){if(!e&&Qn&&st.length>0)return st;try{return await jo(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),st}}async function ap(e){const t=await rt("/projects/",{method:"POST",body:e}),n=Qa(t?.data??{}),a=[...st,n];return Gn(a),Qn=!0,n}async function sp(e,t){const n=await rt(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=Qa(n?.data??{}),s=st.map(r=>String(r.id)===String(e)?a:r);return Gn(s),Qn=!0,a}async function ip(e){await rt(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=st.filter(n=>String(n.id)!==String(e));Gn(t),Qn=!0}function rp({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:l,paymentStatus:d,equipmentEstimate:u=0,expenses:y=[],taxAmount:f=0,totalWithTax:p=0,discount:m=0,discountType:g="percent",companyShareEnabled:h=!1,companySharePercent:_=null,companyShareAmount:q=0,paidAmount:A=null,paidPercentage:N=null,paymentProgressType:U=null,paymentProgressValue:S=null,confirmed:I=!1,technicians:P=[],equipment:k=[],payments:O,paymentHistory:$}={}){const j=Array.isArray(P)?P.map(R=>Number.parseInt(String(R),10)).filter(R=>Number.isInteger(R)&&R>0):[],X=Array.isArray(k)?k.map(R=>{const M=Number.parseInt(String(R.equipmentId??R.equipment_id??R.id??0),10),W=Number.parseInt(String(R.qty??R.quantity??0),10);return!Number.isInteger(M)||M<=0?null:{equipment_id:M,quantity:Number.isInteger(W)&&W>0?W:1}}).filter(Boolean):[],C=Array.isArray(y)?y.map(R=>{const M=Number.parseFloat(R?.amount??R?.value??0)||0,W=(R?.label??R?.name??"").trim();return W?{label:W,amount:Math.round(M*100)/100}:null}).filter(Boolean):[],B=C.reduce((R,M)=>R+(M?.amount??0),0),x={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!l,payment_status:d??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(B*100)/100,tax_amount:Math.round((Number.parseFloat(f)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(p)||0)*100)/100,confirmed:!!I,technicians:j,equipment:X,expenses:C},Y=Math.max(0,Number.parseFloat(m)||0);x.discount=Y,x.discount_type=g==="amount"?"amount":"percent";const K=Number.parseFloat(_),F=!!h&&Number.isFinite(K)&&K>0;x.company_share_enabled=F,x.company_share_percent=F?K:0,x.company_share_amount=F?Math.max(0,Number.parseFloat(q)||0):0,Number.isFinite(Number(A))&&(x.paid_amount=Math.max(0,Number.parseFloat(A)||0)),Number.isFinite(Number(N))&&(x.paid_percentage=Math.max(0,Number.parseFloat(N)||0)),(U==="amount"||U==="percent")&&(x.payment_progress_type=U),S!=null&&S!==""&&(x.payment_progress_value=Number.parseFloat(S)||0),e&&(x.project_code=String(e).trim());const D=O!==void 0?O:$;if(D!==void 0){const R=Fo(D)||[];x.payments=R.map(M=>({type:M.type,amount:M.amount!=null?M.amount:null,percentage:M.percentage!=null?M.percentage:null,value:M.value!=null?M.value:null,note:M.note??null,recorded_at:M.recordedAt??null}))}return x.end_datetime||delete x.end_datetime,x.client_company||(x.client_company=null),x}function Qa(e={}){return mi(e)}function Do(e={}){return mi(e)}function mi(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(p=>{if(p==null)return null;if(typeof p=="object"){const m=p.id??p.technician_id??p.technicianId;return m!=null?String(m):null}return String(p)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(p=>{const m=p?.equipment_id??p?.equipmentId??p?.id??null,g=p?.quantity??p?.qty??0,h=p?.barcode??p?.code??"",_=p?.description??p?.name??"";return{equipmentId:m!=null?String(m):null,qty:Number.parseInt(String(g),10)||0,barcode:h,description:_}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((p,m)=>({id:p?.id??`expense-${t??"x"}-${m}`,label:p?.label??"",amount:Number.parseFloat(p?.amount??0)||0})),l=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,d=e.company_share_enabled??e.companyShareEnabled,u=d!=null?d===!0||d===1||String(d).toLowerCase()==="true":l>0,y=e.payment_history??e.paymentHistory??e.payments??null,f=Fo(y);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?l:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(p=>typeof p=="object"?p:{id:p}),equipment:r,expenses:c,paymentHistory:f}}function op(e){return e instanceof Gi}function cs(e){if(e==null||e==="")return null;const t=v(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function cp(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=cs(e.value);let s=cs(e.amount),r=cs(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,l=e.recordedAt??e.recorded_at??e.date??null;let d=null;if(l){const y=new Date(l);Number.isNaN(y.getTime())||(d=y.toISOString())}d||(d=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:d}}function Fo(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>cp(t)).filter(Boolean):[]}const Np=Object.freeze(Object.defineProperty({__proto__:null,buildProjectPayload:rp,createProjectApi:ap,deleteProjectApi:ip,ensureProjectsLoaded:Bo,getProjectsState:np,isApiError:op,mapLegacyProject:Do,mapProjectFromApi:Qa,refreshProjectsFromApi:jo,setProjectsState:Gn,updateProjectApi:sp},Symbol.toStringTag,{value:"Module"})),_a="reservations-ui:ready",Qt=typeof EventTarget<"u"?new EventTarget:null;let Gt={};function lp(e){return Object.freeze({...e})}function dp(){if(!Qt)return;const e=Gt,t=typeof CustomEvent=="function"?new CustomEvent(_a,{detail:e}):{type:_a,detail:e};typeof Qt.dispatchEvent=="function"&&Qt.dispatchEvent(t)}function up(e={}){if(!e||typeof e!="object")return Gt;const t={...Gt};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),Gt=lp(t),dp(),Gt}function pp(e){if(e)return Gt?.[e]}function jp(e){const t=pp(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const i=(s?.detail||Gt)?.[e];typeof i=="function"&&(Qt&&Qt.removeEventListener(_a,a),n(i))};Qt&&Qt.addEventListener(_a,a)})}function Bp(){return Bo().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=ye()||{};Vc(e||[]),Mr()})}function fi(e=null){Mr(),Ro(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function mp(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Bs(){return{populateEquipmentDescriptionLists:Dt,setFlatpickrValue:Ou,splitDateTime:Yi,renderEditItems:Rt,updateEditReservationSummary:et,addEquipmentByDescription:zu,addEquipmentToEditingReservation:Mu,addEquipmentToEditingByDescription:Ia,combineDateTime:Fn,hasEquipmentConflict:bt,hasTechnicianConflict:nr,renderReservations:Ro,handleReservationsMutation:fi,ensureModal:mp}}function Ro(e="reservations-list",t=null){xu({containerId:e,filters:t,onShowDetails:Mo,onConfirmReservation:Oo})}function Mo(e){return Iu(e,{getEditContext:Bs,onEdit:(t,{reservation:n})=>{Ho(t,n)},onDelete:zo})}function zo(e){return tn()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?ku(e,{onAfterChange:fi}):!1:(Hn(),!1)}function Oo(e){return $u(e,{onAfterChange:fi})}function Ho(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}Qi(e,Bs());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}Qi(e,Bs());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}Ic({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Dp(){up({showReservationDetails:Mo,deleteReservation:zo,confirmReservation:Oo,openReservationEditor:Ho})}export{bl as $,ip as A,ap as B,dd as C,Vr as D,Ur as E,$p as F,vp as G,Tp as H,Bp as I,Lp as J,hp as K,fi as L,wp as M,Mr as N,Ep as O,Ap as P,et as Q,Bs as R,pe as S,zo as T,Oo as U,Ho as V,Ou as W,wn as X,Yc as Y,ma as Z,bp as _,Re as a,gp as a0,Np as a1,Ti as b,Ro as c,zr as d,Cp as e,rp as f,pp as g,Mo as h,xp as i,Ip as j,np as k,op as l,Qa as m,Or as n,_p as o,Pp as p,qp as q,Un as r,up as s,Sp as t,sp as u,jo as v,jp as w,Dp as x,Bo as y,kp as z};
