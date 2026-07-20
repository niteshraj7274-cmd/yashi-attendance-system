import fs from 'fs';
let content = fs.readFileSync('src/components/CentreStaffSelectionScreen.tsx', 'utf8');

// I will just substring and replace the whole return block up to {salaryEnabled && (
const startIndex = content.indexOf('  return (\n    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">');
const endIndex = content.indexOf('{salaryEnabled && (');

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <div className="bg-blue-900 text-white h-20 flex items-center px-6 shadow-md gap-4">
        <button onClick={() => navigate('/centre-login')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase truncate max-w-[250px]">{centerName}</h1>
          <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5">Select your profile</p>
        </div>
        {appSettings.supportModuleEnabled !== false && (<button onClick={() => navigate('/support')} className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600">
          <Headset size={20} />
        </button>)}
      </div>

      <div className="flex-1 p-6 overflow-y-auto pb-20">
        
        {/* Center Staff Summary */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wide">{centerName}</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{centerCode}</p>
            </div>
            <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100">
              <span className="text-[10px] uppercase font-bold tracking-wider">Total Staff</span>
              <p className="text-lg font-bold leading-none text-center">{staffList.length}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-2 border-t border-slate-100 pt-3 mt-3 mb-3">
            <div className="text-center">
              <span className="block text-sm font-bold text-emerald-600">{todayCounts.Present + todayCounts.Late + todayCounts['Half Day']}</span>
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">Present</span>
            </div>
            <div className="text-center">
              <span className="block text-sm font-bold text-red-500">{staffList.length - (todayCounts.Present + todayCounts.Late + todayCounts['Half Day'] + todayCounts.Leave + todayCounts['Official Duty'])}</span>
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">Absent</span>
            </div>
            <div className="text-center">
              <span className="block text-sm font-bold text-amber-500">{todayCounts.Leave}</span>
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">Leave</span>
            </div>
            <div className="text-center">
              <span className="block text-sm font-bold text-purple-600">{todayCounts['Official Duty']}</span>
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">Duty</span>
            </div>
            <div className="text-center border-l border-slate-100 pl-2">
              <span className="block text-sm font-black text-blue-600">{staffList.length > 0 ? Math.round(((todayCounts.Present + todayCounts.Late + todayCounts['Half Day']) / staffList.length) * 100) : 0}%</span>
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">Att. %</span>
            </div>
          </div>
          <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2 mt-2">Role Breakdown</div>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-medium text-slate-600">
            {(() => {
              const roleCounts: Record<string, number> = {};
              staffList.forEach(s => {
                const r = s.designation || 'Other';
                roleCounts[r] = (roleCounts[r] || 0) + 1;
              });
              return Object.entries(roleCounts).map(([role, count]) => (
                <div key={role} className="flex justify-between items-center border-b border-slate-100 pb-1">
                  <span className="truncate pr-2">{role}</span>
                  <span className="font-bold text-slate-800">{count}</span>
                </div>
              ));
            })()}
          </div>
        </div>

        {appSettings.odModuleEnabled !== false && (<button 
          onClick={() => navigate('/admin/official-duty', { state: { centerCode: centerCode } })}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-sm transition-all text-sm uppercase tracking-wider mb-6 flex justify-center items-center gap-2"
        >
          <MapPin size={18} /> Official Duty Requests
        </button>)}
        
        {appSettings.leaveModuleEnabled !== false && (<button 
          onClick={() => navigate(\`/centre/\${centerId}/leave\`)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-sm transition-all text-sm uppercase tracking-wider mb-6 flex justify-center items-center gap-2"
        >
          <Calendar size={18} /> Leave Requests
        </button>)}

        `;
        
        content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
        fs.writeFileSync('src/components/CentreStaffSelectionScreen.tsx', content);
        console.log("Fixed CentreStaffSelectionScreen.tsx");
} else {
  console.log("Could not find start or end index.");
}
