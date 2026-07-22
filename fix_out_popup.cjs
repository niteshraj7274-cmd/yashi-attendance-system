const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// Replace the old onOk logic for success popup
code = code.replace(
  `        onOk={() => {
          const type = successPopup?.type;
          setSuccessPopup(null);
          if (type === 'OUT') {
            const isAssignedDMR = assignedReports.some(r => r.toLowerCase().includes('dmr') || r.toLowerCase().includes('mobilization'));
            if (isAssignedDMR) {
              setTimeout(() => {
                setReportReminderPopup(true);
              }, 1000);
            }
          }
        }}`,
  `        onOk={() => {
          setSuccessPopup(null);
        }}`
);

// We need to implement the check after OUT is saved.
// But wait, there are two places where OUT is saved: selfie and location-only.
// Let's create a helper function in StaffDashboardScreen to handle OUT success.
