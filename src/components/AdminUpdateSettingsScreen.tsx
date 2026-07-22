import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Save, UploadCloud } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function AdminUpdateSettingsScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    latest_version: '1.0.0',
    version_code: 1,
    apk_download_url: '',
    force_update: false,
    update_title: 'New Update Available',
    update_message: 'Please update the app to the latest version to enjoy new features.',
    minimum_supported_version: '1.0.0',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'app_config', 'android');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(prev => ({ ...prev, ...docSnap.data() }));
        }
      } catch (error) {
        console.error('Error fetching update settings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : (name === 'version_code' ? parseInt(value) || 0 : value)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'app_config', 'android'), {
        ...settings,
        release_date: new Date()
      }, { merge: true });
      alert('Update settings saved successfully.');
    } catch (error) {
      console.error('Error saving update settings:', error);
      alert('Failed to save update settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      <div className="bg-indigo-700 text-white p-6 shadow-md shrink-0">
        <div className="flex justify-between items-start mb-2 gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors shrink-0">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <UploadCloud size={20} className="text-indigo-300" />
              <h1 className="text-xl font-bold tracking-tight uppercase leading-tight">OTA Update Settings</h1>
            </div>
            <p className="text-[10px] text-indigo-200 uppercase tracking-widest mt-0.5">Manage Android App Updates</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-10 h-full gap-2">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-slate-500 uppercase">Loading...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-2">Version Control</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-1 block">Latest Version (String)</label>
                  <input
                    type="text"
                    name="latest_version"
                    value={settings.latest_version}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                    placeholder="e.g. 1.0.2"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-1 block">Version Code (Number)</label>
                  <input
                    type="number"
                    name="version_code"
                    value={settings.version_code}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                    placeholder="e.g. 3"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-1 block">APK Download URL</label>
                <input
                  type="url"
                  name="apk_download_url"
                  value={settings.apk_download_url}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-2">Update Prompt UI</h2>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-1 block">Update Title</label>
                <input
                  type="text"
                  name="update_title"
                  value={settings.update_title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-1 block">Update Message</label>
                <textarea
                  name="update_message"
                  value={settings.update_message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm font-medium min-h-[100px]"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100 mt-2">
                <div>
                  <h3 className="font-bold text-red-800 text-sm">Force Update</h3>
                  <p className="text-xs text-red-600 mt-1">Block app access until update is installed.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="force_update"
                    checked={settings.force_update}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-red-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-red-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="mt-2 w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-4 rounded-xl shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center text-sm gap-2 uppercase tracking-wider"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <><Save size={18} /> Save Settings</>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
