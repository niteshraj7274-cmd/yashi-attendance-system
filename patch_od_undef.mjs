import fs from 'fs';
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

content = content.replace(
  "staffUid: staffData.uid,",
  "staffUid: staffData.uid || '',"
);

content = content.replace(
  "'Staff ID': staffData.staffId,",
  "'Staff ID': staffData.staffId || '',"
);

content = content.replace(
  "'Staff Name': staffData.name,",
  "'Staff Name': staffData.name || '',"
);

content = content.replace(
  "'Center ID': staffData.centerId,",
  "'Center ID': staffData.centerId || '',"
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
