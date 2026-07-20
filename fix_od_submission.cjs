const fs = require('fs');

let code = fs.readFileSync('src/components/CentreOfficialDutyScreen.tsx', 'utf8');

if (!code.includes('validateRequestSubmission')) {
  code = code.replace(
    /import \{ collection, query, where, getDocs, doc, serverTimestamp, addDoc, onSnapshot, getDoc \} from 'firebase\/firestore';/,
    match => match + "\nimport { validateRequestSubmission } from '../utils/validationHelpers';"
  );
}

// Modify handleSubmit
code = code.replace(
  /if \(!selectedStaffId \|\| !date \|\| !time \|\| !reason \|\| !location\) return alert\('Please fill all fields'\);\s*setSubmitting\(true\);\s*try \{\s*const staff = staffList\.find\(s => s\.id === selectedStaffId\);/,
  `if (!selectedStaffId || !date || !time || !reason || !location) return alert('Please fill all fields');
    
    const staff = staffList.find(s => s.id === selectedStaffId);
    if (!staff) { alert("Staff not found"); return; }
    
    const validation = await validateRequestSubmission(staff.id, date, date, 'Official Duty');
    if (!validation.valid) { alert(validation.message); return; }

    setSubmitting(true);
    try {
      `
);

fs.writeFileSync('src/components/CentreOfficialDutyScreen.tsx', code);

let staffCode = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

if (!staffCode.includes('validateRequestSubmission')) {
  staffCode = staffCode.replace(
    /import \{ collection, query, where, getDocs, doc, setDoc, updateDoc, serverTimestamp, addDoc, onSnapshot \} from 'firebase\/firestore';/,
    match => match + "\nimport { validateRequestSubmission } from '../utils/validationHelpers';"
  );
}

// Official duty submit is `const submitOfficialDuty = async () => {`
staffCode = staffCode.replace(
  /const submitOfficialDuty = async \(\) => \{\s*if \(!odDutyType \|\| !odReason \|\| \(odDutyType === 'Other' && !otherOdDutyType\)\) \{\s*alert\("Please provide a reason and select a duty type\."\);\s*return;\s*\}\s*setOdSubmitting\(true\);/,
  `const submitOfficialDuty = async () => {
    if (!odDutyType || !odReason || (odDutyType === 'Other' && !otherOdDutyType)) {
      alert("Please provide a reason and select a duty type.");
      return;
    }
    
    // Validate
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-CA');
    const validation = await validateRequestSubmission(staffData.id, dateStr, dateStr, 'Official Duty');
    if (!validation.valid) {
      alert(validation.message);
      return;
    }

    setOdSubmitting(true);`
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', staffCode);
