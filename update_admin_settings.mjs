import fs from 'fs';

let content = fs.readFileSync('src/components/AdminSettingsScreen.tsx', 'utf8');

// Add state
content = content.replace(
  "const [attendanceModuleEnabled, setAttendanceModuleEnabled] = useState(true);",
  "const [attendanceModuleEnabled, setAttendanceModuleEnabled] = useState(true);\n  const [attendanceMode, setAttendanceMode] = useState<'both' | 'selfie_location' | 'location_only'>('both');"
);

// Load state
content = content.replace(
  "setAttendanceModuleEnabled(docSnap.data().attendanceModuleEnabled ?? true);",
  "setAttendanceModuleEnabled(docSnap.data().attendanceModuleEnabled ?? true);\n          setAttendanceMode(docSnap.data().attendanceMode || 'both');"
);

// Save state
content = content.replace(
  "attendanceModuleEnabled: attendanceModuleEnabled,",
  "attendanceModuleEnabled: attendanceModuleEnabled,\n        attendanceMode: attendanceMode,"
);

// JSX
const jsxReplacement = `
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold text-slate-700">Attendance Module</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={attendanceModuleEnabled} onChange={(e) => setAttendanceModuleEnabled(e.target.checked)} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-bold text-slate-700">Attendance Mode</span>
                <select 
                  value={attendanceMode}
                  onChange={(e) => setAttendanceMode(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="both">Both Allowed</option>
                  <option value="selfie_location">Selfie + Location Only</option>
                  <option value="location_only">Location Only</option>
                </select>
              </div>
`;

content = content.replace(
  /<div className="flex items-center justify-between gap-4">\s*<span className="text-sm font-bold text-slate-700">Attendance Module<\/span>.*?<\/div>/s,
  jsxReplacement.trim()
);

fs.writeFileSync('src/components/AdminSettingsScreen.tsx', content);
