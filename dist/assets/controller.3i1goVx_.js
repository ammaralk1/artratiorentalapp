import{n as h,l as pe,A as Lc,t as o,a as pt,s as E,u as dn,c as Gn,d as Na,b as er,z as jc,f as it,B as tr,o as Nc}from"./auth.UdF5b_hJ.js";import{B as ie,C as St,E as nr,F as Tc,D as an,G as Rs,n as Ze,H as ar,I as Ii,J as Vn,K as Un,L as Ta,M as Bc,N as Ms,O as Et,P as zs,Q as kn,R as sr,S as Os,T as Dc,U as Fc,V as Rc,W as ir,X as un,Y as ya,Z as Mc,_ as Ba,$ as rr,a0 as or,a as Hs,o as Vs,q as Us,a1 as cr,a2 as zc,s as sn,h as Da,a3 as Oc,a4 as lr,a5 as Hc,i as Ks,r as Vt,a6 as Qs,a7 as Bt,a8 as ba,m as Ie,p as Fe,y as Fa,b as dr,a9 as ur,g as Rt,aa as fs,j as mr,z as Vc,ab as Uc,l as pr,ac as ys,ad as Kc,u as Qc,ae as Gc,af as Wc,ag as Xc,ah as Jc}from"./reservationsService.DLOwRXAg.js";const is="select.form-select:not([data-no-enhance]):not([multiple])",At=new WeakMap;let rs=null,_i=!1,It=null;function Im(e=document){e&&(e.querySelectorAll(is).forEach(t=>la(t)),!rs&&e===document&&(rs=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(is)&&la(a),a.querySelectorAll?.(is).forEach(s=>la(s)))})}),rs.observe(document.body,{childList:!0,subtree:!0})),_i||(_i=!0,document.addEventListener("pointerdown",el,{capture:!0})))}function ca(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){la(e);return}const t=e.closest(".enhanced-select");t&&(Gs(t),ga(t),bs(t))}function la(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){ca(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const i={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};At.set(t,i),a.addEventListener("click",()=>Zc(t)),a.addEventListener("keydown",r=>tl(r,t)),s.addEventListener("click",r=>al(r,t)),s.addEventListener("keydown",r=>nl(r,t)),e.addEventListener("change",()=>{ga(t),fr(t)}),i.observer=new MutationObserver(r=>{let c=!1,l=!1;for(const d of r)d.type==="attributes"&&d.attributeName==="disabled"&&(l=!0),d.type==="childList"&&(c=!0);l&&bs(t),c&&Yc(i,t)}),i.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),Gs(t),ga(t),bs(t)}function Yc(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,Gs(t),ga(t)})))}function Gs(e){const t=At.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),i=document.createDocumentFragment();s.forEach(r=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=r.textContent??r.value??"",c.dataset.value=r.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),r.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),r.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),i.appendChild(c)}),a.innerHTML="",a.appendChild(i),fr(e)}function ga(e){const t=At.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],i=s?.textContent?.trim()||s?.value||"";a.textContent=i}function fr(e){const t=At.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(r=>{const c=r.dataset.value===s;r.toggleAttribute("aria-selected",c),r.dataset.selected=c?"true":"",r.setAttribute("tabindex",c?"0":"-1")})}function bs(e){const t=At.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function Zc(e){At.get(e)&&(e.getAttribute("data-open")==="true"?$n(e):yr(e))}function yr(e){const t=At.get(e);if(!t)return;It&&It!==e&&$n(It,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),It=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function $n(e,{focusTrigger:t=!0}={}){const n=At.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),It===e&&(It=null))}function el(e){if(!It)return;const t=e.target;t instanceof Node&&(It.contains(t)||$n(It,{focusTrigger:!1}))}function tl(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),yr(t)):n==="Escape"&&$n(t)}function nl(e,t){const n=e.key,a=At.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const i=s.findIndex(r=>r===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(i+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const r=document.activeElement;r&&r.classList.contains("enhanced-select__option")&&br(r,t)}else n==="Escape"&&(e.preventDefault(),$n(t))}function al(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&br(n,t)}function br(e,t){const n=At.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),$n(t)}const Pn=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let _t=null;function Ws(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function gr(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function sl(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function il(e={}){const t=sl({...e,activatedAt:Date.now()});return _t=t,gr(!0,t.mode||"create"),Ws(Pn.change,{active:!0,selection:{...t}}),t}function ha(e="manual"){if(!_t)return;const t=_t;_t=null,gr(!1),Ws(Pn.change,{active:!1,previous:t,reason:e})}function hr(){return!!_t}function rl(){return _t?{..._t}:null}function ol(e){if(!_t)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=h(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:i,description:r}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const l=c.map(u=>h(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!l.length)return!1;const d=Number.isInteger(s)&&s>0?s:l.length;t={barcodes:l,quantity:Math.min(d,l.length)},i&&(t.groupKey=i),r&&(t.description=r)}else return!1;return Ws(Pn.requestAdd,{...t,selection:{..._t}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||ha("tab-changed")});const cl=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),ll=new Set(["maintenance","reserved","retired"]);function dl(e){const t=String(e??"").trim().toLowerCase();return t&&cl.get(t)||"available"}function ul(e){return e?typeof e=="object"?e:Ra(e):null}function Pt(e){const t=ul(e);return t?dl(t.status||t.state||t.statusLabel||t.status_label):"available"}function vr(e){return!ll.has(Pt(e))}function mn(e={}){return e.image||e.imageUrl||e.img||""}function ml(e){if(!e)return null;const t=ie(e),{equipment:n=[]}=pe();return(n||[]).find(a=>ie(a?.barcode)===t)||null}function Ra(e){const t=ie(e);if(!t)return null;const{equipment:n=[]}=pe();return(n||[]).find(a=>ie(a?.barcode)===t)||null}const pl=pe()||{};let Dt=(pl.equipment||[]).map(bl),gs=!1,vn="",Zt=null,rn=null,on=null,Ma=!1,ki=!1;function fl(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function yl(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function bl(e={}){return Xs({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function za(e={}){return Xs(e)}function Xs(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",i=Wn(e.quantity??e.qty??0),r=Oa(e.unit_price??e.price??0),c=h(String(e.barcode??"").trim()),l=Ke(e.status??e.state??e.status_label??e.statusLabel??"available"),d=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:gl(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:i,price:r,barcode:c,status:l,image:d,imageUrl:d,created_at:e.created_at??null,updated_at:e.updated_at??null}}function gl(e){return e!=null&&e!==""}function Wn(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function Oa(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function hl(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const i=s.length-a.length,r=t+i,c=n+i;e.setSelectionRange(r,c)}}),e.dataset.englishDigitsAttached="true")}function $i(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function vl(e,t){const n=$i(e),a=$i(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,i=s.test(n),r=s.test(a);if(i&&r){if(n.length!==a.length)return n.length-a.length;const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}else{if(i!==r)return i?-1:1;{const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}}const c=qa(e?.desc||e?.description||e?.name||""),l=qa(t?.desc||t?.description||t?.name||"");return c.localeCompare(l,"ar",{sensitivity:"base"})}function Re(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ke(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function ql(e){return Ke(e)}function va(){if(!hr())return null;const e=rl();return e?{...e}:null}function Sl(e){const t=va();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:i=null}=t,r=t?.mode||t?.source||"",c=[],l=new Set;if(n.forEach(y=>{const m=ie(y?.barcode);!m||l.has(m)||(l.add(m),c.push({variant:y,barcode:m}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(r==="package-manager"||r==="equipment-packages"){const y=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:m})=>m),maxQuantity:y,reason:""}}const d=c.filter(({variant:y})=>{const m=Ke(y?.status);return m!=="maintenance"&&m!=="retired"});if(!a||!s)return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=d.filter(({barcode:y})=>!St(y,a,s,i));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:y})=>y),maxQuantity:u.length};let b=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(d.length>0)b=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const y=new Set(c.map(({variant:m})=>Ke(m?.status)));y.has("maintenance")?b=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):y.has("reserved")?b=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):y.has("retired")&&(b=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:b,availableBarcodes:[],maxQuantity:0}}function El(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function qr(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=va();e.hidden=!s;const i=s?.mode||s?.source||"";s?i==="package-manager"||i==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=va(),l=c?.mode||c?.source||"";l==="package-manager"||l==="equipment-packages"?ha("package-finish-button"):(ha("return-button"),El())}),t.dataset.listenerAttached="true")}function rt(){return Dt}function cn(e){Dt=Array.isArray(e)?e.map(Xs):[],Na({equipment:Dt}),yl()}function qa(e){return String(e??"").trim().toLowerCase()}function zt(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=qa(t);return n||(n=qa(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function Ha(e){const t=zt(e);return t?rt().filter(n=>zt(n)===t):[]}function Va(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=Ua(e);if(n){const a=Re(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${Re(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function Js(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function Sa(){const e=Js();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function Ys(e={}){const t=Js();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function wn(e){Ma=e;const t=Js(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(r=>{r&&(e?r.removeAttribute("disabled"):r.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const r=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(r,c),a.dataset.mode=e?"save":"view"}if(e){const r=t.description||t.category||t.subcategory;r&&setTimeout(()=>{r.focus(),typeof r.select=="function"&&r.select()},0)}}async function Al(e){if(!dn()){Gn();return}if(!e)return;try{await xl()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),i=s.Sheets[s.SheetNames[0]],r=XLSX.utils.sheet_to_json(i,{defval:""});if(!Array.isArray(r)||r.length===0){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let l=0;if(r.forEach(d=>{const u=d.القسم??d.category??"",b=d["القسم الثانوي"]??d.subcategory??"",y=d.الوصف??d.description??d.name??"",m=d.الكمية??d.quantity??0,p=d.السعر??d.price??0,g=d.الباركود??d.barcode??"",v=d.الحالة??d.status??"متاح",_=d.الصورة??d.image_url??d.image??"",q=h(String(g||"")).trim();if(!y||!q){l+=1;return}c.push(Zs({category:u,subcategory:b,description:y,quantity:m,unit_price:p,barcode:q,status:v,image_url:_}))}),!c.length){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const d=await pt("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(d?.data)?d.data.map(za):[];if(u.length){const m=[...rt(),...u];cn(m)}await Xn({showToastOnError:!1}),Qe();const b=d?.meta?.count??u.length,y=[];b&&y.push(`${b} ✔️`),l&&y.push(`${l} ⚠️`),E(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(y.length?` (${y.join(" / ")})`:""))}catch(d){const u=Ln(d,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");E(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const wl="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let Nn=null;function xl(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):Nn||(Nn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",i,{once:!0});return}const a=document.createElement("script");a.src=wl,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",i,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function i(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),Nn=null,e}),Nn)}function Zs({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:i="",status:r="متاح",image_url:c=""}){const l=h(String(i||"")).trim(),d=ql(r);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:Wn(a),unit_price:Oa(s),barcode:l,status:d,image_url:c?.trim()||null}}async function Sr(){if(!dn()){Gn();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await pt("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await Xn({showToastOnError:!1}),E(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=Ln(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");E(t,"error")}}function Ua(e){return e.image||e.imageUrl||e.img||""}function Il(e){const t=Ke(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function Ea(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${Re(a)}</td></tr>`}n&&(n.textContent="0")}function Er(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const i=Zt?.groupKey||zt(e);if(!i){Ea();return}const r=rt().filter(b=>zt(b)===i).sort((b,y)=>{const m=String(b.barcode||"").trim(),p=String(y.barcode||"").trim();return!m&&!p?0:m?p?m.localeCompare(p,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!r.length){Ea();return}t.hidden=!1,a&&(a.textContent=String(r.length));const c=o("equipment.modal.variants.current","الحالي"),l=o("equipment.form.labels.quantity","الكمية"),d=rt(),u=r.map(b=>{const y=b.id&&e.id?String(b.id)===String(e.id):String(b.barcode||"")===String(e.barcode||""),m=y?"equipment-variants-table__row--current":"",p=Re(String(b.barcode||"-")),g=y?`<span class="equipment-variants-current-badge">${Re(c)}</span>`:"",v=h(String(Number.isFinite(Number(b.qty))?Number(b.qty):0)),_=d.indexOf(b),q=Re(o("equipment.item.actions.delete","🗑️ حذف")),k=_>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${_}">${q}</button>
          </div>`:"";return`
        <tr class="${m}">
          <td>
            ${p}
            ${g}
          </td>
          <td>${Il(b.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${Re(l)}">${v}</span>
          </td>
          <td class="table-actions-cell">${k}</td>
        </tr>
      `}).join("");n.innerHTML=u}function _l({item:e,index:t}){const n=Ua(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),i=o("equipment.item.currency","SR"),r=dn(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},l=Number.isFinite(Number(e.qty))?Number(e.qty):0,d=Number.isFinite(Number(e.price))?Number(e.price):0,u=l.toLocaleString("en-US"),b=d.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),y=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,m=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,p=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(l-y-m,0),g=p.toLocaleString("en-US"),v=o("equipment.card.labels.availableOfTotal","من أصل"),_=Ke(e.status);let q=`${Re(c.available)}: ${Re(g)} ${Re(v)} ${Re(u)}`,k="available";if(p===0){const V={reserved:{text:l===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},R=V[_]||V.default;q=Re(R.text),k=R.modifier}const x=`<span class="equipment-card__availability equipment-card__availability--${k}">${q}</span>`,U="",S=e.desc||e.name||"—",w=e.name&&e.name!==e.desc?e.name:"",j=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${b} ${i}`}].map(({label:V,value:R})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${V}</span>
              <span class="equipment-card__detail-value">${R}</span>
            </span>
          `).join("")}
    </div>`,W=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),$=W.length?`<div class="equipment-card__categories">${W.map(({label:V,value:R})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${V}</span>
              <span class="equipment-card__detail-value">${R}</span>
            </div>
          `).join("")}</div>`:"",F=w?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${w}</span>
      </div>`:"",N=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${S}</h3>
    </div>
  `}
      ${j}
    </div>
  `,T=[],P=Sl(e),H=P?.availableBarcodes?.length?P.availableBarcodes.join(","):P?.barcode?P.barcode:"";let Q="",D="";if(P.active){const V=`equipment-select-qty-${t}`,R=!!P.canSelect,ee=R?Math.max(1,Number(P.maxQuantity||P.availableBarcodes?.length||1)):1,me=Math.max(1,Math.min(ee,99)),de=[];for(let qe=1;qe<=me;qe+=1){const Be=h(String(qe));de.push(`<option value="${qe}"${qe===1?" selected":""}>${Be}</option>`)}const Ee=R?"":" disabled",ge=o("reservations.create.equipment.selector.quantityLabel","الكمية"),G=R?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${h(String(ee))}`:P.reason?P.reason:"";Q=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${V}">${ge}</label>
        <select class="equipment-card__quantity-select" id="${V}" data-equipment-select-quantity${Ee}>
          ${de.join("")}
        </select>
        ${G?`<span class="equipment-card__selection-hint">${Re(G)}</span>`:""}
      </div>
    `;const te=va(),we=te?.mode||te?.source||"",Ge=we==="package-manager"||we==="equipment-packages"?o("equipment.packages.selection.addToPackage","➕ أضف إلى الحزمة"):o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),Y=R?"":" disabled",ne=P.reason?` title="${Re(P.reason)}"`:"",le=['data-equipment-action="select-reservation"',`data-selection-max="${R?ee:0}"`];H&&le.push(`data-selection-barcodes="${Re(H)}"`),e.groupKey&&le.push(`data-selection-group="${Re(String(e.groupKey))}"`),D=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${le.join(" ")}${Y}${ne}>${Ge}</button>
    `}r&&T.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const J=T.length?T.join(`
`):"",B=Re(S);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${Re(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${B}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${U}
        ${x}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${N}
        </div>
      </div>
      <div class="equipment-card__body">
        ${$}
        ${F}
      </div>
      ${Q||D||J?`<div class="equipment-card__actions equipment-card__actions--center">
            ${Q}
            ${D}
            ${J}
          </div>`:""}
    </article>
  `}function kl(e){const t=[...new Set(e.map(r=>r.category).filter(Boolean))],n=[...new Set(e.map(r=>r.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const r=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,a.appendChild(l)}),t.includes(r)&&(a.value=r),ca(a)}if(s){const r=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,s.appendChild(l)}),n.includes(r)&&(s.value=r),ca(s)}const i=document.getElementById("filter-status");i&&ca(i)}function Cn(){const e=pe();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return Dt=t||[],Dt;const s=new Date;let i=!1;const r=new Set((a||[]).filter(l=>l?.status==="open").map(l=>h(String(l?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(l=>{if(!l)return l;const d=Ke(l.status),u=h(String(l.barcode??"")).trim().toLowerCase(),b=u&&r.has(u);let y=b?"maintenance":"available";if(!b&&u)for(const m of n||[]){if(!$l(m,s))continue;if(m.items?.some(g=>h(String(g?.barcode??"")).trim().toLowerCase()===u)){y="reserved";break}}return y!==d?(i=!0,{...l,status:y}):{...l,status:y}});return i?cn(c):(Dt=c,Na({equipment:Dt})),Dt}function $l(e,t){if(!e?.start||!e?.end)return!1;const n=String(e?.status||e?.reservationStatus||"").toLowerCase();if(n==="cancelled"||n==="canceled")return!1;const a=new Date(e.start),s=new Date(e.end);return Number.isNaN(a.getTime())||Number.isNaN(s.getTime())?!1:a<=t&&t<s}function os(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Qe(){const e=document.getElementById("equipment-list");if(!e)return;qr();const t=Cn(),n=Array.isArray(t)?t:rt(),a=new Map;n.forEach(g=>{if(!g)return;const v=zt(g);v&&(a.has(v)||a.set(v,[]),a.get(v).push(g))});const s=Array.from(a.values()).map(g=>{const v=g[0],_=g.reduce((w,L)=>w+(Number.isFinite(Number(L.qty))?Number(L.qty):0),0),q=["maintenance","reserved","available","retired"],k=g.map(w=>Ke(w.status)).sort((w,L)=>q.indexOf(w)-q.indexOf(L))[0]||"available",x=g.reduce((w,L)=>{const j=Wn(L?.qty??0)||0,W=Ke(L?.status);return W==="reserved"?w.reserved+=j:W==="maintenance"&&(w.maintenance+=j),w},{reserved:0,maintenance:0}),U=Math.max(_-x.reserved-x.maintenance,0);return{item:{...v,qty:_,status:k,variants:g,groupKey:zt(v),reservedQty:x.reserved,maintenanceQty:x.maintenance,availableQty:U},index:n.indexOf(v)}});s.sort((g,v)=>vl(g.item,v.item));const i=document.getElementById("search-equipment")?.value||"",r=h(i).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",l=document.getElementById("filter-sub")?.value||"",d=document.getElementById("filter-status")?.value||"",u=d?Ke(d):"";if(gs&&!n.length){e.innerHTML=os(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(vn&&!n.length){e.innerHTML=os(vn,{tone:"error",icon:"⚠️"});return}const b=s.filter(({item:g})=>{const v=h(String(g.barcode??"")).toLowerCase().trim(),_=Array.isArray(g.variants)?g.variants.map(S=>h(String(S.barcode??"")).toLowerCase().trim()).filter(Boolean):[],q=!r||g.name&&g.name.toLowerCase().includes(r)||g.desc&&g.desc.toLowerCase().includes(r)||v&&v.includes(r)||_.some(S=>S.includes(r))||g.category&&g.category.toLowerCase().includes(r)||g.sub&&g.sub.toLowerCase().includes(r),k=!c||g.category===c,x=!l||g.sub===l,U=!u||Ke(g.status)===u;return q&&k&&x&&U}),y=r?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),m=b;e.innerHTML=m.length?m.map(_l).join(""):os(y);const p=document.getElementById("equipment-list-count");if(p){const g=o("equipment.list.countSuffix","عنصر"),v=h(String(m.length)),_=m.length?`${v} ${g}`:`0 ${g}`;p.textContent=_}kl(n)}async function Xn({showToastOnError:e=!0}={}){gs=!0,vn="",Qe();try{const t=await pt("/equipment/?all=1"),n=t?.data??t;let a=[];Array.isArray(n)?a=n:n&&typeof n=="object"&&(Array.isArray(n.items)?a=n.items:Array.isArray(n.results)?a=n.results:Array.isArray(n.data)?a=n.data:Array.isArray(n.records)&&(a=n.records));const s=a.map(za);cn(s)}catch(t){t&&typeof t=="object"&&Number(t.status)===401?vn="":(vn=Ln(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&E(vn,"error"))}finally{gs=!1,Qe()}}function Ln(e,t,n){if(e instanceof er){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function Pl(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),i=Oa(t.querySelector("#new-equipment-price")?.value||"0"),r=Wn(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",l=t.querySelector("#new-equipment-category")?.value?.trim()||"",d=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){E(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const b=Zs({category:l,subcategory:d,description:n,quantity:r,unit_price:i,barcode:s,status:u,image_url:c});try{const y=await pt("/equipment/",{method:"POST",body:b}),m=za(y?.data),p=[...rt(),m];cn(p),Qe(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),E(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(y){const m=Ln(y,"equipment.toast.addFailed","تعذر إضافة المعدة");E(m,"error")}}async function Ar(e){if(!dn()){Gn();return}const t=rt(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await pt(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),cn(a),Qe(),E(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=Ln(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");E(s,"error")}}async function Cl(e,t){const n=rt(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const i=[...n];i[e]={...i[e],...t},cn(i),Qe();return}const s=Zs({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const i=await pt(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),r=za(i?.data),c=[...n];c[e]=r,cn(c),Qe(),E(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(i){const r=Ln(i,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw E(r,"error"),i}}function ia(){Qe()}function wr(e){const n=rt()[e];if(!n)return;rn=e;const a=Ha(n),s=a[0]||n,i=a.reduce((l,d)=>l+(Number.isFinite(Number(d.qty))?Number(d.qty):0),0),r=["maintenance","reserved","available","retired"],c=a.map(l=>Ke(l.status)).sort((l,d)=>r.indexOf(l)-r.indexOf(d))[0]||Ke(s.status);document.getElementById("edit-equipment-index").value=e,Ys({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(i||s.qty||0),price:s.price!=null?String(s.price):"0",image:Ua(s)||"",barcode:s.barcode||"",status:s.status||c}),wn(!1),on=Sa(),Va(s),Er(s),Zt={groupKey:zt(s),barcode:String(s.barcode||""),id:s.id||null},fl(document.getElementById("editEquipmentModal"))?.show()}function Ll(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),i=s?.querySelector("[data-equipment-select-quantity]");let r=Number.parseInt(i?.value||"1",10);(!Number.isFinite(r)||r<=0)&&(r=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&r>c&&(r=c);const d=(t.dataset.selectionBarcodes||"").split(",").map(m=>m.trim()).filter(m=>m.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",b=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";ol({barcodes:d,quantity:r,groupKey:b,description:u})||E(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||Ar(s).catch(i=>{console.error("❌ [equipment.js] deleteEquipment",i)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||wr(s)}}function jl(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||wr(n)}}function Nl(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||Ar(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function xr(){if(!Zt||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=rt(),a=Zt.id?n.find(l=>String(l.id)===String(Zt.id)):null,s=Zt.groupKey,i=s?n.find(l=>zt(l)===s):null,r=a||i;if(!r){Ea();return}const c=n.findIndex(l=>l===r);if(c>=0){const l=document.getElementById("edit-equipment-index");l&&(l.value=String(c)),rn=c}if(Er(r),!Ma){const l=Ha(r),d=l[0]||r,u=l.reduce((m,p)=>m+(Number.isFinite(Number(p.qty))?Number(p.qty):0),0),b=["maintenance","reserved","available","retired"],y=l.map(m=>Ke(m.status)).sort((m,p)=>b.indexOf(m)-b.indexOf(p))[0]||Ke(d.status);Ys({category:d.category||"",subcategory:d.sub||"",description:d.desc||d.description||"",quantity:String(u||d.qty||0),price:d.price!=null?String(d.price):"0",image:Ua(d)||"",barcode:d.barcode||"",status:d.status||y}),on=Sa()}Va(primary)}function Tl(){document.getElementById("search-equipment")?.addEventListener("input",ia),document.getElementById("filter-category")?.addEventListener("change",ia),document.getElementById("filter-sub")?.addEventListener("change",ia),document.getElementById("filter-status")?.addEventListener("change",ia),document.getElementById("add-equipment-form")?.addEventListener("submit",Pl);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),Sr().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",Ll),t.addEventListener("keydown",jl),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",Nl),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);hl(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!Ma){on=Sa(),wn(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){E(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:Wn(document.getElementById("edit-equipment-quantity").value)||1,price:Oa(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await Cl(t,n),on=Sa(),wn(!1),xr()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{Tl(),Qe(),Xn();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(on&&Ys(on),rn!=null){const a=rt()[rn];if(a){const i=Ha(a)[0]||a;Va(i)}}wn(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Qe(),wn(Ma),rn!=null){const t=rt()[rn];if(t){const a=Ha(t)[0]||t;Va(a)}}});document.addEventListener("equipment:refreshRequested",()=>{Xn({showToastOnError:!1})});document.addEventListener(Lc.USER_UPDATED,()=>{Qe()});document.addEventListener("equipment:changed",()=>{xr()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{Zt=null,Ea(),rn=null,on=null,wn(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!ki&&(document.addEventListener(Pn.change,()=>{qr(),Qe()}),ki=!0);const _m=Object.freeze(Object.defineProperty({__proto__:null,clearEquipment:Sr,refreshEquipmentFromApi:Xn,renderEquipment:Qe,syncEquipmentStatuses:Cn,uploadEquipmentFromExcel:Al},Symbol.toStringTag,{value:"Module"})),Bl="__DEBUG_CREW__";function Dl(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(Bl);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function Pi(e,t){if(Dl())try{console.log(`🪵 [crew-debug:create] ${e}`,t)}catch{}}const Ir="projects:create:draft",_r="projects.html#projects-section";let hs=null,kr=[],vs=new Map,qs=new Map,Aa=new Map,cs=!1,da=null,Ci=!1,$r=[];function Fl(e){if(!e)return null;let t=$r.find(a=>a.id===e)||null;if(t)return t;const n=Os(e);return n?(t={id:e,name:Fc(n)||e,price:Dc(n),items:Ms(n),raw:n},t):null}function wa(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function xa(e){return h(String(e||"")).trim().toLowerCase()}function Rl(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function Pr(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function Cr(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Lr(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function jr(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function ln(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function ei(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function pn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function at(){const{input:e,hidden:t}=pn();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function Jt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const i=document.querySelector(`label[for="${e.id}"]`);i&&n.add(i)}const s=i=>{t()&&E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(i=>{!i||i.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(r=>{i.addEventListener(r,s,{capture:!0})}),i.dataset.linkedGuardAttached="true")})}function Nr(e,t,{allowPartial:n=!1}={}){const a=Ze(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const i=[];return e.forEach((r,c)=>{c.includes(a)&&i.push(r)}),i.length===1?i[0]:null}function Ss(e,t={}){return Nr(vs,e,t)}function Es(e,t={}){return Nr(qs,e,t)}function st(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function Tr(e){kr=Array.isArray(e)?[...e]:[]}function ti(){return kr}function ni(e){return e&&ti().find(t=>String(t.id)===String(e))||null}function Li(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function xn(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??an,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:an}function mt(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??an,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=an),t.dataset.companyShare=String(s),t.checked=!0}function As(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(cs){be();return}cs=!0;const a=()=>{cs=!1,be()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(an)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),mt()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?mt():n.checked&&(n.checked=!1));a()}function Ml(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function ji(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function Ni(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function kt({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=ei();if(!n||!a||!s)return;const i=Rs()||[],r=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",r);const l=new Set;vs=new Map;const d=i.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:Ni(m)||c})).filter(m=>{if(!m.label)return!1;const p=Ze(m.label);return!p||l.has(p)?!1:(l.add(p),vs.set(p,m),!0)}).sort((m,p)=>m.label.localeCompare(p.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(m=>`<option value="${wa(m.label)}"></option>`).join("");const u=t?"":n.value,b=e?String(e):a.value?String(a.value):"",y=b?i.find(m=>String(m.id)===b):null;if(y){const m=Ni(y)||c;a.value=String(y.id),n.value=m,n.dataset.selectedId=String(y.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function In({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:i}=pn();if(!a||!s||!i)return;const r=Array.isArray(t)?t:ti()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const l=[...r].filter(g=>g&&g.id!=null).sort((g,v)=>String(v.createdAt||v.start||"").localeCompare(String(g.createdAt||g.start||""))),d=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),b=new Set;qs=new Map;const y=l.map(g=>{const v=Li(g)||u;return{id:String(g.id),label:v}}).filter(g=>{if(!g.label)return!1;const v=Ze(g.label);return!v||b.has(v)?!1:(b.add(v),qs.set(v,g),!0)});i.innerHTML=y.map(g=>`<option value="${wa(g.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",p=m?l.find(g=>String(g.id)===m):null;if(p){const g=Li(p)||u;s.value=String(p.id),a.value=g,a.dataset.selectedId=String(p.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function Ia(e,t,n){const{date:a,time:s}=sr(n),i=document.getElementById(e),r=document.getElementById(t);if(i){if(a)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"Y-m-d";i._flatpickr.setDate(a,!1,c)}else i.value=a;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}if(r){if(s)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"H:i";r._flatpickr.setDate(s,!1,c)}else r.value=s;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}}function Br(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||In({selectedValue:a});const i=(Rs()||[]).find(u=>String(u.id)===String(e.clientId)),r=i?.id!=null?String(i.id):"";kt(r?{selectedValue:r}:{selectedValue:"",resetInput:!0});const c=ji(e,"start"),l=ji(e,"end");c&&Ia("res-start","res-start-time",c),l&&Ia("res-end","res-end-time",l);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),be(),Ot()}function Dr({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:pe(),s=Array.isArray(a)?a:[];Tr(s);const i=t!=null?String(t):n.value?String(n.value):"";In({selectedValue:i,projectsList:s}),Ot(),be()}function Ot(){const{input:e,hidden:t}=pn(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),i=document.getElementById("res-payment-progress-type"),r=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),l=document.getElementById("res-discount-type"),d=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),b=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(Jt(n,at),a&&Jt(a,at)),s&&Jt(s,at),i&&Jt(i,at),r&&Jt(r,at),c&&Jt(c,at),l&&Jt(l,at),b)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=d),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=d),s&&(s.value="unpaid",st(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=d),i&&(i.value=i.value||"percent",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=d),r&&(r.value="",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=d),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=d),l&&(l.value="percent",l.disabled=!0,l.classList.add("reservation-input-disabled"),l.title=d);else{if(n){const y=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",y&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.disabled=!1,l.classList.remove("reservation-input-disabled"),l.title="")}As("tax"),be()}function ai(){const{input:e,hidden:t}=pn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),i=s?Es(s,{allowPartial:a}):null;if(i){t.value=String(i.id),e.value=i.label,e.dataset.selectedId=String(i.id);const r=ni(i.id);r?Br(r,{skipProjectSelectUpdate:!0}):(Ot(),be())}else t.value="",e.dataset.selectedId="",Ot(),be()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Es(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function si(){const{input:e,hidden:t}=ei();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),i=s?Ss(s,{allowPartial:a}):null;i?(t.value=String(i.id),e.value=i.label,e.dataset.selectedId=String(i.id)):(t.value="",e.dataset.selectedId=""),be()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Ss(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function zl(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){Rn({clearValue:!0});return}let n=null;try{const d=decodeURIComponent(t);n=JSON.parse(d)}catch(d){console.warn("⚠️ [reservations/createForm] Failed to decode project context",d)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),Rn({clearValue:!1}),!n)return;n.fromProjectForm&&(da={draftStorageKey:n.draftStorageKey||Ir,returnUrl:n.returnUrl||_r});const i=document.getElementById("res-project");if(n.projectId){i&&(In({selectedValue:String(n.projectId)}),Ot());const d=ni(n.projectId);d?Br(d,{forceNotes:!!n.forceNotes}):be(),Rn()}else{i&&In({selectedValue:""});const d=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");nd(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),d)}n.start&&Ia("res-start","res-start-time",n.start),n.end&&Ia("res-end","res-end-time",n.end);const r=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(Rs()||[]).find(b=>String(b.id)===String(n.customerId));u?.id!=null&&(kt({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),r&&(r.value=u.customerName||u.name||r.value))}else n.customerName&&r?(kt({selectedValue:""}),r.value=n.customerName,r.dataset.selectedId="",c&&(c.value="")):kt({selectedValue:""});const l=document.getElementById("res-notes");l&&n.description&&!l.value&&(l.value=n.description),be()}function fn(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Vn(e,n),end:Vn(t,a)}}function Fr(e){const t=xa(e);if(t){const c=Aa.get(t);if(c)return c}const{description:n,barcode:a}=Pr(e);if(a){const c=Ra(a);if(c)return c}const s=Ze(n||e);if(!s)return null;let i=ir();if(!i?.length){const c=pe();i=Array.isArray(c?.equipment)?c.equipment:[],i.length&&lr(i)}const r=i.find(c=>Ze(c?.desc||c?.description||"")===s);return r||i.find(c=>Ze(c?.desc||c?.description||"").includes(s))||null}function Rr(e,t="equipment-description-options"){const n=xa(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(l=>xa(l.value)===n)||Aa.has(n))return!0;const{description:s}=Pr(e);if(!s)return!1;const i=Ze(s);return i?(ir()||[]).some(c=>Ze(c?.desc||c?.description||"")===i):!1}const Ol={available:0,reserved:1,maintenance:2,retired:3};function Hl(e){return Ol[e]??5}function Ti(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function Vl(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${Ti(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${Ti(n)})`}function Ht(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=Cn(),a=pe(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],i=Array.isArray(s)?s:[];lr(i);const r=new Map;i.forEach(d=>{const u=Rl(d),b=xa(u);if(!b||!u)return;const y=Pt(d),m=Hl(y),p=r.get(b);if(!p){r.set(b,{normalized:b,value:u,bestItem:d,bestStatus:y,bestPriority:m,statuses:new Set([y])});return}p.statuses.add(y),m<p.bestPriority&&(p.bestItem=d,p.bestStatus=y,p.bestPriority=m,p.value=u)}),Aa=new Map;const l=Array.from(r.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{Aa.set(d.normalized,d.bestItem);const u=Vl(d),b=wa(d.value);if(u===d.value)return`<option value="${b}"></option>`;const y=wa(u);return`<option value="${b}" label="${y}"></option>`}).join("");e&&(e.innerHTML=l),t&&(t.innerHTML=l)}function Mr(e,t,n={}){const{silent:a=!1}=n,s=ie(e);if(!s)return{success:!1,message:null};const{start:i,end:r}=fn();if(!i||!r){const p=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||E(p),{success:!1,message:p}}const c=Et();if(ii(c).has(s)){const p=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||E(p),{success:!1,message:p}}const d=zs(s,i,r);if(d.length){const p=d.map(v=>v.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${p}`);return a||E(g),{success:!1,message:g}}if(St(s,i,r)){const p=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||E(p),{success:!1,message:p}}const u=Ra(s);if(!u){const p=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||E(p),{success:!1,message:p}}const b=Pt(u);if(b==="maintenance"||b==="retired"){const p=ln(b);return a||E(p),{success:!1,message:p}}const y=un(u);if(!y){const p=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||E(p),{success:!1,message:p}}Ta({id:y,equipmentId:y,barcode:s,desc:u.desc,qty:1,price:u.price,image:mn(u)}),t&&(t.value=""),Ct(),be();const m=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||E(m),{success:!0,message:m,barcode:s}}function ws(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Fr(t);if(!n){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=ml(n.barcode),s=Pt(a||n);if(s==="maintenance"||s==="retired"){E(ln(s));return}const i=ie(n.barcode);if(!i){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const r=un(n);if(!r){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:r,equipmentId:r,barcode:i,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:mn(n)},{start:l,end:d}=fn();if(!l||!d){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=Et();if(ii(u).has(i)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const y=zs(i,l,d);if(y.length){const m=y.map(p=>p.name).join(", ");E(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`));return}if(St(i,l,d)){E(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}Ta(c),Ct(),be(),E(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function Ul(){Ht();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),ws(e))});const t=()=>{Rr(e.value,"equipment-description-options")&&ws(e)};e.addEventListener("focus",()=>{if(Ht(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Bi(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function ii(e=Et()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=ie(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const i=ie(s?.normalizedBarcode??s?.barcode);i&&t.add(i)})}),t}function Kl(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=fn();if(!t||!n){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}il({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):E(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(Pn.change,t=>{Bi(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),Bi(e,hr()))}function Ql(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,i=a.length?a:t.barcode?[t.barcode]:[];if(!i.length)return;let r=0,c=null;const l=[],d=new Set;i.forEach(b=>{const y=ie(b);y&&!d.has(y)&&(d.add(y),l.push(y))});const u=Math.min(s,l.length);for(let b=0;b<u;b+=1){const y=l[b],m=Mr(y,null,{silent:!0});m.success&&(r+=1),m.message&&(c=m.message)}if(r>0){const y=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",h(String(r)));E(y)}else c&&E(c)}function zr(){Kl(),!(Ci||typeof document>"u")&&(document.addEventListener(Pn.requestAdd,Ql),Ci=!0)}function Jn(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),i=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:i}}function xs(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=Jn();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const i=document.getElementById("equipment-barcode"),r=document.getElementById("equipment-description"),c=t==="package";i&&(i.disabled=c),r&&(r.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),Hc(t),t==="package"&&Ka()}function Ka(){const{packageSelect:e,packageHint:t}=Jn();if(!e)return;const n=nr();$r=n,Tc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,i=n.map(c=>{const l=Number.isFinite(Number(c.price))?Number(c.price):0,d=h(l.toFixed(2)),u=`${c.name} — ${d} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${i}`,e.selectedIndex=0;const r=n.length>0;e.disabled=!r,t&&(r?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),Vr()}function Gl(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:i,blockingPackages:r})=>{const c=i?.desc||h(String(i?.barcode??i?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(r)&&r.length){const l=r.map(d=>d.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${l})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function Or(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const i=Un(e);if(!i)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const r=Fl(i);if(!r)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(m=>m?.type==="package"&&Un(m.packageId)===i))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(Bc(i,n,a,s)){const m=r.name||i;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${m} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(r.items)&&r.items.length?r.items:Ms(r.raw??{}),l=ii(t),d=[],u=new Set;if(c.forEach(m=>{const p=ie(m?.normalizedBarcode??m?.barcode);if(p){if(u.has(p)){d.push({item:m,type:"internal"});return}u.add(p),l.has(p)&&d.push({item:m,type:"external"})}}),d.length){const m=d.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>h(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:d.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",m):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",m),duplicates:d}}const b=[];return c.forEach(m=>{const p=ie(m?.normalizedBarcode??m?.barcode);if(p&&St(p,n,a,s)){const g=zs(p,n,a,s);b.push({item:m,blockingPackages:g})}}),b.length?{success:!1,reason:"item_conflict",message:Gl(r,b),conflicts:b}:{success:!0,package:{id:`package::${i}`,packageId:i,type:"package",desc:r.name||`Package ${i}`,qty:1,price:Number.isFinite(Number(r.price))?Number(r.price):0,barcode:r.code||r.raw?.package_code||`pkg-${i}`,packageItems:c.map(m=>({equipmentId:m?.equipmentId??null,barcode:m?.barcode??m?.normalizedBarcode??"",normalizedBarcode:ie(m?.normalizedBarcode??m?.barcode),desc:m?.desc??"",qty:Number.isFinite(Number(m?.qty))?Number(m.qty):1,price:Number.isFinite(Number(m?.price))?Number(m.price):0})),image:c.find(m=>m?.image)?.image??null},packageInfo:r}}function Hr(e,{silent:t=!1}={}){const n=Un(e);if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=fn(),i=Et(),r=Or(n,{existingItems:i,start:a,end:s});if(!r.success){if(!t){const l={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[r.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");E(r.message||l)}return r}return Ta(r.package),Ct(),be(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:r.package}}function Vr(){const{packageSelect:e}=Jn();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;Hr(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function Wl(){const{packageAddButton:e,packageSelect:t}=Jn();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}Hr(n)}),e.dataset.listenerAttached="true")}function Ur(){const{modeRadios:e}=Jn();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&xs(s.target.value)}),a.dataset.listenerAttached="true")}),Wl(),Vr();const t=ya(),n=e.find(a=>a.value===t);n&&(n.checked=!0),xs(t)}function Ct(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=Et(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),i=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),l=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=kn(n);t.innerHTML=d.map(u=>{const b=u.items[0]||{},y=mn(b)||u.image,m=y?`<img src="${y}" alt="${i}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',p=h(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,v=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,_=`${h(g.toFixed(2))} ${s}`,q=`${h(v.toFixed(2))} ${s}`,k=u.items.some(w=>w?.type==="package"),x=u.barcodes.map(w=>h(String(w||""))).filter(Boolean),U=x.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${x.map(w=>`<li>${w}</li>`).join("")}
            </ul>
          </details>`:"";let S="";if(k){const w=new Map;if(u.items.forEach(L=>{Array.isArray(L?.packageItems)&&L.packageItems.forEach(j=>{if(!j)return;const W=ie(j.barcode||j.desc||Math.random()),$=w.get(W);if($){$.qty+=Number.isFinite(Number(j.qty))?Number(j.qty):1;return}w.set(W,{desc:j.desc||j.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(j.qty))?Number(j.qty):1,barcode:j.barcode??j.normalizedBarcode??""})})}),w.size){const L=Array.from(w.values()).map(j=>{const W=h(String(j.qty)),$=j.desc||h(String(j.barcode||"")),F=j.barcode?` <span class="reservation-package-items__barcode">(${h(String(j.barcode))})</span>`:"";return`<li>${$}${F} × ${W}</li>`}).join("");S=`
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
              <div class="reservation-item-thumb-wrapper">${m}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${k?`${S||""}${U||""}`:U}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${c}" ${k?"disabled":""}>−</button>
              <span class="reservation-qty-value">${p}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${r}" ${k?"disabled":""}>+</button>
            </div>
          </td>
          <td>${_}</td>
          <td>${q}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${l}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function Xl(e){const t=Et(),a=kn(t).find(i=>i.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Mc(s),Ct(),be())}function Jl(e){const t=Et(),n=t.filter(a=>Ba(a)!==e);n.length!==t.length&&(rr(n),Ct(),be())}function Yl(e){const t=Et(),a=kn(t).find(b=>b.key===e);if(!a)return;const{start:s,end:i}=fn();if(!s||!i){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const r=new Set(t.map(b=>ie(b.barcode))),{equipment:c=[]}=pe(),l=(c||[]).find(b=>{const y=ie(b?.barcode);return!y||r.has(y)||Ba({desc:b?.desc||b?.description||b?.name||"",price:Number(b?.price)||0})!==e||!vr(b)?!1:!St(y,s,i)});if(!l){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=ie(l.barcode),u=un(l);if(!u){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}Ta({id:u,equipmentId:u,barcode:d,desc:l.desc||l.description||l.name||a.description||"",qty:1,price:Number.isFinite(Number(l.price))?Number(l.price):a.unitPrice,image:mn(l)}),Ct(),be()}function be(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,i=document.getElementById("res-tax"),r=e?!1:i?.checked||!1,c=document.getElementById("res-payment-status"),l=c?.value||"unpaid",{start:d,end:u}=fn();r&&mt();const b=xn(),y=document.getElementById("res-payment-progress-type"),m=document.getElementById("res-payment-progress-value"),p=Cr(y),g=Lr(m);ar(),Ii({selectedItems:Et(),discount:n,discountType:s,applyTax:r,paidStatus:l,paymentProgressType:p,paymentProgressValue:g,start:d,end:u,companySharePercent:b,paymentHistory:[]});const v=Ii.lastResult;v?(jr(m,v.paymentProgressValue),c&&(c.value=v.paymentStatus,st(c,v.paymentStatus))):st(c,l)}function Zl(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=h(c.target.value),be()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",be),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(at()){n.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}As("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(at()){a.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}As("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(at()){s.value="unpaid",st(s,"unpaid"),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}st(s),be()}),s.dataset.listenerAttached="true");const i=document.getElementById("res-payment-progress-type");i&&!i.dataset.listenerAttached?(i.dataset.userSelected!=="true"&&(i.value="percent"),i.addEventListener("change",c=>{if(at()){i.value="percent",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}i.dataset.userSelected="true",be()}),i.dataset.listenerAttached="true"):i&&i.dataset.userSelected!=="true"&&!i.value&&(i.value="percent");const r=document.getElementById("res-payment-progress-value");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",c=>{if(at()){r.value="",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=h(c.target.value),be()}),r.dataset.listenerAttached="true"),be()}function ed(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){be();return}const i=t.dataset.syncedWithStart;(!t.value?.trim()||i!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),be()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Di(){const{input:e,hidden:t}=ei(),{input:n,hidden:a}=pn(),{customers:s}=pe();let i=t?.value?String(t.value):"";if(!i&&e?.value){const G=Ss(e.value,{allowPartial:!0});G&&(i=String(G.id),t&&(t.value=i),e.value=G.label,e.dataset.selectedId=i)}const r=s.find(G=>String(G.id)===i);if(!r){E(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=r.id;let l=a?.value?String(a.value):"";if(!l&&n?.value){const G=Es(n.value,{allowPartial:!0});G&&(l=String(G.id),a&&(a.value=l),n.value=G.label,n.dataset.selectedId=l)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,b=document.getElementById("res-start-time")?.value||"00:00",y=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${d}T${b}`,p=`${u}T${y}`,g=new Date(m),v=new Date(p);if(Number.isNaN(g.getTime())||Number.isNaN(v.getTime())||g>=v){E(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const _=ar();_.map(G=>G.technicianId).filter(Boolean);const q=Et();if(q.length===0&&_.length===0){E(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const k=document.getElementById("res-notes")?.value||"",x=parseFloat(h(document.getElementById("res-discount")?.value))||0,U=document.getElementById("res-discount-type")?.value||"percent",S=document.getElementById("res-payment-status"),w=S?.value||"unpaid",L=document.getElementById("res-payment-progress-type"),j=document.getElementById("res-payment-progress-value"),W=Cr(L),$=Lr(j),F=l?ni(l):null,X=Ml(F);if(l&&!F){E(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const G of q){const te=Pt(G.barcode);if(te==="maintenance"||te==="retired"){E(ln(te));return}}for(const G of q){const te=ie(G.barcode);if(St(te,m,p)){E(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const G of _)if(G?.technicianId&&or(G.technicianId,m,p)){E(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const N=document.getElementById("res-tax"),T=document.getElementById("res-company-share"),P=!!l;P?(N&&(N.checked=!1,N.disabled=!0,N.classList.add("disabled"),N.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),T&&(T.checked=!1,T.disabled=!0,T.classList.add("disabled"),T.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),S&&(S.value="unpaid",S.disabled=!0,st(S,"unpaid"),S.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),L&&(L.disabled=!0,L.classList.add("disabled")),j&&(j.value="",j.disabled=!0,j.classList.add("disabled"))):(N&&(N.disabled=!1,N.classList.remove("disabled"),N.title=""),T&&(T.disabled=!1,T.classList.remove("disabled"),T.title=""),S&&(S.disabled=!1,S.title=""),L&&(L.disabled=!1,L.classList.remove("disabled")),j&&(j.disabled=!1,j.classList.remove("disabled")));const H=P?!1:N?.checked||!1,Q=!!T?.checked;if(!P&&Q!==H){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let D=Q?xn():null;Q&&(!Number.isFinite(D)||D<=0)&&(mt(),D=xn());const J=Q&&H&&Number.isFinite(D)&&D>0;H&&mt();const B=Hs(q,x,U,H,_,{start:m,end:p,companySharePercent:J?D:0}),V=jc(),R=Vs({totalAmount:B,progressType:W,progressValue:$,history:[]});j&&jr(j,R.paymentProgressValue);const ee=[];R.paymentProgressValue!=null&&R.paymentProgressValue>0&&ee.push({type:R.paymentProgressType||W,value:R.paymentProgressValue,amount:R.paidAmount,percentage:R.paidPercent,recordedAt:new Date().toISOString()});const me=Us({manualStatus:w,paidAmount:R.paidAmount,paidPercent:R.paidPercent,totalAmount:B});S&&(S.value=me,st(S,me));const de=typeof F?.paymentStatus=="string"?F.paymentStatus.toLowerCase():null,Ee=de&&["paid","partial","unpaid"].includes(de)?de:"unpaid",ge=cr({reservationCode:V,customerId:c,start:m,end:p,status:X?"confirmed":"pending",title:null,location:null,notes:k,projectId:l||null,totalAmount:B,discount:P?0:x,discountType:P?"percent":U,applyTax:H,paidStatus:P?Ee:me,confirmed:X,items:q.map(G=>({...G,equipmentId:G.equipmentId??G.id})),crewAssignments:_,companySharePercent:P||!J?null:D,companyShareEnabled:P?!1:J,paidAmount:P?0:R.paidAmount,paidPercentage:P?0:R.paidPercent,paymentProgressType:P?null:R.paymentProgressType,paymentProgressValue:P?null:R.paymentProgressValue,paymentHistory:P?[]:ee});try{Pi("about to submit",{crewAssignments:_,techniciansPayload:ge?.technicians,payload:ge});const G=await zc(ge);Pi("server response",{reservation:G?.id??G?.reservationId??G?.reservation_code,technicians:G?.technicians,crewAssignments:G?.crewAssignments,techniciansDetails:G?.techniciansDetails}),Cn(),Ht(),sn(),ad(),E(o("reservations.toast.created","✅ تم إنشاء الحجز"));try{const te=document.getElementById("sub-tab-trigger-my-reservations-tab");te&&typeof te.click=="function"&&setTimeout(()=>te.click(),0)}catch{}typeof hs=="function"&&hs({type:"created",reservation:G}),td(G)}catch(G){console.error("❌ [reservations/createForm] Failed to create reservation",G);const te=Da(G)?G.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");E(te,"error"),P&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),Rn({clearValue:!1}))}}function td(e){if(!da)return;const{draftStorageKey:t=Ir,returnUrl:n=_r}=da,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),i=s?JSON.parse(s)||{}:{},r=Array.isArray(i.linkedReservationIds)?i.linkedReservationIds:[],c=String(a);r.includes(c)||r.push(c),i.linkedReservationIds=r,window.sessionStorage.setItem(t,JSON.stringify(i))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}da=null,n&&(window.location.href=n)}function Rn({clearValue:e=!1}={}){const{input:t,hidden:n}=pn();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,Ot())}function nd(e,t=""){const{input:n,hidden:a}=pn();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),Ot())}function ad(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),kt({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),Rn({clearValue:!1}),In({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const i=document.getElementById("res-payment-status");i&&(i.value="unpaid",st(i,"unpaid"));const r=document.getElementById("res-payment-progress-type");r&&(r.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),Oc(),rr([]),ha("form-reset"),Ct(),Ot(),be()}function sd(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){Xl(s);return}if(a==="increase-group"&&s){Yl(s);return}if(a==="remove-group"&&s){Jl(s);return}}),e.dataset.listenerAttached="true")}function id(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(ya()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,Mr(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||ya()!=="single")return;const{start:i,end:r}=fn();!i||!r||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function rd(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Di()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Di()}),t.dataset.listenerAttached="true")}function km({onAfterSubmit:e}={}){hs=typeof e=="function"?e:null;const{customers:t,projects:n}=pe();Rc(t||[]),kt(),si(),Tr(n||[]),Dr({projectsList:n}),ai(),Ht(),Ka(),Ul(),zr(),Ur(),ed(),Zl(),sd(),id(),rd(),zl(),be(),Ct()}function Kr(){Ht(),Ka(),Dr(),kt(),si(),ai(),zr(),Ur(),Ct(),be()}if(typeof document<"u"){const e=()=>{kt(),In({projectsList:ti()}),si(),ai(),be()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{Ht()}),document.addEventListener("packages:changed",()=>{Ka(),ya()==="package"&&xs("package")})}typeof window<"u"&&(window.getCompanySharePercent=xn);function Qr(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:Yt(t),endDate:Yt(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const i=new Date(n);return i.setDate(n.getDate()+6),{startDate:Yt(n),endDate:Yt(i)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Yt(n),endDate:Yt(a)}}return e==="upcoming"?{startDate:Yt(t),endDate:""}:{startDate:"",endDate:""}}function od(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let i=h(t?.value||"").trim(),r=h(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),_a(t),_a(n),i="",r=""),!i&&!r&&c){const d=Qr(c);i=d.startDate,r=d.endDate}return{searchTerm:Ze(e?.value||""),startDate:i,endDate:r,status:s?.value||"",quickRange:c}}function $m(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),s.dataset.listenerAttached="true");const i=document.getElementById("reservation-date-range");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>{cd(i.value),t()}),i.dataset.listenerAttached="true");const r=document.getElementById("reservation-status-filter");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",t),r.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),_a(a),_a(s),i&&(i.value=""),r&&(r.value=""),t()}),c.dataset.listenerAttached="true")}function cd(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=Qr(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function Yt(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function _a(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function ra(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function ld(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function dd(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=ld(n);if(a!==null)return a}return null}function Fi(e,t=0){const n=dd(e);if(n!=null)return n;const a=ra(e.createdAt??e.created_at);if(a!=null)return a;const s=ra(e.updatedAt??e.updated_at);if(s!=null)return s;const i=ra(e.start);if(i!=null)return i;const r=ra(e.end);if(r!=null)return r;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function ud({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const i=e.map((q,k)=>({reservation:q,index:k})),r=t.searchTerm||"",c=t.searchReservationId||"",l=t.searchCustomerName||"",d=t.searchProjectId||"",u=t.startDate||"",b=t.endDate||"",y=t.status||"",m=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,p=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,v=b?new Date(`${b}T23:59:59`):null,_=i.filter(({reservation:q})=>{const k=n.get(String(q.customerId)),x=s?.get?.(String(q.projectId)),U=q.start?new Date(q.start):null,S=Ks(q),{effectiveConfirmed:w}=Vt(q,x);if(m!=null&&String(q.customerId)!==String(m)||p!=null&&!(Array.isArray(q.technicians)?q.technicians.map(F=>String(F)):[]).includes(String(p))||y==="confirmed"&&!w||y==="pending"&&w||y==="completed"&&!S)return!1;if(y==="cancelled"){const $=String(q?.status||q?.reservationStatus||"").toLowerCase();if(!["cancelled","canceled"].includes($))return!1}if(g&&U&&U<g||v&&U&&U>v)return!1;if(c){const $=[q.reservationId,q.id,q.reservation_id,q.reservationCode,q.reservation_code,q.code,q.reference,q.referenceNumber,q.reference_number],F=Ze($.filter(N=>N!=null&&N!=="").map(String).join(" ")).replace(/\s+/g,""),X=c.replace(/\s+/g,"");if(!F.includes(X))return!1}if(l&&!Ze(k?.customerName||"").includes(l))return!1;if(d){const $=[q.projectId,q.project_id,q.projectID,x?.id,x?.projectCode,x?.project_code],F=Ze($.filter(N=>N!=null&&N!=="").map(String).join(" ")).replace(/\s+/g,""),X=d.replace(/\s+/g,"");if(!F.includes(X))return!1}if(!r)return!0;const L=q.items?.map?.($=>`${$.barcode} ${$.desc}`).join(" ")||"",j=(q.technicians||[]).map($=>a.get(String($))?.name).filter(Boolean).join(" ");return Ze([q.reservationId,k?.customerName,q.notes,L,j,x?.title].filter(Boolean).join(" ")).includes(r)});return _.sort((q,k)=>{const x=Fi(q.reservation,q.index),U=Fi(k.reservation,k.index);return x!==U?U-x:k.index-q.index}),_}function md({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),i=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),r=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),l=o("reservations.list.itemsCountShort","{count} عنصر"),d=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),b=o("reservations.list.status.pending","⏳ غير مؤكد"),y=o("reservations.list.status.completed","📁 منتهي"),m=o("reservations.list.payment.paid","💳 مدفوع"),p=o("reservations.list.payment.unpaid","💳 غير مدفوع"),g=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),v=o("reservations.list.actions.confirm","✔️ تأكيد"),_=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),q=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),k={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:x,index:U})=>{const S=t.get(String(x.customerId)),w=x.projectId?a?.get?.(String(x.projectId)):null,L=Ks(x),j=typeof w?.paymentStatus=="string"?w.paymentStatus.toLowerCase():null,W=x.paidStatus??x.paid_status??(x.paid===!0||x.paid==="paid"?"paid":"unpaid"),$=j&&["paid","partial","unpaid"].includes(j)?j:W,F=$==="paid",X=$==="partial",{effectiveConfirmed:N,projectLinked:T}=Vt(x,w),P=N?"status-confirmed":"status-pending",H=F?"status-paid":X?"status-partial":"status-unpaid";let Q=`<span class="reservation-chip status-chip ${P}">${N?u:b}</span>`;const D=F?m:X?g:p;let J=`<span class="reservation-chip status-chip ${H}">${D}</span>`,B=F?" tile-paid":X?" tile-partial":" tile-unpaid";L&&(B+=" tile-completed");let V="";L&&(Q=`<span class="reservation-chip status-chip status-completed">${y}</span>`,J=`<span class="reservation-chip status-chip status-completed">${D}</span>`,V=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);let R=!T&&!N?`<button class="tile-confirm" data-reservation-index="${U}" data-action="confirm">${v}</button>`:"";{const z=String(x?.status||x?.reservationStatus||"").toLowerCase();(z==="cancelled"||z==="canceled")&&(Q=`<span class="reservation-chip status-chip status-cancelled">${o("reservations.list.status.cancelled","❌ ملغي")}</span>`,B=" tile-cancelled",V="",typeof R<"u"&&(R=""))}const ee=R?`<div class="tile-actions">${R}</div>`:"",me=x.items?.length||0,de=Array.isArray(x.crewAssignments)?x.crewAssignments:[],Ee=(x.technicians||[]).map(z=>n.get(String(z))).filter(Boolean),ge=de.length?de.map(z=>{const Se=z.positionLabel??z.position_name??z.role??o("reservations.crew.positionFallback","منصب بدون اسم"),I=z.technicianName??n.get(String(z.technicianId??""))?.name??null;return I?`${h(Se)} (${h(I)})`:h(Se)}):Ee.map(z=>z.name),G=ge.length?ge.join(d):"—",te=h(String(x.reservationId??"")),we=x.start?h(it(x.start)):"-",Ne=x.end?h(it(x.end)):"-",Ge=h(String(x.cost??0)),Y=h(String(me)),ne=x.notes?h(x.notes):c,le=l.replace("{count}",Y),qe=x.applyTax?`<small>${i}</small>`:"";let Be=_;return x.projectId&&(Be=w?.title?h(w.title):q),`
      <div class="${R?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${B}"${V} data-reservation-index="${U}" data-action="details">
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
            <span class="tile-value">${Be}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${k.start}</span>
            <span class="tile-value tile-inline">${we}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${k.end}</span>
            <span class="tile-value tile-inline">${Ne}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${k.cost}</span>
            <span class="tile-value">${Ge} ${s} ${qe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${k.equipment}</span>
            <span class="tile-value">${le}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${k.crew}</span>
            <span class="tile-value">${ge.length?G:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${ne}</span>
          </div>
        </div>
        ${ee}
      </div>
    `}).join("")}function Ye(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ls(e){if(e==null)return"";const t=String(e).trim();return t?h(t):""}function Ri(e,t,n=[],a,s=null){const{projectLinked:i,effectiveConfirmed:r}=Vt(e,s),c=e.paid===!0||e.paid==="paid",l=Ks(e),d=e.items||[];let{groups:u}=Qs(e);const b=f=>!!(f&&typeof f=="object"&&(f.type==="package"||Array.isArray(f.packageItems)&&f.packageItems.length||Array.isArray(f.items)&&f.items.some(O=>O&&O.type==="package"))),y=f=>{const O=(f?.package_code??f?.packageDisplayCode??f?.barcode??f?.description??(Array.isArray(f?.items)&&f.items[0]?.barcode)??"").toString().trim().toLowerCase();return h(O)},m=(f,O)=>{const ae=ke=>{const Te=Array.isArray(ke?.items)?ke.items[0]:null,Ce=[Te?.price,Te?.unit_price,Te?.unitPrice,ke?.unitPrice,ke?.totalPrice];for(const Nt of Ce){const He=Fe(Nt);if(Number.isFinite(He)&&He>0)return He}return 0},fe=ae(f),ve=ae(O);return fe&&ve?fe<=ve?f:O:fe?f:O},p=[],g=new Map;u.forEach(f=>{if(!b(f)){p.push(f);return}const O=y(f);if(!O){if(!g.has("__unknown__"))g.set("__unknown__",p.length),p.push(f);else{const ae=g.get("__unknown__");p[ae]=m(p[ae],f)}return}if(!g.has(O))g.set(O,p.length),p.push(f);else{const ae=g.get(O);p[ae]=m(p[ae],f)}}),u=p;const{technicians:v=[]}=pe(),_=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(v)?v:[]),q=new Map;_.forEach(f=>{if(!f||f.id==null)return;const O=String(f.id),ae=q.get(O)||{};q.set(O,{...ae,...f})});const x=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(f=>({technicianId:f}))).map((f,O)=>{const ae=f?.technicianId!=null?q.get(String(f.technicianId)):null;let fe=f.positionLabel??f.position_name??f.position_label??f.role??f.position??"";(!fe||fe.trim()==="")&&(fe=f.positionLabelAr??f.position_label_ar??f.positionLabelEn??f.position_label_en??f.position_name_ar??f.position_name_en??"");const ve=f.positionLabelAlt??f.position_label_alt??f.positionLabelEn??f.position_label_en??f.positionLabelAr??f.position_label_ar??"";let ke=fe,Te=ve;if(!ke||ke.trim()==="")try{const He=Bt?Bt():[];let se=null;if(f.positionId!=null&&(se=He.find(Le=>String(Le.id)===String(f.positionId))||null),!se){const Le=f.positionKey??f.position_key??f.positionName??f.position_name??f.position??"";if(Le&&(se=typeof ba=="function"?ba(Le):null,!se&&He.length)){const ct=String(Le).trim().toLowerCase();se=He.find(lt=>[lt.name,lt.labelAr,lt.labelEn].filter(Boolean).map(Tt=>String(Tt).toLowerCase()).includes(ct))||null}}se&&(ke=se.labelAr||se.labelEn||se.name||"",(!Te||String(Te).trim()==="")&&(se.labelAr&&se.labelEn?Te=ke===se.labelAr?se.labelEn:se.labelAr:Te=se.labelAr||se.labelEn||""))}catch{}const Ce=Ie(Fe(f.positionCost??f.position_cost??f.cost??f.daily_wage??f.dailyWage??ae?.dailyWage??ae?.wage??0)),Nt=Ie(Fe(f.positionClientPrice??f.position_client_price??f.client_price??f.clientPrice??f.daily_total??f.dailyTotal??f.total??ae?.dailyTotal??ae?.total??ae?.total_wage??0));return{assignmentId:f.assignmentId??f.assignment_id??`crew-${O}`,positionId:f.positionId??f.position_id??null,positionKey:f.positionKey??f.position_key??f.positionName??f.position_name??f.position??null,positionLabel:ke,positionLabelAlt:Te,positionLabelAr:f.positionLabelAr??f.position_label_ar??null,positionLabelEn:f.positionLabelEn??f.position_label_en??null,positionCost:Ce,positionClientPrice:Nt,technicianId:f.technicianId!=null?String(f.technicianId):ae?.id!=null?String(ae.id):null,technicianName:f.technicianName??f.technician_name??ae?.name??null,technicianRole:f.technicianRole??ae?.role??null,technicianPhone:f.technicianPhone??ae?.phone??null,notes:f.notes??null}}),U=dn(),S=Fa(e.start,e.end),w=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,L=Fe(w),j=Number.isFinite(L)?L:0,W=e.discountType??e.discount_type??e.discountMode??"percent",$=String(W).toLowerCase()==="amount"?"amount":"percent",F=i?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),X=Fe(e.cost??e.total??e.finalTotal),N=Number.isFinite(X),T=N?Ie(X):0,P=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,H=P!=null?Fe(P):Number.NaN,J=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(H)&&H>0)&&Number.isFinite(H)?H:0,B=dr({items:d,technicianIds:e.technicians||[],crewAssignments:x,discount:j,discountType:$,applyTax:F,start:e.start,end:e.end,companySharePercent:J}),V=Ie(B.equipmentTotal),R=Ie(B.crewTotal);Ie(B.crewCostTotal);const ee=Ie(B.discountAmount),me=Ie(B.subtotalAfterDiscount),de=Number.isFinite(B.companySharePercent)?B.companySharePercent:0;let Ee=Ie(B.companyShareAmount);Ee=de>0?Ie(Math.max(0,Ee)):0;const ge=Ie(B.taxAmount),G=Ie(B.finalTotal),te=i?G:N?T:G,we=Ie(B.netProfit),Ne=h(String(e.reservationId??e.id??"")),Ge=e.start?h(it(e.start)):"-",Y=e.end?h(it(e.end)):"-",ne=h(String(x.length)),le=h(V.toFixed(2)),qe=h(ee.toFixed(2)),Be=h(me.toFixed(2)),ft=h(ge.toFixed(2)),z=h((Number.isFinite(te)?te:0).toFixed(2)),Se=h(String(S)),I=o("reservations.create.summary.currency","SR"),oe=o("reservations.details.labels.discount","الخصم"),K=o("reservations.details.labels.tax","الضريبة (15%)"),he=o("reservations.details.labels.crewTotal","إجمالي الفريق"),Ae=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),xe=o("reservations.details.labels.duration","عدد الأيام"),Ve=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),We=o("reservations.details.labels.netProfit","💵 صافي الربح"),ze=o("reservations.create.equipment.imageAlt","صورة"),Oe={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},Lt=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),M=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");o("reservations.details.technicians.roleUnknown","غير محدد");const re=o("reservations.details.technicians.phoneUnknown","غير متوفر");o("reservations.details.technicians.wage","{amount} {currency} / اليوم");const _e=o("reservations.list.status.confirmed","✅ مؤكد"),Ue=o("reservations.list.status.pending","⏳ غير مؤكد"),tt=o("reservations.list.payment.paid","💳 مدفوع"),Gt=o("reservations.list.payment.unpaid","💳 غير مدفوع"),yt=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),ea=o("reservations.list.status.completed","📁 منتهي"),ta=o("reservations.details.labels.id","🆔 رقم الحجز"),es=o("reservations.details.section.bookingInfo","بيانات الحجز"),bn=o("reservations.details.section.paymentSummary","ملخص الدفع"),De=o("reservations.details.labels.finalTotal","المجموع النهائي"),Xe=o("reservations.details.section.crew","😎 الفريق الفني"),Wt=o("reservations.details.crew.count","{count} عضو"),wt=o("reservations.details.section.items","📦 المعدات المرتبطة"),na=o("reservations.details.items.count","{count} عنصر"),Go=o("reservations.details.actions.edit","✏️ تعديل"),Wo=o("reservations.details.actions.delete","🗑️ حذف"),Xo=o("reservations.details.labels.customer","العميل"),Jo=o("reservations.details.labels.contact","رقم التواصل"),Yo=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Zo=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),ec=o("reservations.details.actions.openProject","📁 فتح المشروع"),tc=o("reservations.details.labels.start","بداية الحجز"),nc=o("reservations.details.labels.end","نهاية الحجز"),ac=o("reservations.details.labels.notes","ملاحظات"),sc=o("reservations.list.noNotes","لا توجد ملاحظات"),ic=o("reservations.details.labels.itemsCount","عدد المعدات"),rc=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),oc=o("reservations.paymentHistory.title","سجل الدفعات"),cc=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),lc=o("reservations.list.unknownCustomer","غير معروف"),ts=typeof s?.paymentStatus=="string"?s.paymentStatus.toLowerCase():null,aa=i&&ts&&["paid","partial","unpaid"].includes(ts)?ts:e.paidStatus??e.paid_status??(c?"paid":"unpaid"),ns=aa==="partial",qi=aa==="paid"?tt:ns?yt:Gt;function as(f){if(f==null)return Number.NaN;if(typeof f=="number")return Number.isFinite(f)?f:Number.NaN;const O=String(f).replace(/[^0-9.+-]/g,""),ae=Number(O);return Number.isFinite(ae)?ae:Number.NaN}const sa=(f={})=>{const O=String(f.type??f.kind??f.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(O)||Array.isArray(f.packageItems)&&f.packageItems.length)},dc=(f={})=>[f.packageId,f.package_id,f.packageCode,f.package_code,f.bundleId,f.bundle_id].some(O=>O!=null&&O!==""),uc=(f={})=>!f||typeof f!="object"?!1:!sa(f)&&dc(f),mc=(f={})=>{const O=sa(f),ae=[{value:f.qty,key:"qty",limit:999},{value:f.quantity,key:"quantity",limit:999},{value:f.units,key:"units",limit:999},{value:f.count,key:"count",limit:50},{value:f.package_quantity,key:"package_quantity",limit:999},{value:f.packageQty,key:"packageQty",limit:999},{value:f.packageCount,key:"packageCount",limit:999}];let fe=NaN;for(const ve of ae){if(ve.value==null||ve.value==="")continue;const ke=typeof ve.value=="string"?ve.value.trim():String(ve.value??"");if(ve.key==="count"&&ke.length>6)continue;const Te=as(ve.value);if(!Number.isFinite(Te)||Te<=0)continue;const Ce=Math.round(Te);if(!(Ce>ve.limit)){fe=Math.max(1,Ce);break}}return(!Number.isFinite(fe)||fe<=0)&&(fe=1),O?Math.max(1,Math.min(99,fe)):Math.max(1,Math.min(9999,fe))};let gn=(Array.isArray(d)?d:[]).filter(f=>f&&typeof f=="object"&&!uc(f)).reduce((f,O)=>f+mc(O),0);(!Number.isFinite(gn)||gn<=0)&&(gn=Array.isArray(u)&&u.length?u.length:(Array.isArray(d)?d.length:0)||1),gn=Math.max(1,Math.round(gn));const pc=h(String(gn)),Si=na.replace("{count}",pc),fc=Wt.replace("{count}",ne),yc=e.notes?h(e.notes):sc,bc=h(R.toFixed(2)),gc=h(String(de)),hc=h(Ee.toFixed(2)),vc=`${gc}% (${hc} ${I})`,qc=Number.isFinite(we)?Math.max(0,we):0,Sc=h(qc.toFixed(2)),jt=[{icon:"💼",label:rc,value:`${le} ${I}`}];jt.push({icon:"😎",label:he,value:`${bc} ${I}`}),ee>0&&jt.push({icon:"💸",label:oe,value:`${qe} ${I}`}),jt.push({icon:"📊",label:Ae,value:`${Be} ${I}`}),F&&ge>0&&jt.push({icon:"🧾",label:K,value:`${ft} ${I}`}),de>0&&jt.push({icon:"🏦",label:Ve,value:vc}),jt.push({icon:"💵",label:We,value:`${Sc} ${I}`}),jt.push({icon:"💰",label:De,value:`${z} ${I}`});const Ec=jt.map(({icon:f,label:O,value:ae})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${f} ${O}</span>
      <span class="summary-details-value">${ae}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let nt=[];i&&s&&(Array.isArray(s.paymentHistory)?nt=s.paymentHistory:Array.isArray(s.payment_history)?nt=s.payment_history:Array.isArray(s.payments)?nt=s.payments:Array.isArray(s.paymentLogs)&&(nt=s.paymentLogs)),(!Array.isArray(nt)||nt.length===0)&&(Array.isArray(e.paymentHistory)?nt=e.paymentHistory:Array.isArray(e.payment_history)?nt=e.payment_history:Array.isArray(e.paymentLogs)?nt=e.paymentLogs:nt=[]);const Ei=Array.isArray(nt)?nt:[],Ac=Ei.length?`<ul class="reservation-payment-history-list">${Ei.map(f=>{const O=f?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):f?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),ae=Number.isFinite(Number(f?.amount))&&Number(f.amount)>0?`${h(Number(f.amount).toFixed(2))} ${I}`:"—",fe=Number.isFinite(Number(f?.percentage))&&Number(f.percentage)>0?`${h(Number(f.percentage).toFixed(2))}%`:"—",ve=f?.recordedAt?h(it(f.recordedAt)):"—",ke=f?.note?`<div class="payment-history-note">${Ye(h(f.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${Ye(O)}</span>
              <span class="payment-history-entry__amount">${ae}</span>
              <span class="payment-history-entry__percent">${fe}</span>
              <span class="payment-history-entry__date">${ve}</span>
            </div>
            ${ke}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${Ye(cc)}</div>`,Ai=String(e?.status||e?.reservationStatus||"").toLowerCase(),wi=Ai==="cancelled"||Ai==="canceled",xi=wi?[{text:o("reservations.list.status.cancelled","❌ ملغي"),className:"status-cancelled"},{text:qi,className:aa==="paid"?"status-paid":ns?"status-partial":"status-unpaid"}]:[{text:r?_e:Ue,className:r?"status-confirmed":"status-pending"},{text:qi,className:aa==="paid"?"status-paid":ns?"status-partial":"status-unpaid"}];l&&!wi&&xi.push({text:ea,className:"status-completed"});const wc=xi.map(({text:f,className:O})=>`<span class="status-chip ${O}">${f}</span>`).join(""),Xt=(f,O,ae)=>`
    <div class="res-info-row">
      <span class="label">${f} ${O}</span>
      <span class="value">${ae}</span>
    </div>
  `;let ss="";if(e.projectId){let f=Ye(Zo);if(s){const O=s.title||o("projects.fallback.untitled","مشروع بدون اسم");f=`${Ye(O)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${Ye(ec)}</button>`}ss=`
      <div class="res-info-row">
        <span class="label">📁 ${Yo}</span>
        <span class="value">${f}</span>
      </div>
    `}const xt=[];xt.push(Xt("👤",Xo,t?.customerName||lc)),xt.push(Xt("📞",Jo,t?.phone||"—")),xt.push(Xt("🗓️",tc,Ge)),xt.push(Xt("🗓️",nc,Y)),xt.push(Xt("📦",ic,Si)),xt.push(Xt("⏱️",xe,Se)),xt.push(Xt("📝",ac,yc)),ss&&xt.push(ss);const xc=xt.join(""),Ic=u.length?u.map(f=>{const O=f.items[0]||{},ae=mn(O)||f.image,fe=ae?`<img src="${ae}" alt="${ze}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';let ve=[];if(Array.isArray(f.packageItems)&&f.packageItems.length)ve=[...f.packageItems];else{const ye=[];f.items.forEach($e=>{Array.isArray($e?.packageItems)&&$e.packageItems.length&&ye.push(...$e.packageItems)}),ve=ye}if(Array.isArray(ve)&&ve.length>1){const ye=new Set;ve=ve.filter($e=>{const ce=$e?.normalizedBarcode&&String($e.normalizedBarcode).toLowerCase()||$e?.barcode&&String($e.barcode).toLowerCase()||($e?.equipmentId!=null?`id:${$e.equipmentId}`:null);return ce?ye.has(ce)?!1:(ye.add(ce),!0):!0})}const ke=sa(f)||f.items.some(ye=>sa(ye))||ve.length>0,Te=(ye,{fallback:$e=1,max:ce=1e3}={})=>{const Pe=as(ye);return Number.isFinite(Pe)&&Pe>0?Math.min(ce,Pe):$e};let Ce;if(ke){const ye=Te(O?.qty??O?.quantity??O?.count,{fallback:NaN,max:999});Number.isFinite(ye)&&ye>0?Ce=ye:Ce=Te(f.quantity??f.count??1,{fallback:1,max:999})}else Ce=Te(f.quantity??f.count??O?.qty??O?.quantity??O?.count??0,{fallback:1,max:9999});const Nt=h(String(Ce)),He=(ye,{preferPositive:$e=!1}={})=>{let ce=Number.NaN;for(const Pe of ye){const gt=Fe(Pe);if(Number.isFinite(gt)){if($e&&gt>0)return gt;Number.isFinite(ce)||(ce=gt)}}return ce};let se,Le;if(ke){const ye=[O?.price,O?.unit_price,O?.unitPrice,f.unitPrice];if(se=He(ye,{preferPositive:!0}),!Number.isFinite(se)||se<0){const ce=Fe(f.totalPrice??O?.total??O?.total_price);Number.isFinite(ce)&&Ce>0&&(se=ce/Ce)}Number.isFinite(se)||(se=0);const $e=[O?.total,O?.total_price,f.totalPrice];if(Le=He($e),!Number.isFinite(Le))Le=se*Ce;else{const ce=se*Ce;Number.isFinite(ce)&&ce>0&&Math.abs(Le-ce)>ce*.25&&(Le=ce)}}else{const ye=[O?.price,O?.unit_price,O?.unitPrice,f.unitPrice];if(se=He(ye,{preferPositive:!0}),!Number.isFinite(se)||se<0){const $e=Fe(f.totalPrice??O?.total??O?.total_price);Number.isFinite($e)&&Ce>0&&(se=$e/Ce)}Number.isFinite(se)||(se=0),Le=Fe(f.totalPrice??O?.total??O?.total_price),Number.isFinite(Le)||(Le=se*Ce)}se=Ie(se),Le=Ie(Le);const ct=`${h(se.toFixed(2))} ${I}`,lt=`${h(Le.toFixed(2))} ${I}`,Tt=f.barcodes.map(ye=>h(String(ye||""))).filter(Boolean),dt=Tt.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${Tt.map(ye=>`<li>${ye}</li>`).join("")}
              </ul>
            </details>`:"";let bt="";if(ve.length){const ye=new Map,$e=ce=>{const Pe=as(ce?.qtyPerPackage??ce?.perPackageQty??ce?.quantityPerPackage);return Number.isFinite(Pe)&&Pe>0&&Pe<=99?Math.round(Pe):1};if(ve.forEach(ce=>{if(!ce)return;const Pe=ie(ce.barcode||ce.normalizedBarcode||ce.desc||Math.random());if(!Pe)return;const gt=ye.get(Pe),hn=$e(ce);if(gt){gt.qty=hn,gt.total=hn;return}ye.set(Pe,{desc:ce.desc||ce.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(hn,99)),total:Math.max(1,Math.min(hn,99)),barcode:ce.barcode??ce.normalizedBarcode??""})}),ye.size){const ce=Array.from(ye.values()).map(Pe=>{const gt=h(String(Pe.qty>0?Math.min(Pe.qty,99):1)),hn=Ye(Pe.desc||""),Cc=Pe.barcode?` <span class="reservation-package-items__barcode">(${Ye(h(String(Pe.barcode)))})</span>`:"";return`<li>${hn}${Cc} × ${gt}</li>`}).join("");bt=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${ce}
                </ul>
              </details>
            `}}const Pc=ke?`${bt||""}${dt||""}`:dt;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${fe}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${Ye(O.desc||O.description||O.name||f.description||"-")}</div>
                  ${Pc}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Ye(Oe.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Nt}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Ye(Oe.unitPrice)}">${ct}</td>
            <td class="reservation-modal-items-table__cell" data-label="${Ye(Oe.total)}">${lt}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${Ye(Oe.actions)}">
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
  `,kc=x.map((f,O)=>{const ae=h(String(O+1));let fe=f.positionLabel??f.position_name??f.position_label??f.position_title??f.role??f.position??null;if((!fe||fe.trim()==="")&&(fe=f.positionLabelAr??f.position_label_ar??f.position_title_ar??f.positionLabelEn??f.position_label_en??f.position_name_ar??f.position_title_en??f.position_name_en??null),!fe||fe.trim()==="")try{const ct=typeof Bt=="function"?Bt():[],lt=f.positionId?ct.find(bt=>String(bt.id)===String(f.positionId)):null,Tt=!lt&&f.positionKey?ct.find(bt=>String(bt.name).toLowerCase()===String(f.positionKey).toLowerCase()):null,dt=lt||Tt||null;dt&&(fe=dt.labelAr||dt.labelEn||dt.name||fe)}catch{}const ve=ls(fe)||o("reservations.crew.positionFallback","منصب بدون اسم"),ke=ls(f.positionLabelAlt??f.position_label_alt??f.positionLabelEn??f.position_label_en??f.positionLabelAr??f.position_label_ar??f.position_name_en??f.position_name_ar??""),Te=ls(f.technicianName)||o("technicians.picker.noTechnicianOption","— بدون تعيين —"),Ce=f.technicianPhone||re,Nt=Ie(Fe(f.positionCost??f.position_cost??f.cost??f.daily_wage??f.dailyWage??f.internal_cost??0));let He=Ie(Fe(f.positionClientPrice??f.position_client_price??f.client_price??f.customer_price??f.position_price??f.clientPrice??f.daily_total??f.dailyTotal??f.total??0));if(!Number.isFinite(He)||He<=0)try{const ct=Bt?Bt():[],lt=f.positionId?ct.find(bt=>String(bt.id)===String(f.positionId)):null,Tt=!lt&&f.positionKey?ct.find(bt=>String(bt.name).toLowerCase()===String(f.positionKey).toLowerCase()):null,dt=lt||Tt||null;dt&&Number.isFinite(Number(dt.clientPrice))&&(He=Ie(Number(dt.clientPrice)))}catch{}const se=`${h(He.toFixed(2))} ${I}`,Le=Nt>0?`${h(Nt.toFixed(2))} ${I}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${ae}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${Te}</span>
            <small class="text-muted">🏷️ ${ve}${ke?` — ${ke}`:""}</small>
            <small class="text-muted">💼 ${se}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${Ce}</div>
          ${Le?`<div>💵 ${o("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${Le}</div>`:""}
        </div>
      </div>
    `}).join(""),$c=x.length?`<div class="reservation-technicians-grid">${kc}</div>`:`<ul class="reservation-modal-technicians"><li>${M}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${ta}</span>
          <strong>${Ne}</strong>
        </div>
        <div class="status-chips">
          ${wc}
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
              ${Ac}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Xe}</span>
          <span class="count">${fc}</span>
        </div>
        ${$c}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${wt}</span>
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
  `}const Pm="project",Cm="editProject",Lm=3600*1e3,Gr=.15,jm=6,Nm="projectsTab",Tm="projectsSubTab",Bm={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},Dm={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},pd=`@page {
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
`,fd=/color\([^)]*\)/gi,yd=/color-mix\([^)]*\)/gi,bd=/oklab\([^)]*\)/gi,gd=/oklch\([^)]*\)/gi,Mt=/(color\(|color-mix\(|oklab|oklch)/i,hd=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke","boxShadow","textShadow","accentColor","caretColor","columnRuleColor"],vd=typeof document<"u"?document.createElement("canvas"):null,oa=vd?.getContext?.("2d")||null;function Wr(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function Is(e,t="#000"){if(!oa||!e)return t;try{return oa.fillStyle="#000",oa.fillStyle=e,oa.fillStyle||t}catch{return t}}function qd(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&Mt.test(n)){const s=Is(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function qn(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function Xr(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const i=t.getComputedStyle(s);if(!i)return;hd.forEach(c=>{const l=i[c];if(l&&Mt.test(l)){const d=Wr(c);if(qn(n,s,d),c==="boxShadow"||c==="textShadow")s.style.setProperty(d,"none","important");else{const u=c==="backgroundColor"?"#ffffff":i.color||"#000000",b=Is(l,u);s.style.setProperty(d,b,"important")}}});const r=i.backgroundImage;if(r&&Mt.test(r)){const c=Is(i.backgroundColor||"#ffffff","#ffffff");qn(n,s,"background-image"),qn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function Jr(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const i=t.getComputedStyle(s);if(!i)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","boxShadow","textShadow","accentColor","caretColor","columnRuleColor"].forEach(c=>{const l=i[c];if(l&&Mt.test(l)){const d=Wr(c);if(qn(n,s,d),c==="boxShadow"||c==="textShadow")s.style.setProperty(d,"none","important");else{const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(d,u,"important")}}});const r=i.backgroundImage;r&&Mt.test(r)&&(qn(n,s,"background-image"),qn(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function Yr(e){if(!e)return;const t=(n="")=>{if(typeof n!="string")return n;let a=n;return Mt.test(a)&&(a=a.replace(fd,"#000").replace(yd,"#000").replace(bd,"#000").replace(gd,"#000")),a};e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&Mt.test(a)&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&Mt.test(a)&&n.setAttribute("style",t(a))})}const Zr="reservations.quote.sequence",Mi={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},eo="https://help.artratio.sa/guide/quote-preview",Me={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Sd=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],et=[...Sd],Ed=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function _s(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...et]}function Ad(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=_s(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=_s(t.value);if(a.length)return a}const n=et.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...et]}const wd=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],ri=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>{if(e?.isPackage){const t=e?.packageCodeResolved||e?.barcode||"";return A(t||"-")}return A(e?.barcode||"-")}},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>A(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>A(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>A(h(Number(e?.price||0).toFixed(2)))}],oi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(h(String(t+1)))},{id:"position",labelKey:"reservations.details.crew.position",fallback:"المنصب",render:e=>A(h(e?.positionLabel??e?.position_name??e?.role??o("reservations.crew.positionFallback","منصب بدون اسم")))},{id:"price",labelKey:"reservations.details.crew.clientPrice",fallback:"سعر العميل",render:e=>{const t=Number.isFinite(Number(e?.positionClientPrice))?Number(e.positionClientPrice):0;return A(`${h(t.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}}],ks={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:ri.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:oi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},xd=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(h(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>A(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>A(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>A(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],to=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>A(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>A(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>A(e?.note||"-")}],Id=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>A(h(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>A(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>A(h(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>A(h(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>A(e?.displayCost||"—")}],_d=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],kd={customerInfo:ks.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:ks.payment,projectExpenses:to.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:xd.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:Id.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},ds=new Map;function Qa(e="reservation"){if(ds.has(e))return ds.get(e);const t=e==="project"?_d:wd,n=e==="project"?kd:ks,a=new Set(t.map(({id:r})=>r)),s=Object.fromEntries(Object.entries(n).map(([r,c=[]])=>[r,new Set(c.map(l=>l.id))])),i={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return ds.set(e,i),i}function Ga(e="reservation"){return Qa(e).sectionDefs}function no(e="reservation"){return Qa(e).fieldDefs}function ao(e="reservation"){return Qa(e).sectionIdSet}function so(e="reservation"){return Qa(e).fieldIdMap}function io(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const $d="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",Pd="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",Cd="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",ro=pd.trim(),oo=/^data:image\/svg\+xml/i,Ld=/\.svg($|[?#])/i,Fn=512,$s="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",co=96,lo=25.4,Ps=210,ua=297,ma=Math.round(Ps/lo*co),pa=Math.round(ua/lo*co),jd=2,uo=/safari/i,Nd=/(iphone|ipad|ipod)/i,zi=/(iphone|ipad|ipod)/i,Td=/(crios|fxios|edgios|opios)/i,ka="[reservations/pdf]";let Z=null,C=null,vt=1,Tn=null,Bn=null,Ft=null,Sn=null,Mn=!1;function nn(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!Z?.statusIndicator||!Z?.statusText)return;Z.statusKind=e;const i=t||io(e);Z.statusText.textContent=i,Z.statusSpinner&&(Z.statusSpinner.hidden=!s),Z.statusAction&&(Z.statusAction.hidden=!0,Z.statusAction.onclick=null,n&&typeof a=="function"&&(Z.statusAction.textContent=n,Z.statusAction.hidden=!1,Z.statusAction.onclick=r=>{r.preventDefault(),a()})),Z.statusIndicator.hidden=!1,requestAnimationFrame(()=>{Z.statusIndicator.classList.add("is-visible")})}function En(e){try{return String(e||"").toLowerCase().normalize("NFKD").replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,"").replace(/\s+/g," ").trim()}catch{return String(e||"").trim().toLowerCase()}}function zn(e){!Z?.statusIndicator||!Z?.statusText||(Z.statusKind=null,Z.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{Z?.statusIndicator&&(Z.statusIndicator.hidden=!0,Z.statusAction&&(Z.statusAction.hidden=!0,Z.statusAction.onclick=null),Z.statusSpinner&&(Z.statusSpinner.hidden=!1))},220))}function Cs(){return!!window?.bootstrap?.Modal}function Bd(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),Ft||(Ft=document.createElement("div"),Ft.className="modal-backdrop fade show",Ft.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(Ft)),Sn||(Sn=t=>{t.key==="Escape"&&Ls(e)},document.addEventListener("keydown",Sn));try{e.focus({preventScroll:!0})}catch{}}}function Ls(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),Ft&&(Ft.remove(),Ft=null),Sn&&(document.removeEventListener("keydown",Sn),Sn=null))}function Dd(e){if(e){if(Cs()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}Bd(e)}}function Fd(){if(Mn)return;Mn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!Z?.modal?.classList.contains("show"),s=()=>{Z?.modal?.classList.contains("show")&&(nn("render"),Mn=!1,yn())};tr({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:eo}),a&&nn("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function Wa(e="reservation"){const t={},n=no(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(i=>i?.default!==!1).map(i=>i.id))}),t}function ci(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function Rd(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function li(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function di(e="reservation"){return Object.fromEntries(Ga(e).map(({id:t})=>[t,!1]))}function ui(e,t){return e.sectionExpansions||(e.sectionExpansions=di(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Md(e,t){return ui(e,t)?.[t]!==!1}function mi(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function zd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Nd.test(e)}function Od(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=uo.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function mo(){return zd()&&Od()}function Xa(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=zi.test(e)||zi.test(t),s=/Macintosh/i.test(e)&&n>1;return uo.test(e)&&!Td.test(e)&&(a||s)}function us(e,...t){try{console.log(`${ka} ${e}`,...t)}catch{}}function $t(e,...t){try{console.warn(`${ka} ${e}`,...t)}catch{}}function Hd(e,t,...n){try{t?console.error(`${ka} ${e}`,t,...n):console.error(`${ka} ${e}`,...n)}catch{}}function je(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Vd(e,t="لا توجد بيانات للعرض."){const n=A(o(e,t));return je(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function $a(e,t){return Array.isArray(e)&&e.length?e:[Vd(t)]}const Ud=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function po(e=""){return Ud.test(e)}function Kd(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(i,...r){if(typeof i!="string"||!po(i))return a.call(this,i,...r);let c,l=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),l=!0)}catch{}try{if(!l){const d=this.canvas;d&&d.style?.direction!=="rtl"&&(d.__artRatioOriginalDirection=d.style.direction,d.style.direction="rtl")}return a.call(this,i,...r)}finally{if(l&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!l){const d=this.canvas;d&&d.__artRatioOriginalDirection!==void 0&&(d.style.direction=d.__artRatioOriginalDirection,delete d.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function Oi(e,t=Fn){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Qd(e){if(!e)return{width:Fn,height:Fn};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?Oi(t,0):0,s=n?Oi(n,0):0;if(a>0&&s>0)return{width:a,height:s};const i=e.getAttribute?.("viewBox");if(i){const r=i.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(r.length>=4){const[,,c,l]=r;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(l)&&l>0?l:0)}}return{width:a||Fn,height:s||Fn}}function fo(e=""){return typeof e!="string"?!1:oo.test(e)||Ld.test(e)}function Gd(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Wd(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=i=>{const r=i?.message||`Unable to load image from ${e}`;a(new Error(r))},s.src=e})}async function yo(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const i=await Wd(s),r=n.createElement("canvas"),c=Math.max(t.width||i.naturalWidth||i.width||0,1),l=Math.max(t.height||i.naturalHeight||i.height||c,1);r.width=c,r.height=l;const d=r.getContext("2d");return d.clearRect(0,0,c,l),d.drawImage(i,0,0,c,l),r.toDataURL("image/png")}catch(i){return console.warn("[reservations/pdf] failed to rasterize SVG content",i),null}finally{URL.revokeObjectURL(s)}}async function Xd(e){if(!e)return null;if(oo.test(e))return Gd(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Jd(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!fo(t))return!1;const n=await Xd(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",$s),!1;const a=await yo(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",$s),!1)}async function Yd(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Qd(e),s=await yo(n,a),r=(e.ownerDocument||document).createElement("img");r.setAttribute("src",s||$s),r.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),r.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&r.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&r.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),l=e.getAttribute("height");return c&&r.setAttribute("width",c),l&&r.setAttribute("height",l),e.parentNode?.replaceChild(r,e),!!s}async function bo(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{fo(s.getAttribute?.("src"))&&a.push(Jd(s))}),n.forEach(s=>{a.push(Yd(s))}),a.length&&await Promise.allSettled(a)}function Zd(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const i=(D,J=0)=>{const B=parseFloat(D);return Number.isFinite(B)?B:J},r=i(s.paddingTop),c=i(s.paddingBottom),l=i(s.paddingRight),d=i(s.paddingLeft),u=i(s.borderRadius),b=i(s.fontSize,14),y=(()=>{const D=s.lineHeight;if(!D||D==="normal")return b*1.6;const J=i(D,b*1.6);return J>0?J:b*1.6})(),m=Math.max(e.clientWidth||0,e.scrollWidth||0,i(s.width,0));if(m<=0)return null;const p=Math.max(1,m-d-l),g=e.textContent||"",v=g.split(/\r?\n/),_=n.createElement("canvas"),q=_.getContext("2d");if(!q)return null;const k=s.fontStyle||"normal",x=s.fontVariant||"normal",U=s.fontWeight||"400",S=s.fontFamily||"sans-serif",w=s.fontStretch||"normal",L=D=>D.join(" "),j=[],W=D=>q.measureText(D).width;q.font=`${k} ${x} ${U} ${w} ${b}px ${S}`,v.forEach(D=>{const J=D.trim();if(J.length===0){j.push("");return}const B=J.split(/\s+/);let V=[];B.forEach((R,ee)=>{const me=R.trim();if(!me)return;const de=L(V.concat(me));if(W(de)<=p||V.length===0){V.push(me);return}j.push(L(V)),V=[me]}),V.length&&j.push(L(V))}),j.length||j.push("");const $=r+c+j.length*y,F=Math.ceil(Math.max(1,m)*t),X=Math.ceil(Math.max(1,$)*t);_.width=F,_.height=X,_.style.width=`${Math.max(1,m)}px`,_.style.height=`${Math.max(1,$)}px`,q.scale(t,t);const N=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){q.save(),q.beginPath();const D=Math.max(1,m),J=Math.max(1,$),B=Math.min(u,D/2,J/2);q.moveTo(B,0),q.lineTo(D-B,0),q.quadraticCurveTo(D,0,D,B),q.lineTo(D,J-B),q.quadraticCurveTo(D,J,D-B,J),q.lineTo(B,J),q.quadraticCurveTo(0,J,0,J-B),q.lineTo(0,B),q.quadraticCurveTo(0,0,B,0),q.closePath(),q.clip()}if(q.fillStyle=N,q.fillRect(0,0,Math.max(1,m),Math.max(1,$)),q.font=`${k} ${x} ${U} ${w} ${b}px ${S}`,q.fillStyle=s.color||"#000000",q.textBaseline="top",q.textAlign="right","direction"in q)try{q.direction="rtl"}catch{}const T=Math.max(0,m-l);let P=r;j.forEach(D=>{const J=D.length?D:" ";q.fillText(J,T,P,p),P+=y});const H=n.createElement("img");let Q;try{Q=_.toDataURL("image/png")}catch(D){return $t("note canvas toDataURL failed",D),null}return H.src=Q,H.alt=g,H.style.width=`${Math.max(1,m)}px`,H.style.height=`${Math.max(1,$)}px`,H.style.display="block",H.setAttribute("data-quote-note-image","true"),{image:H,canvas:_,totalHeight:$,width:m}}function eu(e,{pixelRatio:t=1}={}){if(!e||!Xa())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!po(a.textContent||""))return;let s;try{s=Zd(a,{pixelRatio:t})}catch(i){$t("failed to rasterize note content",i),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function js(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){Hd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const i=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),r=n||i,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),l=o("reservations.quote.toast.retry","إعادة المحاولة"),d=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(nn("export"),$o()):(nn("render"),Mn=!1,yn())};if(tr({message:r,duration:9e3,actionLabel:d?l:void 0,onAction:d?u:void 0,linkLabel:c,linkHref:eo}),Z?.modal?.classList.contains("show")&&nn("error",{message:r,actionLabel:d?l:void 0,onAction:d?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function Ns({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){$t("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){$t("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function pi(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",i=>n(i)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=i=>n(i),document.head.appendChild(s)})}function Hi(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function Vi(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function tu(){const e=Vi();return e||(Bn||(Bn=pi(Pd).catch(t=>{throw Bn=null,t}).then(()=>{const t=Vi();if(!t)throw Bn=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Bn)}async function nu(){const e=Hi();return e||(Tn||(Tn=pi(Cd).catch(t=>{throw Tn=null,t}).then(()=>{const t=Hi();if(!t)throw Tn=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),Tn)}async function au(){if(window.html2pdf||await pi($d),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}qd(),Kd()}function A(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function su(e="reservation"){return e==="project"?"QP":"Q"}function iu(e,t="reservation"){const n=Number(e),a=su(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function ru(){const e=window.localStorage?.getItem?.(Zr),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function go(e="reservation"){const n=ru()+1;return{sequence:n,quoteNumber:iu(n,e)}}function ou(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(Zr,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function ho(e="reservation"){return Mi[e]||Mi.reservation}function cu(e="reservation"){try{const t=ho(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function lu(e,t="reservation"){try{const n=ho(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function du(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function uu(e,t="reservation"){if(!e)return null;const n=ao(t),a=so(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),i={},r=e.fields||{};return Object.entries(a).forEach(([c,l])=>{const d=r[c];if(d==null)return;const{ids:u,emptyExplicitly:b}=du(d);if(!u&&!b)return;const y=Array.isArray(u)?u.filter(m=>l.has(m)):[];(y.length>0||b)&&(i[c]=y)}),{version:1,sections:s,fields:i}}function vo(e){if(!e)return;const t=e.context||"reservation",n=uu(e,t);n&&lu(n,t)}function qo(e){if(!e)return;const t=e.context||"reservation",n=cu(t);if(!n)return;const a=ao(t),s=Array.isArray(n.sections)?n.sections.filter(i=>a.has(i)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const i=ci(e.fields||Wa(t)),r=so(t);Object.entries(n.fields).forEach(([c,l])=>{const d=r[c];if(!d)return;const u=Array.isArray(l)?l.filter(b=>d.has(b)):[];i[c]=new Set(u)}),e.fields=i}}function So(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function Eo(e){const t=sn()||[],{technicians:n=[]}=pe(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const c=String(r.id),l=s.get(c)||{};s.set(c,{...l,...r})}),(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(r=>({technicianId:r}))).map((r,c)=>{const l=r?.technicianId!=null?s.get(String(r.technicianId)):null;let d=r.positionLabel??r.position_name??r.position_label??r.role??r.position??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم");(!d||d.trim()==="")&&(d=r.positionLabelAr??r.position_label_ar??r.positionLabelEn??r.position_label_en??r.position_name_ar??r.position_name_en??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم"));try{const y=typeof Bt=="function"?Bt()||[]:[];let m=null;if(r?.positionId!=null&&(m=y.find(p=>String(p?.id)===String(r.positionId))||null),!m){const p=r.positionKey??r.position_key??r.positionName??r.position_name??r.position??"";if(p&&(m=typeof ba=="function"&&ba(p)||null,!m&&y.length)){const g=String(p).trim().toLowerCase();m=y.find(v=>[v.name,v.labelAr,v.labelEn].filter(Boolean).map(_=>String(_).toLowerCase()).includes(g))||null}}if(m){const p=m.labelAr||m.labelEn||m.name||"";p&&p.trim()&&(d=p)}}catch{}const u=Ie(Fe(r.positionCost??r.position_cost??r.cost??r.daily_wage??r.dailyWage??l?.dailyWage??l?.wage??0)),b=Ie(Fe(r.positionClientPrice??r.position_client_price??r.client_price??r.clientPrice??r.daily_total??r.dailyTotal??r.total??l?.dailyTotal??l?.total??l?.total_wage??0));return{assignmentId:r.assignmentId??r.assignment_id??`crew-${c}`,positionId:r.positionId??r.position_id??null,positionLabel:d,positionLabelAlt:r.positionLabelAlt??r.position_label_alt??"",positionCost:u,positionClientPrice:b,technicianId:r.technicianId!=null?String(r.technicianId):l?.id!=null?String(l.id):null,technicianName:r.technicianName??r.technician_name??l?.name??null,technicianRole:r.technicianRole??l?.role??null}})}function mu(e,t,n){const{projectLinked:a}=Vt(e,n);Fa(e.start,e.end);const s=e.discount??e.discountValue??0,i=Number(h(String(s)))||0,r=e.discountType??e.discount_type??"percent",c=String(r).toLowerCase()==="amount"?"amount":"percent",l=a?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),d=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,u=d!=null?Fe(d):Number.NaN,y=(e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied)===!0&&Number.isFinite(u)&&u>0?u:null,m=Array.isArray(t)?t.map(x=>x?.technicianId).filter(Boolean):[],p=dr({items:Array.isArray(e.items)?e.items:[],technicianIds:m,crewAssignments:Array.isArray(t)?t:[],discount:i,discountType:c,applyTax:l,start:e.start,end:e.end,companySharePercent:y}),g=Fe(e.cost??e.total??e.finalTotal),v=Number.isFinite(g),_=a?p.finalTotal:v?Ie(g):p.finalTotal,q={equipmentTotal:p.equipmentTotal,crewTotal:p.crewTotal,crewCostTotal:p.crewCostTotal,discountAmount:p.discountAmount,subtotalAfterDiscount:p.subtotalAfterDiscount,taxableAmount:p.taxableAmount,taxAmount:p.taxAmount,finalTotal:_,companySharePercent:p.companySharePercent,companyShareAmount:p.companyShareAmount,netProfit:p.netProfit},k={equipmentTotal:h(p.equipmentTotal.toFixed(2)),crewTotal:h(p.crewTotal.toFixed(2)),discountAmount:h(p.discountAmount.toFixed(2)),subtotalAfterDiscount:h(p.subtotalAfterDiscount.toFixed(2)),taxableAmount:h(p.taxableAmount.toFixed(2)),taxAmount:h(p.taxAmount.toFixed(2)),finalTotal:h(_.toFixed(2)),companySharePercent:h((Number.isFinite(p.companySharePercent)?p.companySharePercent:0).toFixed(2)),companyShareAmount:h(p.companyShareAmount.toFixed(2)),netProfit:h(p.netProfit.toFixed(2))};return{totals:q,totalsDisplay:k,rentalDays:p.rentalDays}}function _n(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function Ao(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function pu(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=_n(e.amount??(n==="amount"?e.value:null)),s=_n(e.percentage??(n==="percent"?e.value:null)),i=n==="percent"?s??null:a??null,r=e.note??e.memo??null,c=Ao(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:i,note:r,recordedAt:c}}function fu(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(pu).filter(Boolean);if(n.length>0)return n;const a=_n(e.paidPercent??e.paid_percent),s=_n(e.paidAmount??e.paid_amount),i=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,r=Ao(i);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:r}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:r}]:[]}function yu(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function bu(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function gu(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function hu(e){const t=Number(e?.equipmentEstimate)||0,n=gu(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",i=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?i:a*(i/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const l=Math.max(0,a-c),d=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,b=d&&s&&u>0?u:0,y=b>0?Number((l*(b/100)).toFixed(2)):0,m=l+y;let p=s?m*Gr:0;(!Number.isFinite(p)||p<0)&&(p=0),p=Number(p.toFixed(2));let g=s?Number(e?.totalWithTax):m;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((m+p).toFixed(2))):g=m,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:l,companyShareAmount:y,subtotal:m,applyTax:s,taxAmount:p,totalWithTax:g}}function vu(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",i=Array.isArray(e.crewAssignments)?e.crewAssignments:[],r=i.length?i:Array.isArray(e.technicians)?e.technicians:[],c=Hs(t,a,s,!1,r,{start:e.start,end:e.end});if(Number.isFinite(c))return c;const l=Number(h(String(e.cost??0)));return Number.isFinite(l)?Math.round(l):0}function qu(e,t){if(!e)return"—";const n=it(e);return t?`${n} - ${it(t)}`:n}function ue(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${h(a.toFixed(s))} ${t}`}function Ui(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function Su(e){if(!e?.start)return null;if(!e?.end)return 1;const t=Fa(e.start,e.end);return Number.isFinite(t)?t:1}function Eu(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function Au(e){const t=o("reservations.create.summary.currency","SR"),n=pe()||{},a=Array.isArray(n.customers)?n.customers:[],s=Array.isArray(n.projects)?n.projects:[],i=Array.isArray(n.technicians)?n.technicians:[];let r=[];try{const I=Rt?.()||[];r=Array.isArray(I)&&I.length?I:n.reservations||[]}catch{r=n.reservations||[]}const c=e?.id!=null?s.find(I=>String(I.id)===String(e.id))||e:e||null,l={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!c)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:l.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:ue(0,t),expensesTotal:ue(0,t),reservationsTotal:ue(0,t),discountAmount:ue(0,t),taxAmount:ue(0,t),overallTotal:ue(0,t),paidAmount:ue(0,t),remainingAmount:ue(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:l.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:ue(0,t),remainingAmountDisplay:ue(0,t),paidPercentDisplay:Ui(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:l.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const d=c.clientId??c.customerId??c.client_id??c.customer_id??null,u=d!=null&&a.find(I=>String(I.id)===String(d))||null,b=u?.customerName??u?.name??c.clientName??c.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),y=(c.clientCompany||u?.companyName||u?.company||"").trim(),m=u?.phone??u?.customerPhone??c.clientPhone??c.customerPhone??"",p=m?h(String(m).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),g=u?.email??c.clientEmail??c.customerEmail??"",v=g?String(g).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),_=c.projectCode||`PRJ-${h(String(c.id??""))}`,q=h(String(_)),k=(c.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),x=yu(c.type),U=c.start?it(c.start):"—",S=c.end?it(c.end):"—",w=Su(c),L=w!=null?Eu(w):"غير محدد",j=bu(c),W={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},$=o(`projects.status.${j}`,W[j]||j),F=c.id!=null?String(c.id):null,X=F?r.filter(I=>String(I.projectId)===F):[],T=X.map(I=>{const oe=I.reservationId||I.id||"",K=I.status||I.state||"pending",he=String(K).toLowerCase(),Ae=o(`reservations.status.${he}`,he),xe=vu(I),Ve=I.start?new Date(I.start).getTime():0;return{reservationId:h(String(oe||"-")),status:he,statusLabel:Ae,total:xe,totalLabel:ue(xe,t),dateRange:qu(I.start,I.end),startTimestamp:Number.isNaN(Ve)?0:Ve}}).sort((I,oe)=>oe.startTimestamp-I.startTimestamp).map(({startTimestamp:I,...oe})=>oe).reduce((I,oe)=>I+(Number(oe.total)||0),0),P=[];try{X.forEach(I=>{const{groups:oe}=Qs(I);oe.forEach(K=>{const he=Number(K?.count??K?.quantity??1)||1,Ae=Number(K?.unitPrice);let xe=Number.isFinite(Ae)?Ae:0;if(!xe||xe<=0){const re=Number(K?.totalPrice);Number.isFinite(re)&&he>0&&(xe=Number((re/he).toFixed(2)))}Number.isFinite(xe)||(xe=0);const Ve=K?.type==="package"||Array.isArray(K?.items)&&K.items.some(re=>re?.type==="package"),We=Array.isArray(K?.barcodes)&&K.barcodes.length?K.barcodes[0]:Array.isArray(K?.items)&&K.items.length?K.items[0]?.barcode:null;let ze=K?.packageDisplayCode??K?.package_code??K?.code??K?.packageCode??(Array.isArray(K?.items)&&K.items.length?K.items[0]?.package_code??K.items[0]?.code??K.items[0]?.packageCode:null);const Oe=re=>{const _e=(re==null?"":String(re)).trim();return!!(!_e||/^pkg-/i.test(_e)||/^\d+$/.test(_e)&&_e.length<=4)};if(!ze||Oe(ze)){const re=K?.packageId??K?.package_id??(Array.isArray(K?.items)&&K.items.length?K.items[0]?.packageId??K.items[0]?.package_id:null);if(re)try{const _e=Os(re);_e&&_e.package_code&&(ze=_e.package_code)}catch{}}if(!ze||Oe(ze))try{const re=En(K?.description||"");if(re){const _e=ur();let Ue=_e.find(tt=>En(tt?.name||tt?.title||tt?.label||"")===re);Ue||(Ue=_e.find(tt=>{const Gt=En(tt?.name||tt?.title||tt?.label||"");return Gt.includes(re)||re.includes(Gt)})),Ue&&Ue.package_code&&(ze=Ue.package_code)}}catch{}const Lt=Ve?ze??We??"":K?.barcode??We??"",M=Lt!=null?String(Lt):"";P.push({...K,isPackage:Ve,desc:K?.description,barcode:M,packageCodeResolved:ze||"",qty:he,price:xe,totalPrice,unitPriceValue:xe})})})}catch{}const H=new Map;X.forEach(I=>{const oe=Array.isArray(I.items)?I.items:[],K=Fa(I.start,I.end),he=I.reservationId||I.id||"";oe.forEach((Ae,xe)=>{if(!Ae)return;const Ve=Ae.barcode||Ae.code||Ae.id||Ae.desc||Ae.description||`item-${xe}`,We=String(Ve||`item-${xe}`),ze=H.get(We)||{description:Ae.desc||Ae.description||Ae.name||Ae.barcode||`#${h(String(xe+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},Oe=Number(Ae.qty)||1,Lt=Number(Ae.price)||0;ze.totalQuantity+=Oe,ze.reservationIds.add(String(he));const M=Lt*Oe*Math.max(1,K);Number.isFinite(M)&&(ze.totalCost+=M),H.set(We,ze)})});const Q=Array.from(H.values()).map(I=>({description:I.description,totalQuantity:I.totalQuantity,reservationsCount:I.reservationIds.size,displayCost:ue(I.totalCost,t)})),D=new Map((i||[]).filter(Boolean).map(I=>[String(I.id),I])),J=new Map,B=I=>{if(!I)return;let oe=null;typeof I=="object"?oe=I.id??I.technicianId??I.technician_id??I.userId??I.user_id??null:(typeof I=="string"||typeof I=="number")&&(oe=I);const K=oe!=null?String(oe):null,he=K&&D.has(K)?D.get(K):typeof I=="object"?I:null,Ae=he?.name||he?.full_name||he?.fullName||he?.displayName||(typeof I=="string"?I:null),xe=he?.role||he?.title||null,Ve=he?.phone||he?.mobile||he?.contact||null;if(!Ae&&!K)return;const We=K||Ae;J.has(We)||J.set(We,{id:K,name:Ae||"-",role:xe||null,phone:Ve||null})};Array.isArray(c?.technicians)&&c.technicians.forEach(I=>B(I)),X.forEach(I=>{(Array.isArray(I.crewAssignments)&&I.crewAssignments.length?I.crewAssignments:Array.isArray(I.technicians)?I.technicians.map(K=>({technicianId:K})):[]).forEach(K=>B(K))});const V=Array.from(J.values()),R=Array.isArray(c.expenses)?c.expenses.map(I=>{const oe=Number(I?.amount)||0;return{label:I?.label||I?.name||"-",amount:oe,displayAmount:ue(oe,t),note:I?.note||I?.description||""}}):[],ee=hu(c),me=ee.applyTax?Number(((ee.subtotal+T)*Gr).toFixed(2)):0,de=Number((ee.subtotal+T+me).toFixed(2)),Ee=fu(c),ge=_n(c.paidAmount??c.paid_amount)||0,G=_n(c.paidPercent??c.paid_percent)||0,te=Vs({totalAmount:de,paidAmount:ge,paidPercent:G,history:Ee}),we=typeof c.paymentStatus=="string"?c.paymentStatus.toLowerCase():"",Ne=Us({manualStatus:we,paidAmount:te.paidAmount,paidPercent:te.paidPercent,totalAmount:de}),Ge={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},Y=o(`projects.paymentStatus.${Ne}`,Ge[Ne]||Ne),ne=Number(te.paidAmount||0),le=Number(te.paidPercent||0),qe=Math.max(0,Number((de-ne).toFixed(2))),Be={projectSubtotal:ue(ee.subtotal,t),expensesTotal:ue(ee.expensesTotal,t),reservationsTotal:ue(T,t),discountAmount:ue(ee.discountAmount,t),taxAmount:ue(me,t),overallTotal:ue(de,t),paidAmount:ue(ne,t),remainingAmount:ue(qe,t)},ft={status:Ne,statusLabel:Y,paidAmount:ne,paidPercent:le,remainingAmount:qe,paidAmountDisplay:ue(ne,t),remainingAmountDisplay:ue(qe,t),paidPercentDisplay:Ui(le)},z=(c.description||"").trim();return{project:c,customer:u,clientInfo:{name:b,company:y||"—",phone:p,email:v},projectInfo:{title:k,code:q,typeLabel:x,startDisplay:U,endDisplay:S,durationLabel:L,statusLabel:$},expenses:R,equipment:Q,crew:V,equipmentItems:P,crewAssignments:X.flatMap(I=>Eo(I)),totals:ee,totalsDisplay:Be,projectTotals:{combinedTaxAmount:me,overallTotal:de,reservationsTotal:T,paidAmount:ne,paidPercent:le,remainingAmount:qe,paymentStatus:Ne},paymentSummary:ft,notes:z,currencyLabel:t,projectStatus:j,projectStatusLabel:$,projectDurationDays:w,projectDurationLabel:L,paymentHistory:Ee}}function wu({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:i=[],totalsDisplay:r={},projectTotals:c={},paymentSummary:l={},currencyLabel:d="SR",sections:u,fieldSelections:b={},quoteNumber:y,quoteDate:m,terms:p=et}){const g=ci(b),v=(Y,ne)=>li(g,Y,ne),_=Y=>u?.has?.(Y),q=`<div class="quote-placeholder">${A(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,k=(Y,ne)=>`<div class="info-plain__item">
      <span class="info-plain__label">${A(Y)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${A(ne)}</span>
    </div>`,x=(Y,ne,{variant:le="inline"}={})=>le==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${A(Y)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${A(ne)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${A(Y)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${A(ne)}</span>
    </span>`,U=(Y,ne)=>`<div class="payment-row">
      <span class="payment-row__label">${A(Y)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${A(ne)}</span>
    </div>`,S=[];v("customerInfo","customerName")&&S.push(k(o("projects.details.client","العميل"),t.name||"-")),v("customerInfo","customerCompany")&&S.push(k(o("projects.details.company","شركة العميل"),t.company||"—")),v("customerInfo","customerPhone")&&S.push(k(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),v("customerInfo","customerEmail")&&S.push(k(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const w=_("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${A(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${S.length?`<div class="info-plain">${S.join("")}</div>`:q}
      </section>`:"",L=[];v("projectInfo","projectType")&&L.push(k(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),v("projectInfo","projectTitle")&&L.push(k(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),v("projectInfo","projectCode")&&L.push(k(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),v("projectInfo","projectStart")&&L.push(k(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),v("projectInfo","projectEnd")&&L.push(k(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),v("projectInfo","projectDuration")&&L.push(k(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),v("projectInfo","projectStatus")&&L.push(k(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const j=_("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${A(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${L.length?`<div class="info-plain">${L.join("")}</div>`:q}
      </section>`:"",W=oi.filter(Y=>v("crew",Y.id)),$=Array.isArray(C?.crewAssignments)?C.crewAssignments:[],F=_("projectCrew")?W.length?`<section class="quote-section quote-section--table">
            <h3>${A(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${W.map(Y=>`<th>${A(Y.labelKey?o(Y.labelKey,Y.fallback):Y.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${$.length?$.map((Y,ne)=>`<tr>${W.map(le=>`<td>${le.render(Y,ne)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(W.length,1)}" class="empty">${A(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${q}
          </section>`:"",X=[];v("financialSummary","projectSubtotal")&&X.push(x(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),r.projectSubtotal||`${ue(0,d)}`)),v("financialSummary","expensesTotal")&&X.push(x(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),r.expensesTotal||ue(0,d))),v("financialSummary","reservationsTotal")&&X.push(x(o("projects.details.reservationsTotal","إجمالي الحجوزات"),r.reservationsTotal||ue(0,d))),v("financialSummary","discountAmount")&&X.push(x(o("reservations.details.labels.discount","الخصم"),r.discountAmount||ue(0,d))),v("financialSummary","taxAmount")&&X.push(x(o("projects.details.summary.combinedTax","إجمالي الضريبة"),r.taxAmount||ue(0,d)));const N=[];v("financialSummary","overallTotal")&&N.push(x(o("projects.details.summary.overallTotal","الإجمالي الكلي"),r.overallTotal||ue(0,d),{variant:"final"})),v("financialSummary","paidAmount")&&N.push(x(o("projects.details.summary.paidAmount","إجمالي المدفوع"),r.paidAmount||ue(0,d),{variant:"final"})),v("financialSummary","remainingAmount")&&N.push(x(o("projects.details.summary.remainingAmount","المتبقي للدفع"),r.remainingAmount||ue(0,d),{variant:"final"}));const T=_("financialSummary")?!X.length&&!N.length?`<section class="quote-section quote-section--financial">${q}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${A(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${X.length?`<div class="totals-inline">${X.join("")}</div>`:""}
            ${N.length?`<div class="totals-final">${N.join("")}</div>`:""}
          </div>
        </section>`:"",P=to.filter(Y=>v("projectExpenses",Y.id)),H=_("projectExpenses")?P.length?`<section class="quote-section quote-section--table">
            <h3>${A(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${P.map(Y=>`<th>${A(Y.labelKey?o(Y.labelKey,Y.fallback):Y.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((Y,ne)=>`<tr>${P.map(le=>`<td>${le.render(Y,ne)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(P.length,1)}" class="empty">${A(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${q}
          </section>`:"",Q=ri.filter(Y=>v("items",Y.id)),D=Array.isArray(C?.equipmentItems)?C.equipmentItems:[],J=_("projectEquipment")?Q.length?`<section class="quote-section quote-section--table">
            <h3>${A(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Q.map(Y=>`<th>${A(Y.labelKey?o(Y.labelKey,Y.fallback):Y.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${D.length?D.map((Y,ne)=>`<tr>${Q.map(le=>`<td>${le.render(Y,ne)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Q.length,1)}" class="empty">${A(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${q}
          </section>`:"",B=(e?.description||"").trim()||"",V=_("projectNotes")?`<section class="quote-section">
        <h3>${A(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${A(B||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",R=[];v("payment","beneficiary")&&R.push(U(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Me.beneficiaryName)),v("payment","bank")&&R.push(U(o("reservations.quote.labels.bank","اسم البنك"),Me.bankName)),v("payment","account")&&R.push(U(o("reservations.quote.labels.account","رقم الحساب"),h(Me.accountNumber))),v("payment","iban")&&R.push(U(o("reservations.quote.labels.iban","رقم الآيبان"),h(Me.iban)));const ee=`<section class="quote-section">
      <div class="payment-block">
        <h3>${A(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${R.length?R.join(""):q}</div>
      </div>
      <p class="quote-approval-note">${A(Me.approvalNote)}</p>
    </section>`,me=Array.isArray(p)&&p.length?p:et,de=`<footer class="quote-footer">
        <h4>${A(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${me.map(Y=>`<li>${A(Y)}</li>`).join("")}</ul>
      </footer>`,Ee=[],ge=[];if(j&&ge.push({key:"project",html:j}),w&&ge.push({key:"customer",html:w}),ge.length>1){const Y=ge.find(qe=>qe.key==="project"),ne=ge.find(qe=>qe.key==="customer"),le=[];Y?.html&&le.push(Y.html),ne?.html&&le.push(ne.html),Ee.push(je(`<div class="quote-section-row quote-section-row--primary">${le.join("")}</div>`,{blockType:"group"}))}else ge.length===1&&Ee.push(je(ge[0].html));const G=[];F&&G.push(je(F,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),H&&G.push(je(H,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),J&&G.push(je(J,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const te=[];T&&te.push(je(T,{blockType:"summary"})),V&&te.push(je(V));const we=[je(ee,{blockType:"payment"}),je(de,{blockType:"footer"})],Ne=[...$a(Ee,"projects.quote.placeholder.primary"),...G,...$a(te,"projects.quote.placeholder.summary"),...we],Ge=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${A(Me.logoUrl)}" alt="${A(Me.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${A(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${A(Me.companyName)}</p>
        <p class="quote-company-cr">${A(o("reservations.quote.labels.cr","السجل التجاري"))}: ${A(Me.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${A(o("reservations.details.labels.reservationId","رقم العرض"))}</span>
          <strong>${A(y)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${A(o("projects.quote.labels.date","التاريخ"))}</span>
          <strong>${A(m)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${ro}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Ge}
          ${Ne.join("")}
        </div>
      </div>
    </div>
  `}function wo(e){if(e?.context==="project")return wu(e);const{reservation:t,customer:n,project:a,crewAssignments:s,totals:i,totalsDisplay:r,rentalDays:c,currencyLabel:l,sections:d,fieldSelections:u={},quoteNumber:b,quoteDate:y,terms:m=et}=e,p=h(String(t?.reservationId??t?.id??"")),g=t.start?h(it(t.start)):"-",v=t.end?h(it(t.end)):"-",_=n?.customerName||n?.full_name||n?.name||"-",q=n?.phone||"-",k=n?.email||"-",x=n?.company||n?.company_name||"-",U=h(q),S=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),w=a?.code||a?.projectCode||"",L=h(String(c)),j=t?.notes||"",W=Array.isArray(m)&&m.length?m:et,$=ci(u),F=(M,re)=>li($,M,re),X=M=>d?.has?.(M),N=`<div class="quote-placeholder">${A(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,T=(M,re)=>`<div class="info-plain__item">${A(M)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${A(re)}</strong></div>`,P=(M,re,{variant:_e="inline"}={})=>_e==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${A(M)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${A(re)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${A(M)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${A(re)}</span>
    </span>`,H=(M,re)=>`<div class="payment-row">
      <span class="payment-row__label">${A(M)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${A(re)}</span>
    </div>`,Q=[];F("customerInfo","customerName")&&Q.push(T(o("reservations.details.labels.customer","العميل"),_)),F("customerInfo","customerCompany")&&Q.push(T(o("reservations.details.labels.company","الشركة"),x)),F("customerInfo","customerPhone")&&Q.push(T(o("reservations.details.labels.phone","الهاتف"),U)),F("customerInfo","customerEmail")&&Q.push(T(o("reservations.details.labels.email","البريد"),k));const D=X("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${A(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${Q.length?`<div class="info-plain">${Q.join("")}</div>`:N}
      </section>`:"",J=[];F("reservationInfo","reservationId")&&J.push(T(o("reservations.details.labels.reservationId","رقم الحجز"),p||"-")),F("reservationInfo","reservationStart")&&J.push(T(o("reservations.details.labels.start","بداية الحجز"),g)),F("reservationInfo","reservationEnd")&&J.push(T(o("reservations.details.labels.end","نهاية الحجز"),v)),F("reservationInfo","reservationDuration")&&J.push(T(o("reservations.details.labels.duration","عدد الأيام"),L));const B=X("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${A(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${J.length?`<div class="info-plain">${J.join("")}</div>`:N}
      </section>`:"",V=[];F("projectInfo","projectTitle")&&V.push(T(o("reservations.details.labels.project","المشروع"),S)),F("projectInfo","projectCode")&&V.push(T(o("reservations.details.labels.code","الرمز"),w||"-"));const R=X("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${A(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${V.length?`<div class="info-plain">${V.join("")}</div>`:N}
      </section>`:"",ee=[];F("financialSummary","equipmentTotal")&&ee.push(P(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${r.equipmentTotal} ${l}`)),F("financialSummary","crewTotal")&&ee.push(P(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${r.crewTotal} ${l}`)),F("financialSummary","discountAmount")&&ee.push(P(o("reservations.details.labels.discount","الخصم"),`${r.discountAmount} ${l}`)),F("financialSummary","taxAmount")&&ee.push(P(o("reservations.details.labels.tax","الضريبة"),`${r.taxAmount} ${l}`));const me=F("financialSummary","finalTotal"),de=[];me&&de.push(P(o("reservations.details.labels.total","الإجمالي النهائي"),`${r.finalTotal} ${l}`,{variant:"final"}));const Ee=de.length?`<div class="totals-final">${de.join("")}</div>`:"",ge=X("financialSummary")?!ee.length&&!me?`<section class="quote-section quote-section--financial">${N}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${A(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${ee.length?`<div class="totals-inline">${ee.join("")}</div>`:""}
            ${Ee}
          </div>
        </section>`:"",{groups:G}=Qs(t),te=G.map(M=>{const re=Number(M?.count??M?.quantity??1)||1,_e=Number(M?.unitPrice);let Ue=Number.isFinite(_e)?_e:0;if(!Ue||Ue<=0){const De=Number(M?.totalPrice);Number.isFinite(De)&&re>0&&(Ue=Number((De/re).toFixed(2)))}Number.isFinite(Ue)||(Ue=0);const tt=M?.type==="package"||Array.isArray(M?.items)&&M.items.some(De=>De?.type==="package"),Gt=Array.isArray(M?.barcodes)&&M.barcodes.length?M.barcodes[0]:Array.isArray(M?.items)&&M.items.length?M.items[0]?.barcode:null;let yt=M?.packageDisplayCode??M?.package_code??M?.code??M?.packageCode??(Array.isArray(M?.items)&&M.items.length?M.items[0]?.package_code??M.items[0]?.code??M.items[0]?.packageCode:null);const ea=De=>{const Xe=(De==null?"":String(De)).trim();return!!(!Xe||/^pkg-/i.test(Xe)||/^\d+$/.test(Xe)&&Xe.length<=4)};if(!yt||ea(yt)){const De=M?.packageId??M?.package_id??(Array.isArray(M?.items)&&M.items.length?M.items[0]?.packageId??M.items[0]?.package_id:null);if(De)try{const Xe=Os(De);Xe&&Xe.package_code&&(yt=Xe.package_code)}catch{}}if(!yt||ea(yt))try{const De=En(M?.description||"");if(De){const Xe=ur();let Wt=Xe.find(wt=>En(wt?.name||wt?.title||wt?.label||"")===De);Wt||(Wt=Xe.find(wt=>{const na=En(wt?.name||wt?.title||wt?.label||"");return na.includes(De)||De.includes(na)})),Wt&&Wt.package_code&&(yt=Wt.package_code)}}catch{}const ta=tt?yt??Gt??"":M?.barcode??Gt??"",es=ta!=null?String(ta):"";let bn=Number.isFinite(Number(M?.totalPrice))?Number(M.totalPrice):Number((Ue*re).toFixed(2));return bn=Ie(bn),{...M,isPackage:tt,desc:M?.description,barcode:es,packageCodeResolved:yt||"",qty:re,price:bn,totalPrice:bn,unitPriceValue:Ue}}),we=ri.filter(M=>F("items",M.id)),Ne=we.length>0,Ge=Ne?we.map(M=>`<th>${A(M.labelKey?o(M.labelKey,M.fallback):M.fallback)}</th>`).join(""):"",ne=te.length>0?te.map((M,re)=>`<tr>${we.map(_e=>`<td>${_e.render(M,re)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(we.length,1)}" class="empty">${A(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,le=X("items")?Ne?`<section class="quote-section quote-section--table">
            <h3>${A(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Ge}</tr>
              </thead>
              <tbody>${ne}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(o("reservations.details.items.title","المعدات"))}</h3>
            ${N}
          </section>`:"",qe=oi.filter(M=>F("crew",M.id)),Be=qe.length>0,ft=Be?qe.map(M=>`<th>${A(M.labelKey?o(M.labelKey,M.fallback):M.fallback)}</th>`).join(""):"",z=Array.isArray(s)?s:[],Se=z.length?z.map((M,re)=>`<tr>${qe.map(_e=>`<td>${_e.render(M,re)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(qe.length,1)}" class="empty">${A(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,I=X("crew")?Be?`<section class="quote-section quote-section--table">
            <h3>${A(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${ft}</tr>
              </thead>
              <tbody>${Se}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${A(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${N}
          </section>`:"",oe=X("notes")?`<section class="quote-section">
        <h3>${A(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${A(j||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",K=[];F("payment","beneficiary")&&K.push(H(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Me.beneficiaryName)),F("payment","bank")&&K.push(H(o("reservations.quote.labels.bank","اسم البنك"),Me.bankName)),F("payment","account")&&K.push(H(o("reservations.quote.labels.account","رقم الحساب"),h(Me.accountNumber))),F("payment","iban")&&K.push(H(o("reservations.quote.labels.iban","رقم الآيبان"),h(Me.iban)));const he=`<section class="quote-section">
      <div class="payment-block">
        <h3>${A(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${K.length?K.join(""):N}</div>
      </div>
      <p class="quote-approval-note">${A(Me.approvalNote)}</p>
    </section>`,Ae=`<footer class="quote-footer">
        <h4>${A(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${W.map(M=>`<li>${A(M)}</li>`).join("")}</ul>
      </footer>`,xe=[];D&&B?xe.push(je(`<div class="quote-section-row">${D}${B}</div>`,{blockType:"group"})):(B&&xe.push(je(B)),D&&xe.push(je(D))),R&&xe.push(je(R));const Ve=[];le&&Ve.push(je(le,{blockType:"table",extraAttributes:'data-table-id="items"'})),I&&Ve.push(je(I,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const We=[];ge&&We.push(je(ge,{blockType:"summary"})),oe&&We.push(je(oe));const ze=[je(he,{blockType:"payment"}),je(Ae,{blockType:"footer"})],Oe=[...$a(xe,"reservations.quote.placeholder.page1"),...Ve,...$a(We,"reservations.quote.placeholder.page2"),...ze],Lt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${A(Me.logoUrl)}" alt="${A(Me.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${A(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${A(Me.companyName)}</p>
        <p class="quote-company-cr">${A(o("reservations.quote.labels.cr","السجل التجاري"))}: ${A(Me.commercialRegistry)}</p>
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
      <style>${ro}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Lt}
          ${Oe.join("")}
        </div>
      </div>
    </div>
  `}async function xo(){try{const e=pe();if((Array.isArray(e?.packages)?e.packages:[]).length>0)return;const n=await pt("/packages/?all=1"),a=Array.isArray(n?.data)?n.data:Array.isArray(n)?n:[];a.length&&(Na({packages:a}),document.dispatchEvent?.(new CustomEvent("packages:changed",{detail:{packages:a}})))}catch{}}function xu(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{i(),t()},s=()=>{i(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},i=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function Kn(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),i=a.map(c=>xu(c)),r=[s,...i].map(c=>c.catch(l=>($t("asset load failed",l),Fd(),null)));await Promise.all(r),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function Io(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),i=e.querySelector("[data-quote-source]"),r=i?.querySelector("[data-quote-header-template]");if(!s||!i||!r)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await bo(i),await Kn(i),s.innerHTML="";const c=Array.from(i.querySelectorAll(":scope > [data-quote-block]"));let l=null,d=null;const u=S=>{S.style.margin="0 auto",S.style.breakInside="avoid",S.style.pageBreakInside="avoid",S.style.pageBreakAfter="auto",S.style.breakAfter="auto"},b=()=>{const S=a.createElement("div"),w=s.childElementCount===0;if(S.className="quote-page",S.dataset.pageIndex=String(s.childElementCount),w){S.classList.add("quote-page--primary");const j=r.cloneNode(!0);j.removeAttribute("data-quote-header-template"),S.appendChild(j)}else S.classList.add("quote-page--continuation");const L=a.createElement("main");L.className="quote-body",S.appendChild(L),s.appendChild(S),u(S),l=S,d=L},y=()=>{(!l||!d||!d.isConnected)&&b()},m=()=>{if(!l||!d||d.childElementCount>0)return;const S=l;l=null,d=null,S.parentNode&&S.parentNode.removeChild(S)},p=()=>{l=null,d=null},g=()=>l?l.scrollHeight-l.clientHeight>jd:!1,v=(S,{allowOverflow:w=!1}={})=>(y(),d.appendChild(S),g()&&!w?(d.removeChild(S),m(),!1):!0),_=S=>{const w=S.cloneNode(!0);w.removeAttribute?.("data-quote-block"),w.removeAttribute?.("data-block-type"),w.removeAttribute?.("data-table-id"),!v(w)&&(p(),!v(w)&&v(w,{allowOverflow:!0}))},q=S=>{const w=S.querySelector("table");if(!w){_(S);return}const L=S.querySelector("h3"),j=w.querySelector("thead"),W=Array.from(w.querySelectorAll("tbody tr"));if(!W.length){_(S);return}let $=null,F=0;const X=(T=!1)=>{const P=S.cloneNode(!1);P.removeAttribute("data-quote-block"),P.removeAttribute("data-block-type"),P.removeAttribute("data-table-id"),P.classList.add("quote-section--table-fragment"),T&&P.classList.add("quote-section--table-fragment--continued");const H=L?L.cloneNode(!0):null;H&&P.appendChild(H);const Q=w.cloneNode(!1);Q.classList.add("quote-table--fragment"),j&&Q.appendChild(j.cloneNode(!0));const D=a.createElement("tbody");return Q.appendChild(D),P.appendChild(Q),{section:P,body:D}},N=(T=!1)=>$||($=X(T),v($.section)||(p(),v($.section)||v($.section,{allowOverflow:!0})),$);W.forEach(T=>{N(F>0);const P=T.cloneNode(!0);if($.body.appendChild(P),g()&&($.body.removeChild(P),$.body.childElementCount||(d.removeChild($.section),$=null,m()),p(),$=null,N(F>0),$.body.appendChild(P),g())){$.section.classList.add("quote-section--table-fragment--overflow"),F+=1;return}F+=1}),$=null};if(!c.length)return;c.forEach(S=>{S.getAttribute("data-block-type")==="table"?q(S):_(S)});const k=Array.from(s.children),x=[];if(k.forEach((S,w)=>{const L=S.querySelector(".quote-body");if(w!==0&&(!L||L.childElementCount===0)){S.remove();return}x.push(S)}),!n){const S=a.defaultView||window,w=Math.min(3,Math.max(1,S.devicePixelRatio||1)),L=Xa()?Math.min(2,w):w;x.forEach(j=>eu(j,{pixelRatio:L}))}x.forEach((S,w)=>{const L=w===0;S.style.pageBreakAfter="auto",S.style.breakAfter="auto",S.style.pageBreakBefore=L?"auto":"always",S.style.breakBefore=L?"auto":"page",n?S.style.boxShadow="":S.style.boxShadow="none"});const U=x[x.length-1]||null;l=U,d=U?.querySelector(".quote-body")||null,await Kn(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function fi(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function Iu(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[i,r]=await Promise.all([nu(),tu()]),c=e.ownerDocument||document,l=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,l,c?.documentElement?.getAttribute?.("dir")].some(S=>typeof S=="string"&&S.toLowerCase().startsWith("rtl")),b=typeof window<"u"&&window.devicePixelRatio||1,y=mi(),m=mo(),p=Xa();let g;p?g=1.5:m?g=Math.min(1.7,Math.max(1.2,b*1.1)):y?g=Math.min(1.8,Math.max(1.25,b*1.2)):g=Math.min(2,Math.max(1.6,b*1.4));const v=p||m?.9:y?.92:.95,_=new i({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),q={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let k=0;const x=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let S=0;S<s.length;S+=1){const w=s[S];await bo(w),await Kn(w);const L=w.ownerDocument||document,j=L.createElement("div");Object.assign(j.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const W=w.cloneNode(!0);W.style.width=`${ma}px`,W.style.maxWidth=`${ma}px`,W.style.minWidth=`${ma}px`,W.style.height=`${pa}px`,W.style.maxHeight=`${pa}px`,W.style.minHeight=`${pa}px`,W.style.position="relative",W.style.background="#ffffff",fi(W),j.appendChild(W),L.body.appendChild(j);let $;try{await Kn(W),$=await r(W,{...q,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(D){throw js(D,"pageCapture",{toastMessage:x}),D}finally{j.parentNode?.removeChild(j)}if(!$)continue;const F=$.width||1,N=($.height||1)/F;let T=Ps,P=T*N,H=0;if(P>ua){const D=ua/P;P=ua,T=T*D,H=Math.max(0,(Ps-T)/2)}const Q=$.toDataURL("image/jpeg",v);k>0&&_.addPage(),_.addImage(Q,"JPEG",H,0,T,P,`page-${k+1}`,"FAST"),k+=1,await new Promise(D=>window.requestAnimationFrame(D))}}catch(S){throw Ns({safariWindowRef:n,mobileWindowRef:a}),S}if(k===0)throw Ns({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(m||p){const S=_.output("blob");if(p){const w=URL.createObjectURL(S);zn();try{window.location.assign(w)}catch(L){$t("mobile safari blob navigation failed",L)}finally{setTimeout(()=>URL.revokeObjectURL(w),6e4)}}else{const w=URL.createObjectURL(S),L=()=>m&&n&&!n.closed?n:a&&!a.closed?a:null,j=($,F)=>{if(zn(),!$){window.location.assign(F);return}try{$.location.replace(F),$.focus?.()}catch(X){$t("direct blob navigation failed",X);try{$.document.open(),$.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${A(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${F}" title="PDF preview"></iframe></body></html>`),$.document.close()}catch(N){$t("iframe blob delivery failed",N),window.location.assign(F)}}},W=L();j(W,w),setTimeout(()=>URL.revokeObjectURL(w),6e4)}}else{zn();const S=_.output("bloburl"),w=document.createElement("a");w.href=S,w.download=t,w.rel="noopener",w.style.display="none",document.body.appendChild(w),w.click(),setTimeout(()=>{URL.revokeObjectURL(S),w.remove()},2e3)}}function yn(){if(!C||!Z)return;const{previewFrame:e}=Z;if(!e)return;const t=C.context||"reservation",n=wo({context:t,reservation:C.reservation,customer:C.customer,project:C.project,crewAssignments:C.crewAssignments,totals:C.totals,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,fieldSelections:C.fields,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel,terms:C.terms,projectCrew:C.projectCrew,projectExpenses:C.projectExpenses,projectEquipment:C.projectEquipment,projectInfo:C.projectInfo,clientInfo:C.clientInfo,paymentSummary:C.paymentSummary,projectTotals:C.projectTotals});nn("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,i=a?.documentElement||a;i&&(Yr(i),Xr(i,s),Jr(i,s));const r=a?.getElementById("quotation-pdf-root");try{r&&(await Io(r,{context:"preview"}),fi(r))}catch(m){console.error("[reservations/pdf] failed to layout preview document",m)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),l=a?.querySelector(".quote-preview-pages"),d=ma;let u=18;if(l&&a?.defaultView){const m=a.defaultView.getComputedStyle(l),p=parseFloat(m.rowGap||m.gap||`${u}`);Number.isFinite(p)&&p>=0&&(u=p)}const b=pa,y=c.length?c.length*b+Math.max(0,(c.length-1)*u):b;if(e.dataset.baseWidth=String(d),e.dataset.baseHeight=String(y),e.style.width=`${d}px`,e.style.minWidth=`${d}px`,e.style.height=`${y}px`,e.style.minHeight=`${y}px`,Z?.previewFrameWrapper&&!Z?.userAdjustedZoom){const m=Z.previewFrameWrapper.clientWidth-24;m>0&&m<d?vt=Math.max(m/d,.3):vt=1}ko(vt)}finally{zn()}},{once:!0})}function _u(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?C.sections.add(n):C.sections.delete(n),vo(C),_o(),yn())}function ku(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=C.context||"reservation",i=C.fields||(C.fields=Wa(s)),r=Rd(i,n);t.checked?r.add(a):r.delete(a),vo(C),yn()}function $u(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(ui(C,n),C.sectionExpansions[n]=t.open)}function _o(){if(!Z?.toggles||!C)return;const{toggles:e}=Z,t=C.fields||{},n=C.context||"reservation";ui(C);const a=Ga(n),s=no(n),i=a.map(({id:r,labelKey:c,fallback:l})=>{const d=o(c,l),u=C.sections.has(r),b=s[r]||[],y=Md(C,r),m=b.length?`<div class="quote-toggle-sublist">
          ${b.map(p=>{const g=li(t,r,p.id),v=u?"":"disabled",_=p.labelKey?o(p.labelKey,p.fallback):p.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${r}" data-field-id="${p.id}" ${g?"checked":""} ${v}>
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
        ${m}
      </details>
    `}).join("");e.innerHTML=i,e.querySelectorAll("input[data-section-toggle]").forEach(r=>{r.addEventListener("change",_u)}),e.querySelectorAll("input[data-field-toggle]").forEach(r=>{r.addEventListener("change",ku)}),e.querySelectorAll("details[data-section-group]").forEach(r=>{r.addEventListener("toggle",$u)})}function Pu(){if(Z?.modal)return Z;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
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
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),i=e.querySelector("[data-quote-terms-reset]"),r=e.querySelector("[data-quote-download]"),c=e.querySelector(".modal-header"),l=c?.querySelector(".btn-close"),d=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",c&&c.insertBefore(u,l||null);const b=document.createElement("iframe");b.className="quote-preview-frame",b.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),b.setAttribute("loading","lazy"),b.setAttribute("frameborder","0");const y=document.createElement("div");y.className="quote-preview-zoom-controls",y.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${A(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${A(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${A(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(b),n.innerHTML="";const p=document.createElement("div");p.className="quote-preview-scroll",p.appendChild(m),n.appendChild(p);const g=document.createElement("div");g.className="quote-preview-status",g.setAttribute("role","status"),g.setAttribute("aria-live","polite"),g.hidden=!0,g.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${A(io("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(y),r?.addEventListener("click",async()=>{if(C){r.disabled=!0;try{await $o()}finally{r.disabled=!1}}});const v=()=>{Cs()||Ls(e)};d.forEach(x=>{x?.addEventListener("click",v)}),l&&!d.includes(l)&&l.addEventListener("click",v),e.addEventListener("click",x=>{Cs()||x.target===e&&Ls(e)}),Z={modal:e,toggles:t,preview:n,previewScroll:p,previewFrameWrapper:m,zoomControls:y,zoomValue:y.querySelector("[data-zoom-value]"),previewFrame:b,meta:a,downloadBtn:r,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:i,statusKind:null,userAdjustedZoom:!1};const _=y.querySelector("[data-zoom-out]"),q=y.querySelector("[data-zoom-in]"),k=y.querySelector("[data-zoom-reset]");return _?.addEventListener("click",()=>Ki(-.1)),q?.addEventListener("click",()=>Ki(.1)),k?.addEventListener("click",()=>Pa(1,{markManual:!0})),s&&s.addEventListener("input",Lu),i&&i.addEventListener("click",ju),Pa(vt),Z}function Pa(e,{silent:t=!1,markManual:n=!1}={}){vt=Math.min(Math.max(e,.25),2.2),n&&Z&&(Z.userAdjustedZoom=!0),ko(vt),!t&&Z?.zoomValue&&(Z.zoomValue.textContent=`${Math.round(vt*100)}%`)}function Ki(e){Pa(vt+e,{markManual:!0})}function ko(e){if(!Z?.previewFrame||!Z.previewFrameWrapper)return;const t=Z.previewFrame,n=Z.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",mi()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function Cu(){if(!Z?.meta||!C)return;const{meta:e}=Z;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${A(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${A(C.quoteNumber)}</strong></div>
      <div><span>${A(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${A(C.quoteDateLabel)}</strong></div>
    </div>
  `}function yi(){if(!Z?.termsInput)return;const e=(C?.terms&&C.terms.length?C.terms:et).join(`
`);Z.termsInput.value!==e&&(Z.termsInput.value=e)}function Lu(e){if(!C)return;const t=_s(e?.target?.value??"");if(t.length){C.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{C.terms=[...et],yi();const n=et.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}yn()}function ju(e){if(e?.preventDefault?.(),!C)return;C.terms=[...et];const t=document.getElementById("reservation-terms");t&&(t.value=et.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=et.join(`
`)),yi(),yn()}async function $o(){if(!C)return;nn("export");const t=!mi()&&mo(),n=Xa(),a=null,s=!n&&t?window.open("","_blank"):null;(l=>{if(l)try{l.document.open(),l.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${A(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${A(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${A(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),l.document.close()}catch(d){$t("failed to prime download window",d)}})(s);let r=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await au(),us("html2pdf ensured");const l=C.context||"reservation",d=wo({context:l,reservation:C.reservation,customer:C.customer,project:C.project,crewAssignments:C.crewAssignments,totals:C.totals,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,fieldSelections:C.fields,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel,terms:C.terms,projectCrew:C.projectCrew,projectExpenses:C.projectExpenses,projectEquipment:C.projectEquipment,projectInfo:C.projectInfo,clientInfo:C.clientInfo,paymentSummary:C.paymentSummary,projectTotals:C.projectTotals});r=document.createElement("div"),r.innerHTML=d,Object.assign(r.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(r),Yr(r),Xr(r),Jr(r),us("export container prepared");const u=r.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await Io(u,{context:"export"}),await Kn(u),fi(u),us("layout complete for export document")}catch(y){js(y,"layoutQuoteDocument",{suppressToast:!0})}}const b=`quotation-${C.quoteNumber}.pdf`;await Iu(u,{filename:b,safariWindowRef:s,mobileWindowRef:a}),C.sequenceCommitted||(ou(C.quoteSequence),C.sequenceCommitted=!0)}catch(l){Ns({container:r,safariWindowRef:s,mobileWindowRef:a}),r=null,js(l,"exportQuoteAsPdf",{toastMessage:c})}finally{r&&r.parentNode&&r.parentNode.removeChild(r),zn()}}function Po(){const e=Pu();e?.modal&&(Mn=!1,vt=1,Z&&(Z.userAdjustedZoom=!1),Pa(vt,{silent:!0}),_o(),Cu(),yi(),yn(),Dd(e.modal))}async function Nu({reservation:e,customer:t,project:n}){if(!e){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}await xo();const a=Eo(e),{totalsDisplay:s,totals:i,rentalDays:r}=mu(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:l,quoteNumber:d}=go("reservation"),u=new Date,b=Ad();C={context:"reservation",reservation:e,customer:t,project:n,crewAssignments:a,totals:i,totalsDisplay:s,rentalDays:r,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(Ga("reservation").filter(y=>y.defaultSelected).map(y=>y.id)),sectionExpansions:di("reservation"),fields:Wa("reservation"),terms:b,quoteSequence:l,quoteNumber:d,quoteDate:u,quoteDateLabel:So(u),sequenceCommitted:!1},qo(C),Po()}async function Fm({project:e}){if(!e){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}await xo();const t=Au(e),{project:n}=t;if(!n){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=go("project"),i=new Date,r=[...Ed];C={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,equipmentItems:t.equipmentItems||[],crewAssignments:t.crewAssignments||[],totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(Ga("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:di("project"),fields:Wa("project"),terms:r,quoteSequence:a,quoteNumber:s,quoteDate:i,quoteDateLabel:So(i),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},qo(C),Po()}function Tu({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=sn(),{reservations:i=[],customers:r=[],technicians:c=[],projects:l=[]}=pe(),d=i.map(q=>{const k=fs(q);return{...k,id:q.id??k.id,reservationId:q.reservationId??q.reservation_id??k.reservationId,reservationCode:q.reservationCode??q.reservation_code??k.reservationCode}}),u=d,b=Array.isArray(s)?s:c||[],y=new Map((l||[]).map(q=>[String(q.id),q])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!u||u.length===0){m.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const p=t||od(),g=new Map(r.map(q=>[String(q.id),q])),v=new Map(b.map(q=>[String(q.id),q])),_=ud({reservations:d,filters:p,customersMap:g,techniciansMap:v,projectsMap:y});if(_.length===0){m.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${md({entries:_,customersMap:g,techniciansMap:v,projectsMap:y})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(q=>{const k=Number(q.dataset.reservationIndex);Number.isNaN(k)||q.addEventListener("click",()=>{typeof n=="function"&&n(k)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(q=>{const k=Number(q.dataset.reservationIndex);Number.isNaN(k)||q.addEventListener("click",x=>{x.stopPropagation(),typeof a=="function"&&a(k,x)})})}function Bu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:i=[],projects:r=[]}=pe(),c=s.map(g=>{const v=fs(g);return{...v,id:g.id??v.id,reservationId:g.reservationId??g.reservation_id??v.reservationId,reservationCode:g.reservationCode??g.reservation_code??v.reservationCode}}),l=s[e];if(!l)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=c[e]??fs(l),u=i.find(g=>String(g.id)===String(l.customerId)),b=l.projectId?r.find(g=>String(g.id)===String(l.projectId)):null,y=document.getElementById("reservation-details-body"),m=document.getElementById("reservationDetailsModal"),p=()=>{const g=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},v=document.getElementById("reservation-details-edit-btn");v&&(v.onclick=()=>{g(),typeof t=="function"&&t(e,{reservation:l,customer:u,getEditContext:a})});const _=document.getElementById("reservation-details-delete-btn");_&&(_.onclick=()=>{g(),typeof n=="function"&&n(e,{reservation:l,customer:u})});const q=y?.querySelector('[data-action="open-project"]');q&&b&&q.addEventListener("click",()=>{g();const x=b?.id!=null?String(b.id):"",U=x?`projects.html?project=${encodeURIComponent(x)}`:"projects.html";window.location.href=U});const k=document.getElementById("reservation-details-export-btn");k&&(k.onclick=async x=>{x?.preventDefault?.(),x?.stopPropagation?.(),k.blur();try{await Nu({reservation:l,customer:u,project:b})}catch(U){console.error("❌ [reservations] export to PDF failed",U),E(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}})};if(y){const g=sn()||[];y.innerHTML=Ri(d,u,g,e,b),p(),mr().then(()=>{const v=sn()||[];y.innerHTML=Ri(d,u,v,e,b),p()}).catch(()=>{})}return m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}function Co(){const e=()=>{Cn(),Qe(),sn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let Qi=!1,Gi=null;function Du(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function Rm(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=Du(n);if(!a&&Qi&&Rt().length>0&&s===Gi)return Rt();try{const i=await pr(n||{});return Qi=!0,Gi=s,i}catch(i){if(console.error("❌ [reservationsActions] Failed to load reservations from API",i),!t)throw i;return Rt()}}async function Fu(e,{onAfterChange:t}={}){if(!dn())return Gn(),!1;const a=Rt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await Vc(s),Co(),t?.({type:"deleted",reservation:a}),E(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(i){console.error("❌ [reservationsActions] deleteReservation failed",i);const r=Da(i)?i.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return E(r,"error"),!1}}async function Ru(e,{onAfterChange:t}={}){const a=Rt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:i}=Vt(a);if(i)return E(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const r=await Uc(s);return Co(),t?.({type:"confirmed",reservation:r}),E(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(r){console.error("❌ [reservationsActions] confirmReservation failed",r);const c=Da(r)?r.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return E(c,"error"),!1}}function jn(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Vn(e,n),end:Vn(t,a)}}function Ca(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function bi(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function Lo(){const{container:e,select:t,hint:n,addButton:a}=bi();if(!t)return;const s=t.value,i=nr(),r=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,l=i.map(u=>{const b=Number.isFinite(Number(u.price))?Number(u.price):0,y=h(b.toFixed(2)),m=`${u.name} — ${y} ${r}`;return`<option value="${Ca(u.id)}">${Ca(m)}</option>`}).join("");t.innerHTML=`${c}${l}`;const d=i.length>0;t.disabled=!d,a&&(a.disabled=!d),e&&(e.hidden=!d,e.setAttribute("aria-hidden",d?"false":"true")),n&&(d?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),d&&s&&i.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function Mu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=Kt(),{start:i,end:r}=jn(),{reservations:c=[]}=pe(),l=a!=null&&c[a]||null,d=l?.id??l?.reservationId??null,u=Or(n,{existingItems:s,start:i,end:r,ignoreReservationId:d});if(!u.success)return t||E(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const b=[...s,u.package];return Qt(a,b),Ut(b),ot(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function Wi(){const{select:e}=bi();if(!e)return;const t=e.value||"";Mu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function zu(){const{addButton:e,select:t}=bi();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{Wi()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Wi())}),t.dataset.listenerAttached="true"),Lo()}function Ut(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),r=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,Ji(t);return}const l=kn(e);t.innerHTML=l.map(d=>{const u=d.items[0]||{},b=mn(u)||d.image,y=b?`<img src="${b}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=d.items.some($=>$?.type==="package"),p=h(String(d.count)),g=Fe(d.unitPrice),v=Number.isFinite(g)?Ie(g):0,_=Fe(d.totalPrice),q=Number.isFinite(_)?_:v*(Number.isFinite(d.count)?d.count:1),k=Ie(q),x=`${h(v.toFixed(2))} ${a}`,U=`${h(k.toFixed(2))} ${a}`,S=d.barcodes.map($=>h(String($||""))).filter(Boolean),w=S.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${S.map($=>`<li>${$}</li>`).join("")}
            </ul>
          </details>`:"";let L="";if(m){const $=new Map,F=N=>{const T=Number.parseFloat(h(String(N??"")).replace(/[^0-9.]/g,""));return!Number.isFinite(T)||T<=0||T>99?1:Math.round(T)},X=[];if(Array.isArray(d.packageItems)&&d.packageItems.length&&X.push(...d.packageItems),d.items.forEach(N=>{Array.isArray(N?.packageItems)&&X.push(...N.packageItems)}),X.forEach(N=>{if(!N)return;const T=ie(N.barcode||N.normalizedBarcode||N.desc||Math.random());if(!T)return;const P=$.get(T),H=F(N.qtyPerPackage??N.perPackageQty??N.quantityPerPackage??N.qty??N.quantity??1),Q=Math.max(1,Math.min(H,99));if(P){P.qty=Q;return}$.set(T,{desc:N.desc||N.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Q,barcode:N.barcode??N.normalizedBarcode??""})}),$.size){const N=Array.from($.values()).map(T=>{const P=h(String(T.qty>0?Math.min(T.qty,99):1)),H=Ca(T.desc||""),Q=T.barcode?` <span class="reservation-package-items__barcode">(${Ca(h(String(T.barcode)))})</span>`:"";return`<li>${H}${Q} × ${P}</li>`}).join("");L=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${N}
              </ul>
            </details>
          `}}const j=m?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",W=m?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${d.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${y}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${d.description||"-"}</div>
                ${m?`${L||""}${w||""}`:w}
              </div>
            </div>
          </td>
          <td>
            <div class="${j}" data-group-key="${d.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${d.key}" aria-label="${r}"${W}>−</button>
              <span class="reservation-qty-value">${p}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${d.key}" aria-label="${i}"${W}>+</button>
            </div>
          </td>
          <td>${x}</td>
          <td>${U}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),Ji(t)}function Ou(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function Ja(){const e=document.getElementById("edit-res-payment-history");if(!e)return;let t=Ya();const n=document.getElementById("edit-res-project")?.value||"";if(n)try{const r=(pe()?.projects||[]).find(l=>String(l.id)===String(n)),c=Array.isArray(r?.paymentHistory)?r.paymentHistory:Array.isArray(r?.payment_history)?r.payment_history:Array.isArray(r?.payments)?r.payments:Array.isArray(r?.paymentLogs)?r.paymentLogs:[];Array.isArray(c)&&c.length&&(t=c)}catch{}if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة")}</div>`,Xi();return}const a=o("reservations.create.summary.currency","SR"),s=t.map((i,r)=>{const c=Number.isFinite(Number(i?.amount))&&Number(i.amount)>0?`${h(Number(i.amount).toFixed(2))} ${a}`:"—",l=Number.isFinite(Number(i?.percentage))&&Number(i.percentage)>0?`${h(Number(i.percentage).toFixed(2))}%`:"—",d=i?.recordedAt?h(it(i.recordedAt)):"—",u=Ou(i?.type),b=i?.note?h(i.note):"";return`
      <tr>
        <td>${u}</td>
        <td>${c}</td>
        <td>${l}</td>
        <td>${d}</td>
        <td>${b}</td>
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
        <tbody>${s}</tbody>
      </table>
    </div>
  `,Xi()}function Hu(){if(Qn()){E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=To(e);let a=Bo(t);if(!Number.isFinite(a)||a<=0){E(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=ys.lastResult,i=Number(s?.total)||0,r=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,l=o("reservations.create.summary.currency","SR");let d=null,u=null;if(n==="percent"){const y=Math.max(0,100-r);if(y<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,y);if(m!==a){const p=h(m.toFixed(2));E(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",p)),a=m}u=Number(a.toFixed(2)),i>0&&(d=a/100*i)}else{const y=Math.max(0,i-c);if(y<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,y);if(m!==a){const p=`${h(m.toFixed(2))} ${l}`;E(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",p)),a=m}d=Number(a.toFixed(2)),i>0&&(u=d/i*100)}d!=null&&(d=Number(d.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const b={type:n,value:a,amount:d,percentage:u,recordedAt:new Date().toISOString()};tm(b),gi(Ya()),Ja(),ot(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),E(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function Xi(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(Qn()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Hu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(Qn()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(nm(s),gi(Ya()),Ja(),ot(),E(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function Vu(e){const{index:t,items:n}=Kt(),s=kn(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const i=s.itemIndices[s.itemIndices.length-1];if(i==null)return;const r=n.filter((c,l)=>l!==i);Qt(t,r),Ut(r),ot()}function Uu(e){const{index:t,items:n}=Kt(),a=n.filter(s=>Ba(s)!==e);a.length!==n.length&&(Qt(t,a),Ut(a),ot())}function Ku(e){const{index:t,items:n}=Kt(),s=kn(n).find(v=>v.key===e);if(!s||s.items.some(v=>v?.type==="package"))return;const{start:i,end:r}=jn();if(!i||!r){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=pe(),l=t!=null&&c[t]||null,d=l?.id??l?.reservationId??null,u=new Set(n.map(v=>ie(v.barcode))),{equipment:b=[]}=pe(),y=(b||[]).find(v=>{const _=ie(v?.barcode);return!_||u.has(_)||Ba({desc:v?.desc||v?.description||v?.name||"",price:Number(v?.price)||0})!==e||!vr(v)?!1:!St(_,i,r,d)});if(!y){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const m=ie(y.barcode),p=un(y);if(!p){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:p,equipmentId:p,barcode:m,desc:y.desc||y.description||y.name||s.description||"",qty:1,price:Number.isFinite(Number(y.price))?Number(y.price):s.unitPrice,image:mn(y)}];Qt(t,g),Ut(g),ot()}function Ji(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:i}=n.dataset;if(a==="decrease-edit-group"&&s){Vu(s);return}if(a==="increase-edit-group"&&s){Ku(s);return}if(a==="remove-edit-group"&&s){Uu(s);return}if(a==="remove-edit-item"){const r=Number(i);Number.isNaN(r)||Wu(r)}}),e.dataset.groupListenerAttached="true")}function Qn(){return!!document.getElementById("edit-res-project")?.value}function Qu(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{Qn()&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function Gu(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),i=document.getElementById("edit-res-payment-progress-type"),r=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),l=document.getElementById("edit-res-payment-history");if([n,a,s,i,r,c,l].forEach(Qu),e){if(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s){const d=document.getElementById("edit-res-project")?.value||"";let u="unpaid";if(d)try{const y=(pe()?.projects||[]).find(p=>String(p.id)===String(d)),m=typeof y?.paymentStatus=="string"?y.paymentStatus.toLowerCase():null;m&&["paid","partial","unpaid"].includes(m)&&(u=m)}catch{}s.value=u,s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected}i&&(i.value=i.value||"percent",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),r&&(r.value="",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),l&&(l.dataset.linkedDisabled="true")}else n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.dataset.linkedDisabled="false")}function ot(){const e=document.getElementById("edit-res-summary");if(!e)return;Ja();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),st(a),ot()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const i=parseFloat(s)||0,r=n?.value||"percent",c=Qn();Gu(c);const l=document.getElementById("edit-res-tax"),d=c?!1:l?.checked||!1,u=!c&&a?.dataset?.userSelected==="true";let b="unpaid";if(c){const k=document.getElementById("edit-res-project")?.value||"";if(k)try{const U=(pe()?.projects||[]).find(w=>String(w.id)===String(k)),S=typeof U?.paymentStatus=="string"?U.paymentStatus.toLowerCase():null;S&&["paid","partial","unpaid"].includes(S)&&(b=S)}catch{}}else b=u&&a?.value||"unpaid";let y=null;!c&&d&&(mt("edit-res-company-share"),y=xn("edit-res-company-share"),(!Number.isFinite(y)||y<=0)&&(mt("edit-res-company-share"),y=xn("edit-res-company-share")));const{items:m=[],payments:p=[]}=Kt(),{start:g,end:v}=jn(),_=ys({items:m,discount:i,discountType:r,applyTax:d,paidStatus:b,start:g,end:v,companySharePercent:y,paymentHistory:p});e.innerHTML=_;const q=ys.lastResult;if(q&&a){const k=q.paymentStatus;u?st(a,a.value):(a.value!==k&&(a.value=k),a.dataset&&delete a.dataset.userSelected,st(a,k))}else a&&st(a,a.value)}function Wu(e){if(e==null)return;const{index:t,items:n}=Kt();if(!Array.isArray(n))return;const a=n.filter((s,i)=>i!==e);Qt(t,a),Ut(a),ot()}function Xu(e){const t=e?.value??"",n=ie(t);if(!n)return;const a=Ra(n);if(!a){E(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=Pt(a);if(s==="maintenance"||s==="retired"){E(ln(s));return}const i=ie(n),{index:r,items:c=[]}=Kt();if(c.findIndex(v=>ie(v.barcode)===i)>-1){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=jn();if(!d||!u){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:b=[]}=pe(),y=r!=null&&b[r]||null,m=y?.id??y?.reservationId??null;if(St(i,d,u,m)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const p=un(a);if(!p){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:p,equipmentId:p,barcode:i,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];Qt(r,g),e&&(e.value=""),Ut(g),ot()}function La(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Fr(t),a=ie(n?.barcode||t);if(!n||!a){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=Pt(n);if(s==="maintenance"||s==="retired"){E(ln(s));return}const{start:i,end:r}=jn();if(!i||!r){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:l=[]}=Kt();if(l.some(g=>ie(g.barcode)===a)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=pe(),b=c!=null&&u[c]||null,y=b?.id??b?.reservationId??null;if(St(a,i,r,y)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=un(n);if(!m){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const p=[...l,{id:m,equipmentId:m,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];Qt(c,p),Ut(p),ot(),e.value=""}function jo(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),La(e))});const t=()=>{Rr(e.value,"edit-res-equipment-description-options")&&La(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{ot()});const e=()=>{zu()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{Lo()})}typeof window<"u"&&(window.getEditReservationDateRange=jn,window.renderEditPaymentHistory=Ja);function Ju(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){ws(e);return}La(e)}}function Mm(){Ht(),jo()}function Yu(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let An=null,ht=[],qt=[],Ts=null,Je={},ms=!1;const Zu="__DEBUG_CREW__";function em(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(Zu);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function Yi(e,t){if(em())try{console.log(`🪵 [crew-debug:edit] ${e}`,t)}catch{}}function On(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),i=!!e;if(n&&(n.value=i?"true":"false"),a){const r=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=i?r:c,a.dataset.state=i?"confirmed":"pending",a.classList.toggle("btn-success",i&&!t),a.classList.toggle("btn-outline-secondary",!i||t),a.disabled=t,a.setAttribute("aria-pressed",i?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function fa(){return document.getElementById("edit-res-confirmed")?.value==="true"}function Kt(){return{index:An,items:ht,payments:qt}}function Qt(e,t,n=qt){An=typeof e=="number"?e:null,ht=Array.isArray(t)?[...t]:[],qt=Array.isArray(n)?[...n]:[]}function No(){An=null,ht=[],Gc(),qt=[]}function Ya(){return[...qt]}function gi(e){qt=Array.isArray(e)?[...e]:[]}function tm(e){e&&(qt=[...qt,e])}function nm(e){!Number.isInteger(e)||e<0||(qt=qt.filter((t,n)=>n!==e))}function Hn(e,t=1){const n=Number.parseFloat(h(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function Bs(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(h(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function am(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?ie(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:Hn(e.qty??e.quantity??e.count??1),price:Bs(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function sm(e,t=0){if(!e||typeof e!="object")return null;const n=Un(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=Hn(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),i=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:Ms(e)).map(y=>am(y)).filter(Boolean),r=e.total_price??e.totalPrice??e.total??null;let c=Bs(e.unit_price??e.unitPrice??e.price??null,0);if((!c||c===0)&&r!=null){const y=Bs(r,0);y>0&&a>0&&(c=Number((y/a).toFixed(2)))}const l=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,l,n].find(y=>y!=null&&String(y).trim()!=="")||`Package ${n}`,b=e.image??e.cover??e.thumbnail??i.find(y=>y?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:h(String(u)),name:h(String(u)),qty:a,price:c,barcode:l,packageItems:i,image:b}}function im(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const i=s-n;e.set(a,i>0?i:0)})}function rm(e={},t=[]){const n=Array.isArray(t)?t.map(c=>({...c})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((c,l)=>sm(c,l)).filter(Boolean);if(!s.length)return n;const i=new Map;s.forEach(c=>{const l=Hn(c.qty??c.quantity??1);if(c.barcode){const d=ie(c.barcode);if(d){const u=`package::${d}`;i.set(u,(i.get(u)??0)+l)}}(c.packageItems||[]).forEach(d=>{if(!d)return;const u=l*Hn(d.qty??d.quantity??1),b=d.equipmentId??null,y=d.normalizedBarcode||(d.barcode?ie(d.barcode):null);if(b!=null){const m=`equipment::${String(b)}`;i.set(m,(i.get(m)??0)+u)}if(y){const m=`barcode::${y}`;i.set(m,(i.get(m)??0)+u)}})});const r=[];return n.forEach(c=>{if(!c||typeof c!="object"){r.push(c);return}if(c.type==="package"){const v=Un(c.packageId??c.package_id??c.id??"");s.some(q=>q.packageId===v)||r.push({...c});return}const l=Hn(c.qty??c.quantity??1),d=un(c),u=c.barcode?ie(c.barcode):null,b=[];d!=null&&b.push(`equipment::${String(d)}`),u&&b.push(`barcode::${u}`);const y=b.map(v=>i.get(v)??0).filter(v=>v>0);if(!y.length){r.push({...c});return}const m=Math.min(...y);if(m<=0){r.push({...c});return}const p=Math.min(m,l);if(im(i,b,p),p>=l)return;const g=l-p;r.push({...c,qty:g,quantity:g})}),[...r,...s.map(c=>({...c}))]}function om(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function To(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Bo(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function cm(e,t){if(e){e.value="";return}}function Dn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Do(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),i=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,r=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(i)?"amount":Number.isFinite(r)?"percent":null),l=c==="amount"?i??null:c==="percent"?r??null:Number.isFinite(n)?n:null,d=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:l,amount:Number.isFinite(i)?i:null,percentage:Number.isFinite(r)?r:null,note:e.note??null,recordedAt:d}}function lm(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),i=t?.projectId?String(t.projectId):"",r=Array.isArray(e)?[...e].sort((l,d)=>String(d.createdAt||d.start||"").localeCompare(String(l.createdAt||l.start||""))):[],c=[`<option value="">${Dn(a)}</option>`];r.forEach(l=>{c.push(`<option value="${Dn(l.id)}">${Dn(l.title||a)}</option>`)}),i&&!r.some(l=>String(l.id)===i)&&c.push(`<option value="${Dn(i)}">${Dn(s)}</option>`),n.innerHTML=c.join(""),i?n.value=i:n.value=""}function Fo(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),i=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=i),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=i),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=i),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=i);else{if(t){const l=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",l&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}Ds("tax");const c=Je?.updateEditReservationSummary;typeof c=="function"&&c()}function Ds(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const i=Je?.updateEditReservationSummary;typeof i=="function"&&i()};if(ms){a();return}ms=!0;const s=()=>{ms=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(an)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),mt("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?mt("edit-res-company-share"):n.checked&&(n.checked=!1));s()}async function Zi(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:i,ensureModal:r}={}){const{customers:c,projects:l}=pe(),u=Rt()?.[e];if(!u){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}Je={...Je,reservation:u,projects:l||[]},t?.(),lm(l||[],u);const b=u.projectId&&l?.find?.(B=>String(B.id)===String(u.projectId))||null,{effectiveConfirmed:y,projectLinked:m}=Vt(u,b),p=u.items?u.items.map(B=>({...B,equipmentId:B.equipmentId??B.equipment_id??B.id,barcode:ie(B?.barcode)})):[],g=rm(u,p),_=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(B=>Do(B)).filter(Boolean);Qt(e,g,_);const q=o("reservations.list.unknownCustomer","غير معروف"),k=c?.find?.(B=>String(B.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const x=document.getElementById("edit-res-id");x&&(x.value=u.reservationId||u.id);const U=document.getElementById("edit-res-customer");U&&(U.value=k?.customerName||q);const S=typeof a=="function"?a(u.start):{date:"",time:""},w=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",S.date),n?.("edit-res-start-time",S.time),n?.("edit-res-end",w.date),n?.("edit-res-end-time",w.time);const L=document.getElementById("edit-res-notes");L&&(L.value=u.notes||"");const j=document.getElementById("edit-res-discount");if(j){const B=m?0:u.discount??0;j.value=h(B)}const W=document.getElementById("edit-res-discount-type");W&&(W.value=m?"percent":u.discountType||"percent");const $=u.projectId?!1:!!u.applyTax,F=document.getElementById("edit-res-tax");F&&(F.checked=$);const X=document.getElementById("edit-res-company-share");if(X){const B=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,V=B!=null?Number.parseFloat(h(String(B).replace("%","").trim())):NaN,R=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,ee=R!=null?R===!0||R===1||R==="1"||String(R).toLowerCase()==="true":Number.isFinite(V)&&V>0,me=ee&&Number.isFinite(V)&&V>0?V:an,de=$||ee;X.checked=de,X.dataset.companyShare=String(me)}On(y,{disable:m});const N=document.getElementById("edit-res-paid"),T=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");N&&(N.value=T,N.dataset&&delete N.dataset.userSelected);const P=document.getElementById("edit-res-payment-progress-type"),H=document.getElementById("edit-res-payment-progress-value");P?.dataset?.userSelected&&delete P.dataset.userSelected,P&&(P.value="percent"),cm(H);const Q=document.getElementById("edit-res-cancelled");if(Q){const B=String(u?.status||u?.reservationStatus||"").toLowerCase();Q.checked=["cancelled","canceled"].includes(B),Q.checked&&On(y,{disable:!0})}let D=Array.isArray(u.crewAssignments)&&u.crewAssignments.length?u.crewAssignments:Array.isArray(u.techniciansDetails)&&u.techniciansDetails.length?u.techniciansDetails:(u.technicians||[]).map(B=>String(B));if(!Array.isArray(D)||D.length===0){const B=Wc(u.id??u.reservationId??u.reservation_code??null);Array.isArray(B)&&B.length&&(D=B)}try{await mr()}catch(B){console.warn("[reservationsEdit] positions load failed (non-fatal)",B)}if(Xc(D),s?.(g),typeof window<"u"){const B=window?.renderEditPaymentHistory;typeof B=="function"&&B()}Fo(),i?.();const J=document.getElementById("editReservationModal");Ts=om(J,r),Ts?.show?.()}async function dm({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:i,populateEquipmentDescriptionLists:r,handleReservationsMutation:c}={}){if(An===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const l=document.getElementById("edit-res-start")?.value?.trim(),d=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),b=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",y=document.getElementById("edit-res-notes")?.value||"",m=h(document.getElementById("edit-res-discount")?.value||"0");let p=parseFloat(m)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const v=fa(),_=document.getElementById("edit-res-paid"),q=_?.dataset?.userSelected==="true",k=q&&_?.value||"unpaid",x=document.getElementById("edit-res-payment-progress-type"),U=document.getElementById("edit-res-payment-progress-value"),S=To(x),w=Bo(U),L=document.getElementById("edit-res-project")?.value||"",W=document.getElementById("edit-res-cancelled")?.checked===!0,$=Kc();$.map(z=>z?.technicianId).filter(Boolean);const F=document.getElementById("edit-res-company-share"),X=document.getElementById("edit-res-tax");if(!l||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const N=typeof e=="function"?e:(z,Se)=>`${z}T${Se||"00:00"}`,T=N(l,d),P=N(u,b);if(T&&P&&new Date(T)>new Date(P)){E(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const Q=Rt()?.[An];if(!Q){E(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(ht)||ht.length===0&&$.length===0){E(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const D=typeof t=="function"?t:()=>!1,J=Q.id??Q.reservationId;for(const z of ht){if(z?.type==="package"&&Array.isArray(z.packageItems)){for(const I of z.packageItems){const oe=I?.barcode??I?.normalizedBarcode??"";if(!oe)continue;const K=Pt(oe);if(K==="reserved"){const he=ie(oe);if(!D(he,T,P,J))continue}if(K!=="available"){E(ln(K));return}}continue}const Se=Pt(z.barcode);if(Se==="reserved"){const I=ie(z.barcode);if(!D(I,T,P,J))continue}if(Se!=="available"){E(ln(Se));return}}for(const z of ht){if(z?.type==="package"&&Array.isArray(z.packageItems)){for(const I of z.packageItems){const oe=ie(I?.barcode??I?.normalizedBarcode??"");if(oe&&D(oe,T,P,J)){const K=I?.desc||I?.barcode||o("reservations.create.packages.unnamedItem","معدة بدون اسم"),he=`${o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${h(String(K))})`;E(he);return}}continue}const Se=ie(z.barcode);if(D(Se,T,P,J)){E(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const B=typeof n=="function"?n:()=>!1;for(const z of ht){if(z?.type!=="package")continue;const Se=z.packageId??z.package_id??null;if(Se&&B(Se,T,P,J)){const I=z.desc||z.packageName||o("reservations.create.packages.genericName","الحزمة");E(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${h(String(I))} محجوزة بالفعل في الفترة المختارة`));return}}const V=typeof a=="function"?a:()=>!1;for(const z of $)if(z?.technicianId&&V(z.technicianId,T,P,J)){E(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const R=Array.isArray(Je.projects)&&Je.projects.length?Je.projects:pe().projects||[],ee=L&&R.find(z=>String(z.id)===String(L))||null,me={...Q,projectId:L?String(L):null,confirmed:v},{effectiveConfirmed:de,projectLinked:Ee,projectStatus:ge}=Vt(me,ee);let G=!!F?.checked,te=!!X?.checked;if(Ee&&(G&&(F.checked=!1,G=!1),te=!1),!Ee&&G!==te){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}te&&(mt("edit-res-company-share"),G=!!F?.checked);let we=G?getCompanySharePercent("edit-res-company-share"):null;G&&(!Number.isFinite(we)||we<=0)&&(mt("edit-res-company-share"),we=getCompanySharePercent("edit-res-company-share"));const Ne=G&&te&&Number.isFinite(we)&&we>0,Ge=Ee?!1:te;Ee&&(p=0,g="percent");const Y=Hs(ht,p,g,Ge,$,{start:T,end:P,companySharePercent:Ne?we:0});let ne=Ya();if(Number.isFinite(w)&&w>0){const z=Y;let Se=null,I=null;S==="amount"?(Se=w,z>0&&(I=w/z*100)):(I=w,z>0&&(Se=w/100*z));const oe=Do({type:S,value:w,amount:Se,percentage:I,recordedAt:new Date().toISOString()});oe&&(ne=[...ne,oe],gi(ne)),U&&(U.value="")}const le=Vs({totalAmount:Y,history:ne}),qe=Us({manualStatus:k,paidAmount:le.paidAmount,paidPercent:le.paidPercent,totalAmount:Y});_&&!q&&(_.value=qe,_.dataset&&delete _.dataset.userSelected);let Be=Q.status??"pending";Ee?Be=ee?.status??ge??Be:W?Be="cancelled":["completed","cancelled"].includes(String(Be).toLowerCase())||(Be=v?"confirmed":"pending");const ft=cr({reservationCode:Q.reservationCode??Q.reservationId??null,customerId:Q.customerId,start:T,end:P,status:Be,title:Q.title??null,location:Q.location??null,notes:y,projectId:L?String(L):null,totalAmount:Y,discount:p,discountType:g,applyTax:Ge,paidStatus:qe,confirmed:de,items:ht.map(z=>({...z,equipmentId:z.equipmentId??z.id})),crewAssignments:$,companySharePercent:Ne?we:null,companyShareEnabled:Ne,paidAmount:le.paidAmount,paidPercentage:le.paidPercent,paymentProgressType:le.paymentProgressType,paymentProgressValue:le.paymentProgressValue,paymentHistory:ne});try{Yi("about to submit",{editingIndex:An,crewAssignments:$,techniciansPayload:ft?.technicians,payload:ft});const z=await Qc(Q.id||Q.reservationId,ft);Yi("server response",{reservation:z?.id??z?.reservationId??z?.reservation_code,technicians:z?.technicians,crewAssignments:z?.crewAssignments,techniciansDetails:z?.techniciansDetails}),await pr(),Cn(),sn(),Qe(),E(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),No(),c?.({type:"updated",reservation:z}),i?.(),r?.(),Ts?.hide?.()}catch(z){console.error("❌ [reservationsEdit] Failed to update reservation",z);const Se=Da(z)?z.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");E(Se,"error")}}function zm(e={}){Je={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=Je,i=document.getElementById("edit-res-discount");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",()=>{i.value=h(i.value),t?.()}),i.dataset.listenerAttached="true");const r=document.getElementById("edit-res-discount-type");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>t?.()),r.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{Ds("tax")}),c.dataset.listenerAttached="true");const l=document.getElementById("edit-res-company-share");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{Ds("share")}),l.dataset.listenerAttached="true");const d=document.getElementById("edit-res-payment-progress-type");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{d.dataset.userSelected="true",t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const b=document.getElementById("edit-res-project");b&&!b.dataset.listenerAttached&&(b.addEventListener("change",()=>{Fo();const _=Array.isArray(Je.projects)&&Je.projects.length?Je.projects:pe().projects||[],q=b.value&&_.find(w=>String(w.id)===String(b.value))||null,x={...Je?.reservation??{},projectId:b.value||null,confirmed:fa()},{effectiveConfirmed:U,projectLinked:S}=Vt(x,q);On(U,{disable:S}),t?.()}),b.dataset.listenerAttached="true");const y=document.getElementById("edit-res-confirmed-btn");y&&!y.dataset.listenerAttached&&(y.addEventListener("click",()=>{if(y.disabled)return;const _=!fa();On(_),t?.()}),y.dataset.listenerAttached="true");const m=document.getElementById("edit-res-cancelled");m&&!m.dataset.listenerAttached&&(m.addEventListener("change",()=>{document.getElementById("edit-res-confirmed-btn")&&On(fa(),{disable:m.checked}),t?.()}),m.dataset.listenerAttached="true");const p=document.getElementById("save-reservation-changes");p&&!p.dataset.listenerAttached&&(p.addEventListener("click",()=>{dm(Je).catch(_=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",_)})}),p.dataset.listenerAttached="true");const g=document.getElementById("edit-res-equipment-barcode");if(g&&!g.dataset.listenerAttached){let _=null;const q=()=>{g.value?.trim()&&(clearTimeout(_),_=null,n?.(g))};g.addEventListener("keydown",x=>{x.key==="Enter"&&(x.preventDefault(),q())});const k=()=>{if(clearTimeout(_),!g.value?.trim())return;const{start:x,end:U}=getEditReservationDateRange();!x||!U||(_=setTimeout(()=>{q()},150))};g.addEventListener("input",k),g.addEventListener("change",q),g.dataset.listenerAttached="true"}jo?.();const v=document.getElementById("editReservationModal");v&&!v.dataset.cleanupAttached&&(v.addEventListener("hidden.bs.modal",()=>{No(),t?.(),s?.([])}),v.dataset.cleanupAttached="true")}const um=pe()||{};let ut=(um.projects||[]).map(zo),Yn=!1;function mm(){return ut}function Zn(e){ut=Array.isArray(e)?e.map(hi):[],Na({projects:ut});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return ut}async function Ro(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,l])=>{l==null||l===""||t.set(c,String(l))});const n=t.toString(),s=(await pt(`/projects/${n?`?${n}`:""}`))?.data;let i=[];Array.isArray(s)?i=s:s&&typeof s=="object"&&(Array.isArray(s.items)?i=s.items:Array.isArray(s.results)?i=s.results:Array.isArray(s.data)?i=s.data:Array.isArray(s.records)&&(i=s.records));const r=i.map(Za);return Zn(r),Yn=!0,ut}async function Mo({force:e=!1,params:t=null}={}){if(!e&&Yn&&ut.length>0)return ut;try{return await Ro(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),ut}}async function pm(e){const t=await pt("/projects/",{method:"POST",body:e}),n=Za(t?.data??{}),a=[...ut,n];return Zn(a),Yn=!0,n}async function fm(e,t){const n=await pt(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=Za(n?.data??{}),s=ut.map(i=>String(i.id)===String(e)?a:i);return Zn(s),Yn=!0,a}async function ym(e){await pt(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=ut.filter(n=>String(n.id)!==String(e));Zn(t),Yn=!0}function bm({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:i,start:r,end:c,applyTax:l,paymentStatus:d,equipmentEstimate:u=0,expenses:b=[],servicesClientPrice:y=0,taxAmount:m=0,totalWithTax:p=0,discount:g=0,discountType:v="percent",companyShareEnabled:_=!1,companySharePercent:q=null,companyShareAmount:k=0,paidAmount:x=null,paidPercentage:U=null,paymentProgressType:S=null,paymentProgressValue:w=null,confirmed:L=!1,technicians:j=[],equipment:W=[],payments:$,paymentHistory:F}={}){const X=Array.isArray(j)?j.map(V=>Number.parseInt(String(V),10)).filter(V=>Number.isInteger(V)&&V>0):[],N=Array.isArray(W)?W.map(V=>{const R=Number.parseInt(String(V.equipmentId??V.equipment_id??V.id??0),10),ee=Number.parseInt(String(V.qty??V.quantity??0),10);return!Number.isInteger(R)||R<=0?null:{equipment_id:R,quantity:Number.isInteger(ee)&&ee>0?ee:1}}).filter(Boolean):[],T=Array.isArray(b)?b.map(V=>{const R=Number.parseFloat(V?.amount??V?.value??0)||0,ee=(V?.label??V?.name??"").trim();if(!ee)return null;const me=Number.parseFloat(V?.salePrice??V?.sale_price??0)||0;return{label:ee,amount:Math.round(R*100)/100,sale_price:Math.max(0,Math.round(me*100)/100)}}).filter(Boolean):[],P=T.reduce((V,R)=>V+(R?.amount??0),0),H={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:i??null,start_datetime:r??null,end_datetime:c||null,apply_tax:!!l,payment_status:d??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(P*100)/100,services_client_price:Number.isFinite(Number(y))?Math.round(Number(y)*100)/100:0,tax_amount:Math.round((Number.parseFloat(m)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(p)||0)*100)/100,confirmed:!!L,technicians:X,equipment:N,expenses:T},Q=Math.max(0,Number.parseFloat(g)||0);H.discount=Q,H.discount_type=v==="amount"?"amount":"percent";const D=Number.parseFloat(q),J=!!_&&Number.isFinite(D)&&D>0;H.company_share_enabled=J,H.company_share_percent=J?D:0,H.company_share_amount=J?Math.max(0,Number.parseFloat(k)||0):0,Number.isFinite(Number(x))&&(H.paid_amount=Math.max(0,Number.parseFloat(x)||0)),Number.isFinite(Number(U))&&(H.paid_percentage=Math.max(0,Number.parseFloat(U)||0)),(S==="amount"||S==="percent")&&(H.payment_progress_type=S),w!=null&&w!==""&&(H.payment_progress_value=Number.parseFloat(w)||0),e&&(H.project_code=String(e).trim());const B=$!==void 0?$:F;if(B!==void 0){const V=Oo(B)||[];H.payments=V.map(R=>({type:R.type,amount:R.amount!=null?R.amount:null,percentage:R.percentage!=null?R.percentage:null,value:R.value!=null?R.value:null,note:R.note??null,recorded_at:R.recordedAt??null}))}return H.end_datetime||delete H.end_datetime,H.client_company||(H.client_company=null),H}function Za(e={}){return hi(e)}function zo(e={}){return hi(e)}function hi(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(m=>{if(m==null)return null;if(typeof m=="object"){const p=m.id??m.technician_id??m.technicianId;return p!=null?String(p):null}return String(m)}).filter(Boolean),i=(Array.isArray(e.equipment)?e.equipment:[]).map(m=>{const p=m?.equipment_id??m?.equipmentId??m?.id??null,g=m?.quantity??m?.qty??0,v=m?.barcode??m?.code??"",_=m?.description??m?.name??"";return{equipmentId:p!=null?String(p):null,qty:Number.parseInt(String(g),10)||0,barcode:v,description:_}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((m,p)=>({id:m?.id??`expense-${t??"x"}-${p}`,label:m?.label??"",amount:Number.parseFloat(m?.amount??0)||0,salePrice:Number.parseFloat(m?.sale_price??m?.salePrice??0)||0})),l=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,d=e.company_share_enabled??e.companyShareEnabled,u=d!=null?d===!0||d===1||String(d).toLowerCase()==="true":l>0,b=e.payment_history??e.paymentHistory??e.payments??null,y=Oo(b);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,servicesClientPrice:Number.parseFloat(e.services_client_price??e.servicesClientPrice??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?l:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(m=>typeof m=="object"?m:{id:m}),equipment:i,expenses:c,paymentHistory:y}}function gm(e){return e instanceof er}function ps(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const i=Number.parseFloat(n);return Number.isFinite(i)?i:null}function hm(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=ps(e.value);let s=ps(e.amount),i=ps(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&i==null&&a!=null&&(i=a),!n)if(s!=null&&s>=0)n="amount";else if(i!=null&&i>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(i==null||!Number.isFinite(i)||i<0)return null;i=Math.min(100,Math.round(i*100)/100)}const r=e.note??e.memo??e.description??null,c=r!=null?String(r).trim():null,l=e.recordedAt??e.recorded_at??e.date??null;let d=null;if(l){const b=new Date(l);Number.isNaN(b.getTime())||(d=b.toISOString())}d||(d=new Date().toISOString());const u=n==="amount"?s:n==="percent"?i:a;return{type:n,amount:s??null,percentage:i??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:d}}function Oo(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>hm(t)).filter(Boolean):[]}const Om=Object.freeze(Object.defineProperty({__proto__:null,buildProjectPayload:bm,createProjectApi:pm,deleteProjectApi:ym,ensureProjectsLoaded:Mo,getProjectsState:mm,isApiError:gm,mapLegacyProject:zo,mapProjectFromApi:Za,refreshProjectsFromApi:Ro,setProjectsState:Zn,updateProjectApi:fm},Symbol.toStringTag,{value:"Module"})),ja="reservations-ui:ready",en=typeof EventTarget<"u"?new EventTarget:null;let tn={};function vm(e){return Object.freeze({...e})}function qm(){if(!en)return;const e=tn,t=typeof CustomEvent=="function"?new CustomEvent(ja,{detail:e}):{type:ja,detail:e};typeof en.dispatchEvent=="function"&&en.dispatchEvent(t)}function Sm(e={}){if(!e||typeof e!="object")return tn;const t={...tn};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),tn=vm(t),qm(),tn}function Em(e){if(e)return tn?.[e]}function Hm(e){const t=Em(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const r=(s?.detail||tn)?.[e];typeof r=="function"&&(en&&en.removeEventListener(ja,a),n(r))};en&&en.addEventListener(ja,a)})}function Vm(){return Mo().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=pe()||{};Jc(e||[]),Kr()})}function vi(e=null){Kr(),Ho(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Am(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Fs(){return{populateEquipmentDescriptionLists:Ht,setFlatpickrValue:Yu,splitDateTime:sr,renderEditItems:Ut,updateEditReservationSummary:ot,addEquipmentByDescription:Ju,addEquipmentToEditingReservation:Xu,addEquipmentToEditingByDescription:La,combineDateTime:Vn,hasEquipmentConflict:St,hasTechnicianConflict:or,renderReservations:Ho,handleReservationsMutation:vi,ensureModal:Am}}function Ho(e="reservations-list",t=null){Tu({containerId:e,filters:t,onShowDetails:Vo,onConfirmReservation:Ko})}function Vo(e){return Bu(e,{getEditContext:Fs,onEdit:(t,{reservation:n})=>{Qo(t,n)},onDelete:Uo})}function Uo(e){return dn()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?Fu(e,{onAfterChange:vi}):!1:(Gn(),!1)}function Ko(e){return Ru(e,{onAfterChange:vi})}function Qo(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",i)}Zi(e,Fs());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",i)}Zi(e,Fs());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const i=t.id??t.reservationId;n.set("reservationEditId",String(i));try{localStorage.setItem("pendingReservationEditId",String(i)),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",r)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",i)}}Nc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(i=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",i)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Um(){Sm({showReservationDetails:Vo,deleteReservation:Uo,confirmReservation:Ko,openReservationEditor:Qo})}export{_m as $,Ro as A,Um as B,Mo as C,ym as D,pm as E,$m as F,zm as G,Vm as H,Mm as I,km as J,vi as K,Kr as L,jm as M,ot as N,Lm as O,Nm as P,Fs as Q,be as R,Uo as S,Ko as T,Qo as U,Yu as V,Pn as W,il as X,ha as Y,Im as Z,Al as _,Qe as a,Om as a0,Ri as b,Xr as c,Jr as d,Rm as e,Ho as f,Qr as g,Em as h,bm as i,Sm as j,Vo as k,Tm as l,Za as m,Bm as n,mm as o,gm as p,pd as q,Xn as r,Yr as s,Gr as t,fm as u,Dm as v,Hm as w,Fm as x,Pm as y,Cm as z};
