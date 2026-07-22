const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

code = code.replace(
  `<h2 className="text-lg font-bold text-slate-800 mb-4">📋 Daily Mobilization Report</h2>
              <p className="text-sm text-slate-600 mb-6">
                You have a pending Daily Mobilization Report. Please fill and submit the report before completing today's work.
              </p>`,
  `<h2 className="text-lg font-bold text-slate-800 mb-4">Daily Mobilization Report</h2>
              <p className="text-sm text-slate-600 mb-6 whitespace-pre-line">
                Your OUT Attendance has been recorded successfully.\nYou have one pending Daily Mobilization Report.\nPlease fill and submit your report.
              </p>`
);

code = code.replace(
  `<button
                  onClick={async () => {
                    setReportReminderPopup(false);
                    // Update DB to mark report reminder shown
                    if (attendanceRecord?.id) {
                      try {
                        const { doc, updateDoc } = await import('firebase/firestore');
                        const { db } = await import('../firebase');

                        await updateDoc(doc(db, 'attendance', attendanceRecord.id), {
                          'Report Reminder Shown': true
                        });
                      } catch (e) {
                        console.error('Error updating report reminder status:', e);
                      }
                    }
                  }}
                  className="w-full bg-slate-100 text-slate-600 font-bold uppercase tracking-widest text-sm py-3 rounded-xl hover:bg-slate-200 transition-colors border border-slate-200"
                >
                  Dismiss
                </button>`,
  `<button
                  onClick={async () => {
                    setReportReminderPopup(false);
                  }}
                  className="w-full bg-slate-100 text-slate-600 font-bold uppercase tracking-widest text-sm py-3 rounded-xl hover:bg-slate-200 transition-colors border border-slate-200"
                >
                  Later
                </button>`
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
