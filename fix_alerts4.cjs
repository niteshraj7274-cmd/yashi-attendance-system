const fs = require('fs');
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// I will just look for `type === 'IN'` and `} else { // OUT`

// For the `processSelfieLocationAttendance`
content = content.replace(
  "alert('Attendance OUT marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');\n            setShowDailyReportPopup(true);\n          } else {\n            // OUT",
  "alert('GPS Attendance marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');\n          } else {\n            // OUT"
);

content = content.replace(
  "setAttendanceRecord({ ...attendanceRecord, ...outRecord });\n            alert('GPS Attendance marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');\n          }\n          setLocationLoading(false);",
  "setAttendanceRecord({ ...attendanceRecord, ...outRecord });\n            alert('Attendance OUT marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');\n            setShowDailyReportPopup(true);\n          }\n          setLocationLoading(false);"
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
