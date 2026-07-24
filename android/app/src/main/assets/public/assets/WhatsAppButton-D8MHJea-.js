import{r as l,a as i,m as c,y as m}from"./react-vendor-C8nP85pq.js";import{h as u,v as h}from"./firebase-fCV8FB-y.js";import{d as f}from"./index-j_pTAaOW.js";import"./vendor-CnOBNLjs.js";import"./capacitor-lIU3Zumz.js";import"./motion-C4HE4VAC.js";const d=async(s,n)=>{const o=`https://wa.me/${s.replace(/[^0-9]/g,"")}?text=${n}`;try{window.open(o,"_system")}catch{window.location.href=o}};function T(){const[s,n]=l.useState("+91 7070972806");l.useEffect(()=>{(async()=>{try{const t=u(f,"settings","support"),e=await h(t);if(e.exists()){const p=e.data();p.whatsapp&&n(p.whatsapp)}}catch{}})()},[]);const r=()=>{const a=localStorage.getItem("userSession");let t=`Hello YASHI SKILL PROJECT PVT. LTD. Support Team,

I need technical support.

Problem:

Please help.`;if(a)try{const e=JSON.parse(a);e.role==="admin"?t=`Hello YASHI SKILL PROJECT PVT. LTD. Support Team,

I am the Super Admin.

I need technical support.

Name: ${e.name||"Admin"}
Mobile: ${e.phone||""}
Problem:

Please help.`:e.role==="center"?t=`Hello YASHI SKILL PROJECT PVT. LTD. Support Team,

I am a Center User.

Center Code: ${e.centerCode||""}
Center Name: ${e.centerName||""}
Center Coordinator: ${e.name||e.coordinatorName||""}
Mobile Number: ${e.phone||""}

Problem:

Please help.`:e.role==="staff"&&(t=`Hello YASHI SKILL PROJECT PVT. LTD. Support Team,

I am a Staff Member.

Staff Name: ${e.name||""}
Staff ID: ${e.staffId||""}
Assigned Center: ${e.centerCode||""}
Role: ${e.designation||""}
Mobile Number: ${e.phone||""}

Problem:

Please help.`)}catch{}return encodeURIComponent(t)},o=()=>{d(s,r())};return i.jsxDEV(c.button,{initial:{scale:0},animate:{scale:1},onClick:o,className:"absolute bottom-6 right-6 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:bg-green-600 transition-all z-[100] focus:outline-none",children:i.jsxDEV(m,{size:28},void 0,!1,{fileName:"/app/applet/src/components/WhatsAppButton.tsx",lineNumber:57,columnNumber:7},this)},void 0,!1,{fileName:"/app/applet/src/components/WhatsAppButton.tsx",lineNumber:51,columnNumber:5},this)}export{T as default};
