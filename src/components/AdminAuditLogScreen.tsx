import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Search, Clock } from 'lucide-react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';

export default function AdminAuditLogScreen() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const q = query(collection(db, 'audit_logs'), orderBy('timestamp', 'desc'));
        const snap = await getDocs(q);
        const logData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLogs(logData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(log => 
    (log.staffName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.staffId || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-emerald-700 text-white p-6 shadow-md">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight uppercase">Audit Logs</h1>
            <p className="text-[10px] text-emerald-200 uppercase tracking-widest mt-0.5">Track System Changes</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by Staff Name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium text-slate-700"
          />
        </div>

        {loading ? (
          <div className="text-center py-10 text-slate-500 font-bold uppercase tracking-wider">Loading logs...</div>
        ) : filteredLogs.length === 0 ? (
          <div className="text-center py-10 text-slate-500 font-bold uppercase tracking-wider">No logs found</div>
        ) : (
          <div className="space-y-4">
            {filteredLogs.map(log => (
              <motion.div key={log.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-800 uppercase tracking-wide">{log.staffName}</h3>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{log.staffId}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-slate-600 text-xs font-bold justify-end">
                      <Clock size={12} /> {log.time}
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">{log.date}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs text-slate-500 font-medium mb-2">Changed by: <span className="font-bold text-emerald-600">{log.adminName}</span></p>
                  {log.changes && Object.keys(log.changes).map(key => (
                    <div key={key} className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm">
                      <div className="font-bold text-slate-700 uppercase text-[10px] tracking-wider mb-1">{key}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-rose-600 line-through opacity-70">{String(log.changes[key].old || 'None')}</span>
                        <span className="text-slate-400">→</span>
                        <span className="text-emerald-600 font-bold">{String(log.changes[key].new || 'None')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
