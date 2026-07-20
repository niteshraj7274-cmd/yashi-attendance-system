import fs from 'fs';

let app = fs.readFileSync('src/App.tsx', 'utf8');

// Add import
const importStr = "const AdminCenterwiseAttendanceScreen = lazy(() => import('./components/AdminCenterwiseAttendanceScreen'));";
const newImportStr = importStr + "\nconst AdminMISReportScreen = lazy(() => import('./components/AdminMISReportScreen'));";
app = app.replace(importStr, newImportStr);

// Add Route
const routeStr = '<Route path="/admin/centerwise-attendance" element={<ProtectedRoute role="admin"><AdminCenterwiseAttendanceScreen /></ProtectedRoute>} />';
const newRouteStr = routeStr + '\n              <Route path="/admin/mis-report" element={<ProtectedRoute role="admin"><AdminMISReportScreen /></ProtectedRoute>} />';
app = app.replace(routeStr, newRouteStr);

fs.writeFileSync('src/App.tsx', app);

let dash = fs.readFileSync('src/components/AdminDashboardScreen.tsx', 'utf8');

const dashStr = "{ label: 'Excel Reports', icon: FileBarChart, path: '/admin/centerwise-attendance', color: 'bg-emerald-600', module: 'all' },";
const newDashStr = dashStr + "\n    { label: 'MIS Monthly Report', icon: Calendar, path: '/admin/mis-report', color: 'bg-blue-800', module: 'all' },";
dash = dash.replace(dashStr, newDashStr);

fs.writeFileSync('src/components/AdminDashboardScreen.tsx', dash);

console.log('Patched App.tsx and AdminDashboardScreen.tsx');
