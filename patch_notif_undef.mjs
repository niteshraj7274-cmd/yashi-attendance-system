import fs from 'fs';
let content = fs.readFileSync('src/components/StaffLeaveScreen.tsx', 'utf8');

content = content.replace(
  /centerId: staffData\.centerId,/g,
  "centerId: staffData.centerId || '',"
);

content = content.replace(
  /message: \`\$\{staffData\.name\} has requested/g,
  "message: `${staffData.name || 'Staff'} has requested"
);

fs.writeFileSync('src/components/StaffLeaveScreen.tsx', content);
