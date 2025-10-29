import{n as h,l as pe,A as Cc,t as o,a as ot,s as w,u as on,c as Vn,d as La,b as Ji,z as Lc,f as Ze,B as Yi,o as Tc}from"./auth.Cqpwk8pw.js";import{B as se,C as gt,E as Zi,F as jc,D as Ft,G as Rs,n as Ge,H as er,I as wi,J as Mn,K as zn,L as Ta,M as Nc,N as Ms,O as ht,P as zs,Q as wn,R as tr,S as nr,T as Bc,U as Dc,V as Fc,W as ar,X as cn,Y as ma,Z as Rc,_ as ja,$ as sr,a0 as ir,a as Os,o as Hs,q as Vs,a1 as rr,a2 as Mc,s as tn,h as Na,a3 as zc,a4 as or,a5 as Oc,i as Us,r as Ot,a6 as cr,a7 as jt,a8 as fa,m as Se,p as Ne,y as Ba,b as lr,a9 as Hc,aa as fs,j as dr,g as Zt,z as Vc,ab as Uc,l as ur,ac as ys,ad as Kc,u as Qc,ae as Gc,af as Wc,ag as Xc,ah as Jc}from"./reservationsService.DLfLswKU.js";const ss="select.form-select:not([data-no-enhance]):not([multiple])",vt=new WeakMap;let is=null,Ai=!1,At=null;function Ip(e=document){e&&(e.querySelectorAll(ss).forEach(t=>oa(t)),!is&&e===document&&(is=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(ss)&&oa(a),a.querySelectorAll?.(ss).forEach(s=>oa(s)))})}),is.observe(document.body,{childList:!0,subtree:!0})),Ai||(Ai=!0,document.addEventListener("pointerdown",el,{capture:!0})))}function ra(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){oa(e);return}const t=e.closest(".enhanced-select");t&&(Ks(t),ya(t),bs(t))}function oa(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){ra(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};vt.set(t,r),a.addEventListener("click",()=>Zc(t)),a.addEventListener("keydown",i=>tl(i,t)),s.addEventListener("click",i=>al(i,t)),s.addEventListener("keydown",i=>nl(i,t)),e.addEventListener("change",()=>{ya(t),pr(t)}),r.observer=new MutationObserver(i=>{let c=!1,d=!1;for(const l of i)l.type==="attributes"&&l.attributeName==="disabled"&&(d=!0),l.type==="childList"&&(c=!0);d&&bs(t),c&&Yc(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),Ks(t),ya(t),bs(t)}function Yc(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,Ks(t),ya(t)})))}function Ks(e){const t=vt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),pr(e)}function ya(e){const t=vt.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function pr(e){const t=vt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function bs(e){const t=vt.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function Zc(e){vt.get(e)&&(e.getAttribute("data-open")==="true"?An(e):mr(e))}function mr(e){const t=vt.get(e);if(!t)return;At&&At!==e&&An(At,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),At=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function An(e,{focusTrigger:t=!0}={}){const n=vt.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),At===e&&(At=null))}function el(e){if(!At)return;const t=e.target;t instanceof Node&&(At.contains(t)||An(At,{focusTrigger:!1}))}function tl(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),mr(t)):n==="Escape"&&An(t)}function nl(e,t){const n=e.key,a=vt.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&fr(i,t)}else n==="Escape"&&(e.preventDefault(),An(t))}function al(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&fr(n,t)}function fr(e,t){const n=vt.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),An(t)}const xn=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let xt=null;function Qs(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function yr(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function sl(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function il(e={}){const t=sl({...e,activatedAt:Date.now()});return xt=t,yr(!0,t.mode||"create"),Qs(xn.change,{active:!0,selection:{...t}}),t}function ba(e="manual"){if(!xt)return;const t=xt;xt=null,yr(!1),Qs(xn.change,{active:!1,previous:t,reason:e})}function br(){return!!xt}function rl(){return xt?{...xt}:null}function ol(e){if(!xt)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=h(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:r,description:i}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const d=c.map(u=>h(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!d.length)return!1;const l=Number.isInteger(s)&&s>0?s:d.length;t={barcodes:d,quantity:Math.min(l,d.length)},r&&(t.groupKey=r),i&&(t.description=i)}else return!1;return Qs(xn.requestAdd,{...t,selection:{...xt}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||ba("tab-changed")});const cl=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),ll=new Set(["maintenance","reserved","retired"]);function dl(e){const t=String(e??"").trim().toLowerCase();return t&&cl.get(t)||"available"}function ul(e){return e?typeof e=="object"?e:Da(e):null}function kt(e){const t=ul(e);return t?dl(t.status||t.state||t.statusLabel||t.status_label):"available"}function gr(e){return!ll.has(kt(e))}function ln(e={}){return e.image||e.imageUrl||e.img||""}function pl(e){if(!e)return null;const t=se(e),{equipment:n=[]}=pe();return(n||[]).find(a=>se(a?.barcode)===t)||null}function Da(e){const t=se(e);if(!t)return null;const{equipment:n=[]}=pe();return(n||[]).find(a=>se(a?.barcode)===t)||null}const ml=pe()||{};let Nt=(ml.equipment||[]).map(bl),gs=!1,yn="",Xt=null,nn=null,an=null,Fa=!1,xi=!1;function fl(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function yl(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function bl(e={}){return Gs({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function Ra(e={}){return Gs(e)}function Gs(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=Un(e.quantity??e.qty??0),i=Ma(e.unit_price??e.price??0),c=h(String(e.barcode??"").trim()),d=ze(e.status??e.state??e.status_label??e.statusLabel??"available"),l=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:gl(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:d,image:l,imageUrl:l,created_at:e.created_at??null,updated_at:e.updated_at??null}}function gl(e){return e!=null&&e!==""}function Un(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function Ma(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function hl(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function Ii(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function vl(e,t){const n=Ii(e),a=Ii(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}else{if(r!==i)return r?-1:1;{const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}}const c=ha(e?.desc||e?.description||e?.name||""),d=ha(t?.desc||t?.description||t?.name||"");return c.localeCompare(d,"ar",{sensitivity:"base"})}function Be(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ze(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function ql(e){return ze(e)}function ga(){if(!br())return null;const e=rl();return e?{...e}:null}function Sl(e){const t=ga();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:r=null}=t,i=t?.mode||t?.source||"",c=[],d=new Set;if(n.forEach(y=>{const p=se(y?.barcode);!p||d.has(p)||(d.add(p),c.push({variant:y,barcode:p}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(i==="package-manager"||i==="equipment-packages"){const y=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:p})=>p),maxQuantity:y,reason:""}}const l=c.filter(({variant:y})=>{const p=ze(y?.status);return p!=="maintenance"&&p!=="retired"});if(!a||!s)return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=l.filter(({barcode:y})=>!gt(y,a,s,r));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:y})=>y),maxQuantity:u.length};let b=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(l.length>0)b=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const y=new Set(c.map(({variant:p})=>ze(p?.status)));y.has("maintenance")?b=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):y.has("reserved")?b=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):y.has("retired")&&(b=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:b,availableBarcodes:[],maxQuantity:0}}function El(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function hr(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=ga();e.hidden=!s;const r=s?.mode||s?.source||"";s?r==="package-manager"||r==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=ga(),d=c?.mode||c?.source||"";d==="package-manager"||d==="equipment-packages"?ba("package-finish-button"):(ba("return-button"),El())}),t.dataset.listenerAttached="true")}function et(){return Nt}function sn(e){Nt=Array.isArray(e)?e.map(Gs):[],La({equipment:Nt}),yl()}function ha(e){return String(e??"").trim().toLowerCase()}function Rt(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=ha(t);return n||(n=ha(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function za(e){const t=Rt(e);return t?et().filter(n=>Rt(n)===t):[]}function Oa(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=Ha(e);if(n){const a=Be(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${Be(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function Ws(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function va(){const e=Ws();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function Xs(e={}){const t=Ws();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function vn(e){Fa=e;const t=Ws(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function wl(e){if(!on()){Vn();return}if(!e)return;try{await xl()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){w(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let d=0;if(i.forEach(l=>{const u=l.القسم??l.category??"",b=l["القسم الثانوي"]??l.subcategory??"",y=l.الوصف??l.description??l.name??"",p=l.الكمية??l.quantity??0,m=l.السعر??l.price??0,g=l.الباركود??l.barcode??"",v=l.الحالة??l.status??"متاح",_=l.الصورة??l.image_url??l.image??"",q=h(String(g||"")).trim();if(!y||!q){d+=1;return}c.push(Js({category:u,subcategory:b,description:y,quantity:p,unit_price:m,barcode:q,status:v,image_url:_}))}),!c.length){w(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const l=await ot("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(l?.data)?l.data.map(Ra):[];if(u.length){const p=[...et(),...u];sn(p)}await Kn({showToastOnError:!1}),Oe();const b=l?.meta?.count??u.length,y=[];b&&y.push(`${b} ✔️`),d&&y.push(`${d} ⚠️`),w(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(y.length?` (${y.join(" / ")})`:""))}catch(l){const u=_n(l,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");w(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),w(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),w(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const Al="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let Pn=null;function xl(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):Pn||(Pn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=Al,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),Pn=null,e}),Pn)}function Js({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const d=h(String(r||"")).trim(),l=ql(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:Un(a),unit_price:Ma(s),barcode:d,status:l,image_url:c?.trim()||null}}async function vr(){if(!on()){Vn();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await ot("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await Kn({showToastOnError:!1}),w(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=_n(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");w(t,"error")}}function Ha(e){return e.image||e.imageUrl||e.img||""}function Il(e){const t=ze(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function qa(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${Be(a)}</td></tr>`}n&&(n.textContent="0")}function qr(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=Xt?.groupKey||Rt(e);if(!r){qa();return}const i=et().filter(b=>Rt(b)===r).sort((b,y)=>{const p=String(b.barcode||"").trim(),m=String(y.barcode||"").trim();return!p&&!m?0:p?m?p.localeCompare(m,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){qa();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),d=o("equipment.form.labels.quantity","الكمية"),l=et(),u=i.map(b=>{const y=b.id&&e.id?String(b.id)===String(e.id):String(b.barcode||"")===String(e.barcode||""),p=y?"equipment-variants-table__row--current":"",m=Be(String(b.barcode||"-")),g=y?`<span class="equipment-variants-current-badge">${Be(c)}</span>`:"",v=h(String(Number.isFinite(Number(b.qty))?Number(b.qty):0)),_=l.indexOf(b),q=Be(o("equipment.item.actions.delete","🗑️ حذف")),k=_>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${_}">${q}</button>
          </div>`:"";return`
        <tr class="${p}">
          <td>
            ${m}
            ${g}
          </td>
          <td>${Il(b.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${Be(d)}">${v}</span>
          </td>
          <td class="table-actions-cell">${k}</td>
        </tr>
      `}).join("");n.innerHTML=u}function _l({item:e,index:t}){const n=Ha(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=on(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},d=Number.isFinite(Number(e.qty))?Number(e.qty):0,l=Number.isFinite(Number(e.price))?Number(e.price):0,u=d.toLocaleString("en-US"),b=l.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),y=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,p=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,m=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(d-y-p,0),g=m.toLocaleString("en-US"),v=o("equipment.card.labels.availableOfTotal","من أصل"),_=ze(e.status);let q=`${Be(c.available)}: ${Be(g)} ${Be(v)} ${Be(u)}`,k="available";if(m===0){const z={reserved:{text:d===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},M=z[_]||z.default;q=Be(M.text),k=M.modifier}const x=`<span class="equipment-card__availability equipment-card__availability--${k}">${q}</span>`,V="",E=e.desc||e.name||"—",I=e.name&&e.name!==e.desc?e.name:"",N=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${b} ${r}`}].map(({label:z,value:M})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${z}</span>
              <span class="equipment-card__detail-value">${M}</span>
            </span>
          `).join("")}
    </div>`,K=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),$=K.length?`<div class="equipment-card__categories">${K.map(({label:z,value:M})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${z}</span>
              <span class="equipment-card__detail-value">${M}</span>
            </div>
          `).join("")}</div>`:"",B=I?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${I}</span>
      </div>`:"",T=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${E}</h3>
    </div>
  `}
      ${N}
    </div>
  `,j=[],C=Sl(e),H=C?.availableBarcodes?.length?C.availableBarcodes.join(","):C?.barcode?C.barcode:"";let U="",F="";if(C.active){const z=`equipment-select-qty-${t}`,M=!!C.canSelect,ee=M?Math.max(1,Number(C.maxQuantity||C.availableBarcodes?.length||1)):1,de=Math.max(1,Math.min(ee,99)),oe=[];for(let Pe=1;Pe<=de;Pe+=1){const Te=h(String(Pe));oe.push(`<option value="${Pe}"${Pe===1?" selected":""}>${Te}</option>`)}const ve=M?"":" disabled",he=o("reservations.create.equipment.selector.quantityLabel","الكمية"),Q=M?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${h(String(ee))}`:C.reason?C.reason:"";U=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${z}">${he}</label>
        <select class="equipment-card__quantity-select" id="${z}" data-equipment-select-quantity${ve}>
          ${oe.join("")}
        </select>
        ${Q?`<span class="equipment-card__selection-hint">${Be(Q)}</span>`:""}
      </div>
    `;const ne=ga(),qe=ne?.mode||ne?.source||"",ie=qe==="package-manager"||qe==="equipment-packages"?o("equipment.packages.selection.addToPackage","➕ أضف إلى الحزمة"):o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),be=M?"":" disabled",Ee=C.reason?` title="${Be(C.reason)}"`:"",$e=['data-equipment-action="select-reservation"',`data-selection-max="${M?ee:0}"`];H&&$e.push(`data-selection-barcodes="${Be(H)}"`),e.groupKey&&$e.push(`data-selection-group="${Be(String(e.groupKey))}"`),F=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${$e.join(" ")}${be}${Ee}>${ie}</button>
    `}i&&j.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const G=j.length?j.join(`
`):"",L=Be(E);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${Be(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${L}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${V}
        ${x}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${T}
        </div>
      </div>
      <div class="equipment-card__body">
        ${$}
        ${B}
      </div>
      ${U||F||G?`<div class="equipment-card__actions equipment-card__actions--center">
            ${U}
            ${F}
            ${G}
          </div>`:""}
    </article>
  `}function kl(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,a.appendChild(d)}),t.includes(i)&&(a.value=i),ra(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,s.appendChild(d)}),n.includes(i)&&(s.value=i),ra(s)}const r=document.getElementById("filter-status");r&&ra(r)}function In(){const e=pe();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return Nt=t||[],Nt;const s=new Date;let r=!1;const i=new Set((a||[]).filter(d=>d?.status==="open").map(d=>h(String(d?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(d=>{if(!d)return d;const l=ze(d.status),u=h(String(d.barcode??"")).trim().toLowerCase(),b=u&&i.has(u);let y=b?"maintenance":"available";if(!b&&u)for(const p of n||[]){if(!$l(p,s))continue;if(p.items?.some(g=>h(String(g?.barcode??"")).trim().toLowerCase()===u)){y="reserved";break}}return y!==l?(r=!0,{...d,status:y}):{...d,status:y}});return r?sn(c):(Nt=c,La({equipment:Nt})),Nt}function $l(e,t){if(!e?.start||!e?.end)return!1;const n=String(e?.status||e?.reservationStatus||"").toLowerCase();if(n==="cancelled"||n==="canceled")return!1;const a=new Date(e.start),s=new Date(e.end);return Number.isNaN(a.getTime())||Number.isNaN(s.getTime())?!1:a<=t&&t<s}function rs(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Oe(){const e=document.getElementById("equipment-list");if(!e)return;hr();const t=In(),n=Array.isArray(t)?t:et(),a=new Map;n.forEach(g=>{if(!g)return;const v=Rt(g);v&&(a.has(v)||a.set(v,[]),a.get(v).push(g))});const s=Array.from(a.values()).map(g=>{const v=g[0],_=g.reduce((I,P)=>I+(Number.isFinite(Number(P.qty))?Number(P.qty):0),0),q=["maintenance","reserved","available","retired"],k=g.map(I=>ze(I.status)).sort((I,P)=>q.indexOf(I)-q.indexOf(P))[0]||"available",x=g.reduce((I,P)=>{const N=Un(P?.qty??0)||0,K=ze(P?.status);return K==="reserved"?I.reserved+=N:K==="maintenance"&&(I.maintenance+=N),I},{reserved:0,maintenance:0}),V=Math.max(_-x.reserved-x.maintenance,0);return{item:{...v,qty:_,status:k,variants:g,groupKey:Rt(v),reservedQty:x.reserved,maintenanceQty:x.maintenance,availableQty:V},index:n.indexOf(v)}});s.sort((g,v)=>vl(g.item,v.item));const r=document.getElementById("search-equipment")?.value||"",i=h(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",d=document.getElementById("filter-sub")?.value||"",l=document.getElementById("filter-status")?.value||"",u=l?ze(l):"";if(gs&&!n.length){e.innerHTML=rs(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(yn&&!n.length){e.innerHTML=rs(yn,{tone:"error",icon:"⚠️"});return}const b=s.filter(({item:g})=>{const v=h(String(g.barcode??"")).toLowerCase().trim(),_=Array.isArray(g.variants)?g.variants.map(E=>h(String(E.barcode??"")).toLowerCase().trim()).filter(Boolean):[],q=!i||g.name&&g.name.toLowerCase().includes(i)||g.desc&&g.desc.toLowerCase().includes(i)||v&&v.includes(i)||_.some(E=>E.includes(i))||g.category&&g.category.toLowerCase().includes(i)||g.sub&&g.sub.toLowerCase().includes(i),k=!c||g.category===c,x=!d||g.sub===d,V=!u||ze(g.status)===u;return q&&k&&x&&V}),y=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),p=b;e.innerHTML=p.length?p.map(_l).join(""):rs(y);const m=document.getElementById("equipment-list-count");if(m){const g=o("equipment.list.countSuffix","عنصر"),v=h(String(p.length)),_=p.length?`${v} ${g}`:`0 ${g}`;m.textContent=_}kl(n)}async function Kn({showToastOnError:e=!0}={}){gs=!0,yn="",Oe();try{const t=await ot("/equipment/?all=1"),n=t?.data??t;let a=[];Array.isArray(n)?a=n:n&&typeof n=="object"&&(Array.isArray(n.items)?a=n.items:Array.isArray(n.results)?a=n.results:Array.isArray(n.data)?a=n.data:Array.isArray(n.records)&&(a=n.records));const s=a.map(Ra);sn(s)}catch(t){t&&typeof t=="object"&&Number(t.status)===401?yn="":(yn=_n(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&w(yn,"error"))}finally{gs=!1,Oe()}}function _n(e,t,n){if(e instanceof Ji){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function Pl(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),r=Ma(t.querySelector("#new-equipment-price")?.value||"0"),i=Un(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",d=t.querySelector("#new-equipment-category")?.value?.trim()||"",l=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){w(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const b=Js({category:d,subcategory:l,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const y=await ot("/equipment/",{method:"POST",body:b}),p=Ra(y?.data),m=[...et(),p];sn(m),Oe(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),w(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(y){const p=_n(y,"equipment.toast.addFailed","تعذر إضافة المعدة");w(p,"error")}}async function Sr(e){if(!on()){Vn();return}const t=et(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await ot(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),sn(a),Oe(),w(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=_n(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");w(s,"error")}}async function Cl(e,t){const n=et(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},sn(r),Oe();return}const s=Js({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await ot(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=Ra(r?.data),c=[...n];c[e]=i,sn(c),Oe(),w(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=_n(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw w(i,"error"),r}}function aa(){Oe()}function Er(e){const n=et()[e];if(!n)return;nn=e;const a=za(n),s=a[0]||n,r=a.reduce((d,l)=>d+(Number.isFinite(Number(l.qty))?Number(l.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(d=>ze(d.status)).sort((d,l)=>i.indexOf(d)-i.indexOf(l))[0]||ze(s.status);document.getElementById("edit-equipment-index").value=e,Xs({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:Ha(s)||"",barcode:s.barcode||"",status:s.status||c}),vn(!1),an=va(),Oa(s),qr(s),Xt={groupKey:Rt(s),barcode:String(s.barcode||""),id:s.id||null},fl(document.getElementById("editEquipmentModal"))?.show()}function Ll(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),r=s?.querySelector("[data-equipment-select-quantity]");let i=Number.parseInt(r?.value||"1",10);(!Number.isFinite(i)||i<=0)&&(i=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&i>c&&(i=c);const l=(t.dataset.selectionBarcodes||"").split(",").map(p=>p.trim()).filter(p=>p.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",b=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";ol({barcodes:l,quantity:i,groupKey:b,description:u})||w(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||Sr(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||Er(s)}}function Tl(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||Er(n)}}function jl(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||Sr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function wr(){if(!Xt||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=et(),a=Xt.id?n.find(d=>String(d.id)===String(Xt.id)):null,s=Xt.groupKey,r=s?n.find(d=>Rt(d)===s):null,i=a||r;if(!i){qa();return}const c=n.findIndex(d=>d===i);if(c>=0){const d=document.getElementById("edit-equipment-index");d&&(d.value=String(c)),nn=c}if(qr(i),!Fa){const d=za(i),l=d[0]||i,u=d.reduce((p,m)=>p+(Number.isFinite(Number(m.qty))?Number(m.qty):0),0),b=["maintenance","reserved","available","retired"],y=d.map(p=>ze(p.status)).sort((p,m)=>b.indexOf(p)-b.indexOf(m))[0]||ze(l.status);Xs({category:l.category||"",subcategory:l.sub||"",description:l.desc||l.description||"",quantity:String(u||l.qty||0),price:l.price!=null?String(l.price):"0",image:Ha(l)||"",barcode:l.barcode||"",status:l.status||y}),an=va()}Oa(primary)}function Nl(){document.getElementById("search-equipment")?.addEventListener("input",aa),document.getElementById("filter-category")?.addEventListener("change",aa),document.getElementById("filter-sub")?.addEventListener("change",aa),document.getElementById("filter-status")?.addEventListener("change",aa),document.getElementById("add-equipment-form")?.addEventListener("submit",Pl);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),vr().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",Ll),t.addEventListener("keydown",Tl),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",jl),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);hl(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!Fa){an=va(),vn(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){w(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:Un(document.getElementById("edit-equipment-quantity").value)||1,price:Ma(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await Cl(t,n),an=va(),vn(!1),wr()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{Nl(),Oe(),Kn();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(an&&Xs(an),nn!=null){const a=et()[nn];if(a){const r=za(a)[0]||a;Oa(r)}}vn(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Oe(),vn(Fa),nn!=null){const t=et()[nn];if(t){const a=za(t)[0]||t;Oa(a)}}});document.addEventListener("equipment:refreshRequested",()=>{Kn({showToastOnError:!1})});document.addEventListener(Cc.USER_UPDATED,()=>{Oe()});document.addEventListener("equipment:changed",()=>{wr()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{Xt=null,qa(),nn=null,an=null,vn(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!xi&&(document.addEventListener(xn.change,()=>{hr(),Oe()}),xi=!0);const _p=Object.freeze(Object.defineProperty({__proto__:null,clearEquipment:vr,refreshEquipmentFromApi:Kn,renderEquipment:Oe,syncEquipmentStatuses:In,uploadEquipmentFromExcel:wl},Symbol.toStringTag,{value:"Module"})),Bl="__DEBUG_CREW__";function Dl(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(Bl);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function _i(e,t){if(Dl())try{console.log(`🪵 [crew-debug:create] ${e}`,t)}catch{}}const Ar="projects:create:draft",xr="projects.html#projects-section";let hs=null,Ir=[],vs=new Map,qs=new Map,Sa=new Map,os=!1,ca=null,ki=!1,_r=[];function Fl(e){if(!e)return null;let t=_r.find(a=>a.id===e)||null;if(t)return t;const n=nr(e);return n?(t={id:e,name:Dc(n)||e,price:Bc(n),items:Ms(n),raw:n},t):null}function Ea(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function wa(e){return h(String(e||"")).trim().toLowerCase()}function Rl(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function kr(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function $r(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Pr(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Cr(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function rn(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function Ys(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function dn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Je(){const{input:e,hidden:t}=dn();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function Gt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function Lr(e,t,{allowPartial:n=!1}={}){const a=Ge(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function Ss(e,t={}){return Lr(vs,e,t)}function Es(e,t={}){return Lr(qs,e,t)}function Ye(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function Tr(e){Ir=Array.isArray(e)?[...e]:[]}function Zs(){return Ir}function ei(e){return e&&Zs().find(t=>String(t.id)===String(e))||null}function $i(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function qn(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??Ft,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:Ft}function rt(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??Ft,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=Ft),t.dataset.companyShare=String(s),t.checked=!0}function ws(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(os){ye();return}os=!0;const a=()=>{os=!1,ye()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(Ft)),t.disabled){n.checked=!1,w(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),rt()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?rt():n.checked&&(n.checked=!1));a()}function Ml(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Pi(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function Ci(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function It({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=Ys();if(!n||!a||!s)return;const r=Rs()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const d=new Set;vs=new Map;const l=r.filter(p=>p&&p.id!=null).map(p=>({id:String(p.id),label:Ci(p)||c})).filter(p=>{if(!p.label)return!1;const m=Ge(p.label);return!m||d.has(m)?!1:(d.add(m),vs.set(m,p),!0)}).sort((p,m)=>p.label.localeCompare(m.label,void 0,{sensitivity:"base"}));s.innerHTML=l.map(p=>`<option value="${Ea(p.label)}"></option>`).join("");const u=t?"":n.value,b=e?String(e):a.value?String(a.value):"",y=b?r.find(p=>String(p.id)===b):null;if(y){const p=Ci(y)||c;a.value=String(y.id),n.value=p,n.dataset.selectedId=String(y.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function Sn({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=dn();if(!a||!s||!r)return;const i=Array.isArray(t)?t:Zs()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const d=[...i].filter(g=>g&&g.id!=null).sort((g,v)=>String(v.createdAt||v.start||"").localeCompare(String(g.createdAt||g.start||""))),l=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),b=new Set;qs=new Map;const y=d.map(g=>{const v=$i(g)||u;return{id:String(g.id),label:v}}).filter(g=>{if(!g.label)return!1;const v=Ge(g.label);return!v||b.has(v)?!1:(b.add(v),qs.set(v,g),!0)});r.innerHTML=y.map(g=>`<option value="${Ea(g.label)}"></option>`).join("");const p=e?String(e):s.value?String(s.value):"",m=p?d.find(g=>String(g.id)===p):null;if(m){const g=$i(m)||u;s.value=String(m.id),a.value=g,a.dataset.selectedId=String(m.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":l}function Aa(e,t,n){const{date:a,time:s}=tr(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function jr(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||Sn({selectedValue:a});const r=(Rs()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";It(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=Pi(e,"start"),d=Pi(e,"end");c&&Aa("res-start","res-start-time",c),d&&Aa("res-end","res-end-time",d);const l=document.getElementById("res-notes");l&&e.description&&(t||!l.value)&&(l.value=e.description),ye(),Mt()}function Nr({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:pe(),s=Array.isArray(a)?a:[];Tr(s);const r=t!=null?String(t):n.value?String(n.value):"";Sn({selectedValue:r,projectsList:s}),Mt(),ye()}function Mt(){const{input:e,hidden:t}=dn(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),d=document.getElementById("res-discount-type"),l=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),b=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(Gt(n,Je),a&&Gt(a,Je)),s&&Gt(s,Je),r&&Gt(r,Je),i&&Gt(i,Je),c&&Gt(c,Je),d&&Gt(d,Je),b)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=l),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=l),s&&(s.value="unpaid",Ye(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=l),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=l),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=l),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=l),d&&(d.value="percent",d.disabled=!0,d.classList.add("reservation-input-disabled"),d.title=l);else{if(n){const y=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",y&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.disabled=!1,d.classList.remove("reservation-input-disabled"),d.title="")}ws("tax"),ye()}function ti(){const{input:e,hidden:t}=dn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Es(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=ei(r.id);i?jr(i,{skipProjectSelectUpdate:!0}):(Mt(),ye())}else t.value="",e.dataset.selectedId="",Mt(),ye()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Es(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function ni(){const{input:e,hidden:t}=Ys();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Ss(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),ye()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Ss(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function zl(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){Nn({clearValue:!0});return}let n=null;try{const l=decodeURIComponent(t);n=JSON.parse(l)}catch(l){console.warn("⚠️ [reservations/createForm] Failed to decode project context",l)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),Nn({clearValue:!1}),!n)return;n.fromProjectForm&&(ca={draftStorageKey:n.draftStorageKey||Ar,returnUrl:n.returnUrl||xr});const r=document.getElementById("res-project");if(n.projectId){r&&(Sn({selectedValue:String(n.projectId)}),Mt());const l=ei(n.projectId);l?jr(l,{forceNotes:!!n.forceNotes}):ye(),Nn()}else{r&&Sn({selectedValue:""});const l=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");nd(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),l)}n.start&&Aa("res-start","res-start-time",n.start),n.end&&Aa("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(Rs()||[]).find(b=>String(b.id)===String(n.customerId));u?.id!=null&&(It({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(It({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):It({selectedValue:""});const d=document.getElementById("res-notes");d&&n.description&&!d.value&&(d.value=n.description),ye()}function un(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Mn(e,n),end:Mn(t,a)}}function Br(e){const t=wa(e);if(t){const c=Sa.get(t);if(c)return c}const{description:n,barcode:a}=kr(e);if(a){const c=Da(a);if(c)return c}const s=Ge(n||e);if(!s)return null;let r=ar();if(!r?.length){const c=pe();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&or(r)}const i=r.find(c=>Ge(c?.desc||c?.description||"")===s);return i||r.find(c=>Ge(c?.desc||c?.description||"").includes(s))||null}function Dr(e,t="equipment-description-options"){const n=wa(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(d=>wa(d.value)===n)||Sa.has(n))return!0;const{description:s}=kr(e);if(!s)return!1;const r=Ge(s);return r?(ar()||[]).some(c=>Ge(c?.desc||c?.description||"")===r):!1}const Ol={available:0,reserved:1,maintenance:2,retired:3};function Hl(e){return Ol[e]??5}function Li(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function Vl(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${Li(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${Li(n)})`}function zt(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=In(),a=pe(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];or(r);const i=new Map;r.forEach(l=>{const u=Rl(l),b=wa(u);if(!b||!u)return;const y=kt(l),p=Hl(y),m=i.get(b);if(!m){i.set(b,{normalized:b,value:u,bestItem:l,bestStatus:y,bestPriority:p,statuses:new Set([y])});return}m.statuses.add(y),p<m.bestPriority&&(m.bestItem=l,m.bestStatus=y,m.bestPriority=p,m.value=u)}),Sa=new Map;const d=Array.from(i.values()).sort((l,u)=>l.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(l=>{Sa.set(l.normalized,l.bestItem);const u=Vl(l),b=Ea(l.value);if(u===l.value)return`<option value="${b}"></option>`;const y=Ea(u);return`<option value="${b}" label="${y}"></option>`}).join("");e&&(e.innerHTML=d),t&&(t.innerHTML=d)}function Fr(e,t,n={}){const{silent:a=!1}=n,s=se(e);if(!s)return{success:!1,message:null};const{start:r,end:i}=un();if(!r||!i){const m=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||w(m),{success:!1,message:m}}const c=ht();if(ai(c).has(s)){const m=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||w(m),{success:!1,message:m}}const l=zs(s,r,i);if(l.length){const m=l.map(v=>v.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`);return a||w(g),{success:!1,message:g}}if(gt(s,r,i)){const m=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||w(m),{success:!1,message:m}}const u=Da(s);if(!u){const m=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||w(m),{success:!1,message:m}}const b=kt(u);if(b==="maintenance"||b==="retired"){const m=rn(b);return a||w(m),{success:!1,message:m}}const y=cn(u);if(!y){const m=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||w(m),{success:!1,message:m}}Ta({id:y,equipmentId:y,barcode:s,desc:u.desc,qty:1,price:u.price,image:ln(u)}),t&&(t.value=""),$t(),ye();const p=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||w(p),{success:!0,message:p,barcode:s}}function As(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Br(t);if(!n){w(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=pl(n.barcode),s=kt(a||n);if(s==="maintenance"||s==="retired"){w(rn(s));return}const r=se(n.barcode);if(!r){w(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=cn(n);if(!i){w(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:ln(n)},{start:d,end:l}=un();if(!d||!l){w(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=ht();if(ai(u).has(r)){w(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const y=zs(r,d,l);if(y.length){const p=y.map(m=>m.name).join(", ");w(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${p}`));return}if(gt(r,d,l)){w(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}Ta(c),$t(),ye(),w(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function Ul(){zt();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),As(e))});const t=()=>{Dr(e.value,"equipment-description-options")&&As(e)};e.addEventListener("focus",()=>{if(zt(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Ti(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function ai(e=ht()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=se(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const r=se(s?.normalizedBarcode??s?.barcode);r&&t.add(r)})}),t}function Kl(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=un();if(!t||!n){w(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}il({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):w(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(xn.change,t=>{Ti(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),Ti(e,br()))}function Ql(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,r=a.length?a:t.barcode?[t.barcode]:[];if(!r.length)return;let i=0,c=null;const d=[],l=new Set;r.forEach(b=>{const y=se(b);y&&!l.has(y)&&(l.add(y),d.push(y))});const u=Math.min(s,d.length);for(let b=0;b<u;b+=1){const y=d[b],p=Fr(y,null,{silent:!0});p.success&&(i+=1),p.message&&(c=p.message)}if(i>0){const y=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",h(String(i)));w(y)}else c&&w(c)}function Rr(){Kl(),!(ki||typeof document>"u")&&(document.addEventListener(xn.requestAdd,Ql),ki=!0)}function Qn(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),r=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:r}}function xs(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=Qn();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const r=document.getElementById("equipment-barcode"),i=document.getElementById("equipment-description"),c=t==="package";r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),Oc(t),t==="package"&&Va()}function Va(){const{packageSelect:e,packageHint:t}=Qn();if(!e)return;const n=Zi();_r=n,jc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,r=n.map(c=>{const d=Number.isFinite(Number(c.price))?Number(c.price):0,l=h(d.toFixed(2)),u=`${c.name} — ${l} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${r}`,e.selectedIndex=0;const i=n.length>0;e.disabled=!i,t&&(i?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),Or()}function Gl(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:r,blockingPackages:i})=>{const c=r?.desc||h(String(r?.barcode??r?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(i)&&i.length){const d=i.map(l=>l.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${d})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function Mr(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const r=zn(e);if(!r)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const i=Fl(r);if(!i)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(p=>p?.type==="package"&&zn(p.packageId)===r))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(Nc(r,n,a,s)){const p=i.name||r;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${p} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(i.items)&&i.items.length?i.items:Ms(i.raw??{}),d=ai(t),l=[],u=new Set;if(c.forEach(p=>{const m=se(p?.normalizedBarcode??p?.barcode);if(m){if(u.has(m)){l.push({item:p,type:"internal"});return}u.add(m),d.has(m)&&l.push({item:p,type:"external"})}}),l.length){const p=l.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>h(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:l.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",p):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",p),duplicates:l}}const b=[];return c.forEach(p=>{const m=se(p?.normalizedBarcode??p?.barcode);if(m&&gt(m,n,a,s)){const g=zs(m,n,a,s);b.push({item:p,blockingPackages:g})}}),b.length?{success:!1,reason:"item_conflict",message:Gl(i,b),conflicts:b}:{success:!0,package:{id:`package::${r}`,packageId:r,type:"package",desc:i.name||`Package ${r}`,qty:1,price:Number.isFinite(Number(i.price))?Number(i.price):0,barcode:i.code||i.raw?.package_code||`pkg-${r}`,packageItems:c.map(p=>({equipmentId:p?.equipmentId??null,barcode:p?.barcode??p?.normalizedBarcode??"",normalizedBarcode:se(p?.normalizedBarcode??p?.barcode),desc:p?.desc??"",qty:Number.isFinite(Number(p?.qty))?Number(p.qty):1,price:Number.isFinite(Number(p?.price))?Number(p.price):0})),image:c.find(p=>p?.image)?.image??null},packageInfo:i}}function zr(e,{silent:t=!1}={}){const n=zn(e);if(!n)return t||w(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=un(),r=ht(),i=Mr(n,{existingItems:r,start:a,end:s});if(!i.success){if(!t){const d={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[i.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");w(i.message||d)}return i}return Ta(i.package),$t(),ye(),t||w(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:i.package}}function Or(){const{packageSelect:e}=Qn();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;zr(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function Wl(){const{packageAddButton:e,packageSelect:t}=Qn();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){w(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}zr(n)}),e.dataset.listenerAttached="true")}function Hr(){const{modeRadios:e}=Qn();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&xs(s.target.value)}),a.dataset.listenerAttached="true")}),Wl(),Or();const t=ma(),n=e.find(a=>a.value===t);n&&(n.checked=!0),xs(t)}function $t(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=ht(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),d=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const l=wn(n);t.innerHTML=l.map(u=>{const b=u.items[0]||{},y=ln(b)||u.image,p=y?`<img src="${y}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=h(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,v=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,_=`${h(g.toFixed(2))} ${s}`,q=`${h(v.toFixed(2))} ${s}`,k=u.items.some(I=>I?.type==="package"),x=u.barcodes.map(I=>h(String(I||""))).filter(Boolean),V=x.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${x.map(I=>`<li>${I}</li>`).join("")}
            </ul>
          </details>`:"";let E="";if(k){const I=new Map;if(u.items.forEach(P=>{Array.isArray(P?.packageItems)&&P.packageItems.forEach(N=>{if(!N)return;const K=se(N.barcode||N.desc||Math.random()),$=I.get(K);if($){$.qty+=Number.isFinite(Number(N.qty))?Number(N.qty):1;return}I.set(K,{desc:N.desc||N.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(N.qty))?Number(N.qty):1,barcode:N.barcode??N.normalizedBarcode??""})})}),I.size){const P=Array.from(I.values()).map(N=>{const K=h(String(N.qty)),$=N.desc||h(String(N.barcode||"")),B=N.barcode?` <span class="reservation-package-items__barcode">(${h(String(N.barcode))})</span>`:"";return`<li>${$}${B} × ${K}</li>`}).join("");E=`
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
                ${k?`${E||""}${V||""}`:V}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${c}" ${k?"disabled":""}>−</button>
              <span class="reservation-qty-value">${m}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${i}" ${k?"disabled":""}>+</button>
            </div>
          </td>
          <td>${_}</td>
          <td>${q}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${d}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function Xl(e){const t=ht(),a=wn(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Rc(s),$t(),ye())}function Jl(e){const t=ht(),n=t.filter(a=>ja(a)!==e);n.length!==t.length&&(sr(n),$t(),ye())}function Yl(e){const t=ht(),a=wn(t).find(b=>b.key===e);if(!a)return;const{start:s,end:r}=un();if(!s||!r){w(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(b=>se(b.barcode))),{equipment:c=[]}=pe(),d=(c||[]).find(b=>{const y=se(b?.barcode);return!y||i.has(y)||ja({desc:b?.desc||b?.description||b?.name||"",price:Number(b?.price)||0})!==e||!gr(b)?!1:!gt(y,s,r)});if(!d){w(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const l=se(d.barcode),u=cn(d);if(!u){w(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}Ta({id:u,equipmentId:u,barcode:l,desc:d.desc||d.description||d.name||a.description||"",qty:1,price:Number.isFinite(Number(d.price))?Number(d.price):a.unitPrice,image:ln(d)}),$t(),ye()}function ye(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),d=c?.value||"unpaid",{start:l,end:u}=un();i&&rt();const b=qn(),y=document.getElementById("res-payment-progress-type"),p=document.getElementById("res-payment-progress-value"),m=$r(y),g=Pr(p);er(),wi({selectedItems:ht(),discount:n,discountType:s,applyTax:i,paidStatus:d,paymentProgressType:m,paymentProgressValue:g,start:l,end:u,companySharePercent:b,paymentHistory:[]});const v=wi.lastResult;v?(Cr(p,v.paymentProgressValue),c&&(c.value=v.paymentStatus,Ye(c,v.paymentStatus))):Ye(c,d)}function Zl(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=h(c.target.value),ye()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",ye),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(Je()){n.checked=!1,w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}ws("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(Je()){a.checked=!1,w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}ws("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(Je()){s.value="unpaid",Ye(s,"unpaid"),w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ye(s),ye()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(Je()){r.value="percent",w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",ye()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(Je()){i.value="",w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=h(c.target.value),ye()}),i.dataset.listenerAttached="true"),ye()}function ed(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){ye();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),ye()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function ji(){const{input:e,hidden:t}=Ys(),{input:n,hidden:a}=dn(),{customers:s}=pe();let r=t?.value?String(t.value):"";if(!r&&e?.value){const Q=Ss(e.value,{allowPartial:!0});Q&&(r=String(Q.id),t&&(t.value=r),e.value=Q.label,e.dataset.selectedId=r)}const i=s.find(Q=>String(Q.id)===r);if(!i){w(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let d=a?.value?String(a.value):"";if(!d&&n?.value){const Q=Es(n.value,{allowPartial:!0});Q&&(d=String(Q.id),a&&(a.value=d),n.value=Q.label,n.dataset.selectedId=d)}const l=document.getElementById("res-start").value,u=document.getElementById("res-end").value,b=document.getElementById("res-start-time")?.value||"00:00",y=document.getElementById("res-end-time")?.value||"00:00";if(!l||!u){w(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const p=`${l}T${b}`,m=`${u}T${y}`,g=new Date(p),v=new Date(m);if(Number.isNaN(g.getTime())||Number.isNaN(v.getTime())||g>=v){w(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const _=er();_.map(Q=>Q.technicianId).filter(Boolean);const q=ht();if(q.length===0&&_.length===0){w(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const k=document.getElementById("res-notes")?.value||"",x=parseFloat(h(document.getElementById("res-discount")?.value))||0,V=document.getElementById("res-discount-type")?.value||"percent",E=document.getElementById("res-payment-status"),I=E?.value||"unpaid",P=document.getElementById("res-payment-progress-type"),N=document.getElementById("res-payment-progress-value"),K=$r(P),$=Pr(N),B=d?ei(d):null,Y=Ml(B);if(d&&!B){w(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const Q of q){const ne=kt(Q.barcode);if(ne==="maintenance"||ne==="retired"){w(rn(ne));return}}for(const Q of q){const ne=se(Q.barcode);if(gt(ne,p,m)){w(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const Q of _)if(Q?.technicianId&&ir(Q.technicianId,p,m)){w(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const T=document.getElementById("res-tax"),j=document.getElementById("res-company-share"),C=!!d;C?(T&&(T.checked=!1,T.disabled=!0,T.classList.add("disabled"),T.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),j&&(j.checked=!1,j.disabled=!0,j.classList.add("disabled"),j.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),E&&(E.value="unpaid",E.disabled=!0,Ye(E,"unpaid"),E.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),P&&(P.disabled=!0,P.classList.add("disabled")),N&&(N.value="",N.disabled=!0,N.classList.add("disabled"))):(T&&(T.disabled=!1,T.classList.remove("disabled"),T.title=""),j&&(j.disabled=!1,j.classList.remove("disabled"),j.title=""),E&&(E.disabled=!1,E.title=""),P&&(P.disabled=!1,P.classList.remove("disabled")),N&&(N.disabled=!1,N.classList.remove("disabled")));const H=C?!1:T?.checked||!1,U=!!j?.checked;if(!C&&U!==H){w(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let F=U?qn():null;U&&(!Number.isFinite(F)||F<=0)&&(rt(),F=qn());const G=U&&H&&Number.isFinite(F)&&F>0;H&&rt();const L=Os(q,x,V,H,_,{start:p,end:m,companySharePercent:G?F:0}),z=Lc(),M=Hs({totalAmount:L,progressType:K,progressValue:$,history:[]});N&&Cr(N,M.paymentProgressValue);const ee=[];M.paymentProgressValue!=null&&M.paymentProgressValue>0&&ee.push({type:M.paymentProgressType||K,value:M.paymentProgressValue,amount:M.paidAmount,percentage:M.paidPercent,recordedAt:new Date().toISOString()});const de=Vs({manualStatus:I,paidAmount:M.paidAmount,paidPercent:M.paidPercent,totalAmount:L});E&&(E.value=de,Ye(E,de));const oe=typeof B?.paymentStatus=="string"?B.paymentStatus.toLowerCase():null,ve=oe&&["paid","partial","unpaid"].includes(oe)?oe:"unpaid",he=rr({reservationCode:z,customerId:c,start:p,end:m,status:Y?"confirmed":"pending",title:null,location:null,notes:k,projectId:d||null,totalAmount:L,discount:C?0:x,discountType:C?"percent":V,applyTax:H,paidStatus:C?ve:de,confirmed:Y,items:q.map(Q=>({...Q,equipmentId:Q.equipmentId??Q.id})),crewAssignments:_,companySharePercent:C||!G?null:F,companyShareEnabled:C?!1:G,paidAmount:C?0:M.paidAmount,paidPercentage:C?0:M.paidPercent,paymentProgressType:C?null:M.paymentProgressType,paymentProgressValue:C?null:M.paymentProgressValue,paymentHistory:C?[]:ee});try{_i("about to submit",{crewAssignments:_,techniciansPayload:he?.technicians,payload:he});const Q=await Mc(he);_i("server response",{reservation:Q?.id??Q?.reservationId??Q?.reservation_code,technicians:Q?.technicians,crewAssignments:Q?.crewAssignments,techniciansDetails:Q?.techniciansDetails}),In(),zt(),tn(),ad(),w(o("reservations.toast.created","✅ تم إنشاء الحجز"));try{const ne=document.getElementById("sub-tab-trigger-my-reservations-tab");ne&&typeof ne.click=="function"&&setTimeout(()=>ne.click(),0)}catch{}typeof hs=="function"&&hs({type:"created",reservation:Q}),td(Q)}catch(Q){console.error("❌ [reservations/createForm] Failed to create reservation",Q);const ne=Na(Q)?Q.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");w(ne,"error"),C&&(w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),Nn({clearValue:!1}))}}function td(e){if(!ca)return;const{draftStorageKey:t=Ar,returnUrl:n=xr}=ca,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}ca=null,n&&(window.location.href=n)}function Nn({clearValue:e=!1}={}){const{input:t,hidden:n}=dn();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,Mt())}function nd(e,t=""){const{input:n,hidden:a}=dn();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),Mt())}function ad(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),It({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),Nn({clearValue:!1}),Sn({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",Ye(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),zc(),sr([]),ba("form-reset"),$t(),Mt(),ye()}function sd(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){Xl(s);return}if(a==="increase-group"&&s){Yl(s);return}if(a==="remove-group"&&s){Jl(s);return}}),e.dataset.listenerAttached="true")}function id(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(ma()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,Fr(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||ma()!=="single")return;const{start:r,end:i}=un();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function rd(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await ji()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await ji()}),t.dataset.listenerAttached="true")}function kp({onAfterSubmit:e}={}){hs=typeof e=="function"?e:null;const{customers:t,projects:n}=pe();Fc(t||[]),It(),ni(),Tr(n||[]),Nr({projectsList:n}),ti(),zt(),Va(),Ul(),Rr(),Hr(),ed(),Zl(),sd(),id(),rd(),zl(),ye(),$t()}function Vr(){zt(),Va(),Nr(),It(),ni(),ti(),Rr(),Hr(),$t(),ye()}if(typeof document<"u"){const e=()=>{It(),Sn({projectsList:Zs()}),ni(),ti(),ye()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{zt()}),document.addEventListener("packages:changed",()=>{Va(),ma()==="package"&&xs("package")})}typeof window<"u"&&(window.getCompanySharePercent=qn);function Ur(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:Wt(t),endDate:Wt(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:Wt(n),endDate:Wt(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Wt(n),endDate:Wt(a)}}return e==="upcoming"?{startDate:Wt(t),endDate:""}:{startDate:"",endDate:""}}function od(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=h(t?.value||"").trim(),i=h(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),xa(t),xa(n),r="",i=""),!r&&!i&&c){const l=Ur(c);r=l.startDate,i=l.endDate}return{searchTerm:Ge(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function $p(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{cd(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),xa(a),xa(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function cd(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=Ur(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function Wt(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function xa(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function sa(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function ld(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function dd(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=ld(n);if(a!==null)return a}return null}function Ni(e,t=0){const n=dd(e);if(n!=null)return n;const a=sa(e.createdAt??e.created_at);if(a!=null)return a;const s=sa(e.updatedAt??e.updated_at);if(s!=null)return s;const r=sa(e.start);if(r!=null)return r;const i=sa(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function ud({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((q,k)=>({reservation:q,index:k})),i=t.searchTerm||"",c=t.searchReservationId||"",d=t.searchCustomerName||"",l=t.searchProjectId||"",u=t.startDate||"",b=t.endDate||"",y=t.status||"",p=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,m=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,v=b?new Date(`${b}T23:59:59`):null,_=r.filter(({reservation:q})=>{const k=n.get(String(q.customerId)),x=s?.get?.(String(q.projectId)),V=q.start?new Date(q.start):null,E=Us(q),{effectiveConfirmed:I}=Ot(q,x);if(p!=null&&String(q.customerId)!==String(p)||m!=null&&!(Array.isArray(q.technicians)?q.technicians.map(B=>String(B)):[]).includes(String(m))||y==="confirmed"&&!I||y==="pending"&&I||y==="completed"&&!E)return!1;if(y==="cancelled"){const $=String(q?.status||q?.reservationStatus||"").toLowerCase();if(!["cancelled","canceled"].includes($))return!1}if(g&&V&&V<g||v&&V&&V>v)return!1;if(c){const $=[q.reservationId,q.id,q.reservation_id,q.reservationCode,q.reservation_code,q.code,q.reference,q.referenceNumber,q.reference_number],B=Ge($.filter(T=>T!=null&&T!=="").map(String).join(" ")).replace(/\s+/g,""),Y=c.replace(/\s+/g,"");if(!B.includes(Y))return!1}if(d&&!Ge(k?.customerName||"").includes(d))return!1;if(l){const $=[q.projectId,q.project_id,q.projectID,x?.id,x?.projectCode,x?.project_code],B=Ge($.filter(T=>T!=null&&T!=="").map(String).join(" ")).replace(/\s+/g,""),Y=l.replace(/\s+/g,"");if(!B.includes(Y))return!1}if(!i)return!0;const P=q.items?.map?.($=>`${$.barcode} ${$.desc}`).join(" ")||"",N=(q.technicians||[]).map($=>a.get(String($))?.name).filter(Boolean).join(" ");return Ge([q.reservationId,k?.customerName,q.notes,P,N,x?.title].filter(Boolean).join(" ")).includes(i)});return _.sort((q,k)=>{const x=Ni(q.reservation,q.index),V=Ni(k.reservation,k.index);return x!==V?V-x:k.index-q.index}),_}function pd({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),d=o("reservations.list.itemsCountShort","{count} عنصر"),l=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),b=o("reservations.list.status.pending","⏳ غير مؤكد"),y=o("reservations.list.status.completed","📁 منتهي"),p=o("reservations.list.payment.paid","💳 مدفوع"),m=o("reservations.list.payment.unpaid","💳 غير مدفوع"),g=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),v=o("reservations.list.actions.confirm","✔️ تأكيد"),_=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),q=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),k={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:x,index:V})=>{const E=t.get(String(x.customerId)),I=x.projectId?a?.get?.(String(x.projectId)):null,P=Us(x),N=typeof I?.paymentStatus=="string"?I.paymentStatus.toLowerCase():null,K=x.paidStatus??x.paid_status??(x.paid===!0||x.paid==="paid"?"paid":"unpaid"),$=N&&["paid","partial","unpaid"].includes(N)?N:K,B=$==="paid",Y=$==="partial",{effectiveConfirmed:T,projectLinked:j}=Ot(x,I),C=T?"status-confirmed":"status-pending",H=B?"status-paid":Y?"status-partial":"status-unpaid";let U=`<span class="reservation-chip status-chip ${C}">${T?u:b}</span>`;const F=B?p:Y?g:m;let G=`<span class="reservation-chip status-chip ${H}">${F}</span>`,L=B?" tile-paid":Y?" tile-partial":" tile-unpaid";P&&(L+=" tile-completed");let z="";P&&(U=`<span class="reservation-chip status-chip status-completed">${y}</span>`,G=`<span class="reservation-chip status-chip status-completed">${F}</span>`,z=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);let M=!j&&!T?`<button class="tile-confirm" data-reservation-index="${V}" data-action="confirm">${v}</button>`:"";{const S=String(x?.status||x?.reservationStatus||"").toLowerCase();(S==="cancelled"||S==="canceled")&&(U=`<span class="reservation-chip status-chip status-cancelled">${o("reservations.list.status.cancelled","❌ ملغي")}</span>`,L=" tile-cancelled",z="",typeof M<"u"&&(M=""))}const ee=M?`<div class="tile-actions">${M}</div>`:"",de=x.items?.length||0,oe=Array.isArray(x.crewAssignments)?x.crewAssignments:[],ve=(x.technicians||[]).map(S=>n.get(String(S))).filter(Boolean),he=oe.length?oe.map(S=>{const Z=S.positionLabel??S.position_name??S.role??o("reservations.crew.positionFallback","منصب بدون اسم"),J=S.technicianName??n.get(String(S.technicianId??""))?.name??null;return J?`${h(Z)} (${h(J)})`:h(Z)}):ve.map(S=>S.name),Q=he.length?he.join(l):"—",ne=h(String(x.reservationId??"")),qe=x.start?h(Ze(x.start)):"-",W=x.end?h(Ze(x.end)):"-",ie=h(String(x.cost??0)),be=h(String(de)),Ee=x.notes?h(x.notes):c,$e=d.replace("{count}",be),Pe=x.applyTax?`<small>${r}</small>`:"";let Te=_;return x.projectId&&(Te=I?.title?h(I.title):q),`
      <div class="${M?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${L}"${z} data-reservation-index="${V}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${ne}</div>
          <div class="tile-badges">
            ${U}
            ${G}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${k.client}</span>
            <span class="tile-value">${E?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${k.project}</span>
            <span class="tile-value">${Te}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${k.start}</span>
            <span class="tile-value tile-inline">${qe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${k.end}</span>
            <span class="tile-value tile-inline">${W}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${k.cost}</span>
            <span class="tile-value">${ie} ${s} ${Pe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${k.equipment}</span>
            <span class="tile-value">${$e}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${k.crew}</span>
            <span class="tile-value">${he.length?Q:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${Ee}</span>
          </div>
        </div>
        ${ee}
      </div>
    `}).join("")}function Qe(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function cs(e){if(e==null)return"";const t=String(e).trim();return t?h(t):""}function Bi(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=Ot(e,s),c=e.paid===!0||e.paid==="paid",d=Us(e),l=e.items||[];let{groups:u}=cr(e);const b=f=>!!(f&&typeof f=="object"&&(f.type==="package"||Array.isArray(f.packageItems)&&f.packageItems.length||Array.isArray(f.items)&&f.items.some(R=>R&&R.type==="package"))),y=f=>{const R=(f?.package_code??f?.packageDisplayCode??f?.barcode??f?.description??(Array.isArray(f?.items)&&f.items[0]?.barcode)??"").toString().trim().toLowerCase();return h(R)},p=(f,R)=>{const te=we=>{const Le=Array.isArray(we?.items)?we.items[0]:null,Ie=[Le?.price,Le?.unit_price,Le?.unitPrice,we?.unitPrice,we?.totalPrice];for(const Lt of Ie){const Fe=Ne(Lt);if(Number.isFinite(Fe)&&Fe>0)return Fe}return 0},me=te(f),ge=te(R);return me&&ge?me<=ge?f:R:me?f:R},m=[],g=new Map;u.forEach(f=>{if(!b(f)){m.push(f);return}const R=y(f);if(!R){if(!g.has("__unknown__"))g.set("__unknown__",m.length),m.push(f);else{const te=g.get("__unknown__");m[te]=p(m[te],f)}return}if(!g.has(R))g.set(R,m.length),m.push(f);else{const te=g.get(R);m[te]=p(m[te],f)}}),u=m;const{technicians:v=[]}=pe(),_=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(v)?v:[]),q=new Map;_.forEach(f=>{if(!f||f.id==null)return;const R=String(f.id),te=q.get(R)||{};q.set(R,{...te,...f})});const x=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(f=>({technicianId:f}))).map((f,R)=>{const te=f?.technicianId!=null?q.get(String(f.technicianId)):null;let me=f.positionLabel??f.position_name??f.position_label??f.role??f.position??"";(!me||me.trim()==="")&&(me=f.positionLabelAr??f.position_label_ar??f.positionLabelEn??f.position_label_en??f.position_name_ar??f.position_name_en??"");const ge=f.positionLabelAlt??f.position_label_alt??f.positionLabelEn??f.position_label_en??f.positionLabelAr??f.position_label_ar??"";let we=me,Le=ge;if(!we||we.trim()==="")try{const Fe=jt?jt():[];let ae=null;if(f.positionId!=null&&(ae=Fe.find(_e=>String(_e.id)===String(f.positionId))||null),!ae){const _e=f.positionKey??f.position_key??f.positionName??f.position_name??f.position??"";if(_e&&(ae=typeof fa=="function"?fa(_e):null,!ae&&Fe.length)){const nt=String(_e).trim().toLowerCase();ae=Fe.find(at=>[at.name,at.labelAr,at.labelEn].filter(Boolean).map(Tt=>String(Tt).toLowerCase()).includes(nt))||null}}ae&&(we=ae.labelAr||ae.labelEn||ae.name||"",(!Le||String(Le).trim()==="")&&(ae.labelAr&&ae.labelEn?Le=we===ae.labelAr?ae.labelEn:ae.labelAr:Le=ae.labelAr||ae.labelEn||""))}catch{}const Ie=Se(Ne(f.positionCost??f.position_cost??f.cost??f.daily_wage??f.dailyWage??te?.dailyWage??te?.wage??0)),Lt=Se(Ne(f.positionClientPrice??f.position_client_price??f.client_price??f.clientPrice??f.daily_total??f.dailyTotal??f.total??te?.dailyTotal??te?.total??te?.total_wage??0));return{assignmentId:f.assignmentId??f.assignment_id??`crew-${R}`,positionId:f.positionId??f.position_id??null,positionKey:f.positionKey??f.position_key??f.positionName??f.position_name??f.position??null,positionLabel:we,positionLabelAlt:Le,positionLabelAr:f.positionLabelAr??f.position_label_ar??null,positionLabelEn:f.positionLabelEn??f.position_label_en??null,positionCost:Ie,positionClientPrice:Lt,technicianId:f.technicianId!=null?String(f.technicianId):te?.id!=null?String(te.id):null,technicianName:f.technicianName??f.technician_name??te?.name??null,technicianRole:f.technicianRole??te?.role??null,technicianPhone:f.technicianPhone??te?.phone??null,notes:f.notes??null}}),V=on(),E=Ba(e.start,e.end),I=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,P=Ne(I),N=Number.isFinite(P)?P:0,K=e.discountType??e.discount_type??e.discountMode??"percent",$=String(K).toLowerCase()==="amount"?"amount":"percent",B=r?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),Y=Ne(e.cost??e.total??e.finalTotal),T=Number.isFinite(Y),j=T?Se(Y):0,C=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,H=C!=null?Ne(C):Number.NaN;let G=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(H)&&H>0)&&Number.isFinite(H)?H:0;B&&G<=0&&(G=Ft);const L=lr({items:l,technicianIds:e.technicians||[],crewAssignments:x,discount:N,discountType:$,applyTax:B,start:e.start,end:e.end,companySharePercent:G}),z=Se(L.equipmentTotal),M=Se(L.crewTotal);Se(L.crewCostTotal);const ee=Se(L.discountAmount),de=Se(L.subtotalAfterDiscount),oe=Number.isFinite(L.companySharePercent)?L.companySharePercent:0;let ve=Se(L.companyShareAmount);ve=oe>0?Se(Math.max(0,ve)):0;const he=Se(L.taxAmount),Q=Se(L.finalTotal),ne=r?Q:T?j:Q,qe=Se(L.netProfit),W=h(String(e.reservationId??e.id??"")),ie=e.start?h(Ze(e.start)):"-",be=e.end?h(Ze(e.end)):"-",Ee=h(String(x.length)),$e=h(z.toFixed(2)),Pe=h(ee.toFixed(2)),Te=h(de.toFixed(2)),qt=h(he.toFixed(2)),S=h((Number.isFinite(ne)?ne:0).toFixed(2)),Z=h(String(E)),J=o("reservations.create.summary.currency","SR"),ue=o("reservations.details.labels.discount","الخصم"),ce=o("reservations.details.labels.tax","الضريبة (15%)"),Re=o("reservations.details.labels.crewTotal","إجمالي الفريق"),ct=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),Ke=o("reservations.details.labels.duration","عدد الأيام"),lt=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),Pt=o("reservations.details.labels.netProfit","💵 صافي الربح"),$n=o("reservations.create.equipment.imageAlt","صورة"),He={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},Ya=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),O=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");o("reservations.details.technicians.roleUnknown","غير محدد");const Ce=o("reservations.details.technicians.phoneUnknown","غير متوفر");o("reservations.details.technicians.wage","{amount} {currency} / اليوم");const dt=o("reservations.list.status.confirmed","✅ مؤكد"),St=o("reservations.list.status.pending","⏳ غير مؤكد"),Xn=o("reservations.list.payment.paid","💳 مدفوع"),Jn=o("reservations.list.payment.unpaid","💳 غير مدفوع"),ut=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),Yn=o("reservations.list.status.completed","📁 منتهي"),Zn=o("reservations.details.labels.id","🆔 رقم الحجز"),Za=o("reservations.details.section.bookingInfo","بيانات الحجز"),mn=o("reservations.details.section.paymentSummary","ملخص الدفع"),je=o("reservations.details.labels.finalTotal","المجموع النهائي"),Ve=o("reservations.details.section.crew","😎 الفريق الفني"),Kt=o("reservations.details.crew.count","{count} عضو"),Et=o("reservations.details.section.items","📦 المعدات المرتبطة"),ea=o("reservations.details.items.count","{count} عنصر"),Go=o("reservations.details.actions.edit","✏️ تعديل"),Wo=o("reservations.details.actions.delete","🗑️ حذف"),Xo=o("reservations.details.labels.customer","العميل"),Jo=o("reservations.details.labels.contact","رقم التواصل"),Yo=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Zo=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),ec=o("reservations.details.actions.openProject","📁 فتح المشروع"),tc=o("reservations.details.labels.start","بداية الحجز"),nc=o("reservations.details.labels.end","نهاية الحجز"),ac=o("reservations.details.labels.notes","ملاحظات"),sc=o("reservations.list.noNotes","لا توجد ملاحظات"),ic=o("reservations.details.labels.itemsCount","عدد المعدات"),rc=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),oc=o("reservations.paymentHistory.title","سجل الدفعات"),cc=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),lc=o("reservations.list.unknownCustomer","غير معروف"),es=typeof s?.paymentStatus=="string"?s.paymentStatus.toLowerCase():null,ta=r&&es&&["paid","partial","unpaid"].includes(es)?es:e.paidStatus??e.paid_status??(c?"paid":"unpaid"),ts=ta==="partial",bi=ta==="paid"?Xn:ts?ut:Jn;function ns(f){if(f==null)return Number.NaN;if(typeof f=="number")return Number.isFinite(f)?f:Number.NaN;const R=String(f).replace(/[^0-9.+-]/g,""),te=Number(R);return Number.isFinite(te)?te:Number.NaN}const na=(f={})=>{const R=String(f.type??f.kind??f.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(R)||Array.isArray(f.packageItems)&&f.packageItems.length)},dc=(f={})=>[f.packageId,f.package_id,f.packageCode,f.package_code,f.bundleId,f.bundle_id].some(R=>R!=null&&R!==""),uc=(f={})=>!f||typeof f!="object"?!1:!na(f)&&dc(f),gi=(f={})=>{const R=na(f),te=[{value:f.qty,key:"qty",limit:999},{value:f.quantity,key:"quantity",limit:999},{value:f.units,key:"units",limit:999},{value:f.count,key:"count",limit:50},{value:f.package_quantity,key:"package_quantity",limit:999},{value:f.packageQty,key:"packageQty",limit:999},{value:f.packageCount,key:"packageCount",limit:999}];let me=NaN;for(const ge of te){if(ge.value==null||ge.value==="")continue;const we=typeof ge.value=="string"?ge.value.trim():String(ge.value??"");if(ge.key==="count"&&we.length>6)continue;const Le=ns(ge.value);if(!Number.isFinite(Le)||Le<=0)continue;const Ie=Math.round(Le);if(!(Ie>ge.limit)){me=Math.max(1,Ie);break}}return(!Number.isFinite(me)||me<=0)&&(me=1),R?Math.max(1,Math.min(99,me)):Math.max(1,Math.min(9999,me))};let Me=(Array.isArray(l)?l:[]).reduce((f,R)=>!R||typeof R!="object"||uc(R)?f:f+gi(R),0);Me<=0&&Array.isArray(u)&&u.length&&(Me=u.reduce((f,R)=>{const te=gi({...R,type:R.type});return f+te},0)),!Number.isFinite(Me)||Me<=0?Me=Array.isArray(u)&&u.length?u.length:(Array.isArray(l)?l.length:0)||1:Me>1e6&&(Me=Math.min(Me,Array.isArray(u)?u.length:Me),(!Number.isFinite(Me)||Me<=0)&&(Me=(Array.isArray(l)?l.length:0)||1)),Me=Math.max(1,Math.round(Me));const pc=h(String(Me)),hi=ea.replace("{count}",pc),mc=Kt.replace("{count}",Ee),fc=e.notes?h(e.notes):sc,yc=h(M.toFixed(2)),bc=h(String(oe)),gc=h(ve.toFixed(2)),hc=`${bc}% (${gc} ${J})`,vc=Number.isFinite(qe)?Math.max(0,qe):0,qc=h(vc.toFixed(2)),Ct=[{icon:"💼",label:rc,value:`${$e} ${J}`}];Ct.push({icon:"😎",label:Re,value:`${yc} ${J}`}),ee>0&&Ct.push({icon:"💸",label:ue,value:`${Pe} ${J}`}),Ct.push({icon:"📊",label:ct,value:`${Te} ${J}`}),B&&he>0&&Ct.push({icon:"🧾",label:ce,value:`${qt} ${J}`}),oe>0&&Ct.push({icon:"🏦",label:lt,value:hc}),Ct.push({icon:"💵",label:Pt,value:`${qc} ${J}`}),Ct.push({icon:"💰",label:je,value:`${S} ${J}`});const Sc=Ct.map(({icon:f,label:R,value:te})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${f} ${R}</span>
      <span class="summary-details-value">${te}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let Xe=[];r&&s&&(Array.isArray(s.paymentHistory)?Xe=s.paymentHistory:Array.isArray(s.payment_history)?Xe=s.payment_history:Array.isArray(s.payments)?Xe=s.payments:Array.isArray(s.paymentLogs)&&(Xe=s.paymentLogs)),(!Array.isArray(Xe)||Xe.length===0)&&(Array.isArray(e.paymentHistory)?Xe=e.paymentHistory:Array.isArray(e.payment_history)?Xe=e.payment_history:Array.isArray(e.paymentLogs)?Xe=e.paymentLogs:Xe=[]);const vi=Array.isArray(Xe)?Xe:[],Ec=vi.length?`<ul class="reservation-payment-history-list">${vi.map(f=>{const R=f?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):f?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),te=Number.isFinite(Number(f?.amount))&&Number(f.amount)>0?`${h(Number(f.amount).toFixed(2))} ${J}`:"—",me=Number.isFinite(Number(f?.percentage))&&Number(f.percentage)>0?`${h(Number(f.percentage).toFixed(2))}%`:"—",ge=f?.recordedAt?h(Ze(f.recordedAt)):"—",we=f?.note?`<div class="payment-history-note">${Qe(h(f.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${Qe(R)}</span>
              <span class="payment-history-entry__amount">${te}</span>
              <span class="payment-history-entry__percent">${me}</span>
              <span class="payment-history-entry__date">${ge}</span>
            </div>
            ${we}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${Qe(cc)}</div>`,qi=String(e?.status||e?.reservationStatus||"").toLowerCase(),Si=qi==="cancelled"||qi==="canceled",Ei=Si?[{text:o("reservations.list.status.cancelled","❌ ملغي"),className:"status-cancelled"},{text:bi,className:ta==="paid"?"status-paid":ts?"status-partial":"status-unpaid"}]:[{text:i?dt:St,className:i?"status-confirmed":"status-pending"},{text:bi,className:ta==="paid"?"status-paid":ts?"status-partial":"status-unpaid"}];d&&!Si&&Ei.push({text:Yn,className:"status-completed"});const wc=Ei.map(({text:f,className:R})=>`<span class="status-chip ${R}">${f}</span>`).join(""),Qt=(f,R,te)=>`
    <div class="res-info-row">
      <span class="label">${f} ${R}</span>
      <span class="value">${te}</span>
    </div>
  `;let as="";if(e.projectId){let f=Qe(Zo);if(s){const R=s.title||o("projects.fallback.untitled","مشروع بدون اسم");f=`${Qe(R)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${Qe(ec)}</button>`}as=`
      <div class="res-info-row">
        <span class="label">📁 ${Yo}</span>
        <span class="value">${f}</span>
      </div>
    `}const wt=[];wt.push(Qt("👤",Xo,t?.customerName||lc)),wt.push(Qt("📞",Jo,t?.phone||"—")),wt.push(Qt("🗓️",tc,ie)),wt.push(Qt("🗓️",nc,be)),wt.push(Qt("📦",ic,hi)),wt.push(Qt("⏱️",Ke,Z)),wt.push(Qt("📝",ac,fc)),as&&wt.push(as);const Ac=wt.join(""),xc=u.length?u.map(f=>{const R=f.items[0]||{},te=ln(R)||f.image,me=te?`<img src="${te}" alt="${$n}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let ge=[];if(Array.isArray(f.packageItems)&&f.packageItems.length)ge=[...f.packageItems];else{const fe=[];f.items.forEach(Ae=>{Array.isArray(Ae?.packageItems)&&Ae.packageItems.length&&fe.push(...Ae.packageItems)}),ge=fe}if(Array.isArray(ge)&&ge.length>1){const fe=new Set;ge=ge.filter(Ae=>{const re=Ae?.normalizedBarcode&&String(Ae.normalizedBarcode).toLowerCase()||Ae?.barcode&&String(Ae.barcode).toLowerCase()||(Ae?.equipmentId!=null?`id:${Ae.equipmentId}`:null);return re?fe.has(re)?!1:(fe.add(re),!0):!0})}const we=na(f)||f.items.some(fe=>na(fe))||ge.length>0,Le=(fe,{fallback:Ae=1,max:re=1e3}={})=>{const xe=ns(fe);return Number.isFinite(xe)&&xe>0?Math.min(re,xe):Ae};let Ie;if(we){const fe=Le(R?.qty??R?.quantity??R?.count,{fallback:NaN,max:999});Number.isFinite(fe)&&fe>0?Ie=fe:Ie=Le(f.quantity??f.count??1,{fallback:1,max:999})}else Ie=Le(f.quantity??f.count??R?.qty??R?.quantity??R?.count??0,{fallback:1,max:9999});const Lt=h(String(Ie)),Fe=(fe,{preferPositive:Ae=!1}={})=>{let re=Number.NaN;for(const xe of fe){const mt=Ne(xe);if(Number.isFinite(mt)){if(Ae&&mt>0)return mt;Number.isFinite(re)||(re=mt)}}return re};let ae,_e;if(we){const fe=[R?.price,R?.unit_price,R?.unitPrice,f.unitPrice];if(ae=Fe(fe,{preferPositive:!0}),!Number.isFinite(ae)||ae<0){const re=Ne(f.totalPrice??R?.total??R?.total_price);Number.isFinite(re)&&Ie>0&&(ae=re/Ie)}Number.isFinite(ae)||(ae=0);const Ae=[R?.total,R?.total_price,f.totalPrice];if(_e=Fe(Ae),!Number.isFinite(_e))_e=ae*Ie;else{const re=ae*Ie;Number.isFinite(re)&&re>0&&Math.abs(_e-re)>re*.25&&(_e=re)}}else{const fe=[R?.price,R?.unit_price,R?.unitPrice,f.unitPrice];if(ae=Fe(fe,{preferPositive:!0}),!Number.isFinite(ae)||ae<0){const Ae=Ne(f.totalPrice??R?.total??R?.total_price);Number.isFinite(Ae)&&Ie>0&&(ae=Ae/Ie)}Number.isFinite(ae)||(ae=0),_e=Ne(f.totalPrice??R?.total??R?.total_price),Number.isFinite(_e)||(_e=ae*Ie)}ae=Se(ae),_e=Se(_e);const nt=`${h(ae.toFixed(2))} ${J}`,at=`${h(_e.toFixed(2))} ${J}`,Tt=f.barcodes.map(fe=>h(String(fe||""))).filter(Boolean),st=Tt.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${Tt.map(fe=>`<li>${fe}</li>`).join("")}
              </ul>
            </details>`:"";let pt="";if(ge.length){const fe=new Map,Ae=re=>{const xe=ns(re?.qtyPerPackage??re?.perPackageQty??re?.quantityPerPackage);return Number.isFinite(xe)&&xe>0&&xe<=99?Math.round(xe):1};if(ge.forEach(re=>{if(!re)return;const xe=se(re.barcode||re.normalizedBarcode||re.desc||Math.random());if(!xe)return;const mt=fe.get(xe),fn=Ae(re);if(mt){mt.qty=fn,mt.total=fn;return}fe.set(xe,{desc:re.desc||re.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(fn,99)),total:Math.max(1,Math.min(fn,99)),barcode:re.barcode??re.normalizedBarcode??""})}),fe.size){const re=Array.from(fe.values()).map(xe=>{const mt=h(String(xe.qty>0?Math.min(xe.qty,99):1)),fn=Qe(xe.desc||""),Pc=xe.barcode?` <span class="reservation-package-items__barcode">(${Qe(h(String(xe.barcode)))})</span>`:"";return`<li>${fn}${Pc} × ${mt}</li>`}).join("");pt=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${re}
                </ul>
              </details>
            `}}const $c=we?`${pt||""}${st||""}`:st;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${me}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${Qe(R.desc||R.description||R.name||f.description||"-")}</div>
                  ${$c}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Qe(He.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Lt}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Qe(He.unitPrice)}">${nt}</td>
            <td class="reservation-modal-items-table__cell" data-label="${Qe(He.total)}">${at}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${Qe(He.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${Ya}</td></tr>`,Ic=`
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
        <tbody>${xc}</tbody>
      </table>
    </div>
  `,_c=x.map((f,R)=>{const te=h(String(R+1));let me=f.positionLabel??f.position_name??f.position_label??f.position_title??f.role??f.position??null;if((!me||me.trim()==="")&&(me=f.positionLabelAr??f.position_label_ar??f.position_title_ar??f.positionLabelEn??f.position_label_en??f.position_name_ar??f.position_title_en??f.position_name_en??null),!me||me.trim()==="")try{const nt=typeof jt=="function"?jt():[],at=f.positionId?nt.find(pt=>String(pt.id)===String(f.positionId)):null,Tt=!at&&f.positionKey?nt.find(pt=>String(pt.name).toLowerCase()===String(f.positionKey).toLowerCase()):null,st=at||Tt||null;st&&(me=st.labelAr||st.labelEn||st.name||me)}catch{}const ge=cs(me)||o("reservations.crew.positionFallback","منصب بدون اسم"),we=cs(f.positionLabelAlt??f.position_label_alt??f.positionLabelEn??f.position_label_en??f.positionLabelAr??f.position_label_ar??f.position_name_en??f.position_name_ar??""),Le=cs(f.technicianName)||o("technicians.picker.noTechnicianOption","— بدون تعيين —"),Ie=f.technicianPhone||Ce,Lt=Se(Ne(f.positionCost??f.position_cost??f.cost??f.daily_wage??f.dailyWage??f.internal_cost??0));let Fe=Se(Ne(f.positionClientPrice??f.position_client_price??f.client_price??f.customer_price??f.position_price??f.clientPrice??f.daily_total??f.dailyTotal??f.total??0));if(!Number.isFinite(Fe)||Fe<=0)try{const nt=jt?jt():[],at=f.positionId?nt.find(pt=>String(pt.id)===String(f.positionId)):null,Tt=!at&&f.positionKey?nt.find(pt=>String(pt.name).toLowerCase()===String(f.positionKey).toLowerCase()):null,st=at||Tt||null;st&&Number.isFinite(Number(st.clientPrice))&&(Fe=Se(Number(st.clientPrice)))}catch{}const ae=`${h(Fe.toFixed(2))} ${J}`,_e=Lt>0?`${h(Lt.toFixed(2))} ${J}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${te}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${Le}</span>
            <small class="text-muted">🏷️ ${ge}${we?` — ${we}`:""}</small>
            <small class="text-muted">💼 ${ae}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${Ie}</div>
          ${_e?`<div>💵 ${o("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${_e}</div>`:""}
        </div>
      </div>
    `}).join(""),kc=x.length?`<div class="reservation-technicians-grid">${_c}</div>`:`<ul class="reservation-modal-technicians"><li>${O}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${Zn}</span>
          <strong>${W}</strong>
        </div>
        <div class="status-chips">
          ${wc}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Za}</h6>
          ${Ac}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${mn}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${Sc}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${oc}</h6>
              ${Ec}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Ve}</span>
          <span class="count">${mc}</span>
        </div>
        ${kc}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Et}</span>
          <span class="count">${hi}</span>
        </div>
        ${Ic}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${Go}</button>
        ${V?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Wo}</button>`:""}
      </div>
    </div>
  `}const Pp="project",Cp="editProject",Lp=3600*1e3,Kr=.15,Tp=6,jp="projectsTab",Np="projectsSubTab",Bp={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},Dp={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},md=`@page {
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
`,fd=/color\([^)]*\)/gi,yd=/color-mix\([^)]*\)/gi,bd=/oklab\([^)]*\)/gi,gd=/oklch\([^)]*\)/gi,Dt=/(color\(|color-mix\(|oklab|oklch)/i,hd=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke","boxShadow","textShadow","accentColor","caretColor","columnRuleColor"],vd=typeof document<"u"?document.createElement("canvas"):null,ia=vd?.getContext?.("2d")||null;function Qr(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function Is(e,t="#000"){if(!ia||!e)return t;try{return ia.fillStyle="#000",ia.fillStyle=e,ia.fillStyle||t}catch{return t}}function qd(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&Dt.test(n)){const s=Is(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function bn(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function Gr(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;hd.forEach(c=>{const d=r[c];if(d&&Dt.test(d)){const l=Qr(c);if(bn(n,s,l),c==="boxShadow"||c==="textShadow")s.style.setProperty(l,"none","important");else{const u=c==="backgroundColor"?"#ffffff":r.color||"#000000",b=Is(d,u);s.style.setProperty(l,b,"important")}}});const i=r.backgroundImage;if(i&&Dt.test(i)){const c=Is(r.backgroundColor||"#ffffff","#ffffff");bn(n,s,"background-image"),bn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function Wr(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","boxShadow","textShadow","accentColor","caretColor","columnRuleColor"].forEach(c=>{const d=r[c];if(d&&Dt.test(d)){const l=Qr(c);if(bn(n,s,l),c==="boxShadow"||c==="textShadow")s.style.setProperty(l,"none","important");else{const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(l,u,"important")}}});const i=r.backgroundImage;i&&Dt.test(i)&&(bn(n,s,"background-image"),bn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function Xr(e){if(!e)return;const t=(n="")=>{if(typeof n!="string")return n;let a=n;return Dt.test(a)&&(a=a.replace(fd,"#000").replace(yd,"#000").replace(bd,"#000").replace(gd,"#000")),a};e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&Dt.test(a)&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&Dt.test(a)&&n.setAttribute("style",t(a))})}const Jr="reservations.quote.sequence",Di={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},Yr="https://help.artratio.sa/guide/quote-preview",De={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Sd=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],We=[...Sd],Ed=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function _s(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...We]}function wd(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=_s(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=_s(t.value);if(a.length)return a}const n=We.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...We]}const Ad=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],Zr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>{if(e?.isPackage){const t=e?.packageCodeResolved||e?.barcode||"";return A(t||"-")}return A(e?.barcode||"-")}},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>A(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>A(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>A(h(Number(e?.price||0).toFixed(2)))}],eo=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(h(String(t+1)))},{id:"position",labelKey:"reservations.details.crew.position",fallback:"المنصب",render:e=>A(h(e?.positionLabel??e?.position_name??e?.role??o("reservations.crew.positionFallback","منصب بدون اسم")))},{id:"price",labelKey:"reservations.details.crew.clientPrice",fallback:"سعر العميل",render:e=>{const t=Number.isFinite(Number(e?.positionClientPrice))?Number(e.positionClientPrice):0;return A(`${h(t.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}}],ks={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:Zr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:eo.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},to=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(h(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>A(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>A(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>A(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],no=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>A(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>A(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>A(e?.note||"-")}],ao=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(h(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>A(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>A(h(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>A(h(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>A(e?.displayCost||"—")}],xd=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],Id={customerInfo:ks.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:ks.payment,projectExpenses:no.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:to.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:ao.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},ls=new Map;function Ua(e="reservation"){if(ls.has(e))return ls.get(e);const t=e==="project"?xd:Ad,n=e==="project"?Id:ks,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(d=>d.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return ls.set(e,r),r}function Ka(e="reservation"){return Ua(e).sectionDefs}function so(e="reservation"){return Ua(e).fieldDefs}function io(e="reservation"){return Ua(e).sectionIdSet}function ro(e="reservation"){return Ua(e).fieldIdMap}function oo(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const _d="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",kd="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",$d="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",co=md.trim(),lo=/^data:image\/svg\+xml/i,Pd=/\.svg($|[?#])/i,jn=512,$s="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",uo=96,po=25.4,Ps=210,la=297,da=Math.round(Ps/po*uo),ua=Math.round(la/po*uo),Cd=2,mo=/safari/i,Ld=/(iphone|ipad|ipod)/i,Fi=/(iphone|ipad|ipod)/i,Td=/(crios|fxios|edgios|opios)/i,Ia="[reservations/pdf]";let X=null,D=null,yt=1,Cn=null,Ln=null,Bt=null,gn=null,Bn=!1;function en(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!X?.statusIndicator||!X?.statusText)return;X.statusKind=e;const r=t||oo(e);X.statusText.textContent=r,X.statusSpinner&&(X.statusSpinner.hidden=!s),X.statusAction&&(X.statusAction.hidden=!0,X.statusAction.onclick=null,n&&typeof a=="function"&&(X.statusAction.textContent=n,X.statusAction.hidden=!1,X.statusAction.onclick=i=>{i.preventDefault(),a()})),X.statusIndicator.hidden=!1,requestAnimationFrame(()=>{X.statusIndicator.classList.add("is-visible")})}function ds(e){try{return String(e||"").toLowerCase().normalize("NFKD").replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,"").replace(/\s+/g," ").trim()}catch{return String(e||"").trim().toLowerCase()}}function Dn(e){!X?.statusIndicator||!X?.statusText||(X.statusKind=null,X.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{X?.statusIndicator&&(X.statusIndicator.hidden=!0,X.statusAction&&(X.statusAction.hidden=!0,X.statusAction.onclick=null),X.statusSpinner&&(X.statusSpinner.hidden=!1))},220))}function Cs(){return!!window?.bootstrap?.Modal}function jd(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),Bt||(Bt=document.createElement("div"),Bt.className="modal-backdrop fade show",Bt.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(Bt)),gn||(gn=t=>{t.key==="Escape"&&Ls(e)},document.addEventListener("keydown",gn));try{e.focus({preventScroll:!0})}catch{}}}function Ls(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),Bt&&(Bt.remove(),Bt=null),gn&&(document.removeEventListener("keydown",gn),gn=null))}function Nd(e){if(e){if(Cs()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}jd(e)}}function Bd(){if(Bn)return;Bn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!X?.modal?.classList.contains("show"),s=()=>{X?.modal?.classList.contains("show")&&(en("render"),Bn=!1,pn())};Yi({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:Yr}),a&&en("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function Qa(e="reservation"){const t={},n=so(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function si(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function Dd(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function ii(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function ri(e="reservation"){return Object.fromEntries(Ka(e).map(({id:t})=>[t,!1]))}function oi(e,t){return e.sectionExpansions||(e.sectionExpansions=ri(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Fd(e,t){return oi(e,t)?.[t]!==!1}function ci(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function Rd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Ld.test(e)}function Md(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=mo.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function fo(){return Rd()&&Md()}function Ga(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=Fi.test(e)||Fi.test(t),s=/Macintosh/i.test(e)&&n>1;return mo.test(e)&&!Td.test(e)&&(a||s)}function us(e,...t){try{console.log(`${Ia} ${e}`,...t)}catch{}}function _t(e,...t){try{console.warn(`${Ia} ${e}`,...t)}catch{}}function zd(e,t,...n){try{t?console.error(`${Ia} ${e}`,t,...n):console.error(`${Ia} ${e}`,...n)}catch{}}function ke(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Od(e,t="لا توجد بيانات للعرض."){const n=A(o(e,t));return ke(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function _a(e,t){return Array.isArray(e)&&e.length?e:[Od(t)]}const Hd=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function yo(e=""){return Hd.test(e)}function Vd(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!yo(r))return a.call(this,r,...i);let c,d=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),d=!0)}catch{}try{if(!d){const l=this.canvas;l&&l.style?.direction!=="rtl"&&(l.__artRatioOriginalDirection=l.style.direction,l.style.direction="rtl")}return a.call(this,r,...i)}finally{if(d&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!d){const l=this.canvas;l&&l.__artRatioOriginalDirection!==void 0&&(l.style.direction=l.__artRatioOriginalDirection,delete l.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function Ri(e,t=jn){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Ud(e){if(!e)return{width:jn,height:jn};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?Ri(t,0):0,s=n?Ri(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,d]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(d)&&d>0?d:0)}}return{width:a||jn,height:s||jn}}function bo(e=""){return typeof e!="string"?!1:lo.test(e)||Pd.test(e)}function Kd(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Qd(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function go(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await Qd(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),d=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=d;const l=i.getContext("2d");return l.clearRect(0,0,c,d),l.drawImage(r,0,0,c,d),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function Gd(e){if(!e)return null;if(lo.test(e))return Kd(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Wd(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!bo(t))return!1;const n=await Gd(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",$s),!1;const a=await go(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",$s),!1)}async function Xd(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Ud(e),s=await go(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||$s),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),d=e.getAttribute("height");return c&&i.setAttribute("width",c),d&&i.setAttribute("height",d),e.parentNode?.replaceChild(i,e),!!s}async function ho(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{bo(s.getAttribute?.("src"))&&a.push(Wd(s))}),n.forEach(s=>{a.push(Xd(s))}),a.length&&await Promise.allSettled(a)}function Jd(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(F,G=0)=>{const L=parseFloat(F);return Number.isFinite(L)?L:G},i=r(s.paddingTop),c=r(s.paddingBottom),d=r(s.paddingRight),l=r(s.paddingLeft),u=r(s.borderRadius),b=r(s.fontSize,14),y=(()=>{const F=s.lineHeight;if(!F||F==="normal")return b*1.6;const G=r(F,b*1.6);return G>0?G:b*1.6})(),p=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(p<=0)return null;const m=Math.max(1,p-l-d),g=e.textContent||"",v=g.split(/\r?\n/),_=n.createElement("canvas"),q=_.getContext("2d");if(!q)return null;const k=s.fontStyle||"normal",x=s.fontVariant||"normal",V=s.fontWeight||"400",E=s.fontFamily||"sans-serif",I=s.fontStretch||"normal",P=F=>F.join(" "),N=[],K=F=>q.measureText(F).width;q.font=`${k} ${x} ${V} ${I} ${b}px ${E}`,v.forEach(F=>{const G=F.trim();if(G.length===0){N.push("");return}const L=G.split(/\s+/);let z=[];L.forEach((M,ee)=>{const de=M.trim();if(!de)return;const oe=P(z.concat(de));if(K(oe)<=m||z.length===0){z.push(de);return}N.push(P(z)),z=[de]}),z.length&&N.push(P(z))}),N.length||N.push("");const $=i+c+N.length*y,B=Math.ceil(Math.max(1,p)*t),Y=Math.ceil(Math.max(1,$)*t);_.width=B,_.height=Y,_.style.width=`${Math.max(1,p)}px`,_.style.height=`${Math.max(1,$)}px`,q.scale(t,t);const T=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){q.save(),q.beginPath();const F=Math.max(1,p),G=Math.max(1,$),L=Math.min(u,F/2,G/2);q.moveTo(L,0),q.lineTo(F-L,0),q.quadraticCurveTo(F,0,F,L),q.lineTo(F,G-L),q.quadraticCurveTo(F,G,F-L,G),q.lineTo(L,G),q.quadraticCurveTo(0,G,0,G-L),q.lineTo(0,L),q.quadraticCurveTo(0,0,L,0),q.closePath(),q.clip()}if(q.fillStyle=T,q.fillRect(0,0,Math.max(1,p),Math.max(1,$)),q.font=`${k} ${x} ${V} ${I} ${b}px ${E}`,q.fillStyle=s.color||"#000000",q.textBaseline="top",q.textAlign="right","direction"in q)try{q.direction="rtl"}catch{}const j=Math.max(0,p-d);let C=i;N.forEach(F=>{const G=F.length?F:" ";q.fillText(G,j,C,m),C+=y});const H=n.createElement("img");let U;try{U=_.toDataURL("image/png")}catch(F){return _t("note canvas toDataURL failed",F),null}return H.src=U,H.alt=g,H.style.width=`${Math.max(1,p)}px`,H.style.height=`${Math.max(1,$)}px`,H.style.display="block",H.setAttribute("data-quote-note-image","true"),{image:H,canvas:_,totalHeight:$,width:p}}function Yd(e,{pixelRatio:t=1}={}){if(!e||!Ga())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!yo(a.textContent||""))return;let s;try{s=Jd(a,{pixelRatio:t})}catch(r){_t("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function Ts(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){zd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),d=o("reservations.quote.toast.retry","إعادة المحاولة"),l=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(en("export"),$o()):(en("render"),Bn=!1,pn())};if(Yi({message:i,duration:9e3,actionLabel:l?d:void 0,onAction:l?u:void 0,linkLabel:c,linkHref:Yr}),X?.modal?.classList.contains("show")&&en("error",{message:i,actionLabel:l?d:void 0,onAction:l?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function js({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){_t("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){_t("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function li(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function Mi(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function zi(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function Zd(){const e=zi();return e||(Ln||(Ln=li(kd).catch(t=>{throw Ln=null,t}).then(()=>{const t=zi();if(!t)throw Ln=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Ln)}async function eu(){const e=Mi();return e||(Cn||(Cn=li($d).catch(t=>{throw Cn=null,t}).then(()=>{const t=Mi();if(!t)throw Cn=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),Cn)}async function tu(){if(window.html2pdf||await li(_d),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}qd(),Vd()}function A(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function nu(e="reservation"){return e==="project"?"QP":"Q"}function au(e,t="reservation"){const n=Number(e),a=nu(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function su(){const e=window.localStorage?.getItem?.(Jr),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function vo(e="reservation"){const n=su()+1;return{sequence:n,quoteNumber:au(n,e)}}function iu(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(Jr,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function qo(e="reservation"){return Di[e]||Di.reservation}function ru(e="reservation"){try{const t=qo(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function ou(e,t="reservation"){try{const n=qo(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function cu(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function lu(e,t="reservation"){if(!e)return null;const n=io(t),a=ro(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,d])=>{const l=i[c];if(l==null)return;const{ids:u,emptyExplicitly:b}=cu(l);if(!u&&!b)return;const y=Array.isArray(u)?u.filter(p=>d.has(p)):[];(y.length>0||b)&&(r[c]=y)}),{version:1,sections:s,fields:r}}function So(e){if(!e)return;const t=e.context||"reservation",n=lu(e,t);n&&ou(n,t)}function Eo(e){if(!e)return;const t=e.context||"reservation",n=ru(t);if(!n)return;const a=io(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=si(e.fields||Qa(t)),i=ro(t);Object.entries(n.fields).forEach(([c,d])=>{const l=i[c];if(!l)return;const u=Array.isArray(d)?d.filter(b=>l.has(b)):[];r[c]=new Set(u)}),e.fields=r}}function wo(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function du(e){const t=tn()||[],{technicians:n=[]}=pe(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(i=>{if(!i||i.id==null)return;const c=String(i.id),d=s.get(c)||{};s.set(c,{...d,...i})}),(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(i=>({technicianId:i}))).map((i,c)=>{const d=i?.technicianId!=null?s.get(String(i.technicianId)):null;let l=i.positionLabel??i.position_name??i.position_label??i.role??i.position??d?.role??o("reservations.crew.positionFallback","منصب بدون اسم");(!l||l.trim()==="")&&(l=i.positionLabelAr??i.position_label_ar??i.positionLabelEn??i.position_label_en??i.position_name_ar??i.position_name_en??d?.role??o("reservations.crew.positionFallback","منصب بدون اسم"));try{const y=typeof jt=="function"?jt()||[]:[];let p=null;if(i?.positionId!=null&&(p=y.find(m=>String(m?.id)===String(i.positionId))||null),!p){const m=i.positionKey??i.position_key??i.positionName??i.position_name??i.position??"";if(m&&(p=typeof fa=="function"&&fa(m)||null,!p&&y.length)){const g=String(m).trim().toLowerCase();p=y.find(v=>[v.name,v.labelAr,v.labelEn].filter(Boolean).map(_=>String(_).toLowerCase()).includes(g))||null}}if(p){const m=p.labelAr||p.labelEn||p.name||"";m&&m.trim()&&(l=m)}}catch{}const u=Se(Ne(i.positionCost??i.position_cost??i.cost??i.daily_wage??i.dailyWage??d?.dailyWage??d?.wage??0)),b=Se(Ne(i.positionClientPrice??i.position_client_price??i.client_price??i.clientPrice??i.daily_total??i.dailyTotal??i.total??d?.dailyTotal??d?.total??d?.total_wage??0));return{assignmentId:i.assignmentId??i.assignment_id??`crew-${c}`,positionId:i.positionId??i.position_id??null,positionLabel:l,positionLabelAlt:i.positionLabelAlt??i.position_label_alt??"",positionCost:u,positionClientPrice:b,technicianId:i.technicianId!=null?String(i.technicianId):d?.id!=null?String(d.id):null,technicianName:i.technicianName??i.technician_name??d?.name??null,technicianRole:i.technicianRole??d?.role??null}})}function uu(e,t,n){const{projectLinked:a}=Ot(e,n);Ba(e.start,e.end);const s=e.discount??e.discountValue??0,r=Number(h(String(s)))||0,i=e.discountType??e.discount_type??"percent",c=String(i).toLowerCase()==="amount"?"amount":"percent",d=a?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),l=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,u=l!=null?Ne(l):Number.NaN,y=(e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied)===!0&&Number.isFinite(u)&&u>0?u:null,p=Array.isArray(t)?t.map(x=>x?.technicianId).filter(Boolean):[],m=lr({items:Array.isArray(e.items)?e.items:[],technicianIds:p,crewAssignments:Array.isArray(t)?t:[],discount:r,discountType:c,applyTax:d,start:e.start,end:e.end,companySharePercent:y}),g=Ne(e.cost??e.total??e.finalTotal),v=Number.isFinite(g),_=a?m.finalTotal:v?Se(g):m.finalTotal,q={equipmentTotal:m.equipmentTotal,crewTotal:m.crewTotal,crewCostTotal:m.crewCostTotal,discountAmount:m.discountAmount,subtotalAfterDiscount:m.subtotalAfterDiscount,taxableAmount:m.taxableAmount,taxAmount:m.taxAmount,finalTotal:_,companySharePercent:m.companySharePercent,companyShareAmount:m.companyShareAmount,netProfit:m.netProfit},k={equipmentTotal:h(m.equipmentTotal.toFixed(2)),crewTotal:h(m.crewTotal.toFixed(2)),discountAmount:h(m.discountAmount.toFixed(2)),subtotalAfterDiscount:h(m.subtotalAfterDiscount.toFixed(2)),taxableAmount:h(m.taxableAmount.toFixed(2)),taxAmount:h(m.taxAmount.toFixed(2)),finalTotal:h(_.toFixed(2)),companySharePercent:h((Number.isFinite(m.companySharePercent)?m.companySharePercent:0).toFixed(2)),companyShareAmount:h(m.companyShareAmount.toFixed(2)),netProfit:h(m.netProfit.toFixed(2))};return{totals:q,totalsDisplay:k,rentalDays:m.rentalDays}}function En(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function Ao(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function pu(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=En(e.amount??(n==="amount"?e.value:null)),s=En(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=Ao(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function mu(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(pu).filter(Boolean);if(n.length>0)return n;const a=En(e.paidPercent??e.paid_percent),s=En(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Ao(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function fu(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function yu(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function bu(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function gu(e){const t=Number(e?.equipmentEstimate)||0,n=bu(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const d=Math.max(0,a-c),l=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,b=l&&s&&u>0?u:0,y=b>0?Number((d*(b/100)).toFixed(2)):0,p=d+y;let m=s?p*Kr:0;(!Number.isFinite(m)||m<0)&&(m=0),m=Number(m.toFixed(2));let g=s?Number(e?.totalWithTax):p;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((p+m).toFixed(2))):g=p,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:d,companyShareAmount:y,subtotal:p,applyTax:s,taxAmount:m,totalWithTax:g}}function hu(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=r.length?r:Array.isArray(e.technicians)?e.technicians:[],c=Os(t,a,s,!1,i,{start:e.start,end:e.end});if(Number.isFinite(c))return c;const d=Number(h(String(e.cost??0)));return Number.isFinite(d)?Math.round(d):0}function vu(e,t){if(!e)return"—";const n=Ze(e);return t?`${n} - ${Ze(t)}`:n}function le(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${h(a.toFixed(s))} ${t}`}function Oi(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function qu(e){if(!e?.start)return null;if(!e?.end)return 1;const t=Ba(e.start,e.end);return Number.isFinite(t)?t:1}function Su(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function Eu(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=pe(),i=e?.id!=null?s.find(S=>String(S.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:le(0,t),expensesTotal:le(0,t),reservationsTotal:le(0,t),discountAmount:le(0,t),taxAmount:le(0,t),overallTotal:le(0,t),paidAmount:le(0,t),remainingAmount:le(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:le(0,t),remainingAmountDisplay:le(0,t),paidPercentDisplay:Oi(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const d=i.clientId??i.customerId??i.client_id??i.customer_id??null,l=d!=null&&n.find(S=>String(S.id)===String(d))||null,u=l?.customerName??l?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),b=(i.clientCompany||l?.companyName||l?.company||"").trim(),y=l?.phone??l?.customerPhone??i.clientPhone??i.customerPhone??"",p=y?h(String(y).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),m=l?.email??i.clientEmail??i.customerEmail??"",g=m?String(m).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),v=i.projectCode||`PRJ-${h(String(i.id??""))}`,_=h(String(v)),q=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),k=fu(i.type),x=i.start?Ze(i.start):"—",V=i.end?Ze(i.end):"—",E=qu(i),I=E!=null?Su(E):"غير محدد",P=yu(i),N={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},K=o(`projects.status.${P}`,N[P]||P),$=i.id!=null?String(i.id):null,B=$?a.filter(S=>String(S.projectId)===$):[],T=B.map(S=>{const Z=S.reservationId||S.id||"",J=S.status||S.state||"pending",ue=String(J).toLowerCase(),ce=o(`reservations.status.${ue}`,ue),Re=hu(S),ct=S.start?new Date(S.start).getTime():0;return{reservationId:h(String(Z||"-")),status:ue,statusLabel:ce,total:Re,totalLabel:le(Re,t),dateRange:vu(S.start,S.end),startTimestamp:Number.isNaN(ct)?0:ct}}).sort((S,Z)=>Z.startTimestamp-S.startTimestamp).map(({startTimestamp:S,...Z})=>Z).reduce((S,Z)=>S+(Number(Z.total)||0),0),j=new Map;B.forEach(S=>{const Z=Array.isArray(S.items)?S.items:[],J=Ba(S.start,S.end),ue=S.reservationId||S.id||"";Z.forEach((ce,Re)=>{if(!ce)return;const ct=ce.barcode||ce.code||ce.id||ce.desc||ce.description||`item-${Re}`,Ke=String(ct||`item-${Re}`),lt=j.get(Ke)||{description:ce.desc||ce.description||ce.name||ce.barcode||`#${h(String(Re+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},Pt=Number(ce.qty)||1,$n=Number(ce.price)||0;lt.totalQuantity+=Pt,lt.reservationIds.add(String(ue));const He=$n*Pt*Math.max(1,J);Number.isFinite(He)&&(lt.totalCost+=He),j.set(Ke,lt)})});const C=Array.from(j.values()).map(S=>({description:S.description,totalQuantity:S.totalQuantity,reservationsCount:S.reservationIds.size,displayCost:le(S.totalCost,t)})),H=new Map((r||[]).filter(Boolean).map(S=>[String(S.id),S])),U=new Map,F=S=>{if(!S)return;let Z=null;typeof S=="object"?Z=S.id??S.technicianId??S.technician_id??S.userId??S.user_id??null:(typeof S=="string"||typeof S=="number")&&(Z=S);const J=Z!=null?String(Z):null,ue=J&&H.has(J)?H.get(J):typeof S=="object"?S:null,ce=ue?.name||ue?.full_name||ue?.fullName||ue?.displayName||(typeof S=="string"?S:null),Re=ue?.role||ue?.title||null,ct=ue?.phone||ue?.mobile||ue?.contact||null;if(!ce&&!J)return;const Ke=J||ce;U.has(Ke)||U.set(Ke,{id:J,name:ce||"-",role:Re||null,phone:ct||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(S=>F(S)),B.forEach(S=>{(Array.isArray(S.crewAssignments)&&S.crewAssignments.length?S.crewAssignments:Array.isArray(S.technicians)?S.technicians.map(J=>({technicianId:J})):[]).forEach(J=>F(J))});const G=Array.from(U.values()),L=Array.isArray(i.expenses)?i.expenses.map(S=>{const Z=Number(S?.amount)||0;return{label:S?.label||S?.name||"-",amount:Z,displayAmount:le(Z,t),note:S?.note||S?.description||""}}):[],z=gu(i),M=z.applyTax?Number(((z.subtotal+T)*Kr).toFixed(2)):0,ee=Number((z.subtotal+T+M).toFixed(2)),de=mu(i),oe=En(i.paidAmount??i.paid_amount)||0,ve=En(i.paidPercent??i.paid_percent)||0,he=Hs({totalAmount:ee,paidAmount:oe,paidPercent:ve,history:de}),Q=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",ne=Vs({manualStatus:Q,paidAmount:he.paidAmount,paidPercent:he.paidPercent,totalAmount:ee}),qe={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},W=o(`projects.paymentStatus.${ne}`,qe[ne]||ne),ie=Number(he.paidAmount||0),be=Number(he.paidPercent||0),Ee=Math.max(0,Number((ee-ie).toFixed(2))),$e={projectSubtotal:le(z.subtotal,t),expensesTotal:le(z.expensesTotal,t),reservationsTotal:le(T,t),discountAmount:le(z.discountAmount,t),taxAmount:le(M,t),overallTotal:le(ee,t),paidAmount:le(ie,t),remainingAmount:le(Ee,t)},Pe={status:ne,statusLabel:W,paidAmount:ie,paidPercent:be,remainingAmount:Ee,paidAmountDisplay:le(ie,t),remainingAmountDisplay:le(Ee,t),paidPercentDisplay:Oi(be)},Te=(i.description||"").trim();return{project:i,customer:l,clientInfo:{name:u,company:b||"—",phone:p,email:g},projectInfo:{title:q,code:_,typeLabel:k,startDisplay:x,endDisplay:V,durationLabel:I,statusLabel:K},expenses:L,equipment:C,crew:G,totals:z,totalsDisplay:$e,projectTotals:{combinedTaxAmount:M,overallTotal:ee,reservationsTotal:T,paidAmount:ie,paidPercent:be,remainingAmount:Ee,paymentStatus:ne},paymentSummary:Pe,notes:Te,currencyLabel:t,projectStatus:P,projectStatusLabel:K,projectDurationDays:E,projectDurationLabel:I,paymentHistory:de}}function wu({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:d={},currencyLabel:l="SR",sections:u,fieldSelections:b={},quoteNumber:y,quoteDate:p,terms:m=We}){const g=si(b),v=(W,ie)=>ii(g,W,ie),_=W=>u?.has?.(W),q=`<div class="quote-placeholder">${A(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,k=(W,ie)=>`<div class="info-plain__item">
      <span class="info-plain__label">${A(W)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${A(ie)}</span>
    </div>`,x=(W,ie,{variant:be="inline"}={})=>be==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${A(W)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${A(ie)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${A(W)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${A(ie)}</span>
    </span>`,V=(W,ie)=>`<div class="payment-row">
      <span class="payment-row__label">${A(W)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${A(ie)}</span>
    </div>`,E=[];v("customerInfo","customerName")&&E.push(k(o("projects.details.client","العميل"),t.name||"-")),v("customerInfo","customerCompany")&&E.push(k(o("projects.details.company","شركة العميل"),t.company||"—")),v("customerInfo","customerPhone")&&E.push(k(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),v("customerInfo","customerEmail")&&E.push(k(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const I=_("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${A(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${E.length?`<div class="info-plain">${E.join("")}</div>`:q}
      </section>`:"",P=[];v("projectInfo","projectType")&&P.push(k(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),v("projectInfo","projectTitle")&&P.push(k(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),v("projectInfo","projectCode")&&P.push(k(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),v("projectInfo","projectStart")&&P.push(k(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),v("projectInfo","projectEnd")&&P.push(k(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),v("projectInfo","projectDuration")&&P.push(k(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),v("projectInfo","projectStatus")&&P.push(k(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const N=_("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${A(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${P.length?`<div class="info-plain">${P.join("")}</div>`:q}
      </section>`:"",K=to.filter(W=>v("projectCrew",W.id)),$=_("projectCrew")?K.length?`<section class="quote-section quote-section--table">
            <h3>${A(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${K.map(W=>`<th>${A(W.labelKey?o(W.labelKey,W.fallback):W.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((W,ie)=>`<tr>${K.map(be=>`<td>${be.render(W,ie)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(K.length,1)}" class="empty">${A(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${q}
          </section>`:"",B=[];v("financialSummary","projectSubtotal")&&B.push(x(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${le(0,l)}`)),v("financialSummary","expensesTotal")&&B.push(x(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||le(0,l))),v("financialSummary","reservationsTotal")&&B.push(x(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||le(0,l))),v("financialSummary","discountAmount")&&B.push(x(o("reservations.details.labels.discount","الخصم"),i.discountAmount||le(0,l))),v("financialSummary","taxAmount")&&B.push(x(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||le(0,l)));const Y=[];v("financialSummary","overallTotal")&&Y.push(x(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||le(0,l),{variant:"final"})),v("financialSummary","paidAmount")&&Y.push(x(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||le(0,l),{variant:"final"})),v("financialSummary","remainingAmount")&&Y.push(x(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||le(0,l),{variant:"final"}));const T=_("financialSummary")?!B.length&&!Y.length?`<section class="quote-section quote-section--financial">${q}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${A(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${B.length?`<div class="totals-inline">${B.join("")}</div>`:""}
            ${Y.length?`<div class="totals-final">${Y.join("")}</div>`:""}
          </div>
        </section>`:"",j=no.filter(W=>v("projectExpenses",W.id)),C=_("projectExpenses")?j.length?`<section class="quote-section quote-section--table">
            <h3>${A(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${j.map(W=>`<th>${A(W.labelKey?o(W.labelKey,W.fallback):W.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((W,ie)=>`<tr>${j.map(be=>`<td>${be.render(W,ie)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(j.length,1)}" class="empty">${A(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${q}
          </section>`:"",H=ao.filter(W=>v("projectEquipment",W.id)),U=_("projectEquipment")?H.length?`<section class="quote-section quote-section--table">
            <h3>${A(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${H.map(W=>`<th>${A(W.labelKey?o(W.labelKey,W.fallback):W.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${r.length?r.map((W,ie)=>`<tr>${H.map(be=>`<td>${be.render(W,ie)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(H.length,1)}" class="empty">${A(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${q}
          </section>`:"",F=(e?.description||"").trim()||"",G=_("projectNotes")?`<section class="quote-section">
        <h3>${A(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${A(F||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",L=[];v("payment","beneficiary")&&L.push(V(o("reservations.quote.labels.beneficiary","اسم المستفيد"),De.beneficiaryName)),v("payment","bank")&&L.push(V(o("reservations.quote.labels.bank","اسم البنك"),De.bankName)),v("payment","account")&&L.push(V(o("reservations.quote.labels.account","رقم الحساب"),h(De.accountNumber))),v("payment","iban")&&L.push(V(o("reservations.quote.labels.iban","رقم الآيبان"),h(De.iban)));const z=`<section class="quote-section">
      <div class="payment-block">
        <h3>${A(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${L.length?L.join(""):q}</div>
      </div>
      <p class="quote-approval-note">${A(De.approvalNote)}</p>
    </section>`,M=Array.isArray(m)&&m.length?m:We,ee=`<footer class="quote-footer">
        <h4>${A(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${M.map(W=>`<li>${A(W)}</li>`).join("")}</ul>
      </footer>`,de=[],oe=[];if(N&&oe.push({key:"project",html:N}),I&&oe.push({key:"customer",html:I}),oe.length>1){const W=oe.find(Ee=>Ee.key==="project"),ie=oe.find(Ee=>Ee.key==="customer"),be=[];W?.html&&be.push(W.html),ie?.html&&be.push(ie.html),de.push(ke(`<div class="quote-section-row quote-section-row--primary">${be.join("")}</div>`,{blockType:"group"}))}else oe.length===1&&de.push(ke(oe[0].html));const ve=[];$&&ve.push(ke($,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),C&&ve.push(ke(C,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),U&&ve.push(ke(U,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const he=[];T&&he.push(ke(T,{blockType:"summary"})),G&&he.push(ke(G));const Q=[ke(z,{blockType:"payment"}),ke(ee,{blockType:"footer"})],ne=[..._a(de,"projects.quote.placeholder.primary"),...ve,..._a(he,"projects.quote.placeholder.summary"),...Q],qe=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${A(De.logoUrl)}" alt="${A(De.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${A(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${A(De.companyName)}</p>
        <p class="quote-company-cr">${A(o("reservations.quote.labels.cr","السجل التجاري"))}: ${A(De.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${A(o("reservations.details.labels.reservationId","رقم العرض"))}</span>
          <strong>${A(y)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${A(o("projects.quote.labels.date","التاريخ"))}</span>
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
          ${qe}
          ${ne.join("")}
        </div>
      </div>
    </div>
  `}function xo(e){if(e?.context==="project")return wu(e);const{reservation:t,customer:n,project:a,crewAssignments:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:d,sections:l,fieldSelections:u={},quoteNumber:b,quoteDate:y,terms:p=We}=e,m=h(String(t?.reservationId??t?.id??"")),g=t.start?h(Ze(t.start)):"-",v=t.end?h(Ze(t.end)):"-",_=n?.customerName||n?.full_name||n?.name||"-",q=n?.phone||"-",k=n?.email||"-",x=n?.company||n?.company_name||"-",V=h(q),E=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),I=a?.code||a?.projectCode||"",P=h(String(c)),N=t?.notes||"",K=Array.isArray(p)&&p.length?p:We,$=si(u),B=(O,Ce)=>ii($,O,Ce),Y=O=>l?.has?.(O),T=`<div class="quote-placeholder">${A(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,j=(O,Ce)=>`<div class="info-plain__item">${A(O)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${A(Ce)}</strong></div>`,C=(O,Ce,{variant:dt="inline"}={})=>dt==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${A(O)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${A(Ce)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${A(O)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${A(Ce)}</span>
    </span>`,H=(O,Ce)=>`<div class="payment-row">
      <span class="payment-row__label">${A(O)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${A(Ce)}</span>
    </div>`,U=[];B("customerInfo","customerName")&&U.push(j(o("reservations.details.labels.customer","العميل"),_)),B("customerInfo","customerCompany")&&U.push(j(o("reservations.details.labels.company","الشركة"),x)),B("customerInfo","customerPhone")&&U.push(j(o("reservations.details.labels.phone","الهاتف"),V)),B("customerInfo","customerEmail")&&U.push(j(o("reservations.details.labels.email","البريد"),k));const F=Y("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${A(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${U.length?`<div class="info-plain">${U.join("")}</div>`:T}
      </section>`:"",G=[];B("reservationInfo","reservationId")&&G.push(j(o("reservations.details.labels.reservationId","رقم الحجز"),m||"-")),B("reservationInfo","reservationStart")&&G.push(j(o("reservations.details.labels.start","بداية الحجز"),g)),B("reservationInfo","reservationEnd")&&G.push(j(o("reservations.details.labels.end","نهاية الحجز"),v)),B("reservationInfo","reservationDuration")&&G.push(j(o("reservations.details.labels.duration","عدد الأيام"),P));const L=Y("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${A(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${G.length?`<div class="info-plain">${G.join("")}</div>`:T}
      </section>`:"",z=[];B("projectInfo","projectTitle")&&z.push(j(o("reservations.details.labels.project","المشروع"),E)),B("projectInfo","projectCode")&&z.push(j(o("reservations.details.labels.code","الرمز"),I||"-"));const M=Y("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${A(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${z.length?`<div class="info-plain">${z.join("")}</div>`:T}
      </section>`:"",ee=[];B("financialSummary","equipmentTotal")&&ee.push(C(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${d}`)),B("financialSummary","crewTotal")&&ee.push(C(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${d}`)),B("financialSummary","discountAmount")&&ee.push(C(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${d}`)),B("financialSummary","taxAmount")&&ee.push(C(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${d}`));const de=B("financialSummary","finalTotal"),oe=[];de&&oe.push(C(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${d}`,{variant:"final"}));const ve=oe.length?`<div class="totals-final">${oe.join("")}</div>`:"",he=Y("financialSummary")?!ee.length&&!de?`<section class="quote-section quote-section--financial">${T}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${A(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${ee.length?`<div class="totals-inline">${ee.join("")}</div>`:""}
            ${ve}
          </div>
        </section>`:"",{groups:Q}=cr(t),ne=Q.map(O=>{const Ce=Number(O?.count??O?.quantity??1)||1,dt=Number(O?.unitPrice);let St=Number.isFinite(dt)?dt:0;if(!St||St<=0){const je=Number(O?.totalPrice);Number.isFinite(je)&&Ce>0&&(St=Number((je/Ce).toFixed(2)))}Number.isFinite(St)||(St=0);const Xn=O?.type==="package"||Array.isArray(O?.items)&&O.items.some(je=>je?.type==="package"),Jn=Array.isArray(O?.barcodes)&&O.barcodes.length?O.barcodes[0]:Array.isArray(O?.items)&&O.items.length?O.items[0]?.barcode:null;let ut=O?.packageDisplayCode??O?.package_code??O?.code??O?.packageCode??(Array.isArray(O?.items)&&O.items.length?O.items[0]?.package_code??O.items[0]?.code??O.items[0]?.packageCode:null);const Yn=je=>{const Ve=(je==null?"":String(je)).trim();return!!(!Ve||/^pkg-/i.test(Ve)||/^\d+$/.test(Ve)&&Ve.length<=4)};if(!ut||Yn(ut)){const je=O?.packageId??O?.package_id??(Array.isArray(O?.items)&&O.items.length?O.items[0]?.packageId??O.items[0]?.package_id:null);if(je)try{const Ve=nr(je);Ve&&Ve.package_code&&(ut=Ve.package_code)}catch{}}if(!ut||Yn(ut))try{const je=ds(O?.description||"");if(je){const Ve=Hc();let Kt=Ve.find(Et=>ds(Et?.name||Et?.title||Et?.label||"")===je);Kt||(Kt=Ve.find(Et=>{const ea=ds(Et?.name||Et?.title||Et?.label||"");return ea.includes(je)||je.includes(ea)})),Kt&&Kt.package_code&&(ut=Kt.package_code)}}catch{}const Zn=Xn?ut??Jn??"":O?.barcode??Jn??"",Za=Zn!=null?String(Zn):"";let mn=Number.isFinite(Number(O?.totalPrice))?Number(O.totalPrice):Number((St*Ce).toFixed(2));return mn=Se(mn),{...O,isPackage:Xn,desc:O?.description,barcode:Za,packageCodeResolved:ut||"",qty:Ce,price:mn,totalPrice:mn,unitPriceValue:St}}),qe=Zr.filter(O=>B("items",O.id)),W=qe.length>0,ie=W?qe.map(O=>`<th>${A(O.labelKey?o(O.labelKey,O.fallback):O.fallback)}</th>`).join(""):"",Ee=ne.length>0?ne.map((O,Ce)=>`<tr>${qe.map(dt=>`<td>${dt.render(O,Ce)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(qe.length,1)}" class="empty">${A(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,$e=Y("items")?W?`<section class="quote-section quote-section--table">
            <h3>${A(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${ie}</tr>
              </thead>
              <tbody>${Ee}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(o("reservations.details.items.title","المعدات"))}</h3>
            ${T}
          </section>`:"",Pe=eo.filter(O=>B("crew",O.id)),Te=Pe.length>0,qt=Te?Pe.map(O=>`<th>${A(O.labelKey?o(O.labelKey,O.fallback):O.fallback)}</th>`).join(""):"",S=Array.isArray(s)?s:[],Z=S.length?S.map((O,Ce)=>`<tr>${Pe.map(dt=>`<td>${dt.render(O,Ce)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Pe.length,1)}" class="empty">${A(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,J=Y("crew")?Te?`<section class="quote-section quote-section--table">
            <h3>${A(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${qt}</tr>
              </thead>
              <tbody>${Z}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${T}
          </section>`:"",ue=Y("notes")?`<section class="quote-section">
        <h3>${A(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${A(N||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",ce=[];B("payment","beneficiary")&&ce.push(H(o("reservations.quote.labels.beneficiary","اسم المستفيد"),De.beneficiaryName)),B("payment","bank")&&ce.push(H(o("reservations.quote.labels.bank","اسم البنك"),De.bankName)),B("payment","account")&&ce.push(H(o("reservations.quote.labels.account","رقم الحساب"),h(De.accountNumber))),B("payment","iban")&&ce.push(H(o("reservations.quote.labels.iban","رقم الآيبان"),h(De.iban)));const Re=`<section class="quote-section">
      <div class="payment-block">
        <h3>${A(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${ce.length?ce.join(""):T}</div>
      </div>
      <p class="quote-approval-note">${A(De.approvalNote)}</p>
    </section>`,ct=`<footer class="quote-footer">
        <h4>${A(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${K.map(O=>`<li>${A(O)}</li>`).join("")}</ul>
      </footer>`,Ke=[];F&&L?Ke.push(ke(`<div class="quote-section-row">${F}${L}</div>`,{blockType:"group"})):(L&&Ke.push(ke(L)),F&&Ke.push(ke(F))),M&&Ke.push(ke(M));const lt=[];$e&&lt.push(ke($e,{blockType:"table",extraAttributes:'data-table-id="items"'})),J&&lt.push(ke(J,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const Pt=[];he&&Pt.push(ke(he,{blockType:"summary"})),ue&&Pt.push(ke(ue));const $n=[ke(Re,{blockType:"payment"}),ke(ct,{blockType:"footer"})],He=[..._a(Ke,"reservations.quote.placeholder.page1"),...lt,..._a(Pt,"reservations.quote.placeholder.page2"),...$n],Ya=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${A(De.logoUrl)}" alt="${A(De.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${A(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${A(De.companyName)}</p>
        <p class="quote-company-cr">${A(o("reservations.quote.labels.cr","السجل التجاري"))}: ${A(De.commercialRegistry)}</p>
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
          ${Ya}
          ${He.join("")}
        </div>
      </div>
    </div>
  `}async function Au(){try{const e=pe();if((Array.isArray(e?.packages)?e.packages:[]).length>0)return;const n=await ot("/packages/?all=1"),a=Array.isArray(n?.data)?n.data:Array.isArray(n)?n:[];a.length&&(La({packages:a}),document.dispatchEvent?.(new CustomEvent("packages:changed",{detail:{packages:a}})))}catch{}}function xu(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function On(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>xu(c)),i=[s,...r].map(c=>c.catch(d=>(_t("asset load failed",d),Bd(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function Io(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await ho(r),await On(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let d=null,l=null;const u=E=>{E.style.margin="0 auto",E.style.breakInside="avoid",E.style.pageBreakInside="avoid",E.style.pageBreakAfter="auto",E.style.breakAfter="auto"},b=()=>{const E=a.createElement("div"),I=s.childElementCount===0;if(E.className="quote-page",E.dataset.pageIndex=String(s.childElementCount),I){E.classList.add("quote-page--primary");const N=i.cloneNode(!0);N.removeAttribute("data-quote-header-template"),E.appendChild(N)}else E.classList.add("quote-page--continuation");const P=a.createElement("main");P.className="quote-body",E.appendChild(P),s.appendChild(E),u(E),d=E,l=P},y=()=>{(!d||!l||!l.isConnected)&&b()},p=()=>{if(!d||!l||l.childElementCount>0)return;const E=d;d=null,l=null,E.parentNode&&E.parentNode.removeChild(E)},m=()=>{d=null,l=null},g=()=>d?d.scrollHeight-d.clientHeight>Cd:!1,v=(E,{allowOverflow:I=!1}={})=>(y(),l.appendChild(E),g()&&!I?(l.removeChild(E),p(),!1):!0),_=E=>{const I=E.cloneNode(!0);I.removeAttribute?.("data-quote-block"),I.removeAttribute?.("data-block-type"),I.removeAttribute?.("data-table-id"),!v(I)&&(m(),!v(I)&&v(I,{allowOverflow:!0}))},q=E=>{const I=E.querySelector("table");if(!I){_(E);return}const P=E.querySelector("h3"),N=I.querySelector("thead"),K=Array.from(I.querySelectorAll("tbody tr"));if(!K.length){_(E);return}let $=null,B=0;const Y=(j=!1)=>{const C=E.cloneNode(!1);C.removeAttribute("data-quote-block"),C.removeAttribute("data-block-type"),C.removeAttribute("data-table-id"),C.classList.add("quote-section--table-fragment"),j&&C.classList.add("quote-section--table-fragment--continued");const H=P?P.cloneNode(!0):null;H&&C.appendChild(H);const U=I.cloneNode(!1);U.classList.add("quote-table--fragment"),N&&U.appendChild(N.cloneNode(!0));const F=a.createElement("tbody");return U.appendChild(F),C.appendChild(U),{section:C,body:F}},T=(j=!1)=>$||($=Y(j),v($.section)||(m(),v($.section)||v($.section,{allowOverflow:!0})),$);K.forEach(j=>{T(B>0);const C=j.cloneNode(!0);if($.body.appendChild(C),g()&&($.body.removeChild(C),$.body.childElementCount||(l.removeChild($.section),$=null,p()),m(),$=null,T(B>0),$.body.appendChild(C),g())){$.section.classList.add("quote-section--table-fragment--overflow"),B+=1;return}B+=1}),$=null};if(!c.length)return;c.forEach(E=>{E.getAttribute("data-block-type")==="table"?q(E):_(E)});const k=Array.from(s.children),x=[];if(k.forEach((E,I)=>{const P=E.querySelector(".quote-body");if(I!==0&&(!P||P.childElementCount===0)){E.remove();return}x.push(E)}),!n){const E=a.defaultView||window,I=Math.min(3,Math.max(1,E.devicePixelRatio||1)),P=Ga()?Math.min(2,I):I;x.forEach(N=>Yd(N,{pixelRatio:P}))}x.forEach((E,I)=>{const P=I===0;E.style.pageBreakAfter="auto",E.style.breakAfter="auto",E.style.pageBreakBefore=P?"auto":"always",E.style.breakBefore=P?"auto":"page",n?E.style.boxShadow="":E.style.boxShadow="none"});const V=x[x.length-1]||null;d=V,l=V?.querySelector(".quote-body")||null,await On(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function di(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function Iu(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([eu(),Zd()]),c=e.ownerDocument||document,d=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,d,c?.documentElement?.getAttribute?.("dir")].some(E=>typeof E=="string"&&E.toLowerCase().startsWith("rtl")),b=typeof window<"u"&&window.devicePixelRatio||1,y=ci(),p=fo(),m=Ga();let g;m?g=1.5:p?g=Math.min(1.7,Math.max(1.2,b*1.1)):y?g=Math.min(1.8,Math.max(1.25,b*1.2)):g=Math.min(2,Math.max(1.6,b*1.4));const v=m||p?.9:y?.92:.95,_=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),q={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let k=0;const x=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let E=0;E<s.length;E+=1){const I=s[E];await ho(I),await On(I);const P=I.ownerDocument||document,N=P.createElement("div");Object.assign(N.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const K=I.cloneNode(!0);K.style.width=`${da}px`,K.style.maxWidth=`${da}px`,K.style.minWidth=`${da}px`,K.style.height=`${ua}px`,K.style.maxHeight=`${ua}px`,K.style.minHeight=`${ua}px`,K.style.position="relative",K.style.background="#ffffff",di(K),N.appendChild(K),P.body.appendChild(N);let $;try{await On(K),$=await i(K,{...q,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(F){throw Ts(F,"pageCapture",{toastMessage:x}),F}finally{N.parentNode?.removeChild(N)}if(!$)continue;const B=$.width||1,T=($.height||1)/B;let j=Ps,C=j*T,H=0;if(C>la){const F=la/C;C=la,j=j*F,H=Math.max(0,(Ps-j)/2)}const U=$.toDataURL("image/jpeg",v);k>0&&_.addPage(),_.addImage(U,"JPEG",H,0,j,C,`page-${k+1}`,"FAST"),k+=1,await new Promise(F=>window.requestAnimationFrame(F))}}catch(E){throw js({safariWindowRef:n,mobileWindowRef:a}),E}if(k===0)throw js({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(p||m){const E=_.output("blob");if(m){const I=URL.createObjectURL(E);Dn();try{window.location.assign(I)}catch(P){_t("mobile safari blob navigation failed",P)}finally{setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{const I=URL.createObjectURL(E),P=()=>p&&n&&!n.closed?n:a&&!a.closed?a:null,N=($,B)=>{if(Dn(),!$){window.location.assign(B);return}try{$.location.replace(B),$.focus?.()}catch(Y){_t("direct blob navigation failed",Y);try{$.document.open(),$.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${A(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${B}" title="PDF preview"></iframe></body></html>`),$.document.close()}catch(T){_t("iframe blob delivery failed",T),window.location.assign(B)}}},K=P();N(K,I),setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{Dn();const E=_.output("bloburl"),I=document.createElement("a");I.href=E,I.download=t,I.rel="noopener",I.style.display="none",document.body.appendChild(I),I.click(),setTimeout(()=>{URL.revokeObjectURL(E),I.remove()},2e3)}}function pn(){if(!D||!X)return;const{previewFrame:e}=X;if(!e)return;const t=D.context||"reservation",n=xo({context:t,reservation:D.reservation,customer:D.customer,project:D.project,crewAssignments:D.crewAssignments,totals:D.totals,totalsDisplay:D.totalsDisplay,rentalDays:D.rentalDays,currencyLabel:D.currencyLabel,sections:D.sections,fieldSelections:D.fields,quoteNumber:D.quoteNumber,quoteDate:D.quoteDateLabel,terms:D.terms,projectCrew:D.projectCrew,projectExpenses:D.projectExpenses,projectEquipment:D.projectEquipment,projectInfo:D.projectInfo,clientInfo:D.clientInfo,paymentSummary:D.paymentSummary,projectTotals:D.projectTotals});en("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&(Xr(r),Gr(r,s),Wr(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await Io(i,{context:"preview"}),di(i))}catch(p){console.error("[reservations/pdf] failed to layout preview document",p)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),d=a?.querySelector(".quote-preview-pages"),l=da;let u=18;if(d&&a?.defaultView){const p=a.defaultView.getComputedStyle(d),m=parseFloat(p.rowGap||p.gap||`${u}`);Number.isFinite(m)&&m>=0&&(u=m)}const b=ua,y=c.length?c.length*b+Math.max(0,(c.length-1)*u):b;if(e.dataset.baseWidth=String(l),e.dataset.baseHeight=String(y),e.style.width=`${l}px`,e.style.minWidth=`${l}px`,e.style.height=`${y}px`,e.style.minHeight=`${y}px`,X?.previewFrameWrapper&&!X?.userAdjustedZoom){const p=X.previewFrameWrapper.clientWidth-24;p>0&&p<l?yt=Math.max(p/l,.3):yt=1}ko(yt)}finally{Dn()}},{once:!0})}function _u(e){if(!D)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?D.sections.add(n):D.sections.delete(n),So(D),_o(),pn())}function ku(e){if(!D)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=D.context||"reservation",r=D.fields||(D.fields=Qa(s)),i=Dd(r,n);t.checked?i.add(a):i.delete(a),So(D),pn()}function $u(e){if(!D)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(oi(D,n),D.sectionExpansions[n]=t.open)}function _o(){if(!X?.toggles||!D)return;const{toggles:e}=X,t=D.fields||{},n=D.context||"reservation";oi(D);const a=Ka(n),s=so(n),r=a.map(({id:i,labelKey:c,fallback:d})=>{const l=o(c,d),u=D.sections.has(i),b=s[i]||[],y=Fd(D,i),p=b.length?`<div class="quote-toggle-sublist">
          ${b.map(m=>{const g=ii(t,i,m.id),v=u?"":"disabled",_=m.labelKey?o(m.labelKey,m.fallback):m.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${m.id}" ${g?"checked":""} ${v}>
                <span>${A(_)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${i}" ${y?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${i}" ${u?"checked":""}>
            <span>${A(l)}</span>
          </label>
          ${b.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${p}
      </details>
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",_u)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",ku)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",$u)})}function Pu(){if(X?.modal)return X;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
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
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),r=e.querySelector("[data-quote-terms-reset]"),i=e.querySelector("[data-quote-download]"),c=e.querySelector(".modal-header"),d=c?.querySelector(".btn-close"),l=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",c&&c.insertBefore(u,d||null);const b=document.createElement("iframe");b.className="quote-preview-frame",b.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),b.setAttribute("loading","lazy"),b.setAttribute("frameborder","0");const y=document.createElement("div");y.className="quote-preview-zoom-controls",y.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${A(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${A(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${A(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const p=document.createElement("div");p.className="quote-preview-frame-wrapper",p.appendChild(b),n.innerHTML="";const m=document.createElement("div");m.className="quote-preview-scroll",m.appendChild(p),n.appendChild(m);const g=document.createElement("div");g.className="quote-preview-status",g.setAttribute("role","status"),g.setAttribute("aria-live","polite"),g.hidden=!0,g.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${A(oo("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(y),i?.addEventListener("click",async()=>{if(D){i.disabled=!0;try{await $o()}finally{i.disabled=!1}}});const v=()=>{Cs()||Ls(e)};l.forEach(x=>{x?.addEventListener("click",v)}),d&&!l.includes(d)&&d.addEventListener("click",v),e.addEventListener("click",x=>{Cs()||x.target===e&&Ls(e)}),X={modal:e,toggles:t,preview:n,previewScroll:m,previewFrameWrapper:p,zoomControls:y,zoomValue:y.querySelector("[data-zoom-value]"),previewFrame:b,meta:a,downloadBtn:i,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const _=y.querySelector("[data-zoom-out]"),q=y.querySelector("[data-zoom-in]"),k=y.querySelector("[data-zoom-reset]");return _?.addEventListener("click",()=>Hi(-.1)),q?.addEventListener("click",()=>Hi(.1)),k?.addEventListener("click",()=>ka(1,{markManual:!0})),s&&s.addEventListener("input",Lu),r&&r.addEventListener("click",Tu),ka(yt),X}function ka(e,{silent:t=!1,markManual:n=!1}={}){yt=Math.min(Math.max(e,.25),2.2),n&&X&&(X.userAdjustedZoom=!0),ko(yt),!t&&X?.zoomValue&&(X.zoomValue.textContent=`${Math.round(yt*100)}%`)}function Hi(e){ka(yt+e,{markManual:!0})}function ko(e){if(!X?.previewFrame||!X.previewFrameWrapper)return;const t=X.previewFrame,n=X.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",ci()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function Cu(){if(!X?.meta||!D)return;const{meta:e}=X;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${A(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${A(D.quoteNumber)}</strong></div>
      <div><span>${A(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${A(D.quoteDateLabel)}</strong></div>
    </div>
  `}function ui(){if(!X?.termsInput)return;const e=(D?.terms&&D.terms.length?D.terms:We).join(`
`);X.termsInput.value!==e&&(X.termsInput.value=e)}function Lu(e){if(!D)return;const t=_s(e?.target?.value??"");if(t.length){D.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{D.terms=[...We],ui();const n=We.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}pn()}function Tu(e){if(e?.preventDefault?.(),!D)return;D.terms=[...We];const t=document.getElementById("reservation-terms");t&&(t.value=We.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=We.join(`
`)),ui(),pn()}async function $o(){if(!D)return;en("export");const t=!ci()&&fo(),n=Ga(),a=null,s=!n&&t?window.open("","_blank"):null;(d=>{if(d)try{d.document.open(),d.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${A(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${A(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${A(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),d.document.close()}catch(l){_t("failed to prime download window",l)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await tu(),us("html2pdf ensured");const d=D.context||"reservation",l=xo({context:d,reservation:D.reservation,customer:D.customer,project:D.project,crewAssignments:D.crewAssignments,totals:D.totals,totalsDisplay:D.totalsDisplay,rentalDays:D.rentalDays,currencyLabel:D.currencyLabel,sections:D.sections,fieldSelections:D.fields,quoteNumber:D.quoteNumber,quoteDate:D.quoteDateLabel,terms:D.terms,projectCrew:D.projectCrew,projectExpenses:D.projectExpenses,projectEquipment:D.projectEquipment,projectInfo:D.projectInfo,clientInfo:D.clientInfo,paymentSummary:D.paymentSummary,projectTotals:D.projectTotals});i=document.createElement("div"),i.innerHTML=l,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),Xr(i),Gr(i),Wr(i),us("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await Io(u,{context:"export"}),await On(u),di(u),us("layout complete for export document")}catch(y){Ts(y,"layoutQuoteDocument",{suppressToast:!0})}}const b=`quotation-${D.quoteNumber}.pdf`;await Iu(u,{filename:b,safariWindowRef:s,mobileWindowRef:a}),D.sequenceCommitted||(iu(D.quoteSequence),D.sequenceCommitted=!0)}catch(d){js({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,Ts(d,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),Dn()}}function Po(){const e=Pu();e?.modal&&(Bn=!1,yt=1,X&&(X.userAdjustedZoom=!1),ka(yt,{silent:!0}),_o(),Cu(),ui(),pn(),Nd(e.modal))}async function ju({reservation:e,customer:t,project:n}){if(!e){w(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}await Au();const a=du(e),{totalsDisplay:s,totals:r,rentalDays:i}=uu(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:d,quoteNumber:l}=vo("reservation"),u=new Date,b=wd();D={context:"reservation",reservation:e,customer:t,project:n,crewAssignments:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(Ka("reservation").filter(y=>y.defaultSelected).map(y=>y.id)),sectionExpansions:ri("reservation"),fields:Qa("reservation"),terms:b,quoteSequence:d,quoteNumber:l,quoteDate:u,quoteDateLabel:wo(u),sequenceCommitted:!1},Eo(D),Po()}async function Fp({project:e}){if(!e){w(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=Eu(e),{project:n}=t;if(!n){w(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=vo("project"),r=new Date,i=[...Ed];D={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(Ka("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:ri("project"),fields:Qa("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:wo(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},Eo(D),Po()}function Nu({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=tn(),{reservations:r=[],customers:i=[],technicians:c=[],projects:d=[]}=pe(),l=r.map(q=>{const k=fs(q);return{...k,id:q.id??k.id,reservationId:q.reservationId??q.reservation_id??k.reservationId,reservationCode:q.reservationCode??q.reservation_code??k.reservationCode}}),u=l,b=Array.isArray(s)?s:c||[],y=new Map((d||[]).map(q=>[String(q.id),q])),p=document.getElementById(e);if(!p){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!u||u.length===0){p.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const m=t||od(),g=new Map(i.map(q=>[String(q.id),q])),v=new Map(b.map(q=>[String(q.id),q])),_=ud({reservations:l,filters:m,customersMap:g,techniciansMap:v,projectsMap:y});if(_.length===0){p.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}p.innerHTML=`<div class="reservations-grid">${pd({entries:_,customersMap:g,techniciansMap:v,projectsMap:y})}</div>`,p.querySelectorAll('[data-action="details"]').forEach(q=>{const k=Number(q.dataset.reservationIndex);Number.isNaN(k)||q.addEventListener("click",()=>{typeof n=="function"&&n(k)})}),p.querySelectorAll('button[data-action="confirm"]').forEach(q=>{const k=Number(q.dataset.reservationIndex);Number.isNaN(k)||q.addEventListener("click",x=>{x.stopPropagation(),typeof a=="function"&&a(k,x)})})}function Bu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=pe(),c=s.map(g=>{const v=fs(g);return{...v,id:g.id??v.id,reservationId:g.reservationId??g.reservation_id??v.reservationId,reservationCode:g.reservationCode??g.reservation_code??v.reservationCode}}),d=s[e];if(!d)return w(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const l=c[e]??fs(d),u=r.find(g=>String(g.id)===String(d.customerId)),b=d.projectId?i.find(g=>String(g.id)===String(d.projectId)):null,y=document.getElementById("reservation-details-body"),p=document.getElementById("reservationDetailsModal"),m=()=>{const g=()=>{p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(p)?.hide()},v=document.getElementById("reservation-details-edit-btn");v&&(v.onclick=()=>{g(),typeof t=="function"&&t(e,{reservation:d,customer:u,getEditContext:a})});const _=document.getElementById("reservation-details-delete-btn");_&&(_.onclick=()=>{g(),typeof n=="function"&&n(e,{reservation:d,customer:u})});const q=y?.querySelector('[data-action="open-project"]');q&&b&&q.addEventListener("click",()=>{g();const x=b?.id!=null?String(b.id):"",V=x?`projects.html?project=${encodeURIComponent(x)}`:"projects.html";window.location.href=V});const k=document.getElementById("reservation-details-export-btn");k&&(k.onclick=async x=>{x?.preventDefault?.(),x?.stopPropagation?.(),k.blur();try{await ju({reservation:d,customer:u,project:b})}catch(V){console.error("❌ [reservations] export to PDF failed",V),w(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}})};if(y){const g=tn()||[];y.innerHTML=Bi(l,u,g,e,b),m(),dr().then(()=>{const v=tn()||[];y.innerHTML=Bi(l,u,v,e,b),m()}).catch(()=>{})}return p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(p).show(),!0}function Co(){const e=()=>{In(),Oe(),tn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let Vi=!1,Ui=null;function Du(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function Rp(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=Du(n);if(!a&&Vi&&Zt().length>0&&s===Ui)return Zt();try{const r=await ur(n||{});return Vi=!0,Ui=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return Zt()}}async function Fu(e,{onAfterChange:t}={}){if(!on())return Vn(),!1;const a=Zt()[e];if(!a)return w(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return w(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await Vc(s),Co(),t?.({type:"deleted",reservation:a}),w(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=Na(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return w(i,"error"),!1}}async function Ru(e,{onAfterChange:t}={}){const a=Zt()[e];if(!a)return w(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return w(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=Ot(a);if(r)return w(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await Uc(s);return Co(),t?.({type:"confirmed",reservation:i}),w(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=Na(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return w(c,"error"),!1}}function kn(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Mn(e,n),end:Mn(t,a)}}function $a(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function pi(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function Lo(){const{container:e,select:t,hint:n,addButton:a}=pi();if(!t)return;const s=t.value,r=Zi(),i=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,d=r.map(u=>{const b=Number.isFinite(Number(u.price))?Number(u.price):0,y=h(b.toFixed(2)),p=`${u.name} — ${y} ${i}`;return`<option value="${$a(u.id)}">${$a(p)}</option>`}).join("");t.innerHTML=`${c}${d}`;const l=r.length>0;t.disabled=!l,a&&(a.disabled=!l),e&&(e.hidden=!l,e.setAttribute("aria-hidden",l?"false":"true")),n&&(l?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),l&&s&&r.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function Mu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||w(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=Vt(),{start:r,end:i}=kn(),{reservations:c=[]}=pe(),d=a!=null&&c[a]||null,l=d?.id??d?.reservationId??null,u=Mr(n,{existingItems:s,start:r,end:i,ignoreReservationId:l});if(!u.success)return t||w(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const b=[...s,u.package];return Ut(a,b),Ht(b),tt(),t||w(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function Ki(){const{select:e}=pi();if(!e)return;const t=e.value||"";Mu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function zu(){const{addButton:e,select:t}=pi();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{Ki()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Ki())}),t.dataset.listenerAttached="true"),Lo()}function Ht(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,Gi(t);return}const d=wn(e);t.innerHTML=d.map(l=>{const u=l.items[0]||{},b=ln(u)||l.image,y=b?`<img src="${b}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',p=l.items.some($=>$?.type==="package"),m=h(String(l.count)),g=Ne(l.unitPrice),v=Number.isFinite(g)?Se(g):0,_=Ne(l.totalPrice),q=Number.isFinite(_)?_:v*(Number.isFinite(l.count)?l.count:1),k=Se(q),x=`${h(v.toFixed(2))} ${a}`,V=`${h(k.toFixed(2))} ${a}`,E=l.barcodes.map($=>h(String($||""))).filter(Boolean),I=E.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${E.map($=>`<li>${$}</li>`).join("")}
            </ul>
          </details>`:"";let P="";if(p){const $=new Map,B=T=>{const j=Number.parseFloat(h(String(T??"")).replace(/[^0-9.]/g,""));return!Number.isFinite(j)||j<=0||j>99?1:Math.round(j)},Y=[];if(Array.isArray(l.packageItems)&&l.packageItems.length&&Y.push(...l.packageItems),l.items.forEach(T=>{Array.isArray(T?.packageItems)&&Y.push(...T.packageItems)}),Y.forEach(T=>{if(!T)return;const j=se(T.barcode||T.normalizedBarcode||T.desc||Math.random());if(!j)return;const C=$.get(j),H=B(T.qtyPerPackage??T.perPackageQty??T.quantityPerPackage??T.qty??T.quantity??1),U=Math.max(1,Math.min(H,99));if(C){C.qty=U;return}$.set(j,{desc:T.desc||T.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:U,barcode:T.barcode??T.normalizedBarcode??""})}),$.size){const T=Array.from($.values()).map(j=>{const C=h(String(j.qty>0?Math.min(j.qty,99):1)),H=$a(j.desc||""),U=j.barcode?` <span class="reservation-package-items__barcode">(${$a(h(String(j.barcode)))})</span>`:"";return`<li>${H}${U} × ${C}</li>`}).join("");P=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${T}
              </ul>
            </details>
          `}}const N=p?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",K=p?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${l.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${y}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${l.description||"-"}</div>
                ${p?`${P||""}${I||""}`:I}
              </div>
            </div>
          </td>
          <td>
            <div class="${N}" data-group-key="${l.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${l.key}" aria-label="${i}"${K}>−</button>
              <span class="reservation-qty-value">${m}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${l.key}" aria-label="${r}"${K}>+</button>
            </div>
          </td>
          <td>${x}</td>
          <td>${V}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${l.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),Gi(t)}function Ou(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function Wa(){const e=document.getElementById("edit-res-payment-history");if(!e)return;let t=Xa();const n=document.getElementById("edit-res-project")?.value||"";if(n)try{const i=(pe()?.projects||[]).find(d=>String(d.id)===String(n)),c=Array.isArray(i?.paymentHistory)?i.paymentHistory:Array.isArray(i?.payment_history)?i.payment_history:Array.isArray(i?.payments)?i.payments:Array.isArray(i?.paymentLogs)?i.paymentLogs:[];Array.isArray(c)&&c.length&&(t=c)}catch{}if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة")}</div>`,Qi();return}const a=o("reservations.create.summary.currency","SR"),s=t.map((r,i)=>{const c=Number.isFinite(Number(r?.amount))&&Number(r.amount)>0?`${h(Number(r.amount).toFixed(2))} ${a}`:"—",d=Number.isFinite(Number(r?.percentage))&&Number(r.percentage)>0?`${h(Number(r.percentage).toFixed(2))}%`:"—",l=r?.recordedAt?h(Ze(r.recordedAt)):"—",u=Ou(r?.type),b=r?.note?h(r.note):"";return`
      <tr>
        <td>${u}</td>
        <td>${c}</td>
        <td>${d}</td>
        <td>${l}</td>
        <td>${b}</td>
        <td class="reservation-payment-history__actions">
          <button type="button" class="btn btn-link btn-sm reservation-payment-history__remove" data-action="remove-payment" data-index="${i}" aria-label="${o("reservations.paymentHistory.actions.delete","حذف الدفعة")}">🗑️</button>
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
        <tbody>${s}</tbody>
      </table>
    </div>
  `,Qi()}function Hu(){if(Hn()){w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=No(e);let a=Bo(t);if(!Number.isFinite(a)||a<=0){w(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=ys.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,d=o("reservations.create.summary.currency","SR");let l=null,u=null;if(n==="percent"){const y=Math.max(0,100-i);if(y<=1e-4){w(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const p=Math.min(a,y);if(p!==a){const m=h(p.toFixed(2));w(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",m)),a=p}u=Number(a.toFixed(2)),r>0&&(l=a/100*r)}else{const y=Math.max(0,r-c);if(y<=1e-4){w(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const p=Math.min(a,y);if(p!==a){const m=`${h(p.toFixed(2))} ${d}`;w(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",m)),a=p}l=Number(a.toFixed(2)),r>0&&(u=l/r*100)}l!=null&&(l=Number(l.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const b={type:n,value:a,amount:l,percentage:u,recordedAt:new Date().toISOString()};tp(b),mi(Xa()),Wa(),tt(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),w(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function Qi(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(Hn()){n.preventDefault(),w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Hu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(Hn()){n.preventDefault(),w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(np(s),mi(Xa()),Wa(),tt(),w(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function Vu(e){const{index:t,items:n}=Vt(),s=wn(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,d)=>d!==r);Ut(t,i),Ht(i),tt()}function Uu(e){const{index:t,items:n}=Vt(),a=n.filter(s=>ja(s)!==e);a.length!==n.length&&(Ut(t,a),Ht(a),tt())}function Ku(e){const{index:t,items:n}=Vt(),s=wn(n).find(v=>v.key===e);if(!s||s.items.some(v=>v?.type==="package"))return;const{start:r,end:i}=kn();if(!r||!i){w(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=pe(),d=t!=null&&c[t]||null,l=d?.id??d?.reservationId??null,u=new Set(n.map(v=>se(v.barcode))),{equipment:b=[]}=pe(),y=(b||[]).find(v=>{const _=se(v?.barcode);return!_||u.has(_)||ja({desc:v?.desc||v?.description||v?.name||"",price:Number(v?.price)||0})!==e||!gr(v)?!1:!gt(_,r,i,l)});if(!y){w(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const p=se(y.barcode),m=cn(y);if(!m){w(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:m,equipmentId:m,barcode:p,desc:y.desc||y.description||y.name||s.description||"",qty:1,price:Number.isFinite(Number(y.price))?Number(y.price):s.unitPrice,image:ln(y)}];Ut(t,g),Ht(g),tt()}function Gi(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){Vu(s);return}if(a==="increase-edit-group"&&s){Ku(s);return}if(a==="remove-edit-group"&&s){Uu(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||Wu(i)}}),e.dataset.groupListenerAttached="true")}function Hn(){return!!document.getElementById("edit-res-project")?.value}function Qu(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{Hn()&&(w(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function Gu(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),d=document.getElementById("edit-res-payment-history");if([n,a,s,r,i,c,d].forEach(Qu),e){if(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s){const l=document.getElementById("edit-res-project")?.value||"";let u="unpaid";if(l)try{const y=(pe()?.projects||[]).find(m=>String(m.id)===String(l)),p=typeof y?.paymentStatus=="string"?y.paymentStatus.toLowerCase():null;p&&["paid","partial","unpaid"].includes(p)&&(u=p)}catch{}s.value=u,s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected}r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),d&&(d.dataset.linkedDisabled="true")}else n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.dataset.linkedDisabled="false")}function tt(){const e=document.getElementById("edit-res-summary");if(!e)return;Wa();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),Ye(a),tt()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=Hn();Gu(c);const d=document.getElementById("edit-res-tax"),l=c?!1:d?.checked||!1,u=!c&&a?.dataset?.userSelected==="true";let b="unpaid";if(c){const k=document.getElementById("edit-res-project")?.value||"";if(k)try{const V=(pe()?.projects||[]).find(I=>String(I.id)===String(k)),E=typeof V?.paymentStatus=="string"?V.paymentStatus.toLowerCase():null;E&&["paid","partial","unpaid"].includes(E)&&(b=E)}catch{}}else b=u&&a?.value||"unpaid";let y=null;!c&&l&&(rt("edit-res-company-share"),y=qn("edit-res-company-share"),(!Number.isFinite(y)||y<=0)&&(rt("edit-res-company-share"),y=qn("edit-res-company-share")));const{items:p=[],payments:m=[]}=Vt(),{start:g,end:v}=kn(),_=ys({items:p,discount:r,discountType:i,applyTax:l,paidStatus:b,start:g,end:v,companySharePercent:y,paymentHistory:m});e.innerHTML=_;const q=ys.lastResult;if(q&&a){const k=q.paymentStatus;u?Ye(a,a.value):(a.value!==k&&(a.value=k),a.dataset&&delete a.dataset.userSelected,Ye(a,k))}else a&&Ye(a,a.value)}function Wu(e){if(e==null)return;const{index:t,items:n}=Vt();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);Ut(t,a),Ht(a),tt()}function Xu(e){const t=e?.value??"",n=se(t);if(!n)return;const a=Da(n);if(!a){w(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=kt(a);if(s==="maintenance"||s==="retired"){w(rn(s));return}const r=se(n),{index:i,items:c=[]}=Vt();if(c.findIndex(v=>se(v.barcode)===r)>-1){w(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:l,end:u}=kn();if(!l||!u){w(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:b=[]}=pe(),y=i!=null&&b[i]||null,p=y?.id??y?.reservationId??null;if(gt(r,l,u,p)){w(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=cn(a);if(!m){w(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:m,equipmentId:m,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];Ut(i,g),e&&(e.value=""),Ht(g),tt()}function Pa(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Br(t),a=se(n?.barcode||t);if(!n||!a){w(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=kt(n);if(s==="maintenance"||s==="retired"){w(rn(s));return}const{start:r,end:i}=kn();if(!r||!i){w(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:d=[]}=Vt();if(d.some(g=>se(g.barcode)===a)){w(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=pe(),b=c!=null&&u[c]||null,y=b?.id??b?.reservationId??null;if(gt(a,r,i,y)){w(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const p=cn(n);if(!p){w(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const m=[...d,{id:p,equipmentId:p,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];Ut(c,m),Ht(m),tt(),e.value=""}function To(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Pa(e))});const t=()=>{Dr(e.value,"edit-res-equipment-description-options")&&Pa(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{tt()});const e=()=>{zu()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{Lo()})}typeof window<"u"&&(window.getEditReservationDateRange=kn,window.renderEditPaymentHistory=Wa);function Ju(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){As(e);return}Pa(e)}}function Mp(){zt(),To()}function Yu(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let hn=null,ft=[],bt=[],Ns=null,Ue={},ps=!1;const Zu="__DEBUG_CREW__";function ep(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(Zu);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function Wi(e,t){if(ep())try{console.log(`🪵 [crew-debug:edit] ${e}`,t)}catch{}}function Fn(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function pa(){return document.getElementById("edit-res-confirmed")?.value==="true"}function Vt(){return{index:hn,items:ft,payments:bt}}function Ut(e,t,n=bt){hn=typeof e=="number"?e:null,ft=Array.isArray(t)?[...t]:[],bt=Array.isArray(n)?[...n]:[]}function jo(){hn=null,ft=[],Gc(),bt=[]}function Xa(){return[...bt]}function mi(e){bt=Array.isArray(e)?[...e]:[]}function tp(e){e&&(bt=[...bt,e])}function np(e){!Number.isInteger(e)||e<0||(bt=bt.filter((t,n)=>n!==e))}function Rn(e,t=1){const n=Number.parseFloat(h(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function Bs(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(h(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function ap(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?se(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:Rn(e.qty??e.quantity??e.count??1),price:Bs(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function sp(e,t=0){if(!e||typeof e!="object")return null;const n=zn(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=Rn(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),r=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:Ms(e)).map(y=>ap(y)).filter(Boolean),i=e.total_price??e.totalPrice??e.total??null;let c=Bs(e.unit_price??e.unitPrice??e.price??null,0);if((!c||c===0)&&i!=null){const y=Bs(i,0);y>0&&a>0&&(c=Number((y/a).toFixed(2)))}const d=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,d,n].find(y=>y!=null&&String(y).trim()!=="")||`Package ${n}`,b=e.image??e.cover??e.thumbnail??r.find(y=>y?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:h(String(u)),name:h(String(u)),qty:a,price:c,barcode:d,packageItems:r,image:b}}function ip(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const r=s-n;e.set(a,r>0?r:0)})}function rp(e={},t=[]){const n=Array.isArray(t)?t.map(c=>({...c})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((c,d)=>sp(c,d)).filter(Boolean);if(!s.length)return n;const r=new Map;s.forEach(c=>{const d=Rn(c.qty??c.quantity??1);if(c.barcode){const l=se(c.barcode);if(l){const u=`package::${l}`;r.set(u,(r.get(u)??0)+d)}}(c.packageItems||[]).forEach(l=>{if(!l)return;const u=d*Rn(l.qty??l.quantity??1),b=l.equipmentId??null,y=l.normalizedBarcode||(l.barcode?se(l.barcode):null);if(b!=null){const p=`equipment::${String(b)}`;r.set(p,(r.get(p)??0)+u)}if(y){const p=`barcode::${y}`;r.set(p,(r.get(p)??0)+u)}})});const i=[];return n.forEach(c=>{if(!c||typeof c!="object"){i.push(c);return}if(c.type==="package"){const v=zn(c.packageId??c.package_id??c.id??"");s.some(q=>q.packageId===v)||i.push({...c});return}const d=Rn(c.qty??c.quantity??1),l=cn(c),u=c.barcode?se(c.barcode):null,b=[];l!=null&&b.push(`equipment::${String(l)}`),u&&b.push(`barcode::${u}`);const y=b.map(v=>r.get(v)??0).filter(v=>v>0);if(!y.length){i.push({...c});return}const p=Math.min(...y);if(p<=0){i.push({...c});return}const m=Math.min(p,d);if(ip(r,b,m),m>=d)return;const g=d-m;i.push({...c,qty:g,quantity:g})}),[...i,...s.map(c=>({...c}))]}function op(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function No(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Bo(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function cp(e,t){if(e){e.value="";return}}function Tn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Do(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),d=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,l=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:d,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:l}}function lp(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((d,l)=>String(l.createdAt||l.start||"").localeCompare(String(d.createdAt||d.start||""))):[],c=[`<option value="">${Tn(a)}</option>`];i.forEach(d=>{c.push(`<option value="${Tn(d.id)}">${Tn(d.title||a)}</option>`)}),r&&!i.some(d=>String(d.id)===r)&&c.push(`<option value="${Tn(r)}">${Tn(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function Fo(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const d=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",d&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}Ds("tax");const c=Ue?.updateEditReservationSummary;typeof c=="function"&&c()}function Ds(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=Ue?.updateEditReservationSummary;typeof r=="function"&&r()};if(ps){a();return}ps=!0;const s=()=>{ps=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(Ft)),t.disabled){n.checked=!1,w(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),rt("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?rt("edit-res-company-share"):n.checked&&(n.checked=!1));s()}async function Xi(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:d}=pe(),u=Zt()?.[e];if(!u){w(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}Ue={...Ue,reservation:u,projects:d||[]},t?.(),lp(d||[],u);const b=u.projectId&&d?.find?.(L=>String(L.id)===String(u.projectId))||null,{effectiveConfirmed:y,projectLinked:p}=Ot(u,b),m=u.items?u.items.map(L=>({...L,equipmentId:L.equipmentId??L.equipment_id??L.id,barcode:se(L?.barcode)})):[],g=rp(u,m),_=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(L=>Do(L)).filter(Boolean);Ut(e,g,_);const q=o("reservations.list.unknownCustomer","غير معروف"),k=c?.find?.(L=>String(L.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const x=document.getElementById("edit-res-id");x&&(x.value=u.reservationId||u.id);const V=document.getElementById("edit-res-customer");V&&(V.value=k?.customerName||q);const E=typeof a=="function"?a(u.start):{date:"",time:""},I=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",E.date),n?.("edit-res-start-time",E.time),n?.("edit-res-end",I.date),n?.("edit-res-end-time",I.time);const P=document.getElementById("edit-res-notes");P&&(P.value=u.notes||"");const N=document.getElementById("edit-res-discount");if(N){const L=p?0:u.discount??0;N.value=h(L)}const K=document.getElementById("edit-res-discount-type");K&&(K.value=p?"percent":u.discountType||"percent");const $=u.projectId?!1:!!u.applyTax,B=document.getElementById("edit-res-tax");B&&(B.checked=$);const Y=document.getElementById("edit-res-company-share");if(Y){const L=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,z=L!=null?Number.parseFloat(h(String(L).replace("%","").trim())):NaN,M=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,ee=M!=null?M===!0||M===1||M==="1"||String(M).toLowerCase()==="true":Number.isFinite(z)&&z>0,de=ee&&Number.isFinite(z)&&z>0?z:Ft,oe=$||ee;Y.checked=oe,Y.dataset.companyShare=String(de)}Fn(y,{disable:p});const T=document.getElementById("edit-res-paid"),j=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");T&&(T.value=j,T.dataset&&delete T.dataset.userSelected);const C=document.getElementById("edit-res-payment-progress-type"),H=document.getElementById("edit-res-payment-progress-value");C?.dataset?.userSelected&&delete C.dataset.userSelected,C&&(C.value="percent"),cp(H);const U=document.getElementById("edit-res-cancelled");if(U){const L=String(u?.status||u?.reservationStatus||"").toLowerCase();U.checked=["cancelled","canceled"].includes(L),U.checked&&Fn(y,{disable:!0})}let F=Array.isArray(u.crewAssignments)&&u.crewAssignments.length?u.crewAssignments:Array.isArray(u.techniciansDetails)&&u.techniciansDetails.length?u.techniciansDetails:(u.technicians||[]).map(L=>String(L));if(!Array.isArray(F)||F.length===0){const L=Wc(u.id??u.reservationId??u.reservation_code??null);Array.isArray(L)&&L.length&&(F=L)}try{await dr()}catch(L){console.warn("[reservationsEdit] positions load failed (non-fatal)",L)}if(Xc(F),s?.(g),typeof window<"u"){const L=window?.renderEditPaymentHistory;typeof L=="function"&&L()}Fo(),r?.();const G=document.getElementById("editReservationModal");Ns=op(G,i),Ns?.show?.()}async function dp({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:r,populateEquipmentDescriptionLists:i,handleReservationsMutation:c}={}){if(hn===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const d=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),b=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",y=document.getElementById("edit-res-notes")?.value||"",p=h(document.getElementById("edit-res-discount")?.value||"0");let m=parseFloat(p)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const v=pa(),_=document.getElementById("edit-res-paid"),q=_?.dataset?.userSelected==="true",k=q&&_?.value||"unpaid",x=document.getElementById("edit-res-payment-progress-type"),V=document.getElementById("edit-res-payment-progress-value"),E=No(x),I=Bo(V),P=document.getElementById("edit-res-project")?.value||"",K=document.getElementById("edit-res-cancelled")?.checked===!0,$=Kc();$.map(S=>S?.technicianId).filter(Boolean);const B=document.getElementById("edit-res-company-share"),Y=document.getElementById("edit-res-tax");if(!d||!u){w(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const T=typeof e=="function"?e:(S,Z)=>`${S}T${Z||"00:00"}`,j=T(d,l),C=T(u,b);if(j&&C&&new Date(j)>new Date(C)){w(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const U=Zt()?.[hn];if(!U){w(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(ft)||ft.length===0&&$.length===0){w(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const F=typeof t=="function"?t:()=>!1,G=U.id??U.reservationId;for(const S of ft){if(S?.type==="package"&&Array.isArray(S.packageItems)){for(const J of S.packageItems){const ue=J?.barcode??J?.normalizedBarcode??"";if(!ue)continue;const ce=kt(ue);if(ce==="reserved"){const Re=se(ue);if(!F(Re,j,C,G))continue}if(ce!=="available"){w(rn(ce));return}}continue}const Z=kt(S.barcode);if(Z==="reserved"){const J=se(S.barcode);if(!F(J,j,C,G))continue}if(Z!=="available"){w(rn(Z));return}}for(const S of ft){if(S?.type==="package"&&Array.isArray(S.packageItems)){for(const J of S.packageItems){const ue=se(J?.barcode??J?.normalizedBarcode??"");if(ue&&F(ue,j,C,G)){const ce=J?.desc||J?.barcode||o("reservations.create.packages.unnamedItem","معدة بدون اسم"),Re=`${o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${h(String(ce))})`;w(Re);return}}continue}const Z=se(S.barcode);if(F(Z,j,C,G)){w(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const L=typeof n=="function"?n:()=>!1;for(const S of ft){if(S?.type!=="package")continue;const Z=S.packageId??S.package_id??null;if(Z&&L(Z,j,C,G)){const J=S.desc||S.packageName||o("reservations.create.packages.genericName","الحزمة");w(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${h(String(J))} محجوزة بالفعل في الفترة المختارة`));return}}const z=typeof a=="function"?a:()=>!1;for(const S of $)if(S?.technicianId&&z(S.technicianId,j,C,G)){w(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const M=Array.isArray(Ue.projects)&&Ue.projects.length?Ue.projects:pe().projects||[],ee=P&&M.find(S=>String(S.id)===String(P))||null,de={...U,projectId:P?String(P):null,confirmed:v},{effectiveConfirmed:oe,projectLinked:ve,projectStatus:he}=Ot(de,ee);let Q=!!B?.checked,ne=!!Y?.checked;if(ve&&(Q&&(B.checked=!1,Q=!1),ne=!1),!ve&&Q!==ne){w(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}ne&&(rt("edit-res-company-share"),Q=!!B?.checked);let qe=Q?getCompanySharePercent("edit-res-company-share"):null;Q&&(!Number.isFinite(qe)||qe<=0)&&(rt("edit-res-company-share"),qe=getCompanySharePercent("edit-res-company-share"));const W=Q&&ne&&Number.isFinite(qe)&&qe>0,ie=ve?!1:ne;ve&&(m=0,g="percent");const be=Os(ft,m,g,ie,$,{start:j,end:C,companySharePercent:W?qe:0});let Ee=Xa();if(Number.isFinite(I)&&I>0){const S=be;let Z=null,J=null;E==="amount"?(Z=I,S>0&&(J=I/S*100)):(J=I,S>0&&(Z=I/100*S));const ue=Do({type:E,value:I,amount:Z,percentage:J,recordedAt:new Date().toISOString()});ue&&(Ee=[...Ee,ue],mi(Ee)),V&&(V.value="")}const $e=Hs({totalAmount:be,history:Ee}),Pe=Vs({manualStatus:k,paidAmount:$e.paidAmount,paidPercent:$e.paidPercent,totalAmount:be});_&&!q&&(_.value=Pe,_.dataset&&delete _.dataset.userSelected);let Te=U.status??"pending";ve?Te=ee?.status??he??Te:K?Te="cancelled":["completed","cancelled"].includes(String(Te).toLowerCase())||(Te=v?"confirmed":"pending");const qt=rr({reservationCode:U.reservationCode??U.reservationId??null,customerId:U.customerId,start:j,end:C,status:Te,title:U.title??null,location:U.location??null,notes:y,projectId:P?String(P):null,totalAmount:be,discount:m,discountType:g,applyTax:ie,paidStatus:Pe,confirmed:oe,items:ft.map(S=>({...S,equipmentId:S.equipmentId??S.id})),crewAssignments:$,companySharePercent:W?qe:null,companyShareEnabled:W,paidAmount:$e.paidAmount,paidPercentage:$e.paidPercent,paymentProgressType:$e.paymentProgressType,paymentProgressValue:$e.paymentProgressValue,paymentHistory:Ee});try{Wi("about to submit",{editingIndex:hn,crewAssignments:$,techniciansPayload:qt?.technicians,payload:qt});const S=await Qc(U.id||U.reservationId,qt);Wi("server response",{reservation:S?.id??S?.reservationId??S?.reservation_code,technicians:S?.technicians,crewAssignments:S?.crewAssignments,techniciansDetails:S?.techniciansDetails}),await ur(),In(),tn(),Oe(),w(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),jo(),c?.({type:"updated",reservation:S}),r?.(),i?.(),Ns?.hide?.()}catch(S){console.error("❌ [reservationsEdit] Failed to update reservation",S);const Z=Na(S)?S.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");w(Z,"error")}}function zp(e={}){Ue={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=Ue,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=h(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{Ds("tax")}),c.dataset.listenerAttached="true");const d=document.getElementById("edit-res-company-share");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{Ds("share")}),d.dataset.listenerAttached="true");const l=document.getElementById("edit-res-payment-progress-type");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{l.dataset.userSelected="true",t?.()}),l.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const b=document.getElementById("edit-res-project");b&&!b.dataset.listenerAttached&&(b.addEventListener("change",()=>{Fo();const _=Array.isArray(Ue.projects)&&Ue.projects.length?Ue.projects:pe().projects||[],q=b.value&&_.find(I=>String(I.id)===String(b.value))||null,x={...Ue?.reservation??{},projectId:b.value||null,confirmed:pa()},{effectiveConfirmed:V,projectLinked:E}=Ot(x,q);Fn(V,{disable:E}),t?.()}),b.dataset.listenerAttached="true");const y=document.getElementById("edit-res-confirmed-btn");y&&!y.dataset.listenerAttached&&(y.addEventListener("click",()=>{if(y.disabled)return;const _=!pa();Fn(_),t?.()}),y.dataset.listenerAttached="true");const p=document.getElementById("edit-res-cancelled");p&&!p.dataset.listenerAttached&&(p.addEventListener("change",()=>{document.getElementById("edit-res-confirmed-btn")&&Fn(pa(),{disable:p.checked}),t?.()}),p.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{dp(Ue).catch(_=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",_)})}),m.dataset.listenerAttached="true");const g=document.getElementById("edit-res-equipment-barcode");if(g&&!g.dataset.listenerAttached){let _=null;const q=()=>{g.value?.trim()&&(clearTimeout(_),_=null,n?.(g))};g.addEventListener("keydown",x=>{x.key==="Enter"&&(x.preventDefault(),q())});const k=()=>{if(clearTimeout(_),!g.value?.trim())return;const{start:x,end:V}=getEditReservationDateRange();!x||!V||(_=setTimeout(()=>{q()},150))};g.addEventListener("input",k),g.addEventListener("change",q),g.dataset.listenerAttached="true"}To?.();const v=document.getElementById("editReservationModal");v&&!v.dataset.cleanupAttached&&(v.addEventListener("hidden.bs.modal",()=>{jo(),t?.(),s?.([])}),v.dataset.cleanupAttached="true")}const up=pe()||{};let it=(up.projects||[]).map(zo),Gn=!1;function pp(){return it}function Wn(e){it=Array.isArray(e)?e.map(fi):[],La({projects:it});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return it}async function Ro(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,d])=>{d==null||d===""||t.set(c,String(d))});const n=t.toString(),s=(await ot(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(Ja);return Wn(i),Gn=!0,it}async function Mo({force:e=!1,params:t=null}={}){if(!e&&Gn&&it.length>0)return it;try{return await Ro(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),it}}async function mp(e){const t=await ot("/projects/",{method:"POST",body:e}),n=Ja(t?.data??{}),a=[...it,n];return Wn(a),Gn=!0,n}async function fp(e,t){const n=await ot(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=Ja(n?.data??{}),s=it.map(r=>String(r.id)===String(e)?a:r);return Wn(s),Gn=!0,a}async function yp(e){await ot(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=it.filter(n=>String(n.id)!==String(e));Wn(t),Gn=!0}function bp({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:d,paymentStatus:l,equipmentEstimate:u=0,expenses:b=[],servicesClientPrice:y=0,taxAmount:p=0,totalWithTax:m=0,discount:g=0,discountType:v="percent",companyShareEnabled:_=!1,companySharePercent:q=null,companyShareAmount:k=0,paidAmount:x=null,paidPercentage:V=null,paymentProgressType:E=null,paymentProgressValue:I=null,confirmed:P=!1,technicians:N=[],equipment:K=[],payments:$,paymentHistory:B}={}){const Y=Array.isArray(N)?N.map(z=>Number.parseInt(String(z),10)).filter(z=>Number.isInteger(z)&&z>0):[],T=Array.isArray(K)?K.map(z=>{const M=Number.parseInt(String(z.equipmentId??z.equipment_id??z.id??0),10),ee=Number.parseInt(String(z.qty??z.quantity??0),10);return!Number.isInteger(M)||M<=0?null:{equipment_id:M,quantity:Number.isInteger(ee)&&ee>0?ee:1}}).filter(Boolean):[],j=Array.isArray(b)?b.map(z=>{const M=Number.parseFloat(z?.amount??z?.value??0)||0,ee=(z?.label??z?.name??"").trim();if(!ee)return null;const de=Number.parseFloat(z?.salePrice??z?.sale_price??0)||0;return{label:ee,amount:Math.round(M*100)/100,sale_price:Math.max(0,Math.round(de*100)/100)}}).filter(Boolean):[],C=j.reduce((z,M)=>z+(M?.amount??0),0),H={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!d,payment_status:l??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(C*100)/100,services_client_price:Number.isFinite(Number(y))?Math.round(Number(y)*100)/100:0,tax_amount:Math.round((Number.parseFloat(p)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(m)||0)*100)/100,confirmed:!!P,technicians:Y,equipment:T,expenses:j},U=Math.max(0,Number.parseFloat(g)||0);H.discount=U,H.discount_type=v==="amount"?"amount":"percent";const F=Number.parseFloat(q),G=!!_&&Number.isFinite(F)&&F>0;H.company_share_enabled=G,H.company_share_percent=G?F:0,H.company_share_amount=G?Math.max(0,Number.parseFloat(k)||0):0,Number.isFinite(Number(x))&&(H.paid_amount=Math.max(0,Number.parseFloat(x)||0)),Number.isFinite(Number(V))&&(H.paid_percentage=Math.max(0,Number.parseFloat(V)||0)),(E==="amount"||E==="percent")&&(H.payment_progress_type=E),I!=null&&I!==""&&(H.payment_progress_value=Number.parseFloat(I)||0),e&&(H.project_code=String(e).trim());const L=$!==void 0?$:B;if(L!==void 0){const z=Oo(L)||[];H.payments=z.map(M=>({type:M.type,amount:M.amount!=null?M.amount:null,percentage:M.percentage!=null?M.percentage:null,value:M.value!=null?M.value:null,note:M.note??null,recorded_at:M.recordedAt??null}))}return H.end_datetime||delete H.end_datetime,H.client_company||(H.client_company=null),H}function Ja(e={}){return fi(e)}function zo(e={}){return fi(e)}function fi(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(p=>{if(p==null)return null;if(typeof p=="object"){const m=p.id??p.technician_id??p.technicianId;return m!=null?String(m):null}return String(p)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(p=>{const m=p?.equipment_id??p?.equipmentId??p?.id??null,g=p?.quantity??p?.qty??0,v=p?.barcode??p?.code??"",_=p?.description??p?.name??"";return{equipmentId:m!=null?String(m):null,qty:Number.parseInt(String(g),10)||0,barcode:v,description:_}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((p,m)=>({id:p?.id??`expense-${t??"x"}-${m}`,label:p?.label??"",amount:Number.parseFloat(p?.amount??0)||0,salePrice:Number.parseFloat(p?.sale_price??p?.salePrice??0)||0})),d=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,l=e.company_share_enabled??e.companyShareEnabled,u=l!=null?l===!0||l===1||String(l).toLowerCase()==="true":d>0,b=e.payment_history??e.paymentHistory??e.payments??null,y=Oo(b);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,servicesClientPrice:Number.parseFloat(e.services_client_price??e.servicesClientPrice??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?d:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(p=>typeof p=="object"?p:{id:p}),equipment:r,expenses:c,paymentHistory:y}}function gp(e){return e instanceof Ji}function ms(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function hp(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=ms(e.value);let s=ms(e.amount),r=ms(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,d=e.recordedAt??e.recorded_at??e.date??null;let l=null;if(d){const b=new Date(d);Number.isNaN(b.getTime())||(l=b.toISOString())}l||(l=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:l}}function Oo(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>hp(t)).filter(Boolean):[]}const Op=Object.freeze(Object.defineProperty({__proto__:null,buildProjectPayload:bp,createProjectApi:mp,deleteProjectApi:yp,ensureProjectsLoaded:Mo,getProjectsState:pp,isApiError:gp,mapLegacyProject:zo,mapProjectFromApi:Ja,refreshProjectsFromApi:Ro,setProjectsState:Wn,updateProjectApi:fp},Symbol.toStringTag,{value:"Module"})),Ca="reservations-ui:ready",Jt=typeof EventTarget<"u"?new EventTarget:null;let Yt={};function vp(e){return Object.freeze({...e})}function qp(){if(!Jt)return;const e=Yt,t=typeof CustomEvent=="function"?new CustomEvent(Ca,{detail:e}):{type:Ca,detail:e};typeof Jt.dispatchEvent=="function"&&Jt.dispatchEvent(t)}function Sp(e={}){if(!e||typeof e!="object")return Yt;const t={...Yt};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),Yt=vp(t),qp(),Yt}function Ep(e){if(e)return Yt?.[e]}function Hp(e){const t=Ep(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const i=(s?.detail||Yt)?.[e];typeof i=="function"&&(Jt&&Jt.removeEventListener(Ca,a),n(i))};Jt&&Jt.addEventListener(Ca,a)})}function Vp(){return Mo().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=pe()||{};Jc(e||[]),Vr()})}function yi(e=null){Vr(),Ho(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function wp(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Fs(){return{populateEquipmentDescriptionLists:zt,setFlatpickrValue:Yu,splitDateTime:tr,renderEditItems:Ht,updateEditReservationSummary:tt,addEquipmentByDescription:Ju,addEquipmentToEditingReservation:Xu,addEquipmentToEditingByDescription:Pa,combineDateTime:Mn,hasEquipmentConflict:gt,hasTechnicianConflict:ir,renderReservations:Ho,handleReservationsMutation:yi,ensureModal:wp}}function Ho(e="reservations-list",t=null){Nu({containerId:e,filters:t,onShowDetails:Vo,onConfirmReservation:Ko})}function Vo(e){return Bu(e,{getEditContext:Fs,onEdit:(t,{reservation:n})=>{Qo(t,n)},onDelete:Uo})}function Uo(e){return on()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?Fu(e,{onAfterChange:yi}):!1:(Vn(),!1)}function Ko(e){return Ru(e,{onAfterChange:yi})}function Qo(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}Xi(e,Fs());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}Xi(e,Fs());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}Tc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Up(){Sp({showReservationDetails:Vo,deleteReservation:Uo,confirmReservation:Ko,openReservationEditor:Qo})}export{_p as $,Ro as A,Up as B,Mo as C,yp as D,mp as E,$p as F,zp as G,Vp as H,Mp as I,kp as J,yi as K,Vr as L,Tp as M,tt as N,Lp as O,jp as P,Fs as Q,ye as R,Uo as S,Ko as T,Qo as U,Yu as V,xn as W,il as X,ba as Y,Ip as Z,wl as _,Oe as a,Op as a0,Bi as b,Gr as c,Wr as d,Rp as e,Ho as f,Ur as g,Ep as h,bp as i,Sp as j,Vo as k,Np as l,Ja as m,Bp as n,pp as o,gp as p,md as q,Kn as r,Xr as s,Kr as t,fp as u,Dp as v,Hp as w,Fp as x,Pp as y,Cp as z};
