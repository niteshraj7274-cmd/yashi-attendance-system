const fs = require('fs');
let content = fs.readFileSync('src/components/AdminStaffManagementScreen.tsx', 'utf8');

content = content.replace(
  '<input type="text" name="fatherName" value={formData.fatherName}',
  '<input type="text" name="fatherName" required value={formData.fatherName}'
);
content = content.replace(
  '<input type="date" name="dob" value={formData.dob}',
  '<input type="date" name="dob" required value={formData.dob}'
);

fs.writeFileSync('src/components/AdminStaffManagementScreen.tsx', content);
