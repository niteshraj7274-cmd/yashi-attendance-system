const fs = require('fs');
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const popupCode = `
      {showDailyReportPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[100]">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-emerald-50">
              <h2 className="font-bold text-emerald-800">Today's Attendance Report</h2>
              <button onClick={() => setShowDailyReportPopup(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Date</p>
                  <p className="font-medium text-slate-900">{attendanceRecord?.['Date']}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Staff Name</p>
                  <p className="font-medium text-slate-900">{attendanceRecord?.['Staff Name'] || staffData.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Center Name</p>
                  <p className="font-medium text-slate-900">{attendanceRecord?.['Center Name'] || centerInfo?.name}</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">IN Time</p>
                    <p className="font-medium text-slate-900">{attendanceRecord?.['IN Time']}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">OUT Time</p>
                    <p className="font-medium text-slate-900">{attendanceRecord?.['OUT Time'] || '-'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Total Working Hours</p>
                  <p className="font-medium text-slate-900">
                    {attendanceRecord?.['IN Time'] && attendanceRecord?.['OUT Time'] 
                      ? (() => {
                          const inParts = attendanceRecord['IN Time'].match(/(\\d+):(\\d+)\\s*(AM|PM)/i);
                          const outParts = attendanceRecord['OUT Time'].match(/(\\d+):(\\d+)\\s*(AM|PM)/i);
                          if (inParts && outParts) {
                            let inHrs = parseInt(inParts[1]), inMins = parseInt(inParts[2]);
                            if (inParts[3].toUpperCase() === 'PM' && inHrs < 12) inHrs += 12;
                            if (inParts[3].toUpperCase() === 'AM' && inHrs === 12) inHrs = 0;
                            
                            let outHrs = parseInt(outParts[1]), outMins = parseInt(outParts[2]);
                            if (outParts[3].toUpperCase() === 'PM' && outHrs < 12) outHrs += 12;
                            if (outParts[3].toUpperCase() === 'AM' && outHrs === 12) outHrs = 0;
                            
                            let diffMs = (outHrs * 60 + outMins) * 60000 - (inHrs * 60 + inMins) * 60000;
                            if (diffMs < 0) diffMs += 24 * 60 * 60 * 1000;
                            
                            const hrs = Math.floor(diffMs / 3600000);
                            const mins = Math.floor((diffMs % 3600000) / 60000);
                            return \`\${hrs}h \${mins}m\`;
                          }
                          return 'N/A';
                        })()
                      : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Attendance Status</p>
                  <p className="font-medium text-emerald-600 font-bold">{attendanceRecord?.['Attendance Status']}</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 flex gap-3">
              <button onClick={() => setShowDailyReportPopup(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-slate-200">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
`;

content = content.replace('{showReportPopup && (', popupCode + '\n      {showReportPopup && (');
fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
