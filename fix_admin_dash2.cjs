const fs = require('fs');
let content = fs.readFileSync('src/components/AdminAttendanceDashboardScreen.tsx', 'utf8');

content = content.replace(
  "const staff = staffList.find(s => s.code === r['Staff ID']);",
  "const staff = staffList.find(s => (s.code || s.staffId) === r['Staff ID']);"
);

fs.writeFileSync('src/components/AdminAttendanceDashboardScreen.tsx', content);
