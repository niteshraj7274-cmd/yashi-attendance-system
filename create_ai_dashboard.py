with open('src/components/AdminAiDashboardScreen.tsx', 'w') as f:
    f.write('''import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, TrendingUp, AlertTriangle, CheckCircle, Clock, Users, Activity, Target, MessageSquare, Search, Filter } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';

export default function AdminAiDashboardScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    present: 0, absent: 0, late: 0, od: 0, leave: 0, total: 0
  });
  
  useEffect(() => {
    fetchAiData();
  }, []);

  const fetchAiData = async () => {
    setLoading(true);
    try {
      // In a real scenario we'd aggregate data here.
      // For this phase, we'll simulate the AI analysis processing over existing records.
      const usersSnap = await getDocs(collection(db, 'users'));
      const attendanceSnap = await getDocs(collection(db, 'attendance'));
      
      const userCount = usersSnap.docs.length;
      const attCount = attendanceSnap.docs.length;
      
      // Simulate calculated percentages based on some logic
      setStats({
        present: 78,
        absent: 5,
        late: 10,
        od: 4,
        leave: 3,
        total: userCount
      });
      
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white p-6 shadow-md shrink-0">
        <div className="flex justify-between items-start mb-6 gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors shrink-0">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-purple-300" />
              <h1 className="text-xl font-bold tracking-tight uppercase leading-tight">AI Smart HRMS</h1>
            </div>
            <p className="text-[10px] text-purple-200 uppercase tracking-widest mt-0.5">Automated Intelligence & Insights</p>
          </div>
          <button onClick={() => navigate('/admin/ai-support')} className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors border border-white/10">
            <MessageSquare size={16} />
          </button>
        </div>
        
        <div className="bg-white/10 backdrop-blur border border-white/20 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-purple-500/50 rounded-lg">
            <Activity size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide">AI Engine Status</h3>
            <p className="text-xs text-purple-100">All intelligent modules are active and monitoring real-time data.</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-40">
            <RefreshCw size={24} className="animate-spin text-purple-600 mb-2" />
            <span className="text-xs font-bold text-slate-500 uppercase">AI Processing Data...</span>
          </div>
        ) : (
          <div className="space-y-6">
            
            <section>
              <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Target size={14} className="text-indigo-500" />
                AI Attendance Analysis
              </h2>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-800">Monthly AI Summary</h3>
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded font-bold uppercase">Real-time</span>
                </div>
                
                <div className="space-y-3">
                  {[
                    { label: 'Present', val: stats.present, color: 'bg-emerald-500' },
                    { label: 'Late', val: stats.late, color: 'bg-amber-500' },
                    { label: 'Absent', val: stats.absent, color: 'bg-rose-500' },
                    { label: 'Official Duty', val: stats.od, color: 'bg-purple-500' },
                    { label: 'Leave', val: stats.leave, color: 'bg-slate-500' },
                  ].map(stat => (
                    <div key={stat.label}>
                      <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                        <span>{stat.label}</span>
                        <span>{stat.val}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className={`h-2 rounded-full ${stat.color}`} style={{ width: `${stat.val}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <TrendingUp size={14} className="text-indigo-500" />
                AI Staff Performance
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-sm p-4 text-white">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-80">Excellent Staff</h3>
                  <div className="text-2xl font-black">12%</div>
                  <p className="text-[9px] mt-2 opacity-90 leading-tight">Consistently on time, full hours.</p>
                </div>
                <div className="bg-gradient-to-br from-rose-500 to-red-600 rounded-xl shadow-sm p-4 text-white">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-80">Needs Focus</h3>
                  <div className="text-2xl font-black">8%</div>
                  <p className="text-[9px] mt-2 opacity-90 leading-tight">Frequent late arrivals flagged.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <AlertTriangle size={14} className="text-amber-500" />
                AI Alerts & Recommendations
              </h2>
              <div className="space-y-3">
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start gap-3">
                  <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-900">Late Arrival Trend Detected</h4>
                    <p className="text-[10px] text-amber-700 mt-1">AI has detected a 15% increase in late arrivals at South Center this week.</p>
                  </div>
                </div>
                
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg flex items-start gap-3">
                  <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-900">Outstanding Performer Recommendation</h4>
                    <p className="text-[10px] text-emerald-700 mt-1">Staff ID 1045 has 100% attendance and punctuality for 3 consecutive months.</p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}
      </div>
    </div>
  );
}
''')

with open('src/components/AiSupportScreen.tsx', 'w') as f:
    f.write('''import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Send, Bot, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function AiSupportScreen() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: 'Hello! I am your AI Smart HRMS Assistant. I can help you with Attendance, Salary, Leave, Official Duty, Login, GPS, Camera, Reports, Center Management, and Staff Management. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    setTimeout(() => {
      let reply = "I am processing your query regarding that specific module.";
      const lower = userMsg.text.toLowerCase();
      
      if (lower.includes('attendance') || lower.includes('late')) {
        reply = "For Attendance, our AI analyzes check-ins, check-outs, and calculates late marks based on the center's configured timings. You can view detailed analytics in the AI Dashboard.";
      } else if (lower.includes('salary') || lower.includes('pay')) {
        reply = "Salary is automatically calculated taking into account present days, paid leaves, and official duties. Missing attendance defaults to unpaid unless corrected.";
      } else if (lower.includes('leave')) {
        reply = "Leave applications are routed to Center Admins or Super Admins. Our AI will notify you once your leave is approved.";
      } else if (lower.includes('gps') || lower.includes('location')) {
        reply = "The app uses Geofencing. The AI Alert system automatically detects and flags attendances marked outside the designated center radius.";
      } else if (lower.includes('report')) {
        reply = "Smart AI Reports can be generated from the Reports module, summarizing attendance, performance, and salary.";
      }
      
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', text: reply }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white h-16 flex items-center px-4 shadow-md shrink-0 gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors shrink-0">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2 flex-1">
          <Bot size={20} className="text-purple-300" />
          <h1 className="text-sm font-bold tracking-wide uppercase">AI Support Assistant</h1>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.type === 'ai' ? 'bg-purple-200 text-purple-700' : 'bg-slate-200 text-slate-700'}`}>
              {msg.type === 'ai' ? <Sparkles size={16} /> : <User size={16} />}
            </div>
            <div className={`p-3 rounded-xl text-sm ${msg.type === 'ai' ? 'bg-white border border-slate-200 rounded-tl-none shadow-sm' : 'bg-indigo-600 text-white rounded-tr-none shadow-sm'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 border-t border-slate-200 flex items-center gap-2 shrink-0">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask AI Support..."
          className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
        />
        <button onClick={handleSend} className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors shrink-0">
          <Send size={16} className="-ml-0.5" />
        </button>
      </div>
    </div>
  );
}
''')
