const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const importAdminRequest = "const AdminRequestManagementScreen = lazy(() => import('./components/AdminRequestManagementScreen'));\n";

if (!code.includes("AdminRequestManagementScreen")) {
  code = code.replace("const AdminProfileScreen", importAdminRequest + "const AdminProfileScreen");
}

const oldRouteLeave = `<Route path="/admin/leave" element={<ProtectedRoute role="admin"><AdminLeaveScreen /></ProtectedRoute>} />`;
const oldRouteDuty = `<Route path="/admin/official-duty" element={<ProtectedRoute role="admin"><AdminOfficialDutyScreen /></ProtectedRoute>} />`;

const newRouteRequest = `<Route path="/admin/requests" element={<ProtectedRoute role="admin"><AdminRequestManagementScreen /></ProtectedRoute>} />`;

if (code.includes(oldRouteDuty)) {
  code = code.replace(oldRouteDuty, newRouteRequest);
}
if (code.includes(oldRouteLeave)) {
  code = code.replace(oldRouteLeave, '');
}

fs.writeFileSync('src/App.tsx', code);
console.log("Patched App.tsx successfully");
