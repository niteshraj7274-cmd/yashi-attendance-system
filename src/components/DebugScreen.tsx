import React, { useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Activity, Database, Cpu, Wrench, Clock, Server, ArrowLeft, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Metrics {
  memoryUsage: number | null;
  memoryTotal: number | null;
  fps: number;
  firebaseLatency: number | null;
}

interface MaintenanceTask {
  id: string;
  task: string;
  status: 'completed' | 'running' | 'failed';
  time: string;
  duration: string;
}

export default function DebugScreen() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<Metrics>({
    memoryUsage: null,
    memoryTotal: null,
    fps: 60,
    firebaseLatency: null
  });
  
  const [tasks] = useState<MaintenanceTask[]>([
    { id: '1', task: 'Auto-repair: Missing Center Documents', status: 'completed', time: '10 mins ago', duration: '1.2s' },
    { id: '2', task: 'Database Index Optimization', status: 'completed', time: '25 mins ago', duration: '3.4s' },
    { id: '3', task: 'Storage Orphan Cleanup', status: 'running', time: 'Just now', duration: '--' },
    { id: '4', task: 'Firestore Security Rules Audit', status: 'completed', time: '1 hour ago', duration: '0.8s' },
  ]);

  const [loadingDb, setLoadingDb] = useState(false);
  
  useEffect(() => {
    // Measure FPS
    let frameCount = 0;
    let lastTime = performance.now();
    let animFrameId: number;
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      if (currentTime - lastTime >= 1000) {
        setMetrics(m => ({ ...m, fps: Math.round((frameCount * 1000) / (currentTime - lastTime)) }));
        frameCount = 0;
        lastTime = currentTime;
      }
      animFrameId = requestAnimationFrame(measureFPS);
    };
    
    animFrameId = requestAnimationFrame(measureFPS);
    
    // Measure Memory
    const memoryInterval = setInterval(() => {
      const perf = window.performance as any;
      if (perf && perf.memory) {
        setMetrics(m => ({
          ...m,
          memoryUsage: Math.round(perf.memory.usedJSHeapSize / (1024 * 1024)),
          memoryTotal: Math.round(perf.memory.jsHeapSizeLimit / (1024 * 1024))
        }));
      }
    }, 2000);
    
    return () => {
      cancelAnimationFrame(animFrameId);
      clearInterval(memoryInterval);
    };
  }, []);

  const measureFirebaseLatency = async () => {
    setLoadingDb(true);
    const start = performance.now();
    try {
      const q = query(collection(db, 'centers'), limit(1));
      await getDocs(q);
      const end = performance.now();
      setMetrics(m => ({ ...m, firebaseLatency: Math.round(end - start) }));
    } catch (err) {
      console.error("Firebase latency measurement failed", err);
      setMetrics(m => ({ ...m, firebaseLatency: -1 }));
    } finally {
      setLoadingDb(false);
    }
  };

  useEffect(() => {
    measureFirebaseLatency();
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <div className="bg-indigo-700 text-white p-4 shadow-md flex items-center gap-3 relative z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold">System Diagnostics</h1>
          <p className="text-xs text-indigo-200">Performance & Maintenance</p>
        </div>
      </div>
      
      <div className="p-4 space-y-6 overflow-y-auto">
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Activity size={16} className="text-indigo-600" />
              Live Metrics
            </h2>
            <button 
              onClick={measureFirebaseLatency} 
              disabled={loadingDb}
              className="p-2 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={14} className={loadingDb ? "animate-spin" : ""} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
              <Cpu size={24} className="text-blue-500 mb-2" />
              <div className="text-2xl font-black text-slate-800">{metrics.fps}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">FPS</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
              <Server size={24} className="text-emerald-500 mb-2" />
              <div className="text-2xl font-black text-slate-800">
                {metrics.memoryUsage !== null ? `${metrics.memoryUsage}` : '--'}
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Memory (MB)
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center col-span-2">
              <Database size={24} className="text-purple-500 mb-2" />
              <div className="text-2xl font-black text-slate-800">
                {metrics.firebaseLatency !== null 
                  ? (metrics.firebaseLatency === -1 ? 'Error' : `${metrics.firebaseLatency}ms`) 
                  : '--'}
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Firestore Latency</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 mb-3">
            <Wrench size={16} className="text-indigo-600" />
            Maintenance Tasks
          </h2>
          
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            {tasks.map((task, i) => (
              <div key={task.id} className={`p-4 ${i !== tasks.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 leading-tight">{task.task}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock size={12} className="text-slate-400" />
                      <span className="text-xs text-slate-500">{task.time}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      task.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                      task.status === 'running' ? 'bg-amber-100 text-amber-700 animate-pulse' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {task.status}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">{task.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
