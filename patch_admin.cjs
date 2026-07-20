const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboardScreen.tsx', 'utf8');

content = content.replace(
  "    { label: 'Center Management', icon: Building2, path: '/admin/centers', color: 'bg-blue-600', module: 'all' },\n",
  ""
);
content = content.replace(
  "    { label: 'Staff Management', icon: Users, path: '/admin/staff', color: 'bg-indigo-600', module: 'all' },\n",
  ""
);

fs.writeFileSync('src/components/AdminDashboardScreen.tsx', content);
