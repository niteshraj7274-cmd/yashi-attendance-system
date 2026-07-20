import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Clock, AlertCircle, FileText, Download, TrendingUp } from 'lucide-react';
import { collection, query, getDocs, updateDoc, doc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { validateRequestApproval } from '../utils/validationHelpers';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminLeaveScreen() {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [statusFilter, setStatusFilter] = useState('Pending'); // Shows Pending & Forwarded to Super Admin
  const [activeTab, setActiveTab] = useState<'requests' | 'dashboard'>('dashboard');

  useEffect(() => {
    // Listen to leaves
    const q = query(collection(db, 'leaves'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leaveData: any[] = [];
      snapshot.forEach((doc) => {
        leaveData.push({ id: doc.id, ...doc.data() });
      });
      // Sort by timestamp desc
      leaveData.sort((a, b) => {
        const timeA = a.timestamp?.toMillis() || 0;
        const timeB = b.timestamp?.toMillis() || 0;
        return timeB - timeA;
      });
      setLeaves(leaveData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAction = async (leaveId: string, action: string) => {
    
    if (action === 'Approved') {
      const leave = leaves.find((l: any) => l.id === leaveId);
      if (leave) {
        const validation = await validateRequestApproval(
          leave.staffUid,
          leave.fromDate,
          leave.toDate,
          'Leave',
          leave.id,
          leave['Request Date & Time'] || (leave.timestamp?.toDate ? leave.timestamp.toDate().toISOString() : undefined)
        );
        if (!validation.valid) {
          alert(validation.message);
          return;
        }
      }
    }
    
    try {
      await updateDoc(doc(db, 'leaves', leaveId), {
        status: action,
        approvedBy: 'Super Admin',
        approvalDate: serverTimestamp()
      });
      console.log(`Leave ${action.toLowerCase()} successfully.`);
    } catch (error) {
      console.error("Error updating leave:", error);
      console.log("Failed to update leave status.");
    }
  };

  const filteredLeaves = leaves.filter(l => {
    if (statusFilter === 'Pending') return l.status === 'Pending Approval' || l.status === 'Forwarded to Super Admin';
    return l.status === statusFilter;
  });

  // Calculate Dashboard Stats
  const todayLeaves = leaves.filter(l => {
    if (l.status !== 'Approved') return false;
    const today = new Date();
    const start = new Date(l.fromDate);
    const end = new Date(l.toDate);
    // Remove time portion
    today.setHours(0,0,0,0);
    start.setHours(0,0,0,0);
    end.setHours(0,0,0,0);
    return today >= start && today <= end;
  }).length;

  const pendingLeaves = leaves.filter(l => l.status === 'Pending Approval' || l.status === 'Forwarded to Super Admin').length;
  const approvedLeaves = leaves.filter(l => l.status === 'Approved').length;
  const rejectedLeaves = leaves.filter(l => l.status === 'Rejected').length;

  // Center-wise summary
  const centerSummary: Record<string, { total: number, approved: number }> = {};
  leaves.forEach(l => {
    if (l.centerName) {
      if (!centerSummary[l.centerName]) centerSummary[l.centerName] = { total: 0, approved: 0 };
      centerSummary[l.centerName].total += 1;
      if (l.status === 'Approved') centerSummary[l.centerName].approved += 1;
    }
  });

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 items-center justify-center font-sans">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <div className="bg-emerald-700 text-white h-20 flex items-center px-6 shadow-md gap-4 z-10 shrink-0">
        <button onClick={() => navigate('/admin-dashboard')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase truncate">Leave Management</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b border-slate-200 shrink-0">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'dashboard' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Dashboard
        </button>
        <button 
          onClick={() => setActiveTab('requests')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'requests' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Leave Requests
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {activeTab === 'dashboard' ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-800">{todayLeaves}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Today's Leave</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-amber-200 bg-amber-50 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-amber-600">{pendingLeaves}</span>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mt-1">Pending</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-200 bg-emerald-50 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-emerald-600">{approvedLeaves}</span>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mt-1">Approved</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-red-200 bg-red-50 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-red-600">{rejectedLeaves}</span>
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider mt-1">Rejected</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <TrendingUp size={16} className="text-emerald-600" />
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Center-wise Summary</h3>
              </div>
              
              <div className="flex flex-col gap-3">
                {Object.keys(centerSummary).length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-2">No leave data available.</p>
                ) : (
                  Object.keys(centerSummary).map(center => (
                    <div key={center} className="flex justify-between items-center p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-xs font-bold text-slate-700 truncate mr-2">{center}</span>
                      <div className="flex gap-2 shrink-0">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          {centerSummary[center].approved} Approved
                        </span>
                        <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                          {centerSummary[center].total} Total
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col h-full"
          >
            <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 mb-4 flex overflow-x-auto hide-scrollbar">
              {['Pending', 'Approved', 'Rejected', 'Cancelled'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`flex-1 min-w-[80px] py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    statusFilter === status 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-transparent text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {filteredLeaves.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <FileText size={48} className="mb-4 opacity-20" />
                <p className="text-sm font-medium">No leave requests found.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <AnimatePresence>
                  {filteredLeaves.map(leave => (
                    <motion.div 
                      key={leave.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-100">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-slate-800 text-sm">{leave.staffName}</h3>
                            <p className="text-[10px] font-bold text-slate-500 uppercase">{leave.role} • {leave.centerName}</p>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-1 rounded shadow-sm border border-emerald-200">
                            {leave.leaveType}
                          </span>
                        </div>
                        
                        {leave.status === 'Forwarded to Super Admin' && (
                          <div className="mb-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded w-fit flex items-center gap-1">
                            <AlertCircle size={12} /> Forwarded by Center
                          </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-2 mt-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase">From</p>
                            <p className="text-xs font-bold text-slate-800">{leave.fromDate}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase">To</p>
                            <p className="text-xs font-bold text-slate-800">{leave.toDate}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase">Duration</p>
                            <p className="text-xs font-bold text-slate-800">{leave.days} Day(s)</p>
                          </div>
                          {leave.emergencyContact && (
                            <div>
                              <p className="text-[10px] font-bold text-slate-500 uppercase">Emergency Contact</p>
                              <p className="text-xs font-bold text-slate-800">{leave.emergencyContact}</p>
                            </div>
                          )}
                          <div className="col-span-2 mt-1">
                            <p className="text-[10px] font-bold text-slate-500 uppercase">Reason</p>
                            <p className="text-xs text-slate-700 italic">"{leave.reason}"</p>
                          </div>
                          {leave.attachment && (
                            <div className="col-span-2 mt-2">
                              <a href={leave.attachment} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded hover:bg-emerald-100 transition-colors">
                                <Download size={14} /> View Attachment
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {(leave.status === 'Pending Approval' || leave.status === 'Forwarded to Super Admin') && (
                        <div className="flex gap-2 p-3 bg-slate-50">
                          <button 
                            onClick={() => handleAction(leave.id, 'Rejected')}
                            className="flex-1 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-bold uppercase tracking-wide text-[10px] transition-colors flex items-center justify-center gap-1"
                          >
                            <XCircle size={14} /> Reject
                          </button>
                          <button 
                            onClick={() => handleAction(leave.id, 'Approved')}
                            className="flex-1 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-bold uppercase tracking-wide text-[10px] transition-colors flex items-center justify-center gap-1"
                          >
                            <CheckCircle2 size={14} /> Approve
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
