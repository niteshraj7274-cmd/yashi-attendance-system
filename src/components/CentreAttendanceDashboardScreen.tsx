import React, { useState, useEffect, useMemo } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import {  
  ArrowLeft, FileBarChart, Users, Clock, AlertTriangle, Calendar, Search, 
  Filter, MapPin, Map
} from 'lucide-react';
import {  collection, query, getDocs, onSnapshot, where, doc, getDoc } from 'firebase/firestore';
import {  db } from '../firebase';
import {  Staff } from '../types';

export default function CentreAttendanceDashboardScreen() {
  const navigate = useNavigate();
  const { centerId } = useParams();

  const [settings, setSettings] = useState<any>({
    centerDashboardViewAllCenters: false,
    centerDashboardViewAttendanceDashboard: true,
    centerDashboardViewAttendanceSummary: true,
    centerDashboardViewDateFilter: true,
    centerDashboardViewCenterFilter: true,
    centerDashboardViewStaffAttendanceDetails: true,
    centerDashboardViewReports: true,
    centerDashboardViewSearchFilter: true,
  });

  const [loading, setLoading] = useState(true);
  
  // Data
  const [allStaff, setAllStaff] = useState<Staff[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [centerName, setCenterName] = useState('');
  const [centers, setCenters] = useState<any[]>([]);
  
  // Filters
  const [selectedDateFilter, setSelectedDateFilter] = useState('today');
  const [customDate, setCustomDate] = useState(new Date().toISOString().split('T')[0]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCenterId, setSelectedCenterId] = useState(centerId || '');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Settings fetch
  useEffect(() => {
    const init = async () => {
      try {
        const docRef = doc(db, 'settings', 'appSettings');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings({ ...settings, ...docSnap.data() });
        }
        
        if (centerId) {
            const centerRef = doc(db, 'centers', centerId);
            const centerSnap = await getDoc(centerRef);
            if (centerSnap.exists()) {
                setCenterName(centerSnap.data().name || centerSnap.data().centerName);
            }
        }
        
        // Fetch all centers for filter
        const cQuery = query(collection(db, 'centers'));
        const cSnap = await getDocs(cQuery);
        setCenters(cSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        
      } catch(e) {
        console.error(e);
      }
    };
    init();
  }, []);

  // Fetch staff and attendance based on filters
  useEffect(() => {
    let unsubStaff: any = null;
    let unsubAtt: any = null;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Staff Query
        let sQuery = query(collection(db, 'staff'));
        if (!settings.centerDashboardViewAllCenters && centerId) {
            sQuery = query(collection(db, 'staff'), where('centerId', '==', centerId));
        } else if (selectedCenterId && selectedCenterId !== 'all') {
            sQuery = query(collection(db, 'staff'), where('centerId', '==', selectedCenterId));
        }
        
        unsubStaff = onSnapshot(sQuery, (sSnap) => {
           const staffData = sSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Staff[];
           setAllStaff(staffData);
           
           // After staff is fetched, we listen to attendance
           let attQuery = query(collection(db, 'attendance'));
           
           // Let's filter by date strings
           const getDatesInRange = (start: Date, end: Date) => {
               const arr = [];
               for(let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)){
                   arr.push(new Date(dt).toISOString().split('T')[0]);
               }
               return arr;
           };
           
           let queryStartDate = new Date();
           let queryEndDate = new Date();
           queryStartDate.setHours(0,0,0,0);
           queryEndDate.setHours(23,59,59,999);
           
           if (selectedDateFilter === 'yesterday') {
               queryStartDate.setDate(queryStartDate.getDate() - 1);
               queryEndDate.setDate(queryEndDate.getDate() - 1);
           } else if (selectedDateFilter === 'custom' && customDate) {
               queryStartDate = new Date(customDate);
               queryEndDate = new Date(customDate);
           } else if (selectedDateFilter === 'range' && startDate && endDate) {
               queryStartDate = new Date(startDate);
               queryEndDate = new Date(endDate);
           }
           const dateStrs = getDatesInRange(queryStartDate, queryEndDate);
           
           if (unsubAtt) unsubAtt();
           unsubAtt = onSnapshot(attQuery, (attSnap) => {
              const attData = attSnap.docs
                  .map(d => ({ id: d.id, ...d.data() } as any))
                  .filter(d => dateStrs.includes(d.date || d.Date));
                  
              const staffIds = staffData.map(s => s.staffId || s.id);
              const filteredAtt = attData.filter(a => staffIds.includes(a.staffId || a['Staff ID'] || a.staffUid));
              setAttendanceRecords(filteredAtt);
              setLoading(false);
           }, (err) => {
              console.error(err);
              setLoading(false);
           });
        }, (err) => {
           console.error(err);
           setLoading(false);
        });
      } catch(e) {
        console.error(e);
        setLoading(false);
      }
    };
    
    if (settings) fetchData();
    
    return () => {
       if (unsubStaff) unsubStaff();
       if (unsubAtt) unsubAtt();
    };
  }, [selectedCenterId, selectedDateFilter, customDate, startDate, endDate, settings.centerDashboardViewAllCenters, centerId]);

  // Combine and Calculate
  const combinedData = useMemo(() => {
    // Generate dates based on selection
    let queryStartDate = new Date();
    let queryEndDate = new Date();
    queryStartDate.setHours(0,0,0,0);
    queryEndDate.setHours(23,59,59,999);
    
    if (selectedDateFilter === 'yesterday') {
        queryStartDate.setDate(queryStartDate.getDate() - 1);
        queryEndDate.setDate(queryEndDate.getDate() - 1);
    } else if (selectedDateFilter === 'custom' && customDate) {
        queryStartDate = new Date(customDate);
        queryEndDate = new Date(customDate);
    } else if (selectedDateFilter === 'range' && startDate && endDate) {
        queryStartDate = new Date(startDate);
        queryEndDate = new Date(endDate);
    }
    
    const dates = [];
    for(let dt = new Date(queryStartDate); dt <= queryEndDate; dt.setDate(dt.getDate() + 1)){
        dates.push(new Date(dt).toISOString().split('T')[0]);
    }

    const rows: any[] = [];
    
    dates.forEach(dateStr => {
        allStaff.forEach(staff => {
            const att = attendanceRecords.find(a => 
               (a.staffId === (staff.staffId || staff.id) || 
                a['Staff ID'] === (staff.staffId || staff.id) || 
                a.staffUid === (staff.uid || staff.id)) && 
               (a.date === dateStr || a.Date === dateStr)
            );
            
            let status = att ? (att.status || att['Attendance Status']) : 'Absent';
            if (!att) {
                status = 'Absent'; // If past date and no record, absent
            }
            // Additional fallback
            if (att?.isOd || att?.['Attendance Status'] === 'Official Duty') status = 'Official Duty';
            if (att?.isHalfDay || att?.['Attendance Status'] === 'Half Day') status = 'Half Day';

            rows.push({
                staffName: staff.name,
                staffId: staff.staffId || staff.id,
                designation: staff.designation,
                centerName: centers.find(c => c.id === staff.centerId)?.name || 'Unknown',
                status: status,
                inTime: att?.inTime || att?.['IN Time'] || '-',
                outTime: att?.outTime || att?.['OUT Time'] || '-',
                workingHours: att?.workingHours || att?.['Working Hours'] || '-',
                attendanceType: att?.isOutside || (att?.['Attendance Type'] && att['Attendance Type'].toLowerCase().includes('outside')) ? 'Outside Center' : 'In Center',
                date: dateStr,
                autoOut: att?.autoOut || false
            });
        });
    });
    
    return rows;
  }, [allStaff, attendanceRecords, selectedDateFilter, customDate, startDate, endDate, centers]);

  const filteredRows = useMemo(() => {
      if (!searchQuery) return combinedData;
      const q = searchQuery.toLowerCase();
      return combinedData.filter(r => 
          r.staffName?.toLowerCase().includes(q) ||
          r.staffId?.toLowerCase().includes(q) ||
          r.designation?.toLowerCase().includes(q) ||
          r.status?.toLowerCase().includes(q) ||
          r.centerName?.toLowerCase().includes(q)
      );
  }, [combinedData, searchQuery]);

  const summary = useMemo(() => {
      const counts = {
          Total: filteredRows.length,
          Present: 0,
          Absent: 0,
          Late: 0,
          'Half Day': 0,
          Pending: 0,
          'Official Duty': 0,
          AutoOut: 0
      };
      
      filteredRows.forEach(r => {
          if (r.status === 'Present') counts.Present++;
          if (r.status === 'Absent') counts.Absent++;
          if (r.status === 'Late') counts.Late++;
          if (r.status === 'Half Day') counts['Half Day']++;
          if (r.status === 'Pending') counts.Pending++;
          if (r.status === 'Official Duty') counts['Official Duty']++;
          if (r.autoOut) counts.AutoOut++;
      });
      return counts;
  }, [filteredRows]);

  if (!settings.centerDashboardViewAttendanceDashboard) {
      return (
          <div className="flex flex-col min-h-screen bg-slate-50 items-center justify-center p-6">
              <h2 className="text-xl font-bold text-slate-800">Access Denied</h2>
              <p className="text-slate-600 mt-2">The Attendance Dashboard is currently disabled by the Administrator.</p>
              <button onClick={() => navigate(-1)} className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg">Go Back</button>
          </div>
      );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      <div className="bg-indigo-700 text-white p-6 shadow-md relative z-10">
        <div className="flex justify-between items-start mb-6">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={20} />
          </button>
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Attendance Dashboard</h1>
          <p className="text-indigo-100 mt-1 text-sm">{centerName || 'All Centers'}</p>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {settings.centerDashboardViewDateFilter && (
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Date Filter</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                    {['today', 'yesterday', 'custom', 'range'].map(type => (
                        <button
                            key={type}
                            onClick={() => setSelectedDateFilter(type)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                selectedDateFilter === type 
                                ? 'bg-indigo-600 text-white' 
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
                {selectedDateFilter === 'custom' && (
                    <input type="date" value={customDate} onChange={e => setCustomDate(e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                )}
                {selectedDateFilter === 'range' && (
                    <div className="flex gap-2">
                        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-1/2 p-2 border rounded-lg text-sm" />
                        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-1/2 p-2 border rounded-lg text-sm" />
                    </div>
                )}
            </div>
        )}

        {settings.centerDashboardViewCenterFilter && settings.centerDashboardViewAllCenters && (
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Center Filter</h3>
                <select 
                    value={selectedCenterId} 
                    onChange={e => setSelectedCenterId(e.target.value)}
                    className="w-full p-2 border rounded-lg text-sm bg-slate-50"
                >
                    <option value="all">All Centers</option>
                    {centers.map(c => (
                        <option key={c.id} value={c.id}>{c.name || c.centerName}</option>
                    ))}
                </select>
            </div>
        )}

        {settings.centerDashboardViewSearchFilter && (
            <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex items-center">
                <Search size={18} className="text-slate-400 ml-2" />
                <input 
                    type="text" 
                    placeholder="Search name, ID, status..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="flex-1 p-2 bg-transparent outline-none text-sm"
                />
            </div>
        )}

        {settings.centerDashboardViewAttendanceSummary && (
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Report Summary</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <p className="text-xs text-slate-500 font-medium">Total Staff</p>
                        <p className="text-xl font-bold text-slate-800">{summary.Total}</p>
                    </div>
                    <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                        <p className="text-xs text-emerald-600 font-medium">Present</p>
                        <p className="text-xl font-bold text-emerald-700">{summary.Present}</p>
                    </div>
                    <div className="bg-rose-50 p-3 rounded-lg border border-rose-100">
                        <p className="text-xs text-rose-600 font-medium">Absent</p>
                        <p className="text-xl font-bold text-rose-700">{summary.Absent}</p>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                        <p className="text-xs text-amber-600 font-medium">Late</p>
                        <p className="text-xl font-bold text-amber-700">{summary.Late}</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                        <p className="text-xs text-orange-600 font-medium">Half Day</p>
                        <p className="text-xl font-bold text-orange-700">{summary['Half Day']}</p>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-lg border border-slate-200">
                        <p className="text-xs text-slate-600 font-medium">Pending</p>
                        <p className="text-xl font-bold text-slate-800">{summary.Pending}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <p className="text-xs text-blue-600 font-medium">Official Duty</p>
                        <p className="text-xl font-bold text-blue-700">{summary['Official Duty']}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                        <p className="text-xs text-purple-600 font-medium">Auto OUT</p>
                        <p className="text-xl font-bold text-purple-700">{summary.AutoOut}</p>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">Attendance Percentage</span>
                    <span className="text-lg font-bold text-indigo-600">
                        {summary.Total > 0 ? Math.round(((summary.Present + summary.Late) / summary.Total) * 100) : 0}%
                    </span>
                </div>
            </div>
        )}

        {settings.centerDashboardViewStaffAttendanceDetails && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Staff Attendance List</h3>
                </div>
                
                {loading ? (
                    <div className="p-8 flex justify-center"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>
                ) : filteredRows.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-sm">No records found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500">
                                <tr>
                                    <th className="p-4">Name / ID</th>
                                    <th className="p-4">Designation</th>
                                    <th className="p-4">Center</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">IN Time</th>
                                    <th className="p-4">OUT Time</th>
                                    <th className="p-4">Work Hours</th>
                                    <th className="p-4">Type</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredRows.map((r, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4">
                                            <div className="font-bold text-slate-800">{r.staffName}</div>
                                            <div className="text-xs text-slate-500">{r.staffId}</div>
                                        </td>
                                        <td className="p-4 text-slate-600">{r.designation}</td>
                                        <td className="p-4 text-slate-600">{r.centerName}</td>
                                        <td className="p-4 font-medium text-slate-800">{new Date(r.date).toLocaleDateString('en-GB')}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                                                r.status === 'Present' ? 'bg-emerald-100 text-emerald-700' :
                                                r.status === 'Absent' ? 'bg-rose-100 text-rose-700' :
                                                r.status === 'Late' ? 'bg-amber-100 text-amber-700' :
                                                r.status === 'Half Day' ? 'bg-orange-100 text-orange-700' :
                                                r.status === 'Official Duty' ? 'bg-blue-100 text-blue-700' :
                                                'bg-slate-100 text-slate-700'
                                            }`}>
                                                {r.status} {r.autoOut && '(Auto OUT)'}
                                            </span>
                                        </td>
                                        <td className="p-4 font-mono text-xs">{r.inTime}</td>
                                        <td className="p-4 font-mono text-xs">{r.outTime}</td>
                                        <td className="p-4 font-mono text-xs text-indigo-600">{r.workingHours}</td>
                                        <td className="p-4 text-xs text-slate-500">{r.attendanceType}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        )}

      </div>
    </div>
  );
}
