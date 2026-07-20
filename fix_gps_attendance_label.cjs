const fs = require('fs');

let file = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

file = file.replace(/'Location Only'/g, "'GPS Attendance'");

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', file);
