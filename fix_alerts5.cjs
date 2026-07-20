const fs = require('fs');
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

content = content.replace(
  "alert('Attendance OUT marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');\n            setShowDailyReportPopup(true);\n            syncData(true);",
  "if (type === 'IN') {\n              alert('GPS Attendance marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');\n            } else {\n              alert('Attendance OUT marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');\n              setShowDailyReportPopup(true);\n            }\n            syncData(true);"
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
