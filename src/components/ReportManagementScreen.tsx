import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function ReportManagementScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <div className="bg-blue-900 text-white h-20 flex items-center px-6 shadow-md gap-4">
        <button onClick={() => navigate('/home')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-bold tracking-tight uppercase">Report Management</h1>
          <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5">Select Module</p>
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto pb-20 flex flex-col justify-center items-center">
        <div className="w-full max-w-md flex flex-col gap-6">
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate("/report-management/client-login")}
            className="bg-white p-6 rounded-2xl shadow-sm border-2 border-slate-200 flex flex-col items-center gap-4 hover:border-indigo-400 hover:bg-indigo-50 transition-all text-center group"
          >
            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center shrink-0 group-hover:bg-indigo-200 transition-colors shadow-inner">
              <Users size={40} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest">Client Login</h3>
              <p className="text-sm font-medium text-slate-500 mt-2">Access your assigned reports</p>
            </div>
          </motion.button>
          
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => navigate("/report-management/admin-login")}
            className="bg-white p-6 rounded-2xl shadow-sm border-2 border-slate-200 flex flex-col items-center gap-4 hover:border-emerald-400 hover:bg-emerald-50 transition-all text-center group"
          >
            <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center shrink-0 group-hover:bg-emerald-200 transition-colors shadow-inner">
              <ShieldCheck size={40} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest">Admin Login</h3>
              <p className="text-sm font-medium text-slate-500 mt-2">Manage reports and assignments</p>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
