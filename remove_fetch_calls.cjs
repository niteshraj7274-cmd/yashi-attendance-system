const fs = require('fs');

let centerContent = fs.readFileSync('src/components/AdminCenterManagementScreen.tsx', 'utf8');
centerContent = centerContent.replace(/fetchCenters\(\);/g, '');
fs.writeFileSync('src/components/AdminCenterManagementScreen.tsx', centerContent);

let staffContent = fs.readFileSync('src/components/AdminStaffManagementScreen.tsx', 'utf8');
staffContent = staffContent.replace(/fetchData\(\);/g, '');
fs.writeFileSync('src/components/AdminStaffManagementScreen.tsx', staffContent);

