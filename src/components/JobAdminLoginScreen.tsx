import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Lock, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function JobAdminLoginScreen() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const sessionStr = localStorage.getItem('jobAdminSession');
    if (sessionStr) {
      navigate('/job-admin-dashboard');
    }
  }, [navigate]);

  
  const hashPin = async (pin: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(pin);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) {
      setError('Please enter a PIN.');
      return;
    }
        
    setLoading(true);
    setError('');
    
    try {
      const lockRef = doc(db, 'settings', 'jobAdminLock');
      const lockSnap = await getDoc(lockRef);
      if (lockSnap.exists()) {
         const lockData = lockSnap.data();
         if (lockData.lockedUntil && lockData.lockedUntil > Date.now()) {
            const mins = Math.ceil((lockData.lockedUntil - Date.now()) / 60000);
            setError(`Too many attempts. Locked for ${mins} minutes.`);
            setLoading(false);
            return;
         }
      }

      const adminDoc = await getDoc(doc(db, 'settings', 'adminPins'));
      let valid = false;
      
      if (adminDoc.exists()) {
        const data = adminDoc.data();
        if (data.jobPinEnabled === false) {
           valid = true;
        } else {
           const inputHash = await hashPin(pin);
           if (data.jobPinHash === inputHash) valid = true;
           if (pin === '1234' && !data.jobPinHash) valid = true; // Fallback
        }
      } else {
         if (pin === '1234') valid = true;
      }

      if (valid) {
        if (lockSnap.exists()) await setDoc(lockRef, { attempts: 0, lockedUntil: null }, { merge: true });
        localStorage.setItem('jobAdminSession', JSON.stringify({ role: 'jobAdmin', timestamp: Date.now() }));
        navigate('/job-admin-dashboard');
      } else {
        let attempts = lockSnap.exists() ? (lockSnap.data().attempts || 0) + 1 : 1;
        let lockedUntil = null;
        if (attempts >= 5) {
           lockedUntil = Date.now() + 15 * 60 * 1000;
        }
        await setDoc(lockRef, { attempts, lockedUntil }, { merge: true });
        
        const { logAuditActivity } = await import('../utils/auditHelpers');
        logAuditActivity('Unknown', 'Security', 'Unknown', 'Failed Login', 'Failed Job Requirement Login', {
           role: 'Unknown', userName: 'Unknown', action: 'Failed Login', moduleName: 'Job Requirements', newValue: `Attempt ${attempts}`
        });

        if (lockedUntil) {
           setError('Too many failed attempts. Locked for 15 minutes.');
        } else {
           setError('Invalid PIN. Please try again.');
        }
        setPin('');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-indigo-700 rounded-b-[2rem] shadow-lg"></div>
      
      <div className="relative z-10 flex flex-col h-screen p-6">
        <button 
          onClick={() => navigate('/job-requirements-portal')}
          className="self-start p-2 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-sm transition-colors mb-8"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="flex-1 flex flex-col items-center justify-center -mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white w-full max-w-sm rounded-3xl shadow-xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <ShieldCheck size={40} className="text-indigo-600 drop-shadow-sm" />
            </div>
            
            <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase mb-1">Job Admin Login</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Secure Access Portal</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={20} className="text-slate-400" />
                </div>
                <input
                  type="password"
                  maxLength={8}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 8))}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-0 focus:border-indigo-500 focus:bg-white outline-none transition-all text-center text-2xl font-black tracking-[1em]"
                  placeholder="••••"
                  autoFocus
                />
              </div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-xs font-bold text-left px-2"
                >
                  {error}
                </motion.p>
              )}

              
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={async () => {
                     const masterPin = window.prompt('Enter Main Admin PIN to reset Job PIN:');
                     if (masterPin) {
                        try {
                           const adminDoc = await getDoc(doc(db, 'settings', 'adminProfile'));
                           let validMaster = '1234';
                           if (adminDoc.exists() && adminDoc.data().pin) validMaster = adminDoc.data().pin;
                           if (masterPin === validMaster) {
                              const newPin = window.prompt('Enter new 4-8 digit Job PIN:');
                              if (newPin && newPin.length >= 4 && newPin.length <= 8 && /^\d+$/.test(newPin)) {
                                 const encoder = new TextEncoder();
                                 const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(newPin));
                                 const hashArray = Array.from(new Uint8Array(hashBuffer));
                                 const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                                 await setDoc(doc(db, 'settings', 'adminPins'), { jobPinHash: hashHex, jobPinEnabled: true }, { merge: true });
                                 alert('Job PIN has been reset successfully!');
                              } else {
                                 alert('Invalid PIN format. Must be 4-8 digits.');
                              }
                           } else {
                              alert('Invalid Master PIN.');
                           }
                        } catch(e) {
                           alert('Error resetting PIN.');
                        }
                     }
                  }}
                  className="text-indigo-600 text-xs font-bold hover:underline"
                >
                  Forgot PIN?
                </button>
              </div>
              <button
                type="submit"

                disabled={loading || pin.length < 4}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-md transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center"
              >
                {loading ? (
                  <RefreshCw className="animate-spin" size={24} />
                ) : (
                  'AUTHENTICATE'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
