import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const userSessionStr = localStorage.getItem('userSession');
      const centreSessionStr = localStorage.getItem('centreSession');
      
      if (userSessionStr) {
        let session;
        try {
          session = JSON.parse(userSessionStr);
        } catch(e) {
          try {
            session = JSON.parse(atob(userSessionStr));
          } catch(err) {
            session = null;
          }
        }
        
        if (session) {
          if (session.role === 'admin') {
            navigate('/admin-dashboard', { replace: true });
            return;
          } else if (session.role === 'staff') {
            navigate('/staff-dashboard', { replace: true });
            return;
          } else if (session.role === 'developer') {
            navigate('/developer-settings', { replace: true });
            return;
          }
        }
      }
      
      if (centreSessionStr) {
        try {
          const session = JSON.parse(centreSessionStr);
          if (session.centerId) {
            navigate(`/centre/${session.centerId}/staff`, { replace: true });
            return;
          }
        } catch(e) {}
      }
      
      navigate('/home', { replace: true });
    }, 1200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="w-20 h-20 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
          <img src="/logo.svg" alt="Logo" className="w-12 h-12 opacity-90 drop-shadow-md" />
        </div>
        <h1 className="text-2xl font-bold text-center tracking-tight mb-1.5 uppercase">YASHI SKILL PROJECT PVT. LTD.</h1>
        <p className="text-[10px] text-blue-200 uppercase tracking-widest text-center font-bold">Live Attendance System</p>
      </motion.div>

      <div className="absolute bottom-12 flex flex-col items-center">
        <div className="w-5 h-5 border-2 border-blue-400 border-t-white rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
