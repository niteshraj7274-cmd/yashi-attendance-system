import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Smartphone, UserX, LogIn, DatabaseBackup, AlertOctagon, Activity, FileText } from 'lucide-react';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase';
import AdminPinManagement from './AdminPinManagement';

export default function AdminSecurityDashboardScreen() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalDevices: 0,
    activeDevices: 0,
    blockedDevices: 0,
    loginToday: 0,
    failedLogin: 0,
    backupStatus: 'Active',
    lastBackup: 'Never',
    errorCount: 0,
    crashCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch staff devices
      const devicesSnap = await getDocs(collection(db, 'registered_devices'));
      let total = devicesSnap.size;
      let active = 0;
      let blocked = 0;
      devicesSnap.forEach(d => {
        const data = d.data();
        if (data.status === 'Active') active++;
        else blocked++;
      });

      // Fetch logins today
      const today = new Date().toLocaleDateString('en-CA');
      const loginQuery = query(collection(db, 'login_history'), where('loginDate', '==', today));
      const loginSnap = await getDocs(loginQuery);
      
      const failedQuery = query(collection(db, 'failed_login_attempts'), where('loginDate', '==', today));
      const failedSnap = await getDocs(failedQuery);

      // Fetch Errors
      const errorsSnap = await getDocs(collection(db, 'error_logs'));
      
      // Fetch backups
      const backupSnap = await getDocs(collection(db, 'system_backups'));
      let lastBackup = 'Never';
      let backupStatus = 'Active';
      if (!backupSnap.empty) {
         // Sort clientside if needed
         let backups = backupSnap.docs.map(d => d.data());
         backups.sort((a, b) => b.timestamp?.toMillis() - a.timestamp?.toMillis());
         if (backups.length > 0) {
            lastBackup = new Date(backups[0].timestamp?.toDate()).toLocaleString();
         }
      }

      setStats({
        totalDevices: total,
        activeDevices: active,
        blockedDevices: blocked,
        loginToday: loginSnap.size,
        failedLogin: failedSnap.size,
        backupStatus,
        lastBackup,
        errorCount: errorsSnap.size,
        crashCount: 0 // Assume same as errors or fetch from crashes
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-slate-900 text-white h-20 flex items-center px-6 shadow-md gap-4 shrink-0">
        <button onClick={() => navigate('/admin-dashboard')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase">Security Dashboard</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Monitoring & Optimizations</p>
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
               <div className="flex items-center gap-3 mb-2">
                 <Smartphone className="text-indigo-500" />
                 <h3 className="text-sm font-bold text-slate-700 uppercase">Device Security</h3>
               </div>
               <div className="grid grid-cols-2 gap-2 mt-4">
                 <div className="p-3 bg-slate-50 rounded-lg text-center">
                   <div className="text-xl font-bold text-indigo-700">{stats.totalDevices}</div>
                   <div className="text-[10px] font-bold text-slate-500 uppercase">Total</div>
                 </div>
                 <div className="p-3 bg-emerald-50 rounded-lg text-center">
                   <div className="text-xl font-bold text-emerald-700">{stats.activeDevices}</div>
                   <div className="text-[10px] font-bold text-emerald-600 uppercase">Active</div>
                 </div>
                 <div className="p-3 bg-red-50 rounded-lg text-center col-span-2">
                   <div className="text-xl font-bold text-red-700">{stats.blockedDevices}</div>
                   <div className="text-[10px] font-bold text-red-600 uppercase">Blocked</div>
                 </div>
               </div>
               <button onClick={() => navigate('/admin/device-management')} className="w-full mt-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase rounded-lg hover:bg-indigo-100 transition-colors">Manage Devices</button>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
               <div className="flex items-center gap-3 mb-2">
                 <LogIn className="text-amber-500" />
                 <h3 className="text-sm font-bold text-slate-700 uppercase">Access Logs (Today)</h3>
               </div>
               <div className="grid grid-cols-2 gap-2 mt-4">
                 <div className="p-3 bg-emerald-50 rounded-lg text-center">
                   <div className="text-xl font-bold text-emerald-700">{stats.loginToday}</div>
                   <div className="text-[10px] font-bold text-emerald-600 uppercase">Success</div>
                 </div>
                 <div className="p-3 bg-red-50 rounded-lg text-center">
                   <div className="text-xl font-bold text-red-700">{stats.failedLogin}</div>
                   <div className="text-[10px] font-bold text-red-600 uppercase">Failed</div>
                 </div>
               </div>
               <button onClick={() => navigate('/admin/login-history')} className="w-full mt-4 py-2 bg-amber-50 text-amber-700 text-xs font-bold uppercase rounded-lg hover:bg-amber-100 transition-colors">View Login History</button>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
               <div className="flex items-center gap-3 mb-2">
                 <DatabaseBackup className="text-emerald-500" />
                 <h3 className="text-sm font-bold text-slate-700 uppercase">Data Backup</h3>
               </div>
               <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                 <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Status</p>
                 <p className="font-medium text-emerald-700">{stats.backupStatus}</p>
                 <p className="text-[10px] font-bold text-slate-500 uppercase mt-3 mb-1">Last Backup</p>
                 <p className="font-medium text-slate-800">{stats.lastBackup}</p>
               </div>
               <button onClick={() => navigate('/admin/backup-restore')} className="w-full mt-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase rounded-lg hover:bg-emerald-100 transition-colors">Manage Backups</button>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
               <div className="flex items-center gap-3 mb-2">
                 <AlertOctagon className="text-rose-500" />
                 <h3 className="text-sm font-bold text-slate-700 uppercase">System Health</h3>
               </div>
               <div className="grid grid-cols-2 gap-2 mt-4">
                 <div className="p-3 bg-rose-50 rounded-lg text-center">
                   <div className="text-xl font-bold text-rose-700">{stats.errorCount}</div>
                   <div className="text-[10px] font-bold text-rose-600 uppercase">Errors Logged</div>
                 </div>
                 <div className="p-3 bg-orange-50 rounded-lg text-center">
                   <div className="text-xl font-bold text-orange-700">{stats.crashCount}</div>
                   <div className="text-[10px] font-bold text-orange-600 uppercase">Crashes</div>
                 </div>
               </div>
               <button onClick={() => navigate('/admin/error-logs')} className="w-full mt-4 py-2 bg-rose-50 text-rose-700 text-xs font-bold uppercase rounded-lg hover:bg-rose-100 transition-colors">View Error Logs</button>
            </div>
         </div>
         <AdminPinManagement />
      </div>
    </div>
  );
}
