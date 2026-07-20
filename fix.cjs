const fs = require('fs');
let file = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');
let lines = file.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("=== 'selfie' ||") && lines[i].includes("=== 'both'")) {
     lines[i] = "                       {['selfie', 'gps_selfie', 'both', 'selfie_location'].includes(appSettings.attendanceMode || appSettings.attendanceType || 'gps_selfie') && (";
  } else if (lines[i].includes("=== 'gps' ||") && lines[i].includes("=== 'both'")) {
     lines[i] = "                       {['gps', 'gps_selfie', 'both', 'location_only', 'selfie_location'].includes(appSettings.attendanceMode || appSettings.attendanceType || 'gps_selfie') && (";
  }
}

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', lines.join('\n'));
