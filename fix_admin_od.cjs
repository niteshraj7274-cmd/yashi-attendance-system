const fs = require('fs');
let code = fs.readFileSync('src/components/AdminOfficialDutyScreen.tsx', 'utf8');

if (!code.includes('validateRequestApproval')) {
  code = code.replace(
    /import \{ collection, query, getDocs, updateDoc, doc, serverTimestamp, onSnapshot, addDoc \} from 'firebase\/firestore';/,
    match => match + "\nimport { validateRequestApproval } from '../utils/validationHelpers';"
  );
}

// In handleAction
code = code.replace(
  /const handleAction = async \(req: any, action: 'Approved' \| 'Rejected' \| 'Info Requested'\) => \{\s*try \{/,
  `const handleAction = async (req: any, action: 'Approved' | 'Rejected' | 'Info Requested') => {
    if (action === 'Approved') {
      const validation = await validateRequestApproval(
        req.staffUid,
        req.Date,
        req.Date,
        'Official Duty',
        req.id
      );
      if (!validation.valid) {
        alert(validation.message);
        return;
      }
    }
    try {`
);

fs.writeFileSync('src/components/AdminOfficialDutyScreen.tsx', code);
