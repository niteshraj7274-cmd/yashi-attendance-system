import fs from 'fs';
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

content = content.replace(
  /staffUid: staffData\.uid,/g,
  "staffUid: staffData.uid || '',"
);

content = content.replace(
  /'Staff ID': staffData\.staffId,/g,
  "'Staff ID': staffData.staffId || '',"
);

content = content.replace(
  /'Staff Name': staffData\.name,/g,
  "'Staff Name': staffData.name || '',"
);

content = content.replace(
  /'Role': staffData\.role \|\| 'Staff',/g,
  "'Role': staffData.role || staffData.designation || 'Staff',"
);

content = content.replace(
  /'Duty Type': odDutyType,/g,
  "'Duty Type': odDutyType || '',"
);

content = content.replace(
  /'Reason': odReason,/g,
  "'Reason': odReason || '',"
);

content = content.replace(
  /'Remarks': odRemarks,/g,
  "'Remarks': odRemarks || '',"
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
