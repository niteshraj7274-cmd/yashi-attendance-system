import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function ReportCreateScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: '',
    frequency: 'Daily',
    description: '',
    status: 'Active'
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const prefix = name.substring(0, 3).toUpperCase();
    const code = prefix ? `${prefix}-${Math.floor(1000 + Math.random() * 9000)}` : '';
    setFormData({ ...formData, name, code: formData.code || code });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const q = query(collection(db, 'report_definitions'), where('name', '==', formData.name));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        alert('A report with this name already exists.');
        setLoading(false);
        return;
      }
      
      const qCode = query(collection(db, 'report_definitions'), where('code', '==', formData.code));
      const codeSnapshot = await getDocs(qCode);
      if (!codeSnapshot.empty) {
        alert('A report with this code already exists. Please change the code.');
        setLoading(false);
        return;
      }

      await addDoc(collection(db, 'report_definitions'), {
        name: formData.name,
        code: formData.code,
        category: formData.category,
        frequency: formData.frequency,
        description: formData.description,
        status: formData.status,
        createdAt: new Date().toISOString()
      });
      alert('Report Generated Successfully.');
      navigate('/report-management/manage');
    } catch (err) {
      console.error(err);
      alert('Error creating report');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-purple-700 text-white h-20 flex items-center px-6 shadow-md gap-4">
        <button onClick={() => navigate('/report-management')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase">Create Report</h1>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <form onSubmit={handleSave} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Report Name</label>
              <input required value={formData.name} onChange={handleNameChange} className="w-full p-2 border rounded mt-1" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Report Code</label>
              <input required value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} className="w-full p-2 border rounded mt-1 bg-slate-50" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Report Category</label>
              <input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 border rounded mt-1" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Report Frequency</label>
              <select required value={formData.frequency} onChange={e => setFormData({...formData, frequency: e.target.value})} className="w-full p-2 border rounded mt-1">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Custom</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded mt-1" rows={3}></textarea>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
              <select required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-2 border rounded mt-1">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          
          <button type="submit" disabled={loading} className="mt-4 p-3 bg-purple-600 text-white rounded-lg font-bold uppercase transition-colors hover:bg-purple-700 disabled:opacity-50">
            {loading ? 'Creating...' : 'Create Report'}
          </button>
        </form>
      </div>
    </div>
  );
}
