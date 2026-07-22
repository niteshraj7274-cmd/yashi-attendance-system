const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

code = code.replace(
  `              <p className="text-sm text-slate-600 mb-6 whitespace-pre-line">
                Your OUT Attendance has been recorded successfully.
You have one pending Daily Mobilization Report.
Please fill and submit your report.
              </p>`,
  `              <p className="text-sm text-slate-600 mb-6 whitespace-pre-line">
                You have one pending Daily Mobilization Report.
Please fill and submit your report before completing today's work.
              </p>`
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
