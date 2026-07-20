const fs = require('fs');
let code = fs.readFileSync('src/components/AdminRequestManagementScreen.tsx', 'utf8');

if (!code.includes('validateRequestApproval')) {
  code = code.replace(
    /import \{ collection, query, getDocs, updateDoc, doc, serverTimestamp, onSnapshot, addDoc \} from 'firebase\/firestore';/,
    match => match + "\nimport { validateRequestApproval } from '../utils/validationHelpers';"
  );
}

// Inside handleAction
code = code.replace(
  /const handleAction = async \(action: 'Approved' \| 'Rejected'\) => \{\s*if \(!selectedRequest\) return;\s*setActionLoading\(true\);\s*try \{/,
  `const handleAction = async (action: 'Approved' | 'Rejected') => {
    if (!selectedRequest) return;
    
    if (action === 'Approved') {
      const fromD = selectedRequest.requestType === 'Leave' ? selectedRequest.fromDate : selectedRequest.Date;
      const toD = selectedRequest.requestType === 'Leave' ? selectedRequest.toDate : selectedRequest.Date;
      const validation = await validateRequestApproval(
        selectedRequest.staffUid,
        fromD,
        toD,
        selectedRequest.requestType,
        selectedRequest.id
      );
      if (!validation.valid) {
        alert(validation.message);
        return;
      }
    }

    setActionLoading(true);
    try {`
);

fs.writeFileSync('src/components/AdminRequestManagementScreen.tsx', code);
