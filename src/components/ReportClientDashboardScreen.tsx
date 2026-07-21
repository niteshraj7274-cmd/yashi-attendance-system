import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, FileText, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function ReportClientDashboardScreen() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionStr = localStorage.getItem('reportClientSession');
    if (!sessionStr) {
      navigate('/report-management/client-login');
      return;
    }
    
    const session = JSON.parse(sessionStr);
    
    // Listen for reports assigned to this client
    const q = query(collection(db, 'report_assignments'), where('clientId', '==', session.uid));
    
    const unsubscribe = onSnapshot(q, (snap) => {
      const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReports(list);
      setLoading(false);
    }, (err) => {
      console.error(err);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('reportClientSession');
    navigate('/report-management');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <div className="bg-indigo-900 text-white h-20 flex items-center px-6 shadow-md gap-4 justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/report-management')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight uppercase">Client Dashboard</h1>
            <p className="text-[10px] text-indigo-200 uppercase tracking-widest mt-0.5">My Assigned Reports</p>
          </div>
        </div>
        <button onClick={handleLogout} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg flex items-center gap-2 text-sm font-bold transition-colors">
          <LogOut size={16} /> Logout
        </button>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto pb-20">
        {loading ? (
          <div className="text-center p-8 text-slate-500 font-bold uppercase tracking-widest">Loading reports...</div>
        ) : reports.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-xl border border-slate-200">
            <FileText size={48} className="text-slate-300 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-slate-700">No Reports Found</h2>
            <p className="text-slate-500 text-sm mt-2">You don't have any reports assigned to you yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {reports.map((report, index) => (
              <motion.div 
                key={report.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{report.reportTitle || 'Assigned Report'}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <Clock size={12} /> Assigned on {new Date(report.assignedAt?.toDate ? report.assignedAt.toDate() : Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${report.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                    {report.status || 'Pending'}
                  </div>
                </div>
                
                <div className="p-3 bg-slate-50 rounded-lg text-sm text-slate-700 mt-2">
                  <p><span className="font-bold text-slate-500">Center:</span> {report.centerName || 'N/A'}</p>
                  <p><span className="font-bold text-slate-500">Staff:</span> {report.staffName || 'N/A'}</p>
                </div>
                
                {report.reportData && (
                  <div className="mt-2 text-sm text-slate-700 whitespace-pre-wrap p-3 border border-slate-100 rounded-lg">
                    {JSON.stringify(report.reportData, null, 2)}
                  </div>
                )}
                
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
