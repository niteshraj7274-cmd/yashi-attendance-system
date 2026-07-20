import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Building2, Plus, Search, Users, UserCircle, MapPin, Edit, Camera, Trash2 } from 'lucide-react';
import { collection, query, getDocs, updateDoc, doc, addDoc, serverTimestamp, where, deleteDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';
import { compressImage } from '../utils/imageCompression';
import { uploadWithRetry } from '../utils/uploadHelpers';
import { logAuditActivity } from '../utils/auditHelpers';

function generateStaffCode() {
  return 'STAFF-' + Math.floor(100000 + Math.random() * 900000);
}

export default function AdminStaffManagementScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [staff, setStaff] = useState<any[]>([]);
  
  const [currentUserRole, setCurrentUserRole] = useState('admin');
  useEffect(() => {
    const sessionStr = localStorage.getItem('userSession');
    if (sessionStr) {
      try {
        const session = JSON.parse(atob(sessionStr));
        setCurrentUserRole(session.role || 'admin');
      } catch (e) {
        try {
          const session = JSON.parse(sessionStr);
          setCurrentUserRole(session.role || 'admin');
        } catch (err) {}
      }
    }
  }, []);
  
  const canEditSalarySettings = currentUserRole === 'admin' || currentUserRole === 'System Admin' || currentUserRole === 'Center Coordinator';

  const [centers, setCenters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [activeTab, setActiveTab] = useState('personal'); // personal, salary
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    dob: '',
    gender: 'Male',
    pin: '1234',
    mobile: '',
    email: '',
    staffId: '',
    designation: 'Other Staff',
    joiningDate: new Date().toISOString().split('T')[0],
    qualification: '',
    experience: '',
    address: '',
    status: 'Active',
    centerId: '',
    photoUrl: '',
    monthlyGrossSalary: 0,
pf: 0,
esi: 0,
bankName: '',
    accountNumber: '',
    ifscCode: '',
    paymentMode: 'Bank Transfer',
    salaryProcessingEnabled: false,
    lateDeductionEnabled: true
  });

  useEffect(() => {
    
    
    // Handle Auto Open from Center Creation
    if (location.state?.autoOpenCreate) {
      setFormData(prev => ({
        ...prev,
        staffId: generateStaffCode(),
        centerId: location.state.defaultCenterId || ''
      }));
      setShowForm(true);
      // Clean up state
      window.history.replaceState({}, document.title);
    }
    
    if (location.state?.filterCenterId) {
      setFormData(prev => ({ ...prev, centerId: location.state.filterCenterId }));
      setSearchTerm('');
    }
  }, [location.state]);

  const fetchData = () => {}; // Replaced with onSnapshot in useEffect

  useEffect(() => {
    setLoading(true);
    const qCenters = query(collection(db, 'centers'));
    const unSubCenters = onSnapshot(qCenters, (snapshot) => {
      const cData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      setCenters(cData);
    });

    const qStaff = query(collection(db, 'staff'));
    const unSubStaff = onSnapshot(qStaff, (snapshot) => {
      const sData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      setStaff(sData);
      setLoading(false);
    });

    return () => {
      unSubCenters();
      unSubStaff();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      
      if (!formData.centerId) {
        setActiveTab('personal');
        setError('Please select a center.');
        setSaving(false);
        return;
      }
      if (!formData.name || !formData.fatherName || !formData.staffId) {
        setActiveTab('personal');
        setError('Please fill all required personal details (Name, Father\'s Name, Staff ID).');
        setSaving(false);
        return;
      }

      
      formData.staffId = formData.staffId.trim().toUpperCase();
      const idQuery = query(collection(db, 'staff'), where('staffId', '==', formData.staffId));
      const idSnapshot = await getDocs(idQuery);
      const duplicate = idSnapshot.docs.find(d => d.id !== editingId);
      if (duplicate) {
        setError('Staff Code already exists. Must be unique.');
        setSaving(false);
        return;
      }
      
      const centerObj = centers.find(c => c.id === formData.centerId);

      let finalPhotoUrl = formData.photoUrl;
      
      // Upload new photo if it's base64
      if (finalPhotoUrl && finalPhotoUrl.startsWith('data:image')) {
        const compressed = await compressImage(finalPhotoUrl, 800, 800, 0.7);
        const imageRef = ref(storage, `staff_photos/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`);
        finalPhotoUrl = await uploadWithRetry(async () => {
          const uploadResult = await uploadString(imageRef, compressed, 'data_url');
          return await getDownloadURL(uploadResult.ref);
        });
      }

      const dataToSave = {
        name: formData.name,
        fatherName: formData.fatherName,
        dob: formData.dob,
        gender: formData.gender,
        mobile: formData.mobile,
        email: formData.email,
        staffId: formData.staffId,
        designation: formData.designation,
        joiningDate: formData.joiningDate,
        qualification: formData.qualification,
        experience: formData.experience,
        address: formData.address,
        status: formData.status,
        centerId: formData.centerId,
        centerCode: centerObj?.code || '',
        centerName: centerObj?.name || '',
        photoUrl: finalPhotoUrl,
        monthlyGrossSalary: Number(formData.monthlyGrossSalary),
        pf: Number(formData.pf),
        esi: Number(formData.esi),
        
        
        grossSalary: Number(formData.monthlyGrossSalary),
        netSalary: (Number(formData.monthlyGrossSalary)) - (Number(formData.pf) + Number(formData.esi)),
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode,
        paymentMode: formData.paymentMode,
        salaryProcessingEnabled: formData.salaryProcessingEnabled,
        lateDeductionEnabled: formData.lateDeductionEnabled,
        pin: formData.pin || '1234',
        isDeleted: false,
        updatedAt: serverTimestamp()
      };

      if (editingId) {
        const oldStaff = staff.find(s => s.id === editingId);
        await updateDoc(doc(db, 'staff', editingId), dataToSave);
        
        // Log changes
        const adminStr = localStorage.getItem('userSession');
        let adminName = 'Admin';
        if (adminStr) {
          try {
            const adminData = JSON.parse(atob(adminStr));
            adminName = adminData.name || 'Admin';
          } catch(e) {}
        }
        
        let diffs = [];
        if (oldStaff?.name !== dataToSave.name) diffs.push(`Name: ${oldStaff?.name || ''} -> ${dataToSave.name}`);
        if (oldStaff?.designation !== dataToSave.designation) diffs.push(`Role: ${oldStaff?.designation || ''} -> ${dataToSave.designation}`);
        if (oldStaff?.status !== dataToSave.status) diffs.push(`Status: ${oldStaff?.status || ''} -> ${dataToSave.status}`);
        if (oldStaff?.monthlyGrossSalary !== dataToSave.monthlyGrossSalary) diffs.push(`Salary: ${oldStaff?.monthlyGrossSalary || ''} -> ${dataToSave.monthlyGrossSalary}`);
        if (oldStaff?.salaryProcessingEnabled !== dataToSave.salaryProcessingEnabled) diffs.push(`Salary Proc: ${oldStaff?.salaryProcessingEnabled} -> ${dataToSave.salaryProcessingEnabled}`);
        if (oldStaff?.lateDeductionEnabled !== dataToSave.lateDeductionEnabled) diffs.push(`Late Ded: ${oldStaff?.lateDeductionEnabled} -> ${dataToSave.lateDeductionEnabled}`);
        if (oldStaff?.pin !== dataToSave.pin) diffs.push(`PIN changed`);
        
        if (diffs.length > 0) {
          logAuditActivity(adminName, 'Staff', dataToSave.name, 'Updated Staff', diffs.join(', '));
        }
      } else {
        await addDoc(collection(db, 'staff'), {
          ...dataToSave,
          createdAt: serverTimestamp()
        });
      }
      
      setShowForm(false);
      setEditingId(null);
      
    } catch (err) {
      console.error(err);
      setError('Failed to save staff details.');
    } finally {
      setSaving(false);
    }
  };



  const handleRemoveDuplicates = async () => {
    if (!window.confirm("This will remove duplicate Staff with the same Staff ID. Proceed?")) return;
    setLoading(true);
    try {
      const q = query(collection(db, 'staff'));
      const snapshot = await getDocs(q);
      const allStaff = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      
      const seenIds = new Set();
      const duplicatesToDelete = [];
      
      allStaff.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeA - timeB;
      });
      
      for (const st of allStaff) {
        if (!st.staffId) continue;
        
        if (seenIds.has(st.staffId)) {
          duplicatesToDelete.push(st.id);
        } else {
          seenIds.add(st.staffId);
        }
      }
      
      if (duplicatesToDelete.length === 0) {
        alert("No duplicates found.");
      } else {
        for (const id of duplicatesToDelete) {
          await deleteDoc(doc(db, 'staff', id));
        }
        alert(`Successfully removed ${duplicatesToDelete.length} duplicate staff members.`);
        
      }
    } catch (err) {
      console.error("Error removing duplicates:", err);
      alert("Failed to remove duplicates.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (staffId: string, staffName: string) => {
    if (!window.confirm(`Are you sure you want to delete ${staffName}?`)) return;
    
    try {
      await deleteDoc(doc(db, 'staff', staffId));
      
      // Log audit
      const adminStr = localStorage.getItem('userSession');
      let adminName = 'Admin';
      if (adminStr) {
        try {
          const adminData = JSON.parse(atob(adminStr));
          adminName = adminData.name || 'Admin';
        } catch(e) {}
      }
      logAuditActivity(adminName, 'Staff', staffName, 'Deleted Staff', `Deleted staff ${staffName}`);
      
      
    } catch (err) {
      console.error("Error deleting staff", err);
      alert("Failed to delete staff.");
    }
  };

  const handleEdit = (s: any) => {
    setFormData({
      pin: s.pin || '1234',
      monthlyGrossSalary: s.monthlyGrossSalary || 0,
pf: s.pf || 0,
esi: s.esi || 0,
bankName: s.bankName || '',
      accountNumber: s.accountNumber || '',
      ifscCode: s.ifscCode || '',
      paymentMode: s.paymentMode || 'Bank Transfer',
      salaryProcessingEnabled: s.salaryProcessingEnabled || false,
      lateDeductionEnabled: s.lateDeductionEnabled ?? true,
      name: s.name || '',
      fatherName: s.fatherName || '',
      dob: s.dob || '',
      gender: s.gender || 'Male',
      mobile: s.mobile || '',
      email: s.email || '',
      staffId: s.staffId || '',
      designation: s.designation || 'Other Staff',
      joiningDate: s.joiningDate || new Date().toISOString().split('T')[0],
      qualification: s.qualification || '',
      experience: s.experience || '',
      address: s.address || '',
      status: s.status || 'Active',
      centerId: s.centerId || '',
      photoUrl: s.photoUrl || ''
    });
    setEditingId(s.id);
    setShowForm(true);
  };

  const filteredStaff = staff.filter(s => {
    const term = searchTerm.toLowerCase();
    const c = centers.find(c => c.id === s.centerId) || {};
    return (
      (s.name || '').toLowerCase().includes(term) ||
      (s.staffId || '').toLowerCase().includes(term) ||
      (s.centerName || '').toLowerCase().includes(term) ||
      (s.centerCode || '').toLowerCase().includes(term) ||
      (s.designation || '').toLowerCase().includes(term) ||
      (s.status || '').toLowerCase().includes(term) ||
      (c.district || '').toLowerCase().includes(term) ||
      (c.block || '').toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans pb-20">
      <div className="bg-indigo-700 text-white p-6 shadow-md relative z-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/admin-dashboard')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-tight uppercase">Staff</h1>
              <p className="text-[10px] text-indigo-200 uppercase tracking-widest mt-0.5">Manage Personnel</p>
            </div>
          </div>
          {!showForm && (
            <button onClick={handleRemoveDuplicates} className="bg-rose-600 text-white p-2 rounded-full shadow-sm text-xs font-bold px-3">
              Fix Dups
            </button>
          )}
          {!showForm && (
            <button 
              onClick={() => {
                setFormData({
                  name: '', fatherName: '', dob: '', gender: 'Male',
    pin: '1234', mobile: '', email: '',
                  staffId: generateStaffCode(), designation: 'Other Staff', 
                  joiningDate: new Date().toISOString().split('T')[0],
                  qualification: '', experience: '', address: '', status: 'Active', 
                  centerId: '', photoUrl: '',
                  monthlyGrossSalary: 0,
pf: 0,
esi: 0,
bankName: '', accountNumber: '', ifscCode: '', paymentMode: 'Bank Transfer',
                  salaryProcessingEnabled: false, lateDeductionEnabled: true
                });
                setActiveTab('personal');
                setEditingId(null);
                setShowForm(true);
              }}
              className="bg-white text-indigo-700 p-2 rounded-full shadow-sm"
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
              placeholder="Search staff name, ID, or center..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-indigo-200 focus:outline-none focus:bg-white/20 transition-all"
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
              <h2 className="text-lg font-bold text-slate-800 mb-4">{editingId ? 'Edit Staff' : 'Create New Staff'}</h2>
              
              {error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200 font-bold">{error}</div>}
              
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                    {formData.photoUrl ? (
                      <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <UserCircle size={40} className="text-slate-300" />
                    )}
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-md"
                  >
                    <Camera size={16} />
                  </button>
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    onChange={handlePhotoCapture} 
                    className="hidden" 
                  />
                </div>
              </div>

              <div className="flex gap-2 mb-4 border-b border-slate-200">
                <button 
                  type="button" 
                  onClick={() => setActiveTab('personal')} 
                  className={`pb-2 px-1 text-sm font-bold ${activeTab === 'personal' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}`}
                >
                  Personal Details
                </button>
                <button 
                  type="button" 
                  onClick={() => setActiveTab('salary')} 
                  className={`pb-2 px-1 text-sm font-bold ${activeTab === 'salary' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}`}
                >
                  Salary Setup
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === 'personal' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-600 mb-1">Select Center *</label>
                    <select name="centerId" required value={formData.centerId} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none font-bold text-indigo-700">
                      <option value="">-- Select Center --</option>
                      {centers.filter(c => c.status !== 'Inactive').map(c => (
                        <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Staff Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Father's Name *</label>
                    <input type="text" name="fatherName" required value={formData.fatherName} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Staff ID / Code *</label>
                    <input type="text" name="staffId" required value={formData.staffId} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded outline-none uppercase font-bold text-slate-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Role / Designation *</label>
                    <select name="designation" required value={formData.designation} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none">
                      <option value="Super Admin">Super Admin</option>
                      <option value="System Admin">System Admin</option>
                      <option value="Center Coordinator">Center Coordinator</option>
                      <option value="System Admin & L.F.">System Admin & L.F.</option>
                      <option value="Admission & L.F.">Admission & L.F.</option>
                      <option value="Mobilization L.F.">Mobilization L.F.</option>
                      <option value="Night Guard">Night Guard</option>
                      <option value="Safai Karmchari">Safai Karmchari</option>
                      <option value="Other Staff">Other Staff</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Mobile Number *</label>
                    <input type="tel" name="mobile" required value={formData.mobile} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Date of Birth</label>
                    <input type="date" name="dob" required value={formData.dob} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Gender</label>
                    <select name="gender" required value={formData.gender} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none cursor-pointer">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Joining Date *</label>
                    <input type="date" name="joiningDate" required value={formData.joiningDate} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Login PIN</label>
                    <input type="text" name="pin" maxLength={4} value={formData.pin} onChange={(e) => setFormData({...formData, pin: e.target.value.replace(/\D/g, '').slice(0, 4)})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none tracking-widest" placeholder="1234" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Status *</label>
                    <select name="status" required value={formData.status} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none cursor-pointer">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>


                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Qualification</label>
                    <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Experience</label>
                    <input type="text" name="experience" value={formData.experience} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-600 mb-1">Full Address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none h-16" />
                  </div>
                </div>
                )}
                
                {activeTab === 'salary' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 bg-indigo-50 p-3 rounded-lg border border-indigo-100 mb-2">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-indigo-900 text-sm">Salary Processing</h4>
                        <p className="text-[10px] text-indigo-700">Enable to process monthly salary for this staff</p>
                      </div>
                      <label className={`relative inline-flex items-center ${canEditSalarySettings ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
                        <input type="checkbox" disabled={!canEditSalarySettings} checked={formData.salaryProcessingEnabled} onChange={(e) => setFormData({...formData, salaryProcessingEnabled: e.target.checked})} className="sr-only peer" />
                        <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-indigo-900 text-sm">Late Attendance Deduction</h4>
                        <p className="text-[10px] text-indigo-700">Deduct salary automatically for late attendance</p>
                      </div>
                      <label className={`relative inline-flex items-center ${canEditSalarySettings ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
                        <input type="checkbox" disabled={!canEditSalarySettings} checked={formData.lateDeductionEnabled} onChange={(e) => setFormData({...formData, lateDeductionEnabled: e.target.checked})} className="sr-only peer" />
                        <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Basic Salary</label>
                    <input type="number" name="monthlyGrossSalary" value={formData.monthlyGrossSalary} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">PF Deduction</label>
                    <input type="number" name="pf" value={formData.pf} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">ESI Deduction</label>
                    <input type="number" name="esi" value={formData.esi} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  <div className="md:col-span-2 bg-slate-100 p-3 rounded-lg flex justify-between items-center border border-slate-200">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-500">Gross Salary</span>
                      <span className="text-sm font-bold text-slate-800">₹{(Number(formData.monthlyGrossSalary)).toFixed(2)}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] uppercase font-bold text-emerald-600">Net Salary</span>
                      <span className="text-lg font-black text-emerald-700">₹{((Number(formData.monthlyGrossSalary)) - (Number(formData.pf) + Number(formData.esi))).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 mt-2">
                    <h4 className="font-bold text-slate-700 text-sm mb-2 border-b border-slate-200 pb-1">Bank Details</h4>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Bank Name</label>
                    <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Account Number</label>
                    <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">IFSC Code</label>
                    <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none uppercase" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Payment Mode</label>
                    <select name="paymentMode" value={formData.paymentMode} onChange={handleChange} className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white outline-none">
                      <option value="Center Coordinator Payment">Center Coordinator Payment</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="YASHI SKILL PROJECT PVT. LTD. UPI Payment">YASHI SKILL PROJECT PVT. LTD. UPI Payment</option>
                    </select>
                  </div>
                </div>
                )}
                
                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200">Cancel</button>
                  <button type="submit" disabled={saving} className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">{saving ? 'Saving...' : 'Save Staff'}</button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div className="space-y-3">
              {loading ? (
                <div className="text-center py-10 text-slate-500 font-bold text-sm uppercase">Loading Staff...</div>
              ) : filteredStaff.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <Users size={48} className="mx-auto mb-3 opacity-20" />
                  <p className="font-bold text-sm uppercase">No Staff Found</p>
                </div>
              ) : (
                filteredStaff.map(s => (
                  <div key={s.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-start gap-3 relative overflow-hidden">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${s.status === 'Inactive' ? 'bg-slate-300' : 'bg-indigo-500'}`}></div>
                    
                    <div className="w-12 h-12 rounded-full bg-slate-100 shrink-0 overflow-hidden ml-1">
                      {s.photoUrl ? (
                        <img src={s.photoUrl} alt={s.name} className="w-full h-full object-cover" />
                      ) : (
                        <UserCircle size={48} className="text-slate-300" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="font-bold text-slate-800 leading-tight">{s.name}</h3>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.staffId}</p>
                        </div>
                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${s.status === 'Inactive' ? 'bg-slate-100 text-slate-500' : 'bg-green-100 text-green-700'}`}>
                          {s.status || 'Active'}
                        </span>
                      </div>
                      
                      <div className="text-xs font-bold text-indigo-600 bg-indigo-50 inline-block px-2 py-0.5 rounded mb-2">
                        {s.designation}
                      </div>
                      
                      <div className="text-xs text-slate-600 mb-3 border-t border-slate-100 pt-2 flex flex-col gap-1">
                        <div className="flex items-center gap-1 font-medium"><Building2 size={12}/> {s.centerName || s.centerCode || 'Unassigned'}</div>
                        {s.mobile && <div className="flex items-center gap-1 font-medium text-slate-500">Ph: {s.mobile}</div>}
                        <div className="flex items-center gap-1 font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded w-fit">PIN: {s.pin || '1234'}</div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(s)} className="flex-1 py-1.5 bg-indigo-50 text-indigo-700 font-bold text-xs uppercase rounded hover:bg-indigo-100 flex justify-center items-center gap-1">
                          <Edit size={14} /> Edit
                        </button>
                        <button onClick={() => handleDelete(s.id, s.name)} className="flex-1 py-1.5 bg-red-50 text-red-600 font-bold text-xs uppercase rounded hover:bg-red-100 flex justify-center items-center gap-1">
                          <Trash2 size={14} /> Del
                        </button>
                      </div>
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
