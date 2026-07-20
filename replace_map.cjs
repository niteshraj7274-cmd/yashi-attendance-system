const fs = require('fs');

let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const regex = /<div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-3">\s*<div className="flex items-center justify-between">\s*<h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Live Map & Distance<\/h3>[\s\S]*?(?=<\/div>\s*<\/div>\s*\{\/\* Official Duty Modal \*\/})/g;

const replacement = `<div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-3">
          <div className="flex items-center justify-between">
             <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Live Map & Distance</h3>
             {liveLocation?.distance !== null && liveLocation?.distance !== undefined && (
               <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold uppercase">{Math.round(liveLocation.distance)} meters away</span>
             )}
          </div>
          
          <div className="w-full h-40 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 relative">
             {liveLocation && centerInfo?.latitude ? (
               <iframe
                 width="100%"
                 height="100%"
                 style={{ border: 0 }}
                 loading="lazy"
                 src={\`https://maps.google.com/maps?saddr=\${centerInfo.latitude},\${centerInfo.longitude}&daddr=\${liveLocation.lat},\${liveLocation.lng}&output=embed\`}
               ></iframe>
             ) : (
               <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                 <div className="w-6 h-6 border-2 border-slate-400 border-t-transparent rounded-full animate-spin mb-1"></div>
                 <span className="text-xs font-medium">Fetching Live Location...</span>
               </div>
             )}
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
            <div className={\`p-2 rounded-lg border shrink-0 \${liveLocation?.address ? 'bg-green-50 text-green-600 border-green-100' : 'bg-blue-50 text-blue-600 border-blue-100'}\`}>
              <MapPin size={16} />
            </div>
            <span className="flex-1 line-clamp-3">
              {liveLocation?.address 
                  ? \`Location: \${liveLocation.address}\` 
                  : 'Location detection is required for live attendance. Please ensure GPS is enabled.'}
            </span>
          </div>
        </div>
      </div>
      
      `;

const matched = code.match(regex);
if (matched) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
  console.log("Success!");
} else {
  console.log("Not matched.");
}
