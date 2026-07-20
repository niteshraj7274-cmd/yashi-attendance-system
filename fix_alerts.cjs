const fs = require('fs');
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// The alerts might be just "alert('Attendance Saved Successfully.');" or similar
content = content.replace(
  "alert('Attendance Saved Successfully.');",
  "if (type === 'IN') {\n              alert('GPS Attendance marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');\n            } else {\n              alert('Attendance OUT marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');\n              setShowDailyReportPopup(true);\n            }"
);

content = content.replace(
  "alert('Attendance Saved Successfully.');",
  "if (type === 'IN') {\n              alert('GPS Attendance marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');\n            } else {\n              alert('Attendance OUT marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');\n              setShowDailyReportPopup(true);\n            }"
);

content = content.replace(
  "alert(\"Attendance Saved Successfully.\");",
  "if (type === 'IN') {\n              alert('GPS Attendance marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');\n            } else {\n              alert('Attendance OUT marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');\n              setShowDailyReportPopup(true);\n            }"
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
