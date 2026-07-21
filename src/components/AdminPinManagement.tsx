import React, { useState, useEffect } from 'react';
import { ShieldCheck, Save, Key, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { logAuditActivity } from '../utils/auditHelpers';

export default function AdminPinManagement() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [jobPinEnabled, setJobPinEnabled] = useState(true);
  const [profPinEnabled, setProfPinEnabled] = useState(true);
  const [jobPinStatus, setJobPinStatus] = useState('Not Set');
  const [profPinStatus, setProfPinStatus] = useState('Not Set');

  const [jobPinInput, setJobPinInput] = useState('');
  const [jobPinConfirm, setJobPinConfirm] = useState('');
  const [profPinInput, setProfPinInput] = useState('');
  const [profPinConfirm, setProfPinConfirm] = useState('');

  const [message, setMessage] = useState('');

  const weakPins = ['0000', '1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999', '1234', '12345', '123456', '1234567', '12345678', '9876', '98765432'];

  const hashPin = async (pin: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(pin);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const docRef = doc(db, 'settings', 'adminPins');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setJobPinEnabled(data.jobPinEnabled !== false);
          setProfPinEnabled(data.profPinEnabled !== false);
          setJobPinStatus(data.jobPinHash ? 'Set' : 'Not Set');
          setProfPinStatus(data.profPinHash ? 'Set' : 'Not Set');
        } else {
          // Defaults if not exist
          const defJobHash = await hashPin('1234');
          const defProfHash = await hashPin('1999');
          await setDoc(docRef, {
            jobPinEnabled: true,
            profPinEnabled: true,
            jobPinHash: defJobHash,
            profPinHash: defProfHash
          });
          setJobPinStatus('Set');
          setProfPinStatus('Set');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPins();
  }, []);

  const validatePin = (pin: string) => {
    if (pin && (pin.length < 4 || pin.length > 8)) return 'PIN must be 4 to 8 digits';
    if (pin && weakPins.includes(pin)) return 'PIN is too weak';
    if (pin && !/^\d+$/.test(pin)) return 'PIN must be numbers only';
    return null;
  };

  const handleSave = async (type: 'job' | 'prof') => {
    setMessage('');
    const input = type === 'job' ? jobPinInput : profPinInput;
    const confirm = type === 'job' ? jobPinConfirm : profPinConfirm;

    if (input) {
      const err = validatePin(input);
      if (err) return setMessage(err);
      if (input !== confirm) return setMessage('PINs do not match');
    }

    setSaving(true);
    try {
      const docRef = doc(db, 'settings', 'adminPins');
      const updateData: any = {};
      if (type === 'job') {
        updateData.jobPinEnabled = jobPinEnabled;
        if (input) updateData.jobPinHash = await hashPin(input);
      } else {
        updateData.profPinEnabled = profPinEnabled;
        if (input) updateData.profPinHash = await hashPin(input);
      }

      await setDoc(docRef, updateData, { merge: true });

      if (input) {
         if (type === 'job') setJobPinStatus('Set');
         else setProfPinStatus('Set');
      }

      const adminName = 'Admin'; // Or fetch from profile
      logAuditActivity('Admin', 'Security', 'Admin', 'Update PIN', `Updated ${type === 'job' ? 'Job Requirement' : 'Professional Dashboard'} PIN settings`, {
        role: 'Admin', userName: adminName, action: 'Update', moduleName: 'Security', newValue: 'PIN Updated'
      });

      setMessage('PIN settings saved successfully!');
      if (type === 'job') { setJobPinInput(''); setJobPinConfirm(''); }
      if (type === 'prof') { setProfPinInput(''); setProfPinConfirm(''); }
    } catch (err) {
      console.error(err);
      setMessage('Failed to save PIN settings');
    } finally {
      setSaving(false);
    }
  };

  const handleGenerate = (type: 'job' | 'prof') => {
    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
    if (type === 'job') {
      setJobPinInput(randomPin);
      setJobPinConfirm(randomPin);
    } else {
      setProfPinInput(randomPin);
      setProfPinConfirm(randomPin);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading PIN settings...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4 mt-6">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <ShieldCheck size={20} className="text-emerald-600" />
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-800">Dashboard PIN Management</h2>
      </div>
      
      {message && <div className="p-3 bg-slate-100 text-sm font-bold text-slate-700 rounded-lg">{message}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Requirement PIN */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-slate-700 text-sm uppercase">Job Requirement</h3>
             <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={jobPinEnabled} onChange={(e) => setJobPinEnabled(e.target.checked)} />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
          <p className="text-xs text-slate-500 mb-4">Status: {jobPinStatus === 'Set' ? '•••• (Set)' : 'Not Set'}</p>
          
          <div className="space-y-3">
             <input type="text" placeholder="New PIN (4-8 digits)" maxLength={8} value={jobPinInput} onChange={e => setJobPinInput(e.target.value.replace(/\D/g, ''))} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-emerald-500" />
             <input type="text" placeholder="Confirm PIN" maxLength={8} value={jobPinConfirm} onChange={e => setJobPinConfirm(e.target.value.replace(/\D/g, ''))} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-emerald-500" />
          </div>

          <div className="flex gap-2 mt-4">
             <button onClick={() => handleGenerate('job')} className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold py-2 rounded transition-colors flex items-center justify-center gap-1"><RefreshCw size={14}/> Generate</button>
             <button onClick={() => handleSave('job')} disabled={saving} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded transition-colors flex items-center justify-center gap-1"><Save size={14}/> Save</button>
          </div>
        </div>

        {/* Professional Dashboard PIN */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-slate-700 text-sm uppercase">Professional Dashboard</h3>
             <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={profPinEnabled} onChange={(e) => setProfPinEnabled(e.target.checked)} />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
          <p className="text-xs text-slate-500 mb-4">Status: {profPinStatus === 'Set' ? '•••• (Set)' : 'Not Set'}</p>
          
          <div className="space-y-3">
             <input type="text" placeholder="New PIN (4-8 digits)" maxLength={8} value={profPinInput} onChange={e => setProfPinInput(e.target.value.replace(/\D/g, ''))} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-emerald-500" />
             <input type="text" placeholder="Confirm PIN" maxLength={8} value={profPinConfirm} onChange={e => setProfPinConfirm(e.target.value.replace(/\D/g, ''))} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-emerald-500" />
          </div>

          <div className="flex gap-2 mt-4">
             <button onClick={() => handleGenerate('prof')} className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold py-2 rounded transition-colors flex items-center justify-center gap-1"><RefreshCw size={14}/> Generate</button>
             <button onClick={() => handleSave('prof')} disabled={saving} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded transition-colors flex items-center justify-center gap-1"><Save size={14}/> Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
