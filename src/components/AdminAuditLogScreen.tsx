import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Clock, Download, FileText, Filter } from 'lucide-react';
import { collection, query, getDocs, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function AdminAuditLogScreen() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterModule, setFilterModule] = useState('');
  const [filterAction, setFilterAction] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCenter, setFilterCenter] = useState('');
  const [filterStaff, setFilterStaff] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const q = query(collection(db, 'audit_logs'), orderBy('timestamp', 'desc'));
      const snap = await getDocs(q);
      const logData = snap.docs.map(doc => {
         const data = doc.data();
         let logDate = '';
         let logTime = '';
         if (data.timestamp) {
           const d = data.timestamp.toDate();
           logDate = d.toLocaleDateString('en-CA');
           logTime = d.toLocaleTimeString('en-US');
         }
         return { id: doc.id, logDate, logTime, ...data };
      });
      setLogs(logData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      if (!(log.userName?.toLowerCase().includes(term) || 
            log.staffId?.toLowerCase().includes(term) || 
            log.staffName?.toLowerCase().includes(term) ||
            log.adminName?.toLowerCase().includes(term) ||
            log.action?.toLowerCase().includes(term) ||
            log.moduleName?.toLowerCase().includes(term) ||
            log.entityType?.toLowerCase().includes(term))) {
        return false;
      }
    }
    if (filterDate && log.logDate !== filterDate) return false;
    if (filterRole && log.role !== filterRole) return false;
    if (filterModule && log.moduleName !== filterModule && log.entityType !== filterModule) return false;
    if (filterAction && log.action !== filterAction) return false;
    if (filterStatus && log.status !== filterStatus) return false;
    if (filterCenter && !log.centerName?.toLowerCase().includes(filterCenter.toLowerCase())) return false;
    if (filterStaff && !log.staffName?.toLowerCase().includes(filterStaff.toLowerCase()) && !log.staffId?.toLowerCase().includes(filterStaff.toLowerCase())) return false;
    
    return true;
  });

  const getExportData = () => {
    return filteredLogs.map(log => ({
      'Date': log.logDate || '',
      'Time': log.logTime || '',
      'User Name': log.userName || log.adminName || '',
      'Role': log.role || 'Admin',
      'Staff ID': log.staffId || '',
      'Staff Name': log.staffName || '',
      'Center Name': log.centerName || '',
      'Center Code': log.centerCode || '',
      'Module': log.moduleName || log.entityType || '',
      'Action': log.action || '',
      'Details/New Value': log.details || log.newValue || '',
      'Previous Value': log.previousValue || '',
      'Status': log.status || 'Success',
      'IP Address': log.ipAddress || '',
      'GPS Location': (log.latitude && log.longitude) ? `${log.latitude}, ${log.longitude}` : '',
      'Device ID': log.deviceId || '',
      'Reason': log.reason || ''
    }));
  };

  const exportExcel = () => {
    const data = getExportData();
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Audit Logs");
    XLSX.writeFile(wb, `Audit_Logs_${new Date().getTime()}.xlsx`);
  };

  const exportPDF = () => {
    const data = getExportData();
    const doc = new jsPDF('landscape');
    
    doc.setFontSize(16);
    doc.text('System Audit Logs', 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);

    const tableColumn = ["Date", "Time", "User/Role", "Center", "Module", "Action", "Status"];
    const tableRows = data.map(r => [
      r['Date'],
      r['Time'],
      `${r['User Name']} (${r['Role']})`,
      r['Center Name'],
      r['Module'],
      r['Action'],
      r['Status']
    ]);

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 28,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [5, 150, 105] }
    });

    doc.save(`Audit_Logs_${new Date().getTime()}.pdf`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-emerald-700 text-white p-6 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-tight uppercase">Audit Logs</h1>
              <p className="text-[10px] text-emerald-200 uppercase tracking-widest mt-0.5">Track System Changes</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={exportExcel} className="p-2 bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors shadow-sm">
              <Download size={18} />
            </button>
            <button onClick={exportPDF} className="p-2 bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors shadow-sm">
              <FileText size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search user, staff, module..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-medium"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2.5 rounded-lg border ${showFilters ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-600'}`}
          >
            <Filter size={18} />
          </button>
        </div>
        
        {showFilters && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Date</label>
              <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="w-full p-2 border border-slate-200 rounded-md text-sm" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Role</label>
              <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="w-full p-2 border border-slate-200 rounded-md text-sm">
                <option value="">All</option>
                <option value="Admin">Admin</option>
                <option value="Center">Center</option>
                <option value="HR">HR</option>
                <option value="Staff">Staff</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Module</label>
              <input type="text" placeholder="e.g. Attendance" value={filterModule} onChange={e => setFilterModule(e.target.value)} className="w-full p-2 border border-slate-200 rounded-md text-sm" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Action</label>
              <input type="text" placeholder="e.g. Login" value={filterAction} onChange={e => setFilterAction(e.target.value)} className="w-full p-2 border border-slate-200 rounded-md text-sm" />
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {loading ? (
          <div className="text-center py-10 text-slate-500 font-bold uppercase tracking-wider">Loading logs...</div>
        ) : filteredLogs.length === 0 ? (
          <div className="text-center py-10 text-slate-500 font-bold uppercase tracking-wider">No logs found</div>
        ) : (
          <div className="space-y-4">
            {filteredLogs.map(log => (
              <motion.div key={log.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
                <div className="flex justify-between items-start border-b border-slate-100 pb-2">
                  <div>
                    <h3 className="font-bold text-slate-800 uppercase tracking-wide text-sm">{log.userName || log.adminName || 'Unknown User'}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold rounded uppercase">{log.role || 'Admin'}</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{log.staffId || log.centerCode}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-slate-600 text-[10px] font-bold justify-end">
                      <Clock size={10} /> {log.logTime}
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">{log.logDate}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Module</p>
                    <p className="text-xs text-slate-700 font-bold uppercase">{log.moduleName || log.entityType}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Action</p>
                    <p className="text-xs text-indigo-600 font-bold uppercase">{log.action}</p>
                  </div>
                </div>
                
                {(log.details || log.newValue || log.previousValue) && (
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 mt-2">
                    {log.previousValue && (
                      <div className="mb-1 text-xs">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Prev: </span>
                        <span className="text-rose-500 line-through opacity-80">{log.previousValue}</span>
                      </div>
                    )}
                    <div className="text-xs">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Details: </span>
                      <span className="text-emerald-700 font-medium">{log.details || log.newValue}</span>
                    </div>
                  </div>
                )}
                
                {log.centerName && (
                  <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
                     <span>Center: {log.centerName}</span>
                     {log.ipAddress && <span>IP: {log.ipAddress}</span>}
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
