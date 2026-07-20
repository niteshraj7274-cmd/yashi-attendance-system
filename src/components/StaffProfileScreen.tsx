import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Lock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { doc, getDoc, updateDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';

export default function StaffProfileScreen() {
  const navigate = useNavigate();
  const [staffData, setStaffData] = useState<any>(null);
  const [centerInfo, setCenterInfo] = useState<any>(null);
  
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sessionStr = localStorage.getItem('userSession');
    if (!sessionStr) {
      navigate('/home');
      return;
    }
    
    try {
      let session;
      try {
        session = JSON.parse(atob(sessionStr));
      } catch (e) {
        session = JSON.parse(sessionStr);
      }
      setStaffData(session);
      
      const fetchCenter = async () => {
        if (session.centerId) {
          const cDoc = await getDoc(doc(db, 'centers', session.centerId));
          if (cDoc.exists()) setCenterInfo(cDoc.data());
        }
      };
      fetchCenter();
    } catch (e) {
      navigate('/home');
    }
  }, [navigate]);

  const handleChangePin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (currentPin.length !== 4 || newPin.length !== 4 || confirmPin.length !== 4) {
      setError('PIN must be exactly 4 digits.');
      return;
    }
    
    if (newPin !== confirmPin) {
      setError('New PIN and Confirm PIN do not match.');
      return;
    }
    
    if (!staffData || !staffData.uid) {
      setError('Staff data not found.');
      return;
    }

    setLoading(true);
    try {
      const staffRef = doc(db, 'staff', staffData.uid);
      const staffDoc = await getDoc(staffRef);
      
      if (!staffDoc.exists()) {
        setError('Staff account not found.');
        setLoading(false);
        return;
      }
      
      const realPin = staffDoc.data().pin;
      
      if (currentPin !== realPin) {
        setError('Current PIN is incorrect.');
        setLoading(false);
        return;
      }
      
      // Update PIN
      await updateDoc(staffRef, { pin: newPin });
      
      // Log PIN change
      await addDoc(collection(db, 'audit_logs'), {
        action: 'PIN Changed',
        details: `Staff ${staffData.name || staffData.staffId} changed their login PIN.`,
        timestamp: serverTimestamp(),
        userType: 'Staff',
        userName: staffData.name || staffData.staffId,
        staffId: staffData.staffId,
        centerName: centerInfo?.name || staffData.centerId || 'Unknown',
        changedBy: 'Self'
      });
      
      setSuccess('Your Login PIN has been updated successfully.');
      setCurrentPin('');
      setNewPin('');
      setConfirmPin('');
    } catch (err: any) {
      console.error(err);
      setError('Failed to change PIN. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!staffData) return null;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-blue-900 text-white p-6 shadow-md relative">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/staff-dashboard')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight uppercase">Staff Profile</h1>
            <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5">{staffData.name || staffData.staffId}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6 max-w-md mx-auto w-full">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
            <User size={32} />
          </div>
          <h2 className="text-lg font-bold text-slate-800">{staffData.name || staffData.staffId}</h2>
          <p className="text-sm text-slate-500 uppercase tracking-wider">{staffData.designation || 'Staff Member'}</p>
          <div className="mt-4 w-full bg-slate-50 p-4 rounded-lg border border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-500 uppercase font-bold">Staff ID</span>
              <span className="text-sm font-bold text-slate-800">{staffData.staffId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500 uppercase font-bold">Center</span>
              <span className="text-sm font-bold text-slate-800">{centerInfo?.name || staffData.centerId}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck size={20} className="text-blue-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Change Login PIN</h2>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100 font-medium overflow-hidden">
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-emerald-50 text-emerald-600 p-3 rounded-lg text-sm mb-4 border border-emerald-100 font-medium flex items-center gap-2 overflow-hidden">
                <CheckCircle2 size={16} /> {success}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleChangePin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Current PIN</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={16} />
                </div>
                <input 
                  type="password" 
                  value={currentPin}
                  onChange={(e) => setCurrentPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium tracking-[0.5em] text-center"
                  placeholder="••••"
                  maxLength={4}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">New PIN</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={16} />
                </div>
                <input 
                  type="password" 
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium tracking-[0.5em] text-center"
                  placeholder="••••"
                  maxLength={4}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Confirm New PIN</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={16} />
                </div>
                <input 
                  type="password" 
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium tracking-[0.5em] text-center"
                  placeholder="••••"
                  maxLength={4}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading || currentPin.length !== 4 || newPin.length !== 4 || confirmPin.length !== 4}
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 flex justify-center items-center text-sm uppercase tracking-widest"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Update PIN"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
