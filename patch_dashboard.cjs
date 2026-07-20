const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboardScreen.tsx', 'utf8');

if (!content.includes('/admin/centers')) {
  const menuItemsOld = "const menuItems = [";
  const menuItemsNew = "const menuItems = [\n    { label: 'Center Management', icon: Building2, path: '/admin/centers', color: 'bg-blue-600', module: 'all' },\n    { label: 'Staff Management', icon: UserCircle, path: '/admin/staff', color: 'bg-indigo-600', module: 'all' },";
  content = content.replace(menuItemsOld, menuItemsNew);
  fs.writeFileSync('src/components/AdminDashboardScreen.tsx', content);
}
