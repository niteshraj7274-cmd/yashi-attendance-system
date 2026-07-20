import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Code, Lock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function DeveloperLoginScreen() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  React.useEffect(() => {
    const sessionStr = localStorage.getItem('userSession');
    if (sessionStr) {
      try {
        const session = JSON.parse(atob(sessionStr));
        if (session.role === 'developer') {
          navigate('/developer-settings');
        }
      } catch(e) {}
    }
  }, [navigate]);

  const logAttempt = async (status: 'success' | 'failed', details: string) => {
    try {
      await addDoc(collection(db, 'security_logs'), {
        type: 'developer_login',
        status,
        details,
        timestamp: serverTimestamp(),
        ipAddress: 'Captured securely',
        userAgent: navigator.userAgent
      });
    } catch (err) {
      console.error('Failed to log attempt:', err);
    }
  };

  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (pin.length !== 4) {
      setError('Please enter a valid 4-digit PIN.');
      return;
    }

    setLoading(true);
    
    try {
      // For developer login, we use a fixed PIN without OTP.
      const developerPin = '1999'; // Default Developer PIN
      
      if (pin === developerPin) {
        // Log successful login
        await logAttempt('success', `Developer successfully logged in.`);
        
        // Simple base64 "encryption" for developer session prototype
        const sessionData = {
          role: 'developer',
          loginTime: Date.now()
        };
        const encryptedSession = btoa(JSON.stringify(sessionData));
        
        localStorage.setItem('userSession', encryptedSession);
        
        navigate('/developer-settings');
      } else {
        setError('Invalid Developer PIN.');
        await logAttempt('failed', `Invalid Developer PIN entered.`);
      }
    } catch (err: any) {
      console.error(err);
      setError('An error occurred during verification.');
      await logAttempt('failed', `Error during PIN verification.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-200 font-sans overflow-hidden">
      <div className="bg-slate-950 h-20 flex items-center px-6 border-b border-slate-800 gap-4">
        <button onClick={() => navigate('/home')} className="p-2 -ml-2 rounded-full hover:bg-slate-800 transition-colors">
          <ArrowLeft size={24} className="text-slate-400" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Code size={20} className="text-emerald-500" /> Developer Auth
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">Secure Maintenance Access</p>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col justify-center max-w-md w-full mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key="pin-step"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-slate-950 p-6 rounded-2xl shadow-xl border border-slate-800"
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 size={24} />
              </div>
            </div>
            
            <h2 className="text-lg font-bold text-center text-emerald-400 mb-2 uppercase tracking-widest">Enter Dev PIN</h2>
            <p className="text-xs text-center text-slate-500 mb-6">Secure Access Only</p>
            
            {error && (
              <div className="bg-red-500/10 text-red-400 p-3 rounded-lg text-xs mb-4 border border-red-500/20 font-medium text-center whitespace-pre-line">
                {error}
              </div>
            )}

            <form onSubmit={handleVerifyPin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">4-Digit Code</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-medium tracking-[0.5em] text-center text-white"
                    placeholder="••••"
                    maxLength={4}
                    autoFocus
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading || pin.length < 4}
                className="mt-4 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 flex justify-center items-center text-xs uppercase tracking-widest"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Verify & Login"
                )}
              </button>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
