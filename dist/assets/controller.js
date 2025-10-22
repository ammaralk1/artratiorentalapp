import{n as h,d as ue,f as lc,t as o,b as st,h as S,j as Ht,o as _n,s as ys,A as Tr,z as dc,k as Oe,B as Nr,u as uc}from"./auth.js";import{n as te,A as rt,B as jr,C as mc,D as gt,E as gs,z as De,F as ir,G as En,H as xn,I as oa,J as pc,h as bs,K as it,L as hs,M as nn,N as Cr,O as fc,P as yc,Q as gc,R as bc,S as zt,T as Vn,U as hc,V as ca,W as Lr,X as vc,Y as Br,w as vs,j as qs,k as Ss,Z as Fr,_ as qc,s as $n,c as la,$ as Dr,a0 as Sc,a1 as Rr,a2 as Ec,x as Es,e as At,a3 as xs,q as da,a4 as ut,a5 as Ae,a6 as xc,a as Mr,g as Lt,a7 as wc,a8 as Ac,a9 as za,aa as Ic,y as kc,ab as _c,ac as $c,b as Pc}from"./reservationsService.js";const Ca="select.form-select:not([data-no-enhance]):not([multiple])",ot=new WeakMap;let La=null,or=!1,mt=null;function Xu(e=document){e&&(e.querySelectorAll(Ca).forEach(t=>Rn(t)),!La&&e===document&&(La=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(Ca)&&Rn(a),a.querySelectorAll?.(Ca).forEach(s=>Rn(s)))})}),La.observe(document.body,{childList:!0,subtree:!0})),or||(or=!0,document.addEventListener("pointerdown",jc,{capture:!0})))}function Dn(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){Rn(e);return}const t=e.closest(".enhanced-select");t&&(ws(t),Un(t),Oa(t))}function Rn(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){Dn(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};ot.set(t,r),a.addEventListener("click",()=>Nc(t)),a.addEventListener("keydown",i=>Cc(i,t)),s.addEventListener("click",i=>Bc(i,t)),s.addEventListener("keydown",i=>Lc(i,t)),e.addEventListener("change",()=>{Un(t),Hr(t)}),r.observer=new MutationObserver(i=>{let c=!1,d=!1;for(const l of i)l.type==="attributes"&&l.attributeName==="disabled"&&(d=!0),l.type==="childList"&&(c=!0);d&&Oa(t),c&&Tc(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),ws(t),Un(t),Oa(t)}function Tc(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,ws(t),Un(t)})))}function ws(e){const t=ot.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),Hr(e)}function Un(e){const t=ot.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function Hr(e){const t=ot.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function Oa(e){const t=ot.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function Nc(e){ot.get(e)&&(e.getAttribute("data-open")==="true"?an(e):zr(e))}function zr(e){const t=ot.get(e);if(!t)return;mt&&mt!==e&&an(mt,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),mt=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function an(e,{focusTrigger:t=!0}={}){const n=ot.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),mt===e&&(mt=null))}function jc(e){if(!mt)return;const t=e.target;t instanceof Node&&(mt.contains(t)||an(mt,{focusTrigger:!1}))}function Cc(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),zr(t)):n==="Escape"&&an(t)}function Lc(e,t){const n=e.key,a=ot.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&Or(i,t)}else n==="Escape"&&(e.preventDefault(),an(t))}function Bc(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&Or(n,t)}function Or(e,t){const n=ot.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),an(t)}const sn=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let pt=null;function As(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function Vr(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function Fc(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function Dc(e={}){const t=Fc({...e,activatedAt:Date.now()});return pt=t,Vr(!0,t.mode||"create"),As(sn.change,{active:!0,selection:{...t}}),t}function Kn(e="manual"){if(!pt)return;const t=pt;pt=null,Vr(!1),As(sn.change,{active:!1,previous:t,reason:e})}function Ur(){return!!pt}function Rc(){return pt?{...pt}:null}function Mc(e){if(!pt)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=h(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:r,description:i}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const d=c.map(u=>h(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!d.length)return!1;const l=Number.isInteger(s)&&s>0?s:d.length;t={barcodes:d,quantity:Math.min(l,d.length)},r&&(t.groupKey=r),i&&(t.description=i)}else return!1;return As(sn.requestAdd,{...t,selection:{...pt}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||Kn("tab-changed")});const Hc=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),zc=new Set(["maintenance","reserved","retired"]);function Oc(e){const t=String(e??"").trim().toLowerCase();return t&&Hc.get(t)||"available"}function Vc(e){return e?typeof e=="object"?e:ua(e):null}function bt(e){const t=Vc(e);return t?Oc(t.status||t.state||t.statusLabel||t.status_label):"available"}function Is(e){return!zc.has(bt(e))}function Ot(e={}){return e.image||e.imageUrl||e.img||""}function Uc(e){if(!e)return null;const t=te(e),{equipment:n=[]}=ue();return(n||[]).find(a=>te(a?.barcode)===t)||null}function ua(e){const t=te(e);if(!t)return null;const{equipment:n=[]}=ue();return(n||[]).find(a=>te(a?.barcode)===t)||null}const Kc=ue()||{};let qt=(Kc.equipment||[]).map(Wc),Va=!1,bn="",Nt=null,Ft=null,Dt=null,ma=!1,cr=!1;function Qc(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function Gc(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function Wc(e={}){return ks({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function pa(e={}){return ks(e)}function ks(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=Pn(e.quantity??e.qty??0),i=fa(e.unit_price??e.price??0),c=h(String(e.barcode??"").trim()),d=Ce(e.status??e.state??e.status_label??e.statusLabel??"available"),l=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:Xc(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:d,image:l,imageUrl:l,created_at:e.created_at??null,updated_at:e.updated_at??null}}function Xc(e){return e!=null&&e!==""}function Pn(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function fa(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function Jc(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function lr(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function Yc(e,t){const n=lr(e),a=lr(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}else{if(r!==i)return r?-1:1;{const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}}const c=Qn(e?.desc||e?.description||e?.name||""),d=Qn(t?.desc||t?.description||t?.name||"");return c.localeCompare(d,"ar",{sensitivity:"base"})}function Ie(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ce(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function Zc(e){return Ce(e)}function Ua(){if(!Ur())return null;const e=Rc();return e?{...e}:null}function el(e){const t=Ua();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:r=null}=t,i=t?.mode||t?.source||"",c=[],d=new Set;if(n.forEach(f=>{const m=te(f?.barcode);!m||d.has(m)||(d.add(m),c.push({variant:f,barcode:m}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(i==="package-manager"||i==="equipment-packages"){const f=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:m})=>m),maxQuantity:f,reason:""}}const l=c.filter(({variant:f})=>Is(f));if(!a||!s)return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=l.filter(({barcode:f})=>!rt(f,a,s,r));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:f})=>f),maxQuantity:u.length};let p=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(l.length>0)p=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const f=new Set(c.map(({variant:m})=>Ce(m?.status)));f.has("maintenance")?p=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):f.has("reserved")?p=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):f.has("retired")&&(p=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:p,availableBarcodes:[],maxQuantity:0}}function tl(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function Kr(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=Ua();e.hidden=!s;const r=s?.mode||s?.source||"";s?r==="package-manager"||r==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=Ua(),d=c?.mode||c?.source||"";d==="package-manager"||d==="equipment-packages"?Kn("package-finish-button"):(Kn("return-button"),tl())}),t.dataset.listenerAttached="true")}function Ve(){return qt}function Rt(e){qt=Array.isArray(e)?e.map(ks):[],ys({equipment:qt}),Gc()}function Qn(e){return String(e??"").trim().toLowerCase()}function Et(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=Qn(t);return n||(n=Qn(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function ya(e){const t=Et(e);return t?Ve().filter(n=>Et(n)===t):[]}function ga(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=ba(e);if(n){const a=Ie(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${Ie(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function _s(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function Gn(){const e=_s();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function $s(e={}){const t=_s();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function Yt(e){ma=e;const t=_s(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function Ju(e){if(!Ht()){_n();return}if(!e)return;try{await al()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){S(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let d=0;if(i.forEach(l=>{const u=l.القسم??l.category??"",p=l["القسم الثانوي"]??l.subcategory??"",f=l.الوصف??l.description??l.name??"",m=l.الكمية??l.quantity??0,y=l.السعر??l.price??0,g=l.الباركود??l.barcode??"",b=l.الحالة??l.status??"متاح",w=l.الصورة??l.image_url??l.image??"",v=h(String(g||"")).trim();if(!f||!v){d+=1;return}c.push(Ps({category:u,subcategory:p,description:f,quantity:m,unit_price:y,barcode:v,status:b,image_url:w}))}),!c.length){S(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const l=await st("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(l?.data)?l.data.map(pa):[];if(u.length){const m=[...Ve(),...u];Rt(m)}await ha({showToastOnError:!1}),Le();const p=l?.meta?.count??u.length,f=[];p&&f.push(`${p} ✔️`),d&&f.push(`${d} ⚠️`),S(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(f.length?` (${f.join(" / ")})`:""))}catch(l){const u=rn(l,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");S(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),S(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),S(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const nl="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let mn=null;function al(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):mn||(mn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=nl,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),mn=null,e}),mn)}function Ps({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const d=h(String(r||"")).trim(),l=Zc(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:Pn(a),unit_price:fa(s),barcode:d,status:l,image_url:c?.trim()||null}}async function sl(){if(!Ht()){_n();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await st("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await ha({showToastOnError:!1}),S(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=rn(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");S(t,"error")}}function ba(e){return e.image||e.imageUrl||e.img||""}function rl(e){const t=Ce(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function Wn(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${Ie(a)}</td></tr>`}n&&(n.textContent="0")}function Qr(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=Nt?.groupKey||Et(e);if(!r){Wn();return}const i=Ve().filter(p=>Et(p)===r).sort((p,f)=>{const m=String(p.barcode||"").trim(),y=String(f.barcode||"").trim();return!m&&!y?0:m?y?m.localeCompare(y,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){Wn();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),d=o("equipment.form.labels.quantity","الكمية"),l=Ve(),u=i.map(p=>{const f=p.id&&e.id?String(p.id)===String(e.id):String(p.barcode||"")===String(e.barcode||""),m=f?"equipment-variants-table__row--current":"",y=Ie(String(p.barcode||"-")),g=f?`<span class="equipment-variants-current-badge">${Ie(c)}</span>`:"",b=h(String(Number.isFinite(Number(p.qty))?Number(p.qty):0)),w=l.indexOf(p),v=Ie(o("equipment.item.actions.delete","🗑️ حذف")),k=w>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${w}">${v}</button>
          </div>`:"";return`
        <tr class="${m}">
          <td>
            ${y}
            ${g}
          </td>
          <td>${rl(p.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${Ie(d)}">${b}</span>
          </td>
          <td class="table-actions-cell">${k}</td>
        </tr>
      `}).join("");n.innerHTML=u}function il({item:e,index:t}){const n=ba(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=Ht(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},d=Number.isFinite(Number(e.qty))?Number(e.qty):0,l=Number.isFinite(Number(e.price))?Number(e.price):0,u=d.toLocaleString("en-US"),p=l.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),f=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,m=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,y=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(d-f-m,0),g=y.toLocaleString("en-US"),b=o("equipment.card.labels.availableOfTotal","من أصل"),w=Ce(e.status);let v=`${Ie(c.available)}: ${Ie(g)} ${Ie(b)} ${Ie(u)}`,k="available";if(y===0){const H={reserved:{text:d===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},z=H[w]||H.default;v=Ie(z.text),k=z.modifier}const F=`<span class="equipment-card__availability equipment-card__availability--${k}">${v}</span>`,V="",q=e.desc||e.name||"—",x=e.name&&e.name!==e.desc?e.name:"",P=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${p} ${r}`}].map(({label:H,value:z})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${H}</span>
              <span class="equipment-card__detail-value">${z}</span>
            </span>
          `).join("")}
    </div>`,D=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),$=D.length?`<div class="equipment-card__categories">${D.map(({label:H,value:z})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${H}</span>
              <span class="equipment-card__detail-value">${z}</span>
            </div>
          `).join("")}</div>`:"",C=x?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${x}</span>
      </div>`:"",L=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${q}</h3>
    </div>
  `}
      ${P}
    </div>
  `,B=[],A=el(e),G=A?.availableBarcodes?.length?A.availableBarcodes.join(","):A?.barcode?A.barcode:"";let K="",I="";if(A.active){const H=`equipment-select-qty-${t}`,z=!!A.canSelect,ne=z?Math.max(1,Number(A.maxQuantity||A.availableBarcodes?.length||1)):1,ee=Math.max(1,Math.min(ne,99)),ce=[];for(let se=1;se<=ee;se+=1){const fe=h(String(se));ce.push(`<option value="${se}"${se===1?" selected":""}>${fe}</option>`)}const X=z?"":" disabled",re=o("reservations.create.equipment.selector.quantityLabel","الكمية"),he=z?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${h(String(ne))}`:A.reason?A.reason:"";K=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${H}">${re}</label>
        <select class="equipment-card__quantity-select" id="${H}" data-equipment-select-quantity${X}>
          ${ce.join("")}
        </select>
        ${he?`<span class="equipment-card__selection-hint">${Ie(he)}</span>`:""}
      </div>
    `;const ve=o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),_e=z?"":" disabled",U=A.reason?` title="${Ie(A.reason)}"`:"",Z=['data-equipment-action="select-reservation"',`data-selection-max="${z?ne:0}"`];G&&Z.push(`data-selection-barcodes="${Ie(G)}"`),e.groupKey&&Z.push(`data-selection-group="${Ie(String(e.groupKey))}"`),I=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${Z.join(" ")}${_e}${U}>${ve}</button>
    `}i&&B.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const O=B.length?B.join(`
`):"",R=Ie(q);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${Ie(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${R}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${V}
        ${F}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${L}
        </div>
      </div>
      <div class="equipment-card__body">
        ${$}
        ${C}
      </div>
      ${K||I||O?`<div class="equipment-card__actions equipment-card__actions--center">
            ${K}
            ${I}
            ${O}
          </div>`:""}
    </article>
  `}function ol(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,a.appendChild(d)}),t.includes(i)&&(a.value=i),Dn(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,s.appendChild(d)}),n.includes(i)&&(s.value=i),Dn(s)}const r=document.getElementById("filter-status");r&&Dn(r)}function Tn(){const e=ue();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return qt=t||[],qt;const s=new Date;let r=!1;const i=new Set((a||[]).filter(d=>d?.status==="open").map(d=>h(String(d?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(d=>{if(!d)return d;const l=Ce(d.status),u=h(String(d.barcode??"")).trim().toLowerCase(),p=u&&i.has(u);let f=p?"maintenance":"available";if(!p&&u)for(const m of n||[]){if(!cl(m,s))continue;if(m.items?.some(g=>h(String(g?.barcode??"")).trim().toLowerCase()===u)){f="reserved";break}}return f!==l?(r=!0,{...d,status:f}):{...d,status:f}});return r?Rt(c):(qt=c,ys({equipment:qt})),qt}function cl(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function Ba(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Le(){const e=document.getElementById("equipment-list");if(!e)return;Kr();const t=Tn(),n=Array.isArray(t)?t:Ve(),a=new Map;n.forEach(g=>{if(!g)return;const b=Et(g);b&&(a.has(b)||a.set(b,[]),a.get(b).push(g))});const s=Array.from(a.values()).map(g=>{const b=g[0],w=g.reduce((x,_)=>x+(Number.isFinite(Number(_.qty))?Number(_.qty):0),0),v=["maintenance","reserved","available","retired"],k=g.map(x=>Ce(x.status)).sort((x,_)=>v.indexOf(x)-v.indexOf(_))[0]||"available",F=g.reduce((x,_)=>{const P=Pn(_?.qty??0)||0,D=Ce(_?.status);return D==="reserved"?x.reserved+=P:D==="maintenance"&&(x.maintenance+=P),x},{reserved:0,maintenance:0}),V=Math.max(w-F.reserved-F.maintenance,0);return{item:{...b,qty:w,status:k,variants:g,groupKey:Et(b),reservedQty:F.reserved,maintenanceQty:F.maintenance,availableQty:V},index:n.indexOf(b)}});s.sort((g,b)=>Yc(g.item,b.item));const r=document.getElementById("search-equipment")?.value||"",i=h(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",d=document.getElementById("filter-sub")?.value||"",l=document.getElementById("filter-status")?.value||"",u=l?Ce(l):"";if(Va&&!n.length){e.innerHTML=Ba(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(bn&&!n.length){e.innerHTML=Ba(bn,{tone:"error",icon:"⚠️"});return}const p=s.filter(({item:g})=>{const b=h(String(g.barcode??"")).toLowerCase().trim(),w=Array.isArray(g.variants)?g.variants.map(q=>h(String(q.barcode??"")).toLowerCase().trim()).filter(Boolean):[],v=!i||g.name&&g.name.toLowerCase().includes(i)||g.desc&&g.desc.toLowerCase().includes(i)||b&&b.includes(i)||w.some(q=>q.includes(i))||g.category&&g.category.toLowerCase().includes(i)||g.sub&&g.sub.toLowerCase().includes(i),k=!c||g.category===c,F=!d||g.sub===d,V=!u||Ce(g.status)===u;return v&&k&&F&&V}),f=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),m=p;e.innerHTML=m.length?m.map(il).join(""):Ba(f);const y=document.getElementById("equipment-list-count");if(y){const g=o("equipment.list.countSuffix","عنصر"),b=h(String(m.length)),w=m.length?`${b} ${g}`:`0 ${g}`;y.textContent=w}ol(n)}async function ha({showToastOnError:e=!0}={}){Va=!0,bn="",Le();try{const t=await st("/equipment/?all=1"),n=Array.isArray(t?.data)?t.data.map(pa):[];Rt(n)}catch(t){bn=rn(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&S(bn,"error")}finally{Va=!1,Le()}}function rn(e,t,n){if(e instanceof Tr){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function ll(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),r=fa(t.querySelector("#new-equipment-price")?.value||"0"),i=Pn(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",d=t.querySelector("#new-equipment-category")?.value?.trim()||"",l=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){S(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const p=Ps({category:d,subcategory:l,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const f=await st("/equipment/",{method:"POST",body:p}),m=pa(f?.data),y=[...Ve(),m];Rt(y),Le(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),S(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(f){const m=rn(f,"equipment.toast.addFailed","تعذر إضافة المعدة");S(m,"error")}}async function Gr(e){if(!Ht()){_n();return}const t=Ve(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await st(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),Rt(a),Le(),S(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=rn(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");S(s,"error")}}async function dl(e,t){const n=Ve(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},Rt(r),Le();return}const s=Ps({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await st(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=pa(r?.data),c=[...n];c[e]=i,Rt(c),Le(),S(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=rn(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw S(i,"error"),r}}function Ln(){Le()}function Wr(e){const n=Ve()[e];if(!n)return;Ft=e;const a=ya(n),s=a[0]||n,r=a.reduce((d,l)=>d+(Number.isFinite(Number(l.qty))?Number(l.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(d=>Ce(d.status)).sort((d,l)=>i.indexOf(d)-i.indexOf(l))[0]||Ce(s.status);document.getElementById("edit-equipment-index").value=e,$s({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:ba(s)||"",barcode:s.barcode||"",status:s.status||c}),Yt(!1),Dt=Gn(),ga(s),Qr(s),Nt={groupKey:Et(s),barcode:String(s.barcode||""),id:s.id||null},Qc(document.getElementById("editEquipmentModal"))?.show()}function ul(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),r=s?.querySelector("[data-equipment-select-quantity]");let i=Number.parseInt(r?.value||"1",10);(!Number.isFinite(i)||i<=0)&&(i=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&i>c&&(i=c);const l=(t.dataset.selectionBarcodes||"").split(",").map(m=>m.trim()).filter(m=>m.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",p=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";Mc({barcodes:l,quantity:i,groupKey:p,description:u})||S(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||Gr(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||Wr(s)}}function ml(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||Wr(n)}}function pl(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||Gr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function Xr(){if(!Nt||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=Ve(),a=Nt.id?n.find(d=>String(d.id)===String(Nt.id)):null,s=Nt.groupKey,r=s?n.find(d=>Et(d)===s):null,i=a||r;if(!i){Wn();return}const c=n.findIndex(d=>d===i);if(c>=0){const d=document.getElementById("edit-equipment-index");d&&(d.value=String(c)),Ft=c}if(Qr(i),!ma){const d=ya(i),l=d[0]||i,u=d.reduce((m,y)=>m+(Number.isFinite(Number(y.qty))?Number(y.qty):0),0),p=["maintenance","reserved","available","retired"],f=d.map(m=>Ce(m.status)).sort((m,y)=>p.indexOf(m)-p.indexOf(y))[0]||Ce(l.status);$s({category:l.category||"",subcategory:l.sub||"",description:l.desc||l.description||"",quantity:String(u||l.qty||0),price:l.price!=null?String(l.price):"0",image:ba(l)||"",barcode:l.barcode||"",status:l.status||f}),Dt=Gn()}ga(primary)}function fl(){document.getElementById("search-equipment")?.addEventListener("input",Ln),document.getElementById("filter-category")?.addEventListener("change",Ln),document.getElementById("filter-sub")?.addEventListener("change",Ln),document.getElementById("filter-status")?.addEventListener("change",Ln),document.getElementById("add-equipment-form")?.addEventListener("submit",ll);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),sl().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",ul),t.addEventListener("keydown",ml),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",pl),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);Jc(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!ma){Dt=Gn(),Yt(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){S(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:Pn(document.getElementById("edit-equipment-quantity").value)||1,price:fa(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await dl(t,n),Dt=Gn(),Yt(!1),Xr()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{fl(),Le(),ha();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(Dt&&$s(Dt),Ft!=null){const a=Ve()[Ft];if(a){const r=ya(a)[0]||a;ga(r)}}Yt(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Le(),Yt(ma),Ft!=null){const t=Ve()[Ft];if(t){const a=ya(t)[0]||t;ga(a)}}});document.addEventListener("equipment:refreshRequested",()=>{ha({showToastOnError:!1})});document.addEventListener(lc.USER_UPDATED,()=>{Le()});document.addEventListener("equipment:changed",()=>{Xr()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{Nt=null,Wn(),Ft=null,Dt=null,Yt(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!cr&&(document.addEventListener(sn.change,()=>{Kr(),Le()}),cr=!0);const Jr="projects:create:draft",Yr="projects.html#projects-section";let Ka=null,Zr=[],Qa=new Map,Ga=new Map,Xn=new Map,Fa=!1,Mn=null,dr=!1,ei=[];function yl(e){if(!e)return null;let t=ei.find(a=>a.id===e)||null;if(t)return t;const n=fc(e);return n?(t={id:e,name:gc(n)||e,price:yc(n),items:bs(n),raw:n},t):null}function Jn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Yn(e){return h(String(e||"")).trim().toLowerCase()}function gl(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function ti(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function ni(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function ai(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function si(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function Mt(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function Ts(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function Vt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function He(){const{input:e,hidden:t}=Vt();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function Pt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function ri(e,t,{allowPartial:n=!1}={}){const a=De(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function Wa(e,t={}){return ri(Qa,e,t)}function Xa(e,t={}){return ri(Ga,e,t)}function ze(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function ii(e){Zr=Array.isArray(e)?[...e]:[]}function Ns(){return Zr}function js(e){return e&&Ns().find(t=>String(t.id)===String(e))||null}function ur(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function Zt(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??gt,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:gt}function Xe(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??gt,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=gt),t.dataset.companyShare=String(s),t.checked=!0}function Ja(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(Fa){de();return}Fa=!0;const a=()=>{Fa=!1,de()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(gt)),t.disabled){n.checked=!1,S(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),Xe()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Xe():n.checked&&(n.checked=!1));a()}function bl(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function mr(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function pr(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function ft({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=Ts();if(!n||!a||!s)return;const r=gs()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const d=new Set;Qa=new Map;const l=r.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:pr(m)||c})).filter(m=>{if(!m.label)return!1;const y=De(m.label);return!y||d.has(y)?!1:(d.add(y),Qa.set(y,m),!0)}).sort((m,y)=>m.label.localeCompare(y.label,void 0,{sensitivity:"base"}));s.innerHTML=l.map(m=>`<option value="${Jn(m.label)}"></option>`).join("");const u=t?"":n.value,p=e?String(e):a.value?String(a.value):"",f=p?r.find(m=>String(m.id)===p):null;if(f){const m=pr(f)||c;a.value=String(f.id),n.value=m,n.dataset.selectedId=String(f.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function en({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=Vt();if(!a||!s||!r)return;const i=Array.isArray(t)?t:Ns()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const d=[...i].filter(g=>g&&g.id!=null).sort((g,b)=>String(b.createdAt||b.start||"").localeCompare(String(g.createdAt||g.start||""))),l=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),p=new Set;Ga=new Map;const f=d.map(g=>{const b=ur(g)||u;return{id:String(g.id),label:b}}).filter(g=>{if(!g.label)return!1;const b=De(g.label);return!b||p.has(b)?!1:(p.add(b),Ga.set(b,g),!0)});r.innerHTML=f.map(g=>`<option value="${Jn(g.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",y=m?d.find(g=>String(g.id)===m):null;if(y){const g=ur(y)||u;s.value=String(y.id),a.value=g,a.dataset.selectedId=String(y.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":l}function Zn(e,t,n){const{date:a,time:s}=Cr(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function oi(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||en({selectedValue:a});const r=(gs()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";ft(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=mr(e,"start"),d=mr(e,"end");c&&Zn("res-start","res-start-time",c),d&&Zn("res-end","res-end-time",d);const l=document.getElementById("res-notes");l&&e.description&&(t||!l.value)&&(l.value=e.description),de(),xt()}function ci({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:ue(),s=Array.isArray(a)?a:[];ii(s);const r=t!=null?String(t):n.value?String(n.value):"";en({selectedValue:r,projectsList:s}),xt(),de()}function xt(){const{input:e,hidden:t}=Vt(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),d=document.getElementById("res-discount-type"),l=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),p=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(Pt(n,He),a&&Pt(a,He)),s&&Pt(s,He),r&&Pt(r,He),i&&Pt(i,He),c&&Pt(c,He),d&&Pt(d,He),p)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=l),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=l),s&&(s.value="unpaid",ze(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=l),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=l),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=l),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=l),d&&(d.value="percent",d.disabled=!0,d.classList.add("reservation-input-disabled"),d.title=l);else{if(n){const f=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",f&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.disabled=!1,d.classList.remove("reservation-input-disabled"),d.title="")}Ja("tax"),de()}function Cs(){const{input:e,hidden:t}=Vt();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Xa(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=js(r.id);i?oi(i,{skipProjectSelectUpdate:!0}):(xt(),de())}else t.value="",e.dataset.selectedId="",xt(),de()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Xa(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Ls(){const{input:e,hidden:t}=Ts();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Wa(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),de()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Wa(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function hl(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){hn({clearValue:!0});return}let n=null;try{const l=decodeURIComponent(t);n=JSON.parse(l)}catch(l){console.warn("⚠️ [reservations/createForm] Failed to decode project context",l)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),hn({clearValue:!1}),!n)return;n.fromProjectForm&&(Mn={draftStorageKey:n.draftStorageKey||Jr,returnUrl:n.returnUrl||Yr});const r=document.getElementById("res-project");if(n.projectId){r&&(en({selectedValue:String(n.projectId)}),xt());const l=js(n.projectId);l?oi(l,{forceNotes:!!n.forceNotes}):de(),hn()}else{r&&en({selectedValue:""});const l=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");jl(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),l)}n.start&&Zn("res-start","res-start-time",n.start),n.end&&Zn("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(gs()||[]).find(p=>String(p.id)===String(n.customerId));u?.id!=null&&(ft({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(ft({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):ft({selectedValue:""});const d=document.getElementById("res-notes");d&&n.description&&!d.value&&(d.value=n.description),de()}function Ut(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:En(e,n),end:En(t,a)}}function li(e){const t=Yn(e);if(t){const c=Xn.get(t);if(c)return c}const{description:n,barcode:a}=ti(e);if(a){const c=ua(a);if(c)return c}const s=De(n||e);if(!s)return null;let r=Dr();if(!r?.length){const c=ue();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&Rr(r)}const i=r.find(c=>De(c?.desc||c?.description||"")===s);return i||r.find(c=>De(c?.desc||c?.description||"").includes(s))||null}function di(e,t="equipment-description-options"){const n=Yn(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(d=>Yn(d.value)===n)||Xn.has(n))return!0;const{description:s}=ti(e);if(!s)return!1;const r=De(s);return r?(Dr()||[]).some(c=>De(c?.desc||c?.description||"")===r):!1}const vl={available:0,reserved:1,maintenance:2,retired:3};function ql(e){return vl[e]??5}function fr(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function Sl(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${fr(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${fr(n)})`}function wt(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=Tn(),a=ue(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];Rr(r);const i=new Map;r.forEach(l=>{const u=gl(l),p=Yn(u);if(!p||!u)return;const f=bt(l),m=ql(f),y=i.get(p);if(!y){i.set(p,{normalized:p,value:u,bestItem:l,bestStatus:f,bestPriority:m,statuses:new Set([f])});return}y.statuses.add(f),m<y.bestPriority&&(y.bestItem=l,y.bestStatus=f,y.bestPriority=m,y.value=u)}),Xn=new Map;const d=Array.from(i.values()).sort((l,u)=>l.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(l=>{Xn.set(l.normalized,l.bestItem);const u=Sl(l),p=Jn(l.value);if(u===l.value)return`<option value="${p}"></option>`;const f=Jn(u);return`<option value="${p}" label="${f}"></option>`}).join("");e&&(e.innerHTML=d),t&&(t.innerHTML=d)}function ui(e,t,n={}){const{silent:a=!1}=n,s=te(e);if(!s)return{success:!1,message:null};const{start:r,end:i}=Ut();if(!r||!i){const y=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||S(y),{success:!1,message:y}}const c=it();if(Bs(c).has(s)){const y=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||S(y),{success:!1,message:y}}const l=hs(s,r,i);if(l.length){const y=l.map(b=>b.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${y}`);return a||S(g),{success:!1,message:g}}if(rt(s,r,i)){const y=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||S(y),{success:!1,message:y}}const u=ua(s);if(!u){const y=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||S(y),{success:!1,message:y}}const p=bt(u);if(p==="maintenance"||p==="retired"){const y=Mt(p);return a||S(y),{success:!1,message:y}}const f=zt(u);if(!f){const y=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||S(y),{success:!1,message:y}}oa({id:f,equipmentId:f,barcode:s,desc:u.desc,qty:1,price:u.price,image:Ot(u)}),t&&(t.value=""),ht(),de();const m=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||S(m),{success:!0,message:m,barcode:s}}function Ya(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=li(t);if(!n){S(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=Uc(n.barcode),s=bt(a||n);if(s==="maintenance"||s==="retired"){S(Mt(s));return}const r=te(n.barcode);if(!r){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=zt(n);if(!i){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Ot(n)},{start:d,end:l}=Ut();if(!d||!l){S(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=it();if(Bs(u).has(r)){S(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const f=hs(r,d,l);if(f.length){const m=f.map(y=>y.name).join(", ");S(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`));return}if(rt(r,d,l)){S(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}oa(c),ht(),de(),S(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function El(){wt();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Ya(e))});const t=()=>{di(e.value,"equipment-description-options")&&Ya(e)};e.addEventListener("focus",()=>{if(wt(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function yr(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function Bs(e=it()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=te(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const r=te(s?.normalizedBarcode??s?.barcode);r&&t.add(r)})}),t}function xl(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=Ut();if(!t||!n){S(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}Dc({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):S(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(sn.change,t=>{yr(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),yr(e,Ur()))}function wl(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,r=a.length?a:t.barcode?[t.barcode]:[];if(!r.length)return;let i=0,c=null;const d=[],l=new Set;r.forEach(p=>{const f=te(p);f&&!l.has(f)&&(l.add(f),d.push(f))});const u=Math.min(s,d.length);for(let p=0;p<u;p+=1){const f=d[p],m=ui(f,null,{silent:!0});m.success&&(i+=1),m.message&&(c=m.message)}if(i>0){const f=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",h(String(i)));S(f)}else c&&S(c)}function mi(){xl(),!(dr||typeof document>"u")&&(document.addEventListener(sn.requestAdd,wl),dr=!0)}function Nn(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),r=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:r}}function Za(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=Nn();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const r=document.getElementById("equipment-barcode"),i=document.getElementById("equipment-description"),c=t==="package";r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),Ec(t),t==="package"&&va()}function va(){const{packageSelect:e,packageHint:t}=Nn();if(!e)return;const n=jr();ei=n,mc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,r=n.map(c=>{const d=Number.isFinite(Number(c.price))?Number(c.price):0,l=h(d.toFixed(2)),u=`${c.name} — ${l} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${r}`,e.selectedIndex=0;const i=n.length>0;e.disabled=!i,t&&(i?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),yi()}function Al(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:r,blockingPackages:i})=>{const c=r?.desc||h(String(r?.barcode??r?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(i)&&i.length){const d=i.map(l=>l.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${d})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function pi(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const r=xn(e);if(!r)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const i=yl(r);if(!i)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(m=>m?.type==="package"&&xn(m.packageId)===r))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(pc(r,n,a,s)){const m=i.name||r;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${m} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(i.items)&&i.items.length?i.items:bs(i.raw??{}),d=Bs(t),l=[],u=new Set;if(c.forEach(m=>{const y=te(m?.normalizedBarcode??m?.barcode);if(y){if(u.has(y)){l.push({item:m,type:"internal"});return}u.add(y),d.has(y)&&l.push({item:m,type:"external"})}}),l.length){const m=l.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>h(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:l.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",m):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",m),duplicates:l}}const p=[];return c.forEach(m=>{const y=te(m?.normalizedBarcode??m?.barcode);if(y&&rt(y,n,a,s)){const g=hs(y,n,a,s);p.push({item:m,blockingPackages:g})}}),p.length?{success:!1,reason:"item_conflict",message:Al(i,p),conflicts:p}:{success:!0,package:{id:`package::${r}`,packageId:r,type:"package",desc:i.name||`Package ${r}`,qty:1,price:Number.isFinite(Number(i.price))?Number(i.price):0,barcode:i.code||i.raw?.package_code||`pkg-${r}`,packageItems:c.map(m=>({equipmentId:m?.equipmentId??null,barcode:m?.barcode??m?.normalizedBarcode??"",normalizedBarcode:te(m?.normalizedBarcode??m?.barcode),desc:m?.desc??"",qty:Number.isFinite(Number(m?.qty))?Number(m.qty):1,price:Number.isFinite(Number(m?.price))?Number(m.price):0})),image:c.find(m=>m?.image)?.image??null},packageInfo:i}}function fi(e,{silent:t=!1}={}){const n=xn(e);if(!n)return t||S(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=Ut(),r=it(),i=pi(n,{existingItems:r,start:a,end:s});if(!i.success){if(!t){const d={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[i.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");S(i.message||d)}return i}return oa(i.package),ht(),de(),t||S(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:i.package}}function yi(){const{packageSelect:e}=Nn();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;fi(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function Il(){const{packageAddButton:e,packageSelect:t}=Nn();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){S(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}fi(n)}),e.dataset.listenerAttached="true")}function gi(){const{modeRadios:e}=Nn();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&Za(s.target.value)}),a.dataset.listenerAttached="true")}),Il(),yi();const t=Vn(),n=e.find(a=>a.value===t);n&&(n.checked=!0),Za(t)}function ht(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=it(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),d=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const l=nn(n);t.innerHTML=l.map(u=>{const p=u.items[0]||{},f=Ot(p)||u.image,m=f?`<img src="${f}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',y=h(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,b=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,w=`${h(g.toFixed(2))} ${s}`,v=`${h(b.toFixed(2))} ${s}`,k=u.items.some(x=>x?.type==="package"),F=u.barcodes.map(x=>h(String(x||""))).filter(Boolean),V=F.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${F.map(x=>`<li>${x}</li>`).join("")}
            </ul>
          </details>`:"";let q="";if(k){const x=new Map;if(u.items.forEach(_=>{Array.isArray(_?.packageItems)&&_.packageItems.forEach(P=>{if(!P)return;const D=te(P.barcode||P.desc||Math.random()),$=x.get(D);if($){$.qty+=Number.isFinite(Number(P.qty))?Number(P.qty):1;return}x.set(D,{desc:P.desc||P.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(P.qty))?Number(P.qty):1,barcode:P.barcode??P.normalizedBarcode??""})})}),x.size){const _=Array.from(x.values()).map(P=>{const D=h(String(P.qty)),$=P.desc||h(String(P.barcode||"")),C=P.barcode?` <span class="reservation-package-items__barcode">(${h(String(P.barcode))})</span>`:"";return`<li>${$}${C} × ${D}</li>`}).join("");q=`
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
          <td>${w}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${d}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function kl(e){const t=it(),a=nn(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(hc(s),ht(),de())}function _l(e){const t=it(),n=t.filter(a=>ca(a)!==e);n.length!==t.length&&(Lr(n),ht(),de())}function $l(e){const t=it(),a=nn(t).find(p=>p.key===e);if(!a)return;const{start:s,end:r}=Ut();if(!s||!r){S(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(p=>te(p.barcode))),{equipment:c=[]}=ue(),d=(c||[]).find(p=>{const f=te(p?.barcode);return!f||i.has(f)||ca({desc:p?.desc||p?.description||p?.name||"",price:Number(p?.price)||0})!==e||!Is(p)?!1:!rt(f,s,r)});if(!d){S(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const l=te(d.barcode),u=zt(d);if(!u){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}oa({id:u,equipmentId:u,barcode:l,desc:d.desc||d.description||d.name||a.description||"",qty:1,price:Number.isFinite(Number(d.price))?Number(d.price):a.unitPrice,image:Ot(d)}),ht(),de()}function de(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),d=c?.value||"unpaid",{start:l,end:u}=Ut();i&&Xe();const p=Zt(),f=document.getElementById("res-payment-progress-type"),m=document.getElementById("res-payment-progress-value"),y=ni(f),g=ai(m);ir({selectedItems:it(),discount:n,discountType:s,applyTax:i,paidStatus:d,paymentProgressType:y,paymentProgressValue:g,start:l,end:u,companySharePercent:p,paymentHistory:[]});const b=ir.lastResult;b?(si(m,b.paymentProgressValue),c&&(c.value=b.paymentStatus,ze(c,b.paymentStatus))):ze(c,d)}function Pl(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=h(c.target.value),de()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",de),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(He()){n.checked=!1,S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ja("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(He()){a.checked=!1,S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ja("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(He()){s.value="unpaid",ze(s,"unpaid"),S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}ze(s),de()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(He()){r.value="percent",S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",de()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(He()){i.value="",S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=h(c.target.value),de()}),i.dataset.listenerAttached="true"),de()}function Tl(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){de();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),de()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function gr(){const{input:e,hidden:t}=Ts(),{input:n,hidden:a}=Vt(),{customers:s}=ue();let r=t?.value?String(t.value):"";if(!r&&e?.value){const X=Wa(e.value,{allowPartial:!0});X&&(r=String(X.id),t&&(t.value=r),e.value=X.label,e.dataset.selectedId=r)}const i=s.find(X=>String(X.id)===r);if(!i){S(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let d=a?.value?String(a.value):"";if(!d&&n?.value){const X=Xa(n.value,{allowPartial:!0});X&&(d=String(X.id),a&&(a.value=d),n.value=X.label,n.dataset.selectedId=d)}const l=document.getElementById("res-start").value,u=document.getElementById("res-end").value,p=document.getElementById("res-start-time")?.value||"00:00",f=document.getElementById("res-end-time")?.value||"00:00";if(!l||!u){S(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${l}T${p}`,y=`${u}T${f}`,g=new Date(m),b=new Date(y);if(Number.isNaN(g.getTime())||Number.isNaN(b.getTime())||g>=b){S(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const w=vc(),v=it();if(v.length===0&&w.length===0){S(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const k=document.getElementById("res-notes")?.value||"",F=parseFloat(h(document.getElementById("res-discount")?.value))||0,V=document.getElementById("res-discount-type")?.value||"percent",q=document.getElementById("res-payment-status"),x=q?.value||"unpaid",_=document.getElementById("res-payment-progress-type"),P=document.getElementById("res-payment-progress-value"),D=ni(_),$=ai(P),C=d?js(d):null,M=bl(C);if(d&&!C){S(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const X of v){const re=bt(X.barcode);if(re==="maintenance"||re==="retired"){S(Mt(re));return}}for(const X of v){const re=te(X.barcode);if(rt(re,m,y)){S(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const X of w)if(Br(X,m,y)){S(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const L=document.getElementById("res-tax"),B=document.getElementById("res-company-share"),A=!!d;A?(L&&(L.checked=!1,L.disabled=!0,L.classList.add("disabled"),L.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),B&&(B.checked=!1,B.disabled=!0,B.classList.add("disabled"),B.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),q&&(q.value="unpaid",q.disabled=!0,ze(q,"unpaid"),q.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),_&&(_.disabled=!0,_.classList.add("disabled")),P&&(P.value="",P.disabled=!0,P.classList.add("disabled"))):(L&&(L.disabled=!1,L.classList.remove("disabled"),L.title=""),B&&(B.disabled=!1,B.classList.remove("disabled"),B.title=""),q&&(q.disabled=!1,q.title=""),_&&(_.disabled=!1,_.classList.remove("disabled")),P&&(P.disabled=!1,P.classList.remove("disabled")));const G=A?!1:L?.checked||!1,K=!!B?.checked;if(!A&&K!==G){S(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let I=K?Zt():null;K&&(!Number.isFinite(I)||I<=0)&&(Xe(),I=Zt());const O=K&&G&&Number.isFinite(I)&&I>0;G&&Xe();const R=vs(v,F,V,G,w,{start:m,end:y,companySharePercent:O?I:0}),H=dc(),z=qs({totalAmount:R,progressType:D,progressValue:$,history:[]});P&&si(P,z.paymentProgressValue);const ne=[];z.paymentProgressValue!=null&&z.paymentProgressValue>0&&ne.push({type:z.paymentProgressType||D,value:z.paymentProgressValue,amount:z.paidAmount,percentage:z.paidPercent,recordedAt:new Date().toISOString()});const ee=Ss({manualStatus:x,paidAmount:z.paidAmount,paidPercent:z.paidPercent,totalAmount:R});q&&(q.value=ee,ze(q,ee));const ce=Fr({reservationCode:H,customerId:c,start:m,end:y,status:M?"confirmed":"pending",title:null,location:null,notes:k,projectId:d||null,totalAmount:R,discount:A?0:F,discountType:A?"percent":V,applyTax:G,paidStatus:A?"unpaid":ee,confirmed:M,items:v.map(X=>({...X,equipmentId:X.equipmentId??X.id})),technicians:w,companySharePercent:A||!O?null:I,companyShareEnabled:A?!1:O,paidAmount:A?0:z.paidAmount,paidPercentage:A?0:z.paidPercent,paymentProgressType:A?null:z.paymentProgressType,paymentProgressValue:A?null:z.paymentProgressValue,paymentHistory:A?[]:ne});try{const X=await qc(ce);Tn(),wt(),$n(),Cl(),S(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Ka=="function"&&Ka({type:"created",reservation:X}),Nl(X)}catch(X){console.error("❌ [reservations/createForm] Failed to create reservation",X);const re=la(X)?X.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");S(re,"error"),A&&(S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),hn({clearValue:!1}))}}function Nl(e){if(!Mn)return;const{draftStorageKey:t=Jr,returnUrl:n=Yr}=Mn,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}Mn=null,n&&(window.location.href=n)}function hn({clearValue:e=!1}={}){const{input:t,hidden:n}=Vt();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,xt())}function jl(e,t=""){const{input:n,hidden:a}=Vt();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),xt())}function Cl(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),ft({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),hn({clearValue:!1}),en({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",ze(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),Sc(),Lr([]),Kn("form-reset"),ht(),xt(),de()}function Ll(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){kl(s);return}if(a==="increase-group"&&s){$l(s);return}if(a==="remove-group"&&s){_l(s);return}}),e.dataset.listenerAttached="true")}function Bl(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(Vn()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,ui(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||Vn()!=="single")return;const{start:r,end:i}=Ut();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function Fl(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await gr()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await gr()}),t.dataset.listenerAttached="true")}function Yu({onAfterSubmit:e}={}){Ka=typeof e=="function"?e:null;const{customers:t,projects:n}=ue();bc(t||[]),ft(),Ls(),ii(n||[]),ci({projectsList:n}),Cs(),wt(),va(),El(),mi(),gi(),Tl(),Pl(),Ll(),Bl(),Fl(),hl(),de(),ht()}function bi(){wt(),va(),ci(),ft(),Ls(),Cs(),mi(),gi(),ht(),de()}if(typeof document<"u"){const e=()=>{ft(),en({projectsList:Ns()}),Ls(),Cs(),de()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{wt()}),document.addEventListener("packages:changed",()=>{va(),Vn()==="package"&&Za("package")})}typeof window<"u"&&(window.getCompanySharePercent=Zt);function hi(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:Tt(t),endDate:Tt(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:Tt(n),endDate:Tt(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Tt(n),endDate:Tt(a)}}return e==="upcoming"?{startDate:Tt(t),endDate:""}:{startDate:"",endDate:""}}function Dl(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=h(t?.value||"").trim(),i=h(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),ea(t),ea(n),r="",i=""),!r&&!i&&c){const l=hi(c);r=l.startDate,i=l.endDate}return{searchTerm:De(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function Zu(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{Rl(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),ea(a),ea(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function Rl(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=hi(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function Tt(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function ea(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function Bn(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function Ml(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function Hl(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=Ml(n);if(a!==null)return a}return null}function br(e,t=0){const n=Hl(e);if(n!=null)return n;const a=Bn(e.createdAt??e.created_at);if(a!=null)return a;const s=Bn(e.updatedAt??e.updated_at);if(s!=null)return s;const r=Bn(e.start);if(r!=null)return r;const i=Bn(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function zl({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((v,k)=>({reservation:v,index:k})),i=t.searchTerm||"",c=t.searchReservationId||"",d=t.searchCustomerName||"",l=t.searchProjectId||"",u=t.startDate||"",p=t.endDate||"",f=t.status||"",m=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,y=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,b=p?new Date(`${p}T23:59:59`):null,w=r.filter(({reservation:v})=>{const k=n.get(String(v.customerId)),F=s?.get?.(String(v.projectId)),V=v.start?new Date(v.start):null,q=Es(v),{effectiveConfirmed:x}=At(v,F);if(m!=null&&String(v.customerId)!==String(m)||y!=null&&!(Array.isArray(v.technicians)?v.technicians.map(C=>String(C)):[]).includes(String(y))||f==="confirmed"&&!x||f==="pending"&&x||f==="completed"&&!q||g&&V&&V<g||b&&V&&V>b)return!1;if(c){const $=[v.reservationId,v.id,v.reservation_id,v.reservationCode,v.reservation_code,v.code,v.reference,v.referenceNumber,v.reference_number],C=De($.filter(L=>L!=null&&L!=="").map(String).join(" ")).replace(/\s+/g,""),M=c.replace(/\s+/g,"");if(!C.includes(M))return!1}if(d&&!De(k?.customerName||"").includes(d))return!1;if(l){const $=[v.projectId,v.project_id,v.projectID,F?.id,F?.projectCode,F?.project_code],C=De($.filter(L=>L!=null&&L!=="").map(String).join(" ")).replace(/\s+/g,""),M=l.replace(/\s+/g,"");if(!C.includes(M))return!1}if(!i)return!0;const _=v.items?.map?.($=>`${$.barcode} ${$.desc}`).join(" ")||"",P=(v.technicians||[]).map($=>a.get(String($))?.name).filter(Boolean).join(" ");return De([v.reservationId,k?.customerName,v.notes,_,P,F?.title].filter(Boolean).join(" ")).includes(i)});return w.sort((v,k)=>{const F=br(v.reservation,v.index),V=br(k.reservation,k.index);return F!==V?V-F:k.index-v.index}),w}function Ol({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),d=o("reservations.list.itemsCountShort","{count} عنصر"),l=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),p=o("reservations.list.status.pending","⏳ غير مؤكد"),f=o("reservations.list.payment.paid","💳 مدفوع"),m=o("reservations.list.payment.unpaid","💳 غير مدفوع"),y=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),g=o("reservations.list.actions.confirm","✔️ تأكيد"),b=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),w=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),v={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:k,index:F})=>{const V=t.get(String(k.customerId)),q=k.projectId?a?.get?.(String(k.projectId)):null,x=Es(k),_=k.paidStatus??k.paid_status??(k.paid===!0||k.paid==="paid"?"paid":"unpaid"),P=_==="paid",D=_==="partial",{effectiveConfirmed:$,projectLinked:C}=At(k,q),M=$?"status-confirmed":"status-pending",L=P?"status-paid":D?"status-partial":"status-unpaid";let B=`<span class="reservation-chip status-chip ${M}">${$?u:p}</span>`;const A=P?f:D?y:m;let G=`<span class="reservation-chip status-chip ${L}">${A}</span>`,K=P?" tile-paid":D?" tile-partial":" tile-unpaid";x&&(K+=" tile-completed");let I="";x&&(B=`<span class="reservation-chip status-chip status-completed">${u}</span>`,G=`<span class="reservation-chip status-chip status-completed">${A}</span>`,I=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const O=!C&&!$?`<button class="tile-confirm" data-reservation-index="${F}" data-action="confirm">${g}</button>`:"",R=O?`<div class="tile-actions">${O}</div>`:"",H=k.items?.length||0,z=(k.technicians||[]).map(fe=>n.get(String(fe))).filter(Boolean),ne=z.map(fe=>fe.name).join(l)||"—",ee=h(String(k.reservationId??"")),ce=k.start?h(Oe(k.start)):"-",X=k.end?h(Oe(k.end)):"-",re=h(String(k.cost??0)),he=h(String(H)),ve=k.notes?h(k.notes):c,_e=d.replace("{count}",he),U=k.applyTax?`<small>${r}</small>`:"";let Z=b;return k.projectId&&(Z=q?.title?h(q.title):w),`
      <div class="${O?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${K}"${I} data-reservation-index="${F}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${ee}</div>
          <div class="tile-badges">
            ${B}
            ${G}
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
            <span class="tile-value tile-inline">${ce}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.end}</span>
            <span class="tile-value tile-inline">${X}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.cost}</span>
            <span class="tile-value">${re} ${s} ${U}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.equipment}</span>
            <span class="tile-value">${_e}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.crew}</span>
            <span class="tile-value">${z.length?ne:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${ve}</span>
          </div>
        </div>
        ${R}
      </div>
    `}).join("")}function Fe(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Vl(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=At(e,s),c=e.paid===!0||e.paid==="paid",d=Es(e),l=e.items||[],{groups:u}=xs(e),{technicians:p=[]}=ue(),f=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(p)?p:[]),m=new Map;f.forEach(T=>{if(!T||T.id==null)return;const Q=String(T.id),xe=m.get(Q)||{};m.set(Q,{...xe,...T})});const y=(e.technicians||[]).map(T=>m.get(String(T))).filter(Boolean),g=Ht(),b=da(e.start,e.end),w=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,v=ut(w),k=Number.isFinite(v)?v:0,F=e.discountType??e.discount_type??e.discountMode??"percent",V=String(F).toLowerCase()==="amount"?"amount":"percent",q=r?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),x=ut(e.cost??e.total??e.finalTotal),_=Number.isFinite(x),P=_?Ae(x):0,D=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,$=D!=null?ut(D):Number.NaN;let L=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite($)&&$>0)&&Number.isFinite($)?$:0;q&&L<=0&&(L=gt);const B=xc({items:l,technicianIds:e.technicians||[],discount:k,discountType:V,applyTax:q,start:e.start,end:e.end,companySharePercent:L}),A=Ae(B.equipmentTotal),G=Ae(B.crewTotal);Ae(B.crewCostTotal);const K=Ae(B.discountAmount),I=Ae(B.subtotalAfterDiscount),O=Number.isFinite(B.companySharePercent)?B.companySharePercent:0;let R=Ae(B.companyShareAmount);R=O>0?Ae(Math.max(0,R)):0;const H=Ae(B.taxAmount),z=Ae(B.finalTotal),ne=r?z:_?P:z,ee=Ae(B.netProfit),ce=h(String(e.reservationId??e.id??"")),X=e.start?h(Oe(e.start)):"-",re=e.end?h(Oe(e.end)):"-",he=h(String(y.length)),ve=h(A.toFixed(2)),_e=h(K.toFixed(2)),U=h(I.toFixed(2)),Z=h(H.toFixed(2)),se=h((Number.isFinite(ne)?ne:0).toFixed(2)),fe=h(String(b)),me=o("reservations.create.summary.currency","SR"),Je=o("reservations.details.labels.discount","الخصم"),Y=o("reservations.details.labels.tax","الضريبة (15%)"),be=o("reservations.details.labels.crewTotal","إجمالي الفريق"),j=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),ae=o("reservations.details.labels.duration","عدد الأيام"),pe=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),le=o("reservations.details.labels.netProfit","💵 صافي الربح"),ye=o("reservations.create.equipment.imageAlt","صورة"),qe={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},Ne=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),Ke=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),Ye=o("reservations.details.technicians.roleUnknown","غير محدد"),Qt=o("reservations.details.technicians.phoneUnknown","غير متوفر"),cn=o("reservations.details.technicians.wage","{amount} {currency} / اليوم"),Gt=o("reservations.list.status.confirmed","✅ مؤكد"),J=o("reservations.list.status.pending","⏳ غير مؤكد"),Ee=o("reservations.list.payment.paid","💳 مدفوع"),Ze=o("reservations.list.payment.unpaid","💳 غير مدفوع"),ct=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),ka=o("reservations.list.status.completed","📁 منتهي"),_a=o("reservations.details.labels.id","🆔 رقم الحجز"),$a=o("reservations.details.section.bookingInfo","بيانات الحجز"),ln=o("reservations.details.section.paymentSummary","ملخص الدفع"),Wt=o("reservations.details.labels.finalTotal","المجموع النهائي"),vo=o("reservations.details.section.crew","😎 الفريق الفني"),qo=o("reservations.details.crew.count","{count} عضو"),So=o("reservations.details.section.items","📦 المعدات المرتبطة"),Eo=o("reservations.details.items.count","{count} عنصر"),xo=o("reservations.details.actions.edit","✏️ تعديل"),wo=o("reservations.details.actions.delete","🗑️ حذف"),Ao=o("reservations.details.labels.customer","العميل"),Io=o("reservations.details.labels.contact","رقم التواصل"),ko=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const _o=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),$o=o("reservations.details.actions.openProject","📁 فتح المشروع"),Po=o("reservations.details.labels.start","بداية الحجز"),To=o("reservations.details.labels.end","نهاية الحجز"),No=o("reservations.details.labels.notes","ملاحظات"),jo=o("reservations.list.noNotes","لا توجد ملاحظات"),Co=o("reservations.details.labels.itemsCount","عدد المعدات"),Lo=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),Bo=o("reservations.paymentHistory.title","سجل الدفعات"),Fo=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Do=o("reservations.list.unknownCustomer","غير معروف"),Pa=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),Xs=Pa==="partial",Ro=Pa==="paid"?Ee:Xs?ct:Ze;function Ta(T){if(T==null)return Number.NaN;if(typeof T=="number")return Number.isFinite(T)?T:Number.NaN;const Q=String(T).replace(/[^0-9.+-]/g,""),xe=Number(Q);return Number.isFinite(xe)?xe:Number.NaN}const Js=(T={})=>{const Q=String(T.type??T.kind??T.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(Q)||Array.isArray(T.packageItems)&&T.packageItems.length)},Mo=(T={})=>[T.packageId,T.package_id,T.packageCode,T.package_code,T.bundleId,T.bundle_id].some(Q=>Q!=null&&Q!==""),Ho=(T={})=>!T||typeof T!="object"?!1:!Js(T)&&Mo(T),Ys=(T={})=>{const Q=Js(T),xe=[{value:T.qty,key:"qty",limit:999},{value:T.quantity,key:"quantity",limit:999},{value:T.units,key:"units",limit:999},{value:T.count,key:"count",limit:50},{value:T.package_quantity,key:"package_quantity",limit:999},{value:T.packageQty,key:"packageQty",limit:999},{value:T.packageCount,key:"packageCount",limit:999}];let Me=NaN;for(const $e of xe){if($e.value==null||$e.value==="")continue;const et=typeof $e.value=="string"?$e.value.trim():String($e.value??"");if($e.key==="count"&&et.length>6)continue;const Te=Ta($e.value);if(!Number.isFinite(Te)||Te<=0)continue;const Cn=Math.round(Te);if(!(Cn>$e.limit)){Me=Math.max(1,Cn);break}}return(!Number.isFinite(Me)||Me<=0)&&(Me=1),Q?Math.max(1,Math.min(99,Me)):Math.max(1,Math.min(9999,Me))};let Pe=(Array.isArray(l)?l:[]).reduce((T,Q)=>!Q||typeof Q!="object"||Ho(Q)?T:T+Ys(Q),0);Pe<=0&&Array.isArray(u)&&u.length&&(Pe=u.reduce((T,Q)=>{const xe=Ys({...Q,type:Q.type});return T+xe},0)),!Number.isFinite(Pe)||Pe<=0?Pe=Array.isArray(u)&&u.length?u.length:(Array.isArray(l)?l.length:0)||1:Pe>1e6&&(Pe=Math.min(Pe,Array.isArray(u)?u.length:Pe),(!Number.isFinite(Pe)||Pe<=0)&&(Pe=(Array.isArray(l)?l.length:0)||1)),Pe=Math.max(1,Math.round(Pe));const zo=h(String(Pe)),Zs=Eo.replace("{count}",zo),Oo=qo.replace("{count}",he),Vo=e.notes?h(e.notes):jo,Uo=h(G.toFixed(2)),Ko=h(String(O)),Qo=h(R.toFixed(2)),Go=`${Ko}% (${Qo} ${me})`,Wo=Number.isFinite(ee)?Math.max(0,ee):0,Xo=h(Wo.toFixed(2)),vt=[{icon:"💼",label:Lo,value:`${ve} ${me}`}];vt.push({icon:"😎",label:be,value:`${Uo} ${me}`}),K>0&&vt.push({icon:"💸",label:Je,value:`${_e} ${me}`}),vt.push({icon:"📊",label:j,value:`${U} ${me}`}),q&&H>0&&vt.push({icon:"🧾",label:Y,value:`${Z} ${me}`}),O>0&&vt.push({icon:"🏦",label:pe,value:Go}),vt.push({icon:"💵",label:le,value:`${Xo} ${me}`}),vt.push({icon:"💰",label:Wt,value:`${se} ${me}`});const Jo=vt.map(({icon:T,label:Q,value:xe})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${T} ${Q}</span>
      <span class="summary-details-value">${xe}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let dn=[];Array.isArray(e.paymentHistory)?dn=e.paymentHistory:Array.isArray(e.payment_history)&&(dn=e.payment_history);const Yo=Array.isArray(e.paymentLogs)?e.paymentLogs:[],er=Array.isArray(dn)&&dn.length>0?dn:Yo,Zo=er.length?`<ul class="reservation-payment-history-list">${er.map(T=>{const Q=T?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):T?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),xe=Number.isFinite(Number(T?.amount))&&Number(T.amount)>0?`${h(Number(T.amount).toFixed(2))} ${me}`:"—",Me=Number.isFinite(Number(T?.percentage))&&Number(T.percentage)>0?`${h(Number(T.percentage).toFixed(2))}%`:"—",$e=T?.recordedAt?h(Oe(T.recordedAt)):"—",et=T?.note?`<div class="payment-history-note">${Fe(h(T.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${Fe(Q)}</span>
              <span class="payment-history-entry__amount">${xe}</span>
              <span class="payment-history-entry__percent">${Me}</span>
              <span class="payment-history-entry__date">${$e}</span>
            </div>
            ${et}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${Fe(Fo)}</div>`,tr=[{text:i?Gt:J,className:i?"status-confirmed":"status-pending"},{text:Ro,className:Pa==="paid"?"status-paid":Xs?"status-partial":"status-unpaid"}];d&&tr.push({text:ka,className:"status-completed"});const ec=tr.map(({text:T,className:Q})=>`<span class="status-chip ${Q}">${T}</span>`).join(""),$t=(T,Q,xe)=>`
    <div class="res-info-row">
      <span class="label">${T} ${Q}</span>
      <span class="value">${xe}</span>
    </div>
  `;let Na="";if(e.projectId){let T=Fe(_o);if(s){const Q=s.title||o("projects.fallback.untitled","مشروع بدون اسم");T=`${Fe(Q)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${Fe($o)}</button>`}Na=`
      <div class="res-info-row">
        <span class="label">📁 ${ko}</span>
        <span class="value">${T}</span>
      </div>
    `}const lt=[];lt.push($t("👤",Ao,t?.customerName||Do)),lt.push($t("📞",Io,t?.phone||"—")),lt.push($t("🗓️",Po,X)),lt.push($t("🗓️",To,re)),lt.push($t("📦",Co,Zs)),lt.push($t("⏱️",ae,fe)),lt.push($t("📝",No,Vo)),Na&&lt.push(Na);const tc=lt.join(""),nc=u.length?u.map(T=>{const Q=T.items[0]||{},xe=Ot(Q)||T.image,Me=xe?`<img src="${xe}" alt="${ye}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',$e=T.items.some(ge=>ge?.type==="package"),et=(ge,{fallback:Be=1,max:ie=1e3}={})=>{const Ge=Ta(ge);return Number.isFinite(Ge)&&Ge>0?Math.min(ie,Ge):Be};let Te;if($e){const ge=et(Q?.qty??Q?.quantity??Q?.count,{fallback:NaN,max:999});Number.isFinite(ge)&&ge>0?Te=ge:Te=et(T.quantity??T.count??1,{fallback:1,max:999})}else Te=et(T.quantity??T.count??Q?.qty??Q?.quantity??Q?.count??0,{fallback:1,max:9999});const Cn=h(String(Te)),ja=(ge,{preferPositive:Be=!1}={})=>{let ie=Number.NaN;for(const Ge of ge){const dt=ut(Ge);if(Number.isFinite(dt)){if(Be&&dt>0)return dt;Number.isFinite(ie)||(ie=dt)}}return ie};let we,Qe;if($e){const ge=[Q?.price,Q?.unit_price,Q?.unitPrice,T.unitPrice];if(we=ja(ge,{preferPositive:!0}),!Number.isFinite(we)||we<0){const ie=ut(T.totalPrice??Q?.total??Q?.total_price);Number.isFinite(ie)&&Te>0&&(we=ie/Te)}Number.isFinite(we)||(we=0);const Be=[Q?.total,Q?.total_price,T.totalPrice];if(Qe=ja(Be),!Number.isFinite(Qe))Qe=we*Te;else{const ie=we*Te;Number.isFinite(ie)&&ie>0&&Math.abs(Qe-ie)>ie*.25&&(Qe=ie)}}else{const ge=[Q?.price,Q?.unit_price,Q?.unitPrice,T.unitPrice];if(we=ja(ge,{preferPositive:!0}),!Number.isFinite(we)||we<0){const Be=ut(T.totalPrice??Q?.total??Q?.total_price);Number.isFinite(Be)&&Te>0&&(we=Be/Te)}Number.isFinite(we)||(we=0),Qe=ut(T.totalPrice??Q?.total??Q?.total_price),Number.isFinite(Qe)||(Qe=we*Te)}we=Ae(we),Qe=Ae(Qe);const ic=`${h(we.toFixed(2))} ${me}`,oc=`${h(Qe.toFixed(2))} ${me}`,nr=T.barcodes.map(ge=>h(String(ge||""))).filter(Boolean),ar=nr.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${nr.map(ge=>`<li>${ge}</li>`).join("")}
              </ul>
            </details>`:"";let sr="";if($e){const ge=new Map;if(T.items.forEach(Be=>{Array.isArray(Be?.packageItems)&&Be.packageItems.forEach(ie=>{if(!ie)return;const Ge=te(ie.barcode||ie.normalizedBarcode||ie.desc||Math.random()),dt=ge.get(Ge),un=Ta(ie.qty??ie.quantity??1),rr=Number.isFinite(un)&&un>0?un:1;if(dt){dt.qty+=rr;return}ge.set(Ge,{desc:ie.desc||ie.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:rr,barcode:ie.barcode??ie.normalizedBarcode??""})})}),ge.size){const Be=Array.from(ge.values()).map(ie=>{const Ge=h(String(ie.qty>0?ie.qty:1)),dt=Fe(ie.desc||""),un=ie.barcode?` <span class="reservation-package-items__barcode">(${Fe(h(String(ie.barcode)))})</span>`:"";return`<li>${dt}${un} × ${Ge}</li>`}).join("");sr=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${Be}
                </ul>
              </details>
            `}}const cc=$e?`${sr||""}${ar||""}`:ar;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${Me}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${Fe(Q.desc||Q.description||Q.name||T.description||"-")}</div>
                  ${cc}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Fe(qe.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Cn}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Fe(qe.unitPrice)}">${ic}</td>
            <td class="reservation-modal-items-table__cell" data-label="${Fe(qe.total)}">${oc}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${Fe(qe.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${Ne}</td></tr>`,ac=`
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
        <tbody>${nc}</tbody>
      </table>
    </div>
  `,sc=y.map((T,Q)=>{const xe=h(String(Q+1)),Me=T.role||Ye,$e=T.phone||Qt,et=T.wage?cn.replace("{amount}",h(String(T.wage))).replace("{currency}",me):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${xe}</span>
          <span class="technician-name">${T.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${Me}</div>
          <div>📞 ${$e}</div>
          ${et?`<div>💰 ${et}</div>`:""}
        </div>
      </div>
    `}).join(""),rc=y.length?`<div class="reservation-technicians-grid">${sc}</div>`:`<ul class="reservation-modal-technicians"><li>${Ke}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${_a}</span>
          <strong>${ce}</strong>
        </div>
        <div class="status-chips">
          ${ec}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${$a}</h6>
          ${tc}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${ln}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${Jo}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Bo}</h6>
              ${Zo}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${vo}</span>
          <span class="count">${Oo}</span>
        </div>
        ${rc}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${So}</span>
          <span class="count">${Zs}</span>
        </div>
        ${ac}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${xo}</button>
        ${g?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${wo}</button>`:""}
      </div>
    </div>
  `}const em="project",tm="editProject",nm=3600*1e3,vi=.15,am=6,sm="projectsTab",rm="projectsSubTab",im={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},om={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},cm={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},Ul=`@page {
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
`,Kl=/color\([^)]*\)/gi,wn=/(color\(|color-mix\(|oklab|oklch)/i,Ql=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"],Gl=typeof document<"u"?document.createElement("canvas"):null,Fn=Gl?.getContext?.("2d")||null;function qi(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function es(e,t="#000"){if(!Fn||!e)return t;try{return Fn.fillStyle="#000",Fn.fillStyle=e,Fn.fillStyle||t}catch{return t}}function Wl(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&wn.test(n)){const s=es(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function Xt(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function lm(e=[]){if(!(!Array.isArray(e)||!e.length))for(let t=e.length-1;t>=0;t-=1){const{element:n,prop:a,value:s,priority:r}=e[t]||{};!n?.style||!a||(s&&s.length>0?n.style.setProperty(a,s,r||""):n.style.removeProperty(a))}}function Si(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;Ql.forEach(c=>{const d=r[c];if(d&&wn.test(d)){const l=qi(c);Xt(n,s,l);const u=c==="backgroundColor"?"#ffffff":r.color||"#000000",p=es(d,u);s.style.setProperty(l,p,"important")}});const i=r.backgroundImage;if(i&&wn.test(i)){const c=es(r.backgroundColor||"#ffffff","#ffffff");Xt(n,s,"background-image"),Xt(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function Ei(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(c=>{const d=r[c];if(d&&wn.test(d)){const l=qi(c);Xt(n,s,l);const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(l,u,"important")}});const i=r.backgroundImage;i&&wn.test(i)&&(Xt(n,s,"background-image"),Xt(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function xi(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(Kl,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const wi="reservations.quote.sequence",hr={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},Ai="https://help.artratio.sa/guide/quote-preview",ke={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Xl=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Re=[...Xl],Jl=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function ts(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...Re]}function Yl(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=ts(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=ts(t.value);if(a.length)return a}const n=Re.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...Re]}const Zl=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],Ii=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>E(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>E(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>E(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>E(h(Number(e?.price||0).toFixed(2)))}],ki=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>E(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>E(e?.role||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>E(e?.phone||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],ns={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:Ii.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:ki.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},_i=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>E(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>E(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>E(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],$i=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>E(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>E(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>E(e?.note||"-")}],Pi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>E(h(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>E(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>E(h(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>E(h(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>E(e?.displayCost||"—")}],ed=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],td={customerInfo:ns.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:ns.payment,projectExpenses:$i.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:_i.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:Pi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},Da=new Map;function qa(e="reservation"){if(Da.has(e))return Da.get(e);const t=e==="project"?ed:Zl,n=e==="project"?td:ns,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(d=>d.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return Da.set(e,r),r}function Sa(e="reservation"){return qa(e).sectionDefs}function Ti(e="reservation"){return qa(e).fieldDefs}function Ni(e="reservation"){return qa(e).sectionIdSet}function ji(e="reservation"){return qa(e).fieldIdMap}function Ci(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const nd="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",ad="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",sd="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",Li=Ul.trim(),Bi=/^data:image\/svg\+xml/i,rd=/\.svg($|[?#])/i,gn=512,as="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",Fi=96,Di=25.4,ss=210,Hn=297,zn=Math.round(ss/Di*Fi),On=Math.round(Hn/Di*Fi),id=2,Ri=/safari/i,od=/(iphone|ipad|ipod)/i,vr=/(iphone|ipad|ipod)/i,cd=/(crios|fxios|edgios|opios)/i,ta="[reservations/pdf]";let W=null,N=null,nt=1,pn=null,fn=null,St=null,Jt=null,vn=!1;function Bt(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!W?.statusIndicator||!W?.statusText)return;W.statusKind=e;const r=t||Ci(e);W.statusText.textContent=r,W.statusSpinner&&(W.statusSpinner.hidden=!s),W.statusAction&&(W.statusAction.hidden=!0,W.statusAction.onclick=null,n&&typeof a=="function"&&(W.statusAction.textContent=n,W.statusAction.hidden=!1,W.statusAction.onclick=i=>{i.preventDefault(),a()})),W.statusIndicator.hidden=!1,requestAnimationFrame(()=>{W.statusIndicator.classList.add("is-visible")})}function qn(e){!W?.statusIndicator||!W?.statusText||(W.statusKind=null,W.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{W?.statusIndicator&&(W.statusIndicator.hidden=!0,W.statusAction&&(W.statusAction.hidden=!0,W.statusAction.onclick=null),W.statusSpinner&&(W.statusSpinner.hidden=!1))},220))}function rs(){return!!window?.bootstrap?.Modal}function ld(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),St||(St=document.createElement("div"),St.className="modal-backdrop fade show",St.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(St)),Jt||(Jt=t=>{t.key==="Escape"&&is(e)},document.addEventListener("keydown",Jt));try{e.focus({preventScroll:!0})}catch{}}}function is(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),St&&(St.remove(),St=null),Jt&&(document.removeEventListener("keydown",Jt),Jt=null))}function dd(e){if(e){if(rs()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}ld(e)}}function ud(){if(vn)return;vn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!W?.modal?.classList.contains("show"),s=()=>{W?.modal?.classList.contains("show")&&(Bt("render"),vn=!1,Kt())};Nr({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:Ai}),a&&Bt("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function Ea(e="reservation"){const t={},n=Ti(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function Fs(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function md(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function Ds(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function Rs(e="reservation"){return Object.fromEntries(Sa(e).map(({id:t})=>[t,!1]))}function Ms(e,t){return e.sectionExpansions||(e.sectionExpansions=Rs(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function pd(e,t){return Ms(e,t)?.[t]!==!1}function Hs(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function fd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return od.test(e)}function yd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=Ri.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Mi(){return fd()&&yd()}function xa(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=vr.test(e)||vr.test(t),s=/Macintosh/i.test(e)&&n>1;return Ri.test(e)&&!cd.test(e)&&(a||s)}function Ra(e,...t){try{console.log(`${ta} ${e}`,...t)}catch{}}function yt(e,...t){try{console.warn(`${ta} ${e}`,...t)}catch{}}function gd(e,t,...n){try{t?console.error(`${ta} ${e}`,t,...n):console.error(`${ta} ${e}`,...n)}catch{}}function Se(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function bd(e,t="لا توجد بيانات للعرض."){const n=E(o(e,t));return Se(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function na(e,t){return Array.isArray(e)&&e.length?e:[bd(t)]}const hd=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function Hi(e=""){return hd.test(e)}function vd(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!Hi(r))return a.call(this,r,...i);let c,d=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),d=!0)}catch{}try{if(!d){const l=this.canvas;l&&l.style?.direction!=="rtl"&&(l.__artRatioOriginalDirection=l.style.direction,l.style.direction="rtl")}return a.call(this,r,...i)}finally{if(d&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!d){const l=this.canvas;l&&l.__artRatioOriginalDirection!==void 0&&(l.style.direction=l.__artRatioOriginalDirection,delete l.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function qr(e,t=gn){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function qd(e){if(!e)return{width:gn,height:gn};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?qr(t,0):0,s=n?qr(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,d]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(d)&&d>0?d:0)}}return{width:a||gn,height:s||gn}}function zi(e=""){return typeof e!="string"?!1:Bi.test(e)||rd.test(e)}function Sd(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Ed(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function Oi(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await Ed(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),d=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=d;const l=i.getContext("2d");return l.clearRect(0,0,c,d),l.drawImage(r,0,0,c,d),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function xd(e){if(!e)return null;if(Bi.test(e))return Sd(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function wd(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!zi(t))return!1;const n=await xd(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",as),!1;const a=await Oi(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",as),!1)}async function Ad(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=qd(e),s=await Oi(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||as),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),d=e.getAttribute("height");return c&&i.setAttribute("width",c),d&&i.setAttribute("height",d),e.parentNode?.replaceChild(i,e),!!s}async function Vi(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{zi(s.getAttribute?.("src"))&&a.push(wd(s))}),n.forEach(s=>{a.push(Ad(s))}),a.length&&await Promise.allSettled(a)}function Id(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(I,O=0)=>{const R=parseFloat(I);return Number.isFinite(R)?R:O},i=r(s.paddingTop),c=r(s.paddingBottom),d=r(s.paddingRight),l=r(s.paddingLeft),u=r(s.borderRadius),p=r(s.fontSize,14),f=(()=>{const I=s.lineHeight;if(!I||I==="normal")return p*1.6;const O=r(I,p*1.6);return O>0?O:p*1.6})(),m=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(m<=0)return null;const y=Math.max(1,m-l-d),g=e.textContent||"",b=g.split(/\r?\n/),w=n.createElement("canvas"),v=w.getContext("2d");if(!v)return null;const k=s.fontStyle||"normal",F=s.fontVariant||"normal",V=s.fontWeight||"400",q=s.fontFamily||"sans-serif",x=s.fontStretch||"normal",_=I=>I.join(" "),P=[],D=I=>v.measureText(I).width;v.font=`${k} ${F} ${V} ${x} ${p}px ${q}`,b.forEach(I=>{const O=I.trim();if(O.length===0){P.push("");return}const R=O.split(/\s+/);let H=[];R.forEach((z,ne)=>{const ee=z.trim();if(!ee)return;const ce=_(H.concat(ee));if(D(ce)<=y||H.length===0){H.push(ee);return}P.push(_(H)),H=[ee]}),H.length&&P.push(_(H))}),P.length||P.push("");const $=i+c+P.length*f,C=Math.ceil(Math.max(1,m)*t),M=Math.ceil(Math.max(1,$)*t);w.width=C,w.height=M,w.style.width=`${Math.max(1,m)}px`,w.style.height=`${Math.max(1,$)}px`,v.scale(t,t);const L=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){v.save(),v.beginPath();const I=Math.max(1,m),O=Math.max(1,$),R=Math.min(u,I/2,O/2);v.moveTo(R,0),v.lineTo(I-R,0),v.quadraticCurveTo(I,0,I,R),v.lineTo(I,O-R),v.quadraticCurveTo(I,O,I-R,O),v.lineTo(R,O),v.quadraticCurveTo(0,O,0,O-R),v.lineTo(0,R),v.quadraticCurveTo(0,0,R,0),v.closePath(),v.clip()}if(v.fillStyle=L,v.fillRect(0,0,Math.max(1,m),Math.max(1,$)),v.font=`${k} ${F} ${V} ${x} ${p}px ${q}`,v.fillStyle=s.color||"#000000",v.textBaseline="top",v.textAlign="right","direction"in v)try{v.direction="rtl"}catch{}const B=Math.max(0,m-d);let A=i;P.forEach(I=>{const O=I.length?I:" ";v.fillText(O,B,A,y),A+=f});const G=n.createElement("img");let K;try{K=w.toDataURL("image/png")}catch(I){return yt("note canvas toDataURL failed",I),null}return G.src=K,G.alt=g,G.style.width=`${Math.max(1,m)}px`,G.style.height=`${Math.max(1,$)}px`,G.style.display="block",G.setAttribute("data-quote-note-image","true"),{image:G,canvas:w,totalHeight:$,width:m}}function kd(e,{pixelRatio:t=1}={}){if(!e||!xa())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!Hi(a.textContent||""))return;let s;try{s=Id(a,{pixelRatio:t})}catch(r){yt("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function os(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){gd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),d=o("reservations.quote.toast.retry","إعادة المحاولة"),l=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(Bt("export"),no()):(Bt("render"),vn=!1,Kt())};if(Nr({message:i,duration:9e3,actionLabel:l?d:void 0,onAction:l?u:void 0,linkLabel:c,linkHref:Ai}),W?.modal?.classList.contains("show")&&Bt("error",{message:i,actionLabel:l?d:void 0,onAction:l?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function cs({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){yt("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){yt("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function zs(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function Sr(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function Er(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function _d(){const e=Er();return e||(fn||(fn=zs(ad).catch(t=>{throw fn=null,t}).then(()=>{const t=Er();if(!t)throw fn=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),fn)}async function $d(){const e=Sr();return e||(pn||(pn=zs(sd).catch(t=>{throw pn=null,t}).then(()=>{const t=Sr();if(!t)throw pn=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),pn)}async function Pd(){if(window.html2pdf||await zs(nd),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}Wl(),vd()}function E(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Td(e="reservation"){return e==="project"?"QP":"Q"}function Nd(e,t="reservation"){const n=Number(e),a=Td(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function jd(){const e=window.localStorage?.getItem?.(wi),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function Ui(e="reservation"){const n=jd()+1;return{sequence:n,quoteNumber:Nd(n,e)}}function Cd(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(wi,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function Ki(e="reservation"){return hr[e]||hr.reservation}function Ld(e="reservation"){try{const t=Ki(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function Bd(e,t="reservation"){try{const n=Ki(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function Fd(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function Dd(e,t="reservation"){if(!e)return null;const n=Ni(t),a=ji(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,d])=>{const l=i[c];if(l==null)return;const{ids:u,emptyExplicitly:p}=Fd(l);if(!u&&!p)return;const f=Array.isArray(u)?u.filter(m=>d.has(m)):[];(f.length>0||p)&&(r[c]=f)}),{version:1,sections:s,fields:r}}function Qi(e){if(!e)return;const t=e.context||"reservation",n=Dd(e,t);n&&Bd(n,t)}function Gi(e){if(!e)return;const t=e.context||"reservation",n=Ld(t);if(!n)return;const a=Ni(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=Fs(e.fields||Ea(t)),i=ji(t);Object.entries(n.fields).forEach(([c,d])=>{const l=i[c];if(!l)return;const u=Array.isArray(d)?d.filter(p=>l.has(p)):[];r[c]=new Set(u)}),e.fields=r}}function Wi(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function Xi(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return 0}function Rd(e={}){const t=[e.dailyTotal,e.daily_total,e.totalRate,e.total,e.total_wage];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return Xi(e)}function Md(e){const t=$n()||[],{technicians:n=[]}=ue(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const i=String(r.id),c=s.get(i)||{};s.set(i,{...c,...r})}),(e.technicians||[]).map(r=>s.get(String(r))).filter(Boolean)}function Hd(e,t,n){const{projectLinked:a}=At(e,n),s=da(e.start,e.end),{groups:r}=xs(e),c=r.reduce((K,I)=>{const O=Array.isArray(I?.items)&&I.items.length?I.items[0]:{},R=Number(I?.count??I?.quantity??O?.qty??1)||1;let z=[O?.price,O?.unit_price,O?.unitPrice,I?.unitPrice].reduce((ee,ce)=>{if(Number.isFinite(ee)&&ee>0)return ee;const X=Number(ce);return Number.isFinite(X)?X:ee},NaN);if(!Number.isFinite(z)||z<=0){const ee=Number(I?.totalPrice??O?.total??O?.total_price);Number.isFinite(ee)&&R>0&&(z=Number((ee/R).toFixed(2)))}Number.isFinite(z)||(z=0),z=Ae(z);const ne=Ae(z);return K+ne*R},0)*s,d=t.reduce((K,I)=>K+Xi(I),0),l=t.reduce((K,I)=>K+Rd(I),0),u=d*s,p=l*s,f=c+p,m=parseFloat(e.discount)||0,y=e.discountType==="amount"?m:f*(m/100),g=Math.max(0,f-y),b=a?!1:e.applyTax,w=Number(e.cost),v=Number.isFinite(w),k=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,F=k!=null?parseFloat(h(String(k).replace("%","").trim())):NaN,V=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let x=(V!=null?V===!0||V===1||V==="1"||String(V).toLowerCase()==="true":Number.isFinite(F)&&F>0)&&Number.isFinite(F)?Number(F):0;b&&x<=0&&(x=gt);let _=x>0?Math.max(0,g*(x/100)):0;_=Number(_.toFixed(2));const P=g+_;let D=b?P*.15:0;(!Number.isFinite(D)||D<0)&&(D=0),D=Number(D.toFixed(2));const $=P+D,C=Number.isFinite($)?Number($.toFixed(2)):0,M=a?C:v?w:C,L=Math.max(0,c+p-y),B=Math.max(0,L-u),A={equipmentTotal:c,crewTotal:p,crewCostTotal:u,discountAmount:y,subtotalAfterDiscount:g,taxableAmount:P,taxAmount:D,finalTotal:M,companySharePercent:x,companyShareAmount:_,netProfit:B},G={equipmentTotal:h(c.toFixed(2)),crewTotal:h(p.toFixed(2)),discountAmount:h(y.toFixed(2)),subtotalAfterDiscount:h(g.toFixed(2)),taxableAmount:h(P.toFixed(2)),taxAmount:h(D.toFixed(2)),finalTotal:h(M.toFixed(2)),companySharePercent:h(x.toFixed(2)),companyShareAmount:h(_.toFixed(2)),netProfit:h(B.toFixed(2))};return{totals:A,totalsDisplay:G,rentalDays:s}}function tn(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function Ji(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function zd(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=tn(e.amount??(n==="amount"?e.value:null)),s=tn(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=Ji(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function Od(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(zd).filter(Boolean);if(n.length>0)return n;const a=tn(e.paidPercent??e.paid_percent),s=tn(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Ji(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function Vd(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function Ud(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function Kd(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function Qd(e){const t=Number(e?.equipmentEstimate)||0,n=Kd(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const d=Math.max(0,a-c),l=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,p=l&&s&&u>0?u:0,f=p>0?Number((d*(p/100)).toFixed(2)):0,m=d+f;let y=s?m*vi:0;(!Number.isFinite(y)||y<0)&&(y=0),y=Number(y.toFixed(2));let g=s?Number(e?.totalWithTax):m;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((m+y).toFixed(2))):g=m,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:d,companyShareAmount:f,subtotal:m,applyTax:s,taxAmount:y,totalWithTax:g}}function Gd(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.technicians)?e.technicians:[],i=vs(t,a,s,!1,r,{start:e.start,end:e.end});if(Number.isFinite(i))return i;const c=Number(h(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function Wd(e,t){if(!e)return"—";const n=Oe(e);return t?`${n} - ${Oe(t)}`:n}function oe(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${h(a.toFixed(s))} ${t}`}function xr(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function Xd(e){if(!e?.start)return null;if(!e?.end)return 1;const t=da(e.start,e.end);return Number.isFinite(t)?t:1}function Jd(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function Yd(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=ue(),i=e?.id!=null?s.find(j=>String(j.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:oe(0,t),expensesTotal:oe(0,t),reservationsTotal:oe(0,t),discountAmount:oe(0,t),taxAmount:oe(0,t),overallTotal:oe(0,t),paidAmount:oe(0,t),remainingAmount:oe(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:oe(0,t),remainingAmountDisplay:oe(0,t),paidPercentDisplay:xr(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const d=i.clientId??i.customerId??i.client_id??i.customer_id??null,l=d!=null&&n.find(j=>String(j.id)===String(d))||null,u=l?.customerName??l?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),p=(i.clientCompany||l?.companyName||l?.company||"").trim(),f=l?.phone??l?.customerPhone??i.clientPhone??i.customerPhone??"",m=f?h(String(f).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),y=l?.email??i.clientEmail??i.customerEmail??"",g=y?String(y).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),b=i.projectCode||`PRJ-${h(String(i.id??""))}`,w=h(String(b)),v=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),k=Vd(i.type),F=i.start?Oe(i.start):"—",V=i.end?Oe(i.end):"—",q=Xd(i),x=q!=null?Jd(q):"غير محدد",_=Ud(i),P={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},D=o(`projects.status.${_}`,P[_]||_),$=i.id!=null?String(i.id):null,C=$?a.filter(j=>String(j.projectId)===$):[],L=C.map(j=>{const ae=j.reservationId||j.id||"",pe=j.status||j.state||"pending",le=String(pe).toLowerCase(),ye=o(`reservations.status.${le}`,le),qe=Gd(j),Ne=j.start?new Date(j.start).getTime():0;return{reservationId:h(String(ae||"-")),status:le,statusLabel:ye,total:qe,totalLabel:oe(qe,t),dateRange:Wd(j.start,j.end),startTimestamp:Number.isNaN(Ne)?0:Ne}}).sort((j,ae)=>ae.startTimestamp-j.startTimestamp).map(({startTimestamp:j,...ae})=>ae).reduce((j,ae)=>j+(Number(ae.total)||0),0),B=new Map;C.forEach(j=>{const ae=Array.isArray(j.items)?j.items:[],pe=da(j.start,j.end),le=j.reservationId||j.id||"";ae.forEach((ye,qe)=>{if(!ye)return;const Ne=ye.barcode||ye.code||ye.id||ye.desc||ye.description||`item-${qe}`,Ke=String(Ne||`item-${qe}`),Ye=B.get(Ke)||{description:ye.desc||ye.description||ye.name||ye.barcode||`#${h(String(qe+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},Qt=Number(ye.qty)||1,cn=Number(ye.price)||0;Ye.totalQuantity+=Qt,Ye.reservationIds.add(String(le));const Gt=cn*Qt*Math.max(1,pe);Number.isFinite(Gt)&&(Ye.totalCost+=Gt),B.set(Ke,Ye)})});const A=Array.from(B.values()).map(j=>({description:j.description,totalQuantity:j.totalQuantity,reservationsCount:j.reservationIds.size,displayCost:oe(j.totalCost,t)})),G=new Map((r||[]).filter(Boolean).map(j=>[String(j.id),j])),K=new Map,I=j=>{if(!j)return;let ae=null;typeof j=="object"?ae=j.id??j.technicianId??j.technician_id??j.userId??j.user_id??null:(typeof j=="string"||typeof j=="number")&&(ae=j);const pe=ae!=null?String(ae):null,le=pe&&G.has(pe)?G.get(pe):typeof j=="object"?j:null,ye=le?.name||le?.full_name||le?.fullName||le?.displayName||(typeof j=="string"?j:null),qe=le?.role||le?.title||null,Ne=le?.phone||le?.mobile||le?.contact||null;if(!ye&&!pe)return;const Ke=pe||ye;K.has(Ke)||K.set(Ke,{id:pe,name:ye||"-",role:qe||null,phone:Ne||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(j=>I(j)),C.forEach(j=>{(Array.isArray(j.technicians)?j.technicians:[]).forEach(pe=>I(pe))});const O=Array.from(K.values()),R=Array.isArray(i.expenses)?i.expenses.map(j=>{const ae=Number(j?.amount)||0;return{label:j?.label||j?.name||"-",amount:ae,displayAmount:oe(ae,t),note:j?.note||j?.description||""}}):[],H=Qd(i),z=H.applyTax?Number(((H.subtotal+L)*vi).toFixed(2)):0,ne=Number((H.subtotal+L+z).toFixed(2)),ee=Od(i),ce=tn(i.paidAmount??i.paid_amount)||0,X=tn(i.paidPercent??i.paid_percent)||0,re=qs({totalAmount:ne,paidAmount:ce,paidPercent:X,history:ee}),he=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",ve=Ss({manualStatus:he,paidAmount:re.paidAmount,paidPercent:re.paidPercent,totalAmount:ne}),_e={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},U=o(`projects.paymentStatus.${ve}`,_e[ve]||ve),Z=Number(re.paidAmount||0),se=Number(re.paidPercent||0),fe=Math.max(0,Number((ne-Z).toFixed(2))),me={projectSubtotal:oe(H.subtotal,t),expensesTotal:oe(H.expensesTotal,t),reservationsTotal:oe(L,t),discountAmount:oe(H.discountAmount,t),taxAmount:oe(z,t),overallTotal:oe(ne,t),paidAmount:oe(Z,t),remainingAmount:oe(fe,t)},Je={status:ve,statusLabel:U,paidAmount:Z,paidPercent:se,remainingAmount:fe,paidAmountDisplay:oe(Z,t),remainingAmountDisplay:oe(fe,t),paidPercentDisplay:xr(se)},Y=(i.description||"").trim();return{project:i,customer:l,clientInfo:{name:u,company:p||"—",phone:m,email:g},projectInfo:{title:v,code:w,typeLabel:k,startDisplay:F,endDisplay:V,durationLabel:x,statusLabel:D},expenses:R,equipment:A,crew:O,totals:H,totalsDisplay:me,projectTotals:{combinedTaxAmount:z,overallTotal:ne,reservationsTotal:L,paidAmount:Z,paidPercent:se,remainingAmount:fe,paymentStatus:ve},paymentSummary:Je,notes:Y,currencyLabel:t,projectStatus:_,projectStatusLabel:D,projectDurationDays:q,projectDurationLabel:x,paymentHistory:ee}}function Zd({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:d={},currencyLabel:l="SR",sections:u,fieldSelections:p={},quoteNumber:f,quoteDate:m,terms:y=Re}){const g=Fs(p),b=(U,Z)=>Ds(g,U,Z),w=U=>u?.has?.(U),v=`<div class="quote-placeholder">${E(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,k=(U,Z)=>`<div class="info-plain__item">
      <span class="info-plain__label">${E(U)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${E(Z)}</span>
    </div>`,F=(U,Z,{variant:se="inline"}={})=>se==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${E(U)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${E(Z)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${E(U)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${E(Z)}</span>
    </span>`,V=(U,Z)=>`<div class="payment-row">
      <span class="payment-row__label">${E(U)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${E(Z)}</span>
    </div>`,q=[];b("customerInfo","customerName")&&q.push(k(o("projects.details.client","العميل"),t.name||"-")),b("customerInfo","customerCompany")&&q.push(k(o("projects.details.company","شركة العميل"),t.company||"—")),b("customerInfo","customerPhone")&&q.push(k(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),b("customerInfo","customerEmail")&&q.push(k(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const x=w("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${E(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${q.length?`<div class="info-plain">${q.join("")}</div>`:v}
      </section>`:"",_=[];b("projectInfo","projectType")&&_.push(k(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),b("projectInfo","projectTitle")&&_.push(k(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),b("projectInfo","projectCode")&&_.push(k(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),b("projectInfo","projectStart")&&_.push(k(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),b("projectInfo","projectEnd")&&_.push(k(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),b("projectInfo","projectDuration")&&_.push(k(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),b("projectInfo","projectStatus")&&_.push(k(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const P=w("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${E(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${_.length?`<div class="info-plain">${_.join("")}</div>`:v}
      </section>`:"",D=_i.filter(U=>b("projectCrew",U.id)),$=w("projectCrew")?D.length?`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${D.map(U=>`<th>${E(U.labelKey?o(U.labelKey,U.fallback):U.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((U,Z)=>`<tr>${D.map(se=>`<td>${se.render(U,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(D.length,1)}" class="empty">${E(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${v}
          </section>`:"",C=[];b("financialSummary","projectSubtotal")&&C.push(F(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${oe(0,l)}`)),b("financialSummary","expensesTotal")&&C.push(F(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||oe(0,l))),b("financialSummary","reservationsTotal")&&C.push(F(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||oe(0,l))),b("financialSummary","discountAmount")&&C.push(F(o("reservations.details.labels.discount","الخصم"),i.discountAmount||oe(0,l))),b("financialSummary","taxAmount")&&C.push(F(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||oe(0,l)));const M=[];b("financialSummary","overallTotal")&&M.push(F(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||oe(0,l),{variant:"final"})),b("financialSummary","paidAmount")&&M.push(F(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||oe(0,l),{variant:"final"})),b("financialSummary","remainingAmount")&&M.push(F(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||oe(0,l),{variant:"final"}));const L=w("financialSummary")?!C.length&&!M.length?`<section class="quote-section quote-section--financial">${v}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${E(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${C.length?`<div class="totals-inline">${C.join("")}</div>`:""}
            ${M.length?`<div class="totals-final">${M.join("")}</div>`:""}
          </div>
        </section>`:"",B=$i.filter(U=>b("projectExpenses",U.id)),A=w("projectExpenses")?B.length?`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${B.map(U=>`<th>${E(U.labelKey?o(U.labelKey,U.fallback):U.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((U,Z)=>`<tr>${B.map(se=>`<td>${se.render(U,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(B.length,1)}" class="empty">${E(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${v}
          </section>`:"",G=Pi.filter(U=>b("projectEquipment",U.id)),K=w("projectEquipment")?G.length?`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${G.map(U=>`<th>${E(U.labelKey?o(U.labelKey,U.fallback):U.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${r.length?r.map((U,Z)=>`<tr>${G.map(se=>`<td>${se.render(U,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(G.length,1)}" class="empty">${E(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${v}
          </section>`:"",I=(e?.description||"").trim()||"",O=w("projectNotes")?`<section class="quote-section">
        <h3>${E(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${E(I||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",R=[];b("payment","beneficiary")&&R.push(V(o("reservations.quote.labels.beneficiary","اسم المستفيد"),ke.beneficiaryName)),b("payment","bank")&&R.push(V(o("reservations.quote.labels.bank","اسم البنك"),ke.bankName)),b("payment","account")&&R.push(V(o("reservations.quote.labels.account","رقم الحساب"),h(ke.accountNumber))),b("payment","iban")&&R.push(V(o("reservations.quote.labels.iban","رقم الآيبان"),h(ke.iban)));const H=`<section class="quote-section">
      <div class="payment-block">
        <h3>${E(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${R.length?R.join(""):v}</div>
      </div>
      <p class="quote-approval-note">${E(ke.approvalNote)}</p>
    </section>`,z=Array.isArray(y)&&y.length?y:Re,ne=`<footer class="quote-footer">
        <h4>${E(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${z.map(U=>`<li>${E(U)}</li>`).join("")}</ul>
      </footer>`,ee=[],ce=[];if(P&&ce.push({key:"project",html:P}),x&&ce.push({key:"customer",html:x}),ce.length>1){const U=ce.find(fe=>fe.key==="project"),Z=ce.find(fe=>fe.key==="customer"),se=[];U?.html&&se.push(U.html),Z?.html&&se.push(Z.html),ee.push(Se(`<div class="quote-section-row quote-section-row--primary">${se.join("")}</div>`,{blockType:"group"}))}else ce.length===1&&ee.push(Se(ce[0].html));const X=[];$&&X.push(Se($,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),A&&X.push(Se(A,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),K&&X.push(Se(K,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const re=[];L&&re.push(Se(L,{blockType:"summary"})),O&&re.push(Se(O));const he=[Se(H,{blockType:"payment"}),Se(ne,{blockType:"footer"})],ve=[...na(ee,"projects.quote.placeholder.primary"),...X,...na(re,"projects.quote.placeholder.summary"),...he],_e=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${E(ke.logoUrl)}" alt="${E(ke.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${E(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${E(ke.companyName)}</p>
        <p class="quote-company-cr">${E(o("reservations.quote.labels.cr","السجل التجاري"))}: ${E(ke.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${E(o("reservations.details.labels.reservationId","رقم العرض"))}</span>
          <strong>${E(f)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${E(o("projects.quote.labels.date","التاريخ"))}</span>
          <strong>${E(m)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Li}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${_e}
          ${ve.join("")}
        </div>
      </div>
    </div>
  `}function Yi(e){if(e?.context==="project")return Zd(e);const{reservation:t,customer:n,project:a,technicians:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:d,sections:l,fieldSelections:u={},quoteNumber:p,quoteDate:f,terms:m=Re}=e,y=h(String(t?.reservationId??t?.id??"")),g=t.start?h(Oe(t.start)):"-",b=t.end?h(Oe(t.end)):"-",w=n?.customerName||n?.full_name||n?.name||"-",v=n?.phone||"-",k=n?.email||"-",F=n?.company||n?.company_name||"-",V=h(v),q=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),x=a?.code||a?.projectCode||"",_=h(String(c)),P=t?.notes||"",D=Array.isArray(m)&&m.length?m:Re,$=Fs(u),C=(J,Ee)=>Ds($,J,Ee),M=J=>l?.has?.(J),L=`<div class="quote-placeholder">${E(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,B=(J,Ee)=>`<div class="info-plain__item">${E(J)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${E(Ee)}</strong></div>`,A=(J,Ee,{variant:Ze="inline"}={})=>Ze==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${E(J)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${E(Ee)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${E(J)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${E(Ee)}</span>
    </span>`,G=(J,Ee)=>`<div class="payment-row">
      <span class="payment-row__label">${E(J)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${E(Ee)}</span>
    </div>`,K=[];C("customerInfo","customerName")&&K.push(B(o("reservations.details.labels.customer","العميل"),w)),C("customerInfo","customerCompany")&&K.push(B(o("reservations.details.labels.company","الشركة"),F)),C("customerInfo","customerPhone")&&K.push(B(o("reservations.details.labels.phone","الهاتف"),V)),C("customerInfo","customerEmail")&&K.push(B(o("reservations.details.labels.email","البريد"),k));const I=M("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${E(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${K.length?`<div class="info-plain">${K.join("")}</div>`:L}
      </section>`:"",O=[];C("reservationInfo","reservationId")&&O.push(B(o("reservations.details.labels.reservationId","رقم الحجز"),y||"-")),C("reservationInfo","reservationStart")&&O.push(B(o("reservations.details.labels.start","بداية الحجز"),g)),C("reservationInfo","reservationEnd")&&O.push(B(o("reservations.details.labels.end","نهاية الحجز"),b)),C("reservationInfo","reservationDuration")&&O.push(B(o("reservations.details.labels.duration","عدد الأيام"),_));const R=M("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${E(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${O.length?`<div class="info-plain">${O.join("")}</div>`:L}
      </section>`:"",H=[];C("projectInfo","projectTitle")&&H.push(B(o("reservations.details.labels.project","المشروع"),q)),C("projectInfo","projectCode")&&H.push(B(o("reservations.details.labels.code","الرمز"),x||"-"));const z=M("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${E(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${H.length?`<div class="info-plain">${H.join("")}</div>`:L}
      </section>`:"",ne=[];C("financialSummary","equipmentTotal")&&ne.push(A(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${d}`)),C("financialSummary","crewTotal")&&ne.push(A(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${d}`)),C("financialSummary","discountAmount")&&ne.push(A(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${d}`)),C("financialSummary","taxAmount")&&ne.push(A(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${d}`));const ee=C("financialSummary","finalTotal"),ce=[];ee&&ce.push(A(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${d}`,{variant:"final"}));const X=ce.length?`<div class="totals-final">${ce.join("")}</div>`:"",re=M("financialSummary")?!ne.length&&!ee?`<section class="quote-section quote-section--financial">${L}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${E(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${ne.length?`<div class="totals-inline">${ne.join("")}</div>`:""}
            ${X}
          </div>
        </section>`:"",{groups:he}=xs(t),ve=he.map(J=>{const Ee=Number(J?.count??J?.quantity??1)||1,Ze=Number(J?.unitPrice);let ct=Number.isFinite(Ze)?Ze:0;if(!ct||ct<=0){const Wt=Number(J?.totalPrice);Number.isFinite(Wt)&&Ee>0&&(ct=Number((Wt/Ee).toFixed(2)))}Number.isFinite(ct)||(ct=0);const ka=J?.type==="package"||Array.isArray(J?.items)&&J.items.some(Wt=>Wt?.type==="package"),_a=Array.isArray(J?.barcodes)&&J.barcodes.length?J.barcodes[0]:Array.isArray(J?.items)&&J.items.length?J.items[0]?.barcode:null,$a=J?.barcode??_a??"";let ln=Number.isFinite(Number(J?.totalPrice))?Number(J.totalPrice):Number((ct*Ee).toFixed(2));return ln=Ae(ln),{...J,isPackage:ka,desc:J?.description,barcode:$a,qty:Ee,price:ct,totalPrice:ln}}),_e=Ii.filter(J=>C("items",J.id)),U=_e.length>0,Z=U?_e.map(J=>`<th>${E(J.labelKey?o(J.labelKey,J.fallback):J.fallback)}</th>`).join(""):"",fe=ve.length>0?ve.map((J,Ee)=>`<tr>${_e.map(Ze=>`<td>${Ze.render(J,Ee)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(_e.length,1)}" class="empty">${E(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,me=M("items")?U?`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Z}</tr>
              </thead>
              <tbody>${fe}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.items.title","المعدات"))}</h3>
            ${L}
          </section>`:"",Je=ki.filter(J=>C("crew",J.id)),Y=Je.length>0,be=Y?Je.map(J=>`<th>${E(J.labelKey?o(J.labelKey,J.fallback):J.fallback)}</th>`).join(""):"",j=s.length?s.map((J,Ee)=>`<tr>${Je.map(Ze=>`<td>${Ze.render(J,Ee)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Je.length,1)}" class="empty">${E(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,ae=M("crew")?Y?`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${be}</tr>
              </thead>
              <tbody>${j}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${E(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${L}
          </section>`:"",pe=M("notes")?`<section class="quote-section">
        <h3>${E(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${E(P||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",le=[];C("payment","beneficiary")&&le.push(G(o("reservations.quote.labels.beneficiary","اسم المستفيد"),ke.beneficiaryName)),C("payment","bank")&&le.push(G(o("reservations.quote.labels.bank","اسم البنك"),ke.bankName)),C("payment","account")&&le.push(G(o("reservations.quote.labels.account","رقم الحساب"),h(ke.accountNumber))),C("payment","iban")&&le.push(G(o("reservations.quote.labels.iban","رقم الآيبان"),h(ke.iban)));const ye=`<section class="quote-section">
      <div class="payment-block">
        <h3>${E(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${le.length?le.join(""):L}</div>
      </div>
      <p class="quote-approval-note">${E(ke.approvalNote)}</p>
    </section>`,qe=`<footer class="quote-footer">
        <h4>${E(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${D.map(J=>`<li>${E(J)}</li>`).join("")}</ul>
      </footer>`,Ne=[];I&&R?Ne.push(Se(`<div class="quote-section-row">${I}${R}</div>`,{blockType:"group"})):(R&&Ne.push(Se(R)),I&&Ne.push(Se(I))),z&&Ne.push(Se(z));const Ke=[];me&&Ke.push(Se(me,{blockType:"table",extraAttributes:'data-table-id="items"'})),ae&&Ke.push(Se(ae,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const Ye=[];re&&Ye.push(Se(re,{blockType:"summary"})),pe&&Ye.push(Se(pe));const Qt=[Se(ye,{blockType:"payment"}),Se(qe,{blockType:"footer"})],cn=[...na(Ne,"reservations.quote.placeholder.page1"),...Ke,...na(Ye,"reservations.quote.placeholder.page2"),...Qt],Gt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${E(ke.logoUrl)}" alt="${E(ke.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${E(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${E(ke.companyName)}</p>
        <p class="quote-company-cr">${E(o("reservations.quote.labels.cr","السجل التجاري"))}: ${E(ke.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${E(p)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${E(f)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Li}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Gt}
          ${cn.join("")}
        </div>
      </div>
    </div>
  `}function eu(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function An(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>eu(c)),i=[s,...r].map(c=>c.catch(d=>(yt("asset load failed",d),ud(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function Zi(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await Vi(r),await An(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let d=null,l=null;const u=q=>{q.style.margin="0 auto",q.style.breakInside="avoid",q.style.pageBreakInside="avoid",q.style.pageBreakAfter="auto",q.style.breakAfter="auto"},p=()=>{const q=a.createElement("div"),x=s.childElementCount===0;if(q.className="quote-page",q.dataset.pageIndex=String(s.childElementCount),x){q.classList.add("quote-page--primary");const P=i.cloneNode(!0);P.removeAttribute("data-quote-header-template"),q.appendChild(P)}else q.classList.add("quote-page--continuation");const _=a.createElement("main");_.className="quote-body",q.appendChild(_),s.appendChild(q),u(q),d=q,l=_},f=()=>{(!d||!l||!l.isConnected)&&p()},m=()=>{if(!d||!l||l.childElementCount>0)return;const q=d;d=null,l=null,q.parentNode&&q.parentNode.removeChild(q)},y=()=>{d=null,l=null},g=()=>d?d.scrollHeight-d.clientHeight>id:!1,b=(q,{allowOverflow:x=!1}={})=>(f(),l.appendChild(q),g()&&!x?(l.removeChild(q),m(),!1):!0),w=q=>{const x=q.cloneNode(!0);x.removeAttribute?.("data-quote-block"),x.removeAttribute?.("data-block-type"),x.removeAttribute?.("data-table-id"),!b(x)&&(y(),!b(x)&&b(x,{allowOverflow:!0}))},v=q=>{const x=q.querySelector("table");if(!x){w(q);return}const _=q.querySelector("h3"),P=x.querySelector("thead"),D=Array.from(x.querySelectorAll("tbody tr"));if(!D.length){w(q);return}let $=null,C=0;const M=(B=!1)=>{const A=q.cloneNode(!1);A.removeAttribute("data-quote-block"),A.removeAttribute("data-block-type"),A.removeAttribute("data-table-id"),A.classList.add("quote-section--table-fragment"),B&&A.classList.add("quote-section--table-fragment--continued");const G=_?_.cloneNode(!0):null;G&&A.appendChild(G);const K=x.cloneNode(!1);K.classList.add("quote-table--fragment"),P&&K.appendChild(P.cloneNode(!0));const I=a.createElement("tbody");return K.appendChild(I),A.appendChild(K),{section:A,body:I}},L=(B=!1)=>$||($=M(B),b($.section)||(y(),b($.section)||b($.section,{allowOverflow:!0})),$);D.forEach(B=>{L(C>0);const A=B.cloneNode(!0);if($.body.appendChild(A),g()&&($.body.removeChild(A),$.body.childElementCount||(l.removeChild($.section),$=null,m()),y(),$=null,L(C>0),$.body.appendChild(A),g())){$.section.classList.add("quote-section--table-fragment--overflow"),C+=1;return}C+=1}),$=null};if(!c.length)return;c.forEach(q=>{q.getAttribute("data-block-type")==="table"?v(q):w(q)});const k=Array.from(s.children),F=[];if(k.forEach((q,x)=>{const _=q.querySelector(".quote-body");if(x!==0&&(!_||_.childElementCount===0)){q.remove();return}F.push(q)}),!n){const q=a.defaultView||window,x=Math.min(3,Math.max(1,q.devicePixelRatio||1)),_=xa()?Math.min(2,x):x;F.forEach(P=>kd(P,{pixelRatio:_}))}F.forEach((q,x)=>{const _=x===0;q.style.pageBreakAfter="auto",q.style.breakAfter="auto",q.style.pageBreakBefore=_?"auto":"always",q.style.breakBefore=_?"auto":"page",n?q.style.boxShadow="":q.style.boxShadow="none"});const V=F[F.length-1]||null;d=V,l=V?.querySelector(".quote-body")||null,await An(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function Os(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function tu(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([$d(),_d()]),c=e.ownerDocument||document,d=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,d,c?.documentElement?.getAttribute?.("dir")].some(q=>typeof q=="string"&&q.toLowerCase().startsWith("rtl")),p=typeof window<"u"&&window.devicePixelRatio||1,f=Hs(),m=Mi(),y=xa();let g;y?g=1.5:m?g=Math.min(1.7,Math.max(1.2,p*1.1)):f?g=Math.min(1.8,Math.max(1.25,p*1.2)):g=Math.min(2,Math.max(1.6,p*1.4));const b=y||m?.9:f?.92:.95,w=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),v={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let k=0;const F=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let q=0;q<s.length;q+=1){const x=s[q];await Vi(x),await An(x);const _=x.ownerDocument||document,P=_.createElement("div");Object.assign(P.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const D=x.cloneNode(!0);D.style.width=`${zn}px`,D.style.maxWidth=`${zn}px`,D.style.minWidth=`${zn}px`,D.style.height=`${On}px`,D.style.maxHeight=`${On}px`,D.style.minHeight=`${On}px`,D.style.position="relative",D.style.background="#ffffff",Os(D),P.appendChild(D),_.body.appendChild(P);let $;try{await An(D),$=await i(D,{...v,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(I){throw os(I,"pageCapture",{toastMessage:F}),I}finally{P.parentNode?.removeChild(P)}if(!$)continue;const C=$.width||1,L=($.height||1)/C;let B=ss,A=B*L,G=0;if(A>Hn){const I=Hn/A;A=Hn,B=B*I,G=Math.max(0,(ss-B)/2)}const K=$.toDataURL("image/jpeg",b);k>0&&w.addPage(),w.addImage(K,"JPEG",G,0,B,A,`page-${k+1}`,"FAST"),k+=1,await new Promise(I=>window.requestAnimationFrame(I))}}catch(q){throw cs({safariWindowRef:n,mobileWindowRef:a}),q}if(k===0)throw cs({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(m||y){const q=w.output("blob");if(y){const x=URL.createObjectURL(q);qn();try{window.location.assign(x)}catch(_){yt("mobile safari blob navigation failed",_)}finally{setTimeout(()=>URL.revokeObjectURL(x),6e4)}}else{const x=URL.createObjectURL(q),_=()=>m&&n&&!n.closed?n:a&&!a.closed?a:null,P=($,C)=>{if(qn(),!$){window.location.assign(C);return}try{$.location.replace(C),$.focus?.()}catch(M){yt("direct blob navigation failed",M);try{$.document.open(),$.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${E(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${C}" title="PDF preview"></iframe></body></html>`),$.document.close()}catch(L){yt("iframe blob delivery failed",L),window.location.assign(C)}}},D=_();P(D,x),setTimeout(()=>URL.revokeObjectURL(x),6e4)}}else{qn();const q=w.output("bloburl"),x=document.createElement("a");x.href=q,x.download=t,x.rel="noopener",x.style.display="none",document.body.appendChild(x),x.click(),setTimeout(()=>{URL.revokeObjectURL(q),x.remove()},2e3)}}function Kt(){if(!N||!W)return;const{previewFrame:e}=W;if(!e)return;const t=N.context||"reservation",n=Yi({context:t,reservation:N.reservation,customer:N.customer,project:N.project,technicians:N.technicians,totals:N.totals,totalsDisplay:N.totalsDisplay,rentalDays:N.rentalDays,currencyLabel:N.currencyLabel,sections:N.sections,fieldSelections:N.fields,quoteNumber:N.quoteNumber,quoteDate:N.quoteDateLabel,terms:N.terms,projectCrew:N.projectCrew,projectExpenses:N.projectExpenses,projectEquipment:N.projectEquipment,projectInfo:N.projectInfo,clientInfo:N.clientInfo,paymentSummary:N.paymentSummary,projectTotals:N.projectTotals});Bt("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&(xi(r),Si(r,s),Ei(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await Zi(i,{context:"preview"}),Os(i))}catch(m){console.error("[reservations/pdf] failed to layout preview document",m)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),d=a?.querySelector(".quote-preview-pages"),l=zn;let u=18;if(d&&a?.defaultView){const m=a.defaultView.getComputedStyle(d),y=parseFloat(m.rowGap||m.gap||`${u}`);Number.isFinite(y)&&y>=0&&(u=y)}const p=On,f=c.length?c.length*p+Math.max(0,(c.length-1)*u):p;if(e.dataset.baseWidth=String(l),e.dataset.baseHeight=String(f),e.style.width=`${l}px`,e.style.minWidth=`${l}px`,e.style.height=`${f}px`,e.style.minHeight=`${f}px`,W?.previewFrameWrapper&&!W?.userAdjustedZoom){const m=W.previewFrameWrapper.clientWidth-24;m>0&&m<l?nt=Math.max(m/l,.3):nt=1}to(nt)}finally{qn()}},{once:!0})}function nu(e){if(!N)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?N.sections.add(n):N.sections.delete(n),Qi(N),eo(),Kt())}function au(e){if(!N)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=N.context||"reservation",r=N.fields||(N.fields=Ea(s)),i=md(r,n);t.checked?i.add(a):i.delete(a),Qi(N),Kt()}function su(e){if(!N)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(Ms(N,n),N.sectionExpansions[n]=t.open)}function eo(){if(!W?.toggles||!N)return;const{toggles:e}=W,t=N.fields||{},n=N.context||"reservation";Ms(N);const a=Sa(n),s=Ti(n),r=a.map(({id:i,labelKey:c,fallback:d})=>{const l=o(c,d),u=N.sections.has(i),p=s[i]||[],f=pd(N,i),m=p.length?`<div class="quote-toggle-sublist">
          ${p.map(y=>{const g=Ds(t,i,y.id),b=u?"":"disabled",w=y.labelKey?o(y.labelKey,y.fallback):y.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${y.id}" ${g?"checked":""} ${b}>
                <span>${E(w)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${i}" ${f?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${i}" ${u?"checked":""}>
            <span>${E(l)}</span>
          </label>
          ${p.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${m}
      </details>
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",nu)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",au)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",su)})}function ru(){if(W?.modal)return W;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${E(o("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${E(o("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
              <div class="quote-terms-editor" data-quote-terms-editor>
                <label class="quote-terms-editor__label" for="quote-terms-input">${E(o("reservations.quote.termsEditor.title","الشروط العامة (قابلة للتعديل)"))}</label>
                <textarea id="quote-terms-input" class="quote-terms-editor__textarea" rows="6" data-quote-terms-input placeholder="${E(o("reservations.quote.termsEditor.placeholder","اكتب كل شرط في سطر مستقل"))}"></textarea>
                <button type="button" class="quote-terms-reset" data-quote-terms-reset>${E(o("reservations.quote.termsEditor.reset","استعادة الشروط الافتراضية"))}</button>
              </div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${E(o("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${E(o("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),r=e.querySelector("[data-quote-terms-reset]"),i=e.querySelector("[data-quote-download]"),c=e.querySelector(".modal-header"),d=c?.querySelector(".btn-close"),l=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",c&&c.insertBefore(u,d||null);const p=document.createElement("iframe");p.className="quote-preview-frame",p.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),p.setAttribute("loading","lazy"),p.setAttribute("frameborder","0");const f=document.createElement("div");f.className="quote-preview-zoom-controls",f.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${E(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${E(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${E(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(p),n.innerHTML="";const y=document.createElement("div");y.className="quote-preview-scroll",y.appendChild(m),n.appendChild(y);const g=document.createElement("div");g.className="quote-preview-status",g.setAttribute("role","status"),g.setAttribute("aria-live","polite"),g.hidden=!0,g.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${E(Ci("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(f),i?.addEventListener("click",async()=>{if(N){i.disabled=!0;try{await no()}finally{i.disabled=!1}}});const b=()=>{rs()||is(e)};l.forEach(F=>{F?.addEventListener("click",b)}),d&&!l.includes(d)&&d.addEventListener("click",b),e.addEventListener("click",F=>{rs()||F.target===e&&is(e)}),W={modal:e,toggles:t,preview:n,previewScroll:y,previewFrameWrapper:m,zoomControls:f,zoomValue:f.querySelector("[data-zoom-value]"),previewFrame:p,meta:a,downloadBtn:i,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const w=f.querySelector("[data-zoom-out]"),v=f.querySelector("[data-zoom-in]"),k=f.querySelector("[data-zoom-reset]");return w?.addEventListener("click",()=>wr(-.1)),v?.addEventListener("click",()=>wr(.1)),k?.addEventListener("click",()=>aa(1,{markManual:!0})),s&&s.addEventListener("input",ou),r&&r.addEventListener("click",cu),aa(nt),W}function aa(e,{silent:t=!1,markManual:n=!1}={}){nt=Math.min(Math.max(e,.25),2.2),n&&W&&(W.userAdjustedZoom=!0),to(nt),!t&&W?.zoomValue&&(W.zoomValue.textContent=`${Math.round(nt*100)}%`)}function wr(e){aa(nt+e,{markManual:!0})}function to(e){if(!W?.previewFrame||!W.previewFrameWrapper)return;const t=W.previewFrame,n=W.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",Hs()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function iu(){if(!W?.meta||!N)return;const{meta:e}=W;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${E(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${E(N.quoteNumber)}</strong></div>
      <div><span>${E(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${E(N.quoteDateLabel)}</strong></div>
    </div>
  `}function Vs(){if(!W?.termsInput)return;const e=(N?.terms&&N.terms.length?N.terms:Re).join(`
`);W.termsInput.value!==e&&(W.termsInput.value=e)}function ou(e){if(!N)return;const t=ts(e?.target?.value??"");if(t.length){N.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{N.terms=[...Re],Vs();const n=Re.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}Kt()}function cu(e){if(e?.preventDefault?.(),!N)return;N.terms=[...Re];const t=document.getElementById("reservation-terms");t&&(t.value=Re.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=Re.join(`
`)),Vs(),Kt()}async function no(){if(!N)return;Bt("export");const t=!Hs()&&Mi(),n=xa(),a=null,s=!n&&t?window.open("","_blank"):null;(d=>{if(d)try{d.document.open(),d.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${E(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${E(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${E(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),d.document.close()}catch(l){yt("failed to prime download window",l)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await Pd(),Ra("html2pdf ensured");const d=N.context||"reservation",l=Yi({context:d,reservation:N.reservation,customer:N.customer,project:N.project,technicians:N.technicians,totals:N.totals,totalsDisplay:N.totalsDisplay,rentalDays:N.rentalDays,currencyLabel:N.currencyLabel,sections:N.sections,fieldSelections:N.fields,quoteNumber:N.quoteNumber,quoteDate:N.quoteDateLabel,terms:N.terms,projectCrew:N.projectCrew,projectExpenses:N.projectExpenses,projectEquipment:N.projectEquipment,projectInfo:N.projectInfo,clientInfo:N.clientInfo,paymentSummary:N.paymentSummary,projectTotals:N.projectTotals});i=document.createElement("div"),i.innerHTML=l,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),xi(i),Si(i),Ei(i),Ra("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await Zi(u,{context:"export"}),await An(u),Os(u),Ra("layout complete for export document")}catch(f){os(f,"layoutQuoteDocument",{suppressToast:!0})}}const p=`quotation-${N.quoteNumber}.pdf`;await tu(u,{filename:p,safariWindowRef:s,mobileWindowRef:a}),N.sequenceCommitted||(Cd(N.quoteSequence),N.sequenceCommitted=!0)}catch(d){cs({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,os(d,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),qn()}}function ao(){const e=ru();e?.modal&&(vn=!1,nt=1,W&&(W.userAdjustedZoom=!1),aa(nt,{silent:!0}),eo(),iu(),Vs(),Kt(),dd(e.modal))}async function lu({reservation:e,customer:t,project:n}){if(!e){S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=Md(e),{totalsDisplay:s,totals:r,rentalDays:i}=Hd(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:d,quoteNumber:l}=Ui("reservation"),u=new Date,p=Yl();N={context:"reservation",reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(Sa("reservation").filter(f=>f.defaultSelected).map(f=>f.id)),sectionExpansions:Rs("reservation"),fields:Ea("reservation"),terms:p,quoteSequence:d,quoteNumber:l,quoteDate:u,quoteDateLabel:Wi(u),sequenceCommitted:!1},Gi(N),ao()}async function dm({project:e}){if(!e){S(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=Yd(e),{project:n}=t;if(!n){S(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=Ui("project"),r=new Date,i=[...Jl];N={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(Sa("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:Rs("project"),fields:Ea("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:Wi(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},Gi(N),ao()}function du({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=$n(),{reservations:r=[],customers:i=[],technicians:c=[],projects:d=[]}=ue(),l=Array.isArray(s)?s:c||[],u=new Map((d||[]).map(b=>[String(b.id),b])),p=document.getElementById(e);if(!p){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){p.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const f=t||Dl(),m=new Map(i.map(b=>[String(b.id),b])),y=new Map(l.map(b=>[String(b.id),b])),g=zl({reservations:r,filters:f,customersMap:m,techniciansMap:y,projectsMap:u});if(g.length===0){p.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}p.innerHTML=`<div class="reservations-grid">${Ol({entries:g,customersMap:m,techniciansMap:y,projectsMap:u})}</div>`,p.querySelectorAll('[data-action="details"]').forEach(b=>{const w=Number(b.dataset.reservationIndex);Number.isNaN(w)||b.addEventListener("click",()=>{typeof n=="function"&&n(w)})}),p.querySelectorAll('button[data-action="confirm"]').forEach(b=>{const w=Number(b.dataset.reservationIndex);Number.isNaN(w)||b.addEventListener("click",v=>{v.stopPropagation(),typeof a=="function"&&a(w,v)})})}function uu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=ue(),c=s[e];if(!c)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=r.find(w=>String(w.id)===String(c.customerId)),l=c.projectId?i.find(w=>String(w.id)===String(c.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const w=$n()||[];u.innerHTML=Vl(c,d,w,e,l)}const p=document.getElementById("reservationDetailsModal"),f=()=>{p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(p)?.hide()},m=document.getElementById("reservation-details-edit-btn");m&&(m.onclick=()=>{f(),typeof t=="function"&&t(e,{reservation:c,customer:d,getEditContext:a})});const y=document.getElementById("reservation-details-delete-btn");y&&(y.onclick=()=>{f(),typeof n=="function"&&n(e,{reservation:c,customer:d})});const g=u?.querySelector('[data-action="open-project"]');g&&l&&g.addEventListener("click",()=>{f();const w=l?.id!=null?String(l.id):"",v=w?`projects.html?project=${encodeURIComponent(w)}`:"projects.html";window.location.href=v});const b=document.getElementById("reservation-details-export-btn");return b&&(b.onclick=async w=>{w?.preventDefault?.(),w?.stopPropagation?.(),b.blur();try{await lu({reservation:c,customer:d,project:l})}catch(v){console.error("❌ [reservations] export to PDF failed",v),S(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(p).show(),!0}function so(){const e=()=>{Tn(),Le(),$n()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let Ar=!1,Ir=null;function mu(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function um(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=mu(n);if(!a&&Ar&&Lt().length>0&&s===Ir)return Lt();try{const r=await Mr(n||{});return Ar=!0,Ir=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return Lt()}}async function pu(e,{onAfterChange:t}={}){if(!Ht())return _n(),!1;const a=Lt()[e];if(!a)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await wc(s),so(),t?.({type:"deleted",reservation:a}),S(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=la(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return S(i,"error"),!1}}async function fu(e,{onAfterChange:t}={}){const a=Lt()[e];if(!a)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=At(a);if(r)return S(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await Ac(s);return so(),t?.({type:"confirmed",reservation:i}),S(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=la(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return S(c,"error"),!1}}function on(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:En(e,n),end:En(t,a)}}function sa(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Us(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function ro(){const{container:e,select:t,hint:n,addButton:a}=Us();if(!t)return;const s=t.value,r=jr(),i=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,d=r.map(u=>{const p=Number.isFinite(Number(u.price))?Number(u.price):0,f=h(p.toFixed(2)),m=`${u.name} — ${f} ${i}`;return`<option value="${sa(u.id)}">${sa(m)}</option>`}).join("");t.innerHTML=`${c}${d}`;const l=r.length>0;t.disabled=!l,a&&(a.disabled=!l),e&&(e.hidden=!l,e.setAttribute("aria-hidden",l?"false":"true")),n&&(l?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),l&&s&&r.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function yu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||S(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=kt(),{start:r,end:i}=on(),{reservations:c=[]}=ue(),d=a!=null&&c[a]||null,l=d?.id??d?.reservationId??null,u=pi(n,{existingItems:s,start:r,end:i,ignoreReservationId:l});if(!u.success)return t||S(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const p=[...s,u.package];return _t(a,p),It(p),Ue(),t||S(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function kr(){const{select:e}=Us();if(!e)return;const t=e.value||"";yu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function gu(){const{addButton:e,select:t}=Us();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{kr()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),kr())}),t.dataset.listenerAttached="true"),ro()}function It(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,$r(t);return}const d=nn(e);t.innerHTML=d.map(l=>{const u=l.items[0]||{},p=Ot(u)||l.image,f=p?`<img src="${p}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=l.items.some($=>$?.type==="package"),y=h(String(l.count)),g=ut(l.unitPrice),b=Number.isFinite(g)?Ae(g):0,w=ut(l.totalPrice),v=Number.isFinite(w)?w:b*(Number.isFinite(l.count)?l.count:1),k=Ae(v),F=`${h(b.toFixed(2))} ${a}`,V=`${h(k.toFixed(2))} ${a}`,q=l.barcodes.map($=>h(String($||""))).filter(Boolean),x=q.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${q.map($=>`<li>${$}</li>`).join("")}
            </ul>
          </details>`:"";let _="";if(m){const $=new Map;if(l.items.forEach(C=>{Array.isArray(C?.packageItems)&&C.packageItems.forEach(M=>{if(!M)return;const L=te(M.barcode||M.normalizedBarcode||M.desc||Math.random()),B=$.get(L),A=Number.parseFloat(h(String(M.qty??M.quantity??1)).replace(/[^0-9.]/g,"")),G=Number.isFinite(A)&&A>0?A:1;if(B){B.qty+=G;return}$.set(L,{desc:M.desc||M.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:G,barcode:M.barcode??M.normalizedBarcode??""})})}),$.size){const C=Array.from($.values()).map(M=>{const L=h(String(M.qty)),B=sa(M.desc||""),A=M.barcode?` <span class="reservation-package-items__barcode">(${sa(h(String(M.barcode)))})</span>`:"";return`<li>${B}${A} × ${L}</li>`}).join("");_=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${C}
              </ul>
            </details>
          `}}const P=m?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",D=m?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${l.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${l.description||"-"}</div>
                ${m?`${_||""}${x||""}`:x}
              </div>
            </div>
          </td>
          <td>
            <div class="${P}" data-group-key="${l.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${l.key}" aria-label="${i}"${D}>−</button>
              <span class="reservation-qty-value">${y}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${l.key}" aria-label="${r}"${D}>+</button>
            </div>
          </td>
          <td>${F}</td>
          <td>${V}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${l.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),$r(t)}function bu(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function wa(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=Aa();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,_r();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${h(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${h(Number(s.percentage).toFixed(2))}%`:"—",d=s?.recordedAt?h(Oe(s.recordedAt)):"—",l=bu(s?.type),u=s?.note?h(s.note):"";return`
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
  `,_r()}function hu(){if(In()){S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=co(e);let a=lo(t);if(!Number.isFinite(a)||a<=0){S(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=za.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,d=o("reservations.create.summary.currency","SR");let l=null,u=null;if(n==="percent"){const f=Math.max(0,100-i);if(f<=1e-4){S(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const y=h(m.toFixed(2));S(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",y)),a=m}u=Number(a.toFixed(2)),r>0&&(l=a/100*r)}else{const f=Math.max(0,r-c);if(f<=1e-4){S(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const y=`${h(m.toFixed(2))} ${d}`;S(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",y)),a=m}l=Number(a.toFixed(2)),r>0&&(u=l/r*100)}l!=null&&(l=Number(l.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const p={type:n,value:a,amount:l,percentage:u,recordedAt:new Date().toISOString()};_u(p),Ks(Aa()),wa(),Ue(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),S(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function _r(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(In()){n.preventDefault(),S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}hu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(In()){n.preventDefault(),S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||($u(s),Ks(Aa()),wa(),Ue(),S(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function vu(e){const{index:t,items:n}=kt(),s=nn(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,d)=>d!==r);_t(t,i),It(i),Ue()}function qu(e){const{index:t,items:n}=kt(),a=n.filter(s=>ca(s)!==e);a.length!==n.length&&(_t(t,a),It(a),Ue())}function Su(e){const{index:t,items:n}=kt(),s=nn(n).find(b=>b.key===e);if(!s||s.items.some(b=>b?.type==="package"))return;const{start:r,end:i}=on();if(!r||!i){S(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=ue(),d=t!=null&&c[t]||null,l=d?.id??d?.reservationId??null,u=new Set(n.map(b=>te(b.barcode))),{equipment:p=[]}=ue(),f=(p||[]).find(b=>{const w=te(b?.barcode);return!w||u.has(w)||ca({desc:b?.desc||b?.description||b?.name||"",price:Number(b?.price)||0})!==e||!Is(b)?!1:!rt(w,r,i,l)});if(!f){S(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const m=te(f.barcode),y=zt(f);if(!y){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:y,equipmentId:y,barcode:m,desc:f.desc||f.description||f.name||s.description||"",qty:1,price:Number.isFinite(Number(f.price))?Number(f.price):s.unitPrice,image:Ot(f)}];_t(t,g),It(g),Ue()}function $r(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){vu(s);return}if(a==="increase-edit-group"&&s){Su(s);return}if(a==="remove-edit-group"&&s){qu(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||wu(i)}}),e.dataset.groupListenerAttached="true")}function In(){return!!document.getElementById("edit-res-project")?.value}function Eu(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{In()&&(S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function xu(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),d=document.getElementById("edit-res-payment-history");[n,a,s,r,i,c,d].forEach(Eu),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s&&(s.value="unpaid",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),d&&(d.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.dataset.linkedDisabled="false"))}function Ue(){const e=document.getElementById("edit-res-summary");if(!e)return;wa();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),ze(a),Ue()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=In();xu(c);const d=document.getElementById("edit-res-tax"),l=c?!1:d?.checked||!1,u=!c&&a?.dataset?.userSelected==="true",p=c?"unpaid":u&&a?.value||"unpaid";let f=null;!c&&l&&(Xe("edit-res-company-share"),f=Zt("edit-res-company-share"),(!Number.isFinite(f)||f<=0)&&(Xe("edit-res-company-share"),f=Zt("edit-res-company-share")));const{items:m=[],payments:y=[]}=kt(),{start:g,end:b}=on(),w=za({items:m,discount:r,discountType:i,applyTax:l,paidStatus:p,start:g,end:b,companySharePercent:f,paymentHistory:y});e.innerHTML=w;const v=za.lastResult;if(v&&a){const k=v.paymentStatus;u?ze(a,a.value):(a.value!==k&&(a.value=k),a.dataset&&delete a.dataset.userSelected,ze(a,k))}else a&&ze(a,a.value)}function wu(e){if(e==null)return;const{index:t,items:n}=kt();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);_t(t,a),It(a),Ue()}function Au(e){const t=e?.value??"",n=te(t);if(!n)return;const a=ua(n);if(!a){S(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=bt(a);if(s==="maintenance"||s==="retired"){S(Mt(s));return}const r=te(n),{index:i,items:c=[]}=kt();if(c.findIndex(b=>te(b.barcode)===r)>-1){S(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:l,end:u}=on();if(!l||!u){S(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:p=[]}=ue(),f=i!=null&&p[i]||null,m=f?.id??f?.reservationId??null;if(rt(r,l,u,m)){S(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const y=zt(a);if(!y){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:y,equipmentId:y,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];_t(i,g),e&&(e.value=""),It(g),Ue()}function ra(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=li(t),a=te(n?.barcode||t);if(!n||!a){S(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=bt(n);if(s==="maintenance"||s==="retired"){S(Mt(s));return}const{start:r,end:i}=on();if(!r||!i){S(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:d=[]}=kt();if(d.some(g=>te(g.barcode)===a)){S(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=ue(),p=c!=null&&u[c]||null,f=p?.id??p?.reservationId??null;if(rt(a,r,i,f)){S(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=zt(n);if(!m){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const y=[...d,{id:m,equipmentId:m,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];_t(c,y),It(y),Ue(),e.value=""}function io(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),ra(e))});const t=()=>{di(e.value,"edit-res-equipment-description-options")&&ra(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{Ue()});const e=()=>{gu()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{ro()})}typeof window<"u"&&(window.getEditReservationDateRange=on,window.renderEditPaymentHistory=wa);function Iu(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){Ya(e);return}ra(e)}}function mm(){wt(),io()}function ku(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let kn=null,tt=[],at=[],ls=null,je={},Ma=!1;function ds(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function us(){return document.getElementById("edit-res-confirmed")?.value==="true"}function kt(){return{index:kn,items:tt,payments:at}}function _t(e,t,n=at){kn=typeof e=="number"?e:null,tt=Array.isArray(t)?[...t]:[],at=Array.isArray(n)?[...n]:[]}function oo(){kn=null,tt=[],_c(),at=[]}function Aa(){return[...at]}function Ks(e){at=Array.isArray(e)?[...e]:[]}function _u(e){e&&(at=[...at,e])}function $u(e){!Number.isInteger(e)||e<0||(at=at.filter((t,n)=>n!==e))}function Sn(e,t=1){const n=Number.parseFloat(h(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function ms(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(h(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function Pu(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?te(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:Sn(e.qty??e.quantity??e.count??1),price:ms(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function Tu(e,t=0){if(!e||typeof e!="object")return null;const n=xn(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=Sn(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),r=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:bs(e)).map(f=>Pu(f)).filter(Boolean),i=e.total_price??e.totalPrice??e.total??null;let c=ms(e.unit_price??e.unitPrice??e.price??null,0);if((!c||c===0)&&i!=null){const f=ms(i,0);f>0&&a>0&&(c=Number((f/a).toFixed(2)))}const d=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,d,n].find(f=>f!=null&&String(f).trim()!=="")||`Package ${n}`,p=e.image??e.cover??e.thumbnail??r.find(f=>f?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:h(String(u)),name:h(String(u)),qty:a,price:c,barcode:d,packageItems:r,image:p}}function Nu(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const r=s-n;e.set(a,r>0?r:0)})}function ju(e={},t=[]){const n=Array.isArray(t)?t.map(c=>({...c})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((c,d)=>Tu(c,d)).filter(Boolean);if(!s.length)return n;const r=new Map;s.forEach(c=>{const d=Sn(c.qty??c.quantity??1);if(c.barcode){const l=te(c.barcode);if(l){const u=`package::${l}`;r.set(u,(r.get(u)??0)+d)}}(c.packageItems||[]).forEach(l=>{if(!l)return;const u=d*Sn(l.qty??l.quantity??1),p=l.equipmentId??null,f=l.normalizedBarcode||(l.barcode?te(l.barcode):null);if(p!=null){const m=`equipment::${String(p)}`;r.set(m,(r.get(m)??0)+u)}if(f){const m=`barcode::${f}`;r.set(m,(r.get(m)??0)+u)}})});const i=[];return n.forEach(c=>{if(!c||typeof c!="object"){i.push(c);return}if(c.type==="package"){const b=xn(c.packageId??c.package_id??c.id??"");s.some(v=>v.packageId===b)||i.push({...c});return}const d=Sn(c.qty??c.quantity??1),l=zt(c),u=c.barcode?te(c.barcode):null,p=[];l!=null&&p.push(`equipment::${String(l)}`),u&&p.push(`barcode::${u}`);const f=p.map(b=>r.get(b)??0).filter(b=>b>0);if(!f.length){i.push({...c});return}const m=Math.min(...f);if(m<=0){i.push({...c});return}const y=Math.min(m,d);if(Nu(r,p,y),y>=d)return;const g=d-y;i.push({...c,qty:g,quantity:g})}),[...i,...s.map(c=>({...c}))]}function Cu(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function co(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function lo(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Lu(e,t){if(e){e.value="";return}}function yn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function uo(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),d=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,l=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:d,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:l}}function Bu(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((d,l)=>String(l.createdAt||l.start||"").localeCompare(String(d.createdAt||d.start||""))):[],c=[`<option value="">${yn(a)}</option>`];i.forEach(d=>{c.push(`<option value="${yn(d.id)}">${yn(d.title||a)}</option>`)}),r&&!i.some(d=>String(d.id)===r)&&c.push(`<option value="${yn(r)}">${yn(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function mo(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const d=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",d&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}ps("tax");const c=je?.updateEditReservationSummary;typeof c=="function"&&c()}function ps(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=je?.updateEditReservationSummary;typeof r=="function"&&r()};if(Ma){a();return}Ma=!0;const s=()=>{Ma=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(gt)),t.disabled){n.checked=!1,S(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),Xe("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Xe("edit-res-company-share"):n.checked&&(n.checked=!1));s()}function Pr(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:d}=ue(),u=Lt()?.[e];if(!u){S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}je={...je,reservation:u,projects:d||[]},t?.(),Bu(d||[],u);const p=u.projectId&&d?.find?.(I=>String(I.id)===String(u.projectId))||null,{effectiveConfirmed:f,projectLinked:m}=At(u,p),y=u.items?u.items.map(I=>({...I,equipmentId:I.equipmentId??I.equipment_id??I.id,barcode:te(I?.barcode)})):[],g=ju(u,y),w=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(I=>uo(I)).filter(Boolean);_t(e,g,w);const v=o("reservations.list.unknownCustomer","غير معروف"),k=c?.find?.(I=>String(I.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const F=document.getElementById("edit-res-id");F&&(F.value=u.reservationId||u.id);const V=document.getElementById("edit-res-customer");V&&(V.value=k?.customerName||v);const q=typeof a=="function"?a(u.start):{date:"",time:""},x=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",q.date),n?.("edit-res-start-time",q.time),n?.("edit-res-end",x.date),n?.("edit-res-end-time",x.time);const _=document.getElementById("edit-res-notes");_&&(_.value=u.notes||"");const P=document.getElementById("edit-res-discount");if(P){const I=m?0:u.discount??0;P.value=h(I)}const D=document.getElementById("edit-res-discount-type");D&&(D.value=m?"percent":u.discountType||"percent");const $=u.projectId?!1:!!u.applyTax,C=document.getElementById("edit-res-tax");C&&(C.checked=$);const M=document.getElementById("edit-res-company-share");if(M){const I=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,O=I!=null?Number.parseFloat(h(String(I).replace("%","").trim())):NaN,R=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,H=R!=null?R===!0||R===1||R==="1"||String(R).toLowerCase()==="true":Number.isFinite(O)&&O>0,z=H&&Number.isFinite(O)&&O>0?O:gt,ne=$||H;M.checked=ne,M.dataset.companyShare=String(z)}ds(f,{disable:m});const L=document.getElementById("edit-res-paid"),B=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");L&&(L.value=B,L.dataset&&delete L.dataset.userSelected);const A=document.getElementById("edit-res-payment-progress-type"),G=document.getElementById("edit-res-payment-progress-value");if(A?.dataset?.userSelected&&delete A.dataset.userSelected,A&&(A.value="percent"),Lu(G),$c((u.technicians||[]).map(I=>String(I))),s?.(g),typeof window<"u"){const I=window?.renderEditPaymentHistory;typeof I=="function"&&I()}mo(),r?.();const K=document.getElementById("editReservationModal");ls=Cu(K,i),ls?.show?.()}async function Fu({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:r,populateEquipmentDescriptionLists:i,handleReservationsMutation:c}={}){if(kn===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const d=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),p=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",f=document.getElementById("edit-res-notes")?.value||"",m=h(document.getElementById("edit-res-discount")?.value||"0");let y=parseFloat(m)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const b=us(),w=document.getElementById("edit-res-paid"),v=w?.dataset?.userSelected==="true",k=v&&w?.value||"unpaid",F=document.getElementById("edit-res-payment-progress-type"),V=document.getElementById("edit-res-payment-progress-value"),q=co(F),x=lo(V),_=document.getElementById("edit-res-project")?.value||"",P=Ic(),D=document.getElementById("edit-res-company-share"),$=document.getElementById("edit-res-tax");if(!d||!u){S(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const C=typeof e=="function"?e:(Y,be)=>`${Y}T${be||"00:00"}`,M=C(d,l),L=C(u,p);if(M&&L&&new Date(M)>new Date(L)){S(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const A=Lt()?.[kn];if(!A){S(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(tt)||tt.length===0&&P.length===0){S(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const G=typeof t=="function"?t:()=>!1,K=A.id??A.reservationId;for(const Y of tt){if(Y?.type==="package"&&Array.isArray(Y.packageItems)){for(const j of Y.packageItems){const ae=j?.barcode??j?.normalizedBarcode??"";if(!ae)continue;const pe=bt(ae);if(pe==="reserved"){const le=te(ae);if(!G(le,M,L,K))continue}if(pe!=="available"){S(Mt(pe));return}}continue}const be=bt(Y.barcode);if(be==="reserved"){const j=te(Y.barcode);if(!G(j,M,L,K))continue}if(be!=="available"){S(Mt(be));return}}for(const Y of tt){if(Y?.type==="package"&&Array.isArray(Y.packageItems)){for(const j of Y.packageItems){const ae=te(j?.barcode??j?.normalizedBarcode??"");if(ae&&G(ae,M,L,K)){const pe=j?.desc||j?.barcode||o("reservations.create.packages.unnamedItem","معدة بدون اسم"),le=`${o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${h(String(pe))})`;S(le);return}}continue}const be=te(Y.barcode);if(G(be,M,L,K)){S(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const I=typeof n=="function"?n:()=>!1;for(const Y of tt){if(Y?.type!=="package")continue;const be=Y.packageId??Y.package_id??null;if(be&&I(be,M,L,K)){const j=Y.desc||Y.packageName||o("reservations.create.packages.genericName","الحزمة");S(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${h(String(j))} محجوزة بالفعل في الفترة المختارة`));return}}const O=typeof a=="function"?a:()=>!1;for(const Y of P)if(O(Y,M,L,K)){S(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const R=Array.isArray(je.projects)&&je.projects.length?je.projects:ue().projects||[],H=_&&R.find(Y=>String(Y.id)===String(_))||null,z={...A,projectId:_?String(_):null,confirmed:b},{effectiveConfirmed:ne,projectLinked:ee,projectStatus:ce}=At(z,H);let X=!!D?.checked,re=!!$?.checked;if(ee&&(X&&(D.checked=!1,X=!1),re=!1),!ee&&X!==re){S(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}re&&(Xe("edit-res-company-share"),X=!!D?.checked);let he=X?getCompanySharePercent("edit-res-company-share"):null;X&&(!Number.isFinite(he)||he<=0)&&(Xe("edit-res-company-share"),he=getCompanySharePercent("edit-res-company-share"));const ve=X&&re&&Number.isFinite(he)&&he>0,_e=ee?!1:re;ee&&(y=0,g="percent");const U=vs(tt,y,g,_e,P,{start:M,end:L,companySharePercent:ve?he:0});let Z=Aa();if(Number.isFinite(x)&&x>0){const Y=U;let be=null,j=null;q==="amount"?(be=x,Y>0&&(j=x/Y*100)):(j=x,Y>0&&(be=x/100*Y));const ae=uo({type:q,value:x,amount:be,percentage:j,recordedAt:new Date().toISOString()});ae&&(Z=[...Z,ae],Ks(Z)),V&&(V.value="")}const se=qs({totalAmount:U,history:Z}),fe=Ss({manualStatus:k,paidAmount:se.paidAmount,paidPercent:se.paidPercent,totalAmount:U});w&&!v&&(w.value=fe,w.dataset&&delete w.dataset.userSelected);let me=A.status??"pending";ee?me=H?.status??ce??me:["completed","cancelled"].includes(String(me).toLowerCase())||(me=b?"confirmed":"pending");const Je=Fr({reservationCode:A.reservationCode??A.reservationId??null,customerId:A.customerId,start:M,end:L,status:me,title:A.title??null,location:A.location??null,notes:f,projectId:_?String(_):null,totalAmount:U,discount:y,discountType:g,applyTax:_e,paidStatus:fe,confirmed:ne,items:tt.map(Y=>({...Y,equipmentId:Y.equipmentId??Y.id})),technicians:P,companySharePercent:ve?he:null,companyShareEnabled:ve,paidAmount:se.paidAmount,paidPercentage:se.paidPercent,paymentProgressType:se.paymentProgressType,paymentProgressValue:se.paymentProgressValue,paymentHistory:Z});try{const Y=await kc(A.id||A.reservationId,Je);await Mr(),Tn(),Le(),S(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),oo(),c?.({type:"updated",reservation:Y}),r?.(),i?.(),ls?.hide?.()}catch(Y){console.error("❌ [reservationsEdit] Failed to update reservation",Y);const be=la(Y)?Y.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");S(be,"error")}}function pm(e={}){je={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=je,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=h(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{ps("tax")}),c.dataset.listenerAttached="true");const d=document.getElementById("edit-res-company-share");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{ps("share")}),d.dataset.listenerAttached="true");const l=document.getElementById("edit-res-payment-progress-type");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{l.dataset.userSelected="true",t?.()}),l.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const p=document.getElementById("edit-res-project");p&&!p.dataset.listenerAttached&&(p.addEventListener("change",()=>{mo();const b=Array.isArray(je.projects)&&je.projects.length?je.projects:ue().projects||[],w=p.value&&b.find(q=>String(q.id)===String(p.value))||null,k={...je?.reservation??{},projectId:p.value||null,confirmed:us()},{effectiveConfirmed:F,projectLinked:V}=At(k,w);ds(F,{disable:V}),t?.()}),p.dataset.listenerAttached="true");const f=document.getElementById("edit-res-confirmed-btn");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{if(f.disabled)return;const b=!us();ds(b),t?.()}),f.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{Fu(je).catch(b=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",b)})}),m.dataset.listenerAttached="true");const y=document.getElementById("edit-res-equipment-barcode");if(y&&!y.dataset.listenerAttached){let b=null;const w=()=>{y.value?.trim()&&(clearTimeout(b),b=null,n?.(y))};y.addEventListener("keydown",k=>{k.key==="Enter"&&(k.preventDefault(),w())});const v=()=>{if(clearTimeout(b),!y.value?.trim())return;const{start:k,end:F}=getEditReservationDateRange();!k||!F||(b=setTimeout(()=>{w()},150))};y.addEventListener("input",v),y.addEventListener("change",w),y.dataset.listenerAttached="true"}io?.();const g=document.getElementById("editReservationModal");g&&!g.dataset.cleanupAttached&&(g.addEventListener("hidden.bs.modal",()=>{oo(),t?.(),s?.([])}),g.dataset.cleanupAttached="true")}const Du=ue()||{};let We=(Du.projects||[]).map(Hu),jn=!1;function fm(){return We}function Ia(e){We=Array.isArray(e)?e.map(Gs):[],ys({projects:We});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return We}async function Ru(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,d])=>{d==null||d===""||t.set(c,String(d))});const n=t.toString(),s=(await st(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(Qs);return Ia(i),jn=!0,We}async function Mu({force:e=!1,params:t=null}={}){if(!e&&jn&&We.length>0)return We;try{return await Ru(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),We}}async function ym(e){const t=await st("/projects/",{method:"POST",body:e}),n=Qs(t?.data??{}),a=[...We,n];return Ia(a),jn=!0,n}async function gm(e,t){const n=await st(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=Qs(n?.data??{}),s=We.map(r=>String(r.id)===String(e)?a:r);return Ia(s),jn=!0,a}async function bm(e){await st(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=We.filter(n=>String(n.id)!==String(e));Ia(t),jn=!0}function hm({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:d,paymentStatus:l,equipmentEstimate:u=0,expenses:p=[],taxAmount:f=0,totalWithTax:m=0,discount:y=0,discountType:g="percent",companyShareEnabled:b=!1,companySharePercent:w=null,companyShareAmount:v=0,paidAmount:k=null,paidPercentage:F=null,paymentProgressType:V=null,paymentProgressValue:q=null,confirmed:x=!1,technicians:_=[],equipment:P=[],payments:D,paymentHistory:$}={}){const C=Array.isArray(_)?_.map(R=>Number.parseInt(String(R),10)).filter(R=>Number.isInteger(R)&&R>0):[],M=Array.isArray(P)?P.map(R=>{const H=Number.parseInt(String(R.equipmentId??R.equipment_id??R.id??0),10),z=Number.parseInt(String(R.qty??R.quantity??0),10);return!Number.isInteger(H)||H<=0?null:{equipment_id:H,quantity:Number.isInteger(z)&&z>0?z:1}}).filter(Boolean):[],L=Array.isArray(p)?p.map(R=>{const H=Number.parseFloat(R?.amount??R?.value??0)||0,z=(R?.label??R?.name??"").trim();return z?{label:z,amount:Math.round(H*100)/100}:null}).filter(Boolean):[],B=L.reduce((R,H)=>R+(H?.amount??0),0),A={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!d,payment_status:l??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(B*100)/100,tax_amount:Math.round((Number.parseFloat(f)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(m)||0)*100)/100,confirmed:!!x,technicians:C,equipment:M,expenses:L},G=Math.max(0,Number.parseFloat(y)||0);A.discount=G,A.discount_type=g==="amount"?"amount":"percent";const K=Number.parseFloat(w),I=!!b&&Number.isFinite(K)&&K>0;A.company_share_enabled=I,A.company_share_percent=I?K:0,A.company_share_amount=I?Math.max(0,Number.parseFloat(v)||0):0,Number.isFinite(Number(k))&&(A.paid_amount=Math.max(0,Number.parseFloat(k)||0)),Number.isFinite(Number(F))&&(A.paid_percentage=Math.max(0,Number.parseFloat(F)||0)),(V==="amount"||V==="percent")&&(A.payment_progress_type=V),q!=null&&q!==""&&(A.payment_progress_value=Number.parseFloat(q)||0),e&&(A.project_code=String(e).trim());const O=D!==void 0?D:$;if(O!==void 0){const R=po(O)||[];A.payments=R.map(H=>({type:H.type,amount:H.amount!=null?H.amount:null,percentage:H.percentage!=null?H.percentage:null,value:H.value!=null?H.value:null,note:H.note??null,recorded_at:H.recordedAt??null}))}return A.end_datetime||delete A.end_datetime,A.client_company||(A.client_company=null),A}function Qs(e={}){return Gs(e)}function Hu(e={}){return Gs(e)}function Gs(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(m=>{if(m==null)return null;if(typeof m=="object"){const y=m.id??m.technician_id??m.technicianId;return y!=null?String(y):null}return String(m)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(m=>{const y=m?.equipment_id??m?.equipmentId??m?.id??null,g=m?.quantity??m?.qty??0,b=m?.barcode??m?.code??"",w=m?.description??m?.name??"";return{equipmentId:y!=null?String(y):null,qty:Number.parseInt(String(g),10)||0,barcode:b,description:w}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((m,y)=>({id:m?.id??`expense-${t??"x"}-${y}`,label:m?.label??"",amount:Number.parseFloat(m?.amount??0)||0})),d=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,l=e.company_share_enabled??e.companyShareEnabled,u=l!=null?l===!0||l===1||String(l).toLowerCase()==="true":d>0,p=e.payment_history??e.paymentHistory??e.payments??null,f=po(p);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?d:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(m=>typeof m=="object"?m:{id:m}),equipment:r,expenses:c,paymentHistory:f}}function vm(e){return e instanceof Tr}function Ha(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function zu(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=Ha(e.value);let s=Ha(e.amount),r=Ha(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,d=e.recordedAt??e.recorded_at??e.date??null;let l=null;if(d){const p=new Date(d);Number.isNaN(p.getTime())||(l=p.toISOString())}l||(l=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:l}}function po(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>zu(t)).filter(Boolean):[]}const ia="reservations-ui:ready",jt=typeof EventTarget<"u"?new EventTarget:null;let Ct={};function Ou(e){return Object.freeze({...e})}function Vu(){if(!jt)return;const e=Ct,t=typeof CustomEvent=="function"?new CustomEvent(ia,{detail:e}):{type:ia,detail:e};typeof jt.dispatchEvent=="function"&&jt.dispatchEvent(t)}function Uu(e={}){if(!e||typeof e!="object")return Ct;const t={...Ct};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),Ct=Ou(t),Vu(),Ct}function Ku(e){if(e)return Ct?.[e]}function qm(e){const t=Ku(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const i=(s?.detail||Ct)?.[e];typeof i=="function"&&(jt&&jt.removeEventListener(ia,a),n(i))};jt&&jt.addEventListener(ia,a)})}function Sm(){return Mu().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=ue()||{};Pc(e||[]),bi()})}function Ws(e=null){bi(),fo(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Qu(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function fs(){return{populateEquipmentDescriptionLists:wt,setFlatpickrValue:ku,splitDateTime:Cr,renderEditItems:It,updateEditReservationSummary:Ue,addEquipmentByDescription:Iu,addEquipmentToEditingReservation:Au,addEquipmentToEditingByDescription:ra,combineDateTime:En,hasEquipmentConflict:rt,hasTechnicianConflict:Br,renderReservations:fo,handleReservationsMutation:Ws,ensureModal:Qu}}function fo(e="reservations-list",t=null){du({containerId:e,filters:t,onShowDetails:yo,onConfirmReservation:bo})}function yo(e){return uu(e,{getEditContext:fs,onEdit:(t,{reservation:n})=>{ho(t,n)},onDelete:go})}function go(e){return Ht()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?pu(e,{onAfterChange:Ws}):!1:(_n(),!1)}function bo(e){return fu(e,{onAfterChange:Ws})}function ho(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}Pr(e,fs());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}Pr(e,fs());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}uc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Em(){Uu({showReservationDetails:yo,deleteReservation:go,confirmReservation:bo,openReservationEditor:ho})}export{Uu as A,yo as B,Qs as C,rm as D,sn as E,im as F,fm as G,vm as H,vi as I,om as J,dm as K,em as L,tm as M,Ru as N,nm as O,sm as P,am as Q,cm as R,bm as S,ym as T,Wl as U,Si as V,Ei as W,lm as X,Mu as a,Em as b,pm as c,mm as d,um as e,bi as f,fs as g,de as h,Yu as i,Ws as j,Vl as k,Sm as l,ha as m,Le as n,Dc as o,Kn as p,Xu as q,fo as r,Zu as s,Ju as t,Ue as u,Ku as v,qm as w,hi as x,hm as y,gm as z};
