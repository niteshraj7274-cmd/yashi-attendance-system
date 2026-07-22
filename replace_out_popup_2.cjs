const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

code = code.replace(
  `setSuccessPopup({
              type: 'OUT',
              title: 'Attendance Marked Successfully.',
              subtitle: "Thank you for completing today's duty. 🎉",
              details: {
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                time: timeStr,
                center: centerInfo?.name || '',
                staffName: staffData?.name || ''
              }
            });`,
  `handleOutSuccess(timeStr);`
);

code = code.replace(
  `setSuccessPopup({
              type: 'OUT',
              title: 'Attendance Marked Successfully.',
              subtitle: "Thank you for completing today's duty. 🎉",
              details: {
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                time: timeStr,
                center: centerInfo?.name || '',
                staffName: staffData?.name || ''
              }
            });`,
  `handleOutSuccess(timeStr);`
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
