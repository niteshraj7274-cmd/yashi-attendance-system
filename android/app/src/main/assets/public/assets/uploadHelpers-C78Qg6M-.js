const t=async(t,r=3,e=2e3)=>{let a=0;for(;a<r;)try{return await t()}catch(o){if(a++,a>=r)throw o;await new Promise(t=>setTimeout(t,e))}throw new Error("Upload failed")};export{t as u};
