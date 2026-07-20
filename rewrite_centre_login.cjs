const fs = require('fs');
const path = 'src/components/CentreLoginScreen.tsx';
let content = fs.readFileSync(path, 'utf8');

const search = `  if (isRegistered === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (isRegistered === false) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-slate-100">
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert size={40} className="text-rose-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Device Not Registered</h2>
          <p className="text-slate-600 mb-8">This device is not authorized to access the Center Portal. Please provide the Device ID below to your Administrator for registration.</p>
          <div className="bg-slate-100 p-4 rounded-xl mb-8">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Your Device ID</p>
            <p className="text-3xl font-mono font-bold text-slate-800 tracking-widest">{deviceId}</p>
          </div>
          <button onClick={() => navigate('/')} className="w-full py-4 bg-slate-800 text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-slate-700 transition-colors">
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }`;

const replace = `  if (isRegistered === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (deviceData && deviceData.status === 'Pending') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-slate-100">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert size={40} className="text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Waiting for Admin Approval</h2>
          <p className="text-slate-600 mb-8">Your device registration request has been submitted. Please wait for the Administrator to approve it.</p>
          <div className="bg-slate-100 p-4 rounded-xl mb-8">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Your Device ID</p>
            <p className="text-3xl font-mono font-bold text-slate-800 tracking-widest">{deviceId}</p>
          </div>
          <button onClick={() => navigate('/')} className="w-full py-4 bg-slate-800 text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-slate-700 transition-colors">
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }
  
  if (deviceData && deviceData.status === 'Inactive') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-slate-100">
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert size={40} className="text-rose-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Device Access Revoked</h2>
          <p className="text-slate-600 mb-8">This device is no longer authorized to access the Center Portal.</p>
          <div className="bg-slate-100 p-4 rounded-xl mb-8">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Your Device ID</p>
            <p className="text-3xl font-mono font-bold text-slate-800 tracking-widest">{deviceId}</p>
          </div>
          <button onClick={() => navigate('/')} className="w-full py-4 bg-slate-800 text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-slate-700 transition-colors">
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }`;

content = content.replace(search, replace);
fs.writeFileSync(path, content);
