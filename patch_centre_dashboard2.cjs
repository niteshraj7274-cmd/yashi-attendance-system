const fs = require('fs');
let code = fs.readFileSync('src/components/CentreStaffSelectionScreen.tsx', 'utf8');

const importFirestore = "import { collection, query, getDocs, doc, getDoc, where, onSnapshot } from 'firebase/firestore';";
const newImportFirestore = "import { collection, query, getDocs, doc, getDoc, where, onSnapshot, writeBatch, deleteDoc, updateDoc } from 'firebase/firestore';";
if (!code.includes('writeBatch')) {
  code = code.replace(importFirestore, newImportFirestore);
}

const renderEnd = `        </AnimatePresence>
      </div>
    </div>
  );
}`;

const notificationPanel = `        </AnimatePresence>
        
        {/* Logout Confirmation */}
        <AnimatePresence>
          {showLogoutConfirm && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden">
                <div className="p-6 text-center">
                  <LogOut size={48} className="mx-auto text-red-500 mb-4 opacity-80" />
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Are you sure you want to logout?</h3>
                  <p className="text-sm text-slate-500 mb-6">You will need to enter your credentials again to access the portal.</p>
                  <div className="flex gap-3">
                    <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200">No, Cancel</button>
                    <button onClick={() => {
                      localStorage.removeItem('centreSession');
                      navigate('/centre-login');
                    }} className="flex-1 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">Yes, Logout</button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notifications Panel */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }} className="fixed inset-y-0 right-0 w-full sm:w-96 bg-slate-50 shadow-2xl z-50 flex flex-col border-l border-slate-200">
              <div className="bg-white p-4 flex items-center justify-between border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Bell size={20} className="text-blue-600" />
                  <h2 className="font-bold text-slate-800 text-lg">Notifications</h2>
                </div>
                <button onClick={() => setShowNotifications(false)} className="p-2 bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200">
                  <X size={20} />
                </button>
              </div>
              <div className="flex bg-white px-4 py-2 gap-2 border-b border-slate-200 shadow-sm text-xs font-bold uppercase tracking-wider">
                 <button onClick={async () => {
                    const batch = writeBatch(db);
                    notifications.filter(n => !n.read).forEach(n => batch.update(doc(db, 'center_notifications', n.id), { read: true }));
                    await batch.commit();
                 }} className="flex-1 py-1.5 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 flex justify-center items-center gap-1"><CheckCircle2 size={14}/> Mark All Read</button>
                 <button onClick={async () => {
                    const batch = writeBatch(db);
                    notifications.forEach(n => batch.delete(doc(db, 'center_notifications', n.id)));
                    await batch.commit();
                 }} className="flex-1 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 flex justify-center items-center gap-1"><Trash2 size={14}/> Clear All</button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {notifications.length === 0 ? (
                  <div className="text-center py-10 text-slate-400">
                    <Bell size={48} className="mx-auto mb-3 opacity-20" />
                    <p className="font-bold text-sm uppercase">No Notifications</p>
                  </div>
                ) : (
                  notifications.map(notif => (
                    <div key={notif.id} className={\`p-4 rounded-xl shadow-sm border relative \${notif.read ? 'bg-white border-slate-200 opacity-75' : 'bg-blue-50 border-blue-200'}\`}>
                      {!notif.read && <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full"></div>}
                      <h4 className="font-bold text-slate-800 text-sm mb-1 pr-6">{notif.type}</h4>
                      {notif.staffName && <p className="text-xs font-bold text-slate-600">{notif.staffName} <span className="text-slate-400 font-normal">({notif.staffId})</span></p>}
                      {notif.designation && <p className="text-[10px] text-slate-500 mb-1">{notif.designation}</p>}
                      <div className="flex items-center gap-3 mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded"><Calendar size={12}/> {notif.date}</span>
                        <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded"><RefreshCw size={12}/> {notif.time}</span>
                      </div>
                      {notif.reason && <p className="text-xs text-red-600 font-medium mt-2 bg-red-50 p-2 rounded">{notif.reason}</p>}
                      <div className="mt-3 flex gap-2">
                        {!notif.read && (
                          <button onClick={() => updateDoc(doc(db, 'center_notifications', notif.id), { read: true })} className="text-[10px] font-bold text-blue-600 uppercase hover:underline">Mark Read</button>
                        )}
                        <button onClick={() => deleteDoc(doc(db, 'center_notifications', notif.id))} className="text-[10px] font-bold text-red-600 uppercase hover:underline">Delete</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}`;

if (!code.includes('showLogoutConfirm &&')) {
  code = code.replace(renderEnd, notificationPanel);
}

fs.writeFileSync('src/components/CentreStaffSelectionScreen.tsx', code);
