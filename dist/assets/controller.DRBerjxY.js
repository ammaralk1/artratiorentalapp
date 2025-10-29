import{n as h,l as fe,A as Lc,t as o,a as mt,s as E,u as dn,c as Gn,d as Ta,b as er,z as Nc,f as st,B as tr,o as Tc}from"./auth.UdF5b_hJ.js";import{B as se,C as qt,E as nr,F as jc,D as an,G as Rs,n as Ye,H as ar,I as Ii,J as Vn,K as Un,L as ja,M as Bc,N as Ms,O as St,P as zs,Q as kn,R as sr,S as Os,T as Dc,U as Fc,V as Rc,W as ir,X as un,Y as ya,Z as Mc,_ as Ba,$ as rr,a0 as or,a as Hs,o as Vs,q as Us,a1 as cr,a2 as zc,s as sn,h as Da,a3 as Oc,a4 as lr,a5 as Hc,i as Ks,r as Ht,a6 as Qs,a7 as Bt,a8 as ba,m as Ee,p as De,y as Fa,b as dr,a9 as ur,aa as fs,j as mr,g as tn,z as Vc,ab as Uc,l as pr,ac as ys,ad as Kc,u as Qc,ae as Gc,af as Wc,ag as Xc,ah as Jc}from"./reservationsService.CKGoK7pj.js";const is="select.form-select:not([data-no-enhance]):not([multiple])",Et=new WeakMap;let rs=null,_i=!1,It=null;function Im(e=document){e&&(e.querySelectorAll(is).forEach(t=>la(t)),!rs&&e===document&&(rs=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(is)&&la(a),a.querySelectorAll?.(is).forEach(s=>la(s)))})}),rs.observe(document.body,{childList:!0,subtree:!0})),_i||(_i=!0,document.addEventListener("pointerdown",el,{capture:!0})))}function ca(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){la(e);return}const t=e.closest(".enhanced-select");t&&(Gs(t),ga(t),bs(t))}function la(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){ca(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};Et.set(t,r),a.addEventListener("click",()=>Zc(t)),a.addEventListener("keydown",i=>tl(i,t)),s.addEventListener("click",i=>al(i,t)),s.addEventListener("keydown",i=>nl(i,t)),e.addEventListener("change",()=>{ga(t),fr(t)}),r.observer=new MutationObserver(i=>{let c=!1,l=!1;for(const d of i)d.type==="attributes"&&d.attributeName==="disabled"&&(l=!0),d.type==="childList"&&(c=!0);l&&bs(t),c&&Yc(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),Gs(t),ga(t),bs(t)}function Yc(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,Gs(t),ga(t)})))}function Gs(e){const t=Et.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),fr(e)}function ga(e){const t=Et.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function fr(e){const t=Et.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function bs(e){const t=Et.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function Zc(e){Et.get(e)&&(e.getAttribute("data-open")==="true"?Pn(e):yr(e))}function yr(e){const t=Et.get(e);if(!t)return;It&&It!==e&&Pn(It,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),It=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function Pn(e,{focusTrigger:t=!0}={}){const n=Et.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),It===e&&(It=null))}function el(e){if(!It)return;const t=e.target;t instanceof Node&&(It.contains(t)||Pn(It,{focusTrigger:!1}))}function tl(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),yr(t)):n==="Escape"&&Pn(t)}function nl(e,t){const n=e.key,a=Et.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&br(i,t)}else n==="Escape"&&(e.preventDefault(),Pn(t))}function al(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&br(n,t)}function br(e,t){const n=Et.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),Pn(t)}const $n=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let _t=null;function Ws(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function gr(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function sl(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function il(e={}){const t=sl({...e,activatedAt:Date.now()});return _t=t,gr(!0,t.mode||"create"),Ws($n.change,{active:!0,selection:{...t}}),t}function ha(e="manual"){if(!_t)return;const t=_t;_t=null,gr(!1),Ws($n.change,{active:!1,previous:t,reason:e})}function hr(){return!!_t}function rl(){return _t?{..._t}:null}function ol(e){if(!_t)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=h(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:r,description:i}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const l=c.map(u=>h(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!l.length)return!1;const d=Number.isInteger(s)&&s>0?s:l.length;t={barcodes:l,quantity:Math.min(d,l.length)},r&&(t.groupKey=r),i&&(t.description=i)}else return!1;return Ws($n.requestAdd,{...t,selection:{..._t}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||ha("tab-changed")});const cl=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),ll=new Set(["maintenance","reserved","retired"]);function dl(e){const t=String(e??"").trim().toLowerCase();return t&&cl.get(t)||"available"}function ul(e){return e?typeof e=="object"?e:Ra(e):null}function $t(e){const t=ul(e);return t?dl(t.status||t.state||t.statusLabel||t.status_label):"available"}function vr(e){return!ll.has($t(e))}function mn(e={}){return e.image||e.imageUrl||e.img||""}function ml(e){if(!e)return null;const t=se(e),{equipment:n=[]}=fe();return(n||[]).find(a=>se(a?.barcode)===t)||null}function Ra(e){const t=se(e);if(!t)return null;const{equipment:n=[]}=fe();return(n||[]).find(a=>se(a?.barcode)===t)||null}const pl=fe()||{};let Dt=(pl.equipment||[]).map(bl),gs=!1,vn="",Yt=null,rn=null,on=null,Ma=!1,ki=!1;function fl(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function yl(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function bl(e={}){return Xs({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function za(e={}){return Xs(e)}function Xs(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=Wn(e.quantity??e.qty??0),i=Oa(e.unit_price??e.price??0),c=h(String(e.barcode??"").trim()),l=Ue(e.status??e.state??e.status_label??e.statusLabel??"available"),d=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:gl(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:l,image:d,imageUrl:d,created_at:e.created_at??null,updated_at:e.updated_at??null}}function gl(e){return e!=null&&e!==""}function Wn(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function Oa(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function hl(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function Pi(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function vl(e,t){const n=Pi(e),a=Pi(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}else{if(r!==i)return r?-1:1;{const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}}const c=qa(e?.desc||e?.description||e?.name||""),l=qa(t?.desc||t?.description||t?.name||"");return c.localeCompare(l,"ar",{sensitivity:"base"})}function Fe(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ue(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function ql(e){return Ue(e)}function va(){if(!hr())return null;const e=rl();return e?{...e}:null}function Sl(e){const t=va();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:r=null}=t,i=t?.mode||t?.source||"",c=[],l=new Set;if(n.forEach(y=>{const m=se(y?.barcode);!m||l.has(m)||(l.add(m),c.push({variant:y,barcode:m}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(i==="package-manager"||i==="equipment-packages"){const y=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:m})=>m),maxQuantity:y,reason:""}}const d=c.filter(({variant:y})=>{const m=Ue(y?.status);return m!=="maintenance"&&m!=="retired"});if(!a||!s)return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=d.filter(({barcode:y})=>!qt(y,a,s,r));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:y})=>y),maxQuantity:u.length};let b=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(d.length>0)b=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const y=new Set(c.map(({variant:m})=>Ue(m?.status)));y.has("maintenance")?b=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):y.has("reserved")?b=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):y.has("retired")&&(b=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:b,availableBarcodes:[],maxQuantity:0}}function El(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function qr(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=va();e.hidden=!s;const r=s?.mode||s?.source||"";s?r==="package-manager"||r==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=va(),l=c?.mode||c?.source||"";l==="package-manager"||l==="equipment-packages"?ha("package-finish-button"):(ha("return-button"),El())}),t.dataset.listenerAttached="true")}function it(){return Dt}function cn(e){Dt=Array.isArray(e)?e.map(Xs):[],Ta({equipment:Dt}),yl()}function qa(e){return String(e??"").trim().toLowerCase()}function Mt(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=qa(t);return n||(n=qa(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function Ha(e){const t=Mt(e);return t?it().filter(n=>Mt(n)===t):[]}function Va(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=Ua(e);if(n){const a=Fe(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${Fe(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function Js(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function Sa(){const e=Js();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function Ys(e={}){const t=Js();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function An(e){Ma=e;const t=Js(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function wl(e){if(!dn()){Gn();return}if(!e)return;try{await xl()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let l=0;if(i.forEach(d=>{const u=d.القسم??d.category??"",b=d["القسم الثانوي"]??d.subcategory??"",y=d.الوصف??d.description??d.name??"",m=d.الكمية??d.quantity??0,p=d.السعر??d.price??0,g=d.الباركود??d.barcode??"",v=d.الحالة??d.status??"متاح",I=d.الصورة??d.image_url??d.image??"",q=h(String(g||"")).trim();if(!y||!q){l+=1;return}c.push(Zs({category:u,subcategory:b,description:y,quantity:m,unit_price:p,barcode:q,status:v,image_url:I}))}),!c.length){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const d=await mt("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(d?.data)?d.data.map(za):[];if(u.length){const m=[...it(),...u];cn(m)}await Xn({showToastOnError:!1}),Ke();const b=d?.meta?.count??u.length,y=[];b&&y.push(`${b} ✔️`),l&&y.push(`${l} ⚠️`),E(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(y.length?` (${y.join(" / ")})`:""))}catch(d){const u=Ln(d,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");E(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const Al="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let Tn=null;function xl(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):Tn||(Tn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=Al,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),Tn=null,e}),Tn)}function Zs({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const l=h(String(r||"")).trim(),d=ql(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:Wn(a),unit_price:Oa(s),barcode:l,status:d,image_url:c?.trim()||null}}async function Sr(){if(!dn()){Gn();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await mt("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await Xn({showToastOnError:!1}),E(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=Ln(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");E(t,"error")}}function Ua(e){return e.image||e.imageUrl||e.img||""}function Il(e){const t=Ue(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function Ea(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${Fe(a)}</td></tr>`}n&&(n.textContent="0")}function Er(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=Yt?.groupKey||Mt(e);if(!r){Ea();return}const i=it().filter(b=>Mt(b)===r).sort((b,y)=>{const m=String(b.barcode||"").trim(),p=String(y.barcode||"").trim();return!m&&!p?0:m?p?m.localeCompare(p,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){Ea();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),l=o("equipment.form.labels.quantity","الكمية"),d=it(),u=i.map(b=>{const y=b.id&&e.id?String(b.id)===String(e.id):String(b.barcode||"")===String(e.barcode||""),m=y?"equipment-variants-table__row--current":"",p=Fe(String(b.barcode||"-")),g=y?`<span class="equipment-variants-current-badge">${Fe(c)}</span>`:"",v=h(String(Number.isFinite(Number(b.qty))?Number(b.qty):0)),I=d.indexOf(b),q=Fe(o("equipment.item.actions.delete","🗑️ حذف")),_=I>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${I}">${q}</button>
          </div>`:"";return`
        <tr class="${m}">
          <td>
            ${p}
            ${g}
          </td>
          <td>${Il(b.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${Fe(l)}">${v}</span>
          </td>
          <td class="table-actions-cell">${_}</td>
        </tr>
      `}).join("");n.innerHTML=u}function _l({item:e,index:t}){const n=Ua(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=dn(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},l=Number.isFinite(Number(e.qty))?Number(e.qty):0,d=Number.isFinite(Number(e.price))?Number(e.price):0,u=l.toLocaleString("en-US"),b=d.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),y=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,m=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,p=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(l-y-m,0),g=p.toLocaleString("en-US"),v=o("equipment.card.labels.availableOfTotal","من أصل"),I=Ue(e.status);let q=`${Fe(c.available)}: ${Fe(g)} ${Fe(v)} ${Fe(u)}`,_="available";if(p===0){const H={reserved:{text:l===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},D=H[I]||H.default;q=Fe(D.text),_=D.modifier}const A=`<span class="equipment-card__availability equipment-card__availability--${_}">${q}</span>`,U="",S=e.desc||e.name||"—",x=e.name&&e.name!==e.desc?e.name:"",T=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${b} ${r}`}].map(({label:H,value:D})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${H}</span>
              <span class="equipment-card__detail-value">${D}</span>
            </span>
          `).join("")}
    </div>`,X=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),k=X.length?`<div class="equipment-card__categories">${X.map(({label:H,value:D})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${H}</span>
              <span class="equipment-card__detail-value">${D}</span>
            </div>
          `).join("")}</div>`:"",F=x?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${x}</span>
      </div>`:"",L=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${S}</h3>
    </div>
  `}
      ${T}
    </div>
  `,B=[],$=Sl(e),K=$?.availableBarcodes?.length?$.availableBarcodes.join(","):$?.barcode?$.barcode:"";let G="",R="";if($.active){const H=`equipment-select-qty-${t}`,D=!!$.canSelect,te=D?Math.max(1,Number($.maxQuantity||$.availableBarcodes?.length||1)):1,ue=Math.max(1,Math.min(te,99)),ye=[];for(let Ae=1;Ae<=ue;Ae+=1){const je=h(String(Ae));ye.push(`<option value="${Ae}"${Ae===1?" selected":""}>${je}</option>`)}const we=D?"":" disabled",qe=o("reservations.create.equipment.selector.quantityLabel","الكمية"),Q=D?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${h(String(te))}`:$.reason?$.reason:"";G=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${H}">${qe}</label>
        <select class="equipment-card__quantity-select" id="${H}" data-equipment-select-quantity${we}>
          ${ye.join("")}
        </select>
        ${Q?`<span class="equipment-card__selection-hint">${Fe(Q)}</span>`:""}
      </div>
    `;const re=va(),be=re?.mode||re?.source||"",Qe=be==="package-manager"||be==="equipment-packages"?o("equipment.packages.selection.addToPackage","➕ أضف إلى الحزمة"):o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),W=D?"":" disabled",oe=$.reason?` title="${Fe($.reason)}"`:"",le=['data-equipment-action="select-reservation"',`data-selection-max="${D?te:0}"`];K&&le.push(`data-selection-barcodes="${Fe(K)}"`),e.groupKey&&le.push(`data-selection-group="${Fe(String(e.groupKey))}"`),R=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${le.join(" ")}${W}${oe}>${Qe}</button>
    `}i&&B.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const Y=B.length?B.join(`
`):"",j=Fe(S);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${Fe(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${j}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${U}
        ${A}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${L}
        </div>
      </div>
      <div class="equipment-card__body">
        ${k}
        ${F}
      </div>
      ${G||R||Y?`<div class="equipment-card__actions equipment-card__actions--center">
            ${G}
            ${R}
            ${Y}
          </div>`:""}
    </article>
  `}function kl(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,a.appendChild(l)}),t.includes(i)&&(a.value=i),ca(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,s.appendChild(l)}),n.includes(i)&&(s.value=i),ca(s)}const r=document.getElementById("filter-status");r&&ca(r)}function Cn(){const e=fe();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return Dt=t||[],Dt;const s=new Date;let r=!1;const i=new Set((a||[]).filter(l=>l?.status==="open").map(l=>h(String(l?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(l=>{if(!l)return l;const d=Ue(l.status),u=h(String(l.barcode??"")).trim().toLowerCase(),b=u&&i.has(u);let y=b?"maintenance":"available";if(!b&&u)for(const m of n||[]){if(!Pl(m,s))continue;if(m.items?.some(g=>h(String(g?.barcode??"")).trim().toLowerCase()===u)){y="reserved";break}}return y!==d?(r=!0,{...l,status:y}):{...l,status:y}});return r?cn(c):(Dt=c,Ta({equipment:Dt})),Dt}function Pl(e,t){if(!e?.start||!e?.end)return!1;const n=String(e?.status||e?.reservationStatus||"").toLowerCase();if(n==="cancelled"||n==="canceled")return!1;const a=new Date(e.start),s=new Date(e.end);return Number.isNaN(a.getTime())||Number.isNaN(s.getTime())?!1:a<=t&&t<s}function os(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Ke(){const e=document.getElementById("equipment-list");if(!e)return;qr();const t=Cn(),n=Array.isArray(t)?t:it(),a=new Map;n.forEach(g=>{if(!g)return;const v=Mt(g);v&&(a.has(v)||a.set(v,[]),a.get(v).push(g))});const s=Array.from(a.values()).map(g=>{const v=g[0],I=g.reduce((x,C)=>x+(Number.isFinite(Number(C.qty))?Number(C.qty):0),0),q=["maintenance","reserved","available","retired"],_=g.map(x=>Ue(x.status)).sort((x,C)=>q.indexOf(x)-q.indexOf(C))[0]||"available",A=g.reduce((x,C)=>{const T=Wn(C?.qty??0)||0,X=Ue(C?.status);return X==="reserved"?x.reserved+=T:X==="maintenance"&&(x.maintenance+=T),x},{reserved:0,maintenance:0}),U=Math.max(I-A.reserved-A.maintenance,0);return{item:{...v,qty:I,status:_,variants:g,groupKey:Mt(v),reservedQty:A.reserved,maintenanceQty:A.maintenance,availableQty:U},index:n.indexOf(v)}});s.sort((g,v)=>vl(g.item,v.item));const r=document.getElementById("search-equipment")?.value||"",i=h(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",l=document.getElementById("filter-sub")?.value||"",d=document.getElementById("filter-status")?.value||"",u=d?Ue(d):"";if(gs&&!n.length){e.innerHTML=os(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(vn&&!n.length){e.innerHTML=os(vn,{tone:"error",icon:"⚠️"});return}const b=s.filter(({item:g})=>{const v=h(String(g.barcode??"")).toLowerCase().trim(),I=Array.isArray(g.variants)?g.variants.map(S=>h(String(S.barcode??"")).toLowerCase().trim()).filter(Boolean):[],q=!i||g.name&&g.name.toLowerCase().includes(i)||g.desc&&g.desc.toLowerCase().includes(i)||v&&v.includes(i)||I.some(S=>S.includes(i))||g.category&&g.category.toLowerCase().includes(i)||g.sub&&g.sub.toLowerCase().includes(i),_=!c||g.category===c,A=!l||g.sub===l,U=!u||Ue(g.status)===u;return q&&_&&A&&U}),y=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),m=b;e.innerHTML=m.length?m.map(_l).join(""):os(y);const p=document.getElementById("equipment-list-count");if(p){const g=o("equipment.list.countSuffix","عنصر"),v=h(String(m.length)),I=m.length?`${v} ${g}`:`0 ${g}`;p.textContent=I}kl(n)}async function Xn({showToastOnError:e=!0}={}){gs=!0,vn="",Ke();try{const t=await mt("/equipment/?all=1"),n=t?.data??t;let a=[];Array.isArray(n)?a=n:n&&typeof n=="object"&&(Array.isArray(n.items)?a=n.items:Array.isArray(n.results)?a=n.results:Array.isArray(n.data)?a=n.data:Array.isArray(n.records)&&(a=n.records));const s=a.map(za);cn(s)}catch(t){t&&typeof t=="object"&&Number(t.status)===401?vn="":(vn=Ln(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&E(vn,"error"))}finally{gs=!1,Ke()}}function Ln(e,t,n){if(e instanceof er){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function $l(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),r=Oa(t.querySelector("#new-equipment-price")?.value||"0"),i=Wn(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",l=t.querySelector("#new-equipment-category")?.value?.trim()||"",d=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){E(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const b=Zs({category:l,subcategory:d,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const y=await mt("/equipment/",{method:"POST",body:b}),m=za(y?.data),p=[...it(),m];cn(p),Ke(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),E(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(y){const m=Ln(y,"equipment.toast.addFailed","تعذر إضافة المعدة");E(m,"error")}}async function wr(e){if(!dn()){Gn();return}const t=it(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await mt(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),cn(a),Ke(),E(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=Ln(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");E(s,"error")}}async function Cl(e,t){const n=it(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},cn(r),Ke();return}const s=Zs({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await mt(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=za(r?.data),c=[...n];c[e]=i,cn(c),Ke(),E(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=Ln(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw E(i,"error"),r}}function ia(){Ke()}function Ar(e){const n=it()[e];if(!n)return;rn=e;const a=Ha(n),s=a[0]||n,r=a.reduce((l,d)=>l+(Number.isFinite(Number(d.qty))?Number(d.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(l=>Ue(l.status)).sort((l,d)=>i.indexOf(l)-i.indexOf(d))[0]||Ue(s.status);document.getElementById("edit-equipment-index").value=e,Ys({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:Ua(s)||"",barcode:s.barcode||"",status:s.status||c}),An(!1),on=Sa(),Va(s),Er(s),Yt={groupKey:Mt(s),barcode:String(s.barcode||""),id:s.id||null},fl(document.getElementById("editEquipmentModal"))?.show()}function Ll(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),r=s?.querySelector("[data-equipment-select-quantity]");let i=Number.parseInt(r?.value||"1",10);(!Number.isFinite(i)||i<=0)&&(i=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&i>c&&(i=c);const d=(t.dataset.selectionBarcodes||"").split(",").map(m=>m.trim()).filter(m=>m.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",b=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";ol({barcodes:d,quantity:i,groupKey:b,description:u})||E(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||wr(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||Ar(s)}}function Nl(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||Ar(n)}}function Tl(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||wr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function xr(){if(!Yt||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=it(),a=Yt.id?n.find(l=>String(l.id)===String(Yt.id)):null,s=Yt.groupKey,r=s?n.find(l=>Mt(l)===s):null,i=a||r;if(!i){Ea();return}const c=n.findIndex(l=>l===i);if(c>=0){const l=document.getElementById("edit-equipment-index");l&&(l.value=String(c)),rn=c}if(Er(i),!Ma){const l=Ha(i),d=l[0]||i,u=l.reduce((m,p)=>m+(Number.isFinite(Number(p.qty))?Number(p.qty):0),0),b=["maintenance","reserved","available","retired"],y=l.map(m=>Ue(m.status)).sort((m,p)=>b.indexOf(m)-b.indexOf(p))[0]||Ue(d.status);Ys({category:d.category||"",subcategory:d.sub||"",description:d.desc||d.description||"",quantity:String(u||d.qty||0),price:d.price!=null?String(d.price):"0",image:Ua(d)||"",barcode:d.barcode||"",status:d.status||y}),on=Sa()}Va(primary)}function jl(){document.getElementById("search-equipment")?.addEventListener("input",ia),document.getElementById("filter-category")?.addEventListener("change",ia),document.getElementById("filter-sub")?.addEventListener("change",ia),document.getElementById("filter-status")?.addEventListener("change",ia),document.getElementById("add-equipment-form")?.addEventListener("submit",$l);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),Sr().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",Ll),t.addEventListener("keydown",Nl),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",Tl),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);hl(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!Ma){on=Sa(),An(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){E(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:Wn(document.getElementById("edit-equipment-quantity").value)||1,price:Oa(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await Cl(t,n),on=Sa(),An(!1),xr()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{jl(),Ke(),Xn();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(on&&Ys(on),rn!=null){const a=it()[rn];if(a){const r=Ha(a)[0]||a;Va(r)}}An(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Ke(),An(Ma),rn!=null){const t=it()[rn];if(t){const a=Ha(t)[0]||t;Va(a)}}});document.addEventListener("equipment:refreshRequested",()=>{Xn({showToastOnError:!1})});document.addEventListener(Lc.USER_UPDATED,()=>{Ke()});document.addEventListener("equipment:changed",()=>{xr()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{Yt=null,Ea(),rn=null,on=null,An(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!ki&&(document.addEventListener($n.change,()=>{qr(),Ke()}),ki=!0);const _m=Object.freeze(Object.defineProperty({__proto__:null,clearEquipment:Sr,refreshEquipmentFromApi:Xn,renderEquipment:Ke,syncEquipmentStatuses:Cn,uploadEquipmentFromExcel:wl},Symbol.toStringTag,{value:"Module"})),Bl="__DEBUG_CREW__";function Dl(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(Bl);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function $i(e,t){if(Dl())try{console.log(`🪵 [crew-debug:create] ${e}`,t)}catch{}}const Ir="projects:create:draft",_r="projects.html#projects-section";let hs=null,kr=[],vs=new Map,qs=new Map,wa=new Map,cs=!1,da=null,Ci=!1,Pr=[];function Fl(e){if(!e)return null;let t=Pr.find(a=>a.id===e)||null;if(t)return t;const n=Os(e);return n?(t={id:e,name:Fc(n)||e,price:Dc(n),items:Ms(n),raw:n},t):null}function Aa(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function xa(e){return h(String(e||"")).trim().toLowerCase()}function Rl(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function $r(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function Cr(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Lr(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Nr(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function ln(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function ei(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function pn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function nt(){const{input:e,hidden:t}=pn();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function Xt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function Tr(e,t,{allowPartial:n=!1}={}){const a=Ye(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function Ss(e,t={}){return Tr(vs,e,t)}function Es(e,t={}){return Tr(qs,e,t)}function at(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function jr(e){kr=Array.isArray(e)?[...e]:[]}function ti(){return kr}function ni(e){return e&&ti().find(t=>String(t.id)===String(e))||null}function Li(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function xn(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??an,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:an}function ut(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??an,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=an),t.dataset.companyShare=String(s),t.checked=!0}function ws(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(cs){ve();return}cs=!0;const a=()=>{cs=!1,ve()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(an)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),ut()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?ut():n.checked&&(n.checked=!1));a()}function Ml(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Ni(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function Ti(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function kt({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=ei();if(!n||!a||!s)return;const r=Rs()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const l=new Set;vs=new Map;const d=r.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:Ti(m)||c})).filter(m=>{if(!m.label)return!1;const p=Ye(m.label);return!p||l.has(p)?!1:(l.add(p),vs.set(p,m),!0)}).sort((m,p)=>m.label.localeCompare(p.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(m=>`<option value="${Aa(m.label)}"></option>`).join("");const u=t?"":n.value,b=e?String(e):a.value?String(a.value):"",y=b?r.find(m=>String(m.id)===b):null;if(y){const m=Ti(y)||c;a.value=String(y.id),n.value=m,n.dataset.selectedId=String(y.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function In({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=pn();if(!a||!s||!r)return;const i=Array.isArray(t)?t:ti()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const l=[...i].filter(g=>g&&g.id!=null).sort((g,v)=>String(v.createdAt||v.start||"").localeCompare(String(g.createdAt||g.start||""))),d=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),b=new Set;qs=new Map;const y=l.map(g=>{const v=Li(g)||u;return{id:String(g.id),label:v}}).filter(g=>{if(!g.label)return!1;const v=Ye(g.label);return!v||b.has(v)?!1:(b.add(v),qs.set(v,g),!0)});r.innerHTML=y.map(g=>`<option value="${Aa(g.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",p=m?l.find(g=>String(g.id)===m):null;if(p){const g=Li(p)||u;s.value=String(p.id),a.value=g,a.dataset.selectedId=String(p.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function Ia(e,t,n){const{date:a,time:s}=sr(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function Br(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||In({selectedValue:a});const r=(Rs()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";kt(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=Ni(e,"start"),l=Ni(e,"end");c&&Ia("res-start","res-start-time",c),l&&Ia("res-end","res-end-time",l);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),ve(),zt()}function Dr({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:fe(),s=Array.isArray(a)?a:[];jr(s);const r=t!=null?String(t):n.value?String(n.value):"";In({selectedValue:r,projectsList:s}),zt(),ve()}function zt(){const{input:e,hidden:t}=pn(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),l=document.getElementById("res-discount-type"),d=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),b=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(Xt(n,nt),a&&Xt(a,nt)),s&&Xt(s,nt),r&&Xt(r,nt),i&&Xt(i,nt),c&&Xt(c,nt),l&&Xt(l,nt),b)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=d),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=d),s&&(s.value="unpaid",at(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=d),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=d),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=d),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=d),l&&(l.value="percent",l.disabled=!0,l.classList.add("reservation-input-disabled"),l.title=d);else{if(n){const y=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",y&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.disabled=!1,l.classList.remove("reservation-input-disabled"),l.title="")}ws("tax"),ve()}function ai(){const{input:e,hidden:t}=pn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Es(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=ni(r.id);i?Br(i,{skipProjectSelectUpdate:!0}):(zt(),ve())}else t.value="",e.dataset.selectedId="",zt(),ve()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Es(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function si(){const{input:e,hidden:t}=ei();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Ss(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),ve()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Ss(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function zl(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){Rn({clearValue:!0});return}let n=null;try{const d=decodeURIComponent(t);n=JSON.parse(d)}catch(d){console.warn("⚠️ [reservations/createForm] Failed to decode project context",d)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),Rn({clearValue:!1}),!n)return;n.fromProjectForm&&(da={draftStorageKey:n.draftStorageKey||Ir,returnUrl:n.returnUrl||_r});const r=document.getElementById("res-project");if(n.projectId){r&&(In({selectedValue:String(n.projectId)}),zt());const d=ni(n.projectId);d?Br(d,{forceNotes:!!n.forceNotes}):ve(),Rn()}else{r&&In({selectedValue:""});const d=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");nd(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),d)}n.start&&Ia("res-start","res-start-time",n.start),n.end&&Ia("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(Rs()||[]).find(b=>String(b.id)===String(n.customerId));u?.id!=null&&(kt({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(kt({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):kt({selectedValue:""});const l=document.getElementById("res-notes");l&&n.description&&!l.value&&(l.value=n.description),ve()}function fn(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Vn(e,n),end:Vn(t,a)}}function Fr(e){const t=xa(e);if(t){const c=wa.get(t);if(c)return c}const{description:n,barcode:a}=$r(e);if(a){const c=Ra(a);if(c)return c}const s=Ye(n||e);if(!s)return null;let r=ir();if(!r?.length){const c=fe();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&lr(r)}const i=r.find(c=>Ye(c?.desc||c?.description||"")===s);return i||r.find(c=>Ye(c?.desc||c?.description||"").includes(s))||null}function Rr(e,t="equipment-description-options"){const n=xa(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(l=>xa(l.value)===n)||wa.has(n))return!0;const{description:s}=$r(e);if(!s)return!1;const r=Ye(s);return r?(ir()||[]).some(c=>Ye(c?.desc||c?.description||"")===r):!1}const Ol={available:0,reserved:1,maintenance:2,retired:3};function Hl(e){return Ol[e]??5}function ji(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function Vl(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${ji(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${ji(n)})`}function Ot(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=Cn(),a=fe(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];lr(r);const i=new Map;r.forEach(d=>{const u=Rl(d),b=xa(u);if(!b||!u)return;const y=$t(d),m=Hl(y),p=i.get(b);if(!p){i.set(b,{normalized:b,value:u,bestItem:d,bestStatus:y,bestPriority:m,statuses:new Set([y])});return}p.statuses.add(y),m<p.bestPriority&&(p.bestItem=d,p.bestStatus=y,p.bestPriority=m,p.value=u)}),wa=new Map;const l=Array.from(i.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{wa.set(d.normalized,d.bestItem);const u=Vl(d),b=Aa(d.value);if(u===d.value)return`<option value="${b}"></option>`;const y=Aa(u);return`<option value="${b}" label="${y}"></option>`}).join("");e&&(e.innerHTML=l),t&&(t.innerHTML=l)}function Mr(e,t,n={}){const{silent:a=!1}=n,s=se(e);if(!s)return{success:!1,message:null};const{start:r,end:i}=fn();if(!r||!i){const p=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||E(p),{success:!1,message:p}}const c=St();if(ii(c).has(s)){const p=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||E(p),{success:!1,message:p}}const d=zs(s,r,i);if(d.length){const p=d.map(v=>v.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${p}`);return a||E(g),{success:!1,message:g}}if(qt(s,r,i)){const p=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||E(p),{success:!1,message:p}}const u=Ra(s);if(!u){const p=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||E(p),{success:!1,message:p}}const b=$t(u);if(b==="maintenance"||b==="retired"){const p=ln(b);return a||E(p),{success:!1,message:p}}const y=un(u);if(!y){const p=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||E(p),{success:!1,message:p}}ja({id:y,equipmentId:y,barcode:s,desc:u.desc,qty:1,price:u.price,image:mn(u)}),t&&(t.value=""),Ct(),ve();const m=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||E(m),{success:!0,message:m,barcode:s}}function As(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Fr(t);if(!n){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=ml(n.barcode),s=$t(a||n);if(s==="maintenance"||s==="retired"){E(ln(s));return}const r=se(n.barcode);if(!r){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=un(n);if(!i){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:mn(n)},{start:l,end:d}=fn();if(!l||!d){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=St();if(ii(u).has(r)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const y=zs(r,l,d);if(y.length){const m=y.map(p=>p.name).join(", ");E(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`));return}if(qt(r,l,d)){E(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}ja(c),Ct(),ve(),E(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function Ul(){Ot();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),As(e))});const t=()=>{Rr(e.value,"equipment-description-options")&&As(e)};e.addEventListener("focus",()=>{if(Ot(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Bi(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function ii(e=St()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=se(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const r=se(s?.normalizedBarcode??s?.barcode);r&&t.add(r)})}),t}function Kl(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=fn();if(!t||!n){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}il({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):E(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener($n.change,t=>{Bi(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),Bi(e,hr()))}function Ql(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,r=a.length?a:t.barcode?[t.barcode]:[];if(!r.length)return;let i=0,c=null;const l=[],d=new Set;r.forEach(b=>{const y=se(b);y&&!d.has(y)&&(d.add(y),l.push(y))});const u=Math.min(s,l.length);for(let b=0;b<u;b+=1){const y=l[b],m=Mr(y,null,{silent:!0});m.success&&(i+=1),m.message&&(c=m.message)}if(i>0){const y=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",h(String(i)));E(y)}else c&&E(c)}function zr(){Kl(),!(Ci||typeof document>"u")&&(document.addEventListener($n.requestAdd,Ql),Ci=!0)}function Jn(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),r=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:r}}function xs(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=Jn();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const r=document.getElementById("equipment-barcode"),i=document.getElementById("equipment-description"),c=t==="package";r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),Hc(t),t==="package"&&Ka()}function Ka(){const{packageSelect:e,packageHint:t}=Jn();if(!e)return;const n=nr();Pr=n,jc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,r=n.map(c=>{const l=Number.isFinite(Number(c.price))?Number(c.price):0,d=h(l.toFixed(2)),u=`${c.name} — ${d} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${r}`,e.selectedIndex=0;const i=n.length>0;e.disabled=!i,t&&(i?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),Vr()}function Gl(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:r,blockingPackages:i})=>{const c=r?.desc||h(String(r?.barcode??r?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(i)&&i.length){const l=i.map(d=>d.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${l})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function Or(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const r=Un(e);if(!r)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const i=Fl(r);if(!i)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(m=>m?.type==="package"&&Un(m.packageId)===r))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(Bc(r,n,a,s)){const m=i.name||r;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${m} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(i.items)&&i.items.length?i.items:Ms(i.raw??{}),l=ii(t),d=[],u=new Set;if(c.forEach(m=>{const p=se(m?.normalizedBarcode??m?.barcode);if(p){if(u.has(p)){d.push({item:m,type:"internal"});return}u.add(p),l.has(p)&&d.push({item:m,type:"external"})}}),d.length){const m=d.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>h(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:d.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",m):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",m),duplicates:d}}const b=[];return c.forEach(m=>{const p=se(m?.normalizedBarcode??m?.barcode);if(p&&qt(p,n,a,s)){const g=zs(p,n,a,s);b.push({item:m,blockingPackages:g})}}),b.length?{success:!1,reason:"item_conflict",message:Gl(i,b),conflicts:b}:{success:!0,package:{id:`package::${r}`,packageId:r,type:"package",desc:i.name||`Package ${r}`,qty:1,price:Number.isFinite(Number(i.price))?Number(i.price):0,barcode:i.code||i.raw?.package_code||`pkg-${r}`,packageItems:c.map(m=>({equipmentId:m?.equipmentId??null,barcode:m?.barcode??m?.normalizedBarcode??"",normalizedBarcode:se(m?.normalizedBarcode??m?.barcode),desc:m?.desc??"",qty:Number.isFinite(Number(m?.qty))?Number(m.qty):1,price:Number.isFinite(Number(m?.price))?Number(m.price):0})),image:c.find(m=>m?.image)?.image??null},packageInfo:i}}function Hr(e,{silent:t=!1}={}){const n=Un(e);if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=fn(),r=St(),i=Or(n,{existingItems:r,start:a,end:s});if(!i.success){if(!t){const l={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[i.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");E(i.message||l)}return i}return ja(i.package),Ct(),ve(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:i.package}}function Vr(){const{packageSelect:e}=Jn();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;Hr(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function Wl(){const{packageAddButton:e,packageSelect:t}=Jn();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}Hr(n)}),e.dataset.listenerAttached="true")}function Ur(){const{modeRadios:e}=Jn();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&xs(s.target.value)}),a.dataset.listenerAttached="true")}),Wl(),Vr();const t=ya(),n=e.find(a=>a.value===t);n&&(n.checked=!0),xs(t)}function Ct(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=St(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),l=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=kn(n);t.innerHTML=d.map(u=>{const b=u.items[0]||{},y=mn(b)||u.image,m=y?`<img src="${y}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',p=h(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,v=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,I=`${h(g.toFixed(2))} ${s}`,q=`${h(v.toFixed(2))} ${s}`,_=u.items.some(x=>x?.type==="package"),A=u.barcodes.map(x=>h(String(x||""))).filter(Boolean),U=A.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${A.map(x=>`<li>${x}</li>`).join("")}
            </ul>
          </details>`:"";let S="";if(_){const x=new Map;if(u.items.forEach(C=>{Array.isArray(C?.packageItems)&&C.packageItems.forEach(T=>{if(!T)return;const X=se(T.barcode||T.desc||Math.random()),k=x.get(X);if(k){k.qty+=Number.isFinite(Number(T.qty))?Number(T.qty):1;return}x.set(X,{desc:T.desc||T.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(T.qty))?Number(T.qty):1,barcode:T.barcode??T.normalizedBarcode??""})})}),x.size){const C=Array.from(x.values()).map(T=>{const X=h(String(T.qty)),k=T.desc||h(String(T.barcode||"")),F=T.barcode?` <span class="reservation-package-items__barcode">(${h(String(T.barcode))})</span>`:"";return`<li>${k}${F} × ${X}</li>`}).join("");S=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${C}
              </ul>
            </details>
          `}}return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${m}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${_?`${S||""}${U||""}`:U}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${c}" ${_?"disabled":""}>−</button>
              <span class="reservation-qty-value">${p}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${i}" ${_?"disabled":""}>+</button>
            </div>
          </td>
          <td>${I}</td>
          <td>${q}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${l}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function Xl(e){const t=St(),a=kn(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Mc(s),Ct(),ve())}function Jl(e){const t=St(),n=t.filter(a=>Ba(a)!==e);n.length!==t.length&&(rr(n),Ct(),ve())}function Yl(e){const t=St(),a=kn(t).find(b=>b.key===e);if(!a)return;const{start:s,end:r}=fn();if(!s||!r){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(b=>se(b.barcode))),{equipment:c=[]}=fe(),l=(c||[]).find(b=>{const y=se(b?.barcode);return!y||i.has(y)||Ba({desc:b?.desc||b?.description||b?.name||"",price:Number(b?.price)||0})!==e||!vr(b)?!1:!qt(y,s,r)});if(!l){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=se(l.barcode),u=un(l);if(!u){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}ja({id:u,equipmentId:u,barcode:d,desc:l.desc||l.description||l.name||a.description||"",qty:1,price:Number.isFinite(Number(l.price))?Number(l.price):a.unitPrice,image:mn(l)}),Ct(),ve()}function ve(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),l=c?.value||"unpaid",{start:d,end:u}=fn();i&&ut();const b=xn(),y=document.getElementById("res-payment-progress-type"),m=document.getElementById("res-payment-progress-value"),p=Cr(y),g=Lr(m);ar(),Ii({selectedItems:St(),discount:n,discountType:s,applyTax:i,paidStatus:l,paymentProgressType:p,paymentProgressValue:g,start:d,end:u,companySharePercent:b,paymentHistory:[]});const v=Ii.lastResult;v?(Nr(m,v.paymentProgressValue),c&&(c.value=v.paymentStatus,at(c,v.paymentStatus))):at(c,l)}function Zl(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=h(c.target.value),ve()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",ve),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(nt()){n.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}ws("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(nt()){a.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}ws("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(nt()){s.value="unpaid",at(s,"unpaid"),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}at(s),ve()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(nt()){r.value="percent",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",ve()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(nt()){i.value="",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=h(c.target.value),ve()}),i.dataset.listenerAttached="true"),ve()}function ed(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){ve();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),ve()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Di(){const{input:e,hidden:t}=ei(),{input:n,hidden:a}=pn(),{customers:s}=fe();let r=t?.value?String(t.value):"";if(!r&&e?.value){const Q=Ss(e.value,{allowPartial:!0});Q&&(r=String(Q.id),t&&(t.value=r),e.value=Q.label,e.dataset.selectedId=r)}const i=s.find(Q=>String(Q.id)===r);if(!i){E(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let l=a?.value?String(a.value):"";if(!l&&n?.value){const Q=Es(n.value,{allowPartial:!0});Q&&(l=String(Q.id),a&&(a.value=l),n.value=Q.label,n.dataset.selectedId=l)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,b=document.getElementById("res-start-time")?.value||"00:00",y=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${d}T${b}`,p=`${u}T${y}`,g=new Date(m),v=new Date(p);if(Number.isNaN(g.getTime())||Number.isNaN(v.getTime())||g>=v){E(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const I=ar();I.map(Q=>Q.technicianId).filter(Boolean);const q=St();if(q.length===0&&I.length===0){E(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const _=document.getElementById("res-notes")?.value||"",A=parseFloat(h(document.getElementById("res-discount")?.value))||0,U=document.getElementById("res-discount-type")?.value||"percent",S=document.getElementById("res-payment-status"),x=S?.value||"unpaid",C=document.getElementById("res-payment-progress-type"),T=document.getElementById("res-payment-progress-value"),X=Cr(C),k=Lr(T),F=l?ni(l):null,ee=Ml(F);if(l&&!F){E(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const Q of q){const re=$t(Q.barcode);if(re==="maintenance"||re==="retired"){E(ln(re));return}}for(const Q of q){const re=se(Q.barcode);if(qt(re,m,p)){E(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const Q of I)if(Q?.technicianId&&or(Q.technicianId,m,p)){E(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const L=document.getElementById("res-tax"),B=document.getElementById("res-company-share"),$=!!l;$?(L&&(L.checked=!1,L.disabled=!0,L.classList.add("disabled"),L.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),B&&(B.checked=!1,B.disabled=!0,B.classList.add("disabled"),B.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),S&&(S.value="unpaid",S.disabled=!0,at(S,"unpaid"),S.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),C&&(C.disabled=!0,C.classList.add("disabled")),T&&(T.value="",T.disabled=!0,T.classList.add("disabled"))):(L&&(L.disabled=!1,L.classList.remove("disabled"),L.title=""),B&&(B.disabled=!1,B.classList.remove("disabled"),B.title=""),S&&(S.disabled=!1,S.title=""),C&&(C.disabled=!1,C.classList.remove("disabled")),T&&(T.disabled=!1,T.classList.remove("disabled")));const K=$?!1:L?.checked||!1,G=!!B?.checked;if(!$&&G!==K){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let R=G?xn():null;G&&(!Number.isFinite(R)||R<=0)&&(ut(),R=xn());const Y=G&&K&&Number.isFinite(R)&&R>0;K&&ut();const j=Hs(q,A,U,K,I,{start:m,end:p,companySharePercent:Y?R:0}),H=Nc(),D=Vs({totalAmount:j,progressType:X,progressValue:k,history:[]});T&&Nr(T,D.paymentProgressValue);const te=[];D.paymentProgressValue!=null&&D.paymentProgressValue>0&&te.push({type:D.paymentProgressType||X,value:D.paymentProgressValue,amount:D.paidAmount,percentage:D.paidPercent,recordedAt:new Date().toISOString()});const ue=Us({manualStatus:x,paidAmount:D.paidAmount,paidPercent:D.paidPercent,totalAmount:j});S&&(S.value=ue,at(S,ue));const ye=typeof F?.paymentStatus=="string"?F.paymentStatus.toLowerCase():null,we=ye&&["paid","partial","unpaid"].includes(ye)?ye:"unpaid",qe=cr({reservationCode:H,customerId:c,start:m,end:p,status:ee?"confirmed":"pending",title:null,location:null,notes:_,projectId:l||null,totalAmount:j,discount:$?0:A,discountType:$?"percent":U,applyTax:K,paidStatus:$?we:ue,confirmed:ee,items:q.map(Q=>({...Q,equipmentId:Q.equipmentId??Q.id})),crewAssignments:I,companySharePercent:$||!Y?null:R,companyShareEnabled:$?!1:Y,paidAmount:$?0:D.paidAmount,paidPercentage:$?0:D.paidPercent,paymentProgressType:$?null:D.paymentProgressType,paymentProgressValue:$?null:D.paymentProgressValue,paymentHistory:$?[]:te});try{$i("about to submit",{crewAssignments:I,techniciansPayload:qe?.technicians,payload:qe});const Q=await zc(qe);$i("server response",{reservation:Q?.id??Q?.reservationId??Q?.reservation_code,technicians:Q?.technicians,crewAssignments:Q?.crewAssignments,techniciansDetails:Q?.techniciansDetails}),Cn(),Ot(),sn(),ad(),E(o("reservations.toast.created","✅ تم إنشاء الحجز"));try{const re=document.getElementById("sub-tab-trigger-my-reservations-tab");re&&typeof re.click=="function"&&setTimeout(()=>re.click(),0)}catch{}typeof hs=="function"&&hs({type:"created",reservation:Q}),td(Q)}catch(Q){console.error("❌ [reservations/createForm] Failed to create reservation",Q);const re=Da(Q)?Q.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");E(re,"error"),$&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),Rn({clearValue:!1}))}}function td(e){if(!da)return;const{draftStorageKey:t=Ir,returnUrl:n=_r}=da,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}da=null,n&&(window.location.href=n)}function Rn({clearValue:e=!1}={}){const{input:t,hidden:n}=pn();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,zt())}function nd(e,t=""){const{input:n,hidden:a}=pn();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),zt())}function ad(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),kt({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),Rn({clearValue:!1}),In({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",at(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),Oc(),rr([]),ha("form-reset"),Ct(),zt(),ve()}function sd(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){Xl(s);return}if(a==="increase-group"&&s){Yl(s);return}if(a==="remove-group"&&s){Jl(s);return}}),e.dataset.listenerAttached="true")}function id(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(ya()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,Mr(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||ya()!=="single")return;const{start:r,end:i}=fn();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function rd(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Di()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Di()}),t.dataset.listenerAttached="true")}function km({onAfterSubmit:e}={}){hs=typeof e=="function"?e:null;const{customers:t,projects:n}=fe();Rc(t||[]),kt(),si(),jr(n||[]),Dr({projectsList:n}),ai(),Ot(),Ka(),Ul(),zr(),Ur(),ed(),Zl(),sd(),id(),rd(),zl(),ve(),Ct()}function Kr(){Ot(),Ka(),Dr(),kt(),si(),ai(),zr(),Ur(),Ct(),ve()}if(typeof document<"u"){const e=()=>{kt(),In({projectsList:ti()}),si(),ai(),ve()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{Ot()}),document.addEventListener("packages:changed",()=>{Ka(),ya()==="package"&&xs("package")})}typeof window<"u"&&(window.getCompanySharePercent=xn);function Qr(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:Jt(t),endDate:Jt(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:Jt(n),endDate:Jt(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Jt(n),endDate:Jt(a)}}return e==="upcoming"?{startDate:Jt(t),endDate:""}:{startDate:"",endDate:""}}function od(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=h(t?.value||"").trim(),i=h(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),_a(t),_a(n),r="",i=""),!r&&!i&&c){const d=Qr(c);r=d.startDate,i=d.endDate}return{searchTerm:Ye(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function Pm(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{cd(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),_a(a),_a(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function cd(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=Qr(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function Jt(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function _a(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function ra(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function ld(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function dd(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=ld(n);if(a!==null)return a}return null}function Fi(e,t=0){const n=dd(e);if(n!=null)return n;const a=ra(e.createdAt??e.created_at);if(a!=null)return a;const s=ra(e.updatedAt??e.updated_at);if(s!=null)return s;const r=ra(e.start);if(r!=null)return r;const i=ra(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function ud({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((q,_)=>({reservation:q,index:_})),i=t.searchTerm||"",c=t.searchReservationId||"",l=t.searchCustomerName||"",d=t.searchProjectId||"",u=t.startDate||"",b=t.endDate||"",y=t.status||"",m=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,p=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,v=b?new Date(`${b}T23:59:59`):null,I=r.filter(({reservation:q})=>{const _=n.get(String(q.customerId)),A=s?.get?.(String(q.projectId)),U=q.start?new Date(q.start):null,S=Ks(q),{effectiveConfirmed:x}=Ht(q,A);if(m!=null&&String(q.customerId)!==String(m)||p!=null&&!(Array.isArray(q.technicians)?q.technicians.map(F=>String(F)):[]).includes(String(p))||y==="confirmed"&&!x||y==="pending"&&x||y==="completed"&&!S)return!1;if(y==="cancelled"){const k=String(q?.status||q?.reservationStatus||"").toLowerCase();if(!["cancelled","canceled"].includes(k))return!1}if(g&&U&&U<g||v&&U&&U>v)return!1;if(c){const k=[q.reservationId,q.id,q.reservation_id,q.reservationCode,q.reservation_code,q.code,q.reference,q.referenceNumber,q.reference_number],F=Ye(k.filter(L=>L!=null&&L!=="").map(String).join(" ")).replace(/\s+/g,""),ee=c.replace(/\s+/g,"");if(!F.includes(ee))return!1}if(l&&!Ye(_?.customerName||"").includes(l))return!1;if(d){const k=[q.projectId,q.project_id,q.projectID,A?.id,A?.projectCode,A?.project_code],F=Ye(k.filter(L=>L!=null&&L!=="").map(String).join(" ")).replace(/\s+/g,""),ee=d.replace(/\s+/g,"");if(!F.includes(ee))return!1}if(!i)return!0;const C=q.items?.map?.(k=>`${k.barcode} ${k.desc}`).join(" ")||"",T=(q.technicians||[]).map(k=>a.get(String(k))?.name).filter(Boolean).join(" ");return Ye([q.reservationId,_?.customerName,q.notes,C,T,A?.title].filter(Boolean).join(" ")).includes(i)});return I.sort((q,_)=>{const A=Fi(q.reservation,q.index),U=Fi(_.reservation,_.index);return A!==U?U-A:_.index-q.index}),I}function md({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),l=o("reservations.list.itemsCountShort","{count} عنصر"),d=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),b=o("reservations.list.status.pending","⏳ غير مؤكد"),y=o("reservations.list.status.completed","📁 منتهي"),m=o("reservations.list.payment.paid","💳 مدفوع"),p=o("reservations.list.payment.unpaid","💳 غير مدفوع"),g=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),v=o("reservations.list.actions.confirm","✔️ تأكيد"),I=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),q=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),_={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:A,index:U})=>{const S=t.get(String(A.customerId)),x=A.projectId?a?.get?.(String(A.projectId)):null,C=Ks(A),T=typeof x?.paymentStatus=="string"?x.paymentStatus.toLowerCase():null,X=A.paidStatus??A.paid_status??(A.paid===!0||A.paid==="paid"?"paid":"unpaid"),k=T&&["paid","partial","unpaid"].includes(T)?T:X,F=k==="paid",ee=k==="partial",{effectiveConfirmed:L,projectLinked:B}=Ht(A,x),$=L?"status-confirmed":"status-pending",K=F?"status-paid":ee?"status-partial":"status-unpaid";let G=`<span class="reservation-chip status-chip ${$}">${L?u:b}</span>`;const R=F?m:ee?g:p;let Y=`<span class="reservation-chip status-chip ${K}">${R}</span>`,j=F?" tile-paid":ee?" tile-partial":" tile-unpaid";C&&(j+=" tile-completed");let H="";C&&(G=`<span class="reservation-chip status-chip status-completed">${y}</span>`,Y=`<span class="reservation-chip status-chip status-completed">${R}</span>`,H=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);let D=!B&&!L?`<button class="tile-confirm" data-reservation-index="${U}" data-action="confirm">${v}</button>`:"";{const O=String(A?.status||A?.reservationStatus||"").toLowerCase();(O==="cancelled"||O==="canceled")&&(G=`<span class="reservation-chip status-chip status-cancelled">${o("reservations.list.status.cancelled","❌ ملغي")}</span>`,j=" tile-cancelled",H="",typeof D<"u"&&(D=""))}const te=D?`<div class="tile-actions">${D}</div>`:"",ue=A.items?.length||0,ye=Array.isArray(A.crewAssignments)?A.crewAssignments:[],we=(A.technicians||[]).map(O=>n.get(String(O))).filter(Boolean),qe=ye.length?ye.map(O=>{const P=O.positionLabel??O.position_name??O.role??o("reservations.crew.positionFallback","منصب بدون اسم"),J=O.technicianName??n.get(String(O.technicianId??""))?.name??null;return J?`${h(P)} (${h(J)})`:h(P)}):we.map(O=>O.name),Q=qe.length?qe.join(d):"—",re=h(String(A.reservationId??"")),be=A.start?h(st(A.start)):"-",He=A.end?h(st(A.end)):"-",Qe=h(String(A.cost??0)),W=h(String(ue)),oe=A.notes?h(A.notes):c,le=l.replace("{count}",W),Ae=A.applyTax?`<small>${r}</small>`:"";let je=I;return A.projectId&&(je=x?.title?h(x.title):q),`
      <div class="${D?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${j}"${H} data-reservation-index="${U}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${re}</div>
          <div class="tile-badges">
            ${G}
            ${Y}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${_.client}</span>
            <span class="tile-value">${S?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${_.project}</span>
            <span class="tile-value">${je}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${_.start}</span>
            <span class="tile-value tile-inline">${be}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${_.end}</span>
            <span class="tile-value tile-inline">${He}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${_.cost}</span>
            <span class="tile-value">${Qe} ${s} ${Ae}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${_.equipment}</span>
            <span class="tile-value">${le}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${_.crew}</span>
            <span class="tile-value">${qe.length?Q:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${oe}</span>
          </div>
        </div>
        ${te}
      </div>
    `}).join("")}function Je(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ls(e){if(e==null)return"";const t=String(e).trim();return t?h(t):""}function Ri(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=Ht(e,s),c=e.paid===!0||e.paid==="paid",l=Ks(e),d=e.items||[];let{groups:u}=Qs(e);const b=f=>!!(f&&typeof f=="object"&&(f.type==="package"||Array.isArray(f.packageItems)&&f.packageItems.length||Array.isArray(f.items)&&f.items.some(z=>z&&z.type==="package"))),y=f=>{const z=(f?.package_code??f?.packageDisplayCode??f?.barcode??f?.description??(Array.isArray(f?.items)&&f.items[0]?.barcode)??"").toString().trim().toLowerCase();return h(z)},m=(f,z)=>{const ne=Ie=>{const Te=Array.isArray(Ie?.items)?Ie.items[0]:null,$e=[Te?.price,Te?.unit_price,Te?.unitPrice,Ie?.unitPrice,Ie?.totalPrice];for(const Tt of $e){const ze=De(Tt);if(Number.isFinite(ze)&&ze>0)return ze}return 0},ge=ne(f),Se=ne(z);return ge&&Se?ge<=Se?f:z:ge?f:z},p=[],g=new Map;u.forEach(f=>{if(!b(f)){p.push(f);return}const z=y(f);if(!z){if(!g.has("__unknown__"))g.set("__unknown__",p.length),p.push(f);else{const ne=g.get("__unknown__");p[ne]=m(p[ne],f)}return}if(!g.has(z))g.set(z,p.length),p.push(f);else{const ne=g.get(z);p[ne]=m(p[ne],f)}}),u=p;const{technicians:v=[]}=fe(),I=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(v)?v:[]),q=new Map;I.forEach(f=>{if(!f||f.id==null)return;const z=String(f.id),ne=q.get(z)||{};q.set(z,{...ne,...f})});const A=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(f=>({technicianId:f}))).map((f,z)=>{const ne=f?.technicianId!=null?q.get(String(f.technicianId)):null;let ge=f.positionLabel??f.position_name??f.position_label??f.role??f.position??"";(!ge||ge.trim()==="")&&(ge=f.positionLabelAr??f.position_label_ar??f.positionLabelEn??f.position_label_en??f.position_name_ar??f.position_name_en??"");const Se=f.positionLabelAlt??f.position_label_alt??f.positionLabelEn??f.position_label_en??f.positionLabelAr??f.position_label_ar??"";let Ie=ge,Te=Se;if(!Ie||Ie.trim()==="")try{const ze=Bt?Bt():[];let ae=null;if(f.positionId!=null&&(ae=ze.find(Ce=>String(Ce.id)===String(f.positionId))||null),!ae){const Ce=f.positionKey??f.position_key??f.positionName??f.position_name??f.position??"";if(Ce&&(ae=typeof ba=="function"?ba(Ce):null,!ae&&ze.length)){const ot=String(Ce).trim().toLowerCase();ae=ze.find(ct=>[ct.name,ct.labelAr,ct.labelEn].filter(Boolean).map(jt=>String(jt).toLowerCase()).includes(ot))||null}}ae&&(Ie=ae.labelAr||ae.labelEn||ae.name||"",(!Te||String(Te).trim()==="")&&(ae.labelAr&&ae.labelEn?Te=Ie===ae.labelAr?ae.labelEn:ae.labelAr:Te=ae.labelAr||ae.labelEn||""))}catch{}const $e=Ee(De(f.positionCost??f.position_cost??f.cost??f.daily_wage??f.dailyWage??ne?.dailyWage??ne?.wage??0)),Tt=Ee(De(f.positionClientPrice??f.position_client_price??f.client_price??f.clientPrice??f.daily_total??f.dailyTotal??f.total??ne?.dailyTotal??ne?.total??ne?.total_wage??0));return{assignmentId:f.assignmentId??f.assignment_id??`crew-${z}`,positionId:f.positionId??f.position_id??null,positionKey:f.positionKey??f.position_key??f.positionName??f.position_name??f.position??null,positionLabel:Ie,positionLabelAlt:Te,positionLabelAr:f.positionLabelAr??f.position_label_ar??null,positionLabelEn:f.positionLabelEn??f.position_label_en??null,positionCost:$e,positionClientPrice:Tt,technicianId:f.technicianId!=null?String(f.technicianId):ne?.id!=null?String(ne.id):null,technicianName:f.technicianName??f.technician_name??ne?.name??null,technicianRole:f.technicianRole??ne?.role??null,technicianPhone:f.technicianPhone??ne?.phone??null,notes:f.notes??null}}),U=dn(),S=Fa(e.start,e.end),x=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,C=De(x),T=Number.isFinite(C)?C:0,X=e.discountType??e.discount_type??e.discountMode??"percent",k=String(X).toLowerCase()==="amount"?"amount":"percent",F=r?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),ee=De(e.cost??e.total??e.finalTotal),L=Number.isFinite(ee),B=L?Ee(ee):0,$=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,K=$!=null?De($):Number.NaN,Y=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(K)&&K>0)&&Number.isFinite(K)?K:0,j=dr({items:d,technicianIds:e.technicians||[],crewAssignments:A,discount:T,discountType:k,applyTax:F,start:e.start,end:e.end,companySharePercent:Y}),H=Ee(j.equipmentTotal),D=Ee(j.crewTotal);Ee(j.crewCostTotal);const te=Ee(j.discountAmount),ue=Ee(j.subtotalAfterDiscount),ye=Number.isFinite(j.companySharePercent)?j.companySharePercent:0;let we=Ee(j.companyShareAmount);we=ye>0?Ee(Math.max(0,we)):0;const qe=Ee(j.taxAmount),Q=Ee(j.finalTotal),re=r?Q:L?B:Q,be=Ee(j.netProfit),He=h(String(e.reservationId??e.id??"")),Qe=e.start?h(st(e.start)):"-",W=e.end?h(st(e.end)):"-",oe=h(String(A.length)),le=h(H.toFixed(2)),Ae=h(te.toFixed(2)),je=h(ue.toFixed(2)),pt=h(qe.toFixed(2)),O=h((Number.isFinite(re)?re:0).toFixed(2)),P=h(String(S)),J=o("reservations.create.summary.currency","SR"),V=o("reservations.details.labels.discount","الخصم"),ce=o("reservations.details.labels.tax","الضريبة (15%)"),pe=o("reservations.details.labels.crewTotal","إجمالي الفريق"),Pe=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),Me=o("reservations.details.labels.duration","عدد الأيام"),Ge=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),Ne=o("reservations.details.labels.netProfit","💵 صافي الربح"),wt=o("reservations.create.equipment.imageAlt","صورة"),Oe={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},Lt=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),M=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");o("reservations.details.technicians.roleUnknown","غير محدد");const ie=o("reservations.details.technicians.phoneUnknown","غير متوفر");o("reservations.details.technicians.wage","{amount} {currency} / اليوم");const xe=o("reservations.list.status.confirmed","✅ مؤكد"),Ve=o("reservations.list.status.pending","⏳ غير مؤكد"),et=o("reservations.list.payment.paid","💳 مدفوع"),Qt=o("reservations.list.payment.unpaid","💳 غير مدفوع"),ft=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),ea=o("reservations.list.status.completed","📁 منتهي"),ta=o("reservations.details.labels.id","🆔 رقم الحجز"),es=o("reservations.details.section.bookingInfo","بيانات الحجز"),bn=o("reservations.details.section.paymentSummary","ملخص الدفع"),Be=o("reservations.details.labels.finalTotal","المجموع النهائي"),We=o("reservations.details.section.crew","😎 الفريق الفني"),Gt=o("reservations.details.crew.count","{count} عضو"),At=o("reservations.details.section.items","📦 المعدات المرتبطة"),na=o("reservations.details.items.count","{count} عنصر"),Go=o("reservations.details.actions.edit","✏️ تعديل"),Wo=o("reservations.details.actions.delete","🗑️ حذف"),Xo=o("reservations.details.labels.customer","العميل"),Jo=o("reservations.details.labels.contact","رقم التواصل"),Yo=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Zo=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),ec=o("reservations.details.actions.openProject","📁 فتح المشروع"),tc=o("reservations.details.labels.start","بداية الحجز"),nc=o("reservations.details.labels.end","نهاية الحجز"),ac=o("reservations.details.labels.notes","ملاحظات"),sc=o("reservations.list.noNotes","لا توجد ملاحظات"),ic=o("reservations.details.labels.itemsCount","عدد المعدات"),rc=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),oc=o("reservations.paymentHistory.title","سجل الدفعات"),cc=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),lc=o("reservations.list.unknownCustomer","غير معروف"),ts=typeof s?.paymentStatus=="string"?s.paymentStatus.toLowerCase():null,aa=r&&ts&&["paid","partial","unpaid"].includes(ts)?ts:e.paidStatus??e.paid_status??(c?"paid":"unpaid"),ns=aa==="partial",qi=aa==="paid"?et:ns?ft:Qt;function as(f){if(f==null)return Number.NaN;if(typeof f=="number")return Number.isFinite(f)?f:Number.NaN;const z=String(f).replace(/[^0-9.+-]/g,""),ne=Number(z);return Number.isFinite(ne)?ne:Number.NaN}const sa=(f={})=>{const z=String(f.type??f.kind??f.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(z)||Array.isArray(f.packageItems)&&f.packageItems.length)},dc=(f={})=>[f.packageId,f.package_id,f.packageCode,f.package_code,f.bundleId,f.bundle_id].some(z=>z!=null&&z!==""),uc=(f={})=>!f||typeof f!="object"?!1:!sa(f)&&dc(f),mc=(f={})=>{const z=sa(f),ne=[{value:f.qty,key:"qty",limit:999},{value:f.quantity,key:"quantity",limit:999},{value:f.units,key:"units",limit:999},{value:f.count,key:"count",limit:50},{value:f.package_quantity,key:"package_quantity",limit:999},{value:f.packageQty,key:"packageQty",limit:999},{value:f.packageCount,key:"packageCount",limit:999}];let ge=NaN;for(const Se of ne){if(Se.value==null||Se.value==="")continue;const Ie=typeof Se.value=="string"?Se.value.trim():String(Se.value??"");if(Se.key==="count"&&Ie.length>6)continue;const Te=as(Se.value);if(!Number.isFinite(Te)||Te<=0)continue;const $e=Math.round(Te);if(!($e>Se.limit)){ge=Math.max(1,$e);break}}return(!Number.isFinite(ge)||ge<=0)&&(ge=1),z?Math.max(1,Math.min(99,ge)):Math.max(1,Math.min(9999,ge))};let gn=(Array.isArray(d)?d:[]).filter(f=>f&&typeof f=="object"&&!uc(f)).reduce((f,z)=>f+mc(z),0);(!Number.isFinite(gn)||gn<=0)&&(gn=Array.isArray(u)&&u.length?u.length:(Array.isArray(d)?d.length:0)||1),gn=Math.max(1,Math.round(gn));const pc=h(String(gn)),Si=na.replace("{count}",pc),fc=Gt.replace("{count}",oe),yc=e.notes?h(e.notes):sc,bc=h(D.toFixed(2)),gc=h(String(ye)),hc=h(we.toFixed(2)),vc=`${gc}% (${hc} ${J})`,qc=Number.isFinite(be)?Math.max(0,be):0,Sc=h(qc.toFixed(2)),Nt=[{icon:"💼",label:rc,value:`${le} ${J}`}];Nt.push({icon:"😎",label:pe,value:`${bc} ${J}`}),te>0&&Nt.push({icon:"💸",label:V,value:`${Ae} ${J}`}),Nt.push({icon:"📊",label:Pe,value:`${je} ${J}`}),F&&qe>0&&Nt.push({icon:"🧾",label:ce,value:`${pt} ${J}`}),ye>0&&Nt.push({icon:"🏦",label:Ge,value:vc}),Nt.push({icon:"💵",label:Ne,value:`${Sc} ${J}`}),Nt.push({icon:"💰",label:Be,value:`${O} ${J}`});const Ec=Nt.map(({icon:f,label:z,value:ne})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${f} ${z}</span>
      <span class="summary-details-value">${ne}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let tt=[];r&&s&&(Array.isArray(s.paymentHistory)?tt=s.paymentHistory:Array.isArray(s.payment_history)?tt=s.payment_history:Array.isArray(s.payments)?tt=s.payments:Array.isArray(s.paymentLogs)&&(tt=s.paymentLogs)),(!Array.isArray(tt)||tt.length===0)&&(Array.isArray(e.paymentHistory)?tt=e.paymentHistory:Array.isArray(e.payment_history)?tt=e.payment_history:Array.isArray(e.paymentLogs)?tt=e.paymentLogs:tt=[]);const Ei=Array.isArray(tt)?tt:[],wc=Ei.length?`<ul class="reservation-payment-history-list">${Ei.map(f=>{const z=f?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):f?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),ne=Number.isFinite(Number(f?.amount))&&Number(f.amount)>0?`${h(Number(f.amount).toFixed(2))} ${J}`:"—",ge=Number.isFinite(Number(f?.percentage))&&Number(f.percentage)>0?`${h(Number(f.percentage).toFixed(2))}%`:"—",Se=f?.recordedAt?h(st(f.recordedAt)):"—",Ie=f?.note?`<div class="payment-history-note">${Je(h(f.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${Je(z)}</span>
              <span class="payment-history-entry__amount">${ne}</span>
              <span class="payment-history-entry__percent">${ge}</span>
              <span class="payment-history-entry__date">${Se}</span>
            </div>
            ${Ie}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${Je(cc)}</div>`,wi=String(e?.status||e?.reservationStatus||"").toLowerCase(),Ai=wi==="cancelled"||wi==="canceled",xi=Ai?[{text:o("reservations.list.status.cancelled","❌ ملغي"),className:"status-cancelled"},{text:qi,className:aa==="paid"?"status-paid":ns?"status-partial":"status-unpaid"}]:[{text:i?xe:Ve,className:i?"status-confirmed":"status-pending"},{text:qi,className:aa==="paid"?"status-paid":ns?"status-partial":"status-unpaid"}];l&&!Ai&&xi.push({text:ea,className:"status-completed"});const Ac=xi.map(({text:f,className:z})=>`<span class="status-chip ${z}">${f}</span>`).join(""),Wt=(f,z,ne)=>`
    <div class="res-info-row">
      <span class="label">${f} ${z}</span>
      <span class="value">${ne}</span>
    </div>
  `;let ss="";if(e.projectId){let f=Je(Zo);if(s){const z=s.title||o("projects.fallback.untitled","مشروع بدون اسم");f=`${Je(z)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${Je(ec)}</button>`}ss=`
      <div class="res-info-row">
        <span class="label">📁 ${Yo}</span>
        <span class="value">${f}</span>
      </div>
    `}const xt=[];xt.push(Wt("👤",Xo,t?.customerName||lc)),xt.push(Wt("📞",Jo,t?.phone||"—")),xt.push(Wt("🗓️",tc,Qe)),xt.push(Wt("🗓️",nc,W)),xt.push(Wt("📦",ic,Si)),xt.push(Wt("⏱️",Me,P)),xt.push(Wt("📝",ac,yc)),ss&&xt.push(ss);const xc=xt.join(""),Ic=u.length?u.map(f=>{const z=f.items[0]||{},ne=mn(z)||f.image,ge=ne?`<img src="${ne}" alt="${wt}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let Se=[];if(Array.isArray(f.packageItems)&&f.packageItems.length)Se=[...f.packageItems];else{const he=[];f.items.forEach(_e=>{Array.isArray(_e?.packageItems)&&_e.packageItems.length&&he.push(..._e.packageItems)}),Se=he}if(Array.isArray(Se)&&Se.length>1){const he=new Set;Se=Se.filter(_e=>{const de=_e?.normalizedBarcode&&String(_e.normalizedBarcode).toLowerCase()||_e?.barcode&&String(_e.barcode).toLowerCase()||(_e?.equipmentId!=null?`id:${_e.equipmentId}`:null);return de?he.has(de)?!1:(he.add(de),!0):!0})}const Ie=sa(f)||f.items.some(he=>sa(he))||Se.length>0,Te=(he,{fallback:_e=1,max:de=1e3}={})=>{const ke=as(he);return Number.isFinite(ke)&&ke>0?Math.min(de,ke):_e};let $e;if(Ie){const he=Te(z?.qty??z?.quantity??z?.count,{fallback:NaN,max:999});Number.isFinite(he)&&he>0?$e=he:$e=Te(f.quantity??f.count??1,{fallback:1,max:999})}else $e=Te(f.quantity??f.count??z?.qty??z?.quantity??z?.count??0,{fallback:1,max:9999});const Tt=h(String($e)),ze=(he,{preferPositive:_e=!1}={})=>{let de=Number.NaN;for(const ke of he){const bt=De(ke);if(Number.isFinite(bt)){if(_e&&bt>0)return bt;Number.isFinite(de)||(de=bt)}}return de};let ae,Ce;if(Ie){const he=[z?.price,z?.unit_price,z?.unitPrice,f.unitPrice];if(ae=ze(he,{preferPositive:!0}),!Number.isFinite(ae)||ae<0){const de=De(f.totalPrice??z?.total??z?.total_price);Number.isFinite(de)&&$e>0&&(ae=de/$e)}Number.isFinite(ae)||(ae=0);const _e=[z?.total,z?.total_price,f.totalPrice];if(Ce=ze(_e),!Number.isFinite(Ce))Ce=ae*$e;else{const de=ae*$e;Number.isFinite(de)&&de>0&&Math.abs(Ce-de)>de*.25&&(Ce=de)}}else{const he=[z?.price,z?.unit_price,z?.unitPrice,f.unitPrice];if(ae=ze(he,{preferPositive:!0}),!Number.isFinite(ae)||ae<0){const _e=De(f.totalPrice??z?.total??z?.total_price);Number.isFinite(_e)&&$e>0&&(ae=_e/$e)}Number.isFinite(ae)||(ae=0),Ce=De(f.totalPrice??z?.total??z?.total_price),Number.isFinite(Ce)||(Ce=ae*$e)}ae=Ee(ae),Ce=Ee(Ce);const ot=`${h(ae.toFixed(2))} ${J}`,ct=`${h(Ce.toFixed(2))} ${J}`,jt=f.barcodes.map(he=>h(String(he||""))).filter(Boolean),lt=jt.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${jt.map(he=>`<li>${he}</li>`).join("")}
              </ul>
            </details>`:"";let yt="";if(Se.length){const he=new Map,_e=de=>{const ke=as(de?.qtyPerPackage??de?.perPackageQty??de?.quantityPerPackage);return Number.isFinite(ke)&&ke>0&&ke<=99?Math.round(ke):1};if(Se.forEach(de=>{if(!de)return;const ke=se(de.barcode||de.normalizedBarcode||de.desc||Math.random());if(!ke)return;const bt=he.get(ke),hn=_e(de);if(bt){bt.qty=hn,bt.total=hn;return}he.set(ke,{desc:de.desc||de.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(hn,99)),total:Math.max(1,Math.min(hn,99)),barcode:de.barcode??de.normalizedBarcode??""})}),he.size){const de=Array.from(he.values()).map(ke=>{const bt=h(String(ke.qty>0?Math.min(ke.qty,99):1)),hn=Je(ke.desc||""),Cc=ke.barcode?` <span class="reservation-package-items__barcode">(${Je(h(String(ke.barcode)))})</span>`:"";return`<li>${hn}${Cc} × ${bt}</li>`}).join("");yt=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${de}
                </ul>
              </details>
            `}}const $c=Ie?`${yt||""}${lt||""}`:lt;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${ge}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${Je(z.desc||z.description||z.name||f.description||"-")}</div>
                  ${$c}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Je(Oe.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Tt}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Je(Oe.unitPrice)}">${ot}</td>
            <td class="reservation-modal-items-table__cell" data-label="${Je(Oe.total)}">${ct}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${Je(Oe.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${Lt}</td></tr>`,_c=`
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
        <tbody>${Ic}</tbody>
      </table>
    </div>
  `,kc=A.map((f,z)=>{const ne=h(String(z+1));let ge=f.positionLabel??f.position_name??f.position_label??f.position_title??f.role??f.position??null;if((!ge||ge.trim()==="")&&(ge=f.positionLabelAr??f.position_label_ar??f.position_title_ar??f.positionLabelEn??f.position_label_en??f.position_name_ar??f.position_title_en??f.position_name_en??null),!ge||ge.trim()==="")try{const ot=typeof Bt=="function"?Bt():[],ct=f.positionId?ot.find(yt=>String(yt.id)===String(f.positionId)):null,jt=!ct&&f.positionKey?ot.find(yt=>String(yt.name).toLowerCase()===String(f.positionKey).toLowerCase()):null,lt=ct||jt||null;lt&&(ge=lt.labelAr||lt.labelEn||lt.name||ge)}catch{}const Se=ls(ge)||o("reservations.crew.positionFallback","منصب بدون اسم"),Ie=ls(f.positionLabelAlt??f.position_label_alt??f.positionLabelEn??f.position_label_en??f.positionLabelAr??f.position_label_ar??f.position_name_en??f.position_name_ar??""),Te=ls(f.technicianName)||o("technicians.picker.noTechnicianOption","— بدون تعيين —"),$e=f.technicianPhone||ie,Tt=Ee(De(f.positionCost??f.position_cost??f.cost??f.daily_wage??f.dailyWage??f.internal_cost??0));let ze=Ee(De(f.positionClientPrice??f.position_client_price??f.client_price??f.customer_price??f.position_price??f.clientPrice??f.daily_total??f.dailyTotal??f.total??0));if(!Number.isFinite(ze)||ze<=0)try{const ot=Bt?Bt():[],ct=f.positionId?ot.find(yt=>String(yt.id)===String(f.positionId)):null,jt=!ct&&f.positionKey?ot.find(yt=>String(yt.name).toLowerCase()===String(f.positionKey).toLowerCase()):null,lt=ct||jt||null;lt&&Number.isFinite(Number(lt.clientPrice))&&(ze=Ee(Number(lt.clientPrice)))}catch{}const ae=`${h(ze.toFixed(2))} ${J}`,Ce=Tt>0?`${h(Tt.toFixed(2))} ${J}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${ne}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${Te}</span>
            <small class="text-muted">🏷️ ${Se}${Ie?` — ${Ie}`:""}</small>
            <small class="text-muted">💼 ${ae}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${$e}</div>
          ${Ce?`<div>💵 ${o("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${Ce}</div>`:""}
        </div>
      </div>
    `}).join(""),Pc=A.length?`<div class="reservation-technicians-grid">${kc}</div>`:`<ul class="reservation-modal-technicians"><li>${M}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${ta}</span>
          <strong>${He}</strong>
        </div>
        <div class="status-chips">
          ${Ac}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${es}</h6>
          ${xc}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${bn}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${Ec}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${oc}</h6>
              ${wc}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${We}</span>
          <span class="count">${fc}</span>
        </div>
        ${Pc}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${At}</span>
          <span class="count">${Si}</span>
        </div>
        ${_c}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${Go}</button>
        ${U?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Wo}</button>`:""}
      </div>
    </div>
  `}const $m="project",Cm="editProject",Lm=3600*1e3,Gr=.15,Nm=6,Tm="projectsTab",jm="projectsSubTab",Bm={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},Dm={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},pd=`@page {
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
`,fd=/color\([^)]*\)/gi,yd=/color-mix\([^)]*\)/gi,bd=/oklab\([^)]*\)/gi,gd=/oklch\([^)]*\)/gi,Rt=/(color\(|color-mix\(|oklab|oklch)/i,hd=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke","boxShadow","textShadow","accentColor","caretColor","columnRuleColor"],vd=typeof document<"u"?document.createElement("canvas"):null,oa=vd?.getContext?.("2d")||null;function Wr(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function Is(e,t="#000"){if(!oa||!e)return t;try{return oa.fillStyle="#000",oa.fillStyle=e,oa.fillStyle||t}catch{return t}}function qd(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&Rt.test(n)){const s=Is(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function qn(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function Xr(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;hd.forEach(c=>{const l=r[c];if(l&&Rt.test(l)){const d=Wr(c);if(qn(n,s,d),c==="boxShadow"||c==="textShadow")s.style.setProperty(d,"none","important");else{const u=c==="backgroundColor"?"#ffffff":r.color||"#000000",b=Is(l,u);s.style.setProperty(d,b,"important")}}});const i=r.backgroundImage;if(i&&Rt.test(i)){const c=Is(r.backgroundColor||"#ffffff","#ffffff");qn(n,s,"background-image"),qn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function Jr(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","boxShadow","textShadow","accentColor","caretColor","columnRuleColor"].forEach(c=>{const l=r[c];if(l&&Rt.test(l)){const d=Wr(c);if(qn(n,s,d),c==="boxShadow"||c==="textShadow")s.style.setProperty(d,"none","important");else{const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(d,u,"important")}}});const i=r.backgroundImage;i&&Rt.test(i)&&(qn(n,s,"background-image"),qn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function Yr(e){if(!e)return;const t=(n="")=>{if(typeof n!="string")return n;let a=n;return Rt.test(a)&&(a=a.replace(fd,"#000").replace(yd,"#000").replace(bd,"#000").replace(gd,"#000")),a};e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&Rt.test(a)&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&Rt.test(a)&&n.setAttribute("style",t(a))})}const Zr="reservations.quote.sequence",Mi={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},eo="https://help.artratio.sa/guide/quote-preview",Re={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Sd=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Ze=[...Sd],Ed=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function _s(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...Ze]}function wd(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=_s(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=_s(t.value);if(a.length)return a}const n=Ze.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...Ze]}const Ad=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],ri=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>{if(e?.isPackage){const t=e?.packageCodeResolved||e?.barcode||"";return w(t||"-")}return w(e?.barcode||"-")}},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>w(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>w(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>w(h(Number(e?.price||0).toFixed(2)))}],oi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(h(String(t+1)))},{id:"position",labelKey:"reservations.details.crew.position",fallback:"المنصب",render:e=>w(h(e?.positionLabel??e?.position_name??e?.role??o("reservations.crew.positionFallback","منصب بدون اسم")))},{id:"price",labelKey:"reservations.details.crew.clientPrice",fallback:"سعر العميل",render:e=>{const t=Number.isFinite(Number(e?.positionClientPrice))?Number(e.positionClientPrice):0;return w(`${h(t.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}}],ks={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:ri.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:oi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},xd=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(h(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>w(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>w(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>w(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],to=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>w(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>w(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>w(e?.note||"-")}],Id=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(h(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>w(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>w(h(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>w(h(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>w(e?.displayCost||"—")}],_d=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],kd={customerInfo:ks.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:ks.payment,projectExpenses:to.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:xd.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:Id.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},ds=new Map;function Qa(e="reservation"){if(ds.has(e))return ds.get(e);const t=e==="project"?_d:Ad,n=e==="project"?kd:ks,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(l=>l.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return ds.set(e,r),r}function Ga(e="reservation"){return Qa(e).sectionDefs}function no(e="reservation"){return Qa(e).fieldDefs}function ao(e="reservation"){return Qa(e).sectionIdSet}function so(e="reservation"){return Qa(e).fieldIdMap}function io(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const Pd="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",$d="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",Cd="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",ro=pd.trim(),oo=/^data:image\/svg\+xml/i,Ld=/\.svg($|[?#])/i,Fn=512,Ps="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",co=96,lo=25.4,$s=210,ua=297,ma=Math.round($s/lo*co),pa=Math.round(ua/lo*co),Nd=2,uo=/safari/i,Td=/(iphone|ipad|ipod)/i,zi=/(iphone|ipad|ipod)/i,jd=/(crios|fxios|edgios|opios)/i,ka="[reservations/pdf]";let Z=null,N=null,ht=1,jn=null,Bn=null,Ft=null,Sn=null,Mn=!1;function nn(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!Z?.statusIndicator||!Z?.statusText)return;Z.statusKind=e;const r=t||io(e);Z.statusText.textContent=r,Z.statusSpinner&&(Z.statusSpinner.hidden=!s),Z.statusAction&&(Z.statusAction.hidden=!0,Z.statusAction.onclick=null,n&&typeof a=="function"&&(Z.statusAction.textContent=n,Z.statusAction.hidden=!1,Z.statusAction.onclick=i=>{i.preventDefault(),a()})),Z.statusIndicator.hidden=!1,requestAnimationFrame(()=>{Z.statusIndicator.classList.add("is-visible")})}function En(e){try{return String(e||"").toLowerCase().normalize("NFKD").replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,"").replace(/\s+/g," ").trim()}catch{return String(e||"").trim().toLowerCase()}}function zn(e){!Z?.statusIndicator||!Z?.statusText||(Z.statusKind=null,Z.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{Z?.statusIndicator&&(Z.statusIndicator.hidden=!0,Z.statusAction&&(Z.statusAction.hidden=!0,Z.statusAction.onclick=null),Z.statusSpinner&&(Z.statusSpinner.hidden=!1))},220))}function Cs(){return!!window?.bootstrap?.Modal}function Bd(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),Ft||(Ft=document.createElement("div"),Ft.className="modal-backdrop fade show",Ft.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(Ft)),Sn||(Sn=t=>{t.key==="Escape"&&Ls(e)},document.addEventListener("keydown",Sn));try{e.focus({preventScroll:!0})}catch{}}}function Ls(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),Ft&&(Ft.remove(),Ft=null),Sn&&(document.removeEventListener("keydown",Sn),Sn=null))}function Dd(e){if(e){if(Cs()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}Bd(e)}}function Fd(){if(Mn)return;Mn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!Z?.modal?.classList.contains("show"),s=()=>{Z?.modal?.classList.contains("show")&&(nn("render"),Mn=!1,yn())};tr({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:eo}),a&&nn("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function Wa(e="reservation"){const t={},n=no(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function ci(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function Rd(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function li(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function di(e="reservation"){return Object.fromEntries(Ga(e).map(({id:t})=>[t,!1]))}function ui(e,t){return e.sectionExpansions||(e.sectionExpansions=di(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Md(e,t){return ui(e,t)?.[t]!==!1}function mi(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function zd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Td.test(e)}function Od(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=uo.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function mo(){return zd()&&Od()}function Xa(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=zi.test(e)||zi.test(t),s=/Macintosh/i.test(e)&&n>1;return uo.test(e)&&!jd.test(e)&&(a||s)}function us(e,...t){try{console.log(`${ka} ${e}`,...t)}catch{}}function Pt(e,...t){try{console.warn(`${ka} ${e}`,...t)}catch{}}function Hd(e,t,...n){try{t?console.error(`${ka} ${e}`,t,...n):console.error(`${ka} ${e}`,...n)}catch{}}function Le(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Vd(e,t="لا توجد بيانات للعرض."){const n=w(o(e,t));return Le(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Pa(e,t){return Array.isArray(e)&&e.length?e:[Vd(t)]}const Ud=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function po(e=""){return Ud.test(e)}function Kd(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!po(r))return a.call(this,r,...i);let c,l=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),l=!0)}catch{}try{if(!l){const d=this.canvas;d&&d.style?.direction!=="rtl"&&(d.__artRatioOriginalDirection=d.style.direction,d.style.direction="rtl")}return a.call(this,r,...i)}finally{if(l&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!l){const d=this.canvas;d&&d.__artRatioOriginalDirection!==void 0&&(d.style.direction=d.__artRatioOriginalDirection,delete d.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function Oi(e,t=Fn){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Qd(e){if(!e)return{width:Fn,height:Fn};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?Oi(t,0):0,s=n?Oi(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,l]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(l)&&l>0?l:0)}}return{width:a||Fn,height:s||Fn}}function fo(e=""){return typeof e!="string"?!1:oo.test(e)||Ld.test(e)}function Gd(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Wd(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function yo(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await Wd(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),l=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=l;const d=i.getContext("2d");return d.clearRect(0,0,c,l),d.drawImage(r,0,0,c,l),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function Xd(e){if(!e)return null;if(oo.test(e))return Gd(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Jd(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!fo(t))return!1;const n=await Xd(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",Ps),!1;const a=await yo(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",Ps),!1)}async function Yd(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Qd(e),s=await yo(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||Ps),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),l=e.getAttribute("height");return c&&i.setAttribute("width",c),l&&i.setAttribute("height",l),e.parentNode?.replaceChild(i,e),!!s}async function bo(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{fo(s.getAttribute?.("src"))&&a.push(Jd(s))}),n.forEach(s=>{a.push(Yd(s))}),a.length&&await Promise.allSettled(a)}function Zd(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(R,Y=0)=>{const j=parseFloat(R);return Number.isFinite(j)?j:Y},i=r(s.paddingTop),c=r(s.paddingBottom),l=r(s.paddingRight),d=r(s.paddingLeft),u=r(s.borderRadius),b=r(s.fontSize,14),y=(()=>{const R=s.lineHeight;if(!R||R==="normal")return b*1.6;const Y=r(R,b*1.6);return Y>0?Y:b*1.6})(),m=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(m<=0)return null;const p=Math.max(1,m-d-l),g=e.textContent||"",v=g.split(/\r?\n/),I=n.createElement("canvas"),q=I.getContext("2d");if(!q)return null;const _=s.fontStyle||"normal",A=s.fontVariant||"normal",U=s.fontWeight||"400",S=s.fontFamily||"sans-serif",x=s.fontStretch||"normal",C=R=>R.join(" "),T=[],X=R=>q.measureText(R).width;q.font=`${_} ${A} ${U} ${x} ${b}px ${S}`,v.forEach(R=>{const Y=R.trim();if(Y.length===0){T.push("");return}const j=Y.split(/\s+/);let H=[];j.forEach((D,te)=>{const ue=D.trim();if(!ue)return;const ye=C(H.concat(ue));if(X(ye)<=p||H.length===0){H.push(ue);return}T.push(C(H)),H=[ue]}),H.length&&T.push(C(H))}),T.length||T.push("");const k=i+c+T.length*y,F=Math.ceil(Math.max(1,m)*t),ee=Math.ceil(Math.max(1,k)*t);I.width=F,I.height=ee,I.style.width=`${Math.max(1,m)}px`,I.style.height=`${Math.max(1,k)}px`,q.scale(t,t);const L=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){q.save(),q.beginPath();const R=Math.max(1,m),Y=Math.max(1,k),j=Math.min(u,R/2,Y/2);q.moveTo(j,0),q.lineTo(R-j,0),q.quadraticCurveTo(R,0,R,j),q.lineTo(R,Y-j),q.quadraticCurveTo(R,Y,R-j,Y),q.lineTo(j,Y),q.quadraticCurveTo(0,Y,0,Y-j),q.lineTo(0,j),q.quadraticCurveTo(0,0,j,0),q.closePath(),q.clip()}if(q.fillStyle=L,q.fillRect(0,0,Math.max(1,m),Math.max(1,k)),q.font=`${_} ${A} ${U} ${x} ${b}px ${S}`,q.fillStyle=s.color||"#000000",q.textBaseline="top",q.textAlign="right","direction"in q)try{q.direction="rtl"}catch{}const B=Math.max(0,m-l);let $=i;T.forEach(R=>{const Y=R.length?R:" ";q.fillText(Y,B,$,p),$+=y});const K=n.createElement("img");let G;try{G=I.toDataURL("image/png")}catch(R){return Pt("note canvas toDataURL failed",R),null}return K.src=G,K.alt=g,K.style.width=`${Math.max(1,m)}px`,K.style.height=`${Math.max(1,k)}px`,K.style.display="block",K.setAttribute("data-quote-note-image","true"),{image:K,canvas:I,totalHeight:k,width:m}}function eu(e,{pixelRatio:t=1}={}){if(!e||!Xa())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!po(a.textContent||""))return;let s;try{s=Zd(a,{pixelRatio:t})}catch(r){Pt("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function Ns(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){Hd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),l=o("reservations.quote.toast.retry","إعادة المحاولة"),d=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(nn("export"),Po()):(nn("render"),Mn=!1,yn())};if(tr({message:i,duration:9e3,actionLabel:d?l:void 0,onAction:d?u:void 0,linkLabel:c,linkHref:eo}),Z?.modal?.classList.contains("show")&&nn("error",{message:i,actionLabel:d?l:void 0,onAction:d?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function Ts({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){Pt("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){Pt("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function pi(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function Hi(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function Vi(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function tu(){const e=Vi();return e||(Bn||(Bn=pi($d).catch(t=>{throw Bn=null,t}).then(()=>{const t=Vi();if(!t)throw Bn=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Bn)}async function nu(){const e=Hi();return e||(jn||(jn=pi(Cd).catch(t=>{throw jn=null,t}).then(()=>{const t=Hi();if(!t)throw jn=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),jn)}async function au(){if(window.html2pdf||await pi(Pd),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}qd(),Kd()}function w(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function su(e="reservation"){return e==="project"?"QP":"Q"}function iu(e,t="reservation"){const n=Number(e),a=su(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function ru(){const e=window.localStorage?.getItem?.(Zr),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function go(e="reservation"){const n=ru()+1;return{sequence:n,quoteNumber:iu(n,e)}}function ou(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(Zr,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function ho(e="reservation"){return Mi[e]||Mi.reservation}function cu(e="reservation"){try{const t=ho(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function lu(e,t="reservation"){try{const n=ho(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function du(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function uu(e,t="reservation"){if(!e)return null;const n=ao(t),a=so(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,l])=>{const d=i[c];if(d==null)return;const{ids:u,emptyExplicitly:b}=du(d);if(!u&&!b)return;const y=Array.isArray(u)?u.filter(m=>l.has(m)):[];(y.length>0||b)&&(r[c]=y)}),{version:1,sections:s,fields:r}}function vo(e){if(!e)return;const t=e.context||"reservation",n=uu(e,t);n&&lu(n,t)}function qo(e){if(!e)return;const t=e.context||"reservation",n=cu(t);if(!n)return;const a=ao(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=ci(e.fields||Wa(t)),i=so(t);Object.entries(n.fields).forEach(([c,l])=>{const d=i[c];if(!d)return;const u=Array.isArray(l)?l.filter(b=>d.has(b)):[];r[c]=new Set(u)}),e.fields=r}}function So(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function Eo(e){const t=sn()||[],{technicians:n=[]}=fe(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(i=>{if(!i||i.id==null)return;const c=String(i.id),l=s.get(c)||{};s.set(c,{...l,...i})}),(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(i=>({technicianId:i}))).map((i,c)=>{const l=i?.technicianId!=null?s.get(String(i.technicianId)):null;let d=i.positionLabel??i.position_name??i.position_label??i.role??i.position??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم");(!d||d.trim()==="")&&(d=i.positionLabelAr??i.position_label_ar??i.positionLabelEn??i.position_label_en??i.position_name_ar??i.position_name_en??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم"));try{const y=typeof Bt=="function"?Bt()||[]:[];let m=null;if(i?.positionId!=null&&(m=y.find(p=>String(p?.id)===String(i.positionId))||null),!m){const p=i.positionKey??i.position_key??i.positionName??i.position_name??i.position??"";if(p&&(m=typeof ba=="function"&&ba(p)||null,!m&&y.length)){const g=String(p).trim().toLowerCase();m=y.find(v=>[v.name,v.labelAr,v.labelEn].filter(Boolean).map(I=>String(I).toLowerCase()).includes(g))||null}}if(m){const p=m.labelAr||m.labelEn||m.name||"";p&&p.trim()&&(d=p)}}catch{}const u=Ee(De(i.positionCost??i.position_cost??i.cost??i.daily_wage??i.dailyWage??l?.dailyWage??l?.wage??0)),b=Ee(De(i.positionClientPrice??i.position_client_price??i.client_price??i.clientPrice??i.daily_total??i.dailyTotal??i.total??l?.dailyTotal??l?.total??l?.total_wage??0));return{assignmentId:i.assignmentId??i.assignment_id??`crew-${c}`,positionId:i.positionId??i.position_id??null,positionLabel:d,positionLabelAlt:i.positionLabelAlt??i.position_label_alt??"",positionCost:u,positionClientPrice:b,technicianId:i.technicianId!=null?String(i.technicianId):l?.id!=null?String(l.id):null,technicianName:i.technicianName??i.technician_name??l?.name??null,technicianRole:i.technicianRole??l?.role??null}})}function mu(e,t,n){const{projectLinked:a}=Ht(e,n);Fa(e.start,e.end);const s=e.discount??e.discountValue??0,r=Number(h(String(s)))||0,i=e.discountType??e.discount_type??"percent",c=String(i).toLowerCase()==="amount"?"amount":"percent",l=a?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),d=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,u=d!=null?De(d):Number.NaN,y=(e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied)===!0&&Number.isFinite(u)&&u>0?u:null,m=Array.isArray(t)?t.map(A=>A?.technicianId).filter(Boolean):[],p=dr({items:Array.isArray(e.items)?e.items:[],technicianIds:m,crewAssignments:Array.isArray(t)?t:[],discount:r,discountType:c,applyTax:l,start:e.start,end:e.end,companySharePercent:y}),g=De(e.cost??e.total??e.finalTotal),v=Number.isFinite(g),I=a?p.finalTotal:v?Ee(g):p.finalTotal,q={equipmentTotal:p.equipmentTotal,crewTotal:p.crewTotal,crewCostTotal:p.crewCostTotal,discountAmount:p.discountAmount,subtotalAfterDiscount:p.subtotalAfterDiscount,taxableAmount:p.taxableAmount,taxAmount:p.taxAmount,finalTotal:I,companySharePercent:p.companySharePercent,companyShareAmount:p.companyShareAmount,netProfit:p.netProfit},_={equipmentTotal:h(p.equipmentTotal.toFixed(2)),crewTotal:h(p.crewTotal.toFixed(2)),discountAmount:h(p.discountAmount.toFixed(2)),subtotalAfterDiscount:h(p.subtotalAfterDiscount.toFixed(2)),taxableAmount:h(p.taxableAmount.toFixed(2)),taxAmount:h(p.taxAmount.toFixed(2)),finalTotal:h(I.toFixed(2)),companySharePercent:h((Number.isFinite(p.companySharePercent)?p.companySharePercent:0).toFixed(2)),companyShareAmount:h(p.companyShareAmount.toFixed(2)),netProfit:h(p.netProfit.toFixed(2))};return{totals:q,totalsDisplay:_,rentalDays:p.rentalDays}}function _n(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function wo(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function pu(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=_n(e.amount??(n==="amount"?e.value:null)),s=_n(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=wo(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function fu(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(pu).filter(Boolean);if(n.length>0)return n;const a=_n(e.paidPercent??e.paid_percent),s=_n(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=wo(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function yu(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function bu(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function gu(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function hu(e){const t=Number(e?.equipmentEstimate)||0,n=gu(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const l=Math.max(0,a-c),d=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,b=d&&s&&u>0?u:0,y=b>0?Number((l*(b/100)).toFixed(2)):0,m=l+y;let p=s?m*Gr:0;(!Number.isFinite(p)||p<0)&&(p=0),p=Number(p.toFixed(2));let g=s?Number(e?.totalWithTax):m;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((m+p).toFixed(2))):g=m,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:l,companyShareAmount:y,subtotal:m,applyTax:s,taxAmount:p,totalWithTax:g}}function vu(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=r.length?r:Array.isArray(e.technicians)?e.technicians:[],c=Hs(t,a,s,!1,i,{start:e.start,end:e.end});if(Number.isFinite(c))return c;const l=Number(h(String(e.cost??0)));return Number.isFinite(l)?Math.round(l):0}function qu(e,t){if(!e)return"—";const n=st(e);return t?`${n} - ${st(t)}`:n}function me(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${h(a.toFixed(s))} ${t}`}function Ui(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function Su(e){if(!e?.start)return null;if(!e?.end)return 1;const t=Fa(e.start,e.end);return Number.isFinite(t)?t:1}function Eu(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function wu(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=fe(),i=e?.id!=null?s.find(P=>String(P.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:me(0,t),expensesTotal:me(0,t),reservationsTotal:me(0,t),discountAmount:me(0,t),taxAmount:me(0,t),overallTotal:me(0,t),paidAmount:me(0,t),remainingAmount:me(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:me(0,t),remainingAmountDisplay:me(0,t),paidPercentDisplay:Ui(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const l=i.clientId??i.customerId??i.client_id??i.customer_id??null,d=l!=null&&n.find(P=>String(P.id)===String(l))||null,u=d?.customerName??d?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),b=(i.clientCompany||d?.companyName||d?.company||"").trim(),y=d?.phone??d?.customerPhone??i.clientPhone??i.customerPhone??"",m=y?h(String(y).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),p=d?.email??i.clientEmail??i.customerEmail??"",g=p?String(p).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),v=i.projectCode||`PRJ-${h(String(i.id??""))}`,I=h(String(v)),q=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),_=yu(i.type),A=i.start?st(i.start):"—",U=i.end?st(i.end):"—",S=Su(i),x=S!=null?Eu(S):"غير محدد",C=bu(i),T={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},X=o(`projects.status.${C}`,T[C]||C),k=i.id!=null?String(i.id):null,F=k?a.filter(P=>String(P.projectId)===k):[],L=F.map(P=>{const J=P.reservationId||P.id||"",V=P.status||P.state||"pending",ce=String(V).toLowerCase(),pe=o(`reservations.status.${ce}`,ce),Pe=vu(P),Me=P.start?new Date(P.start).getTime():0;return{reservationId:h(String(J||"-")),status:ce,statusLabel:pe,total:Pe,totalLabel:me(Pe,t),dateRange:qu(P.start,P.end),startTimestamp:Number.isNaN(Me)?0:Me}}).sort((P,J)=>J.startTimestamp-P.startTimestamp).map(({startTimestamp:P,...J})=>J).reduce((P,J)=>P+(Number(J.total)||0),0),B=[];try{F.forEach(P=>{const{groups:J}=Qs(P);J.forEach(V=>{const ce=Number(V?.count??V?.quantity??1)||1,pe=Number(V?.unitPrice);let Pe=Number.isFinite(pe)?pe:0;if(!Pe||Pe<=0){const ie=Number(V?.totalPrice);Number.isFinite(ie)&&ce>0&&(Pe=Number((ie/ce).toFixed(2)))}Number.isFinite(Pe)||(Pe=0);const Me=V?.type==="package"||Array.isArray(V?.items)&&V.items.some(ie=>ie?.type==="package"),Ge=Array.isArray(V?.barcodes)&&V.barcodes.length?V.barcodes[0]:Array.isArray(V?.items)&&V.items.length?V.items[0]?.barcode:null;let Ne=V?.packageDisplayCode??V?.package_code??V?.code??V?.packageCode??(Array.isArray(V?.items)&&V.items.length?V.items[0]?.package_code??V.items[0]?.code??V.items[0]?.packageCode:null);const wt=ie=>{const xe=(ie==null?"":String(ie)).trim();return!!(!xe||/^pkg-/i.test(xe)||/^\d+$/.test(xe)&&xe.length<=4)};if(!Ne||wt(Ne)){const ie=V?.packageId??V?.package_id??(Array.isArray(V?.items)&&V.items.length?V.items[0]?.packageId??V.items[0]?.package_id:null);if(ie)try{const xe=Os(ie);xe&&xe.package_code&&(Ne=xe.package_code)}catch{}}if(!Ne||wt(Ne))try{const ie=En(V?.description||"");if(ie){const xe=ur();let Ve=xe.find(et=>En(et?.name||et?.title||et?.label||"")===ie);Ve||(Ve=xe.find(et=>{const Qt=En(et?.name||et?.title||et?.label||"");return Qt.includes(ie)||ie.includes(Qt)})),Ve&&Ve.package_code&&(Ne=Ve.package_code)}}catch{}const Oe=Me?Ne??Ge??"":V?.barcode??Ge??"",Lt=Oe!=null?String(Oe):"";let M=Number.isFinite(Number(V?.totalPrice))?Number(V.totalPrice):Number((Pe*ce).toFixed(2));M=Ee(M),B.push({...V,isPackage:Me,desc:V?.description,barcode:Lt,packageCodeResolved:Ne||"",qty:ce,price:M,totalPrice:M,unitPriceValue:Pe})})})}catch{}const $=new Map;F.forEach(P=>{const J=Array.isArray(P.items)?P.items:[],V=Fa(P.start,P.end),ce=P.reservationId||P.id||"";J.forEach((pe,Pe)=>{if(!pe)return;const Me=pe.barcode||pe.code||pe.id||pe.desc||pe.description||`item-${Pe}`,Ge=String(Me||`item-${Pe}`),Ne=$.get(Ge)||{description:pe.desc||pe.description||pe.name||pe.barcode||`#${h(String(Pe+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},wt=Number(pe.qty)||1,Oe=Number(pe.price)||0;Ne.totalQuantity+=wt,Ne.reservationIds.add(String(ce));const Lt=Oe*wt*Math.max(1,V);Number.isFinite(Lt)&&(Ne.totalCost+=Lt),$.set(Ge,Ne)})});const K=Array.from($.values()).map(P=>({description:P.description,totalQuantity:P.totalQuantity,reservationsCount:P.reservationIds.size,displayCost:me(P.totalCost,t)})),G=new Map((r||[]).filter(Boolean).map(P=>[String(P.id),P])),R=new Map,Y=P=>{if(!P)return;let J=null;typeof P=="object"?J=P.id??P.technicianId??P.technician_id??P.userId??P.user_id??null:(typeof P=="string"||typeof P=="number")&&(J=P);const V=J!=null?String(J):null,ce=V&&G.has(V)?G.get(V):typeof P=="object"?P:null,pe=ce?.name||ce?.full_name||ce?.fullName||ce?.displayName||(typeof P=="string"?P:null),Pe=ce?.role||ce?.title||null,Me=ce?.phone||ce?.mobile||ce?.contact||null;if(!pe&&!V)return;const Ge=V||pe;R.has(Ge)||R.set(Ge,{id:V,name:pe||"-",role:Pe||null,phone:Me||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(P=>Y(P)),F.forEach(P=>{(Array.isArray(P.crewAssignments)&&P.crewAssignments.length?P.crewAssignments:Array.isArray(P.technicians)?P.technicians.map(V=>({technicianId:V})):[]).forEach(V=>Y(V))});const j=Array.from(R.values()),H=Array.isArray(i.expenses)?i.expenses.map(P=>{const J=Number(P?.amount)||0;return{label:P?.label||P?.name||"-",amount:J,displayAmount:me(J,t),note:P?.note||P?.description||""}}):[],D=hu(i),te=D.applyTax?Number(((D.subtotal+L)*Gr).toFixed(2)):0,ue=Number((D.subtotal+L+te).toFixed(2)),ye=fu(i),we=_n(i.paidAmount??i.paid_amount)||0,qe=_n(i.paidPercent??i.paid_percent)||0,Q=Vs({totalAmount:ue,paidAmount:we,paidPercent:qe,history:ye}),re=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",be=Us({manualStatus:re,paidAmount:Q.paidAmount,paidPercent:Q.paidPercent,totalAmount:ue}),He={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},Qe=o(`projects.paymentStatus.${be}`,He[be]||be),W=Number(Q.paidAmount||0),oe=Number(Q.paidPercent||0),le=Math.max(0,Number((ue-W).toFixed(2))),Ae={projectSubtotal:me(D.subtotal,t),expensesTotal:me(D.expensesTotal,t),reservationsTotal:me(L,t),discountAmount:me(D.discountAmount,t),taxAmount:me(te,t),overallTotal:me(ue,t),paidAmount:me(W,t),remainingAmount:me(le,t)},je={status:be,statusLabel:Qe,paidAmount:W,paidPercent:oe,remainingAmount:le,paidAmountDisplay:me(W,t),remainingAmountDisplay:me(le,t),paidPercentDisplay:Ui(oe)},pt=(i.description||"").trim();return{project:i,customer:d,clientInfo:{name:u,company:b||"—",phone:m,email:g},projectInfo:{title:q,code:I,typeLabel:_,startDisplay:A,endDisplay:U,durationLabel:x,statusLabel:X},expenses:H,equipment:K,crew:j,equipmentItems:B,crewAssignments:F.flatMap(P=>Eo(P)),totals:D,totalsDisplay:Ae,projectTotals:{combinedTaxAmount:te,overallTotal:ue,reservationsTotal:L,paidAmount:W,paidPercent:oe,remainingAmount:le,paymentStatus:be},paymentSummary:je,notes:pt,currencyLabel:t,projectStatus:C,projectStatusLabel:X,projectDurationDays:S,projectDurationLabel:x,paymentHistory:ye}}function Au({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:l={},currencyLabel:d="SR",sections:u,fieldSelections:b={},quoteNumber:y,quoteDate:m,terms:p=Ze}){const g=ci(b),v=(W,oe)=>li(g,W,oe),I=W=>u?.has?.(W),q=`<div class="quote-placeholder">${w(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,_=(W,oe)=>`<div class="info-plain__item">
      <span class="info-plain__label">${w(W)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${w(oe)}</span>
    </div>`,A=(W,oe,{variant:le="inline"}={})=>le==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${w(W)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${w(oe)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${w(W)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${w(oe)}</span>
    </span>`,U=(W,oe)=>`<div class="payment-row">
      <span class="payment-row__label">${w(W)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${w(oe)}</span>
    </div>`,S=[];v("customerInfo","customerName")&&S.push(_(o("projects.details.client","العميل"),t.name||"-")),v("customerInfo","customerCompany")&&S.push(_(o("projects.details.company","شركة العميل"),t.company||"—")),v("customerInfo","customerPhone")&&S.push(_(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),v("customerInfo","customerEmail")&&S.push(_(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const x=I("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${w(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${S.length?`<div class="info-plain">${S.join("")}</div>`:q}
      </section>`:"",C=[];v("projectInfo","projectType")&&C.push(_(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),v("projectInfo","projectTitle")&&C.push(_(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),v("projectInfo","projectCode")&&C.push(_(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),v("projectInfo","projectStart")&&C.push(_(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),v("projectInfo","projectEnd")&&C.push(_(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),v("projectInfo","projectDuration")&&C.push(_(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),v("projectInfo","projectStatus")&&C.push(_(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const T=I("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${w(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${C.length?`<div class="info-plain">${C.join("")}</div>`:q}
      </section>`:"",X=oi.filter(W=>v("crew",W.id)),k=Array.isArray(N?.crewAssignments)?N.crewAssignments:[],F=I("projectCrew")?X.length?`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${X.map(W=>`<th>${w(W.labelKey?o(W.labelKey,W.fallback):W.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${k.length?k.map((W,oe)=>`<tr>${X.map(le=>`<td>${le.render(W,oe)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(X.length,1)}" class="empty">${w(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${q}
          </section>`:"",ee=[];v("financialSummary","projectSubtotal")&&ee.push(A(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${me(0,d)}`)),v("financialSummary","expensesTotal")&&ee.push(A(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||me(0,d))),v("financialSummary","reservationsTotal")&&ee.push(A(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||me(0,d))),v("financialSummary","discountAmount")&&ee.push(A(o("reservations.details.labels.discount","الخصم"),i.discountAmount||me(0,d))),v("financialSummary","taxAmount")&&ee.push(A(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||me(0,d)));const L=[];v("financialSummary","overallTotal")&&L.push(A(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||me(0,d),{variant:"final"})),v("financialSummary","paidAmount")&&L.push(A(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||me(0,d),{variant:"final"})),v("financialSummary","remainingAmount")&&L.push(A(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||me(0,d),{variant:"final"}));const B=I("financialSummary")?!ee.length&&!L.length?`<section class="quote-section quote-section--financial">${q}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${w(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${ee.length?`<div class="totals-inline">${ee.join("")}</div>`:""}
            ${L.length?`<div class="totals-final">${L.join("")}</div>`:""}
          </div>
        </section>`:"",$=to.filter(W=>v("projectExpenses",W.id)),K=I("projectExpenses")?$.length?`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${$.map(W=>`<th>${w(W.labelKey?o(W.labelKey,W.fallback):W.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((W,oe)=>`<tr>${$.map(le=>`<td>${le.render(W,oe)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max($.length,1)}" class="empty">${w(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${q}
          </section>`:"",G=ri.filter(W=>v("items",W.id)),R=Array.isArray(N?.equipmentItems)?N.equipmentItems:[],Y=I("projectEquipment")?G.length?`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${G.map(W=>`<th>${w(W.labelKey?o(W.labelKey,W.fallback):W.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${R.length?R.map((W,oe)=>`<tr>${G.map(le=>`<td>${le.render(W,oe)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(G.length,1)}" class="empty">${w(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${q}
          </section>`:"",j=(e?.description||"").trim()||"",H=I("projectNotes")?`<section class="quote-section">
        <h3>${w(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${w(j||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",D=[];v("payment","beneficiary")&&D.push(U(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Re.beneficiaryName)),v("payment","bank")&&D.push(U(o("reservations.quote.labels.bank","اسم البنك"),Re.bankName)),v("payment","account")&&D.push(U(o("reservations.quote.labels.account","رقم الحساب"),h(Re.accountNumber))),v("payment","iban")&&D.push(U(o("reservations.quote.labels.iban","رقم الآيبان"),h(Re.iban)));const te=`<section class="quote-section">
      <div class="payment-block">
        <h3>${w(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${D.length?D.join(""):q}</div>
      </div>
      <p class="quote-approval-note">${w(Re.approvalNote)}</p>
    </section>`,ue=Array.isArray(p)&&p.length?p:Ze,ye=`<footer class="quote-footer">
        <h4>${w(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${ue.map(W=>`<li>${w(W)}</li>`).join("")}</ul>
      </footer>`,we=[],qe=[];if(T&&qe.push({key:"project",html:T}),x&&qe.push({key:"customer",html:x}),qe.length>1){const W=qe.find(Ae=>Ae.key==="project"),oe=qe.find(Ae=>Ae.key==="customer"),le=[];W?.html&&le.push(W.html),oe?.html&&le.push(oe.html),we.push(Le(`<div class="quote-section-row quote-section-row--primary">${le.join("")}</div>`,{blockType:"group"}))}else qe.length===1&&we.push(Le(qe[0].html));const Q=[];F&&Q.push(Le(F,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),K&&Q.push(Le(K,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),Y&&Q.push(Le(Y,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const re=[];B&&re.push(Le(B,{blockType:"summary"})),H&&re.push(Le(H));const be=[Le(te,{blockType:"payment"}),Le(ye,{blockType:"footer"})],He=[...Pa(we,"projects.quote.placeholder.primary"),...Q,...Pa(re,"projects.quote.placeholder.summary"),...be],Qe=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${w(Re.logoUrl)}" alt="${w(Re.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${w(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${w(Re.companyName)}</p>
        <p class="quote-company-cr">${w(o("reservations.quote.labels.cr","السجل التجاري"))}: ${w(Re.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${w(o("reservations.details.labels.reservationId","رقم العرض"))}</span>
          <strong>${w(y)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${w(o("projects.quote.labels.date","التاريخ"))}</span>
          <strong>${w(m)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${ro}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Qe}
          ${He.join("")}
        </div>
      </div>
    </div>
  `}function Ao(e){if(e?.context==="project")return Au(e);const{reservation:t,customer:n,project:a,crewAssignments:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:l,sections:d,fieldSelections:u={},quoteNumber:b,quoteDate:y,terms:m=Ze}=e,p=h(String(t?.reservationId??t?.id??"")),g=t.start?h(st(t.start)):"-",v=t.end?h(st(t.end)):"-",I=n?.customerName||n?.full_name||n?.name||"-",q=n?.phone||"-",_=n?.email||"-",A=n?.company||n?.company_name||"-",U=h(q),S=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),x=a?.code||a?.projectCode||"",C=h(String(c)),T=t?.notes||"",X=Array.isArray(m)&&m.length?m:Ze,k=ci(u),F=(M,ie)=>li(k,M,ie),ee=M=>d?.has?.(M),L=`<div class="quote-placeholder">${w(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,B=(M,ie)=>`<div class="info-plain__item">${w(M)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${w(ie)}</strong></div>`,$=(M,ie,{variant:xe="inline"}={})=>xe==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${w(M)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${w(ie)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${w(M)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${w(ie)}</span>
    </span>`,K=(M,ie)=>`<div class="payment-row">
      <span class="payment-row__label">${w(M)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${w(ie)}</span>
    </div>`,G=[];F("customerInfo","customerName")&&G.push(B(o("reservations.details.labels.customer","العميل"),I)),F("customerInfo","customerCompany")&&G.push(B(o("reservations.details.labels.company","الشركة"),A)),F("customerInfo","customerPhone")&&G.push(B(o("reservations.details.labels.phone","الهاتف"),U)),F("customerInfo","customerEmail")&&G.push(B(o("reservations.details.labels.email","البريد"),_));const R=ee("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${G.length?`<div class="info-plain">${G.join("")}</div>`:L}
      </section>`:"",Y=[];F("reservationInfo","reservationId")&&Y.push(B(o("reservations.details.labels.reservationId","رقم الحجز"),p||"-")),F("reservationInfo","reservationStart")&&Y.push(B(o("reservations.details.labels.start","بداية الحجز"),g)),F("reservationInfo","reservationEnd")&&Y.push(B(o("reservations.details.labels.end","نهاية الحجز"),v)),F("reservationInfo","reservationDuration")&&Y.push(B(o("reservations.details.labels.duration","عدد الأيام"),C));const j=ee("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${Y.length?`<div class="info-plain">${Y.join("")}</div>`:L}
      </section>`:"",H=[];F("projectInfo","projectTitle")&&H.push(B(o("reservations.details.labels.project","المشروع"),S)),F("projectInfo","projectCode")&&H.push(B(o("reservations.details.labels.code","الرمز"),x||"-"));const D=ee("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${H.length?`<div class="info-plain">${H.join("")}</div>`:L}
      </section>`:"",te=[];F("financialSummary","equipmentTotal")&&te.push($(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${l}`)),F("financialSummary","crewTotal")&&te.push($(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${l}`)),F("financialSummary","discountAmount")&&te.push($(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${l}`)),F("financialSummary","taxAmount")&&te.push($(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${l}`));const ue=F("financialSummary","finalTotal"),ye=[];ue&&ye.push($(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${l}`,{variant:"final"}));const we=ye.length?`<div class="totals-final">${ye.join("")}</div>`:"",qe=ee("financialSummary")?!te.length&&!ue?`<section class="quote-section quote-section--financial">${L}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${w(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${te.length?`<div class="totals-inline">${te.join("")}</div>`:""}
            ${we}
          </div>
        </section>`:"",{groups:Q}=Qs(t),re=Q.map(M=>{const ie=Number(M?.count??M?.quantity??1)||1,xe=Number(M?.unitPrice);let Ve=Number.isFinite(xe)?xe:0;if(!Ve||Ve<=0){const Be=Number(M?.totalPrice);Number.isFinite(Be)&&ie>0&&(Ve=Number((Be/ie).toFixed(2)))}Number.isFinite(Ve)||(Ve=0);const et=M?.type==="package"||Array.isArray(M?.items)&&M.items.some(Be=>Be?.type==="package"),Qt=Array.isArray(M?.barcodes)&&M.barcodes.length?M.barcodes[0]:Array.isArray(M?.items)&&M.items.length?M.items[0]?.barcode:null;let ft=M?.packageDisplayCode??M?.package_code??M?.code??M?.packageCode??(Array.isArray(M?.items)&&M.items.length?M.items[0]?.package_code??M.items[0]?.code??M.items[0]?.packageCode:null);const ea=Be=>{const We=(Be==null?"":String(Be)).trim();return!!(!We||/^pkg-/i.test(We)||/^\d+$/.test(We)&&We.length<=4)};if(!ft||ea(ft)){const Be=M?.packageId??M?.package_id??(Array.isArray(M?.items)&&M.items.length?M.items[0]?.packageId??M.items[0]?.package_id:null);if(Be)try{const We=Os(Be);We&&We.package_code&&(ft=We.package_code)}catch{}}if(!ft||ea(ft))try{const Be=En(M?.description||"");if(Be){const We=ur();let Gt=We.find(At=>En(At?.name||At?.title||At?.label||"")===Be);Gt||(Gt=We.find(At=>{const na=En(At?.name||At?.title||At?.label||"");return na.includes(Be)||Be.includes(na)})),Gt&&Gt.package_code&&(ft=Gt.package_code)}}catch{}const ta=et?ft??Qt??"":M?.barcode??Qt??"",es=ta!=null?String(ta):"";let bn=Number.isFinite(Number(M?.totalPrice))?Number(M.totalPrice):Number((Ve*ie).toFixed(2));return bn=Ee(bn),{...M,isPackage:et,desc:M?.description,barcode:es,packageCodeResolved:ft||"",qty:ie,price:bn,totalPrice:bn,unitPriceValue:Ve}}),be=ri.filter(M=>F("items",M.id)),He=be.length>0,Qe=He?be.map(M=>`<th>${w(M.labelKey?o(M.labelKey,M.fallback):M.fallback)}</th>`).join(""):"",oe=re.length>0?re.map((M,ie)=>`<tr>${be.map(xe=>`<td>${xe.render(M,ie)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(be.length,1)}" class="empty">${w(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,le=ee("items")?He?`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Qe}</tr>
              </thead>
              <tbody>${oe}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.items.title","المعدات"))}</h3>
            ${L}
          </section>`:"",Ae=oi.filter(M=>F("crew",M.id)),je=Ae.length>0,pt=je?Ae.map(M=>`<th>${w(M.labelKey?o(M.labelKey,M.fallback):M.fallback)}</th>`).join(""):"",O=Array.isArray(s)?s:[],P=O.length?O.map((M,ie)=>`<tr>${Ae.map(xe=>`<td>${xe.render(M,ie)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Ae.length,1)}" class="empty">${w(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,J=ee("crew")?je?`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${pt}</tr>
              </thead>
              <tbody>${P}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${L}
          </section>`:"",V=ee("notes")?`<section class="quote-section">
        <h3>${w(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${w(T||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",ce=[];F("payment","beneficiary")&&ce.push(K(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Re.beneficiaryName)),F("payment","bank")&&ce.push(K(o("reservations.quote.labels.bank","اسم البنك"),Re.bankName)),F("payment","account")&&ce.push(K(o("reservations.quote.labels.account","رقم الحساب"),h(Re.accountNumber))),F("payment","iban")&&ce.push(K(o("reservations.quote.labels.iban","رقم الآيبان"),h(Re.iban)));const pe=`<section class="quote-section">
      <div class="payment-block">
        <h3>${w(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${ce.length?ce.join(""):L}</div>
      </div>
      <p class="quote-approval-note">${w(Re.approvalNote)}</p>
    </section>`,Pe=`<footer class="quote-footer">
        <h4>${w(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${X.map(M=>`<li>${w(M)}</li>`).join("")}</ul>
      </footer>`,Me=[];R&&j?Me.push(Le(`<div class="quote-section-row">${R}${j}</div>`,{blockType:"group"})):(j&&Me.push(Le(j)),R&&Me.push(Le(R))),D&&Me.push(Le(D));const Ge=[];le&&Ge.push(Le(le,{blockType:"table",extraAttributes:'data-table-id="items"'})),J&&Ge.push(Le(J,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const Ne=[];qe&&Ne.push(Le(qe,{blockType:"summary"})),V&&Ne.push(Le(V));const wt=[Le(pe,{blockType:"payment"}),Le(Pe,{blockType:"footer"})],Oe=[...Pa(Me,"reservations.quote.placeholder.page1"),...Ge,...Pa(Ne,"reservations.quote.placeholder.page2"),...wt],Lt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${w(Re.logoUrl)}" alt="${w(Re.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${w(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${w(Re.companyName)}</p>
        <p class="quote-company-cr">${w(o("reservations.quote.labels.cr","السجل التجاري"))}: ${w(Re.commercialRegistry)}</p>
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
      <style>${ro}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Lt}
          ${Oe.join("")}
        </div>
      </div>
    </div>
  `}async function xo(){try{const e=fe();if((Array.isArray(e?.packages)?e.packages:[]).length>0)return;const n=await mt("/packages/?all=1"),a=Array.isArray(n?.data)?n.data:Array.isArray(n)?n:[];a.length&&(Ta({packages:a}),document.dispatchEvent?.(new CustomEvent("packages:changed",{detail:{packages:a}})))}catch{}}function xu(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function Kn(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>xu(c)),i=[s,...r].map(c=>c.catch(l=>(Pt("asset load failed",l),Fd(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function Io(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await bo(r),await Kn(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let l=null,d=null;const u=S=>{S.style.margin="0 auto",S.style.breakInside="avoid",S.style.pageBreakInside="avoid",S.style.pageBreakAfter="auto",S.style.breakAfter="auto"},b=()=>{const S=a.createElement("div"),x=s.childElementCount===0;if(S.className="quote-page",S.dataset.pageIndex=String(s.childElementCount),x){S.classList.add("quote-page--primary");const T=i.cloneNode(!0);T.removeAttribute("data-quote-header-template"),S.appendChild(T)}else S.classList.add("quote-page--continuation");const C=a.createElement("main");C.className="quote-body",S.appendChild(C),s.appendChild(S),u(S),l=S,d=C},y=()=>{(!l||!d||!d.isConnected)&&b()},m=()=>{if(!l||!d||d.childElementCount>0)return;const S=l;l=null,d=null,S.parentNode&&S.parentNode.removeChild(S)},p=()=>{l=null,d=null},g=()=>l?l.scrollHeight-l.clientHeight>Nd:!1,v=(S,{allowOverflow:x=!1}={})=>(y(),d.appendChild(S),g()&&!x?(d.removeChild(S),m(),!1):!0),I=S=>{const x=S.cloneNode(!0);x.removeAttribute?.("data-quote-block"),x.removeAttribute?.("data-block-type"),x.removeAttribute?.("data-table-id"),!v(x)&&(p(),!v(x)&&v(x,{allowOverflow:!0}))},q=S=>{const x=S.querySelector("table");if(!x){I(S);return}const C=S.querySelector("h3"),T=x.querySelector("thead"),X=Array.from(x.querySelectorAll("tbody tr"));if(!X.length){I(S);return}let k=null,F=0;const ee=(B=!1)=>{const $=S.cloneNode(!1);$.removeAttribute("data-quote-block"),$.removeAttribute("data-block-type"),$.removeAttribute("data-table-id"),$.classList.add("quote-section--table-fragment"),B&&$.classList.add("quote-section--table-fragment--continued");const K=C?C.cloneNode(!0):null;K&&$.appendChild(K);const G=x.cloneNode(!1);G.classList.add("quote-table--fragment"),T&&G.appendChild(T.cloneNode(!0));const R=a.createElement("tbody");return G.appendChild(R),$.appendChild(G),{section:$,body:R}},L=(B=!1)=>k||(k=ee(B),v(k.section)||(p(),v(k.section)||v(k.section,{allowOverflow:!0})),k);X.forEach(B=>{L(F>0);const $=B.cloneNode(!0);if(k.body.appendChild($),g()&&(k.body.removeChild($),k.body.childElementCount||(d.removeChild(k.section),k=null,m()),p(),k=null,L(F>0),k.body.appendChild($),g())){k.section.classList.add("quote-section--table-fragment--overflow"),F+=1;return}F+=1}),k=null};if(!c.length)return;c.forEach(S=>{S.getAttribute("data-block-type")==="table"?q(S):I(S)});const _=Array.from(s.children),A=[];if(_.forEach((S,x)=>{const C=S.querySelector(".quote-body");if(x!==0&&(!C||C.childElementCount===0)){S.remove();return}A.push(S)}),!n){const S=a.defaultView||window,x=Math.min(3,Math.max(1,S.devicePixelRatio||1)),C=Xa()?Math.min(2,x):x;A.forEach(T=>eu(T,{pixelRatio:C}))}A.forEach((S,x)=>{const C=x===0;S.style.pageBreakAfter="auto",S.style.breakAfter="auto",S.style.pageBreakBefore=C?"auto":"always",S.style.breakBefore=C?"auto":"page",n?S.style.boxShadow="":S.style.boxShadow="none"});const U=A[A.length-1]||null;l=U,d=U?.querySelector(".quote-body")||null,await Kn(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function fi(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function Iu(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([nu(),tu()]),c=e.ownerDocument||document,l=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,l,c?.documentElement?.getAttribute?.("dir")].some(S=>typeof S=="string"&&S.toLowerCase().startsWith("rtl")),b=typeof window<"u"&&window.devicePixelRatio||1,y=mi(),m=mo(),p=Xa();let g;p?g=1.5:m?g=Math.min(1.7,Math.max(1.2,b*1.1)):y?g=Math.min(1.8,Math.max(1.25,b*1.2)):g=Math.min(2,Math.max(1.6,b*1.4));const v=p||m?.9:y?.92:.95,I=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),q={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let _=0;const A=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let S=0;S<s.length;S+=1){const x=s[S];await bo(x),await Kn(x);const C=x.ownerDocument||document,T=C.createElement("div");Object.assign(T.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const X=x.cloneNode(!0);X.style.width=`${ma}px`,X.style.maxWidth=`${ma}px`,X.style.minWidth=`${ma}px`,X.style.height=`${pa}px`,X.style.maxHeight=`${pa}px`,X.style.minHeight=`${pa}px`,X.style.position="relative",X.style.background="#ffffff",fi(X),T.appendChild(X),C.body.appendChild(T);let k;try{await Kn(X),k=await i(X,{...q,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(R){throw Ns(R,"pageCapture",{toastMessage:A}),R}finally{T.parentNode?.removeChild(T)}if(!k)continue;const F=k.width||1,L=(k.height||1)/F;let B=$s,$=B*L,K=0;if($>ua){const R=ua/$;$=ua,B=B*R,K=Math.max(0,($s-B)/2)}const G=k.toDataURL("image/jpeg",v);_>0&&I.addPage(),I.addImage(G,"JPEG",K,0,B,$,`page-${_+1}`,"FAST"),_+=1,await new Promise(R=>window.requestAnimationFrame(R))}}catch(S){throw Ts({safariWindowRef:n,mobileWindowRef:a}),S}if(_===0)throw Ts({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(m||p){const S=I.output("blob");if(p){const x=URL.createObjectURL(S);zn();try{window.location.assign(x)}catch(C){Pt("mobile safari blob navigation failed",C)}finally{setTimeout(()=>URL.revokeObjectURL(x),6e4)}}else{const x=URL.createObjectURL(S),C=()=>m&&n&&!n.closed?n:a&&!a.closed?a:null,T=(k,F)=>{if(zn(),!k){window.location.assign(F);return}try{k.location.replace(F),k.focus?.()}catch(ee){Pt("direct blob navigation failed",ee);try{k.document.open(),k.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${w(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${F}" title="PDF preview"></iframe></body></html>`),k.document.close()}catch(L){Pt("iframe blob delivery failed",L),window.location.assign(F)}}},X=C();T(X,x),setTimeout(()=>URL.revokeObjectURL(x),6e4)}}else{zn();const S=I.output("bloburl"),x=document.createElement("a");x.href=S,x.download=t,x.rel="noopener",x.style.display="none",document.body.appendChild(x),x.click(),setTimeout(()=>{URL.revokeObjectURL(S),x.remove()},2e3)}}function yn(){if(!N||!Z)return;const{previewFrame:e}=Z;if(!e)return;const t=N.context||"reservation",n=Ao({context:t,reservation:N.reservation,customer:N.customer,project:N.project,crewAssignments:N.crewAssignments,totals:N.totals,totalsDisplay:N.totalsDisplay,rentalDays:N.rentalDays,currencyLabel:N.currencyLabel,sections:N.sections,fieldSelections:N.fields,quoteNumber:N.quoteNumber,quoteDate:N.quoteDateLabel,terms:N.terms,projectCrew:N.projectCrew,projectExpenses:N.projectExpenses,projectEquipment:N.projectEquipment,projectInfo:N.projectInfo,clientInfo:N.clientInfo,paymentSummary:N.paymentSummary,projectTotals:N.projectTotals});nn("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&(Yr(r),Xr(r,s),Jr(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await Io(i,{context:"preview"}),fi(i))}catch(m){console.error("[reservations/pdf] failed to layout preview document",m)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),l=a?.querySelector(".quote-preview-pages"),d=ma;let u=18;if(l&&a?.defaultView){const m=a.defaultView.getComputedStyle(l),p=parseFloat(m.rowGap||m.gap||`${u}`);Number.isFinite(p)&&p>=0&&(u=p)}const b=pa,y=c.length?c.length*b+Math.max(0,(c.length-1)*u):b;if(e.dataset.baseWidth=String(d),e.dataset.baseHeight=String(y),e.style.width=`${d}px`,e.style.minWidth=`${d}px`,e.style.height=`${y}px`,e.style.minHeight=`${y}px`,Z?.previewFrameWrapper&&!Z?.userAdjustedZoom){const m=Z.previewFrameWrapper.clientWidth-24;m>0&&m<d?ht=Math.max(m/d,.3):ht=1}ko(ht)}finally{zn()}},{once:!0})}function _u(e){if(!N)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?N.sections.add(n):N.sections.delete(n),vo(N),_o(),yn())}function ku(e){if(!N)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=N.context||"reservation",r=N.fields||(N.fields=Wa(s)),i=Rd(r,n);t.checked?i.add(a):i.delete(a),vo(N),yn()}function Pu(e){if(!N)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(ui(N,n),N.sectionExpansions[n]=t.open)}function _o(){if(!Z?.toggles||!N)return;const{toggles:e}=Z,t=N.fields||{},n=N.context||"reservation";ui(N);const a=Ga(n),s=no(n),r=a.map(({id:i,labelKey:c,fallback:l})=>{const d=o(c,l),u=N.sections.has(i),b=s[i]||[],y=Md(N,i),m=b.length?`<div class="quote-toggle-sublist">
          ${b.map(p=>{const g=li(t,i,p.id),v=u?"":"disabled",I=p.labelKey?o(p.labelKey,p.fallback):p.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${p.id}" ${g?"checked":""} ${v}>
                <span>${w(I)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${i}" ${y?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${i}" ${u?"checked":""}>
            <span>${w(d)}</span>
          </label>
          ${b.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${m}
      </details>
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",_u)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",ku)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",Pu)})}function $u(){if(Z?.modal)return Z;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
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
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),r=e.querySelector("[data-quote-terms-reset]"),i=e.querySelector("[data-quote-download]"),c=e.querySelector(".modal-header"),l=c?.querySelector(".btn-close"),d=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",c&&c.insertBefore(u,l||null);const b=document.createElement("iframe");b.className="quote-preview-frame",b.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),b.setAttribute("loading","lazy"),b.setAttribute("frameborder","0");const y=document.createElement("div");y.className="quote-preview-zoom-controls",y.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${w(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${w(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${w(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(b),n.innerHTML="";const p=document.createElement("div");p.className="quote-preview-scroll",p.appendChild(m),n.appendChild(p);const g=document.createElement("div");g.className="quote-preview-status",g.setAttribute("role","status"),g.setAttribute("aria-live","polite"),g.hidden=!0,g.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${w(io("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(y),i?.addEventListener("click",async()=>{if(N){i.disabled=!0;try{await Po()}finally{i.disabled=!1}}});const v=()=>{Cs()||Ls(e)};d.forEach(A=>{A?.addEventListener("click",v)}),l&&!d.includes(l)&&l.addEventListener("click",v),e.addEventListener("click",A=>{Cs()||A.target===e&&Ls(e)}),Z={modal:e,toggles:t,preview:n,previewScroll:p,previewFrameWrapper:m,zoomControls:y,zoomValue:y.querySelector("[data-zoom-value]"),previewFrame:b,meta:a,downloadBtn:i,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const I=y.querySelector("[data-zoom-out]"),q=y.querySelector("[data-zoom-in]"),_=y.querySelector("[data-zoom-reset]");return I?.addEventListener("click",()=>Ki(-.1)),q?.addEventListener("click",()=>Ki(.1)),_?.addEventListener("click",()=>$a(1,{markManual:!0})),s&&s.addEventListener("input",Lu),r&&r.addEventListener("click",Nu),$a(ht),Z}function $a(e,{silent:t=!1,markManual:n=!1}={}){ht=Math.min(Math.max(e,.25),2.2),n&&Z&&(Z.userAdjustedZoom=!0),ko(ht),!t&&Z?.zoomValue&&(Z.zoomValue.textContent=`${Math.round(ht*100)}%`)}function Ki(e){$a(ht+e,{markManual:!0})}function ko(e){if(!Z?.previewFrame||!Z.previewFrameWrapper)return;const t=Z.previewFrame,n=Z.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",mi()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function Cu(){if(!Z?.meta||!N)return;const{meta:e}=Z;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${w(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${w(N.quoteNumber)}</strong></div>
      <div><span>${w(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${w(N.quoteDateLabel)}</strong></div>
    </div>
  `}function yi(){if(!Z?.termsInput)return;const e=(N?.terms&&N.terms.length?N.terms:Ze).join(`
`);Z.termsInput.value!==e&&(Z.termsInput.value=e)}function Lu(e){if(!N)return;const t=_s(e?.target?.value??"");if(t.length){N.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{N.terms=[...Ze],yi();const n=Ze.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}yn()}function Nu(e){if(e?.preventDefault?.(),!N)return;N.terms=[...Ze];const t=document.getElementById("reservation-terms");t&&(t.value=Ze.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=Ze.join(`
`)),yi(),yn()}async function Po(){if(!N)return;nn("export");const t=!mi()&&mo(),n=Xa(),a=null,s=!n&&t?window.open("","_blank"):null;(l=>{if(l)try{l.document.open(),l.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${w(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${w(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${w(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),l.document.close()}catch(d){Pt("failed to prime download window",d)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await au(),us("html2pdf ensured");const l=N.context||"reservation",d=Ao({context:l,reservation:N.reservation,customer:N.customer,project:N.project,crewAssignments:N.crewAssignments,totals:N.totals,totalsDisplay:N.totalsDisplay,rentalDays:N.rentalDays,currencyLabel:N.currencyLabel,sections:N.sections,fieldSelections:N.fields,quoteNumber:N.quoteNumber,quoteDate:N.quoteDateLabel,terms:N.terms,projectCrew:N.projectCrew,projectExpenses:N.projectExpenses,projectEquipment:N.projectEquipment,projectInfo:N.projectInfo,clientInfo:N.clientInfo,paymentSummary:N.paymentSummary,projectTotals:N.projectTotals});i=document.createElement("div"),i.innerHTML=d,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),Yr(i),Xr(i),Jr(i),us("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await Io(u,{context:"export"}),await Kn(u),fi(u),us("layout complete for export document")}catch(y){Ns(y,"layoutQuoteDocument",{suppressToast:!0})}}const b=`quotation-${N.quoteNumber}.pdf`;await Iu(u,{filename:b,safariWindowRef:s,mobileWindowRef:a}),N.sequenceCommitted||(ou(N.quoteSequence),N.sequenceCommitted=!0)}catch(l){Ts({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,Ns(l,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),zn()}}function $o(){const e=$u();e?.modal&&(Mn=!1,ht=1,Z&&(Z.userAdjustedZoom=!1),$a(ht,{silent:!0}),_o(),Cu(),yi(),yn(),Dd(e.modal))}async function Tu({reservation:e,customer:t,project:n}){if(!e){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}await xo();const a=Eo(e),{totalsDisplay:s,totals:r,rentalDays:i}=mu(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:l,quoteNumber:d}=go("reservation"),u=new Date,b=wd();N={context:"reservation",reservation:e,customer:t,project:n,crewAssignments:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(Ga("reservation").filter(y=>y.defaultSelected).map(y=>y.id)),sectionExpansions:di("reservation"),fields:Wa("reservation"),terms:b,quoteSequence:l,quoteNumber:d,quoteDate:u,quoteDateLabel:So(u),sequenceCommitted:!1},qo(N),$o()}async function Fm({project:e}){if(!e){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}await xo();const t=wu(e),{project:n}=t;if(!n){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=go("project"),r=new Date,i=[...Ed];N={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,equipmentItems:t.equipmentItems||[],crewAssignments:t.crewAssignments||[],totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(Ga("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:di("project"),fields:Wa("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:So(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},qo(N),$o()}function ju({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=sn(),{reservations:r=[],customers:i=[],technicians:c=[],projects:l=[]}=fe(),d=r.map(q=>{const _=fs(q);return{..._,id:q.id??_.id,reservationId:q.reservationId??q.reservation_id??_.reservationId,reservationCode:q.reservationCode??q.reservation_code??_.reservationCode}}),u=d,b=Array.isArray(s)?s:c||[],y=new Map((l||[]).map(q=>[String(q.id),q])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!u||u.length===0){m.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const p=t||od(),g=new Map(i.map(q=>[String(q.id),q])),v=new Map(b.map(q=>[String(q.id),q])),I=ud({reservations:d,filters:p,customersMap:g,techniciansMap:v,projectsMap:y});if(I.length===0){m.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${md({entries:I,customersMap:g,techniciansMap:v,projectsMap:y})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(q=>{const _=Number(q.dataset.reservationIndex);Number.isNaN(_)||q.addEventListener("click",()=>{typeof n=="function"&&n(_)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(q=>{const _=Number(q.dataset.reservationIndex);Number.isNaN(_)||q.addEventListener("click",A=>{A.stopPropagation(),typeof a=="function"&&a(_,A)})})}function Bu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=fe(),c=s.map(g=>{const v=fs(g);return{...v,id:g.id??v.id,reservationId:g.reservationId??g.reservation_id??v.reservationId,reservationCode:g.reservationCode??g.reservation_code??v.reservationCode}}),l=s[e];if(!l)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=c[e]??fs(l),u=r.find(g=>String(g.id)===String(l.customerId)),b=l.projectId?i.find(g=>String(g.id)===String(l.projectId)):null,y=document.getElementById("reservation-details-body"),m=document.getElementById("reservationDetailsModal"),p=()=>{const g=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},v=document.getElementById("reservation-details-edit-btn");v&&(v.onclick=()=>{g(),typeof t=="function"&&t(e,{reservation:l,customer:u,getEditContext:a})});const I=document.getElementById("reservation-details-delete-btn");I&&(I.onclick=()=>{g(),typeof n=="function"&&n(e,{reservation:l,customer:u})});const q=y?.querySelector('[data-action="open-project"]');q&&b&&q.addEventListener("click",()=>{g();const A=b?.id!=null?String(b.id):"",U=A?`projects.html?project=${encodeURIComponent(A)}`:"projects.html";window.location.href=U});const _=document.getElementById("reservation-details-export-btn");_&&(_.onclick=async A=>{A?.preventDefault?.(),A?.stopPropagation?.(),_.blur();try{await Tu({reservation:l,customer:u,project:b})}catch(U){console.error("❌ [reservations] export to PDF failed",U),E(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}})};if(y){const g=sn()||[];y.innerHTML=Ri(d,u,g,e,b),p(),mr().then(()=>{const v=sn()||[];y.innerHTML=Ri(d,u,v,e,b),p()}).catch(()=>{})}return m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}function Co(){const e=()=>{Cn(),Ke(),sn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let Qi=!1,Gi=null;function Du(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function Rm(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=Du(n);if(!a&&Qi&&tn().length>0&&s===Gi)return tn();try{const r=await pr(n||{});return Qi=!0,Gi=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return tn()}}async function Fu(e,{onAfterChange:t}={}){if(!dn())return Gn(),!1;const a=tn()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await Vc(s),Co(),t?.({type:"deleted",reservation:a}),E(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=Da(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return E(i,"error"),!1}}async function Ru(e,{onAfterChange:t}={}){const a=tn()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=Ht(a);if(r)return E(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await Uc(s);return Co(),t?.({type:"confirmed",reservation:i}),E(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=Da(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return E(c,"error"),!1}}function Nn(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Vn(e,n),end:Vn(t,a)}}function Ca(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function bi(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function Lo(){const{container:e,select:t,hint:n,addButton:a}=bi();if(!t)return;const s=t.value,r=nr(),i=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,l=r.map(u=>{const b=Number.isFinite(Number(u.price))?Number(u.price):0,y=h(b.toFixed(2)),m=`${u.name} — ${y} ${i}`;return`<option value="${Ca(u.id)}">${Ca(m)}</option>`}).join("");t.innerHTML=`${c}${l}`;const d=r.length>0;t.disabled=!d,a&&(a.disabled=!d),e&&(e.hidden=!d,e.setAttribute("aria-hidden",d?"false":"true")),n&&(d?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),d&&s&&r.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function Mu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=Ut(),{start:r,end:i}=Nn(),{reservations:c=[]}=fe(),l=a!=null&&c[a]||null,d=l?.id??l?.reservationId??null,u=Or(n,{existingItems:s,start:r,end:i,ignoreReservationId:d});if(!u.success)return t||E(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const b=[...s,u.package];return Kt(a,b),Vt(b),rt(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function Wi(){const{select:e}=bi();if(!e)return;const t=e.value||"";Mu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function zu(){const{addButton:e,select:t}=bi();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{Wi()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Wi())}),t.dataset.listenerAttached="true"),Lo()}function Vt(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,Ji(t);return}const l=kn(e);t.innerHTML=l.map(d=>{const u=d.items[0]||{},b=mn(u)||d.image,y=b?`<img src="${b}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=d.items.some(k=>k?.type==="package"),p=h(String(d.count)),g=De(d.unitPrice),v=Number.isFinite(g)?Ee(g):0,I=De(d.totalPrice),q=Number.isFinite(I)?I:v*(Number.isFinite(d.count)?d.count:1),_=Ee(q),A=`${h(v.toFixed(2))} ${a}`,U=`${h(_.toFixed(2))} ${a}`,S=d.barcodes.map(k=>h(String(k||""))).filter(Boolean),x=S.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${S.map(k=>`<li>${k}</li>`).join("")}
            </ul>
          </details>`:"";let C="";if(m){const k=new Map,F=L=>{const B=Number.parseFloat(h(String(L??"")).replace(/[^0-9.]/g,""));return!Number.isFinite(B)||B<=0||B>99?1:Math.round(B)},ee=[];if(Array.isArray(d.packageItems)&&d.packageItems.length&&ee.push(...d.packageItems),d.items.forEach(L=>{Array.isArray(L?.packageItems)&&ee.push(...L.packageItems)}),ee.forEach(L=>{if(!L)return;const B=se(L.barcode||L.normalizedBarcode||L.desc||Math.random());if(!B)return;const $=k.get(B),K=F(L.qtyPerPackage??L.perPackageQty??L.quantityPerPackage??L.qty??L.quantity??1),G=Math.max(1,Math.min(K,99));if($){$.qty=G;return}k.set(B,{desc:L.desc||L.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:G,barcode:L.barcode??L.normalizedBarcode??""})}),k.size){const L=Array.from(k.values()).map(B=>{const $=h(String(B.qty>0?Math.min(B.qty,99):1)),K=Ca(B.desc||""),G=B.barcode?` <span class="reservation-package-items__barcode">(${Ca(h(String(B.barcode)))})</span>`:"";return`<li>${K}${G} × ${$}</li>`}).join("");C=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${L}
              </ul>
            </details>
          `}}const T=m?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",X=m?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${d.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${y}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${d.description||"-"}</div>
                ${m?`${C||""}${x||""}`:x}
              </div>
            </div>
          </td>
          <td>
            <div class="${T}" data-group-key="${d.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${d.key}" aria-label="${i}"${X}>−</button>
              <span class="reservation-qty-value">${p}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${d.key}" aria-label="${r}"${X}>+</button>
            </div>
          </td>
          <td>${A}</td>
          <td>${U}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),Ji(t)}function Ou(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function Ja(){const e=document.getElementById("edit-res-payment-history");if(!e)return;let t=Ya();const n=document.getElementById("edit-res-project")?.value||"";if(n)try{const i=(fe()?.projects||[]).find(l=>String(l.id)===String(n)),c=Array.isArray(i?.paymentHistory)?i.paymentHistory:Array.isArray(i?.payment_history)?i.payment_history:Array.isArray(i?.payments)?i.payments:Array.isArray(i?.paymentLogs)?i.paymentLogs:[];Array.isArray(c)&&c.length&&(t=c)}catch{}if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة")}</div>`,Xi();return}const a=o("reservations.create.summary.currency","SR"),s=t.map((r,i)=>{const c=Number.isFinite(Number(r?.amount))&&Number(r.amount)>0?`${h(Number(r.amount).toFixed(2))} ${a}`:"—",l=Number.isFinite(Number(r?.percentage))&&Number(r.percentage)>0?`${h(Number(r.percentage).toFixed(2))}%`:"—",d=r?.recordedAt?h(st(r.recordedAt)):"—",u=Ou(r?.type),b=r?.note?h(r.note):"";return`
      <tr>
        <td>${u}</td>
        <td>${c}</td>
        <td>${l}</td>
        <td>${d}</td>
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
  `,Xi()}function Hu(){if(Qn()){E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=jo(e);let a=Bo(t);if(!Number.isFinite(a)||a<=0){E(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=ys.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,l=o("reservations.create.summary.currency","SR");let d=null,u=null;if(n==="percent"){const y=Math.max(0,100-i);if(y<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,y);if(m!==a){const p=h(m.toFixed(2));E(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",p)),a=m}u=Number(a.toFixed(2)),r>0&&(d=a/100*r)}else{const y=Math.max(0,r-c);if(y<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,y);if(m!==a){const p=`${h(m.toFixed(2))} ${l}`;E(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",p)),a=m}d=Number(a.toFixed(2)),r>0&&(u=d/r*100)}d!=null&&(d=Number(d.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const b={type:n,value:a,amount:d,percentage:u,recordedAt:new Date().toISOString()};tm(b),gi(Ya()),Ja(),rt(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),E(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function Xi(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(Qn()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Hu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(Qn()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(nm(s),gi(Ya()),Ja(),rt(),E(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function Vu(e){const{index:t,items:n}=Ut(),s=kn(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,l)=>l!==r);Kt(t,i),Vt(i),rt()}function Uu(e){const{index:t,items:n}=Ut(),a=n.filter(s=>Ba(s)!==e);a.length!==n.length&&(Kt(t,a),Vt(a),rt())}function Ku(e){const{index:t,items:n}=Ut(),s=kn(n).find(v=>v.key===e);if(!s||s.items.some(v=>v?.type==="package"))return;const{start:r,end:i}=Nn();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=fe(),l=t!=null&&c[t]||null,d=l?.id??l?.reservationId??null,u=new Set(n.map(v=>se(v.barcode))),{equipment:b=[]}=fe(),y=(b||[]).find(v=>{const I=se(v?.barcode);return!I||u.has(I)||Ba({desc:v?.desc||v?.description||v?.name||"",price:Number(v?.price)||0})!==e||!vr(v)?!1:!qt(I,r,i,d)});if(!y){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const m=se(y.barcode),p=un(y);if(!p){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:p,equipmentId:p,barcode:m,desc:y.desc||y.description||y.name||s.description||"",qty:1,price:Number.isFinite(Number(y.price))?Number(y.price):s.unitPrice,image:mn(y)}];Kt(t,g),Vt(g),rt()}function Ji(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){Vu(s);return}if(a==="increase-edit-group"&&s){Ku(s);return}if(a==="remove-edit-group"&&s){Uu(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||Wu(i)}}),e.dataset.groupListenerAttached="true")}function Qn(){return!!document.getElementById("edit-res-project")?.value}function Qu(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{Qn()&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function Gu(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),l=document.getElementById("edit-res-payment-history");if([n,a,s,r,i,c,l].forEach(Qu),e){if(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s){const d=document.getElementById("edit-res-project")?.value||"";let u="unpaid";if(d)try{const y=(fe()?.projects||[]).find(p=>String(p.id)===String(d)),m=typeof y?.paymentStatus=="string"?y.paymentStatus.toLowerCase():null;m&&["paid","partial","unpaid"].includes(m)&&(u=m)}catch{}s.value=u,s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected}r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),l&&(l.dataset.linkedDisabled="true")}else n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.dataset.linkedDisabled="false")}function rt(){const e=document.getElementById("edit-res-summary");if(!e)return;Ja();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),at(a),rt()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=Qn();Gu(c);const l=document.getElementById("edit-res-tax"),d=c?!1:l?.checked||!1,u=!c&&a?.dataset?.userSelected==="true";let b="unpaid";if(c){const _=document.getElementById("edit-res-project")?.value||"";if(_)try{const U=(fe()?.projects||[]).find(x=>String(x.id)===String(_)),S=typeof U?.paymentStatus=="string"?U.paymentStatus.toLowerCase():null;S&&["paid","partial","unpaid"].includes(S)&&(b=S)}catch{}}else b=u&&a?.value||"unpaid";let y=null;!c&&d&&(ut("edit-res-company-share"),y=xn("edit-res-company-share"),(!Number.isFinite(y)||y<=0)&&(ut("edit-res-company-share"),y=xn("edit-res-company-share")));const{items:m=[],payments:p=[]}=Ut(),{start:g,end:v}=Nn(),I=ys({items:m,discount:r,discountType:i,applyTax:d,paidStatus:b,start:g,end:v,companySharePercent:y,paymentHistory:p});e.innerHTML=I;const q=ys.lastResult;if(q&&a){const _=q.paymentStatus;u?at(a,a.value):(a.value!==_&&(a.value=_),a.dataset&&delete a.dataset.userSelected,at(a,_))}else a&&at(a,a.value)}function Wu(e){if(e==null)return;const{index:t,items:n}=Ut();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);Kt(t,a),Vt(a),rt()}function Xu(e){const t=e?.value??"",n=se(t);if(!n)return;const a=Ra(n);if(!a){E(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=$t(a);if(s==="maintenance"||s==="retired"){E(ln(s));return}const r=se(n),{index:i,items:c=[]}=Ut();if(c.findIndex(v=>se(v.barcode)===r)>-1){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=Nn();if(!d||!u){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:b=[]}=fe(),y=i!=null&&b[i]||null,m=y?.id??y?.reservationId??null;if(qt(r,d,u,m)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const p=un(a);if(!p){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:p,equipmentId:p,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];Kt(i,g),e&&(e.value=""),Vt(g),rt()}function La(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Fr(t),a=se(n?.barcode||t);if(!n||!a){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=$t(n);if(s==="maintenance"||s==="retired"){E(ln(s));return}const{start:r,end:i}=Nn();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:l=[]}=Ut();if(l.some(g=>se(g.barcode)===a)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=fe(),b=c!=null&&u[c]||null,y=b?.id??b?.reservationId??null;if(qt(a,r,i,y)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=un(n);if(!m){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const p=[...l,{id:m,equipmentId:m,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];Kt(c,p),Vt(p),rt(),e.value=""}function No(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),La(e))});const t=()=>{Rr(e.value,"edit-res-equipment-description-options")&&La(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{rt()});const e=()=>{zu()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{Lo()})}typeof window<"u"&&(window.getEditReservationDateRange=Nn,window.renderEditPaymentHistory=Ja);function Ju(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){As(e);return}La(e)}}function Mm(){Ot(),No()}function Yu(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let wn=null,gt=[],vt=[],js=null,Xe={},ms=!1;const Zu="__DEBUG_CREW__";function em(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(Zu);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function Yi(e,t){if(em())try{console.log(`🪵 [crew-debug:edit] ${e}`,t)}catch{}}function On(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function fa(){return document.getElementById("edit-res-confirmed")?.value==="true"}function Ut(){return{index:wn,items:gt,payments:vt}}function Kt(e,t,n=vt){wn=typeof e=="number"?e:null,gt=Array.isArray(t)?[...t]:[],vt=Array.isArray(n)?[...n]:[]}function To(){wn=null,gt=[],Gc(),vt=[]}function Ya(){return[...vt]}function gi(e){vt=Array.isArray(e)?[...e]:[]}function tm(e){e&&(vt=[...vt,e])}function nm(e){!Number.isInteger(e)||e<0||(vt=vt.filter((t,n)=>n!==e))}function Hn(e,t=1){const n=Number.parseFloat(h(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function Bs(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(h(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function am(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?se(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:Hn(e.qty??e.quantity??e.count??1),price:Bs(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function sm(e,t=0){if(!e||typeof e!="object")return null;const n=Un(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=Hn(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),r=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:Ms(e)).map(y=>am(y)).filter(Boolean),i=e.total_price??e.totalPrice??e.total??null;let c=Bs(e.unit_price??e.unitPrice??e.price??null,0);if((!c||c===0)&&i!=null){const y=Bs(i,0);y>0&&a>0&&(c=Number((y/a).toFixed(2)))}const l=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,l,n].find(y=>y!=null&&String(y).trim()!=="")||`Package ${n}`,b=e.image??e.cover??e.thumbnail??r.find(y=>y?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:h(String(u)),name:h(String(u)),qty:a,price:c,barcode:l,packageItems:r,image:b}}function im(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const r=s-n;e.set(a,r>0?r:0)})}function rm(e={},t=[]){const n=Array.isArray(t)?t.map(c=>({...c})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((c,l)=>sm(c,l)).filter(Boolean);if(!s.length)return n;const r=new Map;s.forEach(c=>{const l=Hn(c.qty??c.quantity??1);if(c.barcode){const d=se(c.barcode);if(d){const u=`package::${d}`;r.set(u,(r.get(u)??0)+l)}}(c.packageItems||[]).forEach(d=>{if(!d)return;const u=l*Hn(d.qty??d.quantity??1),b=d.equipmentId??null,y=d.normalizedBarcode||(d.barcode?se(d.barcode):null);if(b!=null){const m=`equipment::${String(b)}`;r.set(m,(r.get(m)??0)+u)}if(y){const m=`barcode::${y}`;r.set(m,(r.get(m)??0)+u)}})});const i=[];return n.forEach(c=>{if(!c||typeof c!="object"){i.push(c);return}if(c.type==="package"){const v=Un(c.packageId??c.package_id??c.id??"");s.some(q=>q.packageId===v)||i.push({...c});return}const l=Hn(c.qty??c.quantity??1),d=un(c),u=c.barcode?se(c.barcode):null,b=[];d!=null&&b.push(`equipment::${String(d)}`),u&&b.push(`barcode::${u}`);const y=b.map(v=>r.get(v)??0).filter(v=>v>0);if(!y.length){i.push({...c});return}const m=Math.min(...y);if(m<=0){i.push({...c});return}const p=Math.min(m,l);if(im(r,b,p),p>=l)return;const g=l-p;i.push({...c,qty:g,quantity:g})}),[...i,...s.map(c=>({...c}))]}function om(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function jo(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Bo(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function cm(e,t){if(e){e.value="";return}}function Dn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Do(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),l=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,d=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:l,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:d}}function lm(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((l,d)=>String(d.createdAt||d.start||"").localeCompare(String(l.createdAt||l.start||""))):[],c=[`<option value="">${Dn(a)}</option>`];i.forEach(l=>{c.push(`<option value="${Dn(l.id)}">${Dn(l.title||a)}</option>`)}),r&&!i.some(l=>String(l.id)===r)&&c.push(`<option value="${Dn(r)}">${Dn(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function Fo(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const l=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",l&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}Ds("tax");const c=Xe?.updateEditReservationSummary;typeof c=="function"&&c()}function Ds(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=Xe?.updateEditReservationSummary;typeof r=="function"&&r()};if(ms){a();return}ms=!0;const s=()=>{ms=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(an)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),ut("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?ut("edit-res-company-share"):n.checked&&(n.checked=!1));s()}async function Zi(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:l}=fe(),u=tn()?.[e];if(!u){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}Xe={...Xe,reservation:u,projects:l||[]},t?.(),lm(l||[],u);const b=u.projectId&&l?.find?.(j=>String(j.id)===String(u.projectId))||null,{effectiveConfirmed:y,projectLinked:m}=Ht(u,b),p=u.items?u.items.map(j=>({...j,equipmentId:j.equipmentId??j.equipment_id??j.id,barcode:se(j?.barcode)})):[],g=rm(u,p),I=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(j=>Do(j)).filter(Boolean);Kt(e,g,I);const q=o("reservations.list.unknownCustomer","غير معروف"),_=c?.find?.(j=>String(j.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const A=document.getElementById("edit-res-id");A&&(A.value=u.reservationId||u.id);const U=document.getElementById("edit-res-customer");U&&(U.value=_?.customerName||q);const S=typeof a=="function"?a(u.start):{date:"",time:""},x=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",S.date),n?.("edit-res-start-time",S.time),n?.("edit-res-end",x.date),n?.("edit-res-end-time",x.time);const C=document.getElementById("edit-res-notes");C&&(C.value=u.notes||"");const T=document.getElementById("edit-res-discount");if(T){const j=m?0:u.discount??0;T.value=h(j)}const X=document.getElementById("edit-res-discount-type");X&&(X.value=m?"percent":u.discountType||"percent");const k=u.projectId?!1:!!u.applyTax,F=document.getElementById("edit-res-tax");F&&(F.checked=k);const ee=document.getElementById("edit-res-company-share");if(ee){const j=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,H=j!=null?Number.parseFloat(h(String(j).replace("%","").trim())):NaN,D=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,te=D!=null?D===!0||D===1||D==="1"||String(D).toLowerCase()==="true":Number.isFinite(H)&&H>0,ue=te&&Number.isFinite(H)&&H>0?H:an,ye=k||te;ee.checked=ye,ee.dataset.companyShare=String(ue)}On(y,{disable:m});const L=document.getElementById("edit-res-paid"),B=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");L&&(L.value=B,L.dataset&&delete L.dataset.userSelected);const $=document.getElementById("edit-res-payment-progress-type"),K=document.getElementById("edit-res-payment-progress-value");$?.dataset?.userSelected&&delete $.dataset.userSelected,$&&($.value="percent"),cm(K);const G=document.getElementById("edit-res-cancelled");if(G){const j=String(u?.status||u?.reservationStatus||"").toLowerCase();G.checked=["cancelled","canceled"].includes(j),G.checked&&On(y,{disable:!0})}let R=Array.isArray(u.crewAssignments)&&u.crewAssignments.length?u.crewAssignments:Array.isArray(u.techniciansDetails)&&u.techniciansDetails.length?u.techniciansDetails:(u.technicians||[]).map(j=>String(j));if(!Array.isArray(R)||R.length===0){const j=Wc(u.id??u.reservationId??u.reservation_code??null);Array.isArray(j)&&j.length&&(R=j)}try{await mr()}catch(j){console.warn("[reservationsEdit] positions load failed (non-fatal)",j)}if(Xc(R),s?.(g),typeof window<"u"){const j=window?.renderEditPaymentHistory;typeof j=="function"&&j()}Fo(),r?.();const Y=document.getElementById("editReservationModal");js=om(Y,i),js?.show?.()}async function dm({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:r,populateEquipmentDescriptionLists:i,handleReservationsMutation:c}={}){if(wn===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const l=document.getElementById("edit-res-start")?.value?.trim(),d=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),b=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",y=document.getElementById("edit-res-notes")?.value||"",m=h(document.getElementById("edit-res-discount")?.value||"0");let p=parseFloat(m)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const v=fa(),I=document.getElementById("edit-res-paid"),q=I?.dataset?.userSelected==="true",_=q&&I?.value||"unpaid",A=document.getElementById("edit-res-payment-progress-type"),U=document.getElementById("edit-res-payment-progress-value"),S=jo(A),x=Bo(U),C=document.getElementById("edit-res-project")?.value||"",X=document.getElementById("edit-res-cancelled")?.checked===!0,k=Kc();k.map(O=>O?.technicianId).filter(Boolean);const F=document.getElementById("edit-res-company-share"),ee=document.getElementById("edit-res-tax");if(!l||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const L=typeof e=="function"?e:(O,P)=>`${O}T${P||"00:00"}`,B=L(l,d),$=L(u,b);if(B&&$&&new Date(B)>new Date($)){E(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const G=tn()?.[wn];if(!G){E(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(gt)||gt.length===0&&k.length===0){E(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const R=typeof t=="function"?t:()=>!1,Y=G.id??G.reservationId;for(const O of gt){if(O?.type==="package"&&Array.isArray(O.packageItems)){for(const J of O.packageItems){const V=J?.barcode??J?.normalizedBarcode??"";if(!V)continue;const ce=$t(V);if(ce==="reserved"){const pe=se(V);if(!R(pe,B,$,Y))continue}if(ce!=="available"){E(ln(ce));return}}continue}const P=$t(O.barcode);if(P==="reserved"){const J=se(O.barcode);if(!R(J,B,$,Y))continue}if(P!=="available"){E(ln(P));return}}for(const O of gt){if(O?.type==="package"&&Array.isArray(O.packageItems)){for(const J of O.packageItems){const V=se(J?.barcode??J?.normalizedBarcode??"");if(V&&R(V,B,$,Y)){const ce=J?.desc||J?.barcode||o("reservations.create.packages.unnamedItem","معدة بدون اسم"),pe=`${o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${h(String(ce))})`;E(pe);return}}continue}const P=se(O.barcode);if(R(P,B,$,Y)){E(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const j=typeof n=="function"?n:()=>!1;for(const O of gt){if(O?.type!=="package")continue;const P=O.packageId??O.package_id??null;if(P&&j(P,B,$,Y)){const J=O.desc||O.packageName||o("reservations.create.packages.genericName","الحزمة");E(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${h(String(J))} محجوزة بالفعل في الفترة المختارة`));return}}const H=typeof a=="function"?a:()=>!1;for(const O of k)if(O?.technicianId&&H(O.technicianId,B,$,Y)){E(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const D=Array.isArray(Xe.projects)&&Xe.projects.length?Xe.projects:fe().projects||[],te=C&&D.find(O=>String(O.id)===String(C))||null,ue={...G,projectId:C?String(C):null,confirmed:v},{effectiveConfirmed:ye,projectLinked:we,projectStatus:qe}=Ht(ue,te);let Q=!!F?.checked,re=!!ee?.checked;if(we&&(Q&&(F.checked=!1,Q=!1),re=!1),!we&&Q!==re){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}re&&(ut("edit-res-company-share"),Q=!!F?.checked);let be=Q?getCompanySharePercent("edit-res-company-share"):null;Q&&(!Number.isFinite(be)||be<=0)&&(ut("edit-res-company-share"),be=getCompanySharePercent("edit-res-company-share"));const He=Q&&re&&Number.isFinite(be)&&be>0,Qe=we?!1:re;we&&(p=0,g="percent");const W=Hs(gt,p,g,Qe,k,{start:B,end:$,companySharePercent:He?be:0});let oe=Ya();if(Number.isFinite(x)&&x>0){const O=W;let P=null,J=null;S==="amount"?(P=x,O>0&&(J=x/O*100)):(J=x,O>0&&(P=x/100*O));const V=Do({type:S,value:x,amount:P,percentage:J,recordedAt:new Date().toISOString()});V&&(oe=[...oe,V],gi(oe)),U&&(U.value="")}const le=Vs({totalAmount:W,history:oe}),Ae=Us({manualStatus:_,paidAmount:le.paidAmount,paidPercent:le.paidPercent,totalAmount:W});I&&!q&&(I.value=Ae,I.dataset&&delete I.dataset.userSelected);let je=G.status??"pending";we?je=te?.status??qe??je:X?je="cancelled":["completed","cancelled"].includes(String(je).toLowerCase())||(je=v?"confirmed":"pending");const pt=cr({reservationCode:G.reservationCode??G.reservationId??null,customerId:G.customerId,start:B,end:$,status:je,title:G.title??null,location:G.location??null,notes:y,projectId:C?String(C):null,totalAmount:W,discount:p,discountType:g,applyTax:Qe,paidStatus:Ae,confirmed:ye,items:gt.map(O=>({...O,equipmentId:O.equipmentId??O.id})),crewAssignments:k,companySharePercent:He?be:null,companyShareEnabled:He,paidAmount:le.paidAmount,paidPercentage:le.paidPercent,paymentProgressType:le.paymentProgressType,paymentProgressValue:le.paymentProgressValue,paymentHistory:oe});try{Yi("about to submit",{editingIndex:wn,crewAssignments:k,techniciansPayload:pt?.technicians,payload:pt});const O=await Qc(G.id||G.reservationId,pt);Yi("server response",{reservation:O?.id??O?.reservationId??O?.reservation_code,technicians:O?.technicians,crewAssignments:O?.crewAssignments,techniciansDetails:O?.techniciansDetails}),await pr(),Cn(),sn(),Ke(),E(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),To(),c?.({type:"updated",reservation:O}),r?.(),i?.(),js?.hide?.()}catch(O){console.error("❌ [reservationsEdit] Failed to update reservation",O);const P=Da(O)?O.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");E(P,"error")}}function zm(e={}){Xe={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=Xe,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=h(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{Ds("tax")}),c.dataset.listenerAttached="true");const l=document.getElementById("edit-res-company-share");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{Ds("share")}),l.dataset.listenerAttached="true");const d=document.getElementById("edit-res-payment-progress-type");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{d.dataset.userSelected="true",t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const b=document.getElementById("edit-res-project");b&&!b.dataset.listenerAttached&&(b.addEventListener("change",()=>{Fo();const I=Array.isArray(Xe.projects)&&Xe.projects.length?Xe.projects:fe().projects||[],q=b.value&&I.find(x=>String(x.id)===String(b.value))||null,A={...Xe?.reservation??{},projectId:b.value||null,confirmed:fa()},{effectiveConfirmed:U,projectLinked:S}=Ht(A,q);On(U,{disable:S}),t?.()}),b.dataset.listenerAttached="true");const y=document.getElementById("edit-res-confirmed-btn");y&&!y.dataset.listenerAttached&&(y.addEventListener("click",()=>{if(y.disabled)return;const I=!fa();On(I),t?.()}),y.dataset.listenerAttached="true");const m=document.getElementById("edit-res-cancelled");m&&!m.dataset.listenerAttached&&(m.addEventListener("change",()=>{document.getElementById("edit-res-confirmed-btn")&&On(fa(),{disable:m.checked}),t?.()}),m.dataset.listenerAttached="true");const p=document.getElementById("save-reservation-changes");p&&!p.dataset.listenerAttached&&(p.addEventListener("click",()=>{dm(Xe).catch(I=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",I)})}),p.dataset.listenerAttached="true");const g=document.getElementById("edit-res-equipment-barcode");if(g&&!g.dataset.listenerAttached){let I=null;const q=()=>{g.value?.trim()&&(clearTimeout(I),I=null,n?.(g))};g.addEventListener("keydown",A=>{A.key==="Enter"&&(A.preventDefault(),q())});const _=()=>{if(clearTimeout(I),!g.value?.trim())return;const{start:A,end:U}=getEditReservationDateRange();!A||!U||(I=setTimeout(()=>{q()},150))};g.addEventListener("input",_),g.addEventListener("change",q),g.dataset.listenerAttached="true"}No?.();const v=document.getElementById("editReservationModal");v&&!v.dataset.cleanupAttached&&(v.addEventListener("hidden.bs.modal",()=>{To(),t?.(),s?.([])}),v.dataset.cleanupAttached="true")}const um=fe()||{};let dt=(um.projects||[]).map(zo),Yn=!1;function mm(){return dt}function Zn(e){dt=Array.isArray(e)?e.map(hi):[],Ta({projects:dt});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return dt}async function Ro(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,l])=>{l==null||l===""||t.set(c,String(l))});const n=t.toString(),s=(await mt(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(Za);return Zn(i),Yn=!0,dt}async function Mo({force:e=!1,params:t=null}={}){if(!e&&Yn&&dt.length>0)return dt;try{return await Ro(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),dt}}async function pm(e){const t=await mt("/projects/",{method:"POST",body:e}),n=Za(t?.data??{}),a=[...dt,n];return Zn(a),Yn=!0,n}async function fm(e,t){const n=await mt(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=Za(n?.data??{}),s=dt.map(r=>String(r.id)===String(e)?a:r);return Zn(s),Yn=!0,a}async function ym(e){await mt(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=dt.filter(n=>String(n.id)!==String(e));Zn(t),Yn=!0}function bm({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:l,paymentStatus:d,equipmentEstimate:u=0,expenses:b=[],servicesClientPrice:y=0,taxAmount:m=0,totalWithTax:p=0,discount:g=0,discountType:v="percent",companyShareEnabled:I=!1,companySharePercent:q=null,companyShareAmount:_=0,paidAmount:A=null,paidPercentage:U=null,paymentProgressType:S=null,paymentProgressValue:x=null,confirmed:C=!1,technicians:T=[],equipment:X=[],payments:k,paymentHistory:F}={}){const ee=Array.isArray(T)?T.map(H=>Number.parseInt(String(H),10)).filter(H=>Number.isInteger(H)&&H>0):[],L=Array.isArray(X)?X.map(H=>{const D=Number.parseInt(String(H.equipmentId??H.equipment_id??H.id??0),10),te=Number.parseInt(String(H.qty??H.quantity??0),10);return!Number.isInteger(D)||D<=0?null:{equipment_id:D,quantity:Number.isInteger(te)&&te>0?te:1}}).filter(Boolean):[],B=Array.isArray(b)?b.map(H=>{const D=Number.parseFloat(H?.amount??H?.value??0)||0,te=(H?.label??H?.name??"").trim();if(!te)return null;const ue=Number.parseFloat(H?.salePrice??H?.sale_price??0)||0;return{label:te,amount:Math.round(D*100)/100,sale_price:Math.max(0,Math.round(ue*100)/100)}}).filter(Boolean):[],$=B.reduce((H,D)=>H+(D?.amount??0),0),K={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!l,payment_status:d??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round($*100)/100,services_client_price:Number.isFinite(Number(y))?Math.round(Number(y)*100)/100:0,tax_amount:Math.round((Number.parseFloat(m)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(p)||0)*100)/100,confirmed:!!C,technicians:ee,equipment:L,expenses:B},G=Math.max(0,Number.parseFloat(g)||0);K.discount=G,K.discount_type=v==="amount"?"amount":"percent";const R=Number.parseFloat(q),Y=!!I&&Number.isFinite(R)&&R>0;K.company_share_enabled=Y,K.company_share_percent=Y?R:0,K.company_share_amount=Y?Math.max(0,Number.parseFloat(_)||0):0,Number.isFinite(Number(A))&&(K.paid_amount=Math.max(0,Number.parseFloat(A)||0)),Number.isFinite(Number(U))&&(K.paid_percentage=Math.max(0,Number.parseFloat(U)||0)),(S==="amount"||S==="percent")&&(K.payment_progress_type=S),x!=null&&x!==""&&(K.payment_progress_value=Number.parseFloat(x)||0),e&&(K.project_code=String(e).trim());const j=k!==void 0?k:F;if(j!==void 0){const H=Oo(j)||[];K.payments=H.map(D=>({type:D.type,amount:D.amount!=null?D.amount:null,percentage:D.percentage!=null?D.percentage:null,value:D.value!=null?D.value:null,note:D.note??null,recorded_at:D.recordedAt??null}))}return K.end_datetime||delete K.end_datetime,K.client_company||(K.client_company=null),K}function Za(e={}){return hi(e)}function zo(e={}){return hi(e)}function hi(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(m=>{if(m==null)return null;if(typeof m=="object"){const p=m.id??m.technician_id??m.technicianId;return p!=null?String(p):null}return String(m)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(m=>{const p=m?.equipment_id??m?.equipmentId??m?.id??null,g=m?.quantity??m?.qty??0,v=m?.barcode??m?.code??"",I=m?.description??m?.name??"";return{equipmentId:p!=null?String(p):null,qty:Number.parseInt(String(g),10)||0,barcode:v,description:I}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((m,p)=>({id:m?.id??`expense-${t??"x"}-${p}`,label:m?.label??"",amount:Number.parseFloat(m?.amount??0)||0,salePrice:Number.parseFloat(m?.sale_price??m?.salePrice??0)||0})),l=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,d=e.company_share_enabled??e.companyShareEnabled,u=d!=null?d===!0||d===1||String(d).toLowerCase()==="true":l>0,b=e.payment_history??e.paymentHistory??e.payments??null,y=Oo(b);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,servicesClientPrice:Number.parseFloat(e.services_client_price??e.servicesClientPrice??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?l:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(m=>typeof m=="object"?m:{id:m}),equipment:r,expenses:c,paymentHistory:y}}function gm(e){return e instanceof er}function ps(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function hm(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=ps(e.value);let s=ps(e.amount),r=ps(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,l=e.recordedAt??e.recorded_at??e.date??null;let d=null;if(l){const b=new Date(l);Number.isNaN(b.getTime())||(d=b.toISOString())}d||(d=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:d}}function Oo(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>hm(t)).filter(Boolean):[]}const Om=Object.freeze(Object.defineProperty({__proto__:null,buildProjectPayload:bm,createProjectApi:pm,deleteProjectApi:ym,ensureProjectsLoaded:Mo,getProjectsState:mm,isApiError:gm,mapLegacyProject:zo,mapProjectFromApi:Za,refreshProjectsFromApi:Ro,setProjectsState:Zn,updateProjectApi:fm},Symbol.toStringTag,{value:"Module"})),Na="reservations-ui:ready",Zt=typeof EventTarget<"u"?new EventTarget:null;let en={};function vm(e){return Object.freeze({...e})}function qm(){if(!Zt)return;const e=en,t=typeof CustomEvent=="function"?new CustomEvent(Na,{detail:e}):{type:Na,detail:e};typeof Zt.dispatchEvent=="function"&&Zt.dispatchEvent(t)}function Sm(e={}){if(!e||typeof e!="object")return en;const t={...en};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),en=vm(t),qm(),en}function Em(e){if(e)return en?.[e]}function Hm(e){const t=Em(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const i=(s?.detail||en)?.[e];typeof i=="function"&&(Zt&&Zt.removeEventListener(Na,a),n(i))};Zt&&Zt.addEventListener(Na,a)})}function Vm(){return Mo().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=fe()||{};Jc(e||[]),Kr()})}function vi(e=null){Kr(),Ho(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function wm(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Fs(){return{populateEquipmentDescriptionLists:Ot,setFlatpickrValue:Yu,splitDateTime:sr,renderEditItems:Vt,updateEditReservationSummary:rt,addEquipmentByDescription:Ju,addEquipmentToEditingReservation:Xu,addEquipmentToEditingByDescription:La,combineDateTime:Vn,hasEquipmentConflict:qt,hasTechnicianConflict:or,renderReservations:Ho,handleReservationsMutation:vi,ensureModal:wm}}function Ho(e="reservations-list",t=null){ju({containerId:e,filters:t,onShowDetails:Vo,onConfirmReservation:Ko})}function Vo(e){return Bu(e,{getEditContext:Fs,onEdit:(t,{reservation:n})=>{Qo(t,n)},onDelete:Uo})}function Uo(e){return dn()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?Fu(e,{onAfterChange:vi}):!1:(Gn(),!1)}function Ko(e){return Ru(e,{onAfterChange:vi})}function Qo(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}Zi(e,Fs());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}Zi(e,Fs());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}Tc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Um(){Sm({showReservationDetails:Vo,deleteReservation:Uo,confirmReservation:Ko,openReservationEditor:Qo})}export{_m as $,Ro as A,Um as B,Mo as C,ym as D,pm as E,Pm as F,zm as G,Vm as H,Mm as I,km as J,vi as K,Kr as L,Nm as M,rt as N,Lm as O,Tm as P,Fs as Q,ve as R,Uo as S,Ko as T,Qo as U,Yu as V,$n as W,il as X,ha as Y,Im as Z,wl as _,Ke as a,Om as a0,Ri as b,Xr as c,Jr as d,Rm as e,Ho as f,Qr as g,Em as h,bm as i,Sm as j,Vo as k,jm as l,Za as m,Bm as n,mm as o,gm as p,pd as q,Xn as r,Yr as s,Gr as t,fm as u,Dm as v,Hm as w,Fm as x,$m as y,Cm as z};
