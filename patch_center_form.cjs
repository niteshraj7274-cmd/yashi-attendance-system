const fs = require('fs');
const path = 'src/components/AdminCenterFormScreen.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  "navigate('/admin/staff/new', { state: { centerCode: formData.code, centerName: formData.name } });",
  "navigate('/admin/staff/new', { state: { centerId: newDocRef.id, centerCode: formData.code, centerName: formData.name } });"
);

fs.writeFileSync(path, content);
