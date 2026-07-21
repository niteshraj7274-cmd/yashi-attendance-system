import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Mail, Lock, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function ReportAdminLoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const session = localStorage.getItem('reportAdminSession');
    if (session) {
      navigate('/report-management/admin-dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Verify if the user is an admin in Firestore
      const adminDoc = await getDoc(doc(db, 'report_admins', user.uid));
      
      if (adminDoc.exists()) {
        localStorage.setItem('reportAdminSession', JSON.stringify({ uid: user.uid, role: 'admin' }));
        navigate('/report-management/admin-dashboard');
      } else {
        // Not a report admin
        auth.signOut();
        setError('Access denied. You are not registered as a Report Admin.');
      }
    } catch (err: any) {
      console.error(err);
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-emerald-700 rounded-b-[2rem] shadow-lg"></div>
      
      <div className="relative z-10 flex flex-col h-screen p-6">
        <button 
          onClick={() => navigate('/report-management')}
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
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <ShieldCheck size={40} className="text-emerald-600 drop-shadow-sm" />
            </div>
            
            <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase mb-1">Admin Login</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Report Management</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={20} className="text-slate-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-0 focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-bold text-slate-700"
                  placeholder="Admin Email"
                  autoFocus
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={20} className="text-slate-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-0 focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-bold text-slate-700"
                  placeholder="Password"
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-md transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center mt-6"
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
