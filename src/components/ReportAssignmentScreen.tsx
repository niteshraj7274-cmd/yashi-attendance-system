import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckSquare, Trash2 } from 'lucide-react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase';

export default function ReportAssignmentScreen() {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<any[]>([]);
  const [centers, setCenters] = useState<any[]>([]);
  const [staffList, setStaffList] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    reportId: '',
    centerId: '',
    staffId: ''
  });

  useEffect(() => {
    const unsubReports = onSnapshot(collection(db, 'report_definitions'), snap => {
      setReports(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubCenters = onSnapshot(collection(db, 'centers'), snap => {
      setCenters(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubStaff = onSnapshot(collection(db, 'staff'), snap => {
      setStaffList(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubAssignments = onSnapshot(collection(db, 'report_assignments'), snap => {
      setAssignments(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => { unsubReports(); unsubCenters(); unsubStaff(); unsubAssignments(); };
  }, []);

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.reportId || !formData.centerId || !formData.staffId) {
      alert("Please select Report, Center, and Staff");
      return;
    }
    try {
      const q = query(
        collection(db, 'report_assignments'), 
        where('reportId', '==', formData.reportId),
        where('centerId', '==', formData.centerId),
        where('staffDocId', '==', formData.staffId)
      );
      const exists = await getDocs(q);
      if (!exists.empty) {
        alert("This assignment already exists.");
        return;
      }
      
      const report = reports.find(r => r.id === formData.reportId);
      const center = centers.find(c => c.id === formData.centerId);
      const staff = staffList.find(s => s.id === formData.staffId);

      await addDoc(collection(db, 'report_assignments'), {
        reportId: formData.reportId,
        reportName: report?.name || '',
        centerId: formData.centerId,
        centerName: center?.name || '',
        staffDocId: formData.staffId,
        staffName: staff?.name || '',
        staffEmpId: staff?.staffId || '',
        createdAt: new Date().toISOString()
      });
      alert('Report assigned successfully');
      setFormData({ reportId: '', centerId: '', staffId: '' });
    } catch (err) {
      console.error(err);
      alert('Error assigning report');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this assignment?')) {
      await deleteDoc(doc(db, 'report_assignments', id));
    }
  };

  const filteredStaff = formData.centerId 
    ? staffList.filter(s => s.centerId === formData.centerId) 
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-orange-700 text-white h-20 flex items-center px-6 shadow-md gap-4">
        <button onClick={() => window.history.back()} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase">Report Assignment</h1>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <form onSubmit={handleAssign} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4 mb-6">
          <h2 className="text-sm font-bold text-slate-800 uppercase border-b pb-2">Assign Report</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">1. Select Report</label>
              <select required value={formData.reportId} onChange={e => setFormData({...formData, reportId: e.target.value})} className="w-full p-2 border rounded mt-1">
                <option value="">Select...</option>
                {reports.map(r => <option key={r.id} value={r.id}>{r.name} ({r.code})</option>)}
              </select>
            </div>
            
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">2. Select Center</label>
              <select required value={formData.centerId} onChange={e => setFormData({...formData, centerId: e.target.value, staffId: ''})} className="w-full p-2 border rounded mt-1">
                <option value="">Select...</option>
                {centers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">3. Select Staff</label>
              <select required value={formData.staffId} onChange={e => setFormData({...formData, staffId: e.target.value})} className="w-full p-2 border rounded mt-1" disabled={!formData.centerId}>
                <option value="">Select...</option>
                {filteredStaff.map(s => <option key={s.id} value={s.id}>{s.name} ({s.role})</option>)}
              </select>
            </div>
          </div>

          <button type="submit" className="mt-2 p-3 bg-orange-600 text-white rounded-lg font-bold uppercase transition-colors hover:bg-orange-700">Assign</button>
        </form>

        {loading ? (
          <div className="flex justify-center p-10"><div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div></div>
        ) : assignments.length === 0 ? (
          <div className="text-center p-10 text-slate-500">No assignments found.</div>
        ) : (
          <div className="grid gap-3">
            {assignments.map(a => (
              <div key={a.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-slate-800 flex items-center gap-2"><CheckSquare size={16} className="text-orange-600"/> {a.reportName}</h3>
                  <p className="text-xs text-slate-500 mt-1"><span className="font-bold text-slate-600">Center:</span> {a.centerName} &nbsp;|&nbsp; <span className="font-bold text-slate-600">Staff:</span> {a.staffName}</p>
                </div>
                <button onClick={() => handleDelete(a.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 size={16}/></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
