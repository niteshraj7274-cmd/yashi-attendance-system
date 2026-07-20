import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, LogIn } from 'lucide-react';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';

export default function AdminLoginHistoryScreen() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'login_history')); // Note: indexing might be required if ordering
      const snap = await getDocs(q);
      const data = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as any[];
      data.sort((a, b) => {
         const tA = (a as any).timestamp?.toMillis ? (a as any).timestamp.toMillis() : 0;
         const tB = (b as any).timestamp?.toMillis ? (b as any).timestamp.toMillis() : 0;
         return tB - tA;
      });
      setHistory(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history.filter(h => 
     !searchTerm || 
     (h.staffName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
     (h.staffId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
     (h.centerName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-amber-600 text-white h-20 flex items-center px-6 shadow-md gap-4 shrink-0">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase">Login History</h1>
          <p className="text-[10px] text-amber-200 uppercase tracking-widest mt-0.5">Staff Access Logs</p>
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, ID or center..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 border-b border-slate-200">Staff Info</th>
                  <th className="p-4 border-b border-slate-200">Center</th>
                  <th className="p-4 border-b border-slate-200">Device Name</th>
                  <th className="p-4 border-b border-slate-200">Login Date/Time</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading ? (
                   <tr><td colSpan={4} className="p-8 text-center text-slate-500">YASHI SKILL PROJECT is loading history...</td></tr>
                ) : filteredHistory.map(h => (
                   <tr key={h.id} className="border-b border-slate-100 hover:bg-slate-50">
                     <td className="p-4 font-medium text-slate-800">
                        {h.staffName}
                        <span className="block text-[10px] text-slate-500 font-bold">{h.staffId}</span>
                     </td>
                     <td className="p-4 text-slate-600">
                        {h.centerName}
                        <span className="block text-[10px] text-slate-500 font-bold">{h.centerCode}</span>
                     </td>
                     <td className="p-4 text-slate-600">{h.deviceName}</td>
                     <td className="p-4 text-slate-600 text-xs">
                        <span className="font-bold">{h.loginDate}</span><br/>
                        {h.loginTime}
                     </td>
                   </tr>
                ))}
                {!loading && filteredHistory.length === 0 && (
                   <tr><td colSpan={4} className="p-8 text-center text-slate-500">No login history found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
