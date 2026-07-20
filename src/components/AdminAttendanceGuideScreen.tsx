import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Plus, Trash2, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

export default function AdminAttendanceGuideScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [guideData, setGuideData] = useState<any>({
    howToMark: ['Step 1: Allow Location and Camera permissions.', 'Step 2: Take a clear selfie.', 'Step 3: Click IN/OUT.'],
    timingRules: ['Attendance starts at 9:00 AM.', 'Late mark after 9:15 AM.'],
    geofenceRules: ['You must be within 300 meters of the center.', 'Outside geofence attendance is recorded but marked Outside Geofence.'],
    gpsRules: ['GPS must be turned ON.', 'High accuracy mode is recommended.'],
    internetRules: ['Active internet connection is required to sync attendance.'],
    deviceRules: ['Attendance must be marked from your registered device.'],
    statusExplanation: [
      { status: 'Present', desc: 'Marked on time within geofence.' },
      { status: 'Late', desc: 'Marked after grace period.' },
      { status: 'Outside Geofence', desc: 'Marked away from the center.' }
    ],
    faqs: [],
    notices: []
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'attendance_guide'), (snap) => {
      if (snap.exists()) {
        setGuideData({ ...guideData, ...snap.data() });
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'attendance_guide'), guideData);
      alert('Attendance Guide updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save guide.');
    } finally {
      setSaving(false);
    }
  };

  const updateArrayField = (field: string, index: number, value: string) => {
    const newArr = [...guideData[field]];
    newArr[index] = value;
    setGuideData({ ...guideData, [field]: newArr });
  };

  const addArrayItem = (field: string) => {
    setGuideData({ ...guideData, [field]: [...guideData[field], ''] });
  };

  const removeArrayItem = (field: string, index: number) => {
    const newArr = [...guideData[field]];
    newArr.splice(index, 1);
    setGuideData({ ...guideData, [field]: newArr });
  };

  const addNotice = () => {
    setGuideData({
      ...guideData,
      notices: [{ title: '', message: '', date: new Date().toLocaleDateString('en-CA'), publishedBy: 'Admin' }, ...guideData.notices]
    });
  };

  const updateNotice = (index: number, key: string, value: string) => {
    const newNotices = [...guideData.notices];
    newNotices[index] = { ...newNotices[index], [key]: value };
    setGuideData({ ...guideData, notices: newNotices });
  };

  const removeNotice = (index: number) => {
    const newNotices = [...guideData.notices];
    newNotices.splice(index, 1);
    setGuideData({ ...guideData, notices: newNotices });
  };

  const renderStringArraySection = (title: string, field: string) => (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">{title}</h2>
        <button onClick={() => addArrayItem(field)} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-bold flex items-center gap-1">
          <Plus size={14} /> Add Rule
        </button>
      </div>
      <div className="space-y-2">
        {guideData[field].map((item: string, idx: number) => (
          <div key={idx} className="flex gap-2">
            <input 
              type="text" 
              value={item} 
              onChange={(e) => updateArrayField(field, idx, e.target.value)} 
              className="flex-1 p-2 border border-slate-300 rounded text-sm bg-slate-50 focus:bg-white outline-none focus:border-emerald-500"
            />
            <button onClick={() => removeArrayItem(field, idx)} className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {guideData[field].length === 0 && <p className="text-xs text-slate-400 italic">No rules added.</p>}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <div className="bg-emerald-700 text-white h-20 flex items-center px-6 shadow-md gap-4 shrink-0 z-10 sticky top-0">
        <button onClick={() => navigate('/admin-dashboard')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase flex items-center gap-2">
            <BookOpen size={20} /> Attendance Guide
          </h1>
          <p className="text-[10px] text-emerald-200 uppercase tracking-widest mt-0.5">Manage Center Guidelines</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-sm transition-colors border border-emerald-500">
          <Save size={16} /> {saving ? 'Saving...' : 'Save All'}
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto pb-20">
            
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Notices & Updates</h2>
                <button onClick={addNotice} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-bold flex items-center gap-1">
                  <Plus size={14} /> Add Notice
                </button>
              </div>
              <div className="space-y-4">
                {guideData.notices.map((notice: any, idx: number) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg relative group">
                    <button onClick={() => removeNotice(idx)} className="absolute top-2 right-2 p-1 text-red-500 bg-red-50 rounded hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={14} />
                    </button>
                    <div className="space-y-2 mb-2 pr-8">
                      <input type="text" value={notice.title} onChange={e => updateNotice(idx, 'title', e.target.value)} placeholder="Notice Title" className="w-full p-2 border border-slate-300 rounded text-sm outline-none focus:border-emerald-500 font-bold" />
                      <textarea value={notice.message} onChange={e => updateNotice(idx, 'message', e.target.value)} placeholder="Notice Message" className="w-full p-2 border border-slate-300 rounded text-sm outline-none focus:border-emerald-500 h-20 resize-none" />
                    </div>
                    <div className="flex gap-2 text-xs">
                      <input type="text" value={notice.publishedBy} onChange={e => updateNotice(idx, 'publishedBy', e.target.value)} placeholder="Published By" className="flex-1 p-2 border border-slate-300 rounded outline-none focus:border-emerald-500" />
                      <input type="date" value={notice.date} onChange={e => updateNotice(idx, 'date', e.target.value)} className="flex-1 p-2 border border-slate-300 rounded outline-none focus:border-emerald-500" />
                    </div>
                  </div>
                ))}
                {guideData.notices.length === 0 && <p className="text-xs text-slate-400 italic text-center py-4">No active notices.</p>}
              </div>
            </div>

            {renderStringArraySection('1. How to Mark Attendance', 'howToMark')}
            {renderStringArraySection('2. Attendance Timing Rules', 'timingRules')}
            {renderStringArraySection('3. Geofence Rules', 'geofenceRules')}
            {renderStringArraySection('4. GPS & Location Rules', 'gpsRules')}
            {renderStringArraySection('5. Internet Rules', 'internetRules')}
            {renderStringArraySection('6. Device Registration Rules', 'deviceRules')}
            {renderStringArraySection('9. Frequently Asked Questions (FAQ)', 'faqs')}
            
          </div>
        )}
      </div>
    </div>
  );
}
