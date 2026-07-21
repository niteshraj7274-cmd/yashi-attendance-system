import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Building2, MapPin, Edit, Trash2, RefreshCw } from 'lucide-react';
import { collection, query, getDocs, updateDoc, doc, addDoc, serverTimestamp, where, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { logAuditActivity } from '../utils/auditHelpers';
import { motion, AnimatePresence } from 'motion/react';

const GEOFENCE_OPTIONS = ['200', '300', '400', '500', '700'];

export default function AdminCenterManagementScreen() {
  const navigate = useNavigate();
  const [centers, setCenters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPin, setShowPin] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    email: '',
    mobile: '',
    district: '',
    block: '',
    address: '',
    latitude: '',
    longitude: '',
    geofenceRadius: '200',
    status: 'Active',
    pin: ''
  });

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'centers'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      setCenters(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching centers:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAutoLocation = () => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      setError(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          }));
          setLocationLoading(false);
          alert("Location detected successfully!");
        },
        (error) => {
          console.error("Geolocation Error:", error);
          let errorMsg = "Failed to get location. ";
          if (error.code === error.PERMISSION_DENIED) errorMsg += "Permission denied by browser.";
          else if (error.code === error.POSITION_UNAVAILABLE) errorMsg += "Position unavailable.";
          else if (error.code === error.TIMEOUT) errorMsg += "Request timed out.";
          setError(errorMsg);
          setLocationLoading(false);
          alert(errorMsg);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      // Check for duplicate code
      

      formData.code = formData.code.trim().toUpperCase();
      
      const dataToSave = {
        ...formData,
        latitude: parseFloat(formData.latitude) || 0,
        longitude: parseFloat(formData.longitude) || 0,
        geofenceRadius: parseInt(formData.geofenceRadius) || 200,
        updatedAt: serverTimestamp()
      };

              const adminStr = localStorage.getItem('userSession');
        let adminName = 'Admin';
        if (adminStr) {
          try {
            const adminData = JSON.parse(atob(adminStr));
            adminName = adminData.name || 'Admin';
          } catch(e) {}
        }
      if (editingId) {
        const oldCenter = centers.find(c => c.id === editingId);
        await updateDoc(doc(db, 'centers', editingId), dataToSave);
        
        // Log changes

        
        let diffs = [];
        if (oldCenter?.name !== dataToSave.name) diffs.push(`Name: ${oldCenter?.name || ''} -> ${dataToSave.name}`);
        if (oldCenter?.status !== dataToSave.status) diffs.push(`Status: ${oldCenter?.status || ''} -> ${dataToSave.status}`);
        if (oldCenter?.geofenceRadius !== dataToSave.geofenceRadius) diffs.push(`Radius: ${oldCenter?.geofenceRadius || ''} -> ${dataToSave.geofenceRadius}`);
        if (oldCenter?.latitude !== dataToSave.latitude || oldCenter?.longitude !== dataToSave.longitude) diffs.push(`GPS updated`);
        
        if (diffs.length > 0) {
          logAuditActivity(adminName, 'Center', dataToSave.name, 'Update', diffs.join(', '), {
            role: 'Admin',
            userName: adminName,
            moduleName: 'Center Management',
            action: 'Update',
            centerCode: dataToSave.code,
            centerName: dataToSave.name,
            newValue: diffs.join(', ')
          });
        }

        setShowForm(false);
        setEditingId(null);
        
      } else {
        const newDoc = await addDoc(collection(db, 'centers'), {
          ...dataToSave,
          createdAt: serverTimestamp()
        });
        logAuditActivity(adminName, 'Center', dataToSave.name, 'Create', `Created center ${dataToSave.name}`, {
          role: 'Admin',
          userName: adminName,
          moduleName: 'Center Management',
          action: 'Create',
          centerCode: dataToSave.code,
          centerName: dataToSave.name,
          newValue: JSON.stringify(dataToSave)
        });
        
        setShowForm(false);
        // "Immediately after creating a Center, open Staff Creation automatically."
        navigate('/admin/staff', { state: { autoOpenCreate: true, defaultCenterId: newDoc.id } });
      }
    } catch (err) {
      console.error(err);
      setError('Failed to save center.');
    } finally {
      setSaving(false);
    }
  };



  const handleRemoveDuplicates = async () => {
    if (!window.confirm("This will remove duplicate Centers with the same Code. Proceed?")) return;
    setLoading(true);
    try {
      const q = query(collection(db, 'centers'));
      const snapshot = await getDocs(q);
      const allCenters = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      
      const seenCodes = new Set();
      const duplicatesToDelete = [];
      
      // Sort by createdAt so we keep the oldest one
      allCenters.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeA - timeB;
      });
      
      for (const center of allCenters) {
        if (!center.code) continue; // Skip if no code
        
        if (seenCodes.has(center.code)) {
          // This is a duplicate
          duplicatesToDelete.push(center.id);
        } else {
          seenCodes.add(center.code);
        }
      }
      
      if (duplicatesToDelete.length === 0) {
        alert("No duplicates found.");
      } else {
        for (const id of duplicatesToDelete) {
          await deleteDoc(doc(db, 'centers', id));
        }
        alert(`Successfully removed ${duplicatesToDelete.length} duplicate centers.`);
        
      }
    } catch (err) {
      console.error("Error removing duplicates:", err);
      alert("Failed to remove duplicates.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (centerId: string, centerName: string) => {
    if (!window.confirm(`Are you sure you want to delete ${centerName}?`)) return;
    
    // Check for linked staff
    try {
      const staffQuery = query(collection(db, 'staff'), where('centerId', '==', centerId));
      const staffSnap = await getDocs(staffQuery);
      
      if (!staffSnap.empty) {
        alert("This Center contains Staff. Delete all Staff first or move them to another Center.");
        return;
      }
      
      await deleteDoc(doc(db, 'centers', centerId));
      
      // Log audit
      const adminStr = localStorage.getItem('userSession');
      let adminName = 'Admin';
      if (adminStr) {
        try {
          const adminData = JSON.parse(atob(adminStr));
          adminName = adminData.name || 'Admin';
        } catch(e) {}
      }
      logAuditActivity(adminName, 'Center', centerName, 'Delete', `Deleted center ${centerName}`, {
        role: 'Admin',
        userName: adminName,
        moduleName: 'Center Management',
        action: 'Delete',
        centerName: centerName
      });
      
      
    } catch (err) {
      console.error("Error deleting center", err);
      alert("Failed to delete center.");
    }
  };

  const handleEdit = (center: any) => {
    setFormData({
      name: center.name || '',
      code: center.code || '',
      email: center.email || '',
      mobile: center.mobile || '',
      district: center.district || '',
      block: center.block || '',
      address: center.address || '',
      latitude: center.latitude?.toString() || '',
      longitude: center.longitude?.toString() || '',
      geofenceRadius: center.geofenceRadius?.toString() || '200',
      status: center.status || 'Active',
      pin: center.pin || ''
    });
    setEditingId(center.id);
    setShowForm(true);
  };

  const filteredCenters = centers.filter(c => {
    const term = searchTerm.toLowerCase();
    return (
      (c.name || '').toLowerCase().includes(term) ||
      (c.code || '').toLowerCase().includes(term) ||
      (c.district || '').toLowerCase().includes(term) ||
      (c.block || '').toLowerCase().includes(term) ||
      (c.status || '').toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans pb-20">
      <div className="bg-blue-700 text-white p-6 shadow-md relative z-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/admin-dashboard')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-tight uppercase">Centers</h1>
              <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5">Manage All Centers</p>
            </div>
          </div>
          {!showForm && (
            <button onClick={handleRemoveDuplicates} className="bg-rose-600 text-white p-2 rounded-full shadow-sm text-xs font-bold px-3 mr-2">
              Fix Dups
            </button>
          )}
          {!showForm && (
            <button 
              onClick={() => {
                setFormData({ name: '', code: '', email: '', mobile: '', district: '', block: '', address: '', latitude: '', longitude: '', geofenceRadius: '200', status: 'Active',
    pin: '' });
                setEditingId(null);
                setShowForm(true);
              }}
              className="bg-white text-blue-700 p-2 rounded-full shadow-sm"
            >
              <Plus size={24} />
            </button>
          )}
        </div>
        
        {!showForm && (
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by center name, code or district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-blue-200 focus:outline-none focus:bg-white/20 transition-all"
            />
          </div>
        )}
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <AnimatePresence>
          {showForm ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-5 rounded-xl shadow-sm border border-slate-200"
            >
              <h2 className="text-lg font-bold text-slate-800 mb-4">{editingId ? 'Edit Center' : 'Create New Center'}</h2>
              
              {error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200 font-bold">{error}</div>}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Center Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Center Code *</label>
                    <input type="text" name="code" required value={formData.code} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none uppercase" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Center Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Mobile Number</label>
                    <input type="tel" name="mobile" required value={formData.mobile} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">District</label>
                    <input type="text" name="district" required value={formData.district} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Block</label>
                    <input type="text" name="block" required value={formData.block} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-600 mb-1">Full Address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none h-20" />
                  </div>
                  
                  <div className="md:col-span-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-xs font-bold text-blue-800">GPS Location</label>
                      <button type="button" onClick={handleAutoLocation} disabled={locationLoading} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-full font-bold uppercase hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1">{locationLoading ? <><RefreshCw className="animate-spin" size={12} /> Detecting...</> : "Auto Detect"}</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Latitude *</label>
                        <input type="text" name="latitude" required value={formData.latitude} onChange={handleChange} className="w-full p-2 bg-white border border-slate-200 rounded outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Longitude *</label>
                        <input type="text" name="longitude" required value={formData.longitude} onChange={handleChange} className="w-full p-2 bg-white border border-slate-200 rounded outline-none" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Geofence Radius (Meter) *</label>
                    <input 
                      type="number" 
                      name="geofenceRadius" 
                      required 
                      value={formData.geofenceRadius} 
                      onChange={handleChange} 
                      list="geofenceOptions"
                      placeholder="Select or type radius (e.g. 250)"
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" 
                    />
                    <datalist id="geofenceOptions">
                      <option value="200">200</option>
                      <option value="300">300</option>
                      <option value="400">400</option>
                      <option value="500">500</option>
                      <option value="700">700</option>
                    </datalist>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Status *</label>
                    <select name="status" required value={formData.status} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none cursor-pointer">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">4-Digit Center PIN *</label>
                    <div className="relative">
                      <input type={showPin ? "text" : "password"} name="pin" required value={formData.pin} onChange={(e) => setFormData({...formData, pin: e.target.value.replace(/\D/g, '').slice(0, 4)})} placeholder="e.g. 1234" maxLength={4} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none tracking-widest font-mono pr-10" />
                      <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showPin ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200">Cancel</button>
                  <button type="submit" disabled={saving} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">{saving ? 'Saving...' : 'Save Center'}</button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div className="space-y-3">
              {loading ? (
                <div className="text-center py-10 text-slate-500 font-bold text-sm uppercase">Loading Centers...</div>
              ) : filteredCenters.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <Building2 size={48} className="mx-auto mb-3 opacity-20" />
                  <p className="font-bold text-sm uppercase">No Centers Found</p>
                </div>
              ) : (
                filteredCenters.map(center => (
                  <div key={center.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col relative overflow-hidden">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${center.status === 'Inactive' ? 'bg-slate-300' : 'bg-blue-500'}`}></div>
                    <div className="flex justify-between items-start mb-2 pl-2">
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg leading-tight">{center.name}</h3>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{center.code}</p>
                      </div>
                      <select 
                        value={center.status}
                        onChange={async (e) => {
                          const newStatus = e.target.value;
                          try {
                            await updateDoc(doc(db, 'centers', center.id), { status: newStatus });
                            alert(`Center status updated to ${newStatus}`);
                          } catch (err) {
                            alert('Failed to update status');
                          }
                        }}
                        className={`text-[10px] font-bold uppercase rounded px-2 py-1 outline-none ${center.status === 'Inactive' ? 'bg-slate-200 text-slate-600' : 'bg-blue-100 text-blue-700'}`}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${center.status === 'Inactive' ? 'bg-slate-100 text-slate-500' : 'bg-green-100 text-green-700'}`}>
                        {center.status || 'Active'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pl-2 mt-2">
                      <div className="flex items-center gap-1"><MapPin size={12}/> {center.district || 'N/A'}</div>
                      <div>Radius: {center.geofenceRadius || 200}m</div>
                      {center.mobile && <div className="col-span-2">Ph: {center.mobile}</div>}
                    </div>
                    
                    <div className="flex gap-2 mt-4 pl-2 pt-3 border-t border-slate-100">
                      <button onClick={() => handleEdit(center)} className="flex-1 py-1.5 bg-blue-50 text-blue-700 font-bold text-xs uppercase rounded hover:bg-blue-100 flex justify-center items-center gap-1">
                        <Edit size={14} /> Edit
                      </button>
                      <button onClick={() => navigate('/admin/staff', { state: { filterCenterId: center.id } })} className="flex-1 py-1.5 bg-slate-100 text-slate-700 font-bold text-xs uppercase rounded hover:bg-slate-200 flex justify-center items-center gap-1">
                        Staff
                      </button>
                      <button onClick={() => handleDelete(center.id, center.name)} className="flex-1 py-1.5 bg-red-50 text-red-600 font-bold text-xs uppercase rounded hover:bg-red-100 flex justify-center items-center gap-1">
                        <Trash2 size={14} /> Del
                      </button>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
