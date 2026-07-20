import fs from 'fs';

let content = fs.readFileSync('src/components/AdminSettingsScreen.tsx', 'utf8');

// Replace the bad section
content = content.replace(
  /              <div className="flex flex-col gap-2">\s*<span className="text-sm font-bold text-slate-700">Attendance Mode<\/span>\s*<select\s*value=\{attendanceMode\}\s*onChange=\{\(e\) => setAttendanceMode\(e\.target\.value as any\)\}\s*className="w-full p-2\.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"\s*>\s*<option value="both">Both Allowed<\/option>\s*<option value="selfie_location">Selfie \+ Location Only<\/option>\s*<option value="location_only">Location Only<\/option>\s*<\/select>\s*<\/div>\s*<\/label>\s*<\/div>/,
  `              <div className="flex flex-col gap-2">
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
              </div>`
);

fs.writeFileSync('src/components/AdminSettingsScreen.tsx', content);
