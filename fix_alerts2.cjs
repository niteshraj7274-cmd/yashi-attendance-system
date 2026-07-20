const fs = require('fs');
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// The replacement was done blindly. I will just replace the specific blocks.
// Wait, I can just change it using a regex or simple replace.

content = content.replace(
  "if (type === 'IN') {\n              alert('GPS Attendance marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');\n            } else {\n              alert('Attendance OUT marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');\n              setShowDailyReportPopup(true);\n            }",
  "alert('GPS Attendance marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');"
);

// We have 4 occurrences of this block.
// Occurrence 1: IN block of processSelfieLocationAttendance
// Occurrence 2: OUT block of processSelfieLocationAttendance
// Occurrence 3: IN block of processLocationOnlyAttendance
// Occurrence 4: OUT block of processLocationOnlyAttendance

// Let's just restore it manually using node.

