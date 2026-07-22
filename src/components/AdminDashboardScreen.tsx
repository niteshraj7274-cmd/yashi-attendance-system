import { logAuditActivity } from '../utils/auditHelpers';
import {  useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import {  ShieldCheck, Download, FileSpreadsheet, ArrowLeft, LogOut, Users, Building2, CalendarCheck, FileBarChart, Settings, Headset, Sparkles, BrainCircuit, UserCircle, MapPin, Calendar, AlertTriangle, RefreshCw, Clock , FileText} from 'lucide-react';
import {  useSync } from './SyncContext';
import {  motion } from 'motion/react';
import {  db } from '../firebase';
import {  doc, getDoc, getDocs, collection, query, where, onSnapshot, setDoc } from 'firebase/firestore';
import {  MonitorPlay, Bell, BookOpen } from 'lucide-react';

export default function AdminDashboardScreen() {
  const navigate = useNavigate();
  const { syncData, isSyncing, isOnline } = useSync();
  const [adminName, setAdminName] = useState('YASHI SKILL PROJECT is loading...');
  const [pendingOutsideAlerts, setPendingOutsideAlerts] = useState(0);
  const [todayCounts, setTodayCounts] = useState({ Present: 0, Late: 0, 'Official Duty': 0, 'Outside Center': 0, Leave: 0, 'Half Day': 0, Absent: 0, 'IN Attendance': 0, 'OUT Attendance': 0 });
  const [centerStats, setCenterStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [staffStats, setStaffStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [autoOutStats, setAutoOutStats] = useState({ totalAutoOut: 0, manualOut: 0, pendingOut: 0, failedOut: 0, centerWise: {} as Record<string, number> });

  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [adminPin, setAdminPin] = useState('1999');
  const [appSettings, setAppSettings] = useState<any>({
    attendanceModuleEnabled: true,
    leaveModuleEnabled: true,
    odModuleEnabled: true,
    supportModuleEnabled: true,
    salaryModuleEnabled: false
  });

  useEffect(() => {
        const fetchAdminPin = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'settings', 'adminProfile'));
        if (docSnap.exists() && docSnap.data().pin) {
          setAdminPin(docSnap.data().pin);
        }
      } catch (e) {}
    };
    fetchAdminPin();
    const todayStr = new Date().toLocaleDateString('en-CA');
    const attQ = query(collection(db, 'attendance'), where('Date', '==', todayStr));

    let unSubCenters: any;
    let unSubStaff: any;

    unSubCenters = onSnapshot(collection(db, 'centers'), (cSnap) => {
      let cTotal = 0, cActive = 0, cInactive = 0;
      cSnap.forEach(d => {
        cTotal++;
        if (d.data().status?.toLowerCase() === 'inactive' || d.data().isDeleted) cInactive++;
        else cActive++;
      });
      setCenterStats({ total: cTotal, active: cActive, inactive: cInactive });
    });

    unSubStaff = onSnapshot(collection(db, 'staff'), (sSnap) => {
      let sTotal = 0, sActive = 0, sInactive = 0;
      sSnap.forEach(d => {
        sTotal++;
        if (d.data().status?.toLowerCase() === 'inactive' || d.data().isDeleted) sInactive++;
        else sActive++;
      });
      setStaffStats({ total: sTotal, active: sActive, inactive: sInactive });
    });

    const fetchData = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'settings', 'appSettings'));
        if (docSnap.exists()) {
          setAppSettings(prev => ({ ...prev, ...docSnap.data() }));
        }
      } catch(e) {}

      try {
        const snapshot = await getDocs(attQ);
        const counts: any = { Present: 0, Late: 0, 'Official Duty': 0, 'Outside Center': 0, Leave: 0, 'Half Day': 0 };
        let autoOut = 0;
        let manOut = 0;
        let pendOut = 0;
        const cWise: Record<string, number> = {};

        snapshot.forEach(doc => {
          const d = doc.data();
          const s = d['Attendance Status'] || 'Present';
          if (counts[s] !== undefined) counts[s]++;
          else counts[s] = 1;

          if (d['IN Time'] && !d['OUT Time']) {
             pendOut++;
          } else if (d['OUT Time']) {
             if (d['OUT Type'] === 'System Auto OUT' || d['Attendance Status'] === 'Auto Generated') {
                autoOut++;
                const cc = d['Center Code'] || d['Center Name'] || 'Unknown';
                cWise[cc] = (cWise[cc] || 0) + 1;
             } else {
                manOut++;
             }
          }
        });
        
        let failed = 0;
        try {
          const logSnap = await getDocs(collection(db, 'system_logs'));
          logSnap.forEach(d => {
            if (d.id.startsWith(`autoOut_${todayStr}`) && d.data().status === 'Failed') {
               failed++;
            }
          });
        } catch(e) {}

        setAutoOutStats({ totalAutoOut: autoOut, manualOut: manOut, pendingOut: pendOut, failedOut: failed, centerWise: cWise });
        setTodayCounts(counts as any);
      } catch(e) {}





      try {
        const q = query(collection(db, 'outside_center_attendance'), where('Status', '==', 'Pending Review'));
        const snapshot = await getDocs(q);
        setPendingOutsideAlerts(snapshot.docs.length);
      } catch(e) {}
    };

    fetchData();
    return () => {
      if (unSubCenters) unSubCenters();
      if (unSubStaff) unSubStaff();
    };
  }, []);

  useEffect(() => {
    const sessionStr = localStorage.getItem('userSession');
    if (!sessionStr) {
      navigate('/admin-login');
      return;
    }
    const session = JSON.parse(sessionStr);
    if (session.role !== 'admin') {
      navigate('/admin-login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'settings', 'adminProfile');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().name) {
          setAdminName(docSnap.data().name);
        } else {
          setAdminName('MIS Manager');
        }
      } catch (err) {
        setAdminName('Admin');
      }
    };
    fetchProfile();
  }, [navigate]);

  
  
  const hashPin = async (pin: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(pin);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handlePinSubmit = async () => {
    setPinError('');
    try {
      const lockRef = doc(db, 'settings', 'profAdminLock');
      const lockSnap = await getDoc(lockRef);
      if (lockSnap.exists()) {
         const lockData = lockSnap.data();
         if (lockData.lockedUntil && lockData.lockedUntil > Date.now()) {
            const mins = Math.ceil((lockData.lockedUntil - Date.now()) / 60000);
            setPinError(`Locked for ${mins} minutes.`);
            return;
         }
      }

      const adminDoc = await getDoc(doc(db, 'settings', 'adminPins'));
      let valid = false;
      
      if (adminDoc.exists()) {
        const data = adminDoc.data();
        if (data.profPinEnabled === false) {
           valid = true;
        } else {
           const inputHash = await hashPin(pinInput);
           if (data.profPinHash === inputHash) valid = true;
           if ((pinInput === '1999' || pinInput === adminPin) && !data.profPinHash) valid = true;
        }
      } else {
         if (pinInput === '1999' || pinInput === adminPin || pinInput === '1234' || pinInput === '2024') valid = true;
      }

      if (valid) {
        if (lockSnap.exists()) await setDoc(lockRef, { attempts: 0, lockedUntil: null }, { merge: true });
        setShowPinModal(false);
        setPinInput('');
        navigate('/admin/professional-dashboard');
      } else {
        let attempts = lockSnap.exists() ? (lockSnap.data().attempts || 0) + 1 : 1;
        let lockedUntil = null;
        if (attempts >= 5) {
           lockedUntil = Date.now() + 15 * 60 * 1000;
        }
        await setDoc(lockRef, { attempts, lockedUntil }, { merge: true });
        
        
        logAuditActivity(adminName, 'Security', adminName, 'Failed Login', 'Failed Professional Dashboard PIN', {
           role: 'Admin', userName: adminName, action: 'Failed Login', moduleName: 'Professional Dashboard', newValue: `Attempt ${attempts}`
        });

        if (lockedUntil) {
           setPinError('Locked for 15 minutes.');
        } else {
           setPinError('Invalid PIN');
        }
        setPinInput('');
      }
    } catch (err: any) {
      setPinError('Failed to verify PIN');
    }
  };


  const handleLogout = async () => {
    logAuditActivity('Admin', 'Authentication', 'Admin', 'Logout', 'Admin logged out', {
      role: 'Admin',
      userName: 'Admin',
      moduleName: 'Authentication',
      action: 'Logout'
    });
    localStorage.removeItem('userSession');
    navigate('/home');
  };

  const menuItems = [
    { label: 'Center Management', icon: Building2, path: '/admin/centers', color: 'bg-blue-600', module: 'all' },
    { label: 'Staff Management', icon: UserCircle, path: '/admin/staff', color: 'bg-indigo-600', module: 'all' },
    { label: 'Support Management', icon: Headset, path: '/admin/support-management', color: 'bg-orange-600', module: 'supportModuleEnabled' },
    { label: 'Professional Dashboard', icon: ShieldCheck, path: '#', action: () => setShowPinModal(true), color: 'bg-emerald-700', module: 'all' },
    { label: 'Security Settings', icon: Settings, path: '/admin/settings', color: 'bg-red-600', module: 'all' }
  ].filter(item => item.module === 'all' || appSettings[item.module] !== false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <div className="bg-emerald-700 text-white p-6 shadow-md relative">
        <div className="flex justify-between items-start mb-6 gap-3">
          <button onClick={() => navigate('/home')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors shrink-0">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight uppercase leading-tight flex items-center gap-2">
              Admin Dashboard
              <div className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full border ${isOnline ? 'bg-emerald-500/20 border-emerald-400 text-emerald-100' : 'bg-red-500/20 border-red-400 text-red-100'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </div>
            </h1>
            <p className="text-[10px] text-emerald-200 uppercase tracking-widest mt-0.5">Welcome, {adminName}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/admin/notifications')} className="p-2 bg-emerald-800 rounded-lg hover:bg-emerald-700 transition-colors border border-emerald-600 relative">
              <Bell size={16} />
              <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
            </button>
            <button onClick={syncData} disabled={isSyncing} className="p-2 bg-emerald-800 rounded-lg hover:bg-emerald-700 transition-colors border border-emerald-600 relative group">
              <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
              <div className="absolute top-10 right-0 w-32 bg-slate-800 text-white text-[10px] p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Smart Sync System
              </div>
            </button>
            <button onClick={() => navigate('/support')} className="p-2 bg-emerald-800 rounded-lg hover:bg-emerald-700 transition-colors border border-emerald-600">
              <Headset size={16} />
            </button>
            <button onClick={handleLogout} className="p-2 bg-emerald-800 rounded-lg hover:bg-emerald-700 transition-colors border border-emerald-600">
              <LogOut size={16} />
            </button>
          </div>

        </div>
        
        <button 
          onClick={() => navigate('/admin/profile')}
          className="w-full bg-emerald-800/50 hover:bg-emerald-800 border border-emerald-600 p-3 rounded-lg flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-3">
            <UserCircle size={20} />
            <span className="text-sm font-bold uppercase tracking-wide">My Profile</span>
          </div>
          <span className="text-[10px] bg-emerald-600 px-2 py-1 rounded-md font-bold uppercase">Edit</span>
        </button>
      </div>

      <div className="flex-1 p-6">
        {pendingOutsideAlerts > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <button
              onClick={() => navigate('/admin/outside-alerts')}
              className="w-full bg-red-50 border border-red-200 p-4 rounded-xl shadow-sm flex items-start gap-4 relative overflow-hidden group hover:bg-red-100 transition-colors"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
              <div className="p-2 bg-red-100 rounded-lg text-red-600 group-hover:bg-red-200 transition-colors">
                <AlertTriangle size={24} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-sm font-black text-red-900 uppercase tracking-wide">Outside Center Alerts</h3>
                <p className="text-xs text-red-700 mt-0.5 font-medium">{pendingOutsideAlerts} staff member(s) marked attendance outside their designated center.</p>
              </div>
              <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                Review Now
              </div>
            </button>
          </motion.div>
        )}
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">Quick Actions</h2>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Master Overview</h2>
            <button onClick={() => navigate('/admin/live-monitor')} className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
              <MonitorPlay size={12} /> Live Monitor
            </button>
          </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-white border border-slate-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Building2 size={16} className="text-emerald-600" />
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Centers</h3>
              </div>
              <div className="text-xl font-black text-slate-800 leading-none">{centerStats.total}</div>
              <div className="flex gap-2 mt-2 text-[9px] font-bold uppercase tracking-wider">
                <span className="text-emerald-600">Active: {centerStats.active}</span>
                <span className="text-rose-600">Inactive: {centerStats.inactive}</span>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} className="text-emerald-600" />
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Staff</h3>
              </div>
              <div className="text-xl font-black text-slate-800 leading-none">{staffStats.total}</div>
              <div className="flex gap-2 mt-2 text-[9px] font-bold uppercase tracking-wider">
                <span className="text-emerald-600">Active: {staffStats.active}</span>
                <span className="text-rose-600">Inactive: {staffStats.inactive}</span>
              </div>
            </div>
          </div>
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Today's Live Count</h2>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Present', val: todayCounts.Present, color: 'bg-emerald-100 text-emerald-800' },
              { label: 'Late', val: todayCounts.Late, color: 'bg-amber-100 text-amber-800' },
              { label: 'Half Day', val: todayCounts['Half Day'], color: 'bg-orange-100 text-orange-800' },
              { label: 'Outside', val: todayCounts['Outside Center'], color: 'bg-red-100 text-red-800' },
              { label: 'Duty', val: todayCounts['Official Duty'], color: 'bg-purple-100 text-purple-800' },
              { label: 'Leave', val: todayCounts.Leave, color: 'bg-slate-200 text-slate-800' }
            ].map(stat => (
              <div key={stat.label} className={`p-3 rounded-lg flex flex-col items-center justify-center ${stat.color}`}>
                <span className="text-lg font-bold">{stat.val}</span>
                <span className="text-[9px] font-bold uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              onClick={() => item.action ? item.action() : navigate(item.path)}
              className={`flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all active:scale-[0.98] gap-3 group ${menuItems.length % 2 !== 0 && index === menuItems.length - 1 ? 'col-span-2' : ''}`}
            >
              <div className={`w-12 h-12 ${item.color.replace('600', '50').replace('700', '50')} ${item.color.replace('bg-', 'text-').replace('600', '600').replace('700', '600')} border ${item.color.replace('bg-', 'border-').replace('600', '200').replace('700', '200')} rounded-lg flex items-center justify-center transition-colors`}>
                <item.icon size={24} />
              </div>
              <span className="text-xs font-bold text-slate-700 text-center uppercase tracking-wide leading-tight">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    
      {showPinModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold uppercase tracking-wide text-center mb-4">Enter Admin PIN</h3>
            {pinError && <p className="text-red-500 text-xs text-center mb-2">{pinError}</p>}
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="w-full border-2 border-slate-200 rounded-lg p-3 text-center text-xl tracking-[0.5em] mb-4 focus:border-emerald-500 outline-none"
              placeholder="••••"
              maxLength={4}
            />
            <div className="flex gap-2">
              <button onClick={() => { setShowPinModal(false); setPinInput(''); setPinError(''); }} className="flex-1 p-3 rounded-lg border border-slate-300 font-bold uppercase text-xs">Cancel</button>
              <button onClick={handlePinSubmit} className="flex-1 p-3 rounded-lg bg-emerald-600 text-white font-bold uppercase text-xs">Verify</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}