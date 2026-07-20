import fs from 'fs';
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const stateRegex = /const \[showOfficialDuty, setShowOfficialDuty\] = useState\(false\);/;
content = content.replace(stateRegex, `const [showOfficialDuty, setShowOfficialDuty] = useState(false);
  const [appSettings, setAppSettings] = useState<any>({
    attendanceModuleEnabled: true,
    leaveModuleEnabled: true,
    odModuleEnabled: true,
    supportModuleEnabled: true
  });`);

const fetchRegex = /checkODRequests\(staffData\.uid\);/;
content = content.replace(fetchRegex, `checkODRequests(staffData.uid);
        
        const unsubSettings = onSnapshot(doc(db, 'settings', 'appSettings'), (docSnap) => {
          if (docSnap.exists()) {
             setAppSettings(prev => ({ ...prev, ...docSnap.data() }));
          }
        });`);

const odButton = /<button\s*onClick=\{\(\) => setShowOfficialDuty\(true\)\}[\s\S]*?Apply Official Duty[\s\S]*?<\/button>/;
content = content.replace(odButton, `{appSettings.odModuleEnabled !== false && (<button
              onClick={() => setShowOfficialDuty(true)}
              className="w-full py-3 rounded-lg font-bold shadow-sm flex items-center justify-center gap-2 text-sm uppercase transition-all bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]"
            >
              <MapPin size={20} />
              <span>Apply Official Duty</span>
            </button>)}`);

const leaveButton = /<button\s*onClick=\{\(\) => navigate\('\/staff\/leave'\)\}[\s\S]*?Leave Management[\s\S]*?<\/button>/;
content = content.replace(leaveButton, `{appSettings.leaveModuleEnabled !== false && (<button 
              onClick={() => navigate('/staff/leave')}
              className="flex-1 py-4 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-700 font-bold uppercase tracking-wider text-[10px] flex flex-col items-center justify-center gap-2 hover:bg-indigo-100 transition-colors"
            >
              <Calendar size={20} />
              <span>Leave Management</span>
            </button>)}`);

const supportButton = /<button onClick=\{\(\) => navigate\('\/support'\)\} className="p-2 bg-emerald-800 rounded-lg hover:bg-emerald-700 transition-colors border border-emerald-600">[\s\S]*?<Headset size=\{16\} \/>[\s\S]*?<\/button>/;
content = content.replace(supportButton, `{appSettings.supportModuleEnabled !== false && (<button onClick={() => navigate('/support')} className="p-2 bg-emerald-800 rounded-lg hover:bg-emerald-700 transition-colors border border-emerald-600">
              <Headset size={16} />
            </button>)}`);

const attCard = /<div className="w-full grid grid-cols-2 gap-4 mt-2">[\s\S]*?<\/div>\s*<div className="w-full mt-4">/;
content = content.replace(attCard, `{appSettings.attendanceModuleEnabled !== false ? (<div className="w-full grid grid-cols-2 gap-4 mt-2">
            <button 
              onClick={() => startAttendanceProcess('IN')}
              disabled={locationLoading || hasMarkedIn || !centerInfo}
              className={\`py-3 rounded-lg font-bold shadow-sm flex flex-col items-center justify-center gap-2 text-sm uppercase transition-all \${
                (hasMarkedIn || !centerInfo)
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300' 
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98]'
              } \${(locationLoading && attendanceType === 'IN') ? 'opacity-70' : ''}\`}
            >
              <Calendar size={20} />
              <span>{(locationLoading && attendanceType === 'IN') ? 'Locating...' : 'Mark IN'}</span>
            </button>
            <button 
              onClick={() => startAttendanceProcess('OUT')}
              disabled={locationLoading || !hasMarkedIn || hasMarkedOut || !centerInfo}
              className={\`py-3 rounded-lg font-bold shadow-sm flex flex-col items-center justify-center gap-2 text-sm uppercase transition-all \${
                (!hasMarkedIn || hasMarkedOut || !centerInfo)
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300'
                  : 'bg-amber-600 text-white hover:bg-amber-700 active:scale-[0.98]'
              } \${(locationLoading && attendanceType === 'OUT') ? 'opacity-70' : ''}\`}
            >
              <Clock size={20} />
              <span>{(locationLoading && attendanceType === 'OUT') ? 'Locating...' : 'Mark OUT'}</span>
            </button>
          </div>) : (<div className="w-full p-3 bg-red-50 text-red-600 text-xs text-center font-bold rounded-lg border border-red-100 mt-2 uppercase">Attendance Module Disabled</div>)}
          <div className="w-full mt-4 flex gap-2">`);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
