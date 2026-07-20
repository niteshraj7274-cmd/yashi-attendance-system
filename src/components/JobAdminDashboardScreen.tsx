import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, Users, FileBarChart, Briefcase, List, UserCheck, Plus } from 'lucide-react';
import { motion } from 'motion/react';

export default function JobAdminDashboardScreen() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('Job Admin');

  const handleLogout = () => {
    localStorage.removeItem('jobAdminSession');
    navigate('/job-requirements-portal');
  };

  const menuItems = [
    { label: 'Job Categories', icon: List, path: '/admin/job-categories', color: 'bg-teal-700' },
    { label: 'Job Requirements', icon: Briefcase, path: '/admin/job-requirements', color: 'bg-indigo-700' },
    { label: 'Job Applications', icon: UserCheck, path: '/admin/job-applications', color: 'bg-emerald-700' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <div className="bg-indigo-700 text-white p-6 shadow-md relative">
        <div className="flex justify-between items-start mb-6 gap-3">
          <button onClick={() => navigate('/job-requirements-portal')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors shrink-0">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight uppercase leading-tight">Job Admin Dashboard</h1>
            <p className="text-[10px] text-indigo-200 uppercase tracking-widest mt-0.5">Welcome, {adminName}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleLogout} className="p-2 bg-indigo-800 rounded-lg hover:bg-indigo-700 transition-colors border border-indigo-600">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <button
          onClick={() => navigate('/admin/job-requirements', { state: { openNew: true } })}
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-md hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 mb-6"
        >
          <Plus size={20} />
          ADD NEW JOB
        </button>
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all active:scale-[0.98] gap-3 group"
            >
              <div className={`w-12 h-12 ${item.color.replace('600', '50').replace('700', '50')} ${item.color.replace('bg-', 'text-').replace('600', '600').replace('700', '600')} border ${item.color.replace('bg-', 'border-').replace('600', '200').replace('700', '200')} rounded-lg flex items-center justify-center transition-colors`}>
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
