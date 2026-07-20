const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboardScreen.tsx', 'utf8');

content = content.replace(
  "    { label: 'Job Requirements', icon: Users, path: '/admin/job-requirements', color: 'bg-indigo-700', module: 'all' },\n",
  ""
);
content = content.replace(
  "    { label: 'Job Categories', icon: Users, path: '/admin/job-categories', color: 'bg-teal-700', module: 'all' },\n",
  ""
);

fs.writeFileSync('src/components/AdminDashboardScreen.tsx', content);
