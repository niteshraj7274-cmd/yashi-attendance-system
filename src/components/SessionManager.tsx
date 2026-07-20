import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Home, ArrowLeft } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function SessionManager({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  const getSessionInfo = () => {
    try {
      const userSessionStr = localStorage.getItem('userSession');
      const centreSessionStr = localStorage.getItem('centreSession');
      const jobAdminSessionStr = localStorage.getItem('jobAdminSession');
      
      let role = null;
      let timeoutMinutes = 0;

      if (userSessionStr) {
        let session;
        try {
           session = JSON.parse(userSessionStr);
        } catch(e) {
           session = JSON.parse(atob(userSessionStr));
        }
        if (session.role === 'admin') { role = 'admin'; timeoutMinutes = 15; }
        else if (session.role === 'developer') { role = 'developer'; timeoutMinutes = 20; }
        else if (session.role === 'staff') { role = 'staff'; timeoutMinutes = 10; }
      } else if (jobAdminSessionStr) {
        role = 'jobAdmin'; timeoutMinutes = 15;
      } else if (centreSessionStr) {
        role = 'center'; timeoutMinutes = 4;
      }
      
      return { role, timeoutMinutes };
    } catch (e) {
      return { role: null, timeoutMinutes: 0 };
    }
  };

  const handleLogout = useCallback(async () => {
    const { role } = getSessionInfo();
    
    try {
      if (auth.currentUser) {
        await signOut(auth);
      }
    } catch (e) {
      console.error(e);
    }
    
    // Preserve deviceId
    const preservedDeviceId = localStorage.getItem('deviceId');
    
    localStorage.clear();
    sessionStorage.clear();
    
    if (preservedDeviceId) {
      localStorage.setItem('deviceId', preservedDeviceId);
    }
    
    if (window.indexedDB) {
       try {
         if (typeof indexedDB.databases === 'function') {
           indexedDB.databases().then(dbs => {
              dbs.forEach(db => {
                 if(db.name) indexedDB.deleteDatabase(db.name);
              });
           }).catch(e => console.error(e));
         }
       } catch (e) { console.error(e); }
    }

    if (role === 'admin') navigate('/admin-login', { replace: true });
    else if (role === 'developer') navigate('/developer-login', { replace: true });
    else if (role === 'staff' || role === 'center') navigate('/centre-login', { replace: true });
    else if (role === 'jobAdmin') navigate('/job-admin-login', { replace: true });
    else navigate('/', { replace: true });
    
  }, [navigate]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    setShowWarning(false);

    const { role, timeoutMinutes } = getSessionInfo();
    if (!role || timeoutMinutes === 0) return;

    const timeoutMs = timeoutMinutes * 60 * 1000;
    
    if (role === 'center') {
       warningTimerRef.current = setTimeout(() => {
          setShowWarning(true);
       }, timeoutMs - 30000);
       
       timerRef.current = setTimeout(() => {
          handleLogout();
       }, timeoutMs);
    } else {
       timerRef.current = setTimeout(() => {
          handleLogout();
       }, timeoutMs);
    }
  }, [handleLogout]);

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    const handler = () => resetTimer();
    
    events.forEach(e => window.addEventListener(e, handler));
    resetTimer();
    
    return () => {
      events.forEach(e => window.removeEventListener(e, handler));
      if (timerRef.current) clearTimeout(timerRef.current);
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    };
  }, [resetTimer]);

  useEffect(() => {
     resetTimer();
  }, [location.pathname, resetTimer]);

  const { role } = getSessionInfo();
  const isLoginPage = location.pathname === '/' || location.pathname.includes('login');
  const showNav = !isLoginPage && role !== null;
  
  return (
    <>
      {children}
      {showNav && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-6 bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl z-50 border border-slate-700">
           <button onClick={() => navigate(-1)} className="text-slate-300 hover:text-white transition-colors" title="Back">
              <ArrowLeft size={22} />
           </button>
           <div className="w-px h-6 bg-slate-700"></div>
           <button onClick={() => {
              const { role } = getSessionInfo();
              if (role === 'admin') navigate('/admin-dashboard');
              else if (role === 'developer') navigate('/developer-settings');
              else if (role === 'staff') navigate('/staff-dashboard');
              else if (role === 'center') {
                  const s = localStorage.getItem('centreSession');
                  if (s) {
                     try {
                        const d = JSON.parse(s);
                        navigate(`/centre/${d.centerId}/staff`);
                     } catch(e) {}
                  } else {
                     navigate('/centre-login');
                  }
              }
              else if (role === 'jobAdmin') navigate('/job-admin-dashboard');
              else navigate('/');
           }} className="text-slate-300 hover:text-emerald-400 transition-colors" title="Home">
              <Home size={22} />
           </button>
           <div className="w-px h-6 bg-slate-700"></div>
           <button onClick={handleLogout} className="text-rose-400 hover:text-rose-300 transition-colors" title="Logout">
              <LogOut size={22} />
           </button>
        </div>
      )}

      {showWarning && (
         <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center">
               <h3 className="text-xl font-bold text-slate-800 mb-2">Session Expiring</h3>
               <p className="text-slate-600 mb-6">Your session will expire in 30 seconds. Click Continue to stay logged in.</p>
               <button 
                 onClick={resetTimer} 
                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
               >
                 Continue
               </button>
            </div>
         </div>
      )}
    </>
  );
}
