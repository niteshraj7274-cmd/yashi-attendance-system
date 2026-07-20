import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useLocation } from 'react-router-dom';
import MaintenanceScreen from './MaintenanceScreen';

export default function MaintenanceWrapper({ children }: { children: React.ReactNode }) {
  const [maintenance, setMaintenance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'system_settings', 'maintenance'), (docSnap) => {
      if (docSnap.exists()) {
        setMaintenance(docSnap.data());
      } else {
        setMaintenance(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Allow access to admin login, developer login, and home regardless of maintenance state
  if (location.pathname === '/' || location.pathname === '/home' || location.pathname === '/admin-login' || location.pathname === '/developer-login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm font-medium text-slate-500 uppercase tracking-widest">Loading</p>
      </div>
    );
  }

  const isMaintenanceActive = maintenance?.isActive;
  
  // Check if current user is an admin or developer
  let isAuthorized = false;
  try {
    const sessionStr = localStorage.getItem('userSession');
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      if (session.role === 'admin' || session.role === 'developer') {
        isAuthorized = true;
      }
    }
  } catch (e) {}

  if (isMaintenanceActive && !isAuthorized) {
    return <MaintenanceScreen maintenanceData={maintenance} />;
  }

  return <>{children}</>;
}
