import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Lock, ChevronDown, RefreshCw } from 'lucide-react';
import { useSync } from './SyncContext';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, getDocs, doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { logAuditActivity } from '../utils/auditHelpers';
import { useDeviceRegistration } from '../hooks/useDeviceRegistration';
import { ShieldAlert } from 'lucide-react';
import { useActiveCenters } from '../hooks/useActiveCenters';

export default function CentreLoginScreen() {
  const navigate = useNavigate();
  const { centers, loading: fetchingCenters } = useActiveCenters();
  const { isRegistered, deviceId, deviceData } = useDeviceRegistration();
  const [selectedCenter, setSelectedCenter] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  React.useEffect(() => {
    const sessionStr = localStorage.getItem('centreSession');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        if (session.centerId) {
          navigate(`/centre/${session.centerId}/staff`);
        }
      } catch(e) {}
    }
  }, [navigate]);
  const { syncData, isSyncing } = useSync();
  useEffect(() => {
    if (deviceData?.centerId) {
      const match = centers.find(c => c.id === deviceData.centerId || c.name === deviceData.centerName);
      if (match) {
        setSelectedCenter(match.id);
      } else {
        setSelectedCenter(deviceData.centerId);
      }
    }
  }, [deviceData, centers]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isRegistered === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (deviceData && deviceData.status === 'Pending') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-slate-100">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert size={40} className="text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Waiting for Admin Approval</h2>
          <p className="text-slate-600 mb-8">Your device registration request has been submitted. Please wait for the Administrator to approve it.</p>
          <div className="bg-slate-100 p-4 rounded-xl mb-8">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Your Device ID</p>
            <p className="text-3xl font-mono font-bold text-slate-800 tracking-widest">{deviceId}</p>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => navigate('/admin-login')} className="w-full py-4 bg-emerald-700 text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-emerald-600 transition-colors shadow-md">
              Admin Login
            </button>
            <button onClick={() => navigate('/')} className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-slate-200 transition-colors">
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }
  
  if (deviceData && deviceData.status === 'Blocked') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-slate-100">
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert size={40} className="text-rose-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Device Access Revoked</h2>
          <p className="text-slate-600 mb-8">This device is no longer authorized to access the Center Portal.</p>
          <div className="bg-slate-100 p-4 rounded-xl mb-8">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Your Device ID</p>
            <p className="text-3xl font-mono font-bold text-slate-800 tracking-widest">{deviceId}</p>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => navigate('/admin-login')} className="w-full py-4 bg-emerald-700 text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-emerald-600 transition-colors shadow-md">
              Admin Login
            </button>
            <button onClick={() => navigate('/')} className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-slate-200 transition-colors">
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCenter) {
      setError('Please select a center.');
      return;
    }
    if (!pin || pin.length !== 4) {
      setError('Please enter a 4-digit PIN.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      let centerDoc = await getDoc(doc(db, 'centers', selectedCenter));
      let targetCenterId = selectedCenter;
      
      if (!centerDoc.exists()) {
        // Fallback: Search by code or name if direct ID lookup fails
        const centersQuery = query(collection(db, 'centers'));
        const allCentersSnap = await getDocs(centersQuery);
        let found = false;
        
        for (const cDoc of allCentersSnap.docs) {
          const cData = cDoc.data();
          if (cData.code === selectedCenter || cData.name === deviceData?.centerName) {
            centerDoc = cDoc;
            targetCenterId = cDoc.id;
            found = true;
            break;
          }
        }
        
        if (!found) {
          setError('Centre not found.');
          setLoading(false);
          return;
        }
      }

      const centerData = centerDoc.data() || {};
      const validPin = centerData.pin || '1234';

      if (centerData.status === 'Inactive') {
        setError('This Center is inactive.');
        setLoading(false);
        return;
      }
      if (String(pin) === String(validPin)) {
        localStorage.setItem('centreSession', JSON.stringify({
          centerId: targetCenterId,
          centerName: centerData.name
        }));
        logAuditActivity(centerData.name, 'Authentication', centerData.name, 'Login', 'Center logged in', {
          role: 'Center',
          userName: centerData.name,
          centerName: centerData.name,
          centerCode: centerData.code,
          moduleName: 'Authentication',
          action: 'Login'
        });
        navigate(`/centre/${selectedCenter}/staff`);
      } else {
        setError('Invalid Centre PIN.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  const selectedCenterData = centers.find(c => 
    c.id === selectedCenter || 
    c.code === selectedCenter || 
    (deviceData && c.name === deviceData.centerName)
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-100 to-blue-100 text-slate-900 font-sans overflow-hidden">
      <div className="bg-blue-900 text-white h-20 flex items-center px-6 shadow-md gap-4">
        <button onClick={() => navigate('/home')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase">Centre Client Login</h1>
          <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5">Access your center dashboard</p>
        </div>
        <button onClick={syncData} disabled={isSyncing} className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600 relative group">
          <RefreshCw size={20} className={isSyncing ? 'animate-spin' : ''} />
          <div className="absolute top-12 right-0 w-32 bg-slate-800 text-white text-[10px] p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
            Smart Sync System
          </div>
        </button>
      </div>

      <div className="flex-1 p-6 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden border border-slate-200">
              <img src="/logo.svg" alt="YASHI SKILL PROJECT PVT. LTD. Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <h2 className="text-lg font-bold text-center text-slate-800 mb-8 uppercase tracking-wide">Centre Portal</h2>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5" ref={dropdownRef}>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Select Center</label>
              <div className="relative">
                <div 
                  onClick={() => (!fetchingCenters) && setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full p-3 pr-10 ${"bg-slate-50"} border ${isDropdownOpen ? "border-blue-500 ring-2 ring-blue-500" : "border-slate-200"} rounded-lg outline-none transition-all text-sm font-medium ${"cursor-pointer"} flex items-center justify-between ${fetchingCenters ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  <span className={!selectedCenterData ? 'text-slate-500' : 'text-slate-900'}>
                    {fetchingCenters ? 'Loading centers...' : selectedCenterData ? `${selectedCenterData.code} - ${selectedCenterData.name}` : deviceData?.centerName ? `${deviceData.centerName}` : '-- Select Center --'}
                  </span>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
                    <ChevronDown size={18} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                    >
                      {centers.length === 0 ? (
                        <div className="p-3 text-sm text-slate-500 text-center">No Active Center Available</div>
                      ) : (
                        centers.map(center => (
                          <div
                            key={center.id}
                            onClick={() => {
                              setSelectedCenter(center.id);
                              setIsDropdownOpen(false);
                            }}
                            className={`p-3 text-sm cursor-pointer transition-colors ${selectedCenter === center.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
                          >
                            {center.code} - {center.name}
                          </div>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">4-Digit Centre PIN</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium tracking-[0.5em] text-center"
                  placeholder="••••"
                  maxLength={4}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-2 w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center text-sm"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "LOGIN SECURELY"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
