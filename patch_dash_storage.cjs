const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboardScreen.tsx', 'utf-8');

const targetStr = `{ label: 'Device Management', icon: Users, path: '/admin/device-management', color: 'bg-rose-700', module: 'all' },`;
const replaceStr = `{ label: 'Device Management', icon: Users, path: '/admin/device-management', color: 'bg-rose-700', module: 'all' },
    { label: 'Storage & Performance', icon: FileBarChart, path: '/admin/storage', color: 'bg-amber-600', module: 'all' },`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/AdminDashboardScreen.tsx', content);
  console.log("AdminDashboardScreen.tsx patched for Storage");
}
