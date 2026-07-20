import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, FileBarChart, Building2, UserCircle, MapPin, Calendar, Clock, AlertTriangle, ShieldCheck, Download, Settings, BookOpen, Users, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function AdminProfessionalDashboardScreen() {
  const navigate = useNavigate();
  const [appSettings, setAppSettings] = useState<any>({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'app_modules');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAppSettings(docSnap.data());
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const menuItems = [
    { label: 'Google Drive Files', icon: FileText, path: '/drive', color: 'bg-emerald-600', module: 'all' },
    { label: 'Device Management', icon: Users, path: '/admin/device-management', color: 'bg-rose-700', module: 'all' },
    { label: 'Storage & Performance', icon: FileBarChart, path: '/admin/storage', color: 'bg-amber-600', module: 'all' },
    { label: 'Attendance Timings', icon: Clock, path: '/admin/attendance-timing', color: 'bg-cyan-600', module: 'attendanceModuleEnabled' },
    { label: 'Outside Alerts', icon: AlertTriangle, path: '/admin/outside-alerts', color: 'bg-red-600', module: 'attendanceModuleEnabled' },
    { label: 'Attendance Dashboard', icon: FileBarChart, path: '/admin/attendance-dashboard', color: 'bg-purple-600', module: 'all' },
    { label: 'Excel Reports', icon: FileBarChart, path: '/admin/centerwise-attendance', color: 'bg-emerald-600', module: 'all' },
    { label: 'MIS Monthly Report', icon: Calendar, path: '/admin/mis-report', color: 'bg-blue-800', module: 'all' },
    { label: 'Salary Dashboard', icon: FileBarChart, path: '/admin/salary-dashboard', color: 'bg-indigo-600', module: 'all' },
    { label: 'Salary Holiday Calendar', icon: Calendar, path: '/admin/salary-holiday-calendar', color: 'bg-rose-600', module: 'all' },
    { label: 'Request Management', icon: Calendar, path: '/admin/requests', color: 'bg-indigo-600', module: 'all' },
    
    { label: 'Security & Backup', icon: ShieldCheck, path: '/admin/security-dashboard', color: 'bg-indigo-600', module: 'all' },
    { label: 'Reports and Downloads', icon: Download, path: '/admin/reports', color: 'bg-emerald-700', module: 'all' },
    { label: 'Audit Logs', icon: FileBarChart, path: '/admin/audit-logs', color: 'bg-orange-600', module: 'all' },
    { label: 'Settings', icon: Settings, path: '/admin/settings', color: 'bg-gray-700', module: 'all' },
    { label: 'Attendance Guide', icon: BookOpen, path: '/admin/attendance-guide', color: 'bg-teal-700', module: 'all' },
  ].filter(item => item.module === 'all' || appSettings[item.module] !== false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      <div className="bg-emerald-700 text-white p-6 shadow-md shrink-0">
        <div className="flex justify-between items-start mb-2 gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors shrink-0">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <FileBarChart size={20} className="text-emerald-300" />
              <h1 className="text-xl font-bold tracking-tight uppercase leading-tight">Professional Dashboard</h1>
            </div>
            <p className="text-[10px] text-emerald-200 uppercase tracking-widest mt-0.5">Advanced Modules & Reports</p>
          </div>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-slate-200 gap-3 ${menuItems.length % 2 !== 0 && idx === menuItems.length - 1 ? 'col-span-2' : ''}`}
            >
              <div className={`w-12 h-12 ${item.color.replace('600', '50').replace('700', '50').replace('800', '50')} ${item.color.replace('bg-', 'text-').replace('600', '600').replace('700', '600').replace('800', '600')} border ${item.color.replace('bg-', 'border-').replace('600', '200').replace('700', '200').replace('800', '200')} rounded-lg flex items-center justify-center`}>
                <item.icon size={24} />
              </div>
              <span className="text-xs font-bold text-slate-700 text-center uppercase tracking-wide leading-tight">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
