import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle, MapPin, Map, User, Clock, FileText, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminOutsideAlertsScreen() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState<any | null>(null);
  
  const [remarks, setRemarks] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [showODForm, setShowODForm] = useState(false);
  const [odDetails, setOdDetails] = useState({ reason: '', location: '', startTime: '', endTime: '' });

  useEffect(() => {
    const q = query(collection(db, 'outside_center_attendance'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const alertList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAlerts(alertList);
      setLoading(false);
      
      // Update selected alert if it's currently open
      if (selectedAlert) {
        const updatedAlert = alertList.find(a => a.id === selectedAlert.id);
        if (updatedAlert) setSelectedAlert(updatedAlert);
      }
    });

    return () => unsubscribe();
  }, [selectedAlert]);

  const handleAction = async (status: string) => {
    if (!selectedAlert) return;
    setActionLoading(true);
    try {
      const updatePayload: any = {
        Status: status,
        AdminRemarks: remarks,
        ReviewedAt: new Date().toISOString()
      };
      
      if (status === 'Official Duty') {
        updatePayload['OD Reason'] = odDetails.reason;
        updatePayload['OD Location'] = odDetails.location;
        updatePayload['OD Start Time'] = odDetails.startTime;
        updatePayload['OD End Time'] = odDetails.endTime;
      }
      
      await updateDoc(doc(db, 'outside_center_attendance', selectedAlert.id), updatePayload);
      
      // Also update the main attendance record
      if (selectedAlert.attendanceDocId) {
        const attendanceUpdate: any = {
          'Outside Alert Status': status,
          'Outside Alert Remarks': remarks
        };
        if (status === 'Official Duty') {
          attendanceUpdate['Attendance Status'] = 'Official Duty';
        }
        await updateDoc(doc(db, 'attendance', selectedAlert.attendanceDocId), attendanceUpdate);
      }
      
      setSelectedAlert(null);
      setRemarks('');
    } catch (error) {
      console.error("Error updating alert:", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Pending Review': return 'bg-red-100 text-red-700 border-red-200';
      case 'Approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Rejected': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Official Duty': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <div className="bg-red-700 text-white p-4 shadow-md flex items-center gap-3 relative z-10">
        <button onClick={() => navigate('/admin-dashboard')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold">Outside Alerts</h1>
          <p className="text-xs text-red-200">Smart Attendance Monitoring</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
           <div className="flex justify-center p-8">
             <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
           </div>
        ) : alerts.length === 0 ? (
           <div className="text-center p-12 text-slate-400">
             <AlertTriangle size={48} className="mx-auto mb-4 opacity-50" />
             <p className="font-medium text-sm">No outside center alerts found</p>
           </div>
        ) : (
          alerts.map(alert => (
            <div 
              key={alert.id}
              onClick={() => setSelectedAlert(alert)}
              className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
            >
              {alert.Status === 'Pending Review' && (
                <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
              )}
              
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden">
                    {alert['Selfie URL'] ? (
                       <img loading="lazy" src={alert['Selfie URL']} alt="Selfie" className="w-full h-full object-cover" />
                    ) : (
                       <User size={16} className="text-slate-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 leading-tight">{alert['Staff Name']}</h3>
                    <p className="text-[10px] text-slate-500">{alert['Role']} • {alert['Staff ID']}</p>
                  </div>
                </div>
                <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${getStatusColor(alert.Status)}`}>
                  {alert.Status}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                 <div className="bg-slate-50 p-2 rounded border border-slate-100">
                   <div className="text-[10px] text-slate-500 uppercase tracking-wide font-bold mb-0.5">Center</div>
                   <div className="font-medium text-slate-700 truncate">{alert['Center Name']}</div>
                 </div>
                 <div className="bg-red-50 p-2 rounded border border-red-100">
                   <div className="text-[10px] text-red-500 uppercase tracking-wide font-bold mb-0.5">Distance</div>
                   <div className="font-bold text-red-700">{alert['Distance from Center (m)']} meters</div>
                 </div>
                 <div className="bg-slate-50 p-2 rounded border border-slate-100 col-span-2 flex items-center justify-between">
                   <div className="flex items-center gap-1.5 text-slate-600">
                     <Clock size={12} />
                     <span className="font-medium">{alert.Date} • {alert.Time}</span>
                   </div>
                   <ChevronRight size={14} className="text-slate-400" />
                 </div>
              </div>
            </div>
          ))
        )}
      </div>

      <AnimatePresence>
        {selectedAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex flex-col justify-end"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white rounded-t-2xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-slate-800">Alert Details</h2>
                  <p className="text-xs text-slate-500">ID: {selectedAlert.id}</p>
                </div>
                <button 
                  onClick={() => { setSelectedAlert(null); setRemarks(''); }}
                  className="p-2 bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200"
                >
                  <XCircle size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                 {/* Status Banner */}
                 <div className={`p-3 rounded-lg border flex items-center justify-between ${getStatusColor(selectedAlert.Status)}`}>
                   <span className="text-xs font-bold uppercase tracking-widest">Current Status</span>
                   <span className="text-sm font-black">{selectedAlert.Status}</span>
                 </div>
                 
                 {/* Staff Info */}
                 <section>
                   <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Staff Information</h3>
                   <div className="flex gap-4 items-center">
                     <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                       {selectedAlert['Selfie URL'] ? (
                         <a href={selectedAlert['Selfie URL']} target="_blank" rel="noopener noreferrer"><img loading="lazy" src={selectedAlert['Selfie URL']} alt="Selfie" className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer" /></a>
                       ) : (
                         <div className="w-full h-full flex items-center justify-center text-slate-400">
                           <User size={24} />
                         </div>
                       )}
                     </div>
                     <div>
                       <h4 className="text-base font-bold text-slate-800 leading-tight">{selectedAlert['Staff Name']}</h4>
                       <p className="text-sm text-slate-600 font-medium">{selectedAlert['Role']}</p>
                       <p className="text-xs text-slate-500 mt-1">ID: {selectedAlert['Staff ID']}</p>
                     </div>
                   </div>
                 </section>

                 {/* Location Details */}
                 <section>
                   <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Location & Time</h3>
                   <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
                     <div className="flex items-start gap-3">
                       <MapPin size={16} className="text-red-500 shrink-0 mt-0.5" />
                       <div>
                         <div className="text-xs font-bold text-slate-800">Detected Location</div>
                         <div className="text-xs text-slate-600 mt-1 leading-relaxed">{selectedAlert['Current Address']}</div>
                       </div>
                     </div>
                     <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                       <Map size={16} className="text-blue-500 shrink-0 mt-0.5" />
                       <div>
                         <div className="text-xs font-bold text-slate-800">Assigned Center</div>
                         <div className="text-xs text-slate-600 mt-1 leading-relaxed">{selectedAlert['Center Name']} ({selectedAlert['Center Code']})</div>
                       </div>
                     </div>
                     <div className="flex items-center gap-3 pt-3 border-t border-slate-200 text-xs font-bold">
                       <div className="text-red-600 bg-red-50 px-2 py-1 rounded">Distance: {selectedAlert['Distance from Center (m)']}m</div>
                       <div className="text-slate-600 bg-slate-100 px-2 py-1 rounded">{selectedAlert.Date} {selectedAlert.Time}</div>
                     </div>
                   </div>
                 </section>
                 
                 {/* Map Preview */}
                 <div className="w-full h-40 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden relative">
                   <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-500 gap-2 p-4 text-center">
    <MapPin size={24} />
    <span className="text-xs font-medium">Map Preview Disabled</span>
    <span className="text-[10px]">
       Lat: {selectedAlert['Current Latitude']?.toFixed(5) || 'N/A'}<br/>
       Lng: {selectedAlert['Current Longitude']?.toFixed(5) || 'N/A'}
    </span>
  </div>
                 </div>
                 
                 {/* Device Info */}
                 <div className="flex items-center gap-2 text-[10px] text-slate-400 bg-slate-50 p-2 rounded">
                   <FileText size={12} />
                   <span className="truncate">Device ID: {selectedAlert['Device Information']}</span>
                 </div>
                 
                 {/* Admin Action Area */}
                 {selectedAlert.Status === 'Pending Review' && showODForm && (
                   <div className="pt-4 border-t border-slate-100 space-y-4 pb-8">
                     <h3 className="text-xs font-bold text-purple-700 uppercase tracking-widest">Official Duty Details</h3>
                     <div className="grid grid-cols-1 gap-3 text-sm">
                       <input type="text" placeholder="Duty Reason (e.g., Student Mobilization)" value={odDetails.reason} onChange={e => setOdDetails(prev => ({...prev, reason: e.target.value}))} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-purple-500" />
                       <input type="text" placeholder="Duty Location" value={odDetails.location} onChange={e => setOdDetails(prev => ({...prev, location: e.target.value}))} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-purple-500" />
                       <div className="grid grid-cols-2 gap-3">
                         <input type="time" value={odDetails.startTime} onChange={e => setOdDetails(prev => ({...prev, startTime: e.target.value}))} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-purple-500" />
                         <input type="time" value={odDetails.endTime} onChange={e => setOdDetails(prev => ({...prev, endTime: e.target.value}))} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-purple-500" />
                       </div>
                       <textarea
                         value={remarks}
                         onChange={(e) => setRemarks(e.target.value)}
                         className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-purple-500 min-h-[80px]"
                         placeholder="Approval Remarks (Optional)"
                       ></textarea>
                     </div>
                     <div className="flex gap-3">
                       <button onClick={() => setShowODForm(false)} className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3.5 rounded-lg text-sm uppercase tracking-wider transition-colors">Cancel</button>
                       <button onClick={() => setShowODForm(true)} disabled={actionLoading || !odDetails.reason} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-lg text-sm uppercase tracking-wider transition-colors disabled:opacity-50">Confirm OD</button>
                     </div>
                   </div>
                 )}
                 {selectedAlert.Status === 'Pending Review' && !showODForm && (
                   <div className="pt-4 border-t border-slate-100 space-y-4 pb-8">
                     <div>
                       <label className="block text-xs font-bold text-slate-700 mb-2">Admin Remarks (Optional)</label>
                       <textarea
                         value={remarks}
                         onChange={(e) => setRemarks(e.target.value)}
                         className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all min-h-[80px]"
                         placeholder="Enter reason for approval or rejection..."
                       ></textarea>
                     </div>
                     
                     <div className="grid grid-cols-1 gap-3">
                       <button 
                         onClick={() => handleAction('Approved')}
                         disabled={actionLoading}
                         className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-lg text-sm uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50"
                       >
                         Approve Attendance
                       </button>
                       <button 
                         onClick={() => handleAction('Official Duty')}
                         disabled={actionLoading}
                         className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-lg text-sm uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50"
                       >
                         Mark as Official Duty
                       </button>
                       <button 
                         onClick={() => handleAction('Explanation Requested')}
                         disabled={actionLoading}
                         className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-lg text-sm uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50"
                       >
                         Request Explanation
                       </button>
                       <button 
                         onClick={() => handleAction('Rejected')}
                         disabled={actionLoading}
                         className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3.5 rounded-lg text-sm uppercase tracking-wider transition-colors disabled:opacity-50"
                       >
                         Reject Attendance
                       </button>
                     </div>
                   </div>
                 )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
