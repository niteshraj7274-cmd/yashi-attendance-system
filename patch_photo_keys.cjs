const fs = require('fs');
let code = fs.readFileSync('src/components/AdminAttendanceDashboardScreen.tsx', 'utf8');

code = code.replace(
  "const photoUrl = r['Photo URL'] || r['Selfie URL'] || r.photoUrl || r.selfieUrl;",
  "const photoUrl = r['Photo URL'] || r['Selfie URL'] || r['Selfie Image URL'] || r['OUT Selfie Image URL'] || r.photoUrl || r.selfieUrl;"
);

fs.writeFileSync('src/components/AdminAttendanceDashboardScreen.tsx', code);
