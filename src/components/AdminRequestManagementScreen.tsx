import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Clock, FileText, Download, Filter, Search, Calendar, MapPin, Eye } from 'lucide-react';
import { collection, query, getDocs, updateDoc, doc, serverTimestamp, onSnapshot, addDoc, where } from 'firebase/firestore';
import { logAuditActivity } from '../utils/auditHelpers';
import { db } from '../firebase';
import { validateRequestApproval } from '../utils/validationHelpers';
import { motion, AnimatePresence } from 'motion/react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function AdminRequestManagementScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'leave' | 'duty'>('leave');
  
  const [leaves, setLeaves] = useState<any[]>([]);
  const [duties, setDuties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [statusFilter, setStatusFilter] = useState<'Pending' | 'Approved' | 'Rejected'>('Pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  
  // Modal for View/Approve/Reject
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [adminRemarks, setAdminRemarks] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchRequests = () => {
      // Leaves
      const leaveQ = query(collection(db, 'leaves'));
      const unsubLeave = onSnapshot(leaveQ, (snap) => {
        const data: any[] = [];
        snap.forEach(d => data.push({ id: d.id, ...d.data(), requestType: 'Leave' }));
        data.sort((a, b) => (b.timestamp?.toMillis?.() || 0) - (a.timestamp?.toMillis?.() || 0));
        setLeaves(data);
      });

      // Duty
      const dutyQ = query(collection(db, 'official_duty_requests'));
      const unsubDuty = onSnapshot(dutyQ, (snap) => {
        const data: any[] = [];
        snap.forEach(d => data.push({ id: d.id, ...d.data(), requestType: 'Official Duty' }));
        data.sort((a, b) => (b.timestamp?.toMillis?.() || 0) - (a.timestamp?.toMillis?.() || 0));
        setDuties(data);
        setLoading(false);
      });
      
      return () => {
        unsubLeave();
        unsubDuty();
      }
    };
    
    return fetchRequests();
  }, []);

  const handleAction = async (action: 'Approved' | 'Rejected') => {
    if (!selectedRequest) return;
    
    if (action === 'Approved') {
      const fromD = selectedRequest.requestType === 'Leave' ? selectedRequest.fromDate : selectedRequest.Date;
      const toD = selectedRequest.requestType === 'Leave' ? selectedRequest.toDate : selectedRequest.Date;
      const validation = await validateRequestApproval(
        selectedRequest.staffUid,
        fromD,
        toD,
        selectedRequest.requestType,
        selectedRequest.id,
        selectedRequest['Request Date & Time'] || (selectedRequest.timestamp?.toDate ? selectedRequest.timestamp.toDate().toISOString() : undefined)
      );
      if (!validation.valid) {
        alert(validation.message);
        return;
      }
    }

    setActionLoading(true);
    try {
      const collectionName = selectedRequest.requestType === 'Leave' ? 'leaves' : 'official_duty_requests';
      const statusField = selectedRequest.requestType === 'Leave' ? 'status' : 'Status';
      
      await updateDoc(doc(db, collectionName, selectedRequest.id), {
        [statusField]: action,
        'Admin Remarks': adminRemarks,
        'Approved By': 'Admin',
        'Approval Date & Time': new Date().toISOString(),
        approvalDate: serverTimestamp() // For legacy compatibility
      });

      // Automatic Sync
      if (action === 'Approved') {
        if (selectedRequest.requestType === 'Official Duty') {
          // Mark Attendance as Present (Official Duty)
          const newAttendance = {
            staffUid: selectedRequest.staffUid || selectedRequest['Staff ID'],
            'Staff ID': selectedRequest['Staff ID'],
            'Staff Name': selectedRequest['Staff Name'],
            'Center ID': selectedRequest['Center ID'] || '',
            'Center Code': selectedRequest['Center Code'],
            'Center Name': selectedRequest['Center Name'],
            'Date': selectedRequest['Date'] || selectedRequest.fromDate,
            date: selectedRequest['Date'] || selectedRequest.fromDate,
            'IN Time': selectedRequest['Time'] || selectedRequest.fromTime || '09:00',
            'Attendance Status': 'Official Duty',
            'Duty Type': selectedRequest['Duty Type'] || 'Field Work',
            'Reason': selectedRequest['Reason'] || selectedRequest.reason,
            timestamp: new Date(),
            'Approved By': 'Admin',
            remarks: adminRemarks
          };
          await addDoc(collection(db, 'attendance'), newAttendance);
        } else if (selectedRequest.requestType === 'Leave') {
          // Sync Leave into attendance for the date range
          // Simplifying: Creating one record for the start date, or we can create records for all days
          const startDate = new Date(selectedRequest.fromDate);
          const endDate = new Date(selectedRequest.toDate);
          for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toLocaleDateString('en-CA');
            const newAttendance = {
              staffUid: selectedRequest.staffUid,
              'Staff ID': selectedRequest.staffId,
              'Staff Name': selectedRequest.staffName,
              'Center ID': selectedRequest.centerId || '',
              'Center Code': selectedRequest.centerCode || '',
              'Center Name': selectedRequest.centerName,
              'Date': dateStr,
              date: dateStr,
              'IN Time': '00:00',
              'Attendance Status': 'Leave',
              'Leave Type': selectedRequest.leaveType,
              'Reason': selectedRequest.reason,
              timestamp: new Date(),
              'Approved By': 'Admin',
              remarks: adminRemarks
            };
            await addDoc(collection(db, 'attendance'), newAttendance);
          }
        }
      }

      // Record in Audit Logs
      await addDoc(collection(db, 'audit_logs'), {
        action: `${action} ${selectedRequest.requestType} Request`,
        details: `Request ID: ${selectedRequest.id}, Staff: ${selectedRequest.staffName || selectedRequest['Staff Name']}`,
        timestamp: serverTimestamp(),
        adminId: 'Admin'
      });

      setSelectedRequest(null);
      setAdminRemarks('');
    } catch (err) {
      console.error(err);
      alert('Failed to update request.');
    } finally {
      setActionLoading(false);
    }
  };

  const getFilteredData = () => {
    const data = activeTab === 'leave' ? leaves : duties;
    return data.filter(item => {
      // Handle legacy status values
      const currentStatus = item.status || item.Status;
      const normalizedStatus = currentStatus?.includes('Pending') ? 'Pending' : currentStatus;
      
      const matchStatus = normalizedStatus === statusFilter;
      const searchStr = (item.staffName || item['Staff Name'] || item.centerName || item['Center Name'] || '').toLowerCase();
      const matchSearch = searchStr.includes(searchQuery.toLowerCase());
      
      let matchMonth = true;
      if (monthFilter) {
        const itemDate = item.fromDate || item['Date'];
        if (itemDate && !itemDate.startsWith(monthFilter)) {
          matchMonth = false;
        }
      }
      
      return matchStatus && matchSearch && matchMonth;
    });
  };

  const handleExport = (format: 'excel' | 'pdf') => {
    const data = getFilteredData();
    if (data.length === 0) return alert('No data to export.');
    
    if (format === 'excel') {
      const ws = XLSX.utils.json_to_sheet(data.map(d => ({
        'Staff Name': d.staffName || d['Staff Name'],
        'Staff ID': d.staffId || d['Staff ID'],
        'Center': d.centerName || d['Center Name'],
        'Type': d.leaveType || d['Duty Type'],
        'Date': d.fromDate || d['Date'],
        'Status': d.status || d.Status
      })));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Requests');
      XLSX.writeFile(wb, `${activeTab}_requests.xlsx`);
    } else {
      const doc = new jsPDF();
      doc.text(`${activeTab.toUpperCase()} Requests`, 14, 15);
      autoTable(doc, {
        head: [['Staff', 'Center', 'Type', 'Date', 'Status']],
        body: data.map(d => [
          d.staffName || d['Staff Name'],
          d.centerName || d['Center Name'],
          d.leaveType || d['Duty Type'],
          d.fromDate || d['Date'],
          d.status || d.Status
        ]),
        startY: 20
      });
      doc.save(`${activeTab}_requests.pdf`);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-slate-50"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>;

  const currentData = getFilteredData();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <div className="bg-blue-900 text-white h-20 flex items-center px-6 shadow-md gap-4 shrink-0">
        <button onClick={() => navigate('/admin-dashboard')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase truncate">Request Management</h1>
          <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5">Leave & Official Duty Requests</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleExport('excel')} className="p-2 hover:bg-white/10 rounded-full text-blue-200 hover:text-white transition-colors" title="Export Excel">
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white shadow-sm border-b border-slate-200 shrink-0">
        <button 
          onClick={() => setActiveTab('leave')}
          className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'leave' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}
        >
          Leave Requests
        </button>
        <button 
          onClick={() => setActiveTab('duty')}
          className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'duty' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}
        >
          Official Duty
        </button>
      </div>

      {/* Filters */}
      <div className="p-4 bg-white shadow-sm border-b border-slate-200 flex flex-col gap-3 shrink-0">
        <div className="flex gap-2">
          {['Pending', 'Approved', 'Rejected'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors flex-1 ${statusFilter === s ? (s === 'Approved' ? 'bg-emerald-100 text-emerald-700' : s === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700') : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search Staff or Center..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <input 
            type="month"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        {currentData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <FileText size={48} className="mb-4 opacity-20" />
            <p className="font-bold text-sm uppercase tracking-widest">No Requests Found</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {currentData.map((req) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedRequest(req)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-slate-800">{req.staffName || req['Staff Name']}</h3>
                      <p className="text-xs text-slate-500 font-medium">{req.staffId || req['Staff ID']} • {req.centerName || req['Center Name']}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${statusFilter === 'Pending' ? 'bg-amber-100 text-amber-700' : statusFilter === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {statusFilter}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-600 bg-slate-50 p-2 rounded-lg">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-blue-500" />
                      <span>{req.fromDate || req['Date']} {req.toDate ? `to ${req.toDate}` : ''}</span>
                    </div>
                    <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
                      <FileText size={14} className="text-purple-500" />
                      <span>{req.leaveType || req['Duty Type']}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="bg-blue-900 p-4 flex items-center justify-between text-white shrink-0">
                <h3 className="font-bold uppercase tracking-wide text-sm">{selectedRequest.requestType} Details</h3>
                <button onClick={() => { setSelectedRequest(null); setAdminRemarks(''); }} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                  <XCircle size={20} />
                </button>
              </div>
              
              <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Staff Name</p>
                    <p className="text-sm font-semibold text-slate-800">{selectedRequest.staffName || selectedRequest['Staff Name']}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Center</p>
                    <p className="text-sm font-semibold text-slate-800">{selectedRequest.centerName || selectedRequest['Center Name']}</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Request Info</p>
                  <p className="text-sm font-medium text-slate-700">Type: {selectedRequest.leaveType || selectedRequest['Duty Type']}</p>
                  <p className="text-sm font-medium text-slate-700 mt-1">Date: {selectedRequest.fromDate || selectedRequest['Date']} {selectedRequest.toDate ? `to ${selectedRequest.toDate}` : ''}</p>
                  {(selectedRequest.fromTime || selectedRequest['Time']) && (
                    <p className="text-sm font-medium text-slate-700 mt-1">Time: {selectedRequest.fromTime || selectedRequest['Time']} {selectedRequest.toTime ? `to ${selectedRequest.toTime}` : ''}</p>
                  )}
                </div>

                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Reason / Purpose</p>
                  <div className="bg-amber-50 text-amber-800 p-3 rounded-lg text-sm whitespace-pre-wrap">
                    {selectedRequest.reason || selectedRequest['Reason'] || 'No reason provided.'}
                  </div>
                </div>
                
                {selectedRequest.attachmentUrl && (
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Attachment</p>
                    <a href={selectedRequest.attachmentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors">
                      <Eye size={16} /> View Attachment
                    </a>
                  </div>
                )}
                
                {(selectedRequest.status !== 'Pending Approval' && selectedRequest.status !== 'Pending' && selectedRequest.Status !== 'Pending Approval') ? (
                  <div className="bg-slate-100 p-3 rounded-lg mt-2">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Status Info</p>
                    <p className="text-sm font-semibold mb-1">Status: {selectedRequest.status || selectedRequest.Status}</p>
                    <p className="text-xs text-slate-600">Approved By: {selectedRequest['Approved By'] || selectedRequest.approvedBy}</p>
                    {selectedRequest['Admin Remarks'] && (
                      <p className="text-xs text-slate-600 mt-1 break-words"><span className="font-bold">Remarks:</span> {selectedRequest['Admin Remarks']}</p>
                    )}
                  </div>
                ) : (
                  <div className="mt-2">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Admin Remarks (Optional)</p>
                    <textarea 
                      value={adminRemarks}
                      onChange={e => setAdminRemarks(e.target.value)}
                      placeholder="Add remarks before approving/rejecting..."
                      className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none h-20"
                    ></textarea>
                    
                    <div className="flex gap-3 mt-4">
                      <button 
                        onClick={() => handleAction('Approved')}
                        disabled={actionLoading}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                      >
                        {actionLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <><CheckCircle2 size={18} /> Approve</>}
                      </button>
                      <button 
                        onClick={() => handleAction('Rejected')}
                        disabled={actionLoading}
                        className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                      >
                        {actionLoading ? <div className="w-5 h-5 border-2 border-red-700 border-t-transparent rounded-full animate-spin"></div> : <><XCircle size={18} /> Reject</>}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
