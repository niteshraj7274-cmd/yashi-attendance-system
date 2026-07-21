import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, UserCircle, Lock } from 'lucide-react';
import { logAuditActivity } from '../utils/auditHelpers';
import { motion } from 'motion/react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AdminProfileScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [profile, setProfile] = useState<any>({
    name: 'Neeraj Kumar',
    mobile: '',
    email: '',
    designation: 'MIS Manager',
    profilePhoto: '',
    digitalSignature: '',
    pin: '1999'
  });

  useEffect(() => {
    const sessionStr = localStorage.getItem('userSession');
    if (!sessionStr) {
      navigate('/admin-login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'settings', 'adminProfile');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile({ ...profile, ...docSnap.data() });
        }
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleSave = async () => {
    if (profile.pin && profile.pin.length !== 4) {
      alert("PIN must be exactly 4 digits.");
      return;
    }
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'adminProfile'), profile, { merge: true });
      logAuditActivity('Admin', 'Profile', 'Admin', 'Update', 'Updated Admin Profile/PIN', {
        role: 'Admin', userName: 'Admin', action: 'Update', moduleName: 'Profile', newValue: 'Admin Profile'
      });
      alert('Profile updated successfully!');
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 items-center justify-center font-sans overflow-hidden">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <div className="bg-emerald-700 text-white h-20 flex items-center justify-between px-6 shadow-md">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold tracking-tight uppercase">Edit Profile</h1>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="flex items-center gap-2 bg-white text-emerald-700 px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-emerald-50 transition-colors disabled:opacity-50 text-sm uppercase tracking-wider"
        >
          {saving ? 'SAVING...' : <><Save size={16} /> SAVE</>}
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto pb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200"
        >
          <div className="flex flex-col items-center gap-3 mb-2">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200 relative overflow-hidden text-slate-400">
              {profile.profilePhoto ? (
                <img src={profile.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <UserCircle size={40} />
              )}
            </div>
            <button className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
              <Upload size={14} /> Upload Photo
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
            <input 
              type="text" 
              value={profile.name}
              onChange={(e) => setProfile({...profile, name: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-medium"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Designation</label>
            <input 
              type="text" 
              value={profile.designation}
              onChange={(e) => setProfile({...profile, designation: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-medium"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Mobile Number</label>
            <input 
              type="tel" 
              value={profile.mobile}
              onChange={(e) => setProfile({...profile, mobile: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-medium"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Email ID</label>
            <input 
              type="email" 
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-medium"
            />
          </div>

          <div className="flex flex-col gap-1.5 mt-2 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
            <div className="flex items-center gap-2 mb-2">
              <Lock size={16} className="text-emerald-700" />
              <label className="text-sm font-bold text-slate-800 uppercase tracking-wide">Admin PIN</label>
            </div>
            <input 
              type="text" 
              value={profile.pin}
              onChange={(e) => setProfile({...profile, pin: e.target.value.replace(/\D/g, '').slice(0, 4)})}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-medium tracking-[0.5em]"
              placeholder="1999"
              maxLength={4}
            />
            <span className="text-[10px] text-emerald-600 mt-1 font-medium">Use this 4-digit PIN for Admin Login and Professional Dashboard</span>
          </div>

          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Digital Signature</label>
            <div className="w-full h-24 bg-slate-50 border border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 gap-2 hover:bg-slate-100 transition-colors cursor-pointer relative overflow-hidden">
              {profile.digitalSignature ? (
                <img src={profile.digitalSignature} alt="Signature" className="h-full object-contain mix-blend-multiply" />
              ) : (
                <>
                  <Upload size={20} />
                  <span className="text-xs font-bold uppercase tracking-wider">Upload Signature</span>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
