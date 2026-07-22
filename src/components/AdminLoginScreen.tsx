import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Lock, RefreshCw } from 'lucide-react';
import { useSync } from './SyncContext';
import { logAuditActivity } from '../utils/auditHelpers';
import { motion } from 'motion/react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AdminLoginScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { syncData, isSyncing } = useSync();
  React.useEffect(() => {
    const sessionStr = localStorage.getItem('userSession');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        if (session.role === 'admin') {
          navigate('/admin-dashboard');
      window.dispatchEvent(new CustomEvent('check-for-updates'));
        }
      } catch(e) {}
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin || pin.length !== 4) {
      setError('Please enter a 4-digit PIN.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      let validPin = '1999';
      try {
        const adminDoc = await getDoc(doc(db, 'settings', 'adminProfile'));
        if (adminDoc.exists() && adminDoc.data().pin) {
          validPin = adminDoc.data().pin;
        } else {
          // Create default if not exists
          await setDoc(doc(db, 'settings', 'adminProfile'), { pin: '1999' }, { merge: true });
        }
      } catch (firestoreErr: any) {
        console.warn('Firestore error, falling back to default PIN.', firestoreErr);
      }

      if (pin === validPin) {
        localStorage.setItem('userSession', JSON.stringify({
          role: 'admin'
        }));
        logAuditActivity('Admin', 'Authentication', 'Admin', 'Login', 'Admin logged in', {
          role: 'Admin',
          userName: 'Admin',
          moduleName: 'Authentication',
          action: 'Login'
        });
        navigate(location.state?.redirect || '/admin-dashboard');
      } else {
        setError('Invalid PIN.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-100 to-blue-100 text-slate-900 font-sans overflow-hidden">
      <div className="bg-emerald-700 text-white h-20 flex items-center px-6 shadow-md gap-4">
        <button onClick={() => navigate('/home')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight">Admin Login</h1>
          <p className="text-[10px] text-emerald-200 uppercase tracking-widest mt-0.5">Secure Management Portal</p>
        </div>
        <button onClick={syncData} disabled={isSyncing} className="p-2 bg-emerald-800 rounded-lg hover:bg-emerald-600 transition-colors border border-emerald-500 relative group">
          <RefreshCw size={20} className={isSyncing ? 'animate-spin' : ''} />
          <div className="absolute top-12 right-0 w-32 bg-slate-800 text-white text-[10px] p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
            Smart Sync System
          </div>
        </button>
      </div>

      <div className="flex-1 p-6 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden border border-slate-200">
              <img src="/logo.svg" alt="YASHI SKILL PROJECT PVT. LTD. Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <h2 className="text-lg font-bold text-center text-slate-800 mb-8 uppercase tracking-wide">Admin Portal</h2>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">4-Digit PIN</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-medium tracking-[0.5em] text-center"
                  placeholder="••••"
                  maxLength={4}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-2 w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-lg shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center text-sm"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "AUTHENTICATE"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
