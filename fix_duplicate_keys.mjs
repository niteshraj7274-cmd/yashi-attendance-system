import fs from 'fs';

let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// Replace the duplicate keys inside StaffDashboardScreen
content = content.replace(
  /'Attendance Status': attendanceStatus,\n\s*'Attendance Type': 'Selfie \+ Location',\n\s*'Attendance Type': 'Location Only',/g,
  "'Attendance Status': attendanceStatus,\n              'Attendance Type': 'Location Only',"
);

content = content.replace(
  /'OUT Google Maps Link': googleMapsLink,\n\s*'OUT Attendance Type': 'Selfie \+ Location',\n\s*'OUT Attendance Type': 'Location Only'/g,
  "'OUT Google Maps Link': googleMapsLink,\n                'OUT Attendance Type': 'Location Only'"
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
