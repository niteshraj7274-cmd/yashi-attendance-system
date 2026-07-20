import fs from 'fs';
let content = fs.readFileSync('src/components/StaffLeaveScreen.tsx', 'utf8');

content = content.replace(
  /staffId: staffData\.staffId,/g,
  "staffId: staffData.staffId || '',"
);

content = content.replace(
  /staffName: staffData\.name,/g,
  "staffName: staffData.name || '',"
);

content = content.replace(
  /centerId: staffData\.centerId,/g,
  "centerId: staffData.centerId || '',"
);

fs.writeFileSync('src/components/StaffLeaveScreen.tsx', content);
