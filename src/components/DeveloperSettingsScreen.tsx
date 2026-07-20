import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ShieldCheck, Settings, Server, Database, Activity, Code, Bug, 
  Trash2, RefreshCw, Zap, Cpu, HardDrive, Smartphone, Wrench, AlertTriangle, Play, LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp, addDoc, collection } from 'firebase/firestore';

const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

export default function DeveloperSettingsScreen() {
  const navigate = useNavigate();
  const [maintenance, setMaintenance] = useState({
    isActive: false,
    title: 'SYSTEM UNDER MAINTENANCE',
    reason: 'System Upgrade',
    message: 'We are currently improving the application.',
    expectedCompletionTime: '',
    emergencyContact: '7274846471'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('maintenance');
  const [logs, setLogs] = useState<string[]>([]);
  const [runningTask, setRunningTask] = useState<string | null>(null);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    navigate('/developer-login');
  };

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      alert('Session expired due to inactivity.');
      handleLogout();
    }, INACTIVITY_TIMEOUT_MS);
  };

  useEffect(() => {
    // Check if auth is valid for Developer Settings
    const sessionStr = localStorage.getItem('userSession');
    let isAuthorized = false;
    if (sessionStr) {
      try {
        // Try decoding base64 if it's the new encrypted format
        const decoded = atob(sessionStr);
        const session = JSON.parse(decoded);
        if (session.role === 'developer' || session.role === 'admin') {
          isAuthorized = true;
        }
      } catch (e) {
        // Fallback for old format
        try {
          const session = JSON.parse(sessionStr);
          if (session.role === 'admin' || session.role === 'developer') {
            isAuthorized = true;
          }
        } catch (err) {
          isAuthorized = false;
        }
      }
    }
    
    if (!isAuthorized) {
      navigate('/developer-login');
      return;
    }

    // Set up inactivity tracking
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);
    resetTimer();

    const fetchMaintenance = async () => {
      try {
        const docRef = doc(db, 'system_settings', 'maintenance');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setMaintenance(snap.data() as any);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
        addLog('Developer Settings Initialized.');
      }
    };
    fetchMaintenance();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, [navigate]);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] ${msg}`, ...prev]);
  };

  const handleSaveMaintenance = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'system_settings', 'maintenance'), {
        ...maintenance,
        updatedAt: serverTimestamp(),
        developerId: 'Web Developer'
      });
      
      // Log Maintenance ON/OFF action
      await addDoc(collection(db, 'developer_login_logs'), {
        action: 'maintenance_update',
        isActive: maintenance.isActive,
        updatedBy: '7274846471',
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent
      });

      addLog(`Maintenance mode saved. Active: ${maintenance.isActive}`);
      alert('Maintenance settings saved successfully.');
    } catch (e) {
      addLog(`Error saving maintenance settings: ${e}`);
      alert('Failed to save settings.');
    }
    setSaving(false);
  };

  const runMockTask = async (taskName: string) => {
    if (runningTask) return;
    setRunningTask(taskName);
    addLog(`Starting task: ${taskName}...`);
    
    // Simulate task duration
    await new Promise(res => setTimeout(res, 2000 + Math.random() * 2000));
    
    if (taskName === 'Cache Clear') {
      const sessionStr = localStorage.getItem('userSession');
      const deviceIdStr = localStorage.getItem('deviceId');
      localStorage.clear();
      // Keep user session and device id
      if (sessionStr) {
        localStorage.setItem('userSession', sessionStr);
      }
      if (deviceIdStr) {
        localStorage.setItem('deviceId', deviceIdStr);
      }
      addLog('Local storage cache cleared. User session and device id retained.');
    }
    
    addLog(`Task completed successfully: ${taskName}`);
    setRunningTask(null);
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-300 font-sans selection:bg-emerald-500/30">
      <div className="bg-slate-950 text-white h-16 flex items-center px-4 border-b border-slate-800 shrink-0 justify-between">
        <div className="flex items-center">
          <button onClick={() => navigate('/home')} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="ml-2 flex flex-col">
            <h1 className="text-sm font-bold tracking-widest uppercase text-emerald-400 flex items-center gap-2">
              <Code size={16} /> Developer Settings
            </h1>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/10 transition-colors border border-red-500/20"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-48 bg-slate-950/50 border-r border-slate-800 flex flex-col p-2 gap-1 overflow-y-auto shrink-0">
          {[
            { id: 'maintenance', icon: Wrench, label: 'Maintenance' },
            { id: 'system', icon: Server, label: 'System Health' },
            { id: 'database', icon: Database, label: 'Database' },
            { id: 'logs', icon: Bug, label: 'System Logs' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 p-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === tab.id ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            
            {activeTab === 'maintenance' && (
              <motion.div
                key="maintenance"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl"
              >
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500" />
                  <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                    <AlertTriangle className="text-orange-500" size={20} /> Maintenance Mode Control
                  </h2>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-700 mb-6">
                    <div>
                      <h3 className="font-bold text-white uppercase tracking-wider text-sm">Status</h3>
                      <p className="text-xs text-slate-400 mt-1">Enable to block all normal users.</p>
                    </div>
                    <button 
                      onClick={() => setMaintenance(prev => ({...prev, isActive: !prev.isActive}))}
                      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${maintenance.isActive ? 'bg-orange-500' : 'bg-slate-600'}`}
                    >
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${maintenance.isActive ? 'translate-x-8' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Maintenance Title</label>
                      <input 
                        value={maintenance.title}
                        onChange={e => setMaintenance(prev => ({...prev, title: e.target.value}))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Reason</label>
                      <input 
                        value={maintenance.reason}
                        onChange={e => setMaintenance(prev => ({...prev, reason: e.target.value}))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Message</label>
                      <textarea 
                        value={maintenance.message}
                        onChange={e => setMaintenance(prev => ({...prev, message: e.target.value}))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-emerald-500 outline-none transition-all min-h-[100px]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Expected Completion Time (Optional)</label>
                      <input 
                        value={maintenance.expectedCompletionTime || ''}
                        onChange={e => setMaintenance(prev => ({...prev, expectedCompletionTime: e.target.value}))}
                        placeholder="e.g. 02:00 PM IST"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Emergency Contact</label>
                      <input 
                        value={maintenance.emergencyContact}
                        onChange={e => setMaintenance(prev => ({...prev, emergencyContact: e.target.value}))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-emerald-500 outline-none transition-all font-mono"
                      />
                    </div>

                    <button 
                      onClick={handleSaveMaintenance}
                      disabled={saving}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest p-4 rounded-lg transition-colors mt-4 flex items-center justify-center gap-2"
                    >
                      {saving ? <RefreshCw size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                      Save Configuration
                    </button>
                  </div>
                </div>
              </motion.div>
            )}



            {activeTab === 'system' && (
              <motion.div
                key="system"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl"
              >
                {[
                  { name: 'System Health Check', icon: Server, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                  { name: 'Force Sync', icon: RefreshCw, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                  { name: 'Cache Clear', icon: Trash2, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                  { name: 'Temporary File Cleaner', icon: HardDrive, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                  { name: 'Notification Tester', icon: Smartphone, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                  { name: 'API Connection Test', icon: Activity, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                  { name: 'Memory Usage Monitor', icon: Cpu, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                  { name: 'CPU Performance Monitor', icon: Activity, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                  { name: 'App Version Manager', icon: Settings, color: 'text-slate-400', bg: 'bg-slate-500/10' },
                  { name: 'Update Manager', icon: Zap, color: 'text-slate-400', bg: 'bg-slate-500/10' },
                ].map((tool, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${tool.bg} ${tool.color}`}><tool.icon size={16} /></div>
                      <span className="font-bold text-xs uppercase tracking-wider text-slate-300">{tool.name}</span>
                    </div>
                    <button 
                      onClick={() => runMockTask(tool.name)}
                      disabled={runningTask !== null}
                      className="p-2 bg-slate-800 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                    >
                      {runningTask === tool.name ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'database' && (
              <motion.div
                key="database"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl"
              >
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-4">
                  <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Database className="text-blue-400" size={18} /> Database Tools
                  </h2>
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => runMockTask('Backup Database')}
                      disabled={runningTask !== null}
                      className="bg-blue-600/20 text-blue-400 border border-blue-600/30 hover:bg-blue-600/30 font-bold text-xs uppercase tracking-widest p-4 rounded-lg transition-colors flex items-center justify-between"
                    >
                      <span>Backup Database</span>
                      {runningTask === 'Backup Database' ? <RefreshCw size={16} className="animate-spin" /> : <HardDrive size={16} />}
                    </button>
                    <button 
                      onClick={() => runMockTask('Restore Database')}
                      disabled={runningTask !== null}
                      className="bg-orange-600/20 text-orange-400 border border-orange-600/30 hover:bg-orange-600/30 font-bold text-xs uppercase tracking-widest p-4 rounded-lg transition-colors flex items-center justify-between"
                    >
                      <span>Restore Database</span>
                      {runningTask === 'Restore Database' ? <RefreshCw size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                    </button>
                    <button 
                      onClick={() => runMockTask('Storage Health Check')}
                      disabled={runningTask !== null}
                      className="bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 font-bold text-xs uppercase tracking-widest p-4 rounded-lg transition-colors flex items-center justify-between"
                    >
                      <span>Storage Health Check</span>
                      {runningTask === 'Storage Health Check' ? <RefreshCw size={16} className="animate-spin" /> : <Activity size={16} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'logs' && (
              <motion.div
                key="logs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full flex flex-col max-w-4xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Bug className="text-red-400" size={18} /> System Logs & Console
                  </h2>
                  <div className="flex gap-2">
                    <button onClick={() => runMockTask('Error Log Viewer')} className="text-[10px] uppercase font-bold tracking-widest bg-slate-800 px-3 py-1.5 rounded hover:bg-slate-700">Error Logs</button>
                    <button onClick={() => runMockTask('Crash Report Viewer')} className="text-[10px] uppercase font-bold tracking-widest bg-slate-800 px-3 py-1.5 rounded hover:bg-slate-700">Crash Reports</button>
                    <button onClick={() => setLogs([])} className="text-[10px] uppercase font-bold tracking-widest bg-slate-800 px-3 py-1.5 rounded hover:bg-slate-700 text-red-400">Clear</button>
                  </div>
                </div>
                <div className="flex-1 bg-black rounded-xl border border-slate-800 p-4 font-mono text-xs text-green-400 overflow-y-auto max-h-[500px] shadow-inner">
                  {logs.length === 0 ? (
                    <div className="text-slate-600 italic">No logs available.</div>
                  ) : (
                    logs.map((log, i) => (
                      <div key={i} className="mb-1 border-b border-slate-900 pb-1 opacity-80 hover:opacity-100">
                        {log}
                      </div>
                    ))
                  )}
                  {runningTask && (
                    <div className="text-emerald-500 animate-pulse mt-2">
                      &gt; Executing {runningTask}...
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
