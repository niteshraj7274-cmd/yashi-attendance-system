import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Building2, Users, Clock } from 'lucide-react';
import { collection, query, getDocs, orderBy, onSnapshot, where } from 'firebase/firestore';
import { db } from '../firebase';

export default function AdminLiveMonitorScreen() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [attendance, setAttendance] = useState<any[]>([]);
  const [centers, setCenters] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  
  const [activeTab, setActiveTab] = useState<'live' | 'center' | 'staff'>('live');

  useEffect(() => {
    // Fetch live attendance for today
    const todayStr = new Date().toLocaleDateString('en-CA');
    const q = query(collection(db, 'attendance'), where('Date', '==', todayStr));
    const unsub = onSnapshot(q, (snap) => {
      const list: any[] = [];
      snap.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
      setAttendance(list.sort((a, b) => (b.timestamp?.toMillis() || 0) - (a.timestamp?.toMillis() || 0)));
    });

    getDocs(collection(db, 'centers')).then(snap => {
      const list: any[] = [];
      snap.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
      setCenters(list);
    });

    getDocs(collection(db, 'staff')).then(snap => {
      const list: any[] = [];
      snap.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
      setStaff(list);
    });

    return () => unsub();
  }, []);

  // Compute Center Performance
  const centerPerf = centers.map(c => {
    const cStaff = staff.filter(s => s.centerId === c.id);
    const total = cStaff.length;
    const cAtt = attendance.filter(a => a['Center Code'] === c.code);
    const present = cAtt.filter(a => a['Attendance Status'] === 'Present' || a['Attendance Status'] === 'Late' || a['Attendance Status'] === 'Half Day').length;
    const leave = cAtt.filter(a => a['Attendance Status'] === 'Leave').length;
    const od = cAtt.filter(a => a['Attendance Status'] === 'Official Duty').length;
    
    return {
      ...c,
      totalStaff: total,
      attPercent: total > 0 ? Math.round((present / total) * 100) : 0,
      leavePercent: total > 0 ? Math.round((leave / total) * 100) : 0,
      odPercent: total > 0 ? Math.round((od / total) * 100) : 0
    };
  }).sort((a, b) => b.attPercent - a.attPercent);

  // Compute Staff Performance for the current month
  // We don't have all month's data in the listener, so for simplicity in this view we can just show today, OR we need to fetch all month. 
  // Let's just fetch it when tab changes, or just show basic for now.

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-emerald-700 text-white p-4 shadow-md flex items-center gap-4">
        <button onClick={() => navigate('/admin-dashboard')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-lg font-bold tracking-tight uppercase">Live Monitor</h1>
          <p className="text-[10px] text-emerald-200 uppercase tracking-widest mt-0.5">Analytics & Performance</p>
        </div>
      </div>

      <div className="flex bg-white shadow-sm overflow-x-auto border-b border-slate-200 hide-scrollbar">
        <button onClick={() => setActiveTab('live')} className={`px-6 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap ${activeTab === 'live' ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-slate-500'}`}>Live Attendance</button>
        <button onClick={() => setActiveTab('center')} className={`px-6 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap ${activeTab === 'center' ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-slate-500'}`}>Center Perf.</button>
        <button onClick={() => setActiveTab('staff')} className={`px-6 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap ${activeTab === 'staff' ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-slate-500'}`}>Staff Perf.</button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <div className="relative mb-4">
          <input 
            type="text" 
            placeholder="Search by Name, ID, Center..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
        </div>

        {activeTab === 'live' && (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider">
                  <tr>
                    <th className="p-3 font-bold">Staff Name</th>
                    <th className="p-3 font-bold">ID</th>
                    <th className="p-3 font-bold">Center</th>
                    <th className="p-3 font-bold">Status</th>
                    <th className="p-3 font-bold">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attendance.filter(a => 
                    (a['Staff Name'] || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                    (a['Staff ID'] || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (a['Center Name'] || '').toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((a, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-800">{a['Staff Name']}</td>
                      <td className="p-3 text-slate-500 text-xs">{a['Staff ID']}</td>
                      <td className="p-3 text-slate-600 text-xs">{a['Center Name']}</td>
                      <td className="p-3">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                          a['Attendance Status'] === 'Present' ? 'bg-emerald-100 text-emerald-800' :
                          a['Attendance Status'] === 'Late' ? 'bg-amber-100 text-amber-800' :
                          a['Attendance Status'] === 'Half Day' ? 'bg-orange-100 text-orange-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {a['Attendance Status']}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600 text-xs font-mono">{a['IN Time'] || a['Time']}</td>
                    </tr>
                  ))}
                  {attendance.length === 0 && (
                    <tr><td colSpan={5} className="p-6 text-center text-slate-500 text-xs">No records today</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'center' && (
          <div className="flex flex-col gap-4">
            {centerPerf.filter(c => 
              (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
              (c.code || '').toLowerCase().includes(searchTerm.toLowerCase())
            ).map((c, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-800">{c.name}</h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{c.code}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-emerald-600">{c.attPercent}%</span>
                    <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Attendance</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 border-t border-slate-100 pt-3">
                  <div className="text-center">
                    <span className="block text-sm font-bold text-slate-700">{c.totalStaff}</span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Staff</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-sm font-bold text-emerald-600">{Math.round((c.attPercent * c.totalStaff)/100)}</span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Present</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-sm font-bold text-amber-600">{c.leavePercent}%</span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Leave</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-sm font-bold text-purple-600">{c.odPercent}%</span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Duty</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'staff' && (
           <div className="bg-white border border-slate-200 p-6 rounded-xl text-center text-sm text-slate-500 shadow-sm">
             Select individual staff from Staff Management for detailed historical performance, or view today's stats in Live Attendance.
           </div>
        )}
      </div>
    </div>
  );
}
