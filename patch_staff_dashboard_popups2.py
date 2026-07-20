import re

with open('src/components/StaffDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Instead of removing showDailyReportPopup via index, let's just use regex or keep it and append our new popups before the closing `</div>` of the main container.
# The main container ends with:
#       {showReportPopup && (
# ...
#       )}
#     </div>
#   );

# Let's insert the new popups right before the final `</div>`
new_popups = """
      <AnimatePresence>
        {successPopup && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[100]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl w-full max-w-sm p-6 text-center shadow-xl"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-emerald-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-800 mb-2">{successPopup.title}</h2>
              <p className="text-sm text-slate-600 mb-6">{successPopup.subtitle}</p>
              <button
                onClick={() => {
                  const type = successPopup.type;
                  setSuccessPopup(null);
                  if (type === 'OUT') {
                    setTimeout(() => {
                      setReportReminderPopup(true);
                    }, 1000);
                  }
                }}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-indigo-700 transition-colors"
              >
                OK
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {reportReminderPopup && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[100]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl w-full max-w-sm p-6 text-center shadow-xl"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} className="text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-800 mb-2">📋 Please fill today's Report Management.</h2>
              <p className="text-sm text-slate-600 font-bold mb-4">Date: {new Date().toLocaleDateString('en-GB')}</p>
              
              <div className="bg-amber-50 border border-amber-100 p-3 rounded-lg mb-6 text-left">
                <p className="text-sm text-amber-800">
                  <span className="font-bold">⚠️ Sorry!</span> Report Management is currently under maintenance.
                  <br/>
                  <span className="block mt-1">Coming Soon... 🫣</span>
                </p>
              </div>

              <button
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
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-indigo-700 transition-colors"
              >
                OK
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
"""

content = content.replace("    </div>\n  );\n}", new_popups + "    </div>\n  );\n}")

with open('src/components/StaffDashboardScreen.tsx', 'w') as f:
    f.write(content)
