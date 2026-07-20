import fs from 'fs';
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

content = content.replace(
  /'Device Information': deviceId,/g,
  "'Device Information': deviceId || '',"
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
