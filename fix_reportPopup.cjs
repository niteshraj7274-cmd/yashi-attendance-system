const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

code = code.replace(
  `<button 
                onClick={() => setShowReportPopup(false)}
                className="flex-1 p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                Remind Me Later
              </button>`,
  ''
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
