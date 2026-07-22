import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Filter, Search } from 'lucide-react';
import { collection, query, getDocs, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import * as XLSX from 'xlsx';

export default function AdminDmrDashboardScreen() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterCenter, setFilterCenter] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    // We should ideally fetch all report_assignments for 'dmr', then map submitted status.
    // For simplicity, let's just fetch dmr_reports.
    const q = query(collection(db, 'dmr_reports'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setReports(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const exportExcel = () => {
    const dataToExport = filteredReports.map(r => ({
      'Report Date': r.reportDate,
      'Center Name': r.centerName,
      'Center Code': r.centerCode,
      'Staff Name': r.staffName,
      'Staff ID': r.staffEmpId,
      'Reporting Period': r.reportingPeriod,
      'Status': r.status,
      ...r.fields
    }));
    
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DMR_Reports");
    XLSX.writeFile(wb, `DMR_Reports_${new Date().toISOString().split('T')[0]}.xlsx`);
  };


  const handleReopen = async (reportId: string, staffName: string) => {
    if (window.confirm(`Are you sure you want to reopen the report for ${staffName}? This will delete the current submission and allow them to submit again today.`)) {
      try {
        await deleteDoc(doc(db, 'dmr_reports', reportId));
        alert('Report reopened successfully.');
      } catch (err) {
        console.error(err);
        alert('Failed to reopen report.');
      }
    }
  };

  const filteredReports = reports.filter(r => {
    const matchDate = filterDate ? r.reportDate === filterDate : true;
    const matchCenter = filterCenter ? r.centerName.toLowerCase().includes(filterCenter.toLowerCase()) : true;
    const matchStatus = filterStatus === 'All' ? true : r.status === filterStatus;
    return matchDate && matchCenter && matchStatus;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-blue-800 text-white h-20 flex items-center px-6 shadow-md gap-4 justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/report-management/admin-dashboard')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight uppercase">DMR Dashboard</h1>
          </div>
        </div>
        <button onClick={exportExcel} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded text-sm font-bold transition-colors">
          <Download size={16} /> Export
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Date</label>
            <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="w-full p-2 border rounded mt-1" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Center Search</label>
            <div className="relative mt-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" value={filterCenter} onChange={e => setFilterCenter(e.target.value)} placeholder="Search center..." className="w-full p-2 pl-9 border rounded" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="w-full p-2 border rounded mt-1">
              <option value="All">All</option>
              <option value="Submitted">Submitted</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center p-10"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>
        ) : filteredReports.length === 0 ? (
          <div className="text-center p-10 text-slate-500 font-bold uppercase tracking-widest">No Reports Found</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="p-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Date</th>
                  <th className="p-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Center</th>
                  <th className="p-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Staff</th>
                  <th className="p-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Period</th>

                  <th className="p-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Data</th>
                  <th className="p-3 text-xs font-bold text-slate-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map(r => (
                  <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-3 text-sm font-medium">{r.reportDate}</td>
                    <td className="p-3 text-sm">
                      <div className="font-bold text-slate-800">{r.centerName}</div>
                      <div className="text-xs text-slate-500">{r.centerCode} | {r.district} | {r.block}</div>
                    </td>
                    <td className="p-3 text-sm">
                      <div className="font-bold text-slate-800">{r.staffName}</div>
                      <div className="text-xs text-slate-500">{r.staffEmpId} ({r.staffRole})</div>
                    </td>
                    <td className="p-3 text-sm font-medium">{r.reportingPeriod}</td>
                    
                    <td className="p-3 text-xs">
                      {Object.entries(r.fields || {}).map(([k, v]) => (
                        <div key={k}><span className="font-bold text-slate-600">{k}:</span> {String(v)}</div>
                      ))}
                    </td>
                    <td className="p-3">
                      <button onClick={() => handleReopen(r.id, r.staffName)} className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded text-xs font-bold uppercase transition-colors">
                        Reopen
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
