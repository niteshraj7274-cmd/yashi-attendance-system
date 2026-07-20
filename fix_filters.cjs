const fs = require('fs');
let content = fs.readFileSync('src/components/AdminAttendanceDashboardScreen.tsx', 'utf8');

// Fix Staff filter
content = content.replace(
  "      // Staff (Staff Code)\n      if (selectedStaff && r['Staff ID'] !== selectedStaff) return false;",
  "      // Staff (Staff Code)\n      if (selectedStaff && (r['Staff ID'] || r.staffId) !== selectedStaff) return false;"
);

// Fix Role filter
content = content.replace(
  "      // Role\n      if (selectedRole) {\n        const staff = staffList.find(s => (s.code || s.staffId) === r['Staff ID']);\n        if (!staff || staff.role !== selectedRole) return false;\n      }",
  "      // Role\n      if (selectedRole) {\n        const staff = staffList.find(s => (s.code || s.staffId) === (r['Staff ID'] || r.staffId));\n        if (!staff || staff.role !== selectedRole) return false;\n      }"
);

fs.writeFileSync('src/components/AdminAttendanceDashboardScreen.tsx', content);
