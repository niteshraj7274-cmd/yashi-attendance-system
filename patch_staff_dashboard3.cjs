const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const oldCheck = `    if (type === 'IN' && hasMarkedIn) return;
    if (type === 'OUT' && hasMarkedOut) return;`;

const newCheck = `    if ((type === 'IN' && hasMarkedIn) || (type === 'OUT' && hasMarkedOut)) {
      sendCenterNotification(
        centerInfo?.id || '',
        centerInfo?.code || '',
        'Duplicate Attendance Attempt',
        staffData.name || '',
        staffData.staffId || '',
        staffData.designation || 'Staff',
        type,
        \`Tried to mark \${type} again\`,
        0
      );
      return;
    }`;
if (!code.includes('Duplicate Attendance Attempt')) {
  code = code.replace(oldCheck, newCheck);
}

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
