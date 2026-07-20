const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// Replace Duty Type
code = code.replace(
  /<select\s+value=\{odDutyType\}\s+onChange=\{\(e\) => setOdDutyType\(e\.target\.value\)\}([\s\S]*?)<\/select>/g,
  `<input 
    type="text"
    list="duty-list"
    value={odDutyType}
    onChange={e => setOdDutyType(e.target.value)}
    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
    placeholder="Type or select duty type..."
    required
  />
  <datalist id="duty-list">
    <option value="Field Visit" />
    <option value="Training" />
    <option value="Meeting" />
    <option value="Inspection" />
    <option value="Mobilization" />
    <option value="Government Work" />
    <option value="Office Work" />
    <option value="Exam Duty" />
    <option value="Official Tour" />
    <option value="Other" />
  </datalist>`
);

// Remove Other Duty Type block
code = code.replace(/\{odDutyType === 'Other' && \([\s\S]*?\}\)/g, '');

// Update submission
code = code.replace(
  /if \(\(!odDutyType \|\| !odReason \|\| \(odDutyType === 'Other' && !otherOdDutyType\)\)\) \{/g,
  `if (!odDutyType || !odReason) {`
);

code = code.replace(
  /'Duty Type': \(odDutyType === 'Other' \? otherOdDutyType : odDutyType\) \|\| '',/g,
  `'Duty Type': odDutyType || '',`
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
