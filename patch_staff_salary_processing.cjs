const fs = require('fs');
let content = fs.readFileSync('src/components/AdminStaffManagementScreen.tsx', 'utf8');

content = content.replace(/salaryProcessing:/g, 'salaryProcessingEnabled:');
content = content.replace(/salaryProcessing /g, 'salaryProcessingEnabled ');
content = content.replace(/formData\.salaryProcessing/g, 'formData.salaryProcessingEnabled');
content = content.replace(/oldStaff\?\.salaryProcessing/g, 'oldStaff?.salaryProcessingEnabled');

fs.writeFileSync('src/components/AdminStaffManagementScreen.tsx', content);
