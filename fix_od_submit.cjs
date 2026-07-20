const fs = require('fs');

let code = fs.readFileSync('src/components/CentreOfficialDutyScreen.tsx', 'utf8');

code = code.replace(
  /const staff = staffList\.find\(s => \(s\.name \+ ' \(' \+ s\.staffId \+ '\)'\) === selectedStaffId \|\| s\.name === selectedStaffId\);/,
  `const staff = staffList.find(s => s.id === selectedStaffId);`
);

code = code.replace(
  /staffUid: staff \? staff\.id : 'custom-' \+ Date\.now\(\),/g,
  `staffUid: staff ? staff.id : '',`
);

fs.writeFileSync('src/components/CentreOfficialDutyScreen.tsx', code);
