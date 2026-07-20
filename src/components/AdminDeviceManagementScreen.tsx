import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, ShieldCheck, ShieldAlert, MonitorSmartphone, Trash2, Edit, CheckCircle, RefreshCw } from 'lucide-react';
import { collection, query, getDocs, updateDoc, doc, deleteDoc, orderBy, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useActiveCenters } from '../hooks/useActiveCenters';
import { motion } from 'motion/react';
import { logAuditActivity } from '../utils/auditHelpers';

const getAdminName = () => {
  const adminStr = localStorage.getItem('userSession');
  let adminName = 'Admin';
  if (adminStr) {
    try {
      // it might not be base64 encoded depending on how it was saved, try parsing normally first
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

export default function AdminDeviceManagementScreen() {
  const navigate = useNavigate();
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { centers } = useActiveCenters();

  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferDeviceId, setTransferDeviceId] = useState('');
  const [transferCenterId, setTransferCenterId] = useState('');
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {} });
  const [toastMessage, setToastMessage] = useState('');
  
  const showToast = (msg) => {
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

      // Fetch staff data to ensure staff names are present
      const staffSnap = await getDocs(collection(db, 'staff'));
      const staffMap = new Map();
      staffSnap.docs.forEach(doc => staffMap.set(doc.id, { ...doc.data(), id: doc.id }));

      const updatesRequired: any[] = [];

      docs = docs.map((d: any) => {
        const updated = { ...d };
        if (d.staffUid && staffMap.has(d.staffUid)) {
           const staffData = staffMap.get(d.staffUid);
           let needsUpdate = false;
           if (d.staffName !== staffData.name) {
             updated.staffName = staffData.name;
             needsUpdate = true;
           }
           if (d.staffId !== staffData.staffId) {
             updated.staffId = staffData.staffId;
             needsUpdate = true;
           }
           if (needsUpdate) {
             updatesRequired.push(updated);
           }
        }
        return updated;
      });

      // Sort by registeredAt desc, or just let it be and we can sort in memory
      docs.sort((a: any, b: any) => (b.registeredAt?.toMillis?.() || 0) - (a.registeredAt?.toMillis?.() || 0));
      setDevices(docs);

      for (const update of updatesRequired) {
        updateDoc(doc(db, 'registered_devices', update.id), {
           staffName: update.staffName,
           staffId: update.staffId
        }).catch(console.error);
      }
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (deviceId: string, newStatus: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Confirm Status Change',
      message: `Are you sure you want to mark this device as ${newStatus}?`,
      onConfirm: async () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        await executeUpdateStatus(deviceId, newStatus);
      }
    });
  };

  const executeUpdateStatus = async (deviceId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'registered_devices', deviceId), { status: newStatus });
      
      const adminName = getAdminName();
      const actionName = newStatus === 'Approved' ? 'Device Approved' : newStatus === 'Blocked' ? 'Device Blocked' : newStatus === 'Active' ? 'Device Unblocked' : `Device Status: ${newStatus}`;
      logAuditActivity(adminName, 'Device', deviceId, actionName, `Changed device ${deviceId} status to ${newStatus}`);
      
      showToast(`Device marked as ${newStatus} successfully.`);
      fetchDevices();
    } catch (err) {
      console.error(err);
      showToast('Error updating status');
    }
  };

  const removeDevice = async (deviceId: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Remove Device',
      message: 'Remove this device binding entirely?',
      onConfirm: async () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        await executeRemoveDevice(deviceId);
      }
    });
  };

  const executeRemoveDevice = async (deviceId: string) => {
    try {
      await deleteDoc(doc(db, 'registered_devices', deviceId));
      
      const adminName = getAdminName();
      logAuditActivity(adminName, 'Device', deviceId, 'Device Deleted', `Deleted device ${deviceId}`);
      
      showToast('Device deleted successfully.');
      fetchDevices();
    } catch (err) {
      console.error(err);
      showToast('Error removing device');
    }
  };

  const deleteDuplicates = async () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Remove Duplicates',
      message: 'Are you sure you want to delete duplicate device records for the same staff?',
      onConfirm: async () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        await executeDeleteDuplicates();
      }
    });
  };

  const executeDeleteDuplicates = async () => {
    setLoading(true);
    try {
      // Group devices by staffUid
      const staffMap = new Map();
      devices.forEach((d: any) => {
        if (d.staffUid) {
          if (!staffMap.has(d.staffUid)) {
            staffMap.set(d.staffUid, []);
          }
          staffMap.get(d.staffUid).push(d);
        }
      });

      let deletedCount = 0;
      for (const [staffUid, staffDevices] of staffMap.entries()) {
        if (staffDevices.length > 1) {
          // Sort by registeredAt ascending to get the oldest first
          staffDevices.sort((a: any, b: any) => {
            const dateA = a.registeredAt?.toMillis?.() || 0;
            const dateB = b.registeredAt?.toMillis?.() || 0;
            return dateA - dateB;
          });
          
          // Find the first approved or active one
          let keepIndex = staffDevices.findIndex((d: any) => d.status === 'Approved' || d.status === 'Active');
          if (keepIndex === -1) keepIndex = 0; // If none approved, keep the oldest

          // Keep the chosen one, delete the rest
          for (let i = 0; i < staffDevices.length; i++) {
            if (i !== keepIndex) {
              await deleteDoc(doc(db, 'registered_devices', staffDevices[i].id));
              deletedCount++;
            }
          }
        }
      }
      
      if (deletedCount > 0) {
        const adminName = getAdminName();
        logAuditActivity(adminName, 'Device', 'System', 'Duplicate Removed', `Removed ${deletedCount} duplicate devices`);
      }
      
      showToast(`Deleted ${deletedCount} duplicate records.`);
      fetchDevices();
    } catch (err) {
      console.error(err);
      showToast('Error cleaning duplicates');
    } finally {
      setLoading(false);
    }
  };

  const transferDevice = async () => {
    if (!transferCenterId) {
      showToast("Please select a center");
      return;
    }
    try {
      const center = centers.find(c => c.id === transferCenterId);
      if (center) {
        await updateDoc(doc(db, 'registered_devices', transferDeviceId), {
          centerId: center.id,
          centerName: center.name,
          centerCode: center.code || ''
        });
        
        const adminName = getAdminName();
        logAuditActivity(adminName, 'Device', transferDeviceId, 'Device Transferred', `Transferred device ${transferDeviceId} to center ${center.name}`);
        
        setShowTransferModal(false);
        showToast('Device transferred successfully.');
        fetchDevices();
      }
    } catch (err) {
      console.error(err);
      showToast('Error transferring device');
    }
  };

  const formatDate = (ts: any) => {
    if (!ts) return 'N/A';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    if (isNaN(d.getTime())) return 'N/A';
    return d.toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    });
  };

  const filteredDevices = devices.filter(d => 
    !searchTerm || 
    d.deviceId?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.centerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.staffName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      <div className="bg-emerald-700 text-white p-6 shadow-md shrink-0">
        <div className="flex justify-between items-start mb-2 gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors shrink-0">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <MonitorSmartphone size={20} className="text-emerald-300" />
              <h1 className="text-xl font-bold tracking-tight uppercase leading-tight">Device Management</h1>
            </div>
            <p className="text-[10px] text-emerald-200 uppercase tracking-widest mt-0.5">One Device = One Center = One Staff</p>
          </div>
          <button onClick={fetchDevices} className="p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors shrink-0">
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={16} />
            </div>
            <input 
              type="text" 
              placeholder="Search by Device ID, Center, or Staff..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-sm"
            />
          </div>
          <button onClick={deleteDuplicates} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-300 transition-colors">
            Remove / Merge Duplicates
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent"></div>
          </div>
        ) : filteredDevices.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
            <p className="text-sm font-bold text-slate-500 uppercase">No devices found</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredDevices.map((device, idx) => (
              <motion.div 
                key={device.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <MonitorSmartphone size={16} className="text-emerald-600" />
                      {device.id}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                      Role: <span className="text-indigo-600">{device.role || 'Center'}</span>
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 ${
                    device.status === 'Active' || device.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                    device.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {device.status === 'Active' || device.status === 'Approved' ? <CheckCircle size={12}/> : 
                     device.status === 'Pending' ? <ShieldAlert size={12}/> : <ShieldCheck size={12}/>}
                    {device.status === 'Active' ? 'Approved' : device.status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold text-[9px] uppercase tracking-wider block">Center</span>
                    <span className="font-medium text-slate-700">{device.centerName || 'N/A'} {device.centerCode ? `(${device.centerCode})` : ''}</span>
                  </div>
                  {(device.role === 'Staff' || device.staffName) && (
                    <div>
                      <span className="text-slate-400 font-bold text-[9px] uppercase tracking-wider block">Staff</span>
                      <span className="font-medium text-slate-700">{device.staffName || 'N/A'} ({device.staffId || 'N/A'})</span>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-400 font-bold text-[9px] uppercase tracking-wider block">Device ID</span>
                    <span className="font-medium text-slate-700 font-mono text-[10px] break-all">{device.id}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold text-[9px] uppercase tracking-wider block">Device Name / Model</span>
                    <span className="font-medium text-slate-700">{device.deviceName || device.deviceModel || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold text-[9px] uppercase tracking-wider block">Registered At</span>
                    <span className="font-medium text-slate-700">{formatDate(device.registeredAt)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold text-[9px] uppercase tracking-wider block">Last Login / Active</span>
                    <span className="font-medium text-slate-700">{device.lastLogin ? new Date(device.lastLogin).toLocaleString() : 'N/A'}</span>
                  </div>
                </div>

                <div className="flex gap-2 border-t border-slate-100 pt-3">
                  {(device.status === 'Pending' || device.status === 'Blocked') && (
                    <button 
                      onClick={() => updateStatus(device.id, 'Approved')}
                      className="flex-1 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-100 transition-colors"
                    >
                      Approve
                    </button>
                  )}
                  {device.status === 'Pending' && (
                    <button 
                      onClick={() => updateStatus(device.id, 'Rejected')}
                      className="flex-1 py-2 bg-red-50 text-red-700 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-red-100 transition-colors"
                    >
                      Reject
                    </button>
                  )}
                  {(device.status === 'Active' || device.status === 'Approved') && (
                    <button 
                      onClick={() => updateStatus(device.id, 'Blocked')}
                      className="flex-1 py-2 bg-amber-50 text-amber-700 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-amber-100 transition-colors"
                    >
                      Block
                    </button>
                  )}
                  {device.status === 'Blocked' && (
                    <button 
                      onClick={() => updateStatus(device.id, 'Active')}
                      className="flex-1 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-100 transition-colors"
                    >
                      Unblock
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      setTransferDeviceId(device.id);
                      setTransferCenterId(device.centerId || '');
                      setShowTransferModal(true);
                    }}
                    className="flex-1 py-2 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-blue-100 transition-colors"
                  >
                    Transfer
                  </button>
                  <button 
                    onClick={() => removeDevice(device.id)}
                    className="flex-none px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      
      {/* Toast Notification */}
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
              <p className="text-slate-600 mb-6">{confirmDialog.message}</p>
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

      {showTransferModal && (

        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-blue-900 p-4 flex items-center justify-between text-white">
              <h3 className="font-bold uppercase tracking-wide text-sm">Transfer Device</h3>
              <button onClick={() => setShowTransferModal(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                <ArrowLeft size={16} />
              </button>
            </div>
            <div className="p-6">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Select New Center</label>
              <select
                value={transferCenterId}
                onChange={(e) => setTransferCenterId(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm mb-6 outline-none focus:border-blue-500"
              >
                <option value="">-- Select Center --</option>
                {centers.map(c => (
                  <option key={c.id} value={c.id}>{c.code} - {c.name}</option>
                ))}
              </select>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowTransferModal(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={transferDevice}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-700"
                >
                  Transfer
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
