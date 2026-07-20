const fs = require('fs');
let code = fs.readFileSync('src/components/AdminAttendanceDashboardScreen.tsx', 'utf8');
code = code.replace(/\\`/g, '`').replace(/\\\$/g, '$');
fs.writeFileSync('src/components/AdminAttendanceDashboardScreen.tsx', code);
