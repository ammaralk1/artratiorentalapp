import{n as h,l as he,A as Cc,t as o,a as ot,s as E,u as sn,c as Vn,d as La,b as Xi,z as Lc,f as Ze,B as Ji,o as Tc}from"./auth.UkHr5P9y.js";import{A as ne,B as gt,C as Yi,E as Nc,D as Dt,F as Fs,n as We,G as Zi,H as Ei,I as Mn,J as zn,K as Ta,L as jc,M as Rs,N as ht,O as Ms,P as En,Q as er,R as tr,S as Bc,T as Dc,U as Fc,V as nr,W as rn,X as ma,Y as Rc,Z as Na,_ as ar,$ as sr,a as zs,o as Os,q as Hs,a0 as ir,a1 as Mc,s as gn,b as ja,a2 as zc,a3 as rr,a4 as Oc,i as Vs,r as zt,a5 as or,a6 as Tt,a7 as fa,m as Se,p as je,y as Ba,l as cr,a8 as Hc,a9 as ms,h as lr,g as Yt,aa as Vc,ab as Uc,k as dr,ac as fs,ad as Kc,u as Qc,ae as Gc,af as Wc,ag as Xc,ah as Jc}from"./reservationsService.CI0IIH9E.js";const as="select.form-select:not([data-no-enhance]):not([multiple])",vt=new WeakMap;let ss=null,wi=!1,wt=null;function Ip(e=document){e&&(e.querySelectorAll(as).forEach(t=>oa(t)),!ss&&e===document&&(ss=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(as)&&oa(a),a.querySelectorAll?.(as).forEach(s=>oa(s)))})}),ss.observe(document.body,{childList:!0,subtree:!0})),wi||(wi=!0,document.addEventListener("pointerdown",el,{capture:!0})))}function ra(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){oa(e);return}const t=e.closest(".enhanced-select");t&&(Us(t),ya(t),ys(t))}function oa(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){ra(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};vt.set(t,r),a.addEventListener("click",()=>Zc(t)),a.addEventListener("keydown",i=>tl(i,t)),s.addEventListener("click",i=>al(i,t)),s.addEventListener("keydown",i=>nl(i,t)),e.addEventListener("change",()=>{ya(t),ur(t)}),r.observer=new MutationObserver(i=>{let c=!1,d=!1;for(const l of i)l.type==="attributes"&&l.attributeName==="disabled"&&(d=!0),l.type==="childList"&&(c=!0);d&&ys(t),c&&Yc(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),Us(t),ya(t),ys(t)}function Yc(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,Us(t),ya(t)})))}function Us(e){const t=vt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),ur(e)}function ya(e){const t=vt.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function ur(e){const t=vt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function ys(e){const t=vt.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function Zc(e){vt.get(e)&&(e.getAttribute("data-open")==="true"?wn(e):pr(e))}function pr(e){const t=vt.get(e);if(!t)return;wt&&wt!==e&&wn(wt,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),wt=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function wn(e,{focusTrigger:t=!0}={}){const n=vt.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),wt===e&&(wt=null))}function el(e){if(!wt)return;const t=e.target;t instanceof Node&&(wt.contains(t)||wn(wt,{focusTrigger:!1}))}function tl(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),pr(t)):n==="Escape"&&wn(t)}function nl(e,t){const n=e.key,a=vt.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&mr(i,t)}else n==="Escape"&&(e.preventDefault(),wn(t))}function al(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&mr(n,t)}function mr(e,t){const n=vt.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),wn(t)}const An=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let At=null;function Ks(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function fr(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function sl(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function il(e={}){const t=sl({...e,activatedAt:Date.now()});return At=t,fr(!0,t.mode||"create"),Ks(An.change,{active:!0,selection:{...t}}),t}function ba(e="manual"){if(!At)return;const t=At;At=null,fr(!1),Ks(An.change,{active:!1,previous:t,reason:e})}function yr(){return!!At}function rl(){return At?{...At}:null}function ol(e){if(!At)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=h(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:r,description:i}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const d=c.map(u=>h(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!d.length)return!1;const l=Number.isInteger(s)&&s>0?s:d.length;t={barcodes:d,quantity:Math.min(l,d.length)},r&&(t.groupKey=r),i&&(t.description=i)}else return!1;return Ks(An.requestAdd,{...t,selection:{...At}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||ba("tab-changed")});const cl=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),ll=new Set(["maintenance","reserved","retired"]);function dl(e){const t=String(e??"").trim().toLowerCase();return t&&cl.get(t)||"available"}function ul(e){return e?typeof e=="object"?e:Da(e):null}function _t(e){const t=ul(e);return t?dl(t.status||t.state||t.statusLabel||t.status_label):"available"}function br(e){return!ll.has(_t(e))}function on(e={}){return e.image||e.imageUrl||e.img||""}function pl(e){if(!e)return null;const t=ne(e),{equipment:n=[]}=he();return(n||[]).find(a=>ne(a?.barcode)===t)||null}function Da(e){const t=ne(e);if(!t)return null;const{equipment:n=[]}=he();return(n||[]).find(a=>ne(a?.barcode)===t)||null}const ml=he()||{};let Nt=(ml.equipment||[]).map(bl),bs=!1,mn="",Wt=null,en=null,tn=null,Fa=!1,Ai=!1;function fl(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function yl(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function bl(e={}){return Qs({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function Ra(e={}){return Qs(e)}function Qs(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=Un(e.quantity??e.qty??0),i=Ma(e.unit_price??e.price??0),c=h(String(e.barcode??"").trim()),d=ze(e.status??e.state??e.status_label??e.statusLabel??"available"),l=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:gl(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:d,image:l,imageUrl:l,created_at:e.created_at??null,updated_at:e.updated_at??null}}function gl(e){return e!=null&&e!==""}function Un(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function Ma(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function hl(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function xi(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function vl(e,t){const n=xi(e),a=xi(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}else{if(r!==i)return r?-1:1;{const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}}const c=ha(e?.desc||e?.description||e?.name||""),d=ha(t?.desc||t?.description||t?.name||"");return c.localeCompare(d,"ar",{sensitivity:"base"})}function Be(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ze(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function ql(e){return ze(e)}function ga(){if(!yr())return null;const e=rl();return e?{...e}:null}function Sl(e){const t=ga();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:r=null}=t,i=t?.mode||t?.source||"",c=[],d=new Set;if(n.forEach(y=>{const p=ne(y?.barcode);!p||d.has(p)||(d.add(p),c.push({variant:y,barcode:p}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(i==="package-manager"||i==="equipment-packages"){const y=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:p})=>p),maxQuantity:y,reason:""}}const l=c.filter(({variant:y})=>{const p=ze(y?.status);return p!=="maintenance"&&p!=="retired"});if(!a||!s)return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=l.filter(({barcode:y})=>!gt(y,a,s,r));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:y})=>y),maxQuantity:u.length};let b=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(l.length>0)b=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const y=new Set(c.map(({variant:p})=>ze(p?.status)));y.has("maintenance")?b=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):y.has("reserved")?b=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):y.has("retired")&&(b=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:b,availableBarcodes:[],maxQuantity:0}}function El(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function gr(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=ga();e.hidden=!s;const r=s?.mode||s?.source||"";s?r==="package-manager"||r==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=ga(),d=c?.mode||c?.source||"";d==="package-manager"||d==="equipment-packages"?ba("package-finish-button"):(ba("return-button"),El())}),t.dataset.listenerAttached="true")}function et(){return Nt}function nn(e){Nt=Array.isArray(e)?e.map(Qs):[],La({equipment:Nt}),yl()}function ha(e){return String(e??"").trim().toLowerCase()}function Ft(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=ha(t);return n||(n=ha(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function za(e){const t=Ft(e);return t?et().filter(n=>Ft(n)===t):[]}function Oa(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=Ha(e);if(n){const a=Be(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${Be(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function Gs(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function va(){const e=Gs();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function Ws(e={}){const t=Gs();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function hn(e){Fa=e;const t=Gs(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function wl(e){if(!sn()){Vn();return}if(!e)return;try{await xl()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let d=0;if(i.forEach(l=>{const u=l.القسم??l.category??"",b=l["القسم الثانوي"]??l.subcategory??"",y=l.الوصف??l.description??l.name??"",p=l.الكمية??l.quantity??0,m=l.السعر??l.price??0,g=l.الباركود??l.barcode??"",v=l.الحالة??l.status??"متاح",I=l.الصورة??l.image_url??l.image??"",q=h(String(g||"")).trim();if(!y||!q){d+=1;return}c.push(Xs({category:u,subcategory:b,description:y,quantity:p,unit_price:m,barcode:q,status:v,image_url:I}))}),!c.length){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const l=await ot("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(l?.data)?l.data.map(Ra):[];if(u.length){const p=[...et(),...u];nn(p)}await Kn({showToastOnError:!1}),Oe();const b=l?.meta?.count??u.length,y=[];b&&y.push(`${b} ✔️`),d&&y.push(`${d} ⚠️`),E(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(y.length?` (${y.join(" / ")})`:""))}catch(l){const u=In(l,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");E(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const Al="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let Pn=null;function xl(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):Pn||(Pn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=Al,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),Pn=null,e}),Pn)}function Xs({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const d=h(String(r||"")).trim(),l=ql(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:Un(a),unit_price:Ma(s),barcode:d,status:l,image_url:c?.trim()||null}}async function hr(){if(!sn()){Vn();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await ot("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await Kn({showToastOnError:!1}),E(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=In(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");E(t,"error")}}function Ha(e){return e.image||e.imageUrl||e.img||""}function Il(e){const t=ze(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function qa(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${Be(a)}</td></tr>`}n&&(n.textContent="0")}function vr(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=Wt?.groupKey||Ft(e);if(!r){qa();return}const i=et().filter(b=>Ft(b)===r).sort((b,y)=>{const p=String(b.barcode||"").trim(),m=String(y.barcode||"").trim();return!p&&!m?0:p?m?p.localeCompare(m,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){qa();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),d=o("equipment.form.labels.quantity","الكمية"),l=et(),u=i.map(b=>{const y=b.id&&e.id?String(b.id)===String(e.id):String(b.barcode||"")===String(e.barcode||""),p=y?"equipment-variants-table__row--current":"",m=Be(String(b.barcode||"-")),g=y?`<span class="equipment-variants-current-badge">${Be(c)}</span>`:"",v=h(String(Number.isFinite(Number(b.qty))?Number(b.qty):0)),I=l.indexOf(b),q=Be(o("equipment.item.actions.delete","🗑️ حذف")),C=I>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${I}">${q}</button>
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
          <td class="table-actions-cell">${C}</td>
        </tr>
      `}).join("");n.innerHTML=u}function _l({item:e,index:t}){const n=Ha(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=sn(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},d=Number.isFinite(Number(e.qty))?Number(e.qty):0,l=Number.isFinite(Number(e.price))?Number(e.price):0,u=d.toLocaleString("en-US"),b=l.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),y=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,p=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,m=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(d-y-p,0),g=m.toLocaleString("en-US"),v=o("equipment.card.labels.availableOfTotal","من أصل"),I=ze(e.status);let q=`${Be(c.available)}: ${Be(g)} ${Be(v)} ${Be(u)}`,C="available";if(m===0){const z={reserved:{text:d===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},Q=z[I]||z.default;q=Be(Q.text),C=Q.modifier}const x=`<span class="equipment-card__availability equipment-card__availability--${C}">${q}</span>`,H="",S=e.desc||e.name||"—",_=e.name&&e.name!==e.desc?e.name:"",B=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${b} ${r}`}].map(({label:z,value:Q})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${z}</span>
              <span class="equipment-card__detail-value">${Q}</span>
            </span>
          `).join("")}
    </div>`,V=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),P=V.length?`<div class="equipment-card__categories">${V.map(({label:z,value:Q})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${z}</span>
              <span class="equipment-card__detail-value">${Q}</span>
            </div>
          `).join("")}</div>`:"",D=_?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${_}</span>
      </div>`:"",T=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${S}</h3>
    </div>
  `}
      ${B}
    </div>
  `,N=[],k=Sl(e),X=k?.availableBarcodes?.length?k.availableBarcodes.join(","):k?.barcode?k.barcode:"";let O="",F="";if(k.active){const z=`equipment-select-qty-${t}`,Q=!!k.canSelect,ae=Q?Math.max(1,Number(k.maxQuantity||k.availableBarcodes?.length||1)):1,ue=Math.max(1,Math.min(ae,99)),se=[];for(let Te=1;Te<=ue;Te+=1){const de=h(String(Te));se.push(`<option value="${Te}"${Te===1?" selected":""}>${de}</option>`)}const U=Q?"":" disabled",pe=o("reservations.create.equipment.selector.quantityLabel","الكمية"),we=Q?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${h(String(ae))}`:k.reason?k.reason:"";O=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${z}">${pe}</label>
        <select class="equipment-card__quantity-select" id="${z}" data-equipment-select-quantity${U}>
          ${se.join("")}
        </select>
        ${we?`<span class="equipment-card__selection-hint">${Be(we)}</span>`:""}
      </div>
    `;const ve=ga(),qe=ve?.mode||ve?.source||"",ie=qe==="package-manager"||qe==="equipment-packages"?o("equipment.packages.selection.addToPackage","➕ أضف إلى الحزمة"):o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),be=Q?"":" disabled",Ee=k.reason?` title="${Be(k.reason)}"`:"",_e=['data-equipment-action="select-reservation"',`data-selection-max="${Q?ae:0}"`];X&&_e.push(`data-selection-barcodes="${Be(X)}"`),e.groupKey&&_e.push(`data-selection-group="${Be(String(e.groupKey))}"`),F=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${_e.join(" ")}${be}${Ee}>${ie}</button>
    `}i&&N.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const K=N.length?N.join(`
`):"",$=Be(S);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${Be(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${$}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${H}
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
        ${P}
        ${D}
      </div>
      ${O||F||K?`<div class="equipment-card__actions equipment-card__actions--center">
            ${O}
            ${F}
            ${K}
          </div>`:""}
    </article>
  `}function kl(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,a.appendChild(d)}),t.includes(i)&&(a.value=i),ra(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,s.appendChild(d)}),n.includes(i)&&(s.value=i),ra(s)}const r=document.getElementById("filter-status");r&&ra(r)}function xn(){const e=he();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return Nt=t||[],Nt;const s=new Date;let r=!1;const i=new Set((a||[]).filter(d=>d?.status==="open").map(d=>h(String(d?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(d=>{if(!d)return d;const l=ze(d.status),u=h(String(d.barcode??"")).trim().toLowerCase(),b=u&&i.has(u);let y=b?"maintenance":"available";if(!b&&u)for(const p of n||[]){if(!$l(p,s))continue;if(p.items?.some(g=>h(String(g?.barcode??"")).trim().toLowerCase()===u)){y="reserved";break}}return y!==l?(r=!0,{...d,status:y}):{...d,status:y}});return r?nn(c):(Nt=c,La({equipment:Nt})),Nt}function $l(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function is(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Oe(){const e=document.getElementById("equipment-list");if(!e)return;gr();const t=xn(),n=Array.isArray(t)?t:et(),a=new Map;n.forEach(g=>{if(!g)return;const v=Ft(g);v&&(a.has(v)||a.set(v,[]),a.get(v).push(g))});const s=Array.from(a.values()).map(g=>{const v=g[0],I=g.reduce((_,L)=>_+(Number.isFinite(Number(L.qty))?Number(L.qty):0),0),q=["maintenance","reserved","available","retired"],C=g.map(_=>ze(_.status)).sort((_,L)=>q.indexOf(_)-q.indexOf(L))[0]||"available",x=g.reduce((_,L)=>{const B=Un(L?.qty??0)||0,V=ze(L?.status);return V==="reserved"?_.reserved+=B:V==="maintenance"&&(_.maintenance+=B),_},{reserved:0,maintenance:0}),H=Math.max(I-x.reserved-x.maintenance,0);return{item:{...v,qty:I,status:C,variants:g,groupKey:Ft(v),reservedQty:x.reserved,maintenanceQty:x.maintenance,availableQty:H},index:n.indexOf(v)}});s.sort((g,v)=>vl(g.item,v.item));const r=document.getElementById("search-equipment")?.value||"",i=h(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",d=document.getElementById("filter-sub")?.value||"",l=document.getElementById("filter-status")?.value||"",u=l?ze(l):"";if(bs&&!n.length){e.innerHTML=is(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(mn&&!n.length){e.innerHTML=is(mn,{tone:"error",icon:"⚠️"});return}const b=s.filter(({item:g})=>{const v=h(String(g.barcode??"")).toLowerCase().trim(),I=Array.isArray(g.variants)?g.variants.map(S=>h(String(S.barcode??"")).toLowerCase().trim()).filter(Boolean):[],q=!i||g.name&&g.name.toLowerCase().includes(i)||g.desc&&g.desc.toLowerCase().includes(i)||v&&v.includes(i)||I.some(S=>S.includes(i))||g.category&&g.category.toLowerCase().includes(i)||g.sub&&g.sub.toLowerCase().includes(i),C=!c||g.category===c,x=!d||g.sub===d,H=!u||ze(g.status)===u;return q&&C&&x&&H}),y=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),p=b;e.innerHTML=p.length?p.map(_l).join(""):is(y);const m=document.getElementById("equipment-list-count");if(m){const g=o("equipment.list.countSuffix","عنصر"),v=h(String(p.length)),I=p.length?`${v} ${g}`:`0 ${g}`;m.textContent=I}kl(n)}async function Kn({showToastOnError:e=!0}={}){bs=!0,mn="",Oe();try{const t=await ot("/equipment/?all=1"),n=t?.data??t;let a=[];Array.isArray(n)?a=n:n&&typeof n=="object"&&(Array.isArray(n.items)?a=n.items:Array.isArray(n.results)?a=n.results:Array.isArray(n.data)?a=n.data:Array.isArray(n.records)&&(a=n.records));const s=a.map(Ra);nn(s)}catch(t){t&&typeof t=="object"&&Number(t.status)===401?mn="":(mn=In(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&E(mn,"error"))}finally{bs=!1,Oe()}}function In(e,t,n){if(e instanceof Xi){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function Pl(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),r=Ma(t.querySelector("#new-equipment-price")?.value||"0"),i=Un(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",d=t.querySelector("#new-equipment-category")?.value?.trim()||"",l=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){E(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const b=Xs({category:d,subcategory:l,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const y=await ot("/equipment/",{method:"POST",body:b}),p=Ra(y?.data),m=[...et(),p];nn(m),Oe(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),E(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(y){const p=In(y,"equipment.toast.addFailed","تعذر إضافة المعدة");E(p,"error")}}async function qr(e){if(!sn()){Vn();return}const t=et(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await ot(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),nn(a),Oe(),E(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=In(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");E(s,"error")}}async function Cl(e,t){const n=et(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},nn(r),Oe();return}const s=Xs({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await ot(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=Ra(r?.data),c=[...n];c[e]=i,nn(c),Oe(),E(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=In(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw E(i,"error"),r}}function aa(){Oe()}function Sr(e){const n=et()[e];if(!n)return;en=e;const a=za(n),s=a[0]||n,r=a.reduce((d,l)=>d+(Number.isFinite(Number(l.qty))?Number(l.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(d=>ze(d.status)).sort((d,l)=>i.indexOf(d)-i.indexOf(l))[0]||ze(s.status);document.getElementById("edit-equipment-index").value=e,Ws({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:Ha(s)||"",barcode:s.barcode||"",status:s.status||c}),hn(!1),tn=va(),Oa(s),vr(s),Wt={groupKey:Ft(s),barcode:String(s.barcode||""),id:s.id||null},fl(document.getElementById("editEquipmentModal"))?.show()}function Ll(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),r=s?.querySelector("[data-equipment-select-quantity]");let i=Number.parseInt(r?.value||"1",10);(!Number.isFinite(i)||i<=0)&&(i=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&i>c&&(i=c);const l=(t.dataset.selectionBarcodes||"").split(",").map(p=>p.trim()).filter(p=>p.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",b=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";ol({barcodes:l,quantity:i,groupKey:b,description:u})||E(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||qr(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||Sr(s)}}function Tl(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||Sr(n)}}function Nl(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||qr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function Er(){if(!Wt||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=et(),a=Wt.id?n.find(d=>String(d.id)===String(Wt.id)):null,s=Wt.groupKey,r=s?n.find(d=>Ft(d)===s):null,i=a||r;if(!i){qa();return}const c=n.findIndex(d=>d===i);if(c>=0){const d=document.getElementById("edit-equipment-index");d&&(d.value=String(c)),en=c}if(vr(i),!Fa){const d=za(i),l=d[0]||i,u=d.reduce((p,m)=>p+(Number.isFinite(Number(m.qty))?Number(m.qty):0),0),b=["maintenance","reserved","available","retired"],y=d.map(p=>ze(p.status)).sort((p,m)=>b.indexOf(p)-b.indexOf(m))[0]||ze(l.status);Ws({category:l.category||"",subcategory:l.sub||"",description:l.desc||l.description||"",quantity:String(u||l.qty||0),price:l.price!=null?String(l.price):"0",image:Ha(l)||"",barcode:l.barcode||"",status:l.status||y}),tn=va()}Oa(primary)}function jl(){document.getElementById("search-equipment")?.addEventListener("input",aa),document.getElementById("filter-category")?.addEventListener("change",aa),document.getElementById("filter-sub")?.addEventListener("change",aa),document.getElementById("filter-status")?.addEventListener("change",aa),document.getElementById("add-equipment-form")?.addEventListener("submit",Pl);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),hr().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",Ll),t.addEventListener("keydown",Tl),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",Nl),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);hl(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!Fa){tn=va(),hn(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){E(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:Un(document.getElementById("edit-equipment-quantity").value)||1,price:Ma(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await Cl(t,n),tn=va(),hn(!1),Er()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{jl(),Oe(),Kn();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(tn&&Ws(tn),en!=null){const a=et()[en];if(a){const r=za(a)[0]||a;Oa(r)}}hn(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Oe(),hn(Fa),en!=null){const t=et()[en];if(t){const a=za(t)[0]||t;Oa(a)}}});document.addEventListener("equipment:refreshRequested",()=>{Kn({showToastOnError:!1})});document.addEventListener(Cc.USER_UPDATED,()=>{Oe()});document.addEventListener("equipment:changed",()=>{Er()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{Wt=null,qa(),en=null,tn=null,hn(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!Ai&&(document.addEventListener(An.change,()=>{gr(),Oe()}),Ai=!0);const _p=Object.freeze(Object.defineProperty({__proto__:null,clearEquipment:hr,refreshEquipmentFromApi:Kn,renderEquipment:Oe,syncEquipmentStatuses:xn,uploadEquipmentFromExcel:wl},Symbol.toStringTag,{value:"Module"})),Bl="__DEBUG_CREW__";function Dl(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(Bl);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function Ii(e,t){if(Dl())try{console.log(`🪵 [crew-debug:create] ${e}`,t)}catch{}}const wr="projects:create:draft",Ar="projects.html#projects-section";let gs=null,xr=[],hs=new Map,vs=new Map,Sa=new Map,rs=!1,ca=null,_i=!1,Ir=[];function Fl(e){if(!e)return null;let t=Ir.find(a=>a.id===e)||null;if(t)return t;const n=tr(e);return n?(t={id:e,name:Dc(n)||e,price:Bc(n),items:Rs(n),raw:n},t):null}function Ea(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function wa(e){return h(String(e||"")).trim().toLowerCase()}function Rl(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function _r(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function kr(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function $r(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Pr(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function an(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function Js(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function cn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Je(){const{input:e,hidden:t}=cn();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function Qt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function Cr(e,t,{allowPartial:n=!1}={}){const a=We(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function qs(e,t={}){return Cr(hs,e,t)}function Ss(e,t={}){return Cr(vs,e,t)}function Ye(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function Lr(e){xr=Array.isArray(e)?[...e]:[]}function Ys(){return xr}function Zs(e){return e&&Ys().find(t=>String(t.id)===String(e))||null}function ki(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function vn(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??Dt,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:Dt}function rt(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??Dt,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=Dt),t.dataset.companyShare=String(s),t.checked=!0}function Es(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(rs){ye();return}rs=!0;const a=()=>{rs=!1,ye()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(Dt)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),rt()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?rt():n.checked&&(n.checked=!1));a()}function Ml(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function $i(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function Pi(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function xt({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=Js();if(!n||!a||!s)return;const r=Fs()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const d=new Set;hs=new Map;const l=r.filter(p=>p&&p.id!=null).map(p=>({id:String(p.id),label:Pi(p)||c})).filter(p=>{if(!p.label)return!1;const m=We(p.label);return!m||d.has(m)?!1:(d.add(m),hs.set(m,p),!0)}).sort((p,m)=>p.label.localeCompare(m.label,void 0,{sensitivity:"base"}));s.innerHTML=l.map(p=>`<option value="${Ea(p.label)}"></option>`).join("");const u=t?"":n.value,b=e?String(e):a.value?String(a.value):"",y=b?r.find(p=>String(p.id)===b):null;if(y){const p=Pi(y)||c;a.value=String(y.id),n.value=p,n.dataset.selectedId=String(y.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function qn({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=cn();if(!a||!s||!r)return;const i=Array.isArray(t)?t:Ys()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const d=[...i].filter(g=>g&&g.id!=null).sort((g,v)=>String(v.createdAt||v.start||"").localeCompare(String(g.createdAt||g.start||""))),l=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),b=new Set;vs=new Map;const y=d.map(g=>{const v=ki(g)||u;return{id:String(g.id),label:v}}).filter(g=>{if(!g.label)return!1;const v=We(g.label);return!v||b.has(v)?!1:(b.add(v),vs.set(v,g),!0)});r.innerHTML=y.map(g=>`<option value="${Ea(g.label)}"></option>`).join("");const p=e?String(e):s.value?String(s.value):"",m=p?d.find(g=>String(g.id)===p):null;if(m){const g=ki(m)||u;s.value=String(m.id),a.value=g,a.dataset.selectedId=String(m.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":l}function Aa(e,t,n){const{date:a,time:s}=er(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function Tr(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||qn({selectedValue:a});const r=(Fs()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";xt(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=$i(e,"start"),d=$i(e,"end");c&&Aa("res-start","res-start-time",c),d&&Aa("res-end","res-end-time",d);const l=document.getElementById("res-notes");l&&e.description&&(t||!l.value)&&(l.value=e.description),ye(),Rt()}function Nr({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:he(),s=Array.isArray(a)?a:[];Lr(s);const r=t!=null?String(t):n.value?String(n.value):"";qn({selectedValue:r,projectsList:s}),Rt(),ye()}function Rt(){const{input:e,hidden:t}=cn(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),d=document.getElementById("res-discount-type"),l=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),b=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(Qt(n,Je),a&&Qt(a,Je)),s&&Qt(s,Je),r&&Qt(r,Je),i&&Qt(i,Je),c&&Qt(c,Je),d&&Qt(d,Je),b)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=l),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=l),s&&(s.value="unpaid",Ye(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=l),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=l),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=l),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=l),d&&(d.value="percent",d.disabled=!0,d.classList.add("reservation-input-disabled"),d.title=l);else{if(n){const y=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",y&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.disabled=!1,d.classList.remove("reservation-input-disabled"),d.title="")}Es("tax"),ye()}function ei(){const{input:e,hidden:t}=cn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Ss(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=Zs(r.id);i?Tr(i,{skipProjectSelectUpdate:!0}):(Rt(),ye())}else t.value="",e.dataset.selectedId="",Rt(),ye()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Ss(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function ti(){const{input:e,hidden:t}=Js();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?qs(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),ye()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?qs(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function zl(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){jn({clearValue:!0});return}let n=null;try{const l=decodeURIComponent(t);n=JSON.parse(l)}catch(l){console.warn("⚠️ [reservations/createForm] Failed to decode project context",l)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),jn({clearValue:!1}),!n)return;n.fromProjectForm&&(ca={draftStorageKey:n.draftStorageKey||wr,returnUrl:n.returnUrl||Ar});const r=document.getElementById("res-project");if(n.projectId){r&&(qn({selectedValue:String(n.projectId)}),Rt());const l=Zs(n.projectId);l?Tr(l,{forceNotes:!!n.forceNotes}):ye(),jn()}else{r&&qn({selectedValue:""});const l=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");nd(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),l)}n.start&&Aa("res-start","res-start-time",n.start),n.end&&Aa("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(Fs()||[]).find(b=>String(b.id)===String(n.customerId));u?.id!=null&&(xt({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(xt({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):xt({selectedValue:""});const d=document.getElementById("res-notes");d&&n.description&&!d.value&&(d.value=n.description),ye()}function ln(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Mn(e,n),end:Mn(t,a)}}function jr(e){const t=wa(e);if(t){const c=Sa.get(t);if(c)return c}const{description:n,barcode:a}=_r(e);if(a){const c=Da(a);if(c)return c}const s=We(n||e);if(!s)return null;let r=nr();if(!r?.length){const c=he();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&rr(r)}const i=r.find(c=>We(c?.desc||c?.description||"")===s);return i||r.find(c=>We(c?.desc||c?.description||"").includes(s))||null}function Br(e,t="equipment-description-options"){const n=wa(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(d=>wa(d.value)===n)||Sa.has(n))return!0;const{description:s}=_r(e);if(!s)return!1;const r=We(s);return r?(nr()||[]).some(c=>We(c?.desc||c?.description||"")===r):!1}const Ol={available:0,reserved:1,maintenance:2,retired:3};function Hl(e){return Ol[e]??5}function Ci(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function Vl(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${Ci(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${Ci(n)})`}function Mt(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=xn(),a=he(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];rr(r);const i=new Map;r.forEach(l=>{const u=Rl(l),b=wa(u);if(!b||!u)return;const y=_t(l),p=Hl(y),m=i.get(b);if(!m){i.set(b,{normalized:b,value:u,bestItem:l,bestStatus:y,bestPriority:p,statuses:new Set([y])});return}m.statuses.add(y),p<m.bestPriority&&(m.bestItem=l,m.bestStatus=y,m.bestPriority=p,m.value=u)}),Sa=new Map;const d=Array.from(i.values()).sort((l,u)=>l.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(l=>{Sa.set(l.normalized,l.bestItem);const u=Vl(l),b=Ea(l.value);if(u===l.value)return`<option value="${b}"></option>`;const y=Ea(u);return`<option value="${b}" label="${y}"></option>`}).join("");e&&(e.innerHTML=d),t&&(t.innerHTML=d)}function Dr(e,t,n={}){const{silent:a=!1}=n,s=ne(e);if(!s)return{success:!1,message:null};const{start:r,end:i}=ln();if(!r||!i){const m=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||E(m),{success:!1,message:m}}const c=ht();if(ni(c).has(s)){const m=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||E(m),{success:!1,message:m}}const l=Ms(s,r,i);if(l.length){const m=l.map(v=>v.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`);return a||E(g),{success:!1,message:g}}if(gt(s,r,i)){const m=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||E(m),{success:!1,message:m}}const u=Da(s);if(!u){const m=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||E(m),{success:!1,message:m}}const b=_t(u);if(b==="maintenance"||b==="retired"){const m=an(b);return a||E(m),{success:!1,message:m}}const y=rn(u);if(!y){const m=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||E(m),{success:!1,message:m}}Ta({id:y,equipmentId:y,barcode:s,desc:u.desc,qty:1,price:u.price,image:on(u)}),t&&(t.value=""),kt(),ye();const p=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||E(p),{success:!0,message:p,barcode:s}}function ws(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=jr(t);if(!n){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=pl(n.barcode),s=_t(a||n);if(s==="maintenance"||s==="retired"){E(an(s));return}const r=ne(n.barcode);if(!r){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=rn(n);if(!i){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:on(n)},{start:d,end:l}=ln();if(!d||!l){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=ht();if(ni(u).has(r)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const y=Ms(r,d,l);if(y.length){const p=y.map(m=>m.name).join(", ");E(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${p}`));return}if(gt(r,d,l)){E(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}Ta(c),kt(),ye(),E(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function Ul(){Mt();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),ws(e))});const t=()=>{Br(e.value,"equipment-description-options")&&ws(e)};e.addEventListener("focus",()=>{if(Mt(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Li(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function ni(e=ht()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=ne(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const r=ne(s?.normalizedBarcode??s?.barcode);r&&t.add(r)})}),t}function Kl(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=ln();if(!t||!n){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}il({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):E(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(An.change,t=>{Li(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),Li(e,yr()))}function Ql(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,r=a.length?a:t.barcode?[t.barcode]:[];if(!r.length)return;let i=0,c=null;const d=[],l=new Set;r.forEach(b=>{const y=ne(b);y&&!l.has(y)&&(l.add(y),d.push(y))});const u=Math.min(s,d.length);for(let b=0;b<u;b+=1){const y=d[b],p=Dr(y,null,{silent:!0});p.success&&(i+=1),p.message&&(c=p.message)}if(i>0){const y=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",h(String(i)));E(y)}else c&&E(c)}function Fr(){Kl(),!(_i||typeof document>"u")&&(document.addEventListener(An.requestAdd,Ql),_i=!0)}function Qn(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),r=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:r}}function As(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=Qn();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const r=document.getElementById("equipment-barcode"),i=document.getElementById("equipment-description"),c=t==="package";r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),Oc(t),t==="package"&&Va()}function Va(){const{packageSelect:e,packageHint:t}=Qn();if(!e)return;const n=Yi();Ir=n,Nc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,r=n.map(c=>{const d=Number.isFinite(Number(c.price))?Number(c.price):0,l=h(d.toFixed(2)),u=`${c.name} — ${l} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${r}`,e.selectedIndex=0;const i=n.length>0;e.disabled=!i,t&&(i?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),zr()}function Gl(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:r,blockingPackages:i})=>{const c=r?.desc||h(String(r?.barcode??r?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(i)&&i.length){const d=i.map(l=>l.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${d})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function Rr(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const r=zn(e);if(!r)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const i=Fl(r);if(!i)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(p=>p?.type==="package"&&zn(p.packageId)===r))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(jc(r,n,a,s)){const p=i.name||r;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${p} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(i.items)&&i.items.length?i.items:Rs(i.raw??{}),d=ni(t),l=[],u=new Set;if(c.forEach(p=>{const m=ne(p?.normalizedBarcode??p?.barcode);if(m){if(u.has(m)){l.push({item:p,type:"internal"});return}u.add(m),d.has(m)&&l.push({item:p,type:"external"})}}),l.length){const p=l.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>h(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:l.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",p):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",p),duplicates:l}}const b=[];return c.forEach(p=>{const m=ne(p?.normalizedBarcode??p?.barcode);if(m&&gt(m,n,a,s)){const g=Ms(m,n,a,s);b.push({item:p,blockingPackages:g})}}),b.length?{success:!1,reason:"item_conflict",message:Gl(i,b),conflicts:b}:{success:!0,package:{id:`package::${r}`,packageId:r,type:"package",desc:i.name||`Package ${r}`,qty:1,price:Number.isFinite(Number(i.price))?Number(i.price):0,barcode:i.code||i.raw?.package_code||`pkg-${r}`,packageItems:c.map(p=>({equipmentId:p?.equipmentId??null,barcode:p?.barcode??p?.normalizedBarcode??"",normalizedBarcode:ne(p?.normalizedBarcode??p?.barcode),desc:p?.desc??"",qty:Number.isFinite(Number(p?.qty))?Number(p.qty):1,price:Number.isFinite(Number(p?.price))?Number(p.price):0})),image:c.find(p=>p?.image)?.image??null},packageInfo:i}}function Mr(e,{silent:t=!1}={}){const n=zn(e);if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=ln(),r=ht(),i=Rr(n,{existingItems:r,start:a,end:s});if(!i.success){if(!t){const d={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[i.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");E(i.message||d)}return i}return Ta(i.package),kt(),ye(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:i.package}}function zr(){const{packageSelect:e}=Qn();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;Mr(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function Wl(){const{packageAddButton:e,packageSelect:t}=Qn();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}Mr(n)}),e.dataset.listenerAttached="true")}function Or(){const{modeRadios:e}=Qn();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&As(s.target.value)}),a.dataset.listenerAttached="true")}),Wl(),zr();const t=ma(),n=e.find(a=>a.value===t);n&&(n.checked=!0),As(t)}function kt(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=ht(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),d=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const l=En(n);t.innerHTML=l.map(u=>{const b=u.items[0]||{},y=on(b)||u.image,p=y?`<img src="${y}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=h(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,v=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,I=`${h(g.toFixed(2))} ${s}`,q=`${h(v.toFixed(2))} ${s}`,C=u.items.some(_=>_?.type==="package"),x=u.barcodes.map(_=>h(String(_||""))).filter(Boolean),H=x.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${x.map(_=>`<li>${_}</li>`).join("")}
            </ul>
          </details>`:"";let S="";if(C){const _=new Map;if(u.items.forEach(L=>{Array.isArray(L?.packageItems)&&L.packageItems.forEach(B=>{if(!B)return;const V=ne(B.barcode||B.desc||Math.random()),P=_.get(V);if(P){P.qty+=Number.isFinite(Number(B.qty))?Number(B.qty):1;return}_.set(V,{desc:B.desc||B.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(B.qty))?Number(B.qty):1,barcode:B.barcode??B.normalizedBarcode??""})})}),_.size){const L=Array.from(_.values()).map(B=>{const V=h(String(B.qty)),P=B.desc||h(String(B.barcode||"")),D=B.barcode?` <span class="reservation-package-items__barcode">(${h(String(B.barcode))})</span>`:"";return`<li>${P}${D} × ${V}</li>`}).join("");S=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
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
                ${C?`${S||""}${H||""}`:H}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${c}" ${C?"disabled":""}>−</button>
              <span class="reservation-qty-value">${m}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${i}" ${C?"disabled":""}>+</button>
            </div>
          </td>
          <td>${I}</td>
          <td>${q}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${d}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function Xl(e){const t=ht(),a=En(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Rc(s),kt(),ye())}function Jl(e){const t=ht(),n=t.filter(a=>Na(a)!==e);n.length!==t.length&&(ar(n),kt(),ye())}function Yl(e){const t=ht(),a=En(t).find(b=>b.key===e);if(!a)return;const{start:s,end:r}=ln();if(!s||!r){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(b=>ne(b.barcode))),{equipment:c=[]}=he(),d=(c||[]).find(b=>{const y=ne(b?.barcode);return!y||i.has(y)||Na({desc:b?.desc||b?.description||b?.name||"",price:Number(b?.price)||0})!==e||!br(b)?!1:!gt(y,s,r)});if(!d){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const l=ne(d.barcode),u=rn(d);if(!u){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}Ta({id:u,equipmentId:u,barcode:l,desc:d.desc||d.description||d.name||a.description||"",qty:1,price:Number.isFinite(Number(d.price))?Number(d.price):a.unitPrice,image:on(d)}),kt(),ye()}function ye(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),d=c?.value||"unpaid",{start:l,end:u}=ln();i&&rt();const b=vn(),y=document.getElementById("res-payment-progress-type"),p=document.getElementById("res-payment-progress-value"),m=kr(y),g=$r(p);Zi(),Ei({selectedItems:ht(),discount:n,discountType:s,applyTax:i,paidStatus:d,paymentProgressType:m,paymentProgressValue:g,start:l,end:u,companySharePercent:b,paymentHistory:[]});const v=Ei.lastResult;v?(Pr(p,v.paymentProgressValue),c&&(c.value=v.paymentStatus,Ye(c,v.paymentStatus))):Ye(c,d)}function Zl(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=h(c.target.value),ye()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",ye),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(Je()){n.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Es("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(Je()){a.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Es("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(Je()){s.value="unpaid",Ye(s,"unpaid"),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ye(s),ye()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(Je()){r.value="percent",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",ye()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(Je()){i.value="",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=h(c.target.value),ye()}),i.dataset.listenerAttached="true"),ye()}function ed(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){ye();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),ye()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Ti(){const{input:e,hidden:t}=Js(),{input:n,hidden:a}=cn(),{customers:s}=he();let r=t?.value?String(t.value):"";if(!r&&e?.value){const U=qs(e.value,{allowPartial:!0});U&&(r=String(U.id),t&&(t.value=r),e.value=U.label,e.dataset.selectedId=r)}const i=s.find(U=>String(U.id)===r);if(!i){E(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let d=a?.value?String(a.value):"";if(!d&&n?.value){const U=Ss(n.value,{allowPartial:!0});U&&(d=String(U.id),a&&(a.value=d),n.value=U.label,n.dataset.selectedId=d)}const l=document.getElementById("res-start").value,u=document.getElementById("res-end").value,b=document.getElementById("res-start-time")?.value||"00:00",y=document.getElementById("res-end-time")?.value||"00:00";if(!l||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const p=`${l}T${b}`,m=`${u}T${y}`,g=new Date(p),v=new Date(m);if(Number.isNaN(g.getTime())||Number.isNaN(v.getTime())||g>=v){E(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const I=Zi();I.map(U=>U.technicianId).filter(Boolean);const q=ht();if(q.length===0&&I.length===0){E(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const C=document.getElementById("res-notes")?.value||"",x=parseFloat(h(document.getElementById("res-discount")?.value))||0,H=document.getElementById("res-discount-type")?.value||"percent",S=document.getElementById("res-payment-status"),_=S?.value||"unpaid",L=document.getElementById("res-payment-progress-type"),B=document.getElementById("res-payment-progress-value"),V=kr(L),P=$r(B),D=d?Zs(d):null,J=Ml(D);if(d&&!D){E(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const U of q){const pe=_t(U.barcode);if(pe==="maintenance"||pe==="retired"){E(an(pe));return}}for(const U of q){const pe=ne(U.barcode);if(gt(pe,p,m)){E(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const U of I)if(U?.technicianId&&sr(U.technicianId,p,m)){E(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const T=document.getElementById("res-tax"),N=document.getElementById("res-company-share"),k=!!d;k?(T&&(T.checked=!1,T.disabled=!0,T.classList.add("disabled"),T.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),N&&(N.checked=!1,N.disabled=!0,N.classList.add("disabled"),N.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),S&&(S.value="unpaid",S.disabled=!0,Ye(S,"unpaid"),S.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),L&&(L.disabled=!0,L.classList.add("disabled")),B&&(B.value="",B.disabled=!0,B.classList.add("disabled"))):(T&&(T.disabled=!1,T.classList.remove("disabled"),T.title=""),N&&(N.disabled=!1,N.classList.remove("disabled"),N.title=""),S&&(S.disabled=!1,S.title=""),L&&(L.disabled=!1,L.classList.remove("disabled")),B&&(B.disabled=!1,B.classList.remove("disabled")));const X=k?!1:T?.checked||!1,O=!!N?.checked;if(!k&&O!==X){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let F=O?vn():null;O&&(!Number.isFinite(F)||F<=0)&&(rt(),F=vn());const K=O&&X&&Number.isFinite(F)&&F>0;X&&rt();const $=zs(q,x,H,X,I,{start:p,end:m,companySharePercent:K?F:0}),z=Lc(),Q=Os({totalAmount:$,progressType:V,progressValue:P,history:[]});B&&Pr(B,Q.paymentProgressValue);const ae=[];Q.paymentProgressValue!=null&&Q.paymentProgressValue>0&&ae.push({type:Q.paymentProgressType||V,value:Q.paymentProgressValue,amount:Q.paidAmount,percentage:Q.paidPercent,recordedAt:new Date().toISOString()});const ue=Hs({manualStatus:_,paidAmount:Q.paidAmount,paidPercent:Q.paidPercent,totalAmount:$});S&&(S.value=ue,Ye(S,ue));const se=ir({reservationCode:z,customerId:c,start:p,end:m,status:J?"confirmed":"pending",title:null,location:null,notes:C,projectId:d||null,totalAmount:$,discount:k?0:x,discountType:k?"percent":H,applyTax:X,paidStatus:k?"unpaid":ue,confirmed:J,items:q.map(U=>({...U,equipmentId:U.equipmentId??U.id})),crewAssignments:I,companySharePercent:k||!K?null:F,companyShareEnabled:k?!1:K,paidAmount:k?0:Q.paidAmount,paidPercentage:k?0:Q.paidPercent,paymentProgressType:k?null:Q.paymentProgressType,paymentProgressValue:k?null:Q.paymentProgressValue,paymentHistory:k?[]:ae});try{Ii("about to submit",{crewAssignments:I,techniciansPayload:se?.technicians,payload:se});const U=await Mc(se);Ii("server response",{reservation:U?.id??U?.reservationId??U?.reservation_code,technicians:U?.technicians,crewAssignments:U?.crewAssignments,techniciansDetails:U?.techniciansDetails}),xn(),Mt(),gn(),ad(),E(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof gs=="function"&&gs({type:"created",reservation:U}),td(U)}catch(U){console.error("❌ [reservations/createForm] Failed to create reservation",U);const pe=ja(U)?U.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");E(pe,"error"),k&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),jn({clearValue:!1}))}}function td(e){if(!ca)return;const{draftStorageKey:t=wr,returnUrl:n=Ar}=ca,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}ca=null,n&&(window.location.href=n)}function jn({clearValue:e=!1}={}){const{input:t,hidden:n}=cn();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,Rt())}function nd(e,t=""){const{input:n,hidden:a}=cn();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),Rt())}function ad(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),xt({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),jn({clearValue:!1}),qn({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",Ye(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),zc(),ar([]),ba("form-reset"),kt(),Rt(),ye()}function sd(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){Xl(s);return}if(a==="increase-group"&&s){Yl(s);return}if(a==="remove-group"&&s){Jl(s);return}}),e.dataset.listenerAttached="true")}function id(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(ma()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,Dr(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||ma()!=="single")return;const{start:r,end:i}=ln();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function rd(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Ti()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Ti()}),t.dataset.listenerAttached="true")}function kp({onAfterSubmit:e}={}){gs=typeof e=="function"?e:null;const{customers:t,projects:n}=he();Fc(t||[]),xt(),ti(),Lr(n||[]),Nr({projectsList:n}),ei(),Mt(),Va(),Ul(),Fr(),Or(),ed(),Zl(),sd(),id(),rd(),zl(),ye(),kt()}function Hr(){Mt(),Va(),Nr(),xt(),ti(),ei(),Fr(),Or(),kt(),ye()}if(typeof document<"u"){const e=()=>{xt(),qn({projectsList:Ys()}),ti(),ei(),ye()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{Mt()}),document.addEventListener("packages:changed",()=>{Va(),ma()==="package"&&As("package")})}typeof window<"u"&&(window.getCompanySharePercent=vn);function Vr(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:Gt(t),endDate:Gt(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:Gt(n),endDate:Gt(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Gt(n),endDate:Gt(a)}}return e==="upcoming"?{startDate:Gt(t),endDate:""}:{startDate:"",endDate:""}}function od(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=h(t?.value||"").trim(),i=h(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),xa(t),xa(n),r="",i=""),!r&&!i&&c){const l=Vr(c);r=l.startDate,i=l.endDate}return{searchTerm:We(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function $p(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{cd(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),xa(a),xa(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function cd(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=Vr(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function Gt(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function xa(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function sa(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function ld(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function dd(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=ld(n);if(a!==null)return a}return null}function Ni(e,t=0){const n=dd(e);if(n!=null)return n;const a=sa(e.createdAt??e.created_at);if(a!=null)return a;const s=sa(e.updatedAt??e.updated_at);if(s!=null)return s;const r=sa(e.start);if(r!=null)return r;const i=sa(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function ud({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((q,C)=>({reservation:q,index:C})),i=t.searchTerm||"",c=t.searchReservationId||"",d=t.searchCustomerName||"",l=t.searchProjectId||"",u=t.startDate||"",b=t.endDate||"",y=t.status||"",p=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,m=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,v=b?new Date(`${b}T23:59:59`):null,I=r.filter(({reservation:q})=>{const C=n.get(String(q.customerId)),x=s?.get?.(String(q.projectId)),H=q.start?new Date(q.start):null,S=Vs(q),{effectiveConfirmed:_}=zt(q,x);if(p!=null&&String(q.customerId)!==String(p)||m!=null&&!(Array.isArray(q.technicians)?q.technicians.map(D=>String(D)):[]).includes(String(m))||y==="confirmed"&&!_||y==="pending"&&_||y==="completed"&&!S)return!1;if(y==="cancelled"){const P=String(q?.status||q?.reservationStatus||"").toLowerCase();if(!["cancelled","canceled"].includes(P))return!1}if(g&&H&&H<g||v&&H&&H>v)return!1;if(c){const P=[q.reservationId,q.id,q.reservation_id,q.reservationCode,q.reservation_code,q.code,q.reference,q.referenceNumber,q.reference_number],D=We(P.filter(T=>T!=null&&T!=="").map(String).join(" ")).replace(/\s+/g,""),J=c.replace(/\s+/g,"");if(!D.includes(J))return!1}if(d&&!We(C?.customerName||"").includes(d))return!1;if(l){const P=[q.projectId,q.project_id,q.projectID,x?.id,x?.projectCode,x?.project_code],D=We(P.filter(T=>T!=null&&T!=="").map(String).join(" ")).replace(/\s+/g,""),J=l.replace(/\s+/g,"");if(!D.includes(J))return!1}if(!i)return!0;const L=q.items?.map?.(P=>`${P.barcode} ${P.desc}`).join(" ")||"",B=(q.technicians||[]).map(P=>a.get(String(P))?.name).filter(Boolean).join(" ");return We([q.reservationId,C?.customerName,q.notes,L,B,x?.title].filter(Boolean).join(" ")).includes(i)});return I.sort((q,C)=>{const x=Ni(q.reservation,q.index),H=Ni(C.reservation,C.index);return x!==H?H-x:C.index-q.index}),I}function pd({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),d=o("reservations.list.itemsCountShort","{count} عنصر"),l=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),b=o("reservations.list.status.pending","⏳ غير مؤكد"),y=o("reservations.list.status.completed","📁 منتهي"),p=o("reservations.list.payment.paid","💳 مدفوع"),m=o("reservations.list.payment.unpaid","💳 غير مدفوع"),g=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),v=o("reservations.list.actions.confirm","✔️ تأكيد"),I=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),q=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),C={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:x,index:H})=>{const S=t.get(String(x.customerId)),_=x.projectId?a?.get?.(String(x.projectId)):null,L=Vs(x),B=x.paidStatus??x.paid_status??(x.paid===!0||x.paid==="paid"?"paid":"unpaid"),V=B==="paid",P=B==="partial",{effectiveConfirmed:D,projectLinked:J}=zt(x,_),T=D?"status-confirmed":"status-pending",N=V?"status-paid":P?"status-partial":"status-unpaid";let k=`<span class="reservation-chip status-chip ${T}">${D?u:b}</span>`;const X=V?p:P?g:m;let O=`<span class="reservation-chip status-chip ${N}">${X}</span>`,F=V?" tile-paid":P?" tile-partial":" tile-unpaid";L&&(F+=" tile-completed");let K="";L&&(k=`<span class="reservation-chip status-chip status-completed">${y}</span>`,O=`<span class="reservation-chip status-chip status-completed">${X}</span>`,K=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);let $=!J&&!D?`<button class="tile-confirm" data-reservation-index="${H}" data-action="confirm">${v}</button>`:"";{const de=String(x?.status||x?.reservationStatus||"").toLowerCase();(de==="cancelled"||de==="canceled")&&(k=`<span class="reservation-chip status-chip status-cancelled">${o("reservations.list.status.cancelled","❌ ملغي")}</span>`,F=" tile-cancelled",K="",typeof $<"u"&&($=""))}const z=$?`<div class="tile-actions">${$}</div>`:"",Q=x.items?.length||0,ae=Array.isArray(x.crewAssignments)?x.crewAssignments:[],ue=(x.technicians||[]).map(de=>n.get(String(de))).filter(Boolean),se=ae.length?ae.map(de=>{const Ke=de.positionLabel??de.position_name??de.role??o("reservations.crew.positionFallback","منصب بدون اسم"),A=de.technicianName??n.get(String(de.technicianId??""))?.name??null;return A?`${h(Ke)} (${h(A)})`:h(Ke)}):ue.map(de=>de.name),U=se.length?se.join(l):"—",pe=h(String(x.reservationId??"")),we=x.start?h(Ze(x.start)):"-",ve=x.end?h(Ze(x.end)):"-",qe=h(String(x.cost??0)),G=h(String(Q)),ie=x.notes?h(x.notes):c,be=d.replace("{count}",G),Ee=x.applyTax?`<small>${r}</small>`:"";let _e=I;return x.projectId&&(_e=_?.title?h(_.title):q),`
      <div class="${$?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${F}"${K} data-reservation-index="${H}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${pe}</div>
          <div class="tile-badges">
            ${k}
            ${O}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${C.client}</span>
            <span class="tile-value">${S?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${C.project}</span>
            <span class="tile-value">${_e}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${C.start}</span>
            <span class="tile-value tile-inline">${we}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${C.end}</span>
            <span class="tile-value tile-inline">${ve}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${C.cost}</span>
            <span class="tile-value">${qe} ${s} ${Ee}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${C.equipment}</span>
            <span class="tile-value">${be}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${C.crew}</span>
            <span class="tile-value">${se.length?U:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${ie}</span>
          </div>
        </div>
        ${z}
      </div>
    `}).join("")}function Ge(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function os(e){if(e==null)return"";const t=String(e).trim();return t?h(t):""}function ji(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=zt(e,s),c=e.paid===!0||e.paid==="paid",d=Vs(e),l=e.items||[];let{groups:u}=or(e);const b=f=>!!(f&&typeof f=="object"&&(f.type==="package"||Array.isArray(f.packageItems)&&f.packageItems.length||Array.isArray(f.items)&&f.items.some(R=>R&&R.type==="package"))),y=f=>{const R=(f?.package_code??f?.packageDisplayCode??f?.barcode??f?.description??(Array.isArray(f?.items)&&f.items[0]?.barcode)??"").toString().trim().toLowerCase();return h(R)},p=(f,R)=>{const ee=Ae=>{const Le=Array.isArray(Ae?.items)?Ae.items[0]:null,ke=[Le?.price,Le?.unit_price,Le?.unitPrice,Ae?.unitPrice,Ae?.totalPrice];for(const Ct of ke){const Fe=je(Ct);if(Number.isFinite(Fe)&&Fe>0)return Fe}return 0},me=ee(f),ge=ee(R);return me&&ge?me<=ge?f:R:me?f:R},m=[],g=new Map;u.forEach(f=>{if(!b(f)){m.push(f);return}const R=y(f);if(!R){if(!g.has("__unknown__"))g.set("__unknown__",m.length),m.push(f);else{const ee=g.get("__unknown__");m[ee]=p(m[ee],f)}return}if(!g.has(R))g.set(R,m.length),m.push(f);else{const ee=g.get(R);m[ee]=p(m[ee],f)}}),u=m;const{technicians:v=[]}=he(),I=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(v)?v:[]),q=new Map;I.forEach(f=>{if(!f||f.id==null)return;const R=String(f.id),ee=q.get(R)||{};q.set(R,{...ee,...f})});const x=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(f=>({technicianId:f}))).map((f,R)=>{const ee=f?.technicianId!=null?q.get(String(f.technicianId)):null;let me=f.positionLabel??f.position_name??f.position_label??f.role??f.position??"";(!me||me.trim()==="")&&(me=f.positionLabelAr??f.position_label_ar??f.positionLabelEn??f.position_label_en??f.position_name_ar??f.position_name_en??"");const ge=f.positionLabelAlt??f.position_label_alt??f.positionLabelEn??f.position_label_en??f.positionLabelAr??f.position_label_ar??"";let Ae=me,Le=ge;if(!Ae||Ae.trim()==="")try{const Fe=Tt?Tt():[];let te=null;if(f.positionId!=null&&(te=Fe.find($e=>String($e.id)===String(f.positionId))||null),!te){const $e=f.positionKey??f.position_key??f.positionName??f.position_name??f.position??"";if($e&&(te=typeof fa=="function"?fa($e):null,!te&&Fe.length)){const nt=String($e).trim().toLowerCase();te=Fe.find(at=>[at.name,at.labelAr,at.labelEn].filter(Boolean).map(Lt=>String(Lt).toLowerCase()).includes(nt))||null}}te&&(Ae=te.labelAr||te.labelEn||te.name||"",(!Le||String(Le).trim()==="")&&(te.labelAr&&te.labelEn?Le=Ae===te.labelAr?te.labelEn:te.labelAr:Le=te.labelAr||te.labelEn||""))}catch{}const ke=Se(je(f.positionCost??f.position_cost??f.cost??f.daily_wage??f.dailyWage??ee?.dailyWage??ee?.wage??0)),Ct=Se(je(f.positionClientPrice??f.position_client_price??f.client_price??f.clientPrice??f.daily_total??f.dailyTotal??f.total??ee?.dailyTotal??ee?.total??ee?.total_wage??0));return{assignmentId:f.assignmentId??f.assignment_id??`crew-${R}`,positionId:f.positionId??f.position_id??null,positionKey:f.positionKey??f.position_key??f.positionName??f.position_name??f.position??null,positionLabel:Ae,positionLabelAlt:Le,positionLabelAr:f.positionLabelAr??f.position_label_ar??null,positionLabelEn:f.positionLabelEn??f.position_label_en??null,positionCost:ke,positionClientPrice:Ct,technicianId:f.technicianId!=null?String(f.technicianId):ee?.id!=null?String(ee.id):null,technicianName:f.technicianName??f.technician_name??ee?.name??null,technicianRole:f.technicianRole??ee?.role??null,technicianPhone:f.technicianPhone??ee?.phone??null,notes:f.notes??null}}),H=sn(),S=Ba(e.start,e.end),_=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,L=je(_),B=Number.isFinite(L)?L:0,V=e.discountType??e.discount_type??e.discountMode??"percent",P=String(V).toLowerCase()==="amount"?"amount":"percent",D=r?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),J=je(e.cost??e.total??e.finalTotal),T=Number.isFinite(J),N=T?Se(J):0,k=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,X=k!=null?je(k):Number.NaN;let K=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(X)&&X>0)&&Number.isFinite(X)?X:0;D&&K<=0&&(K=Dt);const $=cr({items:l,technicianIds:e.technicians||[],crewAssignments:x,discount:B,discountType:P,applyTax:D,start:e.start,end:e.end,companySharePercent:K}),z=Se($.equipmentTotal),Q=Se($.crewTotal);Se($.crewCostTotal);const ae=Se($.discountAmount),ue=Se($.subtotalAfterDiscount),se=Number.isFinite($.companySharePercent)?$.companySharePercent:0;let U=Se($.companyShareAmount);U=se>0?Se(Math.max(0,U)):0;const pe=Se($.taxAmount),we=Se($.finalTotal),ve=r?we:T?N:we,qe=Se($.netProfit),G=h(String(e.reservationId??e.id??"")),ie=e.start?h(Ze(e.start)):"-",be=e.end?h(Ze(e.end)):"-",Ee=h(String(x.length)),_e=h(z.toFixed(2)),Te=h(ae.toFixed(2)),de=h(ue.toFixed(2)),Ke=h(pe.toFixed(2)),A=h((Number.isFinite(ve)?ve:0).toFixed(2)),Z=h(String(S)),Y=o("reservations.create.summary.currency","SR"),le=o("reservations.details.labels.discount","الخصم"),oe=o("reservations.details.labels.tax","الضريبة (15%)"),Re=o("reservations.details.labels.crewTotal","إجمالي الفريق"),ct=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),Qe=o("reservations.details.labels.duration","عدد الأيام"),lt=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),$t=o("reservations.details.labels.netProfit","💵 صافي الربح"),kn=o("reservations.create.equipment.imageAlt","صورة"),He={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},Ya=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),M=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");o("reservations.details.technicians.roleUnknown","غير محدد");const Ce=o("reservations.details.technicians.phoneUnknown","غير متوفر");o("reservations.details.technicians.wage","{amount} {currency} / اليوم");const dt=o("reservations.list.status.confirmed","✅ مؤكد"),qt=o("reservations.list.status.pending","⏳ غير مؤكد"),Xn=o("reservations.list.payment.paid","💳 مدفوع"),Jn=o("reservations.list.payment.unpaid","💳 غير مدفوع"),ut=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),Yn=o("reservations.list.status.completed","📁 منتهي"),Zn=o("reservations.details.labels.id","🆔 رقم الحجز"),Za=o("reservations.details.section.bookingInfo","بيانات الحجز"),un=o("reservations.details.section.paymentSummary","ملخص الدفع"),Ne=o("reservations.details.labels.finalTotal","المجموع النهائي"),Ve=o("reservations.details.section.crew","😎 الفريق الفني"),Ut=o("reservations.details.crew.count","{count} عضو"),St=o("reservations.details.section.items","📦 المعدات المرتبطة"),ea=o("reservations.details.items.count","{count} عنصر"),Qo=o("reservations.details.actions.edit","✏️ تعديل"),Go=o("reservations.details.actions.delete","🗑️ حذف"),Wo=o("reservations.details.labels.customer","العميل"),Xo=o("reservations.details.labels.contact","رقم التواصل"),Jo=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Yo=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Zo=o("reservations.details.actions.openProject","📁 فتح المشروع"),ec=o("reservations.details.labels.start","بداية الحجز"),tc=o("reservations.details.labels.end","نهاية الحجز"),nc=o("reservations.details.labels.notes","ملاحظات"),ac=o("reservations.list.noNotes","لا توجد ملاحظات"),sc=o("reservations.details.labels.itemsCount","عدد المعدات"),ic=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),rc=o("reservations.paymentHistory.title","سجل الدفعات"),oc=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),cc=o("reservations.list.unknownCustomer","غير معروف"),ta=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),es=ta==="partial",yi=ta==="paid"?Xn:es?ut:Jn;function ts(f){if(f==null)return Number.NaN;if(typeof f=="number")return Number.isFinite(f)?f:Number.NaN;const R=String(f).replace(/[^0-9.+-]/g,""),ee=Number(R);return Number.isFinite(ee)?ee:Number.NaN}const na=(f={})=>{const R=String(f.type??f.kind??f.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(R)||Array.isArray(f.packageItems)&&f.packageItems.length)},lc=(f={})=>[f.packageId,f.package_id,f.packageCode,f.package_code,f.bundleId,f.bundle_id].some(R=>R!=null&&R!==""),dc=(f={})=>!f||typeof f!="object"?!1:!na(f)&&lc(f),bi=(f={})=>{const R=na(f),ee=[{value:f.qty,key:"qty",limit:999},{value:f.quantity,key:"quantity",limit:999},{value:f.units,key:"units",limit:999},{value:f.count,key:"count",limit:50},{value:f.package_quantity,key:"package_quantity",limit:999},{value:f.packageQty,key:"packageQty",limit:999},{value:f.packageCount,key:"packageCount",limit:999}];let me=NaN;for(const ge of ee){if(ge.value==null||ge.value==="")continue;const Ae=typeof ge.value=="string"?ge.value.trim():String(ge.value??"");if(ge.key==="count"&&Ae.length>6)continue;const Le=ts(ge.value);if(!Number.isFinite(Le)||Le<=0)continue;const ke=Math.round(Le);if(!(ke>ge.limit)){me=Math.max(1,ke);break}}return(!Number.isFinite(me)||me<=0)&&(me=1),R?Math.max(1,Math.min(99,me)):Math.max(1,Math.min(9999,me))};let Me=(Array.isArray(l)?l:[]).reduce((f,R)=>!R||typeof R!="object"||dc(R)?f:f+bi(R),0);Me<=0&&Array.isArray(u)&&u.length&&(Me=u.reduce((f,R)=>{const ee=bi({...R,type:R.type});return f+ee},0)),!Number.isFinite(Me)||Me<=0?Me=Array.isArray(u)&&u.length?u.length:(Array.isArray(l)?l.length:0)||1:Me>1e6&&(Me=Math.min(Me,Array.isArray(u)?u.length:Me),(!Number.isFinite(Me)||Me<=0)&&(Me=(Array.isArray(l)?l.length:0)||1)),Me=Math.max(1,Math.round(Me));const uc=h(String(Me)),gi=ea.replace("{count}",uc),pc=Ut.replace("{count}",Ee),mc=e.notes?h(e.notes):ac,fc=h(Q.toFixed(2)),yc=h(String(se)),bc=h(U.toFixed(2)),gc=`${yc}% (${bc} ${Y})`,hc=Number.isFinite(qe)?Math.max(0,qe):0,vc=h(hc.toFixed(2)),Pt=[{icon:"💼",label:ic,value:`${_e} ${Y}`}];Pt.push({icon:"😎",label:Re,value:`${fc} ${Y}`}),ae>0&&Pt.push({icon:"💸",label:le,value:`${Te} ${Y}`}),Pt.push({icon:"📊",label:ct,value:`${de} ${Y}`}),D&&pe>0&&Pt.push({icon:"🧾",label:oe,value:`${Ke} ${Y}`}),se>0&&Pt.push({icon:"🏦",label:lt,value:gc}),Pt.push({icon:"💵",label:$t,value:`${vc} ${Y}`}),Pt.push({icon:"💰",label:Ne,value:`${A} ${Y}`});const qc=Pt.map(({icon:f,label:R,value:ee})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${f} ${R}</span>
      <span class="summary-details-value">${ee}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let $n=[];Array.isArray(e.paymentHistory)?$n=e.paymentHistory:Array.isArray(e.payment_history)&&($n=e.payment_history);const Sc=Array.isArray(e.paymentLogs)?e.paymentLogs:[],hi=Array.isArray($n)&&$n.length>0?$n:Sc,Ec=hi.length?`<ul class="reservation-payment-history-list">${hi.map(f=>{const R=f?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):f?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),ee=Number.isFinite(Number(f?.amount))&&Number(f.amount)>0?`${h(Number(f.amount).toFixed(2))} ${Y}`:"—",me=Number.isFinite(Number(f?.percentage))&&Number(f.percentage)>0?`${h(Number(f.percentage).toFixed(2))}%`:"—",ge=f?.recordedAt?h(Ze(f.recordedAt)):"—",Ae=f?.note?`<div class="payment-history-note">${Ge(h(f.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${Ge(R)}</span>
              <span class="payment-history-entry__amount">${ee}</span>
              <span class="payment-history-entry__percent">${me}</span>
              <span class="payment-history-entry__date">${ge}</span>
            </div>
            ${Ae}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${Ge(oc)}</div>`,vi=String(e?.status||e?.reservationStatus||"").toLowerCase(),qi=vi==="cancelled"||vi==="canceled",Si=qi?[{text:o("reservations.list.status.cancelled","❌ ملغي"),className:"status-cancelled"},{text:yi,className:ta==="paid"?"status-paid":es?"status-partial":"status-unpaid"}]:[{text:i?dt:qt,className:i?"status-confirmed":"status-pending"},{text:yi,className:ta==="paid"?"status-paid":es?"status-partial":"status-unpaid"}];d&&!qi&&Si.push({text:Yn,className:"status-completed"});const wc=Si.map(({text:f,className:R})=>`<span class="status-chip ${R}">${f}</span>`).join(""),Kt=(f,R,ee)=>`
    <div class="res-info-row">
      <span class="label">${f} ${R}</span>
      <span class="value">${ee}</span>
    </div>
  `;let ns="";if(e.projectId){let f=Ge(Yo);if(s){const R=s.title||o("projects.fallback.untitled","مشروع بدون اسم");f=`${Ge(R)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${Ge(Zo)}</button>`}ns=`
      <div class="res-info-row">
        <span class="label">📁 ${Jo}</span>
        <span class="value">${f}</span>
      </div>
    `}const Et=[];Et.push(Kt("👤",Wo,t?.customerName||cc)),Et.push(Kt("📞",Xo,t?.phone||"—")),Et.push(Kt("🗓️",ec,ie)),Et.push(Kt("🗓️",tc,be)),Et.push(Kt("📦",sc,gi)),Et.push(Kt("⏱️",Qe,Z)),Et.push(Kt("📝",nc,mc)),ns&&Et.push(ns);const Ac=Et.join(""),xc=u.length?u.map(f=>{const R=f.items[0]||{},ee=on(R)||f.image,me=ee?`<img src="${ee}" alt="${kn}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let ge=[];if(Array.isArray(f.packageItems)&&f.packageItems.length)ge=[...f.packageItems];else{const fe=[];f.items.forEach(xe=>{Array.isArray(xe?.packageItems)&&xe.packageItems.length&&fe.push(...xe.packageItems)}),ge=fe}if(Array.isArray(ge)&&ge.length>1){const fe=new Set;ge=ge.filter(xe=>{const re=xe?.normalizedBarcode&&String(xe.normalizedBarcode).toLowerCase()||xe?.barcode&&String(xe.barcode).toLowerCase()||(xe?.equipmentId!=null?`id:${xe.equipmentId}`:null);return re?fe.has(re)?!1:(fe.add(re),!0):!0})}const Ae=na(f)||f.items.some(fe=>na(fe))||ge.length>0,Le=(fe,{fallback:xe=1,max:re=1e3}={})=>{const Ie=ts(fe);return Number.isFinite(Ie)&&Ie>0?Math.min(re,Ie):xe};let ke;if(Ae){const fe=Le(R?.qty??R?.quantity??R?.count,{fallback:NaN,max:999});Number.isFinite(fe)&&fe>0?ke=fe:ke=Le(f.quantity??f.count??1,{fallback:1,max:999})}else ke=Le(f.quantity??f.count??R?.qty??R?.quantity??R?.count??0,{fallback:1,max:9999});const Ct=h(String(ke)),Fe=(fe,{preferPositive:xe=!1}={})=>{let re=Number.NaN;for(const Ie of fe){const mt=je(Ie);if(Number.isFinite(mt)){if(xe&&mt>0)return mt;Number.isFinite(re)||(re=mt)}}return re};let te,$e;if(Ae){const fe=[R?.price,R?.unit_price,R?.unitPrice,f.unitPrice];if(te=Fe(fe,{preferPositive:!0}),!Number.isFinite(te)||te<0){const re=je(f.totalPrice??R?.total??R?.total_price);Number.isFinite(re)&&ke>0&&(te=re/ke)}Number.isFinite(te)||(te=0);const xe=[R?.total,R?.total_price,f.totalPrice];if($e=Fe(xe),!Number.isFinite($e))$e=te*ke;else{const re=te*ke;Number.isFinite(re)&&re>0&&Math.abs($e-re)>re*.25&&($e=re)}}else{const fe=[R?.price,R?.unit_price,R?.unitPrice,f.unitPrice];if(te=Fe(fe,{preferPositive:!0}),!Number.isFinite(te)||te<0){const xe=je(f.totalPrice??R?.total??R?.total_price);Number.isFinite(xe)&&ke>0&&(te=xe/ke)}Number.isFinite(te)||(te=0),$e=je(f.totalPrice??R?.total??R?.total_price),Number.isFinite($e)||($e=te*ke)}te=Se(te),$e=Se($e);const nt=`${h(te.toFixed(2))} ${Y}`,at=`${h($e.toFixed(2))} ${Y}`,Lt=f.barcodes.map(fe=>h(String(fe||""))).filter(Boolean),st=Lt.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${Lt.map(fe=>`<li>${fe}</li>`).join("")}
              </ul>
            </details>`:"";let pt="";if(ge.length){const fe=new Map,xe=re=>{const Ie=ts(re?.qtyPerPackage??re?.perPackageQty??re?.quantityPerPackage);return Number.isFinite(Ie)&&Ie>0&&Ie<=99?Math.round(Ie):1};if(ge.forEach(re=>{if(!re)return;const Ie=ne(re.barcode||re.normalizedBarcode||re.desc||Math.random());if(!Ie)return;const mt=fe.get(Ie),pn=xe(re);if(mt){mt.qty=pn,mt.total=pn;return}fe.set(Ie,{desc:re.desc||re.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(pn,99)),total:Math.max(1,Math.min(pn,99)),barcode:re.barcode??re.normalizedBarcode??""})}),fe.size){const re=Array.from(fe.values()).map(Ie=>{const mt=h(String(Ie.qty>0?Math.min(Ie.qty,99):1)),pn=Ge(Ie.desc||""),Pc=Ie.barcode?` <span class="reservation-package-items__barcode">(${Ge(h(String(Ie.barcode)))})</span>`:"";return`<li>${pn}${Pc} × ${mt}</li>`}).join("");pt=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${re}
                </ul>
              </details>
            `}}const $c=Ae?`${pt||""}${st||""}`:st;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${me}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${Ge(R.desc||R.description||R.name||f.description||"-")}</div>
                  ${$c}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Ge(He.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Ct}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Ge(He.unitPrice)}">${nt}</td>
            <td class="reservation-modal-items-table__cell" data-label="${Ge(He.total)}">${at}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${Ge(He.actions)}">
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
  `,_c=x.map((f,R)=>{const ee=h(String(R+1));let me=f.positionLabel??f.position_name??f.position_label??f.position_title??f.role??f.position??null;if((!me||me.trim()==="")&&(me=f.positionLabelAr??f.position_label_ar??f.position_title_ar??f.positionLabelEn??f.position_label_en??f.position_name_ar??f.position_title_en??f.position_name_en??null),!me||me.trim()==="")try{const nt=typeof Tt=="function"?Tt():[],at=f.positionId?nt.find(pt=>String(pt.id)===String(f.positionId)):null,Lt=!at&&f.positionKey?nt.find(pt=>String(pt.name).toLowerCase()===String(f.positionKey).toLowerCase()):null,st=at||Lt||null;st&&(me=st.labelAr||st.labelEn||st.name||me)}catch{}const ge=os(me)||o("reservations.crew.positionFallback","منصب بدون اسم"),Ae=os(f.positionLabelAlt??f.position_label_alt??f.positionLabelEn??f.position_label_en??f.positionLabelAr??f.position_label_ar??f.position_name_en??f.position_name_ar??""),Le=os(f.technicianName)||o("technicians.picker.noTechnicianOption","— بدون تعيين —"),ke=f.technicianPhone||Ce,Ct=Se(je(f.positionCost??f.position_cost??f.cost??f.daily_wage??f.dailyWage??f.internal_cost??0));let Fe=Se(je(f.positionClientPrice??f.position_client_price??f.client_price??f.customer_price??f.position_price??f.clientPrice??f.daily_total??f.dailyTotal??f.total??0));if(!Number.isFinite(Fe)||Fe<=0)try{const nt=Tt?Tt():[],at=f.positionId?nt.find(pt=>String(pt.id)===String(f.positionId)):null,Lt=!at&&f.positionKey?nt.find(pt=>String(pt.name).toLowerCase()===String(f.positionKey).toLowerCase()):null,st=at||Lt||null;st&&Number.isFinite(Number(st.clientPrice))&&(Fe=Se(Number(st.clientPrice)))}catch{}const te=`${h(Fe.toFixed(2))} ${Y}`,$e=Ct>0?`${h(Ct.toFixed(2))} ${Y}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${ee}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${Le}</span>
            <small class="text-muted">🏷️ ${ge}${Ae?` — ${Ae}`:""}</small>
            <small class="text-muted">💼 ${te}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${ke}</div>
          ${$e?`<div>💵 ${o("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${$e}</div>`:""}
        </div>
      </div>
    `}).join(""),kc=x.length?`<div class="reservation-technicians-grid">${_c}</div>`:`<ul class="reservation-modal-technicians"><li>${M}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${Zn}</span>
          <strong>${G}</strong>
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
          <h6 class="summary-heading">${un}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${qc}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${rc}</h6>
              ${Ec}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Ve}</span>
          <span class="count">${pc}</span>
        </div>
        ${kc}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${St}</span>
          <span class="count">${gi}</span>
        </div>
        ${Ic}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${Qo}</button>
        ${H?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Go}</button>`:""}
      </div>
    </div>
  `}const Pp="project",Cp="editProject",Lp=3600*1e3,Ur=.15,Tp=6,Np="projectsTab",jp="projectsSubTab",Bp={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},Dp={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},Fp={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},md=`@page {
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
`,fd=/color\([^)]*\)/gi,yd=/color-mix\([^)]*\)/gi,bd=/oklab\([^)]*\)/gi,gd=/oklch\([^)]*\)/gi,Bt=/(color\(|color-mix\(|oklab|oklch)/i,hd=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke","boxShadow","textShadow","accentColor","caretColor","columnRuleColor"],vd=typeof document<"u"?document.createElement("canvas"):null,ia=vd?.getContext?.("2d")||null;function Kr(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function xs(e,t="#000"){if(!ia||!e)return t;try{return ia.fillStyle="#000",ia.fillStyle=e,ia.fillStyle||t}catch{return t}}function qd(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&Bt.test(n)){const s=xs(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function fn(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function Qr(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;hd.forEach(c=>{const d=r[c];if(d&&Bt.test(d)){const l=Kr(c);if(fn(n,s,l),c==="boxShadow"||c==="textShadow")s.style.setProperty(l,"none","important");else{const u=c==="backgroundColor"?"#ffffff":r.color||"#000000",b=xs(d,u);s.style.setProperty(l,b,"important")}}});const i=r.backgroundImage;if(i&&Bt.test(i)){const c=xs(r.backgroundColor||"#ffffff","#ffffff");fn(n,s,"background-image"),fn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function Gr(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","boxShadow","textShadow","accentColor","caretColor","columnRuleColor"].forEach(c=>{const d=r[c];if(d&&Bt.test(d)){const l=Kr(c);if(fn(n,s,l),c==="boxShadow"||c==="textShadow")s.style.setProperty(l,"none","important");else{const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(l,u,"important")}}});const i=r.backgroundImage;i&&Bt.test(i)&&(fn(n,s,"background-image"),fn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function Wr(e){if(!e)return;const t=(n="")=>{if(typeof n!="string")return n;let a=n;return Bt.test(a)&&(a=a.replace(fd,"#000").replace(yd,"#000").replace(bd,"#000").replace(gd,"#000")),a};e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&Bt.test(a)&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&Bt.test(a)&&n.setAttribute("style",t(a))})}const Xr="reservations.quote.sequence",Bi={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},Jr="https://help.artratio.sa/guide/quote-preview",De={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Sd=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Xe=[...Sd],Ed=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function Is(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...Xe]}function wd(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=Is(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=Is(t.value);if(a.length)return a}const n=Xe.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...Xe]}const Ad=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],Yr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>{if(e?.isPackage){const t=e?.packageCodeResolved||e?.barcode||"";return w(t||"-")}return w(e?.barcode||"-")}},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>w(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>w(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>w(h(Number(e?.price||0).toFixed(2)))}],Zr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(h(String(t+1)))},{id:"position",labelKey:"reservations.details.crew.position",fallback:"المنصب",render:e=>w(h(e?.positionLabel??e?.position_name??e?.role??o("reservations.crew.positionFallback","منصب بدون اسم")))},{id:"price",labelKey:"reservations.details.crew.clientPrice",fallback:"سعر العميل",render:e=>{const t=Number.isFinite(Number(e?.positionClientPrice))?Number(e.positionClientPrice):0;return w(`${h(t.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}}],_s={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:Yr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:Zr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},eo=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(h(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>w(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>w(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>w(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],to=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>w(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>w(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>w(e?.note||"-")}],no=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(h(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>w(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>w(h(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>w(h(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>w(e?.displayCost||"—")}],xd=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],Id={customerInfo:_s.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:_s.payment,projectExpenses:to.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:eo.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:no.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},cs=new Map;function Ua(e="reservation"){if(cs.has(e))return cs.get(e);const t=e==="project"?xd:Ad,n=e==="project"?Id:_s,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(d=>d.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return cs.set(e,r),r}function Ka(e="reservation"){return Ua(e).sectionDefs}function ao(e="reservation"){return Ua(e).fieldDefs}function so(e="reservation"){return Ua(e).sectionIdSet}function io(e="reservation"){return Ua(e).fieldIdMap}function ro(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const _d="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",kd="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",$d="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",oo=md.trim(),co=/^data:image\/svg\+xml/i,Pd=/\.svg($|[?#])/i,Nn=512,ks="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",lo=96,uo=25.4,$s=210,la=297,da=Math.round($s/uo*lo),ua=Math.round(la/uo*lo),Cd=2,po=/safari/i,Ld=/(iphone|ipad|ipod)/i,Di=/(iphone|ipad|ipod)/i,Td=/(crios|fxios|edgios|opios)/i,Ia="[reservations/pdf]";let W=null,j=null,yt=1,Cn=null,Ln=null,jt=null,yn=null,Bn=!1;function Zt(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!W?.statusIndicator||!W?.statusText)return;W.statusKind=e;const r=t||ro(e);W.statusText.textContent=r,W.statusSpinner&&(W.statusSpinner.hidden=!s),W.statusAction&&(W.statusAction.hidden=!0,W.statusAction.onclick=null,n&&typeof a=="function"&&(W.statusAction.textContent=n,W.statusAction.hidden=!1,W.statusAction.onclick=i=>{i.preventDefault(),a()})),W.statusIndicator.hidden=!1,requestAnimationFrame(()=>{W.statusIndicator.classList.add("is-visible")})}function ls(e){try{return String(e||"").toLowerCase().normalize("NFKD").replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,"").replace(/\s+/g," ").trim()}catch{return String(e||"").trim().toLowerCase()}}function Dn(e){!W?.statusIndicator||!W?.statusText||(W.statusKind=null,W.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{W?.statusIndicator&&(W.statusIndicator.hidden=!0,W.statusAction&&(W.statusAction.hidden=!0,W.statusAction.onclick=null),W.statusSpinner&&(W.statusSpinner.hidden=!1))},220))}function Ps(){return!!window?.bootstrap?.Modal}function Nd(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),jt||(jt=document.createElement("div"),jt.className="modal-backdrop fade show",jt.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(jt)),yn||(yn=t=>{t.key==="Escape"&&Cs(e)},document.addEventListener("keydown",yn));try{e.focus({preventScroll:!0})}catch{}}}function Cs(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),jt&&(jt.remove(),jt=null),yn&&(document.removeEventListener("keydown",yn),yn=null))}function jd(e){if(e){if(Ps()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}Nd(e)}}function Bd(){if(Bn)return;Bn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!W?.modal?.classList.contains("show"),s=()=>{W?.modal?.classList.contains("show")&&(Zt("render"),Bn=!1,dn())};Ji({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:Jr}),a&&Zt("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function Qa(e="reservation"){const t={},n=ao(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function ai(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function Dd(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function si(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function ii(e="reservation"){return Object.fromEntries(Ka(e).map(({id:t})=>[t,!1]))}function ri(e,t){return e.sectionExpansions||(e.sectionExpansions=ii(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Fd(e,t){return ri(e,t)?.[t]!==!1}function oi(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function Rd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Ld.test(e)}function Md(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=po.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function mo(){return Rd()&&Md()}function Ga(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=Di.test(e)||Di.test(t),s=/Macintosh/i.test(e)&&n>1;return po.test(e)&&!Td.test(e)&&(a||s)}function ds(e,...t){try{console.log(`${Ia} ${e}`,...t)}catch{}}function It(e,...t){try{console.warn(`${Ia} ${e}`,...t)}catch{}}function zd(e,t,...n){try{t?console.error(`${Ia} ${e}`,t,...n):console.error(`${Ia} ${e}`,...n)}catch{}}function Pe(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Od(e,t="لا توجد بيانات للعرض."){const n=w(o(e,t));return Pe(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function _a(e,t){return Array.isArray(e)&&e.length?e:[Od(t)]}const Hd=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function fo(e=""){return Hd.test(e)}function Vd(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!fo(r))return a.call(this,r,...i);let c,d=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),d=!0)}catch{}try{if(!d){const l=this.canvas;l&&l.style?.direction!=="rtl"&&(l.__artRatioOriginalDirection=l.style.direction,l.style.direction="rtl")}return a.call(this,r,...i)}finally{if(d&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!d){const l=this.canvas;l&&l.__artRatioOriginalDirection!==void 0&&(l.style.direction=l.__artRatioOriginalDirection,delete l.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function Fi(e,t=Nn){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Ud(e){if(!e)return{width:Nn,height:Nn};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?Fi(t,0):0,s=n?Fi(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,d]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(d)&&d>0?d:0)}}return{width:a||Nn,height:s||Nn}}function yo(e=""){return typeof e!="string"?!1:co.test(e)||Pd.test(e)}function Kd(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Qd(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function bo(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await Qd(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),d=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=d;const l=i.getContext("2d");return l.clearRect(0,0,c,d),l.drawImage(r,0,0,c,d),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function Gd(e){if(!e)return null;if(co.test(e))return Kd(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Wd(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!yo(t))return!1;const n=await Gd(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",ks),!1;const a=await bo(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",ks),!1)}async function Xd(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Ud(e),s=await bo(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||ks),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),d=e.getAttribute("height");return c&&i.setAttribute("width",c),d&&i.setAttribute("height",d),e.parentNode?.replaceChild(i,e),!!s}async function go(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{yo(s.getAttribute?.("src"))&&a.push(Wd(s))}),n.forEach(s=>{a.push(Xd(s))}),a.length&&await Promise.allSettled(a)}function Jd(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(F,K=0)=>{const $=parseFloat(F);return Number.isFinite($)?$:K},i=r(s.paddingTop),c=r(s.paddingBottom),d=r(s.paddingRight),l=r(s.paddingLeft),u=r(s.borderRadius),b=r(s.fontSize,14),y=(()=>{const F=s.lineHeight;if(!F||F==="normal")return b*1.6;const K=r(F,b*1.6);return K>0?K:b*1.6})(),p=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(p<=0)return null;const m=Math.max(1,p-l-d),g=e.textContent||"",v=g.split(/\r?\n/),I=n.createElement("canvas"),q=I.getContext("2d");if(!q)return null;const C=s.fontStyle||"normal",x=s.fontVariant||"normal",H=s.fontWeight||"400",S=s.fontFamily||"sans-serif",_=s.fontStretch||"normal",L=F=>F.join(" "),B=[],V=F=>q.measureText(F).width;q.font=`${C} ${x} ${H} ${_} ${b}px ${S}`,v.forEach(F=>{const K=F.trim();if(K.length===0){B.push("");return}const $=K.split(/\s+/);let z=[];$.forEach((Q,ae)=>{const ue=Q.trim();if(!ue)return;const se=L(z.concat(ue));if(V(se)<=m||z.length===0){z.push(ue);return}B.push(L(z)),z=[ue]}),z.length&&B.push(L(z))}),B.length||B.push("");const P=i+c+B.length*y,D=Math.ceil(Math.max(1,p)*t),J=Math.ceil(Math.max(1,P)*t);I.width=D,I.height=J,I.style.width=`${Math.max(1,p)}px`,I.style.height=`${Math.max(1,P)}px`,q.scale(t,t);const T=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){q.save(),q.beginPath();const F=Math.max(1,p),K=Math.max(1,P),$=Math.min(u,F/2,K/2);q.moveTo($,0),q.lineTo(F-$,0),q.quadraticCurveTo(F,0,F,$),q.lineTo(F,K-$),q.quadraticCurveTo(F,K,F-$,K),q.lineTo($,K),q.quadraticCurveTo(0,K,0,K-$),q.lineTo(0,$),q.quadraticCurveTo(0,0,$,0),q.closePath(),q.clip()}if(q.fillStyle=T,q.fillRect(0,0,Math.max(1,p),Math.max(1,P)),q.font=`${C} ${x} ${H} ${_} ${b}px ${S}`,q.fillStyle=s.color||"#000000",q.textBaseline="top",q.textAlign="right","direction"in q)try{q.direction="rtl"}catch{}const N=Math.max(0,p-d);let k=i;B.forEach(F=>{const K=F.length?F:" ";q.fillText(K,N,k,m),k+=y});const X=n.createElement("img");let O;try{O=I.toDataURL("image/png")}catch(F){return It("note canvas toDataURL failed",F),null}return X.src=O,X.alt=g,X.style.width=`${Math.max(1,p)}px`,X.style.height=`${Math.max(1,P)}px`,X.style.display="block",X.setAttribute("data-quote-note-image","true"),{image:X,canvas:I,totalHeight:P,width:p}}function Yd(e,{pixelRatio:t=1}={}){if(!e||!Ga())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!fo(a.textContent||""))return;let s;try{s=Jd(a,{pixelRatio:t})}catch(r){It("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function Ls(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){zd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),d=o("reservations.quote.toast.retry","إعادة المحاولة"),l=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(Zt("export"),ko()):(Zt("render"),Bn=!1,dn())};if(Ji({message:i,duration:9e3,actionLabel:l?d:void 0,onAction:l?u:void 0,linkLabel:c,linkHref:Jr}),W?.modal?.classList.contains("show")&&Zt("error",{message:i,actionLabel:l?d:void 0,onAction:l?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function Ts({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){It("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){It("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function ci(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function Ri(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function Mi(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function Zd(){const e=Mi();return e||(Ln||(Ln=ci(kd).catch(t=>{throw Ln=null,t}).then(()=>{const t=Mi();if(!t)throw Ln=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Ln)}async function eu(){const e=Ri();return e||(Cn||(Cn=ci($d).catch(t=>{throw Cn=null,t}).then(()=>{const t=Ri();if(!t)throw Cn=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),Cn)}async function tu(){if(window.html2pdf||await ci(_d),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}qd(),Vd()}function w(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function nu(e="reservation"){return e==="project"?"QP":"Q"}function au(e,t="reservation"){const n=Number(e),a=nu(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function su(){const e=window.localStorage?.getItem?.(Xr),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function ho(e="reservation"){const n=su()+1;return{sequence:n,quoteNumber:au(n,e)}}function iu(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(Xr,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function vo(e="reservation"){return Bi[e]||Bi.reservation}function ru(e="reservation"){try{const t=vo(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function ou(e,t="reservation"){try{const n=vo(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function cu(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function lu(e,t="reservation"){if(!e)return null;const n=so(t),a=io(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,d])=>{const l=i[c];if(l==null)return;const{ids:u,emptyExplicitly:b}=cu(l);if(!u&&!b)return;const y=Array.isArray(u)?u.filter(p=>d.has(p)):[];(y.length>0||b)&&(r[c]=y)}),{version:1,sections:s,fields:r}}function qo(e){if(!e)return;const t=e.context||"reservation",n=lu(e,t);n&&ou(n,t)}function So(e){if(!e)return;const t=e.context||"reservation",n=ru(t);if(!n)return;const a=so(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=ai(e.fields||Qa(t)),i=io(t);Object.entries(n.fields).forEach(([c,d])=>{const l=i[c];if(!l)return;const u=Array.isArray(d)?d.filter(b=>l.has(b)):[];r[c]=new Set(u)}),e.fields=r}}function Eo(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function du(e){const t=gn()||[],{technicians:n=[]}=he(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(i=>{if(!i||i.id==null)return;const c=String(i.id),d=s.get(c)||{};s.set(c,{...d,...i})}),(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(i=>({technicianId:i}))).map((i,c)=>{const d=i?.technicianId!=null?s.get(String(i.technicianId)):null;let l=i.positionLabel??i.position_name??i.position_label??i.role??i.position??d?.role??o("reservations.crew.positionFallback","منصب بدون اسم");(!l||l.trim()==="")&&(l=i.positionLabelAr??i.position_label_ar??i.positionLabelEn??i.position_label_en??i.position_name_ar??i.position_name_en??d?.role??o("reservations.crew.positionFallback","منصب بدون اسم"));try{const y=typeof Tt=="function"?Tt()||[]:[];let p=null;if(i?.positionId!=null&&(p=y.find(m=>String(m?.id)===String(i.positionId))||null),!p){const m=i.positionKey??i.position_key??i.positionName??i.position_name??i.position??"";if(m&&(p=typeof fa=="function"&&fa(m)||null,!p&&y.length)){const g=String(m).trim().toLowerCase();p=y.find(v=>[v.name,v.labelAr,v.labelEn].filter(Boolean).map(I=>String(I).toLowerCase()).includes(g))||null}}if(p){const m=p.labelAr||p.labelEn||p.name||"";m&&m.trim()&&(l=m)}}catch{}const u=Se(je(i.positionCost??i.position_cost??i.cost??i.daily_wage??i.dailyWage??d?.dailyWage??d?.wage??0)),b=Se(je(i.positionClientPrice??i.position_client_price??i.client_price??i.clientPrice??i.daily_total??i.dailyTotal??i.total??d?.dailyTotal??d?.total??d?.total_wage??0));return{assignmentId:i.assignmentId??i.assignment_id??`crew-${c}`,positionId:i.positionId??i.position_id??null,positionLabel:l,positionLabelAlt:i.positionLabelAlt??i.position_label_alt??"",positionCost:u,positionClientPrice:b,technicianId:i.technicianId!=null?String(i.technicianId):d?.id!=null?String(d.id):null,technicianName:i.technicianName??i.technician_name??d?.name??null,technicianRole:i.technicianRole??d?.role??null}})}function uu(e,t,n){const{projectLinked:a}=zt(e,n);Ba(e.start,e.end);const s=e.discount??e.discountValue??0,r=Number(h(String(s)))||0,i=e.discountType??e.discount_type??"percent",c=String(i).toLowerCase()==="amount"?"amount":"percent",d=a?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),l=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,u=l!=null?je(l):Number.NaN,y=(e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied)===!0&&Number.isFinite(u)&&u>0?u:null,p=Array.isArray(t)?t.map(x=>x?.technicianId).filter(Boolean):[],m=cr({items:Array.isArray(e.items)?e.items:[],technicianIds:p,crewAssignments:Array.isArray(t)?t:[],discount:r,discountType:c,applyTax:d,start:e.start,end:e.end,companySharePercent:y}),g=je(e.cost??e.total??e.finalTotal),v=Number.isFinite(g),I=a?m.finalTotal:v?Se(g):m.finalTotal,q={equipmentTotal:m.equipmentTotal,crewTotal:m.crewTotal,crewCostTotal:m.crewCostTotal,discountAmount:m.discountAmount,subtotalAfterDiscount:m.subtotalAfterDiscount,taxableAmount:m.taxableAmount,taxAmount:m.taxAmount,finalTotal:I,companySharePercent:m.companySharePercent,companyShareAmount:m.companyShareAmount,netProfit:m.netProfit},C={equipmentTotal:h(m.equipmentTotal.toFixed(2)),crewTotal:h(m.crewTotal.toFixed(2)),discountAmount:h(m.discountAmount.toFixed(2)),subtotalAfterDiscount:h(m.subtotalAfterDiscount.toFixed(2)),taxableAmount:h(m.taxableAmount.toFixed(2)),taxAmount:h(m.taxAmount.toFixed(2)),finalTotal:h(I.toFixed(2)),companySharePercent:h((Number.isFinite(m.companySharePercent)?m.companySharePercent:0).toFixed(2)),companyShareAmount:h(m.companyShareAmount.toFixed(2)),netProfit:h(m.netProfit.toFixed(2))};return{totals:q,totalsDisplay:C,rentalDays:m.rentalDays}}function Sn(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function wo(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function pu(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=Sn(e.amount??(n==="amount"?e.value:null)),s=Sn(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=wo(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function mu(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(pu).filter(Boolean);if(n.length>0)return n;const a=Sn(e.paidPercent??e.paid_percent),s=Sn(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=wo(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function fu(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function yu(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function bu(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function gu(e){const t=Number(e?.equipmentEstimate)||0,n=bu(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const d=Math.max(0,a-c),l=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,b=l&&s&&u>0?u:0,y=b>0?Number((d*(b/100)).toFixed(2)):0,p=d+y;let m=s?p*Ur:0;(!Number.isFinite(m)||m<0)&&(m=0),m=Number(m.toFixed(2));let g=s?Number(e?.totalWithTax):p;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((p+m).toFixed(2))):g=p,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:d,companyShareAmount:y,subtotal:p,applyTax:s,taxAmount:m,totalWithTax:g}}function hu(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=r.length?r:Array.isArray(e.technicians)?e.technicians:[],c=zs(t,a,s,!1,i,{start:e.start,end:e.end});if(Number.isFinite(c))return c;const d=Number(h(String(e.cost??0)));return Number.isFinite(d)?Math.round(d):0}function vu(e,t){if(!e)return"—";const n=Ze(e);return t?`${n} - ${Ze(t)}`:n}function ce(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${h(a.toFixed(s))} ${t}`}function zi(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function qu(e){if(!e?.start)return null;if(!e?.end)return 1;const t=Ba(e.start,e.end);return Number.isFinite(t)?t:1}function Su(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function Eu(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=he(),i=e?.id!=null?s.find(A=>String(A.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:ce(0,t),expensesTotal:ce(0,t),reservationsTotal:ce(0,t),discountAmount:ce(0,t),taxAmount:ce(0,t),overallTotal:ce(0,t),paidAmount:ce(0,t),remainingAmount:ce(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:ce(0,t),remainingAmountDisplay:ce(0,t),paidPercentDisplay:zi(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const d=i.clientId??i.customerId??i.client_id??i.customer_id??null,l=d!=null&&n.find(A=>String(A.id)===String(d))||null,u=l?.customerName??l?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),b=(i.clientCompany||l?.companyName||l?.company||"").trim(),y=l?.phone??l?.customerPhone??i.clientPhone??i.customerPhone??"",p=y?h(String(y).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),m=l?.email??i.clientEmail??i.customerEmail??"",g=m?String(m).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),v=i.projectCode||`PRJ-${h(String(i.id??""))}`,I=h(String(v)),q=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),C=fu(i.type),x=i.start?Ze(i.start):"—",H=i.end?Ze(i.end):"—",S=qu(i),_=S!=null?Su(S):"غير محدد",L=yu(i),B={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},V=o(`projects.status.${L}`,B[L]||L),P=i.id!=null?String(i.id):null,D=P?a.filter(A=>String(A.projectId)===P):[],T=D.map(A=>{const Z=A.reservationId||A.id||"",Y=A.status||A.state||"pending",le=String(Y).toLowerCase(),oe=o(`reservations.status.${le}`,le),Re=hu(A),ct=A.start?new Date(A.start).getTime():0;return{reservationId:h(String(Z||"-")),status:le,statusLabel:oe,total:Re,totalLabel:ce(Re,t),dateRange:vu(A.start,A.end),startTimestamp:Number.isNaN(ct)?0:ct}}).sort((A,Z)=>Z.startTimestamp-A.startTimestamp).map(({startTimestamp:A,...Z})=>Z).reduce((A,Z)=>A+(Number(Z.total)||0),0),N=new Map;D.forEach(A=>{const Z=Array.isArray(A.items)?A.items:[],Y=Ba(A.start,A.end),le=A.reservationId||A.id||"";Z.forEach((oe,Re)=>{if(!oe)return;const ct=oe.barcode||oe.code||oe.id||oe.desc||oe.description||`item-${Re}`,Qe=String(ct||`item-${Re}`),lt=N.get(Qe)||{description:oe.desc||oe.description||oe.name||oe.barcode||`#${h(String(Re+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},$t=Number(oe.qty)||1,kn=Number(oe.price)||0;lt.totalQuantity+=$t,lt.reservationIds.add(String(le));const He=kn*$t*Math.max(1,Y);Number.isFinite(He)&&(lt.totalCost+=He),N.set(Qe,lt)})});const k=Array.from(N.values()).map(A=>({description:A.description,totalQuantity:A.totalQuantity,reservationsCount:A.reservationIds.size,displayCost:ce(A.totalCost,t)})),X=new Map((r||[]).filter(Boolean).map(A=>[String(A.id),A])),O=new Map,F=A=>{if(!A)return;let Z=null;typeof A=="object"?Z=A.id??A.technicianId??A.technician_id??A.userId??A.user_id??null:(typeof A=="string"||typeof A=="number")&&(Z=A);const Y=Z!=null?String(Z):null,le=Y&&X.has(Y)?X.get(Y):typeof A=="object"?A:null,oe=le?.name||le?.full_name||le?.fullName||le?.displayName||(typeof A=="string"?A:null),Re=le?.role||le?.title||null,ct=le?.phone||le?.mobile||le?.contact||null;if(!oe&&!Y)return;const Qe=Y||oe;O.has(Qe)||O.set(Qe,{id:Y,name:oe||"-",role:Re||null,phone:ct||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(A=>F(A)),D.forEach(A=>{(Array.isArray(A.crewAssignments)&&A.crewAssignments.length?A.crewAssignments:Array.isArray(A.technicians)?A.technicians.map(Y=>({technicianId:Y})):[]).forEach(Y=>F(Y))});const K=Array.from(O.values()),$=Array.isArray(i.expenses)?i.expenses.map(A=>{const Z=Number(A?.amount)||0;return{label:A?.label||A?.name||"-",amount:Z,displayAmount:ce(Z,t),note:A?.note||A?.description||""}}):[],z=gu(i),Q=z.applyTax?Number(((z.subtotal+T)*Ur).toFixed(2)):0,ae=Number((z.subtotal+T+Q).toFixed(2)),ue=mu(i),se=Sn(i.paidAmount??i.paid_amount)||0,U=Sn(i.paidPercent??i.paid_percent)||0,pe=Os({totalAmount:ae,paidAmount:se,paidPercent:U,history:ue}),we=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",ve=Hs({manualStatus:we,paidAmount:pe.paidAmount,paidPercent:pe.paidPercent,totalAmount:ae}),qe={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},G=o(`projects.paymentStatus.${ve}`,qe[ve]||ve),ie=Number(pe.paidAmount||0),be=Number(pe.paidPercent||0),Ee=Math.max(0,Number((ae-ie).toFixed(2))),_e={projectSubtotal:ce(z.subtotal,t),expensesTotal:ce(z.expensesTotal,t),reservationsTotal:ce(T,t),discountAmount:ce(z.discountAmount,t),taxAmount:ce(Q,t),overallTotal:ce(ae,t),paidAmount:ce(ie,t),remainingAmount:ce(Ee,t)},Te={status:ve,statusLabel:G,paidAmount:ie,paidPercent:be,remainingAmount:Ee,paidAmountDisplay:ce(ie,t),remainingAmountDisplay:ce(Ee,t),paidPercentDisplay:zi(be)},de=(i.description||"").trim();return{project:i,customer:l,clientInfo:{name:u,company:b||"—",phone:p,email:g},projectInfo:{title:q,code:I,typeLabel:C,startDisplay:x,endDisplay:H,durationLabel:_,statusLabel:V},expenses:$,equipment:k,crew:K,totals:z,totalsDisplay:_e,projectTotals:{combinedTaxAmount:Q,overallTotal:ae,reservationsTotal:T,paidAmount:ie,paidPercent:be,remainingAmount:Ee,paymentStatus:ve},paymentSummary:Te,notes:de,currencyLabel:t,projectStatus:L,projectStatusLabel:V,projectDurationDays:S,projectDurationLabel:_,paymentHistory:ue}}function wu({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:d={},currencyLabel:l="SR",sections:u,fieldSelections:b={},quoteNumber:y,quoteDate:p,terms:m=Xe}){const g=ai(b),v=(G,ie)=>si(g,G,ie),I=G=>u?.has?.(G),q=`<div class="quote-placeholder">${w(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,C=(G,ie)=>`<div class="info-plain__item">
      <span class="info-plain__label">${w(G)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${w(ie)}</span>
    </div>`,x=(G,ie,{variant:be="inline"}={})=>be==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${w(G)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${w(ie)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${w(G)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${w(ie)}</span>
    </span>`,H=(G,ie)=>`<div class="payment-row">
      <span class="payment-row__label">${w(G)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${w(ie)}</span>
    </div>`,S=[];v("customerInfo","customerName")&&S.push(C(o("projects.details.client","العميل"),t.name||"-")),v("customerInfo","customerCompany")&&S.push(C(o("projects.details.company","شركة العميل"),t.company||"—")),v("customerInfo","customerPhone")&&S.push(C(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),v("customerInfo","customerEmail")&&S.push(C(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const _=I("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${w(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${S.length?`<div class="info-plain">${S.join("")}</div>`:q}
      </section>`:"",L=[];v("projectInfo","projectType")&&L.push(C(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),v("projectInfo","projectTitle")&&L.push(C(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),v("projectInfo","projectCode")&&L.push(C(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),v("projectInfo","projectStart")&&L.push(C(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),v("projectInfo","projectEnd")&&L.push(C(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),v("projectInfo","projectDuration")&&L.push(C(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),v("projectInfo","projectStatus")&&L.push(C(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const B=I("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${w(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${L.length?`<div class="info-plain">${L.join("")}</div>`:q}
      </section>`:"",V=eo.filter(G=>v("projectCrew",G.id)),P=I("projectCrew")?V.length?`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${V.map(G=>`<th>${w(G.labelKey?o(G.labelKey,G.fallback):G.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((G,ie)=>`<tr>${V.map(be=>`<td>${be.render(G,ie)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(V.length,1)}" class="empty">${w(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${q}
          </section>`:"",D=[];v("financialSummary","projectSubtotal")&&D.push(x(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${ce(0,l)}`)),v("financialSummary","expensesTotal")&&D.push(x(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||ce(0,l))),v("financialSummary","reservationsTotal")&&D.push(x(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||ce(0,l))),v("financialSummary","discountAmount")&&D.push(x(o("reservations.details.labels.discount","الخصم"),i.discountAmount||ce(0,l))),v("financialSummary","taxAmount")&&D.push(x(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||ce(0,l)));const J=[];v("financialSummary","overallTotal")&&J.push(x(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||ce(0,l),{variant:"final"})),v("financialSummary","paidAmount")&&J.push(x(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||ce(0,l),{variant:"final"})),v("financialSummary","remainingAmount")&&J.push(x(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||ce(0,l),{variant:"final"}));const T=I("financialSummary")?!D.length&&!J.length?`<section class="quote-section quote-section--financial">${q}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${w(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${D.length?`<div class="totals-inline">${D.join("")}</div>`:""}
            ${J.length?`<div class="totals-final">${J.join("")}</div>`:""}
          </div>
        </section>`:"",N=to.filter(G=>v("projectExpenses",G.id)),k=I("projectExpenses")?N.length?`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${N.map(G=>`<th>${w(G.labelKey?o(G.labelKey,G.fallback):G.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((G,ie)=>`<tr>${N.map(be=>`<td>${be.render(G,ie)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(N.length,1)}" class="empty">${w(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${q}
          </section>`:"",X=no.filter(G=>v("projectEquipment",G.id)),O=I("projectEquipment")?X.length?`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${X.map(G=>`<th>${w(G.labelKey?o(G.labelKey,G.fallback):G.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${r.length?r.map((G,ie)=>`<tr>${X.map(be=>`<td>${be.render(G,ie)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(X.length,1)}" class="empty">${w(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${q}
          </section>`:"",F=(e?.description||"").trim()||"",K=I("projectNotes")?`<section class="quote-section">
        <h3>${w(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${w(F||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",$=[];v("payment","beneficiary")&&$.push(H(o("reservations.quote.labels.beneficiary","اسم المستفيد"),De.beneficiaryName)),v("payment","bank")&&$.push(H(o("reservations.quote.labels.bank","اسم البنك"),De.bankName)),v("payment","account")&&$.push(H(o("reservations.quote.labels.account","رقم الحساب"),h(De.accountNumber))),v("payment","iban")&&$.push(H(o("reservations.quote.labels.iban","رقم الآيبان"),h(De.iban)));const z=`<section class="quote-section">
      <div class="payment-block">
        <h3>${w(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${$.length?$.join(""):q}</div>
      </div>
      <p class="quote-approval-note">${w(De.approvalNote)}</p>
    </section>`,Q=Array.isArray(m)&&m.length?m:Xe,ae=`<footer class="quote-footer">
        <h4>${w(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${Q.map(G=>`<li>${w(G)}</li>`).join("")}</ul>
      </footer>`,ue=[],se=[];if(B&&se.push({key:"project",html:B}),_&&se.push({key:"customer",html:_}),se.length>1){const G=se.find(Ee=>Ee.key==="project"),ie=se.find(Ee=>Ee.key==="customer"),be=[];G?.html&&be.push(G.html),ie?.html&&be.push(ie.html),ue.push(Pe(`<div class="quote-section-row quote-section-row--primary">${be.join("")}</div>`,{blockType:"group"}))}else se.length===1&&ue.push(Pe(se[0].html));const U=[];P&&U.push(Pe(P,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),k&&U.push(Pe(k,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),O&&U.push(Pe(O,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const pe=[];T&&pe.push(Pe(T,{blockType:"summary"})),K&&pe.push(Pe(K));const we=[Pe(z,{blockType:"payment"}),Pe(ae,{blockType:"footer"})],ve=[..._a(ue,"projects.quote.placeholder.primary"),...U,..._a(pe,"projects.quote.placeholder.summary"),...we],qe=`
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
      <style>${oo}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${qe}
          ${ve.join("")}
        </div>
      </div>
    </div>
  `}function Ao(e){if(e?.context==="project")return wu(e);const{reservation:t,customer:n,project:a,crewAssignments:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:d,sections:l,fieldSelections:u={},quoteNumber:b,quoteDate:y,terms:p=Xe}=e,m=h(String(t?.reservationId??t?.id??"")),g=t.start?h(Ze(t.start)):"-",v=t.end?h(Ze(t.end)):"-",I=n?.customerName||n?.full_name||n?.name||"-",q=n?.phone||"-",C=n?.email||"-",x=n?.company||n?.company_name||"-",H=h(q),S=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),_=a?.code||a?.projectCode||"",L=h(String(c)),B=t?.notes||"",V=Array.isArray(p)&&p.length?p:Xe,P=ai(u),D=(M,Ce)=>si(P,M,Ce),J=M=>l?.has?.(M),T=`<div class="quote-placeholder">${w(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,N=(M,Ce)=>`<div class="info-plain__item">${w(M)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${w(Ce)}</strong></div>`,k=(M,Ce,{variant:dt="inline"}={})=>dt==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${w(M)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${w(Ce)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${w(M)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${w(Ce)}</span>
    </span>`,X=(M,Ce)=>`<div class="payment-row">
      <span class="payment-row__label">${w(M)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${w(Ce)}</span>
    </div>`,O=[];D("customerInfo","customerName")&&O.push(N(o("reservations.details.labels.customer","العميل"),I)),D("customerInfo","customerCompany")&&O.push(N(o("reservations.details.labels.company","الشركة"),x)),D("customerInfo","customerPhone")&&O.push(N(o("reservations.details.labels.phone","الهاتف"),H)),D("customerInfo","customerEmail")&&O.push(N(o("reservations.details.labels.email","البريد"),C));const F=J("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${O.length?`<div class="info-plain">${O.join("")}</div>`:T}
      </section>`:"",K=[];D("reservationInfo","reservationId")&&K.push(N(o("reservations.details.labels.reservationId","رقم الحجز"),m||"-")),D("reservationInfo","reservationStart")&&K.push(N(o("reservations.details.labels.start","بداية الحجز"),g)),D("reservationInfo","reservationEnd")&&K.push(N(o("reservations.details.labels.end","نهاية الحجز"),v)),D("reservationInfo","reservationDuration")&&K.push(N(o("reservations.details.labels.duration","عدد الأيام"),L));const $=J("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${K.length?`<div class="info-plain">${K.join("")}</div>`:T}
      </section>`:"",z=[];D("projectInfo","projectTitle")&&z.push(N(o("reservations.details.labels.project","المشروع"),S)),D("projectInfo","projectCode")&&z.push(N(o("reservations.details.labels.code","الرمز"),_||"-"));const Q=J("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${z.length?`<div class="info-plain">${z.join("")}</div>`:T}
      </section>`:"",ae=[];D("financialSummary","equipmentTotal")&&ae.push(k(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${d}`)),D("financialSummary","crewTotal")&&ae.push(k(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${d}`)),D("financialSummary","discountAmount")&&ae.push(k(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${d}`)),D("financialSummary","taxAmount")&&ae.push(k(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${d}`));const ue=D("financialSummary","finalTotal"),se=[];ue&&se.push(k(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${d}`,{variant:"final"}));const U=se.length?`<div class="totals-final">${se.join("")}</div>`:"",pe=J("financialSummary")?!ae.length&&!ue?`<section class="quote-section quote-section--financial">${T}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${w(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${ae.length?`<div class="totals-inline">${ae.join("")}</div>`:""}
            ${U}
          </div>
        </section>`:"",{groups:we}=or(t),ve=we.map(M=>{const Ce=Number(M?.count??M?.quantity??1)||1,dt=Number(M?.unitPrice);let qt=Number.isFinite(dt)?dt:0;if(!qt||qt<=0){const Ne=Number(M?.totalPrice);Number.isFinite(Ne)&&Ce>0&&(qt=Number((Ne/Ce).toFixed(2)))}Number.isFinite(qt)||(qt=0);const Xn=M?.type==="package"||Array.isArray(M?.items)&&M.items.some(Ne=>Ne?.type==="package"),Jn=Array.isArray(M?.barcodes)&&M.barcodes.length?M.barcodes[0]:Array.isArray(M?.items)&&M.items.length?M.items[0]?.barcode:null;let ut=M?.packageDisplayCode??M?.package_code??M?.code??M?.packageCode??(Array.isArray(M?.items)&&M.items.length?M.items[0]?.package_code??M.items[0]?.code??M.items[0]?.packageCode:null);const Yn=Ne=>{const Ve=(Ne==null?"":String(Ne)).trim();return!!(!Ve||/^pkg-/i.test(Ve)||/^\d+$/.test(Ve)&&Ve.length<=4)};if(!ut||Yn(ut)){const Ne=M?.packageId??M?.package_id??(Array.isArray(M?.items)&&M.items.length?M.items[0]?.packageId??M.items[0]?.package_id:null);if(Ne)try{const Ve=tr(Ne);Ve&&Ve.package_code&&(ut=Ve.package_code)}catch{}}if(!ut||Yn(ut))try{const Ne=ls(M?.description||"");if(Ne){const Ve=Hc();let Ut=Ve.find(St=>ls(St?.name||St?.title||St?.label||"")===Ne);Ut||(Ut=Ve.find(St=>{const ea=ls(St?.name||St?.title||St?.label||"");return ea.includes(Ne)||Ne.includes(ea)})),Ut&&Ut.package_code&&(ut=Ut.package_code)}}catch{}const Zn=Xn?ut??Jn??"":M?.barcode??Jn??"",Za=Zn!=null?String(Zn):"";let un=Number.isFinite(Number(M?.totalPrice))?Number(M.totalPrice):Number((qt*Ce).toFixed(2));return un=Se(un),{...M,isPackage:Xn,desc:M?.description,barcode:Za,packageCodeResolved:ut||"",qty:Ce,price:un,totalPrice:un,unitPriceValue:qt}}),qe=Yr.filter(M=>D("items",M.id)),G=qe.length>0,ie=G?qe.map(M=>`<th>${w(M.labelKey?o(M.labelKey,M.fallback):M.fallback)}</th>`).join(""):"",Ee=ve.length>0?ve.map((M,Ce)=>`<tr>${qe.map(dt=>`<td>${dt.render(M,Ce)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(qe.length,1)}" class="empty">${w(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,_e=J("items")?G?`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${ie}</tr>
              </thead>
              <tbody>${Ee}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.items.title","المعدات"))}</h3>
            ${T}
          </section>`:"",Te=Zr.filter(M=>D("crew",M.id)),de=Te.length>0,Ke=de?Te.map(M=>`<th>${w(M.labelKey?o(M.labelKey,M.fallback):M.fallback)}</th>`).join(""):"",A=Array.isArray(s)?s:[],Z=A.length?A.map((M,Ce)=>`<tr>${Te.map(dt=>`<td>${dt.render(M,Ce)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Te.length,1)}" class="empty">${w(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,Y=J("crew")?de?`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Ke}</tr>
              </thead>
              <tbody>${Z}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${T}
          </section>`:"",le=J("notes")?`<section class="quote-section">
        <h3>${w(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${w(B||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",oe=[];D("payment","beneficiary")&&oe.push(X(o("reservations.quote.labels.beneficiary","اسم المستفيد"),De.beneficiaryName)),D("payment","bank")&&oe.push(X(o("reservations.quote.labels.bank","اسم البنك"),De.bankName)),D("payment","account")&&oe.push(X(o("reservations.quote.labels.account","رقم الحساب"),h(De.accountNumber))),D("payment","iban")&&oe.push(X(o("reservations.quote.labels.iban","رقم الآيبان"),h(De.iban)));const Re=`<section class="quote-section">
      <div class="payment-block">
        <h3>${w(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${oe.length?oe.join(""):T}</div>
      </div>
      <p class="quote-approval-note">${w(De.approvalNote)}</p>
    </section>`,ct=`<footer class="quote-footer">
        <h4>${w(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${V.map(M=>`<li>${w(M)}</li>`).join("")}</ul>
      </footer>`,Qe=[];F&&$?Qe.push(Pe(`<div class="quote-section-row">${F}${$}</div>`,{blockType:"group"})):($&&Qe.push(Pe($)),F&&Qe.push(Pe(F))),Q&&Qe.push(Pe(Q));const lt=[];_e&&lt.push(Pe(_e,{blockType:"table",extraAttributes:'data-table-id="items"'})),Y&&lt.push(Pe(Y,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const $t=[];pe&&$t.push(Pe(pe,{blockType:"summary"})),le&&$t.push(Pe(le));const kn=[Pe(Re,{blockType:"payment"}),Pe(ct,{blockType:"footer"})],He=[..._a(Qe,"reservations.quote.placeholder.page1"),...lt,..._a($t,"reservations.quote.placeholder.page2"),...kn],Ya=`
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
      <style>${oo}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Ya}
          ${He.join("")}
        </div>
      </div>
    </div>
  `}async function Au(){try{const e=he();if((Array.isArray(e?.packages)?e.packages:[]).length>0)return;const n=await ot("/packages/?all=1"),a=Array.isArray(n?.data)?n.data:Array.isArray(n)?n:[];a.length&&(La({packages:a}),document.dispatchEvent?.(new CustomEvent("packages:changed",{detail:{packages:a}})))}catch{}}function xu(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function On(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>xu(c)),i=[s,...r].map(c=>c.catch(d=>(It("asset load failed",d),Bd(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function xo(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await go(r),await On(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let d=null,l=null;const u=S=>{S.style.margin="0 auto",S.style.breakInside="avoid",S.style.pageBreakInside="avoid",S.style.pageBreakAfter="auto",S.style.breakAfter="auto"},b=()=>{const S=a.createElement("div"),_=s.childElementCount===0;if(S.className="quote-page",S.dataset.pageIndex=String(s.childElementCount),_){S.classList.add("quote-page--primary");const B=i.cloneNode(!0);B.removeAttribute("data-quote-header-template"),S.appendChild(B)}else S.classList.add("quote-page--continuation");const L=a.createElement("main");L.className="quote-body",S.appendChild(L),s.appendChild(S),u(S),d=S,l=L},y=()=>{(!d||!l||!l.isConnected)&&b()},p=()=>{if(!d||!l||l.childElementCount>0)return;const S=d;d=null,l=null,S.parentNode&&S.parentNode.removeChild(S)},m=()=>{d=null,l=null},g=()=>d?d.scrollHeight-d.clientHeight>Cd:!1,v=(S,{allowOverflow:_=!1}={})=>(y(),l.appendChild(S),g()&&!_?(l.removeChild(S),p(),!1):!0),I=S=>{const _=S.cloneNode(!0);_.removeAttribute?.("data-quote-block"),_.removeAttribute?.("data-block-type"),_.removeAttribute?.("data-table-id"),!v(_)&&(m(),!v(_)&&v(_,{allowOverflow:!0}))},q=S=>{const _=S.querySelector("table");if(!_){I(S);return}const L=S.querySelector("h3"),B=_.querySelector("thead"),V=Array.from(_.querySelectorAll("tbody tr"));if(!V.length){I(S);return}let P=null,D=0;const J=(N=!1)=>{const k=S.cloneNode(!1);k.removeAttribute("data-quote-block"),k.removeAttribute("data-block-type"),k.removeAttribute("data-table-id"),k.classList.add("quote-section--table-fragment"),N&&k.classList.add("quote-section--table-fragment--continued");const X=L?L.cloneNode(!0):null;X&&k.appendChild(X);const O=_.cloneNode(!1);O.classList.add("quote-table--fragment"),B&&O.appendChild(B.cloneNode(!0));const F=a.createElement("tbody");return O.appendChild(F),k.appendChild(O),{section:k,body:F}},T=(N=!1)=>P||(P=J(N),v(P.section)||(m(),v(P.section)||v(P.section,{allowOverflow:!0})),P);V.forEach(N=>{T(D>0);const k=N.cloneNode(!0);if(P.body.appendChild(k),g()&&(P.body.removeChild(k),P.body.childElementCount||(l.removeChild(P.section),P=null,p()),m(),P=null,T(D>0),P.body.appendChild(k),g())){P.section.classList.add("quote-section--table-fragment--overflow"),D+=1;return}D+=1}),P=null};if(!c.length)return;c.forEach(S=>{S.getAttribute("data-block-type")==="table"?q(S):I(S)});const C=Array.from(s.children),x=[];if(C.forEach((S,_)=>{const L=S.querySelector(".quote-body");if(_!==0&&(!L||L.childElementCount===0)){S.remove();return}x.push(S)}),!n){const S=a.defaultView||window,_=Math.min(3,Math.max(1,S.devicePixelRatio||1)),L=Ga()?Math.min(2,_):_;x.forEach(B=>Yd(B,{pixelRatio:L}))}x.forEach((S,_)=>{const L=_===0;S.style.pageBreakAfter="auto",S.style.breakAfter="auto",S.style.pageBreakBefore=L?"auto":"always",S.style.breakBefore=L?"auto":"page",n?S.style.boxShadow="":S.style.boxShadow="none"});const H=x[x.length-1]||null;d=H,l=H?.querySelector(".quote-body")||null,await On(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function li(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function Iu(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([eu(),Zd()]),c=e.ownerDocument||document,d=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,d,c?.documentElement?.getAttribute?.("dir")].some(S=>typeof S=="string"&&S.toLowerCase().startsWith("rtl")),b=typeof window<"u"&&window.devicePixelRatio||1,y=oi(),p=mo(),m=Ga();let g;m?g=1.5:p?g=Math.min(1.7,Math.max(1.2,b*1.1)):y?g=Math.min(1.8,Math.max(1.25,b*1.2)):g=Math.min(2,Math.max(1.6,b*1.4));const v=m||p?.9:y?.92:.95,I=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),q={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let C=0;const x=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let S=0;S<s.length;S+=1){const _=s[S];await go(_),await On(_);const L=_.ownerDocument||document,B=L.createElement("div");Object.assign(B.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const V=_.cloneNode(!0);V.style.width=`${da}px`,V.style.maxWidth=`${da}px`,V.style.minWidth=`${da}px`,V.style.height=`${ua}px`,V.style.maxHeight=`${ua}px`,V.style.minHeight=`${ua}px`,V.style.position="relative",V.style.background="#ffffff",li(V),B.appendChild(V),L.body.appendChild(B);let P;try{await On(V),P=await i(V,{...q,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(F){throw Ls(F,"pageCapture",{toastMessage:x}),F}finally{B.parentNode?.removeChild(B)}if(!P)continue;const D=P.width||1,T=(P.height||1)/D;let N=$s,k=N*T,X=0;if(k>la){const F=la/k;k=la,N=N*F,X=Math.max(0,($s-N)/2)}const O=P.toDataURL("image/jpeg",v);C>0&&I.addPage(),I.addImage(O,"JPEG",X,0,N,k,`page-${C+1}`,"FAST"),C+=1,await new Promise(F=>window.requestAnimationFrame(F))}}catch(S){throw Ts({safariWindowRef:n,mobileWindowRef:a}),S}if(C===0)throw Ts({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(p||m){const S=I.output("blob");if(m){const _=URL.createObjectURL(S);Dn();try{window.location.assign(_)}catch(L){It("mobile safari blob navigation failed",L)}finally{setTimeout(()=>URL.revokeObjectURL(_),6e4)}}else{const _=URL.createObjectURL(S),L=()=>p&&n&&!n.closed?n:a&&!a.closed?a:null,B=(P,D)=>{if(Dn(),!P){window.location.assign(D);return}try{P.location.replace(D),P.focus?.()}catch(J){It("direct blob navigation failed",J);try{P.document.open(),P.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${w(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${D}" title="PDF preview"></iframe></body></html>`),P.document.close()}catch(T){It("iframe blob delivery failed",T),window.location.assign(D)}}},V=L();B(V,_),setTimeout(()=>URL.revokeObjectURL(_),6e4)}}else{Dn();const S=I.output("bloburl"),_=document.createElement("a");_.href=S,_.download=t,_.rel="noopener",_.style.display="none",document.body.appendChild(_),_.click(),setTimeout(()=>{URL.revokeObjectURL(S),_.remove()},2e3)}}function dn(){if(!j||!W)return;const{previewFrame:e}=W;if(!e)return;const t=j.context||"reservation",n=Ao({context:t,reservation:j.reservation,customer:j.customer,project:j.project,crewAssignments:j.crewAssignments,totals:j.totals,totalsDisplay:j.totalsDisplay,rentalDays:j.rentalDays,currencyLabel:j.currencyLabel,sections:j.sections,fieldSelections:j.fields,quoteNumber:j.quoteNumber,quoteDate:j.quoteDateLabel,terms:j.terms,projectCrew:j.projectCrew,projectExpenses:j.projectExpenses,projectEquipment:j.projectEquipment,projectInfo:j.projectInfo,clientInfo:j.clientInfo,paymentSummary:j.paymentSummary,projectTotals:j.projectTotals});Zt("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&(Wr(r),Qr(r,s),Gr(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await xo(i,{context:"preview"}),li(i))}catch(p){console.error("[reservations/pdf] failed to layout preview document",p)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),d=a?.querySelector(".quote-preview-pages"),l=da;let u=18;if(d&&a?.defaultView){const p=a.defaultView.getComputedStyle(d),m=parseFloat(p.rowGap||p.gap||`${u}`);Number.isFinite(m)&&m>=0&&(u=m)}const b=ua,y=c.length?c.length*b+Math.max(0,(c.length-1)*u):b;if(e.dataset.baseWidth=String(l),e.dataset.baseHeight=String(y),e.style.width=`${l}px`,e.style.minWidth=`${l}px`,e.style.height=`${y}px`,e.style.minHeight=`${y}px`,W?.previewFrameWrapper&&!W?.userAdjustedZoom){const p=W.previewFrameWrapper.clientWidth-24;p>0&&p<l?yt=Math.max(p/l,.3):yt=1}_o(yt)}finally{Dn()}},{once:!0})}function _u(e){if(!j)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?j.sections.add(n):j.sections.delete(n),qo(j),Io(),dn())}function ku(e){if(!j)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=j.context||"reservation",r=j.fields||(j.fields=Qa(s)),i=Dd(r,n);t.checked?i.add(a):i.delete(a),qo(j),dn()}function $u(e){if(!j)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(ri(j,n),j.sectionExpansions[n]=t.open)}function Io(){if(!W?.toggles||!j)return;const{toggles:e}=W,t=j.fields||{},n=j.context||"reservation";ri(j);const a=Ka(n),s=ao(n),r=a.map(({id:i,labelKey:c,fallback:d})=>{const l=o(c,d),u=j.sections.has(i),b=s[i]||[],y=Fd(j,i),p=b.length?`<div class="quote-toggle-sublist">
          ${b.map(m=>{const g=si(t,i,m.id),v=u?"":"disabled",I=m.labelKey?o(m.labelKey,m.fallback):m.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${m.id}" ${g?"checked":""} ${v}>
                <span>${w(I)}</span>
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
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",_u)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",ku)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",$u)})}function Pu(){if(W?.modal)return W;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
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
    <span data-quote-status-text>${w(ro("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(y),i?.addEventListener("click",async()=>{if(j){i.disabled=!0;try{await ko()}finally{i.disabled=!1}}});const v=()=>{Ps()||Cs(e)};l.forEach(x=>{x?.addEventListener("click",v)}),d&&!l.includes(d)&&d.addEventListener("click",v),e.addEventListener("click",x=>{Ps()||x.target===e&&Cs(e)}),W={modal:e,toggles:t,preview:n,previewScroll:m,previewFrameWrapper:p,zoomControls:y,zoomValue:y.querySelector("[data-zoom-value]"),previewFrame:b,meta:a,downloadBtn:i,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const I=y.querySelector("[data-zoom-out]"),q=y.querySelector("[data-zoom-in]"),C=y.querySelector("[data-zoom-reset]");return I?.addEventListener("click",()=>Oi(-.1)),q?.addEventListener("click",()=>Oi(.1)),C?.addEventListener("click",()=>ka(1,{markManual:!0})),s&&s.addEventListener("input",Lu),r&&r.addEventListener("click",Tu),ka(yt),W}function ka(e,{silent:t=!1,markManual:n=!1}={}){yt=Math.min(Math.max(e,.25),2.2),n&&W&&(W.userAdjustedZoom=!0),_o(yt),!t&&W?.zoomValue&&(W.zoomValue.textContent=`${Math.round(yt*100)}%`)}function Oi(e){ka(yt+e,{markManual:!0})}function _o(e){if(!W?.previewFrame||!W.previewFrameWrapper)return;const t=W.previewFrame,n=W.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",oi()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function Cu(){if(!W?.meta||!j)return;const{meta:e}=W;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${w(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${w(j.quoteNumber)}</strong></div>
      <div><span>${w(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${w(j.quoteDateLabel)}</strong></div>
    </div>
  `}function di(){if(!W?.termsInput)return;const e=(j?.terms&&j.terms.length?j.terms:Xe).join(`
`);W.termsInput.value!==e&&(W.termsInput.value=e)}function Lu(e){if(!j)return;const t=Is(e?.target?.value??"");if(t.length){j.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{j.terms=[...Xe],di();const n=Xe.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}dn()}function Tu(e){if(e?.preventDefault?.(),!j)return;j.terms=[...Xe];const t=document.getElementById("reservation-terms");t&&(t.value=Xe.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=Xe.join(`
`)),di(),dn()}async function ko(){if(!j)return;Zt("export");const t=!oi()&&mo(),n=Ga(),a=null,s=!n&&t?window.open("","_blank"):null;(d=>{if(d)try{d.document.open(),d.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${w(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${w(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${w(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),d.document.close()}catch(l){It("failed to prime download window",l)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await tu(),ds("html2pdf ensured");const d=j.context||"reservation",l=Ao({context:d,reservation:j.reservation,customer:j.customer,project:j.project,crewAssignments:j.crewAssignments,totals:j.totals,totalsDisplay:j.totalsDisplay,rentalDays:j.rentalDays,currencyLabel:j.currencyLabel,sections:j.sections,fieldSelections:j.fields,quoteNumber:j.quoteNumber,quoteDate:j.quoteDateLabel,terms:j.terms,projectCrew:j.projectCrew,projectExpenses:j.projectExpenses,projectEquipment:j.projectEquipment,projectInfo:j.projectInfo,clientInfo:j.clientInfo,paymentSummary:j.paymentSummary,projectTotals:j.projectTotals});i=document.createElement("div"),i.innerHTML=l,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),Wr(i),Qr(i),Gr(i),ds("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await xo(u,{context:"export"}),await On(u),li(u),ds("layout complete for export document")}catch(y){Ls(y,"layoutQuoteDocument",{suppressToast:!0})}}const b=`quotation-${j.quoteNumber}.pdf`;await Iu(u,{filename:b,safariWindowRef:s,mobileWindowRef:a}),j.sequenceCommitted||(iu(j.quoteSequence),j.sequenceCommitted=!0)}catch(d){Ts({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,Ls(d,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),Dn()}}function $o(){const e=Pu();e?.modal&&(Bn=!1,yt=1,W&&(W.userAdjustedZoom=!1),ka(yt,{silent:!0}),Io(),Cu(),di(),dn(),jd(e.modal))}async function Nu({reservation:e,customer:t,project:n}){if(!e){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}await Au();const a=du(e),{totalsDisplay:s,totals:r,rentalDays:i}=uu(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:d,quoteNumber:l}=ho("reservation"),u=new Date,b=wd();j={context:"reservation",reservation:e,customer:t,project:n,crewAssignments:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(Ka("reservation").filter(y=>y.defaultSelected).map(y=>y.id)),sectionExpansions:ii("reservation"),fields:Qa("reservation"),terms:b,quoteSequence:d,quoteNumber:l,quoteDate:u,quoteDateLabel:Eo(u),sequenceCommitted:!1},So(j),$o()}async function Rp({project:e}){if(!e){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=Eu(e),{project:n}=t;if(!n){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=ho("project"),r=new Date,i=[...Ed];j={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(Ka("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:ii("project"),fields:Qa("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:Eo(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},So(j),$o()}function ju({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=gn(),{reservations:r=[],customers:i=[],technicians:c=[],projects:d=[]}=he(),l=r.map(q=>{const C=ms(q);return{...C,id:q.id??C.id,reservationId:q.reservationId??q.reservation_id??C.reservationId,reservationCode:q.reservationCode??q.reservation_code??C.reservationCode}}),u=l,b=Array.isArray(s)?s:c||[],y=new Map((d||[]).map(q=>[String(q.id),q])),p=document.getElementById(e);if(!p){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!u||u.length===0){p.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const m=t||od(),g=new Map(i.map(q=>[String(q.id),q])),v=new Map(b.map(q=>[String(q.id),q])),I=ud({reservations:l,filters:m,customersMap:g,techniciansMap:v,projectsMap:y});if(I.length===0){p.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}p.innerHTML=`<div class="reservations-grid">${pd({entries:I,customersMap:g,techniciansMap:v,projectsMap:y})}</div>`,p.querySelectorAll('[data-action="details"]').forEach(q=>{const C=Number(q.dataset.reservationIndex);Number.isNaN(C)||q.addEventListener("click",()=>{typeof n=="function"&&n(C)})}),p.querySelectorAll('button[data-action="confirm"]').forEach(q=>{const C=Number(q.dataset.reservationIndex);Number.isNaN(C)||q.addEventListener("click",x=>{x.stopPropagation(),typeof a=="function"&&a(C,x)})})}function Bu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=he(),c=s.map(g=>{const v=ms(g);return{...v,id:g.id??v.id,reservationId:g.reservationId??g.reservation_id??v.reservationId,reservationCode:g.reservationCode??g.reservation_code??v.reservationCode}}),d=s[e];if(!d)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const l=c[e]??ms(d),u=r.find(g=>String(g.id)===String(d.customerId)),b=d.projectId?i.find(g=>String(g.id)===String(d.projectId)):null,y=document.getElementById("reservation-details-body"),p=document.getElementById("reservationDetailsModal"),m=()=>{const g=()=>{p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(p)?.hide()},v=document.getElementById("reservation-details-edit-btn");v&&(v.onclick=()=>{g(),typeof t=="function"&&t(e,{reservation:d,customer:u,getEditContext:a})});const I=document.getElementById("reservation-details-delete-btn");I&&(I.onclick=()=>{g(),typeof n=="function"&&n(e,{reservation:d,customer:u})});const q=y?.querySelector('[data-action="open-project"]');q&&b&&q.addEventListener("click",()=>{g();const x=b?.id!=null?String(b.id):"",H=x?`projects.html?project=${encodeURIComponent(x)}`:"projects.html";window.location.href=H});const C=document.getElementById("reservation-details-export-btn");C&&(C.onclick=async x=>{x?.preventDefault?.(),x?.stopPropagation?.(),C.blur();try{await Nu({reservation:d,customer:u,project:b})}catch(H){console.error("❌ [reservations] export to PDF failed",H),E(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}})};if(y){const g=gn()||[];y.innerHTML=ji(l,u,g,e,b),m(),lr().then(()=>{const v=gn()||[];y.innerHTML=ji(l,u,v,e,b),m()}).catch(()=>{})}return p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(p).show(),!0}function Po(){const e=()=>{xn(),Oe(),gn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let Hi=!1,Vi=null;function Du(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function Mp(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=Du(n);if(!a&&Hi&&Yt().length>0&&s===Vi)return Yt();try{const r=await dr(n||{});return Hi=!0,Vi=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return Yt()}}async function Fu(e,{onAfterChange:t}={}){if(!sn())return Vn(),!1;const a=Yt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await Vc(s),Po(),t?.({type:"deleted",reservation:a}),E(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=ja(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return E(i,"error"),!1}}async function Ru(e,{onAfterChange:t}={}){const a=Yt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=zt(a);if(r)return E(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await Uc(s);return Po(),t?.({type:"confirmed",reservation:i}),E(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=ja(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return E(c,"error"),!1}}function _n(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Mn(e,n),end:Mn(t,a)}}function $a(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ui(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function Co(){const{container:e,select:t,hint:n,addButton:a}=ui();if(!t)return;const s=t.value,r=Yi(),i=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,d=r.map(u=>{const b=Number.isFinite(Number(u.price))?Number(u.price):0,y=h(b.toFixed(2)),p=`${u.name} — ${y} ${i}`;return`<option value="${$a(u.id)}">${$a(p)}</option>`}).join("");t.innerHTML=`${c}${d}`;const l=r.length>0;t.disabled=!l,a&&(a.disabled=!l),e&&(e.hidden=!l,e.setAttribute("aria-hidden",l?"false":"true")),n&&(l?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),l&&s&&r.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function Mu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=Ht(),{start:r,end:i}=_n(),{reservations:c=[]}=he(),d=a!=null&&c[a]||null,l=d?.id??d?.reservationId??null,u=Rr(n,{existingItems:s,start:r,end:i,ignoreReservationId:l});if(!u.success)return t||E(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const b=[...s,u.package];return Vt(a,b),Ot(b),tt(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function Ui(){const{select:e}=ui();if(!e)return;const t=e.value||"";Mu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function zu(){const{addButton:e,select:t}=ui();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{Ui()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Ui())}),t.dataset.listenerAttached="true"),Co()}function Ot(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,Qi(t);return}const d=En(e);t.innerHTML=d.map(l=>{const u=l.items[0]||{},b=on(u)||l.image,y=b?`<img src="${b}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',p=l.items.some(P=>P?.type==="package"),m=h(String(l.count)),g=je(l.unitPrice),v=Number.isFinite(g)?Se(g):0,I=je(l.totalPrice),q=Number.isFinite(I)?I:v*(Number.isFinite(l.count)?l.count:1),C=Se(q),x=`${h(v.toFixed(2))} ${a}`,H=`${h(C.toFixed(2))} ${a}`,S=l.barcodes.map(P=>h(String(P||""))).filter(Boolean),_=S.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${S.map(P=>`<li>${P}</li>`).join("")}
            </ul>
          </details>`:"";let L="";if(p){const P=new Map,D=T=>{const N=Number.parseFloat(h(String(T??"")).replace(/[^0-9.]/g,""));return!Number.isFinite(N)||N<=0||N>99?1:Math.round(N)},J=[];if(Array.isArray(l.packageItems)&&l.packageItems.length&&J.push(...l.packageItems),l.items.forEach(T=>{Array.isArray(T?.packageItems)&&J.push(...T.packageItems)}),J.forEach(T=>{if(!T)return;const N=ne(T.barcode||T.normalizedBarcode||T.desc||Math.random());if(!N)return;const k=P.get(N),X=D(T.qtyPerPackage??T.perPackageQty??T.quantityPerPackage??T.qty??T.quantity??1),O=Math.max(1,Math.min(X,99));if(k){k.qty=O;return}P.set(N,{desc:T.desc||T.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:O,barcode:T.barcode??T.normalizedBarcode??""})}),P.size){const T=Array.from(P.values()).map(N=>{const k=h(String(N.qty>0?Math.min(N.qty,99):1)),X=$a(N.desc||""),O=N.barcode?` <span class="reservation-package-items__barcode">(${$a(h(String(N.barcode)))})</span>`:"";return`<li>${X}${O} × ${k}</li>`}).join("");L=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${T}
              </ul>
            </details>
          `}}const B=p?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",V=p?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${l.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${y}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${l.description||"-"}</div>
                ${p?`${L||""}${_||""}`:_}
              </div>
            </div>
          </td>
          <td>
            <div class="${B}" data-group-key="${l.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${l.key}" aria-label="${i}"${V}>−</button>
              <span class="reservation-qty-value">${m}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${l.key}" aria-label="${r}"${V}>+</button>
            </div>
          </td>
          <td>${x}</td>
          <td>${H}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${l.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),Qi(t)}function Ou(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function Wa(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=Xa();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,Ki();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${h(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${h(Number(s.percentage).toFixed(2))}%`:"—",d=s?.recordedAt?h(Ze(s.recordedAt)):"—",l=Ou(s?.type),u=s?.note?h(s.note):"";return`
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
  `,Ki()}function Hu(){if(Hn()){E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=No(e);let a=jo(t);if(!Number.isFinite(a)||a<=0){E(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=fs.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,d=o("reservations.create.summary.currency","SR");let l=null,u=null;if(n==="percent"){const y=Math.max(0,100-i);if(y<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const p=Math.min(a,y);if(p!==a){const m=h(p.toFixed(2));E(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",m)),a=p}u=Number(a.toFixed(2)),r>0&&(l=a/100*r)}else{const y=Math.max(0,r-c);if(y<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const p=Math.min(a,y);if(p!==a){const m=`${h(p.toFixed(2))} ${d}`;E(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",m)),a=p}l=Number(a.toFixed(2)),r>0&&(u=l/r*100)}l!=null&&(l=Number(l.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const b={type:n,value:a,amount:l,percentage:u,recordedAt:new Date().toISOString()};tp(b),pi(Xa()),Wa(),tt(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),E(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function Ki(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(Hn()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Hu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(Hn()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(np(s),pi(Xa()),Wa(),tt(),E(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function Vu(e){const{index:t,items:n}=Ht(),s=En(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,d)=>d!==r);Vt(t,i),Ot(i),tt()}function Uu(e){const{index:t,items:n}=Ht(),a=n.filter(s=>Na(s)!==e);a.length!==n.length&&(Vt(t,a),Ot(a),tt())}function Ku(e){const{index:t,items:n}=Ht(),s=En(n).find(v=>v.key===e);if(!s||s.items.some(v=>v?.type==="package"))return;const{start:r,end:i}=_n();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=he(),d=t!=null&&c[t]||null,l=d?.id??d?.reservationId??null,u=new Set(n.map(v=>ne(v.barcode))),{equipment:b=[]}=he(),y=(b||[]).find(v=>{const I=ne(v?.barcode);return!I||u.has(I)||Na({desc:v?.desc||v?.description||v?.name||"",price:Number(v?.price)||0})!==e||!br(v)?!1:!gt(I,r,i,l)});if(!y){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const p=ne(y.barcode),m=rn(y);if(!m){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:m,equipmentId:m,barcode:p,desc:y.desc||y.description||y.name||s.description||"",qty:1,price:Number.isFinite(Number(y.price))?Number(y.price):s.unitPrice,image:on(y)}];Vt(t,g),Ot(g),tt()}function Qi(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){Vu(s);return}if(a==="increase-edit-group"&&s){Ku(s);return}if(a==="remove-edit-group"&&s){Uu(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||Wu(i)}}),e.dataset.groupListenerAttached="true")}function Hn(){return!!document.getElementById("edit-res-project")?.value}function Qu(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{Hn()&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function Gu(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),d=document.getElementById("edit-res-payment-history");[n,a,s,r,i,c,d].forEach(Qu),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s&&(s.value="unpaid",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),d&&(d.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.dataset.linkedDisabled="false"))}function tt(){const e=document.getElementById("edit-res-summary");if(!e)return;Wa();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),Ye(a),tt()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=Hn();Gu(c);const d=document.getElementById("edit-res-tax"),l=c?!1:d?.checked||!1,u=!c&&a?.dataset?.userSelected==="true",b=c?"unpaid":u&&a?.value||"unpaid";let y=null;!c&&l&&(rt("edit-res-company-share"),y=vn("edit-res-company-share"),(!Number.isFinite(y)||y<=0)&&(rt("edit-res-company-share"),y=vn("edit-res-company-share")));const{items:p=[],payments:m=[]}=Ht(),{start:g,end:v}=_n(),I=fs({items:p,discount:r,discountType:i,applyTax:l,paidStatus:b,start:g,end:v,companySharePercent:y,paymentHistory:m});e.innerHTML=I;const q=fs.lastResult;if(q&&a){const C=q.paymentStatus;u?Ye(a,a.value):(a.value!==C&&(a.value=C),a.dataset&&delete a.dataset.userSelected,Ye(a,C))}else a&&Ye(a,a.value)}function Wu(e){if(e==null)return;const{index:t,items:n}=Ht();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);Vt(t,a),Ot(a),tt()}function Xu(e){const t=e?.value??"",n=ne(t);if(!n)return;const a=Da(n);if(!a){E(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=_t(a);if(s==="maintenance"||s==="retired"){E(an(s));return}const r=ne(n),{index:i,items:c=[]}=Ht();if(c.findIndex(v=>ne(v.barcode)===r)>-1){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:l,end:u}=_n();if(!l||!u){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:b=[]}=he(),y=i!=null&&b[i]||null,p=y?.id??y?.reservationId??null;if(gt(r,l,u,p)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=rn(a);if(!m){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:m,equipmentId:m,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];Vt(i,g),e&&(e.value=""),Ot(g),tt()}function Pa(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=jr(t),a=ne(n?.barcode||t);if(!n||!a){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=_t(n);if(s==="maintenance"||s==="retired"){E(an(s));return}const{start:r,end:i}=_n();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:d=[]}=Ht();if(d.some(g=>ne(g.barcode)===a)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=he(),b=c!=null&&u[c]||null,y=b?.id??b?.reservationId??null;if(gt(a,r,i,y)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const p=rn(n);if(!p){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const m=[...d,{id:p,equipmentId:p,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];Vt(c,m),Ot(m),tt(),e.value=""}function Lo(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Pa(e))});const t=()=>{Br(e.value,"edit-res-equipment-description-options")&&Pa(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{tt()});const e=()=>{zu()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{Co()})}typeof window<"u"&&(window.getEditReservationDateRange=_n,window.renderEditPaymentHistory=Wa);function Ju(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){ws(e);return}Pa(e)}}function zp(){Mt(),Lo()}function Yu(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let bn=null,ft=[],bt=[],Ns=null,Ue={},us=!1;const Zu="__DEBUG_CREW__";function ep(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(Zu);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function Gi(e,t){if(ep())try{console.log(`🪵 [crew-debug:edit] ${e}`,t)}catch{}}function Fn(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function pa(){return document.getElementById("edit-res-confirmed")?.value==="true"}function Ht(){return{index:bn,items:ft,payments:bt}}function Vt(e,t,n=bt){bn=typeof e=="number"?e:null,ft=Array.isArray(t)?[...t]:[],bt=Array.isArray(n)?[...n]:[]}function To(){bn=null,ft=[],Gc(),bt=[]}function Xa(){return[...bt]}function pi(e){bt=Array.isArray(e)?[...e]:[]}function tp(e){e&&(bt=[...bt,e])}function np(e){!Number.isInteger(e)||e<0||(bt=bt.filter((t,n)=>n!==e))}function Rn(e,t=1){const n=Number.parseFloat(h(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function js(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(h(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function ap(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?ne(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:Rn(e.qty??e.quantity??e.count??1),price:js(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function sp(e,t=0){if(!e||typeof e!="object")return null;const n=zn(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=Rn(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),r=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:Rs(e)).map(y=>ap(y)).filter(Boolean),i=e.total_price??e.totalPrice??e.total??null;let c=js(e.unit_price??e.unitPrice??e.price??null,0);if((!c||c===0)&&i!=null){const y=js(i,0);y>0&&a>0&&(c=Number((y/a).toFixed(2)))}const d=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,d,n].find(y=>y!=null&&String(y).trim()!=="")||`Package ${n}`,b=e.image??e.cover??e.thumbnail??r.find(y=>y?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:h(String(u)),name:h(String(u)),qty:a,price:c,barcode:d,packageItems:r,image:b}}function ip(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const r=s-n;e.set(a,r>0?r:0)})}function rp(e={},t=[]){const n=Array.isArray(t)?t.map(c=>({...c})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((c,d)=>sp(c,d)).filter(Boolean);if(!s.length)return n;const r=new Map;s.forEach(c=>{const d=Rn(c.qty??c.quantity??1);if(c.barcode){const l=ne(c.barcode);if(l){const u=`package::${l}`;r.set(u,(r.get(u)??0)+d)}}(c.packageItems||[]).forEach(l=>{if(!l)return;const u=d*Rn(l.qty??l.quantity??1),b=l.equipmentId??null,y=l.normalizedBarcode||(l.barcode?ne(l.barcode):null);if(b!=null){const p=`equipment::${String(b)}`;r.set(p,(r.get(p)??0)+u)}if(y){const p=`barcode::${y}`;r.set(p,(r.get(p)??0)+u)}})});const i=[];return n.forEach(c=>{if(!c||typeof c!="object"){i.push(c);return}if(c.type==="package"){const v=zn(c.packageId??c.package_id??c.id??"");s.some(q=>q.packageId===v)||i.push({...c});return}const d=Rn(c.qty??c.quantity??1),l=rn(c),u=c.barcode?ne(c.barcode):null,b=[];l!=null&&b.push(`equipment::${String(l)}`),u&&b.push(`barcode::${u}`);const y=b.map(v=>r.get(v)??0).filter(v=>v>0);if(!y.length){i.push({...c});return}const p=Math.min(...y);if(p<=0){i.push({...c});return}const m=Math.min(p,d);if(ip(r,b,m),m>=d)return;const g=d-m;i.push({...c,qty:g,quantity:g})}),[...i,...s.map(c=>({...c}))]}function op(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function No(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function jo(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function cp(e,t){if(e){e.value="";return}}function Tn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Bo(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),d=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,l=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:d,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:l}}function lp(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((d,l)=>String(l.createdAt||l.start||"").localeCompare(String(d.createdAt||d.start||""))):[],c=[`<option value="">${Tn(a)}</option>`];i.forEach(d=>{c.push(`<option value="${Tn(d.id)}">${Tn(d.title||a)}</option>`)}),r&&!i.some(d=>String(d.id)===r)&&c.push(`<option value="${Tn(r)}">${Tn(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function Do(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const d=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",d&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}Bs("tax");const c=Ue?.updateEditReservationSummary;typeof c=="function"&&c()}function Bs(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=Ue?.updateEditReservationSummary;typeof r=="function"&&r()};if(us){a();return}us=!0;const s=()=>{us=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(Dt)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),rt("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?rt("edit-res-company-share"):n.checked&&(n.checked=!1));s()}async function Wi(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:d}=he(),u=Yt()?.[e];if(!u){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}Ue={...Ue,reservation:u,projects:d||[]},t?.(),lp(d||[],u);const b=u.projectId&&d?.find?.($=>String($.id)===String(u.projectId))||null,{effectiveConfirmed:y,projectLinked:p}=zt(u,b),m=u.items?u.items.map($=>({...$,equipmentId:$.equipmentId??$.equipment_id??$.id,barcode:ne($?.barcode)})):[],g=rp(u,m),I=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map($=>Bo($)).filter(Boolean);Vt(e,g,I);const q=o("reservations.list.unknownCustomer","غير معروف"),C=c?.find?.($=>String($.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const x=document.getElementById("edit-res-id");x&&(x.value=u.reservationId||u.id);const H=document.getElementById("edit-res-customer");H&&(H.value=C?.customerName||q);const S=typeof a=="function"?a(u.start):{date:"",time:""},_=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",S.date),n?.("edit-res-start-time",S.time),n?.("edit-res-end",_.date),n?.("edit-res-end-time",_.time);const L=document.getElementById("edit-res-notes");L&&(L.value=u.notes||"");const B=document.getElementById("edit-res-discount");if(B){const $=p?0:u.discount??0;B.value=h($)}const V=document.getElementById("edit-res-discount-type");V&&(V.value=p?"percent":u.discountType||"percent");const P=u.projectId?!1:!!u.applyTax,D=document.getElementById("edit-res-tax");D&&(D.checked=P);const J=document.getElementById("edit-res-company-share");if(J){const $=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,z=$!=null?Number.parseFloat(h(String($).replace("%","").trim())):NaN,Q=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,ae=Q!=null?Q===!0||Q===1||Q==="1"||String(Q).toLowerCase()==="true":Number.isFinite(z)&&z>0,ue=ae&&Number.isFinite(z)&&z>0?z:Dt,se=P||ae;J.checked=se,J.dataset.companyShare=String(ue)}Fn(y,{disable:p});const T=document.getElementById("edit-res-paid"),N=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");T&&(T.value=N,T.dataset&&delete T.dataset.userSelected);const k=document.getElementById("edit-res-payment-progress-type"),X=document.getElementById("edit-res-payment-progress-value");k?.dataset?.userSelected&&delete k.dataset.userSelected,k&&(k.value="percent"),cp(X);const O=document.getElementById("edit-res-cancelled");if(O){const $=String(u?.status||u?.reservationStatus||"").toLowerCase();O.checked=["cancelled","canceled"].includes($),O.checked&&Fn(y,{disable:!0})}let F=Array.isArray(u.crewAssignments)&&u.crewAssignments.length?u.crewAssignments:Array.isArray(u.techniciansDetails)&&u.techniciansDetails.length?u.techniciansDetails:(u.technicians||[]).map($=>String($));if(!Array.isArray(F)||F.length===0){const $=Wc(u.id??u.reservationId??u.reservation_code??null);Array.isArray($)&&$.length&&(F=$)}try{await lr()}catch($){console.warn("[reservationsEdit] positions load failed (non-fatal)",$)}if(Xc(F),s?.(g),typeof window<"u"){const $=window?.renderEditPaymentHistory;typeof $=="function"&&$()}Do(),r?.();const K=document.getElementById("editReservationModal");Ns=op(K,i),Ns?.show?.()}async function dp({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:r,populateEquipmentDescriptionLists:i,handleReservationsMutation:c}={}){if(bn===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const d=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),b=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",y=document.getElementById("edit-res-notes")?.value||"",p=h(document.getElementById("edit-res-discount")?.value||"0");let m=parseFloat(p)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const v=pa(),I=document.getElementById("edit-res-paid"),q=I?.dataset?.userSelected==="true",C=q&&I?.value||"unpaid",x=document.getElementById("edit-res-payment-progress-type"),H=document.getElementById("edit-res-payment-progress-value"),S=No(x),_=jo(H),L=document.getElementById("edit-res-project")?.value||"",V=document.getElementById("edit-res-cancelled")?.checked===!0,P=Kc();P.map(A=>A?.technicianId).filter(Boolean);const D=document.getElementById("edit-res-company-share"),J=document.getElementById("edit-res-tax");if(!d||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const T=typeof e=="function"?e:(A,Z)=>`${A}T${Z||"00:00"}`,N=T(d,l),k=T(u,b);if(N&&k&&new Date(N)>new Date(k)){E(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const O=Yt()?.[bn];if(!O){E(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(ft)||ft.length===0&&P.length===0){E(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const F=typeof t=="function"?t:()=>!1,K=O.id??O.reservationId;for(const A of ft){if(A?.type==="package"&&Array.isArray(A.packageItems)){for(const Y of A.packageItems){const le=Y?.barcode??Y?.normalizedBarcode??"";if(!le)continue;const oe=_t(le);if(oe==="reserved"){const Re=ne(le);if(!F(Re,N,k,K))continue}if(oe!=="available"){E(an(oe));return}}continue}const Z=_t(A.barcode);if(Z==="reserved"){const Y=ne(A.barcode);if(!F(Y,N,k,K))continue}if(Z!=="available"){E(an(Z));return}}for(const A of ft){if(A?.type==="package"&&Array.isArray(A.packageItems)){for(const Y of A.packageItems){const le=ne(Y?.barcode??Y?.normalizedBarcode??"");if(le&&F(le,N,k,K)){const oe=Y?.desc||Y?.barcode||o("reservations.create.packages.unnamedItem","معدة بدون اسم"),Re=`${o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${h(String(oe))})`;E(Re);return}}continue}const Z=ne(A.barcode);if(F(Z,N,k,K)){E(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const $=typeof n=="function"?n:()=>!1;for(const A of ft){if(A?.type!=="package")continue;const Z=A.packageId??A.package_id??null;if(Z&&$(Z,N,k,K)){const Y=A.desc||A.packageName||o("reservations.create.packages.genericName","الحزمة");E(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${h(String(Y))} محجوزة بالفعل في الفترة المختارة`));return}}const z=typeof a=="function"?a:()=>!1;for(const A of P)if(A?.technicianId&&z(A.technicianId,N,k,K)){E(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const Q=Array.isArray(Ue.projects)&&Ue.projects.length?Ue.projects:he().projects||[],ae=L&&Q.find(A=>String(A.id)===String(L))||null,ue={...O,projectId:L?String(L):null,confirmed:v},{effectiveConfirmed:se,projectLinked:U,projectStatus:pe}=zt(ue,ae);let we=!!D?.checked,ve=!!J?.checked;if(U&&(we&&(D.checked=!1,we=!1),ve=!1),!U&&we!==ve){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}ve&&(rt("edit-res-company-share"),we=!!D?.checked);let qe=we?getCompanySharePercent("edit-res-company-share"):null;we&&(!Number.isFinite(qe)||qe<=0)&&(rt("edit-res-company-share"),qe=getCompanySharePercent("edit-res-company-share"));const G=we&&ve&&Number.isFinite(qe)&&qe>0,ie=U?!1:ve;U&&(m=0,g="percent");const be=zs(ft,m,g,ie,P,{start:N,end:k,companySharePercent:G?qe:0});let Ee=Xa();if(Number.isFinite(_)&&_>0){const A=be;let Z=null,Y=null;S==="amount"?(Z=_,A>0&&(Y=_/A*100)):(Y=_,A>0&&(Z=_/100*A));const le=Bo({type:S,value:_,amount:Z,percentage:Y,recordedAt:new Date().toISOString()});le&&(Ee=[...Ee,le],pi(Ee)),H&&(H.value="")}const _e=Os({totalAmount:be,history:Ee}),Te=Hs({manualStatus:C,paidAmount:_e.paidAmount,paidPercent:_e.paidPercent,totalAmount:be});I&&!q&&(I.value=Te,I.dataset&&delete I.dataset.userSelected);let de=O.status??"pending";U?de=ae?.status??pe??de:V?de="cancelled":["completed","cancelled"].includes(String(de).toLowerCase())||(de=v?"confirmed":"pending");const Ke=ir({reservationCode:O.reservationCode??O.reservationId??null,customerId:O.customerId,start:N,end:k,status:de,title:O.title??null,location:O.location??null,notes:y,projectId:L?String(L):null,totalAmount:be,discount:m,discountType:g,applyTax:ie,paidStatus:Te,confirmed:se,items:ft.map(A=>({...A,equipmentId:A.equipmentId??A.id})),crewAssignments:P,companySharePercent:G?qe:null,companyShareEnabled:G,paidAmount:_e.paidAmount,paidPercentage:_e.paidPercent,paymentProgressType:_e.paymentProgressType,paymentProgressValue:_e.paymentProgressValue,paymentHistory:Ee});try{Gi("about to submit",{editingIndex:bn,crewAssignments:P,techniciansPayload:Ke?.technicians,payload:Ke});const A=await Qc(O.id||O.reservationId,Ke);Gi("server response",{reservation:A?.id??A?.reservationId??A?.reservation_code,technicians:A?.technicians,crewAssignments:A?.crewAssignments,techniciansDetails:A?.techniciansDetails}),await dr(),xn(),Oe(),E(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),To(),c?.({type:"updated",reservation:A}),r?.(),i?.(),Ns?.hide?.()}catch(A){console.error("❌ [reservationsEdit] Failed to update reservation",A);const Z=ja(A)?A.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");E(Z,"error")}}function Op(e={}){Ue={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=Ue,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=h(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{Bs("tax")}),c.dataset.listenerAttached="true");const d=document.getElementById("edit-res-company-share");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{Bs("share")}),d.dataset.listenerAttached="true");const l=document.getElementById("edit-res-payment-progress-type");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{l.dataset.userSelected="true",t?.()}),l.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const b=document.getElementById("edit-res-project");b&&!b.dataset.listenerAttached&&(b.addEventListener("change",()=>{Do();const I=Array.isArray(Ue.projects)&&Ue.projects.length?Ue.projects:he().projects||[],q=b.value&&I.find(_=>String(_.id)===String(b.value))||null,x={...Ue?.reservation??{},projectId:b.value||null,confirmed:pa()},{effectiveConfirmed:H,projectLinked:S}=zt(x,q);Fn(H,{disable:S}),t?.()}),b.dataset.listenerAttached="true");const y=document.getElementById("edit-res-confirmed-btn");y&&!y.dataset.listenerAttached&&(y.addEventListener("click",()=>{if(y.disabled)return;const I=!pa();Fn(I),t?.()}),y.dataset.listenerAttached="true");const p=document.getElementById("edit-res-cancelled");p&&!p.dataset.listenerAttached&&(p.addEventListener("change",()=>{document.getElementById("edit-res-confirmed-btn")&&Fn(pa(),{disable:p.checked}),t?.()}),p.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{dp(Ue).catch(I=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",I)})}),m.dataset.listenerAttached="true");const g=document.getElementById("edit-res-equipment-barcode");if(g&&!g.dataset.listenerAttached){let I=null;const q=()=>{g.value?.trim()&&(clearTimeout(I),I=null,n?.(g))};g.addEventListener("keydown",x=>{x.key==="Enter"&&(x.preventDefault(),q())});const C=()=>{if(clearTimeout(I),!g.value?.trim())return;const{start:x,end:H}=getEditReservationDateRange();!x||!H||(I=setTimeout(()=>{q()},150))};g.addEventListener("input",C),g.addEventListener("change",q),g.dataset.listenerAttached="true"}Lo?.();const v=document.getElementById("editReservationModal");v&&!v.dataset.cleanupAttached&&(v.addEventListener("hidden.bs.modal",()=>{To(),t?.(),s?.([])}),v.dataset.cleanupAttached="true")}const up=he()||{};let it=(up.projects||[]).map(Mo),Gn=!1;function pp(){return it}function Wn(e){it=Array.isArray(e)?e.map(mi):[],La({projects:it});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return it}async function Fo(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,d])=>{d==null||d===""||t.set(c,String(d))});const n=t.toString(),s=(await ot(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(Ja);return Wn(i),Gn=!0,it}async function Ro({force:e=!1,params:t=null}={}){if(!e&&Gn&&it.length>0)return it;try{return await Fo(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),it}}async function mp(e){const t=await ot("/projects/",{method:"POST",body:e}),n=Ja(t?.data??{}),a=[...it,n];return Wn(a),Gn=!0,n}async function fp(e,t){const n=await ot(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=Ja(n?.data??{}),s=it.map(r=>String(r.id)===String(e)?a:r);return Wn(s),Gn=!0,a}async function yp(e){await ot(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=it.filter(n=>String(n.id)!==String(e));Wn(t),Gn=!0}function bp({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:d,paymentStatus:l,equipmentEstimate:u=0,expenses:b=[],taxAmount:y=0,totalWithTax:p=0,discount:m=0,discountType:g="percent",companyShareEnabled:v=!1,companySharePercent:I=null,companyShareAmount:q=0,paidAmount:C=null,paidPercentage:x=null,paymentProgressType:H=null,paymentProgressValue:S=null,confirmed:_=!1,technicians:L=[],equipment:B=[],payments:V,paymentHistory:P}={}){const D=Array.isArray(L)?L.map($=>Number.parseInt(String($),10)).filter($=>Number.isInteger($)&&$>0):[],J=Array.isArray(B)?B.map($=>{const z=Number.parseInt(String($.equipmentId??$.equipment_id??$.id??0),10),Q=Number.parseInt(String($.qty??$.quantity??0),10);return!Number.isInteger(z)||z<=0?null:{equipment_id:z,quantity:Number.isInteger(Q)&&Q>0?Q:1}}).filter(Boolean):[],T=Array.isArray(b)?b.map($=>{const z=Number.parseFloat($?.amount??$?.value??0)||0,Q=($?.label??$?.name??"").trim();return Q?{label:Q,amount:Math.round(z*100)/100}:null}).filter(Boolean):[],N=T.reduce(($,z)=>$+(z?.amount??0),0),k={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!d,payment_status:l??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(N*100)/100,tax_amount:Math.round((Number.parseFloat(y)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(p)||0)*100)/100,confirmed:!!_,technicians:D,equipment:J,expenses:T},X=Math.max(0,Number.parseFloat(m)||0);k.discount=X,k.discount_type=g==="amount"?"amount":"percent";const O=Number.parseFloat(I),F=!!v&&Number.isFinite(O)&&O>0;k.company_share_enabled=F,k.company_share_percent=F?O:0,k.company_share_amount=F?Math.max(0,Number.parseFloat(q)||0):0,Number.isFinite(Number(C))&&(k.paid_amount=Math.max(0,Number.parseFloat(C)||0)),Number.isFinite(Number(x))&&(k.paid_percentage=Math.max(0,Number.parseFloat(x)||0)),(H==="amount"||H==="percent")&&(k.payment_progress_type=H),S!=null&&S!==""&&(k.payment_progress_value=Number.parseFloat(S)||0),e&&(k.project_code=String(e).trim());const K=V!==void 0?V:P;if(K!==void 0){const $=zo(K)||[];k.payments=$.map(z=>({type:z.type,amount:z.amount!=null?z.amount:null,percentage:z.percentage!=null?z.percentage:null,value:z.value!=null?z.value:null,note:z.note??null,recorded_at:z.recordedAt??null}))}return k.end_datetime||delete k.end_datetime,k.client_company||(k.client_company=null),k}function Ja(e={}){return mi(e)}function Mo(e={}){return mi(e)}function mi(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(p=>{if(p==null)return null;if(typeof p=="object"){const m=p.id??p.technician_id??p.technicianId;return m!=null?String(m):null}return String(p)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(p=>{const m=p?.equipment_id??p?.equipmentId??p?.id??null,g=p?.quantity??p?.qty??0,v=p?.barcode??p?.code??"",I=p?.description??p?.name??"";return{equipmentId:m!=null?String(m):null,qty:Number.parseInt(String(g),10)||0,barcode:v,description:I}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((p,m)=>({id:p?.id??`expense-${t??"x"}-${m}`,label:p?.label??"",amount:Number.parseFloat(p?.amount??0)||0})),d=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,l=e.company_share_enabled??e.companyShareEnabled,u=l!=null?l===!0||l===1||String(l).toLowerCase()==="true":d>0,b=e.payment_history??e.paymentHistory??e.payments??null,y=zo(b);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?d:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(p=>typeof p=="object"?p:{id:p}),equipment:r,expenses:c,paymentHistory:y}}function gp(e){return e instanceof Xi}function ps(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function hp(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=ps(e.value);let s=ps(e.amount),r=ps(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,d=e.recordedAt??e.recorded_at??e.date??null;let l=null;if(d){const b=new Date(d);Number.isNaN(b.getTime())||(l=b.toISOString())}l||(l=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:l}}function zo(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>hp(t)).filter(Boolean):[]}const Hp=Object.freeze(Object.defineProperty({__proto__:null,buildProjectPayload:bp,createProjectApi:mp,deleteProjectApi:yp,ensureProjectsLoaded:Ro,getProjectsState:pp,isApiError:gp,mapLegacyProject:Mo,mapProjectFromApi:Ja,refreshProjectsFromApi:Fo,setProjectsState:Wn,updateProjectApi:fp},Symbol.toStringTag,{value:"Module"})),Ca="reservations-ui:ready",Xt=typeof EventTarget<"u"?new EventTarget:null;let Jt={};function vp(e){return Object.freeze({...e})}function qp(){if(!Xt)return;const e=Jt,t=typeof CustomEvent=="function"?new CustomEvent(Ca,{detail:e}):{type:Ca,detail:e};typeof Xt.dispatchEvent=="function"&&Xt.dispatchEvent(t)}function Sp(e={}){if(!e||typeof e!="object")return Jt;const t={...Jt};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),Jt=vp(t),qp(),Jt}function Ep(e){if(e)return Jt?.[e]}function Vp(e){const t=Ep(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const i=(s?.detail||Jt)?.[e];typeof i=="function"&&(Xt&&Xt.removeEventListener(Ca,a),n(i))};Xt&&Xt.addEventListener(Ca,a)})}function Up(){return Ro().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=he()||{};Jc(e||[]),Hr()})}function fi(e=null){Hr(),Oo(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function wp(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Ds(){return{populateEquipmentDescriptionLists:Mt,setFlatpickrValue:Yu,splitDateTime:er,renderEditItems:Ot,updateEditReservationSummary:tt,addEquipmentByDescription:Ju,addEquipmentToEditingReservation:Xu,addEquipmentToEditingByDescription:Pa,combineDateTime:Mn,hasEquipmentConflict:gt,hasTechnicianConflict:sr,renderReservations:Oo,handleReservationsMutation:fi,ensureModal:wp}}function Oo(e="reservations-list",t=null){ju({containerId:e,filters:t,onShowDetails:Ho,onConfirmReservation:Uo})}function Ho(e){return Bu(e,{getEditContext:Ds,onEdit:(t,{reservation:n})=>{Ko(t,n)},onDelete:Vo})}function Vo(e){return sn()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?Fu(e,{onAfterChange:fi}):!1:(Vn(),!1)}function Uo(e){return Ru(e,{onAfterChange:fi})}function Ko(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}Wi(e,Ds());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}Wi(e,Ds());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}Tc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Kp(){Sp({showReservationDetails:Ho,deleteReservation:Vo,confirmReservation:Uo,openReservationEditor:Ko})}export{wl as $,Fo as A,Kp as B,Ro as C,Fp as D,yp as E,mp as F,$p as G,Op as H,Up as I,zp as J,kp as K,fi as L,Tp as M,Hr as N,Lp as O,Np as P,tt as Q,Ds as R,ye as S,Vo as T,Uo as U,Ko as V,Yu as W,An as X,il as Y,ba as Z,Ip as _,Oe as a,_p as a0,Hp as a1,ji as b,Qr as c,Gr as d,Mp as e,Oo as f,Vr as g,Ep as h,bp as i,Sp as j,Ho as k,jp as l,Ja as m,Bp as n,pp as o,gp as p,md as q,Kn as r,Wr as s,Ur as t,fp as u,Dp as v,Vp as w,Rp as x,Pp as y,Cp as z};
