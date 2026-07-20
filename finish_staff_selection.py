with open('src/components/CentreStaffSelectionScreen.tsx', 'a') as f:
    f.write("""
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <div className="bg-blue-900 text-white p-6 shadow-md shrink-0">
        <div className="flex justify-between items-start mb-4">
          <button onClick={() => navigate('/centre-login')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors shrink-0">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold tracking-tight uppercase leading-tight line-clamp-1">{centerName || 'Centre Staff'}</h1>
            <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5">{centerCode || 'Select Staff'}</p>
          </div>
          <button onClick={() => { localStorage.removeItem('centreSession'); navigate('/centre-login'); }} className="p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors shrink-0 text-red-300 hover:text-red-100">
            <LogOut size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
            <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-[10px] text-blue-200 uppercase tracking-widest">Total Staff</p>
                <p className="text-xl font-bold">{staffList.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-[10px] text-blue-200 uppercase tracking-widest">Present Today</p>
                <p className="text-xl font-bold">{todayCounts.Present || 0}</p>
            </div>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4">Select Your Profile</h2>
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
          </div>
        ) : staffList.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
            <p className="text-sm font-bold text-slate-500 uppercase">No active staff found in this center.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {staffList.map(staff => (
              <motion.button
                key={staff.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStaffClick(staff)}
                className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center gap-3 text-center"
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center border border-blue-100 overflow-hidden shrink-0">
                  {staff.photoUrl ? (
                    <img src={staff.photoUrl} alt={staff.name} className="w-full h-full object-cover" />
                  ) : (
                    <UserCircle size={32} />
                  )}
                </div>
                <div className="w-full flex flex-col items-center">
                  <h3 className="font-bold text-slate-800 text-sm tracking-wide line-clamp-1 w-full truncate">{staff.name}</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{staff.staffId || 'N/A'}</p>
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1 bg-blue-50 px-2 py-0.5 rounded-full">{staff.designation}</p>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedStaff && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-blue-900 p-4 flex items-center justify-between text-white">
                <h3 className="font-bold uppercase tracking-wide text-sm">Enter Staff PIN</h3>
                <button onClick={() => setSelectedStaff(null)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handlePinSubmit} className="p-6 flex flex-col gap-5">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center border border-blue-100 overflow-hidden shrink-0">
                    {selectedStaff.photoUrl ? (
                      <img src={selectedStaff.photoUrl} alt={selectedStaff.name} className="w-full h-full object-cover" />
                    ) : (
                      <UserCircle size={24} />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-base">{selectedStaff.name}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{selectedStaff.staffId}</p>
                  </div>
                </div>

                {pinError && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-medium border border-red-100">
                    {pinError}
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock size={18} />
                    </div>
                    <input 
                      type="password" 
                      value={pin}
                      onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium tracking-[0.5em] text-center"
                      placeholder="••••"
                      maxLength={4}
                      autoFocus
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={pinLoading}
                  className="mt-2 w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center text-sm tracking-widest uppercase"
                >
                  {pinLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Login Securely"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
""")
print("Appended JSX")
