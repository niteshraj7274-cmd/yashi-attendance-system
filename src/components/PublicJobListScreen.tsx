import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin, Search } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';

export default function PublicJobListScreen() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const q = query(
          collection(db, 'job_requirements'),
          where('status', '==', 'Active')
        );
        const snapshot = await getDocs(q);
        const fetchedJobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setJobs(fetchedJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    (job.jobTitle || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (job.jobCategory || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-emerald-700 text-white p-6 shadow-md z-10 relative">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate('/job-requirements-portal')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight uppercase">Current Openings</h1>
            <p className="text-[10px] text-emerald-200 uppercase tracking-widest mt-0.5">Apply for open vacancies</p>
          </div>
        </div>

        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-emerald-100 focus:outline-none focus:bg-white/20 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto pb-10">
        {loading ? (
          <div className="flex-1 flex items-center justify-center text-slate-500 font-bold uppercase tracking-wider text-sm">Loading Jobs...</div>
        ) : filteredJobs.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <Briefcase size={48} className="mb-3 opacity-20" />
            <p className="font-bold text-sm uppercase tracking-wider">No Active Jobs Found</p>
          </div>
        ) : (
          filteredJobs.map(job => (
            <motion.div 
              key={job.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-4"
            >
              <div className="flex justify-between items-start mb-1">
                <h2 className="text-lg font-bold text-slate-800 leading-tight">{job.jobTitle}</h2>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Open</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold text-slate-500 mb-3">
                <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{job.jobCategory}</span>
                {job.centerName && <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{job.centerName}</span>}
                <span className="flex items-center gap-1"><MapPin size={12}/> {job.district || job.workLocation || 'N/A'}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-slate-600 mb-4 border-t border-slate-100 pt-3">
                <div className="flex justify-between"><span>Vacancy:</span> <span className="font-bold">{job.vacancy || 1}</span></div>
                <div className="flex justify-between"><span>Salary:</span> <span className="font-bold">{job.salary || 'Not specified'}</span></div>
                <div className="flex justify-between"><span>Last Date:</span> <span className="font-bold text-rose-600">{job.lastApplyDate ? new Date(job.lastApplyDate).toLocaleDateString('en-GB') : 'Not specified'}</span></div>
              </div>
              
              <button 
                onClick={() => navigate(`/apply-job/${job.id}`)}
                className="w-full py-2.5 bg-emerald-600 text-white font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Apply Now
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
