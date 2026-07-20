const fs = require('fs');
function fix(file) {
  let code = fs.readFileSync(file, 'utf8');
  // CentreOfficialDutyScreen has AnimatePresence at the end that needs removal
  code = code.replace(/<\/AnimatePresence>/g, '');
  fs.writeFileSync(file, code);
}
fix('src/components/CentreOfficialDutyScreen.tsx');
fix('src/components/CentreLeaveScreen.tsx');
