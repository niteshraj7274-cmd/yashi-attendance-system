const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const target = '<Route path="/centre/:centerId/salary" element={<CentreSalaryScreen />} />';
const insertion = '<Route path="/centre/:centerId/salary" element={<CentreSalaryScreen />} />\n              <Route path="/centre/:centerId/attendance-guide" element={<CentreAttendanceGuideScreen />} />';

if (!code.includes('/centre/:centerId/attendance-guide')) {
  code = code.replace(target, insertion);
  fs.writeFileSync('src/App.tsx', code);
}
