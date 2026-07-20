import { useNavigate } from 'react-router-dom';
import { Building2, ShieldCheck, Headset, Info, FileText, FileBarChart, Code, AlertTriangle, Briefcase, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function HomeScreen() {
  const navigate = useNavigate();
  const [tapCount, setTapCount] = useState(0);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [maintenance, setMaintenance] = useState<any>(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'system_settings', 'maintenance'), (docSnap) => {
      if (docSnap.exists()) {
        setMaintenance(docSnap.data());
      } else {
        setMaintenance(null);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const sessionStr = localStorage.getItem('userSession');
    if (sessionStr) {
      try {
        const decoded = atob(sessionStr);
        const session = JSON.parse(decoded);
        if (session.role === 'developer' || session.role === 'admin') {
          setIsAuthorized(true);
        }
      } catch (e) {
        try {
          const session = JSON.parse(sessionStr);
          if (session.role === 'admin' || session.role === 'developer') {
            setIsAuthorized(true);
          }
        } catch (err) {
          // ignore
        }
      }
    }
  }, []);

  const handleDevTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (newCount >= 5) {
      navigate('/developer-login');
      setTapCount(0);
    }
    setTimeout(() => {
      setTapCount(0);
    }, 3000);
  };

  const menuItems = [
    { label: 'Centre Client Login', icon: Building2, path: '/centre-login', cardBg: 'bg-blue-50 hover:bg-blue-100', iconColor: 'text-blue-600', borderColor: 'border-blue-100' },
    { label: 'Admin Login', icon: ShieldCheck, path: '/admin-login', cardBg: 'bg-red-50 hover:bg-red-100', iconColor: 'text-red-600', borderColor: 'border-red-100' },
    { label: 'Job Requirement', icon: Briefcase, path: '/job-requirements-portal', cardBg: 'bg-green-50 hover:bg-green-100', iconColor: 'text-green-600', borderColor: 'border-green-100' },
    { label: 'Report Management', icon: FileBarChart, path: '/report-management', cardBg: 'bg-purple-50 hover:bg-purple-100', iconColor: 'text-purple-600', borderColor: 'border-purple-100' },
    { label: 'Support & Help', icon: Headset, path: '/support', cardBg: 'bg-orange-50 hover:bg-orange-100', iconColor: 'text-orange-600', borderColor: 'border-orange-100' },
    { label: 'App Version', icon: Info, path: '/version', cardBg: 'bg-cyan-50 hover:bg-cyan-100', iconColor: 'text-cyan-600', borderColor: 'border-cyan-100' },
    { label: 'Privacy Policy', icon: FileText, path: '/privacy', cardBg: 'bg-indigo-50 hover:bg-indigo-100', iconColor: 'text-indigo-600', borderColor: 'border-indigo-100' },
    { label: 'Web Developer Login', icon: Code, path: '/developer-login', cardBg: 'bg-slate-50 hover:bg-slate-100', iconColor: 'text-slate-600', borderColor: 'border-slate-200' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 text-slate-900 font-sans overflow-hidden"
    >
      <div className="bg-blue-900 text-white h-20 flex items-center justify-between px-6 shadow-md relative shrink-0 z-10">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white">
            <img src="/logo.svg" alt="Yashi Skills Logo" className="w-10 h-10 object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight uppercase">Yashi Skill Project</h1>
            <p className="text-[10px] text-blue-200 uppercase tracking-widest">Live Attendance System</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {maintenance?.isActive && !isAuthorized && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-orange-50 border-b border-orange-200 overflow-hidden shrink-0 z-10 shadow-sm"
          >
            <div className="p-4 flex items-start gap-3 max-w-3xl mx-auto w-full">
              <AlertTriangle className="text-orange-500 shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="text-sm font-bold text-orange-800 uppercase tracking-wide">{maintenance?.title || 'System Under Maintenance'}</h3>
                <p className="text-xs text-orange-700 mt-1 font-medium">{maintenance?.message || 'Access to protected modules is currently restricted.'}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(item.path)}
              className={`flex items-center w-full min-h-[65px] px-5 py-3 ${item.cardBg} rounded-[18px] shadow-sm border ${item.borderColor} text-left transition-all group relative overflow-hidden`}
            >
              <div className="mr-4 shrink-0">
                <item.icon size={24} className={item.iconColor} />
              </div>
              <span className="font-bold text-[17px] text-slate-800 flex-1 tracking-tight group-hover:text-slate-900 transition-colors">{item.label}</span>
              <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center shrink-0 group-hover:bg-white/80 transition-colors shadow-sm">
                 <ChevronRight size={18} className={`${item.iconColor} transition-colors`} />
              </div>
              <div className="absolute inset-0 bg-black/5 opacity-0 active:opacity-100 transition-opacity pointer-events-none"></div>
            </motion.button>
          ))}
        </div>
      </div>
      
      <div 
        className="h-12 bg-slate-800 text-slate-400 flex flex-col justify-center items-center px-4 text-[10px] cursor-default shrink-0"
        onClick={handleDevTap}
      >
        <div>© {new Date().getFullYear()} Yashi Skill Project. Government Managed Interface.</div>
        <div className="flex space-x-4 mt-1">
          <span className="text-emerald-400">Secure AES-256 Encryption</span>
        </div>
      </div>
    </motion.div>
  );
}
