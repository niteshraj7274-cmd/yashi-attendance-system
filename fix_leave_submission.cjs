const fs = require('fs');

function applyValidationToLeave(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  
  if (!code.includes('validateRequestSubmission')) {
    code = code.replace(
      /import \{ collection, query, where, getDocs, doc, serverTimestamp, addDoc, onSnapshot, getDoc \} from 'firebase\/firestore';|import \{ collection, query, where, getDocs, doc, serverTimestamp, addDoc \} from 'firebase\/firestore';/,
      match => match + "\nimport { validateRequestSubmission } from '../utils/validationHelpers';"
    );
  }

  code = code.replace(
    /if \(!selectedStaffId \|\| !fromDate \|\| !toDate \|\| !reason\) return alert\('Please fill all fields'\);|if \(!fromDate \|\| !toDate \|\| !reason\) return alert\('Please fill all fields'\);/,
    match => match + `\n\n    // Validation\n    const validation = await validateRequestSubmission(staff?.id || staffData?.id, fromDate, toDate, 'Leave');\n    if (!validation.valid) {\n      alert(validation.message);\n      return;\n    }`
  );
  
  // Need to make sure `staff` or `staffData` exists BEFORE validation
  // In CentreLeaveScreen, staff is defined AFTER setSubmitting(true)
  code = code.replace(
    /setSubmitting\(true\);\s*try \{\s*const staff = staffList\.find\(s => s\.id === selectedStaffId\);/,
    `const staff = staffList.find(s => s.id === selectedStaffId);\n    if (!staff) { alert("Staff not found"); return; }\n\n    const validation = await validateRequestSubmission(staff.id, fromDate, toDate, 'Leave');\n    if (!validation.valid) { alert(validation.message); return; }\n\n    setSubmitting(true);\n    try {`
  );
  
  // Wait, I replaced something generic before so let's refine this to work well.
  
  fs.writeFileSync(filePath, code);
}

applyValidationToLeave('src/components/CentreLeaveScreen.tsx');
// Wait, StaffLeaveScreen has staffData
let staffCode = fs.readFileSync('src/components/StaffLeaveScreen.tsx', 'utf8');
if (!staffCode.includes('validateRequestSubmission')) {
  staffCode = staffCode.replace(
    /import \{ collection, query, where, getDocs, addDoc, serverTimestamp \} from 'firebase\/firestore';/,
    `import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';\nimport { validateRequestSubmission } from '../utils/validationHelpers';`
  );
}

staffCode = staffCode.replace(
  /if \(!fromDate \|\| !toDate \|\| !reason\) return alert\('Please fill all fields'\);\s*setSubmitting\(true\);/,
  `if (!fromDate || !toDate || !reason) return alert('Please fill all fields');\n    const validation = await validateRequestSubmission(staffData.id, fromDate, toDate, 'Leave');\n    if (!validation.valid) { alert(validation.message); return; }\n    setSubmitting(true);`
);

fs.writeFileSync('src/components/StaffLeaveScreen.tsx', staffCode);
