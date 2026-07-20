import fs from 'fs';
let content = fs.readFileSync('src/components/AdminSettingsScreen.tsx', 'utf8');

const stateRegex = /const \[testMode, setTestMode\] = useState\(false\);/;
content = content.replace(stateRegex, `const [testMode, setTestMode] = useState(false);
  const [attendanceModuleEnabled, setAttendanceModuleEnabled] = useState(true);
  const [leaveModuleEnabled, setLeaveModuleEnabled] = useState(true);
  const [odModuleEnabled, setOdModuleEnabled] = useState(true);
  const [supportModuleEnabled, setSupportModuleEnabled] = useState(true);`);

const fetchRegex = /setTestMode\(docSnap\.data\(\)\.testMode \|\| false\);/;
content = content.replace(fetchRegex, `setTestMode(docSnap.data().testMode || false);
          setAttendanceModuleEnabled(docSnap.data().attendanceModuleEnabled ?? true);
          setLeaveModuleEnabled(docSnap.data().leaveModuleEnabled ?? true);
          setOdModuleEnabled(docSnap.data().odModuleEnabled ?? true);
          setSupportModuleEnabled(docSnap.data().supportModuleEnabled ?? true);`);

const saveRegex = /testMode: testMode,/;
content = content.replace(saveRegex, `testMode: testMode,
        attendanceModuleEnabled: attendanceModuleEnabled,
        leaveModuleEnabled: leaveModuleEnabled,
        odModuleEnabled: odModuleEnabled,
        supportModuleEnabled: supportModuleEnabled,`);

const uiRegex = /<h3 className="font-bold text-slate-800 text-sm">Salary Module<\/h3>/;
content = content.replace(uiRegex, `<h3 className="font-bold text-slate-800 text-sm">Module Control</h3>
              <p className="text-xs text-slate-500 mt-1">Enable or disable modules system-wide.</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold text-slate-700">Attendance Module</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={attendanceModuleEnabled} onChange={(e) => setAttendanceModuleEnabled(e.target.checked)} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold text-slate-700">Leave Module</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={leaveModuleEnabled} onChange={(e) => setLeaveModuleEnabled(e.target.checked)} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold text-slate-700">Official Duty Module</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={odModuleEnabled} onChange={(e) => setOdModuleEnabled(e.target.checked)} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold text-slate-700">Support & Help Module</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={supportModuleEnabled} onChange={(e) => setSupportModuleEnabled(e.target.checked)} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold text-slate-700">Salary Module</span>`);

fs.writeFileSync('src/components/AdminSettingsScreen.tsx', content);
