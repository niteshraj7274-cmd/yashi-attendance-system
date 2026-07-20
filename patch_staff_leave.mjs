import fs from 'fs';
let content = fs.readFileSync('src/components/StaffLeaveScreen.tsx', 'utf8');

content = content.replace(
  /centerCode: staffData\.centerCode,/g,
  "centerCode: staffData.centerCode || '',"
);

content = content.replace(
  /centerName: staffData\.centerName,/g,
  "centerName: staffData.centerName || '',"
);

content = content.replace(
  /role: staffData\.designation,/g,
  "role: staffData.designation || '',"
);

fs.writeFileSync('src/components/StaffLeaveScreen.tsx', content);
