const fs = require('fs');
let content = fs.readFileSync('src/components/AdminCenterManagementScreen.tsx', 'utf8');

content = content.replace(
  '<input type="tel" name="mobile" value={formData.mobile}',
  '<input type="tel" name="mobile" required value={formData.mobile}'
);
content = content.replace(
  '<input type="text" name="district" value={formData.district}',
  '<input type="text" name="district" required value={formData.district}'
);
content = content.replace(
  '<input type="text" name="block" value={formData.block}',
  '<input type="text" name="block" required value={formData.block}'
);

fs.writeFileSync('src/components/AdminCenterManagementScreen.tsx', content);
