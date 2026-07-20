const fs = require('fs');
let code = fs.readFileSync('src/components/CentreLeaveScreen.tsx', 'utf8');

// Replace Select Staff
code = code.replace(
  /<select\s+value=\{selectedStaffId\}\s+onChange=\{e => setSelectedStaffId\(e\.target\.value\)\}([\s\S]*?)<\/select>/g,
  `<input 
    type="text"
    list="staff-list"
    value={selectedStaffId}
    onChange={e => setSelectedStaffId(e.target.value)}
    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
    placeholder="Type or select staff name..."
    required
  />
  <datalist id="staff-list">
    {staffList.map(s => (
      <option key={s.id} value={s.name + ' (' + s.staffId + ')'} />
    ))}
  </datalist>`
);

// Update handleSubmit
code = code.replace(
  /const staff = staffList\.find\(s => s\.id === selectedStaffId\);\s*const newRequest = \{\s*staffUid: staff\.id,\s*'Staff ID': staff\.staffId \|\| '',\s*'Staff Name': staff\.name \|\| '',/g,
  `const staff = staffList.find(s => (s.name + ' (' + s.staffId + ')') === selectedStaffId || s.name === selectedStaffId);
      
      const newRequest = {
        staffUid: staff ? staff.id : 'custom-' + Date.now(),
        'Staff ID': staff ? (staff.staffId || '') : 'N/A',
        'Staff Name': staff ? (staff.name || '') : selectedStaffId,`
);

fs.writeFileSync('src/components/CentreLeaveScreen.tsx', code);
