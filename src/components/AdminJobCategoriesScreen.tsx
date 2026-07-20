import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { collection, query, orderBy, getDocs, updateDoc, doc, deleteDoc, setDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';

export default function AdminJobCategoriesScreen() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: '',
    description: '',
    status: 'Active'
  });
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'job_categories'), orderBy('timestamp', 'desc'));
      const snap = await getDocs(q);
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    setSaving(true);
    try {
      const dataToSave = {
        name: formData.name.trim(),
        description: formData.description,
        status: formData.status,
        timestamp: serverTimestamp()
      };
      
      if (editingId) {
        await updateDoc(doc(db, 'job_categories', editingId), dataToSave);
      } else {
        await addDoc(collection(db, 'job_categories'), dataToSave);
      }
      
      setShowForm(false);
      setEditingId(null);
      setFormData({ name: '', description: '', status: 'Active' });
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert('Error saving category.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (category: any) => {
    setFormData({
      name: category.name || '',
      description: category.description || '',
      status: category.status || 'Active'
    });
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteDoc(doc(db, 'job_categories', id));
        fetchCategories();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const toggleStatus = async (category: any) => {
    try {
      const newStatus = category.status === 'Active' ? 'Inactive' : 'Active';
      await updateDoc(doc(db, 'job_categories', category.id), { status: newStatus });
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      <div className="bg-emerald-700 text-white p-6 shadow-md z-10 relative">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate('/admin/job-requirements')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight uppercase">Job Categories</h1>
            <p className="text-[10px] text-emerald-200 uppercase tracking-widest mt-0.5">Manage Categories</p>
          </div>
          <div className="flex items-center gap-2">
            {!showForm && (
              <button 
                onClick={() => {
                  setFormData({ name: '', description: '', status: 'Active' });
                  setEditingId(null);
                  setShowForm(true);
                }}
                className="flex items-center gap-2 bg-white text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-bold shadow hover:bg-emerald-50 transition-colors"
              >
                <Plus size={16} /> Add New Category
              </button>
            )}
          </div>
        </div>
        
        {!showForm && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white focus:bg-white focus:text-slate-900 outline-none transition-all placeholder-emerald-100 text-sm font-medium"
            />
          </div>
        )}
      </div>

      <div className="flex-1 p-4">
        {showForm ? (
          <form className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" onSubmit={handleSave}>
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-bold text-slate-800 uppercase tracking-wide">{editingId ? 'Edit Category' : 'Add New Category'}</h2>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="text-slate-500 font-bold text-sm">CANCEL</button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category Name *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-slate-50 focus:bg-white" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description (Optional)</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-slate-50 focus:bg-white" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-slate-50 focus:bg-white">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button type="submit" disabled={saving} className="px-6 py-2.5 bg-emerald-600 text-white font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-emerald-700 disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Category'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 mt-2">
            {loading ? (
              <div className="text-center py-10 text-slate-500 font-bold uppercase tracking-wider">YASHI SKILL PROJECT is loading...</div>
            ) : categories.length === 0 ? (
              <div className="text-center py-10 text-slate-500 font-bold uppercase tracking-wider">No categories found</div>
            ) : (
              categories.filter(c => !searchTerm || c.name?.toLowerCase().includes(searchTerm.toLowerCase())).map(category => (
                <div key={category.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">{category.name}</h3>
                    {category.description && <p className="text-sm text-slate-500 mt-1">{category.description}</p>}
                    <span className={`inline-block mt-2 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${category.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                      {category.status || 'Active'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleStatus(category)} className={`p-2 rounded-lg ${category.status === 'Active' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'}`} title={category.status === 'Active' ? 'Deactivate' : 'Activate'}>
                      {category.status === 'Active' ? <XCircle size={18} /> : <CheckCircle size={18} />}
                    </button>
                    <button onClick={() => handleEdit(category)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100" title="Edit">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(category.id)} className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
