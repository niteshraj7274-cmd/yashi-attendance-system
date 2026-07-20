const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const importDash = "const AdminAttendanceDashboardScreen = lazy(() => import('./components/AdminAttendanceDashboardScreen'));\n";

content = content.replace("const AdminReportsScreen = lazy(() => import('./components/AdminReportsScreen'));", importDash + "const AdminReportsScreen = lazy(() => import('./components/AdminReportsScreen'));");

const routeDash = '              <Route path="/admin/attendance-dashboard" element={<AdminAttendanceDashboardScreen />} />\n';

content = content.replace('<Route path="/admin/reports" element={<AdminReportsScreen />} />', routeDash + '              <Route path="/admin/reports" element={<AdminReportsScreen />} />');

fs.writeFileSync('src/App.tsx', content);
console.log("App.tsx patched for Attendance Dashboard");
