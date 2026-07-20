const fs = require('fs');

function updateLeaveScreen() {
  let code = fs.readFileSync('src/components/AdminLeaveScreen.tsx', 'utf8');
  code = code.replace(
    /const validation = await validateRequestApproval\(\s*leave\.staffUid,\s*leave\.fromDate,\s*leave\.toDate,\s*'Leave',\s*leave\.id\s*\);/g,
    `const validation = await validateRequestApproval(
          leave.staffUid,
          leave.fromDate,
          leave.toDate,
          'Leave',
          leave.id,
          leave['Request Date & Time'] || (leave.timestamp?.toDate ? leave.timestamp.toDate().toISOString() : undefined)
        );`
  );
  fs.writeFileSync('src/components/AdminLeaveScreen.tsx', code);
}

function updateRequestScreen() {
  let code = fs.readFileSync('src/components/AdminRequestManagementScreen.tsx', 'utf8');
  code = code.replace(
    /const validation = await validateRequestApproval\(\s*selectedRequest\.staffUid,\s*fromD,\s*toD,\s*selectedRequest\.requestType,\s*selectedRequest\.id\s*\);/g,
    `const validation = await validateRequestApproval(
        selectedRequest.staffUid,
        fromD,
        toD,
        selectedRequest.requestType,
        selectedRequest.id,
        selectedRequest['Request Date & Time'] || (selectedRequest.timestamp?.toDate ? selectedRequest.timestamp.toDate().toISOString() : undefined)
      );`
  );
  fs.writeFileSync('src/components/AdminRequestManagementScreen.tsx', code);
}

updateLeaveScreen();
updateRequestScreen();
