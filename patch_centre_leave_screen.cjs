const fs = require('fs');
let code = fs.readFileSync('src/components/CentreLeaveScreen.tsx', 'utf8');

const newComponentCode = `import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Clock, Calendar, AlertCircle, FileText, Plus } from 'lucide-react';
import { collection, query, where, getDocs, doc, serverTimestamp, addDoc, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';

export default function CentreLeaveScreen() {
  const navigate = useNavigate();
  const { centerId } = useParams();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [centerName, setCenterName] = useState('');
  const [centerCode, setCenterCode] = useState('');
  
  const [statusFilter, setStatusFilter] = useState('Pending');
  
  // New Request State
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [staffList, setStaffList] = useState<any[]>([]);
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [leaveType, setLeaveType] = useState('Casual Leave (CL)');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (!centerId) {
      navigate('/centre-login');
      return;
    }
    
    // Get Center Name
    const getCenter = async () => {
      const centerDoc = await getDoc(doc(db, 'centers', centerId));
      if (centerDoc.exists()) {
        setCenterName(centerDoc.data().name);
        setCenterCode(centerDoc.data().code);
      }
      
      // Get Staff List for this center
      const staffSnap = await getDocs(query(collection(db, 'staff'), where('centerId', '==', centerId)));
      const staffData: any[] = [];
      staffSnap.forEach(s => staffData.push({ id: s.id, ...s.data() }));
      setStaffList(staffData);
    };
    getCenter();

    // Query Leave requests for this center
    const q = query(
      collection(db, 'leaves'),
      where('centerId', '==', centerId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: any[] = [];
      snapshot.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() });
      });
      data.sort((a, b) => {
         const timeA = a.timestamp?.toMillis ? a.timestamp.toMillis() : 0;
         const timeB = b.timestamp?.toMillis ? b.timestamp.toMillis() : 0;
         return timeB - timeA;
      });
      setRequests(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [centerId, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaffId || !fromDate || !toDate || !reason) return alert('Please fill all fields');
    
    setSubmitting(true);
    try {
      const staff = staffList.find(s => s.id === selectedStaffId);
      
      const newRequest = {
        staffUid: staff.id,
        staffId: staff.staffId || '',
        staffName: staff.name || '',
        centerId: centerId,
        centerCode: centerCode,
        centerName: centerName,
        fromDate,
        toDate,
        leaveType,
        reason,
        status: 'Pending Approval',
        'Request Date & Time': new Date().toISOString(),
        timestamp: serverTimestamp()
      };
      
      await addDoc(collection(db, 'leaves'), newRequest);
      
      setShowForm(false);
      setSelectedStaffId('');
      setFromDate('');
      setToDate('');
      setReason('');
    } catch (err) {
      console.error(err);
      alert('Failed to submit request');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredRequests = requests.filter(r => {
    const normalizedStatus = (r.status || '').includes('Pending') ? 'Pending' : r.status;
    return normalizedStatus === statusFilter;
  });

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 items-center justify-center font-sans">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <div className="bg-blue-900 text-white h-20 flex items-center px-6 shadow-md gap-4 z-10 shrink-0">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase truncate">Leave Requests</h1>
          <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5 truncate">{centerName}</p>
        </div>
        <button onClick={() => setShowForm(true)} className="p-2 bg-blue-700 hover:bg-blue-600 rounded-full transition-colors">
          <Plus size={20} />
        </button>
      </div>

      <div className="bg-white px-4 py-3 shadow-sm z-20 flex gap-2 overflow-x-auto border-b border-slate-200 hide-scrollbar shrink-0">
        {['Pending', 'Approved', 'Rejected'].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={\`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all \${
              statusFilter === status 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }\`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {filteredRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <FileText size={48} className="mb-4 opacity-20" />
            <p className="font-medium text-sm uppercase tracking-widest">No requests found</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <AnimatePresence>
              {filteredRequests.map(req => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">{req.staffName}</h3>
                      <p className="text-xs text-slate-500 font-medium">{req.staffId} • {req.leaveType}</p>
                    </div>
                    <div className={\`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest \${
                      (req.status || '').includes('Pending') ? 'bg-amber-100 text-amber-700' :
                      req.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }\`}>
                      {(req.status || '').includes('Pending') ? 'Pending' : req.status}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg mb-3">
                    <Calendar size={16} className="text-blue-500 shrink-0" />
                    <span className="font-medium truncate">{req.fromDate} to {req.toDate}</span>
                  </div>

                  <div className="bg-amber-50 text-amber-800 p-3 rounded-lg text-sm">
                    <span className="font-bold uppercase tracking-wider text-[10px] block mb-1">Reason</span>
                    {req.reason}
                  </div>
                  
                  {req['Admin Remarks'] && (
                    <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm mt-3 border border-blue-100">
                      <span className="font-bold uppercase tracking-wider text-[10px] block mb-1">Admin Remarks</span>
                      {req['Admin Remarks']}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
      
      {/* Create Request Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex flex-col justify-end sm:justify-center sm:items-center">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="bg-blue-900 p-4 flex items-center justify-between text-white shrink-0">
                <h3 className="font-bold uppercase tracking-wide text-sm">New Leave Request</h3>
                <button onClick={() => setShowForm(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                  <XCircle size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex-1 flex flex-col gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Select Staff</label>
                  <select 
                    value={selectedStaffId}
                    onChange={e => setSelectedStaffId(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  >
                    <option value="">-- Select Staff --</option>
                    {staffList.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.staffId})</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Leave Type</label>
                  <select 
                    value={leaveType}
                    onChange={e => setLeaveType(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Casual Leave (CL)">Casual Leave (CL)</option>
                    <option value="Sick Leave (SL)">Sick Leave (SL)</option>
                    <option value="Earned Leave (EL)">Earned Leave (EL)</option>
                    <option value="Half Day">Half Day</option>
                    <option value="Leave Without Pay (LWP)">Leave Without Pay (LWP)</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">From Date</label>
                    <input 
                      type="date" 
                      value={fromDate}
                      onChange={e => setFromDate(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">To Date</label>
                    <input 
                      type="date" 
                      value={toDate}
                      onChange={e => setToDate(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Reason / Purpose</label>
                  <textarea 
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    placeholder="Briefly describe the reason for leave..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none h-20"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-lg shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-2 text-sm uppercase tracking-wider"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <><CheckCircle2 size={18} /> Submit Request</>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
`;

fs.writeFileSync('src/components/CentreLeaveScreen.tsx', newComponentCode);
console.log("CentreLeaveScreen Patched successfully");
