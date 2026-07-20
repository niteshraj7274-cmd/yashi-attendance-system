const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const anchor = `const AdminDashboardScreen = lazy(() => import('./components/AdminDashboardScreen'));`;
const newImports = `const AdminCenterManagementScreen = lazy(() => import('./components/AdminCenterManagementScreen'));
const AdminStaffManagementScreen = lazy(() => import('./components/AdminStaffManagementScreen'));`;

content = content.replace(anchor, anchor + '\n' + newImports);
fs.writeFileSync('src/App.tsx', content);
