const fs = require('fs');
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const badBlock = "if (type === 'IN') {\n              alert('GPS Attendance marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');\n            } else {\n              alert('Attendance OUT marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');\n              setShowDailyReportPopup(true);\n            }";

const inBlock = "alert('GPS Attendance marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');";
const outBlock = "alert('Attendance OUT marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');\n            setShowDailyReportPopup(true);";

// Occurrences remaining: 3
content = content.replace(badBlock, outBlock);
content = content.replace(badBlock, inBlock);
content = content.replace(badBlock, outBlock);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
