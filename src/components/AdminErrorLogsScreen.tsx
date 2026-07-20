import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertOctagon, Trash2 } from 'lucide-react';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export default function AdminErrorLogsScreen() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);


  const clearLogs = async () => {
    setLoading(true);
    try {
      for (const log of logs) {
        await deleteDoc(doc(db, 'error_logs', log.id));
      }
      setLogs([]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db, 'error_logs')));
      const data = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as any[];
      data.sort((a, b) => {
         const tA = (a as any).timestamp?.toMillis ? (a as any).timestamp.toMillis() : 0;
         const tB = (b as any).timestamp?.toMillis ? (b as any).timestamp.toMillis() : 0;
         return tB - tA;
      });
      setLogs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-rose-700 text-white h-20 flex items-center px-6 shadow-md gap-4 shrink-0">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase">System Error Logs</h1>
        </div>
        {logs.length > 0 && (
          <button onClick={clearLogs} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
            <Trash2 size={16} />
            CLEAR ALL
          </button>
        )}

      </div>
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 border-b border-slate-200">Date/Time</th>
                  <th className="p-4 border-b border-slate-200">Error Name</th>
                  <th className="p-4 border-b border-slate-200">Message</th>
                  <th className="p-4 border-b border-slate-200">Stack Trace</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading ? (
                   <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading logs...</td></tr>
                ) : logs.map(l => (
                   <tr key={l.id} className="border-b border-slate-100">
                     <td className="p-4 font-medium text-slate-800 whitespace-nowrap">{l.date}<br/><span className="text-xs text-slate-500">{l.time}</span></td>
                     <td className="p-4 font-bold text-rose-600">{l.name}</td>
                     <td className="p-4 text-slate-700">{l.message}</td>
                     <td className="p-4">
                        <details className="text-xs text-slate-500 bg-slate-50 p-2 rounded max-h-32 overflow-y-auto cursor-pointer">
                           <summary className="font-bold">View Stack</summary>
                           <pre className="mt-2 whitespace-pre-wrap">{l.stack}</pre>
                        </details>
                     </td>
                   </tr>
                ))}
                {!loading && logs.length === 0 && (
                   <tr><td colSpan={4} className="p-8 text-center text-slate-500">No error logs found. System is healthy.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
