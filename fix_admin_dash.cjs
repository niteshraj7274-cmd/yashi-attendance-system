const fs = require('fs');
let content = fs.readFileSync('src/components/AdminAttendanceDashboardScreen.tsx', 'utf8');

content = content.replace(
  "const q = query(collection(db, 'attendance'), orderBy('timestamp', 'desc'), limit(200));",
  "const q = query(collection(db, 'attendance'), orderBy('timestamp', 'desc'));"
);

content = content.replace(
  "              <select value={selectedStaff} onChange={e => setSelectedStaff(e.target.value)} className=\"w-full p-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-emerald-500 bg-white\">\n                <option value=\"\">All Staff</option>\n                {staffList.filter(s => !selectedCenter || s.centerCode === selectedCenter).filter(s => !selectedRole || s.role === selectedRole).map(s => <option key={s.code} value={s.code}>{s.name} ({s.code})</option>)}\n              </select>",
  "              <select value={selectedStaff} onChange={e => setSelectedStaff(e.target.value)} className=\"w-full p-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-emerald-500 bg-white\">\n                <option value=\"\">All Staff</option>\n                {staffList.filter(s => !selectedCenter || s.centerCode === selectedCenter).filter(s => !selectedRole || s.role === selectedRole).map(s => <option key={s.id} value={s.code || s.staffId}>{s.name} ({s.code || s.staffId})</option>)}\n              </select>"
);

fs.writeFileSync('src/components/AdminAttendanceDashboardScreen.tsx', content);
