const fs = require('fs');

let file = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

file = file.replace(/'Selfie \+ Location'/g, "'Selfie Attendance'");

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', file);
