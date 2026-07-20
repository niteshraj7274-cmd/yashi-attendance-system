import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Briefcase, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function JobRequirementPortalScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-indigo-700 text-white p-6 shadow-md z-10 relative">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={() => navigate('/')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight uppercase">Job Requirement Portal</h1>
            <p className="text-[10px] text-indigo-200 uppercase tracking-widest mt-0.5">Career Opportunities & Management</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center justify-center gap-6 max-w-md mx-auto w-full">
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate('/job-admin-login')}
          className="w-full bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-slate-100 group-hover:bg-indigo-50 rounded-full flex items-center justify-center mb-4 transition-colors">
            <ShieldCheck size={32} className="text-slate-500 group-hover:text-indigo-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">Job Requirement Admin Login</h2>
          <p className="text-xs text-slate-500">Manage job vacancies, categories and applications.</p>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          onClick={() => navigate('/public-jobs')}
          className="w-full bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md hover:emerald-300 transition-all group flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-slate-100 group-hover:bg-emerald-50 rounded-full flex items-center justify-center mb-4 transition-colors">
            <Briefcase size={32} className="text-slate-500 group-hover:text-emerald-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">Job Vacancy</h2>
          <p className="text-xs text-slate-500">View and apply for open vacancies and opportunities.</p>
        </motion.button>

      </div>
    </div>
  );
}
