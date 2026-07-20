const fs = require('fs');
let code = fs.readFileSync('src/components/CentreStaffSelectionScreen.tsx', 'utf8');

// Insert logout confirm modal and notifications modal before the final </div>
const insertion = `
      {/* Logout Confirm Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-red-600 p-4 flex items-center justify-between text-white">
                <h3 className="font-bold uppercase tracking-wide text-sm flex items-center gap-2"><LogOut size={18}/> Confirm Logout</h3>
                <button onClick={() => setShowLogoutConfirm(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 text-center">
                <p className="text-slate-700 font-medium mb-6">Are you sure you want to logout?</p>
                <div className="flex gap-3">
                  <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-lg transition-colors text-sm uppercase tracking-wider">
                    No
                  </button>
                  <button onClick={() => {
                    localStorage.removeItem('centreSession');
                    navigate('/centre-login');
                  }} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors text-sm uppercase tracking-wider">
                    Yes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Notifications Modal */}
      <AnimatePresence>
        {showNotifications && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-slate-50 w-full max-w-md h-[80vh] rounded-2xl shadow-xl flex flex-col overflow-hidden relative"
            >
              <div className="bg-blue-900 text-white p-4 flex items-center justify-between shrink-0 z-10 shadow-sm">
                <h3 className="font-bold uppercase tracking-wide text-sm flex items-center gap-2"><Bell size={18}/> Notifications</h3>
                <button onClick={() => setShowNotifications(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="bg-white p-2 border-b border-slate-200 flex justify-between shrink-0 text-xs font-bold uppercase tracking-wider">
                <button onClick={async () => {
                   try {
                     const batch = writeBatch(db);
                     notifications.filter(n => !n.read).forEach(n => {
                        batch.update(doc(db, 'center_notifications', n.id), { read: true });
                     });
                     await batch.commit();
                   } catch(e) { console.error(e); }
                }} className="text-blue-600 p-2 hover:bg-blue-50 rounded transition-colors flex items-center gap-1"><CheckCircle2 size={14}/> Mark All Read</button>
                <button onClick={async () => {
                   if(window.confirm('Clear all notifications?')) {
                     try {
                       const batch = writeBatch(db);
                       notifications.forEach(n => {
                          batch.delete(doc(db, 'center_notifications', n.id));
                       });
                       await batch.commit();
                     } catch(e) { console.error(e); }
                   }
                }} className="text-red-600 p-2 hover:bg-red-50 rounded transition-colors flex items-center gap-1"><Trash2 size={14}/> Clear All</button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 relative">
                {notifications.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 font-medium">No notifications found.</div>
                ) : (
                  notifications.map(notif => (
                    <div key={notif.id} className={\`bg-white p-4 rounded-xl shadow-sm border \${notif.read ? 'border-slate-200' : 'border-blue-300 ring-1 ring-blue-100'} relative\`}>
                      {!notif.read && <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>}
                      <div className="flex justify-between items-start mb-2">
                         <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{new Date(notif.timestamp?.toMillis?.() || Date.now()).toLocaleString()}</span>
                         <button onClick={async () => {
                             try { await deleteDoc(doc(db, 'center_notifications', notif.id)); } catch(e) { console.error(e); }
                         }} className="text-slate-400 hover:text-red-500 p-1"><Trash2 size={14}/></button>
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm mb-1">{notif.title}</h4>
                      <p className="text-xs text-slate-600 mb-3">{notif.message}</p>
                      
                      {notif.staffName && (
                        <div className="bg-slate-50 p-2 rounded-lg text-xs font-medium text-slate-700 grid grid-cols-2 gap-2 border border-slate-100">
                          <div><span className="text-[9px] uppercase text-slate-400 block">Staff Name</span>{notif.staffName}</div>
                          <div><span className="text-[9px] uppercase text-slate-400 block">Staff ID</span>{notif.staffId}</div>
                          {notif.designation && <div className="col-span-2"><span className="text-[9px] uppercase text-slate-400 block">Designation</span>{notif.designation}</div>}
                          {notif.attendanceStatus && <div><span className="text-[9px] uppercase text-slate-400 block">Status</span>{notif.attendanceStatus}</div>}
                          {notif.date && <div><span className="text-[9px] uppercase text-slate-400 block">Date</span>{notif.date}</div>}
                          {notif.time && <div><span className="text-[9px] uppercase text-slate-400 block">Time</span>{notif.time}</div>}
                          {notif.reason && <div className="col-span-2"><span className="text-[9px] uppercase text-slate-400 block">Reason</span>{notif.reason}</div>}
                          {notif.distance && <div className="col-span-2"><span className="text-[9px] uppercase text-slate-400 block">Distance</span>{notif.distance}</div>}
                        </div>
                      )}

                      {!notif.read && (
                        <button onClick={async () => {
                           try { await updateDoc(doc(db, 'center_notifications', notif.id), { read: true }); } catch(e) { console.error(e); }
                        }} className="mt-3 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-lg text-[10px] uppercase tracking-widest transition-colors">
                           Mark as Read
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
`;

if (!code.includes('showLogoutConfirm && (')) {
  code = code.replace('    </div>\n  );\n}\n', insertion + '    </div>\n  );\n}\n');
  fs.writeFileSync('src/components/CentreStaffSelectionScreen.tsx', code);
  console.log('Successfully added modals to CentreStaffSelectionScreen.tsx');
} else {
  console.log('Modals already exist in CentreStaffSelectionScreen.tsx');
}
