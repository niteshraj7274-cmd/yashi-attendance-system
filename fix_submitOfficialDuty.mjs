import fs from 'fs';
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const target = "      const newRecord = {\n        staffUid: staffData.uid,\n        'Staff ID': staffData.staffId,\n        'Staff Name': staffData.name,\n        'Center ID': staffData.centerId,";

const replacement = "      const today = new Date();\n      const dateStr = today.toLocaleDateString('en-CA');\n      const timeStr = today.toLocaleTimeString('en-US', { hour12: false });\n\n" + target;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
