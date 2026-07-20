import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, CheckCircle2, XCircle, Clock, Calendar, AlertTriangle } from 'lucide-react';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { validateRequestApproval } from '../utils/validationHelpers';
import { motion } from 'motion/react';
import { useActiveCenters } from '../hooks/useActiveCenters';

export default function AdminOfficialDutyScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { centers } = useActiveCenters();
  const [selectedCenter, setSelectedCenter] = useState<string>(location.state?.centerCode || '');
  const [statusFilter, setStatusFilter] = useState<'Pending Approval' | 'Approved' | 'Rejected' | 'Info Requested'>('Pending Approval');

  useEffect(() => {
    const q = query(
      collection(db, 'official_duty_requests'),
      where('Status', '==', statusFilter)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: any[] = [];
      snapshot.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() });
      });
      // Sort in memory by timestamp descending as composite index might not exist
      data.sort((a, b) => {
         const timeA = a.timestamp?.toMillis ? a.timestamp.toMillis() : 0;
         const timeB = b.timestamp?.toMillis ? b.timestamp.toMillis() : 0;
         return timeB - timeA;
      });
      setRequests(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [statusFilter]);

  const handleAction = async (req: any, action: 'Approved' | 'Rejected' | 'Info Requested') => {
    if (action === 'Approved') {
      const validation = await validateRequestApproval(
        req.staffUid,
        req.Date,
        req.Date,
        'Official Duty',
        req.id
      );
      if (!validation.valid) {
        alert(validation.message);
        return;
      }
    }
    try {
      // 1. Update the request status
      await updateDoc(doc(db, 'official_duty_requests', req.id), {
        Status: action,
        'Approved By': 'Admin',
        'Approval Time': new Date().toISOString()
      });

      // 2. Create an Attendance record
      const attendanceStatus = action === 'Approved' ? 'Official Duty' : action === 'Info Requested' ? 'Info Requested' : 'Rejected';
      if (action === 'Approved' || action === 'Rejected') {
        const newAttendance = {
          staffUid: req.staffUid,
          'Staff ID': req['Staff ID'],
          'Staff Name': req['Staff Name'],
          'Center ID': req['Center ID'] || '',
          'Center Code': req['Center Code'],
          'Center Name': req['Center Name'],
          'Date': req['Date'],
          date: req['Date'],
          'IN Time': req['Time'],
          'Attendance Status': attendanceStatus,
          'Duty Type': req['Duty Type'],
          'Reason': req['Reason'],
          'Latitude': req['GPS Latitude'],
          'Longitude': req['GPS Longitude'],
          
          'Selfie URL': req['Photo'] || '',
          timestamp: req.timestamp || new Date()
        };
        await addDoc(collection(db, 'attendance'), newAttendance);
      }

    } catch (err) {
      console.error(err);
      console.log("Failed to update status.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 items-center justify-center font-sans">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <div className="bg-red-700 text-white h-20 flex items-center px-6 shadow-md gap-4 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-bold tracking-tight uppercase">Official Duty</h1>
          <p className="text-[10px] text-red-200 uppercase tracking-widest mt-0.5">{requests.length} {statusFilter} Requests</p>
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto pb-20">
        
        <div className="flex bg-white rounded-lg p-1 shadow-sm border border-slate-200 mb-4 text-xs font-bold uppercase tracking-wider">
          <button 
            onClick={() => setStatusFilter('Pending Approval')}
            className={`flex-1 py-2.5 rounded-md transition-colors ${statusFilter === 'Pending Approval' ? 'bg-amber-100 text-amber-700' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setStatusFilter('Approved')}
            className={`flex-1 py-2.5 rounded-md transition-colors ${statusFilter === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Approved
          </button>
          <button 
            onClick={() => setStatusFilter('Rejected')}
            className={`flex-1 py-2.5 rounded-md transition-colors ${statusFilter === 'Rejected' ? 'bg-red-100 text-red-700' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Rejected
          </button>
          <button 
            onClick={() => setStatusFilter('Info Requested')}
            className={`flex-1 py-2.5 rounded-md transition-colors ${statusFilter === 'Info Requested' ? 'bg-amber-100 text-amber-700' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Info Req
          </button>
        </div>
        <div className="mb-6">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-1 block">Filter by Center</label>
          <select 
            value={selectedCenter} 
            onChange={(e) => setSelectedCenter(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-sm font-medium text-slate-700 shadow-sm"
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

        {requests.filter(r => !selectedCenter || r['Center Code'] === selectedCenter).length === 0 ? (
          <div className="flex flex-col justify-center items-center py-20 opacity-70">
            <div className="w-16 h-16 bg-slate-200 text-slate-400 border border-slate-300 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-base font-bold text-slate-600 uppercase tracking-wide">No {statusFilter} Requests</h2>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {requests.filter(r => !selectedCenter || r['Center Code'] === selectedCenter).map(req => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={req.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4"
              >
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">{req['Staff Name']}</h3>
                    <p className="text-xs text-slate-500 font-medium">{req['Staff ID']} • {req['Center Name']}</p>
                  </div>
                  <div className="bg-amber-50 text-amber-600 px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider border border-amber-100">
                    {req['Status']}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
                   <div className="flex flex-col gap-1">
                     <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Date & Time</p>
                     <p className="font-medium text-slate-800">{req.Date} • {req['Time']}</p>
                   </div>
                   <div className="flex flex-col gap-1">
                     <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Duty Type</p>
                     <p className="font-medium text-slate-800">{req['Duty Type']}</p>
                   </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Reason</p>
                    <p className="text-sm text-slate-800 font-medium">{req['Reason']}</p>
                  </div>
                  {req['Remarks'] && (
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Remarks</p>
                    <p className="text-xs text-slate-500 italic">{req['Remarks']}</p>
                  </div>
                  )}
                  
                  

                  {req['Photo'] && (
                    <div className="mt-2">
                       <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Supporting Photo</p>
                       <img loading="lazy" src={req['Photo']} alt="OD Photo" className="w-20 h-20 object-cover rounded-lg border border-slate-200" />
                    </div>
                  )}
                </div>

                {statusFilter === 'Pending Approval' && (
                  <div className="flex gap-3 pt-3 border-t border-slate-100">
                  <button 
                    onClick={() => handleAction(req, 'Info Requested')}
                    className="flex-1 py-2.5 rounded-lg border border-amber-200 text-amber-600 hover:bg-amber-50 font-bold uppercase tracking-wide text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <AlertTriangle size={16} /> Request Info
                  </button>
                  <button 
                    onClick={() => handleAction(req, 'Rejected')}
                    className="flex-1 py-2.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-bold uppercase tracking-wide text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <XCircle size={16} /> Reject
                  </button>
                  <button 
                    onClick={() => handleAction(req, 'Approved')}
                    className="flex-1 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-bold uppercase tracking-wide text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 size={16} /> Approve
                  </button>
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
