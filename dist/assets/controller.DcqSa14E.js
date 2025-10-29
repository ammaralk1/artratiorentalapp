import{n as h,l as me,A as Bc,t as c,a as ft,s as E,u as dn,c as Gn,d as Ta,b as ar,z as Dc,f as rt,B as sr,o as Fc}from"./auth.CEuLGm9k.js";import{B as re,C as Et,E as ir,F as Rc,D as an,G as Ms,n as et,H as rr,I as ki,J as Vn,K as Un,L as Ba,M as Mc,N as zs,O as At,P as Hs,Q as kn,R as or,S as Os,T as zc,U as Hc,V as Oc,W as cr,X as un,Y as ya,Z as Vc,_ as Da,$ as lr,a0 as dr,a as Vs,o as Us,q as Ks,a1 as ur,a2 as Uc,s as sn,h as Fa,a3 as Kc,a4 as mr,a5 as Qc,i as Qs,r as Ut,a6 as Gs,a7 as Dt,a8 as ba,m as xe,p as Re,y as Ra,b as pr,a9 as fr,l as Ws,g as Mt,aa as ys,j as yr,z as Gc,ab as Wc,ac as bs,ad as Xc,u as Jc,ae as Yc,af as Zc,ag as el,ah as tl}from"./reservationsService.Cf-KLyp-.js";const rs="select.form-select:not([data-no-enhance]):not([multiple])",wt=new WeakMap;let os=null,Pi=!1,_t=null;function km(e=document){e&&(e.querySelectorAll(rs).forEach(t=>la(t)),!os&&e===document&&(os=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(rs)&&la(a),a.querySelectorAll?.(rs).forEach(s=>la(s)))})}),os.observe(document.body,{childList:!0,subtree:!0})),Pi||(Pi=!0,document.addEventListener("pointerdown",sl,{capture:!0})))}function ca(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){la(e);return}const t=e.closest(".enhanced-select");t&&(Xs(t),ga(t),gs(t))}function la(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){ca(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const i={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};wt.set(t,i),a.addEventListener("click",()=>al(t)),a.addEventListener("keydown",r=>il(r,t)),s.addEventListener("click",r=>ol(r,t)),s.addEventListener("keydown",r=>rl(r,t)),e.addEventListener("change",()=>{ga(t),br(t)}),i.observer=new MutationObserver(r=>{let o=!1,l=!1;for(const d of r)d.type==="attributes"&&d.attributeName==="disabled"&&(l=!0),d.type==="childList"&&(o=!0);l&&gs(t),o&&nl(i,t)}),i.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),Xs(t),ga(t),gs(t)}function nl(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,Xs(t),ga(t)})))}function Xs(e){const t=wt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),i=document.createDocumentFragment();s.forEach(r=>{const o=document.createElement("li");o.className="enhanced-select__option",o.textContent=r.textContent??r.value??"",o.dataset.value=r.value??"",o.setAttribute("role","option"),o.setAttribute("tabindex","-1"),r.disabled&&(o.setAttribute("aria-disabled","true"),o.classList.add("is-disabled")),r.selected&&(o.setAttribute("aria-selected","true"),o.dataset.selected="true",o.setAttribute("tabindex","0")),i.appendChild(o)}),a.innerHTML="",a.appendChild(i),br(e)}function ga(e){const t=wt.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],i=s?.textContent?.trim()||s?.value||"";a.textContent=i}function br(e){const t=wt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(r=>{const o=r.dataset.value===s;r.toggleAttribute("aria-selected",o),r.dataset.selected=o?"true":"",r.setAttribute("tabindex",o?"0":"-1")})}function gs(e){const t=wt.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function al(e){wt.get(e)&&(e.getAttribute("data-open")==="true"?Pn(e):gr(e))}function gr(e){const t=wt.get(e);if(!t)return;_t&&_t!==e&&Pn(_t,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),_t=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function Pn(e,{focusTrigger:t=!0}={}){const n=wt.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),_t===e&&(_t=null))}function sl(e){if(!_t)return;const t=e.target;t instanceof Node&&(_t.contains(t)||Pn(_t,{focusTrigger:!1}))}function il(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),gr(t)):n==="Escape"&&Pn(t)}function rl(e,t){const n=e.key,a=wt.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const i=s.findIndex(r=>r===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const o=(i+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[o].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const r=document.activeElement;r&&r.classList.contains("enhanced-select__option")&&hr(r,t)}else n==="Escape"&&(e.preventDefault(),Pn(t))}function ol(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&hr(n,t)}function hr(e,t){const n=wt.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),Pn(t)}const $n=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let kt=null;function Js(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function vr(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function cl(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function ll(e={}){const t=cl({...e,activatedAt:Date.now()});return kt=t,vr(!0,t.mode||"create"),Js($n.change,{active:!0,selection:{...t}}),t}function ha(e="manual"){if(!kt)return;const t=kt;kt=null,vr(!1),Js($n.change,{active:!1,previous:t,reason:e})}function qr(){return!!kt}function dl(){return kt?{...kt}:null}function ul(e){if(!kt)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=h(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:i,description:r}=e,o=Array.isArray(n)?n:[];a&&o.push(a);const l=o.map(u=>h(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!l.length)return!1;const d=Number.isInteger(s)&&s>0?s:l.length;t={barcodes:l,quantity:Math.min(d,l.length)},i&&(t.groupKey=i),r&&(t.description=r)}else return!1;return Js($n.requestAdd,{...t,selection:{...kt}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||ha("tab-changed")});const ml=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),pl=new Set(["maintenance","reserved","retired"]);function fl(e){const t=String(e??"").trim().toLowerCase();return t&&ml.get(t)||"available"}function yl(e){return e?typeof e=="object"?e:Ma(e):null}function Ct(e){const t=yl(e);return t?fl(t.status||t.state||t.statusLabel||t.status_label):"available"}function Sr(e){return!pl.has(Ct(e))}function mn(e={}){return e.image||e.imageUrl||e.img||""}function bl(e){if(!e)return null;const t=re(e),{equipment:n=[]}=me();return(n||[]).find(a=>re(a?.barcode)===t)||null}function Ma(e){const t=re(e);if(!t)return null;const{equipment:n=[]}=me();return(n||[]).find(a=>re(a?.barcode)===t)||null}const gl=me()||{};let Ft=(gl.equipment||[]).map(ql),hs=!1,vn="",Zt=null,rn=null,on=null,za=!1,$i=!1;function hl(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function vl(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function ql(e={}){return Ys({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function Ha(e={}){return Ys(e)}function Ys(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",i=Wn(e.quantity??e.qty??0),r=Oa(e.unit_price??e.price??0),o=h(String(e.barcode??"").trim()),l=Ke(e.status??e.state??e.status_label??e.statusLabel??"available"),d=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:Sl(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:i,price:r,barcode:o,status:l,image:d,imageUrl:d,created_at:e.created_at??null,updated_at:e.updated_at??null}}function Sl(e){return e!=null&&e!==""}function Wn(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function Oa(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function El(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const i=s.length-a.length,r=t+i,o=n+i;e.setSelectionRange(r,o)}}),e.dataset.englishDigitsAttached="true")}function Ci(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function Al(e,t){const n=Ci(e),a=Ci(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,i=s.test(n),r=s.test(a);if(i&&r){if(n.length!==a.length)return n.length-a.length;const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}else{if(i!==r)return i?-1:1;{const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}}const o=qa(e?.desc||e?.description||e?.name||""),l=qa(t?.desc||t?.description||t?.name||"");return o.localeCompare(l,"ar",{sensitivity:"base"})}function Me(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ke(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function wl(e){return Ke(e)}function va(){if(!qr())return null;const e=dl();return e?{...e}:null}function xl(e){const t=va();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:i=null}=t,r=t?.mode||t?.source||"",o=[],l=new Set;if(n.forEach(y=>{const p=re(y?.barcode);!p||l.has(p)||(l.add(p),o.push({variant:y,barcode:p}))}),!o.length)return{active:!0,canSelect:!1,reason:c("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(r==="package-manager"||r==="equipment-packages"){const y=Math.max(1,o.length||1);return{active:!0,canSelect:!0,barcode:o[0].barcode,availableBarcodes:o.map(({barcode:p})=>p),maxQuantity:y,reason:""}}const d=o.filter(({variant:y})=>{const p=Ke(y?.status);return p!=="maintenance"&&p!=="retired"});if(!a||!s)return{active:!0,canSelect:!1,barcode:d[0]?.barcode||o[0].barcode,reason:c("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=d.filter(({barcode:y})=>!Et(y,a,s,i));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:y})=>y),maxQuantity:u.length};let b=c("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(d.length>0)b=c("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const y=new Set(o.map(({variant:p})=>Ke(p?.status)));y.has("maintenance")?b=c("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):y.has("reserved")?b=c("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):y.has("retired")&&(b=c("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:d[0]?.barcode||o[0].barcode,reason:b,availableBarcodes:[],maxQuantity:0}}function Il(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function Er(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=va();e.hidden=!s;const i=s?.mode||s?.source||"";s?i==="package-manager"||i==="equipment-packages"?(n&&(n.textContent=c("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=c("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=c("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=c("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=c("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=c("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=c("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=c("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=c("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const o=va(),l=o?.mode||o?.source||"";l==="package-manager"||l==="equipment-packages"?ha("package-finish-button"):(ha("return-button"),Il())}),t.dataset.listenerAttached="true")}function ot(){return Ft}function cn(e){Ft=Array.isArray(e)?e.map(Ys):[],Ta({equipment:Ft}),vl()}function qa(e){return String(e??"").trim().toLowerCase()}function Ht(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=qa(t);return n||(n=qa(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function Va(e){const t=Ht(e);return t?ot().filter(n=>Ht(n)===t):[]}function Ua(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=Ka(e);if(n){const a=Me(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${Me(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function Zs(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function Sa(){const e=Zs();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function ei(e={}){const t=Zs();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function wn(e){za=e;const t=Zs(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(r=>{r&&(e?r.removeAttribute("disabled"):r.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const r=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",o=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=c(r,o),a.dataset.mode=e?"save":"view"}if(e){const r=t.description||t.category||t.subcategory;r&&setTimeout(()=>{r.focus(),typeof r.select=="function"&&r.select()},0)}}async function _l(e){if(!dn()){Gn();return}if(!e)return;try{await Pl()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(c("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),i=s.Sheets[s.SheetNames[0]],r=XLSX.utils.sheet_to_json(i,{defval:""});if(!Array.isArray(r)||r.length===0){E(c("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const o=[];let l=0;if(r.forEach(d=>{const u=d.القسم??d.category??"",b=d["القسم الثانوي"]??d.subcategory??"",y=d.الوصف??d.description??d.name??"",p=d.الكمية??d.quantity??0,m=d.السعر??d.price??0,g=d.الباركود??d.barcode??"",v=d.الحالة??d.status??"متاح",_=d.الصورة??d.image_url??d.image??"",q=h(String(g||"")).trim();if(!y||!q){l+=1;return}o.push(ti({category:u,subcategory:b,description:y,quantity:p,unit_price:m,barcode:q,status:v,image_url:_}))}),!o.length){E(c("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const d=await ft("/equipment/?bulk=1",{method:"POST",body:o}),u=Array.isArray(d?.data)?d.data.map(Ha):[];if(u.length){const p=[...ot(),...u];cn(p)}await Xn({showToastOnError:!1}),Qe();const b=d?.meta?.count??u.length,y=[];b&&y.push(`${b} ✔️`),l&&y.push(`${l} ⚠️`),E(c("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(y.length?` (${y.join(" / ")})`:""))}catch(d){const u=Ln(d,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");E(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),E(c("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),E(c("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const kl="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let jn=null;function Pl(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):jn||(jn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",i,{once:!0});return}const a=document.createElement("script");a.src=kl,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",i,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function i(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),jn=null,e}),jn)}function ti({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:i="",status:r="متاح",image_url:o=""}){const l=h(String(i||"")).trim(),d=wl(r);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:Wn(a),unit_price:Oa(s),barcode:l,status:d,image_url:o?.trim()||null}}async function Ar(){if(!dn()){Gn();return}if(confirm(c("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await ft("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await Xn({showToastOnError:!1}),E(c("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=Ln(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");E(t,"error")}}function Ka(e){return e.image||e.imageUrl||e.img||""}function $l(e){const t=Ke(e),n={available:{label:c("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:c("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:c("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:c("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function Ea(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=c("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${Me(a)}</td></tr>`}n&&(n.textContent="0")}function wr(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const i=Zt?.groupKey||Ht(e);if(!i){Ea();return}const r=ot().filter(b=>Ht(b)===i).sort((b,y)=>{const p=String(b.barcode||"").trim(),m=String(y.barcode||"").trim();return!p&&!m?0:p?m?p.localeCompare(m,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!r.length){Ea();return}t.hidden=!1,a&&(a.textContent=String(r.length));const o=c("equipment.modal.variants.current","الحالي"),l=c("equipment.form.labels.quantity","الكمية"),d=ot(),u=r.map(b=>{const y=b.id&&e.id?String(b.id)===String(e.id):String(b.barcode||"")===String(e.barcode||""),p=y?"equipment-variants-table__row--current":"",m=Me(String(b.barcode||"-")),g=y?`<span class="equipment-variants-current-badge">${Me(o)}</span>`:"",v=h(String(Number.isFinite(Number(b.qty))?Number(b.qty):0)),_=d.indexOf(b),q=Me(c("equipment.item.actions.delete","🗑️ حذف")),k=_>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${_}">${q}</button>
          </div>`:"";return`
        <tr class="${p}">
          <td>
            ${m}
            ${g}
          </td>
          <td>${$l(b.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${Me(l)}">${v}</span>
          </td>
          <td class="table-actions-cell">${k}</td>
        </tr>
      `}).join("");n.innerHTML=u}function Cl({item:e,index:t}){const n=Ka(e),a=c("equipment.item.actions.delete","🗑️ حذف"),s=c("equipment.item.imageAlt","صورة"),i=c("equipment.item.currency","SR"),r=dn(),o={description:c("equipment.card.labels.description","الوصف"),status:c("equipment.card.labels.status","الحالة"),alias:c("equipment.card.labels.alias","الاسم"),quantity:c("equipment.card.labels.quantity","الكمية"),price:c("equipment.card.labels.price","السعر"),category:c("equipment.card.labels.category","القسم"),subcategory:c("equipment.card.labels.subcategory","القسم الثانوي"),barcode:c("equipment.card.labels.barcode","الباركود"),available:c("equipment.card.labels.available","متاح")},l=Number.isFinite(Number(e.qty))?Number(e.qty):0,d=Number.isFinite(Number(e.price))?Number(e.price):0,u=l.toLocaleString("en-US"),b=d.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),y=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,p=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,m=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(l-y-p,0),g=m.toLocaleString("en-US"),v=c("equipment.card.labels.availableOfTotal","من أصل"),_=Ke(e.status);let q=`${Me(o.available)}: ${Me(g)} ${Me(v)} ${Me(u)}`,k="available";if(m===0){const V={reserved:{text:l===1?c("equipment.card.availability.reservedSingle","مؤجرة"):c("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:c("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:c("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:c("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},R=V[_]||V.default;q=Me(R.text),k=R.modifier}const x=`<span class="equipment-card__availability equipment-card__availability--${k}">${q}</span>`,K="",S=e.desc||e.name||"—",w=e.name&&e.name!==e.desc?e.name:"",N=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:o.quantity,value:u},{label:o.price,value:`${b} ${i}`}].map(({label:V,value:R})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${V}</span>
              <span class="equipment-card__detail-value">${R}</span>
            </span>
          `).join("")}
    </div>`,W=[e.category?{label:o.category,value:e.category}:null,e.sub?{label:o.subcategory,value:e.sub}:null].filter(Boolean),P=W.length?`<div class="equipment-card__categories">${W.map(({label:V,value:R})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${V}</span>
              <span class="equipment-card__detail-value">${R}</span>
            </div>
          `).join("")}</div>`:"",F=w?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${o.alias}</span>
        <span class="equipment-card__detail-value">${w}</span>
      </div>`:"",j=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${o.description}</span>
      <h3 class="equipment-card__title">${S}</h3>
    </div>
  `}
      ${N}
    </div>
  `,T=[],$=xl(e),O=$?.availableBarcodes?.length?$.availableBarcodes.join(","):$?.barcode?$.barcode:"";let Q="",D="";if($.active){const V=`equipment-select-qty-${t}`,R=!!$.canSelect,ee=R?Math.max(1,Number($.maxQuantity||$.availableBarcodes?.length||1)):1,ue=Math.max(1,Math.min(ee,99)),le=[];for(let qe=1;qe<=ue;qe+=1){const De=h(String(qe));le.push(`<option value="${qe}"${qe===1?" selected":""}>${De}</option>`)}const Ee=R?"":" disabled",ge=c("reservations.create.equipment.selector.quantityLabel","الكمية"),G=R?`${c("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${h(String(ee))}`:$.reason?$.reason:"";Q=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${V}">${ge}</label>
        <select class="equipment-card__quantity-select" id="${V}" data-equipment-select-quantity${Ee}>
          ${le.join("")}
        </select>
        ${G?`<span class="equipment-card__selection-hint">${Me(G)}</span>`:""}
      </div>
    `;const te=va(),Ie=te?.mode||te?.source||"",Ge=Ie==="package-manager"||Ie==="equipment-packages"?c("equipment.packages.selection.addToPackage","➕ أضف إلى الحزمة"):c("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),Y=R?"":" disabled",ae=$.reason?` title="${Me($.reason)}"`:"",ce=['data-equipment-action="select-reservation"',`data-selection-max="${R?ee:0}"`];O&&ce.push(`data-selection-barcodes="${Me(O)}"`),e.groupKey&&ce.push(`data-selection-group="${Me(String(e.groupKey))}"`),D=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${ce.join(" ")}${Y}${ae}>${Ge}</button>
    `}r&&T.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const J=T.length?T.join(`
`):"",B=Me(S);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${Me(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${B}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${K}
        ${x}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${j}
        </div>
      </div>
      <div class="equipment-card__body">
        ${P}
        ${F}
      </div>
      ${Q||D||J?`<div class="equipment-card__actions equipment-card__actions--center">
            ${Q}
            ${D}
            ${J}
          </div>`:""}
    </article>
  `}function Ll(e){const t=[...new Set(e.map(r=>r.category).filter(Boolean))],n=[...new Set(e.map(r=>r.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const r=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(o=>{const l=document.createElement("option");l.value=o,l.textContent=o,a.appendChild(l)}),t.includes(r)&&(a.value=r),ca(a)}if(s){const r=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(o=>{const l=document.createElement("option");l.value=o,l.textContent=o,s.appendChild(l)}),n.includes(r)&&(s.value=r),ca(s)}const i=document.getElementById("filter-status");i&&ca(i)}function Cn(){const e=me();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return Ft=t||[],Ft;const s=new Date;let i=!1;const r=new Set((a||[]).filter(l=>l?.status==="open").map(l=>h(String(l?.equipmentBarcode??"")).trim().toLowerCase())),o=t.map(l=>{if(!l)return l;const d=Ke(l.status),u=h(String(l.barcode??"")).trim().toLowerCase(),b=u&&r.has(u);let y=b?"maintenance":"available";if(!b&&u)for(const p of n||[]){if(!Nl(p,s))continue;if(p.items?.some(g=>h(String(g?.barcode??"")).trim().toLowerCase()===u)){y="reserved";break}}return y!==d?(i=!0,{...l,status:y}):{...l,status:y}});return i?cn(o):(Ft=o,Ta({equipment:Ft})),Ft}function Nl(e,t){if(!e?.start||!e?.end)return!1;const n=String(e?.status||e?.reservationStatus||"").toLowerCase();if(n==="cancelled"||n==="canceled")return!1;const a=new Date(e.start),s=new Date(e.end);return Number.isNaN(a.getTime())||Number.isNaN(s.getTime())?!1:a<=t&&t<s}function cs(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Qe(){const e=document.getElementById("equipment-list");if(!e)return;Er();const t=Cn(),n=Array.isArray(t)?t:ot(),a=new Map;n.forEach(g=>{if(!g)return;const v=Ht(g);v&&(a.has(v)||a.set(v,[]),a.get(v).push(g))});const s=Array.from(a.values()).map(g=>{const v=g[0],_=g.reduce((w,L)=>w+(Number.isFinite(Number(L.qty))?Number(L.qty):0),0),q=["maintenance","reserved","available","retired"],k=g.map(w=>Ke(w.status)).sort((w,L)=>q.indexOf(w)-q.indexOf(L))[0]||"available",x=g.reduce((w,L)=>{const N=Wn(L?.qty??0)||0,W=Ke(L?.status);return W==="reserved"?w.reserved+=N:W==="maintenance"&&(w.maintenance+=N),w},{reserved:0,maintenance:0}),K=Math.max(_-x.reserved-x.maintenance,0);return{item:{...v,qty:_,status:k,variants:g,groupKey:Ht(v),reservedQty:x.reserved,maintenanceQty:x.maintenance,availableQty:K},index:n.indexOf(v)}});s.sort((g,v)=>Al(g.item,v.item));const i=document.getElementById("search-equipment")?.value||"",r=h(i).toLowerCase().trim(),o=document.getElementById("filter-category")?.value||"",l=document.getElementById("filter-sub")?.value||"",d=document.getElementById("filter-status")?.value||"",u=d?Ke(d):"";if(hs&&!n.length){e.innerHTML=cs(c("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(vn&&!n.length){e.innerHTML=cs(vn,{tone:"error",icon:"⚠️"});return}const b=s.filter(({item:g})=>{const v=h(String(g.barcode??"")).toLowerCase().trim(),_=Array.isArray(g.variants)?g.variants.map(S=>h(String(S.barcode??"")).toLowerCase().trim()).filter(Boolean):[],q=!r||g.name&&g.name.toLowerCase().includes(r)||g.desc&&g.desc.toLowerCase().includes(r)||v&&v.includes(r)||_.some(S=>S.includes(r))||g.category&&g.category.toLowerCase().includes(r)||g.sub&&g.sub.toLowerCase().includes(r),k=!o||g.category===o,x=!l||g.sub===l,K=!u||Ke(g.status)===u;return q&&k&&x&&K}),y=r?c("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):c("equipment.list.empty","لا توجد معدات مسجلة بعد."),p=b;e.innerHTML=p.length?p.map(Cl).join(""):cs(y);const m=document.getElementById("equipment-list-count");if(m){const g=c("equipment.list.countSuffix","عنصر"),v=h(String(p.length)),_=p.length?`${v} ${g}`:`0 ${g}`;m.textContent=_}Ll(n)}async function Xn({showToastOnError:e=!0}={}){hs=!0,vn="",Qe();try{const t=await ft("/equipment/?all=1"),n=t?.data??t;let a=[];Array.isArray(n)?a=n:n&&typeof n=="object"&&(Array.isArray(n.items)?a=n.items:Array.isArray(n.results)?a=n.results:Array.isArray(n.data)?a=n.data:Array.isArray(n.records)&&(a=n.records));const s=a.map(Ha);cn(s)}catch(t){t&&typeof t=="object"&&Number(t.status)===401?vn="":(vn=Ln(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&E(vn,"error"))}finally{hs=!1,Qe()}}function Ln(e,t,n){if(e instanceof ar){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return c(t,n)}async function jl(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),i=Oa(t.querySelector("#new-equipment-price")?.value||"0"),r=Wn(t.querySelector("#new-equipment-qty")?.value||"1"),o=t.querySelector("#new-equipment-image")?.value?.trim()||"",l=t.querySelector("#new-equipment-category")?.value?.trim()||"",d=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){E(c("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const b=ti({category:l,subcategory:d,description:n,quantity:r,unit_price:i,barcode:s,status:u,image_url:o});try{const y=await ft("/equipment/",{method:"POST",body:b}),p=Ha(y?.data),m=[...ot(),p];cn(m),Qe(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),E(c("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(y){const p=Ln(y,"equipment.toast.addFailed","تعذر إضافة المعدة");E(p,"error")}}async function xr(e){if(!dn()){Gn();return}const t=ot(),n=t[e];if(n&&confirm(c("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await ft(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),cn(a),Qe(),E(c("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=Ln(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");E(s,"error")}}async function Tl(e,t){const n=ot(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const i=[...n];i[e]={...i[e],...t},cn(i),Qe();return}const s=ti({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const i=await ft(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),r=Ha(i?.data),o=[...n];o[e]=r,cn(o),Qe(),E(c("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(i){const r=Ln(i,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw E(r,"error"),i}}function ia(){Qe()}function Ir(e){const n=ot()[e];if(!n)return;rn=e;const a=Va(n),s=a[0]||n,i=a.reduce((l,d)=>l+(Number.isFinite(Number(d.qty))?Number(d.qty):0),0),r=["maintenance","reserved","available","retired"],o=a.map(l=>Ke(l.status)).sort((l,d)=>r.indexOf(l)-r.indexOf(d))[0]||Ke(s.status);document.getElementById("edit-equipment-index").value=e,ei({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(i||s.qty||0),price:s.price!=null?String(s.price):"0",image:Ka(s)||"",barcode:s.barcode||"",status:s.status||o}),wn(!1),on=Sa(),Ua(s),wr(s),Zt={groupKey:Ht(s),barcode:String(s.barcode||""),id:s.id||null},hl(document.getElementById("editEquipmentModal"))?.show()}function Bl(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),i=s?.querySelector("[data-equipment-select-quantity]");let r=Number.parseInt(i?.value||"1",10);(!Number.isFinite(r)||r<=0)&&(r=1);const o=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(o)&&o>0&&r>o&&(r=o);const d=(t.dataset.selectionBarcodes||"").split(",").map(p=>p.trim()).filter(p=>p.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",b=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";ul({barcodes:d,quantity:r,groupKey:b,description:u})||E(c("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||xr(s).catch(i=>{console.error("❌ [equipment.js] deleteEquipment",i)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||Ir(s)}}function Dl(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||Ir(n)}}function Fl(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||xr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function _r(){if(!Zt||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=ot(),a=Zt.id?n.find(l=>String(l.id)===String(Zt.id)):null,s=Zt.groupKey,i=s?n.find(l=>Ht(l)===s):null,r=a||i;if(!r){Ea();return}const o=n.findIndex(l=>l===r);if(o>=0){const l=document.getElementById("edit-equipment-index");l&&(l.value=String(o)),rn=o}if(wr(r),!za){const l=Va(r),d=l[0]||r,u=l.reduce((p,m)=>p+(Number.isFinite(Number(m.qty))?Number(m.qty):0),0),b=["maintenance","reserved","available","retired"],y=l.map(p=>Ke(p.status)).sort((p,m)=>b.indexOf(p)-b.indexOf(m))[0]||Ke(d.status);ei({category:d.category||"",subcategory:d.sub||"",description:d.desc||d.description||"",quantity:String(u||d.qty||0),price:d.price!=null?String(d.price):"0",image:Ka(d)||"",barcode:d.barcode||"",status:d.status||y}),on=Sa()}Ua(primary)}function Rl(){document.getElementById("search-equipment")?.addEventListener("input",ia),document.getElementById("filter-category")?.addEventListener("change",ia),document.getElementById("filter-sub")?.addEventListener("change",ia),document.getElementById("filter-status")?.addEventListener("change",ia),document.getElementById("add-equipment-form")?.addEventListener("submit",jl);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),Ar().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",Bl),t.addEventListener("keydown",Dl),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",Fl),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);El(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!za){on=Sa(),wn(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){E(c("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:Wn(document.getElementById("edit-equipment-quantity").value)||1,price:Oa(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await Tl(t,n),on=Sa(),wn(!1),_r()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{Rl(),Qe(),Xn();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(on&&ei(on),rn!=null){const a=ot()[rn];if(a){const i=Va(a)[0]||a;Ua(i)}}wn(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Qe(),wn(za),rn!=null){const t=ot()[rn];if(t){const a=Va(t)[0]||t;Ua(a)}}});document.addEventListener("equipment:refreshRequested",()=>{Xn({showToastOnError:!1})});document.addEventListener(Bc.USER_UPDATED,()=>{Qe()});document.addEventListener("equipment:changed",()=>{_r()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{Zt=null,Ea(),rn=null,on=null,wn(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!$i&&(document.addEventListener($n.change,()=>{Er(),Qe()}),$i=!0);const Pm=Object.freeze(Object.defineProperty({__proto__:null,clearEquipment:Ar,refreshEquipmentFromApi:Xn,renderEquipment:Qe,syncEquipmentStatuses:Cn,uploadEquipmentFromExcel:_l},Symbol.toStringTag,{value:"Module"})),Ml="__DEBUG_CREW__";function zl(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(Ml);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function Li(e,t){if(zl())try{console.log(`🪵 [crew-debug:create] ${e}`,t)}catch{}}const kr="projects:create:draft",Pr="projects.html#projects-section";let vs=null,$r=[],qs=new Map,Ss=new Map,Aa=new Map,ls=!1,da=null,Ni=!1,Cr=[];function Hl(e){if(!e)return null;let t=Cr.find(a=>a.id===e)||null;if(t)return t;const n=Os(e);return n?(t={id:e,name:Hc(n)||e,price:zc(n),items:zs(n),raw:n},t):null}function wa(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function xa(e){return h(String(e||"")).trim().toLowerCase()}function Ol(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function Lr(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function Nr(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function jr(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Tr(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function ln(e){switch(e){case"maintenance":return c("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return c("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return c("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return c("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function ni(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function pn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function st(){const{input:e,hidden:t}=pn();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function Jt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const i=document.querySelector(`label[for="${e.id}"]`);i&&n.add(i)}const s=i=>{t()&&E(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(i=>{!i||i.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(r=>{i.addEventListener(r,s,{capture:!0})}),i.dataset.linkedGuardAttached="true")})}function Br(e,t,{allowPartial:n=!1}={}){const a=et(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const i=[];return e.forEach((r,o)=>{o.includes(a)&&i.push(r)}),i.length===1?i[0]:null}function Es(e,t={}){return Br(qs,e,t)}function As(e,t={}){return Br(Ss,e,t)}function it(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function Dr(e){$r=Array.isArray(e)?[...e]:[]}function ai(){return $r}function si(e){return e&&ai().find(t=>String(t.id)===String(e))||null}function ji(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||c("projects.fallback.untitled","مشروع بدون اسم")}function xn(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??an,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:an}function pt(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??an,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=an),t.dataset.companyShare=String(s),t.checked=!0}function ws(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(ls){be();return}ls=!0;const a=()=>{ls=!1,be()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(an)),t.disabled){n.checked=!1,E(c("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),pt()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?pt():n.checked&&(n.checked=!1));a()}function Vl(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Ti(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function Bi(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function Pt({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=ni();if(!n||!a||!s)return;const i=Ms()||[],r=c("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),o=c("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",r);const l=new Set;qs=new Map;const d=i.filter(p=>p&&p.id!=null).map(p=>({id:String(p.id),label:Bi(p)||o})).filter(p=>{if(!p.label)return!1;const m=et(p.label);return!m||l.has(m)?!1:(l.add(m),qs.set(m,p),!0)}).sort((p,m)=>p.label.localeCompare(m.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(p=>`<option value="${wa(p.label)}"></option>`).join("");const u=t?"":n.value,b=e?String(e):a.value?String(a.value):"",y=b?i.find(p=>String(p.id)===b):null;if(y){const p=Bi(y)||o;a.value=String(y.id),n.value=p,n.dataset.selectedId=String(y.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function In({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:i}=pn();if(!a||!s||!i)return;const r=Array.isArray(t)?t:ai()||[],o=c("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",o);const l=[...r].filter(g=>g&&g.id!=null).sort((g,v)=>String(v.createdAt||v.start||"").localeCompare(String(g.createdAt||g.start||""))),d=n?"":a.value,u=c("projects.fallback.untitled","مشروع بدون اسم"),b=new Set;Ss=new Map;const y=l.map(g=>{const v=ji(g)||u;return{id:String(g.id),label:v}}).filter(g=>{if(!g.label)return!1;const v=et(g.label);return!v||b.has(v)?!1:(b.add(v),Ss.set(v,g),!0)});i.innerHTML=y.map(g=>`<option value="${wa(g.label)}"></option>`).join("");const p=e?String(e):s.value?String(s.value):"",m=p?l.find(g=>String(g.id)===p):null;if(m){const g=ji(m)||u;s.value=String(m.id),a.value=g,a.dataset.selectedId=String(m.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function Ia(e,t,n){const{date:a,time:s}=or(n),i=document.getElementById(e),r=document.getElementById(t);if(i){if(a)if(i._flatpickr){const o=i._flatpickr.config?.dateFormat||"Y-m-d";i._flatpickr.setDate(a,!1,o)}else i.value=a;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}if(r){if(s)if(r._flatpickr){const o=r._flatpickr.config?.dateFormat||"H:i";r._flatpickr.setDate(s,!1,o)}else r.value=s;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}}function Fr(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||In({selectedValue:a});const i=(Ms()||[]).find(u=>String(u.id)===String(e.clientId)),r=i?.id!=null?String(i.id):"";Pt(r?{selectedValue:r}:{selectedValue:"",resetInput:!0});const o=Ti(e,"start"),l=Ti(e,"end");o&&Ia("res-start","res-start-time",o),l&&Ia("res-end","res-end-time",l);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),be(),Ot()}function Rr({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:me(),s=Array.isArray(a)?a:[];Dr(s);const i=t!=null?String(t):n.value?String(n.value):"";In({selectedValue:i,projectsList:s}),Ot(),be()}function Ot(){const{input:e,hidden:t}=pn(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),i=document.getElementById("res-payment-progress-type"),r=document.getElementById("res-payment-progress-value"),o=document.getElementById("res-discount"),l=document.getElementById("res-discount-type"),d=c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),b=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(Jt(n,st),a&&Jt(a,st)),s&&Jt(s,st),i&&Jt(i,st),r&&Jt(r,st),o&&Jt(o,st),l&&Jt(l,st),b)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=d),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=d),s&&(s.value="unpaid",it(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=d),i&&(i.value=i.value||"percent",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=d),r&&(r.value="",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=d),o&&(o.value="0",o.disabled=!0,o.classList.add("reservation-input-disabled"),o.title=d),l&&(l.value="percent",l.disabled=!0,l.classList.add("reservation-input-disabled"),l.title=d);else{if(n){const y=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",y&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),o&&(o.disabled=!1,o.classList.remove("reservation-input-disabled"),o.title=""),l&&(l.disabled=!1,l.classList.remove("reservation-input-disabled"),l.title="")}ws("tax"),be()}function ii(){const{input:e,hidden:t}=pn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),i=s?As(s,{allowPartial:a}):null;if(i){t.value=String(i.id),e.value=i.label,e.dataset.selectedId=String(i.id);const r=si(i.id);r?Fr(r,{skipProjectSelectUpdate:!0}):(Ot(),be())}else t.value="",e.dataset.selectedId="",Ot(),be()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?As(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function ri(){const{input:e,hidden:t}=ni();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),i=s?Es(s,{allowPartial:a}):null;i?(t.value=String(i.id),e.value=i.label,e.dataset.selectedId=String(i.id)):(t.value="",e.dataset.selectedId=""),be()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Es(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Ul(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){Rn({clearValue:!0});return}let n=null;try{const d=decodeURIComponent(t);n=JSON.parse(d)}catch(d){console.warn("⚠️ [reservations/createForm] Failed to decode project context",d)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),Rn({clearValue:!1}),!n)return;n.fromProjectForm&&(da={draftStorageKey:n.draftStorageKey||kr,returnUrl:n.returnUrl||Pr});const i=document.getElementById("res-project");if(n.projectId){i&&(In({selectedValue:String(n.projectId)}),Ot());const d=si(n.projectId);d?Fr(d,{forceNotes:!!n.forceNotes}):be(),Rn()}else{i&&In({selectedValue:""});const d=n.projectTitle?n.projectTitle:c("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");rd(c("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),d)}n.start&&Ia("res-start","res-start-time",n.start),n.end&&Ia("res-end","res-end-time",n.end);const r=document.getElementById("res-customer-input"),o=document.getElementById("res-customer");if(n.customerId){const u=(Ms()||[]).find(b=>String(b.id)===String(n.customerId));u?.id!=null&&(Pt({selectedValue:String(u.id)}),o&&(o.value=String(u.id)),r&&(r.value=u.customerName||u.name||r.value))}else n.customerName&&r?(Pt({selectedValue:""}),r.value=n.customerName,r.dataset.selectedId="",o&&(o.value="")):Pt({selectedValue:""});const l=document.getElementById("res-notes");l&&n.description&&!l.value&&(l.value=n.description),be()}function fn(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Vn(e,n),end:Vn(t,a)}}function Mr(e){const t=xa(e);if(t){const o=Aa.get(t);if(o)return o}const{description:n,barcode:a}=Lr(e);if(a){const o=Ma(a);if(o)return o}const s=et(n||e);if(!s)return null;let i=cr();if(!i?.length){const o=me();i=Array.isArray(o?.equipment)?o.equipment:[],i.length&&mr(i)}const r=i.find(o=>et(o?.desc||o?.description||"")===s);return r||i.find(o=>et(o?.desc||o?.description||"").includes(s))||null}function zr(e,t="equipment-description-options"){const n=xa(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(l=>xa(l.value)===n)||Aa.has(n))return!0;const{description:s}=Lr(e);if(!s)return!1;const i=et(s);return i?(cr()||[]).some(o=>et(o?.desc||o?.description||"")===i):!1}const Kl={available:0,reserved:1,maintenance:2,retired:3};function Ql(e){return Kl[e]??5}function Di(e){switch(e){case"available":return c("reservations.equipment.status.available","متاح");case"reserved":return c("reservations.equipment.status.reserved","محجوز");case"maintenance":return c("reservations.equipment.status.maintenance","صيانة");case"retired":return c("reservations.equipment.status.retired","خارج الخدمة");default:return c("reservations.equipment.status.unknown","الحالة غير معروفة")}}function Gl(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${Di(n)}`;const a=c("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${Di(n)})`}function Vt(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=Cn(),a=me(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],i=Array.isArray(s)?s:[];mr(i);const r=new Map;i.forEach(d=>{const u=Ol(d),b=xa(u);if(!b||!u)return;const y=Ct(d),p=Ql(y),m=r.get(b);if(!m){r.set(b,{normalized:b,value:u,bestItem:d,bestStatus:y,bestPriority:p,statuses:new Set([y])});return}m.statuses.add(y),p<m.bestPriority&&(m.bestItem=d,m.bestStatus=y,m.bestPriority=p,m.value=u)}),Aa=new Map;const l=Array.from(r.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{Aa.set(d.normalized,d.bestItem);const u=Gl(d),b=wa(d.value);if(u===d.value)return`<option value="${b}"></option>`;const y=wa(u);return`<option value="${b}" label="${y}"></option>`}).join("");e&&(e.innerHTML=l),t&&(t.innerHTML=l)}function Hr(e,t,n={}){const{silent:a=!1}=n,s=re(e);if(!s)return{success:!1,message:null};const{start:i,end:r}=fn();if(!i||!r){const m=c("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||E(m),{success:!1,message:m}}const o=At();if(oi(o).has(s)){const m=c("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||E(m),{success:!1,message:m}}const d=Hs(s,i,r);if(d.length){const m=d.map(v=>v.name).join(", "),g=c("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`);return a||E(g),{success:!1,message:g}}if(Et(s,i,r)){const m=c("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||E(m),{success:!1,message:m}}const u=Ma(s);if(!u){const m=c("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||E(m),{success:!1,message:m}}const b=Ct(u);if(b==="maintenance"||b==="retired"){const m=ln(b);return a||E(m),{success:!1,message:m}}const y=un(u);if(!y){const m=c("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||E(m),{success:!1,message:m}}Ba({id:y,equipmentId:y,barcode:s,desc:u.desc,qty:1,price:u.price,image:mn(u)}),t&&(t.value=""),Lt(),be();const p=c("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||E(p),{success:!0,message:p,barcode:s}}function xs(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Mr(t);if(!n){E(c("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=bl(n.barcode),s=Ct(a||n);if(s==="maintenance"||s==="retired"){E(ln(s));return}const i=re(n.barcode);if(!i){E(c("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const r=un(n);if(!r){E(c("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const o={id:r,equipmentId:r,barcode:i,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:mn(n)},{start:l,end:d}=fn();if(!l||!d){E(c("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=At();if(oi(u).has(i)){E(c("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const y=Hs(i,l,d);if(y.length){const p=y.map(m=>m.name).join(", ");E(c("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${p}`));return}if(Et(i,l,d)){E(c("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}Ba(o),Lt(),be(),E(c("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function Wl(){Vt();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),xs(e))});const t=()=>{zr(e.value,"equipment-description-options")&&xs(e)};e.addEventListener("focus",()=>{if(Vt(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Fi(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function oi(e=At()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=re(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const i=re(s?.normalizedBarcode??s?.barcode);i&&t.add(i)})}),t}function Xl(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=fn();if(!t||!n){E(c("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}ll({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):E(c("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener($n.change,t=>{Fi(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),Fi(e,qr()))}function Jl(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,i=a.length?a:t.barcode?[t.barcode]:[];if(!i.length)return;let r=0,o=null;const l=[],d=new Set;i.forEach(b=>{const y=re(b);y&&!d.has(y)&&(d.add(y),l.push(y))});const u=Math.min(s,l.length);for(let b=0;b<u;b+=1){const y=l[b],p=Hr(y,null,{silent:!0});p.success&&(r+=1),p.message&&(o=p.message)}if(r>0){const y=c("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",h(String(r)));E(y)}else o&&E(o)}function Or(){Xl(),!(Ni||typeof document>"u")&&(document.addEventListener($n.requestAdd,Jl),Ni=!0)}function Jn(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),i=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:i}}function Is(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=Jn();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const i=document.getElementById("equipment-barcode"),r=document.getElementById("equipment-description"),o=t==="package";i&&(i.disabled=o),r&&(r.disabled=o),s&&(s.disabled=t!=="package"||s.options.length===0),Qc(t),t==="package"&&Qa()}function Qa(){const{packageSelect:e,packageHint:t}=Jn();if(!e)return;const n=ir();Cr=n,Rc(n.map(o=>o.raw??o));const a=c("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${c("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,i=n.map(o=>{const l=Number.isFinite(Number(o.price))?Number(o.price):0,d=h(l.toFixed(2)),u=`${o.name} — ${d} ${a}`;return`<option value="${o.id}">${u}</option>`}).join("");e.innerHTML=`${s}${i}`,e.selectedIndex=0;const r=n.length>0;e.disabled=!r,t&&(r?(t.textContent=c("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=c("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),Kr()}function Yl(e,t){const n=e?.name||c("reservations.create.packages.genericName","الحزمة"),a=c("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:i,blockingPackages:r})=>{const o=i?.desc||h(String(i?.barcode??i?.normalizedBarcode??""))||c("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(r)&&r.length){const l=r.map(d=>d.name).join(", ");return`• ${o} (${c("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${l})`}return`• ${o} (${c("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function Vr(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const i=Un(e);if(!i)return{success:!1,reason:"invalid",message:c("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const r=Hl(i);if(!r)return{success:!1,reason:"not_found",message:c("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:c("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(p=>p?.type==="package"&&Un(p.packageId)===i))return{success:!1,reason:"duplicate",message:c("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(Mc(i,n,a,s)){const p=r.name||i;return{success:!1,reason:"package_conflict",message:c("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${p} محجوزة بالفعل في الفترة المختارة`)}}const o=Array.isArray(r.items)&&r.items.length?r.items:zs(r.raw??{}),l=oi(t),d=[],u=new Set;if(o.forEach(p=>{const m=re(p?.normalizedBarcode??p?.barcode);if(m){if(u.has(m)){d.push({item:p,type:"internal"});return}u.add(m),l.has(m)&&d.push({item:p,type:"external"})}}),d.length){const p=d.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||c("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>h(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:d.some(g=>g.type==="external")?c("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",p):c("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",p),duplicates:d}}const b=[];return o.forEach(p=>{const m=re(p?.normalizedBarcode??p?.barcode);if(m&&Et(m,n,a,s)){const g=Hs(m,n,a,s);b.push({item:p,blockingPackages:g})}}),b.length?{success:!1,reason:"item_conflict",message:Yl(r,b),conflicts:b}:{success:!0,package:{id:`package::${i}`,packageId:i,type:"package",desc:r.name||`Package ${i}`,qty:1,price:Number.isFinite(Number(r.price))?Number(r.price):0,barcode:r.code||r.raw?.package_code||`pkg-${i}`,packageItems:o.map(p=>({equipmentId:p?.equipmentId??null,barcode:p?.barcode??p?.normalizedBarcode??"",normalizedBarcode:re(p?.normalizedBarcode??p?.barcode),desc:p?.desc??"",qty:Number.isFinite(Number(p?.qty))?Number(p.qty):1,price:Number.isFinite(Number(p?.price))?Number(p.price):0})),image:o.find(p=>p?.image)?.image??null},packageInfo:r}}function Ur(e,{silent:t=!1}={}){const n=Un(e);if(!n)return t||E(c("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=fn(),i=At(),r=Vr(n,{existingItems:i,start:a,end:s});if(!r.success){if(!t){const l={invalid:c("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:c("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:c("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:c("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[r.reason]||c("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");E(r.message||l)}return r}return Ba(r.package),Lt(),be(),t||E(c("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:r.package}}function Kr(){const{packageSelect:e}=Jn();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;Ur(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function Zl(){const{packageAddButton:e,packageSelect:t}=Jn();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){E(c("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}Ur(n)}),e.dataset.listenerAttached="true")}function Qr(){const{modeRadios:e}=Jn();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&Is(s.target.value)}),a.dataset.listenerAttached="true")}),Zl(),Kr();const t=ya(),n=e.find(a=>a.value===t);n&&(n.checked=!0),Is(t)}function Lt(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=At(),a=c("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=c("reservations.create.summary.currency","SR"),i=c("reservations.create.equipment.imageAlt","صورة"),r=c("reservations.equipment.actions.increase","زيادة الكمية"),o=c("reservations.equipment.actions.decrease","تقليل الكمية"),l=c("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=kn(n);t.innerHTML=d.map(u=>{const b=u.items[0]||{},y=mn(b)||u.image,p=y?`<img src="${y}" alt="${i}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=h(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,v=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,_=`${h(g.toFixed(2))} ${s}`,q=`${h(v.toFixed(2))} ${s}`,k=u.items.some(w=>w?.type==="package"),x=u.barcodes.map(w=>h(String(w||""))).filter(Boolean),K=x.length?`<details class="reservation-item-barcodes">
            <summary>${c("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${x.map(w=>`<li>${w}</li>`).join("")}
            </ul>
          </details>`:"";let S="";if(k){const w=new Map;if(u.items.forEach(L=>{Array.isArray(L?.packageItems)&&L.packageItems.forEach(N=>{if(!N)return;const W=re(N.barcode||N.desc||Math.random()),P=w.get(W);if(P){P.qty+=Number.isFinite(Number(N.qty))?Number(N.qty):1;return}w.set(W,{desc:N.desc||N.barcode||c("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(N.qty))?Number(N.qty):1,barcode:N.barcode??N.normalizedBarcode??""})})}),w.size){const L=Array.from(w.values()).map(N=>{const W=h(String(N.qty)),P=N.desc||h(String(N.barcode||"")),F=N.barcode?` <span class="reservation-package-items__barcode">(${h(String(N.barcode))})</span>`:"";return`<li>${P}${F} × ${W}</li>`}).join("");S=`
            <details class="reservation-package-items">
              <summary>${c("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${L}
              </ul>
            </details>
          `}}return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${p}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${k?`${S||""}${K||""}`:K}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${o}" ${k?"disabled":""}>−</button>
              <span class="reservation-qty-value">${m}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${r}" ${k?"disabled":""}>+</button>
            </div>
          </td>
          <td>${_}</td>
          <td>${q}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${l}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function ed(e){const t=At(),a=kn(t).find(i=>i.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Vc(s),Lt(),be())}function td(e){const t=At(),n=t.filter(a=>Da(a)!==e);n.length!==t.length&&(lr(n),Lt(),be())}function nd(e){const t=At(),a=kn(t).find(b=>b.key===e);if(!a)return;const{start:s,end:i}=fn();if(!s||!i){E(c("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const r=new Set(t.map(b=>re(b.barcode))),{equipment:o=[]}=me(),l=(o||[]).find(b=>{const y=re(b?.barcode);return!y||r.has(y)||Da({desc:b?.desc||b?.description||b?.name||"",price:Number(b?.price)||0})!==e||!Sr(b)?!1:!Et(y,s,i)});if(!l){E(c("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=re(l.barcode),u=un(l);if(!u){E(c("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}Ba({id:u,equipmentId:u,barcode:d,desc:l.desc||l.description||l.name||a.description||"",qty:1,price:Number.isFinite(Number(l.price))?Number(l.price):a.unitPrice,image:mn(l)}),Lt(),be()}function be(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,i=document.getElementById("res-tax"),r=e?!1:i?.checked||!1,o=document.getElementById("res-payment-status"),l=o?.value||"unpaid",{start:d,end:u}=fn();r&&pt();const b=xn(),y=document.getElementById("res-payment-progress-type"),p=document.getElementById("res-payment-progress-value"),m=Nr(y),g=jr(p);rr(),ki({selectedItems:At(),discount:n,discountType:s,applyTax:r,paidStatus:l,paymentProgressType:m,paymentProgressValue:g,start:d,end:u,companySharePercent:b,paymentHistory:[]});const v=ki.lastResult;v?(Tr(p,v.paymentProgressValue),o&&(o.value=v.paymentStatus,it(o,v.paymentStatus))):it(o,l)}function ad(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",o=>{o.target.value=h(o.target.value),be()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",be),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(st()){n.checked=!1,E(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}ws("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(st()){a.checked=!1,E(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}ws("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(st()){s.value="unpaid",it(s,"unpaid"),E(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}it(s),be()}),s.dataset.listenerAttached="true");const i=document.getElementById("res-payment-progress-type");i&&!i.dataset.listenerAttached?(i.dataset.userSelected!=="true"&&(i.value="percent"),i.addEventListener("change",o=>{if(st()){i.value="percent",E(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}i.dataset.userSelected="true",be()}),i.dataset.listenerAttached="true"):i&&i.dataset.userSelected!=="true"&&!i.value&&(i.value="percent");const r=document.getElementById("res-payment-progress-value");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",o=>{if(st()){r.value="",E(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}o.target.value=h(o.target.value),be()}),r.dataset.listenerAttached="true"),be()}function sd(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){be();return}const i=t.dataset.syncedWithStart;(!t.value?.trim()||i!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),be()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Ri(){const{input:e,hidden:t}=ni(),{input:n,hidden:a}=pn(),{customers:s}=me();let i=t?.value?String(t.value):"";if(!i&&e?.value){const G=Es(e.value,{allowPartial:!0});G&&(i=String(G.id),t&&(t.value=i),e.value=G.label,e.dataset.selectedId=i)}const r=s.find(G=>String(G.id)===i);if(!r){E(c("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const o=r.id;let l=a?.value?String(a.value):"";if(!l&&n?.value){const G=As(n.value,{allowPartial:!0});G&&(l=String(G.id),a&&(a.value=l),n.value=G.label,n.dataset.selectedId=l)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,b=document.getElementById("res-start-time")?.value||"00:00",y=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){E(c("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const p=`${d}T${b}`,m=`${u}T${y}`,g=new Date(p),v=new Date(m);if(Number.isNaN(g.getTime())||Number.isNaN(v.getTime())||g>=v){E(c("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const _=rr();_.map(G=>G.technicianId).filter(Boolean);const q=At();if(q.length===0&&_.length===0){E(c("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const k=document.getElementById("res-notes")?.value||"",x=parseFloat(h(document.getElementById("res-discount")?.value))||0,K=document.getElementById("res-discount-type")?.value||"percent",S=document.getElementById("res-payment-status"),w=S?.value||"unpaid",L=document.getElementById("res-payment-progress-type"),N=document.getElementById("res-payment-progress-value"),W=Nr(L),P=jr(N),F=l?si(l):null,X=Vl(F);if(l&&!F){E(c("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const G of q){const te=Ct(G.barcode);if(te==="maintenance"||te==="retired"){E(ln(te));return}}for(const G of q){const te=re(G.barcode);if(Et(te,p,m)){E(c("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const G of _)if(G?.technicianId&&dr(G.technicianId,p,m)){E(c("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const j=document.getElementById("res-tax"),T=document.getElementById("res-company-share"),$=!!l;$?(j&&(j.checked=!1,j.disabled=!0,j.classList.add("disabled"),j.title=c("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),T&&(T.checked=!1,T.disabled=!0,T.classList.add("disabled"),T.title=c("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),S&&(S.value="unpaid",S.disabled=!0,it(S,"unpaid"),S.title=c("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),L&&(L.disabled=!0,L.classList.add("disabled")),N&&(N.value="",N.disabled=!0,N.classList.add("disabled"))):(j&&(j.disabled=!1,j.classList.remove("disabled"),j.title=""),T&&(T.disabled=!1,T.classList.remove("disabled"),T.title=""),S&&(S.disabled=!1,S.title=""),L&&(L.disabled=!1,L.classList.remove("disabled")),N&&(N.disabled=!1,N.classList.remove("disabled")));const O=$?!1:j?.checked||!1,Q=!!T?.checked;if(!$&&Q!==O){E(c("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let D=Q?xn():null;Q&&(!Number.isFinite(D)||D<=0)&&(pt(),D=xn());const J=Q&&O&&Number.isFinite(D)&&D>0;O&&pt();const B=Vs(q,x,K,O,_,{start:p,end:m,companySharePercent:J?D:0}),V=Dc(),R=Us({totalAmount:B,progressType:W,progressValue:P,history:[]});N&&Tr(N,R.paymentProgressValue);const ee=[];R.paymentProgressValue!=null&&R.paymentProgressValue>0&&ee.push({type:R.paymentProgressType||W,value:R.paymentProgressValue,amount:R.paidAmount,percentage:R.paidPercent,recordedAt:new Date().toISOString()});const ue=Ks({manualStatus:w,paidAmount:R.paidAmount,paidPercent:R.paidPercent,totalAmount:B});S&&(S.value=ue,it(S,ue));const le=typeof F?.paymentStatus=="string"?F.paymentStatus.toLowerCase():null,Ee=le&&["paid","partial","unpaid"].includes(le)?le:"unpaid",ge=ur({reservationCode:V,customerId:o,start:p,end:m,status:X?"confirmed":"pending",title:null,location:null,notes:k,projectId:l||null,totalAmount:B,discount:$?0:x,discountType:$?"percent":K,applyTax:O,paidStatus:$?Ee:ue,confirmed:X,items:q.map(G=>({...G,equipmentId:G.equipmentId??G.id})),crewAssignments:_,companySharePercent:$||!J?null:D,companyShareEnabled:$?!1:J,paidAmount:$?0:R.paidAmount,paidPercentage:$?0:R.paidPercent,paymentProgressType:$?null:R.paymentProgressType,paymentProgressValue:$?null:R.paymentProgressValue,paymentHistory:$?[]:ee});try{Li("about to submit",{crewAssignments:_,techniciansPayload:ge?.technicians,payload:ge});const G=await Uc(ge);Li("server response",{reservation:G?.id??G?.reservationId??G?.reservation_code,technicians:G?.technicians,crewAssignments:G?.crewAssignments,techniciansDetails:G?.techniciansDetails}),Cn(),Vt(),sn(),od(),E(c("reservations.toast.created","✅ تم إنشاء الحجز"));try{const te=document.getElementById("sub-tab-trigger-my-reservations-tab");te&&typeof te.click=="function"&&setTimeout(()=>te.click(),0)}catch{}typeof vs=="function"&&vs({type:"created",reservation:G}),id(G)}catch(G){console.error("❌ [reservations/createForm] Failed to create reservation",G);const te=Fa(G)?G.message:c("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");E(te,"error"),$&&(E(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),Rn({clearValue:!1}))}}function id(e){if(!da)return;const{draftStorageKey:t=kr,returnUrl:n=Pr}=da,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),i=s?JSON.parse(s)||{}:{},r=Array.isArray(i.linkedReservationIds)?i.linkedReservationIds:[],o=String(a);r.includes(o)||r.push(o),i.linkedReservationIds=r,window.sessionStorage.setItem(t,JSON.stringify(i))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}da=null,n&&(window.location.href=n)}function Rn({clearValue:e=!1}={}){const{input:t,hidden:n}=pn();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,Ot())}function rd(e,t=""){const{input:n,hidden:a}=pn();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),Ot())}function od(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),Pt({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),Rn({clearValue:!1}),In({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const i=document.getElementById("res-payment-status");i&&(i.value="unpaid",it(i,"unpaid"));const r=document.getElementById("res-payment-progress-type");r&&(r.value="percent");const o=document.getElementById("res-payment-progress-value");o&&(o.value=""),Kc(),lr([]),ha("form-reset"),Lt(),Ot(),be()}function cd(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){ed(s);return}if(a==="increase-group"&&s){nd(s);return}if(a==="remove-group"&&s){td(s);return}}),e.dataset.listenerAttached="true")}function ld(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(ya()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,Hr(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||ya()!=="single")return;const{start:i,end:r}=fn();!i||!r||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function dd(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Ri()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Ri()}),t.dataset.listenerAttached="true")}function $m({onAfterSubmit:e}={}){vs=typeof e=="function"?e:null;const{customers:t,projects:n}=me();Oc(t||[]),Pt(),ri(),Dr(n||[]),Rr({projectsList:n}),ii(),Vt(),Qa(),Wl(),Or(),Qr(),sd(),ad(),cd(),ld(),dd(),Ul(),be(),Lt()}function Gr(){Vt(),Qa(),Rr(),Pt(),ri(),ii(),Or(),Qr(),Lt(),be()}if(typeof document<"u"){const e=()=>{Pt(),In({projectsList:ai()}),ri(),ii(),be()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{Vt()}),document.addEventListener("packages:changed",()=>{Qa(),ya()==="package"&&Is("package")})}typeof window<"u"&&(window.getCompanySharePercent=xn);function Wr(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:Yt(t),endDate:Yt(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const i=new Date(n);return i.setDate(n.getDate()+6),{startDate:Yt(n),endDate:Yt(i)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Yt(n),endDate:Yt(a)}}return e==="upcoming"?{startDate:Yt(t),endDate:""}:{startDate:"",endDate:""}}function ud(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let i=h(t?.value||"").trim(),r=h(n?.value||"").trim(),o=a?.value||"";if(new Set(["","today","week","month"]).has(o)||(o="",a&&(a.value=""),_a(t),_a(n),i="",r=""),!i&&!r&&o){const d=Wr(o);i=d.startDate,r=d.endDate}return{searchTerm:et(e?.value||""),startDate:i,endDate:r,status:s?.value||"",quickRange:o}}function Cm(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),s.dataset.listenerAttached="true");const i=document.getElementById("reservation-date-range");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>{md(i.value),t()}),i.dataset.listenerAttached="true");const r=document.getElementById("reservation-status-filter");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",t),r.dataset.listenerAttached="true");const o=document.getElementById("clear-filters");o&&!o.dataset.listenerAttached&&(o.addEventListener("click",()=>{n&&(n.value=""),_a(a),_a(s),i&&(i.value=""),r&&(r.value=""),t()}),o.dataset.listenerAttached="true")}function md(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=Wr(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function Yt(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function _a(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function ra(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function pd(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function fd(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=pd(n);if(a!==null)return a}return null}function Mi(e,t=0){const n=fd(e);if(n!=null)return n;const a=ra(e.createdAt??e.created_at);if(a!=null)return a;const s=ra(e.updatedAt??e.updated_at);if(s!=null)return s;const i=ra(e.start);if(i!=null)return i;const r=ra(e.end);if(r!=null)return r;const o=Number(e.id??e.reservationId);return Number.isFinite(o)?o:Number.isFinite(t)?t:0}function yd({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const i=e.map((q,k)=>({reservation:q,index:k})),r=t.searchTerm||"",o=t.searchReservationId||"",l=t.searchCustomerName||"",d=t.searchProjectId||"",u=t.startDate||"",b=t.endDate||"",y=t.status||"",p=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,m=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,v=b?new Date(`${b}T23:59:59`):null,_=i.filter(({reservation:q})=>{const k=n.get(String(q.customerId)),x=s?.get?.(String(q.projectId)),K=q.start?new Date(q.start):null,S=Qs(q),{effectiveConfirmed:w}=Ut(q,x);if(p!=null&&String(q.customerId)!==String(p)||m!=null&&!(Array.isArray(q.technicians)?q.technicians.map(F=>String(F)):[]).includes(String(m))||y==="confirmed"&&!w||y==="pending"&&w||y==="completed"&&!S)return!1;if(y==="cancelled"){const P=String(q?.status||q?.reservationStatus||"").toLowerCase();if(!["cancelled","canceled"].includes(P))return!1}if(g&&K&&K<g||v&&K&&K>v)return!1;if(o){const P=[q.reservationId,q.id,q.reservation_id,q.reservationCode,q.reservation_code,q.code,q.reference,q.referenceNumber,q.reference_number],F=et(P.filter(j=>j!=null&&j!=="").map(String).join(" ")).replace(/\s+/g,""),X=o.replace(/\s+/g,"");if(!F.includes(X))return!1}if(l&&!et(k?.customerName||"").includes(l))return!1;if(d){const P=[q.projectId,q.project_id,q.projectID,x?.id,x?.projectCode,x?.project_code],F=et(P.filter(j=>j!=null&&j!=="").map(String).join(" ")).replace(/\s+/g,""),X=d.replace(/\s+/g,"");if(!F.includes(X))return!1}if(!r)return!0;const L=q.items?.map?.(P=>`${P.barcode} ${P.desc}`).join(" ")||"",N=(q.technicians||[]).map(P=>a.get(String(P))?.name).filter(Boolean).join(" ");return et([q.reservationId,k?.customerName,q.notes,L,N,x?.title].filter(Boolean).join(" ")).includes(r)});return _.sort((q,k)=>{const x=Mi(q.reservation,q.index),K=Mi(k.reservation,k.index);return x!==K?K-x:k.index-q.index}),_}function bd({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=c("reservations.create.summary.currency","SR"),i=c("reservations.list.taxIncludedShort","(شامل الضريبة)"),r=c("reservations.list.unknownCustomer","غير معروف"),o=c("reservations.list.noNotes","لا توجد ملاحظات"),l=c("reservations.list.itemsCountShort","{count} عنصر"),d=c("reservations.list.crew.separator","، "),u=c("reservations.list.status.confirmed","✅ مؤكد"),b=c("reservations.list.status.pending","⏳ غير مؤكد"),y=c("reservations.list.status.completed","📁 منتهي"),p=c("reservations.list.payment.paid","💳 مدفوع"),m=c("reservations.list.payment.unpaid","💳 غير مدفوع"),g=c("reservations.list.payment.partial","💳 مدفوع جزئياً"),v=c("reservations.list.actions.confirm","✔️ تأكيد"),_=c("reservations.list.project.unlinked","غير مرتبط بمشروع"),q=c("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),k={client:c("reservations.list.labels.client","👤 العميل"),project:c("reservations.list.labels.project","📁 المشروع"),start:c("reservations.list.labels.start","🗓️ بداية الحجز"),end:c("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:c("reservations.list.labels.cost","💵 الإجمالي النهائي"),equipment:c("reservations.list.labels.equipment","📦 المعدات"),crew:c("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:x,index:K})=>{const S=t.get(String(x.customerId)),w=x.projectId?a?.get?.(String(x.projectId)):null,L=Qs(x),N=typeof w?.paymentStatus=="string"?w.paymentStatus.toLowerCase():null,W=x.paidStatus??x.paid_status??(x.paid===!0||x.paid==="paid"?"paid":"unpaid"),P=N&&["paid","partial","unpaid"].includes(N)?N:W,F=P==="paid",X=P==="partial",{effectiveConfirmed:j,projectLinked:T}=Ut(x,w),$=j?"status-confirmed":"status-pending",O=F?"status-paid":X?"status-partial":"status-unpaid";let Q=`<span class="reservation-chip status-chip ${$}">${j?u:b}</span>`;const D=F?p:X?g:m;let J=`<span class="reservation-chip status-chip ${O}">${D}</span>`,B=F?" tile-paid":X?" tile-partial":" tile-unpaid";L&&(B+=" tile-completed");let V="";L&&(Q=`<span class="reservation-chip status-chip status-completed">${y}</span>`,J=`<span class="reservation-chip status-chip status-completed">${D}</span>`,V=` data-completed-label="${c("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);let R=!T&&!j?`<button class="tile-confirm" data-reservation-index="${K}" data-action="confirm">${v}</button>`:"";{const z=String(x?.status||x?.reservationStatus||"").toLowerCase();(z==="cancelled"||z==="canceled")&&(Q=`<span class="reservation-chip status-chip status-cancelled">${c("reservations.list.status.cancelled","❌ ملغي")}</span>`,B=" tile-cancelled",V="",typeof R<"u"&&(R=""))}const ee=R?`<div class="tile-actions">${R}</div>`:"",ue=x.items?.length||0,le=Array.isArray(x.crewAssignments)?x.crewAssignments:[],Ee=(x.technicians||[]).map(z=>n.get(String(z))).filter(Boolean),ge=le.length?le.map(z=>{const Se=z.positionLabel??z.position_name??z.role??c("reservations.crew.positionFallback","منصب بدون اسم"),I=z.technicianName??n.get(String(z.technicianId??""))?.name??null;return I?`${h(Se)} (${h(I)})`:h(Se)}):Ee.map(z=>z.name),G=ge.length?ge.join(d):"—",te=h(String(x.reservationId??"")),Ie=x.start?h(rt(x.start)):"-",Te=x.end?h(rt(x.end)):"-",Ge=h(String(x.cost??0)),Y=h(String(ue)),ae=x.notes?h(x.notes):o,ce=l.replace("{count}",Y),qe=x.applyTax?`<small>${i}</small>`:"";let De=_;return x.projectId&&(De=w?.title?h(w.title):q),`
      <div class="${R?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${B}"${V} data-reservation-index="${K}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${te}</div>
          <div class="tile-badges">
            ${Q}
            ${J}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${k.client}</span>
            <span class="tile-value">${S?.customerName||r}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${k.project}</span>
            <span class="tile-value">${De}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${k.start}</span>
            <span class="tile-value tile-inline">${Ie}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${k.end}</span>
            <span class="tile-value tile-inline">${Te}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${k.cost}</span>
            <span class="tile-value">${Ge} ${s} ${qe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${k.equipment}</span>
            <span class="tile-value">${ce}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${k.crew}</span>
            <span class="tile-value">${ge.length?G:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${ae}</span>
          </div>
        </div>
        ${ee}
      </div>
    `}).join("")}function Ze(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ds(e){if(e==null)return"";const t=String(e).trim();return t?h(t):""}function zi(e,t,n=[],a,s=null){const{projectLinked:i,effectiveConfirmed:r}=Ut(e,s),o=e.paid===!0||e.paid==="paid",l=Qs(e),d=e.items||[];let{groups:u}=Gs(e);const b=f=>!!(f&&typeof f=="object"&&(f.type==="package"||Array.isArray(f.packageItems)&&f.packageItems.length||Array.isArray(f.items)&&f.items.some(H=>H&&H.type==="package"))),y=f=>{const H=(f?.package_code??f?.packageDisplayCode??f?.barcode??f?.description??(Array.isArray(f?.items)&&f.items[0]?.barcode)??"").toString().trim().toLowerCase();return h(H)},p=(f,H)=>{const se=Pe=>{const Be=Array.isArray(Pe?.items)?Pe.items[0]:null,Le=[Be?.price,Be?.unit_price,Be?.unitPrice,Pe?.unitPrice,Pe?.totalPrice];for(const Tt of Le){const Ve=Re(Tt);if(Number.isFinite(Ve)&&Ve>0)return Ve}return 0},fe=se(f),ve=se(H);return fe&&ve?fe<=ve?f:H:fe?f:H},m=[],g=new Map;u.forEach(f=>{if(!b(f)){m.push(f);return}const H=y(f);if(!H){if(!g.has("__unknown__"))g.set("__unknown__",m.length),m.push(f);else{const se=g.get("__unknown__");m[se]=p(m[se],f)}return}if(!g.has(H))g.set(H,m.length),m.push(f);else{const se=g.get(H);m[se]=p(m[se],f)}}),u=m;const{technicians:v=[]}=me(),_=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(v)?v:[]),q=new Map;_.forEach(f=>{if(!f||f.id==null)return;const H=String(f.id),se=q.get(H)||{};q.set(H,{...se,...f})});const x=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(f=>({technicianId:f}))).map((f,H)=>{const se=f?.technicianId!=null?q.get(String(f.technicianId)):null;let fe=f.positionLabel??f.position_name??f.position_label??f.role??f.position??"";(!fe||fe.trim()==="")&&(fe=f.positionLabelAr??f.position_label_ar??f.positionLabelEn??f.position_label_en??f.position_name_ar??f.position_name_en??"");const ve=f.positionLabelAlt??f.position_label_alt??f.positionLabelEn??f.position_label_en??f.positionLabelAr??f.position_label_ar??"";let Pe=fe,Be=ve;if(!Pe||Pe.trim()==="")try{const Ve=Dt?Dt():[];let ie=null;if(f.positionId!=null&&(ie=Ve.find(Ne=>String(Ne.id)===String(f.positionId))||null),!ie){const Ne=f.positionKey??f.position_key??f.positionName??f.position_name??f.position??"";if(Ne&&(ie=typeof ba=="function"?ba(Ne):null,!ie&&Ve.length)){const lt=String(Ne).trim().toLowerCase();ie=Ve.find(dt=>[dt.name,dt.labelAr,dt.labelEn].filter(Boolean).map(Bt=>String(Bt).toLowerCase()).includes(lt))||null}}ie&&(Pe=ie.labelAr||ie.labelEn||ie.name||"",(!Be||String(Be).trim()==="")&&(ie.labelAr&&ie.labelEn?Be=Pe===ie.labelAr?ie.labelEn:ie.labelAr:Be=ie.labelAr||ie.labelEn||""))}catch{}const Le=xe(Re(f.positionCost??f.position_cost??f.cost??f.daily_wage??f.dailyWage??se?.dailyWage??se?.wage??0)),Tt=xe(Re(f.positionClientPrice??f.position_client_price??f.client_price??f.clientPrice??f.daily_total??f.dailyTotal??f.total??se?.dailyTotal??se?.total??se?.total_wage??0));return{assignmentId:f.assignmentId??f.assignment_id??`crew-${H}`,positionId:f.positionId??f.position_id??null,positionKey:f.positionKey??f.position_key??f.positionName??f.position_name??f.position??null,positionLabel:Pe,positionLabelAlt:Be,positionLabelAr:f.positionLabelAr??f.position_label_ar??null,positionLabelEn:f.positionLabelEn??f.position_label_en??null,positionCost:Le,positionClientPrice:Tt,technicianId:f.technicianId!=null?String(f.technicianId):se?.id!=null?String(se.id):null,technicianName:f.technicianName??f.technician_name??se?.name??null,technicianRole:f.technicianRole??se?.role??null,technicianPhone:f.technicianPhone??se?.phone??null,notes:f.notes??null}}),K=dn(),S=Ra(e.start,e.end),w=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,L=Re(w),N=Number.isFinite(L)?L:0,W=e.discountType??e.discount_type??e.discountMode??"percent",P=String(W).toLowerCase()==="amount"?"amount":"percent",F=i?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),X=Re(e.cost??e.total??e.finalTotal),j=Number.isFinite(X),T=j?xe(X):0,$=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,O=$!=null?Re($):Number.NaN,J=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(O)&&O>0)&&Number.isFinite(O)?O:0,B=pr({items:d,technicianIds:e.technicians||[],crewAssignments:x,discount:N,discountType:P,applyTax:F,start:e.start,end:e.end,companySharePercent:J}),V=xe(B.equipmentTotal),R=xe(B.crewTotal);xe(B.crewCostTotal);const ee=xe(B.discountAmount),ue=xe(B.subtotalAfterDiscount),le=Number.isFinite(B.companySharePercent)?B.companySharePercent:0;let Ee=xe(B.companyShareAmount);Ee=le>0?xe(Math.max(0,Ee)):0;const ge=xe(B.taxAmount),G=xe(B.finalTotal),te=i?G:j?T:G,Ie=xe(B.netProfit),Te=h(String(e.reservationId??e.id??"")),Ge=e.start?h(rt(e.start)):"-",Y=e.end?h(rt(e.end)):"-",ae=h(String(x.length)),ce=h(V.toFixed(2)),qe=h(ee.toFixed(2)),De=h(ue.toFixed(2)),yt=h(ge.toFixed(2)),z=h((Number.isFinite(te)?te:0).toFixed(2)),Se=h(String(S)),I=c("reservations.create.summary.currency","SR"),ne=c("reservations.details.labels.discount","الخصم"),U=c("reservations.details.labels.tax","الضريبة (15%)"),pe=c("reservations.details.labels.crewTotal","إجمالي الفريق"),Ae=c("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),we=c("reservations.details.labels.duration","عدد الأيام"),Ue=c("reservations.details.labels.companyShare","🏦 نسبة الشركة"),We=c("reservations.details.labels.netProfit","💵 صافي الربح"),He=c("reservations.create.equipment.imageAlt","صورة"),Oe={item:c("reservations.equipment.table.item","المعدة"),quantity:c("reservations.equipment.table.quantity","الكمية"),unitPrice:c("reservations.equipment.table.unitPrice","سعر الوحدة"),total:c("reservations.equipment.table.total","الإجمالي"),actions:c("reservations.equipment.table.actions","الإجراءات")},Nt=c("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),M=c("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");c("reservations.details.technicians.roleUnknown","غير محدد");const ke=c("reservations.details.technicians.phoneUnknown","غير متوفر");c("reservations.details.technicians.wage","{amount} {currency} / اليوم");const he=c("reservations.list.status.confirmed","✅ مؤكد"),_e=c("reservations.list.status.pending","⏳ غير مؤكد"),bt=c("reservations.list.payment.paid","💳 مدفوع"),nt=c("reservations.list.payment.unpaid","💳 غير مدفوع"),Ye=c("reservations.list.payment.partial","💳 مدفوع جزئياً"),ea=c("reservations.list.status.completed","📁 منتهي"),ta=c("reservations.details.labels.id","🆔 رقم الحجز"),ts=c("reservations.details.section.bookingInfo","بيانات الحجز"),bn=c("reservations.details.section.paymentSummary","ملخص الدفع"),Fe=c("reservations.details.labels.finalTotal","المجموع النهائي"),Xe=c("reservations.details.section.crew","😎 الفريق الفني"),Wt=c("reservations.details.crew.count","{count} عضو"),xt=c("reservations.details.section.items","📦 المعدات المرتبطة"),na=c("reservations.details.items.count","{count} عنصر"),Yo=c("reservations.details.actions.edit","✏️ تعديل"),Zo=c("reservations.details.actions.delete","🗑️ حذف"),ec=c("reservations.details.labels.customer","العميل"),tc=c("reservations.details.labels.contact","رقم التواصل"),nc=c("reservations.details.labels.project","📁 المشروع المرتبط");c("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const ac=c("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),sc=c("reservations.details.actions.openProject","📁 فتح المشروع"),ic=c("reservations.details.labels.start","بداية الحجز"),rc=c("reservations.details.labels.end","نهاية الحجز"),oc=c("reservations.details.labels.notes","ملاحظات"),cc=c("reservations.list.noNotes","لا توجد ملاحظات"),lc=c("reservations.details.labels.itemsCount","عدد المعدات"),dc=c("reservations.details.labels.itemsTotal","إجمالي المعدات"),uc=c("reservations.paymentHistory.title","سجل الدفعات"),mc=c("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),pc=c("reservations.list.unknownCustomer","غير معروف"),ns=typeof s?.paymentStatus=="string"?s.paymentStatus.toLowerCase():null,aa=i&&ns&&["paid","partial","unpaid"].includes(ns)?ns:e.paidStatus??e.paid_status??(o?"paid":"unpaid"),as=aa==="partial",Ei=aa==="paid"?bt:as?Ye:nt;function ss(f){if(f==null)return Number.NaN;if(typeof f=="number")return Number.isFinite(f)?f:Number.NaN;const H=String(f).replace(/[^0-9.+-]/g,""),se=Number(H);return Number.isFinite(se)?se:Number.NaN}const sa=(f={})=>{const H=String(f.type??f.kind??f.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(H)||Array.isArray(f.packageItems)&&f.packageItems.length)},fc=(f={})=>[f.packageId,f.package_id,f.packageCode,f.package_code,f.bundleId,f.bundle_id].some(H=>H!=null&&H!==""),yc=(f={})=>!f||typeof f!="object"?!1:!sa(f)&&fc(f),bc=(f={})=>{const H=sa(f),se=[{value:f.qty,key:"qty",limit:999},{value:f.quantity,key:"quantity",limit:999},{value:f.units,key:"units",limit:999},{value:f.count,key:"count",limit:50},{value:f.package_quantity,key:"package_quantity",limit:999},{value:f.packageQty,key:"packageQty",limit:999},{value:f.packageCount,key:"packageCount",limit:999}];let fe=NaN;for(const ve of se){if(ve.value==null||ve.value==="")continue;const Pe=typeof ve.value=="string"?ve.value.trim():String(ve.value??"");if(ve.key==="count"&&Pe.length>6)continue;const Be=ss(ve.value);if(!Number.isFinite(Be)||Be<=0)continue;const Le=Math.round(Be);if(!(Le>ve.limit)){fe=Math.max(1,Le);break}}return(!Number.isFinite(fe)||fe<=0)&&(fe=1),H?Math.max(1,Math.min(99,fe)):Math.max(1,Math.min(9999,fe))};let gn=(Array.isArray(d)?d:[]).filter(f=>f&&typeof f=="object"&&!yc(f)).reduce((f,H)=>f+bc(H),0);(!Number.isFinite(gn)||gn<=0)&&(gn=Array.isArray(u)&&u.length?u.length:(Array.isArray(d)?d.length:0)||1),gn=Math.max(1,Math.round(gn));const gc=h(String(gn)),Ai=na.replace("{count}",gc),hc=Wt.replace("{count}",ae),vc=e.notes?h(e.notes):cc,qc=h(R.toFixed(2)),Sc=h(String(le)),Ec=h(Ee.toFixed(2)),Ac=`${Sc}% (${Ec} ${I})`,wc=Number.isFinite(Ie)?Math.max(0,Ie):0,xc=h(wc.toFixed(2)),jt=[{icon:"💼",label:dc,value:`${ce} ${I}`}];jt.push({icon:"😎",label:pe,value:`${qc} ${I}`}),ee>0&&jt.push({icon:"💸",label:ne,value:`${qe} ${I}`}),jt.push({icon:"📊",label:Ae,value:`${De} ${I}`}),F&&ge>0&&jt.push({icon:"🧾",label:U,value:`${yt} ${I}`}),le>0&&jt.push({icon:"🏦",label:Ue,value:Ac}),jt.push({icon:"💵",label:We,value:`${xc} ${I}`}),jt.push({icon:"💰",label:Fe,value:`${z} ${I}`});const Ic=jt.map(({icon:f,label:H,value:se})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${f} ${H}</span>
      <span class="summary-details-value">${se}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let at=[];i&&s&&(Array.isArray(s.paymentHistory)?at=s.paymentHistory:Array.isArray(s.payment_history)?at=s.payment_history:Array.isArray(s.payments)?at=s.payments:Array.isArray(s.paymentLogs)&&(at=s.paymentLogs)),(!Array.isArray(at)||at.length===0)&&(Array.isArray(e.paymentHistory)?at=e.paymentHistory:Array.isArray(e.payment_history)?at=e.payment_history:Array.isArray(e.paymentLogs)?at=e.paymentLogs:at=[]);const wi=Array.isArray(at)?at:[],_c=wi.length?`<ul class="reservation-payment-history-list">${wi.map(f=>{const H=f?.type==="amount"?c("reservations.paymentHistory.type.amount","دفعة مالية"):f?.type==="percent"?c("reservations.paymentHistory.type.percent","دفعة نسبة"):c("reservations.paymentHistory.type.unknown","دفعة"),se=Number.isFinite(Number(f?.amount))&&Number(f.amount)>0?`${h(Number(f.amount).toFixed(2))} ${I}`:"—",fe=Number.isFinite(Number(f?.percentage))&&Number(f.percentage)>0?`${h(Number(f.percentage).toFixed(2))}%`:"—",ve=f?.recordedAt?h(rt(f.recordedAt)):"—",Pe=f?.note?`<div class="payment-history-note">${Ze(h(f.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${Ze(H)}</span>
              <span class="payment-history-entry__amount">${se}</span>
              <span class="payment-history-entry__percent">${fe}</span>
              <span class="payment-history-entry__date">${ve}</span>
            </div>
            ${Pe}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${Ze(mc)}</div>`,xi=String(e?.status||e?.reservationStatus||"").toLowerCase(),Ii=xi==="cancelled"||xi==="canceled",_i=Ii?[{text:c("reservations.list.status.cancelled","❌ ملغي"),className:"status-cancelled"},{text:Ei,className:aa==="paid"?"status-paid":as?"status-partial":"status-unpaid"}]:[{text:r?he:_e,className:r?"status-confirmed":"status-pending"},{text:Ei,className:aa==="paid"?"status-paid":as?"status-partial":"status-unpaid"}];l&&!Ii&&_i.push({text:ea,className:"status-completed"});const kc=_i.map(({text:f,className:H})=>`<span class="status-chip ${H}">${f}</span>`).join(""),Xt=(f,H,se)=>`
    <div class="res-info-row">
      <span class="label">${f} ${H}</span>
      <span class="value">${se}</span>
    </div>
  `;let is="";if(e.projectId){let f=Ze(ac);if(s){const H=s.title||c("projects.fallback.untitled","مشروع بدون اسم");f=`${Ze(H)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${Ze(sc)}</button>`}is=`
      <div class="res-info-row">
        <span class="label">📁 ${nc}</span>
        <span class="value">${f}</span>
      </div>
    `}const It=[];It.push(Xt("👤",ec,t?.customerName||pc)),It.push(Xt("📞",tc,t?.phone||"—")),It.push(Xt("🗓️",ic,Ge)),It.push(Xt("🗓️",rc,Y)),It.push(Xt("📦",lc,Ai)),It.push(Xt("⏱️",we,Se)),It.push(Xt("📝",oc,vc)),is&&It.push(is);const Pc=It.join(""),$c=u.length?u.map(f=>{const H=f.items[0]||{},se=mn(H)||f.image,fe=se?`<img src="${se}" alt="${He}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let ve=[];if(Array.isArray(f.packageItems)&&f.packageItems.length)ve=[...f.packageItems];else{const ye=[];f.items.forEach($e=>{Array.isArray($e?.packageItems)&&$e.packageItems.length&&ye.push(...$e.packageItems)}),ve=ye}if(Array.isArray(ve)&&ve.length>1){const ye=new Set;ve=ve.filter($e=>{const oe=$e?.normalizedBarcode&&String($e.normalizedBarcode).toLowerCase()||$e?.barcode&&String($e.barcode).toLowerCase()||($e?.equipmentId!=null?`id:${$e.equipmentId}`:null);return oe?ye.has(oe)?!1:(ye.add(oe),!0):!0})}const Pe=sa(f)||f.items.some(ye=>sa(ye))||ve.length>0,Be=(ye,{fallback:$e=1,max:oe=1e3}={})=>{const Ce=ss(ye);return Number.isFinite(Ce)&&Ce>0?Math.min(oe,Ce):$e};let Le;if(Pe){const ye=Be(H?.qty??H?.quantity??H?.count,{fallback:NaN,max:999});Number.isFinite(ye)&&ye>0?Le=ye:Le=Be(f.quantity??f.count??1,{fallback:1,max:999})}else Le=Be(f.quantity??f.count??H?.qty??H?.quantity??H?.count??0,{fallback:1,max:9999});const Tt=h(String(Le)),Ve=(ye,{preferPositive:$e=!1}={})=>{let oe=Number.NaN;for(const Ce of ye){const ht=Re(Ce);if(Number.isFinite(ht)){if($e&&ht>0)return ht;Number.isFinite(oe)||(oe=ht)}}return oe};let ie,Ne;if(Pe){const ye=[H?.price,H?.unit_price,H?.unitPrice,f.unitPrice];if(ie=Ve(ye,{preferPositive:!0}),!Number.isFinite(ie)||ie<0){const oe=Re(f.totalPrice??H?.total??H?.total_price);Number.isFinite(oe)&&Le>0&&(ie=oe/Le)}Number.isFinite(ie)||(ie=0);const $e=[H?.total,H?.total_price,f.totalPrice];if(Ne=Ve($e),!Number.isFinite(Ne))Ne=ie*Le;else{const oe=ie*Le;Number.isFinite(oe)&&oe>0&&Math.abs(Ne-oe)>oe*.25&&(Ne=oe)}}else{const ye=[H?.price,H?.unit_price,H?.unitPrice,f.unitPrice];if(ie=Ve(ye,{preferPositive:!0}),!Number.isFinite(ie)||ie<0){const $e=Re(f.totalPrice??H?.total??H?.total_price);Number.isFinite($e)&&Le>0&&(ie=$e/Le)}Number.isFinite(ie)||(ie=0),Ne=Re(f.totalPrice??H?.total??H?.total_price),Number.isFinite(Ne)||(Ne=ie*Le)}ie=xe(ie),Ne=xe(Ne);const lt=`${h(ie.toFixed(2))} ${I}`,dt=`${h(Ne.toFixed(2))} ${I}`,Bt=f.barcodes.map(ye=>h(String(ye||""))).filter(Boolean),ut=Bt.length?`<details class="reservation-item-barcodes">
              <summary>${c("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${Bt.map(ye=>`<li>${ye}</li>`).join("")}
              </ul>
            </details>`:"";let gt="";if(ve.length){const ye=new Map,$e=oe=>{const Ce=ss(oe?.qtyPerPackage??oe?.perPackageQty??oe?.quantityPerPackage);return Number.isFinite(Ce)&&Ce>0&&Ce<=99?Math.round(Ce):1};if(ve.forEach(oe=>{if(!oe)return;const Ce=re(oe.barcode||oe.normalizedBarcode||oe.desc||Math.random());if(!Ce)return;const ht=ye.get(Ce),hn=$e(oe);if(ht){ht.qty=hn,ht.total=hn;return}ye.set(Ce,{desc:oe.desc||oe.barcode||c("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(hn,99)),total:Math.max(1,Math.min(hn,99)),barcode:oe.barcode??oe.normalizedBarcode??""})}),ye.size){const oe=Array.from(ye.values()).map(Ce=>{const ht=h(String(Ce.qty>0?Math.min(Ce.qty,99):1)),hn=Ze(Ce.desc||""),Tc=Ce.barcode?` <span class="reservation-package-items__barcode">(${Ze(h(String(Ce.barcode)))})</span>`:"";return`<li>${hn}${Tc} × ${ht}</li>`}).join("");gt=`
              <details class="reservation-package-items">
                <summary>${c("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${oe}
                </ul>
              </details>
            `}}const jc=Pe?`${gt||""}${ut||""}`:ut;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${fe}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${Ze(H.desc||H.description||H.name||f.description||"-")}</div>
                  ${jc}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Ze(Oe.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Tt}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Ze(Oe.unitPrice)}">${lt}</td>
            <td class="reservation-modal-items-table__cell" data-label="${Ze(Oe.total)}">${dt}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${Ze(Oe.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${Nt}</td></tr>`,Cc=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${Oe.item}</th>
            <th>${Oe.quantity}</th>
            <th>${Oe.unitPrice}</th>
            <th>${Oe.total}</th>
            <th>${Oe.actions}</th>
          </tr>
        </thead>
        <tbody>${$c}</tbody>
      </table>
    </div>
  `,Lc=x.map((f,H)=>{const se=h(String(H+1));let fe=f.positionLabel??f.position_name??f.position_label??f.position_title??f.role??f.position??null;if((!fe||fe.trim()==="")&&(fe=f.positionLabelAr??f.position_label_ar??f.position_title_ar??f.positionLabelEn??f.position_label_en??f.position_name_ar??f.position_title_en??f.position_name_en??null),!fe||fe.trim()==="")try{const lt=typeof Dt=="function"?Dt():[],dt=f.positionId?lt.find(gt=>String(gt.id)===String(f.positionId)):null,Bt=!dt&&f.positionKey?lt.find(gt=>String(gt.name).toLowerCase()===String(f.positionKey).toLowerCase()):null,ut=dt||Bt||null;ut&&(fe=ut.labelAr||ut.labelEn||ut.name||fe)}catch{}const ve=ds(fe)||c("reservations.crew.positionFallback","منصب بدون اسم"),Pe=ds(f.positionLabelAlt??f.position_label_alt??f.positionLabelEn??f.position_label_en??f.positionLabelAr??f.position_label_ar??f.position_name_en??f.position_name_ar??""),Be=ds(f.technicianName)||c("technicians.picker.noTechnicianOption","— بدون تعيين —"),Le=f.technicianPhone||ke,Tt=xe(Re(f.positionCost??f.position_cost??f.cost??f.daily_wage??f.dailyWage??f.internal_cost??0));let Ve=xe(Re(f.positionClientPrice??f.position_client_price??f.client_price??f.customer_price??f.position_price??f.clientPrice??f.daily_total??f.dailyTotal??f.total??0));if(!Number.isFinite(Ve)||Ve<=0)try{const lt=Dt?Dt():[],dt=f.positionId?lt.find(gt=>String(gt.id)===String(f.positionId)):null,Bt=!dt&&f.positionKey?lt.find(gt=>String(gt.name).toLowerCase()===String(f.positionKey).toLowerCase()):null,ut=dt||Bt||null;ut&&Number.isFinite(Number(ut.clientPrice))&&(Ve=xe(Number(ut.clientPrice)))}catch{}const ie=`${h(Ve.toFixed(2))} ${I}`,Ne=Tt>0?`${h(Tt.toFixed(2))} ${I}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${se}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${Be}</span>
            <small class="text-muted">🏷️ ${ve}${Pe?` — ${Pe}`:""}</small>
            <small class="text-muted">💼 ${ie}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${Le}</div>
          ${Ne?`<div>💵 ${c("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${Ne}</div>`:""}
        </div>
      </div>
    `}).join(""),Nc=x.length?`<div class="reservation-technicians-grid">${Lc}</div>`:`<ul class="reservation-modal-technicians"><li>${M}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${ta}</span>
          <strong>${Te}</strong>
        </div>
        <div class="status-chips">
          ${kc}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${ts}</h6>
          ${Pc}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${bn}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${Ic}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${uc}</h6>
              ${_c}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Xe}</span>
          <span class="count">${hc}</span>
        </div>
        ${Nc}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${xt}</span>
          <span class="count">${Ai}</span>
        </div>
        ${Cc}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${c("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${Yo}</button>
        ${K?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Zo}</button>`:""}
      </div>
    </div>
  `}const Lm="project",Nm="editProject",jm=3600*1e3,Xr=.15,Tm=6,Bm="projectsTab",Dm="projectsSubTab",Fm={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},Rm={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed",cancelled:"Cancelled",conflict:"Conflict"},gd=`@page {
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
`,hd=/color\([^)]*\)/gi,vd=/color-mix\([^)]*\)/gi,qd=/oklab\([^)]*\)/gi,Sd=/oklch\([^)]*\)/gi,zt=/(color\(|color-mix\(|oklab|oklch)/i,Ed=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke","boxShadow","textShadow","accentColor","caretColor","columnRuleColor"],Ad=typeof document<"u"?document.createElement("canvas"):null,oa=Ad?.getContext?.("2d")||null;function Jr(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function _s(e,t="#000"){if(!oa||!e)return t;try{return oa.fillStyle="#000",oa.fillStyle=e,oa.fillStyle||t}catch{return t}}function wd(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&zt.test(n)){const s=_s(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function qn(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function Yr(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const i=t.getComputedStyle(s);if(!i)return;Ed.forEach(o=>{const l=i[o];if(l&&zt.test(l)){const d=Jr(o);if(qn(n,s,d),o==="boxShadow"||o==="textShadow")s.style.setProperty(d,"none","important");else{const u=o==="backgroundColor"?"#ffffff":i.color||"#000000",b=_s(l,u);s.style.setProperty(d,b,"important")}}});const r=i.backgroundImage;if(r&&zt.test(r)){const o=_s(i.backgroundColor||"#ffffff","#ffffff");qn(n,s,"background-image"),qn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",o,"important")}})}function Zr(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const i=t.getComputedStyle(s);if(!i)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","boxShadow","textShadow","accentColor","caretColor","columnRuleColor"].forEach(o=>{const l=i[o];if(l&&zt.test(l)){const d=Jr(o);if(qn(n,s,d),o==="boxShadow"||o==="textShadow")s.style.setProperty(d,"none","important");else{const u=o==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(d,u,"important")}}});const r=i.backgroundImage;r&&zt.test(r)&&(qn(n,s,"background-image"),qn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function eo(e){if(!e)return;const t=(n="")=>{if(typeof n!="string")return n;let a=n;return zt.test(a)&&(a=a.replace(hd,"#000").replace(vd,"#000").replace(qd,"#000").replace(Sd,"#000")),a};e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&zt.test(a)&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&zt.test(a)&&n.setAttribute("style",t(a))})}const to="reservations.quote.sequence",Hi={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},no="https://help.artratio.sa/guide/quote-preview",ze={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},xd=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],tt=[...xd],Id=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function ks(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...tt]}function _d(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=ks(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=ks(t.value);if(a.length)return a}const n=tt.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...tt]}const kd=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],ci=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>{if(e?.isPackage){const t=e?.packageCodeResolved||e?.barcode||"";return A(t||"-")}return A(e?.barcode||"-")}},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>A(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>A(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>A(h(Number(e?.price||0).toFixed(2)))}],li=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(h(String(t+1)))},{id:"position",labelKey:"reservations.details.crew.position",fallback:"المنصب",render:e=>A(h(e?.positionLabel??e?.position_name??e?.role??c("reservations.crew.positionFallback","منصب بدون اسم")))},{id:"price",labelKey:"reservations.details.crew.clientPrice",fallback:"سعر العميل",render:e=>{const t=Number.isFinite(Number(e?.positionClientPrice))?Number(e.positionClientPrice):0;return A(`${h(t.toFixed(2))} ${c("reservations.create.summary.currency","SR")}`)}}],Ps={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:ci.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:li.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},Pd=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(h(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>A(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>A(e?.role||e?.title||c("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>A(e?.phone||e?.mobile||c("reservations.details.technicians.phoneUnknown","غير متوفر"))}],ao=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>A(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>A(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>A(e?.note||"-")}],$d=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(h(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>A(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>A(h(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>A(h(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>A(e?.displayCost||"—")}],Cd=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],Ld={customerInfo:Ps.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:Ps.payment,projectExpenses:ao.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:Pd.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:$d.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},us=new Map;function Ga(e="reservation"){if(us.has(e))return us.get(e);const t=e==="project"?Cd:kd,n=e==="project"?Ld:Ps,a=new Set(t.map(({id:r})=>r)),s=Object.fromEntries(Object.entries(n).map(([r,o=[]])=>[r,new Set(o.map(l=>l.id))])),i={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return us.set(e,i),i}function Wa(e="reservation"){return Ga(e).sectionDefs}function so(e="reservation"){return Ga(e).fieldDefs}function io(e="reservation"){return Ga(e).sectionIdSet}function ro(e="reservation"){return Ga(e).fieldIdMap}function oo(e){switch(e){case"export":return c("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return c("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const Nd="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",jd="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",Td="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",co=gd.trim(),lo=/^data:image\/svg\+xml/i,Bd=/\.svg($|[?#])/i,Fn=512,$s="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",uo=96,mo=25.4,Cs=210,ua=297,ma=Math.round(Cs/mo*uo),pa=Math.round(ua/mo*uo),po=2,fo=/safari/i,Dd=/(iphone|ipad|ipod)/i,Oi=/(iphone|ipad|ipod)/i,Fd=/(crios|fxios|edgios|opios)/i,ka="[reservations/pdf]";let Z=null,C=null,qt=1,Tn=null,Bn=null,Rt=null,Sn=null,Mn=!1;function nn(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!Z?.statusIndicator||!Z?.statusText)return;Z.statusKind=e;const i=t||oo(e);Z.statusText.textContent=i,Z.statusSpinner&&(Z.statusSpinner.hidden=!s),Z.statusAction&&(Z.statusAction.hidden=!0,Z.statusAction.onclick=null,n&&typeof a=="function"&&(Z.statusAction.textContent=n,Z.statusAction.hidden=!1,Z.statusAction.onclick=r=>{r.preventDefault(),a()})),Z.statusIndicator.hidden=!1,requestAnimationFrame(()=>{Z.statusIndicator.classList.add("is-visible")})}function En(e){try{return String(e||"").toLowerCase().normalize("NFKD").replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,"").replace(/\s+/g," ").trim()}catch{return String(e||"").trim().toLowerCase()}}function zn(e){!Z?.statusIndicator||!Z?.statusText||(Z.statusKind=null,Z.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{Z?.statusIndicator&&(Z.statusIndicator.hidden=!0,Z.statusAction&&(Z.statusAction.hidden=!0,Z.statusAction.onclick=null),Z.statusSpinner&&(Z.statusSpinner.hidden=!1))},220))}function Ls(){return!!window?.bootstrap?.Modal}function Rd(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),Rt||(Rt=document.createElement("div"),Rt.className="modal-backdrop fade show",Rt.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(Rt)),Sn||(Sn=t=>{t.key==="Escape"&&Ns(e)},document.addEventListener("keydown",Sn));try{e.focus({preventScroll:!0})}catch{}}}function Ns(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),Rt&&(Rt.remove(),Rt=null),Sn&&(document.removeEventListener("keydown",Sn),Sn=null))}function Md(e){if(e){if(Ls()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}Rd(e)}}function zd(){if(Mn)return;Mn=!0;const e=c("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=c("reservations.quote.toast.retry","إعادة المحاولة"),n=c("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!Z?.modal?.classList.contains("show"),s=()=>{Z?.modal?.classList.contains("show")&&(nn("render"),Mn=!1,yn())};sr({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:no}),a&&nn("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function Xa(e="reservation"){const t={},n=so(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(i=>i?.default!==!1).map(i=>i.id))}),t}function di(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function Hd(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function ui(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function mi(e="reservation"){return Object.fromEntries(Wa(e).map(({id:t})=>[t,!1]))}function pi(e,t){return e.sectionExpansions||(e.sectionExpansions=mi(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Od(e,t){return pi(e,t)?.[t]!==!1}function fi(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function Vd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Dd.test(e)}function Ud(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=fo.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function yo(){return Vd()&&Ud()}function Ja(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=Oi.test(e)||Oi.test(t),s=/Macintosh/i.test(e)&&n>1;return fo.test(e)&&!Fd.test(e)&&(a||s)}function ms(e,...t){try{console.log(`${ka} ${e}`,...t)}catch{}}function $t(e,...t){try{console.warn(`${ka} ${e}`,...t)}catch{}}function Kd(e,t,...n){try{t?console.error(`${ka} ${e}`,t,...n):console.error(`${ka} ${e}`,...n)}catch{}}function je(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Qd(e,t="لا توجد بيانات للعرض."){const n=A(c(e,t));return je(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Pa(e,t){return Array.isArray(e)&&e.length?e:[Qd(t)]}const Gd=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function bo(e=""){return Gd.test(e)}function Wd(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(i,...r){if(typeof i!="string"||!bo(i))return a.call(this,i,...r);let o,l=!1;try{"direction"in this&&(o=this.direction,o!=="rtl"&&(this.direction="rtl"),l=!0)}catch{}try{if(!l){const d=this.canvas;d&&d.style?.direction!=="rtl"&&(d.__artRatioOriginalDirection=d.style.direction,d.style.direction="rtl")}return a.call(this,i,...r)}finally{if(l&&o!==void 0&&o!=="rtl")try{this.direction=o}catch{}else if(!l){const d=this.canvas;d&&d.__artRatioOriginalDirection!==void 0&&(d.style.direction=d.__artRatioOriginalDirection,delete d.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function Vi(e,t=Fn){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Xd(e){if(!e)return{width:Fn,height:Fn};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?Vi(t,0):0,s=n?Vi(n,0):0;if(a>0&&s>0)return{width:a,height:s};const i=e.getAttribute?.("viewBox");if(i){const r=i.trim().split(/[\s,]+/).map(o=>parseFloat(o||"0"));if(r.length>=4){const[,,o,l]=r;a=a||(Number.isFinite(o)&&o>0?o:0),s=s||(Number.isFinite(l)&&l>0?l:0)}}return{width:a||Fn,height:s||Fn}}function go(e=""){return typeof e!="string"?!1:lo.test(e)||Bd.test(e)}function Jd(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Yd(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=i=>{const r=i?.message||`Unable to load image from ${e}`;a(new Error(r))},s.src=e})}async function ho(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const i=await Yd(s),r=n.createElement("canvas"),o=Math.max(t.width||i.naturalWidth||i.width||0,1),l=Math.max(t.height||i.naturalHeight||i.height||o,1);r.width=o,r.height=l;const d=r.getContext("2d");return d.clearRect(0,0,o,l),d.drawImage(i,0,0,o,l),r.toDataURL("image/png")}catch(i){return console.warn("[reservations/pdf] failed to rasterize SVG content",i),null}finally{URL.revokeObjectURL(s)}}async function Zd(e){if(!e)return null;if(lo.test(e))return Jd(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function eu(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!go(t))return!1;const n=await Zd(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",$s),!1;const a=await ho(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",$s),!1)}async function tu(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Xd(e),s=await ho(n,a),r=(e.ownerDocument||document).createElement("img");r.setAttribute("src",s||$s),r.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),r.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&r.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&r.setAttribute("style",e.getAttribute("style"));const o=e.getAttribute("width"),l=e.getAttribute("height");return o&&r.setAttribute("width",o),l&&r.setAttribute("height",l),e.parentNode?.replaceChild(r,e),!!s}async function vo(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{go(s.getAttribute?.("src"))&&a.push(eu(s))}),n.forEach(s=>{a.push(tu(s))}),a.length&&await Promise.allSettled(a)}function nu(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const i=(D,J=0)=>{const B=parseFloat(D);return Number.isFinite(B)?B:J},r=i(s.paddingTop),o=i(s.paddingBottom),l=i(s.paddingRight),d=i(s.paddingLeft),u=i(s.borderRadius),b=i(s.fontSize,14),y=(()=>{const D=s.lineHeight;if(!D||D==="normal")return b*1.6;const J=i(D,b*1.6);return J>0?J:b*1.6})(),p=Math.max(e.clientWidth||0,e.scrollWidth||0,i(s.width,0));if(p<=0)return null;const m=Math.max(1,p-d-l),g=e.textContent||"",v=g.split(/\r?\n/),_=n.createElement("canvas"),q=_.getContext("2d");if(!q)return null;const k=s.fontStyle||"normal",x=s.fontVariant||"normal",K=s.fontWeight||"400",S=s.fontFamily||"sans-serif",w=s.fontStretch||"normal",L=D=>D.join(" "),N=[],W=D=>q.measureText(D).width;q.font=`${k} ${x} ${K} ${w} ${b}px ${S}`,v.forEach(D=>{const J=D.trim();if(J.length===0){N.push("");return}const B=J.split(/\s+/);let V=[];B.forEach((R,ee)=>{const ue=R.trim();if(!ue)return;const le=L(V.concat(ue));if(W(le)<=m||V.length===0){V.push(ue);return}N.push(L(V)),V=[ue]}),V.length&&N.push(L(V))}),N.length||N.push("");const P=r+o+N.length*y,F=Math.ceil(Math.max(1,p)*t),X=Math.ceil(Math.max(1,P)*t);_.width=F,_.height=X,_.style.width=`${Math.max(1,p)}px`,_.style.height=`${Math.max(1,P)}px`,q.scale(t,t);const j=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){q.save(),q.beginPath();const D=Math.max(1,p),J=Math.max(1,P),B=Math.min(u,D/2,J/2);q.moveTo(B,0),q.lineTo(D-B,0),q.quadraticCurveTo(D,0,D,B),q.lineTo(D,J-B),q.quadraticCurveTo(D,J,D-B,J),q.lineTo(B,J),q.quadraticCurveTo(0,J,0,J-B),q.lineTo(0,B),q.quadraticCurveTo(0,0,B,0),q.closePath(),q.clip()}if(q.fillStyle=j,q.fillRect(0,0,Math.max(1,p),Math.max(1,P)),q.font=`${k} ${x} ${K} ${w} ${b}px ${S}`,q.fillStyle=s.color||"#000000",q.textBaseline="top",q.textAlign="right","direction"in q)try{q.direction="rtl"}catch{}const T=Math.max(0,p-l);let $=r;N.forEach(D=>{const J=D.length?D:" ";q.fillText(J,T,$,m),$+=y});const O=n.createElement("img");let Q;try{Q=_.toDataURL("image/png")}catch(D){return $t("note canvas toDataURL failed",D),null}return O.src=Q,O.alt=g,O.style.width=`${Math.max(1,p)}px`,O.style.height=`${Math.max(1,P)}px`,O.style.display="block",O.setAttribute("data-quote-note-image","true"),{image:O,canvas:_,totalHeight:P,width:p}}function au(e,{pixelRatio:t=1}={}){if(!e||!Ja())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!bo(a.textContent||""))return;let s;try{s=nu(a,{pixelRatio:t})}catch(i){$t("failed to rasterize note content",i),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function js(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){Kd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const i=c("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),r=n||i,o=c("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),l=c("reservations.quote.toast.retry","إعادة المحاولة"),d=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(nn("export"),No()):(nn("render"),Mn=!1,yn())};if(sr({message:r,duration:9e3,actionLabel:d?l:void 0,onAction:d?u:void 0,linkLabel:o,linkHref:no}),Z?.modal?.classList.contains("show")&&nn("error",{message:r,actionLabel:d?l:void 0,onAction:d?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function Ts({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){$t("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){$t("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function yi(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",i=>n(i)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=i=>n(i),document.head.appendChild(s)})}function Ui(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function Ki(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function su(){const e=Ki();return e||(Bn||(Bn=yi(jd).catch(t=>{throw Bn=null,t}).then(()=>{const t=Ki();if(!t)throw Bn=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Bn)}async function iu(){const e=Ui();return e||(Tn||(Tn=yi(Td).catch(t=>{throw Tn=null,t}).then(()=>{const t=Ui();if(!t)throw Tn=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),Tn)}async function ru(){if(window.html2pdf||await yi(Nd),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}wd(),Wd()}function A(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ou(e="reservation"){return e==="project"?"QP":"Q"}function cu(e,t="reservation"){const n=Number(e),a=ou(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function lu(){const e=window.localStorage?.getItem?.(to),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function qo(e="reservation"){const n=lu()+1;return{sequence:n,quoteNumber:cu(n,e)}}function du(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(to,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function So(e="reservation"){return Hi[e]||Hi.reservation}function uu(e="reservation"){try{const t=So(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function mu(e,t="reservation"){try{const n=So(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function pu(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function fu(e,t="reservation"){if(!e)return null;const n=io(t),a=ro(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(o=>n.has(o)),i={},r=e.fields||{};return Object.entries(a).forEach(([o,l])=>{const d=r[o];if(d==null)return;const{ids:u,emptyExplicitly:b}=pu(d);if(!u&&!b)return;const y=Array.isArray(u)?u.filter(p=>l.has(p)):[];(y.length>0||b)&&(i[o]=y)}),{version:1,sections:s,fields:i}}function Eo(e){if(!e)return;const t=e.context||"reservation",n=fu(e,t);n&&mu(n,t)}function Ao(e){if(!e)return;const t=e.context||"reservation",n=uu(t);if(!n)return;const a=io(t),s=Array.isArray(n.sections)?n.sections.filter(i=>a.has(i)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const i=di(e.fields||Xa(t)),r=ro(t);Object.entries(n.fields).forEach(([o,l])=>{const d=r[o];if(!d)return;const u=Array.isArray(l)?l.filter(b=>d.has(b)):[];i[o]=new Set(u)}),e.fields=i}}function wo(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function xo(e){const t=sn()||[],{technicians:n=[]}=me(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const o=String(r.id),l=s.get(o)||{};s.set(o,{...l,...r})}),(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(r=>({technicianId:r}))).map((r,o)=>{const l=r?.technicianId!=null?s.get(String(r.technicianId)):null;let d=r.positionLabel??r.position_name??r.position_label??r.role??r.position??l?.role??c("reservations.crew.positionFallback","منصب بدون اسم");(!d||d.trim()==="")&&(d=r.positionLabelAr??r.position_label_ar??r.positionLabelEn??r.position_label_en??r.position_name_ar??r.position_name_en??l?.role??c("reservations.crew.positionFallback","منصب بدون اسم"));try{const y=typeof Dt=="function"?Dt()||[]:[];let p=null;if(r?.positionId!=null&&(p=y.find(m=>String(m?.id)===String(r.positionId))||null),!p){const m=r.positionKey??r.position_key??r.positionName??r.position_name??r.position??"";if(m&&(p=typeof ba=="function"&&ba(m)||null,!p&&y.length)){const g=String(m).trim().toLowerCase();p=y.find(v=>[v.name,v.labelAr,v.labelEn].filter(Boolean).map(_=>String(_).toLowerCase()).includes(g))||null}}if(p){const m=p.labelAr||p.labelEn||p.name||"";m&&m.trim()&&(d=m)}}catch{}const u=xe(Re(r.positionCost??r.position_cost??r.cost??r.daily_wage??r.dailyWage??l?.dailyWage??l?.wage??0)),b=xe(Re(r.positionClientPrice??r.position_client_price??r.client_price??r.clientPrice??r.daily_total??r.dailyTotal??r.total??l?.dailyTotal??l?.total??l?.total_wage??0));return{assignmentId:r.assignmentId??r.assignment_id??`crew-${o}`,positionId:r.positionId??r.position_id??null,positionLabel:d,positionLabelAlt:r.positionLabelAlt??r.position_label_alt??"",positionCost:u,positionClientPrice:b,technicianId:r.technicianId!=null?String(r.technicianId):l?.id!=null?String(l.id):null,technicianName:r.technicianName??r.technician_name??l?.name??null,technicianRole:r.technicianRole??l?.role??null}})}function yu(e,t,n){const{projectLinked:a}=Ut(e,n);Ra(e.start,e.end);const s=e.discount??e.discountValue??0,i=Number(h(String(s)))||0,r=e.discountType??e.discount_type??"percent",o=String(r).toLowerCase()==="amount"?"amount":"percent",l=a?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),d=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,u=d!=null?Re(d):Number.NaN,y=(e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied)===!0&&Number.isFinite(u)&&u>0?u:null,p=Array.isArray(t)?t.map(x=>x?.technicianId).filter(Boolean):[],m=pr({items:Array.isArray(e.items)?e.items:[],technicianIds:p,crewAssignments:Array.isArray(t)?t:[],discount:i,discountType:o,applyTax:l,start:e.start,end:e.end,companySharePercent:y}),g=Re(e.cost??e.total??e.finalTotal),v=Number.isFinite(g),_=a?m.finalTotal:v?xe(g):m.finalTotal,q={equipmentTotal:m.equipmentTotal,crewTotal:m.crewTotal,crewCostTotal:m.crewCostTotal,discountAmount:m.discountAmount,subtotalAfterDiscount:m.subtotalAfterDiscount,taxableAmount:m.taxableAmount,taxAmount:m.taxAmount,finalTotal:_,companySharePercent:m.companySharePercent,companyShareAmount:m.companyShareAmount,netProfit:m.netProfit},k={equipmentTotal:h(m.equipmentTotal.toFixed(2)),crewTotal:h(m.crewTotal.toFixed(2)),discountAmount:h(m.discountAmount.toFixed(2)),subtotalAfterDiscount:h(m.subtotalAfterDiscount.toFixed(2)),taxableAmount:h(m.taxableAmount.toFixed(2)),taxAmount:h(m.taxAmount.toFixed(2)),finalTotal:h(_.toFixed(2)),companySharePercent:h((Number.isFinite(m.companySharePercent)?m.companySharePercent:0).toFixed(2)),companyShareAmount:h(m.companyShareAmount.toFixed(2)),netProfit:h(m.netProfit.toFixed(2))};return{totals:q,totalsDisplay:k,rentalDays:m.rentalDays}}function _n(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function Io(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function bu(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=_n(e.amount??(n==="amount"?e.value:null)),s=_n(e.percentage??(n==="percent"?e.value:null)),i=n==="percent"?s??null:a??null,r=e.note??e.memo??null,o=Io(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:i,note:r,recordedAt:o}}function gu(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(bu).filter(Boolean);if(n.length>0)return n;const a=_n(e.paidPercent??e.paid_percent),s=_n(e.paidAmount??e.paid_amount),i=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,r=Io(i);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:r}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:r}]:[]}function hu(e){if(!e)return c("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return c(t,e)}function vu(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function qu(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function Su(e){const t=Number(e?.equipmentEstimate)||0,n=qu(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",i=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let o=(e?.discountType==="amount"?"amount":"percent")==="amount"?i:a*(i/100);(!Number.isFinite(o)||o<0)&&(o=0),o>a&&(o=a);const l=Math.max(0,a-o),d=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,b=d&&s&&u>0?u:0,y=b>0?Number((l*(b/100)).toFixed(2)):0,p=l+y;let m=s?p*Xr:0;(!Number.isFinite(m)||m<0)&&(m=0),m=Number(m.toFixed(2));let g=s?Number(e?.totalWithTax):p;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((p+m).toFixed(2))):g=p,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:o,subtotalAfterDiscount:l,companyShareAmount:y,subtotal:p,applyTax:s,taxAmount:m,totalWithTax:g}}function Eu(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",i=Array.isArray(e.crewAssignments)?e.crewAssignments:[],r=i.length?i:Array.isArray(e.technicians)?e.technicians:[],o=Vs(t,a,s,!1,r,{start:e.start,end:e.end});if(Number.isFinite(o))return o;const l=Number(h(String(e.cost??0)));return Number.isFinite(l)?Math.round(l):0}function Au(e,t){if(!e)return"—";const n=rt(e);return t?`${n} - ${rt(t)}`:n}function de(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${h(a.toFixed(s))} ${t}`}function Qi(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function wu(e){if(!e?.start)return null;if(!e?.end)return 1;const t=Ra(e.start,e.end);return Number.isFinite(t)?t:1}function xu(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function Gi(e){const t=c("reservations.create.summary.currency","SR"),n=me()||{},a=Array.isArray(n.customers)?n.customers:[],s=Array.isArray(n.projects)?n.projects:[],i=Array.isArray(n.technicians)?n.technicians:[];let r=[];try{const I=Mt?.()||[];r=Array.isArray(I)&&I.length?I:n.reservations||[]}catch{r=n.reservations||[]}const o=e?.id!=null?s.find(I=>String(I.id)===String(e.id))||e:e||null,l={projectStatusLabel:c("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:c("projects.paymentStatus.unpaid","غير مدفوع")};if(!o)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:l.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:de(0,t),expensesTotal:de(0,t),reservationsTotal:de(0,t),discountAmount:de(0,t),taxAmount:de(0,t),overallTotal:de(0,t),paidAmount:de(0,t),remainingAmount:de(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:l.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:de(0,t),remainingAmountDisplay:de(0,t),paidPercentDisplay:Qi(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:l.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const d=o.clientId??o.customerId??o.client_id??o.customer_id??null,u=d!=null&&a.find(I=>String(I.id)===String(d))||null,b=u?.customerName??u?.name??o.clientName??o.customerName??c("projects.fallback.unknownClient","عميل غير معروف"),y=(o.clientCompany||u?.companyName||u?.company||"").trim(),p=u?.phone??u?.customerPhone??o.clientPhone??o.customerPhone??"",m=p?h(String(p).trim()):c("projects.details.client.noPhone","لا يوجد رقم متاح"),g=u?.email??o.clientEmail??o.customerEmail??"",v=g?String(g).trim():c("projects.details.client.noEmail","لا يوجد بريد متاح"),_=o.projectCode||`PRJ-${h(String(o.id??""))}`,q=h(String(_)),k=(o.title||"").trim()||c("projects.fallback.untitled","مشروع بدون عنوان"),x=hu(o.type),K=o.start?rt(o.start):"—",S=o.end?rt(o.end):"—",w=wu(o),L=w!=null?xu(w):"غير محدد",N=vu(o),W={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},P=c(`projects.status.${N}`,W[N]||N),F=o.id!=null?String(o.id):null,X=F?r.filter(I=>{const ne=I?.projectId??I?.project_id??null;return ne!=null&&String(ne)===F}):[],T=X.map(I=>{const ne=I.reservationId||I.id||"",U=I.status||I.state||"pending",pe=String(U).toLowerCase(),Ae=c(`reservations.status.${pe}`,pe),we=Eu(I),Ue=I.start?new Date(I.start).getTime():0;return{reservationId:h(String(ne||"-")),status:pe,statusLabel:Ae,total:we,totalLabel:de(we,t),dateRange:Au(I.start,I.end),startTimestamp:Number.isNaN(Ue)?0:Ue}}).sort((I,ne)=>ne.startTimestamp-I.startTimestamp).map(({startTimestamp:I,...ne})=>ne).reduce((I,ne)=>I+(Number(ne.total)||0),0),$=[];try{X.forEach(I=>{const{groups:ne}=Gs(I);ne.forEach(U=>{const pe=Number(U?.count??U?.quantity??1)||1,Ae=Number(U?.unitPrice);let we=Number.isFinite(Ae)?Ae:0;if(!we||we<=0){const he=Number(U?.totalPrice);Number.isFinite(he)&&pe>0&&(we=Number((he/pe).toFixed(2)))}Number.isFinite(we)||(we=0);const Ue=U?.type==="package"||Array.isArray(U?.items)&&U.items.some(he=>he?.type==="package"),We=Array.isArray(U?.barcodes)&&U.barcodes.length?U.barcodes[0]:Array.isArray(U?.items)&&U.items.length?U.items[0]?.barcode:null;let He=U?.packageDisplayCode??U?.package_code??U?.code??U?.packageCode??(Array.isArray(U?.items)&&U.items.length?U.items[0]?.package_code??U.items[0]?.code??U.items[0]?.packageCode:null);const Oe=he=>{const _e=(he==null?"":String(he)).trim();return!!(!_e||/^pkg-/i.test(_e)||/^\d+$/.test(_e)&&_e.length<=4)};if(!He||Oe(He)){const he=U?.packageId??U?.package_id??(Array.isArray(U?.items)&&U.items.length?U.items[0]?.packageId??U.items[0]?.package_id:null);if(he)try{const _e=Os(he);_e&&_e.package_code&&(He=_e.package_code)}catch{}}if(!He||Oe(He))try{const he=En(U?.description||"");if(he){const _e=fr();let bt=_e.find(nt=>En(nt?.name||nt?.title||nt?.label||"")===he);bt||(bt=_e.find(nt=>{const Ye=En(nt?.name||nt?.title||nt?.label||"");return Ye.includes(he)||he.includes(Ye)})),bt&&bt.package_code&&(He=bt.package_code)}}catch{}const Nt=Ue?He??We??"":U?.barcode??We??"",M=Nt!=null?String(Nt):"",ke=Number.isFinite(Number(U?.totalPrice))?Number(U.totalPrice):Number((we*pe).toFixed(2));$.push({...U,isPackage:Ue,desc:U?.description,barcode:M,packageCodeResolved:He||"",qty:pe,price:we,totalPrice:xe(ke),unitPriceValue:we})})})}catch{}const O=new Map;X.forEach(I=>{const ne=Array.isArray(I.items)?I.items:[],U=Ra(I.start,I.end),pe=I.reservationId||I.id||"";ne.forEach((Ae,we)=>{if(!Ae)return;const Ue=Ae.barcode||Ae.code||Ae.id||Ae.desc||Ae.description||`item-${we}`,We=String(Ue||`item-${we}`),He=O.get(We)||{description:Ae.desc||Ae.description||Ae.name||Ae.barcode||`#${h(String(we+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},Oe=Number(Ae.qty)||1,Nt=Number(Ae.price)||0;He.totalQuantity+=Oe,He.reservationIds.add(String(pe));const M=Nt*Oe*Math.max(1,U);Number.isFinite(M)&&(He.totalCost+=M),O.set(We,He)})});const Q=Array.from(O.values()).map(I=>({description:I.description,totalQuantity:I.totalQuantity,reservationsCount:I.reservationIds.size,displayCost:de(I.totalCost,t)})),D=new Map((i||[]).filter(Boolean).map(I=>[String(I.id),I])),J=new Map,B=I=>{if(!I)return;let ne=null;typeof I=="object"?ne=I.id??I.technicianId??I.technician_id??I.userId??I.user_id??null:(typeof I=="string"||typeof I=="number")&&(ne=I);const U=ne!=null?String(ne):null,pe=U&&D.has(U)?D.get(U):typeof I=="object"?I:null,Ae=pe?.name||pe?.full_name||pe?.fullName||pe?.displayName||(typeof I=="string"?I:null),we=pe?.role||pe?.title||null,Ue=pe?.phone||pe?.mobile||pe?.contact||null;if(!Ae&&!U)return;const We=U||Ae;J.has(We)||J.set(We,{id:U,name:Ae||"-",role:we||null,phone:Ue||null})};Array.isArray(o?.technicians)&&o.technicians.forEach(I=>B(I)),X.forEach(I=>{(Array.isArray(I.crewAssignments)&&I.crewAssignments.length?I.crewAssignments:Array.isArray(I.technicians)?I.technicians.map(U=>({technicianId:U})):[]).forEach(U=>B(U))});const V=Array.from(J.values()),R=Array.isArray(o.expenses)?o.expenses.map(I=>{const ne=Number(I?.amount)||0;return{label:I?.label||I?.name||"-",amount:ne,displayAmount:de(ne,t),note:I?.note||I?.description||""}}):[],ee=Su(o),ue=ee.applyTax?Number(((ee.subtotal+T)*Xr).toFixed(2)):0,le=Number((ee.subtotal+T+ue).toFixed(2)),Ee=gu(o),ge=_n(o.paidAmount??o.paid_amount)||0,G=_n(o.paidPercent??o.paid_percent)||0,te=Us({totalAmount:le,paidAmount:ge,paidPercent:G,history:Ee}),Ie=typeof o.paymentStatus=="string"?o.paymentStatus.toLowerCase():"",Te=Ks({manualStatus:Ie,paidAmount:te.paidAmount,paidPercent:te.paidPercent,totalAmount:le}),Ge={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},Y=c(`projects.paymentStatus.${Te}`,Ge[Te]||Te),ae=Number(te.paidAmount||0),ce=Number(te.paidPercent||0),qe=Math.max(0,Number((le-ae).toFixed(2))),De={projectSubtotal:de(ee.subtotal,t),expensesTotal:de(ee.expensesTotal,t),reservationsTotal:de(T,t),discountAmount:de(ee.discountAmount,t),taxAmount:de(ue,t),overallTotal:de(le,t),paidAmount:de(ae,t),remainingAmount:de(qe,t)},yt={status:Te,statusLabel:Y,paidAmount:ae,paidPercent:ce,remainingAmount:qe,paidAmountDisplay:de(ae,t),remainingAmountDisplay:de(qe,t),paidPercentDisplay:Qi(ce)},z=(o.description||"").trim();return{project:o,customer:u,clientInfo:{name:b,company:y||"—",phone:m,email:v},projectInfo:{title:k,code:q,typeLabel:x,startDisplay:K,endDisplay:S,durationLabel:L,statusLabel:P},expenses:R,equipment:Q,crew:V,equipmentItems:$,crewAssignments:X.flatMap(I=>xo(I)),totals:ee,totalsDisplay:De,projectTotals:{combinedTaxAmount:ue,overallTotal:le,reservationsTotal:T,paidAmount:ae,paidPercent:ce,remainingAmount:qe,paymentStatus:Te},paymentSummary:yt,notes:z,currencyLabel:t,projectStatus:N,projectStatusLabel:P,projectDurationDays:w,projectDurationLabel:L,paymentHistory:Ee}}function Iu({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:i=[],totalsDisplay:r={},projectTotals:o={},paymentSummary:l={},currencyLabel:d="SR",sections:u,fieldSelections:b={},quoteNumber:y,quoteDate:p,terms:m=tt}){const g=di(b),v=(Y,ae)=>ui(g,Y,ae),_=Y=>u?.has?.(Y),q=`<div class="quote-placeholder">${A(c("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,k=(Y,ae)=>`<div class="info-plain__item">
      <span class="info-plain__label">${A(Y)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${A(ae)}</span>
    </div>`,x=(Y,ae,{variant:ce="inline"}={})=>ce==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${A(Y)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${A(ae)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${A(Y)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${A(ae)}</span>
    </span>`,K=(Y,ae)=>`<div class="payment-row">
      <span class="payment-row__label">${A(Y)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${A(ae)}</span>
    </div>`,S=[];v("customerInfo","customerName")&&S.push(k(c("projects.details.client","العميل"),t.name||"-")),v("customerInfo","customerCompany")&&S.push(k(c("projects.details.company","شركة العميل"),t.company||"—")),v("customerInfo","customerPhone")&&S.push(k(c("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),v("customerInfo","customerEmail")&&S.push(k(c("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const w=_("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${A(c("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${S.length?`<div class="info-plain">${S.join("")}</div>`:q}
      </section>`:"",L=[];v("projectInfo","projectType")&&L.push(k(c("projects.details.type","نوع المشروع"),n.typeLabel||"-")),v("projectInfo","projectTitle")&&L.push(k(c("projects.details.projectTitle","اسم المشروع"),n.title||"-")),v("projectInfo","projectCode")&&L.push(k(c("projects.details.labels.code","رقم المشروع"),n.code||"-")),v("projectInfo","projectStart")&&L.push(k(c("projects.details.start","بداية المشروع"),n.startDisplay||"-")),v("projectInfo","projectEnd")&&L.push(k(c("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),v("projectInfo","projectDuration")&&L.push(k(c("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),v("projectInfo","projectStatus")&&L.push(k(c("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const N=_("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${A(c("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${L.length?`<div class="info-plain">${L.join("")}</div>`:q}
      </section>`:"",W=li.filter(Y=>v("crew",Y.id)),P=Array.isArray(C?.crewAssignments)?C.crewAssignments:[],F=_("projectCrew")?W.length?`<section class="quote-section quote-section--table">
            <h3>${A(c("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${W.map(Y=>`<th>${A(Y.labelKey?c(Y.labelKey,Y.fallback):Y.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${P.length?P.map((Y,ae)=>`<tr>${W.map(ce=>`<td>${ce.render(Y,ae)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(W.length,1)}" class="empty">${A(c("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(c("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${q}
          </section>`:"",X=[];v("financialSummary","projectSubtotal")&&X.push(x(c("projects.details.summary.projectSubtotal","إجمالي المشروع"),r.projectSubtotal||`${de(0,d)}`)),v("financialSummary","expensesTotal")&&X.push(x(c("projects.details.expensesTotal","إجمالي متطلبات المشروع"),r.expensesTotal||de(0,d))),v("financialSummary","reservationsTotal")&&X.push(x(c("projects.details.reservationsTotal","إجمالي الحجوزات"),r.reservationsTotal||de(0,d))),v("financialSummary","discountAmount")&&X.push(x(c("reservations.details.labels.discount","الخصم"),r.discountAmount||de(0,d))),v("financialSummary","taxAmount")&&X.push(x(c("projects.details.summary.combinedTax","إجمالي الضريبة"),r.taxAmount||de(0,d)));const j=[];v("financialSummary","overallTotal")&&j.push(x(c("projects.details.summary.overallTotal","الإجمالي الكلي"),r.overallTotal||de(0,d),{variant:"final"})),v("financialSummary","paidAmount")&&j.push(x(c("projects.details.summary.paidAmount","إجمالي المدفوع"),r.paidAmount||de(0,d),{variant:"final"})),v("financialSummary","remainingAmount")&&j.push(x(c("projects.details.summary.remainingAmount","المتبقي للدفع"),r.remainingAmount||de(0,d),{variant:"final"}));const T=_("financialSummary")?!X.length&&!j.length?`<section class="quote-section quote-section--financial">${q}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${A(c("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${X.length?`<div class="totals-inline">${X.join("")}</div>`:""}
            ${j.length?`<div class="totals-final">${j.join("")}</div>`:""}
          </div>
        </section>`:"",$=ao.filter(Y=>v("projectExpenses",Y.id)),O=_("projectExpenses")?$.length?`<section class="quote-section quote-section--table">
            <h3>${A(c("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${$.map(Y=>`<th>${A(Y.labelKey?c(Y.labelKey,Y.fallback):Y.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((Y,ae)=>`<tr>${$.map(ce=>`<td>${ce.render(Y,ae)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max($.length,1)}" class="empty">${A(c("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(c("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${q}
          </section>`:"",Q=ci.filter(Y=>v("items",Y.id)),D=Array.isArray(C?.equipmentItems)?C.equipmentItems:[],J=_("projectEquipment")?Q.length?`<section class="quote-section quote-section--table">
            <h3>${A(c("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Q.map(Y=>`<th>${A(Y.labelKey?c(Y.labelKey,Y.fallback):Y.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${D.length?D.map((Y,ae)=>`<tr>${Q.map(ce=>`<td>${ce.render(Y,ae)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Q.length,1)}" class="empty">${A(c("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(c("projects.quote.sections.equipment","المعدات"))}</h3>
            ${q}
          </section>`:"",B=(e?.description||"").trim()||"",V=_("projectNotes")?`<section class="quote-section">
        <h3>${A(c("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${A(B||c("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",R=[];v("payment","beneficiary")&&R.push(K(c("reservations.quote.labels.beneficiary","اسم المستفيد"),ze.beneficiaryName)),v("payment","bank")&&R.push(K(c("reservations.quote.labels.bank","اسم البنك"),ze.bankName)),v("payment","account")&&R.push(K(c("reservations.quote.labels.account","رقم الحساب"),h(ze.accountNumber))),v("payment","iban")&&R.push(K(c("reservations.quote.labels.iban","رقم الآيبان"),h(ze.iban)));const ee=`<section class="quote-section">
      <div class="payment-block">
        <h3>${A(c("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${R.length?R.join(""):q}</div>
      </div>
      <p class="quote-approval-note">${A(ze.approvalNote)}</p>
    </section>`,ue=Array.isArray(m)&&m.length?m:tt,le=`<footer class="quote-footer">
        <h4>${A(c("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${ue.map(Y=>`<li>${A(Y)}</li>`).join("")}</ul>
      </footer>`,Ee=[],ge=[];if(N&&ge.push({key:"project",html:N}),w&&ge.push({key:"customer",html:w}),ge.length>1){const Y=ge.find(qe=>qe.key==="project"),ae=ge.find(qe=>qe.key==="customer"),ce=[];Y?.html&&ce.push(Y.html),ae?.html&&ce.push(ae.html),Ee.push(je(`<div class="quote-section-row quote-section-row--primary">${ce.join("")}</div>`,{blockType:"group"}))}else ge.length===1&&Ee.push(je(ge[0].html));const G=[];F&&G.push(je(F,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),O&&G.push(je(O,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),J&&G.push(je(J,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const te=[];T&&te.push(je(T,{blockType:"summary"})),V&&te.push(je(V));const Ie=[je(ee,{blockType:"payment"}),je(le,{blockType:"footer"})],Te=[...Pa(Ee,"projects.quote.placeholder.primary"),...G,...Pa(te,"projects.quote.placeholder.summary"),...Ie],Ge=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${A(ze.logoUrl)}" alt="${A(ze.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${A(c("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${A(ze.companyName)}</p>
        <p class="quote-company-cr">${A(c("reservations.quote.labels.cr","السجل التجاري"))}: ${A(ze.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${A(c("reservations.details.labels.reservationId","رقم العرض"))}</span>
          <strong>${A(y)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${A(c("projects.quote.labels.date","التاريخ"))}</span>
          <strong>${A(p)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${co}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Ge}
          ${Te.join("")}
        </div>
      </div>
    </div>
  `}function _o(e){if(e?.context==="project")return Iu(e);const{reservation:t,customer:n,project:a,crewAssignments:s,totals:i,totalsDisplay:r,rentalDays:o,currencyLabel:l,sections:d,fieldSelections:u={},quoteNumber:b,quoteDate:y,terms:p=tt}=e,m=h(String(t?.reservationId??t?.id??"")),g=t.start?h(rt(t.start)):"-",v=t.end?h(rt(t.end)):"-",_=n?.customerName||n?.full_name||n?.name||"-",q=n?.phone||"-",k=n?.email||"-",x=n?.company||n?.company_name||"-",K=h(q),S=a?.title||a?.name||c("reservations.details.project.none","غير مرتبط بمشروع"),w=a?.code||a?.projectCode||"",L=h(String(o)),N=t?.notes||"",W=Array.isArray(p)&&p.length?p:tt,P=di(u),F=(M,ke)=>ui(P,M,ke),X=M=>d?.has?.(M),j=`<div class="quote-placeholder">${A(c("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,T=(M,ke)=>`<div class="info-plain__item">${A(M)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${A(ke)}</strong></div>`,$=(M,ke,{variant:he="inline"}={})=>he==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${A(M)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${A(ke)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${A(M)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${A(ke)}</span>
    </span>`,O=(M,ke)=>`<div class="payment-row">
      <span class="payment-row__label">${A(M)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${A(ke)}</span>
    </div>`,Q=[];F("customerInfo","customerName")&&Q.push(T(c("reservations.details.labels.customer","العميل"),_)),F("customerInfo","customerCompany")&&Q.push(T(c("reservations.details.labels.company","الشركة"),x)),F("customerInfo","customerPhone")&&Q.push(T(c("reservations.details.labels.phone","الهاتف"),K)),F("customerInfo","customerEmail")&&Q.push(T(c("reservations.details.labels.email","البريد"),k));const D=X("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${A(c("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${Q.length?`<div class="info-plain">${Q.join("")}</div>`:j}
      </section>`:"",J=[];F("reservationInfo","reservationId")&&J.push(T(c("reservations.details.labels.reservationId","رقم الحجز"),m||"-")),F("reservationInfo","reservationStart")&&J.push(T(c("reservations.details.labels.start","بداية الحجز"),g)),F("reservationInfo","reservationEnd")&&J.push(T(c("reservations.details.labels.end","نهاية الحجز"),v)),F("reservationInfo","reservationDuration")&&J.push(T(c("reservations.details.labels.duration","عدد الأيام"),L));const B=X("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${A(c("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${J.length?`<div class="info-plain">${J.join("")}</div>`:j}
      </section>`:"",V=[];F("projectInfo","projectTitle")&&V.push(T(c("reservations.details.labels.project","المشروع"),S)),F("projectInfo","projectCode")&&V.push(T(c("reservations.details.labels.code","الرمز"),w||"-"));const R=X("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${A(c("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${V.length?`<div class="info-plain">${V.join("")}</div>`:j}
      </section>`:"",ee=[];F("financialSummary","equipmentTotal")&&ee.push($(c("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${r.equipmentTotal} ${l}`)),F("financialSummary","crewTotal")&&ee.push($(c("reservations.details.labels.crewTotal","إجمالي الفريق"),`${r.crewTotal} ${l}`)),F("financialSummary","discountAmount")&&ee.push($(c("reservations.details.labels.discount","الخصم"),`${r.discountAmount} ${l}`)),F("financialSummary","taxAmount")&&ee.push($(c("reservations.details.labels.tax","الضريبة"),`${r.taxAmount} ${l}`));const ue=F("financialSummary","finalTotal"),le=[];ue&&le.push($(c("reservations.details.labels.total","الإجمالي النهائي"),`${r.finalTotal} ${l}`,{variant:"final"}));const Ee=le.length?`<div class="totals-final">${le.join("")}</div>`:"",ge=X("financialSummary")?!ee.length&&!ue?`<section class="quote-section quote-section--financial">${j}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${A(c("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${ee.length?`<div class="totals-inline">${ee.join("")}</div>`:""}
            ${Ee}
          </div>
        </section>`:"",{groups:G}=Gs(t),te=G.map(M=>{const ke=Number(M?.count??M?.quantity??1)||1,he=Number(M?.unitPrice);let _e=Number.isFinite(he)?he:0;if(!_e||_e<=0){const Fe=Number(M?.totalPrice);Number.isFinite(Fe)&&ke>0&&(_e=Number((Fe/ke).toFixed(2)))}Number.isFinite(_e)||(_e=0);const bt=M?.type==="package"||Array.isArray(M?.items)&&M.items.some(Fe=>Fe?.type==="package"),nt=Array.isArray(M?.barcodes)&&M.barcodes.length?M.barcodes[0]:Array.isArray(M?.items)&&M.items.length?M.items[0]?.barcode:null;let Ye=M?.packageDisplayCode??M?.package_code??M?.code??M?.packageCode??(Array.isArray(M?.items)&&M.items.length?M.items[0]?.package_code??M.items[0]?.code??M.items[0]?.packageCode:null);const ea=Fe=>{const Xe=(Fe==null?"":String(Fe)).trim();return!!(!Xe||/^pkg-/i.test(Xe)||/^\d+$/.test(Xe)&&Xe.length<=4)};if(!Ye||ea(Ye)){const Fe=M?.packageId??M?.package_id??(Array.isArray(M?.items)&&M.items.length?M.items[0]?.packageId??M.items[0]?.package_id:null);if(Fe)try{const Xe=Os(Fe);Xe&&Xe.package_code&&(Ye=Xe.package_code)}catch{}}if(!Ye||ea(Ye))try{const Fe=En(M?.description||"");if(Fe){const Xe=fr();let Wt=Xe.find(xt=>En(xt?.name||xt?.title||xt?.label||"")===Fe);Wt||(Wt=Xe.find(xt=>{const na=En(xt?.name||xt?.title||xt?.label||"");return na.includes(Fe)||Fe.includes(na)})),Wt&&Wt.package_code&&(Ye=Wt.package_code)}}catch{}const ta=bt?Ye??nt??"":M?.barcode??nt??"",ts=ta!=null?String(ta):"";let bn=Number.isFinite(Number(M?.totalPrice))?Number(M.totalPrice):Number((_e*ke).toFixed(2));return bn=xe(bn),{...M,isPackage:bt,desc:M?.description,barcode:ts,packageCodeResolved:Ye||"",qty:ke,price:bn,totalPrice:bn,unitPriceValue:_e}}),Ie=ci.filter(M=>F("items",M.id)),Te=Ie.length>0,Ge=Te?Ie.map(M=>`<th>${A(M.labelKey?c(M.labelKey,M.fallback):M.fallback)}</th>`).join(""):"",ae=te.length>0?te.map((M,ke)=>`<tr>${Ie.map(he=>`<td>${he.render(M,ke)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Ie.length,1)}" class="empty">${A(c("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,ce=X("items")?Te?`<section class="quote-section quote-section--table">
            <h3>${A(c("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Ge}</tr>
              </thead>
              <tbody>${ae}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(c("reservations.details.items.title","المعدات"))}</h3>
            ${j}
          </section>`:"",qe=li.filter(M=>F("crew",M.id)),De=qe.length>0,yt=De?qe.map(M=>`<th>${A(M.labelKey?c(M.labelKey,M.fallback):M.fallback)}</th>`).join(""):"",z=Array.isArray(s)?s:[],Se=z.length?z.map((M,ke)=>`<tr>${qe.map(he=>`<td>${he.render(M,ke)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(qe.length,1)}" class="empty">${A(c("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,I=X("crew")?De?`<section class="quote-section quote-section--table">
            <h3>${A(c("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${yt}</tr>
              </thead>
              <tbody>${Se}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(c("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${j}
          </section>`:"",ne=X("notes")?`<section class="quote-section">
        <h3>${A(c("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${A(N||c("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",U=[];F("payment","beneficiary")&&U.push(O(c("reservations.quote.labels.beneficiary","اسم المستفيد"),ze.beneficiaryName)),F("payment","bank")&&U.push(O(c("reservations.quote.labels.bank","اسم البنك"),ze.bankName)),F("payment","account")&&U.push(O(c("reservations.quote.labels.account","رقم الحساب"),h(ze.accountNumber))),F("payment","iban")&&U.push(O(c("reservations.quote.labels.iban","رقم الآيبان"),h(ze.iban)));const pe=`<section class="quote-section">
      <div class="payment-block">
        <h3>${A(c("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${U.length?U.join(""):j}</div>
      </div>
      <p class="quote-approval-note">${A(ze.approvalNote)}</p>
    </section>`,Ae=`<footer class="quote-footer">
        <h4>${A(c("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${W.map(M=>`<li>${A(M)}</li>`).join("")}</ul>
      </footer>`,we=[];D&&B?we.push(je(`<div class="quote-section-row">${D}${B}</div>`,{blockType:"group"})):(B&&we.push(je(B)),D&&we.push(je(D))),R&&we.push(je(R));const Ue=[];ce&&Ue.push(je(ce,{blockType:"table",extraAttributes:'data-table-id="items"'})),I&&Ue.push(je(I,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const We=[];ge&&We.push(je(ge,{blockType:"summary"})),ne&&We.push(je(ne));const He=[je(pe,{blockType:"payment"}),je(Ae,{blockType:"footer"})],Oe=[...Pa(we,"reservations.quote.placeholder.page1"),...Ue,...Pa(We,"reservations.quote.placeholder.page2"),...He],Nt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${A(ze.logoUrl)}" alt="${A(ze.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${A(c("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${A(ze.companyName)}</p>
        <p class="quote-company-cr">${A(c("reservations.quote.labels.cr","السجل التجاري"))}: ${A(ze.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${A(b)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${A(y)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${co}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Nt}
          ${Oe.join("")}
        </div>
      </div>
    </div>
  `}async function ko(){try{const e=me();if((Array.isArray(e?.packages)?e.packages:[]).length>0)return;const n=await ft("/packages/?all=1"),a=Array.isArray(n?.data)?n.data:Array.isArray(n)?n:[];a.length&&(Ta({packages:a}),document.dispatchEvent?.(new CustomEvent("packages:changed",{detail:{packages:a}})))}catch{}}function _u(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{i(),t()},s=()=>{i(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},i=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function Kn(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),i=a.map(o=>_u(o)),r=[s,...i].map(o=>o.catch(l=>($t("asset load failed",l),zd(),null)));await Promise.all(r),await new Promise(o=>n.requestAnimationFrame(()=>o()))}async function $a(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),i=e.querySelector("[data-quote-source]"),r=i?.querySelector("[data-quote-header-template]");if(!s||!i||!r)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await vo(i),await Kn(i),s.innerHTML="";const o=Array.from(i.querySelectorAll(":scope > [data-quote-block]"));let l=null,d=null;const u=S=>{S.style.margin="0 auto",S.style.breakInside="avoid",S.style.pageBreakInside="avoid",S.style.pageBreakAfter="auto",S.style.breakAfter="auto"},b=()=>{const S=a.createElement("div"),w=s.childElementCount===0;if(S.className="quote-page",S.dataset.pageIndex=String(s.childElementCount),w){S.classList.add("quote-page--primary");const N=r.cloneNode(!0);N.removeAttribute("data-quote-header-template"),S.appendChild(N)}else S.classList.add("quote-page--continuation");const L=a.createElement("main");L.className="quote-body",S.appendChild(L),s.appendChild(S),u(S),l=S,d=L},y=()=>{(!l||!d||!d.isConnected)&&b()},p=()=>{if(!l||!d||d.childElementCount>0)return;const S=l;l=null,d=null,S.parentNode&&S.parentNode.removeChild(S)},m=()=>{l=null,d=null},g=()=>l?l.scrollHeight-l.clientHeight>po:!1,v=(S,{allowOverflow:w=!1}={})=>(y(),d.appendChild(S),g()&&!w?(d.removeChild(S),p(),!1):!0),_=S=>{const w=S.cloneNode(!0);w.removeAttribute?.("data-quote-block"),w.removeAttribute?.("data-block-type"),w.removeAttribute?.("data-table-id"),!v(w)&&(m(),!v(w)&&v(w,{allowOverflow:!0}))},q=S=>{const w=S.querySelector("table");if(!w){_(S);return}const L=S.querySelector("h3"),N=w.querySelector("thead"),W=Array.from(w.querySelectorAll("tbody tr"));if(!W.length){_(S);return}let P=null,F=0;const X=(T=!1)=>{const $=S.cloneNode(!1);$.removeAttribute("data-quote-block"),$.removeAttribute("data-block-type"),$.removeAttribute("data-table-id"),$.classList.add("quote-section--table-fragment"),T&&$.classList.add("quote-section--table-fragment--continued");const O=L?L.cloneNode(!0):null;O&&$.appendChild(O);const Q=w.cloneNode(!1);Q.classList.add("quote-table--fragment"),N&&Q.appendChild(N.cloneNode(!0));const D=a.createElement("tbody");return Q.appendChild(D),$.appendChild(Q),{section:$,body:D}},j=(T=!1)=>P||(P=X(T),v(P.section)||(m(),v(P.section)||v(P.section,{allowOverflow:!0})),P);W.forEach(T=>{j(F>0);const $=T.cloneNode(!0);if(P.body.appendChild($),g()&&(P.body.removeChild($),P.body.childElementCount||(d.removeChild(P.section),P=null,p()),m(),P=null,j(F>0),P.body.appendChild($),g())){P.section.classList.add("quote-section--table-fragment--overflow"),F+=1;return}F+=1}),P=null};if(!o.length)return;o.forEach(S=>{S.getAttribute("data-block-type")==="table"?q(S):_(S)});const k=Array.from(s.children),x=[];if(k.forEach((S,w)=>{const L=S.querySelector(".quote-body");if(w!==0&&(!L||L.childElementCount===0)){S.remove();return}x.push(S)}),!n){const S=a.defaultView||window,w=Math.min(3,Math.max(1,S.devicePixelRatio||1)),L=Ja()?Math.min(2,w):w;x.forEach(N=>au(N,{pixelRatio:L}))}x.forEach((S,w)=>{const L=w===0;S.style.pageBreakAfter="auto",S.style.breakAfter="auto",S.style.pageBreakBefore=L?"auto":"always",S.style.breakBefore=L?"auto":"page",n?S.style.boxShadow="":S.style.boxShadow="none"});const K=x[x.length-1]||null;l=K,d=K?.querySelector(".quote-body")||null,await Kn(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function Po(e=0){return e<=0?new Promise(t=>requestAnimationFrame(()=>t())):new Promise(t=>setTimeout(t,e))}function $o(e){return e?Array.from(e.querySelectorAll(".quote-page")).some(n=>n.scrollHeight-n.clientHeight>po):!1}function bi(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function ku(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[i,r]=await Promise.all([iu(),su()]),o=e.ownerDocument||document,l=o?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,l,o?.documentElement?.getAttribute?.("dir")].some(S=>typeof S=="string"&&S.toLowerCase().startsWith("rtl")),b=typeof window<"u"&&window.devicePixelRatio||1,y=fi(),p=yo(),m=Ja();let g;m?g=1.5:p?g=Math.min(1.7,Math.max(1.2,b*1.1)):y?g=Math.min(1.8,Math.max(1.25,b*1.2)):g=Math.min(2,Math.max(1.6,b*1.4));const v=m||p?.9:y?.92:.95,_=new i({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),q={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let k=0;const x=c("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let S=0;S<s.length;S+=1){const w=s[S];await vo(w),await Kn(w);const L=w.ownerDocument||document,N=L.createElement("div");Object.assign(N.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const W=w.cloneNode(!0);W.style.width=`${ma}px`,W.style.maxWidth=`${ma}px`,W.style.minWidth=`${ma}px`,W.style.height=`${pa}px`,W.style.maxHeight=`${pa}px`,W.style.minHeight=`${pa}px`,W.style.position="relative",W.style.background="#ffffff",bi(W),N.appendChild(W),L.body.appendChild(N);let P;try{await Kn(W),P=await r(W,{...q,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(D){throw js(D,"pageCapture",{toastMessage:x}),D}finally{N.parentNode?.removeChild(N)}if(!P)continue;const F=P.width||1,j=(P.height||1)/F;let T=Cs,$=T*j,O=0;if($>ua){const D=ua/$;$=ua,T=T*D,O=Math.max(0,(Cs-T)/2)}const Q=P.toDataURL("image/jpeg",v);k>0&&_.addPage(),_.addImage(Q,"JPEG",O,0,T,$,`page-${k+1}`,"FAST"),k+=1,await new Promise(D=>window.requestAnimationFrame(D))}}catch(S){throw Ts({safariWindowRef:n,mobileWindowRef:a}),S}if(k===0)throw Ts({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(p||m){const S=_.output("blob");if(m){const w=URL.createObjectURL(S);zn();try{window.location.assign(w)}catch(L){$t("mobile safari blob navigation failed",L)}finally{setTimeout(()=>URL.revokeObjectURL(w),6e4)}}else{const w=URL.createObjectURL(S),L=()=>p&&n&&!n.closed?n:a&&!a.closed?a:null,N=(P,F)=>{if(zn(),!P){window.location.assign(F);return}try{P.location.replace(F),P.focus?.()}catch(X){$t("direct blob navigation failed",X);try{P.document.open(),P.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${A(c("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${F}" title="PDF preview"></iframe></body></html>`),P.document.close()}catch(j){$t("iframe blob delivery failed",j),window.location.assign(F)}}},W=L();N(W,w),setTimeout(()=>URL.revokeObjectURL(w),6e4)}}else{zn();const S=_.output("bloburl"),w=document.createElement("a");w.href=S,w.download=t,w.rel="noopener",w.style.display="none",document.body.appendChild(w),w.click(),setTimeout(()=>{URL.revokeObjectURL(S),w.remove()},2e3)}}function yn(){if(!C||!Z)return;const{previewFrame:e}=Z;if(!e)return;const t=C.context||"reservation",n=_o({context:t,reservation:C.reservation,customer:C.customer,project:C.project,crewAssignments:C.crewAssignments,totals:C.totals,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,fieldSelections:C.fields,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel,terms:C.terms,projectCrew:C.projectCrew,projectExpenses:C.projectExpenses,projectEquipment:C.projectEquipment,projectInfo:C.projectInfo,clientInfo:C.clientInfo,paymentSummary:C.paymentSummary,projectTotals:C.projectTotals});nn("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,i=a?.documentElement||a;i&&(eo(i),Yr(i,s),Zr(i,s));const r=a?.getElementById("quotation-pdf-root");try{r&&(await $a(r,{context:"preview"}),await Po(120),$o(r)&&await $a(r,{context:"preview"}),bi(r))}catch(p){console.error("[reservations/pdf] failed to layout preview document",p)}const o=Array.from(a?.querySelectorAll?.(".quote-page")||[]),l=a?.querySelector(".quote-preview-pages"),d=ma;let u=18;if(l&&a?.defaultView){const p=a.defaultView.getComputedStyle(l),m=parseFloat(p.rowGap||p.gap||`${u}`);Number.isFinite(m)&&m>=0&&(u=m)}const b=pa,y=o.length?o.length*b+Math.max(0,(o.length-1)*u):b;if(e.dataset.baseWidth=String(d),e.dataset.baseHeight=String(y),e.style.width=`${d}px`,e.style.minWidth=`${d}px`,e.style.height=`${y}px`,e.style.minHeight=`${y}px`,Z?.previewFrameWrapper&&!Z?.userAdjustedZoom){const p=Z.previewFrameWrapper.clientWidth-24;p>0&&p<d?qt=Math.max(p/d,.3):qt=1}Lo(qt)}finally{zn()}},{once:!0})}function Pu(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?C.sections.add(n):C.sections.delete(n),Eo(C),Co(),yn())}function $u(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=C.context||"reservation",i=C.fields||(C.fields=Xa(s)),r=Hd(i,n);t.checked?r.add(a):r.delete(a),Eo(C),yn()}function Cu(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(pi(C,n),C.sectionExpansions[n]=t.open)}function Co(){if(!Z?.toggles||!C)return;const{toggles:e}=Z,t=C.fields||{},n=C.context||"reservation";pi(C);const a=Wa(n),s=so(n),i=a.map(({id:r,labelKey:o,fallback:l})=>{const d=c(o,l),u=C.sections.has(r),b=s[r]||[],y=Od(C,r),p=b.length?`<div class="quote-toggle-sublist">
          ${b.map(m=>{const g=ui(t,r,m.id),v=u?"":"disabled",_=m.labelKey?c(m.labelKey,m.fallback):m.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${r}" data-field-id="${m.id}" ${g?"checked":""} ${v}>
                <span>${A(_)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${r}" ${y?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${r}" ${u?"checked":""}>
            <span>${A(d)}</span>
          </label>
          ${b.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${p}
      </details>
    `}).join("");e.innerHTML=i,e.querySelectorAll("input[data-section-toggle]").forEach(r=>{r.addEventListener("change",Pu)}),e.querySelectorAll("input[data-field-toggle]").forEach(r=>{r.addEventListener("change",$u)}),e.querySelectorAll("details[data-section-group]").forEach(r=>{r.addEventListener("toggle",Cu)})}function Lu(){if(Z?.modal)return Z;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${A(c("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${A(c("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
              <div class="quote-terms-editor" data-quote-terms-editor>
                <label class="quote-terms-editor__label" for="quote-terms-input">${A(c("reservations.quote.termsEditor.title","الشروط العامة (قابلة للتعديل)"))}</label>
                <textarea id="quote-terms-input" class="quote-terms-editor__textarea" rows="6" data-quote-terms-input placeholder="${A(c("reservations.quote.termsEditor.placeholder","اكتب كل شرط في سطر مستقل"))}"></textarea>
                <button type="button" class="quote-terms-reset" data-quote-terms-reset>${A(c("reservations.quote.termsEditor.reset","استعادة الشروط الافتراضية"))}</button>
              </div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${A(c("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${A(c("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),i=e.querySelector("[data-quote-terms-reset]"),r=e.querySelector("[data-quote-download]"),o=e.querySelector(".modal-header"),l=o?.querySelector(".btn-close"),d=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",o&&o.insertBefore(u,l||null);const b=document.createElement("iframe");b.className="quote-preview-frame",b.setAttribute("title",c("reservations.quote.previewTitle","معاينة عرض السعر")),b.setAttribute("loading","lazy"),b.setAttribute("frameborder","0");const y=document.createElement("div");y.className="quote-preview-zoom-controls",y.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${A(c("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${A(c("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${A(c("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const p=document.createElement("div");p.className="quote-preview-frame-wrapper",p.appendChild(b),n.innerHTML="";const m=document.createElement("div");m.className="quote-preview-scroll",m.appendChild(p),n.appendChild(m);const g=document.createElement("div");g.className="quote-preview-status",g.setAttribute("role","status"),g.setAttribute("aria-live","polite"),g.hidden=!0,g.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${A(oo("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(y),r?.addEventListener("click",async()=>{if(C){r.disabled=!0;try{await No()}finally{r.disabled=!1}}});const v=()=>{Ls()||Ns(e)};d.forEach(x=>{x?.addEventListener("click",v)}),l&&!d.includes(l)&&l.addEventListener("click",v),e.addEventListener("click",x=>{Ls()||x.target===e&&Ns(e)}),Z={modal:e,toggles:t,preview:n,previewScroll:m,previewFrameWrapper:p,zoomControls:y,zoomValue:y.querySelector("[data-zoom-value]"),previewFrame:b,meta:a,downloadBtn:r,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:i,statusKind:null,userAdjustedZoom:!1};const _=y.querySelector("[data-zoom-out]"),q=y.querySelector("[data-zoom-in]"),k=y.querySelector("[data-zoom-reset]");return _?.addEventListener("click",()=>Wi(-.1)),q?.addEventListener("click",()=>Wi(.1)),k?.addEventListener("click",()=>Ca(1,{markManual:!0})),s&&s.addEventListener("input",ju),i&&i.addEventListener("click",Tu),Ca(qt),Z}function Ca(e,{silent:t=!1,markManual:n=!1}={}){qt=Math.min(Math.max(e,.25),2.2),n&&Z&&(Z.userAdjustedZoom=!0),Lo(qt),!t&&Z?.zoomValue&&(Z.zoomValue.textContent=`${Math.round(qt*100)}%`)}function Wi(e){Ca(qt+e,{markManual:!0})}function Lo(e){if(!Z?.previewFrame||!Z.previewFrameWrapper)return;const t=Z.previewFrame,n=Z.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",fi()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function Nu(){if(!Z?.meta||!C)return;const{meta:e}=Z;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${A(c("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${A(C.quoteNumber)}</strong></div>
      <div><span>${A(c("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${A(C.quoteDateLabel)}</strong></div>
    </div>
  `}function gi(){if(!Z?.termsInput)return;const e=(C?.terms&&C.terms.length?C.terms:tt).join(`
`);Z.termsInput.value!==e&&(Z.termsInput.value=e)}function ju(e){if(!C)return;const t=ks(e?.target?.value??"");if(t.length){C.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{C.terms=[...tt],gi();const n=tt.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}yn()}function Tu(e){if(e?.preventDefault?.(),!C)return;C.terms=[...tt];const t=document.getElementById("reservation-terms");t&&(t.value=tt.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=tt.join(`
`)),gi(),yn()}async function No(){if(!C)return;nn("export");const t=!fi()&&yo(),n=Ja(),a=null,s=!n&&t?window.open("","_blank"):null;(l=>{if(l)try{l.document.open(),l.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${A(c("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${A(c("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${A(c("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),l.document.close()}catch(d){$t("failed to prime download window",d)}})(s);let r=null;const o=c("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await ru(),ms("html2pdf ensured");const l=C.context||"reservation",d=_o({context:l,reservation:C.reservation,customer:C.customer,project:C.project,crewAssignments:C.crewAssignments,totals:C.totals,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,fieldSelections:C.fields,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel,terms:C.terms,projectCrew:C.projectCrew,projectExpenses:C.projectExpenses,projectEquipment:C.projectEquipment,projectInfo:C.projectInfo,clientInfo:C.clientInfo,paymentSummary:C.paymentSummary,projectTotals:C.projectTotals});r=document.createElement("div"),r.innerHTML=d,Object.assign(r.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(r),eo(r),Yr(r),Zr(r),ms("export container prepared");const u=r.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await $a(u,{context:"export"}),await Po(120),$o(u)&&await $a(u,{context:"export"}),await Kn(u),bi(u),ms("layout complete for export document")}catch(y){js(y,"layoutQuoteDocument",{suppressToast:!0})}}const b=`quotation-${C.quoteNumber}.pdf`;await ku(u,{filename:b,safariWindowRef:s,mobileWindowRef:a}),C.sequenceCommitted||(du(C.quoteSequence),C.sequenceCommitted=!0)}catch(l){Ts({container:r,safariWindowRef:s,mobileWindowRef:a}),r=null,js(l,"exportQuoteAsPdf",{toastMessage:o})}finally{r&&r.parentNode&&r.parentNode.removeChild(r),zn()}}function jo(){const e=Lu();e?.modal&&(Mn=!1,qt=1,Z&&(Z.userAdjustedZoom=!1),Ca(qt,{silent:!0}),Co(),Nu(),gi(),yn(),Md(e.modal))}async function Bu({reservation:e,customer:t,project:n}){if(!e){E(c("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}await ko();const a=xo(e),{totalsDisplay:s,totals:i,rentalDays:r}=yu(e,a,n),o=c("reservations.create.summary.currency","SR"),{sequence:l,quoteNumber:d}=qo("reservation"),u=new Date,b=_d();C={context:"reservation",reservation:e,customer:t,project:n,crewAssignments:a,totals:i,totalsDisplay:s,rentalDays:r,currencyLabel:o,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(Wa("reservation").filter(y=>y.defaultSelected).map(y=>y.id)),sectionExpansions:mi("reservation"),fields:Xa("reservation"),terms:b,quoteSequence:l,quoteNumber:d,quoteDate:u,quoteDateLabel:wo(u),sequenceCommitted:!1},Ao(C),jo()}async function Mm({project:e}){if(!e){E(c("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}await ko();let t=Gi(e);const{project:n}=t;if(!n){E(c("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}try{(!Array.isArray(t.equipmentItems)||t.equipmentItems.length===0)&&n?.id!=null&&(await Ws({project_id:n.id}),t=Gi(n))}catch(o){console.warn("[reservationPdf] refreshReservationsForProject failed, proceeding with snapshot/state",o)}const{sequence:a,quoteNumber:s}=qo("project"),i=new Date,r=[...Id];C={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,equipmentItems:t.equipmentItems||[],crewAssignments:t.crewAssignments||[],totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(Wa("project").filter(o=>o.defaultSelected).map(o=>o.id)),sectionExpansions:mi("project"),fields:Xa("project"),terms:r,quoteSequence:a,quoteNumber:s,quoteDate:i,quoteDateLabel:wo(i),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},Ao(C),jo()}function Du({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=sn(),{reservations:i=[],customers:r=[],technicians:o=[],projects:l=[]}=me(),d=i.map(q=>{const k=ys(q);return{...k,id:q.id??k.id,reservationId:q.reservationId??q.reservation_id??k.reservationId,reservationCode:q.reservationCode??q.reservation_code??k.reservationCode}}),u=d,b=Array.isArray(s)?s:o||[],y=new Map((l||[]).map(q=>[String(q.id),q])),p=document.getElementById(e);if(!p){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!u||u.length===0){p.innerHTML=`<p>${c("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const m=t||ud(),g=new Map(r.map(q=>[String(q.id),q])),v=new Map(b.map(q=>[String(q.id),q])),_=yd({reservations:d,filters:m,customersMap:g,techniciansMap:v,projectsMap:y});if(_.length===0){p.innerHTML=`<p>${c("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}p.innerHTML=`<div class="reservations-grid">${bd({entries:_,customersMap:g,techniciansMap:v,projectsMap:y})}</div>`,p.querySelectorAll('[data-action="details"]').forEach(q=>{const k=Number(q.dataset.reservationIndex);Number.isNaN(k)||q.addEventListener("click",()=>{typeof n=="function"&&n(k)})}),p.querySelectorAll('button[data-action="confirm"]').forEach(q=>{const k=Number(q.dataset.reservationIndex);Number.isNaN(k)||q.addEventListener("click",x=>{x.stopPropagation(),typeof a=="function"&&a(k,x)})})}function Fu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:i=[],projects:r=[]}=me(),o=s.map(g=>{const v=ys(g);return{...v,id:g.id??v.id,reservationId:g.reservationId??g.reservation_id??v.reservationId,reservationCode:g.reservationCode??g.reservation_code??v.reservationCode}}),l=s[e];if(!l)return E(c("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=o[e]??ys(l),u=i.find(g=>String(g.id)===String(l.customerId)),b=l.projectId?r.find(g=>String(g.id)===String(l.projectId)):null,y=document.getElementById("reservation-details-body"),p=document.getElementById("reservationDetailsModal"),m=()=>{const g=()=>{p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(p)?.hide()},v=document.getElementById("reservation-details-edit-btn");v&&(v.onclick=()=>{g(),typeof t=="function"&&t(e,{reservation:l,customer:u,getEditContext:a})});const _=document.getElementById("reservation-details-delete-btn");_&&(_.onclick=()=>{g(),typeof n=="function"&&n(e,{reservation:l,customer:u})});const q=y?.querySelector('[data-action="open-project"]');q&&b&&q.addEventListener("click",()=>{g();const x=b?.id!=null?String(b.id):"",K=x?`projects.html?project=${encodeURIComponent(x)}`:"projects.html";window.location.href=K});const k=document.getElementById("reservation-details-export-btn");k&&(k.onclick=async x=>{x?.preventDefault?.(),x?.stopPropagation?.(),k.blur();try{await Bu({reservation:l,customer:u,project:b})}catch(K){console.error("❌ [reservations] export to PDF failed",K),E(c("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}})};if(y){const g=sn()||[];y.innerHTML=zi(d,u,g,e,b),m(),yr().then(()=>{const v=sn()||[];y.innerHTML=zi(d,u,v,e,b),m()}).catch(()=>{})}return p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(p).show(),!0}function To(){const e=()=>{Cn(),Qe(),sn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let Xi=!1,Ji=null;function Ru(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function zm(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=Ru(n);if(!a&&Xi&&Mt().length>0&&s===Ji)return Mt();try{const i=await Ws(n||{});return Xi=!0,Ji=s,i}catch(i){if(console.error("❌ [reservationsActions] Failed to load reservations from API",i),!t)throw i;return Mt()}}async function Mu(e,{onAfterChange:t}={}){if(!dn())return Gn(),!1;const a=Mt()[e];if(!a)return E(c("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(c("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await Gc(s),To(),t?.({type:"deleted",reservation:a}),E(c("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(i){console.error("❌ [reservationsActions] deleteReservation failed",i);const r=Fa(i)?i.message:c("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return E(r,"error"),!1}}async function zu(e,{onAfterChange:t}={}){const a=Mt()[e];if(!a)return E(c("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(c("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:i}=Ut(a);if(i)return E(c("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const r=await Wc(s);return To(),t?.({type:"confirmed",reservation:r}),E(c("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(r){console.error("❌ [reservationsActions] confirmReservation failed",r);const o=Fa(r)?r.message:c("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return E(o,"error"),!1}}function Nn(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Vn(e,n),end:Vn(t,a)}}function La(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function hi(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function Bo(){const{container:e,select:t,hint:n,addButton:a}=hi();if(!t)return;const s=t.value,i=ir(),r=c("reservations.create.summary.currency","SR"),o=`<option value="" disabled selected>${c("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,l=i.map(u=>{const b=Number.isFinite(Number(u.price))?Number(u.price):0,y=h(b.toFixed(2)),p=`${u.name} — ${y} ${r}`;return`<option value="${La(u.id)}">${La(p)}</option>`}).join("");t.innerHTML=`${o}${l}`;const d=i.length>0;t.disabled=!d,a&&(a.disabled=!d),e&&(e.hidden=!d,e.setAttribute("aria-hidden",d?"false":"true")),n&&(d?(n.textContent=c("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=c("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),d&&s&&i.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function Hu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||E(c("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=Qt(),{start:i,end:r}=Nn(),{reservations:o=[]}=me(),l=a!=null&&o[a]||null,d=l?.id??l?.reservationId??null,u=Vr(n,{existingItems:s,start:i,end:r,ignoreReservationId:d});if(!u.success)return t||E(u.message||c("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const b=[...s,u.package];return Gt(a,b),Kt(b),ct(),t||E(c("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function Yi(){const{select:e}=hi();if(!e)return;const t=e.value||"";Hu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function Ou(){const{addButton:e,select:t}=hi();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{Yi()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Yi())}),t.dataset.listenerAttached="true"),Bo()}function Kt(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=c("reservations.create.equipment.none","لا توجد معدات"),a=c("reservations.create.summary.currency","SR"),s=c("reservations.create.equipment.imageAlt","صورة"),i=c("reservations.equipment.actions.increase","زيادة الكمية"),r=c("reservations.equipment.actions.decrease","تقليل الكمية"),o=c("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,er(t);return}const l=kn(e);t.innerHTML=l.map(d=>{const u=d.items[0]||{},b=mn(u)||d.image,y=b?`<img src="${b}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',p=d.items.some(P=>P?.type==="package"),m=h(String(d.count)),g=Re(d.unitPrice),v=Number.isFinite(g)?xe(g):0,_=Re(d.totalPrice),q=Number.isFinite(_)?_:v*(Number.isFinite(d.count)?d.count:1),k=xe(q),x=`${h(v.toFixed(2))} ${a}`,K=`${h(k.toFixed(2))} ${a}`,S=d.barcodes.map(P=>h(String(P||""))).filter(Boolean),w=S.length?`<details class="reservation-item-barcodes">
            <summary>${c("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${S.map(P=>`<li>${P}</li>`).join("")}
            </ul>
          </details>`:"";let L="";if(p){const P=new Map,F=j=>{const T=Number.parseFloat(h(String(j??"")).replace(/[^0-9.]/g,""));return!Number.isFinite(T)||T<=0||T>99?1:Math.round(T)},X=[];if(Array.isArray(d.packageItems)&&d.packageItems.length&&X.push(...d.packageItems),d.items.forEach(j=>{Array.isArray(j?.packageItems)&&X.push(...j.packageItems)}),X.forEach(j=>{if(!j)return;const T=re(j.barcode||j.normalizedBarcode||j.desc||Math.random());if(!T)return;const $=P.get(T),O=F(j.qtyPerPackage??j.perPackageQty??j.quantityPerPackage??j.qty??j.quantity??1),Q=Math.max(1,Math.min(O,99));if($){$.qty=Q;return}P.set(T,{desc:j.desc||j.barcode||c("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Q,barcode:j.barcode??j.normalizedBarcode??""})}),P.size){const j=Array.from(P.values()).map(T=>{const $=h(String(T.qty>0?Math.min(T.qty,99):1)),O=La(T.desc||""),Q=T.barcode?` <span class="reservation-package-items__barcode">(${La(h(String(T.barcode)))})</span>`:"";return`<li>${O}${Q} × ${$}</li>`}).join("");L=`
            <details class="reservation-package-items">
              <summary>${c("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${j}
              </ul>
            </details>
          `}}const N=p?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",W=p?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${d.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${y}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${d.description||"-"}</div>
                ${p?`${L||""}${w||""}`:w}
              </div>
            </div>
          </td>
          <td>
            <div class="${N}" data-group-key="${d.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${d.key}" aria-label="${r}"${W}>−</button>
              <span class="reservation-qty-value">${m}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${d.key}" aria-label="${i}"${W}>+</button>
            </div>
          </td>
          <td>${x}</td>
          <td>${K}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${o}">🗑️</button>
          </td>
        </tr>
      `}).join(""),er(t)}function Vu(e){switch(e){case"amount":return c("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return c("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return c("reservations.paymentHistory.type.unknown","دفعة")}}function Ya(){const e=document.getElementById("edit-res-payment-history");if(!e)return;let t=Za();const n=document.getElementById("edit-res-project")?.value||"";if(n)try{const r=(me()?.projects||[]).find(l=>String(l.id)===String(n)),o=Array.isArray(r?.paymentHistory)?r.paymentHistory:Array.isArray(r?.payment_history)?r.payment_history:Array.isArray(r?.payments)?r.payments:Array.isArray(r?.paymentLogs)?r.paymentLogs:[];Array.isArray(o)&&o.length&&(t=o)}catch{}if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${c("reservations.paymentHistory.empty","لا توجد دفعات مسجلة")}</div>`,Zi();return}const a=c("reservations.create.summary.currency","SR"),s=t.map((i,r)=>{const o=Number.isFinite(Number(i?.amount))&&Number(i.amount)>0?`${h(Number(i.amount).toFixed(2))} ${a}`:"—",l=Number.isFinite(Number(i?.percentage))&&Number(i.percentage)>0?`${h(Number(i.percentage).toFixed(2))}%`:"—",d=i?.recordedAt?h(rt(i.recordedAt)):"—",u=Vu(i?.type),b=i?.note?h(i.note):"";return`
      <tr>
        <td>${u}</td>
        <td>${o}</td>
        <td>${l}</td>
        <td>${d}</td>
        <td>${b}</td>
        <td class="reservation-payment-history__actions">
          <button type="button" class="btn btn-link btn-sm reservation-payment-history__remove" data-action="remove-payment" data-index="${r}" aria-label="${c("reservations.paymentHistory.actions.delete","حذف الدفعة")}">🗑️</button>
        </td>
      </tr>
    `}).join("");e.innerHTML=`
    <div class="reservation-payment-history__table-wrapper">
      <table class="table table-sm reservation-payment-history__table">
        <thead>
          <tr>
            <th>${c("reservations.paymentHistory.headers.method","نوع الدفعة")}</th>
            <th>${c("reservations.paymentHistory.headers.amount","المبلغ")}</th>
            <th>${c("reservations.paymentHistory.headers.percent","النسبة")}</th>
            <th>${c("reservations.paymentHistory.headers.date","التاريخ")}</th>
            <th>${c("reservations.paymentHistory.headers.note","ملاحظات")}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>${s}</tbody>
      </table>
    </div>
  `,Zi()}function Uu(){if(Qn()){E(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=Ro(e);let a=Mo(t);if(!Number.isFinite(a)||a<=0){E(c("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=bs.lastResult,i=Number(s?.total)||0,r=Number(s?.paidPercent)||0,o=Number(s?.paidAmount)||0,l=c("reservations.create.summary.currency","SR");let d=null,u=null;if(n==="percent"){const y=Math.max(0,100-r);if(y<=1e-4){E(c("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const p=Math.min(a,y);if(p!==a){const m=h(p.toFixed(2));E(c("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",m)),a=p}u=Number(a.toFixed(2)),i>0&&(d=a/100*i)}else{const y=Math.max(0,i-o);if(y<=1e-4){E(c("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const p=Math.min(a,y);if(p!==a){const m=`${h(p.toFixed(2))} ${l}`;E(c("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",m)),a=p}d=Number(a.toFixed(2)),i>0&&(u=d/i*100)}d!=null&&(d=Number(d.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const b={type:n,value:a,amount:d,percentage:u,recordedAt:new Date().toISOString()};am(b),vi(Za()),Ya(),ct(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),E(c("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function Zi(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(Qn()){n.preventDefault(),E(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Uu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(Qn()){n.preventDefault(),E(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(sm(s),vi(Za()),Ya(),ct(),E(c("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function Ku(e){const{index:t,items:n}=Qt(),s=kn(n).find(o=>o.key===e);if(!s||s.items.some(o=>o?.type==="package"))return;const i=s.itemIndices[s.itemIndices.length-1];if(i==null)return;const r=n.filter((o,l)=>l!==i);Gt(t,r),Kt(r),ct()}function Qu(e){const{index:t,items:n}=Qt(),a=n.filter(s=>Da(s)!==e);a.length!==n.length&&(Gt(t,a),Kt(a),ct())}function Gu(e){const{index:t,items:n}=Qt(),s=kn(n).find(v=>v.key===e);if(!s||s.items.some(v=>v?.type==="package"))return;const{start:i,end:r}=Nn();if(!i||!r){E(c("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:o=[]}=me(),l=t!=null&&o[t]||null,d=l?.id??l?.reservationId??null,u=new Set(n.map(v=>re(v.barcode))),{equipment:b=[]}=me(),y=(b||[]).find(v=>{const _=re(v?.barcode);return!_||u.has(_)||Da({desc:v?.desc||v?.description||v?.name||"",price:Number(v?.price)||0})!==e||!Sr(v)?!1:!Et(_,i,r,d)});if(!y){E(c("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const p=re(y.barcode),m=un(y);if(!m){E(c("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:m,equipmentId:m,barcode:p,desc:y.desc||y.description||y.name||s.description||"",qty:1,price:Number.isFinite(Number(y.price))?Number(y.price):s.unitPrice,image:mn(y)}];Gt(t,g),Kt(g),ct()}function er(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:i}=n.dataset;if(a==="decrease-edit-group"&&s){Ku(s);return}if(a==="increase-edit-group"&&s){Gu(s);return}if(a==="remove-edit-group"&&s){Qu(s);return}if(a==="remove-edit-item"){const r=Number(i);Number.isNaN(r)||Ju(r)}}),e.dataset.groupListenerAttached="true")}function Qn(){return!!document.getElementById("edit-res-project")?.value}function Wu(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{Qn()&&(E(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function Xu(e){const t=c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),i=document.getElementById("edit-res-payment-progress-type"),r=document.getElementById("edit-res-payment-progress-value"),o=document.getElementById("edit-res-payment-add"),l=document.getElementById("edit-res-payment-history");if([n,a,s,i,r,o,l].forEach(Wu),e){if(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s){const d=document.getElementById("edit-res-project")?.value||"";let u="unpaid";if(d)try{const y=(me()?.projects||[]).find(m=>String(m.id)===String(d)),p=typeof y?.paymentStatus=="string"?y.paymentStatus.toLowerCase():null;p&&["paid","partial","unpaid"].includes(p)&&(u=p)}catch{}s.value=u,s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected}i&&(i.value=i.value||"percent",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),r&&(r.value="",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),o&&(o.disabled=!0,o.classList.add("reservation-input-disabled"),o.title=t),l&&(l.dataset.linkedDisabled="true")}else n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),o&&(o.disabled=!1,o.classList.remove("reservation-input-disabled"),o.title=""),l&&(l.dataset.linkedDisabled="false")}function ct(){const e=document.getElementById("edit-res-summary");if(!e)return;Ya();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),it(a),ct()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const i=parseFloat(s)||0,r=n?.value||"percent",o=Qn();Xu(o);const l=document.getElementById("edit-res-tax"),d=o?!1:l?.checked||!1,u=!o&&a?.dataset?.userSelected==="true";let b="unpaid";if(o){const k=document.getElementById("edit-res-project")?.value||"";if(k)try{const K=(me()?.projects||[]).find(w=>String(w.id)===String(k)),S=typeof K?.paymentStatus=="string"?K.paymentStatus.toLowerCase():null;S&&["paid","partial","unpaid"].includes(S)&&(b=S)}catch{}}else b=u&&a?.value||"unpaid";let y=null;!o&&d&&(pt("edit-res-company-share"),y=xn("edit-res-company-share"),(!Number.isFinite(y)||y<=0)&&(pt("edit-res-company-share"),y=xn("edit-res-company-share")));const{items:p=[],payments:m=[]}=Qt(),{start:g,end:v}=Nn(),_=bs({items:p,discount:i,discountType:r,applyTax:d,paidStatus:b,start:g,end:v,companySharePercent:y,paymentHistory:m});e.innerHTML=_;const q=bs.lastResult;if(q&&a){const k=q.paymentStatus;u?it(a,a.value):(a.value!==k&&(a.value=k),a.dataset&&delete a.dataset.userSelected,it(a,k))}else a&&it(a,a.value)}function Ju(e){if(e==null)return;const{index:t,items:n}=Qt();if(!Array.isArray(n))return;const a=n.filter((s,i)=>i!==e);Gt(t,a),Kt(a),ct()}function Yu(e){const t=e?.value??"",n=re(t);if(!n)return;const a=Ma(n);if(!a){E(c("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=Ct(a);if(s==="maintenance"||s==="retired"){E(ln(s));return}const i=re(n),{index:r,items:o=[]}=Qt();if(o.findIndex(v=>re(v.barcode)===i)>-1){E(c("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=Nn();if(!d||!u){E(c("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:b=[]}=me(),y=r!=null&&b[r]||null,p=y?.id??y?.reservationId??null;if(Et(i,d,u,p)){E(c("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=un(a);if(!m){E(c("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...o,{id:m,equipmentId:m,barcode:i,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];Gt(r,g),e&&(e.value=""),Kt(g),ct()}function Na(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Mr(t),a=re(n?.barcode||t);if(!n||!a){E(c("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=Ct(n);if(s==="maintenance"||s==="retired"){E(ln(s));return}const{start:i,end:r}=Nn();if(!i||!r){E(c("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:o,items:l=[]}=Qt();if(l.some(g=>re(g.barcode)===a)){E(c("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=me(),b=o!=null&&u[o]||null,y=b?.id??b?.reservationId??null;if(Et(a,i,r,y)){E(c("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const p=un(n);if(!p){E(c("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const m=[...l,{id:p,equipmentId:p,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];Gt(o,m),Kt(m),ct(),e.value=""}function Do(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Na(e))});const t=()=>{zr(e.value,"edit-res-equipment-description-options")&&Na(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{ct()});const e=()=>{Ou()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{Bo()})}typeof window<"u"&&(window.getEditReservationDateRange=Nn,window.renderEditPaymentHistory=Ya);function Zu(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){xs(e);return}Na(e)}}function Hm(){Vt(),Do()}function em(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let An=null,vt=[],St=[],Bs=null,Je={},ps=!1;const tm="__DEBUG_CREW__";function nm(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(tm);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function tr(e,t){if(nm())try{console.log(`🪵 [crew-debug:edit] ${e}`,t)}catch{}}function Hn(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),i=!!e;if(n&&(n.value=i?"true":"false"),a){const r=a.dataset.confirmLabel||"✅ تم التأكيد",o=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=i?r:o,a.dataset.state=i?"confirmed":"pending",a.classList.toggle("btn-success",i&&!t),a.classList.toggle("btn-outline-secondary",!i||t),a.disabled=t,a.setAttribute("aria-pressed",i?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function fa(){return document.getElementById("edit-res-confirmed")?.value==="true"}function Qt(){return{index:An,items:vt,payments:St}}function Gt(e,t,n=St){An=typeof e=="number"?e:null,vt=Array.isArray(t)?[...t]:[],St=Array.isArray(n)?[...n]:[]}function Fo(){An=null,vt=[],Yc(),St=[]}function Za(){return[...St]}function vi(e){St=Array.isArray(e)?[...e]:[]}function am(e){e&&(St=[...St,e])}function sm(e){!Number.isInteger(e)||e<0||(St=St.filter((t,n)=>n!==e))}function On(e,t=1){const n=Number.parseFloat(h(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function Ds(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(h(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function im(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?re(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:On(e.qty??e.quantity??e.count??1),price:Ds(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function rm(e,t=0){if(!e||typeof e!="object")return null;const n=Un(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=On(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),i=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:zs(e)).map(y=>im(y)).filter(Boolean),r=e.total_price??e.totalPrice??e.total??null;let o=Ds(e.unit_price??e.unitPrice??e.price??null,0);if((!o||o===0)&&r!=null){const y=Ds(r,0);y>0&&a>0&&(o=Number((y/a).toFixed(2)))}const l=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,l,n].find(y=>y!=null&&String(y).trim()!=="")||`Package ${n}`,b=e.image??e.cover??e.thumbnail??i.find(y=>y?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:h(String(u)),name:h(String(u)),qty:a,price:o,barcode:l,packageItems:i,image:b}}function om(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const i=s-n;e.set(a,i>0?i:0)})}function cm(e={},t=[]){const n=Array.isArray(t)?t.map(o=>({...o})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((o,l)=>rm(o,l)).filter(Boolean);if(!s.length)return n;const i=new Map;s.forEach(o=>{const l=On(o.qty??o.quantity??1);if(o.barcode){const d=re(o.barcode);if(d){const u=`package::${d}`;i.set(u,(i.get(u)??0)+l)}}(o.packageItems||[]).forEach(d=>{if(!d)return;const u=l*On(d.qty??d.quantity??1),b=d.equipmentId??null,y=d.normalizedBarcode||(d.barcode?re(d.barcode):null);if(b!=null){const p=`equipment::${String(b)}`;i.set(p,(i.get(p)??0)+u)}if(y){const p=`barcode::${y}`;i.set(p,(i.get(p)??0)+u)}})});const r=[];return n.forEach(o=>{if(!o||typeof o!="object"){r.push(o);return}if(o.type==="package"){const v=Un(o.packageId??o.package_id??o.id??"");s.some(q=>q.packageId===v)||r.push({...o});return}const l=On(o.qty??o.quantity??1),d=un(o),u=o.barcode?re(o.barcode):null,b=[];d!=null&&b.push(`equipment::${String(d)}`),u&&b.push(`barcode::${u}`);const y=b.map(v=>i.get(v)??0).filter(v=>v>0);if(!y.length){r.push({...o});return}const p=Math.min(...y);if(p<=0){r.push({...o});return}const m=Math.min(p,l);if(om(i,b,m),m>=l)return;const g=l-m;r.push({...o,qty:g,quantity:g})}),[...r,...s.map(o=>({...o}))]}function lm(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Ro(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Mo(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function dm(e,t){if(e){e.value="";return}}function Dn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function zo(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),i=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,r=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,o=t??(Number.isFinite(i)?"amount":Number.isFinite(r)?"percent":null),l=o==="amount"?i??null:o==="percent"?r??null:Number.isFinite(n)?n:null,d=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:o,value:l,amount:Number.isFinite(i)?i:null,percentage:Number.isFinite(r)?r:null,note:e.note??null,recordedAt:d}}function um(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=c("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=c("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),i=t?.projectId?String(t.projectId):"",r=Array.isArray(e)?[...e].sort((l,d)=>String(d.createdAt||d.start||"").localeCompare(String(l.createdAt||l.start||""))):[],o=[`<option value="">${Dn(a)}</option>`];r.forEach(l=>{o.push(`<option value="${Dn(l.id)}">${Dn(l.title||a)}</option>`)}),i&&!r.some(l=>String(l.id)===i)&&o.push(`<option value="${Dn(i)}">${Dn(s)}</option>`),n.innerHTML=o.join(""),i?n.value=i:n.value=""}function Ho(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),i=c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=i),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=i),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=i),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=i);else{if(t){const l=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",l&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}Fs("tax");const o=Je?.updateEditReservationSummary;typeof o=="function"&&o()}function Fs(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const i=Je?.updateEditReservationSummary;typeof i=="function"&&i()};if(ps){a();return}ps=!0;const s=()=>{ps=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(an)),t.disabled){n.checked=!1,E(c("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),pt("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?pt("edit-res-company-share"):n.checked&&(n.checked=!1));s()}async function nr(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:i,ensureModal:r}={}){const{customers:o,projects:l}=me(),u=Mt()?.[e];if(!u){E(c("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}Je={...Je,reservation:u,projects:l||[]},t?.(),um(l||[],u);const b=u.projectId&&l?.find?.(B=>String(B.id)===String(u.projectId))||null,{effectiveConfirmed:y,projectLinked:p}=Ut(u,b),m=u.items?u.items.map(B=>({...B,equipmentId:B.equipmentId??B.equipment_id??B.id,barcode:re(B?.barcode)})):[],g=cm(u,m),_=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(B=>zo(B)).filter(Boolean);Gt(e,g,_);const q=c("reservations.list.unknownCustomer","غير معروف"),k=o?.find?.(B=>String(B.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const x=document.getElementById("edit-res-id");x&&(x.value=u.reservationId||u.id);const K=document.getElementById("edit-res-customer");K&&(K.value=k?.customerName||q);const S=typeof a=="function"?a(u.start):{date:"",time:""},w=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",S.date),n?.("edit-res-start-time",S.time),n?.("edit-res-end",w.date),n?.("edit-res-end-time",w.time);const L=document.getElementById("edit-res-notes");L&&(L.value=u.notes||"");const N=document.getElementById("edit-res-discount");if(N){const B=p?0:u.discount??0;N.value=h(B)}const W=document.getElementById("edit-res-discount-type");W&&(W.value=p?"percent":u.discountType||"percent");const P=u.projectId?!1:!!u.applyTax,F=document.getElementById("edit-res-tax");F&&(F.checked=P);const X=document.getElementById("edit-res-company-share");if(X){const B=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,V=B!=null?Number.parseFloat(h(String(B).replace("%","").trim())):NaN,R=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,ee=R!=null?R===!0||R===1||R==="1"||String(R).toLowerCase()==="true":Number.isFinite(V)&&V>0,ue=ee&&Number.isFinite(V)&&V>0?V:an,le=P||ee;X.checked=le,X.dataset.companyShare=String(ue)}Hn(y,{disable:p});const j=document.getElementById("edit-res-paid"),T=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");j&&(j.value=T,j.dataset&&delete j.dataset.userSelected);const $=document.getElementById("edit-res-payment-progress-type"),O=document.getElementById("edit-res-payment-progress-value");$?.dataset?.userSelected&&delete $.dataset.userSelected,$&&($.value="percent"),dm(O);const Q=document.getElementById("edit-res-cancelled");if(Q){const B=String(u?.status||u?.reservationStatus||"").toLowerCase();Q.checked=["cancelled","canceled"].includes(B),Q.checked&&Hn(y,{disable:!0})}let D=Array.isArray(u.crewAssignments)&&u.crewAssignments.length?u.crewAssignments:Array.isArray(u.techniciansDetails)&&u.techniciansDetails.length?u.techniciansDetails:(u.technicians||[]).map(B=>String(B));if(!Array.isArray(D)||D.length===0){const B=Zc(u.id??u.reservationId??u.reservation_code??null);Array.isArray(B)&&B.length&&(D=B)}try{await yr()}catch(B){console.warn("[reservationsEdit] positions load failed (non-fatal)",B)}if(el(D),s?.(g),typeof window<"u"){const B=window?.renderEditPaymentHistory;typeof B=="function"&&B()}Ho(),i?.();const J=document.getElementById("editReservationModal");Bs=lm(J,r),Bs?.show?.()}async function mm({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:i,populateEquipmentDescriptionLists:r,handleReservationsMutation:o}={}){if(An===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const l=document.getElementById("edit-res-start")?.value?.trim(),d=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),b=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",y=document.getElementById("edit-res-notes")?.value||"",p=h(document.getElementById("edit-res-discount")?.value||"0");let m=parseFloat(p)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const v=fa(),_=document.getElementById("edit-res-paid"),q=_?.dataset?.userSelected==="true",k=q&&_?.value||"unpaid",x=document.getElementById("edit-res-payment-progress-type"),K=document.getElementById("edit-res-payment-progress-value"),S=Ro(x),w=Mo(K),L=document.getElementById("edit-res-project")?.value||"",W=document.getElementById("edit-res-cancelled")?.checked===!0,P=Xc();P.map(z=>z?.technicianId).filter(Boolean);const F=document.getElementById("edit-res-company-share"),X=document.getElementById("edit-res-tax");if(!l||!u){E(c("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const j=typeof e=="function"?e:(z,Se)=>`${z}T${Se||"00:00"}`,T=j(l,d),$=j(u,b);if(T&&$&&new Date(T)>new Date($)){E(c("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const Q=Mt()?.[An];if(!Q){E(c("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(vt)||vt.length===0&&P.length===0){E(c("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const D=typeof t=="function"?t:()=>!1,J=Q.id??Q.reservationId;for(const z of vt){if(z?.type==="package"&&Array.isArray(z.packageItems)){for(const I of z.packageItems){const ne=I?.barcode??I?.normalizedBarcode??"";if(!ne)continue;const U=Ct(ne);if(U==="reserved"){const pe=re(ne);if(!D(pe,T,$,J))continue}if(U!=="available"){E(ln(U));return}}continue}const Se=Ct(z.barcode);if(Se==="reserved"){const I=re(z.barcode);if(!D(I,T,$,J))continue}if(Se!=="available"){E(ln(Se));return}}for(const z of vt){if(z?.type==="package"&&Array.isArray(z.packageItems)){for(const I of z.packageItems){const ne=re(I?.barcode??I?.normalizedBarcode??"");if(ne&&D(ne,T,$,J)){const U=I?.desc||I?.barcode||c("reservations.create.packages.unnamedItem","معدة بدون اسم"),pe=`${c("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${h(String(U))})`;E(pe);return}}continue}const Se=re(z.barcode);if(D(Se,T,$,J)){E(c("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const B=typeof n=="function"?n:()=>!1;for(const z of vt){if(z?.type!=="package")continue;const Se=z.packageId??z.package_id??null;if(Se&&B(Se,T,$,J)){const I=z.desc||z.packageName||c("reservations.create.packages.genericName","الحزمة");E(c("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${h(String(I))} محجوزة بالفعل في الفترة المختارة`));return}}const V=typeof a=="function"?a:()=>!1;for(const z of P)if(z?.technicianId&&V(z.technicianId,T,$,J)){E(c("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const R=Array.isArray(Je.projects)&&Je.projects.length?Je.projects:me().projects||[],ee=L&&R.find(z=>String(z.id)===String(L))||null,ue={...Q,projectId:L?String(L):null,confirmed:v},{effectiveConfirmed:le,projectLinked:Ee,projectStatus:ge}=Ut(ue,ee);let G=!!F?.checked,te=!!X?.checked;if(Ee&&(G&&(F.checked=!1,G=!1),te=!1),!Ee&&G!==te){E(c("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}te&&(pt("edit-res-company-share"),G=!!F?.checked);let Ie=G?getCompanySharePercent("edit-res-company-share"):null;G&&(!Number.isFinite(Ie)||Ie<=0)&&(pt("edit-res-company-share"),Ie=getCompanySharePercent("edit-res-company-share"));const Te=G&&te&&Number.isFinite(Ie)&&Ie>0,Ge=Ee?!1:te;Ee&&(m=0,g="percent");const Y=Vs(vt,m,g,Ge,P,{start:T,end:$,companySharePercent:Te?Ie:0});let ae=Za();if(Number.isFinite(w)&&w>0){const z=Y;let Se=null,I=null;S==="amount"?(Se=w,z>0&&(I=w/z*100)):(I=w,z>0&&(Se=w/100*z));const ne=zo({type:S,value:w,amount:Se,percentage:I,recordedAt:new Date().toISOString()});ne&&(ae=[...ae,ne],vi(ae)),K&&(K.value="")}const ce=Us({totalAmount:Y,history:ae}),qe=Ks({manualStatus:k,paidAmount:ce.paidAmount,paidPercent:ce.paidPercent,totalAmount:Y});_&&!q&&(_.value=qe,_.dataset&&delete _.dataset.userSelected);let De=Q.status??"pending";Ee?De=ee?.status??ge??De:W?De="cancelled":["completed","cancelled"].includes(String(De).toLowerCase())||(De=v?"confirmed":"pending");const yt=ur({reservationCode:Q.reservationCode??Q.reservationId??null,customerId:Q.customerId,start:T,end:$,status:De,title:Q.title??null,location:Q.location??null,notes:y,projectId:L?String(L):null,totalAmount:Y,discount:m,discountType:g,applyTax:Ge,paidStatus:qe,confirmed:le,items:vt.map(z=>({...z,equipmentId:z.equipmentId??z.id})),crewAssignments:P,companySharePercent:Te?Ie:null,companyShareEnabled:Te,paidAmount:ce.paidAmount,paidPercentage:ce.paidPercent,paymentProgressType:ce.paymentProgressType,paymentProgressValue:ce.paymentProgressValue,paymentHistory:ae});try{tr("about to submit",{editingIndex:An,crewAssignments:P,techniciansPayload:yt?.technicians,payload:yt});const z=await Jc(Q.id||Q.reservationId,yt);tr("server response",{reservation:z?.id??z?.reservationId??z?.reservation_code,technicians:z?.technicians,crewAssignments:z?.crewAssignments,techniciansDetails:z?.techniciansDetails}),await Ws(),Cn(),sn(),Qe(),E(c("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),Fo(),o?.({type:"updated",reservation:z}),i?.(),r?.(),Bs?.hide?.()}catch(z){console.error("❌ [reservationsEdit] Failed to update reservation",z);const Se=Fa(z)?z.message:c("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");E(Se,"error")}}function Om(e={}){Je={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=Je,i=document.getElementById("edit-res-discount");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",()=>{i.value=h(i.value),t?.()}),i.dataset.listenerAttached="true");const r=document.getElementById("edit-res-discount-type");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>t?.()),r.dataset.listenerAttached="true");const o=document.getElementById("edit-res-tax");o&&!o.dataset.listenerAttached&&(o.addEventListener("change",()=>{Fs("tax")}),o.dataset.listenerAttached="true");const l=document.getElementById("edit-res-company-share");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{Fs("share")}),l.dataset.listenerAttached="true");const d=document.getElementById("edit-res-payment-progress-type");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{d.dataset.userSelected="true",t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const b=document.getElementById("edit-res-project");b&&!b.dataset.listenerAttached&&(b.addEventListener("change",()=>{Ho();const _=Array.isArray(Je.projects)&&Je.projects.length?Je.projects:me().projects||[],q=b.value&&_.find(w=>String(w.id)===String(b.value))||null,x={...Je?.reservation??{},projectId:b.value||null,confirmed:fa()},{effectiveConfirmed:K,projectLinked:S}=Ut(x,q);Hn(K,{disable:S}),t?.()}),b.dataset.listenerAttached="true");const y=document.getElementById("edit-res-confirmed-btn");y&&!y.dataset.listenerAttached&&(y.addEventListener("click",()=>{if(y.disabled)return;const _=!fa();Hn(_),t?.()}),y.dataset.listenerAttached="true");const p=document.getElementById("edit-res-cancelled");p&&!p.dataset.listenerAttached&&(p.addEventListener("change",()=>{document.getElementById("edit-res-confirmed-btn")&&Hn(fa(),{disable:p.checked}),t?.()}),p.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{mm(Je).catch(_=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",_)})}),m.dataset.listenerAttached="true");const g=document.getElementById("edit-res-equipment-barcode");if(g&&!g.dataset.listenerAttached){let _=null;const q=()=>{g.value?.trim()&&(clearTimeout(_),_=null,n?.(g))};g.addEventListener("keydown",x=>{x.key==="Enter"&&(x.preventDefault(),q())});const k=()=>{if(clearTimeout(_),!g.value?.trim())return;const{start:x,end:K}=getEditReservationDateRange();!x||!K||(_=setTimeout(()=>{q()},150))};g.addEventListener("input",k),g.addEventListener("change",q),g.dataset.listenerAttached="true"}Do?.();const v=document.getElementById("editReservationModal");v&&!v.dataset.cleanupAttached&&(v.addEventListener("hidden.bs.modal",()=>{Fo(),t?.(),s?.([])}),v.dataset.cleanupAttached="true")}const pm=me()||{};let mt=(pm.projects||[]).map(Uo),Yn=!1;function fm(){return mt}function Zn(e){mt=Array.isArray(e)?e.map(qi):[],Ta({projects:mt});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return mt}async function Oo(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([o,l])=>{l==null||l===""||t.set(o,String(l))});const n=t.toString(),s=(await ft(`/projects/${n?`?${n}`:""}`))?.data;let i=[];Array.isArray(s)?i=s:s&&typeof s=="object"&&(Array.isArray(s.items)?i=s.items:Array.isArray(s.results)?i=s.results:Array.isArray(s.data)?i=s.data:Array.isArray(s.records)&&(i=s.records));const r=i.map(es);return Zn(r),Yn=!0,mt}async function Vo({force:e=!1,params:t=null}={}){if(!e&&Yn&&mt.length>0)return mt;try{return await Oo(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),mt}}async function ym(e){const t=await ft("/projects/",{method:"POST",body:e}),n=es(t?.data??{}),a=[...mt,n];return Zn(a),Yn=!0,n}async function bm(e,t){const n=await ft(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=es(n?.data??{}),s=mt.map(i=>String(i.id)===String(e)?a:i);return Zn(s),Yn=!0,a}async function gm(e){await ft(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=mt.filter(n=>String(n.id)!==String(e));Zn(t),Yn=!0}function hm({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:i,start:r,end:o,applyTax:l,paymentStatus:d,equipmentEstimate:u=0,expenses:b=[],servicesClientPrice:y=0,taxAmount:p=0,totalWithTax:m=0,discount:g=0,discountType:v="percent",companyShareEnabled:_=!1,companySharePercent:q=null,companyShareAmount:k=0,paidAmount:x=null,paidPercentage:K=null,paymentProgressType:S=null,paymentProgressValue:w=null,confirmed:L=!1,technicians:N=[],equipment:W=[],payments:P,paymentHistory:F}={}){const X=Array.isArray(N)?N.map(V=>Number.parseInt(String(V),10)).filter(V=>Number.isInteger(V)&&V>0):[],j=Array.isArray(W)?W.map(V=>{const R=Number.parseInt(String(V.equipmentId??V.equipment_id??V.id??0),10),ee=Number.parseInt(String(V.qty??V.quantity??0),10);return!Number.isInteger(R)||R<=0?null:{equipment_id:R,quantity:Number.isInteger(ee)&&ee>0?ee:1}}).filter(Boolean):[],T=Array.isArray(b)?b.map(V=>{const R=Number.parseFloat(V?.amount??V?.value??0)||0,ee=(V?.label??V?.name??"").trim();if(!ee)return null;const ue=Number.parseFloat(V?.salePrice??V?.sale_price??0)||0;return{label:ee,amount:Math.round(R*100)/100,sale_price:Math.max(0,Math.round(ue*100)/100)}}).filter(Boolean):[],$=T.reduce((V,R)=>V+(R?.amount??0),0),O={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:i??null,start_datetime:r??null,end_datetime:o||null,apply_tax:!!l,payment_status:d??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round($*100)/100,services_client_price:Number.isFinite(Number(y))?Math.round(Number(y)*100)/100:0,tax_amount:Math.round((Number.parseFloat(p)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(m)||0)*100)/100,confirmed:!!L,technicians:X,equipment:j,expenses:T},Q=Math.max(0,Number.parseFloat(g)||0);O.discount=Q,O.discount_type=v==="amount"?"amount":"percent";const D=Number.parseFloat(q),J=!!_&&Number.isFinite(D)&&D>0;O.company_share_enabled=J,O.company_share_percent=J?D:0,O.company_share_amount=J?Math.max(0,Number.parseFloat(k)||0):0,Number.isFinite(Number(x))&&(O.paid_amount=Math.max(0,Number.parseFloat(x)||0)),Number.isFinite(Number(K))&&(O.paid_percentage=Math.max(0,Number.parseFloat(K)||0)),(S==="amount"||S==="percent")&&(O.payment_progress_type=S),w!=null&&w!==""&&(O.payment_progress_value=Number.parseFloat(w)||0),e&&(O.project_code=String(e).trim());const B=P!==void 0?P:F;if(B!==void 0){const V=Ko(B)||[];O.payments=V.map(R=>({type:R.type,amount:R.amount!=null?R.amount:null,percentage:R.percentage!=null?R.percentage:null,value:R.value!=null?R.value:null,note:R.note??null,recorded_at:R.recordedAt??null}))}return O.end_datetime||delete O.end_datetime,O.client_company||(O.client_company=null),O}function es(e={}){return qi(e)}function Uo(e={}){return qi(e)}function qi(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(m=>{if(m==null)return null;if(typeof m=="object"){const g=m.id??m.technician_id??m.technicianId;return g!=null?String(g):null}return String(m)}).filter(Boolean),i=(Array.isArray(e.equipment)?e.equipment:[]).map(m=>{const g=m?.equipment_id??m?.equipmentId??m?.id??null,v=m?.quantity??m?.qty??0,_=m?.barcode??m?.code??"",q=m?.description??m?.name??"";return{equipmentId:g!=null?String(g):null,qty:Number.parseInt(String(v),10)||0,barcode:_,description:q}}),o=(Array.isArray(e.expenses)?e.expenses:[]).map((m,g)=>({id:m?.id??`expense-${t??"x"}-${g}`,label:m?.label??"",amount:Number.parseFloat(m?.amount??0)||0,salePrice:Number.parseFloat(m?.sale_price??m?.salePrice??0)||0})),l=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,d=e.company_share_enabled??e.companyShareEnabled,u=d!=null?d===!0||d===1||String(d).toLowerCase()==="true":l>0,b=e.payment_history??e.paymentHistory??e.payments??null,y=Ko(b),p=(()=>{const m=e.cancelled??e.canceled??e.is_cancelled??e.isCanceled;if(m===!0||m==="true"||m===1||m==="1")return!0;if(typeof m=="string"){const g=m.toLowerCase();return g==="yes"||g==="cancelled"||g==="canceled"}return!1})();return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,status:(()=>{const m=String(e.status??e.project_status??"").toLowerCase();if(p||m==="cancelled"||m==="canceled"||m==="ملغي"||m==="ملغى")return"cancelled";if(m==="completed"||m==="مكتمل")return"completed";if(m==="ongoing"||m==="in_progress"||m==="قيد التنفيذ")return"ongoing";if(m==="upcoming"||m==="قادم")return"upcoming"})(),cancelled:p,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,servicesClientPrice:Number.parseFloat(e.services_client_price??e.servicesClientPrice??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?l:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(m=>typeof m=="object"?m:{id:m}),equipment:i,expenses:o,paymentHistory:y}}function vm(e){return e instanceof ar}function fs(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const i=Number.parseFloat(n);return Number.isFinite(i)?i:null}function qm(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=fs(e.value);let s=fs(e.amount),i=fs(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&i==null&&a!=null&&(i=a),!n)if(s!=null&&s>=0)n="amount";else if(i!=null&&i>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(i==null||!Number.isFinite(i)||i<0)return null;i=Math.min(100,Math.round(i*100)/100)}const r=e.note??e.memo??e.description??null,o=r!=null?String(r).trim():null,l=e.recordedAt??e.recorded_at??e.date??null;let d=null;if(l){const b=new Date(l);Number.isNaN(b.getTime())||(d=b.toISOString())}d||(d=new Date().toISOString());const u=n==="amount"?s:n==="percent"?i:a;return{type:n,amount:s??null,percentage:i??null,value:u!=null?Math.round(u*100)/100:null,note:o&&o.length?o.slice(0,500):null,recordedAt:d}}function Ko(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>qm(t)).filter(Boolean):[]}const Vm=Object.freeze(Object.defineProperty({__proto__:null,buildProjectPayload:hm,createProjectApi:ym,deleteProjectApi:gm,ensureProjectsLoaded:Vo,getProjectsState:fm,isApiError:vm,mapLegacyProject:Uo,mapProjectFromApi:es,refreshProjectsFromApi:Oo,setProjectsState:Zn,updateProjectApi:bm},Symbol.toStringTag,{value:"Module"})),ja="reservations-ui:ready",en=typeof EventTarget<"u"?new EventTarget:null;let tn={};function Sm(e){return Object.freeze({...e})}function Em(){if(!en)return;const e=tn,t=typeof CustomEvent=="function"?new CustomEvent(ja,{detail:e}):{type:ja,detail:e};typeof en.dispatchEvent=="function"&&en.dispatchEvent(t)}function Am(e={}){if(!e||typeof e!="object")return tn;const t={...tn};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),tn=Sm(t),Em(),tn}function wm(e){if(e)return tn?.[e]}function Um(e){const t=wm(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const r=(s?.detail||tn)?.[e];typeof r=="function"&&(en&&en.removeEventListener(ja,a),n(r))};en&&en.addEventListener(ja,a)})}function Km(){return Vo().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=me()||{};tl(e||[]),Gr()})}function Si(e=null){Gr(),Qo(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function xm(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Rs(){return{populateEquipmentDescriptionLists:Vt,setFlatpickrValue:em,splitDateTime:or,renderEditItems:Kt,updateEditReservationSummary:ct,addEquipmentByDescription:Zu,addEquipmentToEditingReservation:Yu,addEquipmentToEditingByDescription:Na,combineDateTime:Vn,hasEquipmentConflict:Et,hasTechnicianConflict:dr,renderReservations:Qo,handleReservationsMutation:Si,ensureModal:xm}}function Qo(e="reservations-list",t=null){Du({containerId:e,filters:t,onShowDetails:Go,onConfirmReservation:Xo})}function Go(e){return Fu(e,{getEditContext:Rs,onEdit:(t,{reservation:n})=>{Jo(t,n)},onDelete:Wo})}function Wo(e){return dn()?window.confirm(c("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?Mu(e,{onAfterChange:Si}):!1:(Gn(),!1)}function Xo(e){return zu(e,{onAfterChange:Si})}function Jo(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",i)}nr(e,Rs());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",i)}nr(e,Rs());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const i=t.id??t.reservationId;n.set("reservationEditId",String(i));try{localStorage.setItem("pendingReservationEditId",String(i)),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",r)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",i)}}Fc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(i=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",i)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Qm(){Am({showReservationDetails:Go,deleteReservation:Wo,confirmReservation:Xo,openReservationEditor:Jo})}export{Pm as $,Oo as A,Qm as B,Vo as C,gm as D,ym as E,Cm as F,Om as G,Km as H,Hm as I,$m as J,Si as K,Gr as L,Tm as M,ct as N,jm as O,Bm as P,Rs as Q,be as R,Wo as S,Xo as T,Jo as U,em as V,$n as W,ll as X,ha as Y,km as Z,_l as _,Qe as a,Vm as a0,zi as b,Yr as c,Zr as d,zm as e,Qo as f,Wr as g,wm as h,hm as i,Am as j,Go as k,Dm as l,es as m,Fm as n,fm as o,vm as p,gd as q,Xn as r,eo as s,Xr as t,bm as u,Rm as v,Um as w,Mm as x,Lm as y,Nm as z};
