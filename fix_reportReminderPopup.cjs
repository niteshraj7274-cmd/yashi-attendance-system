const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// The instructions asked to remove the "Later" option completely.
// Just in case `reportReminderPopup` is used elsewhere, we should remove the "Later" button from it.

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
                  Later
                </button>`,
  ''
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
