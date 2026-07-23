import{r as s,j as n,m as c,d as m,a as u,g as f}from"./index-DL8_hRrZ.js";import{M as h}from"./message-circle-Cfw_RYlh.js";function b(){const[r,p]=s.useState("+91 7070972806");s.useEffect(()=>{(async()=>{try{const t=m(u,"settings","support"),e=await f(t);if(e.exists()){const a=e.data();a.whatsapp&&p(a.whatsapp)}}catch(t){console.error("Error fetching support info:",t)}})()},[]);const l=()=>{const o=localStorage.getItem("userSession");let t=`Hello YASHI SKILL PROJECT PVT. LTD. Support Team,

I need technical support.

Problem:

Please help.`;if(o)try{const e=JSON.parse(o);e.role==="admin"?t=`Hello YASHI SKILL PROJECT PVT. LTD. Support Team,

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

Please help.`)}catch{}return encodeURIComponent(t)},i=()=>{const o=r.replace(/[^0-9]/g,"");window.open(`https://wa.me/${o}?text=${l()}`,"_blank")};return n.jsxDEV(c.button,{initial:{scale:0},animate:{scale:1},onClick:i,className:"absolute bottom-6 right-6 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:bg-green-600 transition-all z-[100] focus:outline-none",children:n.jsxDEV(h,{size:28},void 0,!1,{fileName:"/app/applet/src/components/WhatsAppButton.tsx",lineNumber:57,columnNumber:7},this)},void 0,!1,{fileName:"/app/applet/src/components/WhatsAppButton.tsx",lineNumber:51,columnNumber:5},this)}export{b as default};
