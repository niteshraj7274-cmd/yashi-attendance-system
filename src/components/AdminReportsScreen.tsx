import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileBarChart, MapPin, Clock, Calendar, Download } from 'lucide-react';
import { collection, onSnapshot, query, orderBy, limit, doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, deleteObject } from 'firebase/storage';
import { motion } from 'motion/react';
import { useActiveCenters } from '../hooks/useActiveCenters';


function calculateWorkingHours(inTime, outTime) {
  if (!inTime || !outTime) return 'N/A';
  const inParts = inTime.split(':');
  const outParts = outTime.split(':');
  if (inParts.length >= 2 && outParts.length >= 2) {
    const inHrs = parseInt(inParts[0]), inMins = parseInt(inParts[1]);
    const outHrs = parseInt(outParts[0]), outMins = parseInt(outParts[1]);
    
    let diffMs = (outHrs * 60 + outMins) * 60000 - (inHrs * 60 + inMins) * 60000;
    if (diffMs < 0) diffMs += 24 * 60 * 60 * 1000;
    
    const hrs = Math.floor(diffMs / 3600000);
    const mins = Math.floor((diffMs % 3600000) / 60000);
    return `${hrs}h ${mins}m`;
  }
  return 'N/A';
}

function getDistanceFromLatLonInM(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d * 1000; // Distance in m
}

export default function AdminReportsScreen() {
  const navigate = useNavigate();
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { centers } = useActiveCenters();
  const [selectedCenter, setSelectedCenter] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  useEffect(() => {
    let unsubscribe: () => void;
    try {
      const q = query(
        collection(db, 'attendance'),
        orderBy('timestamp', 'desc'),
        /* removed limit to show all records */
      );
      
      unsubscribe = onSnapshot(q, (snapshot) => {
        const attendanceData: any[] = [];
        snapshot.forEach((doc) => {
          attendanceData.push({ id: doc.id, ...doc.data() });
        });
        setRecords(attendanceData);
        setLoading(false);
      }, (err) => {
        console.error("Error fetching attendance:", err);
        setError('Failed to load attendance records. ' + err.message);
        setLoading(false);
      });
    } catch (err: any) {
      console.error("Sync error:", err);
      setError('An error occurred while setting up the attendance listener.');
      setLoading(false);
    }

      
  return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleDeleteSelfie = async (recordId: string, type: 'IN' | 'OUT', url: string) => {
    if (!window.confirm('Are you sure you want to delete this selfie? The attendance record will remain intact.')) return;
    try {
      if (url) {
        try {
          const imageRef = ref(storage, url);
          await deleteObject(imageRef);
        } catch(e) {
          console.warn("Could not delete from storage, might already be deleted", e);
        }
      }
      const fieldToUpdate = type === 'IN' ? 'Selfie Image URL' : 'OUT Selfie Image URL';
      await updateDoc(doc(db, 'attendance', recordId), {
        [fieldToUpdate]: null
      });
      alert('Selfie deleted successfully.');
    } catch (err) {
      console.error("Error deleting selfie:", err);
      alert('Failed to delete selfie.');
    }
  };

  const exportPDF = () => { 
    // Basic printable view for PDF
    const printWindow = window.open('', '', 'height=600,width=800');
    if (!printWindow) {
      alert("Please allow popups to print.");
      return;
    }
    printWindow.document.write('<html><head><title>Attendance Report</title>');
    printWindow.document.write('<style>table { border-collapse: collapse; width: 100%; font-family: sans-serif; font-size: 12px; } th, td { border: 1px solid #ddd; padding: 6px; text-align: left; } th { background-color: #f2f2f2; }</style>');
    printWindow.document.write('</head><body><h2>Attendance Report</h2><table>');
    
    printWindow.document.write('<tr><th>Date</th><th>Staff ID</th><th>Staff Name</th><th>Center</th><th>Status</th><th>IN Time</th><th>OUT Time</th><th>OUT Type</th><th>Total Hrs</th><th>Lat, Long</th></tr>');
    
    const filteredRecords = records.filter(r => !selectedCenter || r['Center Code'] === selectedCenter).filter(r => filterStatus === 'All' || r['Attendance Status'] === filterStatus);
    
    filteredRecords.forEach(record => {
      const center = centers.find(c => c.code === record['Center Code']);
      const centerLat = record['Official Center Latitude'] ?? center?.latitude;
      const centerLng = record['Official Center Longitude'] ?? center?.longitude;
      const staffLat = record['Current Latitude'] ?? record['Latitude'] ?? record['GPS Latitude'];
      const staffLng = record['Current Longitude'] ?? record['Longitude'] ?? record['GPS Longitude'];
      
      let distance = record['Distance from Center (m)'];
      if ((distance === undefined || distance === null) && centerLat && centerLng && staffLat && staffLng) {
        distance = getDistanceFromLatLonInM(centerLat, centerLng, staffLat, staffLng);
      }
      
      const locInfo = `Center: ${centerLat ? `${centerLat.toFixed(5)}, ${centerLng?.toFixed(5)}` : 'N/A'}<br/>Staff: ${staffLat ? `${staffLat.toFixed(5)}, ${staffLng?.toFixed(5)}` : 'N/A'}`;
      
      printWindow.document.write(`<tr>
        <td>${record['Date'] || record.date || ''}</td>
        <td>${record['Staff ID'] || ''}</td>        <td>${record['Staff Name'] || ''}</td>
        <td>${record['Center Name'] || ''}</td>
        <td>${record['Attendance Status'] || ''}</td>
        <td>${record['IN Time'] || ''}</td>
        <td>${record['OUT Time'] || ''}</td>
        <td>${distance !== null && distance !== undefined ? Math.round(distance) : 'N/A'}</td>
        <td>${locInfo}</td>
        <td>${record.syncStatus || 'Synced'}</td>
      </tr>`);
    });
    
    printWindow.document.write('</table></body></html>');
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };
  
  const exportExcel = () => { 
    const headers = ['Date', 'Staff ID', 'Staff Name', 'Center Code', 'Center Name', 'IN Time', 'OUT Time', 'OUT Type', 'Total Working Hours', 'Attendance Status', 'Location', 'Center Latitude', 'Center Longitude', 'Staff Latitude', 'Staff Longitude', 'Distance (m)', 'Geofence Radius (m)', 'GPS Accuracy (m)', 'Inside/Outside Geofence'];
    
    const filteredRecords = records.filter(r => !selectedCenter || r['Center Code'] === selectedCenter).filter(r => filterStatus === 'All' || r['Attendance Status'] === filterStatus);
    
    const rows = filteredRecords.map(record => {
      const center = centers.find(c => c.code === record['Center Code']);
      const centerLat = record['Official Center Latitude'] ?? center?.latitude ?? '';
      const centerLng = record['Official Center Longitude'] ?? center?.longitude ?? '';
      const staffLat = record['Current Latitude'] ?? record['Latitude'] ?? record['GPS Latitude'] ?? '';
      const staffLng = record['Current Longitude'] ?? record['Longitude'] ?? record['GPS Longitude'] ?? '';
      const radius = center?.geofenceRadius || 200;
      const accuracy = record['Accuracy'] ?? record['Current Accuracy'] ?? '';
      
      let distance = record['Distance from Center (m)'];
      if ((distance === undefined || distance === null) && centerLat && centerLng && staffLat && staffLng) {
        distance = getDistanceFromLatLonInM(centerLat, centerLng, staffLat, staffLng);
      }
      
      const isOutside = distance !== null && distance !== undefined ? distance > radius : false;
      const insideOutsideStr = distance !== null && distance !== undefined ? (isOutside ? 'Outside' : 'Inside') : '';

      return [
        record['Date'] || record.date || '',
        record['Staff ID'] || '',
        record['Staff Name'] || '',
        record['Center Code'] || '',
        record['Center Name'] || '',
        record['IN Time'] || '',
        record['OUT Time'] || '',
        record['OUT Type'] || (record['OUT Time'] ? 'Manual OUT' : ''),
        calculateWorkingHours(record['IN Time'], record['OUT Time']),
        record['Attendance Status'] || '',
        `"${(record['Full Address'] || '').replace(/"/g, '""')}"`,
        centerLat,
        centerLng,
        staffLat,
        staffLng,
        distance !== null && distance !== undefined ? Math.round(distance) : '',
        radius,
        accuracy !== null && accuracy !== '' ? Math.round(accuracy) : '',
        insideOutsideStr
      ].join(',');
    });
    
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(',') + "\n" + rows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `attendance_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
      
  return (
      <div className="flex flex-col min-h-screen bg-slate-50 items-center justify-center font-sans">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

    
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <div className="bg-emerald-700 text-white h-20 flex items-center px-6 shadow-md gap-4 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-bold tracking-tight uppercase">Attendance Report</h1>
          <p className="text-[10px] text-emerald-200 uppercase tracking-widest mt-0.5">Real-time Data</p>
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto pb-20">
        
        <div className="flex justify-end gap-2 mb-4">
          <button onClick={exportPDF} className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-sm"><Download size={14} /> PDF</button>
          <button onClick={exportExcel} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-sm"><Download size={14} /> Excel</button>
        </div>
        <div className="mb-6">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-1 block">Filter by Center</label>
          <select 
            value={selectedCenter} 
            onChange={(e) => setSelectedCenter(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-medium text-slate-700 shadow-sm"
          >
            <option value="">All Centers</option>
            {centers.length === 0 && (
              <option value="" disabled>No Active Center Available</option>
            )}
            {centers.map(center => (
              <option key={center.code} value={center.code}>{center.code} - {center.name}</option>
            ))}
                    </select>
        </div>

        <div className="mb-6">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Filter By Status</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-medium text-slate-700 shadow-sm"
          >
            <option value="All">All Attendance</option>
            <option value="Present">Inside Center (Present)</option>
            <option value="Outside Center">Outside Center</option>
            <option value="Late">Late</option>
            <option value="Half Day">Half Day</option>
            <option value="Official Duty">Official Duty</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-medium mb-6">
            {error}
          </div>
        )}

        {!error && records.filter(r => !selectedCenter || r['Center Code'] === selectedCenter).filter(r => filterStatus === 'All' || r['Attendance Status'] === filterStatus).length === 0 && (
          <div className="flex flex-col justify-center items-center py-20 opacity-70">
            <div className="w-16 h-16 bg-slate-200 text-slate-400 border border-slate-300 rounded-lg flex items-center justify-center mb-4">
              <FileBarChart size={32} />
            </div>
            <h2 className="text-base font-bold text-slate-600 uppercase tracking-wide">No Attendance Records Found.</h2>
          </div>
        )}

        {!error && records.filter(r => !selectedCenter || r['Center Code'] === selectedCenter).filter(r => filterStatus === 'All' || r['Attendance Status'] === filterStatus).length > 0 && (
          <div className="flex flex-col gap-4">
            {records.filter(r => !selectedCenter || r['Center Code'] === selectedCenter).filter(r => filterStatus === 'All' || r['Attendance Status'] === filterStatus).map((record) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={record.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4"
              >
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">{record['Staff Name'] || 'Unknown Staff'}</h3>
                    <p className="text-xs text-slate-500 font-medium">{record['Staff ID'] || 'N/A'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">{record['Center Code'] || 'N/A'}</p>
                    <p className="text-[10px] text-slate-500 uppercase">{record['Center Name'] || 'Unknown'}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded border ${record.syncStatus === 'Sync Failed' ? 'bg-red-50 text-red-600 border-red-200' : record.syncStatus === 'Offline Saved' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                    Sync Status: {record.syncStatus || 'Synced'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-emerald-600" />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Date</p>
                      <p className="font-medium text-slate-800">{record['Date'] || record.date || '--'}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-emerald-600" />
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">IN Time</p>
                        <p className="font-medium text-slate-800">{record['IN Time'] || '--:--'}</p>
                      </div>
                    </div>
                    {record['OUT Time'] && (
                      <div className="flex items-center gap-2 mt-1">
                        <Clock size={16} className="text-amber-600" />
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">OUT Time</p>
                          <p className="font-medium text-slate-800">{record['OUT Time']}</p>
                        </div>
                      </div>
                    )}
                    {record['IN Time'] && record['OUT Time'] && (
                      <div className="flex items-center gap-2 mt-1">
                        <Clock size={16} className="text-blue-600" />
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Total Working Hrs</p>
                          <p className="font-medium text-slate-800">{calculateWorkingHours(record['IN Time'], record['OUT Time'])}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  <span className={`text-[10px] self-start uppercase tracking-wider font-bold px-2 py-1 rounded border ${record.syncStatus === "Sync Failed" ? "bg-red-50 text-red-600 border-red-200" : record.syncStatus === "Offline Saved" ? "bg-amber-50 text-amber-600 border-amber-200" : "bg-emerald-50 text-emerald-600 border-emerald-200"}`}>
                    Sync Status: {record.syncStatus || "Synced"}
                  </span>
                  
                  <div className="flex gap-4 text-xs mt-1 border-t border-slate-100 pt-2">
                    <div><span className="font-bold text-slate-500">LAT:</span> {record['Current Latitude'] ?? record['Latitude'] ?? record['GPS Latitude'] ?? 'N/A'}</div>
                    <div><span className="font-bold text-slate-500">LNG:</span> {record['Current Longitude'] ?? record['Longitude'] ?? record['GPS Longitude'] ?? 'N/A'}</div>
                  </div>
                </div>

                {record["Full Address"] && (
                  <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100 mt-2">
                    <MapPin size={16} className="text-blue-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Location</p>
                      <p className="text-xs text-slate-700 leading-snug line-clamp-2">{record['Full Address']}</p>
                      
                    </div>
                  </div>
                )}
                
                {record['Selfie Image URL'] && (
                  <div className="mt-2 flex flex-col gap-2">
                     <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Selfie (IN)</p>
                     <div className="flex items-center gap-4">
                       <a href={record['Selfie Image URL']} target="_blank" rel="noopener noreferrer" className="shrink-0"><img loading="lazy" src={record['Selfie Image URL']} alt="Selfie IN" className="w-20 h-20 object-cover rounded-lg border border-slate-200 hover:opacity-80 transition-opacity cursor-pointer" /></a>
                       <div className="flex flex-col gap-2">
                         <a href={record['Selfie Image URL']} target="_blank" rel="noopener noreferrer" className="bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1.5 rounded text-xs font-bold uppercase hover:bg-blue-100 text-center">View Selfie</a>
                         <button onClick={() => handleDeleteSelfie(record.id, 'IN', record['Selfie Image URL'])} className="bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded text-xs font-bold uppercase hover:bg-red-100">Delete Selfie</button>
                       </div>
                     </div>
                  </div>
                )}
                
                {record['OUT Selfie Image URL'] && (
                  <div className="mt-2 flex flex-col gap-2">
                     <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Selfie (OUT)</p>
                     <div className="flex items-center gap-4">
                       <a href={record['OUT Selfie Image URL']} target="_blank" rel="noopener noreferrer" className="shrink-0"><img loading="lazy" src={record['OUT Selfie Image URL']} alt="Selfie OUT" className="w-20 h-20 object-cover rounded-lg border border-slate-200 hover:opacity-80 transition-opacity cursor-pointer" /></a>
                       <div className="flex flex-col gap-2">
                         <a href={record['OUT Selfie Image URL']} target="_blank" rel="noopener noreferrer" className="bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1.5 rounded text-xs font-bold uppercase hover:bg-blue-100 text-center">View Selfie</a>
                         <button onClick={() => handleDeleteSelfie(record.id, 'OUT', record['OUT Selfie Image URL'])} className="bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded text-xs font-bold uppercase hover:bg-red-100">Delete Selfie</button>
                       </div>
                     </div>
                  </div>
                )}
                
                {record['Test Attendance'] && (
                   <div className="bg-amber-50 text-amber-600 px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider self-start border border-amber-100">
                     Test Attendance
                   </div>
                )}
                
                {(() => {
                  const center = centers.find(c => c.code === record['Center Code']);
                  const centerLat = record['Official Center Latitude'] ?? center?.latitude;
                  const centerLng = record['Official Center Longitude'] ?? center?.longitude;
                  const staffLat = record['Current Latitude'] ?? record['Latitude'] ?? record['GPS Latitude'];
                  const staffLng = record['Current Longitude'] ?? record['Longitude'] ?? record['GPS Longitude'];
                  const radius = center?.geofenceRadius || 200;
                  const accuracy = record['Accuracy'] ?? record['Current Accuracy'];
                  
                  let distance = record['Distance from Center (m)'];
                  if ((distance === undefined || distance === null) && centerLat && centerLng && staffLat && staffLng) {
                    distance = getDistanceFromLatLonInM(centerLat, centerLng, staffLat, staffLng);
                  }
                  
                  const isOutside = distance !== null && distance !== undefined ? distance > radius : false;
                  
                  return (
                    <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col gap-2">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 pb-1 mb-1">Location Information</h4>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase font-bold">Center</span>
                          <span className="text-slate-700 font-medium truncate block">{record['Center Name'] || center?.name || 'Unknown'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase font-bold">Distance</span>
                          <span className="text-slate-700 font-medium">{distance !== undefined && distance !== null ? `${Math.round(distance)}m` : 'N/A'}</span>
                        </div>
                        
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase font-bold">Center Coords</span>
                          <span className="text-slate-700 font-medium truncate block">{centerLat ? `${centerLat.toFixed(5)}, ${centerLng?.toFixed(5)}` : 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase font-bold">Staff Coords</span>
                          <span className="text-slate-700 font-medium truncate block">{staffLat ? `${staffLat.toFixed(5)}, ${staffLng?.toFixed(5)}` : 'N/A'}</span>
                        </div>
                        
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase font-bold">Geofence Radius</span>
                          <span className="text-slate-700 font-medium">{radius}m</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase font-bold">GPS Accuracy</span>
                          <span className="text-slate-700 font-medium">{accuracy ? `${Math.round(accuracy)}m` : 'N/A'}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200">
                         <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${isOutside ? 'bg-red-50 text-red-600 border-red-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                           {isOutside ? 'Outside Geofence' : 'Inside Geofence'}
                         </span>
                         
                         <div className="flex gap-2">
                           
                           
                         </div>
                      </div>
                    </div>
                  );
                })()}

              <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Status:
                  </div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${record['Attendance Status'] === 'Outside Center' ? 'bg-red-50 text-red-600 border-red-200' : record['Attendance Status'] === 'Official Duty' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                    {record['Attendance Status'] || 'Present'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
