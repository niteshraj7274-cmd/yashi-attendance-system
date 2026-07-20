import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, MessageCircle, Mail, Clock, Copy, CheckCircle2 } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';

export default function AdminSupportScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState('');
  
  const [whatsapp, setWhatsapp] = useState('+91 9430462806');
  const [email, setEmail] = useState('support@yashiskillproject.com');
  const [workingHours, setWorkingHours] = useState('Monday – Saturday\n09:00 AM – 06:00 PM');

  useEffect(() => {
    const fetchSupport = async () => {
      try {
        const docRef = doc(db, 'settings', 'support');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.whatsapp) setWhatsapp(data.whatsapp);
          if (data.email) setEmail(data.email);
          if (data.workingHours) setWorkingHours(data.workingHours);
        }
      } catch (err) {
        console.error("Error fetching support:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSupport();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'support'), {
        whatsapp,
        email,
        workingHours
      }, { merge: true });
      alert("Support settings saved successfully!");
    } catch (err) {
      console.error("Error saving support settings:", err);
      alert("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 items-center justify-center font-sans">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <div className="bg-emerald-700 text-white h-20 flex items-center px-6 shadow-md gap-4 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase">Support Management</h1>
          <p className="text-[10px] text-emerald-200 uppercase tracking-widest mt-0.5">Admin Controls</p>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-1 pb-4 border-b border-slate-100">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-800">Support Details</h2>
            <p className="text-xs text-slate-500">Update support contact information</p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Support Name</label>
              <div className="w-full bg-slate-100 border border-slate-200 rounded-lg p-3 text-sm text-slate-700 font-medium">
                YASHI SKILL PROJECT PVT. LTD.
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Support Type</label>
              <div className="w-full bg-slate-100 border border-slate-200 rounded-lg p-3 text-sm text-slate-700 font-medium">
                Technical Support
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex justify-between items-center">
                <span>WhatsApp Support</span>
                <button 
                  onClick={() => handleCopy(whatsapp, 'whatsapp')}
                  className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 normal-case tracking-normal"
                >
                  {copied === 'whatsapp' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                  <span>{copied === 'whatsapp' ? 'Copied' : 'Copy'}</span>
                </button>
              </label>
              <div className="flex items-center">
                <div className="bg-emerald-50 border border-emerald-200 border-r-0 rounded-l-lg p-3 text-emerald-600">
                  <MessageCircle size={18} />
                </div>
                <input 
                  type="text" 
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-r-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="+91 9430462806"
                />
              </div>
              <a 
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-600 hover:text-emerald-700"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex justify-between items-center">
                <span>Support Email</span>
                <button 
                  onClick={() => handleCopy(email, 'email')}
                  className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 normal-case tracking-normal"
                >
                  {copied === 'email' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                  <span>{copied === 'email' ? 'Copied' : 'Copy'}</span>
                </button>
              </label>
              <div className="flex items-center">
                <div className="bg-emerald-50 border border-emerald-200 border-r-0 rounded-l-lg p-3 text-emerald-600">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-r-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="support@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Support Working Hours</label>
              <div className="flex items-start">
                <div className="bg-emerald-50 border border-emerald-200 border-r-0 rounded-l-lg p-3 text-emerald-600 h-[82px] flex items-center">
                  <Clock size={18} />
                </div>
                <textarea 
                  value={workingHours}
                  onChange={(e) => setWorkingHours(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-r-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 h-[82px] resize-none"
                  placeholder="Monday – Saturday\n09:00 AM – 06:00 PM"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={saving}
            className="mt-4 w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-lg shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center text-sm gap-2 uppercase tracking-wider"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <><Save size={18} /> Save Settings</>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
