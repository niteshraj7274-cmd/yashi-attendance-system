const fs = require('fs');
let code = fs.readFileSync('src/components/AdminSalaryDashboardScreen.tsx', 'utf8');

code = code.replace(
  "{centers.map(c => <option key={c.id} value={c.code}>{c.name}</option>)}",
  "{centers.map((c, index) => <option key={`${c.id}_${index}`} value={c.code}>{c.name}</option>)}"
);

code = code.replace(
  "{staffList.filter(s => !selectedCenter || s.centerCode === selectedCenter).map(s => <option key={s.id} value={s.code}>{s.name} ({s.code})</option>)}",
  "{staffList.filter(s => !selectedCenter || s.centerCode === selectedCenter).map((s, index) => <option key={`${s.id}_${index}`} value={s.code}>{s.name} ({s.code})</option>)}"
);

fs.writeFileSync('src/components/AdminSalaryDashboardScreen.tsx', code);
