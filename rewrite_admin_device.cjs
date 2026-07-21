const fs = require('fs');

const code = `import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, ShieldCheck, ShieldAlert, MonitorSmartphone, Trash2, Edit, CheckCircle, RefreshCw, XCircle, Ban, RotateCcw, Power, Eye, History, Filter } from 'lucide-react';
import { collection, query, getDocs, updateDoc, doc, deleteDoc, orderBy, getDoc, serverTimestamp, addDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useActiveCenters } from '../hooks/useActiveCenters';
import { motion, AnimatePresence } from 'motion/react';
import { logAuditActivity } from '../utils/auditHelpers';

const getAdminName = () => {
  const adminStr = localStorage.getItem('userSession');
  let adminName = 'Admin';
  if (adminStr) {
    try {
      try {
          const adminData = JSON.parse(adminStr);
          if (adminData.name) adminName = adminData.name;
      } catch (e) {
          const adminData = JSON.parse(atob(adminStr));
          if (adminData.name) adminName = adminData.name;
      }
    } catch(e) {}
  }
  return adminName;
};

const maskDeviceId = (id: string) => {
  if (!id) return 'N/A';
  if (id.length <= 8) return id;
  const start = id.substring(0, 8);
  const end = id.substring(id.length - 4);
  return \`\${start}****\${end}\`;
};

export default function AdminDeviceManagementScreen() {
  const navigate = useNavigate();
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCenter, setFilterCenter] = useState('All');
  
  const { centers } = useActiveCenters();
  
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferDeviceId, setTransferDeviceId] = useState('');
  const [transferCenterId, setTransferCenterId] = useState('');
  
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {}, requireReason: false });
  const [actionReason, setActionReason] = useState('');
  
  const [toastMessage, setToastMessage] = useState('');
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'registered_devices'));
      const snap = await getDocs(q);
      let docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));

      const staffSnap = await getDocs(collection(db, 'staff'));
      const staffMap = new Map();
      staffSnap.docs.forEach(doc => staffMap.set(doc.id, { ...doc.data(), id: doc.id }));

      docs = docs.map((d: any) => {
        const updated = { ...d };
        if (d.staffUid && staffMap.has(d.staffUid)) {
           const staffData = staffMap.get(d.staffUid);
           updated.staffName = staffData.name || updated.staffName;
           updated.staffId = staffData.staffId || updated.staffId;
        }
        return updated;
      });

      docs.sort((a: any, b: any) => (b.registeredAt?.toMillis?.() || 0) - (a.registeredAt?.toMillis?.() || 0));
      setDevices(docs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const executeActionWithReason = async (deviceId: string, actionName: string, actionFn: () => Promise<void>) => {
    setConfirmDialog({
      isOpen: true,
      title: \`Confirm \${actionName}\`,
      message: \`Are you sure you want to \${actionName.toLowerCase()} this device? Please provide a reason below.\`,
      requireReason: true,
      onConfirm: async () => {
        if (!actionReason.trim()) {
           alert("Reason is required.");
           return;
        }
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        await actionFn();
        setActionReason('');
      }
    });
  };

  const executeAction = async (deviceId: string, actionName: string, actionFn: () => Promise<void>) => {
    setConfirmDialog({
      isOpen: true,
      title: \`Confirm \${actionName}\`,
      message: \`Are you sure you want to \${actionName.toLowerCase()} this device?\`,
      requireReason: false,
      onConfirm: async () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        await actionFn();
      }
    });
  };

  const updateStatus = async (deviceId: string, newStatus: string, reason: string = '') => {
    try {
      const device = devices.find(d => d.id === deviceId);
      const adminName = getAdminName();
      
      const updateData: any = { status: newStatus };
      if (newStatus === 'Approved') {
        updateData.approvalDate = new Date().toISOString();
        updateData.approvedBy = adminName;
      }
      
      await updateDoc(doc(db, 'registered_devices', deviceId), updateData);
      
      logAuditActivity(adminName, 'Device Security', device?.staffName || 'Device', 'Status Update', \`Updated status to \${newStatus}\`, {
        role: 'Admin',
        userName: adminName,
        action: 'Status Update',
        moduleName: 'Device Management',
        deviceId: deviceId,
        newValue: newStatus,
        reason: reason
      });

      showToast(\`Device \${newStatus}\`);
      fetchDevices();
    } catch (err) {
      console.error(err);
      alert('Error updating status');
    }
  };

  const removeDevice = async (deviceId: string) => {
    executeActionWithReason(deviceId, 'Delete Device', async () => {
      try {
        const device = devices.find(d => d.id === deviceId);
        const adminName = getAdminName();
        
        // Log delete reason
        await addDoc(collection(db, 'device_audit_logs'), {
          deviceId, staffName: device?.staffName, action: 'Delete Device', reason: actionReason, adminName, timestamp: serverTimestamp()
        });
        
        // Soft delete / Update status to deleted
        await updateDoc(doc(db, 'registered_devices', deviceId), { status: 'Deleted', deletedReason: actionReason });
        
        logAuditActivity(adminName, 'Device Security', device?.staffName || 'Device', 'Delete', 'Deleted Device', {
          role: 'Admin', userName: adminName, action: 'Delete', moduleName: 'Device Management', deviceId: deviceId, reason: actionReason
        });
        
        showToast('Device marked as Deleted');
        fetchDevices();
      } catch (err) {
        console.error(err);
      }
    });
  };

  const replaceDevice = async (deviceId: string) => {
    executeActionWithReason(deviceId, 'Replace Device', async () => {
      try {
        const device = devices.find(d => d.id === deviceId);
        const adminName = getAdminName();
        
        await addDoc(collection(db, 'device_audit_logs'), {
          deviceId, staffName: device?.staffName, action: 'Replace Device', reason: actionReason, adminName, timestamp: serverTimestamp()
        });
        
        await updateDoc(doc(db, 'registered_devices', deviceId), { status: 'Replaced', replacedReason: actionReason });
        
        logAuditActivity(adminName, 'Device Security', device?.staffName || 'Device', 'Replace', 'Replaced Device', {
          role: 'Admin', userName: adminName, action: 'Replace', moduleName: 'Device Management', deviceId: deviceId, reason: actionReason
        });
        
        showToast('Device Replaced successfully');
        fetchDevices();
      } catch (err) {
        console.error(err);
      }
    });
  };

  const forceLogout = async (deviceId: string) => {
    executeAction(deviceId, 'Force Logout', async () => {
      try {
         await updateDoc(doc(db, 'registered_devices', deviceId), { sessionRevoked: true });
         showToast('Forced logout command sent.');
      } catch(err) { console.error(err); }
    });
  };

  const revokeAllSessions = async (staffUid: string) => {
    if (!staffUid) return;
    executeAction(staffUid, 'Revoke All Sessions', async () => {
      try {
         const d = devices.filter(x => x.staffUid === staffUid);
         for (let x of d) {
            await updateDoc(doc(db, 'registered_devices', x.id), { sessionRevoked: true, status: 'Suspended' });
         }
         showToast('All sessions revoked and suspended.');
         fetchDevices();
      } catch(err) { console.error(err); }
    });
  };

  const transferDevice = async () => {
    if (!transferCenterId) {
      alert("Please select a center");
      return;
    }
    try {
      await updateDoc(doc(db, 'registered_devices', transferDeviceId), {
        centerId: transferCenterId
      });
      setShowTransferModal(false);
      showToast('Device transferred successfully');
      fetchDevices();
    } catch (err) {
      console.error(err);
      alert('Error transferring device');
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Approved': case 'Active': return 'bg-emerald-100 text-emerald-700';
      case 'Pending Approval': case 'Pending': return 'bg-amber-100 text-amber-700';
      case 'Blocked': return 'bg-red-100 text-red-700';
      case 'Suspended': return 'bg-purple-100 text-purple-700';
      case 'Deleted': return 'bg-slate-100 text-slate-700';
      case 'Duplicate Detected': return 'bg-orange-100 text-orange-700';
      case 'Device Change Requested': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const filteredDevices = devices.filter(d => {
    let match = true;
    const s = searchTerm.toLowerCase();
    if (s && !(d.staffName?.toLowerCase().includes(s) || d.staffId?.toLowerCase().includes(s) || d.id?.toLowerCase().includes(s))) {
      match = false;
    }
    if (filterStatus !== 'All') {
       if (filterStatus === 'Approved') {
          if (d.status !== 'Approved' && d.status !== 'Active') match = false;
       } else if (filterStatus === 'Pending') {
          if (d.status !== 'Pending Approval' && d.status !== 'Pending') match = false;
       } else {
          if (d.status !== filterStatus) match = false;
       }
    }
    if (filterCenter !== 'All' && d.centerId !== filterCenter) {
      match = false;
    }
    return match;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-slate-900 text-white p-4 shadow-md flex items-center gap-4 sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase flex items-center gap-2">
            <ShieldCheck className="text-emerald-400" /> Device Security
          </h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Enterprise Device Management</p>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by Staff Name, ID, or Device ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
             <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="p-2 bg-slate-50 border border-slate-200 rounded text-xs font-bold uppercase text-slate-600 outline-none">
               <option value="All">All Statuses</option>
               <option value="Approved">Approved</option>
               <option value="Pending">Pending Approval</option>
               <option value="Blocked">Blocked</option>
               <option value="Suspended">Suspended</option>
               <option value="Deleted">Deleted</option>
               <option value="Duplicate Detected">Duplicate Detected</option>
               <option value="Device Change Requested">Change Requests</option>
             </select>
             <select value={filterCenter} onChange={e => setFilterCenter(e.target.value)} className="p-2 bg-slate-50 border border-slate-200 rounded text-xs font-bold uppercase text-slate-600 outline-none">
               <option value="All">All Centers</option>
               {centers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
             </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredDevices.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 text-center flex flex-col items-center">
            <MonitorSmartphone size={48} className="text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-700">No Devices Found</h3>
            <p className="text-sm text-slate-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDevices.map((device) => (
              <motion.div 
                key={device.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col"
              >
                <div className="p-4 border-b border-slate-100 flex justify-between items-start bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className={\`w-10 h-10 rounded-lg flex items-center justify-center shadow-inner \${device.status === 'Approved' || device.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}\`}>
                      <MonitorSmartphone size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">{device.staffName || 'Unassigned'}</h3>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{device.staffId || 'NO ID'}</p>
                    </div>
                  </div>
                  <div className={\`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider \${getStatusColor(device.status || 'Pending')}\`}>
                    {device.status || 'Pending'}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col gap-3 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-[9px]">Device ID (Masked)</span>
                    <span className="font-mono font-medium text-slate-700">{maskDeviceId(device.id)}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-[9px]">Registered</span>
                    <span className="font-medium text-slate-700">{device.registeredAt?.toDate ? device.registeredAt.toDate().toLocaleString() : 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-[9px]">Last Login</span>
                    <span className="font-medium text-slate-700">{device.lastLogin ? new Date(device.lastLogin).toLocaleString() : 'N/A'}</span>
                  </div>
                </div>
                
                <div className="p-3 bg-slate-50 border-t border-slate-100 grid grid-cols-4 gap-1">
                  <button onClick={() => { setSelectedDevice(device); setShowDetailsModal(true); }} className="flex flex-col items-center justify-center p-2 hover:bg-white rounded-lg transition-colors group">
                     <Eye size={16} className="text-blue-500 mb-1 group-hover:scale-110 transition-transform" />
                     <span className="text-[8px] font-bold uppercase tracking-wider text-slate-500">Details</span>
                  </button>
                  { (device.status === 'Pending' || device.status === 'Pending Approval' || device.status === 'Device Change Requested') && (
                     <>
                     <button onClick={() => updateStatus(device.id, 'Approved')} className="flex flex-col items-center justify-center p-2 hover:bg-emerald-50 rounded-lg transition-colors group">
                        <CheckCircle size={16} className="text-emerald-500 mb-1 group-hover:scale-110 transition-transform" />
                        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-500">Approve</span>
                     </button>
                     <button onClick={() => executeActionWithReason(device.id, 'Reject', () => updateStatus(device.id, 'Rejected', actionReason))} className="flex flex-col items-center justify-center p-2 hover:bg-red-50 rounded-lg transition-colors group">
                        <XCircle size={16} className="text-red-500 mb-1 group-hover:scale-110 transition-transform" />
                        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-500">Reject</span>
                     </button>
                     </>
                  )}
                  { (device.status === 'Approved' || device.status === 'Active') && (
                     <>
                     <button onClick={() => executeActionWithReason(device.id, 'Block Device', () => updateStatus(device.id, 'Blocked', actionReason))} className="flex flex-col items-center justify-center p-2 hover:bg-orange-50 rounded-lg transition-colors group">
                        <Ban size={16} className="text-orange-500 mb-1 group-hover:scale-110 transition-transform" />
                        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-500">Block</span>
                     </button>
                     <button onClick={() => replaceDevice(device.id)} className="flex flex-col items-center justify-center p-2 hover:bg-blue-50 rounded-lg transition-colors group">
                        <RotateCcw size={16} className="text-blue-500 mb-1 group-hover:scale-110 transition-transform" />
                        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-500">Replace</span>
                     </button>
                     </>
                  )}
                  { device.status === 'Blocked' && (
                     <button onClick={() => updateStatus(device.id, 'Approved')} className="flex flex-col items-center justify-center p-2 hover:bg-emerald-50 rounded-lg transition-colors group">
                        <CheckCircle size={16} className="text-emerald-500 mb-1 group-hover:scale-110 transition-transform" />
                        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-500">Unblock</span>
                     </button>
                  )}
                  { device.status !== 'Deleted' && (
                     <button onClick={() => removeDevice(device.id)} className="flex flex-col items-center justify-center p-2 hover:bg-red-50 rounded-lg transition-colors group">
                        <Trash2 size={16} className="text-red-500 mb-1 group-hover:scale-110 transition-transform" />
                        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-500">Delete</span>
                     </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {toastMessage && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl z-[100] text-sm font-medium flex items-center gap-2">
          <CheckCircle size={16} className="text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* Confirm Dialog */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
              <h3 className="font-bold uppercase tracking-wide text-sm">{confirmDialog.title}</h3>
            </div>
            <div className="p-6">
              <p className="text-slate-600 mb-6 text-sm">{confirmDialog.message}</p>
              {confirmDialog.requireReason && (
                 <textarea 
                    value={actionReason} 
                    onChange={e => setActionReason(e.target.value)}
                    placeholder="Enter reason..." 
                    className="w-full p-3 border border-slate-200 rounded-lg mb-4 text-sm outline-none focus:border-blue-500"
                    rows={3}
                 />
              )}
              <div className="flex gap-3">
                <button 
                  onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                  className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDialog.onConfirm}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedDevice && (
         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-lg max-h-[90vh] rounded-2xl shadow-xl overflow-hidden flex flex-col"
          >
            <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
              <h3 className="font-bold uppercase tracking-wide text-sm">Full Device Details</h3>
              <button onClick={() => setShowDetailsModal(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                <XCircle size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-4 text-sm text-slate-700">
               <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4">
                  <div><span className="block text-[10px] font-bold uppercase text-slate-400">Staff Name</span><span className="font-bold">{selectedDevice.staffName || 'N/A'}</span></div>
                  <div><span className="block text-[10px] font-bold uppercase text-slate-400">Staff ID</span><span className="font-bold">{selectedDevice.staffId || 'N/A'}</span></div>
               </div>
               <div className="border-b border-slate-100 pb-4">
                  <span className="block text-[10px] font-bold uppercase text-slate-400">Full Device ID</span>
                  <span className="font-mono font-medium text-blue-600 break-all">{selectedDevice.id}</span>
               </div>
               <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4">
                  <div><span className="block text-[10px] font-bold uppercase text-slate-400">Device Name/OS</span><span className="font-medium">{selectedDevice.deviceName || 'N/A'}</span></div>
                  <div><span className="block text-[10px] font-bold uppercase text-slate-400">Status</span><span className={\`font-bold \${getStatusColor(selectedDevice.status)}\`}>{selectedDevice.status || 'Pending'}</span></div>
               </div>
               <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4">
                  <div><span className="block text-[10px] font-bold uppercase text-slate-400">Registered</span><span className="font-medium">{selectedDevice.registeredAt?.toDate ? selectedDevice.registeredAt.toDate().toLocaleString() : 'N/A'}</span></div>
                  <div><span className="block text-[10px] font-bold uppercase text-slate-400">Approved Date</span><span className="font-medium">{selectedDevice.approvalDate ? new Date(selectedDevice.approvalDate).toLocaleString() : 'N/A'}</span></div>
               </div>
               <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4">
                  <div><span className="block text-[10px] font-bold uppercase text-slate-400">Last Login</span><span className="font-medium">{selectedDevice.lastLogin ? new Date(selectedDevice.lastLogin).toLocaleString() : 'N/A'}</span></div>
                  <div><span className="block text-[10px] font-bold uppercase text-slate-400">Failed Attempts</span><span className="font-medium text-red-600 font-bold">{selectedDevice.failedAttempts || 0}</span></div>
               </div>
               <div className="flex gap-2 pt-2">
                  <button onClick={() => { setShowDetailsModal(false); forceLogout(selectedDevice.id); }} className="flex-1 p-3 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                     <Power size={14}/> Force Logout
                  </button>
                  <button onClick={() => { setShowDetailsModal(false); revokeAllSessions(selectedDevice.staffUid); }} className="flex-1 p-3 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                     <Ban size={14}/> Revoke All Sessions
                  </button>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
`;

fs.writeFileSync('src/components/AdminDeviceManagementScreen.tsx', code);
