const fs = require('fs');

function fixStaffValue(file) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(
    /options=\{staffList\.map\(s => \(\{ value: s\.name \+ ' \(' \+ s\.staffId \+ '\)', label: s\.name \+ ' \(' \+ s\.staffId \+ '\)' \}\)\)\}/g,
    `options={staffList.map(s => ({ value: s.id, label: s.name + ' (' + s.staffId + ')' }))}`
  );
  // Also, for CentreLeaveScreen, I previously tried to change handleSubmit but maybe it didn't match. 
  // Wait, if we just use s.id, we don't need to change handleSubmit!
  fs.writeFileSync(file, code);
}

fixStaffValue('src/components/CentreLeaveScreen.tsx');
fixStaffValue('src/components/CentreOfficialDutyScreen.tsx');
