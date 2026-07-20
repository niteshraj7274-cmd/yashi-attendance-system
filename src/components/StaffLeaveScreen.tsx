import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Calendar, FileText, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';
import { collection, query, where, getDocs, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { compressImage, dataUrlToFile } from '../utils/imageCompression';
import { uploadWithRetry } from '../utils/uploadHelpers';
import { db, storage } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';


function CustomDropdown({ value, onChange, options, placeholder }: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium flex justify-between items-center cursor-pointer"
      >
        <span className={value ? "text-slate-900" : "text-slate-400"}>
          {value ? options.find((o: any) => o.value === value)?.label || value : placeholder}
        </span>
        <div className="text-slate-400 font-bold ml-2">{isOpen ? '▲' : '▼'}</div>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-2xl max-h-56 overflow-y-auto">
          {options.map((opt: any) => (
            <div 
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className="p-3 text-sm hover:bg-blue-50 active:bg-blue-100 cursor-pointer border-b border-slate-50 last:border-0 font-medium text-slate-800"
            >
              {opt.label}
            </div>
          ))}
          {options.length === 0 && <div className="p-3 text-sm text-slate-500">No options available</div>}
        </div>
      )}
    </div>
  );
}

export default function StaffLeaveScreen() {
  const navigate = useNavigate();
  const [staffData, setStaffData] = useState<any>(null);
  const [leaves, setLeaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [leaveType, setLeaveType] = useState('Casual Leave (CL)');
  const [leaveTypesList, setLeaveTypesList] = useState<string[]>([
    'Casual Leave (CL)',
    'Sick Leave (SL)',
    'Earned Leave (EL)',
    'Half Day Leave',
    'Emergency Leave',
    'Maternity Leave',
    'Paternity Leave',
    'Leave Without Pay (LWP)',
    'Other'
  ]);
  const [otherLeaveType, setOtherLeaveType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);

  // Leave balances
  const leaveLimits = {
    'Casual Leave (CL)': 12,
    'Sick Leave (SL)': 12,
  };
  
  const [balances, setBalances] = useState({
    cl: leaveLimits['Casual Leave (CL)'],
    sl: leaveLimits['Sick Leave (SL)'],
    elTaken: 0,
    halfDay: 0,
    lwp: 0
  });

  useEffect(() => {
    const sessionStr = localStorage.getItem('userSession');
    if (!sessionStr) {
      navigate('/centre-login');
      return;
    }
    const session = JSON.parse(sessionStr);
    if (session.role !== 'staff') {
      navigate('/centre-login');
      return;
    }
    setStaffData(session);
    fetchLeaves(session);
  }, [navigate]);

  const fetchLeaves = async (session: any) => {
    try {
      const q = query(
        collection(db, 'leaves'),
        where('staffId', '==', session.staffId),
        orderBy('timestamp', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const leaveData: any[] = [];
      let clUsed = 0;
      let slUsed = 0;
      let elTaken = 0;
      let halfDay = 0;
      let lwp = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        leaveData.push({ id: doc.id, ...data });
        if (data.status === 'Approved') {
          if (data.leaveType === 'Casual Leave (CL)') clUsed += data.days;
          else if (data.leaveType === 'Sick Leave (SL)') slUsed += data.days;
          else if (data.leaveType === 'Emergency Leave') elTaken += data.days;
          else if (data.leaveType === 'Half Day Leave') halfDay += data.days;
          else if (data.leaveType === 'Without Pay Leave (LWP)') lwp += data.days;
        }
      });
      setLeaves(leaveData);
      setBalances({
        cl: leaveLimits['Casual Leave (CL)'] - clUsed,
        sl: leaveLimits['Sick Leave (SL)'] - slUsed,
        elTaken,
        halfDay,
        lwp
      });
    } catch (error) {
      console.error("Error fetching leaves:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDays = (start: string, end: string, type: string) => {
    if (!start || !end) return 0;
    if (type === 'Half Day Leave') return 0.5;
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = Math.abs(e.getTime() - s.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        try {
          const compressedDataUrl = await compressImage(file, 20, 30, 0.6, 1000);
          const compressedFile = dataUrlToFile(compressedDataUrl, file.name);
          setAttachment(compressedFile);
        } catch (err) {
          console.error("Compression error:", err);
          setAttachment(file);
        }
      } else {
        setAttachment(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromDate || !toDate || !reason) {
      alert("Please fill all required fields.");
      return;
    }
    const days = calculateDays(fromDate, toDate, leaveType);
    if (days < 0) {
      alert("Invalid date range.");
      return;
    }
    
    setSubmitting(true);
    try {
      let attachmentUrl = '';
      if (attachment) {
        try {
          console.log("Firebase config bucket:", storage.app.options.storageBucket);
          const fileRef = ref(storage, `leaves/${staffData.staffId}/${Date.now()}_${attachment.name}`);
          console.log("Attempting to upload to Storage path:", fileRef.fullPath);
          attachmentUrl = await uploadWithRetry(async () => {
            await uploadBytes(fileRef, attachment);
            return await getDownloadURL(fileRef);
          });
          console.log("Storage upload successful. URL:", attachmentUrl);
        } catch (e: any) {
          console.error("Storage upload failed in leave request. Error details:", e);
          console.error("Error code:", e?.code);
          console.error("Error message:", e?.message);
          console.log("Falling back to save base64 to Firestore (max 800KB)");
          
          if (attachment.size > 800 * 1024) {
             alert("File is too large and Storage upload failed. Please upload a file smaller than 800KB.");
             setSubmitting(false);
             return;
          }
          attachmentUrl = await new Promise((resolve, reject) => {
             const reader = new FileReader();
             reader.onloadend = () => resolve(reader.result as string);
             reader.onerror = reject;
             reader.readAsDataURL(attachment);
          }) as string;
        }
      }

      await addDoc(collection(db, 'leaves'), {
        staffId: staffData.staffId || '',
        staffName: staffData.name || '',
        centerId: staffData.centerId || '',
        centerCode: staffData.centerCode || '',
        centerName: staffData.centerName || '',
        role: staffData.designation || '',
        leaveType: leaveType === 'Other' ? otherLeaveType : leaveType,
        fromDate,
        toDate,
        days,
        reason,
        attachment: attachmentUrl,
        emergencyContact,
        status: 'Pending Approval',
        timestamp: serverTimestamp()
      });

      // Notification
      await addDoc(collection(db, 'notifications'), {
        targetRole: 'center',
        centerId: staffData.centerId || '',
        title: 'New Leave Request',
        message: `${staffData.name || 'Staff'} has requested ${days} day(s) of ${leaveType}.`,
        timestamp: serverTimestamp(),
        read: false
      });

      alert("Leave request submitted successfully.");
      setShowForm(false);
      setFromDate('');
      setToDate('');
      setReason('');
      setOtherLeaveType('');
      setAttachment(null);
      setEmergencyContact('');
      fetchLeaves(staffData);
    } catch (error) {
      console.error("Error submitting leave:", error);
      alert("Failed to submit leave request.");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Approved': return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'Rejected': return <XCircle size={16} className="text-red-500" />;
      case 'Cancelled': return <AlertCircle size={16} className="text-gray-500" />;
      default: return <Clock size={16} className="text-amber-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 items-center justify-center font-sans">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <div className="bg-blue-700 text-white h-20 flex items-center px-6 shadow-md gap-4 z-10 shrink-0">
        <button onClick={() => navigate('/staff-dashboard')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase">Leave Management</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {/* Balances */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 border-b border-slate-100 pb-2">Leave Balances</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex flex-col">
              <span className="text-[10px] font-bold text-blue-600 uppercase">Casual Leave</span>
              <span className="text-lg font-bold text-slate-800">{balances.cl} <span className="text-xs text-slate-500 font-normal lowercase">remaining</span></span>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 flex flex-col">
              <span className="text-[10px] font-bold text-emerald-600 uppercase">Sick Leave</span>
              <span className="text-lg font-bold text-slate-800">{balances.sl} <span className="text-xs text-slate-500 font-normal lowercase">remaining</span></span>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 flex flex-col">
              <span className="text-[10px] font-bold text-amber-600 uppercase">Emergency Leave</span>
              <span className="text-lg font-bold text-slate-800">{balances.elTaken} <span className="text-xs text-slate-500 font-normal lowercase">taken</span></span>
            </div>
            <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 flex flex-col">
              <span className="text-[10px] font-bold text-slate-600 uppercase">Half Day / LWP</span>
              <span className="text-lg font-bold text-slate-800">{balances.halfDay} / {balances.lwp} <span className="text-xs text-slate-500 font-normal lowercase">taken</span></span>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Leave History</h3>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-blue-700"
            >
              <Plus size={14} /> Apply Leave
            </button>
          </div>
          
          <div className="flex flex-col gap-3">
            {leaves.length === 0 ? (
              <p className="text-center text-slate-500 text-sm py-4">No leave history found.</p>
            ) : (
              leaves.map(leave => (
                <div key={leave.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-slate-800 bg-white px-2 py-0.5 rounded shadow-sm border border-slate-200">{leave.leaveType}</span>
                      <p className="text-xs font-bold text-slate-600 mt-2 flex items-center gap-1">
                        <Calendar size={12} /> {leave.fromDate} to {leave.toDate} ({leave.days} days)
                      </p>
                    </div>
                    <div className={`flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
                      leave.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                      leave.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      leave.status === 'Cancelled' ? 'bg-gray-200 text-gray-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {getStatusIcon(leave.status)} {leave.status}
                    </div>
                  </div>
                  {leave.reason && (
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 italic">"{leave.reason}"</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Apply Leave Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md flex flex-col overflow-hidden my-8"
            >
              <div className="p-4 bg-blue-50 border-b border-blue-100 flex items-start gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-blue-700 uppercase tracking-wide text-sm">Leave Request</h3>
                  <p className="text-xs text-blue-600 font-medium mt-0.5">Apply for a new leave</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
                {/* Staff Info Preview */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600 grid grid-cols-2 gap-2">
                  <div><span className="font-bold text-slate-800">Name:</span> {staffData?.name}</div>
                  <div><span className="font-bold text-slate-800">ID:</span> {staffData?.staffId}</div>
                  <div className="col-span-2"><span className="font-bold text-slate-800">Role:</span> {staffData?.designation}</div>
                  <div className="col-span-2"><span className="font-bold text-slate-800">Center:</span> {staffData?.centerName} ({staffData?.centerCode})</div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Leave Type</label>
                  <CustomDropdown 
    value={leaveType}
    onChange={setLeaveType}
    placeholder="-- Select Leave Type --"
    options={leaveTypesList.map(t => ({ value: t, label: t }))}
  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">From Date</label>
                    <input 
                      type="date"
                      value={fromDate}
                      onChange={e => setFromDate(e.target.value)}
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">To Date</label>
                    <input 
                      type="date"
                      value={toDate}
                      onChange={e => setToDate(e.target.value)}
                      required
                      min={fromDate}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">No. of Days</label>
                  <div className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-sm font-bold text-slate-700">
                    {calculateDays(fromDate, toDate, leaveType)} Day(s)
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Reason</label>
                  <textarea 
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium min-h-[80px]"
                    placeholder="Enter reason for leave..."
                  ></textarea>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Emergency Contact Number</label>
                  <input 
                    type="tel"
                    value={emergencyContact}
                    onChange={e => setEmergencyContact(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium"
                    placeholder="E.g., +91 9876543210"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Attachment (Optional)</label>
                  <input 
                    type="file"
                    onChange={handleFileChange}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-xs"
                    accept="image/*,.pdf"
                  />
                </div>

                <div className="flex gap-3 pt-3 border-t border-slate-100 mt-2">
                  <button 
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-3 rounded-lg border border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-xs hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-bold uppercase tracking-wider text-xs hover:bg-blue-700 disabled:opacity-70 flex justify-center items-center"
                  >
                    {submitting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Submit Request'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
