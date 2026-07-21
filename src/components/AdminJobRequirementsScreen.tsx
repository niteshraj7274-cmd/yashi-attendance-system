import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Link as LinkIcon, Share2, Eye, EyeOff, Edit, Trash2, RefreshCw, MapPin, Users } from 'lucide-react';
import { collection, query, orderBy, getDocs, updateDoc, doc, deleteDoc, setDoc, getDoc, serverTimestamp, addDoc } from 'firebase/firestore';
import { logAuditActivity } from '../utils/auditHelpers';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminJobRequirementsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [showForm, setShowForm] = useState(location.state?.openNew || false);
  const [formData, setFormData] = useState<any>({
    jobTitle: '',
    jobCategory: '',
    vacancy: '',
    centerName: '',
    district: '',
    block: '',
    workLocation: '',
    qualification: '',
    experience: '',
    salary: '',
    jobType: '',
    lastApplyDate: '',
    joiningDate: '',
    description: '',
    status: 'Active'
  });
  
  const [categories, setCategories] = useState<string[]>([]);
      
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchJobs();
    fetchCategories();
  }, []);

      const fetchCategories = async () => {
    try {
      const q = query(collection(db, 'job_categories'), orderBy('timestamp', 'desc'));
      const snap = await getDocs(q);
      const activeCategories = snap.docs.map(d => d.data()).filter(c => c.status !== 'Inactive').map(c => c.name);
      
      const defaultCats = [
        'KYP (Kushal Yuva Program)',
        'Learner Facilitator (L.F.)',
        'Mobilization Executive',
        'Center Coordinator',
        'Night Guard',
        'Safai Karmchari',
        'Commission Based Worker',
        'Block Manager'
      ];
      
      const allCats = Array.from(new Set([...defaultCats, ...activeCategories]));
      setCategories(allCats);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'job_requirements'), orderBy('timestamp', 'desc'));
      const snap = await getDocs(q);
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = async (e: React.FormEvent, publish: boolean = false) => {
    e.preventDefault();
    setSaving(true);
    try {
      const dataToSave = {
        ...formData,
        isPublished: publish,
        timestamp: serverTimestamp()
      };
      
      if (editingId) {
        await updateDoc(doc(db, 'job_requirements', editingId), dataToSave);
        logAuditActivity('Admin', 'Jobs', 'Admin', 'Update', `Updated Job Requirement: ${dataToSave.title}`, {
          role: 'Admin', userName: 'Admin', action: 'Update', moduleName: 'Job Requirements', newValue: dataToSave.title
        });
      } else {
        await addDoc(collection(db, 'job_requirements'), dataToSave);
        logAuditActivity('Admin', 'Jobs', 'Admin', 'Create', `Created Job Requirement: ${dataToSave.title}`, {
          role: 'Admin', userName: 'Admin', action: 'Create', moduleName: 'Job Requirements', newValue: dataToSave.title
        });
      }
      
      setShowForm(false);
      setEditingId(null);
      setFormData({
        jobTitle: '', jobCategory: '', vacancy: '', centerName: '', district: '', block: '', workLocation: '', qualification: '', experience: '', salary: '', jobType: '', lastApplyDate: '', joiningDate: '', description: '', status: 'Active'
      });
      fetchJobs();
    } catch (err) {
      console.error(err);
      alert('Error saving job.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (job: any) => {
    setFormData(job);
    setEditingId(job.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this job requirement?')) {
      try {
        await deleteDoc(doc(db, 'job_requirements', id));
        fetchJobs();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'job_requirements', id), { isPublished: !currentStatus });
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const copyLink = (id: string) => {
    const link = `${window.location.origin}/apply-job/${id}`;
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  const shareLink = (id: string, title: string) => {
    const link = `${window.location.origin}/apply-job/${id}`;
    if (navigator.share) {
      navigator.share({
        title: `Apply for ${title}`,
        url: link
      }).catch(console.error);
    } else {
      copyLink(id);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      <div className="bg-emerald-700 text-white p-6 shadow-md z-10 relative">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate('/job-admin-dashboard')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight uppercase">Job Requirements</h1>
            <p className="text-[10px] text-emerald-200 uppercase tracking-widest mt-0.5">Manage & Publish Vacancies</p>
          </div>
          <div className="flex items-center gap-2">
            {!showForm && (
              <button 
                onClick={() => {
                  setFormData({
                    jobTitle: '', jobCategory: '', vacancy: '', centerName: '', district: '', block: '', workLocation: '', qualification: '', experience: '', salary: '', jobType: '', lastApplyDate: '', joiningDate: '', description: '', status: 'Active'
                  });
                  setEditingId(null);
                  setShowForm(true);
                }}
                className="flex items-center gap-2 bg-white text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-bold shadow hover:bg-emerald-50 transition-colors"
              >
                <Plus size={16} /> Add New Job
              </button>
            )}
            <button onClick={() => navigate('/admin/job-categories')} className="flex items-center gap-2 bg-emerald-600 border border-emerald-500 px-3 py-1.5 rounded-lg text-sm font-bold shadow hover:bg-emerald-500 transition-colors">
              <Plus size={16} />
              Categories
            </button>
            <button onClick={() => navigate('/admin/job-applications')} className="flex items-center gap-2 bg-emerald-600 border border-emerald-500 px-3 py-1.5 rounded-lg text-sm font-bold shadow hover:bg-emerald-500 transition-colors">
              <Users size={16} />
              Applications
            </button>
          </div>
        </div>
        
        {!showForm && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search jobs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white focus:bg-white focus:text-slate-900 outline-none transition-all placeholder-emerald-100 text-sm font-medium"
            />
          </div>
        )}
      </div>

      <div className="flex-1 p-4">
        {showForm ? (
          <form className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" onSubmit={(e) => handleSaveJob(e, false)}>
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-bold text-slate-800 uppercase tracking-wide">{editingId ? 'Edit Job' : 'Create New Job'}</h2>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="text-slate-500 font-bold text-sm">CANCEL</button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Job Title</label>
                  <input required type="text" value={formData.jobTitle} onChange={e => setFormData({...formData, jobTitle: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-slate-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Job Category</label>
                  <select required value={formData.jobCategory} onChange={e => setFormData({...formData, jobCategory: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-slate-50 focus:bg-white mt-1">
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Vacancy</label>
                  <input required type="number" value={formData.vacancy} onChange={e => setFormData({...formData, vacancy: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-slate-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Center Name</label>
                  <input type="text" value={formData.centerName} onChange={e => setFormData({...formData, centerName: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-slate-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">District</label>
                  <input type="text" value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-slate-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Block</label>
                  <input type="text" value={formData.block} onChange={e => setFormData({...formData, block: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-slate-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Work Location</label>
                  <input type="text" value={formData.workLocation} onChange={e => setFormData({...formData, workLocation: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-slate-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Qualification</label>
                  <input type="text" value={formData.qualification} onChange={e => setFormData({...formData, qualification: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-slate-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Experience</label>
                  <input type="text" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-slate-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Salary</label>
                  <input type="text" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-slate-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Job Type</label>
                  <select value={formData.jobType} onChange={e => setFormData({...formData, jobType: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-slate-50 focus:bg-white">
                    <option value="">Select</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Internship">Internship</option>
                    <option value="Commission Based">Commission Based</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Last Apply Date</label>
                  <input type="date" value={formData.lastApplyDate} onChange={e => setFormData({...formData, lastApplyDate: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-slate-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Joining Date</label>
                  <input type="date" value={formData.joiningDate} onChange={e => setFormData({...formData, joiningDate: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-slate-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-slate-50 focus:bg-white">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-slate-50 focus:bg-white" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button type="submit" disabled={saving} className="px-6 py-2.5 bg-slate-800 text-white font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-slate-700 disabled:opacity-50">
                Save Draft
              </button>
              <button type="button" onClick={(e) => handleSaveJob(e, true)} disabled={saving} className="px-6 py-2.5 bg-emerald-600 text-white font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2">
                <Eye size={16} /> Publish Job
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 mt-2">
            {loading ? (
              <div className="text-center py-10 text-slate-500 font-bold uppercase tracking-wider">YASHI SKILL PROJECT is loading...</div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-10 text-slate-500 font-bold uppercase tracking-wider">No jobs found</div>
            ) : (
              jobs.filter(j => !searchTerm || j.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) || j.jobCategory?.toLowerCase().includes(searchTerm.toLowerCase())).map(job => (
                <div key={job.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-slate-800">{job.jobTitle}</h3>
                        <p className="text-sm font-medium text-emerald-600">{job.jobCategory}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${job.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                        {job.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5"><MapPin size={14} /> {job.district || job.workLocation}</div>
                      <div className="flex items-center gap-1.5"><Users size={14} /> {job.vacancy} Vacancies</div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-3 border-t border-slate-100 flex flex-wrap gap-2 justify-center">
                    <button onClick={() => copyLink(job.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100">
                      <LinkIcon size={14} /> Copy Link
                    </button>
                    <button onClick={() => shareLink(job.id, job.jobTitle)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100">
                      <Share2 size={14} /> Share Link
                    </button>
                    <button onClick={() => handleTogglePublish(job.id, job.isPublished)} className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs font-bold ${job.isPublished ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'}`}>
                      {job.isPublished ? <EyeOff size={14} /> : <Eye size={14} />} {job.isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                    <button onClick={() => handleEdit(job)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-blue-600 hover:bg-blue-50">
                      <Edit size={14} /> Edit
                    </button>
                    <button onClick={() => handleDelete(job.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50">
                      <Trash2 size={14} /> Delete
                    </button>
                    <button onClick={() => fetchJobs()} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100">
                      <RefreshCw size={14} /> Sync
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
