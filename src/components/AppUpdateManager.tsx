import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, AlertCircle, Package } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { App as CapacitorApp } from '@capacitor/app';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileOpener } from '@capacitor-community/file-opener';
import { Capacitor } from '@capacitor/core';

export default function AppUpdateManager() {
  const [showModal, setShowModal] = useState(false);
  const [updateInfo, setUpdateInfo] = useState<any>(null);
  const [currentVersion, setCurrentVersion] = useState<string>('');
  const [currentBuild, setCurrentBuild] = useState<number>(0);
  
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkForUpdates();
    const handleCheck = () => checkForUpdates();
    window.addEventListener('check-for-updates', handleCheck);
    return () => window.removeEventListener('check-for-updates', handleCheck);
  }, []);

  const checkForUpdates = async () => {
    try {
      let cVersion = '1.0.0';
      let cBuild = 1;

      if (Capacitor.isNativePlatform()) {
        try {
          const appInfo = await CapacitorApp.getInfo();
          cVersion = appInfo.version;
          cBuild = parseInt(appInfo.build, 10);
        } catch (e) {
          console.warn('App info not available', e);
        }
      }
      setCurrentVersion(cVersion);
      setCurrentBuild(cBuild);

      const docRef = doc(db, 'app_config', 'android');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const config = docSnap.data();
        if (config.version_code > cBuild) {
          setUpdateInfo(config);
          setShowModal(true);
        }
      }
    } catch (e) {
      console.error('Update check failed:', e);
    }
  };

  const handleUpdateNow = async () => {
    if (!updateInfo?.apk_download_url) {
      setError('Download URL is missing.');
      return;
    }
    
    const isNative = Capacitor.isNativePlatform();
    if (!isNative) {
       window.open(updateInfo.apk_download_url, '_blank');
       return;
    }

    setDownloading(true);
    setProgress(0);
    setError(null);

    try {
      const fileName = `update-${updateInfo.version_code}.apk`;
      
      const listener = await Filesystem.addListener('progress', (status) => {
        if (status.bytes && status.contentLength) {
          setProgress(Math.round((status.bytes / status.contentLength) * 100));
        }
      });

      const downloadResult = await Filesystem.downloadFile({
        url: updateInfo.apk_download_url,
        path: fileName,
        directory: Directory.Cache,
        progress: true,
      });
      
      listener.remove();
      setProgress(100);

      await FileOpener.open({
        filePath: downloadResult.path || '',
        contentType: 'application/vnd.android.package-archive',
        openWithDefault: true,
      });

    } catch (err: any) {
      console.error('Download or install failed:', err);
      setError(err.message || 'Failed to download the update.');
      setDownloading(false);
    }
  };

  const handleLater = () => {
    if (updateInfo?.force_update) return;
    setShowModal(false);
  };

  if (!showModal || !updateInfo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          <div className="bg-indigo-600 p-6 flex flex-col items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <Package size={48} className="mb-3 relative z-10 drop-shadow-md" />
            <h2 className="text-xl font-bold text-center relative z-10 tracking-wide uppercase">New Version Available</h2>
            <div className="flex items-center justify-center gap-2 mt-2 relative z-10">
              <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded">v{currentVersion}</span>
              <span className="text-indigo-200">→</span>
              <span className="text-xs font-bold bg-white text-indigo-600 px-2 py-1 rounded shadow-sm">v{updateInfo.latest_version}</span>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-bold text-slate-800 text-lg mb-2">{updateInfo.update_title || 'Update Available'}</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {updateInfo.update_message || 'A new version of the application is available. Please update to continue using the latest features.'}
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-medium rounded-lg border border-red-100 flex items-start gap-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {downloading ? (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">
                  <span>Downloading...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 border border-slate-200 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-300 relative overflow-hidden"
                    style={{ width: `${progress}%` }}
                  >
                     <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_1s_infinite]"></div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 text-center mt-2 uppercase tracking-wide">Please keep the app open</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleUpdateNow}
                  className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-widest text-sm shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Download size={18} /> Update Now
                </button>
                {!updateInfo.force_update && (
                  <button
                    onClick={handleLater}
                    className="w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-200 transition-all active:scale-[0.98]"
                  >
                    Later
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
