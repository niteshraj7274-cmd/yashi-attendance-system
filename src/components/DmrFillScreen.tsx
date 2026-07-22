import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { collection, addDoc, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { logAuditActivity } from '../utils/auditHelpers';
import AttendanceSuccessModal from './AttendanceSuccessModal';

export default function DmrFillScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { staffData, centerInfo } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  
  const [reportingPeriod, setReportingPeriod] = useState('Morning (10:00 AM - 02:00 PM)');
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!staffData || !centerInfo) {
      alert("Missing staff/center data");
      navigate('/staff-dashboard');
      return;
    }
    
    // Fetch DMR settings
    const fetchSettings = async () => {
      try {
        // Check Assignment
        const assignQ = query(collection(db, 'report_assignments'), where('staffEmpId', '==', staffData.staffId));
        const assignSnap = await getDocs(assignQ);
        const assignedReports = assignSnap.docs.map(doc => doc.data().reportName || doc.data().reportId);
        const isAssignedDMR = assignedReports.some(r => r.toLowerCase().includes('dmr') || r.toLowerCase().includes('mobilization'));
        if (!isAssignedDMR) {
          alert("You are not authorized to fill this report.");
          navigate('/staff-dashboard');
          return;
        }

        const reportDate = new Date().toISOString().split('T')[0];
        const q = query(
          collection(db, 'dmr_reports'),
          where('staffEmpId', '==', staffData.staffId),
          where('reportDate', '==', reportDate)
        );
        const exists = await getDocs(q);
        if (!exists.empty) {
          alert("You have already submitted the Daily Mobilization Report for today.");
          navigate('/staff-dashboard');
          return;
        }

        const docSnap = await getDoc(doc(db, 'dmr_settings', 'config'));
        if (docSnap.exists()) {
          setSettings(docSnap.data());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [staffData, centerInfo, navigate]);

  const handleFieldChange = (optionName: string, value: string) => {
    setFormData(prev => ({ ...prev, [optionName]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const reportDate = new Date().toISOString().split('T')[0];
      const q = query(
        collection(db, 'dmr_reports'),
        where('staffEmpId', '==', staffData.staffId),
        where('reportDate', '==', reportDate)
      );
      const exists = await getDocs(q);
      if (!exists.empty) {
        alert('You have already submitted a Daily Mobilization Report for today.');
        setSubmitting(false);
        navigate('/staff-dashboard');
        return;
      }
      await addDoc(collection(db, 'dmr_reports'), {
        reportDate,
        reportingPeriod,
        centerId: centerInfo?.id || staffData?.centerId || '',
        centerName: centerInfo?.name || '',
        centerCode: centerInfo?.code || '',
        district: centerInfo?.district || '',
        block: centerInfo?.block || '',
        staffDocId: staffData?.id || staffData?.uid || '',
        staffName: staffData?.name || '',
        staffEmpId: staffData?.staffId || '',
        staffRole: staffData?.role || staffData?.designation || '',
        fields: formData,
        status: 'Submitted',
        createdAt: new Date().toISOString()
      });
      
      await logAuditActivity(
        staffData.name, 
        'DMR', 
        staffData.name, 
        'Submit', 
        'Submitted Daily Mobilization Report', 
        { 
          role: staffData.role, 
          centerName: centerInfo.name, 
        }
      );
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
      alert('Error submitting report.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-slate-50"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-indigo-800 text-white h-16 flex items-center px-4 shadow-md gap-4">
        <button onClick={() => navigate('/staff-dashboard')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold tracking-tight uppercase">Daily Mobilization Report</h1>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b pb-2 mb-4">Header Information</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-bold text-slate-600">BSDC Name:</span> {centerInfo?.name}</div>
              <div><span className="font-bold text-slate-600">Center Name:</span> {centerInfo?.name}</div>
              <div><span className="font-bold text-slate-600">Staff Name:</span> {staffData?.name}</div>
              <div><span className="font-bold text-slate-600">District:</span> {centerInfo?.district || 'N/A'}</div>
              <div><span className="font-bold text-slate-600">Block:</span> {centerInfo?.block || 'N/A'}</div>
              <div><span className="font-bold text-slate-600">Date:</span> {new Date().toISOString().split('T')[0]}</div>
              <div className="col-span-2 mt-2">
                <label className="text-xs font-bold text-slate-700 uppercase">Reporting Period</label>
                <select value={reportingPeriod} onChange={e => setReportingPeriod(e.target.value)} className="w-full p-2 border rounded mt-1 bg-slate-50" required>
                  <option value="Morning (10:00 AM - 02:00 PM)">Morning (10:00 AM - 02:00 PM)</option>
                  <option value="Evening (02:00 PM - 06:00 PM)">Evening (02:00 PM - 06:00 PM)</option>
                  <option value="Full Day">Full Day</option>
                </select>
              </div>
            </div>
          </div>

          {settings?.categories?.filter((c: any) => c.visible).sort((a: any, b: any) => a.order - b.order).map((cat: any) => (
            <div key={cat.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-sm font-bold text-indigo-700 uppercase tracking-widest border-b pb-2 mb-4">{cat.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.options.filter((o: any) => o.visible).sort((a: any, b: any) => a.order - b.order).map((opt: any) => (
                  <div key={opt.id}>
                    <label className="text-xs font-bold text-slate-700 uppercase">{opt.name}</label>
                    {opt.name.toLowerCase() === 'remarks' ? (
                      <textarea 
                        placeholder={`Enter ${opt.name}`}
                        value={formData[opt.name] || ''}
                        onChange={e => handleFieldChange(opt.name, e.target.value)}
                        className="w-full p-2 border rounded mt-1 bg-white h-20"
                      />
                    ) : (
                      <input 
                        type={opt.autoFetch ? "text" : "number"}
                        placeholder={opt.autoFetch ? "Auto-fetched..." : `Enter ${opt.name}`}
                        value={formData[opt.name] || ''}
                        onChange={e => handleFieldChange(opt.name, e.target.value)}
                        readOnly={opt.autoFetch}
                        className={`w-full p-2 border rounded mt-1 ${opt.autoFetch ? 'bg-slate-100 text-slate-500' : 'bg-white'}`}
                        required={!opt.autoFetch}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex gap-4">
            <button type="button" onClick={(e) => { e.preventDefault(); alert("Draft saved successfully!"); navigate('/staff-dashboard'); }} disabled={submitting} className="w-1/3 p-4 bg-slate-200 text-slate-700 rounded-xl font-black uppercase tracking-widest shadow-sm hover:bg-slate-300 transition-all active:scale-95 flex items-center justify-center">
              Save Draft
            </button>
            <button type="submit" disabled={submitting} className="w-2/3 p-4 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-widest shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
              <Save size={20} /> {submitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
      <AttendanceSuccessModal
        isOpen={showSuccessModal}
        title="Report Submitted Successfully ✅"
        message={"🎉 Thank you for submitting today's report.\n\nYour Daily Mobilization Report has been submitted successfully.\n\n🙏 Thank you for your valuable contribution to Yashi Skill Project Pvt. Ltd.\n\n🌸 Have a wonderful evening.\n😊 Take care, stay safe and see you tomorrow!\n\n👋 Bye-Bye! Tata! 💐✨"}
        buttonText="✔ Finish"
        onOk={() => {
          setShowSuccessModal(false);
          navigate('/staff-dashboard');
        }}
      />
    </div>
  );
}
