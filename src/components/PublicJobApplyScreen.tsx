import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Briefcase, ChevronDown } from 'lucide-react';
import { doc, getDoc, collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';

function generateApplicationId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = 'APP-';
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

export default function PublicJobApplyScreen() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [centers, setCenters] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    mobile: '',
    email: '',
    dob: '',
    gender: '',
    address: '',
    district: '',
    block: '',
    qualification: '',
    experience: '',
    preferredCenter: ''
  });

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) return;
      try {
        const docRef = doc(db, 'job_requirements', jobId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.isPublished && data.status === 'Active') {
            setJob({ id: docSnap.id, ...data });
          } else {
            setJob(null); // Job closed
          }
        } else {
          setJob(null);
        }

        const centerSnap = await getDocs(query(collection(db, 'centers'), where('status', '==', 'Active')));
        const centerList = centerSnap.docs.map(c => ({ id: c.id, ...c.data() }));
        setCenters(centerList);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;
    
    if (!formData.fullName || !formData.fatherName || !formData.mobile || !formData.dob || !formData.gender || !formData.address || !formData.district || !formData.block || !formData.qualification || !formData.experience || !formData.preferredCenter) {
      setError('Please fill all required fields.');
      return;
    }
    
    setSubmitting(true);
    setError('');
    
    try {
      const newApplicationId = generateApplicationId();
      await addDoc(collection(db, 'job_applications'), {
        ...formData,
        jobId: job.id,
        jobTitle: job.jobTitle,
        jobCategory: job.jobCategory,
        applicationId: newApplicationId,
        status: 'Pending',
        appliedAt: serverTimestamp()
      });
      setApplicationId(newApplicationId);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-50 items-center justify-center">
        <div className="text-slate-500 font-bold uppercase tracking-wider text-sm">YASHI SKILL PROJECT is loading...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 items-center justify-center p-6 text-center">
        <Briefcase size={64} className="text-slate-300 mb-4" />
        <h1 className="text-2xl font-bold text-slate-800 mb-2">This Job Vacancy is Closed.</h1>
        <p className="text-slate-500 mb-8">The link you followed is no longer active or the position has been filled.</p>
        <button 
          onClick={() => navigate('/public-jobs')}
          className="px-6 py-2.5 bg-emerald-600 text-white font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-emerald-700"
        >
          View Open Jobs
        </button>
      </div>
    );
  }

  const handleWhatsAppClick = () => {
    const phoneNumber = '+917070972806';
    const message = `Hello,

I have successfully submitted my Job Application.

Application ID: ${applicationId}
Name: ${formData.fullName}
Mobile: ${formData.mobile}
Applied Post: ${job.jobTitle}
District: ${formData.district}
Block: ${formData.block}

Please review my application.

I will send my resume and required documents on WhatsApp.

Thank You.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Fallback to regular a tag if window.open is blocked
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  if (success) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 size={40} />
        </motion.div>
        <h1 className="text-xl font-bold text-slate-800 mb-2">Your application has been submitted successfully.</h1>
        <p className="text-slate-500 mb-8">Thank you for applying for <strong>{job.jobTitle}</strong>. We will review your application and get back to you soon.</p>
        
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button 
            onClick={handleWhatsAppClick}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-[#128C7E] shadow-sm transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            Send Resume on WhatsApp
          </button>
          
          <button 
            onClick={() => navigate('/public-jobs')}
            className="px-6 py-3 bg-slate-200 text-slate-700 font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-slate-300 transition-all"
          >
            Browse More Jobs
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-emerald-700 text-white p-6 shadow-md z-10 relative">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={() => navigate('/public-jobs')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold tracking-tight uppercase leading-tight">{job.jobTitle}</h1>
            <p className="text-[10px] text-emerald-200 uppercase tracking-widest mt-1">Application Form</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto pb-20">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-6">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b pb-2">Job Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm text-slate-700">
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-bold text-slate-500">Job Title</span>
              <span className="font-semibold text-right">{job.jobTitle}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-bold text-slate-500">Category</span>
              <span className="font-semibold text-right">{job.jobCategory}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-bold text-slate-500">Vacancy</span>
              <span className="font-semibold text-right">{job.vacancy || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-bold text-slate-500">Center Name</span>
              <span className="font-semibold text-right">{job.centerName || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-bold text-slate-500">District</span>
              <span className="font-semibold text-right">{job.district || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-bold text-slate-500">Block</span>
              <span className="font-semibold text-right">{job.block || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-bold text-slate-500">Qualification</span>
              <span className="font-semibold text-right">{job.qualification || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-bold text-slate-500">Experience</span>
              <span className="font-semibold text-right">{job.experience || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-bold text-slate-500">Salary</span>
              <span className="font-semibold text-right text-emerald-600">{job.salary || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-bold text-slate-500">Job Type</span>
              <span className="font-semibold text-right">{job.jobType || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1 md:col-span-2">
              <span className="font-bold text-slate-500">Last Apply Date</span>
              <span className="font-bold text-rose-600 text-right">{job.lastApplyDate ? new Date(job.lastApplyDate).toLocaleDateString('en-GB') : 'N/A'}</span>
            </div>
          </div>
          {job.description && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Job Description</h3>
              <p className="text-sm text-slate-700 whitespace-pre-wrap bg-slate-50 p-3 rounded">{job.description}</p>
            </div>
          )}
        </div>

        {!showForm ? (
          <button 
            onClick={() => setShowForm(true)}
            className="w-full mt-4 py-4 bg-emerald-600 text-white font-bold uppercase tracking-wider text-base rounded-xl shadow hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={24} />
            Apply Now
          </button>
        ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Candidate Details</h2>
          </div>
          <div className="p-5 space-y-4">
            {error && <div className="text-xs text-rose-600 font-bold bg-rose-50 p-2 rounded">{error}</div>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Full Name *</label>
                <input 
                  type="text" name="fullName" required 
                  value={formData.fullName} onChange={handleChange} 
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white outline-none focus:border-emerald-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Father's Name *</label>
                <input 
                  type="text" name="fatherName" required 
                  value={formData.fatherName} onChange={handleChange} 
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white outline-none focus:border-emerald-500" 
                />
              </div>
            
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Mobile No. *</label>
                <input 
                  type="tel" name="mobile" required 
                  value={formData.mobile} onChange={handleChange} 
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white outline-none focus:border-emerald-500" 
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Email ID (Optional)</label>
                <input 
                  type="email" name="email" 
                  value={formData.email} onChange={handleChange} 
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white outline-none focus:border-emerald-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Date of Birth *</label>
                <input 
                  type="date" name="dob" required 
                  value={formData.dob} onChange={handleChange} 
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white outline-none focus:border-emerald-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Gender *</label>
                <select
                  required
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="" disabled>Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-600 mb-1">Full Address *</label>
                <textarea 
                  name="address" rows={2} required
                  value={formData.address} onChange={handleChange} 
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white outline-none focus:border-emerald-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">District *</label>
                <input 
                  type="text" name="district" required
                  value={formData.district} onChange={handleChange} 
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white outline-none focus:border-emerald-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Block *</label>
                <input 
                  type="text" name="block" required
                  value={formData.block} onChange={handleChange} 
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white outline-none focus:border-emerald-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Qualification *</label>
                <input 
                  type="text" name="qualification" required 
                  value={formData.qualification} onChange={handleChange} 
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white outline-none focus:border-emerald-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Experience *</label>
                <input 
                  type="text" name="experience" placeholder="e.g. 2 Years, or Fresher" required
                  value={formData.experience} onChange={handleChange} 
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white outline-none focus:border-emerald-500" 
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-600 mb-1">Preferred Center *</label>
                <select
                  required
                  value={formData.preferredCenter}
                  onChange={(e) => setFormData({ ...formData, preferredCenter: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="" disabled>Select a Center</option>
                  {centers.length === 0 && <option disabled>No Active Center Available</option>}
                  {centers.map(center => (
                    <option key={center.id} value={center.name}>
                      {center.name} - {center.code}
                    </option>
                  ))}
                  <option value="Any">Any / Not Listed</option>
                </select>
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={submitting}
              className="w-full mt-4 py-3 bg-emerald-600 text-white font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
        )}      </div>
    </div>
  );
}
