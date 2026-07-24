const w=async(r,e=3,a=2e3)=>{let t=0;for(;t<e;)try{return await r()}catch(o){if(t++,t>=e)throw o;await new Promise(i=>setTimeout(i,a))}throw new Error("Upload failed")};export{w as u};
