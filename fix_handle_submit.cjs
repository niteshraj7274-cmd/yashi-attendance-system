const fs = require('fs');
function fixSubmit(file) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/setSubmitting\(false\);\n\s*;/g, 'setSubmitting(false);\n    }\n  };');
  fs.writeFileSync(file, code);
}
fixSubmit('src/components/CentreLeaveScreen.tsx');
fixSubmit('src/components/CentreOfficialDutyScreen.tsx');
