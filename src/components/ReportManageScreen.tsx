import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, FileText } from 'lucide-react';
import { collection, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export default function ReportManageScreen() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState<any>(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'report_definitions'), (snapshot) => {
      const data: any[] = [];
      snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
      setReports(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      await deleteDoc(doc(db, 'report_definitions', id));
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editData) return;
    try {
      await updateDoc(doc(db, 'report_definitions', editData.id), {
        name: editData.name,
        code: editData.code,
        category: editData.category,
        frequency: editData.frequency,
        description: editData.description,
        status: editData.status
      });
      setEditData(null);
      alert('Report updated');
    } catch (err) {
      console.error(err);
      alert('Error updating report');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-indigo-700 text-white h-20 flex items-center px-6 shadow-md gap-4">
        <button onClick={() => navigate('/report-management')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase">Manage Reports</h1>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {editData ? (
          <form onSubmit={handleUpdate} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
            <h2 className="text-sm font-bold text-slate-800 uppercase border-b pb-2">Edit Report</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Report Name</label>
                <input required value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} className="w-full p-2 border rounded mt-1" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Report Code</label>
                <input required value={editData.code} onChange={e => setEditData({...editData, code: e.target.value})} className="w-full p-2 border rounded mt-1" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Report Category</label>
                <input required value={editData.category} onChange={e => setEditData({...editData, category: e.target.value})} className="w-full p-2 border rounded mt-1" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Report Frequency</label>
                <select required value={editData.frequency} onChange={e => setEditData({...editData, frequency: e.target.value})} className="w-full p-2 border rounded mt-1">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Custom</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                <textarea value={editData.description} onChange={e => setEditData({...editData, description: e.target.value})} className="w-full p-2 border rounded mt-1" rows={3}></textarea>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
                <select required value={editData.status} onChange={e => setEditData({...editData, status: e.target.value})} className="w-full p-2 border rounded mt-1">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button type="button" onClick={() => setEditData(null)} className="flex-1 p-3 bg-slate-200 text-slate-800 rounded-lg font-bold uppercase">Cancel</button>
              <button type="submit" className="flex-1 p-3 bg-indigo-600 text-white rounded-lg font-bold uppercase transition-colors hover:bg-indigo-700">Save</button>
            </div>
          </form>
        ) : loading ? (
          <div className="flex justify-center p-10"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>
        ) : reports.length === 0 ? (
          <div className="text-center p-10 text-slate-500">No reports created yet.</div>
        ) : (
          <div className="grid gap-4">
            {reports.map(report => (
              <div key={report.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 relative">
                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={() => setEditData(report)} className="p-1.5 bg-blue-50 text-blue-600 rounded"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(report.id)} className="p-1.5 bg-red-50 text-red-600 rounded"><Trash2 size={16} /></button>
                </div>
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2"><FileText size={18} className="text-indigo-600"/> {report.name}</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs mt-3 text-slate-600">
                  <div><span className="font-bold text-slate-400">Code:</span> {report.code}</div>
                  <div><span className="font-bold text-slate-400">Category:</span> {report.category}</div>
                  <div><span className="font-bold text-slate-400">Frequency:</span> {report.frequency}</div>
                  <div><span className="font-bold text-slate-400">Status:</span> {report.status}</div>
                  <div className="col-span-2"><span className="font-bold text-slate-400">Description:</span> {report.description}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
