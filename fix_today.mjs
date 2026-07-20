import fs from 'fs';
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

content = content.replace(
  /const newRecord = {\n\s*staffUid: staffData\.uid,/,
  "const today = new Date();\n      const dateStr = today.toLocaleDateString('en-CA');\n      const timeStr = today.toLocaleTimeString('en-US', { hour12: false });\n\n      const newRecord = {\n        staffUid: staffData.uid,"
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
