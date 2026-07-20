const fs = require('fs');
let content = fs.readFileSync('src/components/CentreStaffSelectionScreen.tsx', 'utf8');

const queryMatch = `const q = query(
          collection(db, 'staff'),
          where('centerId', '==', centerId),
          where('isDeleted', '==', false)
        );`;
const newQueryMatch = `const q = query(
          collection(db, 'staff'),
          where('centerId', '==', centerId)
        );`;

content = content.replace(queryMatch, newQueryMatch);

// What if the staff objects don't have centerId but centerCode? Let's check AdminStaffManagementScreen again.
// No, AdminStaff saves centerId.
fs.writeFileSync('src/components/CentreStaffSelectionScreen.tsx', content);
