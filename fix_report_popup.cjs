const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// The JSX for reportReminderPopup starts at `{reportReminderPopup && (` and ends at the closing div for AnimatePresence.
// Actually, it's easier to just remove it using regex or just let it be since we never set it to true.
// But let's check if it's set to true anywhere else.

