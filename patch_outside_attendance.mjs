import fs from 'fs';
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

content = content.replace(
  /'District': centerInfo\?\.district \|\| '',/g,
  "'District': centerInfo?.district || '',"
);
content = content.replace(
  /'Block': centerInfo\?\.block \|\| '',/g,
  "'Block': centerInfo?.block || '',"
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
