const fs = require('fs');

let file = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const regexIn = /<div className="w-full flex items-center gap-2 mb-1">\s*<div className="h-\[1px\] flex-1 bg-slate-200"><\/div>\s*<span className="text-xs font-bold text-slate-500 uppercase">Mark IN<\/span>\s*<div className="h-\[1px\] flex-1 bg-slate-200"><\/div>\s*<\/div>\s*<div className="w-full">\s*<button\s*onClick=\{\(\) => startAttendanceProcess\('IN'\)\}(?:.|\n)*?<\/button>\s*<\/div>/g;

const replacementIn = `<div className="w-full flex items-center gap-2 mb-1">
                      <div className="h-[1px] flex-1 bg-slate-200"></div>
                      <span className="text-xs font-bold text-slate-500 uppercase">Mark IN</span>
                      <div className="h-[1px] flex-1 bg-slate-200"></div>
                   </div>
                   <div className="w-full flex flex-col gap-2">
                       {(attendanceMode === 'selfie' || attendanceMode === 'gps_selfie' || attendanceMode === 'both' || attendanceMode === 'selfie_location') && (
                         <button 
                           onClick={() => startAttendanceProcess('IN')}
                           disabled={locationLoading || !centerInfo}
                           className={\`w-full py-4 px-2 rounded-xl font-bold shadow-sm flex flex-col items-center justify-center gap-2 text-sm text-center uppercase transition-all \${
                             (!centerInfo)
                               ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300' 
                               : 'bg-emerald-600 text-white hover:bg-emerald-700'
                           } active:scale-[0.98] \${(locationLoading && attendanceType === 'IN') ? 'opacity-70' : ''}\`}
                         >
                           <Camera size={24} />
                           <span>{(locationLoading && attendanceType === 'IN') ? 'Locating...' : 'Selfie Attendance (IN)'}</span>
                         </button>
                       )}
                       {(attendanceMode === 'gps' || attendanceMode === 'gps_selfie' || attendanceMode === 'both' || attendanceMode === 'location_only' || attendanceMode === 'selfie_location') && (
                         <button 
                           onClick={() => processLocationOnlyAttendance('IN')}
                           disabled={locationLoading || !centerInfo}
                           className={\`w-full py-4 px-2 rounded-xl font-bold shadow-sm flex flex-col items-center justify-center gap-2 text-sm text-center uppercase transition-all \${
                             (!centerInfo)
                               ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300' 
                               : 'bg-blue-600 text-white hover:bg-blue-700'
                           } active:scale-[0.98] \${(locationLoading && attendanceType === 'IN') ? 'opacity-70' : ''}\`}
                         >
                           <MapPin size={24} />
                           <span>{(locationLoading && attendanceType === 'IN') ? 'Locating...' : 'GPS Attendance (IN)'}</span>
                         </button>
                       )}
                   </div>`;

file = file.replace(regexIn, replacementIn);

const regexOut = /<div className="w-full flex items-center gap-2 mb-1">\s*<div className="h-\[1px\] flex-1 bg-slate-200"><\/div>\s*<span className="text-xs font-bold text-slate-500 uppercase">Mark OUT<\/span>\s*<div className="h-\[1px\] flex-1 bg-slate-200"><\/div>\s*<\/div>\s*<div className="w-full">\s*<button\s*onClick=\{\(\) => startAttendanceProcess\('OUT'\)\}(?:.|\n)*?<\/button>\s*<\/div>/g;

const replacementOut = `<div className="w-full flex items-center gap-2 mb-1">
                      <div className="h-[1px] flex-1 bg-slate-200"></div>
                      <span className="text-xs font-bold text-slate-500 uppercase">Mark OUT</span>
                      <div className="h-[1px] flex-1 bg-slate-200"></div>
                   </div>
                   <div className="w-full flex flex-col gap-2">
                       {(attendanceMode === 'selfie' || attendanceMode === 'gps_selfie' || attendanceMode === 'both' || attendanceMode === 'selfie_location') && (
                         <button 
                           onClick={() => startAttendanceProcess('OUT')}
                           disabled={locationLoading || !centerInfo}
                           className={\`w-full py-4 px-2 rounded-xl font-bold shadow-sm flex flex-col items-center justify-center gap-2 text-sm text-center uppercase transition-all \${
                             (!centerInfo)
                               ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300' 
                               : 'bg-amber-600 text-white hover:bg-amber-700'
                           } active:scale-[0.98] \${(locationLoading && attendanceType === 'OUT') ? 'opacity-70' : ''}\`}
                         >
                           <Camera size={24} />
                           <span>{(locationLoading && attendanceType === 'OUT') ? 'Locating...' : 'Selfie Attendance (OUT)'}</span>
                         </button>
                       )}
                       {(attendanceMode === 'gps' || attendanceMode === 'gps_selfie' || attendanceMode === 'both' || attendanceMode === 'location_only' || attendanceMode === 'selfie_location') && (
                         <button 
                           onClick={() => processLocationOnlyAttendance('OUT')}
                           disabled={locationLoading || !centerInfo}
                           className={\`w-full py-4 px-2 rounded-xl font-bold shadow-sm flex flex-col items-center justify-center gap-2 text-sm text-center uppercase transition-all \${
                             (!centerInfo)
                               ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300' 
                               : 'bg-blue-600 text-white hover:bg-blue-700'
                           } active:scale-[0.98] \${(locationLoading && attendanceType === 'OUT') ? 'opacity-70' : ''}\`}
                         >
                           <MapPin size={24} />
                           <span>{(locationLoading && attendanceType === 'OUT') ? 'Locating...' : 'GPS Attendance (OUT)'}</span>
                         </button>
                       )}
                   </div>`;

file = file.replace(regexOut, replacementOut);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', file);

