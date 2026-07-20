import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface SyncContextType {
  isSyncing: boolean;
  lastSync: Date | null;
  syncData: () => Promise<void>;
  isOnline: boolean;
}

const SyncContext = createContext<SyncContextType | null>(null);

export function useSync() {
  const context = useContext(SyncContext);
  if (!context) {
    throw new Error('useSync must be used within a SyncProvider');
  }
  return context;
}

export function SyncProvider({ children }: { children: ReactNode }) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [syncStatus, setSyncStatus] = useState<{status: 'idle' | 'success' | 'failed', message: string, records: number}>({status: 'idle', message: '', records: 0});
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('lastSync');
    if (saved) {
      setLastSync(new Date(saved));
    }
  }, []);

  const syncData = async () => {
    if (!navigator.onLine) {
      alert("Cannot sync while offline. Pending tasks will automatically sync when online.");
      return;
    }
    
    setIsSyncing(true);
    try {
      // We will perform getDocs on main small collections to cache them
      // Avoid fetching 'attendance' entirely as it grows infinitely and slows down the app
      const collectionsToSync = [
        'staff', 'centers', 'settings'
      ];
      
      let totalRecords = 0;
      for (const collName of collectionsToSync) {
        const snap = await getDocs(collection(db, collName));
        totalRecords += snap.size;
      }
      setSyncStatus({status: 'success', message: 'Sync completed successfully', records: totalRecords});
      setTimeout(() => setSyncStatus(prev => ({...prev, status: 'idle'})), 5000);
      
      const now = new Date();
      setLastSync(now);
      localStorage.setItem('lastSync', now.toISOString());
    } catch (error) {
      console.error("Sync error:", error);
      setSyncStatus({status: 'failed', message: 'Sync failed: ' + (error as Error).message, records: 0});
      setTimeout(() => setSyncStatus(prev => ({...prev, status: 'idle'})), 5000);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <SyncContext.Provider value={{ isSyncing, lastSync, syncData, isOnline }}>
      {isSyncing && (
        <div className="fixed top-0 left-0 w-full h-1 z-50 overflow-hidden bg-blue-100">
          <div className="h-full bg-blue-600 animate-sync-progress w-1/3 rounded"></div>
        </div>
      )}
      {syncStatus.status !== 'idle' && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full shadow-lg text-xs font-bold uppercase tracking-wider text-white transition-all ${syncStatus.status === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}>
          {syncStatus.status === 'success' ? `Synced ${syncStatus.records} records (${new Date().toLocaleTimeString()})` : syncStatus.message}
        </div>
      )}
      {children}
    </SyncContext.Provider>
  );
}
