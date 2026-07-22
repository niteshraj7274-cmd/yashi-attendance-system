import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, ShieldCheck, PlusCircle, Settings, FileText, CheckSquare, Building2, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function ReportAdminDashboardScreen() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    
    localStorage.removeItem('reportAdminSession');
    navigate('/report-management');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <div className="bg-emerald-900 text-white h-20 flex items-center px-6 shadow-md gap-4 justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/report-management')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight uppercase">Admin Dashboard</h1>
            <p className="text-[10px] text-emerald-200 uppercase tracking-widest mt-0.5">Report Management</p>
          </div>
        </div>
        <button onClick={handleLogout} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg flex items-center gap-2 text-sm font-bold transition-colors">
          <LogOut size={16} /> Logout
        </button>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto pb-20">
        <div className="flex flex-col gap-4">
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate("/report-management/create")}
            className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 hover:border-purple-300 hover:bg-purple-50 transition-all text-left group"
          >
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-purple-200 transition-colors">
              <PlusCircle size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Create Report</h3>
              <p className="text-xs text-slate-500 mt-1">Define new reports</p>
            </div>
          </motion.button>
          
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            onClick={() => navigate("/report-management/manage")}
            className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left group"
          >
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-indigo-200 transition-colors">
              <Settings size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Manage Reports</h3>
              <p className="text-xs text-slate-500 mt-1">Edit or delete existing reports</p>
            </div>
          </motion.button>
          
          {/* We might not need centers/staff unless they were already built, wait, they were in the previous screen!
              Let's keep them and navigate appropriately. Even if they don't exist as dedicated routes, we will keep the buttons as before.
              Wait, the routes for centers and staff were NOT in App.tsx! But I will keep the assignments button. */}
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate("/report-management/assignment")}
            className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 hover:border-orange-300 hover:bg-orange-50 transition-all text-left group"
          >
            <div className="w-12 h-12 bg-orange-100 text-orange-700 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-orange-200 transition-colors">
              <CheckSquare size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Report Assignment</h3>
              <p className="text-xs text-slate-500 mt-1">Assign reports to staff at centers</p>
            </div>
          </motion.button>
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate("/admin/dmr-dashboard")}
            className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 hover:border-blue-300 hover:bg-blue-50 transition-all text-left group"
          >
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-200 transition-colors">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">DMR Dashboard</h3>
              <p className="text-xs text-slate-500 mt-1">View submitted DMR reports</p>
            </div>
          </motion.button>
          
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => navigate("/admin/dmr-settings")}
            className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 hover:border-teal-300 hover:bg-teal-50 transition-all text-left group"
          >
            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-teal-200 transition-colors">
              <Settings size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">DMR Settings</h3>
              <p className="text-xs text-slate-500 mt-1">Configure DMR categories & options</p>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
