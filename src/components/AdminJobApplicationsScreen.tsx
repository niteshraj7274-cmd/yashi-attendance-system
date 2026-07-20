import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, MessageCircle } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';

export default function AdminJobApplicationsScreen() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [jobFilter, setJobFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [blockFilter, setBlockFilter] = useState('');
  const [centerFilter, setCenterFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'job_applications'), orderBy('appliedAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApplications(apps);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const openWhatsApp = (app: any) => {
    const text = `*New Job Application*\n\n*Application ID:* ${app.applicationId || 'N/A'}\n*Applicant Name:* ${app.fullName}\n*Mobile Number:* ${app.mobile}\n*Applied Job:* ${app.jobTitle} (${app.jobCategory})\n*Preferred Center:* ${app.preferredCenter}\n*Qualification:* ${app.qualification}\n*Experience:* ${app.experience}\n*District:* ${app.district}\n*Block:* ${app.block}\n*Apply Date:* ${app.appliedAt?.toDate ? app.appliedAt.toDate().toLocaleDateString() : 'N/A'}`;
    const url = `https://wa.me/917070972806?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Extract unique values for filters
  const uniqueJobs = [...new Set(applications.map(a => a.jobTitle).filter(Boolean))];
  const uniqueDistricts = [...new Set(applications.map(a => a.district).filter(Boolean))];
  const uniqueBlocks = [...new Set(applications.map(a => a.block).filter(Boolean))];
  const uniqueCenters = [...new Set(applications.map(a => a.preferredCenter).filter(Boolean))];

  const filteredApps = applications.filter(app => {
    const matchesSearch = (app.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (app.mobile || '').includes(searchTerm) ||
                          (app.applicationId || '').toLowerCase().includes(searchTerm.toLowerCase());
                          
    const matchesJob = jobFilter === '' || app.jobTitle === jobFilter;
    const matchesDistrict = districtFilter === '' || app.district === districtFilter;
    const matchesBlock = blockFilter === '' || app.block === blockFilter;
    const matchesCenter = centerFilter === '' || app.preferredCenter === centerFilter;
    const matchesStatus = statusFilter === '' || app.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter) {
      if (app.appliedAt?.toDate) {
        const appDate = app.appliedAt.toDate().toLocaleDateString('en-CA');
        matchesDate = appDate === dateFilter;
      } else {
        matchesDate = false;
      }
    }
    
    return matchesSearch && matchesJob && matchesDistrict && matchesBlock && matchesCenter && matchesStatus && matchesDate;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      <div className="bg-indigo-700 text-white p-6 shadow-md z-10 relative">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate('/admin/job-requirements')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight uppercase">Job Applications</h1>
            <p className="text-[10px] text-indigo-200 uppercase tracking-widest mt-0.5">Manage Candidates</p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300" />
            <input 
              type="text"
              placeholder="Search by name, ID or mobile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-indigo-200 focus:outline-none focus:bg-white/20 transition-all"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2.5 rounded-xl border transition-all ${showFilters ? 'bg-white text-indigo-700 border-white' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}
          >
            <Filter size={20} />
          </button>
        </div>
        
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3"
          >
            <select value={jobFilter} onChange={(e) => setJobFilter(e.target.value)} className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-xs text-white [&>option]:text-slate-800 outline-none">
              <option value="">All Jobs</option>
              {uniqueJobs.map((j: any) => <option key={j} value={j}>{j}</option>)}
            </select>
            
            <select value={districtFilter} onChange={(e) => setDistrictFilter(e.target.value)} className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-xs text-white [&>option]:text-slate-800 outline-none">
              <option value="">All Districts</option>
              {uniqueDistricts.map((d: any) => <option key={d} value={d}>{d}</option>)}
            </select>

            <select value={blockFilter} onChange={(e) => setBlockFilter(e.target.value)} className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-xs text-white [&>option]:text-slate-800 outline-none">
              <option value="">All Blocks</option>
              {uniqueBlocks.map((b: any) => <option key={b} value={b}>{b}</option>)}
            </select>

            <select value={centerFilter} onChange={(e) => setCenterFilter(e.target.value)} className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-xs text-white [&>option]:text-slate-800 outline-none">
              <option value="">All Centers</option>
              {uniqueCenters.map((c: any) => <option key={c} value={c}>{c}</option>)}
            </select>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-xs text-white [&>option]:text-slate-800 outline-none">
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>

            <input 
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-xs text-white outline-none"
            />
          </motion.div>
        )}
      </div>

      <div className="flex-1 p-4 flex flex-col gap-3">
        {loading ? (
          <div className="text-center py-10 text-slate-500 font-bold uppercase tracking-wider">YASHI SKILL PROJECT is loading...</div>
        ) : filteredApps.length === 0 ? (
          <div className="text-center py-10 text-slate-500 font-bold uppercase tracking-wider">No applications found</div>
        ) : (
          filteredApps.map(app => (
            <div key={app.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800 leading-tight">{app.fullName}</h3>
                    <p className="text-xs font-medium text-slate-500">ID: {app.applicationId || 'N/A'}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${app.status === 'Pending' ? 'bg-amber-100 text-amber-700' : app.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700' : app.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}`}>
                    {app.status}
                  </span>
                </div>
                
                <div className="text-sm font-medium text-indigo-600 mb-3">{app.jobTitle}</div>
                
                <div className="grid grid-cols-2 gap-x-2 gap-y-3 mt-3 text-xs text-slate-600">
                  <div>Mobile: <span className="font-bold">{app.mobile}</span></div>
                  <div>Center: <span className="font-bold truncate block">{app.preferredCenter}</span></div>
                  <div>Qual: <span className="font-bold truncate block">{app.qualification}</span></div>
                  <div>Exp: <span className="font-bold truncate block">{app.experience}</span></div>
                  <div>District: <span className="font-bold">{app.district}</span></div>
                  <div>Block: <span className="font-bold">{app.block}</span></div>
                  <div className="col-span-2">Date: <span className="font-bold">{app.appliedAt?.toDate ? app.appliedAt.toDate().toLocaleDateString() : 'N/A'}</span></div>
                </div>
              </div>
              
              <div className="bg-slate-50 p-3 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => openWhatsApp(app)} 
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#25D366] text-white rounded-lg text-xs font-bold hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageCircle size={16} /> WhatsApp Admin
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
