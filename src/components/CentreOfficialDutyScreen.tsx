import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Clock, MapPin, AlertCircle, FileText, Plus, UserCircle } from 'lucide-react';
import { collection, query, where, getDocs, doc, serverTimestamp, addDoc, onSnapshot, getDoc } from 'firebase/firestore';
import { validateRequestSubmission } from '../utils/validationHelpers';
import { logAuditActivity } from '../utils/auditHelpers';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';


function CustomDropdown({ value, onChange, options, placeholder }: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none flex justify-between items-center cursor-pointer"
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
              className="p-3 text-sm hover:bg-blue-50 active:bg-blue-100 cursor-pointer border-b border-slate-50 last:border-0 font-medium"
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

export default function CentreOfficialDutyScreen() {
  const navigate = useNavigate();
  const { centerId } = useParams();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [centerName, setCenterName] = useState('');
  const [centerCode, setCenterCode] = useState('');
  
  const [statusFilter, setStatusFilter] = useState('Pending Approval');
  
  // New Request State
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [staffList, setStaffList] = useState<any[]>([]);
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [dutyType, setDutyType] = useState('Field Visit');
  const [dutyTypesList, setDutyTypesList] = useState<string[]>([
    'Field Visit',
    'Training',
    'Meeting',
    'Inspection',
    'Mobilization',
    'Government Work',
    'Office Work',
    'Exam Duty',
    'Official Tour',
    'Other'
  ]);
  const [otherDutyType, setOtherDutyType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [location, setLocation] = useState('');

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
      
      // Fetch Duty Types
      try {
        const dtSnap = await getDocs(collection(db, 'official_duty_types'));
        if (!dtSnap.empty) {
          const types: string[] = [];
          dtSnap.forEach(doc => {
            if (doc.data().name) types.push(doc.data().name);
          });
          if (types.length > 0) {
            if (!types.includes('Other')) types.push('Other');
            setDutyTypesList(types);
            if (!types.includes('Field Visit')) setDutyType(types[0]);
          }
        }
      } catch (e) {
        console.error("Error fetching duty types", e);
      }
      
      // Get Staff List for this center
      const staffSnap = await getDocs(query(collection(db, 'staff'), where('centerId', '==', centerId)));
      const staffData: any[] = [];
      staffSnap.forEach(s => {
        const data = s.data();
        if (data.status !== 'Inactive') {
          staffData.push({ id: s.id, ...data });
        }
      });
      setStaffList(staffData);
    };
    getCenter();

    // Query Official Duty requests for this center
    const q = query(
      collection(db, 'official_duty_requests'),
      where('Center ID', '==', centerId)
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
    if (!selectedStaffId || !date || !time || !reason || !location) return alert('Please fill all fields');
    
    const staff = staffList.find(s => s.id === selectedStaffId);
    if (!staff) { alert("Staff not found"); return; }
    
    const validation = await validateRequestSubmission(staff.id, date, date, 'Official Duty');
    if (!validation.valid) { alert(validation.message); return; }

    setSubmitting(true);
    try {
      
      
      const newRequest = {
        staffUid: staff ? staff.id : '',
        'Staff ID': staff ? (staff.staffId || '') : 'N/A',
        'Staff Name': staff ? (staff.name || '') : selectedStaffId,
        'Center ID': centerId,
        'Center Code': centerCode,
        'Center Name': centerName,
        'Date': date,
        'Time': time,
        'Duty Type': dutyType === 'Other' ? otherDutyType : dutyType,
        'Reason': reason,
        'Location': location,
        Status: 'Pending Approval',
        'Request Date & Time': new Date().toISOString(),
        timestamp: serverTimestamp()
      };
      
      await addDoc(collection(db, 'official_duty_requests'), newRequest);
      
      setShowForm(false);
      setSelectedStaffId('');
      setOtherDutyType('');
      setDate('');
      setTime('');
      setReason('');
      setLocation('');
    } catch (err) {
      console.error(err);
      alert('Failed to submit request');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredRequests = requests.filter(r => {
    return r.Status === statusFilter;
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
          <h1 className="text-xl font-bold tracking-tight uppercase truncate">Official Duty</h1>
          <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5 truncate">{centerName}</p>
        </div>
        <button onClick={() => setShowForm(true)} className="p-2 bg-blue-700 hover:bg-blue-600 rounded-full transition-colors">
          <Plus size={20} />
        </button>
      </div>

      <div className="bg-white px-4 py-3 shadow-sm z-20 flex gap-2 overflow-x-auto border-b border-slate-200 hide-scrollbar shrink-0">
        {['Pending Approval', 'Approved', 'Rejected'].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              statusFilter === status 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
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
            
              {filteredRequests.map(req => (
                <div
                  key={req.id}
className="bg-white rounded-xl shadow-sm border border-slate-200 p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">{req['Staff Name']}</h3>
                      <p className="text-xs text-slate-500 font-medium">{req['Staff ID']} • {req['Duty Type']}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      req.Status === 'Pending Approval' ? 'bg-amber-100 text-amber-700' :
                      req.Status === 'Approved' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {req.Status}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg mb-3">
                    <MapPin size={16} className="text-blue-500 shrink-0" />
                    <span className="font-medium truncate">{req['Location'] || req['Center Name']}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Date</p>
                      <p className="text-sm font-semibold">{req['Date']}</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Time</p>
                      <p className="text-sm font-semibold">{req['Time']}</p>
                    </div>
                  </div>

                  <div className="bg-amber-50 text-amber-800 p-3 rounded-lg text-sm">
                    <span className="font-bold uppercase tracking-wider text-[10px] block mb-1">Reason</span>
                    {req['Reason']}
                  </div>
                  
                  {req['Admin Remarks'] && (
                    <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm mt-3 border border-blue-100">
                      <span className="font-bold uppercase tracking-wider text-[10px] block mb-1">Admin Remarks</span>
                      {req['Admin Remarks']}
                    </div>
                  )}
                </div>
              ))}
            
          </div>
        )}
      </div>
      
      {/* Create Request Modal */}
      
        {showForm && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex flex-col justify-end sm:justify-center sm:items-center">
            <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-xl flex flex-col max-h-[90vh]"
            >
              <div className="bg-blue-900 p-4 rounded-t-2xl flex items-center justify-between text-white shrink-0">
                <h3 className="font-bold uppercase tracking-wide text-sm">New Official Duty</h3>
                <button onClick={() => setShowForm(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                  <XCircle size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex-1 flex flex-col gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Select Staff</label>
                  <CustomDropdown 
    value={selectedStaffId}
    onChange={setSelectedStaffId}
    placeholder="-- Select Staff --"
    options={staffList.map(s => ({ value: s.id, label: s.name + ' (' + s.staffId + ')' }))}
  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Duty Type</label>
                  <CustomDropdown 
    value={dutyType}
    onChange={setDutyType}
    placeholder="-- Select Duty Type --"
    options={dutyTypesList.map(t => ({ value: t, label: t }))}
  />
                </div>
                
                {dutyType === 'Other' && (
      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Custom Duty Type</label>
        <input 
          type="text"
          value={otherDutyType}
          onChange={e => setOtherDutyType(e.target.value)}
          placeholder="Specify duty type..."
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none mb-4"
          required
        />
      </div>
    )}
    
    <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Date</label>
                    <input 
                      type="date" 
                      value={date}
                      onChange={e => setDate(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Time</label>
                    <input 
                      type="time" 
                      value={time}
                      onChange={e => setTime(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Location</label>
                  <input 
                    type="text" 
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="Where is the duty?"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Reason / Purpose</label>
                  <textarea 
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    placeholder="Briefly describe the purpose..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none h-20"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={submitting} className="mt-2 w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-lg shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-2 text-sm uppercase tracking-wider"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <><CheckCircle2 size={18} /> Submit Request</>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      
    </div>
  );
}
