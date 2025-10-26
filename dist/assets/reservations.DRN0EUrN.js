import{n as v,l as be,a as aa,s as tc,A as nc,j as ti,x as Et,t as c,f as w,y as Ot,z as ni,B as ac,C as gs,D as ic,E as Je,u as bs,F as hs,r as sc,h as oc,o as rc}from"./maintenance.BnsilVv3.js";import{f as An,a as cc,b as Ye,d as lc,D as vt,c as xn,e as ia,g as sa,h as tn,p as qe,j as vs,n as Ke,k as Ss,l as Ui,o as dn,q as dc,t as uc,u as Vt,v as oa,w as ai,x as qn,y as pc,i as ii,r as Kt,z as _s,A as kt,B as On,s as _e,C as ra,P as As,E as qs,F as xa,G as mc,H as fc,I as yc,J as Is,K as ks,L as gc,M as bc,N as hc,O as vc}from"./projects.LJ2hsl-k.js";import{s as ws,a as Es,e as xs,p as Sc}from"./reports.Db7PepGB.js";let sn=[],Ps=[],$s=[],Ns="single";function pt(){return sn}function Cs(e){sn=Array.isArray(e)?e:[]}function ca(e){sn=[...sn,e]}function _c(e){Number.isInteger(e)&&e>=0&&(sn=sn.filter((t,n)=>n!==e))}function si(){return Ps}function Ac(e){Ps=Array.isArray(e)?e:[]}function Ts(){return $s}function js(e){$s=Array.isArray(e)?e:[]}function Vn(){return Ns==="package"?"package":"single"}function qc(e){Ns=e==="package"?"package":"single"}function Ls(e){if(!e)return{date:"",time:""};const t=String(e).trim();if(!t)return{date:"",time:""};let n=t;n.includes(" ")&&!n.includes("T")&&(n=n.replace(" ","T"));const[a="",i=""]=n.split("T"),o=a?a.slice(0,10):"",s=i.match(/(\d{1,2}:\d{2})/);let r="";if(s){const[l="00",d="00"]=s[0].split(":");r=`${l.padStart(2,"0")}:${d.padStart(2,"0")}`}return{date:o,time:r}}function In(e,t){if(!e)return"";const n=t&&t.length?t:"00:00";return`${e}T${n}`}function Y(e){return v(String(e||"")).trim().toLowerCase()}const Ic=864e13;function yt(e){if(!e&&e!==0)return null;if(e instanceof Date){const a=e.getTime();return Number.isNaN(a)?null:new Date(a)}if(typeof e=="number"){if(!Number.isFinite(e))return null;const a=new Date(e);return Number.isNaN(a.getTime())?null:a}let t=String(e??"").trim();if(!t)return null;if(/^\d+$/.test(t)){const a=Number(t);if(Number.isFinite(a)){const i=new Date(a);if(!Number.isNaN(i.getTime()))return i}}if(!t.includes("T")&&t.includes(" ")){const a=t.indexOf(" ");t=`${t.slice(0,a)}T${t.slice(a+1).trimStart()}`}else t.includes(" ")&&(t=t.replace(" ","T"));const n=new Date(t);if(!Number.isNaN(n.getTime()))return n;if(!t.endsWith("Z")&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/.test(t)){const a=new Date(`${t}Z`);if(!Number.isNaN(a.getTime()))return a}return null}function St(e,t,n,a=null){if(!e||!t||!n)return!1;const i=yt(t),o=yt(n);if(!i||!o||i>=o)return!1;const s=Y(e);if(!s)return!1;const r=be()||{},l=Array.isArray(r.reservations)?r.reservations:[],d=Array.isArray(r.maintenance)?r.maintenance:[],u=Array.isArray(r.equipment)?r.equipment:[],p=Tc(u),y=ci(a);return l.some(m=>{if(!m||li(m,y)||!m.start||!m.end)return!1;const h=yt(m.start),S=yt(m.end);return!h||!S||!(h<o&&S>i)?!1:kc(m,s)})?!0:d.some(m=>{if(!xc(m)||!$c(m,p).has(s))return!1;const{start:S,end:k}=Nc(m);if(!S&&!k)return!0;const _=S??new Date(0),I=k??new Date(Ic);return _<o&&I>i})}function Ds(e,t,n,a=null){const i=Ye(e);if(!i||!t||!n)return!1;const o=yt(t),s=yt(n);if(!o||!s||o>=s)return!1;const r=be()||{},l=Array.isArray(r.reservations)?r.reservations:[],d=ci(a);return l.some(u=>{if(!u?.start||!u?.end||li(u,d))return!1;const p=yt(u.start),y=yt(u.end);return!p||!y||!(p<s&&y>o)?!1:wc(u,i)})}function oi(e,t,n,a=null){const i=Y(e);if(!i||!t||!n)return[];const o=lc(i);return o.length?o.filter(s=>Ds(s.id,t,n,a)):[]}function Bs(e){const t=[];return!e||typeof e!="object"||["items","equipment","packages","packageItems","package_items","reservedItems","reserved_items"].forEach(a=>{const i=e[a];Array.isArray(i)&&i.length&&t.push(i)}),t}function kc(e,t){if(!t||!e||typeof e!="object")return!1;const n=Y(e?.barcode);if(n&&n===t)return!0;const a=Bs(e);for(const i of a)for(const o of i)if(Ec(o).has(t))return!0;return!1}function wc(e,t){if(!t||!e||typeof e!="object")return!1;const n=[e.packageId,e.package_id,e.bundleId,e.bundle_id,e.packageCode,e.package_code];for(const o of n){if(!o&&o!==0)continue;const s=Ye(o);if(s&&s===t)return!0}const a=e.packages;if(Array.isArray(a))for(const o of a){const s=Ye(o);if(s&&s===t)return!0}const i=Bs(e);for(const o of i)for(const s of o)if(ri(s).has(t))return!0;return!1}function Ec(e){const t=new Set;if(!e&&e!==0)return t;if(typeof e=="string"||typeof e=="number"){const o=Y(e);return o&&t.add(o),t}if(typeof e!="object")return t;const n=Y(e.barcode??e.equipmentBarcode??e.code??e.serial??e.serialNumber??e.serial_number);n&&t.add(n),["packageItems","package_items","items","equipment","bundleItems","bundle_items"].forEach(o=>{const s=e[o];Array.isArray(s)&&s.forEach(r=>{if(r!=null){if(typeof r=="string"||typeof r=="number"){const l=Y(r);l&&t.add(l);return}if(typeof r=="object"){const l=Y(r.barcode??r.equipmentBarcode??r.code??r.serial??r.serialNumber??r.serial_number);l&&t.add(l)}}})});const i=ri(e);return i.size&&i.forEach(o=>{const s=An(o);if(!s)return;cc(s).forEach(l=>{const d=l.normalizedBarcode??Y(l.barcode);d&&t.add(d)})}),t}function ri(e){const t=new Set;if(!e&&e!==0||typeof e=="string"||typeof e=="number"||typeof e!="object")return t;const n=[e.packageId,e.package_id,e.packageCode,e.package_code,e.bundleId,e.bundle_id];return(e.type==="package"||e.kind==="package"||e.category==="package")&&n.push(e.id,e.code,e.uuid),n.forEach(a=>{const i=Ye(a);i&&t.add(i)}),e.package&&typeof e.package=="object"&&ri(e.package).forEach(i=>t.add(i)),Array.isArray(e.packages)&&e.packages.forEach(a=>{const i=Ye(a);i&&t.add(i)}),t}function xc(e){const t=[e?.statusRaw,e?.status_raw,e?.status,e?.statusLabel,e?.status_label];if(Cc(e))return!1;for(const n of t){const a=Pc(n);if(a){if(a==="completed"||a==="cancelled"||a==="closed")return!1;if(a==="open"||a==="in_progress")return!0}}return!0}function Pc(e){const t=String(e??"").trim().toLowerCase().replace(/\s+/g,"_");return t?t==="completed"||t==="done"||t==="finished"||t==="resolved"||t==="closed"||t==="مكتمل"||t==="مغلق"?"completed":t==="cancelled"||t==="canceled"||t==="ملغي"?"cancelled":t==="in_progress"||t==="in-progress"||t==="قيد_التنفيذ"||t==="جاري_العمل"||t==="inprogress"?"in_progress":t==="open"||t==="قيد_الصيانة"||t==="قيد_الانتظار"||t==="pending"||t==="scheduled"||t==="active"?"open":t.includes("progress")||t.includes("ongoing")||t.includes("تنفيذ")?"in_progress":t.includes("close")||t.includes("complete")||t.includes("finish")||t.includes("resolve")?"completed":t.includes("cancel")?"cancelled":"open":""}function $c(e,t){const n=new Set;[e?.equipmentBarcode,e?.equipment_barcode,e?.barcode].forEach(s=>{const r=Y(s);r&&n.add(r)});const i=e?.equipment&&typeof e.equipment=="object"?e.equipment:null;if(i){const s=Y(i.barcode??i.equipmentBarcode??i.code??i.serial??i.serialNumber??i.serial_number);s&&n.add(s)}return[e?.equipmentId,e?.equipment_id,i?.id,i?.equipmentId,i?.equipment_id].map(s=>s!=null?String(s):"").filter(Boolean).forEach(s=>{const r=t.get(s);if(!r)return;const l=Y(r?.barcode??r?.equipmentBarcode??r?.code??r?.serial??r?.serialNumber??r?.serial_number);l&&n.add(l)}),n}function Nc(e){const t=Pa([e?.scheduledAt,e?.scheduled_at,e?.startAt,e?.start_at,e?.startDate,e?.start_date,e?.reportedAt,e?.reported_at,e?.createdAt,e?.created_at]),n=Pa([e?.resolvedAt,e?.resolved_at,e?.closedAt,e?.closed_at,e?.completedAt,e?.completed_at,e?.finishedAt,e?.finished_at,e?.endAt,e?.end_at,e?.endDate,e?.end_date,e?.expectedCompletionAt,e?.expected_completion_at,e?.dueAt,e?.due_at]);return{start:t,end:n}}function Cc(e){return!!Pa([e?.resolvedAt,e?.resolved_at,e?.closedAt,e?.closed_at,e?.completedAt,e?.completed_at,e?.finishedAt,e?.finished_at,e?.endAt,e?.end_at,e?.endDate,e?.end_date,e?.expectedCompletionAt,e?.expected_completion_at,e?.dueAt,e?.due_at])}function Pa(e=[]){for(const t of e){const n=yt(t);if(n)return n}return null}function Tc(e){const t=new Map;return Array.isArray(e)&&e.forEach(n=>{if(!n||typeof n!="object")return;[n?.id,n?.ID,n?.equipment_id,n?.equipmentId,n?.item_id,n?.itemId,n?.uuid,n?.UUID].map(i=>i!=null?String(i):"").filter(Boolean).forEach(i=>{t.has(i)||t.set(i,n)})}),t}function Fs(e,t,n,a=null){if(!e||!t||!n)return!1;const i=new Date(t),o=new Date(n);if(Number.isNaN(i.getTime())||Number.isNaN(o.getTime()))return!1;const{reservations:s=[]}=be(),r=String(e),l=ci(a);return s.some(d=>{if(!d?.start||!d?.end||li(d,l))return!1;const u=new Date(d.start),p=new Date(d.end);return Number.isNaN(u.getTime())||Number.isNaN(p.getTime())||!(u<o&&p>i)?!1:(Array.isArray(d.technicians)?d.technicians:[]).some(m=>String(m)===r)})}function ci(e){return en(e,new Set)}function li(e,t){if(!t||t.size===0)return!1;const n=en([e?.id,e?.reservationId,e?.reservation_id,e?.reservationCode,e?.reservation_code,e?.uuid,e?.UUID,e?._id],new Set);for(const a of n)if(t.has(a))return!0;return!1}function en(e,t){if(e==null)return t;if(e instanceof Set)return e.forEach(o=>en(o,t)),t;if(Array.isArray(e))return e.forEach(o=>en(o,t)),t;if(typeof e=="object"){const o=["id","reservationId","reservation_id","reservationCode","reservation_code","uuid","UUID","_id"];let s=!1;return o.forEach(r=>{Object.prototype.hasOwnProperty.call(e,r)&&(s=!0,en(e[r],t))}),s||Object.values(e).forEach(r=>en(r,t)),t}const n=v(String(e??"")).trim();if(!n)return t;const a=[n,n.toLowerCase(),n.toUpperCase()],i=n.replace(/\D+/g,"");if(i){a.push(i);const o=Number.parseInt(i,10);Number.isNaN(o)||a.push(String(o))}return a.forEach(o=>{o&&t.add(o)}),t}const jc=be()||{};let ct=(jc.reservations||[]).map(Us);function Dt(e){let t=Number(e);if(!Number.isFinite(t))return 0;let n=0;for(;Math.abs(t)>1e5&&n<8;)t/=10,n+=1;return Number(t.toFixed(2))}const Rs="__reservation_packages_cache__";function Ms(){return typeof window>"u"||!window.localStorage?null:window.localStorage}function zs(){const e=Ms();if(!e)return{};try{const t=e.getItem(Rs);if(!t)return{};const n=JSON.parse(t);return n&&typeof n=="object"?n:{}}catch(t){return console.warn("[reservationsService] Failed to read reservation packages cache",t),{}}}function Qi(e){const t=Ms();if(t)try{t.setItem(Rs,JSON.stringify(e))}catch(n){console.warn("[reservationsService] Failed to persist reservation packages cache",n)}}function Lc(e=[]){return!Array.isArray(e)||e.length===0?!1:e.some(t=>{const a=(t.positionLabel??"").trim().length>0,i=t.positionId!=null||t.positionKey!=null&&String(t.positionKey).trim()!=="",o=Number.isFinite(Number(t.positionClientPrice))&&Number(t.positionClientPrice)>0,s=Number.isFinite(Number(t.positionCost))&&Number(t.positionCost)>0;return a||i||o||s})}function Hs(e){return[]}function Os(e=[]){return Array.isArray(e)?e.map((t,n)=>Xs(t,n)).filter(Boolean).map((t,n)=>{const a=Ye(t.packageId??t.package_id??t.package_code??t.code??t.id??`pkg-${n}`),i=Kn(t,a).map(d=>{const u=Le(d.qty??d.quantity??d.count??d.units??d.unit_qty??d.unitQty??d.unit_count??d.unitCount??d.package_quantity??d.packageQty??1),p=Dt(me(d.price??d.unit_price??0));return{...d,qty:u,quantity:u,price:p,unit_price:p}}),o=Le(t.quantity??t.qty??1);let s=Dt(me(t.unit_price??t.unitPrice??t.price??0));if(!s||s<=0){const d=i.reduce((u,p)=>u+(p.price||0)*(p.qty||1),0);d>0&&o>0&&(s=Dt(Number((d/o).toFixed(2))))}const r=me(t.total_price??t.totalPrice??t.total??s*o),l=r>0?Dt(r):Dt(Number((s*o).toFixed(2)));return{...t,packageId:a,package_id:a,qty:o,quantity:o,unit_price:s,unitPrice:s,price:s,total_price:l,total:l,packageItems:i}}):[]}function Pn(e,t){if(!e)return;const n=zs(),a=String(e);if(!Array.isArray(t)||t.length===0){n[a]&&(delete n[a],Qi(n));return}n[a]=Os(t),Qi(n)}function Dc(e){if(!e)return[];const t=zs(),n=String(e),a=t[n];return Array.isArray(a)?Os(a):[]}function di(e,t=0){if(e==null)return null;if(typeof e!="object"){const I=e!=null?String(e):null;return{assignmentId:`crew-${t}-${I??"unassigned"}`,positionId:null,positionKey:null,positionLabel:"",positionLabelAlt:"",positionLabelAr:null,positionLabelEn:null,positionCost:0,positionClientPrice:0,technicianId:I,technicianName:null,technicianRole:null,notes:null}}const n=e.assignment_id??e.assignmentId??e.id??e.technician_id??e.technicianId??`crew-${t}`,a=e&&typeof e.position=="object"?e.position:null,i=e.position_id??e.positionId??e.position??e.position_code??a?.id??a?.code??null,o=e.position_key??e.positionKey??e.position_code??e.positionId??a?.name??a?.key??null;let s=e.position_name??e.positionName??e.position_label??e.position_title??a?.label_ar??a?.label_en??a?.name??e.role??e.position??"";s||(s=e.position_label_ar??e.position_title_ar??e.position_name_ar??e.position_label_en??e.position_title_en??e.position_name_en??"");const r=e.position_label_ar??null,l=e.position_label_en??null,d=e.position_label_alt??l??r??"",u=e.position_cost??e.positionCost??e.cost??e.daily_wage??e.dailyWage??a?.cost??a?.daily_wage??a?.dailyWage??e.internal_cost??null,p=e.position_client_price??e.positionClientPrice??e.client_price??e.customer_price??e.position_price??a?.client_price??a?.clientPrice??e.clientPrice??e.daily_total??e.dailyTotal??e.total??e.price??null,y=Dt(qe(u)),f=Dt(qe(p)),m=e&&typeof e.technician=="object"?e.technician:null,h=e.technician_id??e.technicianId??e.id??m?.id??e.userId??e.user_id??null,S=e.technician_name??e.technicianName??e.name??m?.name??e.full_name??null,k=e.role??m?.role??e.specialization??null,_=e.technician_phone??m?.phone??e.phone??null;return{assignmentId:String(n),positionId:i!=null?String(i):null,positionKey:o!=null?String(o):null,positionLabel:s!=null?String(s):"",positionLabelAlt:d!=null?String(d):"",positionLabelAr:r!=null?String(r):null,positionLabelEn:l!=null?String(l):null,positionCost:Number.isFinite(y)?y:0,positionClientPrice:Number.isFinite(f)?f:0,technicianId:h!=null?String(h):null,technicianName:S!=null?String(S):null,technicianRole:k!=null?String(k):null,technicianPhone:_!=null?String(_):null,notes:e.notes??null}}function ui(){return ct}function $n(e){ct=Array.isArray(e)?e.map(Mt):[],ct.forEach(t=>{if(!t)return;const n=t.id??t.reservationId??t.reservationCode;Pn(n,t.packages);const a=t.crewAssignments&&t.crewAssignments.length?t.crewAssignments:t.techniciansDetails||[];Lc(a)}),ct.length?console.debug("[reservationsService] setReservationsState first paymentHistory",ct[0]?.paymentHistory):console.debug("[reservationsService] setReservationsState empty state"),tc({reservations:ct});try{typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(new CustomEvent("reservations:updated")),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(new CustomEvent("reservations:updated"))}catch{}return ct}async function Vs(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([r,l])=>{l!=null&&l!==""&&t.set(r,String(l))});const n=t.toString(),i=(await aa(`/reservations/${n?`?${n}`:""}`))?.data;let o=[];Array.isArray(i)?o=i:i&&typeof i=="object"&&(Array.isArray(i.items)?o=i.items:Array.isArray(i.results)?o=i.results:Array.isArray(i.data)?o=i.data:Array.isArray(i.records)&&(o=i.records));const s=o.map(la);return $n(s)}async function Ks(e){const t=await aa("/reservations/",{method:"POST",body:e}),n=la(t?.data??{});if(!Number.isFinite(n.companySharePercent)&&e?.company_share_percent!=null&&(n.companySharePercent=Number(e.company_share_percent)||0),(!Array.isArray(n.paymentHistory)||n.paymentHistory.length===0)&&Array.isArray(e?.payment_history)){const a=fi(e.payment_history);a.length&&(n.paymentHistory=a)}if((!Array.isArray(n.crewAssignments)||n.crewAssignments.length===0)&&Array.isArray(e?.technicians)&&e.technicians.length){const a=e.technicians.map((i,o)=>di(i,o)).filter(Boolean);a.length&&(n.crewAssignments=a,n.techniciansDetails=a.map((i,o)=>{const s=e.technicians[o];return typeof s=="object"?{...s,...i}:i}))}if(Array.isArray(e?.packages)&&e.packages.length){const a=bi({packages:e.packages});n.packages=zt(n.packages,a)}{const a=gi(n.items||[],n.packages||[]);n.items=a.items,n.packages=zt(n.packages||[],a.packages)}if(Pn(n.id??n.reservationId??n.reservation_code,n.packages),n.companySharePercent>0&&(!Number.isFinite(n.companyShareAmount)||n.companyShareAmount<=0)){const a=xn({items:n.items||[],technicianIds:n.technicians||[],discount:n.discount,discountType:n.discountType,applyTax:n.applyTax,start:n.start,end:n.end,companySharePercent:n.companySharePercent});n.companyShareAmount=a.companyShareAmount,n.cost=a.finalTotal,n.totalAmount=a.finalTotal}return n.companyShareEnabled=e?.company_share_enabled?!0:n.companySharePercent>0,$n([...ct,n]),n}async function pi(e,t){const n=await aa(`/reservations/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=la(n?.data??{});if(console.debug("[reservationsService] updateReservationApi mapped history",a.paymentHistory),!Number.isFinite(a.companySharePercent)&&t?.company_share_percent!=null&&(a.companySharePercent=Number(t.company_share_percent)||0),(!Array.isArray(a.paymentHistory)||a.paymentHistory.length===0)&&Array.isArray(t?.payment_history)){const o=fi(t.payment_history);o.length&&(a.paymentHistory=o,console.debug("[reservationsService] updateReservationApi applied fallback history",a.paymentHistory))}if((!Array.isArray(a.crewAssignments)||a.crewAssignments.length===0)&&Array.isArray(t?.technicians)&&t.technicians.length){const o=t.technicians.map((s,r)=>di(s,r)).filter(Boolean);o.length&&(a.crewAssignments=o,a.techniciansDetails=o.map((s,r)=>{const l=t.technicians[r];return typeof l=="object"?{...l,...s}:s}))}if(Array.isArray(t?.packages)&&t.packages.length){const o=bi({packages:t.packages});a.packages=zt(a.packages,o)}{const o=gi(a.items||[],a.packages||[]);a.items=o.items,a.packages=zt(a.packages||[],o.packages)}if(Pn(a.id??a.reservationId??a.reservation_code??e,a.packages),a.companySharePercent>0&&(!Number.isFinite(a.companyShareAmount)||a.companyShareAmount<=0)){const o=xn({items:a.items||[],technicianIds:a.technicians||[],discount:a.discount,discountType:a.discountType,applyTax:a.applyTax,start:a.start,end:a.end,companySharePercent:a.companySharePercent});a.companyShareAmount=o.companyShareAmount,a.cost=o.finalTotal,a.totalAmount=o.finalTotal}a.companyShareEnabled=t?.company_share_enabled?!0:a.companySharePercent>0;const i=ct.map(o=>String(o.id)===String(e)?a:o);return $n(i),a}async function Bc(e){await aa(`/reservations/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=ct.filter(n=>String(n.id)!==String(e));$n(t),Pn(e,null)}async function Fc(e){return pi(e,{status:"confirmed",confirmed:!0})}function la(e={}){return Mt({id:e.id,reservationId:e.reservation_code??e.reservationId,reservation_code:e.reservation_code,customer_id:e.customer_id,customerId:e.customer_id,customer_name:e.customer_name,customerName:e.customer_name,title:e.title,start:e.start_datetime,end:e.end_datetime,start_datetime:e.start_datetime,end_datetime:e.end_datetime,status:e.status,confirmed:e.confirmed,location:e.location,notes:e.notes,total_amount:e.total_amount,project_id:e.project_id,discount:e.discount,discount_type:e.discount_type,apply_tax:e.apply_tax,paid_status:e.paid_status,items:e.items,technicians:e.technicians,company_share_percent:e.company_share_percent??e.companySharePercent??e.company_share??e.companyShare,company_share_enabled:e.company_share_enabled??e.companyShareEnabled??e.company_share_applied??e.companyShareApplied,company_share_amount:e.company_share_amount??e.companyShareAmount,payment_history:e.payment_history??e.paymentHistory??e.payments??e.paymentLogs??e.payment_records,paymentHistory:e.paymentHistory??e.payment_history??e.payments??e.paymentLogs??e.payment_records})}function Us(e={}){return Mt(e)}function Mt(e={}){const t=e.id??e.reservation_id??e.reservationId??null,n=e.reservation_code??e.reservationCode??e.reservationId??(t!=null?`RSV-${t}`:null);let a=Array.isArray(e.items)?e.items.map(Qs):[],i=bi(e);const o=Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:Array.isArray(e.technicians)?e.technicians:[];let s=o.map((R,G)=>di(R,G)).filter(Boolean),r=s.map((R,G)=>{const B=o?.[G];return{...B&&typeof B=="object"?{...B}:B!=null?{id:B}:{},...R}});const l=s.map(R=>R.technicianId).filter(R=>R!=null&&R!=="").map(R=>Number.isNaN(Number(R))?String(R):Number(R)),d=e.start??e.start_datetime??"",u=e.end??e.end_datetime??"";let p=me(e.total_amount??e.totalAmount??e.cost??0);const y=me(e.discount??0),f=e.discount_type??e.discountType??"percent",m=["percent","amount"].includes(f)?f:"percent",h=!!(e.apply_tax??e.applyTax??!1);let S=Uc(e.paid_status??e.paidStatus??(e.paid===!0||e.paid==="paid"?"paid":"unpaid"))??"unpaid";const k=e.confirmed!=null?!!e.confirmed:["confirmed","in_progress","completed"].includes(String(e.status??"").toLowerCase()),_=e.company_share_percent??e.companySharePercent??e.company_share??e.companyShare??null,I=_!=null?Number.parseFloat(v(String(_).replace("%","").trim())):NaN,D=e.company_share_enabled??e.companyShareEnabled??e.company_share_applied??e.companyShareApplied??null;let O=D!=null?D===!0||D===1||D==="1"||String(D).toLowerCase()==="true":Number.isFinite(I)&&I>0,A=O&&Number.isFinite(I)?Number(I):0;const E=e.company_share_amount??e.companyShareAmount;let N=Number.isFinite(Number(E))?Number(E):NaN;h&&A<=0&&(A=vt,O=!0);const x=xn({items:a,technicianIds:l,crewAssignments:s,discount:y,discountType:m,applyTax:h,start:d,end:u,companySharePercent:A>0?A:null});(!Number.isFinite(p)||p<=0||h)&&(p=x.finalTotal),(!Number.isFinite(N)||N<0)&&(N=x.companyShareAmount),N=Number.isFinite(N)?Number(N.toFixed(2)):0,!O&&A>0&&(O=!0);const z=[e.payment_history,e.paymentHistory,e.payments,e.payment_records,e.paymentRecords,e.payment_logs,e.paymentLogs,e.paymenthistory,e.paymentHistoryList,e.payment],b=Rc(z),j=fi(b),V=t??n??e.reservation_code??e.reservationId??null;if(i.length)Pn(V,i);else{const R=Dc(V);R.length&&(i=zt(i,R))}const $=gi(a,i);a=$.items,i=zt(i,$.packages);const L=ia({totalAmount:p,progressType:e.payment_progress_type??e.paymentProgressType??null,progressValue:e.payment_progress_value??e.paymentProgressValue??null,paidAmount:e.paid_amount??e.paidAmount??null,paidPercent:e.paid_percentage??e.paidPercentage??null,history:j});S=sa({manualStatus:S,paidAmount:L.paidAmount,paidPercent:L.paidPercent,totalAmount:p});const P=S==="paid";return{id:t!=null?String(t):"",reservationId:n??(t!=null?String(t):""),reservationCode:n??null,customerId:e.customer_id??e.customerId??e.customer?.id??null,customerName:e.customer_name??e.customerName??e.customer?.full_name??e.customer?.customerName??"",title:e.title??e.name??"",start:d,end:u,status:Kc(e.status??(k?"confirmed":"pending")),confirmed:k,location:e.location??"",notes:e.notes??"",discount:y,discountType:m,applyTax:h,paid:P,paidStatus:S,paidAmount:L.paidAmount,paidPercent:L.paidPercent,paymentProgressType:L.paymentProgressType,paymentProgressValue:L.paymentProgressValue,paymentHistory:j,payment_history:j,totalAmount:p,cost:p,projectId:e.project_id??e.projectId??null,items:a,technicians:l,crewAssignments:s,techniciansDetails:r,startDatetime:d,endDatetime:u,customerPhone:e.customer_phone??e.customerPhone??null,packages:i,companySharePercent:A,companyShareAmount:N,companyShareEnabled:O}}function Qs(e={}){if(!e||typeof e!="object")return{id:"",equipmentId:null,barcode:"",desc:"",qty:1,price:0,notes:null,image:null};const t=e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=Le(e.quantity??e.qty??e.count??e.units??e.unit_qty??e.unitQty??e.unit_count??e.unitCount??e.package_quantity??e.packageQty??1),a=me(e.unit_price??e.unitPrice??e.price??e.total_price??e.total??0),i=v(String(e.barcode??e.code??e.serial??"")),o=e.description??e.desc??e.name??e.title??"",s={id:e.id!=null?String(e.id):t!=null?String(t):"",equipmentId:t,barcode:i,desc:o,qty:n,quantity:n,qtyPerPackage:null,totalQuantity:n,price:a,notes:e.notes??null,image:e.image??e.image_url??e.imageUrl??null},r=Gs(e.type??e.item_type??e.kind??null),l=e.packageId??e.package_id??e.package_code??e.packageCode??e.bundleId??null,d=dt(l),u=Kn(e,d);if(r==="package"||d||u.length){s.type="package";const p=d||(t!=null?String(t):s.id?dt(s.id):"");p&&(s.packageId=p,s.package_id=p,s.package_code=e.package_code??e.packageCode??p),s.name=o||s.package_code||p||"",s.barcode=s.barcode||v(String(e.package_code??e.packageCode??"")),s.packageItems=u;const y=Js({...e,unit_price:e.unit_price??e.unitPrice??e.price,total_price:e.total_price??e.totalPrice??e.total},u,n);(!Number.isFinite(s.price)||s.price<=0||s.price>y*10)&&(s.price=y),s.qtyPerPackage=u.length?u[0]?.qtyPerPackage??s.qtyPerPackage:s.qtyPerPackage,s.totalQuantity=n}return s}function mi({reservationCode:e,customerId:t,start:n,end:a,status:i,title:o,location:s,notes:r,projectId:l,totalAmount:d,discount:u,discountType:p,applyTax:y,paidStatus:f,confirmed:m,items:h,packages:S,crewAssignments:k=[],technicians:_=k,companySharePercent:I,companyShareEnabled:D,paidAmount:O,paidPercentage:A,paymentProgressType:E,paymentProgressValue:N,paymentHistory:x}){const z=Array.isArray(k)?k:[];return{reservation_code:e??null,customer_id:t,start_datetime:n,end_datetime:a,status:i??"pending",title:o??null,location:s??null,notes:r??null,project_id:l||null,total_amount:d??0,discount:u??0,discount_type:p??"percent",apply_tax:y?1:0,paid_status:f??"unpaid",paid_amount:Number.isFinite(O)?me(O):0,paid_percentage:Number.isFinite(A)?Number(A.toFixed(2)):0,payment_progress_type:E??null,payment_progress_value:Number.isFinite(N)?Number(N.toFixed(2)):null,payment_history:Array.isArray(x)?x.map(b=>({type:$a(b?.type??b?.payment_type??b?.method??b?.paymentMethod),value:b?.value!=null?me(b.value):null,amount:b?.amount!=null?me(b.amount):b?.payment_amount!=null?me(b.payment_amount):null,percentage:b?.percentage!=null?Number(b.percentage):b?.payment_percentage!=null?Number(b.payment_percentage):null,note:b?.note??b?.notes??b?.comment??b?.payment_note??null,recorded_at:b?.recordedAt??b?.recorded_at??b?.createdAt??b?.created_at??b?.payment_date??b?.date??new Date().toISOString()})):[],payments:Array.isArray(x)?x.map(b=>({type:$a(b?.type??b?.payment_type??b?.method??b?.paymentMethod),value:b?.value!=null?me(b.value):null,amount:b?.amount!=null?me(b.amount):b?.payment_amount!=null?me(b.payment_amount):null,percentage:b?.percentage!=null?Number(b.percentage):b?.payment_percentage!=null?Number(b.payment_percentage):null,note:b?.note??b?.notes??b?.comment??b?.payment_note??null,recorded_at:b?.recordedAt??b?.recorded_at??b?.createdAt??b?.created_at??b?.payment_date??b?.date??new Date().toISOString()})):[],confirmed:m===void 0?null:!!m,items:Mc(h),packages:zc(h,S),company_share_percent:D&&Number.isFinite(I)?Number(I):null,company_share_enabled:D?1:0,technicians:z.length?z.map((b,j)=>{const V=b.technicianId??b.technician_id??b.id??null,$=b.positionId??b.position_id??b.position??b.position_code??null,L=b.positionLabel??b.position_name??b.role??null,P=me(b.positionCost??b.position_cost??b.cost??b.daily_wage??b.dailyWage??0),R=me(b.positionClientPrice??b.position_client_price??b.client_price??b.clientPrice??b.daily_total??b.dailyTotal??b.total??0);return{id:V,technician_id:V,role:L??b.technicianRole??null,notes:b.notes??null,position_id:$,position_key:b.positionKey??b.position_key??null,position_name:L,position_label_ar:b.positionLabelAr??b.position_label_ar??null,position_label_en:b.positionLabelEn??b.position_label_en??null,position_cost:P,position_client_price:R,client_price:R,cost:P,assignment_id:b.assignmentId??b.assignment_id??`crew-${j}`}}):Array.isArray(_)?_.map(b=>typeof b=="object"&&b!==null?{id:b.id??b.technician_id??b.technicianId??b.ID,role:b.role??null,notes:b.notes??null}:Number.isNaN(Number(b))?String(b):Number(b)):[]}}function fi(e){const t=yi(e);return!Array.isArray(t)||t.length===0?[]:t.map(n=>{if(!n||typeof n!="object")return null;const a=n.type??n.payment_type??n.paymentType??n.method??n.paymentMethod??n.kind??null,i=$a(a),o=n.value??n.payment_value??n.paymentValue??n.amount??n.payment_amount??n.percentage??n.payment_percentage??null,s=o!=null?Number.parseFloat(v(String(o))):null,r=n.amount!=null?Number.parseFloat(v(String(n.amount))):n.payment_amount!=null?Number.parseFloat(v(String(n.payment_amount))):null,l=n.percentage!=null?Number.parseFloat(v(String(n.percentage))):n.payment_percentage!=null?Number.parseFloat(v(String(n.payment_percentage))):null,d=Number.isFinite(r)?r:i==="amount"&&Number.isFinite(s)?s:null,u=Number.isFinite(l)?l:i==="percent"&&Number.isFinite(s)?s:null,p=i??(d!=null?"amount":u!=null?"percent":null),y=p==="amount"?d:p==="percent"?u:Number.isFinite(s)?s:null,f=n.note??n.notes??n.comment??n.payment_note??null,m=n.recordedAt??n.recorded_at??n.payment_date??n.date??n.createdAt??n.created_at??null;return{type:p,value:y,amount:d,percentage:u,note:f,recordedAt:m}}).filter(n=>n&&n.type)}function $a(e){if(!e)return null;const t=String(e).trim().toLowerCase();return["amount","fixed","cash","value","money","sar","riyals"].includes(t)?"amount":["percent","percentage","ratio"].includes(t)?"percent":null}function yi(e){if(Array.isArray(e))return e;if(e&&typeof e=="object"){const t=["data","items","records","history","list","entries","payment_history","paymentHistory","payment_records","paymentRecords","payments","payment"];for(const s of t)if(Array.isArray(e[s]))return e[s];const a=[e.data,e.items,e.records,e.history,e.list,e.entries,e.payment_history,e.paymentHistory,e.payment_records,e.paymentRecords,e.payments,e.payment].find(s=>Array.isArray(s));if(Array.isArray(a))return a;const i=Object.values(e);if(i.length&&i.every(s=>s&&typeof s=="object")){const s=i.map(r=>r);if(s.every(r=>!Array.isArray(r)))return s}if(["amount","payment_amount","value","payment_value","percentage","payment_percentage","type","payment_type","method","paymentMethod"].some(s=>s in e))return[e]}if(typeof e=="string")try{const t=JSON.parse(e);return yi(t)}catch{return[]}return[]}function Rc(e=[]){if(!Array.isArray(e))return[];for(const t of e){const n=yi(t);if(Array.isArray(n)&&n.length)return n}return[]}function Mc(e){if(!Array.isArray(e)||e.length===0)return[];const t=[];return e.forEach(n=>{if(!n||typeof n!="object")return;if(n.type==="package"&&Array.isArray(n.packageItems)&&n.packageItems.length){const i=Le(n.qty??n.quantity??1);n.packageItems.forEach(o=>{const s=o?.equipmentId??o?.equipment_id??o?.id??null;if(s==null)return;const r=Le(o?.qty??o?.quantity??1),l=i*r;t.push({equipment_id:Na(s),quantity:l,unit_price:me(o?.price??o?.unit_price??0),notes:o?.notes??null})});return}const a=n.equipmentId??n.equipment_id??n.id??null;a!=null&&t.push({equipment_id:Na(a),quantity:Le(n.qty??n.quantity??1),unit_price:me(n.price??n.unit_price??0),notes:n.notes??null})}),t}function Na(e){const t=Number(e);return Number.isFinite(t)&&t>=0?t:String(e)}function zc(e,t){const n=Array.isArray(t)?t.slice():[];return Array.isArray(e)&&e.forEach(a=>{if(!a||typeof a!="object"||a.type!=="package")return;const i=Le(a.qty??a.quantity??1),o=Array.isArray(a.packageItems)?a.packageItems.map(s=>{const r=s?.equipmentId??s?.equipment_id??s?.id??null;return r==null?null:{equipment_id:Na(r),quantity:Le(s?.qty??s?.quantity??s?.count??s?.units??s?.unit_qty??s?.unitQty??s?.unit_count??s?.unitCount??s?.package_quantity??s?.packageQty??1),unit_price:me(s?.price??s?.unit_price??0)}}).filter(Boolean):[];n.push({package_code:a.packageId??a.package_id??a.barcode??null,name:a.desc??a.name??"",quantity:i,unit_price:me(a.price??a.unit_price??0),items:o})}),n}function Gs(e){if(e==null)return"";const t=String(e).trim().toLowerCase();return t==="package"||t==="bundle"||t==="pack"?"package":t}function dt(e){if(e==null)return"";const t=String(e).replace(/^package::/i,"");return Ye(t)}function Ca(e){return e==null?"":v(String(e)).trim().toLowerCase()}function Ws(e={},t=1){if(!e||typeof e!="object"){const l=v(String(e??""));return{equipmentId:null,equipment_id:null,qty:1,quantity:1,qtyPerPackage:1,price:0,unit_price:0,barcode:l,normalizedBarcode:Ca(l),desc:"",image:null}}const n=e.equipmentId??e.equipment_id??e.id??e.item_id??e.itemId??null,a=Le(e.quantity??e.qty??e.count??e.units??e.unit_qty??e.unitQty??e.unit_count??e.unitCount??e.package_quantity??e.packageQty??1),i=me(e.unit_price??e.unitPrice??e.price??0),o=v(String(e.barcode??e.normalizedBarcode??e.code??e.serial??"")),s=e.qtyPerPackage??e.qty_per_package??e.perPackageQty??e.per_package_qty??null;let r;if(s!=null)r=Le(s,{fallback:1,max:99});else if(t>0){const l=a/t;Number.isFinite(l)&&l>0&&Number.isInteger(l)?r=Le(l,{fallback:1,max:99}):r=Math.min(a,99)}else r=Math.min(a,99);return{equipmentId:n!=null?String(n):null,equipment_id:n,qty:r,quantity:r,qtyPerPackage:r,totalQuantity:a,price:i,unit_price:i,barcode:o,normalizedBarcode:Ca(e.normalizedBarcode??o),desc:e.desc??e.description??e.name??"",image:e.image??e.image_url??e.imageUrl??null}}function Hc(e={},t={}){const n=dt(e.packageId??e.package_id??e.id??t.packageId??t.package_id??t.id??""),a=Le(e.quantity??e.qty??t.qty??t.quantity??1,{fallback:1,max:9999}),i=me(e.unit_price??e.unitPrice??e.price??t.price??t.unit_price??t.unitPrice??0),o=v(String(e.package_code??e.packageCode??e.barcode??t.package_code??t.packageCode??t.barcode??""));return{id:t.id??(e.id!=null?String(e.id):n?`package::${n}`:""),equipmentId:null,barcode:o,desc:t.desc??t.description??e.name??e.desc??e.title??o,qty:a,quantity:a,price:i,notes:t.notes??null,image:e.image??t.image??null,type:"package",packageId:n,package_id:n,package_code:o,packageItems:Array.isArray(e.packageItems)?e.packageItems:Array.isArray(t.packageItems)?t.packageItems:[]}}function gi(e=[],t=[]){const n=Oc(e),a=Array.isArray(t)?zt(t,n.packages):n.packages,i=new Map;return a.forEach(o=>{const s=dt(o.packageId??o.package_id??o.id);s&&i.set(s,o)}),n.packages.forEach(o=>{const s=dt(o.packageId??o.package_id??o.id);if(!s)return;const r=i.get(s);r&&((!Array.isArray(r.packageItems)||r.packageItems.length===0)&&(r.packageItems=o.packageItems),!r.name&&o.name&&(r.name=o.name),!r.image&&o.image&&(r.image=o.image))}),{items:n.items,packages:Array.from(i.values())}}function Oc(e=[]){const t=new Map;if(e.forEach(o=>{const s=dt(o.packageId??o.package_id??o.packageCode??o.package_code??o.bundleId??o.bundle_id??null);if(!s)return;const r=s;t.has(r)||t.set(r,{base:o,items:[]}),t.get(r).items.push(o)}),!t.size)return{items:e,packages:[]};const n=[],a=[],i=new Set;return e.forEach(o=>{const s=dt(o.packageId??o.package_id??o.packageCode??o.package_code??o.bundleId??o.bundle_id??null);if(s&&t.has(s)){if(i.has(s))return;const r=t.get(s),l=r.base||o,d=r.items.map(p=>Ws(p,1)),u={packageId:s,package_id:s,package_code:l.package_code??l.packageCode??l.barcode??v(String(s)),name:l.package_name??l.packageName??l.desc??l.name??`Package ${s}`,quantity:Le(l.package_quantity??l.packageQty??l.qty??1,{fallback:1,max:9999}),unit_price:me(l.package_price??l.packagePrice??l.price??0),packageItems:d,image:l.image??null};a.push(u),n.push(Hc(u,l)),i.add(s);return}n.push(o)}),{items:n,packages:a}}function Kn(e={},t=""){if(!e||typeof e!="object")return[];const n=dt(t||e.packageId||e.package_id||e.package_code||e.packageCode||e.bundleId||e.bundle_id||e.id),a=[];Array.isArray(e.packageItems)&&a.push(...e.packageItems),Array.isArray(e.package_items)&&a.push(...e.package_items),Array.isArray(e.items)&&a.push(...e.items),Array.isArray(e.equipment)&&a.push(...e.equipment),Array.isArray(e.contents)&&a.push(...e.contents);let i=tn({...e,id:e.id??n??e.package_code??e.packageCode??e.code??null,package_code:e.package_code??e.packageCode??e.code??e.id??n,items:a,packageItems:a}),o=[];if((!Array.isArray(i)||i.length===0)&&n){const d=An(n);d&&(i=tn(d),o=Array.isArray(i)?i:[])}else if(n){const d=An(n);d&&(o=tn(d)||[])}if(!Array.isArray(i)||i.length===0)return[];const s=Le(e.quantity??e.qty??e.count??e.units??e.unit_qty??e.unitQty??e.unit_count??e.unitCount??e.package_quantity??e.packageQty??1,{fallback:1,max:9999}),r=i.map(d=>Ws(d,s));if(o.length){const d=new Map;o.forEach(u=>{if(!u)return;const p=Ca(u.barcode)||(u.equipmentId!=null?`id:${u.equipmentId}`:null)||(u.equipment_id!=null?`id:${u.equipment_id}`:null);p&&d.set(p,u)}),r.forEach(u=>{const p=u.normalizedBarcode||(u.equipmentId?`id:${u.equipmentId}`:null);if(!p||!d.has(p))return;const y=d.get(p),f=Le(y.quantity??y.qty??1,{fallback:u.qtyPerPackage??1,max:99});u.qtyPerPackage=f,u.qty=f,u.quantity=f;const m=me(y.unit_price??y.unitPrice??y.price??u.price);u.price=m,u.unit_price=m,!u.desc&&y.desc&&(u.desc=y.desc),!u.image&&y.image&&(u.image=y.image)})}const l=new Map;return r.forEach(d=>{const u=d.normalizedBarcode||(d.equipmentId?`id:${d.equipmentId}`:null);if(u){if(l.has(u)){const p=l.get(u);p.qty+=d.qty,p.quantity+=d.quantity,(!Number.isFinite(p.qtyPerPackage)||p.qtyPerPackage<=0)&&(p.qtyPerPackage=d.qtyPerPackage),(!p.price||p.price===0)&&d.price&&(p.price=d.price,p.unit_price=d.unit_price),!p.desc&&d.desc&&(p.desc=d.desc),!p.image&&d.image&&(p.image=d.image);return}l.set(u,{...d})}}),Array.from(l.values())}function Js(e={},t=[],n=1){if(Array.isArray(t)&&t.length){const i=t.reduce((o,s)=>{const r=Number.isFinite(Number(s.price))?Number(s.price):0,l=Number.isFinite(Number(s.qtyPerPackage))&&Number(s.qtyPerPackage)>0?Number(s.qtyPerPackage):Number.isFinite(Number(s.qty))&&Number(s.qty)>0?Number(s.qty):1;return o+r*l},0);if(i>0)return Number(i.toFixed(2))}const a=e.total_price??e.totalPrice??e.total??e.amount??null;if(Number.isFinite(Number(a))){const i=me(a);return n>0?Number((i/n).toFixed(2)):i}return Number.isFinite(Number(e.unit_price??e.unitPrice??e.price))?me(e.unit_price??e.unitPrice??e.price):0}function Ys(e,t){if(!e)return t;if(!t)return e;const n={...e},a=i=>{(n[i]===void 0||n[i]===null||n[i]==="")&&(n[i]=t[i])};return["name","desc","barcode","image"].forEach(a),(!Number.isFinite(Number(n.unit_price))||n.unit_price===0)&&Number.isFinite(Number(t.unit_price))&&(n.unit_price=t.unit_price,n.unitPrice=t.unitPrice,n.price=t.price),(!Number.isFinite(Number(n.total_price))||n.total_price===0)&&Number.isFinite(Number(t.total_price))&&(n.total_price=t.total_price,n.total=t.total),!Array.isArray(n.packageItems)||n.packageItems.length===0?(n.packageItems=Array.isArray(t.packageItems)?t.packageItems:[],n.items=n.packageItems):Array.isArray(t.packageItems)&&t.packageItems.length&&(n.packageItems=Vc(n.packageItems,t.packageItems),n.items=n.packageItems),n}function Vc(e=[],t=[]){const n=new Map,a=i=>{i.forEach(o=>{if(!o)return;const s=o.normalizedBarcode||(o.equipmentId?`id:${o.equipmentId}`:null);if(s){if(n.has(s)){const r=n.get(s);r.qty+=o.qty??0,r.quantity+=o.quantity??0,(!Number.isFinite(r.qtyPerPackage)||r.qtyPerPackage<=0)&&Number.isFinite(o.qtyPerPackage)&&(r.qtyPerPackage=o.qtyPerPackage),(!r.price||r.price===0)&&o.price&&(r.price=o.price,r.unit_price=o.unit_price),!r.desc&&o.desc&&(r.desc=o.desc),!r.image&&o.image&&(r.image=o.image);return}n.set(s,{...o})}})};return a(e),a(t),Array.from(n.values())}function zt(e=[],t=[]){const n=[],a=new Map,i=o=>{Array.isArray(o)&&o.forEach(s=>{if(!s||typeof s!="object")return;const r=s.packageId||s.package_id||s.package_code||s.id;if(r)if(a.has(r)){const l=a.get(r);n[l]=Ys(n[l],s)}else a.set(r,n.length),n.push({...s})})};return i(e),i(t),n}function Xs(e,t=0){if(!e&&e!==0)return null;if(typeof e=="string"||typeof e=="number"){const p=dt(e),y=p?An(p):null,f=y?Kn(y,p):[],m=y?me(y.price??y.unit_price??y.unitPrice??0):0,h=1,S=Number((m*h).toFixed(2));return{id:`package::${p||t}`,packageId:p||`pkg-${t}`,package_id:p||`pkg-${t}`,package_code:v(String(e))||p||`pkg-${t}`,name:y?.name??y?.package_name??y?.packageName??v(String(e))??"",desc:y?.name??v(String(e))??"",quantity:h,qty:h,unit_price:m,unitPrice:m,price:m,total:S,total_price:S,barcode:v(String(e)),packageItems:f,items:f,type:"package",image:y?.image??null}}if(typeof e!="object")return null;const n=dt(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.slug??e.id)||`pkg-${t}`,a=Le(e.quantity??e.qty??e.count??e.units??e.unit_qty??e.unitQty??e.unit_count??e.unitCount??e.package_quantity??e.packageQty??1),i=Kn(e,n),o=Js(e,i,a),s=e.total_price??e.totalPrice??e.total??o*a,r=Number.isFinite(Number(s))?me(s):Number((o*a).toFixed(2)),l=e.package_code??e.packageCode??e.code??n,d=v(String(e.barcode??l??"")),u=e.image??e.cover??e.thumbnail??i.find(p=>p.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,packageId:n,package_id:n,package_code:l,name:e.name??e.package_name??e.packageName??e.title??e.description??l??n,desc:e.name??e.package_name??e.packageName??e.title??e.description??l??n,quantity:a,qty:a,unit_price:o,unitPrice:o,price:o,total:r,total_price:r,barcode:d,packageItems:i,items:i,type:"package",image:u}}function bi(e={}){const t=[];Array.isArray(e.packages)&&t.push(e.packages),Array.isArray(e.reservation_packages)&&t.push(e.reservation_packages),Array.isArray(e.reservationPackages)&&t.push(e.reservationPackages),Array.isArray(e.package_details)&&t.push(e.package_details),Array.isArray(e.packageDetails)&&t.push(e.packageDetails),Array.isArray(e.package_list)&&t.push(e.package_list),Array.isArray(e.packageList)&&t.push(e.packageList);const n=[],a=new Map,i=(r,l=n.length)=>{const d=Xs(r,l);if(!d)return;const u=d.packageId||d.package_code||d.id||`pkg-${l}`;if(a.has(u)){const p=a.get(u);n[p]=Ys(n[p],d)}else a.set(u,n.length),n.push(d)};t.forEach(r=>{r.forEach((l,d)=>{i(l,d+n.length)})}),n.length===0&&e.package&&i(e.package,0);const o=Array.isArray(e.items)?e.items:[],s=(r={})=>!r||typeof r!="object"?!1:!!(Gs(r.type??r.item_type??r.kind??null)==="package"||r.packageItems&&Array.isArray(r.packageItems)&&r.packageItems.length||r.items&&Array.isArray(r.items)&&r.items.length&&r.items.every(d=>typeof d=="object")||r.packageId||r.package_id||r.package_code||r.packageCode||r.bundleId||r.bundle_id);return o.forEach((r,l)=>{s(r)&&i(r,n.length+l)}),n}function me(e){const t=qe(e);return Number.isFinite(t)?Number(t.toFixed(2)):0}function Le(e,{fallback:t=1,max:n=1e6}={}){const a=qe(e);if(!Number.isFinite(a))return t;const i=Math.round(a);return i<=0||i>n?t:i}function Kc(e){switch(String(e??"").trim().toLowerCase()){case"pending":case"معلق":case"قيد الانتظار":return"pending";case"confirmed":case"مؤكد":return"confirmed";case"in_progress":case"in-progress":case"قيد التنفيذ":case"جاري":return"in_progress";case"completed":case"مكتمل":return"completed";case"cancelled":case"ملغي":return"cancelled";default:return"pending"}}function Uc(e){if(e==null)return null;switch(String(e).trim().toLowerCase()){case"paid":case"مدفوع":return"paid";case"partial":case"مدفوع جزئياً":case"partial_paid":return"partial";case"unpaid":case"غير مدفوع":case"not_paid":default:return"unpaid"}}function hi(e){return e instanceof nc}const Eu=Object.freeze(Object.defineProperty({__proto__:null,buildReservationPayload:mi,confirmReservationApi:Fc,createReservationApi:Ks,deleteReservationApi:Bc,getCachedReservationCrew:Hs,getReservationsState:ui,isApiError:hi,mapLegacyReservation:Us,mapReservationFromApi:la,mapReservationItem:Qs,refreshReservationsFromApi:Vs,setReservationsState:$n,toInternalReservation:Mt,updateReservationApi:pi},Symbol.toStringTag,{value:"Module"})),Nn=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let gt=null;function vi(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function Zs(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function Qc(e={}){const t={...e};return t.barcode&&(t.barcode=v(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function Gc(e={}){const t=Qc({...e,activatedAt:Date.now()});return gt=t,Zs(!0,t.mode||"create"),vi(Nn.change,{active:!0,selection:{...t}}),t}function eo(e="manual"){if(!gt)return;const t=gt;gt=null,Zs(!1),vi(Nn.change,{active:!1,previous:t,reason:e})}function Wc(){return!!gt}function xu(){return gt?{...gt}:null}function Pu(e){if(!gt)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=v(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:i,groupKey:o,description:s}=e,r=Array.isArray(n)?n:[];a&&r.push(a);const l=r.map(u=>v(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!l.length)return!1;const d=Number.isInteger(i)&&i>0?i:l.length;t={barcodes:l,quantity:Math.min(d,l.length)},o&&(t.groupKey=o),s&&(t.description=s)}else return!1;return vi(Nn.requestAdd,{...t,selection:{...gt}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||eo("tab-changed")});const Jc="__DEBUG_CREW__";function Yc(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(Jc);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function Gi(e,t){if(Yc())try{console.log(`🪵 [crew-debug:create] ${e}`,t)}catch{}}const to="projects:create:draft",no="projects.html#projects-section";let Ta=null,ao=[],ja=new Map,La=new Map,Un=new Map,qa=!1,Rn=null,Wi=!1,io=[];function Xc(e){if(!e)return null;let t=io.find(a=>a.id===e)||null;if(t)return t;const n=An(e);return n?(t={id:e,name:uc(n)||e,price:dc(n),items:tn(n),raw:n},t):null}function Qn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Gn(e){return v(String(e||"")).trim().toLowerCase()}function Zc(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=v(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function so(e){const t=v(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function oo(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function ro(e){if(!e)return null;const t=v(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function co(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=v(String(t))}}function Ht(e){switch(e){case"maintenance":return c("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return c("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return c("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return c("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function Si(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function Ut(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Ge(){const{input:e,hidden:t}=Ut();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function jt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const o=document.querySelector(`label[for="${e.id}"]`);o&&n.add(o)}const i=o=>{t()&&w(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(o=>{!o||o.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>{o.addEventListener(s,i,{capture:!0})}),o.dataset.linkedGuardAttached="true")})}function lo(e,t,{allowPartial:n=!1}={}){const a=Ke(t);if(!a)return null;const i=e.get(a);if(i)return i;if(!n)return null;const o=[];return e.forEach((s,r)=>{r.includes(a)&&o.push(s)}),o.length===1?o[0]:null}function Da(e,t={}){return lo(ja,e,t)}function Ba(e,t={}){return lo(La,e,t)}function We(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function uo(e){ao=Array.isArray(e)?[...e]:[]}function _i(){return ao}function Ai(e){return e&&_i().find(t=>String(t.id)===String(e))||null}function Ji(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||c("projects.fallback.untitled","مشروع بدون اسم")}function on(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??vt,a=v(String(n).replace("%","").trim()),i=parseFloat(a);return Number.isFinite(i)?i:vt}function tt(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??vt,a=v(String(n).replace("%","").trim()),i=parseFloat(a);(!Number.isFinite(i)||i<=0)&&(i=vt),t.dataset.companyShare=String(i),t.checked=!0}function Fa(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(qa){ce();return}qa=!0;const a=()=>{qa=!1,ce()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(vt)),t.disabled){n.checked=!1,w(c("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),tt()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?tt():n.checked&&(n.checked=!1));a()}function el(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Yi(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const i=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${i}`}return""}function Xi(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function bt({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:i}=Si();if(!n||!a||!i)return;const o=si()||[],s=c("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),r=c("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",s);const l=new Set;ja=new Map;const d=o.filter(f=>f&&f.id!=null).map(f=>({id:String(f.id),label:Xi(f)||r})).filter(f=>{if(!f.label)return!1;const m=Ke(f.label);return!m||l.has(m)?!1:(l.add(m),ja.set(m,f),!0)}).sort((f,m)=>f.label.localeCompare(m.label,void 0,{sensitivity:"base"}));i.innerHTML=d.map(f=>`<option value="${Qn(f.label)}"></option>`).join("");const u=t?"":n.value,p=e?String(e):a.value?String(a.value):"",y=p?o.find(f=>String(f.id)===p):null;if(y){const f=Xi(y)||r;a.value=String(y.id),n.value=f,n.dataset.selectedId=String(y.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function rn({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:i,list:o}=Ut();if(!a||!i||!o)return;const s=Array.isArray(t)?t:_i()||[],r=c("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",r);const l=[...s].filter(h=>h&&h.id!=null).sort((h,S)=>String(S.createdAt||S.start||"").localeCompare(String(h.createdAt||h.start||""))),d=n?"":a.value,u=c("projects.fallback.untitled","مشروع بدون اسم"),p=new Set;La=new Map;const y=l.map(h=>{const S=Ji(h)||u;return{id:String(h.id),label:S}}).filter(h=>{if(!h.label)return!1;const S=Ke(h.label);return!S||p.has(S)?!1:(p.add(S),La.set(S,h),!0)});o.innerHTML=y.map(h=>`<option value="${Qn(h.label)}"></option>`).join("");const f=e?String(e):i.value?String(i.value):"",m=f?l.find(h=>String(h.id)===f):null;if(m){const h=Ji(m)||u;i.value=String(m.id),a.value=h,a.dataset.selectedId=String(m.id)}else i.value="",a.dataset.selectedId="",a.value=n?"":d}function Wn(e,t,n){const{date:a,time:i}=Ls(n),o=document.getElementById(e),s=document.getElementById(t);if(o){if(a)if(o._flatpickr){const r=o._flatpickr.config?.dateFormat||"Y-m-d";o._flatpickr.setDate(a,!1,r)}else o.value=a;else o._flatpickr?o._flatpickr.clear():o.value="";o.dispatchEvent(new Event("input",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0}))}if(s){if(i)if(s._flatpickr){const r=s._flatpickr.config?.dateFormat||"H:i";s._flatpickr.setDate(i,!1,r)}else s.value=i;else s._flatpickr?s._flatpickr.clear():s.value="";s.dispatchEvent(new Event("input",{bubbles:!0})),s.dispatchEvent(new Event("change",{bubbles:!0}))}}function po(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||rn({selectedValue:a});const o=(si()||[]).find(u=>String(u.id)===String(e.clientId)),s=o?.id!=null?String(o.id):"";bt(s?{selectedValue:s}:{selectedValue:"",resetInput:!0});const r=Yi(e,"start"),l=Yi(e,"end");r&&Wn("res-start","res-start-time",r),l&&Wn("res-end","res-end-time",l);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),ce(),xt()}function mo({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:be(),i=Array.isArray(a)?a:[];uo(i);const o=t!=null?String(t):n.value?String(n.value):"";rn({selectedValue:o,projectsList:i}),xt(),ce()}function xt(){const{input:e,hidden:t}=Ut(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),i=document.getElementById("res-payment-status"),o=document.getElementById("res-payment-progress-type"),s=document.getElementById("res-payment-progress-value"),r=document.getElementById("res-discount"),l=document.getElementById("res-discount-type"),d=c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),p=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(jt(n,Ge),a&&jt(a,Ge)),i&&jt(i,Ge),o&&jt(o,Ge),s&&jt(s,Ge),r&&jt(r,Ge),l&&jt(l,Ge),p)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=d),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=d),i&&(i.value="unpaid",We(i,"unpaid"),i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=d),o&&(o.value=o.value||"percent",o.disabled=!0,o.classList.add("reservation-input-disabled"),o.title=d),s&&(s.value="",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=d),r&&(r.value="0",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=d),l&&(l.value="percent",l.disabled=!0,l.classList.add("reservation-input-disabled"),l.title=d);else{if(n){const y=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",y&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),o&&(o.disabled=!1,o.classList.remove("reservation-input-disabled"),o.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),l&&(l.disabled=!1,l.classList.remove("reservation-input-disabled"),l.title="")}Fa("tax"),ce()}function qi(){const{input:e,hidden:t}=Ut();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const i=e.value.trim(),o=i?Ba(i,{allowPartial:a}):null;if(o){t.value=String(o.id),e.value=o.label,e.dataset.selectedId=String(o.id);const s=Ai(o.id);s?po(s,{skipProjectSelectUpdate:!0}):(xt(),ce())}else t.value="",e.dataset.selectedId="",xt(),ce()};e.addEventListener("input",()=>{const a=e.value.trim(),i=a?Ba(a):null;i?(t.value=String(i.id),e.dataset.selectedId=String(i.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Ii(){const{input:e,hidden:t}=Si();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const i=e.value.trim(),o=i?Da(i,{allowPartial:a}):null;o?(t.value=String(o.id),e.value=o.label,e.dataset.selectedId=String(o.id)):(t.value="",e.dataset.selectedId=""),ce()};e.addEventListener("input",()=>{const a=e.value.trim(),i=a?Da(a):null;i?(t.value=String(i.id),e.dataset.selectedId=String(i.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function tl(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){hn({clearValue:!0});return}let n=null;try{const d=decodeURIComponent(t);n=JSON.parse(d)}catch(d){console.warn("⚠️ [reservations/createForm] Failed to decode project context",d)}e.delete("reservationProjectContext");const a=e.toString(),i=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,i),hn({clearValue:!1}),!n)return;n.fromProjectForm&&(Rn={draftStorageKey:n.draftStorageKey||to,returnUrl:n.returnUrl||no});const o=document.getElementById("res-project");if(n.projectId){o&&(rn({selectedValue:String(n.projectId)}),xt());const d=Ai(n.projectId);d?po(d,{forceNotes:!!n.forceNotes}):ce(),hn()}else{o&&rn({selectedValue:""});const d=n.projectTitle?n.projectTitle:c("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");gl(c("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),d)}n.start&&Wn("res-start","res-start-time",n.start),n.end&&Wn("res-end","res-end-time",n.end);const s=document.getElementById("res-customer-input"),r=document.getElementById("res-customer");if(n.customerId){const u=(si()||[]).find(p=>String(p.id)===String(n.customerId));u?.id!=null&&(bt({selectedValue:String(u.id)}),r&&(r.value=String(u.id)),s&&(s.value=u.customerName||u.name||s.value))}else n.customerName&&s?(bt({selectedValue:""}),s.value=n.customerName,s.dataset.selectedId="",r&&(r.value="")):bt({selectedValue:""});const l=document.getElementById("res-notes");l&&n.description&&!l.value&&(l.value=n.description),ce()}function Qt(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:In(e,n),end:In(t,a)}}function fo(e){const t=Gn(e);if(t){const r=Un.get(t);if(r)return r}const{description:n,barcode:a}=so(e);if(a){const r=ni(a);if(r)return r}const i=Ke(n||e);if(!i)return null;let o=Ts();if(!o?.length){const r=be();o=Array.isArray(r?.equipment)?r.equipment:[],o.length&&js(o)}const s=o.find(r=>Ke(r?.desc||r?.description||"")===i);return s||o.find(r=>Ke(r?.desc||r?.description||"").includes(i))||null}function yo(e,t="equipment-description-options"){const n=Gn(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(l=>Gn(l.value)===n)||Un.has(n))return!0;const{description:i}=so(e);if(!i)return!1;const o=Ke(i);return o?(Ts()||[]).some(r=>Ke(r?.desc||r?.description||"")===o):!1}const nl={available:0,reserved:1,maintenance:2,retired:3};function al(e){return nl[e]??5}function Zi(e){switch(e){case"available":return c("reservations.equipment.status.available","متاح");case"reserved":return c("reservations.equipment.status.reserved","محجوز");case"maintenance":return c("reservations.equipment.status.maintenance","صيانة");case"retired":return c("reservations.equipment.status.retired","خارج الخدمة");default:return c("reservations.equipment.status.unknown","الحالة غير معروفة")}}function il(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(i=>i!=="available")||e.bestStatus;if(n==="available")return`${t} — ${Zi(n)}`;const a=c("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${Zi(n)})`}function Pt(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=ti(),a=be(),i=Array.isArray(n)&&n.length?n:a?.equipment||[],o=Array.isArray(i)?i:[];js(o);const s=new Map;o.forEach(d=>{const u=Zc(d),p=Gn(u);if(!p||!u)return;const y=Et(d),f=al(y),m=s.get(p);if(!m){s.set(p,{normalized:p,value:u,bestItem:d,bestStatus:y,bestPriority:f,statuses:new Set([y])});return}m.statuses.add(y),f<m.bestPriority&&(m.bestItem=d,m.bestStatus=y,m.bestPriority=f,m.value=u)}),Un=new Map;const l=Array.from(s.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{Un.set(d.normalized,d.bestItem);const u=il(d),p=Qn(d.value);if(u===d.value)return`<option value="${p}"></option>`;const y=Qn(u);return`<option value="${p}" label="${y}"></option>`}).join("");e&&(e.innerHTML=l),t&&(t.innerHTML=l)}function go(e,t,n={}){const{silent:a=!1}=n,i=Y(e);if(!i)return{success:!1,message:null};const{start:o,end:s}=Qt();if(!o||!s){const m=c("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||w(m),{success:!1,message:m}}const r=pt();if(ki(r).has(i)){const m=c("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||w(m),{success:!1,message:m}}const d=oi(i,o,s);if(d.length){const m=d.map(S=>S.name).join(", "),h=c("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`);return a||w(h),{success:!1,message:h}}if(St(i,o,s)){const m=c("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||w(m),{success:!1,message:m}}const u=ni(i);if(!u){const m=c("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||w(m),{success:!1,message:m}}const p=Et(u);if(p==="maintenance"||p==="retired"){const m=Ht(p);return a||w(m),{success:!1,message:m}}const y=Vt(u);if(!y){const m=c("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||w(m),{success:!1,message:m}}ca({id:y,equipmentId:y,barcode:i,desc:u.desc,qty:1,price:u.price,image:Ot(u)}),t&&(t.value=""),_t(),ce();const f=c("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||w(f),{success:!0,message:f,barcode:i}}function Ra(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=fo(t);if(!n){w(c("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=ac(n.barcode),i=Et(a||n);if(i==="maintenance"||i==="retired"){w(Ht(i));return}const o=Y(n.barcode);if(!o){w(c("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const s=Vt(n);if(!s){w(c("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const r={id:s,equipmentId:s,barcode:o,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Ot(n)},{start:l,end:d}=Qt();if(!l||!d){w(c("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=pt();if(ki(u).has(o)){w(c("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const y=oi(o,l,d);if(y.length){const f=y.map(m=>m.name).join(", ");w(c("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${f}`));return}if(St(o,l,d)){w(c("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}ca(r),_t(),ce(),w(c("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function sl(){Pt();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Ra(e))});const t=()=>{yo(e.value,"equipment-description-options")&&Ra(e)};e.addEventListener("focus",()=>{if(Pt(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function es(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function ki(e=pt()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=Y(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(i=>{const o=Y(i?.normalizedBarcode??i?.barcode);o&&t.add(o)})}),t}function ol(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=Qt();if(!t||!n){w(c("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}Gc({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):w(c("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(Nn.change,t=>{es(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),es(e,Wc()))}function rl(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],i=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,o=a.length?a:t.barcode?[t.barcode]:[];if(!o.length)return;let s=0,r=null;const l=[],d=new Set;o.forEach(p=>{const y=Y(p);y&&!d.has(y)&&(d.add(y),l.push(y))});const u=Math.min(i,l.length);for(let p=0;p<u;p+=1){const y=l[p],f=go(y,null,{silent:!0});f.success&&(s+=1),f.message&&(r=f.message)}if(s>0){const y=c("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",v(String(s)));w(y)}else r&&w(r)}function bo(){ol(),!(Wi||typeof document>"u")&&(document.addEventListener(Nn.requestAdd,rl),Wi=!0)}function Cn(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),i=document.getElementById("reservation-package-hint"),o=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:i,packageAddButton:o}}function Ma(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:i}=Cn();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const o=document.getElementById("equipment-barcode"),s=document.getElementById("equipment-description"),r=t==="package";o&&(o.disabled=r),s&&(s.disabled=r),i&&(i.disabled=t!=="package"||i.options.length===0),qc(t),t==="package"&&da()}function da(){const{packageSelect:e,packageHint:t}=Cn();if(!e)return;const n=vs();io=n,n.map(r=>r.raw??r);const a=c("reservations.create.summary.currency","SR"),i=`<option value="" disabled selected>${c("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,o=n.map(r=>{const l=Number.isFinite(Number(r.price))?Number(r.price):0,d=v(l.toFixed(2)),u=`${r.name} — ${d} ${a}`;return`<option value="${r.id}">${u}</option>`}).join("");e.innerHTML=`${i}${o}`,e.selectedIndex=0;const s=n.length>0;e.disabled=!s,t&&(s?(t.textContent=c("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=c("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),So()}function cl(e,t){const n=e?.name||c("reservations.create.packages.genericName","الحزمة"),a=c("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),i=t.map(({item:o,blockingPackages:s})=>{const r=o?.desc||v(String(o?.barcode??o?.normalizedBarcode??""))||c("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(s)&&s.length){const l=s.map(d=>d.name).join(", ");return`• ${r} (${c("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${l})`}return`• ${r} (${c("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...i].join(`
`)}function ho(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:i=null}={}){const o=Ye(e);if(!o)return{success:!1,reason:"invalid",message:c("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const s=Xc(o);if(!s)return{success:!1,reason:"not_found",message:c("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:c("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(f=>f?.type==="package"&&Ye(f.packageId)===o))return{success:!1,reason:"duplicate",message:c("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(Ds(o,n,a,i)){const f=s.name||o;return{success:!1,reason:"package_conflict",message:c("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${f} محجوزة بالفعل في الفترة المختارة`)}}const r=Array.isArray(s.items)&&s.items.length?s.items:tn(s.raw??{}),l=ki(t),d=[],u=new Set;if(r.forEach(f=>{const m=Y(f?.normalizedBarcode??f?.barcode);if(m){if(u.has(m)){d.push({item:f,type:"internal"});return}u.add(m),l.has(m)&&d.push({item:f,type:"external"})}}),d.length){const f=d.map(({item:h})=>h?.desc||h?.description||h?.name||h?.barcode||h?.normalizedBarcode||c("equipment.packages.items.unknown","معدة بدون اسم")).map(h=>v(String(h))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:d.some(h=>h.type==="external")?c("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",f):c("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",f),duplicates:d}}const p=[];return r.forEach(f=>{const m=Y(f?.normalizedBarcode??f?.barcode);if(m&&St(m,n,a,i)){const h=oi(m,n,a,i);p.push({item:f,blockingPackages:h})}}),p.length?{success:!1,reason:"item_conflict",message:cl(s,p),conflicts:p}:{success:!0,package:{id:`package::${o}`,packageId:o,type:"package",desc:s.name||`Package ${o}`,qty:1,price:Number.isFinite(Number(s.price))?Number(s.price):0,barcode:s.code||s.raw?.package_code||`pkg-${o}`,packageItems:r.map(f=>({equipmentId:f?.equipmentId??null,barcode:f?.barcode??f?.normalizedBarcode??"",normalizedBarcode:Y(f?.normalizedBarcode??f?.barcode),desc:f?.desc??"",qty:Number.isFinite(Number(f?.qty))?Number(f.qty):1,price:Number.isFinite(Number(f?.price))?Number(f.price):0})),image:r.find(f=>f?.image)?.image??null},packageInfo:s}}function vo(e,{silent:t=!1}={}){const n=Ye(e);if(!n)return t||w(c("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:i}=Qt(),o=pt(),s=ho(n,{existingItems:o,start:a,end:i});if(!s.success){if(!t){const l={invalid:c("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:c("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:c("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:c("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[s.reason]||c("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");w(s.message||l)}return s}return ca(s.package),_t(),ce(),t||w(c("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:s.package}}function So(){const{packageSelect:e}=Cn();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;vo(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function ll(){const{packageAddButton:e,packageSelect:t}=Cn();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){w(c("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}vo(n)}),e.dataset.listenerAttached="true")}function _o(){const{modeRadios:e}=Cn();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",i=>{i.target.checked&&Ma(i.target.value)}),a.dataset.listenerAttached="true")}),ll(),So();const t=Vn(),n=e.find(a=>a.value===t);n&&(n.checked=!0),Ma(t)}function _t(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=pt(),a=c("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),i=c("reservations.create.summary.currency","SR"),o=c("reservations.create.equipment.imageAlt","صورة"),s=c("reservations.equipment.actions.increase","زيادة الكمية"),r=c("reservations.equipment.actions.decrease","تقليل الكمية"),l=c("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=dn(n);t.innerHTML=d.map(u=>{const p=u.items[0]||{},y=Ot(p)||u.image,f=y?`<img src="${y}" alt="${o}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=v(String(u.count)),h=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,S=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):h*u.count,k=`${v(h.toFixed(2))} ${i}`,_=`${v(S.toFixed(2))} ${i}`,I=u.items.some(E=>E?.type==="package"),D=u.barcodes.map(E=>v(String(E||""))).filter(Boolean),O=D.length?`<details class="reservation-item-barcodes">
            <summary>${c("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${D.map(E=>`<li>${E}</li>`).join("")}
            </ul>
          </details>`:"";let A="";if(I){const E=new Map;if(u.items.forEach(N=>{Array.isArray(N?.packageItems)&&N.packageItems.forEach(x=>{if(!x)return;const z=Y(x.barcode||x.desc||Math.random()),b=E.get(z);if(b){b.qty+=Number.isFinite(Number(x.qty))?Number(x.qty):1;return}E.set(z,{desc:x.desc||x.barcode||c("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(x.qty))?Number(x.qty):1,barcode:x.barcode??x.normalizedBarcode??""})})}),E.size){const N=Array.from(E.values()).map(x=>{const z=v(String(x.qty)),b=x.desc||v(String(x.barcode||"")),j=x.barcode?` <span class="reservation-package-items__barcode">(${v(String(x.barcode))})</span>`:"";return`<li>${b}${j} × ${z}</li>`}).join("");A=`
            <details class="reservation-package-items">
              <summary>${c("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${N}
              </ul>
            </details>
          `}}return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${I?`${A||""}${O||""}`:O}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${r}" ${I?"disabled":""}>−</button>
              <span class="reservation-qty-value">${m}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${s}" ${I?"disabled":""}>+</button>
            </div>
          </td>
          <td>${k}</td>
          <td>${_}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${l}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function dl(e){const t=pt(),a=dn(t).find(o=>o.key===e);if(!a)return;const i=a.itemIndices[a.itemIndices.length-1];i!=null&&(_c(i),_t(),ce())}function ul(e){const t=pt(),n=t.filter(a=>oa(a)!==e);n.length!==t.length&&(Cs(n),_t(),ce())}function pl(e){const t=pt(),a=dn(t).find(p=>p.key===e);if(!a)return;const{start:i,end:o}=Qt();if(!i||!o){w(c("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const s=new Set(t.map(p=>Y(p.barcode))),{equipment:r=[]}=be(),l=(r||[]).find(p=>{const y=Y(p?.barcode);return!y||s.has(y)||oa({desc:p?.desc||p?.description||p?.name||"",price:Number(p?.price)||0})!==e||!gs(p)?!1:!St(y,i,o)});if(!l){w(c("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=Y(l.barcode),u=Vt(l);if(!u){w(c("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}ca({id:u,equipmentId:u,barcode:d,desc:l.desc||l.description||l.name||a.description||"",qty:1,price:Number.isFinite(Number(l.price))?Number(l.price):a.unitPrice,image:Ot(l)}),_t(),ce()}function ce(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(v(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",i=e?"percent":a,o=document.getElementById("res-tax"),s=e?!1:o?.checked||!1,r=document.getElementById("res-payment-status"),l=r?.value||"unpaid",{start:d,end:u}=Qt();s&&tt();const p=on(),y=document.getElementById("res-payment-progress-type"),f=document.getElementById("res-payment-progress-value"),m=oo(y),h=ro(f);Ss(),Ui({selectedItems:pt(),discount:n,discountType:i,applyTax:s,paidStatus:l,paymentProgressType:m,paymentProgressValue:h,start:d,end:u,companySharePercent:p,paymentHistory:[]});const S=Ui.lastResult;S?(co(f,S.paymentProgressValue),r&&(r.value=S.paymentStatus,We(r,S.paymentStatus))):We(r,l)}function ml(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",r=>{r.target.value=v(r.target.value),ce()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",ce),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(Ge()){n.checked=!1,w(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Fa("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(Ge()){a.checked=!1,w(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Fa("share")}),a.dataset.listenerAttached="true");const i=document.getElementById("res-payment-status");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>{if(Ge()){i.value="unpaid",We(i,"unpaid"),w(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}We(i),ce()}),i.dataset.listenerAttached="true");const o=document.getElementById("res-payment-progress-type");o&&!o.dataset.listenerAttached?(o.dataset.userSelected!=="true"&&(o.value="percent"),o.addEventListener("change",r=>{if(Ge()){o.value="percent",w(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}o.dataset.userSelected="true",ce()}),o.dataset.listenerAttached="true"):o&&o.dataset.userSelected!=="true"&&!o.value&&(o.value="percent");const s=document.getElementById("res-payment-progress-value");s&&!s.dataset.listenerAttached&&(s.addEventListener("input",r=>{if(Ge()){s.value="",w(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.target.value=v(r.target.value),ce()}),s.dataset.listenerAttached="true"),ce()}function fl(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const i=e.value?.trim();if(!i){ce();return}const o=t.dataset.syncedWithStart;(!t.value?.trim()||o!=="false")&&(n=!0,t.value=i,t.dataset.syncedWithStart="true",t.dataset.syncedValue=i,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),ce()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function ts(){const{input:e,hidden:t}=Si(),{input:n,hidden:a}=Ut(),{customers:i}=be();let o=t?.value?String(t.value):"";if(!o&&e?.value){const K=Da(e.value,{allowPartial:!0});K&&(o=String(K.id),t&&(t.value=o),e.value=K.label,e.dataset.selectedId=o)}const s=i.find(K=>String(K.id)===o);if(!s){w(c("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const r=s.id;let l=a?.value?String(a.value):"";if(!l&&n?.value){const K=Ba(n.value,{allowPartial:!0});K&&(l=String(K.id),a&&(a.value=l),n.value=K.label,n.dataset.selectedId=l)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,p=document.getElementById("res-start-time")?.value||"00:00",y=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){w(c("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const f=`${d}T${p}`,m=`${u}T${y}`,h=new Date(f),S=new Date(m);if(Number.isNaN(h.getTime())||Number.isNaN(S.getTime())||h>=S){w(c("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const k=Ss();k.map(K=>K.technicianId).filter(Boolean);const _=pt();if(_.length===0&&k.length===0){w(c("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const I=document.getElementById("res-notes")?.value||"",D=parseFloat(v(document.getElementById("res-discount")?.value))||0,O=document.getElementById("res-discount-type")?.value||"percent",A=document.getElementById("res-payment-status"),E=A?.value||"unpaid",N=document.getElementById("res-payment-progress-type"),x=document.getElementById("res-payment-progress-value"),z=oo(N),b=ro(x),j=l?Ai(l):null,V=el(j);if(l&&!j){w(c("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const K of _){const le=Et(K.barcode);if(le==="maintenance"||le==="retired"){w(Ht(le));return}}for(const K of _){const le=Y(K.barcode);if(St(le,f,m)){w(c("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const K of k)if(K?.technicianId&&Fs(K.technicianId,f,m)){w(c("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const $=document.getElementById("res-tax"),L=document.getElementById("res-company-share"),P=!!l;P?($&&($.checked=!1,$.disabled=!0,$.classList.add("disabled"),$.title=c("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),L&&(L.checked=!1,L.disabled=!0,L.classList.add("disabled"),L.title=c("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),A&&(A.value="unpaid",A.disabled=!0,We(A,"unpaid"),A.title=c("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),N&&(N.disabled=!0,N.classList.add("disabled")),x&&(x.value="",x.disabled=!0,x.classList.add("disabled"))):($&&($.disabled=!1,$.classList.remove("disabled"),$.title=""),L&&(L.disabled=!1,L.classList.remove("disabled"),L.title=""),A&&(A.disabled=!1,A.title=""),N&&(N.disabled=!1,N.classList.remove("disabled")),x&&(x.disabled=!1,x.classList.remove("disabled")));const R=P?!1:$?.checked||!1,G=!!L?.checked;if(!P&&G!==R){w(c("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let B=G?on():null;G&&(!Number.isFinite(B)||B<=0)&&(tt(),B=on());const F=G&&R&&Number.isFinite(B)&&B>0;R&&tt();const J=ai(_,D,O,R,k,{start:f,end:m,companySharePercent:F?B:0}),X=ic(),ee=ia({totalAmount:J,progressType:z,progressValue:b,history:[]});x&&co(x,ee.paymentProgressValue);const de=[];ee.paymentProgressValue!=null&&ee.paymentProgressValue>0&&de.push({type:ee.paymentProgressType||z,value:ee.paymentProgressValue,amount:ee.paidAmount,percentage:ee.paidPercent,recordedAt:new Date().toISOString()});const ae=sa({manualStatus:E,paidAmount:ee.paidAmount,paidPercent:ee.paidPercent,totalAmount:J});A&&(A.value=ae,We(A,ae));const fe=mi({reservationCode:X,customerId:r,start:f,end:m,status:V?"confirmed":"pending",title:null,location:null,notes:I,projectId:l||null,totalAmount:J,discount:P?0:D,discountType:P?"percent":O,applyTax:R,paidStatus:P?"unpaid":ae,confirmed:V,items:_.map(K=>({...K,equipmentId:K.equipmentId??K.id})),crewAssignments:k,companySharePercent:P||!F?null:B,companyShareEnabled:P?!1:F,paidAmount:P?0:ee.paidAmount,paidPercentage:P?0:ee.paidPercent,paymentProgressType:P?null:ee.paymentProgressType,paymentProgressValue:P?null:ee.paymentProgressValue,paymentHistory:P?[]:de});try{Gi("about to submit",{crewAssignments:k,techniciansPayload:fe?.technicians,payload:fe});const K=await Ks(fe);Gi("server response",{reservation:K?.id??K?.reservationId??K?.reservation_code,technicians:K?.technicians,crewAssignments:K?.crewAssignments,techniciansDetails:K?.techniciansDetails}),ti(),Pt(),qn(),bl(),w(c("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Ta=="function"&&Ta({type:"created",reservation:K}),yl(K)}catch(K){console.error("❌ [reservations/createForm] Failed to create reservation",K);const le=hi(K)?K.message:c("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");w(le,"error"),P&&(w(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),hn({clearValue:!1}))}}function yl(e){if(!Rn)return;const{draftStorageKey:t=to,returnUrl:n=no}=Rn,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const i=window.sessionStorage.getItem(t),o=i?JSON.parse(i)||{}:{},s=Array.isArray(o.linkedReservationIds)?o.linkedReservationIds:[],r=String(a);s.includes(r)||s.push(r),o.linkedReservationIds=s,window.sessionStorage.setItem(t,JSON.stringify(o))}catch(i){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",i)}Rn=null,n&&(window.location.href=n)}function hn({clearValue:e=!1}={}){const{input:t,hidden:n}=Ut();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,xt())}function gl(e,t=""){const{input:n,hidden:a}=Ut();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),xt())}function bl(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),bt({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),hn({clearValue:!1}),rn({selectedValue:"",resetInput:!0});const i=document.getElementById("equipment-description");i&&(i.value="");const o=document.getElementById("res-payment-status");o&&(o.value="unpaid",We(o,"unpaid"));const s=document.getElementById("res-payment-progress-type");s&&(s.value="percent");const r=document.getElementById("res-payment-progress-value");r&&(r.value=""),pc(),Cs([]),eo("form-reset"),_t(),xt(),ce()}function hl(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:i}=n.dataset;if(a==="decrease-group"&&i){dl(i);return}if(a==="increase-group"&&i){pl(i);return}if(a==="remove-group"&&i){ul(i);return}}),e.dataset.listenerAttached="true")}function vl(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(Vn()!=="single")return;const i=e.value;i?.trim()&&(clearTimeout(t),t=null,go(i,e))};e.addEventListener("keydown",i=>{i.key==="Enter"&&(i.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||Vn()!=="single")return;const{start:o,end:s}=Qt();!o||!s||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function Sl(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await ts()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await ts()}),t.dataset.listenerAttached="true")}function Ao({onAfterSubmit:e}={}){Ta=typeof e=="function"?e:null;const{customers:t,projects:n}=be();Ac(t||[]),bt(),Ii(),uo(n||[]),mo({projectsList:n}),qi(),Pt(),da(),sl(),bo(),_o(),fl(),ml(),hl(),vl(),Sl(),tl(),ce(),_t()}function wi(){Pt(),da(),mo(),bt(),Ii(),qi(),bo(),_o(),_t(),ce()}if(typeof document<"u"){const e=()=>{bt(),rn({projectsList:_i()}),Ii(),qi(),ce()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{Pt()}),document.addEventListener("packages:changed",()=>{da(),Vn()==="package"&&Ma("package")})}typeof window<"u"&&(window.getCompanySharePercent=on);function qo(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:Lt(t),endDate:Lt(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),i=a===0?6:a-1;n.setDate(n.getDate()-i);const o=new Date(n);return o.setDate(n.getDate()+6),{startDate:Lt(n),endDate:Lt(o)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Lt(n),endDate:Lt(a)}}return e==="upcoming"?{startDate:Lt(t),endDate:""}:{startDate:"",endDate:""}}function _l(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),i=document.getElementById("reservation-status-filter");let o=v(t?.value||"").trim(),s=v(n?.value||"").trim(),r=a?.value||"";if(new Set(["","today","week","month"]).has(r)||(r="",a&&(a.value=""),Jn(t),Jn(n),o="",s=""),!o&&!s&&r){const d=qo(r);o=d.startDate,s=d.endDate}return{searchTerm:Ke(e?.value||""),startDate:o,endDate:s,status:i?.value||"",quickRange:r}}function Al(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=v(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),a.dataset.listenerAttached="true");const i=document.getElementById("filter-end-date");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),i.dataset.listenerAttached="true");const o=document.getElementById("reservation-date-range");o&&!o.dataset.listenerAttached&&(o.addEventListener("change",()=>{ql(o.value),t()}),o.dataset.listenerAttached="true");const s=document.getElementById("reservation-status-filter");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",t),s.dataset.listenerAttached="true");const r=document.getElementById("clear-filters");r&&!r.dataset.listenerAttached&&(r.addEventListener("click",()=>{n&&(n.value=""),Jn(a),Jn(i),o&&(o.value=""),s&&(s.value=""),t()}),r.dataset.listenerAttached="true")}function ql(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:i}=qo(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?i?n._flatpickr.setDate(i,!1,"Y-m-d"):n._flatpickr.clear():n.value=i}function Lt(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function Jn(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function Fn(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function Il(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],i=Number.parseInt(a,10);return Number.isFinite(i)?i:null}function kl(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=Il(n);if(a!==null)return a}return null}function ns(e,t=0){const n=kl(e);if(n!=null)return n;const a=Fn(e.createdAt??e.created_at);if(a!=null)return a;const i=Fn(e.updatedAt??e.updated_at);if(i!=null)return i;const o=Fn(e.start);if(o!=null)return o;const s=Fn(e.end);if(s!=null)return s;const r=Number(e.id??e.reservationId);return Number.isFinite(r)?r:Number.isFinite(t)?t:0}function wl({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:i}){const o=e.map((_,I)=>({reservation:_,index:I})),s=t.searchTerm||"",r=t.searchReservationId||"",l=t.searchCustomerName||"",d=t.searchProjectId||"",u=t.startDate||"",p=t.endDate||"",y=t.status||"",f=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,m=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,h=u?new Date(`${u}T00:00:00`):null,S=p?new Date(`${p}T23:59:59`):null,k=o.filter(({reservation:_})=>{const I=n.get(String(_.customerId)),D=i?.get?.(String(_.projectId)),O=_.start?new Date(_.start):null,A=ii(_),{effectiveConfirmed:E}=Kt(_,D);if(f!=null&&String(_.customerId)!==String(f)||m!=null&&!(Array.isArray(_.technicians)?_.technicians.map(j=>String(j)):[]).includes(String(m))||y==="confirmed"&&!E||y==="pending"&&E||y==="completed"&&!A||h&&O&&O<h||S&&O&&O>S)return!1;if(r){const b=[_.reservationId,_.id,_.reservation_id,_.reservationCode,_.reservation_code,_.code,_.reference,_.referenceNumber,_.reference_number],j=Ke(b.filter($=>$!=null&&$!=="").map(String).join(" ")).replace(/\s+/g,""),V=r.replace(/\s+/g,"");if(!j.includes(V))return!1}if(l&&!Ke(I?.customerName||"").includes(l))return!1;if(d){const b=[_.projectId,_.project_id,_.projectID,D?.id,D?.projectCode,D?.project_code],j=Ke(b.filter($=>$!=null&&$!=="").map(String).join(" ")).replace(/\s+/g,""),V=d.replace(/\s+/g,"");if(!j.includes(V))return!1}if(!s)return!0;const N=_.items?.map?.(b=>`${b.barcode} ${b.desc}`).join(" ")||"",x=(_.technicians||[]).map(b=>a.get(String(b))?.name).filter(Boolean).join(" ");return Ke([_.reservationId,I?.customerName,_.notes,N,x,D?.title].filter(Boolean).join(" ")).includes(s)});return k.sort((_,I)=>{const D=ns(_.reservation,_.index),O=ns(I.reservation,I.index);return D!==O?O-D:I.index-_.index}),k}function El({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const i=c("reservations.create.summary.currency","SR"),o=c("reservations.list.taxIncludedShort","(شامل الضريبة)"),s=c("reservations.list.unknownCustomer","غير معروف"),r=c("reservations.list.noNotes","لا توجد ملاحظات"),l=c("reservations.list.itemsCountShort","{count} عنصر"),d=c("reservations.list.crew.separator","، "),u=c("reservations.list.status.confirmed","✅ مؤكد"),p=c("reservations.list.status.pending","⏳ غير مؤكد"),y=c("reservations.list.payment.paid","💳 مدفوع"),f=c("reservations.list.payment.unpaid","💳 غير مدفوع"),m=c("reservations.list.payment.partial","💳 مدفوع جزئياً"),h=c("reservations.list.actions.confirm","✔️ تأكيد"),S=c("reservations.list.project.unlinked","غير مرتبط بمشروع"),k=c("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),_={client:c("reservations.list.labels.client","👤 العميل"),project:c("reservations.list.labels.project","📁 المشروع"),start:c("reservations.list.labels.start","🗓️ بداية الحجز"),end:c("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:c("reservations.list.labels.cost","💵 التكلفة"),equipment:c("reservations.list.labels.equipment","📦 المعدات"),crew:c("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:I,index:D})=>{const O=t.get(String(I.customerId)),A=I.projectId?a?.get?.(String(I.projectId)):null,E=ii(I),N=I.paidStatus??I.paid_status??(I.paid===!0||I.paid==="paid"?"paid":"unpaid"),x=N==="paid",z=N==="partial",{effectiveConfirmed:b,projectLinked:j}=Kt(I,A),V=b?"status-confirmed":"status-pending",$=x?"status-paid":z?"status-partial":"status-unpaid";let L=`<span class="reservation-chip status-chip ${V}">${b?u:p}</span>`;const P=x?y:z?m:f;let R=`<span class="reservation-chip status-chip ${$}">${P}</span>`,G=x?" tile-paid":z?" tile-partial":" tile-unpaid";E&&(G+=" tile-completed");let B="";E&&(L=`<span class="reservation-chip status-chip status-completed">${u}</span>`,R=`<span class="reservation-chip status-chip status-completed">${P}</span>`,B=` data-completed-label="${c("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const F=!j&&!b?`<button class="tile-confirm" data-reservation-index="${D}" data-action="confirm">${h}</button>`:"",J=F?`<div class="tile-actions">${F}</div>`:"",X=I.items?.length||0,ee=Array.isArray(I.crewAssignments)?I.crewAssignments:[],de=(I.technicians||[]).map(ne=>n.get(String(ne))).filter(Boolean),ae=ee.length?ee.map(ne=>{const U=ne.positionLabel??ne.position_name??ne.role??c("reservations.crew.positionFallback","منصب بدون اسم"),he=ne.technicianName??n.get(String(ne.technicianId??""))?.name??null;return he?`${v(U)} (${v(he)})`:v(U)}):de.map(ne=>ne.name),fe=ae.length?ae.join(d):"—",K=v(String(I.reservationId??"")),le=I.start?v(Je(I.start)):"-",Te=I.end?v(Je(I.end)):"-",xe=v(String(I.cost??0)),De=v(String(X)),Q=I.notes?v(I.notes):r,te=l.replace("{count}",De),ue=I.applyTax?`<small>${o}</small>`:"";let Pe=S;return I.projectId&&(Pe=A?.title?v(A.title):k),`
      <div class="${F?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${G}"${B} data-reservation-index="${D}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${K}</div>
          <div class="tile-badges">
            ${L}
            ${R}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${_.client}</span>
            <span class="tile-value">${O?.customerName||s}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${_.project}</span>
            <span class="tile-value">${Pe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${_.start}</span>
            <span class="tile-value tile-inline">${le}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${_.end}</span>
            <span class="tile-value tile-inline">${Te}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${_.cost}</span>
            <span class="tile-value">${xe} ${i} ${ue}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${_.equipment}</span>
            <span class="tile-value">${te}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${_.crew}</span>
            <span class="tile-value">${ae.length?fe:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${Q}</span>
          </div>
        </div>
        ${J}
      </div>
    `}).join("")}function Ve(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ia(e){if(e==null)return"";const t=String(e).trim();return t?v(t):""}function as(e,t,n=[],a,i=null){const{projectLinked:o,effectiveConfirmed:s}=Kt(e,i),r=e.paid===!0||e.paid==="paid",l=ii(e),d=e.items||[],{groups:u}=_s(e),{technicians:p=[]}=be(),y=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(p)?p:[]),f=new Map;y.forEach(g=>{if(!g||g.id==null)return;const H=String(g.id),oe=f.get(H)||{};f.set(H,{...oe,...g})});const h=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(g=>({technicianId:g}))).map((g,H)=>{const oe=g?.technicianId!=null?f.get(String(g.technicianId)):null;let Se=g.positionLabel??g.position_name??g.position_label??g.role??g.position??"";(!Se||Se.trim()==="")&&(Se=g.positionLabelAr??g.position_label_ar??g.positionLabelEn??g.position_label_en??g.position_name_ar??g.position_name_en??"");const Ie=g.positionLabelAlt??g.position_label_alt??g.positionLabelEn??g.position_label_en??g.positionLabelAr??g.position_label_ar??"";let je=Se,Fe=Ie;if(!je||je.trim()==="")try{const Oe=kt?kt():[];let Z=null;if(g.positionId!=null&&(Z=Oe.find(ke=>String(ke.id)===String(g.positionId))||null),!Z){const ke=g.positionKey??g.position_key??g.positionName??g.position_name??g.position??"";if(ke&&(Z=typeof On=="function"?On(ke):null,!Z&&Oe.length)){const Xe=String(ke).trim().toLowerCase();Z=Oe.find(Ze=>[Ze.name,Ze.labelAr,Ze.labelEn].filter(Boolean).map(It=>String(It).toLowerCase()).includes(Xe))||null}}Z&&(je=Z.labelAr||Z.labelEn||Z.name||"",(!Fe||String(Fe).trim()==="")&&(Z.labelAr&&Z.labelEn?Fe=je===Z.labelAr?Z.labelEn:Z.labelAr:Fe=Z.labelAr||Z.labelEn||""))}catch{}const Ne=_e(qe(g.positionCost??g.position_cost??g.cost??g.daily_wage??g.dailyWage??oe?.dailyWage??oe?.wage??0)),Xt=_e(qe(g.positionClientPrice??g.position_client_price??g.client_price??g.clientPrice??g.daily_total??g.dailyTotal??g.total??oe?.dailyTotal??oe?.total??oe?.total_wage??0));return{assignmentId:g.assignmentId??g.assignment_id??`crew-${H}`,positionId:g.positionId??g.position_id??null,positionKey:g.positionKey??g.position_key??g.positionName??g.position_name??g.position??null,positionLabel:je,positionLabelAlt:Fe,positionLabelAr:g.positionLabelAr??g.position_label_ar??null,positionLabelEn:g.positionLabelEn??g.position_label_en??null,positionCost:Ne,positionClientPrice:Xt,technicianId:g.technicianId!=null?String(g.technicianId):oe?.id!=null?String(oe.id):null,technicianName:g.technicianName??g.technician_name??oe?.name??null,technicianRole:g.technicianRole??oe?.role??null,technicianPhone:g.technicianPhone??oe?.phone??null,notes:g.notes??null}}),S=bs(),k=ra(e.start,e.end),_=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,I=qe(_),D=Number.isFinite(I)?I:0,O=e.discountType??e.discount_type??e.discountMode??"percent",A=String(O).toLowerCase()==="amount"?"amount":"percent",E=o?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),N=qe(e.cost??e.total??e.finalTotal),x=Number.isFinite(N),z=x?_e(N):0,b=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,j=b!=null?qe(b):Number.NaN;let L=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(j)&&j>0)&&Number.isFinite(j)?j:0;E&&L<=0&&(L=vt);const P=xn({items:d,technicianIds:e.technicians||[],crewAssignments:h,discount:D,discountType:A,applyTax:E,start:e.start,end:e.end,companySharePercent:L}),R=_e(P.equipmentTotal),G=_e(P.crewTotal);_e(P.crewCostTotal);const B=_e(P.discountAmount),F=_e(P.subtotalAfterDiscount),J=Number.isFinite(P.companySharePercent)?P.companySharePercent:0;let X=_e(P.companyShareAmount);X=J>0?_e(Math.max(0,X)):0;const ee=_e(P.taxAmount),de=_e(P.finalTotal),ae=o?de:x?z:de,fe=_e(P.netProfit),K=v(String(e.reservationId??e.id??"")),le=e.start?v(Je(e.start)):"-",Te=e.end?v(Je(e.end)):"-",xe=v(String(h.length)),De=v(R.toFixed(2)),Q=v(B.toFixed(2)),te=v(F.toFixed(2)),ue=v(ee.toFixed(2)),Pe=v((Number.isFinite(ae)?ae:0).toFixed(2)),ze=v(String(k)),ne=c("reservations.create.summary.currency","SR"),U=c("reservations.details.labels.discount","الخصم"),he=c("reservations.details.labels.tax","الضريبة (15%)"),C=c("reservations.details.labels.crewTotal","إجمالي الفريق"),ie=c("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),ge=c("reservations.details.labels.duration","عدد الأيام"),ve=c("reservations.details.labels.companyShare","🏦 نسبة الشركة"),pe=c("reservations.details.labels.netProfit","💵 صافي الربح"),Qe=c("reservations.create.equipment.imageAlt","صورة"),$e={item:c("reservations.equipment.table.item","المعدة"),quantity:c("reservations.equipment.table.quantity","الكمية"),unitPrice:c("reservations.equipment.table.unitPrice","سعر الوحدة"),total:c("reservations.equipment.table.total","الإجمالي"),actions:c("reservations.equipment.table.actions","الإجراءات")},He=c("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),nt=c("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");c("reservations.details.technicians.roleUnknown","غير محدد");const At=c("reservations.details.technicians.phoneUnknown","غير متوفر");c("reservations.details.technicians.wage","{amount} {currency} / اليوم");const pn=c("reservations.list.status.confirmed","✅ مؤكد"),Wt=c("reservations.list.status.pending","⏳ غير مؤكد"),ba=c("reservations.list.payment.paid","💳 مدفوع"),M=c("reservations.list.payment.unpaid","💳 غير مدفوع"),Ee=c("reservations.list.payment.partial","💳 مدفوع جزئياً"),at=c("reservations.list.status.completed","📁 منتهي"),mt=c("reservations.details.labels.id","🆔 رقم الحجز"),jn=c("reservations.details.section.bookingInfo","بيانات الحجز"),Ln=c("reservations.details.section.paymentSummary","ملخص الدفع"),ha=c("reservations.details.labels.finalTotal","المجموع النهائي"),Dn=c("reservations.details.section.crew","😎 الفريق الفني"),va=c("reservations.details.crew.count","{count} عضو"),Jt=c("reservations.details.section.items","📦 المعدات المرتبطة"),Yt=c("reservations.details.items.count","{count} عنصر"),gr=c("reservations.details.actions.edit","✏️ تعديل"),br=c("reservations.details.actions.delete","🗑️ حذف"),hr=c("reservations.details.labels.customer","العميل"),vr=c("reservations.details.labels.contact","رقم التواصل"),Sr=c("reservations.details.labels.project","📁 المشروع المرتبط");c("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const _r=c("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Ar=c("reservations.details.actions.openProject","📁 فتح المشروع"),qr=c("reservations.details.labels.start","بداية الحجز"),Ir=c("reservations.details.labels.end","نهاية الحجز"),kr=c("reservations.details.labels.notes","ملاحظات"),wr=c("reservations.list.noNotes","لا توجد ملاحظات"),Er=c("reservations.details.labels.itemsCount","عدد المعدات"),xr=c("reservations.details.labels.itemsTotal","إجمالي المعدات"),Pr=c("reservations.paymentHistory.title","سجل الدفعات"),$r=c("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Nr=c("reservations.list.unknownCustomer","غير معروف"),Sa=e.paidStatus??e.paid_status??(r?"paid":"unpaid"),zi=Sa==="partial",Cr=Sa==="paid"?ba:zi?Ee:M;function _a(g){if(g==null)return Number.NaN;if(typeof g=="number")return Number.isFinite(g)?g:Number.NaN;const H=String(g).replace(/[^0-9.+-]/g,""),oe=Number(H);return Number.isFinite(oe)?oe:Number.NaN}const Bn=(g={})=>{const H=String(g.type??g.kind??g.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(H)||Array.isArray(g.packageItems)&&g.packageItems.length)},Tr=(g={})=>[g.packageId,g.package_id,g.packageCode,g.package_code,g.bundleId,g.bundle_id].some(H=>H!=null&&H!==""),jr=(g={})=>!g||typeof g!="object"?!1:!Bn(g)&&Tr(g),Hi=(g={})=>{const H=Bn(g),oe=[{value:g.qty,key:"qty",limit:999},{value:g.quantity,key:"quantity",limit:999},{value:g.units,key:"units",limit:999},{value:g.count,key:"count",limit:50},{value:g.package_quantity,key:"package_quantity",limit:999},{value:g.packageQty,key:"packageQty",limit:999},{value:g.packageCount,key:"packageCount",limit:999}];let Se=NaN;for(const Ie of oe){if(Ie.value==null||Ie.value==="")continue;const je=typeof Ie.value=="string"?Ie.value.trim():String(Ie.value??"");if(Ie.key==="count"&&je.length>6)continue;const Fe=_a(Ie.value);if(!Number.isFinite(Fe)||Fe<=0)continue;const Ne=Math.round(Fe);if(!(Ne>Ie.limit)){Se=Math.max(1,Ne);break}}return(!Number.isFinite(Se)||Se<=0)&&(Se=1),H?Math.max(1,Math.min(99,Se)):Math.max(1,Math.min(9999,Se))};let Be=(Array.isArray(d)?d:[]).reduce((g,H)=>!H||typeof H!="object"||jr(H)?g:g+Hi(H),0);Be<=0&&Array.isArray(u)&&u.length&&(Be=u.reduce((g,H)=>{const oe=Hi({...H,type:H.type});return g+oe},0)),!Number.isFinite(Be)||Be<=0?Be=Array.isArray(u)&&u.length?u.length:(Array.isArray(d)?d.length:0)||1:Be>1e6&&(Be=Math.min(Be,Array.isArray(u)?u.length:Be),(!Number.isFinite(Be)||Be<=0)&&(Be=(Array.isArray(d)?d.length:0)||1)),Be=Math.max(1,Math.round(Be));const Lr=v(String(Be)),Oi=Yt.replace("{count}",Lr),Dr=va.replace("{count}",xe),Br=e.notes?v(e.notes):wr,Fr=v(G.toFixed(2)),Rr=v(String(J)),Mr=v(X.toFixed(2)),zr=`${Rr}% (${Mr} ${ne})`,Hr=Number.isFinite(fe)?Math.max(0,fe):0,Or=v(Hr.toFixed(2)),qt=[{icon:"💼",label:xr,value:`${De} ${ne}`}];qt.push({icon:"😎",label:C,value:`${Fr} ${ne}`}),B>0&&qt.push({icon:"💸",label:U,value:`${Q} ${ne}`}),qt.push({icon:"📊",label:ie,value:`${te} ${ne}`}),E&&ee>0&&qt.push({icon:"🧾",label:he,value:`${ue} ${ne}`}),J>0&&qt.push({icon:"🏦",label:ve,value:zr}),qt.push({icon:"💵",label:pe,value:`${Or} ${ne}`}),qt.push({icon:"💰",label:ha,value:`${Pe} ${ne}`});const Vr=qt.map(({icon:g,label:H,value:oe})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${g} ${H}</span>
      <span class="summary-details-value">${oe}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let mn=[];Array.isArray(e.paymentHistory)?mn=e.paymentHistory:Array.isArray(e.payment_history)&&(mn=e.payment_history);const Kr=Array.isArray(e.paymentLogs)?e.paymentLogs:[],Vi=Array.isArray(mn)&&mn.length>0?mn:Kr,Ur=Vi.length?`<ul class="reservation-payment-history-list">${Vi.map(g=>{const H=g?.type==="amount"?c("reservations.paymentHistory.type.amount","دفعة مالية"):g?.type==="percent"?c("reservations.paymentHistory.type.percent","دفعة نسبة"):c("reservations.paymentHistory.type.unknown","دفعة"),oe=Number.isFinite(Number(g?.amount))&&Number(g.amount)>0?`${v(Number(g.amount).toFixed(2))} ${ne}`:"—",Se=Number.isFinite(Number(g?.percentage))&&Number(g.percentage)>0?`${v(Number(g.percentage).toFixed(2))}%`:"—",Ie=g?.recordedAt?v(Je(g.recordedAt)):"—",je=g?.note?`<div class="payment-history-note">${Ve(v(g.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${Ve(H)}</span>
              <span class="payment-history-entry__amount">${oe}</span>
              <span class="payment-history-entry__percent">${Se}</span>
              <span class="payment-history-entry__date">${Ie}</span>
            </div>
            ${je}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${Ve($r)}</div>`,Ki=[{text:s?pn:Wt,className:s?"status-confirmed":"status-pending"},{text:Cr,className:Sa==="paid"?"status-paid":zi?"status-partial":"status-unpaid"}];l&&Ki.push({text:at,className:"status-completed"});const Qr=Ki.map(({text:g,className:H})=>`<span class="status-chip ${H}">${g}</span>`).join(""),Tt=(g,H,oe)=>`
    <div class="res-info-row">
      <span class="label">${g} ${H}</span>
      <span class="value">${oe}</span>
    </div>
  `;let Aa="";if(e.projectId){let g=Ve(_r);if(i){const H=i.title||c("projects.fallback.untitled","مشروع بدون اسم");g=`${Ve(H)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${i.id}">${Ve(Ar)}</button>`}Aa=`
      <div class="res-info-row">
        <span class="label">📁 ${Sr}</span>
        <span class="value">${g}</span>
      </div>
    `}const ft=[];ft.push(Tt("👤",hr,t?.customerName||Nr)),ft.push(Tt("📞",vr,t?.phone||"—")),ft.push(Tt("🗓️",qr,le)),ft.push(Tt("🗓️",Ir,Te)),ft.push(Tt("📦",Er,Oi)),ft.push(Tt("⏱️",ge,ze)),ft.push(Tt("📝",kr,Br)),Aa&&ft.push(Aa);const Gr=ft.join(""),Wr=u.length?u.map(g=>{const H=g.items[0]||{},oe=Ot(H)||g.image,Se=oe?`<img src="${oe}" alt="${Qe}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',Ie=[];Array.isArray(g.packageItems)&&g.packageItems.length&&Ie.push(...g.packageItems),g.items.forEach(ye=>{Array.isArray(ye?.packageItems)&&ye.packageItems.length&&Ie.push(...ye.packageItems)});const je=Bn(g)||g.items.some(ye=>Bn(ye))||Ie.length>0,Fe=(ye,{fallback:st=1,max:re=1e3}={})=>{const Ae=_a(ye);return Number.isFinite(Ae)&&Ae>0?Math.min(re,Ae):st};let Ne;if(je){const ye=Fe(H?.qty??H?.quantity??H?.count,{fallback:NaN,max:999});Number.isFinite(ye)&&ye>0?Ne=ye:Ne=Fe(g.quantity??g.count??1,{fallback:1,max:999})}else Ne=Fe(g.quantity??g.count??H?.qty??H?.quantity??H?.count??0,{fallback:1,max:9999});const Xt=v(String(Ne)),Oe=(ye,{preferPositive:st=!1}={})=>{let re=Number.NaN;for(const Ae of ye){const ot=qe(Ae);if(Number.isFinite(ot)){if(st&&ot>0)return ot;Number.isFinite(re)||(re=ot)}}return re};let Z,ke;if(je){const ye=[H?.price,H?.unit_price,H?.unitPrice,g.unitPrice];if(Z=Oe(ye,{preferPositive:!0}),!Number.isFinite(Z)||Z<0){const re=qe(g.totalPrice??H?.total??H?.total_price);Number.isFinite(re)&&Ne>0&&(Z=re/Ne)}Number.isFinite(Z)||(Z=0);const st=[H?.total,H?.total_price,g.totalPrice];if(ke=Oe(st),!Number.isFinite(ke))ke=Z*Ne;else{const re=Z*Ne;Number.isFinite(re)&&re>0&&Math.abs(ke-re)>re*.25&&(ke=re)}}else{const ye=[H?.price,H?.unit_price,H?.unitPrice,g.unitPrice];if(Z=Oe(ye,{preferPositive:!0}),!Number.isFinite(Z)||Z<0){const st=qe(g.totalPrice??H?.total??H?.total_price);Number.isFinite(st)&&Ne>0&&(Z=st/Ne)}Number.isFinite(Z)||(Z=0),ke=qe(g.totalPrice??H?.total??H?.total_price),Number.isFinite(ke)||(ke=Z*Ne)}Z=_e(Z),ke=_e(ke);const Xe=`${v(Z.toFixed(2))} ${ne}`,Ze=`${v(ke.toFixed(2))} ${ne}`,It=g.barcodes.map(ye=>v(String(ye||""))).filter(Boolean),et=It.length?`<details class="reservation-item-barcodes">
              <summary>${c("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${It.map(ye=>`<li>${ye}</li>`).join("")}
              </ul>
            </details>`:"";let it="";if(Ie.length){const ye=new Map,st=re=>{const Ae=_a(re?.qtyPerPackage??re?.perPackageQty??re?.quantityPerPackage);return Number.isFinite(Ae)&&Ae>0&&Ae<=99?Math.round(Ae):1};if(Ie.forEach(re=>{if(!re)return;const Ae=Y(re.barcode||re.normalizedBarcode||re.desc||Math.random());if(!Ae)return;const ot=ye.get(Ae),Zt=st(re);if(ot){ot.qty=Zt,ot.total=Zt;return}ye.set(Ae,{desc:re.desc||re.barcode||c("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(Zt,99)),total:Math.max(1,Math.min(Zt,99)),barcode:re.barcode??re.normalizedBarcode??""})}),ye.size){const re=Array.from(ye.values()).map(Ae=>{const ot=v(String(Ae.qty>0?Math.min(Ae.qty,99):1)),Zt=Ve(Ae.desc||""),ec=Ae.barcode?` <span class="reservation-package-items__barcode">(${Ve(v(String(Ae.barcode)))})</span>`:"";return`<li>${Zt}${ec} × ${ot}</li>`}).join("");it=`
              <details class="reservation-package-items">
                <summary>${c("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${re}
                </ul>
              </details>
            `}}const Zr=je?`${it||""}${et||""}`:et;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${Se}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${Ve(H.desc||H.description||H.name||g.description||"-")}</div>
                  ${Zr}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Ve($e.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Xt}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Ve($e.unitPrice)}">${Xe}</td>
            <td class="reservation-modal-items-table__cell" data-label="${Ve($e.total)}">${Ze}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${Ve($e.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${He}</td></tr>`,Jr=`
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
        <tbody>${Wr}</tbody>
      </table>
    </div>
  `,Yr=h.map((g,H)=>{const oe=v(String(H+1));let Se=g.positionLabel??g.position_name??g.position_label??g.position_title??g.role??g.position??null;if((!Se||Se.trim()==="")&&(Se=g.positionLabelAr??g.position_label_ar??g.position_title_ar??g.positionLabelEn??g.position_label_en??g.position_name_ar??g.position_title_en??g.position_name_en??null),!Se||Se.trim()==="")try{const Xe=typeof kt=="function"?kt():[],Ze=g.positionId?Xe.find(it=>String(it.id)===String(g.positionId)):null,It=!Ze&&g.positionKey?Xe.find(it=>String(it.name).toLowerCase()===String(g.positionKey).toLowerCase()):null,et=Ze||It||null;et&&(Se=et.labelAr||et.labelEn||et.name||Se)}catch{}const Ie=Ia(Se)||c("reservations.crew.positionFallback","منصب بدون اسم"),je=Ia(g.positionLabelAlt??g.position_label_alt??g.positionLabelEn??g.position_label_en??g.positionLabelAr??g.position_label_ar??g.position_name_en??g.position_name_ar??""),Fe=Ia(g.technicianName)||c("technicians.picker.noTechnicianOption","— بدون تعيين —"),Ne=g.technicianPhone||At,Xt=_e(qe(g.positionCost??g.position_cost??g.cost??g.daily_wage??g.dailyWage??g.internal_cost??0));let Oe=_e(qe(g.positionClientPrice??g.position_client_price??g.client_price??g.customer_price??g.position_price??g.clientPrice??g.daily_total??g.dailyTotal??g.total??0));if(!Number.isFinite(Oe)||Oe<=0)try{const Xe=kt?kt():[],Ze=g.positionId?Xe.find(it=>String(it.id)===String(g.positionId)):null,It=!Ze&&g.positionKey?Xe.find(it=>String(it.name).toLowerCase()===String(g.positionKey).toLowerCase()):null,et=Ze||It||null;et&&Number.isFinite(Number(et.clientPrice))&&(Oe=_e(Number(et.clientPrice)))}catch{}const Z=`${v(Oe.toFixed(2))} ${ne}`,ke=Xt>0?`${v(Xt.toFixed(2))} ${ne}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${oe}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${Fe}</span>
            <small class="text-muted">🏷️ ${Ie}${je?` — ${je}`:""}</small>
            <small class="text-muted">💼 ${Z}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${Ne}</div>
          ${ke?`<div>💵 ${c("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${ke}</div>`:""}
        </div>
      </div>
    `}).join(""),Xr=h.length?`<div class="reservation-technicians-grid">${Yr}</div>`:`<ul class="reservation-modal-technicians"><li>${nt}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${mt}</span>
          <strong>${K}</strong>
        </div>
        <div class="status-chips">
          ${Qr}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${jn}</h6>
          ${Gr}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${Ln}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${Vr}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Pr}</h6>
              ${Ur}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Dn}</span>
          <span class="count">${Dr}</span>
        </div>
        ${Xr}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Jt}</span>
          <span class="count">${Oi}</span>
        </div>
        ${Jr}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${c("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${gr}</button>
        ${S?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${br}</button>`:""}
      </div>
    </div>
  `}const xl=`@page {
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
`,Io="reservations.quote.sequence",is={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},ko="https://help.artratio.sa/guide/quote-preview",Ce={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Pl=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Ue=[...Pl],$l=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function za(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...Ue]}function Nl(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=za(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=za(t.value);if(a.length)return a}const n=Ue.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...Ue]}const Cl=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],wo=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>q(v(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>q(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>q(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>q(v(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>q(v(Number(e?.price||0).toFixed(2)))}],Eo=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>q(v(String(t+1)))},{id:"position",labelKey:"reservations.details.crew.position",fallback:"المنصب",render:e=>q(v(e?.positionLabel??e?.position_name??e?.role??c("reservations.crew.positionFallback","منصب بدون اسم")))},{id:"price",labelKey:"reservations.details.crew.clientPrice",fallback:"سعر العميل",render:e=>{const t=Number.isFinite(Number(e?.positionClientPrice))?Number(e.positionClientPrice):0;return q(`${v(t.toFixed(2))} ${c("reservations.create.summary.currency","SR")}`)}}],Ha={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:wo.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:Eo.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},xo=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>q(v(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>q(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>q(e?.role||e?.title||c("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>q(e?.phone||e?.mobile||c("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Po=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>q(v(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>q(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>q(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>q(e?.note||"-")}],$o=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>q(v(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>q(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>q(v(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>q(v(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>q(e?.displayCost||"—")}],Tl=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],jl={customerInfo:Ha.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:Ha.payment,projectExpenses:Po.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:xo.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:$o.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},ka=new Map;function ua(e="reservation"){if(ka.has(e))return ka.get(e);const t=e==="project"?Tl:Cl,n=e==="project"?jl:Ha,a=new Set(t.map(({id:s})=>s)),i=Object.fromEntries(Object.entries(n).map(([s,r=[]])=>[s,new Set(r.map(l=>l.id))])),o={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:i};return ka.set(e,o),o}function pa(e="reservation"){return ua(e).sectionDefs}function No(e="reservation"){return ua(e).fieldDefs}function Co(e="reservation"){return ua(e).sectionIdSet}function To(e="reservation"){return ua(e).fieldIdMap}function jo(e){switch(e){case"export":return c("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return c("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const Ll="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",Dl="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",Bl="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",Lo=xl.trim(),Do=/^data:image\/svg\+xml/i,Fl=/\.svg($|[?#])/i,bn=512,Oa="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",Bo=96,Fo=25.4,Va=210,Mn=297,zn=Math.round(Va/Fo*Bo),Hn=Math.round(Mn/Fo*Bo),Rl=2,Ro=/safari/i,Ml=/(iphone|ipad|ipod)/i,ss=/(iphone|ipad|ipod)/i,zl=/(crios|fxios|edgios|opios)/i,Yn="[reservations/pdf]";let W=null,T=null,lt=1,fn=null,yn=null,wt=null,nn=null,vn=!1;function Rt(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:i=e!=="error"}={}){if(!W?.statusIndicator||!W?.statusText)return;W.statusKind=e;const o=t||jo(e);W.statusText.textContent=o,W.statusSpinner&&(W.statusSpinner.hidden=!i),W.statusAction&&(W.statusAction.hidden=!0,W.statusAction.onclick=null,n&&typeof a=="function"&&(W.statusAction.textContent=n,W.statusAction.hidden=!1,W.statusAction.onclick=s=>{s.preventDefault(),a()})),W.statusIndicator.hidden=!1,requestAnimationFrame(()=>{W.statusIndicator.classList.add("is-visible")})}function Sn(e){!W?.statusIndicator||!W?.statusText||(W.statusKind=null,W.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{W?.statusIndicator&&(W.statusIndicator.hidden=!0,W.statusAction&&(W.statusAction.hidden=!0,W.statusAction.onclick=null),W.statusSpinner&&(W.statusSpinner.hidden=!1))},220))}function Ka(){return!!window?.bootstrap?.Modal}function Hl(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),wt||(wt=document.createElement("div"),wt.className="modal-backdrop fade show",wt.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(wt)),nn||(nn=t=>{t.key==="Escape"&&Ua(e)},document.addEventListener("keydown",nn));try{e.focus({preventScroll:!0})}catch{}}}function Ua(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),wt&&(wt.remove(),wt=null),nn&&(document.removeEventListener("keydown",nn),nn=null))}function Ol(e){if(e){if(Ka()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}Hl(e)}}function Vl(){if(vn)return;vn=!0;const e=c("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=c("reservations.quote.toast.retry","إعادة المحاولة"),n=c("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!W?.modal?.classList.contains("show"),i=()=>{W?.modal?.classList.contains("show")&&(Rt("render"),vn=!1,Gt())};hs({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?i:void 0,linkLabel:e,linkHref:ko}),a&&Rt("error",{message:n,actionLabel:t,onAction:i,showSpinner:!1})}function ma(e="reservation"){const t={},n=No(e);return Object.entries(n).forEach(([a,i=[]])=>{t[a]=new Set(i.filter(o=>o?.default!==!1).map(o=>o.id))}),t}function Ei(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function Kl(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function xi(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function Pi(e="reservation"){return Object.fromEntries(pa(e).map(({id:t})=>[t,!1]))}function $i(e,t){return e.sectionExpansions||(e.sectionExpansions=Pi(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Ul(e,t){return $i(e,t)?.[t]!==!1}function Ni(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function Ql(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Ml.test(e)}function Gl(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=Ro.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Mo(){return Ql()&&Gl()}function fa(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=ss.test(e)||ss.test(t),i=/Macintosh/i.test(e)&&n>1;return Ro.test(e)&&!zl.test(e)&&(a||i)}function wa(e,...t){try{console.log(`${Yn} ${e}`,...t)}catch{}}function ht(e,...t){try{console.warn(`${Yn} ${e}`,...t)}catch{}}function Wl(e,t,...n){try{t?console.error(`${Yn} ${e}`,t,...n):console.error(`${Yn} ${e}`,...n)}catch{}}function we(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Jl(e,t="لا توجد بيانات للعرض."){const n=q(c(e,t));return we(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Xn(e,t){return Array.isArray(e)&&e.length?e:[Jl(t)]}const Yl=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function zo(e=""){return Yl.test(e)}function Xl(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(o,...s){if(typeof o!="string"||!zo(o))return a.call(this,o,...s);let r,l=!1;try{"direction"in this&&(r=this.direction,r!=="rtl"&&(this.direction="rtl"),l=!0)}catch{}try{if(!l){const d=this.canvas;d&&d.style?.direction!=="rtl"&&(d.__artRatioOriginalDirection=d.style.direction,d.style.direction="rtl")}return a.call(this,o,...s)}finally{if(l&&r!==void 0&&r!=="rtl")try{this.direction=r}catch{}else if(!l){const d=this.canvas;d&&d.__artRatioOriginalDirection!==void 0&&(d.style.direction=d.__artRatioOriginalDirection,delete d.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function os(e,t=bn){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Zl(e){if(!e)return{width:bn,height:bn};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?os(t,0):0,i=n?os(n,0):0;if(a>0&&i>0)return{width:a,height:i};const o=e.getAttribute?.("viewBox");if(o){const s=o.trim().split(/[\s,]+/).map(r=>parseFloat(r||"0"));if(s.length>=4){const[,,r,l]=s;a=a||(Number.isFinite(r)&&r>0?r:0),i=i||(Number.isFinite(l)&&l>0?l:0)}}return{width:a||bn,height:i||bn}}function Ho(e=""){return typeof e!="string"?!1:Do.test(e)||Fl.test(e)}function ed(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(i){return console.warn("[reservations/pdf] failed to decode SVG data URI",i),""}}function td(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const i=new Image;t&&(i.crossOrigin=t),i.onload=()=>n(i),i.onerror=o=>{const s=o?.message||`Unable to load image from ${e}`;a(new Error(s))},i.src=e})}async function Oo(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),i=URL.createObjectURL(a);try{const o=await td(i),s=n.createElement("canvas"),r=Math.max(t.width||o.naturalWidth||o.width||0,1),l=Math.max(t.height||o.naturalHeight||o.height||r,1);s.width=r,s.height=l;const d=s.getContext("2d");return d.clearRect(0,0,r,l),d.drawImage(o,0,0,r,l),s.toDataURL("image/png")}catch(o){return console.warn("[reservations/pdf] failed to rasterize SVG content",o),null}finally{URL.revokeObjectURL(i)}}async function nd(e){if(!e)return null;if(Do.test(e))return ed(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function ad(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!Ho(t))return!1;const n=await nd(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",Oa),!1;const a=await Oo(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",Oa),!1)}async function id(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Zl(e),i=await Oo(n,a),s=(e.ownerDocument||document).createElement("img");s.setAttribute("src",i||Oa),s.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),s.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&s.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&s.setAttribute("style",e.getAttribute("style"));const r=e.getAttribute("width"),l=e.getAttribute("height");return r&&s.setAttribute("width",r),l&&s.setAttribute("height",l),e.parentNode?.replaceChild(s,e),!!i}async function Vo(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(i=>{Ho(i.getAttribute?.("src"))&&a.push(ad(i))}),n.forEach(i=>{a.push(id(i))}),a.length&&await Promise.allSettled(a)}function sd(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,i=(n.defaultView||window).getComputedStyle?.(e);if(!i)return null;const o=(B,F=0)=>{const J=parseFloat(B);return Number.isFinite(J)?J:F},s=o(i.paddingTop),r=o(i.paddingBottom),l=o(i.paddingRight),d=o(i.paddingLeft),u=o(i.borderRadius),p=o(i.fontSize,14),y=(()=>{const B=i.lineHeight;if(!B||B==="normal")return p*1.6;const F=o(B,p*1.6);return F>0?F:p*1.6})(),f=Math.max(e.clientWidth||0,e.scrollWidth||0,o(i.width,0));if(f<=0)return null;const m=Math.max(1,f-d-l),h=e.textContent||"",S=h.split(/\r?\n/),k=n.createElement("canvas"),_=k.getContext("2d");if(!_)return null;const I=i.fontStyle||"normal",D=i.fontVariant||"normal",O=i.fontWeight||"400",A=i.fontFamily||"sans-serif",E=i.fontStretch||"normal",N=B=>B.join(" "),x=[],z=B=>_.measureText(B).width;_.font=`${I} ${D} ${O} ${E} ${p}px ${A}`,S.forEach(B=>{const F=B.trim();if(F.length===0){x.push("");return}const J=F.split(/\s+/);let X=[];J.forEach((ee,de)=>{const ae=ee.trim();if(!ae)return;const fe=N(X.concat(ae));if(z(fe)<=m||X.length===0){X.push(ae);return}x.push(N(X)),X=[ae]}),X.length&&x.push(N(X))}),x.length||x.push("");const b=s+r+x.length*y,j=Math.ceil(Math.max(1,f)*t),V=Math.ceil(Math.max(1,b)*t);k.width=j,k.height=V,k.style.width=`${Math.max(1,f)}px`,k.style.height=`${Math.max(1,b)}px`,_.scale(t,t);const $=i.backgroundColor&&i.backgroundColor!=="rgba(0, 0, 0, 0)"?i.backgroundColor:"#ffffff";if(u>0){_.save(),_.beginPath();const B=Math.max(1,f),F=Math.max(1,b),J=Math.min(u,B/2,F/2);_.moveTo(J,0),_.lineTo(B-J,0),_.quadraticCurveTo(B,0,B,J),_.lineTo(B,F-J),_.quadraticCurveTo(B,F,B-J,F),_.lineTo(J,F),_.quadraticCurveTo(0,F,0,F-J),_.lineTo(0,J),_.quadraticCurveTo(0,0,J,0),_.closePath(),_.clip()}if(_.fillStyle=$,_.fillRect(0,0,Math.max(1,f),Math.max(1,b)),_.font=`${I} ${D} ${O} ${E} ${p}px ${A}`,_.fillStyle=i.color||"#000000",_.textBaseline="top",_.textAlign="right","direction"in _)try{_.direction="rtl"}catch{}const L=Math.max(0,f-l);let P=s;x.forEach(B=>{const F=B.length?B:" ";_.fillText(F,L,P,m),P+=y});const R=n.createElement("img");let G;try{G=k.toDataURL("image/png")}catch(B){return ht("note canvas toDataURL failed",B),null}return R.src=G,R.alt=h,R.style.width=`${Math.max(1,f)}px`,R.style.height=`${Math.max(1,b)}px`,R.style.display="block",R.setAttribute("data-quote-note-image","true"),{image:R,canvas:k,totalHeight:b,width:f}}function od(e,{pixelRatio:t=1}={}){if(!e||!fa())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!zo(a.textContent||""))return;let i;try{i=sd(a,{pixelRatio:t})}catch(o){ht("failed to rasterize note content",o),i=null}i&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(i.image))})}function Qa(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){Wl(`${t} failed`,e);const i=!!(e&&e.__artRatioPdfNotified);if(!a&&!i){const o=c("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),s=n||o,r=c("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),l=c("reservations.quote.toast.retry","إعادة المحاولة"),d=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(Rt("export"),tr()):(Rt("render"),vn=!1,Gt())};if(hs({message:s,duration:9e3,actionLabel:d?l:void 0,onAction:d?u:void 0,linkLabel:r,linkHref:ko}),W?.modal?.classList.contains("show")&&Rt("error",{message:s,actionLabel:d?l:void 0,onAction:d?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function Ga({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){ht("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){ht("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function Ci(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",o=>n(o)),a.readyState==="complete"&&t();return}const i=document.createElement("script");i.src=e,i.async=!0,i.onload=()=>t(),i.onerror=o=>n(o),document.head.appendChild(i)})}function rs(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function cs(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function rd(){const e=cs();return e||(yn||(yn=Ci(Dl).catch(t=>{throw yn=null,t}).then(()=>{const t=cs();if(!t)throw yn=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),yn)}async function cd(){const e=rs();return e||(fn||(fn=Ci(Bl).catch(t=>{throw fn=null,t}).then(()=>{const t=rs();if(!t)throw fn=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),fn)}async function ld(){if(window.html2pdf||await Ci(Ll),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}Sc(),Xl()}function q(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function dd(e="reservation"){return e==="project"?"QP":"Q"}function ud(e,t="reservation"){const n=Number(e),a=dd(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function pd(){const e=window.localStorage?.getItem?.(Io),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function Ko(e="reservation"){const n=pd()+1;return{sequence:n,quoteNumber:ud(n,e)}}function md(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(Io,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function Uo(e="reservation"){return is[e]||is.reservation}function fd(e="reservation"){try{const t=Uo(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function yd(e,t="reservation"){try{const n=Uo(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function gd(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function bd(e,t="reservation"){if(!e)return null;const n=Co(t),a=To(t),i=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(r=>n.has(r)),o={},s=e.fields||{};return Object.entries(a).forEach(([r,l])=>{const d=s[r];if(d==null)return;const{ids:u,emptyExplicitly:p}=gd(d);if(!u&&!p)return;const y=Array.isArray(u)?u.filter(f=>l.has(f)):[];(y.length>0||p)&&(o[r]=y)}),{version:1,sections:i,fields:o}}function Qo(e){if(!e)return;const t=e.context||"reservation",n=bd(e,t);n&&yd(n,t)}function Go(e){if(!e)return;const t=e.context||"reservation",n=fd(t);if(!n)return;const a=Co(t),i=Array.isArray(n.sections)?n.sections.filter(o=>a.has(o)):[];if(i.length&&(e.sections=new Set(i)),n.fields&&typeof n.fields=="object"){const o=Ei(e.fields||ma(t)),s=To(t);Object.entries(n.fields).forEach(([r,l])=>{const d=s[r];if(!d)return;const u=Array.isArray(l)?l.filter(p=>d.has(p)):[];o[r]=new Set(u)}),e.fields=o}}function Wo(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function hd(e){const t=qn()||[],{technicians:n=[]}=be(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),i=new Map;return a.forEach(s=>{if(!s||s.id==null)return;const r=String(s.id),l=i.get(r)||{};i.set(r,{...l,...s})}),(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(s=>({technicianId:s}))).map((s,r)=>{const l=s?.technicianId!=null?i.get(String(s.technicianId)):null;let d=s.positionLabel??s.position_name??s.position_label??s.role??s.position??l?.role??c("reservations.crew.positionFallback","منصب بدون اسم");(!d||d.trim()==="")&&(d=s.positionLabelAr??s.position_label_ar??s.positionLabelEn??s.position_label_en??s.position_name_ar??s.position_name_en??l?.role??c("reservations.crew.positionFallback","منصب بدون اسم"));try{const y=typeof kt=="function"?kt()||[]:[];let f=null;if(s?.positionId!=null&&(f=y.find(m=>String(m?.id)===String(s.positionId))||null),!f){const m=s.positionKey??s.position_key??s.positionName??s.position_name??s.position??"";if(m&&(f=typeof On=="function"&&On(m)||null,!f&&y.length)){const h=String(m).trim().toLowerCase();f=y.find(S=>[S.name,S.labelAr,S.labelEn].filter(Boolean).map(k=>String(k).toLowerCase()).includes(h))||null}}if(f){const m=f.labelAr||f.labelEn||f.name||"";m&&m.trim()&&(d=m)}}catch{}const u=_e(qe(s.positionCost??s.position_cost??s.cost??s.daily_wage??s.dailyWage??l?.dailyWage??l?.wage??0)),p=_e(qe(s.positionClientPrice??s.position_client_price??s.client_price??s.clientPrice??s.daily_total??s.dailyTotal??s.total??l?.dailyTotal??l?.total??l?.total_wage??0));return{assignmentId:s.assignmentId??s.assignment_id??`crew-${r}`,positionId:s.positionId??s.position_id??null,positionLabel:d,positionLabelAlt:s.positionLabelAlt??s.position_label_alt??"",positionCost:u,positionClientPrice:p,technicianId:s.technicianId!=null?String(s.technicianId):l?.id!=null?String(l.id):null,technicianName:s.technicianName??s.technician_name??l?.name??null,technicianRole:s.technicianRole??l?.role??null}})}function vd(e,t,n){const{projectLinked:a}=Kt(e,n);ra(e.start,e.end);const i=e.discount??e.discountValue??0,o=Number(v(String(i)))||0,s=e.discountType??e.discount_type??"percent",r=String(s).toLowerCase()==="amount"?"amount":"percent",l=a?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),d=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,u=d!=null?qe(d):Number.NaN,y=(e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied)===!0&&Number.isFinite(u)&&u>0?u:null,f=Array.isArray(t)?t.map(D=>D?.technicianId).filter(Boolean):[],m=xn({items:Array.isArray(e.items)?e.items:[],technicianIds:f,crewAssignments:Array.isArray(t)?t:[],discount:o,discountType:r,applyTax:l,start:e.start,end:e.end,companySharePercent:y}),h=qe(e.cost??e.total??e.finalTotal),S=Number.isFinite(h),k=a?m.finalTotal:S?_e(h):m.finalTotal,_={equipmentTotal:m.equipmentTotal,crewTotal:m.crewTotal,crewCostTotal:m.crewCostTotal,discountAmount:m.discountAmount,subtotalAfterDiscount:m.subtotalAfterDiscount,taxableAmount:m.taxableAmount,taxAmount:m.taxAmount,finalTotal:k,companySharePercent:m.companySharePercent,companyShareAmount:m.companyShareAmount,netProfit:m.netProfit},I={equipmentTotal:v(m.equipmentTotal.toFixed(2)),crewTotal:v(m.crewTotal.toFixed(2)),discountAmount:v(m.discountAmount.toFixed(2)),subtotalAfterDiscount:v(m.subtotalAfterDiscount.toFixed(2)),taxableAmount:v(m.taxableAmount.toFixed(2)),taxAmount:v(m.taxAmount.toFixed(2)),finalTotal:v(k.toFixed(2)),companySharePercent:v((Number.isFinite(m.companySharePercent)?m.companySharePercent:0).toFixed(2)),companyShareAmount:v(m.companyShareAmount.toFixed(2)),netProfit:v(m.netProfit.toFixed(2))};return{totals:_,totalsDisplay:I,rentalDays:m.rentalDays}}function cn(e){if(e==null||e==="")return null;const t=Number.parseFloat(v(String(e)));return Number.isFinite(t)?t:null}function Jo(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Sd(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=cn(e.amount??(n==="amount"?e.value:null)),i=cn(e.percentage??(n==="percent"?e.value:null)),o=n==="percent"?i??null:a??null,s=e.note??e.memo??null,r=Jo(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&i==null?null:{type:n,amount:a??null,percentage:i??null,value:o,note:s,recordedAt:r}}function _d(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(Sd).filter(Boolean);if(n.length>0)return n;const a=cn(e.paidPercent??e.paid_percent),i=cn(e.paidAmount??e.paid_amount),o=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,s=Jo(o);return a!=null&&a>0?[{type:"percent",amount:i!=null&&i>0?i:null,percentage:a,value:a,note:null,recordedAt:s}]:i!=null&&i>0?[{type:"amount",amount:i,percentage:null,value:i,note:null,recordedAt:s}]:[]}function Ad(e){if(!e)return c("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return c(t,e)}function qd(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function Id(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function kd(e){const t=Number(e?.equipmentEstimate)||0,n=Id(e),a=t+n,i=e?.applyTax===!0||e?.applyTax==="true",o=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let r=(e?.discountType==="amount"?"amount":"percent")==="amount"?o:a*(o/100);(!Number.isFinite(r)||r<0)&&(r=0),r>a&&(r=a);const l=Math.max(0,a-r),d=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,p=d&&i&&u>0?u:0,y=p>0?Number((l*(p/100)).toFixed(2)):0,f=l+y;let m=i?f*As:0;(!Number.isFinite(m)||m<0)&&(m=0),m=Number(m.toFixed(2));let h=i?Number(e?.totalWithTax):f;return i?(!Number.isFinite(h)||h<=0)&&(h=Number((f+m).toFixed(2))):h=f,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:r,subtotalAfterDiscount:l,companyShareAmount:y,subtotal:f,applyTax:i,taxAmount:m,totalWithTax:h}}function wd(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(v(String(n)))||0,i=e.discountType||"percent",o=Array.isArray(e.crewAssignments)?e.crewAssignments:[],s=o.length?o:Array.isArray(e.technicians)?e.technicians:[],r=ai(t,a,i,!1,s,{start:e.start,end:e.end});if(Number.isFinite(r))return r;const l=Number(v(String(e.cost??0)));return Number.isFinite(l)?Math.round(l):0}function Ed(e,t){if(!e)return"—";const n=Je(e);return t?`${n} - ${Je(t)}`:n}function se(e,t="SR",n=2){const a=Number(e)||0,i=Number.isInteger(n)?n:2;return`${v(a.toFixed(i))} ${t}`}function ls(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${v(Number(e).toFixed(n))}%`}function xd(e){if(!e?.start)return null;if(!e?.end)return 1;const t=ra(e.start,e.end);return Number.isFinite(t)?t:1}function Pd(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${v(String(Math.round(e)))} أيام`:"غير محدد"}function $d(e){const t=c("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:i=[],technicians:o=[]}=be(),s=e?.id!=null?i.find(C=>String(C.id)===String(e.id))||e:e||null,r={projectStatusLabel:c("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:c("projects.paymentStatus.unpaid","غير مدفوع")};if(!s)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:r.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:se(0,t),expensesTotal:se(0,t),reservationsTotal:se(0,t),discountAmount:se(0,t),taxAmount:se(0,t),overallTotal:se(0,t),paidAmount:se(0,t),remainingAmount:se(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:r.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:se(0,t),remainingAmountDisplay:se(0,t),paidPercentDisplay:ls(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:r.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const l=s.clientId??s.customerId??s.client_id??s.customer_id??null,d=l!=null&&n.find(C=>String(C.id)===String(l))||null,u=d?.customerName??d?.name??s.clientName??s.customerName??c("projects.fallback.unknownClient","عميل غير معروف"),p=(s.clientCompany||d?.companyName||d?.company||"").trim(),y=d?.phone??d?.customerPhone??s.clientPhone??s.customerPhone??"",f=y?v(String(y).trim()):c("projects.details.client.noPhone","لا يوجد رقم متاح"),m=d?.email??s.clientEmail??s.customerEmail??"",h=m?String(m).trim():c("projects.details.client.noEmail","لا يوجد بريد متاح"),S=s.projectCode||`PRJ-${v(String(s.id??""))}`,k=v(String(S)),_=(s.title||"").trim()||c("projects.fallback.untitled","مشروع بدون عنوان"),I=Ad(s.type),D=s.start?Je(s.start):"—",O=s.end?Je(s.end):"—",A=xd(s),E=A!=null?Pd(A):"غير محدد",N=qd(s),x={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},z=c(`projects.status.${N}`,x[N]||N),b=s.id!=null?String(s.id):null,j=b?a.filter(C=>String(C.projectId)===b):[],$=j.map(C=>{const ie=C.reservationId||C.id||"",ge=C.status||C.state||"pending",ve=String(ge).toLowerCase(),pe=c(`reservations.status.${ve}`,ve),Qe=wd(C),$e=C.start?new Date(C.start).getTime():0;return{reservationId:v(String(ie||"-")),status:ve,statusLabel:pe,total:Qe,totalLabel:se(Qe,t),dateRange:Ed(C.start,C.end),startTimestamp:Number.isNaN($e)?0:$e}}).sort((C,ie)=>ie.startTimestamp-C.startTimestamp).map(({startTimestamp:C,...ie})=>ie).reduce((C,ie)=>C+(Number(ie.total)||0),0),L=new Map;j.forEach(C=>{const ie=Array.isArray(C.items)?C.items:[],ge=ra(C.start,C.end),ve=C.reservationId||C.id||"";ie.forEach((pe,Qe)=>{if(!pe)return;const $e=pe.barcode||pe.code||pe.id||pe.desc||pe.description||`item-${Qe}`,He=String($e||`item-${Qe}`),nt=L.get(He)||{description:pe.desc||pe.description||pe.name||pe.barcode||`#${v(String(Qe+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},At=Number(pe.qty)||1,pn=Number(pe.price)||0;nt.totalQuantity+=At,nt.reservationIds.add(String(ve));const Wt=pn*At*Math.max(1,ge);Number.isFinite(Wt)&&(nt.totalCost+=Wt),L.set(He,nt)})});const P=Array.from(L.values()).map(C=>({description:C.description,totalQuantity:C.totalQuantity,reservationsCount:C.reservationIds.size,displayCost:se(C.totalCost,t)})),R=new Map((o||[]).filter(Boolean).map(C=>[String(C.id),C])),G=new Map,B=C=>{if(!C)return;let ie=null;typeof C=="object"?ie=C.id??C.technicianId??C.technician_id??C.userId??C.user_id??null:(typeof C=="string"||typeof C=="number")&&(ie=C);const ge=ie!=null?String(ie):null,ve=ge&&R.has(ge)?R.get(ge):typeof C=="object"?C:null,pe=ve?.name||ve?.full_name||ve?.fullName||ve?.displayName||(typeof C=="string"?C:null),Qe=ve?.role||ve?.title||null,$e=ve?.phone||ve?.mobile||ve?.contact||null;if(!pe&&!ge)return;const He=ge||pe;G.has(He)||G.set(He,{id:ge,name:pe||"-",role:Qe||null,phone:$e||null})};Array.isArray(s?.technicians)&&s.technicians.forEach(C=>B(C)),j.forEach(C=>{(Array.isArray(C.crewAssignments)&&C.crewAssignments.length?C.crewAssignments:Array.isArray(C.technicians)?C.technicians.map(ge=>({technicianId:ge})):[]).forEach(ge=>B(ge))});const F=Array.from(G.values()),J=Array.isArray(s.expenses)?s.expenses.map(C=>{const ie=Number(C?.amount)||0;return{label:C?.label||C?.name||"-",amount:ie,displayAmount:se(ie,t),note:C?.note||C?.description||""}}):[],X=kd(s),ee=X.applyTax?Number(((X.subtotal+$)*As).toFixed(2)):0,de=Number((X.subtotal+$+ee).toFixed(2)),ae=_d(s),fe=cn(s.paidAmount??s.paid_amount)||0,K=cn(s.paidPercent??s.paid_percent)||0,le=ia({totalAmount:de,paidAmount:fe,paidPercent:K,history:ae}),Te=typeof s.paymentStatus=="string"?s.paymentStatus.toLowerCase():"",xe=sa({manualStatus:Te,paidAmount:le.paidAmount,paidPercent:le.paidPercent,totalAmount:de}),De={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},Q=c(`projects.paymentStatus.${xe}`,De[xe]||xe),te=Number(le.paidAmount||0),ue=Number(le.paidPercent||0),Pe=Math.max(0,Number((de-te).toFixed(2))),ze={projectSubtotal:se(X.subtotal,t),expensesTotal:se(X.expensesTotal,t),reservationsTotal:se($,t),discountAmount:se(X.discountAmount,t),taxAmount:se(ee,t),overallTotal:se(de,t),paidAmount:se(te,t),remainingAmount:se(Pe,t)},ne={status:xe,statusLabel:Q,paidAmount:te,paidPercent:ue,remainingAmount:Pe,paidAmountDisplay:se(te,t),remainingAmountDisplay:se(Pe,t),paidPercentDisplay:ls(ue)},U=(s.description||"").trim();return{project:s,customer:d,clientInfo:{name:u,company:p||"—",phone:f,email:h},projectInfo:{title:_,code:k,typeLabel:I,startDisplay:D,endDisplay:O,durationLabel:E,statusLabel:z},expenses:J,equipment:P,crew:F,totals:X,totalsDisplay:ze,projectTotals:{combinedTaxAmount:ee,overallTotal:de,reservationsTotal:$,paidAmount:te,paidPercent:ue,remainingAmount:Pe,paymentStatus:xe},paymentSummary:ne,notes:U,currencyLabel:t,projectStatus:N,projectStatusLabel:z,projectDurationDays:A,projectDurationLabel:E,paymentHistory:ae}}function Nd({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:i=[],projectEquipment:o=[],totalsDisplay:s={},projectTotals:r={},paymentSummary:l={},currencyLabel:d="SR",sections:u,fieldSelections:p={},quoteNumber:y,quoteDate:f,terms:m=Ue}){const h=Ei(p),S=(Q,te)=>xi(h,Q,te),k=Q=>u?.has?.(Q),_=`<div class="quote-placeholder">${q(c("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,I=(Q,te)=>`<div class="info-plain__item">
      <span class="info-plain__label">${q(Q)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${q(te)}</span>
    </div>`,D=(Q,te,{variant:ue="inline"}={})=>ue==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${q(Q)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${q(te)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${q(Q)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${q(te)}</span>
    </span>`,O=(Q,te)=>`<div class="payment-row">
      <span class="payment-row__label">${q(Q)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${q(te)}</span>
    </div>`,A=[];S("customerInfo","customerName")&&A.push(I(c("projects.details.client","العميل"),t.name||"-")),S("customerInfo","customerCompany")&&A.push(I(c("projects.details.company","شركة العميل"),t.company||"—")),S("customerInfo","customerPhone")&&A.push(I(c("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),S("customerInfo","customerEmail")&&A.push(I(c("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const E=k("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${q(c("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${A.length?`<div class="info-plain">${A.join("")}</div>`:_}
      </section>`:"",N=[];S("projectInfo","projectType")&&N.push(I(c("projects.details.type","نوع المشروع"),n.typeLabel||"-")),S("projectInfo","projectTitle")&&N.push(I(c("projects.details.projectTitle","اسم المشروع"),n.title||"-")),S("projectInfo","projectCode")&&N.push(I(c("projects.details.labels.code","رقم المشروع"),n.code||"-")),S("projectInfo","projectStart")&&N.push(I(c("projects.details.start","بداية المشروع"),n.startDisplay||"-")),S("projectInfo","projectEnd")&&N.push(I(c("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),S("projectInfo","projectDuration")&&N.push(I(c("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),S("projectInfo","projectStatus")&&N.push(I(c("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const x=k("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${q(c("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${N.length?`<div class="info-plain">${N.join("")}</div>`:_}
      </section>`:"",z=xo.filter(Q=>S("projectCrew",Q.id)),b=k("projectCrew")?z.length?`<section class="quote-section quote-section--table">
            <h3>${q(c("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${z.map(Q=>`<th>${q(Q.labelKey?c(Q.labelKey,Q.fallback):Q.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((Q,te)=>`<tr>${z.map(ue=>`<td>${ue.render(Q,te)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(z.length,1)}" class="empty">${q(c("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${q(c("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${_}
          </section>`:"",j=[];S("financialSummary","projectSubtotal")&&j.push(D(c("projects.details.summary.projectSubtotal","إجمالي المشروع"),s.projectSubtotal||`${se(0,d)}`)),S("financialSummary","expensesTotal")&&j.push(D(c("projects.details.expensesTotal","إجمالي متطلبات المشروع"),s.expensesTotal||se(0,d))),S("financialSummary","reservationsTotal")&&j.push(D(c("projects.details.reservationsTotal","إجمالي الحجوزات"),s.reservationsTotal||se(0,d))),S("financialSummary","discountAmount")&&j.push(D(c("reservations.details.labels.discount","الخصم"),s.discountAmount||se(0,d))),S("financialSummary","taxAmount")&&j.push(D(c("projects.details.summary.combinedTax","إجمالي الضريبة"),s.taxAmount||se(0,d)));const V=[];S("financialSummary","overallTotal")&&V.push(D(c("projects.details.summary.overallTotal","الإجمالي الكلي"),s.overallTotal||se(0,d),{variant:"final"})),S("financialSummary","paidAmount")&&V.push(D(c("projects.details.summary.paidAmount","إجمالي المدفوع"),s.paidAmount||se(0,d),{variant:"final"})),S("financialSummary","remainingAmount")&&V.push(D(c("projects.details.summary.remainingAmount","المتبقي للدفع"),s.remainingAmount||se(0,d),{variant:"final"}));const $=k("financialSummary")?!j.length&&!V.length?`<section class="quote-section quote-section--financial">${_}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${q(c("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${j.length?`<div class="totals-inline">${j.join("")}</div>`:""}
            ${V.length?`<div class="totals-final">${V.join("")}</div>`:""}
          </div>
        </section>`:"",L=Po.filter(Q=>S("projectExpenses",Q.id)),P=k("projectExpenses")?L.length?`<section class="quote-section quote-section--table">
            <h3>${q(c("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${L.map(Q=>`<th>${q(Q.labelKey?c(Q.labelKey,Q.fallback):Q.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${i.length?i.map((Q,te)=>`<tr>${L.map(ue=>`<td>${ue.render(Q,te)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(L.length,1)}" class="empty">${q(c("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${q(c("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${_}
          </section>`:"",R=$o.filter(Q=>S("projectEquipment",Q.id)),G=k("projectEquipment")?R.length?`<section class="quote-section quote-section--table">
            <h3>${q(c("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${R.map(Q=>`<th>${q(Q.labelKey?c(Q.labelKey,Q.fallback):Q.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${o.length?o.map((Q,te)=>`<tr>${R.map(ue=>`<td>${ue.render(Q,te)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(R.length,1)}" class="empty">${q(c("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${q(c("projects.quote.sections.equipment","المعدات"))}</h3>
            ${_}
          </section>`:"",B=(e?.description||"").trim()||"",F=k("projectNotes")?`<section class="quote-section">
        <h3>${q(c("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${q(B||c("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",J=[];S("payment","beneficiary")&&J.push(O(c("reservations.quote.labels.beneficiary","اسم المستفيد"),Ce.beneficiaryName)),S("payment","bank")&&J.push(O(c("reservations.quote.labels.bank","اسم البنك"),Ce.bankName)),S("payment","account")&&J.push(O(c("reservations.quote.labels.account","رقم الحساب"),v(Ce.accountNumber))),S("payment","iban")&&J.push(O(c("reservations.quote.labels.iban","رقم الآيبان"),v(Ce.iban)));const X=`<section class="quote-section">
      <div class="payment-block">
        <h3>${q(c("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${J.length?J.join(""):_}</div>
      </div>
      <p class="quote-approval-note">${q(Ce.approvalNote)}</p>
    </section>`,ee=Array.isArray(m)&&m.length?m:Ue,de=`<footer class="quote-footer">
        <h4>${q(c("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${ee.map(Q=>`<li>${q(Q)}</li>`).join("")}</ul>
      </footer>`,ae=[],fe=[];if(x&&fe.push({key:"project",html:x}),E&&fe.push({key:"customer",html:E}),fe.length>1){const Q=fe.find(Pe=>Pe.key==="project"),te=fe.find(Pe=>Pe.key==="customer"),ue=[];Q?.html&&ue.push(Q.html),te?.html&&ue.push(te.html),ae.push(we(`<div class="quote-section-row quote-section-row--primary">${ue.join("")}</div>`,{blockType:"group"}))}else fe.length===1&&ae.push(we(fe[0].html));const K=[];b&&K.push(we(b,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),P&&K.push(we(P,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),G&&K.push(we(G,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const le=[];$&&le.push(we($,{blockType:"summary"})),F&&le.push(we(F));const Te=[we(X,{blockType:"payment"}),we(de,{blockType:"footer"})],xe=[...Xn(ae,"projects.quote.placeholder.primary"),...K,...Xn(le,"projects.quote.placeholder.summary"),...Te],De=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${q(Ce.logoUrl)}" alt="${q(Ce.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${q(c("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${q(Ce.companyName)}</p>
        <p class="quote-company-cr">${q(c("reservations.quote.labels.cr","السجل التجاري"))}: ${q(Ce.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${q(c("reservations.details.labels.reservationId","رقم العرض"))}</span>
          <strong>${q(y)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${q(c("projects.quote.labels.date","التاريخ"))}</span>
          <strong>${q(f)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Lo}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${De}
          ${xe.join("")}
        </div>
      </div>
    </div>
  `}function Yo(e){if(e?.context==="project")return Nd(e);const{reservation:t,customer:n,project:a,crewAssignments:i,totals:o,totalsDisplay:s,rentalDays:r,currencyLabel:l,sections:d,fieldSelections:u={},quoteNumber:p,quoteDate:y,terms:f=Ue}=e,m=v(String(t?.reservationId??t?.id??"")),h=t.start?v(Je(t.start)):"-",S=t.end?v(Je(t.end)):"-",k=n?.customerName||n?.full_name||n?.name||"-",_=n?.phone||"-",I=n?.email||"-",D=n?.company||n?.company_name||"-",O=v(_),A=a?.title||a?.name||c("reservations.details.project.none","غير مرتبط بمشروع"),E=a?.code||a?.projectCode||"",N=v(String(r)),x=t?.notes||"",z=Array.isArray(f)&&f.length?f:Ue,b=Ei(u),j=(M,Ee)=>xi(b,M,Ee),V=M=>d?.has?.(M),$=`<div class="quote-placeholder">${q(c("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,L=(M,Ee)=>`<div class="info-plain__item">${q(M)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${q(Ee)}</strong></div>`,P=(M,Ee,{variant:at="inline"}={})=>at==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${q(M)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${q(Ee)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${q(M)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${q(Ee)}</span>
    </span>`,R=(M,Ee)=>`<div class="payment-row">
      <span class="payment-row__label">${q(M)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${q(Ee)}</span>
    </div>`,G=[];j("customerInfo","customerName")&&G.push(L(c("reservations.details.labels.customer","العميل"),k)),j("customerInfo","customerCompany")&&G.push(L(c("reservations.details.labels.company","الشركة"),D)),j("customerInfo","customerPhone")&&G.push(L(c("reservations.details.labels.phone","الهاتف"),O)),j("customerInfo","customerEmail")&&G.push(L(c("reservations.details.labels.email","البريد"),I));const B=V("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${q(c("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${G.length?`<div class="info-plain">${G.join("")}</div>`:$}
      </section>`:"",F=[];j("reservationInfo","reservationId")&&F.push(L(c("reservations.details.labels.reservationId","رقم الحجز"),m||"-")),j("reservationInfo","reservationStart")&&F.push(L(c("reservations.details.labels.start","بداية الحجز"),h)),j("reservationInfo","reservationEnd")&&F.push(L(c("reservations.details.labels.end","نهاية الحجز"),S)),j("reservationInfo","reservationDuration")&&F.push(L(c("reservations.details.labels.duration","عدد الأيام"),N));const J=V("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${q(c("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${F.length?`<div class="info-plain">${F.join("")}</div>`:$}
      </section>`:"",X=[];j("projectInfo","projectTitle")&&X.push(L(c("reservations.details.labels.project","المشروع"),A)),j("projectInfo","projectCode")&&X.push(L(c("reservations.details.labels.code","الرمز"),E||"-"));const ee=V("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${q(c("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${X.length?`<div class="info-plain">${X.join("")}</div>`:$}
      </section>`:"",de=[];j("financialSummary","equipmentTotal")&&de.push(P(c("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${s.equipmentTotal} ${l}`)),j("financialSummary","crewTotal")&&de.push(P(c("reservations.details.labels.crewTotal","إجمالي الفريق"),`${s.crewTotal} ${l}`)),j("financialSummary","discountAmount")&&de.push(P(c("reservations.details.labels.discount","الخصم"),`${s.discountAmount} ${l}`)),j("financialSummary","taxAmount")&&de.push(P(c("reservations.details.labels.tax","الضريبة"),`${s.taxAmount} ${l}`));const ae=j("financialSummary","finalTotal"),fe=[];ae&&fe.push(P(c("reservations.details.labels.total","الإجمالي النهائي"),`${s.finalTotal} ${l}`,{variant:"final"}));const K=fe.length?`<div class="totals-final">${fe.join("")}</div>`:"",le=V("financialSummary")?!de.length&&!ae?`<section class="quote-section quote-section--financial">${$}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${q(c("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${de.length?`<div class="totals-inline">${de.join("")}</div>`:""}
            ${K}
          </div>
        </section>`:"",{groups:Te}=_s(t),xe=Te.map(M=>{const Ee=Number(M?.count??M?.quantity??1)||1,at=Number(M?.unitPrice);let mt=Number.isFinite(at)?at:0;if(!mt||mt<=0){const Yt=Number(M?.totalPrice);Number.isFinite(Yt)&&Ee>0&&(mt=Number((Yt/Ee).toFixed(2)))}Number.isFinite(mt)||(mt=0);const jn=M?.type==="package"||Array.isArray(M?.items)&&M.items.some(Yt=>Yt?.type==="package"),Ln=Array.isArray(M?.barcodes)&&M.barcodes.length?M.barcodes[0]:Array.isArray(M?.items)&&M.items.length?M.items[0]?.barcode:null,ha=M?.packageDisplayCode??M?.package_code??M?.packageCode??M?.packageId??M?.package_id??M?.code??M?.barcode??(Array.isArray(M?.items)&&M.items.length?M.items[0]?.package_code??M.items[0]?.packageCode??M.items[0]?.packageId??M.items[0]?.package_id??M.items[0]?.code??M.items[0]?.barcode:null),Dn=jn?ha??Ln??"":M?.barcode??Ln??"",va=Dn!=null?String(Dn):"";let Jt=Number.isFinite(Number(M?.totalPrice))?Number(M.totalPrice):Number((mt*Ee).toFixed(2));return Jt=_e(Jt),{...M,isPackage:jn,desc:M?.description,barcode:va,qty:Ee,price:Jt,totalPrice:Jt,unitPriceValue:mt}}),De=wo.filter(M=>j("items",M.id)),Q=De.length>0,te=Q?De.map(M=>`<th>${q(M.labelKey?c(M.labelKey,M.fallback):M.fallback)}</th>`).join(""):"",Pe=xe.length>0?xe.map((M,Ee)=>`<tr>${De.map(at=>`<td>${at.render(M,Ee)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(De.length,1)}" class="empty">${q(c("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,ze=V("items")?Q?`<section class="quote-section quote-section--table">
            <h3>${q(c("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${te}</tr>
              </thead>
              <tbody>${Pe}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${q(c("reservations.details.items.title","المعدات"))}</h3>
            ${$}
          </section>`:"",ne=Eo.filter(M=>j("crew",M.id)),U=ne.length>0,he=U?ne.map(M=>`<th>${q(M.labelKey?c(M.labelKey,M.fallback):M.fallback)}</th>`).join(""):"",C=Array.isArray(i)?i:[],ie=C.length?C.map((M,Ee)=>`<tr>${ne.map(at=>`<td>${at.render(M,Ee)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(ne.length,1)}" class="empty">${q(c("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,ge=V("crew")?U?`<section class="quote-section quote-section--table">
            <h3>${q(c("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${he}</tr>
              </thead>
              <tbody>${ie}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${q(c("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${$}
          </section>`:"",ve=V("notes")?`<section class="quote-section">
        <h3>${q(c("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${q(x||c("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",pe=[];j("payment","beneficiary")&&pe.push(R(c("reservations.quote.labels.beneficiary","اسم المستفيد"),Ce.beneficiaryName)),j("payment","bank")&&pe.push(R(c("reservations.quote.labels.bank","اسم البنك"),Ce.bankName)),j("payment","account")&&pe.push(R(c("reservations.quote.labels.account","رقم الحساب"),v(Ce.accountNumber))),j("payment","iban")&&pe.push(R(c("reservations.quote.labels.iban","رقم الآيبان"),v(Ce.iban)));const Qe=`<section class="quote-section">
      <div class="payment-block">
        <h3>${q(c("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${pe.length?pe.join(""):$}</div>
      </div>
      <p class="quote-approval-note">${q(Ce.approvalNote)}</p>
    </section>`,$e=`<footer class="quote-footer">
        <h4>${q(c("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${z.map(M=>`<li>${q(M)}</li>`).join("")}</ul>
      </footer>`,He=[];B&&J?He.push(we(`<div class="quote-section-row">${B}${J}</div>`,{blockType:"group"})):(J&&He.push(we(J)),B&&He.push(we(B))),ee&&He.push(we(ee));const nt=[];ze&&nt.push(we(ze,{blockType:"table",extraAttributes:'data-table-id="items"'})),ge&&nt.push(we(ge,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const At=[];le&&At.push(we(le,{blockType:"summary"})),ve&&At.push(we(ve));const pn=[we(Qe,{blockType:"payment"}),we($e,{blockType:"footer"})],Wt=[...Xn(He,"reservations.quote.placeholder.page1"),...nt,...Xn(At,"reservations.quote.placeholder.page2"),...pn],ba=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${q(Ce.logoUrl)}" alt="${q(Ce.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${q(c("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${q(Ce.companyName)}</p>
        <p class="quote-company-cr">${q(c("reservations.quote.labels.cr","السجل التجاري"))}: ${q(Ce.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${q(p)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${q(y)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Lo}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${ba}
          ${Wt.join("")}
        </div>
      </div>
    </div>
  `}function Cd(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{o(),t()},i=()=>{o(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},o=()=>{e.removeEventListener("load",a),e.removeEventListener("error",i)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",i,{once:!0})}):Promise.resolve()}async function kn(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),i=t.fonts?.ready?t.fonts.ready:Promise.resolve(),o=a.map(r=>Cd(r)),s=[i,...o].map(r=>r.catch(l=>(ht("asset load failed",l),Vl(),null)));await Promise.all(s),await new Promise(r=>n.requestAnimationFrame(()=>r()))}async function Xo(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const i=e.querySelector("[data-quote-pages]"),o=e.querySelector("[data-quote-source]"),s=o?.querySelector("[data-quote-header-template]");if(!i||!o||!s)return;i.style.display="block",i.style.margin="0",i.style.padding="0",i.style.gap="0px",i.style.rowGap="0px",i.style.columnGap="0px",i.style.alignItems="stretch",i.style.justifyContent="flex-start",await Vo(o),await kn(o),i.innerHTML="";const r=Array.from(o.querySelectorAll(":scope > [data-quote-block]"));let l=null,d=null;const u=A=>{A.style.margin="0 auto",A.style.breakInside="avoid",A.style.pageBreakInside="avoid",A.style.pageBreakAfter="auto",A.style.breakAfter="auto"},p=()=>{const A=a.createElement("div"),E=i.childElementCount===0;if(A.className="quote-page",A.dataset.pageIndex=String(i.childElementCount),E){A.classList.add("quote-page--primary");const x=s.cloneNode(!0);x.removeAttribute("data-quote-header-template"),A.appendChild(x)}else A.classList.add("quote-page--continuation");const N=a.createElement("main");N.className="quote-body",A.appendChild(N),i.appendChild(A),u(A),l=A,d=N},y=()=>{(!l||!d||!d.isConnected)&&p()},f=()=>{if(!l||!d||d.childElementCount>0)return;const A=l;l=null,d=null,A.parentNode&&A.parentNode.removeChild(A)},m=()=>{l=null,d=null},h=()=>l?l.scrollHeight-l.clientHeight>Rl:!1,S=(A,{allowOverflow:E=!1}={})=>(y(),d.appendChild(A),h()&&!E?(d.removeChild(A),f(),!1):!0),k=A=>{const E=A.cloneNode(!0);E.removeAttribute?.("data-quote-block"),E.removeAttribute?.("data-block-type"),E.removeAttribute?.("data-table-id"),!S(E)&&(m(),!S(E)&&S(E,{allowOverflow:!0}))},_=A=>{const E=A.querySelector("table");if(!E){k(A);return}const N=A.querySelector("h3"),x=E.querySelector("thead"),z=Array.from(E.querySelectorAll("tbody tr"));if(!z.length){k(A);return}let b=null,j=0;const V=(L=!1)=>{const P=A.cloneNode(!1);P.removeAttribute("data-quote-block"),P.removeAttribute("data-block-type"),P.removeAttribute("data-table-id"),P.classList.add("quote-section--table-fragment"),L&&P.classList.add("quote-section--table-fragment--continued");const R=N?N.cloneNode(!0):null;R&&P.appendChild(R);const G=E.cloneNode(!1);G.classList.add("quote-table--fragment"),x&&G.appendChild(x.cloneNode(!0));const B=a.createElement("tbody");return G.appendChild(B),P.appendChild(G),{section:P,body:B}},$=(L=!1)=>b||(b=V(L),S(b.section)||(m(),S(b.section)||S(b.section,{allowOverflow:!0})),b);z.forEach(L=>{$(j>0);const P=L.cloneNode(!0);if(b.body.appendChild(P),h()&&(b.body.removeChild(P),b.body.childElementCount||(d.removeChild(b.section),b=null,f()),m(),b=null,$(j>0),b.body.appendChild(P),h())){b.section.classList.add("quote-section--table-fragment--overflow"),j+=1;return}j+=1}),b=null};if(!r.length)return;r.forEach(A=>{A.getAttribute("data-block-type")==="table"?_(A):k(A)});const I=Array.from(i.children),D=[];if(I.forEach((A,E)=>{const N=A.querySelector(".quote-body");if(E!==0&&(!N||N.childElementCount===0)){A.remove();return}D.push(A)}),!n){const A=a.defaultView||window,E=Math.min(3,Math.max(1,A.devicePixelRatio||1)),N=fa()?Math.min(2,E):E;D.forEach(x=>od(x,{pixelRatio:N}))}D.forEach((A,E)=>{const N=E===0;A.style.pageBreakAfter="auto",A.style.breakAfter="auto",A.style.pageBreakBefore=N?"auto":"always",A.style.breakBefore=N?"auto":"page",n?A.style.boxShadow="":A.style.boxShadow="none"});const O=D[D.length-1]||null;l=O,d=O?.querySelector(".quote-body")||null,await kn(i),n&&(i.style.display="flex",i.style.flexDirection="column",i.style.alignItems="center",i.style.justifyContent="flex-start",i.style.rowGap="18px",i.style.columnGap="0px",i.style.gap="18px")}function Ti(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function Td(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const i=Array.from(e.querySelectorAll(".quote-page"));if(!i.length)throw new Error("لا توجد صفحات لتصديرها.");const[o,s]=await Promise.all([cd(),rd()]),r=e.ownerDocument||document,l=r?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,l,r?.documentElement?.getAttribute?.("dir")].some(A=>typeof A=="string"&&A.toLowerCase().startsWith("rtl")),p=typeof window<"u"&&window.devicePixelRatio||1,y=Ni(),f=Mo(),m=fa();let h;m?h=1.5:f?h=Math.min(1.7,Math.max(1.2,p*1.1)):y?h=Math.min(1.8,Math.max(1.25,p*1.2)):h=Math.min(2,Math.max(1.6,p*1.4));const S=m||f?.9:y?.92:.95,k=new o({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),_={scale:h,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let I=0;const D=c("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let A=0;A<i.length;A+=1){const E=i[A];await Vo(E),await kn(E);const N=E.ownerDocument||document,x=N.createElement("div");Object.assign(x.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const z=E.cloneNode(!0);z.style.width=`${zn}px`,z.style.maxWidth=`${zn}px`,z.style.minWidth=`${zn}px`,z.style.height=`${Hn}px`,z.style.maxHeight=`${Hn}px`,z.style.minHeight=`${Hn}px`,z.style.position="relative",z.style.background="#ffffff",Ti(z),x.appendChild(z),N.body.appendChild(x);let b;try{await kn(z),b=await s(z,{..._,scale:h,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(B){throw Qa(B,"pageCapture",{toastMessage:D}),B}finally{x.parentNode?.removeChild(x)}if(!b)continue;const j=b.width||1,$=(b.height||1)/j;let L=Va,P=L*$,R=0;if(P>Mn){const B=Mn/P;P=Mn,L=L*B,R=Math.max(0,(Va-L)/2)}const G=b.toDataURL("image/jpeg",S);I>0&&k.addPage(),k.addImage(G,"JPEG",R,0,L,P,`page-${I+1}`,"FAST"),I+=1,await new Promise(B=>window.requestAnimationFrame(B))}}catch(A){throw Ga({safariWindowRef:n,mobileWindowRef:a}),A}if(I===0)throw Ga({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(f||m){const A=k.output("blob");if(m){const E=URL.createObjectURL(A);Sn();try{window.location.assign(E)}catch(N){ht("mobile safari blob navigation failed",N)}finally{setTimeout(()=>URL.revokeObjectURL(E),6e4)}}else{const E=URL.createObjectURL(A),N=()=>f&&n&&!n.closed?n:a&&!a.closed?a:null,x=(b,j)=>{if(Sn(),!b){window.location.assign(j);return}try{b.location.replace(j),b.focus?.()}catch(V){ht("direct blob navigation failed",V);try{b.document.open(),b.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${q(c("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${j}" title="PDF preview"></iframe></body></html>`),b.document.close()}catch($){ht("iframe blob delivery failed",$),window.location.assign(j)}}},z=N();x(z,E),setTimeout(()=>URL.revokeObjectURL(E),6e4)}}else{Sn();const A=k.output("bloburl"),E=document.createElement("a");E.href=A,E.download=t,E.rel="noopener",E.style.display="none",document.body.appendChild(E),E.click(),setTimeout(()=>{URL.revokeObjectURL(A),E.remove()},2e3)}}function Gt(){if(!T||!W)return;const{previewFrame:e}=W;if(!e)return;const t=T.context||"reservation",n=Yo({context:t,reservation:T.reservation,customer:T.customer,project:T.project,crewAssignments:T.crewAssignments,totals:T.totals,totalsDisplay:T.totalsDisplay,rentalDays:T.rentalDays,currencyLabel:T.currencyLabel,sections:T.sections,fieldSelections:T.fields,quoteNumber:T.quoteNumber,quoteDate:T.quoteDateLabel,terms:T.terms,projectCrew:T.projectCrew,projectExpenses:T.projectExpenses,projectEquipment:T.projectEquipment,projectInfo:T.projectInfo,clientInfo:T.clientInfo,paymentSummary:T.paymentSummary,projectTotals:T.projectTotals});Rt("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,i=a?.defaultView||window,o=a?.documentElement||a;o&&(ws(o),Es(o,i),xs(o,i));const s=a?.getElementById("quotation-pdf-root");try{s&&(await Xo(s,{context:"preview"}),Ti(s))}catch(f){console.error("[reservations/pdf] failed to layout preview document",f)}const r=Array.from(a?.querySelectorAll?.(".quote-page")||[]),l=a?.querySelector(".quote-preview-pages"),d=zn;let u=18;if(l&&a?.defaultView){const f=a.defaultView.getComputedStyle(l),m=parseFloat(f.rowGap||f.gap||`${u}`);Number.isFinite(m)&&m>=0&&(u=m)}const p=Hn,y=r.length?r.length*p+Math.max(0,(r.length-1)*u):p;if(e.dataset.baseWidth=String(d),e.dataset.baseHeight=String(y),e.style.width=`${d}px`,e.style.minWidth=`${d}px`,e.style.height=`${y}px`,e.style.minHeight=`${y}px`,W?.previewFrameWrapper&&!W?.userAdjustedZoom){const f=W.previewFrameWrapper.clientWidth-24;f>0&&f<d?lt=Math.max(f/d,.3):lt=1}er(lt)}finally{Sn()}},{once:!0})}function jd(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?T.sections.add(n):T.sections.delete(n),Qo(T),Zo(),Gt())}function Ld(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const i=T.context||"reservation",o=T.fields||(T.fields=ma(i)),s=Kl(o,n);t.checked?s.add(a):s.delete(a),Qo(T),Gt()}function Dd(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&($i(T,n),T.sectionExpansions[n]=t.open)}function Zo(){if(!W?.toggles||!T)return;const{toggles:e}=W,t=T.fields||{},n=T.context||"reservation";$i(T);const a=pa(n),i=No(n),o=a.map(({id:s,labelKey:r,fallback:l})=>{const d=c(r,l),u=T.sections.has(s),p=i[s]||[],y=Ul(T,s),f=p.length?`<div class="quote-toggle-sublist">
          ${p.map(m=>{const h=xi(t,s,m.id),S=u?"":"disabled",k=m.labelKey?c(m.labelKey,m.fallback):m.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${s}" data-field-id="${m.id}" ${h?"checked":""} ${S}>
                <span>${q(k)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${s}" ${y?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${s}" ${u?"checked":""}>
            <span>${q(d)}</span>
          </label>
          ${p.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${f}
      </details>
    `}).join("");e.innerHTML=o,e.querySelectorAll("input[data-section-toggle]").forEach(s=>{s.addEventListener("change",jd)}),e.querySelectorAll("input[data-field-toggle]").forEach(s=>{s.addEventListener("change",Ld)}),e.querySelectorAll("details[data-section-group]").forEach(s=>{s.addEventListener("toggle",Dd)})}function Bd(){if(W?.modal)return W;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${q(c("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${q(c("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
              <div class="quote-terms-editor" data-quote-terms-editor>
                <label class="quote-terms-editor__label" for="quote-terms-input">${q(c("reservations.quote.termsEditor.title","الشروط العامة (قابلة للتعديل)"))}</label>
                <textarea id="quote-terms-input" class="quote-terms-editor__textarea" rows="6" data-quote-terms-input placeholder="${q(c("reservations.quote.termsEditor.placeholder","اكتب كل شرط في سطر مستقل"))}"></textarea>
                <button type="button" class="quote-terms-reset" data-quote-terms-reset>${q(c("reservations.quote.termsEditor.reset","استعادة الشروط الافتراضية"))}</button>
              </div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${q(c("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${q(c("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),i=e.querySelector("[data-quote-terms-input]"),o=e.querySelector("[data-quote-terms-reset]"),s=e.querySelector("[data-quote-download]"),r=e.querySelector(".modal-header"),l=r?.querySelector(".btn-close"),d=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",r&&r.insertBefore(u,l||null);const p=document.createElement("iframe");p.className="quote-preview-frame",p.setAttribute("title",c("reservations.quote.previewTitle","معاينة عرض السعر")),p.setAttribute("loading","lazy"),p.setAttribute("frameborder","0");const y=document.createElement("div");y.className="quote-preview-zoom-controls",y.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${q(c("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${q(c("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${q(c("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const f=document.createElement("div");f.className="quote-preview-frame-wrapper",f.appendChild(p),n.innerHTML="";const m=document.createElement("div");m.className="quote-preview-scroll",m.appendChild(f),n.appendChild(m);const h=document.createElement("div");h.className="quote-preview-status",h.setAttribute("role","status"),h.setAttribute("aria-live","polite"),h.hidden=!0,h.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${q(jo("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(h),u.appendChild(y),s?.addEventListener("click",async()=>{if(T){s.disabled=!0;try{await tr()}finally{s.disabled=!1}}});const S=()=>{Ka()||Ua(e)};d.forEach(D=>{D?.addEventListener("click",S)}),l&&!d.includes(l)&&l.addEventListener("click",S),e.addEventListener("click",D=>{Ka()||D.target===e&&Ua(e)}),W={modal:e,toggles:t,preview:n,previewScroll:m,previewFrameWrapper:f,zoomControls:y,zoomValue:y.querySelector("[data-zoom-value]"),previewFrame:p,meta:a,downloadBtn:s,statusIndicator:h,statusText:h.querySelector("[data-quote-status-text]"),statusSpinner:h.querySelector("[data-quote-status-spinner]"),statusAction:h.querySelector("[data-quote-status-action]"),termsInput:i,termsReset:o,statusKind:null,userAdjustedZoom:!1};const k=y.querySelector("[data-zoom-out]"),_=y.querySelector("[data-zoom-in]"),I=y.querySelector("[data-zoom-reset]");return k?.addEventListener("click",()=>ds(-.1)),_?.addEventListener("click",()=>ds(.1)),I?.addEventListener("click",()=>Zn(1,{markManual:!0})),i&&i.addEventListener("input",Rd),o&&o.addEventListener("click",Md),Zn(lt),W}function Zn(e,{silent:t=!1,markManual:n=!1}={}){lt=Math.min(Math.max(e,.25),2.2),n&&W&&(W.userAdjustedZoom=!0),er(lt),!t&&W?.zoomValue&&(W.zoomValue.textContent=`${Math.round(lt*100)}%`)}function ds(e){Zn(lt+e,{markManual:!0})}function er(e){if(!W?.previewFrame||!W.previewFrameWrapper)return;const t=W.previewFrame,n=W.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,i=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",Ni()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${i}px`,n.style.height=`${i}px`}function Fd(){if(!W?.meta||!T)return;const{meta:e}=W;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${q(c("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${q(T.quoteNumber)}</strong></div>
      <div><span>${q(c("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${q(T.quoteDateLabel)}</strong></div>
    </div>
  `}function ji(){if(!W?.termsInput)return;const e=(T?.terms&&T.terms.length?T.terms:Ue).join(`
`);W.termsInput.value!==e&&(W.termsInput.value=e)}function Rd(e){if(!T)return;const t=za(e?.target?.value??"");if(t.length){T.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{T.terms=[...Ue],ji();const n=Ue.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const i=document.getElementById("edit-res-terms");i&&(i.value=n)}Gt()}function Md(e){if(e?.preventDefault?.(),!T)return;T.terms=[...Ue];const t=document.getElementById("reservation-terms");t&&(t.value=Ue.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=Ue.join(`
`)),ji(),Gt()}async function tr(){if(!T)return;Rt("export");const t=!Ni()&&Mo(),n=fa(),a=null,i=!n&&t?window.open("","_blank"):null;(l=>{if(l)try{l.document.open(),l.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${q(c("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${q(c("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${q(c("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),l.document.close()}catch(d){ht("failed to prime download window",d)}})(i);let s=null;const r=c("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await ld(),wa("html2pdf ensured");const l=T.context||"reservation",d=Yo({context:l,reservation:T.reservation,customer:T.customer,project:T.project,crewAssignments:T.crewAssignments,totals:T.totals,totalsDisplay:T.totalsDisplay,rentalDays:T.rentalDays,currencyLabel:T.currencyLabel,sections:T.sections,fieldSelections:T.fields,quoteNumber:T.quoteNumber,quoteDate:T.quoteDateLabel,terms:T.terms,projectCrew:T.projectCrew,projectExpenses:T.projectExpenses,projectEquipment:T.projectEquipment,projectInfo:T.projectInfo,clientInfo:T.clientInfo,paymentSummary:T.paymentSummary,projectTotals:T.projectTotals});s=document.createElement("div"),s.innerHTML=d,Object.assign(s.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(s),ws(s),Es(s),xs(s),wa("export container prepared");const u=s.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await Xo(u,{context:"export"}),await kn(u),Ti(u),wa("layout complete for export document")}catch(y){Qa(y,"layoutQuoteDocument",{suppressToast:!0})}}const p=`quotation-${T.quoteNumber}.pdf`;await Td(u,{filename:p,safariWindowRef:i,mobileWindowRef:a}),T.sequenceCommitted||(md(T.quoteSequence),T.sequenceCommitted=!0)}catch(l){Ga({container:s,safariWindowRef:i,mobileWindowRef:a}),s=null,Qa(l,"exportQuoteAsPdf",{toastMessage:r})}finally{s&&s.parentNode&&s.parentNode.removeChild(s),Sn()}}function nr(){const e=Bd();e?.modal&&(vn=!1,lt=1,W&&(W.userAdjustedZoom=!1),Zn(lt,{silent:!0}),Zo(),Fd(),ji(),Gt(),Ol(e.modal))}async function zd({reservation:e,customer:t,project:n}){if(!e){w(c("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=hd(e),{totalsDisplay:i,totals:o,rentalDays:s}=vd(e,a,n),r=c("reservations.create.summary.currency","SR"),{sequence:l,quoteNumber:d}=Ko("reservation"),u=new Date,p=Nl();T={context:"reservation",reservation:e,customer:t,project:n,crewAssignments:a,totals:o,totalsDisplay:i,rentalDays:s,currencyLabel:r,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(pa("reservation").filter(y=>y.defaultSelected).map(y=>y.id)),sectionExpansions:Pi("reservation"),fields:ma("reservation"),terms:p,quoteSequence:l,quoteNumber:d,quoteDate:u,quoteDateLabel:Wo(u),sequenceCommitted:!1},Go(T),nr()}async function $u({project:e}){if(!e){w(c("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=$d(e),{project:n}=t;if(!n){w(c("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:i}=Ko("project"),o=new Date,s=[...$l];T={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(pa("project").filter(r=>r.defaultSelected).map(r=>r.id)),sectionExpansions:Pi("project"),fields:ma("project"),terms:s,quoteSequence:a,quoteNumber:i,quoteDate:o,quoteDateLabel:Wo(o),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},Go(T),nr()}function Hd({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const i=qn(),{reservations:o=[],customers:s=[],technicians:r=[],projects:l=[]}=be(),d=o.map(_=>{const I=Mt(_);return{...I,id:_.id??I.id,reservationId:_.reservationId??_.reservation_id??I.reservationId,reservationCode:_.reservationCode??_.reservation_code??I.reservationCode}}),u=d,p=Array.isArray(i)?i:r||[],y=new Map((l||[]).map(_=>[String(_.id),_])),f=document.getElementById(e);if(!f){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!u||u.length===0){f.innerHTML=`<p>${c("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const m=t||_l(),h=new Map(s.map(_=>[String(_.id),_])),S=new Map(p.map(_=>[String(_.id),_])),k=wl({reservations:d,filters:m,customersMap:h,techniciansMap:S,projectsMap:y});if(k.length===0){f.innerHTML=`<p>${c("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}f.innerHTML=`<div class="reservations-grid">${El({entries:k,customersMap:h,techniciansMap:S,projectsMap:y})}</div>`,f.querySelectorAll('[data-action="details"]').forEach(_=>{const I=Number(_.dataset.reservationIndex);Number.isNaN(I)||_.addEventListener("click",()=>{typeof n=="function"&&n(I)})}),f.querySelectorAll('button[data-action="confirm"]').forEach(_=>{const I=Number(_.dataset.reservationIndex);Number.isNaN(I)||_.addEventListener("click",D=>{D.stopPropagation(),typeof a=="function"&&a(I,D)})})}function Od(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:i=[],customers:o=[],projects:s=[]}=be(),r=i.map(h=>{const S=Mt(h);return{...S,id:h.id??S.id,reservationId:h.reservationId??h.reservation_id??S.reservationId,reservationCode:h.reservationCode??h.reservation_code??S.reservationCode}}),l=i[e];if(!l)return w(c("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=r[e]??Mt(l),u=o.find(h=>String(h.id)===String(l.customerId)),p=l.projectId?s.find(h=>String(h.id)===String(l.projectId)):null,y=document.getElementById("reservation-details-body"),f=document.getElementById("reservationDetailsModal"),m=()=>{const h=()=>{f&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(f)?.hide()},S=document.getElementById("reservation-details-edit-btn");S&&(S.onclick=()=>{h(),typeof t=="function"&&t(e,{reservation:l,customer:u,getEditContext:a})});const k=document.getElementById("reservation-details-delete-btn");k&&(k.onclick=()=>{h(),typeof n=="function"&&n(e,{reservation:l,customer:u})});const _=y?.querySelector('[data-action="open-project"]');_&&p&&_.addEventListener("click",()=>{h();const D=p?.id!=null?String(p.id):"",O=D?`projects.html?project=${encodeURIComponent(D)}`:"projects.html";window.location.href=O});const I=document.getElementById("reservation-details-export-btn");I&&(I.onclick=async D=>{D?.preventDefault?.(),D?.stopPropagation?.(),I.blur();try{await zd({reservation:l,customer:u,project:p})}catch(O){console.error("❌ [reservations] export to PDF failed",O),w(c("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}})};if(y){const h=qn()||[];y.innerHTML=as(d,u,h,e,p),m(),qs().then(()=>{const S=qn()||[];y.innerHTML=as(d,u,S,e,p),m()}).catch(()=>{})}return f&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(f).show(),!0}function un(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:In(e,n),end:In(t,a)}}function ea(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Li(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function ar(){const{container:e,select:t,hint:n,addButton:a}=Li();if(!t)return;const i=t.value,o=vs(),s=c("reservations.create.summary.currency","SR"),r=`<option value="" disabled selected>${c("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,l=o.map(u=>{const p=Number.isFinite(Number(u.price))?Number(u.price):0,y=v(p.toFixed(2)),f=`${u.name} — ${y} ${s}`;return`<option value="${ea(u.id)}">${ea(f)}</option>`}).join("");t.innerHTML=`${r}${l}`;const d=o.length>0;t.disabled=!d,a&&(a.disabled=!d),e&&(e.hidden=!d,e.setAttribute("aria-hidden",d?"false":"true")),n&&(d?(n.textContent=c("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=c("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),d&&i&&o.some(u=>u.id===i)?t.value=i:t.selectedIndex=0}function Vd(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||w(c("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:i=[]}=Nt(),{start:o,end:s}=un(),{reservations:r=[]}=be(),l=a!=null&&r[a]||null,d=l?.id??l?.reservationId??null,u=ho(n,{existingItems:i,start:o,end:s,ignoreReservationId:d});if(!u.success)return t||w(u.message||c("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const p=[...i,u.package];return Ct(a,p),$t(p),Re(),t||w(c("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function us(){const{select:e}=Li();if(!e)return;const t=e.value||"";Vd(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function Kd(){const{addButton:e,select:t}=Li();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{us()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),us())}),t.dataset.listenerAttached="true"),ar()}function $t(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=c("reservations.create.equipment.none","لا توجد معدات"),a=c("reservations.create.summary.currency","SR"),i=c("reservations.create.equipment.imageAlt","صورة"),o=c("reservations.equipment.actions.increase","زيادة الكمية"),s=c("reservations.equipment.actions.decrease","تقليل الكمية"),r=c("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,ms(t);return}const l=dn(e);t.innerHTML=l.map(d=>{const u=d.items[0]||{},p=Ot(u)||d.image,y=p?`<img src="${p}" alt="${i}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',f=d.items.some(b=>b?.type==="package"),m=v(String(d.count)),h=qe(d.unitPrice),S=Number.isFinite(h)?_e(h):0,k=qe(d.totalPrice),_=Number.isFinite(k)?k:S*(Number.isFinite(d.count)?d.count:1),I=_e(_),D=`${v(S.toFixed(2))} ${a}`,O=`${v(I.toFixed(2))} ${a}`,A=d.barcodes.map(b=>v(String(b||""))).filter(Boolean),E=A.length?`<details class="reservation-item-barcodes">
            <summary>${c("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${A.map(b=>`<li>${b}</li>`).join("")}
            </ul>
          </details>`:"";let N="";if(f){const b=new Map,j=$=>{const L=Number.parseFloat(v(String($??"")).replace(/[^0-9.]/g,""));return!Number.isFinite(L)||L<=0||L>99?1:Math.round(L)},V=[];if(Array.isArray(d.packageItems)&&d.packageItems.length&&V.push(...d.packageItems),d.items.forEach($=>{Array.isArray($?.packageItems)&&V.push(...$.packageItems)}),V.forEach($=>{if(!$)return;const L=Y($.barcode||$.normalizedBarcode||$.desc||Math.random());if(!L)return;const P=b.get(L),R=j($.qtyPerPackage??$.perPackageQty??$.quantityPerPackage??$.qty??$.quantity??1),G=Math.max(1,Math.min(R,99));if(P){P.qty=G;return}b.set(L,{desc:$.desc||$.barcode||c("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:G,barcode:$.barcode??$.normalizedBarcode??""})}),b.size){const $=Array.from(b.values()).map(L=>{const P=v(String(L.qty>0?Math.min(L.qty,99):1)),R=ea(L.desc||""),G=L.barcode?` <span class="reservation-package-items__barcode">(${ea(v(String(L.barcode)))})</span>`:"";return`<li>${R}${G} × ${P}</li>`}).join("");N=`
            <details class="reservation-package-items">
              <summary>${c("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${$}
              </ul>
            </details>
          `}}const x=f?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",z=f?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${d.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${y}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${d.description||"-"}</div>
                ${f?`${N||""}${E||""}`:E}
              </div>
            </div>
          </td>
          <td>
            <div class="${x}" data-group-key="${d.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${d.key}" aria-label="${s}"${z}>−</button>
              <span class="reservation-qty-value">${m}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${d.key}" aria-label="${o}"${z}>+</button>
            </div>
          </td>
          <td>${D}</td>
          <td>${O}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${r}">🗑️</button>
          </td>
        </tr>
      `}).join(""),ms(t)}function Ud(e){switch(e){case"amount":return c("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return c("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return c("reservations.paymentHistory.type.unknown","دفعة")}}function ya(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=ga();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${c("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,ps();return}const n=c("reservations.create.summary.currency","SR"),a=t.map((i,o)=>{const s=Number.isFinite(Number(i?.amount))&&Number(i.amount)>0?`${v(Number(i.amount).toFixed(2))} ${n}`:"—",r=Number.isFinite(Number(i?.percentage))&&Number(i.percentage)>0?`${v(Number(i.percentage).toFixed(2))}%`:"—",l=i?.recordedAt?v(Je(i.recordedAt)):"—",d=Ud(i?.type),u=i?.note?v(i.note):"";return`
      <tr>
        <td>${d}</td>
        <td>${s}</td>
        <td>${r}</td>
        <td>${l}</td>
        <td>${u}</td>
        <td class="reservation-payment-history__actions">
          <button type="button" class="btn btn-link btn-sm reservation-payment-history__remove" data-action="remove-payment" data-index="${o}" aria-label="${c("reservations.paymentHistory.actions.delete","حذف الدفعة")}">🗑️</button>
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
        <tbody>${a}</tbody>
      </table>
    </div>
  `,ps()}function Qd(){if(wn()){w(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=cr(e);let a=lr(t);if(!Number.isFinite(a)||a<=0){w(c("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const i=xa.lastResult,o=Number(i?.total)||0,s=Number(i?.paidPercent)||0,r=Number(i?.paidAmount)||0,l=c("reservations.create.summary.currency","SR");let d=null,u=null;if(n==="percent"){const y=Math.max(0,100-s);if(y<=1e-4){w(c("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const f=Math.min(a,y);if(f!==a){const m=v(f.toFixed(2));w(c("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",m)),a=f}u=Number(a.toFixed(2)),o>0&&(d=a/100*o)}else{const y=Math.max(0,o-r);if(y<=1e-4){w(c("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const f=Math.min(a,y);if(f!==a){const m=`${v(f.toFixed(2))} ${l}`;w(c("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",m)),a=f}d=Number(a.toFixed(2)),o>0&&(u=d/o*100)}d!=null&&(d=Number(d.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const p={type:n,value:a,amount:d,percentage:u,recordedAt:new Date().toISOString()};iu(p),Di(ga()),ya(),Re(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),w(c("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function ps(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(wn()){n.preventDefault(),w(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Qd()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(wn()){n.preventDefault(),w(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const i=Number(a.dataset.index);Number.isNaN(i)||(su(i),Di(ga()),ya(),Re(),w(c("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function Gd(e){const{index:t,items:n}=Nt(),i=dn(n).find(r=>r.key===e);if(!i||i.items.some(r=>r?.type==="package"))return;const o=i.itemIndices[i.itemIndices.length-1];if(o==null)return;const s=n.filter((r,l)=>l!==o);Ct(t,s),$t(s),Re()}function Wd(e){const{index:t,items:n}=Nt(),a=n.filter(i=>oa(i)!==e);a.length!==n.length&&(Ct(t,a),$t(a),Re())}function Jd(e){const{index:t,items:n}=Nt(),i=dn(n).find(S=>S.key===e);if(!i||i.items.some(S=>S?.type==="package"))return;const{start:o,end:s}=un();if(!o||!s){w(c("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:r=[]}=be(),l=t!=null&&r[t]||null,d=l?.id??l?.reservationId??null,u=new Set(n.map(S=>Y(S.barcode))),{equipment:p=[]}=be(),y=(p||[]).find(S=>{const k=Y(S?.barcode);return!k||u.has(k)||oa({desc:S?.desc||S?.description||S?.name||"",price:Number(S?.price)||0})!==e||!gs(S)?!1:!St(k,o,s,d)});if(!y){w(c("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const f=Y(y.barcode),m=Vt(y);if(!m){w(c("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const h=[...n,{id:m,equipmentId:m,barcode:f,desc:y.desc||y.description||y.name||i.description||"",qty:1,price:Number.isFinite(Number(y.price))?Number(y.price):i.unitPrice,image:Ot(y)}];Ct(t,h),$t(h),Re()}function ms(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:i,itemIndex:o}=n.dataset;if(a==="decrease-edit-group"&&i){Gd(i);return}if(a==="increase-edit-group"&&i){Jd(i);return}if(a==="remove-edit-group"&&i){Wd(i);return}if(a==="remove-edit-item"){const s=Number(o);Number.isNaN(s)||Zd(s)}}),e.dataset.groupListenerAttached="true")}function wn(){return!!document.getElementById("edit-res-project")?.value}function Yd(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{wn()&&(w(c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>a.addEventListener(i,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function Xd(e){const t=c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),i=document.getElementById("edit-res-paid"),o=document.getElementById("edit-res-payment-progress-type"),s=document.getElementById("edit-res-payment-progress-value"),r=document.getElementById("edit-res-payment-add"),l=document.getElementById("edit-res-payment-history");[n,a,i,o,s,r,l].forEach(Yd),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),i&&(i.value="unpaid",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t,i.dataset&&delete i.dataset.userSelected),o&&(o.value=o.value||"percent",o.disabled=!0,o.classList.add("reservation-input-disabled"),o.title=t),s&&(s.value="",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t),r&&(r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),l&&(l.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),o&&(o.disabled=!1,o.classList.remove("reservation-input-disabled"),o.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),l&&(l.dataset.linkedDisabled="false"))}function Re(){const e=document.getElementById("edit-res-summary");if(!e)return;ya();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),We(a),Re()}),a.dataset.listenerAttached="true");const i=v(t?.value||"0");t&&(t.value=i);const o=parseFloat(i)||0,s=n?.value||"percent",r=wn();Xd(r);const l=document.getElementById("edit-res-tax"),d=r?!1:l?.checked||!1,u=!r&&a?.dataset?.userSelected==="true",p=r?"unpaid":u&&a?.value||"unpaid";let y=null;!r&&d&&(tt("edit-res-company-share"),y=on("edit-res-company-share"),(!Number.isFinite(y)||y<=0)&&(tt("edit-res-company-share"),y=on("edit-res-company-share")));const{items:f=[],payments:m=[]}=Nt(),{start:h,end:S}=un(),k=xa({items:f,discount:o,discountType:s,applyTax:d,paidStatus:p,start:h,end:S,companySharePercent:y,paymentHistory:m});e.innerHTML=k;const _=xa.lastResult;if(_&&a){const I=_.paymentStatus;u?We(a,a.value):(a.value!==I&&(a.value=I),a.dataset&&delete a.dataset.userSelected,We(a,I))}else a&&We(a,a.value)}function Zd(e){if(e==null)return;const{index:t,items:n}=Nt();if(!Array.isArray(n))return;const a=n.filter((i,o)=>o!==e);Ct(t,a),$t(a),Re()}function eu(e){const t=e?.value??"",n=Y(t);if(!n)return;const a=ni(n);if(!a){w(c("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const i=Et(a);if(i==="maintenance"||i==="retired"){w(Ht(i));return}const o=Y(n),{index:s,items:r=[]}=Nt();if(r.findIndex(S=>Y(S.barcode)===o)>-1){w(c("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=un();if(!d||!u){w(c("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:p=[]}=be(),y=s!=null&&p[s]||null,f=y?.id??y?.reservationId??null;if(St(o,d,u,f)){w(c("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=Vt(a);if(!m){w(c("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const h=[...r,{id:m,equipmentId:m,barcode:o,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];Ct(s,h),e&&(e.value=""),$t(h),Re()}function ta(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=fo(t),a=Y(n?.barcode||t);if(!n||!a){w(c("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const i=Et(n);if(i==="maintenance"||i==="retired"){w(Ht(i));return}const{start:o,end:s}=un();if(!o||!s){w(c("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:r,items:l=[]}=Nt();if(l.some(h=>Y(h.barcode)===a)){w(c("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=be(),p=r!=null&&u[r]||null,y=p?.id??p?.reservationId??null;if(St(a,o,s,y)){w(c("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const f=Vt(n);if(!f){w(c("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const m=[...l,{id:f,equipmentId:f,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];Ct(r,m),$t(m),Re(),e.value=""}function ir(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),ta(e))});const t=()=>{yo(e.value,"edit-res-equipment-description-options")&&ta(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{Re()});const e=()=>{Kd()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{ar()})}typeof window<"u"&&(window.getEditReservationDateRange=un,window.renderEditPaymentHistory=ya);function tu(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){Ra(e);return}ta(e)}}function sr(){Pt(),ir()}function or(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let an=null,rt=[],ut=[],Wa=null,Me={},Ea=!1;const nu="__DEBUG_CREW__";function au(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(nu);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function fs(e,t){if(au())try{console.log(`🪵 [crew-debug:edit] ${e}`,t)}catch{}}function Ja(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),i=document.getElementById("edit-res-confirmed-wrapper"),o=!!e;if(n&&(n.value=o?"true":"false"),a){const s=a.dataset.confirmLabel||"✅ تم التأكيد",r=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=o?s:r,a.dataset.state=o?"confirmed":"pending",a.classList.toggle("btn-success",o&&!t),a.classList.toggle("btn-outline-secondary",!o||t),a.disabled=t,a.setAttribute("aria-pressed",o?"true":"false")}i&&i.classList.toggle("is-disabled",t)}function Ya(){return document.getElementById("edit-res-confirmed")?.value==="true"}function Nt(){return{index:an,items:rt,payments:ut}}function Ct(e,t,n=ut){an=typeof e=="number"?e:null,rt=Array.isArray(t)?[...t]:[],ut=Array.isArray(n)?[...n]:[]}function rr(){an=null,rt=[],fc(),ut=[]}function ga(){return[...ut]}function Di(e){ut=Array.isArray(e)?[...e]:[]}function iu(e){e&&(ut=[...ut,e])}function su(e){!Number.isInteger(e)||e<0||(ut=ut.filter((t,n)=>n!==e))}function _n(e,t=1){const n=Number.parseFloat(v(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function Xa(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(v(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function ou(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?Y(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:_n(e.qty??e.quantity??e.count??1),price:Xa(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function ru(e,t=0){if(!e||typeof e!="object")return null;const n=Ye(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=_n(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),o=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:tn(e)).map(y=>ou(y)).filter(Boolean),s=e.total_price??e.totalPrice??e.total??null;let r=Xa(e.unit_price??e.unitPrice??e.price??null,0);if((!r||r===0)&&s!=null){const y=Xa(s,0);y>0&&a>0&&(r=Number((y/a).toFixed(2)))}const l=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,l,n].find(y=>y!=null&&String(y).trim()!=="")||`Package ${n}`,p=e.image??e.cover??e.thumbnail??o.find(y=>y?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:v(String(u)),name:v(String(u)),qty:a,price:r,barcode:l,packageItems:o,image:p}}function cu(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const i=e.get(a);if(i==null)return;const o=i-n;e.set(a,o>0?o:0)})}function lu(e={},t=[]){const n=Array.isArray(t)?t.map(r=>({...r})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const i=a.map((r,l)=>ru(r,l)).filter(Boolean);if(!i.length)return n;const o=new Map;i.forEach(r=>{const l=_n(r.qty??r.quantity??1);if(r.barcode){const d=Y(r.barcode);if(d){const u=`package::${d}`;o.set(u,(o.get(u)??0)+l)}}(r.packageItems||[]).forEach(d=>{if(!d)return;const u=l*_n(d.qty??d.quantity??1),p=d.equipmentId??null,y=d.normalizedBarcode||(d.barcode?Y(d.barcode):null);if(p!=null){const f=`equipment::${String(p)}`;o.set(f,(o.get(f)??0)+u)}if(y){const f=`barcode::${y}`;o.set(f,(o.get(f)??0)+u)}})});const s=[];return n.forEach(r=>{if(!r||typeof r!="object"){s.push(r);return}if(r.type==="package"){const S=Ye(r.packageId??r.package_id??r.id??"");i.some(_=>_.packageId===S)||s.push({...r});return}const l=_n(r.qty??r.quantity??1),d=Vt(r),u=r.barcode?Y(r.barcode):null,p=[];d!=null&&p.push(`equipment::${String(d)}`),u&&p.push(`barcode::${u}`);const y=p.map(S=>o.get(S)??0).filter(S=>S>0);if(!y.length){s.push({...r});return}const f=Math.min(...y);if(f<=0){s.push({...r});return}const m=Math.min(f,l);if(cu(o,p,m),m>=l)return;const h=l-m;s.push({...r,qty:h,quantity:h})}),[...s,...i.map(r=>({...r}))]}function du(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function cr(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function lr(e){if(!e)return null;const t=v(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function uu(e,t){if(e){e.value="";return}}function gn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function dr(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(v(String(e.value??""))),a=Number.parseFloat(v(String(e.amount??""))),i=Number.parseFloat(v(String(e.percentage??""))),o=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,s=Number.isFinite(i)?i:t==="percent"&&Number.isFinite(n)?n:null,r=t??(Number.isFinite(o)?"amount":Number.isFinite(s)?"percent":null),l=r==="amount"?o??null:r==="percent"?s??null:Number.isFinite(n)?n:null,d=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:r,value:l,amount:Number.isFinite(o)?o:null,percentage:Number.isFinite(s)?s:null,note:e.note??null,recordedAt:d}}function pu(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=c("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),i=c("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),o=t?.projectId?String(t.projectId):"",s=Array.isArray(e)?[...e].sort((l,d)=>String(d.createdAt||d.start||"").localeCompare(String(l.createdAt||l.start||""))):[],r=[`<option value="">${gn(a)}</option>`];s.forEach(l=>{r.push(`<option value="${gn(l.id)}">${gn(l.title||a)}</option>`)}),o&&!s.some(l=>String(l.id)===o)&&r.push(`<option value="${gn(o)}">${gn(i)}</option>`),n.innerHTML=r.join(""),o?n.value=o:n.value=""}function ur(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),i=document.getElementById("edit-res-discount-type"),o=c("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=o),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=o),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=o),i&&(i.value="percent",i.disabled=!0,i.classList.add("disabled","reservation-input-disabled"),i.title=o);else{if(t){const l=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",l&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),i&&(i.disabled=!1,i.classList.remove("disabled","reservation-input-disabled"),i.title="")}Za("tax");const r=Me?.updateEditReservationSummary;typeof r=="function"&&r()}function Za(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const o=Me?.updateEditReservationSummary;typeof o=="function"&&o()};if(Ea){a();return}Ea=!0;const i=()=>{Ea=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(vt)),t.disabled){n.checked=!1,w(c("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),i();return}t.checked||(t.checked=!0),tt("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?tt("edit-res-company-share"):n.checked&&(n.checked=!1));i()}async function ys(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:i,updateEditReservationSummary:o,ensureModal:s}={}){const{customers:r,projects:l}=be(),u=ui()?.[e];if(!u){w(c("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}Me={...Me,reservation:u,projects:l||[]},t?.(),pu(l||[],u);const p=u.projectId&&l?.find?.(F=>String(F.id)===String(u.projectId))||null,{effectiveConfirmed:y,projectLinked:f}=Kt(u,p),m=u.items?u.items.map(F=>({...F,equipmentId:F.equipmentId??F.equipment_id??F.id,barcode:Y(F?.barcode)})):[],h=lu(u,m),k=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(F=>dr(F)).filter(Boolean);Ct(e,h,k);const _=c("reservations.list.unknownCustomer","غير معروف"),I=r?.find?.(F=>String(F.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const D=document.getElementById("edit-res-id");D&&(D.value=u.reservationId||u.id);const O=document.getElementById("edit-res-customer");O&&(O.value=I?.customerName||_);const A=typeof a=="function"?a(u.start):{date:"",time:""},E=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",A.date),n?.("edit-res-start-time",A.time),n?.("edit-res-end",E.date),n?.("edit-res-end-time",E.time);const N=document.getElementById("edit-res-notes");N&&(N.value=u.notes||"");const x=document.getElementById("edit-res-discount");if(x){const F=f?0:u.discount??0;x.value=v(F)}const z=document.getElementById("edit-res-discount-type");z&&(z.value=f?"percent":u.discountType||"percent");const b=u.projectId?!1:!!u.applyTax,j=document.getElementById("edit-res-tax");j&&(j.checked=b);const V=document.getElementById("edit-res-company-share");if(V){const F=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,J=F!=null?Number.parseFloat(v(String(F).replace("%","").trim())):NaN,X=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,ee=X!=null?X===!0||X===1||X==="1"||String(X).toLowerCase()==="true":Number.isFinite(J)&&J>0,de=ee&&Number.isFinite(J)&&J>0?J:vt,ae=b||ee;V.checked=ae,V.dataset.companyShare=String(de)}Ja(y,{disable:f});const $=document.getElementById("edit-res-paid"),L=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");$&&($.value=L,$.dataset&&delete $.dataset.userSelected);const P=document.getElementById("edit-res-payment-progress-type"),R=document.getElementById("edit-res-payment-progress-value");P?.dataset?.userSelected&&delete P.dataset.userSelected,P&&(P.value="percent"),uu(R);let G=Array.isArray(u.crewAssignments)&&u.crewAssignments.length?u.crewAssignments:Array.isArray(u.techniciansDetails)&&u.techniciansDetails.length?u.techniciansDetails:(u.technicians||[]).map(F=>String(F));if(!Array.isArray(G)||G.length===0){const F=Hs(u.id??u.reservationId??u.reservation_code??null);Array.isArray(F)&&F.length&&(G=F)}try{await qs()}catch(F){console.warn("[reservationsEdit] positions load failed (non-fatal)",F)}if(yc(G),i?.(h),typeof window<"u"){const F=window?.renderEditPaymentHistory;typeof F=="function"&&F()}ur(),o?.();const B=document.getElementById("editReservationModal");Wa=du(B,s),Wa?.show?.()}async function mu({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:i,renderReservations:o,populateEquipmentDescriptionLists:s,handleReservationsMutation:r}={}){if(an===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const l=document.getElementById("edit-res-start")?.value?.trim(),d=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),p=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",y=document.getElementById("edit-res-notes")?.value||"",f=v(document.getElementById("edit-res-discount")?.value||"0");let m=parseFloat(f)||0,h=document.getElementById("edit-res-discount-type")?.value||"percent";const S=Ya(),k=document.getElementById("edit-res-paid"),_=k?.dataset?.userSelected==="true",I=_&&k?.value||"unpaid",D=document.getElementById("edit-res-payment-progress-type"),O=document.getElementById("edit-res-payment-progress-value"),A=cr(D),E=lr(O),N=document.getElementById("edit-res-project")?.value||"",x=mc();x.map(U=>U?.technicianId).filter(Boolean);const z=document.getElementById("edit-res-company-share"),b=document.getElementById("edit-res-tax");if(!l||!u){w(c("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const j=typeof e=="function"?e:(U,he)=>`${U}T${he||"00:00"}`,V=j(l,d),$=j(u,p);if(V&&$&&new Date(V)>new Date($)){w(c("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const P=ui()?.[an];if(!P){w(c("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(rt)||rt.length===0&&x.length===0){w(c("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const R=typeof t=="function"?t:()=>!1,G=P.id??P.reservationId;for(const U of rt){if(U?.type==="package"&&Array.isArray(U.packageItems)){for(const C of U.packageItems){const ie=C?.barcode??C?.normalizedBarcode??"";if(!ie)continue;const ge=Et(ie);if(ge==="reserved"){const ve=Y(ie);if(!R(ve,V,$,G))continue}if(ge!=="available"){w(Ht(ge));return}}continue}const he=Et(U.barcode);if(he==="reserved"){const C=Y(U.barcode);if(!R(C,V,$,G))continue}if(he!=="available"){w(Ht(he));return}}for(const U of rt){if(U?.type==="package"&&Array.isArray(U.packageItems)){for(const C of U.packageItems){const ie=Y(C?.barcode??C?.normalizedBarcode??"");if(ie&&R(ie,V,$,G)){const ge=C?.desc||C?.barcode||c("reservations.create.packages.unnamedItem","معدة بدون اسم"),ve=`${c("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${v(String(ge))})`;w(ve);return}}continue}const he=Y(U.barcode);if(R(he,V,$,G)){w(c("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const B=typeof n=="function"?n:()=>!1;for(const U of rt){if(U?.type!=="package")continue;const he=U.packageId??U.package_id??null;if(he&&B(he,V,$,G)){const C=U.desc||U.packageName||c("reservations.create.packages.genericName","الحزمة");w(c("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${v(String(C))} محجوزة بالفعل في الفترة المختارة`));return}}const F=typeof a=="function"?a:()=>!1;for(const U of x)if(U?.technicianId&&F(U.technicianId,V,$,G)){w(c("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const J=Array.isArray(Me.projects)&&Me.projects.length?Me.projects:be().projects||[],X=N&&J.find(U=>String(U.id)===String(N))||null,ee={...P,projectId:N?String(N):null,confirmed:S},{effectiveConfirmed:de,projectLinked:ae,projectStatus:fe}=Kt(ee,X);let K=!!z?.checked,le=!!b?.checked;if(ae&&(K&&(z.checked=!1,K=!1),le=!1),!ae&&K!==le){w(c("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}le&&(tt("edit-res-company-share"),K=!!z?.checked);let Te=K?getCompanySharePercent("edit-res-company-share"):null;K&&(!Number.isFinite(Te)||Te<=0)&&(tt("edit-res-company-share"),Te=getCompanySharePercent("edit-res-company-share"));const xe=K&&le&&Number.isFinite(Te)&&Te>0,De=ae?!1:le;ae&&(m=0,h="percent");const Q=ai(rt,m,h,De,x,{start:V,end:$,companySharePercent:xe?Te:0});let te=ga();if(Number.isFinite(E)&&E>0){const U=Q;let he=null,C=null;A==="amount"?(he=E,U>0&&(C=E/U*100)):(C=E,U>0&&(he=E/100*U));const ie=dr({type:A,value:E,amount:he,percentage:C,recordedAt:new Date().toISOString()});ie&&(te=[...te,ie],Di(te)),O&&(O.value="")}const ue=ia({totalAmount:Q,history:te}),Pe=sa({manualStatus:I,paidAmount:ue.paidAmount,paidPercent:ue.paidPercent,totalAmount:Q});k&&!_&&(k.value=Pe,k.dataset&&delete k.dataset.userSelected);let ze=P.status??"pending";ae?ze=X?.status??fe??ze:["completed","cancelled"].includes(String(ze).toLowerCase())||(ze=S?"confirmed":"pending");const ne=mi({reservationCode:P.reservationCode??P.reservationId??null,customerId:P.customerId,start:V,end:$,status:ze,title:P.title??null,location:P.location??null,notes:y,projectId:N?String(N):null,totalAmount:Q,discount:m,discountType:h,applyTax:De,paidStatus:Pe,confirmed:de,items:rt.map(U=>({...U,equipmentId:U.equipmentId??U.id})),crewAssignments:x,companySharePercent:xe?Te:null,companyShareEnabled:xe,paidAmount:ue.paidAmount,paidPercentage:ue.paidPercent,paymentProgressType:ue.paymentProgressType,paymentProgressValue:ue.paymentProgressValue,paymentHistory:te});try{fs("about to submit",{editingIndex:an,crewAssignments:x,techniciansPayload:ne?.technicians,payload:ne});const U=await pi(P.id||P.reservationId,ne);fs("server response",{reservation:U?.id??U?.reservationId??U?.reservation_code,technicians:U?.technicians,crewAssignments:U?.crewAssignments,techniciansDetails:U?.techniciansDetails}),await Vs(),ti(),sc(),w(c("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),i?.(),rr(),r?.({type:"updated",reservation:U}),o?.(),s?.(),Wa?.hide?.()}catch(U){console.error("❌ [reservationsEdit] Failed to update reservation",U);const he=hi(U)?U.message:c("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");w(he,"error")}}function pr(e={}){Me={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:i}=Me,o=document.getElementById("edit-res-discount");o&&!o.dataset.listenerAttached&&(o.addEventListener("input",()=>{o.value=v(o.value),t?.()}),o.dataset.listenerAttached="true");const s=document.getElementById("edit-res-discount-type");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>t?.()),s.dataset.listenerAttached="true");const r=document.getElementById("edit-res-tax");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{Za("tax")}),r.dataset.listenerAttached="true");const l=document.getElementById("edit-res-company-share");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{Za("share")}),l.dataset.listenerAttached="true");const d=document.getElementById("edit-res-payment-progress-type");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{d.dataset.userSelected="true",t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=v(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const p=document.getElementById("edit-res-project");p&&!p.dataset.listenerAttached&&(p.addEventListener("change",()=>{ur();const S=Array.isArray(Me.projects)&&Me.projects.length?Me.projects:be().projects||[],k=p.value&&S.find(A=>String(A.id)===String(p.value))||null,I={...Me?.reservation??{},projectId:p.value||null,confirmed:Ya()},{effectiveConfirmed:D,projectLinked:O}=Kt(I,k);Ja(D,{disable:O}),t?.()}),p.dataset.listenerAttached="true");const y=document.getElementById("edit-res-confirmed-btn");y&&!y.dataset.listenerAttached&&(y.addEventListener("click",()=>{if(y.disabled)return;const S=!Ya();Ja(S),t?.()}),y.dataset.listenerAttached="true");const f=document.getElementById("save-reservation-changes");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{mu(Me).catch(S=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",S)})}),f.dataset.listenerAttached="true");const m=document.getElementById("edit-res-equipment-barcode");if(m&&!m.dataset.listenerAttached){let S=null;const k=()=>{m.value?.trim()&&(clearTimeout(S),S=null,n?.(m))};m.addEventListener("keydown",I=>{I.key==="Enter"&&(I.preventDefault(),k())});const _=()=>{if(clearTimeout(S),!m.value?.trim())return;const{start:I,end:D}=getEditReservationDateRange();!I||!D||(S=setTimeout(()=>{k()},150))};m.addEventListener("input",_),m.addEventListener("change",k),m.dataset.listenerAttached="true"}ir?.();const h=document.getElementById("editReservationModal");h&&!h.dataset.cleanupAttached&&(h.addEventListener("hidden.bs.modal",()=>{rr(),t?.(),i?.([])}),h.dataset.cleanupAttached="true")}const na="reservations-ui:ready",Bt=typeof EventTarget<"u"?new EventTarget:null;let Ft={};function fu(e){return Object.freeze({...e})}function yu(){if(!Bt)return;const e=Ft,t=typeof CustomEvent=="function"?new CustomEvent(na,{detail:e}):{type:na,detail:e};typeof Bt.dispatchEvent=="function"&&Bt.dispatchEvent(t)}function gu(e={}){if(!e||typeof e!="object")return Ft;const t={...Ft};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),Ft=fu(t),yu(),Ft}function bu(e){if(e)return Ft?.[e]}function Nu(e){const t=bu(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=i=>{const s=(i?.detail||Ft)?.[e];typeof s=="function"&&(Bt&&Bt.removeEventListener(na,a),n(s))};Bt&&Bt.addEventListener(na,a)})}function mr(){return Is().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=be()||{};ks(e||[]),wi()})}function Tn(e=null){wi(),ln(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function hu(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function En(){return{populateEquipmentDescriptionLists:Pt,setFlatpickrValue:or,splitDateTime:Ls,renderEditItems:$t,updateEditReservationSummary:Re,addEquipmentByDescription:tu,addEquipmentToEditingReservation:eu,addEquipmentToEditingByDescription:ta,combineDateTime:In,hasEquipmentConflict:St,hasTechnicianConflict:Fs,renderReservations:ln,handleReservationsMutation:Tn,ensureModal:hu}}function ln(e="reservations-list",t=null){Hd({containerId:e,filters:t,onShowDetails:Bi,onConfirmReservation:Ri})}function Bi(e){return Od(e,{getEditContext:En,onEdit:(t,{reservation:n})=>{Mi(t,n)},onDelete:Fi})}function Fi(e){return bs()?window.confirm(c("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?gc(e,{onAfterChange:Tn}):!1:(oc(),!1)}function Ri(e){return bc(e,{onAfterChange:Tn})}function Mi(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(o){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",o)}ys(e,En());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(o){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",o)}ys(e,En());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const o=t.id??t.reservationId;n.set("reservationEditId",String(o));try{localStorage.setItem("pendingReservationEditId",String(o)),localStorage.removeItem("pendingReservationEditIndex")}catch(s){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",s)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(o){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",o)}}rc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(o=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",o)});const a=n.toString(),i=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=i}function fr(){gu({showReservationDetails:Bi,deleteReservation:Fi,confirmReservation:Ri,openReservationEditor:Mi})}let ei=!1;function vu(){document.querySelectorAll('input[type="time"]').forEach(t=>{t.setAttribute("step","300")})}function Su(){return typeof window<"u"&&typeof window.flatpickr=="function"?window.flatpickr.bind(window):typeof globalThis<"u"&&typeof globalThis.flatpickr=="function"?globalThis.flatpickr.bind(globalThis):(console.warn("⚠️ Flatpickr غير متاح - سيتم تخطي تهيئة عناصر التاريخ"),null)}function _u(){const e=Su(),t={dateFormat:"Y-m-d",altInput:!0,altFormat:"Y-m-d",allowInput:!0,disableMobile:!0,altInputClass:"flatpickr-alt-input form-control"},n=[["#res-start",{}],["#res-end",{}],["#filter-start-date",{}],["#filter-end-date",{}],["#edit-res-start",{}],["#edit-res-end",{}]],a={enableTime:!0,noCalendar:!0,dateFormat:"H:i",altInput:!0,altFormat:"h:i K",time_24hr:!1,defaultHour:9,defaultMinute:0,disableMobile:!0,minuteIncrement:5,altInputClass:"flatpickr-alt-input form-control"},i=["#res-start-time","#res-end-time","#edit-res-start-time","#edit-res-end-time"];e&&(n.forEach(([s,r])=>{document.querySelector(s)&&e(s,{...t,...r})}),i.forEach(s=>{document.querySelector(s)&&e(s,{...a})}));const o=document.querySelector("#res-start-time");o&&o.dispatchEvent(new Event("change",{bubbles:!0}))}function yr(){if(!ei){vu(),Al(()=>ln()),pr(En()),hc({onDraftChange:ce,onEditChange:Re}),mr(),sr(),ei=!0;try{const e=()=>ln();document.addEventListener("reservations:updated",e),window.addEventListener("reservations:updated",e)}catch{}}}function Au(){const e=document.body;e&&e.dataset.reservationsTechListener!=="true"&&(document.addEventListener("technicians:updated",()=>{const{technicians:t=[]}=be();ks(t),wi(),Re()}),e.dataset.reservationsTechListener="true")}async function qu(){await vc();try{await Is({force:!0})}catch(e){console.warn("⚠️ [reservations/events] Failed to pre-load projects for reservation form",e)}ln(),fr(),Ao({onAfterSubmit:Tn}),ei||yr(),_u(),Au()}const Cu=Object.freeze(Object.defineProperty({__proto__:null,confirmReservation:Ri,deleteReservation:Fi,getReservationsEditContext:En,handleReservationsMutation:Tn,initCreateReservationForm:Ao,initializeReservationUI:qu,loadReservationForm:mr,openReservationEditor:Mi,registerReservationGlobals:fr,renderDraftReservationSummary:ce,renderReservations:ln,setFlatpickrValue:or,setupEditReservationModalEvents:pr,setupEquipmentDescriptionInputs:sr,setupReservationEvents:yr,showReservationDetails:Bi,updateEditReservationSummary:Re},Symbol.toStringTag,{value:"Module"}));export{as as A,Eu as B,Cu as C,Nn as E,Fs as a,In as b,eo as c,ui as d,Bc as e,hi as f,xu as g,St as h,Wc as i,Fc as j,Vs as k,$u as l,bu as m,Y as n,Us as o,la as p,ln as q,Pu as r,yr as s,Gc as t,pi as u,qo as v,Nu as w,gu as x,Bi as y,fr as z};
