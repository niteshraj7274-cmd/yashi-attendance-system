import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FileBarChart, ArrowLeft, MapPin, Users, UserCircle, Lock, X , Headset, Calendar, RefreshCw, Bell, LogOut, CheckCircle2, Trash2, BookOpen } from 'lucide-react';
import { useSync } from './SyncContext';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, getDocs, doc, getDoc, where, onSnapshot, writeBatch, deleteDoc, updateDoc, setDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Staff } from '../types';
import { getOrCreateDeviceId } from '../utils/deviceUtils';
import { logAuditActivity } from '../utils/auditHelpers';

export default function CentreStaffSelectionScreen() {
  const navigate = useNavigate();
  const { centerId } = useParams();
  const { syncData, isSyncing } = useSync();
  
  const [centerName, setCenterName] = useState('');
  const [centerCode, setCenterCode] = useState('');
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [todayCounts, setTodayCounts] = useState({ Present: 0, Late: 0, 'Half Day': 0, 'Official Duty': 0, Leave: 0, Absent: 0 });
  const [loading, setLoading] = useState(true);
  const [salaryEnabled, setSalaryEnabled] = useState(false);
  const [centerDashboardViewAttendanceDashboard, setCenterDashboardViewAttendanceDashboard] = useState(true);
  const [appSettings, setAppSettings] = useState<any>({
    odModuleEnabled: true,
    leaveModuleEnabled: true,
    supportModuleEnabled: true
  });
  
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [pinLoading, setPinLoading] = useState(false);
  const [showStaffList, setShowStaffList] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);


  useEffect(() => {
    const sessionStr = localStorage.getItem('centreSession');
    if (!sessionStr) {
      navigate('/centre-login');
      return;
    }
    try {
      const session = JSON.parse(sessionStr);
      if (session.centerId !== centerId) {
        navigate('/centre-login');
        return;
      }
    } catch(e) {
      navigate('/centre-login');
      return;
    }

    if (!centerId) {
      navigate('/centre-login');
      return;
    }

    let unSubCenter: () => void;
    let unSubStaff: () => void;
    let unSubNotif: () => void;
    let unSubSettings: () => void;
    let unSubAtt: () => void;

    const setupListeners = async () => {
      try {
        const centerRef = doc(db, 'centers', centerId);
        const centerSnap = await getDoc(centerRef);
        if (!centerSnap.exists()) {
          localStorage.removeItem('centreSession');
          navigate('/centre-login');
          return;
        }
        const currentCenterCode = centerSnap.data().code;
        
        unSubCenter = onSnapshot(centerRef, (docSnap) => {
          if (docSnap.exists()) {
            setCenterName(docSnap.data().name);
            setCenterCode(docSnap.data().code);
          } else {
            localStorage.removeItem('centreSession');
            navigate('/centre-login');
          }
        });

        
        const settingsRef = doc(db, 'settings', 'appSettings');
        // Live attendance counts for today
        const todayStr = new Date().toLocaleDateString('en-CA');
        const attQ = query(collection(db, 'attendance'), where('Date', '==', todayStr), where('Center Code', '==', currentCenterCode));
        unSubAtt = onSnapshot(attQ, (snap) => {
          const counts: any = { Present: 0, Late: 0, 'Half Day': 0, 'Official Duty': 0, Leave: 0, Absent: 0 };
          snap.forEach(doc => {
             const st = doc.data()['Attendance Status'] || 'Present';
             if (counts[st] !== undefined) counts[st]++;
             else counts[st] = 1;
          });
          setTodayCounts(counts);
        });
        
        unSubSettings = onSnapshot(settingsRef, (docSnap) => {
          if (docSnap.exists()) {
            setSalaryEnabled(docSnap.data().salaryModuleEnabled !== false);
            setAppSettings(prev => ({ ...prev, ...docSnap.data() }));
          }
        });

        const q = query(
          collection(db, 'staff'),
          where('centerId', '==', centerId)
        );
        unSubStaff = onSnapshot(q, (querySnapshot) => {
          const list: Staff[] = [];
          querySnapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() } as Staff);
          });
          setStaffList(list);
          setLoading(false);
        });

        const notifQ = query(
          collection(db, 'center_notifications'),
          where('centerId', '==', centerId)
        );
        unSubNotif = onSnapshot(notifQ, (snap) => {
          const list: any[] = [];
          const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
          snap.forEach(d => {
            const data = d.data();
            if (data.timestamp && data.timestamp.toMillis() > thirtyDaysAgo) {
              list.push({ id: d.id, ...data });
            } else if (!data.timestamp) {
              list.push({ id: d.id, ...data });
            }
          });
          list.sort((a, b) => (b.timestamp?.toMillis?.() || Date.now()) - (a.timestamp?.toMillis?.() || Date.now()));
          setNotifications(list);
        });

      } catch (err) {
        console.error("Error setting up listeners:", err);
        setLoading(false);
      }
    };
    
    setupListeners();

    return () => {
      if (unSubCenter) unSubCenter();
      if (unSubStaff) unSubStaff();
      if (unSubNotif) unSubNotif();
      if (unSubSettings) unSubSettings();
      if (unSubAtt) unSubAtt();
    };
  }, [centerId, navigate]);

  const handleStaffClick = (staff: Staff) => {
    setSelectedStaff(staff);
    setPin('');
    setPinError('');
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaff || !pin || pin.length !== 4) {
      setPinError('Please enter a 4-digit PIN.');
      return;
    }

    setPinLoading(true);
    setPinError('');

    try {
      const validPin = selectedStaff.pin || '1234';
      
      let currentDeviceId = getOrCreateDeviceId();
      const userAgent = navigator.userAgent;
      let browserName = "Unknown Browser";
      if (userAgent.indexOf("Chrome") > -1) browserName = "Chrome";
      else if (userAgent.indexOf("Safari") > -1) browserName = "Safari";
      else if (userAgent.indexOf("Firefox") > -1) browserName = "Firefox";
      
      let osName = "Unknown OS";
      if (userAgent.indexOf("Win") > -1) osName = "Windows";
      else if (userAgent.indexOf("Mac") > -1) osName = "MacOS";
      else if (userAgent.indexOf("Android") > -1) osName = "Android";
      else if (userAgent.indexOf("Linux") > -1) osName = "Linux";
      else if (userAgent.indexOf("iPhone") > -1) osName = "iOS";
      else if (userAgent.indexOf("iPad") > -1) osName = "iPadOS";

      // Check if current device ID is already registered to someone else (Duplicate Detection)
      const currentDeviceRef = doc(db, 'registered_devices', currentDeviceId);
      const currentDeviceSnap = await getDoc(currentDeviceRef);
      
      if (currentDeviceSnap.exists()) {
         const dData = currentDeviceSnap.data();
         if (dData.staffUid && dData.staffUid !== selectedStaff.id) {
            // Duplicate detected! One device used by multiple staff.
            await updateDoc(currentDeviceRef, { status: 'Duplicate Detected' });
            
            // Log security alert
            await addDoc(collection(db, 'device_audit_logs'), {
               deviceId: currentDeviceId, staffName: selectedStaff.name, action: 'Duplicate Device Access Attempt', 
               reason: `Device already registered to ${dData.staffName}`, timestamp: serverTimestamp()
            });
            
            setPinError('Unauthorized Device. This device is associated with another account. Please contact HR/Admin.');
            setPinLoading(false);
            return;
         }
      }

      // Fetch existing device for this specific staff member
      const existingDeviceQ = query(collection(db, 'registered_devices'), where('staffUid', '==', selectedStaff.id));
      const existingDeviceSnap = await getDocs(existingDeviceQ);
      
      let staffExistingDevice = null;
      if (!existingDeviceSnap.empty) {
         const devices = existingDeviceSnap.docs.map(d => ({id: d.id, ...d.data()})) as any[];
         staffExistingDevice = devices.find(d => d.status === 'Approved' || d.status === 'Active') || 
                               devices.find(d => d.status === 'Pending Approval' || d.status === 'Pending' || d.status === 'Device Change Requested') || 
                               devices.find(d => d.status === 'Blocked' || d.status === 'Suspended') ||
                               devices[0];
      }

      if (pin !== validPin) {
        // Failed Login Protection
        if (staffExistingDevice && staffExistingDevice.id === currentDeviceId) {
           const attempts = (staffExistingDevice.failedAttempts || 0) + 1;
           if (attempts >= 5) {
              await updateDoc(doc(db, 'registered_devices', currentDeviceId), { failedAttempts: attempts, status: 'Blocked', blockedReason: 'Too many failed PIN attempts' });
              setPinError('Device has been blocked due to multiple failed login attempts. Please contact HR/Admin.');
           } else {
              await updateDoc(doc(db, 'registered_devices', currentDeviceId), { failedAttempts: attempts });
              setPinError(`Invalid PIN. Attempt ${attempts} of 5 before device lock.`);
           }
        } else {
           setPinError('Invalid Staff PIN.');
        }
        setPinLoading(false);
        return;
      }

      if (staffExistingDevice) {
         // Staff HAS a registered device. Must match current.
         if (staffExistingDevice.id !== currentDeviceId) {
             setPinError('Unauthorized Device. You can only login from your approved device. Please contact HR/Admin.');
             // Optionally create a Change Request automatically here, but prompt asks to just show unauthorized.
             
             // Wait, the prompt says "If staff changes mobile: Generate Device Change Request."
             // Let's create a change request if it doesn't already exist.
             if (staffExistingDevice.status !== 'Device Change Requested') {
                 // But wait, what if they just login on their friend's phone? Generating change request immediately might be bad.
                 // The prompt says "Generate Device Change Request". Let's do it on the NEW device ID.
                 await setDoc(doc(db, 'registered_devices', currentDeviceId), {
                    staffUid: selectedStaff.id,
                    staffName: selectedStaff.name || '',
                    staffId: selectedStaff.staffId || '',
                    centerId: centerId,
                    centerName: centerName,
                    status: 'Device Change Requested',
                    registeredAt: serverTimestamp(),
                    deviceName: `${osName} - ${browserName}`,
                    role: 'Staff',
                    changeRequestReason: 'Login from new device detected'
                 }, { merge: true });
             }
             
             setPinLoading(false);
             return;
         }
         
         // It matches. Check status.
         if (staffExistingDevice.status === 'Pending Approval' || staffExistingDevice.status === 'Pending' || staffExistingDevice.status === 'Device Change Requested') {
           setPinError('Device registration is pending admin approval.');
           setPinLoading(false);
           return;
         }
         if (staffExistingDevice.status === 'Blocked' || staffExistingDevice.status === 'Rejected' || staffExistingDevice.status === 'Suspended' || staffExistingDevice.status === 'Deleted' || staffExistingDevice.status === 'Replaced' || staffExistingDevice.status === 'Duplicate Detected') {
           setPinError('Your device has been blocked or rejected. Please contact the Administrator.');
           setPinLoading(false);
           return;
         }
         if (staffExistingDevice.sessionRevoked) {
           await updateDoc(doc(db, 'registered_devices', currentDeviceId), { sessionRevoked: false, status: 'Pending Approval', blockedReason: 'Session was revoked' });
           setPinError('Session was revoked. Device is pending re-approval.');
           setPinLoading(false);
           return;
         }
         
         // Success
         await updateDoc(doc(db, 'registered_devices', currentDeviceId), {
           lastLogin: new Date().toISOString(),
           failedAttempts: 0,
           staffName: selectedStaff.name || '',
           staffId: selectedStaff.staffId || '',
           deviceName: `${osName} - ${browserName}`
         });
      } else {
         // Staff has NO registered device. Register this one as pending.
         await setDoc(doc(db, 'registered_devices', currentDeviceId), {
            staffUid: selectedStaff.id,
            staffName: selectedStaff.name || '',
            staffId: selectedStaff.staffId || '',
            centerId: centerId,
            centerName: centerName,
            status: 'Pending Approval',
            registeredAt: serverTimestamp(),
            deviceName: `${osName} - ${browserName}`,
            role: 'Staff'
         }, { merge: true });
         
         setPinError('New device registered successfully. Pending Admin Approval. Please contact HR/Admin.');
         setPinLoading(false);
         return;
      }

      // Navigate to staff dashboard
      sessionStorage.setItem('loginTime', new Date().toISOString());
      localStorage.setItem('userSession', JSON.stringify({
        uid: selectedStaff.id,
        role: 'staff',
        centerId: centerId,
        staffId: selectedStaff.staffId || '',
        name: selectedStaff.name || ''
      }));
      logAuditActivity(selectedStaff.name || 'Staff', 'Authentication', selectedStaff.name || 'Staff', 'Login', 'Staff logged in via Center Portal', {
        role: 'Staff',
        userName: selectedStaff.name || 'Staff',
        staffId: selectedStaff.staffId || '',
        centerName: centerName || '',
        centerCode: centerCode || '',
        moduleName: 'Authentication',
        action: 'Login'
      });
      navigate('/staff-dashboard');
    } catch (err: any) {
      console.error("Login error", err);
      setPinError('An error occurred during authentication.');
    } finally {
      setPinLoading(false);
    }
  };

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
          <button onClick={() => { 
  logAuditActivity(centerName || 'Center', 'Authentication', centerName || 'Center', 'Logout', 'Center logged out', {
    role: 'Center',
    userName: centerName || 'Center',
    centerName: centerName || '',
    centerCode: centerCode || '',
    moduleName: 'Authentication',
    action: 'Logout'
  });
  localStorage.removeItem('centreSession'); 
  navigate('/centre-login'); 
}} className="p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors shrink-0 text-red-300 hover:text-red-100">
            <LogOut size={20} />
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-4">
            <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-[10px] text-blue-200 uppercase tracking-widest">Total Staff</p>
                <p className="text-xl font-bold">{staffList.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-[10px] text-blue-200 uppercase tracking-widest">Present</p>
                <p className="text-xl font-bold">{todayCounts.Present || 0}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-[10px] text-blue-200 uppercase tracking-widest">Late</p>
                <p className="text-xl font-bold">{todayCounts.Late || 0}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-[10px] text-blue-200 uppercase tracking-widest">Absent</p>
                <p className="text-xl font-bold">{todayCounts.Absent || 0}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-[10px] text-blue-200 uppercase tracking-widest">Leave</p>
                <p className="text-xl font-bold">{todayCounts.Leave || 0}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-[10px] text-blue-200 uppercase tracking-widest">Duty</p>
                <p className="text-xl font-bold">{todayCounts['Official Duty'] || 0}</p>
            </div>
        </div>
        <div className="mt-2 bg-white/10 rounded-lg p-3 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[10px] text-blue-200 uppercase tracking-widest">Attendance %</span>
              <span className="text-lg font-bold">{staffList.length > 0 ? Math.round(((todayCounts.Present || 0) + (todayCounts.Late || 0)) / staffList.length * 100) : 0}%</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-blue-200 uppercase tracking-widest">Role Breakdown</span>
              <span className="text-xs font-bold mt-1 max-w-[200px] truncate leading-tight">
                {Object.entries(staffList.reduce((acc, staff) => {
                  const role = staff.designation || 'Staff';
                  acc[role] = (acc[role] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)).map(([role, count]) => `${count} ${role}`).join(' • ') || 'No staff'}
              </span>
            </div>
        </div>
      </div>

      <div className="p-4">
        {!showStaffList ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => navigate(`/centre/${centerId}/attendance-guide`)}
              className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md hover:border-blue-300 transition-all text-left"
            >
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                <BookOpen size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 uppercase tracking-wide text-sm">Attendance Guide / Rules</h3>
                <p className="text-xs text-slate-500 mt-1">View centre attendance policies</p>
              </div>
            </button>
            <button 
              onClick={() => navigate(`/centre/${centerId}/dashboard`)}
              className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md hover:border-blue-300 transition-all text-left"
            >
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center shrink-0">
                <FileBarChart size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 uppercase tracking-wide text-sm">Advanced Attendance Dashboard</h3>
                <p className="text-xs text-slate-500 mt-1">View detailed attendance stats</p>
              </div>
            </button>
            <button 
              onClick={() => navigate(`/centre/${centerId}/duty`)}
              className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md hover:border-blue-300 transition-all text-left"
            >
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 uppercase tracking-wide text-sm">Official Duty Requests</h3>
                <p className="text-xs text-slate-500 mt-1">Manage staff official duties</p>
              </div>
            </button>
            <button 
              onClick={() => navigate(`/centre/${centerId}/leave`)}
              className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md hover:border-blue-300 transition-all text-left"
            >
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center shrink-0">
                <Calendar size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 uppercase tracking-wide text-sm">Leave Requests</h3>
                <p className="text-xs text-slate-500 mt-1">Manage staff leave applications</p>
              </div>
            </button>
            <button 
              onClick={() => navigate(`/centre/${centerId}/salary`)}
              className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md hover:border-blue-300 transition-all text-left"
            >
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                <FileBarChart size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 uppercase tracking-wide text-sm">Salary Module</h3>
                <p className="text-xs text-slate-500 mt-1">View and generate salary slips</p>
              </div>
            </button>
            <button 
              onClick={() => setShowStaffList(true)}
              className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md hover:border-blue-300 transition-all text-left"
            >
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center shrink-0">
                <Users size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 uppercase tracking-wide text-sm">View Staff List</h3>
                <p className="text-xs text-slate-500 mt-1">Select profile to login as staff</p>
              </div>
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Select Your Profile</h2>
              <button onClick={() => setShowStaffList(false)} className="text-xs bg-slate-200 text-slate-700 px-3 py-1 rounded-full font-bold uppercase hover:bg-slate-300 transition-colors">
                Back to Dashboard
              </button>
            </div>
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
