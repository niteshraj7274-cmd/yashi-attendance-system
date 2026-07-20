import fs from 'fs';

let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const replacement = `
          {appSettings.attendanceModuleEnabled !== false ? (
            <div className="w-full flex flex-col gap-4 mt-2">
              {!hasMarkedIn && (
                <div className="w-full flex flex-col gap-2">
                   <div className="w-full flex items-center gap-2 mb-1">
                      <div className="h-[1px] flex-1 bg-slate-200"></div>
                      <span className="text-xs font-bold text-slate-500 uppercase">Mark IN</span>
                      <div className="h-[1px] flex-1 bg-slate-200"></div>
                   </div>
                   <div className={\`w-full grid \${(!appSettings.attendanceMode || appSettings.attendanceMode === 'both') ? 'grid-cols-2 gap-3' : 'grid-cols-1'}\`}>
                     {(!appSettings.attendanceMode || appSettings.attendanceMode === 'both' || appSettings.attendanceMode === 'selfie_location') && (
                       <button 
                         onClick={() => startAttendanceProcess('IN', 'selfie_location')}
                         disabled={locationLoading || !centerInfo}
                         className={\`py-3 px-2 rounded-lg font-bold shadow-sm flex flex-col items-center justify-center gap-2 text-[11px] text-center uppercase transition-all \${
                           (!centerInfo)
                             ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300' 
                             : 'bg-emerald-600 text-white hover:bg-emerald-700'
                         } active:scale-[0.98] \${(locationLoading && attendanceType === 'IN') ? 'opacity-70' : ''}\`}
                       >
                         <Camera size={20} />
                         <span>{(locationLoading && attendanceType === 'IN') ? 'Locating...' : 'Selfie + Location'}</span>
                       </button>
                     )}
                     {(!appSettings.attendanceMode || appSettings.attendanceMode === 'both' || appSettings.attendanceMode === 'location_only') && (
                       <button 
                         onClick={() => startAttendanceProcess('IN', 'location_only')}
                         disabled={locationLoading || !centerInfo}
                         className={\`py-3 px-2 rounded-lg font-bold shadow-sm flex flex-col items-center justify-center gap-2 text-[11px] text-center uppercase transition-all \${
                           (!centerInfo)
                             ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300' 
                             : 'bg-emerald-600 text-white hover:bg-emerald-700'
                         } active:scale-[0.98] \${(locationLoading && attendanceType === 'IN') ? 'opacity-70' : ''}\`}
                       >
                         <MapPin size={20} />
                         <span>{(locationLoading && attendanceType === 'IN') ? 'Locating...' : 'Location Only'}</span>
                       </button>
                     )}
                   </div>
                </div>
              )}

              {hasMarkedIn && !hasMarkedOut && (
                <div className="w-full flex flex-col gap-2">
                   <div className="w-full flex items-center gap-2 mb-1">
                      <div className="h-[1px] flex-1 bg-slate-200"></div>
                      <span className="text-xs font-bold text-slate-500 uppercase">Mark OUT</span>
                      <div className="h-[1px] flex-1 bg-slate-200"></div>
                   </div>
                   <div className={\`w-full grid \${(!appSettings.attendanceMode || appSettings.attendanceMode === 'both') ? 'grid-cols-2 gap-3' : 'grid-cols-1'}\`}>
                     {(!appSettings.attendanceMode || appSettings.attendanceMode === 'both' || appSettings.attendanceMode === 'selfie_location') && (
                       <button 
                         onClick={() => startAttendanceProcess('OUT', 'selfie_location')}
                         disabled={locationLoading || !centerInfo}
                         className={\`py-3 px-2 rounded-lg font-bold shadow-sm flex flex-col items-center justify-center gap-2 text-[11px] text-center uppercase transition-all \${
                           (!centerInfo)
                             ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300' 
                             : 'bg-amber-600 text-white hover:bg-amber-700'
                         } active:scale-[0.98] \${(locationLoading && attendanceType === 'OUT') ? 'opacity-70' : ''}\`}
                       >
                         <Camera size={20} />
                         <span>{(locationLoading && attendanceType === 'OUT') ? 'Locating...' : 'Selfie + Location'}</span>
                       </button>
                     )}
                     {(!appSettings.attendanceMode || appSettings.attendanceMode === 'both' || appSettings.attendanceMode === 'location_only') && (
                       <button 
                         onClick={() => startAttendanceProcess('OUT', 'location_only')}
                         disabled={locationLoading || !centerInfo}
                         className={\`py-3 px-2 rounded-lg font-bold shadow-sm flex flex-col items-center justify-center gap-2 text-[11px] text-center uppercase transition-all \${
                           (!centerInfo)
                             ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300' 
                             : 'bg-amber-600 text-white hover:bg-amber-700'
                         } active:scale-[0.98] \${(locationLoading && attendanceType === 'OUT') ? 'opacity-70' : ''}\`}
                       >
                         <MapPin size={20} />
                         <span>{(locationLoading && attendanceType === 'OUT') ? 'Locating...' : 'Location Only'}</span>
                       </button>
                     )}
                   </div>
                </div>
              )}
          </div>) : (<div className="w-full p-3 bg-red-50 text-red-600 text-xs text-center font-bold rounded-lg border border-red-100 mt-2 uppercase">Attendance Module Disabled</div>)}
`;

content = content.replace(
  /\{appSettings\.attendanceModuleEnabled \!== false \? \(\<div className="w-full grid grid-cols-2 gap-4 mt-2">[\s\S]*?<\/div>\) : \(\<div className="w-full p-3 bg-red-50 text-red-600 text-xs text-center font-bold rounded-lg border border-red-100 mt-2 uppercase">Attendance Module Disabled<\/div>\)\}/,
  replacement.trim()
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
