const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboardScreen.tsx', 'utf-8');

const targetStr = `{ label: 'Job Categories', icon: Users, path: '/admin/job-categories', color: 'bg-teal-700', module: 'all' },`;
const replaceStr = `{ label: 'Job Categories', icon: Users, path: '/admin/job-categories', color: 'bg-teal-700', module: 'all' },
    { label: 'Device Management', icon: Users, path: '/admin/device-management', color: 'bg-rose-700', module: 'all' },`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/AdminDashboardScreen.tsx', content);
  console.log("AdminDashboardScreen.tsx patched");
}
