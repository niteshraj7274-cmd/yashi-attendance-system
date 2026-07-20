import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, ShieldCheck, PlusCircle, Settings, FileText, CheckSquare, Building2 } from 'lucide-react';
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
          
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => navigate("/report-management/centers")}
            className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 hover:border-blue-300 hover:bg-blue-50 transition-all text-left group"
          >
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-200 transition-colors">
              <Building2 size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Center Management</h3>
              <p className="text-xs text-slate-500 mt-1">Manage report centers</p>
            </div>
          </motion.button>
          
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onClick={() => navigate("/report-management/staff")}
            className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 hover:border-green-300 hover:bg-green-50 transition-all text-left group"
          >
            <div className="w-12 h-12 bg-green-100 text-green-700 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-green-200 transition-colors">
              <Users size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Staff Management</h3>
              <p className="text-xs text-slate-500 mt-1">Manage report staff</p>
            </div>
          </motion.button>

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
        </div>
      </div>
    </div>
  );
}
