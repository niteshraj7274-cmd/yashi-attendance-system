import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, RefreshCw, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function ReportManagementScreen() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const [pinEnabled, setPinEnabled] = useState(false);
  const [pinHash, setPinHash] = useState('');

  const hashPin = async (pinStr: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(pinStr);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  useEffect(() => {
    const checkSessionAndSettings = async () => {
      const session = localStorage.getItem('reportAdminSession');
      if (session) {
        navigate('/report-management/admin-dashboard');
        return;
      }

      try {
        const docRef = doc(db, 'settings', 'adminPins');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.reportPinEnabled === false) {
            // PIN disabled, auto-login
            localStorage.setItem('reportAdminSession', JSON.stringify({ role: 'admin', bypass: true }));
            navigate('/report-management/admin-dashboard');
          } else {
            setPinEnabled(true);
            setPinHash(data.reportPinHash || '');
            setLoading(false);
          }
        } else {
          // Default to enabled with 1234
          setPinEnabled(true);
          setPinHash(await hashPin('1234'));
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
        setLoading(false);
      }
    };
    checkSessionAndSettings();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) {
      setError('Please enter the 4-digit PIN.');
      return;
    }
    
    setVerifying(true);
    setError('');
    
    try {
      const inputHash = await hashPin(pin);
      if (inputHash === pinHash) {
        localStorage.setItem('reportAdminSession', JSON.stringify({ role: 'admin' }));
        navigate('/report-management/admin-dashboard');
      } else {
        setError('Incorrect PIN. Please try again.');
        setPin('');
      }
    } catch (err) {
      setError('Verification failed.');
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <RefreshCw size={32} className="text-blue-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Checking security settings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-900 rounded-b-[2rem] shadow-lg"></div>
      
      <div className="relative z-10 flex flex-col h-screen p-6">
        <button 
          onClick={() => navigate('/home')}
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
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <FileText size={40} className="text-blue-600 drop-shadow-sm" />
            </div>
            
            <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase mb-1">Reports Manager</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Enter Security PIN</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={20} className="text-slate-400" />
                </div>
                <input
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={8}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-0 focus:border-blue-500 focus:bg-white outline-none transition-all text-center text-xl font-black tracking-[0.5em] text-slate-700"
                  placeholder="••••"
                  autoFocus
                />
              </div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-xs font-bold px-2"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={verifying || pin.length < 4}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-md transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center mt-6 uppercase tracking-wider"
              >
                {verifying ? (
                  <RefreshCw className="animate-spin" size={24} />
                ) : (
                  'Access Dashboard'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
