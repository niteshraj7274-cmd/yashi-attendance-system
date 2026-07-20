import fs from 'fs';
let content = fs.readFileSync('src/components/CentreStaffSelectionScreen.tsx', 'utf8');

content = content.replace(
  /uid: selectedStaff\.id,\n\s*role: 'staff',\n\s*centerId: centerId,\n\s*staffId: selectedStaff\.staffId,\n\s*name: selectedStaff\.name/,
  "uid: selectedStaff.id,\n          role: 'staff',\n          centerId: centerId,\n          centerCode: centerCode || '',\n          centerName: centerName || '',\n          designation: selectedStaff.designation || selectedStaff.role || 'Staff',\n          staffId: selectedStaff.staffId,\n          name: selectedStaff.name"
);

fs.writeFileSync('src/components/CentreStaffSelectionScreen.tsx', content);
