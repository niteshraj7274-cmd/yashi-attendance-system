const fs = require('fs');
let code = fs.readFileSync('src/components/AdminLeaveScreen.tsx', 'utf8');

if (!code.includes('validateRequestApproval')) {
  code = code.replace(
    /import \{ collection, query, getDocs, updateDoc, doc, serverTimestamp, onSnapshot \} from 'firebase\/firestore';/,
    match => match + "\nimport { validateRequestApproval } from '../utils/validationHelpers';"
  );
}

// In handleAction, we only get leaveId. We need to find the leave object from `leaves` state.
code = code.replace(
  /const handleAction = async \(leaveId: string, action: string\) => \{\s*try \{/,
  `const handleAction = async (leaveId: string, action: string) => {
    
    if (action === 'Approved') {
      const leave = leaves.find((l: any) => l.id === leaveId);
      if (leave) {
        const validation = await validateRequestApproval(
          leave.staffUid,
          leave.fromDate,
          leave.toDate,
          'Leave',
          leave.id
        );
        if (!validation.valid) {
          alert(validation.message);
          return;
        }
      }
    }
    
    try {`
);

fs.writeFileSync('src/components/AdminLeaveScreen.tsx', code);
