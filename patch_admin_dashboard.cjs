const fs = require('fs');
let code = fs.readFileSync('src/components/AdminProfessionalDashboardScreen.tsx', 'utf8');

const oldDuty = "{ label: 'Official Duty', icon: MapPin, path: '/admin/official-duty', color: 'bg-pink-600', module: 'odModuleEnabled' },";
const oldLeave = "{ label: 'Leave Management', icon: Calendar, path: '/admin/leave', color: 'bg-teal-600', module: 'leaveModuleEnabled' },";

const newRequest = "{ label: 'Request Management', icon: Calendar, path: '/admin/requests', color: 'bg-indigo-600', module: 'all' },";

if (code.includes(oldDuty)) {
  code = code.replace(oldDuty, newRequest);
  code = code.replace(oldLeave, ''); // Remove the extra one
  fs.writeFileSync('src/components/AdminProfessionalDashboardScreen.tsx', code);
  console.log("Patched AdminProfessionalDashboardScreen successfully");
} else {
  console.log("Could not find oldDuty string.");
}
