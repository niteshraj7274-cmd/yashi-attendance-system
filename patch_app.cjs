const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('AdminAttendanceGuideScreen')) {
  const importsEnd = "const AdminSettingsScreen = lazy(() => import('./components/AdminSettingsScreen'));";
  const newImportsEnd = "const AdminSettingsScreen = lazy(() => import('./components/AdminSettingsScreen'));\nconst AdminAttendanceGuideScreen = lazy(() => import('./components/AdminAttendanceGuideScreen'));\nconst CentreAttendanceGuideScreen = lazy(() => import('./components/CentreAttendanceGuideScreen'));";
  code = code.replace(importsEnd, newImportsEnd);
  
  const adminRoutesEnd = "<Route path=\"/admin/settings\" element={<ProtectedRoute role=\"admin\"><AdminSettingsScreen /></ProtectedRoute>} />";
  const newAdminRoutesEnd = "<Route path=\"/admin/settings\" element={<ProtectedRoute role=\"admin\"><AdminSettingsScreen /></ProtectedRoute>} />\n          <Route path=\"/admin/attendance-guide\" element={<ProtectedRoute role=\"admin\"><AdminAttendanceGuideScreen /></ProtectedRoute>} />";
  code = code.replace(adminRoutesEnd, newAdminRoutesEnd);
  
  const centreRoutesEnd = "<Route path=\"/centre/:centerId/salary\" element={<ProtectedRoute role=\"centre\"><CentreSalaryScreen /></ProtectedRoute>} />";
  const newCentreRoutesEnd = "<Route path=\"/centre/:centerId/salary\" element={<ProtectedRoute role=\"centre\"><CentreSalaryScreen /></ProtectedRoute>} />\n          <Route path=\"/centre/:centerId/attendance-guide\" element={<ProtectedRoute role=\"centre\"><CentreAttendanceGuideScreen /></ProtectedRoute>} />";
  code = code.replace(centreRoutesEnd, newCentreRoutesEnd);
  
  fs.writeFileSync('src/App.tsx', code);
}
