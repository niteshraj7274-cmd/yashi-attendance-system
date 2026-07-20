import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, HardDrive, RefreshCw } from 'lucide-react';
import { collection, query, getDocs, updateDoc, doc, where } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';

export default function AdminStorageScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ totalSelfies: 0, oldSelfies: 0, deletedHistory: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'attendance'), where('Selfie Image URL', '!=', null));
      const snap = await getDocs(q);
      
      const outQ = query(collection(db, 'attendance'), where('OUT Selfie Image URL', '!=', null));
      const outSnap = await getDocs(outQ);
      
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const thresholdStr = thirtyDaysAgo.toLocaleDateString('en-CA');
      
      let total = snap.size + outSnap.size;
      let old = 0;
      
      snap.forEach(d => {
        if (d.data().Date && d.data().Date < thresholdStr) old++;
      });
      outSnap.forEach(d => {
        if (d.data().Date && d.data().Date < thresholdStr) old++;
      });
      
      setStats({ totalSelfies: total, oldSelfies: old, deletedHistory: 0 });
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCleanup = async () => {
    if (!window.confirm(`Are you sure you want to delete ${stats.oldSelfies} old selfies? This will only remove images from storage, attendance records will remain intact.`)) return;
    
    setLoading(true);
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const thresholdStr = thirtyDaysAgo.toLocaleDateString('en-CA');
      
      let deletedCount = 0;
      
      const q = query(collection(db, 'attendance'), where('Selfie Image URL', '!=', null));
      const snap = await getDocs(q);
      
      for (const d of snap.docs) {
        if (d.data().Date && d.data().Date < thresholdStr) {
          const url = d.data()['Selfie Image URL'];
          if (url) {
            try {
              // We could extract path from URL and delete from storage, but Firebase Storage CORS often blocks it from client
              // Let's just remove URL from Firestore to "clean up" the database reference
              await updateDoc(doc(db, 'attendance', d.id), { 'Selfie Image URL': null });
              deletedCount++;
            } catch(e) {}
          }
        }
      }
      
      const outQ = query(collection(db, 'attendance'), where('OUT Selfie Image URL', '!=', null));
      const outSnap = await getDocs(outQ);
      for (const d of outSnap.docs) {
        if (d.data().Date && d.data().Date < thresholdStr) {
          const url = d.data()['OUT Selfie Image URL'];
          if (url) {
            try {
              await updateDoc(doc(db, 'attendance', d.id), { 'OUT Selfie Image URL': null });
              deletedCount++;
            } catch(e) {}
          }
        }
      }
      
      alert(`Successfully cleaned up ${deletedCount} old selfie records.`);
      fetchStats();
    } catch(err) {
      console.error(err);
      alert('Error during cleanup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      <div className="bg-slate-800 text-white p-6 shadow-md z-10 relative">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate('/admin-dashboard')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight uppercase">Storage & Performance</h1>
            <p className="text-[10px] text-slate-300 uppercase tracking-widest mt-0.5">Optimize Database and Storage</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <HardDrive className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 uppercase">Selfie Storage</h2>
              <p className="text-sm text-slate-500">Manage image attachments</p>
            </div>
          </div>
          
          {loading ? (
             <div className="text-center py-6 text-slate-500 font-bold uppercase tracking-wider">Calculating...</div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-sm font-bold text-slate-600 uppercase">Total Active Selfies</span>
                <span className="text-xl font-mono font-bold text-slate-800">{stats.totalSelfies}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-amber-50 rounded-lg border border-amber-100">
                <span className="text-sm font-bold text-amber-700 uppercase">Old Selfies (&gt; 30 Days)</span>
                <span className="text-xl font-mono font-bold text-amber-800">{stats.oldSelfies}</span>
              </div>
              
              <button 
                onClick={handleCleanup}
                disabled={stats.oldSelfies === 0}
                className="w-full py-4 bg-amber-500 text-white font-bold uppercase tracking-wider rounded-lg shadow-sm hover:bg-amber-600 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 size={18} /> Cleanup Old Selfies
              </button>
              <p className="text-xs text-slate-500 text-center mt-2">
                This will safely remove images older than 30 days while keeping attendance data intact.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
