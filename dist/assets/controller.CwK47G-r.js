import{n as v,l as he,A as $c,t as o,a as ot,s as E,u as sn,c as Hn,d as $a,b as Qi,z as Pc,f as Ze,B as Gi,o as Cc}from"./auth.BcQOd76e.js";import{A as ae,B as gt,C as Wi,E as Lc,D as Dt,F as Ds,n as Ge,G as Xi,H as vi,I as Rn,J as Mn,K as Pa,L as Tc,M as Fs,N as ht,O as Rs,P as En,Q as Ji,R as Yi,S as Nc,T as jc,U as Bc,V as Zi,W as rn,X as da,Y as Dc,Z as Ca,_ as er,$ as tr,a as Ms,o as zs,q as Os,a0 as nr,a1 as Fc,s as gn,b as La,a2 as Rc,a3 as ar,a4 as Mc,i as Hs,r as zt,a5 as sr,a6 as Tt,a7 as ua,m as Se,p as je,y as Ta,l as ir,a8 as zc,a9 as ds,h as rr,g as Yt,aa as Oc,ab as Hc,k as or,ac as us,ad as Vc,u as Uc,ae as Kc,af as Qc,ag as Gc,ah as Wc}from"./reservationsService.BtJ4Aekt.js";const es="select.form-select:not([data-no-enhance]):not([multiple])",vt=new WeakMap;let ts=null,qi=!1,wt=null;function Ap(e=document){e&&(e.querySelectorAll(es).forEach(t=>ia(t)),!ts&&e===document&&(ts=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(es)&&ia(a),a.querySelectorAll?.(es).forEach(s=>ia(s)))})}),ts.observe(document.body,{childList:!0,subtree:!0})),qi||(qi=!0,document.addEventListener("pointerdown",Yc,{capture:!0})))}function sa(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){ia(e);return}const t=e.closest(".enhanced-select");t&&(Vs(t),pa(t),ps(t))}function ia(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){sa(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};vt.set(t,r),a.addEventListener("click",()=>Jc(t)),a.addEventListener("keydown",i=>Zc(i,t)),s.addEventListener("click",i=>tl(i,t)),s.addEventListener("keydown",i=>el(i,t)),e.addEventListener("change",()=>{pa(t),cr(t)}),r.observer=new MutationObserver(i=>{let c=!1,d=!1;for(const l of i)l.type==="attributes"&&l.attributeName==="disabled"&&(d=!0),l.type==="childList"&&(c=!0);d&&ps(t),c&&Xc(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),Vs(t),pa(t),ps(t)}function Xc(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,Vs(t),pa(t)})))}function Vs(e){const t=vt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),cr(e)}function pa(e){const t=vt.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function cr(e){const t=vt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function ps(e){const t=vt.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function Jc(e){vt.get(e)&&(e.getAttribute("data-open")==="true"?wn(e):lr(e))}function lr(e){const t=vt.get(e);if(!t)return;wt&&wt!==e&&wn(wt,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),wt=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function wn(e,{focusTrigger:t=!0}={}){const n=vt.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),wt===e&&(wt=null))}function Yc(e){if(!wt)return;const t=e.target;t instanceof Node&&(wt.contains(t)||wn(wt,{focusTrigger:!1}))}function Zc(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),lr(t)):n==="Escape"&&wn(t)}function el(e,t){const n=e.key,a=vt.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&dr(i,t)}else n==="Escape"&&(e.preventDefault(),wn(t))}function tl(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&dr(n,t)}function dr(e,t){const n=vt.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),wn(t)}const An=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let At=null;function Us(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function ur(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function nl(e={}){const t={...e};return t.barcode&&(t.barcode=v(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function al(e={}){const t=nl({...e,activatedAt:Date.now()});return At=t,ur(!0,t.mode||"create"),Us(An.change,{active:!0,selection:{...t}}),t}function ma(e="manual"){if(!At)return;const t=At;At=null,ur(!1),Us(An.change,{active:!1,previous:t,reason:e})}function pr(){return!!At}function sl(){return At?{...At}:null}function il(e){if(!At)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=v(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:r,description:i}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const d=c.map(u=>v(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!d.length)return!1;const l=Number.isInteger(s)&&s>0?s:d.length;t={barcodes:d,quantity:Math.min(l,d.length)},r&&(t.groupKey=r),i&&(t.description=i)}else return!1;return Us(An.requestAdd,{...t,selection:{...At}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||ma("tab-changed")});const rl=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),ol=new Set(["maintenance","reserved","retired"]);function cl(e){const t=String(e??"").trim().toLowerCase();return t&&rl.get(t)||"available"}function ll(e){return e?typeof e=="object"?e:Na(e):null}function _t(e){const t=ll(e);return t?cl(t.status||t.state||t.statusLabel||t.status_label):"available"}function mr(e){return!ol.has(_t(e))}function on(e={}){return e.image||e.imageUrl||e.img||""}function dl(e){if(!e)return null;const t=ae(e),{equipment:n=[]}=he();return(n||[]).find(a=>ae(a?.barcode)===t)||null}function Na(e){const t=ae(e);if(!t)return null;const{equipment:n=[]}=he();return(n||[]).find(a=>ae(a?.barcode)===t)||null}const ul=he()||{};let Nt=(ul.equipment||[]).map(fl),ms=!1,mn="",Wt=null,en=null,tn=null,ja=!1,Si=!1;function pl(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function ml(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function fl(e={}){return Ks({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function Ba(e={}){return Ks(e)}function Ks(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=Vn(e.quantity??e.qty??0),i=Da(e.unit_price??e.price??0),c=v(String(e.barcode??"").trim()),d=ze(e.status??e.state??e.status_label??e.statusLabel??"available"),l=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:yl(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:d,image:l,imageUrl:l,created_at:e.created_at??null,updated_at:e.updated_at??null}}function yl(e){return e!=null&&e!==""}function Vn(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function Da(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function bl(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=v(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function Ei(e){if(!e)return"";const t=v(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=v(String(n?.barcode??"")).trim();if(a)return a}return""}function gl(e,t){const n=Ei(e),a=Ei(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}else{if(r!==i)return r?-1:1;{const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}}const c=ya(e?.desc||e?.description||e?.name||""),d=ya(t?.desc||t?.description||t?.name||"");return c.localeCompare(d,"ar",{sensitivity:"base"})}function Be(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ze(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function hl(e){return ze(e)}function fa(){if(!pr())return null;const e=sl();return e?{...e}:null}function vl(e){const t=fa();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:r=null}=t,i=t?.mode||t?.source||"",c=[],d=new Set;if(n.forEach(y=>{const p=ae(y?.barcode);!p||d.has(p)||(d.add(p),c.push({variant:y,barcode:p}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(i==="package-manager"||i==="equipment-packages"){const y=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:p})=>p),maxQuantity:y,reason:""}}const l=c.filter(({variant:y})=>{const p=ze(y?.status);return p!=="maintenance"&&p!=="retired"});if(!a||!s)return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=l.filter(({barcode:y})=>!gt(y,a,s,r));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:y})=>y),maxQuantity:u.length};let b=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(l.length>0)b=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const y=new Set(c.map(({variant:p})=>ze(p?.status)));y.has("maintenance")?b=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):y.has("reserved")?b=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):y.has("retired")&&(b=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:b,availableBarcodes:[],maxQuantity:0}}function ql(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function fr(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=fa();e.hidden=!s;const r=s?.mode||s?.source||"";s?r==="package-manager"||r==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=fa(),d=c?.mode||c?.source||"";d==="package-manager"||d==="equipment-packages"?ma("package-finish-button"):(ma("return-button"),ql())}),t.dataset.listenerAttached="true")}function et(){return Nt}function nn(e){Nt=Array.isArray(e)?e.map(Ks):[],$a({equipment:Nt}),ml()}function ya(e){return String(e??"").trim().toLowerCase()}function Ft(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=ya(t);return n||(n=ya(e.category||"")),n||(n=v(String(e.barcode||"")).trim().toLowerCase()),n}function Fa(e){const t=Ft(e);return t?et().filter(n=>Ft(n)===t):[]}function Ra(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=Ma(e);if(n){const a=Be(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${Be(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function Qs(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function ba(){const e=Qs();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function Gs(e={}){const t=Qs();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?v(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?v(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function hn(e){ja=e;const t=Qs(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function Sl(e){if(!sn()){Hn();return}if(!e)return;try{await wl()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let d=0;if(i.forEach(l=>{const u=l.القسم??l.category??"",b=l["القسم الثانوي"]??l.subcategory??"",y=l.الوصف??l.description??l.name??"",p=l.الكمية??l.quantity??0,m=l.السعر??l.price??0,g=l.الباركود??l.barcode??"",h=l.الحالة??l.status??"متاح",_=l.الصورة??l.image_url??l.image??"",q=v(String(g||"")).trim();if(!y||!q){d+=1;return}c.push(Ws({category:u,subcategory:b,description:y,quantity:p,unit_price:m,barcode:q,status:h,image_url:_}))}),!c.length){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const l=await ot("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(l?.data)?l.data.map(Ba):[];if(u.length){const p=[...et(),...u];nn(p)}await Un({showToastOnError:!1}),Oe();const b=l?.meta?.count??u.length,y=[];b&&y.push(`${b} ✔️`),d&&y.push(`${d} ⚠️`),E(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(y.length?` (${y.join(" / ")})`:""))}catch(l){const u=In(l,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");E(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const El="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let Pn=null;function wl(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):Pn||(Pn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=El,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),Pn=null,e}),Pn)}function Ws({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const d=v(String(r||"")).trim(),l=hl(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:Vn(a),unit_price:Da(s),barcode:d,status:l,image_url:c?.trim()||null}}async function yr(){if(!sn()){Hn();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await ot("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await Un({showToastOnError:!1}),E(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=In(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");E(t,"error")}}function Ma(e){return e.image||e.imageUrl||e.img||""}function Al(e){const t=ze(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function ga(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${Be(a)}</td></tr>`}n&&(n.textContent="0")}function br(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=Wt?.groupKey||Ft(e);if(!r){ga();return}const i=et().filter(b=>Ft(b)===r).sort((b,y)=>{const p=String(b.barcode||"").trim(),m=String(y.barcode||"").trim();return!p&&!m?0:p?m?p.localeCompare(m,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){ga();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),d=o("equipment.form.labels.quantity","الكمية"),l=et(),u=i.map(b=>{const y=b.id&&e.id?String(b.id)===String(e.id):String(b.barcode||"")===String(e.barcode||""),p=y?"equipment-variants-table__row--current":"",m=Be(String(b.barcode||"-")),g=y?`<span class="equipment-variants-current-badge">${Be(c)}</span>`:"",h=v(String(Number.isFinite(Number(b.qty))?Number(b.qty):0)),_=l.indexOf(b),q=Be(o("equipment.item.actions.delete","🗑️ حذف")),A=_>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${_}">${q}</button>
          </div>`:"";return`
        <tr class="${p}">
          <td>
            ${m}
            ${g}
          </td>
          <td>${Al(b.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${Be(d)}">${h}</span>
          </td>
          <td class="table-actions-cell">${A}</td>
        </tr>
      `}).join("");n.innerHTML=u}function xl({item:e,index:t}){const n=Ma(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=sn(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},d=Number.isFinite(Number(e.qty))?Number(e.qty):0,l=Number.isFinite(Number(e.price))?Number(e.price):0,u=d.toLocaleString("en-US"),b=l.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),y=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,p=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,m=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(d-y-p,0),g=m.toLocaleString("en-US"),h=o("equipment.card.labels.availableOfTotal","من أصل"),_=ze(e.status);let q=`${Be(c.available)}: ${Be(g)} ${Be(h)} ${Be(u)}`,A="available";if(m===0){const O={reserved:{text:d===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},J=O[_]||O.default;q=Be(J.text),A=J.modifier}const T=`<span class="equipment-card__availability equipment-card__availability--${A}">${q}</span>`,K="",S=e.desc||e.name||"—",I=e.name&&e.name!==e.desc?e.name:"",P=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${b} ${r}`}].map(({label:O,value:J})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${O}</span>
              <span class="equipment-card__detail-value">${J}</span>
            </span>
          `).join("")}
    </div>`,H=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),C=H.length?`<div class="equipment-card__categories">${H.map(({label:O,value:J})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${O}</span>
              <span class="equipment-card__detail-value">${J}</span>
            </div>
          `).join("")}</div>`:"",j=I?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${I}</span>
      </div>`:"",k=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${S}</h3>
    </div>
  `}
      ${P}
    </div>
  `,F=[],x=vl(e),X=x?.availableBarcodes?.length?x.availableBarcodes.join(","):x?.barcode?x.barcode:"";let Q="",M="";if(x.active){const O=`equipment-select-qty-${t}`,J=!!x.canSelect,re=J?Math.max(1,Number(x.maxQuantity||x.availableBarcodes?.length||1)):1,se=Math.max(1,Math.min(re,99)),de=[];for(let pe=1;pe<=se;pe+=1){const U=v(String(pe));de.push(`<option value="${pe}"${pe===1?" selected":""}>${U}</option>`)}const V=J?"":" disabled",oe=o("reservations.create.equipment.selector.quantityLabel","الكمية"),we=J?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${v(String(re))}`:x.reason?x.reason:"";Q=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${O}">${oe}</label>
        <select class="equipment-card__quantity-select" id="${O}" data-equipment-select-quantity${V}>
          ${de.join("")}
        </select>
        ${we?`<span class="equipment-card__selection-hint">${Be(we)}</span>`:""}
      </div>
    `;const Ee=fa(),Ce=Ee?.mode||Ee?.source||"",ee=Ce==="package-manager"||Ce==="equipment-packages"?o("equipment.packages.selection.addToPackage","➕ أضف إلى الحزمة"):o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),ue=J?"":" disabled",_e=x.reason?` title="${Be(x.reason)}"`:"",Fe=['data-equipment-action="select-reservation"',`data-selection-max="${J?re:0}"`];X&&Fe.push(`data-selection-barcodes="${Be(X)}"`),e.groupKey&&Fe.push(`data-selection-group="${Be(String(e.groupKey))}"`),M=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${Fe.join(" ")}${ue}${_e}>${ee}</button>
    `}i&&F.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const B=F.length?F.join(`
`):"",D=Be(S);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${Be(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${D}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${K}
        ${T}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${k}
        </div>
      </div>
      <div class="equipment-card__body">
        ${C}
        ${j}
      </div>
      ${Q||M||B?`<div class="equipment-card__actions equipment-card__actions--center">
            ${Q}
            ${M}
            ${B}
          </div>`:""}
    </article>
  `}function Il(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,a.appendChild(d)}),t.includes(i)&&(a.value=i),sa(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,s.appendChild(d)}),n.includes(i)&&(s.value=i),sa(s)}const r=document.getElementById("filter-status");r&&sa(r)}function xn(){const e=he();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return Nt=t||[],Nt;const s=new Date;let r=!1;const i=new Set((a||[]).filter(d=>d?.status==="open").map(d=>v(String(d?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(d=>{if(!d)return d;const l=ze(d.status),u=v(String(d.barcode??"")).trim().toLowerCase(),b=u&&i.has(u);let y=b?"maintenance":"available";if(!b&&u)for(const p of n||[]){if(!_l(p,s))continue;if(p.items?.some(g=>v(String(g?.barcode??"")).trim().toLowerCase()===u)){y="reserved";break}}return y!==l?(r=!0,{...d,status:y}):{...d,status:y}});return r?nn(c):(Nt=c,$a({equipment:Nt})),Nt}function _l(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function ns(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Oe(){const e=document.getElementById("equipment-list");if(!e)return;fr();const t=xn(),n=Array.isArray(t)?t:et(),a=new Map;n.forEach(g=>{if(!g)return;const h=Ft(g);h&&(a.has(h)||a.set(h,[]),a.get(h).push(g))});const s=Array.from(a.values()).map(g=>{const h=g[0],_=g.reduce((I,$)=>I+(Number.isFinite(Number($.qty))?Number($.qty):0),0),q=["maintenance","reserved","available","retired"],A=g.map(I=>ze(I.status)).sort((I,$)=>q.indexOf(I)-q.indexOf($))[0]||"available",T=g.reduce((I,$)=>{const P=Vn($?.qty??0)||0,H=ze($?.status);return H==="reserved"?I.reserved+=P:H==="maintenance"&&(I.maintenance+=P),I},{reserved:0,maintenance:0}),K=Math.max(_-T.reserved-T.maintenance,0);return{item:{...h,qty:_,status:A,variants:g,groupKey:Ft(h),reservedQty:T.reserved,maintenanceQty:T.maintenance,availableQty:K},index:n.indexOf(h)}});s.sort((g,h)=>gl(g.item,h.item));const r=document.getElementById("search-equipment")?.value||"",i=v(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",d=document.getElementById("filter-sub")?.value||"",l=document.getElementById("filter-status")?.value||"",u=l?ze(l):"";if(ms&&!n.length){e.innerHTML=ns(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(mn&&!n.length){e.innerHTML=ns(mn,{tone:"error",icon:"⚠️"});return}const b=s.filter(({item:g})=>{const h=v(String(g.barcode??"")).toLowerCase().trim(),_=Array.isArray(g.variants)?g.variants.map(S=>v(String(S.barcode??"")).toLowerCase().trim()).filter(Boolean):[],q=!i||g.name&&g.name.toLowerCase().includes(i)||g.desc&&g.desc.toLowerCase().includes(i)||h&&h.includes(i)||_.some(S=>S.includes(i))||g.category&&g.category.toLowerCase().includes(i)||g.sub&&g.sub.toLowerCase().includes(i),A=!c||g.category===c,T=!d||g.sub===d,K=!u||ze(g.status)===u;return q&&A&&T&&K}),y=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),p=b;e.innerHTML=p.length?p.map(xl).join(""):ns(y);const m=document.getElementById("equipment-list-count");if(m){const g=o("equipment.list.countSuffix","عنصر"),h=v(String(p.length)),_=p.length?`${h} ${g}`:`0 ${g}`;m.textContent=_}Il(n)}async function Un({showToastOnError:e=!0}={}){ms=!0,mn="",Oe();try{const t=await ot("/equipment/?all=1"),n=t?.data??t;let a=[];Array.isArray(n)?a=n:n&&typeof n=="object"&&(Array.isArray(n.items)?a=n.items:Array.isArray(n.results)?a=n.results:Array.isArray(n.data)?a=n.data:Array.isArray(n.records)&&(a=n.records));const s=a.map(Ba);nn(s)}catch(t){t&&typeof t=="object"&&Number(t.status)===401?mn="":(mn=In(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&E(mn,"error"))}finally{ms=!1,Oe()}}function In(e,t,n){if(e instanceof Qi){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function kl(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=v(a).trim(),r=Da(t.querySelector("#new-equipment-price")?.value||"0"),i=Vn(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",d=t.querySelector("#new-equipment-category")?.value?.trim()||"",l=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){E(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const b=Ws({category:d,subcategory:l,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const y=await ot("/equipment/",{method:"POST",body:b}),p=Ba(y?.data),m=[...et(),p];nn(m),Oe(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),E(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(y){const p=In(y,"equipment.toast.addFailed","تعذر إضافة المعدة");E(p,"error")}}async function gr(e){if(!sn()){Hn();return}const t=et(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await ot(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),nn(a),Oe(),E(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=In(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");E(s,"error")}}async function $l(e,t){const n=et(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},nn(r),Oe();return}const s=Ws({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await ot(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=Ba(r?.data),c=[...n];c[e]=i,nn(c),Oe(),E(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=In(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw E(i,"error"),r}}function ta(){Oe()}function hr(e){const n=et()[e];if(!n)return;en=e;const a=Fa(n),s=a[0]||n,r=a.reduce((d,l)=>d+(Number.isFinite(Number(l.qty))?Number(l.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(d=>ze(d.status)).sort((d,l)=>i.indexOf(d)-i.indexOf(l))[0]||ze(s.status);document.getElementById("edit-equipment-index").value=e,Gs({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:Ma(s)||"",barcode:s.barcode||"",status:s.status||c}),hn(!1),tn=ba(),Ra(s),br(s),Wt={groupKey:Ft(s),barcode:String(s.barcode||""),id:s.id||null},pl(document.getElementById("editEquipmentModal"))?.show()}function Pl(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),r=s?.querySelector("[data-equipment-select-quantity]");let i=Number.parseInt(r?.value||"1",10);(!Number.isFinite(i)||i<=0)&&(i=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&i>c&&(i=c);const l=(t.dataset.selectionBarcodes||"").split(",").map(p=>p.trim()).filter(p=>p.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",b=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";il({barcodes:l,quantity:i,groupKey:b,description:u})||E(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||gr(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||hr(s)}}function Cl(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||hr(n)}}function Ll(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||gr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function vr(){if(!Wt||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=et(),a=Wt.id?n.find(d=>String(d.id)===String(Wt.id)):null,s=Wt.groupKey,r=s?n.find(d=>Ft(d)===s):null,i=a||r;if(!i){ga();return}const c=n.findIndex(d=>d===i);if(c>=0){const d=document.getElementById("edit-equipment-index");d&&(d.value=String(c)),en=c}if(br(i),!ja){const d=Fa(i),l=d[0]||i,u=d.reduce((p,m)=>p+(Number.isFinite(Number(m.qty))?Number(m.qty):0),0),b=["maintenance","reserved","available","retired"],y=d.map(p=>ze(p.status)).sort((p,m)=>b.indexOf(p)-b.indexOf(m))[0]||ze(l.status);Gs({category:l.category||"",subcategory:l.sub||"",description:l.desc||l.description||"",quantity:String(u||l.qty||0),price:l.price!=null?String(l.price):"0",image:Ma(l)||"",barcode:l.barcode||"",status:l.status||y}),tn=ba()}Ra(primary)}function Tl(){document.getElementById("search-equipment")?.addEventListener("input",ta),document.getElementById("filter-category")?.addEventListener("change",ta),document.getElementById("filter-sub")?.addEventListener("change",ta),document.getElementById("filter-status")?.addEventListener("change",ta),document.getElementById("add-equipment-form")?.addEventListener("submit",kl);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),yr().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",Pl),t.addEventListener("keydown",Cl),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",Ll),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);bl(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!ja){tn=ba(),hn(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){E(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:Vn(document.getElementById("edit-equipment-quantity").value)||1,price:Da(document.getElementById("edit-equipment-price").value)||0,barcode:v(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await $l(t,n),tn=ba(),hn(!1),vr()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{Tl(),Oe(),Un();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(tn&&Gs(tn),en!=null){const a=et()[en];if(a){const r=Fa(a)[0]||a;Ra(r)}}hn(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Oe(),hn(ja),en!=null){const t=et()[en];if(t){const a=Fa(t)[0]||t;Ra(a)}}});document.addEventListener("equipment:refreshRequested",()=>{Un({showToastOnError:!1})});document.addEventListener($c.USER_UPDATED,()=>{Oe()});document.addEventListener("equipment:changed",()=>{vr()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{Wt=null,ga(),en=null,tn=null,hn(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!Si&&(document.addEventListener(An.change,()=>{fr(),Oe()}),Si=!0);const xp=Object.freeze(Object.defineProperty({__proto__:null,clearEquipment:yr,refreshEquipmentFromApi:Un,renderEquipment:Oe,syncEquipmentStatuses:xn,uploadEquipmentFromExcel:Sl},Symbol.toStringTag,{value:"Module"})),Nl="__DEBUG_CREW__";function jl(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(Nl);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function wi(e,t){if(jl())try{console.log(`🪵 [crew-debug:create] ${e}`,t)}catch{}}const qr="projects:create:draft",Sr="projects.html#projects-section";let fs=null,Er=[],ys=new Map,bs=new Map,ha=new Map,as=!1,ra=null,Ai=!1,wr=[];function Bl(e){if(!e)return null;let t=wr.find(a=>a.id===e)||null;if(t)return t;const n=Yi(e);return n?(t={id:e,name:jc(n)||e,price:Nc(n),items:Fs(n),raw:n},t):null}function va(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function qa(e){return v(String(e||"")).trim().toLowerCase()}function Dl(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=v(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function Ar(e){const t=v(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function xr(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Ir(e){if(!e)return null;const t=v(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function _r(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=v(String(t))}}function an(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function Xs(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function cn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Je(){const{input:e,hidden:t}=cn();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function Qt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function kr(e,t,{allowPartial:n=!1}={}){const a=Ge(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function gs(e,t={}){return kr(ys,e,t)}function hs(e,t={}){return kr(bs,e,t)}function Ye(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function $r(e){Er=Array.isArray(e)?[...e]:[]}function Js(){return Er}function Ys(e){return e&&Js().find(t=>String(t.id)===String(e))||null}function xi(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function vn(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??Dt,a=v(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:Dt}function rt(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??Dt,a=v(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=Dt),t.dataset.companyShare=String(s),t.checked=!0}function vs(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(as){ye();return}as=!0;const a=()=>{as=!1,ye()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(Dt)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),rt()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?rt():n.checked&&(n.checked=!1));a()}function Fl(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Ii(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function _i(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function xt({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=Xs();if(!n||!a||!s)return;const r=Ds()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const d=new Set;ys=new Map;const l=r.filter(p=>p&&p.id!=null).map(p=>({id:String(p.id),label:_i(p)||c})).filter(p=>{if(!p.label)return!1;const m=Ge(p.label);return!m||d.has(m)?!1:(d.add(m),ys.set(m,p),!0)}).sort((p,m)=>p.label.localeCompare(m.label,void 0,{sensitivity:"base"}));s.innerHTML=l.map(p=>`<option value="${va(p.label)}"></option>`).join("");const u=t?"":n.value,b=e?String(e):a.value?String(a.value):"",y=b?r.find(p=>String(p.id)===b):null;if(y){const p=_i(y)||c;a.value=String(y.id),n.value=p,n.dataset.selectedId=String(y.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function qn({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=cn();if(!a||!s||!r)return;const i=Array.isArray(t)?t:Js()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const d=[...i].filter(g=>g&&g.id!=null).sort((g,h)=>String(h.createdAt||h.start||"").localeCompare(String(g.createdAt||g.start||""))),l=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),b=new Set;bs=new Map;const y=d.map(g=>{const h=xi(g)||u;return{id:String(g.id),label:h}}).filter(g=>{if(!g.label)return!1;const h=Ge(g.label);return!h||b.has(h)?!1:(b.add(h),bs.set(h,g),!0)});r.innerHTML=y.map(g=>`<option value="${va(g.label)}"></option>`).join("");const p=e?String(e):s.value?String(s.value):"",m=p?d.find(g=>String(g.id)===p):null;if(m){const g=xi(m)||u;s.value=String(m.id),a.value=g,a.dataset.selectedId=String(m.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":l}function Sa(e,t,n){const{date:a,time:s}=Ji(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function Pr(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||qn({selectedValue:a});const r=(Ds()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";xt(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=Ii(e,"start"),d=Ii(e,"end");c&&Sa("res-start","res-start-time",c),d&&Sa("res-end","res-end-time",d);const l=document.getElementById("res-notes");l&&e.description&&(t||!l.value)&&(l.value=e.description),ye(),Rt()}function Cr({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:he(),s=Array.isArray(a)?a:[];$r(s);const r=t!=null?String(t):n.value?String(n.value):"";qn({selectedValue:r,projectsList:s}),Rt(),ye()}function Rt(){const{input:e,hidden:t}=cn(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),d=document.getElementById("res-discount-type"),l=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),b=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(Qt(n,Je),a&&Qt(a,Je)),s&&Qt(s,Je),r&&Qt(r,Je),i&&Qt(i,Je),c&&Qt(c,Je),d&&Qt(d,Je),b)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=l),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=l),s&&(s.value="unpaid",Ye(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=l),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=l),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=l),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=l),d&&(d.value="percent",d.disabled=!0,d.classList.add("reservation-input-disabled"),d.title=l);else{if(n){const y=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",y&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.disabled=!1,d.classList.remove("reservation-input-disabled"),d.title="")}vs("tax"),ye()}function Zs(){const{input:e,hidden:t}=cn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?hs(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=Ys(r.id);i?Pr(i,{skipProjectSelectUpdate:!0}):(Rt(),ye())}else t.value="",e.dataset.selectedId="",Rt(),ye()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?hs(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function ei(){const{input:e,hidden:t}=Xs();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?gs(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),ye()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?gs(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Rl(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){jn({clearValue:!0});return}let n=null;try{const l=decodeURIComponent(t);n=JSON.parse(l)}catch(l){console.warn("⚠️ [reservations/createForm] Failed to decode project context",l)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),jn({clearValue:!1}),!n)return;n.fromProjectForm&&(ra={draftStorageKey:n.draftStorageKey||qr,returnUrl:n.returnUrl||Sr});const r=document.getElementById("res-project");if(n.projectId){r&&(qn({selectedValue:String(n.projectId)}),Rt());const l=Ys(n.projectId);l?Pr(l,{forceNotes:!!n.forceNotes}):ye(),jn()}else{r&&qn({selectedValue:""});const l=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");ed(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),l)}n.start&&Sa("res-start","res-start-time",n.start),n.end&&Sa("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(Ds()||[]).find(b=>String(b.id)===String(n.customerId));u?.id!=null&&(xt({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(xt({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):xt({selectedValue:""});const d=document.getElementById("res-notes");d&&n.description&&!d.value&&(d.value=n.description),ye()}function ln(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Rn(e,n),end:Rn(t,a)}}function Lr(e){const t=qa(e);if(t){const c=ha.get(t);if(c)return c}const{description:n,barcode:a}=Ar(e);if(a){const c=Na(a);if(c)return c}const s=Ge(n||e);if(!s)return null;let r=Zi();if(!r?.length){const c=he();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&ar(r)}const i=r.find(c=>Ge(c?.desc||c?.description||"")===s);return i||r.find(c=>Ge(c?.desc||c?.description||"").includes(s))||null}function Tr(e,t="equipment-description-options"){const n=qa(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(d=>qa(d.value)===n)||ha.has(n))return!0;const{description:s}=Ar(e);if(!s)return!1;const r=Ge(s);return r?(Zi()||[]).some(c=>Ge(c?.desc||c?.description||"")===r):!1}const Ml={available:0,reserved:1,maintenance:2,retired:3};function zl(e){return Ml[e]??5}function ki(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function Ol(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${ki(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${ki(n)})`}function Mt(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=xn(),a=he(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];ar(r);const i=new Map;r.forEach(l=>{const u=Dl(l),b=qa(u);if(!b||!u)return;const y=_t(l),p=zl(y),m=i.get(b);if(!m){i.set(b,{normalized:b,value:u,bestItem:l,bestStatus:y,bestPriority:p,statuses:new Set([y])});return}m.statuses.add(y),p<m.bestPriority&&(m.bestItem=l,m.bestStatus=y,m.bestPriority=p,m.value=u)}),ha=new Map;const d=Array.from(i.values()).sort((l,u)=>l.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(l=>{ha.set(l.normalized,l.bestItem);const u=Ol(l),b=va(l.value);if(u===l.value)return`<option value="${b}"></option>`;const y=va(u);return`<option value="${b}" label="${y}"></option>`}).join("");e&&(e.innerHTML=d),t&&(t.innerHTML=d)}function Nr(e,t,n={}){const{silent:a=!1}=n,s=ae(e);if(!s)return{success:!1,message:null};const{start:r,end:i}=ln();if(!r||!i){const m=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||E(m),{success:!1,message:m}}const c=ht();if(ti(c).has(s)){const m=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||E(m),{success:!1,message:m}}const l=Rs(s,r,i);if(l.length){const m=l.map(h=>h.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`);return a||E(g),{success:!1,message:g}}if(gt(s,r,i)){const m=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||E(m),{success:!1,message:m}}const u=Na(s);if(!u){const m=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||E(m),{success:!1,message:m}}const b=_t(u);if(b==="maintenance"||b==="retired"){const m=an(b);return a||E(m),{success:!1,message:m}}const y=rn(u);if(!y){const m=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||E(m),{success:!1,message:m}}Pa({id:y,equipmentId:y,barcode:s,desc:u.desc,qty:1,price:u.price,image:on(u)}),t&&(t.value=""),kt(),ye();const p=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||E(p),{success:!0,message:p,barcode:s}}function qs(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Lr(t);if(!n){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=dl(n.barcode),s=_t(a||n);if(s==="maintenance"||s==="retired"){E(an(s));return}const r=ae(n.barcode);if(!r){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=rn(n);if(!i){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:on(n)},{start:d,end:l}=ln();if(!d||!l){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=ht();if(ti(u).has(r)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const y=Rs(r,d,l);if(y.length){const p=y.map(m=>m.name).join(", ");E(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${p}`));return}if(gt(r,d,l)){E(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}Pa(c),kt(),ye(),E(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function Hl(){Mt();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),qs(e))});const t=()=>{Tr(e.value,"equipment-description-options")&&qs(e)};e.addEventListener("focus",()=>{if(Mt(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function $i(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function ti(e=ht()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=ae(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const r=ae(s?.normalizedBarcode??s?.barcode);r&&t.add(r)})}),t}function Vl(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=ln();if(!t||!n){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}al({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):E(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(An.change,t=>{$i(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),$i(e,pr()))}function Ul(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,r=a.length?a:t.barcode?[t.barcode]:[];if(!r.length)return;let i=0,c=null;const d=[],l=new Set;r.forEach(b=>{const y=ae(b);y&&!l.has(y)&&(l.add(y),d.push(y))});const u=Math.min(s,d.length);for(let b=0;b<u;b+=1){const y=d[b],p=Nr(y,null,{silent:!0});p.success&&(i+=1),p.message&&(c=p.message)}if(i>0){const y=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",v(String(i)));E(y)}else c&&E(c)}function jr(){Vl(),!(Ai||typeof document>"u")&&(document.addEventListener(An.requestAdd,Ul),Ai=!0)}function Kn(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),r=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:r}}function Ss(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=Kn();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const r=document.getElementById("equipment-barcode"),i=document.getElementById("equipment-description"),c=t==="package";r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),Mc(t),t==="package"&&za()}function za(){const{packageSelect:e,packageHint:t}=Kn();if(!e)return;const n=Wi();wr=n,Lc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,r=n.map(c=>{const d=Number.isFinite(Number(c.price))?Number(c.price):0,l=v(d.toFixed(2)),u=`${c.name} — ${l} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${r}`,e.selectedIndex=0;const i=n.length>0;e.disabled=!i,t&&(i?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),Fr()}function Kl(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:r,blockingPackages:i})=>{const c=r?.desc||v(String(r?.barcode??r?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(i)&&i.length){const d=i.map(l=>l.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${d})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function Br(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const r=Mn(e);if(!r)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const i=Bl(r);if(!i)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(p=>p?.type==="package"&&Mn(p.packageId)===r))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(Tc(r,n,a,s)){const p=i.name||r;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${p} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(i.items)&&i.items.length?i.items:Fs(i.raw??{}),d=ti(t),l=[],u=new Set;if(c.forEach(p=>{const m=ae(p?.normalizedBarcode??p?.barcode);if(m){if(u.has(m)){l.push({item:p,type:"internal"});return}u.add(m),d.has(m)&&l.push({item:p,type:"external"})}}),l.length){const p=l.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>v(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:l.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",p):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",p),duplicates:l}}const b=[];return c.forEach(p=>{const m=ae(p?.normalizedBarcode??p?.barcode);if(m&&gt(m,n,a,s)){const g=Rs(m,n,a,s);b.push({item:p,blockingPackages:g})}}),b.length?{success:!1,reason:"item_conflict",message:Kl(i,b),conflicts:b}:{success:!0,package:{id:`package::${r}`,packageId:r,type:"package",desc:i.name||`Package ${r}`,qty:1,price:Number.isFinite(Number(i.price))?Number(i.price):0,barcode:i.code||i.raw?.package_code||`pkg-${r}`,packageItems:c.map(p=>({equipmentId:p?.equipmentId??null,barcode:p?.barcode??p?.normalizedBarcode??"",normalizedBarcode:ae(p?.normalizedBarcode??p?.barcode),desc:p?.desc??"",qty:Number.isFinite(Number(p?.qty))?Number(p.qty):1,price:Number.isFinite(Number(p?.price))?Number(p.price):0})),image:c.find(p=>p?.image)?.image??null},packageInfo:i}}function Dr(e,{silent:t=!1}={}){const n=Mn(e);if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=ln(),r=ht(),i=Br(n,{existingItems:r,start:a,end:s});if(!i.success){if(!t){const d={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[i.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");E(i.message||d)}return i}return Pa(i.package),kt(),ye(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:i.package}}function Fr(){const{packageSelect:e}=Kn();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;Dr(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function Ql(){const{packageAddButton:e,packageSelect:t}=Kn();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}Dr(n)}),e.dataset.listenerAttached="true")}function Rr(){const{modeRadios:e}=Kn();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&Ss(s.target.value)}),a.dataset.listenerAttached="true")}),Ql(),Fr();const t=da(),n=e.find(a=>a.value===t);n&&(n.checked=!0),Ss(t)}function kt(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=ht(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),d=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const l=En(n);t.innerHTML=l.map(u=>{const b=u.items[0]||{},y=on(b)||u.image,p=y?`<img src="${y}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=v(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,h=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,_=`${v(g.toFixed(2))} ${s}`,q=`${v(h.toFixed(2))} ${s}`,A=u.items.some(I=>I?.type==="package"),T=u.barcodes.map(I=>v(String(I||""))).filter(Boolean),K=T.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${T.map(I=>`<li>${I}</li>`).join("")}
            </ul>
          </details>`:"";let S="";if(A){const I=new Map;if(u.items.forEach($=>{Array.isArray($?.packageItems)&&$.packageItems.forEach(P=>{if(!P)return;const H=ae(P.barcode||P.desc||Math.random()),C=I.get(H);if(C){C.qty+=Number.isFinite(Number(P.qty))?Number(P.qty):1;return}I.set(H,{desc:P.desc||P.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(P.qty))?Number(P.qty):1,barcode:P.barcode??P.normalizedBarcode??""})})}),I.size){const $=Array.from(I.values()).map(P=>{const H=v(String(P.qty)),C=P.desc||v(String(P.barcode||"")),j=P.barcode?` <span class="reservation-package-items__barcode">(${v(String(P.barcode))})</span>`:"";return`<li>${C}${j} × ${H}</li>`}).join("");S=`
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
              <div class="reservation-item-thumb-wrapper">${p}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${A?`${S||""}${K||""}`:K}
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
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${d}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function Gl(e){const t=ht(),a=En(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Dc(s),kt(),ye())}function Wl(e){const t=ht(),n=t.filter(a=>Ca(a)!==e);n.length!==t.length&&(er(n),kt(),ye())}function Xl(e){const t=ht(),a=En(t).find(b=>b.key===e);if(!a)return;const{start:s,end:r}=ln();if(!s||!r){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(b=>ae(b.barcode))),{equipment:c=[]}=he(),d=(c||[]).find(b=>{const y=ae(b?.barcode);return!y||i.has(y)||Ca({desc:b?.desc||b?.description||b?.name||"",price:Number(b?.price)||0})!==e||!mr(b)?!1:!gt(y,s,r)});if(!d){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const l=ae(d.barcode),u=rn(d);if(!u){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}Pa({id:u,equipmentId:u,barcode:l,desc:d.desc||d.description||d.name||a.description||"",qty:1,price:Number.isFinite(Number(d.price))?Number(d.price):a.unitPrice,image:on(d)}),kt(),ye()}function ye(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(v(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),d=c?.value||"unpaid",{start:l,end:u}=ln();i&&rt();const b=vn(),y=document.getElementById("res-payment-progress-type"),p=document.getElementById("res-payment-progress-value"),m=xr(y),g=Ir(p);Xi(),vi({selectedItems:ht(),discount:n,discountType:s,applyTax:i,paidStatus:d,paymentProgressType:m,paymentProgressValue:g,start:l,end:u,companySharePercent:b,paymentHistory:[]});const h=vi.lastResult;h?(_r(p,h.paymentProgressValue),c&&(c.value=h.paymentStatus,Ye(c,h.paymentStatus))):Ye(c,d)}function Jl(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=v(c.target.value),ye()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",ye),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(Je()){n.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}vs("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(Je()){a.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}vs("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(Je()){s.value="unpaid",Ye(s,"unpaid"),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ye(s),ye()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(Je()){r.value="percent",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",ye()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(Je()){i.value="",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=v(c.target.value),ye()}),i.dataset.listenerAttached="true"),ye()}function Yl(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){ye();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),ye()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Pi(){const{input:e,hidden:t}=Xs(),{input:n,hidden:a}=cn(),{customers:s}=he();let r=t?.value?String(t.value):"";if(!r&&e?.value){const V=gs(e.value,{allowPartial:!0});V&&(r=String(V.id),t&&(t.value=r),e.value=V.label,e.dataset.selectedId=r)}const i=s.find(V=>String(V.id)===r);if(!i){E(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let d=a?.value?String(a.value):"";if(!d&&n?.value){const V=hs(n.value,{allowPartial:!0});V&&(d=String(V.id),a&&(a.value=d),n.value=V.label,n.dataset.selectedId=d)}const l=document.getElementById("res-start").value,u=document.getElementById("res-end").value,b=document.getElementById("res-start-time")?.value||"00:00",y=document.getElementById("res-end-time")?.value||"00:00";if(!l||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const p=`${l}T${b}`,m=`${u}T${y}`,g=new Date(p),h=new Date(m);if(Number.isNaN(g.getTime())||Number.isNaN(h.getTime())||g>=h){E(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const _=Xi();_.map(V=>V.technicianId).filter(Boolean);const q=ht();if(q.length===0&&_.length===0){E(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const A=document.getElementById("res-notes")?.value||"",T=parseFloat(v(document.getElementById("res-discount")?.value))||0,K=document.getElementById("res-discount-type")?.value||"percent",S=document.getElementById("res-payment-status"),I=S?.value||"unpaid",$=document.getElementById("res-payment-progress-type"),P=document.getElementById("res-payment-progress-value"),H=xr($),C=Ir(P),j=d?Ys(d):null,W=Fl(j);if(d&&!j){E(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const V of q){const oe=_t(V.barcode);if(oe==="maintenance"||oe==="retired"){E(an(oe));return}}for(const V of q){const oe=ae(V.barcode);if(gt(oe,p,m)){E(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const V of _)if(V?.technicianId&&tr(V.technicianId,p,m)){E(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const k=document.getElementById("res-tax"),F=document.getElementById("res-company-share"),x=!!d;x?(k&&(k.checked=!1,k.disabled=!0,k.classList.add("disabled"),k.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),F&&(F.checked=!1,F.disabled=!0,F.classList.add("disabled"),F.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),S&&(S.value="unpaid",S.disabled=!0,Ye(S,"unpaid"),S.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),$&&($.disabled=!0,$.classList.add("disabled")),P&&(P.value="",P.disabled=!0,P.classList.add("disabled"))):(k&&(k.disabled=!1,k.classList.remove("disabled"),k.title=""),F&&(F.disabled=!1,F.classList.remove("disabled"),F.title=""),S&&(S.disabled=!1,S.title=""),$&&($.disabled=!1,$.classList.remove("disabled")),P&&(P.disabled=!1,P.classList.remove("disabled")));const X=x?!1:k?.checked||!1,Q=!!F?.checked;if(!x&&Q!==X){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let M=Q?vn():null;Q&&(!Number.isFinite(M)||M<=0)&&(rt(),M=vn());const B=Q&&X&&Number.isFinite(M)&&M>0;X&&rt();const D=Ms(q,T,K,X,_,{start:p,end:m,companySharePercent:B?M:0}),O=Pc(),J=zs({totalAmount:D,progressType:H,progressValue:C,history:[]});P&&_r(P,J.paymentProgressValue);const re=[];J.paymentProgressValue!=null&&J.paymentProgressValue>0&&re.push({type:J.paymentProgressType||H,value:J.paymentProgressValue,amount:J.paidAmount,percentage:J.paidPercent,recordedAt:new Date().toISOString()});const se=Os({manualStatus:I,paidAmount:J.paidAmount,paidPercent:J.paidPercent,totalAmount:D});S&&(S.value=se,Ye(S,se));const de=nr({reservationCode:O,customerId:c,start:p,end:m,status:W?"confirmed":"pending",title:null,location:null,notes:A,projectId:d||null,totalAmount:D,discount:x?0:T,discountType:x?"percent":K,applyTax:X,paidStatus:x?"unpaid":se,confirmed:W,items:q.map(V=>({...V,equipmentId:V.equipmentId??V.id})),crewAssignments:_,companySharePercent:x||!B?null:M,companyShareEnabled:x?!1:B,paidAmount:x?0:J.paidAmount,paidPercentage:x?0:J.paidPercent,paymentProgressType:x?null:J.paymentProgressType,paymentProgressValue:x?null:J.paymentProgressValue,paymentHistory:x?[]:re});try{wi("about to submit",{crewAssignments:_,techniciansPayload:de?.technicians,payload:de});const V=await Fc(de);wi("server response",{reservation:V?.id??V?.reservationId??V?.reservation_code,technicians:V?.technicians,crewAssignments:V?.crewAssignments,techniciansDetails:V?.techniciansDetails}),xn(),Mt(),gn(),td(),E(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof fs=="function"&&fs({type:"created",reservation:V}),Zl(V)}catch(V){console.error("❌ [reservations/createForm] Failed to create reservation",V);const oe=La(V)?V.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");E(oe,"error"),x&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),jn({clearValue:!1}))}}function Zl(e){if(!ra)return;const{draftStorageKey:t=qr,returnUrl:n=Sr}=ra,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}ra=null,n&&(window.location.href=n)}function jn({clearValue:e=!1}={}){const{input:t,hidden:n}=cn();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,Rt())}function ed(e,t=""){const{input:n,hidden:a}=cn();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),Rt())}function td(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),xt({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),jn({clearValue:!1}),qn({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",Ye(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),Rc(),er([]),ma("form-reset"),kt(),Rt(),ye()}function nd(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){Gl(s);return}if(a==="increase-group"&&s){Xl(s);return}if(a==="remove-group"&&s){Wl(s);return}}),e.dataset.listenerAttached="true")}function ad(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(da()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,Nr(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||da()!=="single")return;const{start:r,end:i}=ln();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function sd(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Pi()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Pi()}),t.dataset.listenerAttached="true")}function Ip({onAfterSubmit:e}={}){fs=typeof e=="function"?e:null;const{customers:t,projects:n}=he();Bc(t||[]),xt(),ei(),$r(n||[]),Cr({projectsList:n}),Zs(),Mt(),za(),Hl(),jr(),Rr(),Yl(),Jl(),nd(),ad(),sd(),Rl(),ye(),kt()}function Mr(){Mt(),za(),Cr(),xt(),ei(),Zs(),jr(),Rr(),kt(),ye()}if(typeof document<"u"){const e=()=>{xt(),qn({projectsList:Js()}),ei(),Zs(),ye()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{Mt()}),document.addEventListener("packages:changed",()=>{za(),da()==="package"&&Ss("package")})}typeof window<"u"&&(window.getCompanySharePercent=vn);function zr(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:Gt(t),endDate:Gt(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:Gt(n),endDate:Gt(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Gt(n),endDate:Gt(a)}}return e==="upcoming"?{startDate:Gt(t),endDate:""}:{startDate:"",endDate:""}}function id(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=v(t?.value||"").trim(),i=v(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),Ea(t),Ea(n),r="",i=""),!r&&!i&&c){const l=zr(c);r=l.startDate,i=l.endDate}return{searchTerm:Ge(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function _p(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=v(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{rd(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),Ea(a),Ea(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function rd(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=zr(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function Gt(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function Ea(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function na(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function od(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function cd(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=od(n);if(a!==null)return a}return null}function Ci(e,t=0){const n=cd(e);if(n!=null)return n;const a=na(e.createdAt??e.created_at);if(a!=null)return a;const s=na(e.updatedAt??e.updated_at);if(s!=null)return s;const r=na(e.start);if(r!=null)return r;const i=na(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function ld({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((q,A)=>({reservation:q,index:A})),i=t.searchTerm||"",c=t.searchReservationId||"",d=t.searchCustomerName||"",l=t.searchProjectId||"",u=t.startDate||"",b=t.endDate||"",y=t.status||"",p=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,m=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,h=b?new Date(`${b}T23:59:59`):null,_=r.filter(({reservation:q})=>{const A=n.get(String(q.customerId)),T=s?.get?.(String(q.projectId)),K=q.start?new Date(q.start):null,S=Hs(q),{effectiveConfirmed:I}=zt(q,T);if(p!=null&&String(q.customerId)!==String(p)||m!=null&&!(Array.isArray(q.technicians)?q.technicians.map(j=>String(j)):[]).includes(String(m))||y==="confirmed"&&!I||y==="pending"&&I||y==="completed"&&!S||g&&K&&K<g||h&&K&&K>h)return!1;if(c){const C=[q.reservationId,q.id,q.reservation_id,q.reservationCode,q.reservation_code,q.code,q.reference,q.referenceNumber,q.reference_number],j=Ge(C.filter(k=>k!=null&&k!=="").map(String).join(" ")).replace(/\s+/g,""),W=c.replace(/\s+/g,"");if(!j.includes(W))return!1}if(d&&!Ge(A?.customerName||"").includes(d))return!1;if(l){const C=[q.projectId,q.project_id,q.projectID,T?.id,T?.projectCode,T?.project_code],j=Ge(C.filter(k=>k!=null&&k!=="").map(String).join(" ")).replace(/\s+/g,""),W=l.replace(/\s+/g,"");if(!j.includes(W))return!1}if(!i)return!0;const $=q.items?.map?.(C=>`${C.barcode} ${C.desc}`).join(" ")||"",P=(q.technicians||[]).map(C=>a.get(String(C))?.name).filter(Boolean).join(" ");return Ge([q.reservationId,A?.customerName,q.notes,$,P,T?.title].filter(Boolean).join(" ")).includes(i)});return _.sort((q,A)=>{const T=Ci(q.reservation,q.index),K=Ci(A.reservation,A.index);return T!==K?K-T:A.index-q.index}),_}function dd({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),d=o("reservations.list.itemsCountShort","{count} عنصر"),l=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),b=o("reservations.list.status.pending","⏳ غير مؤكد"),y=o("reservations.list.payment.paid","💳 مدفوع"),p=o("reservations.list.payment.unpaid","💳 غير مدفوع"),m=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),g=o("reservations.list.actions.confirm","✔️ تأكيد"),h=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),_=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),q={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:A,index:T})=>{const K=t.get(String(A.customerId)),S=A.projectId?a?.get?.(String(A.projectId)):null,I=Hs(A),$=A.paidStatus??A.paid_status??(A.paid===!0||A.paid==="paid"?"paid":"unpaid"),P=$==="paid",H=$==="partial",{effectiveConfirmed:C,projectLinked:j}=zt(A,S),W=C?"status-confirmed":"status-pending",k=P?"status-paid":H?"status-partial":"status-unpaid";let F=`<span class="reservation-chip status-chip ${W}">${C?u:b}</span>`;const x=P?y:H?m:p;let X=`<span class="reservation-chip status-chip ${k}">${x}</span>`,Q=P?" tile-paid":H?" tile-partial":" tile-unpaid";I&&(Q+=" tile-completed");let M="";I&&(F=`<span class="reservation-chip status-chip status-completed">${u}</span>`,X=`<span class="reservation-chip status-chip status-completed">${x}</span>`,M=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const B=!j&&!C?`<button class="tile-confirm" data-reservation-index="${T}" data-action="confirm">${g}</button>`:"",D=B?`<div class="tile-actions">${B}</div>`:"",O=A.items?.length||0,J=Array.isArray(A.crewAssignments)?A.crewAssignments:[],re=(A.technicians||[]).map(pe=>n.get(String(pe))).filter(Boolean),se=J.length?J.map(pe=>{const U=pe.positionLabel??pe.position_name??pe.role??o("reservations.crew.positionFallback","منصب بدون اسم"),ve=pe.technicianName??n.get(String(pe.technicianId??""))?.name??null;return ve?`${v(U)} (${v(ve)})`:v(U)}):re.map(pe=>pe.name),de=se.length?se.join(l):"—",V=v(String(A.reservationId??"")),oe=A.start?v(Ze(A.start)):"-",we=A.end?v(Ze(A.end)):"-",Ee=v(String(A.cost??0)),Ce=v(String(O)),G=A.notes?v(A.notes):c,ee=d.replace("{count}",Ce),ue=A.applyTax?`<small>${r}</small>`:"";let _e=h;return A.projectId&&(_e=S?.title?v(S.title):_),`
      <div class="${B?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${Q}"${M} data-reservation-index="${T}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${V}</div>
          <div class="tile-badges">
            ${F}
            ${X}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${q.client}</span>
            <span class="tile-value">${K?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${q.project}</span>
            <span class="tile-value">${_e}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${q.start}</span>
            <span class="tile-value tile-inline">${oe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${q.end}</span>
            <span class="tile-value tile-inline">${we}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${q.cost}</span>
            <span class="tile-value">${Ee} ${s} ${ue}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${q.equipment}</span>
            <span class="tile-value">${ee}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${q.crew}</span>
            <span class="tile-value">${se.length?de:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${G}</span>
          </div>
        </div>
        ${D}
      </div>
    `}).join("")}function Qe(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ss(e){if(e==null)return"";const t=String(e).trim();return t?v(t):""}function Li(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=zt(e,s),c=e.paid===!0||e.paid==="paid",d=Hs(e),l=e.items||[];let{groups:u}=sr(e);const b=f=>!!(f&&typeof f=="object"&&(f.type==="package"||Array.isArray(f.packageItems)&&f.packageItems.length||Array.isArray(f.items)&&f.items.some(R=>R&&R.type==="package"))),y=f=>{const R=(f?.package_code??f?.packageDisplayCode??f?.barcode??f?.description??(Array.isArray(f?.items)&&f.items[0]?.barcode)??"").toString().trim().toLowerCase();return v(R)},p=(f,R)=>{const Z=Ae=>{const Te=Array.isArray(Ae?.items)?Ae.items[0]:null,ke=[Te?.price,Te?.unit_price,Te?.unitPrice,Ae?.unitPrice,Ae?.totalPrice];for(const Ct of ke){const Re=je(Ct);if(Number.isFinite(Re)&&Re>0)return Re}return 0},me=Z(f),ge=Z(R);return me&&ge?me<=ge?f:R:me?f:R},m=[],g=new Map;u.forEach(f=>{if(!b(f)){m.push(f);return}const R=y(f);if(!R){if(!g.has("__unknown__"))g.set("__unknown__",m.length),m.push(f);else{const Z=g.get("__unknown__");m[Z]=p(m[Z],f)}return}if(!g.has(R))g.set(R,m.length),m.push(f);else{const Z=g.get(R);m[Z]=p(m[Z],f)}}),u=m;const{technicians:h=[]}=he(),_=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(h)?h:[]),q=new Map;_.forEach(f=>{if(!f||f.id==null)return;const R=String(f.id),Z=q.get(R)||{};q.set(R,{...Z,...f})});const T=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(f=>({technicianId:f}))).map((f,R)=>{const Z=f?.technicianId!=null?q.get(String(f.technicianId)):null;let me=f.positionLabel??f.position_name??f.position_label??f.role??f.position??"";(!me||me.trim()==="")&&(me=f.positionLabelAr??f.position_label_ar??f.positionLabelEn??f.position_label_en??f.position_name_ar??f.position_name_en??"");const ge=f.positionLabelAlt??f.position_label_alt??f.positionLabelEn??f.position_label_en??f.positionLabelAr??f.position_label_ar??"";let Ae=me,Te=ge;if(!Ae||Ae.trim()==="")try{const Re=Tt?Tt():[];let ne=null;if(f.positionId!=null&&(ne=Re.find($e=>String($e.id)===String(f.positionId))||null),!ne){const $e=f.positionKey??f.position_key??f.positionName??f.position_name??f.position??"";if($e&&(ne=typeof ua=="function"?ua($e):null,!ne&&Re.length)){const nt=String($e).trim().toLowerCase();ne=Re.find(at=>[at.name,at.labelAr,at.labelEn].filter(Boolean).map(Lt=>String(Lt).toLowerCase()).includes(nt))||null}}ne&&(Ae=ne.labelAr||ne.labelEn||ne.name||"",(!Te||String(Te).trim()==="")&&(ne.labelAr&&ne.labelEn?Te=Ae===ne.labelAr?ne.labelEn:ne.labelAr:Te=ne.labelAr||ne.labelEn||""))}catch{}const ke=Se(je(f.positionCost??f.position_cost??f.cost??f.daily_wage??f.dailyWage??Z?.dailyWage??Z?.wage??0)),Ct=Se(je(f.positionClientPrice??f.position_client_price??f.client_price??f.clientPrice??f.daily_total??f.dailyTotal??f.total??Z?.dailyTotal??Z?.total??Z?.total_wage??0));return{assignmentId:f.assignmentId??f.assignment_id??`crew-${R}`,positionId:f.positionId??f.position_id??null,positionKey:f.positionKey??f.position_key??f.positionName??f.position_name??f.position??null,positionLabel:Ae,positionLabelAlt:Te,positionLabelAr:f.positionLabelAr??f.position_label_ar??null,positionLabelEn:f.positionLabelEn??f.position_label_en??null,positionCost:ke,positionClientPrice:Ct,technicianId:f.technicianId!=null?String(f.technicianId):Z?.id!=null?String(Z.id):null,technicianName:f.technicianName??f.technician_name??Z?.name??null,technicianRole:f.technicianRole??Z?.role??null,technicianPhone:f.technicianPhone??Z?.phone??null,notes:f.notes??null}}),K=sn(),S=Ta(e.start,e.end),I=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,$=je(I),P=Number.isFinite($)?$:0,H=e.discountType??e.discount_type??e.discountMode??"percent",C=String(H).toLowerCase()==="amount"?"amount":"percent",j=r?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),W=je(e.cost??e.total??e.finalTotal),k=Number.isFinite(W),F=k?Se(W):0,x=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,X=x!=null?je(x):Number.NaN;let B=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(X)&&X>0)&&Number.isFinite(X)?X:0;j&&B<=0&&(B=Dt);const D=ir({items:l,technicianIds:e.technicians||[],crewAssignments:T,discount:P,discountType:C,applyTax:j,start:e.start,end:e.end,companySharePercent:B}),O=Se(D.equipmentTotal),J=Se(D.crewTotal);Se(D.crewCostTotal);const re=Se(D.discountAmount),se=Se(D.subtotalAfterDiscount),de=Number.isFinite(D.companySharePercent)?D.companySharePercent:0;let V=Se(D.companyShareAmount);V=de>0?Se(Math.max(0,V)):0;const oe=Se(D.taxAmount),we=Se(D.finalTotal),Ee=r?we:k?F:we,Ce=Se(D.netProfit),G=v(String(e.reservationId??e.id??"")),ee=e.start?v(Ze(e.start)):"-",ue=e.end?v(Ze(e.end)):"-",_e=v(String(T.length)),Fe=v(O.toFixed(2)),pe=v(re.toFixed(2)),U=v(se.toFixed(2)),ve=v(oe.toFixed(2)),L=v((Number.isFinite(Ee)?Ee:0).toFixed(2)),ce=v(String(S)),te=o("reservations.create.summary.currency","SR"),qe=o("reservations.details.labels.discount","الخصم"),be=o("reservations.details.labels.tax","الضريبة (15%)"),Xe=o("reservations.details.labels.crewTotal","إجمالي الفريق"),ct=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),Ke=o("reservations.details.labels.duration","عدد الأيام"),lt=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),$t=o("reservations.details.labels.netProfit","💵 صافي الربح"),kn=o("reservations.create.equipment.imageAlt","صورة"),He={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},Wa=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),z=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");o("reservations.details.technicians.roleUnknown","غير محدد");const Le=o("reservations.details.technicians.phoneUnknown","غير متوفر");o("reservations.details.technicians.wage","{amount} {currency} / اليوم");const dt=o("reservations.list.status.confirmed","✅ مؤكد"),qt=o("reservations.list.status.pending","⏳ غير مؤكد"),Wn=o("reservations.list.payment.paid","💳 مدفوع"),Xn=o("reservations.list.payment.unpaid","💳 غير مدفوع"),ut=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),Jn=o("reservations.list.status.completed","📁 منتهي"),Yn=o("reservations.details.labels.id","🆔 رقم الحجز"),Xa=o("reservations.details.section.bookingInfo","بيانات الحجز"),un=o("reservations.details.section.paymentSummary","ملخص الدفع"),Ne=o("reservations.details.labels.finalTotal","المجموع النهائي"),Ve=o("reservations.details.section.crew","😎 الفريق الفني"),Ut=o("reservations.details.crew.count","{count} عضو"),St=o("reservations.details.section.items","📦 المعدات المرتبطة"),Zn=o("reservations.details.items.count","{count} عنصر"),Vo=o("reservations.details.actions.edit","✏️ تعديل"),Uo=o("reservations.details.actions.delete","🗑️ حذف"),Ko=o("reservations.details.labels.customer","العميل"),Qo=o("reservations.details.labels.contact","رقم التواصل"),Go=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Wo=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Xo=o("reservations.details.actions.openProject","📁 فتح المشروع"),Jo=o("reservations.details.labels.start","بداية الحجز"),Yo=o("reservations.details.labels.end","نهاية الحجز"),Zo=o("reservations.details.labels.notes","ملاحظات"),ec=o("reservations.list.noNotes","لا توجد ملاحظات"),tc=o("reservations.details.labels.itemsCount","عدد المعدات"),nc=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),ac=o("reservations.paymentHistory.title","سجل الدفعات"),sc=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),ic=o("reservations.list.unknownCustomer","غير معروف"),Ja=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),fi=Ja==="partial",rc=Ja==="paid"?Wn:fi?ut:Xn;function Ya(f){if(f==null)return Number.NaN;if(typeof f=="number")return Number.isFinite(f)?f:Number.NaN;const R=String(f).replace(/[^0-9.+-]/g,""),Z=Number(R);return Number.isFinite(Z)?Z:Number.NaN}const ea=(f={})=>{const R=String(f.type??f.kind??f.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(R)||Array.isArray(f.packageItems)&&f.packageItems.length)},oc=(f={})=>[f.packageId,f.package_id,f.packageCode,f.package_code,f.bundleId,f.bundle_id].some(R=>R!=null&&R!==""),cc=(f={})=>!f||typeof f!="object"?!1:!ea(f)&&oc(f),yi=(f={})=>{const R=ea(f),Z=[{value:f.qty,key:"qty",limit:999},{value:f.quantity,key:"quantity",limit:999},{value:f.units,key:"units",limit:999},{value:f.count,key:"count",limit:50},{value:f.package_quantity,key:"package_quantity",limit:999},{value:f.packageQty,key:"packageQty",limit:999},{value:f.packageCount,key:"packageCount",limit:999}];let me=NaN;for(const ge of Z){if(ge.value==null||ge.value==="")continue;const Ae=typeof ge.value=="string"?ge.value.trim():String(ge.value??"");if(ge.key==="count"&&Ae.length>6)continue;const Te=Ya(ge.value);if(!Number.isFinite(Te)||Te<=0)continue;const ke=Math.round(Te);if(!(ke>ge.limit)){me=Math.max(1,ke);break}}return(!Number.isFinite(me)||me<=0)&&(me=1),R?Math.max(1,Math.min(99,me)):Math.max(1,Math.min(9999,me))};let Me=(Array.isArray(l)?l:[]).reduce((f,R)=>!R||typeof R!="object"||cc(R)?f:f+yi(R),0);Me<=0&&Array.isArray(u)&&u.length&&(Me=u.reduce((f,R)=>{const Z=yi({...R,type:R.type});return f+Z},0)),!Number.isFinite(Me)||Me<=0?Me=Array.isArray(u)&&u.length?u.length:(Array.isArray(l)?l.length:0)||1:Me>1e6&&(Me=Math.min(Me,Array.isArray(u)?u.length:Me),(!Number.isFinite(Me)||Me<=0)&&(Me=(Array.isArray(l)?l.length:0)||1)),Me=Math.max(1,Math.round(Me));const lc=v(String(Me)),bi=Zn.replace("{count}",lc),dc=Ut.replace("{count}",_e),uc=e.notes?v(e.notes):ec,pc=v(J.toFixed(2)),mc=v(String(de)),fc=v(V.toFixed(2)),yc=`${mc}% (${fc} ${te})`,bc=Number.isFinite(Ce)?Math.max(0,Ce):0,gc=v(bc.toFixed(2)),Pt=[{icon:"💼",label:nc,value:`${Fe} ${te}`}];Pt.push({icon:"😎",label:Xe,value:`${pc} ${te}`}),re>0&&Pt.push({icon:"💸",label:qe,value:`${pe} ${te}`}),Pt.push({icon:"📊",label:ct,value:`${U} ${te}`}),j&&oe>0&&Pt.push({icon:"🧾",label:be,value:`${ve} ${te}`}),de>0&&Pt.push({icon:"🏦",label:lt,value:yc}),Pt.push({icon:"💵",label:$t,value:`${gc} ${te}`}),Pt.push({icon:"💰",label:Ne,value:`${L} ${te}`});const hc=Pt.map(({icon:f,label:R,value:Z})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${f} ${R}</span>
      <span class="summary-details-value">${Z}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let $n=[];Array.isArray(e.paymentHistory)?$n=e.paymentHistory:Array.isArray(e.payment_history)&&($n=e.payment_history);const vc=Array.isArray(e.paymentLogs)?e.paymentLogs:[],gi=Array.isArray($n)&&$n.length>0?$n:vc,qc=gi.length?`<ul class="reservation-payment-history-list">${gi.map(f=>{const R=f?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):f?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),Z=Number.isFinite(Number(f?.amount))&&Number(f.amount)>0?`${v(Number(f.amount).toFixed(2))} ${te}`:"—",me=Number.isFinite(Number(f?.percentage))&&Number(f.percentage)>0?`${v(Number(f.percentage).toFixed(2))}%`:"—",ge=f?.recordedAt?v(Ze(f.recordedAt)):"—",Ae=f?.note?`<div class="payment-history-note">${Qe(v(f.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${Qe(R)}</span>
              <span class="payment-history-entry__amount">${Z}</span>
              <span class="payment-history-entry__percent">${me}</span>
              <span class="payment-history-entry__date">${ge}</span>
            </div>
            ${Ae}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${Qe(sc)}</div>`,hi=[{text:i?dt:qt,className:i?"status-confirmed":"status-pending"},{text:rc,className:Ja==="paid"?"status-paid":fi?"status-partial":"status-unpaid"}];d&&hi.push({text:Jn,className:"status-completed"});const Sc=hi.map(({text:f,className:R})=>`<span class="status-chip ${R}">${f}</span>`).join(""),Kt=(f,R,Z)=>`
    <div class="res-info-row">
      <span class="label">${f} ${R}</span>
      <span class="value">${Z}</span>
    </div>
  `;let Za="";if(e.projectId){let f=Qe(Wo);if(s){const R=s.title||o("projects.fallback.untitled","مشروع بدون اسم");f=`${Qe(R)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${Qe(Xo)}</button>`}Za=`
      <div class="res-info-row">
        <span class="label">📁 ${Go}</span>
        <span class="value">${f}</span>
      </div>
    `}const Et=[];Et.push(Kt("👤",Ko,t?.customerName||ic)),Et.push(Kt("📞",Qo,t?.phone||"—")),Et.push(Kt("🗓️",Jo,ee)),Et.push(Kt("🗓️",Yo,ue)),Et.push(Kt("📦",tc,bi)),Et.push(Kt("⏱️",Ke,ce)),Et.push(Kt("📝",Zo,uc)),Za&&Et.push(Za);const Ec=Et.join(""),wc=u.length?u.map(f=>{const R=f.items[0]||{},Z=on(R)||f.image,me=Z?`<img src="${Z}" alt="${kn}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let ge=[];if(Array.isArray(f.packageItems)&&f.packageItems.length)ge=[...f.packageItems];else{const fe=[];f.items.forEach(xe=>{Array.isArray(xe?.packageItems)&&xe.packageItems.length&&fe.push(...xe.packageItems)}),ge=fe}if(Array.isArray(ge)&&ge.length>1){const fe=new Set;ge=ge.filter(xe=>{const ie=xe?.normalizedBarcode&&String(xe.normalizedBarcode).toLowerCase()||xe?.barcode&&String(xe.barcode).toLowerCase()||(xe?.equipmentId!=null?`id:${xe.equipmentId}`:null);return ie?fe.has(ie)?!1:(fe.add(ie),!0):!0})}const Ae=ea(f)||f.items.some(fe=>ea(fe))||ge.length>0,Te=(fe,{fallback:xe=1,max:ie=1e3}={})=>{const Ie=Ya(fe);return Number.isFinite(Ie)&&Ie>0?Math.min(ie,Ie):xe};let ke;if(Ae){const fe=Te(R?.qty??R?.quantity??R?.count,{fallback:NaN,max:999});Number.isFinite(fe)&&fe>0?ke=fe:ke=Te(f.quantity??f.count??1,{fallback:1,max:999})}else ke=Te(f.quantity??f.count??R?.qty??R?.quantity??R?.count??0,{fallback:1,max:9999});const Ct=v(String(ke)),Re=(fe,{preferPositive:xe=!1}={})=>{let ie=Number.NaN;for(const Ie of fe){const mt=je(Ie);if(Number.isFinite(mt)){if(xe&&mt>0)return mt;Number.isFinite(ie)||(ie=mt)}}return ie};let ne,$e;if(Ae){const fe=[R?.price,R?.unit_price,R?.unitPrice,f.unitPrice];if(ne=Re(fe,{preferPositive:!0}),!Number.isFinite(ne)||ne<0){const ie=je(f.totalPrice??R?.total??R?.total_price);Number.isFinite(ie)&&ke>0&&(ne=ie/ke)}Number.isFinite(ne)||(ne=0);const xe=[R?.total,R?.total_price,f.totalPrice];if($e=Re(xe),!Number.isFinite($e))$e=ne*ke;else{const ie=ne*ke;Number.isFinite(ie)&&ie>0&&Math.abs($e-ie)>ie*.25&&($e=ie)}}else{const fe=[R?.price,R?.unit_price,R?.unitPrice,f.unitPrice];if(ne=Re(fe,{preferPositive:!0}),!Number.isFinite(ne)||ne<0){const xe=je(f.totalPrice??R?.total??R?.total_price);Number.isFinite(xe)&&ke>0&&(ne=xe/ke)}Number.isFinite(ne)||(ne=0),$e=je(f.totalPrice??R?.total??R?.total_price),Number.isFinite($e)||($e=ne*ke)}ne=Se(ne),$e=Se($e);const nt=`${v(ne.toFixed(2))} ${te}`,at=`${v($e.toFixed(2))} ${te}`,Lt=f.barcodes.map(fe=>v(String(fe||""))).filter(Boolean),st=Lt.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${Lt.map(fe=>`<li>${fe}</li>`).join("")}
              </ul>
            </details>`:"";let pt="";if(ge.length){const fe=new Map,xe=ie=>{const Ie=Ya(ie?.qtyPerPackage??ie?.perPackageQty??ie?.quantityPerPackage);return Number.isFinite(Ie)&&Ie>0&&Ie<=99?Math.round(Ie):1};if(ge.forEach(ie=>{if(!ie)return;const Ie=ae(ie.barcode||ie.normalizedBarcode||ie.desc||Math.random());if(!Ie)return;const mt=fe.get(Ie),pn=xe(ie);if(mt){mt.qty=pn,mt.total=pn;return}fe.set(Ie,{desc:ie.desc||ie.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(pn,99)),total:Math.max(1,Math.min(pn,99)),barcode:ie.barcode??ie.normalizedBarcode??""})}),fe.size){const ie=Array.from(fe.values()).map(Ie=>{const mt=v(String(Ie.qty>0?Math.min(Ie.qty,99):1)),pn=Qe(Ie.desc||""),kc=Ie.barcode?` <span class="reservation-package-items__barcode">(${Qe(v(String(Ie.barcode)))})</span>`:"";return`<li>${pn}${kc} × ${mt}</li>`}).join("");pt=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${ie}
                </ul>
              </details>
            `}}const _c=Ae?`${pt||""}${st||""}`:st;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${me}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${Qe(R.desc||R.description||R.name||f.description||"-")}</div>
                  ${_c}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Qe(He.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Ct}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Qe(He.unitPrice)}">${nt}</td>
            <td class="reservation-modal-items-table__cell" data-label="${Qe(He.total)}">${at}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${Qe(He.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${Wa}</td></tr>`,Ac=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${He.item}</th>
            <th>${He.quantity}</th>
            <th>${He.unitPrice}</th>
            <th>${He.total}</th>
            <th>${He.actions}</th>
          </tr>
        </thead>
        <tbody>${wc}</tbody>
      </table>
    </div>
  `,xc=T.map((f,R)=>{const Z=v(String(R+1));let me=f.positionLabel??f.position_name??f.position_label??f.position_title??f.role??f.position??null;if((!me||me.trim()==="")&&(me=f.positionLabelAr??f.position_label_ar??f.position_title_ar??f.positionLabelEn??f.position_label_en??f.position_name_ar??f.position_title_en??f.position_name_en??null),!me||me.trim()==="")try{const nt=typeof Tt=="function"?Tt():[],at=f.positionId?nt.find(pt=>String(pt.id)===String(f.positionId)):null,Lt=!at&&f.positionKey?nt.find(pt=>String(pt.name).toLowerCase()===String(f.positionKey).toLowerCase()):null,st=at||Lt||null;st&&(me=st.labelAr||st.labelEn||st.name||me)}catch{}const ge=ss(me)||o("reservations.crew.positionFallback","منصب بدون اسم"),Ae=ss(f.positionLabelAlt??f.position_label_alt??f.positionLabelEn??f.position_label_en??f.positionLabelAr??f.position_label_ar??f.position_name_en??f.position_name_ar??""),Te=ss(f.technicianName)||o("technicians.picker.noTechnicianOption","— بدون تعيين —"),ke=f.technicianPhone||Le,Ct=Se(je(f.positionCost??f.position_cost??f.cost??f.daily_wage??f.dailyWage??f.internal_cost??0));let Re=Se(je(f.positionClientPrice??f.position_client_price??f.client_price??f.customer_price??f.position_price??f.clientPrice??f.daily_total??f.dailyTotal??f.total??0));if(!Number.isFinite(Re)||Re<=0)try{const nt=Tt?Tt():[],at=f.positionId?nt.find(pt=>String(pt.id)===String(f.positionId)):null,Lt=!at&&f.positionKey?nt.find(pt=>String(pt.name).toLowerCase()===String(f.positionKey).toLowerCase()):null,st=at||Lt||null;st&&Number.isFinite(Number(st.clientPrice))&&(Re=Se(Number(st.clientPrice)))}catch{}const ne=`${v(Re.toFixed(2))} ${te}`,$e=Ct>0?`${v(Ct.toFixed(2))} ${te}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${Z}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${Te}</span>
            <small class="text-muted">🏷️ ${ge}${Ae?` — ${Ae}`:""}</small>
            <small class="text-muted">💼 ${ne}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${ke}</div>
          ${$e?`<div>💵 ${o("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${$e}</div>`:""}
        </div>
      </div>
    `}).join(""),Ic=T.length?`<div class="reservation-technicians-grid">${xc}</div>`:`<ul class="reservation-modal-technicians"><li>${z}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${Yn}</span>
          <strong>${G}</strong>
        </div>
        <div class="status-chips">
          ${Sc}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Xa}</h6>
          ${Ec}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${un}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${hc}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${ac}</h6>
              ${qc}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Ve}</span>
          <span class="count">${dc}</span>
        </div>
        ${Ic}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${St}</span>
          <span class="count">${bi}</span>
        </div>
        ${Ac}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${Vo}</button>
        ${K?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Uo}</button>`:""}
      </div>
    </div>
  `}const kp="project",$p="editProject",Pp=3600*1e3,Or=.15,Cp=6,Lp="projectsTab",Tp="projectsSubTab",Np={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},jp={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},Bp={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},ud=`@page {
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
`,pd=/color\([^)]*\)/gi,md=/color-mix\([^)]*\)/gi,fd=/oklab\([^)]*\)/gi,yd=/oklch\([^)]*\)/gi,Bt=/(color\(|color-mix\(|oklab|oklch)/i,bd=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke","boxShadow","textShadow","accentColor","caretColor","columnRuleColor"],gd=typeof document<"u"?document.createElement("canvas"):null,aa=gd?.getContext?.("2d")||null;function Hr(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function Es(e,t="#000"){if(!aa||!e)return t;try{return aa.fillStyle="#000",aa.fillStyle=e,aa.fillStyle||t}catch{return t}}function hd(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&Bt.test(n)){const s=Es(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function fn(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function Vr(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;bd.forEach(c=>{const d=r[c];if(d&&Bt.test(d)){const l=Hr(c);if(fn(n,s,l),c==="boxShadow"||c==="textShadow")s.style.setProperty(l,"none","important");else{const u=c==="backgroundColor"?"#ffffff":r.color||"#000000",b=Es(d,u);s.style.setProperty(l,b,"important")}}});const i=r.backgroundImage;if(i&&Bt.test(i)){const c=Es(r.backgroundColor||"#ffffff","#ffffff");fn(n,s,"background-image"),fn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function Ur(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","boxShadow","textShadow","accentColor","caretColor","columnRuleColor"].forEach(c=>{const d=r[c];if(d&&Bt.test(d)){const l=Hr(c);if(fn(n,s,l),c==="boxShadow"||c==="textShadow")s.style.setProperty(l,"none","important");else{const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(l,u,"important")}}});const i=r.backgroundImage;i&&Bt.test(i)&&(fn(n,s,"background-image"),fn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function Kr(e){if(!e)return;const t=(n="")=>{if(typeof n!="string")return n;let a=n;return Bt.test(a)&&(a=a.replace(pd,"#000").replace(md,"#000").replace(fd,"#000").replace(yd,"#000")),a};e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&Bt.test(a)&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&Bt.test(a)&&n.setAttribute("style",t(a))})}const Qr="reservations.quote.sequence",Ti={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},Gr="https://help.artratio.sa/guide/quote-preview",De={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},vd=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],We=[...vd],qd=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function ws(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...We]}function Sd(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=ws(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=ws(t.value);if(a.length)return a}const n=We.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...We]}const Ed=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],Wr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(v(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>{if(e?.isPackage){const t=e?.packageCodeResolved||e?.barcode||"";return w(t||"-")}return w(e?.barcode||"-")}},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>w(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>w(v(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>w(v(Number(e?.price||0).toFixed(2)))}],Xr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(v(String(t+1)))},{id:"position",labelKey:"reservations.details.crew.position",fallback:"المنصب",render:e=>w(v(e?.positionLabel??e?.position_name??e?.role??o("reservations.crew.positionFallback","منصب بدون اسم")))},{id:"price",labelKey:"reservations.details.crew.clientPrice",fallback:"سعر العميل",render:e=>{const t=Number.isFinite(Number(e?.positionClientPrice))?Number(e.positionClientPrice):0;return w(`${v(t.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}}],As={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:Wr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:Xr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},Jr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(v(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>w(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>w(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>w(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Yr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(v(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>w(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>w(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>w(e?.note||"-")}],Zr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(v(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>w(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>w(v(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>w(v(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>w(e?.displayCost||"—")}],wd=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],Ad={customerInfo:As.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:As.payment,projectExpenses:Yr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:Jr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:Zr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},is=new Map;function Oa(e="reservation"){if(is.has(e))return is.get(e);const t=e==="project"?wd:Ed,n=e==="project"?Ad:As,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(d=>d.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return is.set(e,r),r}function Ha(e="reservation"){return Oa(e).sectionDefs}function eo(e="reservation"){return Oa(e).fieldDefs}function to(e="reservation"){return Oa(e).sectionIdSet}function no(e="reservation"){return Oa(e).fieldIdMap}function ao(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const xd="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",Id="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",_d="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",so=ud.trim(),io=/^data:image\/svg\+xml/i,kd=/\.svg($|[?#])/i,Nn=512,xs="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",ro=96,oo=25.4,Is=210,oa=297,ca=Math.round(Is/oo*ro),la=Math.round(oa/oo*ro),$d=2,co=/safari/i,Pd=/(iphone|ipad|ipod)/i,Ni=/(iphone|ipad|ipod)/i,Cd=/(crios|fxios|edgios|opios)/i,wa="[reservations/pdf]";let Y=null,N=null,yt=1,Cn=null,Ln=null,jt=null,yn=null,Bn=!1;function Zt(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!Y?.statusIndicator||!Y?.statusText)return;Y.statusKind=e;const r=t||ao(e);Y.statusText.textContent=r,Y.statusSpinner&&(Y.statusSpinner.hidden=!s),Y.statusAction&&(Y.statusAction.hidden=!0,Y.statusAction.onclick=null,n&&typeof a=="function"&&(Y.statusAction.textContent=n,Y.statusAction.hidden=!1,Y.statusAction.onclick=i=>{i.preventDefault(),a()})),Y.statusIndicator.hidden=!1,requestAnimationFrame(()=>{Y.statusIndicator.classList.add("is-visible")})}function rs(e){try{return String(e||"").toLowerCase().normalize("NFKD").replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,"").replace(/\s+/g," ").trim()}catch{return String(e||"").trim().toLowerCase()}}function Dn(e){!Y?.statusIndicator||!Y?.statusText||(Y.statusKind=null,Y.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{Y?.statusIndicator&&(Y.statusIndicator.hidden=!0,Y.statusAction&&(Y.statusAction.hidden=!0,Y.statusAction.onclick=null),Y.statusSpinner&&(Y.statusSpinner.hidden=!1))},220))}function _s(){return!!window?.bootstrap?.Modal}function Ld(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),jt||(jt=document.createElement("div"),jt.className="modal-backdrop fade show",jt.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(jt)),yn||(yn=t=>{t.key==="Escape"&&ks(e)},document.addEventListener("keydown",yn));try{e.focus({preventScroll:!0})}catch{}}}function ks(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),jt&&(jt.remove(),jt=null),yn&&(document.removeEventListener("keydown",yn),yn=null))}function Td(e){if(e){if(_s()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}Ld(e)}}function Nd(){if(Bn)return;Bn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!Y?.modal?.classList.contains("show"),s=()=>{Y?.modal?.classList.contains("show")&&(Zt("render"),Bn=!1,dn())};Gi({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:Gr}),a&&Zt("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function Va(e="reservation"){const t={},n=eo(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function ni(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function jd(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function ai(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function si(e="reservation"){return Object.fromEntries(Ha(e).map(({id:t})=>[t,!1]))}function ii(e,t){return e.sectionExpansions||(e.sectionExpansions=si(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Bd(e,t){return ii(e,t)?.[t]!==!1}function ri(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function Dd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Pd.test(e)}function Fd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=co.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function lo(){return Dd()&&Fd()}function Ua(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=Ni.test(e)||Ni.test(t),s=/Macintosh/i.test(e)&&n>1;return co.test(e)&&!Cd.test(e)&&(a||s)}function os(e,...t){try{console.log(`${wa} ${e}`,...t)}catch{}}function It(e,...t){try{console.warn(`${wa} ${e}`,...t)}catch{}}function Rd(e,t,...n){try{t?console.error(`${wa} ${e}`,t,...n):console.error(`${wa} ${e}`,...n)}catch{}}function Pe(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Md(e,t="لا توجد بيانات للعرض."){const n=w(o(e,t));return Pe(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Aa(e,t){return Array.isArray(e)&&e.length?e:[Md(t)]}const zd=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function uo(e=""){return zd.test(e)}function Od(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!uo(r))return a.call(this,r,...i);let c,d=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),d=!0)}catch{}try{if(!d){const l=this.canvas;l&&l.style?.direction!=="rtl"&&(l.__artRatioOriginalDirection=l.style.direction,l.style.direction="rtl")}return a.call(this,r,...i)}finally{if(d&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!d){const l=this.canvas;l&&l.__artRatioOriginalDirection!==void 0&&(l.style.direction=l.__artRatioOriginalDirection,delete l.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function ji(e,t=Nn){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Hd(e){if(!e)return{width:Nn,height:Nn};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?ji(t,0):0,s=n?ji(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,d]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(d)&&d>0?d:0)}}return{width:a||Nn,height:s||Nn}}function po(e=""){return typeof e!="string"?!1:io.test(e)||kd.test(e)}function Vd(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Ud(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function mo(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await Ud(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),d=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=d;const l=i.getContext("2d");return l.clearRect(0,0,c,d),l.drawImage(r,0,0,c,d),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function Kd(e){if(!e)return null;if(io.test(e))return Vd(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Qd(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!po(t))return!1;const n=await Kd(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",xs),!1;const a=await mo(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",xs),!1)}async function Gd(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Hd(e),s=await mo(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||xs),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),d=e.getAttribute("height");return c&&i.setAttribute("width",c),d&&i.setAttribute("height",d),e.parentNode?.replaceChild(i,e),!!s}async function fo(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{po(s.getAttribute?.("src"))&&a.push(Qd(s))}),n.forEach(s=>{a.push(Gd(s))}),a.length&&await Promise.allSettled(a)}function Wd(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(M,B=0)=>{const D=parseFloat(M);return Number.isFinite(D)?D:B},i=r(s.paddingTop),c=r(s.paddingBottom),d=r(s.paddingRight),l=r(s.paddingLeft),u=r(s.borderRadius),b=r(s.fontSize,14),y=(()=>{const M=s.lineHeight;if(!M||M==="normal")return b*1.6;const B=r(M,b*1.6);return B>0?B:b*1.6})(),p=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(p<=0)return null;const m=Math.max(1,p-l-d),g=e.textContent||"",h=g.split(/\r?\n/),_=n.createElement("canvas"),q=_.getContext("2d");if(!q)return null;const A=s.fontStyle||"normal",T=s.fontVariant||"normal",K=s.fontWeight||"400",S=s.fontFamily||"sans-serif",I=s.fontStretch||"normal",$=M=>M.join(" "),P=[],H=M=>q.measureText(M).width;q.font=`${A} ${T} ${K} ${I} ${b}px ${S}`,h.forEach(M=>{const B=M.trim();if(B.length===0){P.push("");return}const D=B.split(/\s+/);let O=[];D.forEach((J,re)=>{const se=J.trim();if(!se)return;const de=$(O.concat(se));if(H(de)<=m||O.length===0){O.push(se);return}P.push($(O)),O=[se]}),O.length&&P.push($(O))}),P.length||P.push("");const C=i+c+P.length*y,j=Math.ceil(Math.max(1,p)*t),W=Math.ceil(Math.max(1,C)*t);_.width=j,_.height=W,_.style.width=`${Math.max(1,p)}px`,_.style.height=`${Math.max(1,C)}px`,q.scale(t,t);const k=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){q.save(),q.beginPath();const M=Math.max(1,p),B=Math.max(1,C),D=Math.min(u,M/2,B/2);q.moveTo(D,0),q.lineTo(M-D,0),q.quadraticCurveTo(M,0,M,D),q.lineTo(M,B-D),q.quadraticCurveTo(M,B,M-D,B),q.lineTo(D,B),q.quadraticCurveTo(0,B,0,B-D),q.lineTo(0,D),q.quadraticCurveTo(0,0,D,0),q.closePath(),q.clip()}if(q.fillStyle=k,q.fillRect(0,0,Math.max(1,p),Math.max(1,C)),q.font=`${A} ${T} ${K} ${I} ${b}px ${S}`,q.fillStyle=s.color||"#000000",q.textBaseline="top",q.textAlign="right","direction"in q)try{q.direction="rtl"}catch{}const F=Math.max(0,p-d);let x=i;P.forEach(M=>{const B=M.length?M:" ";q.fillText(B,F,x,m),x+=y});const X=n.createElement("img");let Q;try{Q=_.toDataURL("image/png")}catch(M){return It("note canvas toDataURL failed",M),null}return X.src=Q,X.alt=g,X.style.width=`${Math.max(1,p)}px`,X.style.height=`${Math.max(1,C)}px`,X.style.display="block",X.setAttribute("data-quote-note-image","true"),{image:X,canvas:_,totalHeight:C,width:p}}function Xd(e,{pixelRatio:t=1}={}){if(!e||!Ua())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!uo(a.textContent||""))return;let s;try{s=Wd(a,{pixelRatio:t})}catch(r){It("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function $s(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){Rd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),d=o("reservations.quote.toast.retry","إعادة المحاولة"),l=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(Zt("export"),xo()):(Zt("render"),Bn=!1,dn())};if(Gi({message:i,duration:9e3,actionLabel:l?d:void 0,onAction:l?u:void 0,linkLabel:c,linkHref:Gr}),Y?.modal?.classList.contains("show")&&Zt("error",{message:i,actionLabel:l?d:void 0,onAction:l?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function Ps({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){It("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){It("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function oi(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function Bi(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function Di(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function Jd(){const e=Di();return e||(Ln||(Ln=oi(Id).catch(t=>{throw Ln=null,t}).then(()=>{const t=Di();if(!t)throw Ln=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Ln)}async function Yd(){const e=Bi();return e||(Cn||(Cn=oi(_d).catch(t=>{throw Cn=null,t}).then(()=>{const t=Bi();if(!t)throw Cn=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),Cn)}async function Zd(){if(window.html2pdf||await oi(xd),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}hd(),Od()}function w(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function eu(e="reservation"){return e==="project"?"QP":"Q"}function tu(e,t="reservation"){const n=Number(e),a=eu(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function nu(){const e=window.localStorage?.getItem?.(Qr),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function yo(e="reservation"){const n=nu()+1;return{sequence:n,quoteNumber:tu(n,e)}}function au(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(Qr,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function bo(e="reservation"){return Ti[e]||Ti.reservation}function su(e="reservation"){try{const t=bo(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function iu(e,t="reservation"){try{const n=bo(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function ru(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function ou(e,t="reservation"){if(!e)return null;const n=to(t),a=no(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,d])=>{const l=i[c];if(l==null)return;const{ids:u,emptyExplicitly:b}=ru(l);if(!u&&!b)return;const y=Array.isArray(u)?u.filter(p=>d.has(p)):[];(y.length>0||b)&&(r[c]=y)}),{version:1,sections:s,fields:r}}function go(e){if(!e)return;const t=e.context||"reservation",n=ou(e,t);n&&iu(n,t)}function ho(e){if(!e)return;const t=e.context||"reservation",n=su(t);if(!n)return;const a=to(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=ni(e.fields||Va(t)),i=no(t);Object.entries(n.fields).forEach(([c,d])=>{const l=i[c];if(!l)return;const u=Array.isArray(d)?d.filter(b=>l.has(b)):[];r[c]=new Set(u)}),e.fields=r}}function vo(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function cu(e){const t=gn()||[],{technicians:n=[]}=he(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(i=>{if(!i||i.id==null)return;const c=String(i.id),d=s.get(c)||{};s.set(c,{...d,...i})}),(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(i=>({technicianId:i}))).map((i,c)=>{const d=i?.technicianId!=null?s.get(String(i.technicianId)):null;let l=i.positionLabel??i.position_name??i.position_label??i.role??i.position??d?.role??o("reservations.crew.positionFallback","منصب بدون اسم");(!l||l.trim()==="")&&(l=i.positionLabelAr??i.position_label_ar??i.positionLabelEn??i.position_label_en??i.position_name_ar??i.position_name_en??d?.role??o("reservations.crew.positionFallback","منصب بدون اسم"));try{const y=typeof Tt=="function"?Tt()||[]:[];let p=null;if(i?.positionId!=null&&(p=y.find(m=>String(m?.id)===String(i.positionId))||null),!p){const m=i.positionKey??i.position_key??i.positionName??i.position_name??i.position??"";if(m&&(p=typeof ua=="function"&&ua(m)||null,!p&&y.length)){const g=String(m).trim().toLowerCase();p=y.find(h=>[h.name,h.labelAr,h.labelEn].filter(Boolean).map(_=>String(_).toLowerCase()).includes(g))||null}}if(p){const m=p.labelAr||p.labelEn||p.name||"";m&&m.trim()&&(l=m)}}catch{}const u=Se(je(i.positionCost??i.position_cost??i.cost??i.daily_wage??i.dailyWage??d?.dailyWage??d?.wage??0)),b=Se(je(i.positionClientPrice??i.position_client_price??i.client_price??i.clientPrice??i.daily_total??i.dailyTotal??i.total??d?.dailyTotal??d?.total??d?.total_wage??0));return{assignmentId:i.assignmentId??i.assignment_id??`crew-${c}`,positionId:i.positionId??i.position_id??null,positionLabel:l,positionLabelAlt:i.positionLabelAlt??i.position_label_alt??"",positionCost:u,positionClientPrice:b,technicianId:i.technicianId!=null?String(i.technicianId):d?.id!=null?String(d.id):null,technicianName:i.technicianName??i.technician_name??d?.name??null,technicianRole:i.technicianRole??d?.role??null}})}function lu(e,t,n){const{projectLinked:a}=zt(e,n);Ta(e.start,e.end);const s=e.discount??e.discountValue??0,r=Number(v(String(s)))||0,i=e.discountType??e.discount_type??"percent",c=String(i).toLowerCase()==="amount"?"amount":"percent",d=a?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),l=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,u=l!=null?je(l):Number.NaN,y=(e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied)===!0&&Number.isFinite(u)&&u>0?u:null,p=Array.isArray(t)?t.map(T=>T?.technicianId).filter(Boolean):[],m=ir({items:Array.isArray(e.items)?e.items:[],technicianIds:p,crewAssignments:Array.isArray(t)?t:[],discount:r,discountType:c,applyTax:d,start:e.start,end:e.end,companySharePercent:y}),g=je(e.cost??e.total??e.finalTotal),h=Number.isFinite(g),_=a?m.finalTotal:h?Se(g):m.finalTotal,q={equipmentTotal:m.equipmentTotal,crewTotal:m.crewTotal,crewCostTotal:m.crewCostTotal,discountAmount:m.discountAmount,subtotalAfterDiscount:m.subtotalAfterDiscount,taxableAmount:m.taxableAmount,taxAmount:m.taxAmount,finalTotal:_,companySharePercent:m.companySharePercent,companyShareAmount:m.companyShareAmount,netProfit:m.netProfit},A={equipmentTotal:v(m.equipmentTotal.toFixed(2)),crewTotal:v(m.crewTotal.toFixed(2)),discountAmount:v(m.discountAmount.toFixed(2)),subtotalAfterDiscount:v(m.subtotalAfterDiscount.toFixed(2)),taxableAmount:v(m.taxableAmount.toFixed(2)),taxAmount:v(m.taxAmount.toFixed(2)),finalTotal:v(_.toFixed(2)),companySharePercent:v((Number.isFinite(m.companySharePercent)?m.companySharePercent:0).toFixed(2)),companyShareAmount:v(m.companyShareAmount.toFixed(2)),netProfit:v(m.netProfit.toFixed(2))};return{totals:q,totalsDisplay:A,rentalDays:m.rentalDays}}function Sn(e){if(e==null||e==="")return null;const t=Number.parseFloat(v(String(e)));return Number.isFinite(t)?t:null}function qo(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function du(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=Sn(e.amount??(n==="amount"?e.value:null)),s=Sn(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=qo(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function uu(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(du).filter(Boolean);if(n.length>0)return n;const a=Sn(e.paidPercent??e.paid_percent),s=Sn(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=qo(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function pu(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function mu(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function fu(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function yu(e){const t=Number(e?.equipmentEstimate)||0,n=fu(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const d=Math.max(0,a-c),l=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,b=l&&s&&u>0?u:0,y=b>0?Number((d*(b/100)).toFixed(2)):0,p=d+y;let m=s?p*Or:0;(!Number.isFinite(m)||m<0)&&(m=0),m=Number(m.toFixed(2));let g=s?Number(e?.totalWithTax):p;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((p+m).toFixed(2))):g=p,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:d,companyShareAmount:y,subtotal:p,applyTax:s,taxAmount:m,totalWithTax:g}}function bu(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(v(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=r.length?r:Array.isArray(e.technicians)?e.technicians:[],c=Ms(t,a,s,!1,i,{start:e.start,end:e.end});if(Number.isFinite(c))return c;const d=Number(v(String(e.cost??0)));return Number.isFinite(d)?Math.round(d):0}function gu(e,t){if(!e)return"—";const n=Ze(e);return t?`${n} - ${Ze(t)}`:n}function le(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${v(a.toFixed(s))} ${t}`}function Fi(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${v(Number(e).toFixed(n))}%`}function hu(e){if(!e?.start)return null;if(!e?.end)return 1;const t=Ta(e.start,e.end);return Number.isFinite(t)?t:1}function vu(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${v(String(Math.round(e)))} أيام`:"غير محدد"}function qu(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=he(),i=e?.id!=null?s.find(L=>String(L.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:le(0,t),expensesTotal:le(0,t),reservationsTotal:le(0,t),discountAmount:le(0,t),taxAmount:le(0,t),overallTotal:le(0,t),paidAmount:le(0,t),remainingAmount:le(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:le(0,t),remainingAmountDisplay:le(0,t),paidPercentDisplay:Fi(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const d=i.clientId??i.customerId??i.client_id??i.customer_id??null,l=d!=null&&n.find(L=>String(L.id)===String(d))||null,u=l?.customerName??l?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),b=(i.clientCompany||l?.companyName||l?.company||"").trim(),y=l?.phone??l?.customerPhone??i.clientPhone??i.customerPhone??"",p=y?v(String(y).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),m=l?.email??i.clientEmail??i.customerEmail??"",g=m?String(m).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),h=i.projectCode||`PRJ-${v(String(i.id??""))}`,_=v(String(h)),q=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),A=pu(i.type),T=i.start?Ze(i.start):"—",K=i.end?Ze(i.end):"—",S=hu(i),I=S!=null?vu(S):"غير محدد",$=mu(i),P={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},H=o(`projects.status.${$}`,P[$]||$),C=i.id!=null?String(i.id):null,j=C?a.filter(L=>String(L.projectId)===C):[],k=j.map(L=>{const ce=L.reservationId||L.id||"",te=L.status||L.state||"pending",qe=String(te).toLowerCase(),be=o(`reservations.status.${qe}`,qe),Xe=bu(L),ct=L.start?new Date(L.start).getTime():0;return{reservationId:v(String(ce||"-")),status:qe,statusLabel:be,total:Xe,totalLabel:le(Xe,t),dateRange:gu(L.start,L.end),startTimestamp:Number.isNaN(ct)?0:ct}}).sort((L,ce)=>ce.startTimestamp-L.startTimestamp).map(({startTimestamp:L,...ce})=>ce).reduce((L,ce)=>L+(Number(ce.total)||0),0),F=new Map;j.forEach(L=>{const ce=Array.isArray(L.items)?L.items:[],te=Ta(L.start,L.end),qe=L.reservationId||L.id||"";ce.forEach((be,Xe)=>{if(!be)return;const ct=be.barcode||be.code||be.id||be.desc||be.description||`item-${Xe}`,Ke=String(ct||`item-${Xe}`),lt=F.get(Ke)||{description:be.desc||be.description||be.name||be.barcode||`#${v(String(Xe+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},$t=Number(be.qty)||1,kn=Number(be.price)||0;lt.totalQuantity+=$t,lt.reservationIds.add(String(qe));const He=kn*$t*Math.max(1,te);Number.isFinite(He)&&(lt.totalCost+=He),F.set(Ke,lt)})});const x=Array.from(F.values()).map(L=>({description:L.description,totalQuantity:L.totalQuantity,reservationsCount:L.reservationIds.size,displayCost:le(L.totalCost,t)})),X=new Map((r||[]).filter(Boolean).map(L=>[String(L.id),L])),Q=new Map,M=L=>{if(!L)return;let ce=null;typeof L=="object"?ce=L.id??L.technicianId??L.technician_id??L.userId??L.user_id??null:(typeof L=="string"||typeof L=="number")&&(ce=L);const te=ce!=null?String(ce):null,qe=te&&X.has(te)?X.get(te):typeof L=="object"?L:null,be=qe?.name||qe?.full_name||qe?.fullName||qe?.displayName||(typeof L=="string"?L:null),Xe=qe?.role||qe?.title||null,ct=qe?.phone||qe?.mobile||qe?.contact||null;if(!be&&!te)return;const Ke=te||be;Q.has(Ke)||Q.set(Ke,{id:te,name:be||"-",role:Xe||null,phone:ct||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(L=>M(L)),j.forEach(L=>{(Array.isArray(L.crewAssignments)&&L.crewAssignments.length?L.crewAssignments:Array.isArray(L.technicians)?L.technicians.map(te=>({technicianId:te})):[]).forEach(te=>M(te))});const B=Array.from(Q.values()),D=Array.isArray(i.expenses)?i.expenses.map(L=>{const ce=Number(L?.amount)||0;return{label:L?.label||L?.name||"-",amount:ce,displayAmount:le(ce,t),note:L?.note||L?.description||""}}):[],O=yu(i),J=O.applyTax?Number(((O.subtotal+k)*Or).toFixed(2)):0,re=Number((O.subtotal+k+J).toFixed(2)),se=uu(i),de=Sn(i.paidAmount??i.paid_amount)||0,V=Sn(i.paidPercent??i.paid_percent)||0,oe=zs({totalAmount:re,paidAmount:de,paidPercent:V,history:se}),we=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",Ee=Os({manualStatus:we,paidAmount:oe.paidAmount,paidPercent:oe.paidPercent,totalAmount:re}),Ce={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},G=o(`projects.paymentStatus.${Ee}`,Ce[Ee]||Ee),ee=Number(oe.paidAmount||0),ue=Number(oe.paidPercent||0),_e=Math.max(0,Number((re-ee).toFixed(2))),Fe={projectSubtotal:le(O.subtotal,t),expensesTotal:le(O.expensesTotal,t),reservationsTotal:le(k,t),discountAmount:le(O.discountAmount,t),taxAmount:le(J,t),overallTotal:le(re,t),paidAmount:le(ee,t),remainingAmount:le(_e,t)},pe={status:Ee,statusLabel:G,paidAmount:ee,paidPercent:ue,remainingAmount:_e,paidAmountDisplay:le(ee,t),remainingAmountDisplay:le(_e,t),paidPercentDisplay:Fi(ue)},U=(i.description||"").trim();return{project:i,customer:l,clientInfo:{name:u,company:b||"—",phone:p,email:g},projectInfo:{title:q,code:_,typeLabel:A,startDisplay:T,endDisplay:K,durationLabel:I,statusLabel:H},expenses:D,equipment:x,crew:B,totals:O,totalsDisplay:Fe,projectTotals:{combinedTaxAmount:J,overallTotal:re,reservationsTotal:k,paidAmount:ee,paidPercent:ue,remainingAmount:_e,paymentStatus:Ee},paymentSummary:pe,notes:U,currencyLabel:t,projectStatus:$,projectStatusLabel:H,projectDurationDays:S,projectDurationLabel:I,paymentHistory:se}}function Su({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:d={},currencyLabel:l="SR",sections:u,fieldSelections:b={},quoteNumber:y,quoteDate:p,terms:m=We}){const g=ni(b),h=(G,ee)=>ai(g,G,ee),_=G=>u?.has?.(G),q=`<div class="quote-placeholder">${w(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,A=(G,ee)=>`<div class="info-plain__item">
      <span class="info-plain__label">${w(G)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${w(ee)}</span>
    </div>`,T=(G,ee,{variant:ue="inline"}={})=>ue==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${w(G)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${w(ee)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${w(G)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${w(ee)}</span>
    </span>`,K=(G,ee)=>`<div class="payment-row">
      <span class="payment-row__label">${w(G)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${w(ee)}</span>
    </div>`,S=[];h("customerInfo","customerName")&&S.push(A(o("projects.details.client","العميل"),t.name||"-")),h("customerInfo","customerCompany")&&S.push(A(o("projects.details.company","شركة العميل"),t.company||"—")),h("customerInfo","customerPhone")&&S.push(A(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),h("customerInfo","customerEmail")&&S.push(A(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const I=_("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${w(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${S.length?`<div class="info-plain">${S.join("")}</div>`:q}
      </section>`:"",$=[];h("projectInfo","projectType")&&$.push(A(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),h("projectInfo","projectTitle")&&$.push(A(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),h("projectInfo","projectCode")&&$.push(A(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),h("projectInfo","projectStart")&&$.push(A(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),h("projectInfo","projectEnd")&&$.push(A(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),h("projectInfo","projectDuration")&&$.push(A(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),h("projectInfo","projectStatus")&&$.push(A(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const P=_("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${w(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${$.length?`<div class="info-plain">${$.join("")}</div>`:q}
      </section>`:"",H=Jr.filter(G=>h("projectCrew",G.id)),C=_("projectCrew")?H.length?`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${H.map(G=>`<th>${w(G.labelKey?o(G.labelKey,G.fallback):G.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((G,ee)=>`<tr>${H.map(ue=>`<td>${ue.render(G,ee)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(H.length,1)}" class="empty">${w(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${q}
          </section>`:"",j=[];h("financialSummary","projectSubtotal")&&j.push(T(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${le(0,l)}`)),h("financialSummary","expensesTotal")&&j.push(T(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||le(0,l))),h("financialSummary","reservationsTotal")&&j.push(T(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||le(0,l))),h("financialSummary","discountAmount")&&j.push(T(o("reservations.details.labels.discount","الخصم"),i.discountAmount||le(0,l))),h("financialSummary","taxAmount")&&j.push(T(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||le(0,l)));const W=[];h("financialSummary","overallTotal")&&W.push(T(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||le(0,l),{variant:"final"})),h("financialSummary","paidAmount")&&W.push(T(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||le(0,l),{variant:"final"})),h("financialSummary","remainingAmount")&&W.push(T(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||le(0,l),{variant:"final"}));const k=_("financialSummary")?!j.length&&!W.length?`<section class="quote-section quote-section--financial">${q}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${w(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${j.length?`<div class="totals-inline">${j.join("")}</div>`:""}
            ${W.length?`<div class="totals-final">${W.join("")}</div>`:""}
          </div>
        </section>`:"",F=Yr.filter(G=>h("projectExpenses",G.id)),x=_("projectExpenses")?F.length?`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${F.map(G=>`<th>${w(G.labelKey?o(G.labelKey,G.fallback):G.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((G,ee)=>`<tr>${F.map(ue=>`<td>${ue.render(G,ee)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(F.length,1)}" class="empty">${w(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${q}
          </section>`:"",X=Zr.filter(G=>h("projectEquipment",G.id)),Q=_("projectEquipment")?X.length?`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${X.map(G=>`<th>${w(G.labelKey?o(G.labelKey,G.fallback):G.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${r.length?r.map((G,ee)=>`<tr>${X.map(ue=>`<td>${ue.render(G,ee)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(X.length,1)}" class="empty">${w(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${q}
          </section>`:"",M=(e?.description||"").trim()||"",B=_("projectNotes")?`<section class="quote-section">
        <h3>${w(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${w(M||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",D=[];h("payment","beneficiary")&&D.push(K(o("reservations.quote.labels.beneficiary","اسم المستفيد"),De.beneficiaryName)),h("payment","bank")&&D.push(K(o("reservations.quote.labels.bank","اسم البنك"),De.bankName)),h("payment","account")&&D.push(K(o("reservations.quote.labels.account","رقم الحساب"),v(De.accountNumber))),h("payment","iban")&&D.push(K(o("reservations.quote.labels.iban","رقم الآيبان"),v(De.iban)));const O=`<section class="quote-section">
      <div class="payment-block">
        <h3>${w(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${D.length?D.join(""):q}</div>
      </div>
      <p class="quote-approval-note">${w(De.approvalNote)}</p>
    </section>`,J=Array.isArray(m)&&m.length?m:We,re=`<footer class="quote-footer">
        <h4>${w(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${J.map(G=>`<li>${w(G)}</li>`).join("")}</ul>
      </footer>`,se=[],de=[];if(P&&de.push({key:"project",html:P}),I&&de.push({key:"customer",html:I}),de.length>1){const G=de.find(_e=>_e.key==="project"),ee=de.find(_e=>_e.key==="customer"),ue=[];G?.html&&ue.push(G.html),ee?.html&&ue.push(ee.html),se.push(Pe(`<div class="quote-section-row quote-section-row--primary">${ue.join("")}</div>`,{blockType:"group"}))}else de.length===1&&se.push(Pe(de[0].html));const V=[];C&&V.push(Pe(C,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),x&&V.push(Pe(x,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),Q&&V.push(Pe(Q,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const oe=[];k&&oe.push(Pe(k,{blockType:"summary"})),B&&oe.push(Pe(B));const we=[Pe(O,{blockType:"payment"}),Pe(re,{blockType:"footer"})],Ee=[...Aa(se,"projects.quote.placeholder.primary"),...V,...Aa(oe,"projects.quote.placeholder.summary"),...we],Ce=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${w(De.logoUrl)}" alt="${w(De.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${w(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${w(De.companyName)}</p>
        <p class="quote-company-cr">${w(o("reservations.quote.labels.cr","السجل التجاري"))}: ${w(De.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${w(o("reservations.details.labels.reservationId","رقم العرض"))}</span>
          <strong>${w(y)}</strong>
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
          ${Ce}
          ${Ee.join("")}
        </div>
      </div>
    </div>
  `}function So(e){if(e?.context==="project")return Su(e);const{reservation:t,customer:n,project:a,crewAssignments:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:d,sections:l,fieldSelections:u={},quoteNumber:b,quoteDate:y,terms:p=We}=e,m=v(String(t?.reservationId??t?.id??"")),g=t.start?v(Ze(t.start)):"-",h=t.end?v(Ze(t.end)):"-",_=n?.customerName||n?.full_name||n?.name||"-",q=n?.phone||"-",A=n?.email||"-",T=n?.company||n?.company_name||"-",K=v(q),S=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),I=a?.code||a?.projectCode||"",$=v(String(c)),P=t?.notes||"",H=Array.isArray(p)&&p.length?p:We,C=ni(u),j=(z,Le)=>ai(C,z,Le),W=z=>l?.has?.(z),k=`<div class="quote-placeholder">${w(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,F=(z,Le)=>`<div class="info-plain__item">${w(z)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${w(Le)}</strong></div>`,x=(z,Le,{variant:dt="inline"}={})=>dt==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${w(z)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${w(Le)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${w(z)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${w(Le)}</span>
    </span>`,X=(z,Le)=>`<div class="payment-row">
      <span class="payment-row__label">${w(z)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${w(Le)}</span>
    </div>`,Q=[];j("customerInfo","customerName")&&Q.push(F(o("reservations.details.labels.customer","العميل"),_)),j("customerInfo","customerCompany")&&Q.push(F(o("reservations.details.labels.company","الشركة"),T)),j("customerInfo","customerPhone")&&Q.push(F(o("reservations.details.labels.phone","الهاتف"),K)),j("customerInfo","customerEmail")&&Q.push(F(o("reservations.details.labels.email","البريد"),A));const M=W("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${Q.length?`<div class="info-plain">${Q.join("")}</div>`:k}
      </section>`:"",B=[];j("reservationInfo","reservationId")&&B.push(F(o("reservations.details.labels.reservationId","رقم الحجز"),m||"-")),j("reservationInfo","reservationStart")&&B.push(F(o("reservations.details.labels.start","بداية الحجز"),g)),j("reservationInfo","reservationEnd")&&B.push(F(o("reservations.details.labels.end","نهاية الحجز"),h)),j("reservationInfo","reservationDuration")&&B.push(F(o("reservations.details.labels.duration","عدد الأيام"),$));const D=W("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${B.length?`<div class="info-plain">${B.join("")}</div>`:k}
      </section>`:"",O=[];j("projectInfo","projectTitle")&&O.push(F(o("reservations.details.labels.project","المشروع"),S)),j("projectInfo","projectCode")&&O.push(F(o("reservations.details.labels.code","الرمز"),I||"-"));const J=W("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${O.length?`<div class="info-plain">${O.join("")}</div>`:k}
      </section>`:"",re=[];j("financialSummary","equipmentTotal")&&re.push(x(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${d}`)),j("financialSummary","crewTotal")&&re.push(x(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${d}`)),j("financialSummary","discountAmount")&&re.push(x(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${d}`)),j("financialSummary","taxAmount")&&re.push(x(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${d}`));const se=j("financialSummary","finalTotal"),de=[];se&&de.push(x(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${d}`,{variant:"final"}));const V=de.length?`<div class="totals-final">${de.join("")}</div>`:"",oe=W("financialSummary")?!re.length&&!se?`<section class="quote-section quote-section--financial">${k}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${w(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${re.length?`<div class="totals-inline">${re.join("")}</div>`:""}
            ${V}
          </div>
        </section>`:"",{groups:we}=sr(t),Ee=we.map(z=>{const Le=Number(z?.count??z?.quantity??1)||1,dt=Number(z?.unitPrice);let qt=Number.isFinite(dt)?dt:0;if(!qt||qt<=0){const Ne=Number(z?.totalPrice);Number.isFinite(Ne)&&Le>0&&(qt=Number((Ne/Le).toFixed(2)))}Number.isFinite(qt)||(qt=0);const Wn=z?.type==="package"||Array.isArray(z?.items)&&z.items.some(Ne=>Ne?.type==="package"),Xn=Array.isArray(z?.barcodes)&&z.barcodes.length?z.barcodes[0]:Array.isArray(z?.items)&&z.items.length?z.items[0]?.barcode:null;let ut=z?.packageDisplayCode??z?.package_code??z?.code??z?.packageCode??(Array.isArray(z?.items)&&z.items.length?z.items[0]?.package_code??z.items[0]?.code??z.items[0]?.packageCode:null);const Jn=Ne=>{const Ve=(Ne==null?"":String(Ne)).trim();return!!(!Ve||/^pkg-/i.test(Ve)||/^\d+$/.test(Ve)&&Ve.length<=4)};if(!ut||Jn(ut)){const Ne=z?.packageId??z?.package_id??(Array.isArray(z?.items)&&z.items.length?z.items[0]?.packageId??z.items[0]?.package_id:null);if(Ne)try{const Ve=Yi(Ne);Ve&&Ve.package_code&&(ut=Ve.package_code)}catch{}}if(!ut||Jn(ut))try{const Ne=rs(z?.description||"");if(Ne){const Ve=zc();let Ut=Ve.find(St=>rs(St?.name||St?.title||St?.label||"")===Ne);Ut||(Ut=Ve.find(St=>{const Zn=rs(St?.name||St?.title||St?.label||"");return Zn.includes(Ne)||Ne.includes(Zn)})),Ut&&Ut.package_code&&(ut=Ut.package_code)}}catch{}const Yn=Wn?ut??Xn??"":z?.barcode??Xn??"",Xa=Yn!=null?String(Yn):"";let un=Number.isFinite(Number(z?.totalPrice))?Number(z.totalPrice):Number((qt*Le).toFixed(2));return un=Se(un),{...z,isPackage:Wn,desc:z?.description,barcode:Xa,packageCodeResolved:ut||"",qty:Le,price:un,totalPrice:un,unitPriceValue:qt}}),Ce=Wr.filter(z=>j("items",z.id)),G=Ce.length>0,ee=G?Ce.map(z=>`<th>${w(z.labelKey?o(z.labelKey,z.fallback):z.fallback)}</th>`).join(""):"",_e=Ee.length>0?Ee.map((z,Le)=>`<tr>${Ce.map(dt=>`<td>${dt.render(z,Le)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Ce.length,1)}" class="empty">${w(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,Fe=W("items")?G?`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${ee}</tr>
              </thead>
              <tbody>${_e}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.items.title","المعدات"))}</h3>
            ${k}
          </section>`:"",pe=Xr.filter(z=>j("crew",z.id)),U=pe.length>0,ve=U?pe.map(z=>`<th>${w(z.labelKey?o(z.labelKey,z.fallback):z.fallback)}</th>`).join(""):"",L=Array.isArray(s)?s:[],ce=L.length?L.map((z,Le)=>`<tr>${pe.map(dt=>`<td>${dt.render(z,Le)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(pe.length,1)}" class="empty">${w(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,te=W("crew")?U?`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${ve}</tr>
              </thead>
              <tbody>${ce}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${k}
          </section>`:"",qe=W("notes")?`<section class="quote-section">
        <h3>${w(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${w(P||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",be=[];j("payment","beneficiary")&&be.push(X(o("reservations.quote.labels.beneficiary","اسم المستفيد"),De.beneficiaryName)),j("payment","bank")&&be.push(X(o("reservations.quote.labels.bank","اسم البنك"),De.bankName)),j("payment","account")&&be.push(X(o("reservations.quote.labels.account","رقم الحساب"),v(De.accountNumber))),j("payment","iban")&&be.push(X(o("reservations.quote.labels.iban","رقم الآيبان"),v(De.iban)));const Xe=`<section class="quote-section">
      <div class="payment-block">
        <h3>${w(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${be.length?be.join(""):k}</div>
      </div>
      <p class="quote-approval-note">${w(De.approvalNote)}</p>
    </section>`,ct=`<footer class="quote-footer">
        <h4>${w(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${H.map(z=>`<li>${w(z)}</li>`).join("")}</ul>
      </footer>`,Ke=[];M&&D?Ke.push(Pe(`<div class="quote-section-row">${M}${D}</div>`,{blockType:"group"})):(D&&Ke.push(Pe(D)),M&&Ke.push(Pe(M))),J&&Ke.push(Pe(J));const lt=[];Fe&&lt.push(Pe(Fe,{blockType:"table",extraAttributes:'data-table-id="items"'})),te&&lt.push(Pe(te,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const $t=[];oe&&$t.push(Pe(oe,{blockType:"summary"})),qe&&$t.push(Pe(qe));const kn=[Pe(Xe,{blockType:"payment"}),Pe(ct,{blockType:"footer"})],He=[...Aa(Ke,"reservations.quote.placeholder.page1"),...lt,...Aa($t,"reservations.quote.placeholder.page2"),...kn],Wa=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${w(De.logoUrl)}" alt="${w(De.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${w(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${w(De.companyName)}</p>
        <p class="quote-company-cr">${w(o("reservations.quote.labels.cr","السجل التجاري"))}: ${w(De.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${w(b)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${w(y)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${so}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Wa}
          ${He.join("")}
        </div>
      </div>
    </div>
  `}async function Eu(){try{const e=he();if((Array.isArray(e?.packages)?e.packages:[]).length>0)return;const n=await ot("/packages/?all=1"),a=Array.isArray(n?.data)?n.data:Array.isArray(n)?n:[];a.length&&($a({packages:a}),document.dispatchEvent?.(new CustomEvent("packages:changed",{detail:{packages:a}})))}catch{}}function wu(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function zn(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>wu(c)),i=[s,...r].map(c=>c.catch(d=>(It("asset load failed",d),Nd(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function Eo(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await fo(r),await zn(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let d=null,l=null;const u=S=>{S.style.margin="0 auto",S.style.breakInside="avoid",S.style.pageBreakInside="avoid",S.style.pageBreakAfter="auto",S.style.breakAfter="auto"},b=()=>{const S=a.createElement("div"),I=s.childElementCount===0;if(S.className="quote-page",S.dataset.pageIndex=String(s.childElementCount),I){S.classList.add("quote-page--primary");const P=i.cloneNode(!0);P.removeAttribute("data-quote-header-template"),S.appendChild(P)}else S.classList.add("quote-page--continuation");const $=a.createElement("main");$.className="quote-body",S.appendChild($),s.appendChild(S),u(S),d=S,l=$},y=()=>{(!d||!l||!l.isConnected)&&b()},p=()=>{if(!d||!l||l.childElementCount>0)return;const S=d;d=null,l=null,S.parentNode&&S.parentNode.removeChild(S)},m=()=>{d=null,l=null},g=()=>d?d.scrollHeight-d.clientHeight>$d:!1,h=(S,{allowOverflow:I=!1}={})=>(y(),l.appendChild(S),g()&&!I?(l.removeChild(S),p(),!1):!0),_=S=>{const I=S.cloneNode(!0);I.removeAttribute?.("data-quote-block"),I.removeAttribute?.("data-block-type"),I.removeAttribute?.("data-table-id"),!h(I)&&(m(),!h(I)&&h(I,{allowOverflow:!0}))},q=S=>{const I=S.querySelector("table");if(!I){_(S);return}const $=S.querySelector("h3"),P=I.querySelector("thead"),H=Array.from(I.querySelectorAll("tbody tr"));if(!H.length){_(S);return}let C=null,j=0;const W=(F=!1)=>{const x=S.cloneNode(!1);x.removeAttribute("data-quote-block"),x.removeAttribute("data-block-type"),x.removeAttribute("data-table-id"),x.classList.add("quote-section--table-fragment"),F&&x.classList.add("quote-section--table-fragment--continued");const X=$?$.cloneNode(!0):null;X&&x.appendChild(X);const Q=I.cloneNode(!1);Q.classList.add("quote-table--fragment"),P&&Q.appendChild(P.cloneNode(!0));const M=a.createElement("tbody");return Q.appendChild(M),x.appendChild(Q),{section:x,body:M}},k=(F=!1)=>C||(C=W(F),h(C.section)||(m(),h(C.section)||h(C.section,{allowOverflow:!0})),C);H.forEach(F=>{k(j>0);const x=F.cloneNode(!0);if(C.body.appendChild(x),g()&&(C.body.removeChild(x),C.body.childElementCount||(l.removeChild(C.section),C=null,p()),m(),C=null,k(j>0),C.body.appendChild(x),g())){C.section.classList.add("quote-section--table-fragment--overflow"),j+=1;return}j+=1}),C=null};if(!c.length)return;c.forEach(S=>{S.getAttribute("data-block-type")==="table"?q(S):_(S)});const A=Array.from(s.children),T=[];if(A.forEach((S,I)=>{const $=S.querySelector(".quote-body");if(I!==0&&(!$||$.childElementCount===0)){S.remove();return}T.push(S)}),!n){const S=a.defaultView||window,I=Math.min(3,Math.max(1,S.devicePixelRatio||1)),$=Ua()?Math.min(2,I):I;T.forEach(P=>Xd(P,{pixelRatio:$}))}T.forEach((S,I)=>{const $=I===0;S.style.pageBreakAfter="auto",S.style.breakAfter="auto",S.style.pageBreakBefore=$?"auto":"always",S.style.breakBefore=$?"auto":"page",n?S.style.boxShadow="":S.style.boxShadow="none"});const K=T[T.length-1]||null;d=K,l=K?.querySelector(".quote-body")||null,await zn(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function ci(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function Au(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([Yd(),Jd()]),c=e.ownerDocument||document,d=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,d,c?.documentElement?.getAttribute?.("dir")].some(S=>typeof S=="string"&&S.toLowerCase().startsWith("rtl")),b=typeof window<"u"&&window.devicePixelRatio||1,y=ri(),p=lo(),m=Ua();let g;m?g=1.5:p?g=Math.min(1.7,Math.max(1.2,b*1.1)):y?g=Math.min(1.8,Math.max(1.25,b*1.2)):g=Math.min(2,Math.max(1.6,b*1.4));const h=m||p?.9:y?.92:.95,_=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),q={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let A=0;const T=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let S=0;S<s.length;S+=1){const I=s[S];await fo(I),await zn(I);const $=I.ownerDocument||document,P=$.createElement("div");Object.assign(P.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const H=I.cloneNode(!0);H.style.width=`${ca}px`,H.style.maxWidth=`${ca}px`,H.style.minWidth=`${ca}px`,H.style.height=`${la}px`,H.style.maxHeight=`${la}px`,H.style.minHeight=`${la}px`,H.style.position="relative",H.style.background="#ffffff",ci(H),P.appendChild(H),$.body.appendChild(P);let C;try{await zn(H),C=await i(H,{...q,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(M){throw $s(M,"pageCapture",{toastMessage:T}),M}finally{P.parentNode?.removeChild(P)}if(!C)continue;const j=C.width||1,k=(C.height||1)/j;let F=Is,x=F*k,X=0;if(x>oa){const M=oa/x;x=oa,F=F*M,X=Math.max(0,(Is-F)/2)}const Q=C.toDataURL("image/jpeg",h);A>0&&_.addPage(),_.addImage(Q,"JPEG",X,0,F,x,`page-${A+1}`,"FAST"),A+=1,await new Promise(M=>window.requestAnimationFrame(M))}}catch(S){throw Ps({safariWindowRef:n,mobileWindowRef:a}),S}if(A===0)throw Ps({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(p||m){const S=_.output("blob");if(m){const I=URL.createObjectURL(S);Dn();try{window.location.assign(I)}catch($){It("mobile safari blob navigation failed",$)}finally{setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{const I=URL.createObjectURL(S),$=()=>p&&n&&!n.closed?n:a&&!a.closed?a:null,P=(C,j)=>{if(Dn(),!C){window.location.assign(j);return}try{C.location.replace(j),C.focus?.()}catch(W){It("direct blob navigation failed",W);try{C.document.open(),C.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${w(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${j}" title="PDF preview"></iframe></body></html>`),C.document.close()}catch(k){It("iframe blob delivery failed",k),window.location.assign(j)}}},H=$();P(H,I),setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{Dn();const S=_.output("bloburl"),I=document.createElement("a");I.href=S,I.download=t,I.rel="noopener",I.style.display="none",document.body.appendChild(I),I.click(),setTimeout(()=>{URL.revokeObjectURL(S),I.remove()},2e3)}}function dn(){if(!N||!Y)return;const{previewFrame:e}=Y;if(!e)return;const t=N.context||"reservation",n=So({context:t,reservation:N.reservation,customer:N.customer,project:N.project,crewAssignments:N.crewAssignments,totals:N.totals,totalsDisplay:N.totalsDisplay,rentalDays:N.rentalDays,currencyLabel:N.currencyLabel,sections:N.sections,fieldSelections:N.fields,quoteNumber:N.quoteNumber,quoteDate:N.quoteDateLabel,terms:N.terms,projectCrew:N.projectCrew,projectExpenses:N.projectExpenses,projectEquipment:N.projectEquipment,projectInfo:N.projectInfo,clientInfo:N.clientInfo,paymentSummary:N.paymentSummary,projectTotals:N.projectTotals});Zt("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&(Kr(r),Vr(r,s),Ur(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await Eo(i,{context:"preview"}),ci(i))}catch(p){console.error("[reservations/pdf] failed to layout preview document",p)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),d=a?.querySelector(".quote-preview-pages"),l=ca;let u=18;if(d&&a?.defaultView){const p=a.defaultView.getComputedStyle(d),m=parseFloat(p.rowGap||p.gap||`${u}`);Number.isFinite(m)&&m>=0&&(u=m)}const b=la,y=c.length?c.length*b+Math.max(0,(c.length-1)*u):b;if(e.dataset.baseWidth=String(l),e.dataset.baseHeight=String(y),e.style.width=`${l}px`,e.style.minWidth=`${l}px`,e.style.height=`${y}px`,e.style.minHeight=`${y}px`,Y?.previewFrameWrapper&&!Y?.userAdjustedZoom){const p=Y.previewFrameWrapper.clientWidth-24;p>0&&p<l?yt=Math.max(p/l,.3):yt=1}Ao(yt)}finally{Dn()}},{once:!0})}function xu(e){if(!N)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?N.sections.add(n):N.sections.delete(n),go(N),wo(),dn())}function Iu(e){if(!N)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=N.context||"reservation",r=N.fields||(N.fields=Va(s)),i=jd(r,n);t.checked?i.add(a):i.delete(a),go(N),dn()}function _u(e){if(!N)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(ii(N,n),N.sectionExpansions[n]=t.open)}function wo(){if(!Y?.toggles||!N)return;const{toggles:e}=Y,t=N.fields||{},n=N.context||"reservation";ii(N);const a=Ha(n),s=eo(n),r=a.map(({id:i,labelKey:c,fallback:d})=>{const l=o(c,d),u=N.sections.has(i),b=s[i]||[],y=Bd(N,i),p=b.length?`<div class="quote-toggle-sublist">
          ${b.map(m=>{const g=ai(t,i,m.id),h=u?"":"disabled",_=m.labelKey?o(m.labelKey,m.fallback):m.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${m.id}" ${g?"checked":""} ${h}>
                <span>${w(_)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${i}" ${y?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${i}" ${u?"checked":""}>
            <span>${w(l)}</span>
          </label>
          ${b.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${p}
      </details>
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",xu)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",Iu)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",_u)})}function ku(){if(Y?.modal)return Y;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
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
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),r=e.querySelector("[data-quote-terms-reset]"),i=e.querySelector("[data-quote-download]"),c=e.querySelector(".modal-header"),d=c?.querySelector(".btn-close"),l=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",c&&c.insertBefore(u,d||null);const b=document.createElement("iframe");b.className="quote-preview-frame",b.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),b.setAttribute("loading","lazy"),b.setAttribute("frameborder","0");const y=document.createElement("div");y.className="quote-preview-zoom-controls",y.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${w(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${w(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${w(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const p=document.createElement("div");p.className="quote-preview-frame-wrapper",p.appendChild(b),n.innerHTML="";const m=document.createElement("div");m.className="quote-preview-scroll",m.appendChild(p),n.appendChild(m);const g=document.createElement("div");g.className="quote-preview-status",g.setAttribute("role","status"),g.setAttribute("aria-live","polite"),g.hidden=!0,g.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${w(ao("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(y),i?.addEventListener("click",async()=>{if(N){i.disabled=!0;try{await xo()}finally{i.disabled=!1}}});const h=()=>{_s()||ks(e)};l.forEach(T=>{T?.addEventListener("click",h)}),d&&!l.includes(d)&&d.addEventListener("click",h),e.addEventListener("click",T=>{_s()||T.target===e&&ks(e)}),Y={modal:e,toggles:t,preview:n,previewScroll:m,previewFrameWrapper:p,zoomControls:y,zoomValue:y.querySelector("[data-zoom-value]"),previewFrame:b,meta:a,downloadBtn:i,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const _=y.querySelector("[data-zoom-out]"),q=y.querySelector("[data-zoom-in]"),A=y.querySelector("[data-zoom-reset]");return _?.addEventListener("click",()=>Ri(-.1)),q?.addEventListener("click",()=>Ri(.1)),A?.addEventListener("click",()=>xa(1,{markManual:!0})),s&&s.addEventListener("input",Pu),r&&r.addEventListener("click",Cu),xa(yt),Y}function xa(e,{silent:t=!1,markManual:n=!1}={}){yt=Math.min(Math.max(e,.25),2.2),n&&Y&&(Y.userAdjustedZoom=!0),Ao(yt),!t&&Y?.zoomValue&&(Y.zoomValue.textContent=`${Math.round(yt*100)}%`)}function Ri(e){xa(yt+e,{markManual:!0})}function Ao(e){if(!Y?.previewFrame||!Y.previewFrameWrapper)return;const t=Y.previewFrame,n=Y.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",ri()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function $u(){if(!Y?.meta||!N)return;const{meta:e}=Y;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${w(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${w(N.quoteNumber)}</strong></div>
      <div><span>${w(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${w(N.quoteDateLabel)}</strong></div>
    </div>
  `}function li(){if(!Y?.termsInput)return;const e=(N?.terms&&N.terms.length?N.terms:We).join(`
`);Y.termsInput.value!==e&&(Y.termsInput.value=e)}function Pu(e){if(!N)return;const t=ws(e?.target?.value??"");if(t.length){N.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{N.terms=[...We],li();const n=We.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}dn()}function Cu(e){if(e?.preventDefault?.(),!N)return;N.terms=[...We];const t=document.getElementById("reservation-terms");t&&(t.value=We.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=We.join(`
`)),li(),dn()}async function xo(){if(!N)return;Zt("export");const t=!ri()&&lo(),n=Ua(),a=null,s=!n&&t?window.open("","_blank"):null;(d=>{if(d)try{d.document.open(),d.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${w(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${w(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${w(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),d.document.close()}catch(l){It("failed to prime download window",l)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await Zd(),os("html2pdf ensured");const d=N.context||"reservation",l=So({context:d,reservation:N.reservation,customer:N.customer,project:N.project,crewAssignments:N.crewAssignments,totals:N.totals,totalsDisplay:N.totalsDisplay,rentalDays:N.rentalDays,currencyLabel:N.currencyLabel,sections:N.sections,fieldSelections:N.fields,quoteNumber:N.quoteNumber,quoteDate:N.quoteDateLabel,terms:N.terms,projectCrew:N.projectCrew,projectExpenses:N.projectExpenses,projectEquipment:N.projectEquipment,projectInfo:N.projectInfo,clientInfo:N.clientInfo,paymentSummary:N.paymentSummary,projectTotals:N.projectTotals});i=document.createElement("div"),i.innerHTML=l,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),Kr(i),Vr(i),Ur(i),os("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await Eo(u,{context:"export"}),await zn(u),ci(u),os("layout complete for export document")}catch(y){$s(y,"layoutQuoteDocument",{suppressToast:!0})}}const b=`quotation-${N.quoteNumber}.pdf`;await Au(u,{filename:b,safariWindowRef:s,mobileWindowRef:a}),N.sequenceCommitted||(au(N.quoteSequence),N.sequenceCommitted=!0)}catch(d){Ps({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,$s(d,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),Dn()}}function Io(){const e=ku();e?.modal&&(Bn=!1,yt=1,Y&&(Y.userAdjustedZoom=!1),xa(yt,{silent:!0}),wo(),$u(),li(),dn(),Td(e.modal))}async function Lu({reservation:e,customer:t,project:n}){if(!e){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}await Eu();const a=cu(e),{totalsDisplay:s,totals:r,rentalDays:i}=lu(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:d,quoteNumber:l}=yo("reservation"),u=new Date,b=Sd();N={context:"reservation",reservation:e,customer:t,project:n,crewAssignments:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(Ha("reservation").filter(y=>y.defaultSelected).map(y=>y.id)),sectionExpansions:si("reservation"),fields:Va("reservation"),terms:b,quoteSequence:d,quoteNumber:l,quoteDate:u,quoteDateLabel:vo(u),sequenceCommitted:!1},ho(N),Io()}async function Dp({project:e}){if(!e){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=qu(e),{project:n}=t;if(!n){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=yo("project"),r=new Date,i=[...qd];N={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(Ha("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:si("project"),fields:Va("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:vo(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},ho(N),Io()}function Tu({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=gn(),{reservations:r=[],customers:i=[],technicians:c=[],projects:d=[]}=he(),l=r.map(q=>{const A=ds(q);return{...A,id:q.id??A.id,reservationId:q.reservationId??q.reservation_id??A.reservationId,reservationCode:q.reservationCode??q.reservation_code??A.reservationCode}}),u=l,b=Array.isArray(s)?s:c||[],y=new Map((d||[]).map(q=>[String(q.id),q])),p=document.getElementById(e);if(!p){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!u||u.length===0){p.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const m=t||id(),g=new Map(i.map(q=>[String(q.id),q])),h=new Map(b.map(q=>[String(q.id),q])),_=ld({reservations:l,filters:m,customersMap:g,techniciansMap:h,projectsMap:y});if(_.length===0){p.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}p.innerHTML=`<div class="reservations-grid">${dd({entries:_,customersMap:g,techniciansMap:h,projectsMap:y})}</div>`,p.querySelectorAll('[data-action="details"]').forEach(q=>{const A=Number(q.dataset.reservationIndex);Number.isNaN(A)||q.addEventListener("click",()=>{typeof n=="function"&&n(A)})}),p.querySelectorAll('button[data-action="confirm"]').forEach(q=>{const A=Number(q.dataset.reservationIndex);Number.isNaN(A)||q.addEventListener("click",T=>{T.stopPropagation(),typeof a=="function"&&a(A,T)})})}function Nu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=he(),c=s.map(g=>{const h=ds(g);return{...h,id:g.id??h.id,reservationId:g.reservationId??g.reservation_id??h.reservationId,reservationCode:g.reservationCode??g.reservation_code??h.reservationCode}}),d=s[e];if(!d)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const l=c[e]??ds(d),u=r.find(g=>String(g.id)===String(d.customerId)),b=d.projectId?i.find(g=>String(g.id)===String(d.projectId)):null,y=document.getElementById("reservation-details-body"),p=document.getElementById("reservationDetailsModal"),m=()=>{const g=()=>{p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(p)?.hide()},h=document.getElementById("reservation-details-edit-btn");h&&(h.onclick=()=>{g(),typeof t=="function"&&t(e,{reservation:d,customer:u,getEditContext:a})});const _=document.getElementById("reservation-details-delete-btn");_&&(_.onclick=()=>{g(),typeof n=="function"&&n(e,{reservation:d,customer:u})});const q=y?.querySelector('[data-action="open-project"]');q&&b&&q.addEventListener("click",()=>{g();const T=b?.id!=null?String(b.id):"",K=T?`projects.html?project=${encodeURIComponent(T)}`:"projects.html";window.location.href=K});const A=document.getElementById("reservation-details-export-btn");A&&(A.onclick=async T=>{T?.preventDefault?.(),T?.stopPropagation?.(),A.blur();try{await Lu({reservation:d,customer:u,project:b})}catch(K){console.error("❌ [reservations] export to PDF failed",K),E(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}})};if(y){const g=gn()||[];y.innerHTML=Li(l,u,g,e,b),m(),rr().then(()=>{const h=gn()||[];y.innerHTML=Li(l,u,h,e,b),m()}).catch(()=>{})}return p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(p).show(),!0}function _o(){const e=()=>{xn(),Oe(),gn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let Mi=!1,zi=null;function ju(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function Fp(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=ju(n);if(!a&&Mi&&Yt().length>0&&s===zi)return Yt();try{const r=await or(n||{});return Mi=!0,zi=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return Yt()}}async function Bu(e,{onAfterChange:t}={}){if(!sn())return Hn(),!1;const a=Yt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await Oc(s),_o(),t?.({type:"deleted",reservation:a}),E(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=La(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return E(i,"error"),!1}}async function Du(e,{onAfterChange:t}={}){const a=Yt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=zt(a);if(r)return E(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await Hc(s);return _o(),t?.({type:"confirmed",reservation:i}),E(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=La(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return E(c,"error"),!1}}function _n(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Rn(e,n),end:Rn(t,a)}}function Ia(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function di(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function ko(){const{container:e,select:t,hint:n,addButton:a}=di();if(!t)return;const s=t.value,r=Wi(),i=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,d=r.map(u=>{const b=Number.isFinite(Number(u.price))?Number(u.price):0,y=v(b.toFixed(2)),p=`${u.name} — ${y} ${i}`;return`<option value="${Ia(u.id)}">${Ia(p)}</option>`}).join("");t.innerHTML=`${c}${d}`;const l=r.length>0;t.disabled=!l,a&&(a.disabled=!l),e&&(e.hidden=!l,e.setAttribute("aria-hidden",l?"false":"true")),n&&(l?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),l&&s&&r.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function Fu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=Ht(),{start:r,end:i}=_n(),{reservations:c=[]}=he(),d=a!=null&&c[a]||null,l=d?.id??d?.reservationId??null,u=Br(n,{existingItems:s,start:r,end:i,ignoreReservationId:l});if(!u.success)return t||E(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const b=[...s,u.package];return Vt(a,b),Ot(b),tt(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function Oi(){const{select:e}=di();if(!e)return;const t=e.value||"";Fu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function Ru(){const{addButton:e,select:t}=di();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{Oi()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Oi())}),t.dataset.listenerAttached="true"),ko()}function Ot(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,Vi(t);return}const d=En(e);t.innerHTML=d.map(l=>{const u=l.items[0]||{},b=on(u)||l.image,y=b?`<img src="${b}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',p=l.items.some(C=>C?.type==="package"),m=v(String(l.count)),g=je(l.unitPrice),h=Number.isFinite(g)?Se(g):0,_=je(l.totalPrice),q=Number.isFinite(_)?_:h*(Number.isFinite(l.count)?l.count:1),A=Se(q),T=`${v(h.toFixed(2))} ${a}`,K=`${v(A.toFixed(2))} ${a}`,S=l.barcodes.map(C=>v(String(C||""))).filter(Boolean),I=S.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${S.map(C=>`<li>${C}</li>`).join("")}
            </ul>
          </details>`:"";let $="";if(p){const C=new Map,j=k=>{const F=Number.parseFloat(v(String(k??"")).replace(/[^0-9.]/g,""));return!Number.isFinite(F)||F<=0||F>99?1:Math.round(F)},W=[];if(Array.isArray(l.packageItems)&&l.packageItems.length&&W.push(...l.packageItems),l.items.forEach(k=>{Array.isArray(k?.packageItems)&&W.push(...k.packageItems)}),W.forEach(k=>{if(!k)return;const F=ae(k.barcode||k.normalizedBarcode||k.desc||Math.random());if(!F)return;const x=C.get(F),X=j(k.qtyPerPackage??k.perPackageQty??k.quantityPerPackage??k.qty??k.quantity??1),Q=Math.max(1,Math.min(X,99));if(x){x.qty=Q;return}C.set(F,{desc:k.desc||k.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Q,barcode:k.barcode??k.normalizedBarcode??""})}),C.size){const k=Array.from(C.values()).map(F=>{const x=v(String(F.qty>0?Math.min(F.qty,99):1)),X=Ia(F.desc||""),Q=F.barcode?` <span class="reservation-package-items__barcode">(${Ia(v(String(F.barcode)))})</span>`:"";return`<li>${X}${Q} × ${x}</li>`}).join("");$=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${k}
              </ul>
            </details>
          `}}const P=p?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",H=p?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${l.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${y}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${l.description||"-"}</div>
                ${p?`${$||""}${I||""}`:I}
              </div>
            </div>
          </td>
          <td>
            <div class="${P}" data-group-key="${l.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${l.key}" aria-label="${i}"${H}>−</button>
              <span class="reservation-qty-value">${m}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${l.key}" aria-label="${r}"${H}>+</button>
            </div>
          </td>
          <td>${T}</td>
          <td>${K}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${l.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),Vi(t)}function Mu(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function Ka(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=Qa();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,Hi();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${v(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${v(Number(s.percentage).toFixed(2))}%`:"—",d=s?.recordedAt?v(Ze(s.recordedAt)):"—",l=Mu(s?.type),u=s?.note?v(s.note):"";return`
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
  `,Hi()}function zu(){if(On()){E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=Co(e);let a=Lo(t);if(!Number.isFinite(a)||a<=0){E(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=us.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,d=o("reservations.create.summary.currency","SR");let l=null,u=null;if(n==="percent"){const y=Math.max(0,100-i);if(y<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const p=Math.min(a,y);if(p!==a){const m=v(p.toFixed(2));E(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",m)),a=p}u=Number(a.toFixed(2)),r>0&&(l=a/100*r)}else{const y=Math.max(0,r-c);if(y<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const p=Math.min(a,y);if(p!==a){const m=`${v(p.toFixed(2))} ${d}`;E(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",m)),a=p}l=Number(a.toFixed(2)),r>0&&(u=l/r*100)}l!=null&&(l=Number(l.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const b={type:n,value:a,amount:l,percentage:u,recordedAt:new Date().toISOString()};Zu(b),ui(Qa()),Ka(),tt(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),E(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function Hi(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(On()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}zu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(On()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(ep(s),ui(Qa()),Ka(),tt(),E(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function Ou(e){const{index:t,items:n}=Ht(),s=En(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,d)=>d!==r);Vt(t,i),Ot(i),tt()}function Hu(e){const{index:t,items:n}=Ht(),a=n.filter(s=>Ca(s)!==e);a.length!==n.length&&(Vt(t,a),Ot(a),tt())}function Vu(e){const{index:t,items:n}=Ht(),s=En(n).find(h=>h.key===e);if(!s||s.items.some(h=>h?.type==="package"))return;const{start:r,end:i}=_n();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=he(),d=t!=null&&c[t]||null,l=d?.id??d?.reservationId??null,u=new Set(n.map(h=>ae(h.barcode))),{equipment:b=[]}=he(),y=(b||[]).find(h=>{const _=ae(h?.barcode);return!_||u.has(_)||Ca({desc:h?.desc||h?.description||h?.name||"",price:Number(h?.price)||0})!==e||!mr(h)?!1:!gt(_,r,i,l)});if(!y){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const p=ae(y.barcode),m=rn(y);if(!m){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:m,equipmentId:m,barcode:p,desc:y.desc||y.description||y.name||s.description||"",qty:1,price:Number.isFinite(Number(y.price))?Number(y.price):s.unitPrice,image:on(y)}];Vt(t,g),Ot(g),tt()}function Vi(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){Ou(s);return}if(a==="increase-edit-group"&&s){Vu(s);return}if(a==="remove-edit-group"&&s){Hu(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||Qu(i)}}),e.dataset.groupListenerAttached="true")}function On(){return!!document.getElementById("edit-res-project")?.value}function Uu(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{On()&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function Ku(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),d=document.getElementById("edit-res-payment-history");[n,a,s,r,i,c,d].forEach(Uu),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s&&(s.value="unpaid",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),d&&(d.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.dataset.linkedDisabled="false"))}function tt(){const e=document.getElementById("edit-res-summary");if(!e)return;Ka();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),Ye(a),tt()}),a.dataset.listenerAttached="true");const s=v(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=On();Ku(c);const d=document.getElementById("edit-res-tax"),l=c?!1:d?.checked||!1,u=!c&&a?.dataset?.userSelected==="true",b=c?"unpaid":u&&a?.value||"unpaid";let y=null;!c&&l&&(rt("edit-res-company-share"),y=vn("edit-res-company-share"),(!Number.isFinite(y)||y<=0)&&(rt("edit-res-company-share"),y=vn("edit-res-company-share")));const{items:p=[],payments:m=[]}=Ht(),{start:g,end:h}=_n(),_=us({items:p,discount:r,discountType:i,applyTax:l,paidStatus:b,start:g,end:h,companySharePercent:y,paymentHistory:m});e.innerHTML=_;const q=us.lastResult;if(q&&a){const A=q.paymentStatus;u?Ye(a,a.value):(a.value!==A&&(a.value=A),a.dataset&&delete a.dataset.userSelected,Ye(a,A))}else a&&Ye(a,a.value)}function Qu(e){if(e==null)return;const{index:t,items:n}=Ht();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);Vt(t,a),Ot(a),tt()}function Gu(e){const t=e?.value??"",n=ae(t);if(!n)return;const a=Na(n);if(!a){E(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=_t(a);if(s==="maintenance"||s==="retired"){E(an(s));return}const r=ae(n),{index:i,items:c=[]}=Ht();if(c.findIndex(h=>ae(h.barcode)===r)>-1){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:l,end:u}=_n();if(!l||!u){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:b=[]}=he(),y=i!=null&&b[i]||null,p=y?.id??y?.reservationId??null;if(gt(r,l,u,p)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=rn(a);if(!m){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:m,equipmentId:m,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];Vt(i,g),e&&(e.value=""),Ot(g),tt()}function _a(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Lr(t),a=ae(n?.barcode||t);if(!n||!a){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=_t(n);if(s==="maintenance"||s==="retired"){E(an(s));return}const{start:r,end:i}=_n();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:d=[]}=Ht();if(d.some(g=>ae(g.barcode)===a)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=he(),b=c!=null&&u[c]||null,y=b?.id??b?.reservationId??null;if(gt(a,r,i,y)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const p=rn(n);if(!p){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const m=[...d,{id:p,equipmentId:p,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];Vt(c,m),Ot(m),tt(),e.value=""}function $o(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),_a(e))});const t=()=>{Tr(e.value,"edit-res-equipment-description-options")&&_a(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{tt()});const e=()=>{Ru()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{ko()})}typeof window<"u"&&(window.getEditReservationDateRange=_n,window.renderEditPaymentHistory=Ka);function Wu(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){qs(e);return}_a(e)}}function Rp(){Mt(),$o()}function Xu(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let bn=null,ft=[],bt=[],Cs=null,Ue={},cs=!1;const Ju="__DEBUG_CREW__";function Yu(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(Ju);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function Ui(e,t){if(Yu())try{console.log(`🪵 [crew-debug:edit] ${e}`,t)}catch{}}function Ls(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function Ts(){return document.getElementById("edit-res-confirmed")?.value==="true"}function Ht(){return{index:bn,items:ft,payments:bt}}function Vt(e,t,n=bt){bn=typeof e=="number"?e:null,ft=Array.isArray(t)?[...t]:[],bt=Array.isArray(n)?[...n]:[]}function Po(){bn=null,ft=[],Kc(),bt=[]}function Qa(){return[...bt]}function ui(e){bt=Array.isArray(e)?[...e]:[]}function Zu(e){e&&(bt=[...bt,e])}function ep(e){!Number.isInteger(e)||e<0||(bt=bt.filter((t,n)=>n!==e))}function Fn(e,t=1){const n=Number.parseFloat(v(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function Ns(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(v(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function tp(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?ae(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:Fn(e.qty??e.quantity??e.count??1),price:Ns(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function np(e,t=0){if(!e||typeof e!="object")return null;const n=Mn(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=Fn(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),r=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:Fs(e)).map(y=>tp(y)).filter(Boolean),i=e.total_price??e.totalPrice??e.total??null;let c=Ns(e.unit_price??e.unitPrice??e.price??null,0);if((!c||c===0)&&i!=null){const y=Ns(i,0);y>0&&a>0&&(c=Number((y/a).toFixed(2)))}const d=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,d,n].find(y=>y!=null&&String(y).trim()!=="")||`Package ${n}`,b=e.image??e.cover??e.thumbnail??r.find(y=>y?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:v(String(u)),name:v(String(u)),qty:a,price:c,barcode:d,packageItems:r,image:b}}function ap(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const r=s-n;e.set(a,r>0?r:0)})}function sp(e={},t=[]){const n=Array.isArray(t)?t.map(c=>({...c})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((c,d)=>np(c,d)).filter(Boolean);if(!s.length)return n;const r=new Map;s.forEach(c=>{const d=Fn(c.qty??c.quantity??1);if(c.barcode){const l=ae(c.barcode);if(l){const u=`package::${l}`;r.set(u,(r.get(u)??0)+d)}}(c.packageItems||[]).forEach(l=>{if(!l)return;const u=d*Fn(l.qty??l.quantity??1),b=l.equipmentId??null,y=l.normalizedBarcode||(l.barcode?ae(l.barcode):null);if(b!=null){const p=`equipment::${String(b)}`;r.set(p,(r.get(p)??0)+u)}if(y){const p=`barcode::${y}`;r.set(p,(r.get(p)??0)+u)}})});const i=[];return n.forEach(c=>{if(!c||typeof c!="object"){i.push(c);return}if(c.type==="package"){const h=Mn(c.packageId??c.package_id??c.id??"");s.some(q=>q.packageId===h)||i.push({...c});return}const d=Fn(c.qty??c.quantity??1),l=rn(c),u=c.barcode?ae(c.barcode):null,b=[];l!=null&&b.push(`equipment::${String(l)}`),u&&b.push(`barcode::${u}`);const y=b.map(h=>r.get(h)??0).filter(h=>h>0);if(!y.length){i.push({...c});return}const p=Math.min(...y);if(p<=0){i.push({...c});return}const m=Math.min(p,d);if(ap(r,b,m),m>=d)return;const g=d-m;i.push({...c,qty:g,quantity:g})}),[...i,...s.map(c=>({...c}))]}function ip(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Co(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Lo(e){if(!e)return null;const t=v(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function rp(e,t){if(e){e.value="";return}}function Tn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function To(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(v(String(e.value??""))),a=Number.parseFloat(v(String(e.amount??""))),s=Number.parseFloat(v(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),d=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,l=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:d,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:l}}function op(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((d,l)=>String(l.createdAt||l.start||"").localeCompare(String(d.createdAt||d.start||""))):[],c=[`<option value="">${Tn(a)}</option>`];i.forEach(d=>{c.push(`<option value="${Tn(d.id)}">${Tn(d.title||a)}</option>`)}),r&&!i.some(d=>String(d.id)===r)&&c.push(`<option value="${Tn(r)}">${Tn(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function No(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const d=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",d&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}js("tax");const c=Ue?.updateEditReservationSummary;typeof c=="function"&&c()}function js(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=Ue?.updateEditReservationSummary;typeof r=="function"&&r()};if(cs){a();return}cs=!0;const s=()=>{cs=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(Dt)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),rt("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?rt("edit-res-company-share"):n.checked&&(n.checked=!1));s()}async function Ki(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:d}=he(),u=Yt()?.[e];if(!u){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}Ue={...Ue,reservation:u,projects:d||[]},t?.(),op(d||[],u);const b=u.projectId&&d?.find?.(B=>String(B.id)===String(u.projectId))||null,{effectiveConfirmed:y,projectLinked:p}=zt(u,b),m=u.items?u.items.map(B=>({...B,equipmentId:B.equipmentId??B.equipment_id??B.id,barcode:ae(B?.barcode)})):[],g=sp(u,m),_=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(B=>To(B)).filter(Boolean);Vt(e,g,_);const q=o("reservations.list.unknownCustomer","غير معروف"),A=c?.find?.(B=>String(B.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const T=document.getElementById("edit-res-id");T&&(T.value=u.reservationId||u.id);const K=document.getElementById("edit-res-customer");K&&(K.value=A?.customerName||q);const S=typeof a=="function"?a(u.start):{date:"",time:""},I=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",S.date),n?.("edit-res-start-time",S.time),n?.("edit-res-end",I.date),n?.("edit-res-end-time",I.time);const $=document.getElementById("edit-res-notes");$&&($.value=u.notes||"");const P=document.getElementById("edit-res-discount");if(P){const B=p?0:u.discount??0;P.value=v(B)}const H=document.getElementById("edit-res-discount-type");H&&(H.value=p?"percent":u.discountType||"percent");const C=u.projectId?!1:!!u.applyTax,j=document.getElementById("edit-res-tax");j&&(j.checked=C);const W=document.getElementById("edit-res-company-share");if(W){const B=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,D=B!=null?Number.parseFloat(v(String(B).replace("%","").trim())):NaN,O=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,J=O!=null?O===!0||O===1||O==="1"||String(O).toLowerCase()==="true":Number.isFinite(D)&&D>0,re=J&&Number.isFinite(D)&&D>0?D:Dt,se=C||J;W.checked=se,W.dataset.companyShare=String(re)}Ls(y,{disable:p});const k=document.getElementById("edit-res-paid"),F=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");k&&(k.value=F,k.dataset&&delete k.dataset.userSelected);const x=document.getElementById("edit-res-payment-progress-type"),X=document.getElementById("edit-res-payment-progress-value");x?.dataset?.userSelected&&delete x.dataset.userSelected,x&&(x.value="percent"),rp(X);let Q=Array.isArray(u.crewAssignments)&&u.crewAssignments.length?u.crewAssignments:Array.isArray(u.techniciansDetails)&&u.techniciansDetails.length?u.techniciansDetails:(u.technicians||[]).map(B=>String(B));if(!Array.isArray(Q)||Q.length===0){const B=Qc(u.id??u.reservationId??u.reservation_code??null);Array.isArray(B)&&B.length&&(Q=B)}try{await rr()}catch(B){console.warn("[reservationsEdit] positions load failed (non-fatal)",B)}if(Gc(Q),s?.(g),typeof window<"u"){const B=window?.renderEditPaymentHistory;typeof B=="function"&&B()}No(),r?.();const M=document.getElementById("editReservationModal");Cs=ip(M,i),Cs?.show?.()}async function cp({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:r,populateEquipmentDescriptionLists:i,handleReservationsMutation:c}={}){if(bn===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const d=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),b=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",y=document.getElementById("edit-res-notes")?.value||"",p=v(document.getElementById("edit-res-discount")?.value||"0");let m=parseFloat(p)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const h=Ts(),_=document.getElementById("edit-res-paid"),q=_?.dataset?.userSelected==="true",A=q&&_?.value||"unpaid",T=document.getElementById("edit-res-payment-progress-type"),K=document.getElementById("edit-res-payment-progress-value"),S=Co(T),I=Lo(K),$=document.getElementById("edit-res-project")?.value||"",P=Vc();P.map(U=>U?.technicianId).filter(Boolean);const H=document.getElementById("edit-res-company-share"),C=document.getElementById("edit-res-tax");if(!d||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const j=typeof e=="function"?e:(U,ve)=>`${U}T${ve||"00:00"}`,W=j(d,l),k=j(u,b);if(W&&k&&new Date(W)>new Date(k)){E(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const x=Yt()?.[bn];if(!x){E(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(ft)||ft.length===0&&P.length===0){E(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const X=typeof t=="function"?t:()=>!1,Q=x.id??x.reservationId;for(const U of ft){if(U?.type==="package"&&Array.isArray(U.packageItems)){for(const L of U.packageItems){const ce=L?.barcode??L?.normalizedBarcode??"";if(!ce)continue;const te=_t(ce);if(te==="reserved"){const qe=ae(ce);if(!X(qe,W,k,Q))continue}if(te!=="available"){E(an(te));return}}continue}const ve=_t(U.barcode);if(ve==="reserved"){const L=ae(U.barcode);if(!X(L,W,k,Q))continue}if(ve!=="available"){E(an(ve));return}}for(const U of ft){if(U?.type==="package"&&Array.isArray(U.packageItems)){for(const L of U.packageItems){const ce=ae(L?.barcode??L?.normalizedBarcode??"");if(ce&&X(ce,W,k,Q)){const te=L?.desc||L?.barcode||o("reservations.create.packages.unnamedItem","معدة بدون اسم"),qe=`${o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${v(String(te))})`;E(qe);return}}continue}const ve=ae(U.barcode);if(X(ve,W,k,Q)){E(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const M=typeof n=="function"?n:()=>!1;for(const U of ft){if(U?.type!=="package")continue;const ve=U.packageId??U.package_id??null;if(ve&&M(ve,W,k,Q)){const L=U.desc||U.packageName||o("reservations.create.packages.genericName","الحزمة");E(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${v(String(L))} محجوزة بالفعل في الفترة المختارة`));return}}const B=typeof a=="function"?a:()=>!1;for(const U of P)if(U?.technicianId&&B(U.technicianId,W,k,Q)){E(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const D=Array.isArray(Ue.projects)&&Ue.projects.length?Ue.projects:he().projects||[],O=$&&D.find(U=>String(U.id)===String($))||null,J={...x,projectId:$?String($):null,confirmed:h},{effectiveConfirmed:re,projectLinked:se,projectStatus:de}=zt(J,O);let V=!!H?.checked,oe=!!C?.checked;if(se&&(V&&(H.checked=!1,V=!1),oe=!1),!se&&V!==oe){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}oe&&(rt("edit-res-company-share"),V=!!H?.checked);let we=V?getCompanySharePercent("edit-res-company-share"):null;V&&(!Number.isFinite(we)||we<=0)&&(rt("edit-res-company-share"),we=getCompanySharePercent("edit-res-company-share"));const Ee=V&&oe&&Number.isFinite(we)&&we>0,Ce=se?!1:oe;se&&(m=0,g="percent");const G=Ms(ft,m,g,Ce,P,{start:W,end:k,companySharePercent:Ee?we:0});let ee=Qa();if(Number.isFinite(I)&&I>0){const U=G;let ve=null,L=null;S==="amount"?(ve=I,U>0&&(L=I/U*100)):(L=I,U>0&&(ve=I/100*U));const ce=To({type:S,value:I,amount:ve,percentage:L,recordedAt:new Date().toISOString()});ce&&(ee=[...ee,ce],ui(ee)),K&&(K.value="")}const ue=zs({totalAmount:G,history:ee}),_e=Os({manualStatus:A,paidAmount:ue.paidAmount,paidPercent:ue.paidPercent,totalAmount:G});_&&!q&&(_.value=_e,_.dataset&&delete _.dataset.userSelected);let Fe=x.status??"pending";se?Fe=O?.status??de??Fe:["completed","cancelled"].includes(String(Fe).toLowerCase())||(Fe=h?"confirmed":"pending");const pe=nr({reservationCode:x.reservationCode??x.reservationId??null,customerId:x.customerId,start:W,end:k,status:Fe,title:x.title??null,location:x.location??null,notes:y,projectId:$?String($):null,totalAmount:G,discount:m,discountType:g,applyTax:Ce,paidStatus:_e,confirmed:re,items:ft.map(U=>({...U,equipmentId:U.equipmentId??U.id})),crewAssignments:P,companySharePercent:Ee?we:null,companyShareEnabled:Ee,paidAmount:ue.paidAmount,paidPercentage:ue.paidPercent,paymentProgressType:ue.paymentProgressType,paymentProgressValue:ue.paymentProgressValue,paymentHistory:ee});try{Ui("about to submit",{editingIndex:bn,crewAssignments:P,techniciansPayload:pe?.technicians,payload:pe});const U=await Uc(x.id||x.reservationId,pe);Ui("server response",{reservation:U?.id??U?.reservationId??U?.reservation_code,technicians:U?.technicians,crewAssignments:U?.crewAssignments,techniciansDetails:U?.techniciansDetails}),await or(),xn(),Oe(),E(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),Po(),c?.({type:"updated",reservation:U}),r?.(),i?.(),Cs?.hide?.()}catch(U){console.error("❌ [reservationsEdit] Failed to update reservation",U);const ve=La(U)?U.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");E(ve,"error")}}function Mp(e={}){Ue={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=Ue,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=v(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{js("tax")}),c.dataset.listenerAttached="true");const d=document.getElementById("edit-res-company-share");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{js("share")}),d.dataset.listenerAttached="true");const l=document.getElementById("edit-res-payment-progress-type");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{l.dataset.userSelected="true",t?.()}),l.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=v(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const b=document.getElementById("edit-res-project");b&&!b.dataset.listenerAttached&&(b.addEventListener("change",()=>{No();const h=Array.isArray(Ue.projects)&&Ue.projects.length?Ue.projects:he().projects||[],_=b.value&&h.find(S=>String(S.id)===String(b.value))||null,A={...Ue?.reservation??{},projectId:b.value||null,confirmed:Ts()},{effectiveConfirmed:T,projectLinked:K}=zt(A,_);Ls(T,{disable:K}),t?.()}),b.dataset.listenerAttached="true");const y=document.getElementById("edit-res-confirmed-btn");y&&!y.dataset.listenerAttached&&(y.addEventListener("click",()=>{if(y.disabled)return;const h=!Ts();Ls(h),t?.()}),y.dataset.listenerAttached="true");const p=document.getElementById("save-reservation-changes");p&&!p.dataset.listenerAttached&&(p.addEventListener("click",()=>{cp(Ue).catch(h=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",h)})}),p.dataset.listenerAttached="true");const m=document.getElementById("edit-res-equipment-barcode");if(m&&!m.dataset.listenerAttached){let h=null;const _=()=>{m.value?.trim()&&(clearTimeout(h),h=null,n?.(m))};m.addEventListener("keydown",A=>{A.key==="Enter"&&(A.preventDefault(),_())});const q=()=>{if(clearTimeout(h),!m.value?.trim())return;const{start:A,end:T}=getEditReservationDateRange();!A||!T||(h=setTimeout(()=>{_()},150))};m.addEventListener("input",q),m.addEventListener("change",_),m.dataset.listenerAttached="true"}$o?.();const g=document.getElementById("editReservationModal");g&&!g.dataset.cleanupAttached&&(g.addEventListener("hidden.bs.modal",()=>{Po(),t?.(),s?.([])}),g.dataset.cleanupAttached="true")}const lp=he()||{};let it=(lp.projects||[]).map(Do),Qn=!1;function dp(){return it}function Gn(e){it=Array.isArray(e)?e.map(pi):[],$a({projects:it});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return it}async function jo(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,d])=>{d==null||d===""||t.set(c,String(d))});const n=t.toString(),s=(await ot(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(Ga);return Gn(i),Qn=!0,it}async function Bo({force:e=!1,params:t=null}={}){if(!e&&Qn&&it.length>0)return it;try{return await jo(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),it}}async function up(e){const t=await ot("/projects/",{method:"POST",body:e}),n=Ga(t?.data??{}),a=[...it,n];return Gn(a),Qn=!0,n}async function pp(e,t){const n=await ot(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=Ga(n?.data??{}),s=it.map(r=>String(r.id)===String(e)?a:r);return Gn(s),Qn=!0,a}async function mp(e){await ot(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=it.filter(n=>String(n.id)!==String(e));Gn(t),Qn=!0}function fp({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:d,paymentStatus:l,equipmentEstimate:u=0,expenses:b=[],taxAmount:y=0,totalWithTax:p=0,discount:m=0,discountType:g="percent",companyShareEnabled:h=!1,companySharePercent:_=null,companyShareAmount:q=0,paidAmount:A=null,paidPercentage:T=null,paymentProgressType:K=null,paymentProgressValue:S=null,confirmed:I=!1,technicians:$=[],equipment:P=[],payments:H,paymentHistory:C}={}){const j=Array.isArray($)?$.map(D=>Number.parseInt(String(D),10)).filter(D=>Number.isInteger(D)&&D>0):[],W=Array.isArray(P)?P.map(D=>{const O=Number.parseInt(String(D.equipmentId??D.equipment_id??D.id??0),10),J=Number.parseInt(String(D.qty??D.quantity??0),10);return!Number.isInteger(O)||O<=0?null:{equipment_id:O,quantity:Number.isInteger(J)&&J>0?J:1}}).filter(Boolean):[],k=Array.isArray(b)?b.map(D=>{const O=Number.parseFloat(D?.amount??D?.value??0)||0,J=(D?.label??D?.name??"").trim();return J?{label:J,amount:Math.round(O*100)/100}:null}).filter(Boolean):[],F=k.reduce((D,O)=>D+(O?.amount??0),0),x={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!d,payment_status:l??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(F*100)/100,tax_amount:Math.round((Number.parseFloat(y)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(p)||0)*100)/100,confirmed:!!I,technicians:j,equipment:W,expenses:k},X=Math.max(0,Number.parseFloat(m)||0);x.discount=X,x.discount_type=g==="amount"?"amount":"percent";const Q=Number.parseFloat(_),M=!!h&&Number.isFinite(Q)&&Q>0;x.company_share_enabled=M,x.company_share_percent=M?Q:0,x.company_share_amount=M?Math.max(0,Number.parseFloat(q)||0):0,Number.isFinite(Number(A))&&(x.paid_amount=Math.max(0,Number.parseFloat(A)||0)),Number.isFinite(Number(T))&&(x.paid_percentage=Math.max(0,Number.parseFloat(T)||0)),(K==="amount"||K==="percent")&&(x.payment_progress_type=K),S!=null&&S!==""&&(x.payment_progress_value=Number.parseFloat(S)||0),e&&(x.project_code=String(e).trim());const B=H!==void 0?H:C;if(B!==void 0){const D=Fo(B)||[];x.payments=D.map(O=>({type:O.type,amount:O.amount!=null?O.amount:null,percentage:O.percentage!=null?O.percentage:null,value:O.value!=null?O.value:null,note:O.note??null,recorded_at:O.recordedAt??null}))}return x.end_datetime||delete x.end_datetime,x.client_company||(x.client_company=null),x}function Ga(e={}){return pi(e)}function Do(e={}){return pi(e)}function pi(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(p=>{if(p==null)return null;if(typeof p=="object"){const m=p.id??p.technician_id??p.technicianId;return m!=null?String(m):null}return String(p)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(p=>{const m=p?.equipment_id??p?.equipmentId??p?.id??null,g=p?.quantity??p?.qty??0,h=p?.barcode??p?.code??"",_=p?.description??p?.name??"";return{equipmentId:m!=null?String(m):null,qty:Number.parseInt(String(g),10)||0,barcode:h,description:_}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((p,m)=>({id:p?.id??`expense-${t??"x"}-${m}`,label:p?.label??"",amount:Number.parseFloat(p?.amount??0)||0})),d=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,l=e.company_share_enabled??e.companyShareEnabled,u=l!=null?l===!0||l===1||String(l).toLowerCase()==="true":d>0,b=e.payment_history??e.paymentHistory??e.payments??null,y=Fo(b);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?d:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(p=>typeof p=="object"?p:{id:p}),equipment:r,expenses:c,paymentHistory:y}}function yp(e){return e instanceof Qi}function ls(e){if(e==null||e==="")return null;const t=v(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function bp(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=ls(e.value);let s=ls(e.amount),r=ls(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,d=e.recordedAt??e.recorded_at??e.date??null;let l=null;if(d){const b=new Date(d);Number.isNaN(b.getTime())||(l=b.toISOString())}l||(l=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:l}}function Fo(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>bp(t)).filter(Boolean):[]}const zp=Object.freeze(Object.defineProperty({__proto__:null,buildProjectPayload:fp,createProjectApi:up,deleteProjectApi:mp,ensureProjectsLoaded:Bo,getProjectsState:dp,isApiError:yp,mapLegacyProject:Do,mapProjectFromApi:Ga,refreshProjectsFromApi:jo,setProjectsState:Gn,updateProjectApi:pp},Symbol.toStringTag,{value:"Module"})),ka="reservations-ui:ready",Xt=typeof EventTarget<"u"?new EventTarget:null;let Jt={};function gp(e){return Object.freeze({...e})}function hp(){if(!Xt)return;const e=Jt,t=typeof CustomEvent=="function"?new CustomEvent(ka,{detail:e}):{type:ka,detail:e};typeof Xt.dispatchEvent=="function"&&Xt.dispatchEvent(t)}function vp(e={}){if(!e||typeof e!="object")return Jt;const t={...Jt};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),Jt=gp(t),hp(),Jt}function qp(e){if(e)return Jt?.[e]}function Op(e){const t=qp(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const i=(s?.detail||Jt)?.[e];typeof i=="function"&&(Xt&&Xt.removeEventListener(ka,a),n(i))};Xt&&Xt.addEventListener(ka,a)})}function Hp(){return Bo().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=he()||{};Wc(e||[]),Mr()})}function mi(e=null){Mr(),Ro(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Sp(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Bs(){return{populateEquipmentDescriptionLists:Mt,setFlatpickrValue:Xu,splitDateTime:Ji,renderEditItems:Ot,updateEditReservationSummary:tt,addEquipmentByDescription:Wu,addEquipmentToEditingReservation:Gu,addEquipmentToEditingByDescription:_a,combineDateTime:Rn,hasEquipmentConflict:gt,hasTechnicianConflict:tr,renderReservations:Ro,handleReservationsMutation:mi,ensureModal:Sp}}function Ro(e="reservations-list",t=null){Tu({containerId:e,filters:t,onShowDetails:Mo,onConfirmReservation:Oo})}function Mo(e){return Nu(e,{getEditContext:Bs,onEdit:(t,{reservation:n})=>{Ho(t,n)},onDelete:zo})}function zo(e){return sn()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?Bu(e,{onAfterChange:mi}):!1:(Hn(),!1)}function Oo(e){return Du(e,{onAfterChange:mi})}function Ho(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}Ki(e,Bs());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}Ki(e,Bs());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}Cc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Vp(){vp({showReservationDetails:Mo,deleteReservation:zo,confirmReservation:Oo,openReservationEditor:Ho})}export{Sl as $,jo as A,Vp as B,Bo as C,Bp as D,mp as E,up as F,_p as G,Mp as H,Hp as I,Rp as J,Ip as K,mi as L,Cp as M,Mr as N,Pp as O,Lp as P,tt as Q,Bs as R,ye as S,zo as T,Oo as U,Ho as V,Xu as W,An as X,al as Y,ma as Z,Ap as _,Oe as a,xp as a0,zp as a1,Li as b,Vr as c,Ur as d,Fp as e,Ro as f,zr as g,qp as h,fp as i,vp as j,Mo as k,Tp as l,Ga as m,Np as n,dp as o,yp as p,ud as q,Un as r,Kr as s,Or as t,pp as u,jp as v,Op as w,Dp as x,kp as y,$p as z};
