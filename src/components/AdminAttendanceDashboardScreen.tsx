import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Calendar as CalendarIcon, MapPin, CheckCircle, Clock, XCircle, AlertTriangle, Building2, UserCircle, Briefcase , RefreshCw, Download, FileText, FileSpreadsheet, Image as ImageIcon } from 'lucide-react';
import { collection, query, getDocs, orderBy, onSnapshot, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useActiveCenters } from '../hooks/useActiveCenters';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function AdminAttendanceDashboardScreen() {
  const navigate = useNavigate();
  const { centers } = useActiveCenters();
  
  const today = new Date();
  const todayStr = today.toLocaleDateString('en-CA');
  
  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(todayStr);
  
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [selectedCenter, setSelectedCenter] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');
  const [selectedAttendanceType, setSelectedAttendanceType] = useState('');
  
  const [staffList, setStaffList] = useState<any[]>([]);
  const [showPhotoModal, setShowPhotoModal] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaff = async () => {
      const snap = await getDocs(collection(db, 'staff'));
      setStaffList(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchStaff();
  }, []);

  useEffect(() => {
    // Optimize for large data by querying only by date range
    if (!startDate || !endDate) return;
    
    setLoading(true);
    // Note: To use multiple where clauses on 'date' or 'Date' we might need an index.
    // If Date is stored as 'YYYY-MM-DD', a simple where('>='), where('<=') works.
    const q = query(
      collection(db, 'attendance'),
      where('Date', '>=', startDate),
      where('Date', '<=', endDate)
    );
    
    const unsub = onSnapshot(q, (snap) => {
      // We sort in memory to avoid needing composite indexes if they don't exist
      let fetched = snap.docs.map(d => ({ id: d.id, ...d.data() } as any));
      fetched.sort((a, b) => {
        const timeA = a.timestamp?.toMillis?.() || 0;
        const timeB = b.timestamp?.toMillis?.() || 0;
        return timeB - timeA;
      });
      setRecords(fetched);
      setLoading(false);
    }, (err) => {
      console.error(err);
      // Fallback if index fails
      setLoading(false);
    });
    
    return unsub;
  }, [startDate, endDate]);

  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      // Center
      if (selectedCenter && r['Center Code'] !== selectedCenter) return false;
      
      // Staff (Staff Code or Name)
      if (selectedStaff) {
         const searchTerm = selectedStaff.toLowerCase();
         const staffName = (r['Staff Name'] || '').toLowerCase();
         const staffId = (r['Staff ID'] || r.staffId || '').toLowerCase();
         if (!staffName.includes(searchTerm) && !staffId.includes(searchTerm)) return false;
      }
      
      // Attendance Type
      if (selectedAttendanceType) {
        const type = (r['Attendance Type'] || '').toLowerCase();
        const status = (r['Attendance Status'] || '').toLowerCase();
        
        if (selectedAttendanceType === 'GPS Attendance') {
          if (!type.includes('location') && !type.includes('gps')) return false;
        } else if (selectedAttendanceType === 'Selfie Attendance') {
          if (!type.includes('selfie')) return false;
        } else if (selectedAttendanceType === 'Official Duty') {
          if (!status.includes('official duty') && !type.includes('official duty')) return false;
        }
      }
      
      return true;
    });
  }, [records, selectedCenter, selectedStaff, selectedAttendanceType]);

  const calculateWorkingHours = (inTime: string, outTime: string) => {
    if (!inTime || !outTime) return 'N/A';
    try {
      const d1 = new Date(`2000-01-01T${inTime}`);
      const d2 = new Date(`2000-01-01T${outTime}`);
      if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 'Invalid';
      const diffMs = d2.getTime() - d1.getTime();
      if (diffMs < 0) return 'Invalid';
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${diffHrs}h ${diffMins}m`;
    } catch {
      return 'N/A';
    }
  };

  const getExportData = () => {
    return filteredRecords.map(r => ({
      'Staff Name': r['Staff Name'] || 'N/A',
      'Staff Code': r['Staff ID'] || r.staffId || 'N/A',
      'Center Name': r['Center Name'] || 'N/A',
      'Attendance Type': r['Attendance Type'] || 'Location Only',
      'GPS Latitude': r['Latitude'] || r['Current Latitude'] || 'N/A',
      'GPS Longitude': r['Longitude'] || r['Current Longitude'] || 'N/A',
      'In Date': r.Date || r.date || 'N/A',
      'In Time': r['IN Time'] || r.time || 'N/A',
      'Out Date': r['OUT Date'] || (r['OUT Time'] ? (r.Date || r.date || 'N/A') : 'N/A'),
      'Out Time': r['OUT Time'] || 'N/A',
      'OUT Type': r['OUT Type'] || (r['OUT Time'] ? 'Manual OUT' : 'N/A'),
      'Working Hours': calculateWorkingHours(r['IN Time'] || r.time, r['OUT Time']),
      'Attendance Status': r['Attendance Status'] || 'Present'
    }));
  };

  const exportToExcel = () => {
    const data = getExportData();
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance_Report");
    let filename = `Attendance_Report_${startDate}_to_${endDate}.xlsx`;
    if (selectedCenter) {
      const cName = centers.find(c => c.code === selectedCenter)?.name || selectedCenter;
      filename = `Attendance_${cName}_${startDate}_to_${endDate}.xlsx`;
    }
    XLSX.writeFile(wb, filename);
  };

  const exportToPDF = () => {
    const doc = new jsPDF('landscape');
    const data = getExportData();
    
    let title = `Attendance Report (${startDate} to ${endDate})`;
    if (selectedCenter) {
      const cName = centers.find(c => c.code === selectedCenter)?.name || selectedCenter;
      title = `${cName} - ${title}`;
    }
    
    doc.setFontSize(14);
    doc.text(title, 14, 15);
    
    const tableColumn = ["Staff Name", "Staff Code", "Center", "Type", "Lat/Lng", "In Time", "Out Time", "Out Type", "Work Hrs", "Status"];
    const tableRows = data.map(r => [
      r['Staff Name'],
      r['Staff Code'],
      r['Center Name'],
      r['Attendance Type'],
      `${r['GPS Latitude']}\\n${r['GPS Longitude']}`,
      `${r['In Date']} \\n${r['In Time']}`,
      `${r['Out Date']} \\n${r['Out Time']}`,
      r['Working Hours'],
      r['Attendance Status']
    ]);
    
    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [4, 120, 87] }
    });
    
    let filename = `Attendance_Report_${startDate}_to_${endDate}.pdf`;
    doc.save(filename);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-emerald-700 text-white p-6 shadow-md relative shrink-0">
        <div className="flex justify-between items-start mb-6 gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors shrink-0">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold uppercase tracking-widest">Attendance Dashboard</h1>
            <p className="text-emerald-100 text-sm font-medium">Advanced Records & Export</p>
          </div>
          <div className="flex gap-2">
             <button onClick={exportToPDF} className="bg-red-500 hover:bg-red-600 p-2 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider shadow-sm">
                <FileText size={16} /> <span className="hidden sm:inline">PDF</span>
             </button>
             <button onClick={exportToExcel} className="bg-emerald-500 hover:bg-emerald-600 p-2 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider shadow-sm border border-emerald-400">
                <FileSpreadsheet size={16} /> <span className="hidden sm:inline">Excel</span>
             </button>
          </div>
        </div>

        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-emerald-100 uppercase tracking-wider mb-1">Start Date</label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 bg-emerald-800/50 border border-emerald-500/50 rounded-lg text-sm text-white outline-none focus:border-white" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-emerald-100 uppercase tracking-wider mb-1">End Date</label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2 bg-emerald-800/50 border border-emerald-500/50 rounded-lg text-sm text-white outline-none focus:border-white" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-emerald-100 uppercase tracking-wider mb-1">Center Filter</label>
              <select value={selectedCenter} onChange={e => setSelectedCenter(e.target.value)} className="w-full p-2 bg-emerald-800/50 border border-emerald-500/50 rounded-lg text-sm text-white outline-none focus:border-white [&>option]:bg-slate-800">
                <option value="">All Centers</option>
                {centers.map(c => <option key={c.id} value={c.code}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-emerald-100 uppercase tracking-wider mb-1">Attendance Type</label>
              <select value={selectedAttendanceType} onChange={e => setSelectedAttendanceType(e.target.value)} className="w-full p-2 bg-emerald-800/50 border border-emerald-500/50 rounded-lg text-sm text-white outline-none focus:border-white [&>option]:bg-slate-800">
                <option value="">All Types</option>
                <option value="GPS Attendance">GPS Attendance</option>
                <option value="Selfie Attendance">Selfie Attendance</option>
                <option value="Official Duty">Official Duty</option>
              </select>
            </div>
            <div className="md:col-span-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-300" />
                <input 
                  type="text" 
                  placeholder="Search Staff Name or Code..." 
                  value={selectedStaff}
                  onChange={e => setSelectedStaff(e.target.value)}
                  className="w-full pl-9 p-2 bg-emerald-800/50 border border-emerald-500/50 rounded-lg text-sm text-white outline-none focus:border-white placeholder:text-emerald-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-hidden flex flex-col">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Attendance Records ({filteredRecords.length})</h2>
          </div>
          
          <div className="flex-1 overflow-auto">
            {loading ? (
              <div className="p-8 text-center flex flex-col items-center justify-center h-full">
                 <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                 <div className="text-slate-500 font-medium">Loading records...</div>
              </div>
            ) : filteredRecords.length === 0 ? (
              <div className="p-8 text-center text-slate-500 font-medium h-full flex items-center justify-center">No records found for selected filters.</div>
            ) : (
              <table className="w-full text-left text-sm whitespace-nowrap min-w-max">
                <thead className="bg-slate-100 sticky top-0 z-10 text-[10px] uppercase tracking-wider text-slate-500 shadow-sm">
                  <tr>
                    <th className="px-4 py-3 font-bold">Staff Info</th>
                    <th className="px-4 py-3 font-bold">Center</th>
                    <th className="px-4 py-3 font-bold">Location & Type</th>
                    <th className="px-4 py-3 font-bold">Photo</th>
                    <th className="px-4 py-3 font-bold">In Time</th>
                    <th className="px-4 py-3 font-bold">Out Time</th>
                    <th className="px-4 py-3 font-bold">Work Hrs</th>
                    <th className="px-4 py-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.map((r, index) => {
                    const isOutside = (r['Attendance Status'] || '').includes('Outside');
                    const isOD = (r['Attendance Status'] || '').includes('Official Duty');
                    const photoUrl = r['Photo URL'] || r['Selfie URL'] || r['Selfie Image URL'] || r['OUT Selfie Image URL'] || r.photoUrl || r.selfieUrl;
                    
                    return (
                      <tr key={`${r.id}_${index}`} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-800 flex items-center gap-2">{r['Staff Name']} <span className="text-xs text-slate-500 font-normal">({r['Staff ID'] || r.staffId})</span></div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-800 flex items-center gap-2">{r['Center Name'] || 'N/A'} <span className="text-xs text-slate-500 font-normal">({r['Center Code'] || 'N/A'})</span></div>
                        </td>
                        <td className="px-4 py-3">
                           <div className="font-bold text-slate-700">{r['Attendance Type'] || 'Location Only'}</div>
                           <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                             <MapPin size={10} /> {r['Latitude'] || r['Current Latitude'] || 'N/A'}, {r['Longitude'] || r['Current Longitude'] || 'N/A'}
                           </div>
                        </td>
                        <td className="px-4 py-3">
                           {photoUrl ? (
                             <button onClick={() => setShowPhotoModal(photoUrl)} className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold uppercase tracking-wider hover:bg-blue-100 transition-colors border border-blue-200">
                               <ImageIcon size={12} /> View
                             </button>
                           ) : (
                             <span className="text-[10px] text-slate-400 font-medium">N/A</span>
                           )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-800 flex items-center gap-2">{r.Date || r.date || 'N/A'} <span className="text-xs text-emerald-600 font-bold">{r['IN Time'] || r.time || 'N/A'}</span></div>
                        </td>
                        <td className="px-4 py-3">
                          {r['OUT Time'] ? (
                            <>
                              <div className="font-bold text-slate-800 flex items-center gap-2">{r.Date || r.date || 'N/A'} <span className="text-xs text-rose-600 font-bold">{r['OUT Time']}</span> {r['OUT Type'] === 'System Auto OUT' && <span className="ml-1 text-[8px] bg-red-100 text-red-600 px-1 py-0.5 rounded font-bold uppercase" title="Auto Generated OUT">Auto OUT</span>}</div>
                            </>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-medium italic">Not marked out</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                           <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded text-xs border border-indigo-100">
                             {calculateWorkingHours(r['IN Time'] || r.time, r['OUT Time'])}
                           </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${isOutside ? 'bg-red-50 text-red-600 border border-red-200' : isOD ? 'bg-purple-50 text-purple-600 border border-purple-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
                            {r['Attendance Status'] || 'Present'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      
      {/* Photo Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowPhotoModal(null)}>
          <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowPhotoModal(null)} className="absolute -top-10 right-0 text-white hover:text-slate-300 p-2">
              <XCircle size={32} />
            </button>
            <img src={showPhotoModal} alt="Selfie/Photo" className="w-full h-auto rounded-xl shadow-2xl object-contain max-h-[80vh]" />
          </div>
        </div>
      )}
    </div>
  );
}
