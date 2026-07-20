import React, { useState } from 'react';
import { Settings, ShieldAlert, Phone, Code, ArrowLeft, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function MaintenanceScreen({ maintenanceData }: { maintenanceData?: any }) {
  const navigate = useNavigate();
  const [tapCount, setTapCount] = useState(0);

  const handleDevTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (newCount >= 5) {
      navigate('/developer-login');
      setTapCount(0);
    }
    setTimeout(() => {
      setTapCount(0);
    }, 3000);
  };

  const handleBack = () => {
    // Navigate safely to home instead of relying on history which might exit app
    navigate('/home');
  };

  const handleHome = () => {
    navigate('/home');
  };

  const contact = maintenanceData?.emergencyContact || '7274846471';
  const title = maintenanceData?.title || 'SYSTEM UNDER MAINTENANCE';
  const reason = maintenanceData?.reason || 'System Upgrade';
  const message = maintenanceData?.message || 'We are currently improving the application.';
  const expectedCompletionTime = maintenanceData?.expectedCompletionTime || '';

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/5 z-0" />
      
      {/* Navigation Controls */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-50">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <button 
          onClick={handleHome}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors uppercase tracking-widest"
        >
          <Home size={16} /> Home
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-2xl shadow-2xl border border-slate-200 z-10 max-w-md w-full text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />
        
        <div className="flex justify-center mb-6 relative">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-slate-100 shadow-sm z-10 relative">
            <img src="/logo.svg" alt="YASHI SKILL PROJECT PVT. LTD. Logo" className="w-12 h-12 object-contain" />
          </div>
          <div className="absolute top-0 right-1/4 animate-spin-slow" style={{ animationDuration: '4s' }}>
             <Settings size={24} className="text-blue-200" />
          </div>
        </div>

        <h1 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-wide">{title}</h1>
        <p className="text-sm text-slate-500 mb-6 font-medium">{message}</p>

        <div className="bg-slate-50 rounded-xl p-4 text-left mb-6 border border-slate-200 shadow-inner">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-widest mb-3 border-b border-slate-200 pb-2">We are improving by:</p>
          <ul className="text-sm text-slate-600 space-y-2 font-medium">
            <li className="flex items-center gap-2"><span className="text-blue-500">•</span> Fixing Bugs</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">•</span> Security Updates</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">•</span> Performance Optimization</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">•</span> Database Maintenance</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">•</span> {reason}</li>
          </ul>
        </div>
        
        {expectedCompletionTime && (
          <div className="bg-orange-50 text-orange-800 p-3 rounded-lg border border-orange-100 mb-4 text-sm font-medium flex items-center justify-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-orange-600">Expected Completion:</span>
            {expectedCompletionTime}
          </div>
        )}

        <p className="text-sm text-slate-600 font-medium mb-4">The application will be available again shortly.</p>
        
        <div className="bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-100 flex flex-col items-center justify-center gap-2">
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600">For urgent assistance please contact:</span>
          <div className="flex items-center gap-2 font-mono text-lg font-bold bg-white px-4 py-2 rounded-lg shadow-sm">
            <Phone size={18} />
            {contact}
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-6 font-medium uppercase tracking-widest">Thank you for your patience.</p>
      </motion.div>
      
      {/* Hidden Developer Access Button in Bottom Right */}
      <button 
        onClick={handleDevTap}
        className={`absolute bottom-4 right-4 flex items-center gap-2 text-xs font-bold tracking-wider uppercase bg-slate-800 text-slate-300 px-4 py-2 rounded-lg transition-all z-50 ${tapCount >= 3 ? 'opacity-30' : 'opacity-0'}`}
      >
        <Code size={14} /> Developer Access
      </button>
    </div>
  );
}
